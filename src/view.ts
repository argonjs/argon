import { inject } from 'aurelia-dependency-injection'
import { Entity, Matrix4, PerspectiveFrustum, Cartesian3, Quaternion } from './cesium/cesium-imports'
import { Viewport, SubviewType, FrameState } from './common'
import { SessionService, SessionPort } from './session'
import { EntityPose, ContextService } from './context'
import { Event, decomposePerspectiveProjectionMatrix } from './utils'
import { FocusService } from './focus'
import { RealityService } from './reality'

// setup our DOM environment
if (typeof document !== 'undefined' && document.createElement) {
    let viewportMetaTag = <HTMLMetaElement>document.querySelector('meta[name=viewport]');
    if (!viewportMetaTag) viewportMetaTag = document.createElement('meta');
    viewportMetaTag.name = 'viewport'
    viewportMetaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    document.head.appendChild(viewportMetaTag);

    let argonMetaTag = <HTMLMetaElement>document.querySelector('meta[name=argon]');
    if (!argonMetaTag) argonMetaTag = document.createElement('meta');
    argonMetaTag.name = 'argon'
    document.head.appendChild(argonMetaTag);

    var argonContainer: HTMLElement;
    var argonContainerPromise = new Promise<HTMLElement>((resolve) => {
        const resolveArgonContainer = () => {
            let container = <HTMLDivElement>document.querySelector('#argon');
            if (!container) container = document.createElement('div');
            container.id = 'argon';
            container.classList.add('argon-view');
            document.body.appendChild(container);
            argonContainer = container;

            // prevent pinch-zoom of the page in ios 10.
            argonContainer.addEventListener('touchmove', function (event) {
                event.preventDefault();
            }, true);

            resolve(container);
        }
        if (document.readyState == 'loading') {
            document.addEventListener('DOMContentLoaded', resolveArgonContainer);
        } else {
            resolveArgonContainer();
        }
    });

    const style = document.createElement("style");
    style.type = 'text/css';
    document.head.insertBefore(style, document.head.firstChild);
    const sheet = <CSSStyleSheet>style.sheet;
    sheet.insertRule(`
        #argon {
            position: fixed;
            left: 0px;
            bottom: 0px;
            width: 100%;
            height: 100%;
            margin: 0;
            border: 0;
            padding: 0;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-view {
            overflow: hidden;
            -webkit-tap-highlight-color: initial;
            -webkit-user-select: none;
            -webkit-tap-highlight-color: transparent;
            user-select: none;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-view > * {
            position: absolute;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-view > * > * {
            -webkit-tap-highlight-color: initial;
        }
    `, sheet.cssRules.length);
}

/**
 * The rendering paramters for a particular subview
 */
export interface Subview {
    index: number,
    type: SubviewType,
    frustum: PerspectiveFrustum,
    pose: EntityPose,
    viewport: Viewport
}

const IDENTITY_SUBVIEW_POSE = {p:Cartesian3.ZERO, o:Quaternion.IDENTITY, r:'ar.user'};

/**
 * Manages the view state
 */
@inject('containerElement', SessionService, FocusService, RealityService, ContextService)
export class ViewService {

    /**
     * UI events that occur within this view. To handle an event (and prevent it from
     * being forwarded to another layer) call event.stopImmediatePropagation().
     */
    public uiEvent = new Event<UIEvent|MouseEvent|TouchEvent|PointerEvent|WheelEvent>();

    /**
     * An event that is raised when the root viewport has changed
     */
    public viewportChangeEvent = new Event<{ previous: Viewport }>();

    /**
     * An event that is raised when ownership of the view has been acquired by this application
     */
    public acquireEvent = new Event<void>();

    /** 
     * An event that is raised when ownership of the view has been released from this application
    */
    public releaseEvent = new Event<void>();

    /**
     * An HTMLDivElement which matches the root viewport. This is 
     * provide for convenience to attach other elements to (such as
     * a webGL canvas element). Attached elements will automatically 
     * inherit the same size and position as this element (via CSS). 
     * This value is undefined in non-DOM environments.
     */
    public element: HTMLDivElement;

    /**
     * A promise which resolves to the containing HTMLElement for this view.
     * This value is undefined in non-DOM environments.
     */
    public containingElementPromise: Promise<HTMLElement>;

    /**
     * The containing element.
     */
    public containingElement?: HTMLElement;
    
    /**
     *  Manager-only. A map of sessions to their desired viewports.
     */
    public desiredViewportMap = new WeakMap<SessionPort, Viewport>();

    private _currentViewport: Viewport;
    private _currentViewportJSON: string;
    private _subviews: Subview[] = [];
    private _frustums: PerspectiveFrustum[] = [];
    private _currentRealitySession?:SessionPort;

    constructor(
        containerElement: HTMLElement,
        private sessionService: SessionService,
        private focusService: FocusService,
        private realityService: RealityService,
        private contextService: ContextService) {

        if (typeof document !== 'undefined' && document.createElement) {
            const element = this.element = document.createElement('div');
            element.style.width = '100%';
            element.style.height = '100%';
            element.classList.add('argon-view');

            this.containingElementPromise = new Promise((resolve) => {
                if (containerElement && containerElement instanceof HTMLElement) {
                    containerElement.insertBefore(element, containerElement.firstChild);
                    resolve(containerElement);
                } else {
                    argonContainer = <HTMLDivElement>document.querySelector('#argon');
                    if (argonContainer) {
                        argonContainer.insertBefore(element, argonContainer.firstChild);
                        resolve(argonContainer);
                    } else {
                        argonContainerPromise.then((argonContainer) => {
                            argonContainer.insertBefore(element, argonContainer.firstChild);
                            resolve(argonContainer);
                        })
                    }
                    this.focusService.focusEvent.addEventListener(() => {
                        argonContainerPromise.then((argonContainer) => {
                            argonContainer.classList.remove('argon-no-focus');
                            argonContainer.classList.add('argon-focus');
                        })
                    })
                    this.focusService.blurEvent.addEventListener(() => {
                        argonContainerPromise.then((argonContainer) => {
                            argonContainer.classList.remove('argon-focus');
                            argonContainer.classList.add('argon-no-focus');
                        })
                    })
                }
            });

            this.containingElementPromise.then((container)=>{
                this.containingElement = container;
            })

            if (this.sessionService.isRealityViewer) {
                this._setupEventSynthesizing();
            } else {
                this._setupEventForwarding();
            }
        }

        if (this.sessionService.isRealityManager) {
            this.sessionService.connectEvent.addEventListener((session) => {
                session.on['ar.viewport.desired'] = (viewport: Viewport) => {
                    this.desiredViewportMap.set(session, viewport);
                }
                session.on['ar.view.uievent'] = (uievent) => {
                    if (this.realityService.session && this.realityService.session.isConnected) {
                        this.realityService.session.send('ar.view.uievent', uievent);
                    }
                }
            });
        }

        this.contextService.renderEvent.addEventListener(() => {
            const state = <FrameState>this.contextService.serializedFrameState;
            state.view.subviews.forEach((subview, index) => {
                const id = 'ar.view_' + index;
                const subviewPose = subview.pose || IDENTITY_SUBVIEW_POSE;
                this.contextService.updateEntityFromSerializedPose(id, subviewPose);
            });
            this._update();
        })
    }

    public getSubviews(referenceFrame?: Entity): Subview[] {
        this._update();
        const subviews: Subview[] = this._subviews;
        const viewState = this.contextService.serializedFrameState!.view;
        subviews.length = viewState.subviews.length;
        viewState.subviews.forEach((serializedSubview, index) => {
            const id = 'ar.view_' + index;
            const subviewEntity = this.contextService.entities.getById(id)!;
            const subview = subviews[index] = 
                subviews[index] || <Subview>{};
            subview.index = index;
            subview.type = serializedSubview.type;
            subview.pose = this.contextService.getEntityPose(subviewEntity, referenceFrame);
            subview.viewport = serializedSubview.viewport || {
                x: 0, 
                y: 0, 
                width: viewState.viewport.width,
                height: viewState.viewport.height
            }

            subview.frustum = this._frustums[index] = 
                this._frustums[index] || new PerspectiveFrustum();
            decomposePerspectiveProjectionMatrix(serializedSubview.projectionMatrix, subview.frustum);
            subview['projectionMatrix'] = <Matrix4>serializedSubview.projectionMatrix;
        })
        return subviews;
    }

    /**
     * Get the current viewport
     */
    public getViewport() {
        return this.contextService.serializedFrameState!.view.viewport;
    }

    // /**
    //  * Request to present the view in an HMD.
    //  */
    // public requestPresent() {
    //     if (this.deviceService.vrDisplay) {
    //         const layers:VRLayer[] = [];
    //         layers[0] = {source:this.element.querySelector('canvas')};
    //         return this.deviceService.vrDisplay.requestPresent(layers);
    //     } else {
    //         return this.requestFullscreen();
    //     }
    // }

    // /**
    //  * Exit preseting in an HMD
    //  */
    // public exitPresent() {
    //     if (this.deviceService.vrDisplay) {
    //         return this.deviceService.vrDisplay.exitPresent();
    //     }
    //     return Promise.reject(new Error("Not presenting"));
    // }

    /**
     * Request to present the view in fullscreen
     */
    public requestFullscreen() {
        return this.containingElementPromise.then((container)=>{
            if (container.requestFullscreen) 
                return container.requestFullscreen();
            if (container.webkitRequestFullscreen)
                return container.webkitRequestFullscreen();
        })
    }
    
    /**
     * Handle UI Events. Meant to be overwritten by apps. 
     * By default, an event will be forwarded to the reality viewer. 
     * If the event is handled by the app, then evt.stopImmediatePropagation()
     * should be called to stop the event from being forwarded to the 
     * reality viewer.
     */
    public onUIEvent(evt:MouseEvent|TouchEvent|WheelEvent) {
        // default: do nothing
    }

    /**
     * Set the desired root viewport
     * @private
     */
    public setDesiredViewport(viewport: Viewport) {
        this.sessionService.manager.send('ar.view.desiredViewport', viewport)
    }

    /**
     * Request control over the view. 
     * The manager is likely to reject this request if this application is not in focus. 
     * When running on an HMD, this request will always fail. If the current reality view
     * does not support custom views, this request will fail. The manager may revoke
     * ownership at any time (even without this application calling releaseOwnership)
     * @private
     */
    public requestOwnership() {

    }

    /**
     * Release control over the view. 
     * @private
     */
    public releaseOwnership() {

    }

    /**
     * Returns true if this application has control over the view.  
     * @private
     */
    public isOwner() {

    }

    // Updates the element, if necessary, and raise a view change event
    private _update() {
        const state = this.contextService.serializedFrameState;
        if (!state) throw new Error('Expected state to be defined');

        const view = state.view;
        const viewportJSON = JSON.stringify(view.viewport);
        const previousViewport = this._currentViewport;

        if (!this._currentViewportJSON || this._currentViewportJSON !== viewportJSON) {
            this._currentViewportJSON = viewportJSON;

            if (this.element) {
                requestAnimationFrame(() => {
                    const viewport = view.viewport;
                    this.element.style.left = viewport.x + 'px';
                    this.element.style.bottom = viewport.y + 'px';
                    this.element.style.width = viewport.width + 'px';
                    this.element.style.height = viewport.height + 'px';
                })
            }

            this.viewportChangeEvent.raiseEvent({ previous: previousViewport })
        }

        this._currentViewport = Viewport.clone(view.viewport, this._currentViewport)!;
    }

    private _setupEventForwarding() {

        this.realityService.connectEvent.addEventListener((realitySession)=>{
            this._currentRealitySession = realitySession;
            realitySession.closeEvent.addEventListener(()=>{
                this._currentRealitySession = undefined;
            });
        });

        const cloneTouch = (touch:Touch, boundingRect:ClientRect) => {
            return {
                identifier: touch.identifier,
                clientX: touch.clientX - boundingRect.left,
                clientY: touch.clientY - boundingRect.top,
                screenX: touch.screenX,
                screenY: touch.screenY
            };
        }

        const cloneTouches = (touches:TouchList, boundingRect:ClientRect) => {
            if (!touches) return undefined;
            const touchList:any = [];
            for (var i = 0; i < touches.length; i++) {
                const touch = touches.item(i)!;
                touchList[i] = cloneTouch(touch, boundingRect);
            }
            return touchList;
        }

        const raiseEvent = (uiEvent:UIEvent) => {
            this.uiEvent.raiseEvent(uiEvent);
        }
        
        const forwardEvent = (e:MouseEvent&WheelEvent&TouchEvent)=>{
            e.preventDefault();
            if (this._currentRealitySession) {
                const boundingRect = this.element.getBoundingClientRect();

                const touches = cloneTouches(e.touches, boundingRect);
                const changedTouches = cloneTouches(e.changedTouches, boundingRect);
                const targetTouches = cloneTouches(e.targetTouches, boundingRect);

                this.sessionService.manager.send('ar.view.uievent', {
                    type: e.type,
                    bubbles: e.bubbles,
                    cancelable: e.cancelable,
                    detail: e.detail,
                    altKey: e.altKey,
                    ctrlKey: e.ctrlKey,
                    metaKey: e.metaKey,
                    button: e.button,
                    buttons: e.buttons,
                    clientX: e.clientX - boundingRect.left,
                    clientY: e.clientY - boundingRect.top,
                    screenX: e.screenX,
                    screenY: e.screenY,
                    movementX: e.movementX,
                    movementY: e.movementY,
                    deltaX: e.deltaX,
                    deltaY: e.deltaY,
                    deltaZ: e.deltaZ,
                    deltaMode: e.deltaMode,
                    wheelDelta: e.wheelDelta,
                    wheelDeltaX: e.wheelDeltaX,
                    wheelDeltaY: e.wheelDeltaY,
                    which: e.which, 
                    timeStamp: e.timeStamp,
                    touches,
                    changedTouches,
                    targetTouches
                });
            }
        };
        ['wheel'
        ,'click'
        ,'dblclick'
        ,'contextmenu'
        ,'mouseover'
        ,'mouseout'
        ,'mousemove'
        ,'mousedown'
        ,'mouseup'
        ,'touchstart'
        ,'touchend'
        ,'touchmove'
        ,'touchcancel'
        ].forEach((type)=>{
            this.element.addEventListener(type, raiseEvent, false);
            this.element.addEventListener(type, forwardEvent, false);
        });
    }


    private _setupEventSynthesizing() {
        let currentTarget:Element|Window|undefined;

        const fireMouseLeaveEvents = (target:Element|Window|undefined, relatedTarget:Element|Window|undefined, uievent:MouseEvent) => {
            if (!target) return;
            const eventInit:MouseEventInit = {
                view: uievent.view,
                clientX: uievent.clientX,
                clientY: uievent.clientY,
                screenX: uievent.screenX,
                screenY: uievent.screenY,
                relatedTarget: relatedTarget
            };
            // fire mouseout
            eventInit.bubbles = true;
            target.dispatchEvent(new MouseEvent('mouseout',eventInit));
            // fire mouseleave events
            eventInit.bubbles = false;
            let el = target;
            do { 
                el.dispatchEvent(new MouseEvent('mouseleave',eventInit));
                el = el['parentElement'];
            } while (el)
        }

        const fireMouseEnterEvents = (target:Element|Window, relatedTarget:Element|Window|undefined, uievent:MouseEvent) => {
            const eventInit:MouseEventInit = {
                view: uievent.view,
                clientX: uievent.clientX,
                clientY: uievent.clientY,
                screenX: uievent.screenX,
                screenY: uievent.screenY,
                relatedTarget: relatedTarget
            };
            // fire mouseover
            eventInit.bubbles = true;
            target.dispatchEvent(new MouseEvent('mouseover',eventInit));
            // fire mouseenter events
            eventInit.bubbles = false;
            let el = target;
            do { 
                el.dispatchEvent(new MouseEvent('mouseenter',eventInit));
                el = el['parentElement'];
            } while (el)
        }

        const deserializeTouches = (touches:Touch[], target:Element|Window, uievent:TouchEvent) => {
            touches.forEach((t, i)=>{
                touches[i] = document.createTouch(
                    uievent.view, target, t.identifier, 
                    t.clientX, t.clientY, t.screenX, t.screenY
                );
            })
            return touches;
        }
        
        const touchTargets = {};

        this.sessionService.manager.on['ar.view.uievent'] = (uievent:MouseEvent&WheelEvent&TouchEvent)=>{
            (<any>uievent).view = window;

            let target;

            switch (uievent.type) {
                case 'wheel':
                    target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                    target.dispatchEvent(new WheelEvent(uievent.type, uievent));
                    break;
                case 'mouseout':
                    target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                    fireMouseLeaveEvents(currentTarget, undefined, uievent);
                    currentTarget = undefined;
                    break;
                case 'mouseover':
                    target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                    fireMouseEnterEvents(target, undefined, uievent);
                    currentTarget = target;
                    break;
                case 'mousemove': 
                    target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                    if (target !== currentTarget) {
                        fireMouseLeaveEvents(currentTarget, target, uievent);
                        fireMouseEnterEvents(target, currentTarget, uievent);
                        currentTarget = target;
                    }
                    target.dispatchEvent(new MouseEvent(uievent.type, uievent));
                    break;
                case 'touchstart':
                    let x = 0, y = 0, length = uievent.changedTouches.length;
                    for (const t of (<Touch[]><any>uievent.changedTouches)) {
                        x += t.clientX;
                        y += t.clientY;
                    }
                    x /= length;
                    y /= length;
                    target = document.elementFromPoint(x, y);
                    for (const t of (<Touch[]><any>uievent.changedTouches)) {
                        touchTargets[t.identifier] = target;
                    }
                case 'touchmove':
                case 'touchend':
                case 'touchcancel':
                    target = touchTargets[uievent.changedTouches[0].identifier];

                    var evt = document.createEvent('TouchEvent');
                    const touches = document.createTouchList.apply(document, deserializeTouches(<any>uievent.touches, target, uievent));
                    const targetTouches = document.createTouchList.apply(document, deserializeTouches(<any>uievent.targetTouches, target, uievent));
                    const changedTouches = document.createTouchList.apply(document, deserializeTouches(<any>uievent.changedTouches, target, uievent));
                    // Safari, Firefox: must use initTouchEvent.
                    if (typeof evt['initTouchEvent'] === "function") {
                        evt['initTouchEvent'](
                            uievent.type, uievent.bubbles, uievent.cancelable, uievent.view, uievent.detail,
                            uievent.screenX, uievent.screenY, uievent.clientX, uievent.clientY,
                            uievent.ctrlKey, uievent.altKey, uievent.shiftKey, uievent.metaKey,
                            touches, targetTouches, changedTouches, 1.0, 0.0
                        );
                    } else {
                        evt.initUIEvent(uievent.type, uievent.bubbles, uievent.cancelable, uievent.view, uievent.detail);
                        (<any>evt).touches = touches;
                        (<any>evt).targetTouches = targetTouches;
                        (<any>evt).changedTouches = changedTouches;
                    }
                    target.dispatchEvent(evt);

                    if (uievent.type === 'touchend' || uievent.type == 'touchcancel') {
                        for (const t of (<Touch[]><any>uievent.changedTouches)) {
                            delete touchTargets[t.identifier];
                        }
                    }

                    break;
                default:                            
                    target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                    target.dispatchEvent(new MouseEvent(uievent.type, uievent));
            }
        };
    }
}

import { inject } from 'aurelia-dependency-injection'
import { Entity, Matrix4, PerspectiveFrustum } from './cesium/cesium-imports'
import { Viewport, SubviewType, SerializedFrameState, SerializedViewParameters } from './common'
import { SessionService, SessionPort } from './session'
import { EntityPose, ContextService } from './context'
import { Event } from './utils'
import { FocusService } from './focus'
import { RealityService, RealityZoomState } from './reality'

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
            resolve(container);
        }
        if (document.readyState == 'loading') {
            document.addEventListener('DOMContentLoaded', resolveArgonContainer);
        } else {
            resolveArgonContainer();
        }
    })

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
    `, 0);
    sheet.insertRule(`
        .argon-view > * {
            position: absolute;
            pointer-events: none;
        }
    `, 1);
}

/**
 * The rendering paramters for a particular subview
 */
export interface Subview {
    index: number,
    type: SubviewType,
    projectionMatrix: Matrix4,
    frustum: PerspectiveFrustum,
    pose: EntityPose,
    viewport: Viewport
}

/**
 * Manages the view state
 */
@inject('containerElement', SessionService, FocusService, ContextService)
export class ViewService {

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
     *  Manager-only. A map of sessions to their desired viewports.
     */
    public desiredViewportMap = new WeakMap<SessionPort, Viewport>();

    private _current: SerializedViewParameters;
    private _currentViewportJSON: string;

    private _subviews: Subview[] = [];
    private _subviewEntities: Entity[] = [];
    private _frustums: PerspectiveFrustum[] = [];

    constructor(
        containerElement: HTMLElement,
        private sessionService: SessionService,
        private focusService: FocusService,
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
            })
        }

        if (this.sessionService.isRealityManager) {
            this.sessionService.connectEvent.addEventListener((session) => {
                session.on['ar.viewport.desired'] = (viewport: Viewport) => {
                    this.desiredViewportMap.set(session, viewport);
                }
            });
        }

        this.contextService.renderEvent.addEventListener(() => {
            const state = <SerializedFrameState>this.contextService.serializedFrameState;
            const subviewEntities = this._subviewEntities;
            subviewEntities.length = 0;
            state.view.subviews.forEach((subview, index) => {
                const id = 'ar.view_' + index;
                state.entities[id] = subview.pose || state.view.pose;
                this.contextService.updateEntityFromFrameState(id, state);
                delete state.entities[id];
                subviewEntities[index] = this.contextService.entities.getById(id);
            });
            this._update();
        })
    }

    public getSubviews(referenceFrame?: Entity): Subview[] {
        this._update();
        const subviews: Subview[] = this._subviews;
        subviews.length = this._current.subviews.length;
        this._current.subviews.forEach((serializedSubview, index) => {
            const subviewEntity = this._subviewEntities[index];
            const subview = subviews[index] = subviews[index] || <Subview>{};
            subview.index = index;
            subview.type = serializedSubview.type;
            subview.pose = this.contextService.getEntityPose(subviewEntity, referenceFrame);
            subview.viewport = serializedSubview.viewport || this._current.viewport;

            subview.frustum = this._frustums[index];
            if (!subview.frustum) {
                subview.frustum = this._frustums[index] = new PerspectiveFrustum();
                subview.frustum.near = 0.01;
                subview.frustum.far = 10000000;
            }
            subview.frustum.fov = serializedSubview.frustum.fov;
            subview.frustum.aspectRatio = serializedSubview.frustum.aspectRatio || subview.viewport.width / subview.viewport.height;
            subview.frustum.xOffset = serializedSubview.frustum.xOffset || 0;
            subview.frustum.yOffset = serializedSubview.frustum.yOffset || 0;

            subview.projectionMatrix = <Matrix4>serializedSubview.projectionMatrix || subview.frustum.infiniteProjectionMatrix;
        })
        return subviews;
    }

    public getViewport() {
        return this._current.viewport;
    }

    /**
     * Set the desired root viewport
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
     */
    public requestOwnership() {

    }

    /**
     * Release control over the view. 
     */
    public releaseOwnership() {

    }

    /**
     * Returns true if this application has control over the view.  
     */
    public isOwner() {

    }

    // Updates the element, if necessary, and raise a view change event
    private _update() {
        const state = this.contextService.serializedFrameState;
        if (!state) throw new Error('Expected state to be defined');

        const view = state.view;
        const viewportJSON = JSON.stringify(view.viewport);
        const previousViewport = this._current && this._current.viewport;
        this._current = view;

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
    }
}


@inject(ViewService, RealityService, ContextService, SessionService)
export class PinchZoomService {
    constructor(
        private viewService: ViewService,
        private realityService: RealityService,
        private contextService: ContextService,
        private sessionService: SessionService) {
        if (this.sessionService.isRealityManager) {
            this.viewService.containingElementPromise.then((el) => {
                el.style.pointerEvents = 'auto';
                let fov: number = -1;

                if (typeof PointerEvent !== 'undefined') {

                    const evCache = new Array();
                    let startDistSquared = -1;
                    let zoom = 1;

                    const remove_event = (ev) => {
                        // Remove this event from the target's cache
                        for (var i = 0; i < evCache.length; i++) {
                            if (evCache[i].pointerId == ev.pointerId) {
                                evCache.splice(i, 1);
                                break;
                            }
                        }
                    }

                    const pointerdown_handler = (ev) => {
                        // The pointerdown event signals the start of a touch interaction.
                        // This event is cached to support 2-finger gestures
                        evCache.push(ev);
                    }

                    const pointermove_handler = (ev) => {
                        // This function implements a 2-pointer pinch/zoom gesture. 

                        // Find this event in the cache and update its record with this event
                        for (var i = 0; i < evCache.length; i++) {
                            if (ev.pointerId == evCache[i].pointerId) {
                                evCache[i] = ev;
                                break;
                            }
                        }

                        const state = this.contextService.serializedFrameState;
                        if (!state) return;

                        // If two pointers are down, check for pinch gestures
                        if (evCache.length == 2) {
                            // Calculate the distance between the two pointers
                            const curDiffX = Math.abs(evCache[0].clientX - evCache[1].clientX);
                            const curDiffY = Math.abs(evCache[0].clientY - evCache[1].clientY);
                            const currDistSquared = curDiffX * curDiffX + curDiffY * curDiffY;

                            if (startDistSquared == -1) {
                                // start pinch
                                startDistSquared = currDistSquared;
                                fov = state.view.subviews[0].frustum.fov;
                                zoom = 1;
                                this.realityService.zoom({ zoom, fov, state: RealityZoomState.START });
                            } else {
                                // change pinch
                                zoom = currDistSquared / startDistSquared;
                                this.realityService.zoom({ zoom, fov, state: RealityZoomState.CHANGE });
                            }
                        } else {
                            // end pinch                            
                            this.realityService.zoom({ zoom, fov, state: RealityZoomState.END });
                            startDistSquared = -1;
                        }
                    }

                    const pointerup_handler = (ev) => {
                        // Remove this pointer from the cache
                        remove_event(ev);

                        // If the number of pointers down is less than two then reset diff tracker
                        if (evCache.length < 2) startDistSquared = -1;
                    }

                    el.onpointerdown = pointerdown_handler;
                    el.onpointermove = pointermove_handler;

                    // Use same handler for pointer{up,cancel,out,leave} events since
                    // the semantics for these events - in this app - are the same.
                    el.onpointerup = pointerup_handler;
                    el.onpointercancel = pointerup_handler;
                    el.onpointerout = pointerup_handler;
                    el.onpointerleave = pointerup_handler;

                } else {
                    el.addEventListener('gesturestart', (ev: any) => {
                        const state = this.contextService.serializedFrameState;
                        if (state && state.view.subviews[0]) {
                            fov = state.view.subviews[0].frustum.fov;
                            this.realityService.zoom({ zoom: ev.scale, fov, state: RealityZoomState.START });
                        }
                    })
                    el.addEventListener('gesturechange', (ev: any) => {
                        this.realityService.zoom({ zoom: ev.scale, fov, state: RealityZoomState.CHANGE });
                    })
                    el.addEventListener('gestureend', (ev: any) => {
                        this.realityService.zoom({ zoom: ev.scale, fov, state: RealityZoomState.END });
                    })
                }
            })
        }
    }
}

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { PerspectiveFrustum, Cartesian3, Quaternion } from './cesium/cesium-imports';
import { Viewport } from './common';
import { SessionService } from './session';
import { ContextService } from './context';
import { Event, decomposePerspectiveProjectionMatrix, resolveElement, isIOS } from './utils';
import { FocusService } from './focus';
// setup our DOM environment
if (typeof document !== 'undefined' && document.createElement) {
    let viewportMetaTag = document.querySelector('meta[name=viewport]');
    if (!viewportMetaTag)
        viewportMetaTag = document.createElement('meta');
    viewportMetaTag.name = 'viewport';
    viewportMetaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
    document.head.appendChild(viewportMetaTag);
    let argonMetaTag = document.querySelector('meta[name=argon]');
    if (!argonMetaTag)
        argonMetaTag = document.createElement('meta');
    argonMetaTag.name = 'argon';
    document.head.appendChild(argonMetaTag);
    let argonElementPromise;
    var resolveArgonElement = () => {
        if (argonElementPromise)
            return argonElementPromise;
        return argonElementPromise = resolveElement('#argon').catch(() => {
            const argonElement = document.createElement('div');
            argonElement.id = 'argon';
            document.body.appendChild(argonElement);
            return argonElement;
        });
    };
    const style = document.createElement("style");
    style.type = 'text/css';
    document.head.insertBefore(style, document.head.firstChild);
    const sheet = style.sheet;
    sheet.insertRule(`
        #argon {
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            bottom: 0;
            margin: 0;
            border: 0;
            padding: 0;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-container > * {
            position: absolute;
            overflow: hidden;
            width: 100%;
            height: 100%;
            pointer-events: none;
            -webkit-tap-highlight-color: transparent;
            -webkit-user-select: none;
            user-select: none;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-container > * > * {
            pointer-events: auto;
            -webkit-tap-highlight-color: initial;
            -webkit-user-select: initial;
            user-select: initial;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-view {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: auto;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-view > * {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-view > * > * {
            pointer-events: auto;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-maximized, .argon-maximized ~ * {
            position: fixed !important;
            width: 100% !important;
            height: 100% !important;
            left: 0;
            bottom: 0;
            margin: 0;
            border: 0;
            padding: 0;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-fullscreen {
            width: 100% !important;
            height: 100% !important;
            max-width: initial !important;
            max-height: initial !important;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-interactive {
            pointer-events: auto;
        }
    `, sheet.cssRules.length);
}
const IDENTITY_SUBVIEW_POSE = { p: Cartesian3.ZERO, o: Quaternion.IDENTITY, r: 'ar.user' };
export const ContainerElement = '#argon';
/**
 * Manages the view state
 */
export let ViewService = class ViewService {
    constructor(containerElementOrSelector, sessionService, contextService, focusService) {
        this.sessionService = sessionService;
        this.contextService = contextService;
        this.focusService = focusService;
        /**
         * UI events that occur within this view. To handle an event (and prevent it from
         * being forwarded to another layer) call event.stopImmediatePropagation().
         */
        this.uiEvent = new Event();
        /**
         * UI events to be forwarded
         */
        this.forwardedUIEvent = new Event();
        /**
         * An event that is raised when the root viewport has changed
         */
        this.viewportChangeEvent = new Event();
        /**
         * An event that is raised when ownership of the view has been acquired by this application
         */
        this.acquireEvent = new Event();
        /**
         * An event that is raised when ownership of the view has been released from this application
        */
        this.releaseEvent = new Event();
        /**
         *  Manager-only. A map of sessions to their desired viewports.
         */
        this.desiredViewportMap = new WeakMap();
        this._subviews = [];
        this._frustums = [];
        if (typeof document !== 'undefined' && document.createElement) {
            const element = this.element = document.createElement('div');
            element.classList.add('argon-view');
            // prevent pinch-zoom of the page in ios 10.
            if (isIOS) {
                element.addEventListener('touchmove', (event) => {
                    if (event.touches.length > 1)
                        event.preventDefault();
                }, true);
            }
            this.containerElementPromise = new Promise((resolve) => {
                const insertViewportElement = (containerElement) => {
                    if (this.sessionService.manager.isClosed)
                        return;
                    containerElement.classList.add('argon-container');
                    containerElement.insertBefore(element, containerElement.firstChild);
                    const handleFullscreenChange = () => {
                        if (this._isFullscreen()) {
                            containerElement.classList.add('argon-fullscreen');
                        }
                        else {
                            containerElement.classList.remove('argon-fullscreen');
                        }
                    };
                    document.addEventListener('fullscreenchange', handleFullscreenChange);
                    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
                    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
                    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
                    const handleVRDisplayPresentChange = (e) => {
                        const vrDisplay = e.display || e.detail.vrdisplay || e.detail.display;
                        if (vrDisplay) {
                            const layers = vrDisplay.getLayers();
                            let isThisView = this._vrDisplay === vrDisplay;
                            for (const layer of layers) {
                                if (layer.source && this.element.contains(layer.source)) {
                                    isThisView = true;
                                    break;
                                }
                            }
                            if (isThisView) {
                                if (vrDisplay.isPresenting) {
                                    this._vrDisplay = vrDisplay;
                                    if (vrDisplay.displayName.match(/Cardboard/g)) {
                                        this.element.classList.add('argon-maximized');
                                        vrDisplay.getLayers()[0].source.classList.add('argon-interactive');
                                    }
                                    this.viewportChangeEvent.raiseEvent(undefined);
                                }
                                else {
                                    this._vrDisplay = undefined;
                                    if (vrDisplay.displayName.match(/Cardboard/g)) {
                                        this.element.classList.remove('argon-maximized');
                                        const canvas = this.element.querySelector('.argon-interactive');
                                        if (canvas)
                                            canvas.classList.remove('argon-interactive');
                                    }
                                    this.viewportChangeEvent.raiseEvent(undefined);
                                }
                            }
                        }
                    };
                    window.addEventListener('vrdisplaypresentchange', handleVRDisplayPresentChange);
                    this.sessionService.manager.closeEvent.addEventListener(() => {
                        element.remove();
                        document.removeEventListener('fullscreenchange', handleFullscreenChange);
                        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
                        document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
                        document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
                    });
                    resolve(containerElement);
                };
                if (containerElementOrSelector && containerElementOrSelector instanceof HTMLElement) {
                    insertViewportElement(containerElementOrSelector);
                }
                else {
                    if (containerElementOrSelector === `#argon`) {
                        // first check synchronously
                        let containerElement = document.querySelector(`#argon`);
                        if (containerElement) {
                            insertViewportElement(containerElement);
                        }
                        else {
                            // if synchronous checks fail, wait for document to load then insert
                            return resolveArgonElement().then(insertViewportElement);
                        }
                    }
                    else {
                        // first check synchronously
                        let containerElement = document.querySelector(`${containerElementOrSelector}`);
                        if (containerElement) {
                            insertViewportElement(containerElement);
                        }
                        else {
                            // if synchronous checks fail, wait for document to load then insert
                            resolveElement(containerElementOrSelector).then(insertViewportElement);
                        }
                    }
                }
            });
            this.focusService.focusEvent.addEventListener(() => {
                element.classList.remove('argon-no-focus');
                element.classList.add('argon-focus');
            });
            this.focusService.blurEvent.addEventListener(() => {
                element.classList.remove('argon-focus');
                element.classList.add('argon-no-focus');
            });
            if (this.sessionService.isRealityViewer) {
                this._setupEventSynthesizing();
            }
            else {
                this._setupEventForwarding();
            }
        }
        if (this.sessionService.isRealityManager) {
            this.sessionService.connectEvent.addEventListener((session) => {
                session.on['ar.view.desiredViewport'] = (viewport) => {
                    this.desiredViewportMap.set(session, viewport);
                };
                session.on['ar.view.forwardUIEvent'] = (uievent) => {
                    this.forwardedUIEvent.raiseEvent(uievent);
                };
                session.on['ar.view.requestEnterHmd'] = () => {
                    return this._requestEnterHmd(session);
                };
                session.on['ar.view.requestExitHmd'] = () => {
                    return this._requestExitHmd(session);
                };
                session.on['ar.view.isHmdActive'] = () => {
                    return Promise.resolve({ state: this._isHmdActive() });
                };
                session.on['ar.view.requestEnterFullscreen'] = () => {
                    return this._requestEnterFullscreen(session);
                };
                session.on['ar.view.requestExitFullscreen'] = () => {
                    return this._requestExitFullscreen(session);
                };
                session.on['ar.view.isFullscreen'] = () => {
                    return Promise.resolve({ state: this._isFullscreen() });
                };
                session.on['ar.view.requestEnterMaximized'] = () => {
                    return this._requestEnterMaximized(session);
                };
                session.on['ar.view.requestExitMaximized'] = () => {
                    return this._requestExitMaximized(session);
                };
                session.on['ar.view.isMaximized'] = () => {
                    return Promise.resolve({ state: this._isMaximized() });
                };
            });
            this.sessionService.manager.connectEvent.addEventListener(() => {
                const resizeHandler = () => {
                    if (this.viewport)
                        this._update();
                };
                if (this.sessionService.isRealityManager && typeof window !== 'undefined') {
                    window.addEventListener('resize', resizeHandler);
                    this.sessionService.manager.closeEvent.addEventListener(() => {
                        window.removeEventListener('resize', resizeHandler);
                    });
                }
            });
        }
        this.contextService.renderEvent.addEventListener(() => {
            const state = this.contextService.serializedFrameState;
            state.view.subviews.forEach((subview, index) => {
                const id = 'ar.view_' + index;
                const subviewPose = subview.pose || IDENTITY_SUBVIEW_POSE;
                this.contextService.updateEntityFromSerializedPose(id, subviewPose);
            });
            this._update();
        });
        this.contextService.postRenderEvent.addEventListener(() => {
            if (this.vrDisplay && this.vrDisplay.isPresenting) {
                this.vrDisplay.submitFrame();
            }
        });
    }
    /**
     * Manager-only. The current vrdisplay that this view is presenting to,
     * if any.
     */
    get vrDisplay() { return this._vrDisplay; }
    ;
    getSubviews(referenceFrame) {
        this._update();
        const subviews = this._subviews;
        const viewState = this.contextService.serializedFrameState.view;
        subviews.length = viewState.subviews.length;
        viewState.subviews.forEach((serializedSubview, index) => {
            const id = 'ar.view_' + index;
            const subviewEntity = this.contextService.entities.getById(id);
            const subview = subviews[index] =
                subviews[index] || {};
            subview.index = index;
            subview.type = serializedSubview.type;
            subview.pose = this.contextService.getEntityPose(subviewEntity, referenceFrame);
            subview.viewport = serializedSubview.viewport || {
                x: 0,
                y: 0,
                width: viewState.viewport.width,
                height: viewState.viewport.height
            };
            subview.frustum = this._frustums[index] =
                this._frustums[index] || new PerspectiveFrustum();
            decomposePerspectiveProjectionMatrix(serializedSubview.projectionMatrix, subview.frustum);
            subview['projectionMatrix'] = serializedSubview.projectionMatrix;
        });
        return subviews;
    }
    /**
     * Get the current viewport. Deprecated (Use View#viewport property)
     * @private
     */
    getViewport() {
        return this.viewport;
    }
    /**
     * Get the current viewport
     */
    get viewport() {
        return this.contextService.serializedFrameState.view ?
            this.contextService.serializedFrameState.view.viewport : { x: 0, y: 0, width: 0, height: 0 };
    }
    /**
     * Request to present this view in an HMD.
     */
    requestEnterHmd() {
        return this.sessionService.manager.request('ar.view.requestEnterHmd');
    }
    _requestEnterHmd(session) {
        this._ensurePersmission(session);
        if (typeof navigator !== 'undefined' &&
            navigator.getVRDisplays) {
            const requestPresent = (vrDisplay) => {
                this._vrDisplay = vrDisplay;
                const layers = [];
                layers[0] = { source: this.element.querySelector('canvas') || this.element.lastElementChild };
                return vrDisplay.requestPresent(layers).catch((e) => {
                    this._vrDisplay = undefined;
                    throw e;
                });
            };
            if (navigator.activeVRDisplays && navigator.activeVRDisplays.length) {
                return requestPresent(navigator.activeVRDisplays[0]);
            }
            else {
                return navigator.getVRDisplays()
                    .then(displays => displays[0])
                    .then(requestPresent);
            }
        }
        throw new Error('No HMD available');
    }
    /**
     * Exit presenting this view in an HMD
     */
    requestExitHmd() {
        return this.sessionService.manager.request('ar.view.requestExitHmd');
    }
    _requestExitHmd(session) {
        this._ensurePersmission(session);
        if (this._vrDisplay) {
            return Promise.resolve(this._vrDisplay).then(vrDisplay => {
                this._vrDisplay = undefined;
                return vrDisplay.exitPresent();
            });
        }
        throw new Error("Not presenting in an HMD");
    }
    /**
     * Resolves to a boolean that indicates whether or not this view is being
     * presented in an HMD
     */
    isHmdActive() {
        return this.sessionService.manager.request('ar.view.isHmdActive').then(e => e['state']);
    }
    /**
     * Manager-only. Returns true if this view is being
     * presented in an HMD. (synchronous)
     */
    _isHmdActive() {
        return this._vrDisplay ?
            this._vrDisplay.isPresenting :
            false;
    }
    /**
     * Request to present this view in fullscreen mode
     */
    requestEnterFullscreen() {
        return this.sessionService.manager.request('ar.view.requestEnterFullscreen');
    }
    _requestEnterFullscreen(session) {
        this._ensurePersmission(session);
        const containerElement = this.element.parentElement;
        if (containerElement.requestFullscreen)
            return containerElement.requestFullscreen();
        if (containerElement.webkitRequestFullscreen)
            return containerElement.webkitRequestFullscreen();
        if (containerElement['mozRequestFullscreen'])
            return containerElement['mozRequestFullscreen']();
        throw new Error('Fullscreen not supported');
    }
    /**
     * Request to exit fullscreen display
     */
    requestExitFullscreen() {
        return this.sessionService.manager.request('ar.view.requestExitFullscreen');
    }
    _requestExitFullscreen(session) {
        this._ensurePersmission(session);
        if (document.exitFullscreen)
            return document.exitFullscreen();
        if (document.webkitExitFullscreen)
            return document.webkitExitFullscreen();
        if (document.webkitCancelFullScreen)
            return document.webkitCancelFullScreen();
        if (document['mozCancelFullScreen'])
            return document['mozCancelFullScreen']();
        throw new Error('Fullscreen not supported');
    }
    /**
     * Resolves to a boolean that indicates whether or not this view is being
     * presented in fullscreen
     */
    isFullscreen() {
        return this.sessionService.manager.request('ar.view.isFullscreen').then(e => e['state']);
    }
    /**
     * Manager-only. Returns true if this view is being
     * presented in fullscreen. (synchronous)
     */
    _isFullscreen() {
        if (this.element.parentElement === document.fullscreenElement ||
            this.element.parentElement === document.webkitFullscreenElement ||
            this.element.parentElement === document.webkitCurrentFullScreenElement ||
            this.element.parentElement === document['mozFullscreenElement']) {
            return true;
        }
        return false;
    }
    /**
     * Request to present the view maximized within the containing window
     */
    requestEnterMaximized() {
        return this.sessionService.manager.request('ar.view.requestEnterMaximized');
    }
    _requestEnterMaximized(session) {
        this._ensurePersmission(session);
        this.element.classList.add('argon-maximized');
        this.viewportChangeEvent.raiseEvent(undefined);
    }
    /**
     * Request to exit maximized mode
     */
    requestExitMaximized() {
        return this.sessionService.manager.request('ar.view.requestExitMaximized');
    }
    _requestExitMaximized(session) {
        this._ensurePersmission(session);
        this.element.classList.remove('argon-maximized');
        this.viewportChangeEvent.raiseEvent(undefined);
    }
    /**
     * Resolves to a boolean that indicates whether or not the view is maximized
     */
    isMaximized() {
        return this.sessionService.manager.request('ar.view.isMaximized').then(e => e['state']);
    }
    /**
     * Manager-only. Returns true if this view is maximized. (synchronous)
     */
    _isMaximized() {
        return this.element.classList.contains('argon-maximized');
    }
    _ensurePersmission(session) {
        if (session !== this.sessionService.manager || session !== this.focusService.session)
            throw new Error('Application must have focus');
    }
    /**
     * Set the desired root viewport
     * @private
     */
    setDesiredViewport(viewport) {
        this.sessionService.manager.send('ar.view.desiredViewport', viewport);
    }
    /**
     * Request control over the view.
     * The manager is likely to reject this request if this application is not in focus.
     * When running on an HMD, this request will always fail. If the current reality view
     * does not support custom views, this request will fail. The manager may revoke
     * ownership at any time (even without this application calling releaseOwnership)
     * @private
     */
    requestOwnership() {
    }
    /**
     * Release control over the view.
     * @private
     */
    releaseOwnership() {
    }
    /**
     * Returns true if this application has control over the view.
     * @private
     */
    isOwner() {
    }
    // Updates the element, if necessary, and raise a view change event
    _update() {
        const state = this.contextService.serializedFrameState;
        if (!state || !state.view)
            return;
        const view = state.view;
        const viewportJSON = JSON.stringify(view.viewport);
        // const previousViewport = this._currentViewport;
        this._currentViewport = Viewport.clone(view.viewport, this._currentViewport);
        if (!this._currentViewportJSON || this._currentViewportJSON !== viewportJSON) {
            this._currentViewportJSON = viewportJSON;
            if (this.element && !this.sessionService.isRealityManager) {
                requestAnimationFrame(() => {
                    const viewport = view.viewport;
                    this.element.style.position = 'fixed';
                    this.element.style.left = viewport.x + 'px';
                    this.element.style.bottom = viewport.y + 'px';
                    this.element.style.width = viewport.width + 'px';
                    this.element.style.height = viewport.height + 'px';
                });
            }
            this.viewportChangeEvent.raiseEvent(undefined);
        }
    }
    _setupEventForwarding() {
        const cloneTouch = (touch, boundingRect) => {
            return {
                identifier: touch.identifier,
                clientX: touch.clientX - boundingRect.left,
                clientY: touch.clientY - boundingRect.top,
                screenX: touch.screenX,
                screenY: touch.screenY
            };
        };
        const cloneTouches = (touches, boundingRect) => {
            if (!touches)
                return undefined;
            const touchList = [];
            for (var i = 0; i < touches.length; i++) {
                const touch = touches.item(i);
                touchList[i] = cloneTouch(touch, boundingRect);
            }
            return touchList;
        };
        let forwardEvent = false;
        const eventData = {
            event: UIEvent = undefined,
            forwardEvent: () => { forwardEvent = true; }
        };
        const uievent = {};
        const handleEvent = (e) => {
            if (e.target === this.element || e.target.parentElement === this.element) {
                const boundingRect = this.element.getBoundingClientRect();
                if (this.uiEvent.numberOfListeners > 0) {
                    forwardEvent = false;
                    eventData.event = e;
                    this.uiEvent.raiseEvent(eventData);
                    // allow the containing element to receive the current event 
                    // for local reality viewers
                    if (!forwardEvent) {
                        e.stopImmediatePropagation();
                        return;
                    }
                }
                e.preventDefault();
                const touches = cloneTouches(e.touches, boundingRect);
                const changedTouches = cloneTouches(e.changedTouches, boundingRect);
                const targetTouches = cloneTouches(e.targetTouches, boundingRect);
                uievent.type = e.type;
                uievent.bubbles = e.bubbles;
                uievent.cancelable = e.cancelable;
                uievent.detail = e.detail;
                uievent.altKey = e.altKey;
                uievent.ctrlKey = e.ctrlKey;
                uievent.metaKey = e.metaKey;
                uievent.button = e.button;
                uievent.buttons = e.buttons;
                uievent.clientX = e.clientX - boundingRect.left;
                uievent.clientY = e.clientY - boundingRect.top;
                uievent.screenX = e.screenX;
                uievent.screenY = e.screenY;
                uievent.movementX = e.movementX;
                uievent.movementY = e.movementY;
                uievent.deltaX = e.deltaX;
                uievent.deltaY = e.deltaY;
                uievent.deltaZ = e.deltaZ;
                uievent.deltaMode = e.deltaMode;
                uievent.wheelDelta = e.wheelDelta;
                uievent.wheelDeltaX = e.wheelDeltaX;
                uievent.wheelDeltaY = e.wheelDeltaY;
                uievent.which = e.which;
                uievent.timeStamp = e.timeStamp;
                uievent.touches = touches;
                uievent.changedTouches = changedTouches;
                uievent.targetTouches = targetTouches;
                this.sessionService.manager.send('ar.view.forwardUIEvent', uievent);
            }
            else {
                e.stopImmediatePropagation();
            }
        };
        ['wheel',
            'click',
            'dblclick',
            'contextmenu',
            'mouseover',
            'mouseout',
            'mousemove',
            'mousedown',
            'mouseup',
            'touchstart',
            'touchend',
            'touchmove',
            'touchcancel'
        ].forEach((type) => {
            this.element.addEventListener(type, handleEvent, false);
        });
    }
    sendUIEventToSession(uievent, session) {
        if (session)
            session.send('ar.view.uievent', uievent);
    }
    _setupEventSynthesizing() {
        let currentTarget;
        const fireMouseLeaveEvents = (target, relatedTarget, uievent) => {
            if (!target)
                return;
            const eventInit = {
                view: uievent.view,
                clientX: uievent.clientX,
                clientY: uievent.clientY,
                screenX: uievent.screenX,
                screenY: uievent.screenY,
                relatedTarget: relatedTarget
            };
            // fire mouseout
            eventInit.bubbles = true;
            target.dispatchEvent(new MouseEvent('mouseout', eventInit));
            // fire mouseleave events
            eventInit.bubbles = false;
            let el = target;
            do {
                el.dispatchEvent(new MouseEvent('mouseleave', eventInit));
                el = el['parentElement'];
            } while (el);
        };
        const fireMouseEnterEvents = (target, relatedTarget, uievent) => {
            const eventInit = {
                view: uievent.view,
                clientX: uievent.clientX,
                clientY: uievent.clientY,
                screenX: uievent.screenX,
                screenY: uievent.screenY,
                relatedTarget: relatedTarget
            };
            // fire mouseover
            eventInit.bubbles = true;
            target.dispatchEvent(new MouseEvent('mouseover', eventInit));
            // fire mouseenter events
            eventInit.bubbles = false;
            let el = target;
            do {
                el.dispatchEvent(new MouseEvent('mouseenter', eventInit));
                el = el['parentElement'];
            } while (el);
        };
        const deserializeTouches = (touches, target, uievent) => {
            touches.forEach((t, i) => {
                touches[i] = document.createTouch(uievent.view, target, t.identifier, t.clientX, t.clientY, t.screenX, t.screenY);
            });
            return touches;
        };
        const touchTargets = {};
        const touchStartTimes = {};
        this.sessionService.manager.on['ar.view.uievent'] = (uievent) => {
            uievent.view = window;
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
                    const primaryTouch = uievent.changedTouches[0];
                    target = document.elementFromPoint(primaryTouch.clientX, primaryTouch.clientY);
                    for (const t of uievent.changedTouches) {
                        touchTargets[t.identifier] = target;
                        touchStartTimes[t.identifier] = performance.now();
                    }
                case 'touchmove':
                case 'touchend':
                case 'touchcancel':
                    target = touchTargets[uievent.changedTouches[0].identifier];
                    var evt = document.createEvent('TouchEvent');
                    const touches = document.createTouchList.apply(document, deserializeTouches(uievent.touches, target, uievent));
                    const targetTouches = document.createTouchList.apply(document, deserializeTouches(uievent.targetTouches, target, uievent));
                    const changedTouches = document.createTouchList.apply(document, deserializeTouches(uievent.changedTouches, target, uievent));
                    // Safari, Firefox: must use initTouchEvent.
                    if (typeof evt['initTouchEvent'] === "function") {
                        evt['initTouchEvent'](uievent.type, uievent.bubbles, uievent.cancelable, uievent.view, uievent.detail, uievent.screenX, uievent.screenY, uievent.clientX, uievent.clientY, uievent.ctrlKey, uievent.altKey, uievent.shiftKey, uievent.metaKey, touches, targetTouches, changedTouches, 1.0, 0.0);
                    }
                    else {
                        evt.initUIEvent(uievent.type, uievent.bubbles, uievent.cancelable, uievent.view, uievent.detail);
                        evt.touches = touches;
                        evt.targetTouches = targetTouches;
                        evt.changedTouches = changedTouches;
                    }
                    if (uievent.type === 'touchend' || uievent.type == 'touchcancel') {
                        target.dispatchEvent(evt);
                        const primaryTouch = changedTouches[0];
                        uievent.clientX = primaryTouch.clientX;
                        uievent.clientY = primaryTouch.clientY;
                        uievent.screenX = primaryTouch.screenX;
                        uievent.screenY = primaryTouch.screenY;
                        uievent.button = 0;
                        uievent.detail = 1;
                        if (uievent.type === 'touchend') {
                            if (performance.now() - touchStartTimes[primaryTouch.identifier] < 300 && !evt.defaultPrevented) {
                                target.dispatchEvent(new MouseEvent('mousedown'), uievent);
                                target.dispatchEvent(new MouseEvent('mouseup'), uievent);
                                target.dispatchEvent(new MouseEvent('click'), uievent);
                            }
                        }
                        else {
                            target.dispatchEvent(new MouseEvent('mouseout'), uievent);
                        }
                        for (const t of uievent.changedTouches) {
                            delete touchTargets[t.identifier];
                            delete touchStartTimes[t.identifier];
                        }
                    }
                    else {
                        target.dispatchEvent(evt);
                    }
                    break;
                default:
                    target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                    target.dispatchEvent(new MouseEvent(uievent.type, uievent));
            }
        };
    }
};
ViewService = __decorate([
    inject(ContainerElement, SessionService, ContextService, FocusService)
], ViewService);

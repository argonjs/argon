import { autoinject, inject, Optional } from 'aurelia-dependency-injection'
import { Viewport } from './common'
import { SessionService, SessionPort } from './session'
import { ContextService } from './context'
import { 
    Event,
    isIOS,
    createEventForwarder,
    synthesizeEvent,
    deprecated
} from './utils'
import { FocusService, FocusServiceProvider } from './focus'
import { VisibilityServiceProvider } from './visibility'

export const enum ViewportMode {
    EMBEDDED = 0,
    PAGE = 0, // alias for EMBEDDED
    IMMERSIVE
}

export abstract class ViewElement {};

/**
 * Manages the view state
 */
@inject(SessionService, ContextService, FocusService, Optional.of(ViewElement))
export class ViewportService {
    
    /**
     * UI events that occur within this view. To handle an event (and prevent it from
     * being forwarded to another layer) call event.stopImmediatePropagation().
     */
    public uiEvent = new Event<{event:UIEvent|MouseEvent|TouchEvent|PointerEvent|WheelEvent, forwardEvent:()=>void}>();

    /**
     * An event that is raised when the viewport has changed
     */
    public changeEvent = new Event<Viewport>();

    /**
     * An event that is raised when the viewport mode has changed
     */
    public modeChangeEvent = new Event<ViewportMode>();

    /**
     * The current viewport mode
     */
    public get mode() { return this._mode }
    private _mode = ViewportMode.EMBEDDED;

    @deprecated('mode')
    public get presentationMode() { return this.mode }

    /**
     * Automatically layout the element to match the immersive viewport during PresentationMode.IMMERSIVE
     */
    public autoLayoutImmersiveMode = true;

    /**
     * Automatically publish the viewport of the element during PresentationMode.EMBEDDED
     */
    public autoPublishEmbeddedMode = true;

    /**
     * The DOM element associated with this viewport
     */
    public element:HTMLElement;

    private _currentViewport: Viewport;
    private _currentViewportJSON: string;

    constructor(
        private sessionService: SessionService,
        private contextService: ContextService,
        private focusService: FocusService,
        elementOrSelector?: Element|string|null) {

        if (typeof document !== 'undefined' && document.createElement) {

            let element = elementOrSelector;
            if (!element || typeof element === 'string') {
                const selector = element;
                element = selector ? <Element>document.querySelector(selector) : undefined;
                if (!element && !selector) {
                    element = document.querySelector('#argon');
                    if (!element) {
                        element = document.createElement('div');
                        element.id = 'argon';
                        document.body.appendChild(element);
                    }
                } else if (!element) {
                    throw new Error('Unable to find element with selector: ' + selector);
                }
            }

            this.element = <HTMLElement>element;
            element.classList.add('argon-view');

            // prevent pinch-zoom of the page in ios 10.
            if (isIOS) {
                const touchMoveListener = (event) => {
                    if (event.touches.length > 1)
                        event.preventDefault();
                }
                this.element.addEventListener('touchmove', touchMoveListener, true);
                this.sessionService.manager.closeEvent.addEventListener(()=>{
                    this.element.removeEventListener('touchmove', touchMoveListener)
                });
            }

            this.focusService.focusEvent.addEventListener(() => {
                document.documentElement.classList.remove('argon-no-focus');
                document.documentElement.classList.remove('argon-blur');
                document.documentElement.classList.add('argon-focus');
            });

            this.focusService.blurEvent.addEventListener(() => {
                document.documentElement.classList.remove('argon-focus');
                document.documentElement.classList.add('argon-blur');
                document.documentElement.classList.add('argon-no-focus');
            });

            this.modeChangeEvent.addEventListener((mode)=>{
                switch (mode) {
                    case ViewportMode.EMBEDDED:
                        document.documentElement.classList.remove('argon-immersive');
                        break;
                    case ViewportMode.IMMERSIVE:
                        document.documentElement.classList.add('argon-immersive');
                        break;
                }
            });

            this.sessionService.manager.on['ar.viewport.uievent'] = synthesizeEvent!;

            if (!this.sessionService.isRealityViewer) {
                createEventForwarder(this, (event)=>{
                    if (this.sessionService.manager.isConnected && this.sessionService.manager.version[0] >= 1)
                        this.sessionService.manager.send('ar.viewport.forwardUIEvent', event);
                });
                this._watchEmbeddedViewport();
            }
        }

        sessionService.manager.on['ar.viewport.mode'] = 
            ({mode}:{mode:ViewportMode}) => {
                this._updateViewportMode(mode);
            }

        this.contextService.frameStateEvent.addEventListener((state) => {
            this._updateViewport(state.viewport);
        });

        // if we are not the manager, we must start in immersive mode
        if (!sessionService.isRealityManager)
            this._updateViewportMode(ViewportMode.IMMERSIVE);

        // if we are loaded in an older manager which does not support embedded mode,
        // then switch to immersive mode
        sessionService.manager.connectEvent.addEventListener(()=>{
            if (sessionService.manager.version[0] === 0 ||
                !sessionService.isRealityManager) {
                this._updateViewportMode(ViewportMode.IMMERSIVE);
            }
        });
    }

    /**
     * Get the current viewport
     */
    public get current() {
        return this.contextService.serializedFrameState.viewport;
    }

    @deprecated('desiredMode')
    public requestPresentationMode(mode:ViewportMode) : Promise<void> {
        return this.sessionService.manager.request('ar.viewport.desiredMode', {mode});
    }

    private _desiredMode:ViewportMode = this.mode;

    public set desiredMode(mode:ViewportMode) {
        this._desiredMode = mode;
        if (this.sessionService.manager.version[0] > 0)
            this.sessionService.manager.send('ar.viewport.desiredMode', {mode});
    }

    public get desiredMode() {
        return this._desiredMode;
    }

    private _updateViewportMode(mode:ViewportMode) {
        const currentMode = this.mode;
        if (currentMode !== mode) {
            this._mode = mode;
            this.modeChangeEvent.raiseEvent(mode);
        }
    }

    /**
     * Publish the viewport being used in [[PresentationMode.EMBEDDED]] 
     * so that other apps can use the same viewport
     */
    public publishEmbeddedViewport(viewport?: Viewport) {
        if (this.sessionService.manager.isConnected && this.sessionService.manager.version[0] >= 1) 
            this.sessionService.manager.send('ar.viewport.embeddedViewport', {viewport});
    }

    // Updates the element, if necessary, and raise a view change event
    private _updateViewport(viewport:Viewport) {
        const viewportJSON = JSON.stringify(viewport);
        // const previousViewport = this._currentViewport;
        this._currentViewport = Viewport.clone(viewport, this._currentViewport)!;

        if (!this._currentViewportJSON || this._currentViewportJSON !== viewportJSON) {
            this._currentViewportJSON = viewportJSON;

            if (this.element && 
                !this.sessionService.isRealityManager && 
                this.autoLayoutImmersiveMode && 
                this.mode === ViewportMode.IMMERSIVE) {
                requestAnimationFrame(() => {
                    this.element.style.position = 'fixed';
                    this.element.style.left = viewport.x + 'px';
                    this.element.style.bottom = viewport.y + 'px';
                    this.element.style.width = viewport.width + 'px';
                    this.element.style.height = viewport.height + 'px';
                })
            }

            this.changeEvent.raiseEvent(this._currentViewport);
        }
    }

    public sendUIEventToSession(uievent:UIEvent, session?:SessionPort) {
        if (session && session.isConnected) session.send('ar.viewport.uievent', uievent);
    }

    private _watchEmbeddedViewport() {
        const publish = () => {
            if (this.element && this.autoPublishEmbeddedMode) {
                const parentElement = this.element.parentElement;
                const rect = parentElement && parentElement.getBoundingClientRect();
                rect && this.publishEmbeddedViewport({
                    x: rect.left,
                    y: window.innerHeight - rect.bottom,
                    width: rect.width,
                    height: rect.height
                });
            }
        }

        setInterval(()=>{
            if (!this.focusService.hasFocus) publish();
        }, 500);

        this.contextService.frameStateEvent.addEventListener(()=>{
            if (this.focusService.hasFocus) publish();
        });
    }
}


@autoinject()
export class ViewportServiceProvider {

    public sessionViewportMode = new WeakMap<SessionPort, ViewportMode>();

    /**
     * The embedded viewports for each managed session.
     */
    public sessionEmbeddedViewport = new WeakMap<SessionPort, Viewport>();

    /**
     * A UI event being forwarded from a managed session 
     */
    public forwardedUIEvent = new Event<UIEvent>();

    constructor(
        private sessionService:SessionService,
        private viewportService:ViewportService,
        private focusServiceProvider:FocusServiceProvider,
        visibilityServiceProvider:VisibilityServiceProvider
    ) {
        sessionService.ensureIsRealityManager();

        sessionService.connectEvent.addEventListener((session) => {

            this.sessionViewportMode.set(session, 
                session === this.sessionService.manager ? 
                    this.viewportService.desiredMode : 
                    ViewportMode.IMMERSIVE
            );
            
            // forward ui events to the visible reality viewer
            session.on['ar.viewport.forwardUIEvent'] = (uievent:UIEvent) => {
                this.forwardedUIEvent.raiseEvent(uievent);
            }
            
            session.on['ar.viewport.desiredMode'] = ({mode}:{mode:ViewportMode})=> {
                this.sessionViewportMode.set(session, mode);
                this._publishViewportModes();
            }

            session.on['ar.viewport.embeddedViewport'] = (viewport: Viewport) => {
                this.sessionEmbeddedViewport.set(session, viewport);
            }

            this._publishViewportModes();
            
        });

        focusServiceProvider.sessionFocusEvent.addEventListener(()=>{
            this._publishViewportModes();
        })
    }

    public sendUIEventToSession(uievent:UIEvent, session:SessionPort) {
        session.send('ar.viewport.uievent', uievent);
    }

    private _publishViewportModes() {
        this.sessionService.manager.send('ar.viewport.mode', {
            mode: this.sessionViewportMode.get(this.sessionService.manager)
        });
        for (const session of this.sessionService.managedSessions) {
            const mode = (session === this.focusServiceProvider.session) ?
                this.sessionViewportMode.get(session) : ViewportMode.IMMERSIVE;
            session.send('ar.viewport.mode', {mode});
        }
    }
}


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

    const style = document.createElement("style");
    style.type = 'text/css';
    document.head.insertBefore(style, document.head.firstChild);
    const sheet = <CSSStyleSheet>style.sheet;
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
        .argon-view {
            -webkit-tap-highlight-color: transparent;
            -webkit-user-select: none;
            user-select: none;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-immersive .argon-view {
            position: fixed !important;
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            max-height: 100% !important;
            left: 0;
            bottom: 0;
            margin: 0;
            border: 0;
            padding: 0;
            visibility: visible;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-immersive body {
            visibility: hidden;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-interactive {
            pointer-events: auto;
        }
    `, sheet.cssRules.length);
}

import { autoinject, inject, Optional } from 'aurelia-dependency-injection'
import { Viewport } from './common'
import { SessionService, SessionPort } from './session'
import { ContextService } from './context'
import { 
    Event,
    resolveElement, 
    isIOS,
    createEventForwarder,
    synthesizeEvent
} from './utils'
import { FocusService, FocusServiceProvider } from './focus'
import { VisibilityServiceProvider } from './visibility'

export const enum PresentationMode {
    PAGE,
    IMMERSIVE
}

export const ParentElement = '#argon';

/**
 * Manages the view state
 */
@inject(SessionService, ContextService, FocusService, Optional.of(ParentElement))
export class ViewportService {
    
    /**
     * UI events that occur within this view. To handle an event (and prevent it from
     * being forwarded to another layer) call event.stopImmediatePropagation().
     */
    public uiEvent = new Event<{event:UIEvent|MouseEvent|TouchEvent|PointerEvent|WheelEvent, forwardEvent:()=>void}>();

    /**
     * An event that is raised when the viewport has changed
     */
    public changeEvent = new Event<void>();

    /**
     * An event that is raised when the presentation mode has changed
     */
    public presentationModeChangeEvent = new Event<PresentationMode>();

    /**
     * The current presentation mode
     */
    public get presentationMode() { return this._presentationMode }
    private _presentationMode = PresentationMode.PAGE;

    /**
     * The root HTMLDivElement element for this view.
     * This value is undefined in non-DOM environments.
     */
    public rootElement: HTMLDivElement;

    /**
     * An HTMLDivElement which represents the viewport.
     * This value is undefined in non-DOM environments.
     */
    public element: HTMLDivElement;

    /**
     * Automatically watch and publish the viewport during PresentationMode.EMBEDDED
     */
    public autoPublishEmbeddedViewport = true;

    private _currentViewport: Viewport;
    private _currentViewportJSON: string;

    constructor(
        private sessionService: SessionService,
        private contextService: ContextService,
        private focusService: FocusService,
        parentElementOrSelector?: string|HTMLElement) {

        if (typeof document !== 'undefined' && document.createElement) {
            this.rootElement = document.createElement('div');
            this.rootElement.classList.add('argon-view');

            const viewportElement = this.element = document.createElement('div');
            viewportElement.classList.add('argon-viewport');
            this.rootElement.appendChild(viewportElement);

            // prevent pinch-zoom of the page in ios 10.
            if (isIOS) {
                viewportElement.addEventListener('touchmove', (event) => {
                    if (event.touches.length > 1)
                        event.preventDefault();
                }, true);
            }

            const insertRootIntoParentElement = (parentElement:HTMLElement) => {
                if (this.sessionService.manager.isClosed) return;
                parentElement.insertBefore(this.rootElement, parentElement.firstChild);
                this.sessionService.manager.closeEvent.addEventListener(()=>{
                    this.rootElement.remove();
                });
            }
            
            // first check for the specificied element synchronously, then
            // if synchronous check fails, wait for document to load, then insert
            if (parentElementOrSelector && parentElementOrSelector instanceof HTMLElement) {
                insertRootIntoParentElement(parentElementOrSelector);
            } else if (parentElementOrSelector === `#argon`) {
                // first check synchronously
                let parentElement = <HTMLDivElement>document.querySelector(`#argon`);
                if (parentElement) {
                    insertRootIntoParentElement(parentElement);
                } else {
                    resolveArgonElement().then(insertRootIntoParentElement);
                }
            } else if (parentElementOrSelector) {
                // first check synchronously
                let parentElement = <HTMLDivElement>document.querySelector(`${parentElementOrSelector}`);
                if (parentElement) {
                    insertRootIntoParentElement(parentElement);
                } else {
                    resolveElement(parentElementOrSelector).then(insertRootIntoParentElement);
                }
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

            this.presentationModeChangeEvent.addEventListener((mode)=>{
                switch (mode) {
                    case PresentationMode.PAGE: 
                        this.rootElement.classList.remove('argon-maximize');
                        document.documentElement.classList.remove('argon-immersive');
                        break;
                    case PresentationMode.IMMERSIVE: 
                        this.rootElement.classList.add('argon-maximize');
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

        sessionService.manager.on['ar.viewport.presentationMode'] = 
            ({mode}:{mode:PresentationMode}) => {
                this._updatePresentationMode(mode);
            }

        this.contextService.frameStateEvent.addEventListener((state) => {
            this._updateViewport(state.viewport);
        });

        // older version of argon-app manager only property supported immersive mode. 
        sessionService.manager.connectEvent.addEventListener(()=>{
            if (sessionService.manager.version[0] === 0) {
                this._updatePresentationMode(PresentationMode.IMMERSIVE);
            }
        })
    }

    /**
     * Get the current viewport
     */
    public get current() {
        return this.contextService.serializedFrameState.viewport;
    }

    /**
     * Request a presentation mode
     * - [[PresentationMode.PAGE]] : present the entire document
     * - [[PresentationMode.IMMERSIVE]] : present only the argon.js view
     */
    public requestPresentationMode(mode:PresentationMode) : Promise<void> {
        return this.sessionService.manager.request('ar.viewport.requestPresentationMode', {mode});
    }

    private _updatePresentationMode(mode:PresentationMode) {
        const currentMode = this.presentationMode;
        if (currentMode !== mode) {
            this._presentationMode = mode;
            this.presentationModeChangeEvent.raiseEvent(mode);
            this.changeEvent.raiseEvent(undefined);
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

            if (this.element && !this.sessionService.isRealityManager) {
                requestAnimationFrame(() => {
                    this.element.style.position = 'fixed';
                    this.element.style.left = viewport.x + 'px';
                    this.element.style.bottom = viewport.y + 'px';
                    this.element.style.width = viewport.width + 'px';
                    this.element.style.height = viewport.height + 'px';
                })
            }

            this.changeEvent.raiseEvent(undefined);
        }
    }

    public sendUIEventToSession(uievent:UIEvent, session?:SessionPort) {
        if (session && session.isConnected) session.send('ar.viewport.uievent', uievent);
    }

    private _watchEmbeddedViewport() {
        const publish = () => {
            if (this.element && this.autoPublishEmbeddedViewport) {
                const parentElement = this.rootElement.parentElement;
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

    /**
     * The embedded viewports for each managed session.
     */
    public embeddedViewports = new WeakMap<SessionPort, Viewport>();

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
            
            // forward ui events to the visible reality viewer
            session.on['ar.viewport.forwardUIEvent'] = (uievent:UIEvent) => {
                this.forwardedUIEvent.raiseEvent(uievent);
            }
            
            session.on['ar.viewport.requestPresentationMode'] = ({mode}:{mode:PresentationMode})=> {
                return this._handleRequestPresentationMode(session, mode);
            }

            session.on['ar.viewport.embeddedViewport'] = (viewport: Viewport) => {
                this.embeddedViewports.set(session, viewport);
            }
            
        });
    }

    public sendUIEventToSession(uievent:UIEvent, session:SessionPort) {
        session.send('ar.viewport.uievent', uievent);
    }

    private _handleRequestPresentationMode(session, mode) {
        this._ensurePersmission(session);
        if (this.viewportService.presentationMode !== mode) {
            this.sessionService.manager.send('ar.viewport.presentationMode', {mode})
            for (session of this.sessionService.managedSessions) {
                session.send('ar.viewport.presentationMode', {mode});
            }
        }
    }

    protected _ensurePersmission(session:SessionPort) {
        if (session !== this.sessionService.manager && session !== this.focusServiceProvider.session)
            throw new Error('Application must have focus');
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

    let argonElementPromise;

    var resolveArgonElement = () => {
        if (argonElementPromise) return argonElementPromise; 
        return argonElementPromise = resolveElement('#argon').catch(()=>{
            const argonElement = document.createElement('div');
            argonElement.id = 'argon';
            document.body.appendChild(argonElement);
            return argonElement;
        });
    }

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
        .argon-view, .argon-view ~ * {
            width: 100%;
            height: 100%;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-view > * {
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
        .argon-view > * > * {
            pointer-events: auto;
            -webkit-tap-highlight-color: initial;
            -webkit-user-select: initial;
            user-select: initial;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-viewport {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: auto;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-viewport > * {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-viewport > * > * {
            pointer-events: auto;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-maximize, .argon-maximize ~ * {
            pointer-events: none;
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
        .argon-interactive {
            pointer-events: auto;
        }
    `, sheet.cssRules.length);
}

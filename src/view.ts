import { autoinject, singleton } from 'aurelia-dependency-injection'
import { CanvasViewport, Viewport, ContextFrameState, SubviewType } from './common'
import { SessionService, SessionPort } from './session'
import { ContextService } from './context'
import { EntityPose } from './entity'

import { PerspectiveFrustum, Matrix4 } from './cesium/cesium-imports'

import { 
    Event,
    decomposePerspectiveProjectionMatrix,
    deprecated
} from './utils'

import { FocusService, FocusServiceProvider } from './focus'
import { VisibilityServiceProvider } from './visibility'

/**
 * The rendering paramters for a particular subview
 */
export class Subview {
    index: number;
    type: SubviewType;
    frustum: PerspectiveFrustum;
    pose: EntityPose;
    viewport: Viewport;
    renderViewport: Viewport;
}

export const enum ViewportMode {
    EMBEDDED = 0,
    PAGE = 0, // alias for EMBEDDED
    IMMERSIVE
}

@singleton()
export class ViewItems {
    public element?: HTMLElement;
    public layers?: {source: HTMLElement}[];
}

/**
 * Manages the view state
 */
@autoinject
export class ViewService {
    
    /**
     * UI events that occur within this view. To handle an event (and prevent it from
     * being forwarded to another layer) call event.stopImmediatePropagation().
     */
    public uiEvent = new Event<{event:UIEvent|MouseEvent|TouchEvent|PointerEvent|WheelEvent, forwardEvent:()=>void}>();

    /**
     * An event that is raised when the viewport has changed
     */
    public viewportChangeEvent = new Event<CanvasViewport>();

    /**
     * An event that is raised when the viewport mode has changed
     */
    public viewportModeChangeEvent = new Event<ViewportMode>();

    /**
     * The current viewport mode
     */
    public get viewportMode() { return this._mode }
    private _mode = ViewportMode.EMBEDDED;

    @deprecated('viewportMode')
    protected get presentationMode() { return this.viewportMode }

    /**
     * The current viewport
     */
    public get viewport() {
        return this._viewport;
    }
    private _viewport = new Viewport;

    /**
     * The width which should be used for the render buffer
     */
    public get renderWidth() {
        return this._renderWidth;
    }
    private _renderWidth = 0;

    /**
     * The height which should be used for the render buffer
     */
    public get renderHeight() {
        return this._renderHeight;
    }
    private _renderHeight = 0;
    
    @deprecated('viewport')
    public getViewport() {
        return this.viewport;
    }

    /**
     * Automatically layout the element to match the immersive viewport during PresentationMode.IMMERSIVE
     */
    public autoLayoutImmersiveMode = true;

    /**
     * Automatically style layer elements
     */
    public autoStyleLayerElements = true;

    /**
     * Automatically publish the viewport of the element during PresentationMode.EMBEDDED
     */
    public autoPublishEmbeddedMode = true;

    constructor(
        private sessionService: SessionService,
        private focusService: FocusService,
        private viewItems: ViewItems
       ) {
        sessionService.manager.on['ar.view.viewportMode'] = 
            ({mode}:{mode:ViewportMode}) => {
                this._updateViewportMode(mode);
            }

        // if we are not the manager, we must start in immersive mode
        if (!sessionService.isRealityManager)
            this._updateViewportMode(ViewportMode.IMMERSIVE);

        sessionService.manager.connectEvent.addEventListener(()=>{
            this.viewportModeChangeEvent.raiseEvent(this.viewportMode);
        })
    }

    public setLayers(layers:{source:HTMLElement}[]) {
        const currentLayers = this.viewItems.layers;
        if (currentLayers) { 
            for (const l of currentLayers) {
                this.element!.removeChild(l.source);
            }
        }
        this.viewItems.layers = layers;
        for (const l of layers) {
            this.element!.appendChild(l.source);
        }
    }    
    
     /**
     * The DOM element associated with this view
     */
    public get element() {
        return this.viewItems.element!;
    }

    /**
     * The layers composing this view. 
     */
    public get layers() {
        return this.viewItems.layers;
    }

    private _currentViewportJSON: string;

    private _subviews: Subview[] = [];
    private _subviewFrustum: PerspectiveFrustum[] = [];

    public get subviews() {
        return this._subviews;
    }

    /**
     * @private
     */
    @deprecated('subviews')
    protected getSubviews() {
        return this.subviews;
    }

    // Kind of hacky that we are passing the ContextService here.
    // Might be better to bring this logic into the ContextService
    public _processContextFrameState(state:ContextFrameState, contextService:ContextService) {

        const renderWidthScaleFactor = state.viewport.renderWidthScaleFactor || 1;
        const renderHeightScaleFactor = state.viewport.renderHeightScaleFactor || 1;
        this._renderWidth = state.viewport.width * renderWidthScaleFactor;
        this._renderHeight = state.viewport.height * renderHeightScaleFactor;

        const serializedSubviewList = state.subviews;
        const subviews: Subview[] = this._subviews;
        subviews.length = serializedSubviewList.length;

        let index = 0;
        for (const serializedSubview of serializedSubviewList) {

            const subview = subviews[index] = subviews[index] || <Subview>{};
            subview.index = index;
            subview.type = serializedSubview.type;

            subview.viewport = subview.viewport || {};
            subview.viewport.x = serializedSubview.viewport.x;
            subview.viewport.y = serializedSubview.viewport.y;
            subview.viewport.width = serializedSubview.viewport.width;
            subview.viewport.height = serializedSubview.viewport.height;
            subview.renderViewport = subview.renderViewport || {};
            subview.renderViewport.x = serializedSubview.viewport.x * renderWidthScaleFactor;
            subview.renderViewport.y = serializedSubview.viewport.y * renderHeightScaleFactor;
            subview.renderViewport.width = serializedSubview.viewport.width * renderWidthScaleFactor;
            subview.renderViewport.height = serializedSubview.viewport.height * renderHeightScaleFactor;

            subview.frustum = this._subviewFrustum[index] = 
                this._subviewFrustum[index] || new PerspectiveFrustum();
            decomposePerspectiveProjectionMatrix(serializedSubview.projectionMatrix, subview.frustum);
            subview['projectionMatrix'] = <Matrix4>subview.frustum.projectionMatrix;

            subview.pose = contextService.getEntityPose(contextService.getSubviewEntity(index));
            subview.pose.update(state.time);
            
            index++;
        }

        this._updateViewport(state.viewport);
    }

    @deprecated('desiredViewportMode')
    public requestPresentationMode(mode:ViewportMode) : Promise<void> {
        return this.sessionService.manager.request('ar.view.desiredViewportMode', {mode});
    }

    private _desiredViewportMode:ViewportMode = this.viewportMode;

    public set desiredViewportMode(mode:ViewportMode) {
        this._desiredViewportMode = mode;
        this.sessionService.manager.whenConnected().then(()=>{
            if (this.sessionService.manager.version[0] > 0)
                this.sessionService.manager.send('ar.view.desiredViewportMode', {mode});
        })
    }

    public get desiredViewportMode() {
        return this._desiredViewportMode;
    }

    private _updateViewportMode(mode:ViewportMode) {
        const currentMode = this.viewportMode;
        if (currentMode !== mode) {
            this._mode = mode;
            this.viewportModeChangeEvent.raiseEvent(mode);
        }
    }

    /**
     * Publish the viewport being used in [[PresentationMode.EMBEDDED]] 
     * so that the manager knows what our embedded viewport is
     */
    public publishEmbeddedViewport(viewport?: Viewport) {
        if (this.sessionService.manager.isConnected && 
            this.sessionService.manager.version[0] >= 1) 
            this.sessionService.manager.send('ar.view.embeddedViewport', {viewport});
    }

    // Updates the element, if necessary, and raise a view change event
    private _updateViewport(viewport:CanvasViewport) {
        const viewportJSON = JSON.stringify(viewport);
        
        if (!this._currentViewportJSON || this._currentViewportJSON !== viewportJSON) {
            this._currentViewportJSON = viewportJSON;

            this._viewport = Viewport.clone(viewport, this._viewport)!;

            this.viewportChangeEvent.raiseEvent(viewport);
        }
    }

    public sendUIEventToSession(uievent:UIEvent, session?:SessionPort) {
        if (session && session.isConnected) session.send('ar.view.uievent', uievent);
    }

    private _embeddedViewport = new Viewport; 

    /**
     * @private
     */
    public _watchEmbeddedViewport() {
        const publish = () => {
            if (this.element && this.autoPublishEmbeddedMode) {
                const parentElement = this.element.parentElement;
                const rect = parentElement && parentElement.getBoundingClientRect();
                if (rect) {
                    const x = rect.left;
                    const y = window.innerHeight - rect.bottom;
                    const width = rect.width;
                    const height = rect.height;

                    const embeddedViewport = this._embeddedViewport;

                    if (embeddedViewport.x !== x || 
                        embeddedViewport.y !== y || 
                        embeddedViewport.width !== width ||
                        embeddedViewport.height !== height) {
                            embeddedViewport.x = x;
                            embeddedViewport.y = y;
                            embeddedViewport.width = width;
                            embeddedViewport.height = height;
                            this.publishEmbeddedViewport(this._embeddedViewport);
                    }
                }
            }
        }

        setInterval(()=>{
            if (!this.focusService.hasFocus) publish();
        }, 500);

        // this.contextService.renderEvent.addEventListener(()=>{
        //     if (this.focusService.hasFocus) publish();
        // });

        if (typeof window !== 'undefined' && window.addEventListener) {
            window.addEventListener('orientationchange', publish);
            window.addEventListener('scroll', publish);
            this.sessionService.manager.closeEvent.addEventListener(()=>{
                window.removeEventListener('orientationchange', publish);
                window.removeEventListener('scroll', publish);
            })
        }
    }
}


@autoinject()
export class ViewServiceProvider {

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
        private viewService:ViewService,
        private focusServiceProvider:FocusServiceProvider,
        visibilityServiceProvider:VisibilityServiceProvider
    ) {
        sessionService.ensureIsRealityManager();

        sessionService.connectEvent.addEventListener((session) => {

            this.sessionViewportMode.set(session, 
                session === this.sessionService.manager ? 
                    this.viewService.desiredViewportMode : 
                    ViewportMode.IMMERSIVE
            );
            
            // forward ui events to the visible reality viewer
            session.on['ar.view.forwardUIEvent'] = (uievent:UIEvent) => {
                this.forwardedUIEvent.raiseEvent(uievent);
            }
            
            session.on['ar.view.desiredViewportMode'] = ({mode}:{mode:ViewportMode})=> {
                this.sessionViewportMode.set(session, mode);
                this._publishViewportModes();
            }

            session.on['ar.view.embeddedViewport'] = (viewport: CanvasViewport) => {
                this.sessionEmbeddedViewport.set(session, viewport);
            }

            this._publishViewportModes();
            
        });

        focusServiceProvider.sessionFocusEvent.addEventListener(()=>{
            this._publishViewportModes();
        })
    }

    public sendUIEventToSession(uievent:UIEvent, session:SessionPort) {
        session.send('ar.view.uievent', uievent);
    }

    private _publishViewportModes() {
        this.sessionService.manager.send('ar.view.viewportMode', {
            mode: this.sessionViewportMode.get(this.sessionService.manager)
        });
        for (const session of this.sessionService.managedSessions) {
            const mode = (session === this.focusServiceProvider.session) ?
                this.sessionViewportMode.get(session) : ViewportMode.IMMERSIVE;
            if (session.version[0] > 0)
                session.send('ar.view.viewportMode', {mode});
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
        :not(.argon-reality-manager).argon-immersive body {
            visibility: hidden;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-interactive {
            pointer-events: auto;
        }
    `, sheet.cssRules.length);
}

/// <reference types="cesium" />
import { CanvasViewport, Viewport, ContextFrameState, SubviewType } from './common';
import { SessionService, SessionPort } from './session';
import { ContextService } from './context';
import { EntityPose } from './entity';
import { PerspectiveFrustum } from './cesium/cesium-imports';
import { Event } from './utils';
import { FocusService, FocusServiceProvider } from './focus';
import { VisibilityServiceProvider } from './visibility';
/**
 * The rendering paramters for a particular subview
 */
export declare class Subview {
    index: number;
    type: SubviewType;
    frustum: PerspectiveFrustum;
    pose: EntityPose;
    viewport: Viewport;
    renderViewport: Viewport;
}
export declare const enum ViewportMode {
    EMBEDDED = 0,
    PAGE = 0,
    IMMERSIVE = 1,
}
export declare class ViewItems {
    element?: HTMLElement;
    layers?: {
        source: HTMLElement;
    }[];
}
/**
 * Manages the view state
 */
export declare class ViewService {
    private sessionService;
    private focusService;
    private viewItems;
    /**
     * UI events that occur within this view. To handle an event (and prevent it from
     * being forwarded to another layer) call event.stopImmediatePropagation().
     */
    uiEvent: Event<{
        event: UIEvent | MouseEvent | PointerEvent | WheelEvent | TouchEvent;
        forwardEvent: () => void;
    }>;
    /**
     * An event that is raised when the viewport has changed
     */
    viewportChangeEvent: Event<CanvasViewport>;
    /**
     * An event that is raised when the viewport mode has changed
     */
    viewportModeChangeEvent: Event<ViewportMode>;
    /**
     * The current viewport mode
     */
    readonly viewportMode: ViewportMode;
    private _mode;
    protected readonly presentationMode: ViewportMode;
    /**
     * The current viewport
     */
    readonly viewport: Viewport;
    private _viewport;
    /**
     * The width which should be used for the render buffer
     */
    readonly renderWidth: number;
    private _renderWidth;
    /**
     * The height which should be used for the render buffer
     */
    readonly renderHeight: number;
    private _renderHeight;
    getViewport(): Viewport;
    /**
     * Automatically layout the element to match the immersive viewport during PresentationMode.IMMERSIVE
     */
    autoLayoutImmersiveMode: boolean;
    /**
     * Automatically style layer elements
     */
    autoStyleLayerElements: boolean;
    /**
     * Automatically publish the viewport of the element during PresentationMode.EMBEDDED
     */
    autoPublishEmbeddedMode: boolean;
    constructor(sessionService: SessionService, focusService: FocusService, viewItems: ViewItems);
    setLayers(layers: {
        source: HTMLElement;
    }[]): void;
    /**
    * The DOM element associated with this view
    */
    readonly element: HTMLElement;
    /**
     * The layers composing this view.
     */
    readonly layers: {
        source: HTMLElement;
    }[] | undefined;
    private _currentViewportJSON;
    private _subviews;
    private _subviewFrustum;
    readonly subviews: Subview[];
    /**
     * @private
     */
    protected getSubviews(): Subview[];
    _processContextFrameState(state: ContextFrameState, contextService: ContextService): void;
    requestPresentationMode(mode: ViewportMode): Promise<void>;
    private _desiredViewportMode;
    desiredViewportMode: ViewportMode;
    private _updateViewportMode(mode);
    /**
     * Publish the viewport being used in [[PresentationMode.EMBEDDED]]
     * so that the manager knows what our embedded viewport is
     */
    publishEmbeddedViewport(viewport?: Viewport): void;
    private _updateViewport(viewport);
    sendUIEventToSession(uievent: UIEvent, session?: SessionPort): void;
    private _embeddedViewport;
    /**
     * @private
     */
    _watchEmbeddedViewport(): void;
}
export declare class ViewServiceProvider {
    private sessionService;
    private viewService;
    private focusServiceProvider;
    sessionViewportMode: WeakMap<SessionPort, ViewportMode>;
    /**
     * The embedded viewports for each managed session.
     */
    sessionEmbeddedViewport: WeakMap<SessionPort, Viewport>;
    /**
     * A UI event being forwarded from a managed session
     */
    forwardedUIEvent: Event<UIEvent>;
    constructor(sessionService: SessionService, viewService: ViewService, focusServiceProvider: FocusServiceProvider, visibilityServiceProvider: VisibilityServiceProvider);
    sendUIEventToSession(uievent: UIEvent, session: SessionPort): void;
    private _publishViewportModes();
}

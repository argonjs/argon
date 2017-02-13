import { Viewport } from './common';
import { SessionService, SessionPort } from './session';
import { ContextService } from './context';
import { Event } from './utils';
import { FocusService, FocusServiceProvider } from './focus';
import { VisibilityServiceProvider } from './visibility';
export declare const enum ViewportMode {
    EMBEDDED = 0,
    PAGE = 0,
    IMMERSIVE = 1,
}
export declare abstract class ViewElement {
}
/**
 * Manages the view state
 */
export declare class ViewportService {
    private sessionService;
    private contextService;
    private focusService;
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
    changeEvent: Event<Viewport>;
    /**
     * An event that is raised when the viewport mode has changed
     */
    modeChangeEvent: Event<ViewportMode>;
    /**
     * The current viewport mode
     */
    readonly mode: ViewportMode;
    private _mode;
    readonly presentationMode: ViewportMode;
    /**
     * Automatically layout the element to match the immersive viewport during PresentationMode.IMMERSIVE
     */
    autoLayoutImmersiveMode: boolean;
    /**
     * Automatically publish the viewport of the element during PresentationMode.EMBEDDED
     */
    autoPublishEmbeddedMode: boolean;
    /**
     * The DOM element associated with this viewport
     */
    element: HTMLElement;
    private _currentViewport;
    private _currentViewportJSON;
    constructor(sessionService: SessionService, contextService: ContextService, focusService: FocusService, elementOrSelector?: Element | string | null);
    /**
     * Get the current viewport
     */
    readonly current: Viewport;
    requestPresentationMode(mode: ViewportMode): Promise<void>;
    private _desiredMode;
    desiredMode: ViewportMode;
    private _updateViewportMode(mode);
    /**
     * Publish the viewport being used in [[PresentationMode.EMBEDDED]]
     * so that other apps can use the same viewport
     */
    publishEmbeddedViewport(viewport?: Viewport): void;
    private _updateViewport(viewport);
    sendUIEventToSession(uievent: UIEvent, session?: SessionPort): void;
    private _watchEmbeddedViewport();
}
export declare class ViewportServiceProvider {
    private sessionService;
    private viewportService;
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
    constructor(sessionService: SessionService, viewportService: ViewportService, focusServiceProvider: FocusServiceProvider, visibilityServiceProvider: VisibilityServiceProvider);
    sendUIEventToSession(uievent: UIEvent, session: SessionPort): void;
    private _publishViewportModes();
}

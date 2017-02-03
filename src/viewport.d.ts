import { Viewport } from './common';
import { SessionService, SessionPort } from './session';
import { ContextService } from './context';
import { Event } from './utils';
import { FocusService, FocusServiceProvider } from './focus';
import { VisibilityServiceProvider } from './visibility';
export declare const enum PresentationMode {
    PAGE = 0,
    IMMERSIVE = 1,
}
export declare const ParentElement = "#argon";
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
    changeEvent: Event<void>;
    /**
     * An event that is raised when the presentation mode has changed
     */
    presentationModeChangeEvent: Event<PresentationMode>;
    /**
     * The current presentation mode
     */
    readonly presentationMode: PresentationMode;
    private _presentationMode;
    /**
     * The root HTMLDivElement element for this view.
     * This value is undefined in non-DOM environments.
     */
    rootElement: HTMLDivElement;
    /**
     * An HTMLDivElement which represents the viewport.
     * This value is undefined in non-DOM environments.
     */
    element: HTMLDivElement;
    /**
     * Automatically watch and publish the viewport during PresentationMode.EMBEDDED
     */
    autoPublishEmbeddedViewport: boolean;
    private _currentViewport;
    private _currentViewportJSON;
    constructor(sessionService: SessionService, contextService: ContextService, focusService: FocusService, parentElementOrSelector?: string | HTMLElement);
    /**
     * Get the current viewport
     */
    readonly current: Viewport;
    /**
     * Request a presentation mode
     * - [[PresentationMode.PAGE]] : present the entire document
     * - [[PresentationMode.IMMERSIVE]] : present only the argon.js view
     */
    requestPresentationMode(mode: PresentationMode): Promise<void>;
    private _updatePresentationMode(mode);
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
    /**
     * The embedded viewports for each managed session.
     */
    embeddedViewports: WeakMap<SessionPort, Viewport>;
    /**
     * A UI event being forwarded from a managed session
     */
    forwardedUIEvent: Event<UIEvent>;
    constructor(sessionService: SessionService, viewportService: ViewportService, focusServiceProvider: FocusServiceProvider, visibilityServiceProvider: VisibilityServiceProvider);
    sendUIEventToSession(uievent: UIEvent, session: SessionPort): void;
    private _handleRequestPresentationMode(session, mode);
    protected _ensurePersmission(session: SessionPort): void;
}

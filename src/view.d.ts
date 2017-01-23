/// <reference types="cesium" />
/// <reference types="webvr-api" />
import { Entity, PerspectiveFrustum } from './cesium/cesium-imports';
import { Viewport, SubviewType } from './common';
import { SessionService, SessionPort } from './session';
import { EntityPose, ContextService } from './context';
import { Event } from './utils';
import { FocusService } from './focus';
/**
 * The rendering paramters for a particular subview
 */
export interface Subview {
    index: number;
    type: SubviewType;
    frustum: PerspectiveFrustum;
    pose: EntityPose;
    viewport: Viewport;
}
export declare const enum PresentationMode {
    EMBEDDED = 0,
    FULLPAGE = 1,
    FULLSCREEN = 2,
}
export declare const ContainerElement: string;
/**
 * Manages the view state
 */
export declare class ViewService {
    private sessionService;
    private contextService;
    private focusService;
    /**
     * UI events that occur within this view. To handle an event (and prevent it from
     * being forwarded to another layer) call event.stopImmediatePropagation().
     */
    uiEvent: Event<{
        event: UIEvent | MouseEvent | TouchEvent | PointerEvent | WheelEvent;
        forwardEvent: () => void;
    }>;
    /**
     * UI events to be forwarded
     */
    forwardedUIEvent: Event<UIEvent | MouseEvent | TouchEvent | PointerEvent | WheelEvent>;
    /**
     * An event that is raised when the root viewport has changed
     */
    viewportChangeEvent: Event<void>;
    /**
     * An event that is raised when ownership of the view has been acquired by this application
     */
    acquireEvent: Event<void>;
    /**
     * An event that is raised when ownership of the view has been released from this application
    */
    releaseEvent: Event<void>;
    /**
     * An HTMLDivElement which matches the viewport.
     * This value is undefined in non-DOM environments.
     */
    element: HTMLDivElement;
    /**
     * An HTMLDivElement which matches the viewport.
     * This value is undefined in non-DOM environments.
     */
    containerElementPromise: Promise<HTMLDivElement>;
    /**
     *  Manager-only. A map of sessions to their desired viewports.
     */
    desiredViewportMap: WeakMap<SessionPort, Viewport>;
    /**
     * Manager-only. The current vrdisplay that this view is presenting to,
     * if any.
     */
    readonly vrDisplay: VRDisplay | undefined;
    private _vrDisplay?;
    private _currentViewport;
    private _currentViewportJSON;
    private _subviews;
    private _frustums;
    constructor(containerElementOrSelector: string | HTMLElement, sessionService: SessionService, contextService: ContextService, focusService: FocusService);
    getSubviews(referenceFrame?: Entity): Subview[];
    /**
     * Get the current viewport. Deprecated (Use View#viewport property)
     * @private
     */
    protected getViewport(): Viewport;
    /**
     * Get the current viewport
     */
    readonly viewport: Viewport;
    /**
     * Request to present this view in an HMD.
     */
    requestEnterHmd(): Promise<void>;
    protected _requestEnterHmd(session: SessionPort): Promise<void>;
    /**
     * Exit presenting this view in an HMD
     */
    requestExitHmd(): Promise<void>;
    protected _requestExitHmd(session: SessionPort): Promise<void>;
    /**
     * Resolves to a boolean that indicates whether or not this view is being
     * presented in an HMD
     */
    isHmdActive(): Promise<boolean>;
    /**
     * Manager-only. Returns true if this view is being
     * presented in an HMD. (synchronous)
     */
    _isHmdActive(): boolean;
    /**
     * Request to present this view in fullscreen mode
     */
    requestEnterFullscreen(): Promise<void>;
    protected _requestEnterFullscreen(session: SessionPort): any;
    /**
     * Request to exit fullscreen display
     */
    requestExitFullscreen(): Promise<void>;
    protected _requestExitFullscreen(session: SessionPort): any;
    /**
     * Resolves to a boolean that indicates whether or not this view is being
     * presented in fullscreen
     */
    isFullscreen(): Promise<boolean>;
    /**
     * Manager-only. Returns true if this view is being
     * presented in fullscreen. (synchronous)
     */
    _isFullscreen(): boolean;
    /**
     * Request to present the view maximized within the containing window
     */
    requestEnterMaximized(): Promise<void>;
    protected _requestEnterMaximized(session: SessionPort): void;
    /**
     * Request to exit maximized mode
     */
    requestExitMaximized(): Promise<void>;
    protected _requestExitMaximized(session: SessionPort): void;
    /**
     * Resolves to a boolean that indicates whether or not the view is maximized
     */
    isMaximized(): Promise<boolean>;
    /**
     * Manager-only. Returns true if this view is maximized. (synchronous)
     */
    _isMaximized(): boolean;
    protected _ensurePersmission(session: SessionPort): void;
    /**
     * Set the desired root viewport
     * @private
     */
    setDesiredViewport(viewport: Viewport): void;
    /**
     * Request control over the view.
     * The manager is likely to reject this request if this application is not in focus.
     * When running on an HMD, this request will always fail. If the current reality view
     * does not support custom views, this request will fail. The manager may revoke
     * ownership at any time (even without this application calling releaseOwnership)
     * @private
     */
    requestOwnership(): void;
    /**
     * Release control over the view.
     * @private
     */
    releaseOwnership(): void;
    /**
     * Returns true if this application has control over the view.
     * @private
     */
    isOwner(): void;
    private _update();
    private _setupEventForwarding();
    sendUIEventToSession(uievent: UIEvent, session?: SessionPort): void;
    private _setupEventSynthesizing();
}

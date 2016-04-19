import { Entity, Matrix4 } from './cesium/cesium-imports';
import { SessionService, SessionPort } from './session';
import { EntityPose, ContextService } from './context';
import { Event } from './utils';
import { SubviewType, Viewport } from './reality';
/**
 * The rendering paramters for a particular subview
 */
export interface Subview {
    type: SubviewType;
    projectionMatrix: number[];
    pose: EntityPose;
    viewport: Viewport;
}
/**
 * Manages the view state
 */
export declare class ViewService {
    private sessionService;
    private contextService;
    /**
     * An event that is raised when the root viewport has changed
     */
    viewportChangeEvent: Event<{
        previous: Viewport;
    }>;
    /**
     * An event that is raised when ownership of the view has been acquired by this application
     */
    acquireEvent: Event<void>;
    /**
     * An event that is raised when ownership of the view has been released from this application
    */
    releaseEvent: Event<void>;
    /**
     * An HTMLDivElement which matches the root viewport. This is
     * provide for convenience to attach other elements to (such as
     * a webGL canvas element). Attached elements will automatically
     * inherit the same size and position as this element (via CSS).
     */
    element: HTMLDivElement;
    private _current;
    private _currentViewportJSON;
    desiredViewportMap: WeakMap<SessionPort, Viewport>;
    desiredProjectionMatrixMap: WeakMap<SessionPort, Matrix4>;
    constructor(sessionService: SessionService, contextService: ContextService);
    getSubviews(referenceFrame?: Entity): Subview[];
    getViewport(): Viewport;
    /**
     * Set the desired root viewport
     */
    setDesiredViewport(viewport: Viewport): void;
    /**
     * Request control over the view.
     * The manager is likely to reject this request if this application is not in focus.
     * When running on an HMD, this request will always fail. If the current reality view
     * does not support custom views, this request will fail. The manager may revoke
     * ownership at any time (even without this application calling releaseOwnership)
     */
    requestOwnership(): void;
    /**
     * Release control over the view.
     */
    releaseOwnership(): void;
    /**
     * Returns true if this application has control over the view.
     */
    isOwner(): void;
    private _setViewParameters(view);
}

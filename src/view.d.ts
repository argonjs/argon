/// <reference types="cesium" />
import { Entity, PerspectiveFrustum } from './cesium/cesium-imports';
import { Viewport, SubviewType } from './common';
import { SessionService, SessionPort } from './session';
import { EntityPose, ContextService } from './context';
import { Event } from './utils';
import { FocusService } from './focus';
import { RealityService } from './reality';
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
/**
 * Manages the view state
 */
export declare class ViewService {
    private sessionService;
    private focusService;
    private realityService;
    private contextService;
    /**
     * UI events that occur within this view. To handle an event (and prevent it from
     * being forwarded to another layer) call event.stopImmediatePropagation().
     */
    uiEvent: Event<UIEvent | MouseEvent | TouchEvent | PointerEvent | WheelEvent>;
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
     * This value is undefined in non-DOM environments.
     */
    element: HTMLDivElement;
    /**
     * A promise which resolves to the containing HTMLElement for this view.
     * This value is undefined in non-DOM environments.
     */
    containingElementPromise: Promise<HTMLElement>;
    /**
     * The containing element.
     */
    containingElement?: HTMLElement;
    /**
     *  Manager-only. A map of sessions to their desired viewports.
     */
    desiredViewportMap: WeakMap<SessionPort, Viewport>;
    private _currentViewport;
    private _currentViewportJSON;
    private _subviews;
    private _frustums;
    private _currentRealitySession?;
    constructor(containerElement: HTMLElement, sessionService: SessionService, focusService: FocusService, realityService: RealityService, contextService: ContextService);
    getSubviews(referenceFrame?: Entity): Subview[];
    /**
     * Get the current viewport
     */
    getViewport(): Viewport;
    /**
     * Request to present the view in fullscreen
     */
    requestFullscreen(): Promise<void>;
    /**
     * Handle UI Events. Meant to be overwritten by apps.
     * By default, an event will be forwarded to the reality viewer.
     * If the event is handled by the app, then evt.stopImmediatePropagation()
     * should be called to stop the event from being forwarded to the
     * reality viewer.
     */
    onUIEvent(evt: MouseEvent | TouchEvent | WheelEvent): void;
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
    private _setupEventSynthesizing();
}

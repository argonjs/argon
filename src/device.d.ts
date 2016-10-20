/// <reference types="webvr-api" />
/// <reference types="cesium" />
import { Entity, Cartographic, JulianDate } from './cesium/cesium-imports';
import { DeviceState, Viewport } from './common';
import { ContextService } from './context';
import { SessionService, SessionPort } from './session';
declare global  {
    class VRFrameData {
        timestamp: number;
        leftProjectionMatrix: Float32Array;
        leftViewMatrix: Float32Array;
        rightProjectionMatrix: Float32Array;
        rightViewMatrix: Float32Array;
        pose: VRPose;
    }
    interface VRDisplay {
        getFrameData(frameData: VRFrameData): boolean;
    }
}
/**
* Provides device state.
*/
export declare class DeviceService {
    private sessionService;
    private contextService;
    /**
     * The current vrDisplay, if there is one.
     */
    vrDisplay?: VRDisplay;
    /**
     * The current device state
     */
    readonly state: DeviceState;
    /**
     * An ENU coordinate frame centered at the device location.
     * The reference frame of this frame is the FIXED (ECEF) reference frame.
     */
    locationEntity: Entity;
    /**
     * A frame which represents the display being used.
     * The reference frame of this frame is the [[orientationEntity]].
     */
    displayEntity: Entity;
    /**
     * The current cartographic position
     */
    readonly location: Cartographic | undefined;
    /**
     * The radius (in meters) of latitudinal and longitudinal uncertainty,
     * in relation to the FIXED reference frame.
     */
    readonly locationAccuracy: number | undefined;
    /**
     * The accuracy of the altitude in meters.
     */
    readonly locationAltitudeAccuracy: number | undefined;
    /**
     * The sessions that are subscribed to the device state
     */
    protected subscribers: Set<SessionPort>;
    /**
     * The sessions that are subscribed to the device location
     */
    protected locationSubscribers: Set<SessionPort>;
    /**
     * The sessions that are subscribed to the device location
     */
    protected poseSubscribers: Set<SessionPort>;
    /**
    * Initialize the DeviceService
    */
    constructor(sessionService: SessionService, contextService: ContextService);
    private _state;
    private _exposedState;
    private _location?;
    private _subscriberTimeoutIds;
    private _subscriptionTimeoutId?;
    /**
    * Request device state updates.
    */
    update(o?: DeviceStateSubscriptionOptions): void;
    /**
     * Request that the callback function be called for the next frame.
     * @param callback function
     */
    requestFrame(callback: (now: JulianDate) => any): number;
    /**
     * Get the current system time
     */
    getSystemTime(result?: JulianDate): JulianDate;
    /**
     * Send device state to subscribers.
     */
    publishDeviceState(): void;
    private updatePoseLocallyIfNecessary(o?);
    private subscribeToUpdatesIfTimeoutExpired(o?);
    /**
     * Returns the maximum allowed viewport
     */
    getMaximumViewport(): Viewport;
    /**
     * Attempt to zoom
     */
    /**
     * Handle zoom. Overridable for custom behavior.
     */
    /**
     * Set a desired fov in radians.
     */
    /**
     * Set the default fov in radians, and adjust the desired fov to match the
     * previous desired / default ratio.
     */
    private _geolocationWatchId;
    private _vrFrameData;
    protected updateLocation(): void;
    protected updatePose(): void;
    protected stopLocationUpdates(): void;
    protected stopPoseUpdates(): void;
}
export interface DeviceStateSubscriptionOptions {
    location?: boolean;
    pose?: boolean;
    timeout?: number;
}

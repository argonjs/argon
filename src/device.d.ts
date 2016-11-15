/// <reference types="cesium" />
import { Entity } from './cesium/cesium-imports';
import { DeviceState, Viewport } from './common';
import { SessionService, SessionPort } from './session';
import { RealityService } from './reality';
export declare enum ZoomState {
    OTHER = 0,
    START = 1,
    CHANGE = 2,
    END = 3,
}
export interface ZoomData {
    zoom: number;
    fov: number;
    state: ZoomState;
}
/**
* Provides device state.
*/
export declare class DeviceService {
    private sessionService;
    private realityService;
    /**
    * Initialize the DeviceService
    */
    constructor(sessionService: SessionService, realityService: RealityService);
    /**
    * Request device state updates.
    */
    update(o?: DeviceStateSubscriptionOptions): void;
    /**
     * Update the device state, and send to subscribers.
     */
    updateDeviceState(): void;
    /**
     * Set a desired fov in radians.
     */
    setDesiredFov(fov: number | undefined): void;
    /**
     * Set the default fov in radians, and adjust the desired fov to match the
     * previous desired / default ratio.
     */
    setDefaultFov(fov: number): void;
    /**
     * Get the current device state
     */
    readonly state: DeviceState;
    /**
     * An ENU coordinate frame centered at the gps location reported by the device.
     * The reference frame of this frame is the FIXED (ECEF) reference frame.
     */
    geolocationEntity: Entity;
    /**
     * A frame which represents the orientation of the device. If the orientation of the
     * device is known absolutely, then the reference frame of this frame is the ENU
     * coordinate frame, [[geolocationEntity]]. Otherwise, the reference frame of this
     * frame is arbitrary.
     */
    orientationEntity: Entity;
    /**
     * A frame which represents the device. If the geopose is known, the reference frame
     * for this frame is the [[orientationEntity]]. Otherwise, the reference frame is arbitrary.
     */
    deviceEntity: Entity;
    /**
     * A frame which represents the display for the current device.
     * The reference frame for this frame is always the [[deviceEntity]].
     */
    displayEntity: Entity;
    /**
     * The sessions that are subscribed to device state
     */
    protected subscribers: Set<SessionPort>;
    /**
     * The sessions that are subscribed to the device location
     */
    protected locationSubscribers: Set<SessionPort>;
    /**
     * The sessions that are subscribed to the device location
     */
    protected orientationSubscribers: Set<SessionPort>;
    private _subscriberTimeoutIds;
    private _state;
    private _scratchCartesian;
    private _scratchQuaternion1;
    private _scratchQuaternion2;
    private _x90Rot;
    private _geolocationWatchId;
    private _deviceorientationListener;
    private _mobileDetect?;
    private _alphaOffset?;
    private _headingDrift;
    private _subscriptionTimeoutId?;
    private _updateEntity(pose, entity, referenceFrame);
    protected startLocationUpdates(): void;
    protected startOrientationUpdates(): void;
    protected stopLocationUpdates(): void;
    protected stopOrientationUpdates(): void;
    /**
     * Returns the maximum allowed viewport
     */
    getMaximumViewport(): Viewport;
    /**
     * Attempt to zoom
     */
    zoom(data: {
        zoom: number;
        fov: number;
        state: ZoomState;
    }): void;
    /**
     * Handle zoom. Overridable for custom behavior.
     * Only called within a [[REALITY_VIEWER]].
     */
    onZoom(data: ZoomData): number;
    /**
     * Handle desired fov. Overridable for custom behavior.
     * Only called within a [[REALITY_MANAGER]]
     */
    protected onDesiredFov(fov: any): void;
}
export interface DeviceStateSubscriptionOptions {
    location?: boolean;
    orientation?: boolean;
    timeout?: number;
}

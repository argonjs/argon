/// <reference types="webvr-api" />
/// <reference types="cesium" />
import { Entity, Cartographic, JulianDate } from './cesium/cesium-imports';
import { Viewport, SerializedSubview } from './common';
import { ContextService } from './context';
import { ViewService } from './view';
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
    private viewService;
    private contextService;
    /**
     * The current vrDisplay, if there is one.
     */
    vrDisplay?: VRDisplay;
    /**
     * A coordinate system represeting the space in which the
     * user is moving, positioned at the floor. For mobile devices,
     * the stage follows the user. For non-mobile systems, the
     * stage is fixed.
     */
    stage: Entity;
    /**
     * The physical viewing pose as reported by the current device
     */
    eye: Entity;
    /**
     * An East-North-Up coordinate frame centered at the eye position
     */
    eyeEastNorthUp: Entity;
    /**
     * The current cartographic position of the eye. Undefined if no geolocation is available.
     */
    readonly eyeCartographicPosition: Cartographic | undefined;
    /**
     * The radius (in meters) of latitudinal and longitudinal uncertainty,
     * in relation to the FIXED reference frame. Value is greater than
     * 0 or undefined.
     */
    readonly geolocationAccuracy: number | undefined;
    /**
     * The accuracy of the altitude in meters. Value is greater than
     * 0 or undefined.
     */
    readonly altitudeAccuracy: number | undefined;
    /**
     * The accuracy of the compass in degrees. Value is greater than
     * 0 or undefined.
     */
    readonly compassAccuracy: number | undefined;
    readonly viewport: Viewport;
    readonly subviews: SerializedSubview[];
    readonly strictSubviewPose: boolean | undefined;
    readonly strictSubviewProjectionMatrix: boolean | undefined;
    readonly strictSubviewViewport: boolean | undefined;
    readonly strictViewport: boolean | undefined;
    /**
     * The sessions that are subscribed to the device location
     */
    protected geolocationSubscribers: Set<SessionPort>;
    /**
    * Initialize the DeviceService
    */
    constructor(sessionService: SessionService, viewService: ViewService, contextService: ContextService);
    private _state;
    private _eyeCartographicPosition?;
    private _frustum;
    getSubviewEntity(index: number): Entity;
    /**
    * Update device state.
    */
    private update();
    protected updateState(): void;
    private updateStateFromWebVR();
    private updateStateMonocular();
    private setEyePoseFromDeviceOrientation();
    private setStagePoseFromGeolocation();
    protected updateViewport(): void;
    /**
     * Request that the callback function be called for the next frame.
     * @param callback function
     */
    requestFrame(callback: (now: JulianDate) => any): any;
    /**
     * Send device state to reality viewers.
     */
    publishDeviceState(): void;
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
    private _deviceorientationListener;
    private _vrFrameData?;
    protected startDeviceLocationUpdates(): void;
    protected stopDeviceLocationUpdates(): void;
    private _deviceOrientation?;
    private _compassAccuracy?;
    protected startDeviceOrientationUpdates(): void;
    protected stopDeviceOrientationUpdates(): void;
}

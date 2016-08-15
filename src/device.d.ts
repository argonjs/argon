/// <reference types="cesium" />
import { Entity } from './cesium/cesium-imports';
import { ContextService } from './context';
/**
* Provides pose state for the device.
*/
export declare class DeviceService {
    /**
    * Initialize the DeviceService
    */
    constructor(context: ContextService);
    locationUpdatesEnabled: boolean;
    orientationUpdatesEnabled: boolean;
    /**
     * An ENU coordinate frame centered at the gps location reported by this device
     */
    geolocationEntity: Entity;
    /**
     * A frame which represents the orientation of this device relative to it's ENU coordinate frame (geolocationEntity)
     */
    orientationEntity: Entity;
    /**
     * A frame which represents the pose of this device
     */
    entity: Entity;
    /**
     * A frame which describes the pose of the display relative to this device
     */
    displayEntity: Entity;
    private _scratchCartesian;
    private _scratchQuaternion1;
    private _scratchQuaternion2;
    private _x90Rot;
    private _geolocationWatchId;
    private _deviceorientationListener;
    private _mobileDetect?;
    private _alphaOffset?;
    private _headingDrift;
    private _idleTimeoutId;
    protected onIdle(): void;
    protected onUpdate(): void;
    /**
    * Update the pose with latest sensor data
    */
    update(): void;
}

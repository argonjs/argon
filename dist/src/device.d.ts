import { Entity } from './cesium/cesium-imports';
import { ContextService } from './context';
/**
* Provides pose state for the device.
*/
export declare class DeviceService {
    private context;
    /**
    * Initialize the DeviceService
    */
    constructor(context: ContextService);
    locationUpdatesEnabled: boolean;
    orientationUpdatesEnabled: boolean;
    locationEntity: Entity;
    orientationEntity: Entity;
    interfaceEntity: Entity;
    private _scratchCartesian;
    private _scratchQuaternion1;
    private _scratchQuaternion2;
    private _scratchMatrix3;
    private _x90Rot;
    private _geolocationWatchId;
    private _deviceorientationListener;
    private _mobileDetect;
    private _webkitCompassHeading;
    private _alphaOffset;
    private _headingDrift;
    private _idleTimeoutId;
    protected onIdle(): void;
    protected onUpdate(): void;
    /**
    * Update the pose with latest sensor data
    */
    update(): void;
}

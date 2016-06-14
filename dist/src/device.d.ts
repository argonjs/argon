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
    locationEntity: Entity;
    orientationEntity: Entity;
    interfaceEntity: Entity;
    private _scratchCartesian;
    private _scratchQuaternion1;
    private _scratchQuaternion2;
    private _x90Rot;
    private _geolocationWatchId;
    private _deviceorientationListener;
    private _mobileDetect;
    /**
    * Update the pose with latest sensor data
    */
    update(): void;
}

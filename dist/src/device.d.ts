import { Entity } from './cesium/cesium-imports';
/**
* Provides pose state for the device.
*/
export declare class DeviceService {
    /**
    * Initialize the DeviceService
    */
    constructor();
    entity: Entity;
    interfaceEntity: Entity;
    /**
    * Update the pose with latest sensor data
    */
    update(): void;
}

import { EntityPose } from './reality';
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
    eyeEntity: Entity;
    /**
    * Return the pose of this device
    * @param time time of
    desired pose
    * @return The pose of this device
    */
    getPose(time: any): EntityPose;
    /**
    * Return the pose of this device's eye
    * @param time time of desired pose
    * @return the pose of this device's eye
    */
    getEyePose(time: any): EntityPose;
}

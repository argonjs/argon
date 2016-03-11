import { EntityPose, CameraState } from './context.ts';
import { Entity } from './cesium/cesium-imports.ts';
/**
* Provides services for the current device.
*/
export declare class DeviceService {
    /**
    * Initialize the DeviceService
    */
    constructor();
    device: Entity;
    eye: Entity;
    /**
    * Return the pose of this device
    * @param time time of desired pose
    * @return The pose of this device
    */
    getDevicePose(time: any): EntityPose;
    /**
    * Return the pose of this device's eye
    * @param time time of desired pose
    * @return the pose of this device's eye
    */
    getEyePose(time: any): EntityPose;
    /**
    * Returns the camera state. The default camera state is of type perspective
    * with a vertical field of view of 60 degrees.
    * @return camera
    */
    getCameraState(): CameraState;
    /**
     * Returns the view size. By default, returns the width and height of the
     * document.documentElement (if DOM is available), otherwise, returns {width:0, height:0}
     */
    getViewSize(): {
        width: number;
        height: number;
    };
    /**
     * Returns a default reality for this device. (By default, this is the 'empty' reality)
     */
    defaultReality: {
        type: string;
    };
}

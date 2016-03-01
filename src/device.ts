import * as Cesium from 'Cesium'
import {EntityPose, CameraState} from './context.ts'
import {
    Entity,
    CesiumMath,
    ConstantPositionProperty,
    ConstantProperty,
    SampledPositionProperty,
    SampledProperty,
    ExtrapolationType,
    Cartesian3,
    Quaternion,
    defined
} from './cesium/cesium-imports.ts'
import {Reality} from './reality.ts'

import {calculatePose} from './utils.ts'

/**
* Provides services for the current device.
*/
export class DeviceService {

    /**
    * Initialize the DeviceService
    */
    constructor() {
        const sampledDevicePosition = new SampledPositionProperty();
        sampledDevicePosition.forwardExtrapolationType = ExtrapolationType.HOLD;
        const sampledDeviceOrientation = new SampledProperty(Quaternion);
        sampledDeviceOrientation.forwardExtrapolationType = ExtrapolationType.HOLD;
        this.device.position = sampledDevicePosition;
        this.device.orientation = sampledDeviceOrientation;

        const eyePosition = new ConstantPositionProperty(Cartesian3.ZERO, this.device);
        const eyeOrientation = new ConstantProperty(Quaternion.IDENTITY);
        this.eye.position = eyePosition;
        this.eye.orientation = eyeOrientation;
    }

    public device = new Entity({ id: 'DEVICE', name: 'device' });
    public eye = new Entity({ id: 'EYE', name: 'eye' });

    /**
    * Return the pose of this device
    * @param time time of desired pose
    * @return The pose of this device
    */
    public getDevicePose(time): EntityPose {
        return calculatePose(this.device, time);
    }

    /**
    * Return the pose of this device's eye
    * @param time time of desired pose
    * @return the pose of this device's eye
    */
    public getEyePose(time): EntityPose {
        if (typeof window !== 'undefined') {
            const interfaceRotation = -window.orientation || 0;
            const eyeOrientation = <Cesium.ConstantProperty>this.eye.orientation;
            eyeOrientation.setValue(Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, interfaceRotation));
        }
        return calculatePose(this.eye, time);
    }

    /**
    * Returns the camera state. The default camera state is of type perspective  
    * with a vertical field of view of 60 degrees.
    * @return camera 
    */
    public getCameraState(): CameraState {
        return {
            type: "perspective",
            fovY: CesiumMath.toRadians(60)
        };
    }

    /**
     * Returns the view size. By default, returns the width and height of the 
     * document.documentElement (if DOM is available), otherwise, returns {width:0, height:0}
     */
    public getViewSize(): { width: number, height: number } {
        if (typeof document !== 'undefined') {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
        return { width: 0, height: 0 }
    }

    /**
     * Returns a default reality for this device. (By default, this is the 'empty' reality)
     */
    public defaultReality = { type: 'empty' };

}

import {EntityPose} from './reality'
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
} from './cesium/cesium-imports'

import {calculatePose} from './utils'

/**
* Provides pose state for the device.
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
        this.entity.position = sampledDevicePosition;
        this.entity.orientation = sampledDeviceOrientation;

        const eyePosition = new ConstantPositionProperty(Cartesian3.ZERO, this.entity);
        const eyeOrientation = new ConstantProperty(Quaternion.IDENTITY);
        this.eyeEntity.position = eyePosition;
        this.eyeEntity.orientation = eyeOrientation;
    }

    public entity = new Entity({ id: 'DEVICE', name: 'device' });
    public eyeEntity = new Entity({ id: 'EYE', name: 'eye' });

    /**
    * Return the pose of this device
    * @param time time of 
    desired pose
    * @return The pose of this device
    */
    public getPose(time): EntityPose {
        return calculatePose(this.entity, time);
    }

    /**
    * Return the pose of this device's eye
    * @param time time of desired pose
    * @return the pose of this device's eye
    */
    public getEyePose(time): EntityPose {
        if (typeof window !== 'undefined') {
            const interfaceRotation = -window.orientation || 0;
            const eyeOrientation = <ConstantProperty>this.eyeEntity.orientation;
            eyeOrientation.setValue(Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, interfaceRotation));
        }
        return calculatePose(this.eyeEntity, time);
    }

}

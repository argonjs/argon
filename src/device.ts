import {inject} from 'aurelia-dependency-injection'
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

        const interfacePosition = new ConstantPositionProperty(Cartesian3.ZERO, this.entity);
        const interfaceOrientation = new ConstantProperty(Quaternion.IDENTITY);
        this.interfaceEntity.position = interfacePosition;
        this.interfaceEntity.orientation = interfaceOrientation;
    }

    public entity = new Entity({ id: 'DEVICE', name: 'device' });
    public interfaceEntity = new Entity({ id: 'DEVICE_INTERFACE', name: 'device_interface' });

    /**
    * Update the pose with latest sensor data
    */
    public update() {
        // TODO: use web-based geolocation and geoorientation apis if available
        if (typeof window !== 'undefined') {
            const interfaceRotation = -window.orientation || 0;
            const interfaceOrientation = <ConstantProperty>this.interfaceEntity.orientation;
            interfaceOrientation.setValue(Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, interfaceRotation));
        }
    }

}

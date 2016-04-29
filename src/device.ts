import {inject} from 'aurelia-dependency-injection'
import {
    Entity,
    ConstantPositionProperty,
    ConstantProperty,
    Cartesian3,
    Quaternion
} from './cesium/cesium-imports'

/**
* Provides pose state for the device.
*/
export class DeviceService {

    /**
    * Initialize the DeviceService
    */
    constructor() {
        this.entity.position = new ConstantPositionProperty(Cartesian3.ZERO, null);
        this.entity.orientation = new ConstantProperty(Quaternion.IDENTITY);
        this.interfaceEntity.position = new ConstantPositionProperty(Cartesian3.ZERO, this.entity);
        this.interfaceEntity.orientation = new ConstantProperty(Quaternion.IDENTITY);
    }

    public entity = new Entity({ id: 'ar.device', name: 'device' });
    public interfaceEntity = new Entity({ id: 'ar.device.interface', name: 'device_interface' });

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

import { inject } from 'aurelia-dependency-injection'
import {
    Entity,
    ExtrapolationType,
    ReferenceFrame,
    SampledPositionProperty,
    ConstantPositionProperty,
    ConstantProperty,
    Cartesian3,
    Quaternion,
    CesiumMath,
    JulianDate,
    Transforms,
    defined
} from './cesium/cesium-imports'
import { ContextService } from './context'

import MobileDetect from 'mobile-detect'

/**
* Provides pose state for the device.
*/
@inject(ContextService)
export class DeviceService {

    /**
    * Initialize the DeviceService
    */
    constructor(context: ContextService) {
        context.wellKnownReferenceFrames.add(this.geolocationEntity);
        context.wellKnownReferenceFrames.add(this.orientationEntity);
        context.wellKnownReferenceFrames.add(this.entity);
        context.wellKnownReferenceFrames.add(this.displayEntity);

        if (typeof window !== 'undefined' && window.navigator) {
            this._mobileDetect = new MobileDetect(window.navigator.userAgent);
        }
    }

    public locationUpdatesEnabled = true;
    public orientationUpdatesEnabled = true;

    /**
     * An ENU coordinate frame centered at the gps location reported by this device
     */
    public geolocationEntity = new Entity({ id: 'ar.device.geolocation', name: 'Device Geolocation' });

    /**
     * A frame which represents the orientation of this device relative to it's ENU coordinate frame (geolocationEntity)
     */
    public orientationEntity = new Entity({ id: 'ar.device.orientation', name: 'Device Orientation' });

    /**
     * A frame which represents the pose of this device
     */
    public entity = new Entity({ id: 'ar.device', name: 'Device' });

    /**
     * A frame which describes the pose of the display relative to this device
     */
    public displayEntity = new Entity({
        id: 'ar.device.display',
        name: 'Device Display',
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.entity),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    });

    private _scratchCartesian = new Cartesian3;
    private _scratchQuaternion1 = new Quaternion;
    private _scratchQuaternion2 = new Quaternion;
    private _x90Rot = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, CesiumMath.PI_OVER_TWO);
    private _geolocationWatchId;
    private _deviceorientationListener;

    private _mobileDetect: MobileDetect;

    private _alphaOffset?: number;
    private _headingDrift = 0;

    private _idleTimeoutId: number;

    protected onIdle() {
        if (defined(this._geolocationWatchId)) {
            navigator.geolocation.clearWatch(this._geolocationWatchId);
            this._geolocationWatchId = undefined;
        }

        if (defined(this._deviceorientationListener)) {
            window.removeEventListener('deviceorientation', this._deviceorientationListener);
            this._deviceorientationListener = undefined;
            this._alphaOffset = undefined;
        }
    }

    protected onUpdate() {
        if (typeof window !== 'undefined') {

            const interfaceOrientationProperty = <ConstantProperty>this.displayEntity.orientation;
            let interfaceOrientation = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, (-window.orientation || 0) * CesiumMath.RADIANS_PER_DEGREE, this._scratchQuaternion1);
            if (this._mobileDetect && !this._mobileDetect.mobile()) {
                // for laptops, rotate device orientation by 90° around +X so that it 
                // corresponds to an upright display rather than the integrated keyboard
                interfaceOrientation = Quaternion.multiply(this._x90Rot, interfaceOrientation, interfaceOrientation);
            }
            interfaceOrientationProperty.setValue(interfaceOrientation);

            if (!defined(this._geolocationWatchId) && this.locationUpdatesEnabled) {
                this._geolocationWatchId = navigator.geolocation.watchPosition((pos) => {
                    if (this.geolocationEntity.position instanceof SampledPositionProperty === false) {
                        const sampledPostionProperty = new SampledPositionProperty(ReferenceFrame.FIXED);
                        sampledPostionProperty.forwardExtrapolationType = ExtrapolationType.HOLD;
                        sampledPostionProperty.backwardExtrapolationType = ExtrapolationType.HOLD;
                        sampledPostionProperty.maxNumSamples = 10;
                        this.geolocationEntity.position = sampledPostionProperty;
                    }
                    const positionTime = JulianDate.fromDate(new Date(pos.timestamp));
                    const positionECEF = Cartesian3.fromDegrees(pos.coords.longitude, pos.coords.latitude, pos.coords.altitude || 0, undefined, this._scratchCartesian);
                    (this.geolocationEntity.position as SampledPositionProperty).addSample(positionTime, positionECEF);

                    if (this.geolocationEntity.orientation instanceof ConstantProperty === false) {
                        this.geolocationEntity.orientation = new ConstantProperty();
                    }
                    const enuOrientation = Transforms.headingPitchRollQuaternion(positionECEF, 0, 0, 0, undefined, this._scratchQuaternion1);
                    (this.geolocationEntity.orientation as ConstantProperty).setValue(enuOrientation);
                }, (error) => {
                    console.error(error)
                }, {
                        enableHighAccuracy: true
                    });
            } else if (defined(this._geolocationWatchId) && !this.locationUpdatesEnabled) {
                navigator.geolocation.clearWatch(this._geolocationWatchId);
                this._geolocationWatchId = undefined;
            }

            if (!defined(this._deviceorientationListener) && this.orientationUpdatesEnabled) {
                this._deviceorientationListener = (e: DeviceOrientationEvent) => {

                    let alphaDegrees = e.alpha;

                    if (!defined(alphaDegrees)) {
                        return;
                    }

                    if (e.absolute) {
                        this._alphaOffset = 0;
                    }

                    let webkitCompassHeading: number = e['webkitCompassHeading'];
                    const webkitCompassAccuracy: number = +e['webkitCompassAccuracy'];

                    // when the phone is almost updside down, webkit flips the compass heading 
                    // (not documented anywhere, annoyingly)
                    // if (e.beta >= 130 || e.beta <= -130) webkitCompassHeading = undefined;

                    if ((!defined(this._alphaOffset) || Math.abs(this._headingDrift) > 5) &&
                        defined(webkitCompassHeading) &&
                        webkitCompassAccuracy >= 0 &&
                        webkitCompassAccuracy < 50 &&
                        webkitCompassHeading >= 0) {
                        if (!defined(this._alphaOffset)) {
                            this._alphaOffset = -webkitCompassHeading;
                        } else {
                            this._alphaOffset -= this._headingDrift;
                        }
                    }

                    const alphaOffset = this._alphaOffset || -webkitCompassHeading || 0;

                    // TODO: deal with various browser quirks :\
                    // https://mobiforge.com/design-development/html5-mobile-web-device-orientation-events
                    const alpha = CesiumMath.RADIANS_PER_DEGREE * (e.alpha + alphaOffset);
                    const beta = CesiumMath.RADIANS_PER_DEGREE * e.beta;
                    const gamma = CesiumMath.RADIANS_PER_DEGREE * e.gamma;

                    const alphaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, alpha, this._scratchQuaternion1);
                    const betaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, beta, this._scratchQuaternion2);
                    const alphaBetaQuat = Quaternion.multiply(alphaQuat, betaQuat, this._scratchQuaternion1);
                    const gammaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Y, gamma, this._scratchQuaternion2);
                    const alphaBetaGammaQuat = Quaternion.multiply(alphaBetaQuat, gammaQuat, alphaBetaQuat);

                    // update orientationEntity
                    if (this.orientationEntity.position instanceof ConstantPositionProperty == false) {
                        this.orientationEntity.position = new ConstantPositionProperty(Cartesian3.ZERO, this.geolocationEntity);
                    }
                    if (this.orientationEntity.orientation instanceof ConstantProperty == false) {
                        this.orientationEntity.orientation = new ConstantProperty();
                    }
                    (this.orientationEntity.orientation as ConstantProperty).setValue(alphaBetaGammaQuat);

                    // make sure the device entity has a defined pose relative to the device orientation entity
                    if (this.entity.position instanceof ConstantPositionProperty == false) {
                        this.entity.position = new ConstantPositionProperty(Cartesian3.ZERO, this.orientationEntity);
                    }
                    if (this.entity.orientation instanceof ConstantProperty == false) {
                        this.entity.orientation = new ConstantProperty(Quaternion.IDENTITY);
                    }

                    // TODO: fix heading drift calculation (heading should match webkitCompassHeading)
                    // if (defined(webkitCompassHeading)) {
                    //     const q = alphaBetaGammaQuat//utils.getEntityOrientationInReferenceFrame(this.interfaceEntity, JulianDate.now(), this.locationEntity, this._scratchQuaternion1);
                    //     var heading = -Math.atan2(2*(q.w*q.z + q.x*q.y), 1 - 2*(q.y*q.y + q.z*q.z));
                    //     if (heading < 0) heading += 2*Math.PI;
                    //     const {swing,twist} = swingTwistDecomposition(alphaBetaGammaQuat, Cartesian3.UNIT_Z);
                    //     const twistAngle = 2 * Math.acos(twist.w);
                    //     console.log(twist.w + ' ' + twistAngle * CesiumMath.DEGREES_PER_RADIAN + '\n' + webkitCompassHeading);
                    //     // this._headingDrift = webkitCompassHeading - heading * CesiumMath.DEGREES_PER_RADIAN;
                    // }

                }
                window.addEventListener('deviceorientation', this._deviceorientationListener)
            } else if (defined(this._deviceorientationListener) && !this.orientationUpdatesEnabled) {
                window.removeEventListener('deviceorientation', this._deviceorientationListener);
                this._deviceorientationListener = undefined;
            }

        }
    }

    /**
    * Update the pose with latest sensor data
    */
    public update() {
        if (defined(this._idleTimeoutId)) clearTimeout(this._idleTimeoutId);
        this._idleTimeoutId = setTimeout(() => {
            this.onIdle();
        }, 2000);
        this.onUpdate();
    }

}
import {inject} from 'aurelia-dependency-injection'
import {
    Entity,
    ExtrapolationType,
    ReferenceFrame,
    SampledPositionProperty,
    ConstantPositionProperty,
    ConstantProperty,
    Cartesian3,
    Matrix3,
    Quaternion,
    CesiumMath,
    JulianDate,
    Transforms,
    defined
} from './cesium/cesium-imports'
import {ContextService} from './context'
import * as utils from './utils'

import MobileDetect from 'mobile-detect'

/**
* Provides pose state for the device.
*/
@inject(ContextService)
export class DeviceService {

    /**
    * Initialize the DeviceService
    */
    constructor(private context: ContextService) {
        this.locationEntity.position = new ConstantPositionProperty(Cartesian3.ZERO, null);
        this.locationEntity.orientation = new ConstantProperty(Quaternion.IDENTITY);
        this.orientationEntity.position = new ConstantPositionProperty(Cartesian3.ZERO, this.locationEntity);
        this.orientationEntity.orientation = new ConstantProperty(Quaternion.IDENTITY);

        // by default, assume the interface is upright, perpendicular to the 
        this.interfaceEntity.position = new ConstantPositionProperty(Cartesian3.ZERO, this.orientationEntity);
        this.interfaceEntity.orientation = new ConstantProperty(Quaternion.fromAxisAngle(Cartesian3.UNIT_X, -CesiumMath.PI_OVER_TWO));


        context.wellKnownReferenceFrames.add(this.locationEntity);
        context.wellKnownReferenceFrames.add(this.orientationEntity);
        context.wellKnownReferenceFrames.add(this.interfaceEntity);

        if (typeof window !== 'undefined' && window.navigator) {
            this._mobileDetect = new MobileDetect(window.navigator.userAgent);
        }
    }

    public locationEntity = new Entity({ id: 'ar.device.location', name: 'Device Location' });
    public orientationEntity = new Entity({ id: 'ar.device.orientation', name: 'Device Orientation' });
    public interfaceEntity = new Entity({ id: 'ar.device.interface', name: 'Device Interface' });

    private _scratchCartesian = new Cartesian3;
    private _scratchQuaternion1 = new Quaternion;
    private _scratchQuaternion2 = new Quaternion;
    private _scratchMatrix3 = new Matrix3;
    private _x90Rot = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, CesiumMath.PI_OVER_TWO);
    private _geolocationWatchId;
    private _deviceorientationListener;

    private _mobileDetect: MobileDetect;

    private _webkitCompassHeading: number;
    private _alphaOffset: number;
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

            const interfaceOrientationProperty = <ConstantProperty>this.interfaceEntity.orientation;
            let interfaceOrientation = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, (-window.orientation || 0) * CesiumMath.RADIANS_PER_DEGREE, this._scratchQuaternion1);
            if (this._mobileDetect && !this._mobileDetect.mobile()) {
                // for laptops, rotate device orientation by 90° around +X so that it 
                // corresponds to an upright display rather than the integrated keyboard
                interfaceOrientation = Quaternion.multiply(this._x90Rot, interfaceOrientation, interfaceOrientation);
            }
            interfaceOrientationProperty.setValue(interfaceOrientation);

            if (!defined(this._geolocationWatchId)) {
                this._geolocationWatchId = navigator.geolocation.watchPosition((pos) => {

                    if (this.locationEntity.position instanceof SampledPositionProperty === false) {
                        const sampledPostionProperty = new SampledPositionProperty(ReferenceFrame.FIXED);
                        sampledPostionProperty.forwardExtrapolationType = ExtrapolationType.HOLD;
                        sampledPostionProperty.backwardExtrapolationType = ExtrapolationType.HOLD;
                        sampledPostionProperty['maxNumSamples'] = 10;
                        this.locationEntity.position = sampledPostionProperty;
                    }

                    const positionTime = JulianDate.fromDate(new Date(pos.timestamp));
                    const positionECEF = Cartesian3.fromDegrees(pos.coords.longitude, pos.coords.latitude, pos.coords.altitude || 0, undefined, this._scratchCartesian);
                    (this.locationEntity.position as SampledPositionProperty).addSample(positionTime, positionECEF);

                    const enuOrientation = Transforms.headingPitchRollQuaternion(positionECEF, 0, 0, 0, undefined, this._scratchQuaternion1);
                    (this.locationEntity.orientation as ConstantProperty).setValue(enuOrientation);
                }, (error) => {
                    console.error(error)
                }, {
                        enableHighAccuracy: true
                    })
            }

            if (!defined(this._deviceorientationListener)) {
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

                    if (!defined(this._alphaOffset)) {
                        return;
                    }

                    // TODO: deal with various browser quirks :\
                    // https://mobiforge.com/design-development/html5-mobile-web-device-orientation-events
                    const alpha = CesiumMath.RADIANS_PER_DEGREE * (e.alpha + (this._alphaOffset || 0));
                    const beta = CesiumMath.RADIANS_PER_DEGREE * e.beta;
                    const gamma = CesiumMath.RADIANS_PER_DEGREE * e.gamma;

                    const alphaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, alpha, this._scratchQuaternion1);
                    const betaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, beta, this._scratchQuaternion2);
                    const alphaBetaQuat = Quaternion.multiply(alphaQuat, betaQuat, this._scratchQuaternion1);
                    const gammaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Y, gamma, this._scratchQuaternion2);
                    const alphaBetaGammaQuat = Quaternion.multiply(alphaBetaQuat, gammaQuat, alphaBetaQuat);
                    (this.orientationEntity.orientation as ConstantProperty).setValue(alphaBetaGammaQuat);

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

const rotationAxis = new Cartesian3
const projection = new Cartesian3
const swing = new Quaternion
const twist = new Quaternion

/**
   Decompose the rotation on to 2 parts.
   1. Twist - rotation around the "direction" vector
   2. Swing - rotation around axis that is perpendicular to "direction" vector
   The rotation can be composed back by 
   rotation = swing * twist

   has singularity in case of swing_rotation close to 180 degrees rotation.
   if the input quaternion is of non-unit length, the outputs are non-unit as well
   otherwise, outputs are both unit
*/
function swingTwistDecomposition(q: Quaternion, direction: Cartesian3): { swing: Quaternion, twist: Quaternion } {
    Cartesian3.clone(q, rotationAxis);
    Cartesian3.multiplyByScalar(direction, Cartesian3.dot(rotationAxis, direction), projection);
    twist.x = projection.x;
    twist.y = projection.y;
    twist.z = projection.z;
    twist.w = q.w;
    Quaternion.normalize(twist, twist);
    Quaternion.conjugate(twist, swing);
    Quaternion.multiply(q, swing, swing);
    return { swing, twist };
}

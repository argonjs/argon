var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { Entity, ReferenceFrame, ConstantPositionProperty, ConstantProperty, Cartesian3, Cartographic, Clock, PerspectiveFrustum, Quaternion, CesiumMath, Matrix3, Matrix4, JulianDate, Transforms, defined } from './cesium/cesium-imports';
import { SubviewType, Role } from './common';
import { ContextService } from './context';
import { ViewService } from './view';
import { SessionService } from './session';
import { getEntityPositionInReferenceFrame, getEntityOrientationInReferenceFrame, requestAnimationFrame } from './utils';
const scratchCartesian = new Cartesian3;
const scratchQuaternion = new Quaternion;
const scratchQuaternion2 = new Quaternion;
const scratchMatrix3 = new Matrix3;
const scratchMatrix4 = new Matrix4;
const clock = new Clock();
const scratchTime = new JulianDate(0, 0);
// Enforce monotonically increasing time, and deal with 
// clock drift by either slowing down or speeding up,
// while never going backwards
function tick() {
    const secondsBeforeTick = clock.currentTime.secondsOfDay;
    clock.tick();
    const secondsAfterTick = clock.currentTime.secondsOfDay;
    const now = JulianDate.now(scratchTime);
    const secondsDrift = JulianDate.secondsDifference(clock.currentTime, now);
    if (secondsDrift > 0.033) {
        const halfTimeStep = (secondsAfterTick - secondsBeforeTick) / 2;
        clock.currentTime.secondsOfDay -= halfTimeStep;
    }
    else if (secondsDrift < 0.5) {
        JulianDate.clone(now, clock.currentTime);
    }
}
const AVERAGE_HUMAN_HEIGHT = 1.77;
/**
* Provides device state.
*/
export let DeviceService = class DeviceService {
    /**
    * Initialize the DeviceService
    */
    constructor(sessionService, contextService, viewService) {
        this.sessionService = sessionService;
        this.contextService = contextService;
        this.viewService = viewService;
        /**
         * A coordinate system represeting the space in which the
         * user is moving, positioned at the floor. For mobile devices,
         * the stage follows the user. For non-mobile systems, the
         * stage is fixed.
         */
        this.stage = this.contextService.entities.add(new Entity({
            id: 'ar.device.stage',
            name: 'Device Stage',
            position: new ConstantPositionProperty(undefined, ReferenceFrame.FIXED),
            orientation: new ConstantProperty(undefined)
        }));
        // TODO
        // public stageSittingSpace = this.contextService.entities.add(new Entity({
        //     id: 'ar.device.stageSittingSpace',
        //     name: 'Device Stage Sitting Space',
        //     position: new ConstantPositionProperty(undefined, ReferenceFrame.FIXED),
        //     orientation: new ConstantProperty(undefined)
        // }));
        /**
         * The physical viewing pose as reported by the current device
         */
        this.eye = this.contextService.entities.add(new Entity({
            id: 'ar.device.eye',
            name: 'Device Eye',
            position: new ConstantPositionProperty(undefined, undefined),
            orientation: new ConstantProperty(undefined)
        }));
        /**
         * An East-North-Up coordinate frame centered at the eye position
         */
        this.eyeEastNorthUp = this.contextService.entities.add(new Entity({
            id: 'ar.device.eyeEastNorthUp',
            name: 'Device Eye - ENU',
            position: new ConstantPositionProperty(undefined, undefined),
            orientation: new ConstantProperty(undefined)
        }));
        /**
         * The sessions that are subscribed to the device location
         */
        this.geolocationSubscribers = new Set();
        this._hasGeolocationCapability = new Promise((resolve) => {
            this._resolveHasGeolocationCapability = resolve;
        });
        this._hasOrientationCapability = new Promise((resolve) => {
            this._resolveHasOrientationCapability = resolve;
        });
        this._hasGeoposeCapability = Promise.all([this._hasGeolocationCapability, this._hasOrientationCapability]).then(results => results.reduce((p, c) => p && c, true));
        this._state = {
            viewport: { x: 0, y: 0, width: 1, height: 1 },
            subviews: [{
                    type: SubviewType.SINGULAR,
                    projectionMatrix: new Matrix4(),
                    viewport: { x: 0, y: 0, width: 1, height: 1 }
                }],
            geolocationAccuracy: undefined,
            altitudeAccuracy: undefined
        };
        this._frustum = new PerspectiveFrustum();
        this.sessionService.manager.on['ar.device.state'] = (deviceState) => {
            this._state = deviceState;
        };
        this.sessionService.connectEvent.addEventListener((session) => {
            session.on['ar.device.startGeolocationUpdates'] = () => {
                this.geolocationSubscribers.add(session);
                this._startGeolocationUpdates();
                session.closeEvent.addEventListener(() => {
                    this.geolocationSubscribers.delete(session);
                    if (this.geolocationSubscribers.size === 0)
                        this._stopGeolocationUpdates();
                });
            };
            session.on['ar.device.stopGeolocationUpdates'] = () => {
                this.geolocationSubscribers.delete(session);
                if (this.geolocationSubscribers.size === 0)
                    this._stopGeolocationUpdates();
            };
        });
        if (this.sessionService.isRealityManager || this.sessionService.isRealityViewer) {
            this.startOrientationUpdates();
        }
        const frustum = this._frustum;
        frustum.near = 0.01;
        frustum.far = 500000000;
        frustum.fov = Math.PI / 3;
        frustum.aspectRatio = 1;
        Matrix4.clone(frustum.projectionMatrix, this.subviews[0].projectionMatrix);
        if (this.sessionService.isRealityManager) {
            this.publishDeviceState();
            const id = setInterval(this.publishDeviceState.bind(this), 500);
            this.sessionService.manager.closeEvent.addEventListener(() => {
                clearInterval(id);
            });
            this.viewService.viewportChangeEvent.addEventListener(() => {
                this.publishDeviceState();
            });
        }
        this.sessionService.manager.closeEvent.addEventListener(() => {
            this.stopGeolocationUpdates();
            this.stopOrientationUpdates();
        });
    }
    /**
     * The current cartographic position of the eye. Undefined if no geolocation is available.
     */
    get eyeCartographicPosition() {
        return this._eyeCartographicPosition;
    }
    /**
     * The radius (in meters) of latitudinal and longitudinal uncertainty,
     * in relation to the FIXED reference frame. Value is greater than
     * 0 or undefined.
     */
    get geolocationAccuracy() {
        return this._state.geolocationAccuracy;
    }
    /**
     * The accuracy of the altitude in meters. Value is greater than
     * 0 or undefined.
     */
    get altitudeAccuracy() {
        return this._state.altitudeAccuracy;
    }
    /**
     * The accuracy of the compass in degrees. Value is greater than
     * 0 or undefined.
     */
    get compassAccuracy() {
        return this._compassAccuracy;
    }
    get viewport() {
        return this._state.viewport;
    }
    get subviews() {
        return this._state.subviews;
    }
    get strict() {
        return this._state.strict;
    }
    /**
     * Return a promise that resolves if this device is capable of providing a geopose.
     * Does not resolve until the first session subscribes to geopose.
     */
    hasGeoposeCapability() { return this._hasGeoposeCapability; }
    processViewState(viewState) {
        this._lastRealityViewState = viewState;
    }
    getSubviewEntity(index) {
        const subviewEntity = this.contextService.entities.getOrCreateEntity('ar.device.view_' + index);
        if (!subviewEntity.position) {
            subviewEntity.position = new ConstantPositionProperty();
        }
        if (!subviewEntity.orientation) {
            subviewEntity.orientation = new ConstantProperty();
        }
        return subviewEntity;
    }
    /**
    * Update device state.
    */
    update() {
        this.sessionService.ensureNotRealityAugmenter();
        if (this.sessionService.isRealityManager) {
            this.updateViewport();
            this.updateState();
        }
        else {
            this.setEyePoseFromDeviceOrientation();
        }
        const positionFIXED = getEntityPositionInReferenceFrame(this.eye, clock.currentTime, ReferenceFrame.FIXED, scratchCartesian);
        this._eyeCartographicPosition = positionFIXED ?
            Cartographic.fromCartesian(positionFIXED, undefined, this._eyeCartographicPosition) :
            positionFIXED;
        if (positionFIXED && this._resolveHasGeolocationCapability) {
            this._resolveHasGeolocationCapability(true);
            this._resolveHasGeolocationCapability = undefined;
        }
        if (this._resolveHasOrientationCapability) {
            const orientationFIXED = getEntityOrientationInReferenceFrame(this.eye, clock.currentTime, ReferenceFrame.FIXED, scratchQuaternion);
            if (orientationFIXED) {
                this._resolveHasOrientationCapability(true);
                this._resolveHasOrientationCapability = undefined;
            }
        }
        if (!this.strict && this.sessionService.isRealityManager) {
            const view = this._lastRealityViewState;
            if (view && view.subviews[0]) {
                Matrix4.clone(view.subviews[0].projectionMatrix, this.subviews[0].projectionMatrix);
            }
        }
    }
    updateState() {
        if (this.viewService.vrDisplay) {
            this.updateStateFromWebVR();
        }
        else {
            this.updateStateMonocular();
        }
    }
    updateStateFromWebVR() {
        const vrDisplay = this.viewService.vrDisplay;
        const vrFrameData = this._vrFrameData =
            this._vrFrameData || new VRFrameData();
        if (!vrDisplay.getFrameData(vrFrameData))
            return;
        const deviceState = this._state;
        const layers = vrDisplay.getLayers();
        const leftBounds = layers[0].leftBounds;
        const rightBounds = layers[0].rightBounds;
        const viewportWidth = deviceState.viewport.width;
        const viewportHeight = deviceState.viewport.height;
        const subviews = deviceState.subviews;
        const leftSubview = subviews[0];
        const rightSubview = subviews[1] = subviews[1] || {};
        leftSubview.type = SubviewType.LEFTEYE;
        rightSubview.type = SubviewType.RIGHTEYE;
        const leftViewport = leftSubview.viewport = leftSubview.viewport || {};
        leftViewport.x = leftBounds[0] * viewportWidth;
        leftViewport.y = leftBounds[1] * viewportHeight;
        leftViewport.width = leftBounds[2] * viewportWidth;
        leftViewport.height = leftBounds[3] * viewportHeight;
        const rightViewport = rightSubview.viewport = rightSubview.viewport || {};
        rightViewport.x = rightBounds[0] * viewportWidth;
        rightViewport.y = rightBounds[1] * viewportHeight;
        rightViewport.width = rightBounds[2] * viewportWidth;
        rightViewport.height = rightBounds[3] * viewportHeight;
        leftSubview.projectionMatrix = Matrix4.clone(vrFrameData.leftProjectionMatrix, leftSubview.projectionMatrix);
        rightSubview.projectionMatrix = Matrix4.clone(vrFrameData.rightProjectionMatrix, rightSubview.projectionMatrix);
        const inverseStandingMatrix = Matrix4.IDENTITY.clone(scratchMatrix4);
        if (vrDisplay.stageParameters) {
            Matrix4.inverseTransformation(vrDisplay.stageParameters.sittingToStandingTransform, inverseStandingMatrix);
        }
        const inverseStandingRotationMatrix = Matrix4.getRotation(inverseStandingMatrix, scratchMatrix3);
        const inverseStandingOrientation = Quaternion.fromRotationMatrix(inverseStandingRotationMatrix, scratchQuaternion);
        const leftStandingViewMatrix = Matrix4.multiplyTransformation(vrFrameData.leftViewMatrix, inverseStandingMatrix, scratchMatrix4);
        const rightStandingViewMatrix = Matrix4.multiplyTransformation(vrFrameData.rightViewMatrix, inverseStandingMatrix, scratchMatrix4);
        this.setStagePoseFromGeolocation();
        if (!vrDisplay.displayName.match(/polyfill/g)) {
            const sittingEyePosition = Cartesian3.unpack(vrFrameData.pose.position, 0, scratchCartesian);
            const stageEyePosition = Matrix4.multiplyByPoint(inverseStandingMatrix, sittingEyePosition, scratchCartesian);
            const sittingEyeOrientation = Quaternion.unpack(vrFrameData.pose.orientation, 0, scratchQuaternion2);
            const stageEyeOrientation = Quaternion.multiply(inverseStandingOrientation, sittingEyeOrientation, scratchQuaternion);
            const eye = this.eye;
            eye.position.setValue(stageEyePosition, this.stage);
            eye.orientation.setValue(stageEyeOrientation);
            const leftEye = this.getSubviewEntity(0);
            const stageLeftEyePosition = Matrix4.getTranslation(leftStandingViewMatrix, scratchCartesian);
            leftEye.position.setValue(stageLeftEyePosition, this.stage);
            const rightEye = this.getSubviewEntity(1);
            const stageRightEyePosition = Matrix4.getTranslation(rightStandingViewMatrix, scratchCartesian);
            rightEye.position.setValue(stageRightEyePosition, this.stage);
        }
        else {
            // The polyfill does not support reporting an absolute orientation (yet), 
            // so fall back to our own pose calculation if we are using the polyfill device
            this.setEyePoseFromDeviceOrientation();
        }
    }
    updateStateMonocular() {
        this.setStagePoseFromGeolocation();
        this.setEyePoseFromDeviceOrientation();
        const state = this._state;
        state.subviews.length = 1;
        const subview = state.subviews[0];
        subview.type = SubviewType.SINGULAR;
        subview.viewport = { x: 0, y: 0, width: this._state.viewport.width, height: this._state.viewport.height };
        Matrix4.clone(this._frustum.projectionMatrix, subview.projectionMatrix);
    }
    setEyePoseFromDeviceOrientation() {
        const stageOffset = Cartesian3.fromElements(0, 0, AVERAGE_HUMAN_HEIGHT, scratchCartesian);
        this.eye.position.setValue(stageOffset, this.stage);
        this.eye.orientation.setValue(this._deviceOrientation);
    }
    setStagePoseFromGeolocation() {
        const deviceCartographicPosition = this._state.cartographicPosition;
        if (deviceCartographicPosition) {
            const lon = deviceCartographicPosition.longitude;
            const lat = deviceCartographicPosition.latitude;
            const height = deviceCartographicPosition.height - AVERAGE_HUMAN_HEIGHT;
            const positionECEF = Cartesian3.fromDegrees(lon, lat, height, undefined, scratchCartesian);
            const enuOrientation = Transforms.headingPitchRollQuaternion(positionECEF, 0, 0, 0, undefined, scratchQuaternion);
            this.stage.position.setValue(positionECEF, ReferenceFrame.FIXED);
            this.stage.orientation.setValue(enuOrientation);
        }
        else {
            this.stage.position.setValue(undefined, ReferenceFrame.FIXED);
            this.stage.orientation.setValue(undefined);
        }
    }
    updateViewport() {
        if (this.viewService.element) {
            this.viewport.x = 0;
            this.viewport.y = 0;
            const width = this.viewService.element.clientWidth;
            const height = this.viewService.element.clientHeight;
            this.viewport.width = width;
            this.viewport.height = height;
        }
        const aspect = this.viewport.width / this.viewport.height;
        this._frustum.aspectRatio = isNaN(aspect) ? 1 : aspect;
    }
    /**
     * Request that the callback function be called for the next frame.
     * @param callback function
     */
    requestFrame(callback) {
        const onFrame = () => {
            tick();
            this.update();
            callback(clock.currentTime);
        };
        if (this.viewService.vrDisplay) {
            return this.viewService.vrDisplay.requestAnimationFrame(onFrame);
        }
        else {
            return requestAnimationFrame(onFrame);
        }
    }
    /**
     * Send device state to reality viewers.
     */
    publishDeviceState() {
        this.sessionService.ensureIsRealityManager();
        if (this.sessionService.isRealityManager) {
            this.update();
            this.sessionService.managedSessions.forEach((session) => {
                if (Role.isRealityViewer(session.info.role))
                    session.send('ar.device.state', this._state);
            });
        }
    }
    startGeolocationUpdates() {
        this.sessionService.manager.send('ar.device.startGeolocationUpdates');
    }
    _startGeolocationUpdates() {
        if (typeof navigator == 'undefined')
            return;
        if (!defined(this._geolocationWatchId) && navigator.geolocation) {
            this._geolocationWatchId = navigator.geolocation.watchPosition((pos) => {
                const cartographic = this._state.cartographicPosition = this._state.cartographicPosition || new Cartographic;
                cartographic.latitude = pos.coords.latitude;
                cartographic.longitude = pos.coords.longitude;
                cartographic.height = pos.coords.altitude || 0;
                this._state.geolocationAccuracy = (pos.coords.accuracy > 0) ? pos.coords.accuracy : undefined;
                this._state.altitudeAccuracy = pos.coords.altitudeAccuracy || undefined;
                this.publishDeviceState();
            }, (error) => {
                console.error(error);
            }, {
                enableHighAccuracy: true
            });
        }
        else if (this._resolveHasGeolocationCapability) {
            this._resolveHasGeolocationCapability(false);
            this._resolveHasGeolocationCapability = undefined;
        }
    }
    stopGeolocationUpdates() {
        this.sessionService.manager.send('ar.device.stopGeolocationUpdates');
    }
    _stopGeolocationUpdates() {
        if (typeof navigator !== 'undefined' && defined(this._geolocationWatchId)) {
            navigator.geolocation.clearWatch(this._geolocationWatchId);
            this._geolocationWatchId = undefined;
        }
        this._state.cartographicPosition = undefined;
        this._state.geolocationAccuracy = undefined;
        this._state.altitudeAccuracy = undefined;
        this.publishDeviceState();
    }
    startOrientationUpdates() {
        if (typeof window == 'undefined' || !window.addEventListener)
            return;
        if (!defined(this._deviceorientationListener)) {
            let headingDrift = 0;
            let alphaOffset = undefined;
            this._deviceorientationListener = (e) => {
                let alphaDegrees = e.alpha;
                let webkitCompassHeading = e['webkitCompassHeading'];
                const webkitCompassAccuracy = +e['webkitCompassAccuracy'];
                if (!defined(alphaDegrees)) {
                    this.stopOrientationUpdates();
                    if (this._resolveHasOrientationCapability) {
                        this._resolveHasOrientationCapability(false);
                        this._resolveHasOrientationCapability = undefined;
                    }
                    return;
                }
                if (e.absolute) {
                    alphaOffset = 0;
                }
                // when the phone is almost updside down, webkit flips the compass heading 
                // (not documented anywhere, annoyingly)
                // if (e.beta >= 130 || e.beta <= -130) webkitCompassHeading = undefined;
                if ((!defined(alphaOffset) || Math.abs(headingDrift) > 5) &&
                    defined(webkitCompassHeading) &&
                    webkitCompassAccuracy >= 0 &&
                    webkitCompassAccuracy < 50 &&
                    webkitCompassHeading >= 0) {
                    if (!defined(alphaOffset)) {
                        alphaOffset = -webkitCompassHeading;
                    }
                    else {
                        alphaOffset -= headingDrift;
                    }
                    this._compassAccuracy = webkitCompassAccuracy > 0 ? webkitCompassAccuracy : undefined;
                }
                const alpha = CesiumMath.RADIANS_PER_DEGREE * (e.alpha + alphaOffset || -webkitCompassHeading || 0);
                const beta = CesiumMath.RADIANS_PER_DEGREE * e.beta;
                const gamma = CesiumMath.RADIANS_PER_DEGREE * e.gamma;
                const alphaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, alpha, scratchQuaternion);
                const betaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, beta, scratchQuaternion2);
                const alphaBetaQuat = Quaternion.multiply(alphaQuat, betaQuat, scratchQuaternion);
                const gammaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Y, gamma, scratchQuaternion2);
                const alphaBetaGammaQuat = Quaternion.multiply(alphaBetaQuat, gammaQuat, scratchQuaternion);
                const screenOrientationAngle = (screen['orientation'] && screen['orientation'].angle) || window.orientation || 0;
                const screenOrientationQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, -screenOrientationAngle * CesiumMath.RADIANS_PER_DEGREE, scratchQuaternion2);
                this._deviceOrientation = Quaternion.multiply(alphaBetaGammaQuat, screenOrientationQuat, this._deviceOrientation || new Quaternion);
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
            };
            if ('ondeviceorientationabsolute' in window) {
                window.addEventListener('deviceorientationabsolute', this._deviceorientationListener);
            }
            else if ('ondeviceorientation' in window) {
                window.addEventListener('deviceorientation', this._deviceorientationListener);
            }
            else if (this._resolveHasOrientationCapability) {
                this._resolveHasOrientationCapability(false);
                this._resolveHasOrientationCapability = undefined;
            }
        }
    }
    stopOrientationUpdates() {
        if (typeof window == 'undefined' || !window.removeEventListener)
            return;
        this._deviceOrientation = undefined;
        this._compassAccuracy = undefined;
        if (this._deviceorientationListener) {
            if ('ondeviceorientationabsolute' in window) {
                window.removeEventListener('deviceorientationabsolute', this._deviceorientationListener);
            }
            else if ('ondeviceorientation' in window) {
                window.removeEventListener('deviceorientation', this._deviceorientationListener);
            }
            this._deviceorientationListener = undefined;
        }
    }
};
DeviceService = __decorate([
    inject(SessionService, ContextService, ViewService)
], DeviceService);

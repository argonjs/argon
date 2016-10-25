import { inject } from 'aurelia-dependency-injection'
import {
    Entity,
    ReferenceFrame,
    ConstantPositionProperty,
    ConstantProperty,
    Cartesian3,
    Cartographic,
    Clock,
    PerspectiveFrustum,
    Quaternion,
    CesiumMath,
    Matrix3,
    Matrix4,
    JulianDate,
    Transforms,
    defined,
} from './cesium/cesium-imports'

import { DeviceState, Viewport, SubviewType, Role, SerializedSubview } from './common'

import { ContextService } from './context'

// import { RealityService } from './reality'

import { ViewService } from './view'

import { SessionService, SessionPort } from './session'

import { getEntityPositionInReferenceFrame, requestAnimationFrame } from './utils'

const scratchCartesian = new Cartesian3;
const scratchQuaternion = new Quaternion;
const scratchQuaternion2 = new Quaternion;
const scratchMatrix3 = new Matrix3;
const scratchMatrix4 = new Matrix4;

const clock = new Clock();
const scratchTime = new JulianDate(0,0);

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
    } else if (secondsDrift < 0.5) {
        JulianDate.clone(now, clock.currentTime);
    }
}

declare global {
    class VRFrameData {
        timestamp:number;

        leftProjectionMatrix:Float32Array;
        leftViewMatrix:Float32Array;

        rightProjectionMatrix:Float32Array;
        rightViewMatrix:Float32Array;

        pose:VRPose;
    }

    interface VRDisplay {
        getFrameData(frameData:VRFrameData) : boolean;
    }
}

const AVERAGE_HUMAN_HEIGHT = 1.77;

/**
* Provides device state. 
*/
@inject(SessionService, ViewService, ContextService)
export class DeviceService {

    /**
     * The current vrDisplay, if there is one. 
     */
    public vrDisplay?:VRDisplay;
    
    /**
     * A coordinate system represeting the space in which the 
     * user is moving, positioned at the floor. For mobile devices,
     * the stage follows the user. For non-mobile systems, the
     * stage is fixed. 
     */
    public stage = this.contextService.entities.add(new Entity({
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
    public eye = this.contextService.entities.add(new Entity({
        id: 'ar.device.eye',
        name: 'Device Eye',
        position: new ConstantPositionProperty(undefined, undefined),
        orientation: new ConstantProperty(undefined)
    }));

    /**
     * An East-North-Up coordinate frame centered at the eye position
     */
    public eyeEastNorthUp = this.contextService.entities.add(new Entity({
        id: 'ar.device.eyeEastNorthUp',
        name: 'Device Eye - ENU',
        position: new ConstantPositionProperty(undefined, undefined),
        orientation: new ConstantProperty(undefined)
    }));

    /**
     * The current cartographic position of the eye. Undefined if no geolocation is available. 
     */
    public get eyeCartographicPosition() : Cartographic|undefined {
        return this._eyeCartographicPosition;
    }

    /** 
     * The radius (in meters) of latitudinal and longitudinal uncertainty,
     * in relation to the FIXED reference frame. Value is greater than
     * 0 or undefined.
     */
    public get geolocationAccuracy() : number|undefined {
        return this._state.geolocationAccuracy;
    }

    /**
     * The accuracy of the altitude in meters. Value is greater than
     * 0 or undefined.
     */
    public get altitudeAccuracy() : number|undefined {
        return this._state.altitudeAccuracy;
    }

    /**
     * The accuracy of the compass in degrees. Value is greater than
     * 0 or undefined.
     */
    public get compassAccuracy() : number|undefined {
        return this._compassAccuracy;
    }

    public get viewport() {
        return this._state.viewport;
    }

    public get subviews() {
        return this._state.subviews;
    }

    public get strictSubviewPose() {
        return this._state.strictSubviewPose;
    }

    public get strictSubviewProjectionMatrix() {
        return this._state.strictSubviewProjectionMatrix;
    }

    public get strictSubviewViewport() {
        return this._state.strictSubviewViewport;
    }

    public get strictViewport() {
        return this._state.strictViewport;
    }

    /**
     * The sessions that are subscribed to the device location
     */
    protected geolocationSubscribers = new Set<SessionPort>();

    /**
    * Initialize the DeviceService
    */
    constructor(
        private sessionService: SessionService,
        private viewService: ViewService,
        private contextService: ContextService) {

        this.sessionService.manager.on['ar.device.state'] = (deviceState:DeviceState) => {
            this._state = deviceState;
        }

        this.sessionService.connectEvent.addEventListener((session)=>{
            if (session.info.needsGeopose) {
                this.geolocationSubscribers.add(session);
                this.startDeviceLocationUpdates();
                session.closeEvent.addEventListener(()=>{
                    this.geolocationSubscribers.delete(session);
                    if (this.geolocationSubscribers.size === 0) 
                        this.stopDeviceLocationUpdates();
                })
            }
        })

        if (this.sessionService.isRealityManager || this.sessionService.isRealityViewer) {
            this.startDeviceOrientationUpdates();
        }

        const frustum = this._frustum;
        frustum.near = 0.01;
        frustum.far = 500000000;
        frustum.fov = Math.PI / 3;
        frustum.aspectRatio = 1;
        Matrix4.clone(frustum.projectionMatrix, this.subviews[0].projectionMatrix);

        if (this.sessionService.isRealityManager) {
            this.viewService.containingElementPromise.then(()=>{
                this.publishDeviceState();
                setInterval(this.publishDeviceState.bind(this), 500);
                window.addEventListener('resize', this.publishDeviceState.bind(this));
            });
        }
        
    }

    private _state:DeviceState = {
        viewport: {x:0,y:0, width:1, height:1},
        subviews: [{
            type: SubviewType.SINGULAR,
            projectionMatrix: new Matrix4()
        }],
        geolocationAccuracy: undefined,
        altitudeAccuracy: undefined
    };
    
    private _eyeCartographicPosition?:Cartographic;

    private _frustum = new PerspectiveFrustum();

    public getSubviewEntity(index:number) {
        const subviewEntity = this.contextService.entities.getOrCreateEntity('ar.device.view_'+index);
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
    private update() {
        this.sessionService.ensureNotRealityAugmenter();

        if (this.sessionService.isRealityManager) {
            this.updateViewport();
            this.updateState();
        } else {
            this.setEyePoseFromDeviceOrientation();
        }
        
        const positionFIXED = getEntityPositionInReferenceFrame(this.eye, clock.currentTime, ReferenceFrame.FIXED, scratchCartesian);
        this._eyeCartographicPosition = positionFIXED ? 
            Cartographic.fromCartesian(positionFIXED, undefined, this._eyeCartographicPosition) :
            positionFIXED;
    }

    protected updateState() {
        if (typeof navigator !== 'undefined' &&
            navigator.activeVRDisplays && 
            navigator.activeVRDisplays.length) {
                this.updateStateFromWebVR();
        } else {
            this.updateStateMonocular();
        }
    }

    private updateStateFromWebVR() {
        const vrDisplay = navigator.activeVRDisplays[0];
        const vrFrameData = this._vrFrameData = 
            this._vrFrameData || new VRFrameData();
        if (!vrDisplay.getFrameData(vrFrameData)) return;

        const deviceState = this._state;
        const subviews = deviceState.subviews;
        const leftSubview = subviews[0];
        const rightSubview = subviews[1] = subviews[1] || <SerializedSubview>{};
        const leftViewport = leftSubview.viewport || <Viewport>{};
        leftViewport.x = 0;
        leftViewport.y = 0;
        leftViewport.width = deviceState.viewport.width * 0.5;
        leftViewport.height = deviceState.viewport.height;
        const rightViewport = rightSubview.viewport || <Viewport>{};
        rightViewport.x = leftViewport.width;
        rightViewport.y = 0;
        rightViewport.width = leftViewport.width;
        rightViewport.height = deviceState.viewport.height;

        leftSubview.projectionMatrix = Matrix4.fromColumnMajorArray(
            <any>vrFrameData.leftProjectionMatrix, 
            leftSubview.projectionMatrix
        );
        rightSubview.projectionMatrix = Matrix4.clone(
            <any>vrFrameData.rightProjectionMatrix, 
            rightSubview.projectionMatrix
        );

        const inverseStandingMatrix = Matrix4.inverseTransformation(
            <any>vrDisplay.stageParameters.sittingToStandingTransform, 
            scratchMatrix4
        );

        const inverseStandingRotationMatrix = Matrix4.getRotation(inverseStandingMatrix, scratchMatrix3);
        const inverseStandingOrientation = Quaternion.fromRotationMatrix(inverseStandingRotationMatrix, scratchQuaternion)

        const leftStandingViewMatrix = Matrix4.multiplyTransformation(
            <any>vrFrameData.leftViewMatrix, 
            inverseStandingMatrix, 
            scratchMatrix4
        );

        const rightStandingViewMatrix = Matrix4.multiplyTransformation(
            <any>vrFrameData.rightViewMatrix, 
            inverseStandingMatrix, 
            scratchMatrix4
        );

        this.setStagePoseFromGeolocation();

        if (!vrDisplay.displayName.match(/polyfill/g)) {
            const sittingEyePosition = Cartesian3.unpack(<any>vrFrameData.pose.position, 0, scratchCartesian);
            const stageEyePosition = Matrix4.multiplyByPoint(inverseStandingMatrix, sittingEyePosition, scratchCartesian);
            const sittingEyeOrientation = Quaternion.unpack(<any>vrFrameData.pose.orientation, 0, scratchQuaternion2);
            const stageEyeOrientation = Quaternion.multiply(inverseStandingOrientation, sittingEyeOrientation, scratchQuaternion);

            const eye = this.eye;
            (eye.position as ConstantPositionProperty).setValue(stageEyePosition, this.stage);
            (eye.orientation as ConstantProperty).setValue(stageEyeOrientation);

            const leftEye = this.getSubviewEntity(0);
            const stageLeftEyePosition = Matrix4.getTranslation(leftStandingViewMatrix, scratchCartesian);
            (leftEye.position as ConstantPositionProperty).setValue(stageLeftEyePosition, this.stage);

            const rightEye = this.getSubviewEntity(1);
            const stageRightEyePosition = Matrix4.getTranslation(rightStandingViewMatrix, scratchCartesian);
            (rightEye.position as ConstantPositionProperty).setValue(stageRightEyePosition, this.stage);
        } else {
            // The polyfill does not support reporting an absolute orientation (yet), 
            // so fall back to our own pose calculation if we are using the polyfill device
            this.setEyePoseFromDeviceOrientation();
        }

    }

    private updateStateMonocular() {
        this.setStagePoseFromGeolocation();
        this.setEyePoseFromDeviceOrientation();
        const state = this._state;
        state.subviews.length = 1;
        state.subviews[0].viewport = undefined;
        Matrix4.clone(this._frustum.projectionMatrix, state.subviews[0].projectionMatrix);
    }

    private setEyePoseFromDeviceOrientation() {
        const stageOffset = Cartesian3.fromElements(0,0,AVERAGE_HUMAN_HEIGHT, scratchCartesian);
        (<ConstantPositionProperty>this.eye.position!).setValue(stageOffset, this.stage);
        (<ConstantProperty>this.eye.orientation!).setValue(this._deviceOrientation);
    }

    private setStagePoseFromGeolocation() {
        const deviceCartographicPosition = this._state.cartographicPosition;
        if (deviceCartographicPosition) {
            const lon = deviceCartographicPosition.longitude;
            const lat = deviceCartographicPosition.latitude;
            const height = deviceCartographicPosition.height - AVERAGE_HUMAN_HEIGHT
            const positionECEF = Cartesian3.fromDegrees(lon, lat, height, undefined, scratchCartesian);
            const enuOrientation = Transforms.headingPitchRollQuaternion(positionECEF, 0, 0, 0, undefined, scratchQuaternion);
            (this.stage.position as ConstantPositionProperty).setValue(positionECEF, ReferenceFrame.FIXED);
            (this.stage.orientation as ConstantProperty).setValue(enuOrientation);
        } else {
            (this.stage.position as ConstantPositionProperty).setValue(undefined, ReferenceFrame.FIXED);
            (this.stage.orientation as ConstantProperty).setValue(undefined);
        }
    }

    protected updateViewport() {
        this._frustum.aspectRatio = 
            this._state.viewport.width / this._state.viewport.height;
        if (this.viewService.containingElement) {
            this.viewport.x = 0;
            this.viewport.y = 0;
            const width = this.viewService.containingElement.clientWidth;
            const height = this.viewService.containingElement.clientHeight;
            this.viewport.width = width;
            this.viewport.height = height;
        }
    }

    /**
     * Request that the callback function be called for the next frame.
     * @param callback function
     */
    public requestFrame(callback:(now:JulianDate)=>any) {
        const onFrame = () => {
            tick();
            this.update();
            callback(clock.currentTime);
        }
        if (this.vrDisplay) {
            return this.vrDisplay.requestAnimationFrame(onFrame);
        } else {
            return requestAnimationFrame(onFrame);
        }
    }
    
    /**
     * Send device state to reality viewers. 
     */
    public publishDeviceState() {
        this.sessionService.ensureIsRealityManager();
        if (this.sessionService.isRealityManager) {
            this.update();
            this.sessionService.managedSessions.forEach((session)=>{
                if (Role.isRealityViewer(session.info.role))
                    session.send('ar.device.state', this._state);
            });
        }
    }

    /**
     * Returns the maximum allowed viewport
     */
    public getMaximumViewport() : Viewport {
        if (typeof document !== 'undefined' && document.documentElement) {
            return {
                x: 0,
                y: 0,
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
        throw new Error("Not implemeneted for the current platform");
    }

    /**
     * Attempt to zoom
     */
    // public zoom(data: ZoomData) {
    //     if (this.realityService.session && this.realityService.session.info['reality.handlesZoom']) {
    //         this.realityService.session.send('ar.device.zoom', data);
    //         this.realityService.session.send('ar.reality.zoom', data); // backwards compatability, remove at v1.2
    //     } else {
    //         const fov = this.onZoom(<ZoomData>data);
    //         if (this.sessionService.isRealityViewer || this.sessionService.isRealityManager) {
    //             this.sessionService.manager.send('ar.device.desiredFov', { fov });
    //         }
    //     }
    // }

    /**
     * Handle zoom. Overridable for custom behavior.
     */
    // public onZoom(data: ZoomData): number {
        
    //     this.state.subviews[0].frustum.fov

    //     let newFov = 2 * Math.atan(Math.tan(data.fov * 0.5) / data.zoom);

    //     newFov = Math.max(
    //         10 * CesiumMath.RADIANS_PER_DEGREE,
    //         Math.min(newFov, 160 * CesiumMath.RADIANS_PER_DEGREE)
    //     );

    //     // snap to default
    //     if (data.state === ZoomState.END &&
    //         Math.abs(newFov - this.state.defaultFov) < 0.05 /* +-6deg */) {
    //         newFov = this.state.defaultFov;
    //     }

    //     return newFov;
    // }

    /**
     * Set a desired fov in radians.
     */
    // public setDesiredFov(fov: number | undefined) {
    //     this.zoom({ fov: fov || this.state.defaultFov, zoom: 1, state: ZoomState.OTHER })
    // }

    /**
     * Set the default fov in radians, and adjust the desired fov to match the 
     * previous desired / default ratio. 
     */
    // public setDefaultFov(fov: number) {
    //     const currentFov = this.state.subviews[0].frustum.fov;
    //     const ratio = currentFov / this.state.defaultFov;
    //     this.setDesiredFov(fov * ratio);
    //     this.state.defaultFov = fov;
    // }

    private _geolocationWatchId;
    private _deviceorientationListener;
    private _vrFrameData?:VRFrameData;

    protected startDeviceLocationUpdates() {
        if (typeof navigator == 'undefined') return;

        if (!defined(this._geolocationWatchId)) {
            this._geolocationWatchId = navigator.geolocation.watchPosition((pos) => {
                const cartographic = this._state.cartographicPosition = this._state.cartographicPosition || new Cartographic;
                cartographic.latitude = pos.coords.latitude;
                cartographic.longitude = pos.coords.longitude;
                cartographic.height = pos.coords.altitude || 0;
                this._state.geolocationAccuracy = (pos.coords.accuracy > 0) ? pos.coords.accuracy : undefined;
                this._state.altitudeAccuracy = pos.coords.altitudeAccuracy || undefined;
                this.publishDeviceState();
            }, (error) => {
                console.error(error)
            }, {
                enableHighAccuracy: true
            });
        }
    }

    protected stopDeviceLocationUpdates() {
        if (typeof navigator !== 'undefined' && defined(this._geolocationWatchId)) {
            navigator.geolocation.clearWatch(this._geolocationWatchId);
            this._geolocationWatchId = undefined;
        }
        this._state.cartographicPosition = undefined;
        this._state.geolocationAccuracy = undefined;
        this._state.altitudeAccuracy = undefined;
        this.publishDeviceState();
    }

    private _deviceOrientation?:Quaternion;
    private _compassAccuracy?:number;

    protected startDeviceOrientationUpdates() {
        if (typeof window == 'undefined' || !window.addEventListener) return;

        if (!defined(this._deviceorientationListener)) {
            let headingDrift = 0;
            let alphaOffset:number|undefined = undefined;
            this._deviceorientationListener = (e: DeviceOrientationEvent) => {

                let alphaDegrees = e.alpha;
                let webkitCompassHeading: number = e['webkitCompassHeading'];
                const webkitCompassAccuracy: number = +e['webkitCompassAccuracy'];

                if (!defined(alphaDegrees)) {
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
                    } else {
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
                const screenOrientationQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, - screenOrientationAngle * CesiumMath.RADIANS_PER_DEGREE, scratchQuaternion2);
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
            }
            if ('ondeviceorientationabsolute' in window) {
                window.addEventListener('deviceorientationabsolute', this._deviceorientationListener)
            } else if ('ondeviceorientation' in window) {
                window.addEventListener('deviceorientation', this._deviceorientationListener)
            }
        }
    }

    protected stopDeviceOrientationUpdates() {
        if (typeof window == 'undefined' || !window.removeEventListener) return;

        this._deviceOrientation = undefined;
        this._compassAccuracy = undefined;

        if (this._deviceorientationListener) {
            if ('ondeviceorientationabsolute' in window) {
                window.removeEventListener('deviceorientationabsolute', this._deviceorientationListener)
            } else if ('ondeviceorientation' in window) {
                window.removeEventListener('deviceorientation', this._deviceorientationListener)
            }
            this._deviceorientationListener = undefined;
        }
    }
    
}
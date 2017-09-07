import {
    Entity, 
    DynamicPositionProperty,
    DynamicProperty,
    ReferenceFrame,
    Cartesian3,
    Matrix3,
    Matrix4,
    CesiumMath,
    Quaternion,
    JulianDate,
    PerspectiveFrustum,
    defined,
    Cartographic
} from './cesium/cesium-imports'

import {ContextFrameState} from './common'
import {autoinject, singleton} from 'aurelia-dependency-injection';
import {EntityService, EntityServiceProvider, PoseStatus} from './entity'
import {SessionService, SessionPort} from './session'

import {ArgonSystem} from './argon'

import {
    AVERAGE_EYE_HEIGHT,
    DEFAULT_NEAR_PLANE,
    DEFAULT_FAR_PLANE,
    CanvasViewport,
    Viewport,
    SerializedSubviewList,
    SubviewType,
    GeolocationOptions,
    SerializedSubview
} from './common'

import {
    deprecated,
    eastUpSouthToFixedFrame,
    requestAnimationFrame,
    cancelAnimationFrame,
    updateHeightFromTerrain,
    jsonEquals,
    Event
} from './utils'

import {
    ViewService,
    ViewportMode,
    ViewItems
} from './view'

import { VisibilityService } from './visibility'

import { isAndroid, isIOS } from './utils'

export class DeviceStableState {
    viewport?:CanvasViewport;
    subviews?:SerializedSubviewList;
    suggestedGeolocationSubscription?:{enableHighAccuracy?:boolean} = undefined;
    suggestedUserHeight = AVERAGE_EYE_HEIGHT;

    userTracking:'none'|'3DOF'|'6DOF' = 'none';
    displayMode:'hand'|'head'|'other' = 'other';
    isPresentingHMD = false;
    isPresentingRealityHMD = false;
    strict = false;
}

export class DeviceFrameState {
    private _scratchFrustum = new PerspectiveFrustum();

    time = JulianDate.now();

    viewport = new CanvasViewport;

    subviews:SerializedSubviewList = [{
        type: SubviewType.SINGULAR,
        viewport: new Viewport,
        projectionMatrix: (
            this._scratchFrustum.near = DEFAULT_NEAR_PLANE,
            this._scratchFrustum.far = DEFAULT_FAR_PLANE,
            this._scratchFrustum.fov = CesiumMath.PI_OVER_THREE, 
            this._scratchFrustum.aspectRatio = 1, 
            Matrix4.clone(this._scratchFrustum.projectionMatrix)
        )
    }];

    userTracking:'none'|'3DOF'|'6DOF' = 'none';
};

@autoinject
export class Device {

    vrDisplays:VRDisplay[]|undefined;
    vrDisplay:VRDisplay|undefined;
    userTracking:'none'|'3DOF'|'6DOF' = 'none';
    displayMode:'hand'|'head'|'other' = isIOS || isAndroid ? 'hand' : 'other';
    screenOrientation = 0;
    suggestedGeolocationSubscription:{enableHighAccuracy?:boolean}|undefined;

    frameState = new DeviceFrameState;
    frameStateEvent = new Event<DeviceFrameState>();
    
    vrDisplaysUpdatedEvent= new Event<void>();
    vrDisplayChangeEvent= new Event<void>();
    userTrackingChangeEvent= new Event<void>();
    displayModeChangeEvent= new Event<void>();
    screenOrientationChangeEvent= new Event<void>();
    suggestedGeolocationSubscriptionChangeEvent = new Event<void>();

    public deviceGeolocation = new Entity({
        id: 'ar.device-geolocation',
        position: new DynamicPositionProperty(undefined, ReferenceFrame.FIXED),
        orientation: new DynamicProperty(undefined)
    });
    
    public deviceOrientation = new Entity({
        id: 'ar.device-orientation',
        position: new DynamicPositionProperty(Cartesian3.ZERO, this.deviceGeolocation),
        orientation: new DynamicProperty(undefined)
    });
    
    public origin: Entity = new Entity({
        id: 'ar.device.origin',
        name: 'Device Origin',
        position: new DynamicPositionProperty(undefined, this.deviceGeolocation),
        orientation: new DynamicProperty(undefined)
    });
    
    public stage: Entity = new Entity({
        id: 'ar.device.stage',
        name: 'Device Stage',
        position: new DynamicPositionProperty(undefined, this.deviceGeolocation),
        orientation: new DynamicProperty(undefined)
    });

    public user: Entity = new Entity({
        id: 'ar.device.user',
        name: 'Device User',
        position: new DynamicPositionProperty(undefined, this.origin),
        orientation: new DynamicProperty(undefined)
    });

    public getSubviewEntity(index:number) {
        const subviewEntity = this.entityService.collection.getOrCreateEntity('ar.device.view_'+index);
        if (!subviewEntity.position) {
            subviewEntity.position = new DynamicPositionProperty(Cartesian3.ZERO, this.user);
        }
        if (!subviewEntity.orientation) {
            subviewEntity.orientation = new DynamicProperty(Quaternion.IDENTITY);
        }
        return subviewEntity;
    }
    
    constructor(
        public owner:SessionService, 
        public entityService:EntityService,
        private viewItems: ViewItems) {

            const addEventListener = this.frameStateEvent.addEventListener.bind(this.frameStateEvent);
            this.frameStateEvent.addEventListener = (callback) => {
                const result = addEventListener(callback);
                this._checkFrameStateListeners();
                return result;
            }

            const removeEventListener = this.frameStateEvent.removeEventListener.bind(this.frameStateEvent);
            this.frameStateEvent.removeEventListener = (callback) => {
                const result = removeEventListener(callback);
                this._checkFrameStateListeners();
                return result;
            }

            if (owner.isRealityManager) {
                this.entityService.subscribedEvent.addEventListener((evt)=>{
                    if (evt.id === 'ar.origin') {
                        this.suggestedGeolocationSubscription = evt.options || {};
                        this.suggestedGeolocationSubscriptionChangeEvent.raiseEvent(undefined);
                    }
                });
                this.entityService.unsubscribedEvent.addEventListener((evt)=>{
                    if (evt.id === 'ar.origin') {
                        this.suggestedGeolocationSubscription = undefined;
                        this.suggestedGeolocationSubscriptionChangeEvent.raiseEvent(undefined);
                    }
                });
            }

        }
    
    // for now, only use webvr when not in argon-app
    private  _useWebVR = (typeof navigator !== 'undefined' && 
        navigator.getVRDisplays && 
        navigator.userAgent.indexOf('Argon') > 0 === false);

    protected _overrideState : DeviceStableState|undefined;

    protected _scratchCartesian = new Cartesian3;
    protected _scratchFrustum = new PerspectiveFrustum();

    public get strict() : boolean {
        return !!(this._overrideState && this._overrideState.strict) ||
            this.displayMode === 'head' && !this._hasPolyfillWebVRDisplay();
    }

    public defaultUserHeight = AVERAGE_EYE_HEIGHT;
    
    public get suggestedUserHeight() {
        return this._overrideState && this._overrideState.suggestedUserHeight || 
            this.displayMode === 'head' ? this.defaultUserHeight : this.defaultUserHeight/2;
    }

    // The device is able to render reality into a separate layer in the primary display
    public get hasSeparateRealityLayer() : boolean {
        return (this.vrDisplay && !!this.vrDisplay.displayName.match(/polyfill/g)) || this.vrDisplay === undefined;
    }

    private _running = false;

    private _previousNumListeners = 0;

    private _checkFrameStateListeners() {                
        // if we have listeners, subscribe to device state, otherwise, unsubscribe
        const numListeners = this.frameStateEvent.numberOfListeners;
        const previousNumListeners = this._previousNumListeners;
        this._previousNumListeners = numListeners;

        if (typeof window === 'undefined' || !window.addEventListener) {
            if (previousNumListeners === 0 && numListeners === 1 && !this._running) {
                this._running = true;
                this.requestAnimationFrame(this._onUpdateFrameState);                
            }
            return;
        }
        
        if (previousNumListeners === 0 && numListeners === 1) {
            if (this._useWebVR) { 
                this._selectVRDisplay();
            } else {
                this.userTracking = isIOS || isAndroid ? '3DOF' : 'none';
                this.userTrackingChangeEvent.raiseEvent(undefined);
            }
            window.addEventListener('orientationchange', this._handleScreenOrientationChange);
            window.addEventListener('vrdisplaypresentchange', this._handleVRDisplayPresentChange);
            this.requestAnimationFrame(this._onUpdateFrameState);
        } else if (previousNumListeners === 1 && numListeners === 0) {
            const vrDisplay = this.vrDisplay;
            if (vrDisplay) {
                if (vrDisplay.isPresenting) vrDisplay.exitPresent();
                this.vrDisplay = undefined;
                this.vrDisplayChangeEvent.raiseEvent(undefined);
                this.userTracking = 'none';
                this.userTrackingChangeEvent.raiseEvent(undefined);
            }
            window.removeEventListener('orientationchange', this._handleScreenOrientationChange);
            window.removeEventListener('vrdisplaypresentchange', this._handleVRDisplayPresentChange);
        }
    }

    private _selectVRDisplay() {
        navigator.getVRDisplays().then(displays => {
            this.vrDisplays = displays;
            const display = this.vrDisplay = displays[0];
            if (!display) return;

            this.userTracking = 
                display.capabilities.hasPosition && display.capabilities.hasOrientation ? 
                "6DOF" : "3DOF";
                
            this.vrDisplaysUpdatedEvent.raiseEvent(undefined);
            this.vrDisplayChangeEvent.raiseEvent(undefined);
            this.userTrackingChangeEvent.raiseEvent(undefined);
        });
    }

    private _handleScreenOrientationChange = () => {
        const end = (dispatchEvent) => {
            clearInterval(interval);
            clearTimeout(timeout);
            this.screenOrientationChangeEvent.raiseEvent(undefined);
        };

        let lastInnerWidth:number;
        let lastInnerHeight:number;
        let noChangeCount:number;
        const interval = setInterval(() => {
            if (window.innerWidth === lastInnerWidth && window.innerHeight === lastInnerHeight) {
                noChangeCount++;
                if (noChangeCount === 100) {
                    end(true);
                }
            } else {
                lastInnerWidth = window.innerWidth;
                lastInnerHeight = window.innerHeight;
                noChangeCount = 0;
            }
        });

        const timeout = setTimeout(() => {
            end(true);
        }, 1000);
    }

    private _handleVRDisplayPresentChange = (e) => {                
        const display:VRDisplay|undefined = e.display || e.detail.vrdisplay || e.detail.display;
        if (display && display === this.vrDisplay) {
            const newDisplayMode = display.isPresenting ? 'head' : 
                display.capabilities.hasOrientation ? 'hand' : 'other';
            if (newDisplayMode !== this.displayMode) {
                this.displayMode = newDisplayMode;
                this.displayModeChangeEvent.raiseEvent(undefined);
            }
        }
    }

    private _onUpdateFrameState = () => {
        const state = this.frameState;
        JulianDate.now(state.time);
        state['strict'] = this.strict; // backwards-compat

        try {
            this.onUpdateFrameState();
            this.frameStateEvent.raiseEvent(state);
        } catch(e) {
            this.owner.manager.sendError(e);
            this.owner.errorEvent.raiseEvent(e);
        }

        if (this.frameStateEvent.numberOfListeners > 0) {
            this.requestAnimationFrame(this._onUpdateFrameState);
        } else {
            this._running = false;
            return;
        }
    }

    public onUpdateFrameState() {
        this._updateViewport();
        // use webvr if the current display is not an external display and can't present, 
        // or if it is currently presenting
        const vrDisp = this.vrDisplay;
        if (vrDisp && vrDisp.isPresenting ||
                vrDisp && !vrDisp.capabilities.hasExternalDisplay && 
                !vrDisp.capabilities.canPresent && vrDisp.displayName.indexOf('polyfill') === -1) {
            this._updateForWebVR();
        } else {
            this._updateDefault();
        }
    }

    private _updateViewport() {
        const overrideState = this._overrideState;
        const state = this.frameState;
        const viewport = state.viewport;
        
        if (overrideState && overrideState.viewport) { 

            CanvasViewport.clone(overrideState.viewport, viewport);

        } else {

            const element = this.viewItems.element;
            viewport.x = 0;
            viewport.y = 0;
            viewport.width = element && element.clientWidth || 0;
            viewport.height = element && element.clientHeight || 0;

            const vrDisplay = this.vrDisplay;

            if (vrDisplay && vrDisplay.isPresenting) {

                var leftEye = vrDisplay.getEyeParameters("left");
                var rightEye = vrDisplay.getEyeParameters("right");
                
                const viewport = state.viewport;
                viewport.renderWidthScaleFactor = 2 * Math.max(leftEye.renderWidth, rightEye.renderWidth) / viewport.width;
                viewport.renderHeightScaleFactor = Math.max(leftEye.renderHeight, rightEye.renderHeight) / viewport.height;

            } else {

                viewport.renderHeightScaleFactor = 1;
                viewport.renderWidthScaleFactor = 1;

            }

        }
    }
    
    private _updateDefault() {
        this._updateDefaultStage();
        this._updateDefaultUser();
        this._updateDefaultOrigin();

        const overrideState = this._overrideState;
        const frameState = this.frameState;
        
        const viewport = frameState.viewport;
        if (overrideState && overrideState.viewport) {
            CanvasViewport.clone(overrideState.viewport, viewport);
        }

        const subviews = frameState.subviews;
        if (overrideState && overrideState.subviews) {
            SerializedSubviewList.clone(overrideState.subviews, subviews);
        } else {
            subviews.length = 1;
            const subview = subviews[0] || {};
  
            subview.type = SubviewType.SINGULAR;

            subview.viewport.x = 0;
            subview.viewport.y = 0;
            subview.viewport.width = viewport.width;
            subview.viewport.height = viewport.height;

            const aspect = viewport.width / viewport.height;
            const frustum = this._scratchFrustum;
            frustum.near = DEFAULT_NEAR_PLANE;
            frustum.far = DEFAULT_FAR_PLANE;
            frustum.fov = CesiumMath.PI_OVER_THREE;
            frustum.aspectRatio = isFinite(aspect) && aspect !== 0 ? aspect : 1;
            subview.projectionMatrix = Matrix4.clone(frustum.projectionMatrix, subview.projectionMatrix);

            const subviewEntity = this.getSubviewEntity(0);
            (subviewEntity.position as DynamicPositionProperty).setValue(Cartesian3.ZERO, this.user);
            (subviewEntity.orientation as DynamicProperty).setValue(Quaternion.IDENTITY);
        }
    }
    
    private _updateDefaultStage() {
        const stage = this.stage;

        // if manager is updating the device stage state, don't update it here
        const contextFrameState = this._contextFrameState;
        if (contextFrameState && contextFrameState.entities[stage.id]) return;

        (stage.position as DynamicPositionProperty).setValue(
            Cartesian3.fromElements(0,-this.suggestedUserHeight,0, this._scratchCartesian), 
            this.deviceGeolocation
        );
        (stage.orientation as DynamicProperty).setValue(Quaternion.IDENTITY);
    }

    private _updateDefaultUser() {
        const user = this.user;

        this._tryOrientationUpdates();

        // if manager is updating the device user state, don't update it here
        const contextFrameState = this._contextFrameState;
        if (contextFrameState && contextFrameState.entities[user.id]) return;

        const screenOrientation = 
            Quaternion.fromAxisAngle(
                Cartesian3.UNIT_Z, 
                this.screenOrientationDegrees * CesiumMath.RADIANS_PER_DEGREE, 
                this._scratchQuaternion
            );
        
        (user.position as DynamicPositionProperty).setValue(
            Cartesian3.ZERO,
            this.deviceOrientation
        );

        (user.orientation as DynamicProperty).setValue(
            screenOrientation
        );

        // const deviceOrientationValue = 
        //     (this.deviceOrientation.orientation as DynamicProperty).getValue(this.frameState.time);
        // (user.orientation as DynamicProperty).setValue(
        //     Quaternion.multiply(
        //         deviceOrientationValue,
        //         screenOrientation,
        //         this._scratchQuaternion
        //     )
        // );

        // stage['meta'] = stage['meta'] || {};
        // stage['meta'].geoHeadingAccuracy = this._deviceOrientationHeadingAccuracy;
    }
    

    private _updateDefaultOrigin() {
        const origin = this.origin;
        const deviceGeolocation = this.deviceGeolocation;

        // if manager is updating the device origin state, don't update it here
        const contextFrameState = this._contextFrameState;
        if (contextFrameState && contextFrameState.entities[origin.id]) return;

        const time = this.frameState.time;
        const originPose = this.entityService.getEntityPose(origin, deviceGeolocation, time);
        const deviceGeolocationPose = this.entityService.getEntityPose(deviceGeolocation, ReferenceFrame.FIXED, time);

        if ((originPose.status & PoseStatus.KNOWN) === 0 && deviceGeolocationPose.status & PoseStatus.KNOWN ||
            origin.position!.referenceFrame !== ReferenceFrame.FIXED && deviceGeolocationPose.status & PoseStatus.KNOWN ||
            originPose.status & PoseStatus.KNOWN && deviceGeolocationPose.status & PoseStatus.KNOWN &&
                Cartesian3.magnitudeSquared(originPose.position) > 10000 
        ) {
            (origin.position as DynamicPositionProperty).setValue(deviceGeolocationPose.position, ReferenceFrame.FIXED);
            (origin.orientation as DynamicProperty).setValue(deviceGeolocationPose.orientation);
            console.log('Updated device origin to ' + JSON.stringify(deviceGeolocationPose.position) + " at FIXED");
            return;
        }

        if ((deviceGeolocationPose.status & PoseStatus.KNOWN) === 0) {
            (origin.position as DynamicPositionProperty).setValue(Cartesian3.ZERO, deviceGeolocation);
            (origin.orientation as DynamicProperty).setValue(Quaternion.IDENTITY);
        }
    }

    private _vrFrameData?:any;
    private _scratchQuaternion = new Quaternion;
    private _scratchQuaternion2 = new Quaternion;
    private _scratchMatrix3 = new Matrix3;
    private _scratchMatrix4 = new Matrix4;

	private _defaultLeftBounds = [ 0.0, 0.0, 0.5, 1.0 ];
	private _defaultRightBounds = [ 0.5, 0.0, 0.5, 1.0 ];

    private _updateForWebVR() {
        const vrDisplay = this.vrDisplay;
        if (!vrDisplay) throw new Error('No vr display!');

        const frameState = this.frameState;

        const vrFrameData : VRFrameData = this._vrFrameData = 
            this._vrFrameData || new VRFrameData();
        if (!vrDisplay['getFrameData'](vrFrameData)) 
            return this.frameState;

        const layer = vrDisplay.getLayers()[0];
        let leftBounds = layer && layer.leftBounds;
        let rightBounds = layer && layer.rightBounds;

        if ( layer ) {
            leftBounds = layer.leftBounds && layer.leftBounds.length === 4 ? layer.leftBounds : this._defaultLeftBounds;
            rightBounds = layer.rightBounds && layer.rightBounds.length === 4 ? layer.rightBounds : this._defaultRightBounds;
        } else {
            leftBounds = this._defaultLeftBounds;
            rightBounds = this._defaultRightBounds;
        }
        
        const viewport = frameState.viewport;
        const subviews = frameState.subviews = frameState.subviews || [];
        subviews.length = 2;

        const leftSubview = subviews[0] = subviews[0] || {};
        const rightSubview = subviews[1] = subviews[1] || {};
        leftSubview.type = SubviewType.LEFTEYE;
        rightSubview.type = SubviewType.RIGHTEYE;

        const leftViewport = leftSubview.viewport = leftSubview.viewport || <CanvasViewport>{};
        leftViewport.x = leftBounds[0] * viewport.width;
        leftViewport.y = leftBounds[1] * viewport.height;
        leftViewport.width = leftBounds[2] * viewport.width;
        leftViewport.height = leftBounds[3] * viewport.height;

        const rightViewport = rightSubview.viewport = rightSubview.viewport || <CanvasViewport>{};
        rightViewport.x = rightBounds[0] * viewport.width;
        rightViewport.y = rightBounds[1] * viewport.height;
        rightViewport.width = rightBounds[2] * viewport.width;
        rightViewport.height = rightBounds[3] * viewport.height;

        leftSubview.projectionMatrix = Matrix4.clone(
            <any>vrFrameData.leftProjectionMatrix, 
            leftSubview.projectionMatrix
        );
        rightSubview.projectionMatrix = Matrix4.clone(
            <any>vrFrameData.rightProjectionMatrix, 
            rightSubview.projectionMatrix
        );

        const user = this.user;
        const origin = this.origin;

        const leftEyeTransform = Matrix4.inverseTransformation(
            <any>vrFrameData.leftViewMatrix, 
            this._scratchMatrix4
        );
        const leftEye = this.getSubviewEntity(0);
        const leftEyePosition = Matrix4.getTranslation(leftEyeTransform, this._scratchCartesian);
        const leftEyeRotation = Matrix4.getRotation(leftEyeTransform, this._scratchMatrix3);
        const leftEyeOrientation = Quaternion.fromRotationMatrix(leftEyeRotation, this._scratchQuaternion);
        (leftEye.position as DynamicPositionProperty).setValue(leftEyePosition, origin);
        (leftEye.orientation as DynamicProperty).setValue(leftEyeOrientation);
        
        const rightEyeTransform = Matrix4.inverseTransformation(
            <any>vrFrameData.rightViewMatrix, 
            this._scratchMatrix4
        );
        const rightEye = this.getSubviewEntity(1);
        const rightEyePosition = Matrix4.getTranslation(rightEyeTransform, this._scratchCartesian);
        const rightEyeRotation = Matrix4.getRotation(rightEyeTransform, this._scratchMatrix3);
        const rightEyeOrientation = Quaternion.fromRotationMatrix(rightEyeRotation, this._scratchQuaternion);
        (rightEye.position as DynamicPositionProperty).setValue(rightEyePosition, origin);
        (rightEye.orientation as DynamicProperty).setValue(rightEyeOrientation);

        // the polyfill does not support reporting an absolute orientation (yet), 
        // so fall back to the default origin/stage/user pose in this case
        if (vrDisplay.displayName.match(/polyfill/g)) {
            this._updateDefaultOrigin();
            this._updateDefaultStage();
            this._updateDefaultUser();
            return;
        }
        
        // let origin be equivalent to "sitting space", and assume origin is positioned at device geolocation
        (this.origin.position as DynamicPositionProperty).setValue(Cartesian3.ZERO, this.deviceGeolocation);
        (this.origin.orientation as DynamicProperty).setValue(Quaternion.IDENTITY);
        
        // let stage be equivalent to "standing space"
        const sittingToStandingTransform = vrDisplay.stageParameters ? 
            <Matrix4><any> vrDisplay.stageParameters.sittingToStandingTransform :
            Matrix4.IDENTITY;
        const sittingToStandingPosition = Matrix4.multiplyByPoint(sittingToStandingTransform, Cartesian3.ZERO, this._scratchCartesian);
        const sittingToStandingRotation = Matrix4.getRotation(sittingToStandingTransform, this._scratchMatrix3);
        const sittingToStandingOrientation = Quaternion.fromRotationMatrix(sittingToStandingRotation, this._scratchQuaternion);
        (this.stage.position as DynamicPositionProperty).setValue(sittingToStandingPosition, this.origin);
        (this.stage.orientation as DynamicProperty).setValue(sittingToStandingOrientation);

        // user pose is given in "sitting space"
        const userPosition : Cartesian3|undefined = vrFrameData.pose.position ? 
            Cartesian3.unpack(<any>vrFrameData.pose.position, 0, this._scratchCartesian) : undefined;
        const userOrientation : Quaternion|undefined = vrFrameData.pose.orientation ? 
            Quaternion.unpack(<any>vrFrameData.pose.orientation, 0, this._scratchQuaternion2) : undefined;
        (user.position as DynamicPositionProperty).setValue(userPosition, origin);
        (user.orientation as DynamicProperty).setValue(userOrientation);
    }

    private _deviceOrientationListener;
    private _deviceOrientationHeadingAccuracy:number|undefined;

    private _negX90 = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, -CesiumMath.PI_OVER_TWO);

    private _tryOrientationUpdates() : void {
        if (typeof window == 'undefined' || !window.addEventListener) 
            return;

        if (defined(this._deviceOrientationListener)) return;

        let headingDrift = 0;
        let alphaOffset:number|undefined = undefined;

        this._deviceOrientationListener = (e: DeviceOrientationEvent) => {

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

            this._deviceOrientationHeadingAccuracy = webkitCompassAccuracy > 0 ? webkitCompassAccuracy : undefined;

            if ((!defined(alphaOffset) || Math.abs(headingDrift) > 5) &&
                defined(webkitCompassHeading) &&
                webkitCompassAccuracy >= 0 &&
                webkitCompassAccuracy < 80 &&
                webkitCompassHeading >= 0) {
                if (!defined(alphaOffset)) {
                    alphaOffset = -webkitCompassHeading;
                } else {
                    alphaOffset -= headingDrift;
                }
            }

            if (!defined(alphaOffset) || 
                !defined(e.alpha) || 
                !defined(e.beta) || 
                !defined(e.gamma)) 
                return;

            const alpha = CesiumMath.RADIANS_PER_DEGREE * (e.alpha + alphaOffset || -webkitCompassHeading || 0);
            const beta = CesiumMath.RADIANS_PER_DEGREE * e.beta;
            const gamma = CesiumMath.RADIANS_PER_DEGREE * e.gamma;

            const alphaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, alpha, this._scratchQuaternion);
            const betaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, beta, this._scratchQuaternion2);
            const alphaBetaQuat = Quaternion.multiply(alphaQuat, betaQuat, this._scratchQuaternion);
            const gammaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Y, gamma, this._scratchQuaternion2);
            const alphaBetaGammaQuat = Quaternion.multiply(alphaBetaQuat, gammaQuat, this._scratchQuaternion);

            // finally, convert from ENU to EUS
            const deviceOrientationValue = Quaternion.multiply(this._negX90, alphaBetaGammaQuat, this._scratchQuaternion2); // rotate from ENU to EUS
            (this.deviceOrientation.orientation as DynamicProperty).setValue(deviceOrientationValue);
            this.deviceOrientation['meta'] = this.deviceOrientation['meta'] || {};
            this.deviceOrientation['meta'].geoHeadingAccuracy = webkitCompassAccuracy || undefined;

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
            window.addEventListener('deviceorientationabsolute', this._deviceOrientationListener)
        } else if ('ondeviceorientation' in window) {
            window.addEventListener('deviceorientation', this._deviceOrientationListener)
        }
    }

    private _hasPolyfillWebVRDisplay() : boolean {
        return !!this.vrDisplay && !!this.vrDisplay.displayName.match(/polyfill/g);
    }

    public get screenOrientationDegrees() : number {
        return typeof window !== 'undefined' ? (screen['orientation'] && -screen['orientation'].angle) || -window.orientation || 0 : 0;
    }
    
    /**
     * Request an animation frame callback
     */
    public requestAnimationFrame: ((callback:(timestamp:number)=>void) => number) = callback => {
        if (this.vrDisplay && this.vrDisplay.isPresenting) {
            return this.vrDisplay.requestAnimationFrame(callback);
        } else {
            return requestAnimationFrame(callback);
        }
    }

    /**
     * Cancel an animation frame callback
     */
    public cancelAnimationFrame: ((id:number) => void) = id => {
        if (this.vrDisplay) {
            this.vrDisplay.cancelAnimationFrame(id);
        } else {
            cancelAnimationFrame(id);
        }
    }

    public requestHeadDisplayMode() {
        const vrDisplay = this.vrDisplay
        const element = this.viewItems.element;
        const viewLayers = this.viewItems.layers;
        if (!element) return Promise.reject(new Error("A DOM element is required"));
        if (!vrDisplay || !vrDisplay.capabilities.canPresent) return Promise.reject(new Error("Display mode 'head' is not supported"));

        const layers:VRLayer&{}[] = 
            [{
                source:
                    viewLayers && viewLayers[0] && viewLayers[0].source || 
                    element.querySelector('canvas') || 
                    <HTMLCanvasElement>element.lastElementChild
            }];

        return vrDisplay.requestPresent(layers);
    }

    public exitHeadDisplayMode() {
        return this.vrDisplay && this.vrDisplay.isPresenting 
            ? this.vrDisplay.exitPresent() : Promise.reject(new Error("Display is not currently in 'head' mode"));
    }

    public _setState(state:DeviceStableState) {
        this._overrideState = state;

        if (this.userTracking !== state.userTracking)

        if (!jsonEquals(this.suggestedGeolocationSubscription, state.suggestedGeolocationSubscription)) {
            this.suggestedGeolocationSubscription = state.suggestedGeolocationSubscription;
            this.suggestedGeolocationSubscriptionChangeEvent.raiseEvent(undefined);
        }
    }

    private _contextFrameState:ContextFrameState;
    public _setFrameState(state:ContextFrameState) {
        this._contextFrameState = state;
    }

    private _scratchGeolocationCartesian = new Cartesian3;
    private _scratchGeolocationMatrix4 = new Matrix4;
    private _srcatchGeolocationMatrix3 = new Matrix3;
    private _scratchGeolocationQuaternion = new Quaternion;
    private _eastUpSouthToFixedFrame = eastUpSouthToFixedFrame;

    protected onGeolocationUpdate(
            cartographic:Cartographic,
            geoHorizontalAccuracy?:number,
            geoVerticalAccuracy?:number) {

        if (!defined(geoVerticalAccuracy) && cartographic.height === 0) {
            updateHeightFromTerrain(cartographic).then(() => this.onGeolocationUpdate(cartographic, geoHorizontalAccuracy, 0));
            return;
        }

        const geolocation = this.deviceGeolocation;
        
        const fixedPosition = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height, undefined, this._scratchGeolocationCartesian);
        const eusTransform = this._eastUpSouthToFixedFrame(fixedPosition, undefined, this._scratchGeolocationMatrix4);
        const eusRotation = Matrix4.getRotation(eusTransform, this._srcatchGeolocationMatrix3);
        const eusOrientation = Quaternion.fromRotationMatrix(eusRotation, this._scratchGeolocationQuaternion);

        (geolocation.position as DynamicPositionProperty).setValue(
            fixedPosition,
            ReferenceFrame.FIXED
        );

        (geolocation.orientation as DynamicProperty).setValue(
            eusOrientation
        );

        const gpsMeta = geolocation['meta'] = geolocation['meta'] || {}; 
        gpsMeta.geoHorizontalAccuracy = geoHorizontalAccuracy;
        gpsMeta.geoVerticalAccuracy = geoVerticalAccuracy;
    }

    private _geolocationWatchId?:number;
    private _scratchCartographic = new Cartographic;

    /**
     * Overridable. Should call configureStage when new geolocation is available 
     */
    public startGeolocationUpdates(options:GeolocationOptions) : void {
        if (typeof navigator == 'undefined' || !navigator.geolocation)
            throw new Error('Unable to start geolocation updates');
        if (!defined(this._geolocationWatchId)) {
            this._geolocationWatchId = navigator.geolocation.watchPosition((pos) => {

                const longDegrees = pos.coords.longitude;
                const latDegrees = pos.coords.latitude;
                const altitude = pos.coords.altitude;
                const cartographic = Cartographic.fromDegrees(longDegrees, latDegrees, altitude||0, this._scratchCartographic);

                this.onGeolocationUpdate(
                    cartographic,
                    (pos.coords.accuracy > 0) ? pos.coords.accuracy : undefined,
                    pos.coords.altitudeAccuracy || undefined
                );
            }, (e)=>{
                console.warn('Unable to start geolocation updates: ' + e.message);
            }, options);
        }
    }

    /**
     * Overridable.
     */
    public stopGeolocationUpdates() : void {
        if (typeof navigator !== 'undefined' && defined(this._geolocationWatchId)) {
            navigator.geolocation.clearWatch(this._geolocationWatchId);
            this._geolocationWatchId = undefined;
        }
    }
}

/**
 * The DeviceService provides the current device state
 */
@singleton(true) // register in child container
export class DeviceService {

    /**
     * If this is true (and we are presenting via webvr api), then
     * vrDisplay.submitFrame is called after the frameState event
     */
    public autoSubmitFrame = true;

    /**
     * Device state for the current frame. This
     * is not updated unless the view is visible.
     */
    public frameState = this._device.frameState;

    /**
     * An event that fires every time the device frameState is updated. 
     */
    public frameStateEvent = new Event<DeviceFrameState>();

    /**
     * An even that fires when the view starts or stops presenting to an HMD.
     * Deprecated. Use displayModeChangeEvent
     */
    public presentHMDChangeEvent = this._device.displayModeChangeEvent;


    /**
     * An event that fires when the display changes
     */
    public vrDisplayChangeEvent = this._device.vrDisplayChangeEvent;
    public get vrDisplay() { return this._device.vrDisplay };
    public get vrDisplays() { return this._device.vrDisplays };

    /**
     * An even that fires when the display mode changes
     */
    public displayModeChangeEvent = this._device.displayModeChangeEvent;
    public get displayMode() { return this._device.displayMode };

    /*
     * An event that fires when the screen orientation changes
     */
    public screenOrientationChangeEvent = this._device.screenOrientationChangeEvent;
    public get screenOrientationDegrees() : number {
        return this._device.screenOrientationDegrees;
    }

    /*
     * An event that fires when userTracking state changes
     */
    public userTrackingChangeEvent = this._device.userTrackingChangeEvent;

    /**
     * Returns the DOF support of the device.
     * "none"|"3DOF"|"6DOF"
     */
    public get userTracking() {
        return this._device.userTracking;
    }

    /*
     * An event that fires when getVRDisplay() is finished
     */
    public vrDisplaysUpdatedEvent = this._device.vrDisplaysUpdatedEvent;

    /**
     * A coordinate system representing the physical space in which the user is free to 
     * move around, positioned on the surface the user is standing on,
     * where +X is east, +Y is up, and +Z is south (East-Up-South), if geolocation is known.
     * If the stage is not geolocated, then the +X and +Z directions are arbitrary. 
     */
    public stage: Entity = this._device.stage;
    
    /**
     * An entity representing the origin of the device coordinate system, +Y up.
     */
    public origin: Entity = this._device.origin;
    
    /**
     * An entity representing the physical pose of the user, 
     * where +X is right, +Y is up, and -Z is forward
     */
    public user: Entity = this._device.user;
    
    /**
     * The heading accuracy of the user's geopose
     */
    public get geoHeadingAccuracy() : number|undefined {
        return this.stage['meta'] ? this.stage['meta'].geoHeadingAccuracy : undefined;
    }
    
    /**
     * The horizontal accuracy of the user's geopose
     */
    public get geoHorizontalAccuracy() : number|undefined {
        return this.stage['meta'] ? this.stage['meta'].geoHorizontalAccuracy : undefined;
    }
    
    /**
     * The horizontal accuracy of the user's geopose
     */
    public get geoVerticalAccuracy() : number|undefined {
        return this.stage['meta'] ? this.stage['meta'].geoVerticalAccuracy : undefined;
    }
    
    /*
    * An event that fires when the screen orientation changes
    */
    public suggestedGeolocationSubscriptionChangeEvent = this._device.suggestedGeolocationSubscriptionChangeEvent;
    public get suggestedGeolocationSubscription() {
        return this._device.suggestedGeolocationSubscription;
    }

    public get suggestedUserHeight() {
        return this._device.suggestedUserHeight;
    }

    public get strict() : boolean {
        return this._device.strict;
    }

    constructor(
        protected sessionService:SessionService,
        protected entityService:EntityService,
        protected viewService:ViewService,
        protected visibilityService:VisibilityService,
        private _device:Device,
    ) {
        this.entityService.collection.add(this.stage);
        this.entityService.collection.add(this.origin);
        this.entityService.collection.add(this.user);

        this._startUpdates();
        this.sessionService.manager.closeEvent.addEventListener(()=> this._stopUpdates());

        if (!this.sessionService.isRealityManager) {
            sessionService.manager.on['ar.device.state'] = sessionService.manager.on['ar.device.frameState'] = (stableState:DeviceStableState) => {
                // only apply device state if we the owning session
                if (this._device.owner === this.sessionService) {
                    this._device._setState(stableState);
                }
            };
        }
    }

    /**
     * Request an animation frame callback for the current view. 
     */
    public requestAnimationFrame = this._device.requestAnimationFrame.bind(this._device);

    /**
     * Cancel an animation frame callback for the current view. 
     */
    public cancelAnimationFrame = this._device.cancelAnimationFrame.bind(this._device);

    /**
     * Start emmitting frameState events
     */
    private _startUpdates() : void {
        this.sessionService.manager.whenConnected().then(()=>{
            if (this.sessionService.manager.version[0] > 0) {
                this.sessionService.manager.send('ar.device.startUpdates');
            }
        });
        this._device.frameStateEvent.addEventListener(this._onDeviceFrameEvent);
    }

    /**
     * Stop emitting frameState events
     */
    private _stopUpdates() : void {
        this.sessionService.manager.whenConnected().then(()=>{
            if (this.sessionService.manager.version[0] > 0) {
                this.sessionService.manager.send('ar.device.stopUpdates');
            }
        });
        this._device.frameStateEvent.removeEventListener(this._onDeviceFrameEvent);
    }

    private _onDeviceFrameEvent = () => {
        this.frameStateEvent.raiseEvent(this._device.frameState);
    }

    protected onRequestPresentHMD() : Promise<void> {
        return this._device.requestHeadDisplayMode();
    }
    
    protected onExitPresentHMD() : Promise<void> {
        return this._device.exitHeadDisplayMode();
    }

    @deprecated()
    public createContextFrameState(
        time:JulianDate,
        viewport:CanvasViewport,
        subviewList:SerializedSubviewList,
        options?: {overrideStage?:boolean, overrideUser?:boolean, overrideView?:boolean, floorOffset?:number, userTracking?:'none'|'3DOF'|'6DOF'}
    ) : any {
        return ArgonSystem.instance!.context.createFrameState(time, viewport, subviewList, options);
    }

    getSubviewEntity = this._device.getSubviewEntity.bind(this._device);

    subscribeGeolocation(options?:GeolocationOptions, session=this.sessionService.manager) : Promise<void> {
        return this.sessionService.manager.whenConnected().then(()=>{
            if (this.sessionService.manager.versionNumber >= 1.4)
                return this.entityService.subscribe(this.origin.id, options).then(()=>{});
            else 
                return this.entityService.subscribe(this.stage.id, options).then(()=>{});
        });
    }

    unsubscribeGeolocation(session=this.sessionService.manager) : void {
        this.sessionService.manager.whenConnected().then(()=>{
            if (this.sessionService.manager.versionNumber >= 1.4)
                this.entityService.unsubscribe(this.origin.id);
            else 
                this.entityService.unsubscribe(this.stage.id);
        });
    }

    /**
     * Is the view presenting to an HMD. 
     * Same as `displayMode === 'head'`.
     */
    get isPresentingHMD() : boolean {
        return this._device.displayMode === 'head';
    }

    /**
     * Is the current reality presenting to an HMD.  
     * Same as `displayMode === 'head' && `hasSeparateRealityLayer === true`.
     */
    get isPresentingRealityHMD() : boolean {
        return this._device.displayMode === 'head' && this._device.hasSeparateRealityLayer;
    }

    get hasSeparateRealityLayer() : boolean {
        return this._device.hasSeparateRealityLayer;
    }

    requestPresentHMD() : Promise<void> {
        if (!this.sessionService.manager.isConnected) 
            throw new Error('Session must be connected');
        if (this.sessionService.isRealityManager) {
            return this.onRequestPresentHMD();
        }
        return this.sessionService.manager.request('ar.device.requestPresentHMD');
    }

    exitPresentHMD() : Promise<void> {
        if (!this.sessionService.manager.isConnected) 
            throw new Error('Session must be connected');
        if (this.sessionService.isRealityManager) {
            return this.onExitPresentHMD();
        }
        return this.sessionService.manager.request('ar.device.exitPresentHMD');
    }
}

/**
 * 
 */
@autoinject()
export class DeviceServiceProvider {

    private _subscribers:{[id:string]:SessionPort} = {};
    
    constructor(
        protected sessionService:SessionService,
        protected deviceService:DeviceService,
        protected viewService:ViewService,
        protected entityService:EntityService,
        protected entityServiceProvider:EntityServiceProvider,
        protected device:Device,
    ) {
        this.sessionService.connectEvent.addEventListener((session)=>{
            // backwards compat pre-v1.1.8
            session.on['ar.device.requestFrameState'] = () => {
                this._subscribers[session.id] = session;
                return new Promise((resolve) => {
                    const remove = this.deviceService.frameStateEvent.addEventListener((frameState)=>{
                        resolve(frameState)
                        remove();
                    });
                });
            }

            session.on['ar.device.startUpdates'] = () => {
                this._subscribers[session.id] = session;
            }

            session.on['ar.device.stopUpdates'] = () => {
                delete this._subscribers[session.id];
            }

            // to be removed (subscription options are handled by EntityService now)
            session.on['ar.device.setGeolocationOptions'] = ({options}) => {
                this._sessionGeolocationOptions.set(session, options);
                this._checkDeviceGeolocationSubscribers();
            }

            session.on['ar.device.requestPresentHMD'] = () => {
                return this.handleRequestPresentHMD(session);
            }

            session.on['ar.device.exitPresentHMD'] = () => {
                return this.handleExitPresentHMD(session);
            }

            session.closeEvent.addEventListener(()=>{
                if (this._sessionGeolocationOptions.has(session)) {
                    this._sessionGeolocationOptions.delete(session);
                    this._checkDeviceGeolocationSubscribers();
                }
            });

            this.needsPublish = true;
        });

        this.entityServiceProvider.sessionSubscribedEvent.addEventListener(({id, options, session})=>{
            if (this.deviceService.origin.id === id) {
                this._sessionGeolocationOptions.set(session, options);
                this._checkDeviceGeolocationSubscribers();
            }
        });

        this.entityServiceProvider.sessionUnsubscribedEvent.addEventListener(({id})=>{
            if (this.deviceService.origin.id === id)
                this._checkDeviceGeolocationSubscribers();
        })

        const setNeedsPublish = () => this.needsPublish = true;

        this.deviceService.suggestedGeolocationSubscriptionChangeEvent.addEventListener(setNeedsPublish);
        this.deviceService.screenOrientationChangeEvent.addEventListener(setNeedsPublish);
        this.deviceService.userTrackingChangeEvent.addEventListener(setNeedsPublish);
        this.deviceService.displayModeChangeEvent.addEventListener(setNeedsPublish);

        this.viewService.viewportChangeEvent.addEventListener(setNeedsPublish);
        this.viewService.viewportModeChangeEvent.addEventListener(setNeedsPublish);

        let previousViewportMode:ViewportMode = this.viewService.viewportMode;

        this.deviceService.displayModeChangeEvent.addEventListener(()=>{
            // if device mode changes to 'head', enter immersive viewport mode
            if (this.deviceService.displayMode === 'head') {
                const vrDisplay = this.deviceService.vrDisplay;
                if (vrDisplay && vrDisplay.displayName.match(/polyfill/g)) {
                    const layers = viewService.layers;
                    const baseLayer = layers && layers[0];
                    const canvas = baseLayer && baseLayer.source;
                    if (canvas) canvas.classList.add('argon-interactive');
                    previousViewportMode = viewService.viewportMode;
                    viewService.desiredViewportMode = ViewportMode.IMMERSIVE;
                }
            } else {
                const layers = viewService.layers;
                const baseLayer = layers && layers[0];
                const canvas = baseLayer && baseLayer.source;
                if (canvas) canvas.classList.remove('argon-interactive');
                viewService.desiredViewportMode = previousViewportMode;
            }
        });

        this.deviceService.frameStateEvent.addEventListener((state)=>{
            if (this.needsPublish ||
                this._stableState.isPresentingHMD !== this.deviceService.isPresentingHMD ||
                this._stableState.isPresentingRealityHMD !== this.deviceService.isPresentingRealityHMD ||
                CanvasViewport.equals(this._stableState.viewport, state.viewport) === false) {
                    this.needsPublish = true;
            } else if (this._stableState.subviews) {
                if (this._stableState.subviews.length === state.subviews.length) {
                    for (let i=0; i < state.subviews.length; i++) {
                        if (!SerializedSubview.equals(state.subviews[i], this._stableState.subviews[i])) {
                            this.needsPublish = true;
                            break;
                        }
                    }
                } else {
                    this.needsPublish = true;
                }
            }

            if (this.needsPublish) this.publishStableState();
        });

        this.viewService.viewportModeChangeEvent.addEventListener((mode)=>{
            if (mode === ViewportMode.PAGE && this.deviceService.vrDisplay && this.deviceService.vrDisplay.displayName.match(/polyfill/g) && this.deviceService.displayMode === 'head') 
                this.deviceService.exitPresentHMD();
        });
    }

    protected handleRequestPresentHMD(session:SessionPort) : Promise<void> {
        return this.deviceService.requestPresentHMD();
    }

    protected handleExitPresentHMD(session:SessionPort) : Promise<void> {
        return this.deviceService.exitPresentHMD();
    }

    public needsPublish = false;
    private _stableState = new DeviceStableState;

    public publishStableState() {
        const stableState = this._stableState;
        
        stableState.isPresentingHMD = this.deviceService.isPresentingHMD;
        stableState.isPresentingRealityHMD = this.deviceService.isPresentingRealityHMD;
        stableState.suggestedGeolocationSubscription = this.deviceService.suggestedGeolocationSubscription;
        stableState.suggestedUserHeight = this.deviceService.suggestedUserHeight;
        stableState.strict = this.deviceService.strict;
        stableState.viewport = CanvasViewport.clone(this.deviceService.frameState.viewport, stableState.viewport)
        stableState.subviews = SerializedSubviewList.clone(this.deviceService.frameState.subviews, stableState.subviews);
        stableState.displayMode = this.deviceService.displayMode;
        stableState.userTracking = this.deviceService.userTracking;
        
        this.onUpdateStableState(this._stableState);

        // send stable state to each subscribed session
        for (const id in this._subscribers) {
            const session = this._subscribers[id];
            if (session.version[0] > 0 && session !== this.sessionService.manager) {
                session.send('ar.device.state', stableState);
            }
        }

        this.needsPublish = false;
    }

    protected onUpdateStableState(stableState:DeviceStableState) {}

    private _currentGeolocationOptions?:GeolocationOptions;
    private _targetGeolocationOptions:GeolocationOptions = {};
    private _sessionGeolocationOptions = new Map<SessionPort, GeolocationOptions|undefined>();

    private _checkDeviceGeolocationSubscribers() {
        const subscribers = this.entityServiceProvider.subscribersByEntity.get(this.deviceService.origin.id);
        if (subscribers && subscribers.size > 0) {

            const reducedOptions:GeolocationOptions = {};
            this._sessionGeolocationOptions.forEach((options, session)=>{
                reducedOptions.enableHighAccuracy = 
                    reducedOptions.enableHighAccuracy || (options && options.enableHighAccuracy) || false;
            });
            if (this._targetGeolocationOptions.enableHighAccuracy !== reducedOptions.enableHighAccuracy) {
                this._targetGeolocationOptions = reducedOptions;
            }

            if (JSON.stringify(this._targetGeolocationOptions) !== JSON.stringify(this._currentGeolocationOptions)) {
                this._currentGeolocationOptions = this._targetGeolocationOptions;
                this.device.stopGeolocationUpdates();
                this.device.startGeolocationUpdates(this._targetGeolocationOptions);
            }
        } else {
            this.device.stopGeolocationUpdates();
            this._currentGeolocationOptions = undefined;
        }
        this.needsPublish = true;
    }

}

declare class VRFrameData {
    timestamp:number;

    leftProjectionMatrix:Float32Array;
    leftViewMatrix:Float32Array;

    rightProjectionMatrix:Float32Array;
    rightViewMatrix:Float32Array;

    pose:VRPose;
}
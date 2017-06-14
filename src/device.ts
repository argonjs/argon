import {
    Entity, 
    ConstantPositionProperty,
    ConstantProperty,
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

import {autoinject} from 'aurelia-dependency-injection';
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
    SerializedEntityStateMap,
    SubviewType,
    GeolocationOptions,
    SerializedSubview
} from './common'

import {
    deprecated,
    eastUpSouthToFixedFrame,
    getReachableAncestorReferenceFrames,
    requestAnimationFrame,
    cancelAnimationFrame,
    updateHeightFromTerrain,
    stringIdentifierFromReferenceFrame,
    jsonEquals,
    Event
} from './utils'

import {
    ViewService,
    ViewportMode
} from './view'

import { VisibilityService } from './visibility'

export class DeviceStableState {
    viewport?:CanvasViewport;
    subviews?:SerializedSubviewList;
    entities:SerializedEntityStateMap = {};
    suggestedGeolocationSubscription?:{enableHighAccuracy?:boolean} = undefined;
    suggestedUserHeight = AVERAGE_EYE_HEIGHT;
    geolocationDesired = false;
    geolocationOptions?:GeolocationOptions = {};
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
};

/**
 * The DeviceService provides the current device state
 */
@autoinject()
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
    public frameState = new DeviceFrameState;

    /**
     * An event that fires every time the device frameState is updated. 
     */
    public frameStateEvent = new Event<DeviceFrameState>();

    /**
     * An even that fires when the view starts or stops presenting to an HMD
     */
    public presentHMDChangeEvent = new Event<void>();

    /*
     * An event that fires when the screen orientation changes
     */
    public screenOrientationChangeEvent = new Event<void>();

    /*
     * An event that fires when the screen orientation changes
     */
    public suggestedGeolocationSubscriptionChangeEvent = new Event<void>();

    /**
     * A coordinate system representing the physical space in which the user is free to 
     * move around, positioned on the surface the user is standing on,
     * where +X is east, +Y is up, and +Z is south (East-Up-South), if geolocation is known.
     * If the stage is not geolocated, then the +X and +Z directions are arbitrary. 
     */
    public stage: Entity = this.entityService.collection.add(new Entity({
        id: 'ar.device.stage',
        name: 'Device Stage',
        position: undefined,
        orientation: undefined
    }));
    
    /**
     * An entity representing the origin of the device coordinate system, +Y up.
     */
    public origin: Entity = this.entityService.collection.add(new Entity({
        id: 'ar.device.origin',
        name: 'Device Origin',
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.stage),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    }));
    
    /**
     * An entity representing the physical pose of the user, 
     * where +X is right, +Y is up, and -Z is forward
     */
    public user: Entity = this.entityService.collection.add(new Entity({
        id: 'ar.device.user',
        name: 'Device User',
        position: undefined,
        orientation: undefined
    }));    
    
    public get geoHeadingAccuracy() : number|undefined {
        return this.user['meta'] ? this.user['meta'].geoHeadingAccuracy : undefined;
    }

    public get geoHorizontalAccuracy() : number|undefined {
        return this.stage['meta'] ? this.stage['meta'].geoHorizonatalAccuracy : undefined;
    }
    
    public get geoVerticalAccuracy() : number|undefined {
        return this.stage['meta'] ? this.stage['meta'].geoVerticalAccuracy : undefined;
    }

    public _geolocationDesired = false;
    @deprecated()
    public get geolocationDesired() {
        return this._parentState ? 
            this._parentState.suggestedGeolocationSubscription || this._parentState.geolocationDesired : 
            this._geolocationDesired;
    }

    public _geolocationOptions:GeolocationOptions|undefined; 
    @deprecated()
    public get geolocationOptions() {
        return this._parentState ? 
            this._parentState.suggestedGeolocationSubscription || this._parentState.geolocationOptions : 
            this._geolocationOptions;
    }

    private _suggestedGeolocationSubscription:{enableHighAccuracy?:boolean}|undefined;
    private _setSuggestedGeolocationSubscription(options?:{enableHighAccuracy?:boolean}) {
        if (!jsonEquals(this._suggestedGeolocationSubscription, options)) {
            this._suggestedGeolocationSubscription = options;
            this.suggestedGeolocationSubscriptionChangeEvent.raiseEvent(undefined);
        }
    }

    public get suggestedGeolocationSubscription() {
        return this._suggestedGeolocationSubscription;
    }

    public defaultUserHeight = AVERAGE_EYE_HEIGHT;

    public get suggestedUserHeight() {
        return this._parentState && this._parentState.suggestedUserHeight || 
            this.isPresentingHMD ? this.defaultUserHeight : this.defaultUserHeight/2;
    }

    public get strict() : boolean {
        return !!(this._parentState && this._parentState.strict) ||
            this.isPresentingHMD && !this._hasPolyfillWebVRDisplay() || false;
    }

    protected _scratchCartesian = new Cartesian3;
    protected _scratchFrustum = new PerspectiveFrustum();

    private _vrDisplays:VRDisplay[]|undefined;
    private _vrDisplay:VRDisplay|undefined;

    public get vrDisplay() : any {
        return this._vrDisplay;
    }

    constructor(
        protected sessionService:SessionService,
        protected entityService:EntityService,
        protected viewService:ViewService,
        protected visibilityService:VisibilityService
    ) {
        this.visibilityService.showEvent.addEventListener(() => this._startUpdates());
        this.visibilityService.hideEvent.addEventListener(() => this._stopUpdates());

        if (typeof navigator !== 'undefined' && 
            navigator.getVRDisplays && 
            navigator.userAgent.indexOf('Argon') > 0 === false) { // for now, only use webvr when not in argon-app
            
            this._setupVRPresentChangeHandler();
            navigator.getVRDisplays().then(displays => {
                this._vrDisplays = displays;
                this._vrDisplay = displays[0];
            });

        }

        if (typeof window !== 'undefined' && window.addEventListener) {
            const orientationChangeListener = ()=>{
                this.screenOrientationChangeEvent.raiseEvent(undefined);
            }
            window.addEventListener('orientationchange', orientationChangeListener);
            sessionService.manager.closeEvent.addEventListener(()=>{
                window.removeEventListener('orientationchange', orientationChangeListener);
            });
        }

        if (this.sessionService.isRealityManager) {
            this.entityService.subscribedEvent.addEventListener((evt)=>{
                if (evt.id === 'ar.stage')
                    this._setSuggestedGeolocationSubscription(evt.options || {});
            });
            this.entityService.unsubscribedEvent.addEventListener((evt)=>{
                if (evt.id === 'ar.stage')
                    this._setSuggestedGeolocationSubscription(undefined);
            })
        } else {
            sessionService.manager.on['ar.device.state'] = sessionService.manager.on['ar.device.frameState'] = (stableState:DeviceStableState) => {
                const entities = stableState.entities;
                const entityService = this.entityService;

                if (entities) for (const id in entities) {
                    entityService.updateEntityFromSerializedState(id, entities[id]);
                }

                this._setSuggestedGeolocationSubscription(stableState.geolocationOptions || stableState.suggestedGeolocationSubscription);;

                if (this._parentState && this._parentState.isPresentingHMD !== stableState.isPresentingHMD ||
                    this._parentState && this._parentState.isPresentingRealityHMD !== stableState.isPresentingRealityHMD) {
                    this.presentHMDChangeEvent.raiseEvent(undefined);
                }

                this._parentState = stableState;
            };
        }
    }

    protected _parentState : DeviceStableState|undefined;

    private _updatingFrameState = false;

    private _updateFrameState = () => {
        if (!this._updatingFrameState) return;

        this.requestAnimationFrame(this._updateFrameState);

        const state = this.frameState;
        JulianDate.now(state.time);
        state['strict'] = this.strict; // backwards-compat

        this.onUpdateFrameState();

        try {
            this.frameStateEvent.raiseEvent(state);
        } catch(e) {
            this.sessionService.manager.sendError(e);
            this.sessionService.errorEvent.raiseEvent(e);
        }
    }

    public get screenOrientationDegrees() {
        return typeof window !== 'undefined' ? (screen['orientation'] && -screen['orientation'].angle) || -window.orientation || 0 : 0;
    }

    protected getScreenOrientationDegrees() {
        return this.getScreenOrientationDegrees;
    }

    /**
     * Request an animation frame callback for the current view. 
     */
    public requestAnimationFrame:(callback:(timestamp:number)=>void)=>number = callback => {
        if (this._vrDisplay && this.isPresentingHMD) {
            return this._vrDisplay.requestAnimationFrame(callback);
        } else {
            return requestAnimationFrame(callback);
        }
    }

    /**
     * Cancel an animation frame callback for the current view. 
     */
    public cancelAnimationFrame:(id:number)=>void = id => {
        if (this._vrDisplay && this.isPresentingHMD) {
            this._vrDisplay.cancelAnimationFrame(id);
        } else {
            cancelAnimationFrame(id);
        }
    }

    /**
     * Start emmitting frameState events
     */
    private _startUpdates() : void {
        if (!this._updatingFrameState) this.requestAnimationFrame(this._updateFrameState);
        this._updatingFrameState = true;
        this.sessionService.manager.whenConnected().then(()=>{
            if (this.sessionService.manager.version[0] > 0) {
                this.sessionService.manager.send('ar.device.startUpdates');
            }
        });
    }

    /**
     * Stop emitting frameState events
     */
    private _stopUpdates() : void {
        this._updatingFrameState = false;
        this.sessionService.manager.whenConnected().then(()=>{
            if (this.sessionService.manager.version[0] > 0) {
                this.sessionService.manager.send('ar.device.stopUpdates');
            }
        });
    }

    protected onUpdateFrameState() {
        this._updateViewport();

        if (this._vrDisplay && this._vrDisplay.isPresenting) {
            this._updateForWebVR();
        } else {
            this._updateDefault();
        }
    }

    private _updateViewport() {
        const parentState = this._parentState;
        const state = this.frameState;
        const viewport = state.viewport;
        
        if (parentState && parentState.viewport) { 

            CanvasViewport.clone(parentState.viewport, viewport);

        } else {

            const element = this.viewService.element;
            viewport.x = 0;
            viewport.y = 0;
            viewport.width = element && element.clientWidth || 0;
            viewport.height = element && element.clientHeight || 0;

            const vrDisplay = this._vrDisplay;

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
        this._updateDefaultOrigin();
        this._updateDefaultUser();

        const parentState = this._parentState;
        const frameState = this.frameState;
        
        const viewport = frameState.viewport;
        if (parentState && parentState.viewport) {
            CanvasViewport.clone(parentState.viewport, viewport);
        }

        const subviews = frameState.subviews;
        if (parentState && parentState.subviews) {
            SerializedSubviewList.clone(parentState.subviews, subviews);
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
            (subviewEntity.position as ConstantPositionProperty).setValue(Cartesian3.ZERO, this.user);
            (subviewEntity.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);
        }
    }

    private _stringIdentifierFromReferenceFrame = stringIdentifierFromReferenceFrame;
    private _getReachableAncestorReferenceFrames = getReachableAncestorReferenceFrames;
    private _scratchArray = [];

    private _originPose = this.entityService.createEntityPose(this.origin, this.stage);

    private _updateDefaultOrigin() {
        const origin = this.origin;
        const stage = this.stage;
            
        const originPose = this._originPose;
        const time = this.frameState.time;
        originPose.update(time);

        if ((originPose.status & PoseStatus.KNOWN) === 0 ||
            Cartesian3.magnitudeSquared(originPose.position) > 10000) {
            
            const stageFrame = this._getReachableAncestorReferenceFrames(stage, time, this._scratchArray)[0];
            
            if (defined(stageFrame)) {
                
                const stagePositionValue = stage.position!.getValueInReferenceFrame(time, stageFrame, this._scratchCartesian);
                const stageOrientationValue = stage.orientation!.getValue(time, this._scratchQuaternion);
                
                if (stagePositionValue && stageOrientationValue) {

                    (origin.position as ConstantPositionProperty).setValue(stagePositionValue, stageFrame);
                    (origin.orientation as ConstantProperty).setValue(stageOrientationValue);
                    console.log('Updated device origin to ' + JSON.stringify(stagePositionValue) + " at " + this._stringIdentifierFromReferenceFrame(stageFrame));

                    return;

                }

            }

        } else {

            return;
            
        }

        (origin.position as ConstantPositionProperty).setValue(Cartesian3.ZERO, stage);
        (origin.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);
    }

    private _updateDefaultUser() {
        
        const deviceUser = this.user;
        const deviceStage = this.stage;
        const deviceOrientation = this._deviceOrientation;

        this._tryOrientationUpdates();

        if (!deviceOrientation) {
            deviceUser.position = undefined;
            deviceUser.orientation = undefined;
            return;
        }

        const screenOrientation = 
            Quaternion.fromAxisAngle(
                Cartesian3.UNIT_Z, 
                this.screenOrientationDegrees * CesiumMath.RADIANS_PER_DEGREE, 
                this._scratchQuaternion
            );

        if (!deviceUser.position) deviceUser.position = new ConstantPositionProperty();
        if (!deviceUser.orientation) deviceUser.orientation = new ConstantProperty();
        
        (deviceUser.position as ConstantPositionProperty).setValue(
            Cartesian3.fromElements(0,0,this.suggestedUserHeight, this._scratchCartesian), 
            deviceStage
        );

        (deviceUser.orientation as ConstantProperty).setValue(
            Quaternion.multiply(
                deviceOrientation, 
                screenOrientation,
                this._scratchQuaternion
            )
        );

        deviceUser['meta'] = deviceUser['meta'] || {};
        deviceUser['meta'].geoHeadingAccuracy = this._deviceOrientationHeadingAccuracy;
    }

    private _vrFrameData?:any;
    private _scratchQuaternion = new Quaternion;
    private _scratchQuaternion2 = new Quaternion;
    private _scratchMatrix3 = new Matrix3;
    private _scratchMatrix4 = new Matrix4;

	private _defaultLeftBounds = [ 0.0, 0.0, 0.5, 1.0 ];
	private _defaultRightBounds = [ 0.5, 0.0, 0.5, 1.0 ];

    private _updateForWebVR() {
        const vrDisplay = this._vrDisplay;
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

        const sittingToStandingTransform = vrDisplay.stageParameters ? 
            <Matrix4><any> vrDisplay.stageParameters.sittingToStandingTransform :
            Matrix4.IDENTITY;

        const sittingToStandingRotation = Matrix4.getRotation(sittingToStandingTransform, this._scratchMatrix3);
        const sittingToStandingQuaternion = Quaternion.fromRotationMatrix(sittingToStandingRotation, this._scratchQuaternion)

        const user = this.user;
        const origin = this.origin;

        const sittingUserPosition : Cartesian3|undefined = vrFrameData.pose.position ? 
            Cartesian3.unpack(<any>vrFrameData.pose.position, 0, this._scratchCartesian) : undefined;
        const standingUserPosition : Cartesian3|undefined = sittingUserPosition ? 
            Matrix4.multiplyByPoint(sittingToStandingTransform, sittingUserPosition, this._scratchCartesian) : undefined;
        const sittingUserOrientation : Quaternion|undefined = vrFrameData.pose.orientation ? 
            Quaternion.unpack(<any>vrFrameData.pose.orientation, 0, this._scratchQuaternion2) : undefined;
        const standingUserOrientation = sittingUserOrientation ? 
            Quaternion.multiply(sittingToStandingQuaternion, sittingUserOrientation, this._scratchQuaternion) : undefined;

        if (!user.position) user.position = new ConstantPositionProperty();
        if (!user.orientation) user.orientation = new ConstantProperty();
        (user.position as ConstantPositionProperty).setValue(standingUserPosition, origin);
        (user.orientation as ConstantProperty).setValue(standingUserOrientation);

        if (standingUserPosition && standingUserOrientation) {
            const leftEyeSittingSpaceTransform = Matrix4.inverseTransformation(
                <any>vrFrameData.leftViewMatrix, 
                this._scratchMatrix4
            );
            const leftEyeStandingSpaceTransform = Matrix4.multiplyTransformation(
                sittingToStandingTransform, 
                leftEyeSittingSpaceTransform, 
                this._scratchMatrix4
            );
            
            const leftEye = this.getSubviewEntity(0);
            const leftEyePosition = Matrix4.getTranslation(leftEyeStandingSpaceTransform, this._scratchCartesian);
            const leftEyeRotation = Matrix4.getRotation(leftEyeStandingSpaceTransform, this._scratchMatrix3);
            const leftEyeOrientation = Quaternion.fromRotationMatrix(leftEyeRotation, this._scratchQuaternion);
            (leftEye.position as ConstantPositionProperty).setValue(leftEyePosition, origin);
            (leftEye.orientation as ConstantProperty).setValue(leftEyeOrientation);
            
            const rightEyeSittingSpaceTransform = Matrix4.inverseTransformation(
                <any>vrFrameData.rightViewMatrix, 
                this._scratchMatrix4
            );
            const rightEyeStandingSpaceTransform = Matrix4.multiplyTransformation(
                sittingToStandingTransform,
                rightEyeSittingSpaceTransform,
                this._scratchMatrix4
            );
            
            const rightEye = this.getSubviewEntity(1);
            const rightEyePosition = Matrix4.getTranslation(rightEyeStandingSpaceTransform, this._scratchCartesian);
            const rightEyeRotation = Matrix4.getRotation(rightEyeStandingSpaceTransform, this._scratchMatrix3);
            const rightEyeOrientation = Quaternion.fromRotationMatrix(rightEyeRotation, this._scratchQuaternion);
            (rightEye.position as ConstantPositionProperty).setValue(rightEyePosition, origin);
            (rightEye.orientation as ConstantProperty).setValue(rightEyeOrientation);
        }

        if (vrDisplay.displayName.match(/polyfill/g)) {
            // for the polyfill, the origin is placed using the default strategy of updating
            // only when the stage has moved a large distance
            this._updateDefaultOrigin();
            // the polyfill does not support reporting an absolute orientation (yet), 
            // so fall back to the default orientation calculation
            (user.position as ConstantPositionProperty).setValue(undefined, undefined);
            (user.orientation as ConstantProperty).setValue(undefined);
            this._updateDefaultUser();
        } else {
            // for real webvr, the origin is always at the stage
            (this.origin.position as ConstantPositionProperty).setValue(Cartesian3.ZERO, this.stage);
            (this.origin.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);
        }
    }

    private _hasPolyfillWebVRDisplay() : boolean {
        return !!this._vrDisplay && !!this._vrDisplay.displayName.match(/polyfill/g);
    }

    protected onRequestPresentHMD() : Promise<void> {
        if (this._vrDisplay) {
            const element = this.viewService.element!;
            const viewLayers = this.viewService.layers;
            const layers:VRLayer&{}[] = 
                [{
                    source:
                        viewLayers && viewLayers[0] && viewLayers[0].source || 
                        element.querySelector('canvas') || 
                        <HTMLCanvasElement>element.lastElementChild
                }];
            return this._vrDisplay.requestPresent(layers).catch((e)=>{
                throw e;
            });
        }
        throw new Error('No HMD available');
    }
    
    protected onExitPresentHMD() : Promise<void> {
        if (this._vrDisplay && this._vrDisplay.isPresenting) {
            return this._vrDisplay.exitPresent();
        }
        return Promise.resolve();
    }

    @deprecated()
    public createContextFrameState(
        time:JulianDate,
        viewport:CanvasViewport,
        subviewList:SerializedSubviewList,
        options?: {overrideStage?:boolean, overrideUser?:boolean, overrideView?:boolean, floorOffset?:number}
    ) : any {
        return ArgonSystem.instance!.context.createFrameState(time, viewport, subviewList, options);
    }

    getSubviewEntity(index:number) {
        const subviewEntity = this.entityService.collection.getOrCreateEntity('ar.device.view_'+index);
        if (!subviewEntity.position) {
            subviewEntity.position = new ConstantPositionProperty(Cartesian3.ZERO, this.user);
        }
        if (!subviewEntity.orientation) {
            subviewEntity.orientation = new ConstantProperty(Quaternion.IDENTITY);
        }
        return subviewEntity;
    }

    subscribeGeolocation(options?:GeolocationOptions, session=this.sessionService.manager) : Promise<void> {
        return this.entityService.subscribe(this.stage.id, options, session).then(()=>{});
    }

    unsubscribeGeolocation(session=this.sessionService.manager) : void {
        this.entityService.unsubscribe(this.stage.id, session);
    }

    /**
     * Is the view presenting to an HMD
     */
    get isPresentingHMD() : boolean {
        return this._parentState && this._parentState.isPresentingHMD || 
            this._vrDisplay && this._vrDisplay.isPresenting ||
            false;
    }

    /**
     * Is the current reality presenting to an HMD
     */
    get isPresentingRealityHMD() : boolean {
        return this._parentState && this._parentState.isPresentingRealityHMD || 
            this._vrDisplay && this._vrDisplay.isPresenting && !!this._vrDisplay.displayName.match(/polyfill/g) ||
            false;
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

    private _deviceOrientationListener;
    private _deviceOrientation:Quaternion|undefined;
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
            this._deviceOrientation = Quaternion.multiply(this._negX90, alphaBetaGammaQuat, this._deviceOrientation || new Quaternion); // rotate from ENU to EUS
            this._deviceOrientationHeadingAccuracy = webkitCompassAccuracy;

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

    private _setupVRPresentChangeHandler() {
        if (typeof window !=='undefined' && window.addEventListener) {

            this.viewService.viewportModeChangeEvent.addEventListener((mode)=>{
                if (mode === ViewportMode.PAGE && this._vrDisplay && this._vrDisplay.displayName.match(/polyfill/g)) 
                    this.exitPresentHMD();
            });

            let currentCanvas:HTMLElement|undefined;
            let previousPresentationMode:ViewportMode;

            const handleVRDisplayPresentChange = (e) => {
                const viewService = this.viewService;
                const display:VRDisplay|undefined = e.display || e.detail.vrdisplay || e.detail.display;
                if (display) {
                    if (display.isPresenting) {
                        this._vrDisplay = display;
                        if (display.displayName.match(/polyfill/g)) {
                            currentCanvas = display.getLayers()[0].source;
                            if (currentCanvas) currentCanvas.classList.add('argon-interactive'); // for now, only use webvr when not in Argon
                            previousPresentationMode = viewService.viewportMode;
                            viewService.desiredViewportMode = ViewportMode.IMMERSIVE;
                        }
                    } else {
                        if (currentCanvas && display.displayName.match(/polyfill/g)) {
                            currentCanvas.classList.remove('argon-interactive'); // for now, only use webvr when not in Argon
                            currentCanvas = undefined;
                            viewService.desiredViewportMode = previousPresentationMode;
                        }
                    }
                }
            }
            window.addEventListener('vrdisplaypresentchange', handleVRDisplayPresentChange);
        }
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
    ) {
        this.entityServiceProvider.targetReferenceFrameMap.set(deviceService.stage.id, ReferenceFrame.FIXED);
        this.entityServiceProvider.targetReferenceFrameMap.set(deviceService.user.id, deviceService.stage.id);
        
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

            this._needsPublish = true;
        });

        this.entityServiceProvider.sessionSubscribedEvent.addEventListener(({id, options, session})=>{
            if (this.deviceService.stage.id === id) {
                this._sessionGeolocationOptions.set(session, options);
                this._checkDeviceGeolocationSubscribers();
            }
        });

        this.entityServiceProvider.sessionUnsubscribedEvent.addEventListener(({id})=>{
            if (this.deviceService.stage.id === id)
                this._checkDeviceGeolocationSubscribers();
        })

        this.deviceService.suggestedGeolocationSubscriptionChangeEvent.addEventListener(()=>{
            this._needsPublish = true;
        })

        this.viewService.viewportChangeEvent.addEventListener(()=>{
            this._needsPublish = true;
        });

        this.viewService.viewportModeChangeEvent.addEventListener(()=>{
            this._needsPublish = true;
        });

        this.deviceService.screenOrientationChangeEvent.addEventListener(()=>{
            this._needsPublish = true;
        });

        this.deviceService.frameStateEvent.addEventListener((state)=>{
            if (this._needsPublish ||
                this._stableState.isPresentingHMD !== this.deviceService.isPresentingHMD ||
                this._stableState.isPresentingRealityHMD !== this.deviceService.isPresentingRealityHMD ||
                CanvasViewport.equals(this._stableState.viewport, state.viewport) === false) {
                    this._needsPublish = true;
            } else if (this._stableState.subviews) {
                if (this._stableState.subviews.length === state.subviews.length) {
                    for (let i=0; i < state.subviews.length; i++) {
                        if (!SerializedSubview.equals(state.subviews[i], this._stableState.subviews[i])) {
                            this._needsPublish = true;
                            break;
                        }
                    }
                } else {
                    this._needsPublish = true;
                }
            }

            if (this._needsPublish) this.publishStableState();
        });
    }

    protected handleRequestPresentHMD(session:SessionPort) : Promise<void> {
        return this.deviceService.requestPresentHMD();
    }

    protected handleExitPresentHMD(session:SessionPort) : Promise<void> {
        return this.deviceService.exitPresentHMD();
    }

    private _needsPublish = false;
    private _publishTime = new JulianDate(0,0);
    private _stableState = new DeviceStableState;

    public publishStableState() {
        const stableState = this._stableState;
        
        stableState.suggestedGeolocationSubscription = this.deviceService.suggestedGeolocationSubscription;
        stableState.suggestedUserHeight = this.deviceService.suggestedUserHeight;
        stableState.strict = this.deviceService.strict;
        stableState.viewport = CanvasViewport.clone(this.deviceService.frameState.viewport, stableState.viewport)
        stableState.subviews = SerializedSubviewList.clone(this.deviceService.frameState.subviews, stableState.subviews)
        
        this.onUpdateStableState(this._stableState);

        // send stable state to each subscribed session 
        JulianDate.now(this._publishTime);
        for (const id in this._subscribers) {
            const session = this._subscribers[id];
            if (session.version[0] > 0 && session !== this.sessionService.manager) {
                for (const k in stableState.entities) { delete stableState.entities[k] };
                this.entityServiceProvider.fillEntityStateMapForSession(session, this._publishTime, stableState.entities);
                session.send('ar.device.state', stableState);
            }
        }

        this._needsPublish = false;
    }

    protected onUpdateStableState(stableState:DeviceStableState) {

    }

    private _currentGeolocationOptions?:GeolocationOptions;
    private _targetGeolocationOptions:GeolocationOptions = {};
    private _sessionGeolocationOptions = new Map<SessionPort, GeolocationOptions|undefined>();

    private _checkDeviceGeolocationSubscribers() {
        const subscribers = this.entityServiceProvider.subscribersByEntity.get(this.deviceService.stage.id);
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
                this.onStopGeolocationUpdates();
                this.onStartGeolocationUpdates(this._targetGeolocationOptions);
            }
        } else {
            this.onStopGeolocationUpdates();
            this._currentGeolocationOptions = undefined;
        }
        this._needsPublish = true;
    }

    private _sctachStageCartesian = new Cartesian3;
    private _scatchStageMatrix4 = new Matrix4;
    private _scatchStageMatrix3 = new Matrix3;
    private _scatchStageQuaternion = new Quaternion;
    private _eastUpSouthToFixedFrame = eastUpSouthToFixedFrame;

    protected configureStage(
            cartographic:Cartographic,
            geoHorizontalAccuracy?:number,
            geoVerticalAccuracy?:number) {

        if (!defined(geoVerticalAccuracy) && cartographic.height === 0) {
            updateHeightFromTerrain(cartographic).then(() => this.configureStage(cartographic, geoHorizontalAccuracy, 0));
            return;
        }

        const stage = this.deviceService.stage;
        
        const fixedPosition = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height, undefined, this._sctachStageCartesian);
        const eusTransform = this._eastUpSouthToFixedFrame(fixedPosition, undefined, this._scatchStageMatrix4);
        const eusRotation = Matrix4.getRotation(eusTransform, this._scatchStageMatrix3);
        const eusOrientation = Quaternion.fromRotationMatrix(eusRotation, this._scatchStageQuaternion);

        stage.position = stage.position || new ConstantPositionProperty();
        stage.orientation = stage.orientation || new ConstantProperty();

        (stage.position as ConstantPositionProperty).setValue(
            fixedPosition,
            ReferenceFrame.FIXED
        );

        (stage.orientation as ConstantProperty).setValue(
            eusOrientation
        );

        stage['meta'] = {
            geoHorizontalAccuracy,
            geoVerticalAccuracy
        };
    }

    private _geolocationWatchId?:number;

    private _scratchCartographic = new Cartographic;

    /**
     * Overridable. Should call configureStage when new geolocation is available 
     */
    public onStartGeolocationUpdates(options:GeolocationOptions) : void {
        if (typeof navigator == 'undefined' || !navigator.geolocation)
            throw new Error('Unable to start geolocation updates');
        if (!defined(this._geolocationWatchId)) {
            this._geolocationWatchId = navigator.geolocation.watchPosition((pos) => {

                const longDegrees = pos.coords.longitude;
                const latDegrees = pos.coords.latitude;
                const altitude = pos.coords.altitude;
                const cartographic = Cartographic.fromDegrees(longDegrees, latDegrees, altitude||0, this._scratchCartographic);

                this.configureStage(
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
    public onStopGeolocationUpdates() : void {
        if (typeof navigator !== 'undefined' && defined(this._geolocationWatchId)) {
            navigator.geolocation.clearWatch(this._geolocationWatchId);
            this._geolocationWatchId = undefined;
        }
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
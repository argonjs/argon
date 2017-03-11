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
    Transforms,
    JulianDate,
    PerspectiveFrustum,
    defined
} from './cesium/cesium-imports'

import {autoinject} from 'aurelia-dependency-injection';
import {ContextService, ContextServiceProvider, PoseStatus} from './context'
import {SessionService, SessionPort} from './session'

import {
    AVERAGE_EYE_HEIGHT,
    DEFAULT_NEAR_PLANE,
    DEFAULT_FAR_PLANE,
    Viewport,
    SerializedSubviewList,
    SerializedEntityStateMap,
    SubviewType,
    ContextFrameState,
    GeolocationOptions
} from './common'

import {
    Event,
    getEntityPositionInReferenceFrame,
    getEntityOrientationInReferenceFrame,
    getSerializedEntityState,
    requestAnimationFrame,
    cancelAnimationFrame,
    getAncestorReferenceFrames
} from './utils'

import {
    ViewService,
    ViewportMode
} from './view'

export class DeviceState {
    viewport?:Viewport;
    subviews?:SerializedSubviewList;
    entities:SerializedEntityStateMap = {};
    suggestedUserHeight = AVERAGE_EYE_HEIGHT;
    geolocationDesired = false;
    geolocationOptions:GeolocationOptions = {};
    isPresentingHMD = false;
    strict = false;
}

export class DeviceFrameState extends DeviceState {
    private _scratchFrustum = new PerspectiveFrustum();

    screenOrientationDegrees = 0;

    time = JulianDate.now();

    viewport = {x:0,y:0,width:0,height:0};

    subviews:SerializedSubviewList = [{
        type: SubviewType.SINGULAR,
        pose: null,
        viewport: {x:0, y:0, width: 0, height:0},
        projectionMatrix: (
            this._scratchFrustum.near = DEFAULT_NEAR_PLANE,
            this._scratchFrustum.far = DEFAULT_FAR_PLANE,
            this._scratchFrustum.fov = CesiumMath.PI_OVER_THREE, 
            this._scratchFrustum.aspectRatio = 1, 
            Matrix4.clone(this._scratchFrustum.projectionMatrix)
        )
    }];
};

@autoinject()
export class DeviceService {

    public autoSubmitFrame = true;

    public deviceState = new DeviceState; 

    public frameState = new DeviceFrameState;

    public frameStateEvent = new Event<DeviceFrameState>();

    /**
     * An entity representing the local origin, defining an 
     * East-North-Up coordinate system.
     */
    public localOrigin: Entity = this.contextService.entities.add(new Entity({
        id: 'ar.device.localOrigin',
        name: 'Device Local Origin',
        position: undefined,
        orientation: undefined
    }));

    /**
     * An entity representing the physical pose of the user
     */
    public user: Entity = this.contextService.entities.add(new Entity({
        id: 'ar.device.user',
        name: 'Device User',
        position: undefined,
        orientation: undefined
    }));

    /**
     * An entity representing the physical floor-level plane below the user
     */
    public stage: Entity = this.contextService.entities.add(new Entity({
        id: 'ar.device.stage',
        name: 'Device Stage',
        position: undefined,
        orientation: undefined
    }));
    
    /**
     * An entity representing the pose of the display (not taking into account screen rotation)
     */
    public display: Entity = this.contextService.entities.add(new Entity({
        id: 'ar.device.display',
        name: 'Device Display',
        position:  new ConstantPositionProperty(Cartesian3.ZERO, this.user),
        orientation: new ConstantProperty()
    }));

    public get geoHeadingAccuracy() : number|undefined {
        return this.user['meta'] ? this.user['meta'].geoHeadingAccuracy : undefined;
    }

    public get geoHorizontalAccuracy() : number|undefined {
        return this.localOrigin['meta'] ? this.localOrigin['meta'].geoHorizonatalAccuracy : undefined;
    }
    
    public get geoVerticalAccuracy() : number|undefined {
        return this.localOrigin['meta'] ? this.localOrigin['meta'].geoVerticalAccuracy : undefined;
    }

    private _getEntityPositionInReferenceFrame = getEntityPositionInReferenceFrame;
    private _getEntityOrientationInReferenceFrame = getEntityOrientationInReferenceFrame;
    protected _scratchCartesian = new Cartesian3;
    protected _scratchFrustum = new PerspectiveFrustum();

    constructor(
        protected sessionService:SessionService,
        protected contextService:ContextService,
        protected viewService:ViewService
    ) {
        sessionService.manager.on['ar.device.state'] = 
            sessionService.manager.on['ar.device.frameState'] = this._onDeviceState.bind(this);

        contextService.frameStateEvent.addEventListener((state)=>{
            // // if we aren't given a device user pose from the manager,
            // // attempt to update the user pose ourselves from device orientation
            // if (!state.entities[this.user.id]) {
            //     this._updateDeviceUserPoseFromDeviceOrientation();
            // }
            
            // if we aren't given a context user pose, 
            // default to the device user pose
            const user = this.contextService.user;
            if (!state.entities[user.id]) {
                if (!user.position) user.position = new ConstantPositionProperty();
                if (!user.orientation) user.orientation = new ConstantProperty();
                (user.position as ConstantPositionProperty).setValue(Cartesian3.ZERO, this.user);
                (user.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);
            }
        })

        if (this.sessionService.isRealityManager || this.sessionService.isRealityViewer) {
            this.sessionService.manager.connectEvent.addEventListener(()=>{
                this.startUpdates();
            });
        }

        this.sessionService.manager.closeEvent.addEventListener(()=>{
            this.stopUpdates();
        })

        this._setupVRPresentChangeHandler();
    }

    // private _defaultFrameState:DeviceFrameState = new DeviceFrameState();

    private _onDeviceState(deviceState:DeviceState) {
        // if (!frameState) { // for backwards compatability with manager v0
        //     const contextSerializedFrameState = this.contextService.serializedFrameState;
        //     const width = this.viewService.element.clientWidth;
        //     const height = this.viewService.element.clientHeight;
        //     contextSerializedFrameState.viewport.width = width;
        //     contextSerializedFrameState.viewport.height = height;
        //     contextSerializedFrameState.subviews[0].viewport.width = width;
        //     contextSerializedFrameState.subviews[0].viewport.height = height;
        
        //     const deviceStage = this.stage;
        //     const deviceLocalOrigin = this.localOrigin;
        //     const position = Cartesian3.fromElements(0, 0, -AVERAGE_EYE_HEIGHT, this._scratchCartesian); 
        //     deviceStage.position = deviceStage.position || new ConstantPositionProperty();
        //     deviceStage.orientation = deviceStage.orientation || new ConstantProperty();
        //     (deviceStage.position as ConstantPositionProperty).setValue(position, deviceLocalOrigin);
        //     (deviceStage.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);

        //     frameState = this._defaultFrameState;
        //     frameState.viewport = Viewport.clone(contextSerializedFrameState.viewport, frameState.viewport);
        //     frameState.subviews = SerializedSubviewList.clone(contextSerializedFrameState.subviews, frameState.subviews);
        //     frameState.time = JulianDate.now(frameState.time);
        //     frameState.strict = true;
        // }

        this.deviceState = deviceState;
        this.frameState.suggestedUserHeight = deviceState.suggestedUserHeight;
        this.frameState.isPresentingHMD = deviceState.isPresentingHMD;
        this.frameState.geolocationDesired = deviceState.geolocationDesired;
        this.frameState.geolocationOptions = deviceState.geolocationOptions;

        const entities = deviceState.entities;
        const contextService = this.contextService;

        if (entities) for (const id in entities) {
            contextService.updateEntityFromSerializedState(id, entities[id]);
        }
    }

    private _updating = false;

    private _updateFrameState = () => {
        if (!this._updating) return;

        const state = this.frameState = this.frameState || {};
        state.time = JulianDate.now(state.time);
        state.screenOrientationDegrees = this.getScreenOrientationDegrees();
        
        this.onUpdateFrameState();
        this._updateDisplayPose();

        this.frameStateEvent.raiseEvent(state);

        this.requestAnimationFrame(this._updateFrameState);
    };

    private _updateDisplayPose() {
        const state = this.frameState;
        const display = this.display;
        const userOrientation = 
            state.screenOrientationDegrees !== 0 ? 
            this._getEntityOrientationInReferenceFrame(this.user, state.time, this.localOrigin, this._scratchQuaternion) : undefined;

        if (userOrientation) {
            const inverseScreenOrientation = 
                Quaternion.fromAxisAngle(
                    Cartesian3.UNIT_Z, 
                    - state.screenOrientationDegrees * CesiumMath.RADIANS_PER_DEGREE, 
                    this._scratchQuaternion2
                );
            (display.orientation as ConstantProperty).setValue(Quaternion.multiply(
                userOrientation,
                inverseScreenOrientation,
                userOrientation
            ));
        } else {
            (display.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);
        }
    }

    public getScreenOrientationDegrees() {
        return typeof window !== 'undefined' ? (screen['orientation'] && screen['orientation'].angle) || -window.orientation || 0 : 0;
    }

    /**
     * Request an animation frame callback for the current view. 
     */
    public requestAnimationFrame:(callback:(timestamp:number)=>void)=>number = callback => {
        if (currentVRDisplay) {
            return (currentVRDisplay as VRDisplay).requestAnimationFrame(callback);
        } else {
            return requestAnimationFrame(callback);
        }
    }

    public cancelAnimationFrame:(id:number)=>void = id => {
        if (currentVRDisplay) {
            return (currentVRDisplay as VRDisplay).cancelAnimationFrame(id);
        } else {
            return cancelAnimationFrame(id);
        }
    }

    /**
     * Start emmitting frameState events
     */
    public startUpdates() : void {
        if (!this._updating) this.requestAnimationFrame(this._updateFrameState);
        this._updating = true;
        this.sessionService.manager.whenConnected().then(()=>{
            if (this.sessionService.manager.version[0] > 0) {
                this.sessionService.manager.send('ar.device.startUpdates');
            }
        });
    }

    /**
     * Stop emitting frameState events
     */
    public stopUpdates() : void {
        this._updating = false;
        this.sessionService.manager.whenConnected().then(()=>{
            if (this.sessionService.manager.version[0] > 0) {
                this.sessionService.manager.send('ar.device.stopUpdates');
            }
        });
    }

    protected onUpdateFrameState() {
        if (currentVRDisplay) {
            this._updateForWebVR();
        } else {
            this._updateDefault();
        }
    }

    private _updateStageDefault() {
        const deviceStage = this.stage;
        const deviceLocalOrigin = this.localOrigin;

        const position = Cartesian3.fromElements(0, 0, -this.frameState.suggestedUserHeight, this._scratchCartesian); 
        deviceStage.position = deviceStage.position || new ConstantPositionProperty();
        deviceStage.orientation = deviceStage.orientation || new ConstantProperty();
        (deviceStage.position as ConstantPositionProperty).setValue(position, deviceLocalOrigin);
        (deviceStage.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);
    }

    private _updateDefault() {
        this._updateStageDefault();
        this._updateUserDefault();

        const frameState = this.frameState;
        const deviceState = this.deviceState;
        
        const element = this.viewService.element;
        
        const viewport = frameState.viewport;
        if (deviceState.viewport) {
            Viewport.clone(deviceState.viewport, viewport);
        } else {
            viewport.x = 0;
            viewport.y = 0;
            viewport.width = element && element.clientWidth || 0;
            viewport.height = element && element.clientHeight || 0;
        }

        const subviews = frameState.subviews;
        if (deviceState.subviews) {
            SerializedSubviewList.clone(deviceState.subviews, subviews);
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
        }
    }


    private _vrFrameData?:any;
    private _scratchQuaternion = new Quaternion;
    private _scratchQuaternion2 = new Quaternion;
    private _scratchMatrix3 = new Matrix3;
    private _scratchMatrix4 = new Matrix4;

    private _localOriginEUS = new Entity({
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.localOrigin),
        orientation: new ConstantProperty(Quaternion.fromAxisAngle(Cartesian3.UNIT_X, CesiumMath.PI_OVER_TWO))
    })

    /**
     * Defines a +Y coordinate system positioned at the local origin, by default. 
     */
    public standingSpace = new Entity({
        position: new ConstantPositionProperty(Cartesian3.ZERO, this._localOriginEUS),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    });

    /**
     * Rotate the standing space around +Y
     */
    public configureStandingSpaceHeadingOffset(headingOffset:number=0) {
        (this.standingSpace.orientation as ConstantProperty).setValue(Quaternion.fromAxisAngle(Cartesian3.UNIT_Y, headingOffset))
    }

    private _updateForWebVR() {
        
        const frameState = this.frameState;

        const vrDisplay:VRDisplay = currentVRDisplay;

        const element = this.viewService.element;
        
        const viewport = frameState.viewport;
        viewport.x = 0;
        viewport.y = 0;
        viewport.width = element && element.clientWidth || 0;
        viewport.height = element && element.clientHeight || 0;

        const vrFrameData : VRFrameData = this._vrFrameData = 
            this._vrFrameData || new VRFrameData();
        if (!vrDisplay['getFrameData'](vrFrameData)) 
            return this.frameState;

        const layers = vrDisplay.getLayers();
        const leftBounds = layers[0].leftBounds!;
        const rightBounds = layers[0].rightBounds!;
        
        const subviews = frameState.subviews = frameState.subviews || [];
        subviews.length = 2;

        const leftSubview = subviews[0] = subviews[0] || {};
        const rightSubview = subviews[1] = subviews[1] || {};
        leftSubview.type = SubviewType.LEFTEYE;
        rightSubview.type = SubviewType.RIGHTEYE;
        const leftViewport = leftSubview.viewport = leftSubview.viewport || <Viewport>{};
        leftViewport.x = leftBounds[0] * viewport.width;
        leftViewport.y = leftBounds[1] * viewport.height;
        leftViewport.width = leftBounds[2] * viewport.width;
        leftViewport.height = leftBounds[3] * viewport.height;
        const rightViewport = rightSubview.viewport = rightSubview.viewport || <Viewport>{};
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
        const standingSpace = this.standingSpace;

        const sittingUserPosition : Cartesian3|undefined = vrFrameData.pose.position ? 
            Cartesian3.unpack(<any>vrFrameData.pose.position, 0, this._scratchCartesian) : undefined;
        const standingUserPosition : Cartesian3|undefined = sittingUserPosition ? 
            Matrix4.multiplyByPoint(sittingToStandingTransform, sittingUserPosition, this._scratchCartesian) : undefined;
        const sittingUserOrientation : Quaternion|undefined = vrFrameData.pose.orientation ? 
            Quaternion.unpack(<any>vrFrameData.pose.orientation, 0, this._scratchQuaternion2) : undefined;
        const standingUserOrientation = sittingUserOrientation ? 
            Quaternion.multiply(sittingToStandingQuaternion, sittingUserOrientation, this._scratchQuaternion) : undefined;

        (user.position as ConstantPositionProperty).setValue(standingUserPosition, standingSpace);
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
            (leftEye.position as ConstantPositionProperty).setValue(leftEyePosition, standingSpace);
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
            (rightEye.position as ConstantPositionProperty).setValue(rightEyePosition, standingSpace);
            (rightEye.orientation as ConstantProperty).setValue(rightEyeOrientation);
        }

        if (vrDisplay.displayName.match(/polyfill/g)) {
            // The polyfill does not support reporting an absolute orientation (yet), 
            // so fall back to the default orientation calculation
            (user.position as ConstantPositionProperty).setValue(undefined, undefined);
            (user.orientation as ConstantProperty).setValue(undefined);
            this._updateUserDefault();
            this._updateStageDefault();
        } else {
            const stage = this.stage;
            stage.position = stage.position || new ConstantPositionProperty();
            stage.orientation = stage.orientation || new ConstantProperty();
            (stage.position as ConstantPositionProperty).setValue(Cartesian3.ZERO, this.localOrigin);
            (stage.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);
        }
    }

    private _scratchFrameState:ContextFrameState = {
        time:<any>{},
        entities: {},
        viewport: <any>{},
        subviews: []
    }

    private _getSerializedEntityState = getSerializedEntityState;
    private _getAncestorReferenceFrames = getAncestorReferenceFrames;

    private _deviceLocalOriginRelativeToDeviceUserPose = this.contextService.createEntityPose(
        this.localOrigin,
        this.user
    )

    private _scratchLocalOrigin = new Entity({
        position: new ConstantPositionProperty(undefined, undefined),
        orientation: new ConstantProperty(undefined)
    });

    public createContextFrameState(
        time:JulianDate,
        viewport:Viewport,
        subviewList:SerializedSubviewList,
        user:Entity,
        entityOptions?: {localOrigin?:Entity, ground?:Entity}
    ) : ContextFrameState {

        for (const s of subviewList) {
            if (!isFinite(s.projectionMatrix[0]))
                throw new Error('Invalid projection matrix (contains non-finite values)');
        }

        let localOrigin = entityOptions && entityOptions.localOrigin;
        let ground = entityOptions && entityOptions.ground;

        if (!localOrigin) {
            localOrigin = this._scratchLocalOrigin;

            const deviceLocalOriginRelativeToUserPose = this._deviceLocalOriginRelativeToDeviceUserPose;
            deviceLocalOriginRelativeToUserPose.update();

            if (deviceLocalOriginRelativeToUserPose.poseStatus & PoseStatus.KNOWN) {
                const position = deviceLocalOriginRelativeToUserPose.position;
                const orientation = deviceLocalOriginRelativeToUserPose.orientation;
                localOrigin.position = localOrigin.position || new ConstantPositionProperty();
                localOrigin.orientation = localOrigin.orientation || new ConstantProperty();
                (localOrigin.position as ConstantPositionProperty).setValue(position, user);
                (localOrigin.orientation as ConstantProperty).setValue(orientation);
            } else {

                const fixedPosition = this._getEntityPositionInReferenceFrame(user, time, ReferenceFrame.FIXED, this._scratchCartesian);

                if (fixedPosition) {
                    const enuOrientation = Transforms.headingPitchRollQuaternion(fixedPosition, 0,0,0, undefined, this._scratchQuaternion);

                    localOrigin.position = localOrigin.position || new ConstantPositionProperty();
                    localOrigin.orientation = localOrigin.orientation || new ConstantProperty();

                    (localOrigin.position as ConstantPositionProperty).setValue(
                        fixedPosition,
                        ReferenceFrame.FIXED
                    );

                    (localOrigin.orientation as ConstantProperty).setValue(
                        enuOrientation
                    );
                } else {
                    const userRootFrame = this._getAncestorReferenceFrames(user)[0];
                    if (userRootFrame !== localOrigin) {
                        localOrigin.position = localOrigin.position || new ConstantPositionProperty();
                        localOrigin.orientation = localOrigin.orientation || new ConstantProperty();
                        (localOrigin.position as ConstantPositionProperty).setValue(Cartesian3.ZERO, userRootFrame);
                        (localOrigin.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);
                    } else {
                        localOrigin.position = undefined;
                        localOrigin.orientation = undefined;
                    }
                }
                
            }
        }

        const contextService = this.contextService;
        const contextLocalOrigin = contextService.localOrigin;
        const contextUser = contextService.user;

        contextLocalOrigin.position = contextLocalOrigin.position || new ConstantPositionProperty();
        contextLocalOrigin.orientation = contextLocalOrigin.orientation || new ConstantProperty();
        contextUser.position = contextUser.position || new ConstantPositionProperty();
        contextUser.orientation = contextUser.orientation || new ConstantProperty();
        contextUser['meta'] = user['meta'];

        (contextLocalOrigin.position as ConstantPositionProperty).setValue(Cartesian3.ZERO, localOrigin);
        (contextLocalOrigin.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);
        (contextUser.position as ConstantPositionProperty).setValue(Cartesian3.ZERO, user);
        (contextUser.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);

        const frameState:ContextFrameState = this._scratchFrameState;
        frameState.time = JulianDate.clone(time, frameState.time);
        frameState.viewport = Viewport.clone(viewport, frameState.viewport);
        frameState.subviews = SerializedSubviewList.clone(subviewList, frameState.subviews);

        const getEntityState = this._getSerializedEntityState;
        const contextLocalOriginRootFrame = this._getAncestorReferenceFrames(contextLocalOrigin)[0];
        frameState.entities[contextLocalOrigin.id] = getEntityState(contextLocalOrigin, time, contextLocalOriginRootFrame);
        frameState.entities[contextUser.id] = getEntityState(contextUser, time, contextLocalOrigin);

        // update remaining context entities, changing the reference frame to the context local origin

        // display
        const contextDisplayState = frameState.entities[contextService.display.id] = getEntityState(this.display, time, localOrigin);
        if (contextDisplayState) contextDisplayState.r = contextLocalOrigin.id;
        // stage
        const contextStageState = frameState.entities[contextService.stage.id] = getEntityState(this.stage, time, localOrigin);
        if (contextStageState) contextStageState.r = contextLocalOrigin.id;
        // ground
        const contextGroundState = frameState.entities[contextService.ground.id] = ground ? getEntityState(ground, time, localOrigin) : contextStageState;
        if (contextGroundState) contextGroundState.r = contextLocalOrigin.id;

        return frameState;
    }

    getSubviewEntity(index:number) {
        const subviewEntity = this.contextService.entities.getOrCreateEntity('ar.device.view_'+index);
        if (!subviewEntity.position) {
            subviewEntity.position = new ConstantPositionProperty();
        }
        if (!subviewEntity.orientation) {
            subviewEntity.orientation = new ConstantProperty();
        }
        return subviewEntity;
    }

    subscribeGeolocation(options?:GeolocationOptions, session=this.sessionService.manager) : Promise<void> {
        if (session.version[0] > 0) 
            session.send('ar.device.setGeolocationOptions', {options});
        return this.contextService.subscribe(this.localOrigin.id, session).then(()=>{});
    }

    unsubscribeGeolocation(session=this.sessionService.manager) : void {
        this.contextService.unsubscribe(this.localOrigin.id, session);
    }

    get isPresentingHMD() : boolean {
        return this.frameState.isPresentingHMD;
    }

    requestPresentHMD() : Promise<void> {
        return this.sessionService.manager.request('ar.device.requestPresentHMD').then(()=>{
            this.frameState.isPresentingHMD = true; 
        });
    }

    exitPresentHMD() : Promise<void> {
        return this.sessionService.manager.request('ar.device.exitPresentHMD').then(()=>{
            this.frameState.isPresentingHMD = false;
        });
    }

    private _deviceOrientationListener;
    private _deviceOrientation:Quaternion|undefined;
    private _deviceOrientationHeadingAccuracy:number|undefined;

    private _updateUserDefault() {
        
        const deviceUser = this.user;
        const deviceLocalOrigin = this.localOrigin;
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
                this.frameState.screenOrientationDegrees * CesiumMath.RADIANS_PER_DEGREE, 
                this._scratchQuaternion
            );

        if (!deviceUser.position) deviceUser.position = new ConstantPositionProperty();
        if (!deviceUser.orientation) deviceUser.orientation = new ConstantProperty();
        
        (deviceUser.position as ConstantPositionProperty).setValue(
            Cartesian3.ZERO, 
            deviceLocalOrigin
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

            this._deviceOrientation = Quaternion.clone(alphaBetaGammaQuat, this._deviceOrientation);
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

            let currentCanvas:HTMLElement|undefined;
            let previousPresentationMode:ViewportMode;

            this.contextService.postRenderEvent.addEventListener(()=>{
                if (this.autoSubmitFrame && currentVRDisplay && currentVRDisplay.isPresenting) {
                    currentVRDisplay.submitFrame();
                }
            });

            const handleVRDisplayPresentChange = (e) => {
                const viewService = this.viewService;
                const vrDisplay:VRDisplay|undefined = e.display || e.detail.vrdisplay || e.detail.display;
                if (vrDisplay) {
                    const layers = vrDisplay.getLayers();
                    let isThisView = currentVRDisplay === vrDisplay;
                    for (const layer of layers) {
                        if (layer.source && viewService.element.contains(layer.source)) {
                            isThisView = true;
                            break;
                        }
                    }
                    if (isThisView) {
                        if (vrDisplay.isPresenting) {
                            currentVRDisplay = vrDisplay;
                            if (vrDisplay.displayName.match(/Cardboard/g)) {
                                currentCanvas = vrDisplay.getLayers()[0].source;
                                if (currentCanvas) currentCanvas.classList.add('argon-interactive');
                                previousPresentationMode = viewService.viewportMode;
                                viewService.desiredViewportMode = ViewportMode.IMMERSIVE;
                            }
                        } else {
                            currentVRDisplay = undefined;
                            if (currentCanvas && vrDisplay.displayName.match(/Cardboard/g)) {
                                currentCanvas.classList.remove('argon-interactive');
                                currentCanvas = undefined;
                                viewService.desiredViewportMode = previousPresentationMode;
                            }
                        }
                    }
                }

                viewService.viewportModeChangeEvent.addEventListener((mode)=>{
                    if (mode === ViewportMode.PAGE) 
                        this.exitPresentHMD();
                });
            }
            window.addEventListener('vrdisplaypresentchange', handleVRDisplayPresentChange);
        }
    }

}

let currentVRDisplay:any;

@autoinject()
export class DeviceServiceProvider {

    private _subscribers = new Set<SessionPort>();
    
    constructor(
        protected sessionService:SessionService,
        protected deviceService:DeviceService,
        protected contextService:ContextService,
        protected viewService:ViewService,
        protected contextServiceProvider:ContextServiceProvider,
    ) {
        this.contextServiceProvider.publishingReferenceFrameMap.set(deviceService.localOrigin.id, ReferenceFrame.FIXED)
        this.contextServiceProvider.publishingReferenceFrameMap.set(deviceService.stage.id, deviceService.localOrigin.id)
        this.contextServiceProvider.publishingReferenceFrameMap.set(deviceService.user.id, deviceService.localOrigin.id)
        this.contextServiceProvider.publishingReferenceFrameMap.set(deviceService.display.id, deviceService.localOrigin.id)
        
        this.sessionService.connectEvent.addEventListener((session)=>{
            // backwards compat pre-v1.1.8
            session.on['ar.device.requestFrameState'] = () => {
                this._subscribers.add(session);
                return new Promise((resolve) => {
                    const remove = this.deviceService.frameStateEvent.addEventListener((frameState)=>{
                        resolve(frameState)
                        remove();
                    });
                });
            }

            session.on['ar.device.startUpdates'] = () => {
                this._subscribers.add(session);
            }

            session.on['ar.device.stopUpdates'] = () => {
                this._subscribers.delete(session);
            }

            session.on['ar.device.setGeolocationOptions'] = (options) => {
                this._handleSetGeolocationOptions(session, options);
            }

            session.on['ar.device.requestPresentHMD'] = () => {
                return this.handleRequestPresentHMD(session).then(()=>{
                    this.deviceService.frameState.isPresentingHMD = true;
                    this.publishDeviceState();
                })
            }

            session.on['ar.device.exitPresentHMD'] = () => {
                return this.handleExitPresentHMD(session).then(()=>{
                    this.deviceService.frameState.isPresentingHMD = false;
                    this.publishDeviceState();
                })
            }
        });

        this.contextServiceProvider.subscribersChangeEvent.addEventListener(({id})=>{
            if (this.deviceService.localOrigin.id === id)
                this._checkDeviceGeolocationSubscribers();
        });
    }

    // public requestAnimationFrame:(cb:()=>any)=> number = requestAnimationFrame;
    // public cancelAnimationFrame:(id:number)=> void = cancelAnimationFrame;

    // private _updating = false;
    // public get updating() { return this._updating }

    // protected _startUpdates() {
    //     this._updating = true;
    //     const doUpdate = () => {
    //         if (!this._updating) return;
    //         this.update();
    //         this.requestAnimationFrame(doUpdate);
    //     }
    //     this.requestAnimationFrame(doUpdate);
    // }

    // protected _stopUpdates() {
    //     this._updating = false;
    // }

    protected handleRequestPresentHMD(session:SessionPort) : Promise<void> {
        if (typeof navigator !== 'undefined' &&
            navigator.getVRDisplays) {
            const requestPresent = (vrDisplay:VRDisplay) => {
                currentVRDisplay = vrDisplay;
                const element = this.viewService.element;
                const layers:VRLayer&{}[] = [];
                layers[0] = {source:element.querySelector('canvas') || <HTMLCanvasElement>element.lastElementChild};
                return vrDisplay.requestPresent(layers).catch((e)=>{
                    currentVRDisplay = undefined;
                    throw e;
                });
            }
            if (navigator.activeVRDisplays && navigator.activeVRDisplays.length) {
                return requestPresent(navigator.activeVRDisplays[0]);
            } else {
                return navigator.getVRDisplays()
                    .then(displays => displays[0])
                    .then(requestPresent)
                    .then(this.publishDeviceState.bind(this));
            }
        }
        throw new Error('No HMD available');
    }
    
    protected handleExitPresentHMD(session:SessionPort) : Promise<void> {
        if (currentVRDisplay) {
            const vrDisplay:VRDisplay = currentVRDisplay;
            currentVRDisplay = undefined;
            return vrDisplay.exitPresent();
        }
        return Promise.resolve();
    }

    public publishDeviceState() {
        const deviceState = this.deviceService.deviceState;
        
        deviceState.geolocationDesired = this.contextServiceProvider.geolocationDesired;
        deviceState.geolocationOptions = this.contextServiceProvider.desiredGeolocationOptions;
        deviceState.suggestedUserHeight = this.suggestedUserHeight;

        this.onUpdateDeviceState(this.deviceService.deviceState);

        // send device state to each subscribed session 
        const time = JulianDate.now();
        this._subscribers.forEach((s)=>{
            if (s.version[0] > 0) {
                for (const k in deviceState.entities) {delete deviceState.entities[k]};
                this.contextServiceProvider.fillEntityStateMapForSession(s, time, deviceState.entities);
                s.send('ar.device.state', deviceState);
            }
        });
    }

    public defaultUserHeight = AVERAGE_EYE_HEIGHT;

    public get suggestedUserHeight() {
        return this.deviceService.isPresentingHMD ? this.defaultUserHeight : this.defaultUserHeight/2;
    }

    protected onUpdateDeviceState(deviceState:DeviceState) {

    }

    private _currentGeolocationOptions?:GeolocationOptions;
    private _targetGeolocationOptions:GeolocationOptions = {};
    private _sessionGeolocationOptions = new Map<SessionPort, GeolocationOptions|undefined>();

    private _checkDeviceGeolocationSubscribers() {
        const subscribers = this.contextServiceProvider.subscribersByEntityId.get(this.deviceService.localOrigin.id);
        if (subscribers && subscribers.size > 0) {
            this._updateTargetGeolocationOptions();
            if (JSON.stringify(this._targetGeolocationOptions) !== JSON.stringify(this._currentGeolocationOptions)) {
                this._currentGeolocationOptions = this._targetGeolocationOptions;
                this.onStopGeolocationUpdates();
                this.onStartGeolocationUpdates(this._targetGeolocationOptions);
            }
        } else {
            this.onStopGeolocationUpdates();
            this._currentGeolocationOptions = undefined;
        }
        this.publishDeviceState();
    }

    private _handleSetGeolocationOptions(session:SessionPort, options:GeolocationOptions) {
        this._sessionGeolocationOptions.set(session, options);
        session.closeEvent.addEventListener(()=>{
            this._sessionGeolocationOptions.delete(session);
        });
    }

    private _updateTargetGeolocationOptions() {
        const reducedOptions:GeolocationOptions = {};
        this._sessionGeolocationOptions.forEach((options, session)=>{
            reducedOptions.enableHighAccuracy = 
                reducedOptions.enableHighAccuracy || (options && options.enableHighAccuracy) || false;
        });
        if (this._targetGeolocationOptions.enableHighAccuracy !== reducedOptions.enableHighAccuracy) {
            this._targetGeolocationOptions = reducedOptions;
        }
        this.publishDeviceState();
    }

    protected _scratchCartesianLocalOrigin = new Cartesian3;
    protected _scratchQuaternionLocalOrigin = new Quaternion;
    protected _scratchFrustum = new PerspectiveFrustum();

    protected configureLocalOrigin(
            longitude?:number,
            latitude?:number,
            altitude?:number,
            geoHorizontalAccuracy?:number,
            geoVerticalAccuracy?:number) {

        const localOrigin = this.deviceService.localOrigin;

        if (defined(longitude) && defined(latitude)) {
            // TODO: fallback on https://cesiumjs.org/Cesium/Build/Documentation/sampleTerrain.html for height
            const height = defined(altitude) ? altitude : 0;

            const fixedPosition = Cartesian3.fromDegrees(longitude, latitude, height, undefined, this._scratchCartesianLocalOrigin);
            const enuOrientation = Transforms.headingPitchRollQuaternion(fixedPosition, 0,0,0, undefined, this._scratchQuaternionLocalOrigin);

            localOrigin.position = localOrigin.position || new ConstantPositionProperty();
            localOrigin.orientation = localOrigin.orientation || new ConstantProperty();

            (localOrigin.position as ConstantPositionProperty).setValue(
                fixedPosition,
                ReferenceFrame.FIXED
            );

            (localOrigin.orientation as ConstantProperty).setValue(
                enuOrientation
            );

            localOrigin['meta'] = {
                geoHorizontalAccuracy,
                geoVerticalAccuracy
            };
        } else {
            localOrigin.position = undefined;
            localOrigin.orientation = undefined;
            localOrigin['meta'] = undefined;
        }
    }

    private _scratchStagePosition = new Cartesian3;

    protected updateStageDefault() {
        const deviceStage = this.deviceService.stage;
        const deviceLocalOrigin = this.deviceService.localOrigin;

        const position = Cartesian3.fromElements(0, 0, -this.defaultUserHeight, this._scratchStagePosition); 
        deviceStage.position = deviceStage.position || new ConstantPositionProperty();
        deviceStage.orientation = deviceStage.orientation || new ConstantProperty();
        (deviceStage.position as ConstantPositionProperty).setValue(position, deviceLocalOrigin);
        (deviceStage.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);
    }

    private _geolocationWatchId?:number;

    /**
     * Overridable. Should call setGeolocation when new geolocation is available 
     */
    protected onStartGeolocationUpdates(options:GeolocationOptions) : void {
        if (typeof navigator == 'undefined' || !navigator.geolocation)
            throw new Error('Unable to start geolocation updates');
        if (!defined(this._geolocationWatchId)) {
            this._geolocationWatchId = navigator.geolocation.watchPosition((pos) => {
                this.configureLocalOrigin(
                    pos.coords.longitude, 
                    pos.coords.latitude, 
                    pos.coords.altitude || 0, 
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
    protected onStopGeolocationUpdates() : void {
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
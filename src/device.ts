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
    Viewport,
    SerializedSubviewList,
    SerializedEntityStateMap,
    SubviewType,
    FrameState,
    GeolocationOptions
} from './common'

import {
    getEntityPositionInReferenceFrame,
    getEntityOrientationInReferenceFrame,
    getSerializedEntityState,
    requestAnimationFrame,
    getAncestorReferenceFrames
} from './utils'

import {
    ViewService,
    ViewportMode
} from './view'

export class SuggestedFrameState {
    private _scratchFrustum = new PerspectiveFrustum();

    time = JulianDate.now();
    viewport:Viewport = {x:0,y:0,width:0,height:0};
    subviews:SerializedSubviewList = [{
        type: SubviewType.SINGULAR,
        pose: null,
        viewport: {x:0, y:0, width: 0, height:0},
        projectionMatrix: (
            this._scratchFrustum.near = 0.01,
            this._scratchFrustum.far = 500000000,
            this._scratchFrustum.fov = Math.PI / 3, 
            this._scratchFrustum.aspectRatio = 1, 
            Matrix4.clone(this._scratchFrustum.projectionMatrix)
        )
    }];
    entities:SerializedEntityStateMap = {};
    geolocationDesired = false;
    geolocationOptions:GeolocationOptions = {};
    strict = false;
};

@autoinject()
export class DeviceService {

    public suggestedFrameState? : SuggestedFrameState;

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
     * An entity representing the physical floor-level plane below the user
     */
    public stage: Entity = this.contextService.entities.add(new Entity({
        id: 'ar.device.stage',
        name: 'Device Stage',
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
    private _scratchCartesian = new Cartesian3;

    constructor(
        private sessionService:SessionService,
        private contextService:ContextService,
        private viewService:ViewService
    ) {
        this.sessionService.manager.on['ar.device.isPresentingHMD'] = ({state}) => {
            this._isPresentingHMD = state;
        }
        contextService.frameStateEvent.addEventListener((state)=>{
            // if we aren't given a device user pose from the manager,
            // attempt to update the user pose ourselves from device orientation
            if (!state.entities[this.user.id]) {
                this._updateDeviceUserPoseFromDeviceOrientation();
            }
            
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

        this._onNextFrameState = this._onNextFrameState.bind(this);
    }

    private _defaultFrameState:SuggestedFrameState = new SuggestedFrameState();

    private _onNextFrameState(suggestedFrameState?:SuggestedFrameState) {
        if (!suggestedFrameState) { // for backwards compatability with manager v0
            const contextSerializedFrameState = this.contextService.serializedFrameState;
            const width = this.viewService.element.clientWidth;
            const height = this.viewService.element.clientHeight;
            contextSerializedFrameState.viewport.width = width;
            contextSerializedFrameState.viewport.height = height;
            contextSerializedFrameState.subviews[0].viewport.width = width;
            contextSerializedFrameState.subviews[0].viewport.height = height;
        
            const deviceStage = this.stage;
            const deviceLocalOrigin = this.localOrigin;
            const position = Cartesian3.fromElements(0, 0, -AVERAGE_EYE_HEIGHT, this._scratchCartesian); 
            deviceStage.position = deviceStage.position || new ConstantPositionProperty();
            deviceStage.orientation = deviceStage.orientation || new ConstantProperty();
            (deviceStage.position as ConstantPositionProperty).setValue(position, deviceLocalOrigin);
            (deviceStage.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);

            suggestedFrameState = this._defaultFrameState;
            suggestedFrameState.viewport = Viewport.clone(contextSerializedFrameState.viewport, suggestedFrameState.viewport);
            suggestedFrameState.subviews = SerializedSubviewList.clone(contextSerializedFrameState.subviews, suggestedFrameState.subviews);
            suggestedFrameState.time = JulianDate.now(suggestedFrameState.time);
            suggestedFrameState.strict = true;
        }

        const entities = suggestedFrameState.entities;
        const contextService = this.contextService;
        for (const id in entities) {
            contextService.updateEntityFromSerializedState(id, entities[id]);
        }

        if (entities[this.user.id])
            this._updateDeviceUserPoseFromDeviceOrientation();
        
        return suggestedFrameState;
    }

    /**
     * Request the next (suggested) frame state. Before the returned promise is resolved, 
     * the device user entity (as well as any other subscribed entities) 
     * will be updated to reflect the latest pose data. The device-user entity 
     * is the only entity which is automatically updated when calling this function; 
     * Any other data must be explicitly subscribed to in order to receive an updated pose. 
     */
    requestFrameState() : Promise<SuggestedFrameState> {
        if (this.sessionService.manager.isClosed) return Promise.reject(new Error('Session is closed'));
        if (!this.sessionService.manager.isConnected || this.sessionService.manager.version[0] === 0) {
            return new Promise((resolve) => {
                requestAnimationFrame(()=>{
                    resolve(this._onNextFrameState());
                });
            });
        }
        return this.sessionService.manager.request('ar.device.requestFrameState').then(this._onNextFrameState);
    }

    private _scratchFrameState:FrameState = {
        time:<any>{},
        entities: {},
        viewport: <any>{},
        subviews: []
    }

    private _getSerializedEntityState = getSerializedEntityState;

    private _deviceLocalOriginRelativeToDeviceUserPose = this.contextService.createEntityPose(
        this.localOrigin,
        this.user
    )

    private _scratchLocalOrigin = new Entity({
        position: new ConstantPositionProperty(undefined, undefined),
        orientation: new ConstantProperty(undefined)
    });

    public createFrameState(
        time:JulianDate,
        viewport:Viewport,
        subviewList:SerializedSubviewList,
        user:Entity,
        localOrigin?:Entity
    ) : FrameState {

        for (const s of subviewList) {
            if (!isFinite(s.projectionMatrix[0]))
                throw new Error('Invalid projection matrix (contains non-finite values)');
        }

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
                    const userRootFrame = getAncestorReferenceFrames(user)[0];
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

        const contextLocalOrigin = this.contextService.localOrigin;
        const contextUser = this.contextService.user;

        contextLocalOrigin.position = contextLocalOrigin.position || new ConstantPositionProperty();
        contextLocalOrigin.orientation = contextLocalOrigin.orientation || new ConstantProperty();
        contextUser.position = contextUser.position || new ConstantPositionProperty();
        contextUser.orientation = contextUser.orientation || new ConstantProperty();
        contextUser['meta'] = user['meta'];

        (contextLocalOrigin.position as ConstantPositionProperty).setValue(Cartesian3.ZERO, localOrigin);
        (contextLocalOrigin.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);
        (contextUser.position as ConstantPositionProperty).setValue(Cartesian3.ZERO, user);
        (contextUser.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);

        const frameState:FrameState = this._scratchFrameState;
        frameState.time = JulianDate.clone(time, frameState.time);
        frameState.viewport = Viewport.clone(viewport, frameState.viewport);
        frameState.subviews = SerializedSubviewList.clone(subviewList, frameState.subviews);

        const contextLocalOriginRootFrame = getAncestorReferenceFrames(contextLocalOrigin)[0];
        frameState.entities[contextLocalOrigin.id] = this._getSerializedEntityState(contextLocalOrigin, time, contextLocalOriginRootFrame);
        frameState.entities[contextUser.id] = this._getSerializedEntityState(contextUser, time, contextLocalOrigin);

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

    private _isPresentingHMD = false;

    get isPresentingHMD() : boolean {
        return this._isPresentingHMD;
    }

    requestPresentHMD() : Promise<void> {
        return this.sessionService.manager.request('ar.device.requestPresentHMD').then(()=>{
            this._isPresentingHMD = true; 
        });
    }

    exitPresentHMD() : Promise<void> {
        return this.sessionService.manager.request('ar.device.exitPresentHMD').then(()=>{
            this._isPresentingHMD = false;
        });
    }

    private _scratchQuaternion = new Quaternion;
    private _scratchQuaternion2 = new Quaternion;

    private _deviceOrientationListener;
    private _deviceOrientation:Quaternion|undefined;
    private _deviceOrientationHeadingAccuracy:number|undefined;

    private _updateDeviceUserPoseFromDeviceOrientation() {
        
        const deviceUser = this.user;
        const deviceLocalOrigin = this.localOrigin;
        const deviceOrientation = this._deviceOrientation;

        this._tryOrientationUpdates();

        if (!deviceOrientation) {
            deviceUser.position = undefined;
            deviceUser.orientation = undefined;
            return;
        }

        const screenOrientationDegrees = (screen['orientation'] && screen['orientation'].angle) || window.orientation || 0;

        const displayOrientation = 
            Quaternion.fromAxisAngle(
                Cartesian3.UNIT_Z, 
                - screenOrientationDegrees * CesiumMath.RADIANS_PER_DEGREE, 
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
                displayOrientation, 
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
                webkitCompassAccuracy < 50 &&
                webkitCompassHeading >= 0) {
                if (!defined(alphaOffset)) {
                    alphaOffset = -webkitCompassHeading;
                } else {
                    alphaOffset -= headingDrift;
                }
            }

            if (!defined(alphaOffset)) return;

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


}

let currentVRDisplay:any;

@autoinject()
export class DeviceServiceProvider {

    private _getSerializedEntityState = getSerializedEntityState;
    
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
        
        this.sessionService.connectEvent.addEventListener((session)=>{
            session.on['ar.device.setGeolocationOptions'] = (options) => {
                this._handleSetGeolocationOptions(session, options);
            }

            session.on['ar.device.reqeustPresentHMD'] = () => {
                return this.onRequestPresentHMD(session).then(()=>{
                    this.setPresentingHMD(true);
                })
            }

            session.on['ar.device.exitPresentHMD'] = () => {
                return this.onExitPresentHMD(session).then(()=>{
                    this.setPresentingHMD(false);
                })
            }

            session.on['ar.device.requestFrameState'] = () => {
                return this.onRequestFrameState(session);
            }

            session.send('ar.device.isPresentingHMD', {state: this._isPresentingHMD});
        });

        this.contextServiceProvider.subscribersChangeEvent.addEventListener(({id})=>{
            if (this.deviceService.localOrigin.id === id)
                this._checkDeviceGeolocationSubscribers();
        });
    }

    private _isPresentingHMD = false;

    protected setPresentingHMD(state:boolean) {
        if (state !== this._isPresentingHMD) {
            this._isPresentingHMD = state;
            for (const s of this.sessionService.managedSessions)
                s.send('ar.device.isPresentingHMD', {state});
        }
    }

    protected onRequestFrameState(session:SessionPort) : Promise<SuggestedFrameState> {
        return new Promise((resolve)=>{
            requestAnimationFrame(()=>{
                const frameState = this.update();
                this.contextServiceProvider.fillEntityStateMapForSession(session, frameState.time, frameState.entities);
                resolve(frameState);
            });
        });
    }

    protected onRequestPresentHMD(session:SessionPort) : Promise<void> {
        return Promise.reject(new Error())
    }

    public onExitPresentHMD(session:SessionPort) : Promise<void> {
        return Promise.reject(new Error())
    }

    private _suggestedFrameState = new SuggestedFrameState;
    private _getEntityPositionInReferenceFrame = getEntityPositionInReferenceFrame;
    private _getEntityOrientationInReferenceFrame = getEntityOrientationInReferenceFrame;
    private _scratchCartesianUpdate = new Cartesian3;
    private _scratchQuaternionUpdate = new Quaternion;

    public update() {
        const frameState = this._suggestedFrameState;
        const time = frameState.time = JulianDate.now(frameState.time);
        frameState.geolocationDesired = this.contextServiceProvider.geolocationDesired;
        frameState.geolocationOptions = this.contextServiceProvider.desiredGeolocationOptions;

        this.onUpdate(frameState);

        const deviceService = this.deviceService;
        const deviceLocalOrigin = deviceService.localOrigin;
        const deviceUser = deviceService.user;
        const deviceStage = this.deviceService.stage;
        
        const deviceStagePosition = this._getEntityPositionInReferenceFrame(deviceStage, time, deviceLocalOrigin, this._scratchCartesianUpdate);
        const deviceStageOrientation = this._getEntityOrientationInReferenceFrame(deviceStage, time, deviceLocalOrigin, this._scratchQuaternionUpdate);
        
        const contextStage = this.contextService.stage;
        const contextLocalOrigin = this.contextService.localOrigin;
        contextStage.position = <ConstantPositionProperty> contextStage.position || new ConstantPositionProperty();
        contextStage.orientation =  <ConstantProperty> contextStage.orientation || new ConstantProperty();
        (contextStage.position as ConstantPositionProperty).setValue(deviceStagePosition, contextLocalOrigin);
        (contextStage.orientation as ConstantProperty).setValue(deviceStageOrientation);

        frameState.entities[deviceService.user.id] = this._getSerializedEntityState(
            deviceService.user,
            time,
            deviceLocalOrigin
        );

        frameState.entities[deviceService.stage.id] = this._getSerializedEntityState(
            deviceService.stage,
            time,
            deviceLocalOrigin
        );

        const subviews = frameState.subviews;
        for (let i=0; i < frameState.subviews.length; i++) {
            const subviewEntity = this.deviceService.getSubviewEntity(i);
            subviews[i].pose = getSerializedEntityState(subviewEntity, time, deviceUser, subviews[i].pose)
        }
        
        return frameState;
    }

    public defaultUserHeightHandheld = AVERAGE_EYE_HEIGHT / 2;
    public defaultUserHeightHMD = AVERAGE_EYE_HEIGHT;

    public get defaultUserHeight() {
        return this.deviceService.isPresentingHMD ? this.defaultUserHeightHMD : this.defaultUserHeightHandheld;
    }

    private _scratchFrustum = new PerspectiveFrustum();

    protected onUpdate(frameState:SuggestedFrameState) {
        this.updateStageDefault()

        const element = this.viewService.element;
        const viewport = frameState.viewport;
        viewport.x = 0;
        viewport.y = 0;
        viewport.width = element && element.clientWidth;
        viewport.height = element && element.clientHeight;

        const subviews = frameState.subviews;
        subviews.length = 1;
        const subview = subviews[0];
        subview.viewport.x = 0;
        subview.viewport.y = 0;
        subview.viewport.width = viewport.width;
        subview.viewport.height = viewport.height;

        const aspect = viewport.width / viewport.height;
        const frustum = this._scratchFrustum;
        frustum.near = 0.01;
        frustum.far = 500000000;
        frustum.fov = Math.PI / 3;
        frustum.aspectRatio = isFinite(aspect) && aspect !== 0 ? aspect : 1;
        subview.projectionMatrix = Matrix4.clone(frustum.projectionMatrix, subview.projectionMatrix);
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
    }

    private _scratchCartesianLocalOrigin = new Cartesian3;
    private _scratchQuaternionLocalOrigin = new Quaternion;

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
    protected onStartGeolocationUpdates(options:GeolocationOptions) : Promise<void> {
        if (typeof navigator == 'undefined' || !navigator.geolocation)
            throw new Error('Unable to start geolocation updates');
        return new Promise<void>((resolve, reject) => {
            if (!defined(this._geolocationWatchId)) {
                let didResolve = false;
                this._geolocationWatchId = navigator.geolocation.watchPosition((pos) => {
                    if (!didResolve) resolve(), didResolve = true;
                    this.configureLocalOrigin(
                        pos.coords.longitude, 
                        pos.coords.latitude, 
                        pos.coords.altitude || 0, 
                        (pos.coords.accuracy > 0) ? pos.coords.accuracy : undefined,
                        pos.coords.altitudeAccuracy || undefined
                    );
                }, reject, options);
            } else {
                resolve();
            };
        });
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


export class DOMDeviceServiceProvider extends DeviceServiceProvider {

    public autoSubmitFrame = true;

    static isAvailable() {
        return typeof Document !== 'undefined' && typeof document !== 'undefined' && document instanceof Document
         && typeof Window !== 'undefined' && typeof window !== 'undefined' && window instanceof Window
         && window.document === document
    }

    constructor(
        sessionService: SessionService,
        deviceService: DeviceService,
        contextService: ContextService,
        viewService: ViewService,
        contextServiceProvider: ContextServiceProvider,
    ) {
        super(sessionService, deviceService, contextService, viewService, contextServiceProvider);

        this.contextService.postRenderEvent.addEventListener(()=>{
            if (this.autoSubmitFrame && currentVRDisplay && currentVRDisplay.isPresenting) {
                currentVRDisplay.submitFrame();
            }
        });

        let currentCanvas:HTMLElement|undefined;
        let previousPresentationMode:ViewportMode;

        const handleVRDisplayPresentChange = (e) => {
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
                    this.deviceService.exitPresentHMD();
            });
        }
        window.addEventListener('vrdisplaypresentchange', handleVRDisplayPresentChange);
    }

    protected onRequestFrameState(session:SessionPort) : Promise<SuggestedFrameState> {
        return new Promise((resolve)=>{
            this.requestAnimationFrame(()=>{
                resolve(this.update());
            })
        })
    }

    protected onUpdate(suggestedFrameState:SuggestedFrameState) {
        if (currentVRDisplay) {
           this._updateFrameStateFromWebVR(suggestedFrameState);
        } else {
            super.onUpdate(suggestedFrameState);
        }
    }
    private _vrFrameData?:any;

    private _scratchCartesian = new Cartesian3;
    private _scratchQuaternion = new Quaternion;
    private _scratchQuaternion2 = new Quaternion;
    private _scratchMatrix3 = new Matrix3;
    private _scratchMatrix4 = new Matrix4;

    private _localOriginEUS = new Entity({
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.deviceService.localOrigin),
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

    private _updateFrameStateFromWebVR(suggestedFrameState: SuggestedFrameState) {

        const vrDisplay:VRDisplay = currentVRDisplay;

        const viewport = suggestedFrameState.viewport;
        viewport.x = 0;
        viewport.y = 0;
        viewport.width = this.viewService.element.clientWidth;
        viewport.height = this.viewService.element.clientHeight;

        const vrFrameData : VRFrameData = this._vrFrameData = 
            this._vrFrameData || new VRFrameData();
        if (!vrDisplay['getFrameData'](vrFrameData)) 
            return this.deviceService.suggestedFrameState;

        const layers = vrDisplay.getLayers();
        const leftBounds = layers[0].leftBounds!;
        const rightBounds = layers[0].rightBounds!;
        
        const subviews = suggestedFrameState.subviews = suggestedFrameState.subviews || [];
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

        const user = this.deviceService.user;
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
            
            const leftEye = this.deviceService.getSubviewEntity(0);
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
            
            const rightEye = this.deviceService.getSubviewEntity(0);
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
            this.updateStageDefault();
        } else {
            const stage = this.deviceService.stage;
            stage.position = stage.position || new ConstantPositionProperty();
            stage.orientation = stage.orientation || new ConstantProperty();
            (stage.position as ConstantPositionProperty).setValue(Cartesian3.ZERO, this.deviceService.localOrigin);
            (stage.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);
        }
    }

    /**
     * Request an animation frame callback for the current view. 
     */
    public requestAnimationFrame(callback:(timestamp:number)=>void) {
        if (currentVRDisplay) {
            return (currentVRDisplay as VRDisplay).requestAnimationFrame(callback);
        } else {
            return requestAnimationFrame(callback);
        }
    }

    public cancelAnimationFrame(id:number) {
        if (currentVRDisplay) {
            return (currentVRDisplay as VRDisplay).cancelAnimationFrame(id);
        } else {
            return cancelAnimationFrame(id);
        }
    }

    onRequestPresentHMD(session:SessionPort) {
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
                    .then(requestPresent);
            }
        }
        throw new Error('No HMD available');
    }

    public onExitPresentHMD(session:SessionPort) : Promise<void> {
        if (currentVRDisplay) {
            const vrDisplay:VRDisplay = currentVRDisplay;
            currentVRDisplay = undefined;
            return vrDisplay.exitPresent();
        }
        return Promise.resolve();
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
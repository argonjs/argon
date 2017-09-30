import { autoinject } from 'aurelia-dependency-injection'
import {
    defined,
    Entity,
    EntityCollection,
    Cartographic,
    DynamicPositionProperty,
    DynamicProperty,
    Cartesian3,
    Quaternion,
    Matrix3,
    Matrix4,
    CesiumMath,
    Transforms,
    JulianDate,
    ReferenceFrame,
    PerspectiveFrustum
} from './cesium/cesium-imports'
import {
    DEFAULT_NEAR_PLANE,
    DEFAULT_FAR_PLANE,
    SerializedEntityStateMap,
    SerializedSubviewList,
    SubviewType,
    ContextFrameState,
    GeolocationOptions,
    CanvasViewport,
    Viewport
} from './common'
import { SessionService, SessionPort } from './session'
import { 
    Event,
    stringIdentifierFromReferenceFrame,
    getReachableAncestorReferenceFrames,
    getSerializedEntityState,
    getEntityPositionInReferenceFrame,
    getEntityOrientationInReferenceFrame,
    deprecated,
    eastUpSouthToFixedFrame
} from './utils'
import { EntityService, EntityServiceProvider, EntityPose, PoseStatus } from './entity'
import { DeviceService, Device } from './device'
import { ViewService } from './view'
import { PermissionServiceProvider, PermissionState } from './permission'
import { RealityService, RealityServiceProvider } from './reality'

/**
 * Provides a means of querying the current state of reality.
 */
@autoinject()
export class ContextService {

    constructor(
        protected entityService: EntityService,
        protected sessionService: SessionService,
        protected deviceService: DeviceService,
        protected viewService: ViewService,
        protected realityService: RealityService
    ) {
        this.sessionService.manager.on['ar.context.update'] = (state: ContextFrameState) => {
            const scratchFrustum = this._scratchFrustum;

            // backwards-compat
            if (typeof state.reality !== 'string') {
                state.reality = state.reality && state.reality['uri'];
            }
            if (!state.viewport && state['view'] && state['view'].viewport) {
                state.viewport = state['view'].viewport;
            }
            if (!state.subviews && state['view'] && state['view'].subviews) {
                state.subviews = state['view'].subviews;
                scratchFrustum.near = DEFAULT_NEAR_PLANE;
                scratchFrustum.far = DEFAULT_FAR_PLANE;
                for (const s of state.subviews) {
                    const frustum = s['frustum'];
                    scratchFrustum.xOffset = frustum.xOffset || 0;
                    scratchFrustum.yOffset = frustum.yOffset || 0;
                    scratchFrustum.fov = frustum.fov || CesiumMath.PI_OVER_THREE;
                    scratchFrustum.aspectRatio = frustum.aspectRatio || 1;
                    s.projectionMatrix = Matrix4.clone(scratchFrustum.projectionMatrix, s.projectionMatrix);
                }
            }
            if (!state.entities![this.user.id] && state['view'] && state['view'].pose) {
                state.entities![this.user.id] = state['view'].pose;
            }
            // end backwards-compat

            // the `skipEvents` flag skips update/render events,
            // allowing a reality to process 'ar.context.update' so it knows 
            // what the current state of the system is, while maintaining control
            // over it's frame timing (by calling submitFrameState)
            const skipEvents = this.sessionService.isRealityViewer
            this._update(state, skipEvents);
        }
        
        this._scratchFrustum.near = DEFAULT_NEAR_PLANE;
        this._scratchFrustum.far = DEFAULT_FAR_PLANE;
        this._scratchFrustum.fov = CesiumMath.PI_OVER_THREE;
        this._scratchFrustum.aspectRatio = 1;

        this._serializedFrameState = {
            reality: undefined,
            time: JulianDate.now(),
            entities: {},
            viewport: new CanvasViewport,
            subviews:  [{
                type: SubviewType.SINGULAR,
                viewport: new Viewport,
                projectionMatrix: this._scratchFrustum.projectionMatrix
            }],
        };
    }

    public get entities() : EntityCollection { return this.entityService.collection }

    /**
     * An event that is raised after managed entities have been updated for 
     * the current frame. 
     */
    public updateEvent = new Event<ContextService>();

    /**
     * An event that is raised when it is an approriate time to render graphics. 
     * This event fires after the update event. 
     */
    public renderEvent = new Event<ContextService>();

    /**
     * An event that is raised after the render event 
     */
    public postRenderEvent = new Event<ContextService>();
    
    /**
     * An event that fires when the origin changes.
     */
    public originChangeEvent = new Event<void>();

    /**
     * An event that fires when the local origin changes.
     */
    @deprecated('originChangeEvent')
    public get localOriginChangeEvent() {return this.originChangeEvent};

    /**
     * A monotonically increasing value (in milliseconds) for the current frame state.
     * This value is useful only for doing accurate *timing*, not for determining 
     * the absolute time. Use [[ContextService.time]] for absolute time. 
     * This value is -1 until the first [[ContextService.updateEvent]]. 
     */
    public timestamp = -1;

    /**
     * The time in milliseconds since the previous timestamp, 
     * capped to [[ContextService.maxDeltaTime]]
     */
    public deltaTime = 0;

    /**
     * This value caps the deltaTime for each frame. By default, 
     * the value is 1/3s (333.3ms)
     */
    public maxDeltaTime = 1 / 3 * 1000;

    /**
     * The current (absolute) time according to the current reality.
     * This value is arbitrary until the first [[ContextService.updateEvent]]. 
     */
    public time = new JulianDate(0,0);

     /**
     * An entity representing the origin, which is oriented 
     * with +Y up. The origin changes infrequently, is platform dependent,
     * and is the suggested origin for a rendering scenegraph. 
     * 
     * Any time the origin changes, the originChange event is raised. 
     */
    public origin: Entity = this.entities.add(new Entity({
        id: 'ar.origin',
        name: 'Origin',
        position: new DynamicPositionProperty(undefined, ReferenceFrame.FIXED),
        orientation: new DynamicProperty(undefined)
    }));

    /**
     * Returns the DOF support of the reality.
     * "none"|"3DOF"|"6DOF"
     */
    public get userTracking() {
        return this._serializedFrameState && this._serializedFrameState.userTracking || '3DOF';
    }

    /** alias for origin */
    @deprecated('origin')
    public get localOrigin() { return this._localOrigin }
    private _localOrigin = this.entities.add(new Entity({
        id: 'ar.localOrigin',
        name: 'Local Origin',
        position: new DynamicPositionProperty(Cartesian3.ZERO, this.origin),
        orientation: new DynamicProperty(Quaternion.IDENTITY)
    }));

    // To be removed. This is no longer useful.
    @deprecated()
    public get localOriginEastUpSouth() {return this._localOrigin;}

    // To be removed. This is no longer useful.
    @deprecated()
    public get localOriginEastNorthUp() { return this._localOriginEastNorthUp; }
    private _localOriginEastNorthUp: Entity = this.entities.add(new Entity({
        id: 'ar.localOriginENU',
        name: 'Local Origin (ENU)',
        position: new DynamicPositionProperty(Cartesian3.ZERO, this.origin),
        orientation: new DynamicProperty(Quaternion.fromAxisAngle(Cartesian3.UNIT_X, -Math.PI / 2))
    }));

    /**
     * A coordinate system representing the physical space in which the user is free to move 
     * around with high-precision tracking, and positioned on the surface the user is standing on. 
     * This space is oriented such that a platform-dependent "forward" corresponds to -Z.
     */
    public stage: Entity = this.entities.add(new Entity({
        id: 'ar.stage',
        name: 'Stage',
        position: new DynamicPositionProperty(undefined, ReferenceFrame.FIXED),
        orientation: new DynamicProperty(undefined)
    }));

    /**
     * A coordinate system positioned at the stage, 
     * where +X is east, +Y is up, and +Z is south (East-Up-South), if geolocation is known.
     * If geolocation is unknown, this entity has an undefined pose. 
     */
    public stageEUS: Entity = this.entities.add(new Entity({
        id: 'ar.stageEUS',
        name: 'Stage (EUS)',
        position: new DynamicPositionProperty(undefined, this.stage),
        orientation: new DynamicProperty(undefined)
    }))

    /**
     * A coordinate system positioned at the stage, 
     * where +X is east, +Y is north, and +Z is up (East-North-Up), if geolocation is known.
     * If geolocation is unknown, this entity has an undefined pose. 
     */
    public stageENU: Entity = this.entities.add(new Entity({
        id: 'ar.stageENU',
        name: 'Stage (ENU)',
        position: new DynamicPositionProperty(undefined, this.stage),
        orientation: new DynamicProperty(undefined)
    }))

    /**
     * A coordinate system representing the floor.
     * While the `stage` always represents a physical surface, 
     * the `floor` entity may represent a virtual floor.
     */
    public floor: Entity = this.entities.add(new Entity({
        id: 'ar.floor',
        name: 'Floor',
        position: new DynamicPositionProperty(Cartesian3.ZERO, this.stage),
        orientation: new DynamicProperty(Quaternion.IDENTITY)
    }));

    /**
     * An coordinate system representing the user,
     * where +X is right, +Y is up, and -Z is the direction the user is facing
     */
    public user: Entity = this.entities.add(new Entity({
        id: 'ar.user',
        name: 'User',
        position: new DynamicPositionProperty(undefined, this.stage),
        orientation: new DynamicProperty(undefined)
    }));
    
    /**
     * An coordinate system representing the rendering view, 
     * where +X is right, +Y is up, and -Z is the direction of the view.
     */
    public view: Entity = this.entities.add(new Entity({
        id: 'ar.view',
        name: 'View',
        position: new DynamicPositionProperty(Cartesian3.ZERO, this.user),
        orientation: new DynamicProperty(Quaternion.IDENTITY)
    }));

    /**
     * The default reference frame to use when calling `getEntityPose`.
     * By default, this is the `origin` reference frame.
     */
    public defaultReferenceFrame: Entity|ReferenceFrame = this.origin;

    /**
     * The serialized frame state for this frame
     */
    public get serializedFrameState() {
        return this._serializedFrameState;
    }

    // the current serialized frame state
    private _serializedFrameState: ContextFrameState;

    private _updatingEntities = new Set<string>();
    private _knownEntities = new Set<string>();

    private _scratchCartesian = new Cartesian3;
    private _scratchQuaternion = new Quaternion;
    private _scratchFrustum = new PerspectiveFrustum();

    /**
     * Deprecated. Use timestamp property.
     * @private
     */
    @deprecated('timestamp')
    public get systemTime() {
        return this.timestamp;
    } 

    /**
     * Deprecated. To be removed. 
     * @private
     */
    @deprecated('time')
    public getTime(): JulianDate {
        return this.time;
    }

    /**
     * Deprecated. To be removed. Use the defaultReferenceFrame property if necessary. 
     * @private
     */
    @deprecated()
    public setDefaultReferenceFrame(origin: Entity|ReferenceFrame) {
        this.defaultReferenceFrame = origin;
    }

    /**
     * Deprecated. To be removed.  Use the defaultReferenceFrame property. 
     * @private
     */
    @deprecated('defaultReferenceFrame')
    public getDefaultReferenceFrame(): Entity|ReferenceFrame {
        return this.defaultReferenceFrame;
    }

    /**
     * Subscribe to pose updates for an entity specified by the given id
     * 
     * @deprecated Use [[ContextService#subscribe]]
     * @param id - the id of the desired entity
     * @returns A new or existing entity instance matching the given id
     */
    @deprecated('subscribe')
    public subscribeToEntityById(id: string): Entity {
        this.subscribe(id);
        return this.entities.getOrCreateEntity(id);
    }

    /**
     * Subscribe to pose updates for the given entity id
     * 
     * @returns A Promise that resolves to a new or existing entity 
     * instance matching the given id, if the subscription is successful
     */
    public subscribe: (idOrEntity: string|Entity, options?:{}, session?:SessionPort) => Promise<Entity> = this.entityService.subscribe.bind(this.entityService);

    /**
     * Unsubscribe to pose updates for the given entity id
     */
    public unsubscribe: (idOrEntity: string|Entity, session?:SessionPort) => void = this.entityService.unsubscribe.bind(this.entityService);

    /**
     * Get the cartographic position of an Entity for the current context time
     */
    public getEntityCartographic(entity:Entity, result?:Cartographic) : Cartographic|undefined {
        return this.entityService.getCartographic(entity, this.time, result);
    }

    /**
     * Deprecated. Use `EntityService.createFixed` (`app.entity.createFixed`);
     */
    @deprecated('EntityService.createFixed')
    public createGeoEntity(cartographic:Cartographic, localToFixed:typeof Transforms.eastNorthUpToFixedFrame) {
        return this.entityService.createFixed(cartographic, localToFixed);
    }

    /**
     * Create a new EntityPose instance to represent the pose of an entity
     * relative to a given reference frame. If no reference frame is specified,
     * then the pose is based on the context's defaultReferenceFrame.
     * 
     * @param entityOrId - the entity to track
     * @param referenceFrameOrId - The intended reference frame. Defaults to `this.defaultReferenceFrame`.
     */
    public createEntityPose(entityOrId: Entity|string, referenceFrameOrId: string | ReferenceFrame | Entity = this.defaultReferenceFrame) : EntityPose {            
        return this.entityService.createEntityPose(entityOrId, referenceFrameOrId);
    }

    /**
     * Gets the current pose of an entity, relative to a given reference frame.
     *
     * @param entityOrId - The entity whose state is to be queried.
     * @param referenceFrameOrId - The intended reference frame. Defaults to `this.defaultReferenceFrame`.
     */
    public getEntityPose(entityOrId: Entity|string, referenceFrameOrId: string | ReferenceFrame | Entity = this.defaultReferenceFrame): EntityPose {
        return this.entityService.getEntityPose(entityOrId, referenceFrameOrId, this.time);
    }

    private _frameIndex = -1;

    /**
     * Process the next frame state (which should come from the current reality viewer)
     */
    public submitFrameState(frameState: ContextFrameState) {
        frameState.index = ++this._frameIndex;
        this._update(frameState);
    }

    private _scratchFrameState:ContextFrameState = {
        time:<any>{},
        entities: {},
        viewport: <any>{},
        subviews: []
    }

    private _getSerializedEntityState = getSerializedEntityState;
    private _getEntityPositionInReferenceFrame = getEntityPositionInReferenceFrame;
    private _getEntityOrientationInReferenceFrame = getEntityOrientationInReferenceFrame;
    private _eastUpSouthToFixedFrame = eastUpSouthToFixedFrame;
    private _eastNorthUpToFixedFrame = Transforms.eastNorthUpToFixedFrame;
    private _getReachableAncestorReferenceFrames = getReachableAncestorReferenceFrames;
    private _scratchArray = [];

    /**
     * Create a frame state.
     * 
     * @param time 
     * @param viewport 
     * @param subviewList 
     * @param userTracking
     * @param entityOptions 
     */
    public createFrameState(
        time:JulianDate,
        viewport:CanvasViewport,
        subviewList:SerializedSubviewList,
        options?: {overrideStage?:boolean, overrideUser?:boolean, overrideView?:boolean, overrideSubviews?:boolean, floorOffset?:number, userTracking?:"none"|"3DOF"|"6DOF"}
    ) : ContextFrameState {

        let overrideUser = options && options.overrideUser;
        if (this.deviceService.strict) {
            if (overrideUser) {
                overrideUser = false;
            }
        }

        const frameState:ContextFrameState = this._scratchFrameState;
        frameState.time = JulianDate.clone(time, frameState.time);
        frameState.viewport = CanvasViewport.clone(viewport, frameState.viewport)!;
        frameState.subviews = SerializedSubviewList.clone(subviewList, frameState.subviews)!;
        const entities = frameState.entities = {};

        const getSerializedEntityState = this._getSerializedEntityState;

        // stage
        const stage = this.stage;
        if (options && options.overrideStage) {
            entities[stage.id] = getSerializedEntityState(stage, time, undefined);
        }

        // user
        const user = this.user;
        if (overrideUser) {
            entities[user.id] = getSerializedEntityState(user, time, stage);
        }

        // view
        const view = this.view;
        if (options && options.overrideView) {
            entities[view.id] = getSerializedEntityState(view, time, user);
        }
        
        // subviews
        if (options && options.overrideSubviews) {
            for (let index=0; index < subviewList.length; index++) {
                // check for valid projection matrices
                const subview = subviewList[index];
                if (!isFinite(subview.projectionMatrix[0]))
                    throw new Error('Invalid projection matrix (contains non-finite values)');
                // subview
                const subviewEntity = this.getSubviewEntity(index);
                entities[subviewEntity.id] = getSerializedEntityState(subviewEntity, time, view);
            }
        }

        // floor
        const floorOffset = options && options.floorOffset || 0;
        const floor = this.floor;
        (floor.position as DynamicPositionProperty).setValue(Cartesian3.fromElements(0,floorOffset,0, this._scratchCartesian), stage);
        if (floorOffset !== 0) {
            frameState.entities[this.floor.id] = getSerializedEntityState(floor, time, stage);
        }

        // user tracking
        frameState.userTracking = options && options.userTracking;

        return frameState;
    }

    private _scratchMatrix3 = new Matrix3;
    private _scratchMatrix4 = new Matrix4;

    // All of the following work is only necessary when running in an old manager (version === 0)
    private _updateBackwardsCompatability(frameState:ContextFrameState) {
        this._knownEntities.clear();

        // update the entities the manager knows about
        const entityService = this.entityService;
        for (const id in frameState.entities) {
            entityService.updateEntityFromSerializedState(id, frameState.entities[id]);
            this._updatingEntities.add(id);
            this._knownEntities.add(id);
        }

        // if the mangager didn't send us an update for a particular entity,
        // assume the manager no longer knows about it
        for (const id of <string[]><any>this._updatingEntities) {
            if (!this._knownEntities.has(id)) {
                let entity = this.entities.getById(id);
                if (entity) {
                    if (entity.position) (entity.position as DynamicPositionProperty).setValue(undefined);
                    if (entity.orientation) (entity.orientation as DynamicProperty).setValue(undefined);
                }
                this._updatingEntities.delete(id);
            }
        }

        // If running within an older manager, we have to set the stage based on the user pose. 
        const userPositionFixed = this._getEntityPositionInReferenceFrame(
            this.user,
            frameState.time,
            ReferenceFrame.FIXED,
            this._scratchCartesian
        );
        if (userPositionFixed) {
            const eusToFixedFrameTransform = eastUpSouthToFixedFrame(userPositionFixed, undefined, this._scratchMatrix4);
            const eusRotationMatrix = Matrix4.getRotation(eusToFixedFrameTransform, this._scratchMatrix3);
            const eusOrientation = Quaternion.fromRotationMatrix(eusRotationMatrix);
            (this.stage.position as DynamicPositionProperty).setValue(userPositionFixed, ReferenceFrame.FIXED);
            (this.stage.orientation as DynamicProperty).setValue(eusOrientation);
        } else {
            (this.stage.position as DynamicPositionProperty).setValue(Cartesian3.fromElements(0,-this.deviceService.suggestedUserHeight, 0, this._scratchCartesian), this.user.position!.referenceFrame);
            (this.stage.orientation as DynamicProperty).setValue(Quaternion.IDENTITY);
        }
        frameState.entities[this.stage.id] = <any>true; // assume overriden for _update
    }

    // TODO: This function is called a lot. Potential for optimization. 
    private _update(frameState: ContextFrameState, skipEvents?:boolean) {
        this._serializedFrameState = frameState;

        // update our time values
        const timestamp = performance.now();
        this.deltaTime = Math.min(timestamp - this.timestamp, this.maxDeltaTime);
        this.timestamp = timestamp;
        JulianDate.clone(<JulianDate>frameState.time, this.time);

        // update provided entities
        if (this.sessionService.manager.isConnected && this.sessionService.manager.version[0] === 0) {
            this._updateBackwardsCompatability(frameState);
        } else {
            this._updateEntities(frameState.entities);
        }

        // update device entities (device service needs to know if manager is overriding it's entities)
        this.deviceService._processContextFrameState(frameState);

        // update context entities
        this._updateContextEntities(frameState);
        this._updateStageGeo();

        // update view and reality service
        this.viewService._processContextFrameState(frameState, this);
        this.realityService._processContextFrameState(frameState); 

        // exit early if onlyUpdate flag is set
        if (skipEvents) return;

        // raise origin change event if necessary
        this._checkOriginChange();

        // raise events for the user to update and render the scene
        this.updateEvent.raiseEvent(this);
        this.renderEvent.raiseEvent(this);
        this.postRenderEvent.raiseEvent(this);

        // publish frameState to the manager (noop if this session is not a reality)
        this.realityService._publishContextFrameState(frameState);

        // submit frame if necessary
        this._trySubmitFrame();
    }

    _updateEntities(entities:SerializedEntityStateMap) {
        const entityService = this.entityService;
        for (const id in entities) {
            entityService.updateEntityFromSerializedState(id, entities[id]);
        }
    }

    _updateContextEntities(frameState:ContextFrameState) {
        const time = frameState.time;
        const entities = frameState.entities;
        
        // If the reality did not override the stage, then set the origin to the device origin.
        // Otherwise, find the appropriate origin pose. 
        const contextOrigin = this.origin;
        const contextStage = this.stage;
        const deviceOrigin = this.deviceService.origin;
        const deviceStage = this.deviceService.stage;
        const contextStagePosition = contextStage.position as DynamicPositionProperty;
        const contextStageOrientation = contextStage.orientation as DynamicProperty;
        const contextOriginPosition = contextOrigin.position as DynamicPositionProperty;
        const contextOriginOrientation = contextOrigin.orientation as DynamicProperty;
        if (!entities[contextStage.id]) {
            contextStagePosition.setValue(Cartesian3.ZERO, deviceStage);
            contextStageOrientation.setValue(Quaternion.IDENTITY);
            contextOriginPosition.setValue(Cartesian3.ZERO, deviceOrigin);
            contextOriginOrientation.setValue(Quaternion.IDENTITY);
        } else { 
            // first figure out where the origin should be
            const originRelativeToStage = this.getEntityPose(deviceOrigin, deviceStage);
            contextOriginPosition.setValue(originRelativeToStage.position, contextStage);
            contextOriginOrientation.setValue(originRelativeToStage.orientation);
            // then convert the origin to the same frame used by the overridden stage
            const rootFrame = getReachableAncestorReferenceFrames(contextStage, time, this._scratchArray)[0];
            if (!defined(rootFrame)) throw new Error("Stage frame must have a reachable parent reference frame!");
            const originRelativeToRoot = this.getEntityPose(contextOrigin, rootFrame);
            contextOriginPosition.setValue(originRelativeToRoot.position, rootFrame);
            contextOriginOrientation.setValue(originRelativeToRoot.orientation);
        }

        // update user entity (relative to origin) based on device user (relative to device origin) if the reality did not override it
        const deviceUser = this.deviceService.user;
        const contextUser = this.user;
        if (!entities[contextUser.id]) {
            const userRelativeToOrigin = this.getEntityPose(deviceUser, deviceOrigin);
            const contextUserPosition = contextUser.position as DynamicPositionProperty;
            const contextUserOrientation = contextUser.orientation as DynamicProperty;
            contextUserPosition.setValue(userRelativeToOrigin.position, contextOrigin);
            contextUserOrientation.setValue(userRelativeToOrigin.orientation);
        }

        // update view entity (if the reality did not set it)
        const contextView = this.view;
        if (!entities[contextView.id]) {
            const contextViewPosition = contextView.position as DynamicPositionProperty;
            const contextViewOrientation = contextView.orientation as DynamicProperty;
            contextViewPosition.setValue(Cartesian3.ZERO, contextUser);
            contextViewOrientation.setValue(Quaternion.IDENTITY);
        }

        // update subview entities (if the reality did not set them)
        for (let i=0; i<frameState.subviews.length; i++) {
            if (!entities['ar.view_' + i]) {
                const deviceSubview = this.deviceService.getSubviewEntity(i);
                const contextSubview = this.getSubviewEntity(i);
                const subviewPositionValue = this._getEntityPositionInReferenceFrame(deviceSubview, time, deviceUser, this._scratchCartesian);
                const subviewOrientationValue = this._getEntityOrientationInReferenceFrame(deviceSubview, time, deviceUser, this._scratchQuaternion);
                const contextSubviewPosition = contextSubview.position as DynamicPositionProperty;
                const contextSubviewOrientation = contextSubview.orientation as DynamicProperty;
                contextSubviewPosition.setValue(subviewPositionValue, contextView);
                contextSubviewOrientation.setValue(subviewOrientationValue);
            }
        }

        // update floor entity (if the reality did not set it)
        if (!entities[this.floor.id]) {
            const floorPosition = this.floor.position as DynamicPositionProperty;
            floorPosition.setValue(Cartesian3.ZERO, contextStage);
        }
    }

    _updateStageGeo() {
        // update stageEUS and stageENU
        const time = this.time;
        const contextStage = this.stage;
        const stageFixedPosition = this._getEntityPositionInReferenceFrame(contextStage, time, ReferenceFrame.FIXED, this._scratchCartesian);
        if (stageFixedPosition) { // TODO: only do this math if fixed position differs from previous frame
            // EUS
            const eusTransform = this._eastUpSouthToFixedFrame(stageFixedPosition, undefined, this._scratchMatrix4);
            const eusRotation = Matrix4.getRotation(eusTransform, this._scratchMatrix3);
            const eusOrientation = Quaternion.fromRotationMatrix(eusRotation, this._scratchQuaternion);
            (this.stageEUS.position as DynamicPositionProperty).setValue(stageFixedPosition, ReferenceFrame.FIXED);
            (this.stageEUS.orientation as DynamicProperty).setValue(eusOrientation);
            // ENU
            const enuTransform = this._eastNorthUpToFixedFrame(stageFixedPosition, undefined, this._scratchMatrix4);
            const enuRotation = Matrix4.getRotation(enuTransform, this._scratchMatrix3);
            const enuOrientation = Quaternion.fromRotationMatrix(enuRotation, this._scratchQuaternion);
            (this.stageENU.position as DynamicPositionProperty).setValue(stageFixedPosition, ReferenceFrame.FIXED);
            (this.stageENU.orientation as DynamicProperty).setValue(enuOrientation);
        } else {
            (this.stageEUS.position as DynamicPositionProperty).setValue(undefined, ReferenceFrame.FIXED);
            (this.stageEUS.orientation as DynamicProperty).setValue(undefined);
            (this.stageENU.position as DynamicPositionProperty).setValue(undefined, ReferenceFrame.FIXED);
            (this.stageENU.orientation as DynamicProperty).setValue(undefined);
        }
    }

    private _previousOriginReferenceFrame? : ReferenceFrame|Entity;
    _checkOriginChange() {
        const time = this.time;
        const originReferenceFrame = this._getReachableAncestorReferenceFrames(this.origin, time, this._scratchArray)[0] || ReferenceFrame.FIXED;
        const originPose = this.getEntityPose(this.origin, originReferenceFrame);
        if (originReferenceFrame !== this._previousOriginReferenceFrame || originPose.status & PoseStatus.CHANGED) {
            this._previousOriginReferenceFrame = originReferenceFrame;
            if (this.sessionService.isRealityAugmenter) console.log('Updated context origin to ' + JSON.stringify(originPose.position) + " at " + stringIdentifierFromReferenceFrame(originReferenceFrame));
            this.originChangeEvent.raiseEvent(undefined);
        }
    }

    _trySubmitFrame() {
        const vrDisplay:VRDisplay|undefined = this.deviceService.vrDisplay;
        if (this.deviceService.autoSubmitFrame && 
            vrDisplay && vrDisplay.isPresenting && 
            !this.sessionService.isRealityViewer) {
            vrDisplay.submitFrame();
        }
    }
        
    getSubviewEntity(index:number) {
        const subviewEntity = this.entityService.collection.getOrCreateEntity('ar.view_'+index);
        if (!subviewEntity.position) {
            subviewEntity.position = new DynamicPositionProperty(Cartesian3.ZERO, this.user);
        }
        if (!subviewEntity.orientation) {
            subviewEntity.orientation = new DynamicProperty(Quaternion.IDENTITY);
        }
        return subviewEntity;
    }


    subscribeGeolocation(options?:GeolocationOptions) : Promise<void> {
        return this.sessionService.manager.whenConnected().then(()=>{
            if (this.sessionService.manager.versionNumber >= 1.4)
                return this.entityService.subscribe(this.origin.id, options).then(()=>{});
            else 
                return this.entityService.subscribe(this.stage.id, options).then(()=>{});
        });
    }

    unsubscribeGeolocation() : void {
        this.sessionService.manager.whenConnected().then(()=>{
            if (this.sessionService.manager.versionNumber >= 1.4)
                this.entityService.unsubscribe(this.origin.id);
            else 
                this.entityService.unsubscribe(this.stage.id);
        });
    }

    private _getInheritedMetaProperty(entity, metaPropKey:string) {
        let referenceFrame = <Entity|undefined>entity.position!.referenceFrame;
        while (referenceFrame) {
            const metaProp = referenceFrame['meta'] && referenceFrame['meta'][metaPropKey];
            if (defined(metaProp)) return metaProp;
            referenceFrame = referenceFrame.position && <Entity>referenceFrame.position.referenceFrame;
        }
    }

    /**
     * If geopose is available, this is the accuracy of the user heading
     */
    public get geoHeadingAccuracy() : number|undefined {
        return this._getInheritedMetaProperty(this.user, 'geoHeadingAccuracy');
    }

    /**
     * If geopose is available, this is the horizontal accuracy of the user geolocation
     */
    public get geoHorizontalAccuracy() : number|undefined {
        return this._getInheritedMetaProperty(this.stage, 'geoHorizontalAccuracy');
    }
    
    /**
     * If geopose is available, this is the vertical accuracy of the user geolocation
     */
    public get geoVerticalAccuracy() : number|undefined {
        return this._getInheritedMetaProperty(this.stage, 'geoVerticalAccuracy');
    }


    /**
     * @deprecated
     */
    private get geoposeHeadingAccuracy() : number|undefined {
        return this.geoHeadingAccuracy;
    }

    /**
     * @deprecated
     */
    private get geoposeHorizontalAccuracy() : number|undefined {
        return this.geoHorizontalAccuracy;
    }

    /**
     * @deprecated
     */
    private get geoposeVerticalAccuracy() : number|undefined {
        return this.geoVerticalAccuracy;
    }

}

@autoinject()
export class ContextServiceProvider {
    
    private _cacheTime = new JulianDate(0,0);

    constructor(
        protected sessionService:SessionService,
        protected contextService:ContextService,
        protected deviceService:DeviceService,
        protected entityServiceProvider:EntityServiceProvider,
        protected permissionServiceProvider:PermissionServiceProvider,
        protected realityServiceProvider:RealityServiceProvider,
        protected device:Device
    ) {
        // subscribe to context geolocation if any child sessions have subscribed
        this.entityServiceProvider.sessionSubscribedEvent.addEventListener((evt)=>{
            if (evt.id === this.contextService.stage.id && evt.session !== this.sessionService.manager) {
                this._setGeolocationOptions(evt.session, evt.options);
                this.contextService.subscribeGeolocation(this.desiredGeolocationOptions);
            }
        })

        // unsubscribe from context geolocation if all child sessions are unsubscribed
        this.entityServiceProvider.sessionUnsubscribedEvent.addEventListener(()=>{
            const subscribers = this.entityServiceProvider.subscribersByEntity.get(this.contextService.stage.id);
            if (subscribers && subscribers.size === 1 && subscribers.has(this.sessionService.manager)) {
                this.contextService.unsubscribeGeolocation();
            }
        });

        this.sessionService.connectEvent.addEventListener((session)=>{
            const subscriptions = this.entityServiceProvider.subscriptionsBySubscriber.get(session)!;
            subscriptions[this.contextService.user.id] = {};
            subscriptions[this.contextService.stage.id] = {};
            subscriptions[this.deviceService.user.id] = {};
            subscriptions[this.deviceService.stage.id] = {};
        })
        
        // submit frame state from reality
        this.realityServiceProvider.nextFrameStateEvent.addEventListener((frameState)=>{
            this.contextService.submitFrameState(frameState);
            this._publishFrameState(); // publish frame state to child sessions
        })
    }
    
    private _publishFrameState() {
        const state = this.contextService.serializedFrameState!;
        this._cacheTime = JulianDate.clone(state.time, this._cacheTime);
        for (const session of this.sessionService.managedSessions) {
            this._sendUpdateForSession(state, session);
        }
    }

    private _sessionEntities:SerializedEntityStateMap = {};
    // private _temp:any = {};

    private _includedFrames = {};
    private _excludedFrames = {};

    private _sendUpdateForSession(state:ContextFrameState, session: SessionPort) {
        const sessionEntities = this._sessionEntities;
        const entityServiceProvider = this.entityServiceProvider

        // clear session entities
        for (var id in sessionEntities) {
            delete sessionEntities[id];
        }

        // reference all entities from the primary frame state.
        if (state.entities) {
            for (var id in state.entities) {
                sessionEntities[id] = state.entities[id];
            }
        }

        // identify frames to hide from the session
        const excludedFrames = this._excludedFrames;
        for (id in excludedFrames) delete excludedFrames[id]; //clear

        // exclude device orientation frame since each session can get this directly
        if (session.versionNumber > 1.4)
            excludedFrames[this.device.deviceOrientation.id] = true; 

        // exclude geolocated frames if necessary 
        if (this.permissionServiceProvider.getPermissionState(session, 'geolocation') != PermissionState.GRANTED) {
            excludedFrames[this.deviceService.origin.id] = true;
            excludedFrames[this.contextService.origin.id] = true;
        } else {
            delete excludedFrames[this.deviceService.origin.id];
            delete excludedFrames[this.contextService.origin.id];
        }

        // identity frames to provide to the session
        const includedFrames = this._includedFrames;
        for (id in includedFrames) delete includedFrames[id]; //clear

        const subscriptions = entityServiceProvider.subscriptionsBySubscriber.get(session);
        if (subscriptions) {
            for (var id in subscriptions) {
                includedFrames[id] = true;
            }
        }

        includedFrames['ar.device.stage'] = true;
        includedFrames['ar.device.user'] = true;

        includedFrames['ar.stage'] = true;
        includedFrames['ar.user'] = true;
        includedFrames['ar.view'] = true;

        for (var i=0; i < state.subviews.length; i++) {
            includedFrames['ar.view_' + i] = true;
            includedFrames['ar.device.view_' + i] = true;
        }

        subscriptions && entityServiceProvider.fillEntityStateMap(sessionEntities, state.time, subscriptions, excludedFrames);
             
        // recycle the frame state object, but with the session entities
        const parentEntities = state.entities;
        state.entities = sessionEntities;
        state.time = state.time;
        state.sendTime = JulianDate.now(state.sendTime);

        // send
        session.send('ar.context.update', state);

        // restore the parent entities
        state.entities = parentEntities;
    }

    public desiredGeolocationOptions:GeolocationOptions = {};
    public sessionGeolocationOptions = new Map<SessionPort, GeolocationOptions|undefined>();

    private _setGeolocationOptions(session:SessionPort, options?:GeolocationOptions) {
        this.sessionGeolocationOptions.set(session, options);
        session.closeEvent.addEventListener(()=>{
            this.sessionGeolocationOptions.delete(session);
            this._updateDesiredGeolocationOptions();
        });
        this._updateDesiredGeolocationOptions();
    }

    private _updateDesiredGeolocationOptions() {
        const reducedOptions:GeolocationOptions = {};
        this.sessionGeolocationOptions.forEach((options, session)=>{
            reducedOptions.enableHighAccuracy = 
                reducedOptions.enableHighAccuracy || (options && options.enableHighAccuracy) || false;
        });
        if (this.desiredGeolocationOptions.enableHighAccuracy !== reducedOptions.enableHighAccuracy) {
            this.desiredGeolocationOptions = reducedOptions;
        }
    }
}
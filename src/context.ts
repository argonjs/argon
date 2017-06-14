import { autoinject } from 'aurelia-dependency-injection'
import {
    Entity,
    EntityCollection,
    Cartographic,
    ConstantPositionProperty,
    ConstantProperty,
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
    Role,
    GeolocationOptions,
    CanvasViewport,
    Viewport
} from './common'
import { SessionService, SessionPort } from './session'
import { 
    Event,
    stringIdentifierFromReferenceFrame,
    // getReachableAncestorReferenceFrames,
    getSerializedEntityState,
    getEntityPositionInReferenceFrame,
    getEntityOrientationInReferenceFrame,
    deprecated,
    decomposePerspectiveProjectionMatrix 
} from './utils'
import { EntityService, EntityServiceProvider, EntityPose } from './entity'
import { DeviceService } from './device'
import { eastUpSouthToFixedFrame } from './utils'
import { ViewService } from './view'
import { PermissionState, PermissionServiceProvider } from './permission'

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

            this._update(state);
        }

        this.origin.definitionChanged.addEventListener((origin, property)=>{
            if (property === 'position' || property === 'orientation') {
                if (origin.position) {
                    origin.position.definitionChanged.addEventListener(()=>{
                        this._originChanged = true;
                    });
                }
                if (origin.orientation) {
                    origin.orientation.definitionChanged.addEventListener(()=>{
                        this._originChanged = true;
                    });
                }
                this._originChanged = true;
            }
        });

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
    private _originChanged = false;

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
     * An entity representing the local origin, which is oriented 
     * with +Y up. The local origin changes infrequently, is platform dependent,
     * and is the suggested origin for a rendering scenegraph. 
     * 
     * Any time the local origin changes, the localOriginChange event is raised. 
     */
    public origin: Entity = this.entities.add(new Entity({
        id: 'ar.origin',
        name: 'Origin',
        position: new ConstantPositionProperty(undefined, ReferenceFrame.FIXED),
        orientation: new ConstantProperty(undefined)
    }));

    /** alias for origin */
    @deprecated('origin')
    public get localOrigin() { return this._localOrigin }
    private _localOrigin = this.entities.add(new Entity({
        id: 'ar.localOrigin',
        name: 'Local Origin',
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.origin),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
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
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.localOriginEastNorthUp),
        orientation: new ConstantProperty(Quaternion.fromAxisAngle(Cartesian3.UNIT_X, -Math.PI / 2))
    }));

    /**
     * A coordinate system representing the physical space in which the user is free to 
     * move around, positioned on the surface the user is standing on,
     * where +X is east, +Y is up, and +Z is south (East-Up-South), if geolocation is known.
     * If the stage is not geolocated, then the +X and +Z directions are arbitrary. 
     */
    public stage: Entity = this.entities.add(new Entity({
        id: 'ar.stage',
        name: 'Stage',
        position: new ConstantPositionProperty(undefined, ReferenceFrame.FIXED),
        orientation: new ConstantProperty(undefined)
    }));

    /**
     * A coordinate system representing the floor.
     * While the `stage` always represents a physical surface, 
     * the `floor` entity may represent a virtual floor.
     */
    public floor: Entity = this.entities.add(new Entity({
        id: 'ar.floor',
        name: 'Floor',
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.stage),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    }));

    /**
     * An coordinate system representing the user,
     * where +X is right, +Y is up, and -Z is the direction the user is facing
     */
    public user: Entity = this.entities.add(new Entity({
        id: 'ar.user',
        name: 'User',
        position: new ConstantPositionProperty(undefined, this.stage),
        orientation: new ConstantProperty(undefined)
    }));
    
    /**
     * An coordinate system representing the rendering view, 
     * where +X is right, +Y is up, and -Z is the direction of the view.
     */
    public view: Entity = this.entities.add(new Entity({
        id: 'ar.view',
        name: 'View',
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.user),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    }));

    /**
     * The default reference frame to use when calling `getEntityPose`.
     * By default, this is the `origin` reference frame.
     */
    public defaultReferenceFrame = this.origin;

    /**
     * If geopose is available, this is the accuracy of the user's heading
     */
    public get geoposeHeadingAccuracy() : number|undefined {
        return this.stage['meta'].geoposeHeadingAccuracy;
    }

    /**
     * If geopose is available, this is the accuracy of the user's cartographic location
     */
    public get geoposeHorizontalAccuracy() : number|undefined {
        return this.stage['meta'].geoposeHorizontalAccuracy;
    }

    /**
     * If geopose is available, this is the accuracy of the user's elevation
     */
    public get geoposeVerticalAccuracy() : number|undefined {
        return this.stage['meta'].geoposeVerticalAccuracy;
    }

    /**
     * The serialized frame state for this frame
     */
    public get serializedFrameState() {
        return this._serializedFrameState;
    }

    // the current serialized frame state
    private _serializedFrameState: ContextFrameState;

    private _entityPoseMap = new Map<string, EntityPose | undefined>();
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
    public setDefaultReferenceFrame(origin: Entity) {
        this.defaultReferenceFrame = origin;
    }

    /**
     * Deprecated. To be removed.  Use the defaultReferenceFrame property. 
     * @private
     */
    @deprecated('defaultReferenceFrame')
    public getDefaultReferenceFrame(): Entity {
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
    public subscribe = this.entityService.subscribe.bind(this.entityService);

    /**
     * Unsubscribe to pose updates for the given entity id
     */
    public unsubscribe = this.entityService.unsubscribe.bind(this.entityService);

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

    private _stringIdentifierFromReferenceFrame = stringIdentifierFromReferenceFrame;

    /**
     * Gets the current pose of an entity, relative to a given reference frame.
     *
     * @deprecated
     * @param entityOrId - The entity whose state is to be queried.
     * @param referenceFrameOrId - The intended reference frame. Defaults to `this.defaultReferenceFrame`.
     */
    public getEntityPose(entityOrId: Entity|string, referenceFrameOrId: string | ReferenceFrame | Entity = this.defaultReferenceFrame): EntityPose {
        const key = this._stringIdentifierFromReferenceFrame(entityOrId) + '@' + this._stringIdentifierFromReferenceFrame(referenceFrameOrId);
        
        let entityPose = this._entityPoseMap.get(key);
        if (!entityPose) {
            entityPose = this.entityService.createEntityPose(entityOrId, referenceFrameOrId);
            this._entityPoseMap.set(key, entityPose);
        }
        entityPose.update(this.time);

        return entityPose;
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

    /**
     * Create a frame state.
     * 
     * @param time 
     * @param viewport 
     * @param subviewList 
     * @param user 
     * @param entityOptions 
     */
    public createFrameState(
        time:JulianDate,
        viewport:CanvasViewport,
        subviewList:SerializedSubviewList,
        options?: {overrideStage?:boolean, overrideUser?:boolean, overrideView?:boolean, overrideSubviews?:boolean, floorOffset?:number}
    ) : ContextFrameState {

        let overrideUser = options && options.overrideUser;
        if (this.deviceService.strict) {
            if (overrideUser) {
                console.warn('The `overrideUser` flag is set, but the device is in strict mode');
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
        for (let index=0; index < subviewList.length; index++) {
            // check for valid projection matrices
            const subview = subviewList[index];
            if (!isFinite(subview.projectionMatrix[0]))
                throw new Error('Invalid projection matrix (contains non-finite values)');
            
            if (options && options.overrideSubviews) {
                const subviewEntity = this.getSubviewEntity(index);
                entities[subviewEntity.id] = getSerializedEntityState(subviewEntity, time, view);
            }
        }

        // floor
        const floorOffset = options && options.floorOffset || 0;
        const floor = this.floor;
        (floor.position as ConstantPositionProperty).setValue(Cartesian3.fromElements(0,floorOffset,0, this._scratchCartesian), stage);
        if (floorOffset !== 0) {
            frameState.entities[this.floor.id] = getSerializedEntityState(floor, time, stage);
        }
        
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
                    if (entity.position) (entity.position as ConstantPositionProperty).setValue(undefined);
                    if (entity.orientation) (entity.orientation as ConstantProperty).setValue(undefined);
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
            (this.stage.position as ConstantPositionProperty).setValue(userPositionFixed, ReferenceFrame.FIXED);
            (this.stage.orientation as ConstantProperty).setValue(eusOrientation);
        } else {
            (this.stage.position as ConstantPositionProperty).setValue(Cartesian3.fromElements(0,-this.deviceService.suggestedUserHeight, 0, this._scratchCartesian), this.user.position!.referenceFrame);
            (this.stage.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);
        }
        frameState.entities[this.stage.id] = <any>true; // assume overriden for _update
    }

    // TODO: This function is called a lot. Potential for optimization. 
    private _update(frameState: ContextFrameState) {

        this._serializedFrameState = frameState;
        const time = frameState.time;
        const entities = frameState.entities;

        // update our time values
        const timestamp = performance.now();
        this.deltaTime = Math.min(timestamp - this.timestamp, this.maxDeltaTime);
        this.timestamp = timestamp;
        JulianDate.clone(<JulianDate>frameState.time, this.time);

        // update provided entities
        if (this.sessionService.manager.isConnected && this.sessionService.manager.version[0] === 0) {
            this._updateBackwardsCompatability(frameState);
        } else {
            const entityService = this.entityService;
            for (const id in entities) {
                entityService.updateEntityFromSerializedState(id, entities[id]);
            }
        }

        // update stage entity
        const deviceStage = this.deviceService.stage;
        const contextStage = this.stage;
        if (entities[contextStage.id] === undefined) {
            const contextStagePosition = contextStage.position as ConstantPositionProperty;
            const contextStageOrientation = contextStage.orientation as ConstantProperty;
            contextStagePosition.setValue(Cartesian3.ZERO, deviceStage);
            contextStageOrientation.setValue(Quaternion.IDENTITY);
        }

        // update user entity
        const deviceUser = this.deviceService.user;
        const contextUser = this.user;
        if (entities[contextUser.id] === undefined) {
            const userPositionValue = this._getEntityPositionInReferenceFrame(deviceUser, time, deviceStage, this._scratchCartesian);
            const userOrientationValue =  this._getEntityOrientationInReferenceFrame(deviceUser, time, deviceStage, this._scratchQuaternion);
            const contextUserPosition = contextUser.position as ConstantPositionProperty;
            const contextUserOrientation = contextUser.orientation as ConstantProperty;
            contextUserPosition.setValue(userPositionValue, contextStage);
            contextUserOrientation.setValue(userOrientationValue);
        }

        // update view entity
        const contextView = this.view;
        if (entities[contextView.id] === undefined) {
            const contextViewPosition = contextView.position as ConstantPositionProperty;
            const contextViewOrientation = contextView.orientation as ConstantProperty;
            contextViewPosition.setValue(Cartesian3.ZERO, contextUser);
            contextViewOrientation.setValue(Quaternion.IDENTITY);
        }

        // update subview entities
        for (let i=0; i<frameState.subviews.length; i++) {
            if (entities['ar.view_' + i] === undefined) {
                const deviceSubview = this.deviceService.getSubviewEntity(i);
                const contextSubview = this.getSubviewEntity(i);
                const subviewPositionValue = this._getEntityPositionInReferenceFrame(deviceSubview, time, deviceUser, this._scratchCartesian);
                const subviewOrientationValue = this._getEntityOrientationInReferenceFrame(deviceSubview, time, deviceUser, this._scratchQuaternion);
                const contextSubviewPosition = contextSubview.position as ConstantPositionProperty;
                const contextSubviewOrientation = contextSubview.orientation as ConstantProperty;
                contextSubviewPosition.setValue(subviewPositionValue, contextView);
                contextSubviewOrientation.setValue(subviewOrientationValue);
            }
        }

        // update floor entity
        if (entities[this.floor.id] === undefined) {
            const floorPosition = this.floor.position as ConstantPositionProperty;
            floorPosition.setValue(Cartesian3.ZERO, contextStage);
        }

        // update origin entity
        if (entities[this.origin.id] === undefined) {
            const deviceOrigin = this.deviceService.origin;
            const contextOrigin = this.origin;
            const deviceOriginPositionValue = this._getEntityPositionInReferenceFrame(deviceOrigin, time, deviceStage, this._scratchCartesian);
            const deviceOriginOrientationValue =  this._getEntityOrientationInReferenceFrame(deviceOrigin, time, deviceStage, this._scratchQuaternion);
            const contextOriginPosition = contextOrigin.position as ConstantPositionProperty;
            const contextOriginOrientation = contextOrigin.orientation as ConstantProperty;
            contextOriginPosition.setValue(deviceOriginPositionValue, contextStage);
            contextOriginOrientation.setValue(deviceOriginOrientationValue);
        }

        // update view
        this.viewService._processContextFrameState(frameState, this);
        // TODO: realityService._processContextFrameState(frameState); 

        // raise events for the user to update and render the scene
        if (this._originChanged) {
            this._originChanged = false;
            const originPosition = this.origin.position as ConstantPositionProperty;
            console.log('Updated context origin to ' + JSON.stringify(originPosition['_value']) + " at " + this._stringIdentifierFromReferenceFrame(originPosition.referenceFrame));
            this.originChangeEvent.raiseEvent(undefined);
        }
        this.updateEvent.raiseEvent(this);
        this.renderEvent.raiseEvent(this);
        this.postRenderEvent.raiseEvent(this);

        // submit frame if necessary
        const vrDisplay:VRDisplay|undefined = this.deviceService.vrDisplay;
        if (this.deviceService.autoSubmitFrame && vrDisplay && vrDisplay.isPresenting) {
            vrDisplay.submitFrame();
        }
    }
        
    getSubviewEntity(index:number) {
        const subviewEntity = this.entityService.collection.getOrCreateEntity('ar.view_'+index);
        if (!subviewEntity.position) {
            subviewEntity.position = new ConstantPositionProperty(Cartesian3.ZERO, this.user);
        }
        if (!subviewEntity.orientation) {
            subviewEntity.orientation = new ConstantProperty(Quaternion.IDENTITY);
        }
        return subviewEntity;
    }


    subscribeGeolocation(options?:GeolocationOptions) : Promise<void> {
        return this.entityService.subscribe(this.stage.id, options).then(()=>{});
    }

    unsubscribeGeolocation() : void {
        this.entityService.unsubscribe(this.stage.id);
    }

    public get geoHeadingAccuracy() : number|undefined {
        return this.user['meta'] && this.user['meta'].geoHeadingAccuracy;
    }

    public get geoHorizontalAccuracy() : number|undefined {
        return this.user['meta'] && this.user['meta'].geoHorizontalAccuracy ||
            this.stage['meta'] && this.stage['meta'].geoHorizontalAccuracy;
    }
    
    public get geoVerticalAccuracy() : number|undefined {
        return this.user['meta'] && this.user['meta'].geoVerticalAccuracy ||
            this.stage['meta'] && this.stage['meta'].geoVerticalAccuracy;
    }

}

@autoinject()
export class ContextServiceProvider {
    
    private _cacheTime = new JulianDate(0,0)

    constructor(
        protected sessionService:SessionService,
        protected contextService:ContextService,
        protected entityServiceProvider:EntityServiceProvider,
        protected permissionServiceProvider:PermissionServiceProvider
    ) {
        this.entityServiceProvider.targetReferenceFrameMap.set(this.contextService.stage.id, ReferenceFrame.FIXED);

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
        })

        // publish updates to child sessions
        this.contextService.updateEvent.addEventListener(()=>{
            this._publishUpdates();
        });
    }
    
    private _publishUpdates() {
        const state = this.contextService.serializedFrameState!;
        this._cacheTime = JulianDate.clone(state.time, this._cacheTime);
        for (const session of this.sessionService.managedSessions) {
            if (Role.isRealityAugmenter(session.info.role))
                this._sendUpdateForSession(state, session);
        }
    }

    private _sessionEntities:SerializedEntityStateMap = {};
    private _temp:any = {};

    private _sendUpdateForSession(state:ContextFrameState, session: SessionPort) {
        const sessionEntities = this._sessionEntities;
        const entityServiceProvider = this.entityServiceProvider

        // clear session entities
        for (var id in sessionEntities) {
            delete sessionEntities[id];
        }

        // reference all entities from the primary frame state
        if (state.entities) {
            for (var id in state.entities) {
                sessionEntities[id] = state.entities[id];
            }
        }

        // always send the origin state
        sessionEntities[this.contextService.origin.id] = entityServiceProvider.getCachedSerializedEntityState(this.contextService.origin, state.time)

        // get subscribed entities for the session
        const subscriptions = entityServiceProvider.subscriptionsBySubscriber.get(session)!;
        
        // exclude the stage state unless it is explicitly subscribed 
        const contextService = this.contextService;
        const contextStageId = contextService.stage.id;
        if (!subscriptions[contextStageId]) delete sessionEntities[contextStageId];
        
        // add the entity states for all subscribed entities
        const iter = subscriptions.keys();
        let item:IteratorResult<string>;
        while (item = iter.next(), !item.done) { // not using for-of since typescript converts this to broken es5
            const id = item.value;
            const entity = contextService.entities.getById(id);
            sessionEntities[id] = entityServiceProvider.getCachedSerializedEntityState(entity, state.time);
        }

        // remove stage updates if geolocation permission is not granted
        if (this.permissionServiceProvider.getPermissionState(session, 'geolocation') != PermissionState.GRANTED)
            delete sessionEntities[contextStageId];
             
        // recycle the frame state object, but with the session entities
        const parentEntities = state.entities;
        state.entities = sessionEntities;
        state.time = state.time;
        state.sendTime = JulianDate.now(state.sendTime);

        if (session.version[0] === 0) { // backwards compatability with older viewers / augmenters

            for (const s of state.subviews) {
                s['frustum'] = s['frustum'] || decomposePerspectiveProjectionMatrix(s.projectionMatrix, <any>{});
            }

            const view = this._temp;
            view.viewport = state.viewport;
            view.subviews = state.subviews;
            view.pose = state.entities['ar.user'];
            
            delete state.subviews;
            delete state.viewport;
            delete state.entities['ar.user'];
            state['view'] = view;

            session.send('ar.context.update', state);

            delete state['view'];
            state.viewport = view.viewport;
            state.subviews = view.subviews;

        } else if (session.version[0] === 1 && session.version[1] === 1 && state.entities['ar.user']) {
            state.entities['ar.user']!.r = 'ar.stageEUS';
            session.send('ar.context.update', state);
            state.entities['ar.user']!.r = 'ar.stage';
        } else {
            session.send('ar.context.update', state);
        }

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
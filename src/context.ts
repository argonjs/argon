import { autoinject } from 'aurelia-dependency-injection'
import {
    ReferenceEntity,
    Entity,
    EntityCollection,
    Cartographic,
    ConstantPositionProperty,
    ConstantProperty,
    // Transforms,
    Cartesian3,
    Quaternion,
    Matrix3,
    Matrix4,
    CesiumMath,
    JulianDate,
    ReferenceFrame,
    PerspectiveFrustum,
    Transforms,
    defined
} from './cesium/cesium-imports'
import {
    DEFAULT_NEAR_PLANE,
    DEFAULT_FAR_PLANE,
    SerializedEntityState, 
    // SerializedSubviewList, 
    SerializedEntityStateMap,
    SubviewType,
    ContextFrameState,
    // Viewport, 
    Role,
    GeolocationOptions
} from './common'
import { SessionService, SessionPort } from './session'
import { Event, getSerializedEntityState, getEntityPositionInReferenceFrame, getEntityOrientationInReferenceFrame, deprecated, decomposePerspectiveProjectionMatrix } from './utils'


/**
 * Represents the pose of an entity relative to a particular reference frame. 
 * 
 * The `update` method must be called in order to update the position / orientation / poseStatus. 
 */
export class EntityPose {
    constructor(
        public context:ContextService, 
        entityOrId:Entity|string, 
        referenceFrameId?:Entity|ReferenceFrame|string
    ){
        if (typeof entityOrId === 'string') {
            let entity:Entity|ReferenceEntity|undefined = this.context.entities.getById(entityOrId);
            if (!entity) entity = <Entity><any> new ReferenceEntity(context.entities, entityOrId);
            this._entity = entity;
        } else {
            this._entity = entityOrId;
        }
        
        if (typeof referenceFrameId === 'string') {
            let referenceFrame:Entity|ReferenceEntity|ReferenceFrame|undefined = this.context.entities.getById(referenceFrameId);
            if (!defined(referenceFrame)) referenceFrame = <Entity><any> new ReferenceEntity(context.entities, referenceFrameId);
            this._referenceFrame = referenceFrame;
        } else {
            this._referenceFrame = referenceFrameId;
        }
    }

    private _entity:Entity;
    private _referenceFrame:Entity|ReferenceFrame|undefined;

    get entity() { return this._entity }

    get referenceFrame() {
        if (!defined(this._referenceFrame))
            return this.context.defaultReferenceFrame;
        return this._referenceFrame;
    }

    /**
     * The status of this pose, as a bitmask.
     * 
     * If the current pose is known, then the KNOWN bit is 1.
     * If the current pose is not known, then the KNOWN bit is 0. 
     * 
     * If the previous pose was known and the current pose is unknown, 
     * then the LOST bit is 1. 
     * If the previous pose was unknown and the current pose status is known, 
     * then the FOUND bit is 1.
     * In all other cases, both the LOST bit and the FOUND bit are 0. 
     */
    status:PoseStatus = 0;

    /**
     * alias for status
     */
    get poseStatus() { return this.status };

    position = new Cartesian3;
    orientation = new Quaternion;
    time = new JulianDate(0,0)

    
    private _previousTime:JulianDate;
    private _previousStatus:PoseStatus = 0;

    update(time=this.context.time) {

        JulianDate.clone(time, this.time);

        if (!JulianDate.equals(this._previousTime, time)) {
            this._previousStatus = this.status;
            this._previousTime = JulianDate.clone(time, this._previousTime)
        }

        const entity = this.entity;
        const referenceFrame = this.referenceFrame;
        
        let position = getEntityPositionInReferenceFrame(
            entity,
            time,
            referenceFrame,
            this.position
        );

        let orientation = getEntityOrientationInReferenceFrame(
            entity,
            time,
            referenceFrame,
            this.orientation
        );

        const hasPose = position && orientation;

        let currentStatus: PoseStatus = 0;
        const previousStatus = this._previousStatus;

        if (hasPose) {
            currentStatus |= PoseStatus.KNOWN;
        }

        if (hasPose && !(previousStatus & PoseStatus.KNOWN)) {
            currentStatus |= PoseStatus.FOUND;
        } else if (!hasPose && previousStatus & PoseStatus.KNOWN) {
            currentStatus |= PoseStatus.LOST;
        }

        this.status = currentStatus;
    }
}

/**
* A bitmask that provides metadata about the pose of an EntityPose.
*   KNOWN - the pose of the entity state is defined. 
*   KNOWN & FOUND - the pose was undefined when the entity state was last queried, and is now defined.
*   LOST - the pose was defined when the entity state was last queried, and is now undefined
*/
export enum PoseStatus {
    KNOWN = 1,
    FOUND = 2,
    LOST = 4
}

/**
 * Provides a means of querying the current state of reality. 
 * 
 * This class adds the following message handlers to any sessions 
 * managed by the session service:
 *
 *  * `ar.context.subscribe` - Subscribes the session to updates from an
 *    entity with the provided id.
 *    * Parameters:
 *      * id: string - The id of an entity the session wishes to recieve
 *        updates on.
 *
 * This service sends the following messages to managed sessions
 * 
 *  * `ar.context.update` - Indicates to this context that the session wants
 *    to be focused on.
 */
@autoinject()
export class ContextService {

    constructor(
        private sessionService: SessionService
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

        this._scratchFrustum.near = DEFAULT_NEAR_PLANE;
        this._scratchFrustum.far = DEFAULT_FAR_PLANE;
        this._scratchFrustum.fov = CesiumMath.PI_OVER_THREE;
        this._scratchFrustum.aspectRatio = 1;

        this._serializedFrameState = {
            reality: undefined,
            time: JulianDate.now(),
            entities: {},
            viewport: {x:0,y:0,width:0,height:0},
            subviews:  [{
                type: SubviewType.SINGULAR, 
                pose: null,
                viewport: {x:0,y:0,width:1,height:1},
                projectionMatrix: this._scratchFrustum.projectionMatrix
            }],
        };

        this._update(this._serializedFrameState);
    }

    /**
     * An event that is raised when the next frame state is available.
     */
    public frameStateEvent = new Event<ContextFrameState>();

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
     * An event that fires when the local origin changes.
     */
    public localOriginChangeEvent = new Event<void>();

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
     * The collection of all entities this application is aware of.
     */
    public entities = new EntityCollection();

     /**
     * An entity representing the local origin, which is oriented 
     * East-North-Up if geolocation is known, otherwise an arbitrary
     * frame with +Z up
     */
    public localOrigin: Entity = this.entities.add(new Entity({
        id: 'ar.localOrigin',
        name: 'Local Origin (ENU)',
        position: new ConstantPositionProperty(undefined, undefined),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    }));

     /**
     * Alias for `localOrigin`. An entity representing the local origin, 
     * which is oriented East-North-Up if geolocation is known, 
     * otherwise an arbitrary frame with +Z up
     */
    public localOriginEastNorthUp = this.entities.add(new Entity({
        id: 'ar.localOriginENU',
        name: 'Local Origin (ENU)',
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.localOrigin),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    }));

    /**
     * An entity representing the same origin as `localOriginEastNorthUp`, but rotated 
     * 90deg around X-axis to create an East-Up-South coordinate system. 
     * Useful for maintaining a scene-graph where +Y is up.
     */
    public localOriginEastUpSouth: Entity = this.entities.add(new Entity({
        id: 'ar.localOriginEUS',
        name: 'Local Origin (EUS)',
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.localOriginEastNorthUp),
        orientation: new ConstantProperty(Quaternion.fromAxisAngle(Cartesian3.UNIT_X, Math.PI / 2))
    }));

    /**
     * The default origin to use when calling `getEntityPose`.
     * By default, this is the `localOriginEastNorthUp` reference frame.
     */
    public defaultReferenceFrame = this.localOriginEastNorthUp;

    /**
     * An entity representing the user. 
     */
    public user: Entity = this.entities.add(new Entity({
        id: 'ar.user',
        name: 'User',
        position: new ConstantPositionProperty(undefined, undefined),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    }));

    public get geoposeHeadingAccuracy() : number|undefined {
        return this.localOrigin['meta'].geoposeHeadingAccuracy;
    }

    public get geoposeHorizontalAccuracy() : number|undefined {
        return this.localOrigin['meta'].geoposeHorizontalAccuracy;
    }

    public get geoposeVerticalAccuracy() : number|undefined {
        return this.localOrigin['meta'].geoposeVerticalAccuracy;
    }

    /**
     * An entity representing the physical floor-level plane below the user
     */
    public stage: Entity = this.entities.add(new Entity({
        id: 'ar.stage',
        name: 'Stage',
        position: new ConstantPositionProperty(undefined, undefined),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    }));

    /**
     * An entity representing a ground-level plane below the user
     */
    public ground: Entity = this.entities.add(new Entity({
        id: 'ar.ground',
        name: 'Ground',
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.stage),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    }));
    
    /**
     * An entity representing the pose of the display (not taking into account screen rotation)
     */
    public display: Entity = this.entities.add(new Entity({
        id: 'ar.display',
        name: 'Display'
    }));

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
     * Deprecated. To be removed. Use the defaultReferenceFrame property. 
     * @private
     */
    @deprecated('defaultReferenceFrame')
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
        this.sessionService.manager.send('ar.context.subscribe', { id });
        return this.entities.getOrCreateEntity(id);
    }

    /**
     * Subscribe to pose updates for the given entity id
     * 
     * @returns A Promise that resolves to a new or existing entity 
     * instance matching the given id, if the subscription is successful
     */
    public subscribe(id: string|Entity, session=this.sessionService.manager) : Promise<Entity> {
        id = (<Entity>id).id || id;
        return session.request('ar.context.subscribe', {id}).then(()=>{
            return this.entities.getOrCreateEntity(id);
        });
    }

    /**
     * Unsubscribe to pose updates for the given entity id
     */
    public unsubscribe(id: string|Entity, session=this.sessionService.manager) : void {
        id = (<Entity>id).id || id;
        session.send('ar.context.unsubscribe', {id});
    }

    /**
     * Get the cartographic position of an Entity
     */
    public getEntityCartographic(entity?:Entity, cartographic?:Cartographic) : Cartographic|undefined {
        if (!entity) return undefined;

        const fixedPosition = 
            getEntityPositionInReferenceFrame(entity, this.time, ReferenceFrame.FIXED, this._scratchCartesian);
        
        if (fixedPosition) {
            cartographic = cartographic || new Cartographic();
            return Cartographic.fromCartesian(fixedPosition, undefined, cartographic);
        }

        return undefined;
    }

    /**
     * Create a new EntityPose instance to represent the pose of an entity
     * relative to a given reference frame. If no reference frame is specified,
     * then the pose is based on the context's defaultReferenceFrame.
     * 
     * @param entity - the entity to track
     * @param referenceFrameOrId - the reference frame to use
     */
    public createEntityPose(entityOrId: Entity|string, referenceFrameOrId?: string | ReferenceFrame | Entity) {            
        return new EntityPose(this, entityOrId, referenceFrameOrId);
    }

    /**
     * Gets the current pose of an entity, relative to a given reference frame.
     *
     * @deprecated
     * @param entity - The entity whose state is to be queried.
     * @param referenceFrame - The intended reference frame. Defaults to `this.defaultReferenceFrame`.
     */
    public getEntityPose(entityOrId: Entity|string, referenceFrameOrId: string | ReferenceFrame | Entity=this.defaultReferenceFrame): EntityPose {
        const key = _stringFromReferenceFrame(entityOrId) + '@' + _stringFromReferenceFrame(referenceFrameOrId);
        
        let entityPose = this._entityPoseMap.get(key);
        if (!entityPose) {
            entityPose = this.createEntityPose(entityOrId, referenceFrameOrId);
            this._entityPoseMap.set(key, entityPose);
        }
        entityPose.update();

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

    private _getEntityPositionInReferenceFrame = getEntityPositionInReferenceFrame;
    private _scratchMatrix3 = new Matrix3;
    private _scratchMatrix4 = new Matrix4;

    // All of the following work is only necessary when running in an old manager (version === 0)
    private _updateBackwardsCompatability(frameState:ContextFrameState) {
        this._knownEntities.clear();

        // update the entities the manager knows about
        for (const id in frameState.entities) {
            this.updateEntityFromSerializedState(id, frameState.entities[id]);
            this._updatingEntities.add(id);
            this._knownEntities.add(id);
        }

        // if the mangager didn't send us an update for a particular entity,
        // assume the manager no longer knows about it
        for (const id of <string[]><any>this._updatingEntities) {
            if (!this._knownEntities.has(id)) {
                let entity = this.entities.getById(id);
                if (entity) {
                    entity.position = undefined;
                    entity.orientation = undefined;
                }
                this._updatingEntities.delete(id);
            }
        }

        // If running within an older manager, we have to provide the 
        // context with a local origin ourselves.
        const localOrigin = this.localOrigin;
        const userPositionFixed = this._getEntityPositionInReferenceFrame(
            this.user,
            frameState.time,
            ReferenceFrame.FIXED,
            this._scratchCartesian
        );
        if (userPositionFixed) {
            const enuToFixedFrameTransform = Transforms.eastNorthUpToFixedFrame(userPositionFixed, undefined, this._scratchMatrix4);
            const enuRotationMatrix = Matrix4.getRotation(enuToFixedFrameTransform, this._scratchMatrix3);
            const enuOrientation = Quaternion.fromRotationMatrix(enuRotationMatrix);


            if (!localOrigin.position) localOrigin.position = new ConstantPositionProperty();
            if (!localOrigin.orientation) localOrigin.orientation = new ConstantProperty();
            (localOrigin.position as ConstantPositionProperty).setValue(userPositionFixed, ReferenceFrame.FIXED);
            (localOrigin.orientation as ConstantProperty).setValue(enuOrientation);
        } else {
            localOrigin.position = undefined;
            localOrigin.orientation = undefined;
        }
    }

    // TODO: This function is called a lot. Potential for optimization. 
    private _update(frameState: ContextFrameState) {

        if (this.sessionService.manager.isConnected && this.sessionService.manager.version[0] === 0) {
            this._updateBackwardsCompatability(frameState);
        } else {
            for (const id in frameState.entities) {
                this.updateEntityFromSerializedState(id, frameState.entities[id]);
            }
        }

        // update our time values
        const timestamp = performance.now();
        this.deltaTime = Math.min(timestamp - this.timestamp, this.maxDeltaTime);
        this.timestamp = timestamp;
        JulianDate.clone(<JulianDate>frameState.time, this.time);

        // update our stage & local origin. 
        // TODO: move both of these into the location service, handle in frameStateEvent?
        // this._updateStage(frameState);
        // this._updateLocalOrigin(frameState);

        // raise a frame state event (primarily for other services to hook into)
        this._serializedFrameState = frameState;
        this.frameStateEvent.raiseEvent(frameState);

        // raise events for the user to update and render the scene
        this.updateEvent.raiseEvent(this);
        this.renderEvent.raiseEvent(this);
        this.postRenderEvent.raiseEvent(this);
    }

    public updateEntityFromSerializedState(id:string, entityState:SerializedEntityState|null) {
        const entity = this.entities.getOrCreateEntity(id);
        
        if (!entityState) {
            entity.position = undefined;
            entity.orientation = undefined;
            entity['meta'] = undefined;
            return entity;
        }
        
        const positionValue = entityState.p;
        const orientationValue = Quaternion.clone(entityState.o, this._scratchQuaternion); // workaround for https://github.com/AnalyticalGraphicsInc/cesium/issues/5031
        const referenceFrame:Entity|ReferenceFrame = 
            typeof entityState.r === 'number' ?
            entityState.r : this.entities.getOrCreateEntity(entityState.r);

        let entityPosition = entity.position;
        let entityOrientation = entity.orientation;

        if (entityPosition instanceof ConstantPositionProperty && 
            entityPosition.referenceFrame === referenceFrame) {
            entityPosition.setValue(positionValue, referenceFrame);
        } else {
            entity.position = new ConstantPositionProperty(positionValue, referenceFrame);
        }

        if (entityOrientation instanceof ConstantProperty) {
            entityOrientation.setValue(orientationValue);
        } else {
            entity.orientation = new ConstantProperty(orientationValue);
        }

        entity['meta'] = entityState.meta;

        return entity;
    }

    public getSubviewEntity(index:number) {
        const subviewEntity = this.entities.getOrCreateEntity('ar.view_'+index);
        if (!subviewEntity.position) {
            subviewEntity.position = new ConstantPositionProperty();
        }
        if (!subviewEntity.orientation) {
            subviewEntity.orientation = new ConstantProperty();
        }
        return subviewEntity;
    }

    subscribeGeolocation(options?:GeolocationOptions) : Promise<void> {
        return this.sessionService.manager.whenConnected().then(()=>{
            if (this.sessionService.manager.version[0] > 0) 
                this.sessionService.manager.send('ar.context.setGeolocationOptions', {options});
            return this.subscribe(this.localOrigin.id).then(()=>{});
        })
    }

    unsubscribeGeolocation() : void {
        this.unsubscribe(this.localOrigin.id);
    }

    public get geoHeadingAccuracy() : number|undefined {
        return this.user['meta'] && this.user['meta'].geoHeadingAccuracy;
    }

    public get geoHorizontalAccuracy() : number|undefined {
        return this.user['meta'] && this.user['meta'].geoHorizontalAccuracy ||
            this.localOrigin['meta'] && this.localOrigin['meta'].geoHorizontalAccuracy;
    }
    
    public get geoVerticalAccuracy() : number|undefined {
        return this.user['meta'] && this.user['meta'].geoVerticalAccuracy ||
            this.localOrigin['meta'] && this.localOrigin['meta'].geoVerticalAccuracy;
    }

}

function _stringFromReferenceFrame(referenceFrame: string | ReferenceFrame | Entity): string {
    const rf = referenceFrame as Entity;
    return defined(rf.id) ? rf.id : '' + rf;
}



@autoinject()
export class ContextServiceProvider {

    public entitySubscriptionsBySubscriber = new WeakMap<SessionPort, {[subcription:string]:any}>();
    public subscribersByEntityId = new Map<string, Set<SessionPort>>();
    public subscribersChangeEvent = new Event<{id:string, subscribers}>();

    public publishingReferenceFrameMap = new Map<string, string|ReferenceFrame>();
    
    private _cacheTime = new JulianDate(0,0)
    private _entityPoseCache: SerializedEntityStateMap = {};
    private _getSerializedEntityState = getSerializedEntityState;

    constructor(
        private sessionService:SessionService,
        private contextService:ContextService
    ) {
        const localOriginId = this.contextService.localOriginEastNorthUp.id;
        this.publishingReferenceFrameMap.set(localOriginId, ReferenceFrame.FIXED);

        sessionService.connectEvent.addEventListener((session) => {
            const subscriptions = {};
            this.entitySubscriptionsBySubscriber.set(session, subscriptions);

            session.on['ar.context.subscribe'] = ({id}:{id:string}) => {
                const subscribers = this.subscribersByEntityId.get(id) || new Set<SessionPort>();
                this.subscribersByEntityId.set(id, subscribers);
                subscribers.add(session);
                subscriptions[id] = true;
                this.subscribersChangeEvent.raiseEvent({id, subscribers});

                session.closeEvent.addEventListener(()=>{
                    subscribers.delete(session);
                    this.subscribersChangeEvent.raiseEvent({id, subscribers});
                })
            }

            session.on['ar.context.unsubscribe'] = ({id}:{id:string}) => {
                const subscribers = this.subscribersByEntityId.get(id);
                subscribers && subscribers.delete(session);
                delete subscriptions[id];
                this.subscribersChangeEvent.raiseEvent({id, subscribers});
            }

            session.on['ar.context.setGeolocationOptions'] = ({options}) => {
                this._handleSetGeolocationOptions(session, options)
            }

            session.closeEvent.addEventListener(()=>{
                this.entitySubscriptionsBySubscriber.delete(session);
                for (const id in subscriptions) {
                    const subscribers = this.subscribersByEntityId.get(id);
                    subscribers && subscribers.delete(session);
                    this.subscribersChangeEvent.raiseEvent({id, subscribers});
                }
            })
        });

        this.contextService.updateEvent.addEventListener(()=>{
            this._publishUpdates();
        });
    }
    
    public fillEntityStateMapForSession(session:SessionPort, time:JulianDate, entities:SerializedEntityStateMap) {
        const subscriptions = this.entitySubscriptionsBySubscriber.get(session);
        if (!subscriptions) return;
        for (const id in subscriptions) {
            const entity = this.contextService.entities.getById(id);
            entities[id] = entity ? this._getCachedSerializedEntityState(entity, time) : null;
        }
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

        // clear session entities
        for (var id in sessionEntities) {
            delete sessionEntities[id];
        }

        // reference all entities from the primary frame state (if any)
        if (state.entities) {
            for (var id in state.entities) {
                sessionEntities[id] = state.entities[id];
            }
        }

        sessionEntities[this.contextService.user.id] = this._getCachedSerializedEntityState(this.contextService.user, state.time);
        sessionEntities[this.contextService.stage.id] = this._getCachedSerializedEntityState(this.contextService.stage, state.time);
        sessionEntities[this.contextService.ground.id] = this._getCachedSerializedEntityState(this.contextService.ground, state.time);

        // get subscribed entities for the session
        const subscriptions = this.entitySubscriptionsBySubscriber.get(session)!;
        for (const id in subscriptions) {
            const entity = this.contextService.entities.getById(id);
            sessionEntities[id] = this._getCachedSerializedEntityState(entity, state.time);
        }

        // recycle the parent frame state object, but with the session entities
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
        } else {
            session.send('ar.context.update', state);
        }

        state.entities = parentEntities;
    }

    private _getCachedSerializedEntityState(entity: Entity|undefined, time: JulianDate) {
        if (!entity) return null;

        const id = entity.id;

        if (!defined(this._entityPoseCache[id]) || this._cacheTime.equalsEpsilon(time, 0.000001)) {
            const referenceFrameId = this.publishingReferenceFrameMap.get(id);
            const referenceFrame = defined(referenceFrameId) && typeof referenceFrameId === 'string' ? 
                this.contextService.entities.getById(referenceFrameId) :
                defined(referenceFrameId) ? referenceFrameId : this.contextService.localOrigin;
            this._entityPoseCache[id] = this._getSerializedEntityState(entity, time, referenceFrame);
        }

        return this._entityPoseCache[id];
    }

    public desiredGeolocationOptions:GeolocationOptions = {};
    public sessionGeolocationOptions = new Map<SessionPort, GeolocationOptions|undefined>();

    private _handleSetGeolocationOptions(session:SessionPort, options?:GeolocationOptions) {
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

    public get geolocationDesired() {
        const contextGeoposeSubscribers = this.subscribersByEntityId.get(this.contextService.localOrigin.id);
        if (contextGeoposeSubscribers && contextGeoposeSubscribers.size > 0) 
            return true;
        return false;
    }
}
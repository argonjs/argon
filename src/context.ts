import { autoinject } from 'aurelia-dependency-injection'
import {
    ReferenceEntity,
    Entity,
    EntityCollection,
    ConstantPositionProperty,
    ConstantProperty,
    Transforms,
    Cartesian3,
    Quaternion,
    Matrix3,
    Matrix4,
    JulianDate,
    ReferenceFrame,
    PerspectiveFrustum,
    defined
} from './cesium/cesium-imports'
import { 
    AVERAGE_HUMAN_HEIGHT,
    SerializedEntityState, 
    SerializedSubviewList, 
    SerializedEntityStateMap,
    SubviewType,
    FrameState,
    Viewport, 
    Role,
    EYE_ENTITY_ID, PHYSICAL_EYE_ENTITY_ID,
    STAGE_ENTITY_ID, PHYSICAL_STAGE_ENTITY_ID
} from './common'
import { SessionService, SessionPort } from './session'
import { Event, getSerializedEntityState, getEntityPositionInReferenceFrame, getEntityOrientationInReferenceFrame, deprecated } from './utils'


/**
 * Tracks the pose of an entity relative to a particular reference frame. 
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

    status:PoseStatus = 0;

    /**
     * alias for status
     */
    get poseStatus() { return this.status };

    position = new Cartesian3;
    orientation = new Quaternion;
    time = new JulianDate(0,0)

    update(time=this.context.time) {

        JulianDate.clone(time, this.time);

        const entity = this.entity;
        const referenceFrame = this.referenceFrame;

        if (!entity || !defined(referenceFrame)) {
            this.status = 0;
            return;
        }
        
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

        let poseStatus: PoseStatus = 0;
        const previousStatus = this.status;

        if (hasPose) {
            poseStatus |= PoseStatus.KNOWN;
        }

        if (hasPose && !(previousStatus & PoseStatus.KNOWN)) {
            poseStatus |= PoseStatus.FOUND;
        } else if (!hasPose && previousStatus & PoseStatus.KNOWN) {
            poseStatus |= PoseStatus.LOST;
        }

        this.status = poseStatus;
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

const scratchCartesian = new Cartesian3(0, 0);
const scratchCartesian2 = new Cartesian3(0, 0);
const scratchQuaternion = new Quaternion(0, 0);
const scratchOriginCartesian = new Cartesian3(0, 0);
const scratchFrustum = new PerspectiveFrustum();
const scratchMatrix3 = new Matrix3;
const scratchMatrix4 = new Matrix4;

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
        this.sessionService.manager.on['ar.context.update'] = (state: FrameState) => {
            // backwards-compat
            if (typeof state.reality !== 'string') {
                state.reality = state.reality && state.reality['uri'];
            }
            if (!state.viewport && state['view'] && state['view'].viewport) {
                state.viewport = state['view'].viewport;
            }
            if (!state.subviews && state['view'] && state['view'].subviews) {
                state.subviews = state['view'].subviews;
                scratchFrustum.near = 0.01;
                scratchFrustum.far = 10000000;
                for (const s of state.subviews) {
                    const frustum = s['frustum'];
                    scratchFrustum.xOffset = frustum.xOffset;
                    scratchFrustum.yOffset = frustum.yOffset;
                    scratchFrustum.fov = frustum.fov;
                    scratchFrustum.aspectRatio = frustum.aspectRatio;
                    s.projectionMatrix = Matrix4.clone(scratchFrustum.projectionMatrix, s.projectionMatrix);
                }
            }
            if (!state.entities![EYE_ENTITY_ID] && state['view'] && state['view'].pose) {
                state.entities![EYE_ENTITY_ID] = state['view'].pose;
            }
            // end backwards-compat
            this._update(state);
        }
        this.sessionService.manager.on['ar.context.entityStateMap'] = (entityStateMap: SerializedEntityStateMap) => {
            for (const id in entityStateMap) {
                this.updateEntityFromSerializedPose(id, entityStateMap[id]);
            }
        }

        scratchFrustum.fov = Math.PI/3;
        scratchFrustum.aspectRatio = 1;

        this._serializedFrameState = {
            reality: undefined,
            time: JulianDate.now(),
            entities: {},
            viewport: {x:0,y:0,width:0,height:0},
            subviews:  [{
                type: SubviewType.SINGULAR, 
                viewport: {x:0,y:0,width:1,height:1},
                projectionMatrix: scratchFrustum.projectionMatrix
            }],
        };

        this._update(this._serializedFrameState);
    }

    /**
     * An event that is raised when the next frame state is available.
     */
    public frameStateEvent = new Event<FrameState>();

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
     * An alias for the 'eye' entity. To be deprecated in favor of `ViewService.eye`.
     */
    public get user() { return this.entities.getById(EYE_ENTITY_ID)! }

    /**
     * An entity positioned near the user, aligned with the local East-North-Up
     * coordinate system.
     */
    public localOriginEastNorthUp: Entity = this.entities.add(new Entity({
        id: 'ar.localENU',
        name: 'localOriginENU',
        position: new ConstantPositionProperty(undefined, ReferenceFrame.FIXED),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    }));

    /**
     * An entity positioned near the user, aligned with the East-Up-South 
     * coordinate system. This useful for converting to the Y-Up convention 
     * used in some libraries, such as three.js.
     */
    public localOriginEastUpSouth: Entity = this.entities.add(new Entity({
        id: 'ar.localEUS',
        name: 'localOriginEUS',
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.localOriginEastNorthUp),
        orientation: new ConstantProperty(Quaternion.fromAxisAngle(Cartesian3.UNIT_X, Math.PI / 2))
    }));

    /**
     * The default origin to use when calling `getEntityPose`.
     * By default, this is the `localOriginEastNorthUp` reference frame.
     */
    public defaultReferenceFrame = this.localOriginEastNorthUp;

    /**
     * The serialized frame state for this frame
     */
    public get serializedFrameState() {
        return this._serializedFrameState;
    }

    // the current serialized frame state
    private _serializedFrameState: FrameState;

    private _entityPoseMap = new Map<string, EntityPose | undefined>();
    private _updatingEntities = new Set<string>();
    private _knownEntities = new Set<string>();

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
     * @param id - the id of the desired entity
     * @returns A Promise that resolves to a new or existing entity 
     * instance matching the given id, if the subscription is successful
     */
    public subscribe(id: string|Entity) : Promise<Entity> {
        id = (<Entity>id).id || id;
        return this.sessionService.manager.request('ar.context.subscribe', {id}).then(()=>{
            return this.entities.getOrCreateEntity(id);
        });
    }

    /**
     * Unsubscribe to pose updates for the given entity id
     */
    public unsubscribe(id: string|Entity) : void {
        id = (<Entity>id).id || id;
        this.sessionService.manager.send('ar.context.unsubscribe', {id});
    }

    /**
     * Create a new EntityPose instance to track the pose of a given entity
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
    @deprecated('createEntityPose')
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

    public _scratchFrameState:FrameState = {
        time:<any>{},
        entities: {},
        viewport: <any>{},
        subviews: []
    }

    public createFrameState(
        time:JulianDate,
        viewport:Viewport,
        subviewList:SerializedSubviewList,
        eye:Entity,
        horizontalAccuracy?:number,
        verticalAccuracy?:number,
        headingAccuracy?:number
    ) : FrameState {
        const eyeMeta = eye['meta'] = eye['meta'] || {};
        eyeMeta.horizontalAccuracy = horizontalAccuracy || eyeMeta.horizontalAccuracy;
        eyeMeta.verticalAccuracy = verticalAccuracy || eyeMeta.verticalAccuracy;
        eyeMeta.headingAccuracy = headingAccuracy || eyeMeta.headingAccuracy;

        for (const s of subviewList) {
            if (!isFinite(s.projectionMatrix[0]))
                throw new Error('Invalid projection matrix (contains non-finite values)');
        }

        const frameState:FrameState = this._scratchFrameState;
        frameState.time = JulianDate.clone(time, frameState.time);
        frameState.viewport = Viewport.clone(viewport, frameState.viewport);
        frameState.subviews = SerializedSubviewList.clone(subviewList, frameState.subviews);
        frameState.entities![EYE_ENTITY_ID] = getSerializedEntityState(eye, time);

        return frameState;
    }

    private _frameIndex = -1;

    /**
     * Process the next frame state (which should come from the current reality viewer)
     */
    public submitFrameState(frameState: FrameState) {
        frameState.index = ++this._frameIndex;
        this._update(frameState);
    }

    // TODO: This function is called a lot. Potential for optimization. 
    private _update(frameState: FrameState) {

        // update the entities the manager knows about
        this._knownEntities.clear();
        if (frameState.entities) {
            for (const id in frameState.entities) {
                this.updateEntityFromSerializedPose(id, frameState.entities[id]);
                this._updatingEntities.add(id);
                this._knownEntities.add(id);
            }
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

        // update our time values
        const timestamp = performance.now();
        this.deltaTime = Math.min(timestamp - this.timestamp, this.maxDeltaTime);
        this.timestamp = timestamp;
        JulianDate.clone(<JulianDate>frameState.time, this.time);

        // update our stage & local origin. 
        // TODO: move both of these into the location service, handle in frameStateEvent?
        this._updateStage(frameState);
        this._updateLocalOrigin(frameState);

        // raise a frame state event (primarily for other services to hook into)
        this._serializedFrameState = frameState;
        this.frameStateEvent.raiseEvent(frameState);

        // raise events for the user to update and render the scene
        this.updateEvent.raiseEvent(this);
        this.renderEvent.raiseEvent(this);
        this.postRenderEvent.raiseEvent(this);
    }

    public updateEntityFromSerializedPose(id:string, entityPose?:SerializedEntityState) {
        const entity = this.entities.getOrCreateEntity(id);
        
        if (!entityPose) {
            entity.position = undefined;
            entity.orientation = undefined;
            return entity;
        }
        
        const positionValue = entityPose.p;
        const orientationValue = entityPose.o;
        const referenceFrame:Entity|ReferenceFrame = 
            typeof entityPose.r === 'number' ?
            entityPose.r : this.entities.getOrCreateEntity(entityPose.r);

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

        return entity;
    }

    private _updateStage(state:FrameState) {
        // update the stage entity based on the eye entity (provided by the current reality viewer)
        // and the relative position between the physical eye and the physical stage.

        const eye = this.entities.getById(EYE_ENTITY_ID);
        const stage = this.entities.getById(STAGE_ENTITY_ID);
        const physicalEye = this.entities.getById(PHYSICAL_EYE_ENTITY_ID);
        const physicalStage = this.entities.getById(PHYSICAL_STAGE_ENTITY_ID);

        if (!eye || !stage) return;

        stage.position && (stage.position as ConstantPositionProperty).setValue(undefined, undefined);
        stage.orientation && (stage.orientation as ConstantProperty).setValue(undefined);

        const time = state.time;

        if (physicalEye && physicalStage) {
            var physicalEyeStageOffset = getEntityPositionInReferenceFrame(
                physicalEye, 
                time, 
                physicalStage, 
                scratchCartesian
            );
        }

        if (!physicalEyeStageOffset) {
            physicalEyeStageOffset = Cartesian3.fromElements(0,0, AVERAGE_HUMAN_HEIGHT, scratchCartesian);
        }

        const eyePositionFixed = getEntityPositionInReferenceFrame(
            eye,
            time,
            ReferenceFrame.FIXED,
            scratchCartesian2
        );
        
        if (eyePositionFixed) {
            const enuToFixedFrameTransform = Transforms.eastNorthUpToFixedFrame(eyePositionFixed, undefined, scratchMatrix4);
            const enuRotationMatrix = Matrix4.getRotation(enuToFixedFrameTransform, scratchMatrix3);
            const enuOrientation = Quaternion.fromRotationMatrix(enuRotationMatrix);
            const physicalEyeStageOffsetFixed = Matrix3.multiplyByVector(enuRotationMatrix, physicalEyeStageOffset, physicalEyeStageOffset);
            const stagePositionFixed = Cartesian3.subtract(eyePositionFixed, physicalEyeStageOffsetFixed, physicalEyeStageOffsetFixed);
            stage.position = stage.position || new ConstantPositionProperty();
            stage.orientation = stage.orientation || new ConstantProperty();
            (stage.position as ConstantPositionProperty).setValue(stagePositionFixed, ReferenceFrame.FIXED);
            (stage.orientation as ConstantProperty).setValue(enuOrientation);
        } else {        
            const eyeFrame = eye && eye.position ? eye.position.referenceFrame : undefined;
            if (eyeFrame) {
                const eyePositionRelativeToEyeFrame = getEntityPositionInReferenceFrame(
                    eye,
                    time,
                    eyeFrame,
                    scratchCartesian2
                );
                if (eyePositionRelativeToEyeFrame) {
                    const stagePositionRelativeToEye = Cartesian3.subtract(eyePositionRelativeToEyeFrame, physicalEyeStageOffset, physicalEyeStageOffset);
                    (stage.position as ConstantPositionProperty).setValue(stagePositionRelativeToEye, eyeFrame);
                    (stage.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);
                }
            }
        }
    }

    private _updateLocalOrigin(state: FrameState) {
        const eye = this.entities.getById(EYE_ENTITY_ID);
        const stage = this.entities.getById(STAGE_ENTITY_ID);

        const stageFrame = stage && stage.position ? stage.position.referenceFrame : undefined;
        if (!eye || !stage) return;

        if (!defined(stageFrame)) {
            if (this.localOriginEastNorthUp.position!.referenceFrame !== stage) {
                (this.localOriginEastNorthUp.position as ConstantPositionProperty).setValue(Cartesian3.ZERO, stage);
                (this.localOriginEastNorthUp.orientation as ConstantProperty).setValue(Quaternion.IDENTITY);
                this.localOriginChangeEvent.raiseEvent(undefined);
            }
            return;
        }
        
        const eyePosition =
            eye.position && eye.position.getValueInReferenceFrame(state.time, stageFrame, scratchCartesian);

        if (!eyePosition) return;
        
        const localOriginPosition = this.localOriginEastNorthUp
            .position!.getValueInReferenceFrame(state.time, stageFrame, scratchOriginCartesian);
        
        if (!localOriginPosition ||
            Cartesian3.magnitude(
                Cartesian3.subtract(eyePosition, localOriginPosition, scratchOriginCartesian)
            ) > 5000) {
                const localOriginPositionProperty = <ConstantPositionProperty>this.localOriginEastNorthUp.position;
                const localOriginOrientationProperty = <ConstantProperty>this.localOriginEastNorthUp.orientation;
                const stagePosition = stage.position && stage.position.getValueInReferenceFrame(state.time, stageFrame, scratchCartesian);
                const stageOrientation = stage.orientation && stage.orientation.getValue(state.time, scratchQuaternion);
                localOriginPositionProperty.setValue(stagePosition, stageFrame)
                localOriginOrientationProperty.setValue(stageOrientation);
                this.localOriginChangeEvent.raiseEvent(undefined);
        }
    }
}

function _stringFromReferenceFrame(referenceFrame: string | ReferenceFrame | Entity): string {
    const rf = referenceFrame as Entity;
    return defined(rf.id) ? rf.id : '' + rf;
}



@autoinject()
export class ContextServiceProvider {

    public entitySubscriptionsBySubscriber = new WeakMap<SessionPort, Set<string>>();
    public subscribersByEntityId = new Map<string, Set<SessionPort>>();
    public subscribersChangeEvent = new Event<{id:string, subscribers}>();

    public publishingReferenceFrameMap = new Map<string, string|ReferenceFrame>();
    
    private _entityPoseCache: SerializedEntityStateMap = {};

    constructor(
        private sessionService:SessionService,
        private contextService:ContextService
    ) {
        sessionService.connectEvent.addEventListener((session) => {
            const  subscriptions = new Set<string>();
            this.entitySubscriptionsBySubscriber.set(session, subscriptions);

            session.on['ar.context.subscribe'] = ({id}:{id:string}) => {
                const subscribers = this.subscribersByEntityId.get(id) || new Set<SessionPort>();
                this.subscribersByEntityId.set(id, subscribers);
                subscribers.add(session);
                subscriptions.add(id);
                this.subscribersChangeEvent.raiseEvent({id, subscribers});

                session.closeEvent.addEventListener(()=>{
                    subscribers.delete(session);
                    this.subscribersChangeEvent.raiseEvent({id, subscribers});
                })
            }

            session.on['ar.context.unsubscribe'] = ({id}:{id:string}) => {
                const subscribers = this.subscribersByEntityId.get(id);
                subscribers && subscribers.delete(session);
                subscriptions.delete(id);
                this.subscribersChangeEvent.raiseEvent({id, subscribers});
            }

            session.closeEvent.addEventListener(()=>{
                subscriptions.forEach((id)=>{
                    const subscribers = this.subscribersByEntityId.get(id);
                    subscribers && subscribers.delete(session);
                    this.subscribersChangeEvent.raiseEvent({id, subscribers});
                });
                this.entitySubscriptionsBySubscriber.delete(session);
            })
        });

        this.contextService.updateEvent.addEventListener(()=>{
            this._publishUpdates();
        });
    }

    public publishEntityState(idOrEntity:string|Entity, time=this.contextService.time) {
        let id:string;
        let entity:Entity|undefined;

        if ((<Entity>idOrEntity).id) {
            entity = <Entity>idOrEntity;
            id = entity.id;
        } else {
            id = <string>idOrEntity;
            entity = this.contextService.entities.getById(id);
        }

        const subscribers = this.subscribersByEntityId.get(id);

        if (entity && subscribers) {
            const referenceFrameId = this.publishingReferenceFrameMap.get(id);
            const referenceFrame = defined(referenceFrameId) && typeof referenceFrameId === 'string' ? 
                this.contextService.entities.getById(referenceFrameId) :
                referenceFrameId;

            const entityStateMap = {[id]: getSerializedEntityState(entity, time, referenceFrame)};
            
            for (const s of subscribers) {
                s.send('ar.context.entityStateMap', entityStateMap);
            }
        }
    }
    
    private _publishUpdates() {
        this._entityPoseCache = {};
        for (const session of this.sessionService.managedSessions) {
            if (Role.isRealityAugmenter(session.info.role))
                this._sendUpdateForSession(session);
        }
    }

    private _sessionEntities:SerializedEntityStateMap = {};

    private _sendUpdateForSession(session: SessionPort) {
        const state = this.contextService.serializedFrameState!;
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

        // get subscrbied entities for the session
        for (const id of <string[]><any>this.entitySubscriptionsBySubscriber.get(session)) {
            const entity = this.contextService.entities.getById(id);
            sessionEntities[id] = this._getSerializedEntityState(entity, <JulianDate>state.time);
        }

        // recycle the parent frame state object, but with the session entities
        const parentEntities = state.entities;
        state.entities = sessionEntities;
        state.time = state.time;
        state.sendTime = JulianDate.now(<JulianDate>state.sendTime);
        if (session.info.version) session.send('ar.context.update', state);
        state.entities = parentEntities;
    }

    private _getSerializedEntityState(entity: Entity|undefined, time: JulianDate) {
        if (!entity) return undefined;

        const id = entity.id;

        if (!defined(this._entityPoseCache[id])) {
            const referenceFrameId = this.publishingReferenceFrameMap.get(id);
            const referenceFrame = defined(referenceFrameId) && typeof referenceFrameId === 'string' ? 
                this.contextService.entities.getById(referenceFrameId) :
                referenceFrameId;
            this._entityPoseCache[id] = getSerializedEntityState(entity, time, referenceFrame);
        }

        return this._entityPoseCache[id];
    }
}
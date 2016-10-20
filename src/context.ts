import { inject } from 'aurelia-dependency-injection'
import {
    Entity,
    EntityCollection,
    ConstantPositionProperty,
    ConstantProperty,
    Transforms,
    Cartesian3,
    Cartographic,
    Quaternion,
    JulianDate,
    ReferenceFrame,
    defined
} from './cesium/cesium-imports'
import { SerializedEntityPose, SerializedEntityPoseMap, FrameState, Role } from './common'
import { SessionService, SessionPort } from './session'
import { RealityService } from './reality'
import { TimerService } from './timer'
import { Event, getSerializedEntityPose, getEntityPositionInReferenceFrame, getEntityOrientationInReferenceFrame } from './utils'

/**
 * Describes the current pose of an entity relative to a particular reference frame
 */
export interface EntityPose {
    position: Cartesian3
    orientation: Quaternion,
    referenceFrame: Entity|ReferenceFrame,
    poseStatus: PoseStatus
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

const scratchCartesian3 = new Cartesian3(0, 0);
const scratchQuaternion = new Quaternion(0, 0);
const scratchOriginCartesian3 = new Cartesian3(0, 0);

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
@inject(SessionService, RealityService)
export class ContextService {

    /**
     * An event that is raised when all remotely managed entities are are up-to-date for 
     * the current frame. It is suggested that all modifications to locally managed entities 
     * should occur within this event. 
     */
    public updateEvent = new Event<ContextService>();

    /**
     * An event that is raised when it is an approriate time to render graphics. 
     * This event fires after the update event. 
     */
    public renderEvent = new Event<ContextService>();

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
     * The current cartographic position (WSG84)
     */
    public location?:Cartographic;
    public locationAccuracy?:number;
    public locationAltitudeAccuracy?:number;

    /**
     * The collection of all entities this application is aware of.
     */
    public entities = new EntityCollection();

    /**
     * An entity representing the location and orientation of the user. 
     */
    public user: Entity = this.entities.add(new Entity({
        id: 'ar.user',
        name: 'user',
        position: new ConstantPositionProperty(undefined, ReferenceFrame.FIXED),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    }));

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
    public get serializedFrameState(): FrameState | undefined {
        return this._serializedState;
    }

    // the current serialized frame state
    private _serializedState?: FrameState;

    private _entityPoseCache: SerializedEntityPoseMap = {};
    private _entityPoseMap = new Map<string, EntityPose | undefined>();

    private _subscribedEntities = new WeakMap<SessionPort, Set<string> | undefined>();
    private _updatingEntities = new Set<string>();
    private _knownEntities = new Set<string>();

    private _frameIndex = 0;

    constructor(
        private sessionService: SessionService,
        private realityService: RealityService,
        timerService: TimerService ) {

        if (this.sessionService.isRealityManager || this.sessionService.isRealityViewer) {

            this.realityService.viewStateEvent.addEventListener((viewState) => {
                this._update({
                    time: viewState.time, // deprecated
                    index: this._frameIndex++,
                    reality: realityService.getCurrent(),
                    entities: {},
                    view: viewState
                });
            })

            this.realityService.frameEvent.addEventListener((state) => {
                this._update(state);
            });

            this.sessionService.connectEvent.addEventListener((session) => {

                this._subscribedEntities.set(session, new Set<string>());

                session.on['ar.context.subscribe'] = ({id}: { id: string }) => {
                    const subscriptions = this._subscribedEntities.get(session);
                    if (subscriptions) subscriptions.add(id);
                }

            })
        } else {
            this.sessionService.manager.on['ar.context.update'] = (state: FrameState) => {
                this._update(state);
            }
        }
    }

    /**
     * Deprecated. Use timestamp property.
     * @private
     */
    public get systemTime() {
        console.warn('systemTime property is deprecated. Use timestamp property');
        Object.defineProperty(this, 'systemTime',{
            get: () => this.timestamp
        });
        return this.systemTime;
    } 

    /**
     * Deprecated. To be removed. 
     * @private
     */
    private getTime(): JulianDate {
        console.warn('getTime function is deprecated. Use the ContextService.time property instead.')
        this.getTime = () => this.time;
        return this.getTime();
    }

    /**
     * Deprecated. To be removed. 
     * @private
     */
    public setDefaultReferenceFrame(origin: Entity) {
        console.warn('setDefaultReferenceFrame is deprecated. Use the ContextService.defaultReferenceFrame property directly.')
        this.setDefaultReferenceFrame = (origin:Entity) => this.defaultReferenceFrame = origin;
        this.setDefaultReferenceFrame(origin);
    }

    /**
     * Deprecated. To be removed. 
     * @private
     */
    public getDefaultReferenceFrame(): Entity {        
        console.warn('getDefaultReferenceFrame is deprecated. Use the ContextService.defaultReferenceFrame property directly.')
        this.getDefaultReferenceFrame = () => this.defaultReferenceFrame;
        return this.getDefaultReferenceFrame();
    }

    /**
     * Adds an entity to this session's set of tracked entities.
     *
     * @param id - The unique identifier of an entity.
     * @returns The entity that was subscribed to.
     */
    public subscribeToEntityById(id: string): Entity {
        this.sessionService.manager.send('ar.context.subscribe', { id })
        return this.entities.getOrCreateEntity(id);
    }

    /**
     * Gets the current pose of an entity, relative to a given reference frame.
     *
     * @param entity - The entity whose state is to be queried.
     * @param referenceFrame - The intended reference frame. Defaults to `this.defaultReferenceFrame`.
     * @returns If the position and orientation exist for the given entity, an
     * object with the fields `position` and `orientation`, both of type
     * `Cartesian3`. Otherwise undefined.
     */
    public getEntityPose(entity: Entity, referenceFrame: ReferenceFrame | Entity = this.defaultReferenceFrame): EntityPose {
        const time = this.time;

        const key = entity.id + '@' + _stringFromReferenceFrame(referenceFrame);
        let entityPose = this._entityPoseMap.get(key);

        if (!defined(entityPose)) {
            entityPose = {
                position: new Cartesian3,
                orientation: new Quaternion,
                referenceFrame: referenceFrame,
                poseStatus: 0
            }
            this._entityPoseMap.set(key, entityPose);
        }

        const position = getEntityPositionInReferenceFrame(
            entity,
            time,
            referenceFrame,
            entityPose.position
        );
        const orientation = getEntityOrientationInReferenceFrame(
            entity,
            time,
            referenceFrame,
            entityPose.orientation
        );

        const hasPose = position && orientation;

        let poseStatus: PoseStatus = 0;
        const previousStatus = entityPose.poseStatus;

        if (hasPose) {
            poseStatus |= PoseStatus.KNOWN;
        }

        if (hasPose && !(previousStatus & PoseStatus.KNOWN)) {
            poseStatus |= PoseStatus.FOUND;
        } else if (!hasPose && previousStatus & PoseStatus.KNOWN) {
            poseStatus |= PoseStatus.LOST;
        }

        entityPose.poseStatus = poseStatus;

        return entityPose;
    }

    // TODO: This function is called a lot. Potential for optimization. 
    private _update(serializedState: FrameState) {
        // if this session is the manager, we need to update our child sessions a.s.a.p
        if (this.sessionService.isRealityManager) {
            delete serializedState.entities[this.user.id]; // children don't need this
            this._entityPoseCache = {};
            for (const session of this.sessionService.managedSessions) {
                if (Role.isRealityAugmenter(session.info.role))
                    this._sendUpdateForSession(serializedState, session);
            }
        }

        // our user entity is defined by the current view pose (the current reality must provide this)
        serializedState.entities[this.user.id] = serializedState.view.pose;

        // update the entities the manager knows about
        this._knownEntities.clear();
        for (const id in serializedState.entities) {
            this.updateEntityFromSerializedPose(id, serializedState.entities[id]);
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

        // update our local origin
        this._updateLocalOrigin(serializedState);

        // update our time values
        const timestamp = performance.now();
        this.deltaTime = Math.min(timestamp - this.timestamp, this.maxDeltaTime);
        this.timestamp = timestamp;
        JulianDate.clone(<JulianDate>serializedState.time, this.time);
        this._serializedState = serializedState;

        // raise an event for the user to update and render the scene
        this.updateEvent.raiseEvent(this);
        this.renderEvent.raiseEvent(this);
    }

    public updateEntityFromSerializedPose(id:string, entityPose?:SerializedEntityPose) {
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

    public publishEntityState(entity: Entity, referenceFrame: ReferenceFrame|Entity) {

    }

    private _updateLocalOrigin(state: FrameState) {
        const pose = state.view.pose!;
        const rootFrame:Entity|ReferenceFrame = 
            typeof pose.r === 'number' ?
            pose.r : this.entities.getOrCreateEntity(pose.r);
        const userPosition = this.user.position &&
            this.user.position.getValueInReferenceFrame(<JulianDate>state.time, rootFrame, scratchCartesian3);
        const localENUFrame = this.localOriginEastNorthUp.position &&
            this.localOriginEastNorthUp.position.referenceFrame;
        const localENUPosition = this.localOriginEastNorthUp.position && localENUFrame &&
            this.localOriginEastNorthUp.position.getValueInReferenceFrame(<JulianDate>state.time, localENUFrame, scratchOriginCartesian3);
        if (userPosition && (
            !localENUPosition ||
            localENUFrame !== rootFrame ||
            Cartesian3.magnitudeSquared(
                Cartesian3.subtract(userPosition, localENUPosition, scratchOriginCartesian3)
            ) > 25000000)) {
            const localENUPositionProperty = <ConstantPositionProperty>this.localOriginEastNorthUp.position;
            const localENUOrientationProperty = <ConstantProperty>this.localOriginEastNorthUp.orientation;
            localENUPositionProperty.setValue(userPosition, rootFrame);
            if (rootFrame === ReferenceFrame.FIXED) {
                const enuOrientation = Transforms.headingPitchRollQuaternion(userPosition, 0, 0, 0, undefined, scratchQuaternion);
                localENUOrientationProperty.setValue(enuOrientation);
            } else {
                localENUOrientationProperty.setValue(Quaternion.IDENTITY);
            }
            this.localOriginChangeEvent.raiseEvent(undefined);
        }
    }

    private _sessionEntities:SerializedEntityPoseMap = {};

    private _sendUpdateForSession(state: FrameState, session: SessionPort) {
        const sessionEntities = this._sessionEntities;

        // clear session entities
        for (var id in sessionEntities) {
            delete sessionEntities[id];
        }

        // reference all entities from the primary frame state (if any)
        for (var id in state.entities) {
            sessionEntities[id] = state.entities[id];
        }

        // get subscrbied entities for the session
        for (const id of <string[]><any>this._subscribedEntities.get(session)) {
            sessionEntities[id] = this._getSerializedEntityPose(id, <JulianDate>state.time);
        }

        // recycle the parent frame state object, but with the session entities
        const parentEntities = state.entities;
        state.entities = sessionEntities;
        state.sendTime = JulianDate.now(<JulianDate>state.sendTime);
        session.send('ar.context.update', state);
        state.entities = parentEntities;
    }

    private _getSerializedEntityPose(id: string, time: JulianDate) {
        if (!defined(this._entityPoseCache[id])) {
            const entity = this.entities.getById(id);
            if (!entity) return undefined;
            this._entityPoseCache[id] = getSerializedEntityPose(entity, time);
        }
        return this._entityPoseCache[id];
    }
}

function _stringFromReferenceFrame(referenceFrame: ReferenceFrame | Entity): string {
    const rf = referenceFrame as Entity;
    return defined(rf.id) ? rf.id : '' + rf;
}

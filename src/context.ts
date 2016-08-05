import { inject } from 'aurelia-dependency-injection'
import {
    Entity,
    EntityCollection,
    CompositeEntityCollection,
    ExtrapolationType,
    ConstantPositionProperty,
    ConstantProperty,
    SampledPositionProperty,
    SampledProperty,
    Transforms,
    Cartesian3,
    Quaternion,
    JulianDate,
    ReferenceFrame,
    defined
} from './cesium/cesium-imports'
import { SerializedEntityPoseMap, SerializedFrameState } from './common'
import { SessionService, SessionPort } from './session'
import { RealityService } from './reality'
import { Event, getRootReferenceFrame, getSerializedEntityPose, getEntityPositionInReferenceFrame, getEntityOrientationInReferenceFrame } from './utils'

/**
 * Describes the pose of an entity at a particular time relative to a particular reference frame
 */
export interface EntityPose {
    position: Cartesian3
    orientation: Quaternion,
    time: JulianDate
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

export interface Frame {
    /**
     * The absolute time for this frame (as determined by the current reality)
     */
    time: JulianDate,
    /**
     * The time in milliseconds when this frame was received, 
     * based on performance.now() (or Date.now() if performance.now is not available)
     */
    systemTime: number,
    /**
     * The time in milliseconds since the previous frame's systemTime, capped to context.maxDeltaTime
     */
    deltaTime: number
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
@inject(SessionService, RealityService)
export class ContextService {

    /**
     * An event that is raised when all remotely managed entities are are up-to-date for 
     * the current frame. It is suggested that all modifications to locally managed entities 
     * should occur within this event. 
     */
    public updateEvent = new Event<Frame>();

    /**
     * An event that is raised when it is an approriate time to render graphics. 
     * This event fires after the update event. 
     */
    public renderEvent = new Event<Frame>();

    /**
     * The set of entities representing well-known reference frames. 
     * These are assumed to be readily available to applications. 
     */
    public wellKnownReferenceFrames = new EntityCollection();

    /**
     * The set of subscribed entities.
     */
    public subscribedEntities = new EntityCollection();

    /**
     * The set of entities that this session is aware of. 
     */
    public entities = new CompositeEntityCollection();

    /**
     * An event that fires when the local origin changes.
     */
    public localOriginChangeEvent = new Event<void>();

    /**
     * An entity representing the location and orientation of the user. 
     */
    public user: Entity = new Entity({
        id: 'ar.user',
        name: 'user',
        position: new ConstantPositionProperty(undefined, ReferenceFrame.FIXED),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    });

    /**
     * An entity positioned near the user, aligned with the local East-North-Up
     * coordinate system.
     */
    public localOriginEastNorthUp: Entity = new Entity({
        id: 'ar.localENU',
        name: 'localOriginENU',
        position: new ConstantPositionProperty(undefined, ReferenceFrame.FIXED),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    });

    /**
     * An entity positioned near the user, aligned with the East-Up-South 
     * coordinate system. This useful for converting to the Y-Up convention 
     * used in some libraries, such as three.js.
     */
    public localOriginEastUpSouth: Entity = new Entity({
        id: 'ar.localEUS',
        name: 'localOriginEUS',
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.localOriginEastNorthUp),
        orientation: new ConstantProperty(Quaternion.fromAxisAngle(Cartesian3.UNIT_X, Math.PI / 2))
    });

    /**
     * The current frame
     */
    public get frame(): Frame {
        if (!defined(this.serializedFrameState))
            throw new Error('A frame state has not yet been received');
        return this._frame;
    }

    /**
     * The serialized frame state for this frame
     */
    public get serializedFrameState(): SerializedFrameState | undefined {
        return this._serializedState;
    }

    /**
     * This value caps the deltaTime for each frame
     */
    public maxDeltaTime = 1 / 3 * 1000;

    // the current serialized frame state
    private _serializedState?: SerializedFrameState;

    private _frame: Frame = {
        time: new JulianDate(0, 0),
        systemTime: 0,
        deltaTime: 0
    }

    // The default origin to use when calling `getEntityPose`.
    private _defaultReferenceFrame = this.localOriginEastNorthUp;

    private _entityPoseCache: SerializedEntityPoseMap = {};
    private _entityPoseMap = new Map<string, EntityPose | undefined>();

    private _subscribedEntities = new WeakMap<SessionPort, Set<string> | undefined>();
    private _updatingEntities = new Set<string>();
    private _knownEntities = new Set<string>();

    constructor(
        private sessionService: SessionService,
        private realityService: RealityService) {

        this.entities.addCollection(this.wellKnownReferenceFrames);
        this.entities.addCollection(this.subscribedEntities);

        this.subscribedEntities.add(this.user);

        if (this.sessionService.isManager) {
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
            this.sessionService.manager.on['ar.context.update'] = (state: SerializedFrameState) => {
                this._update(state);
            }
        }
    }

    /**
     * Get the current time
     */
    public getTime(): JulianDate {
        return this.frame.time;
    }

    /**
     * Set the default reference frame for `getCurrentEntityState`.
     */
    public setDefaultReferenceFrame(origin: Entity) {
        this._defaultReferenceFrame = origin;
    }

    /**
     * Get the default reference frame to use when calling `getEntityPose`. 
     * By default, this is the `localOriginEastNorthUp` reference frame.
     */
    public getDefaultReferenceFrame(): Entity {
        return this._defaultReferenceFrame;
    }

    /**
     * Adds an entity to this session's set of tracked entities.
     *
     * @param id - The unique identifier of an entity.
     * @returns The entity that was subscribed to.
     */
    public subscribeToEntityById(id: string): Entity {
        this.sessionService.manager.send('ar.context.subscribe', { id })
        return this.subscribedEntities.getOrCreateEntity(id);
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
    public getEntityPose(entity: Entity, referenceFrame: ReferenceFrame | Entity = this._defaultReferenceFrame): EntityPose {
        const time = this.getTime();

        const key = entity.id + '@' + _stringFromReferenceFrame(referenceFrame);
        let entityPose = this._entityPoseMap.get(key);

        if (!defined(entityPose)) {
            entityPose = {
                position: new Cartesian3,
                orientation: new Quaternion,
                time: JulianDate.clone(time),
                poseStatus: 0
            }
            this._entityPoseMap.set(key, entityPose);
        } else {
            JulianDate.clone(time, entityPose.time);
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

    /**
     * deprecated
     */
    public getCurrentEntityState(entity: Entity, referenceFrame: any) {
        console.warn('getCurrentEntityState is deprecated. Use getEntityPose instead.');
        return this.getEntityPose(entity, referenceFrame);
    }

    // TODO: This function is called a lot. Potential for optimization. 
    private _update(serializedState: SerializedFrameState) {
        // if this session is the manager, we need to update our child sessions a.s.a.p
        if (this.sessionService.isManager) {
            delete serializedState.entities[this.user.id]; // children don't need this
            this._entityPoseCache = {};
            for (const session of this.sessionService.managedSessions) {
                this._sendUpdateForSession(serializedState, session);
            }
        }

        // our user entity is defined by the current view pose (the current reality must provide this)
        serializedState.entities[this.user.id] = serializedState.view.pose;

        // update the entities the manager knows about
        this._knownEntities.clear();
        for (const id in serializedState.entities) {
            this.updateEntityFromFrameState(id, serializedState);
            this._updatingEntities.add(id);
            this._knownEntities.add(id);
        }

        // if the mangager didn't send us an update for a particular entity,
        // assume the manager no longer knows about it
        this._updatingEntities.forEach((id) => {
            if (!this._knownEntities.has(id)) {
                const entity = this.subscribedEntities.getById(id);
                entity.position = undefined;
                entity.orientation = undefined;
                this._updatingEntities.delete(id);
            }
        })

        // update our local origin
        this._updateLocalOrigin(serializedState);

        // update our frame object
        const frame = this._frame;
        const now = typeof performance !== 'undefined' ? performance.now() :  Date.now();
        frame.deltaTime = Math.max(now - frame.systemTime, this.maxDeltaTime);
        frame.systemTime = now;
        JulianDate.clone(<JulianDate>serializedState.time, frame.time);
        this._serializedState = serializedState;

        // raise an event for the user update and render the scene
        this.updateEvent.raiseEvent(frame);
        this.renderEvent.raiseEvent(frame);
    }

    public updateEntityFromFrameState(id: string, state: SerializedFrameState) {
        const entityPose = state.entities[id];
        if (!entityPose) {
            if (!this.wellKnownReferenceFrames.getById(id)) {
                this.subscribedEntities.getOrCreateEntity(id);
            }
            return;
        }

        let referenceFrame;

        if (defined(entityPose.r)) {
            if (typeof entityPose.r === 'number') {
                referenceFrame = entityPose.r;
            } else {
                referenceFrame = this.entities.getById(entityPose.r)
            }
        } else {
            referenceFrame = ReferenceFrame.FIXED;
        }

        if (!defined(referenceFrame)) {
            this.updateEntityFromFrameState(<string>entityPose.r, state);
            referenceFrame = this.entities.getById(entityPose.r);
        }

        const positionValue = entityPose.p === 0 ? Cartesian3.ZERO : <Cartesian3>entityPose.p;
        const orientationValue = entityPose.o === 0 ? Quaternion.IDENTITY : <Quaternion>entityPose.o;

        const entity = this.subscribedEntities.getOrCreateEntity(id);
        let entityPosition = entity.position;
        let entityOrientation = entity.orientation;

        if (!entityPosition || entityPosition.referenceFrame !== referenceFrame) {
            entityPosition = new ConstantPositionProperty(positionValue, referenceFrame);
            entity.position = entityPosition;
        }

        if (entityPosition instanceof ConstantPositionProperty) {
            entityPosition.setValue(positionValue, referenceFrame)
        } else if (entityPosition instanceof SampledPositionProperty) {
            entityPosition.addSample(JulianDate.clone(<JulianDate>state.time), positionValue);
        }

        if (orientationValue && !entityOrientation) {
            entityOrientation = new SampledProperty(Quaternion);
            (entityOrientation as SampledProperty).forwardExtrapolationType = ExtrapolationType.HOLD;
            (entityOrientation as SampledProperty).forwardExtrapolationDuration = 5 / 60;
            entityOrientation['maxNumSamples'] = 10; // using our extension to limit memory consumption
            entity.orientation = entityOrientation;
        }

        if (entityOrientation instanceof ConstantProperty) {
            entityOrientation.setValue(orientationValue);
        } else if (entityOrientation instanceof SampledProperty) {
            entityOrientation.addSample(JulianDate.clone(<JulianDate>state.time), orientationValue);
        }

        return entity;
    }

    private _updateLocalOrigin(state: SerializedFrameState) {
        const userRootFrame = getRootReferenceFrame(this.user);
        const userPosition = this.user.position &&
            this.user.position.getValueInReferenceFrame(<JulianDate>state.time, userRootFrame, scratchCartesian3);
        const localENUFrame = this.localOriginEastNorthUp.position &&
            this.localOriginEastNorthUp.position.referenceFrame;
        const localENUPosition = this.localOriginEastNorthUp.position && localENUFrame &&
            this.localOriginEastNorthUp.position.getValueInReferenceFrame(<JulianDate>state.time, localENUFrame, scratchOriginCartesian3);
        if (userPosition && (
            !localENUPosition ||
            localENUFrame !== userRootFrame ||
            Cartesian3.magnitudeSquared(
                Cartesian3.subtract(userPosition, localENUPosition, scratchOriginCartesian3)
            ) > 25000000)) {
            const localENUPositionProperty = <ConstantPositionProperty>this.localOriginEastNorthUp.position;
            const localENUOrientationProperty = <ConstantProperty>this.localOriginEastNorthUp.orientation;
            localENUPositionProperty.setValue(userPosition, userRootFrame);
            if (userRootFrame === ReferenceFrame.FIXED) {
                const enuOrientation = Transforms.headingPitchRollQuaternion(userPosition, 0, 0, 0, undefined, scratchQuaternion);
                localENUOrientationProperty.setValue(enuOrientation);
            } else {
                localENUOrientationProperty.setValue(Quaternion.IDENTITY);
            }
            this.localOriginChangeEvent.raiseEvent(undefined);
        }
    }

    private _sendUpdateForSession(parentState: SerializedFrameState, session: SessionPort) {

        const sessionPoseMap: SerializedEntityPoseMap = {}

        for (var id in parentState.entities) {
            sessionPoseMap[id] = parentState.entities[id];
        }

        const subscriptions = <Set<string>>this._subscribedEntities.get(session);
        subscriptions.forEach((id) => {
            this._addEntityAndAncestorsToPoseMap(sessionPoseMap, id, <JulianDate>parentState.time);
        })

        const sessionState: SerializedFrameState = {
            reality: parentState.reality,
            index: parentState.index,
            time: parentState.time,
            view: parentState.view,
            entities: sessionPoseMap,
            sendTime: JulianDate.now()
        };

        session.send('ar.context.update', sessionState);
    }

    private _addEntityAndAncestorsToPoseMap(poseMap: SerializedEntityPoseMap, id: string, time: JulianDate) {
        if (!defined(this._entityPoseCache[id])) {
            const entity = this.subscribedEntities.getById(id);
            if (!entity) return;
            this._entityPoseCache[id] = getSerializedEntityPose(entity, time);
            if (entity.position && entity.position.referenceFrame instanceof Entity) {
                const refId = _stringFromReferenceFrame(entity.position.referenceFrame);
                this._addEntityAndAncestorsToPoseMap(poseMap, refId, time);
            }
        }
        poseMap[id] = this._entityPoseCache[id];
    }
}

function _stringFromReferenceFrame(referenceFrame: ReferenceFrame | Entity): string {
    const rf = referenceFrame as Entity;
    return defined(rf.id) ? rf.id : '' + rf;
}

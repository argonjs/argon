import {inject} from 'aurelia-dependency-injection'
import {
    Entity,
    EntityCollection,
    ExtrapolationType,
    ConstantPositionProperty,
    ConstantProperty,
    PerspectiveFrustum,
    SampledPositionProperty,
    SampledProperty,
    Transforms,
    Cartesian3,
    Quaternion,
    JulianDate,
    ReferenceFrame,
    createGuid,
    defined
} from './cesium/cesium-imports'
import {Role, RealityView, SerializedFrameState, SerializedEntityPoseMap} from './common'
import {SessionService, SessionPort} from './session'
import {RealityService} from './reality'
import {TimerService} from './timer'
import {Event, getRootReferenceFrame, getSerializedEntityPose, getEntityPositionInReferenceFrame, getEntityOrientationInReferenceFrame} from './utils'

/**
 * Describes a complete frame state which is sent to child sessions
 */
export interface FrameState extends SerializedFrameState {
    reality: RealityView,
    entities: SerializedEntityPoseMap,
    sendTime: JulianDate, // the time this state was sent
}

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

const scratchDate = new JulianDate(0, 0);
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
@inject(SessionService, RealityService, TimerService)
export class ContextService {

    /**
     * An event that is raised when all remotely managed entities are are up-to-date for 
     * the current frame. It is suggested that all modifications to locally managed entities 
     * should occur within this event. 
     */
    public updateEvent = new Event<void>();

    /**
     * An event that is raised when it is an approriate time to render graphics. 
     * This event fires after the update event. 
     */
    public renderEvent = new Event<void>();

    /**
     * The set of entities that this session is aware of.
     */
    public entities = new EntityCollection();

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
        position: new ConstantPositionProperty(Cartesian3.ZERO, null),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    });

    /**
     * An entity positioned near the user, aligned with the local East-North-Up
     * coordinate system.
     */
    public localOriginEastNorthUp: Entity = new Entity({
        id: 'ar.localENU',
        name: 'localOriginENU',
        position: new ConstantPositionProperty(Cartesian3.ZERO, null),
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
     * Get the current time (not valid until the first update event)
     */
    public get time() {
        return this._time;
    }

    /**
     *  Used internally. Return the last frame state.
     */
    public get state() {
        return this._state;
    }

    // the current time (based on the current reality view, not valid until first update event)
    private _time = new JulianDate(0, 0);

    // The default origin to use when calling `getEntityPose`.
    private _defaultReferenceFrame = this.localOriginEastNorthUp;

    private _entityPoseCache: SerializedEntityPoseMap = {};
    private _entityPoseMap = new Map<string, EntityPose>();

    private _subscribedEntities = new WeakMap<SessionPort, Set<string>>();
    private _updatingEntities = new Set<string>();
    private _knownEntities = new Set<string>();

    private _state: FrameState; // the last frame state
    private _didUpdateState = false;

    private _onTick = () => {
        if (!this._didUpdateState) return;
        // have the user update thier scenegraph    
        // and render their scene
        // const now = JulianDate.now();
        // const diff = JulianDate.secondsDifference(now, this._state.sendTime);
        // const time = JulianDate.addSeconds(<JulianDate>this._state.time, diff, this._time);
        JulianDate.clone(<JulianDate>this._state.time, this._time);
        this.updateEvent.raiseEvent(undefined);
        this.renderEvent.raiseEvent(undefined);
        this._didUpdateState = false;
    };

    constructor(
        private sessionService: SessionService,
        private realityService: RealityService,
        private timerService: TimerService) {

        this.entities.add(this.user);

        if (this.sessionService.isManager()) {
            this.realityService.frameEvent.addEventListener((state) => {
                this._update({
                    reality: this.realityService.getCurrent(),
                    index: state.index,
                    time: state.time,
                    view: state.view,
                    entities: state.entities || {},
                    sendTime: JulianDate.now()
                });
            });
        } else {
            this.sessionService.manager.on['ar.context.update'] = (state: FrameState) => {
                this._update(state);
            }
        }

        this.sessionService.connectEvent.addEventListener((session) => {

            this._subscribedEntities.set(session, new Set<string>());

            session.on['ar.context.subscribe'] = ({id}) => {
                const subscriptions = this._subscribedEntities.get(session);
                subscriptions.add(id);
            }

        })
    }

    /**
     * Get the current time (not valid until the first update event)
     */
    public getTime() {
        return this._time;
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
    public getEntityPose(entity: Entity, referenceFrame: ReferenceFrame | Entity = this._defaultReferenceFrame): EntityPose {
        const time = this._time;

        const key = entity.id + _stringFromReferenceFrame(referenceFrame);
        let entityPose = this._entityPoseMap.get(key);

        if (entityPose && JulianDate.equals(entityPose.time, time))
            return entityPose;

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

    private getCurrentEntityState(entity: Entity, referenceFrame: any) {
        console.warn('getCurrentEntityState is deprecated. Use getEntityPose instead.');
        return this.getEntityPose(entity, referenceFrame);
    }

    private _update(state: FrameState) {
        // our user entity is defined by the current view pose (the current reality must provide this)
        state.entities[this.user.id] = state.view.pose;

        // save our subview poses to be updated as entities
        state.view.subviews.forEach((subview, index) => {
            // if the subview pose is undefined, assume it is the same as the view pose
            state.entities['ar.view_' + index] = subview.pose || state.view.pose;
        });

        // update the entities the manager knows about
        this._knownEntities.clear();
        for (const id in state.entities) {
            this._updateEntity(id, state);
            this._updatingEntities.add(id);
            this._knownEntities.add(id);
        }

        // if the mangager didn't send us an update for a particular entity,
        // assume the manager no longer knows about it
        this._updatingEntities.forEach((id) => {
            if (!this._knownEntities.has(id)) {
                const entity = this.entities.getById(id);
                entity.position = undefined;
                entity.orientation = undefined;
                this._updatingEntities.delete(id);
            }
        })

        // update our local origin
        this._updateLocalOrigin(state);

        // if this session is the manager, we need to update our child sessions
        if (this.sessionService.isManager()) {
            this._entityPoseCache = {};
            for (const session of this.sessionService.managedSessions) {
                if (session.info.role === Role.APPLICATION)
                    this._sendUpdateForSession(state, session);
            }
        }

        // save our state 
        this._state = state;
        // let the animation callback know we have a new state
        this._didUpdateState = true;
        // request the animation frame
        this.timerService.requestFrame(this._onTick);
    }

    private _updateEntity(id: string, state: FrameState) {
        const entityPose = state.entities[id];
        if (!entityPose) {
            this.entities.getOrCreateEntity(id);
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
            referenceFrame = this._updateEntity(<string>entityPose.r, state);
        }

        const positionValue = <Cartesian3>(entityPose.p === 0 ? Cartesian3.ZERO : entityPose.p);
        const orientationValue = entityPose.o === 0 ? Quaternion.IDENTITY : entityPose.o;

        const entity = this.entities.getOrCreateEntity(id);
        let entityPosition = entity.position;
        let entityOrientation = entity.orientation;

        if (!defined(entityPosition) || entityPosition.referenceFrame !== referenceFrame) {
            entityPosition = new SampledPositionProperty(referenceFrame);
            (entityPosition as SampledPositionProperty).forwardExtrapolationType = ExtrapolationType.HOLD;
            (entityPosition as SampledPositionProperty).forwardExtrapolationDuration = 5 / 60;
            entityPosition['maxNumSamples'] = 10; // using our extension to limit memory consumption
            entity.position = entityPosition;
        }

        if (entityPosition instanceof ConstantPositionProperty) {
            entityPosition.setValue(positionValue, referenceFrame)
        } else if (entityPosition instanceof SampledPositionProperty) {
            entityPosition.addSample(JulianDate.clone(<JulianDate>state.time), positionValue);
        }

        if (!defined(entityOrientation)) {
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

    private _updateLocalOrigin(state: FrameState) {
        const userRootFrame = getRootReferenceFrame(this.user);
        const userPosition = this.user.position.getValueInReferenceFrame(<JulianDate>state.time, userRootFrame, scratchCartesian3);
        const localENUFrame = this.localOriginEastNorthUp.position.referenceFrame;
        const localENUPosition = this.localOriginEastNorthUp.position.getValueInReferenceFrame(<JulianDate>state.time, localENUFrame, scratchOriginCartesian3);
        if (!localENUPosition || localENUFrame !== userRootFrame ||
            Cartesian3.magnitudeSquared(Cartesian3.subtract(userPosition, localENUPosition, scratchOriginCartesian3)) > 25000000) {
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

    private _sendUpdateForSession(parentState: FrameState, session: SessionPort) {

        const sessionPoseMap: SerializedEntityPoseMap = {}

        for (var id in parentState.entities) {
            sessionPoseMap[id] = parentState.entities[id];
        }

        this._subscribedEntities.get(session).forEach((id) => {
            this._addEntityAndAncestorsToPoseMap(sessionPoseMap, id, <JulianDate>parentState.time);
        })

        const sessionState: FrameState = {
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
            const entity = this.entities.getById(id);
            if (!entity) return;
            this._entityPoseCache[id] = getSerializedEntityPose(entity, time);
            if (entity.position.referenceFrame instanceof Entity) {
                const refId = _stringFromReferenceFrame(entity.position.referenceFrame);
                this._addEntityAndAncestorsToPoseMap(poseMap, refId, time);
            }
        }
        poseMap[id] = this._entityPoseCache[id];
    }
}

function _stringFromReferenceFrame(referenceFrame: ReferenceFrame | Entity) {
    const rf = <any>referenceFrame;
    return defined(rf.id) ? rf.id : '' + rf;
}

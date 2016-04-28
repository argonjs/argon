import {inject} from 'aurelia-dependency-injection'
import {
    Entity,
    EntityCollection,
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
import {Role, SerializedEntityPoseMap} from './common'
import {SessionService, SessionPort} from './session'
import {RealityService, FrameState, } from './reality'
import {Event, getRootReferenceFrame, getSerializedEntityPose, getEntityPositionInReferenceFrame, getEntityOrientationInReferenceFrame} from './utils'

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
@inject(SessionService, RealityService)
export class ContextService {

    /**
     * An event that is raised when all remotely managed entities are are up-to-date for 
     * the current frame. It is suggested that all modifications to locally managed entities 
     * should occur within this event. 
     */
    public updateEvent = new Event<FrameState>();

    /**
     * An event that is raised when it is an approriate time to render graphics. 
     * This event fires after the update event. 
     */
    public renderEvent = new Event<FrameState>();

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
        id: 'USER',
        name: 'user',
        position: new ConstantPositionProperty(),
        orientation: new ConstantProperty()
    });

    /**
     * An entity positioned near the user, aligned with the local East-North-Up
     * coordinate system.
     */
    public localOriginEastNorthUp: Entity = new Entity({
        name: 'localOriginENU',
        position: new ConstantPositionProperty(),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    });

    /**
     * An entity positioned near the user, aligned with the East-Up-South 
     * coordinate system. This useful for converting to the Y-Up convention 
     * used in some libraries, such as three.js.
     */
    public localOriginEastUpSouth: Entity = new Entity({
        name: 'localOriginEUS',
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.localOriginEastNorthUp),
        orientation: new ConstantProperty(Quaternion.fromAxisAngle(Cartesian3.UNIT_X, Math.PI / 2))
    });

    // the current time (based on the current reality view, not valid until first update event)
    private _time = new JulianDate(0, 0);

    // The default origin to use when calling `getEntityPose`.
    private _defaultReferenceFrame = this.localOriginEastNorthUp;

    private _entityPoseCache: SerializedEntityPoseMap = {};
    private _entityPoseMap = new Map<string, EntityPose>();

    private _subscribedEntities = new WeakMap<SessionPort, Set<string>>();
    private _updatingEntities = new Set<string>();
    private _knownEntities = new Set<string>();

    constructor(
        private sessionService: SessionService,
        private realityService: RealityService) {

        this.entities.add(this.user);

        if (this.sessionService.isManager()) {
            this.realityService.frameEvent.addEventListener((state) => {
                this._update(state);
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

        state.entities['USER'] = state.view.pose;

        state.view.subviews.forEach((subview, index) => {
            state.entities['ar.view_' + index] = subview.pose || state.view.pose;
        });

        this._knownEntities.clear();
        for (const id in state.entities) {
            this._updateEntity(id, state);
            this._updatingEntities.add(id);
            this._knownEntities.add(id);
        }

        this._updatingEntities.forEach((id) => {
            if (!this._knownEntities.has(id)) {
                this.entities.getById(id).position = undefined;
                this._updatingEntities.delete(id);
            }
        })

        this._updateOrigin(state);

        if (this.sessionService.isManager()) {
            this._entityPoseCache = {};
            for (const session of this.sessionService.managedSessions) {
                if (session.info.role === Role.APPLICATION)
                    this._sendUpdateForSession(state, session);
            }
        }

        JulianDate.clone(<JulianDate>state.time, this._time);
        this.updateEvent.raiseEvent(state);
        this.renderEvent.raiseEvent(state);

    }

    private _updateEntity(id: string, state: FrameState) {
        const entityPose = state.entities[id];
        if (!entityPose) return;

        let referenceFrame;

        if (entityPose.r) {
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
        const entityPosition = entity.position;
        const entityOrientation = entity.orientation;

        if (!defined(entityPosition)) {
            entity.position = new ConstantPositionProperty(positionValue, referenceFrame);
        } else if (entityPosition instanceof ConstantPositionProperty) {
            entityPosition.setValue(positionValue, referenceFrame)
        } else if (entityPosition instanceof SampledPositionProperty) {
            entityPosition.addSample(<JulianDate>state.time, positionValue);
        }

        if (!defined(entityOrientation)) {
            entity.orientation = new ConstantProperty(orientationValue);
        } else if (entityOrientation instanceof ConstantProperty) {
            entityOrientation.setValue(orientationValue);
        } else if (entityOrientation instanceof SampledProperty) {
            entityOrientation.addSample(<JulianDate>state.time, orientationValue);
        }

        return entity;
    }

    private _updateOrigin(state: FrameState) {
        const userRootFrame = getRootReferenceFrame(this.user);
        const userPosition = this.user.position.getValueInReferenceFrame(<JulianDate>state.time, userRootFrame, scratchCartesian3);
        const localENUFrame = this.localOriginEastNorthUp.position.referenceFrame;
        const localENUPosition = this.localOriginEastNorthUp.position.getValueInReferenceFrame(<JulianDate>state.time, localENUFrame, scratchOriginCartesian3);
        if (!localENUPosition || localENUFrame !== userRootFrame ||
            Cartesian3.magnitudeSquared(Cartesian3.subtract(userPosition, localENUPosition, scratchOriginCartesian3)) > 25000000) {
            const localENUPositionProperty = <ConstantPositionProperty>this.localOriginEastNorthUp.position;
            const localENUOrientationProperty = <ConstantProperty>this.localOriginEastNorthUp.orientation;
            localENUPositionProperty.setValue(userPosition, userRootFrame);
            if (localENUFrame === ReferenceFrame.FIXED) {
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
            time: parentState.time,
            frameNumber: parentState.frameNumber,
            view: parentState.view,
            entities: sessionPoseMap
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

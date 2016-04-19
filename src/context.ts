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
import {Role} from './config'
import {DeviceService} from './device'
import {SessionService, SessionPort} from './session'
import {RealityService, FrameState, SerializedEntityPoseMap} from './reality'
import {Event, calculatePose, getRootReferenceFrame, getEntityPositionInReferenceFrame, getEntityOrientationInReferenceFrame} from './utils'

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
* A bitmask that describes the position and orientation of an EntityState.
* A valid pose status is one of the following:
*   KNOWN - the pose of the entity state is known. 
*   UNKNOWN - the pose of the entity state is unknown.
*   KNOWN & FOUND - the pose was UNKNOWN when the entity state was last queried, and is now KNOWN
*   LOST & UNKNOWN - the pose was KNOWN when the entity state was last queried, and is now UNKNOWN
*/
export enum PoseStatus {
    KNOWN = 1,
    UNKNOWN = 2,
    FOUND = 4,
    LOST = 8
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
@inject(SessionService, RealityService, DeviceService)
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
        orientation: new ConstantProperty()
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

    private _subscribedEntities = new WeakMap<SessionPort, string[]>();
    private _updatingEntities = new Set<string>();
    private _knownEntities = new Set<string>();

    constructor(
        private sessionService: SessionService,
        private realityService: RealityService,
        private deviceService: DeviceService) {

        this.entities.add(this.user);
        this.entities.add(deviceService.entity);
        this.entities.add(deviceService.interfaceEntity);

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

            session.on['ar.context.subscribe'] = ({id}) => {
                const subscriptions = this._subscribedEntities.get(session) || [];
                if (subscriptions.indexOf(id) === -1) subscriptions.push(id);
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
                poseStatus: PoseStatus.UNKNOWN
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
        } else {
            poseStatus |= PoseStatus.UNKNOWN;
        }

        if (hasPose && previousStatus & PoseStatus.UNKNOWN) {
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

        JulianDate.clone(state.time, this._time);
        this.updateEvent.raiseEvent(state);
        this.renderEvent.raiseEvent(state);

    }

    private _updateEntity(id: string, state: FrameState) {
        const entityPose = state.entities[id];

        let referenceFrame = (typeof entityPose.referenceFrame === 'number') ?
            <ReferenceFrame>entityPose.referenceFrame :
            this.entities.getById(entityPose.referenceFrame);
        if (!defined(referenceFrame)) {
            referenceFrame = this._updateEntity(<string>entityPose.referenceFrame, state);
        }

        const entity = this.entities.getOrCreateEntity(id);

        if (entity.position instanceof ConstantPositionProperty === false ||
            entity.orientation instanceof ConstantProperty === false) {
            entity.position = new ConstantPositionProperty(<Cartesian3>entityPose.position, referenceFrame);
            entity.orientation = new ConstantProperty(entityPose.orientation);
        }

        const entityPosition = <ConstantPositionProperty>entity.position;
        const entityOrientation = <ConstantProperty>entity.orientation;
        entityPosition.setValue(<Cartesian3>entityPose.position, referenceFrame)
        entityOrientation.setValue(entityPose.orientation);

        return entity;
    }

    private _updateOrigin(state: FrameState) {

        const userRootFrame = getRootReferenceFrame(this.user);
        const userPosition = this.user.position.getValueInReferenceFrame(state.time, userRootFrame, scratchCartesian3);

        const userENUPositionProperty = <ConstantPositionProperty>this.localOriginEastNorthUp.position;
        userENUPositionProperty.setValue(userPosition, userRootFrame);

        const localENUFrame = this.localOriginEastNorthUp.position.referenceFrame
        const localENUPosition = this.localOriginEastNorthUp.position.getValueInReferenceFrame(state.time, localENUFrame, scratchOriginCartesian3)
        if (!localENUPosition || localENUFrame !== userRootFrame ||
            Cartesian3.magnitudeSquared(Cartesian3.subtract(userPosition, localENUPosition, scratchOriginCartesian3)) > 25000000) {
            const localENUPositionProperty = <ConstantPositionProperty>this.localOriginEastNorthUp.position;
            const localENUOrientationProperty = <ConstantProperty>this.localOriginEastNorthUp.orientation;
            localENUPositionProperty.setValue(userPosition, userRootFrame);
            const enuOrientation = getEntityOrientationInReferenceFrame(this.localOriginEastNorthUp, state.time, userRootFrame, scratchQuaternion);
            localENUOrientationProperty.setValue(enuOrientation);
            this.localOriginChangeEvent.raiseEvent(undefined);
        }
    }

    private _sendUpdateForSession(parentState: FrameState, session: SessionPort) {
        const sessionPoseMap: SerializedEntityPoseMap = {}

        for (var id in parentState.entities) {
            sessionPoseMap[id] = parentState.entities[id];
        }

        for (var id in this._subscribedEntities.get(session)) {
            this._addEntityAndAncestorsToPoseMap(sessionPoseMap, id, parentState.time);
        }

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
            this._entityPoseCache[id] = calculatePose(entity, time);
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

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
import {SessionService, SessionPort} from './session'
import {RealityService, FrameState, EntityPoseMap} from './reality'
import {Event, calculatePose, getRootReferenceFrame, getEntityPositionInReferenceFrame, getEntityOrientationInReferenceFrame} from './utils'
import {CameraService} from './camera'
import {ViewportService} from './viewport'


/**
 * Describes the state of an entity at a particular time relative to a particular reference frame
 */
export interface EntityState {
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
@inject(SessionService, RealityService, CameraService, ViewportService)
export class ContextService {

    /**
     * An event that is raised when all remotely managed entities are are up-to-date for 
     * the current frame. It is suggested that all modifications to locally managed entities 
     * should occur within this event. 
     */
    public readonly updateEvent = new Event<FrameState>();

    /**
     * An event that is raised when it is an approriate time to render graphics. 
     * This event fires after the update event. 
     */
    public readonly renderEvent = new Event<FrameState>();

    /**
     * The set of entities that this session is aware of.
     */
    public readonly entities = new EntityCollection();

    /**
     * The current time (not valid until the first update event)
     */
    public readonly time = new JulianDate(0, 0);

    /**
     * An origin positioned near the eye which doesn't change very often,
     * aligned with the East-North-Up coordinate system.
     */
    public localOriginEastNorthUp: Entity = new Entity({
        name: 'origin',
        position: new ConstantPositionProperty(),
        orientation: new ConstantProperty()
    });

    /**
     * An origin positioned near the eye which doesn't change very often,
     * aligned with the East-Up-South coordinate system. This useful for
     * converting to the Y-Up convention used in some libraries, such as
     * three.js.
     */
    public localOriginEastUpSouth: Entity = new Entity({
        name: 'originEastUpSouth',
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.localOriginEastNorthUp),
        orientation: new ConstantProperty(Quaternion.fromAxisAngle(Cartesian3.UNIT_X, Math.PI / 2))
    });

    /**
     * An event that fires when the local origin changes.
     */
    public readonly localOriginChangeEvent = new Event<void>();

    /**
     * The default origin to use when calling `getEntityState`. By default,
     * this is `this.localOriginEastNorthUp`.
     */
    public defaultOrigin = this.localOriginEastNorthUp;

    /**
     * An entity representing the current device which is running Argon.
     */
    public device: Entity = new Entity({
        id: 'DEVICE',
        name: 'device',
        position: new ConstantPositionProperty(),
        orientation: new ConstantProperty()
    });

    /**
     * An entity representing the 'eye' through which the user sees (usually the
     * camera on the current device for a video-see-through realty). The scene 
     * should always be rendered from this viewpoint.
     */
    public eye: Entity = new Entity({
        id: 'EYE',
        name: 'eye',
        position: new ConstantPositionProperty(),
        orientation: new ConstantProperty()
    });

    /**
     * An origin positioned at the eye, aligned with the local East-North-Up
     * coordinate system.
     */
    public eyeOriginEastNorthUp: Entity = new Entity({
        name: 'eyeOrigin',
        position: new ConstantPositionProperty(),
        orientation: new ConstantProperty()
    });

    private _subscribedEntities = new WeakMap<SessionPort, string[]>();
    private _entityStateMap = new Map<string, EntityState>();
    private _updatingEntities = new Set<string>();
    private _knownEntities = new Set<string>();

    constructor(
        private sessionService: SessionService,
        private realityService: RealityService,
        private cameraService: CameraService,
        private viewportService: ViewportService) {

        this.entities.add(this.device);
        this.entities.add(this.eye);

        if (this.sessionService.isManager()) {
            this.realityService.frameEvent.addEventListener((state) => {
                console.log('calling update');
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
     * Set the default origin.
     */
    public setDefaultOrigin(origin: Entity) {
        this.defaultOrigin = origin;
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
     * Gets the state of an entity at the current context time relative to a reference frame.
     *
     * @param entity - The entity whose state is to be queried.
     * @param referenceFrame - The relative reference frame. Defaults to `this.origin`.
     * @returns If the position and orientation exist for the given entity, an
     * object with the fields `position` and `orientation`, both of type
     * `Cartesian3`. Otherwise undefined.
     */
    public getCurrentEntityState(entity: Entity, referenceFrame: ReferenceFrame | Entity = this.defaultOrigin) {
        const time = this.time;

        const key = entity.id + _stringFromReferenceFrame(referenceFrame);
        let entityState = this._entityStateMap.get(key);

        if (entityState && JulianDate.equals(entityState.time, time))
            return entityState;

        if (!defined(entityState)) {
            entityState = {
                position: new Cartesian3,
                orientation: new Quaternion,
                time: JulianDate.clone(time),
                poseStatus: PoseStatus.UNKNOWN
            }
            this._entityStateMap.set(key, entityState);
        } else {
            JulianDate.clone(time, entityState.time);
        }

        const position = getEntityPositionInReferenceFrame(
            entity,
            time,
            referenceFrame,
            entityState.position
        );
        const orientation = getEntityOrientationInReferenceFrame(
            entity,
            time,
            referenceFrame,
            entityState.orientation
        );

        const hasPose = position && orientation;

        let poseStatus: PoseStatus = 0;
        const previousStatus = entityState.poseStatus;

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

        entityState.poseStatus = poseStatus;

        return entityState;
    }

    private _update(state: FrameState) {

        this.viewportService._setViewport(state.viewport);
        this.cameraService._setCamera(state.camera);

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

        const entityPoseCache: EntityPoseMap = {};

        if (this.sessionService.isManager()) {
            for (const session of this.sessionService.managedSessions) {
                if (session.info.enableIncomingUpdateEvents)
                    this._sendUpdateForSession(state, session, entityPoseCache);
            }
        }

        JulianDate.clone(state.time, this.time);
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

        const eyeRootFrame = getRootReferenceFrame(this.eye);
        const eyePosition = this.eye.position.getValueInReferenceFrame(state.time, eyeRootFrame, scratchCartesian3);

        const eyeENUPositionProperty = <ConstantPositionProperty>this.eyeOriginEastNorthUp.position;
        eyeENUPositionProperty.setValue(eyePosition, eyeRootFrame);

        const localENUFrame = this.localOriginEastNorthUp.position.referenceFrame
        const localENUPosition = this.localOriginEastNorthUp.position.getValueInReferenceFrame(state.time, localENUFrame, scratchOriginCartesian3)
        if (!localENUPosition || localENUFrame !== eyeRootFrame ||
            Cartesian3.magnitudeSquared(Cartesian3.subtract(eyePosition, localENUPosition, scratchOriginCartesian3)) > 25000000) {
            const localENUPositionProperty = <ConstantPositionProperty>this.localOriginEastNorthUp.position;
            const localENUOrientationProperty = <ConstantProperty>this.localOriginEastNorthUp.orientation;
            localENUPositionProperty.setValue(eyePosition, eyeRootFrame);
            const enuOrientation = getEntityOrientationInReferenceFrame(this.localOriginEastNorthUp, state.time, eyeRootFrame, scratchQuaternion);
            localENUOrientationProperty.setValue(enuOrientation);
            this.localOriginChangeEvent.raiseEvent(undefined);
        }
    }

    private _sendUpdateForSession(parentState: FrameState, session: SessionPort, entityPoseCache: EntityPoseMap) {
        const sessionEntities: EntityPoseMap = {}

        for (var id in parentState.entities) {
            sessionEntities[id] = parentState.entities[id];
        }

        for (var id in this._subscribedEntities.get(session)) {
            if (!defined(entityPoseCache[id])) {
                const entity = this.entities.getById(id);
                entityPoseCache[id] = calculatePose(entity, parentState.time);
            }
            sessionEntities[id] = entityPoseCache[id];
        }

        const sessionState: FrameState = {
            time: parentState.time,
            frameNumber: parentState.frameNumber,
            reality: parentState.reality,
            camera: parentState.camera,
            viewport: parentState.viewport,
            entities: sessionEntities
        };

        session.send('ar.context.update', sessionState);
    }
}

function _stringFromReferenceFrame(referenceFrame: ReferenceFrame | Entity) {
    const rf = <any>referenceFrame;
    return defined(rf.id) ? rf.id : '' + rf;
}

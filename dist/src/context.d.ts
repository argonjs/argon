import { Entity, EntityCollection, Cartesian3, Quaternion, JulianDate, ReferenceFrame } from './cesium/cesium-imports';
import { SessionService } from './session';
import { RealityService, FrameState } from './reality';
import { Event } from './utils';
import { CameraService } from './camera';
import { ViewportService } from './viewport';
/**
 * Describes the state of an entity at a particular time relative to a particular reference frame
 */
export interface EntityState {
    position: Cartesian3;
    orientation: Quaternion;
    time: JulianDate;
    poseStatus: PoseStatus;
}
/**
* A bitmask that describes the position and orientation of an EntityState.
* A valid pose status is one of the following:
*   KNOWN - the pose of the entity state is known.
*   UNKNOWN - the pose of the entity state is unknown.
*   KNOWN & FOUND - the pose was UNKNOWN when the entity state was last queried, and is now KNOWN
*   LOST & UNKNOWN - the pose was KNOWN when the entity state was last queried, and is now UNKNOWN
*/
export declare enum PoseStatus {
    KNOWN = 1,
    UNKNOWN = 2,
    FOUND = 4,
    LOST = 8,
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
export declare class ContextService {
    private sessionService;
    private realityService;
    private cameraService;
    private viewportService;
    /**
     * An event that is raised when all remotely managed entities are are up-to-date for
     * the current frame. It is suggested that all modifications to locally managed entities
     * should occur within this event.
     */
    updateEvent: Event<FrameState>;
    /**
     * An event that is raised when it is an approriate time to render graphics.
     * This event fires after the update event.
     */
    renderEvent: Event<FrameState>;
    /**
     * The set of entities that this session is aware of.
     */
    entities: EntityCollection;
    /**
     * The current time (not valid until the first update event)
     */
    time: JulianDate;
    /**
     * An origin positioned near the eye which doesn't change very often,
     * aligned with the East-North-Up coordinate system.
     */
    localOriginEastNorthUp: Entity;
    /**
     * An origin positioned near the eye which doesn't change very often,
     * aligned with the East-Up-South coordinate system. This useful for
     * converting to the Y-Up convention used in some libraries, such as
     * three.js.
     */
    localOriginEastUpSouth: Entity;
    /**
     * An event that fires when the local origin changes.
     */
    localOriginChangeEvent: Event<void>;
    /**
     * The default origin to use when calling `getEntityState`. By default,
     * this is `this.localOriginEastNorthUp`.
     */
    defaultReferenceFrame: Entity;
    /**
     * An entity representing the current device which is running Argon.
     */
    device: Entity;
    /**
     * An entity representing the 'eye' through which the user sees (usually the
     * camera on the current device for a video-see-through realty). The scene
     * should always be rendered from this viewpoint.
     */
    eye: Entity;
    /**
     * An origin positioned at the eye, aligned with the local East-North-Up
     * coordinate system.
     */
    eyeOriginEastNorthUp: Entity;
    private _subscribedEntities;
    private _entityStateMap;
    private _updatingEntities;
    private _knownEntities;
    constructor(sessionService: SessionService, realityService: RealityService, cameraService: CameraService, viewportService: ViewportService);
    /**
     * Set the default reference frame for `getCurrentEntityState`.
     */
    setDefaultReferenceFrame(origin: Entity): void;
    /**
     * Adds an entity to this session's set of tracked entities.
     *
     * @param id - The unique identifier of an entity.
     * @returns The entity that was subscribed to.
     */
    subscribeToEntityById(id: string): Entity;
    /**
     * Gets the state of an entity at the current context time relative to a reference frame.
     *
     * @param entity - The entity whose state is to be queried.
     * @param referenceFrame - The intended reference frame. Defaults to `this.defaultReferenceFrame`.
     * @returns If the position and orientation exist for the given entity, an
     * object with the fields `position` and `orientation`, both of type
     * `Cartesian3`. Otherwise undefined.
     */
    getCurrentEntityState(entity: Entity, referenceFrame?: ReferenceFrame | Entity): EntityState;
    private _update(state);
    private _updateEntity(id, state);
    private _updateOrigin(state);
    private _sendUpdateForSession(parentState, session, entityPoseCache);
}

import { Entity, EntityCollection, Cartesian3, Quaternion, JulianDate, ReferenceFrame } from './cesium/cesium-imports';
import { SessionService } from './session';
import { RealityService, FrameState } from './reality';
import { Event } from './utils';
/**
 * Describes the pose of an entity at a particular time relative to a particular reference frame
 */
export interface EntityPose {
    position: Cartesian3;
    orientation: Quaternion;
    time: JulianDate;
    poseStatus: PoseStatus;
}
/**
* A bitmask that provides metadata about the pose of an EntityPose.
*   KNOWN - the pose of the entity state is defined.
*   KNOWN & FOUND - the pose was undefined when the entity state was last queried, and is now defined.
*   LOST - the pose was defined when the entity state was last queried, and is now undefined
*/
export declare enum PoseStatus {
    KNOWN = 1,
    FOUND = 2,
    LOST = 4,
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
     * An event that fires when the local origin changes.
     */
    localOriginChangeEvent: Event<void>;
    /**
     * An entity representing the location and orientation of the user.
     */
    user: Entity;
    /**
     * An entity positioned near the user, aligned with the local East-North-Up
     * coordinate system.
     */
    localOriginEastNorthUp: Entity;
    /**
     * An entity positioned near the user, aligned with the East-Up-South
     * coordinate system. This useful for converting to the Y-Up convention
     * used in some libraries, such as three.js.
     */
    localOriginEastUpSouth: Entity;
    private _time;
    private _defaultReferenceFrame;
    private _entityPoseCache;
    private _entityPoseMap;
    private _subscribedEntities;
    private _updatingEntities;
    private _knownEntities;
    constructor(sessionService: SessionService, realityService: RealityService);
    /**
     * Get the current time (not valid until the first update event)
     */
    getTime(): JulianDate;
    /**
     * Set the default reference frame for `getCurrentEntityState`.
     */
    setDefaultReferenceFrame(origin: Entity): void;
    /**
     * Get the default reference frame to use when calling `getEntityPose`.
     * By default, this is the `localOriginEastNorthUp` reference frame.
     */
    getDefaultReferenceFrame(): Entity;
    /**
     * Adds an entity to this session's set of tracked entities.
     *
     * @param id - The unique identifier of an entity.
     * @returns The entity that was subscribed to.
     */
    subscribeToEntityById(id: string): Entity;
    /**
     * Gets the current pose of an entity, relative to a given reference frame.
     *
     * @param entity - The entity whose state is to be queried.
     * @param referenceFrame - The intended reference frame. Defaults to `this.defaultReferenceFrame`.
     * @returns If the position and orientation exist for the given entity, an
     * object with the fields `position` and `orientation`, both of type
     * `Cartesian3`. Otherwise undefined.
     */
    getEntityPose(entity: Entity, referenceFrame?: ReferenceFrame | Entity): EntityPose;
    private getCurrentEntityState(entity, referenceFrame);
    private _update(state);
    private _updateEntity(id, state);
    private _updateOrigin(state);
    private _sendUpdateForSession(parentState, session);
    private _addEntityAndAncestorsToPoseMap(poseMap, id, time);
}

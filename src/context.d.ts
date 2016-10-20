/// <reference types="cesium" />
import { Entity, EntityCollection, Cartesian3, Cartographic, Quaternion, JulianDate, ReferenceFrame } from './cesium/cesium-imports';
import { SerializedEntityPose, FrameState } from './common';
import { SessionService } from './session';
import { RealityService } from './reality';
import { TimerService } from './timer';
import { Event } from './utils';
/**
 * Describes the current pose of an entity relative to a particular reference frame
 */
export interface EntityPose {
    position: Cartesian3;
    orientation: Quaternion;
    referenceFrame: Entity | ReferenceFrame;
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
    updateEvent: Event<ContextService>;
    /**
     * An event that is raised when it is an approriate time to render graphics.
     * This event fires after the update event.
     */
    renderEvent: Event<ContextService>;
    /**
     * An event that fires when the local origin changes.
     */
    localOriginChangeEvent: Event<void>;
    /**
     * A monotonically increasing value (in milliseconds) for the current frame state.
     * This value is useful only for doing accurate *timing*, not for determining
     * the absolute time. Use [[ContextService.time]] for absolute time.
     * This value is -1 until the first [[ContextService.updateEvent]].
     */
    timestamp: number;
    /**
     * The time in milliseconds since the previous timestamp,
     * capped to [[ContextService.maxDeltaTime]]
     */
    deltaTime: number;
    /**
     * This value caps the deltaTime for each frame. By default,
     * the value is 1/3s (333.3ms)
     */
    maxDeltaTime: number;
    /**
     * The current (absolute) time according to the current reality.
     * This value is arbitrary until the first [[ContextService.updateEvent]].
     */
    time: JulianDate;
    /**
     * The current cartographic position (WSG84)
     */
    location?: Cartographic;
    locationAccuracy?: number;
    locationAltitudeAccuracy?: number;
    /**
     * The collection of all entities this application is aware of.
     */
    entities: EntityCollection;
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
    /**
     * The default origin to use when calling `getEntityPose`.
     * By default, this is the `localOriginEastNorthUp` reference frame.
     */
    defaultReferenceFrame: Entity;
    /**
     * The serialized frame state for this frame
     */
    readonly serializedFrameState: FrameState | undefined;
    private _serializedState?;
    private _entityPoseCache;
    private _entityPoseMap;
    private _subscribedEntities;
    private _updatingEntities;
    private _knownEntities;
    private _frameIndex;
    constructor(sessionService: SessionService, realityService: RealityService, timerService: TimerService);
    /**
     * Deprecated. Use timestamp property.
     * @private
     */
    readonly systemTime: any;
    /**
     * Deprecated. To be removed.
     * @private
     */
    private getTime();
    /**
     * Deprecated. To be removed.
     * @private
     */
    setDefaultReferenceFrame(origin: Entity): void;
    /**
     * Deprecated. To be removed.
     * @private
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
    private _update(serializedState);
    updateEntityFromSerializedPose(id: string, entityPose?: SerializedEntityPose): Entity;
    publishEntityState(entity: Entity, referenceFrame: ReferenceFrame | Entity): void;
    private _updateLocalOrigin(state);
    private _sessionEntities;
    private _sendUpdateForSession(state, session);
    private _getSerializedEntityPose(id, time);
}

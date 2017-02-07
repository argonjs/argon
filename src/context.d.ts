/// <reference types="cesium" />
import { Entity, EntityCollection, Cartesian3, Quaternion, JulianDate, ReferenceFrame } from './cesium/cesium-imports';
import { SerializedEntityState, SerializedSubviewList, FrameState, Viewport } from './common';
import { SessionService, SessionPort } from './session';
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
    constructor(sessionService: SessionService);
    /**
     * An event that is raised when the next frame state is available.
     */
    frameStateEvent: Event<FrameState>;
    /**
     * An event that is raised after managed entities have been updated for
     * the current frame.
     */
    updateEvent: Event<ContextService>;
    /**
     * An event that is raised when it is an approriate time to render graphics.
     * This event fires after the update event.
     */
    renderEvent: Event<ContextService>;
    /**
     * An event that is raised after the render event
     */
    postRenderEvent: Event<ContextService>;
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
     * The collection of all entities this application is aware of.
     */
    entities: EntityCollection;
    /**
     * An alias for the 'eye' entity. To be deprecated in favor of `ViewService.eye`.
     */
    readonly user: Entity;
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
    readonly serializedFrameState: FrameState;
    private _serializedFrameState;
    private _entityPoseMap;
    private _updatingEntities;
    private _knownEntities;
    /**
     * Deprecated. Use timestamp property.
     * @private
     */
    readonly systemTime: number;
    /**
     * Deprecated. To be removed.
     * @private
     */
    getTime(): JulianDate;
    /**
     * Deprecated. To be removed. Use the defaultReferenceFrame property.
     * @private
     */
    setDefaultReferenceFrame(origin: Entity): void;
    /**
     * Deprecated. To be removed.  Use the defaultReferenceFrame property.
     * @private
     */
    getDefaultReferenceFrame(): Entity;
    /**
     * Subscribe to pose updates for an entity specified by the given id
     *
     * @deprecated Use [[ContextService#subscribe]]
     * @param id - the id of the desired entity
     * @returns A new or existing entity instance matching the given id
     */
    subscribeToEntityById(id: string): Entity;
    /**
     * Subscribe to pose updates for the given entity id
     *
     * @param id - the id of the desired entity
     * @returns A Promise that resolves to a new or existing entity
     * instance matching the given id, if the subscription is successful
     */
    subscribe(id: string | Entity): Promise<Entity>;
    /**
     * Unsubscribe to pose updates for the given entity id
     */
    unsubscribe(id: string | Entity): void;
    /**
     * Gets the current pose of an entity, relative to a given reference frame.
     *
     * @param entity - The entity whose state is to be queried.
     * @param referenceFrame - The intended reference frame. Defaults to `this.defaultReferenceFrame`.
     * @returns If the position and orientation exist for the given entity, an
     * object with the fields `position` and `orientation`, both of type
     * `Cartesian3`. Otherwise undefined.
     */
    getEntityPose(entityOrId: Entity | string, referenceFrameOrId?: string | ReferenceFrame | Entity): EntityPose;
    _scratchFrameState: FrameState;
    createFrameState(time: JulianDate, viewport: Viewport, subviewList: SerializedSubviewList, eye: Entity, horizontalAccuracy?: number, verticalAccuracy?: number, headingAccuracy?: number): FrameState;
    private _frameIndex;
    /**
     * Process the next frame state (which should come from the current reality viewer)
     */
    submitFrameState(frameState: FrameState): void;
    private _update(frameState);
    updateEntityFromSerializedPose(id: string, entityPose?: SerializedEntityState): Entity;
    private _updateStage(state);
    private _updateLocalOrigin(state);
}
export declare class ContextServiceProvider {
    private sessionService;
    private contextService;
    entitySubscriptionsBySubscriber: WeakMap<SessionPort, Set<string>>;
    subscribersByEntityId: Map<string, Set<SessionPort>>;
    subscribersChangeEvent: Event<{
        id: string;
        subscribers: any;
    }>;
    publishingReferenceFrameMap: Map<string, string | ReferenceFrame>;
    private _entityPoseCache;
    constructor(sessionService: SessionService, contextService: ContextService);
    publishEntityState(idOrEntity: string | Entity, time?: JulianDate): void;
    private _publishUpdates();
    private _sessionEntities;
    private _sendUpdateForSession(session);
    private _getSerializedEntityState(entity, time);
}

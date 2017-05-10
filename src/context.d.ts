/// <reference types="cesium" />
import { Entity, EntityCollection, Cartographic, Cartesian3, Quaternion, Transforms, JulianDate, ReferenceFrame } from './cesium/cesium-imports';
import { SerializedEntityState, SerializedEntityStateMap, ContextFrameState, GeolocationOptions } from './common';
import { SessionService, SessionPort } from './session';
import { Event } from './utils';
import { PermissionRequest } from './permissions';
/**
 * Represents the pose of an entity relative to a particular reference frame.
 *
 * The `update` method must be called in order to update the position / orientation / poseStatus.
 */
export declare class EntityPose {
    context: ContextService;
    constructor(context: ContextService, entityOrId: Entity | string, referenceFrameId?: Entity | ReferenceFrame | string);
    private _entity;
    private _referenceFrame;
    readonly entity: Entity;
    readonly referenceFrame: Entity | ReferenceFrame;
    /**
     * The status of this pose, as a bitmask.
     *
     * If the current pose is known, then the KNOWN bit is 1.
     * If the current pose is not known, then the KNOWN bit is 0.
     *
     * If the previous pose was known and the current pose is unknown,
     * then the LOST bit is 1.
     * If the previous pose was unknown and the current pose status is known,
     * then the FOUND bit is 1.
     * In all other cases, both the LOST bit and the FOUND bit are 0.
     */
    status: PoseStatus;
    /**
     * alias for status
     */
    readonly poseStatus: PoseStatus;
    position: Cartesian3;
    orientation: Quaternion;
    time: JulianDate;
    private _previousTime;
    private _previousStatus;
    update(time?: JulianDate): void;
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
    frameStateEvent: Event<ContextFrameState>;
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
    private _localOriginChanged;
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
    * An entity representing the local origin, which is oriented
    * East-North-Up if geolocation is known, otherwise an arbitrary
    * frame with +Z up. The local origin changes infrequently and stays
    * near the user, making it useful as the root of a rendering scenegraph.
    *
    * Any time the local origin changes, the localOriginChange event is raised.
    */
    localOrigin: Entity;
    /**
    * Alias for `localOrigin`. An entity representing the local origin,
    * which is oriented East-North-Up if geolocation is known,
    * otherwise an arbitrary frame with +Z up.
    */
    localOriginEastNorthUp: Entity;
    /**
     * An entity representing the same origin as `localOriginEastNorthUp`, but rotated
     * 90deg around X-axis to create an East-Up-South coordinate system.
     * Useful for maintaining a scene-graph where +Y is up.
     */
    localOriginEastUpSouth: Entity;
    /**
     * The default origin to use when calling `getEntityPose`.
     * By default, this is the `localOriginEastNorthUp` reference frame.
     */
    defaultReferenceFrame: Entity;
    /**
     * An entity representing the physical floor beneath the user,
     * where +X is east, +Y is north, and +Z is up (if geolocation is known).
     */
    stage: Entity;
    /**
     * Alias for `stage`. An entity representing the stage,
     * which is oriented East-North-Up if geolocation is known,
     * otherwise an arbitrary frame with +Z up.
     */
    stageEastNorthUp: Entity;
    /**
     * An entity representing the same origin as `stageEastNorthUp`,
     * but rotated 90deg around X-axis to create an East-Up-South coordinate system,
     * such that +Y is up.
     */
    stageEastUpSouth: Entity;
    /**
     * An entity representing the user,
     * where +X is right, +Y is up, and -Z is the direction the user is facing
     */
    user: Entity;
    /**
     * An entity representing the rendering view,
     * where +X is right, +Y is up, and -z is the direction of the view
     */
    view: Entity;
    readonly geoposeHeadingAccuracy: number | undefined;
    readonly geoposeHorizontalAccuracy: number | undefined;
    readonly geoposeVerticalAccuracy: number | undefined;
    /**
     * An entity representing the floor beneath the user
     */
    floor: Entity;
    /**
     * The serialized frame state for this frame
     */
    readonly serializedFrameState: ContextFrameState;
    private _serializedFrameState;
    private _entityPoseMap;
    private _updatingEntities;
    private _knownEntities;
    private _scratchCartesian;
    private _scratchQuaternion;
    private _scratchFrustum;
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
     * @returns A Promise that resolves to a new or existing entity
     * instance matching the given id, if the subscription is successful
     */
    subscribe(id: string | Entity, session?: SessionPort): Promise<Entity>;
    /**
     * Unsubscribe to pose updates for the given entity id
     */
    unsubscribe(id: string | Entity, session?: SessionPort): void;
    /**
     * Get the cartographic position of an Entity
     */
    getEntityCartographic(entity?: Entity, cartographic?: Cartographic): Cartographic | undefined;
    private _scratchMatrix3;
    private _scratchMatrix4;
    /**
    * Create an entity that is positioned at the given cartographic location,
    * with an orientation computed according to the given local to fixed frame converter.
    *
    * For the localFrameToFixedFrame parameter, Cesium provides the following:
    *
    * Cesium.Transforms.eastNorthUpToFixedFrame
    * Cesium.Transforms.northEastDownToFixedFrame
    * Cesium.Transforms.northUpEastToFixedFrame
    * Cesium.Transforms.northWestUpToFixedFrame
    *
    * Additionally, argon.js provides:
    *
    * Argon.eastUpSouthToFixedFrame
    *
    * Alternative transform functions can be created with:
    *
    * Cesium.Transforms.localFrameToFixedFrameGenerator
    */
    createGeoEntity(cartographic: Cartographic, localFrameToFixedFrame: typeof Transforms.northUpEastToFixedFrame): Entity;
    /**
     * Create a new EntityPose instance to represent the pose of an entity
     * relative to a given reference frame. If no reference frame is specified,
     * then the pose is based on the context's defaultReferenceFrame.
     *
     * @param entity - the entity to track
     * @param referenceFrameOrId - the reference frame to use
     */
    createEntityPose(entityOrId: Entity | string, referenceFrameOrId?: string | ReferenceFrame | Entity): EntityPose;
    /**
     * Gets the current pose of an entity, relative to a given reference frame.
     *
     * @deprecated
     * @param entity - The entity whose state is to be queried.
     * @param referenceFrame - The intended reference frame. Defaults to `this.defaultReferenceFrame`.
     */
    getEntityPose(entityOrId: Entity | string, referenceFrameOrId?: string | ReferenceFrame | Entity): EntityPose;
    private _frameIndex;
    /**
     * Process the next frame state (which should come from the current reality viewer)
     */
    submitFrameState(frameState: ContextFrameState): void;
    private _updateBackwardsCompatability(frameState);
    private _update(frameState);
    private _getReachableAncestorReferenceFrames;
    private _scratchArray;
    private _localOriginPose;
    private _updateLocalOrigin(frameState);
    updateEntityFromSerializedState(id: string, entityState: SerializedEntityState | null): Entity;
    getSubviewEntity(index: number): Entity;
    subscribeGeolocation(options?: GeolocationOptions): Promise<void>;
    unsubscribeGeolocation(): void;
    readonly geoHeadingAccuracy: number | undefined;
    readonly geoHorizontalAccuracy: number | undefined;
    readonly geoVerticalAccuracy: number | undefined;
    private _stringFromReferenceFrame(referenceFrame);
}
export declare class ContextServiceProvider {
    private sessionService;
    private contextService;
    entitySubscriptionsBySubscriber: WeakMap<SessionPort, {
        [subcription: string]: any;
    }>;
    subscribersByEntityId: Map<string, Set<SessionPort>>;
    subscribersChangeEvent: Event<{
        id: string;
        subscribers: any;
    }>;
    publishingReferenceFrameMap: Map<string, string | ReferenceFrame>;
    private _cacheTime;
    private _entityPoseCache;
    private _getSerializedEntityState;
    requestPermission: (request: PermissionRequest) => Promise<boolean>;
    constructor(sessionService: SessionService, contextService: ContextService);
    fillEntityStateMapForSession(session: SessionPort, time: JulianDate, entities: SerializedEntityStateMap): void;
    private _publishUpdates();
    private _sessionEntities;
    private _temp;
    private _sendUpdateForSession(state, session);
    private _getCachedSerializedEntityState(entity, time);
    desiredGeolocationOptions: GeolocationOptions;
    sessionGeolocationOptions: Map<SessionPort, GeolocationOptions | undefined>;
    private _handleSetGeolocationOptions(session, options?);
    private _updateDesiredGeolocationOptions();
    readonly geolocationDesired: boolean;
}

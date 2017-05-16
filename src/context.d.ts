/// <reference types="cesium" />
import { Entity, EntityCollection, Cartographic, Cartesian3, Quaternion, Transforms, JulianDate, ReferenceFrame } from './cesium/cesium-imports';
import { SerializedSubviewList, ContextFrameState, GeolocationOptions, CanvasViewport } from './common';
import { SessionService, SessionPort } from './session';
import { Event } from './utils';
import { EntityService, EntityServiceProvider } from './entity';
import { DeviceService } from './device';
import { ViewService } from './view';
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
 */
export declare class ContextService {
    protected entityService: EntityService;
    protected sessionService: SessionService;
    protected deviceService: DeviceService;
    protected viewService: ViewService;
    constructor(entityService: EntityService, sessionService: SessionService, deviceService: DeviceService, viewService: ViewService);
    readonly entities: EntityCollection;
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
     * An event that fires when the origin changes.
     */
    originChangeEvent: Event<void>;
    private _originChanged;
    /**
     * An event that fires when the local origin changes.
     */
    readonly localOriginChangeEvent: Event<void>;
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
    * An entity representing the local origin, which is oriented
    * with +Y up. The local origin changes infrequently, is platform dependent,
    * and is the suggested origin for a rendering scenegraph.
    *
    * Any time the local origin changes, the localOriginChange event is raised.
    */
    origin: Entity;
    /** alias for origin */
    readonly localOrigin: Entity;
    private _localOrigin;
    readonly localOriginEastNorthUp: Entity;
    readonly localOriginEastUpSouth: Entity;
    private _localOriginEastUpSouth;
    /**
     * A coordinate system representing the physical space in which the user is free to
     * move around, positioned on the surface the user is standing on,
     * where +X is east, +Y is up, and +Z is south (East-Up-South), if geolocation is known.
     * If the stage is not geolocated, then the +X and +Z directions are arbitrary.
     */
    stage: Entity;
    /**
     * An coordinate system representing the floor.
     * While the `stage` always represents a physical surface,
     * the `floor` entity may represent a virtual floor.
     */
    floor: Entity;
    /**
     * An coordinate system representing the user,
     * where +X is right, +Y is up, and -Z is the direction the user is facing
     */
    user: Entity;
    /**
     * An coordinate system representing the rendering view,
     * where +X is right, +Y is up, and -Z is the direction of the view.
     */
    view: Entity;
    /**
     * The default reference frame to use when calling `getEntityPose`.
     * By default, this is the `origin` reference frame.
     */
    defaultReferenceFrame: Entity;
    /**
     * If geopose is available, this is the accuracy of the user's heading
     */
    readonly geoposeHeadingAccuracy: number | undefined;
    /**
     * If geopose is available, this is the accuracy of the user's cartographic location
     */
    readonly geoposeHorizontalAccuracy: number | undefined;
    /**
     * If geopose is available, this is the accuracy of the user's elevation
     */
    readonly geoposeVerticalAccuracy: number | undefined;
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
    subscribe: any;
    /**
     * Unsubscribe to pose updates for the given entity id
     */
    unsubscribe: any;
    /**
     * Get the cartographic position of an Entity for the current context time
     */
    getEntityCartographic(entity: Entity, result?: Cartographic): Cartographic | undefined;
    /**
     * Deprecated. Use `EntityService.createFixed` (`app.entity.createFixed`);
     */
    createGeoEntity(cartographic: Cartographic, localToFixed: typeof Transforms.eastNorthUpToFixedFrame): Entity;
    /**
     * Create a new EntityPose instance to represent the pose of an entity
     * relative to a given reference frame. If no reference frame is specified,
     * then the pose is based on the context's defaultReferenceFrame.
     *
     * @param entity - the entity to track
     * @param referenceFrameOrId - the reference frame to use
     */
    createEntityPose(entityOrId: Entity | string, referenceFrameOrId?: string | ReferenceFrame | Entity): EntityPose;
    private _stringIdentifierFromReferenceFrame;
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
    private _scratchFrameState;
    private _getSerializedEntityState;
    private _getEntityPositionInReferenceFrame;
    private _getEntityOrientationInReferenceFrame;
    /**
     * Create a frame state.
     *
     * @param time
     * @param viewport
     * @param subviewList
     * @param user
     * @param entityOptions
     */
    createFrameState(time: JulianDate, viewport: CanvasViewport, subviewList: SerializedSubviewList, options?: {
        overrideStage?: boolean;
        overrideUser?: boolean;
        overrideView?: boolean;
        floorOffset?: number;
    }): ContextFrameState;
    private _scratchMatrix3;
    private _scratchMatrix4;
    private _updateBackwardsCompatability(frameState);
    private _update(frameState);
    getSubviewEntity(index: number): Entity;
    subscribeGeolocation(options?: GeolocationOptions): Promise<void>;
    unsubscribeGeolocation(): void;
    readonly geoHeadingAccuracy: number | undefined;
    readonly geoHorizontalAccuracy: number | undefined;
    readonly geoVerticalAccuracy: number | undefined;
}
export declare class ContextServiceProvider {
    protected sessionService: SessionService;
    protected contextService: ContextService;
    protected entityServiceProvider: EntityServiceProvider;
    entitySubscriptionsBySubscriber: WeakMap<SessionPort, {
        [subcription: string]: any;
    }>;
    subscribersByEntityId: Map<string, Set<SessionPort>>;
    subscribersChangeEvent: Event<{
        id: string;
        subscribers: any;
    }>;
    private _cacheTime;
    constructor(sessionService: SessionService, contextService: ContextService, entityServiceProvider: EntityServiceProvider);
    private _publishUpdates();
    private _sessionEntities;
    private _temp;
    private _sendUpdateForSession(state, session);
    desiredGeolocationOptions: GeolocationOptions;
    sessionGeolocationOptions: Map<SessionPort, GeolocationOptions | undefined>;
    private _setGeolocationOptions(session, options?);
    private _updateDesiredGeolocationOptions();
}

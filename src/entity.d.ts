/// <reference types="cesium" />
import { SessionService, SessionPort } from './session';
import { Event } from './utils';
import { SerializedEntityState, SerializedEntityStateMap } from './common';
import { Cartographic, Entity, EntityCollection, JulianDate, ReferenceFrame, Transforms } from './cesium/cesium-imports';
/**
 * A service for subscribing/unsubscribing to entities
 */
export declare class EntityService {
    collection: EntityCollection;
    protected sessionService: SessionService;
    constructor(collection: EntityCollection, sessionService: SessionService);
    subscribedEvent: Event<{
        id: string;
        options?: {} | undefined;
    }>;
    unsubscribedEvent: Event<{
        id: string;
    }>;
    subscriptions: Map<string, {}>;
    private _handleSubscribed(evt);
    private _handleUnsubscribed(id);
    private _scratchCartesian;
    private _scratchQuaternion;
    private _scratchMatrix3;
    private _scratchMatrix4;
    private _getEntityPositionInReferenceFrame;
    /**
     * Get the cartographic position of an Entity at the given time
     */
    getCartographic(entity: Entity, time: JulianDate, result?: Cartographic): Cartographic | undefined;
    /**
    * Create an entity that is positioned at the given cartographic location,
    * with an orientation computed according to the provided `localToFixed` transform function.
    *
    * For the `localToFixed` parameter, you can pass any of the following:
    *
    * ```
    * Argon.Cesium.Transforms.eastNorthUpToFixedFrame
    * Argon.Cesium.Transforms.northEastDownToFixedFrame
    * Argon.Cesium.Transforms.northUpEastToFixedFrame
    * Argon.Cesium.Transforms.northWestUpToFixedFrame
    * ```
    *
    * Additionally, argon.js provides:
    *
    * ```
    * Argon.eastUpSouthToFixedFrame
    * ```
    *
    * Alternative transform functions can be created with:
    *
    * ```
    * Argon.Cesium.Transforms.localFrameToFixedFrameGenerator
    * ```
    */
    createFixed(cartographic: Cartographic, localToFixed: typeof Transforms.northUpEastToFixedFrame): Entity;
    /**
     * Subscribe to pose updates for the given entity id
     *
     * @returns A Promise that resolves to a new or existing entity
     * instance matching the given id, if the subscription is successful
     */
    subscribe(idOrEntity: string | Entity): Promise<Entity>;
    subscribe(idOrEntity: string | Entity, options?: {}, session?: SessionPort): Promise<Entity>;
    /**
     * Unsubscribe to pose updates for the given entity id
     */
    unsubscribe(idOrEntity: any): void;
    unsubscribe(idOrEntity: string | Entity, session?: SessionPort): void;
    /**
     *
     * @param id
     * @param entityState
     */
    updateEntityFromSerializedState(id: string, entityState: SerializedEntityState | null): Entity;
}
/**
 * A service for publishing entity states to managed sessions
 */
export declare class EntityServiceProvider {
    private sessionService;
    private entityService;
    subscriptionsBySubscriber: WeakMap<SessionPort, Map<string, {} | undefined>>;
    subscribersByEntity: Map<string, Set<SessionPort>>;
    sessionSubscribedEvent: Event<{
        session: SessionPort;
        id: string;
        options: {};
    }>;
    sessionUnsubscribedEvent: Event<{
        session: SessionPort;
        id: string;
    }>;
    targetReferenceFrameMap: Map<string, string | ReferenceFrame>;
    constructor(sessionService: SessionService, entityService: EntityService);
    /**
     * Should return a resolved promise if subscription is permitted,
     * or a rejected promise if subscription is not permitted.
     */
    onAllowSubscription(session: any, id: any, options: any): Promise<void>;
    fillEntityStateMapForSession(session: SessionPort, time: JulianDate, entities: SerializedEntityStateMap): void;
    private _cacheTime;
    private _entityPoseCache;
    private _getSerializedEntityState;
    getCachedSerializedEntityState(entity: Entity | undefined, time: JulianDate): SerializedEntityState | null;
}

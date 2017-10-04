import { autoinject } from 'aurelia-dependency-injection';
import { SessionService, SessionPort } from './session';
import {
    Event, 
    getEntityPositionInReferenceFrame, 
    getEntityOrientationInReferenceFrame, 
    getSerializedEntityState, 
    jsonEquals, 
    stringIdentifierFromReferenceFrame 
} from './utils';
import { SerializedEntityState, SerializedEntityStateMap } from './common';
import { PermissionServiceProvider } from './permission'
import {
    defined,
    Cartesian3,
    Cartographic,
    Entity,
    EntityCollection,
    ConstantPositionProperty,
    ConstantProperty,
    JulianDate,
    Matrix3,
    Matrix4,
    ReferenceFrame,
    ReferenceEntity,
    Transforms,
    Quaternion
} from './cesium/cesium-imports'



/**
 * Represents the pose of an entity relative to a particular reference frame. 
 * 
 * The `update` method must be called in order to update the position / orientation / poseStatus. 
 */
export class EntityPose {

    constructor(
        private _collection:EntityCollection, 
        entityOrId:Entity|string, 
        referenceFrameId:Entity|ReferenceFrame|string
    ){
        this._collection['_firing'] = true; // hack: disable collectionChanged event

        if (typeof entityOrId === 'string') {
            let entity:Entity|ReferenceEntity|undefined = this._collection.getById(entityOrId);
            if (!entity) entity = <Entity><any> new ReferenceEntity(this._collection, entityOrId);
            this._entity = entity;
        } else {
            this._entity = entityOrId;
        }
        
        if (typeof referenceFrameId === 'string') {
            let referenceFrame:Entity|ReferenceEntity|ReferenceFrame|undefined = this._collection.getById(referenceFrameId);
            if (!defined(referenceFrame)) referenceFrame = <Entity><any> new ReferenceEntity(this._collection, referenceFrameId);
            this._referenceFrame = referenceFrame;
        } else {
            this._referenceFrame = referenceFrameId;
        }
    }

    private _entity:Entity;
    private _referenceFrame:Entity|ReferenceFrame;

    get entity() { return this._entity }

    get referenceFrame() {
        return this._referenceFrame;
    }

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
    status:PoseStatus = 0;

    /**
     * alias for status
     */
    get poseStatus() { return this.status };

    position = new Cartesian3;
    orientation = new Quaternion;
    time = new JulianDate(0,0)

    
    public previousTime:JulianDate;
    public previousPosition:Cartesian3;
    public previousOrientation:Quaternion;
    public previousStatus:PoseStatus = 0;

    private _getEntityPositionInReferenceFrame = getEntityPositionInReferenceFrame;
    private _getEntityOrientationInReferenceFrame = getEntityOrientationInReferenceFrame;

    update(time:JulianDate) {
        const _JulianDate = JulianDate;
        const _PoseStatus = PoseStatus;

        _JulianDate.clone(time, this.time);

        if (!_JulianDate.equals(this.previousTime, time)) {
            this.previousStatus = this.status;
            this.previousTime = _JulianDate.clone(time, this.previousTime);
            this.previousPosition = Cartesian3.clone(this.position, this.previousPosition);
            this.previousOrientation = Quaternion.clone(this.orientation, this.previousOrientation);
        }

        const entity = this.entity;
        const referenceFrame = this.referenceFrame;
        
        let position = this._getEntityPositionInReferenceFrame(
            entity,
            time,
            referenceFrame,
            this.position
        );

        let orientation = this._getEntityOrientationInReferenceFrame(
            entity,
            time,
            referenceFrame,
            this.orientation
        );

        const hasPose = position && orientation;

        let currentStatus: PoseStatus = 0;
        const previousStatus = this.previousStatus;

        if (hasPose) {
            currentStatus |= _PoseStatus.KNOWN;
        }

        if (hasPose && !(previousStatus & _PoseStatus.KNOWN)) {
            currentStatus |= _PoseStatus.FOUND;
        } else if (!hasPose && previousStatus & _PoseStatus.KNOWN) {
            currentStatus |= _PoseStatus.LOST;
        }

        if (!Cartesian3.equals(this.previousPosition, position) || 
            !Quaternion.equals(this.previousOrientation, orientation)) {
            currentStatus |= _PoseStatus.CHANGED;
        }

        this.status = currentStatus;
    }
}

/**
* A bitmask that provides metadata about the pose of an EntityPose.
*   KNOWN - the pose of the entity is defined in relation to the given reference frame
*   FOUND - the pose was undefined at the previous time the entity pose was queried, and is now defined
*   LOST - the pose was defined at the previous time the entity pose was queried, and is now undefined
*   CHANGED - the pose has changed compared to the previous time the entity pose was queried
*/
export enum PoseStatus {
    KNOWN = 1,
    FOUND = 2,
    LOST = 4,
    CHANGED = 8
}

/**
 * A service for subscribing/unsubscribing to entities
 */
@autoinject()
export class EntityService {

    constructor(protected sessionService: SessionService) {}

    public collection = new EntityCollection;

    public subscribedEvent = new Event<{id:string, options?:{}}>();
    public unsubscribedEvent = new Event<{id:string}>();

    public subscriptions = new Map<string, {}>();

    private _handleSubscribed(evt:{id:string, options?:{}}) {
        const s = this.subscriptions.get(evt.id);
        const stringifiedOptions = evt.options && JSON.stringify(evt.options);
        if (!s || JSON.stringify(s) === stringifiedOptions) {
            if (s) this._handleUnsubscribed(evt.id);
            this.subscriptions.set(evt.id, stringifiedOptions && JSON.parse(stringifiedOptions));
            this.subscribedEvent.raiseEvent(evt);
        };
    }

    private _handleUnsubscribed(id:string) {
        if (this.subscriptions.has(id)) {
            this.subscriptions.delete(id);
            this.unsubscribedEvent.raiseEvent({id});
        };
    }

    private _scratchCartesian = new Cartesian3;
    private _scratchQuaternion = new Quaternion;
    private _scratchMatrix3 = new Matrix3;
    private _scratchMatrix4 = new Matrix4;
    private _getEntityPositionInReferenceFrame = getEntityPositionInReferenceFrame;
    
    /**
     * Get the cartographic position of an Entity at the given time
     */
    public getCartographic(entity:Entity, time:JulianDate, result?:Cartographic) : Cartographic|undefined {
        const fixedPosition = 
            this._getEntityPositionInReferenceFrame(entity, time, ReferenceFrame.FIXED, this._scratchCartesian);
        
        if (fixedPosition) {
            result = result || new Cartographic();
            return Cartographic.fromCartesian(fixedPosition, undefined, result);
        }

        return undefined;
    }

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
    public createFixed(cartographic: Cartographic, localToFixed: typeof Transforms.northUpEastToFixedFrame) : Entity {
        // Convert the cartographic location to an ECEF position
        var position = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height, undefined, this._scratchCartesian);

        // compute an appropriate orientation on the surface of the earth
        var transformMatrix = localToFixed(position, undefined, this._scratchMatrix4);
        var rotationMatrix = Matrix4.getRotation(transformMatrix,this._scratchMatrix3)
        var orientation = Quaternion.fromRotationMatrix(rotationMatrix, this._scratchQuaternion);

        // create the entity
        var entity = new Entity({
            position,
            orientation
        });
        return entity;
    }

    /**
     * Subscribe to pose updates for the given entity id
     * @returns A Promise that resolves to a new or existing entity
     */
    public subscribe(idOrEntity: string|Entity) : Promise<Entity>;
    public subscribe(idOrEntity: string|Entity, options?:{}, session?:SessionPort) : Promise<Entity>;
    public subscribe(idOrEntity: string|Entity, options?:{}, session=this.sessionService.manager) : Promise<Entity> {
        const id = (<Entity>idOrEntity).id || <string>idOrEntity;
        const evt = {id, options};
        return session.whenConnected().then(()=>{
            if (session.version[0] === 0 && session.version[1] < 2) return session.request('ar.context.subscribe', evt)
            else return session.request('ar.entity.subscribe', evt)
        }).then(()=>{
            const entity = this.collection.getOrCreateEntity(id);
            this._handleSubscribed(evt);
            return entity;
        });
    }

    /**
     * Unsubscribe from pose updates for the given entity id
     */
    public unsubscribe(idOrEntity) : void;
    public unsubscribe(idOrEntity: string|Entity, session?:SessionPort) : void;
    public unsubscribe(idOrEntity: string|Entity, session=this.sessionService.manager) : void {
        const id = (<Entity>idOrEntity).id || <string>idOrEntity;
        session.whenConnected().then(()=>{
            if (session.version[0] === 0 && session.version[1] < 2) session.send('ar.context.unsubscribe', {id});
            else session.send('ar.entity.unsubscribe', {id});
        }).then(()=>{
            this._handleUnsubscribed(id);
        })
    }

    /**
     * Create a new EntityPose instance to represent the pose of an entity
     * relative to a given reference frame.
     * 
     * @param entity - the entity to track
     * @param referenceFrameOrId - the reference frame to use
     */
    public createEntityPose(entityOrId: Entity|string, referenceFrameOrId: string | ReferenceFrame | Entity) {            
        return new EntityPose(this.collection, entityOrId, referenceFrameOrId);
    }

    private _entityPoseMap = new Map<string, EntityPose | undefined>();
    private _stringIdentifierFromReferenceFrame = stringIdentifierFromReferenceFrame;

    /**
     * Gets the pose of an entity, relative to a given reference frame at a given time.
     *
     * @param entityOrId - The entity whose state is to be queried.
     * @param referenceFrameOrId - The intended reference frame. Defaults to `this.defaultReferenceFrame`.
     */
    public getEntityPose(entityOrId: Entity|string, referenceFrameOrId: string | ReferenceFrame | Entity, time: JulianDate): EntityPose {
        const key = this._stringIdentifierFromReferenceFrame(entityOrId) + '@' + this._stringIdentifierFromReferenceFrame(referenceFrameOrId);
        
        let entityPose = this._entityPoseMap.get(key);
        if (!entityPose) {
            entityPose = this.createEntityPose(entityOrId, referenceFrameOrId);
            this._entityPoseMap.set(key, entityPose);
        }
        entityPose.update(time);

        return entityPose;
    }

    /**
     * 
     * @param id 
     * @param entityState 
     */
    public updateEntityFromSerializedState(id:string, entityState:SerializedEntityState|null) {
        const entity = this.collection.getOrCreateEntity(id);
        
        if (!entityState) {
            if (entity.position) {
                (entity.position as ConstantPositionProperty).setValue(undefined);
            }
            if (entity.orientation) {
                (entity.orientation as ConstantProperty).setValue(undefined);
            }
            entity['meta'] = undefined;
            return entity;
        }
        
        const positionValue = entityState.p;
        const orientationValue = Quaternion.clone(entityState.o, this._scratchQuaternion); // workaround for https://github.com/AnalyticalGraphicsInc/cesium/issues/5031
        const referenceFrame:Entity|ReferenceFrame = 
            typeof entityState.r === 'number' ?
            entityState.r : this.collection.getOrCreateEntity(entityState.r);

        let entityPosition = entity.position;
        let entityOrientation = entity.orientation;

        if (entityPosition instanceof ConstantPositionProperty) {
            entityPosition.setValue(positionValue, referenceFrame);
        } else {
            entity.position = new ConstantPositionProperty(positionValue, referenceFrame);
        }

        if (entityOrientation instanceof ConstantProperty) {
            entityOrientation.setValue(orientationValue);
        } else {
            entity.orientation = new ConstantProperty(orientationValue);
        }

        entity['meta'] = entityState.meta;

        return entity;
    }

}


/**
 * A service for publishing entity states to managed sessions
 */
@autoinject
export class EntityServiceProvider {

    public subscriptionsBySubscriber = new WeakMap<SessionPort, {[entityId:string]:{}|undefined}>();
    public subscribersByEntity = new Map<string, Set<SessionPort>>();
    public sessionSubscribedEvent = new Event<{session:SessionPort, id:string, options:{}}>();
    public sessionUnsubscribedEvent = new Event<{session:SessionPort, id:string}>();

    constructor(
        private sessionService: SessionService,
        private entityService: EntityService,
        private permissionServiceProvider: PermissionServiceProvider
    ) {
        this.sessionService.ensureIsRealityManager();
        
        this.sessionService.connectEvent.addEventListener((session) => {
            const subscriptions = {};
            this.subscriptionsBySubscriber.set(session, subscriptions);

            session.on['ar.entity.subscribe'] = session.on['ar.context.subscribe'] = ({id, options}:{id:string, options:{}|undefined}) => {
                const currentOptions = subscriptions[id];
                if (currentOptions && jsonEquals(currentOptions,options)) return;
                
                options = options || {};
                const subscribers = this.subscribersByEntity.get(id) || new Set<SessionPort>();
                this.subscribersByEntity.set(id, subscribers);
                subscribers.add(session);
                subscriptions[id] = options;
                this.sessionSubscribedEvent.raiseEvent({session, id, options});
                
                return this.permissionServiceProvider.handlePermissionRequest(session, id, options).then(()=>{});
            }

            session.on['ar.entity.unsubscribe'] = session.on['ar.context.unsubscribe'] = ({id}:{id:string}) => {
                if (!subscriptions[id]) return;
                const subscribers = this.subscribersByEntity.get(id);
                subscribers && subscribers.delete(session);
                delete subscriptions[id];
                this.sessionUnsubscribedEvent.raiseEvent({id, session});
            }

            session.closeEvent.addEventListener(()=>{
                this.subscriptionsBySubscriber.delete(session);
                for (const id in subscriptions) {
                    const subscribers = this.subscribersByEntity.get(id);
                    subscribers && subscribers.delete(session);
                    this.sessionUnsubscribedEvent.raiseEvent({id, session});
                }
            })
        });
    }

    /**
     * Serialize into a serialization state mpat, the given entities using the given time.
     * Serialization includes the ancestor reference frames of included, excluding any entities in the excludedFrames list. 
     */
    public fillEntityStateMap(entities:SerializedEntityStateMap, time:JulianDate, includedMap:{}, excludedMap:{}) {
        for (let id in includedMap) {
            let entity = this.entityService.collection.getById(id);
            while (
                defined(entity) && 
                entities[id = entity.id] === undefined &&
                !excludedMap[id]
            ) {
                const referenceFrame = entity && entity.position && entity.position.referenceFrame;
                const pose = entities[id] = this._getCachedSerializedEntityState(entity, time, referenceFrame);
                if (pose === null || typeof referenceFrame === 'number') break;
                entity = referenceFrame;
            }
        }
    }

    private _cacheTime = new JulianDate(0,0)
    private _entityStateCache: SerializedEntityStateMap = {};
    private _getSerializedEntityState = getSerializedEntityState;

    private _getCachedSerializedEntityState(entity: Entity|undefined, time:JulianDate, referenceFrame:Entity|ReferenceFrame|undefined) {
        if (!entity || !defined(referenceFrame)) return null;

        const id = entity.id;
        if (!defined(this._entityStateCache[id]) || !this._cacheTime.equalsEpsilon(time, 0.000001)) {
            this._entityStateCache[id] = this._getSerializedEntityState(entity, time, referenceFrame);
        }

        return this._entityStateCache[id];
    }
}
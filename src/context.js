var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { Entity, EntityCollection, ConstantPositionProperty, ConstantProperty, Transforms, Cartesian3, Quaternion, JulianDate, ReferenceFrame, defined } from './cesium/cesium-imports';
import { Role } from './common';
import { SessionService } from './session';
import { Event, getSerializedEntityPose, getEntityPositionInReferenceFrame, getEntityOrientationInReferenceFrame } from './utils';
/**
* A bitmask that provides metadata about the pose of an EntityPose.
*   KNOWN - the pose of the entity state is defined.
*   KNOWN & FOUND - the pose was undefined when the entity state was last queried, and is now defined.
*   LOST - the pose was defined when the entity state was last queried, and is now undefined
*/
export var PoseStatus;
(function (PoseStatus) {
    PoseStatus[PoseStatus["KNOWN"] = 1] = "KNOWN";
    PoseStatus[PoseStatus["FOUND"] = 2] = "FOUND";
    PoseStatus[PoseStatus["LOST"] = 4] = "LOST";
})(PoseStatus || (PoseStatus = {}));
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
export let ContextService = class ContextService {
    constructor(sessionService) {
        this.sessionService = sessionService;
        /**
         * An event that is raised when all remotely managed entities are are up-to-date for
         * the current frame. It is suggested that all modifications to locally managed entities
         * should occur within this event.
         */
        this.frameStateEvent = new Event();
        /**
         * An event that is raised when all remotely managed entities are are up-to-date for
         * the current frame. It is suggested that all modifications to locally managed entities
         * should occur within this event.
         */
        this.updateEvent = new Event();
        /**
         * An event that is raised when it is an approriate time to render graphics.
         * This event fires after the update event.
         */
        this.renderEvent = new Event();
        /**
         * An event that is raised after the render event
         */
        this.postRenderEvent = new Event();
        /**
         * An event that fires when the local origin changes.
         */
        this.localOriginChangeEvent = new Event();
        /**
         * A monotonically increasing value (in milliseconds) for the current frame state.
         * This value is useful only for doing accurate *timing*, not for determining
         * the absolute time. Use [[ContextService.time]] for absolute time.
         * This value is -1 until the first [[ContextService.updateEvent]].
         */
        this.timestamp = -1;
        /**
         * The time in milliseconds since the previous timestamp,
         * capped to [[ContextService.maxDeltaTime]]
         */
        this.deltaTime = 0;
        /**
         * This value caps the deltaTime for each frame. By default,
         * the value is 1/3s (333.3ms)
         */
        this.maxDeltaTime = 1 / 3 * 1000;
        /**
         * The current (absolute) time according to the current reality.
         * This value is arbitrary until the first [[ContextService.updateEvent]].
         */
        this.time = new JulianDate(0, 0);
        /**
         * The collection of all entities this application is aware of.
         */
        this.entities = new EntityCollection();
        /**
         * An entity representing the location and orientation of the user.
         */
        this.user = this.entities.add(new Entity({
            id: 'ar.user',
            name: 'user',
            position: new ConstantPositionProperty(undefined, ReferenceFrame.FIXED),
            orientation: new ConstantProperty(Quaternion.IDENTITY)
        }));
        /**
         * An entity positioned near the user, aligned with the local East-North-Up
         * coordinate system.
         */
        this.localOriginEastNorthUp = this.entities.add(new Entity({
            id: 'ar.localENU',
            name: 'localOriginENU',
            position: new ConstantPositionProperty(undefined, ReferenceFrame.FIXED),
            orientation: new ConstantProperty(Quaternion.IDENTITY)
        }));
        /**
         * An entity positioned near the user, aligned with the East-Up-South
         * coordinate system. This useful for converting to the Y-Up convention
         * used in some libraries, such as three.js.
         */
        this.localOriginEastUpSouth = this.entities.add(new Entity({
            id: 'ar.localEUS',
            name: 'localOriginEUS',
            position: new ConstantPositionProperty(Cartesian3.ZERO, this.localOriginEastNorthUp),
            orientation: new ConstantProperty(Quaternion.fromAxisAngle(Cartesian3.UNIT_X, Math.PI / 2))
        }));
        /**
         * The default origin to use when calling `getEntityPose`.
         * By default, this is the `localOriginEastNorthUp` reference frame.
         */
        this.defaultReferenceFrame = this.localOriginEastNorthUp;
        // the current serialized frame state
        this._serializedFrameState = {
            index: -1,
            view: undefined
        };
        this._entityPoseCache = {};
        this._entityPoseMap = new Map();
        this._subscribedEntities = new WeakMap();
        this._updatingEntities = new Set();
        this._knownEntities = new Set();
        this._sessionEntities = {};
        if (this.sessionService.isRealityManager || this.sessionService.isRealityViewer) {
            this.sessionService.connectEvent.addEventListener((session) => {
                this._subscribedEntities.set(session, new Set());
                session.on['ar.context.subscribe'] = ({ id }) => {
                    const subscriptions = this._subscribedEntities.get(session);
                    if (subscriptions)
                        subscriptions.add(id);
                };
            });
        }
        else {
            this.sessionService.manager.on['ar.context.update'] = (state) => {
                this._update(state);
            };
        }
    }
    /**
     * The serialized frame state for this frame
     */
    get serializedFrameState() {
        return this._serializedFrameState;
    }
    /**
     * Deprecated. Use timestamp property.
     * @private
     */
    get systemTime() {
        console.warn('systemTime property is deprecated. Use timestamp property');
        Object.defineProperty(this, 'systemTime', {
            get: () => this.timestamp
        });
        return this.systemTime;
    }
    /**
     * Deprecated. To be removed.
     * @private
     */
    getTime() {
        console.warn('getTime function is deprecated. Use the ContextService.time property instead.');
        this.getTime = () => this.time;
        return this.getTime();
    }
    /**
     * Deprecated. To be removed.
     * @private
     */
    setDefaultReferenceFrame(origin) {
        console.warn('setDefaultReferenceFrame is deprecated. Use the ContextService.defaultReferenceFrame property directly.');
        this.setDefaultReferenceFrame = (origin) => this.defaultReferenceFrame = origin;
        this.setDefaultReferenceFrame(origin);
    }
    /**
     * Deprecated. To be removed.
     * @private
     */
    getDefaultReferenceFrame() {
        console.warn('getDefaultReferenceFrame is deprecated. Use the ContextService.defaultReferenceFrame property directly.');
        this.getDefaultReferenceFrame = () => this.defaultReferenceFrame;
        return this.getDefaultReferenceFrame();
    }
    /**
     * Adds an entity to this session's set of tracked entities.
     *
     * @param id - The unique identifier of an entity.
     * @returns The entity that was subscribed to.
     */
    subscribeToEntityById(id) {
        this.sessionService.manager.send('ar.context.subscribe', { id });
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
    getEntityPose(entity, referenceFrame = this.defaultReferenceFrame) {
        const time = this.time;
        const key = entity.id + '@' + _stringFromReferenceFrame(referenceFrame);
        let entityPose = this._entityPoseMap.get(key);
        if (!defined(entityPose)) {
            entityPose = {
                position: new Cartesian3,
                orientation: new Quaternion,
                referenceFrame: referenceFrame,
                poseStatus: 0
            };
            this._entityPoseMap.set(key, entityPose);
        }
        const position = getEntityPositionInReferenceFrame(entity, time, referenceFrame, entityPose.position);
        const orientation = getEntityOrientationInReferenceFrame(entity, time, referenceFrame, entityPose.orientation);
        const hasPose = position && orientation;
        let poseStatus = 0;
        const previousStatus = entityPose.poseStatus;
        if (hasPose) {
            poseStatus |= PoseStatus.KNOWN;
        }
        if (hasPose && !(previousStatus & PoseStatus.KNOWN)) {
            poseStatus |= PoseStatus.FOUND;
        }
        else if (!hasPose && previousStatus & PoseStatus.KNOWN) {
            poseStatus |= PoseStatus.LOST;
        }
        entityPose.poseStatus = poseStatus;
        return entityPose;
    }
    /**
     * Process the next view state (which should come from the current reality viewer)
     */
    processViewState(view) {
        const frameState = this._serializedFrameState;
        frameState.index++;
        frameState.view = view;
        this._entityPoseCache = {};
        for (const session of this.sessionService.managedSessions) {
            if (Role.isRealityAugmenter(session.info.role))
                this._sendUpdateForSession(frameState, session);
        }
        this._update(frameState);
    }
    // TODO: This function is called a lot. Potential for optimization. 
    _update(serializedState) {
        // our user entity is defined by the current view pose (the current reality must provide this)
        this.updateEntityFromSerializedPose(this.user.id, serializedState.view.pose);
        // update the entities the manager knows about
        this._knownEntities.clear();
        if (serializedState.entities) {
            for (const id in serializedState.entities) {
                this.updateEntityFromSerializedPose(id, serializedState.entities[id]);
                this._updatingEntities.add(id);
                this._knownEntities.add(id);
            }
        }
        // if the mangager didn't send us an update for a particular entity,
        // assume the manager no longer knows about it
        for (const id of this._updatingEntities) {
            if (!this._knownEntities.has(id)) {
                let entity = this.entities.getById(id);
                if (entity) {
                    entity.position = undefined;
                    entity.orientation = undefined;
                }
                this._updatingEntities.delete(id);
            }
        }
        // update our local origin
        this._updateLocalOrigin(serializedState);
        // update our time values
        const timestamp = performance.now();
        this.deltaTime = Math.min(timestamp - this.timestamp, this.maxDeltaTime);
        this.timestamp = timestamp;
        JulianDate.clone(serializedState.view.time, this.time);
        this._serializedFrameState = serializedState;
        // raise a frame state event (primarily for other services to hook into)
        this.frameStateEvent.raiseEvent(this._serializedFrameState);
        // raise eventß for the user to update and render the scene
        this.updateEvent.raiseEvent(this);
        this.renderEvent.raiseEvent(this);
        this.postRenderEvent.raiseEvent(this);
    }
    updateEntityFromSerializedPose(id, entityPose) {
        const entity = this.entities.getOrCreateEntity(id);
        if (!entityPose) {
            entity.position = undefined;
            entity.orientation = undefined;
            return entity;
        }
        const positionValue = entityPose.p;
        const orientationValue = entityPose.o;
        const referenceFrame = typeof entityPose.r === 'number' ?
            entityPose.r : this.entities.getOrCreateEntity(entityPose.r);
        let entityPosition = entity.position;
        let entityOrientation = entity.orientation;
        if (entityPosition instanceof ConstantPositionProperty &&
            entityPosition.referenceFrame === referenceFrame) {
            entityPosition.setValue(positionValue, referenceFrame);
        }
        else {
            entity.position = new ConstantPositionProperty(positionValue, referenceFrame);
        }
        if (entityOrientation instanceof ConstantProperty) {
            entityOrientation.setValue(orientationValue);
        }
        else {
            entity.orientation = new ConstantProperty(orientationValue);
        }
        return entity;
    }
    publishEntityState(entity, referenceFrame) {
    }
    _updateLocalOrigin(state) {
        const pose = state.view.pose;
        const rootFrame = pose ?
            typeof pose.r === 'number' ?
                pose.r :
                this.entities.getOrCreateEntity(pose.r) :
            this.user;
        const userPosition = this.user.position &&
            this.user.position.getValueInReferenceFrame(state.view.time, rootFrame, scratchCartesian3);
        const localENUFrame = this.localOriginEastNorthUp.position &&
            this.localOriginEastNorthUp.position.referenceFrame;
        const localENUPosition = this.localOriginEastNorthUp.position && defined(localENUFrame) &&
            this.localOriginEastNorthUp.position.getValueInReferenceFrame(state.view.time, localENUFrame, scratchOriginCartesian3);
        if (!userPosition || !localENUPosition ||
            localENUFrame !== rootFrame ||
            Cartesian3.magnitudeSquared(Cartesian3.subtract(userPosition, localENUPosition, scratchOriginCartesian3)) > 25000000) {
            const localENUPositionProperty = this.localOriginEastNorthUp.position;
            const localENUOrientationProperty = this.localOriginEastNorthUp.orientation;
            if (userPosition) {
                localENUPositionProperty.setValue(userPosition, rootFrame);
                if (rootFrame === ReferenceFrame.FIXED) {
                    const enuOrientation = Transforms.headingPitchRollQuaternion(userPosition, 0, 0, 0, undefined, scratchQuaternion);
                    localENUOrientationProperty.setValue(enuOrientation);
                }
                else {
                    localENUOrientationProperty.setValue(Quaternion.IDENTITY);
                }
            }
            else {
                localENUPositionProperty.setValue(Cartesian3.ZERO, this.user);
                localENUOrientationProperty.setValue(Quaternion.IDENTITY);
            }
            this.localOriginChangeEvent.raiseEvent(undefined);
        }
    }
    _sendUpdateForSession(state, session) {
        const sessionEntities = this._sessionEntities;
        // clear session entities
        for (var id in sessionEntities) {
            delete sessionEntities[id];
        }
        // reference all entities from the primary frame state (if any)
        if (state.entities) {
            for (var id in state.entities) {
                sessionEntities[id] = state.entities[id];
            }
        }
        // get subscrbied entities for the session
        for (const id of this._subscribedEntities.get(session)) {
            sessionEntities[id] = this._getSerializedEntityPose(id, state.view.time);
        }
        // recycle the parent frame state object, but with the session entities
        const parentEntities = state.entities;
        state.entities = sessionEntities;
        state['time'] = state.view.time; // deprecated
        state.sendTime = JulianDate.now(state.sendTime);
        if (session.info.version)
            session.send('ar.context.update', state);
        state.entities = parentEntities;
    }
    _getSerializedEntityPose(id, time) {
        if (!defined(this._entityPoseCache[id])) {
            const entity = this.entities.getById(id);
            if (!entity)
                return undefined;
            this._entityPoseCache[id] = getSerializedEntityPose(entity, time);
        }
        return this._entityPoseCache[id];
    }
};
ContextService = __decorate([
    inject(SessionService)
], ContextService);
function _stringFromReferenceFrame(referenceFrame) {
    const rf = referenceFrame;
    return defined(rf.id) ? rf.id : '' + rf;
}

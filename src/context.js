var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject } from 'aurelia-dependency-injection';
import { Entity, EntityCollection, ConstantPositionProperty, ConstantProperty, Transforms, Cartesian3, Quaternion, Matrix3, Matrix4, JulianDate, ReferenceFrame, PerspectiveFrustum, defined } from './cesium/cesium-imports';
import { AVERAGE_HUMAN_HEIGHT, SerializedSubviewList, SubviewType, Viewport, Role, EYE_ENTITY_ID, PHYSICAL_EYE_ENTITY_ID, STAGE_ENTITY_ID, PHYSICAL_STAGE_ENTITY_ID } from './common';
import { SessionService } from './session';
import { Event, getSerializedEntityState, getEntityPositionInReferenceFrame, getEntityOrientationInReferenceFrame, deprecated } from './utils';
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
const scratchCartesian = new Cartesian3(0, 0);
const scratchCartesian2 = new Cartesian3(0, 0);
const scratchQuaternion = new Quaternion(0, 0);
const scratchOriginCartesian = new Cartesian3(0, 0);
const scratchFrustum = new PerspectiveFrustum();
const scratchMatrix3 = new Matrix3;
const scratchMatrix4 = new Matrix4;
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
let ContextService = class ContextService {
    constructor(sessionService) {
        this.sessionService = sessionService;
        /**
         * An event that is raised when the next frame state is available.
         */
        this.frameStateEvent = new Event();
        /**
         * An event that is raised after managed entities have been updated for
         * the current frame.
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
        this._entityPoseMap = new Map();
        this._updatingEntities = new Set();
        this._knownEntities = new Set();
        this._scratchFrameState = {
            time: {},
            entities: {},
            viewport: {},
            subviews: []
        };
        this._frameIndex = -1;
        this.sessionService.manager.on['ar.context.update'] = (state) => {
            // backwards-compat
            if (typeof state.reality !== 'string') {
                state.reality = state.reality && state.reality['uri'];
            }
            if (!state.viewport && state['view'] && state['view'].viewport) {
                state.viewport = state['view'].viewport;
            }
            if (!state.subviews && state['view'] && state['view'].subviews) {
                state.subviews = state['view'].subviews;
                scratchFrustum.near = 0.01;
                scratchFrustum.far = 10000000;
                for (const s of state.subviews) {
                    const frustum = s['frustum'];
                    scratchFrustum.xOffset = frustum.xOffset;
                    scratchFrustum.yOffset = frustum.yOffset;
                    scratchFrustum.fov = frustum.fov;
                    scratchFrustum.aspectRatio = frustum.aspectRatio;
                    s.projectionMatrix = Matrix4.clone(scratchFrustum.projectionMatrix, s.projectionMatrix);
                }
            }
            if (!state.entities[EYE_ENTITY_ID] && state['view'] && state['view'].pose) {
                state.entities[EYE_ENTITY_ID] = state['view'].pose;
            }
            // end backwards-compat
            this._update(state);
        };
        this.sessionService.manager.on['ar.context.entityStateMap'] = (entityStateMap) => {
            for (const id in entityStateMap) {
                this.updateEntityFromSerializedPose(id, entityStateMap[id]);
            }
        };
        scratchFrustum.fov = Math.PI / 3;
        scratchFrustum.aspectRatio = 1;
        this._serializedFrameState = {
            reality: undefined,
            time: JulianDate.now(),
            entities: {},
            viewport: { x: 0, y: 0, width: 0, height: 0 },
            subviews: [{
                    type: SubviewType.SINGULAR,
                    viewport: { x: 0, y: 0, width: 1, height: 1 },
                    projectionMatrix: scratchFrustum.projectionMatrix
                }],
        };
        this._update(this._serializedFrameState);
    }
    /**
     * An alias for the 'eye' entity. To be deprecated in favor of `ViewService.eye`.
     */
    get user() { return this.entities.getById(EYE_ENTITY_ID); }
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
        return this.timestamp;
    }
    /**
     * Deprecated. To be removed.
     * @private
     */
    getTime() {
        return this.time;
    }
    /**
     * Deprecated. To be removed. Use the defaultReferenceFrame property.
     * @private
     */
    setDefaultReferenceFrame(origin) {
        this.defaultReferenceFrame = origin;
    }
    /**
     * Deprecated. To be removed.  Use the defaultReferenceFrame property.
     * @private
     */
    getDefaultReferenceFrame() {
        return this.defaultReferenceFrame;
    }
    /**
     * Subscribe to pose updates for an entity specified by the given id
     *
     * @deprecated Use [[ContextService#subscribe]]
     * @param id - the id of the desired entity
     * @returns A new or existing entity instance matching the given id
     */
    subscribeToEntityById(id) {
        this.sessionService.manager.send('ar.context.subscribe', { id });
        return this.entities.getOrCreateEntity(id);
    }
    /**
     * Subscribe to pose updates for the given entity id
     *
     * @param id - the id of the desired entity
     * @returns A Promise that resolves to a new or existing entity
     * instance matching the given id, if the subscription is successful
     */
    subscribe(id) {
        id = id.id || id;
        return this.sessionService.manager.request('ar.context.subscribe', { id }).then(() => {
            return this.entities.getOrCreateEntity(id);
        });
    }
    /**
     * Unsubscribe to pose updates for the given entity id
     */
    unsubscribe(id) {
        id = id.id || id;
        this.sessionService.manager.send('ar.context.unsubscribe', { id });
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
    getEntityPose(entityOrId, referenceFrameOrId = this.defaultReferenceFrame) {
        const time = this.time;
        let entity = entityOrId;
        if (typeof entity === 'string')
            entity = this.entities.getById(entityOrId);
        if (!entity)
            throw new Error('Unknown entity ' + entityOrId);
        let referenceFrame = referenceFrameOrId;
        if (typeof referenceFrame === 'string')
            referenceFrame = this.entities.getById(referenceFrameOrId);
        if (!defined(referenceFrame))
            throw new Error('Unknown entity ' + referenceFrameOrId);
        const key = entity.id + '@' + _stringFromReferenceFrame(referenceFrame);
        let entityPose = this._entityPoseMap.get(key);
        if (!entityPose) {
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
    createFrameState(time, viewport, subviewList, eye, horizontalAccuracy, verticalAccuracy, headingAccuracy) {
        const eyeMeta = eye['meta'] = eye['meta'] || {};
        eyeMeta.horizontalAccuracy = horizontalAccuracy || eyeMeta.horizontalAccuracy;
        eyeMeta.verticalAccuracy = verticalAccuracy || eyeMeta.verticalAccuracy;
        eyeMeta.headingAccuracy = headingAccuracy || eyeMeta.headingAccuracy;
        for (const s of subviewList) {
            if (!isFinite(s.projectionMatrix[0]))
                throw new Error('Invalid projection matrix (contains non-finite values)');
        }
        const frameState = this._scratchFrameState;
        frameState.time = JulianDate.clone(time, frameState.time);
        frameState.viewport = Viewport.clone(viewport, frameState.viewport);
        frameState.subviews = SerializedSubviewList.clone(subviewList, frameState.subviews);
        frameState.entities[EYE_ENTITY_ID] = getSerializedEntityState(eye, time);
        return frameState;
    }
    /**
     * Process the next frame state (which should come from the current reality viewer)
     */
    submitFrameState(frameState) {
        frameState.index = ++this._frameIndex;
        this._update(frameState);
    }
    // TODO: This function is called a lot. Potential for optimization. 
    _update(frameState) {
        // update the entities the manager knows about
        this._knownEntities.clear();
        if (frameState.entities) {
            for (const id in frameState.entities) {
                this.updateEntityFromSerializedPose(id, frameState.entities[id]);
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
        // update our time values
        const timestamp = performance.now();
        this.deltaTime = Math.min(timestamp - this.timestamp, this.maxDeltaTime);
        this.timestamp = timestamp;
        JulianDate.clone(frameState.time, this.time);
        // update our stage & local origin. 
        // TODO: move both of these into the location service, handle in frameStateEvent?
        this._updateStage(frameState);
        this._updateLocalOrigin(frameState);
        // raise a frame state event (primarily for other services to hook into)
        this._serializedFrameState = frameState;
        this.frameStateEvent.raiseEvent(frameState);
        // raise events for the user to update and render the scene
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
    _updateStage(state) {
        // update the stage entity based on the eye entity (provided by the current reality viewer)
        // and the relative position between the physical eye and the physical stage.
        const eye = this.entities.getById(EYE_ENTITY_ID);
        const stage = this.entities.getById(STAGE_ENTITY_ID);
        const physicalEye = this.entities.getById(PHYSICAL_EYE_ENTITY_ID);
        const physicalStage = this.entities.getById(PHYSICAL_STAGE_ENTITY_ID);
        if (!eye || !stage)
            return;
        stage.position && stage.position.setValue(undefined, undefined);
        stage.orientation && stage.orientation.setValue(undefined);
        const time = state.time;
        if (physicalEye && physicalStage) {
            var physicalEyeStageOffset = getEntityPositionInReferenceFrame(physicalEye, time, physicalStage, scratchCartesian);
        }
        if (!physicalEyeStageOffset) {
            physicalEyeStageOffset = Cartesian3.fromElements(0, 0, AVERAGE_HUMAN_HEIGHT, scratchCartesian);
        }
        const eyePositionFixed = getEntityPositionInReferenceFrame(eye, time, ReferenceFrame.FIXED, scratchCartesian2);
        if (eyePositionFixed) {
            const enuToFixedFrameTransform = Transforms.eastNorthUpToFixedFrame(eyePositionFixed, undefined, scratchMatrix4);
            const enuRotationMatrix = Matrix4.getRotation(enuToFixedFrameTransform, scratchMatrix3);
            const enuOrientation = Quaternion.fromRotationMatrix(enuRotationMatrix);
            const physicalEyeStageOffsetFixed = Matrix3.multiplyByVector(enuRotationMatrix, physicalEyeStageOffset, physicalEyeStageOffset);
            const stagePositionFixed = Cartesian3.subtract(eyePositionFixed, physicalEyeStageOffsetFixed, physicalEyeStageOffsetFixed);
            stage.position = stage.position || new ConstantPositionProperty();
            stage.orientation = stage.orientation || new ConstantProperty();
            stage.position.setValue(stagePositionFixed, ReferenceFrame.FIXED);
            stage.orientation.setValue(enuOrientation);
        }
        else {
            const eyeFrame = eye && eye.position ? eye.position.referenceFrame : undefined;
            if (eyeFrame) {
                const eyePositionRelativeToEyeFrame = getEntityPositionInReferenceFrame(eye, time, eyeFrame, scratchCartesian2);
                if (eyePositionRelativeToEyeFrame) {
                    const stagePositionRelativeToEye = Cartesian3.subtract(eyePositionRelativeToEyeFrame, physicalEyeStageOffset, physicalEyeStageOffset);
                    stage.position.setValue(stagePositionRelativeToEye, eyeFrame);
                    stage.orientation.setValue(Quaternion.IDENTITY);
                }
            }
        }
    }
    _updateLocalOrigin(state) {
        const eye = this.entities.getById(EYE_ENTITY_ID);
        const stage = this.entities.getById(STAGE_ENTITY_ID);
        const stageFrame = stage && stage.position ? stage.position.referenceFrame : undefined;
        if (!eye || !stage)
            return;
        if (!defined(stageFrame)) {
            if (this.localOriginEastNorthUp.position.referenceFrame !== stage) {
                this.localOriginEastNorthUp.position.setValue(Cartesian3.ZERO, stage);
                this.localOriginEastNorthUp.orientation.setValue(Quaternion.IDENTITY);
                this.localOriginChangeEvent.raiseEvent(undefined);
            }
            return;
        }
        const eyePosition = eye.position && eye.position.getValueInReferenceFrame(state.time, stageFrame, scratchCartesian);
        if (!eyePosition)
            return;
        const localOriginPosition = this.localOriginEastNorthUp
            .position.getValueInReferenceFrame(state.time, stageFrame, scratchOriginCartesian);
        if (!localOriginPosition ||
            Cartesian3.magnitude(Cartesian3.subtract(eyePosition, localOriginPosition, scratchOriginCartesian)) > 5000) {
            const localOriginPositionProperty = this.localOriginEastNorthUp.position;
            const localOriginOrientationProperty = this.localOriginEastNorthUp.orientation;
            const stagePosition = stage.position && stage.position.getValueInReferenceFrame(state.time, stageFrame, scratchCartesian);
            const stageOrientation = stage.orientation && stage.orientation.getValue(state.time, scratchQuaternion);
            localOriginPositionProperty.setValue(stagePosition, stageFrame);
            localOriginOrientationProperty.setValue(stageOrientation);
            this.localOriginChangeEvent.raiseEvent(undefined);
        }
    }
};
__decorate([
    deprecated('timestamp'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ContextService.prototype, "systemTime", null);
__decorate([
    deprecated('time'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", JulianDate)
], ContextService.prototype, "getTime", null);
__decorate([
    deprecated('defaultReferenceFrame'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Entity]),
    __metadata("design:returntype", void 0)
], ContextService.prototype, "setDefaultReferenceFrame", null);
__decorate([
    deprecated('defaultReferenceFrame'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Entity)
], ContextService.prototype, "getDefaultReferenceFrame", null);
__decorate([
    deprecated('subscribe'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Entity)
], ContextService.prototype, "subscribeToEntityById", null);
ContextService = __decorate([
    autoinject(),
    __metadata("design:paramtypes", [SessionService])
], ContextService);
export { ContextService };
function _stringFromReferenceFrame(referenceFrame) {
    const rf = referenceFrame;
    return defined(rf.id) ? rf.id : '' + rf;
}
let ContextServiceProvider = class ContextServiceProvider {
    constructor(sessionService, contextService) {
        this.sessionService = sessionService;
        this.contextService = contextService;
        this.entitySubscriptionsBySubscriber = new WeakMap();
        this.subscribersByEntityId = new Map();
        this.subscribersChangeEvent = new Event();
        this.publishingReferenceFrameMap = new Map();
        this._entityPoseCache = {};
        this._sessionEntities = {};
        sessionService.connectEvent.addEventListener((session) => {
            const subscriptions = new Set();
            this.entitySubscriptionsBySubscriber.set(session, subscriptions);
            session.on['ar.context.subscribe'] = ({ id }) => {
                const subscribers = this.subscribersByEntityId.get(id) || new Set();
                this.subscribersByEntityId.set(id, subscribers);
                subscribers.add(session);
                subscriptions.add(id);
                this.subscribersChangeEvent.raiseEvent({ id, subscribers });
                session.closeEvent.addEventListener(() => {
                    subscribers.delete(session);
                    this.subscribersChangeEvent.raiseEvent({ id, subscribers });
                });
            };
            session.on['ar.context.unsubscribe'] = ({ id }) => {
                const subscribers = this.subscribersByEntityId.get(id);
                subscribers && subscribers.delete(session);
                subscriptions.delete(id);
                this.subscribersChangeEvent.raiseEvent({ id, subscribers });
            };
            session.closeEvent.addEventListener(() => {
                subscriptions.forEach((id) => {
                    const subscribers = this.subscribersByEntityId.get(id);
                    subscribers && subscribers.delete(session);
                    this.subscribersChangeEvent.raiseEvent({ id, subscribers });
                });
                this.entitySubscriptionsBySubscriber.delete(session);
            });
        });
        this.contextService.updateEvent.addEventListener(() => {
            this._publishUpdates();
        });
    }
    publishEntityState(idOrEntity, time = this.contextService.time) {
        let id;
        let entity;
        if (idOrEntity.id) {
            entity = idOrEntity;
            id = entity.id;
        }
        else {
            id = idOrEntity;
            entity = this.contextService.entities.getById(id);
        }
        const subscribers = this.subscribersByEntityId.get(id);
        if (entity && subscribers) {
            const referenceFrameId = this.publishingReferenceFrameMap.get(id);
            const referenceFrame = defined(referenceFrameId) && typeof referenceFrameId === 'string' ?
                this.contextService.entities.getById(referenceFrameId) :
                referenceFrameId;
            const entityStateMap = { [id]: getSerializedEntityState(entity, time, referenceFrame) };
            for (const s of subscribers) {
                s.send('ar.context.entityStateMap', entityStateMap);
            }
        }
    }
    _publishUpdates() {
        this._entityPoseCache = {};
        for (const session of this.sessionService.managedSessions) {
            if (Role.isRealityAugmenter(session.info.role))
                this._sendUpdateForSession(session);
        }
    }
    _sendUpdateForSession(session) {
        const state = this.contextService.serializedFrameState;
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
        for (const id of this.entitySubscriptionsBySubscriber.get(session)) {
            const entity = this.contextService.entities.getById(id);
            sessionEntities[id] = this._getSerializedEntityState(entity, state.time);
        }
        // recycle the parent frame state object, but with the session entities
        const parentEntities = state.entities;
        state.entities = sessionEntities;
        state.time = state.time;
        state.sendTime = JulianDate.now(state.sendTime);
        if (session.info.version)
            session.send('ar.context.update', state);
        state.entities = parentEntities;
    }
    _getSerializedEntityState(entity, time) {
        if (!entity)
            return undefined;
        const id = entity.id;
        if (!defined(this._entityPoseCache[id])) {
            const referenceFrameId = this.publishingReferenceFrameMap.get(id);
            const referenceFrame = defined(referenceFrameId) && typeof referenceFrameId === 'string' ?
                this.contextService.entities.getById(referenceFrameId) :
                referenceFrameId;
            this._entityPoseCache[id] = getSerializedEntityState(entity, time, referenceFrame);
        }
        return this._entityPoseCache[id];
    }
};
ContextServiceProvider = __decorate([
    autoinject(),
    __metadata("design:paramtypes", [SessionService,
        ContextService])
], ContextServiceProvider);
export { ContextServiceProvider };

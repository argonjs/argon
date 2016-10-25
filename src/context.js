System.register(['aurelia-dependency-injection', './cesium/cesium-imports', './common', './session', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, common_1, session_1, utils_1;
    var PoseStatus, scratchCartesian3, scratchQuaternion, scratchOriginCartesian3, ContextService;
    function _stringFromReferenceFrame(referenceFrame) {
        var rf = referenceFrame;
        return cesium_imports_1.defined(rf.id) ? rf.id : '' + rf;
    }
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (cesium_imports_1_1) {
                cesium_imports_1 = cesium_imports_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            /**
            * A bitmask that provides metadata about the pose of an EntityPose.
            *   KNOWN - the pose of the entity state is defined.
            *   KNOWN & FOUND - the pose was undefined when the entity state was last queried, and is now defined.
            *   LOST - the pose was defined when the entity state was last queried, and is now undefined
            */
            (function (PoseStatus) {
                PoseStatus[PoseStatus["KNOWN"] = 1] = "KNOWN";
                PoseStatus[PoseStatus["FOUND"] = 2] = "FOUND";
                PoseStatus[PoseStatus["LOST"] = 4] = "LOST";
            })(PoseStatus || (PoseStatus = {}));
            exports_1("PoseStatus", PoseStatus);
            scratchCartesian3 = new cesium_imports_1.Cartesian3(0, 0);
            scratchQuaternion = new cesium_imports_1.Quaternion(0, 0);
            scratchOriginCartesian3 = new cesium_imports_1.Cartesian3(0, 0);
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
            ContextService = (function () {
                function ContextService(sessionService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    /**
                     * An event that is raised when all remotely managed entities are are up-to-date for
                     * the current frame. It is suggested that all modifications to locally managed entities
                     * should occur within this event.
                     */
                    this.updateEvent = new utils_1.Event();
                    /**
                     * An event that is raised when it is an approriate time to render graphics.
                     * This event fires after the update event.
                     */
                    this.renderEvent = new utils_1.Event();
                    /**
                     * An event that fires when the local origin changes.
                     */
                    this.localOriginChangeEvent = new utils_1.Event();
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
                    this.time = new cesium_imports_1.JulianDate(0, 0);
                    /**
                     * The collection of all entities this application is aware of.
                     */
                    this.entities = new cesium_imports_1.EntityCollection();
                    /**
                     * An entity representing the location and orientation of the user.
                     */
                    this.user = this.entities.add(new cesium_imports_1.Entity({
                        id: 'ar.user',
                        name: 'user',
                        position: new cesium_imports_1.ConstantPositionProperty(undefined, cesium_imports_1.ReferenceFrame.FIXED),
                        orientation: new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY)
                    }));
                    /**
                     * An entity positioned near the user, aligned with the local East-North-Up
                     * coordinate system.
                     */
                    this.localOriginEastNorthUp = this.entities.add(new cesium_imports_1.Entity({
                        id: 'ar.localENU',
                        name: 'localOriginENU',
                        position: new cesium_imports_1.ConstantPositionProperty(undefined, cesium_imports_1.ReferenceFrame.FIXED),
                        orientation: new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY)
                    }));
                    /**
                     * An entity positioned near the user, aligned with the East-Up-South
                     * coordinate system. This useful for converting to the Y-Up convention
                     * used in some libraries, such as three.js.
                     */
                    this.localOriginEastUpSouth = this.entities.add(new cesium_imports_1.Entity({
                        id: 'ar.localEUS',
                        name: 'localOriginEUS',
                        position: new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, this.localOriginEastNorthUp),
                        orientation: new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_X, Math.PI / 2))
                    }));
                    /**
                     * The default origin to use when calling `getEntityPose`.
                     * By default, this is the `localOriginEastNorthUp` reference frame.
                     */
                    this.defaultReferenceFrame = this.localOriginEastNorthUp;
                    this._entityPoseCache = {};
                    this._entityPoseMap = new Map();
                    this._subscribedEntities = new WeakMap();
                    this._updatingEntities = new Set();
                    this._knownEntities = new Set();
                    this._sessionEntities = {};
                    if (this.sessionService.isRealityManager || this.sessionService.isRealityViewer) {
                        this.sessionService.connectEvent.addEventListener(function (session) {
                            _this._subscribedEntities.set(session, new Set());
                            session.on['ar.context.subscribe'] = function (_a) {
                                var id = _a.id;
                                var subscriptions = _this._subscribedEntities.get(session);
                                if (subscriptions)
                                    subscriptions.add(id);
                            };
                        });
                    }
                    else {
                        this.sessionService.manager.on['ar.context.update'] = function (state) {
                            _this._update(state);
                        };
                    }
                }
                Object.defineProperty(ContextService.prototype, "serializedFrameState", {
                    /**
                     * The serialized frame state for this frame
                     */
                    get: function () {
                        return this._serializedState;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ContextService.prototype, "systemTime", {
                    /**
                     * Deprecated. Use timestamp property.
                     * @private
                     */
                    get: function () {
                        var _this = this;
                        console.warn('systemTime property is deprecated. Use timestamp property');
                        Object.defineProperty(this, 'systemTime', {
                            get: function () { return _this.timestamp; }
                        });
                        return this.systemTime;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Deprecated. To be removed.
                 * @private
                 */
                ContextService.prototype.getTime = function () {
                    var _this = this;
                    console.warn('getTime function is deprecated. Use the ContextService.time property instead.');
                    this.getTime = function () { return _this.time; };
                    return this.getTime();
                };
                /**
                 * Deprecated. To be removed.
                 * @private
                 */
                ContextService.prototype.setDefaultReferenceFrame = function (origin) {
                    var _this = this;
                    console.warn('setDefaultReferenceFrame is deprecated. Use the ContextService.defaultReferenceFrame property directly.');
                    this.setDefaultReferenceFrame = function (origin) { return _this.defaultReferenceFrame = origin; };
                    this.setDefaultReferenceFrame(origin);
                };
                /**
                 * Deprecated. To be removed.
                 * @private
                 */
                ContextService.prototype.getDefaultReferenceFrame = function () {
                    var _this = this;
                    console.warn('getDefaultReferenceFrame is deprecated. Use the ContextService.defaultReferenceFrame property directly.');
                    this.getDefaultReferenceFrame = function () { return _this.defaultReferenceFrame; };
                    return this.getDefaultReferenceFrame();
                };
                /**
                 * Adds an entity to this session's set of tracked entities.
                 *
                 * @param id - The unique identifier of an entity.
                 * @returns The entity that was subscribed to.
                 */
                ContextService.prototype.subscribeToEntityById = function (id) {
                    this.sessionService.manager.send('ar.context.subscribe', { id: id });
                    return this.entities.getOrCreateEntity(id);
                };
                /**
                 * Gets the current pose of an entity, relative to a given reference frame.
                 *
                 * @param entity - The entity whose state is to be queried.
                 * @param referenceFrame - The intended reference frame. Defaults to `this.defaultReferenceFrame`.
                 * @returns If the position and orientation exist for the given entity, an
                 * object with the fields `position` and `orientation`, both of type
                 * `Cartesian3`. Otherwise undefined.
                 */
                ContextService.prototype.getEntityPose = function (entity, referenceFrame) {
                    if (referenceFrame === void 0) { referenceFrame = this.defaultReferenceFrame; }
                    var time = this.time;
                    var key = entity.id + '@' + _stringFromReferenceFrame(referenceFrame);
                    var entityPose = this._entityPoseMap.get(key);
                    if (!cesium_imports_1.defined(entityPose)) {
                        entityPose = {
                            position: new cesium_imports_1.Cartesian3,
                            orientation: new cesium_imports_1.Quaternion,
                            referenceFrame: referenceFrame,
                            poseStatus: 0
                        };
                        this._entityPoseMap.set(key, entityPose);
                    }
                    var position = utils_1.getEntityPositionInReferenceFrame(entity, time, referenceFrame, entityPose.position);
                    var orientation = utils_1.getEntityOrientationInReferenceFrame(entity, time, referenceFrame, entityPose.orientation);
                    var hasPose = position && orientation;
                    var poseStatus = 0;
                    var previousStatus = entityPose.poseStatus;
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
                };
                // TODO: This function is called a lot. Potential for optimization. 
                ContextService.prototype._update = function (serializedState) {
                    // if this session is the manager, we need to update our child sessions a.s.a.p
                    if (this.sessionService.isRealityManager) {
                        this._entityPoseCache = {};
                        for (var _i = 0, _a = this.sessionService.managedSessions; _i < _a.length; _i++) {
                            var session = _a[_i];
                            if (common_1.Role.isRealityAugmenter(session.info.role))
                                this._sendUpdateForSession(serializedState, session);
                        }
                    }
                    // our user entity is defined by the current view pose (the current reality must provide this)
                    this.updateEntityFromSerializedPose(this.user.id, serializedState.view.pose);
                    // update the entities the manager knows about
                    this._knownEntities.clear();
                    if (serializedState.entities) {
                        for (var id in serializedState.entities) {
                            this.updateEntityFromSerializedPose(id, serializedState.entities[id]);
                            this._updatingEntities.add(id);
                            this._knownEntities.add(id);
                        }
                    }
                    // if the mangager didn't send us an update for a particular entity,
                    // assume the manager no longer knows about it
                    for (var _b = 0, _c = this._updatingEntities; _b < _c.length; _b++) {
                        var id = _c[_b];
                        if (!this._knownEntities.has(id)) {
                            var entity = this.entities.getById(id);
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
                    var timestamp = performance.now();
                    this.deltaTime = Math.min(timestamp - this.timestamp, this.maxDeltaTime);
                    this.timestamp = timestamp;
                    cesium_imports_1.JulianDate.clone(serializedState.view.time, this.time);
                    this._serializedState = serializedState;
                    // raise an event for the user to update and render the scene
                    this.updateEvent.raiseEvent(this);
                    this.renderEvent.raiseEvent(this);
                };
                ContextService.prototype.updateEntityFromSerializedPose = function (id, entityPose) {
                    var entity = this.entities.getOrCreateEntity(id);
                    if (!entityPose) {
                        entity.position = undefined;
                        entity.orientation = undefined;
                        return entity;
                    }
                    var positionValue = entityPose.p;
                    var orientationValue = entityPose.o;
                    var referenceFrame = typeof entityPose.r === 'number' ?
                        entityPose.r : this.entities.getOrCreateEntity(entityPose.r);
                    var entityPosition = entity.position;
                    var entityOrientation = entity.orientation;
                    if (entityPosition instanceof cesium_imports_1.ConstantPositionProperty &&
                        entityPosition.referenceFrame === referenceFrame) {
                        entityPosition.setValue(positionValue, referenceFrame);
                    }
                    else {
                        entity.position = new cesium_imports_1.ConstantPositionProperty(positionValue, referenceFrame);
                    }
                    if (entityOrientation instanceof cesium_imports_1.ConstantProperty) {
                        entityOrientation.setValue(orientationValue);
                    }
                    else {
                        entity.orientation = new cesium_imports_1.ConstantProperty(orientationValue);
                    }
                    return entity;
                };
                ContextService.prototype.publishEntityState = function (entity, referenceFrame) {
                };
                ContextService.prototype._updateLocalOrigin = function (state) {
                    var pose = state.view.pose;
                    var rootFrame = pose ?
                        typeof pose.r === 'number' ?
                            pose.r :
                            this.entities.getOrCreateEntity(pose.r) :
                        this.user;
                    var userPosition = this.user.position &&
                        this.user.position.getValueInReferenceFrame(state.view.time, rootFrame, scratchCartesian3);
                    var localENUFrame = this.localOriginEastNorthUp.position &&
                        this.localOriginEastNorthUp.position.referenceFrame;
                    var localENUPosition = this.localOriginEastNorthUp.position && localENUFrame &&
                        this.localOriginEastNorthUp.position.getValueInReferenceFrame(state.view.time, localENUFrame, scratchOriginCartesian3);
                    if (!userPosition || !localENUPosition ||
                        localENUFrame !== rootFrame ||
                        cesium_imports_1.Cartesian3.magnitudeSquared(cesium_imports_1.Cartesian3.subtract(userPosition, localENUPosition, scratchOriginCartesian3)) > 25000000) {
                        var localENUPositionProperty = this.localOriginEastNorthUp.position;
                        var localENUOrientationProperty = this.localOriginEastNorthUp.orientation;
                        if (userPosition) {
                            localENUPositionProperty.setValue(userPosition, rootFrame);
                            if (rootFrame === cesium_imports_1.ReferenceFrame.FIXED) {
                                var enuOrientation = cesium_imports_1.Transforms.headingPitchRollQuaternion(userPosition, 0, 0, 0, undefined, scratchQuaternion);
                                localENUOrientationProperty.setValue(enuOrientation);
                            }
                            else {
                                localENUOrientationProperty.setValue(cesium_imports_1.Quaternion.IDENTITY);
                            }
                        }
                        else {
                            localENUPositionProperty.setValue(cesium_imports_1.Cartesian3.ZERO, this.user);
                            localENUOrientationProperty.setValue(cesium_imports_1.Quaternion.IDENTITY);
                        }
                        this.localOriginChangeEvent.raiseEvent(undefined);
                    }
                };
                ContextService.prototype._sendUpdateForSession = function (state, session) {
                    var sessionEntities = this._sessionEntities;
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
                    for (var _i = 0, _a = this._subscribedEntities.get(session); _i < _a.length; _i++) {
                        var id_1 = _a[_i];
                        sessionEntities[id_1] = this._getSerializedEntityPose(id_1, state.view.time);
                    }
                    // recycle the parent frame state object, but with the session entities
                    var parentEntities = state.entities;
                    state.entities = sessionEntities;
                    state['time'] = state.view.time; // deprecated
                    state.sendTime = cesium_imports_1.JulianDate.now(state.sendTime);
                    session.send('ar.context.update', state);
                    state.entities = parentEntities;
                };
                ContextService.prototype._getSerializedEntityPose = function (id, time) {
                    if (!cesium_imports_1.defined(this._entityPoseCache[id])) {
                        var entity = this.entities.getById(id);
                        if (!entity)
                            return undefined;
                        this._entityPoseCache[id] = utils_1.getSerializedEntityPose(entity, time);
                    }
                    return this._entityPoseCache[id];
                };
                ContextService = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService)
                ], ContextService);
                return ContextService;
            }());
            exports_1("ContextService", ContextService);
        }
    }
});

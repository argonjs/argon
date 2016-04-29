System.register(['aurelia-dependency-injection', './cesium/cesium-imports', './common', './session', './reality', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, common_1, session_1, reality_1, utils_1;
    var PoseStatus, scratchDate, scratchCartesian3, scratchQuaternion, scratchOriginCartesian3, ContextService;
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
            function (reality_1_1) {
                reality_1 = reality_1_1;
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
            scratchDate = new cesium_imports_1.JulianDate(0, 0);
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
                function ContextService(sessionService, realityService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.realityService = realityService;
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
                     * The set of entities that this session is aware of.
                     */
                    this.entities = new cesium_imports_1.EntityCollection();
                    /**
                     * An event that fires when the local origin changes.
                     */
                    this.localOriginChangeEvent = new utils_1.Event();
                    /**
                     * An entity representing the location and orientation of the user.
                     */
                    this.user = new cesium_imports_1.Entity({
                        id: 'USER',
                        name: 'user',
                        position: new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, null),
                        orientation: new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY)
                    });
                    /**
                     * An entity positioned near the user, aligned with the local East-North-Up
                     * coordinate system.
                     */
                    this.localOriginEastNorthUp = new cesium_imports_1.Entity({
                        name: 'localOriginENU',
                        position: new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, null),
                        orientation: new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY)
                    });
                    /**
                     * An entity positioned near the user, aligned with the East-Up-South
                     * coordinate system. This useful for converting to the Y-Up convention
                     * used in some libraries, such as three.js.
                     */
                    this.localOriginEastUpSouth = new cesium_imports_1.Entity({
                        name: 'localOriginEUS',
                        position: new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, this.localOriginEastNorthUp),
                        orientation: new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_X, Math.PI / 2))
                    });
                    // the current time (based on the current reality view, not valid until first update event)
                    this._time = new cesium_imports_1.JulianDate(0, 0);
                    // The default origin to use when calling `getEntityPose`.
                    this._defaultReferenceFrame = this.localOriginEastNorthUp;
                    this._entityPoseCache = {};
                    this._entityPoseMap = new Map();
                    this._subscribedEntities = new WeakMap();
                    this._updatingEntities = new Set();
                    this._knownEntities = new Set();
                    this.entities.add(this.user);
                    if (this.sessionService.isManager()) {
                        this.realityService.frameEvent.addEventListener(function (state) {
                            _this._update(state);
                        });
                    }
                    else {
                        this.sessionService.manager.on['ar.context.update'] = function (state) {
                            _this._update(state);
                        };
                    }
                    this.sessionService.connectEvent.addEventListener(function (session) {
                        _this._subscribedEntities.set(session, new Set());
                        session.on['ar.context.subscribe'] = function (_a) {
                            var id = _a.id;
                            var subscriptions = _this._subscribedEntities.get(session);
                            subscriptions.add(id);
                        };
                    });
                }
                /**
                 * Get the current time (not valid until the first update event)
                 */
                ContextService.prototype.getTime = function () {
                    return this._time;
                };
                /**
                 * Set the default reference frame for `getCurrentEntityState`.
                 */
                ContextService.prototype.setDefaultReferenceFrame = function (origin) {
                    this._defaultReferenceFrame = origin;
                };
                /**
                 * Get the default reference frame to use when calling `getEntityPose`.
                 * By default, this is the `localOriginEastNorthUp` reference frame.
                 */
                ContextService.prototype.getDefaultReferenceFrame = function () {
                    return this._defaultReferenceFrame;
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
                    if (referenceFrame === void 0) { referenceFrame = this._defaultReferenceFrame; }
                    var time = this._time;
                    var key = entity.id + _stringFromReferenceFrame(referenceFrame);
                    var entityPose = this._entityPoseMap.get(key);
                    if (entityPose && cesium_imports_1.JulianDate.equals(entityPose.time, time))
                        return entityPose;
                    if (!cesium_imports_1.defined(entityPose)) {
                        entityPose = {
                            position: new cesium_imports_1.Cartesian3,
                            orientation: new cesium_imports_1.Quaternion,
                            time: cesium_imports_1.JulianDate.clone(time),
                            poseStatus: 0
                        };
                        this._entityPoseMap.set(key, entityPose);
                    }
                    else {
                        cesium_imports_1.JulianDate.clone(time, entityPose.time);
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
                ContextService.prototype.getCurrentEntityState = function (entity, referenceFrame) {
                    console.warn('getCurrentEntityState is deprecated. Use getEntityPose instead.');
                    return this.getEntityPose(entity, referenceFrame);
                };
                ContextService.prototype._update = function (state) {
                    var _this = this;
                    state.entities['USER'] = state.view.pose;
                    state.view.subviews.forEach(function (subview, index) {
                        state.entities['ar.view_' + index] = subview.pose || state.view.pose;
                    });
                    this._knownEntities.clear();
                    for (var id in state.entities) {
                        this._updateEntity(id, state);
                        this._updatingEntities.add(id);
                        this._knownEntities.add(id);
                    }
                    this._updatingEntities.forEach(function (id) {
                        if (!_this._knownEntities.has(id)) {
                            _this.entities.getById(id).position = undefined;
                            _this._updatingEntities.delete(id);
                        }
                    });
                    this._updateOrigin(state);
                    if (this.sessionService.isManager()) {
                        this._entityPoseCache = {};
                        for (var _i = 0, _a = this.sessionService.managedSessions; _i < _a.length; _i++) {
                            var session = _a[_i];
                            if (session.info.role === common_1.Role.APPLICATION)
                                this._sendUpdateForSession(state, session);
                        }
                    }
                    cesium_imports_1.JulianDate.clone(state.time, this._time);
                    this.updateEvent.raiseEvent(state);
                    this.renderEvent.raiseEvent(state);
                };
                ContextService.prototype._updateEntity = function (id, state) {
                    var entityPose = state.entities[id];
                    if (!entityPose)
                        return;
                    var referenceFrame;
                    if (entityPose.r) {
                        if (typeof entityPose.r === 'number') {
                            referenceFrame = entityPose.r;
                        }
                        else {
                            referenceFrame = this.entities.getById(entityPose.r);
                        }
                    }
                    else {
                        referenceFrame = cesium_imports_1.ReferenceFrame.FIXED;
                    }
                    if (!cesium_imports_1.defined(referenceFrame)) {
                        referenceFrame = this._updateEntity(entityPose.r, state);
                    }
                    var positionValue = (entityPose.p === 0 ? cesium_imports_1.Cartesian3.ZERO : entityPose.p);
                    var orientationValue = entityPose.o === 0 ? cesium_imports_1.Quaternion.IDENTITY : entityPose.o;
                    var entity = this.entities.getOrCreateEntity(id);
                    var entityPosition = entity.position;
                    var entityOrientation = entity.orientation;
                    if (!cesium_imports_1.defined(entityPosition)) {
                        entity.position = new cesium_imports_1.ConstantPositionProperty(positionValue, referenceFrame);
                    }
                    else if (entityPosition instanceof cesium_imports_1.ConstantPositionProperty) {
                        entityPosition.setValue(positionValue, referenceFrame);
                    }
                    else if (entityPosition instanceof cesium_imports_1.SampledPositionProperty) {
                        entityPosition.addSample(state.time, positionValue);
                    }
                    if (!cesium_imports_1.defined(entityOrientation)) {
                        entity.orientation = new cesium_imports_1.ConstantProperty(orientationValue);
                    }
                    else if (entityOrientation instanceof cesium_imports_1.ConstantProperty) {
                        entityOrientation.setValue(orientationValue);
                    }
                    else if (entityOrientation instanceof cesium_imports_1.SampledProperty) {
                        entityOrientation.addSample(state.time, orientationValue);
                    }
                    return entity;
                };
                ContextService.prototype._updateOrigin = function (state) {
                    var userRootFrame = utils_1.getRootReferenceFrame(this.user);
                    var userPosition = this.user.position.getValueInReferenceFrame(state.time, userRootFrame, scratchCartesian3);
                    var localENUFrame = this.localOriginEastNorthUp.position.referenceFrame;
                    var localENUPosition = this.localOriginEastNorthUp.position.getValueInReferenceFrame(state.time, localENUFrame, scratchOriginCartesian3);
                    if (!localENUPosition || localENUFrame !== userRootFrame ||
                        cesium_imports_1.Cartesian3.magnitudeSquared(cesium_imports_1.Cartesian3.subtract(userPosition, localENUPosition, scratchOriginCartesian3)) > 25000000) {
                        var localENUPositionProperty = this.localOriginEastNorthUp.position;
                        var localENUOrientationProperty = this.localOriginEastNorthUp.orientation;
                        localENUPositionProperty.setValue(userPosition, userRootFrame);
                        if (userRootFrame === cesium_imports_1.ReferenceFrame.FIXED) {
                            var enuOrientation = cesium_imports_1.Transforms.headingPitchRollQuaternion(userPosition, 0, 0, 0, undefined, scratchQuaternion);
                            localENUOrientationProperty.setValue(enuOrientation);
                        }
                        else {
                            localENUOrientationProperty.setValue(cesium_imports_1.Quaternion.IDENTITY);
                        }
                        this.localOriginChangeEvent.raiseEvent(undefined);
                    }
                };
                ContextService.prototype._sendUpdateForSession = function (parentState, session) {
                    var _this = this;
                    var sessionPoseMap = {};
                    for (var id in parentState.entities) {
                        sessionPoseMap[id] = parentState.entities[id];
                    }
                    this._subscribedEntities.get(session).forEach(function (id) {
                        _this._addEntityAndAncestorsToPoseMap(sessionPoseMap, id, parentState.time);
                    });
                    var sessionState = {
                        reality: parentState.reality,
                        time: parentState.time,
                        frameNumber: parentState.frameNumber,
                        view: parentState.view,
                        entities: sessionPoseMap
                    };
                    session.send('ar.context.update', sessionState);
                };
                ContextService.prototype._addEntityAndAncestorsToPoseMap = function (poseMap, id, time) {
                    if (!cesium_imports_1.defined(this._entityPoseCache[id])) {
                        var entity = this.entities.getById(id);
                        if (!entity)
                            return;
                        this._entityPoseCache[id] = utils_1.getSerializedEntityPose(entity, time);
                        if (entity.position.referenceFrame instanceof cesium_imports_1.Entity) {
                            var refId = _stringFromReferenceFrame(entity.position.referenceFrame);
                            this._addEntityAndAncestorsToPoseMap(poseMap, refId, time);
                        }
                    }
                    poseMap[id] = this._entityPoseCache[id];
                };
                ContextService = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, reality_1.RealityService)
                ], ContextService);
                return ContextService;
            }());
            exports_1("ContextService", ContextService);
        }
    }
});

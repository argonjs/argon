System.register(['aurelia-dependency-injection', './cesium/cesium-imports', './config', './device', './session', './reality', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, config_1, device_1, session_1, reality_1, utils_1;
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
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (device_1_1) {
                device_1 = device_1_1;
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
            * A bitmask that describes the position and orientation of an EntityState.
            * A valid pose status is one of the following:
            *   KNOWN - the pose of the entity state is known.
            *   UNKNOWN - the pose of the entity state is unknown.
            *   KNOWN & FOUND - the pose was UNKNOWN when the entity state was last queried, and is now KNOWN
            *   LOST & UNKNOWN - the pose was KNOWN when the entity state was last queried, and is now UNKNOWN
            */
            (function (PoseStatus) {
                PoseStatus[PoseStatus["KNOWN"] = 1] = "KNOWN";
                PoseStatus[PoseStatus["UNKNOWN"] = 2] = "UNKNOWN";
                PoseStatus[PoseStatus["FOUND"] = 4] = "FOUND";
                PoseStatus[PoseStatus["LOST"] = 8] = "LOST";
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
                function ContextService(sessionService, realityService, deviceService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.realityService = realityService;
                    this.deviceService = deviceService;
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
                        position: new cesium_imports_1.ConstantPositionProperty(),
                        orientation: new cesium_imports_1.ConstantProperty()
                    });
                    /**
                     * An entity positioned near the user, aligned with the local East-North-Up
                     * coordinate system.
                     */
                    this.localOriginEastNorthUp = new cesium_imports_1.Entity({
                        name: 'localOriginENU',
                        position: new cesium_imports_1.ConstantPositionProperty(),
                        orientation: new cesium_imports_1.ConstantProperty()
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
                    this.entities.add(deviceService.entity);
                    this.entities.add(deviceService.interfaceEntity);
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
                        session.on['ar.context.subscribe'] = function (_a) {
                            var id = _a.id;
                            var subscriptions = _this._subscribedEntities.get(session) || [];
                            if (subscriptions.indexOf(id) === -1)
                                subscriptions.push(id);
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
                            poseStatus: PoseStatus.UNKNOWN
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
                    else {
                        poseStatus |= PoseStatus.UNKNOWN;
                    }
                    if (hasPose && previousStatus & PoseStatus.UNKNOWN) {
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
                            if (session.info.role === config_1.Role.APPLICATION)
                                this._sendUpdateForSession(state, session);
                        }
                    }
                    cesium_imports_1.JulianDate.clone(state.time, this._time);
                    this.updateEvent.raiseEvent(state);
                    this.renderEvent.raiseEvent(state);
                };
                ContextService.prototype._updateEntity = function (id, state) {
                    var entityPose = state.entities[id];
                    var referenceFrame = (typeof entityPose.referenceFrame === 'number') ?
                        entityPose.referenceFrame :
                        this.entities.getById(entityPose.referenceFrame);
                    if (!cesium_imports_1.defined(referenceFrame)) {
                        referenceFrame = this._updateEntity(entityPose.referenceFrame, state);
                    }
                    var entity = this.entities.getOrCreateEntity(id);
                    if (entity.position instanceof cesium_imports_1.ConstantPositionProperty === false ||
                        entity.orientation instanceof cesium_imports_1.ConstantProperty === false) {
                        entity.position = new cesium_imports_1.ConstantPositionProperty(entityPose.position, referenceFrame);
                        entity.orientation = new cesium_imports_1.ConstantProperty(entityPose.orientation);
                    }
                    var entityPosition = entity.position;
                    var entityOrientation = entity.orientation;
                    entityPosition.setValue(entityPose.position, referenceFrame);
                    entityOrientation.setValue(entityPose.orientation);
                    return entity;
                };
                ContextService.prototype._updateOrigin = function (state) {
                    var userRootFrame = utils_1.getRootReferenceFrame(this.user);
                    var userPosition = this.user.position.getValueInReferenceFrame(state.time, userRootFrame, scratchCartesian3);
                    var userENUPositionProperty = this.localOriginEastNorthUp.position;
                    userENUPositionProperty.setValue(userPosition, userRootFrame);
                    var localENUFrame = this.localOriginEastNorthUp.position.referenceFrame;
                    var localENUPosition = this.localOriginEastNorthUp.position.getValueInReferenceFrame(state.time, localENUFrame, scratchOriginCartesian3);
                    if (!localENUPosition || localENUFrame !== userRootFrame ||
                        cesium_imports_1.Cartesian3.magnitudeSquared(cesium_imports_1.Cartesian3.subtract(userPosition, localENUPosition, scratchOriginCartesian3)) > 25000000) {
                        var localENUPositionProperty = this.localOriginEastNorthUp.position;
                        var localENUOrientationProperty = this.localOriginEastNorthUp.orientation;
                        localENUPositionProperty.setValue(userPosition, userRootFrame);
                        var enuOrientation = utils_1.getEntityOrientationInReferenceFrame(this.localOriginEastNorthUp, state.time, userRootFrame, scratchQuaternion);
                        localENUOrientationProperty.setValue(enuOrientation);
                        this.localOriginChangeEvent.raiseEvent(undefined);
                    }
                };
                ContextService.prototype._sendUpdateForSession = function (parentState, session) {
                    var sessionPoseMap = {};
                    for (var id in parentState.entities) {
                        sessionPoseMap[id] = parentState.entities[id];
                    }
                    for (var id in this._subscribedEntities.get(session)) {
                        this._addEntityAndAncestorsToPoseMap(sessionPoseMap, id, parentState.time);
                    }
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
                        this._entityPoseCache[id] = utils_1.calculatePose(entity, time);
                        if (entity.position.referenceFrame instanceof cesium_imports_1.Entity) {
                            var refId = _stringFromReferenceFrame(entity.position.referenceFrame);
                            this._addEntityAndAncestorsToPoseMap(poseMap, refId, time);
                        }
                    }
                    poseMap[id] = this._entityPoseCache[id];
                };
                ContextService = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, reality_1.RealityService, device_1.DeviceService)
                ], ContextService);
                return ContextService;
            }());
            exports_1("ContextService", ContextService);
        }
    }
});

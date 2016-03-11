System.register(['./cesium/cesium-imports.ts', 'aurelia-dependency-injection', './session.ts', './utils.ts', './device.ts', './reality.ts'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var cesium_imports_ts_1, aurelia_dependency_injection_1, session_ts_1, utils_ts_1, device_ts_1, reality_ts_1;
    var PoseStatus, PresentationMode, scratchDate, scratchCartesian3, scratchQuaternion, scratchOriginCartesian3, Context;
    return {
        setters:[
            function (cesium_imports_ts_1_1) {
                cesium_imports_ts_1 = cesium_imports_ts_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (session_ts_1_1) {
                session_ts_1 = session_ts_1_1;
            },
            function (utils_ts_1_1) {
                utils_ts_1 = utils_ts_1_1;
            },
            function (device_ts_1_1) {
                device_ts_1 = device_ts_1_1;
            },
            function (reality_ts_1_1) {
                reality_ts_1 = reality_ts_1_1;
            }],
        execute: function() {
            /*
            * A bitmask that describes the pose status of an EntityState.
            */
            (function (PoseStatus) {
                PoseStatus[PoseStatus["FOUND"] = 1] = "FOUND";
                PoseStatus[PoseStatus["LOST"] = 2] = "LOST";
                PoseStatus[PoseStatus["KNOWN"] = 4] = "KNOWN";
                PoseStatus[PoseStatus["UNKNOWN"] = 8] = "UNKNOWN";
            })(PoseStatus || (PoseStatus = {}));
            exports_1("PoseStatus", PoseStatus);
            /**
             * How a web page is being displayed.
             */
            (function (PresentationMode) {
                /**
                 * A web page displayed in the normal manner.
                 */
                PresentationMode[PresentationMode["Page"] = "Page"] = "Page";
                /**
                 * A web page with interactive argon components.
                 */
                PresentationMode[PresentationMode["Immersive"] = "Immersive"] = "Immersive";
            })(PresentationMode || (PresentationMode = {}));
            exports_1("PresentationMode", PresentationMode);
            scratchDate = new cesium_imports_ts_1.JulianDate(0, 0);
            scratchCartesian3 = new cesium_imports_ts_1.Cartesian3(0, 0);
            scratchQuaternion = new cesium_imports_ts_1.Quaternion(0, 0);
            scratchOriginCartesian3 = new cesium_imports_ts_1.Cartesian3(0, 0);
            /**
             * TODO
             */
            Context = (function () {
                /**
                 * TODO
                 */
                function Context(realityService, deviceService, sessionFactory, messageChannelFactory, role, parentSessionConnectService) {
                    var _this = this;
                    this.realityService = realityService;
                    this.deviceService = deviceService;
                    this.sessionFactory = sessionFactory;
                    this.messageChannelFactory = messageChannelFactory;
                    this.role = role;
                    this.parentSessionConnectService = parentSessionConnectService;
                    this.__reality = undefined;
                    this._entities = new cesium_imports_ts_1.EntityCollection();
                    this._frame = undefined;
                    this._errorEvent = new utils_ts_1.Event();
                    this._updateEvent = new utils_ts_1.Event();
                    /**
                     * An event that can be subscribed to in order to get callbacks ever
                     * frame. The render event fires after the update event.
                     */
                    this._renderEvent = new utils_ts_1.Event();
                    this._localOriginChangeEvent = new utils_ts_1.Event();
                    this._focusEvent = new utils_ts_1.Event();
                    this._blurEvent = new utils_ts_1.Event();
                    this._hasFocus = false;
                    this._sessions = [];
                    this._focussedSession = null;
                    this._sessionCreateEvent = new utils_ts_1.Event();
                    this._realityConnectEvent = new utils_ts_1.Event();
                    this._realityChangeEvent = new utils_ts_1.Event();
                    this._sessionFocusEvent = new utils_ts_1.Event();
                    this._sessionToDesiredRealityMap = new WeakMap();
                    this._desiredRealityToOwnerSessionMap = new WeakMap();
                    this._sessionToDesiredPresentationModeMap = new WeakMap();
                    this._sessionToSubscribedEntities = new WeakMap();
                    this._updatingEntities = new Set();
                    this._knownEntities = new Set();
                    this._desiredReality = null;
                    this.entityStateMap = new Map();
                    /**
                     * The eye frustum.
                     */
                    this.frustum = new cesium_imports_ts_1.PerspectiveFrustum;
                    /**
                     * An entity representing the device running Argon.
                     */
                    this.device = new cesium_imports_ts_1.Entity({
                        id: 'DEVICE',
                        name: 'device',
                        position: new cesium_imports_ts_1.ConstantPositionProperty(),
                        orientation: new cesium_imports_ts_1.ConstantProperty()
                    });
                    /**
                     * An entity representing the 'eye' through which Argon sees (usually a
                     * camera). The scene is always rendered from this viewport.
                     */
                    this.eye = new cesium_imports_ts_1.Entity({
                        id: 'EYE',
                        name: 'eye',
                        position: new cesium_imports_ts_1.ConstantPositionProperty(),
                        orientation: new cesium_imports_ts_1.ConstantProperty()
                    });
                    /**
                     * An origin positioned at the eye, aligned with the local East-North-Up
                     * coordinate system.
                     */
                    this.eyeOriginEastNorthUp = new cesium_imports_ts_1.Entity({
                        name: 'eyeOrigin',
                        position: new cesium_imports_ts_1.ConstantPositionProperty(),
                        orientation: new cesium_imports_ts_1.ConstantProperty()
                    });
                    /**
                     * An origin positioned near the eye which doesn't change very often,
                     * aligned with the East-North-Up coordinate system.
                     */
                    this.localOriginEastNorthUp = new cesium_imports_ts_1.Entity({
                        name: 'origin',
                        position: new cesium_imports_ts_1.ConstantPositionProperty(),
                        orientation: new cesium_imports_ts_1.ConstantProperty()
                    });
                    /**
                     * An origin positioned near the eye which doesn't change very often,
                     * aligned with the East-Up-South coordinate system. This useful for
                     * converting to the Y-Up convention used in some libraries, such as
                     * three.js.
                     */
                    this.localOriginEastUpSouth = new cesium_imports_ts_1.Entity({
                        name: 'originEastUpSouth',
                        position: new cesium_imports_ts_1.ConstantPositionProperty(cesium_imports_ts_1.Cartesian3.ZERO, this.localOriginEastNorthUp),
                        orientation: new cesium_imports_ts_1.ConstantProperty(cesium_imports_ts_1.Quaternion.fromAxisAngle(cesium_imports_ts_1.Cartesian3.UNIT_X, Math.PI / 2))
                    });
                    this._origin = this.localOriginEastNorthUp;
                    this.entities.add(this.device);
                    this.entities.add(this.eye);
                    this._parentSession = this.addSession();
                    this.parentSession.on['ar.context.update'] = function (frameState) {
                        _this._update(frameState);
                    };
                    this.parentSession.on['ar.context.realityControlSession'] = function (message) {
                        var messageChannel = _this.messageChannelFactory.create();
                        var realityControlSession = _this.sessionFactory.create();
                        messageChannel.port1.onmessage = function (msg) {
                            _this.parentSession.send('ar.context.realityControlMessage', msg.data);
                        };
                        _this.parentSession.on['ar.context.realityControlMessage'] = function (message) {
                            messageChannel.port1.postMessage(message);
                        };
                        realityControlSession.openEvent.addEventListener(function () {
                            _this.realityConnectEvent.raiseEvent(realityControlSession);
                        });
                        _this.parentSession.closeEvent.addEventListener(function () {
                            realityControlSession.close();
                        });
                        realityControlSession.open(messageChannel.port2, { role: _this.role });
                    };
                    this.parentSession.on['ar.context.focus'] = function () {
                        _this._hasFocus = true;
                        _this.focusEvent.raiseEvent(undefined);
                    };
                    this.parentSession.on['ar.context.blur'] = function () {
                        _this._hasFocus = false;
                        _this.blurEvent.raiseEvent(undefined);
                    };
                    this.parentSession.errorEvent.addEventListener(function (error) {
                        _this.errorEvent.raiseEvent(error);
                    });
                    this.errorEvent.addEventListener(function (error) {
                        if (_this.errorEvent.numberOfListeners === 1)
                            console.error(error);
                    });
                }
                /**
                 * Called internally by the ArgonSystem instance.
                 */
                Context.prototype.init = function () {
                    var _this = this;
                    this.parentSessionConnectService.connect(this.parentSession);
                    this.parentSession.focus();
                    Promise.resolve().then(function () {
                        if (!_this.desiredReality)
                            _this.setDesiredReality(null);
                    });
                };
                Object.defineProperty(Context.prototype, "reality", {
                    /**
                     * The reality associated with this context.
                     */
                    get: function () {
                        return this.__reality;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Context.prototype, "_reality", {
                    set: function (value) {
                        if (!this.__reality || this.__reality.id !== value.id) {
                            this.__reality = value;
                            this.realityChangeEvent.raiseEvent(undefined);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Context.prototype, "parentSession", {
                    /**
                     * The parent session associated with this context.
                     */
                    get: function () { return this._parentSession; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Context.prototype, "entities", {
                    /**
                     * The set of entities that are a part of this context.
                     */
                    get: function () { return this._entities; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Context.prototype, "frame", {
                    /**
                     * The current frame.
                     */
                    get: function () { return this._frame; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Context.prototype, "errorEvent", {
                    /**
                     * An event that is raised when a error occurs.
                     *
                     * The callback receives the error that occurred.
                     */
                    get: function () { return this._errorEvent; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Context.prototype, "updateEvent", {
                    /**
                     * An event that can be subscribed to in order to get callbacks every
                     * frame.
                     *
                     * The callback receives the current frame's state.
                     */
                    get: function () { return this._updateEvent; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Context.prototype, "renderEvent", {
                    get: function () { return this._renderEvent; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Context.prototype, "localOriginChangeEvent", {
                    /**
                     * An event that can be subscribed to in order to get callbacks whenever
                     * the local origin system changes.
                     */
                    get: function () { return this._localOriginChangeEvent; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Context.prototype, "focusEvent", {
                    /**
                     * An event that can be subscribed to in order to get callbacks whenever
                     * this context is focused on.
                     */
                    get: function () { return this._focusEvent; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Context.prototype, "blurEvent", {
                    /**
                     * An event that can be subscribed to in order to get callbacks whenever
                     * this context is no longer being focused on.
                     */
                    get: function () { return this._blurEvent; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Context.prototype, "hasFocus", {
                    /**
                     * Whether this context is currently being focused on.
                     */
                    get: function () { return this._hasFocus; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Context.prototype, "sessions", {
                    // manager properties
                    /**
                     * The set of all sessions associated with this context.
                     */
                    get: function () { return this._sessions; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Context.prototype, "focussedSession", {
                    /**
                     * The currently focused session, or null if one is not focused.
                     */
                    get: function () { return this._focussedSession; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Context.prototype, "sessionConnectEvent", {
                    /**
                     * An event that is raised when the parent session is opened (when this.init is called),
                     * and when any child session is opened (if this context has a manager role).
                     * This event is never raised when a reality control session is opened.
                     *
                     * The callback receives the newly opened session.
                     */
                    get: function () { return this._sessionCreateEvent; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Context.prototype, "realityConnectEvent", {
                    /**
                     * An event that is raised when a reality control session is opened.
                     *
                     * The callback receives the newly opened reality control session.
                     */
                    get: function () { return this._realityConnectEvent; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Context.prototype, "realityChangeEvent", {
                    /**
                     * An event that is raised when this context's reality is changed.
                     */
                    get: function () { return this._realityChangeEvent; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Context.prototype, "sessionFocusEvent", {
                    /**
                     * An event that is raised when a session is focused upon.
                     *
                     * The callback receives the newly focused session.
                     */
                    get: function () { return this._sessionFocusEvent; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Context.prototype._update = function (state) {
                    var _this = this;
                    if (!cesium_imports_ts_1.defined(state.entities))
                        state.entities = {};
                    if (!cesium_imports_ts_1.defined(state.entities['DEVICE'])) {
                        state.entities['DEVICE'] = this.deviceService.getDevicePose(state.time);
                    }
                    if (!cesium_imports_ts_1.defined(state.entities['EYE'])) {
                        state.entities['EYE'] = this.deviceService.getEyePose(state.time);
                    }
                    if (!cesium_imports_ts_1.defined(state.camera))
                        state.camera = this.deviceService.getCameraState();
                    if (!cesium_imports_ts_1.defined(state.size))
                        state.size = this.deviceService.getViewSize();
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
                    if (state.camera.type === 'perspective') {
                        var camera = state.camera;
                        if (!camera.fovX && !camera.fovY) {
                            console.error('Camera state is invalid: both fovX and fovY are missing.');
                            return;
                        }
                        var aspect = this.frustum.aspectRatio = camera.fovX && camera.fovY ?
                            Math.tan(camera.fovX * 0.5) / Math.tan(camera.fovY * 0.5) :
                            state.size.width / state.size.height;
                        if (aspect > 1) {
                            if (!camera.fovX)
                                camera.fovX = 2 * Math.atan(Math.tan(camera.fovY * 0.5) * aspect);
                            this.frustum.fov = camera.fovX;
                        }
                        else {
                            if (!camera.fovY)
                                camera.fovY = 2 * Math.atan(Math.tan(camera.fovX * 0.5) / aspect);
                            this.frustum.fov = camera.fovY;
                        }
                        this.frustum['xOffset'] = camera.xOffset;
                        this.frustum['yOffset'] = camera.yOffset;
                    }
                    var entityPoseCache = {};
                    if (this.role === session_ts_1.Role.MANAGER) {
                        for (var _i = 0, _a = this.sessions; _i < _a.length; _i++) {
                            var session = _a[_i];
                            if (session.info.enableIncomingUpdateEvents)
                                this._sendUpdateForSesion(state, session, entityPoseCache);
                        }
                    }
                    this._reality = state.reality;
                    this._frame = state;
                    this.updateEvent.raiseEvent(state);
                    this.renderEvent.raiseEvent(state);
                };
                Context.prototype._updateEntity = function (id, state) {
                    var entityPose = state.entities[id];
                    var referenceFrame = (typeof entityPose.referenceFrame === 'number') ?
                        entityPose.referenceFrame :
                        this.entities.getById(entityPose.referenceFrame);
                    if (!cesium_imports_ts_1.defined(referenceFrame)) {
                        referenceFrame = this._updateEntity(entityPose.referenceFrame, state);
                    }
                    var entity = this.entities.getOrCreateEntity(id);
                    if (entity.position instanceof cesium_imports_ts_1.ConstantPositionProperty === false ||
                        entity.orientation instanceof cesium_imports_ts_1.ConstantProperty === false) {
                        entity.position = new cesium_imports_ts_1.ConstantPositionProperty(entityPose.position, referenceFrame);
                        entity.orientation = new cesium_imports_ts_1.ConstantProperty(entityPose.orientation);
                    }
                    var entityPosition = entity.position;
                    var entityOrientation = entity.orientation;
                    entityPosition.setValue(entityPose.position, referenceFrame);
                    entityOrientation.setValue(entityPose.orientation);
                    return entity;
                };
                Context.prototype._updateOrigin = function (state) {
                    var eyeRootFrame = utils_ts_1.getRootReferenceFrame(this.eye);
                    var eyePosition = this.eye.position.getValueInReferenceFrame(state.time, eyeRootFrame, scratchCartesian3);
                    var eyeENUPositionProperty = this.eyeOriginEastNorthUp.position;
                    eyeENUPositionProperty.setValue(eyePosition, eyeRootFrame);
                    var localENUFrame = this.localOriginEastNorthUp.position.referenceFrame;
                    var localENUPosition = this.localOriginEastNorthUp.position.getValueInReferenceFrame(state.time, localENUFrame, scratchOriginCartesian3);
                    if (!localENUPosition || localENUFrame !== eyeRootFrame ||
                        cesium_imports_ts_1.Cartesian3.magnitudeSquared(cesium_imports_ts_1.Cartesian3.subtract(eyePosition, localENUPosition, scratchOriginCartesian3)) > 25000000) {
                        var localENUPositionProperty = this.localOriginEastNorthUp.position;
                        var localENUOrientationProperty = this.localOriginEastNorthUp.orientation;
                        localENUPositionProperty.setValue(eyePosition, eyeRootFrame);
                        var enuOrientation = utils_ts_1.getEntityOrientationInReferenceFrame(this.localOriginEastNorthUp, state.time, eyeRootFrame, scratchQuaternion);
                        localENUOrientationProperty.setValue(enuOrientation);
                        this.localOriginChangeEvent.raiseEvent(undefined);
                    }
                };
                Context.prototype._sendUpdateForSesion = function (parentState, session, entityPoseCache) {
                    var sessionEntities = {};
                    for (var id in parentState.entities) {
                        sessionEntities[id] = parentState.entities[id];
                    }
                    for (var id in this._sessionToSubscribedEntities.get(session)) {
                        if (!cesium_imports_ts_1.defined(entityPoseCache[id])) {
                            var entity = this.entities.getById(id);
                            entityPoseCache[id] = utils_ts_1.calculatePose(entity, parentState.time);
                        }
                        sessionEntities[id] = entityPoseCache[id];
                    }
                    var sessionState = {
                        time: parentState.time,
                        frameNumber: parentState.frameNumber,
                        reality: parentState.reality,
                        camera: parentState.camera,
                        size: parentState.size,
                        entities: sessionEntities
                    };
                    session.send('ar.context.update', sessionState);
                };
                /**
                 * Set the desired presentation mode.
                 */
                Context.prototype.setDesiredPresentationMode = function (presentationMode) {
                    this._desiredPresentationMode = presentationMode;
                    this.parentSession.send('ar.context.desiredPresentationMode', { presentationMode: presentationMode });
                };
                Object.defineProperty(Context.prototype, "desiredPresentationMode", {
                    get: function () {
                        return this._desiredPresentationMode;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Gets the presentation mode associated with a particular session.
                 *
                 * @param session - The session whose presentation mode is to be looked up.
                 * @returns The presentation mode associated with the session.
                 */
                Context.prototype.getDesiredPresentationModeForSession = function (session) {
                    return this._sessionToDesiredPresentationModeMap.get(session);
                };
                /**
                 * Set the desired reality.
                 */
                Context.prototype.setDesiredReality = function (reality) {
                    if (reality && !reality['id'])
                        reality['id'] = cesium_imports_ts_1.createGuid();
                    this._desiredReality = reality;
                    this.parentSession.send('ar.context.desiredReality', { reality: reality });
                };
                Object.defineProperty(Context.prototype, "desiredReality", {
                    get: function () {
                        return this._desiredReality;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Gets the reality that was requested by a particular session.
                 *
                 * @param session - The session whose requested reality is to be looked up.
                 * @returns The reality requested by the session, or undefined if no
                 * reality has been requested by the session.
                 */
                Context.prototype.getDesiredRealityForSession = function (session) {
                    return this._sessionToDesiredRealityMap.get(session);
                };
                Context.prototype._setReality = function (reality) {
                    var _this = this;
                    if (this.reality && reality && this.reality.id === reality.id)
                        return;
                    if (this.reality && !reality)
                        return;
                    if (!this.reality && !reality) {
                        reality = this.deviceService.defaultReality;
                        reality.id = 'default';
                    }
                    var realitySession = this.addSession();
                    realitySession.on['ar.context.update'] = function (state) {
                        state.reality = reality;
                        _this._update(state);
                    };
                    realitySession.on['ar.context.realityControlMessage'] = function (message) {
                        var owner = _this._desiredRealityToOwnerSessionMap.get(reality) || _this.parentSession;
                        owner.send('ar.context.realityControlMessage', message);
                    };
                    realitySession.openEvent.addEventListener(function () {
                        var previousRealitySession = _this._realitySession;
                        var previousReality = _this.reality;
                        _this._realitySession = realitySession;
                        _this._reality = reality;
                        console.log("Reality session set: " + JSON.stringify(reality));
                        if (previousRealitySession) {
                            previousRealitySession.close();
                        }
                        if (realitySession.info.role !== session_ts_1.Role.REALITY) {
                            realitySession.sendError({ message: "Expected a session with role === Role.Reality" });
                            realitySession.close();
                            return;
                        }
                        if (realitySession.info.enableRealityControlPort) {
                            var owner = _this._desiredRealityToOwnerSessionMap.get(reality) || _this.parentSession;
                            var channel = _this.messageChannelFactory.create();
                            realitySession.send('ar.context.realityControlSession');
                            owner.send('ar.context.realityControlSession');
                        }
                    });
                    realitySession.closeEvent.addEventListener(function () {
                        console.log("Reality session closed: " + JSON.stringify(reality));
                        _this._setReality(_this.onSelectReality());
                    });
                    var messageChannel = this.messageChannelFactory.create();
                    realitySession.open(messageChannel.port1, { role: this.role });
                    this.realityService.setup(reality, messageChannel.port2);
                };
                /**
                 * Indicates to this context that the given session wishes to be focused
                 * upon.
                 */
                Context.prototype.onSessionDesiresFocus = function (session) {
                    // noop
                };
                /**
                 * Determines the best reality for this context based on the realites
                 * requested by all attached sessions.
                 *
                 * @returns The reality chosen for this context. May be undefined if no
                 * realities have been requested.
                 */
                Context.prototype.onSelectReality = function () {
                    console.log("Selecting a reality...");
                    // TODO: sort and select based on some kind of ranking system
                    var selectedReality = this.getDesiredRealityForSession(this.focussedSession);
                    if (!selectedReality) {
                        for (var _i = 0, _a = this.sessions; _i < _a.length; _i++) {
                            var session = _a[_i];
                            var desiredReality = this.getDesiredRealityForSession(session);
                            if (desiredReality && this.realityService.isSupported(desiredReality.type)) {
                                selectedReality = desiredReality;
                                break;
                            }
                        }
                    }
                    console.log('Selected reality: ' + JSON.stringify(selectedReality));
                    return selectedReality;
                };
                /**
                 * Creates a new session that responds to the following messages:
                 *
                 *  * `ar.context.desiredReality` - Sets the reality the session wants
                 *    active.
                 *    * Parameters:
                 *      * reality: Reality - The reality the session wants. May be
                 *        undefined to indicate that no particular reality is desired.
                 *
                 *  * `ar.context.subscribe` - Subscribes the session to updates from an
                 *    entity in this context.
                 *    * Parameters:
                 *      * id: string - The id of an entity the session wishes to recieve
                 *        updates on.
                 *
                 *  * `ar.context.focus` - Indicates to this context that the session wants
                 *    to be focused on.
                 */
                Context.prototype.addSession = function () {
                    var _this = this;
                    var session = this.sessionFactory.create();
                    this._sessions.push(session);
                    session.on['ar.context.desiredReality'] = function (message, event) {
                        var reality = message.reality;
                        console.log("Session set desired reality: " + JSON.stringify(reality));
                        if (reality) {
                            _this._sessionToDesiredRealityMap.set(session, reality);
                            _this._desiredRealityToOwnerSessionMap.set(reality, session);
                            if (!_this.realityService.handlers.get(reality.type)) {
                                session.sendError({ message: reality.type + " reality is not suppored on this platform" });
                            }
                        }
                        else {
                            _this._sessionToDesiredRealityMap.delete(session);
                        }
                        _this._setReality(_this.onSelectReality());
                    };
                    session.on['ar.context.subscribe'] = function (_a) {
                        var id = _a.id;
                        var subscriptions = _this._sessionToSubscribedEntities.get(session) || [];
                        if (subscriptions.indexOf(id) === -1)
                            subscriptions.push(id);
                    };
                    session.on['ar.context.focus'] = function () {
                        _this.onSessionDesiresFocus(session);
                    };
                    session.focusEvent.addEventListener(function () {
                        var previousFocussedSession = _this._focussedSession;
                        if (previousFocussedSession !== session) {
                            if (previousFocussedSession)
                                previousFocussedSession.send('ar.context.blur');
                            session.send('ar.context.focus');
                            _this._focussedSession = session;
                            _this.sessionFocusEvent.raiseEvent(session);
                        }
                    });
                    session.closeEvent.addEventListener(function () {
                        var index = _this._sessions.indexOf(session);
                        if (index > -1) {
                            _this._sessions.splice(index);
                        }
                        if (_this._realitySession === session) {
                            _this._realitySession = null;
                        }
                    });
                    session.openEvent.addEventListener(function () {
                        _this.sessionConnectEvent.raiseEvent(session);
                    });
                    return session;
                };
                /**
                 * Adds an entity to this session's set of tracked entities.
                 *
                 * @param id - The unique identifier of an entity.
                 * @returns The entity that was subscribed to.
                 */
                Context.prototype.subscribeToEntityById = function (id) {
                    if (this.role !== session_ts_1.Role.MANAGER) {
                        this.parentSession.send('ar.context.subscribe', { id: id });
                    }
                    return this.entities.getOrCreateEntity(id);
                };
                /**
                 * Gets the state of an entity at the current context time relative to a reference frame.
                 *
                 * @param entity - The entity whose state is to be queried.
                 * @param referenceFrame - The relative reference frame. Defaults to `this.origin`.
                 * @returns If the position and orientation exist for the given entity, an
                 * object with the fields `position` and `orientation`, both of type
                 * `Cartesian3`. Otherwise undefined.
                 */
                Context.prototype.getCurrentEntityState = function (entity, referenceFrame) {
                    if (referenceFrame === void 0) { referenceFrame = this.origin; }
                    var time = this.frame && this.frame.time;
                    var key = entity.id + this._stringFromReferenceFrame(referenceFrame);
                    var entityState = this.entityStateMap.get(key);
                    if (entityState && cesium_imports_ts_1.JulianDate.equals(entityState.time, time))
                        return entityState;
                    if (!cesium_imports_ts_1.defined(entityState)) {
                        entityState = {
                            position: new cesium_imports_ts_1.Cartesian3,
                            orientation: new cesium_imports_ts_1.Quaternion,
                            time: cesium_imports_ts_1.JulianDate.clone(time),
                            poseStatus: PoseStatus.UNKNOWN
                        };
                        this.entityStateMap.set(key, entityState);
                    }
                    else {
                        cesium_imports_ts_1.JulianDate.clone(time, entityState.time);
                    }
                    var position = utils_ts_1.getEntityPositionInReferenceFrame(entity, time, referenceFrame, entityState.position);
                    var orientation = utils_ts_1.getEntityOrientationInReferenceFrame(entity, time, referenceFrame, entityState.orientation);
                    var hasPose = position && orientation;
                    var poseStatus = 0;
                    var previousStatus = entityState.poseStatus;
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
                    entityState.poseStatus = poseStatus;
                    return entityState;
                };
                Context.prototype._stringFromReferenceFrame = function (referenceFrame) {
                    var rf = referenceFrame;
                    return cesium_imports_ts_1.defined(rf.id) ? rf.id : '' + rf;
                };
                Object.defineProperty(Context.prototype, "origin", {
                    /**
                     * The origin to use when calling `getEntityState`. By default,
                     * this is `this.localOriginEastNorthUp`.
                     */
                    get: function () { return this._origin; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Context.prototype.setOrigin = function (origin) {
                    this._origin = origin;
                };
                Context = __decorate([
                    aurelia_dependency_injection_1.inject(reality_ts_1.RealityService, device_ts_1.DeviceService, session_ts_1.SessionFactory, session_ts_1.MessageChannelFactory, session_ts_1.Role, session_ts_1.ConnectService)
                ], Context);
                return Context;
            }());
            exports_1("Context", Context);
        }
    }
});

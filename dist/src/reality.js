System.register(['aurelia-dependency-injection', './cesium/cesium-imports', './common', './focus', './session', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, common_1, focus_1, session_1, utils_1;
    var RealityLoader, RealityService;
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
            function (focus_1_1) {
                focus_1 = focus_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            /**
             * Abstract class for a reality setup handler
             */
            RealityLoader = (function () {
                function RealityLoader() {
                }
                return RealityLoader;
            }());
            exports_1("RealityLoader", RealityLoader);
            /**
            * A service which manages the reality view
            */
            RealityService = (function () {
                function RealityService(sessionService, focusService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.focusService = focusService;
                    /**
                     * An event that is raised when a reality control port is opened.
                     */
                    this.connectEvent = new utils_1.Event();
                    /**
                     * An event that is raised when the current reality is changed.
                     */
                    this.changeEvent = new utils_1.Event();
                    /**
                     * An event that is raised when the current reality emits the next frame state.
                     * This event contains pose updates for the entities that are managed by
                     * the current reality.
                     */
                    this.frameEvent = new utils_1.Event();
                    /**
                     * Manager-only. A map from a managed session to the desired reality
                     */
                    this.desiredRealityMap = new WeakMap();
                    /**
                     * Manager-only. A map from a desired reality to the session which requested it
                     */
                    this.desiredRealityMapInverse = new WeakMap();
                    /**
                     * Manager-only. An event that is raised when a session changes it's desired reality.
                     */
                    this.sessionDesiredRealityChangeEvent = new utils_1.Event();
                    // The default reality
                    this._default = null;
                    // The current reality
                    this._current = null;
                    // The desired reality
                    this._desired = null;
                    // RealitySetupHandlers
                    this._loaders = [];
                    if (sessionService.isManager) {
                        sessionService.manager.connectEvent.addEventListener(function () {
                            setTimeout(function () {
                                if (!_this._desired)
                                    _this._setNextReality(_this.onSelectReality());
                            });
                        });
                    }
                    else if (sessionService.isRealityView) {
                        this.frameEvent.addEventListener(function (frameState) {
                            if (_this.sessionService.manager.isConnected) {
                                _this.sessionService.manager.send('ar.reality.frameState', frameState);
                            }
                        });
                    }
                    sessionService.connectEvent.addEventListener(function (session) {
                        if (session.info.role !== common_1.Role.REALITY_VIEW) {
                            session.on['ar.reality.desired'] = function (message, event) {
                                var reality = message.reality;
                                var previous = _this.desiredRealityMap.get(session);
                                console.log('Session set desired reality: ' + JSON.stringify(reality));
                                if (reality) {
                                    if (_this.isSupported(reality.type)) {
                                        _this.desiredRealityMap.set(session, reality);
                                        _this.desiredRealityMapInverse.set(reality, session);
                                    }
                                    else {
                                        session.sendError({ message: 'Reality of type "' + reality.type + '" is not available on this platform' });
                                        return;
                                    }
                                }
                                else {
                                    _this.desiredRealityMap.delete(session);
                                }
                                _this._setNextReality(_this.onSelectReality());
                                _this.sessionDesiredRealityChangeEvent.raiseEvent({ session: session, previous: previous, current: reality });
                            };
                        }
                    });
                    sessionService.manager.on['ar.reality.connect'] = function (_a) {
                        var id = _a.id;
                        var realityControlSession = _this.sessionService.createSessionPort();
                        var messageChannel = _this.sessionService.createSynchronousMessageChannel();
                        var ROUTE_MESSAGE_KEY = 'ar.reality.message.route.' + id;
                        var SEND_MESSAGE_KEY = 'ar.reality.message.send.' + id;
                        var CLOSE_SESSION_KEY = 'ar.reality.close.' + id;
                        messageChannel.port1.onmessage = function (msg) {
                            _this.sessionService.manager.send(ROUTE_MESSAGE_KEY, msg.data);
                        };
                        _this.sessionService.manager.on[SEND_MESSAGE_KEY] = function (message) {
                            messageChannel.port1.postMessage(message);
                        };
                        _this.sessionService.manager.on[CLOSE_SESSION_KEY] = function (message) {
                            realityControlSession.close();
                        };
                        realityControlSession.connectEvent.addEventListener(function () {
                            _this.connectEvent.raiseEvent(realityControlSession);
                        });
                        _this.sessionService.manager.closeEvent.addEventListener(function () {
                            realityControlSession.close();
                            delete _this.sessionService.manager.on[SEND_MESSAGE_KEY];
                            delete _this.sessionService.manager.on[CLOSE_SESSION_KEY];
                        });
                        realityControlSession.open(messageChannel.port2, _this.sessionService.configuration);
                    };
                }
                /**
                 * Manager-only. Register a reality loader
                 */
                RealityService.prototype.registerLoader = function (handler) {
                    this.sessionService.ensureIsManager();
                    this._loaders.push(handler);
                };
                /**
                 * Get the current reality view
                 */
                RealityService.prototype.getCurrent = function () {
                    return this._current;
                };
                /**
                * Manager-only. Check if a type of reality is supported.
                * @param type reality type
                * @return true if a handler exists and false otherwise
                */
                RealityService.prototype.isSupported = function (type) {
                    this.sessionService.ensureIsManager();
                    return !!this._getLoader(type);
                };
                /**
                 * Set the desired reality.
                 */
                RealityService.prototype.setDesired = function (reality) {
                    this.sessionService.ensureNotReality();
                    this._desired = reality;
                    if (this.sessionService.isManager) {
                        this._setNextReality(reality);
                    }
                    else {
                        this.sessionService.manager.send('ar.reality.desired', { reality: reality });
                    }
                };
                /**
                 * Get the desired reality
                 */
                RealityService.prototype.getDesired = function () {
                    return this._desired;
                };
                /**
                 * Set the optional reference frames for this app
                 */
                RealityService.prototype.setOptionalReferenceFrames = function (referenceFrames) {
                };
                /**
                 * Set the optional reference frames for this app
                 */
                RealityService.prototype.setRequiredReferenceFrames = function (referenceFrames) {
                };
                /**
                 * Set the default reality. Manager-only.
                 */
                RealityService.prototype.setDefault = function (reality) {
                    this.sessionService.ensureIsManager();
                    this._default = reality;
                };
                /**
                * Manager-only. Selects the best reality based on the realites
                * requested by all managed sessions. Can be overriden for customized selection.
                *
                * @returns The reality chosen for this context. May be undefined if no
                * realities have been requested.
                */
                RealityService.prototype.onSelectReality = function () {
                    this.sessionService.ensureIsManager();
                    var selectedReality = this.desiredRealityMap.get(this.sessionService.manager);
                    if (!selectedReality) {
                        var focusSession = this.focusService.getSession();
                        if (focusSession && focusSession.isConnected) {
                            selectedReality = this.desiredRealityMap.get(focusSession);
                        }
                    }
                    if (!selectedReality) {
                        // TODO: sort and select based on some kind of ranking system
                        for (var _i = 0, _a = this.sessionService.managedSessions; _i < _a.length; _i++) {
                            var session = _a[_i];
                            if (!session.isConnected)
                                continue;
                            var desiredReality = this.desiredRealityMap.get(session);
                            if (desiredReality && this.isSupported(desiredReality.type)) {
                                selectedReality = desiredReality;
                                break;
                            }
                        }
                    }
                    return selectedReality;
                };
                RealityService.prototype._setNextReality = function (reality) {
                    var _this = this;
                    if (this._current && reality && this._current === reality)
                        return;
                    if (this._current && !reality && this._realitySession)
                        return;
                    if (!this._current && !reality) {
                        reality = this._default;
                        if (!reality)
                            return;
                    }
                    if (!this.isSupported(reality.type)) {
                        this.sessionService.errorEvent.raiseEvent(new Error('Reality of type "' + reality.type + '" is not available on this platform'));
                        return;
                    }
                    this._executeRealityLoader(reality, function (realitySession) {
                        if (realitySession.isConnected)
                            throw new Error('Expected an unconnected session');
                        realitySession.on['ar.reality.frameState'] = function (state) {
                            _this.frameEvent.raiseEvent(state);
                        };
                        realitySession.closeEvent.addEventListener(function () {
                            console.log('Reality session closed: ' + JSON.stringify(reality));
                            if (_this._current == reality) {
                                _this._current = null;
                                _this._setNextReality(_this.onSelectReality());
                            }
                        });
                        realitySession.connectEvent.addEventListener(function () {
                            if (realitySession.info.role !== common_1.Role.REALITY_VIEW) {
                                realitySession.sendError({ message: "Expected a reality session" });
                                realitySession.close();
                                throw new Error('The application "' + realitySession.info.name + '" does not support being loaded as a reality');
                            }
                            var previousRealitySession = _this._realitySession;
                            var previousReality = _this._current;
                            _this._realitySession = realitySession;
                            _this._setCurrent(reality);
                            if (previousRealitySession) {
                                previousRealitySession.close();
                            }
                            if (realitySession.info['reality.supportsControlPort']) {
                                var ownerSession_1 = _this.desiredRealityMapInverse.get(reality) || _this.sessionService.manager;
                                var id = cesium_imports_1.createGuid();
                                var ROUTE_MESSAGE_KEY = 'ar.reality.message.route.' + id;
                                var SEND_MESSAGE_KEY_1 = 'ar.reality.message.send.' + id;
                                var CLOSE_SESSION_KEY_1 = 'ar.reality.close.' + id;
                                realitySession.on[ROUTE_MESSAGE_KEY] = function (message) {
                                    ownerSession_1.send(SEND_MESSAGE_KEY_1, message);
                                };
                                ownerSession_1.on[ROUTE_MESSAGE_KEY] = function (message) {
                                    realitySession.send(SEND_MESSAGE_KEY_1, message);
                                };
                                realitySession.send('ar.reality.connect', { id: id });
                                ownerSession_1.send('ar.reality.connect', { id: id });
                                realitySession.closeEvent.addEventListener(function () {
                                    ownerSession_1.send(CLOSE_SESSION_KEY_1);
                                });
                                ownerSession_1.closeEvent.addEventListener(function () {
                                    realitySession.send(CLOSE_SESSION_KEY_1);
                                    realitySession.close();
                                });
                            }
                        });
                    });
                };
                RealityService.prototype._getLoader = function (type) {
                    var found = undefined;
                    for (var _i = 0, _a = this._loaders; _i < _a.length; _i++) {
                        var loader = _a[_i];
                        if (loader.type === type) {
                            found = loader;
                            break;
                        }
                    }
                    return found;
                };
                RealityService.prototype._setCurrent = function (reality) {
                    if (!this._current || this._current !== reality) {
                        var previous = this._current;
                        this._current = reality;
                        this.changeEvent.raiseEvent({ previous: previous, current: reality });
                        console.log('Reality changed to: ' + JSON.stringify(reality));
                    }
                };
                RealityService.prototype._executeRealityLoader = function (reality, callback) {
                    this.sessionService.ensureIsManager();
                    var loader = this._getLoader(reality.type);
                    if (!loader)
                        throw new Error('Unable to setup unsupported reality type: ' + reality.type);
                    loader.load(reality, callback);
                };
                RealityService = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, focus_1.FocusService)
                ], RealityService);
                return RealityService;
            }());
            exports_1("RealityService", RealityService);
        }
    }
});

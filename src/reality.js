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
            * A service which manages the reality view.
            * For an app developer, the RealityService instance can be used to
            * set preferences which can affect how the manager selects a reality view.
            */
            RealityService = (function () {
                function RealityService(sessionService, focusService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.focusService = focusService;
                    /**
                     * A collection of known reality views from which the reality service can select.
                     */
                    this.realities = new Array();
                    /**
                     * An event that is raised when a reality control port is opened.
                     */
                    this.connectEvent = new utils_1.Event();
                    /**
                     * Manager-only. An event that is raised when the current reality is changed.
                     */
                    this._changeEvent = new utils_1.Event();
                    /**
                     * Manager/Viewer-only. An event that is raised when the current reality emits the next view state.
                     */
                    this._viewStateEvent = new utils_1.Event();
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
                    // RealitySetupHandlers
                    this._loaders = [];
                    this._loadID = -1;
                    if (sessionService.isRealityManager) {
                        sessionService.manager.connectEvent.addEventListener(function () {
                            setTimeout(function () {
                                if (_this._loadID === -1)
                                    _this._setNextReality(_this.onSelectReality());
                            });
                        });
                    }
                    sessionService.connectEvent.addEventListener(function (session) {
                        if (!common_1.Role.isRealityViewer(session.info.role)) {
                            session.on['ar.reality.desired'] = function (message) {
                                var reality = message.reality;
                                var previous = _this.desiredRealityMap.get(session);
                                console.log('Session set desired reality: ' + JSON.stringify(reality));
                                if (reality) {
                                    if (reality['type']) {
                                        var type = reality['type'];
                                        reality.uri = reality.uri || 'reality:' + type;
                                        if (type === 'hosted')
                                            reality.uri = reality['url'];
                                        if (!reality.title && reality['name'])
                                            reality.title = reality['name'];
                                    }
                                    if (_this.isSupported(reality)) {
                                        _this.desiredRealityMap.set(session, reality);
                                        _this.desiredRealityMapInverse.set(reality, session);
                                    }
                                    else {
                                        session.sendError({ message: 'Reality of type "' + reality.uri + '" is not available on this platform' });
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
                        _this.sessionService.manager.on[CLOSE_SESSION_KEY] = function () {
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
                Object.defineProperty(RealityService.prototype, "changeEvent", {
                    get: function () {
                        this.sessionService.ensureIsRealityManager();
                        return this._changeEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RealityService.prototype, "viewStateEvent", {
                    get: function () {
                        this.sessionService.ensureNotRealityAugmenter();
                        return this._viewStateEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RealityService.prototype, "session", {
                    get: function () {
                        return this._session;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Set the default reality.
                 */
                RealityService.prototype.setDefault = function (reality) {
                    this._default = reality;
                };
                /**
                 * Manager-only. Register a reality loader
                 */
                RealityService.prototype.registerLoader = function (handler) {
                    this.sessionService.ensureIsRealityManager();
                    this._loaders.push(handler);
                };
                /**
                 * Manager-only. Get the current reality view.
                 * @deprecated. Use app.context.getCurrentReality()
                 */
                RealityService.prototype.getCurrent = function () {
                    this.sessionService.ensureNotRealityAugmenter();
                    return this._current;
                };
                /**
                * Manager-only. Check if a type of reality is supported.
                * @param type reality type
                * @return true if a handler exists and false otherwise
                */
                RealityService.prototype.isSupported = function (reality) {
                    this.sessionService.ensureIsRealityManager();
                    return !!this._getLoader(reality);
                };
                /**
                 * Deprecated. Use pubishViewState.
                 * @deprecated
                 */
                RealityService.prototype.publishFrame = function (state) {
                    console.warn('publishFrame is deprecated. Use publishViewState()');
                    this.sessionService.ensureIsRealityViewer();
                    if (this.sessionService.manager.isConnected) {
                        this.sessionService.manager.send('ar.reality.frameState', state);
                    }
                };
                /**
                 * RealityViewer-only. Publish the next view state.
                 */
                RealityService.prototype.publishViewState = function (view) {
                    this.sessionService.ensureIsRealityViewer();
                    if (this.sessionService.manager.isConnected) {
                        this.sessionService.manager.send('ar.reality.viewState', view);
                        this.viewStateEvent.raiseEvent(view);
                    }
                };
                /**
                 * Set the desired reality.
                 */
                RealityService.prototype.setDesired = function (reality) {
                    this.sessionService.ensureNotRealityViewer();
                    this._desired = reality;
                    if (this.sessionService.isRealityManager) {
                        this._setNextReality(reality, true);
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
                * Manager-only. Selects the best reality based on the realites
                * requested by all managed sessions. Can be overriden for customized selection.
                *
                * @returns The reality chosen for this context. May be undefined if no
                * realities have been requested.
                */
                RealityService.prototype.onSelectReality = function () {
                    this.sessionService.ensureIsRealityManager();
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
                            if (desiredReality && this.isSupported(desiredReality)) {
                                selectedReality = desiredReality;
                                break;
                            }
                        }
                    }
                    return selectedReality;
                };
                RealityService.prototype._setNextReality = function (reality, force) {
                    var _this = this;
                    if (force === void 0) { force = false; }
                    if (this._current && reality && this._current === reality && !force)
                        return;
                    if (this._current && !reality && this._session)
                        return;
                    if (!this._current && !cesium_imports_1.defined(reality)) {
                        reality = this._default;
                    }
                    if (cesium_imports_1.defined(reality)) {
                        if (!this.isSupported(reality)) {
                            this.sessionService.errorEvent.raiseEvent(new Error('Reality of type "' + reality.uri + '" is not available on this platform'));
                            return;
                        }
                        var loadID_1 = ++this._loadID;
                        this._executeRealityLoader(reality, function (realitySession) {
                            if (realitySession.isConnected)
                                throw new Error('Expected an unconnected session');
                            if (loadID_1 !== _this._loadID) {
                                realitySession.close();
                                return;
                            }
                            var previousRealitySession = _this._session;
                            _this._session = realitySession;
                            _this._setCurrent(reality);
                            realitySession.on['ar.reality.viewState'] = function (viewState) {
                                _this.viewStateEvent.raiseEvent(viewState);
                            };
                            // Deprecated. Remove after v1.2
                            realitySession.on['ar.reality.frameState'] = function (serializedState) {
                            };
                            realitySession.closeEvent.addEventListener(function () {
                                console.log('Reality session closed: ' + JSON.stringify(reality));
                                // select a new reality if the current reality has closed without 
                                // another reality having been requested
                                if (_this._loadID === loadID_1) {
                                    _this._session = undefined;
                                    _this._current = undefined;
                                    _this._setNextReality(_this.onSelectReality());
                                }
                            });
                            realitySession.connectEvent.addEventListener(function () {
                                if (!common_1.Role.isRealityViewer(realitySession.info.role)) {
                                    realitySession.sendError({ message: "Expected a reality viewer" });
                                    realitySession.close();
                                    throw new Error('The application "' + realitySession.uri + '" does not support being loaded as a reality viewer');
                                }
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
                    }
                };
                RealityService.prototype._getLoader = function (reality) {
                    var found;
                    for (var _i = 0, _a = this._loaders; _i < _a.length; _i++) {
                        var loader = _a[_i];
                        if (loader.type === common_1.RealityViewer.getType(reality)) {
                            found = loader;
                            break;
                        }
                    }
                    return found;
                };
                RealityService.prototype._setCurrent = function (reality) {
                    if (this._current === undefined || this._current !== reality) {
                        var previous = this._current;
                        this._current = reality;
                        this.changeEvent.raiseEvent({ previous: previous, current: reality });
                        console.log('Reality changed to: ' + JSON.stringify(reality));
                    }
                };
                RealityService.prototype._executeRealityLoader = function (reality, callback) {
                    this.sessionService.ensureIsRealityManager();
                    var loader = this._getLoader(reality);
                    if (!loader)
                        throw new Error('Unable to setup unsupported reality type: ' + reality.uri);
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

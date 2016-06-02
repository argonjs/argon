System.register(['aurelia-dependency-injection', './cesium/cesium-imports', './timer', './common', './focus', './session', './device', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, timer_1, common_1, focus_1, session_1, device_1, utils_1;
    var RealityLoader, RealityService, EmptyRealityLoader;
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (cesium_imports_1_1) {
                cesium_imports_1 = cesium_imports_1_1;
            },
            function (timer_1_1) {
                timer_1 = timer_1_1;
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
            function (device_1_1) {
                device_1 = device_1_1;
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
                            _this.sessionService.manager.send('ar.reality.frameState', frameState);
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
                        var messageChannel = _this.sessionService.createMessageChannel();
                        var MESSAGE_KEY = 'ar.reality.message.' + id;
                        messageChannel.port1.onmessage = function (msg) {
                            _this.sessionService.manager.send(MESSAGE_KEY, msg);
                        };
                        _this.sessionService.manager.on[MESSAGE_KEY] = function (message) {
                            messageChannel.port1.postMessage(message);
                        };
                        realityControlSession.connectEvent.addEventListener(function () {
                            _this.connectEvent.raiseEvent(realityControlSession);
                        });
                        _this.sessionService.manager.closeEvent.addEventListener(function () {
                            realityControlSession.close();
                            delete _this.sessionService.manager.on[MESSAGE_KEY];
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
                    this.sessionService.manager.send('ar.reality.desired', { reality: reality });
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
                        selectedReality = this.desiredRealityMap.get(this.focusService.getSession());
                    }
                    if (!selectedReality) {
                        // TODO: sort and select based on some kind of ranking system
                        for (var _i = 0, _a = this.sessionService.managedSessions; _i < _a.length; _i++) {
                            var session = _a[_i];
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
                    console.log('Setting reality: ' + JSON.stringify(reality));
                    if (this._current && reality && this._current === reality)
                        return;
                    if (this._current && !reality)
                        return;
                    if (!this._current && !reality) {
                        reality = this._default;
                        if (!reality)
                            return;
                    }
                    var realitySessionPromise = Promise.resolve(this._executeRealityLoader(reality));
                    this._realitySessionPromise = realitySessionPromise;
                    this._realitySessionPromise.then(function (realitySession) {
                        if (_this._realitySessionPromise !== realitySessionPromise)
                            return;
                        if (!realitySession.isConnected())
                            throw new Error('Expected a connected session');
                        if (realitySession.info.role !== common_1.Role.REALITY_VIEW) {
                            realitySession.sendError({ message: "Expected a reality session" });
                            realitySession.close();
                            throw new Error('The application "' + realitySession.info.name + '" cannot be loaded as a reality');
                        }
                        var previousRealitySession = _this._realitySession;
                        var previousReality = _this._current;
                        _this._realitySession = realitySession;
                        _this._setCurrent(reality);
                        if (previousRealitySession) {
                            previousRealitySession.close();
                        }
                        realitySession.on['ar.reality.frameState'] = function (state) {
                            _this.frameEvent.raiseEvent(state);
                        };
                        if (realitySession.info.realityViewSupportsControlPort) {
                            var ownerSession_1 = _this.desiredRealityMapInverse.get(reality) || _this.sessionService.manager;
                            var id = cesium_imports_1.createGuid();
                            var MESSAGE_KEY_1 = 'ar.reality.message.' + id;
                            realitySession.on[MESSAGE_KEY_1] = function (message) {
                                ownerSession_1.send(MESSAGE_KEY_1, message);
                            };
                            ownerSession_1.on[MESSAGE_KEY_1] = function (message) {
                                realitySession.send(MESSAGE_KEY_1, message);
                            };
                            realitySession.send('ar.reality.connect', { id: id });
                            ownerSession_1.send('ar.reality.connect', { id: id });
                            realitySession.closeEvent.addEventListener(function () {
                                delete ownerSession_1.on[MESSAGE_KEY_1];
                                console.log('Reality session closed: ' + JSON.stringify(reality));
                                _this._setNextReality(_this.onSelectReality());
                            });
                        }
                    }).catch(function (error) {
                        _this.sessionService.errorEvent.raiseEvent(error);
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
                RealityService.prototype._executeRealityLoader = function (reality) {
                    this.sessionService.ensureIsManager();
                    var loader = this._getLoader(reality.type);
                    if (!loader)
                        throw new Error('Unable to setup unsupported reality type: ' + reality.type);
                    return loader.load(reality);
                };
                RealityService = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, focus_1.FocusService)
                ], RealityService);
                return RealityService;
            }());
            exports_1("RealityService", RealityService);
            EmptyRealityLoader = (function () {
                function EmptyRealityLoader(sessionService, deviceService, timer) {
                    this.sessionService = sessionService;
                    this.deviceService = deviceService;
                    this.timer = timer;
                    this.type = 'empty';
                }
                EmptyRealityLoader.prototype.load = function (reality) {
                    var _this = this;
                    var realitySession = this.sessionService.addManagedSessionPort();
                    var remoteRealitySession = this.sessionService.createSessionPort();
                    var doUpdate = true;
                    remoteRealitySession.connectEvent.addEventListener(function () {
                        var update = function (time, index) {
                            if (doUpdate) {
                                _this.deviceService.update();
                                var w = document.documentElement.clientWidth;
                                var h = document.documentElement.clientHeight;
                                var frameState = {
                                    time: time,
                                    index: index,
                                    view: {
                                        viewport: {
                                            x: 0,
                                            y: 0,
                                            width: w,
                                            height: h
                                        },
                                        pose: utils_1.getSerializedEntityPose(_this.deviceService.interfaceEntity, time),
                                        subviews: [
                                            {
                                                type: common_1.SubviewType.SINGULAR,
                                                projectionMatrix: cesium_imports_1.Matrix4.computePerspectiveFieldOfView(Math.PI / 3, w / h, 0.2, 10000000000, [])
                                            }
                                        ]
                                    }
                                };
                                remoteRealitySession.send('ar.reality.frameState', frameState);
                                _this.timer.requestFrame(update);
                            }
                        };
                        _this.timer.requestFrame(update);
                    });
                    remoteRealitySession.closeEvent.addEventListener(function () {
                        doUpdate = false;
                    });
                    var messageChannel = this.sessionService.createSynchronousMessageChannel();
                    realitySession.open(messageChannel.port1, this.sessionService.configuration);
                    remoteRealitySession.open(messageChannel.port2, { role: common_1.Role.REALITY_VIEW, name: 'empty' });
                    return realitySession;
                };
                EmptyRealityLoader = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, device_1.DeviceService, timer_1.TimerService)
                ], EmptyRealityLoader);
                return EmptyRealityLoader;
            }());
            exports_1("EmptyRealityLoader", EmptyRealityLoader);
        }
    }
});

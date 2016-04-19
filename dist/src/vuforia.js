System.register(['aurelia-dependency-injection', './config', './focus', './reality', './session', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, config_1, focus_1, reality_1, session_1, utils_1;
    var VuforiaInitResult, VuforiaServiceDelegateBase, VuforiaServiceDelegate, VuforiaRealitySetupHandler, VuforiaService, VuforiaAPI, VuforiaTracker, VuforiaObjectTracker, VuforiaDataSet;
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (focus_1_1) {
                focus_1 = focus_1_1;
            },
            function (reality_1_1) {
                reality_1 = reality_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            /**
             * The set of possible error codes that can be returned from vuforia's
             * initialization function.
             */
            (function (VuforiaInitResult) {
                VuforiaInitResult[VuforiaInitResult["SUCCESS"] = 100] = "SUCCESS";
                /** Error during initialization. */
                VuforiaInitResult[VuforiaInitResult["INIT_ERROR"] = -1] = "INIT_ERROR";
                /** The device is not supported. */
                VuforiaInitResult[VuforiaInitResult["INIT_DEVICE_NOT_SUPPORTED"] = -2] = "INIT_DEVICE_NOT_SUPPORTED";
                /** Cannot access the camera. */
                VuforiaInitResult[VuforiaInitResult["INIT_NO_CAMERA_ACCESS"] = -3] = "INIT_NO_CAMERA_ACCESS";
                /** License key is missing. */
                VuforiaInitResult[VuforiaInitResult["INIT_LICENSE_ERROR_MISSING_KEY"] = -4] = "INIT_LICENSE_ERROR_MISSING_KEY";
                /** Invalid license key passed to SDK. */
                VuforiaInitResult[VuforiaInitResult["INIT_LICENSE_ERROR_INVALID_KEY"] = -5] = "INIT_LICENSE_ERROR_INVALID_KEY";
                /** Unable to verify license key due to network (Permanent error). */
                VuforiaInitResult[VuforiaInitResult["INIT_LICENSE_ERROR_NO_NETWORK_PERMANENT"] = -6] = "INIT_LICENSE_ERROR_NO_NETWORK_PERMANENT";
                /** Unable to verify license key due to network (Transient error). */
                VuforiaInitResult[VuforiaInitResult["INIT_LICENSE_ERROR_NO_NETWORK_TRANSIENT"] = -7] = "INIT_LICENSE_ERROR_NO_NETWORK_TRANSIENT";
                /** Provided key is no longer valid. */
                VuforiaInitResult[VuforiaInitResult["INIT_LICENSE_ERROR_CANCELED_KEY"] = -8] = "INIT_LICENSE_ERROR_CANCELED_KEY";
                /** Provided key is not valid for this product. */
                VuforiaInitResult[VuforiaInitResult["INIT_LICENSE_ERROR_PRODUCT_TYPE_MISMATCH"] = -9] = "INIT_LICENSE_ERROR_PRODUCT_TYPE_MISMATCH";
                /** Dependent external device not detected/plugged in. */
                VuforiaInitResult[VuforiaInitResult["INIT_EXTERNAL_DEVICE_NOT_DETECTED"] = -10] = "INIT_EXTERNAL_DEVICE_NOT_DETECTED";
            })(VuforiaInitResult || (VuforiaInitResult = {}));
            exports_1("VuforiaInitResult", VuforiaInitResult);
            /**
             * An abstract class representing the Vuforia API.
             */
            VuforiaServiceDelegateBase = (function () {
                function VuforiaServiceDelegateBase() {
                }
                return VuforiaServiceDelegateBase;
            }());
            exports_1("VuforiaServiceDelegateBase", VuforiaServiceDelegateBase);
            /**
             * An no-op implementation of VuforiaServiceDelegate.
             */
            VuforiaServiceDelegate = (function (_super) {
                __extends(VuforiaServiceDelegate, _super);
                function VuforiaServiceDelegate() {
                    _super.apply(this, arguments);
                    this.stateUpdateEvent = new utils_1.Event();
                }
                VuforiaServiceDelegate.prototype.isAvailable = function () { return false; };
                VuforiaServiceDelegate.prototype.setHint = function (hint, value) { return true; };
                VuforiaServiceDelegate.prototype.init = function (options) { return null; };
                VuforiaServiceDelegate.prototype.deinit = function () { };
                VuforiaServiceDelegate.prototype.cameraDeviceInitAndStart = function () { return true; };
                VuforiaServiceDelegate.prototype.cameraDeviceInit = function () { return true; };
                // cameraDeviceDeinit() : boolean { return true }
                VuforiaServiceDelegate.prototype.cameraDeviceSetFlashTorchMode = function (on) { return true; };
                VuforiaServiceDelegate.prototype.objectTrackerInit = function () { return true; };
                // objectTrackerDeinit() : boolean { return true }
                VuforiaServiceDelegate.prototype.objectTrackerStart = function () { return true; };
                VuforiaServiceDelegate.prototype.objectTrackerStop = function () { return true; };
                VuforiaServiceDelegate.prototype.objectTrackerCreateDataSet = function (url) { return null; };
                VuforiaServiceDelegate.prototype.objectTrackerDestroyDataSet = function (id) { return true; };
                VuforiaServiceDelegate.prototype.objectTrackerActivateDataSet = function (id) { return true; };
                VuforiaServiceDelegate.prototype.objectTrackerDeactivateDataSet = function (id) { return true; };
                VuforiaServiceDelegate.prototype.dataSetFetch = function (id) { return null; };
                VuforiaServiceDelegate.prototype.dataSetLoad = function (id) { return null; };
                return VuforiaServiceDelegate;
            }(VuforiaServiceDelegateBase));
            exports_1("VuforiaServiceDelegate", VuforiaServiceDelegate);
            VuforiaRealitySetupHandler = (function () {
                function VuforiaRealitySetupHandler(sessionService, delegate) {
                    this.sessionService = sessionService;
                    this.delegate = delegate;
                    this.type = 'vuforia';
                }
                VuforiaRealitySetupHandler.prototype.setup = function (reality, port) {
                    var remoteRealitySession = this.sessionService.createSessionPort();
                    var remove = this.delegate.stateUpdateEvent.addEventListener(function (frameState) {
                        remoteRealitySession.send('ar.reality.frameState', frameState);
                    });
                    remoteRealitySession.closeEvent.addEventListener(function () {
                        remove();
                    });
                    remoteRealitySession.open(port, { role: config_1.Role.REALITY_VIEW });
                };
                VuforiaRealitySetupHandler = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, VuforiaServiceDelegate)
                ], VuforiaRealitySetupHandler);
                return VuforiaRealitySetupHandler;
            }());
            exports_1("VuforiaRealitySetupHandler", VuforiaRealitySetupHandler);
            /**
             * Mediates requests to the Vuforia API. Handles the following requests:
             * // TODO
             */
            VuforiaService = (function () {
                function VuforiaService(sessionService, focusService, realityService, delegate) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.focusService = focusService;
                    this.realityService = realityService;
                    this.delegate = delegate;
                    this._controllingSession = null;
                    this._sessionIsInitialized = new WeakMap();
                    this._sessionCommandQueue = new WeakMap();
                    this._sessionInitOptions = new WeakMap();
                    this._sessionObjectTrackerStarted = new WeakMap();
                    this._sessionCreatedDataSets = new WeakMap();
                    this._sessionActivatedDataSets = new WeakMap();
                    this._isInitialized = false;
                    if (sessionService.isManager()) {
                        sessionService.connectEvent.addEventListener(function (session) {
                            var commandQueue = new utils_1.CommandQueue();
                            commandQueue.errorEvent.addEventListener(function (err) {
                                _this.sessionService.errorEvent.raiseEvent(err);
                                session.sendError(err);
                            });
                            _this._sessionCommandQueue.set(session, commandQueue);
                            var createdDataSets = new Set();
                            _this._sessionCreatedDataSets.set(session, createdDataSets);
                            var activatedDataSets = new Set();
                            _this._sessionActivatedDataSets.set(session, activatedDataSets);
                            session.on['ar.vuforia.isAvailable'] = function () {
                                return Promise.resolve({ available: delegate.isAvailable() });
                            };
                            session.on['ar.vuforia.init'] = function (options, event) {
                                if (!delegate.isAvailable())
                                    return Promise.reject("Vuforia is not supported");
                                _this._sessionInitOptions.set(session, options);
                                var result = commandQueue.push(function () {
                                    return _this._init(session);
                                }, _this._controllingSession === session);
                                if (_this.focusService.getSession() === session) {
                                    _this._setControllingSession(session);
                                }
                                return result;
                            };
                            session.on['ar.vuforia.objectTrackerCreateDataSet'] = function (_a, event) {
                                var url = _a.url;
                                return commandQueue.push(function () {
                                    var id = delegate.objectTrackerCreateDataSet(url);
                                    if (id) {
                                        createdDataSets.add(id);
                                        return Promise.resolve(id);
                                    }
                                    return Promise.reject('Unable to create DataSet');
                                }, _this._controllingSession === session);
                            };
                            session.on['ar.vuforia.objectTrackerActivateDataSet'] = function (_a, event) {
                                var id = _a.id;
                                return commandQueue.push(function () {
                                    if (delegate.objectTrackerActivateDataSet(id)) {
                                        activatedDataSets.add(id);
                                        session.send('ar.vuforia.objectTrackerActivateDataSetEvent', { id: id });
                                        return;
                                    }
                                    return Promise.reject("Unable to activate DataSet (#{id})");
                                }, _this._controllingSession === session);
                            };
                            session.on['ar.vuforia.objectTrackerDeactivateDataSet'] = function (_a, event) {
                                var id = _a.id;
                                return commandQueue.push(function () {
                                    if (delegate.objectTrackerDeactivateDataSet(id)) {
                                        activatedDataSets.delete(id);
                                        session.send('ar.vuforia.objectTrackerDeactivateDataSetEvent', { id: id });
                                        return;
                                    }
                                    return Promise.reject("Unable to deactivate DataSet (#{id})");
                                }, _this._controllingSession === session);
                            };
                            session.on['ar.vuforia.dataSetFetch'] = function (_a, event) {
                                var id = _a.id;
                                return commandQueue.push(function () {
                                    return delegate.dataSetFetch(id);
                                }, _this._controllingSession === session);
                            };
                            session.on['ar.vuforia.dataSetLoad'] = function (_a, event) {
                                var id = _a.id;
                                return commandQueue.push(function () {
                                    return delegate.dataSetLoad(id);
                                }, _this._controllingSession === session);
                            };
                            session.closeEvent.addEventListener(function () {
                                if (_this._controllingSession === session) {
                                    commandQueue.clear();
                                    commandQueue.push(function () {
                                        _this._cleanupSession(session);
                                        setTimeout(function () {
                                            _this._ensureControllingSession();
                                        }, 2000);
                                    }, true);
                                    _this._controllingSession = null;
                                }
                                else {
                                    _this._cleanupSession(session);
                                }
                            });
                        });
                        focusService.sessionFocusEvent.addEventListener(function (_a) {
                            var current = _a.current;
                            if (_this._sessionInitOptions.get(current)) {
                                _this._setControllingSession(current);
                            }
                        });
                    }
                }
                ;
                VuforiaService.prototype.isAvailable = function () {
                    return this.sessionService.manager.request('ar.vuforia.isAvailable').then(function (message) {
                        return message.available;
                    });
                };
                VuforiaService.prototype.init = function (options) {
                    var _this = this;
                    return this.sessionService.manager.request('ar.vuforia.init', options).then(function () {
                        return new VuforiaAPI(_this.sessionService.manager);
                    });
                };
                VuforiaService.prototype._ensureControllingSession = function () {
                    if (this._controllingSession === null) {
                        this._selectControllingSession();
                    }
                };
                VuforiaService.prototype._selectControllingSession = function () {
                    var focusSession = this.focusService.getSession();
                    if (this._sessionInitOptions.get(focusSession)) {
                        this._setControllingSession(focusSession);
                        return;
                    }
                    for (var _i = 0, _a = this.sessionService.managedSessions; _i < _a.length; _i++) {
                        var session = _a[_i];
                        if (this._sessionInitOptions.get(session)) {
                            this._setControllingSession(session);
                            return;
                        }
                    }
                    this._setControllingSession(this.sessionService.manager);
                };
                VuforiaService.prototype._setControllingSession = function (session) {
                    var _this = this;
                    var currentSession = this._controllingSession;
                    if (currentSession) {
                        var commandQueue = this._sessionCommandQueue.get(currentSession);
                        commandQueue.push(function () {
                            return _this._pauseSession(currentSession);
                        }, true).then(function () {
                            _this._resumeSession(session);
                        });
                    }
                    else {
                        this._resumeSession(session);
                    }
                };
                VuforiaService.prototype._resumeSession = function (session) {
                    if (this._controllingSession)
                        throw new Error('VuforiaService: Attempted to resume a session while a session is still in control');
                    this._controllingSession = session;
                    var initOptions = this._sessionInitOptions.get(session);
                    if (!initOptions) {
                        throw new Error('VuforiaService: Attempted to resume a session without initialization options');
                    }
                    var isInitialized = this._sessionIsInitialized.get(session);
                    var commandQueue = this._sessionCommandQueue.get(session);
                    if (isInitialized) {
                        this._init(session).then(function () {
                            commandQueue.execute();
                        }).catch(function (err) {
                            session.sendError(err);
                        });
                    }
                    else {
                        commandQueue.execute(); // this should call _init
                    }
                };
                VuforiaService.prototype._pauseSession = function (session) {
                    var _this = this;
                    if (this._controllingSession !== session)
                        throw Error('VuforiaService: Attempted to pause a session which is not in control');
                    this._controllingSession = null;
                    var commandQueue = this._sessionCommandQueue.get(session);
                    return commandQueue.push(function () {
                        return _this._deinit(session);
                    }, true);
                };
                VuforiaService.prototype._cleanupSession = function (session) {
                    // If session is in control, deactivate active datasets / trackables, and destroy them
                    // If session is not in control, destroy its datasets / trackables
                    var _this = this;
                    if (this._controllingSession === session) {
                        var commandQueue = this._sessionCommandQueue.get(session);
                        commandQueue.push(function () {
                            return new Promise(function (resolve) {
                                var remove = _this.delegate.stateUpdateEvent.addEventListener(function () {
                                    var activatedDataSets = _this._sessionActivatedDataSets.get(session);
                                    activatedDataSets.forEach(function (id) {
                                        _this.delegate.objectTrackerDeactivateDataSet(id);
                                    });
                                    _this._sessionActivatedDataSets.delete(session);
                                    var createdDataSets = _this._sessionCreatedDataSets.get(session);
                                    createdDataSets.forEach(function (id) {
                                        _this.delegate.objectTrackerDestroyDataSet(id);
                                    });
                                    _this._sessionCreatedDataSets.delete(session);
                                    remove();
                                });
                            });
                        }, true);
                    }
                };
                VuforiaService.prototype._init = function (session) {
                    var _this = this;
                    var options = this._sessionInitOptions.get(session);
                    return this.delegate.init(options).then(function (initResult) {
                        if (initResult !== VuforiaInitResult.SUCCESS) {
                            return Promise.reject("Vuforia init failed: " + VuforiaInitResult[initResult]);
                        }
                        // must initialize trackers before initializing the camera device
                        if (!_this.delegate.objectTrackerInit()) {
                            return Promise.reject("Vuforia init failed: Unable to initialize ObjectTracker");
                        }
                        // restore active datasets & trackables
                        var activatedDataSets = _this._sessionActivatedDataSets.get(session);
                        var success = true;
                        activatedDataSets.forEach(function (id) {
                            success = success && _this.delegate.objectTrackerActivateDataSet(id);
                            if (success) {
                                session.send('ar.vuforia.objectTrackerActivateDataSetEvent', { id: id });
                            }
                        });
                        if (!success) {
                            return Promise.reject("Vuforia init failed: Unable to restore active datasets");
                        }
                        // todo: also activate datasets / trackables created by other sessions
                        // (if this fails, then vuforia has probably started forbidding datasets created 
                        // by one developer account to work while using a license key from a different
                        // developer account, so no need to return a rejected promise in that case)
                        if (!_this.delegate.cameraDeviceInitAndStart()) {
                            return Promise.reject("Vuforia init failed: Unable to complete initialization");
                        }
                        // trackers get started after camera is initialized and started
                        if (!_this.delegate.objectTrackerStart()) {
                            return Promise.reject("Vuforia init failed: Unable to start ObjectTracker");
                        }
                        _this._sessionIsInitialized.set(session, true);
                    }).catch(function (err) {
                        _this._sessionInitOptions.set(session, null);
                        _this._sessionIsInitialized.set(session, false);
                        _this._deinit(session);
                        _this._ensureControllingSession();
                        return Promise.reject(err);
                    });
                };
                VuforiaService.prototype._deinit = function (session) {
                    // Deactivate any activated datasets, stop trackers, and deinit. 
                    // Don't destroy created resources in case we to use them to restore state. 
                    var _this = this;
                    // not sure if the following is necessary
                    var activatedDataSets = this._sessionActivatedDataSets.get(session);
                    activatedDataSets.forEach(function (id) {
                        _this.delegate.objectTrackerDeactivateDataSet(id);
                        session.send('ar.vuforia.objectTrackerDeactivateDataSetEvent', { id: id });
                    });
                    // may need to call stop on the trackers / camera device first?
                    // const errors:Array<string> = [];
                    // if (!this.delegate.objectTrackerDeinit()) {
                    //     errors.push("Unable to deinitialize ObjectTracker");
                    // } 
                    // if (!this.delegate.cameraDeviceDeinit()) {
                    //     errors.push("Unable to deinitialize CameraDevice");
                    // }
                    this.delegate.deinit();
                    // if (errors.length > 0) {
                    //     return Promise.reject(errors.join('\n'));
                    // }
                };
                VuforiaService = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, focus_1.FocusService, reality_1.RealityService, VuforiaServiceDelegate)
                ], VuforiaService);
                return VuforiaService;
            }());
            exports_1("VuforiaService", VuforiaService);
            VuforiaAPI = (function () {
                function VuforiaAPI(manager) {
                    this.manager = manager;
                    this.objectTracker = new VuforiaObjectTracker(manager);
                }
                return VuforiaAPI;
            }());
            exports_1("VuforiaAPI", VuforiaAPI);
            VuforiaTracker = (function () {
                function VuforiaTracker() {
                }
                return VuforiaTracker;
            }());
            exports_1("VuforiaTracker", VuforiaTracker);
            /**
             * Vuforia Object Tracker
             */
            VuforiaObjectTracker = (function (_super) {
                __extends(VuforiaObjectTracker, _super);
                function VuforiaObjectTracker(manager) {
                    var _this = this;
                    _super.call(this);
                    this.manager = manager;
                    this._dataSetMap = new Map();
                    this.dataSetActivateEvent = new utils_1.Event();
                    this.dataSetDeactivateEvent = new utils_1.Event();
                    manager.on['ar.vuforia.objectTrackerActivateDataSetEvent'] = function (_a, event) {
                        var id = _a.id;
                        var dataSet = _this._dataSetMap.get(id);
                        dataSet._onActivate();
                        _this.dataSetActivateEvent.raiseEvent(dataSet);
                    };
                    manager.on['ar.vuforia.objectTrackerDeactivateDataSetEvent'] = function (_a, event) {
                        var id = _a.id;
                        var dataSet = _this._dataSetMap.get(id);
                        dataSet._onDeactivate();
                        _this.dataSetDeactivateEvent.raiseEvent(dataSet);
                    };
                }
                VuforiaObjectTracker.prototype.createDataSet = function (url) {
                    var _this = this;
                    return this.manager.request('ar.vuforia.objectTrackerCreateDataSet', { url: url }).then(function (message) {
                        return new VuforiaDataSet(message.dataSetId, _this.manager);
                    });
                };
                VuforiaObjectTracker.prototype.activateDataSet = function (dataSet) {
                    return this.manager.request('ar.vuforia.objectTrackerActivateDataSet', { id: dataSet.id });
                };
                VuforiaObjectTracker.prototype.deactivateDataSet = function (dataSet) {
                    return this.manager.request('ar.vuforia.objectTrackerDeactivateDataSet', { id: dataSet.id });
                };
                return VuforiaObjectTracker;
            }(VuforiaTracker));
            exports_1("VuforiaObjectTracker", VuforiaObjectTracker);
            /**
             * A vuforia data set. TODO
             */
            VuforiaDataSet = (function () {
                function VuforiaDataSet(id, manager) {
                    this.id = id;
                    this.manager = manager;
                    this._isLoaded = false;
                    this._isActive = false;
                }
                VuforiaDataSet.prototype._onActivate = function () {
                    this._isActive = true;
                };
                VuforiaDataSet.prototype._onDeactivate = function () {
                    this._isActive = false;
                };
                VuforiaDataSet.prototype.fetch = function () {
                    return this.manager.request('ar.vuforia.dataSetFetch', { id: this.id }).then(function () { });
                };
                VuforiaDataSet.prototype.load = function () {
                    return this.manager.request('ar.vuforia.dataSetLoad', { id: this.id });
                };
                VuforiaDataSet.prototype.isActive = function () {
                    return this._isActive;
                };
                VuforiaDataSet.prototype.getTrackables = function () {
                    return this._trackables;
                };
                return VuforiaDataSet;
            }());
            exports_1("VuforiaDataSet", VuforiaDataSet);
        }
    }
});

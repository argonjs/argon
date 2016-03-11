System.register(['aurelia-dependency-injection', './session.ts', './context.ts', './utils.ts', './reality.ts'], function(exports_1, context_1) {
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
    var aurelia_dependency_injection_1, session_ts_1, context_ts_1, utils_ts_1, reality_ts_1;
    var VuforiaInitError, VuforiaLoadDataSetError, VuforiaUnloadDataSetError, VuforiaActivateDataSetError, VuforiaDeactivateDataSetError, VuforiaInitErrorCode, VuforiaErrorType, VuforiaServiceDelegate, VuforiaService, VuforiaDataSet;
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (session_ts_1_1) {
                session_ts_1 = session_ts_1_1;
            },
            function (context_ts_1_1) {
                context_ts_1 = context_ts_1_1;
            },
            function (utils_ts_1_1) {
                utils_ts_1 = utils_ts_1_1;
            },
            function (reality_ts_1_1) {
                reality_ts_1 = reality_ts_1_1;
            }],
        execute: function() {
            VuforiaInitError = (function (_super) {
                __extends(VuforiaInitError, _super);
                function VuforiaInitError(message, code) {
                    _super.call(this, message);
                    this.code = code;
                }
                return VuforiaInitError;
            }(Error));
            exports_1("VuforiaInitError", VuforiaInitError);
            VuforiaLoadDataSetError = (function (_super) {
                __extends(VuforiaLoadDataSetError, _super);
                function VuforiaLoadDataSetError(message) {
                    _super.call(this, message);
                }
                return VuforiaLoadDataSetError;
            }(Error));
            exports_1("VuforiaLoadDataSetError", VuforiaLoadDataSetError);
            VuforiaUnloadDataSetError = (function (_super) {
                __extends(VuforiaUnloadDataSetError, _super);
                function VuforiaUnloadDataSetError(message) {
                    _super.call(this, message);
                }
                return VuforiaUnloadDataSetError;
            }(Error));
            exports_1("VuforiaUnloadDataSetError", VuforiaUnloadDataSetError);
            VuforiaActivateDataSetError = (function (_super) {
                __extends(VuforiaActivateDataSetError, _super);
                function VuforiaActivateDataSetError(message) {
                    _super.call(this, message);
                }
                return VuforiaActivateDataSetError;
            }(Error));
            exports_1("VuforiaActivateDataSetError", VuforiaActivateDataSetError);
            VuforiaDeactivateDataSetError = (function (_super) {
                __extends(VuforiaDeactivateDataSetError, _super);
                function VuforiaDeactivateDataSetError(message) {
                    _super.call(this, message);
                }
                return VuforiaDeactivateDataSetError;
            }(Error));
            exports_1("VuforiaDeactivateDataSetError", VuforiaDeactivateDataSetError);
            /// Return codes for init() function
            (function (VuforiaInitErrorCode) {
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_ERROR"] = -1] = "INIT_ERROR";
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_DEVICE_NOT_SUPPORTED"] = -2] = "INIT_DEVICE_NOT_SUPPORTED";
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_NO_CAMERA_ACCESS"] = -3] = "INIT_NO_CAMERA_ACCESS";
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_MISSING_KEY"] = -4] = "INIT_LICENSE_ERROR_MISSING_KEY";
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_INVALID_KEY"] = -5] = "INIT_LICENSE_ERROR_INVALID_KEY";
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_NO_NETWORK_PERMANENT"] = -6] = "INIT_LICENSE_ERROR_NO_NETWORK_PERMANENT";
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_NO_NETWORK_TRANSIENT"] = -7] = "INIT_LICENSE_ERROR_NO_NETWORK_TRANSIENT";
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_CANCELED_KEY"] = -8] = "INIT_LICENSE_ERROR_CANCELED_KEY";
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_PRODUCT_TYPE_MISMATCH"] = -9] = "INIT_LICENSE_ERROR_PRODUCT_TYPE_MISMATCH";
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_EXTERNAL_DEVICE_NOT_DETECTED"] = -10] = "INIT_EXTERNAL_DEVICE_NOT_DETECTED"; ///< Dependent external device not detected/plugged in
            })(VuforiaInitErrorCode || (VuforiaInitErrorCode = {}));
            exports_1("VuforiaInitErrorCode", VuforiaInitErrorCode);
            ;
            (function (VuforiaErrorType) {
                VuforiaErrorType[VuforiaErrorType["InitError"] = "InitError"] = "InitError";
                VuforiaErrorType[VuforiaErrorType["LoadDataSetError"] = "LoadDataSetError"] = "LoadDataSetError";
                VuforiaErrorType[VuforiaErrorType["UnloadDataSetError"] = "UnloadDataSetError"] = "UnloadDataSetError";
                VuforiaErrorType[VuforiaErrorType["ActivateDataSetError"] = "ActivateDataSetError"] = "ActivateDataSetError";
                VuforiaErrorType[VuforiaErrorType["DeactivateDataSetError"] = "DeactivateDataSetError"] = "DeactivateDataSetError";
            })(VuforiaErrorType || (VuforiaErrorType = {}));
            exports_1("VuforiaErrorType", VuforiaErrorType);
            VuforiaServiceDelegate = (function () {
                function VuforiaServiceDelegate() {
                    this.updateEvent = new utils_ts_1.Event();
                    this.errorEvent = new utils_ts_1.Event();
                    this.dataSetLoadEvent = new utils_ts_1.Event();
                }
                VuforiaServiceDelegate.prototype.isSupported = function () { return false; };
                VuforiaServiceDelegate.prototype.init = function (options) { };
                VuforiaServiceDelegate.prototype.deinit = function () { };
                VuforiaServiceDelegate.prototype.startCamera = function () { };
                VuforiaServiceDelegate.prototype.stopCamera = function () { };
                VuforiaServiceDelegate.prototype.startObjectTracker = function () { };
                VuforiaServiceDelegate.prototype.stopObjectTracker = function () { };
                VuforiaServiceDelegate.prototype.hintMaxSimultaneousImageTargets = function (max) { };
                VuforiaServiceDelegate.prototype.setVideoBackgroundConfig = function (videoConfig) { };
                VuforiaServiceDelegate.prototype.loadDataSet = function (url) { };
                VuforiaServiceDelegate.prototype.unloadDataSet = function (url) { };
                VuforiaServiceDelegate.prototype.activateDataSet = function (url) { };
                VuforiaServiceDelegate.prototype.deactivateDataSet = function (url) { };
                VuforiaServiceDelegate.prototype.getVideoMode = function () { return null; };
                ;
                return VuforiaServiceDelegate;
            }());
            exports_1("VuforiaServiceDelegate", VuforiaServiceDelegate);
            VuforiaService = (function () {
                function VuforiaService(context, realityService, delegate) {
                    var _this = this;
                    this.context = context;
                    this.realityService = realityService;
                    this.delegate = delegate;
                    this._commandQueue = new utils_ts_1.CommandQueue;
                    this._sessionInitOptions = new WeakMap();
                    this._sessionCameraStarted = new WeakMap();
                    this._sessionObjectTrackerStarted = new WeakMap();
                    this._sessionMaxSimultaneousImageTargets = new WeakMap();
                    this._sessionLoadedDataSets = new WeakMap();
                    this._sessionActivatedDataSets = new WeakMap();
                    this._controllingSession = null;
                    this._isInitialized = false;
                    this.dataSetMap = new Map();
                    context.parentSession.on['ar.vuforia.errorEvent'] = function (err, event) {
                        var error = null;
                        switch (err.type) {
                            case VuforiaErrorType.InitError:
                                error = new VuforiaInitError(err.message, err.data.code);
                                break;
                            case VuforiaErrorType.LoadDataSetError:
                                error = new VuforiaLoadDataSetError(err.message);
                                break;
                            case VuforiaErrorType.UnloadDataSetError:
                                error = new VuforiaUnloadDataSetError(err.message);
                                break;
                            case VuforiaErrorType.ActivateDataSetError:
                                error = new VuforiaActivateDataSetError(err.message);
                                break;
                            default:
                                error = new Error(err.message);
                                break;
                        }
                        context.errorEvent.raiseEvent(error);
                    };
                    context.parentSession.on['ar.vuforia.dataSetLoadEvent'] = function (msg, event) {
                        var url = msg.url, trackables = msg.trackables;
                        var dataSet = _this.dataSetMap.get(url);
                        dataSet._resolveTrackables(trackables);
                    };
                    realityService.handlers.set('vuforia', function (reality, port) {
                        var remoteRealitySession = realityService.sessionFactory.create();
                        remoteRealitySession.open(port, { role: session_ts_1.Role.REALITY });
                        remoteRealitySession.send('ar.vuforia.init');
                        remoteRealitySession.send('ar.vuforia.startCamera');
                        var remove = delegate.updateEvent.addEventListener(function (frameState) {
                            remoteRealitySession.send('ar.context.update', frameState);
                            // TODO: Only pass frameNumber / time, and update the trackable entities 
                            // directly. Two reasons:
                            // 1) Allow vuforia to be used when it is not the current reality
                            // 2) Only send trackable data to the session that wants it
                            // remoteRealitySession.send('ar.context.update', {
                            // 	frameNumber: frameState.frameNumber,
                            // 	time: frameState.time,	
                            // });
                        });
                        remoteRealitySession.closeEvent.addEventListener(function () {
                            remove();
                        });
                    });
                    context.sessionConnectEvent.addEventListener(function (session) {
                        var loadedDataSets = new Set();
                        _this._sessionLoadedDataSets.set(session, loadedDataSets);
                        var activatedDataSets = new Set();
                        _this._sessionActivatedDataSets.set(session, activatedDataSets);
                        session.on['ar.vuforia.isSupported'] = function () {
                            return delegate.isSupported();
                        };
                        session.on['ar.vuforia.init'] = function (options, event) {
                            if (!delegate.isSupported())
                                return;
                            _this._sessionInitOptions.set(session, options);
                            if (_this._controllingSession === null || session === context.focussedSession) {
                                _this._initVuforia(session);
                            }
                        };
                        session.on['ar.vuforia.deinit'] = function (options, event) {
                            if (session === _this._controllingSession) {
                                if (_this._sessionInitOptions.has(session)) {
                                    _this._commandQueue.clear();
                                    _this._commandQueue.push(function () {
                                        return Promise.resolve(delegate.deinit()).then(function () {
                                            _this._isInitialized = false;
                                        });
                                    }, session);
                                }
                            }
                            _this._sessionInitOptions.delete(session);
                        };
                        session.on['ar.vuforia.startCamera'] = function (message, event) {
                            if (session === _this._controllingSession) {
                                if (!_this._sessionCameraStarted.get(session))
                                    _this._commandQueue.push(function () { return delegate.startCamera(); }), session;
                            }
                            _this._sessionCameraStarted.set(session, true);
                        };
                        session.on['ar.vuforia.stopCamera'] = function (message, event) {
                            if (session === _this._controllingSession) {
                                if (_this._sessionCameraStarted.get(session))
                                    _this._commandQueue.push(function () { return delegate.stopCamera(); }, session);
                            }
                            _this._sessionCameraStarted.set(session, false);
                        };
                        session.on['ar.vuforia.startObjectTracker'] = function (message, event) {
                            if (session === _this._controllingSession) {
                                if (!_this._sessionObjectTrackerStarted.get(session))
                                    _this._commandQueue.push(function () { return delegate.startObjectTracker(); }), session;
                            }
                            _this._sessionObjectTrackerStarted.set(session, true);
                        };
                        session.on['ar.vuforia.stopObjectTracker'] = function (message, event) {
                            if (session === _this._controllingSession) {
                                if (_this._sessionObjectTrackerStarted.get(session))
                                    _this._commandQueue.push(function () { return delegate.stopObjectTracker(); }, session);
                            }
                            _this._sessionObjectTrackerStarted.set(session, false);
                        };
                        session.on['ar.vuforia.hintMaxSimultaneousImageTargets'] = function (_a) {
                            var max = _a.max;
                            if (session === _this._controllingSession) {
                                _this._commandQueue.push(function () { return delegate.hintMaxSimultaneousImageTargets(max); }, session);
                            }
                            _this._sessionMaxSimultaneousImageTargets.set(session, max);
                        };
                        session.on['ar.vuforia.loadDataSet'] = function (_a, event) {
                            var url = _a.url;
                            if (session === _this._controllingSession) {
                                if (!loadedDataSets.has(url))
                                    _this._commandQueue.push(function () { return delegate.loadDataSet(url); }, session);
                            }
                            loadedDataSets.add(url);
                        };
                        session.on['ar.vuforia.unloadDataSet'] = function (_a, event) {
                            var url = _a.url;
                            if (session === _this._controllingSession) {
                                if (loadedDataSets.has(url))
                                    _this._commandQueue.push(function () { return delegate.unloadDataSet(url); }, session);
                            }
                            loadedDataSets.delete(url);
                            activatedDataSets.delete(url);
                        };
                        session.on['ar.vuforia.activateDataSet'] = function (_a, event) {
                            var url = _a.url;
                            if (session === _this._controllingSession) {
                                if (!loadedDataSets.has(url))
                                    _this._commandQueue.push(function () { return delegate.loadDataSet(url); }, session);
                                if (!activatedDataSets.has(url))
                                    _this._commandQueue.push(function () { return delegate.activateDataSet(url); }, session);
                            }
                            loadedDataSets.add(url);
                            activatedDataSets.add(url);
                        };
                        session.on['ar.vuforia.deactivateDataSet'] = function (_a, event) {
                            var url = _a.url;
                            if (session === _this._controllingSession) {
                                if (activatedDataSets.has(url))
                                    _this._commandQueue.push(function () { return delegate.deactivateDataSet(url); }, session);
                            }
                            activatedDataSets.delete(url);
                        };
                        session.closeEvent.addEventListener(function () {
                            _this._commandQueue.push(function () { return delegate.stopObjectTracker(); }, session);
                            loadedDataSets.forEach(function (url) {
                                _this._commandQueue.push(function () { return delegate.deactivateDataSet(url); }, session);
                                _this._commandQueue.push(function () { return delegate.unloadDataSet(url); }, session);
                            });
                            _this._controllingSession = null;
                        });
                    });
                    context.sessionFocusEvent.addEventListener(function (session) {
                        if (_this._sessionInitOptions.has(session)) {
                            _this._initVuforia(session);
                        }
                    });
                    delegate.errorEvent.addEventListener(function (msg) {
                        var session = _this._commandQueue.currentUserData;
                        if (msg.type === VuforiaErrorType.InitError) {
                            _this._sessionInitOptions.delete(session);
                            _this._controllingSession = null;
                            _this._isInitialized = false;
                            _this._commandQueue.clear();
                        }
                        session.send('ar.vuforia.errorEvent', msg);
                    });
                    delegate.dataSetLoadEvent.addEventListener(function (msg) {
                        var session = _this._commandQueue.currentUserData;
                        session.send('ar.vuforia.dataSetLoadEvent', msg);
                    });
                }
                ;
                VuforiaService.prototype._initVuforia = function (session) {
                    var _this = this;
                    var queue = this._commandQueue;
                    var initOptions = this._sessionInitOptions.get(session);
                    var maxSimultaneousImageTargets = this._sessionMaxSimultaneousImageTargets.get(session);
                    var cameraStarted = this._sessionCameraStarted.get(session);
                    var objectTrackerStarted = this._sessionObjectTrackerStarted.get(session);
                    var loadedDataSets = this._sessionLoadedDataSets.get(session);
                    var activatedDataSets = this._sessionActivatedDataSets.get(session);
                    var delegate = this.delegate;
                    if (this._isInitialized) {
                        queue.clear();
                        queue.push(function () {
                            return delegate.deinit().then(function () {
                                _this._isInitialized = false;
                            });
                        }, this._controllingSession);
                    }
                    this._controllingSession = session;
                    queue.push(function () {
                        _this._isInitialized = true;
                        return delegate.init(initOptions || {});
                    }, session);
                    if (cameraStarted)
                        queue.push(function () { return delegate.startCamera(); }, session);
                    if (objectTrackerStarted)
                        queue.push(function () { return delegate.startObjectTracker(); }, session);
                    queue.push(function () { return delegate.hintMaxSimultaneousImageTargets(maxSimultaneousImageTargets || 1); }, session);
                    loadedDataSets.forEach(function (url) {
                        queue.push(function () { return delegate.loadDataSet(url); }, session);
                    });
                    activatedDataSets.forEach(function (url) {
                        queue.push(function () { return delegate.activateDataSet(url); }, session);
                    });
                };
                VuforiaService.prototype.isSupported = function () {
                    return this.context.parentSession.request('ar.vuforia.isSupported');
                };
                VuforiaService.prototype.init = function (options) {
                    this.context.parentSession.send('ar.vuforia.init', options);
                };
                VuforiaService.prototype.deinit = function () {
                    this.context.parentSession.send('ar.vuforia.deinit');
                };
                VuforiaService.prototype.startCamera = function () {
                    this.context.parentSession.send('ar.vuforia.startCamera');
                };
                VuforiaService.prototype.stopCamera = function () {
                    this.context.parentSession.send('ar.vuforia.stopCamera');
                };
                VuforiaService.prototype.startObjectTracker = function () {
                    this.context.parentSession.send('ar.vuforia.startObjectTracker');
                };
                VuforiaService.prototype.stopObjectTracker = function () {
                    this.context.parentSession.send('ar.vuforia.stopObjectTracker');
                };
                VuforiaService.prototype.hintMaxSimultaneousImageTargets = function (max) {
                    this.context.parentSession.send('ar.vuforia.hintMaxSimultaneousImageTargets', { max: max });
                };
                VuforiaService.prototype.createDataSet = function (url) {
                    url = utils_ts_1.resolveURL(url);
                    var parentSession = this.context.parentSession;
                    var dataSet = new VuforiaDataSet(url, parentSession);
                    this.dataSetMap.set(url, dataSet);
                    return dataSet;
                };
                VuforiaService = __decorate([
                    aurelia_dependency_injection_1.inject(context_ts_1.Context, reality_ts_1.RealityService, VuforiaServiceDelegate)
                ], VuforiaService);
                return VuforiaService;
            }());
            exports_1("VuforiaService", VuforiaService);
            VuforiaDataSet = (function () {
                function VuforiaDataSet(url, parentSession) {
                    var _this = this;
                    this.url = url;
                    this._loaded = false;
                    this._activated = false;
                    this._trackablesPromise = new Promise(function (resolve, reject) { _this._resolveTrackables = resolve; });
                    this._parentSession = parentSession;
                }
                Object.defineProperty(VuforiaDataSet.prototype, "loaded", {
                    get: function () { return this._loaded; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(VuforiaDataSet.prototype, "activated", {
                    get: function () { return this._activated; },
                    enumerable: true,
                    configurable: true
                });
                VuforiaDataSet.prototype.load = function () { this._loaded = true; this._parentSession.send('ar.vuforia.loadDataSet', { url: this.url }); };
                VuforiaDataSet.prototype.unload = function () { this._loaded = false; this._activated = false; this._parentSession.send('ar.vuforia.unloadDataSet', { url: this.url }); };
                VuforiaDataSet.prototype.activate = function () { this._loaded = true; this._activated = true; this._parentSession.send('ar.vuforia.activateDataSet', { url: this.url }); };
                VuforiaDataSet.prototype.deactivate = function () { this._activated = false; this._parentSession.send('ar.vuforia.deactivateDataSet', { url: this.url }); };
                Object.defineProperty(VuforiaDataSet.prototype, "trackablesPromise", {
                    get: function () { return this._trackablesPromise; },
                    enumerable: true,
                    configurable: true
                });
                return VuforiaDataSet;
            }());
            exports_1("VuforiaDataSet", VuforiaDataSet);
        }
    }
});

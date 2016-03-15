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
    var VuforiaInitError, VuforiaLoadDataSetError, VuforiaUnloadDataSetError, VuforiaActivateDataSetError, VuforiaDeactivateDataSetError, VuforiaInitErrorCode, VuforiaErrorType, VuforiaServiceDelegateBase, VuforiaServiceDelegate, VuforiaRealitySetupHandler, VuforiaService, VuforiaDataSet;
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
            /** An error that occured in vuforia while initializing. */
            VuforiaInitError = (function (_super) {
                __extends(VuforiaInitError, _super);
                function VuforiaInitError(message, code) {
                    _super.call(this, message);
                    this.code = code;
                }
                return VuforiaInitError;
            }(Error));
            exports_1("VuforiaInitError", VuforiaInitError);
            /** An error that occured in vuforia while loading a data set. */
            VuforiaLoadDataSetError = (function (_super) {
                __extends(VuforiaLoadDataSetError, _super);
                function VuforiaLoadDataSetError(message) {
                    _super.call(this, message);
                }
                return VuforiaLoadDataSetError;
            }(Error));
            exports_1("VuforiaLoadDataSetError", VuforiaLoadDataSetError);
            /** An error that occured in vuforia while unloading a data set. */
            VuforiaUnloadDataSetError = (function (_super) {
                __extends(VuforiaUnloadDataSetError, _super);
                function VuforiaUnloadDataSetError(message) {
                    _super.call(this, message);
                }
                return VuforiaUnloadDataSetError;
            }(Error));
            exports_1("VuforiaUnloadDataSetError", VuforiaUnloadDataSetError);
            /** An error that occured in vuforia while activating a data set. */
            VuforiaActivateDataSetError = (function (_super) {
                __extends(VuforiaActivateDataSetError, _super);
                function VuforiaActivateDataSetError(message) {
                    _super.call(this, message);
                }
                return VuforiaActivateDataSetError;
            }(Error));
            exports_1("VuforiaActivateDataSetError", VuforiaActivateDataSetError);
            /** An error that occured in vuforia while deactivating a data set. */
            VuforiaDeactivateDataSetError = (function (_super) {
                __extends(VuforiaDeactivateDataSetError, _super);
                function VuforiaDeactivateDataSetError(message) {
                    _super.call(this, message);
                }
                return VuforiaDeactivateDataSetError;
            }(Error));
            exports_1("VuforiaDeactivateDataSetError", VuforiaDeactivateDataSetError);
            /**
             * The set of possible error codes that can be returned from vuforia's
             * initialization function.
             */
            (function (VuforiaInitErrorCode) {
                /** Error during initialization. */
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_ERROR"] = -1] = "INIT_ERROR";
                /** The device is not supported. */
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_DEVICE_NOT_SUPPORTED"] = -2] = "INIT_DEVICE_NOT_SUPPORTED";
                /** Cannot access the camera. */
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_NO_CAMERA_ACCESS"] = -3] = "INIT_NO_CAMERA_ACCESS";
                /** License key is missing. */
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_MISSING_KEY"] = -4] = "INIT_LICENSE_ERROR_MISSING_KEY";
                /** Invalid license key passed to SDK. */
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_INVALID_KEY"] = -5] = "INIT_LICENSE_ERROR_INVALID_KEY";
                /** Unable to verify license key due to network (Permanent error). */
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_NO_NETWORK_PERMANENT"] = -6] = "INIT_LICENSE_ERROR_NO_NETWORK_PERMANENT";
                /** Unable to verify license key due to network (Transient error). */
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_NO_NETWORK_TRANSIENT"] = -7] = "INIT_LICENSE_ERROR_NO_NETWORK_TRANSIENT";
                /** Provided key is no longer valid. */
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_CANCELED_KEY"] = -8] = "INIT_LICENSE_ERROR_CANCELED_KEY";
                /** Provided key is not valid for this product. */
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_PRODUCT_TYPE_MISMATCH"] = -9] = "INIT_LICENSE_ERROR_PRODUCT_TYPE_MISMATCH";
                /** Dependent external device not detected/plugged in. */
                VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_EXTERNAL_DEVICE_NOT_DETECTED"] = -10] = "INIT_EXTERNAL_DEVICE_NOT_DETECTED";
            })(VuforiaInitErrorCode || (VuforiaInitErrorCode = {}));
            exports_1("VuforiaInitErrorCode", VuforiaInitErrorCode);
            ;
            /**
             * The different kinds of errors that vuforia can raise.
             */
            (function (VuforiaErrorType) {
                VuforiaErrorType[VuforiaErrorType["InitError"] = "InitError"] = "InitError";
                VuforiaErrorType[VuforiaErrorType["LoadDataSetError"] = "LoadDataSetError"] = "LoadDataSetError";
                VuforiaErrorType[VuforiaErrorType["UnloadDataSetError"] = "UnloadDataSetError"] = "UnloadDataSetError";
                VuforiaErrorType[VuforiaErrorType["ActivateDataSetError"] = "ActivateDataSetError"] = "ActivateDataSetError";
                VuforiaErrorType[VuforiaErrorType["DeactivateDataSetError"] = "DeactivateDataSetError"] = "DeactivateDataSetError";
            })(VuforiaErrorType || (VuforiaErrorType = {}));
            exports_1("VuforiaErrorType", VuforiaErrorType);
            /**
             * An abstract class representing the functionality needed to implement
             * Vuforia's functionality for a `VuforiaService`. This is a null
             * implementation that simply does nothing in response to all requests.
             */
            VuforiaServiceDelegateBase = (function () {
                function VuforiaServiceDelegateBase() {
                    this.updateEvent = new utils_1.Event();
                    this.errorEvent = new utils_1.Event();
                    this.dataSetLoadEvent = new utils_1.Event();
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
                    remoteRealitySession.connectEvent.addEventListener(function () {
                        remoteRealitySession.send('ar.vuforia.init');
                        remoteRealitySession.send('ar.vuforia.startCamera');
                    });
                    var remove = this.delegate.updateEvent.addEventListener(function (frameState) {
                        remoteRealitySession.send('ar.reality.frameState', frameState);
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
                    remoteRealitySession.open(port, { role: config_1.Role.REALITY });
                };
                VuforiaRealitySetupHandler = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, VuforiaServiceDelegate)
                ], VuforiaRealitySetupHandler);
                return VuforiaRealitySetupHandler;
            }());
            exports_1("VuforiaRealitySetupHandler", VuforiaRealitySetupHandler);
            /**
             * Hooks up a context and its session with vuforia by allowing the context's
             * sessions to make a number of requests:
             *
             *  * `ar.vuforia.isSupported` - Checks if vuforia is supported.
             *    * Returns: True if vuforia is supported on the device argon is running
             *      on and false if not.
             *
             *  * `ar.vuforia.init` - Initializes vuforia if it hasn't already been.
             *    * Parameters:
             *      * options: VuforiaInitOptions - The options to pass to vuforia as it is
             *        being initialized.
             *
             *  * `ar.vuforia.deinit` - Deinitializes vuforia if it was previously
             *    initialized by the same session.
             *
             *  * `ar.vuforia.startCamera` - Tells vuforia to startup the camera.
             *
             *  * `ar.vuforia.stopCamera` - Tells vuforia to shutdown the camera.
             *
             *  * `ar.vuforia.startObjectTracker` - Tells vuforia to startip its object
             *    tracking system.
             *
             *  * `ar.vuforia.stopObjectTracker` - Tells vuforia to shutdown its object
             *    tracking system.
             *
             *  * `ar.vuforia.hintMaxSimultaneousImageTargets` - Gives vuforia a hint on
             *    the maximum number of targets it will be tracking.
             *    * Parameters:
             *      * options: {max: number} - The maximum number of targets vuforia will
             *        be tracking for the session.
             *
             *  * `ar.vuforia.loadDataSet` - Asks vuforia to load a data set from the given
             *    url.
             *    * Parameters:
             *      * options: {url: string} - The url pf the data set to load.
             *
             *  * `ar.vuforia.unloadDataSet` - Asks vuforia to unload a previously loaded
             *    data set. Also deactivates the data set if it was activated.
             *    * Parameters:
             *      * options: {url: string} - The url of the data set to unload.
             *
             *  * `ar.vuforia.activateDataSet` - Asks vuforia to activate a data set. Also
             *    loads the data set if it was not already loaded.
             *    * Parameters:
             *      * options: {url: string} - The url of the data set to activate.
             *
             *  * `ar.vuforia.deactivateDataSet` - Asks vuforia to deactivate a data set.
             *    * Parameters:
             *      * options: {url: string} - The url of the data set to deactivate.
             */
            VuforiaService = (function () {
                function VuforiaService(sessionService, focusService, realityService, delegate) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.focusService = focusService;
                    this.realityService = realityService;
                    this.delegate = delegate;
                    this._commandQueue = new utils_1.CommandQueue;
                    this._sessionInitOptions = new WeakMap();
                    this._sessionCameraStarted = new WeakMap();
                    this._sessionObjectTrackerStarted = new WeakMap();
                    this._sessionMaxSimultaneousImageTargets = new WeakMap();
                    this._sessionLoadedDataSets = new WeakMap();
                    this._sessionActivatedDataSets = new WeakMap();
                    this._controllingSession = null;
                    this._isInitialized = false;
                    this._dataSetMap = new Map();
                    if (sessionService.isManager()) {
                        sessionService.connectEvent.addEventListener(function (session) {
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
                                if (_this._controllingSession === null || session === focusService.currentSession) {
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
                    }
                    sessionService.manager.on['ar.vuforia.errorEvent'] = function (err, event) {
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
                        sessionService.errorEvent.raiseEvent(error);
                    };
                    sessionService.manager.on['ar.vuforia.dataSetLoadEvent'] = function (msg, event) {
                        var url = msg.url, trackables = msg.trackables;
                        var dataSet = _this._dataSetMap.get(url);
                        dataSet._resolveTrackables(trackables);
                    };
                    focusService.sessionFocusEvent.addEventListener(function (session) {
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
                VuforiaService.prototype.isSupported = function () {
                    return this.sessionService.manager.request('ar.vuforia.isSupported');
                };
                VuforiaService.prototype.init = function (options) {
                    this.sessionService.manager.send('ar.vuforia.init', options);
                };
                VuforiaService.prototype.deinit = function () {
                    this.sessionService.manager.send('ar.vuforia.deinit');
                };
                VuforiaService.prototype.startCamera = function () {
                    this.sessionService.manager.send('ar.vuforia.startCamera');
                };
                VuforiaService.prototype.stopCamera = function () {
                    this.sessionService.manager.send('ar.vuforia.stopCamera');
                };
                VuforiaService.prototype.startObjectTracker = function () {
                    this.sessionService.manager.send('ar.vuforia.startObjectTracker');
                };
                VuforiaService.prototype.stopObjectTracker = function () {
                    this.sessionService.manager.send('ar.vuforia.stopObjectTracker');
                };
                VuforiaService.prototype.hintMaxSimultaneousImageTargets = function (max) {
                    this.sessionService.manager.send('ar.vuforia.hintMaxSimultaneousImageTargets', { max: max });
                };
                VuforiaService.prototype.createDataSet = function (url) {
                    url = utils_1.resolveURL(url);
                    var dataSet = new VuforiaDataSet(url, this.sessionService.manager);
                    this._dataSetMap.set(url, dataSet);
                    return dataSet;
                };
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
                VuforiaService = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, focus_1.FocusService, reality_1.RealityService, VuforiaServiceDelegate)
                ], VuforiaService);
                return VuforiaService;
            }());
            exports_1("VuforiaService", VuforiaService);
            /**
             * A vuforia data set. TODO
             */
            VuforiaDataSet = (function () {
                function VuforiaDataSet(url, manager) {
                    var _this = this;
                    this.url = url;
                    this.manager = manager;
                    this._loaded = false;
                    this._activated = false;
                    this._trackablesPromise = new Promise(function (resolve, reject) { _this._resolveTrackables = resolve; });
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
                VuforiaDataSet.prototype.load = function () { this._loaded = true; this.manager.send('ar.vuforia.loadDataSet', { url: this.url }); };
                VuforiaDataSet.prototype.unload = function () { this._loaded = false; this._activated = false; this.manager.send('ar.vuforia.unloadDataSet', { url: this.url }); };
                VuforiaDataSet.prototype.activate = function () { this._loaded = true; this._activated = true; this.manager.send('ar.vuforia.activateDataSet', { url: this.url }); };
                VuforiaDataSet.prototype.deactivate = function () { this._activated = false; this.manager.send('ar.vuforia.deactivateDataSet', { url: this.url }); };
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

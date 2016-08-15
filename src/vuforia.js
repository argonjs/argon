System.register(['aurelia-dependency-injection', './focus', './session', './utils'], function(exports_1, context_1) {
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
    var aurelia_dependency_injection_1, focus_1, session_1, utils_1;
    var VuforiaInitResult, VuforiaServiceDelegateBase, VuforiaServiceDelegate, VuforiaService, VuforiaAPI, VuforiaTracker, VuforiaObjectTracker, VuforiaDataSet;
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
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
                    this.stateUpdateEvent = new utils_1.Event();
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
                VuforiaServiceDelegate.prototype.isAvailable = function () { return false; };
                VuforiaServiceDelegate.prototype.setHint = function (hint, value) { return true; };
                VuforiaServiceDelegate.prototype.decryptLicenseKey = function (encryptedLicenseData, session) { return Promise.resolve(undefined); };
                VuforiaServiceDelegate.prototype.init = function (options) { return Promise.resolve(VuforiaInitResult.SUCCESS); };
                VuforiaServiceDelegate.prototype.deinit = function () { };
                VuforiaServiceDelegate.prototype.cameraDeviceInitAndStart = function () { return true; };
                VuforiaServiceDelegate.prototype.cameraDeviceSetFlashTorchMode = function (on) { return true; };
                VuforiaServiceDelegate.prototype.objectTrackerInit = function () { return true; };
                VuforiaServiceDelegate.prototype.objectTrackerCreateDataSet = function (url) { return ''; };
                VuforiaServiceDelegate.prototype.objectTrackerDestroyDataSet = function (id) { return true; };
                VuforiaServiceDelegate.prototype.objectTrackerActivateDataSet = function (id) { return true; };
                VuforiaServiceDelegate.prototype.objectTrackerDeactivateDataSet = function (id) { return true; };
                VuforiaServiceDelegate.prototype.dataSetFetch = function (id) { return Promise.resolve(undefined); };
                VuforiaServiceDelegate.prototype.dataSetLoad = function (id) { return Promise.resolve(); };
                return VuforiaServiceDelegate;
            }(VuforiaServiceDelegateBase));
            exports_1("VuforiaServiceDelegate", VuforiaServiceDelegate);
            /**
             * Mediates requests to the Vuforia API. Handles the following requests:
             * // TODO
             */
            VuforiaService = (function () {
                function VuforiaService(sessionService, focusService, delegate) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.focusService = focusService;
                    this.delegate = delegate;
                    this._sessionSwitcherCommandQueue = new utils_1.CommandQueue();
                    this._sessionCommandQueue = new WeakMap();
                    this._sessionInitOptions = new WeakMap();
                    this._sessionInitPromise = new WeakMap();
                    this._sessionIsInitialized = new WeakMap();
                    this._sessionCreatedDataSets = new WeakMap();
                    this._sessionActivatedDataSets = new WeakMap();
                    if (sessionService.isManager) {
                        this._sessionSwitcherCommandQueue.errorEvent.addEventListener(function (err) {
                            _this.sessionService.errorEvent.raiseEvent(err);
                        });
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
                            session.on['ar.vuforia.init'] = function (options) {
                                if (!delegate.isAvailable())
                                    throw new Error("Vuforia is not supported");
                                if (_this._sessionIsInitialized.get(session))
                                    throw new Error("Vuforia has already been initialized");
                                var keyPromise = options.key ?
                                    Promise.resolve(options.key) :
                                    delegate.decryptLicenseKey(options.encryptedLicenseData, session);
                                return keyPromise.then(function (key) {
                                    _this._sessionInitOptions.set(session, {
                                        key: key
                                    });
                                    var result = commandQueue.push(function () {
                                        return _this._init(session).then(function () {
                                            _this._sessionIsInitialized.set(session, true);
                                        });
                                    }, _this._controllingSession === session);
                                    if (_this.focusService.getSession() === session) {
                                        _this._setControllingSession(session);
                                    }
                                    _this._sessionInitPromise.set(session, result);
                                    return result;
                                });
                            };
                            session.on['ar.vuforia.objectTrackerCreateDataSet'] = function (_a) {
                                var url = _a.url;
                                return commandQueue.push(function () {
                                    var id = delegate.objectTrackerCreateDataSet(url);
                                    if (id) {
                                        createdDataSets.add(id);
                                        return Promise.resolve({ id: id });
                                    }
                                    throw new Error('Unable to create DataSet');
                                }, _this._controllingSession === session);
                            };
                            session.on['ar.vuforia.objectTrackerActivateDataSet'] = function (_a) {
                                var id = _a.id;
                                return commandQueue.push(function () {
                                    if (delegate.objectTrackerActivateDataSet(id)) {
                                        activatedDataSets.add(id);
                                        session.send('ar.vuforia.objectTrackerActivateDataSetEvent', { id: id });
                                        return;
                                    }
                                    throw new Error("Unable to activate DataSet (" + id + ")");
                                }, _this._controllingSession === session);
                            };
                            session.on['ar.vuforia.objectTrackerDeactivateDataSet'] = function (_a) {
                                var id = _a.id;
                                return commandQueue.push(function () {
                                    if (delegate.objectTrackerDeactivateDataSet(id)) {
                                        activatedDataSets.delete(id);
                                        session.send('ar.vuforia.objectTrackerDeactivateDataSetEvent', { id: id });
                                        return;
                                    }
                                    throw new Error("Unable to deactivate DataSet (" + id + ")");
                                }, _this._controllingSession === session);
                            };
                            session.on['ar.vuforia.dataSetFetch'] = function (_a) {
                                var id = _a.id;
                                return commandQueue.push(function () {
                                    return delegate.dataSetFetch(id);
                                }, _this._controllingSession === session);
                            };
                            session.on['ar.vuforia.dataSetLoad'] = function (_a) {
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
                                            _this._ensureActiveSession();
                                        }, 2000);
                                    }, true);
                                }
                                else {
                                    _this._cleanupSession(session);
                                }
                            });
                        });
                        focusService.sessionFocusEvent.addEventListener(function (_a) {
                            var current = _a.current;
                            if (current && _this._sessionInitOptions.get(current)) {
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
                /**
                 * Initialize vuforia with an unecrypted key. Manager-only, unless the "force" (flag) is used.
                 * It's a bad idea to publish your private vuforia key on the internet.
                 */
                VuforiaService.prototype.initWithUnencryptedKey = function (options, force) {
                    var _this = this;
                    if (!force)
                        this.sessionService.ensureIsManager();
                    return this.sessionService.manager.request('ar.vuforia.init', options).then(function () {
                        return new VuforiaAPI(_this.sessionService.manager);
                    });
                };
                /**
                 * Initialize vuforia using an encrypted license key.
                 * You can encrypt your license key at http://docs.argonjs.io/start/vuforia-pgp-encryptor
                 */
                VuforiaService.prototype.init = function (options) {
                    var _this = this;
                    if (!options.encryptedLicenseData || typeof options.encryptedLicenseData !== 'string')
                        throw new Error('options.encryptedLicenseData is required.');
                    return this.sessionService.manager.request('ar.vuforia.init', options).then(function () {
                        return new VuforiaAPI(_this.sessionService.manager);
                    });
                };
                VuforiaService.prototype._ensureActiveSession = function () {
                    console.log("VuforiaService: Ensuring an active session is in control.");
                    if (this._controllingSession && this._controllingSession.isConnected)
                        return;
                    this._selectControllingSession();
                };
                VuforiaService.prototype._selectControllingSession = function () {
                    var focusSession = this.focusService.getSession();
                    if (focusSession && this._sessionInitOptions.get(focusSession)) {
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
                    if (this._sessionInitOptions.get(this.sessionService.manager))
                        this._setControllingSession(this.sessionService.manager);
                };
                VuforiaService.prototype._setControllingSession = function (session) {
                    var _this = this;
                    if (this._controllingSession === session)
                        return;
                    console.log("VuforiaService: Setting controlling session to " + session.uri);
                    this._sessionSwitcherCommandQueue.clear();
                    this._sessionSwitcherCommandQueue.push(function () {
                        return _this._pauseSession().then(function () {
                            return _this._resumeSession(session);
                        });
                    }, true);
                };
                VuforiaService.prototype._resumeSession = function (session) {
                    if (this._controllingSession)
                        throw new Error('Attempted to resume a session while a session is still in control');
                    if (session)
                        console.log("VuforiaService: Resuming session " + session.uri);
                    var initOptions = this._sessionInitOptions.get(session);
                    if (!initOptions) {
                        throw new Error('Attempted to resume a session without initialization options');
                    }
                    this._controllingSession = session;
                    var commandQueue = this._sessionCommandQueue.get(session);
                    if (this._sessionIsInitialized.get(session)) {
                        return this._init(session).then(function () {
                            commandQueue.execute();
                        }).catch(function (err) {
                            session.sendError(err);
                        });
                    }
                    else {
                        commandQueue.execute();
                        return this._sessionInitPromise.get(session);
                    }
                };
                VuforiaService.prototype._pauseSession = function () {
                    var _this = this;
                    var session = this._controllingSession;
                    if (!session)
                        return Promise.resolve(undefined);
                    console.log("VuforiaService: Pausing session " + session.uri);
                    var commandQueue = this._sessionCommandQueue.get(session);
                    return commandQueue.push(function () {
                        commandQueue.pause();
                        _this._controllingSession = undefined;
                        return _this._deinit(session);
                    }, true);
                };
                VuforiaService.prototype._cleanupSession = function (session) {
                    var _this = this;
                    if (!this._sessionInitOptions.has(session))
                        return;
                    // delete session init options
                    this._sessionInitOptions.delete(session);
                    var createdDataSets = this._sessionCreatedDataSets.get(session);
                    // Deactivate session datasets / trackables
                    console.log('VuforiaService: Deactivating datasets for session ' + session.uri);
                    this._sessionActivatedDataSets.get(session).forEach(function (id) {
                        _this.delegate.objectTrackerDeactivateDataSet(id);
                    });
                    this._sessionActivatedDataSets.delete(session);
                    // destroy session objects                   
                    console.log('VuforiaService: Destroying objects for session ' + session.uri);
                    createdDataSets.forEach(function (id) {
                        _this.delegate.objectTrackerDestroyDataSet(id);
                    });
                    this._sessionCreatedDataSets.delete(session);
                };
                VuforiaService.prototype._init = function (session) {
                    var _this = this;
                    console.log("Attempting to initialize vuforia for " + session.uri);
                    var options = this._sessionInitOptions.get(session);
                    return this.delegate.init(options).then(function (initResult) {
                        if (initResult !== VuforiaInitResult.SUCCESS) {
                            throw new Error("Vuforia init failed: " + VuforiaInitResult[initResult]);
                        }
                        // must initialize trackers before initializing the camera device
                        if (!_this.delegate.objectTrackerInit()) {
                            throw new Error("Vuforia init failed: Unable to initialize ObjectTracker");
                        }
                        // restore active datasets & trackables
                        var success = true;
                        _this._sessionActivatedDataSets.get(session).forEach(function (id) {
                            success = success && _this.delegate.objectTrackerActivateDataSet(id);
                            if (success) {
                                session.send('ar.vuforia.objectTrackerActivateDataSetEvent', { id: id });
                            }
                        });
                        if (!success) {
                            throw new Error("Vuforia init failed: Unable to restore active datasets");
                        }
                        // todo: also activate datasets / trackables created by other sessions
                        // (if this fails, then vuforia has probably started forbidding datasets created 
                        // by one developer account to work while using a license key from a different
                        // developer account, so no need to return a rejected promise in that case)
                        if (!_this.delegate.cameraDeviceInitAndStart()) {
                            throw new Error("Vuforia init failed: Unable to complete initialization");
                        }
                        console.log("Vuforia init success");
                    }).catch(function (err) {
                        console.log("Vuforia init fail: " + err.message);
                        _this._sessionInitOptions.delete(session);
                        _this._sessionIsInitialized.set(session, false);
                        _this._deinit(session);
                        _this._ensureActiveSession();
                        throw err;
                    });
                };
                VuforiaService.prototype._deinit = function (session) {
                    // Deactivate any activated datasets, stop trackers, and deinit. 
                    // Don't actually destroy created resources so we can use them to restore state. 
                    var _this = this;
                    var activatedDataSets = this._sessionActivatedDataSets.get(session);
                    if (activatedDataSets) {
                        activatedDataSets.forEach(function (id) {
                            _this.delegate.objectTrackerDeactivateDataSet(id);
                            session.send('ar.vuforia.objectTrackerDeactivateDataSetEvent', { id: id });
                        });
                    }
                    // right now the delegate.deinit() call deinitiailizes trackers and camera device for us. 
                    // May want to move here instead?
                    // const errors:Array<string> = [];
                    // if (!this.delegate.objectTrackerDeinit()) {
                    //     errors.push("Unable to deinitialize ObjectTracker");
                    // } 
                    // if (!this.delegate.cameraDeviceDeinit()) {
                    //     errors.push("Unable to deinitialize CameraDevice");
                    // }
                    this.delegate.deinit();
                    // if (errors.length > 0) {
                    //     throw new Error(errors.join('\n'));
                    // }
                };
                VuforiaService = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, focus_1.FocusService, VuforiaServiceDelegate)
                ], VuforiaService);
                return VuforiaService;
            }());
            exports_1("VuforiaService", VuforiaService);
            VuforiaAPI = (function () {
                function VuforiaAPI(manager) {
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
                    manager.on['ar.vuforia.objectTrackerActivateDataSetEvent'] = function (_a) {
                        var id = _a.id;
                        var dataSet = _this._dataSetMap.get(id);
                        dataSet._onActivate();
                        _this.dataSetActivateEvent.raiseEvent(dataSet);
                    };
                    manager.on['ar.vuforia.objectTrackerDeactivateDataSetEvent'] = function (_a) {
                        var id = _a.id;
                        var dataSet = _this._dataSetMap.get(id);
                        dataSet._onDeactivate();
                        _this.dataSetDeactivateEvent.raiseEvent(dataSet);
                    };
                }
                VuforiaObjectTracker.prototype.createDataSet = function (url) {
                    var _this = this;
                    if (url && window.document) {
                        url = utils_1.resolveURL(url);
                    }
                    return this.manager.request('ar.vuforia.objectTrackerCreateDataSet', { url: url }).then(function (message) {
                        var dataSet = new VuforiaDataSet(message.id, _this.manager);
                        _this._dataSetMap.set(message.id, dataSet);
                        return dataSet;
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
                    var _this = this;
                    return this.manager.request('ar.vuforia.dataSetLoad', { id: this.id }).then(function (trackables) {
                        _this._trackables = trackables;
                        return trackables;
                    });
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

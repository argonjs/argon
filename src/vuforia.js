var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { FocusService } from './focus';
import { SessionService } from './session';
import { Event, CommandQueue, resolveURL } from './utils';
/**
 * The set of possible error codes that can be returned from vuforia's
 * initialization function.
 */
export var VuforiaInitResult;
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
/**
 * An abstract class representing the Vuforia API.
 */
export class VuforiaServiceDelegateBase {
    constructor() {
        this.stateUpdateEvent = new Event();
    }
}
/**
 * An no-op implementation of VuforiaServiceDelegate.
 */
export class VuforiaServiceDelegate extends VuforiaServiceDelegateBase {
    isAvailable() { return false; }
    setHint(hint, value) { return true; }
    decryptLicenseKey(encryptedLicenseData, session) { return Promise.resolve(undefined); }
    init(options) { return Promise.resolve(VuforiaInitResult.SUCCESS); }
    deinit() { }
    cameraDeviceInitAndStart() { return true; }
    cameraDeviceSetFlashTorchMode(on) { return true; }
    objectTrackerInit() { return true; }
    objectTrackerCreateDataSet(url) { return ''; }
    objectTrackerDestroyDataSet(id) { return true; }
    objectTrackerActivateDataSet(id) { return true; }
    objectTrackerDeactivateDataSet(id) { return true; }
    dataSetFetch(id) { return Promise.resolve(undefined); }
    dataSetLoad(id) { return Promise.resolve(); }
}
/**
 * Mediates requests to the Vuforia API. Handles the following requests:
 * // TODO
 */
export let VuforiaService = class VuforiaService {
    constructor(sessionService, focusService, delegate) {
        this.sessionService = sessionService;
        this.focusService = focusService;
        this.delegate = delegate;
        this._sessionSwitcherCommandQueue = new CommandQueue();
        this._sessionCommandQueue = new WeakMap();
        this._sessionInitOptions = new WeakMap();
        this._sessionInitPromise = new WeakMap();
        this._sessionIsInitialized = new WeakMap();
        this._sessionCreatedDataSets = new WeakMap();
        this._sessionActivatedDataSets = new WeakMap();
        if (sessionService.isRealityManager) {
            this._sessionSwitcherCommandQueue.errorEvent.addEventListener((err) => {
                this.sessionService.errorEvent.raiseEvent(err);
            });
            sessionService.connectEvent.addEventListener((session) => {
                const commandQueue = new CommandQueue();
                commandQueue.errorEvent.addEventListener((err) => {
                    this.sessionService.errorEvent.raiseEvent(err);
                    session.sendError(err);
                });
                this._sessionCommandQueue.set(session, commandQueue);
                const createdDataSets = new Set();
                this._sessionCreatedDataSets.set(session, createdDataSets);
                const activatedDataSets = new Set();
                this._sessionActivatedDataSets.set(session, activatedDataSets);
                session.on['ar.vuforia.isAvailable'] = () => {
                    return Promise.resolve({ available: delegate.isAvailable() });
                };
                session.on['ar.vuforia.init'] = (options) => {
                    if (!delegate.isAvailable())
                        throw new Error("Vuforia is not supported");
                    if (this._sessionIsInitialized.get(session))
                        throw new Error("Vuforia has already been initialized");
                    if (!options.key && !options.encryptedLicenseData)
                        throw new Error("Expected `encryptedLicenseData` field. You can encrypt your Vuforia license key at http://docs.argonjs.io/start/vuforia-pgp-encryptor");
                    const keyPromise = options.key ?
                        Promise.resolve(options.key) :
                        delegate.decryptLicenseKey(options.encryptedLicenseData, session);
                    return keyPromise.then((key) => {
                        this._sessionInitOptions.set(session, {
                            key
                        });
                        const result = commandQueue.push(() => {
                            return this._init(session).then(() => {
                                this._sessionIsInitialized.set(session, true);
                            });
                        }, this._controllingSession === session);
                        if (this.focusService.session === session) {
                            this._setControllingSession(session);
                        }
                        this._sessionInitPromise.set(session, result);
                        return result;
                    });
                };
                session.on['ar.vuforia.objectTrackerCreateDataSet'] = ({ url }) => {
                    return commandQueue.push(() => {
                        const id = delegate.objectTrackerCreateDataSet(url);
                        if (id) {
                            createdDataSets.add(id);
                            return Promise.resolve({ id });
                        }
                        throw new Error('Unable to create DataSet');
                    }, this._controllingSession === session);
                };
                session.on['ar.vuforia.objectTrackerActivateDataSet'] = ({ id }) => {
                    return commandQueue.push(() => {
                        if (delegate.objectTrackerActivateDataSet(id)) {
                            activatedDataSets.add(id);
                            session.send('ar.vuforia.objectTrackerActivateDataSetEvent', { id });
                            return;
                        }
                        throw new Error(`Unable to activate DataSet (${id})`);
                    }, this._controllingSession === session);
                };
                session.on['ar.vuforia.objectTrackerDeactivateDataSet'] = ({ id }) => {
                    return commandQueue.push(() => {
                        if (delegate.objectTrackerDeactivateDataSet(id)) {
                            activatedDataSets.delete(id);
                            session.send('ar.vuforia.objectTrackerDeactivateDataSetEvent', { id });
                            return;
                        }
                        throw new Error(`Unable to deactivate DataSet (${id})`);
                    }, this._controllingSession === session);
                };
                session.on['ar.vuforia.dataSetFetch'] = ({ id }) => {
                    return commandQueue.push(() => {
                        return delegate.dataSetFetch(id);
                    }, this._controllingSession === session);
                };
                session.on['ar.vuforia.dataSetLoad'] = ({ id }) => {
                    return commandQueue.push(() => {
                        return delegate.dataSetLoad(id);
                    }, this._controllingSession === session);
                };
                session.closeEvent.addEventListener(() => {
                    if (this._controllingSession === session) {
                        commandQueue.clear();
                        commandQueue.push(() => {
                            this._cleanupSession(session);
                            setTimeout(() => {
                                this._ensureActiveSession();
                            }, 2000);
                        }, true);
                    }
                    else {
                        this._cleanupSession(session);
                    }
                });
            });
            focusService.sessionFocusEvent.addEventListener(({ current }) => {
                if (current && this._sessionInitOptions.get(current)) {
                    this._setControllingSession(current);
                }
            });
        }
    }
    ;
    isAvailable() {
        return this.sessionService.manager.request('ar.vuforia.isAvailable').then((message) => {
            return message.available;
        });
    }
    /**
     * Initialize vuforia with an unecrypted key. Manager-only, unless the "force" (flag) is used.
     * It's a bad idea to publish your private vuforia key on the internet.
     */
    initWithUnencryptedKey(options, force) {
        if (!force)
            this.sessionService.ensureIsRealityManager();
        return this.sessionService.manager.request('ar.vuforia.init', options).then(() => {
            return new VuforiaAPI(this.sessionService.manager);
        });
    }
    /**
     * Initialize vuforia using an encrypted license key.
     * You can encrypt your license key at http://docs.argonjs.io/start/vuforia-pgp-encryptor
     */
    init(options) {
        if (!options.encryptedLicenseData || typeof options.encryptedLicenseData !== 'string')
            throw new Error('options.encryptedLicenseData is required.');
        return this.sessionService.manager.request('ar.vuforia.init', options).then(() => {
            return new VuforiaAPI(this.sessionService.manager);
        });
    }
    _ensureActiveSession() {
        console.log("VuforiaService: Ensuring an active session is in control.");
        if (this._controllingSession && this._controllingSession.isConnected)
            return;
        this._selectControllingSession();
    }
    _selectControllingSession() {
        const focusSession = this.focusService.session;
        if (focusSession && this._sessionInitOptions.get(focusSession)) {
            this._setControllingSession(focusSession);
            return;
        }
        for (const session of this.sessionService.managedSessions) {
            if (this._sessionInitOptions.get(session)) {
                this._setControllingSession(session);
                return;
            }
        }
        if (this._sessionInitOptions.get(this.sessionService.manager))
            this._setControllingSession(this.sessionService.manager);
    }
    _setControllingSession(session) {
        if (this._controllingSession === session)
            return;
        console.log("VuforiaService: Setting controlling session to " + session.uri);
        this._sessionSwitcherCommandQueue.clear();
        this._sessionSwitcherCommandQueue.push(() => {
            return this._pauseSession().then(() => {
                return this._resumeSession(session);
            });
        }, true);
    }
    _resumeSession(session) {
        if (this._controllingSession)
            throw new Error('Attempted to resume a session while a session is still in control');
        if (session)
            console.log("VuforiaService: Resuming session " + session.uri);
        const initOptions = this._sessionInitOptions.get(session);
        if (!initOptions) {
            throw new Error('Attempted to resume a session without initialization options');
        }
        this._controllingSession = session;
        const commandQueue = this._sessionCommandQueue.get(session);
        if (this._sessionIsInitialized.get(session)) {
            return this._init(session).then(() => {
                commandQueue.execute();
            }).catch((err) => {
                session.sendError(err);
            });
        }
        else {
            commandQueue.execute();
            return this._sessionInitPromise.get(session);
        }
    }
    _pauseSession() {
        const session = this._controllingSession;
        if (!session)
            return Promise.resolve(undefined);
        console.log("VuforiaService: Pausing session " + session.uri);
        const commandQueue = this._sessionCommandQueue.get(session);
        return commandQueue.push(() => {
            commandQueue.pause();
            this._controllingSession = undefined;
            return this._deinit(session);
        }, true);
    }
    _cleanupSession(session) {
        if (!this._sessionInitOptions.has(session))
            return;
        // delete session init options
        this._sessionInitOptions.delete(session);
        const createdDataSets = this._sessionCreatedDataSets.get(session);
        // Deactivate session datasets / trackables
        console.log('VuforiaService: Deactivating datasets for session ' + session.uri);
        this._sessionActivatedDataSets.get(session).forEach((id) => {
            this.delegate.objectTrackerDeactivateDataSet(id);
        });
        this._sessionActivatedDataSets.delete(session);
        // destroy session objects                   
        console.log('VuforiaService: Destroying objects for session ' + session.uri);
        createdDataSets.forEach((id) => {
            this.delegate.objectTrackerDestroyDataSet(id);
        });
        this._sessionCreatedDataSets.delete(session);
    }
    _init(session) {
        console.log("Attempting to initialize vuforia for " + session.uri);
        const options = this._sessionInitOptions.get(session);
        return this.delegate.init(options).then((initResult) => {
            if (initResult !== VuforiaInitResult.SUCCESS) {
                throw new Error("Vuforia init failed: " + VuforiaInitResult[initResult]);
            }
            // must initialize trackers before initializing the camera device
            if (!this.delegate.objectTrackerInit()) {
                throw new Error("Vuforia init failed: Unable to initialize ObjectTracker");
            }
            // restore active datasets & trackables
            let success = true;
            this._sessionActivatedDataSets.get(session).forEach((id) => {
                success = success && this.delegate.objectTrackerActivateDataSet(id);
                if (success) {
                    session.send('ar.vuforia.objectTrackerActivateDataSetEvent', { id });
                }
            });
            if (!success) {
                throw new Error("Vuforia init failed: Unable to restore active datasets");
            }
            // todo: also activate datasets / trackables created by other sessions
            // (if this fails, then vuforia has probably started forbidding datasets created 
            // by one developer account to work while using a license key from a different
            // developer account, so no need to return a rejected promise in that case)
            if (!this.delegate.cameraDeviceInitAndStart()) {
                throw new Error("Vuforia init failed: Unable to complete initialization");
            }
            console.log("Vuforia init success");
        }).catch((err) => {
            console.log("Vuforia init fail: " + err.message);
            this._sessionInitOptions.delete(session);
            this._sessionIsInitialized.set(session, false);
            this._deinit(session);
            this._ensureActiveSession();
            throw err;
        });
    }
    _deinit(session) {
        // Deactivate any activated datasets, stop trackers, and deinit. 
        // Don't actually destroy created resources so we can use them to restore state. 
        const activatedDataSets = this._sessionActivatedDataSets.get(session);
        if (activatedDataSets) {
            activatedDataSets.forEach((id) => {
                this.delegate.objectTrackerDeactivateDataSet(id);
                session.send('ar.vuforia.objectTrackerDeactivateDataSetEvent', { id });
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
    }
};
VuforiaService = __decorate([
    inject(SessionService, FocusService, VuforiaServiceDelegate)
], VuforiaService);
export class VuforiaAPI {
    constructor(manager) {
        this.objectTracker = new VuforiaObjectTracker(manager);
    }
}
export class VuforiaTracker {
    constructor() {
    }
}
/**
 * Vuforia Object Tracker
 */
export class VuforiaObjectTracker extends VuforiaTracker {
    constructor(manager) {
        super();
        this.manager = manager;
        this._dataSetMap = new Map();
        this.dataSetActivateEvent = new Event();
        this.dataSetDeactivateEvent = new Event();
        manager.on['ar.vuforia.objectTrackerActivateDataSetEvent'] = ({ id }) => {
            const dataSet = this._dataSetMap.get(id);
            dataSet._onActivate();
            this.dataSetActivateEvent.raiseEvent(dataSet);
        };
        manager.on['ar.vuforia.objectTrackerDeactivateDataSetEvent'] = ({ id }) => {
            const dataSet = this._dataSetMap.get(id);
            dataSet._onDeactivate();
            this.dataSetDeactivateEvent.raiseEvent(dataSet);
        };
    }
    createDataSet(url) {
        if (url && window.document) {
            url = resolveURL(url);
        }
        return this.manager.request('ar.vuforia.objectTrackerCreateDataSet', { url }).then((message) => {
            const dataSet = new VuforiaDataSet(message.id, this.manager);
            this._dataSetMap.set(message.id, dataSet);
            return dataSet;
        });
    }
    activateDataSet(dataSet) {
        return this.manager.request('ar.vuforia.objectTrackerActivateDataSet', { id: dataSet.id });
    }
    deactivateDataSet(dataSet) {
        return this.manager.request('ar.vuforia.objectTrackerDeactivateDataSet', { id: dataSet.id });
    }
}
/**
 * A vuforia data set. TODO
 */
export class VuforiaDataSet {
    constructor(id, manager) {
        this.id = id;
        this.manager = manager;
        this._isActive = false;
    }
    _onActivate() {
        this._isActive = true;
    }
    _onDeactivate() {
        this._isActive = false;
    }
    fetch() {
        return this.manager.request('ar.vuforia.dataSetFetch', { id: this.id }).then(() => { });
    }
    load() {
        return this.manager.request('ar.vuforia.dataSetLoad', { id: this.id }).then((trackables) => {
            this._trackables = trackables;
            return trackables;
        });
    }
    isActive() {
        return this._isActive;
    }
    getTrackables() {
        return this._trackables;
    }
}

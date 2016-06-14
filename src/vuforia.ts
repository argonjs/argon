import {inject} from 'aurelia-dependency-injection'
import {defined, createGuid, JulianDate} from './cesium/cesium-imports'
import {Role, RealityView, SerializedFrameState, SerializedEntityPoseMap} from './common'
import {ContextService} from './context'
import {FocusService} from './focus'
import {RealityService, RealityLoader} from './reality'
import {SessionService, SessionPort} from './session'
import {Event, MessagePortLike, CommandQueue, resolveURL} from './utils'

/**
 * The set of options accepted by Vuforia for initialization.
 */
export interface VuforiaInitOptions {
    licenseKey?: string,
    encryptedLicenseData?: string
}

/**
 * The set of possible error codes that can be returned from vuforia's
 * initialization function.
 */
export enum VuforiaInitResult {
    SUCCESS = 100,
    /** Error during initialization. */
    INIT_ERROR = -1,
    /** The device is not supported. */
    INIT_DEVICE_NOT_SUPPORTED = -2,
    /** Cannot access the camera. */
    INIT_NO_CAMERA_ACCESS = -3,
    /** License key is missing. */
    INIT_LICENSE_ERROR_MISSING_KEY = -4,
    /** Invalid license key passed to SDK. */
    INIT_LICENSE_ERROR_INVALID_KEY = -5,
    /** Unable to verify license key due to network (Permanent error). */
    INIT_LICENSE_ERROR_NO_NETWORK_PERMANENT = -6,
    /** Unable to verify license key due to network (Transient error). */
    INIT_LICENSE_ERROR_NO_NETWORK_TRANSIENT = -7,
    /** Provided key is no longer valid. */
    INIT_LICENSE_ERROR_CANCELED_KEY = -8,
    /** Provided key is not valid for this product. */
    INIT_LICENSE_ERROR_PRODUCT_TYPE_MISMATCH = -9,
    /** Dependent external device not detected/plugged in. */
    INIT_EXTERNAL_DEVICE_NOT_DETECTED = -10
}

export const enum VuforiaHint {
    MaxSimultaneousImageTargets = 0,
    MaxSimultaneousObjectTargets = 1,
    DelayedLoadingObjectDatasets = 2
}

/**
 * An abstract class representing the Vuforia API. 
 */
export abstract class VuforiaServiceDelegateBase {
    abstract stateUpdateEvent: Event<SerializedFrameState>;
    abstract isAvailable(): boolean
    abstract setHint(hint: VuforiaHint, value: number): boolean;
    abstract init(options: VuforiaInitOptions): Promise<VuforiaInitResult>;
    abstract deinit(): void;
    abstract cameraDeviceInitAndStart(): boolean;
    // abstract cameraDeviceDeinit() : boolean;
    abstract cameraDeviceSetFlashTorchMode(on: boolean): boolean;
    abstract objectTrackerInit(): boolean;
    // abstract objectTrackerDeinit() : boolean;
    abstract objectTrackerStart(): boolean;
    abstract objectTrackerStop(): boolean;
    abstract objectTrackerCreateDataSet(url?: string): string;
    abstract objectTrackerDestroyDataSet(id: string): boolean;
    abstract objectTrackerActivateDataSet(id: string): boolean;
    abstract objectTrackerDeactivateDataSet(id: string): boolean;
    abstract dataSetFetch(id: string): Promise<void>;
    abstract dataSetLoad(id: string): Promise<VuforiaTrackables>;
}

/**
 * An no-op implementation of VuforiaServiceDelegate.
 */
export class VuforiaServiceDelegate extends VuforiaServiceDelegateBase {
    stateUpdateEvent = new Event<SerializedFrameState>()
    isAvailable() { return false }
    setHint(hint: VuforiaHint, value: number): boolean { return true }
    init(options: VuforiaInitOptions): Promise<VuforiaInitResult> { return null }
    deinit(): void { }
    cameraDeviceInitAndStart(): boolean { return true }
    cameraDeviceInit(): boolean { return true }
    // cameraDeviceDeinit() : boolean { return true }
    cameraDeviceSetFlashTorchMode(on: boolean): boolean { return true }
    objectTrackerInit(): boolean { return true }
    // objectTrackerDeinit() : boolean { return true }
    objectTrackerStart(): boolean { return true }
    objectTrackerStop(): boolean { return true }
    objectTrackerCreateDataSet(url?: string): string { return null }
    objectTrackerDestroyDataSet(id: string): boolean { return true }
    objectTrackerActivateDataSet(id: string): boolean { return true }
    objectTrackerDeactivateDataSet(id: string): boolean { return true }
    dataSetFetch(id: string): Promise<void> { return null }
    dataSetLoad(id: string): Promise<VuforiaTrackables> { return null }
}

/**
 * Mediates requests to the Vuforia API. Handles the following requests:
 * // TODO
 */
@inject(SessionService, FocusService, RealityService, VuforiaServiceDelegate)
export class VuforiaService {

    private _controllingSession: SessionPort = null;
    private _sessionSwitcherCommandQueue = new CommandQueue();
    private _sessionCommandQueue = new WeakMap<SessionPort, CommandQueue>();

    private _sessionInitOptions = new WeakMap<SessionPort, VuforiaInitOptions>();
    private _sessionInitPromise = new WeakMap<SessionPort, Promise<any>>();
    private _sessionIsInitialized = new WeakMap<SessionPort, boolean>();

    private _sessionObjectTrackerStarted = new WeakMap<SessionPort, boolean>();
    private _sessionCreatedDataSets = new WeakMap<SessionPort, Set<string>>();
    private _sessionActivatedDataSets = new WeakMap<SessionPort, Set<string>>();

    private _isInitialized = false;

    constructor(
        private sessionService: SessionService,
        private focusService: FocusService,
        private realityService: RealityService,
        private delegate: VuforiaServiceDelegate) {

        if (sessionService.isManager) {

            this._sessionSwitcherCommandQueue.errorEvent.addEventListener((err) => {
                this.sessionService.errorEvent.raiseEvent(err);
            })

            sessionService.connectEvent.addEventListener((session) => {

                const commandQueue = new CommandQueue();
                commandQueue.errorEvent.addEventListener((err) => {
                    this.sessionService.errorEvent.raiseEvent(err);
                    session.sendError(err);
                })
                this._sessionCommandQueue.set(session, commandQueue);

                const createdDataSets = new Set<string>();
                this._sessionCreatedDataSets.set(session, createdDataSets);

                const activatedDataSets = new Set<string>();
                this._sessionActivatedDataSets.set(session, activatedDataSets);

                session.on['ar.vuforia.isAvailable'] = () => {
                    return Promise.resolve({ available: delegate.isAvailable() });
                }

                session.on['ar.vuforia.init'] = (options: VuforiaInitOptions, event) => {
                    if (!delegate.isAvailable()) throw new Error("Vuforia is not supported");
                    if (this._sessionIsInitialized.get(session)) throw new Error("Vuforia has already been initialized");

                    this._sessionInitOptions.set(session, options);

                    const result = commandQueue.push(() => {
                        return this._init(session).then(() => {
                            this._sessionIsInitialized.set(session, true);
                        })
                    }, this._controllingSession === session);

                    if (this.focusService.getSession() === session) {
                        this._setControllingSession(session);
                    }

                    this._sessionInitPromise.set(session, result);

                    return result;
                }

                session.on['ar.vuforia.objectTrackerCreateDataSet'] = ({url}: { url: string }, event) => {
                    return commandQueue.push(() => {
                        const id = delegate.objectTrackerCreateDataSet(url);
                        if (id) {
                            createdDataSets.add(id);
                            return Promise.resolve({ id });
                        }
                        throw new Error('Unable to create DataSet');
                    }, this._controllingSession === session);
                }

                session.on['ar.vuforia.objectTrackerActivateDataSet'] = ({id}: { id: string }, event) => {
                    return commandQueue.push(() => {
                        if (delegate.objectTrackerActivateDataSet(id)) {
                            activatedDataSets.add(id);
                            session.send('ar.vuforia.objectTrackerActivateDataSetEvent', { id });
                            return;
                        }
                        throw new Error(`Unable to activate DataSet (${id})`);
                    }, this._controllingSession === session);
                }

                session.on['ar.vuforia.objectTrackerDeactivateDataSet'] = ({id}: { id: string }, event) => {
                    return commandQueue.push(() => {
                        if (delegate.objectTrackerDeactivateDataSet(id)) {
                            activatedDataSets.delete(id);
                            session.send('ar.vuforia.objectTrackerDeactivateDataSetEvent', { id });
                            return;
                        }
                        throw new Error(`Unable to deactivate DataSet (${id})`);
                    }, this._controllingSession === session);
                }

                session.on['ar.vuforia.dataSetFetch'] = ({id}: { id: string }, event) => {
                    return commandQueue.push(() => {
                        return delegate.dataSetFetch(id)
                    }, this._controllingSession === session);
                }

                session.on['ar.vuforia.dataSetLoad'] = ({id}: { id: string }, event) => {
                    return commandQueue.push(() => {
                        return delegate.dataSetLoad(id)
                    }, this._controllingSession === session);
                }

                session.closeEvent.addEventListener(() => {
                    if (this._controllingSession === session) {
                        commandQueue.clear();
                        commandQueue.push(() => {
                            this._cleanupSession(session);
                            setTimeout(() => {
                                this._ensureActiveSession();
                            }, 2000);
                        }, true);
                    } else {
                        this._cleanupSession(session);
                    }
                });

            });

            focusService.sessionFocusEvent.addEventListener(({current}) => {
                if (this._sessionInitOptions.get(current)) {
                    this._setControllingSession(current);
                }
            });
        }

    };

    public isAvailable(): Promise<boolean> {
        return this.sessionService.manager.request('ar.vuforia.isAvailable').then((message: { available: boolean }) => {
            return message.available;
        });
    }

    public init(options: VuforiaInitOptions): Promise<VuforiaAPI> {
        return this.sessionService.manager.request('ar.vuforia.init', options).then(() => {
            return new VuforiaAPI(this.sessionService.manager);
        });
    }

    private _ensureActiveSession() {
        console.log("VuforiaService: Ensuring an active session is in control.")
        if (this._controllingSession && this._controllingSession.isConnected)
            return;
        this._selectControllingSession();
    }

    private _selectControllingSession() {
        const focusSession = this.focusService.getSession();

        if (this._sessionInitOptions.get(focusSession)) {
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

    private _setControllingSession(session: SessionPort): void {
        if (this._controllingSession === session) return;

        console.log("VuforiaService: Setting controlling session to " + session.info.name)
        this._sessionSwitcherCommandQueue.clear();
        this._sessionSwitcherCommandQueue.push(() => {
            return this._pauseSession().then(() => {
                return this._resumeSession(session);
            })
        }, true);
    }

    private _resumeSession(session: SessionPort): Promise<void> {
        if (this._controllingSession) throw new Error('Attempted to resume a session while a session is still in control')

        if (session) console.log("VuforiaService: Resuming session " + session.info.name);

        const initOptions = this._sessionInitOptions.get(session);
        if (!initOptions) {
            throw new Error('Attempted to resume a session without initialization options');
        }

        this._controllingSession = session;
        const commandQueue = this._sessionCommandQueue.get(session);
        if (this._sessionIsInitialized.get(session)) {
            return this._init(session).then(() => {
                commandQueue.execute();
            }).catch((err: Error) => {
                session.sendError(err);
            });
        } else {
            commandQueue.execute();
            return this._sessionInitPromise.get(session);
        }
    }

    private _pauseSession(): Promise<void> {
        const session = this._controllingSession;
        if (!session) return Promise.resolve(undefined);

        console.log("VuforiaService: Pausing session " + session.info.name);
        const commandQueue = this._sessionCommandQueue.get(session);
        return commandQueue.push(() => {
            commandQueue.pause();
            this._controllingSession = null;
            return this._deinit(session);
        }, true);
    }

    private _cleanupSession(session: SessionPort) {

        if (!this._sessionInitOptions.has(session)) return;

        // delete session init options
        this._sessionInitOptions.delete(session);
        const createdDataSets = this._sessionCreatedDataSets.get(session);

        // Deactivate session datasets / trackables
        console.log('VuforiaService: Deactivating datasets for session ' + session.info.name);
        this._sessionActivatedDataSets.get(session).forEach((id) => {
            this.delegate.objectTrackerDeactivateDataSet(id);
        })
        this._sessionActivatedDataSets.delete(session);

        // destroy session objects                   
        console.log('VuforiaService: Destroying objects for session ' + session.info.name);
        createdDataSets.forEach((id) => {
            this.delegate.objectTrackerDestroyDataSet(id);
        })
        this._sessionCreatedDataSets.delete(session);
    }

    private _init(session: SessionPort) {
        const options = this._sessionInitOptions.get(session);

        return this.delegate.init(options).then((initResult: VuforiaInitResult) => {

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
            })

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

            // trackers get started after camera is initialized and started

            if (!this.delegate.objectTrackerStart()) {
                throw new Error("Vuforia init failed: Unable to start ObjectTracker");
            }

        }).catch((err) => {

            this._sessionInitOptions.set(session, null);
            this._sessionIsInitialized.set(session, false);
            this._deinit(session);
            this._ensureActiveSession();

            throw err;
        });
    }

    private _deinit(session: SessionPort) {
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

}

export class VuforiaAPI {
    constructor(private manager: SessionPort) {
        this.objectTracker = new VuforiaObjectTracker(manager);
    }
    public objectTracker: VuforiaObjectTracker;
}

export abstract class VuforiaTracker {
    constructor() { }
}

/**
 * Vuforia Object Tracker
 */
export class VuforiaObjectTracker extends VuforiaTracker {

    private _dataSetMap = new Map<string, VuforiaDataSet>();

    constructor(private manager: SessionPort) {
        super();

        manager.on['ar.vuforia.objectTrackerActivateDataSetEvent'] = ({id}: { id: string }, event) => {
            const dataSet = this._dataSetMap.get(id);
            dataSet._onActivate();
            this.dataSetActivateEvent.raiseEvent(dataSet);
        }

        manager.on['ar.vuforia.objectTrackerDeactivateDataSetEvent'] = ({id}: { id: string }, event) => {
            const dataSet = this._dataSetMap.get(id);
            dataSet._onDeactivate();
            this.dataSetDeactivateEvent.raiseEvent(dataSet);
        }
    }

    public dataSetActivateEvent = new Event<VuforiaDataSet>();
    public dataSetDeactivateEvent = new Event<VuforiaDataSet>();

    public createDataSet(url?: string): Promise<VuforiaDataSet> {
        if (url && window.document) {
            url = resolveURL(url);
        }
        return this.manager.request('ar.vuforia.objectTrackerCreateDataSet', { url }).then((message: { id: string }) => {
            const dataSet = new VuforiaDataSet(message.id, this.manager);
            this._dataSetMap.set(message.id, dataSet);
            return dataSet;
        })
    }

    public activateDataSet(dataSet: VuforiaDataSet): Promise<void> {
        return this.manager.request('ar.vuforia.objectTrackerActivateDataSet', { id: dataSet.id });
    }

    public deactivateDataSet(dataSet: VuforiaDataSet): Promise<void> {
        return this.manager.request('ar.vuforia.objectTrackerDeactivateDataSet', { id: dataSet.id });
    }
}


/**
 * A vuforia data set. TODO
 */
export class VuforiaDataSet {

    private _isLoaded = false;
    private _isActive = false;
    private _trackables: VuforiaTrackables;

    private _fetchResponse: Promise<void>
    private _loadResponse: Promise<VuforiaTrackables>

    constructor(public id: string, private manager: SessionPort) { }

    _onActivate() {
        this._isActive = true;
    }

    _onDeactivate() {
        this._isActive = false;
    }

    public fetch(): Promise<void> {
        return this.manager.request('ar.vuforia.dataSetFetch', { id: this.id }).then(() => { });
    }

    public load(): Promise<VuforiaTrackables> {
        return this.manager.request('ar.vuforia.dataSetLoad', { id: this.id }).then((trackables: VuforiaTrackables) => {
            this._trackables = trackables;
            return trackables;
        });
    }

    public isActive() {
        return this._isActive;
    }

    public getTrackables(): VuforiaTrackables {
        return this._trackables;
    }
}

/**
 * A map from names of trackable data sets to their ids, names, and sizes TODO
 */
export interface VuforiaTrackables {
    [name: string]: {
        id: string,
        size?: { x: number, y: number, z: number }
    }
}

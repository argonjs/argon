import {inject} from 'aurelia-dependency-injection';
import {defined} from './cesium/cesium-imports'
import {Role} from './config'
import {ContextService} from './context'
import {FocusService} from './focus';
import {RealityService, Reality, RealitySetupHandler, MinimalFrameState} from './reality'
import {SessionService, SessionPort} from './session';
import {Event, MessagePortLike, CommandQueue, resolveURL} from './utils'

/** An error that occured in vuforia while initializing. */
export class VuforiaInitError extends Error { constructor(message: string, public code: VuforiaInitErrorCode) { super(message) } }
/** An error that occured in vuforia while loading a data set. */
export class VuforiaLoadDataSetError extends Error { constructor(message: string) { super(message) } }
/** An error that occured in vuforia while unloading a data set. */
export class VuforiaUnloadDataSetError extends Error { constructor(message: string) { super(message) } }
/** An error that occured in vuforia while activating a data set. */
export class VuforiaActivateDataSetError extends Error { constructor(message: string) { super(message) } }
/** An error that occured in vuforia while deactivating a data set. */
export class VuforiaDeactivateDataSetError extends Error { constructor(message: string) { super(message) } }

/**
 * The set of possible error codes that can be returned from vuforia's
 * initialization function.
 */
export enum VuforiaInitErrorCode {
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
};

/**
 * The different kinds of errors that vuforia can raise.
 */
export enum VuforiaErrorType {
    InitError = "InitError" as any,
    LoadDataSetError = "LoadDataSetError" as any,
    UnloadDataSetError = "UnloadDataSetError" as any,
    ActivateDataSetError = "ActivateDataSetError" as any,
    DeactivateDataSetError = "DeactivateDataSetError" as any,
}


/**
 * An abstract class representing the functionality needed to implement
 * Vuforia's functionality for a `VuforiaService`. This is a null
 * implementation that simply does nothing in response to all requests.
 */
export abstract class VuforiaServiceDelegateBase {
    abstract isSupported(): boolean;
    abstract init(options: VuforiaInitOptions): any | PromiseLike<void>;
    abstract deinit(): any | PromiseLike<any>;
    abstract startCamera(): any | PromiseLike<any>;
    abstract stopCamera(): any | PromiseLike<any>;
    abstract startObjectTracker(): any | PromiseLike<any>;
    abstract stopObjectTracker(): any | PromiseLike<any>;
    abstract hintMaxSimultaneousImageTargets(max: number): any | PromiseLike<any>;
    abstract setVideoBackgroundConfig(videoConfig: VuforiaVideoBackgroundConfig): any | PromiseLike<any>;
    abstract loadDataSet(url): any | PromiseLike<any>;
    abstract unloadDataSet(url): any | PromiseLike<any>;
    abstract activateDataSet(url): any | PromiseLike<any>;
    abstract deactivateDataSet(url): any | PromiseLike<any>;
    abstract getVideoMode(): VuforiaVideoMode;
    updateEvent = new Event<MinimalFrameState>();
    errorEvent = new Event<VuforiaErrorMessage>();
    dataSetLoadEvent = new Event<VuforiaDataSetLoadMessage>();
}

/**
 * An no-op implementation of VuforiaServiceDelegate.
 */
export class VuforiaServiceDelegate extends VuforiaServiceDelegateBase {
    isSupported() { return false }
    init(options: VuforiaInitOptions): any | PromiseLike<void> { }
    deinit(): any | PromiseLike<any> { }
    startCamera(): any | PromiseLike<any> { }
    stopCamera(): any | PromiseLike<any> { }
    startObjectTracker(): any | PromiseLike<any> { }
    stopObjectTracker(): any | PromiseLike<any> { }
    hintMaxSimultaneousImageTargets(max: number): any | PromiseLike<any> { }
    setVideoBackgroundConfig(videoConfig: VuforiaVideoBackgroundConfig): any | PromiseLike<any> { }
    loadDataSet(url): any | PromiseLike<any> { }
    unloadDataSet(url): any | PromiseLike<any> { }
    activateDataSet(url): any | PromiseLike<any> { }
    deactivateDataSet(url): any | PromiseLike<any> { }
    getVideoMode(): VuforiaVideoMode { return null };
}

/**
 * The set of options accepted by Vuforia for initialization.
 */
export interface VuforiaInitOptions {
    licenseKey?: string,
    encryptedLicenseData?: string
}

/**
 * Options for changing vuforia's background.
 */
export interface VuforiaVideoBackgroundConfig {
    /** Whether the video is currently being captured and displayed. */
    enabled: boolean;
    /** The offset of the video in pixels in the horizontal direction. */
    positionX: number;
    /** The offset of the video in pixels in the vertical direction. */
    positionY: number;
    /** The width of the video in pixels. */
    sizeX: number;
    /** The height of the video in pixels. */
    sizeY: number;
}

/**
 * Informtion on how video is being displayed by vuforia.
 */
export interface VuforiaVideoMode {
    /** The width of the video in pixels. */
    width: number,
    /** The height of the video in pixels. */
    height: number,
    /** The number of frames being displayed per second in the video at this moment. */
    framerate: number
}

/**
 * An error originating from vuforia.
 */
export interface VuforiaErrorMessage {
    /** The type of error that was raised. */
    type: VuforiaErrorType,
    /** A message giving more detail on the error. */
    message: string,
    /** Any additional data related to the error. */
    data?: any
}

/**
 * The response from vuforia once a data set has been loaded.
 */
export interface VuforiaDataSetLoadMessage {
    /** The url from which the data set was loaded. */
    url: string,
    /** The data set loaded. */
    trackables: VuforiaTrackables
}

@inject(SessionService, VuforiaServiceDelegate)
export class VuforiaRealitySetupHandler implements RealitySetupHandler {
    public type = 'vuforia';

    constructor(private sessionService: SessionService, private delegate: VuforiaServiceDelegate) { }

    public setup(reality: Reality, port: MessagePortLike): void {
        const remoteRealitySession = this.sessionService.createSessionPort();

        remoteRealitySession.connectEvent.addEventListener(() => {
            remoteRealitySession.send('ar.vuforia.init');
            remoteRealitySession.send('ar.vuforia.startCamera');
        });

        const remove = this.delegate.updateEvent.addEventListener((frameState) => {
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

        remoteRealitySession.closeEvent.addEventListener(() => {
            remove();
        });

        remoteRealitySession.open(port, { role: Role.REALITY });
    }
}

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
@inject(SessionService, FocusService, RealityService, VuforiaServiceDelegate)
export class VuforiaService {

    private _commandQueue = new CommandQueue;

    private _sessionInitOptions = new WeakMap<SessionPort, VuforiaInitOptions>();
    private _sessionCameraStarted = new WeakMap<SessionPort, boolean>();
    private _sessionObjectTrackerStarted = new WeakMap<SessionPort, boolean>();
    private _sessionMaxSimultaneousImageTargets = new WeakMap<SessionPort, number>();
    private _sessionLoadedDataSets = new WeakMap<SessionPort, Set<string>>();
    private _sessionActivatedDataSets = new WeakMap<SessionPort, Set<string>>();
    private _controllingSession: SessionPort = null;
    private _isInitialized = false;

    private _dataSetMap = new Map<string, VuforiaDataSet>();

    constructor(
        private sessionService: SessionService,
        private focusService: FocusService,
        private realityService: RealityService,
        private delegate: VuforiaServiceDelegate) {

        if (sessionService.isManager()) {
            sessionService.connectEvent.addEventListener((session) => {

                const loadedDataSets = new Set<string>();
                this._sessionLoadedDataSets.set(session, loadedDataSets);

                const activatedDataSets = new Set<string>();
                this._sessionActivatedDataSets.set(session, activatedDataSets);

                session.on['ar.vuforia.isSupported'] = () => {
                    return delegate.isSupported();
                }
                session.on['ar.vuforia.init'] = (options: VuforiaInitOptions, event) => {
                    if (!delegate.isSupported()) return;
                    this._sessionInitOptions.set(session, options);
                    if (this._controllingSession === null || session === focusService.currentSession) {
                        this._initVuforia(session);
                    }
                }
                session.on['ar.vuforia.deinit'] = (options, event) => {
                    if (session === this._controllingSession) {
                        if (this._sessionInitOptions.has(session)) {
                            this._commandQueue.clear();
                            this._commandQueue.push(() => {
                                return Promise.resolve(delegate.deinit()).then(() => {
                                    this._isInitialized = false;
                                });
                            }, session);
                        }
                    }
                    this._sessionInitOptions.delete(session);
                }
                session.on['ar.vuforia.startCamera'] = (message, event) => {
                    if (session === this._controllingSession) {
                        if (!this._sessionCameraStarted.get(session))
                            this._commandQueue.push(() => delegate.startCamera()), session;
                    }
                    this._sessionCameraStarted.set(session, true);
                }
                session.on['ar.vuforia.stopCamera'] = (message, event) => {
                    if (session === this._controllingSession) {
                        if (this._sessionCameraStarted.get(session))
                            this._commandQueue.push(() => delegate.stopCamera(), session);
                    }
                    this._sessionCameraStarted.set(session, false);
                }
                session.on['ar.vuforia.startObjectTracker'] = (message, event) => {
                    if (session === this._controllingSession) {
                        if (!this._sessionObjectTrackerStarted.get(session))
                            this._commandQueue.push(() => delegate.startObjectTracker()), session;
                    }
                    this._sessionObjectTrackerStarted.set(session, true);
                }
                session.on['ar.vuforia.stopObjectTracker'] = (message, event) => {
                    if (session === this._controllingSession) {
                        if (this._sessionObjectTrackerStarted.get(session))
                            this._commandQueue.push(() => delegate.stopObjectTracker(), session);
                    }
                    this._sessionObjectTrackerStarted.set(session, false);
                }
                session.on['ar.vuforia.hintMaxSimultaneousImageTargets'] = ({max}) => {
                    if (session === this._controllingSession) {
                        this._commandQueue.push(() => delegate.hintMaxSimultaneousImageTargets(max), session);
                    }
                    this._sessionMaxSimultaneousImageTargets.set(session, max);
                }
                session.on['ar.vuforia.loadDataSet'] = ({url}, event) => {
                    if (session === this._controllingSession) {
                        if (!loadedDataSets.has(url))
                            this._commandQueue.push(() => delegate.loadDataSet(url), session);
                    }
                    loadedDataSets.add(url);
                }
                session.on['ar.vuforia.unloadDataSet'] = ({url}, event) => {
                    if (session === this._controllingSession) {
                        if (loadedDataSets.has(url))
                            this._commandQueue.push(() => delegate.unloadDataSet(url), session);
                    }
                    loadedDataSets.delete(url);
                    activatedDataSets.delete(url);
                }
                session.on['ar.vuforia.activateDataSet'] = ({url}, event) => {
                    if (session === this._controllingSession) {
                        if (!loadedDataSets.has(url))
                            this._commandQueue.push(() => delegate.loadDataSet(url), session);
                        if (!activatedDataSets.has(url))
                            this._commandQueue.push(() => delegate.activateDataSet(url), session);
                    }
                    loadedDataSets.add(url);
                    activatedDataSets.add(url);
                }
                session.on['ar.vuforia.deactivateDataSet'] = ({url}, event) => {
                    if (session === this._controllingSession) {
                        if (activatedDataSets.has(url))
                            this._commandQueue.push(() => delegate.deactivateDataSet(url), session);
                    }
                    activatedDataSets.delete(url);
                }
                session.closeEvent.addEventListener(() => {
                    this._commandQueue.push(() => delegate.stopObjectTracker(), session);
                    loadedDataSets.forEach((url) => {
                        this._commandQueue.push(() => delegate.deactivateDataSet(url), session);
                        this._commandQueue.push(() => delegate.unloadDataSet(url), session);
                    })
                    this._controllingSession = null;
                })
            })
        }

        sessionService.manager.on['ar.vuforia.errorEvent'] = (err: VuforiaErrorMessage, event) => {
            let error = null;
            switch (err.type) {
                case VuforiaErrorType.InitError: error = new VuforiaInitError(err.message, err.data.code); break;
                case VuforiaErrorType.LoadDataSetError: error = new VuforiaLoadDataSetError(err.message); break;
                case VuforiaErrorType.UnloadDataSetError: error = new VuforiaUnloadDataSetError(err.message); break;
                case VuforiaErrorType.ActivateDataSetError: error = new VuforiaActivateDataSetError(err.message); break;
                default: error = new Error(err.message); break;
            }
            sessionService.errorEvent.raiseEvent(error);
        }

        sessionService.manager.on['ar.vuforia.dataSetLoadEvent'] = (msg: VuforiaDataSetLoadMessage, event) => {
            const {url, trackables} = msg;
            const dataSet = this._dataSetMap.get(url);
            dataSet._resolveTrackables(trackables);
        }

        focusService.sessionFocusEvent.addEventListener((session) => {
            if (this._sessionInitOptions.has(session)) {
                this._initVuforia(session)
            }
        })

        delegate.errorEvent.addEventListener((msg) => {
            const session = <SessionPort>this._commandQueue.currentUserData;
            if (msg.type === VuforiaErrorType.InitError) {
                this._sessionInitOptions.delete(session);
                this._controllingSession = null;
                this._isInitialized = false;
                this._commandQueue.clear();
            }
            session.send('ar.vuforia.errorEvent', msg);
        })

        delegate.dataSetLoadEvent.addEventListener((msg) => {
            const session = <SessionPort>this._commandQueue.currentUserData;
            session.send('ar.vuforia.dataSetLoadEvent', msg);
        })

    };

    public isSupported(): PromiseLike<boolean> {
        return this.sessionService.manager.request('ar.vuforia.isSupported');
    }

    public init(options?: VuforiaInitOptions) {
        this.sessionService.manager.send('ar.vuforia.init', options)
    }

    public deinit() {
        this.sessionService.manager.send('ar.vuforia.deinit');
    }

    public startCamera() {
        this.sessionService.manager.send('ar.vuforia.startCamera')
    }

    public stopCamera() {
        this.sessionService.manager.send('ar.vuforia.stopCamera')
    }

    public startObjectTracker() {
        this.sessionService.manager.send('ar.vuforia.startObjectTracker')
    }

    public stopObjectTracker() {
        this.sessionService.manager.send('ar.vuforia.stopObjectTracker')
    }

    public hintMaxSimultaneousImageTargets(max) {
        this.sessionService.manager.send('ar.vuforia.hintMaxSimultaneousImageTargets', { max })
    }

    public createDataSet(url): VuforiaDataSet {
        url = resolveURL(url);
        const dataSet = new VuforiaDataSet(url, this.sessionService.manager);
        this._dataSetMap.set(url, dataSet);
        return dataSet;
    }

    private _initVuforia(session: SessionPort) {
        const queue = this._commandQueue;
        const initOptions = this._sessionInitOptions.get(session);
        const maxSimultaneousImageTargets = this._sessionMaxSimultaneousImageTargets.get(session);
        const cameraStarted = this._sessionCameraStarted.get(session);
        const objectTrackerStarted = this._sessionObjectTrackerStarted.get(session);
        const loadedDataSets = this._sessionLoadedDataSets.get(session);
        const activatedDataSets = this._sessionActivatedDataSets.get(session);
        const delegate = this.delegate;

        if (this._isInitialized) {
            queue.clear();
            queue.push(() => {
                return delegate.deinit().then(() => {
                    this._isInitialized = false;
                });
            }, this._controllingSession);
        }
        this._controllingSession = session;

        queue.push(() => {
            this._isInitialized = true;
            return delegate.init(initOptions || {});
        }, session);

        if (cameraStarted) queue.push(() => delegate.startCamera(), session);
        if (objectTrackerStarted) queue.push(() => delegate.startObjectTracker(), session);

        queue.push(() => delegate.hintMaxSimultaneousImageTargets(maxSimultaneousImageTargets || 1), session);

        loadedDataSets.forEach((url) => {
            queue.push(() => delegate.loadDataSet(url), session);
        });

        activatedDataSets.forEach((url) => {
            queue.push(() => delegate.activateDataSet(url), session);
        });
    }

}

/**
 * A map from names of trackable data sets to their ids, names, and sizes TODO
 */
export interface VuforiaTrackables {
    [name: string]: {
        id: string,
        name: string,
        size?: number[]
    }
}

/**
 * A vuforia data set. TODO
 */
export class VuforiaDataSet {
    constructor(public url: string, private manager: SessionPort) { }
    private _loaded = false;
    private _activated = false;
    _resolveTrackables: (value: VuforiaTrackables) => void;
    private _trackablesPromise = new Promise<VuforiaTrackables>((resolve, reject) => { this._resolveTrackables = resolve });
    get loaded() { return this._loaded }
    get activated() { return this._activated }
    load() { this._loaded = true; this.manager.send('ar.vuforia.loadDataSet', { url: this.url }) }
    unload() { this._loaded = false; this._activated = false; this.manager.send('ar.vuforia.unloadDataSet', { url: this.url }) }
    activate() { this._loaded = true; this._activated = true; this.manager.send('ar.vuforia.activateDataSet', { url: this.url }) }
    deactivate() { this._activated = false; this.manager.send('ar.vuforia.deactivateDataSet', { url: this.url }) }
    get trackablesPromise() { return this._trackablesPromise }
}

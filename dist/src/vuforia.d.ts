import { FocusService } from './focus';
import { RealityService, Reality, RealitySetupHandler, MinimalFrameState } from './reality';
import { SessionService, SessionPort } from './session';
import { Event, MessagePortLike } from './utils';
/** An error that occured in vuforia while initializing. */
export declare class VuforiaInitError extends Error {
    code: VuforiaInitErrorCode;
    constructor(message: string, code: VuforiaInitErrorCode);
}
/** An error that occured in vuforia while loading a data set. */
export declare class VuforiaLoadDataSetError extends Error {
    constructor(message: string);
}
/** An error that occured in vuforia while unloading a data set. */
export declare class VuforiaUnloadDataSetError extends Error {
    constructor(message: string);
}
/** An error that occured in vuforia while activating a data set. */
export declare class VuforiaActivateDataSetError extends Error {
    constructor(message: string);
}
/** An error that occured in vuforia while deactivating a data set. */
export declare class VuforiaDeactivateDataSetError extends Error {
    constructor(message: string);
}
/**
 * The set of possible error codes that can be returned from vuforia's
 * initialization function.
 */
export declare enum VuforiaInitErrorCode {
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
    INIT_EXTERNAL_DEVICE_NOT_DETECTED = -10,
}
/**
 * The different kinds of errors that vuforia can raise.
 */
export declare enum VuforiaErrorType {
    InitError,
    LoadDataSetError,
    UnloadDataSetError,
    ActivateDataSetError,
    DeactivateDataSetError,
}
/**
 * An abstract class representing the functionality needed to implement
 * Vuforia's functionality for a `VuforiaService`. This is a null
 * implementation that simply does nothing in response to all requests.
 */
export declare abstract class VuforiaServiceDelegateBase {
    abstract isSupported(): boolean;
    abstract init(options: VuforiaInitOptions): any | PromiseLike<void>;
    abstract deinit(): any | PromiseLike<any>;
    abstract startCamera(): any | PromiseLike<any>;
    abstract stopCamera(): any | PromiseLike<any>;
    abstract startObjectTracker(): any | PromiseLike<any>;
    abstract stopObjectTracker(): any | PromiseLike<any>;
    abstract hintMaxSimultaneousImageTargets(max: number): any | PromiseLike<any>;
    abstract setVideoBackgroundConfig(videoConfig: VuforiaVideoBackgroundConfig): any | PromiseLike<any>;
    abstract loadDataSet(url: any): any | PromiseLike<any>;
    abstract unloadDataSet(url: any): any | PromiseLike<any>;
    abstract activateDataSet(url: any): any | PromiseLike<any>;
    abstract deactivateDataSet(url: any): any | PromiseLike<any>;
    abstract getVideoMode(): VuforiaVideoMode;
    updateEvent: Event<MinimalFrameState>;
    errorEvent: Event<VuforiaErrorMessage>;
    dataSetLoadEvent: Event<VuforiaDataSetLoadMessage>;
}
/**
 * An no-op implementation of VuforiaServiceDelegate.
 */
export declare class VuforiaServiceDelegate extends VuforiaServiceDelegateBase {
    isSupported(): boolean;
    init(options: VuforiaInitOptions): any | PromiseLike<void>;
    deinit(): any | PromiseLike<any>;
    startCamera(): any | PromiseLike<any>;
    stopCamera(): any | PromiseLike<any>;
    startObjectTracker(): any | PromiseLike<any>;
    stopObjectTracker(): any | PromiseLike<any>;
    hintMaxSimultaneousImageTargets(max: number): any | PromiseLike<any>;
    setVideoBackgroundConfig(videoConfig: VuforiaVideoBackgroundConfig): any | PromiseLike<any>;
    loadDataSet(url: any): any | PromiseLike<any>;
    unloadDataSet(url: any): any | PromiseLike<any>;
    activateDataSet(url: any): any | PromiseLike<any>;
    deactivateDataSet(url: any): any | PromiseLike<any>;
    getVideoMode(): VuforiaVideoMode;
}
/**
 * The set of options accepted by Vuforia for initialization.
 */
export interface VuforiaInitOptions {
    licenseKey?: string;
    encryptedLicenseData?: string;
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
    width: number;
    /** The height of the video in pixels. */
    height: number;
    /** The number of frames being displayed per second in the video at this moment. */
    framerate: number;
}
/**
 * An error originating from vuforia.
 */
export interface VuforiaErrorMessage {
    /** The type of error that was raised. */
    type: VuforiaErrorType;
    /** A message giving more detail on the error. */
    message: string;
    /** Any additional data related to the error. */
    data?: any;
}
/**
 * The response from vuforia once a data set has been loaded.
 */
export interface VuforiaDataSetLoadMessage {
    /** The url from which the data set was loaded. */
    url: string;
    /** The data set loaded. */
    trackables: VuforiaTrackables;
}
export declare class VuforiaRealitySetupHandler implements RealitySetupHandler {
    private sessionService;
    private delegate;
    type: string;
    constructor(sessionService: SessionService, delegate: VuforiaServiceDelegate);
    setup(reality: Reality, port: MessagePortLike): void;
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
export declare class VuforiaService {
    private sessionService;
    private focusService;
    private realityService;
    private delegate;
    private _commandQueue;
    private _sessionInitOptions;
    private _sessionCameraStarted;
    private _sessionObjectTrackerStarted;
    private _sessionMaxSimultaneousImageTargets;
    private _sessionLoadedDataSets;
    private _sessionActivatedDataSets;
    private _controllingSession;
    private _isInitialized;
    private _dataSetMap;
    constructor(sessionService: SessionService, focusService: FocusService, realityService: RealityService, delegate: VuforiaServiceDelegate);
    isSupported(): PromiseLike<boolean>;
    init(options?: VuforiaInitOptions): void;
    deinit(): void;
    startCamera(): void;
    stopCamera(): void;
    startObjectTracker(): void;
    stopObjectTracker(): void;
    hintMaxSimultaneousImageTargets(max: any): void;
    createDataSet(url: any): VuforiaDataSet;
    private _initVuforia(session);
}
/**
 * A map from names of trackable data sets to their ids, names, and sizes TODO
 */
export interface VuforiaTrackables {
    [name: string]: {
        id: string;
        name: string;
        size?: number[];
    };
}
/**
 * A vuforia data set. TODO
 */
export declare class VuforiaDataSet {
    url: string;
    private manager;
    constructor(url: string, manager: SessionPort);
    private _loaded;
    private _activated;
    _resolveTrackables: (value: VuforiaTrackables) => void;
    private _trackablesPromise;
    readonly loaded: boolean;
    readonly activated: boolean;
    load(): void;
    unload(): void;
    activate(): void;
    deactivate(): void;
    readonly trackablesPromise: Promise<VuforiaTrackables>;
}

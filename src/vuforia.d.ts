import { SerializedPartialFrameState } from './common';
import { FocusService } from './focus';
import { SessionService, SessionPort } from './session';
import { Event } from './utils';
/**
 * The set of options accepted by Vuforia for initialization.
 */
export interface VuforiaInitOptions {
    /**
     * The encrypted vuforia license data for your app.
     * You can encrypt your license key at http://docs.argonjs.io/start/vuforia-pgp-encryptor
     */
    encryptedLicenseData: string;
}
/**
 * The set of possible error codes that can be returned from vuforia's
 * initialization function.
 */
export declare enum VuforiaInitResult {
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
    INIT_EXTERNAL_DEVICE_NOT_DETECTED = -10,
}
export declare const enum VuforiaHint {
    MaxSimultaneousImageTargets = 0,
    MaxSimultaneousObjectTargets = 1,
    DelayedLoadingObjectDatasets = 2,
}
export interface VuforiaServiceDelegateInitOptions {
    key: string;
}
/**
 * An abstract class representing the Vuforia API.
 */
export declare abstract class VuforiaServiceDelegateBase {
    videoEnabled: boolean;
    trackingEnabled: boolean;
    stateUpdateEvent: Event<SerializedPartialFrameState>;
    abstract isAvailable(): boolean;
    abstract setHint(hint: VuforiaHint, value: number): boolean;
    abstract decryptLicenseKey(encryptedLicenseData: string, session: SessionPort): Promise<string>;
    abstract init(options: VuforiaServiceDelegateInitOptions): Promise<VuforiaInitResult>;
    abstract deinit(): void;
    abstract cameraDeviceInitAndStart(): boolean;
    abstract cameraDeviceSetFlashTorchMode(on: boolean): boolean;
    abstract objectTrackerInit(): boolean;
    abstract objectTrackerCreateDataSet(url?: string): string | undefined;
    abstract objectTrackerDestroyDataSet(id: string): boolean;
    abstract objectTrackerActivateDataSet(id: string): boolean;
    abstract objectTrackerDeactivateDataSet(id: string): boolean;
    abstract dataSetFetch(id: string): Promise<void>;
    abstract dataSetLoad(id: string): Promise<VuforiaTrackables>;
}
/**
 * An no-op implementation of VuforiaServiceDelegate.
 */
export declare class VuforiaServiceDelegate extends VuforiaServiceDelegateBase {
    isAvailable(): boolean;
    setHint(hint: VuforiaHint, value: number): boolean;
    decryptLicenseKey(encryptedLicenseData: string, session: SessionPort): Promise<string>;
    init(options: VuforiaServiceDelegateInitOptions): Promise<VuforiaInitResult>;
    deinit(): void;
    cameraDeviceInitAndStart(): boolean;
    cameraDeviceSetFlashTorchMode(on: boolean): boolean;
    objectTrackerInit(): boolean;
    objectTrackerCreateDataSet(url?: string): string;
    objectTrackerDestroyDataSet(id: string): boolean;
    objectTrackerActivateDataSet(id: string): boolean;
    objectTrackerDeactivateDataSet(id: string): boolean;
    dataSetFetch(id: string): Promise<void>;
    dataSetLoad(id: string): Promise<VuforiaTrackables>;
}
/**
 * Mediates requests to the Vuforia API. Handles the following requests:
 * // TODO
 */
export declare class VuforiaService {
    private sessionService;
    private focusService;
    private delegate;
    private _controllingSession;
    private _sessionSwitcherCommandQueue;
    private _sessionCommandQueue;
    private _sessionInitOptions;
    private _sessionInitPromise;
    private _sessionIsInitialized;
    private _sessionCreatedDataSets;
    private _sessionActivatedDataSets;
    constructor(sessionService: SessionService, focusService: FocusService, delegate: VuforiaServiceDelegate);
    isAvailable(): Promise<boolean>;
    /**
     * Initialize vuforia with an unecrypted key. Manager-only, unless the "force" (flag) is used.
     * It's a bad idea to publish your private vuforia key on the internet.
     */
    initWithUnencryptedKey(options: VuforiaInitOptions | {
        key: string;
    }, force?: boolean): Promise<VuforiaAPI>;
    /**
     * Initialize vuforia using an encrypted license key.
     * You can encrypt your license key at http://docs.argonjs.io/start/vuforia-pgp-encryptor
     */
    init(options: VuforiaInitOptions): Promise<VuforiaAPI>;
    private _ensureActiveSession();
    private _selectControllingSession();
    private _setControllingSession(session);
    private _resumeSession(session);
    private _pauseSession();
    private _cleanupSession(session);
    private _init(session);
    private _deinit(session);
}
export declare class VuforiaAPI {
    constructor(manager: SessionPort);
    objectTracker: VuforiaObjectTracker;
}
export declare abstract class VuforiaTracker {
    constructor();
}
/**
 * Vuforia Object Tracker
 */
export declare class VuforiaObjectTracker extends VuforiaTracker {
    private manager;
    private _dataSetMap;
    constructor(manager: SessionPort);
    dataSetActivateEvent: Event<VuforiaDataSet>;
    dataSetDeactivateEvent: Event<VuforiaDataSet>;
    createDataSet(url?: string): Promise<VuforiaDataSet>;
    activateDataSet(dataSet: VuforiaDataSet): Promise<void>;
    deactivateDataSet(dataSet: VuforiaDataSet): Promise<void>;
}
/**
 * A vuforia data set. TODO
 */
export declare class VuforiaDataSet {
    id: string;
    private manager;
    private _isActive;
    private _trackables;
    constructor(id: string, manager: SessionPort);
    _onActivate(): void;
    _onDeactivate(): void;
    fetch(): Promise<void>;
    load(): Promise<VuforiaTrackables>;
    isActive(): boolean;
    getTrackables(): VuforiaTrackables;
}
/**
 * A map from names of trackable data sets to their ids, names, and sizes TODO
 */
export interface VuforiaTrackables {
    [name: string]: {
        id: string;
        size?: {
            x: number;
            y: number;
            z: number;
        };
    };
}

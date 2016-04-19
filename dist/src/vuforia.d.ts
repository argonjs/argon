import { FocusService } from './focus';
import { RealityService, RealityView, RealitySetupHandler, SerializedFrameState } from './reality';
import { SessionService, SessionPort } from './session';
import { Event, MessagePortLike } from './utils';
/**
 * The set of options accepted by Vuforia for initialization.
 */
export interface VuforiaInitOptions {
    licenseKey?: string;
    encryptedLicenseData?: string;
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
/**
 * An abstract class representing the Vuforia API.
 */
export declare abstract class VuforiaServiceDelegateBase {
    abstract stateUpdateEvent: Event<SerializedFrameState>;
    abstract isAvailable(): boolean;
    abstract setHint(hint: VuforiaHint, value: number): boolean;
    abstract init(options: VuforiaInitOptions): Promise<VuforiaInitResult>;
    abstract deinit(): void;
    abstract cameraDeviceInitAndStart(): boolean;
    abstract cameraDeviceSetFlashTorchMode(on: boolean): boolean;
    abstract objectTrackerInit(): boolean;
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
export declare class VuforiaServiceDelegate extends VuforiaServiceDelegateBase {
    stateUpdateEvent: Event<SerializedFrameState>;
    isAvailable(): boolean;
    setHint(hint: VuforiaHint, value: number): boolean;
    init(options: VuforiaInitOptions): Promise<VuforiaInitResult>;
    deinit(): void;
    cameraDeviceInitAndStart(): boolean;
    cameraDeviceInit(): boolean;
    cameraDeviceSetFlashTorchMode(on: boolean): boolean;
    objectTrackerInit(): boolean;
    objectTrackerStart(): boolean;
    objectTrackerStop(): boolean;
    objectTrackerCreateDataSet(url?: string): string;
    objectTrackerDestroyDataSet(id: string): boolean;
    objectTrackerActivateDataSet(id: string): boolean;
    objectTrackerDeactivateDataSet(id: string): boolean;
    dataSetFetch(id: string): Promise<void>;
    dataSetLoad(id: string): Promise<VuforiaTrackables>;
}
export declare class VuforiaRealitySetupHandler implements RealitySetupHandler {
    private sessionService;
    private delegate;
    type: string;
    constructor(sessionService: SessionService, delegate: VuforiaServiceDelegate);
    setup(reality: RealityView, port: MessagePortLike): void;
}
/**
 * Mediates requests to the Vuforia API. Handles the following requests:
 * // TODO
 */
export declare class VuforiaService {
    private sessionService;
    private focusService;
    private realityService;
    private delegate;
    private _controllingSession;
    private _sessionIsInitialized;
    private _sessionCommandQueue;
    private _sessionInitOptions;
    private _sessionObjectTrackerStarted;
    private _sessionCreatedDataSets;
    private _sessionActivatedDataSets;
    private _isInitialized;
    constructor(sessionService: SessionService, focusService: FocusService, realityService: RealityService, delegate: VuforiaServiceDelegate);
    isAvailable(): Promise<boolean>;
    init(options: VuforiaInitOptions): PromiseLike<VuforiaAPI>;
    private _ensureControllingSession();
    private _selectControllingSession();
    private _setControllingSession(session);
    private _resumeSession(session);
    private _pauseSession(session);
    private _cleanupSession(session);
    private _init(session);
    private _deinit(session);
}
export declare class VuforiaAPI {
    private manager;
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
    createDataSet(url?: string): PromiseLike<VuforiaDataSet>;
    activateDataSet(dataSet: VuforiaDataSet): PromiseLike<void>;
    deactivateDataSet(dataSet: VuforiaDataSet): PromiseLike<void>;
}
/**
 * A vuforia data set. TODO
 */
export declare class VuforiaDataSet {
    id: string;
    private manager;
    private _isLoaded;
    private _isActive;
    private _trackables;
    private _fetchResponse;
    private _loadResponse;
    constructor(id: string, manager: SessionPort);
    _onActivate(): void;
    _onDeactivate(): void;
    fetch(): PromiseLike<void>;
    load(): PromiseLike<VuforiaTrackables>;
    isActive(): boolean;
    getTrackables(): VuforiaTrackables;
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

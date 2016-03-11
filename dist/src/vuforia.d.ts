import { Session } from './session.ts';
import { Context, FrameState } from './context.ts';
import { Event } from './utils.ts';
import { RealityService } from './reality.ts';
export declare class VuforiaInitError extends Error {
    code: VuforiaInitErrorCode;
    constructor(message: string, code: VuforiaInitErrorCode);
}
export declare class VuforiaLoadDataSetError extends Error {
    constructor(message: string);
}
export declare class VuforiaUnloadDataSetError extends Error {
    constructor(message: string);
}
export declare class VuforiaActivateDataSetError extends Error {
    constructor(message: string);
}
export declare class VuforiaDeactivateDataSetError extends Error {
    constructor(message: string);
}
export declare enum VuforiaInitErrorCode {
    INIT_ERROR = -1,
    INIT_DEVICE_NOT_SUPPORTED = -2,
    INIT_NO_CAMERA_ACCESS = -3,
    INIT_LICENSE_ERROR_MISSING_KEY = -4,
    INIT_LICENSE_ERROR_INVALID_KEY = -5,
    INIT_LICENSE_ERROR_NO_NETWORK_PERMANENT = -6,
    INIT_LICENSE_ERROR_NO_NETWORK_TRANSIENT = -7,
    INIT_LICENSE_ERROR_CANCELED_KEY = -8,
    INIT_LICENSE_ERROR_PRODUCT_TYPE_MISMATCH = -9,
    INIT_EXTERNAL_DEVICE_NOT_DETECTED = -10,
}
export declare enum VuforiaErrorType {
    InitError,
    LoadDataSetError,
    UnloadDataSetError,
    ActivateDataSetError,
    DeactivateDataSetError,
}
export declare class VuforiaServiceDelegate {
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
    updateEvent: Event<FrameState>;
    errorEvent: Event<VuforiaErrorMessage>;
    dataSetLoadEvent: Event<VuforiaDataSetLoadMessage>;
}
export interface VuforiaInitOptions {
    licenseKey?: string;
    encryptedLicenseData?: string;
}
export interface VuforiaVideoBackgroundConfig {
    enabled: boolean;
    positionX: number;
    positionY: number;
    sizeX: number;
    sizeY: number;
}
export interface VuforiaVideoMode {
    width: number;
    height: number;
    framerate: number;
}
export interface VuforiaErrorMessage {
    type: VuforiaErrorType;
    message: string;
    data?: any;
}
export interface VuforiaDataSetLoadMessage {
    url: string;
    trackables: VuforiaTrackables;
}
export declare class VuforiaService {
    private context;
    private realityService;
    private delegate;
    constructor(context: Context, realityService: RealityService, delegate: VuforiaServiceDelegate);
    private _commandQueue;
    private _sessionInitOptions;
    private _sessionCameraStarted;
    private _sessionObjectTrackerStarted;
    private _sessionMaxSimultaneousImageTargets;
    private _sessionLoadedDataSets;
    private _sessionActivatedDataSets;
    private _controllingSession;
    private _isInitialized;
    private dataSetMap;
    private _initVuforia(session);
    isSupported(): PromiseLike<boolean>;
    init(options?: VuforiaInitOptions): void;
    deinit(): void;
    startCamera(): void;
    stopCamera(): void;
    startObjectTracker(): void;
    stopObjectTracker(): void;
    hintMaxSimultaneousImageTargets(max: any): void;
    createDataSet(url: any): VuforiaDataSet;
}
export interface VuforiaTrackables {
    [name: string]: {
        id: string;
        name: string;
        size?: number[];
    };
}
export declare class VuforiaDataSet {
    url: string;
    constructor(url: string, parentSession: Session);
    private _parentSession;
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

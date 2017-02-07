import { SessionService, SessionPort } from './session';
import { Event } from './utils';
/**
 * A service which handles requests from a VuforiaService
 */
export declare abstract class VuforiaServiceProvider {
    constructor(sessionService: SessionService);
}
/**
 * A service for interacting with the Vuforia API
 */
export declare class VuforiaService {
    private sessionService;
    constructor(sessionService: SessionService);
    /**
     * Resolves to a boolean indicating whether or not the Vuforia API is available on this system
     */
    isAvailable(): Promise<boolean>;
    /**
     * Initialize vuforia using an encrypted license.
     * You can get a vuforia license key from https://developer.vuforia.com/
     * You can encrypt your vuforia license with the tool at http://docs.argonjs.io/start/vuforia-pgp-encryptor
     */
    init(options: string | {
        encryptedLicenseData: string;
    }): Promise<VuforiaAPI>;
    /**
     * Initialize vuforia with an unecrypted key.
     * It's a bad idea to publish your unencrypted vuforia key on the internet.
     */
    initWithUnencryptedKey(options: string | {
        key: string;
    }): Promise<VuforiaAPI>;
}
export declare class VuforiaAPI {
    constructor(manager: SessionPort);
    objectTracker: VuforiaObjectTracker;
}
export declare abstract class VuforiaTracker {
    constructor();
}
export declare type VuforiaDataSetId = string;
export interface VuforiaDataSetEvent {
    id: VuforiaDataSetId;
}
export interface VuforiaDataSetLoadEvent extends VuforiaDataSetEvent {
    id: VuforiaDataSetId;
    trackables: VuforiaTrackables;
}
/**
 * Vuforia Object Tracker
 */
export declare class VuforiaObjectTracker extends VuforiaTracker {
    private managerSession;
    dataSetLoadEvent: Event<VuforiaDataSetLoadEvent>;
    dataSetUnloadEvent: Event<VuforiaDataSetEvent>;
    dataSetActivateEvent: Event<VuforiaDataSetEvent>;
    dataSetDeactivateEvent: Event<VuforiaDataSetEvent>;
    constructor(managerSession: SessionPort);
    private _deprecatedDataSetInstanceMap;
    /**
     * Deprecated. Please use createDataSetFromURI instead.
     * @deprecated To be removed.
     */
    createDataSet(url?: string): Promise<DeprecatedVuforiaDataSet>;
    /**
     * Fetch a dataset from the provided url.
     * If successfull, resolves to an id which represents the dataset.
     */
    createDataSetFromURI(uri: string): Promise<VuforiaDataSetId>;
    /**
     * Load the dataset into memory, and return a promise which
     * resolves to the contained trackables
     */
    loadDataSet(id: VuforiaDataSetId): Promise<VuforiaTrackables>;
    /**
     * Unload a dataset from memory (deactivating it if necessary)
     */
    unloadDataSet(id: VuforiaDataSetId): Promise<void>;
    /**
     * Load (if necesasry) and activate a dataset to enable tracking of the contained trackables
     */
    activateDataSet(id: VuforiaDataSetId | DeprecatedVuforiaDataSet): Promise<void>;
    /**
     * Deactivate a loaded dataset to disable tracking of the contained trackables
     */
    deactivateDataSet(id: VuforiaDataSetId | DeprecatedVuforiaDataSet): Promise<void>;
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
/**
 * @deprecated To be removed.
 */
export declare class DeprecatedVuforiaDataSet {
    id: string;
    private managerSession;
    private _isActive;
    private _trackables;
    constructor(id: string, managerSession: SessionPort);
    _onActivate(): void;
    _onDeactivate(): void;
    fetch(): Promise<void>;
    load(): Promise<VuforiaTrackables>;
    isActive(): boolean;
    getTrackables(): VuforiaTrackables;
}

import { inject } from 'aurelia-dependency-injection'
import { SessionService, SessionPort } from './session'
import { Event, resolveURL, deprecated } from './utils'

/**
 * A service which handles requests from a VuforiaService
 */
@inject(SessionService)
export abstract class VuforiaServiceProvider {
    constructor(sessionService: SessionService) {
        if (sessionService.isRealityManager) {
            sessionService.connectEvent.addEventListener((session) => {
                session.on['ar.vuforia.isAvailable'] = () => Promise.resolve({available:false});
            });
            sessionService.connectEvent.addEventListener((session) => {
                session.on['ar.vuforia.init'] = () => Promise.reject(new Error("Vuforia is not supported on this system"));
            });
        }
    }
}

/**
 * A service for interacting with the Vuforia API
 */
@inject(SessionService, VuforiaServiceProvider)
export class VuforiaService {

    constructor(private sessionService: SessionService) {}

    /**
     * Resolves to a boolean indicating whether or not the Vuforia API is available on this system
     */
    public isAvailable(): Promise<boolean> {
        return this.sessionService.manager.request('ar.vuforia.isAvailable').then((message: { available: boolean }) => {
            return message.available;
        });
    }

    /**
     * Initialize vuforia using an encrypted license.
     * You can get a vuforia license key from https://developer.vuforia.com/ 
     * You can encrypt your vuforia license with the tool at http://docs.argonjs.io/start/vuforia-pgp-encryptor
     */
    public init(options: string|{encryptedLicenseData:string}): Promise<VuforiaAPI> {
        if (typeof options === 'string') options = {encryptedLicenseData:options};
        if (!options.encryptedLicenseData || typeof options.encryptedLicenseData !== 'string') 
            throw new Error('options.encryptedLicenseData is required.')
        return this.sessionService.manager.request('ar.vuforia.init', options).then(() => {
            return new VuforiaAPI(this.sessionService.manager);
        });
    }

    /**
     * Initialize vuforia with an unecrypted key.
     * It's a bad idea to publish your unencrypted vuforia key on the internet.
     */
    public initWithUnencryptedKey(options: string|{key:string}) : Promise<VuforiaAPI> {        
        if (typeof options === 'string') options = {key:options};
        return this.sessionService.manager.request('ar.vuforia.init', options).then(() => {
            return new VuforiaAPI(this.sessionService.manager);
        });
    }
}

export class VuforiaAPI {
    constructor(manager: SessionPort) {
        this.objectTracker = new VuforiaObjectTracker(manager);
    }
    public objectTracker: VuforiaObjectTracker;
}

export abstract class VuforiaTracker {
    constructor() {}
}

export type VuforiaDataSetId = string;

export interface VuforiaDataSetEvent {
    id: VuforiaDataSetId
}

export interface VuforiaDataSetLoadEvent extends VuforiaDataSetEvent {
    id: VuforiaDataSetId,
    trackables: VuforiaTrackables
}

/**
 * Vuforia Object Tracker
 */
export class VuforiaObjectTracker extends VuforiaTracker {

    public dataSetLoadEvent = new Event<VuforiaDataSetLoadEvent>();
    public dataSetUnloadEvent = new Event<VuforiaDataSetEvent>();
    
    public dataSetActivateEvent = new Event<VuforiaDataSetEvent>();
    public dataSetDeactivateEvent = new Event<VuforiaDataSetEvent>();

    constructor(private managerSession: SessionPort) {
        super();

        managerSession.on['ar.vuforia.objectTrackerLoadDataSetEvent'] = (message:VuforiaDataSetLoadEvent) => {
            this.dataSetLoadEvent.raiseEvent(message);
        }

        managerSession.on['ar.vuforia.objectTrackerUnloadDataSetEvent'] = (message:VuforiaDataSetEvent) => {
            this.dataSetUnloadEvent.raiseEvent(message);
        }

        managerSession.on['ar.vuforia.objectTrackerActivateDataSetEvent'] = (message:VuforiaDataSetEvent) => {
            const deprecatedDataSetInstance = this._deprecatedDataSetInstanceMap.get(message.id);
            if (deprecatedDataSetInstance) {
                deprecatedDataSetInstance._onActivate(); 
                this.dataSetActivateEvent.raiseEvent(deprecatedDataSetInstance);
            }
            else this.dataSetActivateEvent.raiseEvent(message);
        }

        managerSession.on['ar.vuforia.objectTrackerDeactivateDataSetEvent'] = (message:VuforiaDataSetEvent) => {
            const deprecatedDataSetInstance = this._deprecatedDataSetInstanceMap.get(message.id);
            if (deprecatedDataSetInstance) {
                deprecatedDataSetInstance._onDeactivate(); 
                this.dataSetActivateEvent.raiseEvent(deprecatedDataSetInstance);
            }
            else this.dataSetDeactivateEvent.raiseEvent(message);
        }
    }

    private _deprecatedDataSetInstanceMap = new Map<string, DeprecatedVuforiaDataSet>();

    /**
     * Deprecated. Please use createDataSetFromURI instead.
     * @deprecated To be removed. 
     */
    @deprecated('createDataSetFromURI')
    public createDataSet(url?: string): Promise<DeprecatedVuforiaDataSet> {
        if (url && window.document) {
            url = resolveURL(url);
        }
        return this.managerSession.request('ar.vuforia.objectTrackerCreateDataSet', { url }).then((message: { id: string }) => {
            const dataSet = new DeprecatedVuforiaDataSet(message.id, this.managerSession);
            this._deprecatedDataSetInstanceMap.set(message.id, dataSet);
            return dataSet;
        })
    }

    /**
     * Fetch a dataset from the provided url. 
     * If successfull, resolves to an id which represents the dataset. 
     */
    public createDataSetFromURI(uri: string) : Promise<VuforiaDataSetId> {
        return this.managerSession.request('ar.vuforia.objectTrackerCreateDataSet', { uri })
            .then((message: { id: VuforiaDataSetId }) => {
                return message.id;
            });
    }

    /**
     * Load the dataset into memory, and return a promise which
     * resolves to the contained trackables
     */
    public loadDataSet(id: VuforiaDataSetId) : Promise<VuforiaTrackables> {
        return this.managerSession.request('ar.vuforia.objectTrackerLoadDataSet', { id });
    }

    /**
     * Unload a dataset from memory (deactivating it if necessary)
     */
    public unloadDataSet(id: VuforiaDataSetId) : Promise<void> {
        return this.managerSession.request('ar.vuforia.objectTrackerUnloadDataSet', { id });
    }

    /**
     * Load (if necesasry) and activate a dataset to enable tracking of the contained trackables
     */
    public activateDataSet(id: VuforiaDataSetId|DeprecatedVuforiaDataSet): Promise<void> {
        id = (id instanceof DeprecatedVuforiaDataSet) ? id.id : id; // backwards compatability
        return this.managerSession.request('ar.vuforia.objectTrackerActivateDataSet', { id });
    }

    /**
     * Deactivate a loaded dataset to disable tracking of the contained trackables
     */
    public deactivateDataSet(id: VuforiaDataSetId|DeprecatedVuforiaDataSet): Promise<void> {
        id = (id instanceof DeprecatedVuforiaDataSet) ? id.id : id; // backwards compatability
        return this.managerSession.request('ar.vuforia.objectTrackerDeactivateDataSet', { id });
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



/**
 * @deprecated To be removed.
 */
export class DeprecatedVuforiaDataSet {

    private _isActive = false;    
    private _trackables: VuforiaTrackables;

    constructor(public id: string, private managerSession: SessionPort) { }

    _onActivate() {
        this._isActive = true;
    }

    _onDeactivate() {
        this._isActive = false;
    }

    public fetch(): Promise<void> {
        return this.managerSession.request('ar.vuforia.dataSetFetch', { id: this.id });
    }

    public load(): Promise<VuforiaTrackables> {
        return this.managerSession.request('ar.vuforia.dataSetLoad', { id: this.id }).then((trackables: VuforiaTrackables) => {
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
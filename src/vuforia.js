var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from 'aurelia-dependency-injection';
import { SessionService } from './session';
import { Event, resolveURL, deprecated } from './utils';
/**
 * A service which handles requests from a VuforiaService
 */
let VuforiaServiceProvider = class VuforiaServiceProvider {
    constructor(sessionService) {
        if (sessionService.isRealityManager) {
            sessionService.connectEvent.addEventListener((session) => {
                session.on['ar.vuforia.isAvailable'] = () => Promise.resolve({ available: false });
            });
            sessionService.connectEvent.addEventListener((session) => {
                session.on['ar.vuforia.init'] = () => Promise.reject(new Error("Vuforia is not supported on this system"));
            });
        }
    }
};
VuforiaServiceProvider = __decorate([
    inject(SessionService),
    __metadata("design:paramtypes", [SessionService])
], VuforiaServiceProvider);
export { VuforiaServiceProvider };
/**
 * A service for interacting with the Vuforia API
 */
let VuforiaService = class VuforiaService {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    /**
     * Resolves to a boolean indicating whether or not the Vuforia API is available on this system
     */
    isAvailable() {
        return this.sessionService.manager.request('ar.vuforia.isAvailable').then((message) => {
            return message.available;
        });
    }
    /**
     * Initialize vuforia using an encrypted license.
     * You can get a vuforia license key from https://developer.vuforia.com/
     * You can encrypt your vuforia license with the tool at http://docs.argonjs.io/start/vuforia-pgp-encryptor
     */
    init(options) {
        if (typeof options === 'string')
            options = { encryptedLicenseData: options };
        if (!options.encryptedLicenseData || typeof options.encryptedLicenseData !== 'string')
            throw new Error('options.encryptedLicenseData is required.');
        return this.sessionService.manager.request('ar.vuforia.init', options).then(() => {
            return new VuforiaAPI(this.sessionService.manager);
        });
    }
    /**
     * Initialize vuforia with an unecrypted key.
     * It's a bad idea to publish your unencrypted vuforia key on the internet.
     */
    initWithUnencryptedKey(options) {
        if (typeof options === 'string')
            options = { key: options };
        return this.sessionService.manager.request('ar.vuforia.init', options).then(() => {
            return new VuforiaAPI(this.sessionService.manager);
        });
    }
};
VuforiaService = __decorate([
    inject(SessionService, VuforiaServiceProvider),
    __metadata("design:paramtypes", [SessionService])
], VuforiaService);
export { VuforiaService };
export class VuforiaAPI {
    constructor(manager) {
        this.objectTracker = new VuforiaObjectTracker(manager);
    }
}
export class VuforiaTracker {
    constructor() { }
}
/**
 * Vuforia Object Tracker
 */
export class VuforiaObjectTracker extends VuforiaTracker {
    constructor(managerSession) {
        super();
        this.managerSession = managerSession;
        this.dataSetLoadEvent = new Event();
        this.dataSetUnloadEvent = new Event();
        this.dataSetActivateEvent = new Event();
        this.dataSetDeactivateEvent = new Event();
        this._deprecatedDataSetInstanceMap = new Map();
        managerSession.on['ar.vuforia.objectTrackerLoadDataSetEvent'] = (message) => {
            this.dataSetLoadEvent.raiseEvent(message);
        };
        managerSession.on['ar.vuforia.objectTrackerUnloadDataSetEvent'] = (message) => {
            this.dataSetUnloadEvent.raiseEvent(message);
        };
        managerSession.on['ar.vuforia.objectTrackerActivateDataSetEvent'] = (message) => {
            const deprecatedDataSetInstance = this._deprecatedDataSetInstanceMap.get(message.id);
            if (deprecatedDataSetInstance) {
                deprecatedDataSetInstance._onActivate();
                this.dataSetActivateEvent.raiseEvent(deprecatedDataSetInstance);
            }
            else
                this.dataSetActivateEvent.raiseEvent(message);
        };
        managerSession.on['ar.vuforia.objectTrackerDeactivateDataSetEvent'] = (message) => {
            const deprecatedDataSetInstance = this._deprecatedDataSetInstanceMap.get(message.id);
            if (deprecatedDataSetInstance) {
                deprecatedDataSetInstance._onDeactivate();
                this.dataSetActivateEvent.raiseEvent(deprecatedDataSetInstance);
            }
            else
                this.dataSetDeactivateEvent.raiseEvent(message);
        };
    }
    /**
     * Deprecated. Please use createDataSetFromURI instead.
     * @deprecated To be removed.
     */
    createDataSet(url) {
        if (url && window.document) {
            url = resolveURL(url);
        }
        return this.managerSession.request('ar.vuforia.objectTrackerCreateDataSet', { url }).then((message) => {
            const dataSet = new DeprecatedVuforiaDataSet(message.id, this.managerSession);
            this._deprecatedDataSetInstanceMap.set(message.id, dataSet);
            return dataSet;
        });
    }
    /**
     * Fetch a dataset from the provided url.
     * If successfull, resolves to an id which represents the dataset.
     */
    createDataSetFromURI(uri) {
        return this.managerSession.request('ar.vuforia.objectTrackerCreateDataSet', { uri })
            .then((message) => {
            return message.id;
        });
    }
    /**
     * Load the dataset into memory, and return a promise which
     * resolves to the contained trackables
     */
    loadDataSet(id) {
        return this.managerSession.request('ar.vuforia.objectTrackerLoadDataSet', { id });
    }
    /**
     * Unload a dataset from memory (deactivating it if necessary)
     */
    unloadDataSet(id) {
        return this.managerSession.request('ar.vuforia.objectTrackerUnloadDataSet', { id });
    }
    /**
     * Load (if necesasry) and activate a dataset to enable tracking of the contained trackables
     */
    activateDataSet(id) {
        id = (id instanceof DeprecatedVuforiaDataSet) ? id.id : id; // backwards compatability
        return this.managerSession.request('ar.vuforia.objectTrackerActivateDataSet', { id });
    }
    /**
     * Deactivate a loaded dataset to disable tracking of the contained trackables
     */
    deactivateDataSet(id) {
        id = (id instanceof DeprecatedVuforiaDataSet) ? id.id : id; // backwards compatability
        return this.managerSession.request('ar.vuforia.objectTrackerDeactivateDataSet', { id });
    }
}
__decorate([
    deprecated('createDataSetFromURI'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VuforiaObjectTracker.prototype, "createDataSet", null);
/**
 * @deprecated To be removed.
 */
export class DeprecatedVuforiaDataSet {
    constructor(id, managerSession) {
        this.id = id;
        this.managerSession = managerSession;
        this._isActive = false;
    }
    _onActivate() {
        this._isActive = true;
    }
    _onDeactivate() {
        this._isActive = false;
    }
    fetch() {
        return this.managerSession.request('ar.vuforia.dataSetFetch', { id: this.id });
    }
    load() {
        return this.managerSession.request('ar.vuforia.dataSetLoad', { id: this.id }).then((trackables) => {
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

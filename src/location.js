var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Cartographic, ConstantPositionProperty, ConstantProperty, ReferenceFrame, Cartesian3, Quaternion, Transforms, defined } from './cesium/cesium-imports';
import { autoinject } from 'aurelia-dependency-injection';
import { ContextService, ContextServiceProvider } from './context';
import { SessionService } from './session';
import { AVERAGE_HUMAN_HEIGHT, STAGE_ENTITY_ID, PHYSICAL_STAGE_ENTITY_ID } from './common';
import { getEntityPositionInReferenceFrame } from './utils';
const scratchCartesian3 = new Cartesian3;
const scratchQuaternion = new Quaternion;
/**
 * The location service provides access to the current location.
 * The stage entity provides information about the location represented
 * by the current reality viewer.
 * The physical-stage entity provides information about the user's
 * current physical location.
 * Either entity must be subscribed to via ContextService.subscribe,
 * before their pose relative to the FIXED frame can be retrieved.
 */
let LocationService = class LocationService {
    constructor(sessionService, contextService) {
        this.sessionService = sessionService;
        this.contextService = contextService;
        /**
         * An entity representing the floor plane, defining an
         * East-North-Up coordinate system.
         * This entity must be subscribed to in order to receive pose updates
         * relative to the FIXED frame.
         */
        this.stage = this.contextService.entities.add(new Entity({
            id: STAGE_ENTITY_ID,
            name: 'Stage',
            position: new ConstantPositionProperty(undefined, undefined),
            orientation: new ConstantProperty(Quaternion.IDENTITY)
        }));
        /**
         * A reference frame representing the physical location of the user,
         * defining an East-North-Up coordinate system.
         */
        this.physicalStage = this.contextService.entities.add(new Entity({
            id: PHYSICAL_STAGE_ENTITY_ID,
            name: 'Physical Stage',
            position: new ConstantPositionProperty(undefined, undefined),
            orientation: new ConstantProperty(undefined)
        }));
        contextService.frameStateEvent.addEventListener(() => {
            this.stageCartographic = this._updateCartographic(this.stage, this.stageCartographic);
            this.physicalStageCartographic = this._updateCartographic(this.physicalStage, this.physicalStageCartographic);
        });
    }
    get stageHorizontalAccuracy() {
        return this.stage['meta'] ? this.stage['meta'].horizontalAccuracy : undefined;
    }
    get stageVerticalAccuracy() {
        return this.stage['meta'] ? this.stage['meta'].verticalAccuracy : undefined;
    }
    get physicalStageHorizontalAccuracy() {
        return this.physicalStage['meta'] ?
            this.physicalStage['meta'].horizontalAccuracy : undefined;
    }
    get physicalStageVerticalAccuracy() {
        return this.physicalStage['meta'] ?
            this.physicalStage['meta'].verticalAccuracy : undefined;
    }
    subscribeGeopose(options) {
        if (options && options.physical) {
            return Promise.all([
                this.contextService.subscribe(PHYSICAL_STAGE_ENTITY_ID),
                this.contextService.subscribe(STAGE_ENTITY_ID)
            ]).then(() => { });
        }
        return this.contextService.subscribe(STAGE_ENTITY_ID).then(() => { });
    }
    unsubscribeGeopose() {
        this.contextService.unsubscribe(STAGE_ENTITY_ID);
        this.contextService.unsubscribe(PHYSICAL_STAGE_ENTITY_ID);
    }
    setGeolocationOptions(options) {
        this.sessionService.manager.send('ar.location.setGeolocationOptions', { options });
    }
    _updateCartographic(entity, cartographic) {
        if (!entity)
            return undefined;
        const fixedPosition = getEntityPositionInReferenceFrame(entity, this.contextService.time, ReferenceFrame.FIXED, scratchCartesian3);
        if (fixedPosition) {
            cartographic = cartographic || new Cartographic();
            return Cartographic.fromCartesian(fixedPosition, undefined, cartographic);
        }
        return undefined;
    }
};
LocationService = __decorate([
    autoinject(),
    __metadata("design:paramtypes", [SessionService,
        ContextService])
], LocationService);
export { LocationService };
let LocationServiceProvider = class LocationServiceProvider {
    constructor(sessionService, contextServiceProvider, locationService) {
        this.sessionService = sessionService;
        this.contextServiceProvider = contextServiceProvider;
        this.locationService = locationService;
        this._sessionGeolocationOptions = new Map();
        this.sessionService.connectEvent.addEventListener((session) => {
            session.on['ar.location.setGeolocationOptions'] = (options) => {
                this._handleSetGeolocationOptions(session, options);
            };
        });
        this.contextServiceProvider.subscribersChangeEvent.addEventListener(({ id }) => {
            if (locationService.physicalStage.id !== id)
                return;
            this._checkPhysicalStageSubscribers();
        });
        this.contextServiceProvider.publishingReferenceFrameMap.set(locationService.stage.id, ReferenceFrame.FIXED);
        this.contextServiceProvider.publishingReferenceFrameMap.set(locationService.physicalStage.id, ReferenceFrame.FIXED);
    }
    _checkPhysicalStageSubscribers() {
        const physicalStageId = this.locationService.physicalStage.id;
        const subscribers = this.contextServiceProvider.subscribersByEntityId.get(physicalStageId);
        if (subscribers && subscribers.size > 0) {
            if (JSON.stringify(this._targetGeolocationOptions) !== JSON.stringify(this._currentGeolocationOptions)) {
                this._currentGeolocationOptions = this._targetGeolocationOptions;
                this.onStopGeolocationUpdates();
                this.onStartGeolocationUpdates(this._targetGeolocationOptions);
            }
        }
        else {
            this.onStopGeolocationUpdates();
            this._currentGeolocationOptions = undefined;
        }
    }
    _handleSetGeolocationOptions(session, options) {
        this._sessionGeolocationOptions.set(session, options);
        session.closeEvent.addEventListener(() => {
            this._updateGeolocationOptions();
        });
        this._updateGeolocationOptions();
    }
    _updateGeolocationOptions() {
        const reducedOptions = {};
        for (const o of this._sessionGeolocationOptions.values()) {
            reducedOptions.enableHighAccuracy =
                reducedOptions.enableHighAccuracy || o.enableHighAccuracy;
        }
        if (this._targetGeolocationOptions.enableHighAccuracy !== reducedOptions.enableHighAccuracy) {
            this._targetGeolocationOptions = reducedOptions;
            this._checkPhysicalStageSubscribers();
        }
    }
    setGeolocation(longitude, latitude, altitude, horizontalAccuracy, verticalAccuracy) {
        const physicalStage = this.locationService.physicalStage;
        if (defined(longitude) && defined(latitude)) {
            // TODO: fallback on https://cesiumjs.org/Cesium/Build/Documentation/sampleTerrain.html for height
            const height = defined(altitude) ? altitude - AVERAGE_HUMAN_HEIGHT : 0;
            const fixedPosition = Cartesian3.fromDegrees(longitude, latitude, height, undefined, scratchCartesian3);
            const enuOrientation = Transforms.headingPitchRollQuaternion(fixedPosition, 0, 0, 0, undefined, scratchQuaternion);
            physicalStage.position.setValue(fixedPosition, ReferenceFrame.FIXED);
            physicalStage.orientation.setValue(enuOrientation);
            physicalStage['meta'] = {
                horizontalAccuracy,
                verticalAccuracy
            };
        }
        else {
            physicalStage.position.setValue(undefined, undefined);
            physicalStage.orientation.setValue(undefined);
            physicalStage['meta'] = undefined;
        }
        this.contextServiceProvider.publishEntityState(physicalStage);
    }
    /**
     * Overridable. Should call setGeolocation when new geolocation is available
     */
    onStartGeolocationUpdates(options) {
        if (typeof navigator == 'undefined' || !navigator.geolocation)
            throw new Error('Unable to start geolocation updates');
        return new Promise((resolve, reject) => {
            if (!defined(this._geolocationWatchId)) {
                let didResolve = false;
                this._geolocationWatchId = navigator.geolocation.watchPosition((pos) => {
                    if (!didResolve)
                        resolve(), didResolve = true;
                    this.setGeolocation(pos.coords.longitude, pos.coords.latitude, pos.coords.altitude || 0, (pos.coords.accuracy > 0) ? pos.coords.accuracy : undefined, pos.coords.altitudeAccuracy || undefined);
                }, reject, options);
            }
            else {
                resolve();
            }
            ;
        });
    }
    /**
     * Overridable.
     */
    onStopGeolocationUpdates() {
        if (typeof navigator !== 'undefined' && defined(this._geolocationWatchId)) {
            navigator.geolocation.clearWatch(this._geolocationWatchId);
            this._geolocationWatchId = undefined;
        }
    }
};
LocationServiceProvider = __decorate([
    autoinject(),
    __metadata("design:paramtypes", [SessionService,
        ContextServiceProvider,
        LocationService])
], LocationServiceProvider);
export { LocationServiceProvider };

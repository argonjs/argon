import {
    Entity, 
    Cartographic, 
    ConstantPositionProperty,
    ConstantProperty,
    ReferenceFrame,
    Cartesian3,
    Quaternion,
    Transforms,
    defined
} from './cesium/cesium-imports'
import {autoinject} from 'aurelia-dependency-injection';
import {ContextService, ContextServiceProvider} from './context'
import {SessionService, SessionPort} from './session'
import {
    AVERAGE_HUMAN_HEIGHT,
    STAGE_ENTITY_ID,
    PHYSICAL_STAGE_ENTITY_ID
} from './common'
import {getEntityPositionInReferenceFrame} from './utils'

export interface GeolocationOptions {
    enableHighAccuracy?: boolean;
}

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
@autoinject()
export class LocationService {

    /**
     * An entity representing the floor plane, defining an 
     * East-North-Up coordinate system.
     * This entity must be subscribed to in order to receive pose updates
     * relative to the FIXED frame.
     */
    public stage: Entity = this.contextService.entities.add(new Entity({
        id: STAGE_ENTITY_ID,
        name: 'Stage',
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.physicalStage),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    }));

    /**
     * A reference frame representing the physical location of the user, 
     * defining an East-North-Up coordinate system.
     */
    public physicalStage:Entity = this.contextService.entities.add(new Entity({
        id: PHYSICAL_STAGE_ENTITY_ID,
        name: 'Physical Stage'
    }));

    constructor(
        private sessionService:SessionService, 
        private contextService:ContextService
    ) {
        contextService.frameStateEvent.addEventListener(()=>{
            this.stageCartographic = this._updateCartographic(this.stage, this.stageCartographic);
            this.physicalStageCartographic = this._updateCartographic(this.physicalStage, this.physicalStageCartographic);
        });
    }

    public stageCartographic? : Cartographic;

    public get stageHorizontalAccuracy() : number|undefined {
        return this.stage['meta'] ? this.stage['meta'].horizontalAccuracy : undefined;
    }
    
    public get stageVerticalAccuracy() : number|undefined {
        return this.stage['meta'] ? this.stage['meta'].verticalAccuracy : undefined;
    }

    public physicalStageCartographic? : Cartographic;

    public get physicalStageHorizontalAccuracy() : number|undefined {
        return this.physicalStage['meta'] ? 
            this.physicalStage['meta'].horizontalAccuracy : undefined;
    }
    
    public get physicalStageVerticalAccuracy() : number|undefined {
        return this.physicalStage['meta'] ? 
            this.physicalStage['meta'].verticalAccuracy : undefined;
    }

    subscribeGeopose(options?:{physical:boolean}) : Promise<void> {
        if (options && options.physical) {
            return Promise.all([
                this.contextService.subscribe(PHYSICAL_STAGE_ENTITY_ID),
                this.contextService.subscribe(STAGE_ENTITY_ID)
            ]).then(()=>{});
        }
        return this.contextService.subscribe(STAGE_ENTITY_ID).then(()=>{});
    }

    unsubscribeGeopose() : void {
        this.contextService.unsubscribe(STAGE_ENTITY_ID);
        this.contextService.unsubscribe(PHYSICAL_STAGE_ENTITY_ID);
    }

    setGeolocationOptions(options:{enableHighAccuracy:boolean}) : void {
        this.sessionService.manager.send('ar.location.setGeolocationOptions', {options});
    }

    private _updateCartographic(entity?:Entity, cartographic?:Cartographic) : Cartographic|undefined {
        if (!entity) return undefined;

        const fixedPosition = 
            getEntityPositionInReferenceFrame(entity, this.contextService.time, ReferenceFrame.FIXED, scratchCartesian3);
        
        if (fixedPosition) {
            cartographic = cartographic || new Cartographic();
            return Cartographic.fromCartesian(fixedPosition, undefined, cartographic);
        }

        return undefined;
    }
}

@autoinject()
export class LocationServiceProvider {

    private _currentGeolocationOptions?:GeolocationOptions;
    private _targetGeolocationOptions:GeolocationOptions;
    private _sessionGeolocationOptions = new Map<SessionPort, GeolocationOptions>();
    
    constructor(
        private sessionService:SessionService,
        private contextServiceProvider:ContextServiceProvider,
        private locationService:LocationService
    ) {
        
        this.sessionService.connectEvent.addEventListener((session)=>{
            session.on['ar.location.setGeolocationOptions'] = (options) => {
                this._handleSetGeolocationOptions(session, options);
            }
        });

        this.contextServiceProvider.subscribersChangeEvent.addEventListener(({id})=>{
            if (locationService.physicalStage.id !== id) return;
            this._checkPhysicalStageSubscribers();
        });

        this.contextServiceProvider.publishingReferenceFrameMap.set(locationService.stage.id, ReferenceFrame.FIXED)
        this.contextServiceProvider.publishingReferenceFrameMap.set(locationService.physicalStage.id, ReferenceFrame.FIXED)
    }

    private _checkPhysicalStageSubscribers() {
        const physicalStageId = this.locationService.physicalStage.id;
        const subscribers = this.contextServiceProvider.subscribersByEntityId.get(physicalStageId);
        if (subscribers && subscribers.size > 0) {
            if (JSON.stringify(this._targetGeolocationOptions) !== JSON.stringify(this._currentGeolocationOptions)) {
                this._currentGeolocationOptions = this._targetGeolocationOptions;
                this.onStopGeolocationUpdates();
                this.onStartGeolocationUpdates(this._targetGeolocationOptions);
            }
        } else {
            this.onStopGeolocationUpdates();
            this._currentGeolocationOptions = undefined;
        }
    }

    private _handleSetGeolocationOptions(session:SessionPort, options:GeolocationOptions) {
        this._sessionGeolocationOptions.set(session, options);
        session.closeEvent.addEventListener(()=>{
            this._updateGeolocationOptions();
        });
        this._updateGeolocationOptions();
    }

    private _updateGeolocationOptions() {
        const reducedOptions:GeolocationOptions = {};
        for (const o of this._sessionGeolocationOptions.values()) {
            reducedOptions.enableHighAccuracy = 
                reducedOptions.enableHighAccuracy || o.enableHighAccuracy;
        }
        if (this._targetGeolocationOptions.enableHighAccuracy !== reducedOptions.enableHighAccuracy) {
            this._targetGeolocationOptions = reducedOptions;
            this._checkPhysicalStageSubscribers();
        }
    }

    protected setGeolocation(
            longitude?:number,
            latitude?:number,
            altitude?:number,
            horizontalAccuracy?:number,
            verticalAccuracy?:number) {

        const physicalStage = this.locationService.physicalStage;

        if (defined(longitude) && defined(latitude)) {
            // TODO: fallback on https://cesiumjs.org/Cesium/Build/Documentation/sampleTerrain.html for height
            const height = defined(altitude) ? altitude - AVERAGE_HUMAN_HEIGHT : 0;

            const fixedPosition = Cartesian3.fromDegrees(longitude, latitude, height, undefined, scratchCartesian3);
            const enuOrientation = Transforms.headingPitchRollQuaternion(fixedPosition, 0,0,0, undefined, scratchQuaternion);

            physicalStage.position = physicalStage.position || new ConstantPositionProperty();
            physicalStage.orientation = physicalStage.orientation || new ConstantProperty();

            (physicalStage.position as ConstantPositionProperty).setValue(
                fixedPosition,
                ReferenceFrame.FIXED
            );

            (physicalStage.orientation as ConstantProperty).setValue(
                enuOrientation
            );

            physicalStage['meta'] = {
                horizontalAccuracy,
                verticalAccuracy
            };
        } else {
            physicalStage.position = undefined;
            physicalStage.orientation = undefined;
            physicalStage['meta'] = undefined;
        }

        this.contextServiceProvider.publishEntityState(physicalStage);
    }

    private _geolocationWatchId?:number;

    /**
     * Overridable. Should call setGeolocation when new geolocation is available 
     */
    protected onStartGeolocationUpdates(options:GeolocationOptions) : Promise<void> {
        if (typeof navigator == 'undefined' || !navigator.geolocation)
            throw new Error('Unable to start geolocation updates');
        return new Promise<void>((resolve, reject) => {
            if (!defined(this._geolocationWatchId)) {
                let didResolve = false;
                this._geolocationWatchId = navigator.geolocation.watchPosition((pos) => {
                    if (!didResolve) resolve(), didResolve = true;
                    this.setGeolocation(
                        pos.coords.longitude, 
                        pos.coords.latitude, 
                        pos.coords.altitude || 0, 
                        (pos.coords.accuracy > 0) ? pos.coords.accuracy : undefined,
                        pos.coords.altitudeAccuracy || undefined
                    );
                }, reject, options);
            } else {
                resolve();
            };
        });
    }

    /**
     * Overridable.
     */
    protected onStopGeolocationUpdates() : void {
        if (typeof navigator !== 'undefined' && defined(this._geolocationWatchId)) {
            navigator.geolocation.clearWatch(this._geolocationWatchId);
            this._geolocationWatchId = undefined;
        }
    }

}
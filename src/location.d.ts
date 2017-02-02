/// <reference types="cesium" />
import { Entity, Cartographic } from './cesium/cesium-imports';
import { ContextService, ContextServiceProvider } from './context';
import { SessionService } from './session';
export interface GeolocationOptions {
    enableHighAccuracy?: boolean;
}
/**
 * The location service provides access to the current location.
 * The stage entity provides information about the location represented
 * by the current reality viewer.
 * The physical-stage entity provides information about the user's
 * current physical location.
 * Either entity must be subscribed to via ContextService.subscribe,
 * before their pose relative to the FIXED frame can be retrieved.
 */
export declare class LocationService {
    private sessionService;
    private contextService;
    /**
     * An entity representing the floor plane, defining an
     * East-North-Up coordinate system.
     * This entity must be subscribed to in order to receive pose updates
     * relative to the FIXED frame.
     */
    stage: Entity;
    /**
     * A reference frame representing the physical location of the user,
     * defining an East-North-Up coordinate system.
     */
    physicalStage: Entity;
    constructor(sessionService: SessionService, contextService: ContextService);
    stageCartographic?: Cartographic;
    readonly stageHorizontalAccuracy: number | undefined;
    readonly stageVerticalAccuracy: number | undefined;
    physicalStageCartographic?: Cartographic;
    readonly physicalStageHorizontalAccuracy: number | undefined;
    readonly physicalStageVerticalAccuracy: number | undefined;
    subscribeGeopose(options?: {
        physical: boolean;
    }): Promise<void>;
    unsubscribeGeopose(): void;
    setGeolocationOptions(options: {
        enableHighAccuracy: boolean;
    }): void;
    private _updateCartographic(entity?, cartographic?);
}
export declare class LocationServiceProvider {
    private sessionService;
    private contextServiceProvider;
    private locationService;
    private _currentGeolocationOptions?;
    private _targetGeolocationOptions;
    private _sessionGeolocationOptions;
    constructor(sessionService: SessionService, contextServiceProvider: ContextServiceProvider, locationService: LocationService);
    private _checkPhysicalStageSubscribers();
    private _handleSetGeolocationOptions(session, options);
    private _updateGeolocationOptions();
    protected setGeolocation(longitude?: number, latitude?: number, altitude?: number, horizontalAccuracy?: number, verticalAccuracy?: number): void;
    private _geolocationWatchId?;
    /**
     * Overridable. Should call setGeolocation when new geolocation is available
     */
    protected onStartGeolocationUpdates(options: GeolocationOptions): Promise<void>;
    /**
     * Overridable.
     */
    protected onStopGeolocationUpdates(): void;
}

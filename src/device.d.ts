/// <reference types="cesium" />
import { Entity, Cartesian3, JulianDate, PerspectiveFrustum, Cartographic } from './cesium/cesium-imports';
import { EntityService, EntityServiceProvider } from './entity';
import { SessionService, SessionPort } from './session';
import { CanvasViewport, SerializedSubviewList, SerializedEntityStateMap, GeolocationOptions } from './common';
import { Event } from './utils';
import { ViewService } from './view';
import { VisibilityService } from './visibility';
export declare class DeviceStableState {
    viewport?: CanvasViewport;
    subviews?: SerializedSubviewList;
    entities: SerializedEntityStateMap;
    suggestedGeolocationSubscription?: {
        enableHighAccuracy?: boolean;
    };
    suggestedUserHeight: number;
    geolocationDesired: boolean;
    geolocationOptions?: GeolocationOptions;
    isPresentingHMD: boolean;
    isPresentingRealityHMD: boolean;
    strict: boolean;
}
export declare class DeviceFrameState {
    private _scratchFrustum;
    time: JulianDate;
    viewport: CanvasViewport;
    subviews: SerializedSubviewList;
}
/**
 * The DeviceService provides the current device state
 */
export declare class DeviceService {
    protected sessionService: SessionService;
    protected entityService: EntityService;
    protected viewService: ViewService;
    protected visibilityService: VisibilityService;
    /**
     * If this is true (and we are presenting via webvr api), then
     * vrDisplay.submitFrame is called after the frameState event
     */
    autoSubmitFrame: boolean;
    /**
     * Device state for the current frame. This
     * is not updated unless the view is visible.
     */
    frameState: DeviceFrameState;
    /**
     * An event that fires every time the device frameState is updated.
     */
    frameStateEvent: Event<DeviceFrameState>;
    /**
     * An even that fires when the view starts or stops presenting to an HMD
     */
    presentHMDChangeEvent: Event<void>;
    screenOrientationChangeEvent: Event<void>;
    suggestedGeolocationSubscriptionChangeEvent: Event<void>;
    /**
     * A coordinate system representing the physical space in which the user is free to
     * move around, positioned on the surface the user is standing on,
     * where +X is east, +Y is up, and +Z is south (East-Up-South), if geolocation is known.
     * If the stage is not geolocated, then the +X and +Z directions are arbitrary.
     */
    stage: Entity;
    /**
     * An entity representing the origin of the device coordinate system, +Y up.
     */
    origin: Entity;
    /**
     * An entity representing the physical pose of the user,
     * where +X is right, +Y is up, and -Z is forward
     */
    user: Entity;
    readonly geoHeadingAccuracy: number | undefined;
    readonly geoHorizontalAccuracy: number | undefined;
    readonly geoVerticalAccuracy: number | undefined;
    _geolocationDesired: boolean;
    readonly geolocationDesired: {
        enableHighAccuracy?: boolean | undefined;
    };
    _geolocationOptions: GeolocationOptions | undefined;
    readonly geolocationOptions: GeolocationOptions | undefined;
    private _suggestedGeolocationSubscription;
    private _setSuggestedGeolocationSubscription(options?);
    readonly suggestedGeolocationSubscription: {
        enableHighAccuracy?: boolean | undefined;
    } | undefined;
    defaultUserHeight: number;
    readonly suggestedUserHeight: number;
    readonly strict: boolean;
    protected _scratchCartesian: Cartesian3;
    protected _scratchFrustum: PerspectiveFrustum;
    private _vrDisplays;
    private _vrDisplay;
    readonly vrDisplay: any;
    constructor(sessionService: SessionService, entityService: EntityService, viewService: ViewService, visibilityService: VisibilityService);
    protected _parentState: DeviceStableState | undefined;
    private _updatingFrameState;
    private _updateFrameState;
    readonly screenOrientationDegrees: number;
    protected getScreenOrientationDegrees(): () => any;
    /**
     * Request an animation frame callback for the current view.
     */
    requestAnimationFrame: (callback: (timestamp: number) => void) => number;
    /**
     * Cancel an animation frame callback for the current view.
     */
    cancelAnimationFrame: (id: number) => void;
    /**
     * Start emmitting frameState events
     */
    private _startUpdates();
    /**
     * Stop emitting frameState events
     */
    private _stopUpdates();
    protected onUpdateFrameState(): void;
    private _updateViewport();
    private _updateDefault();
    private _stringIdentifierFromReferenceFrame;
    private _getReachableAncestorReferenceFrames;
    private _scratchArray;
    private _originPose;
    private _updateDefaultOrigin();
    private _updateDefaultUser();
    private _vrFrameData?;
    private _scratchQuaternion;
    private _scratchQuaternion2;
    private _scratchMatrix3;
    private _scratchMatrix4;
    private _defaultLeftBounds;
    private _defaultRightBounds;
    private _updateForWebVR();
    private _hasPolyfillWebVRDisplay();
    protected onRequestPresentHMD(): Promise<void>;
    protected onExitPresentHMD(): Promise<void>;
    createContextFrameState(time: JulianDate, viewport: CanvasViewport, subviewList: SerializedSubviewList, options?: {
        overrideStage?: boolean;
        overrideUser?: boolean;
        overrideView?: boolean;
        floorOffset?: number;
    }): any;
    getSubviewEntity(index: number): Entity;
    subscribeGeolocation(options?: GeolocationOptions, session?: SessionPort): Promise<void>;
    unsubscribeGeolocation(session?: SessionPort): void;
    /**
     * Is the view presenting to an HMD
     */
    readonly isPresentingHMD: boolean;
    /**
     * Is the current reality presenting to an HMD
     */
    readonly isPresentingRealityHMD: boolean;
    requestPresentHMD(): Promise<void>;
    exitPresentHMD(): Promise<void>;
    private _deviceOrientationListener;
    private _deviceOrientation;
    private _deviceOrientationHeadingAccuracy;
    private _negX90;
    private _tryOrientationUpdates();
    private _setupVRPresentChangeHandler();
}
/**
 *
 */
export declare class DeviceServiceProvider {
    protected sessionService: SessionService;
    protected deviceService: DeviceService;
    protected viewService: ViewService;
    protected entityService: EntityService;
    protected entityServiceProvider: EntityServiceProvider;
    private _subscribers;
    constructor(sessionService: SessionService, deviceService: DeviceService, viewService: ViewService, entityService: EntityService, entityServiceProvider: EntityServiceProvider);
    protected handleRequestPresentHMD(session: SessionPort): Promise<void>;
    protected handleExitPresentHMD(session: SessionPort): Promise<void>;
    private _needsPublish;
    private _publishTime;
    private _stableState;
    publishStableState(): void;
    protected onUpdateStableState(stableState: DeviceStableState): void;
    private _currentGeolocationOptions?;
    private _targetGeolocationOptions;
    private _sessionGeolocationOptions;
    private _checkDeviceGeolocationSubscribers();
    private _sctachStageCartesian;
    private _scatchStageMatrix4;
    private _scatchStageMatrix3;
    private _scatchStageQuaternion;
    private _eastUpSouthToFixedFrame;
    protected configureStage(cartographic: Cartographic, geoHorizontalAccuracy?: number, geoVerticalAccuracy?: number): void;
    private _geolocationWatchId?;
    private _scratchCartographic;
    /**
     * Overridable. Should call configureStage when new geolocation is available
     */
    onStartGeolocationUpdates(options: GeolocationOptions): void;
    /**
     * Overridable.
     */
    onStopGeolocationUpdates(): void;
}

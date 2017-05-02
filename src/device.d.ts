/// <reference types="cesium" />
import { Entity, Cartesian3, Quaternion, JulianDate, PerspectiveFrustum, Cartographic } from './cesium/cesium-imports';
import { ContextService, ContextServiceProvider } from './context';
import { SessionService, SessionPort } from './session';
import { CanvasViewport, SerializedSubviewList, SerializedEntityStateMap, ContextFrameState, GeolocationOptions } from './common';
import { Event } from './utils';
import { ViewService } from './view';
import { VisibilityService } from './visibility';
export declare class DeviceStableState {
    viewport?: CanvasViewport;
    subviews?: SerializedSubviewList;
    entities: SerializedEntityStateMap;
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
    protected contextService: ContextService;
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
    /**
     * An entity representing the physical floor-level plane below the user,
     * where +X is east, +Y is North, and +Z is up (if geolocation is known)
     */
    stage: Entity;
    /**
     * An entity representing the physical pose of the user,
     * where +X is right, +Y is up, and -Z is forward
     */
    user: Entity;
    readonly geoHeadingAccuracy: number | undefined;
    readonly geoHorizontalAccuracy: number | undefined;
    readonly geoVerticalAccuracy: number | undefined;
    readonly geolocationDesired: boolean;
    readonly geolocationOptions: GeolocationOptions | undefined;
    defaultUserHeight: number;
    readonly suggestedUserHeight: number;
    readonly strict: boolean;
    private _getEntityPositionInReferenceFrame;
    private _getEntityOrientationInReferenceFrame;
    protected _scratchCartesian: Cartesian3;
    protected _scratchCartesian2: Cartesian3;
    protected _scratchFrustum: PerspectiveFrustum;
    private _vrDisplays;
    private _vrDisplay;
    constructor(sessionService: SessionService, contextService: ContextService, viewService: ViewService, visibilityService: VisibilityService);
    _processContextFrameState(state: ContextFrameState): void;
    protected _parentState: DeviceStableState | undefined;
    private _processStableState(stableState);
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
    private _vrFrameData?;
    private _scratchQuaternion;
    private _scratchQuaternion2;
    private _scratchMatrix3;
    private _scratchMatrix4;
    private _stageEUS;
    /**
     * Defines the webvr standing space, positioned at the stage (EUS) frame by default.
     */
    vrStandingSpace: Entity;
    private _defaultLeftBounds;
    private _defaultRightBounds;
    private _updateForWebVR();
    private _scratchFrameState;
    private _getSerializedEntityState;
    private _hasPolyfillWebVRDisplay();
    protected onRequestPresentHMD(): Promise<void>;
    protected onExitPresentHMD(): Promise<void>;
    /**
     * Generate a frame state for the ContextService.
     *
     * @param time
     * @param viewport
     * @param subviewList
     * @param user
     * @param entityOptions
     */
    createContextFrameState(time: JulianDate, viewport: CanvasViewport, subviewList: SerializedSubviewList, options?: {
        overrideStage?: boolean;
        overrideUser?: boolean;
        overrideView?: boolean;
        floorOffset?: number;
    }): ContextFrameState;
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
    private _updateUserDefault();
    private _tryOrientationUpdates();
    private _setupVRPresentChangeHandler();
}
/**
 *
 */
export declare class DeviceServiceProvider {
    protected sessionService: SessionService;
    protected deviceService: DeviceService;
    protected contextService: ContextService;
    protected viewService: ViewService;
    protected contextServiceProvider: ContextServiceProvider;
    private _subscribers;
    constructor(sessionService: SessionService, deviceService: DeviceService, contextService: ContextService, viewService: ViewService, contextServiceProvider: ContextServiceProvider);
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
    private _handleSetGeolocationOptions(session, options);
    private _updateTargetGeolocationOptions();
    protected _scratchCartesianLocalOrigin: Cartesian3;
    protected _scratchQuaternionLocalOrigin: Quaternion;
    protected _scratchFrustum: PerspectiveFrustum;
    private _identityHPR;
    protected configureStage(cartographic: Cartographic, geoHorizontalAccuracy?: number, geoVerticalAccuracy?: number): void;
    private _geolocationWatchId?;
    private _scratchCartographic;
    /**
     * Overridable. Should call setGeolocation when new geolocation is available
     */
    protected onStartGeolocationUpdates(options: GeolocationOptions): void;
    /**
     * Overridable.
     */
    protected onStopGeolocationUpdates(): void;
}

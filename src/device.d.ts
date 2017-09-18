/// <reference types="cesium" />
/// <reference types="webvr-api" />
import { Entity, Cartesian3, JulianDate, PerspectiveFrustum, Cartographic } from './cesium/cesium-imports';
import { ContextFrameState } from './common';
import { EntityService, EntityServiceProvider } from './entity';
import { SessionService, SessionPort } from './session';
import { CanvasViewport, SerializedSubviewList, GeolocationOptions } from './common';
import { Event } from './utils';
import { ViewService, ViewItems } from './view';
import { VisibilityServiceProvider } from './visibility';
export declare class DeviceStableState {
    viewport?: CanvasViewport;
    subviews?: SerializedSubviewList;
    suggestedGeolocationSubscription?: {
        enableHighAccuracy?: boolean;
    };
    userTracking: 'none' | '3DOF' | '6DOF';
    displayMode: 'hand' | 'head' | 'other';
    isPresentingHMD: boolean;
    isPresentingRealityHMD: boolean;
    strict: boolean;
}
export declare class DeviceFrameState {
    private _scratchFrustum;
    time: JulianDate;
    viewport: CanvasViewport;
    subviews: SerializedSubviewList;
    userTracking: 'none' | '3DOF' | '6DOF';
}
export declare class Device {
    owner: SessionService;
    entityService: EntityService;
    private viewItems;
    vrDisplays: VRDisplay[] | undefined;
    vrDisplay: VRDisplay | undefined;
    userTracking: 'none' | '3DOF' | '6DOF';
    displayMode: 'hand' | 'head' | 'other';
    screenOrientation: number;
    suggestedGeolocationSubscription: {
        enableHighAccuracy?: boolean;
    } | undefined;
    frameState: DeviceFrameState;
    frameStateEvent: Event<DeviceFrameState>;
    vrDisplaysUpdatedEvent: Event<void>;
    vrDisplayChangeEvent: Event<void>;
    userTrackingChangeEvent: Event<void>;
    displayModeChangeEvent: Event<void>;
    screenOrientationChangeEvent: Event<void>;
    suggestedGeolocationSubscriptionChangeEvent: Event<void>;
    deviceGeolocation: Entity;
    deviceOrientation: Entity;
    origin: Entity;
    stage: Entity;
    user: Entity;
    getSubviewEntity(index: number): Entity;
    constructor(owner: SessionService, entityService: EntityService, viewItems: ViewItems);
    private _useWebVR;
    protected _overrideState: DeviceStableState | undefined;
    protected _scratchCartesian: Cartesian3;
    protected _scratchFrustum: PerspectiveFrustum;
    readonly strict: boolean;
    naturalUserHeight: number;
    /**
     * @private
     * deprecated
     * */
    readonly suggestedUserHeight: number;
    readonly hasSeparateRealityLayer: boolean;
    private _running;
    private _previousNumListeners;
    private _checkFrameStateListeners();
    private _selectVRDisplay();
    private _handleScreenOrientationChange;
    private _handleVRDisplayPresentChange;
    private _onUpdateFrameState;
    onUpdateFrameState(): void;
    private _updateViewport();
    private _updateDefault();
    private _updateDefaultStage();
    private _updateDefaultUser();
    private _updateDefaultOrigin();
    private _vrFrameData?;
    private _scratchQuaternion;
    private _scratchQuaternion2;
    private _scratchMatrix3;
    private _scratchMatrix4;
    private _defaultLeftBounds;
    private _defaultRightBounds;
    private _sittingSpace;
    private _updateForWebVR();
    private _deviceOrientationListener;
    private _deviceOrientationHeadingAccuracy;
    private _negX90;
    private _tryOrientationUpdates();
    private _hasPolyfillWebVRDisplay();
    readonly screenOrientationDegrees: number;
    /**
     * Request an animation frame callback
     */
    requestAnimationFrame: ((callback: (timestamp: number) => void) => number);
    /**
     * Cancel an animation frame callback
     */
    cancelAnimationFrame: ((id: number) => void);
    requestHeadDisplayMode(): Promise<void>;
    exitHeadDisplayMode(): Promise<void>;
    _setState(state: DeviceStableState): void;
    _contextFrameState: ContextFrameState;
    private _scratchGeolocationCartesian;
    private _scratchGeolocationMatrix4;
    private _srcatchGeolocationMatrix3;
    private _scratchGeolocationQuaternion;
    private _eastUpSouthToFixedFrame;
    protected onGeolocationUpdate(cartographic: Cartographic, geoHorizontalAccuracy?: number, geoVerticalAccuracy?: number): void;
    private _geolocationWatchId?;
    private _scratchCartographic;
    /**
     * Overridable. Should call configureStage when new geolocation is available
     */
    startGeolocationUpdates(options: GeolocationOptions): void;
    /**
     * Overridable.
     */
    stopGeolocationUpdates(): void;
}
/**
 * The DeviceService provides the current device state
 */
export declare class DeviceService {
    protected sessionService: SessionService;
    protected entityService: EntityService;
    protected viewService: ViewService;
    private _device;
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
     * An even that fires when the view starts or stops presenting to an HMD.
     * Deprecated. Use displayModeChangeEvent
     */
    presentHMDChangeEvent: Event<void>;
    /**
     * An event that fires when the display changes
     */
    vrDisplayChangeEvent: Event<void>;
    readonly vrDisplay: VRDisplay | undefined;
    readonly vrDisplays: VRDisplay[] | undefined;
    /**
     * An even that fires when the display mode changes
     */
    displayModeChangeEvent: Event<void>;
    readonly displayMode: "head" | "hand" | "other";
    screenOrientationChangeEvent: Event<void>;
    readonly screenOrientationDegrees: number;
    userTrackingChangeEvent: Event<void>;
    /**
     * Returns the DOF support of the device.
     * "none"|"3DOF"|"6DOF"
     */
    readonly userTracking: "none" | "3DOF" | "6DOF";
    vrDisplaysUpdatedEvent: Event<void>;
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
    /**
     * The heading accuracy of the user's geopose
     */
    readonly geoHeadingAccuracy: number | undefined;
    /**
     * The horizontal accuracy of the user's geopose
     */
    readonly geoHorizontalAccuracy: number | undefined;
    /**
     * The horizontal accuracy of the user's geopose
     */
    readonly geoVerticalAccuracy: number | undefined;
    suggestedGeolocationSubscriptionChangeEvent: Event<void>;
    readonly suggestedGeolocationSubscription: {
        enableHighAccuracy?: boolean | undefined;
    } | undefined;
    readonly suggestedUserHeight: number;
    readonly strict: boolean;
    constructor(sessionService: SessionService, entityService: EntityService, viewService: ViewService, _device: Device);
    /**
     * Internal.
     * @private
     */
    _processContextFrameState(frameState: ContextFrameState): void;
    /**
     * Request an animation frame callback for the current view.
     */
    requestAnimationFrame: any;
    /**
     * Cancel an animation frame callback for the current view.
     */
    cancelAnimationFrame: any;
    /**
     * Start emmitting frameState events
     */
    private _startUpdates();
    /**
     * Stop emitting frameState events
     */
    private _stopUpdates();
    private _onDeviceFrameEvent;
    protected onRequestPresentHMD(): Promise<void>;
    protected onExitPresentHMD(): Promise<void>;
    createContextFrameState(time: JulianDate, viewport: CanvasViewport, subviewList: SerializedSubviewList, options?: {
        overrideStage?: boolean;
        overrideUser?: boolean;
        overrideView?: boolean;
        floorOffset?: number;
        userTracking?: 'none' | '3DOF' | '6DOF';
    }): any;
    getSubviewEntity: any;
    subscribeGeolocation(options?: GeolocationOptions, session?: SessionPort): Promise<void>;
    unsubscribeGeolocation(session?: SessionPort): void;
    /**
     * Is the view presenting to an HMD.
     * Same as `displayMode === 'head'`.
     */
    readonly isPresentingHMD: boolean;
    /**
     * Is the current reality presenting to an HMD.
     * Same as `displayMode === 'head' && `hasSeparateRealityLayer === true`.
     */
    readonly isPresentingRealityHMD: boolean;
    readonly hasSeparateRealityLayer: boolean;
    requestPresentHMD(): Promise<void>;
    exitPresentHMD(): Promise<void>;
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
    protected visibilityServiceProvider: VisibilityServiceProvider;
    protected device: Device;
    constructor(sessionService: SessionService, deviceService: DeviceService, viewService: ViewService, entityService: EntityService, entityServiceProvider: EntityServiceProvider, visibilityServiceProvider: VisibilityServiceProvider, device: Device);
    protected handleRequestPresentHMD(session: SessionPort): Promise<void>;
    protected handleExitPresentHMD(session: SessionPort): Promise<void>;
    needsPublish: boolean;
    private _stableState;
    publishStableState(): void;
    protected onUpdateStableState(stableState: DeviceStableState): void;
    private _currentGeolocationOptions?;
    private _targetGeolocationOptions;
    private _sessionGeolocationOptions;
    private _checkDeviceGeolocationSubscribers();
}

/// <reference types="cesium" />
import { Entity, Cartesian3, Quaternion, JulianDate, PerspectiveFrustum } from './cesium/cesium-imports';
import { ContextService, ContextServiceProvider } from './context';
import { SessionService, SessionPort } from './session';
import { Viewport, SerializedSubviewList, SerializedEntityStateMap, ContextFrameState, GeolocationOptions } from './common';
import { Event } from './utils';
import { ViewService } from './view';
export declare class DeviceState {
    viewport?: Viewport;
    subviews?: SerializedSubviewList;
    entities: SerializedEntityStateMap;
    suggestedUserHeight: number;
    geolocationDesired: boolean;
    geolocationOptions: GeolocationOptions;
    isPresentingHMD: boolean;
    strict: boolean;
}
export declare class DeviceFrameState extends DeviceState {
    private _scratchFrustum;
    screenOrientationDegrees: number;
    time: JulianDate;
    viewport: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    subviews: SerializedSubviewList;
}
export declare class DeviceService {
    protected sessionService: SessionService;
    protected contextService: ContextService;
    protected viewService: ViewService;
    autoSubmitFrame: boolean;
    deviceState: DeviceState;
    frameState: DeviceFrameState;
    frameStateEvent: Event<DeviceFrameState>;
    /**
     * An entity representing the local origin, defining an
     * East-North-Up coordinate system.
     */
    localOrigin: Entity;
    /**
     * An entity representing the physical pose of the user
     */
    user: Entity;
    /**
     * An entity representing the physical floor-level plane below the user
     */
    stage: Entity;
    /**
     * An entity representing the pose of the display (not taking into account screen rotation)
     */
    display: Entity;
    readonly geoHeadingAccuracy: number | undefined;
    readonly geoHorizontalAccuracy: number | undefined;
    readonly geoVerticalAccuracy: number | undefined;
    private _getEntityPositionInReferenceFrame;
    private _getEntityOrientationInReferenceFrame;
    protected _scratchCartesian: Cartesian3;
    protected _scratchFrustum: PerspectiveFrustum;
    constructor(sessionService: SessionService, contextService: ContextService, viewService: ViewService);
    private _onDeviceState(deviceState);
    private _updating;
    private _updateFrameState;
    private _updateDisplayPose();
    getScreenOrientationDegrees(): any;
    /**
     * Request an animation frame callback for the current view.
     */
    requestAnimationFrame: (callback: (timestamp: number) => void) => number;
    cancelAnimationFrame: (id: number) => void;
    /**
     * Start emmitting frameState events
     */
    startUpdates(): void;
    /**
     * Stop emitting frameState events
     */
    stopUpdates(): void;
    protected onUpdateFrameState(): void;
    private _updateStageDefault();
    private _updateDefault();
    private _vrFrameData?;
    private _scratchQuaternion;
    private _scratchQuaternion2;
    private _scratchMatrix3;
    private _scratchMatrix4;
    private _localOriginEUS;
    /**
     * Defines a +Y coordinate system positioned at the local origin, by default.
     */
    standingSpace: Entity;
    /**
     * Rotate the standing space around +Y
     */
    configureStandingSpaceHeadingOffset(headingOffset?: number): void;
    private _updateForWebVR();
    private _scratchFrameState;
    private _getSerializedEntityState;
    private _getAncestorReferenceFrames;
    private _deviceLocalOriginRelativeToDeviceUserPose;
    private _scratchLocalOrigin;
    createContextFrameState(time: JulianDate, viewport: Viewport, subviewList: SerializedSubviewList, user: Entity, entityOptions?: {
        localOrigin?: Entity;
        ground?: Entity;
    }): ContextFrameState;
    getSubviewEntity(index: number): Entity;
    subscribeGeolocation(options?: GeolocationOptions, session?: SessionPort): Promise<void>;
    unsubscribeGeolocation(session?: SessionPort): void;
    readonly isPresentingHMD: boolean;
    requestPresentHMD(): Promise<void>;
    exitPresentHMD(): Promise<void>;
    private _deviceOrientationListener;
    private _deviceOrientation;
    private _deviceOrientationHeadingAccuracy;
    private _updateUserDefault();
    private _tryOrientationUpdates();
    private _setupVRPresentChangeHandler();
}
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
    publishDeviceState(): void;
    defaultUserHeight: number;
    readonly suggestedUserHeight: number;
    protected onUpdateDeviceState(deviceState: DeviceState): void;
    private _currentGeolocationOptions?;
    private _targetGeolocationOptions;
    private _sessionGeolocationOptions;
    private _checkDeviceGeolocationSubscribers();
    private _handleSetGeolocationOptions(session, options);
    private _updateTargetGeolocationOptions();
    protected _scratchCartesianLocalOrigin: Cartesian3;
    protected _scratchQuaternionLocalOrigin: Quaternion;
    protected _scratchFrustum: PerspectiveFrustum;
    protected configureLocalOrigin(longitude?: number, latitude?: number, altitude?: number, geoHorizontalAccuracy?: number, geoVerticalAccuracy?: number): void;
    private _scratchStagePosition;
    protected updateStageDefault(): void;
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

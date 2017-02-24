/// <reference types="cesium" />
import { Entity, JulianDate } from './cesium/cesium-imports';
import { ContextService, ContextServiceProvider } from './context';
import { SessionService, SessionPort } from './session';
import { Viewport, SerializedSubviewList, SerializedEntityStateMap, FrameState, GeolocationOptions } from './common';
import { ViewService } from './view';
export declare class SuggestedFrameState {
    private _scratchFrustum;
    time: JulianDate;
    viewport: Viewport;
    subviews: SerializedSubviewList;
    entities: SerializedEntityStateMap;
    geolocationDesired: boolean;
    geolocationOptions: GeolocationOptions;
    strict: boolean;
}
export declare class DeviceService {
    private sessionService;
    private contextService;
    suggestedFrameState?: SuggestedFrameState;
    /**
     * An entity representing the local origin, defining an
     * East-North-Up coordinate system.
     */
    localOrigin: Entity;
    /**
     * An entity representing the physical floor-level plane below the user
     */
    stage: Entity;
    /**
     * An entity representing the physical pose of the user
     */
    user: Entity;
    readonly geoHeadingAccuracy: number | undefined;
    readonly geoHorizontalAccuracy: number | undefined;
    readonly geoVerticalAccuracy: number | undefined;
    private _getEntityPositionInReferenceFrame;
    private _scratchCartesian;
    private _scratchMatrix3;
    private _scratchMatrix4;
    constructor(sessionService: SessionService, contextService: ContextService);
    private _defaultFrameState;
    private _onNextFrameState(suggestedFrameState?);
    /**
     * Request the next (suggested) frame state. Before the returned promise is resolved,
     * the device user entity (as well as any other subscribed entities)
     * will be updated to reflect the latest pose data. The device-user entity
     * is the only entity which is automatically updated when calling this function;
     * Any other data must be explicitly subscribed to in order to receive an updated pose.
     */
    requestFrameState(): Promise<SuggestedFrameState>;
    private _scratchFrameState;
    private _getSerializedEntityState;
    private _deviceLocalOriginRelativeToDeviceUserPose;
    private _scratchLocalOrigin;
    createFrameState(time: JulianDate, viewport: Viewport, subviewList: SerializedSubviewList, user: Entity, localOrigin?: Entity): FrameState;
    getSubviewEntity(index: number): Entity;
    subscribeGeolocation(options?: GeolocationOptions, session?: SessionPort): Promise<void>;
    unsubscribeGeolocation(session?: SessionPort): void;
    private _isPresentingHMD;
    readonly isPresentingHMD: boolean;
    requestPresentHMD(): Promise<void>;
    exitPresentHMD(): Promise<void>;
    private _scratchQuaternion;
    private _scratchQuaternion2;
    private _deviceOrientationListener;
    private _deviceOrientation;
    private _deviceOrientationHeadingAccuracy;
    private _updateDeviceUserPoseFromDeviceOrientation();
    private _tryOrientationUpdates();
}
export declare class DeviceServiceProvider {
    protected sessionService: SessionService;
    protected deviceService: DeviceService;
    protected contextService: ContextService;
    protected viewService: ViewService;
    protected contextServiceProvider: ContextServiceProvider;
    private _getSerializedEntityState;
    constructor(sessionService: SessionService, deviceService: DeviceService, contextService: ContextService, viewService: ViewService, contextServiceProvider: ContextServiceProvider);
    private _isPresentingHMD;
    protected setPresentingHMD(state: boolean): void;
    protected onRequestFrameState(session: SessionPort): Promise<SuggestedFrameState>;
    protected onRequestPresentHMD(session: SessionPort): Promise<void>;
    onExitPresentHMD(session: SessionPort): Promise<void>;
    private _suggestedFrameState;
    private _getEntityPositionInReferenceFrame;
    private _getEntityOrientationInReferenceFrame;
    private _scratchCartesianUpdate;
    private _scratchQuaternionUpdate;
    update(): SuggestedFrameState;
    defaultUserHeightHandheld: number;
    defaultUserHeightHMD: number;
    readonly defaultUserHeight: number;
    private _scratchFrustum;
    protected onUpdate(frameState: SuggestedFrameState): void;
    private _currentGeolocationOptions?;
    private _targetGeolocationOptions;
    private _sessionGeolocationOptions;
    private _checkDeviceGeolocationSubscribers();
    private _handleSetGeolocationOptions(session, options);
    private _updateTargetGeolocationOptions();
    private _scratchCartesianLocalOrigin;
    private _scratchQuaternionLocalOrigin;
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
export declare class DOMDeviceServiceProvider extends DeviceServiceProvider {
    autoSubmitFrame: boolean;
    static isAvailable(): boolean;
    constructor(sessionService: SessionService, deviceService: DeviceService, contextService: ContextService, viewService: ViewService, contextServiceProvider: ContextServiceProvider);
    protected onRequestFrameState(session: SessionPort): Promise<SuggestedFrameState>;
    protected onUpdate(suggestedFrameState: SuggestedFrameState): void;
    private _vrFrameData?;
    private _scratchCartesian;
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
    private _updateFrameStateFromWebVR(suggestedFrameState);
    /**
     * Request an animation frame callback for the current view.
     */
    requestAnimationFrame(callback: (timestamp: number) => void): any;
    cancelAnimationFrame(id: number): void;
    onRequestPresentHMD(session: SessionPort): Promise<void>;
    onExitPresentHMD(session: SessionPort): Promise<void>;
}

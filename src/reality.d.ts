import { DeprecatedPartialFrameState, ViewState } from './common';
import { SessionPort, SessionService } from './session';
import { Event } from './utils';
import { ContextService } from './context';
import { FocusService } from './focus';
import { ViewService } from './view';
import { DeviceService } from './device';
import { RealityViewer } from './reality-viewers/base';
export declare abstract class RealityViewerFactory {
    private _createEmptyReality;
    private _createLiveReality;
    private _createHostedReality;
    constructor(_createEmptyReality: any, _createLiveReality: any, _createHostedReality: any);
    createRealityViewer(uri: string): RealityViewer;
}
export interface RealityViewerRequestOptions {
    uri?: string;
    geopose?: boolean;
}
/**
* A service which manages the reality view.
* For an app developer, the RealityService instance can be used to
* set preferences which can affect how the manager selects a reality view.
*/
export declare class RealityService {
    private sessionService;
    private contextService;
    private focusService;
    private viewService;
    private deviceService;
    private realityViewerFactor;
    /**
     * Manager/Viewer-only. An event that is raised when the current reality emits the next view state.
     */
    readonly viewStateEvent: Event<ViewState>;
    private _viewStateEvent;
    /**
     * An event that is raised when a reality viewer provides a session
     * for sending and receiving application commands.
     */
    readonly connectEvent: Event<SessionPort>;
    private _connectEvent;
    /**
     * An event that is raised when the presenting reality viewer is changed.
     */
    readonly changeEvent: Event<{
        previous?: string | undefined;
        current?: string | undefined;
    }>;
    private _changeEvent;
    /**
     * The URI for the currently presenting Reality Viewer.
     */
    readonly current: string | undefined;
    private _current?;
    /**
     * Manager-only. An event that is raised when a reality viewer is installed.
     */
    readonly installedEvent: Event<{
        uri: string;
    }>;
    private _installedEvent;
    /**
     * Manager-only. An event that is raised when a reality viewer is uninstalled.
     */
    readonly uninstalledEvent: Event<{
        uri: string;
    }>;
    private _uninstalledEvent;
    /**
     * The default Reality Viewer
     */
    default?: string;
    readonly geoposeNeeded: boolean;
    private _geoposeNeeded;
    private _geoposeSubscribers;
    private _viewerByURI;
    private _installersByURI;
    constructor(sessionService: SessionService, contextService: ContextService, focusService: FocusService, viewService: ViewService, deviceService: DeviceService, realityViewerFactor: RealityViewerFactory);
    /**
     * Deprecated. Use pubishViewState.
     * @deprecated
     */
    publishFrame(state: DeprecatedPartialFrameState): void;
    /**
     * RealityViewer-only. Publish the next view state.
     */
    publishViewState(view: ViewState): void;
    /**
     * Install the specified reality viewer
     */
    install(uri: string): Promise<void>;
    protected _install(session: SessionPort, uri: string): void;
    private _connectViewerWithSession(viewerSession, session);
    /**
     * Uninstall the specified reality viewer
     */
    uninstall(uri: string): Promise<void>;
    protected _uninstall(session: SessionPort, uri: string): Promise<never>;
    /**
     * Request that the provided reality viewer be presented. Pass `undefined` to
     * hint that the manager should select the best available viewer.
     */
    request(options: RealityViewerRequestOptions | undefined): Promise<void>;
    protected _request(session: SessionPort, options?: RealityViewerRequestOptions): Promise<SessionPort | undefined> | undefined;
    private _checkViewerSessionForGeoposeSupport(viewerSession);
    private _checkGeoposeNeeded();
    /**
     * @private
     */
    setDesired(reality: {
        uri: string;
    } | undefined): void;
    private _setPresentingReality(uri);
    getViewerByURI(uri: string): RealityViewer | undefined;
}

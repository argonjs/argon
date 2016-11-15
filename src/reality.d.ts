/// <reference types="cesium" />
import { ReferenceFrame, JulianDate } from './cesium/cesium-imports';
import { RealityViewer, DeprecatedPartialFrameState, FrameState, ViewState, DeprecatedEyeParameters } from './common';
import { FocusService } from './focus';
import { SessionPort, SessionService } from './session';
import { Event } from './utils';
/**
 * Abstract class for a reality setup handler
 */
export declare abstract class RealityLoader {
    abstract type: string;
    abstract load(reality: RealityViewer, callback: (realitySession: SessionPort) => void): any;
}
/**
* A service which manages the reality view.
* For an app developer, the RealityService instance can be used to
* set preferences which can affect how the manager selects a reality view.
*/
export declare class RealityService {
    private sessionService;
    private focusService;
    /**
     * A collection of known reality views from which the reality service can select.
     */
    realities: RealityViewer[];
    /**
     * An event that is raised when a reality control port is opened.
     */
    connectEvent: Event<SessionPort>;
    /**
     * Manager-only. An event that is raised when the current reality is changed.
     */
    private _changeEvent;
    readonly changeEvent: Event<{
        previous?: RealityViewer | undefined;
        current: RealityViewer;
    }>;
    /**
     * Manager/Viewer-only. An event that is raised when the current reality emits the next view state.
     */
    private _viewStateEvent;
    readonly viewStateEvent: Event<ViewState>;
    /**
     * Deprecated. Use viewStateEvent.
     */
    private _frameEvent;
    readonly frameEvent: Event<FrameState>;
    /**
     * Manager-only. A map from a managed session to the desired reality
     */
    desiredRealityMap: WeakMap<SessionPort, RealityViewer>;
    /**
     * Manager-only. A map from a desired reality to the session which requested it
     */
    desiredRealityMapInverse: WeakMap<RealityViewer | undefined, SessionPort>;
    /**
     * Manager-only. An event that is raised when a session changes it's desired reality.
     */
    sessionDesiredRealityChangeEvent: Event<{
        session: SessionPort;
        previous: RealityViewer | undefined;
        current: RealityViewer | undefined;
    }>;
    private _session?;
    readonly session: SessionPort | undefined;
    private _default;
    private _current?;
    private _desired?;
    private _loaders;
    constructor(sessionService: SessionService, focusService: FocusService);
    /**
     * Set the default reality.
     */
    setDefault(reality: RealityViewer): void;
    /**
     * Manager-only. Register a reality loader
     */
    registerLoader(handler: RealityLoader): void;
    /**
     * Manager-only. Get the current reality view.
     * @deprecated. Use app.context.getCurrentReality()
     */
    getCurrent(): RealityViewer | undefined;
    /**
    * Manager-only. Check if a type of reality is supported.
    * @param type reality type
    * @return true if a handler exists and false otherwise
    */
    isSupported(reality: RealityViewer): boolean;
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
     * Set the desired reality.
     */
    setDesired(reality: RealityViewer | undefined): void;
    /**
     * Get the desired reality
     */
    getDesired(): RealityViewer | undefined;
    /**
     * Set the optional reference frames for this app
     */
    setOptionalReferenceFrames(referenceFrames: (ReferenceFrame | string)[]): void;
    /**
     * Set the optional reference frames for this app
     */
    setRequiredReferenceFrames(referenceFrames: (ReferenceFrame | string)[]): void;
    /**
    * Manager-only. Selects the best reality based on the realites
    * requested by all managed sessions. Can be overriden for customized selection.
    *
    * @returns The reality chosen for this context. May be undefined if no
    * realities have been requested.
    */
    onSelectReality(): RealityViewer | undefined;
    private _scratchFrustum;
    private _scratchArray;
    /**
     * Deprecated. Remove after v1.2
     * @private
     */
    onGenerateViewFromEyeParameters(eye: DeprecatedEyeParameters, t: JulianDate): ViewState | undefined;
    private _loadID;
    private _setNextReality(reality?, force?);
    private _getLoader(reality);
    private _setCurrent(reality);
    private _executeRealityLoader(reality, callback);
}

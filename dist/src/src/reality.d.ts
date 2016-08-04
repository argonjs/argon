/// <reference types="cesium" />
import { ReferenceFrame } from './cesium/cesium-imports';
import { RealityView, SerializedPartialFrameState, SerializedFrameState, SerializedViewParameters, SerializedEyeParameters } from './common';
import { FocusService } from './focus';
import { SessionPort, SessionService } from './session';
import { Event } from './utils';
/**
 * Abstract class for a reality setup handler
 */
export declare abstract class RealityLoader {
    abstract type: string;
    abstract load(reality: RealityView, callback: (realitySession: SessionPort) => void): any;
}
export declare enum RealityZoomState {
    OTHER = 0,
    START = 1,
    CHANGE = 2,
    END = 3,
}
export interface RealityZoomData {
    zoom: number;
    fov: number;
    naturalFov: number;
    state: RealityZoomState;
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
    realities: RealityView[];
    /**
     * An event that is raised when a reality control port is opened.
     */
    connectEvent: Event<SessionPort>;
    /**
     * Manager-only. An event that is raised when the current reality is changed.
     */
    private _changeEvent;
    readonly changeEvent: Event<{
        previous?: RealityView | undefined;
        current: RealityView;
    }>;
    /**
     * Manager-only. An event that is raised when the current reality emits the next frame state.
     * This event contains pose updates for the entities that are managed by
     * the current reality.
     */
    private _frameEvent;
    readonly frameEvent: Event<SerializedFrameState>;
    /**
     * Manager-only. A map from a managed session to the desired reality
     */
    desiredRealityMap: WeakMap<SessionPort, RealityView>;
    /**
     * Manager-only. A map from a desired reality to the session which requested it
     */
    desiredRealityMapInverse: WeakMap<RealityView | undefined, SessionPort>;
    /**
     * Manager-only. An event that is raised when a session changes it's desired reality.
     */
    sessionDesiredRealityChangeEvent: Event<{
        session: SessionPort;
        previous: RealityView | undefined;
        current: RealityView | undefined;
    }>;
    private _realitySession?;
    private _default;
    private _current?;
    private _desired?;
    private _loaders;
    private _defaultFov;
    private _desiredFov;
    constructor(sessionService: SessionService, focusService: FocusService);
    /**
     * Set the default reality.
     */
    setDefault(reality: RealityView): void;
    /**
     * Manager-only. Register a reality loader
     */
    registerLoader(handler: RealityLoader): void;
    /**
     * Manager-only. Get the current reality view.
     * @deprecated. Use app.context.getCurrentReality()
     */
    getCurrent(): RealityView | undefined;
    /**
    * Manager-only. Check if a type of reality is supported.
    * @param type reality type
    * @return true if a handler exists and false otherwise
    */
    isSupported(reality: RealityView): boolean;
    /**
     * Reality-only. Publish the next frame state.
     */
    publishFrame(state: SerializedPartialFrameState): void;
    /**
     * Set the desired reality.
     */
    setDesired(reality: RealityView | undefined): void;
    /**
     * Get the desired reality
     */
    getDesired(): RealityView | undefined;
    /**
     * Set the optional reference frames for this app
     */
    setOptionalReferenceFrames(referenceFrames: (ReferenceFrame | string)[]): void;
    /**
     * Set the optional reference frames for this app
     */
    setRequiredReferenceFrames(referenceFrames: (ReferenceFrame | string)[]): void;
    /**
     * Set a desired fov in radians.
     */
    setDesiredFov(fov: number | undefined): void;
    /**
     * Get the desired fov in radians
     */
    getDesiredFov(): number | undefined;
    /**
     * Set the default fov in radians, and adjust the desired fov to match the
     * previous desired / default ratio.
     */
    setDefaultFov(fov: number): void;
    /**
     * Get the default fov in radians
     */
    getDefaultFov(): number;
    /**
     * Returns a maximum viewport
     */
    getMaximumViewport(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /**
    * Manager-only. Selects the best reality based on the realites
    * requested by all managed sessions. Can be overriden for customized selection.
    *
    * @returns The reality chosen for this context. May be undefined if no
    * realities have been requested.
    */
    onSelectReality(): RealityView | undefined;
    private _scratchFrustum;
    private _scratchArray;
    onGenerateViewFromEyeParameters(eye: SerializedEyeParameters): SerializedViewParameters;
    zoom(data: {
        zoom: number;
        fov: number;
        naturalFov?: number;
        state: RealityZoomState;
    }): void;
    protected onZoom(data: RealityZoomData): number;
    private _loadID;
    private _setNextReality(reality?, force?);
    private _getLoader(reality);
    private _setCurrent(reality);
    private _executeRealityLoader(reality, callback);
}

import { JulianDate, ReferenceFrame } from './cesium/cesium-imports';
import { TimerService } from './timer';
import { FocusService } from './focus';
import { SessionPort, SessionService } from './session';
import { DeviceService } from './device';
import { MessagePortLike, Event } from './utils';
/**
* Represents a view of Reality
*/
export interface RealityView {
    type: string;
    id?: string;
    [option: string]: any;
}
/**
 * A which describes the position, orientation, and referenceFrame of an entity.
 */
export interface SerializedEntityPose {
    position?: {
        x: number;
        y: number;
        z: number;
    };
    orientation?: {
        x: number;
        y: number;
        z: number;
        w: number;
    };
    referenceFrame: ReferenceFrame | string;
}
/**
 * A JSON map of entity ids and their associated poses.
 */
export interface SerializedEntityPoseMap {
    [id: string]: SerializedEntityPose;
}
/**
 * Viewport is expressed using a right-handed coordinate system with the origin
 * at the bottom left corner.
 */
export interface Viewport {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare enum SubviewType {
    SINGULAR,
    LEFTEYE,
    RIGHTEYE,
    OTHER,
}
/**
 * The serialized rendering parameters for a particular subview
 */
export interface SerializedSubview {
    type: SubviewType;
    projectionMatrix: number[];
    pose?: SerializedEntityPose;
    viewport?: Viewport;
}
/**
 * The serialized view parameters describe how the application should render each frame
 */
export interface SerializedViewParameters {
    /**
     * The primary viewport to render into. In a DOM environment, the bottom left corner of the document element
     * (document.documentElement) should be considered the origin.
     */
    viewport: Viewport;
    /**
     * The primary pose for this view.
     */
    pose: SerializedEntityPose;
    /**
     * The list of subviews to render.
     */
    subviews: SerializedSubview[];
}
/**
 * Describes the serialized frame state.
 */
export interface SerializedFrameState {
    frameNumber: number;
    time: JulianDate;
    view: SerializedViewParameters;
    entities?: SerializedEntityPoseMap;
}
/**
 * Describes the complete frame state which is emitted by the RealityService.
 */
export interface FrameState extends SerializedFrameState {
    reality: RealityView;
    entities: SerializedEntityPoseMap;
}
export declare abstract class RealitySetupHandler {
    abstract type: string;
    abstract setup(reality: RealityView, port: MessagePortLike): void;
}
/**
* Manages reality
*/
export declare class RealityService {
    private sessionService;
    private focusService;
    /**
     * An event that is raised when a reality control port is opened.
     */
    connectEvent: Event<SessionPort>;
    /**
     * An event that is raised when the current reality is changed.
     */
    changeEvent: Event<{
        previous: RealityView;
        current: RealityView;
    }>;
    /**
     * An event that is raised when the current reality emits the next frame state.
     * This event contains pose updates for the entities that are managed by
     * the current reality.
     */
    frameEvent: Event<FrameState>;
    /**
     * Manager-only. A map from a managed session to the desired reality
     */
    desiredRealityMap: WeakMap<SessionPort, RealityView>;
    /**
     * Manager-only. A map from a desired reality to the session which requested it
     */
    desiredRealityMapInverse: WeakMap<RealityView, SessionPort>;
    private _realitySession;
    private _default;
    private _current;
    private _desired;
    private _handlers;
    constructor(sessionService: SessionService, focusService: FocusService);
    /**
     * Manager-only. Register a reality setup handler
     */
    registerHandler(handler: RealitySetupHandler): void;
    /**
     * Get the current reality view
     */
    getCurrent(): RealityView;
    /**
    * Manager-only. Check if a type of reality is supported.
    * @param type reality type
    * @return true if a handler exists and false otherwise
    */
    isSupported(type: string): boolean;
    /**
     * Set the desired reality.
     */
    setDesired(reality: {
        type: string;
    }): void;
    /**
     * Get the desired reality
     */
    getDesired(): RealityView;
    /**
     * Set the default reality. Manager-only.
     */
    setDefault(reality: RealityView): void;
    /**
    * Manager-only. Selects the best reality based on the realites
    * requested by all managed sessions. Can be overriden for customized selection.
    *
    * @returns The reality chosen for this context. May be undefined if no
    * realities have been requested.
    */
    onSelectReality(): RealityView;
    private _setNextReality(reality);
    private _getHandler(type);
    private _setCurrent(reality);
    private _executeRealitySetupHandler(reality, port);
}
export declare class EmptyRealitySetupHandler implements RealitySetupHandler {
    private sessionService;
    private deviceService;
    private timer;
    type: string;
    constructor(sessionService: SessionService, deviceService: DeviceService, timer: TimerService);
    setup(reality: RealityView, port: MessagePortLike): void;
}

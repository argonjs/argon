import { JulianDate, ReferenceFrame } from './cesium/cesium-imports';
import { TimerService } from './timer';
import { FocusService } from './focus';
import { SessionPort, SessionService } from './session';
import { CameraService, Camera } from './camera';
import { DeviceService } from './device';
import { MessagePortLike, Event } from './utils';
import { ViewportService, Viewport } from './viewport';
/**
* Represents a Reality
*/
export interface Reality {
    type: string;
    id?: string;
    [option: string]: any;
}
/**
 * Describes the position, orientation, and referenceFrame of an entity.
 */
export interface EntityPose {
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
 * A map of entity ids and their associated poses.
 */
export interface EntityPoseMap {
    EYE?: EntityPose;
    [id: string]: EntityPose;
}
/**
 * Describes the minimal frame state that is provided by a reality.
 */
export interface MinimalFrameState {
    frameNumber: number;
    time: JulianDate;
    entities?: EntityPoseMap;
    camera?: Camera;
    viewport?: Viewport;
}
/**
 * Describes the complete frame state which is emitted by the RealityService.
 */
export interface FrameState extends MinimalFrameState {
    reality: Reality;
    entities: EntityPoseMap;
    camera: Camera;
    viewport: Viewport;
}
export declare abstract class RealitySetupHandler {
    abstract type: string;
    abstract setup(reality: Reality, port: MessagePortLike): void;
}
/**
* Manages reality
*/
export declare class RealityService {
    handlers: RealitySetupHandler[];
    private sessionService;
    private cameraService;
    private deviceService;
    private focusService;
    private viewportService;
    /**
     * The current reality.
     */
    current: Reality;
    /**
     * The desired reality.
     */
    desired: Reality;
    /**
     * An event that is raised when a reality control port is opened.
     */
    readonly connectEvent: Event<SessionPort>;
    /**
     * An event that is raised when the current reality is changed.
     */
    readonly changeEvent: Event<{
        previous: Reality;
    }>;
    /**
     * An event that is raised when the current reality emits the next frame state.
     * This event contains pose updates for the entities that are managed by
     * the current reality.
     */
    readonly frameEvent: Event<FrameState>;
    /**
     * Manager-only. A map from a managed session to the desired reality
     */
    readonly desiredRealityMap: WeakMap<SessionPort, Reality>;
    /**
     * Manager-only. A map from a desired reality to the session which requested it
     */
    readonly desiredRealityMapInverse: WeakMap<Reality, SessionPort>;
    private _realitySession;
    constructor(handlers: RealitySetupHandler[], sessionService: SessionService, cameraService: CameraService, deviceService: DeviceService, focusService: FocusService, viewportService: ViewportService);
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
    * Manager-only. Selects the best reality based on the realites
    * requested by all managed sessions. Can be overriden for customized selection.
    *
    * @returns The reality chosen for this context. May be undefined if no
    * realities have been requested.
    */
    onSelectReality(): Reality;
    private _setNextReality(reality);
    private _getHandler(type);
    private _setCurrent(reality);
    private _executeRealitySetupHandler(reality, port);
}
export declare class EmptyRealitySetupHandler implements RealitySetupHandler {
    private sessionService;
    private timer;
    type: string;
    constructor(sessionService: SessionService, timer: TimerService);
    setup(reality: Reality, port: MessagePortLike): void;
}

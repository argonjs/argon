import { PerspectiveFrustum } from './cesium/cesium-imports';
import { SessionService, SessionPort } from './session';
import { ViewService } from './view';
import { Event } from './utils';
/**
 * Represents a type of Camera.
 */
export interface Camera {
    /**
     * The type of camera. Can be inspected to determine a more
     * specific interface this can be cast to.
     */
    type: string;
    /**
     * Any additional properties that describe the camera state.
     */
    [option: string]: any;
}
/**
 * Represents a camera state with information on field of view and offset.
 */
export interface PerspectiveCamera extends Camera {
    fovY?: number;
    fovX?: number;
    xOffset?: number;
    yOffset?: number;
}
/**
 * Manages the camera state
 */
export declare class CameraService {
    private sessionService;
    private viewportService;
    /**
     * An event that is raised when the current camera state has changed
     */
    changeEvent: Event<{
        previous: Camera;
    }>;
    /**
     * Describes the current camera state
     */
    current: Camera;
    /**
    * The current camera frustum.
    */
    currentFrustum: PerspectiveFrustum;
    /**
     * Describes the desired camera state
     */
    desired: Camera;
    /**
     * Manager-only. Maps a managed session to it's desired camera state.
     */
    desiredCameraMap: WeakMap<SessionPort, Camera>;
    private _currentJSON;
    constructor(sessionService: SessionService, viewportService: ViewService);
    /**
     * Get the suggested camera state
     */
    getSuggested(): Camera;
    /**
     * Set the desired camera state
     */
    setDesired(state: Camera): void;
    /**
     * Set the current camera state. Called internally.
     */
    _setCamera(camera: Camera): void;
}

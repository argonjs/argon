import {inject} from 'aurelia-dependency-injection';
import {
    CesiumMath,
    PerspectiveFrustum
} from './cesium/cesium-imports'
import {SessionService, SessionPort} from './session';
import {RealityService} from './reality';
import {ViewportService} from './viewport'
import {Event} from './utils';

/**
 * Represents a type of Camera.
 */
export interface Camera {
    /**
     * The type of camera. Can be inspected to determine a more
     * specific interface this can be cast to.
     */
    type: string,

    /**
     * Any additional properties that describe the camera state.
     */
    [option: string]: any
}

/**
 * Represents a camera state with information on field of view and offset.
 */
export interface PerspectiveCamera extends Camera {
    //type:'perspective',   Commented out for the moment because typedoc does not recognize this as valid typescript.
    fovY?: number,
    fovX?: number,
    xOffset?: number,
    yOffset?: number
}

/**
 * Manages the camera state
 */
@inject(SessionService, ViewportService)
export class CameraService {

    /**
     * An event that is raised when the current camera state has changed
     */
    public changeEvent = new Event<{ previous: Camera }>();

    /**
     * Describes the current camera state
     */
    public current: Camera;

    /**
    * The current camera frustum.
    */
    public currentFrustum = new PerspectiveFrustum;

    /**
     * Describes the desired camera state
     */
    public desired: Camera;

    /**
     * Manager-only. Maps a managed session to it's desired camera state.
     */
    public desiredCameraMap = new WeakMap<SessionPort, Camera>();

    private _currentJSON: string;

    constructor(private sessionService: SessionService, private viewportService: ViewportService) {

        if (sessionService.isManager()) {
            sessionService.connectEvent.addEventListener((session) => {
                session.on['ar.camera.desired'] = (camera: Camera) => {
                    this.desiredCameraMap.set(session, camera);
                }
            })
        }

    }

    /**
     * Get the suggested camera state
     */
    public getSuggested(): Camera {
        return {
            type: "perspective",
            fovY: CesiumMath.toRadians(60)
        };
    }

    /**
     * Set the desired camera state
     */
    public setDesired(state: Camera) {
        this.desired = state;
        this.sessionService.manager.send('ar.camera.desired', state);
    }

    /**
     * Set the current camera state. Called internally.
     */
    public _setCamera(camera: Camera) {
        if (this._currentJSON !== JSON.stringify(camera)) {
            const previous = this.current;
            this.current = camera;

            if (camera.type === 'perspective') {
                const perspectiveCamera = <PerspectiveCamera>camera;
                if (!perspectiveCamera.fovX && !perspectiveCamera.fovY) {
                    console.error('Camera state is invalid: both fovX and fovY are missing.')
                    return;
                }
                const frustum = this.currentFrustum;
                const aspect = frustum.aspectRatio = perspectiveCamera.fovX && perspectiveCamera.fovY ?
                    Math.tan(perspectiveCamera.fovX * 0.5) / Math.tan(perspectiveCamera.fovY * 0.5) :
                    this.viewportService.current.width / this.viewportService.current.height;
                if (aspect > 1) {
                    if (!perspectiveCamera.fovX) perspectiveCamera.fovX = 2 * Math.atan(Math.tan(perspectiveCamera.fovY * 0.5) * aspect);
                    frustum.fov = perspectiveCamera.fovX;
                } else {
                    if (!perspectiveCamera.fovY) perspectiveCamera.fovY = 2 * Math.atan(Math.tan(perspectiveCamera.fovX * 0.5) / aspect);
                    frustum.fov = perspectiveCamera.fovY;
                }
                frustum['xOffset'] = perspectiveCamera.xOffset;
                frustum['yOffset'] = perspectiveCamera.yOffset;
            }

            this.changeEvent.raiseEvent({ previous });
        }
    }

}

import { Container } from 'aurelia-dependency-injection';
import { CanvasViewport } from '../common';
import { SessionService } from '../session';
import { DeviceService } from '../device';
import { ViewService } from '../view';
import { RealityViewer } from './base';
/**
 * Note: To use this reality, an app must load three.js
 *
 * To share a canvas, an app must do the following:
 *   - Have a canvas element
 *   - Call Argon.init with sharedCanvas=true
 *   - Register the canvas element via setLayers
 *   - Do not clear the canvas (e.g. set renderer.autoClear=false in three.js)
 *   - Rebind GL state before rendering (e.g. renderer.resetGLState() in three.js)
 */
export declare class TangoRealityViewer extends RealityViewer {
    private sessionService;
    private viewService;
    private container;
    private deviceService;
    uri: string;
    vrDisplay: any;
    type: string;
    private _scene;
    private _cameraOrtho;
    private _cameraMesh;
    private _cameraPersp;
    private _cameraScene;
    private _pointCloud;
    private _points;
    private _pointsToSkip;
    private _frameData;
    private _renderPointCloud;
    private _initFinished;
    private _renderer;
    private _sharedCanvasFinal;
    private _vrDisplay;
    private _lastGeoHorizontalAccuracy;
    private _tangoOriginLost;
    constructor(sessionService: SessionService, viewService: ViewService, container: Container, deviceService: DeviceService, uri: string, vrDisplay: any);
    private _scratchMatrix3;
    private _scratchMatrix4;
    private _scratchCartesian;
    load(): void;
    protected initTango(): void;
    protected loadScripts(): Promise<void>;
    protected initCameraAndPointcloud(): void;
    protected initViewportAndCanvas(): void;
    protected updateViewport(viewport: CanvasViewport): void;
}

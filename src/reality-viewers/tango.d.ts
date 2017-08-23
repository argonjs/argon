import { Container } from 'aurelia-dependency-injection';
import { CanvasViewport } from '../common';
import { SessionService } from '../session';
import { ContextService } from '../context';
import { DeviceService } from '../device';
import { ViewService } from '../view';
import { RealityViewer } from './base';
export declare class TangoRealityViewer extends RealityViewer {
    private sessionService;
    private viewService;
    private contextService;
    private container;
    private deviceService;
    uri: string;
    vrDisplay: any;
    type: string;
    userTracking: 'none' | '3DOF' | '6DOF';
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
    private _usePointCloudForOcclusion;
    private _initFinished;
    private _renderer;
    private _sharedCanvasFinal;
    private _vrDisplay;
    private _lastGeoHorizontalAccuracy;
    private _tangoOriginLost;
    private _tangoOriginLostPreviousFrame;
    constructor(sessionService: SessionService, viewService: ViewService, contextService: ContextService, container: Container, deviceService: DeviceService, uri: string, vrDisplay: any);
    private _scratchMatrix3;
    private _scratchMatrix4;
    private _scratchCartesian;
    load(): void;
    protected initTango(): void;
    protected loadScripts(): Promise<void>;
    private points_vertexShader;
    private points_fragmentShader;
    protected initCameraAndPointcloud(): void;
    protected initViewportAndCanvas(): void;
    protected updateViewport(viewport: CanvasViewport): void;
}

import { CanvasViewport } from '../common';
import { SessionService } from '../session';
import { ContextService } from '../context';
import { DeviceService } from '../device';
import { ViewService } from '../view';
import { RealityViewer } from './base';
/**
 * Note: To use this reality, an app must do the following:
 *   - Load three.js
 *   - Have a canvas element
 *   - Do not clear the canvas (e.g. set renderer.autoClear=false in three.js)
 *   - Rebind your GL state before rendering (e.g. renderer.resetGLState() in three.js)
 *   - Currently depends on the following relative files:
 *      - ../resources/artoolkit/camera_para.dat
 *      - ../resources/artoolkit/patt.hiro
 *      - ../resources/artoolkit/patt.kanji
 */
export declare class WebRTCRealityViewer extends RealityViewer {
    private sessionService;
    private contextService;
    private viewService;
    private deviceService;
    uri: string;
    type: string;
    private _arScene;
    private _arController;
    private _renderer;
    private _aggregator;
    private _moveFlags;
    constructor(sessionService: SessionService, contextService: ContextService, viewService: ViewService, deviceService: DeviceService, uri: string);
    private _scratchMatrix3;
    private _scratchMatrix4;
    load(): void;
    protected initARToolKit(): void;
    protected initARController(): void;
    protected updateViewport(viewport: CanvasViewport): void;
    protected updateProjection(viewport: CanvasViewport): void;
}

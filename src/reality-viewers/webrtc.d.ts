import { Container } from 'aurelia-dependency-injection';
import { CanvasViewport } from '../common';
import { SessionService } from '../session';
import { ContextService } from '../context';
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
    private viewService;
    private contextService;
    private container;
    uri: string;
    type: string;
    private _arScene;
    private _arController;
    private _renderer;
    private _scratchCartesian;
    private _scratchQuaternion;
    private _artoolkitTrackerEntity;
    private _artoolkitProjection;
    private _markerEntities;
    private _resolveReady;
    private _artoolkitReady;
    private _aggregator;
    private _moveFlags;
    constructor(sessionService: SessionService, viewService: ViewService, contextService: ContextService, container: Container, uri: string);
    private _scratchMatrix3;
    private _scratchMatrix4;
    load(): void;
    private _getIdForMarker(markerUID);
    private _resetMarkers();
    protected initARToolKit(): Promise<void>;
    protected initARController(): Promise<void>;
    protected updateViewport(viewport: CanvasViewport): void;
    protected updateProjection(viewport: CanvasViewport): void;
}

import { Container } from 'aurelia-dependency-injection';
import { CanvasViewport } from '../common';
import { SessionService } from '../session';
import { ContextService } from '../context';
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
export declare class WebRTCRealityViewer extends RealityViewer {
    private sessionService;
    private viewService;
    private contextService;
    private container;
    uri: string;
    type: string;
    userTracking: 'none' | '3DOF' | '6DOF';
    private _arScene;
    private _arController;
    private _renderer;
    private _sharedCanvasFinal;
    private _scratchCartesian;
    private _scratchQuaternion;
    private _artoolkitTrackerEntity;
    private _artoolkitProjection;
    private _markerEntities;
    private _resolveReady;
    private _rejectReady;
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

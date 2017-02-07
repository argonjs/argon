/// <reference types="cesium" />
import { Container } from 'aurelia-dependency-injection';
import { Entity, PerspectiveFrustum, JulianDate } from './cesium/cesium-imports';
import { SessionService } from './session';
import { ViewportService } from './viewport';
import { LocationService } from './location';
import { Viewport, SubviewType, SerializedSubviewList } from './common';
import { EntityPose, ContextService, ContextServiceProvider } from './context';
/**
 * The rendering paramters for a particular subview
 */
export declare class Subview {
    index: number;
    type: SubviewType;
    frustum: PerspectiveFrustum;
    pose: EntityPose;
    viewport: Viewport;
}
export interface ViewState {
    viewport: Viewport;
    subviews: SerializedSubviewList;
    strict: boolean;
}
export declare class ViewService {
    private sessionService;
    private contextService;
    private viewportService;
    private _subviews;
    private _frustums;
    constructor(sessionService: SessionService, contextService: ContextService, viewportService: ViewportService, container: Container);
    private _processFrameState(state);
    /**
     * An entity representing the pose of the viewer.
     */
    eye: Entity;
    readonly eyeHeadingAccuracy: number | undefined;
    /**
     * An entity representing the physical pose of the viewer.
     */
    physicalEye: Entity;
    suggestedViewState?: ViewState;
    readonly element: HTMLDivElement;
    getViewport(): Viewport;
    readonly subviews: Subview[];
    getSubviews(): Subview[];
    getSubviewEntity(index: number): Entity;
    /**
     * Request an animation frame cal\\\\\\\\\\\\\]]]]]]]]]]]\\\\lback.
     */
    requestAnimationFrame(callback: (now: JulianDate) => void): number;
}
export declare class ViewServiceProvider {
    private sessionService;
    private contextService;
    private contextServiceProvider;
    private viewService;
    private viewportService;
    private locationService;
    autoSubmitFrame: boolean;
    constructor(sessionService: SessionService, contextService: ContextService, contextServiceProvider: ContextServiceProvider, viewService: ViewService, viewportService: ViewportService, locationService: LocationService);
    update(): void;
    protected onUpdate(): void;
    readonly isPresentingHMD: boolean;
    requestPresentHMD(): Promise<void>;
    exitPresentHMD(): Promise<void>;
    private _updateViewSingular();
    private _vrFrameData?;
    private _updateViewFromWebVR(vrDisplay);
}

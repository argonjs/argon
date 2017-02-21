/// <reference types="cesium" />
import { Container } from 'aurelia-dependency-injection';
import { Clock, Entity, PerspectiveFrustum, JulianDate } from './cesium/cesium-imports';
import { SessionService } from './session';
import { ViewportService } from './viewport';
import { LocationService } from './location';
import { Viewport, SubviewType, SerializedSubviewList } from './common';
import { EntityPose, ContextService, ContextServiceProvider } from './context';
import { Event } from './utils';
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
    time: JulianDate;
    viewport: Viewport;
    subviews: SerializedSubviewList;
    strict: boolean;
}
export declare class ViewService {
    private sessionService;
    private contextService;
    private viewportService;
    suggestedViewStateEvent: Event<ViewState>;
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
    readonly element: HTMLElement;
    getViewport(): Viewport;
    readonly subviews: Subview[];
    getSubviews(): Subview[];
    getSubviewEntity(index: number): Entity;
}
export declare class ViewServiceProvider {
    private sessionService;
    private contextService;
    private contextServiceProvider;
    private viewService;
    private viewportService;
    private locationService;
    clock: Clock;
    autoSubmitFrame: boolean;
    constructor(sessionService: SessionService, contextService: ContextService, contextServiceProvider: ContextServiceProvider, viewService: ViewService, viewportService: ViewportService, locationService: LocationService);
    /**
     * Request an animation frame callback for the current view.
     */
    requestAnimationFrame(callback: (timestamp: number) => void): number;
    cancelAnimationFrame(id: number): void;
    update(): void;
    protected onUpdate(): void;
    readonly isPresentingHMD: boolean;
    requestPresentHMD(): Promise<void>;
    exitPresentHMD(): Promise<void>;
    private tick();
    private _updateViewSingular();
    private _vrFrameData?;
    private _updateViewFromWebVR(vrDisplay);
}

import 'aurelia-polyfills';
import * as DI from 'aurelia-dependency-injection';
import * as Cesium from './cesium/cesium-imports';
import './webvr';
import { SessionService } from './session';
import { Configuration } from './common';
import { Event } from './utils';
import { ContextService, ContextServiceProvider } from './context';
import { FocusService, FocusServiceProvider } from './focus';
import { LocationService, LocationServiceProvider } from './location';
import { RealityService, RealityServiceProvider } from './reality';
import { ViewService, ViewServiceProvider } from './view';
import { ViewportService, ViewportServiceProvider } from './viewport';
import { VisibilityService, VisibilityServiceProvider } from './visibility';
import { VuforiaService, VuforiaServiceProvider } from './vuforia';
import { RealityViewer } from './reality-viewers/base';
import { EmptyRealityViewer } from './reality-viewers/empty';
import { LiveRealityViewer } from './reality-viewers/live';
import { HostedRealityViewer } from './reality-viewers/hosted';
export { DI, Cesium };
export * from './common';
export * from './context';
export * from './focus';
export * from './location';
export * from './reality';
export * from './session';
export * from './ui';
export * from './utils';
export * from './view';
export * from './viewport';
export * from './visibility';
export * from './vuforia';
export { RealityViewer, EmptyRealityViewer, LiveRealityViewer, HostedRealityViewer };
export declare class ArgonSystemProvider {
    context: ContextServiceProvider;
    focus: FocusServiceProvider;
    location: LocationServiceProvider;
    visibility: VisibilityServiceProvider;
    reality: RealityServiceProvider;
    view: ViewServiceProvider;
    viewport: ViewportServiceProvider;
    vuforia: VuforiaServiceProvider;
    constructor(context: ContextServiceProvider, focus: FocusServiceProvider, location: LocationServiceProvider, visibility: VisibilityServiceProvider, reality: RealityServiceProvider, view: ViewServiceProvider, viewport: ViewportServiceProvider, vuforia: VuforiaServiceProvider);
}
/**
 * A composition root which instantiates the object graph based on a provided configuration.
 * You generally want to create a new ArgonSystem via the provided [[init]] or [[initReality]] functions:
 * ```ts
 * var app = Argon.init(); // app is an instance of ArgonSystem
 * ```
 */
export declare class ArgonSystem {
    container: DI.Container;
    /**
     * The ArgonSystem instance which shares a view provided by a manager
     */
    static instance?: ArgonSystem;
    constructor(elementOrSelector: string | Element | null | undefined, config: Configuration, container?: DI.Container);
    readonly provider: ArgonSystemProvider | undefined;
    readonly context: ContextService;
    readonly focus: FocusService;
    readonly location: LocationService;
    readonly reality: RealityService;
    readonly session: SessionService;
    readonly view: ViewService;
    readonly viewport: ViewportService;
    readonly visibility: VisibilityService;
    readonly vuforia: VuforiaService;
    readonly updateEvent: Event<any>;
    readonly renderEvent: Event<any>;
    readonly focusEvent: Event<void>;
    readonly blurEvent: Event<void>;
    destroy(): void;
}
/**
 * Create an ArgonSystem instance.
 * If we are running within a [[REALITY_MANAGER]],
 * this function will create an ArgonSystem which has the [[REALITY_AUGMENTOR]] role.
 * If we are not running within a [[REALITY_MANAGER]],
 * this function will create an ArgonSystem which has the [[REALITY_MANAGER]] role.
 */
export declare function init(configuration?: Configuration, dependencyInjectionContainer?: DI.Container): ArgonSystem;
export declare function init(element?: string | HTMLDivElement | null, configuration?: Configuration, dependencyInjectionContainer?: DI.Container): ArgonSystem;
/**
 * Initialize an [[ArgonSystem]] with the [[REALITY_VIEWER]] role
 */
export declare function initRealityViewer(configuration?: Configuration, dependencyInjectionContainer?: DI.Container): ArgonSystem;
/**
 * @private
 */
export declare const initReality: typeof initRealityViewer;

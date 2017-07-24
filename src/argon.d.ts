import 'aurelia-polyfills';
import * as DI from 'aurelia-dependency-injection';
import * as Cesium from './cesium/cesium-imports';
import './webvr';
import { SessionService } from './session';
import { Configuration } from './common';
import { Event } from './utils';
import { EntityService, EntityServiceProvider } from './entity';
import { ContextService, ContextServiceProvider } from './context';
import { FocusService, FocusServiceProvider } from './focus';
import { DeviceService, DeviceServiceProvider } from './device';
import { RealityService, RealityServiceProvider } from './reality';
import { ViewService, ViewServiceProvider } from './view';
import { VisibilityService, VisibilityServiceProvider } from './visibility';
import { VuforiaService, VuforiaServiceProvider } from './vuforia';
import { PermissionService, PermissionServiceProvider } from './permission';
import { RealityViewer } from './reality-viewers/base';
import { EmptyRealityViewer } from './reality-viewers/empty';
import { LiveRealityViewer } from './reality-viewers/live';
import { HostedRealityViewer } from './reality-viewers/hosted';
export { DI, Cesium };
export * from './common';
export * from './context';
export * from './entity';
export * from './focus';
export * from './device';
export * from './reality';
export * from './session';
export * from './ui';
export * from './utils';
export * from './view';
export * from './visibility';
export * from './vuforia';
export * from './permission';
export { RealityViewer, EmptyRealityViewer, LiveRealityViewer, HostedRealityViewer };
export declare class ArgonSystemProvider {
    entity: EntityServiceProvider;
    context: ContextServiceProvider;
    focus: FocusServiceProvider;
    device: DeviceServiceProvider;
    visibility: VisibilityServiceProvider;
    reality: RealityServiceProvider;
    view: ViewServiceProvider;
    vuforia: VuforiaServiceProvider;
    permission: PermissionServiceProvider;
    constructor(entity: EntityServiceProvider, context: ContextServiceProvider, focus: FocusServiceProvider, device: DeviceServiceProvider, visibility: VisibilityServiceProvider, reality: RealityServiceProvider, view: ViewServiceProvider, vuforia: VuforiaServiceProvider, permission: PermissionServiceProvider);
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
    entity: EntityService;
    context: ContextService;
    device: DeviceService;
    focus: FocusService;
    reality: RealityService;
    session: SessionService;
    view: ViewService;
    visibility: VisibilityService;
    vuforia: VuforiaService;
    permission: PermissionService;
    /**
     * The ArgonSystem instance which shares a view provided by a manager
     */
    static instance?: ArgonSystem;
    constructor(container: DI.Container, entity: EntityService, context: ContextService, device: DeviceService, focus: FocusService, reality: RealityService, session: SessionService, view: ViewService, visibility: VisibilityService, vuforia: VuforiaService, permission: PermissionService);
    private _setupDOM();
    readonly suggestedPixelRatio: number;
    _provider: ArgonSystemProvider;
    readonly provider: ArgonSystemProvider;
    readonly updateEvent: Event<any>;
    readonly renderEvent: Event<any>;
    readonly focusEvent: Event<void>;
    readonly blurEvent: Event<void>;
    destroy(): void;
}
export declare class ArgonConfigurationManager {
    configuration: Configuration;
    container: DI.Container;
    elementOrSelector: HTMLElement | string | null;
    static configure(configurationManager: ArgonConfigurationManager): void;
    constructor(configuration: Configuration, container?: DI.Container, elementOrSelector?: HTMLElement | string | null);
    standardConfiguration(): void;
    defaultConnect(): void;
    defaultUI(): void;
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

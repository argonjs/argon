/// <reference types="cesium" />
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
import { WebRTCRealityViewer } from './reality-viewers/webrtc';
import { TangoRealityViewer } from './reality-viewers/tango';
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
export { RealityViewer, EmptyRealityViewer, LiveRealityViewer, HostedRealityViewer, WebRTCRealityViewer, TangoRealityViewer };
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
    readonly stage: Cesium.Entity;
    readonly stageEUS: Cesium.Entity;
    readonly stageENU: Cesium.Entity;
    readonly user: Cesium.Entity;
    getEntityPose: typeof ContextService.prototype.getEntityPose;
    subscribeGeolocation: typeof ContextService.prototype.subscribeGeolocation;
    unsubscribeGeolocation: typeof ContextService.prototype.unsubscribeGeolocation;
    /**
     * The mode of the current display. This can be either
     * 'hand' for handheld display mode, 'head' for a head-mounted mode,
     * or 'other'.
     */
    readonly displayMode: "head" | "hand" | "other";
    /**
     * The DOF supported by the current reality.
     */
    readonly userTracking: "none" | "3DOF" | "6DOF";
    /**
     * If geopose is available, this is the accuracy of the user heading
     */
    readonly geoHeadingAccuracy: number | undefined;
    /**
     * If geopose is available, this is the vertical accuracy of the user geolocation
     */
    readonly geoVerticalAccuracy: number | undefined;
    /**
     * If geopose is available, this is the vertical accuracy of the user geolocation
     */
    readonly geoHorizontalAccuracy: number | undefined;
    destroy(): void;
}
export declare class ArgonContainerManager {
    configuration: Configuration;
    container: DI.Container;
    elementOrSelector: string | HTMLElement | null | undefined;
    static configure(configurationManager: ArgonContainerManager): void;
    constructor(configuration: Configuration, container?: DI.Container, elementOrSelector?: string | HTMLElement | null | undefined);
    readonly app: ArgonSystem;
    standardConfiguration(): void;
    defaultConnect(): void;
    defaultRealityFactory(): void;
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

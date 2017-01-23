import 'aurelia-polyfills';
import * as DI from 'aurelia-dependency-injection';
import * as Cesium from './cesium/cesium-imports';
import './webvr';
import { SessionService } from './session';
import { Configuration } from './common';
import { ContextService } from './context';
import { DeviceService } from './device';
import { FocusService } from './focus';
import { RealityService } from './reality';
import { Event } from './utils';
import { ViewService } from './view';
import { VuforiaService } from './vuforia';
import { RealityViewer } from './reality-viewers/base';
import { EmptyRealityViewer } from './reality-viewers/empty';
import { LiveRealityViewer } from './reality-viewers/live';
import { HostedRealityViewer } from './reality-viewers/hosted';
export { DI, Cesium };
export * from './common';
export * from './context';
export * from './device';
export * from './focus';
export * from './reality';
export * from './session';
export * from './ui';
export * from './utils';
export * from './view';
export * from './vuforia';
export { RealityViewer, EmptyRealityViewer, LiveRealityViewer, HostedRealityViewer };
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
    constructor(containerElement: string | HTMLDivElement | null | undefined, config: Configuration, container?: DI.Container);
    readonly context: ContextService;
    readonly device: DeviceService;
    readonly focus: FocusService;
    readonly reality: RealityService;
    readonly session: SessionService;
    readonly view: ViewService;
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
export declare function init(containerElement?: string | HTMLDivElement | null, configuration?: Configuration, dependencyInjectionContainer?: DI.Container): ArgonSystem;
/**
 * Initialize an [[ArgonSystem]] with the [[REALITY_VIEWER]] role
 */
export declare function initRealityViewer(configuration?: Configuration, dependencyInjectionContainer?: DI.Container): ArgonSystem;
/**
 * Not yet implemented.
 * @private
 */
export declare function initUnshared(containerElement: string | HTMLElement, configuration?: Configuration, dependencyInjectionContainer?: DI.Container): ArgonSystem;

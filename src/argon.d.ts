import 'aurelia-polyfills';
import * as DI from 'aurelia-dependency-injection';
import * as Cesium from './cesium/cesium-imports';
import * as URI from 'urijs';
import { SessionService } from './session';
import { Configuration } from './common';
import { ContextService, Frame } from './context';
import { DeviceService } from './device';
import { FocusService } from './focus';
import { RealityService } from './reality';
import { TimerService } from './timer';
import { Event } from './utils';
import { ViewService } from './view';
import { VuforiaService } from './vuforia';
import { EmptyRealityLoader } from './reality-loader/empty';
import { LiveVideoRealityLoader } from './reality-loader/live_video';
import { HostedRealityLoader } from './reality-loader/hosted';
export { DI, Cesium, URI };
export * from './common';
export * from './context';
export * from './device';
export * from './focus';
export * from './reality';
export * from './session';
export * from './timer';
export * from './utils';
export * from './view';
export * from './vuforia';
export { EmptyRealityLoader, LiveVideoRealityLoader, HostedRealityLoader };
/**
 * A composition root which instantiates the object graph based on a provided configuration.
 * You generally want to create a new ArgonSystem via the provided [[init]] or [[initReality]] functions:
 * ```ts
 * var app = Argon.init(); // app is an instance of ArgonSystem
 * ```
 */
export declare class ArgonSystem {
    container: DI.Container;
    static instance?: ArgonSystem;
    constructor(config: Configuration, container?: DI.Container);
    readonly context: ContextService;
    readonly device: DeviceService;
    readonly focus: FocusService;
    readonly reality: RealityService;
    readonly session: SessionService;
    readonly timer: TimerService;
    readonly view: ViewService;
    readonly vuforia: VuforiaService;
    readonly updateEvent: Event<Frame>;
    readonly renderEvent: Event<Frame>;
    readonly focusEvent: Event<void>;
    readonly blurEvent: Event<void>;
}
export interface InitParameters {
    configuration?: Configuration;
    container?: DI.Container;
}
/**
 * Create an ArgonSystem instance.
 * If we are running within a [[REALITY_MANAGER]],
 * this function will create an ArgonSystem which has the [[REALITY_AUGMENTOR]] role.
 * If we are not running within a [[REALITY_MANAGER]],
 * this function will create an ArgonSystem which has the [[REALITY_MANAGER]] role.
 * @param initParameters InitParameters
 */
export declare function init({configuration, container}?: InitParameters): ArgonSystem;
/**
 * Initialize an [[ArgonSystem]] with the [[REALITY_VIEW]] role
 */
export declare function initReality({configuration, container}?: InitParameters): ArgonSystem;
export interface InitLocalParameters extends InitParameters {
    containerElement: HTMLElement;
}
/**
 * Not yet implemented.
 * @private
 */
export declare function initLocal({containerElement, configuration, container}: InitLocalParameters): ArgonSystem;

import 'aurelia-polyfills';
import * as DI from 'aurelia-dependency-injection';
import * as Cesium from './cesium/cesium-imports';
import { SessionService } from './session';
import { Configuration } from './common';
import { ContextService } from './context';
import { DeviceService } from './device';
import { FocusService } from './focus';
import { RealityService, FrameState } from './reality';
import { TimerService } from './timer';
import { Event } from './utils';
import { ViewService } from './view';
import { VuforiaService } from './vuforia';
export { DI, Cesium };
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
/**
 * A composition root which instantiates the object graph based on a provided configuration
 */
export declare class ArgonSystem {
    container: DI.Container;
    static instance: ArgonSystem;
    constructor(config: Configuration, container?: DI.Container);
    readonly context: ContextService;
    readonly device: DeviceService;
    readonly focus: FocusService;
    readonly reality: RealityService;
    readonly session: SessionService;
    readonly timer: TimerService;
    readonly view: ViewService;
    readonly vuforia: VuforiaService;
    readonly updateEvent: Event<FrameState>;
    readonly renderEvent: Event<FrameState>;
    readonly focusEvent: Event<void>;
    readonly blurEvent: Event<void>;
}
export declare function init(options?: {
    config?: Configuration;
    container?: DI.Container;
}): ArgonSystem;
export declare function initReality(options?: {
    config?: Configuration;
    container?: DI.Container;
}): ArgonSystem;

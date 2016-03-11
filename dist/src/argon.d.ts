import 'aurelia-polyfills';
import { Container } from 'aurelia-dependency-injection';
import * as Cesium from './cesium/cesium-imports.ts';
import { Context } from './context.ts';
import { TimerService } from './timer.ts';
import { DeviceService } from './device.ts';
import { RealityService } from './reality.ts';
import { ViewService } from './view.ts';
import { VuforiaService } from './vuforia.ts';
import { SessionConfiguration } from './session.ts';
export { Container, Cesium };
export * from './timer.ts';
export * from './device.ts';
export * from './session.ts';
export * from './reality.ts';
export * from './context.ts';
export * from './utils.ts';
export * from './view.ts';
export * from './vuforia.ts';
export declare class ArgonSystem {
    container: Container;
    static instance: ArgonSystem;
    constructor(config: SessionConfiguration, container?: Container);
    readonly configuration: SessionConfiguration;
    readonly context: Context;
    readonly timer: TimerService;
    readonly device: DeviceService;
    readonly reality: RealityService;
    readonly view: ViewService;
    readonly vuforia: VuforiaService;
}
export declare function init(options?: {
    config?: SessionConfiguration;
    container?: Container;
}): ArgonSystem;
export declare function initReality(options?: {
    config?: SessionConfiguration;
    container?: Container;
}): ArgonSystem;

import 'aurelia-polyfills';
import { Container } from 'aurelia-dependency-injection';
import * as Cesium from './cesium/cesium-imports';
import { SessionService } from './session';
import { CameraService } from './camera';
import { Configuration } from './config';
import { ContextService } from './context';
import { DeviceService } from './device';
import { FocusService } from './focus';
import { InteractionModeService } from './mode';
import { RealityService, FrameState } from './reality';
import { TimerService } from './timer';
import { Event } from './utils';
import { VuforiaService } from './vuforia';
import { ViewportService } from './viewport';
export { Container, Cesium };
export * from './camera';
export * from './config';
export * from './context';
export * from './device';
export * from './focus';
export * from './mode';
export * from './reality';
export * from './session';
export * from './timer';
export * from './utils';
export * from './viewport';
export * from './vuforia';
/**
 * A composition root which instantiates the object graph based on a provided configuration
 */
export declare class ArgonSystem {
    container: Container;
    static instance: ArgonSystem;
    constructor(config: Configuration, container?: Container);
    readonly camera: CameraService;
    readonly context: ContextService;
    readonly device: DeviceService;
    readonly focus: FocusService;
    readonly interactionMode: InteractionModeService;
    readonly reality: RealityService;
    readonly session: SessionService;
    readonly timer: TimerService;
    readonly viewport: ViewportService;
    readonly vuforia: VuforiaService;
    readonly updateEvent: Event<FrameState>;
    readonly renderEvent: Event<FrameState>;
    readonly focusEvent: Event<void>;
    readonly blurEvent: Event<void>;
}
export declare function init(options?: {
    config?: Configuration;
    container?: Container;
}): ArgonSystem;
export declare function initReality(options?: {
    config?: Configuration;
    container?: Container;
}): ArgonSystem;

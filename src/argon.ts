import 'aurelia-polyfills'
import {Container} from 'aurelia-dependency-injection'
import * as Cesium from './cesium/cesium-imports'

import {
    SessionService,
    ConnectService,
    LoopbackConnectService,
    DOMConnectService,
    DebugConnectService,
    WKWebViewConnectService,
    AndroidConnectService,
} from './session'

import {CameraService} from './camera'
import {Configuration, Role} from './config'
import {ContextService} from './context'
import {DeviceService} from './device'
import {FocusService} from './focus'
import {InteractionModeService} from './mode'
import {RealityService, RealitySetupHandler, EmptyRealitySetupHandler, FrameState} from './reality'
import {TimerService} from './timer'
import {Event} from './utils'
import {VuforiaService, VuforiaRealitySetupHandler} from './vuforia'
import {ViewportService} from './viewport'


export {Container, Cesium}
export * from './camera'
export * from './config'
export * from './context'
export * from './device'
export * from './focus'
export * from './mode'
export * from './reality'
export * from './session'
export * from './timer'
export * from './utils'
export * from './viewport'
export * from './vuforia'

/**
 * A composition root which instantiates the object graph based on a provided configuration
 */
export class ArgonSystem {

    static instance: ArgonSystem;

    constructor(config: Configuration, public container = new Container()) {
        ArgonSystem.instance = this;

        if (!config.defaultReality) config.defaultReality = { type: 'empty' }

        container.registerInstance('config', config);
        container.registerInstance(Role, config.role);
        container.registerInstance(ArgonSystem, this);

        container.registerSingleton(RealitySetupHandler, EmptyRealitySetupHandler);
        container.registerSingleton(RealitySetupHandler, VuforiaRealitySetupHandler);

        if (config.role === Role.MANAGER) {
            container.registerSingleton(
                ConnectService,
                LoopbackConnectService
            );
        } else if (WKWebViewConnectService.isAvailable()) {
            container.registerSingleton(
                ConnectService,
                WKWebViewConnectService
            )
        } else if (AndroidConnectService.isAvailable()) {
            container.registerSingleton(
                ConnectService,
                AndroidConnectService
            )
        } else if (DebugConnectService.isAvailable()) {
            container.registerSingleton(
                ConnectService,
                DebugConnectService
            );
        } else if (DebugConnectService.isAvailable()) {
            container.registerSingleton(
                ConnectService,
                DOMConnectService
            );
        } else {
            container.registerSingleton(
                ConnectService,
                LoopbackConnectService
            );
        }

        // ensure the entire object graph is instantiated before connecting to the manager. 
        for (const key of Object.keys(ArgonSystem.prototype)) {
            this[key];
        }

        this.session.connect();
    }

    public get camera(): CameraService {
        return this.container.get(CameraService);
    }

    public get context(): ContextService {
        return this.container.get(ContextService);
    }

    public get device(): DeviceService {
        return this.container.get(DeviceService);
    }

    public get focus(): FocusService {
        return this.container.get(FocusService);
    }

    public get interactionMode(): InteractionModeService {
        return this.container.get(InteractionModeService);
    }

    public get reality(): RealityService {
        return this.container.get(RealityService);
    }

    public get session(): SessionService {
        return this.container.get(SessionService);
    }

    public get timer(): TimerService {
        return this.container.get(TimerService);
    }

    public get viewport(): ViewportService {
        return this.container.get(ViewportService);
    }

    public get vuforia(): VuforiaService {
        return this.container.get(VuforiaService);
    }

    public get updateEvent(): Event<FrameState> {
        return this.context.updateEvent;
    }

    public get renderEvent(): Event<FrameState> {
        return this.context.renderEvent;
    }

    public get focusEvent(): Event<void> {
        return this.focus.focusEvent;
    }

    public get blurEvent(): Event<void> {
        return this.focus.blurEvent;
    }
}

export function init(options: { config?: Configuration, container?: Container } = {}) {
    let role: Role;
    if (typeof window === 'undefined') {
        role = Role.MANAGER
    } else if (navigator.userAgent.indexOf('Argon') > 0 || window.top !== window) {
        role = Role.APPLICATION
    } else {
        role = Role.MANAGER
    }
    const config = Object.assign({ role, enableIncomingUpdateEvents: role === Role.APPLICATION }, options.config);
    return new ArgonSystem(config, options.container);
}

export function initReality(options: { config?: Configuration, container?: Container } = {}) {
    const config = Object.assign({ role: Role.REALITY }, { enableRealityControlPort: true }, options.config);
    return new ArgonSystem(config, options.container);
}

declare class Object {
    static keys(o: {}): string[];
    static assign(target, ...sources): any;
}

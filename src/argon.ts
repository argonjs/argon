import 'aurelia-polyfills'
import * as DI from 'aurelia-dependency-injection'
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

import {Configuration, Role} from './config'
import {ContextService} from './context'
import {DeviceService} from './device'
import {FocusService} from './focus'
import {RealityService, RealitySetupHandler, EmptyRealitySetupHandler, FrameState} from './reality'
import {TimerService} from './timer'
import {Event} from './utils'
import {ViewService} from './view'
import {VuforiaService, VuforiaRealitySetupHandler} from './vuforia'

export {DI, Cesium}
export * from './config'
export * from './context'
export * from './device'
export * from './focus'
export * from './reality'
export * from './session'
export * from './timer'
export * from './utils'
export * from './view'
export * from './vuforia'

/**
 * A composition root which instantiates the object graph based on a provided configuration
 */
export class ArgonSystem {

    static instance: ArgonSystem;

    constructor(config: Configuration, public container = new DI.Container()) {
        if (!ArgonSystem.instance) ArgonSystem.instance = this;

        container.registerInstance('config', config);
        container.registerInstance(Role, config.role);
        container.registerInstance(ArgonSystem, this);

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

        if (config.role === Role.MANAGER) {
            this.reality.registerHandler(container.get(EmptyRealitySetupHandler));
            this.reality.registerHandler(container.get(VuforiaRealitySetupHandler));

            if (typeof document !== 'undefined') {
                this.reality.setDefault({ type: 'empty' })
            }
        }

        // ensure the entire object graph is instantiated before connecting to the manager. 
        for (const key of Object.keys(ArgonSystem.prototype)) {
            this[key];
        }

        this.session.connect();
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

    public get reality(): RealityService {
        return this.container.get(RealityService);
    }

    public get session(): SessionService {
        return this.container.get(SessionService);
    }

    public get timer(): TimerService {
        return this.container.get(TimerService);
    }

    public get view(): ViewService {
        return this.container.get(ViewService);
    }

    public get vuforia(): VuforiaService {
        return this.container.get(VuforiaService);
    }

    // events

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

export function init(options: { config?: Configuration, container?: DI.Container } = {}) {
    let role: Role;
    if (typeof window === 'undefined') {
        role = Role.MANAGER
    } else if (navigator.userAgent.indexOf('Argon') > 0 || window.top !== window) {
        role = Role.APPLICATION
    } else {
        role = Role.MANAGER
    }
    const config = Object.assign(<Configuration>{ role }, options.config);
    return new ArgonSystem(config, options.container);
}

export function initReality(options: { config?: Configuration, container?: DI.Container } = {}) {
    const config = Object.assign(<Configuration>{ role: Role.REALITY_VIEW, realityViewSupportsControlPort: true }, options.config);
    return new ArgonSystem(config, options.container);
}

declare class Object {
    static keys(o: {}): string[];
    static assign(target, ...sources): any;
}

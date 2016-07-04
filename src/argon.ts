import 'aurelia-polyfills'
import * as DI from 'aurelia-dependency-injection'
import * as Cesium from './cesium/cesium-imports'

import {
    SessionService,
    ConnectService,
    LoopbackConnectService,
    DOMConnectService,
    DebugConnectService,
    WKWebViewConnectService
} from './session'

import {Configuration, Role} from './common'
import {ContextService} from './context'
import {DeviceService} from './device'
import {FocusService} from './focus'
import {RealityService, RealityLoader} from './reality'
import {TimerService} from './timer'
import {Event} from './utils'
import {ViewService} from './view'
import {VuforiaService} from './vuforia'

import {EmptyRealityLoader} from './realities/empty'
import {LiveVideoRealityLoader} from './realities/live_video'
import {HostedRealityLoader} from './realities/hosted'

export {DI, Cesium}
export * from './common'
export * from './context'
export * from './device'
export * from './focus'
export * from './reality'
export * from './session'
export * from './timer'
export * from './utils'
export * from './view'
export * from './vuforia'
export {
EmptyRealityLoader,
LiveVideoRealityLoader
}

/**
 * A composition root which instantiates the object graph based on a provided configuration
 */
export class ArgonSystem {

    static instance: ArgonSystem;

    constructor(config: Configuration, public container: DI.Container = new DI.Container) {
        if (!ArgonSystem.instance) ArgonSystem.instance = this;

        container.registerInstance('config', config);
        container.registerInstance(ArgonSystem, this);

        if (!container.hasResolver('containerElement'))
            container.registerInstance('containerElement', null);

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
        } else if (DebugConnectService.isAvailable()) {
            container.registerSingleton(
                ConnectService,
                DebugConnectService
            );
        }

        if (config.role === Role.MANAGER) {
            this.reality.registerLoader(container.get(EmptyRealityLoader));
            this.reality.registerLoader(container.get(LiveVideoRealityLoader));

            if (typeof document !== 'undefined') {
                this.reality.registerLoader(container.get(HostedRealityLoader));
                this.reality.setDefault({ type: 'empty', name: 'Empty Reality' })
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

    public get updateEvent(): Event<void> {
        return this.context.updateEvent;
    }

    public get renderEvent(): Event<void> {
        return this.context.renderEvent;
    }

    public get focusEvent(): Event<void> {
        return this.focus.focusEvent;
    }

    public get blurEvent(): Event<void> {
        return this.focus.blurEvent;
    }
}

export interface InitParameters {
    config?: Configuration,
    container?: DI.Container
}

export function init({ config, container = new DI.Container }: InitParameters = {}) {
    let role: Role;
    if (typeof window === 'undefined') {
        role = Role.MANAGER
    } else if (navigator.userAgent.indexOf('Argon') > 0 || window.top !== window) {
        role = Role.APPLICATION
    } else {
        role = Role.MANAGER
    }
    const configuration = Object.assign(config || {}, <Configuration>{
        role,
    });
    container.registerInstance('containerElement', null);
    return new ArgonSystem(configuration, container);
}

export function initReality({ config, container = new DI.Container }: InitParameters = {}) {
    const configuration = Object.assign(config || {}, <Configuration>{
        role: Role.REALITY_VIEW,
        'reality.supportsControlPort': true
    });
    container.registerInstance('containerElement', null);
    return new ArgonSystem(configuration, container);
}

export interface InitLocalParameters extends InitParameters {
    containerElement: HTMLElement
}

export function initLocal({ containerElement, config, container = new DI.Container }: InitLocalParameters) {
    const configuration = Object.assign(config || {}, <Configuration>{
        role: Role.MANAGER
    });
    container.registerInstance('containerElement', containerElement);
    return new ArgonSystem(configuration, container);
}

declare class Object {
    static keys(o: {}): string[];
    static assign(target, ...sources): any;
}

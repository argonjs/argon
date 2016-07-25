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
import {ContextService, Frame} from './context'
import {DeviceService} from './device'
import {FocusService} from './focus'
import {RealityView, RealityService, RealityLoader} from './reality'
import {TimerService} from './timer'
import {Event} from './utils'
import {ViewService, PinchZoomService} from './view'
import {VuforiaService} from './vuforia'

import {EmptyRealityLoader} from './reality-loader/empty'
import {LiveVideoRealityLoader} from './reality-loader/live_video'
import {HostedRealityLoader} from './reality-loader/hosted'

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
LiveVideoRealityLoader,
HostedRealityLoader
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
        } else if (DOMConnectService.isAvailable()) {
            container.registerSingleton(
                ConnectService,
                DOMConnectService
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
                // enable pinch-zoom
                container.get(PinchZoomService);
            }

            this.reality.setDefault(RealityView.EMPTY);
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

    public get updateEvent(): Event<Frame> {
        return this.context.updateEvent;
    }

    public get renderEvent(): Event<Frame> {
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
    configuration?: Configuration,
    container?: DI.Container
}

export function init({ configuration, container = new DI.Container }: InitParameters = {}) {
    let role: Role;
    if (typeof window === 'undefined') {
        role = Role.MANAGER
    } else if (navigator.userAgent.indexOf('Argon') > 0 || window.top !== window) {
        role = Role.APPLICATION
    } else {
        role = Role.MANAGER
    }
    const config = Object.assign(configuration || {}, <Configuration>{
        role,
    });
    container.registerInstance('containerElement', null);
    return new ArgonSystem(config, container);
}

export function initReality({ configuration, container = new DI.Container }: InitParameters = {}) {
    const config = Object.assign(configuration || {}, <Configuration>{
        role: Role.REALITY_VIEW,
        'reality.supportsControlPort': true
    });
    container.registerInstance('containerElement', null);
    return new ArgonSystem(config, container);
}

export interface InitLocalParameters extends InitParameters {
    containerElement: HTMLElement
}

export function initLocal({ containerElement, configuration, container = new DI.Container }: InitLocalParameters) {
    const config = Object.assign(configuration || {}, <Configuration>{
        role: Role.MANAGER
    });
    container.registerInstance('containerElement', containerElement);
    return new ArgonSystem(config, container);
}

declare class Object {
    static keys(o: {}): string[];
    static assign(target, ...sources): any;
}

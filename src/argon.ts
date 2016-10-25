declare const global;
(window || global)['WebVRConfig'] = {
    DEFER_INITIALIZATION: typeof navigator == 'undefined',
    MOUSE_KEYBOARD_CONTROLS_DISABLED: true
};

import 'googlevr/webvr-polyfill'
import 'aurelia-polyfills'
import * as DI from 'aurelia-dependency-injection'
import * as Cesium from './cesium/cesium-imports'
import * as URI from 'urijs';

import {
    SessionService,
    ConnectService,
    LoopbackConnectService,
    DOMConnectService,
    DebugConnectService,
    WKWebViewConnectService
} from './session'

import { Configuration, Role, RealityViewer } from './common'
import { ContextService } from './context'
import { DeviceService } from './device'
import { FocusService } from './focus'
import { RealityService } from './reality'
import { DefaultUIService } from './ui'
import { Event } from './utils'
import { ViewService } from './view'
import { VuforiaService } from './vuforia'

import { EmptyRealityLoader } from './reality-loader/empty'
import { LiveVideoRealityLoader } from './reality-loader/live_video'
import { HostedRealityLoader } from './reality-loader/hosted'

export { DI, Cesium, URI }
export * from './common'
export * from './context'
export * from './device'
export * from './focus'
export * from './reality'
export * from './session'
export * from './ui'
export * from './utils'
export * from './view'
export * from './vuforia'
export {
    EmptyRealityLoader,
    LiveVideoRealityLoader,
    HostedRealityLoader
}

/**
 * A composition root which instantiates the object graph based on a provided configuration.
 * You generally want to create a new ArgonSystem via the provided [[init]] or [[initReality]] functions:
 * ```ts
 * var app = Argon.init(); // app is an instance of ArgonSystem
 * ```
 */
export class ArgonSystem {

    static instance?: ArgonSystem;

    constructor(config: Configuration, public container: DI.Container = new DI.Container) {
        if (!ArgonSystem.instance) ArgonSystem.instance = this;

        container.registerInstance('config', config);
        container.registerInstance(ArgonSystem, this);

        if (!container.hasResolver('containerElement'))
            container.registerInstance('containerElement', null);

        if (Role.isRealityManager(config.role)) {
            container.registerSingleton(
                ConnectService,
                LoopbackConnectService
            );
            this.reality.registerLoader(container.get(EmptyRealityLoader));
            this.reality.registerLoader(container.get(LiveVideoRealityLoader));

            if (typeof document !== 'undefined') {
                this.reality.registerLoader(container.get(HostedRealityLoader));
                container.get(DefaultUIService);
            }

            if (LiveVideoRealityLoader.isAvailable()) {
                this.reality.setDefault(RealityView.LIVE_VIDEO);
            } else {
                this.reality.setDefault(RealityView.EMPTY);
            }
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

        // ensure the entire object graph is instantiated before connecting to the manager. 
        for (const key of Object.keys(ArgonSystem.prototype)) {
            this[key];
        }

        // route view state to the context
        if (!Role.isRealityAugmenter(config.role)) {
            let frameIndex = 0;
            this.reality.viewStateEvent.addEventListener((view) => {
                this.context._update({
                    index: frameIndex++,
                    reality: this.reality.getCurrent(),
                    view
                });
            });
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

    public get view(): ViewService {
        return this.container.get(ViewService);
    }

    public get vuforia(): VuforiaService {
        return this.container.get(VuforiaService);
    }

    // events

    public get updateEvent(): Event<any> {
        return this.context.updateEvent;
    }

    public get renderEvent(): Event<any> {
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

/**
 * Create an ArgonSystem instance. 
 * If we are running within a [[REALITY_MANAGER]], 
 * this function will create an ArgonSystem which has the [[REALITY_AUGMENTOR]] role. 
 * If we are not running within a [[REALITY_MANAGER]], 
 * this function will create an ArgonSystem which has the [[REALITY_MANAGER]] role. 
 * @param initParameters InitParameters
 */
export function init({ configuration, container = new DI.Container }: InitParameters = {}) {
    let role: Role;
    if (typeof HTMLElement === 'undefined') {
        role = Role.REALITY_MANAGER
    } else if (navigator.userAgent.indexOf('Argon') > 0 || window.top !== window) {
        role = Role.APPLICATION // TODO: switch to below after several argon-app releases
        // role = Role.REALITY_AUGMENTER 
    } else {
        role = Role.REALITY_MANAGER
    }
    const config = Object.assign(configuration || {}, <Configuration>{
        role,
    });
    container.registerInstance('containerElement', null);
    return new ArgonSystem(config, container);
}

/**
 * Deprecated. Use [[initRealityViewer]]
 * @deprecated
 */
export function initReality(p: InitParameters = {}) {
    return initRealityViewer(p);
}

/**
 * Initialize an [[ArgonSystem]] with the [[REALITY_VIEW]] role
 */
export function initRealityViewer({ configuration, container = new DI.Container }: InitParameters = {}) {
    const config = Object.assign(configuration || {}, <Configuration>{
        role: Role.REALITY_VIEW, // TODO: switch to below after several argon-app releases
        // role: Role.REALITY_VIEWER
        'reality.supportsControlPort': true
    });
    container.registerInstance('containerElement', null);
    return new ArgonSystem(config, container);
}

export interface InitLocalParameters extends InitParameters {
    containerElement: HTMLElement
}

/**
 * Not yet implemented.
 * @private
 */
export function initLocal({ containerElement, configuration, container = new DI.Container }: InitLocalParameters) {
    const config = Object.assign(configuration || {}, <Configuration>{
        role: Role.REALITY_MANAGER
    });
    container.registerInstance('containerElement', containerElement);
    return new ArgonSystem(config, container);
}

declare class Object {
    static keys(o: {}): string[];
    static assign(target, ...sources): any;
}

// expose RealityView for backwards compatability
/**
 * @private
 */
export class RealityView extends RealityViewer {
    constructor() {
        super();
        console.warn('RealityView class has been renamed to RealityViewer');
    }
}
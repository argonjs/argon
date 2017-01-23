import 'aurelia-polyfills';
import * as DI from 'aurelia-dependency-injection';
import * as Cesium from './cesium/cesium-imports';
import './webvr';
import { SessionService, ConnectService, LoopbackConnectService, DOMConnectService, DebugConnectService, WKWebViewConnectService } from './session';
import { Role } from './common';
import { ContextService } from './context';
import { DeviceService } from './device';
import { FocusService } from './focus';
import { RealityService } from './reality';
import { DefaultUIService } from './ui';
import { ViewService, ContainerElement } from './view';
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
export class ArgonSystem {
    constructor(containerElement, config, container = new DI.Container) {
        this.container = container;
        if (!ArgonSystem.instance)
            ArgonSystem.instance = this;
        container.registerInstance(ContainerElement, containerElement || ContainerElement);
        container.registerInstance('config', config);
        if (!container.hasResolver('containerElement'))
            container.registerInstance('containerElement', null);
        if (Role.isRealityManager(config.role)) {
            container.registerSingleton(ConnectService, LoopbackConnectService);
            // this.reality.registerLoader(container.get(EmptyRealityLoader));
            // this.reality.registerLoader(container.get(LocalRealityLoader));
            if (typeof document !== 'undefined') {
                // this.reality.registerLoader(container.get(HostedRealityLoader));
                container.get(DefaultUIService);
            }
            this.reality.default = RealityViewer.EMPTY;
        }
        else if (WKWebViewConnectService.isAvailable()) {
            container.registerSingleton(ConnectService, WKWebViewConnectService);
        }
        else if (DOMConnectService.isAvailable()) {
            container.registerSingleton(ConnectService, DOMConnectService);
        }
        else if (DebugConnectService.isAvailable()) {
            container.registerSingleton(ConnectService, DebugConnectService);
        }
        // ensure the entire object graph is instantiated before connecting to the manager. 
        for (const key of Object.getOwnPropertyNames(ArgonSystem.prototype)) {
            this[key];
        }
        this.session.connect();
    }
    get context() {
        return this.container.get(ContextService);
    }
    get device() {
        return this.container.get(DeviceService);
    }
    get focus() {
        return this.container.get(FocusService);
    }
    get reality() {
        return this.container.get(RealityService);
    }
    get session() {
        return this.container.get(SessionService);
    }
    get view() {
        return this.container.get(ViewService);
    }
    get vuforia() {
        return this.container.get(VuforiaService);
    }
    // events
    get updateEvent() {
        return this.context.updateEvent;
    }
    get renderEvent() {
        return this.context.renderEvent;
    }
    get focusEvent() {
        return this.focus.focusEvent;
    }
    get blurEvent() {
        return this.focus.blurEvent;
    }
    destroy() {
        this.session.manager.close();
        if (ArgonSystem.instance === this) {
            ArgonSystem.instance = undefined;
        }
    }
}
/**
 * Create an ArgonSystem instance.
 * If we are running within a [[REALITY_MANAGER]],
 * this function will create an ArgonSystem which has the [[REALITY_AUGMENTOR]] role.
 * If we are not running within a [[REALITY_MANAGER]],
 * this function will create an ArgonSystem which has the [[REALITY_MANAGER]] role.
 */
export function init(containerElement, configuration, dependencyInjectionContainer) {
    if (ArgonSystem.instance)
        throw new Error('A shared ArgonSystem instance already exists');
    // see if it is the old parameter interface
    if (containerElement && (containerElement['configuration'] || containerElement['container'])) {
        const deprecatedParameters = containerElement;
        if (!configuration && deprecatedParameters['configuration'])
            configuration = deprecatedParameters['configuration'];
        if (!configuration && deprecatedParameters['container'])
            dependencyInjectionContainer = deprecatedParameters['container'];
        containerElement = undefined;
    }
    let role;
    if (typeof HTMLElement === 'undefined') {
        role = Role.REALITY_MANAGER;
    }
    else if (navigator.userAgent.indexOf('Argon') > 0 || window.top !== window) {
        role = Role.APPLICATION; // TODO: switch to below after several argon-app releases
    }
    else {
        role = Role.REALITY_MANAGER;
    }
    if (!configuration)
        configuration = {};
    configuration.role = role;
    if (!dependencyInjectionContainer)
        dependencyInjectionContainer = new DI.Container();
    return new ArgonSystem(containerElement || null, configuration, dependencyInjectionContainer);
}
/**
 * Initialize an [[ArgonSystem]] with the [[REALITY_VIEWER]] role
 */
export function initRealityViewer(configuration = {}, dependencyInjectionContainer = new DI.Container) {
    if (ArgonSystem.instance)
        throw new Error('A shared ArgonSystem instance already exists');
    configuration.role = Role.REALITY_VIEW; // TODO: switch to below after several argon-app releases
    // configuration.role = Role.REALITY_VIEWER;
    configuration['supportsCustomProtocols'] = true;
    return new ArgonSystem(null, configuration, dependencyInjectionContainer);
}
/**
 * Not yet implemented.
 * @private
 */
export function initUnshared(containerElement, configuration = {}, dependencyInjectionContainer = new DI.Container) {
    configuration.role = Role.REALITY_MANAGER;
    return new ArgonSystem(null, configuration, dependencyInjectionContainer);
}

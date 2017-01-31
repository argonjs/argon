var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'aurelia-polyfills';
import * as DI from 'aurelia-dependency-injection';
import * as Cesium from './cesium/cesium-imports';
import './webvr';
import { SessionService, ConnectService, LoopbackConnectService, DOMConnectService, DebugConnectService, WKWebViewConnectService } from './session';
import { Role } from './common';
import { DefaultUIService } from './ui';
import { ContextService, ContextServiceProvider } from './context';
import { FocusService, FocusServiceProvider } from './focus';
import { LocationService, LocationServiceProvider } from './location';
import { RealityService, RealityServiceProvider } from './reality';
import { ViewService, ViewServiceProvider } from './view';
import { ViewportService, ViewportServiceProvider, ParentElement } from './viewport';
import { VisibilityService, VisibilityServiceProvider } from './visibility';
import { VuforiaService, VuforiaServiceProvider } from './vuforia';
import { RealityViewer } from './reality-viewers/base';
import { EmptyRealityViewer } from './reality-viewers/empty';
import { LiveRealityViewer } from './reality-viewers/live';
import { HostedRealityViewer } from './reality-viewers/hosted';
export { DI, Cesium };
export * from './common';
export * from './context';
export * from './focus';
export * from './location';
export * from './reality';
export * from './session';
export * from './ui';
export * from './utils';
export * from './view';
export * from './viewport';
export * from './visibility';
export * from './vuforia';
export { RealityViewer, EmptyRealityViewer, LiveRealityViewer, HostedRealityViewer };
let ArgonSystemProviders = class ArgonSystemProviders {
    constructor(context, focus, location, visibility, reality, view, viewport, vuforia) {
        this.context = context;
        this.focus = focus;
        this.location = location;
        this.visibility = visibility;
        this.reality = reality;
        this.view = view;
        this.viewport = viewport;
        this.vuforia = vuforia;
    }
};
ArgonSystemProviders = __decorate([
    DI.autoinject(),
    __metadata("design:paramtypes", [ContextServiceProvider,
        FocusServiceProvider,
        LocationServiceProvider,
        VisibilityServiceProvider,
        RealityServiceProvider,
        ViewServiceProvider,
        ViewportServiceProvider,
        VuforiaServiceProvider])
], ArgonSystemProviders);
export { ArgonSystemProviders };
/**
 * A composition root which instantiates the object graph based on a provided configuration.
 * You generally want to create a new ArgonSystem via the provided [[init]] or [[initReality]] functions:
 * ```ts
 * var app = Argon.init(); // app is an instance of ArgonSystem
 * ```
 */
export class ArgonSystem {
    constructor(parentElement, config, container = new DI.Container) {
        this.container = container;
        if (!ArgonSystem.instance)
            ArgonSystem.instance = this;
        container.registerInstance(ParentElement, parentElement || ParentElement);
        container.registerInstance('config', config);
        if (!container.hasResolver('containerElement'))
            container.registerInstance('containerElement', null);
        if (Role.isRealityManager(config.role)) {
            container.registerSingleton(ConnectService, LoopbackConnectService);
            if (typeof document !== 'undefined') {
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
    get providers() {
        if (this.session.isRealityManager)
            return this.container.get(ArgonSystemProviders);
    }
    get context() {
        return this.container.get(ContextService);
    }
    get focus() {
        return this.container.get(FocusService);
    }
    get location() {
        return this.container.get(LocationService);
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
    get viewport() {
        return this.container.get(ViewportService);
    }
    get visibility() {
        return this.container.get(VisibilityService);
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
export function init(parentElementOrConfig, configurationOrDIContainer, dependencyInjectionContainer) {
    if (ArgonSystem.instance)
        throw new Error('A shared ArgonSystem instance already exists');
    let parentElement;
    let configuration;
    if (configurationOrDIContainer instanceof DI.Container) {
        parentElement = ParentElement;
        configuration = parentElementOrConfig;
        dependencyInjectionContainer = configurationOrDIContainer;
    }
    else {
        parentElement = parentElementOrConfig;
        configuration = configurationOrDIContainer;
    }
    // see if it is the old parameter interface
    if (parentElement && (parentElement['configuration'] || parentElement['container'])) {
        const deprecatedParameters = parentElement;
        if (!configuration && deprecatedParameters['configuration'])
            configuration = deprecatedParameters['configuration'];
        if (!configuration && deprecatedParameters['container'])
            dependencyInjectionContainer = deprecatedParameters['container'];
        parentElement = undefined;
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
    return new ArgonSystem(parentElement || null, configuration, dependencyInjectionContainer);
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
// export function initRealityManager(
//         containerElement: string|HTMLElement,
//         configuration:Configuration = {},
//         dependencyInjectionContainer:DI.Container = new DI.Container
//     ) {
//     configuration.role = Role.REALITY_MANAGER;
//     return new ArgonSystem(null, configuration, dependencyInjectionContainer);
// } 

import 'aurelia-polyfills'
import * as DI from 'aurelia-dependency-injection'
import * as Cesium from './cesium/cesium-imports'
import './webvr'

import {
    SessionService,
    ConnectService,
    LoopbackConnectService,
    DOMConnectService,
    DebugConnectService,
    WKWebViewConnectService,
    AndroidWebViewConnectService
} from './session'

import { Configuration, Role } from './common'
import { DefaultUIService } from './ui'
import { Event } from './utils'

import { EntityService, EntityServiceProvider } from './entity'
import { ContextService, ContextServiceProvider } from './context'
import { FocusService, FocusServiceProvider } from './focus'
import { DeviceService, DeviceServiceProvider } from './device'
import { RealityService, RealityServiceProvider } from './reality'
import { ViewService, ViewServiceProvider, ViewElement } from './view'
import { VisibilityService, VisibilityServiceProvider } from './visibility'
import { VuforiaService, VuforiaServiceProvider } from './vuforia'
import { PermissionService, PermissionServiceProvider } from './permission'

import { RealityViewer } from './reality-viewers/base'
import { EmptyRealityViewer } from './reality-viewers/empty'
import { LiveRealityViewer } from './reality-viewers/live'
import { HostedRealityViewer } from './reality-viewers/hosted'

export { DI, Cesium }
export * from './common'
export * from './context'
export * from './entity'
export * from './focus'
export * from './device'
export * from './reality'
export * from './session'
export * from './ui'
export * from './utils'
export * from './view'
export * from './visibility'
export * from './vuforia'
export * from './permission'

export {
    RealityViewer,
    EmptyRealityViewer,
    LiveRealityViewer,
    HostedRealityViewer
}

@DI.autoinject()
export class ArgonSystemProvider {
    constructor(
        public entity:EntityServiceProvider,
        public context:ContextServiceProvider,
        public focus:FocusServiceProvider,
        public device:DeviceServiceProvider,
        public visibility:VisibilityServiceProvider,
        public reality:RealityServiceProvider, 
        public view:ViewServiceProvider,
        public vuforia:VuforiaServiceProvider,
        public permission:PermissionServiceProvider
    ) {}
}

/**
 * A composition root which instantiates the object graph based on a provided configuration.
 * You generally want to create a new ArgonSystem via the provided [[init]] or [[initReality]] functions:
 * ```ts
 * var app = Argon.init(); // app is an instance of ArgonSystem
 * ```
 */
@DI.autoinject
export class ArgonSystem {

    /**
     * The ArgonSystem instance which shares a view provided by a manager
     */
    static instance?: ArgonSystem;

    constructor(
        public container: DI.Container,
        public entity:EntityService,
        public context: ContextService,
        public device: DeviceService,
        public focus: FocusService,
        public reality: RealityService,
        public session: SessionService,
        public view: ViewService,
        public visibility: VisibilityService,
        public vuforia: VuforiaService,
        public permission: PermissionService
    ) {
        if (!ArgonSystem.instance) ArgonSystem.instance = this;

        if (this.container.hasResolver(ArgonSystemProvider)) 
            this._provider = this.container.get(ArgonSystemProvider);
        
        this.session.connect();
    }

    public _provider:ArgonSystemProvider;
    public get provider() {
        this.session.ensureIsRealityManager();
        return this._provider;
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

    public destroy() {
        this.session.manager.close();
        if (ArgonSystem.instance === this) {
            ArgonSystem.instance = undefined;
        }
    }
}

export class ArgonConfigurationManager {

    static configure(configurationManager:ArgonConfigurationManager) {
        configurationManager.standardConfiguration();
    }

    constructor(
        public configuration:Configuration, 
        public container:DI.Container = new DI.Container
    ) {
        container.registerInstance(Configuration, configuration);
        
        if (Role.isRealityManager(configuration.role)) 
            container.registerSingleton(ArgonSystemProvider);

        ArgonConfigurationManager.configure(this);
    }
    
    standardConfiguration() {
        this.defaultConnect();
        this.defaultUI();
    }

    defaultConnect() {
        const container = this.container;
        const configuration = this.configuration;

        if (Role.isRealityManager(configuration.role)) {
            container.registerSingleton(
                ConnectService,
                LoopbackConnectService
            );
        } else if (WKWebViewConnectService.isAvailable()) {
            container.registerSingleton(
                ConnectService,
                WKWebViewConnectService
            )
        } else if (AndroidWebViewConnectService.isAvailable()) {
            container.registerSingleton(
                ConnectService,
                AndroidWebViewConnectService
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
    }

    defaultUI() {
        if (Role.isRealityManager(this.configuration.role)) {
            if (typeof document !== 'undefined') {
                this.container.get(DefaultUIService);
            }
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
export function init(configuration?: Configuration, dependencyInjectionContainer?:DI.Container) : ArgonSystem;
export function init(element?: string|HTMLDivElement|null, configuration?: Configuration, dependencyInjectionContainer?:DI.Container) : ArgonSystem;
export function init(
        elementOrConfig?: any,
        configurationOrDIContainer?: any,
        dependencyInjectionContainer?:DI.Container
    ) : ArgonSystem {
    if (ArgonSystem.instance) throw new Error('A shared ArgonSystem instance already exists');

    let element:string|HTMLDivElement|undefined;
    let configuration:Configuration|undefined;
    if (configurationOrDIContainer instanceof DI.Container) {
        configuration = elementOrConfig;
        dependencyInjectionContainer = configurationOrDIContainer;
    } else {
        element = elementOrConfig;
        configuration = configurationOrDIContainer;
    }

    // see if it is the old parameter interface
    if (element && (element['configuration'] || element['container'])) {
        const deprecatedParameters = element;
        if (!configuration && deprecatedParameters['configuration'])
            configuration = deprecatedParameters['configuration'];
        if (!configuration && deprecatedParameters['container'])
            dependencyInjectionContainer = deprecatedParameters['container'];
        element = undefined;
    }

    if (!configuration) configuration = {};
    if (!configuration.role) {
        let role: Role;
        if (typeof HTMLElement === 'undefined') {
            role = Role.REALITY_MANAGER
        } else if (navigator.userAgent.indexOf('Argon') > 0 || window.top !== window) {
            role = Role.APPLICATION // TODO: switch to below after several argon-app releases
            // role = Role.REALITY_AUGMENTER
        } else {
            role = Role.REALITY_MANAGER
        }
        configuration.role = role;
    }

    if (!dependencyInjectionContainer) dependencyInjectionContainer = new DI.Container();
    dependencyInjectionContainer.registerInstance(ViewElement, element || null);

    return new ArgonConfigurationManager(configuration, dependencyInjectionContainer).container.get(ArgonSystem);
}

/**
 * Initialize an [[ArgonSystem]] with the [[REALITY_VIEWER]] role
 */
export function initRealityViewer(
        configuration:Configuration = {},
        dependencyInjectionContainer:DI.Container = new DI.Container
    ) : ArgonSystem {
    if (ArgonSystem.instance) throw new Error('A shared ArgonSystem instance already exists');

    configuration.role = Role.REALITY_VIEW; // TODO: switch to below after several argon-app releases
    // configuration.role = Role.REALITY_VIEWER;
    configuration['supportsCustomProtocols'] = true;
    configuration['reality.supportsControlPort'] = true; // backwards compat for above
    configuration.protocols = configuration.protocols || [];
    configuration.protocols.push('ar.uievent')
    return new ArgonConfigurationManager(configuration, dependencyInjectionContainer).container.get(ArgonSystem);
}

/**
 * @private
 */
export const initReality = initRealityViewer;
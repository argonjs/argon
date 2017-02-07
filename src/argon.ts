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
    WKWebViewConnectService
} from './session'

import { Configuration, Role } from './common'
import { DefaultUIService } from './ui'
import { Event } from './utils'

import { ContextService, ContextServiceProvider } from './context'
import { FocusService, FocusServiceProvider } from './focus'
import { LocationService, LocationServiceProvider } from './location'
import { RealityService, RealityServiceProvider } from './reality'
import { ViewService, ViewServiceProvider } from './view'
import { ViewportService, ViewportServiceProvider, ParentElement } from './viewport'
import { VisibilityService, VisibilityServiceProvider } from './visibility'
import { VuforiaService, VuforiaServiceProvider } from './vuforia'

import { RealityViewer } from './reality-viewers/base'
import { EmptyRealityViewer } from './reality-viewers/empty'
import { LiveRealityViewer } from './reality-viewers/live'
import { HostedRealityViewer } from './reality-viewers/hosted'

export { DI, Cesium }
export * from './common'
export * from './context'
export * from './focus'
export * from './location'
export * from './reality'
export * from './session'
export * from './ui'
export * from './utils'
export * from './view'
export * from './viewport'
export * from './visibility'
export * from './vuforia'
export {
    RealityViewer,
    EmptyRealityViewer,
    LiveRealityViewer,
    HostedRealityViewer
}

@DI.autoinject()
export class ArgonSystemProvider {
    constructor(
        public context:ContextServiceProvider,
        public focus:FocusServiceProvider,
        public location:LocationServiceProvider,
        public visibility:VisibilityServiceProvider,
        public reality:RealityServiceProvider, 
        public view:ViewServiceProvider,
        public viewport:ViewportServiceProvider,
        public vuforia:VuforiaServiceProvider
    ) {}
}

/**
 * A composition root which instantiates the object graph based on a provided configuration.
 * You generally want to create a new ArgonSystem via the provided [[init]] or [[initReality]] functions:
 * ```ts
 * var app = Argon.init(); // app is an instance of ArgonSystem
 * ```
 */
export class ArgonSystem {

    /**
     * The ArgonSystem instance which shares a view provided by a manager
     */
    static instance?: ArgonSystem;

    constructor(
        parentElement:string|HTMLDivElement|null|undefined, 
        config: Configuration,
        public container: DI.Container = new DI.Container) {
        if (!ArgonSystem.instance) ArgonSystem.instance = this;

        container.registerInstance(ParentElement, parentElement || ParentElement);
        container.registerInstance('config', config);

        if (!container.hasResolver('containerElement'))
            container.registerInstance('containerElement', null);

        if (Role.isRealityManager(config.role)) {
            container.registerSingleton(
                ConnectService,
                LoopbackConnectService
            );

            if (typeof document !== 'undefined') {
                container.get(DefaultUIService);
            }

            this.reality.default = RealityViewer.EMPTY;
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
        for (const key of Object.getOwnPropertyNames(ArgonSystem.prototype)) {
            this[key];
        }

        this.session.connect();
    }
    
    public get provider() : ArgonSystemProvider {
        this.session.ensureIsRealityManager();
        return this.container.get(ArgonSystemProvider);
    }

    public get context(): ContextService {
        return this.container.get(ContextService);
    }

    public get focus(): FocusService {
        return this.container.get(FocusService);
    }

    public get location() : LocationService {
        return this.container.get(LocationService);
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

    public get viewport(): ViewportService {
        return this.container.get(ViewportService);
    }

    public get visibility(): VisibilityService {
        return this.container.get(VisibilityService);
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

    public destroy() {
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
export function init(configuration?: Configuration, dependencyInjectionContainer?:DI.Container) : ArgonSystem;
export function init(parentElement?: string|HTMLDivElement|null, configuration?: Configuration, dependencyInjectionContainer?:DI.Container) : ArgonSystem;
export function init(
        parentElementOrConfig?: any,
        configurationOrDIContainer?: any,
        dependencyInjectionContainer?:DI.Container
    ) : ArgonSystem {
    if (ArgonSystem.instance) throw new Error('A shared ArgonSystem instance already exists');

    let parentElement:string|HTMLDivElement|undefined;
    let configuration:Configuration|undefined;
    if (configurationOrDIContainer instanceof DI.Container) {
        parentElement = ParentElement;
        configuration = parentElementOrConfig;
        dependencyInjectionContainer = configurationOrDIContainer;
    } else {
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
    
    let role: Role;
    if (typeof HTMLElement === 'undefined') {
        role = Role.REALITY_MANAGER
    } else if (navigator.userAgent.indexOf('Argon') > 0 || window.top !== window) {
        role = Role.APPLICATION // TODO: switch to below after several argon-app releases
        // role = Role.REALITY_AUGMENTER
    } else {
        role = Role.REALITY_MANAGER
    }
    
    if (!configuration) configuration = {};
    configuration.role = role;

    if (!dependencyInjectionContainer) dependencyInjectionContainer = new DI.Container();

    return new ArgonSystem(parentElement || null, configuration, dependencyInjectionContainer);
}

/**
 * Initialize an [[ArgonSystem]] with the [[REALITY_VIEWER]] role
 */
export function initRealityViewer(
        configuration:Configuration = {},
        dependencyInjectionContainer:DI.Container = new DI.Container
    ) {
    if (ArgonSystem.instance) throw new Error('A shared ArgonSystem instance already exists');

    configuration.role = Role.REALITY_VIEW; // TODO: switch to below after several argon-app releases
    // configuration.role = Role.REALITY_VIEWER;
    configuration['supportsCustomProtocols'] = true;
    configuration['reality.supportsControlPort'] = true; // backwards compat for above
    configuration.protocols = configuration.protocols || [];
    configuration.protocols.push('ar.uievent')
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
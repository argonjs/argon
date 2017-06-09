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
import { Event, isIOS, getEventSynthesizier, createEventForwarder, hasNativeWebVRImplementation } from './utils'

import { EntityService, EntityServiceProvider } from './entity'
import { ContextService, ContextServiceProvider } from './context'
import { FocusService, FocusServiceProvider } from './focus'
import { DeviceService, DeviceServiceProvider } from './device'
import { RealityService, RealityServiceProvider } from './reality'
import { ViewService, ViewServiceProvider, ViewItems, ViewportMode } from './view'
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

        this._setupDOM();
        
        this.session.connect();
    }

    private _setupDOM() {
        const viewItems:ViewItems = this.container.get(ViewItems);
        const element = viewItems.element;

        if (element && typeof document !== 'undefined' && document.createElement) {
            
            element.classList.add('argon-view');

            // prevent pinch-zoom of the page in ios 10.
            if (isIOS) {
                const touchMoveListener = (event) => {
                    if (event.touches.length > 1)
                        event.preventDefault();
                }
                element.addEventListener('touchmove', touchMoveListener, true);
                this.session.manager.closeEvent.addEventListener(()=>{
                    element.removeEventListener('touchmove', touchMoveListener)
                });
            }

            // add styles describing the type of the current session
            if (this.session.isRealityViewer) {
                document.documentElement.classList.add('argon-reality-viewer');
            }
            if (this.session.isRealityAugmenter) {
                document.documentElement.classList.add('argon-reality-augmenter');
            }
            if (this.session.isRealityManager) {
                document.documentElement.classList.add('argon-reality-manager');
            }

            // add/remove document-level css classes
            this.focus.focusEvent.addEventListener(() => {
                document.documentElement.classList.remove('argon-no-focus');
                document.documentElement.classList.remove('argon-blur');
                document.documentElement.classList.add('argon-focus');
            });

            this.focus.blurEvent.addEventListener(() => {
                document.documentElement.classList.remove('argon-focus');
                document.documentElement.classList.add('argon-blur');
                document.documentElement.classList.add('argon-no-focus');
            });

            this.view.viewportModeChangeEvent.addEventListener((mode)=>{
                switch (mode) {
                    case ViewportMode.EMBEDDED:
                        const elementStyle = this.view.element.style;
                        elementStyle.position = '';
                        elementStyle.left = '0px';
                        elementStyle.bottom = '0px';
                        elementStyle.width = '100%';
                        elementStyle.height = '100%';
                        document.documentElement.classList.remove('argon-immersive');
                        break;
                    case ViewportMode.IMMERSIVE:
                        document.documentElement.classList.add('argon-immersive');
                        break;
                }
            });

            // Setup event forwarding / synthesizing
            if (this.session.isRealityViewer) {
                this.session.manager.on['ar.view.uievent'] = getEventSynthesizier()!;
            } else {
                createEventForwarder(this.view, (event)=>{
                    if (this.session.manager.isConnected && this.session.manager.version[0] >= 1)
                        this.session.manager.send('ar.view.forwardUIEvent', event);
                });
                this.view._watchEmbeddedViewport();
            }

            this.context.renderEvent.addEventListener(()=>{
                if (this.view.autoStyleLayerElements) {
                    const layers = this.view.layers;
                    if (!layers) return;

                    const viewport = this.view.viewport;
                    let zIndex = 0;
                    for (const layer of layers) {
                        const layerStyle = layer.source.style;
                        layerStyle.position = 'absolute';
                        layerStyle.left = viewport.x + 'px';
                        layerStyle.bottom = viewport.y + 'px';
                        layerStyle.width = viewport.width + 'px';
                        layerStyle.height = viewport.height + 'px';
                        layerStyle.zIndex = '' + zIndex;
                        zIndex++;
                    }
                }
            });

            if (!this.session.isRealityManager) {
                this.view.viewportChangeEvent.addEventListener((viewport)=>{
                    if (this.view.element && this.view.autoLayoutImmersiveMode && 
                    this.view.viewportMode === ViewportMode.IMMERSIVE) {
                        const elementStyle = this.view.element.style;
                        elementStyle.position = 'fixed';
                        elementStyle.left = viewport.x + 'px';
                        elementStyle.bottom = viewport.y + 'px';
                        elementStyle.width = viewport.width + 'px';
                        elementStyle.height = viewport.height + 'px';
                    }
                });
            }
        }
    }

    public get suggestedPixelRatio() {
        if (this.device.isPresentingHMD && hasNativeWebVRImplementation) return 1;

        const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
        if (this.focus.hasFocus) {
            return devicePixelRatio;
        } else {
            return devicePixelRatio * 0.5;
        }
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
        public container:DI.Container = new DI.Container,
        public elementOrSelector?:HTMLElement|string|null,
    ) {
        container.registerInstance(Configuration, configuration);
        
        if (Role.isRealityManager(configuration.role)) 
            container.registerSingleton(ArgonSystemProvider);

        let element = elementOrSelector;
        if (!element || typeof element === 'string') {
            if (typeof document !== 'undefined') {
                const selector = element;
                element = selector ? <HTMLElement>document.querySelector(selector) : undefined;
                if (!element && !selector) {
                    element = document.querySelector('#argon') as HTMLElement;
                    if (!element) {
                        element = document.createElement('div');
                        element.id = 'argon';
                        document.body.appendChild(element);
                    }
                } else if (!element) {
                    throw new Error('Unable to find element with selector: ' + selector);
                }
            } else {
                console.warn('No DOM environment is available');
                element = undefined;
            }
        }

        const viewItems = new ViewItems();
        viewItems.element = element;
        container.registerInstance(ViewItems, viewItems);

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

    return new ArgonConfigurationManager(configuration, dependencyInjectionContainer, element).container.get(ArgonSystem);
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
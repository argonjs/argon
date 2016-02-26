import {Container} from 'aurelia-dependency-injection'
import * as Cesium from './cesium/cesium-imports.ts'

import {Context, ContextPlugin} from './context.ts'
import {VuforiaPlugin} from './vuforia.ts'
import {ViewPlugin} from './view.ts'
import {TimerService} from './timer.ts'
import {DeviceService} from './device.ts'

import { 
	Role,
	SessionConfiguration,
	ConnectService, 
	LoopbackConnectService, 
	DOMConnectService, 
	DebugConnectService,
	WKWebViewConnectService
} from './session.ts';

export {Container, Cesium}
export * from './timer.ts'
export * from './device.ts'
export * from './session.ts'
export * from './reality.ts'
export * from './context.ts'
export * from './utils.ts'
export * from './view.ts'
export * from './vuforia.ts'

export class ArgonSystem {
	
	static instance:ArgonSystem;
	
	constructor(public config:SessionConfiguration, public container=new Container()) {
		ArgonSystem.instance = this;
		
        this.container.registerInstance('config', config);
		this.container.registerInstance(Role, this.config.role);
		this.container.registerInstance(ArgonSystem, this);
		
		this.container.registerSingleton(ContextPlugin, ViewPlugin);
		this.container.registerSingleton(ContextPlugin, VuforiaPlugin);
		
		if (this.config.role === Role.Manager) {
			this.container.registerSingleton(
				ConnectService, 
				LoopbackConnectService
			);
		} else if (WKWebViewConnectService.isAvailable()) {
			this.container.registerSingleton(
				ConnectService, 
				WKWebViewConnectService
			)
		} else if (DebugConnectService.isAvailable()) {
			this.container.registerSingleton(
				ConnectService, 
				DebugConnectService
			);
		} else if (DebugConnectService.isAvailable()) {
			this.container.registerSingleton(
				ConnectService, 
				DOMConnectService
			);
		} else {
			this.container.registerSingleton(
				ConnectService, 
				LoopbackConnectService
			);
		}
        
        this.context; // jumpstart the dependency injection 
	}

	public get context() : Context {
		return this.container.get(Context);
	}
	
	public get timer() : TimerService {
		return this.container.get(TimerService);
	}
	
	public get device() : DeviceService {
		return this.container.get(DeviceService);
	}
    
    public get view() : ViewPlugin {
        return this.context.getPlugin(ViewPlugin);
    }
	
	public get vuforia() : VuforiaPlugin {
		return this.context.getPlugin(VuforiaPlugin);
	}
}

export function init(options:{config?:SessionConfiguration, container?:Container}={}) {
	let role:Role;
	if (typeof window === 'undefined') {
		role = Role.Manager
	} else if (navigator.userAgent.indexOf('Argon') > 0 || window.top !== window) {
		role = Role.Application
	} else {
		role = Role.Manager
	}
	const config = Object.assign({role, enableIncomingUpdateEvents:role===Role.Application}, options.config);
	return new ArgonSystem(config, options.container);
}

export function initReality(options:{config?:SessionConfiguration, container?:Container}={}) {
	const config = Object.assign({role:Role.Reality}, {enableRealityControlPort:true}, options.config);
	return new ArgonSystem(config, options.container);	
}

declare class Object {
	static assign(target, ...sources) : any;	
}
import {Container} from 'aurelia-dependency-injection'
import * as Cesium from './cesium/cesium-imports.ts'

import {Context} from './context.ts'
import {TimerService} from './timer.ts'
import {DeviceService} from './device.ts'
import {RealityService} from './reality.ts'
import {ViewService} from './view.ts'
import {VuforiaService} from './vuforia.ts'

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
	
	constructor(config:SessionConfiguration, public container=new Container()) {
		ArgonSystem.instance = this;
		
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
			
		container.get(VuforiaService);
        
        this.context.init(); 
	}
	
	public get configuration() : SessionConfiguration {
		return this.container.get('config')
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
	
	public get reality() : RealityService {
		return this.container.get(RealityService);
	}
    
    public get view() : ViewService {
        return this.container.get(ViewService);
    }
	
	public get vuforia() : VuforiaService {
		return this.container.get(VuforiaService);
	}
	
}

export function init(options:{config?:SessionConfiguration, container?:Container}={}) {
	let role:Role;
	if (typeof window === 'undefined') {
		role = Role.MANAGER
	} else if (navigator.userAgent.indexOf('Argon') > 0 || window.top !== window) {
		role = Role.APPLICATION
	} else {
		role = Role.MANAGER
	}
	const config = Object.assign({role, enableIncomingUpdateEvents:role===Role.APPLICATION}, options.config);
	return new ArgonSystem(config, options.container);
}

export function initReality(options:{config?:SessionConfiguration, container?:Container}={}) {
	const config = Object.assign({role:Role.REALITY}, {enableRealityControlPort:true}, options.config);
	return new ArgonSystem(config, options.container);	
}

declare class Object {
	static assign(target, ...sources) : any;	
}
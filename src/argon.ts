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
		
        this.container.registerInstance('config', config);
		this.container.registerInstance(Role, config.role);
		this.container.registerInstance(ArgonSystem, this);
		
		if (config.role === Role.MANAGER) {
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
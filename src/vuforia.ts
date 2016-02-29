import {inject} from 'aurelia-dependency-injection';
import {Role, Session, MessagePortLike} from './session.ts';
import {Context, FrameState} from './context.ts'
import {Event, CommandQueue, resolveURL} from './utils.ts'
import {Reality, RealityService} from './reality.ts'
import {defined} from './cesium/cesium-imports.ts'

export class VuforiaInitError extends Error { constructor(message:string, public code:VuforiaInitErrorCode) { super(message) }}
export class VuforiaLoadDataSetError extends Error { constructor(message:string) { super(message) }}
export class VuforiaUnloadDataSetError extends Error { constructor(message:string) { super(message) }}
export class VuforiaActivateDataSetError extends Error { constructor(message:string) { super(message) }}
export class VuforiaDeactivateDataSetError extends Error { constructor(message:string) { super(message) }}

/// Return codes for init() function
export enum VuforiaInitErrorCode {
    INIT_ERROR = -1,                                ///< Error during initialization
    INIT_DEVICE_NOT_SUPPORTED = -2,                 ///< The device is not supported
    INIT_NO_CAMERA_ACCESS = -3,                     ///< Cannot access the camera
    INIT_LICENSE_ERROR_MISSING_KEY = -4,            ///< License key is missing
    INIT_LICENSE_ERROR_INVALID_KEY = -5,            ///< Invalid license key passed to SDK
    INIT_LICENSE_ERROR_NO_NETWORK_PERMANENT = -6,   ///< Unable to verify license key due to network (Permanent error)
    INIT_LICENSE_ERROR_NO_NETWORK_TRANSIENT = -7,   ///< Unable to verify license key due to network (Transient error)
    INIT_LICENSE_ERROR_CANCELED_KEY = -8,           ///< Provided key is no longer valid
    INIT_LICENSE_ERROR_PRODUCT_TYPE_MISMATCH = -9,  ///< Provided key is not valid for this product
    INIT_EXTERNAL_DEVICE_NOT_DETECTED = -10         ///< Dependent external device not detected/plugged in
};


export enum VuforiaErrorType {
	InitError = "InitError" as any,
	LoadDataSetError = "LoadDataSetError" as any,
	UnloadDataSetError = "UnloadDataSetError" as any,
	ActivateDataSetError = "ActivateDataSetError" as any,
	DeactivateDataSetError = "DeactivateDataSetError" as any,
}

export class VuforiaServiceDelegate {
	isSupported() {return false}
	init(options:VuforiaInitOptions) : any|PromiseLike<void> {}
	deinit() : any|PromiseLike<any> {}
	startCamera() : any|PromiseLike<any> {}
	stopCamera() : any|PromiseLike<any> {}
	startObjectTracker() : any|PromiseLike<any> {}
	stopObjectTracker() : any|PromiseLike<any> {}
	hintMaxSimultaneousImageTargets(max:number) : any|PromiseLike<any> {}
	setVideoBackgroundConfig(videoConfig:VuforiaVideoBackgroundConfig) : any|PromiseLike<any> {}
	loadDataSet(url) : any|PromiseLike<any>  {}
	unloadDataSet(url) : any|PromiseLike<any>  {}
	activateDataSet(url) : any|PromiseLike<any>  {}
	deactivateDataSet(url) : any|PromiseLike<any>  {}
	getVideoMode() : VuforiaVideoMode { return null };
	updateEvent = new Event<FrameState>();
	errorEvent = new Event<VuforiaErrorMessage>();
	dataSetLoadEvent = new Event<VuforiaDataSetLoadMessage>();
}

export interface VuforiaInitOptions {
	licenseKey?:string,
	encryptedLicenseData?:string
}

export interface VuforiaVideoBackgroundConfig {
    enabled: boolean;
    positionX: number;
    positionY: number;
    sizeX: number;
    sizeY: number;
}

export interface VuforiaVideoMode {
    width:number,
    height:number,
    framerate:number
}

export interface VuforiaErrorMessage {
	type:VuforiaErrorType, 
	message:string, 
	data?:any
}

export interface VuforiaDataSetLoadMessage {
	url: string,
	trackables: VuforiaTrackables
}

@inject(Context, RealityService, VuforiaServiceDelegate)
export class VuforiaService {
	
	constructor(private context:Context, private realityService:RealityService, private delegate:VuforiaServiceDelegate) {
		
		context.parentSession.on['ar.vuforia.errorEvent'] = (err:VuforiaErrorMessage, event) => {
			let error = null;
			switch (err.type) {
				case VuforiaErrorType.InitError : error = new VuforiaInitError(err.message, err.data.code); break;
				case VuforiaErrorType.LoadDataSetError : error = new VuforiaLoadDataSetError(err.message); break;
				case VuforiaErrorType.UnloadDataSetError : error = new VuforiaUnloadDataSetError(err.message); break;
				case VuforiaErrorType.ActivateDataSetError : error = new VuforiaActivateDataSetError(err.message); break;
				default : error = new Error(err.message); break;
			}
			context.errorEvent.raiseEvent(error);
		}
		
		context.parentSession.on['ar.vuforia.dataSetLoadEvent'] = (msg:VuforiaDataSetLoadMessage, event) => {
			const {url, trackables} = msg;
			const dataSet = this.dataSetMap.get(url);
			dataSet._resolveTrackables(trackables);
		}
		
		realityService.handlers.set('vuforia', (reality:Reality, port:MessagePortLike) => {
			
			const remoteRealitySession = realityService.sessionFactory.create();
			
			remoteRealitySession.open(port, {role:Role.REALITY});
			remoteRealitySession.send('ar.vuforia.init');
			remoteRealitySession.send('ar.vuforia.startCamera');
			
			const remove = delegate.updateEvent.addEventListener((frameState)=> {                
				remoteRealitySession.send('ar.context.update', frameState);
				// TODO: Only pass frameNumber / time, and update the trackable entities 
				// directly. Two reasons:
				// 1) Allow vuforia to be used when it is not the current reality
				// 2) Only send trackable data to the session that wants it
				// remoteRealitySession.send('ar.context.update', {
				// 	frameNumber: frameState.frameNumber,
				// 	time: frameState.time,	
				// });
			});
			
			remoteRealitySession.closeEvent.addEventListener(()=> {
				remove();
			});
		})
		
		context.sessionConnectEvent.addEventListener((session)=> {
			
			const loadedDataSets = new Set<string>();
			this._sessionLoadedDataSets.set(session, loadedDataSets);
			
			const activatedDataSets = new Set<string>();
			this._sessionActivatedDataSets.set(session, activatedDataSets);
			
			session.on['ar.vuforia.isSupported'] = () => {
				return delegate.isSupported();
			}
			session.on['ar.vuforia.init'] = (options:VuforiaInitOptions, event) => {
				if (!delegate.isSupported()) return;
				this._sessionInitOptions.set(session, options);
				if (this._controllingSession === null || session === context.focussedSession) {
					this._initVuforia(session);
				}
			}
			session.on['ar.vuforia.deinit'] = (options, event) => {
				if (session === this._controllingSession) {
					if (this._sessionInitOptions.has(session)) {
						this._commandQueue.clear();
						this._commandQueue.push(() => {
							return Promise.resolve(delegate.deinit()).then(()=>{
								this._isInitialized = false;
							});
						}, session);
					}
				}
				this._sessionInitOptions.delete(session);
			}
			session.on['ar.vuforia.startCamera'] = (message, event) => {
				if (session === this._controllingSession) {
					if (!this._sessionCameraStarted.get(session))
						this._commandQueue.push(() => delegate.startCamera()), session;
				}
				this._sessionCameraStarted.set(session, true);
			}
			session.on['ar.vuforia.stopCamera'] = (message, event) => {
				if (session === this._controllingSession) {
					if (this._sessionCameraStarted.get(session))
						this._commandQueue.push(() => delegate.stopCamera(), session);
				}
				this._sessionCameraStarted.set(session, false);
			}
			session.on['ar.vuforia.startObjectTracker'] = (message, event) => {
				if (session === this._controllingSession) {
					if (!this._sessionObjectTrackerStarted.get(session))
						this._commandQueue.push(() => delegate.startObjectTracker()), session;
				}
				this._sessionObjectTrackerStarted.set(session, true);
			}
			session.on['ar.vuforia.stopObjectTracker'] = (message, event) => {
				if (session === this._controllingSession) {
					if (this._sessionObjectTrackerStarted.get(session))
						this._commandQueue.push(() => delegate.stopObjectTracker(), session);
				}
				this._sessionObjectTrackerStarted.set(session, false);
			}
			session.on['ar.vuforia.hintMaxSimultaneousImageTargets'] = ({max}) => {
				if (session === this._controllingSession) {
					this._commandQueue.push(() => delegate.hintMaxSimultaneousImageTargets(max), session);
				}
				this._sessionMaxSimultaneousImageTargets.set(session, max);
			}
			session.on['ar.vuforia.loadDataSet'] = ({url}, event) => {
				if (session === this._controllingSession) {
					if (!loadedDataSets.has(url))
						this._commandQueue.push(() => delegate.loadDataSet(url), session);
				}
				loadedDataSets.add(url);
			}
			session.on['ar.vuforia.unloadDataSet'] = ({url}, event) => {
				if (session === this._controllingSession) {
					if (loadedDataSets.has(url))
						this._commandQueue.push(() => delegate.unloadDataSet(url), session);
				}
				loadedDataSets.delete(url);
				activatedDataSets.delete(url);
			}
			session.on['ar.vuforia.activateDataSet'] = ({url}, event) => {
				if (session === this._controllingSession) {
					if (!loadedDataSets.has(url)) 
						this._commandQueue.push(() => delegate.loadDataSet(url), session);
					if (!activatedDataSets.has(url))
						this._commandQueue.push(() => delegate.activateDataSet(url), session);
				}
				loadedDataSets.add(url);
				activatedDataSets.add(url);
			}
			session.on['ar.vuforia.deactivateDataSet'] = ({url}, event) => {
				if (session === this._controllingSession) {
					if (activatedDataSets.has(url))
						this._commandQueue.push(() => delegate.deactivateDataSet(url), session);
				}
				activatedDataSets.delete(url);
			}
			session.closeEvent.addEventListener(() => {
				this._commandQueue.push(() => delegate.stopObjectTracker(), session);
				loadedDataSets.forEach((url) => {
					this._commandQueue.push(() => delegate.deactivateDataSet(url), session);
					this._commandQueue.push(() => delegate.unloadDataSet(url), session);
				})
				this._controllingSession = null;
			})
		});
		
		context.sessionFocusEvent.addEventListener((session) => {
			if (this._sessionInitOptions.has(session)) {
				this._initVuforia(session)
			}
		})
		
		delegate.errorEvent.addEventListener((msg) => {
			const session = <Session>this._commandQueue.currentUserData;
			if (msg.type === VuforiaErrorType.InitError) {
				this._sessionInitOptions.delete(session);
				this._controllingSession = null;
				this._isInitialized = false;
				this._commandQueue.clear();
			}
			session.send('ar.vuforia.errorEvent', msg);
		})
		
		delegate.dataSetLoadEvent.addEventListener((msg)=> {
			const session = <Session>this._commandQueue.currentUserData;
			session.send('ar.vuforia.dataSetLoadEvent', msg);
		})
		
	};
	
	private _commandQueue = new CommandQueue;
	
	private _sessionInitOptions = new WeakMap<Session, VuforiaInitOptions>();
	private _sessionCameraStarted = new WeakMap<Session, boolean>();
	private _sessionObjectTrackerStarted = new WeakMap<Session, boolean>();
	private _sessionMaxSimultaneousImageTargets = new WeakMap<Session, number>();
	private _sessionLoadedDataSets = new WeakMap<Session, Set<string>>();
	private _sessionActivatedDataSets = new WeakMap<Session, Set<string>>();
	private _controllingSession:Session = null;
	private _isInitialized = false;
    
	private dataSetMap = new Map<string, VuforiaDataSet>();
	
	private _initVuforia(session:Session) {
		const queue = this._commandQueue;
		const initOptions = this._sessionInitOptions.get(session);
		const maxSimultaneousImageTargets = this._sessionMaxSimultaneousImageTargets.get(session);
		const cameraStarted = this._sessionCameraStarted.get(session);
		const objectTrackerStarted = this._sessionObjectTrackerStarted.get(session);
		const loadedDataSets = this._sessionLoadedDataSets.get(session);
		const activatedDataSets = this._sessionActivatedDataSets.get(session);
		const delegate = this.delegate;
		
		if (this._isInitialized) {
			queue.clear();
			queue.push(() => {
				return delegate.deinit().then(()=>{
					this._isInitialized = false;
				});
			}, this._controllingSession);
		}
		this._controllingSession = session;
		
		queue.push(() => {
			this._isInitialized = true;
			return delegate.init(initOptions||{});
		}, session);
		
		if (cameraStarted) queue.push(() => delegate.startCamera(), session);
		if (objectTrackerStarted) queue.push(() => delegate.startObjectTracker(), session);
		
		queue.push(() => delegate.hintMaxSimultaneousImageTargets(maxSimultaneousImageTargets||1), session);
		
		loadedDataSets.forEach((url)=> {
			queue.push(() => delegate.loadDataSet(url), session);
		});
		
		activatedDataSets.forEach((url)=> {
			queue.push(() => delegate.activateDataSet(url), session);
		});
	}
	
	public isSupported() : PromiseLike<boolean> {
		return this.context.parentSession.request('ar.vuforia.isSupported');
	}
	
	public init(options?:VuforiaInitOptions) {
		this.context.parentSession.send('ar.vuforia.init', options)
	}
	
	public deinit() {
		this.context.parentSession.send('ar.vuforia.deinit');
	}
	
	public startCamera() {
		this.context.parentSession.send('ar.vuforia.startCamera')
	}
	
	public stopCamera() {
		this.context.parentSession.send('ar.vuforia.stopCamera')
	}
	
	public startObjectTracker() {
		this.context.parentSession.send('ar.vuforia.startObjectTracker')
	}
	
	public stopObjectTracker() {
		this.context.parentSession.send('ar.vuforia.stopObjectTracker')
	}
	
	public hintMaxSimultaneousImageTargets(max) {
		this.context.parentSession.send('ar.vuforia.hintMaxSimultaneousImageTargets', {max})
	}
	
	public createDataSet(url) : VuforiaDataSet {
		url = resolveURL(url);
		const parentSession = this.context.parentSession;
		const dataSet = new VuforiaDataSet(url, parentSession);
		this.dataSetMap.set(url, dataSet);
		return dataSet;
	}
	
}

export interface VuforiaTrackables {
	[name:string]: {
		id:string,
		name:string,
        size?:number[]
	}
}

export class VuforiaDataSet {
	constructor(public url:string, parentSession:Session) {this._parentSession = parentSession}
	private _parentSession:Session;
	private _loaded = false;
	private _activated = false;
	_resolveTrackables : (value:VuforiaTrackables)=>void;
	private _trackablesPromise = new Promise<VuforiaTrackables>((resolve, reject) => { this._resolveTrackables = resolve });
	get loaded() {return this._loaded}
	get activated() {return this._activated}
	load()       {this._loaded = true;  this._parentSession.send('ar.vuforia.loadDataSet', {url: this.url})}
	unload()     {this._loaded = false; this._activated = false; this._parentSession.send('ar.vuforia.unloadDataSet', {url: this.url})}
	activate()   {this._loaded = true;  this._activated = true;  this._parentSession.send('ar.vuforia.activateDataSet', {url: this.url})}
	deactivate() {this._activated = false; this._parentSession.send('ar.vuforia.deactivateDataSet', {url: this.url})}
	get trackablesPromise() {return this._trackablesPromise}
}
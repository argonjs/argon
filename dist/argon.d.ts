	
/// <reference path="../src/definitions/cesium.d.ts" />
    
import Cesium = require('Cesium')

export {Cesium};

type Container = any;
export const Container:any;
    
export class ArgonSystem {
    static instance: ArgonSystem;
    config: SessionConfiguration;
    container: Container;
    constructor(config: SessionConfiguration, container?:Container);
    context: Context;
    timer: TimerService;
    device: DeviceService;
    vuforia: VuforiaPlugin;
    view: ViewPlugin;
}
export function init(options?:{config?:SessionConfiguration, container?:Container}): ArgonSystem;
export function initReality(options?:{config?:SessionConfiguration, container?:Container}): ArgonSystem;


export enum Role {
    Application = 0,
    Reality = 1,
    Manager = 2,
}

type RemoveCallback = () => void;
export class Event<T> {
    addEventListener(listener: (data: T) => void): RemoveCallback;
    removeEventListener(listener: (data: T) => void): boolean;
    raiseEvent(data: T): void;
}

export class SessionFactory {
    create(role: Role): Session;
}

export class MessageEventLike {
    data: any;
    ports: any;
    constructor(data: any, ports?: any);
}

export interface MessagePortLike {
    onmessage: (ev: MessageEventLike) => any;
    postMessage(message?: any, ports?: any): void;
    close?: () => void;
}

export class MessageChannelLike {
    port1: MessagePortLike;
    port2: MessagePortLike;
    constructor();
}

export class MessageChannelFactory {
    create(): MessageChannelLike;
}

export type MessageHandler = (message: any, event: MessageEvent) => void | any;

export interface MessageHandlerMap {
    [topic: string]: MessageHandler;
}
    
export interface SessionConfiguration {
    role: Role;
    userData?: any;
    enableRealityControlPort?: boolean;
    enableIncomingUpdateEvents?: boolean;
}

export interface ErrorMessage {
    topic?: string;
    id?: string;
    message: string;
}

export class Session {
    _defferedResponses: {};
    static OPEN: string;
    static CLOSE: string;
    static ERROR: string;
    messagePort: MessagePortLike;
    info: SessionConfiguration;
    openPromise: PromiseLike<{}>;
    openEvent: Event<void>;
    focusEvent: Event<void>;
    closeEvent: Event<void>;
    errorEvent: Event<ErrorMessage>;
    on: MessageHandlerMap;
    constructor(role: Role);
    open(messagePort: MessagePortLike, config:SessionConfiguration): void;
    send(topic: string, message?: any, ports?: MessagePortLike[]): void;
    sendError(errorMessage: ErrorMessage): void;
    request(topic: string, message?: any): PromiseLike<{}>;
    focus(): void;
    close(): void;
}
export abstract class ConnectService {
    connect(session: Session): void;
}
export class LoopbackConnectService extends ConnectService {}
export class DOMConnectService extends ConnectService {}
export class WKWebviewConnectService extends ConnectService {}

export class TimerService {
    requestFrame(callback: (time: Cesium.JulianDate) => void): void;
}

export class DeviceService {
    device: Cesium.Entity;
    eye: Cesium.Entity;
    getDevicePose(time:Cesium.JulianDate) : EntityPose;
    getEyePose(time:Cesium.JulianDate) : EntityPose;
    getCameraState() : CameraState;
    defaultReality : Reality;
    viewSize : {width:number,height:number};
}

export interface Reality {
    type: string;
    id?: string;
    [option: string]: any;
}

export interface CameraState {
    type: string;
    [option: string]: any;
}

export interface PerspectiveCameraState extends CameraState {
    type: 'perspective';
    fovy: number;
    fovx?: number;
}

export interface EntityPose {
    referenceFrame: string | Cesium.ReferenceFrame;
    position?: {
        x: number;
        y: number;
        z: number;
    };
    orientation?: {
        x: number;
        y: number;
        z: number;
        w: number;
    };
}
export interface EntityPoseMap {
    [id: string]: EntityPose;
}
export interface FrameState {
    frameNumber: number;
    time: Cesium.JulianDate;
    reality?: Reality;
    camera?: CameraState;
    entities?: EntityPoseMap;
    size?:{width:number, height:number}
}
    
export enum PresentationMode {
    Page,
    Immersive
}

export class RealitySetupService {
    timer: TimerService;
    messageChannelFactory: MessageChannelFactory;
    sessionFactory: SessionFactory;
    handlers: Map<string, (reality: Reality, realitySession: Session) => void>;
    constructor(timer: TimerService, messageChannelFactory: MessageChannelFactory, sessionFactory: SessionFactory);
    setupReality(reality: Reality, realitySession: Session): void;
    setupEmptyReality(reality: Reality, realitySession: Session): void;
    supportsReality(reality: Reality): boolean;
}

export abstract class ContextPlugin {
    context: Context;
    onContextInit(): void;
    onContextReady(): void;
}

export class Context {        
    constructor(realityService: RealitySetupService, deviceService: DeviceService, sessionFactory: SessionFactory, messageChannelFactory: MessageChannelFactory, role: Role, plugins: ContextPlugin[], connectService: ConnectService);
    realityService: RealitySetupService;
    deviceService: DeviceService;
    sessionFactory: SessionFactory;
    messageChannelFactory: MessageChannelFactory;
    role: Role;
    plugins: ContextPlugin[];
    getPlugin<T extends ContextPlugin>(PluginType:{ new(...args: any[]): T }) : T;
    parentSession: Session;
    entities: Cesium.EntityCollection;
    getEntityPose(entity:Cesium.Entity, referenceFrame:Cesium.ReferenceFrame|Cesium.Entity) : EntityPose;
    frame: FrameState;
    frustum: Cesium.PerspectiveFrustum;
    reality: Reality;
    hasFocus: boolean;
    sessions: Session[];
    focussedSession: Session;
    errorEvent: Event<Error>;
    updateEvent: Event<FrameState>;
    renderEvent: Event<FrameState>;
    focusEvent: Event<void>;
    blurEvent: Event<void>;
    realityChangeEvent: Event<void>;
    realityConnectEvent: Event<Session>;
    sessionFocusEvent: Event<Session>;
    sessionCreateEvent: Event<Session>;
    desiredPresentationMode: PresentationMode;
    desiredReality: Reality;
    getDesiredPresentationModeForSession(s: Session): PresentationMode;
    getDesiredRealityForSession(s: Session): Reality;
    onSelectReality(): Reality;
    addSession(): Session;
    subscribeToEntity(id: string): Cesium.Entity;
    device: Cesium.Entity;
    eye: Cesium.Entity;
    eyeOriginEastNorthUp: Cesium.Entity;
    localOriginEastNorthUp: Cesium.Entity;
    localOriginEastUpSouth: Cesium.Entity;
}

export class VuforiaInitError extends Error {}
export class VuforiaLoadDataSetError extends Error {}
export class VuforiaUnloadDataSetError extends Error {}
export class VuforiaActivateDataSetError extends Error {}
export class VuforiaDeactivateDataSetError extends Error {}


export enum VuforiaErrorType {
    InitError,
    LoadDataSetError,
    UnloadDataSetError,
    ActivateDataSetError,
    DeactivateDataSetError
}

export interface VuforiaErrorMessage {
    type:VuforiaErrorType, 
    message:string, 
    data?:any
}

export interface VuforiaVideoBackgroundConfig {
    enabled: boolean;
    positionX: number;
    positionY: number;
    sizeX: number;
    sizeY: number;
}

export interface VuforiaDataSetLoadMessage {
    url: string,
    trackables: VuforiaTrackables
}

export class VuforiaPluginDelegate {
    isSupported(): boolean;
    init(options: any): any | PromiseLike<any>;
    deinit(): any | PromiseLike<any>;
    startCamera(): any | PromiseLike<any>;
    stopCamera(): any | PromiseLike<any>;
    startObjectTracker(): any | PromiseLike<any>;
    stopObjectTracker(): any | PromiseLike<any>;
    hintMaxSimultaneousImageTargets(max:number): any | PromiseLike<any>;
    setVideoBackgroundConfig(videoConfig:VuforiaVideoBackgroundConfig) : any | PromiseLike<any>;
    loadDataSet(url: any): any | PromiseLike<any>;
    unloadDataSet(url: any): any | PromiseLike<any>;
    activateDataSet(url: any): any | PromiseLike<any>;
    deactivateDataSet(url: any): any | PromiseLike<any>;
    getVideoMode() : VuforiaVideoMode;
    updateEvent: Event<FrameState>;
    errorEvent: Event<VuforiaErrorMessage>;
    dataSetLoadEvent: Event<VuforiaDataSetLoadMessage>;
}

export class VuforiaPlugin extends ContextPlugin {
    constructor(delegate: VuforiaPluginDelegate);
    isSupported(): PromiseLike<boolean>;
    init(options?: VuforiaInitOptions): void;
    deinit(): void;
    startCamera(): void;
    stopCamera(): void;
    startObjectTracker():void;
    stopObjectTracker():void;
    hintMaxSimultaneousImageTargets(max:number): void;
    createDataSet(url: any): VuforiaDataSet;
}

export interface VuforiaInitOptions {
    licenseKey?: string;
    encryptedLicenseData?: string;
}

export class VuforiaDataSet {
    constructor(url: string, parentSession: Session);
    url: string;
    loaded: boolean;
    activated: boolean;
    load(): void;
    unload(): void;
    activate(): void;
    deactivate(): void;
    trackablesPromise : PromiseLike<VuforiaTrackables>;
}

export interface VuforiaTrackables {
    [name:string]: {
        id:string,
        name:string
    }
}

export interface VuforiaVideoMode {
    width:number,
    height:number,
    framerate:number
}

export class ViewPlugin extends ContextPlugin {
    element: HTMLDivElement;
    onContextInit(): void;
    onContextReady(): void;
}

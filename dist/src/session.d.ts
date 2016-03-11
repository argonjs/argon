import { Event } from './utils.ts';
export declare enum Role {
    APPLICATION,
    REALITY,
    MANAGER,
}
export declare class SessionFactory {
    create(): Session;
}
export declare class MessageEventLike {
    data: any;
    constructor(data: any);
}
export interface MessagePortLike {
    onmessage: (ev: MessageEventLike) => any;
    postMessage(message?: any): void;
    close?: () => void;
}
export declare class MessageChannelLike {
    port1: MessagePortLike;
    port2: MessagePortLike;
    constructor();
}
export declare class MessageChannelFactory {
    create(): MessageChannelLike;
}
export declare type MessageHandler = (message: any, event: MessageEvent) => void | any;
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
    message: string;
}
export declare class Session {
    static OPEN: string;
    static CLOSE: string;
    static ERROR: string;
    messagePort: MessagePortLike;
    info: SessionConfiguration;
    frameElement: HTMLIFrameElement;
    openEvent: Event<void>;
    focusEvent: Event<void>;
    closeEvent: Event<void>;
    errorEvent: Event<Error>;
    on: MessageHandlerMap;
    private _isOpened;
    private _isClosed;
    private _receivedOpenMessage;
    constructor();
    open(messagePort: MessagePortLike, options: SessionConfiguration): void;
    send(topic: string, message?: {}): boolean;
    sendError(errorMessage: ErrorMessage): boolean;
    request(topic: string, message?: {}): PromiseLike<any>;
    focus(): void;
    close(): void;
}
export declare abstract class ConnectService {
    connect(session: Session): void;
}
export declare class LoopbackConnectService extends ConnectService {
    config: SessionConfiguration;
    messageChannelFactory: MessageChannelFactory;
    constructor(config: SessionConfiguration, messageChannelFactory: MessageChannelFactory);
    connect(session: Session): void;
}
export declare class DOMConnectService extends ConnectService {
    config: SessionConfiguration;
    messageChannelFactory: MessageChannelFactory;
    constructor(config: SessionConfiguration, messageChannelFactory: MessageChannelFactory);
    static isAvailable(): boolean;
    connect(session: Session): void;
}
export declare class DebugConnectService extends ConnectService {
    config: SessionConfiguration;
    messageChannelFactory: MessageChannelFactory;
    constructor(config: SessionConfiguration, messageChannelFactory: MessageChannelFactory);
    static isAvailable(): boolean;
    connect(session: Session): void;
}
export declare class WKWebViewConnectService extends ConnectService {
    config: SessionConfiguration;
    messageChannelFactory: MessageChannelFactory;
    constructor(config: SessionConfiguration, messageChannelFactory: MessageChannelFactory);
    static isAvailable(): boolean;
    connect(session: Session): void;
}

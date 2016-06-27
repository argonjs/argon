import { Configuration } from './common';
import { Event, MessageChannelFactory, MessagePortLike, MessageChannelLike, SynchronousMessageChannel } from './utils';
export interface Message {
    [key: string]: any;
}
/**
 * A callback for message events.
 */
export declare type MessageHandler = (message: Message, event: MessageEvent) => void | Promise<void | Message>;
/**
 * Describes a map from message topic to MessageHandler.
 */
export interface MessageHandlerMap {
    [topic: string]: MessageHandler;
}
/**
 * Describes an error message.
 */
export interface ErrorMessage {
    message: string;
    stack?: string;
}
/**
 * Provides two-way communication between sessions, either
 * Application and Manager, or Reality and Manager.
 */
export declare class SessionPort {
    /**
     * An event which fires when a connection has been
     * established to the remote session.
     */
    readonly connectEvent: Event<undefined>;
    private _connectEvent;
    /**
     * An event which fires when this port has closed
     */
    closeEvent: Event<undefined>;
    /**
     * An error which fires when an error occurs.
     */
    errorEvent: Event<Error>;
    /**
     * A map from topic to message handler.
     */
    on: MessageHandlerMap;
    /**
     * The message port used to post and receive messages.
     */
    messagePort: MessagePortLike;
    /**
     * Describes the configuration of the connected session.
     */
    info: Configuration;
    static OPEN: string;
    static CLOSE: string;
    static ERROR: string;
    private _isOpened;
    private _isConnected;
    private _isClosed;
    constructor();
    /**
     * Check if a protocol is supported by this session.
     */
    supportsProtocol(name: string, versions?: number | number[]): boolean;
    /**
     * Establish a connection to another session via the provided MessagePort.
     * @param messagePort the message port to post and receive messages.
     * @param options the configuration which describes this system.
     */
    open(messagePort: MessagePortLike, options: Configuration): void;
    /**
     * Send a message
     * @param topic the message topic.
     * @param message the message to be sent.
     * @return Return true if the message is posted successfully,
     * return false if the session is closed.
     */
    send(topic: string, message?: void | Message): boolean;
    /**
     * Send an error message.
     * @param errorMessage An error message.
     * @return Return true if the error message is sent successfully,
     * otherwise, return false.
     */
    sendError(e: ErrorMessage | Error): boolean;
    /**
     * Send a request and return a promise for the result.
     * @param topic the message topic.
     * @param message the message to be sent.
     * @return if the session is not opened or is closed, return a rejected promise,
     * Otherwise, the returned promise is resolved or rejected based on the response.
     */
    request(topic: string, message?: Message): Promise<void | Message>;
    /**
     * Close the connection to the remote session.
     */
    close(): void;
    readonly isConnected: boolean;
}
export declare class SessionPortFactory {
    create(): SessionPort;
}
/**
 * Establishes a connection to the manager.
 */
export declare abstract class ConnectService {
    /**
     * @param manager The manager session port.
     * @param config The configuration for this session.
     */
    abstract connect(sessionService: SessionService): void;
}
export declare class SessionService {
    configuration: Configuration;
    private connectService;
    private sessionPortFactory;
    private messageChannelFactory;
    /**
     * The port which handles communication between this session and the manager session.
     */
    manager: SessionPort;
    /**
     * An event that is raised when an error occurs.
     */
    errorEvent: Event<Error>;
    /**
     * An event that is raised when a managed session is opened.
     */
    readonly connectEvent: Event<SessionPort>;
    private _connectEvent;
    /**
     * Manager-only. A collection of ports for the sessions managed by this session.
     */
    readonly managedSessions: SessionPort[];
    private _managedSessions;
    constructor(configuration: Configuration, connectService: ConnectService, sessionPortFactory: SessionPortFactory, messageChannelFactory: MessageChannelFactory);
    /**
     * Establishes a connection with the manager.
     * Called internally by the composition root (ArgonSystem).
     */
    connect(): void;
    /**
     * Manager-only. Creates a session port that is managed by this service.
     * Session ports that are managed will automatically
     * forward open events to this.sessionConnectEvent and error
     * events to this.errorEvent. Other services are likely to add
     * message handlers to the newly connected port.
     * @return a new SessionPort instance
     */
    addManagedSessionPort(): SessionPort;
    /**
     * Creates a session port that is not managed by this service.
     * Unmanaged session ports will not forward any events to
     * this object.
     * @return a new SessionPort instance
     */
    createSessionPort(): SessionPort;
    /**
     * Creates a message channel.
     * @return a new MessageChannel instance
     */
    createMessageChannel(): MessageChannelLike;
    /**
     * Creates a synchronous message channel.
     * @return a new SynchronousMessageChannel instance
     */
    createSynchronousMessageChannel(): SynchronousMessageChannel;
    /**
     * Returns true if this session is the Manager
     */
    readonly isManager: boolean;
    /**
     * Returns true if this session is an Application, meaning,
     * it is running within a Manager.
     */
    readonly isApplication: boolean;
    /**
     * Returns true if this session is a Reality View
     */
    readonly isRealityView: boolean;
    /**
     * Throws an error if this session is not a manager
     */
    ensureIsManager(): void;
    /**
     * Throws an error if this session is not a reality
     */
    ensureIsReality(): void;
    /**
     * Throws an error if this session is a reality
     */
    ensureNotReality(): void;
}
/**
 * Connect this session to itself as the manager.
 */
export declare class LoopbackConnectService extends ConnectService {
    /**
     * Create a loopback connection.
     * @param sessionService The session service instance.
     */
    connect(sessionService: SessionService): void;
}
/**
 * Connect this session to the manager via the parent document (assuming this system is running in an iFrame).
 */
export declare class DOMConnectService extends ConnectService {
    /**
      * Check whether this connect method is available or not.
      * @return true if this method is availble, otherwise false
      */
    static isAvailable(): boolean;
    /**
     * Connect to the manager.
     * @param sessionService The session service instance.
     */
    connect(sessionService: SessionService): void;
}
/**
 * Connect this system to a remote manager for debugging.
 */
export declare class DebugConnectService extends ConnectService {
    /**
     * Check whether this connect method is available or not.
     * @return true if this method is availble, otherwise false
     */
    static isAvailable(): boolean;
    /**
     * Connect to the manager.
     * @param sessionService The session service instance.
     */
    connect({manager, configuration}: SessionService): void;
}
/**
 * A service which connects this system to the manager via a WKWebview message handler.
 */
export declare class WKWebViewConnectService extends ConnectService {
    /**
     * Check whether this connect method is available or not.
     * @return true if this method is availble, otherwise false
     */
    static isAvailable(): boolean;
    /**
     * Connect to the manager.
     * @param sessionService The session service instance.
     */
    connect(sessionService: SessionService): void;
}

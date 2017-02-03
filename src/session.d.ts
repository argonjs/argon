import { Configuration } from './common';
import { Event, MessageChannelFactory, MessagePortLike, MessageChannelLike, SynchronousMessageChannel } from './utils';
import { version } from '../package.json';
export { version };
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
 * Provides two-way communication between two [[SessionPort]] instances.
 */
export declare class SessionPort {
    uri: string;
    /**
     * An event which fires when a connection has been
     * established to the other [[SessionPort]].
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
    /**
     * The version of argon.js which is used by the connecting session.
     * This property is an empty array until the session connects.
     */
    version: number[];
    static OPEN: string;
    static CLOSE: string;
    static ERROR: string;
    private _isOpened;
    private _isConnected;
    private _isClosed;
    constructor(uri?: string);
    /**
     * Check if a protocol is supported by this session.
     */
    supportsProtocol(name: string, versions?: number | number[]): boolean;
    /**
     * Establish a connection to another [[SessionPort]] via the provided [[MessagePort]] instance.
     * @param messagePort the message port to post and receive messages.
     * @param options the configuration which describes this [[ArgonSystem]].
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
    readonly isClosed: boolean;
}
/**
 * A factory for creating [[SessionPort]] instances.
 */
export declare class SessionPortFactory {
    create(uri?: string): SessionPort;
}
/**
 * A service for establishing a connection to the [[REALITY_MANAGER]].
 */
export declare abstract class ConnectService {
    /**
     * Connect to the reality manager.
     */
    abstract connect(sessionService: SessionService): void;
}
/**
 * A service for managing connections to other ArgonSystem instances
 */
export declare class SessionService {
    /**
     * The configuration of this [[ArgonSystem]]
     */
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
     * Manager-only. A collection of ports for each managed session.
     */
    readonly managedSessions: SessionPort[];
    private _managedSessions;
    constructor(
        /**
         * The configuration of this [[ArgonSystem]]
         */
        configuration: Configuration, connectService: ConnectService, sessionPortFactory: SessionPortFactory, messageChannelFactory: MessageChannelFactory);
    /**
     * Establishes a connection with the [[REALITY_MANAGER]].
     * Called internally by the composition root ([[ArgonSystem]]).
     */
    connect(): void;
    /**
     * Manager-only. Creates a [[SessionPort]] that is managed by the current [[ArgonSystem]].
     * Session ports that are managed will automatically forward open events to
     * [[SessionService#sessionConnectEvent]] and error events to [[SessionService#errorEvent]].
     * Other services that are part of the current [[ArgonSystem]] are likely to
     * add message handlers to a newly connected [[SessionPort]].
     * @return a new [[SessionPort]] instance
     */
    addManagedSessionPort(uri: string): SessionPort;
    /**
     * Creates a [[SessionPort]] that is not managed by the current [[ArgonSystem]].
     * Unmanaged session ports will not forward open events or error events
     * to this [[ArgonSystem]].
     * @return a new SessionPort instance
     */
    createSessionPort(uri: string): SessionPort;
    /**
     * Creates a message channel which asyncrhonously sends and receives messages.
     */
    createMessageChannel(): MessageChannelLike;
    /**
     * Creates a message channel which syncrhonously sends and receives messages.
     */
    createSynchronousMessageChannel(): SynchronousMessageChannel;
    /**
     * Returns true if this system represents a [[REALITY_MANAGER]]
     */
    readonly isRealityManager: boolean;
    /**
     * Returns true if this system represents a [[REALITY_AUGMENTER]], meaning,
     * it is running within a [[REALITY_MANAGER]]
     */
    readonly isRealityAugmenter: boolean;
    /**
     * Returns true if this system is a [[REALITY_VIEWER]]
     */
    readonly isRealityViewer: boolean;
    /**
     * @private
     */
    private readonly isManager;
    /**
     * @private
     */
    private readonly isApplication;
    /**
     * @private
     */
    private readonly isRealityView;
    /**
     * Throws an error if this system is not a [[REALITY_MANAGER]]
     */
    ensureIsRealityManager(): void;
    /**
     * Throws an error if this session is not a [[REALITY_VIEWER]]
     */
    ensureIsRealityViewer(): void;
    /**
     * Throws an error if this session is a [[REALITY_VIEWER]]
     */
    ensureNotRealityViewer(): void;
    /**
     * Throws an error if this session is a [[REALITY_AUGMENTER]]
     */
    ensureNotRealityAugmenter(): void;
    /**
     * Throws an error if the connection to the manager is closed
     */
    ensureConnected(): void;
}
/**
 * Connect the current [[ArgonSystem]] to itself as the [[REALITY_MANAGER]].
 */
export declare class LoopbackConnectService extends ConnectService {
    /**
     * Create a loopback connection.
     */
    connect(sessionService: SessionService): void;
}
/**
 * Connect this [[ArgonSystem]] to the [[REALITY_MANAGER]] via the parent document
 * (assuming this system is running in an iFrame).
 */
export declare class DOMConnectService extends ConnectService {
    /**
      * Check whether this connect method is available or not.
      */
    static isAvailable(): boolean;
    /**
     * Connect to the manager.
     */
    connect(sessionService: SessionService): void;
}
/**
 * Connect this system to a remote manager for debugging.
 */
export declare class DebugConnectService extends ConnectService {
    /**
     * Check whether this connect method is available or not.
     */
    static isAvailable(): boolean;
    /**
     * Connect to the manager.
     */
    connect({manager, configuration}: SessionService): void;
}
/**
 * A service which connects this system to the [[REALITY_MANAGER]] via a WKWebview message handler.
 */
export declare class WKWebViewConnectService extends ConnectService {
    /**
     * Check whether this connect method is available or not.
     */
    static isAvailable(): boolean;
    /**
     * Connect to the manager.
     */
    connect(sessionService: SessionService): void;
}

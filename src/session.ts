import { createGuid } from './cesium/cesium-imports';
import { inject } from 'aurelia-dependency-injection';
import { Role, Configuration } from './common'
import { 
    Event, 
    MessageChannelFactory, 
    MessagePortLike, 
    MessageChannelLike,
    SynchronousMessageChannel
} from './utils';

export interface Message {
    [key: string]: any
};

/**
 * A callback for message events.  
 */
export type MessageHandler = (message: Message, event: MessageEvent) => void | Promise<void | Message>;

/**
 * Describes a map from message topic to MessageHandler.
 */
export interface MessageHandlerMap {
    [topic: string]: MessageHandler
}

/**
 * Describes an error message. 
 */
export interface ErrorMessage {
    message: string
    stack?: string
}

/**
 * Provides two-way communication between two [[SessionPort]] instances.
 */
export class SessionPort {

    /**
     * An event which fires when a connection has been 
     * established to the other [[SessionPort]].
     */
    public get connectEvent() {
        if (this._isConnected)
            throw new Error('The connectEvent only fires once and the session is already connected.')
        return this._connectEvent;
    };
    private _connectEvent = new Event<undefined>();

    /**
     * An event which fires when this port has closed
     */
    public closeEvent = new Event<undefined>();

    /**
     * An error which fires when an error occurs.
     */
    public errorEvent = new Event<Error>();

    /**
     * A map from topic to message handler.
     */
    public on: MessageHandlerMap = {};

    /**
     * The message port used to post and receive messages.
     */
    public messagePort: MessagePortLike;

    /**
     * Describes the configuration of the connected session. 
     */
    public info: Configuration;

    public static OPEN = 'ar.session.open';
    public static CLOSE = 'ar.session.close';
    public static ERROR = 'ar.session.error';

    private _isOpened = false;
    private _isConnected = false;
    private _isClosed = false;

    constructor(public uri?: string) {

        this.on[SessionPort.OPEN] = (info: Configuration) => {
            if (!info) throw new Error('Session did not provide a configuration');
            if (this._isConnected) throw new Error('Session has already connected!');
            this.info = info;
            this._isConnected = true;
            this._connectEvent.raiseEvent(undefined);
        }

        this.on[SessionPort.CLOSE] = () => {
            this._isClosed = true;
            this._isConnected = false;
            if (this.messagePort && this.messagePort.close)
                this.messagePort.close();
            this.closeEvent.raiseEvent(undefined);
        }

        this.on[SessionPort.ERROR] = (error: ErrorMessage) => {
            const e = new Error("Session Error: " + error.message);
            if (error.stack) e['stack'] = error.stack;
            this.errorEvent.raiseEvent(e);
        }

        this.errorEvent.addEventListener((error) => {
            if (this.errorEvent.numberOfListeners === 1) console.error(error);
        })

    }

    /**
     * Check if a protocol is supported by this session.
     */
    supportsProtocol(name: string, versions?: number | number[]): boolean {
        if (!this._isConnected) throw new Error('Session has not yet connected');
        const protocols = this.info.protocols;
        if (!protocols) return false;
        let supported = false;
        const foundVersions = new Set<number>();
        protocols.forEach((p) => {
            if (p.indexOf(name) !== -1) {
                const v = (+p.split('@v')[1]) || 0;
                foundVersions.add(v);
            }
        });
        if (versions) {
            if (Array.isArray(versions)) {
                versions.forEach((v) => {
                    if (foundVersions.has(v)) {
                        supported = true;
                    }
                })
            } else {
                if (foundVersions.has(versions)) {
                    supported = true;
                }
            }
        } else if (!versions) {
            supported = true;
        }
        return supported;
    }

    /**
     * Establish a connection to another [[SessionPort]] via the provided [[MessagePort]] instance.
     * @param messagePort the message port to post and receive messages.
     * @param options the configuration which describes this [[ArgonSystem]].
     */
    open(messagePort: MessagePortLike, options: Configuration) {
        if (this._isClosed) return;
        if (this._isOpened) throw new Error('Session can only be opened once');
        if (!options) throw new Error('Session options must be provided');
        this.messagePort = messagePort;
        this._isOpened = true;

        this.messagePort.onmessage = (evt: MessageEvent) => {
            if (this._isClosed) return;
            const id = evt.data[0];
            const topic = evt.data[1];
            const message = evt.data[2] || {};
            const expectsResponse = evt.data[3];
            const handler = this.on[topic];

            if (handler && !expectsResponse) {
                try {
                    const response = handler(message, evt);
                    if (response) console.warn("Handler for " + topic + " returned an unexpected response");
                } catch (e) {
                    this.sendError(e);
                    this.errorEvent.raiseEvent(e);
                }
            } else if (handler) {
                const response = new Promise((resolve) => resolve(<any>handler(message, evt)));
                Promise.resolve(response).then(response => {
                    if (this._isClosed) return;
                    this.send(topic + ':resolve:' + id, response)
                }).catch(error => {
                    if (this._isClosed) return;
                    let errorMessage: string | undefined;
                    if (typeof error === 'string') errorMessage = error;
                    else if (typeof error.message === 'string') errorMessage = error.message;
                    this.send(topic + ':reject:' + id, { reason: errorMessage })
                })
            } else {
                const errorMessage = 'Unable to handle message ' + topic;
                if (expectsResponse) {
                    this.send(topic + ':reject:' + id, { reason: errorMessage })
                } else {
                    this.sendError({ message: errorMessage });
                }
                this.errorEvent.raiseEvent(new Error('No handlers are available for topic ' + topic));
            }
        }

        this.send(SessionPort.OPEN, options)
    }

    /**
     * Send a message 
     * @param topic the message topic.
     * @param message the message to be sent.
     * @return Return true if the message is posted successfully,
     * return false if the session is closed.
     */
    send(topic: string, message?: void | Message): boolean {
        if (!this._isOpened) throw new Error('Session must be open to send messages');
        if (this._isClosed) return false;
        const id = createGuid();
        this.messagePort.postMessage([id, topic, message]);
        return true;
    }

    /**
     * Send an error message.
     * @param errorMessage An error message.
     * @return Return true if the error message is sent successfully,
     * otherwise, return false.
     */
    sendError(e: ErrorMessage | Error): boolean {
        let errorMessage: ErrorMessage = e;
        if (errorMessage instanceof Error) {
            errorMessage = {
                message: errorMessage.message,
                stack: errorMessage['stack']
            }
        }
        return this.send(SessionPort.ERROR, errorMessage);
    }

    /**
     * Send a request and return a promise for the result.
     * @param topic the message topic.
     * @param message the message to be sent.
     * @return if the session is not opened or is closed, return a rejected promise,
     * Otherwise, the returned promise is resolved or rejected based on the response.
     */
    request(topic: string, message?: Message): Promise<void | Message> {
        if (!this._isOpened || this._isClosed)
            throw new Error('Session must be open to make requests');
        const id = createGuid();
        const resolveTopic = topic + ':resolve:' + id;
        const rejectTopic = topic + ':reject:' + id;
        const result = new Promise((resolve, reject) => {
            this.on[resolveTopic] = (message) => {
                delete this.on[resolveTopic];
                delete this.on[rejectTopic];
                resolve(message);
            }
            this.on[rejectTopic] = (message: { reason: string }) => {
                delete this.on[resolveTopic];
                delete this.on[rejectTopic];
                console.warn("Request '" + topic + "' rejected with reason:\n" + message.reason);
                reject(new Error(message.reason));
            }
        })
        this.messagePort.postMessage([id, topic, message || {}, true]);
        return result;
    }

    /**
     * Close the connection to the remote session.
     */
    close() {
        if (this._isClosed) return;
        if (this._isOpened) {
            this.send(SessionPort.CLOSE);
        }
        this._isClosed = true;
        this._isConnected = false;
        if (this.messagePort && this.messagePort.close)
            this.messagePort.close();
        this.closeEvent.raiseEvent(undefined);
    }

    get isConnected() {
        return this._isConnected;
    }
}


/**
 * A factory for creating [[SessionPort]] instances. 
 */
export class SessionPortFactory {
    public create(uri?: string) : SessionPort {
        return new SessionPort(uri);
    }
}

/**
 * A service for establishing a connection to the [[REALITY_MANAGER]].
 */
export abstract class ConnectService {
    /**
     * Connect to the reality manager.
     */
    abstract connect(sessionService: SessionService): void;
}

/**
 * A service for managing connections to other ArgonSystem instances
 */
@inject('config', ConnectService, SessionPortFactory, MessageChannelFactory)
export class SessionService {

    /**
     * The port which handles communication between this session and the manager session.
     */
    public manager = this.createSessionPort('argon:manager');

    /**
     * An event that is raised when an error occurs.
     */
    public errorEvent = new Event<Error>();

    /**
     * An event that is raised when a managed session is opened.
     */
    public get connectEvent() {
        return this._connectEvent;
    };
    private _connectEvent = new Event<SessionPort>();

    /**
     * Manager-only. A collection of ports for the sessions managed by this session.
     */
    public get managedSessions() {
        this.ensureIsRealityManager();
        return this._managedSessions;
    }
    private _managedSessions: SessionPort[] = [];

    constructor(
        /**
         * The configuration of this [[ArgonSystem]]
         */
        public configuration: Configuration,
        private connectService: ConnectService,
        private sessionPortFactory: SessionPortFactory,
        private messageChannelFactory: MessageChannelFactory) {

        this.errorEvent.addEventListener((error) => {
            if (this.errorEvent.numberOfListeners === 1) console.error(error);
        })

        this.manager.errorEvent.addEventListener((error) => {
            this.errorEvent.raiseEvent(error);
        })

        Object.freeze(this);
    }

    /**
     * Establishes a connection with the [[REALITY_MANAGER]].
     * Called internally by the composition root ([[ArgonSystem]]).
     */
    public connect() {
        if (this.connectService && this.connectService.connect) {
            this.connectService.connect(this);
        } else {
            console.warn('Argon: Unable to connect to a manager session; a connect service is not available');
        }
    }

    /**
     * Manager-only. Creates a [[SessionPort]] that is managed by the current [[ArgonSystem]].
     * Session ports that are managed will automatically forward open events to 
     * [[SessionService#sessionConnectEvent]] and error events to [[SessionService#errorEvent]]. 
     * Other services that are part of the current [[ArgonSystem]] are likely to 
     * add message handlers to a newly connected [[SessionPort]]. 
     * @return a new [[SessionPort]] instance
     */
    public addManagedSessionPort(uri: string) {
        this.ensureIsRealityManager();
        const session = this.sessionPortFactory.create(uri);
        session.errorEvent.addEventListener((error) => {
            this.errorEvent.raiseEvent(error);
        });
        session.connectEvent.addEventListener(() => {
            this.managedSessions.push(session);
            this.connectEvent.raiseEvent(session);
        });
        session.closeEvent.addEventListener(() => {
            const index = this.managedSessions.indexOf(session);
            if (index > -1) this.managedSessions.splice(index, 1);
        });
        return session;
    }

    /**
     * Creates a [[SessionPort]] that is not managed by the current [[ArgonSystem]].
     * Unmanaged session ports will not forward open events or error events 
     * to this [[ArgonSystem]].
     * @return a new SessionPort instance
     */
    public createSessionPort(uri?: string) {
        return this.sessionPortFactory.create(uri);
    }

    /**
     * Creates a message channel which asyncrhonously sends and receives messages.
     */
    public createMessageChannel() : MessageChannelLike {
        return this.messageChannelFactory.create();
    }

    /**
     * Creates a message channel which syncrhonously sends and receives messages. 
     */
    public createSynchronousMessageChannel() : SynchronousMessageChannel {
        return this.messageChannelFactory.createSynchronous();
    }

    /**
     * Returns true if this system represents a [[REALITY_MANAGER]]
     */
    get isRealityManager() {
        return this.configuration.role === Role.REALITY_MANAGER || 
            this.configuration.role === Role.MANAGER; // TODO: phase out of using Role.MANAGER enum
    }
    /**
     * Returns true if this system represents a [[REALITY_AUGMENTOR]], meaning, 
     * it is running within a [[REALITY_MANAGER]]
     */
    get isRealityAugmenter() {
        return this.configuration.role === Role.REALITY_AUGMENTOR ||
            this.configuration.role === Role.APPLICATION; // TODO: phase out use of Role.APPLICATION
    }

    /**
     * Returns true if this system is a [[REALITY_VIEW]]
     */
    get isRealityView() {
        return this.configuration.role === Role.REALITY_VIEW;
    }

    /**
     * @private
     */
    private get isManager() { console.warn("Deprecated. Use isRealityManager()"); return this.isManager }

    /**
     * @private
     */
    private get isApplication() { console.warn("Deprecated. Use isRealityAugmenter()"); return this.isRealityAugmenter }

    /**
     * Throws an error if this system is not a [[REALITY_MANAGER]]
     */
    public ensureIsRealityManager() {
        if (!this.isRealityManager)
            throw new Error('An reality-manager only API was accessed from a non reality-manager.')
    }

    /**
     * Throws an error if this session is not a [[REALITY_VIEW]]
     */
    public ensureIsRealityView() {
        if (!this.isRealityView)
            throw new Error('An reality-view only API was accessed from a non reality-view.')
    }

    /**
     * Throws an error if this session is a [[REALITY_VIEW]]
     */
    public ensureNotRealityView() {
        if (this.isRealityView)
            throw new Error('An non-permitted API was accessed from a reality-view.')
    }
}

/**
 * Connect the current [[ArgonSystem]] to itself as the [[REALITY_MANAGER]]. 
 */
export class LoopbackConnectService extends ConnectService {

    /**
     * Create a loopback connection.
     */
    connect(sessionService: SessionService) {
        const messageChannel = sessionService.createSynchronousMessageChannel();
        const messagePort = messageChannel.port1;
        messageChannel.port2.onmessage = (evt) => {
            messageChannel.port2.postMessage(evt.data)
        }
        sessionService.manager.connectEvent.addEventListener(() => {
            sessionService.connectEvent.raiseEvent(sessionService.manager);
        })
        sessionService.manager.open(messagePort, sessionService.configuration);
    }
}

/**
 * Connect this [[ArgonSystem]] to the [[REALITY_MANAGER]] via the parent document
 * (assuming this system is running in an iFrame).
 */
export class DOMConnectService extends ConnectService {

    /**
      * Check whether this connect method is available or not.
      */
    public static isAvailable(): boolean {
        return typeof window !== 'undefined' && typeof window.parent !== 'undefined';
    }

    /**
     * Connect to the manager.
     */
    connect(sessionService: SessionService) {
        const messageChannel = sessionService.createMessageChannel();
        window.parent.postMessage({ type: 'ARGON_SESSION' }, '*', [messageChannel.port1]);
        sessionService.manager.open(messageChannel.port2, sessionService.configuration);
    }
}

/**
 * Connect this system to a remote manager for debugging.
 */
export class DebugConnectService extends ConnectService {

    /**
     * Check whether this connect method is available or not.
     */
    public static isAvailable(): boolean {
        return typeof window !== 'undefined' &&
            !!window['__ARGON_DEBUG_PORT__'];
    }

    /**
     * Connect to the manager.
     */
    connect({manager, configuration}: SessionService) {
        manager.open(window['__ARGON_DEBUG_PORT__'], configuration);
    }
}

declare const webkit: any;

/**
 * A service which connects this system to the [[REALITY_MANAGER]] via a WKWebview message handler.
 */
export class WKWebViewConnectService extends ConnectService {

    /**
     * Check whether this connect method is available or not.
     */
    public static isAvailable(): boolean {
        return typeof window !== 'undefined' &&
            window['webkit'] && window['webkit'].messageHandlers
    }

    /**
     * Connect to the manager.
     */
    connect(sessionService: SessionService) {
        const messageChannel = sessionService.createSynchronousMessageChannel();
        messageChannel.port2.onmessage = (event) => {
            webkit.messageHandlers.argon.postMessage(JSON.stringify(event.data));
        }
        window['__ARGON_PORT__'] = messageChannel.port2;
        sessionService.manager.open(messageChannel.port1, sessionService.configuration);
        window.addEventListener("beforeunload", function() {
            sessionService.manager.close();
        })
    }
}

/**
 * A service which connects this system to the [[REALITY_MANAGER]] via an Android WebView javascript interface.
 */
export class AndroidWebViewConnectService extends ConnectService {

    /**
     * Check whether this connect method is available or not.
     */
    public static isAvailable(): boolean {
        return typeof window !== 'undefined' &&
            window["__argon_android__"];
    }

    /**
     * Connect to the manager.
     */
    connect(sessionService: SessionService) {
        const messageChannel = sessionService.createSynchronousMessageChannel();
        messageChannel.port2.onmessage = (event) => {
            window["__argon_android__"].emit("argon", JSON.stringify(event.data));
        }
        window['__ARGON_PORT__'] = messageChannel.port2;
        sessionService.manager.open(messageChannel.port1, sessionService.configuration);
        window.addEventListener("beforeunload", function() {
            sessionService.manager.close();
        })
    }
}

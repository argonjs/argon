import { createGuid } from './cesium/cesium-imports';
import { inject } from 'aurelia-dependency-injection';
import { Role, Configuration } from './common'
import { 
    deprecated,
    Event, 
    MessageChannelFactory, 
    MessagePortLike, 
    MessageChannelLike,
    SynchronousMessageChannel,
    isIOS
} from './utils';

import { version } from '../package.json'
export { version }

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

const emptyObject = Object.freeze({})

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

    /**
     * The version of argon.js which is used by the connecting session.
     * This property is an empty array until the session connects.
     */
    public version: number[] = [];

    public static OPEN = 'ar.session.open';
    public static CLOSE = 'ar.session.close';
    public static ERROR = 'ar.session.error';

    private _isOpened = false;
    private _isConnected = false;
    private _isClosed = false;

    constructor(public uri?: string) {

        this.on[SessionPort.OPEN] = (info: Configuration) => {
            if (!info) throw new Error(`Session did not provide a configuration (${this.uri})`);
            if (this._isConnected) throw new Error(`Session has already connected! (${this.uri})`);
            this.info = info;
            this.version = this.info.version || [0];
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

            const data = typeof evt.data === 'string' ? JSON.parse(evt.data) : evt.data;
            
            const id = data[0];
            const topic = data[1];
            const message = data[2] || emptyObject;
            const expectsResponse = data[3];
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
                const errorMessage = 'Unable to handle message for topic ' + topic + ' (' + this.uri + ')';
                if (expectsResponse) {
                    this.send(topic + ':reject:' + id, { reason: errorMessage });
                }
                this.errorEvent.raiseEvent(new Error(errorMessage));
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
        const packet = [id, topic, message];
        this.messagePort.postMessage(isIOS ? packet : JSON.stringify(packet)); // http://blog.runspired.com/2016/03/15/webworker-performance-benchmarks/
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
        const packet = [id, topic, message, true];
        this.messagePort.postMessage(isIOS ? packet : JSON.stringify(packet)); // http://blog.runspired.com/2016/03/15/webworker-performance-benchmarks/
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

    get isClosed() {
        return this._isClosed;
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
     * Manager-only. A collection of ports for each managed session.
     */
    public get managedSessions() {
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

        configuration.version = extractVersion(version);
        configuration.uri = (typeof window !== 'undefined' && window.location) ?
            window.location.href : undefined;
        configuration.title = (typeof document !== 'undefined') ? 
            document.title : undefined;

        this.errorEvent.addEventListener((error) => {
            if (this.errorEvent.numberOfListeners === 1) console.error(error);
        })

        this.manager.errorEvent.addEventListener((error) => {
            this.errorEvent.raiseEvent(error);
        });

        this.manager.closeEvent.addEventListener(()=>{
            this.managedSessions.forEach((s)=>{
                s.close();
            });
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
    public addManagedSessionPort(uri:string) {
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
    public createSessionPort(uri:string) {
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
        return Role.isRealityManager(this.configuration && this.configuration.role);
    }
    /**
     * Returns true if this system represents a [[REALITY_AUGMENTER]], meaning, 
     * it is running within a [[REALITY_MANAGER]]
     */
    get isRealityAugmenter() {
        return Role.isRealityAugmenter(this.configuration && this.configuration.role);
    }

    /**
     * Returns true if this system is a [[REALITY_VIEWER]]
     */
    get isRealityViewer() {
        return Role.isRealityViewer(this.configuration && this.configuration.role);
    }

    /**
     * @private
     */
    @deprecated('isRealityManager')
    private get isManager() { return this.isRealityManager }

    /**
     * @private
     */
    @deprecated('isRealityAugmenter')
    private get isApplication() { return this.isRealityAugmenter }

    /**
     * @private
     */
    @deprecated('isRealityViewer')
    private get isRealityView() { return this.isRealityViewer }

    /**
     * Throws an error if this system is not a [[REALITY_MANAGER]]
     */
    public ensureIsRealityManager() {
        if (!this.isRealityManager)
            throw new Error('An reality-manager only API was accessed from a non reality-manager.')
    }

    /**
     * Throws an error if this session is not a [[REALITY_VIEWER]]
     */
    public ensureIsRealityViewer() {
        if (!this.isRealityViewer)
            throw new Error('An reality-viewer only API was accessed from a non reality-viewer.')
    }

    /**
     * Throws an error if this session is a [[REALITY_VIEWER]]
     */
    public ensureNotRealityViewer() {
        if (this.isRealityViewer)
            throw new Error('An non-permitted API was accessed from a reality-viewer.')
    }

    /**
     * Throws an error if this session is a [[REALITY_AUGMENTER]]
     */
    public ensureNotRealityAugmenter() {
        if (this.isRealityAugmenter)
            throw new Error('An non-permitted API was accessed from a reality-viewer.')
    }

    /**
     * Throws an error if the connection to the manager is closed
     */
    public ensureConnected() {
        if (!this.manager.isConnected)
            throw new Error('Session is not connected to manager')
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
        window.parent.postMessage({ type: 'ARGON_SESSION', name:window.name }, '*', [messageChannel.port1]);
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

function extractVersion(versionString) {
    var parts = versionString.split('.');
    for (var i = 0, len = parts.length; i < len; ++i) {
        parts[i] = parseInt(parts[i], 10);
    }
    return parts;
}
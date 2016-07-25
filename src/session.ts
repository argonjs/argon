import * as Cesium from 'Cesium';
import {createGuid} from './cesium/cesium-imports';
import {inject} from 'aurelia-dependency-injection';
import {Configuration, Role} from './common'
import {Event, MessageChannelFactory, MessagePortLike, MessageChannelLike, SynchronousMessageChannel} from './utils';
import {ContextService} from './context'

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
 * Provides two-way communication between sessions, either 
 * Application and Manager, or Reality and Manager.
 */
export class SessionPort {

    /**
     * An event which fires when a connection has been 
     * established to the remote session.
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

    constructor() {

        this.on[SessionPort.OPEN] = (info: Configuration) => {
            if (!info) throw new Error('Session did not provide a configuration');
            if (this._isConnected) throw new Error('Session has already connected!');
            this.info = info;
            this._isConnected = true;
            this._connectEvent.raiseEvent(undefined);
        }

        this.on[SessionPort.CLOSE] = (message) => {
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
     * Establish a connection to another session via the provided MessagePort.
     * @param messagePort the message port to post and receive messages.
     * @param options the configuration which describes this system.
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


/*
 * A factory for creating SessionPort instances. 
 */
export class SessionPortFactory {
    public create() {
        return new SessionPort();
    }
}

/**
 * Establishes a connection to the manager.
 */
export abstract class ConnectService {

    /**
     * @param manager The manager session port.
     * @param config The configuration for this session.
     */
    abstract connect(sessionService: SessionService): void;
}

@inject('config', ConnectService, SessionPortFactory, MessageChannelFactory)
export class SessionService {

    /**
     * The port which handles communication between this session and the manager session.
     */
    public manager = this.createSessionPort();

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
        this.ensureIsManager();
        return this._managedSessions;
    }
    private _managedSessions: SessionPort[] = [];

    constructor(
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
     * Establishes a connection with the manager.
     * Called internally by the composition root (ArgonSystem).
     */
    public connect() {
        if (this.connectService && this.connectService.connect) {
            this.connectService.connect(this);
        } else {
            console.warn('Argon: Unable to connect to a manager session; a connect service is not available');
        }
    }

    /**
     * Manager-only. Creates a session port that is managed by this service.
     * Session ports that are managed will automatically 
     * forward open events to this.sessionConnectEvent and error 
     * events to this.errorEvent. Other services are likely to add 
     * message handlers to the newly connected port. 
     * @return a new SessionPort instance
     */
    public addManagedSessionPort() {
        this.ensureIsManager();
        const session = this.sessionPortFactory.create();
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
     * Creates a session port that is not managed by this service.
     * Unmanaged session ports will not forward any events to
     * this object. 
     * @return a new SessionPort instance
     */
    public createSessionPort() {
        return this.sessionPortFactory.create();
    }

    /**
     * Creates a message channel.
     * @return a new MessageChannel instance
     */
    public createMessageChannel() {
        return this.messageChannelFactory.create();
    }

    /**
     * Creates a synchronous message channel.
     * @return a new SynchronousMessageChannel instance
     */
    public createSynchronousMessageChannel() {
        return this.messageChannelFactory.createSynchronous();
    }

    /**
     * Returns true if this session is the Manager
     */
    get isManager() {
        return this.configuration.role === Role.MANAGER;
    }

    /**
     * Returns true if this session is an Application, meaning, 
     * it is running within a Manager. 
     */
    get isApplication() {
        return this.configuration.role === Role.APPLICATION;
    }

    /**
     * Returns true if this session is a Reality View
     */
    get isRealityView() {
        return this.configuration.role === Role.REALITY_VIEW;
    }

    /**
     * Throws an error if this session is not a manager
     */
    public ensureIsManager() {
        if (!this.isManager)
            throw new Error('An manager-only API was accessed in a non-manager session.')
    }

    /**
     * Throws an error if this session is not a reality
     */
    public ensureIsReality() {
        if (!this.isRealityView)
            throw new Error('An reality-only API was accessed in a non-reality session.')
    }

    /**
     * Throws an error if this session is a reality
     */
    public ensureNotReality() {
        if (this.isRealityView)
            throw new Error('An non-reality API was accessed in a reality session.')
    }
}

/**
 * Connect this session to itself as the manager. 
 */
export class LoopbackConnectService extends ConnectService {

    /**
     * Create a loopback connection.
     * @param sessionService The session service instance.
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
 * Connect this session to the manager via the parent document (assuming this system is running in an iFrame).
 */
export class DOMConnectService extends ConnectService {

    /**
      * Check whether this connect method is available or not.
      * @return true if this method is availble, otherwise false
      */
    public static isAvailable(): boolean {
        return typeof window !== 'undefined' && typeof window.parent !== 'undefined';
    }

    /**
     * Connect to the manager.
     * @param sessionService The session service instance.
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
     * @return true if this method is availble, otherwise false
     */
    public static isAvailable(): boolean {
        return typeof window !== 'undefined' &&
            !!window['__ARGON_DEBUG_PORT__'];
    }

    /**
     * Connect to the manager.
     * @param sessionService The session service instance.
     */
    connect({manager, configuration}: SessionService) {
        manager.open(window['__ARGON_DEBUG_PORT__'], configuration);
    }
}

declare const webkit: any;

/**
 * A service which connects this system to the manager via a WKWebview message handler.
 */
export class WKWebViewConnectService extends ConnectService {

    /**
     * Check whether this connect method is available or not.
     * @return true if this method is availble, otherwise false
     */
    public static isAvailable(): boolean {
        return typeof window !== 'undefined' &&
            window['webkit'] && window['webkit'].messageHandlers
    }

    /**
     * Connect to the manager.
     * @param sessionService The session service instance.
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

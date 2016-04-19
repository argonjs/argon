import * as Cesium from 'Cesium';
import {createGuid} from './cesium/cesium-imports';
import {inject} from 'aurelia-dependency-injection';
import {Configuration, Role} from './config'
import {Event, MessageChannelFactory, MessagePortLike, MessageChannelLike} from './utils';
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
    /**
     * A string which describes the error message.
     */
    message: string
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
            console.warn(`Probable developer error. 
                The connectEvent only fires once and the 
                session is already connected.`)
        return this._connectEvent;
    };
    private _connectEvent = new Event<void>();

    /**
     * An event which fires when this port has closed
     */
    public closeEvent = new Event<void>();

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

    private static OPEN = 'ar.session.open';
    private static CLOSE = 'ar.session.close';
    private static ERROR = 'ar.session.error';

    private _isOpened = false;
    private _isConnected = false;
    private _isClosed = false;

    constructor() {

        this.on[SessionPort.OPEN] = (info: Configuration) => {
            this.info = info;
            this.connectEvent.raiseEvent(null);
            this._isConnected = true;
        }

        this.on[SessionPort.CLOSE] = (message) => {
            this.close()
        }

        this.on[SessionPort.ERROR] = (error: ErrorMessage) => {
            this.errorEvent.raiseEvent(new Error(error.message));
        }

        this.errorEvent.addEventListener((error) => {
            if (this.errorEvent.numberOfListeners === 1) console.error(error);
        })

    }

    /**
     * Establish a connection to another session via the provided MessagePort.
     * @param messagePort the message port to post and receive messages.
     * @param options the configuration which describes this system.
     */
    open(messagePort: MessagePortLike, options: Configuration) {
        this.messagePort = messagePort;

        if (this._isOpened) throw new Error('Session.open: Session can only be opened once');
        if (this._isClosed) throw new Error('Session.open: Session has already been closed');

        this._isOpened = true;

        this.send(SessionPort.OPEN, options);

        this.messagePort.onmessage = (evt: MessageEvent) => {
            if (this._isClosed) return;
            const id = evt.data[0];
            const topic = evt.data[1];
            const message = evt.data[2] || {};
            const expectsResponse = evt.data[3];
            const handler = this.on[topic];

            if (handler && !expectsResponse) {
                const response = handler(message, evt);
                if (response) console.warn("Handler for " + topic + " returned an unexpected response");
            } else if (handler) {
                const response = handler(message, evt);
                if (typeof response === 'undefined') {
                    this.send(topic + ':resolve:' + id);
                } else {
                    Promise.resolve(response).then(response => {
                        if (this._isClosed) return;
                        this.send(topic + ':resolve:' + id, response)
                    }).catch(error => {
                        if (this._isClosed) return;
                        let errorMessage: string;
                        if (typeof error === 'string') errorMessage = error;
                        else if (typeof error.message === 'string') errorMessage = error.message;
                        this.send(topic + ':reject:' + id, { reason: errorMessage })
                    })
                }
            } else {
                const error: ErrorMessage = { message: 'Unable to handle message ' + topic }
                this.send(SessionPort.ERROR, error);
                throw new Error('No handlers are available for topic ' + topic);
            }
        }
    }

    /**
     * Send a message 
     * @param topic the message topic.
     * @param message the message to be sent.
     * @return Return true if the message is posted successfully,
     * return false if the session is closed.
     */
    send(topic: string, message?: void | Message): boolean {
        if (!this._isOpened) throw new Error('Session.send: Session must be open to send messages');
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
    sendError(errorMessage: ErrorMessage): boolean {
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
            throw new Error('Session.request: Session must be open to make requests');
        const id = createGuid();
        const resolveTopic = topic + ':resolve:' + id;
        const rejectTopic = topic + ':reject:' + id;
        this.messagePort.postMessage([id, topic, message || {}, true]);
        return new Promise((resolve, reject) => {
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
        if (this.messagePort && this.messagePort.close)
            this.messagePort.close();
        this.closeEvent.raiseEvent(null);
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
     * Manager-only. An event that is raised when a managed session is opened.
     */
    public get connectEvent() {
        this.ensureIsManager();
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
        this.connectService.connect(this);
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
            if (index > -1) this.managedSessions.splice(index);
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
     * Returns true if this session is the manager
     */
    public isManager() {
        return this.configuration.role === Role.MANAGER;
    }

    /**
     * Returns true if this session is an application
     */
    public isApplication() {
        return this.configuration.role === Role.APPLICATION;
    }

    /**
     * Returns true if this session is a Reality view
     */
    public isRealityView() {
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
        const messageChannel = sessionService.createMessageChannel();
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
        const postMessagePortToParent = () => window.parent.postMessage({ type: 'ARGON_SESSION' }, '*', [messageChannel.port1]);
        if (document.readyState === 'complete') postMessagePortToParent()
        else document.addEventListener('load', postMessagePortToParent);
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
        const messageChannel = sessionService.createMessageChannel();
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



// @singleton()
// @inject(SessionFactory)
// export class DOMSessionListenerService {

// 	public sessionEvent = new Event<Session>();

// 	constructor(sessionFactory:SessionFactory) {
// 		window.addEventListener('message', ev => {
// 			if (ev.data.type != 'ARGON_SESSION') return;

// 			const messagePort:MessagePortLike = ev.ports && ev.ports[0];
// 			if (!messagePort) 
// 				throw new Error('Received an ARGON_SESSION message without a MessagePort object');

// 			// get the event.source iframe
// 			let i = 0;
// 			let frame:HTMLIFrameElement = null;
// 			while (i < window.frames.length && frame != null) {
// 				if (window.frames[i] == ev.source)
// 					frame = document.getElementsByTagName( 'iframe' )[i];
// 			}			

// 			const session = sessionFactory.create();
// 			session.frame = frame;

// 			if (frame) frame.addEventListener('load', function close() {
// 				frame.removeEventListener('load', close);
// 				console.log('IFrameSessionHandler: frame load detected, closing current session.', frame, session)
// 				session.close()
// 			});

// 			this.sessionEvent.raiseEvent(session);
// 		});
// 	}
// }

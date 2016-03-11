import * as Cesium from 'Cesium';
import {createGuid} from './cesium/cesium-imports.ts';
import {inject, singleton} from 'aurelia-dependency-injection';
import {Event} from './utils.ts';
import {Context} from './context.ts'

declare class Object {
    static assign(target, ...sources): any;
}

/*
 * Describes the role of an ArgonSystem
 */
export enum Role {

    /*
     * An application recieves state update events from a manager.
     */
    APPLICATION = "Application" as any,

    /*
     * A reality provides state update events to a manager.
     */
    REALITY = "Reality" as any,

    /*
     * A manager recieves state update events from a reality and sends state update events to applications.
     */
    MANAGER = "Manager" as any
}

/*
 * A factory for creating Session instances. 
 */
export class SessionFactory {

    public create() {
        return new Session();
    }
}

/**
 * A minimal MessageEvent interface.
 */
export declare class MessageEventLike {
    constructor(data: any);
    data: any;
}

/**
 * A minimal MessagePort interface.
 */
export interface MessagePortLike {

    /**
      * A callback for handling incoming messages.
      */
    onmessage: (ev: MessageEventLike) => any;

    /**
     * Send a message through this message port.
     * @param message The message needed to be posted.
     */
    postMessage(message?: any): void;

    /**
     * Close this message port. 
     */
    close?: () => void;
}

/**
 * A MessageChannel pollyfill. 
 */
export class MessageChannelLike {

    /**
     * The first port.
     */
    public port1: MessagePortLike;

    /**
     * The second port.
     */
    public port2: MessagePortLike;

    /**
     * Create a MessageChannelLike instance. 
     */
    constructor() {
        const messageChannel = this;
        let _portsOpen = true;

        let _port1ready: Promise<{}>;
        let _port2ready: Promise<{}>;

        let _port1onmessage: (messageEvent: MessageEventLike) => void;
        _port1ready = new Promise((resolve, reject) => {
            messageChannel.port1 = {
                set onmessage(func) {
                    _port1onmessage = func;
                    resolve();
                },
                get onmessage() {
                    return _port1onmessage;
                },
                postMessage(data: any) {
                    _port2ready.then(() => {
                        if (_portsOpen)
                            messageChannel.port2.onmessage({ data });
                    })
                },
                close() {
                    _portsOpen = false;
                }
            }
        });

        let _port2onmessage: (messageEvent: MessageEventLike) => void;
        _port2ready = new Promise((resolve, reject) => {
            messageChannel.port2 = <MessagePortLike>{
                set onmessage(func) {
                    _port2onmessage = func;
                    resolve();
                },
                get onmessage() {
                    return _port2onmessage;
                },
                postMessage(data: any) {
                    _port1ready.then(() => {
                        if (_portsOpen)
                            messageChannel.port1.onmessage({ data });
                    })
                },
                close() {
                    _portsOpen = false;
                }
            }
        });

    }
}

/**
 * A factory which creates MessageChannel or MessageChannelLike instances, depending on
 * wheter or not MessageChannel is avaialble in the execution context. 
 */
export class MessageChannelFactory {

    /**
     * Create a MessageChannel (or MessageChannelLike) instance.
     */
    public create(): MessageChannelLike {
        if (typeof MessageChannel !== 'undefined') return new MessageChannel()
        else return new MessageChannelLike();
    }
}

/**
 * A callback for message events.  
 */
export type MessageHandler = (message: any, event: MessageEvent) => void | any;

/**
 * Describes a map from message topic to MessageHandler.
 */
export interface MessageHandlerMap {
    [topic: string]: MessageHandler
}

/**
 * Describes the configuration of a session. 
 */
export interface SessionConfiguration {
    role: Role;
    userData?: any;
    enableRealityControlPort?: boolean;
    enableIncomingUpdateEvents?: boolean;
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
 * Provides two-way communication between an 
 * Application and a Manager, or a Reality and a Manager.
 */
export class Session {
    
    private static OPEN = 'ar.session.open';
    
    private static CLOSE = 'ar.session.close';
   
    private static ERROR = 'ar.session.error';
    
    /**
     * A message port to post and receive messages.
     */
    public messagePort: MessagePortLike;
    
    /**
     * Describes the configuration of the connected system. 
     */
    public info: SessionConfiguration;
    
    /**
     * Holding the element of the frame.
     */
    public frameElement: HTMLIFrameElement;

    /**
     * An open event.
     */
    public openEvent = new Event<void>();

    /**
     * A focus event.
     */
    public focusEvent = new Event<void>();

    /**
     * A closed event.
     */
    public closeEvent = new Event<void>();

    /**
     * An error event.
     */
    public errorEvent = new Event<Error>();

    /**
     * A new map from topic to message handler.
     */
    public on: MessageHandlerMap = {};

    private _isOpened = false;
    private _isClosed = false;
    private _receivedOpenMessage = false;

    constructor() {

        this.on[Session.OPEN] = (info: SessionConfiguration) => {
            this.info = info;
            this.openEvent.raiseEvent(null);
        }

        this.on[Session.CLOSE] = (message) => {
            this.close()
        }

        this.on[Session.ERROR] = (error: ErrorMessage) => {
            this.errorEvent.raiseEvent(new Error(error.message));
        }

        this.errorEvent.addEventListener((error) => {
            if (this.errorEvent.numberOfListeners === 1) console.error(error);
        })

    }

    /**
     * Open this session.
     * @param messagePort the message port to post and receive messages.
     * @param options the configuration which describes this system.
     */
    open(messagePort: MessagePortLike, options: SessionConfiguration) {
        this.messagePort = messagePort;

        if (this._isOpened || this._isClosed) throw new Error('Session.open: Session can only be opened once');

        this._isOpened = true;
        // options.role = this.role;
        this.send(Session.OPEN, options);

        this.messagePort.onmessage = (evt: MessageEvent) => {
            if (this._isClosed) return;
            const id = evt.data[0];
            const topic = evt.data[1];
            const message = evt.data[2];
            const expectsResponse = evt.data[3];
            const handler = this.on[topic];

            if (handler && !expectsResponse) {
                handler(message, evt);
            } else if (handler) {
                Promise.resolve(handler(message, evt)).then(response => {
                    if (this._isClosed) return;
                    this.send(topic + ':resolve:' + id, response)
                }).catch(error => {
                    if (this._isClosed) return;
                    let errorMessage: string;
                    if (typeof error === 'string') errorMessage = error;
                    else if (typeof error.message === 'string') errorMessage = error.message;
                    this.send(topic + ':reject:' + id, { errorMessage })
                })
            } else {
                const error: ErrorMessage = { message: 'Unable to handle message ' + topic }
                this.send(Session.ERROR, error);
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
    send(topic: string, message?: {}): boolean {
        if (!this._isOpened) throw new Error('Session must be open to send messages');
        if (this._isClosed) return false;
        const id = createGuid();
        this.messagePort.postMessage([id, topic, message])
        return true;
    }

    /**
     * Send an error message.
     * @param errorMessage An error message.
     * @return Return true if the error message is sent successfully,
     * otherwise, return false.
     */
    sendError(errorMessage: ErrorMessage): boolean {
        return this.send(Session.ERROR, errorMessage);
    }

    /**
     * Send a request and return a promise for the result.
     * @param topic the message topic.
     * @param message the message to be sent.
     * @return if the session is not opened or is closed, return a rejected promise,
     * Otherwise, the returned promise is resolved or rejected based on the response.
     */
    request(topic: string, message?: {}): PromiseLike<any> {
        if (!this._isOpened || this._isClosed)
            return Promise.reject(new Error('Session must be open to make requests'));
        const id = createGuid();
        const resolveTopic = topic + ':resolve:' + id;
        const rejectTopic = topic + ':reject:' + id;
        this.messagePort.postMessage([id, topic, message, true]);
        return new Promise((resolve, reject) => {
            this.on[resolveTopic] = (message) => {
                delete this.on[resolveTopic];
                delete this.on[rejectTopic];
                resolve(message);
            }
            this.on[rejectTopic] = (message) => {
                delete this.on[resolveTopic];
                delete this.on[rejectTopic];
                reject(message);
            }
        })
    }

    /**
     * Request that this session be focussed (TODO: find a better place for this)
     */
    focus() {
        this.focusEvent.raiseEvent(null);
    }

    /**
     * Close this session.
     */
    close() {
        if (this._isClosed) return;
        if (this._isOpened) {
            this.send(Session.CLOSE);
        }
        this._isClosed = true;
        if (this.messagePort && this.messagePort.close)
            this.messagePort.close();
        this.closeEvent.raiseEvent(null);
    }
}

/**
 * Establishes a connection to the manager.
 */
export abstract class ConnectService {

    /**
     * @param session The session wants to connect with.
     */
    connect(session: Session): void { }
}

/**
 * Connect this system to itself as the manager. 
 */
@inject('config', MessageChannelFactory)
export class LoopbackConnectService extends ConnectService {

    constructor(public config: SessionConfiguration, public messageChannelFactory: MessageChannelFactory) { super() }
    
    /**
     * Create a loopback connection.
     * @param session the manager session instance.
     */
    connect(session: Session) {
        const messageChannel = this.messageChannelFactory.create();
        const messagePort = messageChannel.port1;
        messageChannel.port2.onmessage = (evt) => {
            messageChannel.port2.postMessage(evt.data)
        }
        session.open(messagePort, this.config);
    }
}

/**
 * Connect this system to the manager via the parent document (assuming this system is running in an iFrame).
 */
@inject('config', MessageChannelFactory)
export class DOMConnectService extends ConnectService {
    
    constructor(public config: SessionConfiguration, public messageChannelFactory: MessageChannelFactory) { super() }
    
   /**
     * Check whether this connect method is available or not.
     * @return true if this method is availble, otherwise false
     */
    public static isAvailable(): boolean {
        return typeof window !== 'undefined' && typeof window.parent !== 'undefined';
    }
    
    /**
     * Connect to the manager.
     * @param session the manager session instance.
     */
    public connect(session: Session) {
        const messageChannel = this.messageChannelFactory.create();
        const postMessagePortToParent = () => window.parent.postMessage({ type: 'ARGON_SESSION' }, '*', [messageChannel.port1]);
        if (document.readyState === 'complete') postMessagePortToParent()
        else document.addEventListener('load', postMessagePortToParent);
        session.open(messageChannel.port2, this.config);
    }
}

/**
 * Connect this system to a remote manager for debugging.
 */
@inject('config', MessageChannelFactory)
export class DebugConnectService extends ConnectService {
    
    constructor(public config: SessionConfiguration, public messageChannelFactory: MessageChannelFactory) { super() }
    
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
     * @param session the manager session instance.
     */
    public connect(session: Session) {
        session.open(window['__ARGON_DEBUG_PORT__'], this.config);
    }
}

declare const webkit: any;

/**
 * A service which connects this system to the manager via a WKWebview message handler.
 */
@inject('config', MessageChannelFactory)
export class WKWebViewConnectService extends ConnectService {

    constructor(public config: SessionConfiguration, public messageChannelFactory: MessageChannelFactory) { super() }
    
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
     * @param session the manager session instance.
     */
    public connect(session: Session) {
        const messageChannel = this.messageChannelFactory.create();
        messageChannel.port2.onmessage = (event) => {
            webkit.messageHandlers.argon.postMessage(JSON.stringify(event.data));
        }
        window['__ARGON_PORT__'] = messageChannel.port2;
        session.open(messageChannel.port1, this.config);
        window.addEventListener("beforeunload", function() {
            session.close();
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

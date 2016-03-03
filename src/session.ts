import * as Cesium from 'Cesium';
import {createGuid} from './cesium/cesium-imports.ts';
import {inject, singleton} from 'aurelia-dependency-injection';
import {Event} from './utils.ts';
import {Context} from './context.ts'

declare class Object {
    static assign(target, ...sources): any;
}

/*
 * Describes the role of a Session
 */
export enum Role {

    /*
     * A simple session.
     */
    APPLICATION = "Application" as any,

    /*
     * A session with all updated infomation, such as time and location.
     */
    REALITY = "Reality" as any,

    /*
     * A session controls other applications.
     */
    MANAGER = "Manager" as any
}

/*
 * Create session.
 */
export class SessionFactory {

    /*
     * Create new session.
     * @return A new session.
     */
    public create() {
        return new Session();
    }
}

/**
 * Create the event with the message.
 */
export class MessageEventLike {

    /**
     * Create a message as the event.
     * @param Any data to be the message.
     * @return A event with message. 
     */
    constructor(public data: any) { }
}

/**
 * Basic message port.
 */
export interface MessagePortLike {

    /**
      * Create a message event.
      */
    onmessage: (ev: MessageEventLike) => any;

    /**
     * Post the message.
     * @param message The message needed to be posted.
     */
    postMessage(message?: any): void;

    /**
     * The status of the message port. 
     */
    close?: () => void;
}

/**
 * The message channel which has two ports to post message.
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
     * Create a message channel with two ports to be ready to post message. 
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
 * Create message channel. 
 */
export class MessageChannelFactory {

    /**
     * Create message channel.
     * @return A new message channel if messageChannel is not defined before.
     * Otherwise, craete a new messageChannelLike.
     */
    public create(): MessageChannelLike {
        if (typeof MessageChannel !== 'undefined') return new MessageChannel()
        else return new MessageChannelLike();
    }
}

/**
 * Define MessageHandler as the Alias for the function 
 */
export type MessageHandler = (message: any, event: MessageEvent) => void | any;

/**
 * Map a topic to a messageHandler.
 */
export interface MessageHandlerMap {
    [topic: string]: MessageHandler
}

/**
 * The description of a session with role, user data,
 * whether reality control port enables or not,
 * and whether incoming update events enables or not.
 */
export interface SessionConfiguration {
    role: Role;
    userData?: any;
    enableRealityControlPort?: boolean;
    enableIncomingUpdateEvents?: boolean;
}

/**
 * The description of error message. 
 */
export interface ErrorMessage {
    /**
     * The string describes the message.
     */
    message: string
}

/**
 * The description of the session.
 */
export class Session {
    /**
     * Indicate the session is open. 
     */
    public static OPEN = 'ar.session.open';
    /**
     * Indicate the session is closed. 
     */
    public static CLOSE = 'ar.session.close';
    /**
     * Indicate the session has error. 
     */
    public static ERROR = 'ar.session.error';
    /**
     * A message port to post message.
     */
    public messagePort: MessagePortLike;
    /**
     * Holding all the inforamtion about the session.
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

    /**
     * Create a new session.
     * If session is open, assign the inforamtion to the session and raise the event.
     * If session is closed, close the session.
     * If session has error, raise event with error message.  
     */
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
     * Open a session which has been opened before. 
     * Post message on message port.
     * @param messagePort A place to post message.
     * @param options Holding all the inforamtion about the session.
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
     * Send the topic 
     * @param topic The topic of the message.
     * @param message The message ready to be posted on message port.
     * @return Return true if the message is posted successfully,
     * return false if the session is closed or has not been opened yet.
     */
    send(topic: string, message?: {}): boolean {
        if (!this._isOpened) throw new Error('Session must be open to send messages');
        if (this._isClosed) return false;
        const id = createGuid();
        this.messagePort.postMessage([id, topic, message])
        return true;
    }

    /**
     * Send error message with send method.
     * @param errorMessage An enrror message.
     * @return Return true if the error message is sent successfully,
     * otherwise, return false.
     */
    sendError(errorMessage: ErrorMessage): boolean {
        return this.send(Session.ERROR, errorMessage);
    }

    /**
     * Request a task and return a promise to hold the result
     * so that other parties can access to the result. 
     * @param topic The topic of the message.
     * @param message The message ready to be posted on message port.
     * @return if the session is not opened or is closed, return a rejeected promise,
     * if the request is successful, a new promise is returned with result from the request.
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
     * Raise a focus event.
     */
    focus() {
        this.focusEvent.raiseEvent(null);
    }

    /**
     * Close a session.
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
 * Provides the connect service to a session.
 */
export abstract class ConnectService {

    /**
     * @param session The session wants to connect with.
     */
    connect(session: Session): void { }
}

/**
 * Connect to loop back service. 
 */
@inject('config', MessageChannelFactory)
export class LoopbackConnectService extends ConnectService {

    /**
     * Create a new Loop Back Connect Service with super call.
     * @param config Holding all inforamtion about the session.
     * @param messageChannelFactory A new message channel
     */
    constructor(public config: SessionConfiguration, public messageChannelFactory: MessageChannelFactory) { super() }
    
    /**
     * Open the session and post the session's information on the message port.
     * @param session The session wants to connect to loop back service.
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
 * Connect to DOM service.
 */
@inject('config', MessageChannelFactory)
export class DOMConnectService extends ConnectService {
    
    /**
     * Create a new Loop Back Connect Service with super call.
     * @param config Holding all inforamtion about the session.
     * @param messageChannelFactory A new message channel
     */
    constructor(public config: SessionConfiguration, public messageChannelFactory: MessageChannelFactory) { super() }
    
    /**
     * Check whether the window and the window's parent are defined or not.
     * @return Return true if both window and its parent are undefined,
     * otherwise, return false.
     */
    public static isAvailable(): boolean {
        return typeof window !== 'undefined' && typeof window.parent !== 'undefined';
    }
    /**
     * Post message 'Argon_session' to window's parent when the document is complete.
     * Open the session and post the inforamtion on its port.
     * @param config Holding all inforamtion about the session.
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
 * Connect to Debug service.
 */
@inject('config', MessageChannelFactory)
export class DebugConnectService extends ConnectService {
    /**
     * Create a new Loop Back Connect Service with super call.
     * @param config Holding all inforamtion about the session.
     * @param messageChannelFactory A new message channel
     */
    constructor(public config: SessionConfiguration, public messageChannelFactory: MessageChannelFactory) { super() }
    
    /**
     * Check whether the window is avaibable.
     * @return Return true if window is undefined and is not in '_Argon_debug_port_',
     * otherwise, return false.
     */
    public static isAvailable(): boolean {
        return typeof window !== 'undefined' &&
            !!window['__ARGON_DEBUG_PORT__'];
    }
    /**
     * Connect the session to '_argon_debug_port'.
     * @param session A session to be connected to '_argon_debug_port'.
     */
    public connect(session: Session) {
        session.open(window['__ARGON_DEBUG_PORT__'], this.config);
    }
}

declare const webkit: any;

/**
 * Connect to WK web view service.
 */
@inject('config', MessageChannelFactory)
export class WKWebViewConnectService extends ConnectService {

    /**
     * Create a new Loop Back Connect Service with super call.
     * @param config Holding all inforamtion about the session.
     * @param messageChannelFactory A new message channel
     */
    constructor(public config: SessionConfiguration, public messageChannelFactory: MessageChannelFactory) { super() }
    
    /**
     * Check whether the window is available or not.
     * @return Return true if window is undefined and does not have webkit.
     * otherwise, return false.
     */
    public static isAvailable(): boolean {
        return typeof window !== 'undefined' &&
            window['webkit'] && window['webkit'].messageHandlers
    }

    /**
     * Connect the session to webkit service.
     * @param session A session to be connected to webkit service.
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

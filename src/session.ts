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
    APPLICATION = "Application" as any,
    REALITY = "Reality" as any,
    MANAGER = "Manager" as any
}

export class SessionFactory {
    public create() {
        return new Session();
    }
}

export class MessageEventLike {
    constructor(public data: any) { }
}

export interface MessagePortLike {
    onmessage: (ev: MessageEventLike) => any;
    postMessage(message?: any): void;
    close?: () => void;
}

export class MessageChannelLike {
    public port1: MessagePortLike;
    public port2: MessagePortLike;

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

export class MessageChannelFactory {
    public create(): MessageChannelLike {
        if (typeof MessageChannel !== 'undefined') return new MessageChannel()
        else return new MessageChannelLike();
    }
}

export type MessageHandler = (message: any, event: MessageEvent) => void | any;

export interface MessageHandlerMap {
    [topic: string]: MessageHandler
}

export interface SessionConfiguration {
    role: Role;
    userData?: any;
    enableRealityControlPort?: boolean;
    enableIncomingUpdateEvents?: boolean;
}

export interface ErrorMessage {
    message: string
}

export class Session {
    public static OPEN = 'ar.session.open';
    public static CLOSE = 'ar.session.close';
    public static ERROR = 'ar.session.error';

    public messagePort: MessagePortLike;
    public info: SessionConfiguration;
    public frameElement: HTMLIFrameElement;

    public openEvent = new Event<void>();
    public focusEvent = new Event<void>();
    public closeEvent = new Event<void>();
    public errorEvent = new Event<Error>();

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

    send(topic: string, message?: {}): boolean {
        if (!this._isOpened) throw new Error('Session must be open to send messages');
        if (this._isClosed) return false;
        const id = createGuid();
        this.messagePort.postMessage([id, topic, message])
        return true;
    }

    sendError(errorMessage: ErrorMessage): boolean {
        return this.send(Session.ERROR, errorMessage);
    }

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

    focus() {
        this.focusEvent.raiseEvent(null);
    }

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

export abstract class ConnectService {
    connect(session: Session): void { }
}

@inject('config', MessageChannelFactory)
export class LoopbackConnectService extends ConnectService {

    constructor(public config: SessionConfiguration, public messageChannelFactory: MessageChannelFactory) { super() }

    connect(session: Session) {
        const messageChannel = this.messageChannelFactory.create();
        const messagePort = messageChannel.port1;
        messageChannel.port2.onmessage = (evt) => {
            messageChannel.port2.postMessage(evt.data)
        }
        session.open(messagePort, this.config);
    }
}

@inject('config', MessageChannelFactory)
export class DOMConnectService extends ConnectService {

    constructor(public config: SessionConfiguration, public messageChannelFactory: MessageChannelFactory) { super() }

    public static isAvailable(): boolean {
        return typeof window !== 'undefined' && typeof window.parent !== 'undefined';
    }

    public connect(session: Session) {
        const messageChannel = this.messageChannelFactory.create();
        const postMessagePortToParent = () => window.parent.postMessage({ type: 'ARGON_SESSION' }, '*', [messageChannel.port1]);
        if (document.readyState === 'complete') postMessagePortToParent()
        else document.addEventListener('load', postMessagePortToParent);
        session.open(messageChannel.port2, this.config);
    }
}

@inject('config', MessageChannelFactory)
export class DebugConnectService extends ConnectService {

    constructor(public config: SessionConfiguration, public messageChannelFactory: MessageChannelFactory) { super() }

    public static isAvailable(): boolean {
        return typeof window !== 'undefined' &&
            !!window['__ARGON_DEBUG_PORT__'];
    }

    public connect(session: Session) {
        session.open(window['__ARGON_DEBUG_PORT__'], this.config);
    }
}

declare const webkit: any;

@inject('config', MessageChannelFactory)
export class WKWebViewConnectService extends ConnectService {

    constructor(public config: SessionConfiguration, public messageChannelFactory: MessageChannelFactory) { super() }

    public static isAvailable(): boolean {
        return typeof window !== 'undefined' &&
            window['webkit'] && window['webkit'].messageHandlers
    }

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

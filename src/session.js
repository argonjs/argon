var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { createGuid } from './cesium/cesium-imports';
import { inject } from 'aurelia-dependency-injection';
import { Role, Configuration } from './common';
import { deprecated, Event, MessageChannelFactory, isIOS } from './utils';
import { version } from '../package.json';
export { version };
;
const emptyObject = Object.freeze({});
/**
 * Provides two-way communication between two [[SessionPort]] instances.
 */
export class SessionPort {
    constructor(uri) {
        this.uri = uri;
        this._connectEvent = new Event();
        /**
         * An event which fires when this port has closed
         */
        this.closeEvent = new Event();
        /**
         * An error which fires when an error occurs.
         */
        this.errorEvent = new Event();
        /**
         * A map from topic to message handler.
         */
        this.on = {};
        /**
         * The version of argon.js which is used by the connecting session.
         * This property is an empty array until the session connects.
         */
        this.version = [];
        this._isOpened = false;
        this._isConnected = false;
        this._isClosed = false;
        this.on[SessionPort.OPEN] = (info) => {
            if (!info)
                throw new Error(`Session did not provide a configuration (${this.uri})`);
            if (this._isConnected)
                throw new Error(`Session has already connected! (${this.uri})`);
            this.info = info;
            this.version = this.info.version || [0];
            this._isConnected = true;
            this._connectEvent.raiseEvent(undefined);
        };
        this.on[SessionPort.CLOSE] = () => {
            this._isClosed = true;
            this._isConnected = false;
            if (this.messagePort && this.messagePort.close)
                this.messagePort.close();
            this.closeEvent.raiseEvent(undefined);
        };
        this.on[SessionPort.ERROR] = (error) => {
            const e = new Error("Session Error: " + error.message);
            if (error.stack)
                e['stack'] = error.stack;
            this.errorEvent.raiseEvent(e);
        };
        this.errorEvent.addEventListener((error) => {
            if (this.errorEvent.numberOfListeners === 1)
                console.error(error);
        });
    }
    /**
     * An event which fires when a connection has been
     * established to the other [[SessionPort]].
     */
    get connectEvent() {
        if (this._isConnected)
            throw new Error('The connectEvent only fires once and the session is already connected.');
        return this._connectEvent;
    }
    ;
    /**
     * Check if a protocol is supported by this session.
     */
    supportsProtocol(name, versions) {
        if (!this._isConnected)
            throw new Error('Session has not yet connected');
        const protocols = this.info.protocols;
        if (!protocols)
            return false;
        let supported = false;
        const foundVersions = new Set();
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
                });
            }
            else {
                if (foundVersions.has(versions)) {
                    supported = true;
                }
            }
        }
        else if (!versions) {
            supported = true;
        }
        return supported;
    }
    /**
     * Establish a connection to another [[SessionPort]] via the provided [[MessagePort]] instance.
     * @param messagePort the message port to post and receive messages.
     * @param options the configuration which describes this [[ArgonSystem]].
     */
    open(messagePort, options) {
        if (this._isClosed)
            return;
        if (this._isOpened)
            throw new Error('Session can only be opened once');
        if (!options)
            throw new Error('Session options must be provided');
        this.messagePort = messagePort;
        this._isOpened = true;
        this.messagePort.onmessage = (evt) => {
            if (this._isClosed)
                return;
            const data = typeof evt.data === 'string' ? JSON.parse(evt.data) : evt.data;
            const id = data[0];
            const topic = data[1];
            const message = data[2] || emptyObject;
            const expectsResponse = data[3];
            const handler = this.on[topic];
            if (handler && !expectsResponse) {
                try {
                    const response = handler(message, evt);
                    if (response)
                        console.warn("Handler for " + topic + " returned an unexpected response");
                }
                catch (e) {
                    this.sendError(e);
                    this.errorEvent.raiseEvent(e);
                }
            }
            else if (handler) {
                const response = new Promise((resolve) => resolve(handler(message, evt)));
                Promise.resolve(response).then(response => {
                    if (this._isClosed)
                        return;
                    this.send(topic + ':resolve:' + id, response);
                }).catch(error => {
                    if (this._isClosed)
                        return;
                    let errorMessage;
                    if (typeof error === 'string')
                        errorMessage = error;
                    else if (typeof error.message === 'string')
                        errorMessage = error.message;
                    this.send(topic + ':reject:' + id, { reason: errorMessage });
                });
            }
            else {
                const errorMessage = 'Unable to handle message for topic ' + topic + ' (' + this.uri + ')';
                if (expectsResponse) {
                    this.send(topic + ':reject:' + id, { reason: errorMessage });
                }
                this.errorEvent.raiseEvent(new Error(errorMessage));
            }
        };
        this.send(SessionPort.OPEN, options);
    }
    /**
     * Send a message
     * @param topic the message topic.
     * @param message the message to be sent.
     * @return Return true if the message is posted successfully,
     * return false if the session is closed.
     */
    send(topic, message) {
        if (!this._isOpened)
            throw new Error('Session must be open to send messages');
        if (this._isClosed)
            return false;
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
    sendError(e) {
        let errorMessage = e;
        if (errorMessage instanceof Error) {
            errorMessage = {
                message: errorMessage.message,
                stack: errorMessage['stack']
            };
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
    request(topic, message) {
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
            };
            this.on[rejectTopic] = (message) => {
                delete this.on[resolveTopic];
                delete this.on[rejectTopic];
                console.warn("Request '" + topic + "' rejected with reason:\n" + message.reason);
                reject(new Error(message.reason));
            };
        });
        const packet = [id, topic, message, true];
        this.messagePort.postMessage(isIOS ? packet : JSON.stringify(packet)); // http://blog.runspired.com/2016/03/15/webworker-performance-benchmarks/
        return result;
    }
    /**
     * Close the connection to the remote session.
     */
    close() {
        if (this._isClosed)
            return;
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
SessionPort.OPEN = 'ar.session.open';
SessionPort.CLOSE = 'ar.session.close';
SessionPort.ERROR = 'ar.session.error';
/**
 * A factory for creating [[SessionPort]] instances.
 */
export class SessionPortFactory {
    create(uri) {
        return new SessionPort(uri);
    }
}
/**
 * A service for establishing a connection to the [[REALITY_MANAGER]].
 */
export class ConnectService {
}
/**
 * A service for managing connections to other ArgonSystem instances
 */
let SessionService = class SessionService {
    constructor(
        /**
         * The configuration of this [[ArgonSystem]]
         */
        configuration, connectService, sessionPortFactory, messageChannelFactory) {
        this.configuration = configuration;
        this.connectService = connectService;
        this.sessionPortFactory = sessionPortFactory;
        this.messageChannelFactory = messageChannelFactory;
        /**
         * The port which handles communication between this session and the manager session.
         */
        this.manager = this.createSessionPort('argon:manager');
        /**
         * An event that is raised when an error occurs.
         */
        this.errorEvent = new Event();
        this._connectEvent = new Event();
        this._managedSessions = [];
        configuration.version = extractVersion(version);
        configuration.uri = (typeof window !== 'undefined' && window.location) ?
            window.location.href : undefined;
        configuration.title = (typeof document !== 'undefined') ?
            document.title : undefined;
        this.errorEvent.addEventListener((error) => {
            if (this.errorEvent.numberOfListeners === 1)
                console.error(error);
        });
        this.manager.errorEvent.addEventListener((error) => {
            this.errorEvent.raiseEvent(error);
        });
        this.manager.closeEvent.addEventListener(() => {
            this.managedSessions.forEach((s) => {
                s.close();
            });
        });
        Object.freeze(this);
    }
    /**
     * An event that is raised when a managed session is opened.
     */
    get connectEvent() {
        return this._connectEvent;
    }
    ;
    /**
     * Manager-only. A collection of ports for each managed session.
     */
    get managedSessions() {
        return this._managedSessions;
    }
    /**
     * Establishes a connection with the [[REALITY_MANAGER]].
     * Called internally by the composition root ([[ArgonSystem]]).
     */
    connect() {
        if (this.connectService && this.connectService.connect) {
            this.connectService.connect(this);
        }
        else {
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
    addManagedSessionPort(uri) {
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
            if (index > -1)
                this.managedSessions.splice(index, 1);
        });
        return session;
    }
    /**
     * Creates a [[SessionPort]] that is not managed by the current [[ArgonSystem]].
     * Unmanaged session ports will not forward open events or error events
     * to this [[ArgonSystem]].
     * @return a new SessionPort instance
     */
    createSessionPort(uri) {
        return this.sessionPortFactory.create(uri);
    }
    /**
     * Creates a message channel which asyncrhonously sends and receives messages.
     */
    createMessageChannel() {
        return this.messageChannelFactory.create();
    }
    /**
     * Creates a message channel which syncrhonously sends and receives messages.
     */
    createSynchronousMessageChannel() {
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
    get isManager() { return this.isRealityManager; }
    /**
     * @private
     */
    get isApplication() { return this.isRealityAugmenter; }
    /**
     * @private
     */
    get isRealityView() { return this.isRealityViewer; }
    /**
     * Throws an error if this system is not a [[REALITY_MANAGER]]
     */
    ensureIsRealityManager() {
        if (!this.isRealityManager)
            throw new Error('An reality-manager only API was accessed from a non reality-manager.');
    }
    /**
     * Throws an error if this session is not a [[REALITY_VIEWER]]
     */
    ensureIsRealityViewer() {
        if (!this.isRealityViewer)
            throw new Error('An reality-viewer only API was accessed from a non reality-viewer.');
    }
    /**
     * Throws an error if this session is a [[REALITY_VIEWER]]
     */
    ensureNotRealityViewer() {
        if (this.isRealityViewer)
            throw new Error('An non-permitted API was accessed from a reality-viewer.');
    }
    /**
     * Throws an error if this session is a [[REALITY_AUGMENTER]]
     */
    ensureNotRealityAugmenter() {
        if (this.isRealityAugmenter)
            throw new Error('An non-permitted API was accessed from a reality-viewer.');
    }
    /**
     * Throws an error if the connection to the manager is closed
     */
    ensureConnected() {
        if (!this.manager.isConnected)
            throw new Error('Session is not connected to manager');
    }
};
__decorate([
    deprecated('isRealityManager'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], SessionService.prototype, "isManager", null);
__decorate([
    deprecated('isRealityAugmenter'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], SessionService.prototype, "isApplication", null);
__decorate([
    deprecated('isRealityViewer'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], SessionService.prototype, "isRealityView", null);
SessionService = __decorate([
    inject('config', ConnectService, SessionPortFactory, MessageChannelFactory),
    __metadata("design:paramtypes", [Configuration,
        ConnectService,
        SessionPortFactory,
        MessageChannelFactory])
], SessionService);
export { SessionService };
/**
 * Connect the current [[ArgonSystem]] to itself as the [[REALITY_MANAGER]].
 */
export class LoopbackConnectService extends ConnectService {
    /**
     * Create a loopback connection.
     */
    connect(sessionService) {
        const messageChannel = sessionService.createSynchronousMessageChannel();
        const messagePort = messageChannel.port1;
        messageChannel.port2.onmessage = (evt) => {
            messageChannel.port2.postMessage(evt.data);
        };
        sessionService.manager.connectEvent.addEventListener(() => {
            sessionService.connectEvent.raiseEvent(sessionService.manager);
        });
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
    static isAvailable() {
        return typeof window !== 'undefined' && typeof window.parent !== 'undefined';
    }
    /**
     * Connect to the manager.
     */
    connect(sessionService) {
        const messageChannel = sessionService.createMessageChannel();
        window.parent.postMessage({ type: 'ARGON_SESSION', name: window.name }, '*', [messageChannel.port1]);
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
    static isAvailable() {
        return typeof window !== 'undefined' &&
            !!window['__ARGON_DEBUG_PORT__'];
    }
    /**
     * Connect to the manager.
     */
    connect({ manager, configuration }) {
        manager.open(window['__ARGON_DEBUG_PORT__'], configuration);
    }
}
/**
 * A service which connects this system to the [[REALITY_MANAGER]] via a WKWebview message handler.
 */
export class WKWebViewConnectService extends ConnectService {
    /**
     * Check whether this connect method is available or not.
     */
    static isAvailable() {
        return typeof window !== 'undefined' &&
            window['webkit'] && window['webkit'].messageHandlers;
    }
    /**
     * Connect to the manager.
     */
    connect(sessionService) {
        const messageChannel = sessionService.createSynchronousMessageChannel();
        messageChannel.port2.onmessage = (event) => {
            webkit.messageHandlers.argon.postMessage(JSON.stringify(event.data));
        };
        window['__ARGON_PORT__'] = messageChannel.port2;
        sessionService.manager.open(messageChannel.port1, sessionService.configuration);
        window.addEventListener("beforeunload", function () {
            sessionService.manager.close();
        });
    }
}
function extractVersion(versionString) {
    var parts = versionString.split('.');
    for (var i = 0, len = parts.length; i < len; ++i) {
        parts[i] = parseInt(parts[i], 10);
    }
    return parts;
}

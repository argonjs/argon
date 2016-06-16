System.register(['./cesium/cesium-imports', 'aurelia-dependency-injection', './common', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var cesium_imports_1, aurelia_dependency_injection_1, common_1, utils_1;
    var SessionPort, SessionPortFactory, ConnectService, SessionService, LoopbackConnectService, DOMConnectService, DebugConnectService, WKWebViewConnectService;
    return {
        setters:[
            function (cesium_imports_1_1) {
                cesium_imports_1 = cesium_imports_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            ;
            /**
             * Provides two-way communication between sessions, either
             * Application and Manager, or Reality and Manager.
             */
            SessionPort = (function () {
                function SessionPort() {
                    var _this = this;
                    this._connectEvent = new utils_1.Event();
                    /**
                     * An event which fires when this port has closed
                     */
                    this.closeEvent = new utils_1.Event();
                    /**
                     * An error which fires when an error occurs.
                     */
                    this.errorEvent = new utils_1.Event();
                    /**
                     * A map from topic to message handler.
                     */
                    this.on = {};
                    this._isOpened = false;
                    this._isConnected = false;
                    this._isClosed = false;
                    this.on[SessionPort.OPEN] = function (info) {
                        if (!info)
                            throw new Error('Session did not provide a configuration');
                        if (_this._isConnected)
                            throw new Error('Session has already connected!');
                        _this.info = info;
                        _this._isConnected = true;
                        _this._connectEvent.raiseEvent(null);
                    };
                    this.on[SessionPort.CLOSE] = function (message) {
                        _this._isClosed = true;
                        _this._isConnected = false;
                        if (_this.messagePort && _this.messagePort.close)
                            _this.messagePort.close();
                        _this.closeEvent.raiseEvent(null);
                    };
                    this.on[SessionPort.ERROR] = function (error) {
                        var e = new Error("Session Error: " + error.message);
                        if (error.stack)
                            e['stack'] = error.stack;
                        _this.errorEvent.raiseEvent(e);
                    };
                    this.errorEvent.addEventListener(function (error) {
                        if (_this.errorEvent.numberOfListeners === 1)
                            console.error(error);
                    });
                }
                Object.defineProperty(SessionPort.prototype, "connectEvent", {
                    /**
                     * An event which fires when a connection has been
                     * established to the remote session.
                     */
                    get: function () {
                        if (this._isConnected)
                            throw new Error('The connectEvent only fires once and the session is already connected.');
                        return this._connectEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                /**
                 * Check if a protocol is supported by this session.
                 */
                SessionPort.prototype.supportsProtocol = function (name, versions) {
                    if (!this._isConnected)
                        throw new Error('Session has not yet connected');
                    var protocols = this.info.protocols;
                    if (!protocols)
                        return false;
                    var supported = false;
                    var foundVersions = new Set();
                    protocols.forEach(function (p) {
                        if (p.indexOf(name) !== -1) {
                            var v = (+p.split('@v')[1]) || 0;
                            foundVersions.add(v);
                        }
                    });
                    if (versions) {
                        if (Array.isArray(versions)) {
                            versions.forEach(function (v) {
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
                };
                /**
                 * Establish a connection to another session via the provided MessagePort.
                 * @param messagePort the message port to post and receive messages.
                 * @param options the configuration which describes this system.
                 */
                SessionPort.prototype.open = function (messagePort, options) {
                    var _this = this;
                    if (this._isOpened)
                        throw new Error('Session can only be opened once');
                    if (this._isClosed)
                        throw new Error('Session has already been closed');
                    if (!options)
                        throw new Error('Session options must be provided');
                    this.messagePort = messagePort;
                    this._isOpened = true;
                    this.messagePort.onmessage = function (evt) {
                        if (_this._isClosed)
                            return;
                        var id = evt.data[0];
                        var topic = evt.data[1];
                        var message = evt.data[2] || {};
                        var expectsResponse = evt.data[3];
                        var handler = _this.on[topic];
                        if (handler && !expectsResponse) {
                            try {
                                var response = handler(message, evt);
                                if (response)
                                    console.warn("Handler for " + topic + " returned an unexpected response");
                            }
                            catch (e) {
                                _this.sendError(e);
                                _this.errorEvent.raiseEvent(e);
                            }
                        }
                        else if (handler) {
                            var response = handler(message, evt);
                            if (typeof response === 'undefined') {
                                _this.send(topic + ':resolve:' + id);
                            }
                            else {
                                Promise.resolve(response).then(function (response) {
                                    if (_this._isClosed)
                                        return;
                                    _this.send(topic + ':resolve:' + id, response);
                                }).catch(function (error) {
                                    if (_this._isClosed)
                                        return;
                                    var errorMessage;
                                    if (typeof error === 'string')
                                        errorMessage = error;
                                    else if (typeof error.message === 'string')
                                        errorMessage = error.message;
                                    _this.send(topic + ':reject:' + id, { reason: errorMessage });
                                });
                            }
                        }
                        else {
                            var errorMessage = 'Unable to handle message ' + topic;
                            if (expectsResponse) {
                                _this.send(topic + ':reject:' + id, { reason: errorMessage });
                            }
                            else {
                                _this.sendError({ message: errorMessage });
                            }
                            _this.errorEvent.raiseEvent(new Error('No handlers are available for topic ' + topic));
                        }
                    };
                    this.send(SessionPort.OPEN, options);
                };
                /**
                 * Send a message
                 * @param topic the message topic.
                 * @param message the message to be sent.
                 * @return Return true if the message is posted successfully,
                 * return false if the session is closed.
                 */
                SessionPort.prototype.send = function (topic, message) {
                    if (!this._isOpened)
                        throw new Error('Session must be open to send messages');
                    if (this._isClosed)
                        return false;
                    var id = cesium_imports_1.createGuid();
                    this.messagePort.postMessage([id, topic, message]);
                    return true;
                };
                /**
                 * Send an error message.
                 * @param errorMessage An error message.
                 * @return Return true if the error message is sent successfully,
                 * otherwise, return false.
                 */
                SessionPort.prototype.sendError = function (e) {
                    var errorMessage = e;
                    if (errorMessage instanceof Error) {
                        errorMessage = {
                            message: errorMessage.message,
                            stack: errorMessage['stack']
                        };
                    }
                    return this.send(SessionPort.ERROR, errorMessage);
                };
                /**
                 * Send a request and return a promise for the result.
                 * @param topic the message topic.
                 * @param message the message to be sent.
                 * @return if the session is not opened or is closed, return a rejected promise,
                 * Otherwise, the returned promise is resolved or rejected based on the response.
                 */
                SessionPort.prototype.request = function (topic, message) {
                    var _this = this;
                    if (!this._isOpened || this._isClosed)
                        throw new Error('Session must be open to make requests');
                    var id = cesium_imports_1.createGuid();
                    var resolveTopic = topic + ':resolve:' + id;
                    var rejectTopic = topic + ':reject:' + id;
                    var result = new Promise(function (resolve, reject) {
                        _this.on[resolveTopic] = function (message) {
                            delete _this.on[resolveTopic];
                            delete _this.on[rejectTopic];
                            resolve(message);
                        };
                        _this.on[rejectTopic] = function (message) {
                            delete _this.on[resolveTopic];
                            delete _this.on[rejectTopic];
                            console.warn("Request '" + topic + "' rejected with reason:\n" + message.reason);
                            reject(new Error(message.reason));
                        };
                    });
                    this.messagePort.postMessage([id, topic, message || {}, true]);
                    return result;
                };
                /**
                 * Close the connection to the remote session.
                 */
                SessionPort.prototype.close = function () {
                    if (this._isClosed)
                        return;
                    if (this._isOpened) {
                        this.send(SessionPort.CLOSE);
                    }
                    this._isClosed = true;
                    this._isConnected = false;
                    if (this.messagePort && this.messagePort.close)
                        this.messagePort.close();
                    this.closeEvent.raiseEvent(null);
                };
                Object.defineProperty(SessionPort.prototype, "isOpened", {
                    get: function () {
                        return this._isOpened;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SessionPort.prototype, "isConnected", {
                    get: function () {
                        return this._isConnected;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SessionPort.prototype, "isClosed", {
                    get: function () {
                        return this._isClosed;
                    },
                    enumerable: true,
                    configurable: true
                });
                SessionPort.OPEN = 'ar.session.open';
                SessionPort.CLOSE = 'ar.session.close';
                SessionPort.ERROR = 'ar.session.error';
                return SessionPort;
            }());
            exports_1("SessionPort", SessionPort);
            /*
             * A factory for creating SessionPort instances.
             */
            SessionPortFactory = (function () {
                function SessionPortFactory() {
                }
                SessionPortFactory.prototype.create = function () {
                    return new SessionPort();
                };
                return SessionPortFactory;
            }());
            exports_1("SessionPortFactory", SessionPortFactory);
            /**
             * Establishes a connection to the manager.
             */
            ConnectService = (function () {
                function ConnectService() {
                }
                return ConnectService;
            }());
            exports_1("ConnectService", ConnectService);
            SessionService = (function () {
                function SessionService(configuration, connectService, sessionPortFactory, messageChannelFactory) {
                    var _this = this;
                    this.configuration = configuration;
                    this.connectService = connectService;
                    this.sessionPortFactory = sessionPortFactory;
                    this.messageChannelFactory = messageChannelFactory;
                    /**
                     * The port which handles communication between this session and the manager session.
                     */
                    this.manager = this.createSessionPort();
                    /**
                     * An event that is raised when an error occurs.
                     */
                    this.errorEvent = new utils_1.Event();
                    this._connectEvent = new utils_1.Event();
                    this._managedSessions = [];
                    this.errorEvent.addEventListener(function (error) {
                        if (_this.errorEvent.numberOfListeners === 1)
                            console.error(error);
                    });
                    this.manager.errorEvent.addEventListener(function (error) {
                        _this.errorEvent.raiseEvent(error);
                    });
                    Object.freeze(this);
                }
                Object.defineProperty(SessionService.prototype, "connectEvent", {
                    /**
                     * An event that is raised when a managed session is opened.
                     */
                    get: function () {
                        return this._connectEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(SessionService.prototype, "managedSessions", {
                    /**
                     * Manager-only. A collection of ports for the sessions managed by this session.
                     */
                    get: function () {
                        this.ensureIsManager();
                        return this._managedSessions;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Establishes a connection with the manager.
                 * Called internally by the composition root (ArgonSystem).
                 */
                SessionService.prototype.connect = function () {
                    if (this.connectService && this.connectService.connect) {
                        this.connectService.connect(this);
                    }
                    else {
                        console.warn('Argon: Unable to connect to a manager session; a connect service is not available');
                    }
                };
                /**
                 * Manager-only. Creates a session port that is managed by this service.
                 * Session ports that are managed will automatically
                 * forward open events to this.sessionConnectEvent and error
                 * events to this.errorEvent. Other services are likely to add
                 * message handlers to the newly connected port.
                 * @return a new SessionPort instance
                 */
                SessionService.prototype.addManagedSessionPort = function () {
                    var _this = this;
                    this.ensureIsManager();
                    var session = this.sessionPortFactory.create();
                    session.errorEvent.addEventListener(function (error) {
                        _this.errorEvent.raiseEvent(error);
                    });
                    session.connectEvent.addEventListener(function () {
                        _this.managedSessions.push(session);
                        _this.connectEvent.raiseEvent(session);
                    });
                    session.closeEvent.addEventListener(function () {
                        var index = _this.managedSessions.indexOf(session);
                        if (index > -1)
                            _this.managedSessions.splice(index, 1);
                    });
                    return session;
                };
                /**
                 * Creates a session port that is not managed by this service.
                 * Unmanaged session ports will not forward any events to
                 * this object.
                 * @return a new SessionPort instance
                 */
                SessionService.prototype.createSessionPort = function () {
                    return this.sessionPortFactory.create();
                };
                /**
                 * Creates a message channel.
                 * @return a new MessageChannel instance
                 */
                SessionService.prototype.createMessageChannel = function () {
                    return this.messageChannelFactory.create();
                };
                /**
                 * Creates a synchronous message channel.
                 * @return a new SynchronousMessageChannel instance
                 */
                SessionService.prototype.createSynchronousMessageChannel = function () {
                    return this.messageChannelFactory.createSynchronous();
                };
                Object.defineProperty(SessionService.prototype, "isManager", {
                    /**
                     * Returns true if this session is the Manager
                     */
                    get: function () {
                        return this.configuration.role === common_1.Role.MANAGER;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SessionService.prototype, "isApplication", {
                    /**
                     * Returns true if this session is an Application, meaning,
                     * it is running within a Manager.
                     */
                    get: function () {
                        return this.configuration.role === common_1.Role.APPLICATION;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SessionService.prototype, "isRealityView", {
                    /**
                     * Returns true if this session is a Reality View
                     */
                    get: function () {
                        return this.configuration.role === common_1.Role.REALITY_VIEW;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Throws an error if this session is not a manager
                 */
                SessionService.prototype.ensureIsManager = function () {
                    if (!this.isManager)
                        throw new Error('An manager-only API was accessed in a non-manager session.');
                };
                /**
                 * Throws an error if this session is not a reality
                 */
                SessionService.prototype.ensureIsReality = function () {
                    if (!this.isRealityView)
                        throw new Error('An reality-only API was accessed in a non-reality session.');
                };
                /**
                 * Throws an error if this session is a reality
                 */
                SessionService.prototype.ensureNotReality = function () {
                    if (this.isRealityView)
                        throw new Error('An non-reality API was accessed in a reality session.');
                };
                SessionService = __decorate([
                    aurelia_dependency_injection_1.inject('config', ConnectService, SessionPortFactory, utils_1.MessageChannelFactory)
                ], SessionService);
                return SessionService;
            }());
            exports_1("SessionService", SessionService);
            /**
             * Connect this session to itself as the manager.
             */
            LoopbackConnectService = (function (_super) {
                __extends(LoopbackConnectService, _super);
                function LoopbackConnectService() {
                    _super.apply(this, arguments);
                }
                /**
                 * Create a loopback connection.
                 * @param sessionService The session service instance.
                 */
                LoopbackConnectService.prototype.connect = function (sessionService) {
                    var messageChannel = sessionService.createSynchronousMessageChannel();
                    var messagePort = messageChannel.port1;
                    messageChannel.port2.onmessage = function (evt) {
                        messageChannel.port2.postMessage(evt.data);
                    };
                    sessionService.manager.connectEvent.addEventListener(function () {
                        sessionService.connectEvent.raiseEvent(sessionService.manager);
                    });
                    sessionService.manager.open(messagePort, sessionService.configuration);
                };
                return LoopbackConnectService;
            }(ConnectService));
            exports_1("LoopbackConnectService", LoopbackConnectService);
            /**
             * Connect this session to the manager via the parent document (assuming this system is running in an iFrame).
             */
            DOMConnectService = (function (_super) {
                __extends(DOMConnectService, _super);
                function DOMConnectService() {
                    _super.apply(this, arguments);
                }
                /**
                  * Check whether this connect method is available or not.
                  * @return true if this method is availble, otherwise false
                  */
                DOMConnectService.isAvailable = function () {
                    return typeof window !== 'undefined' && typeof window.parent !== 'undefined';
                };
                /**
                 * Connect to the manager.
                 * @param sessionService The session service instance.
                 */
                DOMConnectService.prototype.connect = function (sessionService) {
                    var messageChannel = sessionService.createMessageChannel();
                    var postMessagePortToParent = function () { return window.parent.postMessage({ type: 'ARGON_SESSION' }, '*', [messageChannel.port1]); };
                    if (document.readyState === 'complete')
                        postMessagePortToParent();
                    else
                        document.addEventListener('load', postMessagePortToParent);
                    sessionService.manager.open(messageChannel.port2, sessionService.configuration);
                };
                return DOMConnectService;
            }(ConnectService));
            exports_1("DOMConnectService", DOMConnectService);
            /**
             * Connect this system to a remote manager for debugging.
             */
            DebugConnectService = (function (_super) {
                __extends(DebugConnectService, _super);
                function DebugConnectService() {
                    _super.apply(this, arguments);
                }
                /**
                 * Check whether this connect method is available or not.
                 * @return true if this method is availble, otherwise false
                 */
                DebugConnectService.isAvailable = function () {
                    return typeof window !== 'undefined' &&
                        !!window['__ARGON_DEBUG_PORT__'];
                };
                /**
                 * Connect to the manager.
                 * @param sessionService The session service instance.
                 */
                DebugConnectService.prototype.connect = function (_a) {
                    var manager = _a.manager, configuration = _a.configuration;
                    manager.open(window['__ARGON_DEBUG_PORT__'], configuration);
                };
                return DebugConnectService;
            }(ConnectService));
            exports_1("DebugConnectService", DebugConnectService);
            /**
             * A service which connects this system to the manager via a WKWebview message handler.
             */
            WKWebViewConnectService = (function (_super) {
                __extends(WKWebViewConnectService, _super);
                function WKWebViewConnectService() {
                    _super.apply(this, arguments);
                }
                /**
                 * Check whether this connect method is available or not.
                 * @return true if this method is availble, otherwise false
                 */
                WKWebViewConnectService.isAvailable = function () {
                    return typeof window !== 'undefined' &&
                        window['webkit'] && window['webkit'].messageHandlers;
                };
                /**
                 * Connect to the manager.
                 * @param sessionService The session service instance.
                 */
                WKWebViewConnectService.prototype.connect = function (sessionService) {
                    var messageChannel = sessionService.createSynchronousMessageChannel();
                    messageChannel.port2.onmessage = function (event) {
                        webkit.messageHandlers.argon.postMessage(JSON.stringify(event.data));
                    };
                    window['__ARGON_PORT__'] = messageChannel.port2;
                    sessionService.manager.open(messageChannel.port1, sessionService.configuration);
                    window.addEventListener("beforeunload", function () {
                        sessionService.manager.close();
                    });
                };
                return WKWebViewConnectService;
            }(ConnectService));
            exports_1("WKWebViewConnectService", WKWebViewConnectService);
        }
    }
});
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

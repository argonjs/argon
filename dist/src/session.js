System.register(['./cesium/cesium-imports.ts', 'aurelia-dependency-injection', './utils.ts'], function(exports_1, context_1) {
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
    var cesium_imports_ts_1, aurelia_dependency_injection_1, utils_ts_1;
    var Role, SessionFactory, MessageEventLike, MessageChannelLike, MessageChannelFactory, Session, ConnectService, LoopbackConnectService, DOMConnectService, DebugConnectService, WKWebViewConnectService;
    return {
        setters:[
            function (cesium_imports_ts_1_1) {
                cesium_imports_ts_1 = cesium_imports_ts_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (utils_ts_1_1) {
                utils_ts_1 = utils_ts_1_1;
            }],
        execute: function() {
            /*
            * Describes the role of a Session
            */
            (function (Role) {
                Role[Role["APPLICATION"] = "Application"] = "APPLICATION";
                Role[Role["REALITY"] = "Reality"] = "REALITY";
                Role[Role["MANAGER"] = "Manager"] = "MANAGER";
            })(Role || (Role = {}));
            exports_1("Role", Role);
            SessionFactory = (function () {
                function SessionFactory() {
                }
                SessionFactory.prototype.create = function () {
                    return new Session();
                };
                return SessionFactory;
            }());
            exports_1("SessionFactory", SessionFactory);
            MessageEventLike = (function () {
                function MessageEventLike(data) {
                    this.data = data;
                }
                return MessageEventLike;
            }());
            exports_1("MessageEventLike", MessageEventLike);
            MessageChannelLike = (function () {
                function MessageChannelLike() {
                    var messageChannel = this;
                    var _portsOpen = true;
                    var _port1ready;
                    var _port2ready;
                    var _port1onmessage;
                    _port1ready = new Promise(function (resolve, reject) {
                        messageChannel.port1 = {
                            set onmessage(func) {
                                _port1onmessage = func;
                                resolve();
                            },
                            get onmessage() {
                                return _port1onmessage;
                            },
                            postMessage: function (data) {
                                _port2ready.then(function () {
                                    if (_portsOpen)
                                        messageChannel.port2.onmessage({ data: data });
                                });
                            },
                            close: function () {
                                _portsOpen = false;
                            }
                        };
                    });
                    var _port2onmessage;
                    _port2ready = new Promise(function (resolve, reject) {
                        messageChannel.port2 = {
                            set onmessage(func) {
                                _port2onmessage = func;
                                resolve();
                            },
                            get onmessage() {
                                return _port2onmessage;
                            },
                            postMessage: function (data) {
                                _port1ready.then(function () {
                                    if (_portsOpen)
                                        messageChannel.port1.onmessage({ data: data });
                                });
                            },
                            close: function () {
                                _portsOpen = false;
                            }
                        };
                    });
                }
                return MessageChannelLike;
            }());
            exports_1("MessageChannelLike", MessageChannelLike);
            MessageChannelFactory = (function () {
                function MessageChannelFactory() {
                }
                MessageChannelFactory.prototype.create = function () {
                    if (typeof MessageChannel !== 'undefined')
                        return new MessageChannel();
                    else
                        return new MessageChannelLike();
                };
                return MessageChannelFactory;
            }());
            exports_1("MessageChannelFactory", MessageChannelFactory);
            Session = (function () {
                function Session() {
                    var _this = this;
                    this.openEvent = new utils_ts_1.Event();
                    this.focusEvent = new utils_ts_1.Event();
                    this.closeEvent = new utils_ts_1.Event();
                    this.errorEvent = new utils_ts_1.Event();
                    this.on = {};
                    this._isOpened = false;
                    this._isClosed = false;
                    this._receivedOpenMessage = false;
                    this.on[Session.OPEN] = function (info) {
                        _this.info = info;
                        _this.openEvent.raiseEvent(null);
                    };
                    this.on[Session.CLOSE] = function (message) {
                        _this.close();
                    };
                    this.on[Session.ERROR] = function (error) {
                        _this.errorEvent.raiseEvent(new Error(error.message));
                    };
                    this.errorEvent.addEventListener(function (error) {
                        if (_this.errorEvent.numberOfListeners === 1)
                            console.error(error);
                    });
                }
                Session.prototype.open = function (messagePort, options) {
                    var _this = this;
                    this.messagePort = messagePort;
                    if (this._isOpened || this._isClosed)
                        throw new Error('Session.open: Session can only be opened once');
                    this._isOpened = true;
                    // options.role = this.role;
                    this.send(Session.OPEN, options);
                    this.messagePort.onmessage = function (evt) {
                        if (_this._isClosed)
                            return;
                        var id = evt.data[0];
                        var topic = evt.data[1];
                        var message = evt.data[2];
                        var expectsResponse = evt.data[3];
                        var handler = _this.on[topic];
                        if (handler && !expectsResponse) {
                            handler(message, evt);
                        }
                        else if (handler) {
                            Promise.resolve(handler(message, evt)).then(function (response) {
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
                                _this.send(topic + ':reject:' + id, { errorMessage: errorMessage });
                            });
                        }
                        else {
                            var error = { message: 'Unable to handle message ' + topic };
                            _this.send(Session.ERROR, error);
                            throw new Error('No handlers are available for topic ' + topic);
                        }
                    };
                };
                Session.prototype.send = function (topic, message) {
                    if (!this._isOpened)
                        throw new Error('Session must be open to send messages');
                    if (this._isClosed)
                        return false;
                    var id = cesium_imports_ts_1.createGuid();
                    this.messagePort.postMessage([id, topic, message]);
                    return true;
                };
                Session.prototype.sendError = function (errorMessage) {
                    return this.send(Session.ERROR, errorMessage);
                };
                Session.prototype.request = function (topic, message) {
                    var _this = this;
                    if (!this._isOpened || this._isClosed)
                        return Promise.reject(new Error('Session must be open to make requests'));
                    var id = cesium_imports_ts_1.createGuid();
                    var resolveTopic = topic + ':resolve:' + id;
                    var rejectTopic = topic + ':reject:' + id;
                    this.messagePort.postMessage([id, topic, message, true]);
                    return new Promise(function (resolve, reject) {
                        _this.on[resolveTopic] = function (message) {
                            delete _this.on[resolveTopic];
                            delete _this.on[rejectTopic];
                            resolve(message);
                        };
                        _this.on[rejectTopic] = function (message) {
                            delete _this.on[resolveTopic];
                            delete _this.on[rejectTopic];
                            reject(message);
                        };
                    });
                };
                Session.prototype.focus = function () {
                    this.focusEvent.raiseEvent(null);
                };
                Session.prototype.close = function () {
                    if (this._isClosed)
                        return;
                    if (this._isOpened) {
                        this.send(Session.CLOSE);
                    }
                    this._isClosed = true;
                    if (this.messagePort && this.messagePort.close)
                        this.messagePort.close();
                    this.closeEvent.raiseEvent(null);
                };
                Session.OPEN = 'ar.session.open';
                Session.CLOSE = 'ar.session.close';
                Session.ERROR = 'ar.session.error';
                return Session;
            }());
            exports_1("Session", Session);
            ConnectService = (function () {
                function ConnectService() {
                }
                ConnectService.prototype.connect = function (session) { };
                return ConnectService;
            }());
            exports_1("ConnectService", ConnectService);
            LoopbackConnectService = (function (_super) {
                __extends(LoopbackConnectService, _super);
                function LoopbackConnectService(config, messageChannelFactory) {
                    _super.call(this);
                    this.config = config;
                    this.messageChannelFactory = messageChannelFactory;
                }
                LoopbackConnectService.prototype.connect = function (session) {
                    var messageChannel = this.messageChannelFactory.create();
                    var messagePort = messageChannel.port1;
                    messageChannel.port2.onmessage = function (evt) {
                        messageChannel.port2.postMessage(evt.data);
                    };
                    session.open(messagePort, this.config);
                };
                LoopbackConnectService = __decorate([
                    aurelia_dependency_injection_1.inject('config', MessageChannelFactory)
                ], LoopbackConnectService);
                return LoopbackConnectService;
            }(ConnectService));
            exports_1("LoopbackConnectService", LoopbackConnectService);
            DOMConnectService = (function (_super) {
                __extends(DOMConnectService, _super);
                function DOMConnectService(config, messageChannelFactory) {
                    _super.call(this);
                    this.config = config;
                    this.messageChannelFactory = messageChannelFactory;
                }
                DOMConnectService.isAvailable = function () {
                    return typeof window !== 'undefined' && typeof window.parent !== 'undefined';
                };
                DOMConnectService.prototype.connect = function (session) {
                    var messageChannel = this.messageChannelFactory.create();
                    var postMessagePortToParent = function () { return window.parent.postMessage({ type: 'ARGON_SESSION' }, '*', [messageChannel.port1]); };
                    if (document.readyState === 'complete')
                        postMessagePortToParent();
                    else
                        document.addEventListener('load', postMessagePortToParent);
                    session.open(messageChannel.port2, this.config);
                };
                DOMConnectService = __decorate([
                    aurelia_dependency_injection_1.inject('config', MessageChannelFactory)
                ], DOMConnectService);
                return DOMConnectService;
            }(ConnectService));
            exports_1("DOMConnectService", DOMConnectService);
            DebugConnectService = (function (_super) {
                __extends(DebugConnectService, _super);
                function DebugConnectService(config, messageChannelFactory) {
                    _super.call(this);
                    this.config = config;
                    this.messageChannelFactory = messageChannelFactory;
                }
                DebugConnectService.isAvailable = function () {
                    return typeof window !== 'undefined' &&
                        !!window['__ARGON_DEBUG_PORT__'];
                };
                DebugConnectService.prototype.connect = function (session) {
                    session.open(window['__ARGON_DEBUG_PORT__'], this.config);
                };
                DebugConnectService = __decorate([
                    aurelia_dependency_injection_1.inject('config', MessageChannelFactory)
                ], DebugConnectService);
                return DebugConnectService;
            }(ConnectService));
            exports_1("DebugConnectService", DebugConnectService);
            WKWebViewConnectService = (function (_super) {
                __extends(WKWebViewConnectService, _super);
                function WKWebViewConnectService(config, messageChannelFactory) {
                    _super.call(this);
                    this.config = config;
                    this.messageChannelFactory = messageChannelFactory;
                }
                WKWebViewConnectService.isAvailable = function () {
                    return typeof window !== 'undefined' &&
                        window['webkit'] && window['webkit'].messageHandlers;
                };
                WKWebViewConnectService.prototype.connect = function (session) {
                    var messageChannel = this.messageChannelFactory.create();
                    messageChannel.port2.onmessage = function (event) {
                        webkit.messageHandlers.argon.postMessage(JSON.stringify(event.data));
                    };
                    window['__ARGON_PORT__'] = messageChannel.port2;
                    session.open(messageChannel.port1, this.config);
                    window.addEventListener("beforeunload", function () {
                        session.close();
                    });
                };
                WKWebViewConnectService = __decorate([
                    aurelia_dependency_injection_1.inject('config', MessageChannelFactory)
                ], WKWebViewConnectService);
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

System.register(['aurelia-dependency-injection', '../session', '../reality', '../view'], function(exports_1, context_1) {
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
    var aurelia_dependency_injection_1, session_1, reality_1, view_1;
    var HostedRealityLoader;
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (reality_1_1) {
                reality_1 = reality_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            }],
        execute: function() {
            HostedRealityLoader = (function (_super) {
                __extends(HostedRealityLoader, _super);
                function HostedRealityLoader(sessionService, viewService) {
                    _super.call(this);
                    this.sessionService = sessionService;
                    this.viewService = viewService;
                    this.type = 'hosted';
                    this.iframeElement = document.createElement('iframe');
                    this.iframeElement.style.border = '0';
                    this.iframeElement.width = '100%';
                    this.iframeElement.height = '100%';
                    viewService.element.insertBefore(this.iframeElement, viewService.element.firstChild);
                }
                HostedRealityLoader.prototype.load = function (reality, callback) {
                    var _this = this;
                    var handleConnectMessage = function (ev) {
                        if (ev.data.type !== 'ARGON_SESSION')
                            return;
                        var messagePort = ev.ports && ev.ports[0];
                        if (!messagePort)
                            throw new Error('Received an ARGON_SESSION message without a MessagePort object');
                        // get the event.source iframe
                        var i = 0;
                        var frame;
                        while (i < window.frames.length && !frame) {
                            if (window.frames[i] == ev.source)
                                frame = document.getElementsByTagName('iframe')[i];
                        }
                        if (frame !== _this.iframeElement)
                            return;
                        window.removeEventListener('message', handleConnectMessage);
                        var realitySession = _this.sessionService.addManagedSessionPort();
                        callback(realitySession);
                        realitySession.open(messagePort, _this.sessionService.configuration);
                    };
                    window.addEventListener('message', handleConnectMessage);
                    this.iframeElement.src = '';
                    this.iframeElement.src = reality['url'];
                };
                HostedRealityLoader.prototype._handleMessage = function (ev) {
                };
                HostedRealityLoader = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, view_1.ViewService)
                ], HostedRealityLoader);
                return HostedRealityLoader;
            }(reality_1.RealityLoader));
            exports_1("HostedRealityLoader", HostedRealityLoader);
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
//# sourceMappingURL=hosted.js.map
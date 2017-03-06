System.register(["aurelia-dependency-injection", "../common", "../session", "../reality", "../vuforia"], function (exports_1, context_1) {
    "use strict";
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
    var __moduleName = context_1 && context_1.id;
    var aurelia_dependency_injection_1, common_1, session_1, reality_1, vuforia_1, LiveVideoRealityLoader;
    return {
        setters: [
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (reality_1_1) {
                reality_1 = reality_1_1;
            },
            function (vuforia_1_1) {
                vuforia_1 = vuforia_1_1;
            }
        ],
        execute: function () {
            LiveVideoRealityLoader = (function (_super) {
                __extends(LiveVideoRealityLoader, _super);
                function LiveVideoRealityLoader(sessionService, vuforiaDelegate) {
                    var _this = _super.call(this) || this;
                    _this.sessionService = sessionService;
                    _this.vuforiaDelegate = vuforiaDelegate;
                    _this.type = 'live-video';
                    return _this;
                }
                LiveVideoRealityLoader.prototype.load = function (reality, callback) {
                    var _this = this;
                    var realitySession = this.sessionService.addManagedSessionPort(reality.uri);
                    var remoteRealitySession = this.sessionService.createSessionPort();
                    remoteRealitySession.on['ar.context.update'] = function () { };
                    remoteRealitySession.connectEvent.addEventListener(function () {
                        var remove = _this.vuforiaDelegate.stateUpdateEvent.addEventListener(function (frameState) {
                            remoteRealitySession.send('ar.reality.frameState', frameState);
                        });
                        _this.vuforiaDelegate.videoEnabled = true;
                        _this.vuforiaDelegate.trackingEnabled = true;
                        remoteRealitySession.closeEvent.addEventListener(function () {
                            remove();
                            _this.vuforiaDelegate.videoEnabled = false;
                            _this.vuforiaDelegate.trackingEnabled = false;
                        });
                    });
                    callback(realitySession);
                    // Only connect after the caller is able to attach connectEvent handlers
                    var messageChannel = this.sessionService.createSynchronousMessageChannel();
                    realitySession.open(messageChannel.port1, this.sessionService.configuration);
                    remoteRealitySession.open(messageChannel.port2, { role: common_1.Role.REALITY_VIEW });
                };
                return LiveVideoRealityLoader;
            }(reality_1.RealityLoader));
            LiveVideoRealityLoader = __decorate([
                aurelia_dependency_injection_1.inject(session_1.SessionService, vuforia_1.VuforiaServiceDelegate)
            ], LiveVideoRealityLoader);
            exports_1("LiveVideoRealityLoader", LiveVideoRealityLoader);
        }
    };
});

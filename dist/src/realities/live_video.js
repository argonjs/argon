System.register(['aurelia-dependency-injection', '../common', '../session', '../vuforia'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, common_1, session_1, vuforia_1;
    var LiveVideoRealityLoader;
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (vuforia_1_1) {
                vuforia_1 = vuforia_1_1;
            }],
        execute: function() {
            LiveVideoRealityLoader = (function () {
                function LiveVideoRealityLoader(sessionService, vuforiaDelegate) {
                    this.sessionService = sessionService;
                    this.vuforiaDelegate = vuforiaDelegate;
                    this.type = 'live-video';
                }
                LiveVideoRealityLoader.prototype.load = function (reality) {
                    var _this = this;
                    var realitySession = this.sessionService.addManagedSessionPort();
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
                    var messageChannel = this.sessionService.createSynchronousMessageChannel();
                    realitySession.open(messageChannel.port1, this.sessionService.configuration);
                    remoteRealitySession.open(messageChannel.port2, { role: common_1.Role.REALITY_VIEW, name: 'live_video' });
                    return realitySession;
                };
                LiveVideoRealityLoader = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, vuforia_1.VuforiaServiceDelegate)
                ], LiveVideoRealityLoader);
                return LiveVideoRealityLoader;
            }());
            exports_1("LiveVideoRealityLoader", LiveVideoRealityLoader);
        }
    }
});

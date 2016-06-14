System.register(['aurelia-dependency-injection', '../cesium/cesium-imports', '../common', '../session', '../device', '../timer', '../utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, common_1, session_1, device_1, timer_1, utils_1;
    var EmptyRealityLoader;
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (cesium_imports_1_1) {
                cesium_imports_1 = cesium_imports_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (device_1_1) {
                device_1 = device_1_1;
            },
            function (timer_1_1) {
                timer_1 = timer_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            EmptyRealityLoader = (function () {
                function EmptyRealityLoader(sessionService, deviceService, timer) {
                    this.sessionService = sessionService;
                    this.deviceService = deviceService;
                    this.timer = timer;
                    this.type = 'empty';
                }
                EmptyRealityLoader.prototype.load = function (reality) {
                    var _this = this;
                    var realitySession = this.sessionService.addManagedSessionPort();
                    var remoteRealitySession = this.sessionService.createSessionPort();
                    var doUpdate = true;
                    remoteRealitySession.connectEvent.addEventListener(function () {
                        var update = function (time, index) {
                            if (doUpdate) {
                                _this.deviceService.update();
                                var w = document.documentElement.clientWidth;
                                var h = document.documentElement.clientHeight;
                                var frameState = {
                                    time: time,
                                    index: index,
                                    view: {
                                        viewport: {
                                            x: 0,
                                            y: 0,
                                            width: w,
                                            height: h
                                        },
                                        pose: utils_1.getSerializedEntityPose(_this.deviceService.interfaceEntity, time),
                                        subviews: [
                                            {
                                                type: common_1.SubviewType.SINGULAR,
                                                projectionMatrix: cesium_imports_1.Matrix4.computePerspectiveFieldOfView(Math.PI / 3, w / h, 0.2, 10000000000, [])
                                            }
                                        ]
                                    }
                                };
                                remoteRealitySession.send('ar.reality.frameState', frameState);
                                _this.timer.requestFrame(update);
                            }
                        };
                        _this.timer.requestFrame(update);
                    });
                    remoteRealitySession.closeEvent.addEventListener(function () {
                        doUpdate = false;
                    });
                    var messageChannel = this.sessionService.createSynchronousMessageChannel();
                    realitySession.open(messageChannel.port1, this.sessionService.configuration);
                    remoteRealitySession.open(messageChannel.port2, { role: common_1.Role.REALITY_VIEW, name: 'empty' });
                    return realitySession;
                };
                EmptyRealityLoader = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, device_1.DeviceService, timer_1.TimerService)
                ], EmptyRealityLoader);
                return EmptyRealityLoader;
            }());
            exports_1("EmptyRealityLoader", EmptyRealityLoader);
        }
    }
});

System.register(['aurelia-dependency-injection', '../common', '../session', '../device', '../reality', '../view', '../vuforia', '../utils'], function(exports_1, context_1) {
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
    var aurelia_dependency_injection_1, common_1, session_1, device_1, reality_1, view_1, vuforia_1, utils;
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
            function (device_1_1) {
                device_1 = device_1_1;
            },
            function (reality_1_1) {
                reality_1 = reality_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (vuforia_1_1) {
                vuforia_1 = vuforia_1_1;
            },
            function (utils_1) {
                utils = utils_1;
            }],
        execute: function() {
            LiveVideoRealityLoader = (function (_super) {
                __extends(LiveVideoRealityLoader, _super);
                function LiveVideoRealityLoader(sessionService, vuforiaDelegate, viewService, deviceService) {
                    var _this = this;
                    _super.call(this);
                    this.sessionService = sessionService;
                    this.vuforiaDelegate = vuforiaDelegate;
                    this.viewService = viewService;
                    this.deviceService = deviceService;
                    this.type = 'live-video';
                    if (typeof document !== 'undefined') {
                        this.fovSlider = document.createElement('input');
                        this.fovSlider.type = 'range';
                        this.fovSlider.min = '0';
                        this.fovSlider.max = '179';
                        this.fovSlider.value = '90';
                        this.fovSlider.step = '1';
                        this.fovSlider.style.position = 'absolute;';
                        this.fovSlider.addEventListener('change', function (event) {
                            _this.videoFov = Number.parseInt(_this.fovSlider.value) * Math.PI / 180;
                        });
                        this.videoFov = Number.parseInt(this.fovSlider.value) * Math.PI / 180;
                        this.viewService.containingElementPromise.then(function (container) {
                            container.insertBefore(_this.fovSlider, container.firstChild);
                        });
                        this.videoElement = document.createElement('video');
                        this.videoElement.style.width = '100%';
                        this.videoElement.style.height = 'height:100%';
                        this.videoElement.controls = false;
                        this.videoElement.autoplay = true;
                        this.viewService.containingElementPromise.then(function (container) {
                            container.insertBefore(_this.videoElement, container.firstChild);
                        });
                        this.canvas = document.createElement('canvas');
                        this.context = this.canvas.getContext('2d');
                    }
                }
                LiveVideoRealityLoader.prototype.load = function (reality, callback) {
                    var _this = this;
                    var realitySession = this.sessionService.addManagedSessionPort(reality.uri);
                    var remoteRealitySession = this.sessionService.createSessionPort();
                    remoteRealitySession.on['ar.context.update'] = function () { };
                    remoteRealitySession.connectEvent.addEventListener(function () {
                        if (_this.videoElement) {
                            var videoElement_1 = _this.videoElement;
                            var mediaDevices = navigator.mediaDevices;
                            var getUserMedia = (mediaDevices.getUserMedia || mediaDevices['mozGetUserMedia'] ||
                                mediaDevices['msGetUserMedia'] || mediaDevices['webkitGetUserMedia']).bind(mediaDevices);
                            getUserMedia({ audio: false, video: true }).then(function (videoStream) {
                                videoElement_1.src = window.URL.createObjectURL(videoStream);
                            }).catch(function (error) {
                                remoteRealitySession.errorEvent.raiseEvent(error);
                            });
                            var deviceService_1 = _this.deviceService;
                            var lastFrameTime_1 = -1;
                            var update_1 = function (time) {
                                if (realitySession.isConnected)
                                    _this.deviceService.requestFrame(update_1);
                                if (videoElement_1.currentTime != lastFrameTime_1) {
                                    lastFrameTime_1 = videoElement_1.currentTime;
                                    // const videoWidth = videoElement.videoWidth;
                                    // const videoHeight = videoElement.videoHeight;
                                    var viewState = {
                                        time: time,
                                        pose: utils.getSerializedEntityPose(deviceService_1.eye, time),
                                        geolocationAccuracy: deviceService_1.geolocationAccuracy,
                                        altitudeAccuracy: deviceService_1.altitudeAccuracy,
                                        compassAccuracy: deviceService_1.compassAccuracy,
                                        viewport: deviceService_1.viewport,
                                        subviews: deviceService_1.subviews
                                    };
                                    remoteRealitySession.send('ar.reality.viewState', viewState);
                                }
                            };
                            _this.deviceService.requestFrame(update_1);
                        }
                        _this.vuforiaDelegate.videoEnabled = true;
                        _this.vuforiaDelegate.trackingEnabled = true;
                        var remove = _this.vuforiaDelegate.stateUpdateEvent.addEventListener(function (viewState) {
                            remoteRealitySession.send('ar.reality.viewState', viewState);
                        });
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
                    remoteRealitySession.open(messageChannel.port2, { role: common_1.Role.REALITY_VIEWER });
                };
                LiveVideoRealityLoader.isAvailable = function () {
                    if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
                        var mediaDevices = navigator.mediaDevices;
                        return !!(mediaDevices.getUserMedia || mediaDevices['mozGetUserMedia'] || mediaDevices['msGetUserMedia'] || mediaDevices['webkitGetUserMedia']);
                    }
                    else {
                        return false;
                    }
                };
                LiveVideoRealityLoader.prototype.getVideoFrame = function (x, y, width, height) {
                    this.canvas.width = this.videoElement.videoWidth;
                    this.canvas.height = this.videoElement.videoHeight;
                    this.context.drawImage(this.videoElement, 0, 0, this.canvas.width, this.canvas.height);
                    return this.context.getImageData(x, y, width, height);
                };
                LiveVideoRealityLoader = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, vuforia_1.VuforiaServiceDelegate, view_1.ViewService, device_1.DeviceService)
                ], LiveVideoRealityLoader);
                return LiveVideoRealityLoader;
            }(reality_1.RealityLoader));
            exports_1("LiveVideoRealityLoader", LiveVideoRealityLoader);
        }
    }
});

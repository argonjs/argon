System.register(['aurelia-dependency-injection', '../common', '../session', '../device', '../timer', '../reality', '../utils', '../view'], function(exports_1, context_1) {
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
    var aurelia_dependency_injection_1, common_1, session_1, device_1, timer_1, reality_1, utils_1, view_1;
    var EmptyRealityLoader;
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
            function (timer_1_1) {
                timer_1 = timer_1_1;
            },
            function (reality_1_1) {
                reality_1 = reality_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            }],
        execute: function() {
            EmptyRealityLoader = (function (_super) {
                __extends(EmptyRealityLoader, _super);
                function EmptyRealityLoader(sessionService, deviceService, viewService, timer) {
                    var _this = this;
                    _super.call(this);
                    this.sessionService = sessionService;
                    this.deviceService = deviceService;
                    this.viewService = viewService;
                    this.timer = timer;
                    this.type = 'empty';
                    this.viewService.containingElementPromise.then(function (el) {
                        var fov = -1;
                        if (typeof PointerEvent !== 'undefined') {
                            var evCache_1 = new Array();
                            var startDistSquared_1 = -1;
                            var zoom_1 = 1;
                            var remove_event_1 = function (ev) {
                                // Remove this event from the target's cache
                                for (var i = 0; i < evCache_1.length; i++) {
                                    if (evCache_1[i].pointerId == ev.pointerId) {
                                        evCache_1.splice(i, 1);
                                        break;
                                    }
                                }
                            };
                            var pointerdown_handler = function (ev) {
                                // The pointerdown event signals the start of a touch interaction.
                                // This event is cached to support 2-finger gestures
                                evCache_1.push(ev);
                            };
                            var pointermove_handler = function (ev) {
                                // This function implements a 2-pointer pinch/zoom gesture. 
                                // Find this event in the cache and update its record with this event
                                for (var i = 0; i < evCache_1.length; i++) {
                                    if (ev.pointerId == evCache_1[i].pointerId) {
                                        evCache_1[i] = ev;
                                        break;
                                    }
                                }
                                var state = _this.contextService.serializedFrameState;
                                if (!state)
                                    return;
                                // If two pointers are down, check for pinch gestures
                                if (evCache_1.length == 2) {
                                    // Calculate the distance between the two pointers
                                    var curDiffX = Math.abs(evCache_1[0].clientX - evCache_1[1].clientX);
                                    var curDiffY = Math.abs(evCache_1[0].clientY - evCache_1[1].clientY);
                                    var currDistSquared = curDiffX * curDiffX + curDiffY * curDiffY;
                                    if (startDistSquared_1 == -1) {
                                        // start pinch
                                        startDistSquared_1 = currDistSquared;
                                        fov = state.view.subviews[0].frustum.fov;
                                        zoom_1 = 1;
                                        _this.deviceService.zoom({ zoom: zoom_1, fov: fov, state: ZoomState.START });
                                    }
                                    else {
                                        // change pinch
                                        zoom_1 = currDistSquared / startDistSquared_1;
                                        _this.deviceService.zoom({ zoom: zoom_1, fov: fov, state: ZoomState.CHANGE });
                                    }
                                }
                                else {
                                    // end pinch                            
                                    _this.deviceService.zoom({ zoom: zoom_1, fov: fov, state: ZoomState.END });
                                    startDistSquared_1 = -1;
                                }
                            };
                            var pointerup_handler = function (ev) {
                                // Remove this pointer from the cache
                                remove_event_1(ev);
                                // If the number of pointers down is less than two then reset diff tracker
                                if (evCache_1.length < 2)
                                    startDistSquared_1 = -1;
                            };
                            el.onpointerdown = pointerdown_handler;
                            el.onpointermove = pointermove_handler;
                            // Use same handler for pointer{up,cancel,out,leave} events since
                            // the semantics for these events - in this app - are the same.
                            el.onpointerup = pointerup_handler;
                            el.onpointercancel = pointerup_handler;
                            el.onpointerout = pointerup_handler;
                            el.onpointerleave = pointerup_handler;
                        }
                        else {
                            el.addEventListener('gesturestart', function (ev) {
                                var state = _this.contextService.serializedFrameState;
                                if (state && state.view.subviews[0]) {
                                    fov = state.view.subviews[0].frustum.fov;
                                    _this.deviceService.zoom({ zoom: ev.scale, fov: fov, state: ZoomState.START });
                                }
                                ev.preventDefault();
                            });
                            el.addEventListener('gesturechange', function (ev) {
                                _this.deviceService.zoom({ zoom: ev.scale, fov: fov, state: ZoomState.CHANGE });
                            });
                            el.addEventListener('gestureend', function (ev) {
                                _this.deviceService.zoom({ zoom: ev.scale, fov: fov, state: ZoomState.END });
                            });
                        }
                    });
                }
                EmptyRealityLoader.prototype._enablePinchZoom = function () {
                    this.viewService.element;
                };
                EmptyRealityLoader.prototype._gesturestartListener = function () {
                };
                EmptyRealityLoader.prototype._gesturechnageListener = function () {
                };
                EmptyRealityLoader.prototype._gestureendListener = function () {
                };
                EmptyRealityLoader.prototype.load = function (reality, callback) {
                    var _this = this;
                    var realitySession = this.sessionService.addManagedSessionPort(reality.uri);
                    var remoteRealitySession = this.sessionService.createSessionPort();
                    var doUpdate = true;
                    removeRealitySession.on['ar.view.uievent'] = function () { };
                    remoteRealitySession.on['ar.context.update'] = function () { };
                    remoteRealitySession.connectEvent.addEventListener(function () {
                        var update = function (time) {
                            if (doUpdate) {
                                _this.deviceService.update({ orientation: true });
                                var deviceState = _this.deviceService.state;
                                var pose = utils_1.getSerializedEntityPose(_this.deviceService.displayEntity, time);
                                var viewport = deviceState.viewport;
                                var subviews = deviceState.subviews;
                                var locationAccuracy = deviceState.locationAccuracy;
                                var locationAltitudeAccuracy = deviceState.locationAltitudeAccuracy;
                                if (pose) {
                                    var viewState = {
                                        time: time,
                                        pose: pose,
                                        viewport: viewport,
                                        subviews: subviews,
                                        locationAccuracy: locationAccuracy,
                                        locationAltitudeAccuracy: locationAltitudeAccuracy
                                    };
                                    remoteRealitySession.send('ar.reality.viewState', viewState);
                                }
                                _this.timer.requestFrame(update);
                            }
                        };
                        _this.timer.requestFrame(update);
                    });
                    this._enablePinchZoom();
                    remoteRealitySession.closeEvent.addEventListener(function () {
                        doUpdate = false;
                        _this._disablePinchZoom();
                    });
                    callback(realitySession);
                    // Only connect after the caller is able to attach connectEvent handlers
                    var messageChannel = this.sessionService.createSynchronousMessageChannel();
                    realitySession.open(messageChannel.port1, this.sessionService.configuration);
                    remoteRealitySession.open(messageChannel.port2, { role: common_1.Role.REALITY_VIEWER });
                };
                EmptyRealityLoader = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, device_1.DeviceService, view_1.ViewService, timer_1.TimerService)
                ], EmptyRealityLoader);
                return EmptyRealityLoader;
            }(reality_1.RealityLoader));
            exports_1("EmptyRealityLoader", EmptyRealityLoader);
        }
    }
});

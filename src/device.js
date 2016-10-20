System.register(['aurelia-dependency-injection', './cesium/cesium-imports', 'mobile-detect', './common', './context', './session', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, mobile_detect_1, common_1, context_2, session_1, utils_1;
    var scratchCartesian, scratchQuaternion, x90Rot, clock, scratchTime, mobileDetect, DeviceService;
    // Enforce monotonically increasing time, and deal with 
    // clock drift by either slowing down or speeding up,
    // while never going backwards
    function tick() {
        var secondsBeforeTick = clock.currentTime.secondsOfDay;
        clock.tick();
        var secondsAfterTick = clock.currentTime.secondsOfDay;
        var now = cesium_imports_1.JulianDate.now(scratchTime);
        var secondsDrift = cesium_imports_1.JulianDate.secondsDifference(clock.currentTime, now);
        if (secondsDrift > 0.033) {
            var halfTimeStep = (secondsAfterTick - secondsBeforeTick) / 2;
            clock.currentTime.secondsOfDay -= halfTimeStep;
        }
        else if (secondsDrift < 0.5) {
            cesium_imports_1.JulianDate.clone(now, clock.currentTime);
        }
    }
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (cesium_imports_1_1) {
                cesium_imports_1 = cesium_imports_1_1;
            },
            function (mobile_detect_1_1) {
                mobile_detect_1 = mobile_detect_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (context_2_1) {
                context_2 = context_2_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            scratchCartesian = new cesium_imports_1.Cartesian3;
            scratchQuaternion = new cesium_imports_1.Quaternion;
            x90Rot = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_X, cesium_imports_1.CesiumMath.PI_OVER_TWO);
            clock = new cesium_imports_1.Clock();
            scratchTime = new cesium_imports_1.JulianDate(0, 0);
            if (typeof navigator !== 'undefined') {
                mobileDetect = new mobile_detect_1.default(navigator.userAgent);
            }
            /**
            * Provides device state.
            */
            DeviceService = (function () {
                /**
                * Initialize the DeviceService
                */
                function DeviceService(sessionService, contextService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.contextService = contextService;
                    /**
                     * An ENU coordinate frame centered at the device location.
                     * The reference frame of this frame is the FIXED (ECEF) reference frame.
                     */
                    this.locationEntity = this.contextService.entities.add(new cesium_imports_1.Entity({
                        id: 'ar.device.location',
                        name: 'Device Location',
                        position: new cesium_imports_1.ConstantPositionProperty(undefined, cesium_imports_1.ReferenceFrame.FIXED),
                        orientation: new cesium_imports_1.ConstantProperty(undefined)
                    }));
                    /**
                     * A frame which represents the display being used.
                     * The reference frame of this frame is the [[orientationEntity]].
                     */
                    this.displayEntity = this.contextService.entities.add(new cesium_imports_1.Entity({
                        id: 'ar.device.display',
                        name: 'Device Display',
                        position: new cesium_imports_1.ConstantPositionProperty(undefined, this.locationEntity),
                        orientation: new cesium_imports_1.ConstantProperty(undefined)
                    }));
                    /**
                     * The sessions that are subscribed to the device state
                     */
                    this.subscribers = new Set();
                    /**
                     * The sessions that are subscribed to the device location
                     */
                    this.locationSubscribers = new Set();
                    /**
                     * The sessions that are subscribed to the device location
                     */
                    this.poseSubscribers = new Set();
                    this._state = {
                        time: cesium_imports_1.JulianDate.now(),
                        viewport: this.getMaximumViewport(),
                        subviews: [{
                                type: common_1.SubviewType.SINGULAR,
                                frustum: {
                                    fov: Math.PI / 2,
                                }
                            }],
                        locationAccuracy: undefined,
                        locationAltitudeAccuracy: undefined
                    };
                    this._exposedState = common_1.DeviceState.clone(this._state);
                    this._subscriberTimeoutIds = new WeakMap();
                    this.sessionService.manager.on['ar.device.state'] = function (deviceState) {
                        if (_this.sessionService.isRealityManager)
                            return;
                        _this._state = deviceState;
                        contextService.updateEntityFromSerializedPose(_this.locationEntity.id, deviceState.locationPose);
                        // only update orientation from manager if we aren't already fetching it locally
                        if (!_this.vrDisplay) {
                            contextService.updateEntityFromSerializedPose(_this.displayEntity.id, deviceState.displayPose);
                        }
                        var fixedPosition = utils_1.getEntityPositionInReferenceFrame(_this.displayEntity, deviceState.time, cesium_imports_1.ReferenceFrame.FIXED, scratchCartesian);
                        if (fixedPosition) {
                            _this._location = cesium_imports_1.Cartographic.fromCartesian(fixedPosition, undefined, _this._location);
                        }
                        else {
                            _this._location = undefined;
                        }
                    };
                    var checkSubscribers = function () {
                        if (_this.locationSubscribers.size > 0)
                            _this.updateLocation();
                        else
                            _this.stopLocationUpdates();
                        if (_this.poseSubscribers.size > 0)
                            _this.updatePose();
                        else
                            _this.stopPoseUpdates();
                        _this.publishDeviceState();
                    };
                    this.sessionService.connectEvent.addEventListener(function (session) {
                        session.on['ar.device.subscribe'] = function (o) {
                            _this.subscribers.add(session);
                            if (o.location)
                                _this.locationSubscribers.add(session);
                            else
                                _this.locationSubscribers.delete(session);
                            if (o.pose)
                                _this.poseSubscribers.add(session);
                            else
                                _this.poseSubscribers.delete(session);
                            var id = setTimeout(function () {
                                _this.subscribers.delete(session);
                                _this.locationSubscribers.delete(session);
                                _this.poseSubscribers.delete(session);
                                checkSubscribers();
                            }, o.timeout);
                            var previousId = _this._subscriberTimeoutIds.get(session);
                            if (previousId !== undefined)
                                clearTimeout(previousId);
                            _this._subscriberTimeoutIds.set(session, id);
                            checkSubscribers();
                        };
                        // TODO: add a way for apps to say they whether or not they need location
                        if (common_1.Role.isRealityAugmenter(session.info.role)) {
                            _this.locationSubscribers.add(session);
                            _this.poseSubscribers.add(session);
                        }
                        _this.publishDeviceState();
                    });
                    if (this.sessionService.isRealityManager) {
                        this.updatePose();
                        setTimeout(function () {
                            checkSubscribers();
                        }, 10000);
                        if (typeof window !== 'undefined' && window.addEventListener) {
                            var updateInterfaceOrientation_1 = function () {
                                var interfaceOrientationProperty = _this.displayEntity.orientation;
                                var interfaceOrientation = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_Z, (-window.orientation || 0) * cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE, scratchQuaternion);
                                if (mobileDetect && !mobileDetect.mobile()) {
                                    // for laptops, rotate device orientation by 90° around +X so that it 
                                    // corresponds to an upright display rather than the integrated keyboard
                                    interfaceOrientation = cesium_imports_1.Quaternion.multiply(x90Rot, interfaceOrientation, interfaceOrientation);
                                }
                                interfaceOrientationProperty.setValue(interfaceOrientation);
                            };
                            window.addEventListener('resize', function () {
                                _this.state.viewport = _this.getMaximumViewport();
                                updateInterfaceOrientation_1();
                            });
                            window.addEventListener('orientationchange', function () {
                                updateInterfaceOrientation_1();
                            });
                        }
                    }
                }
                Object.defineProperty(DeviceService.prototype, "state", {
                    /**
                     * The current device state
                     */
                    get: function () {
                        return this._exposedState;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DeviceService.prototype, "location", {
                    /**
                     * The current cartographic position
                     */
                    get: function () {
                        return this._location;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DeviceService.prototype, "locationAccuracy", {
                    /**
                     * The radius (in meters) of latitudinal and longitudinal uncertainty,
                     * in relation to the FIXED reference frame.
                     */
                    get: function () {
                        return this.state.locationAccuracy;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DeviceService.prototype, "locationAltitudeAccuracy", {
                    /**
                     * The accuracy of the altitude in meters.
                     */
                    get: function () {
                        return this.state.locationAccuracy;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                * Request device state updates.
                */
                DeviceService.prototype.update = function (o) {
                    this.subscribeToUpdatesIfTimeoutExpired(o);
                    this.updatePoseLocallyIfNecessary(o);
                    this.publishDeviceState();
                    common_1.DeviceState.clone(this._state, this._exposedState);
                };
                /**
                 * Request that the callback function be called for the next frame.
                 * @param callback function
                 */
                DeviceService.prototype.requestFrame = function (callback) {
                    var onFrame = function () {
                        tick();
                        callback(clock.currentTime);
                    };
                    if (this.vrDisplay) {
                        return this.vrDisplay.requestAnimationFrame(onFrame);
                    }
                    else {
                        return utils_1.requestAnimationFrame(onFrame);
                    }
                };
                /**
                 * Get the current system time
                 */
                DeviceService.prototype.getSystemTime = function (result) {
                    tick();
                    return cesium_imports_1.JulianDate.clone(clock.currentTime, result);
                };
                /**
                 * Send device state to subscribers.
                 */
                DeviceService.prototype.publishDeviceState = function () {
                    var deviceState = this._state;
                    var time = deviceState.time;
                    deviceState.displayPose = utils_1.getSerializedEntityPose(this.displayEntity, time, this.locationEntity);
                    if (this.sessionService.isRealityManager) {
                        deviceState.viewport = this.getMaximumViewport();
                        deviceState.locationPose = utils_1.getSerializedEntityPose(this.locationEntity, time, cesium_imports_1.ReferenceFrame.FIXED);
                        this.subscribers.forEach(function (options, session) {
                            session.send('ar.device.state', deviceState);
                        });
                    }
                };
                DeviceService.prototype.updatePoseLocallyIfNecessary = function (o) {
                    if (o && o.pose) {
                        this.updatePose();
                    }
                };
                DeviceService.prototype.subscribeToUpdatesIfTimeoutExpired = function (o) {
                    var _this = this;
                    if (this._subscriptionTimeoutId || !this.sessionService.manager.isConnected)
                        return;
                    o = o || {};
                    o.timeout = o.timeout || 3000;
                    this._subscriptionTimeoutId = setTimeout(function () {
                        _this._subscriptionTimeoutId = undefined;
                        _this.sessionService.manager.send('ar.device.subscribe', o);
                    }, o.timeout * 0.75);
                };
                /**
                 * Returns the maximum allowed viewport
                 */
                DeviceService.prototype.getMaximumViewport = function () {
                    if (typeof document !== 'undefined' && document.documentElement) {
                        return {
                            x: 0,
                            y: 0,
                            width: document.documentElement.clientWidth,
                            height: document.documentElement.clientHeight
                        };
                    }
                    throw new Error("Not implemeneted for the current platform");
                };
                DeviceService.prototype.updateLocation = function () {
                    var _this = this;
                    // defer to the reality manager to get geolocation updates from the device 
                    if (!this.sessionService.isRealityManager || typeof navigator == 'undefined')
                        return;
                    if (!cesium_imports_1.defined(this._geolocationWatchId)) {
                        this._geolocationWatchId = navigator.geolocation.watchPosition(function (pos) {
                            var positionECEF = cesium_imports_1.Cartesian3.fromDegrees(pos.coords.longitude, pos.coords.latitude, pos.coords.altitude || 0, undefined, scratchCartesian);
                            var enuOrientation = cesium_imports_1.Transforms.headingPitchRollQuaternion(positionECEF, 0, 0, 0, undefined, scratchQuaternion);
                            if (_this.locationEntity.position instanceof cesium_imports_1.ConstantPositionProperty) {
                                _this.locationEntity.position.setValue(enuOrientation);
                            }
                            else {
                                _this.locationEntity.orientation = new cesium_imports_1.ConstantProperty(enuOrientation);
                            }
                            if (_this.locationEntity.orientation instanceof cesium_imports_1.ConstantProperty) {
                                _this.locationEntity.orientation.setValue(enuOrientation);
                            }
                            else {
                                _this.locationEntity.orientation = new cesium_imports_1.ConstantProperty(enuOrientation);
                            }
                            _this._state.locationAccuracy = (pos.coords.accuracy > 0) ? pos.coords.accuracy : undefined;
                            _this._state.locationAltitudeAccuracy = pos.coords.altitudeAccuracy || undefined;
                            _this.getSystemTime(_this._state.time);
                            _this.publishDeviceState();
                        }, function (error) {
                            console.error(error);
                        }, {
                            enableHighAccuracy: true
                        });
                    }
                };
                DeviceService.prototype.updatePose = function () {
                    var _this = this;
                    if (typeof navigator == 'undefined')
                        return;
                    if (!this._vrFrameData && navigator && navigator.getVRDisplays) {
                        this._vrFrameData = new VRFrameData();
                        navigator.getVRDisplays().then(function (displays) {
                            if (displays.length) {
                                _this.vrDisplay = displays[0];
                            }
                        });
                    }
                    if (!this.vrDisplay)
                        return;
                    var vrDisplay = this.vrDisplay;
                    var vrFrameData = this._vrFrameData;
                    if (vrDisplay.getFrameData(vrFrameData)) {
                        var positionValue = cesium_imports_1.Cartesian3.unpack(vrFrameData.pose.position, 0, scratchCartesian);
                        var orientationValue = cesium_imports_1.Quaternion.unpack(vrFrameData.pose.orientation, 0, scratchQuaternion);
                        this.displayEntity.position.setValue(positionValue);
                        this.displayEntity.orientation.setValue(orientationValue);
                        this.getSystemTime(this._state.time);
                        this.publishDeviceState();
                    }
                    ;
                };
                DeviceService.prototype.stopLocationUpdates = function () {
                    if (typeof navigator === 'undefined')
                        return;
                    if (cesium_imports_1.defined(this._geolocationWatchId)) {
                        navigator.geolocation.clearWatch(this._geolocationWatchId);
                        this._geolocationWatchId = undefined;
                    }
                };
                DeviceService.prototype.stopPoseUpdates = function () {
                    // no-op
                };
                DeviceService = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, context_2.ContextService)
                ], DeviceService);
                return DeviceService;
            }());
            exports_1("DeviceService", DeviceService);
        }
    }
});

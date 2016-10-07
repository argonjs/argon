System.register(['aurelia-dependency-injection', './cesium/cesium-imports', 'mobile-detect', './common', './session', './utils', './reality'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, mobile_detect_1, common_1, session_1, utils_1, reality_1;
    var ZoomState, DeviceService;
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
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (reality_1_1) {
                reality_1 = reality_1_1;
            }],
        execute: function() {
            (function (ZoomState) {
                ZoomState[ZoomState["OTHER"] = 0] = "OTHER";
                ZoomState[ZoomState["START"] = 1] = "START";
                ZoomState[ZoomState["CHANGE"] = 2] = "CHANGE";
                ZoomState[ZoomState["END"] = 3] = "END";
            })(ZoomState || (ZoomState = {}));
            exports_1("ZoomState", ZoomState);
            /**
            * Provides device state.
            */
            DeviceService = (function () {
                /**
                * Initialize the DeviceService
                */
                function DeviceService(sessionService, realityService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.realityService = realityService;
                    /**
                     * An ENU coordinate frame centered at the gps location reported by the device.
                     * The reference frame of this frame is the FIXED (ECEF) reference frame.
                     */
                    this.geolocationEntity = new cesium_imports_1.Entity({ id: 'ar.device.geolocation', name: 'Device Geolocation' });
                    /**
                     * A frame which represents the orientation of the device. If the orientation of the
                     * device is known absolutely, then the reference frame of this frame is the ENU
                     * coordinate frame, [[geolocationEntity]]. Otherwise, the reference frame of this
                     * frame is arbitrary.
                     */
                    this.orientationEntity = new cesium_imports_1.Entity({ id: 'ar.device.orientation', name: 'Device Orientation' });
                    /**
                     * A frame which represents the device. If the geopose is known, the reference frame
                     * for this frame is the [[orientationEntity]]. Otherwise, the reference frame is arbitrary.
                     */
                    this.deviceEntity = new cesium_imports_1.Entity({ id: 'ar.device', name: 'Device' });
                    /**
                     * A frame which represents the display for the current device.
                     * The reference frame for this frame is always the [[deviceEntity]].
                     */
                    this.displayEntity = new cesium_imports_1.Entity({
                        id: 'ar.device.display',
                        name: 'Device Display',
                        position: new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, this.deviceEntity),
                        orientation: new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY)
                    });
                    /**
                     * The sessions that are subscribed to device state
                     */
                    this.subscribers = new Set();
                    /**
                     * The sessions that are subscribed to the device location
                     */
                    this.locationSubscribers = new Set();
                    /**
                     * The sessions that are subscribed to the device location
                     */
                    this.orientationSubscribers = new Set();
                    this._subscriberTimeoutIds = new WeakMap();
                    this._state = {
                        time: cesium_imports_1.JulianDate.now(),
                        viewport: this.getMaximumViewport(),
                        defaultFov: Math.PI / 2,
                        subviews: [{
                                type: common_1.SubviewType.SINGULAR,
                                frustum: {
                                    fov: Math.PI / 2,
                                }
                            }]
                    };
                    this._scratchCartesian = new cesium_imports_1.Cartesian3;
                    this._scratchQuaternion1 = new cesium_imports_1.Quaternion;
                    this._scratchQuaternion2 = new cesium_imports_1.Quaternion;
                    this._x90Rot = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_X, cesium_imports_1.CesiumMath.PI_OVER_TWO);
                    this._headingDrift = 0;
                    if (typeof navigator !== 'undefined') {
                        this._mobileDetect = new mobile_detect_1.default(navigator.userAgent);
                    }
                    this.sessionService.manager.on['ar.device.state'] = function (deviceState) {
                        if (_this.sessionService.isRealityManager)
                            return;
                        _this._state = deviceState;
                        // TODO: need a better way to update entities from arbitrary SerializedEntityPose. May have to 
                        // add functionality to ContextService
                        _this._updateEntity(deviceState.geolocationPose, _this.geolocationEntity, cesium_imports_1.ReferenceFrame.FIXED);
                        _this._updateEntity(deviceState.orientationPose, _this.orientationEntity, _this.geolocationEntity);
                        _this._updateEntity(deviceState.devicePose, _this.deviceEntity, _this.orientationEntity);
                        _this._updateEntity(deviceState.displayPose, _this.displayEntity, _this.deviceEntity);
                    };
                    sessionService.manager.on['ar.reality.zoom'] =
                        sessionService.manager.on['ar.device.zoom'] = function (data) {
                            _this.zoom(data);
                        };
                    var checkSubscribers = function () {
                        if (_this.locationSubscribers.size > 0)
                            _this.startLocationUpdates();
                        else
                            _this.stopLocationUpdates();
                        if (_this.orientationSubscribers.size > 0)
                            _this.startOrientationUpdates();
                        else
                            _this.stopOrientationUpdates();
                    };
                    this.sessionService.connectEvent.addEventListener(function (session) {
                        session.on['ar.device.subscribe'] = function (o) {
                            _this.subscribers.add(session);
                            if (o.location)
                                _this.locationSubscribers.add(session);
                            else
                                _this.locationSubscribers.delete(session);
                            if (o.orientation)
                                _this.orientationSubscribers.add(session);
                            else
                                _this.orientationSubscribers.delete(session);
                            var id = setTimeout(function () {
                                _this.subscribers.delete(session);
                                _this.locationSubscribers.delete(session);
                                _this.orientationSubscribers.delete(session);
                                checkSubscribers();
                            }, o.timeout);
                            var previousId = _this._subscriberTimeoutIds.get(session);
                            if (previousId !== undefined)
                                clearTimeout(previousId);
                            _this._subscriberTimeoutIds.set(session, id);
                            checkSubscribers();
                        };
                        session.on['ar.reality.desiredFov'] =
                            session.on['ar.device.desiredFov'] = function (_a) {
                                var fov = _a.fov;
                                _this.onDesiredFov(fov);
                            };
                    });
                    if (this.sessionService.isRealityManager) {
                        this.startOrientationUpdates();
                        setTimeout(function () {
                            checkSubscribers();
                        }, 10000);
                        if (typeof window !== 'undefined' && window.addEventListener) {
                            var updateInterfaceOrientation_1 = function () {
                                var interfaceOrientationProperty = _this.displayEntity.orientation;
                                var interfaceOrientation = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_Z, (-window.orientation || 0) * cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE, _this._scratchQuaternion1);
                                if (_this._mobileDetect && !_this._mobileDetect.mobile()) {
                                    // for laptops, rotate device orientation by 90° around +X so that it 
                                    // corresponds to an upright display rather than the integrated keyboard
                                    interfaceOrientation = cesium_imports_1.Quaternion.multiply(_this._x90Rot, interfaceOrientation, interfaceOrientation);
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
                /**
                * Request device state updates.
                */
                DeviceService.prototype.update = function (o) {
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
                 * Update the device state, and send to subscribers.
                 */
                DeviceService.prototype.updateDeviceState = function () {
                    var deviceState = this._state;
                    var time = cesium_imports_1.JulianDate.now(deviceState.time);
                    deviceState.geolocationPose = utils_1.getSerializedEntityPose(this.geolocationEntity, time, cesium_imports_1.ReferenceFrame.FIXED);
                    deviceState.orientationPose = utils_1.getSerializedEntityPose(this.orientationEntity, time, this.orientationEntity.position && this.orientationEntity.position.referenceFrame);
                    deviceState.devicePose = utils_1.getSerializedEntityPose(this.deviceEntity, time, this.deviceEntity.position && this.deviceEntity.position.referenceFrame);
                    deviceState.displayPose = utils_1.getSerializedEntityPose(this.displayEntity, time, this.displayEntity.position && this.displayEntity.position.referenceFrame);
                    this.subscribers.forEach(function (options, session) {
                        session.send('ar.device.state', deviceState);
                    });
                };
                /**
                 * Set a desired fov in radians.
                 */
                DeviceService.prototype.setDesiredFov = function (fov) {
                    this.zoom({ fov: fov || this.state.defaultFov, zoom: 1, state: ZoomState.OTHER });
                };
                /**
                 * Set the default fov in radians, and adjust the desired fov to match the
                 * previous desired / default ratio.
                 */
                DeviceService.prototype.setDefaultFov = function (fov) {
                    var currentFov = this.state.subviews[0].frustum.fov;
                    var ratio = currentFov / this.state.defaultFov;
                    this.setDesiredFov(fov * ratio);
                    this.state.defaultFov = fov;
                };
                Object.defineProperty(DeviceService.prototype, "state", {
                    /**
                     * Get the current device state
                     */
                    get: function () {
                        return this._state;
                    },
                    enumerable: true,
                    configurable: true
                });
                DeviceService.prototype._updateEntity = function (pose, entity, referenceFrame) {
                    if (pose) {
                        var positionValue = pose.p === 0 ? cesium_imports_1.Cartesian3.ZERO : pose.p;
                        var orientationValue = pose.o === 0 ? cesium_imports_1.Quaternion.IDENTITY : pose.o;
                        var positionProperty = entity.position;
                        if (positionProperty instanceof cesium_imports_1.ConstantPositionProperty) {
                            positionProperty.setValue(positionValue);
                        }
                        else {
                            entity.position = new cesium_imports_1.ConstantPositionProperty(positionValue, referenceFrame);
                        }
                        var orientationProperty = entity.orientation;
                        if (orientationProperty instanceof cesium_imports_1.ConstantProperty) {
                            orientationProperty.setValue(orientationValue);
                        }
                        else {
                            entity.orientation = new cesium_imports_1.ConstantProperty(orientationValue);
                        }
                    }
                    else {
                        entity.position = undefined;
                        entity.orientation = undefined;
                    }
                };
                DeviceService.prototype.startLocationUpdates = function () {
                    var _this = this;
                    // defer to the reality manager to get geolocation updates from the device 
                    if (!this.sessionService.isRealityManager || typeof navigator == 'undefined')
                        return;
                    if (!cesium_imports_1.defined(this._geolocationWatchId)) {
                        this._geolocationWatchId = navigator.geolocation.watchPosition(function (pos) {
                            if (_this.geolocationEntity.position instanceof cesium_imports_1.SampledPositionProperty === false) {
                                var sampledPostionProperty = new cesium_imports_1.SampledPositionProperty(cesium_imports_1.ReferenceFrame.FIXED);
                                sampledPostionProperty.forwardExtrapolationType = cesium_imports_1.ExtrapolationType.HOLD;
                                sampledPostionProperty.backwardExtrapolationType = cesium_imports_1.ExtrapolationType.HOLD;
                                sampledPostionProperty.maxNumSamples = 10;
                                _this.geolocationEntity.position = sampledPostionProperty;
                            }
                            var positionTime = cesium_imports_1.JulianDate.fromDate(new Date(pos.timestamp));
                            var positionECEF = cesium_imports_1.Cartesian3.fromDegrees(pos.coords.longitude, pos.coords.latitude, pos.coords.altitude || 0, undefined, _this._scratchCartesian);
                            _this.geolocationEntity.position.addSample(positionTime, positionECEF);
                            if (_this.geolocationEntity.orientation instanceof cesium_imports_1.ConstantProperty === false) {
                                _this.geolocationEntity.orientation = new cesium_imports_1.ConstantProperty();
                            }
                            var enuOrientation = cesium_imports_1.Transforms.headingPitchRollQuaternion(positionECEF, 0, 0, 0, undefined, _this._scratchQuaternion1);
                            _this.geolocationEntity.orientation.setValue(enuOrientation);
                            _this._state.geolocationAccuracy = pos.coords.accuracy;
                            _this._state.geolocationAltitudeAccuracy = pos.coords.altitudeAccuracy;
                            _this.updateDeviceState();
                        }, function (error) {
                            console.error(error);
                        }, {
                            enableHighAccuracy: true
                        });
                    }
                };
                DeviceService.prototype.startOrientationUpdates = function () {
                    var _this = this;
                    if (typeof navigator == 'undefined')
                        return;
                    if (!cesium_imports_1.defined(this._deviceorientationListener)) {
                        this._deviceorientationListener = function (e) {
                            var alphaDegrees = e.alpha;
                            if (!cesium_imports_1.defined(alphaDegrees)) {
                                return;
                            }
                            if (e.absolute) {
                                _this._alphaOffset = 0;
                            }
                            var webkitCompassHeading = e['webkitCompassHeading'];
                            var webkitCompassAccuracy = +e['webkitCompassAccuracy'];
                            // when the phone is almost updside down, webkit flips the compass heading 
                            // (not documented anywhere, annoyingly)
                            // if (e.beta >= 130 || e.beta <= -130) webkitCompassHeading = undefined;
                            if ((!cesium_imports_1.defined(_this._alphaOffset) || Math.abs(_this._headingDrift) > 5) &&
                                cesium_imports_1.defined(webkitCompassHeading) &&
                                webkitCompassAccuracy >= 0 &&
                                webkitCompassAccuracy < 50 &&
                                webkitCompassHeading >= 0) {
                                if (!cesium_imports_1.defined(_this._alphaOffset)) {
                                    _this._alphaOffset = -webkitCompassHeading;
                                }
                                else {
                                    _this._alphaOffset -= _this._headingDrift;
                                }
                            }
                            var alphaOffset = _this._alphaOffset || -webkitCompassHeading || 0;
                            // TODO: deal with various browser quirks :\
                            // https://mobiforge.com/design-development/html5-mobile-web-device-orientation-events
                            var alpha = cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE * (e.alpha + alphaOffset);
                            var beta = cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE * e.beta;
                            var gamma = cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE * e.gamma;
                            var alphaQuat = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_Z, alpha, _this._scratchQuaternion1);
                            var betaQuat = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_X, beta, _this._scratchQuaternion2);
                            var alphaBetaQuat = cesium_imports_1.Quaternion.multiply(alphaQuat, betaQuat, _this._scratchQuaternion1);
                            var gammaQuat = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_Y, gamma, _this._scratchQuaternion2);
                            var alphaBetaGammaQuat = cesium_imports_1.Quaternion.multiply(alphaBetaQuat, gammaQuat, alphaBetaQuat);
                            // update orientationEntity
                            if (_this.orientationEntity.position instanceof cesium_imports_1.ConstantPositionProperty == false) {
                                _this.orientationEntity.position = new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, _this.geolocationEntity);
                            }
                            if (_this.orientationEntity.orientation instanceof cesium_imports_1.ConstantProperty == false) {
                                _this.orientationEntity.orientation = new cesium_imports_1.ConstantProperty();
                            }
                            _this.orientationEntity.orientation.setValue(alphaBetaGammaQuat);
                            // make sure the device entity has a defined pose relative to the device orientation entity
                            if (_this.deviceEntity.position instanceof cesium_imports_1.ConstantPositionProperty == false) {
                                _this.deviceEntity.position = new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, _this.orientationEntity);
                            }
                            if (_this.deviceEntity.orientation instanceof cesium_imports_1.ConstantProperty == false) {
                                _this.deviceEntity.orientation = new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY);
                            }
                            // TODO: fix heading drift calculation (heading should match webkitCompassHeading)
                            // if (defined(webkitCompassHeading)) {
                            //     const q = alphaBetaGammaQuat//utils.getEntityOrientationInReferenceFrame(this.interfaceEntity, JulianDate.now(), this.locationEntity, this._scratchQuaternion1);
                            //     var heading = -Math.atan2(2*(q.w*q.z + q.x*q.y), 1 - 2*(q.y*q.y + q.z*q.z));
                            //     if (heading < 0) heading += 2*Math.PI;
                            //     const {swing,twist} = swingTwistDecomposition(alphaBetaGammaQuat, Cartesian3.UNIT_Z);
                            //     const twistAngle = 2 * Math.acos(twist.w);
                            //     console.log(twist.w + ' ' + twistAngle * CesiumMath.DEGREES_PER_RADIAN + '\n' + webkitCompassHeading);
                            //     // this._headingDrift = webkitCompassHeading - heading * CesiumMath.DEGREES_PER_RADIAN;
                            // }
                            _this.updateDeviceState();
                        };
                        window.addEventListener('deviceorientation', this._deviceorientationListener);
                    }
                };
                DeviceService.prototype.stopLocationUpdates = function () {
                    if (typeof navigator === 'undefined')
                        return;
                    if (cesium_imports_1.defined(this._geolocationWatchId)) {
                        navigator.geolocation.clearWatch(this._geolocationWatchId);
                        this._geolocationWatchId = undefined;
                    }
                };
                DeviceService.prototype.stopOrientationUpdates = function () {
                    if (typeof navigator === 'undefined')
                        return;
                    if (cesium_imports_1.defined(this._deviceorientationListener)) {
                        window.removeEventListener('deviceorientation', this._deviceorientationListener);
                        this._deviceorientationListener = undefined;
                        this._alphaOffset = undefined;
                    }
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
                /**
                 * Attempt to zoom
                 */
                DeviceService.prototype.zoom = function (data) {
                    if (this.realityService.session && this.realityService.session.info['reality.handlesZoom']) {
                        this.realityService.session.send('ar.device.zoom', data);
                        this.realityService.session.send('ar.reality.zoom', data); // backwards compatability, remove at v1.2
                    }
                    else {
                        var fov = this.onZoom(data);
                        if (this.sessionService.isRealityViewer || this.sessionService.isRealityManager) {
                            this.sessionService.manager.send('ar.device.desiredFov', { fov: fov });
                        }
                    }
                };
                /**
                 * Handle zoom. Overridable for custom behavior.
                 * Only called within a [[REALITY_VIEWER]].
                 */
                DeviceService.prototype.onZoom = function (data) {
                    var newFov = 2 * Math.atan(Math.tan(data.fov * 0.5) / data.zoom);
                    newFov = Math.max(10 * cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE, Math.min(newFov, 160 * cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE));
                    // snap to default
                    if (data.state === ZoomState.END &&
                        Math.abs(newFov - this.state.defaultFov) < 0.05 /* +-6deg */) {
                        newFov = this.state.defaultFov;
                    }
                    return newFov;
                };
                /**
                 * Handle desired fov. Overridable for custom behavior.
                 * Only called within a [[REALITY_MANAGER]]
                 */
                DeviceService.prototype.onDesiredFov = function (fov) {
                    this.state.subviews.forEach(function (s) {
                        s.frustum.fov = fov;
                    });
                };
                DeviceService = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, reality_1.RealityService)
                ], DeviceService);
                return DeviceService;
            }());
            exports_1("DeviceService", DeviceService);
        }
    }
});

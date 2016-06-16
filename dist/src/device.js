System.register(['aurelia-dependency-injection', './cesium/cesium-imports', './context', 'mobile-detect'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, context_2, mobile_detect_1;
    var DeviceService, rotationAxis, projection, swing, twist;
    /**
       Decompose the rotation on to 2 parts.
       1. Twist - rotation around the "direction" vector
       2. Swing - rotation around axis that is perpendicular to "direction" vector
       The rotation can be composed back by
       rotation = swing * twist
    
       has singularity in case of swing_rotation close to 180 degrees rotation.
       if the input quaternion is of non-unit length, the outputs are non-unit as well
       otherwise, outputs are both unit
    */
    function swingTwistDecomposition(q, direction) {
        cesium_imports_1.Cartesian3.clone(q, rotationAxis);
        cesium_imports_1.Cartesian3.multiplyByScalar(direction, cesium_imports_1.Cartesian3.dot(rotationAxis, direction), projection);
        twist.x = projection.x;
        twist.y = projection.y;
        twist.z = projection.z;
        twist.w = q.w;
        cesium_imports_1.Quaternion.normalize(twist, twist);
        cesium_imports_1.Quaternion.conjugate(twist, swing);
        cesium_imports_1.Quaternion.multiply(q, swing, swing);
        return { swing: swing, twist: twist };
    }
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (cesium_imports_1_1) {
                cesium_imports_1 = cesium_imports_1_1;
            },
            function (context_2_1) {
                context_2 = context_2_1;
            },
            function (mobile_detect_1_1) {
                mobile_detect_1 = mobile_detect_1_1;
            }],
        execute: function() {
            /**
            * Provides pose state for the device.
            */
            DeviceService = (function () {
                /**
                * Initialize the DeviceService
                */
                function DeviceService(context) {
                    this.context = context;
                    this.locationUpdatesEnabled = true;
                    this.orientationUpdatesEnabled = true;
                    this.locationEntity = new cesium_imports_1.Entity({ id: 'ar.device.location', name: 'Device Location' });
                    this.orientationEntity = new cesium_imports_1.Entity({ id: 'ar.device.orientation', name: 'Device Orientation' });
                    this.interfaceEntity = new cesium_imports_1.Entity({ id: 'ar.device.interface', name: 'Device Interface' });
                    this._scratchCartesian = new cesium_imports_1.Cartesian3;
                    this._scratchQuaternion1 = new cesium_imports_1.Quaternion;
                    this._scratchQuaternion2 = new cesium_imports_1.Quaternion;
                    this._scratchMatrix3 = new cesium_imports_1.Matrix3;
                    this._x90Rot = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_X, cesium_imports_1.CesiumMath.PI_OVER_TWO);
                    this._headingDrift = 0;
                    this.locationEntity.position = new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, null);
                    this.locationEntity.orientation = new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY);
                    this.orientationEntity.position = new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, this.locationEntity);
                    this.orientationEntity.orientation = new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY);
                    // by default, assume the interface is upright, perpendicular to the 
                    this.interfaceEntity.position = new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, this.orientationEntity);
                    this.interfaceEntity.orientation = new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_X, -cesium_imports_1.CesiumMath.PI_OVER_TWO));
                    context.wellKnownReferenceFrames.add(this.locationEntity);
                    context.wellKnownReferenceFrames.add(this.orientationEntity);
                    context.wellKnownReferenceFrames.add(this.interfaceEntity);
                    if (typeof window !== 'undefined' && window.navigator) {
                        this._mobileDetect = new mobile_detect_1.default(window.navigator.userAgent);
                    }
                }
                DeviceService.prototype.onIdle = function () {
                    if (cesium_imports_1.defined(this._geolocationWatchId)) {
                        navigator.geolocation.clearWatch(this._geolocationWatchId);
                        this._geolocationWatchId = undefined;
                    }
                    if (cesium_imports_1.defined(this._deviceorientationListener)) {
                        window.removeEventListener('deviceorientation', this._deviceorientationListener);
                        this._deviceorientationListener = undefined;
                        this._alphaOffset = undefined;
                    }
                };
                DeviceService.prototype.onUpdate = function () {
                    var _this = this;
                    if (typeof window !== 'undefined') {
                        var interfaceOrientationProperty = this.interfaceEntity.orientation;
                        var interfaceOrientation = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_Z, (-window.orientation || 0) * cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE, this._scratchQuaternion1);
                        if (this._mobileDetect && !this._mobileDetect.mobile()) {
                            // for laptops, rotate device orientation by 90° around +X so that it 
                            // corresponds to an upright display rather than the integrated keyboard
                            interfaceOrientation = cesium_imports_1.Quaternion.multiply(this._x90Rot, interfaceOrientation, interfaceOrientation);
                        }
                        interfaceOrientationProperty.setValue(interfaceOrientation);
                        if (!cesium_imports_1.defined(this._geolocationWatchId) && this.locationUpdatesEnabled) {
                            this._geolocationWatchId = navigator.geolocation.watchPosition(function (pos) {
                                if (_this.locationEntity.position instanceof cesium_imports_1.SampledPositionProperty === false) {
                                    var sampledPostionProperty = new cesium_imports_1.SampledPositionProperty(cesium_imports_1.ReferenceFrame.FIXED);
                                    sampledPostionProperty.forwardExtrapolationType = cesium_imports_1.ExtrapolationType.HOLD;
                                    sampledPostionProperty.backwardExtrapolationType = cesium_imports_1.ExtrapolationType.HOLD;
                                    sampledPostionProperty['maxNumSamples'] = 10;
                                    _this.locationEntity.position = sampledPostionProperty;
                                }
                                var positionTime = cesium_imports_1.JulianDate.fromDate(new Date(pos.timestamp));
                                var positionECEF = cesium_imports_1.Cartesian3.fromDegrees(pos.coords.longitude, pos.coords.latitude, pos.coords.altitude || 0, undefined, _this._scratchCartesian);
                                _this.locationEntity.position.addSample(positionTime, positionECEF);
                                var enuOrientation = cesium_imports_1.Transforms.headingPitchRollQuaternion(positionECEF, 0, 0, 0, undefined, _this._scratchQuaternion1);
                                _this.locationEntity.orientation.setValue(enuOrientation);
                            }, function (error) {
                                console.error(error);
                            }, {
                                enableHighAccuracy: true
                            });
                        }
                        else if (cesium_imports_1.defined(this._geolocationWatchId) && !this.locationUpdatesEnabled) {
                            navigator.geolocation.clearWatch(this._geolocationWatchId);
                            this._geolocationWatchId = undefined;
                        }
                        if (!cesium_imports_1.defined(this._deviceorientationListener) && this.orientationUpdatesEnabled) {
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
                                if (!cesium_imports_1.defined(_this._alphaOffset)) {
                                    return;
                                }
                                // TODO: deal with various browser quirks :\
                                // https://mobiforge.com/design-development/html5-mobile-web-device-orientation-events
                                var alpha = cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE * (e.alpha + (_this._alphaOffset || 0));
                                var beta = cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE * e.beta;
                                var gamma = cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE * e.gamma;
                                var alphaQuat = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_Z, alpha, _this._scratchQuaternion1);
                                var betaQuat = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_X, beta, _this._scratchQuaternion2);
                                var alphaBetaQuat = cesium_imports_1.Quaternion.multiply(alphaQuat, betaQuat, _this._scratchQuaternion1);
                                var gammaQuat = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_Y, gamma, _this._scratchQuaternion2);
                                var alphaBetaGammaQuat = cesium_imports_1.Quaternion.multiply(alphaBetaQuat, gammaQuat, alphaBetaQuat);
                                _this.orientationEntity.orientation.setValue(alphaBetaGammaQuat);
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
                            };
                            window.addEventListener('deviceorientation', this._deviceorientationListener);
                        }
                        else if (cesium_imports_1.defined(this._deviceorientationListener) && !this.orientationUpdatesEnabled) {
                            window.removeEventListener('deviceorientation', this._deviceorientationListener);
                            this._deviceorientationListener = undefined;
                        }
                    }
                };
                /**
                * Update the pose with latest sensor data
                */
                DeviceService.prototype.update = function () {
                    var _this = this;
                    if (cesium_imports_1.defined(this._idleTimeoutId))
                        clearTimeout(this._idleTimeoutId);
                    this._idleTimeoutId = setTimeout(function () {
                        _this.onIdle();
                    }, 2000);
                    this.onUpdate();
                };
                DeviceService = __decorate([
                    aurelia_dependency_injection_1.inject(context_2.ContextService)
                ], DeviceService);
                return DeviceService;
            }());
            exports_1("DeviceService", DeviceService);
            rotationAxis = new cesium_imports_1.Cartesian3;
            projection = new cesium_imports_1.Cartesian3;
            swing = new cesium_imports_1.Quaternion;
            twist = new cesium_imports_1.Quaternion;
        }
    }
});

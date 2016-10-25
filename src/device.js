System.register(['aurelia-dependency-injection', './cesium/cesium-imports', './common', './context', './view', './session', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, common_1, context_2, view_1, session_1, utils_1;
    var scratchCartesian, scratchQuaternion, scratchQuaternion2, scratchMatrix3, scratchMatrix4, clock, scratchTime, AVERAGE_HUMAN_HEIGHT, DeviceService;
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
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (context_2_1) {
                context_2 = context_2_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
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
            scratchQuaternion2 = new cesium_imports_1.Quaternion;
            scratchMatrix3 = new cesium_imports_1.Matrix3;
            scratchMatrix4 = new cesium_imports_1.Matrix4;
            clock = new cesium_imports_1.Clock();
            scratchTime = new cesium_imports_1.JulianDate(0, 0);
            AVERAGE_HUMAN_HEIGHT = 1.77;
            /**
            * Provides device state.
            */
            DeviceService = (function () {
                /**
                * Initialize the DeviceService
                */
                function DeviceService(sessionService, viewService, contextService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.viewService = viewService;
                    this.contextService = contextService;
                    /**
                     * A coordinate system represeting the space in which the
                     * user is moving, positioned at the floor. For mobile devices,
                     * the stage follows the user. For non-mobile systems, the
                     * stage is fixed.
                     */
                    this.stage = this.contextService.entities.add(new cesium_imports_1.Entity({
                        id: 'ar.device.stage',
                        name: 'Device Stage',
                        position: new cesium_imports_1.ConstantPositionProperty(undefined, cesium_imports_1.ReferenceFrame.FIXED),
                        orientation: new cesium_imports_1.ConstantProperty(undefined)
                    }));
                    // TODO
                    // public stageSittingSpace = this.contextService.entities.add(new Entity({
                    //     id: 'ar.device.stageSittingSpace',
                    //     name: 'Device Stage Sitting Space',
                    //     position: new ConstantPositionProperty(undefined, ReferenceFrame.FIXED),
                    //     orientation: new ConstantProperty(undefined)
                    // }));
                    /**
                     * The physical viewing pose as reported by the current device
                     */
                    this.eye = this.contextService.entities.add(new cesium_imports_1.Entity({
                        id: 'ar.device.eye',
                        name: 'Device Eye',
                        position: new cesium_imports_1.ConstantPositionProperty(undefined, undefined),
                        orientation: new cesium_imports_1.ConstantProperty(undefined)
                    }));
                    /**
                     * An East-North-Up coordinate frame centered at the eye position
                     */
                    this.eyeEastNorthUp = this.contextService.entities.add(new cesium_imports_1.Entity({
                        id: 'ar.device.eyeEastNorthUp',
                        name: 'Device Eye - ENU',
                        position: new cesium_imports_1.ConstantPositionProperty(undefined, undefined),
                        orientation: new cesium_imports_1.ConstantProperty(undefined)
                    }));
                    /**
                     * The sessions that are subscribed to the device location
                     */
                    this.geolocationSubscribers = new Set();
                    this._state = {
                        viewport: { x: 0, y: 0, width: 1, height: 1 },
                        subviews: [{
                                type: common_1.SubviewType.SINGULAR,
                                projectionMatrix: new cesium_imports_1.Matrix4()
                            }],
                        geolocationAccuracy: undefined,
                        altitudeAccuracy: undefined
                    };
                    this._frustum = new cesium_imports_1.PerspectiveFrustum();
                    this.sessionService.manager.on['ar.device.state'] = function (deviceState) {
                        _this._state = deviceState;
                    };
                    this.sessionService.connectEvent.addEventListener(function (session) {
                        if (session.info.needsGeopose) {
                            _this.geolocationSubscribers.add(session);
                            _this.startDeviceLocationUpdates();
                            session.closeEvent.addEventListener(function () {
                                _this.geolocationSubscribers.delete(session);
                                if (_this.geolocationSubscribers.size === 0)
                                    _this.stopDeviceLocationUpdates();
                            });
                        }
                    });
                    if (this.sessionService.isRealityManager || this.sessionService.isRealityViewer) {
                        this.startDeviceOrientationUpdates();
                    }
                    var frustum = this._frustum;
                    frustum.near = 0.01;
                    frustum.far = 500000000;
                    frustum.fov = Math.PI / 3;
                    frustum.aspectRatio = 1;
                    cesium_imports_1.Matrix4.clone(frustum.projectionMatrix, this.subviews[0].projectionMatrix);
                    if (this.sessionService.isRealityManager) {
                        this.viewService.containingElementPromise.then(function () {
                            _this.publishDeviceState();
                            setInterval(_this.publishDeviceState.bind(_this), 500);
                            window.addEventListener('resize', _this.publishDeviceState.bind(_this));
                        });
                    }
                }
                Object.defineProperty(DeviceService.prototype, "eyeCartographicPosition", {
                    /**
                     * The current cartographic position of the eye. Undefined if no geolocation is available.
                     */
                    get: function () {
                        return this._eyeCartographicPosition;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DeviceService.prototype, "geolocationAccuracy", {
                    /**
                     * The radius (in meters) of latitudinal and longitudinal uncertainty,
                     * in relation to the FIXED reference frame. Value is greater than
                     * 0 or undefined.
                     */
                    get: function () {
                        return this._state.geolocationAccuracy;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DeviceService.prototype, "altitudeAccuracy", {
                    /**
                     * The accuracy of the altitude in meters. Value is greater than
                     * 0 or undefined.
                     */
                    get: function () {
                        return this._state.altitudeAccuracy;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DeviceService.prototype, "compassAccuracy", {
                    /**
                     * The accuracy of the compass in degrees. Value is greater than
                     * 0 or undefined.
                     */
                    get: function () {
                        return this._compassAccuracy;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DeviceService.prototype, "viewport", {
                    get: function () {
                        return this._state.viewport;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DeviceService.prototype, "subviews", {
                    get: function () {
                        return this._state.subviews;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DeviceService.prototype, "strictSubviewPose", {
                    get: function () {
                        return this._state.strictSubviewPose;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DeviceService.prototype, "strictSubviewProjectionMatrix", {
                    get: function () {
                        return this._state.strictSubviewProjectionMatrix;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DeviceService.prototype, "strictSubviewViewport", {
                    get: function () {
                        return this._state.strictSubviewViewport;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DeviceService.prototype, "strictViewport", {
                    get: function () {
                        return this._state.strictViewport;
                    },
                    enumerable: true,
                    configurable: true
                });
                DeviceService.prototype.getSubviewEntity = function (index) {
                    var subviewEntity = this.contextService.entities.getOrCreateEntity('ar.device.view_' + index);
                    if (!subviewEntity.position) {
                        subviewEntity.position = new cesium_imports_1.ConstantPositionProperty();
                    }
                    if (!subviewEntity.orientation) {
                        subviewEntity.orientation = new cesium_imports_1.ConstantProperty();
                    }
                    return subviewEntity;
                };
                /**
                * Update device state.
                */
                DeviceService.prototype.update = function () {
                    this.sessionService.ensureNotRealityAugmenter();
                    if (this.sessionService.isRealityManager) {
                        this.updateViewport();
                        this.updateState();
                    }
                    else {
                        this.setEyePoseFromDeviceOrientation();
                    }
                    var positionFIXED = utils_1.getEntityPositionInReferenceFrame(this.eye, clock.currentTime, cesium_imports_1.ReferenceFrame.FIXED, scratchCartesian);
                    this._eyeCartographicPosition = positionFIXED ?
                        cesium_imports_1.Cartographic.fromCartesian(positionFIXED, undefined, this._eyeCartographicPosition) :
                        positionFIXED;
                };
                DeviceService.prototype.updateState = function () {
                    if (typeof navigator !== 'undefined' &&
                        navigator.activeVRDisplays &&
                        navigator.activeVRDisplays.length) {
                        this.updateStateFromWebVR();
                    }
                    else {
                        this.updateStateMonocular();
                    }
                };
                DeviceService.prototype.updateStateFromWebVR = function () {
                    var vrDisplay = navigator.activeVRDisplays[0];
                    var vrFrameData = this._vrFrameData =
                        this._vrFrameData || new VRFrameData();
                    if (!vrDisplay.getFrameData(vrFrameData))
                        return;
                    var deviceState = this._state;
                    var subviews = deviceState.subviews;
                    var leftSubview = subviews[0];
                    var rightSubview = subviews[1] = subviews[1] || {};
                    var leftViewport = leftSubview.viewport || {};
                    leftViewport.x = 0;
                    leftViewport.y = 0;
                    leftViewport.width = deviceState.viewport.width * 0.5;
                    leftViewport.height = deviceState.viewport.height;
                    var rightViewport = rightSubview.viewport || {};
                    rightViewport.x = leftViewport.width;
                    rightViewport.y = 0;
                    rightViewport.width = leftViewport.width;
                    rightViewport.height = deviceState.viewport.height;
                    leftSubview.projectionMatrix = cesium_imports_1.Matrix4.fromColumnMajorArray(vrFrameData.leftProjectionMatrix, leftSubview.projectionMatrix);
                    rightSubview.projectionMatrix = cesium_imports_1.Matrix4.clone(vrFrameData.rightProjectionMatrix, rightSubview.projectionMatrix);
                    var inverseStandingMatrix = cesium_imports_1.Matrix4.inverseTransformation(vrDisplay.stageParameters.sittingToStandingTransform, scratchMatrix4);
                    var inverseStandingRotationMatrix = cesium_imports_1.Matrix4.getRotation(inverseStandingMatrix, scratchMatrix3);
                    var inverseStandingOrientation = cesium_imports_1.Quaternion.fromRotationMatrix(inverseStandingRotationMatrix, scratchQuaternion);
                    var leftStandingViewMatrix = cesium_imports_1.Matrix4.multiplyTransformation(vrFrameData.leftViewMatrix, inverseStandingMatrix, scratchMatrix4);
                    var rightStandingViewMatrix = cesium_imports_1.Matrix4.multiplyTransformation(vrFrameData.rightViewMatrix, inverseStandingMatrix, scratchMatrix4);
                    this.setStagePoseFromGeolocation();
                    if (!vrDisplay.displayName.match(/polyfill/g)) {
                        var sittingEyePosition = cesium_imports_1.Cartesian3.unpack(vrFrameData.pose.position, 0, scratchCartesian);
                        var stageEyePosition = cesium_imports_1.Matrix4.multiplyByPoint(inverseStandingMatrix, sittingEyePosition, scratchCartesian);
                        var sittingEyeOrientation = cesium_imports_1.Quaternion.unpack(vrFrameData.pose.orientation, 0, scratchQuaternion2);
                        var stageEyeOrientation = cesium_imports_1.Quaternion.multiply(inverseStandingOrientation, sittingEyeOrientation, scratchQuaternion);
                        var eye = this.eye;
                        eye.position.setValue(stageEyePosition, this.stage);
                        eye.orientation.setValue(stageEyeOrientation);
                        var leftEye = this.getSubviewEntity(0);
                        var stageLeftEyePosition = cesium_imports_1.Matrix4.getTranslation(leftStandingViewMatrix, scratchCartesian);
                        leftEye.position.setValue(stageLeftEyePosition, this.stage);
                        var rightEye = this.getSubviewEntity(1);
                        var stageRightEyePosition = cesium_imports_1.Matrix4.getTranslation(rightStandingViewMatrix, scratchCartesian);
                        rightEye.position.setValue(stageRightEyePosition, this.stage);
                    }
                    else {
                        // The polyfill does not support reporting an absolute orientation (yet), 
                        // so fall back to our own pose calculation if we are using the polyfill device
                        this.setEyePoseFromDeviceOrientation();
                    }
                };
                DeviceService.prototype.updateStateMonocular = function () {
                    this.setStagePoseFromGeolocation();
                    this.setEyePoseFromDeviceOrientation();
                    var state = this._state;
                    state.subviews.length = 1;
                    state.subviews[0].viewport = undefined;
                    cesium_imports_1.Matrix4.clone(this._frustum.projectionMatrix, state.subviews[0].projectionMatrix);
                };
                DeviceService.prototype.setEyePoseFromDeviceOrientation = function () {
                    var stageOffset = cesium_imports_1.Cartesian3.fromElements(0, 0, AVERAGE_HUMAN_HEIGHT, scratchCartesian);
                    this.eye.position.setValue(stageOffset, this.stage);
                    this.eye.orientation.setValue(this._deviceOrientation);
                };
                DeviceService.prototype.setStagePoseFromGeolocation = function () {
                    var deviceCartographicPosition = this._state.cartographicPosition;
                    if (deviceCartographicPosition) {
                        var lon = deviceCartographicPosition.longitude;
                        var lat = deviceCartographicPosition.latitude;
                        var height = deviceCartographicPosition.height - AVERAGE_HUMAN_HEIGHT;
                        var positionECEF = cesium_imports_1.Cartesian3.fromDegrees(lon, lat, height, undefined, scratchCartesian);
                        var enuOrientation = cesium_imports_1.Transforms.headingPitchRollQuaternion(positionECEF, 0, 0, 0, undefined, scratchQuaternion);
                        this.stage.position.setValue(positionECEF, cesium_imports_1.ReferenceFrame.FIXED);
                        this.stage.orientation.setValue(enuOrientation);
                    }
                    else {
                        this.stage.position.setValue(undefined, cesium_imports_1.ReferenceFrame.FIXED);
                        this.stage.orientation.setValue(undefined);
                    }
                };
                DeviceService.prototype.updateViewport = function () {
                    this._frustum.aspectRatio =
                        this._state.viewport.width / this._state.viewport.height;
                    if (this.viewService.containingElement) {
                        this.viewport.x = 0;
                        this.viewport.y = 0;
                        var width = this.viewService.containingElement.clientWidth;
                        var height = this.viewService.containingElement.clientHeight;
                        this.viewport.width = width;
                        this.viewport.height = height;
                    }
                };
                /**
                 * Request that the callback function be called for the next frame.
                 * @param callback function
                 */
                DeviceService.prototype.requestFrame = function (callback) {
                    var _this = this;
                    var onFrame = function () {
                        tick();
                        _this.update();
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
                 * Send device state to reality viewers.
                 */
                DeviceService.prototype.publishDeviceState = function () {
                    var _this = this;
                    this.sessionService.ensureIsRealityManager();
                    if (this.sessionService.isRealityManager) {
                        this.update();
                        this.sessionService.managedSessions.forEach(function (session) {
                            if (common_1.Role.isRealityViewer(session.info.role))
                                session.send('ar.device.state', _this._state);
                        });
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
                DeviceService.prototype.startDeviceLocationUpdates = function () {
                    var _this = this;
                    if (typeof navigator == 'undefined')
                        return;
                    if (!cesium_imports_1.defined(this._geolocationWatchId)) {
                        this._geolocationWatchId = navigator.geolocation.watchPosition(function (pos) {
                            var cartographic = _this._state.cartographicPosition = _this._state.cartographicPosition || new cesium_imports_1.Cartographic;
                            cartographic.latitude = pos.coords.latitude;
                            cartographic.longitude = pos.coords.longitude;
                            cartographic.height = pos.coords.altitude || 0;
                            _this._state.geolocationAccuracy = (pos.coords.accuracy > 0) ? pos.coords.accuracy : undefined;
                            _this._state.altitudeAccuracy = pos.coords.altitudeAccuracy || undefined;
                            _this.publishDeviceState();
                        }, function (error) {
                            console.error(error);
                        }, {
                            enableHighAccuracy: true
                        });
                    }
                };
                DeviceService.prototype.stopDeviceLocationUpdates = function () {
                    if (typeof navigator !== 'undefined' && cesium_imports_1.defined(this._geolocationWatchId)) {
                        navigator.geolocation.clearWatch(this._geolocationWatchId);
                        this._geolocationWatchId = undefined;
                    }
                    this._state.cartographicPosition = undefined;
                    this._state.geolocationAccuracy = undefined;
                    this._state.altitudeAccuracy = undefined;
                    this.publishDeviceState();
                };
                DeviceService.prototype.startDeviceOrientationUpdates = function () {
                    var _this = this;
                    if (typeof window == 'undefined' || !window.addEventListener)
                        return;
                    if (!cesium_imports_1.defined(this._deviceorientationListener)) {
                        var headingDrift_1 = 0;
                        var alphaOffset_1 = undefined;
                        this._deviceorientationListener = function (e) {
                            var alphaDegrees = e.alpha;
                            var webkitCompassHeading = e['webkitCompassHeading'];
                            var webkitCompassAccuracy = +e['webkitCompassAccuracy'];
                            if (!cesium_imports_1.defined(alphaDegrees)) {
                                return;
                            }
                            var absolute = false;
                            if (e.absolute || webkitCompassHeading) {
                                alphaOffset_1 = 0;
                                absolute = true;
                            }
                            // when the phone is almost updside down, webkit flips the compass heading 
                            // (not documented anywhere, annoyingly)
                            // if (e.beta >= 130 || e.beta <= -130) webkitCompassHeading = undefined;
                            if ((!cesium_imports_1.defined(alphaOffset_1) || Math.abs(headingDrift_1) > 5) &&
                                cesium_imports_1.defined(webkitCompassHeading) &&
                                webkitCompassAccuracy >= 0 &&
                                webkitCompassAccuracy < 50 &&
                                webkitCompassHeading >= 0) {
                                if (!cesium_imports_1.defined(alphaOffset_1)) {
                                    alphaOffset_1 = -webkitCompassHeading;
                                }
                                else {
                                    alphaOffset_1 -= headingDrift_1;
                                }
                                _this._compassAccuracy = webkitCompassAccuracy > 0 ? webkitCompassAccuracy : undefined;
                            }
                            var alpha = cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE * (e.alpha + alphaOffset_1 || -webkitCompassHeading || 0);
                            var beta = cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE * e.beta;
                            var gamma = cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE * e.gamma;
                            var alphaQuat = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_Z, alpha, scratchQuaternion);
                            var betaQuat = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_X, beta, scratchQuaternion2);
                            var alphaBetaQuat = cesium_imports_1.Quaternion.multiply(alphaQuat, betaQuat, scratchQuaternion);
                            var gammaQuat = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_Y, gamma, scratchQuaternion2);
                            var alphaBetaGammaQuat = cesium_imports_1.Quaternion.multiply(alphaBetaQuat, gammaQuat, scratchQuaternion);
                            var screenOrientationAngle = (screen['orientation'] && screen['orientation'].angle) || window.orientation || 0;
                            var screenOrientationQuat = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_Z, -screenOrientationAngle * cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE, scratchQuaternion2);
                            _this._deviceOrientation = cesium_imports_1.Quaternion.multiply(alphaBetaGammaQuat, screenOrientationQuat, _this._deviceOrientation || new cesium_imports_1.Quaternion);
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
                        if ('ondeviceorientationabsolute' in window) {
                            window.addEventListener('deviceorientationabsolute', this._deviceorientationListener);
                        }
                        else if ('ondeviceorientation' in window) {
                            window.addEventListener('deviceorientation', this._deviceorientationListener);
                        }
                    }
                };
                DeviceService.prototype.stopDeviceOrientationUpdates = function () {
                    if (typeof window == 'undefined' || !window.removeEventListener)
                        return;
                    this._deviceOrientation = undefined;
                    this._compassAccuracy = undefined;
                    if (this._deviceorientationListener) {
                        if ('ondeviceorientationabsolute' in window) {
                            window.removeEventListener('deviceorientationabsolute', this._deviceorientationListener);
                        }
                        else if ('ondeviceorientation' in window) {
                            window.removeEventListener('deviceorientation', this._deviceorientationListener);
                        }
                        this._deviceorientationListener = undefined;
                    }
                };
                DeviceService = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, view_1.ViewService, context_2.ContextService)
                ], DeviceService);
                return DeviceService;
            }());
            exports_1("DeviceService", DeviceService);
        }
    }
});

System.register(['aurelia-dependency-injection', '../cesium/cesium-imports', '../common', '../session', '../device', '../reality', '../utils', '../view'], function(exports_1, context_1) {
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
    var aurelia_dependency_injection_1, cesium_imports_1, common_1, session_1, device_1, reality_1, utils_1, view_1;
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
            // interface PinchMovement {
            //     distance: Movement;
            //     angleAndHeight: Movement
            // }
            EmptyRealityLoader = (function (_super) {
                __extends(EmptyRealityLoader, _super);
                function EmptyRealityLoader(sessionService, deviceService, viewService) {
                    _super.call(this);
                    this.sessionService = sessionService;
                    this.deviceService = deviceService;
                    this.viewService = viewService;
                    this.type = 'empty';
                }
                EmptyRealityLoader.prototype.load = function (reality, callback) {
                    var _this = this;
                    var realitySession = this.sessionService.addManagedSessionPort(reality.uri);
                    var remoteRealitySession = this.sessionService.createSessionPort();
                    remoteRealitySession.on['ar.device.state'] = function () { };
                    remoteRealitySession.on['ar.view.uievent'] = function () { };
                    remoteRealitySession.on['ar.context.update'] = function () { };
                    remoteRealitySession.connectEvent.addEventListener(function () {
                        var element = _this.viewService.element;
                        var aggregator = new cesium_imports_1.CameraEventAggregator(element);
                        var flags = {
                            moveForward: false,
                            moveBackward: false,
                            moveUp: false,
                            moveDown: false,
                            moveLeft: false,
                            moveRight: false
                        };
                        function getFlagForKeyCode(keyCode) {
                            switch (keyCode) {
                                case 'W'.charCodeAt(0):
                                    return 'moveForward';
                                case 'S'.charCodeAt(0):
                                    return 'moveBackward';
                                case 'R'.charCodeAt(0):
                                    return 'moveUp';
                                case 'F'.charCodeAt(0):
                                    return 'moveDown';
                                case 'D'.charCodeAt(0):
                                    return 'moveRight';
                                case 'A'.charCodeAt(0):
                                    return 'moveLeft';
                                default:
                                    return undefined;
                            }
                        }
                        var keydownListener = function (e) {
                            var flagName = getFlagForKeyCode(e.keyCode);
                            if (typeof flagName !== 'undefined') {
                                flags[flagName] = true;
                            }
                        };
                        var keyupListener = function (e) {
                            var flagName = getFlagForKeyCode(e.keyCode);
                            if (typeof flagName !== 'undefined') {
                                flags[flagName] = false;
                            }
                        };
                        document.addEventListener('keydown', keydownListener, false);
                        document.addEventListener('keyup', keyupListener, false);
                        remoteRealitySession.closeEvent.addEventListener(function () {
                            aggregator.destroy();
                            document.removeEventListener('keydown', keydownListener);
                            document.removeEventListener('keyup', keyupListener);
                        });
                        var yaw = 0;
                        var pitch = 0;
                        // const yawQuat = new Quaternion;
                        // const pitchQuat = new Quaternion;
                        var positionScratchCartesian = new cesium_imports_1.Cartesian3;
                        var movementScratchCartesian = new cesium_imports_1.Cartesian3;
                        var eyeOrientation = new cesium_imports_1.Quaternion;
                        var orientationMatrix = new cesium_imports_1.Matrix3;
                        var up = new cesium_imports_1.Cartesian3;
                        var right = new cesium_imports_1.Cartesian3;
                        var forward = new cesium_imports_1.Cartesian3;
                        var AVERAGE_HUMAN_HEIGHT = 1.77;
                        var NEGATIVE_UNIT_Z = new cesium_imports_1.Cartesian3(0, 0, -1);
                        var X_90ROT = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_X, cesium_imports_1.CesiumMath.PI_OVER_TWO);
                        var cameraPositionProperty = new cesium_imports_1.ConstantPositionProperty(new cesium_imports_1.Cartesian3(0, 0, AVERAGE_HUMAN_HEIGHT), _this.deviceService.stage);
                        var cameraOrientationProperty = new cesium_imports_1.ConstantProperty(X_90ROT);
                        cesium_imports_1.Matrix3.fromQuaternion(eyeOrientation, orientationMatrix);
                        cesium_imports_1.Matrix3.multiplyByVector(orientationMatrix, cesium_imports_1.Cartesian3.UNIT_Y, up);
                        cesium_imports_1.Matrix3.multiplyByVector(orientationMatrix, cesium_imports_1.Cartesian3.UNIT_X, right);
                        cesium_imports_1.Matrix3.multiplyByVector(orientationMatrix, NEGATIVE_UNIT_Z, forward);
                        var cameraEntity = new cesium_imports_1.Entity({
                            position: cameraPositionProperty,
                            orientation: cameraOrientationProperty
                        });
                        var deviceService = _this.deviceService;
                        var update = function (time) {
                            if (remoteRealitySession.isConnected)
                                deviceService.requestFrame(update);
                            var pose = utils_1.getSerializedEntityPose(_this.deviceService.eye, time);
                            // provide controls if the device does not have a pose
                            if (!pose) {
                                if (aggregator.isMoving(cesium_imports_1.CameraEventType.LEFT_DRAG)) {
                                    var width = element.clientWidth;
                                    var height = element.clientHeight;
                                    // Coordinate (0.0, 0.0) will be where the mouse was clicked.
                                    var movement = aggregator.getMovement(cesium_imports_1.CameraEventType.LEFT_DRAG);
                                    var movementX = (movement.endPosition.x - movement.startPosition.x) / width;
                                    var movementY = -(movement.endPosition.y - movement.startPosition.y) / height;
                                    var lookFactor = 0.05;
                                    yaw -= movementX * lookFactor;
                                    pitch -= movementY * lookFactor;
                                    pitch = Math.max(-cesium_imports_1.CesiumMath.PI_OVER_TWO, Math.min(cesium_imports_1.CesiumMath.PI_OVER_TWO, pitch));
                                    cesium_imports_1.Quaternion.fromHeadingPitchRoll(yaw, pitch, 0, eyeOrientation);
                                    cesium_imports_1.Matrix3.fromQuaternion(eyeOrientation, orientationMatrix);
                                    cesium_imports_1.Matrix3.multiplyByVector(orientationMatrix, cesium_imports_1.Cartesian3.UNIT_Y, up);
                                    cesium_imports_1.Matrix3.multiplyByVector(orientationMatrix, cesium_imports_1.Cartesian3.UNIT_X, right);
                                    cesium_imports_1.Matrix3.multiplyByVector(orientationMatrix, NEGATIVE_UNIT_Z, forward);
                                    cameraOrientationProperty.setValue(eyeOrientation);
                                }
                                var position = cameraPositionProperty.getValue(time, positionScratchCartesian);
                                var moveRate = 0.02;
                                if (flags.moveForward) {
                                    cesium_imports_1.Cartesian3.multiplyByScalar(forward, moveRate, movementScratchCartesian);
                                    cesium_imports_1.Cartesian3.add(position, movementScratchCartesian, position);
                                }
                                if (flags.moveBackward) {
                                    cesium_imports_1.Cartesian3.multiplyByScalar(forward, -moveRate, movementScratchCartesian);
                                    cesium_imports_1.Cartesian3.add(position, movementScratchCartesian, position);
                                }
                                if (flags.moveUp) {
                                    cesium_imports_1.Cartesian3.multiplyByScalar(up, moveRate, movementScratchCartesian);
                                    cesium_imports_1.Cartesian3.add(position, movementScratchCartesian, position);
                                }
                                if (flags.moveDown) {
                                    cesium_imports_1.Cartesian3.multiplyByScalar(up, -moveRate, movementScratchCartesian);
                                    cesium_imports_1.Cartesian3.add(position, movementScratchCartesian, position);
                                }
                                if (flags.moveLeft) {
                                    cesium_imports_1.Cartesian3.multiplyByScalar(right, -moveRate, movementScratchCartesian);
                                    cesium_imports_1.Cartesian3.add(position, movementScratchCartesian, position);
                                }
                                if (flags.moveRight) {
                                    cesium_imports_1.Cartesian3.multiplyByScalar(right, moveRate, movementScratchCartesian);
                                    cesium_imports_1.Cartesian3.add(position, movementScratchCartesian, position);
                                }
                                pose = utils_1.getSerializedEntityPose(cameraEntity, time);
                            }
                            aggregator.reset();
                            var viewState = {
                                time: time,
                                pose: pose,
                                geolocationAccuracy: deviceService.geolocationAccuracy,
                                altitudeAccuracy: deviceService.altitudeAccuracy,
                                compassAccuracy: deviceService.compassAccuracy,
                                viewport: deviceService.viewport,
                                subviews: deviceService.subviews
                            };
                            remoteRealitySession.send('ar.reality.viewState', viewState);
                        };
                        deviceService.requestFrame(update);
                    });
                    callback(realitySession);
                    // Only connect after the caller is able to attach connectEvent handlers
                    var messageChannel = this.sessionService.createSynchronousMessageChannel();
                    realitySession.open(messageChannel.port1, this.sessionService.configuration);
                    remoteRealitySession.open(messageChannel.port2, { role: common_1.Role.REALITY_VIEWER });
                };
                EmptyRealityLoader = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, device_1.DeviceService, view_1.ViewService)
                ], EmptyRealityLoader);
                return EmptyRealityLoader;
            }(reality_1.RealityLoader));
            exports_1("EmptyRealityLoader", EmptyRealityLoader);
        }
    }
});

System.register(['aurelia-dependency-injection', './cesium/cesium-imports', './session', './view', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, session_1, view_1, utils_1;
    var CameraService;
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (cesium_imports_1_1) {
                cesium_imports_1 = cesium_imports_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            /**
             * Manages the camera state
             */
            CameraService = (function () {
                function CameraService(sessionService, viewportService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.viewportService = viewportService;
                    /**
                     * An event that is raised when the current camera state has changed
                     */
                    this.changeEvent = new utils_1.Event();
                    /**
                    * The current camera frustum.
                    */
                    this.currentFrustum = new cesium_imports_1.PerspectiveFrustum;
                    /**
                     * Manager-only. Maps a managed session to it's desired camera state.
                     */
                    this.desiredCameraMap = new WeakMap();
                    if (sessionService.isManager()) {
                        sessionService.connectEvent.addEventListener(function (session) {
                            session.on['ar.camera.desired'] = function (camera) {
                                _this.desiredCameraMap.set(session, camera);
                            };
                        });
                    }
                }
                /**
                 * Get the suggested camera state
                 */
                CameraService.prototype.getSuggested = function () {
                    return {
                        type: "perspective",
                        fovY: cesium_imports_1.CesiumMath.toRadians(60)
                    };
                };
                /**
                 * Set the desired camera state
                 */
                CameraService.prototype.setDesired = function (state) {
                    this.desired = state;
                    this.sessionService.manager.send('ar.camera.desired', state);
                };
                /**
                 * Set the current camera state. Called internally.
                 */
                CameraService.prototype._setCamera = function (camera) {
                    var json = JSON.stringify(camera);
                    if (this._currentJSON !== json) {
                        var previous = this.current;
                        this.current = camera;
                        this._currentJSON = json;
                        if (camera.type === 'perspective') {
                            var perspectiveCamera = camera;
                            if (!perspectiveCamera.fovX && !perspectiveCamera.fovY) {
                                console.error('Camera state is invalid: both fovX and fovY are missing.');
                                return;
                            }
                            var frustum = this.currentFrustum;
                            var aspect = frustum.aspectRatio = perspectiveCamera.fovX && perspectiveCamera.fovY ?
                                Math.tan(perspectiveCamera.fovX * 0.5) / Math.tan(perspectiveCamera.fovY * 0.5) :
                                this.viewportService.element.clientWidth / this.viewportService.element.clientWidth;
                            if (aspect > 1) {
                                if (!perspectiveCamera.fovX)
                                    perspectiveCamera.fovX = 2 * Math.atan(Math.tan(perspectiveCamera.fovY * 0.5) * aspect);
                                frustum.fov = perspectiveCamera.fovX;
                            }
                            else {
                                if (!perspectiveCamera.fovY)
                                    perspectiveCamera.fovY = 2 * Math.atan(Math.tan(perspectiveCamera.fovX * 0.5) / aspect);
                                frustum.fov = perspectiveCamera.fovY;
                            }
                            frustum['xOffset'] = perspectiveCamera.xOffset;
                            frustum['yOffset'] = perspectiveCamera.yOffset;
                        }
                        this.changeEvent.raiseEvent({ previous: previous });
                    }
                };
                CameraService = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, view_1.ViewService)
                ], CameraService);
                return CameraService;
            }());
            exports_1("CameraService", CameraService);
        }
    }
});

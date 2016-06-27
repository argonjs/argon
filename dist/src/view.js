System.register(['aurelia-dependency-injection', './cesium/cesium-imports', './common', './session', './context', './utils', './focus'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, common_1, session_1, context_2, utils_1, focus_1;
    var ViewService;
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
            function (context_2_1) {
                context_2 = context_2_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (focus_1_1) {
                focus_1 = focus_1_1;
            }],
        execute: function() {
            /**
             * Manages the view state
             */
            ViewService = (function () {
                function ViewService(sessionService, focusService, contextService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.focusService = focusService;
                    this.contextService = contextService;
                    /**
                     * An event that is raised when the root viewport has changed
                     */
                    this.viewportChangeEvent = new utils_1.Event();
                    /**
                     * An event that is raised when ownership of the view has been acquired by this application
                     */
                    this.acquireEvent = new utils_1.Event();
                    /**
                     * An event that is raised when ownership of the view has been released from this application
                    */
                    this.releaseEvent = new utils_1.Event();
                    this.desiredViewportMap = new WeakMap();
                    this._subviewEntities = [];
                    this._scratchFrustum = new cesium_imports_1.PerspectiveFrustum();
                    if (typeof document !== 'undefined') {
                        var viewportMetaTag = document.querySelector('meta[name=viewport]');
                        if (!viewportMetaTag)
                            viewportMetaTag = document.createElement('meta');
                        viewportMetaTag.name = 'viewport';
                        viewportMetaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
                        document.head.appendChild(viewportMetaTag);
                        var argonContainer_1 = document.querySelector('#argon');
                        if (!argonContainer_1)
                            argonContainer_1 = document.createElement('div');
                        argonContainer_1.id = 'argon';
                        argonContainer_1.classList.add('argon-view');
                        var element = document.createElement('div');
                        element.style.width = '100%';
                        element.style.height = '100%';
                        element.classList.add('argon-view');
                        this.element = element;
                        argonContainer_1.insertBefore(this.element, argonContainer_1.firstChild);
                        if (document.body)
                            document.body.appendChild(argonContainer_1);
                        else {
                            document.documentElement.appendChild(argonContainer_1);
                            document.addEventListener('DOMContentLoaded', function () {
                                document.body.appendChild(argonContainer_1);
                            });
                        }
                        var style = document.createElement("style");
                        style.type = 'text/css';
                        document.head.insertBefore(style, document.head.firstChild);
                        var sheet = style.sheet;
                        sheet.insertRule("\n                #argon {\n                    position: fixed;\n                    left: 0px;\n                    bottom: 0px;\n                    width: 100%;\n                    height: 100%;\n                    margin: 0;\n                    border: 0;\n                    padding: 0;\n                }\n            ", 0);
                        sheet.insertRule("\n                .argon-view > * {\n                    position: absolute;\n                    pointer-events: none;\n                }\n            ", 1);
                        this.focusService.focusEvent.addEventListener(function () {
                            argonContainer_1.classList.remove('argon-no-focus');
                            argonContainer_1.classList.add('argon-focus');
                        });
                        this.focusService.blurEvent.addEventListener(function () {
                            argonContainer_1.classList.remove('argon-focus');
                            argonContainer_1.classList.add('argon-no-focus');
                        });
                    }
                    if (this.sessionService.isManager) {
                        this.sessionService.connectEvent.addEventListener(function (session) {
                            session.on['ar.viewport.desired'] = function (viewport) {
                                _this.desiredViewportMap.set(session, viewport);
                            };
                        });
                        this.contextService.prepareEvent.addEventListener(function (_a) {
                            var serializedState = _a.serializedState, state = _a.state;
                            if (!cesium_imports_1.defined(state.view)) {
                                if (!cesium_imports_1.defined(serializedState.eye))
                                    throw new Error("Unable to construct view configuration: missing eye parameters");
                                state.view = _this.generateViewFromFrameStateEye(serializedState);
                            }
                        });
                    }
                    this.contextService.renderEvent.addEventListener(function () {
                        var state = _this.contextService.state;
                        var subviewEntities = _this._subviewEntities;
                        subviewEntities.length = 0;
                        state.view.subviews.forEach(function (subview, index) {
                            var id = 'ar.view_' + index;
                            state.entities[id] = subview.pose || state.view.pose;
                            _this.contextService.updateEntityFromFrameState(id, state);
                            delete state.entities[id];
                            subviewEntities[index] = _this.contextService.entities.getById(id);
                        });
                        _this.update();
                    });
                }
                ViewService.prototype.getSubviews = function (referenceFrame) {
                    var _this = this;
                    this.update();
                    var subviews = [];
                    this._current.subviews.forEach(function (subview, index) {
                        var subviewEntity = _this._subviewEntities[index];
                        subviews[index] = {
                            index: index,
                            type: subview.type,
                            pose: _this.contextService.getEntityPose(subviewEntity, referenceFrame),
                            projectionMatrix: subview.projectionMatrix,
                            viewport: subview.viewport || _this._current.viewport
                        };
                    });
                    return subviews;
                };
                ViewService.prototype.getViewport = function () {
                    return this._current.viewport;
                };
                /**
                 * Set the desired root viewport
                 */
                ViewService.prototype.setDesiredViewport = function (viewport) {
                    this.sessionService.manager.send('ar.view.desiredViewport', viewport);
                };
                /**
                 * Request control over the view.
                 * The manager is likely to reject this request if this application is not in focus.
                 * When running on an HMD, this request will always fail. If the current reality view
                 * does not support custom views, this request will fail. The manager may revoke
                 * ownership at any time (even without this application calling releaseOwnership)
                 */
                ViewService.prototype.requestOwnership = function () {
                };
                /**
                 * Release control over the view.
                 */
                ViewService.prototype.releaseOwnership = function () {
                };
                /**
                 * Returns true if this application has control over the view.
                 */
                ViewService.prototype.isOwner = function () {
                };
                /**
                 * Returns a maximum viewport
                 */
                ViewService.prototype.getMaximumViewport = function () {
                    if (window && document && document.documentElement) {
                        return {
                            x: 0,
                            y: 0,
                            width: document.documentElement.clientWidth,
                            height: document.documentElement.clientHeight
                        };
                    }
                    throw new Error("Not implemeneted for the current platform");
                };
                ViewService.prototype.generateViewFromFrameStateEye = function (state) {
                    var eye = state.eye;
                    if (!eye)
                        throw new Error("Expected a frame state with an eye configuration");
                    var viewport = this.getMaximumViewport();
                    this._scratchFrustum.fov = eye.fov || Math.PI / 3;
                    this._scratchFrustum.aspectRatio = viewport.width / viewport.height;
                    this._scratchFrustum.near = 0.01;
                    return {
                        viewport: viewport,
                        pose: eye.pose,
                        subviews: [
                            {
                                type: common_1.SubviewType.SINGULAR,
                                projectionMatrix: this._scratchFrustum.infiniteProjectionMatrix
                            }
                        ]
                    };
                };
                ViewService.prototype.update = function () {
                    var view = this.contextService.state.view;
                    var viewportJSON = JSON.stringify(view.viewport);
                    var previousViewport = this._current && this._current.viewport;
                    this._current = view;
                    if (!this._currentViewportJSON || this._currentViewportJSON !== viewportJSON) {
                        this._currentViewportJSON = viewportJSON;
                        if (this.element) {
                            var viewport = view.viewport;
                            this.element.style.left = viewport.x + 'px';
                            this.element.style.bottom = viewport.y + 'px';
                            this.element.style.width = (viewport.width / document.documentElement.clientWidth) * 100 + '%';
                            this.element.style.height = (viewport.height / document.documentElement.clientHeight) * 100 + '%';
                        }
                        this.viewportChangeEvent.raiseEvent({ previous: previousViewport });
                    }
                };
                ViewService = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService, focus_1.FocusService, context_2.ContextService)
                ], ViewService);
                return ViewService;
            }());
            exports_1("ViewService", ViewService);
        }
    }
});
//# sourceMappingURL=view.js.map
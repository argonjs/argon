System.register(['aurelia-dependency-injection', './session', './context', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, session_1, context_2, utils_1;
    var ViewService;
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (context_2_1) {
                context_2 = context_2_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            /**
             * Manages the view state
             */
            ViewService = (function () {
                function ViewService(sessionService, contextService) {
                    var _this = this;
                    this.sessionService = sessionService;
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
                    this.desiredProjectionMatrixMap = new WeakMap();
                    if (typeof document !== 'undefined') {
                        var viewportMetaTag = document.querySelector('meta[name=viewport]');
                        if (!viewportMetaTag)
                            viewportMetaTag = document.createElement('meta');
                        viewportMetaTag.name = 'viewport';
                        viewportMetaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
                        document.head.appendChild(viewportMetaTag);
                        var argonView_1 = document.querySelector('#argon');
                        if (!argonView_1)
                            argonView_1 = document.createElement('div');
                        argonView_1.id = 'argon';
                        document.documentElement.appendChild(argonView_1);
                        this.element = argonView_1;
                        if (document.body)
                            document.body.appendChild(argonView_1);
                        else {
                            document.addEventListener('DOMContentLoaded', function () {
                                document.body.appendChild(argonView_1);
                            });
                        }
                        var style = document.createElement("style");
                        style.type = 'text/css';
                        document.head.appendChild(style);
                        var sheet = style.sheet;
                        sheet.insertRule("\n                #argon {\n                    position: fixed;\n                    transform: translateZ(0px);\n                    z-index: -9999;\n                    left: 0px;\n                    bottom: 0px;\n                    width: 100%;\n                    height: 100%;\n                    margin: 0;\n                    border: 0;\n                    padding: 0;\n                }\n            ", 0);
                        sheet.insertRule("\n                #argon > * {\n                    position: absolute;\n                    transform: translateZ(0px);\n                    left: 0px;\n                    bottom: 0px;\n                }\n            ", 1);
                    }
                    if (this.sessionService.isManager()) {
                        this.sessionService.connectEvent.addEventListener(function (session) {
                            session.on['ar.viewport.desired'] = function (viewport) {
                                _this.desiredViewportMap.set(session, viewport);
                            };
                        });
                    }
                    this.contextService.renderEvent.addEventListener(function () {
                        _this._setViewParameters(_this.contextService.state.view);
                    });
                }
                ViewService.prototype.getSubviews = function (referenceFrame) {
                    var _this = this;
                    var subviews = [];
                    this._current.subviews.forEach(function (subview, index) {
                        var viewEntity = _this.contextService.entities.getById('ar.view_' + index);
                        subviews[index] = {
                            type: subview.type,
                            pose: _this.contextService.getEntityPose(viewEntity, referenceFrame),
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
                ViewService.prototype._setViewParameters = function (view) {
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
                    aurelia_dependency_injection_1.inject(session_1.SessionService, context_2.ContextService)
                ], ViewService);
                return ViewService;
            }());
            exports_1("ViewService", ViewService);
        }
    }
});

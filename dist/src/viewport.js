System.register(['aurelia-dependency-injection', './session', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, session_1, utils_1;
    var ViewportService;
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            /**
             * Manages the viewport
             */
            ViewportService = (function () {
                function ViewportService(sessionService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    /**
                     * An event that is raised when the current viewport state has changed
                     */
                    this.changeEvent = new utils_1.Event();
                    this.desiredViewportMap = new WeakMap();
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
                        sheet.insertRule("\n                #argon > * {\n                    position: absolute;\n                    transform: translateZ(0px);\n                    left: 0px;\n                    bottom: 0px;\n                    width: inherit;\n                    height: inherit;\n                }\n            ", 1);
                        this.changeEvent.addEventListener(function () {
                            _this.element.style.left = _this.current.x + 'px';
                            _this.element.style.bottom = _this.current.y + 'px';
                            _this.element.style.width = _this.current.width + 'px';
                            _this.element.style.height = _this.current.height + 'px';
                        });
                    }
                    if (this.sessionService.isManager()) {
                        this.sessionService.connectEvent.addEventListener(function (session) {
                            session.on['ar.viewport.desired'] = function (viewport) {
                                _this.desiredViewportMap.set(session, viewport);
                            };
                        });
                    }
                }
                /**
                 * Returns the suggested viewport. By default, returns the width and height of the
                 * document.documentElement (if DOM is available), otherwise, returns {width:0, height:0}
                 */
                ViewportService.prototype.getSuggested = function () {
                    if (typeof document !== 'undefined') {
                        return {
                            x: 0,
                            y: 0,
                            width: document.documentElement.clientWidth,
                            height: document.documentElement.clientHeight
                        };
                    }
                    return { x: 0, y: 0, width: 0, height: 0 };
                };
                /**
                 * Set the desired viewport
                 */
                ViewportService.prototype.setDesired = function (viewport) {
                    this.desired = viewport;
                    this.sessionService.manager.send('ar.viewport.desired', viewport);
                };
                /**
                 * Set the current viewport. Called internally.
                 */
                ViewportService.prototype._setViewport = function (viewport) {
                    var previous = this.current;
                    if (!previous ||
                        previous.x !== viewport.x ||
                        previous.y !== viewport.y ||
                        previous.width !== viewport.width ||
                        previous.height !== viewport.height) {
                        this.current = viewport;
                        this.changeEvent.raiseEvent({ previous: previous });
                    }
                };
                ViewportService = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService)
                ], ViewportService);
                return ViewportService;
            }());
            exports_1("ViewportService", ViewportService);
        }
    }
});

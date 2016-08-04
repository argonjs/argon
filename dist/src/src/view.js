System.register(['aurelia-dependency-injection', './cesium/cesium-imports', './session', './context', './utils', './focus', './reality'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, session_1, context_2, utils_1, focus_1, reality_1;
    var argonContainer, argonContainerPromise, ViewService, PinchZoomService;
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
            function (context_2_1) {
                context_2 = context_2_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (focus_1_1) {
                focus_1 = focus_1_1;
            },
            function (reality_1_1) {
                reality_1 = reality_1_1;
            }],
        execute: function() {
            // setup our DOM environment
            if (typeof document !== 'undefined' && document.createElement) {
                var viewportMetaTag = document.querySelector('meta[name=viewport]');
                if (!viewportMetaTag)
                    viewportMetaTag = document.createElement('meta');
                viewportMetaTag.name = 'viewport';
                viewportMetaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
                document.head.appendChild(viewportMetaTag);
                var argonMetaTag = document.querySelector('meta[name=argon]');
                if (!argonMetaTag)
                    argonMetaTag = document.createElement('meta');
                argonMetaTag.name = 'argon';
                document.head.appendChild(argonMetaTag);
                argonContainerPromise = new Promise(function (resolve) {
                    var resolveArgonContainer = function () {
                        var container = document.querySelector('#argon');
                        if (!container)
                            container = document.createElement('div');
                        container.id = 'argon';
                        container.classList.add('argon-view');
                        document.body.appendChild(container);
                        argonContainer = container;
                        resolve(container);
                    };
                    if (document.readyState == 'loading') {
                        document.addEventListener('DOMContentLoaded', resolveArgonContainer);
                    }
                    else {
                        resolveArgonContainer();
                    }
                });
                var style = document.createElement("style");
                style.type = 'text/css';
                document.head.insertBefore(style, document.head.firstChild);
                var sheet = style.sheet;
                sheet.insertRule("\n        #argon {\n            position: fixed;\n            left: 0px;\n            bottom: 0px;\n            width: 100%;\n            height: 100%;\n            margin: 0;\n            border: 0;\n            padding: 0;\n        }\n    ", 0);
                sheet.insertRule("\n        .argon-view > * {\n            position: absolute;\n            pointer-events: none;\n        }\n    ", 1);
            }
            /**
             * Manages the view state
             */
            ViewService = (function () {
                function ViewService(containerElement, sessionService, focusService, contextService) {
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
                    /**
                     *  Manager-only. A map of sessions to their desired viewports.
                     */
                    this.desiredViewportMap = new WeakMap();
                    this._subviews = [];
                    this._subviewEntities = [];
                    this._frustums = [];
                    if (typeof document !== 'undefined' && document.createElement) {
                        var element_1 = this.element = document.createElement('div');
                        element_1.style.width = '100%';
                        element_1.style.height = '100%';
                        element_1.classList.add('argon-view');
                        this.containingElementPromise = new Promise(function (resolve) {
                            if (containerElement && containerElement instanceof HTMLElement) {
                                containerElement.insertBefore(element_1, containerElement.firstChild);
                                resolve(containerElement);
                            }
                            else {
                                argonContainer = document.querySelector('#argon');
                                if (argonContainer) {
                                    argonContainer.insertBefore(element_1, argonContainer.firstChild);
                                    resolve(argonContainer);
                                }
                                else {
                                    argonContainerPromise.then(function (argonContainer) {
                                        argonContainer.insertBefore(element_1, argonContainer.firstChild);
                                        resolve(argonContainer);
                                    });
                                }
                                _this.focusService.focusEvent.addEventListener(function () {
                                    argonContainerPromise.then(function (argonContainer) {
                                        argonContainer.classList.remove('argon-no-focus');
                                        argonContainer.classList.add('argon-focus');
                                    });
                                });
                                _this.focusService.blurEvent.addEventListener(function () {
                                    argonContainerPromise.then(function (argonContainer) {
                                        argonContainer.classList.remove('argon-focus');
                                        argonContainer.classList.add('argon-no-focus');
                                    });
                                });
                            }
                        });
                    }
                    if (this.sessionService.isManager) {
                        this.sessionService.connectEvent.addEventListener(function (session) {
                            session.on['ar.viewport.desired'] = function (viewport) {
                                _this.desiredViewportMap.set(session, viewport);
                            };
                        });
                    }
                    this.contextService.renderEvent.addEventListener(function () {
                        var state = _this.contextService.serializedFrameState;
                        var subviewEntities = _this._subviewEntities;
                        subviewEntities.length = 0;
                        state.view.subviews.forEach(function (subview, index) {
                            var id = 'ar.view_' + index;
                            state.entities[id] = subview.pose || state.view.pose;
                            _this.contextService.updateEntityFromFrameState(id, state);
                            delete state.entities[id];
                            subviewEntities[index] = _this.contextService.entities.getById(id);
                        });
                        _this._update();
                    });
                }
                ViewService.prototype.getSubviews = function (referenceFrame) {
                    var _this = this;
                    this._update();
                    var subviews = this._subviews;
                    subviews.length = this._current.subviews.length;
                    this._current.subviews.forEach(function (serializedSubview, index) {
                        var subviewEntity = _this._subviewEntities[index];
                        var subview = subviews[index] = subviews[index] || {};
                        subview.index = index;
                        subview.type = serializedSubview.type;
                        subview.pose = _this.contextService.getEntityPose(subviewEntity, referenceFrame);
                        subview.viewport = serializedSubview.viewport || _this._current.viewport;
                        subview.frustum = _this._frustums[index];
                        if (!subview.frustum) {
                            subview.frustum = _this._frustums[index] = new cesium_imports_1.PerspectiveFrustum();
                            subview.frustum.near = 0.01;
                            subview.frustum.far = 10000000;
                        }
                        subview.frustum.fov = serializedSubview.frustum.fov;
                        subview.frustum.aspectRatio = serializedSubview.frustum.aspectRatio || subview.viewport.width / subview.viewport.height;
                        subview.frustum.xOffset = serializedSubview.frustum.xOffset || 0;
                        subview.frustum.yOffset = serializedSubview.frustum.yOffset || 0;
                        subview.projectionMatrix = serializedSubview.projectionMatrix || subview.frustum.infiniteProjectionMatrix;
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
                // Updates the element, if necessary, and raise a view change event
                ViewService.prototype._update = function () {
                    var _this = this;
                    var state = this.contextService.serializedFrameState;
                    if (!state)
                        throw new Error('Expected state to be defined');
                    var view = state.view;
                    var viewportJSON = JSON.stringify(view.viewport);
                    var previousViewport = this._current && this._current.viewport;
                    this._current = view;
                    if (!this._currentViewportJSON || this._currentViewportJSON !== viewportJSON) {
                        this._currentViewportJSON = viewportJSON;
                        if (this.element) {
                            requestAnimationFrame(function () {
                                var viewport = view.viewport;
                                _this.element.style.left = viewport.x + 'px';
                                _this.element.style.bottom = viewport.y + 'px';
                                _this.element.style.width = viewport.width + 'px';
                                _this.element.style.height = viewport.height + 'px';
                            });
                        }
                        this.viewportChangeEvent.raiseEvent({ previous: previousViewport });
                    }
                };
                ViewService = __decorate([
                    aurelia_dependency_injection_1.inject('containerElement', session_1.SessionService, focus_1.FocusService, context_2.ContextService)
                ], ViewService);
                return ViewService;
            }());
            exports_1("ViewService", ViewService);
            PinchZoomService = (function () {
                function PinchZoomService(viewService, realityService, contextService, sessionService) {
                    var _this = this;
                    this.viewService = viewService;
                    this.realityService = realityService;
                    this.contextService = contextService;
                    this.sessionService = sessionService;
                    if (this.sessionService.isManager) {
                        this.viewService.containingElementPromise.then(function (el) {
                            el.style.pointerEvents = 'auto';
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
                                            _this.realityService.zoom({ zoom: zoom_1, fov: fov, state: reality_1.RealityZoomState.START });
                                        }
                                        else {
                                            // change pinch
                                            zoom_1 = currDistSquared / startDistSquared_1;
                                            _this.realityService.zoom({ zoom: zoom_1, fov: fov, state: reality_1.RealityZoomState.CHANGE });
                                        }
                                    }
                                    else {
                                        // end pinch                            
                                        _this.realityService.zoom({ zoom: zoom_1, fov: fov, state: reality_1.RealityZoomState.END });
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
                                        _this.realityService.zoom({ zoom: ev.scale, fov: fov, state: reality_1.RealityZoomState.START });
                                    }
                                });
                                el.addEventListener('gesturechange', function (ev) {
                                    _this.realityService.zoom({ zoom: ev.scale, fov: fov, state: reality_1.RealityZoomState.CHANGE });
                                });
                                el.addEventListener('gestureend', function (ev) {
                                    _this.realityService.zoom({ zoom: ev.scale, fov: fov, state: reality_1.RealityZoomState.END });
                                });
                            }
                        });
                    }
                }
                PinchZoomService = __decorate([
                    aurelia_dependency_injection_1.inject(ViewService, reality_1.RealityService, context_2.ContextService, session_1.SessionService)
                ], PinchZoomService);
                return PinchZoomService;
            }());
            exports_1("PinchZoomService", PinchZoomService);
        }
    }
});
//# sourceMappingURL=view.js.map
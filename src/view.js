System.register(['aurelia-dependency-injection', './cesium/cesium-imports', './common', './session', './context', './utils', './focus', './reality'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, common_1, session_1, context_2, utils_1, focus_1, reality_1;
    var argonContainer, argonContainerPromise, IDENTITY_SUBVIEW_POSE, ViewService;
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
                        // prevent pinch-zoom of the page in ios 10.
                        argonContainer.addEventListener('touchmove', function (event) {
                            event.preventDefault();
                        }, true);
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
                sheet.insertRule("\n        #argon {\n            position: fixed;\n            left: 0px;\n            bottom: 0px;\n            width: 100%;\n            height: 100%;\n            margin: 0;\n            border: 0;\n            padding: 0;\n        }\n    ", sheet.cssRules.length);
                sheet.insertRule("\n        .argon-view {\n            overflow: hidden;\n            -webkit-tap-highlight-color: initial;\n            -webkit-user-select: none;\n            -webkit-tap-highlight-color: transparent;\n            user-select: none;\n        }\n    ", sheet.cssRules.length);
                sheet.insertRule("\n        .argon-view > * {\n            position: absolute;\n        }\n    ", sheet.cssRules.length);
                sheet.insertRule("\n        .argon-view > * > * {\n            -webkit-tap-highlight-color: initial;\n        }\n    ", sheet.cssRules.length);
            }
            IDENTITY_SUBVIEW_POSE = { p: cesium_imports_1.Cartesian3.ZERO, o: cesium_imports_1.Quaternion.IDENTITY, r: 'ar.user' };
            /**
             * Manages the view state
             */
            ViewService = (function () {
                function ViewService(containerElement, sessionService, focusService, realityService, contextService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.focusService = focusService;
                    this.realityService = realityService;
                    this.contextService = contextService;
                    /**
                     * UI events that occur within this view. To handle an event (and prevent it from
                     * being forwarded to another layer) call event.stopImmediatePropagation().
                     */
                    this.uiEvent = new utils_1.Event();
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
                        this.containingElementPromise.then(function (container) {
                            _this.containingElement = container;
                        });
                        if (this.sessionService.isRealityViewer) {
                            this._setupEventSynthesizing();
                        }
                        else {
                            this._setupEventForwarding();
                        }
                    }
                    if (this.sessionService.isRealityManager) {
                        this.sessionService.connectEvent.addEventListener(function (session) {
                            session.on['ar.viewport.desired'] = function (viewport) {
                                _this.desiredViewportMap.set(session, viewport);
                            };
                            session.on['ar.view.uievent'] = function (uievent) {
                                if (_this.realityService.session && _this.realityService.session.isConnected) {
                                    _this.realityService.session.send('ar.view.uievent', uievent);
                                }
                            };
                        });
                    }
                    this.contextService.renderEvent.addEventListener(function () {
                        var state = _this.contextService.serializedFrameState;
                        state.view.subviews.forEach(function (subview, index) {
                            var id = 'ar.view_' + index;
                            var subviewPose = subview.pose || IDENTITY_SUBVIEW_POSE;
                            _this.contextService.updateEntityFromSerializedPose(id, subviewPose);
                        });
                        _this._update();
                    });
                }
                ViewService.prototype.getSubviews = function (referenceFrame) {
                    var _this = this;
                    this._update();
                    var subviews = this._subviews;
                    var viewState = this.contextService.serializedFrameState.view;
                    subviews.length = viewState.subviews.length;
                    viewState.subviews.forEach(function (serializedSubview, index) {
                        var id = 'ar.view_' + index;
                        var subviewEntity = _this.contextService.entities.getById(id);
                        var subview = subviews[index] =
                            subviews[index] || {};
                        subview.index = index;
                        subview.type = serializedSubview.type;
                        subview.pose = _this.contextService.getEntityPose(subviewEntity, referenceFrame);
                        subview.viewport = serializedSubview.viewport || {
                            x: 0,
                            y: 0,
                            width: viewState.viewport.width,
                            height: viewState.viewport.height
                        };
                        subview.frustum = _this._frustums[index] =
                            _this._frustums[index] || new cesium_imports_1.PerspectiveFrustum();
                        utils_1.decomposePerspectiveProjectionMatrix(serializedSubview.projectionMatrix, subview.frustum);
                        subview['projectionMatrix'] = serializedSubview.projectionMatrix;
                    });
                    return subviews;
                };
                /**
                 * Get the current viewport
                 */
                ViewService.prototype.getViewport = function () {
                    return this.contextService.serializedFrameState.view.viewport;
                };
                // /**
                //  * Request to present the view in an HMD.
                //  */
                // public requestPresent() {
                //     if (this.deviceService.vrDisplay) {
                //         const layers:VRLayer[] = [];
                //         layers[0] = {source:this.element.querySelector('canvas')};
                //         return this.deviceService.vrDisplay.requestPresent(layers);
                //     } else {
                //         return this.requestFullscreen();
                //     }
                // }
                // /**
                //  * Exit preseting in an HMD
                //  */
                // public exitPresent() {
                //     if (this.deviceService.vrDisplay) {
                //         return this.deviceService.vrDisplay.exitPresent();
                //     }
                //     return Promise.reject(new Error("Not presenting"));
                // }
                /**
                 * Request to present the view in fullscreen
                 */
                ViewService.prototype.requestFullscreen = function () {
                    return this.containingElementPromise.then(function (container) {
                        if (container.requestFullscreen)
                            return container.requestFullscreen();
                        if (container.webkitRequestFullscreen)
                            return container.webkitRequestFullscreen();
                    });
                };
                /**
                 * Handle UI Events. Meant to be overwritten by apps.
                 * By default, an event will be forwarded to the reality viewer.
                 * If the event is handled by the app, then evt.stopImmediatePropagation()
                 * should be called to stop the event from being forwarded to the
                 * reality viewer.
                 */
                ViewService.prototype.onUIEvent = function (evt) {
                    // default: do nothing
                };
                /**
                 * Set the desired root viewport
                 * @private
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
                 * @private
                 */
                ViewService.prototype.requestOwnership = function () {
                };
                /**
                 * Release control over the view.
                 * @private
                 */
                ViewService.prototype.releaseOwnership = function () {
                };
                /**
                 * Returns true if this application has control over the view.
                 * @private
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
                    var previousViewport = this._currentViewport;
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
                    this._currentViewport = common_1.Viewport.clone(view.viewport, this._currentViewport);
                };
                ViewService.prototype._setupEventForwarding = function () {
                    var _this = this;
                    this.realityService.connectEvent.addEventListener(function (realitySession) {
                        _this._currentRealitySession = realitySession;
                        realitySession.closeEvent.addEventListener(function () {
                            _this._currentRealitySession = undefined;
                        });
                    });
                    var cloneTouch = function (touch, boundingRect) {
                        return {
                            identifier: touch.identifier,
                            clientX: touch.clientX - boundingRect.left,
                            clientY: touch.clientY - boundingRect.top,
                            screenX: touch.screenX,
                            screenY: touch.screenY
                        };
                    };
                    var cloneTouches = function (touches, boundingRect) {
                        if (!touches)
                            return undefined;
                        var touchList = [];
                        for (var i = 0; i < touches.length; i++) {
                            var touch = touches.item(i);
                            touchList[i] = cloneTouch(touch, boundingRect);
                        }
                        return touchList;
                    };
                    var raiseEvent = function (uiEvent) {
                        _this.uiEvent.raiseEvent(uiEvent);
                    };
                    var forwardEvent = function (e) {
                        e.preventDefault();
                        if (_this._currentRealitySession) {
                            var boundingRect = _this.element.getBoundingClientRect();
                            var touches = cloneTouches(e.touches, boundingRect);
                            var changedTouches = cloneTouches(e.changedTouches, boundingRect);
                            var targetTouches = cloneTouches(e.targetTouches, boundingRect);
                            _this.sessionService.manager.send('ar.view.uievent', {
                                type: e.type,
                                bubbles: e.bubbles,
                                cancelable: e.cancelable,
                                detail: e.detail,
                                altKey: e.altKey,
                                ctrlKey: e.ctrlKey,
                                metaKey: e.metaKey,
                                button: e.button,
                                buttons: e.buttons,
                                clientX: e.clientX - boundingRect.left,
                                clientY: e.clientY - boundingRect.top,
                                screenX: e.screenX,
                                screenY: e.screenY,
                                movementX: e.movementX,
                                movementY: e.movementY,
                                deltaX: e.deltaX,
                                deltaY: e.deltaY,
                                deltaZ: e.deltaZ,
                                deltaMode: e.deltaMode,
                                wheelDelta: e.wheelDelta,
                                wheelDeltaX: e.wheelDeltaX,
                                wheelDeltaY: e.wheelDeltaY,
                                which: e.which,
                                timeStamp: e.timeStamp,
                                touches: touches,
                                changedTouches: changedTouches,
                                targetTouches: targetTouches
                            });
                        }
                    };
                    ['wheel',
                        'click',
                        'dblclick',
                        'contextmenu',
                        'mouseover',
                        'mouseout',
                        'mousemove',
                        'mousedown',
                        'mouseup',
                        'touchstart',
                        'touchend',
                        'touchmove',
                        'touchcancel'
                    ].forEach(function (type) {
                        _this.element.addEventListener(type, raiseEvent, false);
                        _this.element.addEventListener(type, forwardEvent, false);
                    });
                };
                ViewService.prototype._setupEventSynthesizing = function () {
                    var currentTarget;
                    var fireMouseLeaveEvents = function (target, relatedTarget, uievent) {
                        if (!target)
                            return;
                        var eventInit = {
                            view: uievent.view,
                            clientX: uievent.clientX,
                            clientY: uievent.clientY,
                            screenX: uievent.screenX,
                            screenY: uievent.screenY,
                            relatedTarget: relatedTarget
                        };
                        // fire mouseout
                        eventInit.bubbles = true;
                        target.dispatchEvent(new MouseEvent('mouseout', eventInit));
                        // fire mouseleave events
                        eventInit.bubbles = false;
                        var el = target;
                        do {
                            el.dispatchEvent(new MouseEvent('mouseleave', eventInit));
                            el = el['parentElement'];
                        } while (el);
                    };
                    var fireMouseEnterEvents = function (target, relatedTarget, uievent) {
                        var eventInit = {
                            view: uievent.view,
                            clientX: uievent.clientX,
                            clientY: uievent.clientY,
                            screenX: uievent.screenX,
                            screenY: uievent.screenY,
                            relatedTarget: relatedTarget
                        };
                        // fire mouseover
                        eventInit.bubbles = true;
                        target.dispatchEvent(new MouseEvent('mouseover', eventInit));
                        // fire mouseenter events
                        eventInit.bubbles = false;
                        var el = target;
                        do {
                            el.dispatchEvent(new MouseEvent('mouseenter', eventInit));
                            el = el['parentElement'];
                        } while (el);
                    };
                    var deserializeTouches = function (touches, target, uievent) {
                        touches.forEach(function (t, i) {
                            touches[i] = document.createTouch(uievent.view, target, t.identifier, t.clientX, t.clientY, t.screenX, t.screenY);
                        });
                        return touches;
                    };
                    var touchTargets = {};
                    this.sessionService.manager.on['ar.view.uievent'] = function (uievent) {
                        uievent.view = window;
                        var target;
                        switch (uievent.type) {
                            case 'wheel':
                                target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                                target.dispatchEvent(new WheelEvent(uievent.type, uievent));
                                break;
                            case 'mouseout':
                                target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                                fireMouseLeaveEvents(currentTarget, undefined, uievent);
                                currentTarget = undefined;
                                break;
                            case 'mouseover':
                                target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                                fireMouseEnterEvents(target, undefined, uievent);
                                currentTarget = target;
                                break;
                            case 'mousemove':
                                target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                                if (target !== currentTarget) {
                                    fireMouseLeaveEvents(currentTarget, target, uievent);
                                    fireMouseEnterEvents(target, currentTarget, uievent);
                                    currentTarget = target;
                                }
                                target.dispatchEvent(new MouseEvent(uievent.type, uievent));
                                break;
                            case 'touchstart':
                                var x = 0, y = 0, length_1 = uievent.changedTouches.length;
                                for (var _i = 0, _a = uievent.changedTouches; _i < _a.length; _i++) {
                                    var t = _a[_i];
                                    x += t.clientX;
                                    y += t.clientY;
                                }
                                x /= length_1;
                                y /= length_1;
                                target = document.elementFromPoint(x, y);
                                for (var _b = 0, _c = uievent.changedTouches; _b < _c.length; _b++) {
                                    var t = _c[_b];
                                    touchTargets[t.identifier] = target;
                                }
                            case 'touchmove':
                            case 'touchend':
                            case 'touchcancel':
                                target = touchTargets[uievent.changedTouches[0].identifier];
                                var evt = document.createEvent('TouchEvent');
                                var touches = document.createTouchList.apply(document, deserializeTouches(uievent.touches, target, uievent));
                                var targetTouches = document.createTouchList.apply(document, deserializeTouches(uievent.targetTouches, target, uievent));
                                var changedTouches = document.createTouchList.apply(document, deserializeTouches(uievent.changedTouches, target, uievent));
                                // Safari, Firefox: must use initTouchEvent.
                                if (typeof evt['initTouchEvent'] === "function") {
                                    evt['initTouchEvent'](uievent.type, uievent.bubbles, uievent.cancelable, uievent.view, uievent.detail, uievent.screenX, uievent.screenY, uievent.clientX, uievent.clientY, uievent.ctrlKey, uievent.altKey, uievent.shiftKey, uievent.metaKey, touches, targetTouches, changedTouches, 1.0, 0.0);
                                }
                                else {
                                    evt.initUIEvent(uievent.type, uievent.bubbles, uievent.cancelable, uievent.view, uievent.detail);
                                    evt.touches = touches;
                                    evt.targetTouches = targetTouches;
                                    evt.changedTouches = changedTouches;
                                }
                                target.dispatchEvent(evt);
                                if (uievent.type === 'touchend' || uievent.type == 'touchcancel') {
                                    for (var _d = 0, _e = uievent.changedTouches; _d < _e.length; _d++) {
                                        var t = _e[_d];
                                        delete touchTargets[t.identifier];
                                    }
                                }
                                break;
                            default:
                                target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                                target.dispatchEvent(new MouseEvent(uievent.type, uievent));
                        }
                    };
                };
                ViewService = __decorate([
                    aurelia_dependency_injection_1.inject('containerElement', session_1.SessionService, focus_1.FocusService, reality_1.RealityService, context_2.ContextService)
                ], ViewService);
                return ViewService;
            }());
            exports_1("ViewService", ViewService);
        }
    }
});

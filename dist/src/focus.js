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
    var FocusService;
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
             * Manages focus state
             */
            FocusService = (function () {
                function FocusService(sessionService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    /**
                     * An event that is raised when this session has gained focus
                     */
                    this.focusEvent = new utils_1.Event();
                    /**
                     * An event that is raised when this session has lost focus
                     */
                    this.blurEvent = new utils_1.Event();
                    this._hasFocus = false;
                    this._sessionFocusEvent = new utils_1.Event();
                    sessionService.manager.on['ar.focus.state'] = function (message) {
                        _this._setFocus(message.state);
                    };
                    if (sessionService.isManager) {
                        setTimeout(function () {
                            if (!_this._session)
                                _this.setSession(_this.sessionService.manager);
                        });
                    }
                }
                Object.defineProperty(FocusService.prototype, "hasFocus", {
                    /**
                     * True if this session has focus
                     */
                    get: function () { return this._hasFocus; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FocusService.prototype, "sessionFocusEvent", {
                    /**
                     * Manager-only. An event that is raised when a managed session has acquired focus.
                     */
                    get: function () {
                        this.sessionService.ensureIsManager();
                        return this._sessionFocusEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Manager-only. The managed session which currently has focus.
                 */
                FocusService.prototype.getSession = function () {
                    this.sessionService.ensureIsManager();
                    return this._session;
                };
                /**
                 *  Manager-only. Grant focus to a managed session.
                 */
                FocusService.prototype.setSession = function (session) {
                    this.sessionService.ensureIsManager();
                    if (!session.isConnected)
                        throw new Error('Only a connected session can be granted focus');
                    var previousFocussedSession = this._session;
                    if (previousFocussedSession !== session) {
                        if (previousFocussedSession)
                            previousFocussedSession.send('ar.focus.state', { state: false });
                        if (session)
                            session.send('ar.focus.state', { state: true });
                        this._session = session;
                        this.sessionFocusEvent.raiseEvent({
                            previous: previousFocussedSession,
                            current: session
                        });
                    }
                };
                FocusService.prototype.whenSessionHasFocus = function (session) {
                    var _this = this;
                    this.sessionService.ensureIsManager();
                    return new Promise(function (resolve) {
                        var remove = _this.sessionFocusEvent.addEventListener(function (_a) {
                            var current = _a.current;
                            if (current === session) {
                                remove();
                                resolve();
                            }
                        });
                    });
                };
                FocusService.prototype._setFocus = function (state) {
                    if (this._hasFocus !== state) {
                        this._hasFocus = state;
                        if (state) {
                            this.focusEvent.raiseEvent(undefined);
                        }
                        else {
                            this.blurEvent.raiseEvent(undefined);
                        }
                    }
                };
                FocusService = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService)
                ], FocusService);
                return FocusService;
            }());
            exports_1("FocusService", FocusService);
        }
    }
});

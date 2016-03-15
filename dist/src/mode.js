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
    var InteractionMode, InteractionModeService;
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
             * Describes the mode of interaction for the user interface.
             */
            (function (InteractionMode) {
                /**
                 * A 2D user interface is considered the primary mode of interaction.
                 * A 3D user interace components may still be presented as a secondary mode of interaction.
                 */
                InteractionMode[InteractionMode["Flat"] = "Flat"] = "Flat";
                /**
                 * A 3D user interface is considered the primary mode of interaction.
                 */
                InteractionMode[InteractionMode["Immersive"] = "Immersive"] = "Immersive";
            })(InteractionMode || (InteractionMode = {}));
            exports_1("InteractionMode", InteractionMode);
            /**
             * Manages the interaction mode state
             */
            InteractionModeService = (function () {
                function InteractionModeService(sessionService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    /**
                     * An event that is raised when the interaction mode has changed
                     */
                    this.changeEvent = new utils_1.Event();
                    /**
                     * The current interaction mode.
                     */
                    this.current = InteractionMode.Immersive;
                    /**
                     * The desired interaction mode.
                     */
                    this.desired = null;
                    /**
                     * Manager-only. A map from a managed session to the desired interaction mode.
                     */
                    this.desiredInteractionModeMap = new WeakMap();
                    if (sessionService.isManager()) {
                        sessionService.connectEvent.addEventListener(function (session) {
                            session.on['ar.interactionMode.desired'] = function (mode) {
                                _this.desiredInteractionModeMap.set(session, mode);
                            };
                        });
                        this.changeEvent.addEventListener(function () {
                            for (var _i = 0, _a = sessionService.managedSessions; _i < _a.length; _i++) {
                                var session = _a[_i];
                                session.send('ar.interactionMode.current', _this.current);
                            }
                        });
                    }
                    sessionService.manager.on['ar.interactionMode.current'] = function (mode) {
                        _this._setMode(mode);
                    };
                }
                InteractionModeService.prototype.setDesired = function (mode) {
                    this.desired = mode;
                    this.sessionService.manager.send('ar.interactionMode.desired', mode);
                };
                /**
                 * Manager-only. Set the interaction mode
                 */
                InteractionModeService.prototype.set = function (mode) {
                    this.sessionService.ensureIsManager();
                    this._setMode(mode);
                };
                InteractionModeService.prototype._setMode = function (mode) {
                    var previous = this.current;
                    this.current = mode;
                    if (previous !== mode) {
                        this.changeEvent.raiseEvent({ previous: previous });
                    }
                };
                InteractionModeService = __decorate([
                    aurelia_dependency_injection_1.inject(session_1.SessionService)
                ], InteractionModeService);
                return InteractionModeService;
            }());
            exports_1("InteractionModeService", InteractionModeService);
        }
    }
});

System.register(['aurelia-dependency-injection', './timer.ts', './session.ts'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, timer_ts_1, session_ts_1;
    var RealityService;
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (timer_ts_1_1) {
                timer_ts_1 = timer_ts_1_1;
            },
            function (session_ts_1_1) {
                session_ts_1 = session_ts_1_1;
            }],
        execute: function() {
            /**
            * Assists in setting up a reality and stores the mappings from realities to their handler functions
            */
            RealityService = (function () {
                /**
                * Assigns a timer, messageChannelFactory, and sessionFactory to this reality setup service. Sets up an empty reality
                */
                function RealityService(timer, messageChannelFactory, sessionFactory) {
                    this.timer = timer;
                    this.messageChannelFactory = messageChannelFactory;
                    this.sessionFactory = sessionFactory;
                    /**
                     * A map of reality types and their respective setup functions.
                     * In order to support a new type of reality, the setup function must be added to this map.
                     */
                    this.handlers = new Map();
                    this.handlers.set('empty', this.setupEmptyReality);
                }
                /**
                 * Setup a reality (a handler for the provided reality type must
                 * exist or an error will be thrown)
                 * @param reality the reality to setup
                 * @param port the port to pass to the setup function
                 */
                RealityService.prototype.setup = function (reality, port) {
                    var handler = this.handlers.get(reality.type);
                    if (!handler)
                        throw new Error("Cannot setup an unsupported reality");
                    handler.call(this, reality, port);
                };
                /**
                * Check if a type of reality is supported by this ArgonSystem.
                * @param type reality type
                * @return true if a handler exists and false otherwise
                */
                RealityService.prototype.isSupported = function (type) {
                    return !!this.handlers.get(type);
                };
                RealityService.prototype.setupEmptyReality = function (reality, port) {
                    var _this = this;
                    var channel = this.messageChannelFactory.create();
                    var remoteRealitySession = this.sessionFactory.create();
                    var doUpdate = true;
                    remoteRealitySession.openEvent.addEventListener(function () {
                        var update = function (time, frameNumber) {
                            if (doUpdate) {
                                var frameState = {
                                    time: time,
                                    frameNumber: frameNumber
                                };
                                remoteRealitySession.send('ar.context.update', frameState);
                                _this.timer.requestFrame(update);
                            }
                        };
                        _this.timer.requestFrame(update);
                    });
                    remoteRealitySession.closeEvent.addEventListener(function () {
                        doUpdate = false;
                    });
                    remoteRealitySession.open(port, { role: session_ts_1.Role.REALITY });
                };
                RealityService = __decorate([
                    aurelia_dependency_injection_1.inject(timer_ts_1.TimerService, session_ts_1.MessageChannelFactory, session_ts_1.SessionFactory)
                ], RealityService);
                return RealityService;
            }());
            exports_1("RealityService", RealityService);
        }
    }
});

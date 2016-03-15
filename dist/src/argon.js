System.register(['aurelia-polyfills', 'aurelia-dependency-injection', './cesium/cesium-imports', './session', './camera', './config', './context', './device', './focus', './mode', './reality', './timer', './vuforia', './viewport', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var aurelia_dependency_injection_1, Cesium, session_1, camera_1, config_1, context_2, device_1, focus_1, mode_1, reality_1, timer_1, vuforia_1, viewport_1;
    var ArgonSystem;
    function init(options) {
        if (options === void 0) { options = {}; }
        var role;
        if (typeof window === 'undefined') {
            role = config_1.Role.MANAGER;
        }
        else if (navigator.userAgent.indexOf('Argon') > 0 || window.top !== window) {
            role = config_1.Role.APPLICATION;
        }
        else {
            role = config_1.Role.MANAGER;
        }
        var config = Object.assign({ role: role, enableIncomingUpdateEvents: role === config_1.Role.APPLICATION }, options.config);
        return new ArgonSystem(config, options.container);
    }
    exports_1("init", init);
    function initReality(options) {
        if (options === void 0) { options = {}; }
        var config = Object.assign({ role: config_1.Role.REALITY }, { enableRealityControlPort: true }, options.config);
        return new ArgonSystem(config, options.container);
    }
    exports_1("initReality", initReality);
    var exportedNames_1 = {
        'ArgonSystem': true,
        'init': true,
        'initReality': true,
        'Container': true,
        'Cesium': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (_1) {},
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (Cesium_1) {
                Cesium = Cesium_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
                exportStar_1(session_1_1);
            },
            function (camera_1_1) {
                camera_1 = camera_1_1;
                exportStar_1(camera_1_1);
            },
            function (config_1_1) {
                config_1 = config_1_1;
                exportStar_1(config_1_1);
            },
            function (context_2_1) {
                context_2 = context_2_1;
                exportStar_1(context_2_1);
            },
            function (device_1_1) {
                device_1 = device_1_1;
                exportStar_1(device_1_1);
            },
            function (focus_1_1) {
                focus_1 = focus_1_1;
                exportStar_1(focus_1_1);
            },
            function (mode_1_1) {
                mode_1 = mode_1_1;
                exportStar_1(mode_1_1);
            },
            function (reality_1_1) {
                reality_1 = reality_1_1;
                exportStar_1(reality_1_1);
            },
            function (timer_1_1) {
                timer_1 = timer_1_1;
                exportStar_1(timer_1_1);
            },
            function (vuforia_1_1) {
                vuforia_1 = vuforia_1_1;
                exportStar_1(vuforia_1_1);
            },
            function (viewport_1_1) {
                viewport_1 = viewport_1_1;
                exportStar_1(viewport_1_1);
            },
            function (utils_1_1) {
                exportStar_1(utils_1_1);
            }],
        execute: function() {
            exports_1("Container", aurelia_dependency_injection_1.Container);
            exports_1("Cesium", Cesium);
            /**
             * A composition root which instantiates the object graph based on a provided configuration
             */
            ArgonSystem = (function () {
                function ArgonSystem(config, container) {
                    if (container === void 0) { container = new aurelia_dependency_injection_1.Container(); }
                    this.container = container;
                    ArgonSystem.instance = this;
                    if (!config.defaultReality)
                        config.defaultReality = { type: 'empty' };
                    container.registerInstance('config', config);
                    container.registerInstance(config_1.Role, config.role);
                    container.registerInstance(ArgonSystem, this);
                    container.registerSingleton(reality_1.RealitySetupHandler, reality_1.EmptyRealitySetupHandler);
                    container.registerSingleton(reality_1.RealitySetupHandler, vuforia_1.VuforiaRealitySetupHandler);
                    if (config.role === config_1.Role.MANAGER) {
                        container.registerSingleton(session_1.ConnectService, session_1.LoopbackConnectService);
                    }
                    else if (session_1.WKWebViewConnectService.isAvailable()) {
                        container.registerSingleton(session_1.ConnectService, session_1.WKWebViewConnectService);
                    }
                    else if (session_1.DebugConnectService.isAvailable()) {
                        container.registerSingleton(session_1.ConnectService, session_1.DebugConnectService);
                    }
                    else if (session_1.DebugConnectService.isAvailable()) {
                        container.registerSingleton(session_1.ConnectService, session_1.DOMConnectService);
                    }
                    else {
                        container.registerSingleton(session_1.ConnectService, session_1.LoopbackConnectService);
                    }
                    // ensure the entire object graph is instantiated before connecting to the manager. 
                    for (var _i = 0, _a = Object.keys(ArgonSystem.prototype); _i < _a.length; _i++) {
                        var key = _a[_i];
                        this[key];
                    }
                    this.session.connect();
                }
                Object.defineProperty(ArgonSystem.prototype, "camera", {
                    get: function () {
                        return this.container.get(camera_1.CameraService);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "context", {
                    get: function () {
                        return this.container.get(context_2.ContextService);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "device", {
                    get: function () {
                        return this.container.get(device_1.DeviceService);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "focus", {
                    get: function () {
                        return this.container.get(focus_1.FocusService);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "interactionMode", {
                    get: function () {
                        return this.container.get(mode_1.InteractionModeService);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "reality", {
                    get: function () {
                        return this.container.get(reality_1.RealityService);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "session", {
                    get: function () {
                        return this.container.get(session_1.SessionService);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "timer", {
                    get: function () {
                        return this.container.get(timer_1.TimerService);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "viewport", {
                    get: function () {
                        return this.container.get(viewport_1.ViewportService);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "vuforia", {
                    get: function () {
                        return this.container.get(vuforia_1.VuforiaService);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "updateEvent", {
                    get: function () {
                        return this.context.updateEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "renderEvent", {
                    get: function () {
                        return this.context.renderEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "focusEvent", {
                    get: function () {
                        return this.focus.focusEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "blurEvent", {
                    get: function () {
                        return this.focus.blurEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ArgonSystem;
            }());
            exports_1("ArgonSystem", ArgonSystem);
        }
    }
});

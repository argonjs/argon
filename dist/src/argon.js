System.register(['aurelia-polyfills', 'aurelia-dependency-injection', './cesium/cesium-imports.ts', './context.ts', './timer.ts', './device.ts', './reality.ts', './view.ts', './vuforia.ts', './session.ts', './utils.ts'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var aurelia_dependency_injection_1, Cesium, context_ts_1, timer_ts_1, device_ts_1, reality_ts_1, view_ts_1, vuforia_ts_1, session_ts_1;
    var ArgonSystem;
    function init(options) {
        if (options === void 0) { options = {}; }
        var role;
        if (typeof window === 'undefined') {
            role = session_ts_1.Role.MANAGER;
        }
        else if (navigator.userAgent.indexOf('Argon') > 0 || window.top !== window) {
            role = session_ts_1.Role.APPLICATION;
        }
        else {
            role = session_ts_1.Role.MANAGER;
        }
        var config = Object.assign({ role: role, enableIncomingUpdateEvents: role === session_ts_1.Role.APPLICATION }, options.config);
        return new ArgonSystem(config, options.container);
    }
    exports_1("init", init);
    function initReality(options) {
        if (options === void 0) { options = {}; }
        var config = Object.assign({ role: session_ts_1.Role.REALITY }, { enableRealityControlPort: true }, options.config);
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
            function (context_ts_1_1) {
                context_ts_1 = context_ts_1_1;
                exportStar_1(context_ts_1_1);
            },
            function (timer_ts_1_1) {
                timer_ts_1 = timer_ts_1_1;
                exportStar_1(timer_ts_1_1);
            },
            function (device_ts_1_1) {
                device_ts_1 = device_ts_1_1;
                exportStar_1(device_ts_1_1);
            },
            function (reality_ts_1_1) {
                reality_ts_1 = reality_ts_1_1;
                exportStar_1(reality_ts_1_1);
            },
            function (view_ts_1_1) {
                view_ts_1 = view_ts_1_1;
                exportStar_1(view_ts_1_1);
            },
            function (vuforia_ts_1_1) {
                vuforia_ts_1 = vuforia_ts_1_1;
                exportStar_1(vuforia_ts_1_1);
            },
            function (session_ts_1_1) {
                session_ts_1 = session_ts_1_1;
                exportStar_1(session_ts_1_1);
            },
            function (utils_ts_1_1) {
                exportStar_1(utils_ts_1_1);
            }],
        execute: function() {
            exports_1("Container", aurelia_dependency_injection_1.Container);
            exports_1("Cesium", Cesium);
            ArgonSystem = (function () {
                function ArgonSystem(config, container) {
                    if (container === void 0) { container = new aurelia_dependency_injection_1.Container(); }
                    this.container = container;
                    ArgonSystem.instance = this;
                    container.registerInstance('config', config);
                    container.registerInstance(session_ts_1.Role, config.role);
                    container.registerInstance(ArgonSystem, this);
                    if (config.role === session_ts_1.Role.MANAGER) {
                        container.registerSingleton(session_ts_1.ConnectService, session_ts_1.LoopbackConnectService);
                    }
                    else if (session_ts_1.WKWebViewConnectService.isAvailable()) {
                        container.registerSingleton(session_ts_1.ConnectService, session_ts_1.WKWebViewConnectService);
                    }
                    else if (session_ts_1.DebugConnectService.isAvailable()) {
                        container.registerSingleton(session_ts_1.ConnectService, session_ts_1.DebugConnectService);
                    }
                    else if (session_ts_1.DebugConnectService.isAvailable()) {
                        container.registerSingleton(session_ts_1.ConnectService, session_ts_1.DOMConnectService);
                    }
                    else {
                        container.registerSingleton(session_ts_1.ConnectService, session_ts_1.LoopbackConnectService);
                    }
                    container.get(vuforia_ts_1.VuforiaService);
                    this.context.init();
                }
                Object.defineProperty(ArgonSystem.prototype, "configuration", {
                    get: function () {
                        return this.container.get('config');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "context", {
                    get: function () {
                        return this.container.get(context_ts_1.Context);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "timer", {
                    get: function () {
                        return this.container.get(timer_ts_1.TimerService);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "device", {
                    get: function () {
                        return this.container.get(device_ts_1.DeviceService);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "reality", {
                    get: function () {
                        return this.container.get(reality_ts_1.RealityService);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "view", {
                    get: function () {
                        return this.container.get(view_ts_1.ViewService);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ArgonSystem.prototype, "vuforia", {
                    get: function () {
                        return this.container.get(vuforia_ts_1.VuforiaService);
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

System.register(['aurelia-polyfills', 'aurelia-dependency-injection', './cesium/cesium-imports', 'urijs', './session', './common', './context', './device', './focus', './reality', './timer', './ui', './view', './vuforia', './reality-loader/empty', './reality-loader/live_video', './reality-loader/hosted', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var DI, Cesium, URI, session_1, common_1, context_2, device_1, focus_1, reality_1, timer_1, ui_1, view_1, vuforia_1, empty_1, live_video_1, hosted_1;
    var ArgonSystem, RealityView;
    /**
     * Create an ArgonSystem instance.
     * If we are running within a [[REALITY_MANAGER]],
     * this function will create an ArgonSystem which has the [[REALITY_AUGMENTOR]] role.
     * If we are not running within a [[REALITY_MANAGER]],
     * this function will create an ArgonSystem which has the [[REALITY_MANAGER]] role.
     * @param initParameters InitParameters
     */
    function init(_a) {
        var _b = _a === void 0 ? {} : _a, configuration = _b.configuration, _c = _b.container, container = _c === void 0 ? new DI.Container : _c;
        var role;
        if (typeof HTMLElement === 'undefined') {
            role = common_1.Role.REALITY_MANAGER;
        }
        else if (navigator.userAgent.indexOf('Argon') > 0 || window.top !== window) {
            role = common_1.Role.APPLICATION; // TODO: switch to below after several argon-app releases
        }
        else {
            role = common_1.Role.REALITY_MANAGER;
        }
        var config = Object.assign(configuration || {}, {
            role: role,
        });
        container.registerInstance('containerElement', null);
        return new ArgonSystem(config, container);
    }
    exports_1("init", init);
    /**
     * Deprecated. Use [[initRealityViewer]]
     * @deprecated
     */
    function initReality(p) {
        if (p === void 0) { p = {}; }
        return initRealityViewer(p);
    }
    exports_1("initReality", initReality);
    /**
     * Initialize an [[ArgonSystem]] with the [[REALITY_VIEW]] role
     */
    function initRealityViewer(_a) {
        var _b = _a === void 0 ? {} : _a, configuration = _b.configuration, _c = _b.container, container = _c === void 0 ? new DI.Container : _c;
        var config = Object.assign(configuration || {}, {
            role: common_1.Role.REALITY_VIEW,
            // role: Role.REALITY_VIEWER
            'reality.supportsControlPort': true
        });
        container.registerInstance('containerElement', null);
        return new ArgonSystem(config, container);
    }
    exports_1("initRealityViewer", initRealityViewer);
    /**
     * Not yet implemented.
     * @private
     */
    function initLocal(_a) {
        var containerElement = _a.containerElement, configuration = _a.configuration, _b = _a.container, container = _b === void 0 ? new DI.Container : _b;
        var config = Object.assign(configuration || {}, {
            role: common_1.Role.REALITY_MANAGER
        });
        container.registerInstance('containerElement', containerElement);
        return new ArgonSystem(config, container);
    }
    exports_1("initLocal", initLocal);
    var exportedNames_1 = {
        'ArgonSystem': true,
        'RealityView': true,
        'init': true,
        'initReality': true,
        'initRealityViewer': true,
        'initLocal': true,
        'DI': true,
        'Cesium': true,
        'URI': true,
        'EmptyRealityLoader': true,
        'LiveVideoRealityLoader': true,
        'HostedRealityLoader': true
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
            function (DI_1) {
                DI = DI_1;
            },
            function (Cesium_1) {
                Cesium = Cesium_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
                exportStar_1(session_1_1);
            },
            function (common_1_1) {
                common_1 = common_1_1;
                exportStar_1(common_1_1);
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
            function (reality_1_1) {
                reality_1 = reality_1_1;
                exportStar_1(reality_1_1);
            },
            function (timer_1_1) {
                timer_1 = timer_1_1;
                exportStar_1(timer_1_1);
            },
            function (ui_1_1) {
                ui_1 = ui_1_1;
                exportStar_1(ui_1_1);
            },
            function (view_1_1) {
                view_1 = view_1_1;
                exportStar_1(view_1_1);
            },
            function (vuforia_1_1) {
                vuforia_1 = vuforia_1_1;
                exportStar_1(vuforia_1_1);
            },
            function (empty_1_1) {
                empty_1 = empty_1_1;
            },
            function (live_video_1_1) {
                live_video_1 = live_video_1_1;
            },
            function (hosted_1_1) {
                hosted_1 = hosted_1_1;
            },
            function (utils_1_1) {
                exportStar_1(utils_1_1);
            }],
        execute: function() {
            exports_1("DI", DI);
            exports_1("Cesium", Cesium);
            exports_1("URI", URI);
            exports_1("EmptyRealityLoader", empty_1.EmptyRealityLoader);
            exports_1("LiveVideoRealityLoader", live_video_1.LiveVideoRealityLoader);
            exports_1("HostedRealityLoader", hosted_1.HostedRealityLoader);
            /**
             * A composition root which instantiates the object graph based on a provided configuration.
             * You generally want to create a new ArgonSystem via the provided [[init]] or [[initReality]] functions:
             * ```ts
             * var app = Argon.init(); // app is an instance of ArgonSystem
             * ```
             */
            ArgonSystem = (function () {
                function ArgonSystem(config, container) {
                    if (container === void 0) { container = new DI.Container; }
                    this.container = container;
                    if (!ArgonSystem.instance)
                        ArgonSystem.instance = this;
                    container.registerInstance('config', config);
                    container.registerInstance(ArgonSystem, this);
                    if (!container.hasResolver('containerElement'))
                        container.registerInstance('containerElement', null);
                    if (config.role === common_1.Role.REALITY_MANAGER) {
                        container.registerSingleton(session_1.ConnectService, session_1.LoopbackConnectService);
                    }
                    else if (session_1.WKWebViewConnectService.isAvailable()) {
                        container.registerSingleton(session_1.ConnectService, session_1.WKWebViewConnectService);
                    }
                    else if (session_1.DOMConnectService.isAvailable()) {
                        container.registerSingleton(session_1.ConnectService, session_1.DOMConnectService);
                    }
                    else if (session_1.DebugConnectService.isAvailable()) {
                        container.registerSingleton(session_1.ConnectService, session_1.DebugConnectService);
                    }
                    if (config.role === common_1.Role.REALITY_MANAGER) {
                        this.reality.registerLoader(container.get(empty_1.EmptyRealityLoader));
                        this.reality.registerLoader(container.get(live_video_1.LiveVideoRealityLoader));
                        if (typeof document !== 'undefined') {
                            this.reality.registerLoader(container.get(hosted_1.HostedRealityLoader));
                            container.get(view_1.PinchZoomService);
                            container.get(ui_1.DefaultUIService);
                        }
                        this.reality.setDefault(common_1.RealityViewer.EMPTY);
                    }
                    // ensure the entire object graph is instantiated before connecting to the manager. 
                    for (var _i = 0, _a = Object.keys(ArgonSystem.prototype); _i < _a.length; _i++) {
                        var key = _a[_i];
                        this[key];
                    }
                    this.session.connect();
                }
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
                Object.defineProperty(ArgonSystem.prototype, "view", {
                    get: function () {
                        return this.container.get(view_1.ViewService);
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
                    // events
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
            // expose RealityView for backwards compatability
            /**
             * @private
             */
            RealityView = (function (_super) {
                __extends(RealityView, _super);
                function RealityView() {
                    _super.call(this);
                    console.warn('RealityView class has been renamed to RealityViewer');
                }
                return RealityView;
            }(common_1.RealityViewer));
            exports_1("RealityView", RealityView);
        }
    }
});

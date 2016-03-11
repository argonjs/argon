System.register(['aurelia-dependency-injection', './context.ts'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, context_ts_1;
    var ViewService;
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (context_ts_1_1) {
                context_ts_1 = context_ts_1_1;
            }],
        execute: function() {
            ViewService = (function () {
                function ViewService(context) {
                    var _this = this;
                    this.context = context;
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
                    }
                    if (typeof document !== 'undefined') {
                        var previousWidth_1, previousHeight_1;
                        this.context.updateEvent.addEventListener(function (frameState) {
                            var width = frameState.size.width;
                            var height = frameState.size.height;
                            if (previousWidth_1 !== width || previousHeight_1 !== height) {
                                _this.element.style.width = frameState.size.width + 'px';
                                _this.element.style.height = frameState.size.height + 'px';
                            }
                            previousWidth_1 = width;
                            previousHeight_1 = height;
                        });
                    }
                }
                ViewService = __decorate([
                    aurelia_dependency_injection_1.inject(context_ts_1.Context)
                ], ViewService);
                return ViewService;
            }());
            exports_1("ViewService", ViewService);
        }
    }
});

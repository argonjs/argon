SystemJS.config({
    transpiler: "plugin-babel",
    typescriptOptions: {
        "tsconfig": "tsconfig.build.json",
        "typeCheck": false
    },
    packages: {
        "src": {
            "defaultExtension": "ts",
            "meta": {
                "*.ts": {
                    "loader": "ts"
                }
            }
        },
        "dist/src": {
            "defaultExtension": "js"
        },
        "test": {
            "map": {
                "@argonjs/argon": "src/dist/argon.js"
            }
        }
    },
    devConfig: {
        "map": {
            "chai": "npm:chai@3.5.0",
            "css": "github:systemjs/plugin-css@0.1.20",
            "mocha": "npm:mocha@2.4.5"
        },
        "packages": {
            "npm:chai@3.5.0": {
                "map": {
                    "assertion-error": "npm:assertion-error@1.0.1",
                    "deep-eql": "npm:deep-eql@0.1.3",
                    "type-detect": "npm:type-detect@1.0.0"
                }
            },
            "npm:deep-eql@0.1.3": {
                "map": {
                    "type-detect": "npm:type-detect@0.1.1"
                }
            },
            "npm:mocha@2.4.5": {
                "map": {
                    "css": "github:systemjs/plugin-css@0.1.20"
                }
            }
        }
    },
    map: {
        "assert": "npm:jspm-nodelibs-assert@0.2.0",
        "buffer": "npm:jspm-nodelibs-buffer@0.2.0",
        "child_process": "npm:jspm-nodelibs-child_process@0.2.0",
        "constants": "npm:jspm-nodelibs-constants@0.2.0",
        "crypto": "npm:jspm-nodelibs-crypto@0.2.0",
        "events": "npm:jspm-nodelibs-events@0.2.0",
        "fs": "npm:jspm-nodelibs-fs@0.2.0",
        "module": "npm:jspm-nodelibs-module@0.2.0",
        "path": "npm:jspm-nodelibs-path@0.2.0",
        "process": "npm:jspm-nodelibs-process@0.2.0",
        "stream": "npm:jspm-nodelibs-stream@0.2.0",
        "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.0",
        "util": "npm:jspm-nodelibs-util@0.2.0",
        "vm": "npm:jspm-nodelibs-vm@0.2.0"
    }
});

SystemJS.config({
    packageConfigPaths: [
        "npm:@*/*.json",
        "npm:*.json",
        "github:*/*.json"
    ],
    map: {
        "net": "npm:jspm-nodelibs-net@0.2.0",
        "object-assign": "npm:object-assign@4.1.0",
        "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.2.0",
        "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
        "aurelia-pal": "npm:aurelia-pal@1.0.0",
        "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.0.0",
        "cesium": "github:aelatgt/cesium@referenceFrames",
        "googlevr/webvr-polyfill": "github:googlevr/webvr-polyfill@0.9.3",
        "json": "github:systemjs/plugin-json@0.2.1",
        "mobile-detect": "npm:mobile-detect@1.3.2",
        "os": "npm:jspm-nodelibs-os@0.2.0",
        "plugin-babel": "npm:systemjs-plugin-babel@0.0.17",
        "ts": "github:frankwallis/plugin-typescript@5.2.9",
        "urijs": "github:medialize/URI.js@1.18.1"
    },
    packages: {
        "github:frankwallis/plugin-typescript@5.2.9": {
            "map": {
                "typescript": "npm:typescript@2.0.7"
            }
        },
        "npm:jspm-nodelibs-os@0.2.0": {
            "map": {
                "os-browserify": "npm:os-browserify@0.2.1"
            }
        }
    }
});

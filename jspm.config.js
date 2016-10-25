SystemJS.config({
    transpiler: "ts",
    typescriptOptions: {
        "tsconfig": "tsconfig.build.json",
        "typeCheck": false,
        "sourceMap": true
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
    }
});

SystemJS.config({
    packageConfigPaths: [
        "npm:@*/*.json",
        "npm:*.json",
        "github:*/*.json"
    ],
    map: {
        "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.1.4",
        "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.1.2",
        "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.5",
        "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1",
        "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.0.0",
        "cesium": "github:aelatgt/cesium@referenceFrames",
        "googlevr/webvr-polyfill": "github:googlevr/webvr-polyfill@0.9.3",
        "mobile-detect": "npm:mobile-detect@1.3.2",
        "os": "github:jspm/nodelibs-os@0.2.0-alpha",
        "ts": "github:frankwallis/plugin-typescript@5.0.9",
        "urijs": "github:medialize/URI.js@1.18.1"
    },
    packages: {
        "github:jspm/nodelibs-os@0.2.0-alpha": {
            "map": {
                "os-browserify": "npm:os-browserify@0.2.1"
            }
        },
        "github:frankwallis/plugin-typescript@5.0.9": {
            "map": {
                "typescript": "npm:typescript@2.0.0"
            }
        }
    }
});

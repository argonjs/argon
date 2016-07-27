SystemJS.config({
    transpiler: "ts",
    typescriptOptions: {
        "tsconfig": true,
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
        "example": {
            "map": {
                "argon": "dist/argon.umd.js"
            }
        }
    },
    devConfig: {
        "map": {
            "chai": "npm:chai@3.5.0",
            "css": "github:systemjs/plugin-css@0.1.20",
            "mocha": "npm:mocha@2.4.5",
            "ts": "github:frankwallis/plugin-typescript@5.0.8",
            "os": "github:jspm/nodelibs-os@0.2.0-alpha"
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
            },
            "github:frankwallis/plugin-typescript@5.0.8": {
                "map": {
                    "typescript": "npm:typescript@2.0.0"
                }
            },
            "github:jspm/nodelibs-os@0.2.0-alpha": {
                "map": {
                    "os-browserify": "npm:os-browserify@0.2.1"
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
        "Cesium": "github:aelatgt/cesium@referenceFrames",
        "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.1.4",
        "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.1.2",
        "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.5",
        "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1",
        "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.0.0",
        "mobile-detect": "npm:mobile-detect@1.3.2"
    },
    packages: {}
});

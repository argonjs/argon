SystemJS.config({
    packageConfigPaths: [
        "npm:@*/*.json",
        "npm:*.json",
        "github:*/*.json"
    ],
    transpiler: false,

    typescriptOptions: {
        "tsconfig": true,
        "typeCheck": false,
        "sourceMap": false
    },

    map: {
        "Cesium": "github:aelatgt/cesium@referenceFrames",
        "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.12.1",
        "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
        "chai": "npm:chai@3.5.0",
        "css": "github:systemjs/plugin-css@0.1.20",
        "mocha": "npm:mocha@2.4.5",
        "process": "github:jspm/nodelibs-process@0.2.0-alpha",
        "ts": "github:frankwallis/plugin-typescript@2.6.0"
    },

    packages: {
        "example": {
            "map": {
                "dist/argon": "dist/argon.js"
            }
        },
        "src": {
            "meta": {
                "*.ts": {
                    "loader": "ts"
                }
            }
        },
        "github:aurelia/dependency-injection@0.12.1": {
            "map": {
                "aurelia-logging": "github:aurelia/logging@0.9.0",
                "aurelia-metadata": "github:aurelia/metadata@0.10.1",
                "aurelia-pal": "github:aurelia/pal@0.3.0",
                "core-js": "npm:core-js@1.2.6"
            }
        },
        "github:aurelia/metadata@0.10.1": {
            "map": {
                "aurelia-pal": "github:aurelia/pal@0.3.0",
                "core-js": "npm:core-js@1.2.6"
            }
        },
        "github:frankwallis/plugin-typescript@2.6.0": {
            "map": {
                "typescript": "npm:typescript@1.9.0-dev.20160204"
            }
        },
        "github:jspm/nodelibs-buffer@0.2.0-alpha": {
            "map": {
                "buffer-browserify": "npm:buffer@4.5.0"
            }
        },
        "npm:buffer@4.5.0": {
            "map": {
                "base64-js": "npm:base64-js@1.0.4",
                "ieee754": "npm:ieee754@1.1.6",
                "isarray": "npm:isarray@1.0.0"
            }
        },
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
});

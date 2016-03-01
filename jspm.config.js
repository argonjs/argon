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
        "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.1.4",
        "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.1.2",
        "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.5",
        "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1",
        "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.0.0",
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
        "github:jspm/nodelibs-buffer@0.2.0-alpha": {
            "map": {
                "buffer-browserify": "npm:buffer@4.5.0"
            }
        },
        "npm:aurelia-dependency-injection@1.0.0-beta.1.1.4": {
            "map": {
                "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.1.2",
                "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.5",
                "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1"
            }
        },
        "npm:aurelia-metadata@1.0.0-beta.1.1.5": {
            "map": {
                "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1"
            }
        },
        "npm:aurelia-polyfills@1.0.0-beta.1.0.0": {
            "map": {
                "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1"
            }
        },
        "npm:buffer@4.5.0": {
            "map": {
                "base64-js": "npm:base64-js@1.1.0",
                "ieee754": "npm:ieee754@1.1.6",
                "isarray": "npm:isarray@1.0.0"
            }
        },
        "src": {
            "meta": {
                "*.ts": {
                    "loader": "ts"
                }
            }
        },
        "github:frankwallis/plugin-typescript@2.6.0": {
            "map": {
                "typescript": "npm:typescript@1.9.0-dev.20160226"
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

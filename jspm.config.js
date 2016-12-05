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
        },
        "github:jspm/nodelibs-buffer@0.2.0-alpha": {
            "map": {
                "buffer-browserify": "npm:buffer@4.9.1"
            }
        },
        "npm:buffer@4.9.1": {
            "map": {
                "ieee754": "npm:ieee754@1.1.8",
                "base64-js": "npm:base64-js@1.2.0",
                "isarray": "npm:isarray@1.0.0"
            }
        },
        "github:jspm/nodelibs-stream@0.2.0-alpha": {
            "map": {
                "stream-browserify": "npm:stream-browserify@2.0.1"
            }
        },
        "npm:stream-browserify@2.0.1": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "readable-stream": "npm:readable-stream@2.1.5"
            }
        },
        "npm:readable-stream@2.1.5": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "isarray": "npm:isarray@1.0.0",
                "core-util-is": "npm:core-util-is@1.0.2",
                "buffer-shims": "npm:buffer-shims@1.0.0",
                "util-deprecate": "npm:util-deprecate@1.0.2",
                "process-nextick-args": "npm:process-nextick-args@1.0.7",
                "string_decoder": "npm:string_decoder@0.10.31"
            }
        },
        "github:jspm/nodelibs-crypto@0.2.0-alpha": {
            "map": {
                "crypto-browserify": "npm:crypto-browserify@3.11.0"
            }
        },
        "npm:crypto-browserify@3.11.0": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "browserify-sign": "npm:browserify-sign@4.0.0",
                "create-hash": "npm:create-hash@1.1.2",
                "create-ecdh": "npm:create-ecdh@4.0.0",
                "public-encrypt": "npm:public-encrypt@4.0.0",
                "diffie-hellman": "npm:diffie-hellman@5.0.2",
                "pbkdf2": "npm:pbkdf2@3.0.9",
                "randombytes": "npm:randombytes@2.0.3",
                "create-hmac": "npm:create-hmac@1.1.4",
                "browserify-cipher": "npm:browserify-cipher@1.0.0"
            }
        },
        "npm:browserify-sign@4.0.0": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "create-hash": "npm:create-hash@1.1.2",
                "create-hmac": "npm:create-hmac@1.1.4",
                "parse-asn1": "npm:parse-asn1@5.0.0",
                "elliptic": "npm:elliptic@6.3.2",
                "browserify-rsa": "npm:browserify-rsa@4.0.1",
                "bn.js": "npm:bn.js@4.11.6"
            }
        },
        "npm:create-hash@1.1.2": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "sha.js": "npm:sha.js@2.4.5",
                "cipher-base": "npm:cipher-base@1.0.3",
                "ripemd160": "npm:ripemd160@1.0.1"
            }
        },
        "npm:create-hmac@1.1.4": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "create-hash": "npm:create-hash@1.1.2"
            }
        },
        "npm:pbkdf2@3.0.9": {
            "map": {
                "create-hmac": "npm:create-hmac@1.1.4"
            }
        },
        "npm:public-encrypt@4.0.0": {
            "map": {
                "create-hash": "npm:create-hash@1.1.2",
                "randombytes": "npm:randombytes@2.0.3",
                "parse-asn1": "npm:parse-asn1@5.0.0",
                "browserify-rsa": "npm:browserify-rsa@4.0.1",
                "bn.js": "npm:bn.js@4.11.6"
            }
        },
        "npm:diffie-hellman@5.0.2": {
            "map": {
                "randombytes": "npm:randombytes@2.0.3",
                "miller-rabin": "npm:miller-rabin@4.0.0",
                "bn.js": "npm:bn.js@4.11.6"
            }
        },
        "npm:create-ecdh@4.0.0": {
            "map": {
                "elliptic": "npm:elliptic@6.3.2",
                "bn.js": "npm:bn.js@4.11.6"
            }
        },
        "npm:sha.js@2.4.5": {
            "map": {
                "inherits": "npm:inherits@2.0.3"
            }
        },
        "npm:cipher-base@1.0.3": {
            "map": {
                "inherits": "npm:inherits@2.0.3"
            }
        },
        "npm:parse-asn1@5.0.0": {
            "map": {
                "create-hash": "npm:create-hash@1.1.2",
                "pbkdf2": "npm:pbkdf2@3.0.9",
                "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
                "browserify-aes": "npm:browserify-aes@1.0.6",
                "asn1.js": "npm:asn1.js@4.9.0"
            }
        },
        "npm:elliptic@6.3.2": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "bn.js": "npm:bn.js@4.11.6",
                "hash.js": "npm:hash.js@1.0.3",
                "brorand": "npm:brorand@1.0.6"
            }
        },
        "npm:browserify-rsa@4.0.1": {
            "map": {
                "randombytes": "npm:randombytes@2.0.3",
                "bn.js": "npm:bn.js@4.11.6"
            }
        },
        "npm:browserify-cipher@1.0.0": {
            "map": {
                "browserify-des": "npm:browserify-des@1.0.0",
                "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
                "browserify-aes": "npm:browserify-aes@1.0.6"
            }
        },
        "npm:browserify-des@1.0.0": {
            "map": {
                "cipher-base": "npm:cipher-base@1.0.3",
                "inherits": "npm:inherits@2.0.3",
                "des.js": "npm:des.js@1.0.0"
            }
        },
        "npm:miller-rabin@4.0.0": {
            "map": {
                "bn.js": "npm:bn.js@4.11.6",
                "brorand": "npm:brorand@1.0.6"
            }
        },
        "npm:evp_bytestokey@1.0.0": {
            "map": {
                "create-hash": "npm:create-hash@1.1.2"
            }
        },
        "npm:browserify-aes@1.0.6": {
            "map": {
                "cipher-base": "npm:cipher-base@1.0.3",
                "create-hash": "npm:create-hash@1.1.2",
                "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
                "inherits": "npm:inherits@2.0.3",
                "buffer-xor": "npm:buffer-xor@1.0.3"
            }
        },
        "npm:hash.js@1.0.3": {
            "map": {
                "inherits": "npm:inherits@2.0.3"
            }
        },
        "npm:asn1.js@4.9.0": {
            "map": {
                "bn.js": "npm:bn.js@4.11.6",
                "inherits": "npm:inherits@2.0.3",
                "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
            }
        },
        "npm:des.js@1.0.0": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
            }
        },
        "github:jspm/nodelibs-string_decoder@0.2.0-alpha": {
            "map": {
                "string_decoder-browserify": "npm:string_decoder@0.10.31"
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
        "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
        "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
        "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
        "constants": "github:jspm/nodelibs-constants@0.2.0-alpha",
        "crypto": "github:jspm/nodelibs-crypto@0.2.0-alpha",
        "events": "github:jspm/nodelibs-events@0.2.0-alpha",
        "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
        "module": "github:jspm/nodelibs-module@0.2.0-alpha",
        "net": "github:jspm/nodelibs-net@0.2.0-alpha",
        "path": "github:jspm/nodelibs-path@0.2.0-alpha",
        "process": "github:jspm/nodelibs-process@0.2.0-alpha",
        "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
        "string_decoder": "github:jspm/nodelibs-string_decoder@0.2.0-alpha",
        "util": "github:jspm/nodelibs-util@0.2.0-alpha",
        "vm": "github:jspm/nodelibs-vm@0.2.0-alpha"
    }
});

SystemJS.config({
    packageConfigPaths: [
        "npm:@*/*.json",
        "npm:*.json",
        "github:*/*.json"
    ],
    map: {
        "object-assign": "npm:object-assign@4.1.0",
        "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.2.0",
        "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
        "aurelia-pal": "npm:aurelia-pal@1.0.0",
        "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.0.0",
        "cesium": "github:aelatgt/cesium@referenceFrames",
        "googlevr/webvr-polyfill": "github:googlevr/webvr-polyfill@0.9.3",
        "json": "github:systemjs/plugin-json@0.2.1",
        "mobile-detect": "npm:mobile-detect@1.3.2",
        "os": "github:jspm/nodelibs-os@0.2.0-alpha",
        "plugin-babel": "npm:systemjs-plugin-babel@0.0.17",
        "ts": "github:frankwallis/plugin-typescript@5.2.9",
        "urijs": "github:medialize/URI.js@1.18.1"
    },
    packages: {
        "github:jspm/nodelibs-os@0.2.0-alpha": {
            "map": {
                "os-browserify": "npm:os-browserify@0.2.1"
            }
        },
        "github:frankwallis/plugin-typescript@5.2.9": {
            "map": {
                "typescript": "npm:typescript@2.0.7"
            }
        }
    }
});

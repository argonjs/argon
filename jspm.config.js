SystemJS.config({
    transpiler: "plugin-babel",
    typescriptOptions: {
        "tsconfig": "tsconfig.build.json",
        "typeCheck": false,
        "autoDetectModule": true
    },
    meta: {
        "*.json": {
            "loader": "json"
        }
    },
    packages: {
        "src": {
            "defaultExtension": "ts",
            "meta": {
                "*.ts": {
                    "loader": "ts"
                }
            },
            "map": {
                "./webvr": {
                    "~browser": "@empty",
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
            "css": "github:systemjs/plugin-css@0.1.32",
            "ts": "github:frankwallis/plugin-typescript@5.3.3",
            "net": "npm:jspm-nodelibs-net@0.2.0",
            "os": "npm:jspm-nodelibs-os@0.2.0",
            "crypto": "npm:jspm-nodelibs-crypto@0.2.0",
            "fs": "npm:jspm-nodelibs-fs@0.2.0",
            "child_process": "npm:jspm-nodelibs-child_process@0.2.0",
            "buffer": "npm:jspm-nodelibs-buffer@0.2.0",
            "module": "npm:jspm-nodelibs-module@0.2.0",
            "path": "npm:jspm-nodelibs-path@0.2.0",
            "process": "npm:jspm-nodelibs-process@0.2.0",
            "vm": "npm:jspm-nodelibs-vm@0.2.0",
            "stream": "npm:jspm-nodelibs-stream@0.2.0",
            "util": "npm:jspm-nodelibs-util@0.2.0",
            "constants": "npm:jspm-nodelibs-constants@0.2.0",
            "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.0",
            "events": "npm:jspm-nodelibs-events@0.2.0",
            "mocha": "npm:mocha@3.2.0"
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
            "github:frankwallis/plugin-typescript@5.3.3": {
                "map": {
                    "typescript": "npm:typescript@2.1.4"
                }
            },
            "npm:typescript@2.1.4": {
                "map": {
                    "source-map-support": "npm:source-map-support@0.4.8"
                }
            },
            "npm:source-map-support@0.4.8": {
                "map": {
                    "source-map": "npm:source-map@0.5.6"
                }
            },
            "npm:crypto-browserify@3.11.0": {
                "map": {
                    "inherits": "npm:inherits@2.0.3",
                    "create-hmac": "npm:create-hmac@1.1.4",
                    "browserify-sign": "npm:browserify-sign@4.0.0",
                    "browserify-cipher": "npm:browserify-cipher@1.0.0",
                    "create-hash": "npm:create-hash@1.1.2",
                    "diffie-hellman": "npm:diffie-hellman@5.0.2",
                    "pbkdf2": "npm:pbkdf2@3.0.9",
                    "create-ecdh": "npm:create-ecdh@4.0.0",
                    "public-encrypt": "npm:public-encrypt@4.0.0",
                    "randombytes": "npm:randombytes@2.0.3"
                }
            },
            "npm:create-hmac@1.1.4": {
                "map": {
                    "inherits": "npm:inherits@2.0.3",
                    "create-hash": "npm:create-hash@1.1.2"
                }
            },
            "npm:browserify-sign@4.0.0": {
                "map": {
                    "create-hash": "npm:create-hash@1.1.2",
                    "create-hmac": "npm:create-hmac@1.1.4",
                    "inherits": "npm:inherits@2.0.3",
                    "elliptic": "npm:elliptic@6.3.2",
                    "bn.js": "npm:bn.js@4.11.6",
                    "parse-asn1": "npm:parse-asn1@5.0.0",
                    "browserify-rsa": "npm:browserify-rsa@4.0.1"
                }
            },
            "npm:pbkdf2@3.0.9": {
                "map": {
                    "create-hmac": "npm:create-hmac@1.1.4"
                }
            },
            "npm:create-hash@1.1.2": {
                "map": {
                    "inherits": "npm:inherits@2.0.3",
                    "sha.js": "npm:sha.js@2.4.8",
                    "cipher-base": "npm:cipher-base@1.0.3",
                    "ripemd160": "npm:ripemd160@1.0.1"
                }
            },
            "npm:diffie-hellman@5.0.2": {
                "map": {
                    "randombytes": "npm:randombytes@2.0.3",
                    "bn.js": "npm:bn.js@4.11.6",
                    "miller-rabin": "npm:miller-rabin@4.0.0"
                }
            },
            "npm:public-encrypt@4.0.0": {
                "map": {
                    "create-hash": "npm:create-hash@1.1.2",
                    "randombytes": "npm:randombytes@2.0.3",
                    "bn.js": "npm:bn.js@4.11.6",
                    "parse-asn1": "npm:parse-asn1@5.0.0",
                    "browserify-rsa": "npm:browserify-rsa@4.0.1"
                }
            },
            "npm:browserify-cipher@1.0.0": {
                "map": {
                    "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
                    "browserify-aes": "npm:browserify-aes@1.0.6",
                    "browserify-des": "npm:browserify-des@1.0.0"
                }
            },
            "npm:create-ecdh@4.0.0": {
                "map": {
                    "elliptic": "npm:elliptic@6.3.2",
                    "bn.js": "npm:bn.js@4.11.6"
                }
            },
            "npm:buffer@4.9.1": {
                "map": {
                    "base64-js": "npm:base64-js@1.2.0",
                    "isarray": "npm:isarray@1.0.0",
                    "ieee754": "npm:ieee754@1.1.8"
                }
            },
            "npm:evp_bytestokey@1.0.0": {
                "map": {
                    "create-hash": "npm:create-hash@1.1.2"
                }
            },
            "npm:sha.js@2.4.8": {
                "map": {
                    "inherits": "npm:inherits@2.0.3"
                }
            },
            "npm:cipher-base@1.0.3": {
                "map": {
                    "inherits": "npm:inherits@2.0.3"
                }
            },
            "npm:browserify-des@1.0.0": {
                "map": {
                    "cipher-base": "npm:cipher-base@1.0.3",
                    "inherits": "npm:inherits@2.0.3",
                    "des.js": "npm:des.js@1.0.0"
                }
            },
            "npm:browserify-aes@1.0.6": {
                "map": {
                    "cipher-base": "npm:cipher-base@1.0.3",
                    "create-hash": "npm:create-hash@1.1.2",
                    "inherits": "npm:inherits@2.0.3",
                    "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
                    "buffer-xor": "npm:buffer-xor@1.0.3"
                }
            },
            "npm:elliptic@6.3.2": {
                "map": {
                    "inherits": "npm:inherits@2.0.3",
                    "bn.js": "npm:bn.js@4.11.6",
                    "brorand": "npm:brorand@1.0.6",
                    "hash.js": "npm:hash.js@1.0.3"
                }
            },
            "npm:parse-asn1@5.0.0": {
                "map": {
                    "create-hash": "npm:create-hash@1.1.2",
                    "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
                    "pbkdf2": "npm:pbkdf2@3.0.9",
                    "browserify-aes": "npm:browserify-aes@1.0.6",
                    "asn1.js": "npm:asn1.js@4.9.1"
                }
            },
            "npm:browserify-rsa@4.0.1": {
                "map": {
                    "randombytes": "npm:randombytes@2.0.3",
                    "bn.js": "npm:bn.js@4.11.6"
                }
            },
            "npm:miller-rabin@4.0.0": {
                "map": {
                    "bn.js": "npm:bn.js@4.11.6",
                    "brorand": "npm:brorand@1.0.6"
                }
            },
            "npm:hash.js@1.0.3": {
                "map": {
                    "inherits": "npm:inherits@2.0.3"
                }
            },
            "npm:des.js@1.0.0": {
                "map": {
                    "inherits": "npm:inherits@2.0.3",
                    "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
                }
            },
            "npm:asn1.js@4.9.1": {
                "map": {
                    "bn.js": "npm:bn.js@4.11.6",
                    "inherits": "npm:inherits@2.0.3",
                    "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
                }
            },
            "npm:stream-browserify@2.0.1": {
                "map": {
                    "inherits": "npm:inherits@2.0.3",
                    "readable-stream": "npm:readable-stream@2.2.2"
                }
            },
            "npm:readable-stream@2.2.2": {
                "map": {
                    "isarray": "npm:isarray@1.0.0",
                    "inherits": "npm:inherits@2.0.3",
                    "string_decoder": "npm:string_decoder@0.10.31",
                    "process-nextick-args": "npm:process-nextick-args@1.0.7",
                    "util-deprecate": "npm:util-deprecate@1.0.2",
                    "core-util-is": "npm:core-util-is@1.0.2",
                    "buffer-shims": "npm:buffer-shims@1.0.0"
                }
            },
            "npm:mocha@3.2.0": {
                "map": {
                    "lodash.create": "npm:lodash.create@3.1.1",
                    "json3": "npm:json3@3.3.2",
                    "debug": "npm:debug@2.6.0",
                    "css": "github:systemjs/plugin-css@0.1.32"
                }
            },
            "npm:lodash.create@3.1.1": {
                "map": {
                    "lodash._isiterateecall": "npm:lodash._isiterateecall@3.0.9",
                    "lodash._basecreate": "npm:lodash._basecreate@3.0.3",
                    "lodash._baseassign": "npm:lodash._baseassign@3.2.0"
                }
            },
            "npm:debug@2.6.0": {
                "map": {
                    "ms": "npm:ms@0.7.2"
                }
            },
            "npm:lodash._baseassign@3.2.0": {
                "map": {
                    "lodash._basecopy": "npm:lodash._basecopy@3.0.1",
                    "lodash.keys": "npm:lodash.keys@3.1.2"
                }
            },
            "npm:lodash.keys@3.1.2": {
                "map": {
                    "lodash._getnative": "npm:lodash._getnative@3.9.1",
                    "lodash.isarray": "npm:lodash.isarray@3.0.4",
                    "lodash.isarguments": "npm:lodash.isarguments@3.1.0"
                }
            },
            "npm:jspm-nodelibs-crypto@0.2.0": {
                "map": {
                    "crypto-browserify": "npm:crypto-browserify@3.11.0"
                }
            },
            "npm:jspm-nodelibs-stream@0.2.0": {
                "map": {
                    "stream-browserify": "npm:stream-browserify@2.0.1"
                }
            },
            "npm:jspm-nodelibs-os@0.2.0": {
                "map": {
                    "os-browserify": "npm:os-browserify@0.2.1"
                }
            },
            "npm:jspm-nodelibs-buffer@0.2.0": {
                "map": {
                    "buffer-browserify": "npm:buffer@4.9.1"
                }
            },
            "npm:jspm-nodelibs-string_decoder@0.2.0": {
                "map": {
                    "string_decoder-browserify": "npm:string_decoder@0.10.31"
                }
            }
        }
    },
    map: {
<<<<<<< HEAD
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
=======
        "plugin-babel": "npm:systemjs-plugin-babel@0.0.17"
>>>>>>> b2935729304bfe564be76b9c64654b4bf3ec5250
    }
});

SystemJS.config({
    packageConfigPaths: [
        "npm:@*/*.json",
        "npm:*.json",
        "github:*/*.json"
    ],
    map: {
<<<<<<< HEAD
        "net": "npm:jspm-nodelibs-net@0.2.0",
=======
        "json": "github:systemjs/plugin-json@0.2.3",
        "assert": "npm:jspm-nodelibs-assert@0.2.0",
>>>>>>> b2935729304bfe564be76b9c64654b4bf3ec5250
        "object-assign": "npm:object-assign@4.1.0",
        "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.2.0",
        "aurelia-metadata": "npm:aurelia-metadata@1.0.2",
        "aurelia-pal": "npm:aurelia-pal@1.0.0",
        "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.0.0",
        "cesium": "github:aelatgt/cesium@referenceFrames",
        "googlevr/webvr-polyfill": "github:googlevr/webvr-polyfill@0.9.3",
<<<<<<< HEAD
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
=======
        "mobile-detect": "npm:mobile-detect@1.3.2"
    },
    packages: {}
>>>>>>> b2935729304bfe564be76b9c64654b4bf3ec5250
});

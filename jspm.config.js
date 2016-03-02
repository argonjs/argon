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
        "example": {
            "map": {
                "argon": "dist/argon.umd.js"
            }
        }
    },
    meta: {
        "istanbul/lib/instrumenter.js": {
            "format": "global",
            "globals": {
                "escodegen": "escodegen",
                "esprima": "esprima"
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
        "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
        "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.1.4",
        "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.1.2",
        "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.1.5",
        "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.1.1",
        "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.0.0",
        "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
        "chai": "npm:chai@3.5.0",
        "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
        "constants": "github:jspm/nodelibs-constants@0.2.0-alpha",
        "crypto": "github:jspm/nodelibs-crypto@0.2.0-alpha",
        "css": "github:systemjs/plugin-css@0.1.20",
        "events": "github:jspm/nodelibs-events@0.2.0-alpha",
        "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
        "istanbul": "npm:istanbul@0.4.2",
        "mocha": "npm:mocha@2.4.5",
        "module": "github:jspm/nodelibs-module@0.2.0-alpha",
        "os": "github:jspm/nodelibs-os@0.2.0-alpha",
        "path": "github:jspm/nodelibs-path@0.2.0-alpha",
        "process": "github:jspm/nodelibs-process@0.2.0-alpha",
        "source-map": "npm:source-map@0.2.0",
        "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
        "string_decoder": "github:jspm/nodelibs-string_decoder@0.2.0-alpha",
        "ts": "github:frankwallis/plugin-typescript@2.6.0",
        "tty": "github:jspm/nodelibs-tty@0.2.0-alpha",
        "uglify-js": "npm:uglify-js@2.6.2",
        "url": "github:jspm/nodelibs-url@0.2.0-alpha",
        "util": "github:jspm/nodelibs-util@0.2.0-alpha",
        "vm": "github:jspm/nodelibs-vm@0.2.0-alpha"
    },
    packages: {
        "github:jspm/nodelibs-crypto@0.2.0-alpha": {
            "map": {
                "crypto-browserify": "npm:crypto-browserify@3.11.0"
            }
        },
        "github:jspm/nodelibs-os@0.2.0-alpha": {
            "map": {
                "os-browserify": "npm:os-browserify@0.2.0"
            }
        },
        "github:jspm/nodelibs-stream@0.2.0-alpha": {
            "map": {
                "stream-browserify": "npm:stream-browserify@2.0.1"
            }
        },
        "github:jspm/nodelibs-string_decoder@0.2.0-alpha": {
            "map": {
                "string_decoder-browserify": "npm:string_decoder@0.10.31"
            }
        },
        "github:jspm/nodelibs-url@0.2.0-alpha": {
            "map": {
                "url-browserify": "npm:url@0.11.0"
            }
        },
        "npm:align-text@0.1.4": {
            "map": {
                "kind-of": "npm:kind-of@3.0.2",
                "longest": "npm:longest@1.0.1",
                "repeat-string": "npm:repeat-string@1.5.4"
            }
        },
        "npm:asn1.js@4.5.2": {
            "map": {
                "bn.js": "npm:bn.js@4.11.0",
                "inherits": "npm:inherits@2.0.1",
                "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
            }
        },
        "npm:browserify-aes@1.0.6": {
            "map": {
                "buffer-xor": "npm:buffer-xor@1.0.3",
                "cipher-base": "npm:cipher-base@1.0.2",
                "create-hash": "npm:create-hash@1.1.2",
                "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
                "inherits": "npm:inherits@2.0.1"
            }
        },
        "npm:browserify-cipher@1.0.0": {
            "map": {
                "browserify-aes": "npm:browserify-aes@1.0.6",
                "browserify-des": "npm:browserify-des@1.0.0",
                "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
            }
        },
        "npm:browserify-des@1.0.0": {
            "map": {
                "cipher-base": "npm:cipher-base@1.0.2",
                "des.js": "npm:des.js@1.0.0",
                "inherits": "npm:inherits@2.0.1"
            }
        },
        "npm:browserify-rsa@4.0.1": {
            "map": {
                "bn.js": "npm:bn.js@4.11.0",
                "randombytes": "npm:randombytes@2.0.3"
            }
        },
        "npm:browserify-sign@4.0.0": {
            "map": {
                "bn.js": "npm:bn.js@4.11.0",
                "browserify-rsa": "npm:browserify-rsa@4.0.1",
                "create-hash": "npm:create-hash@1.1.2",
                "create-hmac": "npm:create-hmac@1.1.4",
                "elliptic": "npm:elliptic@6.2.3",
                "inherits": "npm:inherits@2.0.1",
                "parse-asn1": "npm:parse-asn1@5.0.0"
            }
        },
        "npm:center-align@0.1.3": {
            "map": {
                "align-text": "npm:align-text@0.1.4",
                "lazy-cache": "npm:lazy-cache@1.0.3"
            }
        },
        "npm:cipher-base@1.0.2": {
            "map": {
                "inherits": "npm:inherits@2.0.1"
            }
        },
        "npm:cliui@2.1.0": {
            "map": {
                "center-align": "npm:center-align@0.1.3",
                "right-align": "npm:right-align@0.1.3",
                "wordwrap": "npm:wordwrap@0.0.2"
            }
        },
        "npm:create-ecdh@4.0.0": {
            "map": {
                "bn.js": "npm:bn.js@4.11.0",
                "elliptic": "npm:elliptic@6.2.3"
            }
        },
        "npm:create-hash@1.1.2": {
            "map": {
                "cipher-base": "npm:cipher-base@1.0.2",
                "inherits": "npm:inherits@2.0.1",
                "ripemd160": "npm:ripemd160@1.0.1",
                "sha.js": "npm:sha.js@2.4.5"
            }
        },
        "npm:create-hmac@1.1.4": {
            "map": {
                "create-hash": "npm:create-hash@1.1.2",
                "inherits": "npm:inherits@2.0.1"
            }
        },
        "npm:crypto-browserify@3.11.0": {
            "map": {
                "browserify-cipher": "npm:browserify-cipher@1.0.0",
                "browserify-sign": "npm:browserify-sign@4.0.0",
                "create-ecdh": "npm:create-ecdh@4.0.0",
                "create-hash": "npm:create-hash@1.1.2",
                "create-hmac": "npm:create-hmac@1.1.4",
                "diffie-hellman": "npm:diffie-hellman@5.0.2",
                "inherits": "npm:inherits@2.0.1",
                "pbkdf2": "npm:pbkdf2@3.0.4",
                "public-encrypt": "npm:public-encrypt@4.0.0",
                "randombytes": "npm:randombytes@2.0.3"
            }
        },
        "npm:des.js@1.0.0": {
            "map": {
                "inherits": "npm:inherits@2.0.1",
                "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
            }
        },
        "npm:diffie-hellman@5.0.2": {
            "map": {
                "bn.js": "npm:bn.js@4.11.0",
                "miller-rabin": "npm:miller-rabin@4.0.0",
                "randombytes": "npm:randombytes@2.0.3"
            }
        },
        "npm:elliptic@6.2.3": {
            "map": {
                "bn.js": "npm:bn.js@4.11.0",
                "brorand": "npm:brorand@1.0.5",
                "hash.js": "npm:hash.js@1.0.3",
                "inherits": "npm:inherits@2.0.1"
            }
        },
        "npm:evp_bytestokey@1.0.0": {
            "map": {
                "create-hash": "npm:create-hash@1.1.2"
            }
        },
        "npm:hash.js@1.0.3": {
            "map": {
                "inherits": "npm:inherits@2.0.1"
            }
        },
        "npm:kind-of@3.0.2": {
            "map": {
                "is-buffer": "npm:is-buffer@1.1.3"
            }
        },
        "npm:miller-rabin@4.0.0": {
            "map": {
                "bn.js": "npm:bn.js@4.11.0",
                "brorand": "npm:brorand@1.0.5"
            }
        },
        "npm:parse-asn1@5.0.0": {
            "map": {
                "asn1.js": "npm:asn1.js@4.5.2",
                "browserify-aes": "npm:browserify-aes@1.0.6",
                "create-hash": "npm:create-hash@1.1.2",
                "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
                "pbkdf2": "npm:pbkdf2@3.0.4"
            }
        },
        "npm:pbkdf2@3.0.4": {
            "map": {
                "create-hmac": "npm:create-hmac@1.1.4"
            }
        },
        "npm:public-encrypt@4.0.0": {
            "map": {
                "bn.js": "npm:bn.js@4.11.0",
                "browserify-rsa": "npm:browserify-rsa@4.0.1",
                "create-hash": "npm:create-hash@1.1.2",
                "parse-asn1": "npm:parse-asn1@5.0.0",
                "randombytes": "npm:randombytes@2.0.3"
            }
        },
        "npm:readable-stream@2.0.6": {
            "map": {
                "core-util-is": "npm:core-util-is@1.0.2",
                "inherits": "npm:inherits@2.0.1",
                "isarray": "npm:isarray@1.0.0",
                "process-nextick-args": "npm:process-nextick-args@1.0.6",
                "string_decoder": "npm:string_decoder@0.10.31",
                "util-deprecate": "npm:util-deprecate@1.0.2"
            }
        },
        "npm:right-align@0.1.3": {
            "map": {
                "align-text": "npm:align-text@0.1.4"
            }
        },
        "npm:sha.js@2.4.5": {
            "map": {
                "inherits": "npm:inherits@2.0.1"
            }
        },
        "npm:source-map@0.2.0": {
            "map": {
                "amdefine": "npm:amdefine@1.0.0"
            }
        },
        "npm:stream-browserify@2.0.1": {
            "map": {
                "inherits": "npm:inherits@2.0.1",
                "readable-stream": "npm:readable-stream@2.0.6"
            }
        },
        "npm:uglify-js@2.6.2": {
            "map": {
                "async": "npm:async@0.2.10",
                "source-map": "npm:source-map@0.5.3",
                "uglify-to-browserify": "npm:uglify-to-browserify@1.0.2",
                "yargs": "npm:yargs@3.10.0"
            }
        },
        "npm:url@0.11.0": {
            "map": {
                "punycode": "npm:punycode@1.3.2",
                "querystring": "npm:querystring@0.2.0"
            }
        },
        "npm:yargs@3.10.0": {
            "map": {
                "camelcase": "npm:camelcase@1.2.1",
                "cliui": "npm:cliui@2.1.0",
                "decamelize": "npm:decamelize@1.2.0",
                "window-size": "npm:window-size@0.1.0"
            }
        },
        "npm:argparse@1.0.6": {
            "map": {
                "sprintf-js": "npm:sprintf-js@1.0.3"
            }
        },
        "npm:brace-expansion@1.1.3": {
            "map": {
                "balanced-match": "npm:balanced-match@0.3.0",
                "concat-map": "npm:concat-map@0.0.1"
            }
        },
        "npm:escodegen@1.7.1": {
            "map": {
                "esprima": "npm:esprima@1.2.5",
                "estraverse": "npm:estraverse@1.9.3",
                "esutils": "npm:esutils@2.0.2",
                "optionator": "npm:optionator@0.5.0"
            }
        },
        "npm:fileset@0.2.1": {
            "map": {
                "glob": "npm:glob@5.0.15",
                "minimatch": "npm:minimatch@2.0.10"
            }
        },
        "npm:glob@5.0.15": {
            "map": {
                "inflight": "npm:inflight@1.0.4",
                "inherits": "npm:inherits@2.0.1",
                "minimatch": "npm:minimatch@3.0.0",
                "once": "npm:once@1.3.3",
                "path-is-absolute": "npm:path-is-absolute@1.0.0"
            }
        },
        "npm:handlebars@4.0.5": {
            "map": {
                "async": "npm:async@1.5.2",
                "optimist": "npm:optimist@0.6.1",
                "source-map": "npm:source-map@0.4.4"
            }
        },
        "npm:inflight@1.0.4": {
            "map": {
                "once": "npm:once@1.3.3",
                "wrappy": "npm:wrappy@1.0.1"
            }
        },
        "npm:is-absolute@0.1.7": {
            "map": {
                "is-relative": "npm:is-relative@0.1.3"
            }
        },
        "npm:istanbul@0.4.2": {
            "map": {
                "abbrev": "npm:abbrev@1.0.7",
                "async": "npm:async@1.5.2",
                "escodegen": "npm:escodegen@1.7.1",
                "esprima": "npm:esprima@2.7.2",
                "fileset": "npm:fileset@0.2.1",
                "handlebars": "npm:handlebars@4.0.5",
                "js-yaml": "npm:js-yaml@3.5.4",
                "mkdirp": "npm:mkdirp@0.5.1",
                "nopt": "npm:nopt@3.0.6",
                "once": "npm:once@1.3.3",
                "resolve": "npm:resolve@1.1.7",
                "supports-color": "npm:supports-color@3.1.2",
                "which": "npm:which@1.2.4",
                "wordwrap": "npm:wordwrap@1.0.0"
            }
        },
        "npm:js-yaml@3.5.4": {
            "map": {
                "argparse": "npm:argparse@1.0.6",
                "esprima": "npm:esprima@2.7.2"
            }
        },
        "npm:levn@0.2.5": {
            "map": {
                "prelude-ls": "npm:prelude-ls@1.1.2",
                "type-check": "npm:type-check@0.3.2"
            }
        },
        "npm:minimatch@2.0.10": {
            "map": {
                "brace-expansion": "npm:brace-expansion@1.1.3"
            }
        },
        "npm:minimatch@3.0.0": {
            "map": {
                "brace-expansion": "npm:brace-expansion@1.1.3"
            }
        },
        "npm:mkdirp@0.5.1": {
            "map": {
                "minimist": "npm:minimist@0.0.8"
            }
        },
        "npm:nopt@3.0.6": {
            "map": {
                "abbrev": "npm:abbrev@1.0.7"
            }
        },
        "npm:once@1.3.3": {
            "map": {
                "wrappy": "npm:wrappy@1.0.1"
            }
        },
        "npm:optimist@0.6.1": {
            "map": {
                "minimist": "npm:minimist@0.0.8",
                "wordwrap": "npm:wordwrap@0.0.2"
            }
        },
        "npm:optionator@0.5.0": {
            "map": {
                "deep-is": "npm:deep-is@0.1.3",
                "fast-levenshtein": "npm:fast-levenshtein@1.0.7",
                "levn": "npm:levn@0.2.5",
                "prelude-ls": "npm:prelude-ls@1.1.2",
                "type-check": "npm:type-check@0.3.2",
                "wordwrap": "npm:wordwrap@0.0.2"
            }
        },
        "npm:source-map@0.4.4": {
            "map": {
                "amdefine": "npm:amdefine@1.0.0"
            }
        },
        "npm:supports-color@3.1.2": {
            "map": {
                "has-flag": "npm:has-flag@1.0.0"
            }
        },
        "npm:type-check@0.3.2": {
            "map": {
                "prelude-ls": "npm:prelude-ls@1.1.2"
            }
        },
        "npm:which@1.2.4": {
            "map": {
                "is-absolute": "npm:is-absolute@0.1.7",
                "isexe": "npm:isexe@1.1.2"
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
                "base64-js": "npm:base64-js@1.1.1",
                "ieee754": "npm:ieee754@1.1.6",
                "isarray": "npm:isarray@1.0.0"
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

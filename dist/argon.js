!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==typeof c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], [], false, function($__System) {
var _dereq_ = this.require, exports = this.exports, module = this.module;
!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(u),t=(r[1].split(",")[n]||"require").replace(s,""),i=p[t]||(p[t]=new RegExp(a+t+f,"g"));i.lastIndex=0;for(var o,c=[];o=i.exec(e);)c.push(o[2]||o[3]);return c}function r(e,n,t,o){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var l=i.get(e);return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var a=[],f=0;f<e.length;f++)a.push(i["import"](e[f],o));Promise.all(a).then(function(e){n&&n.apply(null,e)},t)}function t(t,l,a){"string"!=typeof t&&(a=l,l=t,t=null),l instanceof Array||(a=l,l=["require","exports","module"].splice(0,a.length)),"function"!=typeof a&&(a=function(e){return function(){return e}}(a)),void 0===l[l.length-1]&&l.pop();var f,u,s;-1!=(f=o.call(l,"require"))&&(l.splice(f,1),t||(l=l.concat(n(a.toString(),f)))),-1!=(u=o.call(l,"exports"))&&l.splice(u,1),-1!=(s=o.call(l,"module"))&&l.splice(s,1);var p={name:t,deps:l,execute:function(n,t,o){for(var p=[],c=0;c<l.length;c++)p.push(n(l[c]));o.uri=o.id,o.config=function(){},-1!=s&&p.splice(s,0,o),-1!=u&&p.splice(u,0,t),-1!=f&&p.splice(f,0,function(e,t,l){return"string"==typeof e&&"function"!=typeof t?n(e):r.call(i,e,t,l,o.id)});var d=a.apply(-1==u?e:t,p);return"undefined"==typeof d&&o&&(d=o.exports),"undefined"!=typeof d?d:void 0}};if(t)c.anonDefine||c.isBundle?c.anonDefine&&c.anonDefine.name&&(c.anonDefine=null):c.anonDefine=p,c.isBundle=!0,i.registerDynamic(p.name,p.deps,!1,p.execute);else{if(c.anonDefine&&!c.anonDefine.name)throw new Error("Multiple anonymous defines in module "+t);c.anonDefine=p}}var i=$__System,o=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,a="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",f="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,s=/^\s+|\s+$/g,p={};t.amd={};var c={isBundle:!1,anonDefine:null};i.amdDefine=t,i.amdRequire=r}("undefined"!=typeof self?self:global);
(function() {
var define = $__System.amdDefine;
define("2", ["exports", "3"], function(exports, _aureliaPal) {
  'use strict';
  Number.isNaN = Number.isNaN || function(value) {
    return value !== value;
  };
  Number.isFinite = Number.isFinite || function(value) {
    return typeof value === "number" && isFinite(value);
  };
  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    };
  }
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
    };
  }
  if (!Array.from) {
    Array.from = (function() {
      var toStr = Object.prototype.toString;
      var isCallable = function isCallable(fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function toInteger(value) {
        var number = Number(value);
        if (isNaN(number)) {
          return 0;
        }
        if (number === 0 || !isFinite(number)) {
          return number;
        }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function toLength(value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };
      return function from(arrayLike) {
        var C = this;
        var items = Object(arrayLike);
        if (arrayLike == null) {
          throw new TypeError("Array.from requires an array-like object - not null or undefined");
        }
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }
        var len = toLength(items.length);
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);
        var k = 0;
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        A.length = len;
        return A;
      };
    })();
  }
  if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;
      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    };
  }
  if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.findIndex called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;
      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return i;
        }
      }
      return -1;
    };
  }
  if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement) {
      var O = Object(this);
      var len = parseInt(O.length) || 0;
      if (len === 0) {
        return false;
      }
      var n = parseInt(arguments[1]) || 0;
      var k;
      if (n >= 0) {
        k = n;
      } else {
        k = len + n;
        if (k < 0) {
          k = 0;
        }
      }
      var currentElement;
      while (k < len) {
        currentElement = O[k];
        if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
          return true;
        }
        k++;
      }
      return false;
    };
  }
  if (typeof Object.assign !== 'function') {
    Object.assign = function(target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  }
  (function(global) {
    var i = undefined;
    var defineProperty = Object.defineProperty;
    var is = function is(a, b) {
      return a === b || a !== a && b !== b;
    };
    if (typeof Map == 'undefined' || typeof new Map().values !== 'function' || !new Map().values().next) {
      global.Map = createCollection({
        'delete': sharedDelete,
        has: mapHas,
        get: sharedGet,
        set: sharedSet,
        keys: sharedKeys,
        values: sharedValues,
        entries: mapEntries,
        forEach: sharedForEach,
        clear: sharedClear
      });
    }
    if (typeof Set == 'undefined' || typeof new Set().values !== 'function' || !new Set().values().next) {
      global.Set = createCollection({
        has: setHas,
        add: sharedAdd,
        'delete': sharedDelete,
        clear: sharedClear,
        keys: sharedValues,
        values: sharedValues,
        entries: setEntries,
        forEach: sharedForEach
      });
    }
    function createCollection(proto, objectOnly) {
      function Collection(a) {
        if (!this || this.constructor !== Collection)
          return new Collection(a);
        this._keys = [];
        this._values = [];
        this._itp = [];
        this.objectOnly = objectOnly;
        if (a)
          init.call(this, a);
      }
      if (!objectOnly) {
        defineProperty(proto, 'size', {get: sharedSize});
      }
      proto.constructor = Collection;
      Collection.prototype = proto;
      return Collection;
    }
    function init(a) {
      var i;
      if (this.add)
        a.forEach(this.add, this);
      else
        a.forEach(function(a) {
          this.set(a[0], a[1]);
        }, this);
    }
    function sharedDelete(key) {
      if (this.has(key)) {
        this._keys.splice(i, 1);
        this._values.splice(i, 1);
        this._itp.forEach(function(p) {
          if (i < p[0])
            p[0]--;
        });
      }
      return -1 < i;
    }
    ;
    function sharedGet(key) {
      return this.has(key) ? this._values[i] : undefined;
    }
    function has(list, key) {
      if (this.objectOnly && key !== Object(key))
        throw new TypeError("Invalid value used as weak collection key");
      if (key != key || key === 0)
        for (i = list.length; i-- && !is(list[i], key); ) {}
      else
        i = list.indexOf(key);
      return -1 < i;
    }
    function setHas(value) {
      return has.call(this, this._values, value);
    }
    function mapHas(value) {
      return has.call(this, this._keys, value);
    }
    function sharedSet(key, value) {
      this.has(key) ? this._values[i] = value : this._values[this._keys.push(key) - 1] = value;
      return this;
    }
    function sharedAdd(value) {
      if (!this.has(value))
        this._values.push(value);
      return this;
    }
    function sharedClear() {
      (this._keys || 0).length = this._values.length = 0;
    }
    function sharedKeys() {
      return sharedIterator(this._itp, this._keys);
    }
    function sharedValues() {
      return sharedIterator(this._itp, this._values);
    }
    function mapEntries() {
      return sharedIterator(this._itp, this._keys, this._values);
    }
    function setEntries() {
      return sharedIterator(this._itp, this._values, this._values);
    }
    function sharedIterator(itp, array, array2) {
      var p = [0],
          done = false;
      itp.push(p);
      return {next: function next() {
          var v,
              k = p[0];
          if (!done && k < array.length) {
            v = array2 ? [array[k], array2[k]] : array[k];
            p[0]++;
          } else {
            done = true;
            itp.splice(itp.indexOf(p), 1);
          }
          return {
            done: done,
            value: v
          };
        }};
    }
    function sharedSize() {
      return this._values.length;
    }
    function sharedForEach(callback, context) {
      var it = this.entries();
      for (; ; ) {
        var r = it.next();
        if (r.done)
          break;
        callback.call(context, r.value[1], r.value[0], this);
      }
    }
  })(_aureliaPal.PLATFORM.global);
  var emptyMetadata = Object.freeze({});
  var metadataContainerKey = '__metadata__';
  var bind = Function.prototype.bind;
  if (typeof _aureliaPal.PLATFORM.global.Reflect === 'undefined') {
    _aureliaPal.PLATFORM.global.Reflect = {};
  }
  if (typeof Reflect.getOwnMetadata !== 'function') {
    Reflect.getOwnMetadata = function(metadataKey, target, targetKey) {
      return ((target[metadataContainerKey] || emptyMetadata)[targetKey] || emptyMetadata)[metadataKey];
    };
  }
  if (typeof Reflect.defineMetadata !== 'function') {
    Reflect.defineMetadata = function(metadataKey, metadataValue, target, targetKey) {
      var metadataContainer = target.hasOwnProperty(metadataContainerKey) ? target[metadataContainerKey] : target[metadataContainerKey] = {};
      var targetContainer = metadataContainer[targetKey] || (metadataContainer[targetKey] = {});
      targetContainer[metadataKey] = metadataValue;
    };
  }
  if (typeof Reflect.metadata !== 'function') {
    Reflect.metadata = function(metadataKey, metadataValue) {
      return function(target, targetKey) {
        Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
      };
    };
  }
  if (typeof Reflect.construct !== 'function') {
    Reflect.construct = function(Target, args) {
      if (args) {
        switch (args.length) {
          case 0:
            return new Target();
          case 1:
            return new Target(args[0]);
          case 2:
            return new Target(args[0], args[1]);
          case 3:
            return new Target(args[0], args[1], args[2]);
          case 4:
            return new Target(args[0], args[1], args[2], args[3]);
        }
      }
      var a = [null];
      a.push.apply(a, args);
      return new (bind.apply(Target, a))();
    };
  }
});

})();
(function() {
var define = $__System.amdDefine;
;
(function(root) {
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
  var freeModule = typeof module == 'object' && module && !module.nodeType && module;
  var freeGlobal = typeof global == 'object' && global;
  if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
    root = freeGlobal;
  }
  var punycode,
      maxInt = 2147483647,
      base = 36,
      tMin = 1,
      tMax = 26,
      skew = 38,
      damp = 700,
      initialBias = 72,
      initialN = 128,
      delimiter = '-',
      regexPunycode = /^xn--/,
      regexNonASCII = /[^\x20-\x7E]/,
      regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
      errors = {
        'overflow': 'Overflow: input needs wider integers to process',
        'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
        'invalid-input': 'Invalid input'
      },
      baseMinusTMin = base - tMin,
      floor = Math.floor,
      stringFromCharCode = String.fromCharCode,
      key;
  function error(type) {
    throw new RangeError(errors[type]);
  }
  function map(array, fn) {
    var length = array.length;
    var result = [];
    while (length--) {
      result[length] = fn(array[length]);
    }
    return result;
  }
  function mapDomain(string, fn) {
    var parts = string.split('@');
    var result = '';
    if (parts.length > 1) {
      result = parts[0] + '@';
      string = parts[1];
    }
    string = string.replace(regexSeparators, '\x2E');
    var labels = string.split('.');
    var encoded = map(labels, fn).join('.');
    return result + encoded;
  }
  function ucs2decode(string) {
    var output = [],
        counter = 0,
        length = string.length,
        value,
        extra;
    while (counter < length) {
      value = string.charCodeAt(counter++);
      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        extra = string.charCodeAt(counter++);
        if ((extra & 0xFC00) == 0xDC00) {
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }
  function ucs2encode(array) {
    return map(array, function(value) {
      var output = '';
      if (value > 0xFFFF) {
        value -= 0x10000;
        output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
        value = 0xDC00 | value & 0x3FF;
      }
      output += stringFromCharCode(value);
      return output;
    }).join('');
  }
  function basicToDigit(codePoint) {
    if (codePoint - 48 < 10) {
      return codePoint - 22;
    }
    if (codePoint - 65 < 26) {
      return codePoint - 65;
    }
    if (codePoint - 97 < 26) {
      return codePoint - 97;
    }
    return base;
  }
  function digitToBasic(digit, flag) {
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  }
  function adapt(delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);
    for (; delta > baseMinusTMin * tMax >> 1; k += base) {
      delta = floor(delta / baseMinusTMin);
    }
    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  }
  function decode(input) {
    var output = [],
        inputLength = input.length,
        out,
        i = 0,
        n = initialN,
        bias = initialBias,
        basic,
        j,
        index,
        oldi,
        w,
        k,
        digit,
        t,
        baseMinusT;
    basic = input.lastIndexOf(delimiter);
    if (basic < 0) {
      basic = 0;
    }
    for (j = 0; j < basic; ++j) {
      if (input.charCodeAt(j) >= 0x80) {
        error('not-basic');
      }
      output.push(input.charCodeAt(j));
    }
    for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
      for (oldi = i, w = 1, k = base; ; k += base) {
        if (index >= inputLength) {
          error('invalid-input');
        }
        digit = basicToDigit(input.charCodeAt(index++));
        if (digit >= base || digit > floor((maxInt - i) / w)) {
          error('overflow');
        }
        i += digit * w;
        t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
        if (digit < t) {
          break;
        }
        baseMinusT = base - t;
        if (w > floor(maxInt / baseMinusT)) {
          error('overflow');
        }
        w *= baseMinusT;
      }
      out = output.length + 1;
      bias = adapt(i - oldi, out, oldi == 0);
      if (floor(i / out) > maxInt - n) {
        error('overflow');
      }
      n += floor(i / out);
      i %= out;
      output.splice(i++, 0, n);
    }
    return ucs2encode(output);
  }
  function encode(input) {
    var n,
        delta,
        handledCPCount,
        basicLength,
        bias,
        j,
        m,
        q,
        k,
        t,
        currentValue,
        output = [],
        inputLength,
        handledCPCountPlusOne,
        baseMinusT,
        qMinusT;
    input = ucs2decode(input);
    inputLength = input.length;
    n = initialN;
    delta = 0;
    bias = initialBias;
    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];
      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue));
      }
    }
    handledCPCount = basicLength = output.length;
    if (basicLength) {
      output.push(delimiter);
    }
    while (handledCPCount < inputLength) {
      for (m = maxInt, j = 0; j < inputLength; ++j) {
        currentValue = input[j];
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }
      handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error('overflow');
      }
      delta += (m - n) * handledCPCountPlusOne;
      n = m;
      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];
        if (currentValue < n && ++delta > maxInt) {
          error('overflow');
        }
        if (currentValue == n) {
          for (q = delta, k = base; ; k += base) {
            t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
            if (q < t) {
              break;
            }
            qMinusT = q - t;
            baseMinusT = base - t;
            output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
            q = floor(qMinusT / baseMinusT);
          }
          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }
      ++delta;
      ++n;
    }
    return output.join('');
  }
  function toUnicode(input) {
    return mapDomain(input, function(string) {
      return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
    });
  }
  function toASCII(input) {
    return mapDomain(input, function(string) {
      return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
    });
  }
  punycode = {
    'version': '1.3.2',
    'ucs2': {
      'decode': ucs2decode,
      'encode': ucs2encode
    },
    'decode': decode,
    'encode': encode,
    'toASCII': toASCII,
    'toUnicode': toUnicode
  };
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    define("4", [], function() {
      return punycode;
    }) && define("punycode", ["4"], function(m) {
      return m;
    });
  } else if (freeExports && freeModule) {
    if (module.exports == freeExports) {
      freeModule.exports = punycode;
    } else {
      for (key in punycode) {
        punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
      }
    }
  } else {
    root.punycode = punycode;
  }
}(this));

})();
(function() {
var define = $__System.amdDefine;
(function(root, factory) {
  'use strict';
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define("5", [], factory);
  } else {
    root.IPv6 = factory(root);
  }
}(this, function(root) {
  'use strict';
  var _IPv6 = root && root.IPv6;
  function bestPresentation(address) {
    var _address = address.toLowerCase();
    var segments = _address.split(':');
    var length = segments.length;
    var total = 8;
    if (segments[0] === '' && segments[1] === '' && segments[2] === '') {
      segments.shift();
      segments.shift();
    } else if (segments[0] === '' && segments[1] === '') {
      segments.shift();
    } else if (segments[length - 1] === '' && segments[length - 2] === '') {
      segments.pop();
    }
    length = segments.length;
    if (segments[length - 1].indexOf('.') !== -1) {
      total = 7;
    }
    var pos;
    for (pos = 0; pos < length; pos++) {
      if (segments[pos] === '') {
        break;
      }
    }
    if (pos < total) {
      segments.splice(pos, 1, '0000');
      while (segments.length < total) {
        segments.splice(pos, 0, '0000');
      }
    }
    var _segments;
    for (var i = 0; i < total; i++) {
      _segments = segments[i].split('');
      for (var j = 0; j < 3; j++) {
        if (_segments[0] === '0' && _segments.length > 1) {
          _segments.splice(0, 1);
        } else {
          break;
        }
      }
      segments[i] = _segments.join('');
    }
    var best = -1;
    var _best = 0;
    var _current = 0;
    var current = -1;
    var inzeroes = false;
    for (i = 0; i < total; i++) {
      if (inzeroes) {
        if (segments[i] === '0') {
          _current += 1;
        } else {
          inzeroes = false;
          if (_current > _best) {
            best = current;
            _best = _current;
          }
        }
      } else {
        if (segments[i] === '0') {
          inzeroes = true;
          current = i;
          _current = 1;
        }
      }
    }
    if (_current > _best) {
      best = current;
      _best = _current;
    }
    if (_best > 1) {
      segments.splice(best, _best, '');
    }
    length = segments.length;
    var result = '';
    if (segments[0] === '') {
      result = ':';
    }
    for (i = 0; i < length; i++) {
      result += segments[i];
      if (i === length - 1) {
        break;
      }
      result += ':';
    }
    if (segments[length - 1] === '') {
      result += ':';
    }
    return result;
  }
  function noConflict() {
    if (root.IPv6 === this) {
      root.IPv6 = _IPv6;
    }
    return this;
  }
  return {
    best: bestPresentation,
    noConflict: noConflict
  };
}));

})();
(function() {
var define = $__System.amdDefine;
(function(root, factory) {
  'use strict';
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define("6", [], factory);
  } else {
    root.SecondLevelDomains = factory(root);
  }
}(this, function(root) {
  'use strict';
  var _SecondLevelDomains = root && root.SecondLevelDomains;
  var SLD = {
    list: {
      'ac': ' com gov mil net org ',
      'ae': ' ac co gov mil name net org pro sch ',
      'af': ' com edu gov net org ',
      'al': ' com edu gov mil net org ',
      'ao': ' co ed gv it og pb ',
      'ar': ' com edu gob gov int mil net org tur ',
      'at': ' ac co gv or ',
      'au': ' asn com csiro edu gov id net org ',
      'ba': ' co com edu gov mil net org rs unbi unmo unsa untz unze ',
      'bb': ' biz co com edu gov info net org store tv ',
      'bh': ' biz cc com edu gov info net org ',
      'bn': ' com edu gov net org ',
      'bo': ' com edu gob gov int mil net org tv ',
      'br': ' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
      'bs': ' com edu gov net org ',
      'bz': ' du et om ov rg ',
      'ca': ' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
      'ck': ' biz co edu gen gov info net org ',
      'cn': ' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
      'co': ' com edu gov mil net nom org ',
      'cr': ' ac c co ed fi go or sa ',
      'cy': ' ac biz com ekloges gov ltd name net org parliament press pro tm ',
      'do': ' art com edu gob gov mil net org sld web ',
      'dz': ' art asso com edu gov net org pol ',
      'ec': ' com edu fin gov info med mil net org pro ',
      'eg': ' com edu eun gov mil name net org sci ',
      'er': ' com edu gov ind mil net org rochest w ',
      'es': ' com edu gob nom org ',
      'et': ' biz com edu gov info name net org ',
      'fj': ' ac biz com info mil name net org pro ',
      'fk': ' ac co gov net nom org ',
      'fr': ' asso com f gouv nom prd presse tm ',
      'gg': ' co net org ',
      'gh': ' com edu gov mil org ',
      'gn': ' ac com gov net org ',
      'gr': ' com edu gov mil net org ',
      'gt': ' com edu gob ind mil net org ',
      'gu': ' com edu gov net org ',
      'hk': ' com edu gov idv net org ',
      'hu': ' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
      'id': ' ac co go mil net or sch web ',
      'il': ' ac co gov idf k12 muni net org ',
      'in': ' ac co edu ernet firm gen gov i ind mil net nic org res ',
      'iq': ' com edu gov i mil net org ',
      'ir': ' ac co dnssec gov i id net org sch ',
      'it': ' edu gov ',
      'je': ' co net org ',
      'jo': ' com edu gov mil name net org sch ',
      'jp': ' ac ad co ed go gr lg ne or ',
      'ke': ' ac co go info me mobi ne or sc ',
      'kh': ' com edu gov mil net org per ',
      'ki': ' biz com de edu gov info mob net org tel ',
      'km': ' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
      'kn': ' edu gov net org ',
      'kr': ' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
      'kw': ' com edu gov net org ',
      'ky': ' com edu gov net org ',
      'kz': ' com edu gov mil net org ',
      'lb': ' com edu gov net org ',
      'lk': ' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
      'lr': ' com edu gov net org ',
      'lv': ' asn com conf edu gov id mil net org ',
      'ly': ' com edu gov id med net org plc sch ',
      'ma': ' ac co gov m net org press ',
      'mc': ' asso tm ',
      'me': ' ac co edu gov its net org priv ',
      'mg': ' com edu gov mil nom org prd tm ',
      'mk': ' com edu gov inf name net org pro ',
      'ml': ' com edu gov net org presse ',
      'mn': ' edu gov org ',
      'mo': ' com edu gov net org ',
      'mt': ' com edu gov net org ',
      'mv': ' aero biz com coop edu gov info int mil museum name net org pro ',
      'mw': ' ac co com coop edu gov int museum net org ',
      'mx': ' com edu gob net org ',
      'my': ' com edu gov mil name net org sch ',
      'nf': ' arts com firm info net other per rec store web ',
      'ng': ' biz com edu gov mil mobi name net org sch ',
      'ni': ' ac co com edu gob mil net nom org ',
      'np': ' com edu gov mil net org ',
      'nr': ' biz com edu gov info net org ',
      'om': ' ac biz co com edu gov med mil museum net org pro sch ',
      'pe': ' com edu gob mil net nom org sld ',
      'ph': ' com edu gov i mil net ngo org ',
      'pk': ' biz com edu fam gob gok gon gop gos gov net org web ',
      'pl': ' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
      'pr': ' ac biz com edu est gov info isla name net org pro prof ',
      'ps': ' com edu gov net org plo sec ',
      'pw': ' belau co ed go ne or ',
      'ro': ' arts com firm info nom nt org rec store tm www ',
      'rs': ' ac co edu gov in org ',
      'sb': ' com edu gov net org ',
      'sc': ' com edu gov net org ',
      'sh': ' co com edu gov net nom org ',
      'sl': ' com edu gov net org ',
      'st': ' co com consulado edu embaixada gov mil net org principe saotome store ',
      'sv': ' com edu gob org red ',
      'sz': ' ac co org ',
      'tr': ' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
      'tt': ' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
      'tw': ' club com ebiz edu game gov idv mil net org ',
      'mu': ' ac co com gov net or org ',
      'mz': ' ac co edu gov org ',
      'na': ' co com ',
      'nz': ' ac co cri geek gen govt health iwi maori mil net org parliament school ',
      'pa': ' abo ac com edu gob ing med net nom org sld ',
      'pt': ' com edu gov int net nome org publ ',
      'py': ' com edu gov mil net org ',
      'qa': ' com edu gov mil net org ',
      're': ' asso com nom ',
      'ru': ' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
      'rw': ' ac co com edu gouv gov int mil net ',
      'sa': ' com edu gov med net org pub sch ',
      'sd': ' com edu gov info med net org tv ',
      'se': ' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
      'sg': ' com edu gov idn net org per ',
      'sn': ' art com edu gouv org perso univ ',
      'sy': ' com edu gov mil net news org ',
      'th': ' ac co go in mi net or ',
      'tj': ' ac biz co com edu go gov info int mil name net nic org test web ',
      'tn': ' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
      'tz': ' ac co go ne or ',
      'ua': ' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
      'ug': ' ac co go ne or org sc ',
      'uk': ' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
      'us': ' dni fed isa kids nsn ',
      'uy': ' com edu gub mil net org ',
      've': ' co com edu gob info mil net org web ',
      'vi': ' co com k12 net org ',
      'vn': ' ac biz com edu gov health info int name net org pro ',
      'ye': ' co com gov ltd me net org plc ',
      'yu': ' ac co edu gov org ',
      'za': ' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
      'zm': ' ac co com edu gov net org sch '
    },
    has: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length - 1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset - 1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset - 1)) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset + 1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(sldOffset + 1, tldOffset) + ' ') >= 0;
    },
    is: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length - 1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset - 1);
      if (sldOffset >= 0) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset + 1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
    },
    get: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length - 1)) {
        return null;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset - 1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset - 1)) {
        return null;
      }
      var sldList = SLD.list[domain.slice(tldOffset + 1)];
      if (!sldList) {
        return null;
      }
      if (sldList.indexOf(' ' + domain.slice(sldOffset + 1, tldOffset) + ' ') < 0) {
        return null;
      }
      return domain.slice(sldOffset + 1);
    },
    noConflict: function() {
      if (root.SecondLevelDomains === this) {
        root.SecondLevelDomains = _SecondLevelDomains;
      }
      return this;
    }
  };
  return SLD;
}));

})();
(function() {
var define = $__System.amdDefine;
(function(root, factory) {
  'use strict';
  if (typeof exports === 'object') {
    module.exports = factory(_dereq_('./punycode'), _dereq_('./IPv6'), _dereq_('./SecondLevelDomains'));
  } else if (typeof define === 'function' && define.amd) {
    define("7", ["4", "5", "6"], factory);
  } else {
    root.URI = factory(root.punycode, root.IPv6, root.SecondLevelDomains, root);
  }
}(this, function(punycode, IPv6, SLD, root) {
  'use strict';
  var _URI = root && root.URI;
  function URI(url, base) {
    var _urlSupplied = arguments.length >= 1;
    var _baseSupplied = arguments.length >= 2;
    if (!(this instanceof URI)) {
      if (_urlSupplied) {
        if (_baseSupplied) {
          return new URI(url, base);
        }
        return new URI(url);
      }
      return new URI();
    }
    if (url === undefined) {
      if (_urlSupplied) {
        throw new TypeError('undefined is not a valid argument for URI');
      }
      if (typeof location !== 'undefined') {
        url = location.href + '';
      } else {
        url = '';
      }
    }
    this.href(url);
    if (base !== undefined) {
      return this.absoluteTo(base);
    }
    return this;
  }
  URI.version = '1.18.1';
  var p = URI.prototype;
  var hasOwn = Object.prototype.hasOwnProperty;
  function escapeRegEx(string) {
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  }
  function getType(value) {
    if (value === undefined) {
      return 'Undefined';
    }
    return String(Object.prototype.toString.call(value)).slice(8, -1);
  }
  function isArray(obj) {
    return getType(obj) === 'Array';
  }
  function filterArrayValues(data, value) {
    var lookup = {};
    var i,
        length;
    if (getType(value) === 'RegExp') {
      lookup = null;
    } else if (isArray(value)) {
      for (i = 0, length = value.length; i < length; i++) {
        lookup[value[i]] = true;
      }
    } else {
      lookup[value] = true;
    }
    for (i = 0, length = data.length; i < length; i++) {
      var _match = lookup && lookup[data[i]] !== undefined || !lookup && value.test(data[i]);
      if (_match) {
        data.splice(i, 1);
        length--;
        i--;
      }
    }
    return data;
  }
  function arrayContains(list, value) {
    var i,
        length;
    if (isArray(value)) {
      for (i = 0, length = value.length; i < length; i++) {
        if (!arrayContains(list, value[i])) {
          return false;
        }
      }
      return true;
    }
    var _type = getType(value);
    for (i = 0, length = list.length; i < length; i++) {
      if (_type === 'RegExp') {
        if (typeof list[i] === 'string' && list[i].match(value)) {
          return true;
        }
      } else if (list[i] === value) {
        return true;
      }
    }
    return false;
  }
  function arraysEqual(one, two) {
    if (!isArray(one) || !isArray(two)) {
      return false;
    }
    if (one.length !== two.length) {
      return false;
    }
    one.sort();
    two.sort();
    for (var i = 0,
        l = one.length; i < l; i++) {
      if (one[i] !== two[i]) {
        return false;
      }
    }
    return true;
  }
  function trimSlashes(text) {
    var trim_expression = /^\/+|\/+$/g;
    return text.replace(trim_expression, '');
  }
  URI._parts = function() {
    return {
      protocol: null,
      username: null,
      password: null,
      hostname: null,
      urn: null,
      port: null,
      path: null,
      query: null,
      fragment: null,
      duplicateQueryParameters: URI.duplicateQueryParameters,
      escapeQuerySpace: URI.escapeQuerySpace
    };
  };
  URI.duplicateQueryParameters = false;
  URI.escapeQuerySpace = true;
  URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
  URI.idn_expression = /[^a-z0-9\.-]/i;
  URI.punycode_expression = /(xn--)/i;
  URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
  URI.findUri = {
    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
    end: /[\s\r\n]|$/,
    trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/
  };
  URI.defaultPorts = {
    http: '80',
    https: '443',
    ftp: '21',
    gopher: '70',
    ws: '80',
    wss: '443'
  };
  URI.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
  URI.domAttributes = {
    'a': 'href',
    'blockquote': 'cite',
    'link': 'href',
    'base': 'href',
    'script': 'src',
    'form': 'action',
    'img': 'src',
    'area': 'href',
    'iframe': 'src',
    'embed': 'src',
    'source': 'src',
    'track': 'src',
    'input': 'src',
    'audio': 'src',
    'video': 'src'
  };
  URI.getDomAttribute = function(node) {
    if (!node || !node.nodeName) {
      return undefined;
    }
    var nodeName = node.nodeName.toLowerCase();
    if (nodeName === 'input' && node.type !== 'image') {
      return undefined;
    }
    return URI.domAttributes[nodeName];
  };
  function escapeForDumbFirefox36(value) {
    return escape(value);
  }
  function strictEncodeURIComponent(string) {
    return encodeURIComponent(string).replace(/[!'()*]/g, escapeForDumbFirefox36).replace(/\*/g, '%2A');
  }
  URI.encode = strictEncodeURIComponent;
  URI.decode = decodeURIComponent;
  URI.iso8859 = function() {
    URI.encode = escape;
    URI.decode = unescape;
  };
  URI.unicode = function() {
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
  };
  URI.characters = {
    pathname: {
      encode: {
        expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
        map: {
          '%24': '$',
          '%26': '&',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%3A': ':',
          '%40': '@'
        }
      },
      decode: {
        expression: /[\/\?#]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23'
        }
      }
    },
    reserved: {encode: {
        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
        map: {
          '%3A': ':',
          '%2F': '/',
          '%3F': '?',
          '%23': '#',
          '%5B': '[',
          '%5D': ']',
          '%40': '@',
          '%21': '!',
          '%24': '$',
          '%26': '&',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '='
        }
      }},
    urnpath: {
      encode: {
        expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
        map: {
          '%21': '!',
          '%24': '$',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%40': '@'
        }
      },
      decode: {
        expression: /[\/\?#:]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23',
          ':': '%3A'
        }
      }
    }
  };
  URI.encodeQuery = function(string, escapeQuerySpace) {
    var escaped = URI.encode(string + '');
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }
    return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
  };
  URI.decodeQuery = function(string, escapeQuerySpace) {
    string += '';
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }
    try {
      return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
    } catch (e) {
      return string;
    }
  };
  var _parts = {
    'encode': 'encode',
    'decode': 'decode'
  };
  var _part;
  var generateAccessor = function(_group, _part) {
    return function(string) {
      try {
        return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function(c) {
          return URI.characters[_group][_part].map[c];
        });
      } catch (e) {
        return string;
      }
    };
  };
  for (_part in _parts) {
    URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
    URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
  }
  var generateSegmentedPathFunction = function(_sep, _codingFuncName, _innerCodingFuncName) {
    return function(string) {
      var actualCodingFunc;
      if (!_innerCodingFuncName) {
        actualCodingFunc = URI[_codingFuncName];
      } else {
        actualCodingFunc = function(string) {
          return URI[_codingFuncName](URI[_innerCodingFuncName](string));
        };
      }
      var segments = (string + '').split(_sep);
      for (var i = 0,
          length = segments.length; i < length; i++) {
        segments[i] = actualCodingFunc(segments[i]);
      }
      return segments.join(_sep);
    };
  };
  URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
  URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
  URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
  URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');
  URI.encodeReserved = generateAccessor('reserved', 'encode');
  URI.parse = function(string, parts) {
    var pos;
    if (!parts) {
      parts = {};
    }
    pos = string.indexOf('#');
    if (pos > -1) {
      parts.fragment = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }
    pos = string.indexOf('?');
    if (pos > -1) {
      parts.query = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }
    if (string.substring(0, 2) === '//') {
      parts.protocol = null;
      string = string.substring(2);
      string = URI.parseAuthority(string, parts);
    } else {
      pos = string.indexOf(':');
      if (pos > -1) {
        parts.protocol = string.substring(0, pos) || null;
        if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
          parts.protocol = undefined;
        } else if (string.substring(pos + 1, pos + 3) === '//') {
          string = string.substring(pos + 3);
          string = URI.parseAuthority(string, parts);
        } else {
          string = string.substring(pos + 1);
          parts.urn = true;
        }
      }
    }
    parts.path = string;
    return parts;
  };
  URI.parseHost = function(string, parts) {
    string = string.replace(/\\/g, '/');
    var pos = string.indexOf('/');
    var bracketPos;
    var t;
    if (pos === -1) {
      pos = string.length;
    }
    if (string.charAt(0) === '[') {
      bracketPos = string.indexOf(']');
      parts.hostname = string.substring(1, bracketPos) || null;
      parts.port = string.substring(bracketPos + 2, pos) || null;
      if (parts.port === '/') {
        parts.port = null;
      }
    } else {
      var firstColon = string.indexOf(':');
      var firstSlash = string.indexOf('/');
      var nextColon = string.indexOf(':', firstColon + 1);
      if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
        parts.hostname = string.substring(0, pos) || null;
        parts.port = null;
      } else {
        t = string.substring(0, pos).split(':');
        parts.hostname = t[0] || null;
        parts.port = t[1] || null;
      }
    }
    if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
      pos++;
      string = '/' + string;
    }
    return string.substring(pos) || '/';
  };
  URI.parseAuthority = function(string, parts) {
    string = URI.parseUserinfo(string, parts);
    return URI.parseHost(string, parts);
  };
  URI.parseUserinfo = function(string, parts) {
    var firstSlash = string.indexOf('/');
    var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
    var t;
    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
      t = string.substring(0, pos).split(':');
      parts.username = t[0] ? URI.decode(t[0]) : null;
      t.shift();
      parts.password = t[0] ? URI.decode(t.join(':')) : null;
      string = string.substring(pos + 1);
    } else {
      parts.username = null;
      parts.password = null;
    }
    return string;
  };
  URI.parseQuery = function(string, escapeQuerySpace) {
    if (!string) {
      return {};
    }
    string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');
    if (!string) {
      return {};
    }
    var items = {};
    var splits = string.split('&');
    var length = splits.length;
    var v,
        name,
        value;
    for (var i = 0; i < length; i++) {
      v = splits[i].split('=');
      name = URI.decodeQuery(v.shift(), escapeQuerySpace);
      value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;
      if (hasOwn.call(items, name)) {
        if (typeof items[name] === 'string' || items[name] === null) {
          items[name] = [items[name]];
        }
        items[name].push(value);
      } else {
        items[name] = value;
      }
    }
    return items;
  };
  URI.build = function(parts) {
    var t = '';
    if (parts.protocol) {
      t += parts.protocol + ':';
    }
    if (!parts.urn && (t || parts.hostname)) {
      t += '//';
    }
    t += (URI.buildAuthority(parts) || '');
    if (typeof parts.path === 'string') {
      if (parts.path.charAt(0) !== '/' && typeof parts.hostname === 'string') {
        t += '/';
      }
      t += parts.path;
    }
    if (typeof parts.query === 'string' && parts.query) {
      t += '?' + parts.query;
    }
    if (typeof parts.fragment === 'string' && parts.fragment) {
      t += '#' + parts.fragment;
    }
    return t;
  };
  URI.buildHost = function(parts) {
    var t = '';
    if (!parts.hostname) {
      return '';
    } else if (URI.ip6_expression.test(parts.hostname)) {
      t += '[' + parts.hostname + ']';
    } else {
      t += parts.hostname;
    }
    if (parts.port) {
      t += ':' + parts.port;
    }
    return t;
  };
  URI.buildAuthority = function(parts) {
    return URI.buildUserinfo(parts) + URI.buildHost(parts);
  };
  URI.buildUserinfo = function(parts) {
    var t = '';
    if (parts.username) {
      t += URI.encode(parts.username);
    }
    if (parts.password) {
      t += ':' + URI.encode(parts.password);
    }
    if (t) {
      t += '@';
    }
    return t;
  };
  URI.buildQuery = function(data, duplicateQueryParameters, escapeQuerySpace) {
    var t = '';
    var unique,
        key,
        i,
        length;
    for (key in data) {
      if (hasOwn.call(data, key) && key) {
        if (isArray(data[key])) {
          unique = {};
          for (i = 0, length = data[key].length; i < length; i++) {
            if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
              t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
              if (duplicateQueryParameters !== true) {
                unique[data[key][i] + ''] = true;
              }
            }
          }
        } else if (data[key] !== undefined) {
          t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
        }
      }
    }
    return t.substring(1);
  };
  URI.buildQueryParameter = function(name, value, escapeQuerySpace) {
    return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
  };
  URI.addQuery = function(data, name, value) {
    if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.addQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (data[name] === undefined) {
        data[name] = value;
        return;
      } else if (typeof data[name] === 'string') {
        data[name] = [data[name]];
      }
      if (!isArray(value)) {
        value = [value];
      }
      data[name] = (data[name] || []).concat(value);
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }
  };
  URI.removeQuery = function(data, name, value) {
    var i,
        length,
        key;
    if (isArray(name)) {
      for (i = 0, length = name.length; i < length; i++) {
        data[name[i]] = undefined;
      }
    } else if (getType(name) === 'RegExp') {
      for (key in data) {
        if (name.test(key)) {
          data[key] = undefined;
        }
      }
    } else if (typeof name === 'object') {
      for (key in name) {
        if (hasOwn.call(name, key)) {
          URI.removeQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (value !== undefined) {
        if (getType(value) === 'RegExp') {
          if (!isArray(data[name]) && value.test(data[name])) {
            data[name] = undefined;
          } else {
            data[name] = filterArrayValues(data[name], value);
          }
        } else if (data[name] === String(value) && (!isArray(value) || value.length === 1)) {
          data[name] = undefined;
        } else if (isArray(data[name])) {
          data[name] = filterArrayValues(data[name], value);
        }
      } else {
        data[name] = undefined;
      }
    } else {
      throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
    }
  };
  URI.hasQuery = function(data, name, value, withinArray) {
    switch (getType(name)) {
      case 'String':
        break;
      case 'RegExp':
        for (var key in data) {
          if (hasOwn.call(data, key)) {
            if (name.test(key) && (value === undefined || URI.hasQuery(data, key, value))) {
              return true;
            }
          }
        }
        return false;
      case 'Object':
        for (var _key in name) {
          if (hasOwn.call(name, _key)) {
            if (!URI.hasQuery(data, _key, name[_key])) {
              return false;
            }
          }
        }
        return true;
      default:
        throw new TypeError('URI.hasQuery() accepts a string, regular expression or object as the name parameter');
    }
    switch (getType(value)) {
      case 'Undefined':
        return name in data;
      case 'Boolean':
        var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);
        return value === _booly;
      case 'Function':
        return !!value(data[name], name, data);
      case 'Array':
        if (!isArray(data[name])) {
          return false;
        }
        var op = withinArray ? arrayContains : arraysEqual;
        return op(data[name], value);
      case 'RegExp':
        if (!isArray(data[name])) {
          return Boolean(data[name] && data[name].match(value));
        }
        if (!withinArray) {
          return false;
        }
        return arrayContains(data[name], value);
      case 'Number':
        value = String(value);
      case 'String':
        if (!isArray(data[name])) {
          return data[name] === value;
        }
        if (!withinArray) {
          return false;
        }
        return arrayContains(data[name], value);
      default:
        throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
    }
  };
  URI.joinPaths = function() {
    var input = [];
    var segments = [];
    var nonEmptySegments = 0;
    for (var i = 0; i < arguments.length; i++) {
      var url = new URI(arguments[i]);
      input.push(url);
      var _segments = url.segment();
      for (var s = 0; s < _segments.length; s++) {
        if (typeof _segments[s] === 'string') {
          segments.push(_segments[s]);
        }
        if (_segments[s]) {
          nonEmptySegments++;
        }
      }
    }
    if (!segments.length || !nonEmptySegments) {
      return new URI('');
    }
    var uri = new URI('').segment(segments);
    if (input[0].path() === '' || input[0].path().slice(0, 1) === '/') {
      uri.path('/' + uri.path());
    }
    return uri.normalize();
  };
  URI.commonPath = function(one, two) {
    var length = Math.min(one.length, two.length);
    var pos;
    for (pos = 0; pos < length; pos++) {
      if (one.charAt(pos) !== two.charAt(pos)) {
        pos--;
        break;
      }
    }
    if (pos < 1) {
      return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
    }
    if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
      pos = one.substring(0, pos).lastIndexOf('/');
    }
    return one.substring(0, pos + 1);
  };
  URI.withinString = function(string, callback, options) {
    options || (options = {});
    var _start = options.start || URI.findUri.start;
    var _end = options.end || URI.findUri.end;
    var _trim = options.trim || URI.findUri.trim;
    var _attributeOpen = /[a-z0-9-]=["']?$/i;
    _start.lastIndex = 0;
    while (true) {
      var match = _start.exec(string);
      if (!match) {
        break;
      }
      var start = match.index;
      if (options.ignoreHtml) {
        var attributeOpen = string.slice(Math.max(start - 3, 0), start);
        if (attributeOpen && _attributeOpen.test(attributeOpen)) {
          continue;
        }
      }
      var end = start + string.slice(start).search(_end);
      var slice = string.slice(start, end).replace(_trim, '');
      if (options.ignore && options.ignore.test(slice)) {
        continue;
      }
      end = start + slice.length;
      var result = callback(slice, start, end, string);
      string = string.slice(0, start) + result + string.slice(end);
      _start.lastIndex = start + result.length;
    }
    _start.lastIndex = 0;
    return string;
  };
  URI.ensureValidHostname = function(v) {
    if (v.match(URI.invalid_hostname_characters)) {
      if (!punycode) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available');
      }
      if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }
    }
  };
  URI.noConflict = function(removeAll) {
    if (removeAll) {
      var unconflicted = {URI: this.noConflict()};
      if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
        unconflicted.URITemplate = root.URITemplate.noConflict();
      }
      if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
        unconflicted.IPv6 = root.IPv6.noConflict();
      }
      if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
        unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
      }
      return unconflicted;
    } else if (root.URI === this) {
      root.URI = _URI;
    }
    return this;
  };
  p.build = function(deferBuild) {
    if (deferBuild === true) {
      this._deferred_build = true;
    } else if (deferBuild === undefined || this._deferred_build) {
      this._string = URI.build(this._parts);
      this._deferred_build = false;
    }
    return this;
  };
  p.clone = function() {
    return new URI(this);
  };
  p.valueOf = p.toString = function() {
    return this.build(false)._string;
  };
  function generateSimpleAccessor(_part) {
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        this._parts[_part] = v || null;
        this.build(!build);
        return this;
      }
    };
  }
  function generatePrefixAccessor(_part, _key) {
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        if (v !== null) {
          v = v + '';
          if (v.charAt(0) === _key) {
            v = v.substring(1);
          }
        }
        this._parts[_part] = v;
        this.build(!build);
        return this;
      }
    };
  }
  p.protocol = generateSimpleAccessor('protocol');
  p.username = generateSimpleAccessor('username');
  p.password = generateSimpleAccessor('password');
  p.hostname = generateSimpleAccessor('hostname');
  p.port = generateSimpleAccessor('port');
  p.query = generatePrefixAccessor('query', '?');
  p.fragment = generatePrefixAccessor('fragment', '#');
  p.search = function(v, build) {
    var t = this.query(v, build);
    return typeof t === 'string' && t.length ? ('?' + t) : t;
  };
  p.hash = function(v, build) {
    var t = this.fragment(v, build);
    return typeof t === 'string' && t.length ? ('#' + t) : t;
  };
  p.pathname = function(v, build) {
    if (v === undefined || v === true) {
      var res = this._parts.path || (this._parts.hostname ? '/' : '');
      return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
    } else {
      if (this._parts.urn) {
        this._parts.path = v ? URI.recodeUrnPath(v) : '';
      } else {
        this._parts.path = v ? URI.recodePath(v) : '/';
      }
      this.build(!build);
      return this;
    }
  };
  p.path = p.pathname;
  p.href = function(href, build) {
    var key;
    if (href === undefined) {
      return this.toString();
    }
    this._string = '';
    this._parts = URI._parts();
    var _URI = href instanceof URI;
    var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);
    if (href.nodeName) {
      var attribute = URI.getDomAttribute(href);
      href = href[attribute] || '';
      _object = false;
    }
    if (!_URI && _object && href.pathname !== undefined) {
      href = href.toString();
    }
    if (typeof href === 'string' || href instanceof String) {
      this._parts = URI.parse(String(href), this._parts);
    } else if (_URI || _object) {
      var src = _URI ? href._parts : href;
      for (key in src) {
        if (hasOwn.call(this._parts, key)) {
          this._parts[key] = src[key];
        }
      }
    } else {
      throw new TypeError('invalid input');
    }
    this.build(!build);
    return this;
  };
  p.is = function(what) {
    var ip = false;
    var ip4 = false;
    var ip6 = false;
    var name = false;
    var sld = false;
    var idn = false;
    var punycode = false;
    var relative = !this._parts.urn;
    if (this._parts.hostname) {
      relative = false;
      ip4 = URI.ip4_expression.test(this._parts.hostname);
      ip6 = URI.ip6_expression.test(this._parts.hostname);
      ip = ip4 || ip6;
      name = !ip;
      sld = name && SLD && SLD.has(this._parts.hostname);
      idn = name && URI.idn_expression.test(this._parts.hostname);
      punycode = name && URI.punycode_expression.test(this._parts.hostname);
    }
    switch (what.toLowerCase()) {
      case 'relative':
        return relative;
      case 'absolute':
        return !relative;
      case 'domain':
      case 'name':
        return name;
      case 'sld':
        return sld;
      case 'ip':
        return ip;
      case 'ip4':
      case 'ipv4':
      case 'inet4':
        return ip4;
      case 'ip6':
      case 'ipv6':
      case 'inet6':
        return ip6;
      case 'idn':
        return idn;
      case 'url':
        return !this._parts.urn;
      case 'urn':
        return !!this._parts.urn;
      case 'punycode':
        return punycode;
    }
    return null;
  };
  var _protocol = p.protocol;
  var _port = p.port;
  var _hostname = p.hostname;
  p.protocol = function(v, build) {
    if (v !== undefined) {
      if (v) {
        v = v.replace(/:(\/\/)?$/, '');
        if (!v.match(URI.protocol_expression)) {
          throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
        }
      }
    }
    return _protocol.call(this, v, build);
  };
  p.scheme = p.protocol;
  p.port = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v !== undefined) {
      if (v === 0) {
        v = null;
      }
      if (v) {
        v += '';
        if (v.charAt(0) === ':') {
          v = v.substring(1);
        }
        if (v.match(/[^0-9]/)) {
          throw new TypeError('Port "' + v + '" contains characters other than [0-9]');
        }
      }
    }
    return _port.call(this, v, build);
  };
  p.hostname = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v !== undefined) {
      var x = {};
      var res = URI.parseHost(v, x);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }
      v = x.hostname;
    }
    return _hostname.call(this, v, build);
  };
  p.origin = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined) {
      var protocol = this.protocol();
      var authority = this.authority();
      if (!authority) {
        return '';
      }
      return (protocol ? protocol + '://' : '') + this.authority();
    } else {
      var origin = URI(v);
      this.protocol(origin.protocol()).authority(origin.authority()).build(!build);
      return this;
    }
  };
  p.host = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined) {
      return this._parts.hostname ? URI.buildHost(this._parts) : '';
    } else {
      var res = URI.parseHost(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }
      this.build(!build);
      return this;
    }
  };
  p.authority = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined) {
      return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
    } else {
      var res = URI.parseAuthority(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }
      this.build(!build);
      return this;
    }
  };
  p.userinfo = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined) {
      var t = URI.buildUserinfo(this._parts);
      return t ? t.substring(0, t.length - 1) : t;
    } else {
      if (v[v.length - 1] !== '@') {
        v += '@';
      }
      URI.parseUserinfo(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.resource = function(v, build) {
    var parts;
    if (v === undefined) {
      return this.path() + this.search() + this.hash();
    }
    parts = URI.parse(v);
    this._parts.path = parts.path;
    this._parts.query = parts.query;
    this._parts.fragment = parts.fragment;
    this.build(!build);
    return this;
  };
  p.subdomain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }
      var end = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, end) || '';
    } else {
      var e = this._parts.hostname.length - this.domain().length;
      var sub = this._parts.hostname.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(sub));
      if (v && v.charAt(v.length - 1) !== '.') {
        v += '.';
      }
      if (v) {
        URI.ensureValidHostname(v);
      }
      this._parts.hostname = this._parts.hostname.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.domain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }
      var t = this._parts.hostname.match(/\./g);
      if (t && t.length < 2) {
        return this._parts.hostname;
      }
      var end = this._parts.hostname.length - this.tld(build).length - 1;
      end = this._parts.hostname.lastIndexOf('.', end - 1) + 1;
      return this._parts.hostname.substring(end) || '';
    } else {
      if (!v) {
        throw new TypeError('cannot set domain empty');
      }
      URI.ensureValidHostname(v);
      if (!this._parts.hostname || this.is('IP')) {
        this._parts.hostname = v;
      } else {
        var replace = new RegExp(escapeRegEx(this.domain()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }
      this.build(!build);
      return this;
    }
  };
  p.tld = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }
      var pos = this._parts.hostname.lastIndexOf('.');
      var tld = this._parts.hostname.substring(pos + 1);
      if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
        return SLD.get(this._parts.hostname) || tld;
      }
      return tld;
    } else {
      var replace;
      if (!v) {
        throw new TypeError('cannot set TLD empty');
      } else if (v.match(/[^a-zA-Z0-9-]/)) {
        if (SLD && SLD.is(v)) {
          replace = new RegExp(escapeRegEx(this.tld()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        } else {
          throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
        }
      } else if (!this._parts.hostname || this.is('IP')) {
        throw new ReferenceError('cannot set TLD on non-domain host');
      } else {
        replace = new RegExp(escapeRegEx(this.tld()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }
      this.build(!build);
      return this;
    }
  };
  p.directory = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined || v === true) {
      if (!this._parts.path && !this._parts.hostname) {
        return '';
      }
      if (this._parts.path === '/') {
        return '/';
      }
      var end = this._parts.path.length - this.filename().length - 1;
      var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');
      return v ? URI.decodePath(res) : res;
    } else {
      var e = this._parts.path.length - this.filename().length;
      var directory = this._parts.path.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(directory));
      if (!this.is('relative')) {
        if (!v) {
          v = '/';
        }
        if (v.charAt(0) !== '/') {
          v = '/' + v;
        }
      }
      if (v && v.charAt(v.length - 1) !== '/') {
        v += '/';
      }
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.filename = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }
      var pos = this._parts.path.lastIndexOf('/');
      var res = this._parts.path.substring(pos + 1);
      return v ? URI.decodePathSegment(res) : res;
    } else {
      var mutatedDirectory = false;
      if (v.charAt(0) === '/') {
        v = v.substring(1);
      }
      if (v.match(/\.?\//)) {
        mutatedDirectory = true;
      }
      var replace = new RegExp(escapeRegEx(this.filename()) + '$');
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      if (mutatedDirectory) {
        this.normalizePath(build);
      } else {
        this.build(!build);
      }
      return this;
    }
  };
  p.suffix = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }
    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }
      var filename = this.filename();
      var pos = filename.lastIndexOf('.');
      var s,
          res;
      if (pos === -1) {
        return '';
      }
      s = filename.substring(pos + 1);
      res = (/^[a-z0-9%]+$/i).test(s) ? s : '';
      return v ? URI.decodePathSegment(res) : res;
    } else {
      if (v.charAt(0) === '.') {
        v = v.substring(1);
      }
      var suffix = this.suffix();
      var replace;
      if (!suffix) {
        if (!v) {
          return this;
        }
        this._parts.path += '.' + URI.recodePath(v);
      } else if (!v) {
        replace = new RegExp(escapeRegEx('.' + suffix) + '$');
      } else {
        replace = new RegExp(escapeRegEx(suffix) + '$');
      }
      if (replace) {
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
      }
      this.build(!build);
      return this;
    }
  };
  p.segment = function(segment, v, build) {
    var separator = this._parts.urn ? ':' : '/';
    var path = this.path();
    var absolute = path.substring(0, 1) === '/';
    var segments = path.split(separator);
    if (segment !== undefined && typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }
    if (segment !== undefined && typeof segment !== 'number') {
      throw new Error('Bad segment "' + segment + '", must be 0-based integer');
    }
    if (absolute) {
      segments.shift();
    }
    if (segment < 0) {
      segment = Math.max(segments.length + segment, 0);
    }
    if (v === undefined) {
      return segment === undefined ? segments : segments[segment];
    } else if (segment === null || segments[segment] === undefined) {
      if (isArray(v)) {
        segments = [];
        for (var i = 0,
            l = v.length; i < l; i++) {
          if (!v[i].length && (!segments.length || !segments[segments.length - 1].length)) {
            continue;
          }
          if (segments.length && !segments[segments.length - 1].length) {
            segments.pop();
          }
          segments.push(trimSlashes(v[i]));
        }
      } else if (v || typeof v === 'string') {
        v = trimSlashes(v);
        if (segments[segments.length - 1] === '') {
          segments[segments.length - 1] = v;
        } else {
          segments.push(v);
        }
      }
    } else {
      if (v) {
        segments[segment] = trimSlashes(v);
      } else {
        segments.splice(segment, 1);
      }
    }
    if (absolute) {
      segments.unshift('');
    }
    return this.path(segments.join(separator), build);
  };
  p.segmentCoded = function(segment, v, build) {
    var segments,
        i,
        l;
    if (typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }
    if (v === undefined) {
      segments = this.segment(segment, v, build);
      if (!isArray(segments)) {
        segments = segments !== undefined ? URI.decode(segments) : undefined;
      } else {
        for (i = 0, l = segments.length; i < l; i++) {
          segments[i] = URI.decode(segments[i]);
        }
      }
      return segments;
    }
    if (!isArray(v)) {
      v = (typeof v === 'string' || v instanceof String) ? URI.encode(v) : v;
    } else {
      for (i = 0, l = v.length; i < l; i++) {
        v[i] = URI.encode(v[i]);
      }
    }
    return this.segment(segment, v, build);
  };
  var q = p.query;
  p.query = function(v, build) {
    if (v === true) {
      return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    } else if (typeof v === 'function') {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      var result = v.call(this, data);
      this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else if (v !== undefined && typeof v !== 'string') {
      this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else {
      return q.call(this, v, build);
    }
  };
  p.setQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    if (typeof name === 'string' || name instanceof String) {
      data[name] = value !== undefined ? value : null;
    } else if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          data[key] = name[key];
        }
      }
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }
    this.build(!build);
    return this;
  };
  p.addQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.addQuery(data, name, value === undefined ? null : value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }
    this.build(!build);
    return this;
  };
  p.removeQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.removeQuery(data, name, value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }
    this.build(!build);
    return this;
  };
  p.hasQuery = function(name, value, withinArray) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    return URI.hasQuery(data, name, value, withinArray);
  };
  p.setSearch = p.setQuery;
  p.addSearch = p.addQuery;
  p.removeSearch = p.removeQuery;
  p.hasSearch = p.hasQuery;
  p.normalize = function() {
    if (this._parts.urn) {
      return this.normalizeProtocol(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build();
    }
    return this.normalizeProtocol(false).normalizeHostname(false).normalizePort(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build();
  };
  p.normalizeProtocol = function(build) {
    if (typeof this._parts.protocol === 'string') {
      this._parts.protocol = this._parts.protocol.toLowerCase();
      this.build(!build);
    }
    return this;
  };
  p.normalizeHostname = function(build) {
    if (this._parts.hostname) {
      if (this.is('IDN') && punycode) {
        this._parts.hostname = punycode.toASCII(this._parts.hostname);
      } else if (this.is('IPv6') && IPv6) {
        this._parts.hostname = IPv6.best(this._parts.hostname);
      }
      this._parts.hostname = this._parts.hostname.toLowerCase();
      this.build(!build);
    }
    return this;
  };
  p.normalizePort = function(build) {
    if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
      this._parts.port = null;
      this.build(!build);
    }
    return this;
  };
  p.normalizePath = function(build) {
    var _path = this._parts.path;
    if (!_path) {
      return this;
    }
    if (this._parts.urn) {
      this._parts.path = URI.recodeUrnPath(this._parts.path);
      this.build(!build);
      return this;
    }
    if (this._parts.path === '/') {
      return this;
    }
    _path = URI.recodePath(_path);
    var _was_relative;
    var _leadingParents = '';
    var _parent,
        _pos;
    if (_path.charAt(0) !== '/') {
      _was_relative = true;
      _path = '/' + _path;
    }
    if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
      _path += '/';
    }
    _path = _path.replace(/(\/(\.\/)+)|(\/\.$)/g, '/').replace(/\/{2,}/g, '/');
    if (_was_relative) {
      _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';
      if (_leadingParents) {
        _leadingParents = _leadingParents[0];
      }
    }
    while (true) {
      _parent = _path.search(/\/\.\.(\/|$)/);
      if (_parent === -1) {
        break;
      } else if (_parent === 0) {
        _path = _path.substring(3);
        continue;
      }
      _pos = _path.substring(0, _parent).lastIndexOf('/');
      if (_pos === -1) {
        _pos = _parent;
      }
      _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
    }
    if (_was_relative && this.is('relative')) {
      _path = _leadingParents + _path.substring(1);
    }
    this._parts.path = _path;
    this.build(!build);
    return this;
  };
  p.normalizePathname = p.normalizePath;
  p.normalizeQuery = function(build) {
    if (typeof this._parts.query === 'string') {
      if (!this._parts.query.length) {
        this._parts.query = null;
      } else {
        this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
      }
      this.build(!build);
    }
    return this;
  };
  p.normalizeFragment = function(build) {
    if (!this._parts.fragment) {
      this._parts.fragment = null;
      this.build(!build);
    }
    return this;
  };
  p.normalizeSearch = p.normalizeQuery;
  p.normalizeHash = p.normalizeFragment;
  p.iso8859 = function() {
    var e = URI.encode;
    var d = URI.decode;
    URI.encode = escape;
    URI.decode = decodeURIComponent;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };
  p.unicode = function() {
    var e = URI.encode;
    var d = URI.decode;
    URI.encode = strictEncodeURIComponent;
    URI.decode = unescape;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };
  p.readable = function() {
    var uri = this.clone();
    uri.username('').password('').normalize();
    var t = '';
    if (uri._parts.protocol) {
      t += uri._parts.protocol + '://';
    }
    if (uri._parts.hostname) {
      if (uri.is('punycode') && punycode) {
        t += punycode.toUnicode(uri._parts.hostname);
        if (uri._parts.port) {
          t += ':' + uri._parts.port;
        }
      } else {
        t += uri.host();
      }
    }
    if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
      t += '/';
    }
    t += uri.path(true);
    if (uri._parts.query) {
      var q = '';
      for (var i = 0,
          qp = uri._parts.query.split('&'),
          l = qp.length; i < l; i++) {
        var kv = (qp[i] || '').split('=');
        q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace).replace(/&/g, '%26');
        if (kv[1] !== undefined) {
          q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace).replace(/&/g, '%26');
        }
      }
      t += '?' + q.substring(1);
    }
    t += URI.decodeQuery(uri.hash(), true);
    return t;
  };
  p.absoluteTo = function(base) {
    var resolved = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var basedir,
        i,
        p;
    if (this._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }
    if (!(base instanceof URI)) {
      base = new URI(base);
    }
    if (!resolved._parts.protocol) {
      resolved._parts.protocol = base._parts.protocol;
    }
    if (this._parts.hostname) {
      return resolved;
    }
    for (i = 0; (p = properties[i]); i++) {
      resolved._parts[p] = base._parts[p];
    }
    if (!resolved._parts.path) {
      resolved._parts.path = base._parts.path;
      if (!resolved._parts.query) {
        resolved._parts.query = base._parts.query;
      }
    } else if (resolved._parts.path.substring(-2) === '..') {
      resolved._parts.path += '/';
    }
    if (resolved.path().charAt(0) !== '/') {
      basedir = base.directory();
      basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
      resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
      resolved.normalizePath();
    }
    resolved.build();
    return resolved;
  };
  p.relativeTo = function(base) {
    var relative = this.clone().normalize();
    var relativeParts,
        baseParts,
        common,
        relativePath,
        basePath;
    if (relative._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }
    base = new URI(base).normalize();
    relativeParts = relative._parts;
    baseParts = base._parts;
    relativePath = relative.path();
    basePath = base.path();
    if (relativePath.charAt(0) !== '/') {
      throw new Error('URI is already relative');
    }
    if (basePath.charAt(0) !== '/') {
      throw new Error('Cannot calculate a URI relative to another relative URI');
    }
    if (relativeParts.protocol === baseParts.protocol) {
      relativeParts.protocol = null;
    }
    if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
      return relative.build();
    }
    if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
      return relative.build();
    }
    if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
      relativeParts.hostname = null;
      relativeParts.port = null;
    } else {
      return relative.build();
    }
    if (relativePath === basePath) {
      relativeParts.path = '';
      return relative.build();
    }
    common = URI.commonPath(relativePath, basePath);
    if (!common) {
      return relative.build();
    }
    var parents = baseParts.path.substring(common.length).replace(/[^\/]*$/, '').replace(/.*?\//g, '../');
    relativeParts.path = (parents + relativeParts.path.substring(common.length)) || './';
    return relative.build();
  };
  p.equals = function(uri) {
    var one = this.clone();
    var two = new URI(uri);
    var one_map = {};
    var two_map = {};
    var checked = {};
    var one_query,
        two_query,
        key;
    one.normalize();
    two.normalize();
    if (one.toString() === two.toString()) {
      return true;
    }
    one_query = one.query();
    two_query = two.query();
    one.query('');
    two.query('');
    if (one.toString() !== two.toString()) {
      return false;
    }
    if (one_query.length !== two_query.length) {
      return false;
    }
    one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
    two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);
    for (key in one_map) {
      if (hasOwn.call(one_map, key)) {
        if (!isArray(one_map[key])) {
          if (one_map[key] !== two_map[key]) {
            return false;
          }
        } else if (!arraysEqual(one_map[key], two_map[key])) {
          return false;
        }
        checked[key] = true;
      }
    }
    for (key in two_map) {
      if (hasOwn.call(two_map, key)) {
        if (!checked[key]) {
          return false;
        }
      }
    }
    return true;
  };
  p.duplicateQueryParameters = function(v) {
    this._parts.duplicateQueryParameters = !!v;
    return this;
  };
  p.escapeQuerySpace = function(v) {
    this._parts.escapeQuerySpace = !!v;
    return this;
  };
  return URI;
}));

})();
$__System.registerDynamic("8", [], true, function ($__require, exports, module) {
    var define,
        global = this || self,
        GLOBAL = global;
    // THIS FILE IS GENERATED - DO NOT EDIT!
    /*global module:false, define:false*/

    (function (define, undefined) {
        define(function () {
            'use strict';

            var impl = {};

            impl.mobileDetectRules = {
                "phones": {
                    "iPhone": "\\biPhone\\b|\\biPod\\b",
                    "BlackBerry": "BlackBerry|\\bBB10\\b|rim[0-9]+",
                    "HTC": "HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m",
                    "Nexus": "Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 6",
                    "Dell": "Dell.*Streak|Dell.*Aero|Dell.*Venue|DELL.*Venue Pro|Dell Flash|Dell Smoke|Dell Mini 3iX|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b",
                    "Motorola": "Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b",
                    "Samsung": "Samsung|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205|SM-G9350",
                    "LG": "\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802|MS323)",
                    "Sony": "SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533",
                    "Asus": "Asus.*Galaxy|PadFone.*Mobile",
                    "Micromax": "Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b",
                    "Palm": "PalmSource|Palm",
                    "Vertu": "Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature",
                    "Pantech": "PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790",
                    "Fly": "IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250",
                    "Wiko": "KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM",
                    "iMobile": "i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)",
                    "SimValley": "\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b",
                    "Wolfgang": "AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q",
                    "Alcatel": "Alcatel",
                    "Nintendo": "Nintendo 3DS",
                    "Amoi": "Amoi",
                    "INQ": "INQ",
                    "GenericPhone": "Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser"
                },
                "tablets": {
                    "iPad": "iPad|iPad.*Mobile",
                    "NexusTablet": "Android.*Nexus[\\s]+(7|9|10)",
                    "SamsungTablet": "SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T815|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715|SM-T560|SM-T670|SM-T677|SM-T377|SM-T567|SM-T357T|SM-T555|SM-T561",
                    "Kindle": "Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI)\\b",
                    "SurfaceTablet": "Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)",
                    "HPTablet": "HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10",
                    "AsusTablet": "^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K017 |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C",
                    "BlackBerryTablet": "PlayBook|RIM Tablet",
                    "HTCtablet": "HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410",
                    "MotorolaTablet": "xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617",
                    "NookTablet": "Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2",
                    "AcerTablet": "Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b",
                    "ToshibaTablet": "Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO",
                    "LGTablet": "\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b",
                    "FujitsuTablet": "Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b",
                    "PrestigioTablet": "PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002",
                    "LenovoTablet": "Lenovo TAB|Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)",
                    "DellTablet": "Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7",
                    "YarvikTablet": "Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b",
                    "MedionTablet": "Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB",
                    "ArnovaTablet": "AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2",
                    "IntensoTablet": "INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004",
                    "IRUTablet": "M702pro",
                    "MegafonTablet": "MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b",
                    "EbodaTablet": "E-Boda (Supreme|Impresspeed|Izzycomm|Essential)",
                    "AllViewTablet": "Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)",
                    "ArchosTablet": "\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b",
                    "AinolTablet": "NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark",
                    "SonyTablet": "Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP612|SOT31",
                    "PhilipsTablet": "\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b",
                    "CubeTablet": "Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT",
                    "CobyTablet": "MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010",
                    "MIDTablet": "M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733|MID4X10",
                    "MSITablet": "MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b",
                    "SMiTTablet": "Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)",
                    "RockChipTablet": "Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A",
                    "FlyTablet": "IQ310|Fly Vision",
                    "bqTablet": "Android.*(bq)?.*(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris E10)|Maxwell.*Lite|Maxwell.*Plus",
                    "HuaweiTablet": "MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim",
                    "NecTablet": "\\bN-06D|\\bN-08D",
                    "PantechTablet": "Pantech.*P4100",
                    "BronchoTablet": "Broncho.*(N701|N708|N802|a710)",
                    "VersusTablet": "TOUCHPAD.*[78910]|\\bTOUCHTAB\\b",
                    "ZyncTablet": "z1000|Z99 2G|z99|z930|z999|z990|z909|Z919|z900",
                    "PositivoTablet": "TB07STA|TB10STA|TB07FTA|TB10FTA",
                    "NabiTablet": "Android.*\\bNabi",
                    "KoboTablet": "Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build",
                    "DanewTablet": "DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b",
                    "TexetTablet": "NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE",
                    "PlaystationTablet": "Playstation.*(Portable|Vita)",
                    "TrekstorTablet": "ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab",
                    "PyleAudioTablet": "\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b",
                    "AdvanTablet": "Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ",
                    "DanyTechTablet": "Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1",
                    "GalapadTablet": "Android.*\\bG1\\b",
                    "MicromaxTablet": "Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b",
                    "KarbonnTablet": "Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b",
                    "AllFineTablet": "Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide",
                    "PROSCANTablet": "\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b",
                    "YONESTablet": "BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026",
                    "ChangJiaTablet": "TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503",
                    "GUTablet": "TX-A1301|TX-M9002|Q702|kf026",
                    "PointOfViewTablet": "TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10",
                    "OvermaxTablet": "OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)",
                    "HCLTablet": "HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync",
                    "DPSTablet": "DPS Dream 9|DPS Dual 7",
                    "VistureTablet": "V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10",
                    "CrestaTablet": "CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989",
                    "MediatekTablet": "\\bMT8125|MT8389|MT8135|MT8377\\b",
                    "ConcordeTablet": "Concorde([ ]+)?Tab|ConCorde ReadMan",
                    "GoCleverTablet": "GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042",
                    "ModecomTablet": "FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003",
                    "VoninoTablet": "\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b",
                    "ECSTablet": "V07OT2|TM105A|S10OT1|TR10CS1",
                    "StorexTablet": "eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab",
                    "VodafoneTablet": "SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7",
                    "EssentielBTablet": "Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2",
                    "RossMoorTablet": "RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711",
                    "iMobileTablet": "i-mobile i-note",
                    "TolinoTablet": "tolino tab [0-9.]+|tolino shine",
                    "AudioSonicTablet": "\\bC-22Q|T7-QC|T-17B|T-17P\\b",
                    "AMPETablet": "Android.* A78 ",
                    "SkkTablet": "Android.* (SKYPAD|PHOENIX|CYCLOPS)",
                    "TecnoTablet": "TECNO P9",
                    "JXDTablet": "Android.* \\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b",
                    "iJoyTablet": "Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)",
                    "FX2Tablet": "FX2 PAD7|FX2 PAD10",
                    "XoroTablet": "KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151",
                    "ViewsonicTablet": "ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a",
                    "OdysTablet": "LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10",
                    "CaptivaTablet": "CAPTIVA PAD",
                    "IconbitTablet": "NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S",
                    "TeclastTablet": "T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi",
                    "OndaTablet": "\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+",
                    "JaytechTablet": "TPC-PA762",
                    "BlaupunktTablet": "Endeavour 800NG|Endeavour 1010",
                    "DigmaTablet": "\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b",
                    "EvolioTablet": "ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b",
                    "LavaTablet": "QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b",
                    "AocTablet": "MW0811|MW0812|MW0922|MTK8382",
                    "MpmanTablet": "MP11 OCTA|MP10 OCTA|MPQC1114|MPQC1004|MPQC994|MPQC974|MPQC973|MPQC804|MPQC784|MPQC780|\\bMPG7\\b|MPDCG75|MPDCG71|MPDC1006|MP101DC|MPDC9000|MPDC905|MPDC706HD|MPDC706|MPDC705|MPDC110|MPDC100|MPDC99|MPDC97|MPDC88|MPDC8|MPDC77|MP709|MID701|MID711|MID170|MPDC703|MPQC1010",
                    "CelkonTablet": "CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b",
                    "WolderTablet": "miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b",
                    "MiTablet": "\\bMI PAD\\b|\\bHM NOTE 1W\\b",
                    "NibiruTablet": "Nibiru M1|Nibiru Jupiter One",
                    "NexoTablet": "NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI",
                    "LeaderTablet": "TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100",
                    "UbislateTablet": "UbiSlate[\\s]?7C",
                    "PocketBookTablet": "Pocketbook",
                    "Hudl": "Hudl HT7S3|Hudl 2",
                    "TelstraTablet": "T-Hub2",
                    "GenericTablet": "Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bJolla\\b|\\bTP750\\b"
                },
                "oss": {
                    "AndroidOS": "Android",
                    "BlackBerryOS": "blackberry|\\bBB10\\b|rim tablet os",
                    "PalmOS": "PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino",
                    "SymbianOS": "Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b",
                    "WindowsMobileOS": "Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Window Mobile|Windows Phone [0-9.]+|WCE;",
                    "WindowsPhoneOS": "Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;",
                    "iOS": "\\biPhone.*Mobile|\\biPod|\\biPad",
                    "MeeGoOS": "MeeGo",
                    "MaemoOS": "Maemo",
                    "JavaOS": "J2ME\/|\\bMIDP\\b|\\bCLDC\\b",
                    "webOS": "webOS|hpwOS",
                    "badaOS": "\\bBada\\b",
                    "BREWOS": "BREW"
                },
                "uas": {
                    "Chrome": "\\bCrMo\\b|CriOS|Android.*Chrome\/[.0-9]* (Mobile)?",
                    "Dolfin": "\\bDolfin\\b",
                    "Opera": "Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR\/[0-9.]+|Coast\/[0-9.]+",
                    "Skyfire": "Skyfire",
                    "IE": "IEMobile|MSIEMobile",
                    "Firefox": "fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile",
                    "Bolt": "bolt",
                    "TeaShark": "teashark",
                    "Blazer": "Blazer",
                    "Safari": "Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari",
                    "Tizen": "Tizen",
                    "UCBrowser": "UC.*Browser|UCWEB",
                    "baiduboxapp": "baiduboxapp",
                    "baidubrowser": "baidubrowser",
                    "DiigoBrowser": "DiigoBrowser",
                    "Puffin": "Puffin",
                    "Mercury": "\\bMercury\\b",
                    "ObigoBrowser": "Obigo",
                    "NetFront": "NF-Browser",
                    "GenericBrowser": "NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger"
                },
                "props": {
                    "Mobile": "Mobile\/[VER]",
                    "Build": "Build\/[VER]",
                    "Version": "Version\/[VER]",
                    "VendorID": "VendorID\/[VER]",
                    "iPad": "iPad.*CPU[a-z ]+[VER]",
                    "iPhone": "iPhone.*CPU[a-z ]+[VER]",
                    "iPod": "iPod.*CPU[a-z ]+[VER]",
                    "Kindle": "Kindle\/[VER]",
                    "Chrome": ["Chrome\/[VER]", "CriOS\/[VER]", "CrMo\/[VER]"],
                    "Coast": ["Coast\/[VER]"],
                    "Dolfin": "Dolfin\/[VER]",
                    "Firefox": "Firefox\/[VER]",
                    "Fennec": "Fennec\/[VER]",
                    "IE": ["IEMobile\/[VER];", "IEMobile [VER]", "MSIE [VER];", "Trident\/[0-9.]+;.*rv:[VER]"],
                    "NetFront": "NetFront\/[VER]",
                    "NokiaBrowser": "NokiaBrowser\/[VER]",
                    "Opera": [" OPR\/[VER]", "Opera Mini\/[VER]", "Version\/[VER]"],
                    "Opera Mini": "Opera Mini\/[VER]",
                    "Opera Mobi": "Version\/[VER]",
                    "UC Browser": "UC Browser[VER]",
                    "MQQBrowser": "MQQBrowser\/[VER]",
                    "MicroMessenger": "MicroMessenger\/[VER]",
                    "baiduboxapp": "baiduboxapp\/[VER]",
                    "baidubrowser": "baidubrowser\/[VER]",
                    "Iron": "Iron\/[VER]",
                    "Safari": ["Version\/[VER]", "Safari\/[VER]"],
                    "Skyfire": "Skyfire\/[VER]",
                    "Tizen": "Tizen\/[VER]",
                    "Webkit": "webkit[ \/][VER]",
                    "Gecko": "Gecko\/[VER]",
                    "Trident": "Trident\/[VER]",
                    "Presto": "Presto\/[VER]",
                    "iOS": " \\bi?OS\\b [VER][ ;]{1}",
                    "Android": "Android [VER]",
                    "BlackBerry": ["BlackBerry[\\w]+\/[VER]", "BlackBerry.*Version\/[VER]", "Version\/[VER]"],
                    "BREW": "BREW [VER]",
                    "Java": "Java\/[VER]",
                    "Windows Phone OS": ["Windows Phone OS [VER]", "Windows Phone [VER]"],
                    "Windows Phone": "Windows Phone [VER]",
                    "Windows CE": "Windows CE\/[VER]",
                    "Windows NT": "Windows NT [VER]",
                    "Symbian": ["SymbianOS\/[VER]", "Symbian\/[VER]"],
                    "webOS": ["webOS\/[VER]", "hpwOS\/[VER];"]
                },
                "utils": {
                    "Bot": "Googlebot|facebookexternalhit|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom",
                    "MobileBot": "Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker\/M1A1-R2D2",
                    "DesktopMode": "WPDesktop",
                    "TV": "SonyDTV|HbbTV",
                    "WebKit": "(webkit)[ \/]([\\w.]+)",
                    "Console": "\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|PLAYSTATION|Xbox)\\b",
                    "Watch": "SM-V700"
                }
            };

            // following patterns come from http://detectmobilebrowsers.com/
            impl.detectMobileBrowsers = {
                fullPattern: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
                shortPattern: /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
                tabletPattern: /android|ipad|playbook|silk/i
            };

            var hasOwnProp = Object.prototype.hasOwnProperty,
                isArray;

            impl.FALLBACK_PHONE = 'UnknownPhone';
            impl.FALLBACK_TABLET = 'UnknownTablet';
            impl.FALLBACK_MOBILE = 'UnknownMobile';

            isArray = 'isArray' in Array ? Array.isArray : function (value) {
                return Object.prototype.toString.call(value) === '[object Array]';
            };

            function equalIC(a, b) {
                return a != null && b != null && a.toLowerCase() === b.toLowerCase();
            }

            function containsIC(array, value) {
                var valueLC,
                    i,
                    len = array.length;
                if (!len || !value) {
                    return false;
                }
                valueLC = value.toLowerCase();
                for (i = 0; i < len; ++i) {
                    if (valueLC === array[i].toLowerCase()) {
                        return true;
                    }
                }
                return false;
            }

            function convertPropsToRegExp(object) {
                for (var key in object) {
                    if (hasOwnProp.call(object, key)) {
                        object[key] = new RegExp(object[key], 'i');
                    }
                }
            }

            (function init() {
                var key,
                    values,
                    value,
                    i,
                    len,
                    verPos,
                    mobileDetectRules = impl.mobileDetectRules;
                for (key in mobileDetectRules.props) {
                    if (hasOwnProp.call(mobileDetectRules.props, key)) {
                        values = mobileDetectRules.props[key];
                        if (!isArray(values)) {
                            values = [values];
                        }
                        len = values.length;
                        for (i = 0; i < len; ++i) {
                            value = values[i];
                            verPos = value.indexOf('[VER]');
                            if (verPos >= 0) {
                                value = value.substring(0, verPos) + '([\\w._\\+]+)' + value.substring(verPos + 5);
                            }
                            values[i] = new RegExp(value, 'i');
                        }
                        mobileDetectRules.props[key] = values;
                    }
                }
                convertPropsToRegExp(mobileDetectRules.oss);
                convertPropsToRegExp(mobileDetectRules.phones);
                convertPropsToRegExp(mobileDetectRules.tablets);
                convertPropsToRegExp(mobileDetectRules.uas);
                convertPropsToRegExp(mobileDetectRules.utils);

                // copy some patterns to oss0 which are tested first (see issue#15)
                mobileDetectRules.oss0 = {
                    WindowsPhoneOS: mobileDetectRules.oss.WindowsPhoneOS,
                    WindowsMobileOS: mobileDetectRules.oss.WindowsMobileOS
                };
            })();

            /**
             * Test userAgent string against a set of rules and find the first matched key.
             * @param {Object} rules (key is String, value is RegExp)
             * @param {String} userAgent the navigator.userAgent (or HTTP-Header 'User-Agent').
             * @returns {String|null} the matched key if found, otherwise <tt>null</tt>
             * @private
             */
            impl.findMatch = function (rules, userAgent) {
                for (var key in rules) {
                    if (hasOwnProp.call(rules, key)) {
                        if (rules[key].test(userAgent)) {
                            return key;
                        }
                    }
                }
                return null;
            };

            /**
             * Test userAgent string against a set of rules and return an array of matched keys.
             * @param {Object} rules (key is String, value is RegExp)
             * @param {String} userAgent the navigator.userAgent (or HTTP-Header 'User-Agent').
             * @returns {Array} an array of matched keys, may be empty when there is no match, but not <tt>null</tt>
             * @private
             */
            impl.findMatches = function (rules, userAgent) {
                var result = [];
                for (var key in rules) {
                    if (hasOwnProp.call(rules, key)) {
                        if (rules[key].test(userAgent)) {
                            result.push(key);
                        }
                    }
                }
                return result;
            };

            /**
             * Check the version of the given property in the User-Agent.
             *
             * @param {String} propertyName
             * @param {String} userAgent
             * @return {String} version or <tt>null</tt> if version not found
             * @private
             */
            impl.getVersionStr = function (propertyName, userAgent) {
                var props = impl.mobileDetectRules.props,
                    patterns,
                    i,
                    len,
                    match;
                if (hasOwnProp.call(props, propertyName)) {
                    patterns = props[propertyName];
                    len = patterns.length;
                    for (i = 0; i < len; ++i) {
                        match = patterns[i].exec(userAgent);
                        if (match !== null) {
                            return match[1];
                        }
                    }
                }
                return null;
            };

            /**
             * Check the version of the given property in the User-Agent.
             * Will return a float number. (eg. 2_0 will return 2.0, 4.3.1 will return 4.31)
             *
             * @param {String} propertyName
             * @param {String} userAgent
             * @return {Number} version or <tt>NaN</tt> if version not found
             * @private
             */
            impl.getVersion = function (propertyName, userAgent) {
                var version = impl.getVersionStr(propertyName, userAgent);
                return version ? impl.prepareVersionNo(version) : NaN;
            };

            /**
             * Prepare the version number.
             *
             * @param {String} version
             * @return {Number} the version number as a floating number
             * @private
             */
            impl.prepareVersionNo = function (version) {
                var numbers;

                numbers = version.split(/[a-z._ \/\-]/i);
                if (numbers.length === 1) {
                    version = numbers[0];
                }
                if (numbers.length > 1) {
                    version = numbers[0] + '.';
                    numbers.shift();
                    version += numbers.join('');
                }
                return Number(version);
            };

            impl.isMobileFallback = function (userAgent) {
                return impl.detectMobileBrowsers.fullPattern.test(userAgent) || impl.detectMobileBrowsers.shortPattern.test(userAgent.substr(0, 4));
            };

            impl.isTabletFallback = function (userAgent) {
                return impl.detectMobileBrowsers.tabletPattern.test(userAgent);
            };

            impl.prepareDetectionCache = function (cache, userAgent, maxPhoneWidth) {
                if (cache.mobile !== undefined) {
                    return;
                }
                var phone, tablet, phoneSized;

                // first check for stronger tablet rules, then phone (see issue#5)
                tablet = impl.findMatch(impl.mobileDetectRules.tablets, userAgent);
                if (tablet) {
                    cache.mobile = cache.tablet = tablet;
                    cache.phone = null;
                    return; // unambiguously identified as tablet
                }

                phone = impl.findMatch(impl.mobileDetectRules.phones, userAgent);
                if (phone) {
                    cache.mobile = cache.phone = phone;
                    cache.tablet = null;
                    return; // unambiguously identified as phone
                }

                // our rules haven't found a match -> try more general fallback rules
                if (impl.isMobileFallback(userAgent)) {
                    phoneSized = MobileDetect.isPhoneSized(maxPhoneWidth);
                    if (phoneSized === undefined) {
                        cache.mobile = impl.FALLBACK_MOBILE;
                        cache.tablet = cache.phone = null;
                    } else if (phoneSized) {
                        cache.mobile = cache.phone = impl.FALLBACK_PHONE;
                        cache.tablet = null;
                    } else {
                        cache.mobile = cache.tablet = impl.FALLBACK_TABLET;
                        cache.phone = null;
                    }
                } else if (impl.isTabletFallback(userAgent)) {
                    cache.mobile = cache.tablet = impl.FALLBACK_TABLET;
                    cache.phone = null;
                } else {
                    // not mobile at all!
                    cache.mobile = cache.tablet = cache.phone = null;
                }
            };

            // t is a reference to a MobileDetect instance
            impl.mobileGrade = function (t) {
                // impl note:
                // To keep in sync w/ Mobile_Detect.php easily, the following code is tightly aligned to the PHP version.
                // When changes are made in Mobile_Detect.php, copy this method and replace:
                //     $this-> / t.
                //     self::MOBILE_GRADE_(.) / '$1'
                //     , self::VERSION_TYPE_FLOAT / (nothing)
                //     isIOS() / os('iOS')
                //     [reg] / (nothing)   <-- jsdelivr complaining about unescaped unicode character U+00AE
                var $isMobile = t.mobile() !== null;

                if (
                // Apple iOS 3.2-5.1 - Tested on the original iPad (4.3 / 5.0), iPad 2 (4.3), iPad 3 (5.1), original iPhone (3.1), iPhone 3 (3.2), 3GS (4.3), 4 (4.3 / 5.0), and 4S (5.1)
                t.os('iOS') && t.version('iPad') >= 4.3 || t.os('iOS') && t.version('iPhone') >= 3.1 || t.os('iOS') && t.version('iPod') >= 3.1 ||

                // Android 2.1-2.3 - Tested on the HTC Incredible (2.2), original Droid (2.2), HTC Aria (2.1), Google Nexus S (2.3). Functional on 1.5 & 1.6 but performance may be sluggish, tested on Google G1 (1.5)
                // Android 3.1 (Honeycomb)  - Tested on the Samsung Galaxy Tab 10.1 and Motorola XOOM
                // Android 4.0 (ICS)  - Tested on a Galaxy Nexus. Note: transition performance can be poor on upgraded devices
                // Android 4.1 (Jelly Bean)  - Tested on a Galaxy Nexus and Galaxy 7
                t.version('Android') > 2.1 && t.is('Webkit') ||

                // Windows Phone 7-7.5 - Tested on the HTC Surround (7.0) HTC Trophy (7.5), LG-E900 (7.5), Nokia Lumia 800
                t.version('Windows Phone OS') >= 7.0 ||

                // Blackberry 7 - Tested on BlackBerry Torch 9810
                // Blackberry 6.0 - Tested on the Torch 9800 and Style 9670
                t.is('BlackBerry') && t.version('BlackBerry') >= 6.0 ||
                // Blackberry Playbook (1.0-2.0) - Tested on PlayBook
                t.match('Playbook.*Tablet') ||

                // Palm WebOS (1.4-2.0) - Tested on the Palm Pixi (1.4), Pre (1.4), Pre 2 (2.0)
                t.version('webOS') >= 1.4 && t.match('Palm|Pre|Pixi') ||
                // Palm WebOS 3.0  - Tested on HP TouchPad
                t.match('hp.*TouchPad') ||

                // Firefox Mobile (12 Beta) - Tested on Android 2.3 device
                t.is('Firefox') && t.version('Firefox') >= 12 ||

                // Chrome for Android - Tested on Android 4.0, 4.1 device
                t.is('Chrome') && t.is('AndroidOS') && t.version('Android') >= 4.0 ||

                // Skyfire 4.1 - Tested on Android 2.3 device
                t.is('Skyfire') && t.version('Skyfire') >= 4.1 && t.is('AndroidOS') && t.version('Android') >= 2.3 ||

                // Opera Mobile 11.5-12: Tested on Android 2.3
                t.is('Opera') && t.version('Opera Mobi') > 11 && t.is('AndroidOS') ||

                // Meego 1.2 - Tested on Nokia 950 and N9
                t.is('MeeGoOS') ||

                // Tizen (pre-release) - Tested on early hardware
                t.is('Tizen') ||

                // Samsung Bada 2.0 - Tested on a Samsung Wave 3, Dolphin browser
                // @todo: more tests here!
                t.is('Dolfin') && t.version('Bada') >= 2.0 ||

                // UC Browser - Tested on Android 2.3 device
                (t.is('UC Browser') || t.is('Dolfin')) && t.version('Android') >= 2.3 ||

                // Kindle 3 and Fire  - Tested on the built-in WebKit browser for each
                t.match('Kindle Fire') || t.is('Kindle') && t.version('Kindle') >= 3.0 ||

                // Nook Color 1.4.1 - Tested on original Nook Color, not Nook Tablet
                t.is('AndroidOS') && t.is('NookTablet') ||

                // Chrome Desktop 11-21 - Tested on OS X 10.7 and Windows 7
                t.version('Chrome') >= 11 && !$isMobile ||

                // Safari Desktop 4-5 - Tested on OS X 10.7 and Windows 7
                t.version('Safari') >= 5.0 && !$isMobile ||

                // Firefox Desktop 4-13 - Tested on OS X 10.7 and Windows 7
                t.version('Firefox') >= 4.0 && !$isMobile ||

                // Internet Explorer 7-9 - Tested on Windows XP, Vista and 7
                t.version('MSIE') >= 7.0 && !$isMobile ||

                // Opera Desktop 10-12 - Tested on OS X 10.7 and Windows 7
                // @reference: http://my.opera.com/community/openweb/idopera/
                t.version('Opera') >= 10 && !$isMobile) {
                    return 'A';
                }

                if (t.os('iOS') && t.version('iPad') < 4.3 || t.os('iOS') && t.version('iPhone') < 3.1 || t.os('iOS') && t.version('iPod') < 3.1 ||

                // Blackberry 5.0: Tested on the Storm 2 9550, Bold 9770
                t.is('Blackberry') && t.version('BlackBerry') >= 5 && t.version('BlackBerry') < 6 ||

                //Opera Mini (5.0-6.5) - Tested on iOS 3.2/4.3 and Android 2.3
                t.version('Opera Mini') >= 5.0 && t.version('Opera Mini') <= 6.5 && (t.version('Android') >= 2.3 || t.is('iOS')) ||

                // Nokia Symbian^3 - Tested on Nokia N8 (Symbian^3), C7 (Symbian^3), also works on N97 (Symbian^1)
                t.match('NokiaN8|NokiaC7|N97.*Series60|Symbian/3') ||

                // @todo: report this (tested on Nokia N71)
                t.version('Opera Mobi') >= 11 && t.is('SymbianOS')) {
                    return 'B';
                }

                if (
                // Blackberry 4.x - Tested on the Curve 8330
                t.version('BlackBerry') < 5.0 ||
                // Windows Mobile - Tested on the HTC Leo (WinMo 5.2)
                t.match('MSIEMobile|Windows CE.*Mobile') || t.version('Windows Mobile') <= 5.2) {
                    return 'C';
                }

                //All older smartphone platforms and featurephones - Any device that doesn't support media queries
                //will receive the basic, C grade experience.
                return 'C';
            };

            impl.detectOS = function (ua) {
                return impl.findMatch(impl.mobileDetectRules.oss0, ua) || impl.findMatch(impl.mobileDetectRules.oss, ua);
            };

            impl.getDeviceSmallerSide = function () {
                return window.screen.width < window.screen.height ? window.screen.width : window.screen.height;
            };

            /**
             * Constructor for MobileDetect object.
             * <br>
             * Such an object will keep a reference to the given user-agent string and cache most of the detect queries.<br>
             * <div style="background-color: #d9edf7; border: 1px solid #bce8f1; color: #3a87ad; padding: 14px; border-radius: 2px; margin-top: 20px">
             *     <strong>Find information how to download and install:</strong>
             *     <a href="https://github.com/hgoebl/mobile-detect.js/">github.com/hgoebl/mobile-detect.js/</a>
             * </div>
             *
             * @example <pre>
             *     var md = new MobileDetect(window.navigator.userAgent);
             *     if (md.mobile()) {
             *         location.href = (md.mobileGrade() === 'A') ? '/mobile/' : '/lynx/';
             *     }
             * </pre>
             *
             * @param {string} userAgent typically taken from window.navigator.userAgent or http_header['User-Agent']
             * @param {number} [maxPhoneWidth=600] <strong>only for browsers</strong> specify a value for the maximum
             *        width of smallest device side (in logical "CSS" pixels) until a device detected as mobile will be handled
             *        as phone.
             *        This is only used in cases where the device cannot be classified as phone or tablet.<br>
             *        See <a href="http://developer.android.com/guide/practices/screens_support.html">Declaring Tablet Layouts
             *        for Android</a>.<br>
             *        If you provide a value < 0, then this "fuzzy" check is disabled.
             * @constructor
             * @global
             */
            function MobileDetect(userAgent, maxPhoneWidth) {
                this.ua = userAgent || '';
                this._cache = {};
                //600dp is typical 7" tablet minimum width
                this.maxPhoneWidth = maxPhoneWidth || 600;
            }

            MobileDetect.prototype = {
                constructor: MobileDetect,

                /**
                 * Returns the detected phone or tablet type or <tt>null</tt> if it is not a mobile device.
                 * <br>
                 * For a list of possible return values see {@link MobileDetect#phone} and {@link MobileDetect#tablet}.<br>
                 * <br>
                 * If the device is not detected by the regular expressions from Mobile-Detect, a test is made against
                 * the patterns of <a href="http://detectmobilebrowsers.com/">detectmobilebrowsers.com</a>. If this test
                 * is positive, a value of <code>UnknownPhone</code>, <code>UnknownTablet</code> or
                 * <code>UnknownMobile</code> is returned.<br>
                 * When used in browser, the decision whether phone or tablet is made based on <code>screen.width/height</code>.<br>
                 * <br>
                 * When used server-side (node.js), there is no way to tell the difference between <code>UnknownTablet</code>
                 * and <code>UnknownMobile</code>, so you will get <code>UnknownMobile</code> here.<br>
                 * Be aware that since v1.0.0 in this special case you will get <code>UnknownMobile</code> only for:
                 * {@link MobileDetect#mobile}, not for {@link MobileDetect#phone} and {@link MobileDetect#tablet}.
                 * In versions before v1.0.0 all 3 methods returned <code>UnknownMobile</code> which was tedious to use.
                 * <br>
                 * In most cases you will use the return value just as a boolean.
                 *
                 * @returns {String} the key for the phone family or tablet family, e.g. "Nexus".
                 * @function MobileDetect#mobile
                 */
                mobile: function () {
                    impl.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth);
                    return this._cache.mobile;
                },

                /**
                 * Returns the detected phone type/family string or <tt>null</tt>.
                 * <br>
                 * The returned tablet (family or producer) is one of following keys:<br>
                 * <br><tt>iPhone, BlackBerry, HTC, Nexus, Dell, Motorola, Samsung, LG, Sony, Asus,
                 * Micromax, Palm, Vertu, Pantech, Fly, Wiko, iMobile, SimValley, Wolfgang,
                 * Alcatel, Nintendo, Amoi, INQ, GenericPhone</tt><br>
                 * <br>
                 * If the device is not detected by the regular expressions from Mobile-Detect, a test is made against
                 * the patterns of <a href="http://detectmobilebrowsers.com/">detectmobilebrowsers.com</a>. If this test
                 * is positive, a value of <code>UnknownPhone</code> or <code>UnknownMobile</code> is returned.<br>
                 * When used in browser, the decision whether phone or tablet is made based on <code>screen.width/height</code>.<br>
                 * <br>
                 * When used server-side (node.js), there is no way to tell the difference between <code>UnknownTablet</code>
                 * and <code>UnknownMobile</code>, so you will get <code>null</code> here, while {@link MobileDetect#mobile}
                 * will return <code>UnknownMobile</code>.<br>
                 * Be aware that since v1.0.0 in this special case you will get <code>UnknownMobile</code> only for:
                 * {@link MobileDetect#mobile}, not for {@link MobileDetect#phone} and {@link MobileDetect#tablet}.
                 * In versions before v1.0.0 all 3 methods returned <code>UnknownMobile</code> which was tedious to use.
                 * <br>
                 * In most cases you will use the return value just as a boolean.
                 *
                 * @returns {String} the key of the phone family or producer, e.g. "iPhone"
                 * @function MobileDetect#phone
                 */
                phone: function () {
                    impl.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth);
                    return this._cache.phone;
                },

                /**
                 * Returns the detected tablet type/family string or <tt>null</tt>.
                 * <br>
                 * The returned tablet (family or producer) is one of following keys:<br>
                 * <br><tt>iPad, NexusTablet, SamsungTablet, Kindle, SurfaceTablet, HPTablet, AsusTablet,
                 * BlackBerryTablet, HTCtablet, MotorolaTablet, NookTablet, AcerTablet,
                 * ToshibaTablet, LGTablet, FujitsuTablet, PrestigioTablet, LenovoTablet,
                 * DellTablet, YarvikTablet, MedionTablet, ArnovaTablet, IntensoTablet, IRUTablet,
                 * MegafonTablet, EbodaTablet, AllViewTablet, ArchosTablet, AinolTablet,
                 * SonyTablet, PhilipsTablet, CubeTablet, CobyTablet, MIDTablet, MSITablet,
                 * SMiTTablet, RockChipTablet, FlyTablet, bqTablet, HuaweiTablet, NecTablet,
                 * PantechTablet, BronchoTablet, VersusTablet, ZyncTablet, PositivoTablet,
                 * NabiTablet, KoboTablet, DanewTablet, TexetTablet, PlaystationTablet,
                 * TrekstorTablet, PyleAudioTablet, AdvanTablet, DanyTechTablet, GalapadTablet,
                 * MicromaxTablet, KarbonnTablet, AllFineTablet, PROSCANTablet, YONESTablet,
                 * ChangJiaTablet, GUTablet, PointOfViewTablet, OvermaxTablet, HCLTablet,
                 * DPSTablet, VistureTablet, CrestaTablet, MediatekTablet, ConcordeTablet,
                 * GoCleverTablet, ModecomTablet, VoninoTablet, ECSTablet, StorexTablet,
                 * VodafoneTablet, EssentielBTablet, RossMoorTablet, iMobileTablet, TolinoTablet,
                 * AudioSonicTablet, AMPETablet, SkkTablet, TecnoTablet, JXDTablet, iJoyTablet,
                 * FX2Tablet, XoroTablet, ViewsonicTablet, OdysTablet, CaptivaTablet,
                 * IconbitTablet, TeclastTablet, OndaTablet, JaytechTablet, BlaupunktTablet,
                 * DigmaTablet, EvolioTablet, LavaTablet, AocTablet, MpmanTablet, CelkonTablet,
                 * WolderTablet, MiTablet, NibiruTablet, NexoTablet, LeaderTablet, UbislateTablet,
                 * PocketBookTablet, Hudl, TelstraTablet, GenericTablet</tt><br>
                 * <br>
                 * If the device is not detected by the regular expressions from Mobile-Detect, a test is made against
                 * the patterns of <a href="http://detectmobilebrowsers.com/">detectmobilebrowsers.com</a>. If this test
                 * is positive, a value of <code>UnknownTablet</code> or <code>UnknownMobile</code> is returned.<br>
                 * When used in browser, the decision whether phone or tablet is made based on <code>screen.width/height</code>.<br>
                 * <br>
                 * When used server-side (node.js), there is no way to tell the difference between <code>UnknownTablet</code>
                 * and <code>UnknownMobile</code>, so you will get <code>null</code> here, while {@link MobileDetect#mobile}
                 * will return <code>UnknownMobile</code>.<br>
                 * Be aware that since v1.0.0 in this special case you will get <code>UnknownMobile</code> only for:
                 * {@link MobileDetect#mobile}, not for {@link MobileDetect#phone} and {@link MobileDetect#tablet}.
                 * In versions before v1.0.0 all 3 methods returned <code>UnknownMobile</code> which was tedious to use.
                 * <br>
                 * In most cases you will use the return value just as a boolean.
                 *
                 * @returns {String} the key of the tablet family or producer, e.g. "SamsungTablet"
                 * @function MobileDetect#tablet
                 */
                tablet: function () {
                    impl.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth);
                    return this._cache.tablet;
                },

                /**
                 * Returns the (first) detected user-agent string or <tt>null</tt>.
                 * <br>
                 * The returned user-agent is one of following keys:<br>
                 * <br><tt>Chrome, Dolfin, Opera, Skyfire, IE, Firefox, Bolt, TeaShark, Blazer, Safari,
                 * Tizen, UCBrowser, baiduboxapp, baidubrowser, DiigoBrowser, Puffin, Mercury,
                 * ObigoBrowser, NetFront, GenericBrowser</tt><br>
                 * <br>
                 * In most cases calling {@link MobileDetect#userAgent} will be sufficient. But there are rare
                 * cases where a mobile device pretends to be more than one particular browser. You can get the
                 * list of all matches with {@link MobileDetect#userAgents} or check for a particular value by
                 * providing one of the defined keys as first argument to {@link MobileDetect#is}.
                 *
                 * @returns {String} the key for the detected user-agent or <tt>null</tt>
                 * @function MobileDetect#userAgent
                 */
                userAgent: function () {
                    if (this._cache.userAgent === undefined) {
                        this._cache.userAgent = impl.findMatch(impl.mobileDetectRules.uas, this.ua);
                    }
                    return this._cache.userAgent;
                },

                /**
                 * Returns all detected user-agent strings.
                 * <br>
                 * The array is empty or contains one or more of following keys:<br>
                 * <br><tt>Chrome, Dolfin, Opera, Skyfire, IE, Firefox, Bolt, TeaShark, Blazer, Safari,
                 * Tizen, UCBrowser, baiduboxapp, baidubrowser, DiigoBrowser, Puffin, Mercury,
                 * ObigoBrowser, NetFront, GenericBrowser</tt><br>
                 * <br>
                 * In most cases calling {@link MobileDetect#userAgent} will be sufficient. But there are rare
                 * cases where a mobile device pretends to be more than one particular browser. You can get the
                 * list of all matches with {@link MobileDetect#userAgents} or check for a particular value by
                 * providing one of the defined keys as first argument to {@link MobileDetect#is}.
                 *
                 * @returns {Array} the array of detected user-agent keys or <tt>[]</tt>
                 * @function MobileDetect#userAgents
                 */
                userAgents: function () {
                    if (this._cache.userAgents === undefined) {
                        this._cache.userAgents = impl.findMatches(impl.mobileDetectRules.uas, this.ua);
                    }
                    return this._cache.userAgents;
                },

                /**
                 * Returns the detected operating system string or <tt>null</tt>.
                 * <br>
                 * The operating system is one of following keys:<br>
                 * <br><tt>AndroidOS, BlackBerryOS, PalmOS, SymbianOS, WindowsMobileOS, WindowsPhoneOS,
                 * iOS, MeeGoOS, MaemoOS, JavaOS, webOS, badaOS, BREWOS</tt><br>
                 *
                 * @returns {String} the key for the detected operating system.
                 * @function MobileDetect#os
                 */
                os: function () {
                    if (this._cache.os === undefined) {
                        this._cache.os = impl.detectOS(this.ua);
                    }
                    return this._cache.os;
                },

                /**
                 * Get the version (as Number) of the given property in the User-Agent.
                 * <br>
                 * Will return a float number. (eg. 2_0 will return 2.0, 4.3.1 will return 4.31)
                 *
                 * @param {String} key a key defining a thing which has a version.<br>
                 *        You can use one of following keys:<br>
                 * <br><tt>Mobile, Build, Version, VendorID, iPad, iPhone, iPod, Kindle, Chrome, Coast,
                 * Dolfin, Firefox, Fennec, IE, NetFront, NokiaBrowser, Opera, Opera Mini, Opera
                 * Mobi, UC Browser, MQQBrowser, MicroMessenger, baiduboxapp, baidubrowser, Iron,
                 * Safari, Skyfire, Tizen, Webkit, Gecko, Trident, Presto, iOS, Android,
                 * BlackBerry, BREW, Java, Windows Phone OS, Windows Phone, Windows CE, Windows
                 * NT, Symbian, webOS</tt><br>
                 *
                 * @returns {Number} the version as float or <tt>NaN</tt> if User-Agent doesn't contain this version.
                 *          Be careful when comparing this value with '==' operator!
                 * @function MobileDetect#version
                 */
                version: function (key) {
                    return impl.getVersion(key, this.ua);
                },

                /**
                 * Get the version (as String) of the given property in the User-Agent.
                 * <br>
                 *
                 * @param {String} key a key defining a thing which has a version.<br>
                 *        You can use one of following keys:<br>
                 * <br><tt>Mobile, Build, Version, VendorID, iPad, iPhone, iPod, Kindle, Chrome, Coast,
                 * Dolfin, Firefox, Fennec, IE, NetFront, NokiaBrowser, Opera, Opera Mini, Opera
                 * Mobi, UC Browser, MQQBrowser, MicroMessenger, baiduboxapp, baidubrowser, Iron,
                 * Safari, Skyfire, Tizen, Webkit, Gecko, Trident, Presto, iOS, Android,
                 * BlackBerry, BREW, Java, Windows Phone OS, Windows Phone, Windows CE, Windows
                 * NT, Symbian, webOS</tt><br>
                 *
                 * @returns {String} the "raw" version as String or <tt>null</tt> if User-Agent doesn't contain this version.
                 *
                 * @function MobileDetect#versionStr
                 */
                versionStr: function (key) {
                    return impl.getVersionStr(key, this.ua);
                },

                /**
                 * Global test key against userAgent, os, phone, tablet and some other properties of userAgent string.
                 *
                 * @param {String} key the key (case-insensitive) of a userAgent, an operating system, phone or
                 *        tablet family.<br>
                 *        For a complete list of possible values, see {@link MobileDetect#userAgent},
                 *        {@link MobileDetect#os}, {@link MobileDetect#phone}, {@link MobileDetect#tablet}.<br>
                 *        Additionally you have following keys:<br>
                 * <br><tt>Bot, MobileBot, DesktopMode, TV, WebKit, Console, Watch</tt><br>
                 *
                 * @returns {boolean} <tt>true</tt> when the given key is one of the defined keys of userAgent, os, phone,
                 *                    tablet or one of the listed additional keys, otherwise <tt>false</tt>
                 * @function MobileDetect#is
                 */
                is: function (key) {
                    return containsIC(this.userAgents(), key) || equalIC(key, this.os()) || equalIC(key, this.phone()) || equalIC(key, this.tablet()) || containsIC(impl.findMatches(impl.mobileDetectRules.utils, this.ua), key);
                },

                /**
                 * Do a quick test against navigator::userAgent.
                 *
                 * @param {String|RegExp} pattern the pattern, either as String or RegExp
                 *                        (a string will be converted to a case-insensitive RegExp).
                 * @returns {boolean} <tt>true</tt> when the pattern matches, otherwise <tt>false</tt>
                 * @function MobileDetect#match
                 */
                match: function (pattern) {
                    if (!(pattern instanceof RegExp)) {
                        pattern = new RegExp(pattern, 'i');
                    }
                    return pattern.test(this.ua);
                },

                /**
                 * Checks whether the mobile device can be considered as phone regarding <code>screen.width</code>.
                 * <br>
                 * Obviously this method makes sense in browser environments only (not for Node.js)!
                 * @param {number} [maxPhoneWidth] the maximum logical pixels (aka. CSS-pixels) to be considered as phone.<br>
                 *        The argument is optional and if not present or falsy, the value of the constructor is taken.
                 * @returns {boolean|undefined} <code>undefined</code> if screen size wasn't detectable, else <code>true</code>
                 *          when screen.width is less or equal to maxPhoneWidth, otherwise <code>false</code>.<br>
                 *          Will always return <code>undefined</code> server-side.
                 */
                isPhoneSized: function (maxPhoneWidth) {
                    return MobileDetect.isPhoneSized(maxPhoneWidth || this.maxPhoneWidth);
                },

                /**
                 * Returns the mobile grade ('A', 'B', 'C').
                 *
                 * @returns {String} one of the mobile grades ('A', 'B', 'C').
                 * @function MobileDetect#mobileGrade
                 */
                mobileGrade: function () {
                    if (this._cache.grade === undefined) {
                        this._cache.grade = impl.mobileGrade(this);
                    }
                    return this._cache.grade;
                }
            };

            // environment-dependent
            if (typeof window !== 'undefined' && window.screen) {
                MobileDetect.isPhoneSized = function (maxPhoneWidth) {
                    return maxPhoneWidth < 0 ? undefined : impl.getDeviceSmallerSide() <= maxPhoneWidth;
                };
            } else {
                MobileDetect.isPhoneSized = function () {};
            }

            // should not be replaced by a completely new object - just overwrite existing methods
            MobileDetect._impl = impl;

            return MobileDetect;
        }); // end of call of define()
    })(function (undefined) {
        if (typeof module !== 'undefined' && module.exports) {
            return function (factory) {
                module.exports = factory();
            };
        } else if (typeof define === 'function' && define.amd) {
            return define;
        } else if (typeof window !== 'undefined') {
            return function (factory) {
                window.MobileDetect = factory();
            };
        } else {
            // please file a bug if you get this error!
            throw new Error('unknown environment');
        }
    }());
    return module.exports;
});
$__System.register('9', ['c', 'a', 'b', '8'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, context_2, mobile_detect_1;
    var DeviceService;
    return {
        setters: [function (aurelia_dependency_injection_1_1) {
            aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
        }, function (cesium_imports_1_1) {
            cesium_imports_1 = cesium_imports_1_1;
        }, function (context_2_1) {
            context_2 = context_2_1;
        }, function (mobile_detect_1_1) {
            mobile_detect_1 = mobile_detect_1_1;
        }],
        execute: function () {
            /**
            * Provides pose state for the device.
            */
            DeviceService = function () {
                /**
                * Initialize the DeviceService
                */
                function DeviceService(context) {
                    this.locationUpdatesEnabled = true;
                    this.orientationUpdatesEnabled = true;
                    /**
                     * An ENU coordinate frame centered at the gps location reported by this device
                     */
                    this.geolocationEntity = new cesium_imports_1.Entity({ id: 'ar.device.geolocation', name: 'Device Geolocation' });
                    /**
                     * A frame which represents the orientation of this device relative to it's ENU coordinate frame (geolocationEntity)
                     */
                    this.orientationEntity = new cesium_imports_1.Entity({ id: 'ar.device.orientation', name: 'Device Orientation' });
                    /**
                     * A frame which represents the pose of this device
                     */
                    this.entity = new cesium_imports_1.Entity({ id: 'ar.device', name: 'Device' });
                    /**
                     * A frame which describes the pose of the display relative to this device
                     */
                    this.displayEntity = new cesium_imports_1.Entity({
                        id: 'ar.device.display',
                        name: 'Device Display',
                        position: new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, this.entity),
                        orientation: new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY)
                    });
                    this._scratchCartesian = new cesium_imports_1.Cartesian3();
                    this._scratchQuaternion1 = new cesium_imports_1.Quaternion();
                    this._scratchQuaternion2 = new cesium_imports_1.Quaternion();
                    this._x90Rot = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_X, cesium_imports_1.CesiumMath.PI_OVER_TWO);
                    this._headingDrift = 0;
                    context.wellKnownReferenceFrames.add(this.geolocationEntity);
                    context.wellKnownReferenceFrames.add(this.orientationEntity);
                    context.wellKnownReferenceFrames.add(this.entity);
                    context.wellKnownReferenceFrames.add(this.displayEntity);
                    if (typeof navigator !== 'undefined') {
                        this._mobileDetect = new mobile_detect_1.default(navigator.userAgent);
                    }
                }
                DeviceService.prototype.onIdle = function () {
                    if (typeof navigator === 'undefined') return;
                    if (cesium_imports_1.defined(this._geolocationWatchId)) {
                        navigator.geolocation.clearWatch(this._geolocationWatchId);
                        this._geolocationWatchId = undefined;
                    }
                    if (cesium_imports_1.defined(this._deviceorientationListener)) {
                        window.removeEventListener('deviceorientation', this._deviceorientationListener);
                        this._deviceorientationListener = undefined;
                        this._alphaOffset = undefined;
                    }
                };
                DeviceService.prototype.onUpdate = function () {
                    var _this = this;
                    if (typeof navigator !== 'undefined') {
                        var interfaceOrientationProperty = this.displayEntity.orientation;
                        var interfaceOrientation = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_Z, (-window.orientation || 0) * cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE, this._scratchQuaternion1);
                        if (this._mobileDetect && !this._mobileDetect.mobile()) {
                            // for laptops, rotate device orientation by 90° around +X so that it 
                            // corresponds to an upright display rather than the integrated keyboard
                            interfaceOrientation = cesium_imports_1.Quaternion.multiply(this._x90Rot, interfaceOrientation, interfaceOrientation);
                        }
                        interfaceOrientationProperty.setValue(interfaceOrientation);
                        if (!cesium_imports_1.defined(this._geolocationWatchId) && this.locationUpdatesEnabled) {
                            this._geolocationWatchId = navigator.geolocation.watchPosition(function (pos) {
                                if (_this.geolocationEntity.position instanceof cesium_imports_1.SampledPositionProperty === false) {
                                    var sampledPostionProperty = new cesium_imports_1.SampledPositionProperty(cesium_imports_1.ReferenceFrame.FIXED);
                                    sampledPostionProperty.forwardExtrapolationType = cesium_imports_1.ExtrapolationType.HOLD;
                                    sampledPostionProperty.backwardExtrapolationType = cesium_imports_1.ExtrapolationType.HOLD;
                                    sampledPostionProperty.maxNumSamples = 10;
                                    _this.geolocationEntity.position = sampledPostionProperty;
                                }
                                var positionTime = cesium_imports_1.JulianDate.fromDate(new Date(pos.timestamp));
                                var positionECEF = cesium_imports_1.Cartesian3.fromDegrees(pos.coords.longitude, pos.coords.latitude, pos.coords.altitude || 0, undefined, _this._scratchCartesian);
                                _this.geolocationEntity.position.addSample(positionTime, positionECEF);
                                if (_this.geolocationEntity.orientation instanceof cesium_imports_1.ConstantProperty === false) {
                                    _this.geolocationEntity.orientation = new cesium_imports_1.ConstantProperty();
                                }
                                var enuOrientation = cesium_imports_1.Transforms.headingPitchRollQuaternion(positionECEF, 0, 0, 0, undefined, _this._scratchQuaternion1);
                                _this.geolocationEntity.orientation.setValue(enuOrientation);
                            }, function (error) {
                                console.error(error);
                            }, {
                                enableHighAccuracy: true
                            });
                        } else if (cesium_imports_1.defined(this._geolocationWatchId) && !this.locationUpdatesEnabled) {
                            navigator.geolocation.clearWatch(this._geolocationWatchId);
                            this._geolocationWatchId = undefined;
                        }
                        if (!cesium_imports_1.defined(this._deviceorientationListener) && this.orientationUpdatesEnabled) {
                            this._deviceorientationListener = function (e) {
                                var alphaDegrees = e.alpha;
                                if (!cesium_imports_1.defined(alphaDegrees)) {
                                    return;
                                }
                                if (e.absolute) {
                                    _this._alphaOffset = 0;
                                }
                                var webkitCompassHeading = e['webkitCompassHeading'];
                                var webkitCompassAccuracy = +e['webkitCompassAccuracy'];
                                // when the phone is almost updside down, webkit flips the compass heading 
                                // (not documented anywhere, annoyingly)
                                // if (e.beta >= 130 || e.beta <= -130) webkitCompassHeading = undefined;
                                if ((!cesium_imports_1.defined(_this._alphaOffset) || Math.abs(_this._headingDrift) > 5) && cesium_imports_1.defined(webkitCompassHeading) && webkitCompassAccuracy >= 0 && webkitCompassAccuracy < 50 && webkitCompassHeading >= 0) {
                                    if (!cesium_imports_1.defined(_this._alphaOffset)) {
                                        _this._alphaOffset = -webkitCompassHeading;
                                    } else {
                                        _this._alphaOffset -= _this._headingDrift;
                                    }
                                }
                                var alphaOffset = _this._alphaOffset || -webkitCompassHeading || 0;
                                // TODO: deal with various browser quirks :\
                                // https://mobiforge.com/design-development/html5-mobile-web-device-orientation-events
                                var alpha = cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE * (e.alpha + alphaOffset);
                                var beta = cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE * e.beta;
                                var gamma = cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE * e.gamma;
                                var alphaQuat = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_Z, alpha, _this._scratchQuaternion1);
                                var betaQuat = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_X, beta, _this._scratchQuaternion2);
                                var alphaBetaQuat = cesium_imports_1.Quaternion.multiply(alphaQuat, betaQuat, _this._scratchQuaternion1);
                                var gammaQuat = cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_Y, gamma, _this._scratchQuaternion2);
                                var alphaBetaGammaQuat = cesium_imports_1.Quaternion.multiply(alphaBetaQuat, gammaQuat, alphaBetaQuat);
                                // update orientationEntity
                                if (_this.orientationEntity.position instanceof cesium_imports_1.ConstantPositionProperty == false) {
                                    _this.orientationEntity.position = new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, _this.geolocationEntity);
                                }
                                if (_this.orientationEntity.orientation instanceof cesium_imports_1.ConstantProperty == false) {
                                    _this.orientationEntity.orientation = new cesium_imports_1.ConstantProperty();
                                }
                                _this.orientationEntity.orientation.setValue(alphaBetaGammaQuat);
                                // make sure the device entity has a defined pose relative to the device orientation entity
                                if (_this.entity.position instanceof cesium_imports_1.ConstantPositionProperty == false) {
                                    _this.entity.position = new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, _this.orientationEntity);
                                }
                                if (_this.entity.orientation instanceof cesium_imports_1.ConstantProperty == false) {
                                    _this.entity.orientation = new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY);
                                }
                                // TODO: fix heading drift calculation (heading should match webkitCompassHeading)
                                // if (defined(webkitCompassHeading)) {
                                //     const q = alphaBetaGammaQuat//utils.getEntityOrientationInReferenceFrame(this.interfaceEntity, JulianDate.now(), this.locationEntity, this._scratchQuaternion1);
                                //     var heading = -Math.atan2(2*(q.w*q.z + q.x*q.y), 1 - 2*(q.y*q.y + q.z*q.z));
                                //     if (heading < 0) heading += 2*Math.PI;
                                //     const {swing,twist} = swingTwistDecomposition(alphaBetaGammaQuat, Cartesian3.UNIT_Z);
                                //     const twistAngle = 2 * Math.acos(twist.w);
                                //     console.log(twist.w + ' ' + twistAngle * CesiumMath.DEGREES_PER_RADIAN + '\n' + webkitCompassHeading);
                                //     // this._headingDrift = webkitCompassHeading - heading * CesiumMath.DEGREES_PER_RADIAN;
                                // }
                            };
                            window.addEventListener('deviceorientation', this._deviceorientationListener);
                        } else if (cesium_imports_1.defined(this._deviceorientationListener) && !this.orientationUpdatesEnabled) {
                            window.removeEventListener('deviceorientation', this._deviceorientationListener);
                            this._deviceorientationListener = undefined;
                        }
                    }
                };
                /**
                * Update the pose with latest sensor data
                */
                DeviceService.prototype.update = function () {
                    var _this = this;
                    if (cesium_imports_1.defined(this._idleTimeoutId)) clearTimeout(this._idleTimeoutId);
                    this._idleTimeoutId = setTimeout(function () {
                        _this.onIdle();
                    }, 2000);
                    this.onUpdate();
                };
                DeviceService = __decorate([aurelia_dependency_injection_1.inject(context_2.ContextService)], DeviceService);
                return DeviceService;
            }();
            exports_1("DeviceService", DeviceService);
        }
    };
});
$__System.register('d', ['a'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var cesium_imports_1;
    var TimerService, lastTime;
    function requestAnimationFramePoly(callback) {
        var currTime = Date.now();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    }
    return {
        setters: [function (cesium_imports_1_1) {
            cesium_imports_1 = cesium_imports_1_1;
        }],
        execute: function () {
            /**
             * Provides timer service
             */
            TimerService = function () {
                function TimerService() {
                    this.frameNumbers = new WeakMap();
                }
                /**
                 * Request that the callback function be called for the next frame.
                 *
                 * @param callback function
                 */
                TimerService.prototype.requestFrame = function (callback) {
                    var _this = this;
                    if (typeof requestAnimationFrame !== 'undefined' && typeof performance !== 'undefined') {
                        this.navigationStartDate = this.navigationStartDate || cesium_imports_1.JulianDate.fromDate(new Date(performance.timing.navigationStart));
                        requestAnimationFrame(function (time) {
                            var frameTime = cesium_imports_1.JulianDate.addSeconds(_this.navigationStartDate, time / 1000, new cesium_imports_1.JulianDate(0, 0));
                            callback(frameTime, _this.getNextFrameNumber(callback));
                        });
                    } else {
                        requestAnimationFramePoly(function (time) {
                            var frameTime = cesium_imports_1.JulianDate.fromDate(new Date(time));
                            callback(frameTime, _this.getNextFrameNumber(callback));
                        });
                    }
                };
                TimerService.prototype.getNextFrameNumber = function (callback) {
                    var frameNumber = this.frameNumbers.get(callback) || 0;
                    this.frameNumbers.set(callback, frameNumber + 1);
                    return frameNumber;
                };
                return TimerService;
            }();
            exports_1("TimerService", TimerService);
            lastTime = 0;
        }
    };
});
$__System.register('e', ['c', 'f', '10', '9', 'd', '11', '12'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, common_1, session_1, device_1, timer_1, reality_1, utils_1;
    var EmptyRealityLoader;
    return {
        setters: [function (aurelia_dependency_injection_1_1) {
            aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
        }, function (common_1_1) {
            common_1 = common_1_1;
        }, function (session_1_1) {
            session_1 = session_1_1;
        }, function (device_1_1) {
            device_1 = device_1_1;
        }, function (timer_1_1) {
            timer_1 = timer_1_1;
        }, function (reality_1_1) {
            reality_1 = reality_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            EmptyRealityLoader = function (_super) {
                __extends(EmptyRealityLoader, _super);
                function EmptyRealityLoader(sessionService, deviceService, timer) {
                    _super.call(this);
                    this.sessionService = sessionService;
                    this.deviceService = deviceService;
                    this.timer = timer;
                    this.type = 'empty';
                }
                EmptyRealityLoader.prototype.load = function (reality, callback) {
                    var _this = this;
                    var realitySession = this.sessionService.addManagedSessionPort(reality.uri);
                    var remoteRealitySession = this.sessionService.createSessionPort();
                    var doUpdate = true;
                    remoteRealitySession.on['ar.context.update'] = function () {};
                    remoteRealitySession.connectEvent.addEventListener(function () {
                        var update = function (time, index) {
                            if (doUpdate) {
                                _this.deviceService.update();
                                var frameState = {
                                    time: time,
                                    index: index,
                                    eye: {
                                        pose: utils_1.getSerializedEntityPose(_this.deviceService.displayEntity, time)
                                    }
                                };
                                remoteRealitySession.send('ar.reality.frameState', frameState);
                                _this.timer.requestFrame(update);
                            }
                        };
                        _this.timer.requestFrame(update);
                    });
                    remoteRealitySession.closeEvent.addEventListener(function () {
                        doUpdate = false;
                    });
                    callback(realitySession);
                    // Only connect after the caller is able to attach connectEvent handlers
                    var messageChannel = this.sessionService.createSynchronousMessageChannel();
                    realitySession.open(messageChannel.port1, this.sessionService.configuration);
                    remoteRealitySession.open(messageChannel.port2, { role: common_1.Role.REALITY_VIEW });
                };
                EmptyRealityLoader = __decorate([aurelia_dependency_injection_1.inject(session_1.SessionService, device_1.DeviceService, timer_1.TimerService)], EmptyRealityLoader);
                return EmptyRealityLoader;
            }(reality_1.RealityLoader);
            exports_1("EmptyRealityLoader", EmptyRealityLoader);
        }
    };
});
$__System.register('13', ['c', '14', '10', '12'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, focus_1, session_1, utils_1;
    var VuforiaInitResult, VuforiaHint, VuforiaServiceDelegateBase, VuforiaServiceDelegate, VuforiaService, VuforiaAPI, VuforiaTracker, VuforiaObjectTracker, VuforiaDataSet;
    return {
        setters: [function (aurelia_dependency_injection_1_1) {
            aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
        }, function (focus_1_1) {
            focus_1 = focus_1_1;
        }, function (session_1_1) {
            session_1 = session_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            /**
             * The set of possible error codes that can be returned from vuforia's
             * initialization function.
             */
            (function (VuforiaInitResult) {
                VuforiaInitResult[VuforiaInitResult["SUCCESS"] = 100] = "SUCCESS";
                /** Error during initialization. */
                VuforiaInitResult[VuforiaInitResult["INIT_ERROR"] = -1] = "INIT_ERROR";
                /** The device is not supported. */
                VuforiaInitResult[VuforiaInitResult["INIT_DEVICE_NOT_SUPPORTED"] = -2] = "INIT_DEVICE_NOT_SUPPORTED";
                /** Cannot access the camera. */
                VuforiaInitResult[VuforiaInitResult["INIT_NO_CAMERA_ACCESS"] = -3] = "INIT_NO_CAMERA_ACCESS";
                /** License key is missing. */
                VuforiaInitResult[VuforiaInitResult["INIT_LICENSE_ERROR_MISSING_KEY"] = -4] = "INIT_LICENSE_ERROR_MISSING_KEY";
                /** Invalid license key passed to SDK. */
                VuforiaInitResult[VuforiaInitResult["INIT_LICENSE_ERROR_INVALID_KEY"] = -5] = "INIT_LICENSE_ERROR_INVALID_KEY";
                /** Unable to verify license key due to network (Permanent error). */
                VuforiaInitResult[VuforiaInitResult["INIT_LICENSE_ERROR_NO_NETWORK_PERMANENT"] = -6] = "INIT_LICENSE_ERROR_NO_NETWORK_PERMANENT";
                /** Unable to verify license key due to network (Transient error). */
                VuforiaInitResult[VuforiaInitResult["INIT_LICENSE_ERROR_NO_NETWORK_TRANSIENT"] = -7] = "INIT_LICENSE_ERROR_NO_NETWORK_TRANSIENT";
                /** Provided key is no longer valid. */
                VuforiaInitResult[VuforiaInitResult["INIT_LICENSE_ERROR_CANCELED_KEY"] = -8] = "INIT_LICENSE_ERROR_CANCELED_KEY";
                /** Provided key is not valid for this product. */
                VuforiaInitResult[VuforiaInitResult["INIT_LICENSE_ERROR_PRODUCT_TYPE_MISMATCH"] = -9] = "INIT_LICENSE_ERROR_PRODUCT_TYPE_MISMATCH";
                /** Dependent external device not detected/plugged in. */
                VuforiaInitResult[VuforiaInitResult["INIT_EXTERNAL_DEVICE_NOT_DETECTED"] = -10] = "INIT_EXTERNAL_DEVICE_NOT_DETECTED";
            })(VuforiaInitResult || (VuforiaInitResult = {}));
            exports_1("VuforiaInitResult", VuforiaInitResult);
            (function (VuforiaHint) {
                VuforiaHint[VuforiaHint["MaxSimultaneousImageTargets"] = 0] = "MaxSimultaneousImageTargets";
                VuforiaHint[VuforiaHint["MaxSimultaneousObjectTargets"] = 1] = "MaxSimultaneousObjectTargets";
                VuforiaHint[VuforiaHint["DelayedLoadingObjectDatasets"] = 2] = "DelayedLoadingObjectDatasets";
            })(VuforiaHint || (VuforiaHint = {}));
            exports_1("VuforiaHint", VuforiaHint);
            /**
             * An abstract class representing the Vuforia API.
             */
            VuforiaServiceDelegateBase = function () {
                function VuforiaServiceDelegateBase() {
                    this.stateUpdateEvent = new utils_1.Event();
                }
                return VuforiaServiceDelegateBase;
            }();
            exports_1("VuforiaServiceDelegateBase", VuforiaServiceDelegateBase);
            /**
             * An no-op implementation of VuforiaServiceDelegate.
             */
            VuforiaServiceDelegate = function (_super) {
                __extends(VuforiaServiceDelegate, _super);
                function VuforiaServiceDelegate() {
                    _super.apply(this, arguments);
                }
                VuforiaServiceDelegate.prototype.isAvailable = function () {
                    return false;
                };
                VuforiaServiceDelegate.prototype.setHint = function (hint, value) {
                    return true;
                };
                VuforiaServiceDelegate.prototype.decryptLicenseKey = function (encryptedLicenseData, session) {
                    return Promise.resolve(undefined);
                };
                VuforiaServiceDelegate.prototype.init = function (options) {
                    return Promise.resolve(VuforiaInitResult.SUCCESS);
                };
                VuforiaServiceDelegate.prototype.deinit = function () {};
                VuforiaServiceDelegate.prototype.cameraDeviceInitAndStart = function () {
                    return true;
                };
                VuforiaServiceDelegate.prototype.cameraDeviceSetFlashTorchMode = function (on) {
                    return true;
                };
                VuforiaServiceDelegate.prototype.objectTrackerInit = function () {
                    return true;
                };
                VuforiaServiceDelegate.prototype.objectTrackerCreateDataSet = function (url) {
                    return '';
                };
                VuforiaServiceDelegate.prototype.objectTrackerDestroyDataSet = function (id) {
                    return true;
                };
                VuforiaServiceDelegate.prototype.objectTrackerActivateDataSet = function (id) {
                    return true;
                };
                VuforiaServiceDelegate.prototype.objectTrackerDeactivateDataSet = function (id) {
                    return true;
                };
                VuforiaServiceDelegate.prototype.dataSetFetch = function (id) {
                    return Promise.resolve(undefined);
                };
                VuforiaServiceDelegate.prototype.dataSetLoad = function (id) {
                    return Promise.resolve();
                };
                return VuforiaServiceDelegate;
            }(VuforiaServiceDelegateBase);
            exports_1("VuforiaServiceDelegate", VuforiaServiceDelegate);
            /**
             * Mediates requests to the Vuforia API. Handles the following requests:
             * // TODO
             */
            VuforiaService = function () {
                function VuforiaService(sessionService, focusService, delegate) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.focusService = focusService;
                    this.delegate = delegate;
                    this._sessionSwitcherCommandQueue = new utils_1.CommandQueue();
                    this._sessionCommandQueue = new WeakMap();
                    this._sessionInitOptions = new WeakMap();
                    this._sessionInitPromise = new WeakMap();
                    this._sessionIsInitialized = new WeakMap();
                    this._sessionCreatedDataSets = new WeakMap();
                    this._sessionActivatedDataSets = new WeakMap();
                    if (sessionService.isRealityManager) {
                        this._sessionSwitcherCommandQueue.errorEvent.addEventListener(function (err) {
                            _this.sessionService.errorEvent.raiseEvent(err);
                        });
                        sessionService.connectEvent.addEventListener(function (session) {
                            var commandQueue = new utils_1.CommandQueue();
                            commandQueue.errorEvent.addEventListener(function (err) {
                                _this.sessionService.errorEvent.raiseEvent(err);
                                session.sendError(err);
                            });
                            _this._sessionCommandQueue.set(session, commandQueue);
                            var createdDataSets = new Set();
                            _this._sessionCreatedDataSets.set(session, createdDataSets);
                            var activatedDataSets = new Set();
                            _this._sessionActivatedDataSets.set(session, activatedDataSets);
                            session.on['ar.vuforia.isAvailable'] = function () {
                                return Promise.resolve({ available: delegate.isAvailable() });
                            };
                            session.on['ar.vuforia.init'] = function (options) {
                                if (!delegate.isAvailable()) throw new Error("Vuforia is not supported");
                                if (_this._sessionIsInitialized.get(session)) throw new Error("Vuforia has already been initialized");
                                if (!options.key && !options.encryptedLicenseData) throw new Error("Expected `encryptedLicenseData` field. You can encrypt your Vuforia license key at http://docs.argonjs.io/start/vuforia-pgp-encryptor");
                                var keyPromise = options.key ? Promise.resolve(options.key) : delegate.decryptLicenseKey(options.encryptedLicenseData, session);
                                return keyPromise.then(function (key) {
                                    _this._sessionInitOptions.set(session, {
                                        key: key
                                    });
                                    var result = commandQueue.push(function () {
                                        return _this._init(session).then(function () {
                                            _this._sessionIsInitialized.set(session, true);
                                        });
                                    }, _this._controllingSession === session);
                                    if (_this.focusService.getSession() === session) {
                                        _this._setControllingSession(session);
                                    }
                                    _this._sessionInitPromise.set(session, result);
                                    return result;
                                });
                            };
                            session.on['ar.vuforia.objectTrackerCreateDataSet'] = function (_a) {
                                var url = _a.url;
                                return commandQueue.push(function () {
                                    var id = delegate.objectTrackerCreateDataSet(url);
                                    if (id) {
                                        createdDataSets.add(id);
                                        return Promise.resolve({ id: id });
                                    }
                                    throw new Error('Unable to create DataSet');
                                }, _this._controllingSession === session);
                            };
                            session.on['ar.vuforia.objectTrackerActivateDataSet'] = function (_a) {
                                var id = _a.id;
                                return commandQueue.push(function () {
                                    if (delegate.objectTrackerActivateDataSet(id)) {
                                        activatedDataSets.add(id);
                                        session.send('ar.vuforia.objectTrackerActivateDataSetEvent', { id: id });
                                        return;
                                    }
                                    throw new Error("Unable to activate DataSet (" + id + ")");
                                }, _this._controllingSession === session);
                            };
                            session.on['ar.vuforia.objectTrackerDeactivateDataSet'] = function (_a) {
                                var id = _a.id;
                                return commandQueue.push(function () {
                                    if (delegate.objectTrackerDeactivateDataSet(id)) {
                                        activatedDataSets.delete(id);
                                        session.send('ar.vuforia.objectTrackerDeactivateDataSetEvent', { id: id });
                                        return;
                                    }
                                    throw new Error("Unable to deactivate DataSet (" + id + ")");
                                }, _this._controllingSession === session);
                            };
                            session.on['ar.vuforia.dataSetFetch'] = function (_a) {
                                var id = _a.id;
                                return commandQueue.push(function () {
                                    return delegate.dataSetFetch(id);
                                }, _this._controllingSession === session);
                            };
                            session.on['ar.vuforia.dataSetLoad'] = function (_a) {
                                var id = _a.id;
                                return commandQueue.push(function () {
                                    return delegate.dataSetLoad(id);
                                }, _this._controllingSession === session);
                            };
                            session.closeEvent.addEventListener(function () {
                                if (_this._controllingSession === session) {
                                    commandQueue.clear();
                                    commandQueue.push(function () {
                                        _this._cleanupSession(session);
                                        setTimeout(function () {
                                            _this._ensureActiveSession();
                                        }, 2000);
                                    }, true);
                                } else {
                                    _this._cleanupSession(session);
                                }
                            });
                        });
                        focusService.sessionFocusEvent.addEventListener(function (_a) {
                            var current = _a.current;
                            if (current && _this._sessionInitOptions.get(current)) {
                                _this._setControllingSession(current);
                            }
                        });
                    }
                }
                ;
                VuforiaService.prototype.isAvailable = function () {
                    return this.sessionService.manager.request('ar.vuforia.isAvailable').then(function (message) {
                        return message.available;
                    });
                };
                /**
                 * Initialize vuforia with an unecrypted key. Manager-only, unless the "force" (flag) is used.
                 * It's a bad idea to publish your private vuforia key on the internet.
                 */
                VuforiaService.prototype.initWithUnencryptedKey = function (options, force) {
                    var _this = this;
                    if (!force) this.sessionService.ensureIsRealityManager();
                    return this.sessionService.manager.request('ar.vuforia.init', options).then(function () {
                        return new VuforiaAPI(_this.sessionService.manager);
                    });
                };
                /**
                 * Initialize vuforia using an encrypted license key.
                 * You can encrypt your license key at http://docs.argonjs.io/start/vuforia-pgp-encryptor
                 */
                VuforiaService.prototype.init = function (options) {
                    var _this = this;
                    if (!options.encryptedLicenseData || typeof options.encryptedLicenseData !== 'string') throw new Error('options.encryptedLicenseData is required.');
                    return this.sessionService.manager.request('ar.vuforia.init', options).then(function () {
                        return new VuforiaAPI(_this.sessionService.manager);
                    });
                };
                VuforiaService.prototype._ensureActiveSession = function () {
                    console.log("VuforiaService: Ensuring an active session is in control.");
                    if (this._controllingSession && this._controllingSession.isConnected) return;
                    this._selectControllingSession();
                };
                VuforiaService.prototype._selectControllingSession = function () {
                    var focusSession = this.focusService.getSession();
                    if (focusSession && this._sessionInitOptions.get(focusSession)) {
                        this._setControllingSession(focusSession);
                        return;
                    }
                    for (var _i = 0, _a = this.sessionService.managedSessions; _i < _a.length; _i++) {
                        var session = _a[_i];
                        if (this._sessionInitOptions.get(session)) {
                            this._setControllingSession(session);
                            return;
                        }
                    }
                    if (this._sessionInitOptions.get(this.sessionService.manager)) this._setControllingSession(this.sessionService.manager);
                };
                VuforiaService.prototype._setControllingSession = function (session) {
                    var _this = this;
                    if (this._controllingSession === session) return;
                    console.log("VuforiaService: Setting controlling session to " + session.uri);
                    this._sessionSwitcherCommandQueue.clear();
                    this._sessionSwitcherCommandQueue.push(function () {
                        return _this._pauseSession().then(function () {
                            return _this._resumeSession(session);
                        });
                    }, true);
                };
                VuforiaService.prototype._resumeSession = function (session) {
                    if (this._controllingSession) throw new Error('Attempted to resume a session while a session is still in control');
                    if (session) console.log("VuforiaService: Resuming session " + session.uri);
                    var initOptions = this._sessionInitOptions.get(session);
                    if (!initOptions) {
                        throw new Error('Attempted to resume a session without initialization options');
                    }
                    this._controllingSession = session;
                    var commandQueue = this._sessionCommandQueue.get(session);
                    if (this._sessionIsInitialized.get(session)) {
                        return this._init(session).then(function () {
                            commandQueue.execute();
                        }).catch(function (err) {
                            session.sendError(err);
                        });
                    } else {
                        commandQueue.execute();
                        return this._sessionInitPromise.get(session);
                    }
                };
                VuforiaService.prototype._pauseSession = function () {
                    var _this = this;
                    var session = this._controllingSession;
                    if (!session) return Promise.resolve(undefined);
                    console.log("VuforiaService: Pausing session " + session.uri);
                    var commandQueue = this._sessionCommandQueue.get(session);
                    return commandQueue.push(function () {
                        commandQueue.pause();
                        _this._controllingSession = undefined;
                        return _this._deinit(session);
                    }, true);
                };
                VuforiaService.prototype._cleanupSession = function (session) {
                    var _this = this;
                    if (!this._sessionInitOptions.has(session)) return;
                    // delete session init options
                    this._sessionInitOptions.delete(session);
                    var createdDataSets = this._sessionCreatedDataSets.get(session);
                    // Deactivate session datasets / trackables
                    console.log('VuforiaService: Deactivating datasets for session ' + session.uri);
                    this._sessionActivatedDataSets.get(session).forEach(function (id) {
                        _this.delegate.objectTrackerDeactivateDataSet(id);
                    });
                    this._sessionActivatedDataSets.delete(session);
                    // destroy session objects                   
                    console.log('VuforiaService: Destroying objects for session ' + session.uri);
                    createdDataSets.forEach(function (id) {
                        _this.delegate.objectTrackerDestroyDataSet(id);
                    });
                    this._sessionCreatedDataSets.delete(session);
                };
                VuforiaService.prototype._init = function (session) {
                    var _this = this;
                    console.log("Attempting to initialize vuforia for " + session.uri);
                    var options = this._sessionInitOptions.get(session);
                    return this.delegate.init(options).then(function (initResult) {
                        if (initResult !== VuforiaInitResult.SUCCESS) {
                            throw new Error("Vuforia init failed: " + VuforiaInitResult[initResult]);
                        }
                        // must initialize trackers before initializing the camera device
                        if (!_this.delegate.objectTrackerInit()) {
                            throw new Error("Vuforia init failed: Unable to initialize ObjectTracker");
                        }
                        // restore active datasets & trackables
                        var success = true;
                        _this._sessionActivatedDataSets.get(session).forEach(function (id) {
                            success = success && _this.delegate.objectTrackerActivateDataSet(id);
                            if (success) {
                                session.send('ar.vuforia.objectTrackerActivateDataSetEvent', { id: id });
                            }
                        });
                        if (!success) {
                            throw new Error("Vuforia init failed: Unable to restore active datasets");
                        }
                        // todo: also activate datasets / trackables created by other sessions
                        // (if this fails, then vuforia has probably started forbidding datasets created 
                        // by one developer account to work while using a license key from a different
                        // developer account, so no need to return a rejected promise in that case)
                        if (!_this.delegate.cameraDeviceInitAndStart()) {
                            throw new Error("Vuforia init failed: Unable to complete initialization");
                        }
                        console.log("Vuforia init success");
                    }).catch(function (err) {
                        console.log("Vuforia init fail: " + err.message);
                        _this._sessionInitOptions.delete(session);
                        _this._sessionIsInitialized.set(session, false);
                        _this._deinit(session);
                        _this._ensureActiveSession();
                        throw err;
                    });
                };
                VuforiaService.prototype._deinit = function (session) {
                    // Deactivate any activated datasets, stop trackers, and deinit. 
                    // Don't actually destroy created resources so we can use them to restore state. 
                    var _this = this;
                    var activatedDataSets = this._sessionActivatedDataSets.get(session);
                    if (activatedDataSets) {
                        activatedDataSets.forEach(function (id) {
                            _this.delegate.objectTrackerDeactivateDataSet(id);
                            session.send('ar.vuforia.objectTrackerDeactivateDataSetEvent', { id: id });
                        });
                    }
                    // right now the delegate.deinit() call deinitiailizes trackers and camera device for us. 
                    // May want to move here instead?
                    // const errors:Array<string> = [];
                    // if (!this.delegate.objectTrackerDeinit()) {
                    //     errors.push("Unable to deinitialize ObjectTracker");
                    // } 
                    // if (!this.delegate.cameraDeviceDeinit()) {
                    //     errors.push("Unable to deinitialize CameraDevice");
                    // }
                    this.delegate.deinit();
                    // if (errors.length > 0) {
                    //     throw new Error(errors.join('\n'));
                    // }
                };
                VuforiaService = __decorate([aurelia_dependency_injection_1.inject(session_1.SessionService, focus_1.FocusService, VuforiaServiceDelegate)], VuforiaService);
                return VuforiaService;
            }();
            exports_1("VuforiaService", VuforiaService);
            VuforiaAPI = function () {
                function VuforiaAPI(manager) {
                    this.objectTracker = new VuforiaObjectTracker(manager);
                }
                return VuforiaAPI;
            }();
            exports_1("VuforiaAPI", VuforiaAPI);
            VuforiaTracker = function () {
                function VuforiaTracker() {}
                return VuforiaTracker;
            }();
            exports_1("VuforiaTracker", VuforiaTracker);
            /**
             * Vuforia Object Tracker
             */
            VuforiaObjectTracker = function (_super) {
                __extends(VuforiaObjectTracker, _super);
                function VuforiaObjectTracker(manager) {
                    var _this = this;
                    _super.call(this);
                    this.manager = manager;
                    this._dataSetMap = new Map();
                    this.dataSetActivateEvent = new utils_1.Event();
                    this.dataSetDeactivateEvent = new utils_1.Event();
                    manager.on['ar.vuforia.objectTrackerActivateDataSetEvent'] = function (_a) {
                        var id = _a.id;
                        var dataSet = _this._dataSetMap.get(id);
                        dataSet._onActivate();
                        _this.dataSetActivateEvent.raiseEvent(dataSet);
                    };
                    manager.on['ar.vuforia.objectTrackerDeactivateDataSetEvent'] = function (_a) {
                        var id = _a.id;
                        var dataSet = _this._dataSetMap.get(id);
                        dataSet._onDeactivate();
                        _this.dataSetDeactivateEvent.raiseEvent(dataSet);
                    };
                }
                VuforiaObjectTracker.prototype.createDataSet = function (url) {
                    var _this = this;
                    if (url && window.document) {
                        url = utils_1.resolveURL(url);
                    }
                    return this.manager.request('ar.vuforia.objectTrackerCreateDataSet', { url: url }).then(function (message) {
                        var dataSet = new VuforiaDataSet(message.id, _this.manager);
                        _this._dataSetMap.set(message.id, dataSet);
                        return dataSet;
                    });
                };
                VuforiaObjectTracker.prototype.activateDataSet = function (dataSet) {
                    return this.manager.request('ar.vuforia.objectTrackerActivateDataSet', { id: dataSet.id });
                };
                VuforiaObjectTracker.prototype.deactivateDataSet = function (dataSet) {
                    return this.manager.request('ar.vuforia.objectTrackerDeactivateDataSet', { id: dataSet.id });
                };
                return VuforiaObjectTracker;
            }(VuforiaTracker);
            exports_1("VuforiaObjectTracker", VuforiaObjectTracker);
            /**
             * A vuforia data set. TODO
             */
            VuforiaDataSet = function () {
                function VuforiaDataSet(id, manager) {
                    this.id = id;
                    this.manager = manager;
                    this._isActive = false;
                }
                VuforiaDataSet.prototype._onActivate = function () {
                    this._isActive = true;
                };
                VuforiaDataSet.prototype._onDeactivate = function () {
                    this._isActive = false;
                };
                VuforiaDataSet.prototype.fetch = function () {
                    return this.manager.request('ar.vuforia.dataSetFetch', { id: this.id }).then(function () {});
                };
                VuforiaDataSet.prototype.load = function () {
                    var _this = this;
                    return this.manager.request('ar.vuforia.dataSetLoad', { id: this.id }).then(function (trackables) {
                        _this._trackables = trackables;
                        return trackables;
                    });
                };
                VuforiaDataSet.prototype.isActive = function () {
                    return this._isActive;
                };
                VuforiaDataSet.prototype.getTrackables = function () {
                    return this._trackables;
                };
                return VuforiaDataSet;
            }();
            exports_1("VuforiaDataSet", VuforiaDataSet);
        }
    };
});
$__System.register('15', ['c', 'f', '10', '11', '13'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, common_1, session_1, reality_1, vuforia_1;
    var LiveVideoRealityLoader;
    return {
        setters: [function (aurelia_dependency_injection_1_1) {
            aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
        }, function (common_1_1) {
            common_1 = common_1_1;
        }, function (session_1_1) {
            session_1 = session_1_1;
        }, function (reality_1_1) {
            reality_1 = reality_1_1;
        }, function (vuforia_1_1) {
            vuforia_1 = vuforia_1_1;
        }],
        execute: function () {
            LiveVideoRealityLoader = function (_super) {
                __extends(LiveVideoRealityLoader, _super);
                function LiveVideoRealityLoader(sessionService, vuforiaDelegate) {
                    _super.call(this);
                    this.sessionService = sessionService;
                    this.vuforiaDelegate = vuforiaDelegate;
                    this.type = 'live-video';
                }
                LiveVideoRealityLoader.prototype.load = function (reality, callback) {
                    var _this = this;
                    var realitySession = this.sessionService.addManagedSessionPort(reality.uri);
                    var remoteRealitySession = this.sessionService.createSessionPort();
                    remoteRealitySession.on['ar.context.update'] = function () {};
                    remoteRealitySession.connectEvent.addEventListener(function () {
                        var remove = _this.vuforiaDelegate.stateUpdateEvent.addEventListener(function (frameState) {
                            remoteRealitySession.send('ar.reality.frameState', frameState);
                        });
                        _this.vuforiaDelegate.videoEnabled = true;
                        _this.vuforiaDelegate.trackingEnabled = true;
                        remoteRealitySession.closeEvent.addEventListener(function () {
                            remove();
                            _this.vuforiaDelegate.videoEnabled = false;
                            _this.vuforiaDelegate.trackingEnabled = false;
                        });
                    });
                    callback(realitySession);
                    // Only connect after the caller is able to attach connectEvent handlers
                    var messageChannel = this.sessionService.createSynchronousMessageChannel();
                    realitySession.open(messageChannel.port1, this.sessionService.configuration);
                    remoteRealitySession.open(messageChannel.port2, { role: common_1.Role.REALITY_VIEW });
                };
                LiveVideoRealityLoader = __decorate([aurelia_dependency_injection_1.inject(session_1.SessionService, vuforia_1.VuforiaServiceDelegate)], LiveVideoRealityLoader);
                return LiveVideoRealityLoader;
            }(reality_1.RealityLoader);
            exports_1("LiveVideoRealityLoader", LiveVideoRealityLoader);
        }
    };
});
$__System.register('b', ['c', 'a', '10', '11', '12'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, session_1, reality_1, utils_1;
    var PoseStatus, scratchCartesian3, scratchQuaternion, scratchOriginCartesian3, ContextService;
    function _stringFromReferenceFrame(referenceFrame) {
        var rf = referenceFrame;
        return cesium_imports_1.defined(rf.id) ? rf.id : '' + rf;
    }
    return {
        setters: [function (aurelia_dependency_injection_1_1) {
            aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
        }, function (cesium_imports_1_1) {
            cesium_imports_1 = cesium_imports_1_1;
        }, function (session_1_1) {
            session_1 = session_1_1;
        }, function (reality_1_1) {
            reality_1 = reality_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            /**
            * A bitmask that provides metadata about the pose of an EntityPose.
            *   KNOWN - the pose of the entity state is defined.
            *   KNOWN & FOUND - the pose was undefined when the entity state was last queried, and is now defined.
            *   LOST - the pose was defined when the entity state was last queried, and is now undefined
            */
            (function (PoseStatus) {
                PoseStatus[PoseStatus["KNOWN"] = 1] = "KNOWN";
                PoseStatus[PoseStatus["FOUND"] = 2] = "FOUND";
                PoseStatus[PoseStatus["LOST"] = 4] = "LOST";
            })(PoseStatus || (PoseStatus = {}));
            exports_1("PoseStatus", PoseStatus);
            scratchCartesian3 = new cesium_imports_1.Cartesian3(0, 0);
            scratchQuaternion = new cesium_imports_1.Quaternion(0, 0);
            scratchOriginCartesian3 = new cesium_imports_1.Cartesian3(0, 0);
            /**
             * Provides a means of querying the current state of reality.
             *
             * This class adds the following message handlers to any sessions
             * managed by the session service:
             *
             *  * `ar.context.subscribe` - Subscribes the session to updates from an
             *    entity with the provided id.
             *    * Parameters:
             *      * id: string - The id of an entity the session wishes to recieve
             *        updates on.
             *
             * This service sends the following messages to managed sessions
             *
             *  * `ar.context.update` - Indicates to this context that the session wants
             *    to be focused on.
             */
            ContextService = function () {
                function ContextService(sessionService, realityService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.realityService = realityService;
                    /**
                     * An event that is raised when all remotely managed entities are are up-to-date for
                     * the current frame. It is suggested that all modifications to locally managed entities
                     * should occur within this event.
                     */
                    this.updateEvent = new utils_1.Event();
                    /**
                     * An event that is raised when it is an approriate time to render graphics.
                     * This event fires after the update event.
                     */
                    this.renderEvent = new utils_1.Event();
                    /**
                     * The set of entities representing well-known reference frames.
                     * These are assumed to be readily available to applications.
                     */
                    this.wellKnownReferenceFrames = new cesium_imports_1.EntityCollection();
                    /**
                     * The set of subscribed entities.
                     */
                    this.subscribedEntities = new cesium_imports_1.EntityCollection();
                    /**
                     * The set of entities that this session is aware of.
                     */
                    this.entities = new cesium_imports_1.CompositeEntityCollection();
                    /**
                     * An event that fires when the local origin changes.
                     */
                    this.localOriginChangeEvent = new utils_1.Event();
                    /**
                     * An entity representing the location and orientation of the user.
                     */
                    this.user = new cesium_imports_1.Entity({
                        id: 'ar.user',
                        name: 'user',
                        position: new cesium_imports_1.ConstantPositionProperty(undefined, cesium_imports_1.ReferenceFrame.FIXED),
                        orientation: new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY)
                    });
                    /**
                     * An entity positioned near the user, aligned with the local East-North-Up
                     * coordinate system.
                     */
                    this.localOriginEastNorthUp = new cesium_imports_1.Entity({
                        id: 'ar.localENU',
                        name: 'localOriginENU',
                        position: new cesium_imports_1.ConstantPositionProperty(undefined, cesium_imports_1.ReferenceFrame.FIXED),
                        orientation: new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY)
                    });
                    /**
                     * An entity positioned near the user, aligned with the East-Up-South
                     * coordinate system. This useful for converting to the Y-Up convention
                     * used in some libraries, such as three.js.
                     */
                    this.localOriginEastUpSouth = new cesium_imports_1.Entity({
                        id: 'ar.localEUS',
                        name: 'localOriginEUS',
                        position: new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, this.localOriginEastNorthUp),
                        orientation: new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_X, Math.PI / 2))
                    });
                    /**
                     * This value caps the deltaTime for each frame
                     */
                    this.maxDeltaTime = 1 / 3 * 1000;
                    this._frame = {
                        time: new cesium_imports_1.JulianDate(0, 0),
                        systemTime: 0,
                        deltaTime: 0
                    };
                    // The default origin to use when calling `getEntityPose`.
                    this._defaultReferenceFrame = this.localOriginEastNorthUp;
                    this._entityPoseCache = {};
                    this._entityPoseMap = new Map();
                    this._subscribedEntities = new WeakMap();
                    this._updatingEntities = new Set();
                    this._knownEntities = new Set();
                    this.entities.addCollection(this.wellKnownReferenceFrames);
                    this.entities.addCollection(this.subscribedEntities);
                    this.subscribedEntities.add(this.user);
                    if (this.sessionService.isRealityManager) {
                        this.realityService.frameEvent.addEventListener(function (state) {
                            _this._update(state);
                        });
                        this.sessionService.connectEvent.addEventListener(function (session) {
                            _this._subscribedEntities.set(session, new Set());
                            session.on['ar.context.subscribe'] = function (_a) {
                                var id = _a.id;
                                var subscriptions = _this._subscribedEntities.get(session);
                                if (subscriptions) subscriptions.add(id);
                            };
                        });
                    } else {
                        this.sessionService.manager.on['ar.context.update'] = function (state) {
                            _this._update(state);
                        };
                    }
                }
                Object.defineProperty(ContextService.prototype, "frame", {
                    /**
                     * The current frame
                     */
                    get: function () {
                        if (!cesium_imports_1.defined(this.serializedFrameState)) throw new Error('A frame state has not yet been received');
                        return this._frame;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ContextService.prototype, "serializedFrameState", {
                    /**
                     * The serialized frame state for this frame
                     */
                    get: function () {
                        return this._serializedState;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Get the current time
                 */
                ContextService.prototype.getTime = function () {
                    return this.frame.time;
                };
                /**
                 * Set the default reference frame for `getCurrentEntityState`.
                 */
                ContextService.prototype.setDefaultReferenceFrame = function (origin) {
                    this._defaultReferenceFrame = origin;
                };
                /**
                 * Get the default reference frame to use when calling `getEntityPose`.
                 * By default, this is the `localOriginEastNorthUp` reference frame.
                 */
                ContextService.prototype.getDefaultReferenceFrame = function () {
                    return this._defaultReferenceFrame;
                };
                /**
                 * Adds an entity to this session's set of tracked entities.
                 *
                 * @param id - The unique identifier of an entity.
                 * @returns The entity that was subscribed to.
                 */
                ContextService.prototype.subscribeToEntityById = function (id) {
                    this.sessionService.manager.send('ar.context.subscribe', { id: id });
                    return this.subscribedEntities.getOrCreateEntity(id);
                };
                /**
                 * Gets the current pose of an entity, relative to a given reference frame.
                 *
                 * @param entity - The entity whose state is to be queried.
                 * @param referenceFrame - The intended reference frame. Defaults to `this.defaultReferenceFrame`.
                 * @returns If the position and orientation exist for the given entity, an
                 * object with the fields `position` and `orientation`, both of type
                 * `Cartesian3`. Otherwise undefined.
                 */
                ContextService.prototype.getEntityPose = function (entity, referenceFrame) {
                    if (referenceFrame === void 0) {
                        referenceFrame = this._defaultReferenceFrame;
                    }
                    var time = this.getTime();
                    var key = entity.id + '@' + _stringFromReferenceFrame(referenceFrame);
                    var entityPose = this._entityPoseMap.get(key);
                    if (!cesium_imports_1.defined(entityPose)) {
                        entityPose = {
                            position: new cesium_imports_1.Cartesian3(),
                            orientation: new cesium_imports_1.Quaternion(),
                            time: cesium_imports_1.JulianDate.clone(time),
                            poseStatus: 0
                        };
                        this._entityPoseMap.set(key, entityPose);
                    } else {
                        cesium_imports_1.JulianDate.clone(time, entityPose.time);
                    }
                    var position = utils_1.getEntityPositionInReferenceFrame(entity, time, referenceFrame, entityPose.position);
                    var orientation = utils_1.getEntityOrientationInReferenceFrame(entity, time, referenceFrame, entityPose.orientation);
                    var hasPose = position && orientation;
                    var poseStatus = 0;
                    var previousStatus = entityPose.poseStatus;
                    if (hasPose) {
                        poseStatus |= PoseStatus.KNOWN;
                    }
                    if (hasPose && !(previousStatus & PoseStatus.KNOWN)) {
                        poseStatus |= PoseStatus.FOUND;
                    } else if (!hasPose && previousStatus & PoseStatus.KNOWN) {
                        poseStatus |= PoseStatus.LOST;
                    }
                    entityPose.poseStatus = poseStatus;
                    return entityPose;
                };
                /**
                 * deprecated
                 */
                ContextService.prototype.getCurrentEntityState = function (entity, referenceFrame) {
                    console.warn('getCurrentEntityState is deprecated. Use getEntityPose instead.');
                    return this.getEntityPose(entity, referenceFrame);
                };
                // TODO: This function is called a lot. Potential for optimization. 
                ContextService.prototype._update = function (serializedState) {
                    var _this = this;
                    // if this session is the manager, we need to update our child sessions a.s.a.p
                    if (this.sessionService.isRealityManager) {
                        delete serializedState.entities[this.user.id]; // children don't need this
                        this._entityPoseCache = {};
                        for (var _i = 0, _a = this.sessionService.managedSessions; _i < _a.length; _i++) {
                            var session = _a[_i];
                            this._sendUpdateForSession(serializedState, session);
                        }
                    }
                    // our user entity is defined by the current view pose (the current reality must provide this)
                    serializedState.entities[this.user.id] = serializedState.view.pose;
                    // update the entities the manager knows about
                    this._knownEntities.clear();
                    for (var id in serializedState.entities) {
                        this.updateEntityFromFrameState(id, serializedState);
                        this._updatingEntities.add(id);
                        this._knownEntities.add(id);
                    }
                    // if the mangager didn't send us an update for a particular entity,
                    // assume the manager no longer knows about it
                    this._updatingEntities.forEach(function (id) {
                        if (!_this._knownEntities.has(id)) {
                            var entity = _this.subscribedEntities.getById(id);
                            entity.position = undefined;
                            entity.orientation = undefined;
                            // WORKAROUND until https://github.com/AnalyticalGraphicsInc/cesium/issues/4225 is fixed
                            entity = _this.entities.getById(id);
                            entity.position = undefined;
                            entity.orientation = undefined;
                            _this._updatingEntities.delete(id);
                        }
                    });
                    // update our local origin
                    this._updateLocalOrigin(serializedState);
                    // update our frame object
                    var frame = this._frame;
                    var now = typeof performance !== 'undefined' ? performance.now() : Date.now();
                    frame.deltaTime = Math.min(now - frame.systemTime, this.maxDeltaTime);
                    frame.systemTime = now;
                    cesium_imports_1.JulianDate.clone(serializedState.time, frame.time);
                    this._serializedState = serializedState;
                    // raise an event for the user update and render the scene
                    this.updateEvent.raiseEvent(frame);
                    this.renderEvent.raiseEvent(frame);
                };
                ContextService.prototype.updateEntityFromFrameState = function (id, state) {
                    var entityPose = state.entities[id];
                    if (!entityPose) {
                        if (!this.wellKnownReferenceFrames.getById(id)) {
                            this.subscribedEntities.getOrCreateEntity(id);
                        }
                        return;
                    }
                    var referenceFrame;
                    if (cesium_imports_1.defined(entityPose.r)) {
                        if (typeof entityPose.r === 'number') {
                            referenceFrame = entityPose.r;
                        } else {
                            referenceFrame = this.entities.getById(entityPose.r);
                        }
                    } else {
                        referenceFrame = cesium_imports_1.ReferenceFrame.FIXED;
                    }
                    if (!cesium_imports_1.defined(referenceFrame)) {
                        this.updateEntityFromFrameState(entityPose.r, state);
                        referenceFrame = this.entities.getById(entityPose.r);
                    }
                    var positionValue = entityPose.p === 0 ? cesium_imports_1.Cartesian3.ZERO : entityPose.p;
                    var orientationValue = entityPose.o === 0 ? cesium_imports_1.Quaternion.IDENTITY : entityPose.o;
                    var entity = this.subscribedEntities.getOrCreateEntity(id);
                    var entityPosition = entity.position;
                    var entityOrientation = entity.orientation;
                    if (!entityPosition || entityPosition.referenceFrame !== referenceFrame) {
                        entityPosition = new cesium_imports_1.ConstantPositionProperty(positionValue, referenceFrame);
                        entity.position = entityPosition;
                    } else if (entityPosition instanceof cesium_imports_1.ConstantPositionProperty) {
                        entityPosition.setValue(positionValue, referenceFrame);
                    } else if (entityPosition instanceof cesium_imports_1.SampledPositionProperty) {
                        entityPosition.addSample(cesium_imports_1.JulianDate.clone(state.time), positionValue);
                    }
                    if (!entityOrientation) {
                        entityOrientation = new cesium_imports_1.ConstantProperty(orientationValue);
                        entity.orientation = entityOrientation;
                    } else if (entityOrientation instanceof cesium_imports_1.ConstantProperty) {
                        entityOrientation.setValue(orientationValue);
                    } else if (entityOrientation instanceof cesium_imports_1.SampledProperty) {
                        entityOrientation.addSample(cesium_imports_1.JulianDate.clone(state.time), orientationValue);
                    }
                    return entity;
                };
                ContextService.prototype.publishEntityState = function (entity, referenceFrame) {};
                ContextService.prototype._updateLocalOrigin = function (state) {
                    var userRootFrame = utils_1.getRootReferenceFrame(this.user);
                    var userPosition = this.user.position && this.user.position.getValueInReferenceFrame(state.time, userRootFrame, scratchCartesian3);
                    var localENUFrame = this.localOriginEastNorthUp.position && this.localOriginEastNorthUp.position.referenceFrame;
                    var localENUPosition = this.localOriginEastNorthUp.position && localENUFrame && this.localOriginEastNorthUp.position.getValueInReferenceFrame(state.time, localENUFrame, scratchOriginCartesian3);
                    if (userPosition && (!localENUPosition || localENUFrame !== userRootFrame || cesium_imports_1.Cartesian3.magnitudeSquared(cesium_imports_1.Cartesian3.subtract(userPosition, localENUPosition, scratchOriginCartesian3)) > 25000000)) {
                        var localENUPositionProperty = this.localOriginEastNorthUp.position;
                        var localENUOrientationProperty = this.localOriginEastNorthUp.orientation;
                        localENUPositionProperty.setValue(userPosition, userRootFrame);
                        if (userRootFrame === cesium_imports_1.ReferenceFrame.FIXED) {
                            var enuOrientation = cesium_imports_1.Transforms.headingPitchRollQuaternion(userPosition, 0, 0, 0, undefined, scratchQuaternion);
                            localENUOrientationProperty.setValue(enuOrientation);
                        } else {
                            localENUOrientationProperty.setValue(cesium_imports_1.Quaternion.IDENTITY);
                        }
                        this.localOriginChangeEvent.raiseEvent(undefined);
                    }
                };
                ContextService.prototype._sendUpdateForSession = function (parentState, session) {
                    var _this = this;
                    var sessionPoseMap = {};
                    for (var id in parentState.entities) {
                        sessionPoseMap[id] = parentState.entities[id];
                    }
                    var subscriptions = this._subscribedEntities.get(session);
                    subscriptions.forEach(function (id) {
                        _this._addEntityAndAncestorsToPoseMap(sessionPoseMap, id, parentState.time);
                    });
                    var sessionState = {
                        reality: parentState.reality,
                        index: parentState.index,
                        time: parentState.time,
                        view: parentState.view,
                        entities: sessionPoseMap,
                        sendTime: cesium_imports_1.JulianDate.now()
                    };
                    session.send('ar.context.update', sessionState);
                };
                ContextService.prototype._addEntityAndAncestorsToPoseMap = function (poseMap, id, time) {
                    if (!cesium_imports_1.defined(this._entityPoseCache[id])) {
                        var entity = this.subscribedEntities.getById(id);
                        if (!entity) return;
                        this._entityPoseCache[id] = utils_1.getSerializedEntityPose(entity, time);
                        if (entity.position && entity.position.referenceFrame instanceof cesium_imports_1.Entity) {
                            var refId = _stringFromReferenceFrame(entity.position.referenceFrame);
                            this._addEntityAndAncestorsToPoseMap(poseMap, refId, time);
                        }
                    }
                    poseMap[id] = this._entityPoseCache[id];
                };
                ContextService = __decorate([aurelia_dependency_injection_1.inject(session_1.SessionService, reality_1.RealityService)], ContextService);
                return ContextService;
            }();
            exports_1("ContextService", ContextService);
        }
    };
});
$__System.register('14', ['c', '10', '12'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, session_1, utils_1;
    var FocusService;
    return {
        setters: [function (aurelia_dependency_injection_1_1) {
            aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
        }, function (session_1_1) {
            session_1 = session_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            /**
             * Manages focus state
             */
            FocusService = function () {
                function FocusService(sessionService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    /**
                     * An event that is raised when this session has gained focus
                     */
                    this.focusEvent = new utils_1.Event();
                    /**
                     * An event that is raised when this session has lost focus
                     */
                    this.blurEvent = new utils_1.Event();
                    this._hasFocus = false;
                    this._sessionFocusEvent = new utils_1.Event();
                    sessionService.manager.on['ar.focus.state'] = function (message) {
                        _this._setFocus(message.state);
                    };
                    if (sessionService.isRealityManager) {
                        sessionService.manager.connectEvent.addEventListener(function () {
                            setTimeout(function () {
                                if (!_this._session) _this.setSession(_this.sessionService.manager);
                            });
                        });
                    }
                }
                Object.defineProperty(FocusService.prototype, "hasFocus", {
                    /**
                     * True if this session has focus
                     */
                    get: function () {
                        return this._hasFocus;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FocusService.prototype, "sessionFocusEvent", {
                    /**
                     * Manager-only. An event that is raised when a managed session has acquired focus.
                     */
                    get: function () {
                        this.sessionService.ensureIsRealityManager();
                        return this._sessionFocusEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Manager-only. The managed session which currently has focus.
                 */
                FocusService.prototype.getSession = function () {
                    this.sessionService.ensureIsRealityManager();
                    return this._session;
                };
                /**
                 *  Manager-only. Grant focus to a managed session.
                 */
                FocusService.prototype.setSession = function (session) {
                    this.sessionService.ensureIsRealityManager();
                    if (session && !session.isConnected) throw new Error('Only a connected session can be granted focus');
                    var previousFocussedSession = this._session;
                    if (previousFocussedSession !== session) {
                        if (previousFocussedSession) previousFocussedSession.send('ar.focus.state', { state: false });
                        if (session) session.send('ar.focus.state', { state: true });
                        this._session = session;
                        this.sessionFocusEvent.raiseEvent({
                            previous: previousFocussedSession,
                            current: session
                        });
                    }
                };
                FocusService.prototype.whenSessionHasFocus = function (session) {
                    var _this = this;
                    this.sessionService.ensureIsRealityManager();
                    return new Promise(function (resolve) {
                        var remove = _this.sessionFocusEvent.addEventListener(function (_a) {
                            var current = _a.current;
                            if (current === session) {
                                remove();
                                resolve();
                            }
                        });
                    });
                };
                FocusService.prototype._setFocus = function (state) {
                    if (this._hasFocus !== state) {
                        this._hasFocus = state;
                        if (state) {
                            this.focusEvent.raiseEvent(undefined);
                        } else {
                            this.blurEvent.raiseEvent(undefined);
                        }
                    }
                };
                FocusService = __decorate([aurelia_dependency_injection_1.inject(session_1.SessionService)], FocusService);
                return FocusService;
            }();
            exports_1("FocusService", FocusService);
        }
    };
});
(function() {
var define = $__System.amdDefine;
define("16", ["exports", "3"], function(exports, _aureliaPal) {
  'use strict';
  exports.__esModule = true;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  exports.decorators = decorators;
  exports.deprecated = deprecated;
  exports.mixin = mixin;
  exports.protocol = protocol;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var metadata = {
    resource: 'aurelia:resource',
    paramTypes: 'design:paramtypes',
    properties: 'design:properties',
    get: function get(metadataKey, target, targetKey) {
      if (!target) {
        return undefined;
      }
      var result = metadata.getOwn(metadataKey, target, targetKey);
      return result === undefined ? metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
    },
    getOwn: function getOwn(metadataKey, target, targetKey) {
      if (!target) {
        return undefined;
      }
      return Reflect.getOwnMetadata(metadataKey, target, targetKey);
    },
    define: function define(metadataKey, metadataValue, target, targetKey) {
      Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
    },
    getOrCreateOwn: function getOrCreateOwn(metadataKey, Type, target, targetKey) {
      var result = metadata.getOwn(metadataKey, target, targetKey);
      if (result === undefined) {
        result = new Type();
        Reflect.defineMetadata(metadataKey, result, target, targetKey);
      }
      return result;
    }
  };
  exports.metadata = metadata;
  var originStorage = new Map();
  var unknownOrigin = Object.freeze({
    moduleId: undefined,
    moduleMember: undefined
  });
  var Origin = (function() {
    function Origin(moduleId, moduleMember) {
      _classCallCheck(this, Origin);
      this.moduleId = moduleId;
      this.moduleMember = moduleMember;
    }
    Origin.get = function get(fn) {
      var origin = originStorage.get(fn);
      if (origin === undefined) {
        _aureliaPal.PLATFORM.eachModule(function(key, value) {
          for (var _name in value) {
            var exp = value[_name];
            if (exp === fn) {
              originStorage.set(fn, origin = new Origin(key, _name));
              return true;
            }
          }
          if (value === fn) {
            originStorage.set(fn, origin = new Origin(key, 'default'));
            return true;
          }
        });
      }
      return origin || unknownOrigin;
    };
    Origin.set = function set(fn, origin) {
      originStorage.set(fn, origin);
    };
    return Origin;
  })();
  exports.Origin = Origin;
  function decorators() {
    for (var _len = arguments.length,
        rest = Array(_len),
        _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }
    var applicator = function applicator(target, key, descriptor) {
      var i = rest.length;
      if (key) {
        descriptor = descriptor || {
          value: target[key],
          writable: true,
          configurable: true,
          enumerable: true
        };
        while (i--) {
          descriptor = rest[i](target, key, descriptor) || descriptor;
        }
        Object.defineProperty(target, key, descriptor);
      } else {
        while (i--) {
          target = rest[i](target) || target;
        }
      }
      return target;
    };
    applicator.on = applicator;
    return applicator;
  }
  function deprecated(optionsOrTarget, maybeKey, maybeDescriptor) {
    function decorator(target, key, descriptor) {
      var methodSignature = target.constructor.name + '#' + key;
      var options = maybeKey ? {} : optionsOrTarget || {};
      var message = 'DEPRECATION - ' + methodSignature;
      if (typeof descriptor.value !== 'function') {
        throw new SyntaxError('Only methods can be marked as deprecated.');
      }
      if (options.message) {
        message += ' - ' + options.message;
      }
      return _extends({}, descriptor, {value: function deprecationWrapper() {
          if (options.error) {
            throw new Error(message);
          } else {
            console.warn(message);
          }
          return descriptor.value.apply(this, arguments);
        }});
    }
    return maybeKey ? decorator(optionsOrTarget, maybeKey, maybeDescriptor) : decorator;
  }
  function mixin(behavior) {
    var instanceKeys = Object.keys(behavior);
    function _mixin(possible) {
      var decorator = function decorator(target) {
        var resolvedTarget = typeof target === 'function' ? target.prototype : target;
        for (var _iterator = instanceKeys,
            _isArray = Array.isArray(_iterator),
            _i = 0,
            _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
          var _ref;
          if (_isArray) {
            if (_i >= _iterator.length)
              break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done)
              break;
            _ref = _i.value;
          }
          var property = _ref;
          Object.defineProperty(resolvedTarget, property, {
            value: behavior[property],
            writable: true
          });
        }
      };
      return possible ? decorator(possible) : decorator;
    }
    return _mixin;
  }
  function alwaysValid() {
    return true;
  }
  function noCompose() {}
  function ensureProtocolOptions(options) {
    if (options === undefined) {
      options = {};
    } else if (typeof options === 'function') {
      options = {validate: options};
    }
    if (!options.validate) {
      options.validate = alwaysValid;
    }
    if (!options.compose) {
      options.compose = noCompose;
    }
    return options;
  }
  function createProtocolValidator(validate) {
    return function(target) {
      var result = validate(target);
      return result === true;
    };
  }
  function createProtocolAsserter(name, validate) {
    return function(target) {
      var result = validate(target);
      if (result !== true) {
        throw new Error(result || name + ' was not correctly implemented.');
      }
    };
  }
  function protocol(name, options) {
    options = ensureProtocolOptions(options);
    var result = function result(target) {
      var resolvedTarget = typeof target === 'function' ? target.prototype : target;
      options.compose(resolvedTarget);
      result.assert(resolvedTarget);
      Object.defineProperty(resolvedTarget, 'protocol:' + name, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: true
      });
    };
    result.validate = createProtocolValidator(options.validate);
    result.assert = createProtocolAsserter(name, options.validate);
    return result;
  }
  protocol.create = function(name, options) {
    options = ensureProtocolOptions(options);
    var hidden = 'protocol:' + name;
    var result = function result(target) {
      var decorator = protocol(name, options);
      return target ? decorator(target) : decorator;
    };
    result.decorates = function(obj) {
      return obj[hidden] === true;
    };
    result.validate = createProtocolValidator(options.validate);
    result.assert = createProtocolAsserter(name, options.validate);
    return result;
  };
});

})();
(function() {
var define = $__System.amdDefine;
define("3", ["exports"], function(exports) {
  'use strict';
  exports.__esModule = true;
  exports.AggregateError = AggregateError;
  exports.initializePAL = initializePAL;
  function AggregateError(message, innerError, skipIfAlreadyAggregate) {
    if (innerError) {
      if (innerError.innerError && skipIfAlreadyAggregate) {
        return innerError;
      }
      if (innerError.stack) {
        message += '\n------------------------------------------------\ninner error: ' + innerError.stack;
      }
    }
    var e = new Error(message);
    if (innerError) {
      e.innerError = innerError;
    }
    return e;
  }
  var FEATURE = {};
  exports.FEATURE = FEATURE;
  var PLATFORM = {
    noop: function noop() {},
    eachModule: function eachModule() {}
  };
  exports.PLATFORM = PLATFORM;
  PLATFORM.global = (function() {
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return new Function('return this')();
  })();
  var DOM = {};
  exports.DOM = DOM;
  function initializePAL(callback) {
    if (typeof Object.getPropertyDescriptor !== 'function') {
      Object.getPropertyDescriptor = function(subject, name) {
        var pd = Object.getOwnPropertyDescriptor(subject, name);
        var proto = Object.getPrototypeOf(subject);
        while (typeof pd === 'undefined' && proto !== null) {
          pd = Object.getOwnPropertyDescriptor(proto, name);
          proto = Object.getPrototypeOf(proto);
        }
        return pd;
      };
    }
    callback(PLATFORM, FEATURE, DOM);
  }
});

})();
(function() {
var define = $__System.amdDefine;
define("c", ["exports", "16", "3"], function(exports, _aureliaMetadata, _aureliaPal) {
  'use strict';
  exports.__esModule = true;
  var _classInvokers;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.invoker = invoker;
  exports.factory = factory;
  exports.registration = registration;
  exports.transient = transient;
  exports.singleton = singleton;
  exports.autoinject = autoinject;
  exports.inject = inject;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var resolver = _aureliaMetadata.protocol.create('aurelia:resolver', function(target) {
    if (!(typeof target.get === 'function')) {
      return 'Resolvers must implement: get(container: Container, key: any): any';
    }
    return true;
  });
  exports.resolver = resolver;
  var Lazy = (function() {
    function Lazy(key) {
      _classCallCheck(this, _Lazy);
      this._key = key;
    }
    Lazy.prototype.get = function get(container) {
      var _this = this;
      return function() {
        return container.get(_this._key);
      };
    };
    Lazy.of = function of(key) {
      return new Lazy(key);
    };
    var _Lazy = Lazy;
    Lazy = resolver()(Lazy) || Lazy;
    return Lazy;
  })();
  exports.Lazy = Lazy;
  var All = (function() {
    function All(key) {
      _classCallCheck(this, _All);
      this._key = key;
    }
    All.prototype.get = function get(container) {
      return container.getAll(this._key);
    };
    All.of = function of(key) {
      return new All(key);
    };
    var _All = All;
    All = resolver()(All) || All;
    return All;
  })();
  exports.All = All;
  var Optional = (function() {
    function Optional(key) {
      var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      _classCallCheck(this, _Optional);
      this._key = key;
      this._checkParent = checkParent;
    }
    Optional.prototype.get = function get(container) {
      if (container.hasResolver(this._key, this._checkParent)) {
        return container.get(this._key);
      }
      return null;
    };
    Optional.of = function of(key) {
      var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      return new Optional(key, checkParent);
    };
    var _Optional = Optional;
    Optional = resolver()(Optional) || Optional;
    return Optional;
  })();
  exports.Optional = Optional;
  var Parent = (function() {
    function Parent(key) {
      _classCallCheck(this, _Parent);
      this._key = key;
    }
    Parent.prototype.get = function get(container) {
      return container.parent ? container.parent.get(this._key) : null;
    };
    Parent.of = function of(key) {
      return new Parent(key);
    };
    var _Parent = Parent;
    Parent = resolver()(Parent) || Parent;
    return Parent;
  })();
  exports.Parent = Parent;
  var StrategyResolver = (function() {
    function StrategyResolver(strategy, state) {
      _classCallCheck(this, _StrategyResolver);
      this.strategy = strategy;
      this.state = state;
    }
    StrategyResolver.prototype.get = function get(container, key) {
      switch (this.strategy) {
        case 0:
          return this.state;
        case 1:
          var singleton = container.invoke(this.state);
          this.state = singleton;
          this.strategy = 0;
          return singleton;
        case 2:
          return container.invoke(this.state);
        case 3:
          return this.state(container, key, this);
        case 4:
          return this.state[0].get(container, key);
        case 5:
          return container.get(this.state);
        default:
          throw new Error('Invalid strategy: ' + this.strategy);
      }
    };
    var _StrategyResolver = StrategyResolver;
    StrategyResolver = resolver()(StrategyResolver) || StrategyResolver;
    return StrategyResolver;
  })();
  exports.StrategyResolver = StrategyResolver;
  function invoker(value) {
    return function(target) {
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.invoker, value, target);
    };
  }
  function factory(potentialTarget) {
    var deco = function deco(target) {
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.invoker, FactoryInvoker.instance, target);
    };
    return potentialTarget ? deco(potentialTarget) : deco;
  }
  var FactoryInvoker = (function() {
    function FactoryInvoker() {
      _classCallCheck(this, FactoryInvoker);
    }
    FactoryInvoker.prototype.invoke = function invoke(container, fn, dependencies) {
      var i = dependencies.length;
      var args = new Array(i);
      while (i--) {
        args[i] = container.get(dependencies[i]);
      }
      return fn.apply(undefined, args);
    };
    FactoryInvoker.prototype.invokeWithDynamicDependencies = function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
      var i = staticDependencies.length;
      var args = new Array(i);
      while (i--) {
        args[i] = container.get(staticDependencies[i]);
      }
      if (dynamicDependencies !== undefined) {
        args = args.concat(dynamicDependencies);
      }
      return fn.apply(undefined, args);
    };
    _createClass(FactoryInvoker, null, [{
      key: 'instance',
      value: new FactoryInvoker(),
      enumerable: true
    }]);
    return FactoryInvoker;
  })();
  exports.FactoryInvoker = FactoryInvoker;
  function registration(value) {
    return function(target) {
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.registration, value, target);
    };
  }
  function transient(key) {
    return registration(new TransientRegistration(key));
  }
  function singleton(keyOrRegisterInChild) {
    var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    return registration(new SingletonRegistration(keyOrRegisterInChild, registerInChild));
  }
  var TransientRegistration = (function() {
    function TransientRegistration(key) {
      _classCallCheck(this, TransientRegistration);
      this._key = key;
    }
    TransientRegistration.prototype.registerResolver = function registerResolver(container, key, fn) {
      var resolver = new StrategyResolver(2, fn);
      container.registerResolver(this._key || key, resolver);
      return resolver;
    };
    return TransientRegistration;
  })();
  exports.TransientRegistration = TransientRegistration;
  var SingletonRegistration = (function() {
    function SingletonRegistration(keyOrRegisterInChild) {
      var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      _classCallCheck(this, SingletonRegistration);
      if (typeof keyOrRegisterInChild === 'boolean') {
        this._registerInChild = keyOrRegisterInChild;
      } else {
        this._key = keyOrRegisterInChild;
        this._registerInChild = registerInChild;
      }
    }
    SingletonRegistration.prototype.registerResolver = function registerResolver(container, key, fn) {
      var resolver = new StrategyResolver(1, fn);
      if (this._registerInChild) {
        container.registerResolver(this._key || key, resolver);
      } else {
        container.root.registerResolver(this._key || key, resolver);
      }
      return resolver;
    };
    return SingletonRegistration;
  })();
  exports.SingletonRegistration = SingletonRegistration;
  var badKeyError = 'key/value cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?';
  var _emptyParameters = Object.freeze([]);
  exports._emptyParameters = _emptyParameters;
  _aureliaMetadata.metadata.registration = 'aurelia:registration';
  _aureliaMetadata.metadata.invoker = 'aurelia:invoker';
  var resolverDecorates = resolver.decorates;
  var InvocationHandler = (function() {
    function InvocationHandler(fn, invoker, dependencies) {
      _classCallCheck(this, InvocationHandler);
      this.fn = fn;
      this.invoker = invoker;
      this.dependencies = dependencies;
    }
    InvocationHandler.prototype.invoke = function invoke(container, dynamicDependencies) {
      return dynamicDependencies !== undefined ? this.invoker.invokeWithDynamicDependencies(container, this.fn, this.dependencies, dynamicDependencies) : this.invoker.invoke(container, this.fn, this.dependencies);
    };
    return InvocationHandler;
  })();
  exports.InvocationHandler = InvocationHandler;
  function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
    var i = staticDependencies.length;
    var args = new Array(i);
    while (i--) {
      args[i] = container.get(staticDependencies[i]);
    }
    if (dynamicDependencies !== undefined) {
      args = args.concat(dynamicDependencies);
    }
    return Reflect.construct(fn, args);
  }
  var classInvokers = (_classInvokers = {}, _classInvokers[0] = {
    invoke: function invoke(container, Type) {
      return new Type();
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers[1] = {
    invoke: function invoke(container, Type, deps) {
      return new Type(container.get(deps[0]));
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers[2] = {
    invoke: function invoke(container, Type, deps) {
      return new Type(container.get(deps[0]), container.get(deps[1]));
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers[3] = {
    invoke: function invoke(container, Type, deps) {
      return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]));
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers[4] = {
    invoke: function invoke(container, Type, deps) {
      return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]), container.get(deps[3]));
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers[5] = {
    invoke: function invoke(container, Type, deps) {
      return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]), container.get(deps[3]), container.get(deps[4]));
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers.fallback = {
    invoke: invokeWithDynamicDependencies,
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers);
  var Container = (function() {
    function Container(configuration) {
      _classCallCheck(this, Container);
      if (configuration === undefined) {
        configuration = {};
      }
      this._configuration = configuration;
      this._onHandlerCreated = configuration.onHandlerCreated;
      this._handlers = configuration.handlers || (configuration.handlers = new Map());
      this._resolvers = new Map();
      this.root = this;
      this.parent = null;
    }
    Container.prototype.makeGlobal = function makeGlobal() {
      Container.instance = this;
      return this;
    };
    Container.prototype.setHandlerCreatedCallback = function setHandlerCreatedCallback(onHandlerCreated) {
      this._onHandlerCreated = onHandlerCreated;
      this._configuration.onHandlerCreated = onHandlerCreated;
    };
    Container.prototype.registerInstance = function registerInstance(key, instance) {
      this.registerResolver(key, new StrategyResolver(0, instance === undefined ? key : instance));
    };
    Container.prototype.registerSingleton = function registerSingleton(key, fn) {
      this.registerResolver(key, new StrategyResolver(1, fn === undefined ? key : fn));
    };
    Container.prototype.registerTransient = function registerTransient(key, fn) {
      this.registerResolver(key, new StrategyResolver(2, fn === undefined ? key : fn));
    };
    Container.prototype.registerHandler = function registerHandler(key, handler) {
      this.registerResolver(key, new StrategyResolver(3, handler));
    };
    Container.prototype.registerAlias = function registerAlias(originalKey, aliasKey) {
      this.registerResolver(aliasKey, new StrategyResolver(5, originalKey));
    };
    Container.prototype.registerResolver = function registerResolver(key, resolver) {
      if (key === null || key === undefined) {
        throw new Error(badKeyError);
      }
      var allResolvers = this._resolvers;
      var result = allResolvers.get(key);
      if (result === undefined) {
        allResolvers.set(key, resolver);
      } else if (result.strategy === 4) {
        result.state.push(resolver);
      } else {
        allResolvers.set(key, new StrategyResolver(4, [result, resolver]));
      }
    };
    Container.prototype.autoRegister = function autoRegister(fn, key) {
      var resolver = undefined;
      if (typeof fn === 'function') {
        var _registration = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.registration, fn);
        if (_registration === undefined) {
          resolver = new StrategyResolver(1, fn);
          this.registerResolver(key === undefined ? fn : key, resolver);
        } else {
          resolver = _registration.registerResolver(this, key === undefined ? fn : key, fn);
        }
      } else {
        resolver = new StrategyResolver(0, fn);
        this.registerResolver(key === undefined ? fn : key, resolver);
      }
      return resolver;
    };
    Container.prototype.autoRegisterAll = function autoRegisterAll(fns) {
      var i = fns.length;
      while (i--) {
        this.autoRegister(fns[i]);
      }
    };
    Container.prototype.unregister = function unregister(key) {
      this._resolvers['delete'](key);
    };
    Container.prototype.hasResolver = function hasResolver(key) {
      var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      if (key === null || key === undefined) {
        throw new Error(badKeyError);
      }
      return this._resolvers.has(key) || checkParent && this.parent !== null && this.parent.hasResolver(key, checkParent);
    };
    Container.prototype.get = function get(key) {
      if (key === null || key === undefined) {
        throw new Error(badKeyError);
      }
      if (key === Container) {
        return this;
      }
      if (resolverDecorates(key)) {
        return key.get(this, key);
      }
      var resolver = this._resolvers.get(key);
      if (resolver === undefined) {
        if (this.parent === null) {
          return this.autoRegister(key).get(this, key);
        }
        return this.parent._get(key);
      }
      return resolver.get(this, key);
    };
    Container.prototype._get = function _get(key) {
      var resolver = this._resolvers.get(key);
      if (resolver === undefined) {
        if (this.parent === null) {
          return this.autoRegister(key).get(this, key);
        }
        return this.parent._get(key);
      }
      return resolver.get(this, key);
    };
    Container.prototype.getAll = function getAll(key) {
      if (key === null || key === undefined) {
        throw new Error(badKeyError);
      }
      var resolver = this._resolvers.get(key);
      if (resolver === undefined) {
        if (this.parent === null) {
          return _emptyParameters;
        }
        return this.parent.getAll(key);
      }
      if (resolver.strategy === 4) {
        var state = resolver.state;
        var i = state.length;
        var results = new Array(i);
        while (i--) {
          results[i] = state[i].get(this, key);
        }
        return results;
      }
      return [resolver.get(this, key)];
    };
    Container.prototype.createChild = function createChild() {
      var child = new Container(this._configuration);
      child.root = this.root;
      child.parent = this;
      return child;
    };
    Container.prototype.invoke = function invoke(fn, dynamicDependencies) {
      try {
        var _handler = this._handlers.get(fn);
        if (_handler === undefined) {
          _handler = this._createInvocationHandler(fn);
          this._handlers.set(fn, _handler);
        }
        return _handler.invoke(this, dynamicDependencies);
      } catch (e) {
        throw new _aureliaPal.AggregateError('Error invoking ' + fn.name + '. Check the inner error for details.', e, true);
      }
    };
    Container.prototype._createInvocationHandler = function _createInvocationHandler(fn) {
      var dependencies = undefined;
      if (typeof fn.inject === 'function') {
        dependencies = fn.inject();
      } else if (fn.inject === undefined) {
        dependencies = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.paramTypes, fn) || _emptyParameters;
      } else {
        dependencies = fn.inject;
      }
      var invoker = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.invoker, fn) || classInvokers[dependencies.length] || classInvokers.fallback;
      var handler = new InvocationHandler(fn, invoker, dependencies);
      return this._onHandlerCreated !== undefined ? this._onHandlerCreated(handler) : handler;
    };
    return Container;
  })();
  exports.Container = Container;
  function autoinject(potentialTarget) {
    var deco = function deco(target) {
      target.inject = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.paramTypes, target) || _emptyParameters;
    };
    return potentialTarget ? deco(potentialTarget) : deco;
  }
  function inject() {
    for (var _len = arguments.length,
        rest = Array(_len),
        _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }
    return function(target, key, descriptor) {
      if (descriptor) {
        var _fn = descriptor.value;
        _fn.inject = rest;
      } else {
        target.inject = rest;
      }
    };
  }
});

})();
$__System.register("f", [], function (exports_1, context_1) {
  "use strict";

  var __moduleName = context_1 && context_1.id;
  var Role, SubviewType, RealityView;
  return {
    setters: [],
    execute: function () {
      /**
       * Describes the role of an [[ArgonSystem]]
       */
      (function (Role) {
        /**
         * A system with this role is responsible for augmenting an arbitrary view of reality,
         * generally by overlaying computer generated graphics. A reality augmentor may also,
         * if appropriate, be elevated to the role of a [[REALITY_MANAGER]].
         */
        Role[Role["REALITY_AUGMENTOR"] = "RealityAugmentor"] = "REALITY_AUGMENTOR";
        /**
         * A system with this role is responsible for (at minimum) describing (and providing,
         * if necessary) a visual representation of the world and the 3D eye pose of the viewer.
         */
        Role[Role["REALITY_VIEW"] = "RealityView"] = "REALITY_VIEW";
        /**
         * A system with this role is responsible for mediating access to sensors/trackers
         * and pose data for known entities in the world, selecting/configuring/loading
         * [[REALITY_VIEW]]s, and providing the mechanism by which any given [[REALITY_AUGMENTOR]]
         * can augment any given [[REALITY_VIEW]]. The reality manager may also, when appropriate,
         * take on the role of [[REALITY_AUGMENTOR]].
         */
        Role[Role["REALITY_MANAGER"] = "RealityManager"] = "REALITY_MANAGER";
        /**
         * Deprecated. Use [[REALITY_AUGMENTOR]].
         * @private
         */
        Role[Role["APPLICATION"] = "Application"] = "APPLICATION";
        /**
         * Deprecated. Use [[REALITY_MANAGER]].
         * @private
         */
        Role[Role["MANAGER"] = "Manager"] = "MANAGER";
      })(Role || (Role = {}));
      exports_1("Role", Role);
      /**
       * Identifies a subview in a [[SerializedSubview]]
       */
      (function (SubviewType) {
        /*
         * Identities a subview for a handheld display.
         */
        SubviewType[SubviewType["SINGULAR"] = "Singular"] = "SINGULAR";
        /*
         * Identifies a subview for the left eye (when the user is wearing an HMD or Viewer)
         */
        SubviewType[SubviewType["LEFTEYE"] = "LeftEye"] = "LEFTEYE";
        /*
         * Identifies a subview for the right eye (when the user is wearing an HMD or Viewer)
         */
        SubviewType[SubviewType["RIGHTEYE"] = "RightEye"] = "RIGHTEYE";
        /*
         * Identifies a subview for a custom view configuration
         */
        SubviewType[SubviewType["OTHER"] = "Other"] = "OTHER";
      })(SubviewType || (SubviewType = {}));
      exports_1("SubviewType", SubviewType);
      /**
      * Represents a view of Reality
      */
      RealityView = function () {
        function RealityView() {}
        RealityView.getType = function (reality) {
          var uri = reality.uri;
          var parts = uri.split(':');
          if (parts[0] === 'reality') {
            return parts[1];
          }
          return 'hosted';
        };
        RealityView.EMPTY = {
          uri: 'reality:empty',
          title: 'Reality',
          providedReferenceFrames: ['FIXED']
        };
        return RealityView;
      }();
      exports_1("RealityView", RealityView);
    }
  };
});
$__System.register('10', ['a', 'c', 'f', '12'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var cesium_imports_1, aurelia_dependency_injection_1, common_1, utils_1;
    var SessionPort, SessionPortFactory, ConnectService, SessionService, LoopbackConnectService, DOMConnectService, DebugConnectService, WKWebViewConnectService;
    return {
        setters: [function (cesium_imports_1_1) {
            cesium_imports_1 = cesium_imports_1_1;
        }, function (aurelia_dependency_injection_1_1) {
            aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
        }, function (common_1_1) {
            common_1 = common_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            ;
            /**
             * Provides two-way communication between two [[SessionPort]] instances.
             */
            SessionPort = function () {
                function SessionPort(uri) {
                    var _this = this;
                    this.uri = uri;
                    this._connectEvent = new utils_1.Event();
                    /**
                     * An event which fires when this port has closed
                     */
                    this.closeEvent = new utils_1.Event();
                    /**
                     * An error which fires when an error occurs.
                     */
                    this.errorEvent = new utils_1.Event();
                    /**
                     * A map from topic to message handler.
                     */
                    this.on = {};
                    this._isOpened = false;
                    this._isConnected = false;
                    this._isClosed = false;
                    this.on[SessionPort.OPEN] = function (info) {
                        if (!info) throw new Error('Session did not provide a configuration');
                        if (_this._isConnected) throw new Error('Session has already connected!');
                        _this.info = info;
                        _this._isConnected = true;
                        _this._connectEvent.raiseEvent(undefined);
                    };
                    this.on[SessionPort.CLOSE] = function () {
                        _this._isClosed = true;
                        _this._isConnected = false;
                        if (_this.messagePort && _this.messagePort.close) _this.messagePort.close();
                        _this.closeEvent.raiseEvent(undefined);
                    };
                    this.on[SessionPort.ERROR] = function (error) {
                        var e = new Error("Session Error: " + error.message);
                        if (error.stack) e['stack'] = error.stack;
                        _this.errorEvent.raiseEvent(e);
                    };
                    this.errorEvent.addEventListener(function (error) {
                        if (_this.errorEvent.numberOfListeners === 1) console.error(error);
                    });
                }
                Object.defineProperty(SessionPort.prototype, "connectEvent", {
                    /**
                     * An event which fires when a connection has been
                     * established to the other [[SessionPort]].
                     */
                    get: function () {
                        if (this._isConnected) throw new Error('The connectEvent only fires once and the session is already connected.');
                        return this._connectEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                /**
                 * Check if a protocol is supported by this session.
                 */
                SessionPort.prototype.supportsProtocol = function (name, versions) {
                    if (!this._isConnected) throw new Error('Session has not yet connected');
                    var protocols = this.info.protocols;
                    if (!protocols) return false;
                    var supported = false;
                    var foundVersions = new Set();
                    protocols.forEach(function (p) {
                        if (p.indexOf(name) !== -1) {
                            var v = +p.split('@v')[1] || 0;
                            foundVersions.add(v);
                        }
                    });
                    if (versions) {
                        if (Array.isArray(versions)) {
                            versions.forEach(function (v) {
                                if (foundVersions.has(v)) {
                                    supported = true;
                                }
                            });
                        } else {
                            if (foundVersions.has(versions)) {
                                supported = true;
                            }
                        }
                    } else if (!versions) {
                        supported = true;
                    }
                    return supported;
                };
                /**
                 * Establish a connection to another [[SessionPort]] via the provided [[MessagePort]] instance.
                 * @param messagePort the message port to post and receive messages.
                 * @param options the configuration which describes this [[ArgonSystem]].
                 */
                SessionPort.prototype.open = function (messagePort, options) {
                    var _this = this;
                    if (this._isClosed) return;
                    if (this._isOpened) throw new Error('Session can only be opened once');
                    if (!options) throw new Error('Session options must be provided');
                    this.messagePort = messagePort;
                    this._isOpened = true;
                    this.messagePort.onmessage = function (evt) {
                        if (_this._isClosed) return;
                        var id = evt.data[0];
                        var topic = evt.data[1];
                        var message = evt.data[2] || {};
                        var expectsResponse = evt.data[3];
                        var handler = _this.on[topic];
                        if (handler && !expectsResponse) {
                            try {
                                var response = handler(message, evt);
                                if (response) console.warn("Handler for " + topic + " returned an unexpected response");
                            } catch (e) {
                                _this.sendError(e);
                                _this.errorEvent.raiseEvent(e);
                            }
                        } else if (handler) {
                            var response = new Promise(function (resolve) {
                                return resolve(handler(message, evt));
                            });
                            Promise.resolve(response).then(function (response) {
                                if (_this._isClosed) return;
                                _this.send(topic + ':resolve:' + id, response);
                            }).catch(function (error) {
                                if (_this._isClosed) return;
                                var errorMessage;
                                if (typeof error === 'string') errorMessage = error;else if (typeof error.message === 'string') errorMessage = error.message;
                                _this.send(topic + ':reject:' + id, { reason: errorMessage });
                            });
                        } else {
                            var errorMessage = 'Unable to handle message ' + topic;
                            if (expectsResponse) {
                                _this.send(topic + ':reject:' + id, { reason: errorMessage });
                            } else {
                                _this.sendError({ message: errorMessage });
                            }
                            _this.errorEvent.raiseEvent(new Error('No handlers are available for topic ' + topic));
                        }
                    };
                    this.send(SessionPort.OPEN, options);
                };
                /**
                 * Send a message
                 * @param topic the message topic.
                 * @param message the message to be sent.
                 * @return Return true if the message is posted successfully,
                 * return false if the session is closed.
                 */
                SessionPort.prototype.send = function (topic, message) {
                    if (!this._isOpened) throw new Error('Session must be open to send messages');
                    if (this._isClosed) return false;
                    var id = cesium_imports_1.createGuid();
                    this.messagePort.postMessage([id, topic, message]);
                    return true;
                };
                /**
                 * Send an error message.
                 * @param errorMessage An error message.
                 * @return Return true if the error message is sent successfully,
                 * otherwise, return false.
                 */
                SessionPort.prototype.sendError = function (e) {
                    var errorMessage = e;
                    if (errorMessage instanceof Error) {
                        errorMessage = {
                            message: errorMessage.message,
                            stack: errorMessage['stack']
                        };
                    }
                    return this.send(SessionPort.ERROR, errorMessage);
                };
                /**
                 * Send a request and return a promise for the result.
                 * @param topic the message topic.
                 * @param message the message to be sent.
                 * @return if the session is not opened or is closed, return a rejected promise,
                 * Otherwise, the returned promise is resolved or rejected based on the response.
                 */
                SessionPort.prototype.request = function (topic, message) {
                    var _this = this;
                    if (!this._isOpened || this._isClosed) throw new Error('Session must be open to make requests');
                    var id = cesium_imports_1.createGuid();
                    var resolveTopic = topic + ':resolve:' + id;
                    var rejectTopic = topic + ':reject:' + id;
                    var result = new Promise(function (resolve, reject) {
                        _this.on[resolveTopic] = function (message) {
                            delete _this.on[resolveTopic];
                            delete _this.on[rejectTopic];
                            resolve(message);
                        };
                        _this.on[rejectTopic] = function (message) {
                            delete _this.on[resolveTopic];
                            delete _this.on[rejectTopic];
                            console.warn("Request '" + topic + "' rejected with reason:\n" + message.reason);
                            reject(new Error(message.reason));
                        };
                    });
                    this.messagePort.postMessage([id, topic, message || {}, true]);
                    return result;
                };
                /**
                 * Close the connection to the remote session.
                 */
                SessionPort.prototype.close = function () {
                    if (this._isClosed) return;
                    if (this._isOpened) {
                        this.send(SessionPort.CLOSE);
                    }
                    this._isClosed = true;
                    this._isConnected = false;
                    if (this.messagePort && this.messagePort.close) this.messagePort.close();
                    this.closeEvent.raiseEvent(undefined);
                };
                Object.defineProperty(SessionPort.prototype, "isConnected", {
                    get: function () {
                        return this._isConnected;
                    },
                    enumerable: true,
                    configurable: true
                });
                SessionPort.OPEN = 'ar.session.open';
                SessionPort.CLOSE = 'ar.session.close';
                SessionPort.ERROR = 'ar.session.error';
                return SessionPort;
            }();
            exports_1("SessionPort", SessionPort);
            /**
             * A factory for creating [[SessionPort]] instances.
             */
            SessionPortFactory = function () {
                function SessionPortFactory() {}
                SessionPortFactory.prototype.create = function (uri) {
                    return new SessionPort(uri);
                };
                return SessionPortFactory;
            }();
            exports_1("SessionPortFactory", SessionPortFactory);
            /**
             * A service for establishing a connection to the [[REALITY_MANAGER]].
             */
            ConnectService = function () {
                function ConnectService() {}
                return ConnectService;
            }();
            exports_1("ConnectService", ConnectService);
            /**
             * A service for managing connections to other ArgonSystem instances
             */
            SessionService = function () {
                function SessionService(
                /**
                 * The configuration of this [[ArgonSystem]]
                 */
                configuration, connectService, sessionPortFactory, messageChannelFactory) {
                    var _this = this;
                    this.configuration = configuration;
                    this.connectService = connectService;
                    this.sessionPortFactory = sessionPortFactory;
                    this.messageChannelFactory = messageChannelFactory;
                    /**
                     * The port which handles communication between this session and the manager session.
                     */
                    this.manager = this.createSessionPort('argon:manager');
                    /**
                     * An event that is raised when an error occurs.
                     */
                    this.errorEvent = new utils_1.Event();
                    this._connectEvent = new utils_1.Event();
                    this._managedSessions = [];
                    this.errorEvent.addEventListener(function (error) {
                        if (_this.errorEvent.numberOfListeners === 1) console.error(error);
                    });
                    this.manager.errorEvent.addEventListener(function (error) {
                        _this.errorEvent.raiseEvent(error);
                    });
                    Object.freeze(this);
                }
                Object.defineProperty(SessionService.prototype, "connectEvent", {
                    /**
                     * An event that is raised when a managed session is opened.
                     */
                    get: function () {
                        return this._connectEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(SessionService.prototype, "managedSessions", {
                    /**
                     * Manager-only. A collection of ports for the sessions managed by this session.
                     */
                    get: function () {
                        this.ensureIsRealityManager();
                        return this._managedSessions;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Establishes a connection with the [[REALITY_MANAGER]].
                 * Called internally by the composition root ([[ArgonSystem]]).
                 */
                SessionService.prototype.connect = function () {
                    if (this.connectService && this.connectService.connect) {
                        this.connectService.connect(this);
                    } else {
                        console.warn('Argon: Unable to connect to a manager session; a connect service is not available');
                    }
                };
                /**
                 * Manager-only. Creates a [[SessionPort]] that is managed by the current [[ArgonSystem]].
                 * Session ports that are managed will automatically forward open events to
                 * [[SessionService#sessionConnectEvent]] and error events to [[SessionService#errorEvent]].
                 * Other services that are part of the current [[ArgonSystem]] are likely to
                 * add message handlers to a newly connected [[SessionPort]].
                 * @return a new [[SessionPort]] instance
                 */
                SessionService.prototype.addManagedSessionPort = function (uri) {
                    var _this = this;
                    this.ensureIsRealityManager();
                    var session = this.sessionPortFactory.create(uri);
                    session.errorEvent.addEventListener(function (error) {
                        _this.errorEvent.raiseEvent(error);
                    });
                    session.connectEvent.addEventListener(function () {
                        _this.managedSessions.push(session);
                        _this.connectEvent.raiseEvent(session);
                    });
                    session.closeEvent.addEventListener(function () {
                        var index = _this.managedSessions.indexOf(session);
                        if (index > -1) _this.managedSessions.splice(index, 1);
                    });
                    return session;
                };
                /**
                 * Creates a [[SessionPort]] that is not managed by the current [[ArgonSystem]].
                 * Unmanaged session ports will not forward open events or error events
                 * to this [[ArgonSystem]].
                 * @return a new SessionPort instance
                 */
                SessionService.prototype.createSessionPort = function (uri) {
                    return this.sessionPortFactory.create(uri);
                };
                /**
                 * Creates a message channel which asyncrhonously sends and receives messages.
                 */
                SessionService.prototype.createMessageChannel = function () {
                    return this.messageChannelFactory.create();
                };
                /**
                 * Creates a message channel which syncrhonously sends and receives messages.
                 */
                SessionService.prototype.createSynchronousMessageChannel = function () {
                    return this.messageChannelFactory.createSynchronous();
                };
                Object.defineProperty(SessionService.prototype, "isRealityManager", {
                    /**
                     * Returns true if this system represents a [[REALITY_MANAGER]]
                     */
                    get: function () {
                        return this.configuration.role === common_1.Role.REALITY_MANAGER || this.configuration.role === common_1.Role.MANAGER; // TODO: phase out of using Role.MANAGER enum
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SessionService.prototype, "isRealityAugmenter", {
                    /**
                     * Returns true if this system represents a [[REALITY_AUGMENTOR]], meaning,
                     * it is running within a [[REALITY_MANAGER]]
                     */
                    get: function () {
                        return this.configuration.role === common_1.Role.REALITY_AUGMENTOR || this.configuration.role === common_1.Role.APPLICATION; // TODO: phase out use of Role.APPLICATION
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SessionService.prototype, "isRealityView", {
                    /**
                     * Returns true if this system is a [[REALITY_VIEW]]
                     */
                    get: function () {
                        return this.configuration.role === common_1.Role.REALITY_VIEW;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SessionService.prototype, "isManager", {
                    /**
                     * @private
                     */
                    get: function () {
                        console.warn("Deprecated. Use isRealityManager()");return this.isManager;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SessionService.prototype, "isApplication", {
                    /**
                     * @private
                     */
                    get: function () {
                        console.warn("Deprecated. Use isRealityAugmenter()");return this.isRealityAugmenter;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Throws an error if this system is not a [[REALITY_MANAGER]]
                 */
                SessionService.prototype.ensureIsRealityManager = function () {
                    if (!this.isRealityManager) throw new Error('An reality-manager only API was accessed from a non reality-manager.');
                };
                /**
                 * Throws an error if this session is not a [[REALITY_VIEW]]
                 */
                SessionService.prototype.ensureIsRealityView = function () {
                    if (!this.isRealityView) throw new Error('An reality-view only API was accessed from a non reality-view.');
                };
                /**
                 * Throws an error if this session is a [[REALITY_VIEW]]
                 */
                SessionService.prototype.ensureNotRealityView = function () {
                    if (this.isRealityView) throw new Error('An non-permitted API was accessed from a reality-view.');
                };
                SessionService = __decorate([aurelia_dependency_injection_1.inject('config', ConnectService, SessionPortFactory, utils_1.MessageChannelFactory)], SessionService);
                return SessionService;
            }();
            exports_1("SessionService", SessionService);
            /**
             * Connect the current [[ArgonSystem]] to itself as the [[REALITY_MANAGER]].
             */
            LoopbackConnectService = function (_super) {
                __extends(LoopbackConnectService, _super);
                function LoopbackConnectService() {
                    _super.apply(this, arguments);
                }
                /**
                 * Create a loopback connection.
                 */
                LoopbackConnectService.prototype.connect = function (sessionService) {
                    var messageChannel = sessionService.createSynchronousMessageChannel();
                    var messagePort = messageChannel.port1;
                    messageChannel.port2.onmessage = function (evt) {
                        messageChannel.port2.postMessage(evt.data);
                    };
                    sessionService.manager.connectEvent.addEventListener(function () {
                        sessionService.connectEvent.raiseEvent(sessionService.manager);
                    });
                    sessionService.manager.open(messagePort, sessionService.configuration);
                };
                return LoopbackConnectService;
            }(ConnectService);
            exports_1("LoopbackConnectService", LoopbackConnectService);
            /**
             * Connect this [[ArgonSystem]] to the [[REALITY_MANAGER]] via the parent document
             * (assuming this system is running in an iFrame).
             */
            DOMConnectService = function (_super) {
                __extends(DOMConnectService, _super);
                function DOMConnectService() {
                    _super.apply(this, arguments);
                }
                /**
                  * Check whether this connect method is available or not.
                  */
                DOMConnectService.isAvailable = function () {
                    return typeof window !== 'undefined' && typeof window.parent !== 'undefined';
                };
                /**
                 * Connect to the manager.
                 */
                DOMConnectService.prototype.connect = function (sessionService) {
                    var messageChannel = sessionService.createMessageChannel();
                    window.parent.postMessage({ type: 'ARGON_SESSION' }, '*', [messageChannel.port1]);
                    sessionService.manager.open(messageChannel.port2, sessionService.configuration);
                };
                return DOMConnectService;
            }(ConnectService);
            exports_1("DOMConnectService", DOMConnectService);
            /**
             * Connect this system to a remote manager for debugging.
             */
            DebugConnectService = function (_super) {
                __extends(DebugConnectService, _super);
                function DebugConnectService() {
                    _super.apply(this, arguments);
                }
                /**
                 * Check whether this connect method is available or not.
                 */
                DebugConnectService.isAvailable = function () {
                    return typeof window !== 'undefined' && !!window['__ARGON_DEBUG_PORT__'];
                };
                /**
                 * Connect to the manager.
                 */
                DebugConnectService.prototype.connect = function (_a) {
                    var manager = _a.manager,
                        configuration = _a.configuration;
                    manager.open(window['__ARGON_DEBUG_PORT__'], configuration);
                };
                return DebugConnectService;
            }(ConnectService);
            exports_1("DebugConnectService", DebugConnectService);
            /**
             * A service which connects this system to the [[REALITY_MANAGER]] via a WKWebview message handler.
             */
            WKWebViewConnectService = function (_super) {
                __extends(WKWebViewConnectService, _super);
                function WKWebViewConnectService() {
                    _super.apply(this, arguments);
                }
                /**
                 * Check whether this connect method is available or not.
                 */
                WKWebViewConnectService.isAvailable = function () {
                    return typeof window !== 'undefined' && window['webkit'] && window['webkit'].messageHandlers;
                };
                /**
                 * Connect to the manager.
                 */
                WKWebViewConnectService.prototype.connect = function (sessionService) {
                    var messageChannel = sessionService.createSynchronousMessageChannel();
                    messageChannel.port2.onmessage = function (event) {
                        webkit.messageHandlers.argon.postMessage(JSON.stringify(event.data));
                    };
                    window['__ARGON_PORT__'] = messageChannel.port2;
                    sessionService.manager.open(messageChannel.port1, sessionService.configuration);
                    window.addEventListener("beforeunload", function () {
                        sessionService.manager.close();
                    });
                };
                return WKWebViewConnectService;
            }(ConnectService);
            exports_1("WKWebViewConnectService", WKWebViewConnectService);
        }
    };
});
$__System.register('11', ['c', 'a', 'f', '14', '10', '12'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, common_1, focus_1, session_1, utils_1;
    var RealityLoader, RealityZoomState, RealityService;
    return {
        setters: [function (aurelia_dependency_injection_1_1) {
            aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
        }, function (cesium_imports_1_1) {
            cesium_imports_1 = cesium_imports_1_1;
        }, function (common_1_1) {
            common_1 = common_1_1;
        }, function (focus_1_1) {
            focus_1 = focus_1_1;
        }, function (session_1_1) {
            session_1 = session_1_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }],
        execute: function () {
            /**
             * Abstract class for a reality setup handler
             */
            RealityLoader = function () {
                function RealityLoader() {}
                return RealityLoader;
            }();
            exports_1("RealityLoader", RealityLoader);
            (function (RealityZoomState) {
                RealityZoomState[RealityZoomState["OTHER"] = 0] = "OTHER";
                RealityZoomState[RealityZoomState["START"] = 1] = "START";
                RealityZoomState[RealityZoomState["CHANGE"] = 2] = "CHANGE";
                RealityZoomState[RealityZoomState["END"] = 3] = "END";
            })(RealityZoomState || (RealityZoomState = {}));
            exports_1("RealityZoomState", RealityZoomState);
            /**
            * A service which manages the reality view.
            * For an app developer, the RealityService instance can be used to
            * set preferences which can affect how the manager selects a reality view.
            */
            RealityService = function () {
                function RealityService(sessionService, focusService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.focusService = focusService;
                    /**
                     * A collection of known reality views from which the reality service can select.
                     */
                    this.realities = new Array();
                    /**
                     * An event that is raised when a reality control port is opened.
                     */
                    this.connectEvent = new utils_1.Event();
                    /**
                     * Manager-only. An event that is raised when the current reality is changed.
                     */
                    this._changeEvent = new utils_1.Event();
                    /**
                     * Manager-only. An event that is raised when the current reality emits the next frame state.
                     * This event contains pose updates for the entities that are managed by
                     * the current reality.
                     */
                    this._frameEvent = new utils_1.Event();
                    /**
                     * Manager-only. A map from a managed session to the desired reality
                     */
                    this.desiredRealityMap = new WeakMap();
                    /**
                     * Manager-only. A map from a desired reality to the session which requested it
                     */
                    this.desiredRealityMapInverse = new WeakMap();
                    /**
                     * Manager-only. An event that is raised when a session changes it's desired reality.
                     */
                    this.sessionDesiredRealityChangeEvent = new utils_1.Event();
                    // RealitySetupHandlers
                    this._loaders = [];
                    this._defaultFov = Math.PI / 2;
                    this._scratchFrustum = new cesium_imports_1.PerspectiveFrustum();
                    this._scratchArray = new Array();
                    this._loadID = -1;
                    if (sessionService.isRealityManager) {
                        sessionService.manager.connectEvent.addEventListener(function () {
                            setTimeout(function () {
                                if (_this._loadID === -1) _this._setNextReality(_this.onSelectReality());
                            });
                        });
                    }
                    sessionService.connectEvent.addEventListener(function (session) {
                        if (session.info.role !== common_1.Role.REALITY_VIEW) {
                            session.on['ar.reality.desired'] = function (message) {
                                var reality = message.reality;
                                var previous = _this.desiredRealityMap.get(session);
                                console.log('Session set desired reality: ' + JSON.stringify(reality));
                                if (reality) {
                                    if (reality['type']) {
                                        var type = reality['type'];
                                        reality.uri = reality.uri || 'reality:' + type;
                                        if (type === 'hosted') reality.uri = reality['url'];
                                        if (!reality.title && reality['name']) reality.title = reality['name'];
                                    }
                                    if (_this.isSupported(reality)) {
                                        _this.desiredRealityMap.set(session, reality);
                                        _this.desiredRealityMapInverse.set(reality, session);
                                    } else {
                                        session.sendError({ message: 'Reality of type "' + reality.uri + '" is not available on this platform' });
                                        return;
                                    }
                                } else {
                                    _this.desiredRealityMap.delete(session);
                                }
                                _this._setNextReality(_this.onSelectReality());
                                _this.sessionDesiredRealityChangeEvent.raiseEvent({ session: session, previous: previous, current: reality });
                            };
                        }
                    });
                    sessionService.manager.on['ar.reality.connect'] = function (_a) {
                        var id = _a.id;
                        var realityControlSession = _this.sessionService.createSessionPort();
                        var messageChannel = _this.sessionService.createSynchronousMessageChannel();
                        var ROUTE_MESSAGE_KEY = 'ar.reality.message.route.' + id;
                        var SEND_MESSAGE_KEY = 'ar.reality.message.send.' + id;
                        var CLOSE_SESSION_KEY = 'ar.reality.close.' + id;
                        messageChannel.port1.onmessage = function (msg) {
                            _this.sessionService.manager.send(ROUTE_MESSAGE_KEY, msg.data);
                        };
                        _this.sessionService.manager.on[SEND_MESSAGE_KEY] = function (message) {
                            messageChannel.port1.postMessage(message);
                        };
                        _this.sessionService.manager.on[CLOSE_SESSION_KEY] = function () {
                            realityControlSession.close();
                        };
                        realityControlSession.connectEvent.addEventListener(function () {
                            _this.connectEvent.raiseEvent(realityControlSession);
                        });
                        _this.sessionService.manager.closeEvent.addEventListener(function () {
                            realityControlSession.close();
                            delete _this.sessionService.manager.on[SEND_MESSAGE_KEY];
                            delete _this.sessionService.manager.on[CLOSE_SESSION_KEY];
                        });
                        realityControlSession.open(messageChannel.port2, _this.sessionService.configuration);
                    };
                    sessionService.manager.on['ar.reality.zoom'] = function (data) {
                        _this.zoom(data);
                    };
                }
                Object.defineProperty(RealityService.prototype, "changeEvent", {
                    get: function () {
                        this.sessionService.ensureIsRealityManager();
                        return this._changeEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RealityService.prototype, "frameEvent", {
                    get: function () {
                        this.sessionService.ensureIsRealityManager();
                        return this._frameEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Set the default reality.
                 */
                RealityService.prototype.setDefault = function (reality) {
                    this._default = reality;
                };
                /**
                 * Manager-only. Register a reality loader
                 */
                RealityService.prototype.registerLoader = function (handler) {
                    this.sessionService.ensureIsRealityManager();
                    this._loaders.push(handler);
                };
                /**
                 * Manager-only. Get the current reality view.
                 * @deprecated. Use app.context.getCurrentReality()
                 */
                RealityService.prototype.getCurrent = function () {
                    this.sessionService.ensureIsRealityManager();
                    return this._current;
                };
                /**
                * Manager-only. Check if a type of reality is supported.
                * @param type reality type
                * @return true if a handler exists and false otherwise
                */
                RealityService.prototype.isSupported = function (reality) {
                    this.sessionService.ensureIsRealityManager();
                    return !!this._getLoader(reality);
                };
                /**
                 * Reality-only. Publish the next frame state.
                 */
                RealityService.prototype.publishFrame = function (state) {
                    this.sessionService.ensureIsRealityView();
                    if (this.sessionService.manager.isConnected) {
                        this.sessionService.manager.send('ar.reality.frameState', state);
                    }
                };
                /**
                 * Set the desired reality.
                 */
                RealityService.prototype.setDesired = function (reality) {
                    this.sessionService.ensureNotRealityView();
                    this._desired = reality;
                    if (this.sessionService.isRealityManager) {
                        this._setNextReality(reality, true);
                    } else {
                        this.sessionService.manager.send('ar.reality.desired', { reality: reality });
                    }
                };
                /**
                 * Get the desired reality
                 */
                RealityService.prototype.getDesired = function () {
                    return this._desired;
                };
                /**
                 * Set the optional reference frames for this app
                 */
                RealityService.prototype.setOptionalReferenceFrames = function (referenceFrames) {};
                /**
                 * Set the optional reference frames for this app
                 */
                RealityService.prototype.setRequiredReferenceFrames = function (referenceFrames) {};
                /**
                 * Set a desired fov in radians.
                 */
                RealityService.prototype.setDesiredFov = function (fov) {
                    this._desiredFov = fov;
                    this.zoom({ fov: fov || this._defaultFov, zoom: 1, state: RealityZoomState.OTHER });
                };
                /**
                 * Get the desired fov in radians
                 */
                RealityService.prototype.getDesiredFov = function () {
                    return this._desiredFov;
                };
                /**
                 * Set the default fov in radians, and adjust the desired fov to match the
                 * previous desired / default ratio.
                 */
                RealityService.prototype.setDefaultFov = function (fov) {
                    if (cesium_imports_1.defined(this._desiredFov)) {
                        var ratio = this._desiredFov / this._defaultFov;
                        this.setDesiredFov(fov * ratio);
                    }
                    this._defaultFov = fov;
                };
                /**
                 * Get the default fov in radians
                 */
                RealityService.prototype.getDefaultFov = function () {
                    return this._defaultFov;
                };
                /**
                 * Returns a maximum viewport
                 */
                RealityService.prototype.getMaximumViewport = function () {
                    if (typeof document !== 'undefined' && document.documentElement) {
                        return {
                            x: 0,
                            y: 0,
                            width: document.documentElement.clientWidth,
                            height: document.documentElement.clientHeight
                        };
                    }
                    throw new Error("Not implemeneted for the current platform");
                };
                /**
                * Manager-only. Selects the best reality based on the realites
                * requested by all managed sessions. Can be overriden for customized selection.
                *
                * @returns The reality chosen for this context. May be undefined if no
                * realities have been requested.
                */
                RealityService.prototype.onSelectReality = function () {
                    this.sessionService.ensureIsRealityManager();
                    var selectedReality = this.desiredRealityMap.get(this.sessionService.manager);
                    if (!selectedReality) {
                        var focusSession = this.focusService.getSession();
                        if (focusSession && focusSession.isConnected) {
                            selectedReality = this.desiredRealityMap.get(focusSession);
                        }
                    }
                    if (!selectedReality) {
                        // TODO: sort and select based on some kind of ranking system
                        for (var _i = 0, _a = this.sessionService.managedSessions; _i < _a.length; _i++) {
                            var session = _a[_i];
                            if (!session.isConnected) continue;
                            var desiredReality = this.desiredRealityMap.get(session);
                            if (desiredReality && this.isSupported(desiredReality)) {
                                selectedReality = desiredReality;
                                break;
                            }
                        }
                    }
                    return selectedReality;
                };
                RealityService.prototype.onGenerateViewFromEyeParameters = function (eye) {
                    var fov = eye.fov || this._desiredFov || this._defaultFov;
                    var viewport = eye.viewport || this.getMaximumViewport();
                    var aspectRatio = eye.aspect || viewport.width / viewport.height;
                    this._scratchFrustum.fov = fov;
                    this._scratchFrustum.aspectRatio = aspectRatio;
                    this._scratchFrustum.near = 0.01;
                    this._scratchFrustum.far = 10000000;
                    return {
                        viewport: viewport,
                        pose: eye.pose,
                        subviews: [{
                            type: common_1.SubviewType.SINGULAR,
                            frustum: {
                                fov: fov,
                                aspectRatio: aspectRatio
                            },
                            // TODO: remove this later  
                            projectionMatrix: cesium_imports_1.Matrix4.toArray(this._scratchFrustum.projectionMatrix, this._scratchArray)
                        }]
                    };
                };
                RealityService.prototype.zoom = function (data) {
                    data.naturalFov = data.naturalFov || this._defaultFov;
                    if (this._realitySession && this._realitySession.info['reality.handlesZoom']) {
                        this._realitySession.send('ar.reality.zoom', data);
                    } else {
                        var fov = this._desiredFov = this.onZoom(data);
                        if (this.sessionService.isRealityView) {
                            this.sessionService.manager.send('ar.reality.desiredFov', { fov: fov });
                        }
                    }
                };
                RealityService.prototype.onZoom = function (data) {
                    var newFov = 2 * Math.atan(Math.tan(data.fov * 0.5) / data.zoom);
                    newFov = Math.max(10 * cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE, Math.min(newFov, 160 * cesium_imports_1.CesiumMath.RADIANS_PER_DEGREE));
                    if (data.state === RealityZoomState.END && Math.abs(newFov - data.naturalFov) < 0.05 /* +-6deg */) {
                            newFov = data.naturalFov;
                        }
                    return newFov;
                };
                RealityService.prototype._setNextReality = function (reality, force) {
                    var _this = this;
                    if (force === void 0) {
                        force = false;
                    }
                    if (this._current && reality && this._current === reality && !force) return;
                    if (this._current && !reality && this._realitySession) return;
                    if (!this._current && !cesium_imports_1.defined(reality)) {
                        reality = this._default;
                    }
                    if (cesium_imports_1.defined(reality)) {
                        if (!this.isSupported(reality)) {
                            this.sessionService.errorEvent.raiseEvent(new Error('Reality of type "' + reality.uri + '" is not available on this platform'));
                            return;
                        }
                        var loadID_1 = ++this._loadID;
                        this._executeRealityLoader(reality, function (realitySession) {
                            if (realitySession.isConnected) throw new Error('Expected an unconnected session');
                            if (loadID_1 !== _this._loadID) {
                                realitySession.close();
                                return;
                            }
                            var previousRealitySession = _this._realitySession;
                            _this._realitySession = realitySession;
                            _this._setCurrent(reality);
                            realitySession.on['ar.reality.frameState'] = function (serializedState) {
                                var state = serializedState;
                                if (!cesium_imports_1.defined(serializedState.view)) {
                                    if (!cesium_imports_1.defined(serializedState.eye)) throw new Error("Unable to construct view configuration: missing eye parameters");
                                    state.view = _this.onGenerateViewFromEyeParameters(serializedState.eye);
                                    state.eye = undefined;
                                    state.entities = serializedState.entities || {};
                                }
                                state.reality = _this.getCurrent();
                                _this.frameEvent.raiseEvent(state);
                            };
                            realitySession.on['ar.reality.desiredFov'] = function (state) {
                                _this._desiredFov = state.fov;
                            };
                            realitySession.closeEvent.addEventListener(function () {
                                console.log('Reality session closed: ' + JSON.stringify(reality));
                                // select a new reality if the current reality has closed without 
                                // another reality having been requested
                                if (_this._loadID === loadID_1) {
                                    _this._realitySession = undefined;
                                    _this._current = undefined;
                                    _this._setNextReality(_this.onSelectReality());
                                }
                            });
                            realitySession.connectEvent.addEventListener(function () {
                                if (realitySession.info.role !== common_1.Role.REALITY_VIEW) {
                                    realitySession.sendError({ message: "Expected a reality session" });
                                    realitySession.close();
                                    throw new Error('The application "' + realitySession.uri + '" does not support being loaded as a reality');
                                }
                                if (previousRealitySession) {
                                    previousRealitySession.close();
                                }
                                if (realitySession.info['reality.supportsControlPort']) {
                                    var ownerSession_1 = _this.desiredRealityMapInverse.get(reality) || _this.sessionService.manager;
                                    var id = cesium_imports_1.createGuid();
                                    var ROUTE_MESSAGE_KEY = 'ar.reality.message.route.' + id;
                                    var SEND_MESSAGE_KEY_1 = 'ar.reality.message.send.' + id;
                                    var CLOSE_SESSION_KEY_1 = 'ar.reality.close.' + id;
                                    realitySession.on[ROUTE_MESSAGE_KEY] = function (message) {
                                        ownerSession_1.send(SEND_MESSAGE_KEY_1, message);
                                    };
                                    ownerSession_1.on[ROUTE_MESSAGE_KEY] = function (message) {
                                        realitySession.send(SEND_MESSAGE_KEY_1, message);
                                    };
                                    realitySession.send('ar.reality.connect', { id: id });
                                    ownerSession_1.send('ar.reality.connect', { id: id });
                                    realitySession.closeEvent.addEventListener(function () {
                                        ownerSession_1.send(CLOSE_SESSION_KEY_1);
                                    });
                                    ownerSession_1.closeEvent.addEventListener(function () {
                                        realitySession.send(CLOSE_SESSION_KEY_1);
                                        realitySession.close();
                                    });
                                }
                            });
                        });
                    }
                };
                RealityService.prototype._getLoader = function (reality) {
                    var found;
                    for (var _i = 0, _a = this._loaders; _i < _a.length; _i++) {
                        var loader = _a[_i];
                        if (loader.type === common_1.RealityView.getType(reality)) {
                            found = loader;
                            break;
                        }
                    }
                    return found;
                };
                RealityService.prototype._setCurrent = function (reality) {
                    if (this._current === undefined || this._current !== reality) {
                        var previous = this._current;
                        this._current = reality;
                        this.changeEvent.raiseEvent({ previous: previous, current: reality });
                        console.log('Reality changed to: ' + JSON.stringify(reality));
                    }
                };
                RealityService.prototype._executeRealityLoader = function (reality, callback) {
                    this.sessionService.ensureIsRealityManager();
                    var loader = this._getLoader(reality);
                    if (!loader) throw new Error('Unable to setup unsupported reality type: ' + reality.uri);
                    loader.load(reality, callback);
                };
                RealityService = __decorate([aurelia_dependency_injection_1.inject(session_1.SessionService, focus_1.FocusService)], RealityService);
                return RealityService;
            }();
            exports_1("RealityService", RealityService);
        }
    };
});
$__System.register('17', ['c', 'a', '10', 'b', '12', '14', '11'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, cesium_imports_1, session_1, context_2, utils_1, focus_1, reality_1;
    var argonContainer, argonContainerPromise, ViewService, PinchZoomService;
    return {
        setters: [function (aurelia_dependency_injection_1_1) {
            aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
        }, function (cesium_imports_1_1) {
            cesium_imports_1 = cesium_imports_1_1;
        }, function (session_1_1) {
            session_1 = session_1_1;
        }, function (context_2_1) {
            context_2 = context_2_1;
        }, function (utils_1_1) {
            utils_1 = utils_1_1;
        }, function (focus_1_1) {
            focus_1 = focus_1_1;
        }, function (reality_1_1) {
            reality_1 = reality_1_1;
        }],
        execute: function () {
            // setup our DOM environment
            if (typeof document !== 'undefined' && document.createElement) {
                var viewportMetaTag = document.querySelector('meta[name=viewport]');
                if (!viewportMetaTag) viewportMetaTag = document.createElement('meta');
                viewportMetaTag.name = 'viewport';
                viewportMetaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
                document.head.appendChild(viewportMetaTag);
                var argonMetaTag = document.querySelector('meta[name=argon]');
                if (!argonMetaTag) argonMetaTag = document.createElement('meta');
                argonMetaTag.name = 'argon';
                document.head.appendChild(argonMetaTag);
                argonContainerPromise = new Promise(function (resolve) {
                    var resolveArgonContainer = function () {
                        var container = document.querySelector('#argon');
                        if (!container) container = document.createElement('div');
                        container.id = 'argon';
                        container.classList.add('argon-view');
                        document.body.appendChild(container);
                        argonContainer = container;
                        resolve(container);
                    };
                    if (document.readyState == 'loading') {
                        document.addEventListener('DOMContentLoaded', resolveArgonContainer);
                    } else {
                        resolveArgonContainer();
                    }
                });
                var style = document.createElement("style");
                style.type = 'text/css';
                document.head.insertBefore(style, document.head.firstChild);
                var sheet = style.sheet;
                sheet.insertRule("\n        #argon {\n            position: fixed;\n            left: 0px;\n            bottom: 0px;\n            width: 100%;\n            height: 100%;\n            margin: 0;\n            border: 0;\n            padding: 0;\n        }\n    ", 0);
                sheet.insertRule("\n        .argon-view > * {\n            position: absolute;\n            pointer-events: none;\n        }\n    ", 1);
            }
            /**
             * Manages the view state
             */
            ViewService = function () {
                function ViewService(containerElement, sessionService, focusService, contextService) {
                    var _this = this;
                    this.sessionService = sessionService;
                    this.focusService = focusService;
                    this.contextService = contextService;
                    /**
                     * An event that is raised when the root viewport has changed
                     */
                    this.viewportChangeEvent = new utils_1.Event();
                    /**
                     * An event that is raised when ownership of the view has been acquired by this application
                     */
                    this.acquireEvent = new utils_1.Event();
                    /**
                     * An event that is raised when ownership of the view has been released from this application
                    */
                    this.releaseEvent = new utils_1.Event();
                    /**
                     *  Manager-only. A map of sessions to their desired viewports.
                     */
                    this.desiredViewportMap = new WeakMap();
                    this._subviews = [];
                    this._subviewEntities = [];
                    this._frustums = [];
                    if (typeof document !== 'undefined' && document.createElement) {
                        var element_1 = this.element = document.createElement('div');
                        element_1.style.width = '100%';
                        element_1.style.height = '100%';
                        element_1.classList.add('argon-view');
                        this.containingElementPromise = new Promise(function (resolve) {
                            if (containerElement && containerElement instanceof HTMLElement) {
                                containerElement.insertBefore(element_1, containerElement.firstChild);
                                resolve(containerElement);
                            } else {
                                argonContainer = document.querySelector('#argon');
                                if (argonContainer) {
                                    argonContainer.insertBefore(element_1, argonContainer.firstChild);
                                    resolve(argonContainer);
                                } else {
                                    argonContainerPromise.then(function (argonContainer) {
                                        argonContainer.insertBefore(element_1, argonContainer.firstChild);
                                        resolve(argonContainer);
                                    });
                                }
                                _this.focusService.focusEvent.addEventListener(function () {
                                    argonContainerPromise.then(function (argonContainer) {
                                        argonContainer.classList.remove('argon-no-focus');
                                        argonContainer.classList.add('argon-focus');
                                    });
                                });
                                _this.focusService.blurEvent.addEventListener(function () {
                                    argonContainerPromise.then(function (argonContainer) {
                                        argonContainer.classList.remove('argon-focus');
                                        argonContainer.classList.add('argon-no-focus');
                                    });
                                });
                            }
                        });
                    }
                    if (this.sessionService.isRealityManager) {
                        this.sessionService.connectEvent.addEventListener(function (session) {
                            session.on['ar.viewport.desired'] = function (viewport) {
                                _this.desiredViewportMap.set(session, viewport);
                            };
                        });
                    }
                    this.contextService.renderEvent.addEventListener(function () {
                        var state = _this.contextService.serializedFrameState;
                        var subviewEntities = _this._subviewEntities;
                        subviewEntities.length = 0;
                        state.view.subviews.forEach(function (subview, index) {
                            var id = 'ar.view_' + index;
                            state.entities[id] = subview.pose || state.view.pose;
                            _this.contextService.updateEntityFromFrameState(id, state);
                            delete state.entities[id];
                            subviewEntities[index] = _this.contextService.entities.getById(id);
                        });
                        _this._update();
                    });
                }
                ViewService.prototype.getSubviews = function (referenceFrame) {
                    var _this = this;
                    this._update();
                    var subviews = this._subviews;
                    subviews.length = this._current.subviews.length;
                    this._current.subviews.forEach(function (serializedSubview, index) {
                        var subviewEntity = _this._subviewEntities[index];
                        var subview = subviews[index] = subviews[index] || {};
                        subview.index = index;
                        subview.type = serializedSubview.type;
                        subview.pose = _this.contextService.getEntityPose(subviewEntity, referenceFrame);
                        subview.viewport = serializedSubview.viewport || _this._current.viewport;
                        subview.frustum = _this._frustums[index];
                        if (!subview.frustum) {
                            subview.frustum = _this._frustums[index] = new cesium_imports_1.PerspectiveFrustum();
                            subview.frustum.near = 0.01;
                            subview.frustum.far = 10000000;
                        }
                        subview.frustum.fov = serializedSubview.frustum.fov;
                        subview.frustum.aspectRatio = serializedSubview.frustum.aspectRatio || subview.viewport.width / subview.viewport.height;
                        subview.frustum.xOffset = serializedSubview.frustum.xOffset || 0;
                        subview.frustum.yOffset = serializedSubview.frustum.yOffset || 0;
                        subview.projectionMatrix = serializedSubview.projectionMatrix || subview.frustum.infiniteProjectionMatrix;
                    });
                    return subviews;
                };
                ViewService.prototype.getViewport = function () {
                    return this._current.viewport;
                };
                /**
                 * Set the desired root viewport
                 */
                ViewService.prototype.setDesiredViewport = function (viewport) {
                    this.sessionService.manager.send('ar.view.desiredViewport', viewport);
                };
                /**
                 * Request control over the view.
                 * The manager is likely to reject this request if this application is not in focus.
                 * When running on an HMD, this request will always fail. If the current reality view
                 * does not support custom views, this request will fail. The manager may revoke
                 * ownership at any time (even without this application calling releaseOwnership)
                 */
                ViewService.prototype.requestOwnership = function () {};
                /**
                 * Release control over the view.
                 */
                ViewService.prototype.releaseOwnership = function () {};
                /**
                 * Returns true if this application has control over the view.
                 */
                ViewService.prototype.isOwner = function () {};
                // Updates the element, if necessary, and raise a view change event
                ViewService.prototype._update = function () {
                    var _this = this;
                    var state = this.contextService.serializedFrameState;
                    if (!state) throw new Error('Expected state to be defined');
                    var view = state.view;
                    var viewportJSON = JSON.stringify(view.viewport);
                    var previousViewport = this._current && this._current.viewport;
                    this._current = view;
                    if (!this._currentViewportJSON || this._currentViewportJSON !== viewportJSON) {
                        this._currentViewportJSON = viewportJSON;
                        if (this.element) {
                            requestAnimationFrame(function () {
                                var viewport = view.viewport;
                                _this.element.style.left = viewport.x + 'px';
                                _this.element.style.bottom = viewport.y + 'px';
                                _this.element.style.width = viewport.width + 'px';
                                _this.element.style.height = viewport.height + 'px';
                            });
                        }
                        this.viewportChangeEvent.raiseEvent({ previous: previousViewport });
                    }
                };
                ViewService = __decorate([aurelia_dependency_injection_1.inject('containerElement', session_1.SessionService, focus_1.FocusService, context_2.ContextService)], ViewService);
                return ViewService;
            }();
            exports_1("ViewService", ViewService);
            PinchZoomService = function () {
                function PinchZoomService(viewService, realityService, contextService, sessionService) {
                    var _this = this;
                    this.viewService = viewService;
                    this.realityService = realityService;
                    this.contextService = contextService;
                    this.sessionService = sessionService;
                    if (this.sessionService.isRealityManager) {
                        this.viewService.containingElementPromise.then(function (el) {
                            el.style.pointerEvents = 'auto';
                            var fov = -1;
                            if (typeof PointerEvent !== 'undefined') {
                                var evCache_1 = new Array();
                                var startDistSquared_1 = -1;
                                var zoom_1 = 1;
                                var remove_event_1 = function (ev) {
                                    // Remove this event from the target's cache
                                    for (var i = 0; i < evCache_1.length; i++) {
                                        if (evCache_1[i].pointerId == ev.pointerId) {
                                            evCache_1.splice(i, 1);
                                            break;
                                        }
                                    }
                                };
                                var pointerdown_handler = function (ev) {
                                    // The pointerdown event signals the start of a touch interaction.
                                    // This event is cached to support 2-finger gestures
                                    evCache_1.push(ev);
                                };
                                var pointermove_handler = function (ev) {
                                    // This function implements a 2-pointer pinch/zoom gesture. 
                                    // Find this event in the cache and update its record with this event
                                    for (var i = 0; i < evCache_1.length; i++) {
                                        if (ev.pointerId == evCache_1[i].pointerId) {
                                            evCache_1[i] = ev;
                                            break;
                                        }
                                    }
                                    var state = _this.contextService.serializedFrameState;
                                    if (!state) return;
                                    // If two pointers are down, check for pinch gestures
                                    if (evCache_1.length == 2) {
                                        // Calculate the distance between the two pointers
                                        var curDiffX = Math.abs(evCache_1[0].clientX - evCache_1[1].clientX);
                                        var curDiffY = Math.abs(evCache_1[0].clientY - evCache_1[1].clientY);
                                        var currDistSquared = curDiffX * curDiffX + curDiffY * curDiffY;
                                        if (startDistSquared_1 == -1) {
                                            // start pinch
                                            startDistSquared_1 = currDistSquared;
                                            fov = state.view.subviews[0].frustum.fov;
                                            zoom_1 = 1;
                                            _this.realityService.zoom({ zoom: zoom_1, fov: fov, state: reality_1.RealityZoomState.START });
                                        } else {
                                            // change pinch
                                            zoom_1 = currDistSquared / startDistSquared_1;
                                            _this.realityService.zoom({ zoom: zoom_1, fov: fov, state: reality_1.RealityZoomState.CHANGE });
                                        }
                                    } else {
                                        // end pinch                            
                                        _this.realityService.zoom({ zoom: zoom_1, fov: fov, state: reality_1.RealityZoomState.END });
                                        startDistSquared_1 = -1;
                                    }
                                };
                                var pointerup_handler = function (ev) {
                                    // Remove this pointer from the cache
                                    remove_event_1(ev);
                                    // If the number of pointers down is less than two then reset diff tracker
                                    if (evCache_1.length < 2) startDistSquared_1 = -1;
                                };
                                el.onpointerdown = pointerdown_handler;
                                el.onpointermove = pointermove_handler;
                                // Use same handler for pointer{up,cancel,out,leave} events since
                                // the semantics for these events - in this app - are the same.
                                el.onpointerup = pointerup_handler;
                                el.onpointercancel = pointerup_handler;
                                el.onpointerout = pointerup_handler;
                                el.onpointerleave = pointerup_handler;
                            } else {
                                el.addEventListener('gesturestart', function (ev) {
                                    var state = _this.contextService.serializedFrameState;
                                    if (state && state.view.subviews[0]) {
                                        fov = state.view.subviews[0].frustum.fov;
                                        _this.realityService.zoom({ zoom: ev.scale, fov: fov, state: reality_1.RealityZoomState.START });
                                    }
                                });
                                el.addEventListener('gesturechange', function (ev) {
                                    _this.realityService.zoom({ zoom: ev.scale, fov: fov, state: reality_1.RealityZoomState.CHANGE });
                                });
                                el.addEventListener('gestureend', function (ev) {
                                    _this.realityService.zoom({ zoom: ev.scale, fov: fov, state: reality_1.RealityZoomState.END });
                                });
                            }
                        });
                    }
                }
                PinchZoomService = __decorate([aurelia_dependency_injection_1.inject(ViewService, reality_1.RealityService, context_2.ContextService, session_1.SessionService)], PinchZoomService);
                return PinchZoomService;
            }();
            exports_1("PinchZoomService", PinchZoomService);
        }
    };
});
$__System.register('18', ['c', '10', '11', '17'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_dependency_injection_1, session_1, reality_1, view_1;
    var HostedRealityLoader;
    return {
        setters: [function (aurelia_dependency_injection_1_1) {
            aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
        }, function (session_1_1) {
            session_1 = session_1_1;
        }, function (reality_1_1) {
            reality_1 = reality_1_1;
        }, function (view_1_1) {
            view_1 = view_1_1;
        }],
        execute: function () {
            HostedRealityLoader = function (_super) {
                __extends(HostedRealityLoader, _super);
                function HostedRealityLoader(sessionService, viewService) {
                    var _this = this;
                    _super.call(this);
                    this.sessionService = sessionService;
                    this.viewService = viewService;
                    this.type = 'hosted';
                    this.iframeElement = document.createElement('iframe');
                    this.iframeElement.style.border = '0';
                    this.iframeElement.width = '100%';
                    this.iframeElement.height = '100%';
                    viewService.containingElementPromise.then(function (container) {
                        container.insertBefore(_this.iframeElement, container.firstChild);
                    });
                }
                HostedRealityLoader.prototype.load = function (reality, callback) {
                    var _this = this;
                    this.viewService.containingElementPromise.then(function (container) {
                        var handleConnectMessage = function (ev) {
                            if (ev.data.type !== 'ARGON_SESSION') return;
                            var messagePort = ev.ports && ev.ports[0];
                            if (!messagePort) throw new Error('Received an ARGON_SESSION message without a MessagePort object');
                            // get the event.source iframe
                            var i = 0;
                            var frame;
                            while (i < window.frames.length && !frame) {
                                if (window.frames[i] == ev.source) frame = document.getElementsByTagName('iframe')[i];
                            }
                            if (frame !== _this.iframeElement) return;
                            window.removeEventListener('message', handleConnectMessage);
                            var realitySession = _this.sessionService.addManagedSessionPort(reality.uri);
                            callback(realitySession);
                            realitySession.open(messagePort, _this.sessionService.configuration);
                        };
                        window.addEventListener('message', handleConnectMessage);
                        _this.iframeElement.src = '';
                        _this.iframeElement.src = reality.uri;
                        _this.iframeElement.style.pointerEvents = 'auto';
                    });
                };
                HostedRealityLoader = __decorate([aurelia_dependency_injection_1.inject(session_1.SessionService, view_1.ViewService)], HostedRealityLoader);
                return HostedRealityLoader;
            }(reality_1.RealityLoader);
            exports_1("HostedRealityLoader", HostedRealityLoader);
        }
    };
});
// @singleton()
// @inject(SessionFactory)
// export class DOMSessionListenerService {
// 	public sessionEvent = new Event<Session>();
// 	constructor(sessionFactory:SessionFactory) {
// 		window.addEventListener('message', ev => {
// 			if (ev.data.type != 'ARGON_SESSION') return;
// 			const messagePort:MessagePortLike = ev.ports && ev.ports[0];
// 			if (!messagePort) 
// 				throw new Error('Received an ARGON_SESSION message without a MessagePort object');
// 			// get the event.source iframe
// 			let i = 0;
// 			let frame:HTMLIFrameElement = null;
// 			while (i < window.frames.length && frame != null) {
// 				if (window.frames[i] == ev.source)
// 					frame = document.getElementsByTagName( 'iframe' )[i];
// 			}			
// 			const session = sessionFactory.create();
// 			session.frame = frame;
// 			if (frame) frame.addEventListener('load', function close() {
// 				frame.removeEventListener('load', close);
// 				console.log('IFrameSessionHandler: frame load detected, closing current session.', frame, session)
// 				session.close()
// 			});
// 			this.sessionEvent.raiseEvent(session);
// 		});
// 	}
// }
(function() {
var define = $__System.amdDefine;
define("19", ["1a", "1b", "1c", "1d"], function(defined, defineProperties, DeveloperError, Event) {
  'use strict';
  function CallbackProperty(callback, isConstant) {
    this._callback = undefined;
    this._isConstant = undefined;
    this._definitionChanged = new Event();
    this.setCallback(callback, isConstant);
  }
  defineProperties(CallbackProperty.prototype, {
    isConstant: {get: function() {
        return this._isConstant;
      }},
    definitionChanged: {get: function() {
        return this._definitionChanged;
      }}
  });
  CallbackProperty.prototype.getValue = function(time, result) {
    return this._callback(time, result);
  };
  CallbackProperty.prototype.setCallback = function(callback, isConstant) {
    if (!defined(callback)) {
      throw new DeveloperError('callback is required.');
    }
    if (!defined(isConstant)) {
      throw new DeveloperError('isConstant is required.');
    }
    var changed = this._callback !== callback || this._isConstant !== isConstant;
    this._callback = callback;
    this._isConstant = isConstant;
    if (changed) {
      this._definitionChanged.raiseEvent(this);
    }
  };
  CallbackProperty.prototype.equals = function(other) {
    return this === other || (other instanceof CallbackProperty && this._callback === other._callback && this._isConstant === other._isConstant);
  };
  return CallbackProperty;
});

})();
(function() {
var define = $__System.amdDefine;
define("1e", ["1f"], function(freezeObject) {
  'use strict';
  var ClockRange = {
    UNBOUNDED: 0,
    CLAMPED: 1,
    LOOP_STOP: 2
  };
  return freezeObject(ClockRange);
});

})();
(function() {
var define = $__System.amdDefine;
define("20", ["1a"], function(defined) {
  'use strict';
  var getTimestamp;
  if (typeof performance !== 'undefined' && defined(performance.now)) {
    getTimestamp = function() {
      return performance.now();
    };
  } else {
    getTimestamp = function() {
      return Date.now();
    };
  }
  return getTimestamp;
});

})();
(function() {
var define = $__System.amdDefine;
define("21", ["1e", "22", "23", "1a", "1c", "1d", "20", "24"], function(ClockRange, ClockStep, defaultValue, defined, DeveloperError, Event, getTimestamp, JulianDate) {
  'use strict';
  function Clock(options) {
    options = defaultValue(options, defaultValue.EMPTY_OBJECT);
    var startTime = options.startTime;
    var startTimeUndefined = !defined(startTime);
    var stopTime = options.stopTime;
    var stopTimeUndefined = !defined(stopTime);
    var currentTime = options.currentTime;
    var currentTimeUndefined = !defined(currentTime);
    if (startTimeUndefined && stopTimeUndefined && currentTimeUndefined) {
      currentTime = JulianDate.now();
      startTime = JulianDate.clone(currentTime);
      stopTime = JulianDate.addDays(currentTime, 1.0, new JulianDate());
    } else if (startTimeUndefined && stopTimeUndefined) {
      startTime = JulianDate.clone(currentTime);
      stopTime = JulianDate.addDays(currentTime, 1.0, new JulianDate());
    } else if (startTimeUndefined && currentTimeUndefined) {
      startTime = JulianDate.addDays(stopTime, -1.0, new JulianDate());
      currentTime = JulianDate.clone(startTime);
    } else if (currentTimeUndefined && stopTimeUndefined) {
      currentTime = JulianDate.clone(startTime);
      stopTime = JulianDate.addDays(startTime, 1.0, new JulianDate());
    } else if (currentTimeUndefined) {
      currentTime = JulianDate.clone(startTime);
    } else if (stopTimeUndefined) {
      stopTime = JulianDate.addDays(currentTime, 1.0, new JulianDate());
    } else if (startTimeUndefined) {
      startTime = JulianDate.clone(currentTime);
    }
    if (JulianDate.greaterThan(startTime, stopTime)) {
      throw new DeveloperError('startTime must come before stopTime.');
    }
    this.startTime = startTime;
    this.stopTime = stopTime;
    this.currentTime = currentTime;
    this.multiplier = defaultValue(options.multiplier, 1.0);
    this.clockStep = defaultValue(options.clockStep, ClockStep.SYSTEM_CLOCK_MULTIPLIER);
    this.clockRange = defaultValue(options.clockRange, ClockRange.UNBOUNDED);
    this.canAnimate = defaultValue(options.canAnimate, true);
    this.shouldAnimate = defaultValue(options.shouldAnimate, true);
    this.onTick = new Event();
    this._lastSystemTime = getTimestamp();
  }
  Clock.prototype.tick = function() {
    var currentSystemTime = getTimestamp();
    var currentTime = JulianDate.clone(this.currentTime);
    var startTime = this.startTime;
    var stopTime = this.stopTime;
    var multiplier = this.multiplier;
    if (this.canAnimate && this.shouldAnimate) {
      if (this.clockStep === ClockStep.SYSTEM_CLOCK) {
        currentTime = JulianDate.now(currentTime);
      } else {
        if (this.clockStep === ClockStep.TICK_DEPENDENT) {
          currentTime = JulianDate.addSeconds(currentTime, multiplier, currentTime);
        } else {
          var milliseconds = currentSystemTime - this._lastSystemTime;
          currentTime = JulianDate.addSeconds(currentTime, multiplier * (milliseconds / 1000.0), currentTime);
        }
        if (this.clockRange === ClockRange.CLAMPED) {
          if (JulianDate.lessThan(currentTime, startTime)) {
            currentTime = JulianDate.clone(startTime, currentTime);
          } else if (JulianDate.greaterThan(currentTime, stopTime)) {
            currentTime = JulianDate.clone(stopTime, currentTime);
          }
        } else if (this.clockRange === ClockRange.LOOP_STOP) {
          if (JulianDate.lessThan(currentTime, startTime)) {
            currentTime = JulianDate.clone(startTime, currentTime);
          }
          while (JulianDate.greaterThan(currentTime, stopTime)) {
            currentTime = JulianDate.addSeconds(startTime, JulianDate.secondsDifference(currentTime, stopTime), currentTime);
          }
        }
      }
    }
    this.currentTime = currentTime;
    this._lastSystemTime = currentSystemTime;
    this.onTick.raiseEvent(this);
    return currentTime;
  };
  return Clock;
});

})();
(function() {
var define = $__System.amdDefine;
define("22", ["1f"], function(freezeObject) {
  'use strict';
  var ClockStep = {
    TICK_DEPENDENT: 0,
    SYSTEM_CLOCK_MULTIPLIER: 1,
    SYSTEM_CLOCK: 2
  };
  return freezeObject(ClockStep);
});

})();
(function() {
var define = $__System.amdDefine;
define("25", ["26", "1a", "1b", "1c", "27", "28", "29"], function(createGuid, defined, defineProperties, DeveloperError, CesiumMath, Entity, EntityCollection) {
  'use strict';
  var entityOptionsScratch = {id: undefined};
  var entityIdScratch = new Array(2);
  function clean(entity) {
    var propertyNames = entity.propertyNames;
    var propertyNamesLength = propertyNames.length;
    for (var i = 0; i < propertyNamesLength; i++) {
      entity[propertyNames[i]] = undefined;
    }
  }
  function subscribeToEntity(that, eventHash, collectionId, entity) {
    entityIdScratch[0] = collectionId;
    entityIdScratch[1] = entity.id;
    eventHash[JSON.stringify(entityIdScratch)] = entity.definitionChanged.addEventListener(CompositeEntityCollection.prototype._onDefinitionChanged, that);
  }
  function unsubscribeFromEntity(that, eventHash, collectionId, entity) {
    entityIdScratch[0] = collectionId;
    entityIdScratch[1] = entity.id;
    var id = JSON.stringify(entityIdScratch);
    eventHash[id]();
    eventHash[id] = undefined;
  }
  function recomposite(that) {
    that._shouldRecomposite = true;
    if (that._suspendCount !== 0) {
      return;
    }
    var collections = that._collections;
    var collectionsLength = collections.length;
    var collectionsCopy = that._collectionsCopy;
    var collectionsCopyLength = collectionsCopy.length;
    var i;
    var entity;
    var entities;
    var iEntities;
    var collection;
    var composite = that._composite;
    var newEntities = new EntityCollection(that);
    var eventHash = that._eventHash;
    var collectionId;
    for (i = 0; i < collectionsCopyLength; i++) {
      collection = collectionsCopy[i];
      collection.collectionChanged.removeEventListener(CompositeEntityCollection.prototype._onCollectionChanged, that);
      entities = collection.values;
      collectionId = collection.id;
      for (iEntities = entities.length - 1; iEntities > -1; iEntities--) {
        entity = entities[iEntities];
        unsubscribeFromEntity(that, eventHash, collectionId, entity);
      }
    }
    for (i = collectionsLength - 1; i >= 0; i--) {
      collection = collections[i];
      collection.collectionChanged.addEventListener(CompositeEntityCollection.prototype._onCollectionChanged, that);
      entities = collection.values;
      collectionId = collection.id;
      for (iEntities = entities.length - 1; iEntities > -1; iEntities--) {
        entity = entities[iEntities];
        subscribeToEntity(that, eventHash, collectionId, entity);
        var compositeEntity = newEntities.getById(entity.id);
        if (!defined(compositeEntity)) {
          compositeEntity = composite.getById(entity.id);
          if (!defined(compositeEntity)) {
            entityOptionsScratch.id = entity.id;
            compositeEntity = new Entity(entityOptionsScratch);
          } else {
            clean(compositeEntity);
          }
          newEntities.add(compositeEntity);
        }
        compositeEntity.merge(entity);
      }
    }
    that._collectionsCopy = collections.slice(0);
    composite.suspendEvents();
    composite.removeAll();
    var newEntitiesArray = newEntities.values;
    for (i = 0; i < newEntitiesArray.length; i++) {
      composite.add(newEntitiesArray[i]);
    }
    composite.resumeEvents();
  }
  function CompositeEntityCollection(collections, owner) {
    this._owner = owner;
    this._composite = new EntityCollection(this);
    this._suspendCount = 0;
    this._collections = defined(collections) ? collections.slice() : [];
    this._collectionsCopy = [];
    this._id = createGuid();
    this._eventHash = {};
    recomposite(this);
    this._shouldRecomposite = false;
  }
  defineProperties(CompositeEntityCollection.prototype, {
    collectionChanged: {get: function() {
        return this._composite._collectionChanged;
      }},
    id: {get: function() {
        return this._id;
      }},
    values: {get: function() {
        return this._composite.values;
      }},
    owner: {get: function() {
        return this._owner;
      }}
  });
  CompositeEntityCollection.prototype.addCollection = function(collection, index) {
    var hasIndex = defined(index);
    if (!defined(collection)) {
      throw new DeveloperError('collection is required.');
    }
    if (hasIndex) {
      if (index < 0) {
        throw new DeveloperError('index must be greater than or equal to zero.');
      } else if (index > this._collections.length) {
        throw new DeveloperError('index must be less than or equal to the number of collections.');
      }
    }
    if (!hasIndex) {
      index = this._collections.length;
      this._collections.push(collection);
    } else {
      this._collections.splice(index, 0, collection);
    }
    recomposite(this);
  };
  CompositeEntityCollection.prototype.removeCollection = function(collection) {
    var index = this._collections.indexOf(collection);
    if (index !== -1) {
      this._collections.splice(index, 1);
      recomposite(this);
      return true;
    }
    return false;
  };
  CompositeEntityCollection.prototype.removeAllCollections = function() {
    this._collections.length = 0;
    recomposite(this);
  };
  CompositeEntityCollection.prototype.containsCollection = function(collection) {
    return this._collections.indexOf(collection) !== -1;
  };
  CompositeEntityCollection.prototype.contains = function(entity) {
    return this._composite.contains(entity);
  };
  CompositeEntityCollection.prototype.indexOfCollection = function(collection) {
    return this._collections.indexOf(collection);
  };
  CompositeEntityCollection.prototype.getCollection = function(index) {
    if (!defined(index)) {
      throw new DeveloperError('index is required.', 'index');
    }
    return this._collections[index];
  };
  CompositeEntityCollection.prototype.getCollectionsLength = function() {
    return this._collections.length;
  };
  function getCollectionIndex(collections, collection) {
    if (!defined(collection)) {
      throw new DeveloperError('collection is required.');
    }
    var index = collections.indexOf(collection);
    if (index === -1) {
      throw new DeveloperError('collection is not in this composite.');
    }
    return index;
  }
  function swapCollections(composite, i, j) {
    var arr = composite._collections;
    i = CesiumMath.clamp(i, 0, arr.length - 1);
    j = CesiumMath.clamp(j, 0, arr.length - 1);
    if (i === j) {
      return;
    }
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    recomposite(composite);
  }
  CompositeEntityCollection.prototype.raiseCollection = function(collection) {
    var index = getCollectionIndex(this._collections, collection);
    swapCollections(this, index, index + 1);
  };
  CompositeEntityCollection.prototype.lowerCollection = function(collection) {
    var index = getCollectionIndex(this._collections, collection);
    swapCollections(this, index, index - 1);
  };
  CompositeEntityCollection.prototype.raiseCollectionToTop = function(collection) {
    var index = getCollectionIndex(this._collections, collection);
    if (index === this._collections.length - 1) {
      return;
    }
    this._collections.splice(index, 1);
    this._collections.push(collection);
    recomposite(this);
  };
  CompositeEntityCollection.prototype.lowerCollectionToBottom = function(collection) {
    var index = getCollectionIndex(this._collections, collection);
    if (index === 0) {
      return;
    }
    this._collections.splice(index, 1);
    this._collections.splice(0, 0, collection);
    recomposite(this);
  };
  CompositeEntityCollection.prototype.suspendEvents = function() {
    this._suspendCount++;
    this._composite.suspendEvents();
  };
  CompositeEntityCollection.prototype.resumeEvents = function() {
    if (this._suspendCount === 0) {
      throw new DeveloperError('resumeEvents can not be called before suspendEvents.');
    }
    this._suspendCount--;
    if (this._shouldRecomposite && this._suspendCount === 0) {
      recomposite(this);
      this._shouldRecomposite = false;
    }
    this._composite.resumeEvents();
  };
  CompositeEntityCollection.prototype.computeAvailability = function() {
    return this._composite.computeAvailability();
  };
  CompositeEntityCollection.prototype.getById = function(id) {
    return this._composite.getById(id);
  };
  CompositeEntityCollection.prototype._onCollectionChanged = function(collection, added, removed) {
    var collections = this._collectionsCopy;
    var collectionsLength = collections.length;
    var composite = this._composite;
    composite.suspendEvents();
    var i;
    var q;
    var entity;
    var compositeEntity;
    var removedLength = removed.length;
    var eventHash = this._eventHash;
    var collectionId = collection.id;
    for (i = 0; i < removedLength; i++) {
      var removedEntity = removed[i];
      unsubscribeFromEntity(this, eventHash, collectionId, removedEntity);
      var removedId = removedEntity.id;
      for (q = collectionsLength - 1; q >= 0; q--) {
        entity = collections[q].getById(removedId);
        if (defined(entity)) {
          if (!defined(compositeEntity)) {
            compositeEntity = composite.getById(removedId);
            clean(compositeEntity);
          }
          compositeEntity.merge(entity);
        }
      }
      if (!defined(compositeEntity)) {
        composite.removeById(removedId);
      }
      compositeEntity = undefined;
    }
    var addedLength = added.length;
    for (i = 0; i < addedLength; i++) {
      var addedEntity = added[i];
      subscribeToEntity(this, eventHash, collectionId, addedEntity);
      var addedId = addedEntity.id;
      for (q = collectionsLength - 1; q >= 0; q--) {
        entity = collections[q].getById(addedId);
        if (defined(entity)) {
          if (!defined(compositeEntity)) {
            compositeEntity = composite.getById(addedId);
            if (!defined(compositeEntity)) {
              entityOptionsScratch.id = addedId;
              compositeEntity = new Entity(entityOptionsScratch);
              composite.add(compositeEntity);
            } else {
              clean(compositeEntity);
            }
          }
          compositeEntity.merge(entity);
        }
      }
      compositeEntity = undefined;
    }
    composite.resumeEvents();
  };
  CompositeEntityCollection.prototype._onDefinitionChanged = function(entity, propertyName, newValue, oldValue) {
    var collections = this._collections;
    var composite = this._composite;
    var collectionsLength = collections.length;
    var id = entity.id;
    var compositeEntity = composite.getById(id);
    var compositeProperty = compositeEntity[propertyName];
    var newProperty = !defined(compositeProperty);
    var firstTime = true;
    for (var q = collectionsLength - 1; q >= 0; q--) {
      var innerEntity = collections[q].getById(entity.id);
      if (defined(innerEntity)) {
        var property = innerEntity[propertyName];
        if (defined(property)) {
          if (firstTime) {
            firstTime = false;
            if (defined(property.merge) && defined(property.clone)) {
              compositeProperty = property.clone(compositeProperty);
            } else {
              compositeProperty = property;
              break;
            }
          }
          compositeProperty.merge(property);
        }
      }
    }
    if (newProperty && compositeEntity.propertyNames.indexOf(propertyName) === -1) {
      compositeEntity.addProperty(propertyName);
    }
    compositeEntity[propertyName] = compositeProperty;
  };
  return CompositeEntityCollection;
});

})();
(function() {
var define = $__System.amdDefine;
define("2a", ["1a", "1b", "1c"], function(defined, defineProperties, DeveloperError) {
  'use strict';
  function AssociativeArray() {
    this._array = [];
    this._hash = {};
  }
  defineProperties(AssociativeArray.prototype, {
    length: {get: function() {
        return this._array.length;
      }},
    values: {get: function() {
        return this._array;
      }}
  });
  AssociativeArray.prototype.contains = function(key) {
    if (typeof key !== 'string' && typeof key !== 'number') {
      throw new DeveloperError('key is required to be a string or number.');
    }
    return defined(this._hash[key]);
  };
  AssociativeArray.prototype.set = function(key, value) {
    if (typeof key !== 'string' && typeof key !== 'number') {
      throw new DeveloperError('key is required to be a string or number.');
    }
    var oldValue = this._hash[key];
    if (value !== oldValue) {
      this.remove(key);
      this._hash[key] = value;
      this._array.push(value);
    }
  };
  AssociativeArray.prototype.get = function(key) {
    if (typeof key !== 'string' && typeof key !== 'number') {
      throw new DeveloperError('key is required to be a string or number.');
    }
    return this._hash[key];
  };
  AssociativeArray.prototype.remove = function(key) {
    if (defined(key) && typeof key !== 'string' && typeof key !== 'number') {
      throw new DeveloperError('key is required to be a string or number.');
    }
    var value = this._hash[key];
    var hasValue = defined(value);
    if (hasValue) {
      var array = this._array;
      array.splice(array.indexOf(value), 1);
      delete this._hash[key];
    }
    return hasValue;
  };
  AssociativeArray.prototype.removeAll = function() {
    var array = this._array;
    if (array.length > 0) {
      this._hash = {};
      array.length = 0;
    }
  };
  return AssociativeArray;
});

})();
(function() {
var define = $__System.amdDefine;
define("26", [], function() {
  'use strict';
  function createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  return createGuid;
});

})();
(function() {
var define = $__System.amdDefine;
define("2b", ["2c", "23", "1a", "1b", "1c", "1d", "2d", "2e"], function(Cartesian3, defaultValue, defined, defineProperties, DeveloperError, Event, ReferenceFrame, PositionProperty) {
  'use strict';
  function ConstantPositionProperty(value, referenceFrame) {
    this._definitionChanged = new Event();
    this._value = Cartesian3.clone(value);
    this._referenceFrame = defaultValue(referenceFrame, ReferenceFrame.FIXED);
  }
  defineProperties(ConstantPositionProperty.prototype, {
    isConstant: {get: function() {
        return !defined(this._value) || this._referenceFrame === ReferenceFrame.FIXED;
      }},
    definitionChanged: {get: function() {
        return this._definitionChanged;
      }},
    referenceFrame: {get: function() {
        return this._referenceFrame;
      }}
  });
  ConstantPositionProperty.prototype.getValue = function(time, result) {
    return this.getValueInReferenceFrame(time, ReferenceFrame.FIXED, result);
  };
  ConstantPositionProperty.prototype.setValue = function(value, referenceFrame) {
    var definitionChanged = false;
    if (!Cartesian3.equals(this._value, value)) {
      definitionChanged = true;
      this._value = Cartesian3.clone(value);
    }
    if (defined(referenceFrame) && this._referenceFrame !== referenceFrame) {
      definitionChanged = true;
      this._referenceFrame = referenceFrame;
    }
    if (definitionChanged) {
      this._definitionChanged.raiseEvent(this);
    }
  };
  ConstantPositionProperty.prototype.getValueInReferenceFrame = function(time, referenceFrame, result) {
    if (!defined(time)) {
      throw new DeveloperError('time is required.');
    }
    if (!defined(referenceFrame)) {
      throw new DeveloperError('referenceFrame is required.');
    }
    return PositionProperty.convertToReferenceFrame(time, this._value, this._referenceFrame, referenceFrame, result);
  };
  ConstantPositionProperty.prototype.equals = function(other) {
    return this === other || (other instanceof ConstantPositionProperty && Cartesian3.equals(this._value, other._value) && this._referenceFrame === other._referenceFrame);
  };
  return ConstantPositionProperty;
});

})();
(function() {
var define = $__System.amdDefine;
define("2f", ["23", "1a", "1b", "1c", "1d"], function(defaultValue, defined, defineProperties, DeveloperError, Event) {
  'use strict';
  function ConstantProperty(value) {
    this._value = undefined;
    this._hasClone = false;
    this._hasEquals = false;
    this._definitionChanged = new Event();
    this.setValue(value);
  }
  defineProperties(ConstantProperty.prototype, {
    isConstant: {value: true},
    definitionChanged: {get: function() {
        return this._definitionChanged;
      }}
  });
  ConstantProperty.prototype.getValue = function(time, result) {
    return this._hasClone ? this._value.clone(result) : this._value;
  };
  ConstantProperty.prototype.setValue = function(value) {
    var oldValue = this._value;
    if (oldValue !== value) {
      var isDefined = defined(value);
      var hasClone = isDefined && typeof value.clone === 'function';
      var hasEquals = isDefined && typeof value.equals === 'function';
      this._hasClone = hasClone;
      this._hasEquals = hasEquals;
      var changed = !hasEquals || !value.equals(oldValue);
      if (changed) {
        this._value = !hasClone ? value : value.clone();
        this._definitionChanged.raiseEvent(this);
      }
    }
  };
  ConstantProperty.prototype.equals = function(other) {
    return this === other || (other instanceof ConstantProperty && ((!this._hasEquals && (this._value === other._value)) || (this._hasEquals && this._value.equals(other._value))));
  };
  return ConstantProperty;
});

})();
(function() {
var define = $__System.amdDefine;
define("30", ["23", "1a", "2f"], function(defaultValue, defined, ConstantProperty) {
  'use strict';
  function createProperty(name, privateName, subscriptionName, configurable, createPropertyCallback) {
    return {
      configurable: configurable,
      get: function() {
        return this[privateName];
      },
      set: function(value) {
        var oldValue = this[privateName];
        var subscription = this[subscriptionName];
        if (defined(subscription)) {
          subscription();
          this[subscriptionName] = undefined;
        }
        var hasValue = defined(value);
        if (hasValue && !defined(value.getValue) && defined(createPropertyCallback)) {
          value = createPropertyCallback(value);
        }
        if (oldValue !== value) {
          this[privateName] = value;
          this._definitionChanged.raiseEvent(this, name, value, oldValue);
        }
        if (defined(value) && defined(value.definitionChanged)) {
          this[subscriptionName] = value.definitionChanged.addEventListener(function() {
            this._definitionChanged.raiseEvent(this, name, value, value);
          }, this);
        }
      }
    };
  }
  function createConstantProperty(value) {
    return new ConstantProperty(value);
  }
  function createPropertyDescriptor(name, configurable, createPropertyCallback) {
    return createProperty(name, '_' + name.toString(), '_' + name.toString() + 'Subscription', defaultValue(configurable, false), defaultValue(createPropertyCallback, createConstantProperty));
  }
  return createPropertyDescriptor;
});

})();
(function() {
var define = $__System.amdDefine;
define("31", ["30"], function(createPropertyDescriptor) {
  'use strict';
  function createRawProperty(value) {
    return value;
  }
  function createRawPropertyDescriptor(name, configurable) {
    return createPropertyDescriptor(name, configurable, createRawProperty);
  }
  return createRawPropertyDescriptor;
});

})();
(function() {
var define = $__System.amdDefine;
define("28", ["2c", "26", "23", "1a", "1b", "1c", "1d", "32", "33", "34", "35", "@empty", "@empty", "2b", "@empty", "30", "31", "@empty", "@empty", "@empty", "@empty", "@empty", "@empty", "@empty", "@empty", "@empty", "@empty", "36", "@empty", "@empty"], function(Cartesian3, createGuid, defaultValue, defined, defineProperties, DeveloperError, Event, Matrix3, Matrix4, Quaternion, Transforms, BillboardGraphics, BoxGraphics, ConstantPositionProperty, CorridorGraphics, createPropertyDescriptor, createRawPropertyDescriptor, CylinderGraphics, EllipseGraphics, EllipsoidGraphics, LabelGraphics, ModelGraphics, PathGraphics, PointGraphics, PolygonGraphics, PolylineGraphics, PolylineVolumeGraphics, Property, RectangleGraphics, WallGraphics) {
  'use strict';
  function createConstantPositionProperty(value) {
    return new ConstantPositionProperty(value);
  }
  function createPositionPropertyDescriptor(name) {
    return createPropertyDescriptor(name, undefined, createConstantPositionProperty);
  }
  function createPropertyTypeDescriptor(name, Type) {
    return createPropertyDescriptor(name, undefined, function(value) {
      if (value instanceof Type) {
        return value;
      }
      return new Type(value);
    });
  }
  function Entity(options) {
    options = defaultValue(options, defaultValue.EMPTY_OBJECT);
    var id = options.id;
    if (!defined(id)) {
      id = createGuid();
    }
    this._availability = undefined;
    this._id = id;
    this._definitionChanged = new Event();
    this._name = options.name;
    this._show = defaultValue(options.show, true);
    this._parent = undefined;
    this._propertyNames = ['billboard', 'box', 'corridor', 'cylinder', 'description', 'ellipse', 'ellipsoid', 'label', 'model', 'orientation', 'path', 'point', 'polygon', 'polyline', 'polylineVolume', 'position', 'rectangle', 'viewFrom', 'wall'];
    this._billboard = undefined;
    this._billboardSubscription = undefined;
    this._box = undefined;
    this._boxSubscription = undefined;
    this._corridor = undefined;
    this._corridorSubscription = undefined;
    this._cylinder = undefined;
    this._cylinderSubscription = undefined;
    this._description = undefined;
    this._descriptionSubscription = undefined;
    this._ellipse = undefined;
    this._ellipseSubscription = undefined;
    this._ellipsoid = undefined;
    this._ellipsoidSubscription = undefined;
    this._label = undefined;
    this._labelSubscription = undefined;
    this._model = undefined;
    this._modelSubscription = undefined;
    this._orientation = undefined;
    this._orientationSubscription = undefined;
    this._path = undefined;
    this._pathSubscription = undefined;
    this._point = undefined;
    this._pointSubscription = undefined;
    this._polygon = undefined;
    this._polygonSubscription = undefined;
    this._polyline = undefined;
    this._polylineSubscription = undefined;
    this._polylineVolume = undefined;
    this._polylineVolumeSubscription = undefined;
    this._position = undefined;
    this._positionSubscription = undefined;
    this._rectangle = undefined;
    this._rectangleSubscription = undefined;
    this._viewFrom = undefined;
    this._viewFromSubscription = undefined;
    this._wall = undefined;
    this._wallSubscription = undefined;
    this._children = [];
    this.entityCollection = undefined;
    this.parent = options.parent;
    this.merge(options);
  }
  function updateShow(entity, children, isShowing) {
    var length = children.length;
    for (var i = 0; i < length; i++) {
      var child = children[i];
      var childShow = child._show;
      var oldValue = !isShowing && childShow;
      var newValue = isShowing && childShow;
      if (oldValue !== newValue) {
        updateShow(child, child._children, isShowing);
      }
    }
    entity._definitionChanged.raiseEvent(entity, 'isShowing', isShowing, !isShowing);
  }
  defineProperties(Entity.prototype, {
    availability: createRawPropertyDescriptor('availability'),
    id: {get: function() {
        return this._id;
      }},
    definitionChanged: {get: function() {
        return this._definitionChanged;
      }},
    name: createRawPropertyDescriptor('name'),
    show: {
      get: function() {
        return this._show;
      },
      set: function(value) {
        if (!defined(value)) {
          throw new DeveloperError('value is required.');
        }
        if (value === this._show) {
          return;
        }
        var wasShowing = this.isShowing;
        this._show = value;
        var isShowing = this.isShowing;
        if (wasShowing !== isShowing) {
          updateShow(this, this._children, isShowing);
        }
        this._definitionChanged.raiseEvent(this, 'show', value, !value);
      }
    },
    isShowing: {get: function() {
        return this._show && (!defined(this.entityCollection) || this.entityCollection.show) && (!defined(this._parent) || this._parent.isShowing);
      }},
    parent: {
      get: function() {
        return this._parent;
      },
      set: function(value) {
        var oldValue = this._parent;
        if (oldValue === value) {
          return;
        }
        var wasShowing = this.isShowing;
        if (defined(oldValue)) {
          var index = oldValue._children.indexOf(this);
          oldValue._children.splice(index, 1);
        }
        this._parent = value;
        if (defined(value)) {
          value._children.push(this);
        }
        var isShowing = this.isShowing;
        if (wasShowing !== isShowing) {
          updateShow(this, this._children, isShowing);
        }
        this._definitionChanged.raiseEvent(this, 'parent', value, oldValue);
      }
    },
    propertyNames: {get: function() {
        return this._propertyNames;
      }},
    billboard: createPropertyTypeDescriptor('billboard', BillboardGraphics),
    box: createPropertyTypeDescriptor('box', BoxGraphics),
    corridor: createPropertyTypeDescriptor('corridor', CorridorGraphics),
    cylinder: createPropertyTypeDescriptor('cylinder', CylinderGraphics),
    description: createPropertyDescriptor('description'),
    ellipse: createPropertyTypeDescriptor('ellipse', EllipseGraphics),
    ellipsoid: createPropertyTypeDescriptor('ellipsoid', EllipsoidGraphics),
    label: createPropertyTypeDescriptor('label', LabelGraphics),
    model: createPropertyTypeDescriptor('model', ModelGraphics),
    orientation: createPropertyDescriptor('orientation'),
    path: createPropertyTypeDescriptor('path', PathGraphics),
    point: createPropertyTypeDescriptor('point', PointGraphics),
    polygon: createPropertyTypeDescriptor('polygon', PolygonGraphics),
    polyline: createPropertyTypeDescriptor('polyline', PolylineGraphics),
    polylineVolume: createPropertyTypeDescriptor('polylineVolume', PolylineVolumeGraphics),
    position: createPositionPropertyDescriptor('position'),
    rectangle: createPropertyTypeDescriptor('rectangle', RectangleGraphics),
    viewFrom: createPropertyDescriptor('viewFrom'),
    wall: createPropertyTypeDescriptor('wall', WallGraphics)
  });
  Entity.prototype.isAvailable = function(time) {
    if (!defined(time)) {
      throw new DeveloperError('time is required.');
    }
    var availability = this._availability;
    return !defined(availability) || availability.contains(time);
  };
  Entity.prototype.addProperty = function(propertyName) {
    var propertyNames = this._propertyNames;
    if (!defined(propertyName)) {
      throw new DeveloperError('propertyName is required.');
    }
    if (propertyNames.indexOf(propertyName) !== -1) {
      throw new DeveloperError(propertyName + ' is already a registered property.');
    }
    if (propertyName in this) {
      throw new DeveloperError(propertyName + ' is a reserved property name.');
    }
    propertyNames.push(propertyName);
    Object.defineProperty(this, propertyName, createRawPropertyDescriptor(propertyName, true));
  };
  Entity.prototype.removeProperty = function(propertyName) {
    var propertyNames = this._propertyNames;
    var index = propertyNames.indexOf(propertyName);
    if (!defined(propertyName)) {
      throw new DeveloperError('propertyName is required.');
    }
    if (index === -1) {
      throw new DeveloperError(propertyName + ' is not a registered property.');
    }
    this._propertyNames.splice(index, 1);
    delete this[propertyName];
  };
  Entity.prototype.merge = function(source) {
    if (!defined(source)) {
      throw new DeveloperError('source is required.');
    }
    this.name = defaultValue(this.name, source.name);
    this.availability = defaultValue(source.availability, this.availability);
    var propertyNames = this._propertyNames;
    var sourcePropertyNames = defined(source._propertyNames) ? source._propertyNames : Object.keys(source);
    var propertyNamesLength = sourcePropertyNames.length;
    for (var i = 0; i < propertyNamesLength; i++) {
      var name = sourcePropertyNames[i];
      if (name === 'parent') {
        continue;
      }
      var targetProperty = this[name];
      var sourceProperty = source[name];
      if (!defined(targetProperty) && propertyNames.indexOf(name) === -1) {
        this.addProperty(name);
      }
      if (defined(sourceProperty)) {
        if (defined(targetProperty)) {
          if (defined(targetProperty.merge)) {
            targetProperty.merge(sourceProperty);
          }
        } else if (defined(sourceProperty.merge) && defined(sourceProperty.clone)) {
          this[name] = sourceProperty.clone();
        } else {
          this[name] = sourceProperty;
        }
      }
    }
  };
  var matrix3Scratch = new Matrix3();
  var positionScratch = new Cartesian3();
  var orientationScratch = new Quaternion();
  Entity.prototype._getModelMatrix = function(time, result) {
    var position = Property.getValueOrUndefined(this._position, time, positionScratch);
    if (!defined(position)) {
      return undefined;
    }
    var orientation = Property.getValueOrUndefined(this._orientation, time, orientationScratch);
    if (!defined(orientation)) {
      result = Transforms.eastNorthUpToFixedFrame(position, undefined, result);
    } else {
      result = Matrix4.fromRotationTranslation(Matrix3.fromQuaternion(orientation, matrix3Scratch), position, result);
    }
    return result;
  };
  return Entity;
});

})();
(function() {
var define = $__System.amdDefine;
define("29", ["2a", "26", "1a", "1b", "1c", "1d", "37", "24", "38", "39", "28"], function(AssociativeArray, createGuid, defined, defineProperties, DeveloperError, Event, Iso8601, JulianDate, RuntimeError, TimeInterval, Entity) {
  'use strict';
  var entityOptionsScratch = {id: undefined};
  function fireChangedEvent(collection) {
    if (collection._firing) {
      collection._refire = true;
      return;
    }
    if (collection._suspendCount === 0) {
      var added = collection._addedEntities;
      var removed = collection._removedEntities;
      var changed = collection._changedEntities;
      if (changed.length !== 0 || added.length !== 0 || removed.length !== 0) {
        collection._firing = true;
        do {
          collection._refire = false;
          var addedArray = added.values.slice(0);
          var removedArray = removed.values.slice(0);
          var changedArray = changed.values.slice(0);
          added.removeAll();
          removed.removeAll();
          changed.removeAll();
          collection._collectionChanged.raiseEvent(collection, addedArray, removedArray, changedArray);
        } while (collection._refire);
        collection._firing = false;
      }
    }
  }
  function EntityCollection(owner) {
    this._owner = owner;
    this._entities = new AssociativeArray();
    this._addedEntities = new AssociativeArray();
    this._removedEntities = new AssociativeArray();
    this._changedEntities = new AssociativeArray();
    this._suspendCount = 0;
    this._collectionChanged = new Event();
    this._id = createGuid();
    this._show = true;
    this._firing = false;
    this._refire = false;
  }
  EntityCollection.prototype.suspendEvents = function() {
    this._suspendCount++;
  };
  EntityCollection.prototype.resumeEvents = function() {
    if (this._suspendCount === 0) {
      throw new DeveloperError('resumeEvents can not be called before suspendEvents.');
    }
    this._suspendCount--;
    fireChangedEvent(this);
  };
  EntityCollection.collectionChangedEventCallback = undefined;
  defineProperties(EntityCollection.prototype, {
    collectionChanged: {get: function() {
        return this._collectionChanged;
      }},
    id: {get: function() {
        return this._id;
      }},
    values: {get: function() {
        return this._entities.values;
      }},
    show: {
      get: function() {
        return this._show;
      },
      set: function(value) {
        if (!defined(value)) {
          throw new DeveloperError('value is required.');
        }
        if (value === this._show) {
          return;
        }
        this.suspendEvents();
        var i;
        var oldShows = [];
        var entities = this._entities.values;
        var entitiesLength = entities.length;
        for (i = 0; i < entitiesLength; i++) {
          oldShows.push(entities[i].isShowing);
        }
        this._show = value;
        for (i = 0; i < entitiesLength; i++) {
          var oldShow = oldShows[i];
          var entity = entities[i];
          if (oldShow !== entity.isShowing) {
            entity.definitionChanged.raiseEvent(entity, 'isShowing', entity.isShowing, oldShow);
          }
        }
        this.resumeEvents();
      }
    },
    owner: {get: function() {
        return this._owner;
      }}
  });
  EntityCollection.prototype.computeAvailability = function() {
    var startTime = Iso8601.MAXIMUM_VALUE;
    var stopTime = Iso8601.MINIMUM_VALUE;
    var entities = this._entities.values;
    for (var i = 0,
        len = entities.length; i < len; i++) {
      var entity = entities[i];
      var availability = entity.availability;
      if (defined(availability)) {
        var start = availability.start;
        var stop = availability.stop;
        if (JulianDate.lessThan(start, startTime) && !start.equals(Iso8601.MINIMUM_VALUE)) {
          startTime = start;
        }
        if (JulianDate.greaterThan(stop, stopTime) && !stop.equals(Iso8601.MAXIMUM_VALUE)) {
          stopTime = stop;
        }
      }
    }
    if (Iso8601.MAXIMUM_VALUE.equals(startTime)) {
      startTime = Iso8601.MINIMUM_VALUE;
    }
    if (Iso8601.MINIMUM_VALUE.equals(stopTime)) {
      stopTime = Iso8601.MAXIMUM_VALUE;
    }
    return new TimeInterval({
      start: startTime,
      stop: stopTime
    });
  };
  EntityCollection.prototype.add = function(entity) {
    if (!defined(entity)) {
      throw new DeveloperError('entity is required.');
    }
    if (!(entity instanceof Entity)) {
      entity = new Entity(entity);
    }
    var id = entity.id;
    var entities = this._entities;
    if (entities.contains(id)) {
      throw new RuntimeError('An entity with id ' + id + ' already exists in this collection.');
    }
    entity.entityCollection = this;
    entities.set(id, entity);
    if (!this._removedEntities.remove(id)) {
      this._addedEntities.set(id, entity);
    }
    entity.definitionChanged.addEventListener(EntityCollection.prototype._onEntityDefinitionChanged, this);
    fireChangedEvent(this);
    return entity;
  };
  EntityCollection.prototype.remove = function(entity) {
    if (!defined(entity)) {
      return false;
    }
    return this.removeById(entity.id);
  };
  EntityCollection.prototype.contains = function(entity) {
    if (!defined(entity)) {
      throw new DeveloperError('entity is required');
    }
    return this._entities.get(entity.id) === entity;
  };
  EntityCollection.prototype.removeById = function(id) {
    if (!defined(id)) {
      return false;
    }
    var entities = this._entities;
    var entity = entities.get(id);
    if (!this._entities.remove(id)) {
      return false;
    }
    if (!this._addedEntities.remove(id)) {
      this._removedEntities.set(id, entity);
      this._changedEntities.remove(id);
    }
    this._entities.remove(id);
    entity.definitionChanged.removeEventListener(EntityCollection.prototype._onEntityDefinitionChanged, this);
    fireChangedEvent(this);
    return true;
  };
  EntityCollection.prototype.removeAll = function() {
    var entities = this._entities;
    var entitiesLength = entities.length;
    var array = entities.values;
    var addedEntities = this._addedEntities;
    var removed = this._removedEntities;
    for (var i = 0; i < entitiesLength; i++) {
      var existingItem = array[i];
      var existingItemId = existingItem.id;
      var addedItem = addedEntities.get(existingItemId);
      if (!defined(addedItem)) {
        existingItem.definitionChanged.removeEventListener(EntityCollection.prototype._onEntityDefinitionChanged, this);
        removed.set(existingItemId, existingItem);
      }
    }
    entities.removeAll();
    addedEntities.removeAll();
    this._changedEntities.removeAll();
    fireChangedEvent(this);
  };
  EntityCollection.prototype.getById = function(id) {
    if (!defined(id)) {
      throw new DeveloperError('id is required.');
    }
    return this._entities.get(id);
  };
  EntityCollection.prototype.getOrCreateEntity = function(id) {
    if (!defined(id)) {
      throw new DeveloperError('id is required.');
    }
    var entity = this._entities.get(id);
    if (!defined(entity)) {
      entityOptionsScratch.id = id;
      entity = new Entity(entityOptionsScratch);
      this.add(entity);
    }
    return entity;
  };
  EntityCollection.prototype._onEntityDefinitionChanged = function(entity) {
    var id = entity.id;
    if (!this._addedEntities.contains(id)) {
      this._changedEntities.set(id, entity);
    }
    fireChangedEvent(this);
  };
  return EntityCollection;
});

})();
(function() {
var define = $__System.amdDefine;
define("3a", ["2c", "3b", "23", "1a", "1b", "1c", "3c"], function(Cartesian3, Cartographic, defaultValue, defined, defineProperties, DeveloperError, Ellipsoid) {
  'use strict';
  function GeographicProjection(ellipsoid) {
    this._ellipsoid = defaultValue(ellipsoid, Ellipsoid.WGS84);
    this._semimajorAxis = this._ellipsoid.maximumRadius;
    this._oneOverSemimajorAxis = 1.0 / this._semimajorAxis;
  }
  defineProperties(GeographicProjection.prototype, {ellipsoid: {get: function() {
        return this._ellipsoid;
      }}});
  GeographicProjection.prototype.project = function(cartographic, result) {
    var semimajorAxis = this._semimajorAxis;
    var x = cartographic.longitude * semimajorAxis;
    var y = cartographic.latitude * semimajorAxis;
    var z = cartographic.height;
    if (!defined(result)) {
      return new Cartesian3(x, y, z);
    }
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  };
  GeographicProjection.prototype.unproject = function(cartesian, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    var oneOverEarthSemimajorAxis = this._oneOverSemimajorAxis;
    var longitude = cartesian.x * oneOverEarthSemimajorAxis;
    var latitude = cartesian.y * oneOverEarthSemimajorAxis;
    var height = cartesian.z;
    if (!defined(result)) {
      return new Cartographic(longitude, latitude, height);
    }
    result.longitude = longitude;
    result.latitude = latitude;
    result.height = height;
    return result;
  };
  return GeographicProjection;
});

})();
(function() {
var define = $__System.amdDefine;
define("3d", ["23", "1a", "1c", "27"], function(defaultValue, defined, DeveloperError, CesiumMath) {
  'use strict';
  var factorial = CesiumMath.factorial;
  function calculateCoefficientTerm(x, zIndices, xTable, derivOrder, termOrder, reservedIndices) {
    var result = 0;
    var reserved;
    var i;
    var j;
    if (derivOrder > 0) {
      for (i = 0; i < termOrder; i++) {
        reserved = false;
        for (j = 0; j < reservedIndices.length && !reserved; j++) {
          if (i === reservedIndices[j]) {
            reserved = true;
          }
        }
        if (!reserved) {
          reservedIndices.push(i);
          result += calculateCoefficientTerm(x, zIndices, xTable, derivOrder - 1, termOrder, reservedIndices);
          reservedIndices.splice(reservedIndices.length - 1, 1);
        }
      }
      return result;
    }
    result = 1;
    for (i = 0; i < termOrder; i++) {
      reserved = false;
      for (j = 0; j < reservedIndices.length && !reserved; j++) {
        if (i === reservedIndices[j]) {
          reserved = true;
        }
      }
      if (!reserved) {
        result *= x - xTable[zIndices[i]];
      }
    }
    return result;
  }
  var HermitePolynomialApproximation = {type: 'Hermite'};
  HermitePolynomialApproximation.getRequiredDataPoints = function(degree, inputOrder) {
    inputOrder = defaultValue(inputOrder, 0);
    if (!defined(degree)) {
      throw new DeveloperError('degree is required.');
    }
    if (degree < 0) {
      throw new DeveloperError('degree must be 0 or greater.');
    }
    if (inputOrder < 0) {
      throw new DeveloperError('inputOrder must be 0 or greater.');
    }
    return Math.max(Math.floor((degree + 1) / (inputOrder + 1)), 2);
  };
  HermitePolynomialApproximation.interpolateOrderZero = function(x, xTable, yTable, yStride, result) {
    if (!defined(result)) {
      result = new Array(yStride);
    }
    var i;
    var j;
    var d;
    var s;
    var len;
    var index;
    var length = xTable.length;
    var coefficients = new Array(yStride);
    for (i = 0; i < yStride; i++) {
      result[i] = 0;
      var l = new Array(length);
      coefficients[i] = l;
      for (j = 0; j < length; j++) {
        l[j] = [];
      }
    }
    var zIndicesLength = length,
        zIndices = new Array(zIndicesLength);
    for (i = 0; i < zIndicesLength; i++) {
      zIndices[i] = i;
    }
    var highestNonZeroCoef = length - 1;
    for (s = 0; s < yStride; s++) {
      for (j = 0; j < zIndicesLength; j++) {
        index = zIndices[j] * yStride + s;
        coefficients[s][0].push(yTable[index]);
      }
      for (i = 1; i < zIndicesLength; i++) {
        var nonZeroCoefficients = false;
        for (j = 0; j < zIndicesLength - i; j++) {
          var zj = xTable[zIndices[j]];
          var zn = xTable[zIndices[j + i]];
          var numerator;
          if (zn - zj <= 0) {
            index = zIndices[j] * yStride + yStride * i + s;
            numerator = yTable[index];
            coefficients[s][i].push(numerator / factorial(i));
          } else {
            numerator = (coefficients[s][i - 1][j + 1] - coefficients[s][i - 1][j]);
            coefficients[s][i].push(numerator / (zn - zj));
          }
          nonZeroCoefficients = nonZeroCoefficients || (numerator !== 0);
        }
        if (!nonZeroCoefficients) {
          highestNonZeroCoef = i - 1;
        }
      }
    }
    for (d = 0, len = 0; d <= len; d++) {
      for (i = d; i <= highestNonZeroCoef; i++) {
        var tempTerm = calculateCoefficientTerm(x, zIndices, xTable, d, i, []);
        for (s = 0; s < yStride; s++) {
          var coeff = coefficients[s][i][0];
          result[s + d * yStride] += coeff * tempTerm;
        }
      }
    }
    return result;
  };
  var arrayScratch = [];
  HermitePolynomialApproximation.interpolate = function(x, xTable, yTable, yStride, inputOrder, outputOrder, result) {
    var resultLength = yStride * (outputOrder + 1);
    if (!defined(result)) {
      result = new Array(resultLength);
    }
    for (var r = 0; r < resultLength; r++) {
      result[r] = 0;
    }
    var length = xTable.length;
    var zIndices = new Array(length * (inputOrder + 1));
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < (inputOrder + 1); j++) {
        zIndices[i * (inputOrder + 1) + j] = i;
      }
    }
    var zIndiceslength = zIndices.length;
    var coefficients = arrayScratch;
    var highestNonZeroCoef = fillCoefficientList(coefficients, zIndices, xTable, yTable, yStride, inputOrder);
    var reservedIndices = [];
    var tmp = zIndiceslength * (zIndiceslength + 1) / 2;
    var loopStop = Math.min(highestNonZeroCoef, outputOrder);
    for (var d = 0; d <= loopStop; d++) {
      for (i = d; i <= highestNonZeroCoef; i++) {
        reservedIndices.length = 0;
        var tempTerm = calculateCoefficientTerm(x, zIndices, xTable, d, i, reservedIndices);
        var dimTwo = Math.floor(i * (1 - i) / 2) + (zIndiceslength * i);
        for (var s = 0; s < yStride; s++) {
          var dimOne = Math.floor(s * tmp);
          var coef = coefficients[dimOne + dimTwo];
          result[s + d * yStride] += coef * tempTerm;
        }
      }
    }
    return result;
  };
  function fillCoefficientList(coefficients, zIndices, xTable, yTable, yStride, inputOrder) {
    var j;
    var index;
    var highestNonZero = -1;
    var zIndiceslength = zIndices.length;
    var tmp = zIndiceslength * (zIndiceslength + 1) / 2;
    for (var s = 0; s < yStride; s++) {
      var dimOne = Math.floor(s * tmp);
      for (j = 0; j < zIndiceslength; j++) {
        index = zIndices[j] * yStride * (inputOrder + 1) + s;
        coefficients[dimOne + j] = yTable[index];
      }
      for (var i = 1; i < zIndiceslength; i++) {
        var coefIndex = 0;
        var dimTwo = Math.floor(i * (1 - i) / 2) + (zIndiceslength * i);
        var nonZeroCoefficients = false;
        for (j = 0; j < zIndiceslength - i; j++) {
          var zj = xTable[zIndices[j]];
          var zn = xTable[zIndices[j + i]];
          var numerator;
          var coefficient;
          if (zn - zj <= 0) {
            index = zIndices[j] * yStride * (inputOrder + 1) + yStride * i + s;
            numerator = yTable[index];
            coefficient = (numerator / CesiumMath.factorial(i));
            coefficients[dimOne + dimTwo + coefIndex] = coefficient;
            coefIndex++;
          } else {
            var dimTwoMinusOne = Math.floor((i - 1) * (2 - i) / 2) + (zIndiceslength * (i - 1));
            numerator = coefficients[dimOne + dimTwoMinusOne + j + 1] - coefficients[dimOne + dimTwoMinusOne + j];
            coefficient = (numerator / (zn - zj));
            coefficients[dimOne + dimTwo + coefIndex] = coefficient;
            coefIndex++;
          }
          nonZeroCoefficients = nonZeroCoefficients || (numerator !== 0.0);
        }
        if (nonZeroCoefficients) {
          highestNonZero = Math.max(highestNonZero, i);
        }
      }
    }
    return highestNonZero;
  }
  return HermitePolynomialApproximation;
});

})();
(function() {
var define = $__System.amdDefine;
define("3e", ["1a", "1b", "1c", "32", "34", "2d", "35"], function(defined, defineProperties, DeveloperError, Matrix3, Quaternion, ReferenceFrame, Transforms) {
  "use strict";
  var OrientationProperty = function() {
    DeveloperError.throwInstantiationError();
  };
  defineProperties(OrientationProperty.prototype, {
    isConstant: {get: DeveloperError.throwInstantiationError},
    definitionChanged: {get: DeveloperError.throwInstantiationError}
  });
  OrientationProperty.prototype.getValue = DeveloperError.throwInstantiationError;
  OrientationProperty.prototype.equals = DeveloperError.throwInstantiationError;
  function framesEqual(frame1, frame2) {
    return frame1 && frame1.id ? frame1.id === (frame2 && frame2.id) : frame1 === frame2;
  }
  function frameParents(frame) {
    var frames = [];
    while (defined(frame)) {
      frames.unshift(frame);
      frame = frame.position && frame.position.referenceFrame;
    }
    return frames;
  }
  function lowestCommonAncestor(parents1, parents2) {
    if (!framesEqual(parents1[0], parents2[0])) {
      return -1;
    }
    var h = Math.min(parents1.length, parents2.length);
    for (var i = 0; i <= h; i++) {
      if (!framesEqual(parents1[i], parents2[i])) {
        return i - 1;
      }
    }
    return -1;
  }
  var scratchIcrfToFixedMatrix3 = new Matrix3();
  var scratchIcrfToFixed = new Quaternion();
  function getIcrfToFixed(time) {
    var icrfToFixedRotation = Transforms.computeIcrfToFixedMatrix(time, scratchIcrfToFixedMatrix3);
    if (!defined(icrfToFixedRotation)) {
      icrfToFixedRotation = Transforms.computeTemeToPseudoFixedMatrix(time, scratchIcrfToFixedMatrix3);
    }
    return Quaternion.fromRotationMatrix(icrfToFixedRotation, scratchIcrfToFixed);
  }
  var scratchQuaternion = new Quaternion();
  OrientationProperty.convertToReferenceFrame = function(time, value, inputFrame, outputFrame, result) {
    if (!defined(value)) {
      return value;
    }
    if (!defined(result)) {
      result = new Quaternion();
    }
    if (inputFrame === outputFrame) {
      return Quaternion.clone(value, result);
    }
    if (!defined(inputFrame) || !defined(outputFrame)) {
      return undefined;
    }
    var inputFrameParents = frameParents(inputFrame);
    var outputFrameParents = frameParents(outputFrame);
    var lcaIndex = lowestCommonAncestor(inputFrameParents, outputFrameParents);
    var lcaFrame = inputFrameParents[lcaIndex];
    var inputOrientationAccumulator = function(accumulatedOrientationValue, frame) {
      if (!defined(accumulatedOrientationValue)) {
        return accumulatedOrientationValue;
      }
      var frameOrientationProperty = frame.orientation;
      if (!defined(frameOrientationProperty)) {
        return undefined;
      }
      var frameOrientationValue = frameOrientationProperty.getValue(time, scratchQuaternion);
      if (!defined(frameOrientationValue)) {
        return undefined;
      }
      return Quaternion.multiply(frameOrientationValue, accumulatedOrientationValue, accumulatedOrientationValue);
    };
    var outputOrientationAccumulator = function(accumulatedOrientationValue, frame) {
      if (!defined(accumulatedOrientationValue)) {
        return accumulatedOrientationValue;
      }
      var frameOrientationProperty = frame.orientation;
      if (!defined(frameOrientationProperty)) {
        return undefined;
      }
      var frameOrientationValue = frameOrientationProperty.getValue(time, scratchQuaternion);
      if (!defined(frameOrientationValue)) {
        return undefined;
      }
      Quaternion.conjugate(frameOrientationValue, frameOrientationValue);
      return Quaternion.multiply(frameOrientationValue, accumulatedOrientationValue, accumulatedOrientationValue);
    };
    if (defined(lcaFrame)) {
      inputFrameParents = inputFrameParents.slice(lcaIndex + 1);
      outputFrameParents = outputFrameParents.slice(lcaIndex + 1);
      var lcaFrameValue = inputFrameParents.reduceRight(inputOrientationAccumulator, Quaternion.clone(value, result));
      if (!defined(lcaFrameValue)) {
        return undefined;
      }
      return outputFrameParents.reduce(outputOrientationAccumulator, lcaFrameValue);
    }
    var inputRootFrame = inputFrameParents.shift();
    var outputRootFrame = outputFrameParents.shift();
    var fixedFrameValue,
        inertialFrameValue;
    if (inputRootFrame === ReferenceFrame.INERTIAL && outputRootFrame === ReferenceFrame.FIXED) {
      inertialFrameValue = inputFrameParents.reduceRight(inputOrientationAccumulator, Quaternion.clone(value, result));
      if (!defined(inertialFrameValue)) {
        return undefined;
      }
      fixedFrameValue = Quaternion.multiply(getIcrfToFixed(time), inertialFrameValue, result);
      return outputFrameParents.reduce(outputOrientationAccumulator, fixedFrameValue);
    }
    if (inputRootFrame === ReferenceFrame.FIXED && outputRootFrame === ReferenceFrame.INERTIAL) {
      fixedFrameValue = inputFrameParents.reduceRight(inputOrientationAccumulator, Quaternion.clone(value, result));
      if (!defined(fixedFrameValue)) {
        return undefined;
      }
      var fixedToIcrf = Quaternion.conjugate(getIcrfToFixed(time), scratchQuaternion);
      inertialFrameValue = Quaternion.multiply(fixedToIcrf, fixedFrameValue, result);
      return outputFrameParents.reduce(outputOrientationAccumulator, inertialFrameValue);
    }
    return undefined;
  };
  return OrientationProperty;
});

})();
(function() {
var define = $__System.amdDefine;
define("3f", ["1a", "1b", "1c", "40"], function(defined, defineProperties, DeveloperError, PerspectiveOffCenterFrustum) {
  'use strict';
  function PerspectiveFrustum() {
    this._offCenterFrustum = new PerspectiveOffCenterFrustum();
    this.fov = undefined;
    this._fov = undefined;
    this._fovy = undefined;
    this._sseDenominator = undefined;
    this.aspectRatio = undefined;
    this._aspectRatio = undefined;
    this.near = 1.0;
    this._near = this.near;
    this.far = 500000000.0;
    this._far = this.far;
    this.xOffset = 0.0;
    this._xOffset = this.xOffset;
    this.yOffset = 0.0;
    this._yOffset = this.yOffset;
  }
  function update(frustum) {
    if (!defined(frustum.fov) || !defined(frustum.aspectRatio) || !defined(frustum.near) || !defined(frustum.far)) {
      throw new DeveloperError('fov, aspectRatio, near, or far parameters are not set.');
    }
    var f = frustum._offCenterFrustum;
    if (frustum.fov !== frustum._fov || frustum.aspectRatio !== frustum._aspectRatio || frustum.near !== frustum._near || frustum.far !== frustum._far || frustum.xOffset !== frustum._xOffset || frustum.yOffset !== frustum._yOffset) {
      if (frustum.fov < 0 || frustum.fov >= Math.PI) {
        throw new DeveloperError('fov must be in the range [0, PI).');
      }
      if (frustum.aspectRatio < 0) {
        throw new DeveloperError('aspectRatio must be positive.');
      }
      if (frustum.near < 0 || frustum.near > frustum.far) {
        throw new DeveloperError('near must be greater than zero and less than far.');
      }
      frustum._aspectRatio = frustum.aspectRatio;
      frustum._fov = frustum.fov;
      frustum._fovy = (frustum.aspectRatio <= 1) ? frustum.fov : Math.atan(Math.tan(frustum.fov * 0.5) / frustum.aspectRatio) * 2.0;
      frustum._near = frustum.near;
      frustum._far = frustum.far;
      frustum._sseDenominator = 2.0 * Math.tan(0.5 * frustum._fovy);
      frustum._xOffset = frustum.xOffset;
      frustum._yOffset = frustum.yOffset;
      f.top = frustum.near * Math.tan(0.5 * frustum._fovy);
      f.bottom = -f.top;
      f.right = frustum.aspectRatio * f.top;
      f.left = -f.right;
      f.near = frustum.near;
      f.far = frustum.far;
      f.right += frustum.xOffset;
      f.left += frustum.xOffset;
      f.top += frustum.yOffset;
      f.bottom += frustum.yOffset;
    }
  }
  defineProperties(PerspectiveFrustum.prototype, {
    projectionMatrix: {get: function() {
        update(this);
        return this._offCenterFrustum.projectionMatrix;
      }},
    infiniteProjectionMatrix: {get: function() {
        update(this);
        return this._offCenterFrustum.infiniteProjectionMatrix;
      }},
    fovy: {get: function() {
        update(this);
        return this._fovy;
      }},
    sseDenominator: {get: function() {
        update(this);
        return this._sseDenominator;
      }}
  });
  PerspectiveFrustum.prototype.computeCullingVolume = function(position, direction, up) {
    update(this);
    return this._offCenterFrustum.computeCullingVolume(position, direction, up);
  };
  PerspectiveFrustum.prototype.getPixelDimensions = function(drawingBufferWidth, drawingBufferHeight, distance, result) {
    update(this);
    return this._offCenterFrustum.getPixelDimensions(drawingBufferWidth, drawingBufferHeight, distance, result);
  };
  PerspectiveFrustum.prototype.clone = function(result) {
    if (!defined(result)) {
      result = new PerspectiveFrustum();
    }
    result.aspectRatio = this.aspectRatio;
    result.fov = this.fov;
    result.near = this.near;
    result.far = this.far;
    result._aspectRatio = undefined;
    result._fov = undefined;
    result._near = undefined;
    result._far = undefined;
    this._offCenterFrustum.clone(result._offCenterFrustum);
    return result;
  };
  PerspectiveFrustum.prototype.equals = function(other) {
    if (!defined(other)) {
      return false;
    }
    update(this);
    update(other);
    return (this.fov === other.fov && this.aspectRatio === other.aspectRatio && this.near === other.near && this.far === other.far && this._offCenterFrustum.equals(other._offCenterFrustum));
  };
  return PerspectiveFrustum;
});

})();
(function() {
var define = $__System.amdDefine;
define("41", ["1f"], function(freezeObject) {
  'use strict';
  var Intersect = {
    OUTSIDE: -1,
    INTERSECTING: 0,
    INSIDE: 1
  };
  return freezeObject(Intersect);
});

})();
(function() {
var define = $__System.amdDefine;
define("42", ["2c", "43", "23", "1a", "1c", "41", "44"], function(Cartesian3, Cartesian4, defaultValue, defined, DeveloperError, Intersect, Plane) {
  'use strict';
  function CullingVolume(planes) {
    this.planes = defaultValue(planes, []);
  }
  var faces = [new Cartesian3(), new Cartesian3(), new Cartesian3()];
  Cartesian3.clone(Cartesian3.UNIT_X, faces[0]);
  Cartesian3.clone(Cartesian3.UNIT_Y, faces[1]);
  Cartesian3.clone(Cartesian3.UNIT_Z, faces[2]);
  var scratchPlaneCenter = new Cartesian3();
  var scratchPlaneNormal = new Cartesian3();
  var scratchPlane = new Plane(new Cartesian3(), 0.0);
  CullingVolume.fromBoundingSphere = function(boundingSphere, result) {
    if (!defined(boundingSphere)) {
      throw new DeveloperError('boundingSphere is required.');
    }
    if (!defined(result)) {
      result = new CullingVolume();
    }
    var length = faces.length;
    var planes = result.planes;
    planes.length = 2 * length;
    var center = boundingSphere.center;
    var radius = boundingSphere.radius;
    var planeIndex = 0;
    for (var i = 0; i < length; ++i) {
      var faceNormal = faces[i];
      var plane0 = planes[planeIndex];
      var plane1 = planes[planeIndex + 1];
      if (!defined(plane0)) {
        plane0 = planes[planeIndex] = new Cartesian4();
      }
      if (!defined(plane1)) {
        plane1 = planes[planeIndex + 1] = new Cartesian4();
      }
      Cartesian3.multiplyByScalar(faceNormal, -radius, scratchPlaneCenter);
      Cartesian3.add(center, scratchPlaneCenter, scratchPlaneCenter);
      plane0.x = faceNormal.x;
      plane0.y = faceNormal.y;
      plane0.z = faceNormal.z;
      plane0.w = -Cartesian3.dot(faceNormal, scratchPlaneCenter);
      Cartesian3.multiplyByScalar(faceNormal, radius, scratchPlaneCenter);
      Cartesian3.add(center, scratchPlaneCenter, scratchPlaneCenter);
      plane1.x = -faceNormal.x;
      plane1.y = -faceNormal.y;
      plane1.z = -faceNormal.z;
      plane1.w = -Cartesian3.dot(Cartesian3.negate(faceNormal, scratchPlaneNormal), scratchPlaneCenter);
      planeIndex += 2;
    }
    return result;
  };
  CullingVolume.prototype.computeVisibility = function(boundingVolume) {
    if (!defined(boundingVolume)) {
      throw new DeveloperError('boundingVolume is required.');
    }
    var planes = this.planes;
    var intersecting = false;
    for (var k = 0,
        len = planes.length; k < len; ++k) {
      var result = boundingVolume.intersectPlane(Plane.fromCartesian4(planes[k], scratchPlane));
      if (result === Intersect.OUTSIDE) {
        return Intersect.OUTSIDE;
      } else if (result === Intersect.INTERSECTING) {
        intersecting = true;
      }
    }
    return intersecting ? Intersect.INTERSECTING : Intersect.INSIDE;
  };
  CullingVolume.prototype.computeVisibilityWithPlaneMask = function(boundingVolume, parentPlaneMask) {
    if (!defined(boundingVolume)) {
      throw new DeveloperError('boundingVolume is required.');
    }
    if (!defined(parentPlaneMask)) {
      throw new DeveloperError('parentPlaneMask is required.');
    }
    if (parentPlaneMask === CullingVolume.MASK_OUTSIDE || parentPlaneMask === CullingVolume.MASK_INSIDE) {
      return parentPlaneMask;
    }
    var mask = CullingVolume.MASK_INSIDE;
    var planes = this.planes;
    for (var k = 0,
        len = planes.length; k < len; ++k) {
      var flag = (k < 31) ? (1 << k) : 0;
      if (k < 31 && (parentPlaneMask & flag) === 0) {
        continue;
      }
      var result = boundingVolume.intersectPlane(Plane.fromCartesian4(planes[k], scratchPlane));
      if (result === Intersect.OUTSIDE) {
        return CullingVolume.MASK_OUTSIDE;
      } else if (result === Intersect.INTERSECTING) {
        mask |= flag;
      }
    }
    return mask;
  };
  CullingVolume.MASK_OUTSIDE = 0xffffffff;
  CullingVolume.MASK_INSIDE = 0x00000000;
  CullingVolume.MASK_INDETERMINATE = 0x7fffffff;
  return CullingVolume;
});

})();
(function() {
var define = $__System.amdDefine;
define("40", ["45", "2c", "43", "23", "1a", "1b", "1c", "33", "42"], function(Cartesian2, Cartesian3, Cartesian4, defaultValue, defined, defineProperties, DeveloperError, Matrix4, CullingVolume) {
  'use strict';
  function PerspectiveOffCenterFrustum() {
    this.left = undefined;
    this._left = undefined;
    this.right = undefined;
    this._right = undefined;
    this.top = undefined;
    this._top = undefined;
    this.bottom = undefined;
    this._bottom = undefined;
    this.near = 1.0;
    this._near = this.near;
    this.far = 500000000.0;
    this._far = this.far;
    this._cullingVolume = new CullingVolume();
    this._perspectiveMatrix = new Matrix4();
    this._infinitePerspective = new Matrix4();
  }
  function update(frustum) {
    if (!defined(frustum.right) || !defined(frustum.left) || !defined(frustum.top) || !defined(frustum.bottom) || !defined(frustum.near) || !defined(frustum.far)) {
      throw new DeveloperError('right, left, top, bottom, near, or far parameters are not set.');
    }
    var t = frustum.top;
    var b = frustum.bottom;
    var r = frustum.right;
    var l = frustum.left;
    var n = frustum.near;
    var f = frustum.far;
    if (t !== frustum._top || b !== frustum._bottom || l !== frustum._left || r !== frustum._right || n !== frustum._near || f !== frustum._far) {
      if (frustum.near <= 0 || frustum.near > frustum.far) {
        throw new DeveloperError('near must be greater than zero and less than far.');
      }
      frustum._left = l;
      frustum._right = r;
      frustum._top = t;
      frustum._bottom = b;
      frustum._near = n;
      frustum._far = f;
      frustum._perspectiveMatrix = Matrix4.computePerspectiveOffCenter(l, r, b, t, n, f, frustum._perspectiveMatrix);
      frustum._infinitePerspective = Matrix4.computeInfinitePerspectiveOffCenter(l, r, b, t, n, frustum._infinitePerspective);
    }
  }
  defineProperties(PerspectiveOffCenterFrustum.prototype, {
    projectionMatrix: {get: function() {
        update(this);
        return this._perspectiveMatrix;
      }},
    infiniteProjectionMatrix: {get: function() {
        update(this);
        return this._infinitePerspective;
      }}
  });
  var getPlanesRight = new Cartesian3();
  var getPlanesNearCenter = new Cartesian3();
  var getPlanesFarCenter = new Cartesian3();
  var getPlanesNormal = new Cartesian3();
  PerspectiveOffCenterFrustum.prototype.computeCullingVolume = function(position, direction, up) {
    if (!defined(position)) {
      throw new DeveloperError('position is required.');
    }
    if (!defined(direction)) {
      throw new DeveloperError('direction is required.');
    }
    if (!defined(up)) {
      throw new DeveloperError('up is required.');
    }
    var planes = this._cullingVolume.planes;
    var t = this.top;
    var b = this.bottom;
    var r = this.right;
    var l = this.left;
    var n = this.near;
    var f = this.far;
    var right = Cartesian3.cross(direction, up, getPlanesRight);
    var nearCenter = getPlanesNearCenter;
    Cartesian3.multiplyByScalar(direction, n, nearCenter);
    Cartesian3.add(position, nearCenter, nearCenter);
    var farCenter = getPlanesFarCenter;
    Cartesian3.multiplyByScalar(direction, f, farCenter);
    Cartesian3.add(position, farCenter, farCenter);
    var normal = getPlanesNormal;
    Cartesian3.multiplyByScalar(right, l, normal);
    Cartesian3.add(nearCenter, normal, normal);
    Cartesian3.subtract(normal, position, normal);
    Cartesian3.normalize(normal, normal);
    Cartesian3.cross(normal, up, normal);
    var plane = planes[0];
    if (!defined(plane)) {
      plane = planes[0] = new Cartesian4();
    }
    plane.x = normal.x;
    plane.y = normal.y;
    plane.z = normal.z;
    plane.w = -Cartesian3.dot(normal, position);
    Cartesian3.multiplyByScalar(right, r, normal);
    Cartesian3.add(nearCenter, normal, normal);
    Cartesian3.subtract(normal, position, normal);
    Cartesian3.normalize(normal, normal);
    Cartesian3.cross(up, normal, normal);
    plane = planes[1];
    if (!defined(plane)) {
      plane = planes[1] = new Cartesian4();
    }
    plane.x = normal.x;
    plane.y = normal.y;
    plane.z = normal.z;
    plane.w = -Cartesian3.dot(normal, position);
    Cartesian3.multiplyByScalar(up, b, normal);
    Cartesian3.add(nearCenter, normal, normal);
    Cartesian3.subtract(normal, position, normal);
    Cartesian3.normalize(normal, normal);
    Cartesian3.cross(right, normal, normal);
    plane = planes[2];
    if (!defined(plane)) {
      plane = planes[2] = new Cartesian4();
    }
    plane.x = normal.x;
    plane.y = normal.y;
    plane.z = normal.z;
    plane.w = -Cartesian3.dot(normal, position);
    Cartesian3.multiplyByScalar(up, t, normal);
    Cartesian3.add(nearCenter, normal, normal);
    Cartesian3.subtract(normal, position, normal);
    Cartesian3.normalize(normal, normal);
    Cartesian3.cross(normal, right, normal);
    plane = planes[3];
    if (!defined(plane)) {
      plane = planes[3] = new Cartesian4();
    }
    plane.x = normal.x;
    plane.y = normal.y;
    plane.z = normal.z;
    plane.w = -Cartesian3.dot(normal, position);
    plane = planes[4];
    if (!defined(plane)) {
      plane = planes[4] = new Cartesian4();
    }
    plane.x = direction.x;
    plane.y = direction.y;
    plane.z = direction.z;
    plane.w = -Cartesian3.dot(direction, nearCenter);
    Cartesian3.negate(direction, normal);
    plane = planes[5];
    if (!defined(plane)) {
      plane = planes[5] = new Cartesian4();
    }
    plane.x = normal.x;
    plane.y = normal.y;
    plane.z = normal.z;
    plane.w = -Cartesian3.dot(normal, farCenter);
    return this._cullingVolume;
  };
  PerspectiveOffCenterFrustum.prototype.getPixelDimensions = function(drawingBufferWidth, drawingBufferHeight, distance, result) {
    update(this);
    if (!defined(drawingBufferWidth) || !defined(drawingBufferHeight)) {
      throw new DeveloperError('Both drawingBufferWidth and drawingBufferHeight are required.');
    }
    if (drawingBufferWidth <= 0) {
      throw new DeveloperError('drawingBufferWidth must be greater than zero.');
    }
    if (drawingBufferHeight <= 0) {
      throw new DeveloperError('drawingBufferHeight must be greater than zero.');
    }
    if (!defined(distance)) {
      throw new DeveloperError('distance is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('A result object is required.');
    }
    var inverseNear = 1.0 / this.near;
    var tanTheta = this.top * inverseNear;
    var pixelHeight = 2.0 * distance * tanTheta / drawingBufferHeight;
    tanTheta = this.right * inverseNear;
    var pixelWidth = 2.0 * distance * tanTheta / drawingBufferWidth;
    result.x = pixelWidth;
    result.y = pixelHeight;
    return result;
  };
  PerspectiveOffCenterFrustum.prototype.clone = function(result) {
    if (!defined(result)) {
      result = new PerspectiveOffCenterFrustum();
    }
    result.right = this.right;
    result.left = this.left;
    result.top = this.top;
    result.bottom = this.bottom;
    result.near = this.near;
    result.far = this.far;
    result._left = undefined;
    result._right = undefined;
    result._top = undefined;
    result._bottom = undefined;
    result._near = undefined;
    result._far = undefined;
    return result;
  };
  PerspectiveOffCenterFrustum.prototype.equals = function(other) {
    return (defined(other) && this.right === other.right && this.left === other.left && this.top === other.top && this.bottom === other.bottom && this.near === other.near && this.far === other.far);
  };
  return PerspectiveOffCenterFrustum;
});

})();
(function() {
var define = $__System.amdDefine;
define("46", ["1a", "1b", "1c", "1d", "36"], function(defined, defineProperties, DeveloperError, Event, Property) {
  "use strict";
  function resolve(that) {
    var targetEntity = that._targetEntity;
    if (that._resolveEntity) {
      targetEntity = that._targetCollection.getById(that._targetId);
      if (defined(targetEntity)) {
        that._targetEntity = targetEntity;
        that._resolveEntity = false;
      }
    }
    return targetEntity;
  }
  var ReferenceEntity = function(targetCollection, targetId) {
    if (!defined(targetCollection)) {
      throw new DeveloperError('targetCollection is required.');
    }
    if (!defined(targetId) || targetId === '') {
      throw new DeveloperError('targetId is required.');
    }
    this._targetCollection = targetCollection;
    this._targetId = targetId;
    this._targetEntity = undefined;
    this._definitionChanged = new Event();
    this._resolveEntity = true;
    targetCollection.collectionChanged.addEventListener(ReferenceEntity.prototype._onCollectionChanged, this);
  };
  defineProperties(ReferenceEntity.prototype, {
    definitionChanged: {get: function() {
        return this._definitionChanged;
      }},
    id: {get: function() {
        return this._targetId;
      }},
    position: {get: function() {
        var entity = resolve(this);
        return defined(entity) ? entity.position : undefined;
      }},
    orientation: {get: function() {
        var entity = resolve(this);
        return defined(entity) ? entity.orientation : undefined;
      }},
    targetId: {get: function() {
        return this._targetId;
      }},
    targetCollection: {get: function() {
        return this._targetCollection;
      }},
    resolvedEntity: {get: function() {
        return resolve(this);
      }}
  });
  ReferenceEntity.prototype._onCollectionChanged = function(collection, added, removed) {
    var targetEntity = this._targetEntity;
    if (defined(targetEntity)) {
      if (removed.indexOf(targetEntity) !== -1) {
        this._resolveEntity = true;
      } else if (this._resolveEntity) {
        resolve(this);
        if (!this._resolveEntity) {
          this._definitionChanged.raiseEvent(this);
        }
      }
    }
  };
  return ReferenceEntity;
});

})();
(function() {
var define = $__System.amdDefine;
define("47", ["1a", "1b", "1c", "1d", "38", "36"], function(defined, defineProperties, DeveloperError, Event, RuntimeError, Property) {
  'use strict';
  function resolveEntity(that) {
    var entityIsResolved = true;
    if (that._resolveEntity) {
      var targetEntity = that._targetCollection.getById(that._targetId);
      if (defined(targetEntity)) {
        targetEntity.definitionChanged.addEventListener(ReferenceProperty.prototype._onTargetEntityDefinitionChanged, that);
        that._targetEntity = targetEntity;
        that._resolveEntity = false;
      } else {
        targetEntity = that._targetEntity;
        entityIsResolved = false;
      }
      if (!defined(targetEntity)) {
        throw new RuntimeError('target entity "' + that._targetId + '" could not be resolved.');
      }
    }
    return entityIsResolved;
  }
  function resolve(that) {
    var targetProperty = that._targetProperty;
    if (that._resolveProperty) {
      var entityIsResolved = resolveEntity(that);
      var names = that._targetPropertyNames;
      targetProperty = that._targetEntity;
      var length = names.length;
      for (var i = 0; i < length && defined(targetProperty); i++) {
        targetProperty = targetProperty[names[i]];
      }
      if (defined(targetProperty)) {
        that._targetProperty = targetProperty;
        that._resolveProperty = !entityIsResolved;
      } else if (!defined(that._targetProperty)) {
        throw new RuntimeError('targetProperty "' + that._targetId + '.' + names.join('.') + '" could not be resolved.');
      }
    }
    return targetProperty;
  }
  function ReferenceProperty(targetCollection, targetId, targetPropertyNames) {
    if (!defined(targetCollection)) {
      throw new DeveloperError('targetCollection is required.');
    }
    if (!defined(targetId) || targetId === '') {
      throw new DeveloperError('targetId is required.');
    }
    if (!defined(targetPropertyNames) || targetPropertyNames.length === 0) {
      throw new DeveloperError('targetPropertyNames is required.');
    }
    for (var i = 0; i < targetPropertyNames.length; i++) {
      var item = targetPropertyNames[i];
      if (!defined(item) || item === '') {
        throw new DeveloperError('reference contains invalid properties.');
      }
    }
    this._targetCollection = targetCollection;
    this._targetId = targetId;
    this._targetPropertyNames = targetPropertyNames;
    this._targetProperty = undefined;
    this._targetEntity = undefined;
    this._definitionChanged = new Event();
    this._resolveEntity = true;
    this._resolveProperty = true;
    targetCollection.collectionChanged.addEventListener(ReferenceProperty.prototype._onCollectionChanged, this);
  }
  defineProperties(ReferenceProperty.prototype, {
    isConstant: {get: function() {
        return Property.isConstant(resolve(this));
      }},
    definitionChanged: {get: function() {
        return this._definitionChanged;
      }},
    referenceFrame: {get: function() {
        return resolve(this).referenceFrame;
      }},
    targetId: {get: function() {
        return this._targetId;
      }},
    targetCollection: {get: function() {
        return this._targetCollection;
      }},
    targetPropertyNames: {get: function() {
        return this._targetPropertyNames;
      }},
    resolvedProperty: {get: function() {
        return resolve(this);
      }}
  });
  ReferenceProperty.fromString = function(targetCollection, referenceString) {
    if (!defined(targetCollection)) {
      throw new DeveloperError('targetCollection is required.');
    }
    if (!defined(referenceString)) {
      throw new DeveloperError('referenceString is required.');
    }
    var identifier;
    var values = [];
    var inIdentifier = true;
    var isEscaped = false;
    var token = '';
    for (var i = 0; i < referenceString.length; ++i) {
      var c = referenceString.charAt(i);
      if (isEscaped) {
        token += c;
        isEscaped = false;
      } else if (c === '\\') {
        isEscaped = true;
      } else if (inIdentifier && c === '#') {
        identifier = token;
        inIdentifier = false;
        token = '';
      } else if (!inIdentifier && c === '.') {
        values.push(token);
        token = '';
      } else {
        token += c;
      }
    }
    values.push(token);
    return new ReferenceProperty(targetCollection, identifier, values);
  };
  ReferenceProperty.prototype.getValue = function(time, result) {
    return resolve(this).getValue(time, result);
  };
  ReferenceProperty.prototype.getValueInReferenceFrame = function(time, referenceFrame, result) {
    return resolve(this).getValueInReferenceFrame(time, referenceFrame, result);
  };
  ReferenceProperty.prototype.getType = function(time) {
    return resolve(this).getType(time);
  };
  ReferenceProperty.prototype.equals = function(other) {
    if (this === other) {
      return true;
    }
    var names = this._targetPropertyNames;
    var otherNames = other._targetPropertyNames;
    if (this._targetCollection !== other._targetCollection || this._targetId !== other._targetId || names.length !== otherNames.length) {
      return false;
    }
    var length = this._targetPropertyNames.length;
    for (var i = 0; i < length; i++) {
      if (names[i] !== otherNames[i]) {
        return false;
      }
    }
    return true;
  };
  ReferenceProperty.prototype._onTargetEntityDefinitionChanged = function(targetEntity, name, value, oldValue) {
    if (this._targetPropertyNames[0] === name) {
      this._resolveProperty = true;
      this._definitionChanged.raiseEvent(this);
    }
  };
  ReferenceProperty.prototype._onCollectionChanged = function(collection, added, removed) {
    var targetEntity = this._targetEntity;
    if (defined(targetEntity)) {
      if (removed.indexOf(targetEntity) !== -1) {
        targetEntity.definitionChanged.removeEventListener(ReferenceProperty.prototype._onTargetEntityDefinitionChanged, this);
        this._resolveEntity = true;
        this._resolveProperty = true;
      } else if (this._resolveEntity) {
        resolve(this);
        if (!this._resolveEntity) {
          this._definitionChanged.raiseEvent(this);
        }
      }
    }
  };
  return ReferenceProperty;
});

})();
(function() {
var define = $__System.amdDefine;
define("2d", ["1f"], function(freezeObject) {
  'use strict';
  var ReferenceFrame = {
    FIXED: 0,
    INERTIAL: 1
  };
  return freezeObject(ReferenceFrame);
});

})();
(function() {
var define = $__System.amdDefine;
define("2e", ["2c", "1a", "1b", "1c", "32", "33", "34", "2d", "35"], function(Cartesian3, defined, defineProperties, DeveloperError, Matrix3, Matrix4, Quaternion, ReferenceFrame, Transforms) {
  'use strict';
  function PositionProperty() {
    DeveloperError.throwInstantiationError();
  }
  defineProperties(PositionProperty.prototype, {
    isConstant: {get: DeveloperError.throwInstantiationError},
    definitionChanged: {get: DeveloperError.throwInstantiationError},
    referenceFrame: {get: DeveloperError.throwInstantiationError}
  });
  PositionProperty.prototype.getValue = DeveloperError.throwInstantiationError;
  PositionProperty.prototype.getValueInReferenceFrame = DeveloperError.throwInstantiationError;
  PositionProperty.prototype.equals = DeveloperError.throwInstantiationError;
  function framesEqual(frame1, frame2) {
    return frame1 && frame1.id ? frame1.id === (frame2 && frame2.id) : frame1 === frame2;
  }
  function frameParents(frame) {
    var frames = [];
    while (defined(frame)) {
      frames.unshift(frame);
      frame = frame.position && frame.position.referenceFrame;
    }
    return frames;
  }
  function lowestCommonAncestor(parents1, parents2) {
    if (!framesEqual(parents1[0], parents2[0])) {
      return -1;
    }
    var h = Math.min(parents1.length, parents2.length);
    for (var i = 0; i <= h; i++) {
      if (!framesEqual(parents1[i], parents2[i])) {
        return i - 1;
      }
    }
    return -1;
  }
  var scratchIcrfToFixedMatrix3 = new Matrix3();
  function getIcrfToFixed(time) {
    var icrfToFixed = Transforms.computeIcrfToFixedMatrix(time, scratchIcrfToFixedMatrix3);
    if (!defined(icrfToFixed)) {
      icrfToFixed = Transforms.computeTemeToPseudoFixedMatrix(time, scratchIcrfToFixedMatrix3);
    }
    return icrfToFixed;
  }
  var scratchMatrix3 = new Matrix3();
  var scratchCartesian3 = new Cartesian3();
  var scratchQuaternion = new Quaternion();
  PositionProperty.convertToReferenceFrame = function(time, value, inputFrame, outputFrame, result) {
    if (!defined(value)) {
      return value;
    }
    if (!defined(result)) {
      result = new Cartesian3();
    }
    if (inputFrame === outputFrame) {
      return Cartesian3.clone(value, result);
    }
    if (!defined(inputFrame) || !defined(outputFrame)) {
      return undefined;
    }
    var inputFrameParents = frameParents(inputFrame);
    var outputFrameParents = frameParents(outputFrame);
    var lcaIndex = lowestCommonAncestor(inputFrameParents, outputFrameParents);
    var lcaFrame = inputFrameParents[lcaIndex];
    var inputPositionAccumulator = function(accumulatedPositionValue, frame) {
      if (!defined(accumulatedPositionValue)) {
        return accumulatedPositionValue;
      }
      var framePositionProperty = frame.position;
      if (!defined(framePositionProperty)) {
        return undefined;
      }
      var frameReferenceFrame = framePositionProperty.referenceFrame;
      var framePositionValue = framePositionProperty.getValueInReferenceFrame(time, frameReferenceFrame, scratchCartesian3);
      if (!defined(framePositionValue)) {
        return undefined;
      }
      var frameOrientationProperty = frame.orientation;
      if (defined(frameOrientationProperty)) {
        var frameOrientationValue = frameOrientationProperty.getValue(time, scratchQuaternion);
        if (!defined(frameOrientationValue)) {
          return undefined;
        }
        Matrix3.fromQuaternion(frameOrientationValue, scratchMatrix3);
        Matrix3.multiplyByVector(scratchMatrix3, accumulatedPositionValue, accumulatedPositionValue);
        return Cartesian3.add(framePositionValue, accumulatedPositionValue, accumulatedPositionValue);
      }
      return Cartesian3.add(framePositionValue, accumulatedPositionValue, accumulatedPositionValue);
    };
    var outputPositionAccumulator = function(accumulatedPositionValue, frame) {
      if (!defined(accumulatedPositionValue)) {
        return accumulatedPositionValue;
      }
      var framePositionProperty = frame.position;
      if (!defined(framePositionProperty)) {
        return undefined;
      }
      var frameReferenceFrame = framePositionProperty.referenceFrame;
      var framePositionValue = framePositionProperty.getValueInReferenceFrame(time, frameReferenceFrame, scratchCartesian3);
      if (!defined(framePositionValue)) {
        return undefined;
      }
      accumulatedPositionValue = Cartesian3.subtract(accumulatedPositionValue, framePositionValue, accumulatedPositionValue);
      var frameOrientationProperty = frame.orientation;
      if (defined(frameOrientationProperty)) {
        var frameOrientationValue = frameOrientationProperty.getValue(time, scratchQuaternion);
        if (!defined(frameOrientationValue)) {
          return undefined;
        }
        Quaternion.conjugate(frameOrientationValue, frameOrientationValue);
        Matrix3.fromQuaternion(frameOrientationValue, scratchMatrix3);
        Matrix3.multiplyByVector(scratchMatrix3, accumulatedPositionValue, accumulatedPositionValue);
      }
      return accumulatedPositionValue;
    };
    if (defined(lcaFrame)) {
      inputFrameParents = inputFrameParents.slice(lcaIndex + 1);
      outputFrameParents = outputFrameParents.slice(lcaIndex + 1);
      var lcaFrameValue = inputFrameParents.reduceRight(inputPositionAccumulator, Cartesian3.clone(value, result));
      if (!defined(lcaFrameValue)) {
        return undefined;
      }
      return outputFrameParents.reduce(outputPositionAccumulator, lcaFrameValue);
    }
    var inputRootFrame = inputFrameParents.shift();
    var outputRootFrame = outputFrameParents.shift();
    var fixedFrameValue,
        inertialFrameValue;
    if (inputRootFrame === ReferenceFrame.INERTIAL && outputRootFrame === ReferenceFrame.FIXED) {
      inertialFrameValue = inputFrameParents.reduceRight(inputPositionAccumulator, Cartesian3.clone(value, result));
      if (!defined(inertialFrameValue)) {
        return undefined;
      }
      fixedFrameValue = Matrix3.multiplyByVector(getIcrfToFixed(time), inertialFrameValue, result);
      return outputFrameParents.reduce(outputPositionAccumulator, fixedFrameValue);
    }
    if (inputRootFrame === ReferenceFrame.FIXED && outputRootFrame === ReferenceFrame.INERTIAL) {
      fixedFrameValue = inputFrameParents.reduceRight(inputPositionAccumulator, Cartesian3.clone(value, result));
      if (!defined(fixedFrameValue)) {
        return undefined;
      }
      var fixedToIcrf = Matrix3.transpose(getIcrfToFixed(time), scratchMatrix3);
      inertialFrameValue = Matrix3.multiplyByVector(fixedToIcrf, fixedFrameValue, result);
      return outputFrameParents.reduce(outputPositionAccumulator, inertialFrameValue);
    }
    return undefined;
  };
  return PositionProperty;
});

})();
(function() {
var define = $__System.amdDefine;
define("39", ["23", "1a", "1b", "1c", "1f", "24"], function(defaultValue, defined, defineProperties, DeveloperError, freezeObject, JulianDate) {
  'use strict';
  function TimeInterval(options) {
    options = defaultValue(options, defaultValue.EMPTY_OBJECT);
    this.start = defined(options.start) ? JulianDate.clone(options.start) : new JulianDate();
    this.stop = defined(options.stop) ? JulianDate.clone(options.stop) : new JulianDate();
    this.data = options.data;
    this.isStartIncluded = defaultValue(options.isStartIncluded, true);
    this.isStopIncluded = defaultValue(options.isStopIncluded, true);
  }
  defineProperties(TimeInterval.prototype, {isEmpty: {get: function() {
        var stopComparedToStart = JulianDate.compare(this.stop, this.start);
        return stopComparedToStart < 0 || (stopComparedToStart === 0 && (!this.isStartIncluded || !this.isStopIncluded));
      }}});
  var scratchInterval = {
    start: undefined,
    stop: undefined,
    isStartIncluded: undefined,
    isStopIncluded: undefined,
    data: undefined
  };
  TimeInterval.fromIso8601 = function(options, result) {
    if (!defined(options)) {
      throw new DeveloperError('options is required.');
    }
    if (!defined(options.iso8601)) {
      throw new DeveloperError('options.iso8601 is required.');
    }
    var dates = options.iso8601.split('/');
    var start = JulianDate.fromIso8601(dates[0]);
    var stop = JulianDate.fromIso8601(dates[1]);
    var isStartIncluded = defaultValue(options.isStartIncluded, true);
    var isStopIncluded = defaultValue(options.isStopIncluded, true);
    var data = options.data;
    if (!defined(result)) {
      scratchInterval.start = start;
      scratchInterval.stop = stop;
      scratchInterval.isStartIncluded = isStartIncluded;
      scratchInterval.isStopIncluded = isStopIncluded;
      scratchInterval.data = data;
      return new TimeInterval(scratchInterval);
    }
    result.start = start;
    result.stop = stop;
    result.isStartIncluded = isStartIncluded;
    result.isStopIncluded = isStopIncluded;
    result.data = data;
    return result;
  };
  TimeInterval.toIso8601 = function(timeInterval, precision) {
    if (!defined(timeInterval)) {
      throw new DeveloperError('timeInterval is required.');
    }
    return JulianDate.toIso8601(timeInterval.start, precision) + '/' + JulianDate.toIso8601(timeInterval.stop, precision);
  };
  TimeInterval.clone = function(timeInterval, result) {
    if (!defined(timeInterval)) {
      return undefined;
    }
    if (!defined(result)) {
      return new TimeInterval(timeInterval);
    }
    result.start = timeInterval.start;
    result.stop = timeInterval.stop;
    result.isStartIncluded = timeInterval.isStartIncluded;
    result.isStopIncluded = timeInterval.isStopIncluded;
    result.data = timeInterval.data;
    return result;
  };
  TimeInterval.equals = function(left, right, dataComparer) {
    return left === right || defined(left) && defined(right) && (left.isEmpty && right.isEmpty || left.isStartIncluded === right.isStartIncluded && left.isStopIncluded === right.isStopIncluded && JulianDate.equals(left.start, right.start) && JulianDate.equals(left.stop, right.stop) && (left.data === right.data || (defined(dataComparer) && dataComparer(left.data, right.data))));
  };
  TimeInterval.equalsEpsilon = function(left, right, epsilon, dataComparer) {
    if (typeof epsilon !== 'number') {
      throw new DeveloperError('epsilon is required and must be a number.');
    }
    return left === right || defined(left) && defined(right) && (left.isEmpty && right.isEmpty || left.isStartIncluded === right.isStartIncluded && left.isStopIncluded === right.isStopIncluded && JulianDate.equalsEpsilon(left.start, right.start, epsilon) && JulianDate.equalsEpsilon(left.stop, right.stop, epsilon) && (left.data === right.data || (defined(dataComparer) && dataComparer(left.data, right.data))));
  };
  TimeInterval.intersect = function(left, right, result, mergeCallback) {
    if (!defined(left)) {
      throw new DeveloperError('left is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    if (!defined(right)) {
      return TimeInterval.clone(TimeInterval.EMPTY, result);
    }
    var leftStart = left.start;
    var leftStop = left.stop;
    var rightStart = right.start;
    var rightStop = right.stop;
    var intersectsStartRight = JulianDate.greaterThanOrEquals(rightStart, leftStart) && JulianDate.greaterThanOrEquals(leftStop, rightStart);
    var intersectsStartLeft = !intersectsStartRight && JulianDate.lessThanOrEquals(rightStart, leftStart) && JulianDate.lessThanOrEquals(leftStart, rightStop);
    if (!intersectsStartRight && !intersectsStartLeft) {
      return TimeInterval.clone(TimeInterval.EMPTY, result);
    }
    var leftIsStartIncluded = left.isStartIncluded;
    var leftIsStopIncluded = left.isStopIncluded;
    var rightIsStartIncluded = right.isStartIncluded;
    var rightIsStopIncluded = right.isStopIncluded;
    var leftLessThanRight = JulianDate.lessThan(leftStop, rightStop);
    result.start = intersectsStartRight ? rightStart : leftStart;
    result.isStartIncluded = (leftIsStartIncluded && rightIsStartIncluded) || (!JulianDate.equals(rightStart, leftStart) && ((intersectsStartRight && rightIsStartIncluded) || (intersectsStartLeft && leftIsStartIncluded)));
    result.stop = leftLessThanRight ? leftStop : rightStop;
    result.isStopIncluded = leftLessThanRight ? leftIsStopIncluded : (leftIsStopIncluded && rightIsStopIncluded) || (!JulianDate.equals(rightStop, leftStop) && rightIsStopIncluded);
    result.data = defined(mergeCallback) ? mergeCallback(left.data, right.data) : left.data;
    return result;
  };
  TimeInterval.contains = function(timeInterval, julianDate) {
    if (!defined(timeInterval)) {
      throw new DeveloperError('timeInterval is required.');
    }
    if (!defined(julianDate)) {
      throw new DeveloperError('julianDate is required.');
    }
    if (timeInterval.isEmpty) {
      return false;
    }
    var startComparedToDate = JulianDate.compare(timeInterval.start, julianDate);
    if (startComparedToDate === 0) {
      return timeInterval.isStartIncluded;
    }
    var dateComparedToStop = JulianDate.compare(julianDate, timeInterval.stop);
    if (dateComparedToStop === 0) {
      return timeInterval.isStopIncluded;
    }
    return startComparedToDate < 0 && dateComparedToStop < 0;
  };
  TimeInterval.prototype.clone = function(result) {
    return TimeInterval.clone(this, result);
  };
  TimeInterval.prototype.equals = function(right, dataComparer) {
    return TimeInterval.equals(this, right, dataComparer);
  };
  TimeInterval.prototype.equalsEpsilon = function(right, epsilon, dataComparer) {
    return TimeInterval.equalsEpsilon(this, right, epsilon, dataComparer);
  };
  TimeInterval.prototype.toString = function() {
    return TimeInterval.toIso8601(this);
  };
  TimeInterval.EMPTY = freezeObject(new TimeInterval({
    start: new JulianDate(),
    stop: new JulianDate(),
    isStartIncluded: false,
    isStopIncluded: false
  }));
  return TimeInterval;
});

})();
(function() {
var define = $__System.amdDefine;
define("37", ["1f", "24", "39"], function(freezeObject, JulianDate, TimeInterval) {
  'use strict';
  var MINIMUM_VALUE = freezeObject(JulianDate.fromIso8601('0000-01-01T00:00:00Z'));
  var MAXIMUM_VALUE = freezeObject(JulianDate.fromIso8601('9999-12-31T24:00:00Z'));
  var MAXIMUM_INTERVAL = freezeObject(new TimeInterval({
    start: MINIMUM_VALUE,
    stop: MAXIMUM_VALUE
  }));
  var Iso8601 = {
    MINIMUM_VALUE: MINIMUM_VALUE,
    MAXIMUM_VALUE: MAXIMUM_VALUE,
    MAXIMUM_INTERVAL: MAXIMUM_INTERVAL
  };
  return Iso8601;
});

})();
(function() {
var define = $__System.amdDefine;
define("36", ["23", "1a", "1b", "1c", "37"], function(defaultValue, defined, defineProperties, DeveloperError, Iso8601) {
  'use strict';
  function Property() {
    DeveloperError.throwInstantiationError();
  }
  defineProperties(Property.prototype, {
    isConstant: {get: DeveloperError.throwInstantiationError},
    definitionChanged: {get: DeveloperError.throwInstantiationError}
  });
  Property.prototype.getValue = DeveloperError.throwInstantiationError;
  Property.prototype.equals = DeveloperError.throwInstantiationError;
  Property.equals = function(left, right) {
    return left === right || (defined(left) && left.equals(right));
  };
  Property.arrayEquals = function(left, right) {
    if (left === right) {
      return true;
    }
    if ((!defined(left) || !defined(right)) || (left.length !== right.length)) {
      return false;
    }
    var length = left.length;
    for (var i = 0; i < length; i++) {
      if (!Property.equals(left[i], right[i])) {
        return false;
      }
    }
    return true;
  };
  Property.isConstant = function(property) {
    return !defined(property) || property.isConstant;
  };
  Property.getValueOrUndefined = function(property, time, result) {
    return defined(property) ? property.getValue(time, result) : undefined;
  };
  Property.getValueOrDefault = function(property, time, valueDefault, result) {
    return defined(property) ? defaultValue(property.getValue(time, result), valueDefault) : valueDefault;
  };
  Property.getValueOrClonedDefault = function(property, time, valueDefault, result) {
    var value;
    if (defined(property)) {
      value = property.getValue(time, result);
    }
    if (!defined(value)) {
      value = valueDefault.clone(value);
    }
    return value;
  };
  return Property;
});

})();
(function() {
var define = $__System.amdDefine;
define("48", ["2c", "23", "1a", "1b", "1c", "1d", "2d", "2e", "36", "49"], function(Cartesian3, defaultValue, defined, defineProperties, DeveloperError, Event, ReferenceFrame, PositionProperty, Property, SampledProperty) {
  'use strict';
  function SampledPositionProperty(referenceFrame, numberOfDerivatives) {
    numberOfDerivatives = defaultValue(numberOfDerivatives, 0);
    var derivativeTypes;
    if (numberOfDerivatives > 0) {
      derivativeTypes = new Array(numberOfDerivatives);
      for (var i = 0; i < numberOfDerivatives; i++) {
        derivativeTypes[i] = Cartesian3;
      }
    }
    this._numberOfDerivatives = numberOfDerivatives;
    this._property = new SampledProperty(Cartesian3, derivativeTypes);
    this._definitionChanged = new Event();
    this._referenceFrame = defaultValue(referenceFrame, ReferenceFrame.FIXED);
    this._property._definitionChanged.addEventListener(function() {
      this._definitionChanged.raiseEvent(this);
    }, this);
  }
  defineProperties(SampledPositionProperty.prototype, {
    isConstant: {get: function() {
        return this._property.isConstant;
      }},
    definitionChanged: {get: function() {
        return this._definitionChanged;
      }},
    referenceFrame: {get: function() {
        return this._referenceFrame;
      }},
    interpolationDegree: {get: function() {
        return this._property.interpolationDegree;
      }},
    interpolationAlgorithm: {get: function() {
        return this._property.interpolationAlgorithm;
      }},
    numberOfDerivatives: {get: function() {
        return this._numberOfDerivatives;
      }},
    forwardExtrapolationType: {
      get: function() {
        return this._property.forwardExtrapolationType;
      },
      set: function(value) {
        this._property.forwardExtrapolationType = value;
      }
    },
    forwardExtrapolationDuration: {
      get: function() {
        return this._property.forwardExtrapolationDuration;
      },
      set: function(value) {
        this._property.forwardExtrapolationDuration = value;
      }
    },
    backwardExtrapolationType: {
      get: function() {
        return this._property.backwardExtrapolationType;
      },
      set: function(value) {
        this._property.backwardExtrapolationType = value;
      }
    },
    backwardExtrapolationDuration: {
      get: function() {
        return this._property.backwardExtrapolationDuration;
      },
      set: function(value) {
        this._property.backwardExtrapolationDuration = value;
      }
    }
  });
  SampledPositionProperty.prototype.getValue = function(time, result) {
    return this.getValueInReferenceFrame(time, ReferenceFrame.FIXED, result);
  };
  SampledPositionProperty.prototype.getValueInReferenceFrame = function(time, referenceFrame, result) {
    if (!defined(time)) {
      throw new DeveloperError('time is required.');
    }
    if (!defined(referenceFrame)) {
      throw new DeveloperError('referenceFrame is required.');
    }
    result = this._property.getValue(time, result);
    if (defined(result)) {
      return PositionProperty.convertToReferenceFrame(time, result, this._referenceFrame, referenceFrame, result);
    }
    return undefined;
  };
  SampledPositionProperty.prototype.setInterpolationOptions = function(options) {
    this._property.setInterpolationOptions(options);
  };
  SampledPositionProperty.prototype.addSample = function(time, position, derivatives) {
    var numberOfDerivatives = this._numberOfDerivatives;
    if (numberOfDerivatives > 0 && (!defined(derivatives) || derivatives.length !== numberOfDerivatives)) {
      throw new DeveloperError('derivatives length must be equal to the number of derivatives.');
    }
    this._property.addSample(time, position, derivatives);
  };
  SampledPositionProperty.prototype.addSamples = function(times, positions, derivatives) {
    this._property.addSamples(times, positions, derivatives);
  };
  SampledPositionProperty.prototype.addSamplesPackedArray = function(data, epoch) {
    this._property.addSamplesPackedArray(data, epoch);
  };
  SampledPositionProperty.prototype.equals = function(other) {
    return this === other || (other instanceof SampledPositionProperty && Property.equals(this._property, other._property) && this._referenceFrame === other._referenceFrame);
  };
  return SampledPositionProperty;
});

})();
(function() {
var define = $__System.amdDefine;
define("1d", ["1a", "1b", "1c"], function(defined, defineProperties, DeveloperError) {
  'use strict';
  function Event() {
    this._listeners = [];
    this._scopes = [];
    this._toRemove = [];
    this._insideRaiseEvent = false;
  }
  defineProperties(Event.prototype, {numberOfListeners: {get: function() {
        return this._listeners.length - this._toRemove.length;
      }}});
  Event.prototype.addEventListener = function(listener, scope) {
    if (typeof listener !== 'function') {
      throw new DeveloperError('listener is required and must be a function.');
    }
    this._listeners.push(listener);
    this._scopes.push(scope);
    var event = this;
    return function() {
      event.removeEventListener(listener, scope);
    };
  };
  Event.prototype.removeEventListener = function(listener, scope) {
    if (typeof listener !== 'function') {
      throw new DeveloperError('listener is required and must be a function.');
    }
    var listeners = this._listeners;
    var scopes = this._scopes;
    var index = -1;
    for (var i = 0; i < listeners.length; i++) {
      if (listeners[i] === listener && scopes[i] === scope) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      if (this._insideRaiseEvent) {
        this._toRemove.push(index);
        listeners[index] = undefined;
        scopes[index] = undefined;
      } else {
        listeners.splice(index, 1);
        scopes.splice(index, 1);
      }
      return true;
    }
    return false;
  };
  Event.prototype.raiseEvent = function() {
    this._insideRaiseEvent = true;
    var i;
    var listeners = this._listeners;
    var scopes = this._scopes;
    var length = listeners.length;
    for (i = 0; i < length; i++) {
      var listener = listeners[i];
      if (defined(listener)) {
        listeners[i].apply(scopes[i], arguments);
      }
    }
    var toRemove = this._toRemove;
    length = toRemove.length;
    for (i = 0; i < length; i++) {
      var index = toRemove[i];
      listeners.splice(index, 1);
      scopes.splice(index, 1);
    }
    toRemove.length = 0;
    this._insideRaiseEvent = false;
  };
  return Event;
});

})();
(function() {
var define = $__System.amdDefine;
define("4a", ["1f"], function(freezeObject) {
  'use strict';
  var ExtrapolationType = {
    NONE: 0,
    HOLD: 1,
    EXTRAPOLATE: 2
  };
  return freezeObject(ExtrapolationType);
});

})();
(function() {
var define = $__System.amdDefine;
define("4b", ["1a", "1c"], function(defined, DeveloperError) {
  'use strict';
  var LinearApproximation = {type: 'Linear'};
  LinearApproximation.getRequiredDataPoints = function(degree) {
    return 2;
  };
  LinearApproximation.interpolateOrderZero = function(x, xTable, yTable, yStride, result) {
    if (xTable.length !== 2) {
      throw new DeveloperError('The xTable provided to the linear interpolator must have exactly two elements.');
    } else if (yStride <= 0) {
      throw new DeveloperError('There must be at least 1 dependent variable for each independent variable.');
    }
    if (!defined(result)) {
      result = new Array(yStride);
    }
    var i;
    var y0;
    var y1;
    var x0 = xTable[0];
    var x1 = xTable[1];
    if (x0 === x1) {
      throw new DeveloperError('Divide by zero error: xTable[0] and xTable[1] are equal');
    }
    for (i = 0; i < yStride; i++) {
      y0 = yTable[i];
      y1 = yTable[i + yStride];
      result[i] = (((y1 - y0) * x) + (x1 * y0) - (x0 * y1)) / (x1 - x0);
    }
    return result;
  };
  return LinearApproximation;
});

})();
(function() {
var define = $__System.amdDefine;
define("49", ["4c", "23", "1a", "1b", "1c", "1d", "4a", "24", "4b"], function(binarySearch, defaultValue, defined, defineProperties, DeveloperError, Event, ExtrapolationType, JulianDate, LinearApproximation) {
  'use strict';
  var PackableNumber = {
    packedLength: 1,
    pack: function(value, array, startingIndex) {
      startingIndex = defaultValue(startingIndex, 0);
      array[startingIndex] = value;
    },
    unpack: function(array, startingIndex, result) {
      startingIndex = defaultValue(startingIndex, 0);
      return array[startingIndex];
    }
  };
  function arrayInsert(array, startIndex, items) {
    var i;
    var arrayLength = array.length;
    var itemsLength = items.length;
    var newLength = arrayLength + itemsLength;
    array.length = newLength;
    if (arrayLength !== startIndex) {
      var q = arrayLength - 1;
      for (i = newLength - 1; i >= startIndex; i--) {
        array[i] = array[q--];
      }
    }
    for (i = 0; i < itemsLength; i++) {
      array[startIndex++] = items[i];
    }
  }
  function convertDate(date, epoch) {
    if (date instanceof JulianDate) {
      return date;
    }
    if (typeof date === 'string') {
      return JulianDate.fromIso8601(date);
    }
    return JulianDate.addSeconds(epoch, date, new JulianDate());
  }
  var timesSpliceArgs = [];
  var valuesSpliceArgs = [];
  function mergeNewSamples(epoch, times, values, newData, packedLength) {
    var newDataIndex = 0;
    var i;
    var prevItem;
    var timesInsertionPoint;
    var valuesInsertionPoint;
    var currentTime;
    var nextTime;
    while (newDataIndex < newData.length) {
      currentTime = convertDate(newData[newDataIndex], epoch);
      timesInsertionPoint = binarySearch(times, currentTime, JulianDate.compare);
      var timesSpliceArgsCount = 0;
      var valuesSpliceArgsCount = 0;
      if (timesInsertionPoint < 0) {
        timesInsertionPoint = ~timesInsertionPoint;
        valuesInsertionPoint = timesInsertionPoint * packedLength;
        prevItem = undefined;
        nextTime = times[timesInsertionPoint];
        while (newDataIndex < newData.length) {
          currentTime = convertDate(newData[newDataIndex], epoch);
          if ((defined(prevItem) && JulianDate.compare(prevItem, currentTime) >= 0) || (defined(nextTime) && JulianDate.compare(currentTime, nextTime) >= 0)) {
            break;
          }
          timesSpliceArgs[timesSpliceArgsCount++] = currentTime;
          newDataIndex = newDataIndex + 1;
          for (i = 0; i < packedLength; i++) {
            valuesSpliceArgs[valuesSpliceArgsCount++] = newData[newDataIndex];
            newDataIndex = newDataIndex + 1;
          }
          prevItem = currentTime;
        }
        if (timesSpliceArgsCount > 0) {
          valuesSpliceArgs.length = valuesSpliceArgsCount;
          arrayInsert(values, valuesInsertionPoint, valuesSpliceArgs);
          timesSpliceArgs.length = timesSpliceArgsCount;
          arrayInsert(times, timesInsertionPoint, timesSpliceArgs);
        }
      } else {
        for (i = 0; i < packedLength; i++) {
          newDataIndex++;
          values[(timesInsertionPoint * packedLength) + i] = newData[newDataIndex];
        }
        newDataIndex++;
      }
    }
  }
  function SampledProperty(type, derivativeTypes) {
    if (!defined(type)) {
      throw new DeveloperError('type is required.');
    }
    var innerType = type;
    if (innerType === Number) {
      innerType = PackableNumber;
    }
    var packedLength = innerType.packedLength;
    var packedInterpolationLength = defaultValue(innerType.packedInterpolationLength, packedLength);
    var inputOrder = 0;
    var innerDerivativeTypes;
    if (defined(derivativeTypes)) {
      var length = derivativeTypes.length;
      innerDerivativeTypes = new Array(length);
      for (var i = 0; i < length; i++) {
        var derivativeType = derivativeTypes[i];
        if (derivativeType === Number) {
          derivativeType = PackableNumber;
        }
        var derivativePackedLength = derivativeType.packedLength;
        packedLength += derivativePackedLength;
        packedInterpolationLength += defaultValue(derivativeType.packedInterpolationLength, derivativePackedLength);
        innerDerivativeTypes[i] = derivativeType;
      }
      inputOrder = length;
    }
    this._type = type;
    this._innerType = innerType;
    this._interpolationDegree = 1;
    this._interpolationAlgorithm = LinearApproximation;
    this._numberOfPoints = 0;
    this._times = [];
    this._values = [];
    this._xTable = [];
    this._yTable = [];
    this._packedLength = packedLength;
    this._packedInterpolationLength = packedInterpolationLength;
    this._updateTableLength = true;
    this._interpolationResult = new Array(packedInterpolationLength);
    this._definitionChanged = new Event();
    this._derivativeTypes = derivativeTypes;
    this._innerDerivativeTypes = innerDerivativeTypes;
    this._inputOrder = inputOrder;
    this._forwardExtrapolationType = ExtrapolationType.NONE;
    this._forwardExtrapolationDuration = 0;
    this._backwardExtrapolationType = ExtrapolationType.NONE;
    this._backwardExtrapolationDuration = 0;
  }
  defineProperties(SampledProperty.prototype, {
    isConstant: {get: function() {
        return this._values.length === 0;
      }},
    definitionChanged: {get: function() {
        return this._definitionChanged;
      }},
    type: {get: function() {
        return this._type;
      }},
    derivativeTypes: {get: function() {
        return this._derivativeTypes;
      }},
    interpolationDegree: {get: function() {
        return this._interpolationDegree;
      }},
    interpolationAlgorithm: {get: function() {
        return this._interpolationAlgorithm;
      }},
    forwardExtrapolationType: {
      get: function() {
        return this._forwardExtrapolationType;
      },
      set: function(value) {
        if (this._forwardExtrapolationType !== value) {
          this._forwardExtrapolationType = value;
          this._definitionChanged.raiseEvent(this);
        }
      }
    },
    forwardExtrapolationDuration: {
      get: function() {
        return this._forwardExtrapolationDuration;
      },
      set: function(value) {
        if (this._forwardExtrapolationDuration !== value) {
          this._forwardExtrapolationDuration = value;
          this._definitionChanged.raiseEvent(this);
        }
      }
    },
    backwardExtrapolationType: {
      get: function() {
        return this._backwardExtrapolationType;
      },
      set: function(value) {
        if (this._backwardExtrapolationType !== value) {
          this._backwardExtrapolationType = value;
          this._definitionChanged.raiseEvent(this);
        }
      }
    },
    backwardExtrapolationDuration: {
      get: function() {
        return this._backwardExtrapolationDuration;
      },
      set: function(value) {
        if (this._backwardExtrapolationDuration !== value) {
          this._backwardExtrapolationDuration = value;
          this._definitionChanged.raiseEvent(this);
        }
      }
    }
  });
  SampledProperty.prototype.getValue = function(time, result) {
    if (!defined(time)) {
      throw new DeveloperError('time is required.');
    }
    var times = this._times;
    var timesLength = times.length;
    if (timesLength === 0) {
      return undefined;
    }
    var timeout;
    var innerType = this._innerType;
    var values = this._values;
    var index = binarySearch(times, time, JulianDate.compare);
    if (index < 0) {
      index = ~index;
      if (index === 0) {
        var startTime = times[index];
        timeout = this._backwardExtrapolationDuration;
        if (this._backwardExtrapolationType === ExtrapolationType.NONE || (timeout !== 0 && JulianDate.secondsDifference(startTime, time) > timeout)) {
          return undefined;
        }
        if (this._backwardExtrapolationType === ExtrapolationType.HOLD) {
          return innerType.unpack(values, 0, result);
        }
      }
      if (index >= timesLength) {
        index = timesLength - 1;
        var endTime = times[index];
        timeout = this._forwardExtrapolationDuration;
        if (this._forwardExtrapolationType === ExtrapolationType.NONE || (timeout !== 0 && JulianDate.secondsDifference(time, endTime) > timeout)) {
          return undefined;
        }
        if (this._forwardExtrapolationType === ExtrapolationType.HOLD) {
          index = timesLength - 1;
          return innerType.unpack(values, index * innerType.packedLength, result);
        }
      }
      var xTable = this._xTable;
      var yTable = this._yTable;
      var interpolationAlgorithm = this._interpolationAlgorithm;
      var packedInterpolationLength = this._packedInterpolationLength;
      var inputOrder = this._inputOrder;
      if (this._updateTableLength) {
        this._updateTableLength = false;
        var numberOfPoints = Math.min(interpolationAlgorithm.getRequiredDataPoints(this._interpolationDegree, inputOrder), timesLength);
        if (numberOfPoints !== this._numberOfPoints) {
          this._numberOfPoints = numberOfPoints;
          xTable.length = numberOfPoints;
          yTable.length = numberOfPoints * packedInterpolationLength;
        }
      }
      var degree = this._numberOfPoints - 1;
      if (degree < 1) {
        return undefined;
      }
      var firstIndex = 0;
      var lastIndex = timesLength - 1;
      var pointsInCollection = lastIndex - firstIndex + 1;
      if (pointsInCollection >= degree + 1) {
        var computedFirstIndex = index - ((degree / 2) | 0) - 1;
        if (computedFirstIndex < firstIndex) {
          computedFirstIndex = firstIndex;
        }
        var computedLastIndex = computedFirstIndex + degree;
        if (computedLastIndex > lastIndex) {
          computedLastIndex = lastIndex;
          computedFirstIndex = computedLastIndex - degree;
          if (computedFirstIndex < firstIndex) {
            computedFirstIndex = firstIndex;
          }
        }
        firstIndex = computedFirstIndex;
        lastIndex = computedLastIndex;
      }
      var length = lastIndex - firstIndex + 1;
      for (var i = 0; i < length; ++i) {
        xTable[i] = JulianDate.secondsDifference(times[firstIndex + i], times[lastIndex]);
      }
      if (!defined(innerType.convertPackedArrayForInterpolation)) {
        var destinationIndex = 0;
        var packedLength = this._packedLength;
        var sourceIndex = firstIndex * packedLength;
        var stop = (lastIndex + 1) * packedLength;
        while (sourceIndex < stop) {
          yTable[destinationIndex] = values[sourceIndex];
          sourceIndex++;
          destinationIndex++;
        }
      } else {
        innerType.convertPackedArrayForInterpolation(values, firstIndex, lastIndex, yTable);
      }
      var x = JulianDate.secondsDifference(time, times[lastIndex]);
      var interpolationResult;
      if (inputOrder === 0 || !defined(interpolationAlgorithm.interpolate)) {
        interpolationResult = interpolationAlgorithm.interpolateOrderZero(x, xTable, yTable, packedInterpolationLength, this._interpolationResult);
      } else {
        var yStride = Math.floor(packedInterpolationLength / (inputOrder + 1));
        interpolationResult = interpolationAlgorithm.interpolate(x, xTable, yTable, yStride, inputOrder, inputOrder, this._interpolationResult);
      }
      if (!defined(innerType.unpackInterpolationResult)) {
        return innerType.unpack(interpolationResult, 0, result);
      }
      return innerType.unpackInterpolationResult(interpolationResult, values, firstIndex, lastIndex, result);
    }
    return innerType.unpack(values, index * this._packedLength, result);
  };
  SampledProperty.prototype.setInterpolationOptions = function(options) {
    if (!defined(options)) {
      throw new DeveloperError('options is required.');
    }
    var valuesChanged = false;
    var interpolationAlgorithm = options.interpolationAlgorithm;
    var interpolationDegree = options.interpolationDegree;
    if (this._interpolationAlgorithm !== interpolationAlgorithm) {
      this._interpolationAlgorithm = interpolationAlgorithm;
      valuesChanged = true;
    }
    if (this._interpolationDegree !== interpolationDegree) {
      this._interpolationDegree = interpolationDegree;
      valuesChanged = true;
    }
    if (valuesChanged) {
      this._updateTableLength = true;
      this._definitionChanged.raiseEvent(this);
    }
  };
  SampledProperty.prototype.addSample = function(time, value, derivatives) {
    var innerDerivativeTypes = this._innerDerivativeTypes;
    var hasDerivatives = defined(innerDerivativeTypes);
    if (!defined(time)) {
      throw new DeveloperError('time is required.');
    }
    if (!defined(value)) {
      throw new DeveloperError('value is required.');
    }
    if (hasDerivatives && !defined(derivatives)) {
      throw new DeveloperError('derivatives is required.');
    }
    var innerType = this._innerType;
    var data = [];
    data.push(time);
    innerType.pack(value, data, data.length);
    if (hasDerivatives) {
      var derivativesLength = innerDerivativeTypes.length;
      for (var x = 0; x < derivativesLength; x++) {
        innerDerivativeTypes[x].pack(derivatives[x], data, data.length);
      }
    }
    mergeNewSamples(undefined, this._times, this._values, data, this._packedLength);
    this._updateTableLength = true;
    this._definitionChanged.raiseEvent(this);
  };
  SampledProperty.prototype.addSamples = function(times, values, derivativeValues) {
    var innerDerivativeTypes = this._innerDerivativeTypes;
    var hasDerivatives = defined(innerDerivativeTypes);
    if (!defined(times)) {
      throw new DeveloperError('times is required.');
    }
    if (!defined(values)) {
      throw new DeveloperError('values is required.');
    }
    if (times.length !== values.length) {
      throw new DeveloperError('times and values must be the same length.');
    }
    if (hasDerivatives && (!defined(derivativeValues) || derivativeValues.length !== times.length)) {
      throw new DeveloperError('times and derivativeValues must be the same length.');
    }
    var innerType = this._innerType;
    var length = times.length;
    var data = [];
    for (var i = 0; i < length; i++) {
      data.push(times[i]);
      innerType.pack(values[i], data, data.length);
      if (hasDerivatives) {
        var derivatives = derivativeValues[i];
        var derivativesLength = innerDerivativeTypes.length;
        for (var x = 0; x < derivativesLength; x++) {
          innerDerivativeTypes[x].pack(derivatives[x], data, data.length);
        }
      }
    }
    mergeNewSamples(undefined, this._times, this._values, data, this._packedLength);
    this._updateTableLength = true;
    this._definitionChanged.raiseEvent(this);
  };
  SampledProperty.prototype.addSamplesPackedArray = function(packedSamples, epoch) {
    if (!defined(packedSamples)) {
      throw new DeveloperError('packedSamples is required.');
    }
    mergeNewSamples(epoch, this._times, this._values, packedSamples, this._packedLength);
    this._updateTableLength = true;
    this._definitionChanged.raiseEvent(this);
  };
  SampledProperty.prototype.equals = function(other) {
    if (this === other) {
      return true;
    }
    if (!defined(other)) {
      return false;
    }
    if (this._type !== other._type || this._interpolationDegree !== other._interpolationDegree || this._interpolationAlgorithm !== other._interpolationAlgorithm) {
      return false;
    }
    var derivativeTypes = this._derivativeTypes;
    var hasDerivatives = defined(derivativeTypes);
    var otherDerivativeTypes = other._derivativeTypes;
    var otherHasDerivatives = defined(otherDerivativeTypes);
    if (hasDerivatives !== otherHasDerivatives) {
      return false;
    }
    var i;
    var length;
    if (hasDerivatives) {
      length = derivativeTypes.length;
      if (length !== otherDerivativeTypes.length) {
        return false;
      }
      for (i = 0; i < length; i++) {
        if (derivativeTypes[i] !== otherDerivativeTypes[i]) {
          return false;
        }
      }
    }
    var times = this._times;
    var otherTimes = other._times;
    length = times.length;
    if (length !== otherTimes.length) {
      return false;
    }
    for (i = 0; i < length; i++) {
      if (!JulianDate.equals(times[i], otherTimes[i])) {
        return false;
      }
    }
    var values = this._values;
    var otherValues = other._values;
    for (i = 0; i < length; i++) {
      if (values[i] !== otherValues[i]) {
        return false;
      }
    }
    return true;
  };
  SampledProperty._mergeNewSamples = mergeNewSamples;
  return SampledProperty;
});

})();
(function() {
var define = $__System.amdDefine;
define("45", ["23", "1a", "1c", "1f", "27"], function(defaultValue, defined, DeveloperError, freezeObject, CesiumMath) {
  'use strict';
  function Cartesian2(x, y) {
    this.x = defaultValue(x, 0.0);
    this.y = defaultValue(y, 0.0);
  }
  Cartesian2.fromElements = function(x, y, result) {
    if (!defined(result)) {
      return new Cartesian2(x, y);
    }
    result.x = x;
    result.y = y;
    return result;
  };
  Cartesian2.clone = function(cartesian, result) {
    if (!defined(cartesian)) {
      return undefined;
    }
    if (!defined(result)) {
      return new Cartesian2(cartesian.x, cartesian.y);
    }
    result.x = cartesian.x;
    result.y = cartesian.y;
    return result;
  };
  Cartesian2.fromCartesian3 = Cartesian2.clone;
  Cartesian2.fromCartesian4 = Cartesian2.clone;
  Cartesian2.packedLength = 2;
  Cartesian2.pack = function(value, array, startingIndex) {
    if (!defined(value)) {
      throw new DeveloperError('value is required');
    }
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    startingIndex = defaultValue(startingIndex, 0);
    array[startingIndex++] = value.x;
    array[startingIndex] = value.y;
  };
  Cartesian2.unpack = function(array, startingIndex, result) {
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    startingIndex = defaultValue(startingIndex, 0);
    if (!defined(result)) {
      result = new Cartesian2();
    }
    result.x = array[startingIndex++];
    result.y = array[startingIndex];
    return result;
  };
  Cartesian2.packArray = function(array, result) {
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    var length = array.length;
    if (!defined(result)) {
      result = new Array(length * 2);
    } else {
      result.length = length * 2;
    }
    for (var i = 0; i < length; ++i) {
      Cartesian2.pack(array[i], result, i * 2);
    }
    return result;
  };
  Cartesian2.unpackArray = function(array, result) {
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    var length = array.length;
    if (!defined(result)) {
      result = new Array(length / 2);
    } else {
      result.length = length / 2;
    }
    for (var i = 0; i < length; i += 2) {
      var index = i / 2;
      result[index] = Cartesian2.unpack(array, i, result[index]);
    }
    return result;
  };
  Cartesian2.fromArray = Cartesian2.unpack;
  Cartesian2.maximumComponent = function(cartesian) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    return Math.max(cartesian.x, cartesian.y);
  };
  Cartesian2.minimumComponent = function(cartesian) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    return Math.min(cartesian.x, cartesian.y);
  };
  Cartesian2.minimumByComponent = function(first, second, result) {
    if (!defined(first)) {
      throw new DeveloperError('first is required.');
    }
    if (!defined(second)) {
      throw new DeveloperError('second is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    result.x = Math.min(first.x, second.x);
    result.y = Math.min(first.y, second.y);
    return result;
  };
  Cartesian2.maximumByComponent = function(first, second, result) {
    if (!defined(first)) {
      throw new DeveloperError('first is required.');
    }
    if (!defined(second)) {
      throw new DeveloperError('second is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    result.x = Math.max(first.x, second.x);
    result.y = Math.max(first.y, second.y);
    return result;
  };
  Cartesian2.magnitudeSquared = function(cartesian) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    return cartesian.x * cartesian.x + cartesian.y * cartesian.y;
  };
  Cartesian2.magnitude = function(cartesian) {
    return Math.sqrt(Cartesian2.magnitudeSquared(cartesian));
  };
  var distanceScratch = new Cartesian2();
  Cartesian2.distance = function(left, right) {
    if (!defined(left) || !defined(right)) {
      throw new DeveloperError('left and right are required.');
    }
    Cartesian2.subtract(left, right, distanceScratch);
    return Cartesian2.magnitude(distanceScratch);
  };
  Cartesian2.distanceSquared = function(left, right) {
    if (!defined(left) || !defined(right)) {
      throw new DeveloperError('left and right are required.');
    }
    Cartesian2.subtract(left, right, distanceScratch);
    return Cartesian2.magnitudeSquared(distanceScratch);
  };
  Cartesian2.normalize = function(cartesian, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var magnitude = Cartesian2.magnitude(cartesian);
    result.x = cartesian.x / magnitude;
    result.y = cartesian.y / magnitude;
    return result;
  };
  Cartesian2.dot = function(left, right) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    return left.x * right.x + left.y * right.y;
  };
  Cartesian2.multiplyComponents = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = left.x * right.x;
    result.y = left.y * right.y;
    return result;
  };
  Cartesian2.add = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = left.x + right.x;
    result.y = left.y + right.y;
    return result;
  };
  Cartesian2.subtract = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = left.x - right.x;
    result.y = left.y - right.y;
    return result;
  };
  Cartesian2.multiplyByScalar = function(cartesian, scalar, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (typeof scalar !== 'number') {
      throw new DeveloperError('scalar is required and must be a number.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = cartesian.x * scalar;
    result.y = cartesian.y * scalar;
    return result;
  };
  Cartesian2.divideByScalar = function(cartesian, scalar, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (typeof scalar !== 'number') {
      throw new DeveloperError('scalar is required and must be a number.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = cartesian.x / scalar;
    result.y = cartesian.y / scalar;
    return result;
  };
  Cartesian2.negate = function(cartesian, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = -cartesian.x;
    result.y = -cartesian.y;
    return result;
  };
  Cartesian2.abs = function(cartesian, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = Math.abs(cartesian.x);
    result.y = Math.abs(cartesian.y);
    return result;
  };
  var lerpScratch = new Cartesian2();
  Cartesian2.lerp = function(start, end, t, result) {
    if (!defined(start)) {
      throw new DeveloperError('start is required.');
    }
    if (!defined(end)) {
      throw new DeveloperError('end is required.');
    }
    if (typeof t !== 'number') {
      throw new DeveloperError('t is required and must be a number.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    Cartesian2.multiplyByScalar(end, t, lerpScratch);
    result = Cartesian2.multiplyByScalar(start, 1.0 - t, result);
    return Cartesian2.add(lerpScratch, result, result);
  };
  var angleBetweenScratch = new Cartesian2();
  var angleBetweenScratch2 = new Cartesian2();
  Cartesian2.angleBetween = function(left, right) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    Cartesian2.normalize(left, angleBetweenScratch);
    Cartesian2.normalize(right, angleBetweenScratch2);
    return CesiumMath.acosClamped(Cartesian2.dot(angleBetweenScratch, angleBetweenScratch2));
  };
  var mostOrthogonalAxisScratch = new Cartesian2();
  Cartesian2.mostOrthogonalAxis = function(cartesian, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    var f = Cartesian2.normalize(cartesian, mostOrthogonalAxisScratch);
    Cartesian2.abs(f, f);
    if (f.x <= f.y) {
      result = Cartesian2.clone(Cartesian2.UNIT_X, result);
    } else {
      result = Cartesian2.clone(Cartesian2.UNIT_Y, result);
    }
    return result;
  };
  Cartesian2.equals = function(left, right) {
    return (left === right) || ((defined(left)) && (defined(right)) && (left.x === right.x) && (left.y === right.y));
  };
  Cartesian2.equalsArray = function(cartesian, array, offset) {
    return cartesian.x === array[offset] && cartesian.y === array[offset + 1];
  };
  Cartesian2.equalsEpsilon = function(left, right, relativeEpsilon, absoluteEpsilon) {
    return (left === right) || (defined(left) && defined(right) && CesiumMath.equalsEpsilon(left.x, right.x, relativeEpsilon, absoluteEpsilon) && CesiumMath.equalsEpsilon(left.y, right.y, relativeEpsilon, absoluteEpsilon));
  };
  Cartesian2.ZERO = freezeObject(new Cartesian2(0.0, 0.0));
  Cartesian2.UNIT_X = freezeObject(new Cartesian2(1.0, 0.0));
  Cartesian2.UNIT_Y = freezeObject(new Cartesian2(0.0, 1.0));
  Cartesian2.prototype.clone = function(result) {
    return Cartesian2.clone(this, result);
  };
  Cartesian2.prototype.equals = function(right) {
    return Cartesian2.equals(this, right);
  };
  Cartesian2.prototype.equalsEpsilon = function(right, relativeEpsilon, absoluteEpsilon) {
    return Cartesian2.equalsEpsilon(this, right, relativeEpsilon, absoluteEpsilon);
  };
  Cartesian2.prototype.toString = function() {
    return '(' + this.x + ', ' + this.y + ')';
  };
  return Cartesian2;
});

})();
(function() {
var define = $__System.amdDefine;
define("4d", ["4e", "4c", "23", "1a", "4f", "1f", "24", "50", "51", "38", "52", "53"], function(when, binarySearch, defaultValue, defined, EarthOrientationParametersSample, freezeObject, JulianDate, LeapSecond, loadJson, RuntimeError, TimeConstants, TimeStandard) {
  'use strict';
  function EarthOrientationParameters(options) {
    options = defaultValue(options, defaultValue.EMPTY_OBJECT);
    this._dates = undefined;
    this._samples = undefined;
    this._dateColumn = -1;
    this._xPoleWanderRadiansColumn = -1;
    this._yPoleWanderRadiansColumn = -1;
    this._ut1MinusUtcSecondsColumn = -1;
    this._xCelestialPoleOffsetRadiansColumn = -1;
    this._yCelestialPoleOffsetRadiansColumn = -1;
    this._taiMinusUtcSecondsColumn = -1;
    this._columnCount = 0;
    this._lastIndex = -1;
    this._downloadPromise = undefined;
    this._dataError = undefined;
    this._addNewLeapSeconds = defaultValue(options.addNewLeapSeconds, true);
    if (defined(options.data)) {
      onDataReady(this, options.data);
    } else if (defined(options.url)) {
      var that = this;
      this._downloadPromise = when(loadJson(options.url), function(eopData) {
        onDataReady(that, eopData);
      }, function() {
        that._dataError = 'An error occurred while retrieving the EOP data from the URL ' + options.url + '.';
      });
    } else {
      onDataReady(this, {
        'columnNames': ['dateIso8601', 'modifiedJulianDateUtc', 'xPoleWanderRadians', 'yPoleWanderRadians', 'ut1MinusUtcSeconds', 'lengthOfDayCorrectionSeconds', 'xCelestialPoleOffsetRadians', 'yCelestialPoleOffsetRadians', 'taiMinusUtcSeconds'],
        'samples': []
      });
    }
  }
  EarthOrientationParameters.NONE = freezeObject({
    getPromiseToLoad: function() {
      return when();
    },
    compute: function(date, result) {
      if (!defined(result)) {
        result = new EarthOrientationParametersSample(0.0, 0.0, 0.0, 0.0, 0.0);
      } else {
        result.xPoleWander = 0.0;
        result.yPoleWander = 0.0;
        result.xPoleOffset = 0.0;
        result.yPoleOffset = 0.0;
        result.ut1MinusUtc = 0.0;
      }
      return result;
    }
  });
  EarthOrientationParameters.prototype.getPromiseToLoad = function() {
    return when(this._downloadPromise);
  };
  EarthOrientationParameters.prototype.compute = function(date, result) {
    if (!defined(this._samples)) {
      if (defined(this._dataError)) {
        throw new RuntimeError(this._dataError);
      }
      return undefined;
    }
    if (!defined(result)) {
      result = new EarthOrientationParametersSample(0.0, 0.0, 0.0, 0.0, 0.0);
    }
    if (this._samples.length === 0) {
      result.xPoleWander = 0.0;
      result.yPoleWander = 0.0;
      result.xPoleOffset = 0.0;
      result.yPoleOffset = 0.0;
      result.ut1MinusUtc = 0.0;
      return result;
    }
    var dates = this._dates;
    var lastIndex = this._lastIndex;
    var before = 0;
    var after = 0;
    if (defined(lastIndex)) {
      var previousIndexDate = dates[lastIndex];
      var nextIndexDate = dates[lastIndex + 1];
      var isAfterPrevious = JulianDate.lessThanOrEquals(previousIndexDate, date);
      var isAfterLastSample = !defined(nextIndexDate);
      var isBeforeNext = isAfterLastSample || JulianDate.greaterThanOrEquals(nextIndexDate, date);
      if (isAfterPrevious && isBeforeNext) {
        before = lastIndex;
        if (!isAfterLastSample && nextIndexDate.equals(date)) {
          ++before;
        }
        after = before + 1;
        interpolate(this, dates, this._samples, date, before, after, result);
        return result;
      }
    }
    var index = binarySearch(dates, date, JulianDate.compare, this._dateColumn);
    if (index >= 0) {
      if (index < dates.length - 1 && dates[index + 1].equals(date)) {
        ++index;
      }
      before = index;
      after = index;
    } else {
      after = ~index;
      before = after - 1;
      if (before < 0) {
        before = 0;
      }
    }
    this._lastIndex = before;
    interpolate(this, dates, this._samples, date, before, after, result);
    return result;
  };
  function compareLeapSecondDates(leapSecond, dateToFind) {
    return JulianDate.compare(leapSecond.julianDate, dateToFind);
  }
  function onDataReady(eop, eopData) {
    if (!defined(eopData.columnNames)) {
      eop._dataError = 'Error in loaded EOP data: The columnNames property is required.';
      return;
    }
    if (!defined(eopData.samples)) {
      eop._dataError = 'Error in loaded EOP data: The samples property is required.';
      return;
    }
    var dateColumn = eopData.columnNames.indexOf('modifiedJulianDateUtc');
    var xPoleWanderRadiansColumn = eopData.columnNames.indexOf('xPoleWanderRadians');
    var yPoleWanderRadiansColumn = eopData.columnNames.indexOf('yPoleWanderRadians');
    var ut1MinusUtcSecondsColumn = eopData.columnNames.indexOf('ut1MinusUtcSeconds');
    var xCelestialPoleOffsetRadiansColumn = eopData.columnNames.indexOf('xCelestialPoleOffsetRadians');
    var yCelestialPoleOffsetRadiansColumn = eopData.columnNames.indexOf('yCelestialPoleOffsetRadians');
    var taiMinusUtcSecondsColumn = eopData.columnNames.indexOf('taiMinusUtcSeconds');
    if (dateColumn < 0 || xPoleWanderRadiansColumn < 0 || yPoleWanderRadiansColumn < 0 || ut1MinusUtcSecondsColumn < 0 || xCelestialPoleOffsetRadiansColumn < 0 || yCelestialPoleOffsetRadiansColumn < 0 || taiMinusUtcSecondsColumn < 0) {
      eop._dataError = 'Error in loaded EOP data: The columnNames property must include modifiedJulianDateUtc, xPoleWanderRadians, yPoleWanderRadians, ut1MinusUtcSeconds, xCelestialPoleOffsetRadians, yCelestialPoleOffsetRadians, and taiMinusUtcSeconds columns';
      return;
    }
    var samples = eop._samples = eopData.samples;
    var dates = eop._dates = [];
    eop._dateColumn = dateColumn;
    eop._xPoleWanderRadiansColumn = xPoleWanderRadiansColumn;
    eop._yPoleWanderRadiansColumn = yPoleWanderRadiansColumn;
    eop._ut1MinusUtcSecondsColumn = ut1MinusUtcSecondsColumn;
    eop._xCelestialPoleOffsetRadiansColumn = xCelestialPoleOffsetRadiansColumn;
    eop._yCelestialPoleOffsetRadiansColumn = yCelestialPoleOffsetRadiansColumn;
    eop._taiMinusUtcSecondsColumn = taiMinusUtcSecondsColumn;
    eop._columnCount = eopData.columnNames.length;
    eop._lastIndex = undefined;
    var lastTaiMinusUtc;
    var addNewLeapSeconds = eop._addNewLeapSeconds;
    for (var i = 0,
        len = samples.length; i < len; i += eop._columnCount) {
      var mjd = samples[i + dateColumn];
      var taiMinusUtc = samples[i + taiMinusUtcSecondsColumn];
      var day = mjd + TimeConstants.MODIFIED_JULIAN_DATE_DIFFERENCE;
      var date = new JulianDate(day, taiMinusUtc, TimeStandard.TAI);
      dates.push(date);
      if (addNewLeapSeconds) {
        if (taiMinusUtc !== lastTaiMinusUtc && defined(lastTaiMinusUtc)) {
          var leapSeconds = JulianDate.leapSeconds;
          var leapSecondIndex = binarySearch(leapSeconds, date, compareLeapSecondDates);
          if (leapSecondIndex < 0) {
            var leapSecond = new LeapSecond(date, taiMinusUtc);
            leapSeconds.splice(~leapSecondIndex, 0, leapSecond);
          }
        }
        lastTaiMinusUtc = taiMinusUtc;
      }
    }
  }
  function fillResultFromIndex(eop, samples, index, columnCount, result) {
    var start = index * columnCount;
    result.xPoleWander = samples[start + eop._xPoleWanderRadiansColumn];
    result.yPoleWander = samples[start + eop._yPoleWanderRadiansColumn];
    result.xPoleOffset = samples[start + eop._xCelestialPoleOffsetRadiansColumn];
    result.yPoleOffset = samples[start + eop._yCelestialPoleOffsetRadiansColumn];
    result.ut1MinusUtc = samples[start + eop._ut1MinusUtcSecondsColumn];
  }
  function linearInterp(dx, y1, y2) {
    return y1 + dx * (y2 - y1);
  }
  function interpolate(eop, dates, samples, date, before, after, result) {
    var columnCount = eop._columnCount;
    if (after > dates.length - 1) {
      result.xPoleWander = 0;
      result.yPoleWander = 0;
      result.xPoleOffset = 0;
      result.yPoleOffset = 0;
      result.ut1MinusUtc = 0;
      return result;
    }
    var beforeDate = dates[before];
    var afterDate = dates[after];
    if (beforeDate.equals(afterDate) || date.equals(beforeDate)) {
      fillResultFromIndex(eop, samples, before, columnCount, result);
      return result;
    } else if (date.equals(afterDate)) {
      fillResultFromIndex(eop, samples, after, columnCount, result);
      return result;
    }
    var factor = JulianDate.secondsDifference(date, beforeDate) / JulianDate.secondsDifference(afterDate, beforeDate);
    var startBefore = before * columnCount;
    var startAfter = after * columnCount;
    var beforeUt1MinusUtc = samples[startBefore + eop._ut1MinusUtcSecondsColumn];
    var afterUt1MinusUtc = samples[startAfter + eop._ut1MinusUtcSecondsColumn];
    var offsetDifference = afterUt1MinusUtc - beforeUt1MinusUtc;
    if (offsetDifference > 0.5 || offsetDifference < -0.5) {
      var beforeTaiMinusUtc = samples[startBefore + eop._taiMinusUtcSecondsColumn];
      var afterTaiMinusUtc = samples[startAfter + eop._taiMinusUtcSecondsColumn];
      if (beforeTaiMinusUtc !== afterTaiMinusUtc) {
        if (afterDate.equals(date)) {
          beforeUt1MinusUtc = afterUt1MinusUtc;
        } else {
          afterUt1MinusUtc -= afterTaiMinusUtc - beforeTaiMinusUtc;
        }
      }
    }
    result.xPoleWander = linearInterp(factor, samples[startBefore + eop._xPoleWanderRadiansColumn], samples[startAfter + eop._xPoleWanderRadiansColumn]);
    result.yPoleWander = linearInterp(factor, samples[startBefore + eop._yPoleWanderRadiansColumn], samples[startAfter + eop._yPoleWanderRadiansColumn]);
    result.xPoleOffset = linearInterp(factor, samples[startBefore + eop._xCelestialPoleOffsetRadiansColumn], samples[startAfter + eop._xCelestialPoleOffsetRadiansColumn]);
    result.yPoleOffset = linearInterp(factor, samples[startBefore + eop._yCelestialPoleOffsetRadiansColumn], samples[startAfter + eop._yCelestialPoleOffsetRadiansColumn]);
    result.ut1MinusUtc = linearInterp(factor, beforeUt1MinusUtc, afterUt1MinusUtc);
    return result;
  }
  return EarthOrientationParameters;
});

})();
(function() {
var define = $__System.amdDefine;
define("4f", [], function() {
  'use strict';
  function EarthOrientationParametersSample(xPoleWander, yPoleWander, xPoleOffset, yPoleOffset, ut1MinusUtc) {
    this.xPoleWander = xPoleWander;
    this.yPoleWander = yPoleWander;
    this.xPoleOffset = xPoleOffset;
    this.yPoleOffset = yPoleOffset;
    this.ut1MinusUtc = ut1MinusUtc;
  }
  return EarthOrientationParametersSample;
});

})();
(function() {
var define = $__System.amdDefine;
define("54", ["55", "23", "1a", "1c"], function(Uri, defaultValue, defined, DeveloperError) {
  'use strict';
  function getAbsoluteUri(relative, base) {
    if (!defined(relative)) {
      throw new DeveloperError('relative uri is required.');
    }
    base = defaultValue(base, document.location.href);
    var baseUri = new Uri(base);
    var relativeUri = new Uri(relative);
    return relativeUri.resolve(baseUri).toString();
  }
  return getAbsoluteUri;
});

})();
(function() {
var define = $__System.amdDefine;
define("55", [], function() {
  function URI(uri) {
    if (uri instanceof URI) {
      this.scheme = uri.scheme;
      this.authority = uri.authority;
      this.path = uri.path;
      this.query = uri.query;
      this.fragment = uri.fragment;
    } else if (uri) {
      var c = parseRegex.exec(uri);
      this.scheme = c[1];
      this.authority = c[2];
      this.path = c[3];
      this.query = c[4];
      this.fragment = c[5];
    }
  }
  URI.prototype.scheme = null;
  URI.prototype.authority = null;
  URI.prototype.path = '';
  URI.prototype.query = null;
  URI.prototype.fragment = null;
  var parseRegex = new RegExp('^(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*)(?:\\?([^#]*))?(?:#(.*))?$');
  URI.prototype.getScheme = function() {
    return this.scheme;
  };
  URI.prototype.getAuthority = function() {
    return this.authority;
  };
  URI.prototype.getPath = function() {
    return this.path;
  };
  URI.prototype.getQuery = function() {
    return this.query;
  };
  URI.prototype.getFragment = function() {
    return this.fragment;
  };
  URI.prototype.isAbsolute = function() {
    return !!this.scheme && !this.fragment;
  };
  URI.prototype.isSameDocumentAs = function(uri) {
    return uri.scheme == this.scheme && uri.authority == this.authority && uri.path == this.path && uri.query == this.query;
  };
  URI.prototype.equals = function(uri) {
    return this.isSameDocumentAs(uri) && uri.fragment == this.fragment;
  };
  URI.prototype.normalize = function() {
    this.removeDotSegments();
    if (this.scheme)
      this.scheme = this.scheme.toLowerCase();
    if (this.authority)
      this.authority = this.authority.replace(authorityRegex, replaceAuthority).replace(caseRegex, replaceCase);
    if (this.path)
      this.path = this.path.replace(caseRegex, replaceCase);
    if (this.query)
      this.query = this.query.replace(caseRegex, replaceCase);
    if (this.fragment)
      this.fragment = this.fragment.replace(caseRegex, replaceCase);
  };
  var caseRegex = /%[0-9a-z]{2}/gi;
  var percentRegex = /[a-zA-Z0-9\-\._~]/;
  var authorityRegex = /(.*@)?([^@:]*)(:.*)?/;
  function replaceCase(str) {
    var dec = unescape(str);
    return percentRegex.test(dec) ? dec : str.toUpperCase();
  }
  function replaceAuthority(str, p1, p2, p3) {
    return (p1 || '') + p2.toLowerCase() + (p3 || '');
  }
  URI.prototype.resolve = function(baseURI) {
    var uri = new URI();
    if (this.scheme) {
      uri.scheme = this.scheme;
      uri.authority = this.authority;
      uri.path = this.path;
      uri.query = this.query;
    } else {
      uri.scheme = baseURI.scheme;
      if (this.authority) {
        uri.authority = this.authority;
        uri.path = this.path;
        uri.query = this.query;
      } else {
        uri.authority = baseURI.authority;
        if (this.path == '') {
          uri.path = baseURI.path;
          uri.query = this.query || baseURI.query;
        } else {
          if (this.path.charAt(0) == '/') {
            uri.path = this.path;
            uri.removeDotSegments();
          } else {
            if (baseURI.authority && baseURI.path == '') {
              uri.path = '/' + this.path;
            } else {
              uri.path = baseURI.path.substring(0, baseURI.path.lastIndexOf('/') + 1) + this.path;
            }
            uri.removeDotSegments();
          }
          uri.query = this.query;
        }
      }
    }
    uri.fragment = this.fragment;
    return uri;
  };
  URI.prototype.removeDotSegments = function() {
    var input = this.path.split('/'),
        output = [],
        segment,
        absPath = input[0] == '';
    if (absPath)
      input.shift();
    var sFirst = input[0] == '' ? input.shift() : null;
    while (input.length) {
      segment = input.shift();
      if (segment == '..') {
        output.pop();
      } else if (segment != '.') {
        output.push(segment);
      }
    }
    if (segment == '.' || segment == '..')
      output.push('');
    if (absPath)
      output.unshift('');
    this.path = output.join('/');
  };
  URI.prototype.toString = function() {
    var result = '';
    if (this.scheme)
      result += this.scheme + ':';
    if (this.authority)
      result += '//' + this.authority;
    result += this.path;
    if (this.query)
      result += '?' + this.query;
    if (this.fragment)
      result += '#' + this.fragment;
    return result;
  };
  return URI;
});

})();
(function() {
var define = $__System.amdDefine;
define("56", ["55", "23", "1a", "1c"], function(Uri, defaultValue, defined, DeveloperError) {
  'use strict';
  function joinUrls(first, second, appendSlash) {
    if (!defined(first)) {
      throw new DeveloperError('first is required');
    }
    if (!defined(second)) {
      throw new DeveloperError('second is required');
    }
    appendSlash = defaultValue(appendSlash, true);
    if (!(first instanceof Uri)) {
      first = new Uri(first);
    }
    if (!(second instanceof Uri)) {
      second = new Uri(second);
    }
    if (defined(second.authority) && !defined(second.scheme)) {
      if (typeof document !== 'undefined' && defined(document.location) && defined(document.location.href)) {
        second.scheme = new Uri(document.location.href).scheme;
      } else {
        second.scheme = first.scheme;
      }
    }
    var baseUri = first;
    if (second.isAbsolute()) {
      baseUri = second;
    }
    var url = '';
    if (defined(baseUri.scheme)) {
      url += baseUri.scheme + ':';
    }
    if (defined(baseUri.authority)) {
      url += '//' + baseUri.authority;
      if (baseUri.path !== '' && baseUri.path !== '/') {
        url = url.replace(/\/?$/, '/');
        baseUri.path = baseUri.path.replace(/^\/?/g, '');
      }
    }
    if (baseUri === first) {
      if (appendSlash) {
        url += first.path.replace(/\/?$/, '/') + second.path.replace(/^\/?/g, '');
      } else {
        url += first.path + second.path;
      }
    } else {
      url += second.path;
    }
    var hasFirstQuery = defined(first.query);
    var hasSecondQuery = defined(second.query);
    if (hasFirstQuery && hasSecondQuery) {
      url += '?' + first.query + '&' + second.query;
    } else if (hasFirstQuery && !hasSecondQuery) {
      url += '?' + first.query;
    } else if (!hasFirstQuery && hasSecondQuery) {
      url += '?' + second.query;
    }
    var hasSecondFragment = defined(second.fragment);
    if (defined(first.fragment) && !hasSecondFragment) {
      url += '#' + first.fragment;
    } else if (hasSecondFragment) {
      url += '#' + second.fragment;
    }
    return url;
  }
  return joinUrls;
});

})();
(function() {
var define = $__System.amdDefine;
define("57", ["55", "1a", "1c", "54", "56", "require"], function(Uri, defined, DeveloperError, getAbsoluteUri, joinUrls, _dereq_) {
  'use strict';
  var cesiumScriptRegex = /((?:.*\/)|^)cesium[\w-]*\.js(?:\W|$)/i;
  function getBaseUrlFromCesiumScript() {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0,
        len = scripts.length; i < len; ++i) {
      var src = scripts[i].getAttribute('src');
      var result = cesiumScriptRegex.exec(src);
      if (result !== null) {
        return result[1];
      }
    }
    return undefined;
  }
  var baseUrl;
  function getCesiumBaseUrl() {
    if (defined(baseUrl)) {
      return baseUrl;
    }
    var baseUrlString;
    if (typeof CESIUM_BASE_URL !== 'undefined') {
      baseUrlString = CESIUM_BASE_URL;
    } else {
      baseUrlString = getBaseUrlFromCesiumScript();
    }
    if (!defined(baseUrlString)) {
      throw new DeveloperError('Unable to determine Cesium base URL automatically, try defining a global variable called CESIUM_BASE_URL.');
    }
    baseUrl = new Uri(getAbsoluteUri(baseUrlString));
    return baseUrl;
  }
  function buildModuleUrlFromRequireToUrl(moduleID) {
    return _dereq_.toUrl('../' + moduleID);
  }
  function buildModuleUrlFromBaseUrl(moduleID) {
    return joinUrls(getCesiumBaseUrl(), moduleID);
  }
  var implementation;
  var a;
  function buildModuleUrl(moduleID) {
    if (!defined(implementation)) {
      if (defined(_dereq_.toUrl)) {
        implementation = buildModuleUrlFromRequireToUrl;
      } else {
        implementation = buildModuleUrlFromBaseUrl;
      }
    }
    if (!defined(a)) {
      a = document.createElement('a');
    }
    var url = implementation(moduleID);
    a.href = url;
    a.href = a.href;
    return a.href;
  }
  buildModuleUrl._cesiumScriptRegex = cesiumScriptRegex;
  buildModuleUrl.setBaseUrl = function(value) {
    baseUrl = new Uri(value).resolve(new Uri(document.location.href));
  };
  return buildModuleUrl;
});

})();
(function() {
var define = $__System.amdDefine;
define("58", ["23"], function(defaultValue) {
  'use strict';
  function clone(object, deep) {
    if (object === null || typeof object !== 'object') {
      return object;
    }
    deep = defaultValue(deep, false);
    var result = new object.constructor();
    for (var propertyName in object) {
      if (object.hasOwnProperty(propertyName)) {
        var value = object[propertyName];
        if (deep) {
          value = clone(value, deep);
        }
        result[propertyName] = value;
      }
    }
    return result;
  }
  return clone;
});

})();
(function() {
var define = $__System.amdDefine;
(function(define) {
  'use strict';
  define("4e", [], function() {
    var reduceArray,
        slice,
        undef;
    when.defer = defer;
    when.resolve = resolve;
    when.reject = reject;
    when.join = join;
    when.all = all;
    when.map = map;
    when.reduce = reduce;
    when.any = any;
    when.some = some;
    when.chain = chain;
    when.isPromise = isPromise;
    function when(promiseOrValue, onFulfilled, onRejected, onProgress) {
      return resolve(promiseOrValue).then(onFulfilled, onRejected, onProgress);
    }
    function resolve(promiseOrValue) {
      var promise,
          deferred;
      if (promiseOrValue instanceof Promise) {
        promise = promiseOrValue;
      } else {
        if (isPromise(promiseOrValue)) {
          deferred = defer();
          promiseOrValue.then(function(value) {
            deferred.resolve(value);
          }, function(reason) {
            deferred.reject(reason);
          }, function(update) {
            deferred.progress(update);
          });
          promise = deferred.promise;
        } else {
          promise = fulfilled(promiseOrValue);
        }
      }
      return promise;
    }
    function reject(promiseOrValue) {
      return when(promiseOrValue, rejected);
    }
    function Promise(then) {
      this.then = then;
    }
    Promise.prototype = {
      always: function(onFulfilledOrRejected, onProgress) {
        return this.then(onFulfilledOrRejected, onFulfilledOrRejected, onProgress);
      },
      otherwise: function(onRejected) {
        return this.then(undef, onRejected);
      },
      yield: function(value) {
        return this.then(function() {
          return value;
        });
      },
      spread: function(onFulfilled) {
        return this.then(function(array) {
          return all(array, function(array) {
            return onFulfilled.apply(undef, array);
          });
        });
      }
    };
    function fulfilled(value) {
      var p = new Promise(function(onFulfilled) {
        try {
          return resolve(onFulfilled ? onFulfilled(value) : value);
        } catch (e) {
          return rejected(e);
        }
      });
      return p;
    }
    function rejected(reason) {
      var p = new Promise(function(_, onRejected) {
        try {
          return onRejected ? resolve(onRejected(reason)) : rejected(reason);
        } catch (e) {
          return rejected(e);
        }
      });
      return p;
    }
    function defer() {
      var deferred,
          promise,
          handlers,
          progressHandlers,
          _then,
          _progress,
          _resolve;
      promise = new Promise(then);
      deferred = {
        then: then,
        resolve: promiseResolve,
        reject: promiseReject,
        progress: promiseProgress,
        promise: promise,
        resolver: {
          resolve: promiseResolve,
          reject: promiseReject,
          progress: promiseProgress
        }
      };
      handlers = [];
      progressHandlers = [];
      _then = function(onFulfilled, onRejected, onProgress) {
        var deferred,
            progressHandler;
        deferred = defer();
        progressHandler = typeof onProgress === 'function' ? function(update) {
          try {
            deferred.progress(onProgress(update));
          } catch (e) {
            deferred.progress(e);
          }
        } : function(update) {
          deferred.progress(update);
        };
        handlers.push(function(promise) {
          promise.then(onFulfilled, onRejected).then(deferred.resolve, deferred.reject, progressHandler);
        });
        progressHandlers.push(progressHandler);
        return deferred.promise;
      };
      _progress = function(update) {
        processQueue(progressHandlers, update);
        return update;
      };
      _resolve = function(value) {
        value = resolve(value);
        _then = value.then;
        _resolve = resolve;
        _progress = noop;
        processQueue(handlers, value);
        progressHandlers = handlers = undef;
        return value;
      };
      return deferred;
      function then(onFulfilled, onRejected, onProgress) {
        return _then(onFulfilled, onRejected, onProgress);
      }
      function promiseResolve(val) {
        return _resolve(val);
      }
      function promiseReject(err) {
        return _resolve(rejected(err));
      }
      function promiseProgress(update) {
        return _progress(update);
      }
    }
    function isPromise(promiseOrValue) {
      return promiseOrValue && typeof promiseOrValue.then === 'function';
    }
    function some(promisesOrValues, howMany, onFulfilled, onRejected, onProgress) {
      checkCallbacks(2, arguments);
      return when(promisesOrValues, function(promisesOrValues) {
        var toResolve,
            toReject,
            values,
            reasons,
            deferred,
            fulfillOne,
            rejectOne,
            progress,
            len,
            i;
        len = promisesOrValues.length >>> 0;
        toResolve = Math.max(0, Math.min(howMany, len));
        values = [];
        toReject = (len - toResolve) + 1;
        reasons = [];
        deferred = defer();
        if (!toResolve) {
          deferred.resolve(values);
        } else {
          progress = deferred.progress;
          rejectOne = function(reason) {
            reasons.push(reason);
            if (!--toReject) {
              fulfillOne = rejectOne = noop;
              deferred.reject(reasons);
            }
          };
          fulfillOne = function(val) {
            values.push(val);
            if (!--toResolve) {
              fulfillOne = rejectOne = noop;
              deferred.resolve(values);
            }
          };
          for (i = 0; i < len; ++i) {
            if (i in promisesOrValues) {
              when(promisesOrValues[i], fulfiller, rejecter, progress);
            }
          }
        }
        return deferred.then(onFulfilled, onRejected, onProgress);
        function rejecter(reason) {
          rejectOne(reason);
        }
        function fulfiller(val) {
          fulfillOne(val);
        }
      });
    }
    function any(promisesOrValues, onFulfilled, onRejected, onProgress) {
      function unwrapSingleResult(val) {
        return onFulfilled ? onFulfilled(val[0]) : val[0];
      }
      return some(promisesOrValues, 1, unwrapSingleResult, onRejected, onProgress);
    }
    function all(promisesOrValues, onFulfilled, onRejected, onProgress) {
      checkCallbacks(1, arguments);
      return map(promisesOrValues, identity).then(onFulfilled, onRejected, onProgress);
    }
    function join() {
      return map(arguments, identity);
    }
    function map(promise, mapFunc) {
      return when(promise, function(array) {
        var results,
            len,
            toResolve,
            resolve,
            i,
            d;
        toResolve = len = array.length >>> 0;
        results = [];
        d = defer();
        if (!toResolve) {
          d.resolve(results);
        } else {
          resolve = function resolveOne(item, i) {
            when(item, mapFunc).then(function(mapped) {
              results[i] = mapped;
              if (!--toResolve) {
                d.resolve(results);
              }
            }, d.reject);
          };
          for (i = 0; i < len; i++) {
            if (i in array) {
              resolve(array[i], i);
            } else {
              --toResolve;
            }
          }
        }
        return d.promise;
      });
    }
    function reduce(promise, reduceFunc) {
      var args = slice.call(arguments, 1);
      return when(promise, function(array) {
        var total;
        total = array.length;
        args[0] = function(current, val, i) {
          return when(current, function(c) {
            return when(val, function(value) {
              return reduceFunc(c, value, i, total);
            });
          });
        };
        return reduceArray.apply(array, args);
      });
    }
    function chain(promiseOrValue, resolver, resolveValue) {
      var useResolveValue = arguments.length > 2;
      return when(promiseOrValue, function(val) {
        val = useResolveValue ? resolveValue : val;
        resolver.resolve(val);
        return val;
      }, function(reason) {
        resolver.reject(reason);
        return rejected(reason);
      }, resolver.progress);
    }
    function processQueue(queue, value) {
      var handler,
          i = 0;
      while (handler = queue[i++]) {
        handler(value);
      }
    }
    function checkCallbacks(start, arrayOfCallbacks) {
      var arg,
          i = arrayOfCallbacks.length;
      while (i > start) {
        arg = arrayOfCallbacks[--i];
        if (arg != null && typeof arg != 'function') {
          throw new Error('arg ' + i + ' must be a function');
        }
      }
    }
    function noop() {}
    slice = [].slice;
    reduceArray = [].reduce || function(reduceFunc) {
      var arr,
          args,
          reduced,
          len,
          i;
      i = 0;
      arr = Object(this);
      len = arr.length >>> 0;
      args = arguments;
      if (args.length <= 1) {
        for (; ; ) {
          if (i in arr) {
            reduced = arr[i++];
            break;
          }
          if (++i >= len) {
            throw new TypeError();
          }
        }
      } else {
        reduced = args[1];
      }
      for (; i < len; ++i) {
        if (i in arr) {
          reduced = reduceFunc(reduced, arr[i], i, arr);
        }
      }
      return reduced;
    };
    function identity(x) {
      return x;
    }
    return when;
  });
})(typeof define == 'function' && define.amd ? define : function(factory) {
  typeof exports === 'object' ? (module.exports = factory()) : (this.when = factory());
});

})();
(function() {
var define = $__System.amdDefine;
define("59", [], function() {
  'use strict';
  function parseResponseHeaders(headerString) {
    var headers = {};
    if (!headerString) {
      return headers;
    }
    var headerPairs = headerString.split('\u000d\u000a');
    for (var i = 0; i < headerPairs.length; ++i) {
      var headerPair = headerPairs[i];
      var index = headerPair.indexOf('\u003a\u0020');
      if (index > 0) {
        var key = headerPair.substring(0, index);
        var val = headerPair.substring(index + 2);
        headers[key] = val;
      }
    }
    return headers;
  }
  return parseResponseHeaders;
});

})();
(function() {
var define = $__System.amdDefine;
define("5a", ["1a", "59"], function(defined, parseResponseHeaders) {
  'use strict';
  function RequestErrorEvent(statusCode, response, responseHeaders) {
    this.statusCode = statusCode;
    this.response = response;
    this.responseHeaders = responseHeaders;
    if (typeof this.responseHeaders === 'string') {
      this.responseHeaders = parseResponseHeaders(this.responseHeaders);
    }
  }
  RequestErrorEvent.prototype.toString = function() {
    var str = 'Request has failed.';
    if (defined(this.statusCode)) {
      str += ' Status Code: ' + this.statusCode;
    }
    return str;
  };
  return RequestErrorEvent;
});

})();
(function() {
var define = $__System.amdDefine;
define("5b", ["4e", "23", "1a", "1c", "5a", "38"], function(when, defaultValue, defined, DeveloperError, RequestErrorEvent, RuntimeError) {
  'use strict';
  function loadWithXhr(options) {
    options = defaultValue(options, defaultValue.EMPTY_OBJECT);
    if (!defined(options.url)) {
      throw new DeveloperError('options.url is required.');
    }
    var responseType = options.responseType;
    var method = defaultValue(options.method, 'GET');
    var data = options.data;
    var headers = options.headers;
    var overrideMimeType = options.overrideMimeType;
    return when(options.url, function(url) {
      var deferred = when.defer();
      loadWithXhr.load(url, responseType, method, data, headers, deferred, overrideMimeType);
      return deferred.promise;
    });
  }
  var dataUriRegex = /^data:(.*?)(;base64)?,(.*)$/;
  function decodeDataUriText(isBase64, data) {
    var result = decodeURIComponent(data);
    if (isBase64) {
      return atob(result);
    }
    return result;
  }
  function decodeDataUriArrayBuffer(isBase64, data) {
    var byteString = decodeDataUriText(isBase64, data);
    var buffer = new ArrayBuffer(byteString.length);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < byteString.length; i++) {
      view[i] = byteString.charCodeAt(i);
    }
    return buffer;
  }
  function decodeDataUri(dataUriRegexResult, responseType) {
    responseType = defaultValue(responseType, '');
    var mimeType = dataUriRegexResult[1];
    var isBase64 = !!dataUriRegexResult[2];
    var data = dataUriRegexResult[3];
    switch (responseType) {
      case '':
      case 'text':
        return decodeDataUriText(isBase64, data);
      case 'arraybuffer':
        return decodeDataUriArrayBuffer(isBase64, data);
      case 'blob':
        var buffer = decodeDataUriArrayBuffer(isBase64, data);
        return new Blob([buffer], {type: mimeType});
      case 'document':
        var parser = new DOMParser();
        return parser.parseFromString(decodeDataUriText(isBase64, data), mimeType);
      case 'json':
        return JSON.parse(decodeDataUriText(isBase64, data));
      default:
        throw new DeveloperError('Unhandled responseType: ' + responseType);
    }
  }
  loadWithXhr.load = function(url, responseType, method, data, headers, deferred, overrideMimeType) {
    var dataUriRegexResult = dataUriRegex.exec(url);
    if (dataUriRegexResult !== null) {
      deferred.resolve(decodeDataUri(dataUriRegexResult, responseType));
      return;
    }
    var xhr = new XMLHttpRequest();
    if (defined(overrideMimeType) && defined(xhr.overrideMimeType)) {
      xhr.overrideMimeType(overrideMimeType);
    }
    xhr.open(method, url, true);
    if (defined(headers)) {
      for (var key in headers) {
        if (headers.hasOwnProperty(key)) {
          xhr.setRequestHeader(key, headers[key]);
        }
      }
    }
    if (defined(responseType)) {
      xhr.responseType = responseType;
    }
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        if (defined(xhr.response)) {
          deferred.resolve(xhr.response);
        } else {
          if (defined(xhr.responseXML) && xhr.responseXML.hasChildNodes()) {
            deferred.resolve(xhr.responseXML);
          } else if (defined(xhr.responseText)) {
            deferred.resolve(xhr.responseText);
          } else {
            deferred.reject(new RuntimeError('unknown XMLHttpRequest response type.'));
          }
        }
      } else {
        deferred.reject(new RequestErrorEvent(xhr.status, xhr.response, xhr.getAllResponseHeaders()));
      }
    };
    xhr.onerror = function(e) {
      deferred.reject(new RequestErrorEvent());
    };
    xhr.send(data);
  };
  loadWithXhr.defaultLoad = loadWithXhr.load;
  return loadWithXhr;
});

})();
(function() {
var define = $__System.amdDefine;
define("5c", ["5b"], function(loadWithXhr) {
  'use strict';
  function loadText(url, headers) {
    return loadWithXhr({
      url: url,
      headers: headers
    });
  }
  return loadText;
});

})();
(function() {
var define = $__System.amdDefine;
define("51", ["58", "1a", "1c", "5c"], function(clone, defined, DeveloperError, loadText) {
  'use strict';
  var defaultHeaders = {Accept: 'application/json,*/*;q=0.01'};
  function loadJson(url, headers) {
    if (!defined(url)) {
      throw new DeveloperError('url is required.');
    }
    if (!defined(headers)) {
      headers = defaultHeaders;
    } else if (!defined(headers.Accept)) {
      headers = clone(headers);
      headers.Accept = defaultHeaders.Accept;
    }
    return loadText(url, headers).then(function(value) {
      return JSON.parse(value);
    });
  }
  return loadJson;
});

})();
(function() {
var define = $__System.amdDefine;
define("5d", ["4e", "57", "23", "1a", "5e", "24", "51", "53"], function(when, buildModuleUrl, defaultValue, defined, Iau2006XysSample, JulianDate, loadJson, TimeStandard) {
  'use strict';
  function Iau2006XysData(options) {
    options = defaultValue(options, defaultValue.EMPTY_OBJECT);
    this._xysFileUrlTemplate = options.xysFileUrlTemplate;
    this._interpolationOrder = defaultValue(options.interpolationOrder, 9);
    this._sampleZeroJulianEphemerisDate = defaultValue(options.sampleZeroJulianEphemerisDate, 2442396.5);
    this._sampleZeroDateTT = new JulianDate(this._sampleZeroJulianEphemerisDate, 0.0, TimeStandard.TAI);
    this._stepSizeDays = defaultValue(options.stepSizeDays, 1.0);
    this._samplesPerXysFile = defaultValue(options.samplesPerXysFile, 1000);
    this._totalSamples = defaultValue(options.totalSamples, 27426);
    this._samples = new Array(this._totalSamples * 3);
    this._chunkDownloadsInProgress = [];
    var order = this._interpolationOrder;
    var denom = this._denominators = new Array(order + 1);
    var xTable = this._xTable = new Array(order + 1);
    var stepN = Math.pow(this._stepSizeDays, order);
    for (var i = 0; i <= order; ++i) {
      denom[i] = stepN;
      xTable[i] = i * this._stepSizeDays;
      for (var j = 0; j <= order; ++j) {
        if (j !== i) {
          denom[i] *= (i - j);
        }
      }
      denom[i] = 1.0 / denom[i];
    }
    this._work = new Array(order + 1);
    this._coef = new Array(order + 1);
  }
  var julianDateScratch = new JulianDate(0, 0.0, TimeStandard.TAI);
  function getDaysSinceEpoch(xys, dayTT, secondTT) {
    var dateTT = julianDateScratch;
    dateTT.dayNumber = dayTT;
    dateTT.secondsOfDay = secondTT;
    return JulianDate.daysDifference(dateTT, xys._sampleZeroDateTT);
  }
  Iau2006XysData.prototype.preload = function(startDayTT, startSecondTT, stopDayTT, stopSecondTT) {
    var startDaysSinceEpoch = getDaysSinceEpoch(this, startDayTT, startSecondTT);
    var stopDaysSinceEpoch = getDaysSinceEpoch(this, stopDayTT, stopSecondTT);
    var startIndex = (startDaysSinceEpoch / this._stepSizeDays - this._interpolationOrder / 2) | 0;
    if (startIndex < 0) {
      startIndex = 0;
    }
    var stopIndex = (stopDaysSinceEpoch / this._stepSizeDays - this._interpolationOrder / 2) | 0 + this._interpolationOrder;
    if (stopIndex >= this._totalSamples) {
      stopIndex = this._totalSamples - 1;
    }
    var startChunk = (startIndex / this._samplesPerXysFile) | 0;
    var stopChunk = (stopIndex / this._samplesPerXysFile) | 0;
    var promises = [];
    for (var i = startChunk; i <= stopChunk; ++i) {
      promises.push(requestXysChunk(this, i));
    }
    return when.all(promises);
  };
  Iau2006XysData.prototype.computeXysRadians = function(dayTT, secondTT, result) {
    var daysSinceEpoch = getDaysSinceEpoch(this, dayTT, secondTT);
    if (daysSinceEpoch < 0.0) {
      return undefined;
    }
    var centerIndex = (daysSinceEpoch / this._stepSizeDays) | 0;
    if (centerIndex >= this._totalSamples) {
      return undefined;
    }
    var degree = this._interpolationOrder;
    var firstIndex = centerIndex - ((degree / 2) | 0);
    if (firstIndex < 0) {
      firstIndex = 0;
    }
    var lastIndex = firstIndex + degree;
    if (lastIndex >= this._totalSamples) {
      lastIndex = this._totalSamples - 1;
      firstIndex = lastIndex - degree;
      if (firstIndex < 0) {
        firstIndex = 0;
      }
    }
    var isDataMissing = false;
    var samples = this._samples;
    if (!defined(samples[firstIndex * 3])) {
      requestXysChunk(this, (firstIndex / this._samplesPerXysFile) | 0);
      isDataMissing = true;
    }
    if (!defined(samples[lastIndex * 3])) {
      requestXysChunk(this, (lastIndex / this._samplesPerXysFile) | 0);
      isDataMissing = true;
    }
    if (isDataMissing) {
      return undefined;
    }
    if (!defined(result)) {
      result = new Iau2006XysSample(0.0, 0.0, 0.0);
    } else {
      result.x = 0.0;
      result.y = 0.0;
      result.s = 0.0;
    }
    var x = daysSinceEpoch - firstIndex * this._stepSizeDays;
    var work = this._work;
    var denom = this._denominators;
    var coef = this._coef;
    var xTable = this._xTable;
    var i,
        j;
    for (i = 0; i <= degree; ++i) {
      work[i] = x - xTable[i];
    }
    for (i = 0; i <= degree; ++i) {
      coef[i] = 1.0;
      for (j = 0; j <= degree; ++j) {
        if (j !== i) {
          coef[i] *= work[j];
        }
      }
      coef[i] *= denom[i];
      var sampleIndex = (firstIndex + i) * 3;
      result.x += coef[i] * samples[sampleIndex++];
      result.y += coef[i] * samples[sampleIndex++];
      result.s += coef[i] * samples[sampleIndex];
    }
    return result;
  };
  function requestXysChunk(xysData, chunkIndex) {
    if (xysData._chunkDownloadsInProgress[chunkIndex]) {
      return xysData._chunkDownloadsInProgress[chunkIndex];
    }
    var deferred = when.defer();
    xysData._chunkDownloadsInProgress[chunkIndex] = deferred;
    var chunkUrl;
    var xysFileUrlTemplate = xysData._xysFileUrlTemplate;
    if (defined(xysFileUrlTemplate)) {
      chunkUrl = xysFileUrlTemplate.replace('{0}', chunkIndex);
    } else {
      chunkUrl = buildModuleUrl('Assets/IAU2006_XYS/IAU2006_XYS_' + chunkIndex + '.json');
    }
    when(loadJson(chunkUrl), function(chunk) {
      xysData._chunkDownloadsInProgress[chunkIndex] = false;
      var samples = xysData._samples;
      var newSamples = chunk.samples;
      var startIndex = chunkIndex * xysData._samplesPerXysFile * 3;
      for (var i = 0,
          len = newSamples.length; i < len; ++i) {
        samples[startIndex + i] = newSamples[i];
      }
      deferred.resolve();
    });
    return deferred.promise;
  }
  return Iau2006XysData;
});

})();
(function() {
var define = $__System.amdDefine;
define("5e", [], function() {
  'use strict';
  function Iau2006XysSample(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
  }
  return Iau2006XysSample;
});

})();
(function() {
var define = $__System.amdDefine;
define("5f", ["1a", "1b"], function(defined, defineProperties) {
  'use strict';
  var _supportsFullscreen;
  var _names = {
    requestFullscreen: undefined,
    exitFullscreen: undefined,
    fullscreenEnabled: undefined,
    fullscreenElement: undefined,
    fullscreenchange: undefined,
    fullscreenerror: undefined
  };
  var Fullscreen = {};
  defineProperties(Fullscreen, {
    element: {get: function() {
        if (!Fullscreen.supportsFullscreen()) {
          return undefined;
        }
        return document[_names.fullscreenElement];
      }},
    changeEventName: {get: function() {
        if (!Fullscreen.supportsFullscreen()) {
          return undefined;
        }
        return _names.fullscreenchange;
      }},
    errorEventName: {get: function() {
        if (!Fullscreen.supportsFullscreen()) {
          return undefined;
        }
        return _names.fullscreenerror;
      }},
    enabled: {get: function() {
        if (!Fullscreen.supportsFullscreen()) {
          return undefined;
        }
        return document[_names.fullscreenEnabled];
      }},
    fullscreen: {get: function() {
        if (!Fullscreen.supportsFullscreen()) {
          return undefined;
        }
        return Fullscreen.element !== null;
      }}
  });
  Fullscreen.supportsFullscreen = function() {
    if (defined(_supportsFullscreen)) {
      return _supportsFullscreen;
    }
    _supportsFullscreen = false;
    var body = document.body;
    if (typeof body.requestFullscreen === 'function') {
      _names.requestFullscreen = 'requestFullscreen';
      _names.exitFullscreen = 'exitFullscreen';
      _names.fullscreenEnabled = 'fullscreenEnabled';
      _names.fullscreenElement = 'fullscreenElement';
      _names.fullscreenchange = 'fullscreenchange';
      _names.fullscreenerror = 'fullscreenerror';
      _supportsFullscreen = true;
      return _supportsFullscreen;
    }
    var prefixes = ['webkit', 'moz', 'o', 'ms', 'khtml'];
    var name;
    for (var i = 0,
        len = prefixes.length; i < len; ++i) {
      var prefix = prefixes[i];
      name = prefix + 'RequestFullscreen';
      if (typeof body[name] === 'function') {
        _names.requestFullscreen = name;
        _supportsFullscreen = true;
      } else {
        name = prefix + 'RequestFullScreen';
        if (typeof body[name] === 'function') {
          _names.requestFullscreen = name;
          _supportsFullscreen = true;
        }
      }
      name = prefix + 'ExitFullscreen';
      if (typeof document[name] === 'function') {
        _names.exitFullscreen = name;
      } else {
        name = prefix + 'CancelFullScreen';
        if (typeof document[name] === 'function') {
          _names.exitFullscreen = name;
        }
      }
      name = prefix + 'FullscreenEnabled';
      if (document[name] !== undefined) {
        _names.fullscreenEnabled = name;
      } else {
        name = prefix + 'FullScreenEnabled';
        if (document[name] !== undefined) {
          _names.fullscreenEnabled = name;
        }
      }
      name = prefix + 'FullscreenElement';
      if (document[name] !== undefined) {
        _names.fullscreenElement = name;
      } else {
        name = prefix + 'FullScreenElement';
        if (document[name] !== undefined) {
          _names.fullscreenElement = name;
        }
      }
      name = prefix + 'fullscreenchange';
      if (document['on' + name] !== undefined) {
        if (prefix === 'ms') {
          name = 'MSFullscreenChange';
        }
        _names.fullscreenchange = name;
      }
      name = prefix + 'fullscreenerror';
      if (document['on' + name] !== undefined) {
        if (prefix === 'ms') {
          name = 'MSFullscreenError';
        }
        _names.fullscreenerror = name;
      }
    }
    return _supportsFullscreen;
  };
  Fullscreen.requestFullscreen = function(element, vrDevice) {
    if (!Fullscreen.supportsFullscreen()) {
      return;
    }
    element[_names.requestFullscreen]({vrDisplay: vrDevice});
  };
  Fullscreen.exitFullscreen = function() {
    if (!Fullscreen.supportsFullscreen()) {
      return;
    }
    document[_names.exitFullscreen]();
  };
  return Fullscreen;
});

})();
(function() {
var define = $__System.amdDefine;
define("60", ["23", "1a", "5f"], function(defaultValue, defined, Fullscreen) {
  'use strict';
  var theNavigator;
  if (typeof navigator !== 'undefined') {
    theNavigator = navigator;
  } else {
    theNavigator = {};
  }
  function extractVersion(versionString) {
    var parts = versionString.split('.');
    for (var i = 0,
        len = parts.length; i < len; ++i) {
      parts[i] = parseInt(parts[i], 10);
    }
    return parts;
  }
  var isChromeResult;
  var chromeVersionResult;
  function isChrome() {
    if (!defined(isChromeResult)) {
      isChromeResult = false;
      var fields = (/ Chrome\/([\.0-9]+)/).exec(theNavigator.userAgent);
      if (fields !== null) {
        isChromeResult = true;
        chromeVersionResult = extractVersion(fields[1]);
      }
    }
    return isChromeResult;
  }
  function chromeVersion() {
    return isChrome() && chromeVersionResult;
  }
  var isSafariResult;
  var safariVersionResult;
  function isSafari() {
    if (!defined(isSafariResult)) {
      isSafariResult = false;
      if (!isChrome() && (/ Safari\/[\.0-9]+/).test(theNavigator.userAgent)) {
        var fields = (/ Version\/([\.0-9]+)/).exec(theNavigator.userAgent);
        if (fields !== null) {
          isSafariResult = true;
          safariVersionResult = extractVersion(fields[1]);
        }
      }
    }
    return isSafariResult;
  }
  function safariVersion() {
    return isSafari() && safariVersionResult;
  }
  var isWebkitResult;
  var webkitVersionResult;
  function isWebkit() {
    if (!defined(isWebkitResult)) {
      isWebkitResult = false;
      var fields = (/ AppleWebKit\/([\.0-9]+)(\+?)/).exec(theNavigator.userAgent);
      if (fields !== null) {
        isWebkitResult = true;
        webkitVersionResult = extractVersion(fields[1]);
        webkitVersionResult.isNightly = !!fields[2];
      }
    }
    return isWebkitResult;
  }
  function webkitVersion() {
    return isWebkit() && webkitVersionResult;
  }
  var isInternetExplorerResult;
  var internetExplorerVersionResult;
  function isInternetExplorer() {
    if (!defined(isInternetExplorerResult)) {
      isInternetExplorerResult = false;
      var fields;
      if (theNavigator.appName === 'Microsoft Internet Explorer') {
        fields = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(theNavigator.userAgent);
        if (fields !== null) {
          isInternetExplorerResult = true;
          internetExplorerVersionResult = extractVersion(fields[1]);
        }
      } else if (theNavigator.appName === 'Netscape') {
        fields = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(theNavigator.userAgent);
        if (fields !== null) {
          isInternetExplorerResult = true;
          internetExplorerVersionResult = extractVersion(fields[1]);
        }
      }
    }
    return isInternetExplorerResult;
  }
  function internetExplorerVersion() {
    return isInternetExplorer() && internetExplorerVersionResult;
  }
  var isFirefoxResult;
  var firefoxVersionResult;
  function isFirefox() {
    if (!defined(isFirefoxResult)) {
      isFirefoxResult = false;
      var fields = /Firefox\/([\.0-9]+)/.exec(theNavigator.userAgent);
      if (fields !== null) {
        isFirefoxResult = true;
        firefoxVersionResult = extractVersion(fields[1]);
      }
    }
    return isFirefoxResult;
  }
  var isWindowsResult;
  function isWindows() {
    if (!defined(isWindowsResult)) {
      isWindowsResult = /Windows/i.test(theNavigator.appVersion);
    }
    return isWindowsResult;
  }
  function firefoxVersion() {
    return isFirefox() && firefoxVersionResult;
  }
  var hasPointerEvents;
  function supportsPointerEvents() {
    if (!defined(hasPointerEvents)) {
      hasPointerEvents = typeof PointerEvent !== 'undefined' && (!defined(theNavigator.pointerEnabled) || theNavigator.pointerEnabled);
    }
    return hasPointerEvents;
  }
  var imageRenderingValueResult;
  var supportsImageRenderingPixelatedResult;
  function supportsImageRenderingPixelated() {
    if (!defined(supportsImageRenderingPixelatedResult)) {
      var canvas = document.createElement('canvas');
      canvas.setAttribute('style', 'image-rendering: -moz-crisp-edges;' + 'image-rendering: pixelated;');
      var tmp = canvas.style.imageRendering;
      supportsImageRenderingPixelatedResult = defined(tmp) && tmp !== '';
      if (supportsImageRenderingPixelatedResult) {
        imageRenderingValueResult = tmp;
      }
    }
    return supportsImageRenderingPixelatedResult;
  }
  function imageRenderingValue() {
    return supportsImageRenderingPixelated() ? imageRenderingValueResult : undefined;
  }
  var FeatureDetection = {
    isChrome: isChrome,
    chromeVersion: chromeVersion,
    isSafari: isSafari,
    safariVersion: safariVersion,
    isWebkit: isWebkit,
    webkitVersion: webkitVersion,
    isInternetExplorer: isInternetExplorer,
    internetExplorerVersion: internetExplorerVersion,
    isFirefox: isFirefox,
    firefoxVersion: firefoxVersion,
    isWindows: isWindows,
    hardwareConcurrency: defaultValue(theNavigator.hardwareConcurrency, 3),
    supportsPointerEvents: supportsPointerEvents,
    supportsImageRenderingPixelated: supportsImageRenderingPixelated,
    imageRenderingValue: imageRenderingValue
  };
  FeatureDetection.supportsFullscreen = function() {
    return Fullscreen.supportsFullscreen();
  };
  FeatureDetection.supportsTypedArrays = function() {
    return typeof ArrayBuffer !== 'undefined';
  };
  FeatureDetection.supportsWebWorkers = function() {
    return typeof Worker !== 'undefined';
  };
  return FeatureDetection;
});

})();
(function() {
var define = $__System.amdDefine;
define("34", ["2c", "23", "1a", "1c", "60", "1f", "27", "32"], function(Cartesian3, defaultValue, defined, DeveloperError, FeatureDetection, freezeObject, CesiumMath, Matrix3) {
  'use strict';
  function Quaternion(x, y, z, w) {
    this.x = defaultValue(x, 0.0);
    this.y = defaultValue(y, 0.0);
    this.z = defaultValue(z, 0.0);
    this.w = defaultValue(w, 0.0);
  }
  var fromAxisAngleScratch = new Cartesian3();
  Quaternion.fromAxisAngle = function(axis, angle, result) {
    if (!defined(axis)) {
      throw new DeveloperError('axis is required.');
    }
    if (typeof angle !== 'number') {
      throw new DeveloperError('angle is required and must be a number.');
    }
    var halfAngle = angle / 2.0;
    var s = Math.sin(halfAngle);
    fromAxisAngleScratch = Cartesian3.normalize(axis, fromAxisAngleScratch);
    var x = fromAxisAngleScratch.x * s;
    var y = fromAxisAngleScratch.y * s;
    var z = fromAxisAngleScratch.z * s;
    var w = Math.cos(halfAngle);
    if (!defined(result)) {
      return new Quaternion(x, y, z, w);
    }
    result.x = x;
    result.y = y;
    result.z = z;
    result.w = w;
    return result;
  };
  var fromRotationMatrixNext = [1, 2, 0];
  var fromRotationMatrixQuat = new Array(3);
  Quaternion.fromRotationMatrix = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required.');
    }
    var root;
    var x;
    var y;
    var z;
    var w;
    var m00 = matrix[Matrix3.COLUMN0ROW0];
    var m11 = matrix[Matrix3.COLUMN1ROW1];
    var m22 = matrix[Matrix3.COLUMN2ROW2];
    var trace = m00 + m11 + m22;
    if (trace > 0.0) {
      root = Math.sqrt(trace + 1.0);
      w = 0.5 * root;
      root = 0.5 / root;
      x = (matrix[Matrix3.COLUMN1ROW2] - matrix[Matrix3.COLUMN2ROW1]) * root;
      y = (matrix[Matrix3.COLUMN2ROW0] - matrix[Matrix3.COLUMN0ROW2]) * root;
      z = (matrix[Matrix3.COLUMN0ROW1] - matrix[Matrix3.COLUMN1ROW0]) * root;
    } else {
      var next = fromRotationMatrixNext;
      var i = 0;
      if (m11 > m00) {
        i = 1;
      }
      if (m22 > m00 && m22 > m11) {
        i = 2;
      }
      var j = next[i];
      var k = next[j];
      root = Math.sqrt(matrix[Matrix3.getElementIndex(i, i)] - matrix[Matrix3.getElementIndex(j, j)] - matrix[Matrix3.getElementIndex(k, k)] + 1.0);
      var quat = fromRotationMatrixQuat;
      quat[i] = 0.5 * root;
      root = 0.5 / root;
      w = (matrix[Matrix3.getElementIndex(k, j)] - matrix[Matrix3.getElementIndex(j, k)]) * root;
      quat[j] = (matrix[Matrix3.getElementIndex(j, i)] + matrix[Matrix3.getElementIndex(i, j)]) * root;
      quat[k] = (matrix[Matrix3.getElementIndex(k, i)] + matrix[Matrix3.getElementIndex(i, k)]) * root;
      x = -quat[0];
      y = -quat[1];
      z = -quat[2];
    }
    if (!defined(result)) {
      return new Quaternion(x, y, z, w);
    }
    result.x = x;
    result.y = y;
    result.z = z;
    result.w = w;
    return result;
  };
  var scratchHPRQuaternion = new Quaternion();
  Quaternion.fromHeadingPitchRoll = function(heading, pitch, roll, result) {
    if (!defined(heading)) {
      throw new DeveloperError('heading is required.');
    }
    if (!defined(pitch)) {
      throw new DeveloperError('pitch is required.');
    }
    if (!defined(roll)) {
      throw new DeveloperError('roll is required.');
    }
    var rollQuaternion = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, roll, scratchHPRQuaternion);
    var pitchQuaternion = Quaternion.fromAxisAngle(Cartesian3.UNIT_Y, -pitch, result);
    result = Quaternion.multiply(pitchQuaternion, rollQuaternion, pitchQuaternion);
    var headingQuaternion = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, -heading, scratchHPRQuaternion);
    return Quaternion.multiply(headingQuaternion, result, result);
  };
  var sampledQuaternionAxis = new Cartesian3();
  var sampledQuaternionRotation = new Cartesian3();
  var sampledQuaternionTempQuaternion = new Quaternion();
  var sampledQuaternionQuaternion0 = new Quaternion();
  var sampledQuaternionQuaternion0Conjugate = new Quaternion();
  Quaternion.packedLength = 4;
  Quaternion.pack = function(value, array, startingIndex) {
    if (!defined(value)) {
      throw new DeveloperError('value is required');
    }
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    startingIndex = defaultValue(startingIndex, 0);
    array[startingIndex++] = value.x;
    array[startingIndex++] = value.y;
    array[startingIndex++] = value.z;
    array[startingIndex] = value.w;
  };
  Quaternion.unpack = function(array, startingIndex, result) {
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    startingIndex = defaultValue(startingIndex, 0);
    if (!defined(result)) {
      result = new Quaternion();
    }
    result.x = array[startingIndex];
    result.y = array[startingIndex + 1];
    result.z = array[startingIndex + 2];
    result.w = array[startingIndex + 3];
    return result;
  };
  Quaternion.packedInterpolationLength = 3;
  Quaternion.convertPackedArrayForInterpolation = function(packedArray, startingIndex, lastIndex, result) {
    Quaternion.unpack(packedArray, lastIndex * 4, sampledQuaternionQuaternion0Conjugate);
    Quaternion.conjugate(sampledQuaternionQuaternion0Conjugate, sampledQuaternionQuaternion0Conjugate);
    for (var i = 0,
        len = lastIndex - startingIndex + 1; i < len; i++) {
      var offset = i * 3;
      Quaternion.unpack(packedArray, (startingIndex + i) * 4, sampledQuaternionTempQuaternion);
      Quaternion.multiply(sampledQuaternionTempQuaternion, sampledQuaternionQuaternion0Conjugate, sampledQuaternionTempQuaternion);
      if (sampledQuaternionTempQuaternion.w < 0) {
        Quaternion.negate(sampledQuaternionTempQuaternion, sampledQuaternionTempQuaternion);
      }
      Quaternion.computeAxis(sampledQuaternionTempQuaternion, sampledQuaternionAxis);
      var angle = Quaternion.computeAngle(sampledQuaternionTempQuaternion);
      result[offset] = sampledQuaternionAxis.x * angle;
      result[offset + 1] = sampledQuaternionAxis.y * angle;
      result[offset + 2] = sampledQuaternionAxis.z * angle;
    }
  };
  Quaternion.unpackInterpolationResult = function(array, sourceArray, firstIndex, lastIndex, result) {
    if (!defined(result)) {
      result = new Quaternion();
    }
    Cartesian3.fromArray(array, 0, sampledQuaternionRotation);
    var magnitude = Cartesian3.magnitude(sampledQuaternionRotation);
    Quaternion.unpack(sourceArray, lastIndex * 4, sampledQuaternionQuaternion0);
    if (magnitude === 0) {
      Quaternion.clone(Quaternion.IDENTITY, sampledQuaternionTempQuaternion);
    } else {
      Quaternion.fromAxisAngle(sampledQuaternionRotation, magnitude, sampledQuaternionTempQuaternion);
    }
    return Quaternion.multiply(sampledQuaternionTempQuaternion, sampledQuaternionQuaternion0, result);
  };
  Quaternion.clone = function(quaternion, result) {
    if (!defined(quaternion)) {
      return undefined;
    }
    if (!defined(result)) {
      return new Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    }
    result.x = quaternion.x;
    result.y = quaternion.y;
    result.z = quaternion.z;
    result.w = quaternion.w;
    return result;
  };
  Quaternion.conjugate = function(quaternion, result) {
    if (!defined(quaternion)) {
      throw new DeveloperError('quaternion is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = -quaternion.x;
    result.y = -quaternion.y;
    result.z = -quaternion.z;
    result.w = quaternion.w;
    return result;
  };
  Quaternion.magnitudeSquared = function(quaternion) {
    if (!defined(quaternion)) {
      throw new DeveloperError('quaternion is required');
    }
    return quaternion.x * quaternion.x + quaternion.y * quaternion.y + quaternion.z * quaternion.z + quaternion.w * quaternion.w;
  };
  Quaternion.magnitude = function(quaternion) {
    return Math.sqrt(Quaternion.magnitudeSquared(quaternion));
  };
  Quaternion.normalize = function(quaternion, result) {
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var inverseMagnitude = 1.0 / Quaternion.magnitude(quaternion);
    var x = quaternion.x * inverseMagnitude;
    var y = quaternion.y * inverseMagnitude;
    var z = quaternion.z * inverseMagnitude;
    var w = quaternion.w * inverseMagnitude;
    result.x = x;
    result.y = y;
    result.z = z;
    result.w = w;
    return result;
  };
  Quaternion.inverse = function(quaternion, result) {
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var magnitudeSquared = Quaternion.magnitudeSquared(quaternion);
    result = Quaternion.conjugate(quaternion, result);
    return Quaternion.multiplyByScalar(result, 1.0 / magnitudeSquared, result);
  };
  Quaternion.add = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = left.x + right.x;
    result.y = left.y + right.y;
    result.z = left.z + right.z;
    result.w = left.w + right.w;
    return result;
  };
  Quaternion.subtract = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = left.x - right.x;
    result.y = left.y - right.y;
    result.z = left.z - right.z;
    result.w = left.w - right.w;
    return result;
  };
  Quaternion.negate = function(quaternion, result) {
    if (!defined(quaternion)) {
      throw new DeveloperError('quaternion is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = -quaternion.x;
    result.y = -quaternion.y;
    result.z = -quaternion.z;
    result.w = -quaternion.w;
    return result;
  };
  Quaternion.dot = function(left, right) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    return left.x * right.x + left.y * right.y + left.z * right.z + left.w * right.w;
  };
  Quaternion.multiply = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var leftX = left.x;
    var leftY = left.y;
    var leftZ = left.z;
    var leftW = left.w;
    var rightX = right.x;
    var rightY = right.y;
    var rightZ = right.z;
    var rightW = right.w;
    var x = leftW * rightX + leftX * rightW + leftY * rightZ - leftZ * rightY;
    var y = leftW * rightY - leftX * rightZ + leftY * rightW + leftZ * rightX;
    var z = leftW * rightZ + leftX * rightY - leftY * rightX + leftZ * rightW;
    var w = leftW * rightW - leftX * rightX - leftY * rightY - leftZ * rightZ;
    result.x = x;
    result.y = y;
    result.z = z;
    result.w = w;
    return result;
  };
  Quaternion.multiplyByScalar = function(quaternion, scalar, result) {
    if (!defined(quaternion)) {
      throw new DeveloperError('quaternion is required');
    }
    if (typeof scalar !== 'number') {
      throw new DeveloperError('scalar is required and must be a number.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = quaternion.x * scalar;
    result.y = quaternion.y * scalar;
    result.z = quaternion.z * scalar;
    result.w = quaternion.w * scalar;
    return result;
  };
  Quaternion.divideByScalar = function(quaternion, scalar, result) {
    if (!defined(quaternion)) {
      throw new DeveloperError('quaternion is required');
    }
    if (typeof scalar !== 'number') {
      throw new DeveloperError('scalar is required and must be a number.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = quaternion.x / scalar;
    result.y = quaternion.y / scalar;
    result.z = quaternion.z / scalar;
    result.w = quaternion.w / scalar;
    return result;
  };
  Quaternion.computeAxis = function(quaternion, result) {
    if (!defined(quaternion)) {
      throw new DeveloperError('quaternion is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var w = quaternion.w;
    if (Math.abs(w - 1.0) < CesiumMath.EPSILON6) {
      result.x = result.y = result.z = 0;
      return result;
    }
    var scalar = 1.0 / Math.sqrt(1.0 - (w * w));
    result.x = quaternion.x * scalar;
    result.y = quaternion.y * scalar;
    result.z = quaternion.z * scalar;
    return result;
  };
  Quaternion.computeAngle = function(quaternion) {
    if (!defined(quaternion)) {
      throw new DeveloperError('quaternion is required');
    }
    if (Math.abs(quaternion.w - 1.0) < CesiumMath.EPSILON6) {
      return 0.0;
    }
    return 2.0 * Math.acos(quaternion.w);
  };
  var lerpScratch = new Quaternion();
  Quaternion.lerp = function(start, end, t, result) {
    if (!defined(start)) {
      throw new DeveloperError('start is required.');
    }
    if (!defined(end)) {
      throw new DeveloperError('end is required.');
    }
    if (typeof t !== 'number') {
      throw new DeveloperError('t is required and must be a number.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    lerpScratch = Quaternion.multiplyByScalar(end, t, lerpScratch);
    result = Quaternion.multiplyByScalar(start, 1.0 - t, result);
    return Quaternion.add(lerpScratch, result, result);
  };
  var slerpEndNegated = new Quaternion();
  var slerpScaledP = new Quaternion();
  var slerpScaledR = new Quaternion();
  Quaternion.slerp = function(start, end, t, result) {
    if (!defined(start)) {
      throw new DeveloperError('start is required.');
    }
    if (!defined(end)) {
      throw new DeveloperError('end is required.');
    }
    if (typeof t !== 'number') {
      throw new DeveloperError('t is required and must be a number.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var dot = Quaternion.dot(start, end);
    var r = end;
    if (dot < 0.0) {
      dot = -dot;
      r = slerpEndNegated = Quaternion.negate(end, slerpEndNegated);
    }
    if (1.0 - dot < CesiumMath.EPSILON6) {
      return Quaternion.lerp(start, r, t, result);
    }
    var theta = Math.acos(dot);
    slerpScaledP = Quaternion.multiplyByScalar(start, Math.sin((1 - t) * theta), slerpScaledP);
    slerpScaledR = Quaternion.multiplyByScalar(r, Math.sin(t * theta), slerpScaledR);
    result = Quaternion.add(slerpScaledP, slerpScaledR, result);
    return Quaternion.multiplyByScalar(result, 1.0 / Math.sin(theta), result);
  };
  Quaternion.log = function(quaternion, result) {
    if (!defined(quaternion)) {
      throw new DeveloperError('quaternion is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var theta = CesiumMath.acosClamped(quaternion.w);
    var thetaOverSinTheta = 0.0;
    if (theta !== 0.0) {
      thetaOverSinTheta = theta / Math.sin(theta);
    }
    return Cartesian3.multiplyByScalar(quaternion, thetaOverSinTheta, result);
  };
  Quaternion.exp = function(cartesian, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var theta = Cartesian3.magnitude(cartesian);
    var sinThetaOverTheta = 0.0;
    if (theta !== 0.0) {
      sinThetaOverTheta = Math.sin(theta) / theta;
    }
    result.x = cartesian.x * sinThetaOverTheta;
    result.y = cartesian.y * sinThetaOverTheta;
    result.z = cartesian.z * sinThetaOverTheta;
    result.w = Math.cos(theta);
    return result;
  };
  var squadScratchCartesian0 = new Cartesian3();
  var squadScratchCartesian1 = new Cartesian3();
  var squadScratchQuaternion0 = new Quaternion();
  var squadScratchQuaternion1 = new Quaternion();
  Quaternion.computeInnerQuadrangle = function(q0, q1, q2, result) {
    if (!defined(q0) || !defined(q1) || !defined(q2)) {
      throw new DeveloperError('q0, q1, and q2 are required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var qInv = Quaternion.conjugate(q1, squadScratchQuaternion0);
    Quaternion.multiply(qInv, q2, squadScratchQuaternion1);
    var cart0 = Quaternion.log(squadScratchQuaternion1, squadScratchCartesian0);
    Quaternion.multiply(qInv, q0, squadScratchQuaternion1);
    var cart1 = Quaternion.log(squadScratchQuaternion1, squadScratchCartesian1);
    Cartesian3.add(cart0, cart1, cart0);
    Cartesian3.multiplyByScalar(cart0, 0.25, cart0);
    Cartesian3.negate(cart0, cart0);
    Quaternion.exp(cart0, squadScratchQuaternion0);
    return Quaternion.multiply(q1, squadScratchQuaternion0, result);
  };
  Quaternion.squad = function(q0, q1, s0, s1, t, result) {
    if (!defined(q0) || !defined(q1) || !defined(s0) || !defined(s1)) {
      throw new DeveloperError('q0, q1, s0, and s1 are required.');
    }
    if (typeof t !== 'number') {
      throw new DeveloperError('t is required and must be a number.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var slerp0 = Quaternion.slerp(q0, q1, t, squadScratchQuaternion0);
    var slerp1 = Quaternion.slerp(s0, s1, t, squadScratchQuaternion1);
    return Quaternion.slerp(slerp0, slerp1, 2.0 * t * (1.0 - t), result);
  };
  var fastSlerpScratchQuaternion = new Quaternion();
  var opmu = 1.90110745351730037;
  var u = FeatureDetection.supportsTypedArrays() ? new Float32Array(8) : [];
  var v = FeatureDetection.supportsTypedArrays() ? new Float32Array(8) : [];
  var bT = FeatureDetection.supportsTypedArrays() ? new Float32Array(8) : [];
  var bD = FeatureDetection.supportsTypedArrays() ? new Float32Array(8) : [];
  for (var i = 0; i < 7; ++i) {
    var s = i + 1.0;
    var t = 2.0 * s + 1.0;
    u[i] = 1.0 / (s * t);
    v[i] = s / t;
  }
  u[7] = opmu / (8.0 * 17.0);
  v[7] = opmu * 8.0 / 17.0;
  Quaternion.fastSlerp = function(start, end, t, result) {
    if (!defined(start)) {
      throw new DeveloperError('start is required.');
    }
    if (!defined(end)) {
      throw new DeveloperError('end is required.');
    }
    if (typeof t !== 'number') {
      throw new DeveloperError('t is required and must be a number.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var x = Quaternion.dot(start, end);
    var sign;
    if (x >= 0) {
      sign = 1.0;
    } else {
      sign = -1.0;
      x = -x;
    }
    var xm1 = x - 1.0;
    var d = 1.0 - t;
    var sqrT = t * t;
    var sqrD = d * d;
    for (var i = 7; i >= 0; --i) {
      bT[i] = (u[i] * sqrT - v[i]) * xm1;
      bD[i] = (u[i] * sqrD - v[i]) * xm1;
    }
    var cT = sign * t * (1.0 + bT[0] * (1.0 + bT[1] * (1.0 + bT[2] * (1.0 + bT[3] * (1.0 + bT[4] * (1.0 + bT[5] * (1.0 + bT[6] * (1.0 + bT[7]))))))));
    var cD = d * (1.0 + bD[0] * (1.0 + bD[1] * (1.0 + bD[2] * (1.0 + bD[3] * (1.0 + bD[4] * (1.0 + bD[5] * (1.0 + bD[6] * (1.0 + bD[7]))))))));
    var temp = Quaternion.multiplyByScalar(start, cD, fastSlerpScratchQuaternion);
    Quaternion.multiplyByScalar(end, cT, result);
    return Quaternion.add(temp, result, result);
  };
  Quaternion.fastSquad = function(q0, q1, s0, s1, t, result) {
    if (!defined(q0) || !defined(q1) || !defined(s0) || !defined(s1)) {
      throw new DeveloperError('q0, q1, s0, and s1 are required.');
    }
    if (typeof t !== 'number') {
      throw new DeveloperError('t is required and must be a number.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var slerp0 = Quaternion.fastSlerp(q0, q1, t, squadScratchQuaternion0);
    var slerp1 = Quaternion.fastSlerp(s0, s1, t, squadScratchQuaternion1);
    return Quaternion.fastSlerp(slerp0, slerp1, 2.0 * t * (1.0 - t), result);
  };
  Quaternion.equals = function(left, right) {
    return (left === right) || ((defined(left)) && (defined(right)) && (left.x === right.x) && (left.y === right.y) && (left.z === right.z) && (left.w === right.w));
  };
  Quaternion.equalsEpsilon = function(left, right, epsilon) {
    if (typeof epsilon !== 'number') {
      throw new DeveloperError('epsilon is required and must be a number.');
    }
    return (left === right) || ((defined(left)) && (defined(right)) && (Math.abs(left.x - right.x) <= epsilon) && (Math.abs(left.y - right.y) <= epsilon) && (Math.abs(left.z - right.z) <= epsilon) && (Math.abs(left.w - right.w) <= epsilon));
  };
  Quaternion.ZERO = freezeObject(new Quaternion(0.0, 0.0, 0.0, 0.0));
  Quaternion.IDENTITY = freezeObject(new Quaternion(0.0, 0.0, 0.0, 1.0));
  Quaternion.prototype.clone = function(result) {
    return Quaternion.clone(this, result);
  };
  Quaternion.prototype.equals = function(right) {
    return Quaternion.equals(this, right);
  };
  Quaternion.prototype.equalsEpsilon = function(right, epsilon) {
    return Quaternion.equalsEpsilon(this, right, epsilon);
  };
  Quaternion.prototype.toString = function() {
    return '(' + this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w + ')';
  };
  return Quaternion;
});

})();
(function() {
var define = $__System.amdDefine;
define("35", ["4e", "45", "2c", "43", "3b", "23", "1a", "1c", "4d", "4f", "3c", "5d", "5e", "24", "27", "32", "33", "34", "52"], function(when, Cartesian2, Cartesian3, Cartesian4, Cartographic, defaultValue, defined, DeveloperError, EarthOrientationParameters, EarthOrientationParametersSample, Ellipsoid, Iau2006XysData, Iau2006XysSample, JulianDate, CesiumMath, Matrix3, Matrix4, Quaternion, TimeConstants) {
  'use strict';
  var Transforms = {};
  var eastNorthUpToFixedFrameNormal = new Cartesian3();
  var eastNorthUpToFixedFrameTangent = new Cartesian3();
  var eastNorthUpToFixedFrameBitangent = new Cartesian3();
  Transforms.eastNorthUpToFixedFrame = function(origin, ellipsoid, result) {
    if (!defined(origin)) {
      throw new DeveloperError('origin is required.');
    }
    if (CesiumMath.equalsEpsilon(origin.x, 0.0, CesiumMath.EPSILON14) && CesiumMath.equalsEpsilon(origin.y, 0.0, CesiumMath.EPSILON14)) {
      var sign = CesiumMath.sign(origin.z);
      if (!defined(result)) {
        return new Matrix4(0.0, -sign, 0.0, origin.x, 1.0, 0.0, 0.0, origin.y, 0.0, 0.0, sign, origin.z, 0.0, 0.0, 0.0, 1.0);
      }
      result[0] = 0.0;
      result[1] = 1.0;
      result[2] = 0.0;
      result[3] = 0.0;
      result[4] = -sign;
      result[5] = 0.0;
      result[6] = 0.0;
      result[7] = 0.0;
      result[8] = 0.0;
      result[9] = 0.0;
      result[10] = sign;
      result[11] = 0.0;
      result[12] = origin.x;
      result[13] = origin.y;
      result[14] = origin.z;
      result[15] = 1.0;
      return result;
    }
    var normal = eastNorthUpToFixedFrameNormal;
    var tangent = eastNorthUpToFixedFrameTangent;
    var bitangent = eastNorthUpToFixedFrameBitangent;
    ellipsoid = defaultValue(ellipsoid, Ellipsoid.WGS84);
    ellipsoid.geodeticSurfaceNormal(origin, normal);
    tangent.x = -origin.y;
    tangent.y = origin.x;
    tangent.z = 0.0;
    Cartesian3.normalize(tangent, tangent);
    Cartesian3.cross(normal, tangent, bitangent);
    if (!defined(result)) {
      return new Matrix4(tangent.x, bitangent.x, normal.x, origin.x, tangent.y, bitangent.y, normal.y, origin.y, tangent.z, bitangent.z, normal.z, origin.z, 0.0, 0.0, 0.0, 1.0);
    }
    result[0] = tangent.x;
    result[1] = tangent.y;
    result[2] = tangent.z;
    result[3] = 0.0;
    result[4] = bitangent.x;
    result[5] = bitangent.y;
    result[6] = bitangent.z;
    result[7] = 0.0;
    result[8] = normal.x;
    result[9] = normal.y;
    result[10] = normal.z;
    result[11] = 0.0;
    result[12] = origin.x;
    result[13] = origin.y;
    result[14] = origin.z;
    result[15] = 1.0;
    return result;
  };
  var northEastDownToFixedFrameNormal = new Cartesian3();
  var northEastDownToFixedFrameTangent = new Cartesian3();
  var northEastDownToFixedFrameBitangent = new Cartesian3();
  Transforms.northEastDownToFixedFrame = function(origin, ellipsoid, result) {
    if (!defined(origin)) {
      throw new DeveloperError('origin is required.');
    }
    if (CesiumMath.equalsEpsilon(origin.x, 0.0, CesiumMath.EPSILON14) && CesiumMath.equalsEpsilon(origin.y, 0.0, CesiumMath.EPSILON14)) {
      var sign = CesiumMath.sign(origin.z);
      if (!defined(result)) {
        return new Matrix4(-sign, 0.0, 0.0, origin.x, 0.0, 1.0, 0.0, origin.y, 0.0, 0.0, -sign, origin.z, 0.0, 0.0, 0.0, 1.0);
      }
      result[0] = -sign;
      result[1] = 0.0;
      result[2] = 0.0;
      result[3] = 0.0;
      result[4] = 0.0;
      result[5] = 1.0;
      result[6] = 0.0;
      result[7] = 0.0;
      result[8] = 0.0;
      result[9] = 0.0;
      result[10] = -sign;
      result[11] = 0.0;
      result[12] = origin.x;
      result[13] = origin.y;
      result[14] = origin.z;
      result[15] = 1.0;
      return result;
    }
    var normal = northEastDownToFixedFrameNormal;
    var tangent = northEastDownToFixedFrameTangent;
    var bitangent = northEastDownToFixedFrameBitangent;
    ellipsoid = defaultValue(ellipsoid, Ellipsoid.WGS84);
    ellipsoid.geodeticSurfaceNormal(origin, normal);
    tangent.x = -origin.y;
    tangent.y = origin.x;
    tangent.z = 0.0;
    Cartesian3.normalize(tangent, tangent);
    Cartesian3.cross(normal, tangent, bitangent);
    if (!defined(result)) {
      return new Matrix4(bitangent.x, tangent.x, -normal.x, origin.x, bitangent.y, tangent.y, -normal.y, origin.y, bitangent.z, tangent.z, -normal.z, origin.z, 0.0, 0.0, 0.0, 1.0);
    }
    result[0] = bitangent.x;
    result[1] = bitangent.y;
    result[2] = bitangent.z;
    result[3] = 0.0;
    result[4] = tangent.x;
    result[5] = tangent.y;
    result[6] = tangent.z;
    result[7] = 0.0;
    result[8] = -normal.x;
    result[9] = -normal.y;
    result[10] = -normal.z;
    result[11] = 0.0;
    result[12] = origin.x;
    result[13] = origin.y;
    result[14] = origin.z;
    result[15] = 1.0;
    return result;
  };
  Transforms.northUpEastToFixedFrame = function(origin, ellipsoid, result) {
    if (!defined(origin)) {
      throw new DeveloperError('origin is required.');
    }
    if (CesiumMath.equalsEpsilon(origin.x, 0.0, CesiumMath.EPSILON14) && CesiumMath.equalsEpsilon(origin.y, 0.0, CesiumMath.EPSILON14)) {
      var sign = CesiumMath.sign(origin.z);
      if (!defined(result)) {
        return new Matrix4(-sign, 0.0, 0.0, origin.x, 0.0, 0.0, 1.0, origin.y, 0.0, sign, 0.0, origin.z, 0.0, 0.0, 0.0, 1.0);
      }
      result[0] = -sign;
      result[1] = 0.0;
      result[2] = 0.0;
      result[3] = 0.0;
      result[4] = 0.0;
      result[5] = 0.0;
      result[6] = sign;
      result[7] = 0.0;
      result[8] = 0.0;
      result[9] = 1.0;
      result[10] = 0.0;
      result[11] = 0.0;
      result[12] = origin.x;
      result[13] = origin.y;
      result[14] = origin.z;
      result[15] = 1.0;
      return result;
    }
    var normal = eastNorthUpToFixedFrameNormal;
    var tangent = eastNorthUpToFixedFrameTangent;
    var bitangent = eastNorthUpToFixedFrameBitangent;
    ellipsoid = defaultValue(ellipsoid, Ellipsoid.WGS84);
    ellipsoid.geodeticSurfaceNormal(origin, normal);
    tangent.x = -origin.y;
    tangent.y = origin.x;
    tangent.z = 0.0;
    Cartesian3.normalize(tangent, tangent);
    Cartesian3.cross(normal, tangent, bitangent);
    if (!defined(result)) {
      return new Matrix4(bitangent.x, normal.x, tangent.x, origin.x, bitangent.y, normal.y, tangent.y, origin.y, bitangent.z, normal.z, tangent.z, origin.z, 0.0, 0.0, 0.0, 1.0);
    }
    result[0] = bitangent.x;
    result[1] = bitangent.y;
    result[2] = bitangent.z;
    result[3] = 0.0;
    result[4] = normal.x;
    result[5] = normal.y;
    result[6] = normal.z;
    result[7] = 0.0;
    result[8] = tangent.x;
    result[9] = tangent.y;
    result[10] = tangent.z;
    result[11] = 0.0;
    result[12] = origin.x;
    result[13] = origin.y;
    result[14] = origin.z;
    result[15] = 1.0;
    return result;
  };
  var scratchHPRQuaternion = new Quaternion();
  var scratchScale = new Cartesian3(1.0, 1.0, 1.0);
  var scratchHPRMatrix4 = new Matrix4();
  Transforms.headingPitchRollToFixedFrame = function(origin, heading, pitch, roll, ellipsoid, result) {
    var hprQuaternion = Quaternion.fromHeadingPitchRoll(heading, pitch, roll, scratchHPRQuaternion);
    var hprMatrix = Matrix4.fromTranslationQuaternionRotationScale(Cartesian3.ZERO, hprQuaternion, scratchScale, scratchHPRMatrix4);
    result = Transforms.eastNorthUpToFixedFrame(origin, ellipsoid, result);
    return Matrix4.multiply(result, hprMatrix, result);
  };
  var scratchENUMatrix4 = new Matrix4();
  var scratchHPRMatrix3 = new Matrix3();
  Transforms.headingPitchRollQuaternion = function(origin, heading, pitch, roll, ellipsoid, result) {
    var transform = Transforms.headingPitchRollToFixedFrame(origin, heading, pitch, roll, ellipsoid, scratchENUMatrix4);
    var rotation = Matrix4.getRotation(transform, scratchHPRMatrix3);
    return Quaternion.fromRotationMatrix(rotation, result);
  };
  var gmstConstant0 = 6 * 3600 + 41 * 60 + 50.54841;
  var gmstConstant1 = 8640184.812866;
  var gmstConstant2 = 0.093104;
  var gmstConstant3 = -6.2E-6;
  var rateCoef = 1.1772758384668e-19;
  var wgs84WRPrecessing = 7.2921158553E-5;
  var twoPiOverSecondsInDay = CesiumMath.TWO_PI / 86400.0;
  var dateInUtc = new JulianDate();
  Transforms.computeTemeToPseudoFixedMatrix = function(date, result) {
    if (!defined(date)) {
      throw new DeveloperError('date is required.');
    }
    dateInUtc = JulianDate.addSeconds(date, -JulianDate.computeTaiMinusUtc(date), dateInUtc);
    var utcDayNumber = dateInUtc.dayNumber;
    var utcSecondsIntoDay = dateInUtc.secondsOfDay;
    var t;
    var diffDays = utcDayNumber - 2451545;
    if (utcSecondsIntoDay >= 43200.0) {
      t = (diffDays + 0.5) / TimeConstants.DAYS_PER_JULIAN_CENTURY;
    } else {
      t = (diffDays - 0.5) / TimeConstants.DAYS_PER_JULIAN_CENTURY;
    }
    var gmst0 = gmstConstant0 + t * (gmstConstant1 + t * (gmstConstant2 + t * gmstConstant3));
    var angle = (gmst0 * twoPiOverSecondsInDay) % CesiumMath.TWO_PI;
    var ratio = wgs84WRPrecessing + rateCoef * (utcDayNumber - 2451545.5);
    var secondsSinceMidnight = (utcSecondsIntoDay + TimeConstants.SECONDS_PER_DAY * 0.5) % TimeConstants.SECONDS_PER_DAY;
    var gha = angle + (ratio * secondsSinceMidnight);
    var cosGha = Math.cos(gha);
    var sinGha = Math.sin(gha);
    if (!defined(result)) {
      return new Matrix3(cosGha, sinGha, 0.0, -sinGha, cosGha, 0.0, 0.0, 0.0, 1.0);
    }
    result[0] = cosGha;
    result[1] = -sinGha;
    result[2] = 0.0;
    result[3] = sinGha;
    result[4] = cosGha;
    result[5] = 0.0;
    result[6] = 0.0;
    result[7] = 0.0;
    result[8] = 1.0;
    return result;
  };
  Transforms.iau2006XysData = new Iau2006XysData();
  Transforms.earthOrientationParameters = EarthOrientationParameters.NONE;
  var ttMinusTai = 32.184;
  var j2000ttDays = 2451545.0;
  Transforms.preloadIcrfFixed = function(timeInterval) {
    var startDayTT = timeInterval.start.dayNumber;
    var startSecondTT = timeInterval.start.secondsOfDay + ttMinusTai;
    var stopDayTT = timeInterval.stop.dayNumber;
    var stopSecondTT = timeInterval.stop.secondsOfDay + ttMinusTai;
    var xysPromise = Transforms.iau2006XysData.preload(startDayTT, startSecondTT, stopDayTT, stopSecondTT);
    var eopPromise = Transforms.earthOrientationParameters.getPromiseToLoad();
    return when.all([xysPromise, eopPromise]);
  };
  Transforms.computeIcrfToFixedMatrix = function(date, result) {
    if (!defined(date)) {
      throw new DeveloperError('date is required.');
    }
    if (!defined(result)) {
      result = new Matrix3();
    }
    var fixedToIcrfMtx = Transforms.computeFixedToIcrfMatrix(date, result);
    if (!defined(fixedToIcrfMtx)) {
      return undefined;
    }
    return Matrix3.transpose(fixedToIcrfMtx, result);
  };
  var xysScratch = new Iau2006XysSample(0.0, 0.0, 0.0);
  var eopScratch = new EarthOrientationParametersSample(0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
  var rotation1Scratch = new Matrix3();
  var rotation2Scratch = new Matrix3();
  Transforms.computeFixedToIcrfMatrix = function(date, result) {
    if (!defined(date)) {
      throw new DeveloperError('date is required.');
    }
    if (!defined(result)) {
      result = new Matrix3();
    }
    var eop = Transforms.earthOrientationParameters.compute(date, eopScratch);
    if (!defined(eop)) {
      return undefined;
    }
    var dayTT = date.dayNumber;
    var secondTT = date.secondsOfDay + ttMinusTai;
    var xys = Transforms.iau2006XysData.computeXysRadians(dayTT, secondTT, xysScratch);
    if (!defined(xys)) {
      return undefined;
    }
    var x = xys.x + eop.xPoleOffset;
    var y = xys.y + eop.yPoleOffset;
    var a = 1.0 / (1.0 + Math.sqrt(1.0 - x * x - y * y));
    var rotation1 = rotation1Scratch;
    rotation1[0] = 1.0 - a * x * x;
    rotation1[3] = -a * x * y;
    rotation1[6] = x;
    rotation1[1] = -a * x * y;
    rotation1[4] = 1 - a * y * y;
    rotation1[7] = y;
    rotation1[2] = -x;
    rotation1[5] = -y;
    rotation1[8] = 1 - a * (x * x + y * y);
    var rotation2 = Matrix3.fromRotationZ(-xys.s, rotation2Scratch);
    var matrixQ = Matrix3.multiply(rotation1, rotation2, rotation1Scratch);
    var dateUt1day = date.dayNumber;
    var dateUt1sec = date.secondsOfDay - JulianDate.computeTaiMinusUtc(date) + eop.ut1MinusUtc;
    var daysSinceJ2000 = dateUt1day - 2451545;
    var fractionOfDay = dateUt1sec / TimeConstants.SECONDS_PER_DAY;
    var era = 0.7790572732640 + fractionOfDay + 0.00273781191135448 * (daysSinceJ2000 + fractionOfDay);
    era = (era % 1.0) * CesiumMath.TWO_PI;
    var earthRotation = Matrix3.fromRotationZ(era, rotation2Scratch);
    var pfToIcrf = Matrix3.multiply(matrixQ, earthRotation, rotation1Scratch);
    var cosxp = Math.cos(eop.xPoleWander);
    var cosyp = Math.cos(eop.yPoleWander);
    var sinxp = Math.sin(eop.xPoleWander);
    var sinyp = Math.sin(eop.yPoleWander);
    var ttt = (dayTT - j2000ttDays) + secondTT / TimeConstants.SECONDS_PER_DAY;
    ttt /= 36525.0;
    var sp = -47.0e-6 * ttt * CesiumMath.RADIANS_PER_DEGREE / 3600.0;
    var cossp = Math.cos(sp);
    var sinsp = Math.sin(sp);
    var fToPfMtx = rotation2Scratch;
    fToPfMtx[0] = cosxp * cossp;
    fToPfMtx[1] = cosxp * sinsp;
    fToPfMtx[2] = sinxp;
    fToPfMtx[3] = -cosyp * sinsp + sinyp * sinxp * cossp;
    fToPfMtx[4] = cosyp * cossp + sinyp * sinxp * sinsp;
    fToPfMtx[5] = -sinyp * cosxp;
    fToPfMtx[6] = -sinyp * sinsp - cosyp * sinxp * cossp;
    fToPfMtx[7] = sinyp * cossp - cosyp * sinxp * sinsp;
    fToPfMtx[8] = cosyp * cosxp;
    return Matrix3.multiply(pfToIcrf, fToPfMtx, result);
  };
  var pointToWindowCoordinatesTemp = new Cartesian4();
  Transforms.pointToWindowCoordinates = function(modelViewProjectionMatrix, viewportTransformation, point, result) {
    result = Transforms.pointToGLWindowCoordinates(modelViewProjectionMatrix, viewportTransformation, point, result);
    result.y = 2.0 * viewportTransformation[5] - result.y;
    return result;
  };
  Transforms.pointToGLWindowCoordinates = function(modelViewProjectionMatrix, viewportTransformation, point, result) {
    if (!defined(modelViewProjectionMatrix)) {
      throw new DeveloperError('modelViewProjectionMatrix is required.');
    }
    if (!defined(viewportTransformation)) {
      throw new DeveloperError('viewportTransformation is required.');
    }
    if (!defined(point)) {
      throw new DeveloperError('point is required.');
    }
    if (!defined(result)) {
      result = new Cartesian2();
    }
    var tmp = pointToWindowCoordinatesTemp;
    Matrix4.multiplyByVector(modelViewProjectionMatrix, Cartesian4.fromElements(point.x, point.y, point.z, 1, tmp), tmp);
    Cartesian4.multiplyByScalar(tmp, 1.0 / tmp.w, tmp);
    Matrix4.multiplyByVector(viewportTransformation, tmp, tmp);
    return Cartesian2.fromCartesian4(tmp, result);
  };
  var normalScratch = new Cartesian3();
  var rightScratch = new Cartesian3();
  var upScratch = new Cartesian3();
  Transforms.rotationMatrixFromPositionVelocity = function(position, velocity, ellipsoid, result) {
    if (!defined(position)) {
      throw new DeveloperError('position is required.');
    }
    if (!defined(velocity)) {
      throw new DeveloperError('velocity is required.');
    }
    var normal = defaultValue(ellipsoid, Ellipsoid.WGS84).geodeticSurfaceNormal(position, normalScratch);
    var right = Cartesian3.cross(velocity, normal, rightScratch);
    if (Cartesian3.equalsEpsilon(right, Cartesian3.ZERO, CesiumMath.EPSILON6)) {
      right = Cartesian3.clone(Cartesian3.UNIT_X, right);
    }
    var up = Cartesian3.cross(right, velocity, upScratch);
    Cartesian3.cross(velocity, up, right);
    Cartesian3.negate(right, right);
    if (!defined(result)) {
      result = new Matrix3();
    }
    result[0] = velocity.x;
    result[1] = velocity.y;
    result[2] = velocity.z;
    result[3] = right.x;
    result[4] = right.y;
    result[5] = right.z;
    result[6] = up.x;
    result[7] = up.y;
    result[8] = up.z;
    return result;
  };
  var scratchCartographic = new Cartographic();
  var scratchCartesian3Projection = new Cartesian3();
  var scratchCartesian3 = new Cartesian3();
  var scratchCartesian4Origin = new Cartesian4();
  var scratchCartesian4NewOrigin = new Cartesian4();
  var scratchCartesian4NewXAxis = new Cartesian4();
  var scratchCartesian4NewYAxis = new Cartesian4();
  var scratchCartesian4NewZAxis = new Cartesian4();
  var scratchFromENU = new Matrix4();
  var scratchToENU = new Matrix4();
  Transforms.basisTo2D = function(projection, matrix, result) {
    if (!defined(projection)) {
      throw new DeveloperError('projection is required.');
    }
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    var ellipsoid = projection.ellipsoid;
    var origin = Matrix4.getColumn(matrix, 3, scratchCartesian4Origin);
    var cartographic = ellipsoid.cartesianToCartographic(origin, scratchCartographic);
    var fromENU = Transforms.eastNorthUpToFixedFrame(origin, ellipsoid, scratchFromENU);
    var toENU = Matrix4.inverseTransformation(fromENU, scratchToENU);
    var projectedPosition = projection.project(cartographic, scratchCartesian3Projection);
    var newOrigin = scratchCartesian4NewOrigin;
    newOrigin.x = projectedPosition.z;
    newOrigin.y = projectedPosition.x;
    newOrigin.z = projectedPosition.y;
    newOrigin.w = 1.0;
    var xAxis = Matrix4.getColumn(matrix, 0, scratchCartesian3);
    var xScale = Cartesian3.magnitude(xAxis);
    var newXAxis = Matrix4.multiplyByVector(toENU, xAxis, scratchCartesian4NewXAxis);
    Cartesian4.fromElements(newXAxis.z, newXAxis.x, newXAxis.y, 0.0, newXAxis);
    var yAxis = Matrix4.getColumn(matrix, 1, scratchCartesian3);
    var yScale = Cartesian3.magnitude(yAxis);
    var newYAxis = Matrix4.multiplyByVector(toENU, yAxis, scratchCartesian4NewYAxis);
    Cartesian4.fromElements(newYAxis.z, newYAxis.x, newYAxis.y, 0.0, newYAxis);
    var zAxis = Matrix4.getColumn(matrix, 2, scratchCartesian3);
    var zScale = Cartesian3.magnitude(zAxis);
    var newZAxis = scratchCartesian4NewZAxis;
    Cartesian3.cross(newXAxis, newYAxis, newZAxis);
    Cartesian3.normalize(newZAxis, newZAxis);
    Cartesian3.cross(newYAxis, newZAxis, newXAxis);
    Cartesian3.normalize(newXAxis, newXAxis);
    Cartesian3.cross(newZAxis, newXAxis, newYAxis);
    Cartesian3.normalize(newYAxis, newYAxis);
    Cartesian3.multiplyByScalar(newXAxis, xScale, newXAxis);
    Cartesian3.multiplyByScalar(newYAxis, yScale, newYAxis);
    Cartesian3.multiplyByScalar(newZAxis, zScale, newZAxis);
    Matrix4.setColumn(result, 0, newXAxis, result);
    Matrix4.setColumn(result, 1, newYAxis, result);
    Matrix4.setColumn(result, 2, newZAxis, result);
    Matrix4.setColumn(result, 3, newOrigin, result);
    return result;
  };
  return Transforms;
});

})();
(function() {
var define = $__System.amdDefine;
define("61", [], function() {
  function sprintf() {
    var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g;
    var a = arguments,
        i = 0,
        format = a[i++];
    var pad = function(str, len, chr, leftJustify) {
      if (!chr) {
        chr = ' ';
      }
      var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
      return leftJustify ? str + padding : padding + str;
    };
    var justify = function(value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
      var diff = minWidth - value.length;
      if (diff > 0) {
        if (leftJustify || !zeroPad) {
          value = pad(value, minWidth, customPadChar, leftJustify);
        } else {
          value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
        }
      }
      return value;
    };
    var formatBaseX = function(value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
      var number = value >>> 0;
      prefix = prefix && number && {
        '2': '0b',
        '8': '0',
        '16': '0x'
      }[base] || '';
      value = prefix + pad(number.toString(base), precision || 0, '0', false);
      return justify(value, prefix, leftJustify, minWidth, zeroPad);
    };
    var formatString = function(value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
      if (precision != null) {
        value = value.slice(0, precision);
      }
      return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
    };
    var doFormat = function(substring, valueIndex, flags, minWidth, _, precision, type) {
      var number;
      var prefix;
      var method;
      var textTransform;
      var value;
      if (substring == '%%') {
        return '%';
      }
      var leftJustify = false,
          positivePrefix = '',
          zeroPad = false,
          prefixBaseX = false,
          customPadChar = ' ';
      var flagsl = flags.length;
      for (var j = 0; flags && j < flagsl; j++) {
        switch (flags.charAt(j)) {
          case ' ':
            positivePrefix = ' ';
            break;
          case '+':
            positivePrefix = '+';
            break;
          case '-':
            leftJustify = true;
            break;
          case "'":
            customPadChar = flags.charAt(j + 1);
            break;
          case '0':
            zeroPad = true;
            break;
          case '#':
            prefixBaseX = true;
            break;
        }
      }
      if (!minWidth) {
        minWidth = 0;
      } else if (minWidth == '*') {
        minWidth = +a[i++];
      } else if (minWidth.charAt(0) == '*') {
        minWidth = +a[minWidth.slice(1, -1)];
      } else {
        minWidth = +minWidth;
      }
      if (minWidth < 0) {
        minWidth = -minWidth;
        leftJustify = true;
      }
      if (!isFinite(minWidth)) {
        throw new Error('sprintf: (minimum-)width must be finite');
      }
      if (!precision) {
        precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type == 'd') ? 0 : undefined;
      } else if (precision == '*') {
        precision = +a[i++];
      } else if (precision.charAt(0) == '*') {
        precision = +a[precision.slice(1, -1)];
      } else {
        precision = +precision;
      }
      value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];
      switch (type) {
        case 's':
          return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
        case 'c':
          return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
        case 'b':
          return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
        case 'o':
          return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
        case 'x':
          return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
        case 'X':
          return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad).toUpperCase();
        case 'u':
          return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
        case 'i':
        case 'd':
          number = +value || 0;
          number = Math.round(number - number % 1);
          prefix = number < 0 ? '-' : positivePrefix;
          value = prefix + pad(String(Math.abs(number)), precision, '0', false);
          return justify(value, prefix, leftJustify, minWidth, zeroPad);
        case 'e':
        case 'E':
        case 'f':
        case 'F':
        case 'g':
        case 'G':
          number = +value;
          prefix = number < 0 ? '-' : positivePrefix;
          method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
          textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
          value = prefix + Math.abs(number)[method](precision);
          return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
        default:
          return substring;
      }
    };
    return format.replace(regex, doFormat);
  }
  return sprintf;
});

})();
(function() {
var define = $__System.amdDefine;
define("4c", ["1a", "1c"], function(defined, DeveloperError) {
  'use strict';
  function binarySearch(array, itemToFind, comparator) {
    if (!defined(array)) {
      throw new DeveloperError('array is required.');
    }
    if (!defined(itemToFind)) {
      throw new DeveloperError('itemToFind is required.');
    }
    if (!defined(comparator)) {
      throw new DeveloperError('comparator is required.');
    }
    var low = 0;
    var high = array.length - 1;
    var i;
    var comparison;
    while (low <= high) {
      i = ~~((low + high) / 2);
      comparison = comparator(array[i], itemToFind);
      if (comparison < 0) {
        low = i + 1;
        continue;
      }
      if (comparison > 0) {
        high = i - 1;
        continue;
      }
      return i;
    }
    return ~(high + 1);
  }
  return binarySearch;
});

})();
(function() {
var define = $__System.amdDefine;
define("62", [], function() {
  'use strict';
  function GregorianDate(year, month, day, hour, minute, second, millisecond, isLeapSecond) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.millisecond = millisecond;
    this.isLeapSecond = isLeapSecond;
  }
  return GregorianDate;
});

})();
(function() {
var define = $__System.amdDefine;
define("63", ["1c"], function(DeveloperError) {
  'use strict';
  function isLeapYear(year) {
    if (year === null || isNaN(year)) {
      throw new DeveloperError('year is required and must be a number.');
    }
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  }
  return isLeapYear;
});

})();
(function() {
var define = $__System.amdDefine;
define("50", [], function() {
  'use strict';
  function LeapSecond(date, offset) {
    this.julianDate = date;
    this.offset = offset;
  }
  return LeapSecond;
});

})();
(function() {
var define = $__System.amdDefine;
define("24", ["61", "4c", "23", "1a", "1c", "62", "63", "50", "52", "53"], function(sprintf, binarySearch, defaultValue, defined, DeveloperError, GregorianDate, isLeapYear, LeapSecond, TimeConstants, TimeStandard) {
  'use strict';
  var gregorianDateScratch = new GregorianDate();
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var daysInLeapFeburary = 29;
  function compareLeapSecondDates(leapSecond, dateToFind) {
    return JulianDate.compare(leapSecond.julianDate, dateToFind.julianDate);
  }
  var binarySearchScratchLeapSecond = new LeapSecond();
  function convertUtcToTai(julianDate) {
    binarySearchScratchLeapSecond.julianDate = julianDate;
    var leapSeconds = JulianDate.leapSeconds;
    var index = binarySearch(leapSeconds, binarySearchScratchLeapSecond, compareLeapSecondDates);
    if (index < 0) {
      index = ~index;
    }
    if (index >= leapSeconds.length) {
      index = leapSeconds.length - 1;
    }
    var offset = leapSeconds[index].offset;
    if (index > 0) {
      var difference = JulianDate.secondsDifference(leapSeconds[index].julianDate, julianDate);
      if (difference > offset) {
        index--;
        offset = leapSeconds[index].offset;
      }
    }
    JulianDate.addSeconds(julianDate, offset, julianDate);
  }
  function convertTaiToUtc(julianDate, result) {
    binarySearchScratchLeapSecond.julianDate = julianDate;
    var leapSeconds = JulianDate.leapSeconds;
    var index = binarySearch(leapSeconds, binarySearchScratchLeapSecond, compareLeapSecondDates);
    if (index < 0) {
      index = ~index;
    }
    if (index === 0) {
      return JulianDate.addSeconds(julianDate, -leapSeconds[0].offset, result);
    }
    if (index >= leapSeconds.length) {
      return JulianDate.addSeconds(julianDate, -leapSeconds[index - 1].offset, result);
    }
    var difference = JulianDate.secondsDifference(leapSeconds[index].julianDate, julianDate);
    if (difference === 0) {
      return JulianDate.addSeconds(julianDate, -leapSeconds[index].offset, result);
    }
    if (difference <= 1.0) {
      return undefined;
    }
    return JulianDate.addSeconds(julianDate, -leapSeconds[--index].offset, result);
  }
  function setComponents(wholeDays, secondsOfDay, julianDate) {
    var extraDays = (secondsOfDay / TimeConstants.SECONDS_PER_DAY) | 0;
    wholeDays += extraDays;
    secondsOfDay -= TimeConstants.SECONDS_PER_DAY * extraDays;
    if (secondsOfDay < 0) {
      wholeDays--;
      secondsOfDay += TimeConstants.SECONDS_PER_DAY;
    }
    julianDate.dayNumber = wholeDays;
    julianDate.secondsOfDay = secondsOfDay;
    return julianDate;
  }
  function computeJulianDateComponents(year, month, day, hour, minute, second, millisecond) {
    var a = ((month - 14) / 12) | 0;
    var b = year + 4800 + a;
    var dayNumber = (((1461 * b) / 4) | 0) + (((367 * (month - 2 - 12 * a)) / 12) | 0) - (((3 * (((b + 100) / 100) | 0)) / 4) | 0) + day - 32075;
    hour = hour - 12;
    if (hour < 0) {
      hour += 24;
    }
    var secondsOfDay = second + ((hour * TimeConstants.SECONDS_PER_HOUR) + (minute * TimeConstants.SECONDS_PER_MINUTE) + (millisecond * TimeConstants.SECONDS_PER_MILLISECOND));
    if (secondsOfDay >= 43200.0) {
      dayNumber -= 1;
    }
    return [dayNumber, secondsOfDay];
  }
  var matchCalendarYear = /^(\d{4})$/;
  var matchCalendarMonth = /^(\d{4})-(\d{2})$/;
  var matchOrdinalDate = /^(\d{4})-?(\d{3})$/;
  var matchWeekDate = /^(\d{4})-?W(\d{2})-?(\d{1})?$/;
  var matchCalendarDate = /^(\d{4})-?(\d{2})-?(\d{2})$/;
  var utcOffset = /([Z+\-])?(\d{2})?:?(\d{2})?$/;
  var matchHours = /^(\d{2})(\.\d+)?/.source + utcOffset.source;
  var matchHoursMinutes = /^(\d{2}):?(\d{2})(\.\d+)?/.source + utcOffset.source;
  var matchHoursMinutesSeconds = /^(\d{2}):?(\d{2}):?(\d{2})(\.\d+)?/.source + utcOffset.source;
  var iso8601ErrorMessage = 'Invalid ISO 8601 date.';
  function JulianDate(julianDayNumber, secondsOfDay, timeStandard) {
    this.dayNumber = undefined;
    this.secondsOfDay = undefined;
    julianDayNumber = defaultValue(julianDayNumber, 0.0);
    secondsOfDay = defaultValue(secondsOfDay, 0.0);
    timeStandard = defaultValue(timeStandard, TimeStandard.UTC);
    var wholeDays = julianDayNumber | 0;
    secondsOfDay = secondsOfDay + (julianDayNumber - wholeDays) * TimeConstants.SECONDS_PER_DAY;
    setComponents(wholeDays, secondsOfDay, this);
    if (timeStandard === TimeStandard.UTC) {
      convertUtcToTai(this);
    }
  }
  JulianDate.fromDate = function(date, result) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new DeveloperError('date must be a valid JavaScript Date.');
    }
    var components = computeJulianDateComponents(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
    if (!defined(result)) {
      return new JulianDate(components[0], components[1], TimeStandard.UTC);
    }
    setComponents(components[0], components[1], result);
    convertUtcToTai(result);
    return result;
  };
  JulianDate.fromIso8601 = function(iso8601String, result) {
    if (typeof iso8601String !== 'string') {
      throw new DeveloperError(iso8601ErrorMessage);
    }
    iso8601String = iso8601String.replace(',', '.');
    var tokens = iso8601String.split('T');
    var year;
    var month = 1;
    var day = 1;
    var hour = 0;
    var minute = 0;
    var second = 0;
    var millisecond = 0;
    var date = tokens[0];
    var time = tokens[1];
    var tmp;
    var inLeapYear;
    if (!defined(date)) {
      throw new DeveloperError(iso8601ErrorMessage);
    }
    var dashCount;
    tokens = date.match(matchCalendarDate);
    if (tokens !== null) {
      dashCount = date.split('-').length - 1;
      if (dashCount > 0 && dashCount !== 2) {
        throw new DeveloperError(iso8601ErrorMessage);
      }
      year = +tokens[1];
      month = +tokens[2];
      day = +tokens[3];
    } else {
      tokens = date.match(matchCalendarMonth);
      if (tokens !== null) {
        year = +tokens[1];
        month = +tokens[2];
      } else {
        tokens = date.match(matchCalendarYear);
        if (tokens !== null) {
          year = +tokens[1];
        } else {
          var dayOfYear;
          tokens = date.match(matchOrdinalDate);
          if (tokens !== null) {
            year = +tokens[1];
            dayOfYear = +tokens[2];
            inLeapYear = isLeapYear(year);
            if (dayOfYear < 1 || (inLeapYear && dayOfYear > 366) || (!inLeapYear && dayOfYear > 365)) {
              throw new DeveloperError(iso8601ErrorMessage);
            }
          } else {
            tokens = date.match(matchWeekDate);
            if (tokens !== null) {
              year = +tokens[1];
              var weekNumber = +tokens[2];
              var dayOfWeek = +tokens[3] || 0;
              dashCount = date.split('-').length - 1;
              if (dashCount > 0 && ((!defined(tokens[3]) && dashCount !== 1) || (defined(tokens[3]) && dashCount !== 2))) {
                throw new DeveloperError(iso8601ErrorMessage);
              }
              var january4 = new Date(Date.UTC(year, 0, 4));
              dayOfYear = (weekNumber * 7) + dayOfWeek - january4.getUTCDay() - 3;
            } else {
              throw new DeveloperError(iso8601ErrorMessage);
            }
          }
          tmp = new Date(Date.UTC(year, 0, 1));
          tmp.setUTCDate(dayOfYear);
          month = tmp.getUTCMonth() + 1;
          day = tmp.getUTCDate();
        }
      }
    }
    inLeapYear = isLeapYear(year);
    if (month < 1 || month > 12 || day < 1 || ((month !== 2 || !inLeapYear) && day > daysInMonth[month - 1]) || (inLeapYear && month === 2 && day > daysInLeapFeburary)) {
      throw new DeveloperError(iso8601ErrorMessage);
    }
    var offsetIndex;
    if (defined(time)) {
      tokens = time.match(matchHoursMinutesSeconds);
      if (tokens !== null) {
        dashCount = time.split(':').length - 1;
        if (dashCount > 0 && dashCount !== 2 && dashCount !== 3) {
          throw new DeveloperError(iso8601ErrorMessage);
        }
        hour = +tokens[1];
        minute = +tokens[2];
        second = +tokens[3];
        millisecond = +(tokens[4] || 0) * 1000.0;
        offsetIndex = 5;
      } else {
        tokens = time.match(matchHoursMinutes);
        if (tokens !== null) {
          dashCount = time.split(':').length - 1;
          if (dashCount > 2) {
            throw new DeveloperError(iso8601ErrorMessage);
          }
          hour = +tokens[1];
          minute = +tokens[2];
          second = +(tokens[3] || 0) * 60.0;
          offsetIndex = 4;
        } else {
          tokens = time.match(matchHours);
          if (tokens !== null) {
            hour = +tokens[1];
            minute = +(tokens[2] || 0) * 60.0;
            offsetIndex = 3;
          } else {
            throw new DeveloperError(iso8601ErrorMessage);
          }
        }
      }
      if (minute >= 60 || second >= 61 || hour > 24 || (hour === 24 && (minute > 0 || second > 0 || millisecond > 0))) {
        throw new DeveloperError(iso8601ErrorMessage);
      }
      var offset = tokens[offsetIndex];
      var offsetHours = +(tokens[offsetIndex + 1]);
      var offsetMinutes = +(tokens[offsetIndex + 2] || 0);
      switch (offset) {
        case '+':
          hour = hour - offsetHours;
          minute = minute - offsetMinutes;
          break;
        case '-':
          hour = hour + offsetHours;
          minute = minute + offsetMinutes;
          break;
        case 'Z':
          break;
        default:
          minute = minute + new Date(Date.UTC(year, month - 1, day, hour, minute)).getTimezoneOffset();
          break;
      }
    } else {
      minute = minute + new Date(year, month - 1, day).getTimezoneOffset();
    }
    var isLeapSecond = second === 60;
    if (isLeapSecond) {
      second--;
    }
    while (minute >= 60) {
      minute -= 60;
      hour++;
    }
    while (hour >= 24) {
      hour -= 24;
      day++;
    }
    tmp = (inLeapYear && month === 2) ? daysInLeapFeburary : daysInMonth[month - 1];
    while (day > tmp) {
      day -= tmp;
      month++;
      if (month > 12) {
        month -= 12;
        year++;
      }
      tmp = (inLeapYear && month === 2) ? daysInLeapFeburary : daysInMonth[month - 1];
    }
    while (minute < 0) {
      minute += 60;
      hour--;
    }
    while (hour < 0) {
      hour += 24;
      day--;
    }
    while (day < 1) {
      month--;
      if (month < 1) {
        month += 12;
        year--;
      }
      tmp = (inLeapYear && month === 2) ? daysInLeapFeburary : daysInMonth[month - 1];
      day += tmp;
    }
    var components = computeJulianDateComponents(year, month, day, hour, minute, second, millisecond);
    if (!defined(result)) {
      result = new JulianDate(components[0], components[1], TimeStandard.UTC);
    } else {
      setComponents(components[0], components[1], result);
      convertUtcToTai(result);
    }
    if (isLeapSecond) {
      JulianDate.addSeconds(result, 1, result);
    }
    return result;
  };
  JulianDate.now = function(result) {
    return JulianDate.fromDate(new Date(), result);
  };
  var toGregorianDateScratch = new JulianDate(0, 0, TimeStandard.TAI);
  JulianDate.toGregorianDate = function(julianDate, result) {
    if (!defined(julianDate)) {
      throw new DeveloperError('julianDate is required.');
    }
    var isLeapSecond = false;
    var thisUtc = convertTaiToUtc(julianDate, toGregorianDateScratch);
    if (!defined(thisUtc)) {
      JulianDate.addSeconds(julianDate, -1, toGregorianDateScratch);
      thisUtc = convertTaiToUtc(toGregorianDateScratch, toGregorianDateScratch);
      isLeapSecond = true;
    }
    var julianDayNumber = thisUtc.dayNumber;
    var secondsOfDay = thisUtc.secondsOfDay;
    if (secondsOfDay >= 43200.0) {
      julianDayNumber += 1;
    }
    var L = (julianDayNumber + 68569) | 0;
    var N = (4 * L / 146097) | 0;
    L = (L - (((146097 * N + 3) / 4) | 0)) | 0;
    var I = ((4000 * (L + 1)) / 1461001) | 0;
    L = (L - (((1461 * I) / 4) | 0) + 31) | 0;
    var J = ((80 * L) / 2447) | 0;
    var day = (L - (((2447 * J) / 80) | 0)) | 0;
    L = (J / 11) | 0;
    var month = (J + 2 - 12 * L) | 0;
    var year = (100 * (N - 49) + I + L) | 0;
    var hour = (secondsOfDay / TimeConstants.SECONDS_PER_HOUR) | 0;
    var remainingSeconds = secondsOfDay - (hour * TimeConstants.SECONDS_PER_HOUR);
    var minute = (remainingSeconds / TimeConstants.SECONDS_PER_MINUTE) | 0;
    remainingSeconds = remainingSeconds - (minute * TimeConstants.SECONDS_PER_MINUTE);
    var second = remainingSeconds | 0;
    var millisecond = ((remainingSeconds - second) / TimeConstants.SECONDS_PER_MILLISECOND);
    hour += 12;
    if (hour > 23) {
      hour -= 24;
    }
    if (isLeapSecond) {
      second += 1;
    }
    if (!defined(result)) {
      return new GregorianDate(year, month, day, hour, minute, second, millisecond, isLeapSecond);
    }
    result.year = year;
    result.month = month;
    result.day = day;
    result.hour = hour;
    result.minute = minute;
    result.second = second;
    result.millisecond = millisecond;
    result.isLeapSecond = isLeapSecond;
    return result;
  };
  JulianDate.toDate = function(julianDate) {
    if (!defined(julianDate)) {
      throw new DeveloperError('julianDate is required.');
    }
    var gDate = JulianDate.toGregorianDate(julianDate, gregorianDateScratch);
    var second = gDate.second;
    if (gDate.isLeapSecond) {
      second -= 1;
    }
    return new Date(Date.UTC(gDate.year, gDate.month - 1, gDate.day, gDate.hour, gDate.minute, second, gDate.millisecond));
  };
  JulianDate.toIso8601 = function(julianDate, precision) {
    if (!defined(julianDate)) {
      throw new DeveloperError('julianDate is required.');
    }
    var gDate = JulianDate.toGregorianDate(julianDate, gDate);
    var millisecondStr;
    if (!defined(precision) && gDate.millisecond !== 0) {
      millisecondStr = (gDate.millisecond * 0.01).toString().replace('.', '');
      return sprintf("%04d-%02d-%02dT%02d:%02d:%02d.%sZ", gDate.year, gDate.month, gDate.day, gDate.hour, gDate.minute, gDate.second, millisecondStr);
    }
    if (!defined(precision) || precision === 0) {
      return sprintf("%04d-%02d-%02dT%02d:%02d:%02dZ", gDate.year, gDate.month, gDate.day, gDate.hour, gDate.minute, gDate.second);
    }
    millisecondStr = (gDate.millisecond * 0.01).toFixed(precision).replace('.', '').slice(0, precision);
    return sprintf("%04d-%02d-%02dT%02d:%02d:%02d.%sZ", gDate.year, gDate.month, gDate.day, gDate.hour, gDate.minute, gDate.second, millisecondStr);
  };
  JulianDate.clone = function(julianDate, result) {
    if (!defined(julianDate)) {
      return undefined;
    }
    if (!defined(result)) {
      return new JulianDate(julianDate.dayNumber, julianDate.secondsOfDay, TimeStandard.TAI);
    }
    result.dayNumber = julianDate.dayNumber;
    result.secondsOfDay = julianDate.secondsOfDay;
    return result;
  };
  JulianDate.compare = function(left, right) {
    if (!defined(left)) {
      throw new DeveloperError('left is required.');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required.');
    }
    var julianDayNumberDifference = left.dayNumber - right.dayNumber;
    if (julianDayNumberDifference !== 0) {
      return julianDayNumberDifference;
    }
    return left.secondsOfDay - right.secondsOfDay;
  };
  JulianDate.equals = function(left, right) {
    return (left === right) || (defined(left) && defined(right) && left.dayNumber === right.dayNumber && left.secondsOfDay === right.secondsOfDay);
  };
  JulianDate.equalsEpsilon = function(left, right, epsilon) {
    if (!defined(epsilon)) {
      throw new DeveloperError('epsilon is required.');
    }
    return (left === right) || (defined(left) && defined(right) && Math.abs(JulianDate.secondsDifference(left, right)) <= epsilon);
  };
  JulianDate.totalDays = function(julianDate) {
    if (!defined(julianDate)) {
      throw new DeveloperError('julianDate is required.');
    }
    return julianDate.dayNumber + (julianDate.secondsOfDay / TimeConstants.SECONDS_PER_DAY);
  };
  JulianDate.secondsDifference = function(left, right) {
    if (!defined(left)) {
      throw new DeveloperError('left is required.');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required.');
    }
    var dayDifference = (left.dayNumber - right.dayNumber) * TimeConstants.SECONDS_PER_DAY;
    return (dayDifference + (left.secondsOfDay - right.secondsOfDay));
  };
  JulianDate.daysDifference = function(left, right) {
    if (!defined(left)) {
      throw new DeveloperError('left is required.');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required.');
    }
    var dayDifference = (left.dayNumber - right.dayNumber);
    var secondDifference = (left.secondsOfDay - right.secondsOfDay) / TimeConstants.SECONDS_PER_DAY;
    return dayDifference + secondDifference;
  };
  JulianDate.computeTaiMinusUtc = function(julianDate) {
    binarySearchScratchLeapSecond.julianDate = julianDate;
    var leapSeconds = JulianDate.leapSeconds;
    var index = binarySearch(leapSeconds, binarySearchScratchLeapSecond, compareLeapSecondDates);
    if (index < 0) {
      index = ~index;
      --index;
      if (index < 0) {
        index = 0;
      }
    }
    return leapSeconds[index].offset;
  };
  JulianDate.addSeconds = function(julianDate, seconds, result) {
    if (!defined(julianDate)) {
      throw new DeveloperError('julianDate is required.');
    }
    if (!defined(seconds)) {
      throw new DeveloperError('seconds is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    return setComponents(julianDate.dayNumber, julianDate.secondsOfDay + seconds, result);
  };
  JulianDate.addMinutes = function(julianDate, minutes, result) {
    if (!defined(julianDate)) {
      throw new DeveloperError('julianDate is required.');
    }
    if (!defined(minutes)) {
      throw new DeveloperError('minutes is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    var newSecondsOfDay = julianDate.secondsOfDay + (minutes * TimeConstants.SECONDS_PER_MINUTE);
    return setComponents(julianDate.dayNumber, newSecondsOfDay, result);
  };
  JulianDate.addHours = function(julianDate, hours, result) {
    if (!defined(julianDate)) {
      throw new DeveloperError('julianDate is required.');
    }
    if (!defined(hours)) {
      throw new DeveloperError('hours is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    var newSecondsOfDay = julianDate.secondsOfDay + (hours * TimeConstants.SECONDS_PER_HOUR);
    return setComponents(julianDate.dayNumber, newSecondsOfDay, result);
  };
  JulianDate.addDays = function(julianDate, days, result) {
    if (!defined(julianDate)) {
      throw new DeveloperError('julianDate is required.');
    }
    if (!defined(days)) {
      throw new DeveloperError('days is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    var newJulianDayNumber = julianDate.dayNumber + days;
    return setComponents(newJulianDayNumber, julianDate.secondsOfDay, result);
  };
  JulianDate.lessThan = function(left, right) {
    return JulianDate.compare(left, right) < 0;
  };
  JulianDate.lessThanOrEquals = function(left, right) {
    return JulianDate.compare(left, right) <= 0;
  };
  JulianDate.greaterThan = function(left, right) {
    return JulianDate.compare(left, right) > 0;
  };
  JulianDate.greaterThanOrEquals = function(left, right) {
    return JulianDate.compare(left, right) >= 0;
  };
  JulianDate.prototype.clone = function(result) {
    return JulianDate.clone(this, result);
  };
  JulianDate.prototype.equals = function(right) {
    return JulianDate.equals(this, right);
  };
  JulianDate.prototype.equalsEpsilon = function(right, epsilon) {
    return JulianDate.equalsEpsilon(this, right, epsilon);
  };
  JulianDate.prototype.toString = function() {
    return JulianDate.toIso8601(this);
  };
  JulianDate.leapSeconds = [new LeapSecond(new JulianDate(2441317, 43210.0, TimeStandard.TAI), 10), new LeapSecond(new JulianDate(2441499, 43211.0, TimeStandard.TAI), 11), new LeapSecond(new JulianDate(2441683, 43212.0, TimeStandard.TAI), 12), new LeapSecond(new JulianDate(2442048, 43213.0, TimeStandard.TAI), 13), new LeapSecond(new JulianDate(2442413, 43214.0, TimeStandard.TAI), 14), new LeapSecond(new JulianDate(2442778, 43215.0, TimeStandard.TAI), 15), new LeapSecond(new JulianDate(2443144, 43216.0, TimeStandard.TAI), 16), new LeapSecond(new JulianDate(2443509, 43217.0, TimeStandard.TAI), 17), new LeapSecond(new JulianDate(2443874, 43218.0, TimeStandard.TAI), 18), new LeapSecond(new JulianDate(2444239, 43219.0, TimeStandard.TAI), 19), new LeapSecond(new JulianDate(2444786, 43220.0, TimeStandard.TAI), 20), new LeapSecond(new JulianDate(2445151, 43221.0, TimeStandard.TAI), 21), new LeapSecond(new JulianDate(2445516, 43222.0, TimeStandard.TAI), 22), new LeapSecond(new JulianDate(2446247, 43223.0, TimeStandard.TAI), 23), new LeapSecond(new JulianDate(2447161, 43224.0, TimeStandard.TAI), 24), new LeapSecond(new JulianDate(2447892, 43225.0, TimeStandard.TAI), 25), new LeapSecond(new JulianDate(2448257, 43226.0, TimeStandard.TAI), 26), new LeapSecond(new JulianDate(2448804, 43227.0, TimeStandard.TAI), 27), new LeapSecond(new JulianDate(2449169, 43228.0, TimeStandard.TAI), 28), new LeapSecond(new JulianDate(2449534, 43229.0, TimeStandard.TAI), 29), new LeapSecond(new JulianDate(2450083, 43230.0, TimeStandard.TAI), 30), new LeapSecond(new JulianDate(2450630, 43231.0, TimeStandard.TAI), 31), new LeapSecond(new JulianDate(2451179, 43232.0, TimeStandard.TAI), 32), new LeapSecond(new JulianDate(2453736, 43233.0, TimeStandard.TAI), 33), new LeapSecond(new JulianDate(2454832, 43234.0, TimeStandard.TAI), 34), new LeapSecond(new JulianDate(2456109, 43235.0, TimeStandard.TAI), 35), new LeapSecond(new JulianDate(2457204, 43236.0, TimeStandard.TAI), 36)];
  return JulianDate;
});

})();
(function() {
var define = $__System.amdDefine;
define("52", ["1f"], function(freezeObject) {
  'use strict';
  var TimeConstants = {
    SECONDS_PER_MILLISECOND: 0.001,
    SECONDS_PER_MINUTE: 60.0,
    MINUTES_PER_HOUR: 60.0,
    HOURS_PER_DAY: 24.0,
    SECONDS_PER_HOUR: 3600.0,
    MINUTES_PER_DAY: 1440.0,
    SECONDS_PER_DAY: 86400.0,
    DAYS_PER_JULIAN_CENTURY: 36525.0,
    PICOSECOND: 0.000000001,
    MODIFIED_JULIAN_DATE_DIFFERENCE: 2400000.5
  };
  return freezeObject(TimeConstants);
});

})();
(function() {
var define = $__System.amdDefine;
define("53", ["1f"], function(freezeObject) {
  'use strict';
  var TimeStandard = {
    UTC: 0,
    TAI: 1
  };
  return freezeObject(TimeStandard);
});

})();
(function() {
var define = $__System.amdDefine;
define("64", ["2c", "1a", "1c", "24", "27", "32", "52", "53"], function(Cartesian3, defined, DeveloperError, JulianDate, CesiumMath, Matrix3, TimeConstants, TimeStandard) {
  'use strict';
  var Simon1994PlanetaryPositions = {};
  function computeTdbMinusTtSpice(daysSinceJ2000InTerrestrialTime) {
    var g = 6.239996 + (0.0172019696544) * daysSinceJ2000InTerrestrialTime;
    return 1.657e-3 * Math.sin(g + 1.671e-2 * Math.sin(g));
  }
  var TdtMinusTai = 32.184;
  var J2000d = 2451545;
  function taiToTdb(date, result) {
    result = JulianDate.addSeconds(date, TdtMinusTai, result);
    var days = JulianDate.totalDays(result) - J2000d;
    result = JulianDate.addSeconds(result, computeTdbMinusTtSpice(days), result);
    return result;
  }
  var epoch = new JulianDate(2451545, 0, TimeStandard.TAI);
  var GravitationalParameterOfEarth = 3.98600435e14;
  var GravitationalParameterOfSun = GravitationalParameterOfEarth * (1.0 + 0.012300034) * 328900.56;
  var MetersPerKilometer = 1000.0;
  var RadiansPerDegree = CesiumMath.RADIANS_PER_DEGREE;
  var RadiansPerArcSecond = CesiumMath.RADIANS_PER_ARCSECOND;
  var MetersPerAstronomicalUnit = 1.49597870e+11;
  var perifocalToEquatorial = new Matrix3();
  function elementsToCartesian(semimajorAxis, eccentricity, inclination, longitudeOfPerigee, longitudeOfNode, meanLongitude, gravitationalParameter, result) {
    if (inclination < 0.0) {
      inclination = -inclination;
      longitudeOfNode += CesiumMath.PI;
    }
    if (inclination < 0 || inclination > CesiumMath.PI) {
      throw new DeveloperError('The inclination is out of range. Inclination must be greater than or equal to zero and less than or equal to Pi radians.');
    }
    var radiusOfPeriapsis = semimajorAxis * (1.0 - eccentricity);
    var argumentOfPeriapsis = longitudeOfPerigee - longitudeOfNode;
    var rightAscensionOfAscendingNode = longitudeOfNode;
    var trueAnomaly = meanAnomalyToTrueAnomaly(meanLongitude - longitudeOfPerigee, eccentricity);
    var type = chooseOrbit(eccentricity, 0.0);
    if (type === 'Hyperbolic' && Math.abs(CesiumMath.negativePiToPi(trueAnomaly)) >= Math.acos(-1.0 / eccentricity)) {
      throw new DeveloperError('The true anomaly of the hyperbolic orbit lies outside of the bounds of the hyperbola.');
    }
    perifocalToCartesianMatrix(argumentOfPeriapsis, inclination, rightAscensionOfAscendingNode, perifocalToEquatorial);
    var semilatus = radiusOfPeriapsis * (1.0 + eccentricity);
    var costheta = Math.cos(trueAnomaly);
    var sintheta = Math.sin(trueAnomaly);
    var denom = (1.0 + eccentricity * costheta);
    if (denom <= CesiumMath.Epsilon10) {
      throw new DeveloperError('elements cannot be converted to cartesian');
    }
    var radius = semilatus / denom;
    if (!defined(result)) {
      result = new Cartesian3(radius * costheta, radius * sintheta, 0.0);
    } else {
      result.x = radius * costheta;
      result.y = radius * sintheta;
      result.z = 0.0;
    }
    return Matrix3.multiplyByVector(perifocalToEquatorial, result, result);
  }
  function chooseOrbit(eccentricity, tolerance) {
    if (eccentricity < 0) {
      throw new DeveloperError('eccentricity cannot be negative.');
    } else if (eccentricity <= tolerance) {
      return 'Circular';
    } else if (eccentricity < 1.0 - tolerance) {
      return 'Elliptical';
    } else if (eccentricity <= 1.0 + tolerance) {
      return 'Parabolic';
    } else {
      return 'Hyperbolic';
    }
  }
  function meanAnomalyToTrueAnomaly(meanAnomaly, eccentricity) {
    if (eccentricity < 0.0 || eccentricity >= 1.0) {
      throw new DeveloperError('eccentricity out of range.');
    }
    var eccentricAnomaly = meanAnomalyToEccentricAnomaly(meanAnomaly, eccentricity);
    return eccentricAnomalyToTrueAnomaly(eccentricAnomaly, eccentricity);
  }
  var maxIterationCount = 50;
  var keplerEqConvergence = CesiumMath.EPSILON8;
  function meanAnomalyToEccentricAnomaly(meanAnomaly, eccentricity) {
    if (eccentricity < 0.0 || eccentricity >= 1.0) {
      throw new DeveloperError('eccentricity out of range.');
    }
    var revs = Math.floor(meanAnomaly / CesiumMath.TWO_PI);
    meanAnomaly -= revs * CesiumMath.TWO_PI;
    var iterationValue = meanAnomaly + (eccentricity * Math.sin(meanAnomaly)) / (1.0 - Math.sin(meanAnomaly + eccentricity) + Math.sin(meanAnomaly));
    var eccentricAnomaly = Number.MAX_VALUE;
    var count;
    for (count = 0; count < maxIterationCount && Math.abs(eccentricAnomaly - iterationValue) > keplerEqConvergence; ++count) {
      eccentricAnomaly = iterationValue;
      var NRfunction = eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly;
      var dNRfunction = 1 - eccentricity * Math.cos(eccentricAnomaly);
      iterationValue = eccentricAnomaly - NRfunction / dNRfunction;
    }
    if (count >= maxIterationCount) {
      throw new DeveloperError('Kepler equation did not converge');
    }
    eccentricAnomaly = iterationValue + revs * CesiumMath.TWO_PI;
    return eccentricAnomaly;
  }
  function eccentricAnomalyToTrueAnomaly(eccentricAnomaly, eccentricity) {
    if (eccentricity < 0.0 || eccentricity >= 1.0) {
      throw new DeveloperError('eccentricity out of range.');
    }
    var revs = Math.floor(eccentricAnomaly / CesiumMath.TWO_PI);
    eccentricAnomaly -= revs * CesiumMath.TWO_PI;
    var trueAnomalyX = Math.cos(eccentricAnomaly) - eccentricity;
    var trueAnomalyY = Math.sin(eccentricAnomaly) * Math.sqrt(1 - eccentricity * eccentricity);
    var trueAnomaly = Math.atan2(trueAnomalyY, trueAnomalyX);
    trueAnomaly = CesiumMath.zeroToTwoPi(trueAnomaly);
    if (eccentricAnomaly < 0) {
      trueAnomaly -= CesiumMath.TWO_PI;
    }
    trueAnomaly += revs * CesiumMath.TWO_PI;
    return trueAnomaly;
  }
  function perifocalToCartesianMatrix(argumentOfPeriapsis, inclination, rightAscension, result) {
    if (inclination < 0 || inclination > CesiumMath.PI) {
      throw new DeveloperError('inclination out of range');
    }
    var cosap = Math.cos(argumentOfPeriapsis);
    var sinap = Math.sin(argumentOfPeriapsis);
    var cosi = Math.cos(inclination);
    var sini = Math.sin(inclination);
    var cosraan = Math.cos(rightAscension);
    var sinraan = Math.sin(rightAscension);
    if (!defined(result)) {
      result = new Matrix3(cosraan * cosap - sinraan * sinap * cosi, -cosraan * sinap - sinraan * cosap * cosi, sinraan * sini, sinraan * cosap + cosraan * sinap * cosi, -sinraan * sinap + cosraan * cosap * cosi, -cosraan * sini, sinap * sini, cosap * sini, cosi);
    } else {
      result[0] = cosraan * cosap - sinraan * sinap * cosi;
      result[1] = sinraan * cosap + cosraan * sinap * cosi;
      result[2] = sinap * sini;
      result[3] = -cosraan * sinap - sinraan * cosap * cosi;
      result[4] = -sinraan * sinap + cosraan * cosap * cosi;
      result[5] = cosap * sini;
      result[6] = sinraan * sini;
      result[7] = -cosraan * sini;
      result[8] = cosi;
    }
    return result;
  }
  var semiMajorAxis0 = 1.0000010178 * MetersPerAstronomicalUnit;
  var meanLongitude0 = 100.46645683 * RadiansPerDegree;
  var meanLongitude1 = 1295977422.83429 * RadiansPerArcSecond;
  var p1u = 16002;
  var p2u = 21863;
  var p3u = 32004;
  var p4u = 10931;
  var p5u = 14529;
  var p6u = 16368;
  var p7u = 15318;
  var p8u = 32794;
  var Ca1 = 64 * 1e-7 * MetersPerAstronomicalUnit;
  var Ca2 = -152 * 1e-7 * MetersPerAstronomicalUnit;
  var Ca3 = 62 * 1e-7 * MetersPerAstronomicalUnit;
  var Ca4 = -8 * 1e-7 * MetersPerAstronomicalUnit;
  var Ca5 = 32 * 1e-7 * MetersPerAstronomicalUnit;
  var Ca6 = -41 * 1e-7 * MetersPerAstronomicalUnit;
  var Ca7 = 19 * 1e-7 * MetersPerAstronomicalUnit;
  var Ca8 = -11 * 1e-7 * MetersPerAstronomicalUnit;
  var Sa1 = -150 * 1e-7 * MetersPerAstronomicalUnit;
  var Sa2 = -46 * 1e-7 * MetersPerAstronomicalUnit;
  var Sa3 = 68 * 1e-7 * MetersPerAstronomicalUnit;
  var Sa4 = 54 * 1e-7 * MetersPerAstronomicalUnit;
  var Sa5 = 14 * 1e-7 * MetersPerAstronomicalUnit;
  var Sa6 = 24 * 1e-7 * MetersPerAstronomicalUnit;
  var Sa7 = -28 * 1e-7 * MetersPerAstronomicalUnit;
  var Sa8 = 22 * 1e-7 * MetersPerAstronomicalUnit;
  var q1u = 10;
  var q2u = 16002;
  var q3u = 21863;
  var q4u = 10931;
  var q5u = 1473;
  var q6u = 32004;
  var q7u = 4387;
  var q8u = 73;
  var Cl1 = -325 * 1e-7;
  var Cl2 = -322 * 1e-7;
  var Cl3 = -79 * 1e-7;
  var Cl4 = 232 * 1e-7;
  var Cl5 = -52 * 1e-7;
  var Cl6 = 97 * 1e-7;
  var Cl7 = 55 * 1e-7;
  var Cl8 = -41 * 1e-7;
  var Sl1 = -105 * 1e-7;
  var Sl2 = -137 * 1e-7;
  var Sl3 = 258 * 1e-7;
  var Sl4 = 35 * 1e-7;
  var Sl5 = -116 * 1e-7;
  var Sl6 = -88 * 1e-7;
  var Sl7 = -112 * 1e-7;
  var Sl8 = -80 * 1e-7;
  var scratchDate = new JulianDate(0, 0.0, TimeStandard.TAI);
  function computeSimonEarthMoonBarycenter(date, result) {
    taiToTdb(date, scratchDate);
    var x = (scratchDate.dayNumber - epoch.dayNumber) + ((scratchDate.secondsOfDay - epoch.secondsOfDay) / TimeConstants.SECONDS_PER_DAY);
    var t = x / (TimeConstants.DAYS_PER_JULIAN_CENTURY * 10.0);
    var u = 0.35953620 * t;
    var semimajorAxis = semiMajorAxis0 + Ca1 * Math.cos(p1u * u) + Sa1 * Math.sin(p1u * u) + Ca2 * Math.cos(p2u * u) + Sa2 * Math.sin(p2u * u) + Ca3 * Math.cos(p3u * u) + Sa3 * Math.sin(p3u * u) + Ca4 * Math.cos(p4u * u) + Sa4 * Math.sin(p4u * u) + Ca5 * Math.cos(p5u * u) + Sa5 * Math.sin(p5u * u) + Ca6 * Math.cos(p6u * u) + Sa6 * Math.sin(p6u * u) + Ca7 * Math.cos(p7u * u) + Sa7 * Math.sin(p7u * u) + Ca8 * Math.cos(p8u * u) + Sa8 * Math.sin(p8u * u);
    var meanLongitude = meanLongitude0 + meanLongitude1 * t + Cl1 * Math.cos(q1u * u) + Sl1 * Math.sin(q1u * u) + Cl2 * Math.cos(q2u * u) + Sl2 * Math.sin(q2u * u) + Cl3 * Math.cos(q3u * u) + Sl3 * Math.sin(q3u * u) + Cl4 * Math.cos(q4u * u) + Sl4 * Math.sin(q4u * u) + Cl5 * Math.cos(q5u * u) + Sl5 * Math.sin(q5u * u) + Cl6 * Math.cos(q6u * u) + Sl6 * Math.sin(q6u * u) + Cl7 * Math.cos(q7u * u) + Sl7 * Math.sin(q7u * u) + Cl8 * Math.cos(q8u * u) + Sl8 * Math.sin(q8u * u);
    var eccentricity = 0.0167086342 - 0.0004203654 * t;
    var longitudeOfPerigee = 102.93734808 * RadiansPerDegree + 11612.35290 * RadiansPerArcSecond * t;
    var inclination = 469.97289 * RadiansPerArcSecond * t;
    var longitudeOfNode = 174.87317577 * RadiansPerDegree - 8679.27034 * RadiansPerArcSecond * t;
    return elementsToCartesian(semimajorAxis, eccentricity, inclination, longitudeOfPerigee, longitudeOfNode, meanLongitude, GravitationalParameterOfSun, result);
  }
  function computeSimonMoon(date, result) {
    taiToTdb(date, scratchDate);
    var x = (scratchDate.dayNumber - epoch.dayNumber) + ((scratchDate.secondsOfDay - epoch.secondsOfDay) / TimeConstants.SECONDS_PER_DAY);
    var t = x / (TimeConstants.DAYS_PER_JULIAN_CENTURY);
    var t2 = t * t;
    var t3 = t2 * t;
    var t4 = t3 * t;
    var semimajorAxis = 383397.7725 + 0.0040 * t;
    var eccentricity = 0.055545526 - 0.000000016 * t;
    var inclinationConstant = 5.15668983 * RadiansPerDegree;
    var inclinationSecPart = -0.00008 * t + 0.02966 * t2 - 0.000042 * t3 - 0.00000013 * t4;
    var longitudeOfPerigeeConstant = 83.35324312 * RadiansPerDegree;
    var longitudeOfPerigeeSecPart = 14643420.2669 * t - 38.2702 * t2 - 0.045047 * t3 + 0.00021301 * t4;
    var longitudeOfNodeConstant = 125.04455501 * RadiansPerDegree;
    var longitudeOfNodeSecPart = -6967919.3631 * t + 6.3602 * t2 + 0.007625 * t3 - 0.00003586 * t4;
    var meanLongitudeConstant = 218.31664563 * RadiansPerDegree;
    var meanLongitudeSecPart = 1732559343.48470 * t - 6.3910 * t2 + 0.006588 * t3 - 0.00003169 * t4;
    var D = 297.85019547 * RadiansPerDegree + RadiansPerArcSecond * (1602961601.2090 * t - 6.3706 * t2 + 0.006593 * t3 - 0.00003169 * t4);
    var F = 93.27209062 * RadiansPerDegree + RadiansPerArcSecond * (1739527262.8478 * t - 12.7512 * t2 - 0.001037 * t3 + 0.00000417 * t4);
    var l = 134.96340251 * RadiansPerDegree + RadiansPerArcSecond * (1717915923.2178 * t + 31.8792 * t2 + 0.051635 * t3 - 0.00024470 * t4);
    var lprime = 357.52910918 * RadiansPerDegree + RadiansPerArcSecond * (129596581.0481 * t - 0.5532 * t2 + 0.000136 * t3 - 0.00001149 * t4);
    var psi = 310.17137918 * RadiansPerDegree - RadiansPerArcSecond * (6967051.4360 * t + 6.2068 * t2 + 0.007618 * t3 - 0.00003219 * t4);
    var twoD = 2.0 * D;
    var fourD = 4.0 * D;
    var sixD = 6.0 * D;
    var twol = 2.0 * l;
    var threel = 3.0 * l;
    var fourl = 4.0 * l;
    var twoF = 2.0 * F;
    semimajorAxis += 3400.4 * Math.cos(twoD) - 635.6 * Math.cos(twoD - l) - 235.6 * Math.cos(l) + 218.1 * Math.cos(twoD - lprime) + 181.0 * Math.cos(twoD + l);
    eccentricity += 0.014216 * Math.cos(twoD - l) + 0.008551 * Math.cos(twoD - twol) - 0.001383 * Math.cos(l) + 0.001356 * Math.cos(twoD + l) - 0.001147 * Math.cos(fourD - threel) - 0.000914 * Math.cos(fourD - twol) + 0.000869 * Math.cos(twoD - lprime - l) - 0.000627 * Math.cos(twoD) - 0.000394 * Math.cos(fourD - fourl) + 0.000282 * Math.cos(twoD - lprime - twol) - 0.000279 * Math.cos(D - l) - 0.000236 * Math.cos(twol) + 0.000231 * Math.cos(fourD) + 0.000229 * Math.cos(sixD - fourl) - 0.000201 * Math.cos(twol - twoF);
    inclinationSecPart += 486.26 * Math.cos(twoD - twoF) - 40.13 * Math.cos(twoD) + 37.51 * Math.cos(twoF) + 25.73 * Math.cos(twol - twoF) + 19.97 * Math.cos(twoD - lprime - twoF);
    longitudeOfPerigeeSecPart += -55609 * Math.sin(twoD - l) - 34711 * Math.sin(twoD - twol) - 9792 * Math.sin(l) + 9385 * Math.sin(fourD - threel) + 7505 * Math.sin(fourD - twol) + 5318 * Math.sin(twoD + l) + 3484 * Math.sin(fourD - fourl) - 3417 * Math.sin(twoD - lprime - l) - 2530 * Math.sin(sixD - fourl) - 2376 * Math.sin(twoD) - 2075 * Math.sin(twoD - threel) - 1883 * Math.sin(twol) - 1736 * Math.sin(sixD - 5.0 * l) + 1626 * Math.sin(lprime) - 1370 * Math.sin(sixD - threel);
    longitudeOfNodeSecPart += -5392 * Math.sin(twoD - twoF) - 540 * Math.sin(lprime) - 441 * Math.sin(twoD) + 423 * Math.sin(twoF) - 288 * Math.sin(twol - twoF);
    meanLongitudeSecPart += -3332.9 * Math.sin(twoD) + 1197.4 * Math.sin(twoD - l) - 662.5 * Math.sin(lprime) + 396.3 * Math.sin(l) - 218.0 * Math.sin(twoD - lprime);
    var twoPsi = 2.0 * psi;
    var threePsi = 3.0 * psi;
    inclinationSecPart += 46.997 * Math.cos(psi) * t - 0.614 * Math.cos(twoD - twoF + psi) * t + 0.614 * Math.cos(twoD - twoF - psi) * t - 0.0297 * Math.cos(twoPsi) * t2 - 0.0335 * Math.cos(psi) * t2 + 0.0012 * Math.cos(twoD - twoF + twoPsi) * t2 - 0.00016 * Math.cos(psi) * t3 + 0.00004 * Math.cos(threePsi) * t3 + 0.00004 * Math.cos(twoPsi) * t3;
    var perigeeAndMean = 2.116 * Math.sin(psi) * t - 0.111 * Math.sin(twoD - twoF - psi) * t - 0.0015 * Math.sin(psi) * t2;
    longitudeOfPerigeeSecPart += perigeeAndMean;
    meanLongitudeSecPart += perigeeAndMean;
    longitudeOfNodeSecPart += -520.77 * Math.sin(psi) * t + 13.66 * Math.sin(twoD - twoF + psi) * t + 1.12 * Math.sin(twoD - psi) * t - 1.06 * Math.sin(twoF - psi) * t + 0.660 * Math.sin(twoPsi) * t2 + 0.371 * Math.sin(psi) * t2 - 0.035 * Math.sin(twoD - twoF + twoPsi) * t2 - 0.015 * Math.sin(twoD - twoF + psi) * t2 + 0.0014 * Math.sin(psi) * t3 - 0.0011 * Math.sin(threePsi) * t3 - 0.0009 * Math.sin(twoPsi) * t3;
    semimajorAxis *= MetersPerKilometer;
    var inclination = inclinationConstant + inclinationSecPart * RadiansPerArcSecond;
    var longitudeOfPerigee = longitudeOfPerigeeConstant + longitudeOfPerigeeSecPart * RadiansPerArcSecond;
    var meanLongitude = meanLongitudeConstant + meanLongitudeSecPart * RadiansPerArcSecond;
    var longitudeOfNode = longitudeOfNodeConstant + longitudeOfNodeSecPart * RadiansPerArcSecond;
    return elementsToCartesian(semimajorAxis, eccentricity, inclination, longitudeOfPerigee, longitudeOfNode, meanLongitude, GravitationalParameterOfEarth, result);
  }
  var moonEarthMassRatio = 0.012300034;
  var factor = moonEarthMassRatio / (moonEarthMassRatio + 1.0) * -1;
  function computeSimonEarth(date, result) {
    result = computeSimonMoon(date, result);
    return Cartesian3.multiplyByScalar(result, factor, result);
  }
  var axesTransformation = new Matrix3(1.0000000000000002, 5.619723173785822e-16, 4.690511510146299e-19, -5.154129427414611e-16, 0.9174820620691819, -0.39777715593191376, -2.23970096136568e-16, 0.39777715593191376, 0.9174820620691819);
  var translation = new Cartesian3();
  Simon1994PlanetaryPositions.computeSunPositionInEarthInertialFrame = function(date, result) {
    if (!defined(date)) {
      date = JulianDate.now();
    }
    if (!defined(result)) {
      result = new Cartesian3();
    }
    translation = computeSimonEarthMoonBarycenter(date, translation);
    result = Cartesian3.negate(translation, result);
    computeSimonEarth(date, translation);
    Cartesian3.subtract(result, translation, result);
    Matrix3.multiplyByVector(axesTransformation, result, result);
    return result;
  };
  Simon1994PlanetaryPositions.computeMoonPositionInEarthInertialFrame = function(date, result) {
    if (!defined(date)) {
      date = JulianDate.now();
    }
    result = computeSimonMoon(date, result);
    Matrix3.multiplyByVector(axesTransformation, result, result);
    return result;
  };
  return Simon1994PlanetaryPositions;
});

})();
(function() {
var define = $__System.amdDefine;
define("3c", ["2c", "3b", "23", "1a", "1b", "1c", "1f", "27", "65"], function(Cartesian3, Cartographic, defaultValue, defined, defineProperties, DeveloperError, freezeObject, CesiumMath, scaleToGeodeticSurface) {
  'use strict';
  function initialize(ellipsoid, x, y, z) {
    x = defaultValue(x, 0.0);
    y = defaultValue(y, 0.0);
    z = defaultValue(z, 0.0);
    if (x < 0.0 || y < 0.0 || z < 0.0) {
      throw new DeveloperError('All radii components must be greater than or equal to zero.');
    }
    ellipsoid._radii = new Cartesian3(x, y, z);
    ellipsoid._radiiSquared = new Cartesian3(x * x, y * y, z * z);
    ellipsoid._radiiToTheFourth = new Cartesian3(x * x * x * x, y * y * y * y, z * z * z * z);
    ellipsoid._oneOverRadii = new Cartesian3(x === 0.0 ? 0.0 : 1.0 / x, y === 0.0 ? 0.0 : 1.0 / y, z === 0.0 ? 0.0 : 1.0 / z);
    ellipsoid._oneOverRadiiSquared = new Cartesian3(x === 0.0 ? 0.0 : 1.0 / (x * x), y === 0.0 ? 0.0 : 1.0 / (y * y), z === 0.0 ? 0.0 : 1.0 / (z * z));
    ellipsoid._minimumRadius = Math.min(x, y, z);
    ellipsoid._maximumRadius = Math.max(x, y, z);
    ellipsoid._centerToleranceSquared = CesiumMath.EPSILON1;
  }
  function Ellipsoid(x, y, z) {
    this._radii = undefined;
    this._radiiSquared = undefined;
    this._radiiToTheFourth = undefined;
    this._oneOverRadii = undefined;
    this._oneOverRadiiSquared = undefined;
    this._minimumRadius = undefined;
    this._maximumRadius = undefined;
    this._centerToleranceSquared = undefined;
    initialize(this, x, y, z);
  }
  defineProperties(Ellipsoid.prototype, {
    radii: {get: function() {
        return this._radii;
      }},
    radiiSquared: {get: function() {
        return this._radiiSquared;
      }},
    radiiToTheFourth: {get: function() {
        return this._radiiToTheFourth;
      }},
    oneOverRadii: {get: function() {
        return this._oneOverRadii;
      }},
    oneOverRadiiSquared: {get: function() {
        return this._oneOverRadiiSquared;
      }},
    minimumRadius: {get: function() {
        return this._minimumRadius;
      }},
    maximumRadius: {get: function() {
        return this._maximumRadius;
      }}
  });
  Ellipsoid.clone = function(ellipsoid, result) {
    if (!defined(ellipsoid)) {
      return undefined;
    }
    var radii = ellipsoid._radii;
    if (!defined(result)) {
      return new Ellipsoid(radii.x, radii.y, radii.z);
    }
    Cartesian3.clone(radii, result._radii);
    Cartesian3.clone(ellipsoid._radiiSquared, result._radiiSquared);
    Cartesian3.clone(ellipsoid._radiiToTheFourth, result._radiiToTheFourth);
    Cartesian3.clone(ellipsoid._oneOverRadii, result._oneOverRadii);
    Cartesian3.clone(ellipsoid._oneOverRadiiSquared, result._oneOverRadiiSquared);
    result._minimumRadius = ellipsoid._minimumRadius;
    result._maximumRadius = ellipsoid._maximumRadius;
    result._centerToleranceSquared = ellipsoid._centerToleranceSquared;
    return result;
  };
  Ellipsoid.fromCartesian3 = function(cartesian, result) {
    if (!defined(result)) {
      result = new Ellipsoid();
    }
    if (!defined(cartesian)) {
      return result;
    }
    initialize(result, cartesian.x, cartesian.y, cartesian.z);
    return result;
  };
  Ellipsoid.WGS84 = freezeObject(new Ellipsoid(6378137.0, 6378137.0, 6356752.3142451793));
  Ellipsoid.UNIT_SPHERE = freezeObject(new Ellipsoid(1.0, 1.0, 1.0));
  Ellipsoid.MOON = freezeObject(new Ellipsoid(CesiumMath.LUNAR_RADIUS, CesiumMath.LUNAR_RADIUS, CesiumMath.LUNAR_RADIUS));
  Ellipsoid.prototype.clone = function(result) {
    return Ellipsoid.clone(this, result);
  };
  Ellipsoid.packedLength = Cartesian3.packedLength;
  Ellipsoid.pack = function(value, array, startingIndex) {
    if (!defined(value)) {
      throw new DeveloperError('value is required');
    }
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    startingIndex = defaultValue(startingIndex, 0);
    Cartesian3.pack(value._radii, array, startingIndex);
  };
  Ellipsoid.unpack = function(array, startingIndex, result) {
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    startingIndex = defaultValue(startingIndex, 0);
    var radii = Cartesian3.unpack(array, startingIndex);
    return Ellipsoid.fromCartesian3(radii, result);
  };
  Ellipsoid.prototype.geocentricSurfaceNormal = Cartesian3.normalize;
  Ellipsoid.prototype.geodeticSurfaceNormalCartographic = function(cartographic, result) {
    if (!defined(cartographic)) {
      throw new DeveloperError('cartographic is required.');
    }
    var longitude = cartographic.longitude;
    var latitude = cartographic.latitude;
    var cosLatitude = Math.cos(latitude);
    var x = cosLatitude * Math.cos(longitude);
    var y = cosLatitude * Math.sin(longitude);
    var z = Math.sin(latitude);
    if (!defined(result)) {
      result = new Cartesian3();
    }
    result.x = x;
    result.y = y;
    result.z = z;
    return Cartesian3.normalize(result, result);
  };
  Ellipsoid.prototype.geodeticSurfaceNormal = function(cartesian, result) {
    if (!defined(result)) {
      result = new Cartesian3();
    }
    result = Cartesian3.multiplyComponents(cartesian, this._oneOverRadiiSquared, result);
    return Cartesian3.normalize(result, result);
  };
  var cartographicToCartesianNormal = new Cartesian3();
  var cartographicToCartesianK = new Cartesian3();
  Ellipsoid.prototype.cartographicToCartesian = function(cartographic, result) {
    var n = cartographicToCartesianNormal;
    var k = cartographicToCartesianK;
    this.geodeticSurfaceNormalCartographic(cartographic, n);
    Cartesian3.multiplyComponents(this._radiiSquared, n, k);
    var gamma = Math.sqrt(Cartesian3.dot(n, k));
    Cartesian3.divideByScalar(k, gamma, k);
    Cartesian3.multiplyByScalar(n, cartographic.height, n);
    if (!defined(result)) {
      result = new Cartesian3();
    }
    return Cartesian3.add(k, n, result);
  };
  Ellipsoid.prototype.cartographicArrayToCartesianArray = function(cartographics, result) {
    if (!defined(cartographics)) {
      throw new DeveloperError('cartographics is required.');
    }
    var length = cartographics.length;
    if (!defined(result)) {
      result = new Array(length);
    } else {
      result.length = length;
    }
    for (var i = 0; i < length; i++) {
      result[i] = this.cartographicToCartesian(cartographics[i], result[i]);
    }
    return result;
  };
  var cartesianToCartographicN = new Cartesian3();
  var cartesianToCartographicP = new Cartesian3();
  var cartesianToCartographicH = new Cartesian3();
  Ellipsoid.prototype.cartesianToCartographic = function(cartesian, result) {
    var p = this.scaleToGeodeticSurface(cartesian, cartesianToCartographicP);
    if (!defined(p)) {
      return undefined;
    }
    var n = this.geodeticSurfaceNormal(p, cartesianToCartographicN);
    var h = Cartesian3.subtract(cartesian, p, cartesianToCartographicH);
    var longitude = Math.atan2(n.y, n.x);
    var latitude = Math.asin(n.z);
    var height = CesiumMath.sign(Cartesian3.dot(h, cartesian)) * Cartesian3.magnitude(h);
    if (!defined(result)) {
      return new Cartographic(longitude, latitude, height);
    }
    result.longitude = longitude;
    result.latitude = latitude;
    result.height = height;
    return result;
  };
  Ellipsoid.prototype.cartesianArrayToCartographicArray = function(cartesians, result) {
    if (!defined(cartesians)) {
      throw new DeveloperError('cartesians is required.');
    }
    var length = cartesians.length;
    if (!defined(result)) {
      result = new Array(length);
    } else {
      result.length = length;
    }
    for (var i = 0; i < length; ++i) {
      result[i] = this.cartesianToCartographic(cartesians[i], result[i]);
    }
    return result;
  };
  Ellipsoid.prototype.scaleToGeodeticSurface = function(cartesian, result) {
    return scaleToGeodeticSurface(cartesian, this._oneOverRadii, this._oneOverRadiiSquared, this._centerToleranceSquared, result);
  };
  Ellipsoid.prototype.scaleToGeocentricSurface = function(cartesian, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required.');
    }
    if (!defined(result)) {
      result = new Cartesian3();
    }
    var positionX = cartesian.x;
    var positionY = cartesian.y;
    var positionZ = cartesian.z;
    var oneOverRadiiSquared = this._oneOverRadiiSquared;
    var beta = 1.0 / Math.sqrt((positionX * positionX) * oneOverRadiiSquared.x + (positionY * positionY) * oneOverRadiiSquared.y + (positionZ * positionZ) * oneOverRadiiSquared.z);
    return Cartesian3.multiplyByScalar(cartesian, beta, result);
  };
  Ellipsoid.prototype.transformPositionToScaledSpace = function(position, result) {
    if (!defined(result)) {
      result = new Cartesian3();
    }
    return Cartesian3.multiplyComponents(position, this._oneOverRadii, result);
  };
  Ellipsoid.prototype.transformPositionFromScaledSpace = function(position, result) {
    if (!defined(result)) {
      result = new Cartesian3();
    }
    return Cartesian3.multiplyComponents(position, this._radii, result);
  };
  Ellipsoid.prototype.equals = function(right) {
    return (this === right) || (defined(right) && Cartesian3.equals(this._radii, right._radii));
  };
  Ellipsoid.prototype.toString = function() {
    return this._radii.toString();
  };
  return Ellipsoid;
});

})();
(function() {
var define = $__System.amdDefine;
define("66", ["2c", "3b", "23", "1a", "1b", "1c", "3c", "27"], function(Cartesian3, Cartographic, defaultValue, defined, defineProperties, DeveloperError, Ellipsoid, CesiumMath) {
  'use strict';
  function setConstants(ellipsoidGeodesic) {
    var uSquared = ellipsoidGeodesic._uSquared;
    var a = ellipsoidGeodesic._ellipsoid.maximumRadius;
    var b = ellipsoidGeodesic._ellipsoid.minimumRadius;
    var f = (a - b) / a;
    var cosineHeading = Math.cos(ellipsoidGeodesic._startHeading);
    var sineHeading = Math.sin(ellipsoidGeodesic._startHeading);
    var tanU = (1 - f) * Math.tan(ellipsoidGeodesic._start.latitude);
    var cosineU = 1.0 / Math.sqrt(1.0 + tanU * tanU);
    var sineU = cosineU * tanU;
    var sigma = Math.atan2(tanU, cosineHeading);
    var sineAlpha = cosineU * sineHeading;
    var sineSquaredAlpha = sineAlpha * sineAlpha;
    var cosineSquaredAlpha = 1.0 - sineSquaredAlpha;
    var cosineAlpha = Math.sqrt(cosineSquaredAlpha);
    var u2Over4 = uSquared / 4.0;
    var u4Over16 = u2Over4 * u2Over4;
    var u6Over64 = u4Over16 * u2Over4;
    var u8Over256 = u4Over16 * u4Over16;
    var a0 = (1.0 + u2Over4 - 3.0 * u4Over16 / 4.0 + 5.0 * u6Over64 / 4.0 - 175.0 * u8Over256 / 64.0);
    var a1 = (1.0 - u2Over4 + 15.0 * u4Over16 / 8.0 - 35.0 * u6Over64 / 8.0);
    var a2 = (1.0 - 3.0 * u2Over4 + 35.0 * u4Over16 / 4.0);
    var a3 = (1.0 - 5.0 * u2Over4);
    var distanceRatio = a0 * sigma - a1 * Math.sin(2.0 * sigma) * u2Over4 / 2.0 - a2 * Math.sin(4.0 * sigma) * u4Over16 / 16.0 - a3 * Math.sin(6.0 * sigma) * u6Over64 / 48.0 - Math.sin(8.0 * sigma) * 5.0 * u8Over256 / 512;
    var constants = ellipsoidGeodesic._constants;
    constants.a = a;
    constants.b = b;
    constants.f = f;
    constants.cosineHeading = cosineHeading;
    constants.sineHeading = sineHeading;
    constants.tanU = tanU;
    constants.cosineU = cosineU;
    constants.sineU = sineU;
    constants.sigma = sigma;
    constants.sineAlpha = sineAlpha;
    constants.sineSquaredAlpha = sineSquaredAlpha;
    constants.cosineSquaredAlpha = cosineSquaredAlpha;
    constants.cosineAlpha = cosineAlpha;
    constants.u2Over4 = u2Over4;
    constants.u4Over16 = u4Over16;
    constants.u6Over64 = u6Over64;
    constants.u8Over256 = u8Over256;
    constants.a0 = a0;
    constants.a1 = a1;
    constants.a2 = a2;
    constants.a3 = a3;
    constants.distanceRatio = distanceRatio;
  }
  function computeC(f, cosineSquaredAlpha) {
    return f * cosineSquaredAlpha * (4.0 + f * (4.0 - 3.0 * cosineSquaredAlpha)) / 16.0;
  }
  function computeDeltaLambda(f, sineAlpha, cosineSquaredAlpha, sigma, sineSigma, cosineSigma, cosineTwiceSigmaMidpoint) {
    var C = computeC(f, cosineSquaredAlpha);
    return (1.0 - C) * f * sineAlpha * (sigma + C * sineSigma * (cosineTwiceSigmaMidpoint + C * cosineSigma * (2.0 * cosineTwiceSigmaMidpoint * cosineTwiceSigmaMidpoint - 1.0)));
  }
  function vincentyInverseFormula(ellipsoidGeodesic, major, minor, firstLongitude, firstLatitude, secondLongitude, secondLatitude) {
    var eff = (major - minor) / major;
    var l = secondLongitude - firstLongitude;
    var u1 = Math.atan((1 - eff) * Math.tan(firstLatitude));
    var u2 = Math.atan((1 - eff) * Math.tan(secondLatitude));
    var cosineU1 = Math.cos(u1);
    var sineU1 = Math.sin(u1);
    var cosineU2 = Math.cos(u2);
    var sineU2 = Math.sin(u2);
    var cc = cosineU1 * cosineU2;
    var cs = cosineU1 * sineU2;
    var ss = sineU1 * sineU2;
    var sc = sineU1 * cosineU2;
    var lambda = l;
    var lambdaDot = CesiumMath.TWO_PI;
    var cosineLambda = Math.cos(lambda);
    var sineLambda = Math.sin(lambda);
    var sigma;
    var cosineSigma;
    var sineSigma;
    var cosineSquaredAlpha;
    var cosineTwiceSigmaMidpoint;
    do {
      cosineLambda = Math.cos(lambda);
      sineLambda = Math.sin(lambda);
      var temp = cs - sc * cosineLambda;
      sineSigma = Math.sqrt(cosineU2 * cosineU2 * sineLambda * sineLambda + temp * temp);
      cosineSigma = ss + cc * cosineLambda;
      sigma = Math.atan2(sineSigma, cosineSigma);
      var sineAlpha;
      if (sineSigma === 0.0) {
        sineAlpha = 0.0;
        cosineSquaredAlpha = 1.0;
      } else {
        sineAlpha = cc * sineLambda / sineSigma;
        cosineSquaredAlpha = 1.0 - sineAlpha * sineAlpha;
      }
      lambdaDot = lambda;
      cosineTwiceSigmaMidpoint = cosineSigma - 2.0 * ss / cosineSquaredAlpha;
      if (isNaN(cosineTwiceSigmaMidpoint)) {
        cosineTwiceSigmaMidpoint = 0.0;
      }
      lambda = l + computeDeltaLambda(eff, sineAlpha, cosineSquaredAlpha, sigma, sineSigma, cosineSigma, cosineTwiceSigmaMidpoint);
    } while (Math.abs(lambda - lambdaDot) > CesiumMath.EPSILON12);
    var uSquared = cosineSquaredAlpha * (major * major - minor * minor) / (minor * minor);
    var A = 1.0 + uSquared * (4096.0 + uSquared * (uSquared * (320.0 - 175.0 * uSquared) - 768.0)) / 16384.0;
    var B = uSquared * (256.0 + uSquared * (uSquared * (74.0 - 47.0 * uSquared) - 128.0)) / 1024.0;
    var cosineSquaredTwiceSigmaMidpoint = cosineTwiceSigmaMidpoint * cosineTwiceSigmaMidpoint;
    var deltaSigma = B * sineSigma * (cosineTwiceSigmaMidpoint + B * (cosineSigma * (2.0 * cosineSquaredTwiceSigmaMidpoint - 1.0) - B * cosineTwiceSigmaMidpoint * (4.0 * sineSigma * sineSigma - 3.0) * (4.0 * cosineSquaredTwiceSigmaMidpoint - 3.0) / 6.0) / 4.0);
    var distance = minor * A * (sigma - deltaSigma);
    var startHeading = Math.atan2(cosineU2 * sineLambda, cs - sc * cosineLambda);
    var endHeading = Math.atan2(cosineU1 * sineLambda, cs * cosineLambda - sc);
    ellipsoidGeodesic._distance = distance;
    ellipsoidGeodesic._startHeading = startHeading;
    ellipsoidGeodesic._endHeading = endHeading;
    ellipsoidGeodesic._uSquared = uSquared;
  }
  function computeProperties(ellipsoidGeodesic, start, end, ellipsoid) {
    var firstCartesian = Cartesian3.normalize(ellipsoid.cartographicToCartesian(start, scratchCart2), scratchCart1);
    var lastCartesian = Cartesian3.normalize(ellipsoid.cartographicToCartesian(end, scratchCart2), scratchCart2);
    if (Math.abs(Math.abs(Cartesian3.angleBetween(firstCartesian, lastCartesian)) - Math.PI) < 0.0125) {
      throw new DeveloperError('geodesic position is not unique');
    }
    vincentyInverseFormula(ellipsoidGeodesic, ellipsoid.maximumRadius, ellipsoid.minimumRadius, start.longitude, start.latitude, end.longitude, end.latitude);
    ellipsoidGeodesic._start = Cartographic.clone(start, ellipsoidGeodesic._start);
    ellipsoidGeodesic._end = Cartographic.clone(end, ellipsoidGeodesic._end);
    ellipsoidGeodesic._start.height = 0;
    ellipsoidGeodesic._end.height = 0;
    setConstants(ellipsoidGeodesic);
  }
  var scratchCart1 = new Cartesian3();
  var scratchCart2 = new Cartesian3();
  function EllipsoidGeodesic(start, end, ellipsoid) {
    var e = defaultValue(ellipsoid, Ellipsoid.WGS84);
    this._ellipsoid = e;
    this._start = new Cartographic();
    this._end = new Cartographic();
    this._constants = {};
    this._startHeading = undefined;
    this._endHeading = undefined;
    this._distance = undefined;
    this._uSquared = undefined;
    if (defined(start) && defined(end)) {
      computeProperties(this, start, end, e);
    }
  }
  defineProperties(EllipsoidGeodesic.prototype, {
    ellipsoid: {get: function() {
        return this._ellipsoid;
      }},
    surfaceDistance: {get: function() {
        if (!defined(this._distance)) {
          throw new DeveloperError('set end positions before getting surfaceDistance');
        }
        return this._distance;
      }},
    start: {get: function() {
        return this._start;
      }},
    end: {get: function() {
        return this._end;
      }},
    startHeading: {get: function() {
        if (!defined(this._distance)) {
          throw new DeveloperError('set end positions before getting startHeading');
        }
        return this._startHeading;
      }},
    endHeading: {get: function() {
        if (!defined(this._distance)) {
          throw new DeveloperError('set end positions before getting endHeading');
        }
        return this._endHeading;
      }}
  });
  EllipsoidGeodesic.prototype.setEndPoints = function(start, end) {
    if (!defined(start)) {
      throw new DeveloperError('start cartographic position is required');
    }
    if (!defined(end)) {
      throw new DeveloperError('end cartgraphic position is required');
    }
    computeProperties(this, start, end, this._ellipsoid);
  };
  EllipsoidGeodesic.prototype.interpolateUsingFraction = function(fraction, result) {
    return this.interpolateUsingSurfaceDistance(this._distance * fraction, result);
  };
  EllipsoidGeodesic.prototype.interpolateUsingSurfaceDistance = function(distance, result) {
    if (!defined(this._distance)) {
      throw new DeveloperError('start and end must be set before calling funciton interpolateUsingSurfaceDistance');
    }
    var constants = this._constants;
    var s = constants.distanceRatio + distance / constants.b;
    var cosine2S = Math.cos(2.0 * s);
    var cosine4S = Math.cos(4.0 * s);
    var cosine6S = Math.cos(6.0 * s);
    var sine2S = Math.sin(2.0 * s);
    var sine4S = Math.sin(4.0 * s);
    var sine6S = Math.sin(6.0 * s);
    var sine8S = Math.sin(8.0 * s);
    var s2 = s * s;
    var s3 = s * s2;
    var u8Over256 = constants.u8Over256;
    var u2Over4 = constants.u2Over4;
    var u6Over64 = constants.u6Over64;
    var u4Over16 = constants.u4Over16;
    var sigma = 2.0 * s3 * u8Over256 * cosine2S / 3.0 + s * (1.0 - u2Over4 + 7.0 * u4Over16 / 4.0 - 15.0 * u6Over64 / 4.0 + 579.0 * u8Over256 / 64.0 - (u4Over16 - 15.0 * u6Over64 / 4.0 + 187.0 * u8Over256 / 16.0) * cosine2S - (5.0 * u6Over64 / 4.0 - 115.0 * u8Over256 / 16.0) * cosine4S - 29.0 * u8Over256 * cosine6S / 16.0) + (u2Over4 / 2.0 - u4Over16 + 71.0 * u6Over64 / 32.0 - 85.0 * u8Over256 / 16.0) * sine2S + (5.0 * u4Over16 / 16.0 - 5.0 * u6Over64 / 4.0 + 383.0 * u8Over256 / 96.0) * sine4S - s2 * ((u6Over64 - 11.0 * u8Over256 / 2.0) * sine2S + 5.0 * u8Over256 * sine4S / 2.0) + (29.0 * u6Over64 / 96.0 - 29.0 * u8Over256 / 16.0) * sine6S + 539.0 * u8Over256 * sine8S / 1536.0;
    var theta = Math.asin(Math.sin(sigma) * constants.cosineAlpha);
    var latitude = Math.atan(constants.a / constants.b * Math.tan(theta));
    sigma = sigma - constants.sigma;
    var cosineTwiceSigmaMidpoint = Math.cos(2.0 * constants.sigma + sigma);
    var sineSigma = Math.sin(sigma);
    var cosineSigma = Math.cos(sigma);
    var cc = constants.cosineU * cosineSigma;
    var ss = constants.sineU * sineSigma;
    var lambda = Math.atan2(sineSigma * constants.sineHeading, cc - ss * constants.cosineHeading);
    var l = lambda - computeDeltaLambda(constants.f, constants.sineAlpha, constants.cosineSquaredAlpha, sigma, sineSigma, cosineSigma, cosineTwiceSigmaMidpoint);
    if (defined(result)) {
      result.longitude = this._start.longitude + l;
      result.latitude = latitude;
      result.height = 0.0;
      return result;
    }
    return new Cartographic(this._start.longitude + l, latitude, 0.0);
  };
  return EllipsoidGeodesic;
});

})();
(function() {
var define = $__System.amdDefine;
define("65", ["2c", "1a", "1c", "27"], function(Cartesian3, defined, DeveloperError, CesiumMath) {
  'use strict';
  var scaleToGeodeticSurfaceIntersection = new Cartesian3();
  var scaleToGeodeticSurfaceGradient = new Cartesian3();
  function scaleToGeodeticSurface(cartesian, oneOverRadii, oneOverRadiiSquared, centerToleranceSquared, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required.');
    }
    if (!defined(oneOverRadii)) {
      throw new DeveloperError('oneOverRadii is required.');
    }
    if (!defined(oneOverRadiiSquared)) {
      throw new DeveloperError('oneOverRadiiSquared is required.');
    }
    if (!defined(centerToleranceSquared)) {
      throw new DeveloperError('centerToleranceSquared is required.');
    }
    var positionX = cartesian.x;
    var positionY = cartesian.y;
    var positionZ = cartesian.z;
    var oneOverRadiiX = oneOverRadii.x;
    var oneOverRadiiY = oneOverRadii.y;
    var oneOverRadiiZ = oneOverRadii.z;
    var x2 = positionX * positionX * oneOverRadiiX * oneOverRadiiX;
    var y2 = positionY * positionY * oneOverRadiiY * oneOverRadiiY;
    var z2 = positionZ * positionZ * oneOverRadiiZ * oneOverRadiiZ;
    var squaredNorm = x2 + y2 + z2;
    var ratio = Math.sqrt(1.0 / squaredNorm);
    var intersection = Cartesian3.multiplyByScalar(cartesian, ratio, scaleToGeodeticSurfaceIntersection);
    if (squaredNorm < centerToleranceSquared) {
      return !isFinite(ratio) ? undefined : Cartesian3.clone(intersection, result);
    }
    var oneOverRadiiSquaredX = oneOverRadiiSquared.x;
    var oneOverRadiiSquaredY = oneOverRadiiSquared.y;
    var oneOverRadiiSquaredZ = oneOverRadiiSquared.z;
    var gradient = scaleToGeodeticSurfaceGradient;
    gradient.x = intersection.x * oneOverRadiiSquaredX * 2.0;
    gradient.y = intersection.y * oneOverRadiiSquaredY * 2.0;
    gradient.z = intersection.z * oneOverRadiiSquaredZ * 2.0;
    var lambda = (1.0 - ratio) * Cartesian3.magnitude(cartesian) / (0.5 * Cartesian3.magnitude(gradient));
    var correction = 0.0;
    var func;
    var denominator;
    var xMultiplier;
    var yMultiplier;
    var zMultiplier;
    var xMultiplier2;
    var yMultiplier2;
    var zMultiplier2;
    var xMultiplier3;
    var yMultiplier3;
    var zMultiplier3;
    do {
      lambda -= correction;
      xMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredX);
      yMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredY);
      zMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredZ);
      xMultiplier2 = xMultiplier * xMultiplier;
      yMultiplier2 = yMultiplier * yMultiplier;
      zMultiplier2 = zMultiplier * zMultiplier;
      xMultiplier3 = xMultiplier2 * xMultiplier;
      yMultiplier3 = yMultiplier2 * yMultiplier;
      zMultiplier3 = zMultiplier2 * zMultiplier;
      func = x2 * xMultiplier2 + y2 * yMultiplier2 + z2 * zMultiplier2 - 1.0;
      denominator = x2 * xMultiplier3 * oneOverRadiiSquaredX + y2 * yMultiplier3 * oneOverRadiiSquaredY + z2 * zMultiplier3 * oneOverRadiiSquaredZ;
      var derivative = -2.0 * denominator;
      correction = func / derivative;
    } while (Math.abs(func) > CesiumMath.EPSILON12);
    if (!defined(result)) {
      return new Cartesian3(positionX * xMultiplier, positionY * yMultiplier, positionZ * zMultiplier);
    }
    result.x = positionX * xMultiplier;
    result.y = positionY * yMultiplier;
    result.z = positionZ * zMultiplier;
    return result;
  }
  return scaleToGeodeticSurface;
});

})();
(function() {
var define = $__System.amdDefine;
define("3b", ["2c", "23", "1a", "1c", "1f", "27", "65"], function(Cartesian3, defaultValue, defined, DeveloperError, freezeObject, CesiumMath, scaleToGeodeticSurface) {
  'use strict';
  function Cartographic(longitude, latitude, height) {
    this.longitude = defaultValue(longitude, 0.0);
    this.latitude = defaultValue(latitude, 0.0);
    this.height = defaultValue(height, 0.0);
  }
  Cartographic.fromRadians = function(longitude, latitude, height, result) {
    if (!defined(longitude)) {
      throw new DeveloperError('longitude is required.');
    }
    if (!defined(latitude)) {
      throw new DeveloperError('latitude is required.');
    }
    height = defaultValue(height, 0.0);
    if (!defined(result)) {
      return new Cartographic(longitude, latitude, height);
    }
    result.longitude = longitude;
    result.latitude = latitude;
    result.height = height;
    return result;
  };
  Cartographic.fromDegrees = function(longitude, latitude, height, result) {
    if (!defined(longitude)) {
      throw new DeveloperError('longitude is required.');
    }
    if (!defined(latitude)) {
      throw new DeveloperError('latitude is required.');
    }
    longitude = CesiumMath.toRadians(longitude);
    latitude = CesiumMath.toRadians(latitude);
    return Cartographic.fromRadians(longitude, latitude, height, result);
  };
  var cartesianToCartographicN = new Cartesian3();
  var cartesianToCartographicP = new Cartesian3();
  var cartesianToCartographicH = new Cartesian3();
  var wgs84OneOverRadii = new Cartesian3(1.0 / 6378137.0, 1.0 / 6378137.0, 1.0 / 6356752.3142451793);
  var wgs84OneOverRadiiSquared = new Cartesian3(1.0 / (6378137.0 * 6378137.0), 1.0 / (6378137.0 * 6378137.0), 1.0 / (6356752.3142451793 * 6356752.3142451793));
  var wgs84CenterToleranceSquared = CesiumMath.EPSILON1;
  Cartographic.fromCartesian = function(cartesian, ellipsoid, result) {
    var oneOverRadii = defined(ellipsoid) ? ellipsoid.oneOverRadii : wgs84OneOverRadii;
    var oneOverRadiiSquared = defined(ellipsoid) ? ellipsoid.oneOverRadiiSquared : wgs84OneOverRadiiSquared;
    var centerToleranceSquared = defined(ellipsoid) ? ellipsoid._centerToleranceSquared : wgs84CenterToleranceSquared;
    var p = scaleToGeodeticSurface(cartesian, oneOverRadii, oneOverRadiiSquared, centerToleranceSquared, cartesianToCartographicP);
    if (!defined(p)) {
      return undefined;
    }
    var n = Cartesian3.multiplyComponents(cartesian, oneOverRadiiSquared, cartesianToCartographicN);
    n = Cartesian3.normalize(n, n);
    var h = Cartesian3.subtract(cartesian, p, cartesianToCartographicH);
    var longitude = Math.atan2(n.y, n.x);
    var latitude = Math.asin(n.z);
    var height = CesiumMath.sign(Cartesian3.dot(h, cartesian)) * Cartesian3.magnitude(h);
    if (!defined(result)) {
      return new Cartographic(longitude, latitude, height);
    }
    result.longitude = longitude;
    result.latitude = latitude;
    result.height = height;
    return result;
  };
  Cartographic.clone = function(cartographic, result) {
    if (!defined(cartographic)) {
      return undefined;
    }
    if (!defined(result)) {
      return new Cartographic(cartographic.longitude, cartographic.latitude, cartographic.height);
    }
    result.longitude = cartographic.longitude;
    result.latitude = cartographic.latitude;
    result.height = cartographic.height;
    return result;
  };
  Cartographic.equals = function(left, right) {
    return (left === right) || ((defined(left)) && (defined(right)) && (left.longitude === right.longitude) && (left.latitude === right.latitude) && (left.height === right.height));
  };
  Cartographic.equalsEpsilon = function(left, right, epsilon) {
    if (typeof epsilon !== 'number') {
      throw new DeveloperError('epsilon is required and must be a number.');
    }
    return (left === right) || ((defined(left)) && (defined(right)) && (Math.abs(left.longitude - right.longitude) <= epsilon) && (Math.abs(left.latitude - right.latitude) <= epsilon) && (Math.abs(left.height - right.height) <= epsilon));
  };
  Cartographic.ZERO = freezeObject(new Cartographic(0.0, 0.0, 0.0));
  Cartographic.prototype.clone = function(result) {
    return Cartographic.clone(this, result);
  };
  Cartographic.prototype.equals = function(right) {
    return Cartographic.equals(this, right);
  };
  Cartographic.prototype.equalsEpsilon = function(right, epsilon) {
    return Cartographic.equalsEpsilon(this, right, epsilon);
  };
  Cartographic.prototype.toString = function() {
    return '(' + this.longitude + ', ' + this.latitude + ', ' + this.height + ')';
  };
  return Cartographic;
});

})();
(function() {
var define = $__System.amdDefine;
define("67", ["1c", "68"], function(DeveloperError, QuadraticRealPolynomial) {
  'use strict';
  var CubicRealPolynomial = {};
  CubicRealPolynomial.computeDiscriminant = function(a, b, c, d) {
    if (typeof a !== 'number') {
      throw new DeveloperError('a is a required number.');
    }
    if (typeof b !== 'number') {
      throw new DeveloperError('b is a required number.');
    }
    if (typeof c !== 'number') {
      throw new DeveloperError('c is a required number.');
    }
    if (typeof d !== 'number') {
      throw new DeveloperError('d is a required number.');
    }
    var a2 = a * a;
    var b2 = b * b;
    var c2 = c * c;
    var d2 = d * d;
    var discriminant = 18.0 * a * b * c * d + b2 * c2 - 27.0 * a2 * d2 - 4.0 * (a * c2 * c + b2 * b * d);
    return discriminant;
  };
  function computeRealRoots(a, b, c, d) {
    var A = a;
    var B = b / 3.0;
    var C = c / 3.0;
    var D = d;
    var AC = A * C;
    var BD = B * D;
    var B2 = B * B;
    var C2 = C * C;
    var delta1 = A * C - B2;
    var delta2 = A * D - B * C;
    var delta3 = B * D - C2;
    var discriminant = 4.0 * delta1 * delta3 - delta2 * delta2;
    var temp;
    var temp1;
    if (discriminant < 0.0) {
      var ABar;
      var CBar;
      var DBar;
      if (B2 * BD >= AC * C2) {
        ABar = A;
        CBar = delta1;
        DBar = -2.0 * B * delta1 + A * delta2;
      } else {
        ABar = D;
        CBar = delta3;
        DBar = -D * delta2 + 2.0 * C * delta3;
      }
      var s = (DBar < 0.0) ? -1.0 : 1.0;
      var temp0 = -s * Math.abs(ABar) * Math.sqrt(-discriminant);
      temp1 = -DBar + temp0;
      var x = temp1 / 2.0;
      var p = x < 0.0 ? -Math.pow(-x, 1.0 / 3.0) : Math.pow(x, 1.0 / 3.0);
      var q = (temp1 === temp0) ? -p : -CBar / p;
      temp = (CBar <= 0.0) ? p + q : -DBar / (p * p + q * q + CBar);
      if (B2 * BD >= AC * C2) {
        return [(temp - B) / A];
      }
      return [-D / (temp + C)];
    }
    var CBarA = delta1;
    var DBarA = -2.0 * B * delta1 + A * delta2;
    var CBarD = delta3;
    var DBarD = -D * delta2 + 2.0 * C * delta3;
    var squareRootOfDiscriminant = Math.sqrt(discriminant);
    var halfSquareRootOf3 = Math.sqrt(3.0) / 2.0;
    var theta = Math.abs(Math.atan2(A * squareRootOfDiscriminant, -DBarA) / 3.0);
    temp = 2.0 * Math.sqrt(-CBarA);
    var cosine = Math.cos(theta);
    temp1 = temp * cosine;
    var temp3 = temp * (-cosine / 2.0 - halfSquareRootOf3 * Math.sin(theta));
    var numeratorLarge = (temp1 + temp3 > 2.0 * B) ? temp1 - B : temp3 - B;
    var denominatorLarge = A;
    var root1 = numeratorLarge / denominatorLarge;
    theta = Math.abs(Math.atan2(D * squareRootOfDiscriminant, -DBarD) / 3.0);
    temp = 2.0 * Math.sqrt(-CBarD);
    cosine = Math.cos(theta);
    temp1 = temp * cosine;
    temp3 = temp * (-cosine / 2.0 - halfSquareRootOf3 * Math.sin(theta));
    var numeratorSmall = -D;
    var denominatorSmall = (temp1 + temp3 < 2.0 * C) ? temp1 + C : temp3 + C;
    var root3 = numeratorSmall / denominatorSmall;
    var E = denominatorLarge * denominatorSmall;
    var F = -numeratorLarge * denominatorSmall - denominatorLarge * numeratorSmall;
    var G = numeratorLarge * numeratorSmall;
    var root2 = (C * F - B * G) / (-B * F + C * E);
    if (root1 <= root2) {
      if (root1 <= root3) {
        if (root2 <= root3) {
          return [root1, root2, root3];
        }
        return [root1, root3, root2];
      }
      return [root3, root1, root2];
    }
    if (root1 <= root3) {
      return [root2, root1, root3];
    }
    if (root2 <= root3) {
      return [root2, root3, root1];
    }
    return [root3, root2, root1];
  }
  CubicRealPolynomial.computeRealRoots = function(a, b, c, d) {
    if (typeof a !== 'number') {
      throw new DeveloperError('a is a required number.');
    }
    if (typeof b !== 'number') {
      throw new DeveloperError('b is a required number.');
    }
    if (typeof c !== 'number') {
      throw new DeveloperError('c is a required number.');
    }
    if (typeof d !== 'number') {
      throw new DeveloperError('d is a required number.');
    }
    var roots;
    var ratio;
    if (a === 0.0) {
      return QuadraticRealPolynomial.computeRealRoots(b, c, d);
    } else if (b === 0.0) {
      if (c === 0.0) {
        if (d === 0.0) {
          return [0.0, 0.0, 0.0];
        }
        ratio = -d / a;
        var root = (ratio < 0.0) ? -Math.pow(-ratio, 1.0 / 3.0) : Math.pow(ratio, 1.0 / 3.0);
        return [root, root, root];
      } else if (d === 0.0) {
        roots = QuadraticRealPolynomial.computeRealRoots(a, 0, c);
        if (roots.Length === 0) {
          return [0.0];
        }
        return [roots[0], 0.0, roots[1]];
      }
      return computeRealRoots(a, 0, c, d);
    } else if (c === 0.0) {
      if (d === 0.0) {
        ratio = -b / a;
        if (ratio < 0.0) {
          return [ratio, 0.0, 0.0];
        }
        return [0.0, 0.0, ratio];
      }
      return computeRealRoots(a, b, 0, d);
    } else if (d === 0.0) {
      roots = QuadraticRealPolynomial.computeRealRoots(a, b, c);
      if (roots.length === 0) {
        return [0.0];
      } else if (roots[1] <= 0.0) {
        return [roots[0], roots[1], 0.0];
      } else if (roots[0] >= 0.0) {
        return [0.0, roots[0], roots[1]];
      }
      return [roots[0], 0.0, roots[1]];
    }
    return computeRealRoots(a, b, c, d);
  };
  return CubicRealPolynomial;
});

})();
(function() {
var define = $__System.amdDefine;
define("68", ["1c", "27"], function(DeveloperError, CesiumMath) {
  'use strict';
  var QuadraticRealPolynomial = {};
  QuadraticRealPolynomial.computeDiscriminant = function(a, b, c) {
    if (typeof a !== 'number') {
      throw new DeveloperError('a is a required number.');
    }
    if (typeof b !== 'number') {
      throw new DeveloperError('b is a required number.');
    }
    if (typeof c !== 'number') {
      throw new DeveloperError('c is a required number.');
    }
    var discriminant = b * b - 4.0 * a * c;
    return discriminant;
  };
  function addWithCancellationCheck(left, right, tolerance) {
    var difference = left + right;
    if ((CesiumMath.sign(left) !== CesiumMath.sign(right)) && Math.abs(difference / Math.max(Math.abs(left), Math.abs(right))) < tolerance) {
      return 0.0;
    }
    return difference;
  }
  QuadraticRealPolynomial.computeRealRoots = function(a, b, c) {
    if (typeof a !== 'number') {
      throw new DeveloperError('a is a required number.');
    }
    if (typeof b !== 'number') {
      throw new DeveloperError('b is a required number.');
    }
    if (typeof c !== 'number') {
      throw new DeveloperError('c is a required number.');
    }
    var ratio;
    if (a === 0.0) {
      if (b === 0.0) {
        return [];
      }
      return [-c / b];
    } else if (b === 0.0) {
      if (c === 0.0) {
        return [0.0, 0.0];
      }
      var cMagnitude = Math.abs(c);
      var aMagnitude = Math.abs(a);
      if ((cMagnitude < aMagnitude) && (cMagnitude / aMagnitude < CesiumMath.EPSILON14)) {
        return [0.0, 0.0];
      } else if ((cMagnitude > aMagnitude) && (aMagnitude / cMagnitude < CesiumMath.EPSILON14)) {
        return [];
      }
      ratio = -c / a;
      if (ratio < 0.0) {
        return [];
      }
      var root = Math.sqrt(ratio);
      return [-root, root];
    } else if (c === 0.0) {
      ratio = -b / a;
      if (ratio < 0.0) {
        return [ratio, 0.0];
      }
      return [0.0, ratio];
    }
    var b2 = b * b;
    var four_ac = 4.0 * a * c;
    var radicand = addWithCancellationCheck(b2, -four_ac, CesiumMath.EPSILON14);
    if (radicand < 0.0) {
      return [];
    }
    var q = -0.5 * addWithCancellationCheck(b, CesiumMath.sign(b) * Math.sqrt(radicand), CesiumMath.EPSILON14);
    if (b > 0.0) {
      return [q / a, c / q];
    }
    return [c / q, q / a];
  };
  return QuadraticRealPolynomial;
});

})();
(function() {
var define = $__System.amdDefine;
define("69", ["67", "1c", "27", "68"], function(CubicRealPolynomial, DeveloperError, CesiumMath, QuadraticRealPolynomial) {
  'use strict';
  var QuarticRealPolynomial = {};
  QuarticRealPolynomial.computeDiscriminant = function(a, b, c, d, e) {
    if (typeof a !== 'number') {
      throw new DeveloperError('a is a required number.');
    }
    if (typeof b !== 'number') {
      throw new DeveloperError('b is a required number.');
    }
    if (typeof c !== 'number') {
      throw new DeveloperError('c is a required number.');
    }
    if (typeof d !== 'number') {
      throw new DeveloperError('d is a required number.');
    }
    if (typeof e !== 'number') {
      throw new DeveloperError('e is a required number.');
    }
    var a2 = a * a;
    var a3 = a2 * a;
    var b2 = b * b;
    var b3 = b2 * b;
    var c2 = c * c;
    var c3 = c2 * c;
    var d2 = d * d;
    var d3 = d2 * d;
    var e2 = e * e;
    var e3 = e2 * e;
    var discriminant = (b2 * c2 * d2 - 4.0 * b3 * d3 - 4.0 * a * c3 * d2 + 18 * a * b * c * d3 - 27.0 * a2 * d2 * d2 + 256.0 * a3 * e3) + e * (18.0 * b3 * c * d - 4.0 * b2 * c3 + 16.0 * a * c2 * c2 - 80.0 * a * b * c2 * d - 6.0 * a * b2 * d2 + 144.0 * a2 * c * d2) + e2 * (144.0 * a * b2 * c - 27.0 * b2 * b2 - 128.0 * a2 * c2 - 192.0 * a2 * b * d);
    return discriminant;
  };
  function original(a3, a2, a1, a0) {
    var a3Squared = a3 * a3;
    var p = a2 - 3.0 * a3Squared / 8.0;
    var q = a1 - a2 * a3 / 2.0 + a3Squared * a3 / 8.0;
    var r = a0 - a1 * a3 / 4.0 + a2 * a3Squared / 16.0 - 3.0 * a3Squared * a3Squared / 256.0;
    var cubicRoots = CubicRealPolynomial.computeRealRoots(1.0, 2.0 * p, p * p - 4.0 * r, -q * q);
    if (cubicRoots.length > 0) {
      var temp = -a3 / 4.0;
      var hSquared = cubicRoots[cubicRoots.length - 1];
      if (Math.abs(hSquared) < CesiumMath.EPSILON14) {
        var roots = QuadraticRealPolynomial.computeRealRoots(1.0, p, r);
        if (roots.length === 2) {
          var root0 = roots[0];
          var root1 = roots[1];
          var y;
          if (root0 >= 0.0 && root1 >= 0.0) {
            var y0 = Math.sqrt(root0);
            var y1 = Math.sqrt(root1);
            return [temp - y1, temp - y0, temp + y0, temp + y1];
          } else if (root0 >= 0.0 && root1 < 0.0) {
            y = Math.sqrt(root0);
            return [temp - y, temp + y];
          } else if (root0 < 0.0 && root1 >= 0.0) {
            y = Math.sqrt(root1);
            return [temp - y, temp + y];
          }
        }
        return [];
      } else if (hSquared > 0.0) {
        var h = Math.sqrt(hSquared);
        var m = (p + hSquared - q / h) / 2.0;
        var n = (p + hSquared + q / h) / 2.0;
        var roots1 = QuadraticRealPolynomial.computeRealRoots(1.0, h, m);
        var roots2 = QuadraticRealPolynomial.computeRealRoots(1.0, -h, n);
        if (roots1.length !== 0) {
          roots1[0] += temp;
          roots1[1] += temp;
          if (roots2.length !== 0) {
            roots2[0] += temp;
            roots2[1] += temp;
            if (roots1[1] <= roots2[0]) {
              return [roots1[0], roots1[1], roots2[0], roots2[1]];
            } else if (roots2[1] <= roots1[0]) {
              return [roots2[0], roots2[1], roots1[0], roots1[1]];
            } else if (roots1[0] >= roots2[0] && roots1[1] <= roots2[1]) {
              return [roots2[0], roots1[0], roots1[1], roots2[1]];
            } else if (roots2[0] >= roots1[0] && roots2[1] <= roots1[1]) {
              return [roots1[0], roots2[0], roots2[1], roots1[1]];
            } else if (roots1[0] > roots2[0] && roots1[0] < roots2[1]) {
              return [roots2[0], roots1[0], roots2[1], roots1[1]];
            }
            return [roots1[0], roots2[0], roots1[1], roots2[1]];
          }
          return roots1;
        }
        if (roots2.length !== 0) {
          roots2[0] += temp;
          roots2[1] += temp;
          return roots2;
        }
        return [];
      }
    }
    return [];
  }
  function neumark(a3, a2, a1, a0) {
    var a1Squared = a1 * a1;
    var a2Squared = a2 * a2;
    var a3Squared = a3 * a3;
    var p = -2.0 * a2;
    var q = a1 * a3 + a2Squared - 4.0 * a0;
    var r = a3Squared * a0 - a1 * a2 * a3 + a1Squared;
    var cubicRoots = CubicRealPolynomial.computeRealRoots(1.0, p, q, r);
    if (cubicRoots.length > 0) {
      var y = cubicRoots[0];
      var temp = (a2 - y);
      var tempSquared = temp * temp;
      var g1 = a3 / 2.0;
      var h1 = temp / 2.0;
      var m = tempSquared - 4.0 * a0;
      var mError = tempSquared + 4.0 * Math.abs(a0);
      var n = a3Squared - 4.0 * y;
      var nError = a3Squared + 4.0 * Math.abs(y);
      var g2;
      var h2;
      if (y < 0.0 || (m * nError < n * mError)) {
        var squareRootOfN = Math.sqrt(n);
        g2 = squareRootOfN / 2.0;
        h2 = squareRootOfN === 0.0 ? 0.0 : (a3 * h1 - a1) / squareRootOfN;
      } else {
        var squareRootOfM = Math.sqrt(m);
        g2 = squareRootOfM === 0.0 ? 0.0 : (a3 * h1 - a1) / squareRootOfM;
        h2 = squareRootOfM / 2.0;
      }
      var G;
      var g;
      if (g1 === 0.0 && g2 === 0.0) {
        G = 0.0;
        g = 0.0;
      } else if (CesiumMath.sign(g1) === CesiumMath.sign(g2)) {
        G = g1 + g2;
        g = y / G;
      } else {
        g = g1 - g2;
        G = y / g;
      }
      var H;
      var h;
      if (h1 === 0.0 && h2 === 0.0) {
        H = 0.0;
        h = 0.0;
      } else if (CesiumMath.sign(h1) === CesiumMath.sign(h2)) {
        H = h1 + h2;
        h = a0 / H;
      } else {
        h = h1 - h2;
        H = a0 / h;
      }
      var roots1 = QuadraticRealPolynomial.computeRealRoots(1.0, G, H);
      var roots2 = QuadraticRealPolynomial.computeRealRoots(1.0, g, h);
      if (roots1.length !== 0) {
        if (roots2.length !== 0) {
          if (roots1[1] <= roots2[0]) {
            return [roots1[0], roots1[1], roots2[0], roots2[1]];
          } else if (roots2[1] <= roots1[0]) {
            return [roots2[0], roots2[1], roots1[0], roots1[1]];
          } else if (roots1[0] >= roots2[0] && roots1[1] <= roots2[1]) {
            return [roots2[0], roots1[0], roots1[1], roots2[1]];
          } else if (roots2[0] >= roots1[0] && roots2[1] <= roots1[1]) {
            return [roots1[0], roots2[0], roots2[1], roots1[1]];
          } else if (roots1[0] > roots2[0] && roots1[0] < roots2[1]) {
            return [roots2[0], roots1[0], roots2[1], roots1[1]];
          } else {
            return [roots1[0], roots2[0], roots1[1], roots2[1]];
          }
        }
        return roots1;
      }
      if (roots2.length !== 0) {
        return roots2;
      }
    }
    return [];
  }
  QuarticRealPolynomial.computeRealRoots = function(a, b, c, d, e) {
    if (typeof a !== 'number') {
      throw new DeveloperError('a is a required number.');
    }
    if (typeof b !== 'number') {
      throw new DeveloperError('b is a required number.');
    }
    if (typeof c !== 'number') {
      throw new DeveloperError('c is a required number.');
    }
    if (typeof d !== 'number') {
      throw new DeveloperError('d is a required number.');
    }
    if (typeof e !== 'number') {
      throw new DeveloperError('e is a required number.');
    }
    if (Math.abs(a) < CesiumMath.EPSILON15) {
      return CubicRealPolynomial.computeRealRoots(b, c, d, e);
    }
    var a3 = b / a;
    var a2 = c / a;
    var a1 = d / a;
    var a0 = e / a;
    var k = (a3 < 0.0) ? 1 : 0;
    k += (a2 < 0.0) ? k + 1 : k;
    k += (a1 < 0.0) ? k + 1 : k;
    k += (a0 < 0.0) ? k + 1 : k;
    switch (k) {
      case 0:
        return original(a3, a2, a1, a0);
      case 1:
        return neumark(a3, a2, a1, a0);
      case 2:
        return neumark(a3, a2, a1, a0);
      case 3:
        return original(a3, a2, a1, a0);
      case 4:
        return original(a3, a2, a1, a0);
      case 5:
        return neumark(a3, a2, a1, a0);
      case 6:
        return original(a3, a2, a1, a0);
      case 7:
        return original(a3, a2, a1, a0);
      case 8:
        return neumark(a3, a2, a1, a0);
      case 9:
        return original(a3, a2, a1, a0);
      case 10:
        return original(a3, a2, a1, a0);
      case 11:
        return neumark(a3, a2, a1, a0);
      case 12:
        return original(a3, a2, a1, a0);
      case 13:
        return original(a3, a2, a1, a0);
      case 14:
        return original(a3, a2, a1, a0);
      case 15:
        return original(a3, a2, a1, a0);
      default:
        return undefined;
    }
  };
  return QuarticRealPolynomial;
});

})();
(function() {
var define = $__System.amdDefine;
define("6a", ["2c", "23", "1a", "1c"], function(Cartesian3, defaultValue, defined, DeveloperError) {
  'use strict';
  function Ray(origin, direction) {
    direction = Cartesian3.clone(defaultValue(direction, Cartesian3.ZERO));
    if (!Cartesian3.equals(direction, Cartesian3.ZERO)) {
      Cartesian3.normalize(direction, direction);
    }
    this.origin = Cartesian3.clone(defaultValue(origin, Cartesian3.ZERO));
    this.direction = direction;
  }
  Ray.getPoint = function(ray, t, result) {
    if (!defined(ray)) {
      throw new DeveloperError('ray is requred');
    }
    if (typeof t !== 'number') {
      throw new DeveloperError('t is a required number');
    }
    if (!defined(result)) {
      result = new Cartesian3();
    }
    result = Cartesian3.multiplyByScalar(ray.direction, t, result);
    return Cartesian3.add(ray.origin, result, result);
  };
  return Ray;
});

})();
(function() {
var define = $__System.amdDefine;
define("6b", ["2c", "3b", "23", "1a", "1c", "27", "32", "68", "69", "6a"], function(Cartesian3, Cartographic, defaultValue, defined, DeveloperError, CesiumMath, Matrix3, QuadraticRealPolynomial, QuarticRealPolynomial, Ray) {
  'use strict';
  var IntersectionTests = {};
  IntersectionTests.rayPlane = function(ray, plane, result) {
    if (!defined(ray)) {
      throw new DeveloperError('ray is required.');
    }
    if (!defined(plane)) {
      throw new DeveloperError('plane is required.');
    }
    if (!defined(result)) {
      result = new Cartesian3();
    }
    var origin = ray.origin;
    var direction = ray.direction;
    var normal = plane.normal;
    var denominator = Cartesian3.dot(normal, direction);
    if (Math.abs(denominator) < CesiumMath.EPSILON15) {
      return undefined;
    }
    var t = (-plane.distance - Cartesian3.dot(normal, origin)) / denominator;
    if (t < 0) {
      return undefined;
    }
    result = Cartesian3.multiplyByScalar(direction, t, result);
    return Cartesian3.add(origin, result, result);
  };
  var scratchEdge0 = new Cartesian3();
  var scratchEdge1 = new Cartesian3();
  var scratchPVec = new Cartesian3();
  var scratchTVec = new Cartesian3();
  var scratchQVec = new Cartesian3();
  function rayTriangle(ray, p0, p1, p2, cullBackFaces) {
    if (!defined(ray)) {
      throw new DeveloperError('ray is required.');
    }
    if (!defined(p0)) {
      throw new DeveloperError('p0 is required.');
    }
    if (!defined(p1)) {
      throw new DeveloperError('p1 is required.');
    }
    if (!defined(p2)) {
      throw new DeveloperError('p2 is required.');
    }
    cullBackFaces = defaultValue(cullBackFaces, false);
    var origin = ray.origin;
    var direction = ray.direction;
    var edge0 = Cartesian3.subtract(p1, p0, scratchEdge0);
    var edge1 = Cartesian3.subtract(p2, p0, scratchEdge1);
    var p = Cartesian3.cross(direction, edge1, scratchPVec);
    var det = Cartesian3.dot(edge0, p);
    var tvec;
    var q;
    var u;
    var v;
    var t;
    if (cullBackFaces) {
      if (det < CesiumMath.EPSILON6) {
        return undefined;
      }
      tvec = Cartesian3.subtract(origin, p0, scratchTVec);
      u = Cartesian3.dot(tvec, p);
      if (u < 0.0 || u > det) {
        return undefined;
      }
      q = Cartesian3.cross(tvec, edge0, scratchQVec);
      v = Cartesian3.dot(direction, q);
      if (v < 0.0 || u + v > det) {
        return undefined;
      }
      t = Cartesian3.dot(edge1, q) / det;
    } else {
      if (Math.abs(det) < CesiumMath.EPSILON6) {
        return undefined;
      }
      var invDet = 1.0 / det;
      tvec = Cartesian3.subtract(origin, p0, scratchTVec);
      u = Cartesian3.dot(tvec, p) * invDet;
      if (u < 0.0 || u > 1.0) {
        return undefined;
      }
      q = Cartesian3.cross(tvec, edge0, scratchQVec);
      v = Cartesian3.dot(direction, q) * invDet;
      if (v < 0.0 || u + v > 1.0) {
        return undefined;
      }
      t = Cartesian3.dot(edge1, q) * invDet;
    }
    return t;
  }
  IntersectionTests.rayTriangle = function(ray, p0, p1, p2, cullBackFaces, result) {
    var t = rayTriangle(ray, p0, p1, p2, cullBackFaces);
    if (!defined(t) || t < 0.0) {
      return undefined;
    }
    if (!defined(result)) {
      result = new Cartesian3();
    }
    Cartesian3.multiplyByScalar(ray.direction, t, result);
    return Cartesian3.add(ray.origin, result, result);
  };
  var scratchLineSegmentTriangleRay = new Ray();
  IntersectionTests.lineSegmentTriangle = function(v0, v1, p0, p1, p2, cullBackFaces, result) {
    if (!defined(v0)) {
      throw new DeveloperError('v0 is required.');
    }
    if (!defined(v1)) {
      throw new DeveloperError('v1 is required.');
    }
    var ray = scratchLineSegmentTriangleRay;
    Cartesian3.clone(v0, ray.origin);
    Cartesian3.subtract(v1, v0, ray.direction);
    Cartesian3.normalize(ray.direction, ray.direction);
    var t = rayTriangle(ray, p0, p1, p2, cullBackFaces);
    if (!defined(t) || t < 0.0 || t > Cartesian3.distance(v0, v1)) {
      return undefined;
    }
    if (!defined(result)) {
      result = new Cartesian3();
    }
    Cartesian3.multiplyByScalar(ray.direction, t, result);
    return Cartesian3.add(ray.origin, result, result);
  };
  function solveQuadratic(a, b, c, result) {
    var det = b * b - 4.0 * a * c;
    if (det < 0.0) {
      return undefined;
    } else if (det > 0.0) {
      var denom = 1.0 / (2.0 * a);
      var disc = Math.sqrt(det);
      var root0 = (-b + disc) * denom;
      var root1 = (-b - disc) * denom;
      if (root0 < root1) {
        result.root0 = root0;
        result.root1 = root1;
      } else {
        result.root0 = root1;
        result.root1 = root0;
      }
      return result;
    }
    var root = -b / (2.0 * a);
    if (root === 0.0) {
      return undefined;
    }
    result.root0 = result.root1 = root;
    return result;
  }
  var raySphereRoots = {
    root0: 0.0,
    root1: 0.0
  };
  function raySphere(ray, sphere, result) {
    if (!defined(result)) {
      result = {};
    }
    var origin = ray.origin;
    var direction = ray.direction;
    var center = sphere.center;
    var radiusSquared = sphere.radius * sphere.radius;
    var diff = Cartesian3.subtract(origin, center, scratchPVec);
    var a = Cartesian3.dot(direction, direction);
    var b = 2.0 * Cartesian3.dot(direction, diff);
    var c = Cartesian3.magnitudeSquared(diff) - radiusSquared;
    var roots = solveQuadratic(a, b, c, raySphereRoots);
    if (!defined(roots)) {
      return undefined;
    }
    result.start = roots.root0;
    result.stop = roots.root1;
    return result;
  }
  IntersectionTests.raySphere = function(ray, sphere, result) {
    if (!defined(ray)) {
      throw new DeveloperError('ray is required.');
    }
    if (!defined(sphere)) {
      throw new DeveloperError('sphere is required.');
    }
    result = raySphere(ray, sphere, result);
    if (!defined(result) || result.stop < 0.0) {
      return undefined;
    }
    result.start = Math.max(result.start, 0.0);
    return result;
  };
  var scratchLineSegmentRay = new Ray();
  IntersectionTests.lineSegmentSphere = function(p0, p1, sphere, result) {
    if (!defined(p0)) {
      throw new DeveloperError('p0 is required.');
    }
    if (!defined(p1)) {
      throw new DeveloperError('p1 is required.');
    }
    if (!defined(sphere)) {
      throw new DeveloperError('sphere is required.');
    }
    var ray = scratchLineSegmentRay;
    Cartesian3.clone(p0, ray.origin);
    var direction = Cartesian3.subtract(p1, p0, ray.direction);
    var maxT = Cartesian3.magnitude(direction);
    Cartesian3.normalize(direction, direction);
    result = raySphere(ray, sphere, result);
    if (!defined(result) || result.stop < 0.0 || result.start > maxT) {
      return undefined;
    }
    result.start = Math.max(result.start, 0.0);
    result.stop = Math.min(result.stop, maxT);
    return result;
  };
  var scratchQ = new Cartesian3();
  var scratchW = new Cartesian3();
  IntersectionTests.rayEllipsoid = function(ray, ellipsoid) {
    if (!defined(ray)) {
      throw new DeveloperError('ray is required.');
    }
    if (!defined(ellipsoid)) {
      throw new DeveloperError('ellipsoid is required.');
    }
    var inverseRadii = ellipsoid.oneOverRadii;
    var q = Cartesian3.multiplyComponents(inverseRadii, ray.origin, scratchQ);
    var w = Cartesian3.multiplyComponents(inverseRadii, ray.direction, scratchW);
    var q2 = Cartesian3.magnitudeSquared(q);
    var qw = Cartesian3.dot(q, w);
    var difference,
        w2,
        product,
        discriminant,
        temp;
    if (q2 > 1.0) {
      if (qw >= 0.0) {
        return undefined;
      }
      var qw2 = qw * qw;
      difference = q2 - 1.0;
      w2 = Cartesian3.magnitudeSquared(w);
      product = w2 * difference;
      if (qw2 < product) {
        return undefined;
      } else if (qw2 > product) {
        discriminant = qw * qw - product;
        temp = -qw + Math.sqrt(discriminant);
        var root0 = temp / w2;
        var root1 = difference / temp;
        if (root0 < root1) {
          return {
            start: root0,
            stop: root1
          };
        }
        return {
          start: root1,
          stop: root0
        };
      } else {
        var root = Math.sqrt(difference / w2);
        return {
          start: root,
          stop: root
        };
      }
    } else if (q2 < 1.0) {
      difference = q2 - 1.0;
      w2 = Cartesian3.magnitudeSquared(w);
      product = w2 * difference;
      discriminant = qw * qw - product;
      temp = -qw + Math.sqrt(discriminant);
      return {
        start: 0.0,
        stop: temp / w2
      };
    } else {
      if (qw < 0.0) {
        w2 = Cartesian3.magnitudeSquared(w);
        return {
          start: 0.0,
          stop: -qw / w2
        };
      }
      return undefined;
    }
  };
  function addWithCancellationCheck(left, right, tolerance) {
    var difference = left + right;
    if ((CesiumMath.sign(left) !== CesiumMath.sign(right)) && Math.abs(difference / Math.max(Math.abs(left), Math.abs(right))) < tolerance) {
      return 0.0;
    }
    return difference;
  }
  function quadraticVectorExpression(A, b, c, x, w) {
    var xSquared = x * x;
    var wSquared = w * w;
    var l2 = (A[Matrix3.COLUMN1ROW1] - A[Matrix3.COLUMN2ROW2]) * wSquared;
    var l1 = w * (x * addWithCancellationCheck(A[Matrix3.COLUMN1ROW0], A[Matrix3.COLUMN0ROW1], CesiumMath.EPSILON15) + b.y);
    var l0 = (A[Matrix3.COLUMN0ROW0] * xSquared + A[Matrix3.COLUMN2ROW2] * wSquared) + x * b.x + c;
    var r1 = wSquared * addWithCancellationCheck(A[Matrix3.COLUMN2ROW1], A[Matrix3.COLUMN1ROW2], CesiumMath.EPSILON15);
    var r0 = w * (x * addWithCancellationCheck(A[Matrix3.COLUMN2ROW0], A[Matrix3.COLUMN0ROW2]) + b.z);
    var cosines;
    var solutions = [];
    if (r0 === 0.0 && r1 === 0.0) {
      cosines = QuadraticRealPolynomial.computeRealRoots(l2, l1, l0);
      if (cosines.length === 0) {
        return solutions;
      }
      var cosine0 = cosines[0];
      var sine0 = Math.sqrt(Math.max(1.0 - cosine0 * cosine0, 0.0));
      solutions.push(new Cartesian3(x, w * cosine0, w * -sine0));
      solutions.push(new Cartesian3(x, w * cosine0, w * sine0));
      if (cosines.length === 2) {
        var cosine1 = cosines[1];
        var sine1 = Math.sqrt(Math.max(1.0 - cosine1 * cosine1, 0.0));
        solutions.push(new Cartesian3(x, w * cosine1, w * -sine1));
        solutions.push(new Cartesian3(x, w * cosine1, w * sine1));
      }
      return solutions;
    }
    var r0Squared = r0 * r0;
    var r1Squared = r1 * r1;
    var l2Squared = l2 * l2;
    var r0r1 = r0 * r1;
    var c4 = l2Squared + r1Squared;
    var c3 = 2.0 * (l1 * l2 + r0r1);
    var c2 = 2.0 * l0 * l2 + l1 * l1 - r1Squared + r0Squared;
    var c1 = 2.0 * (l0 * l1 - r0r1);
    var c0 = l0 * l0 - r0Squared;
    if (c4 === 0.0 && c3 === 0.0 && c2 === 0.0 && c1 === 0.0) {
      return solutions;
    }
    cosines = QuarticRealPolynomial.computeRealRoots(c4, c3, c2, c1, c0);
    var length = cosines.length;
    if (length === 0) {
      return solutions;
    }
    for (var i = 0; i < length; ++i) {
      var cosine = cosines[i];
      var cosineSquared = cosine * cosine;
      var sineSquared = Math.max(1.0 - cosineSquared, 0.0);
      var sine = Math.sqrt(sineSquared);
      var left;
      if (CesiumMath.sign(l2) === CesiumMath.sign(l0)) {
        left = addWithCancellationCheck(l2 * cosineSquared + l0, l1 * cosine, CesiumMath.EPSILON12);
      } else if (CesiumMath.sign(l0) === CesiumMath.sign(l1 * cosine)) {
        left = addWithCancellationCheck(l2 * cosineSquared, l1 * cosine + l0, CesiumMath.EPSILON12);
      } else {
        left = addWithCancellationCheck(l2 * cosineSquared + l1 * cosine, l0, CesiumMath.EPSILON12);
      }
      var right = addWithCancellationCheck(r1 * cosine, r0, CesiumMath.EPSILON15);
      var product = left * right;
      if (product < 0.0) {
        solutions.push(new Cartesian3(x, w * cosine, w * sine));
      } else if (product > 0.0) {
        solutions.push(new Cartesian3(x, w * cosine, w * -sine));
      } else if (sine !== 0.0) {
        solutions.push(new Cartesian3(x, w * cosine, w * -sine));
        solutions.push(new Cartesian3(x, w * cosine, w * sine));
        ++i;
      } else {
        solutions.push(new Cartesian3(x, w * cosine, w * sine));
      }
    }
    return solutions;
  }
  var firstAxisScratch = new Cartesian3();
  var secondAxisScratch = new Cartesian3();
  var thirdAxisScratch = new Cartesian3();
  var referenceScratch = new Cartesian3();
  var bCart = new Cartesian3();
  var bScratch = new Matrix3();
  var btScratch = new Matrix3();
  var diScratch = new Matrix3();
  var dScratch = new Matrix3();
  var cScratch = new Matrix3();
  var tempMatrix = new Matrix3();
  var aScratch = new Matrix3();
  var sScratch = new Cartesian3();
  var closestScratch = new Cartesian3();
  var surfPointScratch = new Cartographic();
  IntersectionTests.grazingAltitudeLocation = function(ray, ellipsoid) {
    if (!defined(ray)) {
      throw new DeveloperError('ray is required.');
    }
    if (!defined(ellipsoid)) {
      throw new DeveloperError('ellipsoid is required.');
    }
    var position = ray.origin;
    var direction = ray.direction;
    var normal = ellipsoid.geodeticSurfaceNormal(position, firstAxisScratch);
    if (Cartesian3.dot(direction, normal) >= 0.0) {
      return position;
    }
    var intersects = defined(this.rayEllipsoid(ray, ellipsoid));
    var f = ellipsoid.transformPositionToScaledSpace(direction, firstAxisScratch);
    var firstAxis = Cartesian3.normalize(f, f);
    var reference = Cartesian3.mostOrthogonalAxis(f, referenceScratch);
    var secondAxis = Cartesian3.normalize(Cartesian3.cross(reference, firstAxis, secondAxisScratch), secondAxisScratch);
    var thirdAxis = Cartesian3.normalize(Cartesian3.cross(firstAxis, secondAxis, thirdAxisScratch), thirdAxisScratch);
    var B = bScratch;
    B[0] = firstAxis.x;
    B[1] = firstAxis.y;
    B[2] = firstAxis.z;
    B[3] = secondAxis.x;
    B[4] = secondAxis.y;
    B[5] = secondAxis.z;
    B[6] = thirdAxis.x;
    B[7] = thirdAxis.y;
    B[8] = thirdAxis.z;
    var B_T = Matrix3.transpose(B, btScratch);
    var D_I = Matrix3.fromScale(ellipsoid.radii, diScratch);
    var D = Matrix3.fromScale(ellipsoid.oneOverRadii, dScratch);
    var C = cScratch;
    C[0] = 0.0;
    C[1] = -direction.z;
    C[2] = direction.y;
    C[3] = direction.z;
    C[4] = 0.0;
    C[5] = -direction.x;
    C[6] = -direction.y;
    C[7] = direction.x;
    C[8] = 0.0;
    var temp = Matrix3.multiply(Matrix3.multiply(B_T, D, tempMatrix), C, tempMatrix);
    var A = Matrix3.multiply(Matrix3.multiply(temp, D_I, aScratch), B, aScratch);
    var b = Matrix3.multiplyByVector(temp, position, bCart);
    var solutions = quadraticVectorExpression(A, Cartesian3.negate(b, firstAxisScratch), 0.0, 0.0, 1.0);
    var s;
    var altitude;
    var length = solutions.length;
    if (length > 0) {
      var closest = Cartesian3.clone(Cartesian3.ZERO, closestScratch);
      var maximumValue = Number.NEGATIVE_INFINITY;
      for (var i = 0; i < length; ++i) {
        s = Matrix3.multiplyByVector(D_I, Matrix3.multiplyByVector(B, solutions[i], sScratch), sScratch);
        var v = Cartesian3.normalize(Cartesian3.subtract(s, position, referenceScratch), referenceScratch);
        var dotProduct = Cartesian3.dot(v, direction);
        if (dotProduct > maximumValue) {
          maximumValue = dotProduct;
          closest = Cartesian3.clone(s, closest);
        }
      }
      var surfacePoint = ellipsoid.cartesianToCartographic(closest, surfPointScratch);
      maximumValue = CesiumMath.clamp(maximumValue, 0.0, 1.0);
      altitude = Cartesian3.magnitude(Cartesian3.subtract(closest, position, referenceScratch)) * Math.sqrt(1.0 - maximumValue * maximumValue);
      altitude = intersects ? -altitude : altitude;
      surfacePoint.height = altitude;
      return ellipsoid.cartographicToCartesian(surfacePoint, new Cartesian3());
    }
    return undefined;
  };
  var lineSegmentPlaneDifference = new Cartesian3();
  IntersectionTests.lineSegmentPlane = function(endPoint0, endPoint1, plane, result) {
    if (!defined(endPoint0)) {
      throw new DeveloperError('endPoint0 is required.');
    }
    if (!defined(endPoint1)) {
      throw new DeveloperError('endPoint1 is required.');
    }
    if (!defined(plane)) {
      throw new DeveloperError('plane is required.');
    }
    if (!defined(result)) {
      result = new Cartesian3();
    }
    var difference = Cartesian3.subtract(endPoint1, endPoint0, lineSegmentPlaneDifference);
    var normal = plane.normal;
    var nDotDiff = Cartesian3.dot(normal, difference);
    if (Math.abs(nDotDiff) < CesiumMath.EPSILON6) {
      return undefined;
    }
    var nDotP0 = Cartesian3.dot(normal, endPoint0);
    var t = -(plane.distance + nDotP0) / nDotDiff;
    if (t < 0.0 || t > 1.0) {
      return undefined;
    }
    Cartesian3.multiplyByScalar(difference, t, result);
    Cartesian3.add(endPoint0, result, result);
    return result;
  };
  IntersectionTests.trianglePlaneIntersection = function(p0, p1, p2, plane) {
    if ((!defined(p0)) || (!defined(p1)) || (!defined(p2)) || (!defined(plane))) {
      throw new DeveloperError('p0, p1, p2, and plane are required.');
    }
    var planeNormal = plane.normal;
    var planeD = plane.distance;
    var p0Behind = (Cartesian3.dot(planeNormal, p0) + planeD) < 0.0;
    var p1Behind = (Cartesian3.dot(planeNormal, p1) + planeD) < 0.0;
    var p2Behind = (Cartesian3.dot(planeNormal, p2) + planeD) < 0.0;
    var numBehind = 0;
    numBehind += p0Behind ? 1 : 0;
    numBehind += p1Behind ? 1 : 0;
    numBehind += p2Behind ? 1 : 0;
    var u1,
        u2;
    if (numBehind === 1 || numBehind === 2) {
      u1 = new Cartesian3();
      u2 = new Cartesian3();
    }
    if (numBehind === 1) {
      if (p0Behind) {
        IntersectionTests.lineSegmentPlane(p0, p1, plane, u1);
        IntersectionTests.lineSegmentPlane(p0, p2, plane, u2);
        return {
          positions: [p0, p1, p2, u1, u2],
          indices: [0, 3, 4, 1, 2, 4, 1, 4, 3]
        };
      } else if (p1Behind) {
        IntersectionTests.lineSegmentPlane(p1, p2, plane, u1);
        IntersectionTests.lineSegmentPlane(p1, p0, plane, u2);
        return {
          positions: [p0, p1, p2, u1, u2],
          indices: [1, 3, 4, 2, 0, 4, 2, 4, 3]
        };
      } else if (p2Behind) {
        IntersectionTests.lineSegmentPlane(p2, p0, plane, u1);
        IntersectionTests.lineSegmentPlane(p2, p1, plane, u2);
        return {
          positions: [p0, p1, p2, u1, u2],
          indices: [2, 3, 4, 0, 1, 4, 0, 4, 3]
        };
      }
    } else if (numBehind === 2) {
      if (!p0Behind) {
        IntersectionTests.lineSegmentPlane(p1, p0, plane, u1);
        IntersectionTests.lineSegmentPlane(p2, p0, plane, u2);
        return {
          positions: [p0, p1, p2, u1, u2],
          indices: [1, 2, 4, 1, 4, 3, 0, 3, 4]
        };
      } else if (!p1Behind) {
        IntersectionTests.lineSegmentPlane(p2, p1, plane, u1);
        IntersectionTests.lineSegmentPlane(p0, p1, plane, u2);
        return {
          positions: [p0, p1, p2, u1, u2],
          indices: [2, 0, 4, 2, 4, 3, 1, 3, 4]
        };
      } else if (!p2Behind) {
        IntersectionTests.lineSegmentPlane(p0, p2, plane, u1);
        IntersectionTests.lineSegmentPlane(p1, p2, plane, u2);
        return {
          positions: [p0, p1, p2, u1, u2],
          indices: [0, 1, 4, 0, 4, 3, 2, 3, 4]
        };
      }
    }
    return undefined;
  };
  return IntersectionTests;
});

})();
(function() {
var define = $__System.amdDefine;
define("6c", ["1a"], function(defined) {
  'use strict';
  var isArray = Array.isArray;
  if (!defined(isArray)) {
    isArray = function(value) {
      return Object.prototype.toString.call(value) === '[object Array]';
    };
  }
  return isArray;
});

})();
(function() {
var define = $__System.amdDefine;
define("43", ["23", "1a", "1c", "1f", "27"], function(defaultValue, defined, DeveloperError, freezeObject, CesiumMath) {
  'use strict';
  function Cartesian4(x, y, z, w) {
    this.x = defaultValue(x, 0.0);
    this.y = defaultValue(y, 0.0);
    this.z = defaultValue(z, 0.0);
    this.w = defaultValue(w, 0.0);
  }
  Cartesian4.fromElements = function(x, y, z, w, result) {
    if (!defined(result)) {
      return new Cartesian4(x, y, z, w);
    }
    result.x = x;
    result.y = y;
    result.z = z;
    result.w = w;
    return result;
  };
  Cartesian4.fromColor = function(color, result) {
    if (!defined(color)) {
      throw new DeveloperError('color is required');
    }
    if (!defined(result)) {
      return new Cartesian4(color.red, color.green, color.blue, color.alpha);
    }
    result.x = color.red;
    result.y = color.green;
    result.z = color.blue;
    result.w = color.alpha;
    return result;
  };
  Cartesian4.clone = function(cartesian, result) {
    if (!defined(cartesian)) {
      return undefined;
    }
    if (!defined(result)) {
      return new Cartesian4(cartesian.x, cartesian.y, cartesian.z, cartesian.w);
    }
    result.x = cartesian.x;
    result.y = cartesian.y;
    result.z = cartesian.z;
    result.w = cartesian.w;
    return result;
  };
  Cartesian4.packedLength = 4;
  Cartesian4.pack = function(value, array, startingIndex) {
    if (!defined(value)) {
      throw new DeveloperError('value is required');
    }
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    startingIndex = defaultValue(startingIndex, 0);
    array[startingIndex++] = value.x;
    array[startingIndex++] = value.y;
    array[startingIndex++] = value.z;
    array[startingIndex] = value.w;
  };
  Cartesian4.unpack = function(array, startingIndex, result) {
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    startingIndex = defaultValue(startingIndex, 0);
    if (!defined(result)) {
      result = new Cartesian4();
    }
    result.x = array[startingIndex++];
    result.y = array[startingIndex++];
    result.z = array[startingIndex++];
    result.w = array[startingIndex];
    return result;
  };
  Cartesian4.packArray = function(array, result) {
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    var length = array.length;
    if (!defined(result)) {
      result = new Array(length * 4);
    } else {
      result.length = length * 4;
    }
    for (var i = 0; i < length; ++i) {
      Cartesian4.pack(array[i], result, i * 4);
    }
    return result;
  };
  Cartesian4.unpackArray = function(array, result) {
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    var length = array.length;
    if (!defined(result)) {
      result = new Array(length / 4);
    } else {
      result.length = length / 4;
    }
    for (var i = 0; i < length; i += 4) {
      var index = i / 4;
      result[index] = Cartesian4.unpack(array, i, result[index]);
    }
    return result;
  };
  Cartesian4.fromArray = Cartesian4.unpack;
  Cartesian4.maximumComponent = function(cartesian) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    return Math.max(cartesian.x, cartesian.y, cartesian.z, cartesian.w);
  };
  Cartesian4.minimumComponent = function(cartesian) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    return Math.min(cartesian.x, cartesian.y, cartesian.z, cartesian.w);
  };
  Cartesian4.minimumByComponent = function(first, second, result) {
    if (!defined(first)) {
      throw new DeveloperError('first is required.');
    }
    if (!defined(second)) {
      throw new DeveloperError('second is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    result.x = Math.min(first.x, second.x);
    result.y = Math.min(first.y, second.y);
    result.z = Math.min(first.z, second.z);
    result.w = Math.min(first.w, second.w);
    return result;
  };
  Cartesian4.maximumByComponent = function(first, second, result) {
    if (!defined(first)) {
      throw new DeveloperError('first is required.');
    }
    if (!defined(second)) {
      throw new DeveloperError('second is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    result.x = Math.max(first.x, second.x);
    result.y = Math.max(first.y, second.y);
    result.z = Math.max(first.z, second.z);
    result.w = Math.max(first.w, second.w);
    return result;
  };
  Cartesian4.magnitudeSquared = function(cartesian) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    return cartesian.x * cartesian.x + cartesian.y * cartesian.y + cartesian.z * cartesian.z + cartesian.w * cartesian.w;
  };
  Cartesian4.magnitude = function(cartesian) {
    return Math.sqrt(Cartesian4.magnitudeSquared(cartesian));
  };
  var distanceScratch = new Cartesian4();
  Cartesian4.distance = function(left, right) {
    if (!defined(left) || !defined(right)) {
      throw new DeveloperError('left and right are required.');
    }
    Cartesian4.subtract(left, right, distanceScratch);
    return Cartesian4.magnitude(distanceScratch);
  };
  Cartesian4.distanceSquared = function(left, right) {
    if (!defined(left) || !defined(right)) {
      throw new DeveloperError('left and right are required.');
    }
    Cartesian4.subtract(left, right, distanceScratch);
    return Cartesian4.magnitudeSquared(distanceScratch);
  };
  Cartesian4.normalize = function(cartesian, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var magnitude = Cartesian4.magnitude(cartesian);
    result.x = cartesian.x / magnitude;
    result.y = cartesian.y / magnitude;
    result.z = cartesian.z / magnitude;
    result.w = cartesian.w / magnitude;
    return result;
  };
  Cartesian4.dot = function(left, right) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    return left.x * right.x + left.y * right.y + left.z * right.z + left.w * right.w;
  };
  Cartesian4.multiplyComponents = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = left.x * right.x;
    result.y = left.y * right.y;
    result.z = left.z * right.z;
    result.w = left.w * right.w;
    return result;
  };
  Cartesian4.add = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = left.x + right.x;
    result.y = left.y + right.y;
    result.z = left.z + right.z;
    result.w = left.w + right.w;
    return result;
  };
  Cartesian4.subtract = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = left.x - right.x;
    result.y = left.y - right.y;
    result.z = left.z - right.z;
    result.w = left.w - right.w;
    return result;
  };
  Cartesian4.multiplyByScalar = function(cartesian, scalar, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (typeof scalar !== 'number') {
      throw new DeveloperError('scalar is required and must be a number.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = cartesian.x * scalar;
    result.y = cartesian.y * scalar;
    result.z = cartesian.z * scalar;
    result.w = cartesian.w * scalar;
    return result;
  };
  Cartesian4.divideByScalar = function(cartesian, scalar, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (typeof scalar !== 'number') {
      throw new DeveloperError('scalar is required and must be a number.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = cartesian.x / scalar;
    result.y = cartesian.y / scalar;
    result.z = cartesian.z / scalar;
    result.w = cartesian.w / scalar;
    return result;
  };
  Cartesian4.negate = function(cartesian, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = -cartesian.x;
    result.y = -cartesian.y;
    result.z = -cartesian.z;
    result.w = -cartesian.w;
    return result;
  };
  Cartesian4.abs = function(cartesian, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = Math.abs(cartesian.x);
    result.y = Math.abs(cartesian.y);
    result.z = Math.abs(cartesian.z);
    result.w = Math.abs(cartesian.w);
    return result;
  };
  var lerpScratch = new Cartesian4();
  Cartesian4.lerp = function(start, end, t, result) {
    if (!defined(start)) {
      throw new DeveloperError('start is required.');
    }
    if (!defined(end)) {
      throw new DeveloperError('end is required.');
    }
    if (typeof t !== 'number') {
      throw new DeveloperError('t is required and must be a number.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    Cartesian4.multiplyByScalar(end, t, lerpScratch);
    result = Cartesian4.multiplyByScalar(start, 1.0 - t, result);
    return Cartesian4.add(lerpScratch, result, result);
  };
  var mostOrthogonalAxisScratch = new Cartesian4();
  Cartesian4.mostOrthogonalAxis = function(cartesian, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    var f = Cartesian4.normalize(cartesian, mostOrthogonalAxisScratch);
    Cartesian4.abs(f, f);
    if (f.x <= f.y) {
      if (f.x <= f.z) {
        if (f.x <= f.w) {
          result = Cartesian4.clone(Cartesian4.UNIT_X, result);
        } else {
          result = Cartesian4.clone(Cartesian4.UNIT_W, result);
        }
      } else if (f.z <= f.w) {
        result = Cartesian4.clone(Cartesian4.UNIT_Z, result);
      } else {
        result = Cartesian4.clone(Cartesian4.UNIT_W, result);
      }
    } else if (f.y <= f.z) {
      if (f.y <= f.w) {
        result = Cartesian4.clone(Cartesian4.UNIT_Y, result);
      } else {
        result = Cartesian4.clone(Cartesian4.UNIT_W, result);
      }
    } else if (f.z <= f.w) {
      result = Cartesian4.clone(Cartesian4.UNIT_Z, result);
    } else {
      result = Cartesian4.clone(Cartesian4.UNIT_W, result);
    }
    return result;
  };
  Cartesian4.equals = function(left, right) {
    return (left === right) || ((defined(left)) && (defined(right)) && (left.x === right.x) && (left.y === right.y) && (left.z === right.z) && (left.w === right.w));
  };
  Cartesian4.equalsArray = function(cartesian, array, offset) {
    return cartesian.x === array[offset] && cartesian.y === array[offset + 1] && cartesian.z === array[offset + 2] && cartesian.w === array[offset + 3];
  };
  Cartesian4.equalsEpsilon = function(left, right, relativeEpsilon, absoluteEpsilon) {
    return (left === right) || (defined(left) && defined(right) && CesiumMath.equalsEpsilon(left.x, right.x, relativeEpsilon, absoluteEpsilon) && CesiumMath.equalsEpsilon(left.y, right.y, relativeEpsilon, absoluteEpsilon) && CesiumMath.equalsEpsilon(left.z, right.z, relativeEpsilon, absoluteEpsilon) && CesiumMath.equalsEpsilon(left.w, right.w, relativeEpsilon, absoluteEpsilon));
  };
  Cartesian4.ZERO = freezeObject(new Cartesian4(0.0, 0.0, 0.0, 0.0));
  Cartesian4.UNIT_X = freezeObject(new Cartesian4(1.0, 0.0, 0.0, 0.0));
  Cartesian4.UNIT_Y = freezeObject(new Cartesian4(0.0, 1.0, 0.0, 0.0));
  Cartesian4.UNIT_Z = freezeObject(new Cartesian4(0.0, 0.0, 1.0, 0.0));
  Cartesian4.UNIT_W = freezeObject(new Cartesian4(0.0, 0.0, 0.0, 1.0));
  Cartesian4.prototype.clone = function(result) {
    return Cartesian4.clone(this, result);
  };
  Cartesian4.prototype.equals = function(right) {
    return Cartesian4.equals(this, right);
  };
  Cartesian4.prototype.equalsEpsilon = function(right, relativeEpsilon, absoluteEpsilon) {
    return Cartesian4.equalsEpsilon(this, right, relativeEpsilon, absoluteEpsilon);
  };
  Cartesian4.prototype.toString = function() {
    return '(' + this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w + ')';
  };
  return Cartesian4;
});

})();
(function() {
var define = $__System.amdDefine;
define("1b", ["1a"], function(defined) {
  'use strict';
  var definePropertyWorks = (function() {
    try {
      return 'x' in Object.defineProperty({}, 'x', {});
    } catch (e) {
      return false;
    }
  })();
  var defineProperties = Object.defineProperties;
  if (!definePropertyWorks || !defined(defineProperties)) {
    defineProperties = function(o) {
      return o;
    };
  }
  return defineProperties;
});

})();
(function() {
var define = $__System.amdDefine;
define("32", ["2c", "23", "1a", "1b", "1c", "1f", "27"], function(Cartesian3, defaultValue, defined, defineProperties, DeveloperError, freezeObject, CesiumMath) {
  'use strict';
  function Matrix3(column0Row0, column1Row0, column2Row0, column0Row1, column1Row1, column2Row1, column0Row2, column1Row2, column2Row2) {
    this[0] = defaultValue(column0Row0, 0.0);
    this[1] = defaultValue(column0Row1, 0.0);
    this[2] = defaultValue(column0Row2, 0.0);
    this[3] = defaultValue(column1Row0, 0.0);
    this[4] = defaultValue(column1Row1, 0.0);
    this[5] = defaultValue(column1Row2, 0.0);
    this[6] = defaultValue(column2Row0, 0.0);
    this[7] = defaultValue(column2Row1, 0.0);
    this[8] = defaultValue(column2Row2, 0.0);
  }
  Matrix3.packedLength = 9;
  Matrix3.pack = function(value, array, startingIndex) {
    if (!defined(value)) {
      throw new DeveloperError('value is required');
    }
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    startingIndex = defaultValue(startingIndex, 0);
    array[startingIndex++] = value[0];
    array[startingIndex++] = value[1];
    array[startingIndex++] = value[2];
    array[startingIndex++] = value[3];
    array[startingIndex++] = value[4];
    array[startingIndex++] = value[5];
    array[startingIndex++] = value[6];
    array[startingIndex++] = value[7];
    array[startingIndex++] = value[8];
  };
  Matrix3.unpack = function(array, startingIndex, result) {
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    startingIndex = defaultValue(startingIndex, 0);
    if (!defined(result)) {
      result = new Matrix3();
    }
    result[0] = array[startingIndex++];
    result[1] = array[startingIndex++];
    result[2] = array[startingIndex++];
    result[3] = array[startingIndex++];
    result[4] = array[startingIndex++];
    result[5] = array[startingIndex++];
    result[6] = array[startingIndex++];
    result[7] = array[startingIndex++];
    result[8] = array[startingIndex++];
    return result;
  };
  Matrix3.clone = function(values, result) {
    if (!defined(values)) {
      return undefined;
    }
    if (!defined(result)) {
      return new Matrix3(values[0], values[3], values[6], values[1], values[4], values[7], values[2], values[5], values[8]);
    }
    result[0] = values[0];
    result[1] = values[1];
    result[2] = values[2];
    result[3] = values[3];
    result[4] = values[4];
    result[5] = values[5];
    result[6] = values[6];
    result[7] = values[7];
    result[8] = values[8];
    return result;
  };
  Matrix3.fromArray = function(array, startingIndex, result) {
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    startingIndex = defaultValue(startingIndex, 0);
    if (!defined(result)) {
      result = new Matrix3();
    }
    result[0] = array[startingIndex];
    result[1] = array[startingIndex + 1];
    result[2] = array[startingIndex + 2];
    result[3] = array[startingIndex + 3];
    result[4] = array[startingIndex + 4];
    result[5] = array[startingIndex + 5];
    result[6] = array[startingIndex + 6];
    result[7] = array[startingIndex + 7];
    result[8] = array[startingIndex + 8];
    return result;
  };
  Matrix3.fromColumnMajorArray = function(values, result) {
    if (!defined(values)) {
      throw new DeveloperError('values parameter is required');
    }
    return Matrix3.clone(values, result);
  };
  Matrix3.fromRowMajorArray = function(values, result) {
    if (!defined(values)) {
      throw new DeveloperError('values is required.');
    }
    if (!defined(result)) {
      return new Matrix3(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8]);
    }
    result[0] = values[0];
    result[1] = values[3];
    result[2] = values[6];
    result[3] = values[1];
    result[4] = values[4];
    result[5] = values[7];
    result[6] = values[2];
    result[7] = values[5];
    result[8] = values[8];
    return result;
  };
  Matrix3.fromQuaternion = function(quaternion, result) {
    if (!defined(quaternion)) {
      throw new DeveloperError('quaternion is required');
    }
    var x2 = quaternion.x * quaternion.x;
    var xy = quaternion.x * quaternion.y;
    var xz = quaternion.x * quaternion.z;
    var xw = quaternion.x * quaternion.w;
    var y2 = quaternion.y * quaternion.y;
    var yz = quaternion.y * quaternion.z;
    var yw = quaternion.y * quaternion.w;
    var z2 = quaternion.z * quaternion.z;
    var zw = quaternion.z * quaternion.w;
    var w2 = quaternion.w * quaternion.w;
    var m00 = x2 - y2 - z2 + w2;
    var m01 = 2.0 * (xy - zw);
    var m02 = 2.0 * (xz + yw);
    var m10 = 2.0 * (xy + zw);
    var m11 = -x2 + y2 - z2 + w2;
    var m12 = 2.0 * (yz - xw);
    var m20 = 2.0 * (xz - yw);
    var m21 = 2.0 * (yz + xw);
    var m22 = -x2 - y2 + z2 + w2;
    if (!defined(result)) {
      return new Matrix3(m00, m01, m02, m10, m11, m12, m20, m21, m22);
    }
    result[0] = m00;
    result[1] = m10;
    result[2] = m20;
    result[3] = m01;
    result[4] = m11;
    result[5] = m21;
    result[6] = m02;
    result[7] = m12;
    result[8] = m22;
    return result;
  };
  Matrix3.fromScale = function(scale, result) {
    if (!defined(scale)) {
      throw new DeveloperError('scale is required.');
    }
    if (!defined(result)) {
      return new Matrix3(scale.x, 0.0, 0.0, 0.0, scale.y, 0.0, 0.0, 0.0, scale.z);
    }
    result[0] = scale.x;
    result[1] = 0.0;
    result[2] = 0.0;
    result[3] = 0.0;
    result[4] = scale.y;
    result[5] = 0.0;
    result[6] = 0.0;
    result[7] = 0.0;
    result[8] = scale.z;
    return result;
  };
  Matrix3.fromUniformScale = function(scale, result) {
    if (typeof scale !== 'number') {
      throw new DeveloperError('scale is required.');
    }
    if (!defined(result)) {
      return new Matrix3(scale, 0.0, 0.0, 0.0, scale, 0.0, 0.0, 0.0, scale);
    }
    result[0] = scale;
    result[1] = 0.0;
    result[2] = 0.0;
    result[3] = 0.0;
    result[4] = scale;
    result[5] = 0.0;
    result[6] = 0.0;
    result[7] = 0.0;
    result[8] = scale;
    return result;
  };
  Matrix3.fromCrossProduct = function(vector, result) {
    if (!defined(vector)) {
      throw new DeveloperError('vector is required.');
    }
    if (!defined(result)) {
      return new Matrix3(0.0, -vector.z, vector.y, vector.z, 0.0, -vector.x, -vector.y, vector.x, 0.0);
    }
    result[0] = 0.0;
    result[1] = vector.z;
    result[2] = -vector.y;
    result[3] = -vector.z;
    result[4] = 0.0;
    result[5] = vector.x;
    result[6] = vector.y;
    result[7] = -vector.x;
    result[8] = 0.0;
    return result;
  };
  Matrix3.fromRotationX = function(angle, result) {
    if (!defined(angle)) {
      throw new DeveloperError('angle is required.');
    }
    var cosAngle = Math.cos(angle);
    var sinAngle = Math.sin(angle);
    if (!defined(result)) {
      return new Matrix3(1.0, 0.0, 0.0, 0.0, cosAngle, -sinAngle, 0.0, sinAngle, cosAngle);
    }
    result[0] = 1.0;
    result[1] = 0.0;
    result[2] = 0.0;
    result[3] = 0.0;
    result[4] = cosAngle;
    result[5] = sinAngle;
    result[6] = 0.0;
    result[7] = -sinAngle;
    result[8] = cosAngle;
    return result;
  };
  Matrix3.fromRotationY = function(angle, result) {
    if (!defined(angle)) {
      throw new DeveloperError('angle is required.');
    }
    var cosAngle = Math.cos(angle);
    var sinAngle = Math.sin(angle);
    if (!defined(result)) {
      return new Matrix3(cosAngle, 0.0, sinAngle, 0.0, 1.0, 0.0, -sinAngle, 0.0, cosAngle);
    }
    result[0] = cosAngle;
    result[1] = 0.0;
    result[2] = -sinAngle;
    result[3] = 0.0;
    result[4] = 1.0;
    result[5] = 0.0;
    result[6] = sinAngle;
    result[7] = 0.0;
    result[8] = cosAngle;
    return result;
  };
  Matrix3.fromRotationZ = function(angle, result) {
    if (!defined(angle)) {
      throw new DeveloperError('angle is required.');
    }
    var cosAngle = Math.cos(angle);
    var sinAngle = Math.sin(angle);
    if (!defined(result)) {
      return new Matrix3(cosAngle, -sinAngle, 0.0, sinAngle, cosAngle, 0.0, 0.0, 0.0, 1.0);
    }
    result[0] = cosAngle;
    result[1] = sinAngle;
    result[2] = 0.0;
    result[3] = -sinAngle;
    result[4] = cosAngle;
    result[5] = 0.0;
    result[6] = 0.0;
    result[7] = 0.0;
    result[8] = 1.0;
    return result;
  };
  Matrix3.toArray = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(result)) {
      return [matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5], matrix[6], matrix[7], matrix[8]];
    }
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    result[4] = matrix[4];
    result[5] = matrix[5];
    result[6] = matrix[6];
    result[7] = matrix[7];
    result[8] = matrix[8];
    return result;
  };
  Matrix3.getElementIndex = function(column, row) {
    if (typeof row !== 'number' || row < 0 || row > 2) {
      throw new DeveloperError('row must be 0, 1, or 2.');
    }
    if (typeof column !== 'number' || column < 0 || column > 2) {
      throw new DeveloperError('column must be 0, 1, or 2.');
    }
    return column * 3 + row;
  };
  Matrix3.getColumn = function(matrix, index, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required.');
    }
    if (typeof index !== 'number' || index < 0 || index > 2) {
      throw new DeveloperError('index must be 0, 1, or 2.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var startIndex = index * 3;
    var x = matrix[startIndex];
    var y = matrix[startIndex + 1];
    var z = matrix[startIndex + 2];
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  };
  Matrix3.setColumn = function(matrix, index, cartesian, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (typeof index !== 'number' || index < 0 || index > 2) {
      throw new DeveloperError('index must be 0, 1, or 2.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result = Matrix3.clone(matrix, result);
    var startIndex = index * 3;
    result[startIndex] = cartesian.x;
    result[startIndex + 1] = cartesian.y;
    result[startIndex + 2] = cartesian.z;
    return result;
  };
  Matrix3.getRow = function(matrix, index, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required.');
    }
    if (typeof index !== 'number' || index < 0 || index > 2) {
      throw new DeveloperError('index must be 0, 1, or 2.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var x = matrix[index];
    var y = matrix[index + 3];
    var z = matrix[index + 6];
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  };
  Matrix3.setRow = function(matrix, index, cartesian, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (typeof index !== 'number' || index < 0 || index > 2) {
      throw new DeveloperError('index must be 0, 1, or 2.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result = Matrix3.clone(matrix, result);
    result[index] = cartesian.x;
    result[index + 3] = cartesian.y;
    result[index + 6] = cartesian.z;
    return result;
  };
  var scratchColumn = new Cartesian3();
  Matrix3.getScale = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = Cartesian3.magnitude(Cartesian3.fromElements(matrix[0], matrix[1], matrix[2], scratchColumn));
    result.y = Cartesian3.magnitude(Cartesian3.fromElements(matrix[3], matrix[4], matrix[5], scratchColumn));
    result.z = Cartesian3.magnitude(Cartesian3.fromElements(matrix[6], matrix[7], matrix[8], scratchColumn));
    return result;
  };
  var scratchScale = new Cartesian3();
  Matrix3.getMaximumScale = function(matrix) {
    Matrix3.getScale(matrix, scratchScale);
    return Cartesian3.maximumComponent(scratchScale);
  };
  Matrix3.multiply = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var column0Row0 = left[0] * right[0] + left[3] * right[1] + left[6] * right[2];
    var column0Row1 = left[1] * right[0] + left[4] * right[1] + left[7] * right[2];
    var column0Row2 = left[2] * right[0] + left[5] * right[1] + left[8] * right[2];
    var column1Row0 = left[0] * right[3] + left[3] * right[4] + left[6] * right[5];
    var column1Row1 = left[1] * right[3] + left[4] * right[4] + left[7] * right[5];
    var column1Row2 = left[2] * right[3] + left[5] * right[4] + left[8] * right[5];
    var column2Row0 = left[0] * right[6] + left[3] * right[7] + left[6] * right[8];
    var column2Row1 = left[1] * right[6] + left[4] * right[7] + left[7] * right[8];
    var column2Row2 = left[2] * right[6] + left[5] * right[7] + left[8] * right[8];
    result[0] = column0Row0;
    result[1] = column0Row1;
    result[2] = column0Row2;
    result[3] = column1Row0;
    result[4] = column1Row1;
    result[5] = column1Row2;
    result[6] = column2Row0;
    result[7] = column2Row1;
    result[8] = column2Row2;
    return result;
  };
  Matrix3.add = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result[0] = left[0] + right[0];
    result[1] = left[1] + right[1];
    result[2] = left[2] + right[2];
    result[3] = left[3] + right[3];
    result[4] = left[4] + right[4];
    result[5] = left[5] + right[5];
    result[6] = left[6] + right[6];
    result[7] = left[7] + right[7];
    result[8] = left[8] + right[8];
    return result;
  };
  Matrix3.subtract = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result[0] = left[0] - right[0];
    result[1] = left[1] - right[1];
    result[2] = left[2] - right[2];
    result[3] = left[3] - right[3];
    result[4] = left[4] - right[4];
    result[5] = left[5] - right[5];
    result[6] = left[6] - right[6];
    result[7] = left[7] - right[7];
    result[8] = left[8] - right[8];
    return result;
  };
  Matrix3.multiplyByVector = function(matrix, cartesian, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var vX = cartesian.x;
    var vY = cartesian.y;
    var vZ = cartesian.z;
    var x = matrix[0] * vX + matrix[3] * vY + matrix[6] * vZ;
    var y = matrix[1] * vX + matrix[4] * vY + matrix[7] * vZ;
    var z = matrix[2] * vX + matrix[5] * vY + matrix[8] * vZ;
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  };
  Matrix3.multiplyByScalar = function(matrix, scalar, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (typeof scalar !== 'number') {
      throw new DeveloperError('scalar must be a number');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result[0] = matrix[0] * scalar;
    result[1] = matrix[1] * scalar;
    result[2] = matrix[2] * scalar;
    result[3] = matrix[3] * scalar;
    result[4] = matrix[4] * scalar;
    result[5] = matrix[5] * scalar;
    result[6] = matrix[6] * scalar;
    result[7] = matrix[7] * scalar;
    result[8] = matrix[8] * scalar;
    return result;
  };
  Matrix3.multiplyByScale = function(matrix, scale, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(scale)) {
      throw new DeveloperError('scale is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result[0] = matrix[0] * scale.x;
    result[1] = matrix[1] * scale.x;
    result[2] = matrix[2] * scale.x;
    result[3] = matrix[3] * scale.y;
    result[4] = matrix[4] * scale.y;
    result[5] = matrix[5] * scale.y;
    result[6] = matrix[6] * scale.z;
    result[7] = matrix[7] * scale.z;
    result[8] = matrix[8] * scale.z;
    return result;
  };
  Matrix3.negate = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result[0] = -matrix[0];
    result[1] = -matrix[1];
    result[2] = -matrix[2];
    result[3] = -matrix[3];
    result[4] = -matrix[4];
    result[5] = -matrix[5];
    result[6] = -matrix[6];
    result[7] = -matrix[7];
    result[8] = -matrix[8];
    return result;
  };
  Matrix3.transpose = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var column0Row0 = matrix[0];
    var column0Row1 = matrix[3];
    var column0Row2 = matrix[6];
    var column1Row0 = matrix[1];
    var column1Row1 = matrix[4];
    var column1Row2 = matrix[7];
    var column2Row0 = matrix[2];
    var column2Row1 = matrix[5];
    var column2Row2 = matrix[8];
    result[0] = column0Row0;
    result[1] = column0Row1;
    result[2] = column0Row2;
    result[3] = column1Row0;
    result[4] = column1Row1;
    result[5] = column1Row2;
    result[6] = column2Row0;
    result[7] = column2Row1;
    result[8] = column2Row2;
    return result;
  };
  function computeFrobeniusNorm(matrix) {
    var norm = 0.0;
    for (var i = 0; i < 9; ++i) {
      var temp = matrix[i];
      norm += temp * temp;
    }
    return Math.sqrt(norm);
  }
  var rowVal = [1, 0, 0];
  var colVal = [2, 2, 1];
  function offDiagonalFrobeniusNorm(matrix) {
    var norm = 0.0;
    for (var i = 0; i < 3; ++i) {
      var temp = matrix[Matrix3.getElementIndex(colVal[i], rowVal[i])];
      norm += 2.0 * temp * temp;
    }
    return Math.sqrt(norm);
  }
  function shurDecomposition(matrix, result) {
    var tolerance = CesiumMath.EPSILON15;
    var maxDiagonal = 0.0;
    var rotAxis = 1;
    for (var i = 0; i < 3; ++i) {
      var temp = Math.abs(matrix[Matrix3.getElementIndex(colVal[i], rowVal[i])]);
      if (temp > maxDiagonal) {
        rotAxis = i;
        maxDiagonal = temp;
      }
    }
    var c = 1.0;
    var s = 0.0;
    var p = rowVal[rotAxis];
    var q = colVal[rotAxis];
    if (Math.abs(matrix[Matrix3.getElementIndex(q, p)]) > tolerance) {
      var qq = matrix[Matrix3.getElementIndex(q, q)];
      var pp = matrix[Matrix3.getElementIndex(p, p)];
      var qp = matrix[Matrix3.getElementIndex(q, p)];
      var tau = (qq - pp) / 2.0 / qp;
      var t;
      if (tau < 0.0) {
        t = -1.0 / (-tau + Math.sqrt(1.0 + tau * tau));
      } else {
        t = 1.0 / (tau + Math.sqrt(1.0 + tau * tau));
      }
      c = 1.0 / Math.sqrt(1.0 + t * t);
      s = t * c;
    }
    result = Matrix3.clone(Matrix3.IDENTITY, result);
    result[Matrix3.getElementIndex(p, p)] = result[Matrix3.getElementIndex(q, q)] = c;
    result[Matrix3.getElementIndex(q, p)] = s;
    result[Matrix3.getElementIndex(p, q)] = -s;
    return result;
  }
  var jMatrix = new Matrix3();
  var jMatrixTranspose = new Matrix3();
  Matrix3.computeEigenDecomposition = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required.');
    }
    var tolerance = CesiumMath.EPSILON20;
    var maxSweeps = 10;
    var count = 0;
    var sweep = 0;
    if (!defined(result)) {
      result = {};
    }
    var unitaryMatrix = result.unitary = Matrix3.clone(Matrix3.IDENTITY, result.unitary);
    var diagMatrix = result.diagonal = Matrix3.clone(matrix, result.diagonal);
    var epsilon = tolerance * computeFrobeniusNorm(diagMatrix);
    while (sweep < maxSweeps && offDiagonalFrobeniusNorm(diagMatrix) > epsilon) {
      shurDecomposition(diagMatrix, jMatrix);
      Matrix3.transpose(jMatrix, jMatrixTranspose);
      Matrix3.multiply(diagMatrix, jMatrix, diagMatrix);
      Matrix3.multiply(jMatrixTranspose, diagMatrix, diagMatrix);
      Matrix3.multiply(unitaryMatrix, jMatrix, unitaryMatrix);
      if (++count > 2) {
        ++sweep;
        count = 0;
      }
    }
    return result;
  };
  Matrix3.abs = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result[0] = Math.abs(matrix[0]);
    result[1] = Math.abs(matrix[1]);
    result[2] = Math.abs(matrix[2]);
    result[3] = Math.abs(matrix[3]);
    result[4] = Math.abs(matrix[4]);
    result[5] = Math.abs(matrix[5]);
    result[6] = Math.abs(matrix[6]);
    result[7] = Math.abs(matrix[7]);
    result[8] = Math.abs(matrix[8]);
    return result;
  };
  Matrix3.determinant = function(matrix) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    var m11 = matrix[0];
    var m21 = matrix[3];
    var m31 = matrix[6];
    var m12 = matrix[1];
    var m22 = matrix[4];
    var m32 = matrix[7];
    var m13 = matrix[2];
    var m23 = matrix[5];
    var m33 = matrix[8];
    return m11 * (m22 * m33 - m23 * m32) + m12 * (m23 * m31 - m21 * m33) + m13 * (m21 * m32 - m22 * m31);
  };
  Matrix3.inverse = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var m11 = matrix[0];
    var m21 = matrix[1];
    var m31 = matrix[2];
    var m12 = matrix[3];
    var m22 = matrix[4];
    var m32 = matrix[5];
    var m13 = matrix[6];
    var m23 = matrix[7];
    var m33 = matrix[8];
    var determinant = Matrix3.determinant(matrix);
    if (Math.abs(determinant) <= CesiumMath.EPSILON15) {
      throw new DeveloperError('matrix is not invertible');
    }
    result[0] = m22 * m33 - m23 * m32;
    result[1] = m23 * m31 - m21 * m33;
    result[2] = m21 * m32 - m22 * m31;
    result[3] = m13 * m32 - m12 * m33;
    result[4] = m11 * m33 - m13 * m31;
    result[5] = m12 * m31 - m11 * m32;
    result[6] = m12 * m23 - m13 * m22;
    result[7] = m13 * m21 - m11 * m23;
    result[8] = m11 * m22 - m12 * m21;
    var scale = 1.0 / determinant;
    return Matrix3.multiplyByScalar(result, scale, result);
  };
  Matrix3.equals = function(left, right) {
    return (left === right) || (defined(left) && defined(right) && left[0] === right[0] && left[1] === right[1] && left[2] === right[2] && left[3] === right[3] && left[4] === right[4] && left[5] === right[5] && left[6] === right[6] && left[7] === right[7] && left[8] === right[8]);
  };
  Matrix3.equalsEpsilon = function(left, right, epsilon) {
    if (typeof epsilon !== 'number') {
      throw new DeveloperError('epsilon must be a number');
    }
    return (left === right) || (defined(left) && defined(right) && Math.abs(left[0] - right[0]) <= epsilon && Math.abs(left[1] - right[1]) <= epsilon && Math.abs(left[2] - right[2]) <= epsilon && Math.abs(left[3] - right[3]) <= epsilon && Math.abs(left[4] - right[4]) <= epsilon && Math.abs(left[5] - right[5]) <= epsilon && Math.abs(left[6] - right[6]) <= epsilon && Math.abs(left[7] - right[7]) <= epsilon && Math.abs(left[8] - right[8]) <= epsilon);
  };
  Matrix3.IDENTITY = freezeObject(new Matrix3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0));
  Matrix3.ZERO = freezeObject(new Matrix3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0));
  Matrix3.COLUMN0ROW0 = 0;
  Matrix3.COLUMN0ROW1 = 1;
  Matrix3.COLUMN0ROW2 = 2;
  Matrix3.COLUMN1ROW0 = 3;
  Matrix3.COLUMN1ROW1 = 4;
  Matrix3.COLUMN1ROW2 = 5;
  Matrix3.COLUMN2ROW0 = 6;
  Matrix3.COLUMN2ROW1 = 7;
  Matrix3.COLUMN2ROW2 = 8;
  defineProperties(Matrix3.prototype, {length: {get: function() {
        return Matrix3.packedLength;
      }}});
  Matrix3.prototype.clone = function(result) {
    return Matrix3.clone(this, result);
  };
  Matrix3.prototype.equals = function(right) {
    return Matrix3.equals(this, right);
  };
  Matrix3.equalsArray = function(matrix, array, offset) {
    return matrix[0] === array[offset] && matrix[1] === array[offset + 1] && matrix[2] === array[offset + 2] && matrix[3] === array[offset + 3] && matrix[4] === array[offset + 4] && matrix[5] === array[offset + 5] && matrix[6] === array[offset + 6] && matrix[7] === array[offset + 7] && matrix[8] === array[offset + 8];
  };
  Matrix3.prototype.equalsEpsilon = function(right, epsilon) {
    return Matrix3.equalsEpsilon(this, right, epsilon);
  };
  Matrix3.prototype.toString = function() {
    return '(' + this[0] + ', ' + this[3] + ', ' + this[6] + ')\n' + '(' + this[1] + ', ' + this[4] + ', ' + this[7] + ')\n' + '(' + this[2] + ', ' + this[5] + ', ' + this[8] + ')';
  };
  return Matrix3;
});

})();
(function() {
var define = $__System.amdDefine;
define("38", ["1a"], function(defined) {
  'use strict';
  function RuntimeError(message) {
    this.name = 'RuntimeError';
    this.message = message;
    var stack;
    try {
      throw new Error();
    } catch (e) {
      stack = e.stack;
    }
    this.stack = stack;
  }
  if (defined(Object.create)) {
    RuntimeError.prototype = Object.create(Error.prototype);
    RuntimeError.prototype.constructor = RuntimeError;
  }
  RuntimeError.prototype.toString = function() {
    var str = this.name + ': ' + this.message;
    if (defined(this.stack)) {
      str += '\n' + this.stack.toString();
    }
    return str;
  };
  return RuntimeError;
});

})();
(function() {
var define = $__System.amdDefine;
define("33", ["2c", "43", "23", "1a", "1b", "1c", "1f", "27", "32", "38"], function(Cartesian3, Cartesian4, defaultValue, defined, defineProperties, DeveloperError, freezeObject, CesiumMath, Matrix3, RuntimeError) {
  'use strict';
  function Matrix4(column0Row0, column1Row0, column2Row0, column3Row0, column0Row1, column1Row1, column2Row1, column3Row1, column0Row2, column1Row2, column2Row2, column3Row2, column0Row3, column1Row3, column2Row3, column3Row3) {
    this[0] = defaultValue(column0Row0, 0.0);
    this[1] = defaultValue(column0Row1, 0.0);
    this[2] = defaultValue(column0Row2, 0.0);
    this[3] = defaultValue(column0Row3, 0.0);
    this[4] = defaultValue(column1Row0, 0.0);
    this[5] = defaultValue(column1Row1, 0.0);
    this[6] = defaultValue(column1Row2, 0.0);
    this[7] = defaultValue(column1Row3, 0.0);
    this[8] = defaultValue(column2Row0, 0.0);
    this[9] = defaultValue(column2Row1, 0.0);
    this[10] = defaultValue(column2Row2, 0.0);
    this[11] = defaultValue(column2Row3, 0.0);
    this[12] = defaultValue(column3Row0, 0.0);
    this[13] = defaultValue(column3Row1, 0.0);
    this[14] = defaultValue(column3Row2, 0.0);
    this[15] = defaultValue(column3Row3, 0.0);
  }
  Matrix4.packedLength = 16;
  Matrix4.pack = function(value, array, startingIndex) {
    if (!defined(value)) {
      throw new DeveloperError('value is required');
    }
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    startingIndex = defaultValue(startingIndex, 0);
    array[startingIndex++] = value[0];
    array[startingIndex++] = value[1];
    array[startingIndex++] = value[2];
    array[startingIndex++] = value[3];
    array[startingIndex++] = value[4];
    array[startingIndex++] = value[5];
    array[startingIndex++] = value[6];
    array[startingIndex++] = value[7];
    array[startingIndex++] = value[8];
    array[startingIndex++] = value[9];
    array[startingIndex++] = value[10];
    array[startingIndex++] = value[11];
    array[startingIndex++] = value[12];
    array[startingIndex++] = value[13];
    array[startingIndex++] = value[14];
    array[startingIndex] = value[15];
  };
  Matrix4.unpack = function(array, startingIndex, result) {
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    startingIndex = defaultValue(startingIndex, 0);
    if (!defined(result)) {
      result = new Matrix4();
    }
    result[0] = array[startingIndex++];
    result[1] = array[startingIndex++];
    result[2] = array[startingIndex++];
    result[3] = array[startingIndex++];
    result[4] = array[startingIndex++];
    result[5] = array[startingIndex++];
    result[6] = array[startingIndex++];
    result[7] = array[startingIndex++];
    result[8] = array[startingIndex++];
    result[9] = array[startingIndex++];
    result[10] = array[startingIndex++];
    result[11] = array[startingIndex++];
    result[12] = array[startingIndex++];
    result[13] = array[startingIndex++];
    result[14] = array[startingIndex++];
    result[15] = array[startingIndex];
    return result;
  };
  Matrix4.clone = function(matrix, result) {
    if (!defined(matrix)) {
      return undefined;
    }
    if (!defined(result)) {
      return new Matrix4(matrix[0], matrix[4], matrix[8], matrix[12], matrix[1], matrix[5], matrix[9], matrix[13], matrix[2], matrix[6], matrix[10], matrix[14], matrix[3], matrix[7], matrix[11], matrix[15]);
    }
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    result[4] = matrix[4];
    result[5] = matrix[5];
    result[6] = matrix[6];
    result[7] = matrix[7];
    result[8] = matrix[8];
    result[9] = matrix[9];
    result[10] = matrix[10];
    result[11] = matrix[11];
    result[12] = matrix[12];
    result[13] = matrix[13];
    result[14] = matrix[14];
    result[15] = matrix[15];
    return result;
  };
  Matrix4.fromArray = Matrix4.unpack;
  Matrix4.fromColumnMajorArray = function(values, result) {
    if (!defined(values)) {
      throw new DeveloperError('values is required');
    }
    return Matrix4.clone(values, result);
  };
  Matrix4.fromRowMajorArray = function(values, result) {
    if (!defined(values)) {
      throw new DeveloperError('values is required.');
    }
    if (!defined(result)) {
      return new Matrix4(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]);
    }
    result[0] = values[0];
    result[1] = values[4];
    result[2] = values[8];
    result[3] = values[12];
    result[4] = values[1];
    result[5] = values[5];
    result[6] = values[9];
    result[7] = values[13];
    result[8] = values[2];
    result[9] = values[6];
    result[10] = values[10];
    result[11] = values[14];
    result[12] = values[3];
    result[13] = values[7];
    result[14] = values[11];
    result[15] = values[15];
    return result;
  };
  Matrix4.fromRotationTranslation = function(rotation, translation, result) {
    if (!defined(rotation)) {
      throw new DeveloperError('rotation is required.');
    }
    translation = defaultValue(translation, Cartesian3.ZERO);
    if (!defined(result)) {
      return new Matrix4(rotation[0], rotation[3], rotation[6], translation.x, rotation[1], rotation[4], rotation[7], translation.y, rotation[2], rotation[5], rotation[8], translation.z, 0.0, 0.0, 0.0, 1.0);
    }
    result[0] = rotation[0];
    result[1] = rotation[1];
    result[2] = rotation[2];
    result[3] = 0.0;
    result[4] = rotation[3];
    result[5] = rotation[4];
    result[6] = rotation[5];
    result[7] = 0.0;
    result[8] = rotation[6];
    result[9] = rotation[7];
    result[10] = rotation[8];
    result[11] = 0.0;
    result[12] = translation.x;
    result[13] = translation.y;
    result[14] = translation.z;
    result[15] = 1.0;
    return result;
  };
  Matrix4.fromTranslationQuaternionRotationScale = function(translation, rotation, scale, result) {
    if (!defined(translation)) {
      throw new DeveloperError('translation is required.');
    }
    if (!defined(rotation)) {
      throw new DeveloperError('rotation is required.');
    }
    if (!defined(scale)) {
      throw new DeveloperError('scale is required.');
    }
    if (!defined(result)) {
      result = new Matrix4();
    }
    var scaleX = scale.x;
    var scaleY = scale.y;
    var scaleZ = scale.z;
    var x2 = rotation.x * rotation.x;
    var xy = rotation.x * rotation.y;
    var xz = rotation.x * rotation.z;
    var xw = rotation.x * rotation.w;
    var y2 = rotation.y * rotation.y;
    var yz = rotation.y * rotation.z;
    var yw = rotation.y * rotation.w;
    var z2 = rotation.z * rotation.z;
    var zw = rotation.z * rotation.w;
    var w2 = rotation.w * rotation.w;
    var m00 = x2 - y2 - z2 + w2;
    var m01 = 2.0 * (xy - zw);
    var m02 = 2.0 * (xz + yw);
    var m10 = 2.0 * (xy + zw);
    var m11 = -x2 + y2 - z2 + w2;
    var m12 = 2.0 * (yz - xw);
    var m20 = 2.0 * (xz - yw);
    var m21 = 2.0 * (yz + xw);
    var m22 = -x2 - y2 + z2 + w2;
    result[0] = m00 * scaleX;
    result[1] = m10 * scaleX;
    result[2] = m20 * scaleX;
    result[3] = 0.0;
    result[4] = m01 * scaleY;
    result[5] = m11 * scaleY;
    result[6] = m21 * scaleY;
    result[7] = 0.0;
    result[8] = m02 * scaleZ;
    result[9] = m12 * scaleZ;
    result[10] = m22 * scaleZ;
    result[11] = 0.0;
    result[12] = translation.x;
    result[13] = translation.y;
    result[14] = translation.z;
    result[15] = 1.0;
    return result;
  };
  Matrix4.fromTranslationRotationScale = function(translationRotationScale, result) {
    if (!defined(translationRotationScale)) {
      throw new DeveloperError('translationRotationScale is required.');
    }
    return Matrix4.fromTranslationQuaternionRotationScale(translationRotationScale.translation, translationRotationScale.rotation, translationRotationScale.scale, result);
  };
  Matrix4.fromTranslation = function(translation, result) {
    if (!defined(translation)) {
      throw new DeveloperError('translation is required.');
    }
    return Matrix4.fromRotationTranslation(Matrix3.IDENTITY, translation, result);
  };
  Matrix4.fromScale = function(scale, result) {
    if (!defined(scale)) {
      throw new DeveloperError('scale is required.');
    }
    if (!defined(result)) {
      return new Matrix4(scale.x, 0.0, 0.0, 0.0, 0.0, scale.y, 0.0, 0.0, 0.0, 0.0, scale.z, 0.0, 0.0, 0.0, 0.0, 1.0);
    }
    result[0] = scale.x;
    result[1] = 0.0;
    result[2] = 0.0;
    result[3] = 0.0;
    result[4] = 0.0;
    result[5] = scale.y;
    result[6] = 0.0;
    result[7] = 0.0;
    result[8] = 0.0;
    result[9] = 0.0;
    result[10] = scale.z;
    result[11] = 0.0;
    result[12] = 0.0;
    result[13] = 0.0;
    result[14] = 0.0;
    result[15] = 1.0;
    return result;
  };
  Matrix4.fromUniformScale = function(scale, result) {
    if (typeof scale !== 'number') {
      throw new DeveloperError('scale is required.');
    }
    if (!defined(result)) {
      return new Matrix4(scale, 0.0, 0.0, 0.0, 0.0, scale, 0.0, 0.0, 0.0, 0.0, scale, 0.0, 0.0, 0.0, 0.0, 1.0);
    }
    result[0] = scale;
    result[1] = 0.0;
    result[2] = 0.0;
    result[3] = 0.0;
    result[4] = 0.0;
    result[5] = scale;
    result[6] = 0.0;
    result[7] = 0.0;
    result[8] = 0.0;
    result[9] = 0.0;
    result[10] = scale;
    result[11] = 0.0;
    result[12] = 0.0;
    result[13] = 0.0;
    result[14] = 0.0;
    result[15] = 1.0;
    return result;
  };
  var fromCameraF = new Cartesian3();
  var fromCameraR = new Cartesian3();
  var fromCameraU = new Cartesian3();
  Matrix4.fromCamera = function(camera, result) {
    if (!defined(camera)) {
      throw new DeveloperError('camera is required.');
    }
    var position = camera.position;
    var direction = camera.direction;
    var up = camera.up;
    if (!defined(position)) {
      throw new DeveloperError('camera.position is required.');
    }
    if (!defined(direction)) {
      throw new DeveloperError('camera.direction is required.');
    }
    if (!defined(up)) {
      throw new DeveloperError('camera.up is required.');
    }
    Cartesian3.normalize(direction, fromCameraF);
    Cartesian3.normalize(Cartesian3.cross(fromCameraF, up, fromCameraR), fromCameraR);
    Cartesian3.normalize(Cartesian3.cross(fromCameraR, fromCameraF, fromCameraU), fromCameraU);
    var sX = fromCameraR.x;
    var sY = fromCameraR.y;
    var sZ = fromCameraR.z;
    var fX = fromCameraF.x;
    var fY = fromCameraF.y;
    var fZ = fromCameraF.z;
    var uX = fromCameraU.x;
    var uY = fromCameraU.y;
    var uZ = fromCameraU.z;
    var positionX = position.x;
    var positionY = position.y;
    var positionZ = position.z;
    var t0 = sX * -positionX + sY * -positionY + sZ * -positionZ;
    var t1 = uX * -positionX + uY * -positionY + uZ * -positionZ;
    var t2 = fX * positionX + fY * positionY + fZ * positionZ;
    if (!defined(result)) {
      return new Matrix4(sX, sY, sZ, t0, uX, uY, uZ, t1, -fX, -fY, -fZ, t2, 0.0, 0.0, 0.0, 1.0);
    }
    result[0] = sX;
    result[1] = uX;
    result[2] = -fX;
    result[3] = 0.0;
    result[4] = sY;
    result[5] = uY;
    result[6] = -fY;
    result[7] = 0.0;
    result[8] = sZ;
    result[9] = uZ;
    result[10] = -fZ;
    result[11] = 0.0;
    result[12] = t0;
    result[13] = t1;
    result[14] = t2;
    result[15] = 1.0;
    return result;
  };
  Matrix4.computePerspectiveFieldOfView = function(fovY, aspectRatio, near, far, result) {
    if (fovY <= 0.0 || fovY > Math.PI) {
      throw new DeveloperError('fovY must be in [0, PI).');
    }
    if (aspectRatio <= 0.0) {
      throw new DeveloperError('aspectRatio must be greater than zero.');
    }
    if (near <= 0.0) {
      throw new DeveloperError('near must be greater than zero.');
    }
    if (far <= 0.0) {
      throw new DeveloperError('far must be greater than zero.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var bottom = Math.tan(fovY * 0.5);
    var column1Row1 = 1.0 / bottom;
    var column0Row0 = column1Row1 / aspectRatio;
    var column2Row2 = (far + near) / (near - far);
    var column3Row2 = (2.0 * far * near) / (near - far);
    result[0] = column0Row0;
    result[1] = 0.0;
    result[2] = 0.0;
    result[3] = 0.0;
    result[4] = 0.0;
    result[5] = column1Row1;
    result[6] = 0.0;
    result[7] = 0.0;
    result[8] = 0.0;
    result[9] = 0.0;
    result[10] = column2Row2;
    result[11] = -1.0;
    result[12] = 0.0;
    result[13] = 0.0;
    result[14] = column3Row2;
    result[15] = 0.0;
    return result;
  };
  Matrix4.computeOrthographicOffCenter = function(left, right, bottom, top, near, far, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required.');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required.');
    }
    if (!defined(bottom)) {
      throw new DeveloperError('bottom is required.');
    }
    if (!defined(top)) {
      throw new DeveloperError('top is required.');
    }
    if (!defined(near)) {
      throw new DeveloperError('near is required.');
    }
    if (!defined(far)) {
      throw new DeveloperError('far is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var a = 1.0 / (right - left);
    var b = 1.0 / (top - bottom);
    var c = 1.0 / (far - near);
    var tx = -(right + left) * a;
    var ty = -(top + bottom) * b;
    var tz = -(far + near) * c;
    a *= 2.0;
    b *= 2.0;
    c *= -2.0;
    result[0] = a;
    result[1] = 0.0;
    result[2] = 0.0;
    result[3] = 0.0;
    result[4] = 0.0;
    result[5] = b;
    result[6] = 0.0;
    result[7] = 0.0;
    result[8] = 0.0;
    result[9] = 0.0;
    result[10] = c;
    result[11] = 0.0;
    result[12] = tx;
    result[13] = ty;
    result[14] = tz;
    result[15] = 1.0;
    return result;
  };
  Matrix4.computePerspectiveOffCenter = function(left, right, bottom, top, near, far, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required.');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required.');
    }
    if (!defined(bottom)) {
      throw new DeveloperError('bottom is required.');
    }
    if (!defined(top)) {
      throw new DeveloperError('top is required.');
    }
    if (!defined(near)) {
      throw new DeveloperError('near is required.');
    }
    if (!defined(far)) {
      throw new DeveloperError('far is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var column0Row0 = 2.0 * near / (right - left);
    var column1Row1 = 2.0 * near / (top - bottom);
    var column2Row0 = (right + left) / (right - left);
    var column2Row1 = (top + bottom) / (top - bottom);
    var column2Row2 = -(far + near) / (far - near);
    var column2Row3 = -1.0;
    var column3Row2 = -2.0 * far * near / (far - near);
    result[0] = column0Row0;
    result[1] = 0.0;
    result[2] = 0.0;
    result[3] = 0.0;
    result[4] = 0.0;
    result[5] = column1Row1;
    result[6] = 0.0;
    result[7] = 0.0;
    result[8] = column2Row0;
    result[9] = column2Row1;
    result[10] = column2Row2;
    result[11] = column2Row3;
    result[12] = 0.0;
    result[13] = 0.0;
    result[14] = column3Row2;
    result[15] = 0.0;
    return result;
  };
  Matrix4.computeInfinitePerspectiveOffCenter = function(left, right, bottom, top, near, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required.');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required.');
    }
    if (!defined(bottom)) {
      throw new DeveloperError('bottom is required.');
    }
    if (!defined(top)) {
      throw new DeveloperError('top is required.');
    }
    if (!defined(near)) {
      throw new DeveloperError('near is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var column0Row0 = 2.0 * near / (right - left);
    var column1Row1 = 2.0 * near / (top - bottom);
    var column2Row0 = (right + left) / (right - left);
    var column2Row1 = (top + bottom) / (top - bottom);
    var column2Row2 = -1.0;
    var column2Row3 = -1.0;
    var column3Row2 = -2.0 * near;
    result[0] = column0Row0;
    result[1] = 0.0;
    result[2] = 0.0;
    result[3] = 0.0;
    result[4] = 0.0;
    result[5] = column1Row1;
    result[6] = 0.0;
    result[7] = 0.0;
    result[8] = column2Row0;
    result[9] = column2Row1;
    result[10] = column2Row2;
    result[11] = column2Row3;
    result[12] = 0.0;
    result[13] = 0.0;
    result[14] = column3Row2;
    result[15] = 0.0;
    return result;
  };
  Matrix4.computeViewportTransformation = function(viewport, nearDepthRange, farDepthRange, result) {
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    viewport = defaultValue(viewport, defaultValue.EMPTY_OBJECT);
    var x = defaultValue(viewport.x, 0.0);
    var y = defaultValue(viewport.y, 0.0);
    var width = defaultValue(viewport.width, 0.0);
    var height = defaultValue(viewport.height, 0.0);
    nearDepthRange = defaultValue(nearDepthRange, 0.0);
    farDepthRange = defaultValue(farDepthRange, 1.0);
    var halfWidth = width * 0.5;
    var halfHeight = height * 0.5;
    var halfDepth = (farDepthRange - nearDepthRange) * 0.5;
    var column0Row0 = halfWidth;
    var column1Row1 = halfHeight;
    var column2Row2 = halfDepth;
    var column3Row0 = x + halfWidth;
    var column3Row1 = y + halfHeight;
    var column3Row2 = nearDepthRange + halfDepth;
    var column3Row3 = 1.0;
    result[0] = column0Row0;
    result[1] = 0.0;
    result[2] = 0.0;
    result[3] = 0.0;
    result[4] = 0.0;
    result[5] = column1Row1;
    result[6] = 0.0;
    result[7] = 0.0;
    result[8] = 0.0;
    result[9] = 0.0;
    result[10] = column2Row2;
    result[11] = 0.0;
    result[12] = column3Row0;
    result[13] = column3Row1;
    result[14] = column3Row2;
    result[15] = column3Row3;
    return result;
  };
  Matrix4.computeView = function(position, direction, up, right, result) {
    if (!defined(position)) {
      throw new DeveloperError('position is required');
    }
    if (!defined(direction)) {
      throw new DeveloperError('direction is required');
    }
    if (!defined(up)) {
      throw new DeveloperError('up is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result[0] = right.x;
    result[1] = up.x;
    result[2] = -direction.x;
    result[3] = 0.0;
    result[4] = right.y;
    result[5] = up.y;
    result[6] = -direction.y;
    result[7] = 0.0;
    result[8] = right.z;
    result[9] = up.z;
    result[10] = -direction.z;
    result[11] = 0.0;
    result[12] = -Cartesian3.dot(right, position);
    result[13] = -Cartesian3.dot(up, position);
    result[14] = Cartesian3.dot(direction, position);
    result[15] = 1.0;
    return result;
  };
  Matrix4.toArray = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(result)) {
      return [matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5], matrix[6], matrix[7], matrix[8], matrix[9], matrix[10], matrix[11], matrix[12], matrix[13], matrix[14], matrix[15]];
    }
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    result[4] = matrix[4];
    result[5] = matrix[5];
    result[6] = matrix[6];
    result[7] = matrix[7];
    result[8] = matrix[8];
    result[9] = matrix[9];
    result[10] = matrix[10];
    result[11] = matrix[11];
    result[12] = matrix[12];
    result[13] = matrix[13];
    result[14] = matrix[14];
    result[15] = matrix[15];
    return result;
  };
  Matrix4.getElementIndex = function(column, row) {
    if (typeof row !== 'number' || row < 0 || row > 3) {
      throw new DeveloperError('row must be 0, 1, 2, or 3.');
    }
    if (typeof column !== 'number' || column < 0 || column > 3) {
      throw new DeveloperError('column must be 0, 1, 2, or 3.');
    }
    return column * 4 + row;
  };
  Matrix4.getColumn = function(matrix, index, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required.');
    }
    if (typeof index !== 'number' || index < 0 || index > 3) {
      throw new DeveloperError('index must be 0, 1, 2, or 3.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var startIndex = index * 4;
    var x = matrix[startIndex];
    var y = matrix[startIndex + 1];
    var z = matrix[startIndex + 2];
    var w = matrix[startIndex + 3];
    result.x = x;
    result.y = y;
    result.z = z;
    result.w = w;
    return result;
  };
  Matrix4.setColumn = function(matrix, index, cartesian, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (typeof index !== 'number' || index < 0 || index > 3) {
      throw new DeveloperError('index must be 0, 1, 2, or 3.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result = Matrix4.clone(matrix, result);
    var startIndex = index * 4;
    result[startIndex] = cartesian.x;
    result[startIndex + 1] = cartesian.y;
    result[startIndex + 2] = cartesian.z;
    result[startIndex + 3] = cartesian.w;
    return result;
  };
  Matrix4.setTranslation = function(matrix, translation, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(translation)) {
      throw new DeveloperError('translation is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    result[4] = matrix[4];
    result[5] = matrix[5];
    result[6] = matrix[6];
    result[7] = matrix[7];
    result[8] = matrix[8];
    result[9] = matrix[9];
    result[10] = matrix[10];
    result[11] = matrix[11];
    result[12] = translation.x;
    result[13] = translation.y;
    result[14] = translation.z;
    result[15] = matrix[15];
    return result;
  };
  Matrix4.getRow = function(matrix, index, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required.');
    }
    if (typeof index !== 'number' || index < 0 || index > 3) {
      throw new DeveloperError('index must be 0, 1, 2, or 3.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var x = matrix[index];
    var y = matrix[index + 4];
    var z = matrix[index + 8];
    var w = matrix[index + 12];
    result.x = x;
    result.y = y;
    result.z = z;
    result.w = w;
    return result;
  };
  Matrix4.setRow = function(matrix, index, cartesian, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (typeof index !== 'number' || index < 0 || index > 3) {
      throw new DeveloperError('index must be 0, 1, 2, or 3.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result = Matrix4.clone(matrix, result);
    result[index] = cartesian.x;
    result[index + 4] = cartesian.y;
    result[index + 8] = cartesian.z;
    result[index + 12] = cartesian.w;
    return result;
  };
  var scratchColumn = new Cartesian3();
  Matrix4.getScale = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = Cartesian3.magnitude(Cartesian3.fromElements(matrix[0], matrix[1], matrix[2], scratchColumn));
    result.y = Cartesian3.magnitude(Cartesian3.fromElements(matrix[4], matrix[5], matrix[6], scratchColumn));
    result.z = Cartesian3.magnitude(Cartesian3.fromElements(matrix[8], matrix[9], matrix[10], scratchColumn));
    return result;
  };
  var scratchScale = new Cartesian3();
  Matrix4.getMaximumScale = function(matrix) {
    Matrix4.getScale(matrix, scratchScale);
    return Cartesian3.maximumComponent(scratchScale);
  };
  Matrix4.multiply = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var left0 = left[0];
    var left1 = left[1];
    var left2 = left[2];
    var left3 = left[3];
    var left4 = left[4];
    var left5 = left[5];
    var left6 = left[6];
    var left7 = left[7];
    var left8 = left[8];
    var left9 = left[9];
    var left10 = left[10];
    var left11 = left[11];
    var left12 = left[12];
    var left13 = left[13];
    var left14 = left[14];
    var left15 = left[15];
    var right0 = right[0];
    var right1 = right[1];
    var right2 = right[2];
    var right3 = right[3];
    var right4 = right[4];
    var right5 = right[5];
    var right6 = right[6];
    var right7 = right[7];
    var right8 = right[8];
    var right9 = right[9];
    var right10 = right[10];
    var right11 = right[11];
    var right12 = right[12];
    var right13 = right[13];
    var right14 = right[14];
    var right15 = right[15];
    var column0Row0 = left0 * right0 + left4 * right1 + left8 * right2 + left12 * right3;
    var column0Row1 = left1 * right0 + left5 * right1 + left9 * right2 + left13 * right3;
    var column0Row2 = left2 * right0 + left6 * right1 + left10 * right2 + left14 * right3;
    var column0Row3 = left3 * right0 + left7 * right1 + left11 * right2 + left15 * right3;
    var column1Row0 = left0 * right4 + left4 * right5 + left8 * right6 + left12 * right7;
    var column1Row1 = left1 * right4 + left5 * right5 + left9 * right6 + left13 * right7;
    var column1Row2 = left2 * right4 + left6 * right5 + left10 * right6 + left14 * right7;
    var column1Row3 = left3 * right4 + left7 * right5 + left11 * right6 + left15 * right7;
    var column2Row0 = left0 * right8 + left4 * right9 + left8 * right10 + left12 * right11;
    var column2Row1 = left1 * right8 + left5 * right9 + left9 * right10 + left13 * right11;
    var column2Row2 = left2 * right8 + left6 * right9 + left10 * right10 + left14 * right11;
    var column2Row3 = left3 * right8 + left7 * right9 + left11 * right10 + left15 * right11;
    var column3Row0 = left0 * right12 + left4 * right13 + left8 * right14 + left12 * right15;
    var column3Row1 = left1 * right12 + left5 * right13 + left9 * right14 + left13 * right15;
    var column3Row2 = left2 * right12 + left6 * right13 + left10 * right14 + left14 * right15;
    var column3Row3 = left3 * right12 + left7 * right13 + left11 * right14 + left15 * right15;
    result[0] = column0Row0;
    result[1] = column0Row1;
    result[2] = column0Row2;
    result[3] = column0Row3;
    result[4] = column1Row0;
    result[5] = column1Row1;
    result[6] = column1Row2;
    result[7] = column1Row3;
    result[8] = column2Row0;
    result[9] = column2Row1;
    result[10] = column2Row2;
    result[11] = column2Row3;
    result[12] = column3Row0;
    result[13] = column3Row1;
    result[14] = column3Row2;
    result[15] = column3Row3;
    return result;
  };
  Matrix4.add = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result[0] = left[0] + right[0];
    result[1] = left[1] + right[1];
    result[2] = left[2] + right[2];
    result[3] = left[3] + right[3];
    result[4] = left[4] + right[4];
    result[5] = left[5] + right[5];
    result[6] = left[6] + right[6];
    result[7] = left[7] + right[7];
    result[8] = left[8] + right[8];
    result[9] = left[9] + right[9];
    result[10] = left[10] + right[10];
    result[11] = left[11] + right[11];
    result[12] = left[12] + right[12];
    result[13] = left[13] + right[13];
    result[14] = left[14] + right[14];
    result[15] = left[15] + right[15];
    return result;
  };
  Matrix4.subtract = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result[0] = left[0] - right[0];
    result[1] = left[1] - right[1];
    result[2] = left[2] - right[2];
    result[3] = left[3] - right[3];
    result[4] = left[4] - right[4];
    result[5] = left[5] - right[5];
    result[6] = left[6] - right[6];
    result[7] = left[7] - right[7];
    result[8] = left[8] - right[8];
    result[9] = left[9] - right[9];
    result[10] = left[10] - right[10];
    result[11] = left[11] - right[11];
    result[12] = left[12] - right[12];
    result[13] = left[13] - right[13];
    result[14] = left[14] - right[14];
    result[15] = left[15] - right[15];
    return result;
  };
  Matrix4.multiplyTransformation = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var left0 = left[0];
    var left1 = left[1];
    var left2 = left[2];
    var left4 = left[4];
    var left5 = left[5];
    var left6 = left[6];
    var left8 = left[8];
    var left9 = left[9];
    var left10 = left[10];
    var left12 = left[12];
    var left13 = left[13];
    var left14 = left[14];
    var right0 = right[0];
    var right1 = right[1];
    var right2 = right[2];
    var right4 = right[4];
    var right5 = right[5];
    var right6 = right[6];
    var right8 = right[8];
    var right9 = right[9];
    var right10 = right[10];
    var right12 = right[12];
    var right13 = right[13];
    var right14 = right[14];
    var column0Row0 = left0 * right0 + left4 * right1 + left8 * right2;
    var column0Row1 = left1 * right0 + left5 * right1 + left9 * right2;
    var column0Row2 = left2 * right0 + left6 * right1 + left10 * right2;
    var column1Row0 = left0 * right4 + left4 * right5 + left8 * right6;
    var column1Row1 = left1 * right4 + left5 * right5 + left9 * right6;
    var column1Row2 = left2 * right4 + left6 * right5 + left10 * right6;
    var column2Row0 = left0 * right8 + left4 * right9 + left8 * right10;
    var column2Row1 = left1 * right8 + left5 * right9 + left9 * right10;
    var column2Row2 = left2 * right8 + left6 * right9 + left10 * right10;
    var column3Row0 = left0 * right12 + left4 * right13 + left8 * right14 + left12;
    var column3Row1 = left1 * right12 + left5 * right13 + left9 * right14 + left13;
    var column3Row2 = left2 * right12 + left6 * right13 + left10 * right14 + left14;
    result[0] = column0Row0;
    result[1] = column0Row1;
    result[2] = column0Row2;
    result[3] = 0.0;
    result[4] = column1Row0;
    result[5] = column1Row1;
    result[6] = column1Row2;
    result[7] = 0.0;
    result[8] = column2Row0;
    result[9] = column2Row1;
    result[10] = column2Row2;
    result[11] = 0.0;
    result[12] = column3Row0;
    result[13] = column3Row1;
    result[14] = column3Row2;
    result[15] = 1.0;
    return result;
  };
  Matrix4.multiplyByMatrix3 = function(matrix, rotation, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(rotation)) {
      throw new DeveloperError('rotation is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var left0 = matrix[0];
    var left1 = matrix[1];
    var left2 = matrix[2];
    var left4 = matrix[4];
    var left5 = matrix[5];
    var left6 = matrix[6];
    var left8 = matrix[8];
    var left9 = matrix[9];
    var left10 = matrix[10];
    var right0 = rotation[0];
    var right1 = rotation[1];
    var right2 = rotation[2];
    var right4 = rotation[3];
    var right5 = rotation[4];
    var right6 = rotation[5];
    var right8 = rotation[6];
    var right9 = rotation[7];
    var right10 = rotation[8];
    var column0Row0 = left0 * right0 + left4 * right1 + left8 * right2;
    var column0Row1 = left1 * right0 + left5 * right1 + left9 * right2;
    var column0Row2 = left2 * right0 + left6 * right1 + left10 * right2;
    var column1Row0 = left0 * right4 + left4 * right5 + left8 * right6;
    var column1Row1 = left1 * right4 + left5 * right5 + left9 * right6;
    var column1Row2 = left2 * right4 + left6 * right5 + left10 * right6;
    var column2Row0 = left0 * right8 + left4 * right9 + left8 * right10;
    var column2Row1 = left1 * right8 + left5 * right9 + left9 * right10;
    var column2Row2 = left2 * right8 + left6 * right9 + left10 * right10;
    result[0] = column0Row0;
    result[1] = column0Row1;
    result[2] = column0Row2;
    result[3] = 0.0;
    result[4] = column1Row0;
    result[5] = column1Row1;
    result[6] = column1Row2;
    result[7] = 0.0;
    result[8] = column2Row0;
    result[9] = column2Row1;
    result[10] = column2Row2;
    result[11] = 0.0;
    result[12] = matrix[12];
    result[13] = matrix[13];
    result[14] = matrix[14];
    result[15] = matrix[15];
    return result;
  };
  Matrix4.multiplyByTranslation = function(matrix, translation, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(translation)) {
      throw new DeveloperError('translation is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var x = translation.x;
    var y = translation.y;
    var z = translation.z;
    var tx = (x * matrix[0]) + (y * matrix[4]) + (z * matrix[8]) + matrix[12];
    var ty = (x * matrix[1]) + (y * matrix[5]) + (z * matrix[9]) + matrix[13];
    var tz = (x * matrix[2]) + (y * matrix[6]) + (z * matrix[10]) + matrix[14];
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    result[4] = matrix[4];
    result[5] = matrix[5];
    result[6] = matrix[6];
    result[7] = matrix[7];
    result[8] = matrix[8];
    result[9] = matrix[9];
    result[10] = matrix[10];
    result[11] = matrix[11];
    result[12] = tx;
    result[13] = ty;
    result[14] = tz;
    result[15] = matrix[15];
    return result;
  };
  var uniformScaleScratch = new Cartesian3();
  Matrix4.multiplyByUniformScale = function(matrix, scale, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (typeof scale !== 'number') {
      throw new DeveloperError('scale is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    uniformScaleScratch.x = scale;
    uniformScaleScratch.y = scale;
    uniformScaleScratch.z = scale;
    return Matrix4.multiplyByScale(matrix, uniformScaleScratch, result);
  };
  Matrix4.multiplyByScale = function(matrix, scale, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(scale)) {
      throw new DeveloperError('scale is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var scaleX = scale.x;
    var scaleY = scale.y;
    var scaleZ = scale.z;
    if ((scaleX === 1.0) && (scaleY === 1.0) && (scaleZ === 1.0)) {
      return Matrix4.clone(matrix, result);
    }
    result[0] = scaleX * matrix[0];
    result[1] = scaleX * matrix[1];
    result[2] = scaleX * matrix[2];
    result[3] = 0.0;
    result[4] = scaleY * matrix[4];
    result[5] = scaleY * matrix[5];
    result[6] = scaleY * matrix[6];
    result[7] = 0.0;
    result[8] = scaleZ * matrix[8];
    result[9] = scaleZ * matrix[9];
    result[10] = scaleZ * matrix[10];
    result[11] = 0.0;
    result[12] = matrix[12];
    result[13] = matrix[13];
    result[14] = matrix[14];
    result[15] = 1.0;
    return result;
  };
  Matrix4.multiplyByVector = function(matrix, cartesian, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var vX = cartesian.x;
    var vY = cartesian.y;
    var vZ = cartesian.z;
    var vW = cartesian.w;
    var x = matrix[0] * vX + matrix[4] * vY + matrix[8] * vZ + matrix[12] * vW;
    var y = matrix[1] * vX + matrix[5] * vY + matrix[9] * vZ + matrix[13] * vW;
    var z = matrix[2] * vX + matrix[6] * vY + matrix[10] * vZ + matrix[14] * vW;
    var w = matrix[3] * vX + matrix[7] * vY + matrix[11] * vZ + matrix[15] * vW;
    result.x = x;
    result.y = y;
    result.z = z;
    result.w = w;
    return result;
  };
  Matrix4.multiplyByPointAsVector = function(matrix, cartesian, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var vX = cartesian.x;
    var vY = cartesian.y;
    var vZ = cartesian.z;
    var x = matrix[0] * vX + matrix[4] * vY + matrix[8] * vZ;
    var y = matrix[1] * vX + matrix[5] * vY + matrix[9] * vZ;
    var z = matrix[2] * vX + matrix[6] * vY + matrix[10] * vZ;
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  };
  Matrix4.multiplyByPoint = function(matrix, cartesian, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var vX = cartesian.x;
    var vY = cartesian.y;
    var vZ = cartesian.z;
    var x = matrix[0] * vX + matrix[4] * vY + matrix[8] * vZ + matrix[12];
    var y = matrix[1] * vX + matrix[5] * vY + matrix[9] * vZ + matrix[13];
    var z = matrix[2] * vX + matrix[6] * vY + matrix[10] * vZ + matrix[14];
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  };
  Matrix4.multiplyByScalar = function(matrix, scalar, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (typeof scalar !== 'number') {
      throw new DeveloperError('scalar must be a number');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result[0] = matrix[0] * scalar;
    result[1] = matrix[1] * scalar;
    result[2] = matrix[2] * scalar;
    result[3] = matrix[3] * scalar;
    result[4] = matrix[4] * scalar;
    result[5] = matrix[5] * scalar;
    result[6] = matrix[6] * scalar;
    result[7] = matrix[7] * scalar;
    result[8] = matrix[8] * scalar;
    result[9] = matrix[9] * scalar;
    result[10] = matrix[10] * scalar;
    result[11] = matrix[11] * scalar;
    result[12] = matrix[12] * scalar;
    result[13] = matrix[13] * scalar;
    result[14] = matrix[14] * scalar;
    result[15] = matrix[15] * scalar;
    return result;
  };
  Matrix4.negate = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result[0] = -matrix[0];
    result[1] = -matrix[1];
    result[2] = -matrix[2];
    result[3] = -matrix[3];
    result[4] = -matrix[4];
    result[5] = -matrix[5];
    result[6] = -matrix[6];
    result[7] = -matrix[7];
    result[8] = -matrix[8];
    result[9] = -matrix[9];
    result[10] = -matrix[10];
    result[11] = -matrix[11];
    result[12] = -matrix[12];
    result[13] = -matrix[13];
    result[14] = -matrix[14];
    result[15] = -matrix[15];
    return result;
  };
  Matrix4.transpose = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var matrix1 = matrix[1];
    var matrix2 = matrix[2];
    var matrix3 = matrix[3];
    var matrix6 = matrix[6];
    var matrix7 = matrix[7];
    var matrix11 = matrix[11];
    result[0] = matrix[0];
    result[1] = matrix[4];
    result[2] = matrix[8];
    result[3] = matrix[12];
    result[4] = matrix1;
    result[5] = matrix[5];
    result[6] = matrix[9];
    result[7] = matrix[13];
    result[8] = matrix2;
    result[9] = matrix6;
    result[10] = matrix[10];
    result[11] = matrix[14];
    result[12] = matrix3;
    result[13] = matrix7;
    result[14] = matrix11;
    result[15] = matrix[15];
    return result;
  };
  Matrix4.abs = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result[0] = Math.abs(matrix[0]);
    result[1] = Math.abs(matrix[1]);
    result[2] = Math.abs(matrix[2]);
    result[3] = Math.abs(matrix[3]);
    result[4] = Math.abs(matrix[4]);
    result[5] = Math.abs(matrix[5]);
    result[6] = Math.abs(matrix[6]);
    result[7] = Math.abs(matrix[7]);
    result[8] = Math.abs(matrix[8]);
    result[9] = Math.abs(matrix[9]);
    result[10] = Math.abs(matrix[10]);
    result[11] = Math.abs(matrix[11]);
    result[12] = Math.abs(matrix[12]);
    result[13] = Math.abs(matrix[13]);
    result[14] = Math.abs(matrix[14]);
    result[15] = Math.abs(matrix[15]);
    return result;
  };
  Matrix4.equals = function(left, right) {
    return (left === right) || (defined(left) && defined(right) && left[12] === right[12] && left[13] === right[13] && left[14] === right[14] && left[0] === right[0] && left[1] === right[1] && left[2] === right[2] && left[4] === right[4] && left[5] === right[5] && left[6] === right[6] && left[8] === right[8] && left[9] === right[9] && left[10] === right[10] && left[3] === right[3] && left[7] === right[7] && left[11] === right[11] && left[15] === right[15]);
  };
  Matrix4.equalsEpsilon = function(left, right, epsilon) {
    if (typeof epsilon !== 'number') {
      throw new DeveloperError('epsilon must be a number');
    }
    return (left === right) || (defined(left) && defined(right) && Math.abs(left[0] - right[0]) <= epsilon && Math.abs(left[1] - right[1]) <= epsilon && Math.abs(left[2] - right[2]) <= epsilon && Math.abs(left[3] - right[3]) <= epsilon && Math.abs(left[4] - right[4]) <= epsilon && Math.abs(left[5] - right[5]) <= epsilon && Math.abs(left[6] - right[6]) <= epsilon && Math.abs(left[7] - right[7]) <= epsilon && Math.abs(left[8] - right[8]) <= epsilon && Math.abs(left[9] - right[9]) <= epsilon && Math.abs(left[10] - right[10]) <= epsilon && Math.abs(left[11] - right[11]) <= epsilon && Math.abs(left[12] - right[12]) <= epsilon && Math.abs(left[13] - right[13]) <= epsilon && Math.abs(left[14] - right[14]) <= epsilon && Math.abs(left[15] - right[15]) <= epsilon);
  };
  Matrix4.getTranslation = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = matrix[12];
    result.y = matrix[13];
    result.z = matrix[14];
    return result;
  };
  Matrix4.getRotation = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[4];
    result[4] = matrix[5];
    result[5] = matrix[6];
    result[6] = matrix[8];
    result[7] = matrix[9];
    result[8] = matrix[10];
    return result;
  };
  var scratchInverseRotation = new Matrix3();
  var scratchMatrix3Zero = new Matrix3();
  var scratchBottomRow = new Cartesian4();
  var scratchExpectedBottomRow = new Cartesian4(0.0, 0.0, 0.0, 1.0);
  Matrix4.inverse = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    if (Matrix3.equalsEpsilon(Matrix4.getRotation(matrix, scratchInverseRotation), scratchMatrix3Zero, CesiumMath.EPSILON7) && Cartesian4.equals(Matrix4.getRow(matrix, 3, scratchBottomRow), scratchExpectedBottomRow)) {
      result[0] = 0.0;
      result[1] = 0.0;
      result[2] = 0.0;
      result[3] = 0.0;
      result[4] = 0.0;
      result[5] = 0.0;
      result[6] = 0.0;
      result[7] = 0.0;
      result[8] = 0.0;
      result[9] = 0.0;
      result[10] = 0.0;
      result[11] = 0.0;
      result[12] = -matrix[12];
      result[13] = -matrix[13];
      result[14] = -matrix[14];
      result[15] = 1.0;
      return result;
    }
    var src0 = matrix[0];
    var src1 = matrix[4];
    var src2 = matrix[8];
    var src3 = matrix[12];
    var src4 = matrix[1];
    var src5 = matrix[5];
    var src6 = matrix[9];
    var src7 = matrix[13];
    var src8 = matrix[2];
    var src9 = matrix[6];
    var src10 = matrix[10];
    var src11 = matrix[14];
    var src12 = matrix[3];
    var src13 = matrix[7];
    var src14 = matrix[11];
    var src15 = matrix[15];
    var tmp0 = src10 * src15;
    var tmp1 = src11 * src14;
    var tmp2 = src9 * src15;
    var tmp3 = src11 * src13;
    var tmp4 = src9 * src14;
    var tmp5 = src10 * src13;
    var tmp6 = src8 * src15;
    var tmp7 = src11 * src12;
    var tmp8 = src8 * src14;
    var tmp9 = src10 * src12;
    var tmp10 = src8 * src13;
    var tmp11 = src9 * src12;
    var dst0 = (tmp0 * src5 + tmp3 * src6 + tmp4 * src7) - (tmp1 * src5 + tmp2 * src6 + tmp5 * src7);
    var dst1 = (tmp1 * src4 + tmp6 * src6 + tmp9 * src7) - (tmp0 * src4 + tmp7 * src6 + tmp8 * src7);
    var dst2 = (tmp2 * src4 + tmp7 * src5 + tmp10 * src7) - (tmp3 * src4 + tmp6 * src5 + tmp11 * src7);
    var dst3 = (tmp5 * src4 + tmp8 * src5 + tmp11 * src6) - (tmp4 * src4 + tmp9 * src5 + tmp10 * src6);
    var dst4 = (tmp1 * src1 + tmp2 * src2 + tmp5 * src3) - (tmp0 * src1 + tmp3 * src2 + tmp4 * src3);
    var dst5 = (tmp0 * src0 + tmp7 * src2 + tmp8 * src3) - (tmp1 * src0 + tmp6 * src2 + tmp9 * src3);
    var dst6 = (tmp3 * src0 + tmp6 * src1 + tmp11 * src3) - (tmp2 * src0 + tmp7 * src1 + tmp10 * src3);
    var dst7 = (tmp4 * src0 + tmp9 * src1 + tmp10 * src2) - (tmp5 * src0 + tmp8 * src1 + tmp11 * src2);
    tmp0 = src2 * src7;
    tmp1 = src3 * src6;
    tmp2 = src1 * src7;
    tmp3 = src3 * src5;
    tmp4 = src1 * src6;
    tmp5 = src2 * src5;
    tmp6 = src0 * src7;
    tmp7 = src3 * src4;
    tmp8 = src0 * src6;
    tmp9 = src2 * src4;
    tmp10 = src0 * src5;
    tmp11 = src1 * src4;
    var dst8 = (tmp0 * src13 + tmp3 * src14 + tmp4 * src15) - (tmp1 * src13 + tmp2 * src14 + tmp5 * src15);
    var dst9 = (tmp1 * src12 + tmp6 * src14 + tmp9 * src15) - (tmp0 * src12 + tmp7 * src14 + tmp8 * src15);
    var dst10 = (tmp2 * src12 + tmp7 * src13 + tmp10 * src15) - (tmp3 * src12 + tmp6 * src13 + tmp11 * src15);
    var dst11 = (tmp5 * src12 + tmp8 * src13 + tmp11 * src14) - (tmp4 * src12 + tmp9 * src13 + tmp10 * src14);
    var dst12 = (tmp2 * src10 + tmp5 * src11 + tmp1 * src9) - (tmp4 * src11 + tmp0 * src9 + tmp3 * src10);
    var dst13 = (tmp8 * src11 + tmp0 * src8 + tmp7 * src10) - (tmp6 * src10 + tmp9 * src11 + tmp1 * src8);
    var dst14 = (tmp6 * src9 + tmp11 * src11 + tmp3 * src8) - (tmp10 * src11 + tmp2 * src8 + tmp7 * src9);
    var dst15 = (tmp10 * src10 + tmp4 * src8 + tmp9 * src9) - (tmp8 * src9 + tmp11 * src10 + tmp5 * src8);
    var det = src0 * dst0 + src1 * dst1 + src2 * dst2 + src3 * dst3;
    if (Math.abs(det) < CesiumMath.EPSILON20) {
      throw new RuntimeError('matrix is not invertible because its determinate is zero.');
    }
    det = 1.0 / det;
    result[0] = dst0 * det;
    result[1] = dst1 * det;
    result[2] = dst2 * det;
    result[3] = dst3 * det;
    result[4] = dst4 * det;
    result[5] = dst5 * det;
    result[6] = dst6 * det;
    result[7] = dst7 * det;
    result[8] = dst8 * det;
    result[9] = dst9 * det;
    result[10] = dst10 * det;
    result[11] = dst11 * det;
    result[12] = dst12 * det;
    result[13] = dst13 * det;
    result[14] = dst14 * det;
    result[15] = dst15 * det;
    return result;
  };
  Matrix4.inverseTransformation = function(matrix, result) {
    if (!defined(matrix)) {
      throw new DeveloperError('matrix is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var matrix0 = matrix[0];
    var matrix1 = matrix[1];
    var matrix2 = matrix[2];
    var matrix4 = matrix[4];
    var matrix5 = matrix[5];
    var matrix6 = matrix[6];
    var matrix8 = matrix[8];
    var matrix9 = matrix[9];
    var matrix10 = matrix[10];
    var vX = matrix[12];
    var vY = matrix[13];
    var vZ = matrix[14];
    var x = -matrix0 * vX - matrix1 * vY - matrix2 * vZ;
    var y = -matrix4 * vX - matrix5 * vY - matrix6 * vZ;
    var z = -matrix8 * vX - matrix9 * vY - matrix10 * vZ;
    result[0] = matrix0;
    result[1] = matrix4;
    result[2] = matrix8;
    result[3] = 0.0;
    result[4] = matrix1;
    result[5] = matrix5;
    result[6] = matrix9;
    result[7] = 0.0;
    result[8] = matrix2;
    result[9] = matrix6;
    result[10] = matrix10;
    result[11] = 0.0;
    result[12] = x;
    result[13] = y;
    result[14] = z;
    result[15] = 1.0;
    return result;
  };
  Matrix4.IDENTITY = freezeObject(new Matrix4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0));
  Matrix4.ZERO = freezeObject(new Matrix4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0));
  Matrix4.COLUMN0ROW0 = 0;
  Matrix4.COLUMN0ROW1 = 1;
  Matrix4.COLUMN0ROW2 = 2;
  Matrix4.COLUMN0ROW3 = 3;
  Matrix4.COLUMN1ROW0 = 4;
  Matrix4.COLUMN1ROW1 = 5;
  Matrix4.COLUMN1ROW2 = 6;
  Matrix4.COLUMN1ROW3 = 7;
  Matrix4.COLUMN2ROW0 = 8;
  Matrix4.COLUMN2ROW1 = 9;
  Matrix4.COLUMN2ROW2 = 10;
  Matrix4.COLUMN2ROW3 = 11;
  Matrix4.COLUMN3ROW0 = 12;
  Matrix4.COLUMN3ROW1 = 13;
  Matrix4.COLUMN3ROW2 = 14;
  Matrix4.COLUMN3ROW3 = 15;
  defineProperties(Matrix4.prototype, {length: {get: function() {
        return Matrix4.packedLength;
      }}});
  Matrix4.prototype.clone = function(result) {
    return Matrix4.clone(this, result);
  };
  Matrix4.prototype.equals = function(right) {
    return Matrix4.equals(this, right);
  };
  Matrix4.equalsArray = function(matrix, array, offset) {
    return matrix[0] === array[offset] && matrix[1] === array[offset + 1] && matrix[2] === array[offset + 2] && matrix[3] === array[offset + 3] && matrix[4] === array[offset + 4] && matrix[5] === array[offset + 5] && matrix[6] === array[offset + 6] && matrix[7] === array[offset + 7] && matrix[8] === array[offset + 8] && matrix[9] === array[offset + 9] && matrix[10] === array[offset + 10] && matrix[11] === array[offset + 11] && matrix[12] === array[offset + 12] && matrix[13] === array[offset + 13] && matrix[14] === array[offset + 14] && matrix[15] === array[offset + 15];
  };
  Matrix4.prototype.equalsEpsilon = function(right, epsilon) {
    return Matrix4.equalsEpsilon(this, right, epsilon);
  };
  Matrix4.prototype.toString = function() {
    return '(' + this[0] + ', ' + this[4] + ', ' + this[8] + ', ' + this[12] + ')\n' + '(' + this[1] + ', ' + this[5] + ', ' + this[9] + ', ' + this[13] + ')\n' + '(' + this[2] + ', ' + this[6] + ', ' + this[10] + ', ' + this[14] + ')\n' + '(' + this[3] + ', ' + this[7] + ', ' + this[11] + ', ' + this[15] + ')';
  };
  return Matrix4;
});

})();
(function() {
var define = $__System.amdDefine;
define("6d", [], function() {
  var MersenneTwister = function(seed) {
    if (seed == undefined) {
      seed = new Date().getTime();
    }
    this.N = 624;
    this.M = 397;
    this.MATRIX_A = 0x9908b0df;
    this.UPPER_MASK = 0x80000000;
    this.LOWER_MASK = 0x7fffffff;
    this.mt = new Array(this.N);
    this.mti = this.N + 1;
    this.init_genrand(seed);
  };
  MersenneTwister.prototype.init_genrand = function(s) {
    this.mt[0] = s >>> 0;
    for (this.mti = 1; this.mti < this.N; this.mti++) {
      var s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
      this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + this.mti;
      this.mt[this.mti] >>>= 0;
    }
  };
  MersenneTwister.prototype.genrand_int32 = function() {
    var y;
    var mag01 = new Array(0x0, this.MATRIX_A);
    if (this.mti >= this.N) {
      var kk;
      if (this.mti == this.N + 1)
        this.init_genrand(5489);
      for (kk = 0; kk < this.N - this.M; kk++) {
        y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
        this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      for (; kk < this.N - 1; kk++) {
        y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
        this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
      this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];
      this.mti = 0;
    }
    y = this.mt[this.mti++];
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);
    return y >>> 0;
  };
  MersenneTwister.prototype.random = function() {
    return this.genrand_int32() * (1.0 / 4294967296.0);
  };
  return MersenneTwister;
});

})();
(function() {
var define = $__System.amdDefine;
define("23", ["1f"], function(freezeObject) {
  'use strict';
  function defaultValue(a, b) {
    if (a !== undefined) {
      return a;
    }
    return b;
  }
  defaultValue.EMPTY_OBJECT = freezeObject({});
  return defaultValue;
});

})();
(function() {
var define = $__System.amdDefine;
define("27", ["6d", "23", "1a", "1c"], function(MersenneTwister, defaultValue, defined, DeveloperError) {
  'use strict';
  var CesiumMath = {};
  CesiumMath.EPSILON1 = 0.1;
  CesiumMath.EPSILON2 = 0.01;
  CesiumMath.EPSILON3 = 0.001;
  CesiumMath.EPSILON4 = 0.0001;
  CesiumMath.EPSILON5 = 0.00001;
  CesiumMath.EPSILON6 = 0.000001;
  CesiumMath.EPSILON7 = 0.0000001;
  CesiumMath.EPSILON8 = 0.00000001;
  CesiumMath.EPSILON9 = 0.000000001;
  CesiumMath.EPSILON10 = 0.0000000001;
  CesiumMath.EPSILON11 = 0.00000000001;
  CesiumMath.EPSILON12 = 0.000000000001;
  CesiumMath.EPSILON13 = 0.0000000000001;
  CesiumMath.EPSILON14 = 0.00000000000001;
  CesiumMath.EPSILON15 = 0.000000000000001;
  CesiumMath.EPSILON16 = 0.0000000000000001;
  CesiumMath.EPSILON17 = 0.00000000000000001;
  CesiumMath.EPSILON18 = 0.000000000000000001;
  CesiumMath.EPSILON19 = 0.0000000000000000001;
  CesiumMath.EPSILON20 = 0.00000000000000000001;
  CesiumMath.GRAVITATIONALPARAMETER = 3.986004418e14;
  CesiumMath.SOLAR_RADIUS = 6.955e8;
  CesiumMath.LUNAR_RADIUS = 1737400.0;
  CesiumMath.SIXTY_FOUR_KILOBYTES = 64 * 1024;
  CesiumMath.sign = function(value) {
    if (value > 0) {
      return 1;
    }
    if (value < 0) {
      return -1;
    }
    return 0;
  };
  CesiumMath.signNotZero = function(value) {
    return value < 0.0 ? -1.0 : 1.0;
  };
  CesiumMath.toSNorm = function(value) {
    return Math.round((CesiumMath.clamp(value, -1.0, 1.0) * 0.5 + 0.5) * 255.0);
  };
  CesiumMath.fromSNorm = function(value) {
    return CesiumMath.clamp(value, 0.0, 255.0) / 255.0 * 2.0 - 1.0;
  };
  CesiumMath.sinh = function(value) {
    var part1 = Math.pow(Math.E, value);
    var part2 = Math.pow(Math.E, -1.0 * value);
    return (part1 - part2) * 0.5;
  };
  CesiumMath.cosh = function(value) {
    var part1 = Math.pow(Math.E, value);
    var part2 = Math.pow(Math.E, -1.0 * value);
    return (part1 + part2) * 0.5;
  };
  CesiumMath.lerp = function(p, q, time) {
    return ((1.0 - time) * p) + (time * q);
  };
  CesiumMath.PI = Math.PI;
  CesiumMath.ONE_OVER_PI = 1.0 / Math.PI;
  CesiumMath.PI_OVER_TWO = Math.PI * 0.5;
  CesiumMath.PI_OVER_THREE = Math.PI / 3.0;
  CesiumMath.PI_OVER_FOUR = Math.PI / 4.0;
  CesiumMath.PI_OVER_SIX = Math.PI / 6.0;
  CesiumMath.THREE_PI_OVER_TWO = (3.0 * Math.PI) * 0.5;
  CesiumMath.TWO_PI = 2.0 * Math.PI;
  CesiumMath.ONE_OVER_TWO_PI = 1.0 / (2.0 * Math.PI);
  CesiumMath.RADIANS_PER_DEGREE = Math.PI / 180.0;
  CesiumMath.DEGREES_PER_RADIAN = 180.0 / Math.PI;
  CesiumMath.RADIANS_PER_ARCSECOND = CesiumMath.RADIANS_PER_DEGREE / 3600.0;
  CesiumMath.toRadians = function(degrees) {
    if (!defined(degrees)) {
      throw new DeveloperError('degrees is required.');
    }
    return degrees * CesiumMath.RADIANS_PER_DEGREE;
  };
  CesiumMath.toDegrees = function(radians) {
    if (!defined(radians)) {
      throw new DeveloperError('radians is required.');
    }
    return radians * CesiumMath.DEGREES_PER_RADIAN;
  };
  CesiumMath.convertLongitudeRange = function(angle) {
    if (!defined(angle)) {
      throw new DeveloperError('angle is required.');
    }
    var twoPi = CesiumMath.TWO_PI;
    var simplified = angle - Math.floor(angle / twoPi) * twoPi;
    if (simplified < -Math.PI) {
      return simplified + twoPi;
    }
    if (simplified >= Math.PI) {
      return simplified - twoPi;
    }
    return simplified;
  };
  CesiumMath.negativePiToPi = function(x) {
    if (!defined(x)) {
      throw new DeveloperError('x is required.');
    }
    return CesiumMath.zeroToTwoPi(x + CesiumMath.PI) - CesiumMath.PI;
  };
  CesiumMath.zeroToTwoPi = function(x) {
    if (!defined(x)) {
      throw new DeveloperError('x is required.');
    }
    var mod = CesiumMath.mod(x, CesiumMath.TWO_PI);
    if (Math.abs(mod) < CesiumMath.EPSILON14 && Math.abs(x) > CesiumMath.EPSILON14) {
      return CesiumMath.TWO_PI;
    }
    return mod;
  };
  CesiumMath.mod = function(m, n) {
    if (!defined(m)) {
      throw new DeveloperError('m is required.');
    }
    if (!defined(n)) {
      throw new DeveloperError('n is required.');
    }
    return ((m % n) + n) % n;
  };
  CesiumMath.equalsEpsilon = function(left, right, relativeEpsilon, absoluteEpsilon) {
    if (!defined(left)) {
      throw new DeveloperError('left is required.');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required.');
    }
    if (!defined(relativeEpsilon)) {
      throw new DeveloperError('relativeEpsilon is required.');
    }
    absoluteEpsilon = defaultValue(absoluteEpsilon, relativeEpsilon);
    var absDiff = Math.abs(left - right);
    return absDiff <= absoluteEpsilon || absDiff <= relativeEpsilon * Math.max(Math.abs(left), Math.abs(right));
  };
  var factorials = [1];
  CesiumMath.factorial = function(n) {
    if (typeof n !== 'number' || n < 0) {
      throw new DeveloperError('A number greater than or equal to 0 is required.');
    }
    var length = factorials.length;
    if (n >= length) {
      var sum = factorials[length - 1];
      for (var i = length; i <= n; i++) {
        factorials.push(sum * i);
      }
    }
    return factorials[n];
  };
  CesiumMath.incrementWrap = function(n, maximumValue, minimumValue) {
    minimumValue = defaultValue(minimumValue, 0.0);
    if (!defined(n)) {
      throw new DeveloperError('n is required.');
    }
    if (maximumValue <= minimumValue) {
      throw new DeveloperError('maximumValue must be greater than minimumValue.');
    }
    ++n;
    if (n > maximumValue) {
      n = minimumValue;
    }
    return n;
  };
  CesiumMath.isPowerOfTwo = function(n) {
    if (typeof n !== 'number' || n < 0) {
      throw new DeveloperError('A number greater than or equal to 0 is required.');
    }
    return (n !== 0) && ((n & (n - 1)) === 0);
  };
  CesiumMath.nextPowerOfTwo = function(n) {
    if (typeof n !== 'number' || n < 0) {
      throw new DeveloperError('A number greater than or equal to 0 is required.');
    }
    --n;
    n |= n >> 1;
    n |= n >> 2;
    n |= n >> 4;
    n |= n >> 8;
    n |= n >> 16;
    ++n;
    return n;
  };
  CesiumMath.clamp = function(value, min, max) {
    if (!defined(value)) {
      throw new DeveloperError('value is required');
    }
    if (!defined(min)) {
      throw new DeveloperError('min is required.');
    }
    if (!defined(max)) {
      throw new DeveloperError('max is required.');
    }
    return value < min ? min : value > max ? max : value;
  };
  var randomNumberGenerator = new MersenneTwister();
  CesiumMath.setRandomNumberSeed = function(seed) {
    if (!defined(seed)) {
      throw new DeveloperError('seed is required.');
    }
    randomNumberGenerator = new MersenneTwister(seed);
  };
  CesiumMath.nextRandomNumber = function() {
    return randomNumberGenerator.random();
  };
  CesiumMath.acosClamped = function(value) {
    if (!defined(value)) {
      throw new DeveloperError('value is required.');
    }
    return Math.acos(CesiumMath.clamp(value, -1.0, 1.0));
  };
  CesiumMath.asinClamped = function(value) {
    if (!defined(value)) {
      throw new DeveloperError('value is required.');
    }
    return Math.asin(CesiumMath.clamp(value, -1.0, 1.0));
  };
  CesiumMath.chordLength = function(angle, radius) {
    if (!defined(angle)) {
      throw new DeveloperError('angle is required.');
    }
    if (!defined(radius)) {
      throw new DeveloperError('radius is required.');
    }
    return 2.0 * radius * Math.sin(angle * 0.5);
  };
  CesiumMath.logBase = function(number, base) {
    if (!defined(number)) {
      throw new DeveloperError('number is required.');
    }
    if (!defined(base)) {
      throw new DeveloperError('base is required.');
    }
    return Math.log(number) / Math.log(base);
  };
  CesiumMath.fog = function(distanceToCamera, density) {
    var scalar = distanceToCamera * density;
    return 1.0 - Math.exp(-(scalar * scalar));
  };
  return CesiumMath;
});

})();
(function() {
var define = $__System.amdDefine;
define("2c", ["23", "1a", "1c", "1f", "27"], function(defaultValue, defined, DeveloperError, freezeObject, CesiumMath) {
  'use strict';
  function Cartesian3(x, y, z) {
    this.x = defaultValue(x, 0.0);
    this.y = defaultValue(y, 0.0);
    this.z = defaultValue(z, 0.0);
  }
  Cartesian3.fromSpherical = function(spherical, result) {
    if (!defined(spherical)) {
      throw new DeveloperError('spherical is required');
    }
    if (!defined(result)) {
      result = new Cartesian3();
    }
    var clock = spherical.clock;
    var cone = spherical.cone;
    var magnitude = defaultValue(spherical.magnitude, 1.0);
    var radial = magnitude * Math.sin(cone);
    result.x = radial * Math.cos(clock);
    result.y = radial * Math.sin(clock);
    result.z = magnitude * Math.cos(cone);
    return result;
  };
  Cartesian3.fromElements = function(x, y, z, result) {
    if (!defined(result)) {
      return new Cartesian3(x, y, z);
    }
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  };
  Cartesian3.clone = function(cartesian, result) {
    if (!defined(cartesian)) {
      return undefined;
    }
    if (!defined(result)) {
      return new Cartesian3(cartesian.x, cartesian.y, cartesian.z);
    }
    result.x = cartesian.x;
    result.y = cartesian.y;
    result.z = cartesian.z;
    return result;
  };
  Cartesian3.fromCartesian4 = Cartesian3.clone;
  Cartesian3.packedLength = 3;
  Cartesian3.pack = function(value, array, startingIndex) {
    if (!defined(value)) {
      throw new DeveloperError('value is required');
    }
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    startingIndex = defaultValue(startingIndex, 0);
    array[startingIndex++] = value.x;
    array[startingIndex++] = value.y;
    array[startingIndex] = value.z;
  };
  Cartesian3.unpack = function(array, startingIndex, result) {
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    startingIndex = defaultValue(startingIndex, 0);
    if (!defined(result)) {
      result = new Cartesian3();
    }
    result.x = array[startingIndex++];
    result.y = array[startingIndex++];
    result.z = array[startingIndex];
    return result;
  };
  Cartesian3.packArray = function(array, result) {
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    var length = array.length;
    if (!defined(result)) {
      result = new Array(length * 3);
    } else {
      result.length = length * 3;
    }
    for (var i = 0; i < length; ++i) {
      Cartesian3.pack(array[i], result, i * 3);
    }
    return result;
  };
  Cartesian3.unpackArray = function(array, result) {
    if (!defined(array)) {
      throw new DeveloperError('array is required');
    }
    var length = array.length;
    if (!defined(result)) {
      result = new Array(length / 3);
    } else {
      result.length = length / 3;
    }
    for (var i = 0; i < length; i += 3) {
      var index = i / 3;
      result[index] = Cartesian3.unpack(array, i, result[index]);
    }
    return result;
  };
  Cartesian3.fromArray = Cartesian3.unpack;
  Cartesian3.maximumComponent = function(cartesian) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    return Math.max(cartesian.x, cartesian.y, cartesian.z);
  };
  Cartesian3.minimumComponent = function(cartesian) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    return Math.min(cartesian.x, cartesian.y, cartesian.z);
  };
  Cartesian3.minimumByComponent = function(first, second, result) {
    if (!defined(first)) {
      throw new DeveloperError('first is required.');
    }
    if (!defined(second)) {
      throw new DeveloperError('second is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    result.x = Math.min(first.x, second.x);
    result.y = Math.min(first.y, second.y);
    result.z = Math.min(first.z, second.z);
    return result;
  };
  Cartesian3.maximumByComponent = function(first, second, result) {
    if (!defined(first)) {
      throw new DeveloperError('first is required.');
    }
    if (!defined(second)) {
      throw new DeveloperError('second is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    result.x = Math.max(first.x, second.x);
    result.y = Math.max(first.y, second.y);
    result.z = Math.max(first.z, second.z);
    return result;
  };
  Cartesian3.magnitudeSquared = function(cartesian) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    return cartesian.x * cartesian.x + cartesian.y * cartesian.y + cartesian.z * cartesian.z;
  };
  Cartesian3.magnitude = function(cartesian) {
    return Math.sqrt(Cartesian3.magnitudeSquared(cartesian));
  };
  var distanceScratch = new Cartesian3();
  Cartesian3.distance = function(left, right) {
    if (!defined(left) || !defined(right)) {
      throw new DeveloperError('left and right are required.');
    }
    Cartesian3.subtract(left, right, distanceScratch);
    return Cartesian3.magnitude(distanceScratch);
  };
  Cartesian3.distanceSquared = function(left, right) {
    if (!defined(left) || !defined(right)) {
      throw new DeveloperError('left and right are required.');
    }
    Cartesian3.subtract(left, right, distanceScratch);
    return Cartesian3.magnitudeSquared(distanceScratch);
  };
  Cartesian3.normalize = function(cartesian, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var magnitude = Cartesian3.magnitude(cartesian);
    result.x = cartesian.x / magnitude;
    result.y = cartesian.y / magnitude;
    result.z = cartesian.z / magnitude;
    return result;
  };
  Cartesian3.dot = function(left, right) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    return left.x * right.x + left.y * right.y + left.z * right.z;
  };
  Cartesian3.multiplyComponents = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = left.x * right.x;
    result.y = left.y * right.y;
    result.z = left.z * right.z;
    return result;
  };
  Cartesian3.add = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = left.x + right.x;
    result.y = left.y + right.y;
    result.z = left.z + right.z;
    return result;
  };
  Cartesian3.subtract = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = left.x - right.x;
    result.y = left.y - right.y;
    result.z = left.z - right.z;
    return result;
  };
  Cartesian3.multiplyByScalar = function(cartesian, scalar, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (typeof scalar !== 'number') {
      throw new DeveloperError('scalar is required and must be a number.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = cartesian.x * scalar;
    result.y = cartesian.y * scalar;
    result.z = cartesian.z * scalar;
    return result;
  };
  Cartesian3.divideByScalar = function(cartesian, scalar, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (typeof scalar !== 'number') {
      throw new DeveloperError('scalar is required and must be a number.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = cartesian.x / scalar;
    result.y = cartesian.y / scalar;
    result.z = cartesian.z / scalar;
    return result;
  };
  Cartesian3.negate = function(cartesian, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = -cartesian.x;
    result.y = -cartesian.y;
    result.z = -cartesian.z;
    return result;
  };
  Cartesian3.abs = function(cartesian, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    result.x = Math.abs(cartesian.x);
    result.y = Math.abs(cartesian.y);
    result.z = Math.abs(cartesian.z);
    return result;
  };
  var lerpScratch = new Cartesian3();
  Cartesian3.lerp = function(start, end, t, result) {
    if (!defined(start)) {
      throw new DeveloperError('start is required.');
    }
    if (!defined(end)) {
      throw new DeveloperError('end is required.');
    }
    if (typeof t !== 'number') {
      throw new DeveloperError('t is required and must be a number.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    Cartesian3.multiplyByScalar(end, t, lerpScratch);
    result = Cartesian3.multiplyByScalar(start, 1.0 - t, result);
    return Cartesian3.add(lerpScratch, result, result);
  };
  var angleBetweenScratch = new Cartesian3();
  var angleBetweenScratch2 = new Cartesian3();
  Cartesian3.angleBetween = function(left, right) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    Cartesian3.normalize(left, angleBetweenScratch);
    Cartesian3.normalize(right, angleBetweenScratch2);
    var cosine = Cartesian3.dot(angleBetweenScratch, angleBetweenScratch2);
    var sine = Cartesian3.magnitude(Cartesian3.cross(angleBetweenScratch, angleBetweenScratch2, angleBetweenScratch));
    return Math.atan2(sine, cosine);
  };
  var mostOrthogonalAxisScratch = new Cartesian3();
  Cartesian3.mostOrthogonalAxis = function(cartesian, result) {
    if (!defined(cartesian)) {
      throw new DeveloperError('cartesian is required.');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required.');
    }
    var f = Cartesian3.normalize(cartesian, mostOrthogonalAxisScratch);
    Cartesian3.abs(f, f);
    if (f.x <= f.y) {
      if (f.x <= f.z) {
        result = Cartesian3.clone(Cartesian3.UNIT_X, result);
      } else {
        result = Cartesian3.clone(Cartesian3.UNIT_Z, result);
      }
    } else {
      if (f.y <= f.z) {
        result = Cartesian3.clone(Cartesian3.UNIT_Y, result);
      } else {
        result = Cartesian3.clone(Cartesian3.UNIT_Z, result);
      }
    }
    return result;
  };
  Cartesian3.equals = function(left, right) {
    return (left === right) || ((defined(left)) && (defined(right)) && (left.x === right.x) && (left.y === right.y) && (left.z === right.z));
  };
  Cartesian3.equalsArray = function(cartesian, array, offset) {
    return cartesian.x === array[offset] && cartesian.y === array[offset + 1] && cartesian.z === array[offset + 2];
  };
  Cartesian3.equalsEpsilon = function(left, right, relativeEpsilon, absoluteEpsilon) {
    return (left === right) || (defined(left) && defined(right) && CesiumMath.equalsEpsilon(left.x, right.x, relativeEpsilon, absoluteEpsilon) && CesiumMath.equalsEpsilon(left.y, right.y, relativeEpsilon, absoluteEpsilon) && CesiumMath.equalsEpsilon(left.z, right.z, relativeEpsilon, absoluteEpsilon));
  };
  Cartesian3.cross = function(left, right, result) {
    if (!defined(left)) {
      throw new DeveloperError('left is required');
    }
    if (!defined(right)) {
      throw new DeveloperError('right is required');
    }
    if (!defined(result)) {
      throw new DeveloperError('result is required');
    }
    var leftX = left.x;
    var leftY = left.y;
    var leftZ = left.z;
    var rightX = right.x;
    var rightY = right.y;
    var rightZ = right.z;
    var x = leftY * rightZ - leftZ * rightY;
    var y = leftZ * rightX - leftX * rightZ;
    var z = leftX * rightY - leftY * rightX;
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  };
  Cartesian3.fromDegrees = function(longitude, latitude, height, ellipsoid, result) {
    if (!defined(longitude)) {
      throw new DeveloperError('longitude is required');
    }
    if (!defined(latitude)) {
      throw new DeveloperError('latitude is required');
    }
    var lon = CesiumMath.toRadians(longitude);
    var lat = CesiumMath.toRadians(latitude);
    return Cartesian3.fromRadians(lon, lat, height, ellipsoid, result);
  };
  var scratchN = new Cartesian3();
  var scratchK = new Cartesian3();
  var wgs84RadiiSquared = new Cartesian3(6378137.0 * 6378137.0, 6378137.0 * 6378137.0, 6356752.3142451793 * 6356752.3142451793);
  Cartesian3.fromRadians = function(longitude, latitude, height, ellipsoid, result) {
    if (!defined(longitude)) {
      throw new DeveloperError('longitude is required');
    }
    if (!defined(latitude)) {
      throw new DeveloperError('latitude is required');
    }
    height = defaultValue(height, 0.0);
    var radiiSquared = defined(ellipsoid) ? ellipsoid.radiiSquared : wgs84RadiiSquared;
    var cosLatitude = Math.cos(latitude);
    scratchN.x = cosLatitude * Math.cos(longitude);
    scratchN.y = cosLatitude * Math.sin(longitude);
    scratchN.z = Math.sin(latitude);
    scratchN = Cartesian3.normalize(scratchN, scratchN);
    Cartesian3.multiplyComponents(radiiSquared, scratchN, scratchK);
    var gamma = Math.sqrt(Cartesian3.dot(scratchN, scratchK));
    scratchK = Cartesian3.divideByScalar(scratchK, gamma, scratchK);
    scratchN = Cartesian3.multiplyByScalar(scratchN, height, scratchN);
    if (!defined(result)) {
      result = new Cartesian3();
    }
    return Cartesian3.add(scratchK, scratchN, result);
  };
  Cartesian3.fromDegreesArray = function(coordinates, ellipsoid, result) {
    if (!defined(coordinates)) {
      throw new DeveloperError('positions is required.');
    }
    var pos = new Array(coordinates.length);
    for (var i = 0; i < coordinates.length; i++) {
      pos[i] = CesiumMath.toRadians(coordinates[i]);
    }
    return Cartesian3.fromRadiansArray(pos, ellipsoid, result);
  };
  Cartesian3.fromRadiansArray = function(coordinates, ellipsoid, result) {
    if (!defined(coordinates)) {
      throw new DeveloperError('positions is required.');
    }
    if (coordinates.length < 2) {
      throw new DeveloperError('positions length cannot be less than 2.');
    }
    if (coordinates.length % 2 !== 0) {
      throw new DeveloperError('positions length must be a multiple of 2.');
    }
    var length = coordinates.length;
    if (!defined(result)) {
      result = new Array(length / 2);
    } else {
      result.length = length / 2;
    }
    for (var i = 0; i < length; i += 2) {
      var lon = coordinates[i];
      var lat = coordinates[i + 1];
      result[i / 2] = Cartesian3.fromRadians(lon, lat, 0, ellipsoid, result[i / 2]);
    }
    return result;
  };
  Cartesian3.fromDegreesArrayHeights = function(coordinates, ellipsoid, result) {
    if (!defined(coordinates)) {
      throw new DeveloperError('positions is required.');
    }
    if (coordinates.length < 3) {
      throw new DeveloperError('positions length cannot be less than 3.');
    }
    if (coordinates.length % 3 !== 0) {
      throw new DeveloperError('positions length must be a multiple of 3.');
    }
    var pos = new Array(coordinates.length);
    for (var i = 0; i < coordinates.length; i += 3) {
      pos[i] = CesiumMath.toRadians(coordinates[i]);
      pos[i + 1] = CesiumMath.toRadians(coordinates[i + 1]);
      pos[i + 2] = coordinates[i + 2];
    }
    return Cartesian3.fromRadiansArrayHeights(pos, ellipsoid, result);
  };
  Cartesian3.fromRadiansArrayHeights = function(coordinates, ellipsoid, result) {
    if (!defined(coordinates)) {
      throw new DeveloperError('positions is required.');
    }
    if (coordinates.length < 3) {
      throw new DeveloperError('positions length cannot be less than 3.');
    }
    if (coordinates.length % 3 !== 0) {
      throw new DeveloperError('positions length must be a multiple of 3.');
    }
    var length = coordinates.length;
    if (!defined(result)) {
      result = new Array(length / 3);
    } else {
      result.length = length / 3;
    }
    for (var i = 0; i < length; i += 3) {
      var lon = coordinates[i];
      var lat = coordinates[i + 1];
      var alt = coordinates[i + 2];
      result[i / 3] = Cartesian3.fromRadians(lon, lat, alt, ellipsoid, result[i / 3]);
    }
    return result;
  };
  Cartesian3.ZERO = freezeObject(new Cartesian3(0.0, 0.0, 0.0));
  Cartesian3.UNIT_X = freezeObject(new Cartesian3(1.0, 0.0, 0.0));
  Cartesian3.UNIT_Y = freezeObject(new Cartesian3(0.0, 1.0, 0.0));
  Cartesian3.UNIT_Z = freezeObject(new Cartesian3(0.0, 0.0, 1.0));
  Cartesian3.prototype.clone = function(result) {
    return Cartesian3.clone(this, result);
  };
  Cartesian3.prototype.equals = function(right) {
    return Cartesian3.equals(this, right);
  };
  Cartesian3.prototype.equalsEpsilon = function(right, relativeEpsilon, absoluteEpsilon) {
    return Cartesian3.equalsEpsilon(this, right, relativeEpsilon, absoluteEpsilon);
  };
  Cartesian3.prototype.toString = function() {
    return '(' + this.x + ', ' + this.y + ', ' + this.z + ')';
  };
  return Cartesian3;
});

})();
(function() {
var define = $__System.amdDefine;
define("1c", ["1a"], function(defined) {
  'use strict';
  function DeveloperError(message) {
    this.name = 'DeveloperError';
    this.message = message;
    var stack;
    try {
      throw new Error();
    } catch (e) {
      stack = e.stack;
    }
    this.stack = stack;
  }
  if (defined(Object.create)) {
    DeveloperError.prototype = Object.create(Error.prototype);
    DeveloperError.prototype.constructor = DeveloperError;
  }
  DeveloperError.prototype.toString = function() {
    var str = this.name + ': ' + this.message;
    if (defined(this.stack)) {
      str += '\n' + this.stack.toString();
    }
    return str;
  };
  DeveloperError.throwInstantiationError = function() {
    throw new DeveloperError('This function defines an interface and should not be called directly.');
  };
  return DeveloperError;
});

})();
(function() {
var define = $__System.amdDefine;
define("1a", [], function() {
  'use strict';
  function defined(value) {
    return value !== undefined && value !== null;
  }
  return defined;
});

})();
(function() {
var define = $__System.amdDefine;
define("1f", ["1a"], function(defined) {
  'use strict';
  var freezeObject = Object.freeze;
  if (!defined(freezeObject)) {
    freezeObject = function(o) {
      return o;
    };
  }
  return freezeObject;
});

})();
(function() {
var define = $__System.amdDefine;
define("44", ["2c", "1a", "1c", "1f"], function(Cartesian3, defined, DeveloperError, freezeObject) {
  'use strict';
  function Plane(normal, distance) {
    if (!defined(normal)) {
      throw new DeveloperError('normal is required.');
    }
    if (!defined(distance)) {
      throw new DeveloperError('distance is required.');
    }
    this.normal = Cartesian3.clone(normal);
    this.distance = distance;
  }
  Plane.fromPointNormal = function(point, normal, result) {
    if (!defined(point)) {
      throw new DeveloperError('point is required.');
    }
    if (!defined(normal)) {
      throw new DeveloperError('normal is required.');
    }
    var distance = -Cartesian3.dot(normal, point);
    if (!defined(result)) {
      return new Plane(normal, distance);
    }
    Cartesian3.clone(normal, result.normal);
    result.distance = distance;
    return result;
  };
  var scratchNormal = new Cartesian3();
  Plane.fromCartesian4 = function(coefficients, result) {
    if (!defined(coefficients)) {
      throw new DeveloperError('coefficients is required.');
    }
    var normal = Cartesian3.fromCartesian4(coefficients, scratchNormal);
    var distance = coefficients.w;
    if (!defined(result)) {
      return new Plane(normal, distance);
    } else {
      Cartesian3.clone(normal, result.normal);
      result.distance = distance;
      return result;
    }
  };
  Plane.getPointDistance = function(plane, point) {
    if (!defined(plane)) {
      throw new DeveloperError('plane is required.');
    }
    if (!defined(point)) {
      throw new DeveloperError('point is required.');
    }
    return Cartesian3.dot(plane.normal, point) + plane.distance;
  };
  Plane.ORIGIN_XY_PLANE = freezeObject(new Plane(Cartesian3.UNIT_Z, 0.0));
  Plane.ORIGIN_YZ_PLANE = freezeObject(new Plane(Cartesian3.UNIT_X, 0.0));
  Plane.ORIGIN_ZX_PLANE = freezeObject(new Plane(Cartesian3.UNIT_Y, 0.0));
  return Plane;
});

})();
(function() {
var define = $__System.amdDefine;
define("6e", ["2c", "3b", "23", "1a", "1c", "3c", "66", "6b", "6c", "27", "33", "44"], function(Cartesian3, Cartographic, defaultValue, defined, DeveloperError, Ellipsoid, EllipsoidGeodesic, IntersectionTests, isArray, CesiumMath, Matrix4, Plane) {
  'use strict';
  var PolylinePipeline = {};
  PolylinePipeline.numberOfPoints = function(p0, p1, minDistance) {
    var distance = Cartesian3.distance(p0, p1);
    return Math.ceil(distance / minDistance);
  };
  var cartoScratch = new Cartographic();
  PolylinePipeline.extractHeights = function(positions, ellipsoid) {
    var length = positions.length;
    var heights = new Array(length);
    for (var i = 0; i < length; i++) {
      var p = positions[i];
      heights[i] = ellipsoid.cartesianToCartographic(p, cartoScratch).height;
    }
    return heights;
  };
  var wrapLongitudeInversMatrix = new Matrix4();
  var wrapLongitudeOrigin = new Cartesian3();
  var wrapLongitudeXZNormal = new Cartesian3();
  var wrapLongitudeXZPlane = new Plane(Cartesian3.ZERO, 0.0);
  var wrapLongitudeYZNormal = new Cartesian3();
  var wrapLongitudeYZPlane = new Plane(Cartesian3.ZERO, 0.0);
  var wrapLongitudeIntersection = new Cartesian3();
  var wrapLongitudeOffset = new Cartesian3();
  var subdivideHeightsScratchArray = [];
  function subdivideHeights(numPoints, h0, h1) {
    var heights = subdivideHeightsScratchArray;
    heights.length = numPoints;
    var i;
    if (h0 === h1) {
      for (i = 0; i < numPoints; i++) {
        heights[i] = h0;
      }
      return heights;
    }
    var dHeight = h1 - h0;
    var heightPerVertex = dHeight / numPoints;
    for (i = 0; i < numPoints; i++) {
      var h = h0 + i * heightPerVertex;
      heights[i] = h;
    }
    return heights;
  }
  var carto1 = new Cartographic();
  var carto2 = new Cartographic();
  var cartesian = new Cartesian3();
  var scaleFirst = new Cartesian3();
  var scaleLast = new Cartesian3();
  var ellipsoidGeodesic = new EllipsoidGeodesic();
  function generateCartesianArc(p0, p1, minDistance, ellipsoid, h0, h1, array, offset) {
    var first = ellipsoid.scaleToGeodeticSurface(p0, scaleFirst);
    var last = ellipsoid.scaleToGeodeticSurface(p1, scaleLast);
    var numPoints = PolylinePipeline.numberOfPoints(p0, p1, minDistance);
    var start = ellipsoid.cartesianToCartographic(first, carto1);
    var end = ellipsoid.cartesianToCartographic(last, carto2);
    var heights = subdivideHeights(numPoints, h0, h1);
    ellipsoidGeodesic.setEndPoints(start, end);
    var surfaceDistanceBetweenPoints = ellipsoidGeodesic.surfaceDistance / numPoints;
    var index = offset;
    start.height = h0;
    var cart = ellipsoid.cartographicToCartesian(start, cartesian);
    Cartesian3.pack(cart, array, index);
    index += 3;
    for (var i = 1; i < numPoints; i++) {
      var carto = ellipsoidGeodesic.interpolateUsingSurfaceDistance(i * surfaceDistanceBetweenPoints, carto2);
      carto.height = heights[i];
      cart = ellipsoid.cartographicToCartesian(carto, cartesian);
      Cartesian3.pack(cart, array, index);
      index += 3;
    }
    return index;
  }
  PolylinePipeline.wrapLongitude = function(positions, modelMatrix) {
    var cartesians = [];
    var segments = [];
    if (defined(positions) && positions.length > 0) {
      modelMatrix = defaultValue(modelMatrix, Matrix4.IDENTITY);
      var inverseModelMatrix = Matrix4.inverseTransformation(modelMatrix, wrapLongitudeInversMatrix);
      var origin = Matrix4.multiplyByPoint(inverseModelMatrix, Cartesian3.ZERO, wrapLongitudeOrigin);
      var xzNormal = Matrix4.multiplyByPointAsVector(inverseModelMatrix, Cartesian3.UNIT_Y, wrapLongitudeXZNormal);
      var xzPlane = Plane.fromPointNormal(origin, xzNormal, wrapLongitudeXZPlane);
      var yzNormal = Matrix4.multiplyByPointAsVector(inverseModelMatrix, Cartesian3.UNIT_X, wrapLongitudeYZNormal);
      var yzPlane = Plane.fromPointNormal(origin, yzNormal, wrapLongitudeYZPlane);
      var count = 1;
      cartesians.push(Cartesian3.clone(positions[0]));
      var prev = cartesians[0];
      var length = positions.length;
      for (var i = 1; i < length; ++i) {
        var cur = positions[i];
        if (Plane.getPointDistance(yzPlane, prev) < 0.0 || Plane.getPointDistance(yzPlane, cur) < 0.0) {
          var intersection = IntersectionTests.lineSegmentPlane(prev, cur, xzPlane, wrapLongitudeIntersection);
          if (defined(intersection)) {
            var offset = Cartesian3.multiplyByScalar(xzNormal, 5.0e-9, wrapLongitudeOffset);
            if (Plane.getPointDistance(xzPlane, prev) < 0.0) {
              Cartesian3.negate(offset, offset);
            }
            cartesians.push(Cartesian3.add(intersection, offset, new Cartesian3()));
            segments.push(count + 1);
            Cartesian3.negate(offset, offset);
            cartesians.push(Cartesian3.add(intersection, offset, new Cartesian3()));
            count = 1;
          }
        }
        cartesians.push(Cartesian3.clone(positions[i]));
        count++;
        prev = cur;
      }
      segments.push(count);
    }
    return {
      positions: cartesians,
      lengths: segments
    };
  };
  PolylinePipeline.generateArc = function(options) {
    if (!defined(options)) {
      options = {};
    }
    var positions = options.positions;
    if (!defined(positions)) {
      throw new DeveloperError('options.positions is required.');
    }
    var length = positions.length;
    var ellipsoid = defaultValue(options.ellipsoid, Ellipsoid.WGS84);
    var height = defaultValue(options.height, 0);
    if (length < 1) {
      return [];
    } else if (length === 1) {
      var p = ellipsoid.scaleToGeodeticSurface(positions[0], scaleFirst);
      if (height !== 0) {
        var n = ellipsoid.geodeticSurfaceNormal(p, cartesian);
        Cartesian3.multiplyByScalar(n, height, n);
        Cartesian3.add(p, n, p);
      }
      return [p.x, p.y, p.z];
    }
    var minDistance = options.minDistance;
    if (!defined(minDistance)) {
      var granularity = defaultValue(options.granularity, CesiumMath.RADIANS_PER_DEGREE);
      minDistance = CesiumMath.chordLength(granularity, ellipsoid.maximumRadius);
    }
    var numPoints = 0;
    var i;
    for (i = 0; i < length - 1; i++) {
      numPoints += PolylinePipeline.numberOfPoints(positions[i], positions[i + 1], minDistance);
    }
    var arrayLength = (numPoints + 1) * 3;
    var newPositions = new Array(arrayLength);
    var offset = 0;
    var hasHeightArray = isArray(height);
    for (i = 0; i < length - 1; i++) {
      var p0 = positions[i];
      var p1 = positions[i + 1];
      var h0 = hasHeightArray ? height[i] : height;
      var h1 = hasHeightArray ? height[i + 1] : height;
      offset = generateCartesianArc(p0, p1, minDistance, ellipsoid, h0, h1, newPositions, offset);
    }
    subdivideHeightsScratchArray.length = 0;
    var lastPoint = positions[length - 1];
    var carto = ellipsoid.cartesianToCartographic(lastPoint, carto1);
    carto.height = hasHeightArray ? height[length - 1] : height;
    var cart = ellipsoid.cartographicToCartesian(carto, cartesian);
    Cartesian3.pack(cart, newPositions, arrayLength - 3);
    return newPositions;
  };
  PolylinePipeline.generateCartesianArc = function(options) {
    var numberArray = PolylinePipeline.generateArc(options);
    var size = numberArray.length / 3;
    var newPositions = new Array(size);
    for (var i = 0; i < size; i++) {
      newPositions[i] = Cartesian3.unpack(numberArray, i * 3);
    }
    return newPositions;
  };
  return PolylinePipeline;
});

})();
// Add functionality for keeping a moving window of samples per SampledProperty,
// so that the data doesn't accumulate indefinitely
$__System.register("6f", ["a"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var cesium_imports_1;
    var after;
    function removeBeforeDate(property, time) {
        var times = property._times;
        var index = ~cesium_imports_1.binarySearch(times, time, cesium_imports_1.JulianDate.compare);
        if (index > 0) {
            times.splice(0, index);
            property._values.splice(0, index * property._innerType.packedLength);
            property._updateTableLength = true;
            property._definitionChanged.raiseEvent(property);
        }
    }
    function removeOldSamples(property, maxNumSamples) {
        if (maxNumSamples === undefined) return;
        var removeCount = property._times.length - maxNumSamples;
        if (removeCount > 0) {
            property._times.splice(0, removeCount);
            property._values.splice(0, removeCount * property._innerType.packedLength);
            property._updateTableLength = true;
        }
    }
    return {
        setters: [function (cesium_imports_1_1) {
            cesium_imports_1 = cesium_imports_1_1;
        }],
        execute: function () {
            after = function (fn, after) {
                return function () {
                    var result = fn.apply(this, arguments);
                    after.call(this, result);
                    return result;
                };
            };
            cesium_imports_1.SampledProperty.prototype.removeSamplesBeforeDate = function (time) {
                removeBeforeDate(this, time);
            };
            cesium_imports_1.SampledPositionProperty.prototype.removeSamplesBeforeDate = function (time) {
                removeBeforeDate(this._property, time);
            };
            cesium_imports_1.SampledProperty.prototype.addSample = after(cesium_imports_1.SampledProperty.prototype.addSample, function () {
                removeOldSamples(this, this.maxNumSamples);
            });
            cesium_imports_1.SampledProperty.prototype.addSamples = after(cesium_imports_1.SampledProperty.prototype.addSamples, function () {
                removeOldSamples(this, this.maxNumSamples);
            });
            cesium_imports_1.SampledProperty.prototype.addSamplesPackedArray = after(cesium_imports_1.SampledProperty.prototype.addSamplesPackedArray, function () {
                removeOldSamples(this, this.maxNumSamples);
            });
            cesium_imports_1.SampledPositionProperty.prototype.addSample = after(cesium_imports_1.SampledPositionProperty.prototype.addSample, function () {
                removeOldSamples(this._property, this.maxNumSamples);
            });
            cesium_imports_1.SampledPositionProperty.prototype.addSamples = after(cesium_imports_1.SampledPositionProperty.prototype.addSamples, function () {
                removeOldSamples(this._property, this.maxNumSamples);
            });
            cesium_imports_1.SampledPositionProperty.prototype.addSamplesPackedArray = after(cesium_imports_1.SampledPositionProperty.prototype.addSamplesPackedArray, function () {
                removeOldSamples(this._property, this.maxNumSamples);
            });
        }
    };
});
$__System.register('a', ['4c', '19', '45', '2c', '43', '21', '22', '25', '2b', '2f', '26', '23', '1a', '1c', '3c', '28', '29', '1d', '4a', '3a', '3d', '24', '27', '32', '33', '3e', '3f', '40', '2e', '36', '34', '46', '2d', '47', '48', '49', '35', '64', '6e', '6f'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (binarySearch_1_1) {
            exports_1({
                "binarySearch": binarySearch_1_1["default"]
            });
        }, function (CallbackProperty_1_1) {
            exports_1({
                "CallbackProperty": CallbackProperty_1_1["default"]
            });
        }, function (Cartesian2_1_1) {
            exports_1({
                "Cartesian2": Cartesian2_1_1["default"]
            });
        }, function (Cartesian3_1_1) {
            exports_1({
                "Cartesian3": Cartesian3_1_1["default"]
            });
        }, function (Cartesian4_1_1) {
            exports_1({
                "Cartesian4": Cartesian4_1_1["default"]
            });
        }, function (Clock_1_1) {
            exports_1({
                "Clock": Clock_1_1["default"]
            });
        }, function (ClockStep_1_1) {
            exports_1({
                "ClockStep": ClockStep_1_1["default"]
            });
        }, function (CompositeEntityCollection_1_1) {
            exports_1({
                "CompositeEntityCollection": CompositeEntityCollection_1_1["default"]
            });
        }, function (ConstantPositionProperty_1_1) {
            exports_1({
                "ConstantPositionProperty": ConstantPositionProperty_1_1["default"]
            });
        }, function (ConstantProperty_1_1) {
            exports_1({
                "ConstantProperty": ConstantProperty_1_1["default"]
            });
        }, function (createGuid_1_1) {
            exports_1({
                "createGuid": createGuid_1_1["default"]
            });
        }, function (defaultValue_1_1) {
            exports_1({
                "defaultValue": defaultValue_1_1["default"]
            });
        }, function (defined_1_1) {
            exports_1({
                "defined": defined_1_1["default"]
            });
        }, function (DeveloperError_1_1) {
            exports_1({
                "DeveloperError": DeveloperError_1_1["default"]
            });
        }, function (Ellipsoid_1_1) {
            exports_1({
                "Ellipsoid": Ellipsoid_1_1["default"]
            });
        }, function (Entity_1_1) {
            exports_1({
                "Entity": Entity_1_1["default"]
            });
        }, function (EntityCollection_1_1) {
            exports_1({
                "EntityCollection": EntityCollection_1_1["default"]
            });
        }, function (Event_1_1) {
            exports_1({
                "Event": Event_1_1["default"]
            });
        }, function (ExtrapolationType_1_1) {
            exports_1({
                "ExtrapolationType": ExtrapolationType_1_1["default"]
            });
        }, function (GeographicProjection_1_1) {
            exports_1({
                "GeographicProjection": GeographicProjection_1_1["default"]
            });
        }, function (HermitePolynomialApproximation_1_1) {
            exports_1({
                "HermitePolynomialApproximation": HermitePolynomialApproximation_1_1["default"]
            });
        }, function (JulianDate_1_1) {
            exports_1({
                "JulianDate": JulianDate_1_1["default"]
            });
        }, function (Math_1_1) {
            exports_1({
                "CesiumMath": Math_1_1["default"]
            });
        }, function (Matrix3_1_1) {
            exports_1({
                "Matrix3": Matrix3_1_1["default"]
            });
        }, function (Matrix4_1_1) {
            exports_1({
                "Matrix4": Matrix4_1_1["default"]
            });
        }, function (OrientationProperty_1_1) {
            exports_1({
                "OrientationProperty": OrientationProperty_1_1["default"]
            });
        }, function (PerspectiveFrustum_1_1) {
            exports_1({
                "PerspectiveFrustum": PerspectiveFrustum_1_1["default"]
            });
        }, function (PerspectiveOffCenterFrustum_1_1) {
            exports_1({
                "PerspectiveOffCenterFrustum": PerspectiveOffCenterFrustum_1_1["default"]
            });
        }, function (PositionProperty_1_1) {
            exports_1({
                "PositionProperty": PositionProperty_1_1["default"]
            });
        }, function (Property_1_1) {
            exports_1({
                "Property": Property_1_1["default"]
            });
        }, function (Quaternion_1_1) {
            exports_1({
                "Quaternion": Quaternion_1_1["default"]
            });
        }, function (ReferenceEntity_1_1) {
            exports_1({
                "ReferenceEntity": ReferenceEntity_1_1["default"]
            });
        }, function (ReferenceFrame_1_1) {
            exports_1({
                "ReferenceFrame": ReferenceFrame_1_1["default"]
            });
        }, function (ReferenceProperty_1_1) {
            exports_1({
                "ReferenceProperty": ReferenceProperty_1_1["default"]
            });
        }, function (SampledPositionProperty_1_1) {
            exports_1({
                "SampledPositionProperty": SampledPositionProperty_1_1["default"]
            });
        }, function (SampledProperty_1_1) {
            exports_1({
                "SampledProperty": SampledProperty_1_1["default"]
            });
        }, function (Transforms_1_1) {
            exports_1({
                "Transforms": Transforms_1_1["default"]
            });
        }, function (Simon1994PlanetaryPositions_1_1) {
            exports_1({
                "Simon1994PlanetaryPositions": Simon1994PlanetaryPositions_1_1["default"]
            });
        }, function (PolylinePipeline_1_1) {
            exports_1({
                "PolylinePipeline": PolylinePipeline_1_1["default"]
            });
        }, function (_1) {}],
        execute: function () {}
    };
});
$__System.register('12', ['1d', 'a'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var Event_1, cesium_imports_1;
    var Event, CommandQueue, getEntityPosition, getEntityOrientation, urlParser, MessageChannelLike, SynchronousMessageChannel, MessageChannelFactory, scratchPerspectiveOffCenterFrustum, scratchCartesian, scratchOrientation;
    /**
     * Get array of ancestor reference frames of a Cesium Entity.
     * @param frame A Cesium Entity to get ancestor reference frames.
     * @param frames An array of reference frames of the Cesium Entity.
     */
    function getAncestorReferenceFrames(frame) {
        var frames = [];
        var f = frame;
        while (cesium_imports_1.defined(f)) {
            frames.unshift(f);
            var position = f.position;
            f = position && position.referenceFrame;
        }
        return frames;
    }
    exports_1("getAncestorReferenceFrames", getAncestorReferenceFrames);
    /**
     * Get root reference frame of the Cesium Entity.
     * @param frames An array of reference frames of the Cesium Entity.
     * @return the first frame from ancestor reference frames array.
     */
    function getRootReferenceFrame(frame) {
        return getAncestorReferenceFrames(frame)[0];
    }
    exports_1("getRootReferenceFrame", getRootReferenceFrame);
    /**
     * Gets the value of the Position property at the provided time and in the provided reference frame.
     * @param entity The entity to get position.
     * @param time The time for which to retrieve the value.
     * @param referenceFrame The desired referenceFrame of the result.
     * @param result The object to store the value into.
     * @return The modified result parameter.
     */
    function getEntityPositionInReferenceFrame(entity, time, referenceFrame, result) {
        return entity.position && entity.position.getValueInReferenceFrame(time, referenceFrame, result);
    }
    exports_1("getEntityPositionInReferenceFrame", getEntityPositionInReferenceFrame);
    /**
     * Get the value of the Orientation property at the provided time and in the provided reference frame.
     * @param entity The entity to get position.
     * @param time The time for which to retrieve the value.
     * @param referenceFrame The desired referenceFrame of the result.
     * @param result The object to store the value into.
     * @return The modified result parameter.
     */
    function getEntityOrientationInReferenceFrame(entity, time, referenceFrame, result) {
        var entityFrame = entity.position && entity.position.referenceFrame;
        if (!cesium_imports_1.defined(entityFrame)) return undefined;
        var orientation = entity.orientation && entity.orientation.getValue(time, result);
        if (!cesium_imports_1.defined(orientation)) return undefined;
        return cesium_imports_1.OrientationProperty.convertToReferenceFrame(time, orientation, entityFrame, referenceFrame, result);
    }
    exports_1("getEntityOrientationInReferenceFrame", getEntityOrientationInReferenceFrame);
    // const scratchCartesianPositionFIXED = new Cartesian3
    // const scratchMatrix4 = new Matrix4
    // const scratchMatrix3 = new Matrix3
    //  {
    //         // if no orientation is available, calculate an orientation based on position
    //         const entityPositionFIXED = getEntityPositionInReferenceFrame(entity, time, ReferenceFrame.FIXED, scratchCartesianPositionFIXED)
    //         if (!entityPositionFIXED) return Quaternion.clone(Quaternion.IDENTITY, result)
    //         if (Cartesian3.ZERO.equals(entityPositionFIXED)) throw new Error('invalid cartographic position')
    //         const transform = Transforms.eastNorthUpToFixedFrame(entityPositionFIXED, Ellipsoid.WGS84, scratchMatrix4);
    //         const rotation = Matrix4.getRotation(transform, scratchMatrix3);
    //         const fixedOrientation = Quaternion.fromRotationMatrix(rotation, result);
    //         return OrientationProperty.convertToReferenceFrame(time, fixedOrientation, ReferenceFrame.FIXED, referenceFrame, result)
    //     }
    /**
     * Create a SerializedEntityPose from a source entity.
     * @param entity The entity which the serialized pose represents.
     * @param time The time which to retrieve the pose.
     * @param referenceFrame The reference frame to use for generating the pose.
     *  By default, uses the root reference frame of the entity.
     * @return An EntityPose object with orientation, position and referenceFrame.
     */
    function getSerializedEntityPose(entity, time, referenceFrame) {
        var frame = referenceFrame ? referenceFrame : getRootReferenceFrame(entity);
        var p = getEntityPositionInReferenceFrame(entity, time, frame, {});
        if (!p) return undefined;
        var o = getEntityOrientationInReferenceFrame(entity, time, frame, {});
        if (!o) return undefined;
        return {
            p: cesium_imports_1.Cartesian3.ZERO.equalsEpsilon(p, cesium_imports_1.CesiumMath.EPSILON16) ? 0 : p,
            o: cesium_imports_1.Quaternion.IDENTITY.equalsEpsilon(o, cesium_imports_1.CesiumMath.EPSILON16) ? 0 : o,
            r: typeof frame === 'number' ? frame : frame.id
        };
    }
    exports_1("getSerializedEntityPose", getSerializedEntityPose);
    /**
     * If urlParser does not have a value, throw error message "resolveURL requires DOM api".
     * If inURL is undefined, throw error message "expected inURL".
     * Otherwise, assign value of inURL to urlParser.href.
     * @param inURL A URL needed to be resolved.
     * @returns A URL ready to be parsed.
     */
    function resolveURL(inURL) {
        if (!urlParser) throw new Error("resolveURL requires DOM api");
        if (inURL === undefined) throw new Error('Expected inURL');
        urlParser.href = '';
        urlParser.href = inURL;
        return urlParser.href;
    }
    exports_1("resolveURL", resolveURL);
    /**
     * Parse URL to an object describing details of the URL with href, protocol,
     * hostname, port, pathname, search, hash, host.
     * @param inURL A URL needed to be parsed.
     * @return An object showing parsed URL with href, protocol,
     * hostname, port, pathname, search, hash, host.
     */
    function parseURL(inURL) {
        if (!urlParser) throw new Error("parseURL requires DOM api");
        if (inURL === undefined) throw new Error('Expected inURL');
        urlParser.href = '';
        urlParser.href = inURL;
        return {
            href: urlParser.href,
            protocol: urlParser.protocol,
            hostname: urlParser.hostname,
            port: urlParser.port,
            pathname: urlParser.pathname,
            search: urlParser.search,
            hash: urlParser.hash,
            host: urlParser.host
        };
    }
    exports_1("parseURL", parseURL);
    function decomposePerspectiveOffCenterProjectionMatrix(mat, result) {
        var m11 = mat[cesium_imports_1.Matrix4.COLUMN0ROW0];
        // const m12 = mat[Matrix4.COLUMN0ROW1];
        var m22 = mat[cesium_imports_1.Matrix4.COLUMN1ROW1];
        var m31 = mat[cesium_imports_1.Matrix4.COLUMN2ROW0];
        var m32 = mat[cesium_imports_1.Matrix4.COLUMN2ROW1];
        var m33 = mat[cesium_imports_1.Matrix4.COLUMN2ROW2];
        var m43 = mat[cesium_imports_1.Matrix4.COLUMN3ROW2];
        var near = result.near = m43 / (m33 - 1);
        result.far = m43 / (m33 + 1);
        result.bottom = near * (m32 - 1) / m22;
        result.top = near * (m32 + 1) / m22;
        result.left = near * (m31 - 1) / m11;
        result.right = near * (m31 + 1) / m11;
        return result;
    }
    exports_1("decomposePerspectiveOffCenterProjectionMatrix", decomposePerspectiveOffCenterProjectionMatrix);
    function decomposePerspectiveProjectionMatrix(mat, result) {
        var f = decomposePerspectiveOffCenterProjectionMatrix(mat, scratchPerspectiveOffCenterFrustum);
        var xOffset = (f.left + f.right) / 2;
        var yOffset = (f.top + f.bottom) / 2;
        var near = f.near;
        var far = f.far;
        // const left = f.left - xOffset;
        var right = f.right - xOffset;
        var top = f.top - yOffset;
        // const bottom = f.bottom - yOffset;
        var aspectRatio = right / top;
        var fovy = 2 * Math.atan(top / near);
        var fov;
        if (aspectRatio < 1) {
            fov = fovy;
        } else {
            fov = Math.atan(Math.tan(fovy * 0.5) * aspectRatio) * 2.0;
        }
        result.near = near;
        result.far = far;
        result.fov = fov;
        result.aspectRatio = aspectRatio;
        result.xOffset = xOffset;
        result.yOffset = yOffset;
        return result;
    }
    exports_1("decomposePerspectiveProjectionMatrix", decomposePerspectiveProjectionMatrix);
    /**
     * Convert an Entity's position and orientation properties to a new reference frame.
     * The properties must be constant properties.
     * @param entity The entity to convert.
     * @param time The time which to retrieve the pose up the reference chain.
     * @param referenceFrame The reference frame to convert the position and oriention to.
     * @return a boolean indicating success or failure.  Will be false if either property is
     * not constant, or if either property cannot be converted to the new frame.
     */
    function convertEntityReferenceFrame(entity, time, frame) {
        if (!entity.position || !(entity.position instanceof cesium_imports_1.ConstantPositionProperty) || !entity.orientation || !(entity.orientation instanceof cesium_imports_1.ConstantProperty)) {
            return false;
        }
        if (!getEntityPositionInReferenceFrame(entity, time, frame, scratchCartesian)) {
            return false;
        }
        if (!getEntityOrientationInReferenceFrame(entity, time, frame, scratchOrientation)) {
            return false;
        }
        entity.position.setValue(scratchCartesian, frame);
        entity.orientation.setValue(scratchOrientation);
        return true;
    }
    exports_1("convertEntityReferenceFrame", convertEntityReferenceFrame);
    return {
        setters: [function (Event_1_1) {
            Event_1 = Event_1_1;
        }, function (cesium_imports_1_1) {
            cesium_imports_1 = cesium_imports_1_1;
        }],
        execute: function () {
            /**
             * Provides the ability raise and subscribe to an event.
             */
            Event = function () {
                function Event() {
                    this._event = new Event_1.default();
                }
                Object.defineProperty(Event.prototype, "numberOfListeners", {
                    /**
                     * Get the number of listeners currently subscribed to the event.
                     * @return Number of listeners currently subscribed to the event.
                     */
                    get: function () {
                        return this._event.numberOfListeners;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                  * Add an event listener.
                  * @param The function to be executed when the event is raised.
                  * @return A convenience function which removes this event listener when called
                  */
                Event.prototype.addEventListener = function (listener) {
                    return this._event.addEventListener(listener);
                };
                /**
                 * Remove an event listener.
                 * @param The function to be unregistered.
                 * @return True if the listener was removed;
                 * false if the listener and scope are not registered with the event.
                 */
                Event.prototype.removeEventListener = function (listener) {
                    return this._event.removeEventListener(listener);
                };
                /**
                 * Raises the event by calling each registered listener with all supplied arguments.
                 * @param This method takes any number of parameters and passes them through to the listener functions.
                 */
                Event.prototype.raiseEvent = function (data) {
                    this._event.raiseEvent(data);
                };
                return Event;
            }();
            exports_1("Event", Event);
            /**
            * TODO.
            */
            CommandQueue = function () {
                /**
                 * If errorEvent has 1 listener, outputs the error message to the web console.
                 */
                function CommandQueue() {
                    var _this = this;
                    this._queue = [];
                    this._paused = true;
                    /**
                     * An error event.
                     */
                    this.errorEvent = new Event();
                    this.errorEvent.addEventListener(function (error) {
                        if (_this.errorEvent.numberOfListeners === 1) console.error(error);
                    });
                }
                /**
                 * Push a command to the command queue.
                 * @param command Any command ready to be pushed into the command queue.
                 */
                CommandQueue.prototype.push = function (command, execute) {
                    var _this = this;
                    var result = new Promise(function (resolve, reject) {
                        _this._queue.push({
                            command: command,
                            reject: reject,
                            execute: function () {
                                // console.log('CommandQueue: Executing command ' + command.toString());
                                var result = Promise.resolve().then(command);
                                // result.then(() => { console.log('CommandQueue: DONE ' + command.toString()) });
                                resolve(result);
                                return result;
                            }
                        });
                    });
                    if (execute) this.execute();
                    return result;
                };
                /**
                 * Execute the command queue
                 */
                CommandQueue.prototype.execute = function () {
                    var _this = this;
                    this._paused = false;
                    Promise.resolve().then(function () {
                        if (_this._queue.length > 0 && !_this._currentCommandPending) {
                            _this._executeNextCommand();
                        }
                    });
                };
                /**
                 * Puase the command queue (currently executing commands will still complete)
                 */
                CommandQueue.prototype.pause = function () {
                    this._paused = true;
                };
                /**
                 * Clear commandQueue.
                 */
                CommandQueue.prototype.clear = function () {
                    this._queue.forEach(function (item) {
                        item.reject("Unable to execute.");
                    });
                    this._queue = [];
                };
                CommandQueue.prototype._executeNextCommand = function () {
                    var _this = this;
                    this._currentCommand = undefined;
                    this._currentCommandPending = undefined;
                    if (this._paused) return;
                    var item = this._queue.shift();
                    if (!item) return;
                    this._currentCommand = item.command;
                    this._currentCommandPending = item.execute().then(this._executeNextCommand.bind(this)).catch(function (e) {
                        _this.errorEvent.raiseEvent(e);
                        _this._executeNextCommand();
                    });
                };
                return CommandQueue;
            }();
            exports_1("CommandQueue", CommandQueue);
            /**
             * Alias of getEntityPositionInReferenceFrame
             */
            exports_1("getEntityPosition", getEntityPosition = getEntityPositionInReferenceFrame);
            /**
             * Alias of getEntityOrientationInReferenceFrame
             */
            exports_1("getEntityOrientation", getEntityOrientation = getEntityOrientationInReferenceFrame);
            urlParser = typeof document !== 'undefined' ? document.createElement("a") : undefined;
            /**
             * A MessageChannel pollyfill.
             */
            MessageChannelLike = function () {
                /**
                 * Create a MessageChannelLike instance.
                 */
                function MessageChannelLike() {
                    var messageChannel = this;
                    var _portsOpen = true;
                    var _port1ready;
                    var _port2ready;
                    var _port1onmessage;
                    _port1ready = new Promise(function (resolve) {
                        messageChannel.port1 = {
                            set onmessage(func) {
                                _port1onmessage = func;
                                resolve();
                            },
                            get onmessage() {
                                return _port1onmessage;
                            },
                            postMessage: function (data) {
                                if (_portsOpen) {
                                    _port2ready.then(function () {
                                        if (messageChannel.port2.onmessage) messageChannel.port2.onmessage({ data: data });
                                    });
                                }
                            },
                            close: function () {
                                _portsOpen = false;
                            }
                        };
                    });
                    var _port2onmessage;
                    _port2ready = new Promise(function (resolve) {
                        messageChannel.port2 = {
                            set onmessage(func) {
                                _port2onmessage = func;
                                resolve();
                            },
                            get onmessage() {
                                return _port2onmessage;
                            },
                            postMessage: function (data) {
                                if (_portsOpen) {
                                    _port1ready.then(function () {
                                        if (messageChannel.port1.onmessage) messageChannel.port1.onmessage({ data: data });
                                    });
                                }
                            },
                            close: function () {
                                _portsOpen = false;
                            }
                        };
                    });
                }
                return MessageChannelLike;
            }();
            exports_1("MessageChannelLike", MessageChannelLike);
            /**
             * A synchronous MessageChannel.
             */
            SynchronousMessageChannel = function () {
                /**
                 * Create a MessageChannelLike instance.
                 */
                function SynchronousMessageChannel() {
                    var messageChannel = this;
                    var pendingMessages1 = [];
                    var onmessage1 = function (message) {
                        pendingMessages1.push(message);
                    };
                    messageChannel.port1 = {
                        get onmessage() {
                            return onmessage1;
                        },
                        set onmessage(func) {
                            onmessage1 = func;
                            pendingMessages1.forEach(function (data) {
                                return func(data);
                            });
                            pendingMessages1 = [];
                        },
                        postMessage: function (data) {
                            if (messageChannel.port2.onmessage) messageChannel.port2.onmessage({ data: data });
                        },
                        close: function () {
                            messageChannel.port1.onmessage = undefined;
                            messageChannel.port2.onmessage = undefined;
                        }
                    };
                    var pendingMessages2 = [];
                    var onmessage2 = function (message) {
                        pendingMessages2.push(message);
                    };
                    messageChannel.port2 = {
                        get onmessage() {
                            return onmessage2;
                        },
                        set onmessage(func) {
                            onmessage2 = func;
                            pendingMessages2.forEach(function (data) {
                                return func(data);
                            });
                            pendingMessages2 = [];
                        },
                        postMessage: function (data) {
                            if (messageChannel.port1.onmessage) messageChannel.port1.onmessage({ data: data });
                        },
                        close: function () {
                            messageChannel.port1.onmessage = undefined;
                            messageChannel.port2.onmessage = undefined;
                        }
                    };
                }
                return SynchronousMessageChannel;
            }();
            exports_1("SynchronousMessageChannel", SynchronousMessageChannel);
            /**
             * A factory which creates MessageChannel or MessageChannelLike instances, depending on
             * wheter or not MessageChannel is avaialble in the execution context.
             */
            MessageChannelFactory = function () {
                function MessageChannelFactory() {}
                /**
                 * Create a MessageChannel (or MessageChannelLike) instance.
                 */
                MessageChannelFactory.prototype.create = function () {
                    if (typeof MessageChannel !== 'undefined') return new MessageChannel();else return new MessageChannelLike();
                };
                /**
                 * Create a SynchronousMessageChannel instance.
                 */
                MessageChannelFactory.prototype.createSynchronous = function () {
                    return new SynchronousMessageChannel();
                };
                return MessageChannelFactory;
            }();
            exports_1("MessageChannelFactory", MessageChannelFactory);
            scratchPerspectiveOffCenterFrustum = new cesium_imports_1.PerspectiveOffCenterFrustum();
            scratchCartesian = new cesium_imports_1.Cartesian3();
            scratchOrientation = new cesium_imports_1.Quaternion();
        }
    };
});
$__System.register('1', ['2', 'c', 'a', '7', '10', 'f', 'b', '9', '14', '11', 'd', '17', '13', 'e', '15', '18', '12'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var DI, Cesium, URI, session_1, common_1, context_2, device_1, focus_1, reality_1, timer_1, view_1, vuforia_1, empty_1, live_video_1, hosted_1;
    var ArgonSystem;
    /**
     * Create an ArgonSystem instance.
     * If we are running within a [[REALITY_MANAGER]],
     * this function will create an ArgonSystem which has the [[REALITY_AUGMENTOR]] role.
     * If we are not running within a [[REALITY_MANAGER]],
     * this function will create an ArgonSystem which has the [[REALITY_MANAGER]] role.
     * @param initParameters InitParameters
     */
    function init(_a) {
        var _b = _a === void 0 ? {} : _a,
            configuration = _b.configuration,
            _c = _b.container,
            container = _c === void 0 ? new DI.Container() : _c;
        var role;
        if (typeof HTMLElement === 'undefined') {
            role = common_1.Role.REALITY_MANAGER;
        } else if (navigator.userAgent.indexOf('Argon') > 0 || window.top !== window) {
            role = common_1.Role.APPLICATION; // TODO: switch to below after next argon-app release
        } else {
            role = common_1.Role.REALITY_MANAGER;
        }
        var config = Object.assign(configuration || {}, {
            role: role
        });
        container.registerInstance('containerElement', null);
        return new ArgonSystem(config, container);
    }
    exports_1("init", init);
    /**
     * Initialize an [[ArgonSystem]] with the [[REALITY_VIEW]] role
     */
    function initReality(_a) {
        var _b = _a === void 0 ? {} : _a,
            configuration = _b.configuration,
            _c = _b.container,
            container = _c === void 0 ? new DI.Container() : _c;
        var config = Object.assign(configuration || {}, {
            role: common_1.Role.REALITY_VIEW,
            'reality.supportsControlPort': true
        });
        container.registerInstance('containerElement', null);
        return new ArgonSystem(config, container);
    }
    exports_1("initReality", initReality);
    /**
     * Not yet implemented.
     * @private
     */
    function initLocal(_a) {
        var containerElement = _a.containerElement,
            configuration = _a.configuration,
            _b = _a.container,
            container = _b === void 0 ? new DI.Container() : _b;
        var config = Object.assign(configuration || {}, {
            role: common_1.Role.REALITY_MANAGER
        });
        container.registerInstance('containerElement', containerElement);
        return new ArgonSystem(config, container);
    }
    exports_1("initLocal", initLocal);
    var exportedNames_1 = {
        'ArgonSystem': true,
        'init': true,
        'initReality': true,
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
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [function (_1) {}, function (DI_1) {
            DI = DI_1;
        }, function (Cesium_1) {
            Cesium = Cesium_1;
        }, function (URI_1) {
            URI = URI_1;
        }, function (session_1_1) {
            session_1 = session_1_1;
            exportStar_1(session_1_1);
        }, function (common_1_1) {
            common_1 = common_1_1;
            exportStar_1(common_1_1);
        }, function (context_2_1) {
            context_2 = context_2_1;
            exportStar_1(context_2_1);
        }, function (device_1_1) {
            device_1 = device_1_1;
            exportStar_1(device_1_1);
        }, function (focus_1_1) {
            focus_1 = focus_1_1;
            exportStar_1(focus_1_1);
        }, function (reality_1_1) {
            reality_1 = reality_1_1;
            exportStar_1(reality_1_1);
        }, function (timer_1_1) {
            timer_1 = timer_1_1;
            exportStar_1(timer_1_1);
        }, function (view_1_1) {
            view_1 = view_1_1;
            exportStar_1(view_1_1);
        }, function (vuforia_1_1) {
            vuforia_1 = vuforia_1_1;
            exportStar_1(vuforia_1_1);
        }, function (empty_1_1) {
            empty_1 = empty_1_1;
        }, function (live_video_1_1) {
            live_video_1 = live_video_1_1;
        }, function (hosted_1_1) {
            hosted_1 = hosted_1_1;
        }, function (utils_1_1) {
            exportStar_1(utils_1_1);
        }],
        execute: function () {
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
            ArgonSystem = function () {
                function ArgonSystem(config, container) {
                    if (container === void 0) {
                        container = new DI.Container();
                    }
                    this.container = container;
                    if (!ArgonSystem.instance) ArgonSystem.instance = this;
                    container.registerInstance('config', config);
                    container.registerInstance(ArgonSystem, this);
                    if (!container.hasResolver('containerElement')) container.registerInstance('containerElement', null);
                    if (config.role === common_1.Role.REALITY_MANAGER) {
                        container.registerSingleton(session_1.ConnectService, session_1.LoopbackConnectService);
                    } else if (session_1.WKWebViewConnectService.isAvailable()) {
                        container.registerSingleton(session_1.ConnectService, session_1.WKWebViewConnectService);
                    } else if (session_1.DOMConnectService.isAvailable()) {
                        container.registerSingleton(session_1.ConnectService, session_1.DOMConnectService);
                    } else if (session_1.DebugConnectService.isAvailable()) {
                        container.registerSingleton(session_1.ConnectService, session_1.DebugConnectService);
                    }
                    if (config.role === common_1.Role.REALITY_MANAGER) {
                        this.reality.registerLoader(container.get(empty_1.EmptyRealityLoader));
                        this.reality.registerLoader(container.get(live_video_1.LiveVideoRealityLoader));
                        if (typeof document !== 'undefined') {
                            this.reality.registerLoader(container.get(hosted_1.HostedRealityLoader));
                            // enable pinch-zoom
                            container.get(view_1.PinchZoomService);
                        }
                        this.reality.setDefault(common_1.RealityView.EMPTY);
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
            }();
            exports_1("ArgonSystem", ArgonSystem);
        }
    };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    Argon = factory();
});
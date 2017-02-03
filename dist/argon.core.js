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
$__System.register('3', [], function (_export, _context) {
  "use strict";

  var FEATURE, PLATFORM, DOM;
  function AggregateError(message, innerError, skipIfAlreadyAggregate) {
    if (innerError) {
      if (innerError.innerError && skipIfAlreadyAggregate) {
        return innerError;
      }

      var separator = '\n------------------------------------------------\n';

      message += separator + 'Inner Error:\n';

      if (typeof innerError === 'string') {
        message += 'Message: ' + innerError;
      } else {
        if (innerError.message) {
          message += 'Message: ' + innerError.message;
        } else {
          message += 'Unknown Inner Error Type. Displaying Inner Error as JSON:\n ' + JSON.stringify(innerError, null, '  ');
        }

        if (innerError.stack) {
          message += '\nInner Error Stack:\n' + innerError.stack;
          message += '\nEnd Inner Error Stack';
        }
      }

      message += separator;
    }

    var e = new Error(message);
    if (innerError) {
      e.innerError = innerError;
    }

    return e;
  }

  function initializePAL(callback) {
    if (typeof Object.getPropertyDescriptor !== 'function') {
      Object.getPropertyDescriptor = function (subject, name) {
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

  return {
    setters: [],
    execute: function () {
      _export('FEATURE', FEATURE = {});

      _export('PLATFORM', PLATFORM = {
        noop: function noop() {},
        eachModule: function eachModule() {}
      });

      PLATFORM.global = function () {
        if (typeof self !== 'undefined') {
          return self;
        }

        if (typeof global !== 'undefined') {
          return global;
        }

        return new Function('return this')();
      }();

      _export('DOM', DOM = {});

      _export('AggregateError', AggregateError);

      _export('FEATURE', FEATURE);

      _export('PLATFORM', PLATFORM);

      _export('DOM', DOM);

      _export('initializePAL', initializePAL);
    }
  };
});
(function() {
var define = $__System.amdDefine;
define("4", ["5", "6", "7", "8"], function(defined, defineProperties, DeveloperError, Event) {
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
define("9", ["a", "5", "6", "b", "7", "c", "d", "e", "f", "10"], function(Cartesian2, defined, defineProperties, destroyObject, DeveloperError, KeyboardEventModifier, CesiumMath, ScreenSpaceEventHandler, ScreenSpaceEventType, CameraEventType) {
  'use strict';
  function getKey(type, modifier) {
    var key = type;
    if (defined(modifier)) {
      key += '+' + modifier;
    }
    return key;
  }
  function clonePinchMovement(pinchMovement, result) {
    Cartesian2.clone(pinchMovement.distance.startPosition, result.distance.startPosition);
    Cartesian2.clone(pinchMovement.distance.endPosition, result.distance.endPosition);
    Cartesian2.clone(pinchMovement.angleAndHeight.startPosition, result.angleAndHeight.startPosition);
    Cartesian2.clone(pinchMovement.angleAndHeight.endPosition, result.angleAndHeight.endPosition);
  }
  function listenToPinch(aggregator, modifier, canvas) {
    var key = getKey(CameraEventType.PINCH, modifier);
    var update = aggregator._update;
    var isDown = aggregator._isDown;
    var eventStartPosition = aggregator._eventStartPosition;
    var pressTime = aggregator._pressTime;
    var releaseTime = aggregator._releaseTime;
    update[key] = true;
    isDown[key] = false;
    eventStartPosition[key] = new Cartesian2();
    var movement = aggregator._movement[key];
    if (!defined(movement)) {
      movement = aggregator._movement[key] = {};
    }
    movement.distance = {
      startPosition: new Cartesian2(),
      endPosition: new Cartesian2()
    };
    movement.angleAndHeight = {
      startPosition: new Cartesian2(),
      endPosition: new Cartesian2()
    };
    movement.prevAngle = 0.0;
    aggregator._eventHandler.setInputAction(function(event) {
      aggregator._buttonsDown++;
      isDown[key] = true;
      pressTime[key] = new Date();
    }, ScreenSpaceEventType.PINCH_START, modifier);
    aggregator._eventHandler.setInputAction(function() {
      aggregator._buttonsDown = Math.max(aggregator._buttonsDown - 1, 0);
      isDown[key] = false;
      releaseTime[key] = new Date();
    }, ScreenSpaceEventType.PINCH_END, modifier);
    aggregator._eventHandler.setInputAction(function(mouseMovement) {
      if (isDown[key]) {
        if (!update[key]) {
          Cartesian2.clone(mouseMovement.distance.endPosition, movement.distance.endPosition);
          Cartesian2.clone(mouseMovement.angleAndHeight.endPosition, movement.angleAndHeight.endPosition);
        } else {
          clonePinchMovement(mouseMovement, movement);
          update[key] = false;
          movement.prevAngle = movement.angleAndHeight.startPosition.x;
        }
        var angle = movement.angleAndHeight.endPosition.x;
        var prevAngle = movement.prevAngle;
        var TwoPI = Math.PI * 2;
        while (angle >= (prevAngle + Math.PI)) {
          angle -= TwoPI;
        }
        while (angle < (prevAngle - Math.PI)) {
          angle += TwoPI;
        }
        movement.angleAndHeight.endPosition.x = -angle * canvas.clientWidth / 12;
        movement.angleAndHeight.startPosition.x = -prevAngle * canvas.clientWidth / 12;
      }
    }, ScreenSpaceEventType.PINCH_MOVE, modifier);
  }
  function listenToWheel(aggregator, modifier) {
    var key = getKey(CameraEventType.WHEEL, modifier);
    var update = aggregator._update;
    update[key] = true;
    var movement = aggregator._movement[key];
    if (!defined(movement)) {
      movement = aggregator._movement[key] = {};
    }
    movement.startPosition = new Cartesian2();
    movement.endPosition = new Cartesian2();
    aggregator._eventHandler.setInputAction(function(delta) {
      var arcLength = 15.0 * CesiumMath.toRadians(delta);
      if (!update[key]) {
        movement.endPosition.y = movement.endPosition.y + arcLength;
      } else {
        Cartesian2.clone(Cartesian2.ZERO, movement.startPosition);
        movement.endPosition.x = 0.0;
        movement.endPosition.y = arcLength;
        update[key] = false;
      }
    }, ScreenSpaceEventType.WHEEL, modifier);
  }
  function listenMouseButtonDownUp(aggregator, modifier, type) {
    var key = getKey(type, modifier);
    var isDown = aggregator._isDown;
    var eventStartPosition = aggregator._eventStartPosition;
    var pressTime = aggregator._pressTime;
    var releaseTime = aggregator._releaseTime;
    isDown[key] = false;
    eventStartPosition[key] = new Cartesian2();
    var lastMovement = aggregator._lastMovement[key];
    if (!defined(lastMovement)) {
      lastMovement = aggregator._lastMovement[key] = {
        startPosition: new Cartesian2(),
        endPosition: new Cartesian2(),
        valid: false
      };
    }
    var down;
    var up;
    if (type === CameraEventType.LEFT_DRAG) {
      down = ScreenSpaceEventType.LEFT_DOWN;
      up = ScreenSpaceEventType.LEFT_UP;
    } else if (type === CameraEventType.RIGHT_DRAG) {
      down = ScreenSpaceEventType.RIGHT_DOWN;
      up = ScreenSpaceEventType.RIGHT_UP;
    } else if (type === CameraEventType.MIDDLE_DRAG) {
      down = ScreenSpaceEventType.MIDDLE_DOWN;
      up = ScreenSpaceEventType.MIDDLE_UP;
    }
    aggregator._eventHandler.setInputAction(function(event) {
      aggregator._buttonsDown++;
      lastMovement.valid = false;
      isDown[key] = true;
      pressTime[key] = new Date();
      Cartesian2.clone(event.position, eventStartPosition[key]);
    }, down, modifier);
    aggregator._eventHandler.setInputAction(function() {
      aggregator._buttonsDown = Math.max(aggregator._buttonsDown - 1, 0);
      isDown[key] = false;
      releaseTime[key] = new Date();
    }, up, modifier);
  }
  function cloneMouseMovement(mouseMovement, result) {
    Cartesian2.clone(mouseMovement.startPosition, result.startPosition);
    Cartesian2.clone(mouseMovement.endPosition, result.endPosition);
  }
  function listenMouseMove(aggregator, modifier) {
    var update = aggregator._update;
    var movement = aggregator._movement;
    var lastMovement = aggregator._lastMovement;
    var isDown = aggregator._isDown;
    for (var typeName in CameraEventType) {
      if (CameraEventType.hasOwnProperty(typeName)) {
        var type = CameraEventType[typeName];
        if (defined(type)) {
          var key = getKey(type, modifier);
          update[key] = true;
          if (!defined(aggregator._lastMovement[key])) {
            aggregator._lastMovement[key] = {
              startPosition: new Cartesian2(),
              endPosition: new Cartesian2(),
              valid: false
            };
          }
          if (!defined(aggregator._movement[key])) {
            aggregator._movement[key] = {
              startPosition: new Cartesian2(),
              endPosition: new Cartesian2()
            };
          }
        }
      }
    }
    aggregator._eventHandler.setInputAction(function(mouseMovement) {
      for (var typeName in CameraEventType) {
        if (CameraEventType.hasOwnProperty(typeName)) {
          var type = CameraEventType[typeName];
          if (defined(type)) {
            var key = getKey(type, modifier);
            if (isDown[key]) {
              if (!update[key]) {
                Cartesian2.clone(mouseMovement.endPosition, movement[key].endPosition);
              } else {
                cloneMouseMovement(movement[key], lastMovement[key]);
                lastMovement[key].valid = true;
                cloneMouseMovement(mouseMovement, movement[key]);
                update[key] = false;
              }
            }
          }
        }
      }
      Cartesian2.clone(mouseMovement.endPosition, aggregator._currentMousePosition);
    }, ScreenSpaceEventType.MOUSE_MOVE, modifier);
  }
  function CameraEventAggregator(canvas) {
    if (!defined(canvas)) {
      throw new DeveloperError('canvas is required.');
    }
    this._eventHandler = new ScreenSpaceEventHandler(canvas, true);
    this._update = {};
    this._movement = {};
    this._lastMovement = {};
    this._isDown = {};
    this._eventStartPosition = {};
    this._pressTime = {};
    this._releaseTime = {};
    this._buttonsDown = 0;
    this._currentMousePosition = new Cartesian2();
    listenToWheel(this, undefined);
    listenToPinch(this, undefined, canvas);
    listenMouseButtonDownUp(this, undefined, CameraEventType.LEFT_DRAG);
    listenMouseButtonDownUp(this, undefined, CameraEventType.RIGHT_DRAG);
    listenMouseButtonDownUp(this, undefined, CameraEventType.MIDDLE_DRAG);
    listenMouseMove(this, undefined);
    for (var modifierName in KeyboardEventModifier) {
      if (KeyboardEventModifier.hasOwnProperty(modifierName)) {
        var modifier = KeyboardEventModifier[modifierName];
        if (defined(modifier)) {
          listenToWheel(this, modifier);
          listenToPinch(this, modifier, canvas);
          listenMouseButtonDownUp(this, modifier, CameraEventType.LEFT_DRAG);
          listenMouseButtonDownUp(this, modifier, CameraEventType.RIGHT_DRAG);
          listenMouseButtonDownUp(this, modifier, CameraEventType.MIDDLE_DRAG);
          listenMouseMove(this, modifier);
        }
      }
    }
  }
  defineProperties(CameraEventAggregator.prototype, {
    currentMousePosition: {get: function() {
        return this._currentMousePosition;
      }},
    anyButtonDown: {get: function() {
        var wheelMoved = !this._update[getKey(CameraEventType.WHEEL)] || !this._update[getKey(CameraEventType.WHEEL, KeyboardEventModifier.SHIFT)] || !this._update[getKey(CameraEventType.WHEEL, KeyboardEventModifier.CTRL)] || !this._update[getKey(CameraEventType.WHEEL, KeyboardEventModifier.ALT)];
        return this._buttonsDown > 0 || wheelMoved;
      }}
  });
  CameraEventAggregator.prototype.isMoving = function(type, modifier) {
    if (!defined(type)) {
      throw new DeveloperError('type is required.');
    }
    var key = getKey(type, modifier);
    return !this._update[key];
  };
  CameraEventAggregator.prototype.getMovement = function(type, modifier) {
    if (!defined(type)) {
      throw new DeveloperError('type is required.');
    }
    var key = getKey(type, modifier);
    var movement = this._movement[key];
    return movement;
  };
  CameraEventAggregator.prototype.getLastMovement = function(type, modifier) {
    if (!defined(type)) {
      throw new DeveloperError('type is required.');
    }
    var key = getKey(type, modifier);
    var lastMovement = this._lastMovement[key];
    if (lastMovement.valid) {
      return lastMovement;
    }
    return undefined;
  };
  CameraEventAggregator.prototype.isButtonDown = function(type, modifier) {
    if (!defined(type)) {
      throw new DeveloperError('type is required.');
    }
    var key = getKey(type, modifier);
    return this._isDown[key];
  };
  CameraEventAggregator.prototype.getStartMousePosition = function(type, modifier) {
    if (!defined(type)) {
      throw new DeveloperError('type is required.');
    }
    if (type === CameraEventType.WHEEL || type === CameraEventType.PINCH) {
      return this._currentMousePosition;
    }
    var key = getKey(type, modifier);
    return this._eventStartPosition[key];
  };
  CameraEventAggregator.prototype.getButtonPressTime = function(type, modifier) {
    if (!defined(type)) {
      throw new DeveloperError('type is required.');
    }
    var key = getKey(type, modifier);
    return this._pressTime[key];
  };
  CameraEventAggregator.prototype.getButtonReleaseTime = function(type, modifier) {
    if (!defined(type)) {
      throw new DeveloperError('type is required.');
    }
    var key = getKey(type, modifier);
    return this._releaseTime[key];
  };
  CameraEventAggregator.prototype.reset = function() {
    for (var name in this._update) {
      if (this._update.hasOwnProperty(name)) {
        this._update[name] = true;
      }
    }
  };
  CameraEventAggregator.prototype.isDestroyed = function() {
    return false;
  };
  CameraEventAggregator.prototype.destroy = function() {
    this._eventHandler = this._eventHandler && this._eventHandler.destroy();
    return destroyObject(this);
  };
  return CameraEventAggregator;
});

})();
(function() {
var define = $__System.amdDefine;
define("10", ["11"], function(freezeObject) {
  'use strict';
  var CameraEventType = {
    LEFT_DRAG: 0,
    RIGHT_DRAG: 1,
    MIDDLE_DRAG: 2,
    WHEEL: 3,
    PINCH: 4
  };
  return freezeObject(CameraEventType);
});

})();
(function() {
var define = $__System.amdDefine;
define("12", ["11"], function(freezeObject) {
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
define("13", ["5"], function(defined) {
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
define("14", ["12", "15", "16", "5", "7", "8", "13", "17"], function(ClockRange, ClockStep, defaultValue, defined, DeveloperError, Event, getTimestamp, JulianDate) {
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
define("15", ["11"], function(freezeObject) {
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
define("18", ["19", "5", "6", "7", "d", "1a", "1b"], function(createGuid, defined, defineProperties, DeveloperError, CesiumMath, Entity, EntityCollection) {
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
define("19", [], function() {
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
define("1c", ["1d", "16", "5", "6", "7", "8", "1e", "1f"], function(Cartesian3, defaultValue, defined, defineProperties, DeveloperError, Event, ReferenceFrame, PositionProperty) {
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
define("20", ["16", "5", "6", "7", "8"], function(defaultValue, defined, defineProperties, DeveloperError, Event) {
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
define("21", ["16", "5", "20"], function(defaultValue, defined, ConstantProperty) {
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
define("22", ["21"], function(createPropertyDescriptor) {
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
define("1a", ["1d", "19", "16", "5", "6", "7", "8", "23", "24", "25", "26", "@empty", "@empty", "1c", "@empty", "21", "22", "@empty", "@empty", "@empty", "@empty", "@empty", "@empty", "@empty", "@empty", "@empty", "@empty", "27", "@empty", "@empty"], function(Cartesian3, createGuid, defaultValue, defined, defineProperties, DeveloperError, Event, Matrix3, Matrix4, Quaternion, Transforms, BillboardGraphics, BoxGraphics, ConstantPositionProperty, CorridorGraphics, createPropertyDescriptor, createRawPropertyDescriptor, CylinderGraphics, EllipseGraphics, EllipsoidGraphics, LabelGraphics, ModelGraphics, PathGraphics, PointGraphics, PolygonGraphics, PolylineGraphics, PolylineVolumeGraphics, Property, RectangleGraphics, WallGraphics) {
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
define("1b", ["28", "19", "5", "6", "7", "8", "29", "17", "2a", "2b", "1a"], function(AssociativeArray, createGuid, defined, defineProperties, DeveloperError, Event, Iso8601, JulianDate, RuntimeError, TimeInterval, Entity) {
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
define("2c", ["1d", "2d", "16", "5", "6", "7", "2e"], function(Cartesian3, Cartographic, defaultValue, defined, defineProperties, DeveloperError, Ellipsoid) {
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
define("2f", ["16", "5", "7", "d"], function(defaultValue, defined, DeveloperError, CesiumMath) {
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
define("30", ["5", "6", "7", "23", "25", "1e", "26"], function(defined, defineProperties, DeveloperError, Matrix3, Quaternion, ReferenceFrame, Transforms) {
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
define("31", ["5", "6", "7", "32"], function(defined, defineProperties, DeveloperError, PerspectiveOffCenterFrustum) {
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
define("33", ["11"], function(freezeObject) {
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
define("34", ["1d", "35", "16", "5", "7", "33", "36"], function(Cartesian3, Cartesian4, defaultValue, defined, DeveloperError, Intersect, Plane) {
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
define("32", ["a", "1d", "35", "16", "5", "6", "7", "24", "34"], function(Cartesian2, Cartesian3, Cartesian4, defaultValue, defined, defineProperties, DeveloperError, Matrix4, CullingVolume) {
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
define("37", ["5", "6", "7", "8", "27"], function(defined, defineProperties, DeveloperError, Event, Property) {
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
define("38", ["5", "6", "7", "8", "2a", "27"], function(defined, defineProperties, DeveloperError, Event, RuntimeError, Property) {
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
define("1e", ["11"], function(freezeObject) {
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
define("1f", ["1d", "5", "6", "7", "23", "24", "25", "1e", "26"], function(Cartesian3, defined, defineProperties, DeveloperError, Matrix3, Matrix4, Quaternion, ReferenceFrame, Transforms) {
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
define("2b", ["16", "5", "6", "7", "11", "17"], function(defaultValue, defined, defineProperties, DeveloperError, freezeObject, JulianDate) {
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
define("29", ["11", "17", "2b"], function(freezeObject, JulianDate, TimeInterval) {
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
define("27", ["16", "5", "6", "7", "29"], function(defaultValue, defined, defineProperties, DeveloperError, Iso8601) {
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
define("39", ["1d", "16", "5", "6", "7", "8", "1e", "1f", "27", "3a"], function(Cartesian3, defaultValue, defined, defineProperties, DeveloperError, Event, ReferenceFrame, PositionProperty, Property, SampledProperty) {
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
define("8", ["5", "6", "7"], function(defined, defineProperties, DeveloperError) {
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
define("3b", ["11"], function(freezeObject) {
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
define("3c", ["5", "7"], function(defined, DeveloperError) {
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
define("3a", ["3d", "16", "5", "6", "7", "8", "3b", "17", "3c"], function(binarySearch, defaultValue, defined, defineProperties, DeveloperError, Event, ExtrapolationType, JulianDate, LinearApproximation) {
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
define("28", ["5", "6", "7"], function(defined, defineProperties, DeveloperError) {
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
define("b", ["16", "7"], function(defaultValue, DeveloperError) {
  'use strict';
  function returnTrue() {
    return true;
  }
  function destroyObject(object, message) {
    message = defaultValue(message, 'This object was destroyed, i.e., destroy() was called.');
    function throwOnDestroyed() {
      throw new DeveloperError(message);
    }
    for (var key in object) {
      if (typeof object[key] === 'function') {
        object[key] = throwOnDestroyed;
      }
    }
    object.isDestroyed = returnTrue;
    return undefined;
  }
  return destroyObject;
});

})();
(function() {
var define = $__System.amdDefine;
define("c", ["11"], function(freezeObject) {
  'use strict';
  var KeyboardEventModifier = {
    SHIFT: 0,
    CTRL: 1,
    ALT: 2
  };
  return freezeObject(KeyboardEventModifier);
});

})();
(function() {
var define = $__System.amdDefine;
define("e", ["28", "a", "16", "5", "b", "7", "3e", "c", "f"], function(AssociativeArray, Cartesian2, defaultValue, defined, destroyObject, DeveloperError, FeatureDetection, KeyboardEventModifier, ScreenSpaceEventType) {
  'use strict';
  function getPosition(screenSpaceEventHandler, event, result) {
    var element = screenSpaceEventHandler._element;
    if (element === document) {
      result.x = event.clientX;
      result.y = event.clientY;
      return result;
    }
    var rect = element.getBoundingClientRect();
    result.x = event.clientX - rect.left;
    result.y = event.clientY - rect.top;
    return result;
  }
  function getInputEventKey(type, modifier) {
    var key = type;
    if (defined(modifier)) {
      key += '+' + modifier;
    }
    return key;
  }
  function getModifier(event) {
    if (event.shiftKey) {
      return KeyboardEventModifier.SHIFT;
    } else if (event.ctrlKey) {
      return KeyboardEventModifier.CTRL;
    } else if (event.altKey) {
      return KeyboardEventModifier.ALT;
    }
    return undefined;
  }
  var MouseButton = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
  };
  function registerListener(screenSpaceEventHandler, domType, element, callback) {
    function listener(e) {
      callback(screenSpaceEventHandler, e);
    }
    element.addEventListener(domType, listener, false);
    screenSpaceEventHandler._removalFunctions.push(function() {
      element.removeEventListener(domType, listener, false);
    });
  }
  function registerListeners(screenSpaceEventHandler) {
    var element = screenSpaceEventHandler._element;
    var alternateElement = !defined(element.disableRootEvents) ? document : element;
    if (FeatureDetection.supportsPointerEvents()) {
      registerListener(screenSpaceEventHandler, 'pointerdown', element, handlePointerDown);
      registerListener(screenSpaceEventHandler, 'pointerup', element, handlePointerUp);
      registerListener(screenSpaceEventHandler, 'pointermove', element, handlePointerMove);
    } else {
      registerListener(screenSpaceEventHandler, 'mousedown', element, handleMouseDown);
      registerListener(screenSpaceEventHandler, 'mouseup', alternateElement, handleMouseUp);
      registerListener(screenSpaceEventHandler, 'mousemove', alternateElement, handleMouseMove);
      registerListener(screenSpaceEventHandler, 'touchstart', element, handleTouchStart);
      registerListener(screenSpaceEventHandler, 'touchend', alternateElement, handleTouchEnd);
      registerListener(screenSpaceEventHandler, 'touchmove', alternateElement, handleTouchMove);
    }
    registerListener(screenSpaceEventHandler, 'dblclick', element, handleDblClick);
    var wheelEvent;
    if ('onwheel' in element) {
      wheelEvent = 'wheel';
    } else if (document.onmousewheel !== undefined) {
      wheelEvent = 'mousewheel';
    } else {
      wheelEvent = 'DOMMouseScroll';
    }
    registerListener(screenSpaceEventHandler, wheelEvent, element, handleWheel);
  }
  function unregisterListeners(screenSpaceEventHandler) {
    var removalFunctions = screenSpaceEventHandler._removalFunctions;
    for (var i = 0; i < removalFunctions.length; ++i) {
      removalFunctions[i]();
    }
  }
  var mouseDownEvent = {position: new Cartesian2()};
  function handleMouseDown(screenSpaceEventHandler, event) {
    if (screenSpaceEventHandler._seenAnyTouchEvents) {
      return;
    }
    var button = event.button;
    screenSpaceEventHandler._buttonDown = button;
    var screenSpaceEventType;
    if (button === MouseButton.LEFT) {
      screenSpaceEventType = ScreenSpaceEventType.LEFT_DOWN;
    } else if (button === MouseButton.MIDDLE) {
      screenSpaceEventType = ScreenSpaceEventType.MIDDLE_DOWN;
    } else if (button === MouseButton.RIGHT) {
      screenSpaceEventType = ScreenSpaceEventType.RIGHT_DOWN;
    } else {
      return;
    }
    var position = getPosition(screenSpaceEventHandler, event, screenSpaceEventHandler._primaryPosition);
    Cartesian2.clone(position, screenSpaceEventHandler._primaryStartPosition);
    Cartesian2.clone(position, screenSpaceEventHandler._primaryPreviousPosition);
    var modifier = getModifier(event);
    var action = screenSpaceEventHandler.getInputAction(screenSpaceEventType, modifier);
    if (defined(action)) {
      Cartesian2.clone(position, mouseDownEvent.position);
      action(mouseDownEvent);
      event.preventDefault();
    }
  }
  var mouseUpEvent = {position: new Cartesian2()};
  var mouseClickEvent = {position: new Cartesian2()};
  function handleMouseUp(screenSpaceEventHandler, event) {
    if (screenSpaceEventHandler._seenAnyTouchEvents) {
      return;
    }
    var button = event.button;
    screenSpaceEventHandler._buttonDown = undefined;
    var screenSpaceEventType;
    var clickScreenSpaceEventType;
    if (button === MouseButton.LEFT) {
      screenSpaceEventType = ScreenSpaceEventType.LEFT_UP;
      clickScreenSpaceEventType = ScreenSpaceEventType.LEFT_CLICK;
    } else if (button === MouseButton.MIDDLE) {
      screenSpaceEventType = ScreenSpaceEventType.MIDDLE_UP;
      clickScreenSpaceEventType = ScreenSpaceEventType.MIDDLE_CLICK;
    } else if (button === MouseButton.RIGHT) {
      screenSpaceEventType = ScreenSpaceEventType.RIGHT_UP;
      clickScreenSpaceEventType = ScreenSpaceEventType.RIGHT_CLICK;
    } else {
      return;
    }
    var modifier = getModifier(event);
    var action = screenSpaceEventHandler.getInputAction(screenSpaceEventType, modifier);
    var clickAction = screenSpaceEventHandler.getInputAction(clickScreenSpaceEventType, modifier);
    if (defined(action) || defined(clickAction)) {
      var position = getPosition(screenSpaceEventHandler, event, screenSpaceEventHandler._primaryPosition);
      if (defined(action)) {
        Cartesian2.clone(position, mouseUpEvent.position);
        action(mouseUpEvent);
      }
      if (defined(clickAction)) {
        var startPosition = screenSpaceEventHandler._primaryStartPosition;
        var xDiff = startPosition.x - position.x;
        var yDiff = startPosition.y - position.y;
        var totalPixels = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        if (totalPixels < screenSpaceEventHandler._clickPixelTolerance) {
          Cartesian2.clone(position, mouseClickEvent.position);
          clickAction(mouseClickEvent);
        }
      }
    }
  }
  var mouseMoveEvent = {
    startPosition: new Cartesian2(),
    endPosition: new Cartesian2()
  };
  function handleMouseMove(screenSpaceEventHandler, event) {
    if (screenSpaceEventHandler._seenAnyTouchEvents) {
      return;
    }
    var modifier = getModifier(event);
    var position = getPosition(screenSpaceEventHandler, event, screenSpaceEventHandler._primaryPosition);
    var previousPosition = screenSpaceEventHandler._primaryPreviousPosition;
    var action = screenSpaceEventHandler.getInputAction(ScreenSpaceEventType.MOUSE_MOVE, modifier);
    if (defined(action)) {
      Cartesian2.clone(previousPosition, mouseMoveEvent.startPosition);
      Cartesian2.clone(position, mouseMoveEvent.endPosition);
      action(mouseMoveEvent);
    }
    Cartesian2.clone(position, previousPosition);
    if (defined(screenSpaceEventHandler._buttonDown)) {
      event.preventDefault();
    }
  }
  var mouseDblClickEvent = {position: new Cartesian2()};
  function handleDblClick(screenSpaceEventHandler, event) {
    var button = event.button;
    var screenSpaceEventType;
    if (button === MouseButton.LEFT) {
      screenSpaceEventType = ScreenSpaceEventType.LEFT_DOUBLE_CLICK;
    } else if (button === MouseButton.MIDDLE) {
      screenSpaceEventType = ScreenSpaceEventType.MIDDLE_DOUBLE_CLICK;
    } else if (button === MouseButton.RIGHT) {
      screenSpaceEventType = ScreenSpaceEventType.RIGHT_DOUBLE_CLICK;
    } else {
      return;
    }
    var modifier = getModifier(event);
    var action = screenSpaceEventHandler.getInputAction(screenSpaceEventType, modifier);
    if (defined(action)) {
      getPosition(screenSpaceEventHandler, event, mouseDblClickEvent.position);
      action(mouseDblClickEvent);
    }
  }
  function handleWheel(screenSpaceEventHandler, event) {
    var delta;
    if (defined(event.deltaY)) {
      var deltaMode = event.deltaMode;
      if (deltaMode === event.DOM_DELTA_PIXEL) {
        delta = -event.deltaY;
      } else if (deltaMode === event.DOM_DELTA_LINE) {
        delta = -event.deltaY * 40;
      } else {
        delta = -event.deltaY * 120;
      }
    } else if (event.detail > 0) {
      delta = event.detail * -120;
    } else {
      delta = event.wheelDelta;
    }
    if (!defined(delta)) {
      return;
    }
    var modifier = getModifier(event);
    var action = screenSpaceEventHandler.getInputAction(ScreenSpaceEventType.WHEEL, modifier);
    if (defined(action)) {
      action(delta);
      event.preventDefault();
    }
  }
  function handleTouchStart(screenSpaceEventHandler, event) {
    screenSpaceEventHandler._seenAnyTouchEvents = true;
    var changedTouches = event.changedTouches;
    var i;
    var length = changedTouches.length;
    var touch;
    var identifier;
    var positions = screenSpaceEventHandler._positions;
    for (i = 0; i < length; ++i) {
      touch = changedTouches[i];
      identifier = touch.identifier;
      positions.set(identifier, getPosition(screenSpaceEventHandler, touch, new Cartesian2()));
    }
    fireTouchEvents(screenSpaceEventHandler, event);
    var previousPositions = screenSpaceEventHandler._previousPositions;
    for (i = 0; i < length; ++i) {
      touch = changedTouches[i];
      identifier = touch.identifier;
      previousPositions.set(identifier, Cartesian2.clone(positions.get(identifier)));
    }
  }
  function handleTouchEnd(screenSpaceEventHandler, event) {
    screenSpaceEventHandler._seenAnyTouchEvents = true;
    var changedTouches = event.changedTouches;
    var i;
    var length = changedTouches.length;
    var touch;
    var identifier;
    var positions = screenSpaceEventHandler._positions;
    for (i = 0; i < length; ++i) {
      touch = changedTouches[i];
      identifier = touch.identifier;
      positions.remove(identifier);
    }
    fireTouchEvents(screenSpaceEventHandler, event);
    var previousPositions = screenSpaceEventHandler._previousPositions;
    for (i = 0; i < length; ++i) {
      touch = changedTouches[i];
      identifier = touch.identifier;
      previousPositions.remove(identifier);
    }
  }
  var touchStartEvent = {position: new Cartesian2()};
  var touch2StartEvent = {
    position1: new Cartesian2(),
    position2: new Cartesian2()
  };
  var touchEndEvent = {position: new Cartesian2()};
  var touchClickEvent = {position: new Cartesian2()};
  function fireTouchEvents(screenSpaceEventHandler, event) {
    var modifier = getModifier(event);
    var positions = screenSpaceEventHandler._positions;
    var previousPositions = screenSpaceEventHandler._previousPositions;
    var numberOfTouches = positions.length;
    var action;
    var clickAction;
    if (numberOfTouches !== 1 && screenSpaceEventHandler._buttonDown === MouseButton.LEFT) {
      screenSpaceEventHandler._buttonDown = undefined;
      action = screenSpaceEventHandler.getInputAction(ScreenSpaceEventType.LEFT_UP, modifier);
      if (defined(action)) {
        Cartesian2.clone(screenSpaceEventHandler._primaryPosition, touchEndEvent.position);
        action(touchEndEvent);
      }
      if (numberOfTouches === 0) {
        clickAction = screenSpaceEventHandler.getInputAction(ScreenSpaceEventType.LEFT_CLICK, modifier);
        if (defined(clickAction)) {
          var startPosition = screenSpaceEventHandler._primaryStartPosition;
          var endPosition = previousPositions.values[0];
          var xDiff = startPosition.x - endPosition.x;
          var yDiff = startPosition.y - endPosition.y;
          var totalPixels = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
          if (totalPixels < screenSpaceEventHandler._clickPixelTolerance) {
            Cartesian2.clone(screenSpaceEventHandler._primaryPosition, touchClickEvent.position);
            clickAction(touchClickEvent);
          }
        }
      }
    }
    if (numberOfTouches !== 2 && screenSpaceEventHandler._isPinching) {
      screenSpaceEventHandler._isPinching = false;
      action = screenSpaceEventHandler.getInputAction(ScreenSpaceEventType.PINCH_END, modifier);
      if (defined(action)) {
        action();
      }
    }
    if (numberOfTouches === 1) {
      var position = positions.values[0];
      Cartesian2.clone(position, screenSpaceEventHandler._primaryPosition);
      Cartesian2.clone(position, screenSpaceEventHandler._primaryStartPosition);
      Cartesian2.clone(position, screenSpaceEventHandler._primaryPreviousPosition);
      screenSpaceEventHandler._buttonDown = MouseButton.LEFT;
      action = screenSpaceEventHandler.getInputAction(ScreenSpaceEventType.LEFT_DOWN, modifier);
      if (defined(action)) {
        Cartesian2.clone(position, touchStartEvent.position);
        action(touchStartEvent);
      }
      event.preventDefault();
    }
    if (numberOfTouches === 2) {
      screenSpaceEventHandler._isPinching = true;
      action = screenSpaceEventHandler.getInputAction(ScreenSpaceEventType.PINCH_START, modifier);
      if (defined(action)) {
        Cartesian2.clone(positions.values[0], touch2StartEvent.position1);
        Cartesian2.clone(positions.values[1], touch2StartEvent.position2);
        action(touch2StartEvent);
      }
    }
  }
  function handleTouchMove(screenSpaceEventHandler, event) {
    screenSpaceEventHandler._seenAnyTouchEvents = true;
    var changedTouches = event.changedTouches;
    var i;
    var length = changedTouches.length;
    var touch;
    var identifier;
    var positions = screenSpaceEventHandler._positions;
    for (i = 0; i < length; ++i) {
      touch = changedTouches[i];
      identifier = touch.identifier;
      var position = positions.get(identifier);
      if (defined(position)) {
        getPosition(screenSpaceEventHandler, touch, position);
      }
    }
    fireTouchMoveEvents(screenSpaceEventHandler, event);
    var previousPositions = screenSpaceEventHandler._previousPositions;
    for (i = 0; i < length; ++i) {
      touch = changedTouches[i];
      identifier = touch.identifier;
      Cartesian2.clone(positions.get(identifier), previousPositions.get(identifier));
    }
  }
  var touchMoveEvent = {
    startPosition: new Cartesian2(),
    endPosition: new Cartesian2()
  };
  var touchPinchMovementEvent = {
    distance: {
      startPosition: new Cartesian2(),
      endPosition: new Cartesian2()
    },
    angleAndHeight: {
      startPosition: new Cartesian2(),
      endPosition: new Cartesian2()
    }
  };
  function fireTouchMoveEvents(screenSpaceEventHandler, event) {
    var modifier = getModifier(event);
    var positions = screenSpaceEventHandler._positions;
    var previousPositions = screenSpaceEventHandler._previousPositions;
    var numberOfTouches = positions.length;
    var action;
    if (numberOfTouches === 1 && screenSpaceEventHandler._buttonDown === MouseButton.LEFT) {
      var position = positions.values[0];
      Cartesian2.clone(position, screenSpaceEventHandler._primaryPosition);
      var previousPosition = screenSpaceEventHandler._primaryPreviousPosition;
      action = screenSpaceEventHandler.getInputAction(ScreenSpaceEventType.MOUSE_MOVE, modifier);
      if (defined(action)) {
        Cartesian2.clone(previousPosition, touchMoveEvent.startPosition);
        Cartesian2.clone(position, touchMoveEvent.endPosition);
        action(touchMoveEvent);
      }
      Cartesian2.clone(position, previousPosition);
      event.preventDefault();
    } else if (numberOfTouches === 2 && screenSpaceEventHandler._isPinching) {
      action = screenSpaceEventHandler.getInputAction(ScreenSpaceEventType.PINCH_MOVE, modifier);
      if (defined(action)) {
        var position1 = positions.values[0];
        var position2 = positions.values[1];
        var previousPosition1 = previousPositions.values[0];
        var previousPosition2 = previousPositions.values[1];
        var dX = position2.x - position1.x;
        var dY = position2.y - position1.y;
        var dist = Math.sqrt(dX * dX + dY * dY) * 0.25;
        var prevDX = previousPosition2.x - previousPosition1.x;
        var prevDY = previousPosition2.y - previousPosition1.y;
        var prevDist = Math.sqrt(prevDX * prevDX + prevDY * prevDY) * 0.25;
        var cY = (position2.y + position1.y) * 0.125;
        var prevCY = (previousPosition2.y + previousPosition1.y) * 0.125;
        var angle = Math.atan2(dY, dX);
        var prevAngle = Math.atan2(prevDY, prevDX);
        Cartesian2.fromElements(0.0, prevDist, touchPinchMovementEvent.distance.startPosition);
        Cartesian2.fromElements(0.0, dist, touchPinchMovementEvent.distance.endPosition);
        Cartesian2.fromElements(prevAngle, prevCY, touchPinchMovementEvent.angleAndHeight.startPosition);
        Cartesian2.fromElements(angle, cY, touchPinchMovementEvent.angleAndHeight.endPosition);
        action(touchPinchMovementEvent);
      }
    }
  }
  function handlePointerDown(screenSpaceEventHandler, event) {
    event.target.setPointerCapture(event.pointerId);
    if (event.pointerType === 'touch') {
      var positions = screenSpaceEventHandler._positions;
      var identifier = event.pointerId;
      positions.set(identifier, getPosition(screenSpaceEventHandler, event, new Cartesian2()));
      fireTouchEvents(screenSpaceEventHandler, event);
      var previousPositions = screenSpaceEventHandler._previousPositions;
      previousPositions.set(identifier, Cartesian2.clone(positions.get(identifier)));
    } else {
      handleMouseDown(screenSpaceEventHandler, event);
    }
  }
  function handlePointerUp(screenSpaceEventHandler, event) {
    if (event.pointerType === 'touch') {
      var positions = screenSpaceEventHandler._positions;
      var identifier = event.pointerId;
      positions.remove(identifier);
      fireTouchEvents(screenSpaceEventHandler, event);
      var previousPositions = screenSpaceEventHandler._previousPositions;
      previousPositions.remove(identifier);
    } else {
      handleMouseUp(screenSpaceEventHandler, event);
    }
  }
  function handlePointerMove(screenSpaceEventHandler, event) {
    if (event.pointerType === 'touch') {
      var positions = screenSpaceEventHandler._positions;
      var identifier = event.pointerId;
      getPosition(screenSpaceEventHandler, event, positions.get(identifier));
      fireTouchMoveEvents(screenSpaceEventHandler, event);
      var previousPositions = screenSpaceEventHandler._previousPositions;
      Cartesian2.clone(positions.get(identifier), previousPositions.get(identifier));
    } else {
      handleMouseMove(screenSpaceEventHandler, event);
    }
  }
  function ScreenSpaceEventHandler(element) {
    this._inputEvents = {};
    this._buttonDown = undefined;
    this._isPinching = false;
    this._seenAnyTouchEvents = false;
    this._primaryStartPosition = new Cartesian2();
    this._primaryPosition = new Cartesian2();
    this._primaryPreviousPosition = new Cartesian2();
    this._positions = new AssociativeArray();
    this._previousPositions = new AssociativeArray();
    this._removalFunctions = [];
    this._clickPixelTolerance = 5;
    this._element = defaultValue(element, document);
    registerListeners(this);
  }
  ScreenSpaceEventHandler.prototype.setInputAction = function(action, type, modifier) {
    if (!defined(action)) {
      throw new DeveloperError('action is required.');
    }
    if (!defined(type)) {
      throw new DeveloperError('type is required.');
    }
    var key = getInputEventKey(type, modifier);
    this._inputEvents[key] = action;
  };
  ScreenSpaceEventHandler.prototype.getInputAction = function(type, modifier) {
    if (!defined(type)) {
      throw new DeveloperError('type is required.');
    }
    var key = getInputEventKey(type, modifier);
    return this._inputEvents[key];
  };
  ScreenSpaceEventHandler.prototype.removeInputAction = function(type, modifier) {
    if (!defined(type)) {
      throw new DeveloperError('type is required.');
    }
    var key = getInputEventKey(type, modifier);
    delete this._inputEvents[key];
  };
  ScreenSpaceEventHandler.prototype.isDestroyed = function() {
    return false;
  };
  ScreenSpaceEventHandler.prototype.destroy = function() {
    unregisterListeners(this);
    return destroyObject(this);
  };
  return ScreenSpaceEventHandler;
});

})();
(function() {
var define = $__System.amdDefine;
define("f", ["11"], function(freezeObject) {
  'use strict';
  var ScreenSpaceEventType = {
    LEFT_DOWN: 0,
    LEFT_UP: 1,
    LEFT_CLICK: 2,
    LEFT_DOUBLE_CLICK: 3,
    RIGHT_DOWN: 5,
    RIGHT_UP: 6,
    RIGHT_CLICK: 7,
    RIGHT_DOUBLE_CLICK: 8,
    MIDDLE_DOWN: 10,
    MIDDLE_UP: 11,
    MIDDLE_CLICK: 12,
    MIDDLE_DOUBLE_CLICK: 13,
    MOUSE_MOVE: 15,
    WHEEL: 16,
    PINCH_START: 17,
    PINCH_END: 18,
    PINCH_MOVE: 19
  };
  return freezeObject(ScreenSpaceEventType);
});

})();
(function() {
var define = $__System.amdDefine;
define("a", ["16", "5", "7", "11", "d"], function(defaultValue, defined, DeveloperError, freezeObject, CesiumMath) {
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
define("3f", ["40", "3d", "16", "5", "41", "11", "17", "42", "43", "2a", "44", "45"], function(when, binarySearch, defaultValue, defined, EarthOrientationParametersSample, freezeObject, JulianDate, LeapSecond, loadJson, RuntimeError, TimeConstants, TimeStandard) {
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
define("41", [], function() {
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
define("46", ["47", "16", "5", "7"], function(Uri, defaultValue, defined, DeveloperError) {
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
define("47", [], function() {
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
define("48", ["47", "16", "5", "7"], function(Uri, defaultValue, defined, DeveloperError) {
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
define("49", ["47", "5", "7", "46", "48", "require"], function(Uri, defined, DeveloperError, getAbsoluteUri, joinUrls, _dereq_) {
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
define("4a", ["16"], function(defaultValue) {
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
  define("40", [], function() {
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
define("4b", [], function() {
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
define("4c", ["5", "4b"], function(defined, parseResponseHeaders) {
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
define("4d", ["40", "16", "5", "7", "4c", "2a"], function(when, defaultValue, defined, DeveloperError, RequestErrorEvent, RuntimeError) {
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
define("4e", ["4d"], function(loadWithXhr) {
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
define("43", ["4a", "5", "7", "4e"], function(clone, defined, DeveloperError, loadText) {
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
define("4f", ["40", "49", "16", "5", "50", "17", "43", "45"], function(when, buildModuleUrl, defaultValue, defined, Iau2006XysSample, JulianDate, loadJson, TimeStandard) {
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
define("50", [], function() {
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
define("51", ["5", "6"], function(defined, defineProperties) {
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
define("3e", ["16", "5", "51"], function(defaultValue, defined, Fullscreen) {
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
define("25", ["1d", "16", "5", "7", "3e", "11", "d", "23"], function(Cartesian3, defaultValue, defined, DeveloperError, FeatureDetection, freezeObject, CesiumMath, Matrix3) {
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
define("26", ["40", "a", "1d", "35", "2d", "16", "5", "7", "3f", "41", "2e", "4f", "50", "17", "d", "23", "24", "25", "44"], function(when, Cartesian2, Cartesian3, Cartesian4, Cartographic, defaultValue, defined, DeveloperError, EarthOrientationParameters, EarthOrientationParametersSample, Ellipsoid, Iau2006XysData, Iau2006XysSample, JulianDate, CesiumMath, Matrix3, Matrix4, Quaternion, TimeConstants) {
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
define("52", [], function() {
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
define("3d", ["5", "7"], function(defined, DeveloperError) {
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
define("53", [], function() {
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
define("54", ["7"], function(DeveloperError) {
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
define("42", [], function() {
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
define("17", ["52", "3d", "16", "5", "7", "53", "54", "42", "44", "45"], function(sprintf, binarySearch, defaultValue, defined, DeveloperError, GregorianDate, isLeapYear, LeapSecond, TimeConstants, TimeStandard) {
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
define("44", ["11"], function(freezeObject) {
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
define("45", ["11"], function(freezeObject) {
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
define("55", ["1d", "5", "7", "17", "d", "23", "44", "45"], function(Cartesian3, defined, DeveloperError, JulianDate, CesiumMath, Matrix3, TimeConstants, TimeStandard) {
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
define("2e", ["1d", "2d", "16", "5", "6", "7", "11", "d", "56"], function(Cartesian3, Cartographic, defaultValue, defined, defineProperties, DeveloperError, freezeObject, CesiumMath, scaleToGeodeticSurface) {
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
define("57", ["1d", "2d", "16", "5", "6", "7", "2e", "d"], function(Cartesian3, Cartographic, defaultValue, defined, defineProperties, DeveloperError, Ellipsoid, CesiumMath) {
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
define("56", ["1d", "5", "7", "d"], function(Cartesian3, defined, DeveloperError, CesiumMath) {
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
define("2d", ["1d", "16", "5", "7", "11", "d", "56"], function(Cartesian3, defaultValue, defined, DeveloperError, freezeObject, CesiumMath, scaleToGeodeticSurface) {
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
define("58", ["7", "59"], function(DeveloperError, QuadraticRealPolynomial) {
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
define("59", ["7", "d"], function(DeveloperError, CesiumMath) {
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
define("5a", ["58", "7", "d", "59"], function(CubicRealPolynomial, DeveloperError, CesiumMath, QuadraticRealPolynomial) {
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
define("5b", ["1d", "16", "5", "7"], function(Cartesian3, defaultValue, defined, DeveloperError) {
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
define("5c", ["1d", "2d", "16", "5", "7", "d", "23", "59", "5a", "5b"], function(Cartesian3, Cartographic, defaultValue, defined, DeveloperError, CesiumMath, Matrix3, QuadraticRealPolynomial, QuarticRealPolynomial, Ray) {
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
define("5d", ["5"], function(defined) {
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
define("35", ["16", "5", "7", "11", "d"], function(defaultValue, defined, DeveloperError, freezeObject, CesiumMath) {
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
define("6", ["5"], function(defined) {
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
define("23", ["1d", "16", "5", "6", "7", "11", "d"], function(Cartesian3, defaultValue, defined, defineProperties, DeveloperError, freezeObject, CesiumMath) {
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
define("2a", ["5"], function(defined) {
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
define("24", ["1d", "35", "16", "5", "6", "7", "11", "d", "23", "2a"], function(Cartesian3, Cartesian4, defaultValue, defined, defineProperties, DeveloperError, freezeObject, CesiumMath, Matrix3, RuntimeError) {
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
define("5e", [], function() {
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
define("16", ["11"], function(freezeObject) {
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
define("d", ["5e", "16", "5", "7"], function(MersenneTwister, defaultValue, defined, DeveloperError) {
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
define("1d", ["16", "5", "7", "11", "d"], function(defaultValue, defined, DeveloperError, freezeObject, CesiumMath) {
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
define("7", ["5"], function(defined) {
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
define("5", [], function() {
  'use strict';
  function defined(value) {
    return value !== undefined && value !== null;
  }
  return defined;
});

})();
(function() {
var define = $__System.amdDefine;
define("11", ["5"], function(defined) {
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
define("36", ["1d", "5", "7", "11"], function(Cartesian3, defined, DeveloperError, freezeObject) {
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
define("5f", ["1d", "2d", "16", "5", "7", "2e", "57", "5c", "5d", "d", "24", "36"], function(Cartesian3, Cartographic, defaultValue, defined, DeveloperError, Ellipsoid, EllipsoidGeodesic, IntersectionTests, isArray, CesiumMath, Matrix4, Plane) {
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
$__System.register('1', ['2', '3', '3d', '4', '9', '10', 'a', '1d', '35', '2d', '14', '15', '18', '1c', '20', '19', '16', '5', '7', '2e', '1a', '1b', '8', '3b', '3e', '2c', '2f', '17', 'd', '23', '24', '30', '31', '32', '1f', '27', '25', '37', '1e', '38', '39', '3a', 'e', 'f', '26', '55', '5f', '@empty'], function (_export, _context) {
    "use strict";

    var AggregateError, PLATFORM, binarySearch, cesium_Source_DataSources_CallbackProperty_js, CameraEventAggregator, CameraEventType, cesium_Source_Core_Cartesian2_js, Cartesian3, cesium_Source_Core_Cartesian4_js, Cartographic, Clock, cesium_Source_Core_ClockStep_js, cesium_Source_DataSources_CompositeEntityCollection_js, ConstantPositionProperty, ConstantProperty, createGuid, cesium_Source_Core_defaultValue_js, defined, cesium_Source_Core_DeveloperError_js, cesium_Source_Core_Ellipsoid_js, Entity, EntityCollection, CesiumEvent, cesium_Source_Core_ExtrapolationType_js, FeatureDetection, cesium_Source_Core_GeographicProjection_js, cesium_Source_Core_HermitePolynomialApproximation_js, JulianDate, CesiumMath, Matrix3, Matrix4, OrientationProperty, PerspectiveFrustum, PerspectiveOffCenterFrustum, cesium_Source_DataSources_PositionProperty_js, cesium_Source_DataSources_Property_js, Quaternion, cesium_Source_DataSources_ReferenceEntity_js, ReferenceFrame, cesium_Source_DataSources_ReferenceProperty_js, SampledPositionProperty, SampledProperty, cesium_Source_Core_ScreenSpaceEventHandler_js, cesium_Source_Core_ScreenSpaceEventType_js, Transforms, cesium_Source_Core_Simon1994PlanetaryPositions_js, cesium_Source_Core_PolylinePipeline_js, _createClass, _classCallCheck, _extends, _typeof, metadata, originStorage, unknownOrigin, Origin, _dec, _class, _dec2, _class3, _dec3, _class5, _dec4, _class7, _dec5, _class9, _dec6, _class11, _dec7, _class13, _classInvokers, resolver, Lazy, All, Optional, Parent, StrategyResolver, Factory, NewInstance, FactoryInvoker, TransientRegistration, SingletonRegistration, _emptyParameters, resolverDecorates, InvocationHandler, classInvokers, Container, aureliaDependencyInjection, after, cesiumImports, _possibleConstructorReturn, _inherits, AVERAGE_HUMAN_HEIGHT, EYE_ENTITY_ID, PHYSICAL_EYE_ENTITY_ID, STAGE_ENTITY_ID, PHYSICAL_STAGE_ENTITY_ID, Role, Configuration, Viewport, NormalizedViewport, SubviewType, SerializedEntityState, SerializedSubview, SerializedSubviewList, Event, CommandQueue, MessageChannelLike, SynchronousMessageChannel, MessageChannelFactory, eventSynthesizerFunction, synthesizeEvent, cloneTouch, cloneTouches, getEntityPosition, getEntityOrientation, _scratchFramesArray, urlParser, scratchPerspectiveOffCenterFrustum, scratchCartesian, scratchOrientation, isIOS, lastTime, requestAnimationFrame$1, version, __decorate$1, __metadata$1, emptyObject, SessionPort, SessionPortFactory, ConnectService, SessionService, LoopbackConnectService, DOMConnectService, DebugConnectService, WKWebViewConnectService, _a$1, _b$1, _defineProperty, __decorate$5, __metadata$5, PoseStatus, scratchCartesian$2, scratchCartesian2, scratchQuaternion$1, scratchOriginCartesian, scratchFrustum$1, scratchMatrix3$1, scratchMatrix4$1, ContextService, ContextServiceProvider, _a$5, _b$5, _c$4, _d$4, _e$4, _f$3, __decorate$6, __metadata$6, FocusService, FocusServiceProvider, _a$6, _b$6, __decorate$7, __metadata$7, VisibilityService, VisibilityServiceProvider, _a$7, _b$7, __decorate$4, __metadata$4, PresentationMode, ParentElement, ViewportService, ViewportServiceProvider, resolveArgonElement, _a$4, _b$4, _c$3, _d$3, _e$3, _f$2, __decorate$8, __metadata$8, scratchCartesian3, scratchQuaternion$2, LocationService, LocationServiceProvider, _a$8, _b$8, _c$5, _d$5, __decorate$3, __metadata$3, Subview, scratchCartesian$1, scratchQuaternion, scratchQuaternion2, scratchMatrix3, scratchMatrix4, scratchFrustum, IDENTITY_SUBVIEW_POSE, currentVRDisplay, ViewService, ViewServiceProvider, deviceOrientationListener, deviceOrientation, deviceOrientationHeadingAccuracy, clock, scratchTime, _a$3, _b$3, _c$2, _d$2, _e$2, _f$1, _g$1, _h$1, _j, RealityViewer, __decorate$10, __metadata$10, EmptyRealityViewer, _a$10, _b$10, _c$7, _d$7, _get$1, __decorate$11, __metadata$11, LiveRealityViewer, _a$11, _b$11, _c$8, _d$8, __decorate$12, __metadata$12, HostedRealityViewer, _a$12, _b$12, __decorate$9, __metadata$9, RealityViewerFactory, RealityService, RealityServiceProvider, _a$9, _b$9, _c$6, _d$6, _e$5, _f$4, _g$2, __decorate$2, __metadata$2, openIcon, eyeIcon, vrIcon, fullscreenIcon, argonAppIcon, DefaultUIService, _a$2, _b$2, _c$1, _d$1, _e$1, __decorate$13, __metadata$13, VuforiaServiceProvider, VuforiaService, VuforiaAPI, VuforiaTracker, VuforiaObjectTracker, DeprecatedVuforiaDataSet, _a$13, _b$13, __decorate, __metadata, ArgonSystemProvider, ArgonSystem, _a, _b, _c, _d, _e, _f, _g, _h;

    function alwaysValid() {
        return true;
    }
    function noCompose() {}

    function ensureProtocolOptions(options) {
        if (options === undefined) {
            options = {};
        } else if (typeof options === 'function') {
            options = {
                validate: options
            };
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
        return function (target) {
            var result = validate(target);
            return result === true;
        };
    }

    function createProtocolAsserter(name, validate) {
        return function (target) {
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

    function getDecoratorDependencies(target, name) {
        var dependencies = target.inject;
        if (typeof dependencies === 'function') {
            throw new Error('Decorator ' + name + ' cannot be used with "inject()".  Please use an array instead.');
        }
        if (!dependencies) {
            dependencies = metadata.getOwn(metadata.paramTypes, target).slice();
            target.inject = dependencies;
        }

        return dependencies;
    }

    function lazy(keyValue) {
        return function (target, key, index) {
            var params = getDecoratorDependencies(target, 'lazy');
            params[index] = Lazy.of(keyValue);
        };
    }

    function all(keyValue) {
        return function (target, key, index) {
            var params = getDecoratorDependencies(target, 'all');
            params[index] = All.of(keyValue);
        };
    }

    function optional() {
        var checkParentOrTarget = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

        var deco = function deco(checkParent) {
            return function (target, key, index) {
                var params = getDecoratorDependencies(target, 'optional');
                params[index] = Optional.of(params[index], checkParent);
            };
        };
        if (typeof checkParentOrTarget === 'boolean') {
            return deco(checkParentOrTarget);
        }
        return deco(true);
    }

    function parent(target, key, index) {
        var params = getDecoratorDependencies(target, 'parent');
        params[index] = Parent.of(params[index]);
    }

    function factory(keyValue, asValue) {
        return function (target, key, index) {
            var params = getDecoratorDependencies(target, 'factory');
            var factory = Factory.of(keyValue);
            params[index] = asValue ? factory.as(asValue) : factory;
        };
    }

    function newInstance(asKeyOrTarget) {
        for (var _len4 = arguments.length, dynamicDependencies = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            dynamicDependencies[_key4 - 1] = arguments[_key4];
        }

        var deco = function deco(asKey) {
            return function (target, key, index) {
                var params = getDecoratorDependencies(target, 'newInstance');
                params[index] = NewInstance.of.apply(NewInstance, [params[index]].concat(dynamicDependencies));
                if (!!asKey) {
                    params[index].as(asKey);
                }
            };
        };
        if (arguments.length >= 1) {
            return deco(asKeyOrTarget);
        }
        return deco();
    }

    function invoker(value) {
        return function (target) {
            metadata.define(metadata.invoker, value, target);
        };
    }

    function invokeAsFactory(potentialTarget) {
        var deco = function deco(target) {
            metadata.define(metadata.invoker, FactoryInvoker.instance, target);
        };

        return potentialTarget ? deco(potentialTarget) : deco;
    }

    function registration(value) {
        return function (target) {
            metadata.define(metadata.registration, value, target);
        };
    }

    function transient(key) {
        return registration(new TransientRegistration(key));
    }

    function singleton(keyOrRegisterInChild) {
        var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        return registration(new SingletonRegistration(keyOrRegisterInChild, registerInChild));
    }

    function validateKey(key) {
        if (key === null || key === undefined) {
            throw new Error('key/value cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?');
        }
    }


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

    function getDependencies(f) {
        if (!f.hasOwnProperty('inject')) {
            return [];
        }

        if (typeof f.inject === 'function') {
            return f.inject();
        }

        return f.inject;
    }

    function autoinject(potentialTarget) {
        var deco = function deco(target) {
            var previousInject = target.inject;
            var autoInject = metadata.getOwn(metadata.paramTypes, target) || _emptyParameters;
            if (!previousInject) {
                target.inject = autoInject;
            } else {
                for (var i = 0; i < autoInject.length; i++) {
                    if (previousInject[i] && previousInject[i] !== autoInject[i]) {
                        var prevIndex = previousInject.indexOf(autoInject[i]);
                        if (prevIndex > -1) {
                            previousInject.splice(prevIndex, 1);
                        }
                        previousInject.splice(prevIndex > -1 && prevIndex < i ? i - 1 : i, 0, autoInject[i]);
                    } else if (!previousInject[i]) {
                        previousInject[i] = autoInject[i];
                    }
                }
            }
        };

        return potentialTarget ? deco(potentialTarget) : deco;
    }

    function inject() {
        for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            rest[_key5] = arguments[_key5];
        }

        return function (target, key, descriptor) {
            if (typeof descriptor === 'number' && rest.length === 1) {
                var params = target.inject;
                if (typeof params === 'function') {
                    throw new Error('Decorator inject cannot be used with "inject()".  Please use an array instead.');
                }
                if (!params) {
                    params = metadata.getOwn(metadata.paramTypes, target).slice();
                    target.inject = params;
                }
                params[descriptor] = rest[0];
                return;
            }

            if (descriptor) {
                var _fn = descriptor.value;
                _fn.inject = rest;
            } else {
                target.inject = rest;
            }
        };
    }

    function removeBeforeDate(property, time) {
        var times = property._times;
        var index = ~binarySearch(times, time, JulianDate.compare);
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

    function getEventSynthesizier() {
        if (eventSynthesizerFunction) return eventSynthesizerFunction;
        var currentMouseTarget = void 0;
        var fireMouseLeaveEvents = function fireMouseLeaveEvents(target, relatedTarget, uievent) {
            if (!target) return;
            var eventInit = {
                view: uievent.view,
                clientX: uievent.clientX,
                clientY: uievent.clientY,
                screenX: uievent.screenX,
                screenY: uievent.screenY,
                relatedTarget: relatedTarget
            };
            // fire mouseout
            eventInit.bubbles = true;
            target.dispatchEvent(new MouseEvent('mouseout', eventInit));
            // fire mouseleave events
            eventInit.bubbles = false;
            var el = target;
            do {
                el.dispatchEvent(new MouseEvent('mouseleave', eventInit));
                el = el['parentElement'];
            } while (el);
        };
        var fireMouseEnterEvents = function fireMouseEnterEvents(target, relatedTarget, uievent) {
            var eventInit = {
                view: uievent.view,
                clientX: uievent.clientX,
                clientY: uievent.clientY,
                screenX: uievent.screenX,
                screenY: uievent.screenY,
                relatedTarget: relatedTarget
            };
            // fire mouseover
            eventInit.bubbles = true;
            target.dispatchEvent(new MouseEvent('mouseover', eventInit));
            // fire mouseenter events
            eventInit.bubbles = false;
            var el = target;
            do {
                el.dispatchEvent(new MouseEvent('mouseenter', eventInit));
                el = el['parentElement'];
            } while (el);
        };
        var firePointerEnterEvents = function firePointerEnterEvents(target, relatedTarget, uievent) {
            var bubbles = uievent.bubbles;
            // fire pointerover event
            uievent.bubbles = true;
            target.dispatchEvent(new PointerEvent('pointerover', uievent));
            // fire pointerenter events
            uievent.bubbles = false;
            var el = target;
            do {
                el.dispatchEvent(new MouseEvent('pointerenter', uievent));
                el = el['parentElement'];
            } while (el);
            uievent.bubbles = bubbles;
        };
        var firePointerLeaveEvents = function firePointerLeaveEvents(target, relatedTarget, uievent) {
            if (!target) return;
            // fire pointerover event
            uievent.bubbles = true;
            target.dispatchEvent(new PointerEvent('pointerout', uievent));
            // fire pointerenter events
            uievent.bubbles = false;
            var el = target;
            do {
                el.dispatchEvent(new MouseEvent('pointerleave', uievent));
                el = el['parentElement'];
            } while (el);
        };
        var deserializeTouches = function deserializeTouches(touches, target, uievent) {
            touches.forEach(function (t, i) {
                touches[i] = document.createTouch(uievent.view, target, t.identifier, t.clientX, t.clientY, t.screenX, t.screenY);
            });
            return touches;
        };
        var touchTargets = {};
        var touchStartTimes = {};
        var pointerTargets = {};
        var capturedPointerTargets = {};
        document.documentElement.addEventListener('gotpointercapture', function (e) {
            capturedPointerTargets[e.pointerId] = e.target;
        });
        document.documentElement.addEventListener('lostpointercapture', function (e) {
            delete capturedPointerTargets[e.pointerId];
        });
        return eventSynthesizerFunction = function eventSynthesizerFunction(uievent) {
            uievent.view = window;
            var target = void 0;
            switch (uievent.type) {
                case 'wheel':
                    target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                    target.dispatchEvent(new WheelEvent(uievent.type, uievent));
                    break;
                case 'mouseleave':
                    target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                    fireMouseLeaveEvents(currentMouseTarget, undefined, uievent);
                    currentMouseTarget = undefined;
                    break;
                case 'mouseenter':
                    target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                    fireMouseEnterEvents(target, undefined, uievent);
                    currentMouseTarget = target;
                    break;
                case 'mousemove':
                    target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                    if (target !== currentMouseTarget) {
                        fireMouseLeaveEvents(currentMouseTarget, target, uievent);
                        fireMouseEnterEvents(target, currentMouseTarget, uievent);
                        currentMouseTarget = target;
                    }
                    target.dispatchEvent(new MouseEvent(uievent.type, uievent));
                    break;
                case 'touchstart':
                    var primaryTouch = uievent.changedTouches[0];
                    target = document.elementFromPoint(primaryTouch.clientX, primaryTouch.clientY) || window;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = uievent.changedTouches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var t = _step.value;

                            touchTargets[t.identifier] = target;
                            touchStartTimes[t.identifier] = performance.now();
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                case 'touchmove':
                case 'touchend':
                case 'touchcancel':
                    target = touchTargets[uievent.changedTouches[0].identifier];
                    var evt = document.createEvent('TouchEvent');
                    var touches = document.createTouchList.apply(document, deserializeTouches(uievent.touches, target, uievent));
                    var targetTouches = document.createTouchList.apply(document, deserializeTouches(uievent.targetTouches, target, uievent));
                    var changedTouches = document.createTouchList.apply(document, deserializeTouches(uievent.changedTouches, target, uievent));
                    // Safari, Firefox: must use initTouchEvent.
                    if (typeof evt['initTouchEvent'] === "function") {
                        evt['initTouchEvent'](uievent.type, uievent.bubbles, uievent.cancelable, uievent.view, uievent.detail, uievent.screenX, uievent.screenY, uievent.clientX, uievent.clientY, uievent.ctrlKey, uievent.altKey, uievent.shiftKey, uievent.metaKey, touches, targetTouches, changedTouches, 1.0, 0.0);
                    } else {
                        evt.initUIEvent(uievent.type, uievent.bubbles, uievent.cancelable, uievent.view, uievent.detail);
                        evt.touches = touches;
                        evt.targetTouches = targetTouches;
                        evt.changedTouches = changedTouches;
                    }
                    if (uievent.type === 'touchend' || uievent.type == 'touchcancel') {
                        target.dispatchEvent(evt);
                        var _primaryTouch = changedTouches[0];
                        uievent.clientX = _primaryTouch.clientX;
                        uievent.clientY = _primaryTouch.clientY;
                        uievent.screenX = _primaryTouch.screenX;
                        uievent.screenY = _primaryTouch.screenY;
                        uievent.button = 0;
                        uievent.detail = 1;
                        if (uievent.type === 'touchend') {
                            if (performance.now() - touchStartTimes[_primaryTouch.identifier] < 300 && !evt.defaultPrevented) {
                                target.dispatchEvent(new MouseEvent('mousedown', uievent));
                                target.dispatchEvent(new MouseEvent('mouseup', uievent));
                                target.dispatchEvent(new MouseEvent('click', uievent));
                            }
                        } else {
                            target.dispatchEvent(new MouseEvent('mouseout', uievent));
                        }
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = uievent.changedTouches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var _t = _step2.value;

                                delete touchTargets[_t.identifier];
                                delete touchStartTimes[_t.identifier];
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    } else {
                        target.dispatchEvent(evt);
                    }
                    break;
                case 'pointerenter':
                case 'pointerleave':
                case 'pointermove':
                case 'pointercancel':
                case 'pointerdown':
                case 'pointerup':
                    var previousTarget = pointerTargets[uievent.pointerId];
                    var capturedTarget = target = capturedPointerTargets[uievent.pointerId];
                    var isLeaving = uievent.type === 'pointerleave' || uievent.type === 'pointercancel';
                    var pointerEvent = new PointerEvent(uievent.type, uievent);
                    if (capturedTarget) {
                        capturedTarget.dispatchEvent(pointerEvent);
                    } else {
                        target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                        if (target !== previousTarget) {
                            firePointerLeaveEvents(previousTarget, target, uievent);
                            if (!isLeaving) firePointerEnterEvents(target, previousTarget, uievent);
                        }
                        target.dispatchEvent(pointerEvent);
                    }
                    if (isLeaving) {
                        delete pointerTargets[uievent.pointerId];
                    } else {
                        pointerTargets[uievent.pointerId] = target;
                    }
                    break;
                default:
                    target = document.elementFromPoint(uievent.clientX, uievent.clientY) || window;
                    target.dispatchEvent(new MouseEvent(uievent.type, uievent));
            }
        };
    }

    function createEventForwarder(viewportService, callback) {
        var _forwardEvent = false;
        var eventData = {
            event: UIEvent = undefined,
            forwardEvent: function forwardEvent() {
                _forwardEvent = true;
            }
        };
        var uievent = {};
        var handleEvent = function handleEvent(e) {
            if (e.target === viewportService.element || e.target.parentElement === viewportService.element) {
                var boundingRect = viewportService.element.getBoundingClientRect();
                if (viewportService.uiEvent.numberOfListeners > 0) {
                    _forwardEvent = false;
                    eventData.event = e;
                    viewportService.uiEvent.raiseEvent(eventData);
                    // allow the containing element to receive the current event 
                    // for local reality viewers
                    if (!_forwardEvent) {
                        e.stopImmediatePropagation();
                        return;
                    }
                }
                e.preventDefault();
                var touches = cloneTouches(e.touches, boundingRect);
                var changedTouches = cloneTouches(e.changedTouches, boundingRect);
                var targetTouches = cloneTouches(e.targetTouches, boundingRect);
                // Event / UI Event
                uievent.timeStamp = e.timeStamp;
                uievent.type = e.type;
                uievent.bubbles = e.bubbles;
                uievent.cancelable = e.cancelable;
                uievent.which = e.which;
                uievent.detail = e.detail;
                // Mouse Event
                uievent.altKey = e.altKey;
                uievent.ctrlKey = e.ctrlKey;
                uievent.metaKey = e.metaKey;
                uievent.button = e.button;
                uievent.buttons = e.buttons;
                uievent.clientX = e.clientX - boundingRect.left;
                uievent.clientY = e.clientY - boundingRect.top;
                uievent.screenX = e.screenX;
                uievent.screenY = e.screenY;
                uievent.movementX = e.movementX;
                uievent.movementY = e.movementY;
                // Wheel Event
                uievent.deltaX = e.deltaX;
                uievent.deltaY = e.deltaY;
                uievent.deltaZ = e.deltaZ;
                uievent.deltaMode = e.deltaMode;
                uievent.wheelDelta = e.wheelDelta;
                uievent.wheelDeltaX = e.wheelDeltaX;
                uievent.wheelDeltaY = e.wheelDeltaY;
                // Touch Event
                uievent.touches = touches;
                uievent.changedTouches = changedTouches;
                uievent.targetTouches = targetTouches;
                // Pointer Events
                uievent.pointerId = e.pointerId;
                uievent.width = e.width;
                uievent.height = e.height;
                uievent.pressure = e.pressure;
                uievent.tiltX = e.tiltX;
                uievent.tiltY = e.tiltY;
                uievent.isPrimary = e.isPrimary;
                callback(uievent);
            } else {
                e.stopImmediatePropagation();
            }
        };
        var forwardedEvent = ['wheel', 'click', 'dblclick', 'contextmenu'];
        if (FeatureDetection.supportsPointerEvents()) {
            forwardedEvent.push('pointerenter', 'pointerleave', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel');
        } else {
            forwardedEvent.push('mouseenter', 'mouseleave', 'mousedown', 'mousemove', 'mouseup', 'touchstart', 'touchend', 'touchmove', 'touchcancel');
        }
        forwardedEvent.forEach(function (type) {
            viewportService.element.addEventListener(type, handleEvent, false);
        });
    }

    /**
     * Get array of ancestor reference frames of a Cesium Entity, ordered from
     * farthest ancestor to the passed frame.
     * @param frame A Cesium Entity to get ancestor reference frames.
     * @param frames An array of reference frames of the Cesium Entity.
     */
    function getAncestorReferenceFrames(frame) {
        var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        var frames = result;
        frames.length = 0;
        frames.unshift(frame);
        var f = frame;
        do {
            var position = f.position;
            f = position && position.referenceFrame;
            if (defined(f)) frames.unshift(f);
        } while (defined(f));
        return frames;
    }
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
    /**
     * Alias of getEntityPositionInReferenceFrame
     */

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
        if (!defined(entityFrame)) return undefined;
        var orientation = entity.orientation && entity.orientation.getValue(time, result);
        if (!defined(orientation)) return undefined;
        return OrientationProperty.convertToReferenceFrame(time, orientation, entityFrame, referenceFrame, result);
    }
    /**
     * Alias of getEntityOrientationInReferenceFrame
     */

    /**
     * Create a SerializedEntityPose from a source entity.
     * @param entity The entity which the serialized pose represents.
     * @param time The time which to retrieve the pose.
     * @param referenceFrame The reference frame to use for generating the pose.
     * If a target reference frame is not provided, the entity pose will be
     * serialized according to the furthest ancestor frame that resolves to a valid pose.
     * @return An EntityPose object with orientation, position and referenceFrame.
     */
    function getSerializedEntityState(entity, time, frame) {
        var frames = undefined;
        if (!defined(frame)) {
            frames = getAncestorReferenceFrames(entity, _scratchFramesArray);
            frame = frames[0];
        }
        if (!defined(frame)) return undefined;
        var p = getEntityPositionInReferenceFrame(entity, time, frame, {});
        if (!p && !frames) return undefined;
        var o = getEntityOrientationInReferenceFrame(entity, time, frame, {});
        if (!o && !frames) return undefined;
        if (p && o) {
            return {
                p: p,
                o: o,
                r: typeof frame === 'number' ? frame : frame.id,
                meta: typeof frame !== 'number' ? frame['meta'] : undefined
            };
        } else if (frames) {
            for (var i = 1; i < frames.length; i++) {
                frame = frames[i];
                if (!defined(frame)) return undefined;
                var result = getSerializedEntityState(entity, time, frame);
                if (result) return result;
            }
        }
        return undefined;
    }

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
    function resolveElement(elementOrSelector) {
        if (elementOrSelector instanceof HTMLElement) {
            return Promise.resolve(elementOrSelector);
        } else {
            return new Promise(function (resolve, reject) {
                var resolveElement = function resolveElement() {
                    var e = document.querySelector('' + elementOrSelector);
                    if (!e) reject(new Error('Unable to resolve element id ' + elementOrSelector));else resolve(e);
                };
                if (document.readyState == 'loading') {
                    document.addEventListener('DOMContentLoaded', resolveElement);
                } else {
                    resolveElement();
                }
            });
        }
    }
    function decomposePerspectiveOffCenterProjectionMatrix(mat, result) {
        var m11 = mat[Matrix4.COLUMN0ROW0];
        // const m12 = mat[Matrix4.COLUMN0ROW1];
        var m22 = mat[Matrix4.COLUMN1ROW1];
        var m31 = mat[Matrix4.COLUMN2ROW0];
        var m32 = mat[Matrix4.COLUMN2ROW1];
        var m33 = mat[Matrix4.COLUMN2ROW2];
        var m43 = mat[Matrix4.COLUMN3ROW2];
        var near = result.near = m43 / (m33 - 1);
        result.far = m43 / (m33 + 1);
        result.bottom = near * (m32 - 1) / m22;
        result.top = near * (m32 + 1) / m22;
        result.left = near * (m31 - 1) / m11;
        result.right = near * (m31 + 1) / m11;
        return result;
    }

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
        var fov = void 0;
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
        if (!entity.position || !(entity.position instanceof ConstantPositionProperty) || !entity.orientation || !(entity.orientation instanceof ConstantProperty)) {
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

    function openInArgonApp() {
        if (isIOS) {
            // var now = Date.now();
            // setTimeout(function () {
            //     if (Date.now() - now > 1000) return;
            //     window.location.href = "https://itunes.apple.com/us/app/argon4/id1089308600";
            // }, 25);
            var protocol = window.location.protocol;
            window.location.protocol = protocol === 'https:' ? 'argon4s' : 'argon4';
        }
    }

    function deprecated$1(alternative) {
        var didPrintWarning = false;
        var decorator = function decorator(target, name, descriptor) {
            var original = descriptor.get || descriptor.value;
            var originalType = typeof descriptor.value === 'function' ? 'function' : 'property';
            var message = 'The "' + name + '" ' + originalType + ' is deprecated. ';
            if (alternative) {
                var alternativeType = typeof target[alternative] === 'function' ? 'function' : 'property';
                message += 'Please use the "' + alternative + '" ' + alternativeType + ' instead.';
            }
            var wrapped = function wrapped() {
                if (!didPrintWarning) {
                    console.warn(message);
                    didPrintWarning = true;
                }
                return original.apply(this, arguments);
            };
            if (descriptor.value) descriptor.value = wrapped;else descriptor.get = wrapped;
            return descriptor;
        };
        return decorator;
    }

    function extractVersion(versionString) {
        var parts = versionString.split('.');
        for (var i = 0, len = parts.length; i < len; ++i) {
            parts[i] = parseInt(parts[i], 10);
        }
        return parts;
    }

    function _stringFromReferenceFrame(referenceFrame) {
        var rf = referenceFrame;
        return defined(rf.id) ? rf.id : '' + rf;
    }

    function updatePhysicalEyePoseFromDeviceOrientation(contextService) {
        var physicalEye = contextService.entities.getById(PHYSICAL_EYE_ENTITY_ID);
        var physicalStage = contextService.entities.getById(PHYSICAL_STAGE_ENTITY_ID);
        if (physicalEye) {
            ensureOrientationUpdates();
            if (!deviceOrientation) {
                physicalEye.position.setValue(undefined, undefined);
                physicalEye.orientation.setValue(undefined);
                physicalEye['meta'] = undefined;
                return;
            }
            var screenOrientationDegrees = screen['orientation'] && screen['orientation'].angle || window.orientation || 0;
            var displayOrientation = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, -screenOrientationDegrees * CesiumMath.RADIANS_PER_DEGREE, scratchQuaternion2);
            physicalEye.position.setValue(Cartesian3.fromElements(0, 0, AVERAGE_HUMAN_HEIGHT, scratchCartesian$1), physicalStage);
            physicalEye.orientation.setValue(Quaternion.multiply(deviceOrientation, displayOrientation, scratchQuaternion));
            physicalEye['meta'] = physicalEye['meta'] || {};
            physicalEye['meta'].headingAccuracy = deviceOrientationHeadingAccuracy;
        }
    }
    function ensureOrientationUpdates() {
        if (typeof window == 'undefined' || !window.addEventListener) throw new Error('Orientation updates not supported');
        if (defined(deviceOrientationListener)) return;
        var headingDrift = 0;
        var alphaOffset = undefined;
        deviceOrientationListener = function deviceOrientationListener(e) {
            var alphaDegrees = e.alpha;
            var webkitCompassHeading = e['webkitCompassHeading'];
            var webkitCompassAccuracy = +e['webkitCompassAccuracy'];
            if (!defined(alphaDegrees)) {
                return;
            }
            if (e.absolute) {
                alphaOffset = 0;
            }
            // when the phone is almost updside down, webkit flips the compass heading 
            // (not documented anywhere, annoyingly)
            // if (e.beta >= 130 || e.beta <= -130) webkitCompassHeading = undefined;
            deviceOrientationHeadingAccuracy = webkitCompassAccuracy > 0 ? webkitCompassAccuracy : undefined;
            if ((!defined(alphaOffset) || Math.abs(headingDrift) > 5) && defined(webkitCompassHeading) && webkitCompassAccuracy >= 0 &&
            // webkitCompassAccuracy < 50 &&
            webkitCompassHeading >= 0) {
                if (!defined(alphaOffset)) {
                    alphaOffset = -webkitCompassHeading;
                } else {
                    alphaOffset -= headingDrift;
                }
            }
            if (!defined(alphaOffset)) return;
            var alpha = CesiumMath.RADIANS_PER_DEGREE * (e.alpha + alphaOffset || -webkitCompassHeading || 0);
            var beta = CesiumMath.RADIANS_PER_DEGREE * e.beta;
            var gamma = CesiumMath.RADIANS_PER_DEGREE * e.gamma;
            var alphaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, alpha, scratchQuaternion);
            var betaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, beta, scratchQuaternion2);
            var alphaBetaQuat = Quaternion.multiply(alphaQuat, betaQuat, scratchQuaternion);
            var gammaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Y, gamma, scratchQuaternion2);
            var alphaBetaGammaQuat = Quaternion.multiply(alphaBetaQuat, gammaQuat, scratchQuaternion);
            deviceOrientation = Quaternion.clone(alphaBetaGammaQuat, deviceOrientation);
            deviceOrientationHeadingAccuracy = webkitCompassAccuracy;
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
        if ('ondeviceorientationabsolute' in window) {
            window.addEventListener('deviceorientationabsolute', deviceOrientationListener);
        } else if ('ondeviceorientation' in window) {
            window.addEventListener('deviceorientation', deviceOrientationListener);
        }
    }

    // Enforce monotonically increasing time, and deal with 
    // clock drift by either slowing down or speeding up,
    // while never going backwards
    function tick() {
        var secondsBeforeTick = clock.currentTime.secondsOfDay;
        clock.tick();
        var secondsAfterTick = clock.currentTime.secondsOfDay;
        var now = JulianDate.now(scratchTime);
        var secondsDrift = JulianDate.secondsDifference(clock.currentTime, now);
        if (secondsDrift > 0.033) {
            var halfTimeStep = (secondsAfterTick - secondsBeforeTick) / 2;
            clock.currentTime.secondsOfDay -= halfTimeStep;
        } else if (secondsDrift < 0.5) {
            JulianDate.clone(now, clock.currentTime);
        }
    }

    function init$1(parentElementOrConfig, configurationOrDIContainer, dependencyInjectionContainer) {
        if (ArgonSystem.instance) throw new Error('A shared ArgonSystem instance already exists');
        var parentElement = void 0;
        var configuration = void 0;
        if (configurationOrDIContainer instanceof Container) {
            parentElement = ParentElement;
            configuration = parentElementOrConfig;
            dependencyInjectionContainer = configurationOrDIContainer;
        } else {
            parentElement = parentElementOrConfig;
            configuration = configurationOrDIContainer;
        }
        // see if it is the old parameter interface
        if (parentElement && (parentElement['configuration'] || parentElement['container'])) {
            var deprecatedParameters = parentElement;
            if (!configuration && deprecatedParameters['configuration']) configuration = deprecatedParameters['configuration'];
            if (!configuration && deprecatedParameters['container']) dependencyInjectionContainer = deprecatedParameters['container'];
            parentElement = undefined;
        }
        var role = void 0;
        if (typeof HTMLElement === 'undefined') {
            role = Role.REALITY_MANAGER;
        } else if (navigator.userAgent.indexOf('Argon') > 0 || window.top !== window) {
            role = Role.APPLICATION; // TODO: switch to below after several argon-app releases
        } else {
            role = Role.REALITY_MANAGER;
        }
        if (!configuration) configuration = {};
        configuration.role = role;
        if (!dependencyInjectionContainer) dependencyInjectionContainer = new Container();
        return new ArgonSystem(parentElement || null, configuration, dependencyInjectionContainer);
    }
    /**
     * Initialize an [[ArgonSystem]] with the [[REALITY_VIEWER]] role
     */
    function initRealityViewer() {
        var configuration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var dependencyInjectionContainer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Container();

        if (ArgonSystem.instance) throw new Error('A shared ArgonSystem instance already exists');
        configuration.role = Role.REALITY_VIEW; // TODO: switch to below after several argon-app releases
        // configuration.role = Role.REALITY_VIEWER;
        configuration['supportsCustomProtocols'] = true;
        configuration['reality.supportsControlPort'] = true; // backwards compat for above
        configuration.protocols = configuration.protocols || [];
        configuration.protocols.push('ar.uievent');
        return new ArgonSystem(null, configuration, dependencyInjectionContainer);
    }
    return {
        setters: [function (_) {}, function (_2) {
            AggregateError = _2.AggregateError;
            PLATFORM = _2.PLATFORM;
        }, function (_d2) {
            binarySearch = _d2.default;
        }, function (_3) {
            cesium_Source_DataSources_CallbackProperty_js = _3.default;
        }, function (_4) {
            CameraEventAggregator = _4.default;
        }, function (_5) {
            CameraEventType = _5.default;
        }, function (_a2) {
            cesium_Source_Core_Cartesian2_js = _a2.default;
        }, function (_d3) {
            Cartesian3 = _d3.default;
        }, function (_6) {
            cesium_Source_Core_Cartesian4_js = _6.default;
        }, function (_d4) {
            Cartographic = _d4.default;
        }, function (_7) {
            Clock = _7.default;
        }, function (_8) {
            cesium_Source_Core_ClockStep_js = _8.default;
        }, function (_9) {
            cesium_Source_DataSources_CompositeEntityCollection_js = _9.default;
        }, function (_c2) {
            ConstantPositionProperty = _c2.default;
        }, function (_10) {
            ConstantProperty = _10.default;
        }, function (_11) {
            createGuid = _11.default;
        }, function (_12) {
            cesium_Source_Core_defaultValue_js = _12.default;
        }, function (_13) {
            defined = _13.default;
        }, function (_14) {
            cesium_Source_Core_DeveloperError_js = _14.default;
        }, function (_e2) {
            cesium_Source_Core_Ellipsoid_js = _e2.default;
        }, function (_a3) {
            Entity = _a3.default;
        }, function (_b2) {
            EntityCollection = _b2.default;
        }, function (_15) {
            CesiumEvent = _15.default;
        }, function (_b3) {
            cesium_Source_Core_ExtrapolationType_js = _b3.default;
        }, function (_e3) {
            FeatureDetection = _e3.default;
        }, function (_c3) {
            cesium_Source_Core_GeographicProjection_js = _c3.default;
        }, function (_f2) {
            cesium_Source_Core_HermitePolynomialApproximation_js = _f2.default;
        }, function (_16) {
            JulianDate = _16.default;
        }, function (_d5) {
            CesiumMath = _d5.default;
        }, function (_17) {
            Matrix3 = _17.default;
        }, function (_18) {
            Matrix4 = _18.default;
        }, function (_19) {
            OrientationProperty = _19.default;
        }, function (_20) {
            PerspectiveFrustum = _20.default;
        }, function (_21) {
            PerspectiveOffCenterFrustum = _21.default;
        }, function (_f3) {
            cesium_Source_DataSources_PositionProperty_js = _f3.default;
        }, function (_22) {
            cesium_Source_DataSources_Property_js = _22.default;
        }, function (_23) {
            Quaternion = _23.default;
        }, function (_24) {
            cesium_Source_DataSources_ReferenceEntity_js = _24.default;
        }, function (_e4) {
            ReferenceFrame = _e4.default;
        }, function (_25) {
            cesium_Source_DataSources_ReferenceProperty_js = _25.default;
        }, function (_26) {
            SampledPositionProperty = _26.default;
        }, function (_a4) {
            SampledProperty = _a4.default;
        }, function (_e5) {
            cesium_Source_Core_ScreenSpaceEventHandler_js = _e5.default;
        }, function (_f4) {
            cesium_Source_Core_ScreenSpaceEventType_js = _f4.default;
        }, function (_27) {
            Transforms = _27.default;
        }, function (_28) {
            cesium_Source_Core_Simon1994PlanetaryPositions_js = _28.default;
        }, function (_f5) {
            cesium_Source_Core_PolylinePipeline_js = _f5.default;
        }, function (_empty) {}],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _classCallCheck = function (instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            };

            _extends = Object.assign || function (target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }return target;
            };

            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
            };
            metadata = {
                resource: 'aurelia:resource',
                paramTypes: 'design:paramtypes',
                propertyType: 'design:type',
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
            originStorage = new Map();
            unknownOrigin = Object.freeze({ moduleId: undefined, moduleMember: undefined });

            Origin = function () {
                function Origin(moduleId, moduleMember) {

                    this.moduleId = moduleId;
                    this.moduleMember = moduleMember;
                }

                Origin.get = function get(fn) {
                    var origin = originStorage.get(fn);

                    if (origin === undefined) {
                        PLATFORM.eachModule(function (key, value) {
                            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                                for (var name in value) {
                                    var exp = value[name];
                                    if (exp === fn) {
                                        originStorage.set(fn, origin = new Origin(key, name));
                                        return true;
                                    }
                                }
                            }

                            if (value === fn) {
                                originStorage.set(fn, origin = new Origin(key, 'default'));
                                return true;
                            }

                            return false;
                        });
                    }

                    return origin || unknownOrigin;
                };

                Origin.set = function set(fn, origin) {
                    originStorage.set(fn, origin);
                };

                return Origin;
            }();

            protocol.create = function (name, options) {
                options = ensureProtocolOptions(options);
                var hidden = 'protocol:' + name;
                var result = function result(target) {
                    var decorator = protocol(name, options);
                    return target ? decorator(target) : decorator;
                };

                result.decorates = function (obj) {
                    return obj[hidden] === true;
                };
                result.validate = createProtocolValidator(options.validate);
                result.assert = createProtocolAsserter(name, options.validate);

                return result;
            };

            resolver = protocol.create('aurelia:resolver', function (target) {
                if (!(typeof target.get === 'function')) {
                    return 'Resolvers must implement: get(container: Container, key: any): any';
                }

                return true;
            });
            Lazy = (_dec = resolver(), _dec(_class = function () {
                function Lazy(key) {

                    this._key = key;
                }

                Lazy.prototype.get = function get(container) {
                    var _this = this;

                    return function () {
                        return container.get(_this._key);
                    };
                };

                Lazy.of = function of(key) {
                    return new Lazy(key);
                };

                return Lazy;
            }()) || _class);
            All = (_dec2 = resolver(), _dec2(_class3 = function () {
                function All(key) {

                    this._key = key;
                }

                All.prototype.get = function get(container) {
                    return container.getAll(this._key);
                };

                All.of = function of(key) {
                    return new All(key);
                };

                return All;
            }()) || _class3);
            Optional = (_dec3 = resolver(), _dec3(_class5 = function () {
                function Optional(key) {
                    var checkParent = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

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
                    var checkParent = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

                    return new Optional(key, checkParent);
                };

                return Optional;
            }()) || _class5);
            Parent = (_dec4 = resolver(), _dec4(_class7 = function () {
                function Parent(key) {

                    this._key = key;
                }

                Parent.prototype.get = function get(container) {
                    return container.parent ? container.parent.get(this._key) : null;
                };

                Parent.of = function of(key) {
                    return new Parent(key);
                };

                return Parent;
            }()) || _class7);
            StrategyResolver = (_dec5 = resolver(), _dec5(_class9 = function () {
                function StrategyResolver(strategy, state) {

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

                return StrategyResolver;
            }()) || _class9);
            Factory = (_dec6 = resolver(), _dec6(_class11 = function () {
                function Factory(key) {

                    this._key = key;
                }

                Factory.prototype.get = function get(container) {
                    var _this2 = this;

                    return function () {
                        for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                            rest[_key] = arguments[_key];
                        }

                        return container.invoke(_this2._key, rest);
                    };
                };

                Factory.of = function of(key) {
                    return new Factory(key);
                };

                return Factory;
            }()) || _class11);
            NewInstance = (_dec7 = resolver(), _dec7(_class13 = function () {
                function NewInstance(key) {

                    this.key = key;
                    this.asKey = key;

                    for (var _len2 = arguments.length, dynamicDependencies = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                        dynamicDependencies[_key2 - 1] = arguments[_key2];
                    }

                    this.dynamicDependencies = dynamicDependencies;
                }

                NewInstance.prototype.get = function get(container) {
                    var dynamicDependencies = this.dynamicDependencies.length > 0 ? this.dynamicDependencies.map(function (dependency) {
                        return dependency['protocol:aurelia:resolver'] ? dependency.get(container) : container.get(dependency);
                    }) : undefined;
                    var instance = container.invoke(this.key, dynamicDependencies);
                    container.registerInstance(this.asKey, instance);
                    return instance;
                };

                NewInstance.prototype.as = function as(key) {
                    this.asKey = key;
                    return this;
                };

                NewInstance.of = function of(key) {
                    for (var _len3 = arguments.length, dynamicDependencies = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                        dynamicDependencies[_key3 - 1] = arguments[_key3];
                    }

                    return new (Function.prototype.bind.apply(NewInstance, [null].concat([key], dynamicDependencies)))();
                };

                return NewInstance;
            }()) || _class13);

            FactoryInvoker = function () {
                function FactoryInvoker() {}

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

                return FactoryInvoker;
            }();

            FactoryInvoker.instance = new FactoryInvoker();
            TransientRegistration = function () {
                function TransientRegistration(key) {

                    this._key = key;
                }

                TransientRegistration.prototype.registerResolver = function registerResolver(container, key, fn) {
                    return container.registerTransient(this._key || key, fn);
                };

                return TransientRegistration;
            }();

            SingletonRegistration = function () {
                function SingletonRegistration(keyOrRegisterInChild) {
                    var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

                    if (typeof keyOrRegisterInChild === 'boolean') {
                        this._registerInChild = keyOrRegisterInChild;
                    } else {
                        this._key = keyOrRegisterInChild;
                        this._registerInChild = registerInChild;
                    }
                }

                SingletonRegistration.prototype.registerResolver = function registerResolver(container, key, fn) {
                    return this._registerInChild ? container.registerSingleton(this._key || key, fn) : container.root.registerSingleton(this._key || key, fn);
                };

                return SingletonRegistration;
            }();

            _emptyParameters = Object.freeze([]);


            metadata.registration = 'aurelia:registration';
            metadata.invoker = 'aurelia:invoker';

            resolverDecorates = resolver.decorates;

            InvocationHandler = function () {
                function InvocationHandler(fn, invoker, dependencies) {

                    this.fn = fn;
                    this.invoker = invoker;
                    this.dependencies = dependencies;
                }

                InvocationHandler.prototype.invoke = function invoke(container, dynamicDependencies) {
                    return dynamicDependencies !== undefined ? this.invoker.invokeWithDynamicDependencies(container, this.fn, this.dependencies, dynamicDependencies) : this.invoker.invoke(container, this.fn, this.dependencies);
                };

                return InvocationHandler;
            }();

            classInvokers = (_classInvokers = {}, _classInvokers[0] = {
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

            Container = function () {
                function Container(configuration) {

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
                    return this.registerResolver(key, new StrategyResolver(0, instance === undefined ? key : instance));
                };

                Container.prototype.registerSingleton = function registerSingleton(key, fn) {
                    return this.registerResolver(key, new StrategyResolver(1, fn === undefined ? key : fn));
                };

                Container.prototype.registerTransient = function registerTransient(key, fn) {
                    return this.registerResolver(key, new StrategyResolver(2, fn === undefined ? key : fn));
                };

                Container.prototype.registerHandler = function registerHandler(key, handler) {
                    return this.registerResolver(key, new StrategyResolver(3, handler));
                };

                Container.prototype.registerAlias = function registerAlias(originalKey, aliasKey) {
                    return this.registerResolver(aliasKey, new StrategyResolver(5, originalKey));
                };

                Container.prototype.registerResolver = function registerResolver(key, resolver) {
                    validateKey(key);

                    var allResolvers = this._resolvers;
                    var result = allResolvers.get(key);

                    if (result === undefined) {
                        allResolvers.set(key, resolver);
                    } else if (result.strategy === 4) {
                        result.state.push(resolver);
                    } else {
                        allResolvers.set(key, new StrategyResolver(4, [result, resolver]));
                    }

                    return resolver;
                };

                Container.prototype.autoRegister = function autoRegister(key, fn) {
                    fn = fn === undefined ? key : fn;

                    if (typeof fn === 'function') {
                        var _registration = metadata.get(metadata.registration, fn);

                        if (_registration === undefined) {
                            return this.registerResolver(key, new StrategyResolver(1, fn));
                        }

                        return _registration.registerResolver(this, key, fn);
                    }

                    return this.registerResolver(key, new StrategyResolver(0, fn));
                };

                Container.prototype.autoRegisterAll = function autoRegisterAll(fns) {
                    var i = fns.length;
                    while (i--) {
                        this.autoRegister(fns[i]);
                    }
                };

                Container.prototype.unregister = function unregister(key) {
                    this._resolvers.delete(key);
                };

                Container.prototype.hasResolver = function hasResolver(key) {
                    var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

                    validateKey(key);

                    return this._resolvers.has(key) || checkParent && this.parent !== null && this.parent.hasResolver(key, checkParent);
                };

                Container.prototype.get = function get(key) {
                    validateKey(key);

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
                    validateKey(key);

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
                        throw new AggregateError('Error invoking ' + fn.name + '. Check the inner error for details.', e, true);
                    }
                };

                Container.prototype._createInvocationHandler = function _createInvocationHandler(fn) {
                    var dependencies = void 0;

                    if (fn.inject === undefined) {
                        dependencies = metadata.getOwn(metadata.paramTypes, fn) || _emptyParameters;
                    } else {
                        dependencies = [];
                        var ctor = fn;
                        while (typeof ctor === 'function') {
                            var _dependencies;

                            (_dependencies = dependencies).push.apply(_dependencies, getDependencies(ctor));
                            ctor = Object.getPrototypeOf(ctor);
                        }
                    }

                    var invoker = metadata.getOwn(metadata.invoker, fn) || classInvokers[dependencies.length] || classInvokers.fallback;

                    var handler = new InvocationHandler(fn, invoker, dependencies);
                    return this._onHandlerCreated !== undefined ? this._onHandlerCreated(handler) : handler;
                };

                return Container;
            }();

            _export('DI', aureliaDependencyInjection = Object.freeze({
                resolver: resolver,
                Lazy: Lazy,
                All: All,
                Optional: Optional,
                Parent: Parent,
                StrategyResolver: StrategyResolver,
                Factory: Factory,
                NewInstance: NewInstance,
                getDecoratorDependencies: getDecoratorDependencies,
                lazy: lazy,
                all: all,
                optional: optional,
                parent: parent,
                factory: factory,
                newInstance: newInstance,
                invoker: invoker,
                invokeAsFactory: invokeAsFactory,
                FactoryInvoker: FactoryInvoker,
                registration: registration,
                transient: transient,
                singleton: singleton,
                TransientRegistration: TransientRegistration,
                SingletonRegistration: SingletonRegistration,
                _emptyParameters: _emptyParameters,
                InvocationHandler: InvocationHandler,
                Container: Container,
                autoinject: autoinject,
                inject: inject
            }));

            after = function after(fn, _after) {
                return function () {
                    var result = fn.apply(this, arguments);
                    _after.call(this, result);
                    return result;
                };
            };

            SampledProperty.prototype.removeSamplesBeforeDate = function (time) {
                removeBeforeDate(this, time);
            };
            SampledPositionProperty.prototype.removeSamplesBeforeDate = function (time) {
                removeBeforeDate(this._property, time);
            };SampledProperty.prototype.addSample = after(SampledProperty.prototype.addSample, function () {
                removeOldSamples(this, this.maxNumSamples);
            });
            SampledProperty.prototype.addSamples = after(SampledProperty.prototype.addSamples, function () {
                removeOldSamples(this, this.maxNumSamples);
            });
            SampledProperty.prototype.addSamplesPackedArray = after(SampledProperty.prototype.addSamplesPackedArray, function () {
                removeOldSamples(this, this.maxNumSamples);
            });
            SampledPositionProperty.prototype.addSample = after(SampledPositionProperty.prototype.addSample, function () {
                removeOldSamples(this._property, this.maxNumSamples);
            });
            SampledPositionProperty.prototype.addSamples = after(SampledPositionProperty.prototype.addSamples, function () {
                removeOldSamples(this._property, this.maxNumSamples);
            });
            SampledPositionProperty.prototype.addSamplesPackedArray = after(SampledPositionProperty.prototype.addSamplesPackedArray, function () {
                removeOldSamples(this._property, this.maxNumSamples);
            });

            _export('Cesium', cesiumImports = Object.freeze({
                binarySearch: binarySearch,
                CallbackProperty: cesium_Source_DataSources_CallbackProperty_js,
                CameraEventAggregator: CameraEventAggregator,
                CameraEventType: CameraEventType,
                Cartesian2: cesium_Source_Core_Cartesian2_js,
                Cartesian3: Cartesian3,
                Cartesian4: cesium_Source_Core_Cartesian4_js,
                Cartographic: Cartographic,
                Clock: Clock,
                ClockStep: cesium_Source_Core_ClockStep_js,
                CompositeEntityCollection: cesium_Source_DataSources_CompositeEntityCollection_js,
                ConstantPositionProperty: ConstantPositionProperty,
                ConstantProperty: ConstantProperty,
                createGuid: createGuid,
                defaultValue: cesium_Source_Core_defaultValue_js,
                defined: defined,
                DeveloperError: cesium_Source_Core_DeveloperError_js,
                Ellipsoid: cesium_Source_Core_Ellipsoid_js,
                Entity: Entity,
                EntityCollection: EntityCollection,
                Event: CesiumEvent,
                ExtrapolationType: cesium_Source_Core_ExtrapolationType_js,
                FeatureDetection: FeatureDetection,
                GeographicProjection: cesium_Source_Core_GeographicProjection_js,
                HermitePolynomialApproximation: cesium_Source_Core_HermitePolynomialApproximation_js,
                JulianDate: JulianDate,
                CesiumMath: CesiumMath,
                Matrix3: Matrix3,
                Matrix4: Matrix4,
                OrientationProperty: OrientationProperty,
                PerspectiveFrustum: PerspectiveFrustum,
                PerspectiveOffCenterFrustum: PerspectiveOffCenterFrustum,
                PositionProperty: cesium_Source_DataSources_PositionProperty_js,
                Property: cesium_Source_DataSources_Property_js,
                Quaternion: Quaternion,
                ReferenceEntity: cesium_Source_DataSources_ReferenceEntity_js,
                ReferenceFrame: ReferenceFrame,
                ReferenceProperty: cesium_Source_DataSources_ReferenceProperty_js,
                SampledPositionProperty: SampledPositionProperty,
                SampledProperty: SampledProperty,
                ScreenSpaceEventHandler: cesium_Source_Core_ScreenSpaceEventHandler_js,
                ScreenSpaceEventType: cesium_Source_Core_ScreenSpaceEventType_js,
                Transforms: Transforms,
                Simon1994PlanetaryPositions: cesium_Source_Core_Simon1994PlanetaryPositions_js,
                PolylinePipeline: cesium_Source_Core_PolylinePipeline_js
            }));

            _possibleConstructorReturn = function (self, call) {
                if (!self) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }

                return call && (typeof call === "object" || typeof call === "function") ? call : self;
            };

            _inherits = function (subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                }

                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            };

            _export('AVERAGE_HUMAN_HEIGHT', AVERAGE_HUMAN_HEIGHT = 1.77);

            _export('EYE_ENTITY_ID', EYE_ENTITY_ID = 'ar.eye');

            _export('PHYSICAL_EYE_ENTITY_ID', PHYSICAL_EYE_ENTITY_ID = 'ar.physical-eye');

            _export('STAGE_ENTITY_ID', STAGE_ENTITY_ID = 'ar.stage');

            _export('PHYSICAL_STAGE_ENTITY_ID', PHYSICAL_STAGE_ENTITY_ID = 'ar.physical-stage');

            (function (Role) {
                /**
                 * A system with this role is responsible for augmenting an arbitrary view of reality,
                 * generally by overlaying computer generated graphics. A reality augmentor may also,
                 * if appropriate, be elevated to the role of a [[REALITY_MANAGER]].
                 */
                Role[Role["REALITY_AUGMENTER"] = "RealityAugmenter"] = "REALITY_AUGMENTER";
                /**
                 * A system with this role is responsible for (at minimum) describing (and providing,
                 * if necessary) a visual representation of the world and the 3D eye pose of the viewer.
                 */
                Role[Role["REALITY_VIEWER"] = "RealityViewer"] = "REALITY_VIEWER";
                /**
                 * A system with this role is responsible for mediating access to sensors/trackers
                 * and pose data for known entities in the world, selecting/configuring/loading
                 * [[REALITY_VIEWER]]s, and providing the mechanism by which any given [[REALITY_AUGMENTER]]
                 * can augment any given [[REALITY_VIEWER]].
                 */
                Role[Role["REALITY_MANAGER"] = "RealityManager"] = "REALITY_MANAGER";
                /**
                 * Deprecated. Use [[REALITY_AUGMENTER]].
                 * @private
                 */
                Role[Role["APPLICATION"] = "Application"] = "APPLICATION";
                /**
                 * Deprecated. Use [[REALITY_MANAGER]].
                 * @private
                 */
                Role[Role["MANAGER"] = "Manager"] = "MANAGER";
                /**
                 * Deprecated. Use [[REALITY_VIEWER]]
                 * @private
                 */
                Role[Role["REALITY_VIEW"] = "RealityView"] = "REALITY_VIEW";
            })(Role || _export('Role', Role = {}));
            (function (Role) {
                function isRealityViewer(r) {
                    return r === Role.REALITY_VIEWER || r === Role.REALITY_VIEW;
                }
                Role.isRealityViewer = isRealityViewer;
                function isRealityAugmenter(r) {
                    return r === Role.REALITY_AUGMENTER || r === Role.APPLICATION;
                }
                Role.isRealityAugmenter = isRealityAugmenter;
                function isRealityManager(r) {
                    return r === Role.REALITY_MANAGER || r === Role.MANAGER;
                }
                Role.isRealityManager = isRealityManager;
            })(Role || _export('Role', Role = {}));
            /**
             * Configuration options for an [[ArgonSystem]]
             */

            _export('Configuration', Configuration = function Configuration() {
                _classCallCheck(this, Configuration);
            });

            _export('Viewport', Viewport = function () {
                function Viewport() {
                    _classCallCheck(this, Viewport);
                }

                _createClass(Viewport, null, [{
                    key: 'clone',
                    value: function clone(viewport) {
                        var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                        result.x = viewport.x;
                        result.y = viewport.y;
                        result.width = viewport.width;
                        result.height = viewport.height;
                        return result;
                    }
                }, {
                    key: 'equals',
                    value: function equals(viewportA, viewportB) {
                        return viewportA && viewportB && CesiumMath.equalsEpsilon(viewportA.x, viewportB.x, CesiumMath.EPSILON7) && CesiumMath.equalsEpsilon(viewportA.y, viewportB.y, CesiumMath.EPSILON7) && CesiumMath.equalsEpsilon(viewportA.width, viewportB.width, CesiumMath.EPSILON7) && CesiumMath.equalsEpsilon(viewportA.height, viewportB.height, CesiumMath.EPSILON7);
                    }
                }]);

                return Viewport;
            }());

            _export('NormalizedViewport', NormalizedViewport = function () {
                function NormalizedViewport() {
                    _classCallCheck(this, NormalizedViewport);
                }

                _createClass(NormalizedViewport, null, [{
                    key: 'clone',
                    value: function clone(viewport) {
                        var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                        result.x = viewport.x;
                        result.y = viewport.y;
                        result.width = viewport.width;
                        result.height = viewport.height;
                        return result;
                    }
                }, {
                    key: 'equals',
                    value: function equals(viewportA, viewportB) {
                        return viewportA && viewportB && CesiumMath.equalsEpsilon(viewportA.x, viewportB.x, CesiumMath.EPSILON7) && CesiumMath.equalsEpsilon(viewportA.y, viewportB.y, CesiumMath.EPSILON7) && CesiumMath.equalsEpsilon(viewportA.width, viewportB.width, CesiumMath.EPSILON7) && CesiumMath.equalsEpsilon(viewportA.height, viewportB.height, CesiumMath.EPSILON7);
                    }
                }]);

                return NormalizedViewport;
            }());

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
            })(SubviewType || _export('SubviewType', SubviewType = {}));

            (function (SerializedEntityState) {
                function clone(state, result) {
                    if (!state) return undefined;
                    result = result || {};
                    result.p = Cartesian3.clone(state.p, result.p);
                    result.o = Quaternion.clone(state.o, result.o);
                    result.r = state.r;
                    result.meta = state.meta;
                    return result;
                }
                SerializedEntityState.clone = clone;
            })(SerializedEntityState || _export('SerializedEntityState', SerializedEntityState = {}));

            (function (SerializedSubview) {
                function clone(subview, result) {
                    result = result || {};
                    result.type = subview.type;
                    result.projectionMatrix = Matrix4.clone(subview.projectionMatrix, result.projectionMatrix);
                    result.viewport = NormalizedViewport.clone(subview.viewport, result.viewport);
                    result.pose = subview.pose ? SerializedEntityState.clone(subview.pose, result.pose) : undefined;
                    return result;
                }
                SerializedSubview.clone = clone;
            })(SerializedSubview || _export('SerializedSubview', SerializedSubview = {}));
            // export interface PhysicalViewState {
            //     time: JulianDate,
            //     stagePose: SerializedEntityPose|undefined,
            //     stageHorizontalAccuracy: number|undefined,
            //     stageVerticalAccuracy: number|undefined,
            //     eyePose: SerializedEntityPose|undefined,
            //     eyeCompassAccuracy: number|undefined,
            //     subviews: SerializedSubviewList,
            //     strict:boolean;
            // }
            // export interface ViewState {
            //     /**
            //      * The viewing pose.
            //      */
            //     pose: SerializedEntityState|undefined,
            //     /**
            //      * The viewport to render into. In a DOM environment, 
            //      * the bottom left corner of the document element (document.documentElement) 
            //      * is the origin. 
            //      */
            //     viewport: Viewport,
            //     /**
            //      * The list of subviews to render.
            //      */
            //     subviews:SerializedSubviewList,
            //     /**
            //      * The current field of view (of each subview)
            //      */
            //     fovs: number[]
            // }

            _export('SerializedSubviewList', SerializedSubviewList = function (_Array) {
                _inherits(SerializedSubviewList, _Array);

                function SerializedSubviewList() {
                    _classCallCheck(this, SerializedSubviewList);

                    return _possibleConstructorReturn(this, (SerializedSubviewList.__proto__ || Object.getPrototypeOf(SerializedSubviewList)).call(this));
                }

                _createClass(SerializedSubviewList, null, [{
                    key: 'clone',
                    value: function clone(subviews, result) {
                        result = result || new SerializedSubviewList();
                        result.length = subviews.length;
                        for (var i = 0; i < subviews.length; i++) {
                            var s = subviews[i];
                            result[i] = SerializedSubview.clone(s, result[i]);
                        }
                        return result;
                    }
                }]);

                return SerializedSubviewList;
            }(Array));

            _export('Event', Event = function () {
                function Event() {
                    _classCallCheck(this, Event);

                    this._event = new CesiumEvent();
                }
                /**
                 * Get the number of listeners currently subscribed to the event.
                 * @return Number of listeners currently subscribed to the event.
                 */

                _createClass(Event, [{
                    key: 'addEventListener',

                    /**
                      * Add an event listener.
                      * @param The function to be executed when the event is raised.
                      * @return A convenience function which removes this event listener when called
                      */
                    value: function addEventListener(listener) {
                        return this._event.addEventListener(listener);
                    }
                    /**
                     * Remove an event listener.
                     * @param The function to be unregistered.
                     * @return True if the listener was removed;
                     * false if the listener and scope are not registered with the event.
                     */

                }, {
                    key: 'removeEventListener',
                    value: function removeEventListener(listener) {
                        return this._event.removeEventListener(listener);
                    }
                    /**
                     * Raises the event by calling each registered listener with all supplied arguments.
                     * @param This method takes any number of parameters and passes them through to the listener functions.
                     */

                }, {
                    key: 'raiseEvent',
                    value: function raiseEvent(data) {
                        this._event.raiseEvent(data);
                    }
                }, {
                    key: 'numberOfListeners',
                    get: function get() {
                        return this._event.numberOfListeners;
                    }
                }]);

                return Event;
            }());

            _export('CommandQueue', CommandQueue = function () {
                /**
                 * If errorEvent has 1 listener, outputs the error message to the web console.
                 */
                function CommandQueue() {
                    var _this = this;

                    _classCallCheck(this, CommandQueue);

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

                _createClass(CommandQueue, [{
                    key: "push",
                    value: function push(command, execute) {
                        var _this2 = this;

                        var result = new Promise(function (resolve, reject) {
                            _this2._queue.push({
                                command: command,
                                reject: reject,
                                execute: function execute() {
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
                    }
                    /**
                     * Execute the command queue
                     */

                }, {
                    key: "execute",
                    value: function execute() {
                        var _this3 = this;

                        this._paused = false;
                        Promise.resolve().then(function () {
                            if (_this3._queue.length > 0 && !_this3._currentCommandPending) {
                                _this3._executeNextCommand();
                            }
                        });
                    }
                    /**
                     * Puase the command queue (currently executing commands will still complete)
                     */

                }, {
                    key: "pause",
                    value: function pause() {
                        this._paused = true;
                    }
                    /**
                     * Clear commandQueue.
                     */

                }, {
                    key: "clear",
                    value: function clear() {
                        this._queue.forEach(function (item) {
                            item.reject("Unable to execute.");
                        });
                        this._queue = [];
                    }
                }, {
                    key: "_executeNextCommand",
                    value: function _executeNextCommand() {
                        var _this4 = this;

                        this._currentCommand = undefined;
                        this._currentCommandPending = undefined;
                        if (this._paused) return;
                        var item = this._queue.shift();
                        if (!item) return;
                        this._currentCommand = item.command;
                        this._currentCommandPending = item.execute().then(this._executeNextCommand.bind(this)).catch(function (e) {
                            _this4.errorEvent.raiseEvent(e);
                            _this4._executeNextCommand();
                        });
                    }
                }]);

                return CommandQueue;
            }());

            _export('MessageChannelLike', MessageChannelLike =
            /**
             * Create a MessageChannelLike instance.
             */
            function MessageChannelLike() {
                _classCallCheck(this, MessageChannelLike);

                var messageChannel = this;
                var _portsOpen = true;
                var _port1ready = void 0;
                var _port2ready = void 0;
                var _port1onmessage = void 0;
                _port1ready = new Promise(function (resolve) {
                    messageChannel.port1 = {
                        set onmessage(func) {
                            _port1onmessage = func;
                            resolve();
                        },
                        get onmessage() {
                            return _port1onmessage;
                        },
                        postMessage: function postMessage(data) {
                            if (_portsOpen) {
                                _port2ready.then(function () {
                                    if (messageChannel.port2.onmessage) messageChannel.port2.onmessage({ data: data });
                                });
                            }
                        },
                        close: function close() {
                            _portsOpen = false;
                        }
                    };
                });
                var _port2onmessage = void 0;
                _port2ready = new Promise(function (resolve) {
                    messageChannel.port2 = {
                        set onmessage(func) {
                            _port2onmessage = func;
                            resolve();
                        },
                        get onmessage() {
                            return _port2onmessage;
                        },
                        postMessage: function postMessage(data) {
                            if (_portsOpen) {
                                _port1ready.then(function () {
                                    if (messageChannel.port1.onmessage) messageChannel.port1.onmessage({ data: data });
                                });
                            }
                        },
                        close: function close() {
                            _portsOpen = false;
                        }
                    };
                });
            });

            _export('SynchronousMessageChannel', SynchronousMessageChannel =
            /**
             * Create a MessageChannelLike instance.
             */
            function SynchronousMessageChannel() {
                _classCallCheck(this, SynchronousMessageChannel);

                var messageChannel = this;
                var pendingMessages1 = [];
                var onmessage1 = function onmessage1(message) {
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
                    postMessage: function postMessage(data) {
                        if (messageChannel.port2.onmessage) messageChannel.port2.onmessage({ data: data });
                    },
                    close: function close() {
                        messageChannel.port1.onmessage = undefined;
                        messageChannel.port2.onmessage = undefined;
                    }
                };
                var pendingMessages2 = [];
                var onmessage2 = function onmessage2(message) {
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
                    postMessage: function postMessage(data) {
                        if (messageChannel.port1.onmessage) messageChannel.port1.onmessage({ data: data });
                    },
                    close: function close() {
                        messageChannel.port1.onmessage = undefined;
                        messageChannel.port2.onmessage = undefined;
                    }
                };
            });

            _export('MessageChannelFactory', MessageChannelFactory = function () {
                function MessageChannelFactory() {
                    _classCallCheck(this, MessageChannelFactory);
                }

                _createClass(MessageChannelFactory, [{
                    key: 'create',

                    /**
                     * Create a MessageChannel (or MessageChannelLike) instance.
                     */
                    value: function create() {
                        if (typeof MessageChannel !== 'undefined') return new MessageChannel();else return new MessageChannelLike();
                    }
                    /**
                     * Create a SynchronousMessageChannel instance.
                     */

                }, {
                    key: 'createSynchronous',
                    value: function createSynchronous() {
                        return new SynchronousMessageChannel();
                    }
                }]);

                return MessageChannelFactory;
            }());

            eventSynthesizerFunction = void 0;

            _export('synthesizeEvent', synthesizeEvent = typeof document !== 'undefined' && document.createElement ? getEventSynthesizier() : undefined);

            cloneTouch = function cloneTouch(touch, boundingRect) {
                return {
                    identifier: touch.identifier,
                    clientX: touch.clientX - boundingRect.left,
                    clientY: touch.clientY - boundingRect.top,
                    screenX: touch.screenX,
                    screenY: touch.screenY
                };
            };

            cloneTouches = function cloneTouches(touches, boundingRect) {
                if (!touches) return undefined;
                var touchList = [];
                for (var i = 0; i < touches.length; i++) {
                    var touch = touches.item(i);
                    touchList[i] = cloneTouch(touch, boundingRect);
                }
                return touchList;
            };

            _export('getEntityPosition', getEntityPosition = getEntityPositionInReferenceFrame);

            _export('getEntityOrientation', getEntityOrientation = getEntityOrientationInReferenceFrame);

            _scratchFramesArray = [];
            urlParser = typeof document !== 'undefined' ? document.createElement("a") : undefined;
            scratchPerspectiveOffCenterFrustum = new PerspectiveOffCenterFrustum();
            scratchCartesian = new Cartesian3();
            scratchOrientation = new Quaternion();

            _export('isIOS', isIOS = typeof navigator !== 'undefined' && typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream']);

            lastTime = 0;

            _export('requestAnimationFrame', requestAnimationFrame$1 = typeof window !== 'undefined' && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (callback) {
                var currTime = performance.now();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            });

            _export('version', version = "1.1.1");

            __decorate$1 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata$1 = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            emptyObject = Object.freeze({});

            _export('SessionPort', SessionPort = function () {
                function SessionPort(uri) {
                    var _this = this;

                    _classCallCheck(this, SessionPort);

                    this.uri = uri;
                    this._connectEvent = new Event();
                    /**
                     * An event which fires when this port has closed
                     */
                    this.closeEvent = new Event();
                    /**
                     * An error which fires when an error occurs.
                     */
                    this.errorEvent = new Event();
                    /**
                     * A map from topic to message handler.
                     */
                    this.on = {};
                    /**
                     * The version of argon.js which is used by the connecting session.
                     * This property is an empty array until the session connects.
                     */
                    this.version = [];
                    this._isOpened = false;
                    this._isConnected = false;
                    this._isClosed = false;
                    this.on[SessionPort.OPEN] = function (info) {
                        if (!info) throw new Error("Session did not provide a configuration (" + _this.uri + ")");
                        if (_this._isConnected) throw new Error("Session has already connected! (" + _this.uri + ")");
                        _this.info = info;
                        _this.version = _this.info.version || [0];
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
                /**
                 * An event which fires when a connection has been
                 * established to the other [[SessionPort]].
                 */

                _createClass(SessionPort, [{
                    key: "supportsProtocol",

                    /**
                     * Check if a protocol is supported by this session.
                     */
                    value: function supportsProtocol(name$$1, versions) {
                        if (!this._isConnected) throw new Error('Session has not yet connected');
                        var protocols = this.info.protocols;
                        if (!protocols) return false;
                        var supported = false;
                        var foundVersions = new Set();
                        protocols.forEach(function (p) {
                            if (p.indexOf(name$$1) !== -1) {
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
                    }
                    /**
                     * Establish a connection to another [[SessionPort]] via the provided [[MessagePort]] instance.
                     * @param messagePort the message port to post and receive messages.
                     * @param options the configuration which describes this [[ArgonSystem]].
                     */

                }, {
                    key: "open",
                    value: function open(messagePort, options) {
                        var _this2 = this;

                        if (this._isClosed) return;
                        if (this._isOpened) throw new Error('Session can only be opened once');
                        if (!options) throw new Error('Session options must be provided');
                        this.messagePort = messagePort;
                        this._isOpened = true;
                        this.messagePort.onmessage = function (evt) {
                            if (_this2._isClosed) return;
                            var data = typeof evt.data === 'string' ? JSON.parse(evt.data) : evt.data;
                            var id = data[0];
                            var topic = data[1];
                            var message = data[2] || emptyObject;
                            var expectsResponse = data[3];
                            var handler = _this2.on[topic];
                            if (handler && !expectsResponse) {
                                try {
                                    var response = handler(message, evt);
                                    if (response) console.warn("Handler for " + topic + " returned an unexpected response");
                                } catch (e) {
                                    _this2.sendError(e);
                                    _this2.errorEvent.raiseEvent(e);
                                }
                            } else if (handler) {
                                var _response = new Promise(function (resolve) {
                                    return resolve(handler(message, evt));
                                });
                                Promise.resolve(_response).then(function (response) {
                                    if (_this2._isClosed) return;
                                    _this2.send(topic + ':resolve:' + id, response);
                                }).catch(function (error) {
                                    if (_this2._isClosed) return;
                                    var errorMessage = void 0;
                                    if (typeof error === 'string') errorMessage = error;else if (typeof error.message === 'string') errorMessage = error.message;
                                    _this2.send(topic + ':reject:' + id, { reason: errorMessage });
                                });
                            } else {
                                var errorMessage = 'Unable to handle message for topic ' + topic + ' (' + _this2.uri + ')';
                                if (expectsResponse) {
                                    _this2.send(topic + ':reject:' + id, { reason: errorMessage });
                                }
                                _this2.errorEvent.raiseEvent(new Error(errorMessage));
                            }
                        };
                        this.send(SessionPort.OPEN, options);
                    }
                    /**
                     * Send a message
                     * @param topic the message topic.
                     * @param message the message to be sent.
                     * @return Return true if the message is posted successfully,
                     * return false if the session is closed.
                     */

                }, {
                    key: "send",
                    value: function send(topic, message) {
                        if (!this._isOpened) throw new Error('Session must be open to send messages');
                        if (this._isClosed) return false;
                        var id = createGuid();
                        var packet = [id, topic, message];
                        this.messagePort.postMessage(isIOS ? packet : JSON.stringify(packet)); // http://blog.runspired.com/2016/03/15/webworker-performance-benchmarks/
                        return true;
                    }
                    /**
                     * Send an error message.
                     * @param errorMessage An error message.
                     * @return Return true if the error message is sent successfully,
                     * otherwise, return false.
                     */

                }, {
                    key: "sendError",
                    value: function sendError(e) {
                        var errorMessage = e;
                        if (errorMessage instanceof Error) {
                            errorMessage = {
                                message: errorMessage.message,
                                stack: errorMessage['stack']
                            };
                        }
                        return this.send(SessionPort.ERROR, errorMessage);
                    }
                    /**
                     * Send a request and return a promise for the result.
                     * @param topic the message topic.
                     * @param message the message to be sent.
                     * @return if the session is not opened or is closed, return a rejected promise,
                     * Otherwise, the returned promise is resolved or rejected based on the response.
                     */

                }, {
                    key: "request",
                    value: function request(topic, message) {
                        var _this3 = this;

                        if (!this._isOpened || this._isClosed) throw new Error('Session must be open to make requests');
                        var id = createGuid();
                        var resolveTopic = topic + ':resolve:' + id;
                        var rejectTopic = topic + ':reject:' + id;
                        var result = new Promise(function (resolve, reject) {
                            _this3.on[resolveTopic] = function (message) {
                                delete _this3.on[resolveTopic];
                                delete _this3.on[rejectTopic];
                                resolve(message);
                            };
                            _this3.on[rejectTopic] = function (message) {
                                delete _this3.on[resolveTopic];
                                delete _this3.on[rejectTopic];
                                console.warn("Request '" + topic + "' rejected with reason:\n" + message.reason);
                                reject(new Error(message.reason));
                            };
                        });
                        var packet = [id, topic, message, true];
                        this.messagePort.postMessage(isIOS ? packet : JSON.stringify(packet)); // http://blog.runspired.com/2016/03/15/webworker-performance-benchmarks/
                        return result;
                    }
                    /**
                     * Close the connection to the remote session.
                     */

                }, {
                    key: "close",
                    value: function close() {
                        if (this._isClosed) return;
                        if (this._isOpened) {
                            this.send(SessionPort.CLOSE);
                        }
                        this._isClosed = true;
                        this._isConnected = false;
                        if (this.messagePort && this.messagePort.close) this.messagePort.close();
                        this.closeEvent.raiseEvent(undefined);
                    }
                }, {
                    key: "connectEvent",
                    get: function get() {
                        if (this._isConnected) throw new Error('The connectEvent only fires once and the session is already connected.');
                        return this._connectEvent;
                    }
                }, {
                    key: "isConnected",
                    get: function get() {
                        return this._isConnected;
                    }
                }, {
                    key: "isClosed",
                    get: function get() {
                        return this._isClosed;
                    }
                }]);

                return SessionPort;
            }());

            SessionPort.OPEN = 'ar.session.open';
            SessionPort.CLOSE = 'ar.session.close';
            SessionPort.ERROR = 'ar.session.error';
            /**
             * A factory for creating [[SessionPort]] instances.
             */

            _export('SessionPortFactory', SessionPortFactory = function () {
                function SessionPortFactory() {
                    _classCallCheck(this, SessionPortFactory);
                }

                _createClass(SessionPortFactory, [{
                    key: "create",
                    value: function create(uri) {
                        return new SessionPort(uri);
                    }
                }]);

                return SessionPortFactory;
            }());

            _export('ConnectService', ConnectService = function ConnectService() {
                _classCallCheck(this, ConnectService);
            });

            _export('SessionService', SessionService = function () {
                function SessionService(
                /**
                 * The configuration of this [[ArgonSystem]]
                 */
                configuration, connectService, sessionPortFactory, messageChannelFactory) {
                    var _this4 = this;

                    _classCallCheck(this, SessionService);

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
                    this.errorEvent = new Event();
                    this._connectEvent = new Event();
                    this._managedSessions = [];
                    configuration.version = extractVersion(version);
                    configuration.uri = typeof window !== 'undefined' && window.location ? window.location.href : undefined;
                    configuration.title = typeof document !== 'undefined' ? document.title : undefined;
                    this.errorEvent.addEventListener(function (error) {
                        if (_this4.errorEvent.numberOfListeners === 1) console.error(error);
                    });
                    this.manager.errorEvent.addEventListener(function (error) {
                        _this4.errorEvent.raiseEvent(error);
                    });
                    this.manager.closeEvent.addEventListener(function () {
                        _this4.managedSessions.forEach(function (s) {
                            s.close();
                        });
                    });
                    Object.freeze(this);
                }
                /**
                 * An event that is raised when a managed session is opened.
                 */

                _createClass(SessionService, [{
                    key: "connect",

                    /**
                     * Establishes a connection with the [[REALITY_MANAGER]].
                     * Called internally by the composition root ([[ArgonSystem]]).
                     */
                    value: function connect() {
                        if (this.connectService && this.connectService.connect) {
                            this.connectService.connect(this);
                        } else {
                            console.warn('Argon: Unable to connect to a manager session; a connect service is not available');
                        }
                    }
                    /**
                     * Manager-only. Creates a [[SessionPort]] that is managed by the current [[ArgonSystem]].
                     * Session ports that are managed will automatically forward open events to
                     * [[SessionService#sessionConnectEvent]] and error events to [[SessionService#errorEvent]].
                     * Other services that are part of the current [[ArgonSystem]] are likely to
                     * add message handlers to a newly connected [[SessionPort]].
                     * @return a new [[SessionPort]] instance
                     */

                }, {
                    key: "addManagedSessionPort",
                    value: function addManagedSessionPort(uri) {
                        var _this5 = this;

                        this.ensureIsRealityManager();
                        var session = this.sessionPortFactory.create(uri);
                        session.errorEvent.addEventListener(function (error) {
                            _this5.errorEvent.raiseEvent(error);
                        });
                        session.connectEvent.addEventListener(function () {
                            _this5.managedSessions.push(session);
                            _this5.connectEvent.raiseEvent(session);
                        });
                        session.closeEvent.addEventListener(function () {
                            var index = _this5.managedSessions.indexOf(session);
                            if (index > -1) _this5.managedSessions.splice(index, 1);
                        });
                        return session;
                    }
                    /**
                     * Creates a [[SessionPort]] that is not managed by the current [[ArgonSystem]].
                     * Unmanaged session ports will not forward open events or error events
                     * to this [[ArgonSystem]].
                     * @return a new SessionPort instance
                     */

                }, {
                    key: "createSessionPort",
                    value: function createSessionPort(uri) {
                        return this.sessionPortFactory.create(uri);
                    }
                    /**
                     * Creates a message channel which asyncrhonously sends and receives messages.
                     */

                }, {
                    key: "createMessageChannel",
                    value: function createMessageChannel() {
                        return this.messageChannelFactory.create();
                    }
                    /**
                     * Creates a message channel which syncrhonously sends and receives messages.
                     */

                }, {
                    key: "createSynchronousMessageChannel",
                    value: function createSynchronousMessageChannel() {
                        return this.messageChannelFactory.createSynchronous();
                    }
                    /**
                     * Returns true if this system represents a [[REALITY_MANAGER]]
                     */

                }, {
                    key: "ensureIsRealityManager",

                    /**
                     * Throws an error if this system is not a [[REALITY_MANAGER]]
                     */
                    value: function ensureIsRealityManager() {
                        if (!this.isRealityManager) throw new Error('An reality-manager only API was accessed from a non reality-manager.');
                    }
                    /**
                     * Throws an error if this session is not a [[REALITY_VIEWER]]
                     */

                }, {
                    key: "ensureIsRealityViewer",
                    value: function ensureIsRealityViewer() {
                        if (!this.isRealityViewer) throw new Error('An reality-viewer only API was accessed from a non reality-viewer.');
                    }
                    /**
                     * Throws an error if this session is a [[REALITY_VIEWER]]
                     */

                }, {
                    key: "ensureNotRealityViewer",
                    value: function ensureNotRealityViewer() {
                        if (this.isRealityViewer) throw new Error('An non-permitted API was accessed from a reality-viewer.');
                    }
                    /**
                     * Throws an error if this session is a [[REALITY_AUGMENTER]]
                     */

                }, {
                    key: "ensureNotRealityAugmenter",
                    value: function ensureNotRealityAugmenter() {
                        if (this.isRealityAugmenter) throw new Error('An non-permitted API was accessed from a reality-viewer.');
                    }
                    /**
                     * Throws an error if the connection to the manager is closed
                     */

                }, {
                    key: "ensureConnected",
                    value: function ensureConnected() {
                        if (!this.manager.isConnected) throw new Error('Session is not connected to manager');
                    }
                }, {
                    key: "connectEvent",
                    get: function get() {
                        return this._connectEvent;
                    }
                }, {
                    key: "managedSessions",

                    /**
                     * Manager-only. A collection of ports for each managed session.
                     */
                    get: function get() {
                        return this._managedSessions;
                    }
                }, {
                    key: "isRealityManager",
                    get: function get() {
                        return Role.isRealityManager(this.configuration && this.configuration.role);
                    }
                    /**
                     * Returns true if this system represents a [[REALITY_AUGMENTER]], meaning,
                     * it is running within a [[REALITY_MANAGER]]
                     */

                }, {
                    key: "isRealityAugmenter",
                    get: function get() {
                        return Role.isRealityAugmenter(this.configuration && this.configuration.role);
                    }
                    /**
                     * Returns true if this system is a [[REALITY_VIEWER]]
                     */

                }, {
                    key: "isRealityViewer",
                    get: function get() {
                        return Role.isRealityViewer(this.configuration && this.configuration.role);
                    }
                    /**
                     * @private
                     */

                }, {
                    key: "isManager",
                    get: function get() {
                        return this.isRealityManager;
                    }
                    /**
                     * @private
                     */

                }, {
                    key: "isApplication",
                    get: function get() {
                        return this.isRealityAugmenter;
                    }
                    /**
                     * @private
                     */

                }, {
                    key: "isRealityView",
                    get: function get() {
                        return this.isRealityViewer;
                    }
                }]);

                return SessionService;
            }());

            __decorate$1([deprecated$1('isRealityManager'), __metadata$1("design:type", Object), __metadata$1("design:paramtypes", [])], SessionService.prototype, "isManager", null);
            __decorate$1([deprecated$1('isRealityAugmenter'), __metadata$1("design:type", Object), __metadata$1("design:paramtypes", [])], SessionService.prototype, "isApplication", null);
            __decorate$1([deprecated$1('isRealityViewer'), __metadata$1("design:type", Object), __metadata$1("design:paramtypes", [])], SessionService.prototype, "isRealityView", null);
            _export('SessionService', SessionService = __decorate$1([inject('config', ConnectService, SessionPortFactory, MessageChannelFactory), __metadata$1("design:paramtypes", [typeof (_a$1 = typeof Configuration !== "undefined" && Configuration) === "function" && _a$1 || Object, ConnectService, SessionPortFactory, typeof (_b$1 = typeof MessageChannelFactory !== "undefined" && MessageChannelFactory) === "function" && _b$1 || Object])], SessionService));
            /**
             * Connect the current [[ArgonSystem]] to itself as the [[REALITY_MANAGER]].
             */

            _export('LoopbackConnectService', LoopbackConnectService = function (_ConnectService) {
                _inherits(LoopbackConnectService, _ConnectService);

                function LoopbackConnectService() {
                    _classCallCheck(this, LoopbackConnectService);

                    return _possibleConstructorReturn(this, (LoopbackConnectService.__proto__ || Object.getPrototypeOf(LoopbackConnectService)).apply(this, arguments));
                }

                _createClass(LoopbackConnectService, [{
                    key: "connect",

                    /**
                     * Create a loopback connection.
                     */
                    value: function connect(sessionService) {
                        var messageChannel = sessionService.createSynchronousMessageChannel();
                        var messagePort = messageChannel.port1;
                        messageChannel.port2.onmessage = function (evt) {
                            messageChannel.port2.postMessage(evt.data);
                        };
                        sessionService.manager.connectEvent.addEventListener(function () {
                            sessionService.connectEvent.raiseEvent(sessionService.manager);
                        });
                        sessionService.manager.open(messagePort, sessionService.configuration);
                    }
                }]);

                return LoopbackConnectService;
            }(ConnectService));

            _export('DOMConnectService', DOMConnectService = function (_ConnectService2) {
                _inherits(DOMConnectService, _ConnectService2);

                function DOMConnectService() {
                    _classCallCheck(this, DOMConnectService);

                    return _possibleConstructorReturn(this, (DOMConnectService.__proto__ || Object.getPrototypeOf(DOMConnectService)).apply(this, arguments));
                }

                _createClass(DOMConnectService, [{
                    key: "connect",

                    /**
                     * Connect to the manager.
                     */
                    value: function connect(sessionService) {
                        var messageChannel = sessionService.createMessageChannel();
                        window.parent.postMessage({ type: 'ARGON_SESSION', name: window.name }, '*', [messageChannel.port1]);
                        sessionService.manager.open(messageChannel.port2, sessionService.configuration);
                    }
                }], [{
                    key: "isAvailable",

                    /**
                      * Check whether this connect method is available or not.
                      */
                    value: function isAvailable() {
                        return typeof window !== 'undefined' && typeof window.parent !== 'undefined';
                    }
                }]);

                return DOMConnectService;
            }(ConnectService));

            _export('DebugConnectService', DebugConnectService = function (_ConnectService3) {
                _inherits(DebugConnectService, _ConnectService3);

                function DebugConnectService() {
                    _classCallCheck(this, DebugConnectService);

                    return _possibleConstructorReturn(this, (DebugConnectService.__proto__ || Object.getPrototypeOf(DebugConnectService)).apply(this, arguments));
                }

                _createClass(DebugConnectService, [{
                    key: "connect",

                    /**
                     * Connect to the manager.
                     */
                    value: function connect(_ref) {
                        var manager = _ref.manager,
                            configuration = _ref.configuration;

                        manager.open(window['__ARGON_DEBUG_PORT__'], configuration);
                    }
                }], [{
                    key: "isAvailable",

                    /**
                     * Check whether this connect method is available or not.
                     */
                    value: function isAvailable() {
                        return typeof window !== 'undefined' && !!window['__ARGON_DEBUG_PORT__'];
                    }
                }]);

                return DebugConnectService;
            }(ConnectService));

            _export('WKWebViewConnectService', WKWebViewConnectService = function (_ConnectService4) {
                _inherits(WKWebViewConnectService, _ConnectService4);

                function WKWebViewConnectService() {
                    _classCallCheck(this, WKWebViewConnectService);

                    return _possibleConstructorReturn(this, (WKWebViewConnectService.__proto__ || Object.getPrototypeOf(WKWebViewConnectService)).apply(this, arguments));
                }

                _createClass(WKWebViewConnectService, [{
                    key: "connect",

                    /**
                     * Connect to the manager.
                     */
                    value: function connect(sessionService) {
                        var messageChannel = sessionService.createSynchronousMessageChannel();
                        messageChannel.port2.onmessage = function (event) {
                            webkit.messageHandlers.argon.postMessage(JSON.stringify(event.data));
                        };
                        window['__ARGON_PORT__'] = messageChannel.port2;
                        sessionService.manager.open(messageChannel.port1, sessionService.configuration);
                        window.addEventListener("beforeunload", function () {
                            sessionService.manager.close();
                        });
                    }
                }], [{
                    key: "isAvailable",

                    /**
                     * Check whether this connect method is available or not.
                     */
                    value: function isAvailable() {
                        return typeof window !== 'undefined' && window['webkit'] && window['webkit'].messageHandlers;
                    }
                }]);

                return WKWebViewConnectService;
            }(ConnectService));

            _defineProperty = function (obj, key, value) {
                if (key in obj) {
                    Object.defineProperty(obj, key, {
                        value: value,
                        enumerable: true,
                        configurable: true,
                        writable: true
                    });
                } else {
                    obj[key] = value;
                }

                return obj;
            };

            __decorate$5 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata$5 = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            (function (PoseStatus) {
                PoseStatus[PoseStatus["KNOWN"] = 1] = "KNOWN";
                PoseStatus[PoseStatus["FOUND"] = 2] = "FOUND";
                PoseStatus[PoseStatus["LOST"] = 4] = "LOST";
            })(PoseStatus || _export('PoseStatus', PoseStatus = {}));
            scratchCartesian$2 = new Cartesian3(0, 0);
            scratchCartesian2 = new Cartesian3(0, 0);
            scratchQuaternion$1 = new Quaternion(0, 0);
            scratchOriginCartesian = new Cartesian3(0, 0);
            scratchFrustum$1 = new PerspectiveFrustum();
            scratchMatrix3$1 = new Matrix3();
            scratchMatrix4$1 = new Matrix4();

            _export('ContextService', ContextService = function () {
                function ContextService(sessionService) {
                    var _this = this;

                    _classCallCheck(this, ContextService);

                    this.sessionService = sessionService;
                    /**
                     * An event that is raised when the next frame state is available.
                     */
                    this.frameStateEvent = new Event();
                    /**
                     * An event that is raised after managed entities have been updated for
                     * the current frame.
                     */
                    this.updateEvent = new Event();
                    /**
                     * An event that is raised when it is an approriate time to render graphics.
                     * This event fires after the update event.
                     */
                    this.renderEvent = new Event();
                    /**
                     * An event that is raised after the render event
                     */
                    this.postRenderEvent = new Event();
                    /**
                     * An event that fires when the local origin changes.
                     */
                    this.localOriginChangeEvent = new Event();
                    /**
                     * A monotonically increasing value (in milliseconds) for the current frame state.
                     * This value is useful only for doing accurate *timing*, not for determining
                     * the absolute time. Use [[ContextService.time]] for absolute time.
                     * This value is -1 until the first [[ContextService.updateEvent]].
                     */
                    this.timestamp = -1;
                    /**
                     * The time in milliseconds since the previous timestamp,
                     * capped to [[ContextService.maxDeltaTime]]
                     */
                    this.deltaTime = 0;
                    /**
                     * This value caps the deltaTime for each frame. By default,
                     * the value is 1/3s (333.3ms)
                     */
                    this.maxDeltaTime = 1 / 3 * 1000;
                    /**
                     * The current (absolute) time according to the current reality.
                     * This value is arbitrary until the first [[ContextService.updateEvent]].
                     */
                    this.time = new JulianDate(0, 0);
                    /**
                     * The collection of all entities this application is aware of.
                     */
                    this.entities = new EntityCollection();
                    /**
                     * An entity positioned near the user, aligned with the local East-North-Up
                     * coordinate system.
                     */
                    this.localOriginEastNorthUp = this.entities.add(new Entity({
                        id: 'ar.localENU',
                        name: 'localOriginENU',
                        position: new ConstantPositionProperty(undefined, ReferenceFrame.FIXED),
                        orientation: new ConstantProperty(Quaternion.IDENTITY)
                    }));
                    /**
                     * An entity positioned near the user, aligned with the East-Up-South
                     * coordinate system. This useful for converting to the Y-Up convention
                     * used in some libraries, such as three.js.
                     */
                    this.localOriginEastUpSouth = this.entities.add(new Entity({
                        id: 'ar.localEUS',
                        name: 'localOriginEUS',
                        position: new ConstantPositionProperty(Cartesian3.ZERO, this.localOriginEastNorthUp),
                        orientation: new ConstantProperty(Quaternion.fromAxisAngle(Cartesian3.UNIT_X, Math.PI / 2))
                    }));
                    /**
                     * The default origin to use when calling `getEntityPose`.
                     * By default, this is the `localOriginEastNorthUp` reference frame.
                     */
                    this.defaultReferenceFrame = this.localOriginEastNorthUp;
                    this._entityPoseMap = new Map();
                    this._updatingEntities = new Set();
                    this._knownEntities = new Set();
                    this._scratchFrameState = {
                        time: {},
                        entities: {},
                        viewport: {},
                        subviews: []
                    };
                    this._frameIndex = -1;
                    this.sessionService.manager.on['ar.context.update'] = function (state) {
                        // backwards-compat
                        if (typeof state.reality !== 'string') {
                            state.reality = state.reality && state.reality['uri'];
                        }
                        if (!state.viewport && state['view'] && state['view'].viewport) {
                            state.viewport = state['view'].viewport;
                        }
                        if (!state.subviews && state['view'] && state['view'].subviews) {
                            state.subviews = state['view'].subviews;
                            scratchFrustum$1.near = 0.01;
                            scratchFrustum$1.far = 10000000;
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = state.subviews[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var s = _step.value;

                                    var frustum = s['frustum'];
                                    scratchFrustum$1.xOffset = frustum.xOffset;
                                    scratchFrustum$1.yOffset = frustum.yOffset;
                                    scratchFrustum$1.fov = frustum.fov;
                                    scratchFrustum$1.aspectRatio = frustum.aspectRatio;
                                    s.projectionMatrix = Matrix4.clone(scratchFrustum$1.projectionMatrix, s.projectionMatrix);
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                        _iterator.return();
                                    }
                                } finally {
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                        }
                        if (!state.entities[EYE_ENTITY_ID] && state['view'] && state['view'].pose) {
                            state.entities[EYE_ENTITY_ID] = state['view'].pose;
                        }
                        // end backwards-compat
                        _this._update(state);
                    };
                    this.sessionService.manager.on['ar.context.entityStateMap'] = function (entityStateMap) {
                        for (var id in entityStateMap) {
                            _this.updateEntityFromSerializedPose(id, entityStateMap[id]);
                        }
                    };
                    scratchFrustum$1.fov = Math.PI / 3;
                    scratchFrustum$1.aspectRatio = 1;
                    this._serializedFrameState = {
                        reality: undefined,
                        time: JulianDate.now(),
                        entities: {},
                        viewport: { x: 0, y: 0, width: 0, height: 0 },
                        subviews: [{
                            type: SubviewType.SINGULAR,
                            viewport: { x: 0, y: 0, width: 1, height: 1 },
                            projectionMatrix: scratchFrustum$1.projectionMatrix
                        }]
                    };
                    this._update(this._serializedFrameState);
                }
                /**
                 * An alias for the 'eye' entity. To be deprecated in favor of `ViewService.eye`.
                 */

                _createClass(ContextService, [{
                    key: "getTime",

                    /**
                     * Deprecated. To be removed.
                     * @private
                     */
                    value: function getTime() {
                        return this.time;
                    }
                    /**
                     * Deprecated. To be removed. Use the defaultReferenceFrame property.
                     * @private
                     */

                }, {
                    key: "setDefaultReferenceFrame",
                    value: function setDefaultReferenceFrame(origin) {
                        this.defaultReferenceFrame = origin;
                    }
                    /**
                     * Deprecated. To be removed.  Use the defaultReferenceFrame property.
                     * @private
                     */

                }, {
                    key: "getDefaultReferenceFrame",
                    value: function getDefaultReferenceFrame() {
                        return this.defaultReferenceFrame;
                    }
                    /**
                     * Subscribe to pose updates for an entity specified by the given id
                     *
                     * @deprecated Use [[ContextService#subscribe]]
                     * @param id - the id of the desired entity
                     * @returns A new or existing entity instance matching the given id
                     */

                }, {
                    key: "subscribeToEntityById",
                    value: function subscribeToEntityById(id) {
                        this.sessionService.manager.send('ar.context.subscribe', { id: id });
                        return this.entities.getOrCreateEntity(id);
                    }
                    /**
                     * Subscribe to pose updates for the given entity id
                     *
                     * @param id - the id of the desired entity
                     * @returns A Promise that resolves to a new or existing entity
                     * instance matching the given id, if the subscription is successful
                     */

                }, {
                    key: "subscribe",
                    value: function subscribe(id) {
                        var _this2 = this;

                        id = id.id || id;
                        return this.sessionService.manager.request('ar.context.subscribe', { id: id }).then(function () {
                            return _this2.entities.getOrCreateEntity(id);
                        });
                    }
                    /**
                     * Unsubscribe to pose updates for the given entity id
                     */

                }, {
                    key: "unsubscribe",
                    value: function unsubscribe(id) {
                        id = id.id || id;
                        this.sessionService.manager.send('ar.context.unsubscribe', { id: id });
                    }
                    /**
                     * Gets the current pose of an entity, relative to a given reference frame.
                     *
                     * @param entity - The entity whose state is to be queried.
                     * @param referenceFrame - The intended reference frame. Defaults to `this.defaultReferenceFrame`.
                     * @returns If the position and orientation exist for the given entity, an
                     * object with the fields `position` and `orientation`, both of type
                     * `Cartesian3`. Otherwise undefined.
                     */

                }, {
                    key: "getEntityPose",
                    value: function getEntityPose(entityOrId) {
                        var referenceFrameOrId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultReferenceFrame;

                        var time = this.time;
                        var entity = entityOrId;
                        if (typeof entity === 'string') entity = this.entities.getById(entityOrId);
                        if (!entity) throw new Error('Unknown entity ' + entityOrId);
                        var referenceFrame = referenceFrameOrId;
                        if (typeof referenceFrame === 'string') referenceFrame = this.entities.getById(referenceFrameOrId);
                        if (!defined(referenceFrame)) throw new Error('Unknown entity ' + referenceFrameOrId);
                        var key = entity.id + '@' + _stringFromReferenceFrame(referenceFrame);
                        var entityPose = this._entityPoseMap.get(key);
                        if (!entityPose) {
                            entityPose = {
                                position: new Cartesian3(),
                                orientation: new Quaternion(),
                                referenceFrame: referenceFrame,
                                poseStatus: 0
                            };
                            this._entityPoseMap.set(key, entityPose);
                        }
                        var position = getEntityPositionInReferenceFrame(entity, time, referenceFrame, entityPose.position);
                        var orientation = getEntityOrientationInReferenceFrame(entity, time, referenceFrame, entityPose.orientation);
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
                    }
                }, {
                    key: "createFrameState",
                    value: function createFrameState(time, viewport, subviewList, eye, horizontalAccuracy, verticalAccuracy, headingAccuracy) {
                        var eyeMeta = eye['meta'] = eye['meta'] || {};
                        eyeMeta.horizontalAccuracy = horizontalAccuracy || eyeMeta.horizontalAccuracy;
                        eyeMeta.verticalAccuracy = verticalAccuracy || eyeMeta.verticalAccuracy;
                        eyeMeta.headingAccuracy = headingAccuracy || eyeMeta.headingAccuracy;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = subviewList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var s = _step2.value;

                                if (!isFinite(s.projectionMatrix[0])) throw new Error('Invalid projection matrix (contains non-finite values)');
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }

                        var frameState = this._scratchFrameState;
                        frameState.time = JulianDate.clone(time, frameState.time);
                        frameState.viewport = Viewport.clone(viewport, frameState.viewport);
                        frameState.subviews = SerializedSubviewList.clone(subviewList, frameState.subviews);
                        frameState.entities[EYE_ENTITY_ID] = getSerializedEntityState(eye, time);
                        return frameState;
                    }
                    /**
                     * Process the next frame state (which should come from the current reality viewer)
                     */

                }, {
                    key: "submitFrameState",
                    value: function submitFrameState(frameState) {
                        frameState.index = ++this._frameIndex;
                        this._update(frameState);
                    }
                    // TODO: This function is called a lot. Potential for optimization. 

                }, {
                    key: "_update",
                    value: function _update(frameState) {
                        // update the entities the manager knows about
                        this._knownEntities.clear();
                        if (frameState.entities) {
                            for (var id in frameState.entities) {
                                this.updateEntityFromSerializedPose(id, frameState.entities[id]);
                                this._updatingEntities.add(id);
                                this._knownEntities.add(id);
                            }
                        }
                        // if the mangager didn't send us an update for a particular entity,
                        // assume the manager no longer knows about it
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = this._updatingEntities[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var _id = _step3.value;

                                if (!this._knownEntities.has(_id)) {
                                    var entity = this.entities.getById(_id);
                                    if (entity) {
                                        entity.position = undefined;
                                        entity.orientation = undefined;
                                    }
                                    this._updatingEntities.delete(_id);
                                }
                            }
                            // update our time values
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }

                        var timestamp = performance.now();
                        this.deltaTime = Math.min(timestamp - this.timestamp, this.maxDeltaTime);
                        this.timestamp = timestamp;
                        JulianDate.clone(frameState.time, this.time);
                        // update our stage & local origin. 
                        // TODO: move both of these into the location service, handle in frameStateEvent?
                        this._updateStage(frameState);
                        this._updateLocalOrigin(frameState);
                        // raise a frame state event (primarily for other services to hook into)
                        this._serializedFrameState = frameState;
                        this.frameStateEvent.raiseEvent(frameState);
                        // raise events for the user to update and render the scene
                        this.updateEvent.raiseEvent(this);
                        this.renderEvent.raiseEvent(this);
                        this.postRenderEvent.raiseEvent(this);
                    }
                }, {
                    key: "updateEntityFromSerializedPose",
                    value: function updateEntityFromSerializedPose(id, entityPose) {
                        var entity = this.entities.getOrCreateEntity(id);
                        if (!entityPose) {
                            entity.position = undefined;
                            entity.orientation = undefined;
                            return entity;
                        }
                        var positionValue = entityPose.p;
                        var orientationValue = entityPose.o;
                        var referenceFrame = typeof entityPose.r === 'number' ? entityPose.r : this.entities.getOrCreateEntity(entityPose.r);
                        var entityPosition = entity.position;
                        var entityOrientation = entity.orientation;
                        if (entityPosition instanceof ConstantPositionProperty && entityPosition.referenceFrame === referenceFrame) {
                            entityPosition.setValue(positionValue, referenceFrame);
                        } else {
                            entity.position = new ConstantPositionProperty(positionValue, referenceFrame);
                        }
                        if (entityOrientation instanceof ConstantProperty) {
                            entityOrientation.setValue(orientationValue);
                        } else {
                            entity.orientation = new ConstantProperty(orientationValue);
                        }
                        return entity;
                    }
                }, {
                    key: "_updateStage",
                    value: function _updateStage(state) {
                        // update the stage entity based on the eye entity (provided by the current reality viewer)
                        // and the relative position between the physical eye and the physical stage.
                        var eye = this.entities.getById(EYE_ENTITY_ID);
                        var stage = this.entities.getById(STAGE_ENTITY_ID);
                        var physicalEye = this.entities.getById(PHYSICAL_EYE_ENTITY_ID);
                        var physicalStage = this.entities.getById(PHYSICAL_STAGE_ENTITY_ID);
                        if (!eye || !stage) return;
                        stage.position && stage.position.setValue(undefined, undefined);
                        stage.orientation && stage.orientation.setValue(undefined);
                        var time = state.time;
                        if (physicalEye && physicalStage) {
                            var physicalEyeStageOffset = getEntityPositionInReferenceFrame(physicalEye, time, physicalStage, scratchCartesian$2);
                        }
                        if (!physicalEyeStageOffset) {
                            physicalEyeStageOffset = Cartesian3.fromElements(0, 0, AVERAGE_HUMAN_HEIGHT, scratchCartesian$2);
                        }
                        var eyePositionFixed = getEntityPositionInReferenceFrame(eye, time, ReferenceFrame.FIXED, scratchCartesian2);
                        if (eyePositionFixed) {
                            var enuToFixedFrameTransform = Transforms.eastNorthUpToFixedFrame(eyePositionFixed, undefined, scratchMatrix4$1);
                            var enuRotationMatrix = Matrix4.getRotation(enuToFixedFrameTransform, scratchMatrix3$1);
                            var enuOrientation = Quaternion.fromRotationMatrix(enuRotationMatrix);
                            var physicalEyeStageOffsetFixed = Matrix3.multiplyByVector(enuRotationMatrix, physicalEyeStageOffset, physicalEyeStageOffset);
                            var stagePositionFixed = Cartesian3.subtract(eyePositionFixed, physicalEyeStageOffsetFixed, physicalEyeStageOffsetFixed);
                            stage.position = stage.position || new ConstantPositionProperty();
                            stage.orientation = stage.orientation || new ConstantProperty();
                            stage.position.setValue(stagePositionFixed, ReferenceFrame.FIXED);
                            stage.orientation.setValue(enuOrientation);
                        } else {
                            var eyeFrame = eye && eye.position ? eye.position.referenceFrame : undefined;
                            if (eyeFrame) {
                                var eyePositionRelativeToEyeFrame = getEntityPositionInReferenceFrame(eye, time, eyeFrame, scratchCartesian2);
                                if (eyePositionRelativeToEyeFrame) {
                                    var stagePositionRelativeToEye = Cartesian3.subtract(eyePositionRelativeToEyeFrame, physicalEyeStageOffset, physicalEyeStageOffset);
                                    stage.position.setValue(stagePositionRelativeToEye, eyeFrame);
                                    stage.orientation.setValue(Quaternion.IDENTITY);
                                }
                            }
                        }
                    }
                }, {
                    key: "_updateLocalOrigin",
                    value: function _updateLocalOrigin(state) {
                        var eye = this.entities.getById(EYE_ENTITY_ID);
                        var stage = this.entities.getById(STAGE_ENTITY_ID);
                        var stageFrame = stage && stage.position ? stage.position.referenceFrame : undefined;
                        if (!eye || !stage) return;
                        if (!defined(stageFrame)) {
                            if (this.localOriginEastNorthUp.position.referenceFrame !== stage) {
                                this.localOriginEastNorthUp.position.setValue(Cartesian3.ZERO, stage);
                                this.localOriginEastNorthUp.orientation.setValue(Quaternion.IDENTITY);
                                this.localOriginChangeEvent.raiseEvent(undefined);
                            }
                            return;
                        }
                        var eyePosition = eye.position && eye.position.getValueInReferenceFrame(state.time, stageFrame, scratchCartesian$2);
                        if (!eyePosition) return;
                        var localOriginPosition = this.localOriginEastNorthUp.position.getValueInReferenceFrame(state.time, stageFrame, scratchOriginCartesian);
                        if (!localOriginPosition || Cartesian3.magnitude(Cartesian3.subtract(eyePosition, localOriginPosition, scratchOriginCartesian)) > 5000) {
                            var localOriginPositionProperty = this.localOriginEastNorthUp.position;
                            var localOriginOrientationProperty = this.localOriginEastNorthUp.orientation;
                            var stagePosition = stage.position && stage.position.getValueInReferenceFrame(state.time, stageFrame, scratchCartesian$2);
                            var stageOrientation = stage.orientation && stage.orientation.getValue(state.time, scratchQuaternion$1);
                            localOriginPositionProperty.setValue(stagePosition, stageFrame);
                            localOriginOrientationProperty.setValue(stageOrientation);
                            this.localOriginChangeEvent.raiseEvent(undefined);
                        }
                    }
                }, {
                    key: "user",
                    get: function get() {
                        return this.entities.getById(EYE_ENTITY_ID);
                    }
                    /**
                     * The serialized frame state for this frame
                     */

                }, {
                    key: "serializedFrameState",
                    get: function get() {
                        return this._serializedFrameState;
                    }
                    /**
                     * Deprecated. Use timestamp property.
                     * @private
                     */

                }, {
                    key: "systemTime",
                    get: function get() {
                        return this.timestamp;
                    }
                }]);

                return ContextService;
            }());

            __decorate$5([deprecated$1('timestamp'), __metadata$5("design:type", Object), __metadata$5("design:paramtypes", [])], ContextService.prototype, "systemTime", null);
            __decorate$5([deprecated$1('time'), __metadata$5("design:type", Function), __metadata$5("design:paramtypes", []), __metadata$5("design:returntype", typeof (_a$5 = typeof JulianDate !== "undefined" && JulianDate) === "function" && _a$5 || Object)], ContextService.prototype, "getTime", null);
            __decorate$5([deprecated$1('defaultReferenceFrame'), __metadata$5("design:type", Function), __metadata$5("design:paramtypes", [typeof (_b$5 = typeof Entity !== "undefined" && Entity) === "function" && _b$5 || Object]), __metadata$5("design:returntype", void 0)], ContextService.prototype, "setDefaultReferenceFrame", null);
            __decorate$5([deprecated$1('defaultReferenceFrame'), __metadata$5("design:type", Function), __metadata$5("design:paramtypes", []), __metadata$5("design:returntype", typeof (_c$4 = typeof Entity !== "undefined" && Entity) === "function" && _c$4 || Object)], ContextService.prototype, "getDefaultReferenceFrame", null);
            __decorate$5([deprecated$1('subscribe'), __metadata$5("design:type", Function), __metadata$5("design:paramtypes", [String]), __metadata$5("design:returntype", typeof (_d$4 = typeof Entity !== "undefined" && Entity) === "function" && _d$4 || Object)], ContextService.prototype, "subscribeToEntityById", null);
            _export('ContextService', ContextService = __decorate$5([autoinject(), __metadata$5("design:paramtypes", [typeof (_e$4 = typeof SessionService !== "undefined" && SessionService) === "function" && _e$4 || Object])], ContextService));
            _export('ContextServiceProvider', ContextServiceProvider = function () {
                function ContextServiceProvider(sessionService, contextService) {
                    var _this3 = this;

                    _classCallCheck(this, ContextServiceProvider);

                    this.sessionService = sessionService;
                    this.contextService = contextService;
                    this.entitySubscriptionsBySubscriber = new WeakMap();
                    this.subscribersByEntityId = new Map();
                    this.subscribersChangeEvent = new Event();
                    this.publishingReferenceFrameMap = new Map();
                    this._entityPoseCache = {};
                    this._sessionEntities = {};
                    sessionService.connectEvent.addEventListener(function (session) {
                        var subscriptions = new Set();
                        _this3.entitySubscriptionsBySubscriber.set(session, subscriptions);
                        session.on['ar.context.subscribe'] = function (_ref) {
                            var id = _ref.id;

                            var subscribers = _this3.subscribersByEntityId.get(id) || new Set();
                            _this3.subscribersByEntityId.set(id, subscribers);
                            subscribers.add(session);
                            subscriptions.add(id);
                            _this3.subscribersChangeEvent.raiseEvent({ id: id, subscribers: subscribers });
                            session.closeEvent.addEventListener(function () {
                                subscribers.delete(session);
                                _this3.subscribersChangeEvent.raiseEvent({ id: id, subscribers: subscribers });
                            });
                        };
                        session.on['ar.context.unsubscribe'] = function (_ref2) {
                            var id = _ref2.id;

                            var subscribers = _this3.subscribersByEntityId.get(id);
                            subscribers && subscribers.delete(session);
                            subscriptions.delete(id);
                            _this3.subscribersChangeEvent.raiseEvent({ id: id, subscribers: subscribers });
                        };
                        session.closeEvent.addEventListener(function () {
                            subscriptions.forEach(function (id) {
                                var subscribers = _this3.subscribersByEntityId.get(id);
                                subscribers && subscribers.delete(session);
                                _this3.subscribersChangeEvent.raiseEvent({ id: id, subscribers: subscribers });
                            });
                            _this3.entitySubscriptionsBySubscriber.delete(session);
                        });
                    });
                    this.contextService.updateEvent.addEventListener(function () {
                        _this3._publishUpdates();
                    });
                }

                _createClass(ContextServiceProvider, [{
                    key: "publishEntityState",
                    value: function publishEntityState(idOrEntity) {
                        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.contextService.time;

                        var id = void 0;
                        var entity = void 0;
                        if (idOrEntity.id) {
                            entity = idOrEntity;
                            id = entity.id;
                        } else {
                            id = idOrEntity;
                            entity = this.contextService.entities.getById(id);
                        }
                        var subscribers = this.subscribersByEntityId.get(id);
                        if (entity && subscribers) {
                            var referenceFrameId = this.publishingReferenceFrameMap.get(id);
                            var referenceFrame = defined(referenceFrameId) && typeof referenceFrameId === 'string' ? this.contextService.entities.getById(referenceFrameId) : referenceFrameId;
                            var entityStateMap = _defineProperty({}, id, getSerializedEntityState(entity, time, referenceFrame));
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = subscribers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var s = _step4.value;

                                    s.send('ar.context.entityStateMap', entityStateMap);
                                }
                            } catch (err) {
                                _didIteratorError4 = true;
                                _iteratorError4 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                        _iterator4.return();
                                    }
                                } finally {
                                    if (_didIteratorError4) {
                                        throw _iteratorError4;
                                    }
                                }
                            }
                        }
                    }
                }, {
                    key: "_publishUpdates",
                    value: function _publishUpdates() {
                        this._entityPoseCache = {};
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = this.sessionService.managedSessions[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var session = _step5.value;

                                if (Role.isRealityAugmenter(session.info.role)) this._sendUpdateForSession(session);
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                    _iterator5.return();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }
                    }
                }, {
                    key: "_sendUpdateForSession",
                    value: function _sendUpdateForSession(session) {
                        var state = this.contextService.serializedFrameState;
                        var sessionEntities = this._sessionEntities;
                        // clear session entities
                        for (var id in sessionEntities) {
                            delete sessionEntities[id];
                        }
                        // reference all entities from the primary frame state (if any)
                        if (state.entities) {
                            for (var id in state.entities) {
                                sessionEntities[id] = state.entities[id];
                            }
                        }
                        // get subscrbied entities for the session
                        var _iteratorNormalCompletion6 = true;
                        var _didIteratorError6 = false;
                        var _iteratorError6 = undefined;

                        try {
                            for (var _iterator6 = this.entitySubscriptionsBySubscriber.get(session)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                var _id2 = _step6.value;

                                var entity = this.contextService.entities.getById(_id2);
                                sessionEntities[_id2] = this._getSerializedEntityState(entity, state.time);
                            }
                            // recycle the parent frame state object, but with the session entities
                        } catch (err) {
                            _didIteratorError6 = true;
                            _iteratorError6 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                    _iterator6.return();
                                }
                            } finally {
                                if (_didIteratorError6) {
                                    throw _iteratorError6;
                                }
                            }
                        }

                        var parentEntities = state.entities;
                        state.entities = sessionEntities;
                        state.time = state.time;
                        state.sendTime = JulianDate.now(state.sendTime);
                        if (session.info.version) session.send('ar.context.update', state);
                        state.entities = parentEntities;
                    }
                }, {
                    key: "_getSerializedEntityState",
                    value: function _getSerializedEntityState(entity, time) {
                        if (!entity) return undefined;
                        var id = entity.id;
                        if (!defined(this._entityPoseCache[id])) {
                            var referenceFrameId = this.publishingReferenceFrameMap.get(id);
                            var referenceFrame = defined(referenceFrameId) && typeof referenceFrameId === 'string' ? this.contextService.entities.getById(referenceFrameId) : referenceFrameId;
                            this._entityPoseCache[id] = getSerializedEntityState(entity, time, referenceFrame);
                        }
                        return this._entityPoseCache[id];
                    }
                }]);

                return ContextServiceProvider;
            }());

            _export('ContextServiceProvider', ContextServiceProvider = __decorate$5([autoinject(), __metadata$5("design:paramtypes", [typeof (_f$3 = typeof SessionService !== "undefined" && SessionService) === "function" && _f$3 || Object, ContextService])], ContextServiceProvider));

            __decorate$6 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata$6 = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            _export('FocusService', FocusService = function () {
                function FocusService(sessionService) {
                    var _this = this;

                    _classCallCheck(this, FocusService);

                    /**
                     * An event that is raised when this app has gained focus
                     */
                    this.focusEvent = new Event();
                    /**
                     * An event that is raised when this app has lost focus
                     */
                    this.blurEvent = new Event();
                    this._hasFocus = false;
                    sessionService.manager.on['ar.focus.state'] = function (_ref) {
                        var state = _ref.state;

                        if (_this._hasFocus !== state) {
                            _this._hasFocus = state;
                            if (state) {
                                _this.focusEvent.raiseEvent(undefined);
                            } else {
                                _this.blurEvent.raiseEvent(undefined);
                            }
                        }
                    };
                }
                /**
                 * True if this app has focus
                 */

                _createClass(FocusService, [{
                    key: "hasFocus",
                    get: function get() {
                        return this._hasFocus;
                    }
                }]);

                return FocusService;
            }());

            _export('FocusService', FocusService = __decorate$6([inject(SessionService), __metadata$6("design:paramtypes", [typeof (_a$6 = typeof SessionService !== "undefined" && SessionService) === "function" && _a$6 || Object])], FocusService));
            /**
             * Manage focus state
             */

            _export('FocusServiceProvider', FocusServiceProvider = function () {
                function FocusServiceProvider(sessionService) {
                    var _this2 = this;

                    _classCallCheck(this, FocusServiceProvider);

                    this.sessionService = sessionService;
                    this.sessionFocusEvent = new Event();
                    sessionService.ensureIsRealityManager();
                    sessionService.manager.connectEvent.addEventListener(function () {
                        setTimeout(function () {
                            if (!_this2._session && _this2.sessionService.manager.isConnected) _this2.session = _this2.sessionService.manager;
                        });
                    });
                }

                _createClass(FocusServiceProvider, [{
                    key: "session",
                    get: function get() {
                        return this._session;
                    },
                    set: function set(session) {
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
                    }
                }]);

                return FocusServiceProvider;
            }());

            _export('FocusServiceProvider', FocusServiceProvider = __decorate$6([inject(SessionService, FocusService), __metadata$6("design:paramtypes", [typeof (_b$6 = typeof SessionService !== "undefined" && SessionService) === "function" && _b$6 || Object])], FocusServiceProvider));

            __decorate$7 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata$7 = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            _export('VisibilityService', VisibilityService = function () {
                function VisibilityService(sessionService) {
                    var _this = this;

                    _classCallCheck(this, VisibilityService);

                    /**
                     * An event that is raised when the app becomes visible
                     */
                    this.showEvent = new Event();
                    /**
                     * An event that is raised when the app becomes hidden
                     */
                    this.hideEvent = new Event();
                    this._isVisible = false;
                    sessionService.manager.on['ar.visibility.state'] = function (_ref) {
                        var state = _ref.state;

                        if (_this._isVisible !== state) {
                            _this._isVisible = state;
                            if (state) _this.showEvent.raiseEvent(undefined);else _this.hideEvent.raiseEvent(undefined);
                        }
                    };
                }
                /**
                 * True if this app has focus
                 */

                _createClass(VisibilityService, [{
                    key: "isVisible",
                    get: function get() {
                        return this._isVisible;
                    }
                }]);

                return VisibilityService;
            }());

            _export('VisibilityService', VisibilityService = __decorate$7([inject(SessionService), __metadata$7("design:paramtypes", [typeof (_a$7 = typeof SessionService !== "undefined" && SessionService) === "function" && _a$7 || Object])], VisibilityService));
            /**
             * Manage visibility state
             */

            _export('VisibilityServiceProvider', VisibilityServiceProvider = function () {
                function VisibilityServiceProvider(sessionService) {
                    var _this2 = this;

                    _classCallCheck(this, VisibilityServiceProvider);

                    this.visibleSessions = new Set();
                    this.sessionChangeEvent = new Event();
                    sessionService.ensureIsRealityManager();
                    this.sessionChangeEvent.addEventListener(function (session) {
                        session.send('ar.visibility.state', { state: _this2.visibleSessions.has(session) });
                    });
                    sessionService.manager.connectEvent.addEventListener(function () {
                        _this2.set(sessionService.manager, true);
                    });
                }

                _createClass(VisibilityServiceProvider, [{
                    key: "set",
                    value: function set(session, visibility) {
                        if (visibility) {
                            if (!this.visibleSessions.has(session)) {
                                this.visibleSessions.add(session);
                                this.sessionChangeEvent.raiseEvent(session);
                            }
                        } else {
                            if (this.visibleSessions.has(session)) {
                                this.visibleSessions.delete(session);
                                this.sessionChangeEvent.raiseEvent(session);
                            }
                        }
                    }
                }]);

                return VisibilityServiceProvider;
            }());

            _export('VisibilityServiceProvider', VisibilityServiceProvider = __decorate$7([inject(SessionService, VisibilityService), __metadata$7("design:paramtypes", [typeof (_b$7 = typeof SessionService !== "undefined" && SessionService) === "function" && _b$7 || Object])], VisibilityServiceProvider));

            __decorate$4 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata$4 = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            (function (PresentationMode) {
                PresentationMode[PresentationMode["PAGE"] = 0] = "PAGE";
                PresentationMode[PresentationMode["IMMERSIVE"] = 1] = "IMMERSIVE";
            })(PresentationMode || _export('PresentationMode', PresentationMode = {}));

            _export('ParentElement', ParentElement = '#argon');

            _export('ViewportService', ViewportService = function () {
                function ViewportService(sessionService, contextService, focusService, parentElementOrSelector) {
                    var _this = this;

                    _classCallCheck(this, ViewportService);

                    this.sessionService = sessionService;
                    this.contextService = contextService;
                    this.focusService = focusService;
                    /**
                     * UI events that occur within this view. To handle an event (and prevent it from
                     * being forwarded to another layer) call event.stopImmediatePropagation().
                     */
                    this.uiEvent = new Event();
                    /**
                     * An event that is raised when the viewport has changed
                     */
                    this.changeEvent = new Event();
                    /**
                     * An event that is raised when the presentation mode has changed
                     */
                    this.presentationModeChangeEvent = new Event();
                    this._presentationMode = PresentationMode.PAGE;
                    /**
                     * Automatically watch and publish the viewport during PresentationMode.EMBEDDED
                     */
                    this.autoPublishEmbeddedViewport = true;
                    if (typeof document !== 'undefined' && document.createElement) {
                        this.rootElement = document.createElement('div');
                        this.rootElement.classList.add('argon-view');
                        var viewportElement = this.element = document.createElement('div');
                        viewportElement.classList.add('argon-viewport');
                        this.rootElement.appendChild(viewportElement);
                        // prevent pinch-zoom of the page in ios 10.
                        if (isIOS) {
                            viewportElement.addEventListener('touchmove', function (event) {
                                if (event.touches.length > 1) event.preventDefault();
                            }, true);
                        }
                        var insertRootIntoParentElement = function insertRootIntoParentElement(parentElement) {
                            if (_this.sessionService.manager.isClosed) return;
                            parentElement.insertBefore(_this.rootElement, parentElement.firstChild);
                            _this.sessionService.manager.closeEvent.addEventListener(function () {
                                _this.rootElement.remove();
                            });
                        };
                        // first check for the specificied element synchronously, then
                        // if synchronous check fails, wait for document to load, then insert
                        if (parentElementOrSelector && parentElementOrSelector instanceof HTMLElement) {
                            insertRootIntoParentElement(parentElementOrSelector);
                        } else if (parentElementOrSelector === "#argon") {
                            // first check synchronously
                            var parentElement = document.querySelector("#argon");
                            if (parentElement) {
                                insertRootIntoParentElement(parentElement);
                            } else {
                                resolveArgonElement().then(insertRootIntoParentElement);
                            }
                        } else if (parentElementOrSelector) {
                            // first check synchronously
                            var _parentElement = document.querySelector("" + parentElementOrSelector);
                            if (_parentElement) {
                                insertRootIntoParentElement(_parentElement);
                            } else {
                                resolveElement(parentElementOrSelector).then(insertRootIntoParentElement);
                            }
                        }
                        this.focusService.focusEvent.addEventListener(function () {
                            document.documentElement.classList.remove('argon-no-focus');
                            document.documentElement.classList.remove('argon-blur');
                            document.documentElement.classList.add('argon-focus');
                        });
                        this.focusService.blurEvent.addEventListener(function () {
                            document.documentElement.classList.remove('argon-focus');
                            document.documentElement.classList.add('argon-blur');
                            document.documentElement.classList.add('argon-no-focus');
                        });
                        this.presentationModeChangeEvent.addEventListener(function (mode) {
                            switch (mode) {
                                case PresentationMode.PAGE:
                                    _this.rootElement.classList.remove('argon-maximize');
                                    document.documentElement.classList.remove('argon-immersive');
                                    break;
                                case PresentationMode.IMMERSIVE:
                                    _this.rootElement.classList.add('argon-maximize');
                                    document.documentElement.classList.add('argon-immersive');
                                    break;
                            }
                        });
                        this.sessionService.manager.on['ar.viewport.uievent'] = synthesizeEvent;
                        if (!this.sessionService.isRealityViewer) {
                            createEventForwarder(this, function (event) {
                                if (_this.sessionService.manager.isConnected && _this.sessionService.manager.version[0] >= 1) _this.sessionService.manager.send('ar.viewport.forwardUIEvent', event);
                            });
                            this._watchEmbeddedViewport();
                        }
                    }
                    sessionService.manager.on['ar.viewport.presentationMode'] = function (_ref) {
                        var mode = _ref.mode;

                        _this._updatePresentationMode(mode);
                    };
                    this.contextService.frameStateEvent.addEventListener(function (state) {
                        _this._updateViewport(state.viewport);
                    });
                    // older version of argon-app manager only property supported immersive mode. 
                    sessionService.manager.connectEvent.addEventListener(function () {
                        if (sessionService.manager.version[0] === 0) {
                            _this._updatePresentationMode(PresentationMode.IMMERSIVE);
                        }
                    });
                }
                /**
                 * The current presentation mode
                 */

                _createClass(ViewportService, [{
                    key: "requestPresentationMode",

                    /**
                     * Request a presentation mode
                     * - [[PresentationMode.PAGE]] : present the entire document
                     * - [[PresentationMode.IMMERSIVE]] : present only the argon.js view
                     */
                    value: function requestPresentationMode(mode) {
                        return this.sessionService.manager.request('ar.viewport.requestPresentationMode', { mode: mode });
                    }
                }, {
                    key: "_updatePresentationMode",
                    value: function _updatePresentationMode(mode) {
                        var currentMode = this.presentationMode;
                        if (currentMode !== mode) {
                            this._presentationMode = mode;
                            this.presentationModeChangeEvent.raiseEvent(mode);
                            this.changeEvent.raiseEvent(undefined);
                        }
                    }
                    /**
                     * Publish the viewport being used in [[PresentationMode.EMBEDDED]]
                     * so that other apps can use the same viewport
                     */

                }, {
                    key: "publishEmbeddedViewport",
                    value: function publishEmbeddedViewport(viewport) {
                        if (this.sessionService.manager.isConnected && this.sessionService.manager.version[0] >= 1) this.sessionService.manager.send('ar.viewport.embeddedViewport', { viewport: viewport });
                    }
                    // Updates the element, if necessary, and raise a view change event

                }, {
                    key: "_updateViewport",
                    value: function _updateViewport(viewport) {
                        var _this2 = this;

                        var viewportJSON = JSON.stringify(viewport);
                        // const previousViewport = this._currentViewport;
                        this._currentViewport = Viewport.clone(viewport, this._currentViewport);
                        if (!this._currentViewportJSON || this._currentViewportJSON !== viewportJSON) {
                            this._currentViewportJSON = viewportJSON;
                            if (this.element && !this.sessionService.isRealityManager) {
                                requestAnimationFrame(function () {
                                    _this2.element.style.position = 'fixed';
                                    _this2.element.style.left = viewport.x + 'px';
                                    _this2.element.style.bottom = viewport.y + 'px';
                                    _this2.element.style.width = viewport.width + 'px';
                                    _this2.element.style.height = viewport.height + 'px';
                                });
                            }
                            this.changeEvent.raiseEvent(undefined);
                        }
                    }
                }, {
                    key: "sendUIEventToSession",
                    value: function sendUIEventToSession(uievent, session) {
                        if (session && session.isConnected) session.send('ar.viewport.uievent', uievent);
                    }
                }, {
                    key: "_watchEmbeddedViewport",
                    value: function _watchEmbeddedViewport() {
                        var _this3 = this;

                        var publish = function publish() {
                            if (_this3.element && _this3.autoPublishEmbeddedViewport) {
                                var parentElement = _this3.rootElement.parentElement;
                                var rect = parentElement && parentElement.getBoundingClientRect();
                                rect && _this3.publishEmbeddedViewport({
                                    x: rect.left,
                                    y: window.innerHeight - rect.bottom,
                                    width: rect.width,
                                    height: rect.height
                                });
                            }
                        };
                        setInterval(function () {
                            if (!_this3.focusService.hasFocus) publish();
                        }, 500);
                        this.contextService.frameStateEvent.addEventListener(function () {
                            if (_this3.focusService.hasFocus) publish();
                        });
                    }
                }, {
                    key: "presentationMode",
                    get: function get() {
                        return this._presentationMode;
                    }
                    /**
                     * Get the current viewport
                     */

                }, {
                    key: "current",
                    get: function get() {
                        return this.contextService.serializedFrameState.viewport;
                    }
                }]);

                return ViewportService;
            }());

            _export('ViewportService', ViewportService = __decorate$4([inject(SessionService, ContextService, FocusService, Optional.of(ParentElement)), __metadata$4("design:paramtypes", [typeof (_a$4 = typeof SessionService !== "undefined" && SessionService) === "function" && _a$4 || Object, typeof (_b$4 = typeof ContextService !== "undefined" && ContextService) === "function" && _b$4 || Object, typeof (_c$3 = typeof FocusService !== "undefined" && FocusService) === "function" && _c$3 || Object, Object])], ViewportService));

            _export('ViewportServiceProvider', ViewportServiceProvider = function () {
                function ViewportServiceProvider(sessionService, viewportService, focusServiceProvider, visibilityServiceProvider) {
                    var _this4 = this;

                    _classCallCheck(this, ViewportServiceProvider);

                    this.sessionService = sessionService;
                    this.viewportService = viewportService;
                    this.focusServiceProvider = focusServiceProvider;
                    /**
                     * The embedded viewports for each managed session.
                     */
                    this.embeddedViewports = new WeakMap();
                    /**
                     * A UI event being forwarded from a managed session
                     */
                    this.forwardedUIEvent = new Event();
                    sessionService.ensureIsRealityManager();
                    sessionService.connectEvent.addEventListener(function (session) {
                        // forward ui events to the visible reality viewer
                        session.on['ar.viewport.forwardUIEvent'] = function (uievent) {
                            _this4.forwardedUIEvent.raiseEvent(uievent);
                        };
                        session.on['ar.viewport.requestPresentationMode'] = function (_ref2) {
                            var mode = _ref2.mode;

                            return _this4._handleRequestPresentationMode(session, mode);
                        };
                        session.on['ar.viewport.embeddedViewport'] = function (viewport) {
                            _this4.embeddedViewports.set(session, viewport);
                        };
                    });
                }

                _createClass(ViewportServiceProvider, [{
                    key: "sendUIEventToSession",
                    value: function sendUIEventToSession(uievent, session) {
                        session.send('ar.viewport.uievent', uievent);
                    }
                }, {
                    key: "_handleRequestPresentationMode",
                    value: function _handleRequestPresentationMode(session, mode) {
                        this._ensurePersmission(session);
                        if (this.viewportService.presentationMode !== mode) {
                            this.sessionService.manager.send('ar.viewport.presentationMode', { mode: mode });
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = this.sessionService.managedSessions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    session = _step.value;

                                    session.send('ar.viewport.presentationMode', { mode: mode });
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                        _iterator.return();
                                    }
                                } finally {
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                        }
                    }
                }, {
                    key: "_ensurePersmission",
                    value: function _ensurePersmission(session) {
                        if (session !== this.sessionService.manager && session !== this.focusServiceProvider.session) throw new Error('Application must have focus');
                    }
                }]);

                return ViewportServiceProvider;
            }());

            _export('ViewportServiceProvider', ViewportServiceProvider = __decorate$4([autoinject(), __metadata$4("design:paramtypes", [typeof (_d$3 = typeof SessionService !== "undefined" && SessionService) === "function" && _d$3 || Object, ViewportService, typeof (_e$3 = typeof FocusServiceProvider !== "undefined" && FocusServiceProvider) === "function" && _e$3 || Object, typeof (_f$2 = typeof VisibilityServiceProvider !== "undefined" && VisibilityServiceProvider) === "function" && _f$2 || Object])], ViewportServiceProvider));
            // setup our DOM environment
            if (typeof document !== 'undefined' && document.createElement) {

                (function () {
                    var viewportMetaTag = document.querySelector('meta[name=viewport]');
                    if (!viewportMetaTag) viewportMetaTag = document.createElement('meta');
                    viewportMetaTag.name = 'viewport';
                    viewportMetaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
                    document.head.appendChild(viewportMetaTag);
                    var argonMetaTag = document.querySelector('meta[name=argon]');
                    if (!argonMetaTag) argonMetaTag = document.createElement('meta');
                    argonMetaTag.name = 'argon';
                    document.head.appendChild(argonMetaTag);
                    var argonElementPromise = void 0;

                    resolveArgonElement = function resolveArgonElement() {
                        if (argonElementPromise) return argonElementPromise;
                        return argonElementPromise = resolveElement('#argon').catch(function () {
                            var argonElement = document.createElement('div');
                            argonElement.id = 'argon';
                            document.body.appendChild(argonElement);
                            return argonElement;
                        });
                    };

                    var style = document.createElement("style");
                    style.type = 'text/css';
                    document.head.insertBefore(style, document.head.firstChild);
                    var sheet = style.sheet;
                    sheet.insertRule("\n        #argon {\n            position: fixed;\n            width: 100%;\n            height: 100%;\n            left: 0;\n            bottom: 0;\n            margin: 0;\n            border: 0;\n            padding: 0;\n        }\n    ", sheet.cssRules.length);
                    sheet.insertRule("\n        .argon-view, .argon-view ~ * {\n            width: 100%;\n            height: 100%;\n        }\n    ", sheet.cssRules.length);
                    sheet.insertRule("\n        .argon-view > * {\n            position: absolute;\n            overflow: hidden;\n            width: 100%;\n            height: 100%;\n            pointer-events: none;\n            -webkit-tap-highlight-color: transparent;\n            -webkit-user-select: none;\n            user-select: none;\n        }\n    ", sheet.cssRules.length);
                    sheet.insertRule("\n        .argon-view > * > * {\n            pointer-events: auto;\n            -webkit-tap-highlight-color: initial;\n            -webkit-user-select: initial;\n            user-select: initial;\n        }\n    ", sheet.cssRules.length);
                    sheet.insertRule("\n        .argon-viewport {\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            pointer-events: auto;\n        }\n    ", sheet.cssRules.length);
                    sheet.insertRule("\n        .argon-viewport > * {\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            pointer-events: none;\n        }\n    ", sheet.cssRules.length);
                    sheet.insertRule("\n        .argon-viewport > * > * {\n            pointer-events: auto;\n        }\n    ", sheet.cssRules.length);
                    sheet.insertRule("\n        .argon-maximize, .argon-maximize ~ * {\n            pointer-events: none;\n            position: fixed !important;\n            width: 100% !important;\n            height: 100% !important;\n            left: 0;\n            bottom: 0;\n            margin: 0;\n            border: 0;\n            padding: 0;\n        }\n    ", sheet.cssRules.length);
                    sheet.insertRule("\n        .argon-interactive {\n            pointer-events: auto;\n        }\n    ", sheet.cssRules.length);
                })();
            }

            __decorate$8 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata$8 = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            scratchCartesian3 = new Cartesian3();
            scratchQuaternion$2 = new Quaternion();

            _export('LocationService', LocationService = function () {
                function LocationService(sessionService, contextService) {
                    var _this = this;

                    _classCallCheck(this, LocationService);

                    this.sessionService = sessionService;
                    this.contextService = contextService;
                    /**
                     * An entity representing the floor plane, defining an
                     * East-North-Up coordinate system.
                     * This entity must be subscribed to in order to receive pose updates
                     * relative to the FIXED frame.
                     */
                    this.stage = this.contextService.entities.add(new Entity({
                        id: STAGE_ENTITY_ID,
                        name: 'Stage',
                        position: new ConstantPositionProperty(Cartesian3.ZERO, this.physicalStage),
                        orientation: new ConstantProperty(Quaternion.IDENTITY)
                    }));
                    /**
                     * A reference frame representing the physical location of the user,
                     * defining an East-North-Up coordinate system.
                     */
                    this.physicalStage = this.contextService.entities.add(new Entity({
                        id: PHYSICAL_STAGE_ENTITY_ID,
                        name: 'Physical Stage'
                    }));
                    contextService.frameStateEvent.addEventListener(function () {
                        _this.stageCartographic = _this._updateCartographic(_this.stage, _this.stageCartographic);
                        _this.physicalStageCartographic = _this._updateCartographic(_this.physicalStage, _this.physicalStageCartographic);
                    });
                }

                _createClass(LocationService, [{
                    key: "subscribeGeopose",
                    value: function subscribeGeopose(options) {
                        if (options && options.physical) {
                            return Promise.all([this.contextService.subscribe(PHYSICAL_STAGE_ENTITY_ID), this.contextService.subscribe(STAGE_ENTITY_ID)]).then(function () {});
                        }
                        return this.contextService.subscribe(STAGE_ENTITY_ID).then(function () {});
                    }
                }, {
                    key: "unsubscribeGeopose",
                    value: function unsubscribeGeopose() {
                        this.contextService.unsubscribe(STAGE_ENTITY_ID);
                        this.contextService.unsubscribe(PHYSICAL_STAGE_ENTITY_ID);
                    }
                }, {
                    key: "setGeolocationOptions",
                    value: function setGeolocationOptions(options) {
                        this.sessionService.manager.send('ar.location.setGeolocationOptions', { options: options });
                    }
                }, {
                    key: "_updateCartographic",
                    value: function _updateCartographic(entity, cartographic) {
                        if (!entity) return undefined;
                        var fixedPosition = getEntityPositionInReferenceFrame(entity, this.contextService.time, ReferenceFrame.FIXED, scratchCartesian3);
                        if (fixedPosition) {
                            cartographic = cartographic || new Cartographic();
                            return Cartographic.fromCartesian(fixedPosition, undefined, cartographic);
                        }
                        return undefined;
                    }
                }, {
                    key: "stageHorizontalAccuracy",
                    get: function get() {
                        return this.stage['meta'] ? this.stage['meta'].horizontalAccuracy : undefined;
                    }
                }, {
                    key: "stageVerticalAccuracy",
                    get: function get() {
                        return this.stage['meta'] ? this.stage['meta'].verticalAccuracy : undefined;
                    }
                }, {
                    key: "physicalStageHorizontalAccuracy",
                    get: function get() {
                        return this.physicalStage['meta'] ? this.physicalStage['meta'].horizontalAccuracy : undefined;
                    }
                }, {
                    key: "physicalStageVerticalAccuracy",
                    get: function get() {
                        return this.physicalStage['meta'] ? this.physicalStage['meta'].verticalAccuracy : undefined;
                    }
                }]);

                return LocationService;
            }());

            _export('LocationService', LocationService = __decorate$8([autoinject(), __metadata$8("design:paramtypes", [typeof (_a$8 = typeof SessionService !== "undefined" && SessionService) === "function" && _a$8 || Object, typeof (_b$8 = typeof ContextService !== "undefined" && ContextService) === "function" && _b$8 || Object])], LocationService));

            _export('LocationServiceProvider', LocationServiceProvider = function () {
                function LocationServiceProvider(sessionService, contextServiceProvider, locationService) {
                    var _this2 = this;

                    _classCallCheck(this, LocationServiceProvider);

                    this.sessionService = sessionService;
                    this.contextServiceProvider = contextServiceProvider;
                    this.locationService = locationService;
                    this._sessionGeolocationOptions = new Map();
                    this.sessionService.connectEvent.addEventListener(function (session) {
                        session.on['ar.location.setGeolocationOptions'] = function (options) {
                            _this2._handleSetGeolocationOptions(session, options);
                        };
                    });
                    this.contextServiceProvider.subscribersChangeEvent.addEventListener(function (_ref) {
                        var id = _ref.id;

                        if (locationService.physicalStage.id !== id) return;
                        _this2._checkPhysicalStageSubscribers();
                    });
                    this.contextServiceProvider.publishingReferenceFrameMap.set(locationService.stage.id, ReferenceFrame.FIXED);
                    this.contextServiceProvider.publishingReferenceFrameMap.set(locationService.physicalStage.id, ReferenceFrame.FIXED);
                }

                _createClass(LocationServiceProvider, [{
                    key: "_checkPhysicalStageSubscribers",
                    value: function _checkPhysicalStageSubscribers() {
                        var physicalStageId = this.locationService.physicalStage.id;
                        var subscribers = this.contextServiceProvider.subscribersByEntityId.get(physicalStageId);
                        if (subscribers && subscribers.size > 0) {
                            if (JSON.stringify(this._targetGeolocationOptions) !== JSON.stringify(this._currentGeolocationOptions)) {
                                this._currentGeolocationOptions = this._targetGeolocationOptions;
                                this.onStopGeolocationUpdates();
                                this.onStartGeolocationUpdates(this._targetGeolocationOptions);
                            }
                        } else {
                            this.onStopGeolocationUpdates();
                            this._currentGeolocationOptions = undefined;
                        }
                    }
                }, {
                    key: "_handleSetGeolocationOptions",
                    value: function _handleSetGeolocationOptions(session, options) {
                        var _this3 = this;

                        this._sessionGeolocationOptions.set(session, options);
                        session.closeEvent.addEventListener(function () {
                            _this3._updateGeolocationOptions();
                        });
                        this._updateGeolocationOptions();
                    }
                }, {
                    key: "_updateGeolocationOptions",
                    value: function _updateGeolocationOptions() {
                        var reducedOptions = {};
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = this._sessionGeolocationOptions.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var o = _step.value;

                                reducedOptions.enableHighAccuracy = reducedOptions.enableHighAccuracy || o.enableHighAccuracy;
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        if (this._targetGeolocationOptions.enableHighAccuracy !== reducedOptions.enableHighAccuracy) {
                            this._targetGeolocationOptions = reducedOptions;
                            this._checkPhysicalStageSubscribers();
                        }
                    }
                }, {
                    key: "setGeolocation",
                    value: function setGeolocation(longitude, latitude, altitude, horizontalAccuracy, verticalAccuracy) {
                        var physicalStage = this.locationService.physicalStage;
                        if (defined(longitude) && defined(latitude)) {
                            // TODO: fallback on https://cesiumjs.org/Cesium/Build/Documentation/sampleTerrain.html for height
                            var height = defined(altitude) ? altitude - AVERAGE_HUMAN_HEIGHT : 0;
                            var fixedPosition = Cartesian3.fromDegrees(longitude, latitude, height, undefined, scratchCartesian3);
                            var enuOrientation = Transforms.headingPitchRollQuaternion(fixedPosition, 0, 0, 0, undefined, scratchQuaternion$2);
                            physicalStage.position = physicalStage.position || new ConstantPositionProperty();
                            physicalStage.orientation = physicalStage.orientation || new ConstantProperty();
                            physicalStage.position.setValue(fixedPosition, ReferenceFrame.FIXED);
                            physicalStage.orientation.setValue(enuOrientation);
                            physicalStage['meta'] = {
                                horizontalAccuracy: horizontalAccuracy,
                                verticalAccuracy: verticalAccuracy
                            };
                        } else {
                            physicalStage.position = undefined;
                            physicalStage.orientation = undefined;
                            physicalStage['meta'] = undefined;
                        }
                        this.contextServiceProvider.publishEntityState(physicalStage);
                    }
                    /**
                     * Overridable. Should call setGeolocation when new geolocation is available
                     */

                }, {
                    key: "onStartGeolocationUpdates",
                    value: function onStartGeolocationUpdates(options) {
                        var _this4 = this;

                        if (typeof navigator == 'undefined' || !navigator.geolocation) throw new Error('Unable to start geolocation updates');
                        return new Promise(function (resolve, reject) {
                            if (!defined(_this4._geolocationWatchId)) {
                                (function () {
                                    var didResolve = false;
                                    _this4._geolocationWatchId = navigator.geolocation.watchPosition(function (pos) {
                                        if (!didResolve) resolve(), didResolve = true;
                                        _this4.setGeolocation(pos.coords.longitude, pos.coords.latitude, pos.coords.altitude || 0, pos.coords.accuracy > 0 ? pos.coords.accuracy : undefined, pos.coords.altitudeAccuracy || undefined);
                                    }, reject, options);
                                })();
                            } else {
                                resolve();
                            }
                        });
                    }
                    /**
                     * Overridable.
                     */

                }, {
                    key: "onStopGeolocationUpdates",
                    value: function onStopGeolocationUpdates() {
                        if (typeof navigator !== 'undefined' && defined(this._geolocationWatchId)) {
                            navigator.geolocation.clearWatch(this._geolocationWatchId);
                            this._geolocationWatchId = undefined;
                        }
                    }
                }]);

                return LocationServiceProvider;
            }());

            _export('LocationServiceProvider', LocationServiceProvider = __decorate$8([autoinject(), __metadata$8("design:paramtypes", [typeof (_c$5 = typeof SessionService !== "undefined" && SessionService) === "function" && _c$5 || Object, typeof (_d$5 = typeof ContextServiceProvider !== "undefined" && ContextServiceProvider) === "function" && _d$5 || Object, LocationService])], LocationServiceProvider));

            __decorate$3 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata$3 = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            _export('Subview', Subview = function Subview() {
                _classCallCheck(this, Subview);
            });

            scratchCartesian$1 = new Cartesian3();
            scratchQuaternion = new Quaternion();
            scratchQuaternion2 = new Quaternion();
            scratchMatrix3 = new Matrix3();
            scratchMatrix4 = new Matrix4();
            scratchFrustum = new PerspectiveFrustum();
            IDENTITY_SUBVIEW_POSE = { p: Cartesian3.ZERO, o: Quaternion.IDENTITY, r: EYE_ENTITY_ID };
            currentVRDisplay = void 0;

            _export('ViewService', ViewService = function () {
                function ViewService(sessionService, contextService, viewportService, container) {
                    var _this = this;

                    _classCallCheck(this, ViewService);

                    this.sessionService = sessionService;
                    this.contextService = contextService;
                    this.viewportService = viewportService;
                    this._subviews = [];
                    this._frustums = [];
                    /**
                     * An entity representing the pose of the viewer.
                     */
                    this.eye = this.contextService.entities.add(new Entity({
                        id: EYE_ENTITY_ID,
                        name: 'Eye',
                        position: new ConstantPositionProperty(undefined, undefined),
                        orientation: new ConstantProperty(Quaternion.IDENTITY)
                    }));
                    /**
                     * An entity representing the physical pose of the viewer.
                     */
                    this.physicalEye = this.contextService.entities.add(new Entity({
                        id: PHYSICAL_EYE_ENTITY_ID,
                        name: 'Physical Eye',
                        position: new ConstantPositionProperty(undefined, undefined),
                        orientation: new ConstantProperty(Quaternion.IDENTITY)
                    }));
                    this.sessionService.manager.on['ar.view.suggestedViewState'] = function (viewState) {
                        _this.suggestedViewState = viewState;
                    };
                    this.contextService.frameStateEvent.addEventListener(function (state) {
                        _this._processFrameState(state);
                    });
                    this._processFrameState(this.contextService.serializedFrameState);
                    // backwards-compatability hack: if using an older manager version,
                    // we have to provide the suggestedViewState ourselves
                    this.sessionService.manager.connectEvent.addEventListener(function () {
                        if (_this.sessionService.manager.version[0] === 0) {
                            container.get(ViewServiceProvider);
                        }
                    });
                }

                _createClass(ViewService, [{
                    key: "_processFrameState",
                    value: function _processFrameState(state) {
                        // if the manager has not given us a physical eye pose, update from device orientation
                        if (!state.entities || !state.entities[this.physicalEye.id]) {
                            updatePhysicalEyePoseFromDeviceOrientation(this.contextService);
                        }
                        var serializedSubviewList = state.subviews;
                        var subviews = this._subviews;
                        subviews.length = serializedSubviewList.length;
                        var index = 0;
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = serializedSubviewList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var serializedSubview = _step.value;

                                var id = 'ar.view_' + index;
                                var subviewPose = serializedSubview.pose || IDENTITY_SUBVIEW_POSE;
                                this.contextService.updateEntityFromSerializedPose(id, subviewPose);
                                var subviewEntity = this.contextService.entities.getById(id);
                                var subview = subviews[index] = subviews[index] || {};
                                subview.index = index;
                                subview.type = serializedSubview.type;
                                subview.pose = this.contextService.getEntityPose(subviewEntity);
                                subview.viewport = subview.viewport || {};
                                subview.viewport.x = serializedSubview.viewport.x;
                                subview.viewport.y = serializedSubview.viewport.y;
                                subview.viewport.width = serializedSubview.viewport.width;
                                subview.viewport.height = serializedSubview.viewport.height;
                                subview.frustum = this._frustums[index] = this._frustums[index] || new PerspectiveFrustum();
                                decomposePerspectiveProjectionMatrix(serializedSubview.projectionMatrix, subview.frustum);
                                subview['projectionMatrix'] = subview.frustum.projectionMatrix;
                                index++;
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    }
                }, {
                    key: "getViewport",
                    value: function getViewport() {
                        return this.viewportService.current;
                    }
                }, {
                    key: "getSubviews",
                    value: function getSubviews() {
                        return this._subviews;
                    }
                }, {
                    key: "getSubviewEntity",
                    value: function getSubviewEntity(index) {
                        var subviewEntity = this.contextService.entities.getOrCreateEntity('ar.view_' + index);
                        if (!subviewEntity.position) {
                            subviewEntity.position = new ConstantPositionProperty();
                        }
                        if (!subviewEntity.orientation) {
                            subviewEntity.orientation = new ConstantProperty();
                        }
                        return subviewEntity;
                    }
                    /**
                     * Request an animation frame cal\\\\\\\\\\\\\]]]]]]]]]]]\\\\lback.
                     */

                }, {
                    key: "requestAnimationFrame",
                    value: function (_requestAnimationFrame) {
                        function requestAnimationFrame$$1(_x) {
                            return _requestAnimationFrame.apply(this, arguments);
                        }

                        requestAnimationFrame$$1.toString = function () {
                            return _requestAnimationFrame.toString();
                        };

                        return requestAnimationFrame$$1;
                    }(function (callback) {
                        var _this2 = this;

                        var onFrame = function onFrame() {
                            tick();
                            if (_this2.suggestedViewState) {
                                callback(clock.currentTime);
                            } else _this2.requestAnimationFrame(callback);
                        };
                        if (currentVRDisplay) {
                            return currentVRDisplay.requestAnimationFrame(onFrame);
                        } else {
                            return requestAnimationFrame(onFrame);
                        }
                    })
                }, {
                    key: "eyeHeadingAccuracy",
                    get: function get() {
                        return this.eye['meta'].headingAccuracy;
                    }
                }, {
                    key: "element",
                    get: function get() {
                        return this.viewportService.element;
                    }
                }, {
                    key: "subviews",
                    get: function get() {
                        return this._subviews;
                    }
                }]);

                return ViewService;
            }());

            __decorate$3([deprecated$1('app.viewport.current'), __metadata$3("design:type", Function), __metadata$3("design:paramtypes", []), __metadata$3("design:returntype", void 0)], ViewService.prototype, "getViewport", null);
            _export('ViewService', ViewService = __decorate$3([autoinject, __metadata$3("design:paramtypes", [typeof (_a$3 = typeof SessionService !== "undefined" && SessionService) === "function" && _a$3 || Object, typeof (_b$3 = typeof ContextService !== "undefined" && ContextService) === "function" && _b$3 || Object, typeof (_c$2 = typeof ViewportService !== "undefined" && ViewportService) === "function" && _c$2 || Object, typeof (_d$2 = typeof Container !== "undefined" && Container) === "function" && _d$2 || Object])], ViewService));

            _export('ViewServiceProvider', ViewServiceProvider = function () {
                function ViewServiceProvider(sessionService, contextService, contextServiceProvider, viewService, viewportService, locationService) {
                    var _this3 = this;

                    _classCallCheck(this, ViewServiceProvider);

                    this.sessionService = sessionService;
                    this.contextService = contextService;
                    this.contextServiceProvider = contextServiceProvider;
                    this.viewService = viewService;
                    this.viewportService = viewportService;
                    this.locationService = locationService;
                    this.autoSubmitFrame = true;
                    this.contextServiceProvider.publishingReferenceFrameMap.set(this.viewService.eye.id, STAGE_ENTITY_ID);
                    this.contextServiceProvider.publishingReferenceFrameMap.set(this.viewService.physicalEye.id, PHYSICAL_STAGE_ENTITY_ID);
                    var onAnimationFrame = function onAnimationFrame() {
                        if (!_this3.sessionService.manager.isClosed) _this3.viewService.requestAnimationFrame(onAnimationFrame);
                        _this3.update();
                    };
                    this.viewService.requestAnimationFrame(onAnimationFrame);
                    this.contextService.postRenderEvent.addEventListener(function () {
                        if (_this3.autoSubmitFrame && currentVRDisplay && currentVRDisplay.isPresenting) {
                            currentVRDisplay.submitFrame();
                        }
                    });
                    var currentCanvas = void 0;
                    var previousPresentationMode = void 0;
                    var handleVRDisplayPresentChange = function handleVRDisplayPresentChange(e) {
                        var vrDisplay = e.display || e.detail.vrdisplay || e.detail.display;
                        if (vrDisplay) {
                            var layers = vrDisplay.getLayers();
                            var isThisView = currentVRDisplay === vrDisplay;
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = layers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var layer = _step2.value;

                                    if (layer.source && _this3.viewportService.element.contains(layer.source)) {
                                        isThisView = true;
                                        break;
                                    }
                                }
                            } catch (err) {
                                _didIteratorError2 = true;
                                _iteratorError2 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                        _iterator2.return();
                                    }
                                } finally {
                                    if (_didIteratorError2) {
                                        throw _iteratorError2;
                                    }
                                }
                            }

                            if (isThisView) {
                                if (vrDisplay.isPresenting) {
                                    currentVRDisplay = vrDisplay;
                                    if (vrDisplay.displayName.match(/Cardboard/g)) {
                                        currentCanvas = vrDisplay.getLayers()[0].source;
                                        if (currentCanvas) currentCanvas.classList.add('argon-interactive');
                                        previousPresentationMode = _this3.viewportService.presentationMode;
                                        _this3.viewportService.requestPresentationMode(PresentationMode.IMMERSIVE);
                                    }
                                } else {
                                    currentVRDisplay = undefined;
                                    if (currentCanvas && vrDisplay.displayName.match(/Cardboard/g)) {
                                        currentCanvas.classList.remove('argon-interactive');
                                        currentCanvas = undefined;
                                        _this3.viewportService.requestPresentationMode(previousPresentationMode);
                                    }
                                }
                            }
                        }
                        _this3.viewportService.presentationModeChangeEvent.addEventListener(function (mode) {
                            if (mode === PresentationMode.PAGE) _this3.exitPresentHMD();
                        });
                    };
                    window.addEventListener('vrdisplaypresentchange', handleVRDisplayPresentChange);
                    this.update();
                }

                _createClass(ViewServiceProvider, [{
                    key: "update",
                    value: function update() {
                        var _this4 = this;

                        // update view state and physical eye entities
                        this.onUpdate();
                        // publish the view state and the physical eye entities.
                        this.contextServiceProvider.publishEntityState(this.viewService.physicalEye);
                        this.sessionService.managedSessions.forEach(function (s) {
                            if (Role.isRealityViewer(s.info.role)) s.send('ar.view.suggestedViewState', _this4.viewService.suggestedViewState);
                        });
                    }
                }, {
                    key: "onUpdate",
                    value: function onUpdate() {
                        if (currentVRDisplay) {
                            this._updateViewFromWebVR(currentVRDisplay);
                        } else {
                            this._updateViewSingular();
                        }
                    }
                }, {
                    key: "requestPresentHMD",
                    value: function requestPresentHMD() {
                        var _this5 = this;

                        if (typeof navigator !== 'undefined' && navigator.getVRDisplays) {
                            var requestPresent = function requestPresent(vrDisplay) {
                                currentVRDisplay = vrDisplay;
                                var element = _this5.viewportService.element;
                                var layers = [];
                                layers[0] = { source: element.querySelector('canvas') || element.lastElementChild };
                                return vrDisplay.requestPresent(layers).catch(function (e) {
                                    currentVRDisplay = undefined;
                                    throw e;
                                });
                            };
                            if (navigator.activeVRDisplays && navigator.activeVRDisplays.length) {
                                return requestPresent(navigator.activeVRDisplays[0]);
                            } else {
                                return navigator.getVRDisplays().then(function (displays) {
                                    return displays[0];
                                }).then(requestPresent);
                            }
                        }
                        throw new Error('No HMD available');
                    }
                }, {
                    key: "exitPresentHMD",
                    value: function exitPresentHMD() {
                        if (currentVRDisplay) {
                            var vrDisplay = currentVRDisplay;
                            currentVRDisplay = undefined;
                            return vrDisplay.exitPresent();
                        }
                        return Promise.resolve();
                    }
                }, {
                    key: "_updateViewSingular",
                    value: function _updateViewSingular() {
                        var suggestedViewState = this.viewService.suggestedViewState = this.viewService.suggestedViewState || {};
                        var viewport = suggestedViewState.viewport = suggestedViewState.viewport || {};
                        viewport.x = 0;
                        viewport.y = 0;
                        viewport.width = this.viewportService.rootElement.clientWidth;
                        viewport.height = this.viewportService.rootElement.clientHeight;
                        var subviews = suggestedViewState.subviews = suggestedViewState.subviews || [];
                        subviews.length = 1;
                        var subview = subviews[0] = subviews[0] || {};
                        subview.type = SubviewType.SINGULAR;
                        subview.viewport = subview.viewport || {};
                        subview.viewport.x = 0;
                        subview.viewport.y = 0;
                        subview.viewport.width = viewport.width;
                        subview.viewport.height = viewport.height;
                        var aspect = viewport.width / viewport.height;
                        scratchFrustum.near = 0.01;
                        scratchFrustum.far = 500000000;
                        scratchFrustum.fov = Math.PI / 3;
                        scratchFrustum.aspectRatio = isFinite(aspect) && aspect !== 0 ? aspect : 1;
                        subview.projectionMatrix = Matrix4.clone(scratchFrustum.projectionMatrix, subview.projectionMatrix);
                        updatePhysicalEyePoseFromDeviceOrientation(this.contextService);
                    }
                }, {
                    key: "_updateViewFromWebVR",
                    value: function _updateViewFromWebVR(vrDisplay) {
                        var suggestedViewState = this.viewService.suggestedViewState = this.viewService.suggestedViewState || {};
                        var viewport = suggestedViewState.viewport = suggestedViewState.viewport || {};
                        viewport.x = 0;
                        viewport.y = 0;
                        viewport.width = this.viewportService.rootElement.clientWidth;
                        viewport.height = this.viewportService.rootElement.clientHeight;
                        var vrFrameData = this._vrFrameData = this._vrFrameData || new VRFrameData();
                        if (!vrDisplay['getFrameData'](vrFrameData)) return this.viewService.suggestedViewState;
                        var layers = vrDisplay.getLayers();
                        var leftBounds = layers[0].leftBounds;
                        var rightBounds = layers[0].rightBounds;
                        var subviews = suggestedViewState.subviews = suggestedViewState.subviews || [];
                        var leftSubview = subviews[0] = subviews[0] || {};
                        var rightSubview = subviews[1] = subviews[1] || {};
                        leftSubview.type = SubviewType.LEFTEYE;
                        rightSubview.type = SubviewType.RIGHTEYE;
                        var leftViewport = leftSubview.viewport = leftSubview.viewport || {};
                        leftViewport.x = leftBounds[0] * viewport.width;
                        leftViewport.y = leftBounds[1] * viewport.height;
                        leftViewport.width = leftBounds[2] * viewport.width;
                        leftViewport.height = leftBounds[3] * viewport.height;
                        var rightViewport = rightSubview.viewport = rightSubview.viewport || {};
                        rightViewport.x = rightBounds[0] * viewport.width;
                        rightViewport.y = rightBounds[1] * viewport.height;
                        rightViewport.width = rightBounds[2] * viewport.width;
                        rightViewport.height = rightBounds[3] * viewport.height;
                        leftSubview.projectionMatrix = Matrix4.clone(vrFrameData.leftProjectionMatrix, leftSubview.projectionMatrix);
                        rightSubview.projectionMatrix = Matrix4.clone(vrFrameData.rightProjectionMatrix, rightSubview.projectionMatrix);
                        var inverseStandingMatrix = Matrix4.IDENTITY.clone(scratchMatrix4);
                        if (vrDisplay.stageParameters) {
                            Matrix4.inverseTransformation(vrDisplay.stageParameters.sittingToStandingTransform, inverseStandingMatrix);
                        }
                        var inverseStandingRotationMatrix = Matrix4.getRotation(inverseStandingMatrix, scratchMatrix3);
                        var inverseStandingOrientation = Quaternion.fromRotationMatrix(inverseStandingRotationMatrix, scratchQuaternion);
                        var leftStandingViewMatrix = Matrix4.multiplyTransformation(vrFrameData.leftViewMatrix, inverseStandingMatrix, scratchMatrix4);
                        var rightStandingViewMatrix = Matrix4.multiplyTransformation(vrFrameData.rightViewMatrix, inverseStandingMatrix, scratchMatrix4);
                        var eye = this.viewService.physicalEye;
                        var stage = this.locationService.physicalStage;
                        if (!vrDisplay.displayName.match(/polyfill/g)) {
                            var sittingEyePosition = vrFrameData.pose.position ? Cartesian3.unpack(vrFrameData.pose.position, 0, scratchCartesian$1) : undefined;
                            var stageEyePosition = sittingEyePosition ? Matrix4.multiplyByPoint(inverseStandingMatrix, sittingEyePosition, scratchCartesian$1) : undefined;
                            var sittingEyeOrientation = vrFrameData.pose.orientation ? Quaternion.unpack(vrFrameData.pose.orientation, 0, scratchQuaternion2) : undefined;
                            var stageEyeOrientation = sittingEyeOrientation ? Quaternion.multiply(inverseStandingOrientation, sittingEyeOrientation, scratchQuaternion) : undefined;
                            eye.position.setValue(stageEyePosition, stage);
                            eye.orientation.setValue(stageEyeOrientation);
                        } else {
                            // The polyfill does not support reporting an absolute orientation (yet), 
                            // so fall back to our own pose calculation if we are using the polyfill device
                            updatePhysicalEyePoseFromDeviceOrientation(this.contextService);
                        }
                        var leftEye = this.viewService.getSubviewEntity(0);
                        var stageLeftEyePosition = Matrix4.getTranslation(leftStandingViewMatrix, scratchCartesian$1);
                        leftEye.position.setValue(stageLeftEyePosition, stage);
                        var rightEye = this.viewService.getSubviewEntity(1);
                        var stageRightEyePosition = Matrix4.getTranslation(rightStandingViewMatrix, scratchCartesian$1);
                        rightEye.position.setValue(stageRightEyePosition, stage);
                    }
                }, {
                    key: "isPresentingHMD",
                    get: function get() {
                        return !!(currentVRDisplay && currentVRDisplay.isPresenting);
                    }
                }]);

                return ViewServiceProvider;
            }());

            _export('ViewServiceProvider', ViewServiceProvider = __decorate$3([autoinject, __metadata$3("design:paramtypes", [typeof (_e$2 = typeof SessionService !== "undefined" && SessionService) === "function" && _e$2 || Object, typeof (_f$1 = typeof ContextService !== "undefined" && ContextService) === "function" && _f$1 || Object, typeof (_g$1 = typeof ContextServiceProvider !== "undefined" && ContextServiceProvider) === "function" && _g$1 || Object, ViewService, typeof (_h$1 = typeof ViewportService !== "undefined" && ViewportService) === "function" && _h$1 || Object, typeof (_j = typeof LocationService !== "undefined" && LocationService) === "function" && _j || Object])], ViewServiceProvider));
            deviceOrientationListener = void 0;
            deviceOrientation = void 0;
            deviceOrientationHeadingAccuracy = void 0;
            clock = new Clock();
            scratchTime = new JulianDate(0, 0);

            _export('RealityViewer', RealityViewer = function () {
                function RealityViewer(uri) {
                    var _this = this;

                    _classCallCheck(this, RealityViewer);

                    this.uri = uri;
                    this.providedReferenceFrames = [];
                    this.connectEvent = new Event();
                    this.presentChangeEvent = new Event();
                    this._isPresenting = false;
                    this.connectEvent.addEventListener(function (session) {
                        if (_this._session) _this._session.close();
                        _this._session = session;
                        session.closeEvent.addEventListener(function () {
                            if (_this._session === session) _this._session = undefined;
                        });
                    });
                }

                _createClass(RealityViewer, [{
                    key: 'destroy',
                    value: function destroy() {
                        if (this.session) {
                            this.session.close();
                        }
                    }
                }, {
                    key: 'setPresenting',
                    value: function setPresenting(flag) {
                        if (this._isPresenting !== flag) {
                            this._isPresenting = flag;
                            this.presentChangeEvent.raiseEvent(undefined);
                        }
                    }
                }, {
                    key: 'isPresenting',
                    get: function get() {
                        return this._isPresenting;
                    }
                }, {
                    key: 'session',
                    get: function get() {
                        return this._session;
                    }
                }], [{
                    key: 'getType',
                    value: function getType(uri) {
                        if (uri === undefined) return undefined;
                        if (uri.split(':')[0] === 'reality') {
                            return uri;
                        }
                        return 'hosted';
                    }
                }]);

                return RealityViewer;
            }());

            RealityViewer.DEFAULT = 'reality:default';
            RealityViewer.EMPTY = 'reality:empty';
            RealityViewer.LIVE = 'reality:live';

            __decorate$10 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata$10 = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            _export('EmptyRealityViewer', EmptyRealityViewer = function (_RealityViewer) {
                _inherits(EmptyRealityViewer, _RealityViewer);

                function EmptyRealityViewer(sessionService, contextService, viewService, viewportService, uri) {
                    _classCallCheck(this, EmptyRealityViewer);

                    var _this = _possibleConstructorReturn(this, (EmptyRealityViewer.__proto__ || Object.getPrototypeOf(EmptyRealityViewer)).call(this, uri));

                    _this.sessionService = sessionService;
                    _this.contextService = contextService;
                    _this.viewService = viewService;
                    _this.viewportService = viewportService;
                    _this.uri = uri;
                    _this.type = 'empty';
                    return _this;
                }

                _createClass(EmptyRealityViewer, [{
                    key: "load",
                    value: function load() {
                        var _this2 = this;

                        var session = this.sessionService.addManagedSessionPort(this.uri);
                        session.connectEvent.addEventListener(function () {
                            _this2.connectEvent.raiseEvent(session);
                        });
                        var internalSession = this.sessionService.createSessionPort(this.uri);
                        internalSession.on['ar.device.state'] = function () {};
                        internalSession.on['ar.visibility.state'] = function () {};
                        internalSession.on['ar.focus.state'] = function () {};
                        internalSession.on['ar.viewport.uievent'] = function () {};
                        internalSession.on['ar.viewport.presentationMode'] = function () {};
                        internalSession.on['ar.view.suggestedViewState'] = function () {};
                        internalSession.on['ar.context.update'] = function () {};
                        internalSession.on['ar.reality.connect'] = function () {};
                        internalSession.connectEvent.addEventListener(function () {
                            var aggregator = new CameraEventAggregator(_this2.viewportService.element);
                            var flags = {
                                moveForward: false,
                                moveBackward: false,
                                moveUp: false,
                                moveDown: false,
                                moveLeft: false,
                                moveRight: false
                            };
                            function getFlagForKeyCode(keyCode) {
                                switch (keyCode) {
                                    case 'W'.charCodeAt(0):
                                        return 'moveForward';
                                    case 'S'.charCodeAt(0):
                                        return 'moveBackward';
                                    case 'R'.charCodeAt(0):
                                        return 'moveUp';
                                    case 'F'.charCodeAt(0):
                                        return 'moveDown';
                                    case 'D'.charCodeAt(0):
                                        return 'moveRight';
                                    case 'A'.charCodeAt(0):
                                        return 'moveLeft';
                                    default:
                                        return undefined;
                                }
                            }
                            var keydownListener = function keydownListener(e) {
                                var flagName = getFlagForKeyCode(e.keyCode);
                                if (typeof flagName !== 'undefined') {
                                    flags[flagName] = true;
                                }
                            };
                            var keyupListener = function keyupListener(e) {
                                var flagName = getFlagForKeyCode(e.keyCode);
                                if (typeof flagName !== 'undefined') {
                                    flags[flagName] = false;
                                }
                            };
                            document.addEventListener('keydown', keydownListener, false);
                            document.addEventListener('keyup', keyupListener, false);
                            internalSession.closeEvent.addEventListener(function () {
                                aggregator.destroy();
                                document.removeEventListener('keydown', keydownListener);
                                document.removeEventListener('keyup', keyupListener);
                            });
                            var scratchQuaternion = new Quaternion();
                            var scratchQuaternionDragYaw = new Quaternion();
                            // const pitchQuat = new Quaternion;
                            var positionScratchCartesian = new Cartesian3();
                            var movementScratchCartesian = new Cartesian3();
                            var eyeOrientation = new Quaternion();
                            var orientationMatrix = new Matrix3();
                            var up = new Cartesian3(0, 0, 1);
                            var right = new Cartesian3(1, 0, 0);
                            var forward = new Cartesian3(0, -1, 0);
                            var scratchFrustum = new PerspectiveFrustum();
                            var AVERAGE_HUMAN_HEIGHT$$1 = 1.77;
                            var NEGATIVE_UNIT_Y = new Cartesian3(0, -1, 0);
                            var X_90ROT = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, CesiumMath.PI_OVER_TWO);
                            var virtualEyePositionProperty = new ConstantPositionProperty(new Cartesian3(0, 0, AVERAGE_HUMAN_HEIGHT$$1), _this2.contextService.entities.getById(PHYSICAL_STAGE_ENTITY_ID));
                            var virtualEyeOrientationProperty = new ConstantProperty(X_90ROT);
                            Matrix3.fromQuaternion(eyeOrientation, orientationMatrix);
                            var virtualEye = new Entity({
                                position: virtualEyePositionProperty,
                                orientation: virtualEyeOrientationProperty
                            });
                            var viewService = _this2.viewService;
                            var subviews = [];
                            var update = function update(time) {
                                if (internalSession.isConnected) viewService.requestAnimationFrame(update);else return;
                                if (!_this2.isPresenting) {
                                    aggregator.reset();
                                    return;
                                }
                                var suggestedViewState = _this2.viewService.suggestedViewState;
                                if (!suggestedViewState) return;
                                SerializedSubviewList.clone(suggestedViewState.subviews, subviews);
                                // provide fov controls
                                if (!suggestedViewState.strict) {
                                    decomposePerspectiveProjectionMatrix(subviews[0].projectionMatrix, scratchFrustum);
                                    scratchFrustum.fov = viewService.subviews[0].frustum.fov;
                                    if (aggregator.isMoving(CameraEventType.WHEEL)) {
                                        var wheelMovement = aggregator.getMovement(CameraEventType.WHEEL);
                                        var diff = wheelMovement.endPosition.y;
                                        scratchFrustum.fov = Math.min(Math.max(scratchFrustum.fov - diff * 0.02, Math.PI / 8), Math.PI - Math.PI / 8);
                                    }
                                    if (aggregator.isMoving(CameraEventType.PINCH)) {
                                        var pinchMovement = aggregator.getMovement(CameraEventType.PINCH);
                                        var _diff = pinchMovement.distance.endPosition.y - pinchMovement.distance.startPosition.y;
                                        scratchFrustum.fov = Math.min(Math.max(scratchFrustum.fov - _diff * 0.02, Math.PI / 8), Math.PI - Math.PI / 8);
                                    }
                                    subviews.forEach(function (s) {
                                        var aspect = s.viewport.width / s.viewport.height;
                                        scratchFrustum.aspectRatio = isFinite(aspect) ? aspect : 1;
                                        Matrix4.clone(scratchFrustum.projectionMatrix, s.projectionMatrix);
                                    });
                                }
                                var physicalStage = _this2.contextService.entities.getById(PHYSICAL_STAGE_ENTITY_ID);
                                var orientation = getEntityOrientation(_this2.viewService.physicalEye, time, physicalStage, scratchQuaternion);
                                // provide controls if the device does not have a pose
                                if (!orientation && !suggestedViewState.strict) {
                                    if (aggregator.isMoving(CameraEventType.LEFT_DRAG)) {
                                        var dragMovement = aggregator.getMovement(CameraEventType.LEFT_DRAG);
                                        var currentOrientation = getEntityOrientationInReferenceFrame(virtualEye, time, physicalStage, eyeOrientation);
                                        if (currentOrientation) {
                                            // const dragPitch = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, frustum.fov * (dragMovement.endPosition.y - dragMovement.startPosition.y) / app.view.getViewport().height, scratchQuaternionDragPitch);
                                            var dragYaw = Quaternion.fromAxisAngle(Cartesian3.UNIT_Y, scratchFrustum.fov * (dragMovement.endPosition.x - dragMovement.startPosition.x) / suggestedViewState.viewport.width, scratchQuaternionDragYaw);
                                            // const drag = Quaternion.multiply(dragPitch, dragYaw, dragYaw);
                                            var newOrientation = Quaternion.multiply(currentOrientation, dragYaw, dragYaw);
                                            virtualEye.orientation.setValue(newOrientation);
                                            Matrix3.fromQuaternion(newOrientation, orientationMatrix);
                                            Matrix3.multiplyByVector(orientationMatrix, Cartesian3.UNIT_Z, up);
                                            Matrix3.multiplyByVector(orientationMatrix, Cartesian3.UNIT_X, right);
                                            Matrix3.multiplyByVector(orientationMatrix, NEGATIVE_UNIT_Y, forward);
                                        }
                                    }
                                    var position = virtualEyePositionProperty.getValueInReferenceFrame(time, physicalStage, positionScratchCartesian);
                                    var moveRate = 0.02;
                                    if (flags.moveForward) {
                                        Cartesian3.multiplyByScalar(forward, moveRate, movementScratchCartesian);
                                        Cartesian3.add(position, movementScratchCartesian, position);
                                    }
                                    if (flags.moveBackward) {
                                        Cartesian3.multiplyByScalar(forward, -moveRate, movementScratchCartesian);
                                        Cartesian3.add(position, movementScratchCartesian, position);
                                    }
                                    if (flags.moveUp) {
                                        Cartesian3.multiplyByScalar(up, moveRate, movementScratchCartesian);
                                        Cartesian3.add(position, movementScratchCartesian, position);
                                    }
                                    if (flags.moveDown) {
                                        Cartesian3.multiplyByScalar(up, -moveRate, movementScratchCartesian);
                                        Cartesian3.add(position, movementScratchCartesian, position);
                                    }
                                    if (flags.moveLeft) {
                                        Cartesian3.multiplyByScalar(right, -moveRate, movementScratchCartesian);
                                        Cartesian3.add(position, movementScratchCartesian, position);
                                    }
                                    if (flags.moveRight) {
                                        Cartesian3.multiplyByScalar(right, moveRate, movementScratchCartesian);
                                        Cartesian3.add(position, movementScratchCartesian, position);
                                    }
                                    virtualEyePositionProperty.setValue(position, physicalStage);
                                } else {
                                    virtualEyeOrientationProperty.setValue(orientation);
                                }
                                aggregator.reset();
                                var frameState = _this2.contextService.createFrameState(time, suggestedViewState.viewport, subviews, virtualEye);
                                internalSession.send('ar.reality.frameState', frameState);
                            };
                            viewService.requestAnimationFrame(update);
                        });
                        // Only connect after the caller is able to attach connectEvent handlers
                        Promise.resolve().then(function () {
                            var messageChannel = _this2.sessionService.createSynchronousMessageChannel();
                            session.open(messageChannel.port1, _this2.sessionService.configuration);
                            internalSession.open(messageChannel.port2, { role: Role.REALITY_VIEWER, uri: _this2.uri, title: 'Empty' });
                        });
                    }
                }]);

                return EmptyRealityViewer;
            }(RealityViewer));

            _export('EmptyRealityViewer', EmptyRealityViewer = __decorate$10([inject(SessionService, ContextService, ViewService, ViewportService), __metadata$10("design:paramtypes", [typeof (_a$10 = typeof SessionService !== "undefined" && SessionService) === "function" && _a$10 || Object, typeof (_b$10 = typeof ContextService !== "undefined" && ContextService) === "function" && _b$10 || Object, typeof (_c$7 = typeof ViewService !== "undefined" && ViewService) === "function" && _c$7 || Object, typeof (_d$7 = typeof ViewportService !== "undefined" && ViewportService) === "function" && _d$7 || Object, String])], EmptyRealityViewer));

            _get$1 = function get(object, property, receiver) {
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);

                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);

                    if (parent === null) {
                        return undefined;
                    } else {
                        return get(parent, property, receiver);
                    }
                } else if ("value" in desc) {
                    return desc.value;
                } else {
                    var getter = desc.get;

                    if (getter === undefined) {
                        return undefined;
                    }

                    return getter.call(receiver);
                }
            };

            __decorate$11 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata$11 = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            _export('LiveRealityViewer', LiveRealityViewer = function (_RealityViewer) {
                _inherits(LiveRealityViewer, _RealityViewer);

                function LiveRealityViewer(sessionService, viewportService, viewService, contextService, uri) {
                    _classCallCheck(this, LiveRealityViewer);

                    var _this = _possibleConstructorReturn(this, (LiveRealityViewer.__proto__ || Object.getPrototypeOf(LiveRealityViewer)).call(this, uri));

                    _this.sessionService = sessionService;
                    _this.viewportService = viewportService;
                    _this.viewService = viewService;
                    _this.contextService = contextService;
                    _this.uri = uri;
                    if (typeof document !== 'undefined') {
                        _this.settingsIframe = document.createElement('iframe');
                        _this.settingsIframe.width = '0';
                        _this.settingsIframe.height = '0';
                        _this.settingsIframe.src = 'https://argonjs.io/tools.argonjs.io/';
                        _this.settingsIframe.style.display = 'none';
                        _this.videoFov = Math.PI / 2;
                        _this.videoElement = document.createElement('video');
                        _this.videoElement.style.width = '100%';
                        _this.videoElement.style.height = 'height:100%';
                        _this.videoElement.controls = false;
                        _this.videoElement.autoplay = true;
                        _this.videoElement.style.display = 'none';
                        var viewElement = _this.viewportService.element;
                        viewElement.insertBefore(_this.settingsIframe, viewElement.firstChild);
                        viewElement.insertBefore(_this.videoElement, viewElement.firstChild);
                        _this.canvas = document.createElement('canvas');
                        _this.context = _this.canvas.getContext('2d');
                        window.addEventListener('message', function (event) {
                            var origin = event.origin;
                            if (origin === 'http://argonjs.io') {
                                _this.videoFov = event.data; // TODO: this is not flexible. Should be passing an object with message type and data
                            }
                        });
                    }
                    _this.presentChangeEvent.addEventListener(function () {
                        if (typeof document !== 'undefined') {
                            _this.videoElement.style.display = _this.isPresenting ? 'initial' : 'none';
                        }
                    });
                    return _this;
                }

                _createClass(LiveRealityViewer, [{
                    key: "destroy",
                    value: function destroy() {
                        _get$1(LiveRealityViewer.prototype.__proto__ || Object.getPrototypeOf(LiveRealityViewer.prototype), "destroy", this).call(this);
                        if (typeof document !== 'undefined') {
                            this.settingsIframe.remove();
                            this.videoElement.remove();
                            this.canvas.remove();
                        }
                    }
                }, {
                    key: "setupInternalSession",
                    value: function setupInternalSession(session) {
                        var _this2 = this;

                        session.on['ar.device.state'] = function () {};
                        session.on['ar.visibility.state'] = function () {};
                        session.on['ar.focus.state'] = function () {};
                        session.on['ar.viewport.presentationMode'] = function () {};
                        session.on['ar.viewport.uievent'] = function () {};
                        session.on['ar.view.suggestedViewState'] = function () {};
                        session.on['ar.context.update'] = function () {};
                        session.on['ar.reality.connect'] = function () {};
                        session.connectEvent.addEventListener(function () {
                            if (_this2.videoElement) {
                                (function () {
                                    var videoElement = _this2.videoElement;
                                    var mediaDevices = navigator.mediaDevices;
                                    var getUserMedia = (mediaDevices.getUserMedia || mediaDevices['mozGetUserMedia'] || mediaDevices['msGetUserMedia'] || mediaDevices['webkitGetUserMedia']).bind(mediaDevices);
                                    getUserMedia({ audio: false, video: true }).then(function (videoStream) {
                                        var stopVideoStream = function stopVideoStream() {
                                            var _iteratorNormalCompletion = true;
                                            var _didIteratorError = false;
                                            var _iteratorError = undefined;

                                            try {
                                                for (var _iterator = videoStream.getTracks()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                                    var t = _step.value;

                                                    t.stop();
                                                }
                                            } catch (err) {
                                                _didIteratorError = true;
                                                _iteratorError = err;
                                            } finally {
                                                try {
                                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                                        _iterator.return();
                                                    }
                                                } finally {
                                                    if (_didIteratorError) {
                                                        throw _iteratorError;
                                                    }
                                                }
                                            }
                                        };
                                        if (session.isConnected) {
                                            videoElement.src = window.URL.createObjectURL(videoStream);
                                            session.closeEvent.addEventListener(stopVideoStream);
                                        } else {
                                            stopVideoStream();
                                        }
                                    }).catch(function (error) {
                                        session.errorEvent.raiseEvent(error);
                                    });
                                    var viewService = _this2.viewService;
                                    var lastFrameTime = -1;
                                    var update = function update(time) {
                                        if (session.isConnected) viewService.requestAnimationFrame(update);else return;
                                        var suggestedViewState = viewService.suggestedViewState;
                                        if (!suggestedViewState) return;
                                        if (videoElement.currentTime != lastFrameTime) {
                                            lastFrameTime = videoElement.currentTime;
                                            // const videoWidth = videoElement.videoWidth;
                                            // const videoHeight = videoElement.videoHeight;
                                            var frameState = _this2.contextService.createFrameState(time, suggestedViewState.viewport, suggestedViewState.subviews, viewService.eye);
                                            session.send('ar.reality.frameState', frameState);
                                        }
                                    };
                                    viewService.requestAnimationFrame(update);
                                })();
                            }
                        });
                    }
                }, {
                    key: "load",
                    value: function load() {
                        var _this3 = this;

                        var session = this.sessionService.addManagedSessionPort(this.uri);
                        session.connectEvent.addEventListener(function () {
                            _this3.connectEvent.raiseEvent(session);
                        });
                        var internalSession = this.sessionService.createSessionPort(this.uri);
                        this.setupInternalSession(internalSession);
                        // Only connect after the caller is able to attach connectEvent handlers
                        Promise.resolve().then(function () {
                            var messageChannel = _this3.sessionService.createSynchronousMessageChannel();
                            session.open(messageChannel.port1, _this3.sessionService.configuration);
                            internalSession.open(messageChannel.port2, { role: Role.REALITY_VIEWER, title: 'Live' });
                        });
                    }
                }, {
                    key: "getVideoFrame",
                    value: function getVideoFrame(x, y, width, height) {
                        this.canvas.width = this.videoElement.videoWidth;
                        this.canvas.height = this.videoElement.videoHeight;
                        this.context.drawImage(this.videoElement, 0, 0, this.canvas.width, this.canvas.height);
                        return this.context.getImageData(x, y, width, height);
                    }
                }], [{
                    key: "isAvailable",
                    value: function isAvailable() {
                        if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
                            var mediaDevices = navigator.mediaDevices;
                            return !!(mediaDevices.getUserMedia || mediaDevices['mozGetUserMedia'] || mediaDevices['msGetUserMedia'] || mediaDevices['webkitGetUserMedia']);
                        } else {
                            return false;
                        }
                    }
                }]);

                return LiveRealityViewer;
            }(RealityViewer));

            _export('LiveRealityViewer', LiveRealityViewer = __decorate$11([inject(SessionService, ViewportService, ViewService, ContextService), __metadata$11("design:paramtypes", [typeof (_a$11 = typeof SessionService !== "undefined" && SessionService) === "function" && _a$11 || Object, typeof (_b$11 = typeof ViewportService !== "undefined" && ViewportService) === "function" && _b$11 || Object, typeof (_c$8 = typeof ViewService !== "undefined" && ViewService) === "function" && _c$8 || Object, typeof (_d$8 = typeof ContextService !== "undefined" && ContextService) === "function" && _d$8 || Object, String])], LiveRealityViewer));

            __decorate$12 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata$12 = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            _export('HostedRealityViewer', HostedRealityViewer = function (_RealityViewer) {
                _inherits(HostedRealityViewer, _RealityViewer);

                function HostedRealityViewer(sessionService, viewportService, uri) {
                    _classCallCheck(this, HostedRealityViewer);

                    var _this = _possibleConstructorReturn(this, (HostedRealityViewer.__proto__ || Object.getPrototypeOf(HostedRealityViewer)).call(this, uri));

                    _this.sessionService = sessionService;
                    _this.viewportService = viewportService;
                    _this.uri = uri;
                    _this.type = 'hosted';
                    if (typeof document !== 'undefined' && document.createElement) {
                        var iframeElement = _this.iframeElement = document.createElement('iframe');
                        iframeElement.name = createGuid();
                        iframeElement.style.border = '0';
                        iframeElement.width = '100%';
                        iframeElement.height = '100%';
                        iframeElement.style.position = 'absolute';
                        iframeElement.style.display = 'none';
                        var viewElement = _this.viewportService.element;
                        viewElement.insertBefore(iframeElement, viewElement.firstChild);
                        _this.presentChangeEvent.addEventListener(function () {
                            _this.iframeElement.style.display = _this.isPresenting ? 'initial' : 'none';
                        });
                    }
                    return _this;
                }

                _createClass(HostedRealityViewer, [{
                    key: "destroy",
                    value: function destroy() {
                        _get$1(HostedRealityViewer.prototype.__proto__ || Object.getPrototypeOf(HostedRealityViewer.prototype), "destroy", this).call(this);
                        if (this.iframeElement) {
                            this.iframeElement.remove();
                        }
                    }
                }, {
                    key: "load",
                    value: function load() {
                        var _this2 = this;

                        if (typeof document !== 'undefined' && document.createElement) {
                            (function () {
                                var session = _this2.sessionService.addManagedSessionPort(_this2.uri);
                                session.connectEvent.addEventListener(function () {
                                    _this2.connectEvent.raiseEvent(session);
                                });
                                var handleConnectMessage = function handleConnectMessage(ev) {
                                    if (ev.data.type !== 'ARGON_SESSION') return;
                                    var name = ev.data.name;
                                    var messagePort = ev.ports && ev.ports[0];
                                    if (!messagePort) throw new Error('Received an ARGON_SESSION message without a MessagePort object');
                                    if (name !== _this2.iframeElement.name) return;
                                    window.removeEventListener('message', handleConnectMessage);
                                    session.open(messagePort, _this2.sessionService.configuration);
                                };
                                window.addEventListener('message', handleConnectMessage);
                                _this2.iframeElement.src = '';
                                _this2.iframeElement.src = _this2.uri;
                            })();
                        }
                    }
                }]);

                return HostedRealityViewer;
            }(RealityViewer));

            _export('HostedRealityViewer', HostedRealityViewer = __decorate$12([inject(SessionService, ViewportService), __metadata$12("design:paramtypes", [typeof (_a$12 = typeof SessionService !== "undefined" && SessionService) === "function" && _a$12 || Object, typeof (_b$12 = typeof ViewportService !== "undefined" && ViewportService) === "function" && _b$12 || Object, String])], HostedRealityViewer));

            __decorate$9 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata$9 = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            _export('RealityViewerFactory', RealityViewerFactory = function () {
                function RealityViewerFactory(_createEmptyReality, _createLiveReality, _createHostedReality) {
                    _classCallCheck(this, RealityViewerFactory);

                    this._createEmptyReality = _createEmptyReality;
                    this._createLiveReality = _createLiveReality;
                    this._createHostedReality = _createHostedReality;
                }

                _createClass(RealityViewerFactory, [{
                    key: "createRealityViewer",
                    value: function createRealityViewer(uri) {
                        switch (RealityViewer.getType(uri)) {
                            case RealityViewer.EMPTY:
                                return this._createEmptyReality(uri);
                            case RealityViewer.LIVE:
                                return this._createLiveReality(uri);
                            case 'hosted':
                                return this._createHostedReality(uri);
                            default:
                                throw new Error('Unsupported Reality Viewer: ' + uri);
                        }
                    }
                }]);

                return RealityViewerFactory;
            }());

            _export('RealityViewerFactory', RealityViewerFactory = __decorate$9([inject(Factory.of(EmptyRealityViewer), Factory.of(LiveRealityViewer), Factory.of(HostedRealityViewer)), __metadata$9("design:paramtypes", [Object, Object, Object])], RealityViewerFactory));
            /**
            * A service which makes requests to manage the reality viewer.
            */

            _export('RealityService', RealityService = function () {
                function RealityService(sessionService, contextService) {
                    var _this = this;

                    _classCallCheck(this, RealityService);

                    this.sessionService = sessionService;
                    this.contextService = contextService;
                    this._connectEvent = new Event();
                    this._changeEvent = new Event();
                    /**
                     * The default Reality Viewer.
                     */
                    this.default = RealityViewer.EMPTY;
                    sessionService.manager.on['ar.reality.connect'] = function (_ref) {
                        var id = _ref.id;

                        var realityControlSession = _this.sessionService.createSessionPort(id);
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
                    var i = 0;
                    this.contextService.frameStateEvent.addEventListener(function (frameState) {
                        if (sessionService.isRealityViewer && sessionService.manager.isConnected) {
                            // backwards compatability
                            if (sessionService.manager.version[0] === 0) {
                                var view = frameState['view'] = frameState['view'] || {};
                                view.pose = frameState.entities['ar.eye'];
                                view.viewport = frameState.viewport;
                                view.subviews = frameState.subviews;
                                for (var _i = 0; _i < view.subviews.length; _i++) {
                                    var s = view.subviews[_i];
                                    s['frustum'] = decomposePerspectiveProjectionMatrix(s.projectionMatrix, s['frustum'] || {});
                                }
                                delete frameState.entities['ar.eye'];
                                delete frameState.viewport;
                                delete frameState.subviews;
                                // throttle for 30fps
                                i++ % 2 === 0 && sessionService.manager.send('ar.reality.frameState', frameState);
                                frameState.entities['ar.eye'] = view.pose;
                                frameState.viewport = view.viewport;
                                frameState.subviews = view.subviews;
                            } else {
                                sessionService.manager.send('ar.reality.frameState', frameState);
                            }
                        }
                        var current = frameState.reality;
                        var previous = _this._current;
                        if (previous !== current) {
                            _this.changeEvent.raiseEvent({ previous: previous, current: current });
                        }
                    });
                }
                /**
                 * An event that is raised when a reality viewer provides a session
                 * for sending and receiving application commands.
                 */

                _createClass(RealityService, [{
                    key: "install",

                    /**
                     * RealityViewer-only. Publish the next view state.
                     */
                    // public publishViewState(viewState: ViewState) {
                    //     this.sessionService.ensureIsRealityViewer();
                    //     if (this.sessionService.isRealityViewer) {
                    //         if (this.sessionService.manager.isConnected)
                    //             this.sessionService.manager.send('ar.reality.viewState', viewState);
                    //         viewState.reality = 'self';
                    //     }
                    //     this.contextService.pushNextFrameState(viewState);
                    // }
                    /**
                     * Install the specified reality viewer
                     */
                    value: function install(uri) {
                        if (this.sessionService.manager.version[0] >= 1 !== true) return Promise.reject(new Error('Not supported'));
                        return this.sessionService.manager.request('ar.reality.install', { uri: uri });
                    }
                    /**
                     * Uninstall the specified reality viewer
                     */

                }, {
                    key: "uninstall",
                    value: function uninstall(uri) {
                        if (this.sessionService.manager.version[0] >= 1 !== true) return Promise.reject(new Error('Not supported'));
                        return this.sessionService.manager.request('ar.reality.uninstall', { uri: uri });
                    }
                    /**
                     * Request a reality viewer to be presented.
                     * - Pass a url to request a (custum) hosted reality viewer
                     * - [[RealityViewer.DEFAULT]] to request the system default reality viewer
                     * - [[RealityViewer.LIVE]] to request a live reality viewer
                     * - [[RealityViewer.EMPTY]] to request an empty reality viewer
                     */

                }, {
                    key: "request",
                    value: function request(uri) {
                        if (this.sessionService.manager.version[0] >= 1 !== true) return this.sessionService.manager.request('ar.reality.desired', { reality: { uri: uri } });
                        return this.sessionService.manager.request('ar.reality.request', { uri: uri });
                    }
                    /**
                     * Deprecated. Use [[RealityService#request]]
                     * @deprecated
                     */

                }, {
                    key: "setDesired",
                    value: function setDesired(reality) {
                        this.request(reality ? reality.uri : RealityViewer.DEFAULT);
                    }
                }, {
                    key: "connectEvent",
                    get: function get() {
                        return this._connectEvent;
                    }
                }, {
                    key: "changeEvent",

                    /**
                     * An event that is raised when the presenting reality viewer is changed.
                     */
                    get: function get() {
                        return this._changeEvent;
                    }
                    /**
                     * The URI for the currently presenting Reality Viewer.
                     */

                }, {
                    key: "current",
                    get: function get() {
                        return this._current;
                    }
                }]);

                return RealityService;
            }());

            __decorate$9([deprecated$1('request'), __metadata$9("design:type", Function), __metadata$9("design:paramtypes", [Object]), __metadata$9("design:returntype", void 0)], RealityService.prototype, "setDesired", null);
            _export('RealityService', RealityService = __decorate$9([autoinject(), __metadata$9("design:paramtypes", [typeof (_a$9 = typeof SessionService !== "undefined" && SessionService) === "function" && _a$9 || Object, typeof (_b$9 = typeof ContextService !== "undefined" && ContextService) === "function" && _b$9 || Object])], RealityService));

            _export('RealityServiceProvider', RealityServiceProvider = function () {
                function RealityServiceProvider(sessionService, realityService, contextService, viewportServiceProvider, visibilityServiceProvider, focusServiceProvider, realityViewerFactory) {
                    var _this2 = this;

                    _classCallCheck(this, RealityServiceProvider);

                    this.sessionService = sessionService;
                    this.realityService = realityService;
                    this.contextService = contextService;
                    this.viewportServiceProvider = viewportServiceProvider;
                    this.visibilityServiceProvider = visibilityServiceProvider;
                    this.focusServiceProvider = focusServiceProvider;
                    this.realityViewerFactory = realityViewerFactory;
                    /**
                     * An event that is raised when a reality viewer is installed.
                     */
                    this.installedEvent = new Event();
                    /**
                     * An event that is raised when a reality viewer is uninstalled.
                     */
                    this.uninstalledEvent = new Event();
                    this._viewerByURI = new Map();
                    this._installersByURI = new Map();
                    sessionService.ensureIsRealityManager();
                    sessionService.manager.connectEvent.addEventListener(function () {
                        setTimeout(function () {
                            if (!_this2._presentingRealityViewer && _this2.realityService.default) _this2._handleRequest(_this2.sessionService.manager, {
                                uri: _this2.realityService.default
                            });
                        });
                    });
                    sessionService.manager.closeEvent.addEventListener(function () {
                        _this2._viewerByURI.forEach(function (v) {
                            v.destroy();
                        });
                    });
                    sessionService.connectEvent.addEventListener(function (session) {
                        if (!Role.isRealityViewer(session.info.role)) {
                            session.on['ar.reality.install'] = function (_ref2) {
                                var uri = _ref2.uri;

                                return _this2._handleInstall(session, uri);
                            };
                            session.on['ar.reality.uninstall'] = function (_ref3) {
                                var uri = _ref3.uri;

                                return _this2._handleUninstall(session, uri);
                            };
                            session.on['ar.reality.request'] = function (message) {
                                return _this2._handleRequest(session, message);
                            };
                            // For backwards compatability. 
                            session.on['ar.reality.desired'] = function (message) {
                                var reality = message.reality;

                                if (reality) {
                                    if (reality['type']) {
                                        var type = reality['type'];
                                        reality.uri = reality.uri || 'reality:' + type;
                                        if (type === 'hosted') reality.uri = reality['url'];
                                    }
                                }
                                _this2._handleRequest(session, { uri: reality.uri });
                            };
                        }
                    });
                    this.viewportServiceProvider.forwardedUIEvent.addEventListener(function (uievent) {
                        var session = _this2._presentingRealityViewer && _this2._presentingRealityViewer.session;
                        if (session) viewportServiceProvider.sendUIEventToSession(uievent, session);
                    });
                }

                _createClass(RealityServiceProvider, [{
                    key: "_handleInstall",
                    value: function _handleInstall(session, uri) {
                        var _this3 = this;

                        var installers = this._installersByURI.get(uri);
                        if (installers) {
                            installers.add(session);
                        } else {
                            (function () {
                                var viewer = _this3.realityViewerFactory.createRealityViewer(uri);
                                _this3._viewerByURI.set(uri, viewer);
                                installers = new Set();
                                installers.add(session);
                                _this3._installersByURI.set(uri, installers);
                                viewer.connectEvent.addEventListener(function (viewerSession) {
                                    if (!Role.isRealityViewer(viewerSession.info.role)) {
                                        viewerSession.sendError({ message: "Expected a reality viewer" });
                                        viewerSession.close();
                                        throw new Error('The application "' + viewerSession.uri + '" does not support being loaded as a reality viewer');
                                    }
                                    viewerSession.on['ar.reality.frameState'] = function (frame) {
                                        if (_this3._presentingRealityViewer === viewer) {
                                            frame.reality = viewer.uri;
                                            _this3.contextService.submitFrameState(frame);
                                        }
                                    };
                                    if (viewerSession.info['supportsCustomProtocols']) {
                                        (function () {
                                            _this3._connectViewerWithSession(viewerSession, _this3.sessionService.manager);
                                            var _iteratorNormalCompletion = true;
                                            var _didIteratorError = false;
                                            var _iteratorError = undefined;

                                            try {
                                                for (var _iterator = _this3.sessionService.managedSessions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                                    session = _step.value;

                                                    _this3._connectViewerWithSession(viewerSession, session);
                                                }
                                            } catch (err) {
                                                _didIteratorError = true;
                                                _iteratorError = err;
                                            } finally {
                                                try {
                                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                                        _iterator.return();
                                                    }
                                                } finally {
                                                    if (_didIteratorError) {
                                                        throw _iteratorError;
                                                    }
                                                }
                                            }

                                            var remove = _this3.sessionService.connectEvent.addEventListener(function (session) {
                                                _this3._connectViewerWithSession(viewerSession, session);
                                            });
                                            viewerSession.closeEvent.addEventListener(function () {
                                                return remove();
                                            });
                                        })();
                                    }
                                    var removePresentChangeListener = viewer.presentChangeEvent.addEventListener(function () {
                                        _this3.visibilityServiceProvider.set(viewerSession, viewer.isPresenting);
                                    });
                                    _this3.visibilityServiceProvider.set(viewerSession, viewer.isPresenting);
                                    viewerSession.closeEvent.addEventListener(function () {
                                        removePresentChangeListener();
                                        _this3.contextService.entities.removeById(viewerSession.uri);
                                        console.log('Reality session closed: ' + uri);
                                    });
                                });
                                viewer.load();
                                _this3.installedEvent.raiseEvent({ viewer: viewer });
                            })();
                        }
                    }
                }, {
                    key: "_connectViewerWithSession",
                    value: function _connectViewerWithSession(viewerSession, session) {
                        if (Role.isRealityViewer(session.info.role)) return;
                        var id = createGuid();
                        var ROUTE_MESSAGE_KEY = 'ar.reality.message.route.' + id;
                        var SEND_MESSAGE_KEY = 'ar.reality.message.send.' + id;
                        var CLOSE_SESSION_KEY = 'ar.reality.close.' + id;
                        viewerSession.on[ROUTE_MESSAGE_KEY] = function (message) {
                            session.send(SEND_MESSAGE_KEY, message);
                        };
                        session.on[ROUTE_MESSAGE_KEY] = function (message) {
                            viewerSession.send(SEND_MESSAGE_KEY, message);
                        };
                        viewerSession.send('ar.reality.connect', { id: id });
                        session.send('ar.reality.connect', { id: id });
                        viewerSession.closeEvent.addEventListener(function () {
                            session.send(CLOSE_SESSION_KEY);
                        });
                        session.closeEvent.addEventListener(function () {
                            viewerSession.send(CLOSE_SESSION_KEY);
                            viewerSession.close();
                        });
                    }
                }, {
                    key: "_handleUninstall",
                    value: function _handleUninstall(session, uri) {
                        var installers = this._installersByURI.get(uri);
                        if (installers) {
                            if (installers.size === 0) {
                                var viewer = this._viewerByURI.get(uri);
                                this._viewerByURI.delete(uri);
                                viewer.destroy();
                                this.uninstalledEvent.raiseEvent({ viewer: viewer });
                            }
                        }
                        return Promise.reject(new Error("Unable to uninstall a reality viewer which is not installed"));
                    }
                }, {
                    key: "_handleRequest",
                    value: function _handleRequest(session, options) {
                        if (this.focusServiceProvider.session === session || session === this.sessionService.manager) {
                            var uri = options && options.uri || RealityViewer.DEFAULT;
                            switch (uri) {
                                case RealityViewer.DEFAULT:
                                    uri = this.realityService.default;
                            }
                            var viewer = this._viewerByURI.get(uri);
                            if (!viewer) {
                                this._handleInstall(session, uri);
                            }
                            this._setPresentingRealityViewer(this._viewerByURI.get(uri));
                            return Promise.resolve();
                        }
                        throw new Error('Request Denied');
                    }
                }, {
                    key: "_setPresentingRealityViewer",
                    value: function _setPresentingRealityViewer(viewer) {
                        if (!viewer) throw new Error('Invalid State. Expected a RealityViewer instance');
                        if (this._presentingRealityViewer === viewer) return;
                        this._viewerByURI.forEach(function (v) {
                            v.setPresenting(v === viewer);
                        });
                        this._presentingRealityViewer = viewer;
                        console.log('Presenting reality viewer changed to: ' + viewer.uri);
                    }
                }, {
                    key: "getViewerByURI",
                    value: function getViewerByURI(uri) {
                        return this._viewerByURI.get(uri);
                    }
                }, {
                    key: "presentingRealityViewer",
                    get: function get() {
                        return this._presentingRealityViewer;
                    }
                }]);

                return RealityServiceProvider;
            }());

            _export('RealityServiceProvider', RealityServiceProvider = __decorate$9([autoinject, __metadata$9("design:paramtypes", [typeof (_c$6 = typeof SessionService !== "undefined" && SessionService) === "function" && _c$6 || Object, RealityService, typeof (_d$6 = typeof ContextService !== "undefined" && ContextService) === "function" && _d$6 || Object, typeof (_e$5 = typeof ViewportServiceProvider !== "undefined" && ViewportServiceProvider) === "function" && _e$5 || Object, typeof (_f$4 = typeof VisibilityServiceProvider !== "undefined" && VisibilityServiceProvider) === "function" && _f$4 || Object, typeof (_g$2 = typeof FocusServiceProvider !== "undefined" && FocusServiceProvider) === "function" && _g$2 || Object, RealityViewerFactory])], RealityServiceProvider));

            __decorate$2 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata$2 = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            openIcon = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='768' height='768'%3E%3Cpath fill='white' d='M448.5 96H672v223.5h-64.5v-114L294 519l-45-45 313.5-313.5h-114V96zm159 511.5V384H672v223.5c0 34.5-30 64.5-64.5 64.5h-447c-36 0-64.5-30-64.5-64.5v-447C96 126 124.5 96 160.5 96H384v64.5H160.5v447h447z'/%3E%3C/svg%3E\")";
            eyeIcon = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512'%3E%3Cpath fill='white' d='M256 96C144.34 96 47.56 161.02 0 256c47.56 94.98 144.34 160 256 160 111.656 0 208.438-65.02 256-160-47.558-94.98-144.344-160-256-160zm126.225 84.852c30.08 19.187 55.57 44.887 74.717 75.148-19.146 30.26-44.637 55.96-74.718 75.148C344.427 355.258 300.78 368 256 368s-88.43-12.743-126.226-36.852c-30.08-19.186-55.57-44.886-74.716-75.148 19.146-30.262 44.637-55.962 74.717-75.148 1.96-1.25 3.938-2.46 5.93-3.65C130.725 190.866 128 205.612 128 221c0 70.69 57.308 128 128 128s128-57.31 128-128c0-15.387-2.726-30.134-7.704-43.8 1.99 1.19 3.97 2.402 5.93 3.652zM256 208c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48z'/%3E%3C/svg%3E\")";
            vrIcon = "url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20245.82%20141.73%22%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill%3A%23fff%3Bfill-rule%3Aevenodd%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Ctitle%3Emask%3C%2Ftitle%3E%3Cpath%20class%3D%22a%22%20d%3D%22M175.56%2C111.37c-22.52%2C0-40.77-18.84-40.77-42.07S153%2C27.24%2C175.56%2C27.24s40.77%2C18.84%2C40.77%2C42.07S198.08%2C111.37%2C175.56%2C111.37ZM26.84%2C69.31c0-23.23%2C18.25-42.07%2C40.77-42.07s40.77%2C18.84%2C40.77%2C42.07-18.26%2C42.07-40.77%2C42.07S26.84%2C92.54%2C26.84%2C69.31ZM27.27%2C0C11.54%2C0%2C0%2C12.34%2C0%2C28.58V110.9c0%2C16.24%2C11.54%2C30.83%2C27.27%2C30.83H99.57c2.17%2C0%2C4.19-1.83%2C5.4-3.7L116.47%2C118a8%2C8%2C0%2C0%2C1%2C12.52-.18l11.51%2C20.34c1.2%2C1.86%2C3.22%2C3.61%2C5.39%2C3.61h72.29c15.74%2C0%2C27.63-14.6%2C27.63-30.83V28.58C245.82%2C12.34%2C233.93%2C0%2C218.19%2C0H27.27Z%22%2F%3E%3C%2Fsvg%3E)";
            fullscreenIcon = "url('data:image/svg+xml;utf8,<svg width=\"512\" height=\"512\" version=\"1.1\" viewBox=\"-3 -3 17 17\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\" id=\"Page-1\" stroke=\"none\" stroke-width=\"1\"><g fill=\"white\" id=\"Core\" transform=\"translate(-215.000000, -257.000000)\"><g id=\"fullscreen\" transform=\"translate(215.000000, 257.000000)\"><path d=\"M2,9 L0,9 L0,14 L5,14 L5,12 L2,12 L2,9 L2,9 Z M0,5 L2,5 L2,2 L5,2 L5,0 L0,0 L0,5 L0,5 Z M12,12 L9,12 L9,14 L14,14 L14,9 L12,9 L12,12 L12,12 Z M9,0 L9,2 L12,2 L12,5 L14,5 L14,0 L9,0 L9,0 Z\" id=\"Shape\"/></g></g></g></svg>')";
            argonAppIcon = "url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBYRXhpZgAATU0AKgAAAAgABAExAAIAAAARAAAAPlEQAAEAAAABAQAAAFERAAQAAAABAAAAAFESAAQAAAABAAAAAAAAAABBZG9iZSBJbWFnZVJlYWR5AAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCACQAJADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9ObW1tTbW5NrbDMEJwtvCo5jU8KqBVHoFAAHAAFT/AGS1/wCfW3/78x//ABNFp/x6Wv8A17w/+i1qxX/ILOVXnl71T4n1l3/4C+4/1nUNF7vRfZ8vQr/ZLX/n1t/+/Mf/AMTR9ktf+fW3/wC/Mf8A8TViip5qv81T75f10X3D5P7v/kv/AACv9ktf+fW3/wC/Mf8A8TR9ktf+fW3/AO/Mf/xNWKKOar/NU++X9dF9wcn93/yX/gFf7Ja/8+tv/wB+Y/8A4mj7Ja/8+tv/AN+Y/wD4mrFFHNV/mqffL+ui+4OT+7/5L/wCv9ktf+fW3/78x/8AxNH2S1/59bf/AL8x/wDxNWKKOar/ADVPvl/XRfcHJ/d/8l/4BX+yWv8Az62//fmP/wCJo+yWv/Prb/8AfmP/AOJqxRRzVf5qn3y/rovuDk/u/wDkv/AK/wBktf8An1t/+/Mf/wATR9ktf+fW3/78x/8AxNWKKOar/NU++X9dF9wcn93/AMl/4BX+yWv/AD62/wD35j/+Jo+yWv8Az62//fmP/wCJqxRRzVf5qn3y/rovuDk/u/8Akv8AwCv9ktf+fW3/AO/Mf/xNQXVrai2uCLW2OIJjhreFhxGx5VkKsPUMCCOCCKv1Xu/+PS6/695v/RbVVOVT2kNZ/HHrLuv8kJw0fu9H9ny9BLP/AI87T/r2g/8ARS1ZqtZ/8edp/wBe0H/opas1pP45f4pfmzVT0Wj2X5L/AIP9PQoooqR8/k/6/p/09CiiigOfyf8AX9P+noUUUUBz+T/r+n/T0KKKKA5/J/1/T/p6FFFFAc/k/wCv6f8AT0KKKKA5/J/1/T/p6FFFFAc/k/6/p/09Cq15/wAed3/17T/+imqzVa8/487v/r2n/wDRTVdP+JT/AMcf/SkJz0ej2f5f8P8A09Cz/wCPO0/69oP/AEUtWarWf/Hnaf8AXtB/6KWrNKfxy/xS/NmS2XovyCiiipGFfpT8AP2E/C3xX+E3hT4ieLPF/jLQdT8VRX+o2+l6Kuix2cGkLqV3a6RN/wATHSr25eW/sLeDUHczCPbdIqRqFy35v2WmX2t3+naHpkck2pa5qOn6Jp0USl5JL/V7yHTrRUUZLN59zGcAdAT2r+ofwn4dsfCHhfw54U0xdmneGtC0nQbEYx/oukWMFhAWHPztHArOSSWcliSSSf8ARL9nx4C8H+L3E3H+eeIPDuF4l4Y4YyXLctwuX4+WKpYWWf57jZYmji4SwtbD1KtXA5fk+NpSp+1dOnHMqc6lNylQlH8B8e+O834RyvIcHw/mFTLs0zTHYnEVMRRjSnVjgMvoRhUpONanVhGOIxOOoTjLlUm8JNRklzp/n7/w7R+F/wD0Ub4kf99eFv8A5n6/N/8Aac+FFj+z98ZIvhnBqN/qGk614T0nxX4R1fV3tDe6tFNc3+ma3p90bO3tLWK907U9PZ7aNIE8+xvLb70wJf8ApCr8h/8Agrd8Pjf+AfhZ8VLSGJZ/B/i278JavcorLd/2T41tI5dObzFGfJtPEOhWEceXBil1IvGMu5H9ifSo+iB4N5Z4KcU594fcB5bwxxHw7PLs4p5hldTMqmIll9HGUsLmlGpTxWNxFGph6eBxVXHVoOClJYJKFSlO1SP5D4X+LvGOK4zyzAcQZ5XzPLsxjiMG8PiYYWEFiZ0ZVMLOEqNCnONWdejDDwfM1+/1jJaP8x6K4Xwp4r/tPy9M1SQDU1G22uWwqamqjhHPCpqCgHjhbsDcuJQwPdV/hvmOXYrK8VPCYunyVIaxkrunWpttRrUZNLnpzs7OylGSlCcYVIThH+1cPiKWKpRrUZc0Xo09JQkt4TWtpK+q1TTUotxcZMooorhNwooooAKKKKACq15/x53f/XtP/wCimqzVa8/487v/AK9p/wD0U1XT/iU/8cf/AEpCez9H+QWf/Hnaf9e0H/opas1nWf8Ax52n/XtB/wCilqzSn8cv8UvzY42stXsunl6liiq9FSPTu/u/4J9X/sWeCf8AhNv2jfA4mglm0/wdHqfju/aMHbDJoduttojTNghVPiDUtMkUNjeYCFII4/oJr8r/APgmb4JEel/E74lXEDeZqOp6Z4I0i4OQrWejW/8AbGsbB0fzL/VrGF3HAewMf3lYD9TmZUVndlREUszMQqqqjLMzHACqASSSAAMmv+hT9nrwH/qd9HXKM4xFFUsfx9neb8WV3ONq0cFGpDJMqpSl/wA+ZYPKFmFCN3GKzGc9JVJpfwN9IHPP7W8QsTgqc3PD5BgMFlULP3XXnGWYYuVk3apGvjXhqnW+Gin8KOZ8MeMdA8Yf8JD/AGBei9/4RbxRq3g7Wtox9l1/RPs/9pWR5OWtzdQgk7SS3TGCfH/2s/hw/wAWP2cvi74JtoY5tUvvB2o6loIkjDlfEPh0J4h0IxEqzRSvqel20KyphlErc7SwPyN/wTW+LH/CyJ/2qvMlXffftAeIPiRYwMVEn9j/ABBEsVlKqDpF/wAUw0fykojDHG4Fv1AIBBBAIIwQRkEHqCD1Br+jOD88y3xr8Jfr+JWHqZXxtlPEuS4tYW1Si8LPGZtw9ieRTlNc3s6E21KTtUuuh+dZxgcTwXxZ9XpuaxWS4vLMbSc/iVVUcJmNO7SWilUitFsfxZW8wuIILhN6CaOKePqkib1WRDkYKSISDkEFWHHIr2Pwr4tGohNN1WVE1JFxb3TkImpIi/dkY4VL9FXLZIW6UFlxKGDH7QPw9f4UfHT4t/D3yDb2nh7x1rT6NGQFB8N69KviTw2yKOFjXRNYsoFVflUwsikha8V1MkadfsCVZbO6ZWBIZWWF2VlI5DKwDKw5BAI5Ff8APXxlwjKljs34bzin7DM8izPMMrrVIxvVwmYZdiquCxUUnZyp+3w8oVqMuVTjFfw6sKdSn/fWTZqpU8HmGElz4TH0MNiYRv7tbDYmnCtSldXSl7OopQmtYtu6cXKMvteH4cfEm4hiuLb4bfEK5t540mguLfwT4lnt54ZVDxTQTRaY0c0MqMrxSxsySIyujFSDVXUvA3jrRbOXUtb8C+NdF023MYuNS1jwpr2mafbmaVIYRPe3thBbQmaaSOGLzJV8yaSOJMu6qf6RfhFJJL8J/hhLK7SSy/DzwVJJI5LPJI/hvTGd2Y8lmYlmJ5JJNZ3xv+GNv8ZvhJ8QPhdc6g+kf8Jp4bvdItNZiRpZdF1Rgtxo+tRRLJEZpdH1WCy1KKHzEWWS1WN2CsTX951v2YWS1+Equb5P4nZ3is9rcOzzLK8tr8P5dSweJzaplv1rBYGtiP7SjOnhq2MdOhUr2UoUpupZONj8Qp/SXxEM2hhMZwzhKOBjmMcNisVDMcROtSwkcSqVfEQpfVbTqQoqdSNO9pSXLfVW/nk8B/Cb4m/FFrz/AIV54G1/xZDp0ogv77T4IINLs7ll3i1n1bUbiy00Xez5jaJdPcopDPCqspOT4x8C+NPh5q40Dx34X1fwprL263kNhrECRPdWTSyQLfWU0Ms9re2bTwzQC5tZ5ovOhliZhIjKP6VfAHgbw78NfB3h/wAD+FbKOx0Tw7p0FhaoiIsty8a5utQvXRV+0ajqV0Zr7UbtwZbq9uJp5CXkJr8Qf+Cqer3mjftDfC66tGyD8IZkuLWRmFvdw/8ACaaqTFKBna4I3QzqN8L4IypZT+Z+Nf0Csl8IPAyPHFTjHN828QMHXyShmmCjSwNLhWeJzSvCjisHgIvDLM4xwk6jpYfMMRjHHF+yVapgcJGs6dD6Tgzx1xPF3GzyOGTYXCZBVp46phcTKdeebKnhaUqlOtiLVvqn75R5qmHp0b0VL2ccRXlT9pV+PaKyNM1O01e0S9snLRk7JYnwJrWcDLW9wo+669VYfJKmJIyVJAv1/mhVpVaFWpRrU5UqtKThUpzXLOE47xkujX47rQ/o2EoTjGcJ80JJSjKNmmmrppqRYqtef8ed3/17T/8AopqWq15/x53f/XtP/wCimpU/4lP/ABx/9KQ3az1ez6eXqFn/AMedp/17Qf8Aopas1Ws/+PO0/wCvaD/0UtWaU/jl/il+bEtl6L8gprusaPI5wkas7n0VQWY/gATTq7X4aeD3+IXxH8BeBFEmzxZ4u0PR7to1LNHpct5HPrM3AYqsOjwX0rNg7QhbtXo5LlWNz7OMqyPLaLxGYZxmWCyvA0FdOtjMfiaWFw1JNKTTnWqwjdRbV9nsY4nE0cFhsRjMTP2eGwlCtisRU/590MPTlWrT/wC3KcJS+R++/wCyX4GPw+/Z7+GeizQGDUdQ0GPxTrCsCJP7U8WSyeILlJVIBWS2XUIrMoQGjW2VGyyknof2kPGh+HnwC+MfjRJDFcaB8OfFl3YyAgFNTk0e6tdKIzwT/aNxa8dW+6OSK9oiijgijhhRY4oUSKKNFCpHHGoRERRwqqoCqBwAABXmvxi+E3hf44fDzXfhj40m1uHwx4kOnDVl8P6pJo2o3EOmanZ6tDbC+ijldLaa6sYFu4guLi33wMdjtX/VDQ4RxXC/hRT4F4P9isdkPAK4W4bnWqPCUHjsvyD+y8rr16yhVlRjPE06NavW5Ks43nUaqT3/AMwJ5vSzTiyWe5z7T6vj+IP7VzNU4+1qKhiMw+tYuFKDlBTlGlOcKcHKEXaMbxW34X/8EnfFH/COfH3xL4LlkJh8afCyXyQWPzan4K1ewu4WI6OX0/WtWZj97MYI431/Q7XxJ8I/2AfgL8EviHoPxP8AA0vxBh8T+HY9VhsTqvjO61TTZrfWdMudKv7e9sJrVY7mGS2uWdFLKY7mK3nUh4Vr7br89+jH4dcZeFfhjDgvjWWWzx2X59muIy15VjZY7DLKswWFxcYyqTw2FlCssxq5k5U/ZySjKE1N87hD3/EviHJ+KeJXnOS/WvY4jAYWnivrdCOHqfW8O6tFtQjWrJw+rQwyUuZXkpLl0u/5/v8Agq78PD4f+NXgT4k2tqsVj8RfBU2h6hcKwzP4k8C3o2mRAAVebw9r2nxI7E+ZHpbKpxDhfyq1P/kG6h/143f/AKTyV/R7/wAFQfh9/wAJd+zNd+K7a2hk1L4V+K9C8Yi4Yf6RDoV1LJ4a8SJAe6fYNaS+uI+Ny6aj5zGAf5wtU/5Buo/9eN3/AOk8lf5h/TI4O/1S8duJMRSpOngeLsLl/FuD91pOpmFKWDzR83wylPOsvzGu0rOMa8FJN+/P+lfCDN/7V4JyqMpc1bKq1bKK2t3bDTjWwul21GOBxOFpq+7pytoj+xD4Pf8AJJPhb/2TnwR/6jOmV6NXnPwe/wCSSfC3/snPgj/1GdMr0av9qOG/+SdyD/sS5X/6g0D+Ncx/5GGO/wCwzE/+npn5d/tIf8FMfDPwe8f6x8Nfh/4Db4k614Vuzp3i7W7vxCvh7w3pWtRBWu/D9hLDpmr3usanp29YtWljgtbHTr0PYGe5u4bmK2/KT9rf9pO0/ak8aeCfHMPhC+8E3nh3wTP4U1XSLvVbXWrea7bXrvVo73TNRtreyeW0eG52Ol5Y2dxFKNgSVB5rfMmrXE93rfiK7uZXnubvxN4mu7maQlpJrm61/Ubi4mdjks8s0jyOSSSzEmqNf4b+LH0lPE/xTXEOR53m9CnwdmWaQxOD4YoZXlVOjltLL8Z7fLo08xjglm1avSUIrEVa+PqRxE5VG6cIeyp0v7Y4X8O+GeF3gMbgcHOWb4bCypVczqYrFSqYmdeh7PEynh3WeEhCpeTpwp0IuklFKcpc8p6ekatd6LeC7tCG3AJc2zkiC8gBz5UuPuuvWCcDfC+CMoWU+36bqVpq1ol7ZOWjY7JI3wJraYDLW9wg+7IvVWHySpiSMlScfPtaek6td6NeLd2hDbgEubZyRDeQA58qXH3XXkwTgb4X5GULKf5Q4k4bpZxSeIw6jSzGlG0Jv3YYmEdqNZ7KVtKVV/B8E702nD9Ry3MpYOSp1G5Yab1WrdJtq84K+388OvxR974vfarXn/Hnd/8AXtP/AOimqLTdStNWtEvbJy0THZJG+BNbTAZe3uFH3ZF6hh8kqYkjJU8S3n/Hnd/9e0//AKKavx90qtDE+xrU5UqtKqoVKc1yzhOMleMl0a/HdaH2CnGdNThJShKPNGUXdNNXTTQlmR9jteR/x7Qf+ilqzuHqPzrPszm0tT/07Qf+ilqzROC55av4pfn/AMP/AFvUdl6L8ifcPUfnX3n/AME7fBY8RfHPUvFs6SG0+HnhC9uoJFTdD/bfiqU6JZo7kbVcaRHr7oAd+dpA27iPgWv23/4JweCf7C+C+teM54pI7z4g+L9QuYXcYV9E8MD/AIR/TjHxlka/g1q4DZKn7R8oGCW/rv6C/AP+vH0keCJVqXtsBwd9d45x9483s3kFODyirbZcvEWKyf3n8N7r31G/5R4255/YfhznrhPkxGbqhkWG1tzPMZv63Du+bLKOP/Dbc/QmvnX4zftW/Av4Aa5ovhv4qeMJfD2s+INJuNb0uzg8P+ItaM2mW14LCS5kl0XS7+G3Bui0UcdxJHLKY5WjRljZh9FV/NL/AMFJvFknif8Aa08V6eLr7TZeBvCfgzwlaIG3R2txLp83inVIUHRXNz4jjE46+ZFg/dFf7YfSZ8X838FvDinxRw/h8pxWeY/iHLMiy6hnVHE4nAOWJoY7HYqdTD4PG5fiKjhgcuxPs+TFU4xqyhKfNH3X/F/htwlhOMuIZ5ZmFTFUsFh8uxOOxE8HUp0q9qdShh6UYVK1DEU1eviaTknSbcFJRadmv1tl/wCClH7HcEUk0vxPvVjhjeWRv+EE8ettSNSzHavhsscKCcKCT2BNfb2lapYa3pem61pVwl5pmr2Fnqmm3cYdY7qwv7eO7s7lFkVHCT28scqh0VwGAZVOQP4w5EWVHjcZSRGRh6q4KsPxBNf1T/sT+MZvHX7KvwQ1y6kSS9g8E2Xhu+KNuIu/B09z4Tl8zkkSv/YolcNzmTPIIJ/IPoq/Sc4x8auKeJeGeM8Dwxg6+XZBTzzKnw9gMywM6tOhmGHwGYxxKzDOc29qoSzDAOl7JUXDmnzud1y/WeJ/htlHB2V5dmWT1syrQr4+WBxax9fDV1GVTDzr4d0lQweFcW/q+IU3JzT9xJJpuXuXxF8G2HxE8A+NPAeqRwyWHjHwtrvhq5FxGJIkTWdMubATMpVvmt3nWeNgC6SRo6YdVI/jf1rT9Q0i213RtWRotW0T+2dD1aNxho9V0aS70vUkPTOy+tJ1Bx8wAYda/tSr+WX/AIKC/D0/Dj9pr4wWkNuYNK8ZwW/xK0fCLHFJH4s06X+2/JVeAF8V6dr7SY6tIJCAZMD439oRwd9a4c4E48oUr1MozXG8M5hUhFOTwuc4f+0MvnVfK5RpYbFZVi6UHzxiquYqLUpThy+14AZv7PMs6yKpL3cVh8NmeHTeiq4OssNiIwXWdWli6U3a75MLfZNn9Knwe/5JJ8Lf+yc+CP8A1GdMr0avOfg9/wAkk+Fv/ZOfBH/qM6ZXo1f37w3/AMk7kH/Ylyv/ANQaB+C5j/yMMd/2GYn/ANPTP4v73/kJ6z/2Hte/9PN9VerF7/yE9Z/7D2vf+nm+qvX/ADb4j/eK/wD1+q/+lyP9EofBH/DH8kFFFFYlGnpOrXmjXYu7Rg2QEubZyRBeQg5MUuPuuvWCcDfC+CMqWU+yxanZ6tpE97ZOWja3nSSJ8Ce2nELFre4UfdkXnaw+SVcSRkg4Hg9W7TVrvRjcXVqwIa2lS5t3J8m7gEbZjlAyQ6/egmUb4nwRlSVr5jiDhylm6jiKCjSzGly8k9o4iEWrUaz/AJklalVesPgl+7acPUy7Mp4NulUvPDTbvHVulJ7zguz+3D7Wso+9pL3Sz/487T/r2g/9FLVmq1n/AMedp/17Qf8Aopas1+QT+OX+KX5s+zWy9F+QV7bZ/tpftQfCvwroXhnwJ4k8H2fgnw3p1rpGm2E/gHTb280q2t12Iby8a7je9W4fdLNqEkayyXUsrXXzSbz4lSEAhlZVZWVkdHUMjoww6OjZV0cEhlIwRX3PAHiVxp4ZZrXzfgviLOOHcVjsMsBmNTJ8wxGW1sbgPbU67wtSvhpwqcirUqdaGriqtOEpRnFOEvEz7h3KOJcJDB5xgMJj6VGr9Yw8cZhqWJp0cQoSpqrGnWjKHNyTnBuylyTkoyi2mvZP+HlP7YH/AEOfgj/w3Ol//J1fG/jHxbr3j7xd4m8deKrqK+8T+L9YuNe1+8t7ZbO2uNSuljjka2so2eOzt0ihhigto2ZYo41UMetXfE3hk6WXv7BWbTHb97Fks+mu5wFP8T2TscQynJh4il4CuePr93znxX438R8swceJONuJOKMuw9d4nDYTO84xuYU8HjPZulUl7DE16sKOKhTqSpykld053hOVKpGU/gsLwvk/DuJrf2fkuW5ZiKlNUqlXA4KhhpV6POpxXtKVOEqlJzipJN2542klODSK+oPhL+2V+0L8DvBtv4A+G/ifw9p/hW01HVNUtbLWfCVjrt1Bd6zdvf6iI764uYZfs8t5LNPFAVIgMrqjFcAfL9FcvDXFfE3B2YSzbhTPs24czOeGqYOePybHYjL8XPCVp0qlXDSr4apTqSoVKlGjOdJtwlOlTk1zQi1eYZZl2bYdYXNMDhMwwyqRrLD4zD08TRVWClGFRU6sZRVSMZzjGaXMlOSTtJ3+6/8Ah5T+2B/0Ofgj/wANzpf/AMnV84/Gz46fEj9ojVtJ134sXuhatq+iaNeeH7C90Pw/a+HZTo99ci8ms7w2s05vBDc+ZNZPIR9ja6vfLB+1SV5FRX0XEHix4m8WZZWyXibj3izP8or1KNWtlubZ5j8dgqtTD1Y1qFSeHxFedOU6VWEalOTjeMldM4cBwxw5lWJhjcsyPKsBi6anGGJwmAw2HrxjUi4TjGrSpxmlOLcZK9pJtPQ+2NF/4KI/tY+HtG0nQNK8X+DIdL0PTLDR9Nil+H2mTyxWGmWsVlZxyzG9UzSJbwRq8pVTIwLlRnFaf/Dyn9sD/oc/BH/hudL/APk6vhSivWpeO/jRQpUqFHxT48pUaNOFKlShxNmsYU6dOKhThCKxNoxhFKMUtEkkjklwTwfOUpz4YyGU5ycpSllWDblKTvKTbo3bbbbfVj5HaWaed8GW5ubm7mIG1Wnu55LmdlUcIrTSuVQcIpCDhRTKKK/KG222222223dtt6ttvdt7s+nCiiikAVXu/wDj1uf+veb/ANFtViq93/x63P8A17zf+i2qofHH/FH80B9DWZH2O15H/HtB/wCilqzuHqPzqhaf8ett/wBe8P8A6LWrFfzvP45f4pfmz9Hi7xi+6X5E+4eo/OjcPUfnUFFSMnJUghtjKysjK4DI6MMMjqeHRwcMp4IryfxL4a/ssvqGnqX0tmHmxAl3012PCsSSWsnbiGU5MJIhlONjH1Gl4wQyq6spR0dQySIwwyOjZVkYcMpBBFevk+cYnJ8T7aj79Gdo4nDSbUK8E+9nyVYXbpVUm4NtNTpyqU58eNwVLG0uSfuzjd06qV5Ql+sZWSnG+q1TUlGS+fqK6/xL4aOmFtQ09WfS3b97Fyz6bI7cIerNZMTiKU8wnEUpxsauQr9lwGPw2ZYani8LPnpT0aek6c0k5UqsbvkqQurq7TTjODlCUZS+JxGHq4arKlWjyyjr3jKL2lF9Yvo+jTTSkmkUUUV2GIUUUUAFFFFABRRRQAVXu/8Aj1uf+veb/wBFtViq93/x63P/AF7zf+i2qofHH/FH80B9AWn/AB623/XvD/6LWrFULW6tRbW4N1bHEEIytxCwOI1HDK5Vh6MpII5BIqf7Xa/8/Nv/AN/o/wD4qv56nCfPL3J/E/svv6ea+8/RYSXLHVfDHquy/wA0WKKr/a7X/n5t/wDv9H/8VR9rtf8An5t/+/0f/wAVU8k/5J/+Av8Ay8195XNH+Zfev66r7yxRVf7Xa/8APzb/APf6P/4qj7Xa/wDPzb/9/o//AIqjkn/JP/wF/wCXmvvDmj/MvvX9dV95ZzwQQrKysjo4DI6MMMjqeGRgSGU8EV5Z4l8N/wBmFr/T1ZtLZv3sPLPprtjCsTy9m7HEUpyYSRFKcFGr0r7Xa/8APzb/APf6P/4qj7XaEMrXFq6spV0eWJkdGGGR1LEMrDhlIIIr1smzXGZPiVWoxnOjPljicO1JQr00+9nyVYXbpVUm4NtNSpznCfFjcJQxtLkm4xmrunUVnKEnb/wKL0Uo3SkrbSUZR8HorpvEmjW2ms19YTwvpzsPMhE0bSWEjE/Kfmy1mx4ikPMJxHIcbWrkftdr/wA/Nv8A9/o//iq/ZcDjKOY4anisK5Tp1FqnG06c1bmpVY68tSF1dXaacZQcoSjKXxdehUw1WVGqkpR1TTvGcX8M4P7UZdHve8WlJNKxRVf7Xa/8/Nv/AN/o/wD4qj7Xa/8APzb/APf6P/4quzll/LL7n/XVfeY3/r+vVfeWKKr/AGu1/wCfm3/7/R//ABVH2u1/5+bf/v8AR/8AxVHLL+WX3P8ArqvvC/8AX9eq+8sUVX+12v8Az82//f6P/wCKo+12v/Pzb/8Af6P/AOKo5Zfyy+5/11X3hf8Ar+vVfeWKr3f/AB63P/XvN/6Laj7Xa/8APzb/APf6P/4qoLq6tWtrhRc22WglAzPCoyY2AyzOFUepJAHUkCnCMuaPuv4o9H3X+aFdd1/X/Do//9k=)";

            _export('DefaultUIService', DefaultUIService = function () {
                function DefaultUIService(sessionService, viewportService, realityService, realityServiceProvider, viewServiceProvider) {
                    var _this = this;

                    _classCallCheck(this, DefaultUIService);

                    this.sessionService = sessionService;
                    this.viewportService = viewportService;
                    this.realityService = realityService;
                    this.realityServiceProvider = realityServiceProvider;
                    this.viewServiceProvider = viewServiceProvider;
                    this.realityViewerItemElements = new Map();
                    this.menuItems = [];
                    this.menuOpen = false;
                    var config = this.sessionService.configuration.defaultUI || {};
                    if (document && !config.disable) {
                        (function () {
                            var style = document.createElement("style");
                            style.type = 'text/css';
                            document.head.insertBefore(style, document.head.firstChild);
                            var sheet = style.sheet;
                            sheet.insertRule("\n                .argon-ui {\n                    -webkit-tap-highlight-color: transparent;\n                    -webkit-user-select: none;\n                }\n            ", sheet.cssRules.length);
                            sheet.insertRule("\n                .argon-ui-button {\n                    background-image: " + argonAppIcon + ";\n                    width: 144px;\n                    height: 144px;\n                }\n            ", sheet.cssRules.length);
                            sheet.insertRule("\n                .argon-ui-blur {\n                    background-color: rgba(238, 178, 17, 0.7);\n                    -webkit-backdrop-filter: blur(5px);\n                }\n            ", sheet.cssRules.length);
                            sheet.insertRule("\n                .argon-ui-box {\n                    webkit-user-select: none;\n                    ms-user-select: none;\n                    user-select: none;\n                }\n            ", sheet.cssRules.length);
                            sheet.insertRule("\n                .argon-ui-list-item {\n                    align-items: center;\n                    background: white;\n                    border-top: 1px solid lightgrey;\n                    display: flex;\n                    height: 20px;\n                    justify-content: space-between;\n                    padding: 20px;\n                    width: 100%;\n                    cursor: pointer;\n                    font-family: 'Sans-serif';\n                    font-size: 12px;\n                    color: #5F5F5F;\n                    box-sizing: border-box;\n                }\n            ", sheet.cssRules.length);
                            sheet.insertRule("\n                .argon-ui-list-item:hover {\n                    background: rgb(240,240,240);\n                }\n            ", sheet.cssRules.length);
                            _this.element = document.createElement('div');
                            _this.element.className = 'argon-ui';
                            _this.element.style.position = 'absolute';
                            _this.element.style.bottom = '0';
                            _this.element.style.right = '0';
                            _this.element.style['userSelect'] = 'none';
                            _this.element.style.webkitUserSelect = 'none';
                            _this.element.style.zIndex = '10';
                            _this.viewportService.rootElement.appendChild(_this.element);
                            _this.sessionService.manager.closeEvent.addEventListener(function () {
                                _this.element.remove();
                            });
                            var realityViewerOverlayElement = document.createElement('div');
                            realityViewerOverlayElement.className = 'argon-overlay';
                            realityViewerOverlayElement.style.width = '100%';
                            realityViewerOverlayElement.style.height = '100%';
                            realityViewerOverlayElement.style.display = 'flex';
                            realityViewerOverlayElement.style.alignItems = 'center';
                            realityViewerOverlayElement.addEventListener('click', function (e) {
                                if (e.target === realityViewerOverlayElement) {
                                    realityViewerOverlayElement.remove();
                                    e.stopPropagation();
                                }
                            });
                            // realityViewerOverlayElement.addEventListener('touchend', (e)=> {
                            //     if (e.target === realityViewerOverlayElement) {
                            //         e.preventDefault();
                            //         e.stopPropagation();
                            //         realityViewerOverlayElement.remove();
                            //     }
                            // });
                            _this.realityViewerSelectorElement = document.createElement('div');
                            _this.realityViewerSelectorElement.classList.add('argon-ui-box');
                            _this.realityViewerSelectorElement.classList.add('argon-ui-blur');
                            _this.realityViewerSelectorElement.style.maxWidth = '300px';
                            _this.realityViewerSelectorElement.style.maxHeight = '70%';
                            _this.realityViewerSelectorElement.style.width = '70%';
                            _this.realityViewerSelectorElement.style.margin = 'auto';
                            _this.realityViewerSelectorElement.style.padding = '20px';
                            _this.realityViewerSelectorElement.style.boxShadow = 'rgb(102,102,102) 0 5px 20px';
                            realityViewerOverlayElement.appendChild(_this.realityViewerSelectorElement);
                            var realitySelectorPrompt = document.createElement('h2');
                            realitySelectorPrompt.innerText = 'Select a Reality';
                            realitySelectorPrompt.style.fontFamily = 'Sans-Serif';
                            realitySelectorPrompt.style.color = 'white';
                            realitySelectorPrompt.style.marginTop = '0';
                            realitySelectorPrompt.style.flex = '0 1 auto';
                            _this.realityViewerSelectorElement.appendChild(realitySelectorPrompt);
                            _this.realityViewerListElement = document.createElement('div');
                            _this.realityViewerListElement.style.flex = '1 1 auto';
                            _this.realityViewerListElement.style.maxHeight = '250px';
                            _this.realityViewerListElement.style.overflowY = 'auto';
                            _this.realityViewerSelectorElement.appendChild(_this.realityViewerListElement);
                            _this.realityServiceProvider.installedEvent.addEventListener(function (_ref) {
                                var viewer = _ref.viewer;

                                var uri = viewer.uri;
                                var e = document.createElement('div');
                                e.innerText = uri;
                                viewer.connectEvent.addEventListener(function (session) {
                                    e.innerText = session.info.title || uri;
                                });
                                e.className = 'argon-ui-list-item';
                                _this.realityViewerItemElements.set(uri, e);
                                _this.realityViewerListElement.appendChild(e);
                                e.addEventListener('click', function () {
                                    _this.realityService.request(uri);
                                    realityViewerOverlayElement.remove();
                                });
                            });
                            _this.realityServiceProvider.uninstalledEvent.addEventListener(function (_ref2) {
                                var viewer = _ref2.viewer;

                                var uri = viewer.uri;
                                var e = _this.realityViewerItemElements.get(uri);
                                _this.realityViewerItemElements.delete(uri);
                                e.remove();
                            });
                            _this.menuBackgroundElement = document.createElement('div');
                            _this.menuBackgroundElement.className = 'argon-ui-blur';
                            _this.menuBackgroundElement.style.position = 'absolute';
                            _this.menuBackgroundElement.style.bottom = '-150px';
                            _this.menuBackgroundElement.style.right = '-150px';
                            _this.menuBackgroundElement.style.width = '300px';
                            _this.menuBackgroundElement.style.height = '300px';
                            _this.menuBackgroundElement.style.transform = 'scale(0.1)';
                            _this.menuBackgroundElement.style.transition = 'transform 0.3s, opacity 0.3s';
                            _this.menuBackgroundElement.style.borderRadius = '150px';
                            _this.menuBackgroundElement.style.zIndex = '-2';
                            _this.element.appendChild(_this.menuBackgroundElement);
                            var menuButton = document.createElement('div');
                            _this.element.appendChild(menuButton);
                            menuButton.className = 'argon-ui-button';
                            menuButton.style.position = 'absolute';
                            menuButton.style.bottom = '0';
                            menuButton.style.right = '0';
                            menuButton.style.transform = 'scale(0.36)';
                            menuButton.style.transformOrigin = '110% 110%';
                            menuButton.style.borderRadius = '72px';
                            menuButton.style.cursor = 'pointer';
                            menuButton.style.pointerEvents = 'auto';
                            menuButton.style.zIndex = '-1';
                            _this.openInArgonMenuItem = _this._createMenuItem(openIcon, 'Open in Argon', function () {
                                _this.menuOpen = false;
                                _this.updateMenu();
                                openInArgonApp();
                            });
                            _this.hmdMenuItem = _this._createMenuItem(vrIcon, 'Toggle HMD', function () {
                                _this.menuOpen = false;
                                _this.updateMenu();
                                if (_this.viewServiceProvider.isPresentingHMD) {
                                    _this.viewServiceProvider.exitPresentHMD();
                                } else {
                                    if (isIOS) {
                                        _this.viewportService.requestPresentationMode(PresentationMode.IMMERSIVE).then(function () {
                                            return _this.viewServiceProvider.requestPresentHMD();
                                        });
                                    } else {
                                        _this.viewServiceProvider.requestPresentHMD();
                                    }
                                }
                            });
                            _this.realityMenuItem = _this._createMenuItem(eyeIcon, 'Select Reality Viewer...', function () {
                                _this.menuOpen = false;
                                _this.updateMenu();
                                realityViewerOverlayElement.style.backgroundColor = 'rgba(0,0,0,0.3)';
                                _this.element.appendChild(realityViewerOverlayElement);
                            });
                            _this.maximizeMenuItem = _this._createMenuItem(fullscreenIcon, 'Toggle Immersive View', function () {
                                _this.menuOpen = false;
                                _this.updateMenu();
                                if (_this.viewportService.presentationMode === PresentationMode.IMMERSIVE) {
                                    _this.viewportService.requestPresentationMode(PresentationMode.PAGE);
                                } else {
                                    _this.viewportService.requestPresentationMode(PresentationMode.IMMERSIVE);
                                }
                            });
                            _this.onSelect(menuButton, _this.toggleMenu.bind(_this));
                            _this.updateMenu();
                            _this.viewportService.changeEvent.addEventListener(function () {
                                _this.updateMenu();
                            });
                        })();
                    }
                }

                _createClass(DefaultUIService, [{
                    key: "_createMenuItem",
                    value: function _createMenuItem(icon, hint, onSelect) {
                        var menuItem = document.createElement('div');
                        menuItem.style.position = 'absolute';
                        menuItem.style.bottom = '-20px';
                        menuItem.style.right = '-20px';
                        menuItem.style.textAlign = 'left';
                        menuItem.style.width = '40px';
                        menuItem.style.height = '40px';
                        menuItem.style.fontFamily = 'Arial Black';
                        menuItem.style.color = 'black';
                        menuItem.style.cursor = 'default';
                        menuItem.style.textShadow = '-1px -1px 0px #545454, 1px -1px 0px #545454, -1px 1px 0px #545454, 1px 1px 0px #545454';
                        menuItem.style.transition = 'transform 0.3s ease 0.1s, opacity 0.3s ease 0.1s';
                        menuItem.style.opacity = '0';
                        menuItem.style.pointerEvents = 'none';
                        menuItem.style.transformOrigin = '50% 50%';
                        menuItem.style.backgroundImage = icon;
                        menuItem.style.backgroundSize = '100% 100%';
                        menuItem.style.backgroundRepeat = 'no-repeat';
                        menuItem.style.zIndex = '2';
                        menuItem.style.cursor = 'pointer';
                        this.element.appendChild(menuItem);
                        menuItem.title = hint;
                        if (onSelect) this.onSelect(menuItem, onSelect);
                        menuItem.addEventListener('mouseenter', function () {
                            menuItem.style.color = '#eeb211';
                        });
                        menuItem.addEventListener('mouseleave', function () {
                            menuItem.style.color = 'white';
                        });
                        return menuItem;
                    }
                }, {
                    key: "onSelect",
                    value: function onSelect(element, cb) {
                        element.addEventListener('touchend', function (ev) {
                            ev.preventDefault();
                            ev.stopPropagation();
                            cb();
                        });
                        element.addEventListener('click', function (ev) {
                            ev.stopPropagation();
                            cb();
                        });
                    }
                }, {
                    key: "toggleMenu",
                    value: function toggleMenu() {
                        if (this.menuOpen) {
                            this.menuOpen = false;
                        } else {
                            this.menuOpen = true;
                        }
                        this.updateMenu();
                    }
                }, {
                    key: "updateMenu",
                    value: function updateMenu() {
                        var _this2 = this;

                        if (this.viewServiceProvider.isPresentingHMD) {
                            this.element.style.display = 'none';
                        } else {
                            this.element.style.display = 'block';
                        }
                        this.menuItems = [];
                        this.menuItems.push(null);
                        if (isIOS) this.menuItems.push(this.openInArgonMenuItem);
                        var parentElement = this.viewportService.rootElement.parentElement;
                        var parentWidth = parentElement ? parentElement.clientWidth : 0;
                        var parentHeight = parentElement ? parentElement.clientHeight : 0;
                        if (!(window.innerWidth === parentWidth && window.innerHeight === parentHeight)) this.menuItems.push(this.maximizeMenuItem);
                        if (isIOS || navigator['vrEnabled']) this.menuItems.push(this.hmdMenuItem);
                        if (this.realityViewerItemElements.size > 0) this.menuItems.push(this.realityMenuItem);
                        this.menuItems.push(null);
                        if (!this.menuOpen) {
                            this.menuItems.forEach(function (e, i) {
                                if (!e) return;
                                e.style.transform = 'scale(0.2)';
                                e.style.opacity = '0';
                                e.style.pointerEvents = 'none';
                            });
                            this.menuBackgroundElement.style.transform = 'scale(0.1)';
                        } else {
                            (function () {
                                var length = _this2.menuItems.length;
                                _this2.menuItems.forEach(function (e, i) {
                                    if (!e) return;
                                    var angle = i / (length - 1) * (Math.PI / 2 + Math.PI / 8) - Math.PI / 16;
                                    var d = 100;
                                    var x = d * Math.cos(angle);
                                    var y = d * Math.sin(angle);
                                    e.style.transform = "translateX(" + -x + "px) translateY(" + -y + "px) scale(0.8)";
                                    e.style.opacity = '1';
                                    e.style.pointerEvents = 'auto';
                                });
                                _this2.menuBackgroundElement.style.transform = 'scale(1)';
                            })();
                        }
                    }
                }]);

                return DefaultUIService;
            }());

            _export('DefaultUIService', DefaultUIService = __decorate$2([autoinject(), __metadata$2("design:paramtypes", [typeof (_a$2 = typeof SessionService !== "undefined" && SessionService) === "function" && _a$2 || Object, typeof (_b$2 = typeof ViewportService !== "undefined" && ViewportService) === "function" && _b$2 || Object, typeof (_c$1 = typeof RealityService !== "undefined" && RealityService) === "function" && _c$1 || Object, typeof (_d$1 = typeof RealityServiceProvider !== "undefined" && RealityServiceProvider) === "function" && _d$1 || Object, typeof (_e$1 = typeof ViewServiceProvider !== "undefined" && ViewServiceProvider) === "function" && _e$1 || Object])], DefaultUIService));

            __decorate$13 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata$13 = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            _export('VuforiaServiceProvider', VuforiaServiceProvider = function VuforiaServiceProvider(sessionService) {
                _classCallCheck(this, VuforiaServiceProvider);

                if (sessionService.isRealityManager) {
                    sessionService.connectEvent.addEventListener(function (session) {
                        session.on['ar.vuforia.isAvailable'] = function () {
                            return Promise.resolve({ available: false });
                        };
                    });
                    sessionService.connectEvent.addEventListener(function (session) {
                        session.on['ar.vuforia.init'] = function () {
                            return Promise.reject(new Error("Vuforia is not supported on this system"));
                        };
                    });
                }
            });

            _export('VuforiaServiceProvider', VuforiaServiceProvider = __decorate$13([inject(SessionService), __metadata$13("design:paramtypes", [typeof (_a$13 = typeof SessionService !== "undefined" && SessionService) === "function" && _a$13 || Object])], VuforiaServiceProvider));
            /**
             * A service for interacting with the Vuforia API
             */

            _export('VuforiaService', VuforiaService = function () {
                function VuforiaService(sessionService) {
                    _classCallCheck(this, VuforiaService);

                    this.sessionService = sessionService;
                }
                /**
                 * Resolves to a boolean indicating whether or not the Vuforia API is available on this system
                 */

                _createClass(VuforiaService, [{
                    key: "isAvailable",
                    value: function isAvailable() {
                        return this.sessionService.manager.request('ar.vuforia.isAvailable').then(function (message) {
                            return message.available;
                        });
                    }
                    /**
                     * Initialize vuforia using an encrypted license.
                     * You can get a vuforia license key from https://developer.vuforia.com/
                     * You can encrypt your vuforia license with the tool at http://docs.argonjs.io/start/vuforia-pgp-encryptor
                     */

                }, {
                    key: "init",
                    value: function init(options) {
                        var _this = this;

                        if (typeof options === 'string') options = { encryptedLicenseData: options };
                        if (!options.encryptedLicenseData || typeof options.encryptedLicenseData !== 'string') throw new Error('options.encryptedLicenseData is required.');
                        return this.sessionService.manager.request('ar.vuforia.init', options).then(function () {
                            return new VuforiaAPI(_this.sessionService.manager);
                        });
                    }
                    /**
                     * Initialize vuforia with an unecrypted key.
                     * It's a bad idea to publish your unencrypted vuforia key on the internet.
                     */

                }, {
                    key: "initWithUnencryptedKey",
                    value: function initWithUnencryptedKey(options) {
                        var _this2 = this;

                        if (typeof options === 'string') options = { key: options };
                        return this.sessionService.manager.request('ar.vuforia.init', options).then(function () {
                            return new VuforiaAPI(_this2.sessionService.manager);
                        });
                    }
                }]);

                return VuforiaService;
            }());

            _export('VuforiaService', VuforiaService = __decorate$13([inject(SessionService, VuforiaServiceProvider), __metadata$13("design:paramtypes", [typeof (_b$13 = typeof SessionService !== "undefined" && SessionService) === "function" && _b$13 || Object])], VuforiaService));

            _export('VuforiaAPI', VuforiaAPI = function VuforiaAPI(manager) {
                _classCallCheck(this, VuforiaAPI);

                this.objectTracker = new VuforiaObjectTracker(manager);
            });

            _export('VuforiaTracker', VuforiaTracker = function VuforiaTracker() {
                _classCallCheck(this, VuforiaTracker);
            });

            _export('VuforiaObjectTracker', VuforiaObjectTracker = function (_VuforiaTracker) {
                _inherits(VuforiaObjectTracker, _VuforiaTracker);

                function VuforiaObjectTracker(managerSession) {
                    _classCallCheck(this, VuforiaObjectTracker);

                    var _this3 = _possibleConstructorReturn(this, (VuforiaObjectTracker.__proto__ || Object.getPrototypeOf(VuforiaObjectTracker)).call(this));

                    _this3.managerSession = managerSession;
                    _this3.dataSetLoadEvent = new Event();
                    _this3.dataSetUnloadEvent = new Event();
                    _this3.dataSetActivateEvent = new Event();
                    _this3.dataSetDeactivateEvent = new Event();
                    _this3._deprecatedDataSetInstanceMap = new Map();
                    managerSession.on['ar.vuforia.objectTrackerLoadDataSetEvent'] = function (message) {
                        _this3.dataSetLoadEvent.raiseEvent(message);
                    };
                    managerSession.on['ar.vuforia.objectTrackerUnloadDataSetEvent'] = function (message) {
                        _this3.dataSetUnloadEvent.raiseEvent(message);
                    };
                    managerSession.on['ar.vuforia.objectTrackerActivateDataSetEvent'] = function (message) {
                        var deprecatedDataSetInstance = _this3._deprecatedDataSetInstanceMap.get(message.id);
                        if (deprecatedDataSetInstance) {
                            deprecatedDataSetInstance._onActivate();
                            _this3.dataSetActivateEvent.raiseEvent(deprecatedDataSetInstance);
                        } else _this3.dataSetActivateEvent.raiseEvent(message);
                    };
                    managerSession.on['ar.vuforia.objectTrackerDeactivateDataSetEvent'] = function (message) {
                        var deprecatedDataSetInstance = _this3._deprecatedDataSetInstanceMap.get(message.id);
                        if (deprecatedDataSetInstance) {
                            deprecatedDataSetInstance._onDeactivate();
                            _this3.dataSetActivateEvent.raiseEvent(deprecatedDataSetInstance);
                        } else _this3.dataSetDeactivateEvent.raiseEvent(message);
                    };
                    return _this3;
                }
                /**
                 * Deprecated. Please use createDataSetFromURI instead.
                 * @deprecated To be removed.
                 */

                _createClass(VuforiaObjectTracker, [{
                    key: "createDataSet",
                    value: function createDataSet(url) {
                        var _this4 = this;

                        if (url && window.document) {
                            url = resolveURL(url);
                        }
                        return this.managerSession.request('ar.vuforia.objectTrackerCreateDataSet', { url: url }).then(function (message) {
                            var dataSet = new DeprecatedVuforiaDataSet(message.id, _this4.managerSession);
                            _this4._deprecatedDataSetInstanceMap.set(message.id, dataSet);
                            return dataSet;
                        });
                    }
                    /**
                     * Fetch a dataset from the provided url.
                     * If successfull, resolves to an id which represents the dataset.
                     */

                }, {
                    key: "createDataSetFromURI",
                    value: function createDataSetFromURI(uri) {
                        return this.managerSession.request('ar.vuforia.objectTrackerCreateDataSet', { uri: uri }).then(function (message) {
                            return message.id;
                        });
                    }
                    /**
                     * Load the dataset into memory, and return a promise which
                     * resolves to the contained trackables
                     */

                }, {
                    key: "loadDataSet",
                    value: function loadDataSet(id) {
                        return this.managerSession.request('ar.vuforia.objectTrackerLoadDataSet', { id: id });
                    }
                    /**
                     * Unload a dataset from memory (deactivating it if necessary)
                     */

                }, {
                    key: "unloadDataSet",
                    value: function unloadDataSet(id) {
                        return this.managerSession.request('ar.vuforia.objectTrackerUnloadDataSet', { id: id });
                    }
                    /**
                     * Load (if necesasry) and activate a dataset to enable tracking of the contained trackables
                     */

                }, {
                    key: "activateDataSet",
                    value: function activateDataSet(id) {
                        id = id instanceof DeprecatedVuforiaDataSet ? id.id : id; // backwards compatability
                        return this.managerSession.request('ar.vuforia.objectTrackerActivateDataSet', { id: id });
                    }
                    /**
                     * Deactivate a loaded dataset to disable tracking of the contained trackables
                     */

                }, {
                    key: "deactivateDataSet",
                    value: function deactivateDataSet(id) {
                        id = id instanceof DeprecatedVuforiaDataSet ? id.id : id; // backwards compatability
                        return this.managerSession.request('ar.vuforia.objectTrackerDeactivateDataSet', { id: id });
                    }
                }]);

                return VuforiaObjectTracker;
            }(VuforiaTracker));

            __decorate$13([deprecated$1('createDataSetFromURI'), __metadata$13("design:type", Function), __metadata$13("design:paramtypes", [String]), __metadata$13("design:returntype", Object)], VuforiaObjectTracker.prototype, "createDataSet", null);
            /**
             * @deprecated To be removed.
             */

            _export('DeprecatedVuforiaDataSet', DeprecatedVuforiaDataSet = function () {
                function DeprecatedVuforiaDataSet(id, managerSession) {
                    _classCallCheck(this, DeprecatedVuforiaDataSet);

                    this.id = id;
                    this.managerSession = managerSession;
                    this._isActive = false;
                }

                _createClass(DeprecatedVuforiaDataSet, [{
                    key: "_onActivate",
                    value: function _onActivate() {
                        this._isActive = true;
                    }
                }, {
                    key: "_onDeactivate",
                    value: function _onDeactivate() {
                        this._isActive = false;
                    }
                }, {
                    key: "fetch",
                    value: function fetch() {
                        return this.managerSession.request('ar.vuforia.dataSetFetch', { id: this.id });
                    }
                }, {
                    key: "load",
                    value: function load() {
                        var _this5 = this;

                        return this.managerSession.request('ar.vuforia.dataSetLoad', { id: this.id }).then(function (trackables) {
                            _this5._trackables = trackables;
                            return trackables;
                        });
                    }
                }, {
                    key: "isActive",
                    value: function isActive() {
                        return this._isActive;
                    }
                }, {
                    key: "getTrackables",
                    value: function getTrackables() {
                        return this._trackables;
                    }
                }]);

                return DeprecatedVuforiaDataSet;
            }());

            __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            _export('ArgonSystemProvider', ArgonSystemProvider = function ArgonSystemProvider(context, focus, location, visibility, reality, view, viewport, vuforia) {
                _classCallCheck(this, ArgonSystemProvider);

                this.context = context;
                this.focus = focus;
                this.location = location;
                this.visibility = visibility;
                this.reality = reality;
                this.view = view;
                this.viewport = viewport;
                this.vuforia = vuforia;
            });

            _export('ArgonSystemProvider', ArgonSystemProvider = __decorate([autoinject(), __metadata("design:paramtypes", [typeof (_a = typeof ContextServiceProvider !== "undefined" && ContextServiceProvider) === "function" && _a || Object, typeof (_b = typeof FocusServiceProvider !== "undefined" && FocusServiceProvider) === "function" && _b || Object, typeof (_c = typeof LocationServiceProvider !== "undefined" && LocationServiceProvider) === "function" && _c || Object, typeof (_d = typeof VisibilityServiceProvider !== "undefined" && VisibilityServiceProvider) === "function" && _d || Object, typeof (_e = typeof RealityServiceProvider !== "undefined" && RealityServiceProvider) === "function" && _e || Object, typeof (_f = typeof ViewServiceProvider !== "undefined" && ViewServiceProvider) === "function" && _f || Object, typeof (_g = typeof ViewportServiceProvider !== "undefined" && ViewportServiceProvider) === "function" && _g || Object, typeof (_h = typeof VuforiaServiceProvider !== "undefined" && VuforiaServiceProvider) === "function" && _h || Object])], ArgonSystemProvider));
            /**
             * A composition root which instantiates the object graph based on a provided configuration.
             * You generally want to create a new ArgonSystem via the provided [[init]] or [[initReality]] functions:
             * ```ts
             * var app = Argon.init(); // app is an instance of ArgonSystem
             * ```
             */

            _export('ArgonSystem', ArgonSystem = function () {
                function ArgonSystem(parentElement, config) {
                    var container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Container();

                    _classCallCheck(this, ArgonSystem);

                    this.container = container;
                    if (!ArgonSystem.instance) ArgonSystem.instance = this;
                    container.registerInstance(ParentElement, parentElement || ParentElement);
                    container.registerInstance('config', config);
                    if (!container.hasResolver('containerElement')) container.registerInstance('containerElement', null);
                    if (Role.isRealityManager(config.role)) {
                        container.registerSingleton(ConnectService, LoopbackConnectService);
                        if (typeof document !== 'undefined') {
                            container.get(DefaultUIService);
                        }
                        this.reality.default = RealityViewer.EMPTY;
                    } else if (WKWebViewConnectService.isAvailable()) {
                        container.registerSingleton(ConnectService, WKWebViewConnectService);
                    } else if (DOMConnectService.isAvailable()) {
                        container.registerSingleton(ConnectService, DOMConnectService);
                    } else if (DebugConnectService.isAvailable()) {
                        container.registerSingleton(ConnectService, DebugConnectService);
                    }
                    // ensure the entire object graph is instantiated before connecting to the manager. 
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = Object.getOwnPropertyNames(ArgonSystem.prototype)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var key = _step.value;

                            this[key];
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    this.session.connect();
                }

                _createClass(ArgonSystem, [{
                    key: "destroy",
                    value: function destroy() {
                        this.session.manager.close();
                        if (ArgonSystem.instance === this) {
                            ArgonSystem.instance = undefined;
                        }
                    }
                }, {
                    key: "provider",
                    get: function get() {
                        this.session.ensureIsRealityManager();
                        return this.container.get(ArgonSystemProvider);
                    }
                }, {
                    key: "context",
                    get: function get() {
                        return this.container.get(ContextService);
                    }
                }, {
                    key: "focus",
                    get: function get() {
                        return this.container.get(FocusService);
                    }
                }, {
                    key: "location",
                    get: function get() {
                        return this.container.get(LocationService);
                    }
                }, {
                    key: "reality",
                    get: function get() {
                        return this.container.get(RealityService);
                    }
                }, {
                    key: "session",
                    get: function get() {
                        return this.container.get(SessionService);
                    }
                }, {
                    key: "view",
                    get: function get() {
                        return this.container.get(ViewService);
                    }
                }, {
                    key: "viewport",
                    get: function get() {
                        return this.container.get(ViewportService);
                    }
                }, {
                    key: "visibility",
                    get: function get() {
                        return this.container.get(VisibilityService);
                    }
                }, {
                    key: "vuforia",
                    get: function get() {
                        return this.container.get(VuforiaService);
                    }
                    // events

                }, {
                    key: "updateEvent",
                    get: function get() {
                        return this.context.updateEvent;
                    }
                }, {
                    key: "renderEvent",
                    get: function get() {
                        return this.context.renderEvent;
                    }
                }, {
                    key: "focusEvent",
                    get: function get() {
                        return this.focus.focusEvent;
                    }
                }, {
                    key: "blurEvent",
                    get: function get() {
                        return this.focus.blurEvent;
                    }
                }]);

                return ArgonSystem;
            }());

            _export('DI', aureliaDependencyInjection);

            _export('Cesium', cesiumImports);

            _export('RealityViewer', RealityViewer);

            _export('EmptyRealityViewer', EmptyRealityViewer);

            _export('LiveRealityViewer', LiveRealityViewer);

            _export('HostedRealityViewer', HostedRealityViewer);

            _export('ArgonSystemProvider', ArgonSystemProvider);

            _export('ArgonSystem', ArgonSystem);

            _export('init', init$1);

            _export('initRealityViewer', initRealityViewer);

            _export('AVERAGE_HUMAN_HEIGHT', AVERAGE_HUMAN_HEIGHT);

            _export('EYE_ENTITY_ID', EYE_ENTITY_ID);

            _export('PHYSICAL_EYE_ENTITY_ID', PHYSICAL_EYE_ENTITY_ID);

            _export('STAGE_ENTITY_ID', STAGE_ENTITY_ID);

            _export('PHYSICAL_STAGE_ENTITY_ID', PHYSICAL_STAGE_ENTITY_ID);

            _export('Role', Role);

            _export('Configuration', Configuration);

            _export('Viewport', Viewport);

            _export('NormalizedViewport', NormalizedViewport);

            _export('SubviewType', SubviewType);

            _export('SerializedEntityState', SerializedEntityState);

            _export('SerializedSubview', SerializedSubview);

            _export('SerializedSubviewList', SerializedSubviewList);

            _export('PoseStatus', PoseStatus);

            _export('ContextService', ContextService);

            _export('ContextServiceProvider', ContextServiceProvider);

            _export('FocusService', FocusService);

            _export('FocusServiceProvider', FocusServiceProvider);

            _export('LocationService', LocationService);

            _export('LocationServiceProvider', LocationServiceProvider);

            _export('RealityViewerFactory', RealityViewerFactory);

            _export('RealityService', RealityService);

            _export('RealityServiceProvider', RealityServiceProvider);

            _export('version', version);

            _export('SessionPort', SessionPort);

            _export('SessionPortFactory', SessionPortFactory);

            _export('ConnectService', ConnectService);

            _export('SessionService', SessionService);

            _export('LoopbackConnectService', LoopbackConnectService);

            _export('DOMConnectService', DOMConnectService);

            _export('DebugConnectService', DebugConnectService);

            _export('WKWebViewConnectService', WKWebViewConnectService);

            _export('DefaultUIService', DefaultUIService);

            _export('getAncestorReferenceFrames', getAncestorReferenceFrames);

            _export('getEntityPositionInReferenceFrame', getEntityPositionInReferenceFrame);

            _export('getEntityPosition', getEntityPosition);

            _export('getEntityOrientationInReferenceFrame', getEntityOrientationInReferenceFrame);

            _export('getEntityOrientation', getEntityOrientation);

            _export('getSerializedEntityState', getSerializedEntityState);

            _export('resolveURL', resolveURL);

            _export('parseURL', parseURL);

            _export('resolveElement', resolveElement);

            _export('decomposePerspectiveOffCenterProjectionMatrix', decomposePerspectiveOffCenterProjectionMatrix);

            _export('decomposePerspectiveProjectionMatrix', decomposePerspectiveProjectionMatrix);

            _export('convertEntityReferenceFrame', convertEntityReferenceFrame);

            _export('isIOS', isIOS);

            _export('openInArgonApp', openInArgonApp);

            _export('requestAnimationFrame', requestAnimationFrame$1);

            _export('deprecated', deprecated$1);

            _export('synthesizeEvent', synthesizeEvent);

            _export('createEventForwarder', createEventForwarder);

            _export('CommandQueue', CommandQueue);

            _export('Event', Event);

            _export('MessageChannelLike', MessageChannelLike);

            _export('SynchronousMessageChannel', SynchronousMessageChannel);

            _export('MessageChannelFactory', MessageChannelFactory);

            _export('Subview', Subview);

            _export('ViewService', ViewService);

            _export('ViewServiceProvider', ViewServiceProvider);

            _export('PresentationMode', PresentationMode);

            _export('ParentElement', ParentElement);

            _export('ViewportService', ViewportService);

            _export('ViewportServiceProvider', ViewportServiceProvider);

            _export('VisibilityService', VisibilityService);

            _export('VisibilityServiceProvider', VisibilityServiceProvider);

            _export('VuforiaServiceProvider', VuforiaServiceProvider);

            _export('VuforiaService', VuforiaService);

            _export('VuforiaAPI', VuforiaAPI);

            _export('VuforiaTracker', VuforiaTracker);

            _export('VuforiaObjectTracker', VuforiaObjectTracker);

            _export('DeprecatedVuforiaDataSet', DeprecatedVuforiaDataSet);
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
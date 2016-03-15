!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in p||(p[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==v.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=p[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(v.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=p[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return x[e]||(x[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=p[s],v=x[s];v?l=v.exports:c&&!c.declarative?l=c.esModule:c?(d(c),v=c.module,l=v.exports):l=f(s),v&&v.importers?(v.importers.push(t),t.dependencies.push(v)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=p[e];if(t)t.declarative?c(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=f(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=p[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){if(r===e)return r;var t={};if("object"==typeof r||"function"==typeof r)if(g){var n;for(var o in r)(n=Object.getOwnPropertyDescriptor(r,o))&&h(t,o,n)}else{var a=r&&r.hasOwnProperty;for(var o in r)(!a||r.hasOwnProperty(o))&&(t[o]=r[o])}return t["default"]=r,h(t,"__useDefault",{value:!0}),t}function c(r,t){var n=p[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==v.call(t,u)&&(p[u]?c(u,t):f(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function f(e){if(D[e])return D[e];if("@node/"==e.substr(0,6))return y(e.substr(6));var r=p[e];if(!r)throw"Module "+e+" not present.";return a(e),c(e,[]),p[e]=void 0,r.declarative&&h(r.module.exports,"__esModule",{value:!0}),D[e]=r.declarative?r.module.exports:r.esModule}var p={},v=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},g=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(m){g=!1}var h;!function(){try{Object.defineProperty({},"a",{})&&(h=Object.defineProperty)}catch(e){h=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var x={},y="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,D={"@empty":{}};return function(e,n,o){return function(a){a(function(a){for(var u={_nodeRequire:y,register:r,registerDynamic:t,get:f,set:function(e,r){D[e]=r},newModule:function(e){return e}},d=0;d<n.length;d++)(function(e,r){r&&r.__esModule?D[e]=r:D[e]=s(r)})(n[d],arguments[d]);o(u);var i=f(e[0]);if(e.length>1)for(var d=1;d<e.length;d++)f(e[d]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)

(["1","1"], [], function($__System) {

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
$__System.register("4", ["b", "5", "6", "7", "8", "9", "a"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var aurelia_dependency_injection_1,
      cesium_imports_1,
      session_1,
      reality_1,
      utils_1,
      camera_1,
      viewport_1;
  var PoseStatus,
      scratchDate,
      scratchCartesian3,
      scratchQuaternion,
      scratchOriginCartesian3,
      ContextService;
  function _stringFromReferenceFrame(referenceFrame) {
    var rf = referenceFrame;
    return cesium_imports_1.defined(rf.id) ? rf.id : '' + rf;
  }
  return {
    setters: [function(aurelia_dependency_injection_1_1) {
      aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
    }, function(cesium_imports_1_1) {
      cesium_imports_1 = cesium_imports_1_1;
    }, function(session_1_1) {
      session_1 = session_1_1;
    }, function(reality_1_1) {
      reality_1 = reality_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }, function(camera_1_1) {
      camera_1 = camera_1_1;
    }, function(viewport_1_1) {
      viewport_1 = viewport_1_1;
    }],
    execute: function() {
      (function(PoseStatus) {
        PoseStatus[PoseStatus["KNOWN"] = 1] = "KNOWN";
        PoseStatus[PoseStatus["UNKNOWN"] = 2] = "UNKNOWN";
        PoseStatus[PoseStatus["FOUND"] = 4] = "FOUND";
        PoseStatus[PoseStatus["LOST"] = 8] = "LOST";
      })(PoseStatus || (PoseStatus = {}));
      exports_1("PoseStatus", PoseStatus);
      scratchDate = new cesium_imports_1.JulianDate(0, 0);
      scratchCartesian3 = new cesium_imports_1.Cartesian3(0, 0);
      scratchQuaternion = new cesium_imports_1.Quaternion(0, 0);
      scratchOriginCartesian3 = new cesium_imports_1.Cartesian3(0, 0);
      ContextService = (function() {
        function ContextService(sessionService, realityService, cameraService, viewportService) {
          var _this = this;
          this.sessionService = sessionService;
          this.realityService = realityService;
          this.cameraService = cameraService;
          this.viewportService = viewportService;
          this.updateEvent = new utils_1.Event();
          this.renderEvent = new utils_1.Event();
          this.entities = new cesium_imports_1.EntityCollection();
          this.time = new cesium_imports_1.JulianDate(0, 0);
          this.localOriginEastNorthUp = new cesium_imports_1.Entity({
            name: 'origin',
            position: new cesium_imports_1.ConstantPositionProperty(),
            orientation: new cesium_imports_1.ConstantProperty()
          });
          this.localOriginEastUpSouth = new cesium_imports_1.Entity({
            name: 'originEastUpSouth',
            position: new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, this.localOriginEastNorthUp),
            orientation: new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_X, Math.PI / 2))
          });
          this.localOriginChangeEvent = new utils_1.Event();
          this.defaultReferenceFrame = this.localOriginEastNorthUp;
          this.device = new cesium_imports_1.Entity({
            id: 'DEVICE',
            name: 'device',
            position: new cesium_imports_1.ConstantPositionProperty(),
            orientation: new cesium_imports_1.ConstantProperty()
          });
          this.eye = new cesium_imports_1.Entity({
            id: 'EYE',
            name: 'eye',
            position: new cesium_imports_1.ConstantPositionProperty(),
            orientation: new cesium_imports_1.ConstantProperty()
          });
          this.eyeOriginEastNorthUp = new cesium_imports_1.Entity({
            name: 'eyeOrigin',
            position: new cesium_imports_1.ConstantPositionProperty(),
            orientation: new cesium_imports_1.ConstantProperty()
          });
          this._subscribedEntities = new WeakMap();
          this._entityStateMap = new Map();
          this._updatingEntities = new Set();
          this._knownEntities = new Set();
          this.entities.add(this.device);
          this.entities.add(this.eye);
          if (this.sessionService.isManager()) {
            this.realityService.frameEvent.addEventListener(function(state) {
              console.log('calling update');
              _this._update(state);
            });
          } else {
            this.sessionService.manager.on['ar.context.update'] = function(state) {
              _this._update(state);
            };
          }
          this.sessionService.connectEvent.addEventListener(function(session) {
            session.on['ar.context.subscribe'] = function(_a) {
              var id = _a.id;
              var subscriptions = _this._subscribedEntities.get(session) || [];
              if (subscriptions.indexOf(id) === -1)
                subscriptions.push(id);
            };
          });
        }
        ContextService.prototype.setDefaultReferenceFrame = function(origin) {
          this.defaultReferenceFrame = origin;
        };
        ContextService.prototype.subscribeToEntityById = function(id) {
          this.sessionService.manager.send('ar.context.subscribe', {id: id});
          return this.entities.getOrCreateEntity(id);
        };
        ContextService.prototype.getCurrentEntityState = function(entity, referenceFrame) {
          if (referenceFrame === void 0) {
            referenceFrame = this.defaultReferenceFrame;
          }
          var time = this.time;
          var key = entity.id + _stringFromReferenceFrame(referenceFrame);
          var entityState = this._entityStateMap.get(key);
          if (entityState && cesium_imports_1.JulianDate.equals(entityState.time, time))
            return entityState;
          if (!cesium_imports_1.defined(entityState)) {
            entityState = {
              position: new cesium_imports_1.Cartesian3,
              orientation: new cesium_imports_1.Quaternion,
              time: cesium_imports_1.JulianDate.clone(time),
              poseStatus: PoseStatus.UNKNOWN
            };
            this._entityStateMap.set(key, entityState);
          } else {
            cesium_imports_1.JulianDate.clone(time, entityState.time);
          }
          var position = utils_1.getEntityPositionInReferenceFrame(entity, time, referenceFrame, entityState.position);
          var orientation = utils_1.getEntityOrientationInReferenceFrame(entity, time, referenceFrame, entityState.orientation);
          var hasPose = position && orientation;
          var poseStatus = 0;
          var previousStatus = entityState.poseStatus;
          if (hasPose) {
            poseStatus |= PoseStatus.KNOWN;
          } else {
            poseStatus |= PoseStatus.UNKNOWN;
          }
          if (hasPose && previousStatus & PoseStatus.UNKNOWN) {
            poseStatus |= PoseStatus.FOUND;
          } else if (!hasPose && previousStatus & PoseStatus.KNOWN) {
            poseStatus |= PoseStatus.LOST;
          }
          entityState.poseStatus = poseStatus;
          return entityState;
        };
        ContextService.prototype._update = function(state) {
          var _this = this;
          this.viewportService._setViewport(state.viewport);
          this.cameraService._setCamera(state.camera);
          this._knownEntities.clear();
          for (var id in state.entities) {
            this._updateEntity(id, state);
            this._updatingEntities.add(id);
            this._knownEntities.add(id);
          }
          this._updatingEntities.forEach(function(id) {
            if (!_this._knownEntities.has(id)) {
              _this.entities.getById(id).position = undefined;
              _this._updatingEntities.delete(id);
            }
          });
          this._updateOrigin(state);
          var entityPoseCache = {};
          if (this.sessionService.isManager()) {
            for (var _i = 0,
                _a = this.sessionService.managedSessions; _i < _a.length; _i++) {
              var session = _a[_i];
              if (session.info.enableIncomingUpdateEvents)
                this._sendUpdateForSession(state, session, entityPoseCache);
            }
          }
          cesium_imports_1.JulianDate.clone(state.time, this.time);
          this.updateEvent.raiseEvent(state);
          this.renderEvent.raiseEvent(state);
        };
        ContextService.prototype._updateEntity = function(id, state) {
          var entityPose = state.entities[id];
          var referenceFrame = (typeof entityPose.referenceFrame === 'number') ? entityPose.referenceFrame : this.entities.getById(entityPose.referenceFrame);
          if (!cesium_imports_1.defined(referenceFrame)) {
            referenceFrame = this._updateEntity(entityPose.referenceFrame, state);
          }
          var entity = this.entities.getOrCreateEntity(id);
          if (entity.position instanceof cesium_imports_1.ConstantPositionProperty === false || entity.orientation instanceof cesium_imports_1.ConstantProperty === false) {
            entity.position = new cesium_imports_1.ConstantPositionProperty(entityPose.position, referenceFrame);
            entity.orientation = new cesium_imports_1.ConstantProperty(entityPose.orientation);
          }
          var entityPosition = entity.position;
          var entityOrientation = entity.orientation;
          entityPosition.setValue(entityPose.position, referenceFrame);
          entityOrientation.setValue(entityPose.orientation);
          return entity;
        };
        ContextService.prototype._updateOrigin = function(state) {
          var eyeRootFrame = utils_1.getRootReferenceFrame(this.eye);
          var eyePosition = this.eye.position.getValueInReferenceFrame(state.time, eyeRootFrame, scratchCartesian3);
          var eyeENUPositionProperty = this.eyeOriginEastNorthUp.position;
          eyeENUPositionProperty.setValue(eyePosition, eyeRootFrame);
          var localENUFrame = this.localOriginEastNorthUp.position.referenceFrame;
          var localENUPosition = this.localOriginEastNorthUp.position.getValueInReferenceFrame(state.time, localENUFrame, scratchOriginCartesian3);
          if (!localENUPosition || localENUFrame !== eyeRootFrame || cesium_imports_1.Cartesian3.magnitudeSquared(cesium_imports_1.Cartesian3.subtract(eyePosition, localENUPosition, scratchOriginCartesian3)) > 25000000) {
            var localENUPositionProperty = this.localOriginEastNorthUp.position;
            var localENUOrientationProperty = this.localOriginEastNorthUp.orientation;
            localENUPositionProperty.setValue(eyePosition, eyeRootFrame);
            var enuOrientation = utils_1.getEntityOrientationInReferenceFrame(this.localOriginEastNorthUp, state.time, eyeRootFrame, scratchQuaternion);
            localENUOrientationProperty.setValue(enuOrientation);
            this.localOriginChangeEvent.raiseEvent(undefined);
          }
        };
        ContextService.prototype._sendUpdateForSession = function(parentState, session, entityPoseCache) {
          var sessionEntities = {};
          for (var id in parentState.entities) {
            sessionEntities[id] = parentState.entities[id];
          }
          for (var id in this._subscribedEntities.get(session)) {
            if (!cesium_imports_1.defined(entityPoseCache[id])) {
              var entity = this.entities.getById(id);
              entityPoseCache[id] = utils_1.calculatePose(entity, parentState.time);
            }
            sessionEntities[id] = entityPoseCache[id];
          }
          var sessionState = {
            time: parentState.time,
            frameNumber: parentState.frameNumber,
            reality: parentState.reality,
            camera: parentState.camera,
            viewport: parentState.viewport,
            entities: sessionEntities
          };
          session.send('ar.context.update', sessionState);
        };
        ContextService = __decorate([aurelia_dependency_injection_1.inject(session_1.SessionService, reality_1.RealityService, camera_1.CameraService, viewport_1.ViewportService)], ContextService);
        return ContextService;
      }());
      exports_1("ContextService", ContextService);
    }
  };
});

$__System.register("c", ["b", "6", "8"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var aurelia_dependency_injection_1,
      session_1,
      utils_1;
  var InteractionMode,
      InteractionModeService;
  return {
    setters: [function(aurelia_dependency_injection_1_1) {
      aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
    }, function(session_1_1) {
      session_1 = session_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }],
    execute: function() {
      (function(InteractionMode) {
        InteractionMode[InteractionMode["Flat"] = "Flat"] = "Flat";
        InteractionMode[InteractionMode["Immersive"] = "Immersive"] = "Immersive";
      })(InteractionMode || (InteractionMode = {}));
      exports_1("InteractionMode", InteractionMode);
      InteractionModeService = (function() {
        function InteractionModeService(sessionService) {
          var _this = this;
          this.sessionService = sessionService;
          this.changeEvent = new utils_1.Event();
          this.current = InteractionMode.Immersive;
          this.desired = null;
          this.desiredInteractionModeMap = new WeakMap();
          if (sessionService.isManager()) {
            sessionService.connectEvent.addEventListener(function(session) {
              session.on['ar.interactionMode.desired'] = function(mode) {
                _this.desiredInteractionModeMap.set(session, mode);
              };
            });
            this.changeEvent.addEventListener(function() {
              for (var _i = 0,
                  _a = sessionService.managedSessions; _i < _a.length; _i++) {
                var session = _a[_i];
                session.send('ar.interactionMode.current', _this.current);
              }
            });
          }
          sessionService.manager.on['ar.interactionMode.current'] = function(mode) {
            _this._setMode(mode);
          };
        }
        InteractionModeService.prototype.setDesired = function(mode) {
          this.desired = mode;
          this.sessionService.manager.send('ar.interactionMode.desired', mode);
        };
        InteractionModeService.prototype.set = function(mode) {
          this.sessionService.ensureIsManager();
          this._setMode(mode);
        };
        InteractionModeService.prototype._setMode = function(mode) {
          var previous = this.current;
          this.current = mode;
          if (previous !== mode) {
            this.changeEvent.raiseEvent({previous: previous});
          }
        };
        InteractionModeService = __decorate([aurelia_dependency_injection_1.inject(session_1.SessionService)], InteractionModeService);
        return InteractionModeService;
      }());
      exports_1("InteractionModeService", InteractionModeService);
    }
  };
});

$__System.register("d", ["5"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var cesium_imports_1;
  var TimerService,
      lastTime;
  function requestAnimationFramePoly(callback) {
    var currTime = Date.now();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = setTimeout(function() {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  }
  return {
    setters: [function(cesium_imports_1_1) {
      cesium_imports_1 = cesium_imports_1_1;
    }],
    execute: function() {
      TimerService = (function() {
        function TimerService() {
          this.frameNumbers = new WeakMap();
        }
        TimerService.prototype.requestFrame = function(callback) {
          var _this = this;
          if (typeof requestAnimationFrame !== 'undefined' && typeof performance !== 'undefined') {
            this.navigationStartDate = this.navigationStartDate || cesium_imports_1.JulianDate.fromDate(new Date(performance.timing.navigationStart));
            requestAnimationFrame(function(time) {
              var frameTime = cesium_imports_1.JulianDate.addSeconds(_this.navigationStartDate, time / 1000, new cesium_imports_1.JulianDate(0, 0));
              callback(frameTime, _this.getNextFrameNumber(callback));
            });
          } else {
            requestAnimationFramePoly(function(time) {
              console.log('raf fired ' + time);
              var frameTime = cesium_imports_1.JulianDate.fromDate(new Date(time));
              callback(frameTime, _this.getNextFrameNumber(callback));
            });
          }
        };
        TimerService.prototype.getNextFrameNumber = function(callback) {
          var frameNumber = this.frameNumbers.get(callback) || 0;
          this.frameNumbers.set(callback, frameNumber + 1);
          return frameNumber;
        };
        return TimerService;
      }());
      exports_1("TimerService", TimerService);
      lastTime = 0;
    }
  };
});

$__System.register("e", ["b", "6", "8"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var aurelia_dependency_injection_1,
      session_1,
      utils_1;
  var FocusService;
  return {
    setters: [function(aurelia_dependency_injection_1_1) {
      aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
    }, function(session_1_1) {
      session_1 = session_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }],
    execute: function() {
      FocusService = (function() {
        function FocusService(sessionService) {
          var _this = this;
          this.sessionService = sessionService;
          this.focusEvent = new utils_1.Event();
          this.blurEvent = new utils_1.Event();
          this._hasFocus = false;
          this._sessionFocusEvent = new utils_1.Event();
          sessionService.manager.on['ar.focus.state'] = function(state) {
            _this._setFocus(state);
          };
          if (sessionService.isManager()) {
            setTimeout(function() {
              _this._setFocus(true);
            });
          }
        }
        Object.defineProperty(FocusService.prototype, "hasFocus", {
          get: function() {
            return this._hasFocus;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(FocusService.prototype, "sessionFocusEvent", {
          get: function() {
            this.sessionService.ensureIsManager();
            return this._sessionFocusEvent;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(FocusService.prototype, "currentSession", {
          get: function() {
            this.sessionService.ensureIsManager();
            return this._session;
          },
          enumerable: true,
          configurable: true
        });
        FocusService.prototype.setSession = function(session) {
          this.sessionService.ensureIsManager();
          var previousFocussedSession = this._session;
          if (previousFocussedSession !== session) {
            if (previousFocussedSession)
              previousFocussedSession.send('ar.focus.state', false);
            session.send('ar.focus.state', true);
            this._session = session;
            this.sessionFocusEvent.raiseEvent(session);
          }
        };
        FocusService.prototype._setFocus = function(state) {
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
      }());
      exports_1("FocusService", FocusService);
    }
  };
});

$__System.register("9", ["b", "5", "6", "a", "8"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var aurelia_dependency_injection_1,
      cesium_imports_1,
      session_1,
      viewport_1,
      utils_1;
  var CameraService;
  return {
    setters: [function(aurelia_dependency_injection_1_1) {
      aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
    }, function(cesium_imports_1_1) {
      cesium_imports_1 = cesium_imports_1_1;
    }, function(session_1_1) {
      session_1 = session_1_1;
    }, function(viewport_1_1) {
      viewport_1 = viewport_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }],
    execute: function() {
      CameraService = (function() {
        function CameraService(sessionService, viewportService) {
          var _this = this;
          this.sessionService = sessionService;
          this.viewportService = viewportService;
          this.changeEvent = new utils_1.Event();
          this.currentFrustum = new cesium_imports_1.PerspectiveFrustum;
          this.desiredCameraMap = new WeakMap();
          if (sessionService.isManager()) {
            sessionService.connectEvent.addEventListener(function(session) {
              session.on['ar.camera.desired'] = function(camera) {
                _this.desiredCameraMap.set(session, camera);
              };
            });
          }
        }
        CameraService.prototype.getSuggested = function() {
          return {
            type: "perspective",
            fovY: cesium_imports_1.CesiumMath.toRadians(60)
          };
        };
        CameraService.prototype.setDesired = function(state) {
          this.desired = state;
          this.sessionService.manager.send('ar.camera.desired', state);
        };
        CameraService.prototype._setCamera = function(camera) {
          if (this._currentJSON !== JSON.stringify(camera)) {
            var previous = this.current;
            this.current = camera;
            if (camera.type === 'perspective') {
              var perspectiveCamera = camera;
              if (!perspectiveCamera.fovX && !perspectiveCamera.fovY) {
                console.error('Camera state is invalid: both fovX and fovY are missing.');
                return;
              }
              var frustum = this.currentFrustum;
              var aspect = frustum.aspectRatio = perspectiveCamera.fovX && perspectiveCamera.fovY ? Math.tan(perspectiveCamera.fovX * 0.5) / Math.tan(perspectiveCamera.fovY * 0.5) : this.viewportService.current.width / this.viewportService.current.height;
              if (aspect > 1) {
                if (!perspectiveCamera.fovX)
                  perspectiveCamera.fovX = 2 * Math.atan(Math.tan(perspectiveCamera.fovY * 0.5) * aspect);
                frustum.fov = perspectiveCamera.fovX;
              } else {
                if (!perspectiveCamera.fovY)
                  perspectiveCamera.fovY = 2 * Math.atan(Math.tan(perspectiveCamera.fovX * 0.5) / aspect);
                frustum.fov = perspectiveCamera.fovY;
              }
              frustum['xOffset'] = perspectiveCamera.xOffset;
              frustum['yOffset'] = perspectiveCamera.yOffset;
            }
            this.changeEvent.raiseEvent({previous: previous});
          }
        };
        CameraService = __decorate([aurelia_dependency_injection_1.inject(session_1.SessionService, viewport_1.ViewportService)], CameraService);
        return CameraService;
      }());
      exports_1("CameraService", CameraService);
    }
  };
});

$__System.register("f", ["5", "8"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var cesium_imports_1,
      utils_1;
  var DeviceService;
  return {
    setters: [function(cesium_imports_1_1) {
      cesium_imports_1 = cesium_imports_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }],
    execute: function() {
      DeviceService = (function() {
        function DeviceService() {
          this.entity = new cesium_imports_1.Entity({
            id: 'DEVICE',
            name: 'device'
          });
          this.eyeEntity = new cesium_imports_1.Entity({
            id: 'EYE',
            name: 'eye'
          });
          var sampledDevicePosition = new cesium_imports_1.SampledPositionProperty();
          sampledDevicePosition.forwardExtrapolationType = cesium_imports_1.ExtrapolationType.HOLD;
          var sampledDeviceOrientation = new cesium_imports_1.SampledProperty(cesium_imports_1.Quaternion);
          sampledDeviceOrientation.forwardExtrapolationType = cesium_imports_1.ExtrapolationType.HOLD;
          this.entity.position = sampledDevicePosition;
          this.entity.orientation = sampledDeviceOrientation;
          var eyePosition = new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, this.entity);
          var eyeOrientation = new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY);
          this.eyeEntity.position = eyePosition;
          this.eyeEntity.orientation = eyeOrientation;
        }
        DeviceService.prototype.getPose = function(time) {
          return utils_1.calculatePose(this.entity, time);
        };
        DeviceService.prototype.getEyePose = function(time) {
          if (typeof window !== 'undefined') {
            var interfaceRotation = -window.orientation || 0;
            var eyeOrientation = this.eyeEntity.orientation;
            eyeOrientation.setValue(cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_Z, interfaceRotation));
          }
          return utils_1.calculatePose(this.eyeEntity, time);
        };
        return DeviceService;
      }());
      exports_1("DeviceService", DeviceService);
    }
  };
});

$__System.register("7", ["b", "5", "d", "10", "e", "6", "9", "f", "8", "a"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var aurelia_dependency_injection_1,
      cesium_imports_1,
      timer_1,
      config_1,
      focus_1,
      session_1,
      camera_1,
      device_1,
      utils_1,
      viewport_1;
  var RealitySetupHandler,
      RealityService,
      EmptyRealitySetupHandler;
  return {
    setters: [function(aurelia_dependency_injection_1_1) {
      aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
    }, function(cesium_imports_1_1) {
      cesium_imports_1 = cesium_imports_1_1;
    }, function(timer_1_1) {
      timer_1 = timer_1_1;
    }, function(config_1_1) {
      config_1 = config_1_1;
    }, function(focus_1_1) {
      focus_1 = focus_1_1;
    }, function(session_1_1) {
      session_1 = session_1_1;
    }, function(camera_1_1) {
      camera_1 = camera_1_1;
    }, function(device_1_1) {
      device_1 = device_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }, function(viewport_1_1) {
      viewport_1 = viewport_1_1;
    }],
    execute: function() {
      RealitySetupHandler = (function() {
        function RealitySetupHandler() {}
        return RealitySetupHandler;
      }());
      exports_1("RealitySetupHandler", RealitySetupHandler);
      RealityService = (function() {
        function RealityService(handlers, sessionService, cameraService, deviceService, focusService, viewportService) {
          var _this = this;
          this.handlers = handlers;
          this.sessionService = sessionService;
          this.cameraService = cameraService;
          this.deviceService = deviceService;
          this.focusService = focusService;
          this.viewportService = viewportService;
          this.current = null;
          this.desired = null;
          this.connectEvent = new utils_1.Event();
          this.changeEvent = new utils_1.Event();
          this.frameEvent = new utils_1.Event();
          this.desiredRealityMap = new WeakMap();
          this.desiredRealityMapInverse = new WeakMap();
          if (sessionService.isManager()) {
            sessionService.connectEvent.addEventListener(function(session) {
              session.closeEvent.addEventListener(function() {
                if (_this._realitySession === session) {
                  _this._realitySession = null;
                }
              });
              session.on['ar.reality.desired'] = function(message, event) {
                var reality = message.reality;
                console.log('Session set desired reality: ' + JSON.stringify(reality));
                if (reality) {
                  if (_this.isSupported(reality.type)) {
                    _this.desiredRealityMap.set(session, reality);
                    _this.desiredRealityMapInverse.set(reality, session);
                  } else {
                    session.sendError({message: 'reality type "' + reality.type + '" is not suppored on this platform'});
                  }
                } else {
                  _this.desiredRealityMap.delete(session);
                }
                _this._setNextReality(_this.onSelectReality());
              };
              session.on['ar.reality.message'] = function(message) {
                if (_this.desiredRealityMapInverse.get(_this.current) === session) {
                  _this._realitySession.send('ar.reality.message', message);
                }
              };
            });
            sessionService.manager.connectEvent.addEventListener(function() {
              setTimeout(function() {
                if (!_this.desired)
                  _this._setNextReality(_this.onSelectReality());
              });
            });
          }
          sessionService.manager.on['ar.reality.connect'] = function() {
            var messageChannel = _this.sessionService.createMessageChannel();
            var realityControlSession = _this.sessionService.createSessionPort();
            messageChannel.port1.onmessage = function(msg) {
              _this.sessionService.manager.send('ar.reality.message', msg.data);
            };
            _this.sessionService.manager.on['ar.reality.message'] = function(message) {
              messageChannel.port1.postMessage(message);
            };
            realityControlSession.connectEvent.addEventListener(function() {
              _this.connectEvent.raiseEvent(realityControlSession);
            });
            _this.sessionService.manager.closeEvent.addEventListener(function() {
              realityControlSession.close();
            });
            realityControlSession.open(messageChannel.port2, _this.sessionService.configuration);
          };
        }
        RealityService.prototype.isSupported = function(type) {
          this.sessionService.ensureIsManager();
          return !!this._getHandler(type);
        };
        RealityService.prototype.setDesired = function(reality) {
          if (reality && !reality['id'])
            reality['id'] = cesium_imports_1.createGuid();
          this.desired = reality;
          this.sessionService.manager.send('ar.reality.desired', {reality: reality});
        };
        RealityService.prototype.onSelectReality = function() {
          this.sessionService.ensureIsManager();
          var selectedReality = this.desiredRealityMap.get(this.sessionService.manager);
          if (!selectedReality) {
            selectedReality = this.desiredRealityMap.get(this.focusService.currentSession);
          }
          if (!selectedReality) {
            for (var _i = 0,
                _a = this.sessionService.managedSessions; _i < _a.length; _i++) {
              var session = _a[_i];
              var desiredReality = this.desiredRealityMap.get(session);
              if (desiredReality && this.isSupported(desiredReality.type)) {
                selectedReality = desiredReality;
                break;
              }
            }
          }
          return selectedReality;
        };
        RealityService.prototype._setNextReality = function(reality) {
          var _this = this;
          console.log('Setting reality: ' + JSON.stringify(reality));
          if (this.current && reality && this.current.id === reality.id)
            return;
          if (this.current && !reality)
            return;
          if (!this.current && !reality) {
            reality = this.sessionService.configuration.defaultReality;
            if (!reality)
              return;
            reality.id = 'default';
          }
          var realitySession = this.sessionService.addManagedSessionPort();
          realitySession.on['ar.reality.frameState'] = function(state) {
            var frameState = {
              reality: reality,
              frameNumber: state.frameNumber,
              time: state.time,
              viewport: state.viewport || _this.viewportService.getSuggested(),
              camera: state.camera || _this.cameraService.getSuggested(),
              entities: state.entities || {}
            };
            if (!cesium_imports_1.defined(frameState.entities['DEVICE'])) {
              frameState.entities['DEVICE'] = _this.deviceService.getPose(frameState.time);
            }
            if (!cesium_imports_1.defined(frameState.entities['EYE'])) {
              frameState.entities['EYE'] = _this.deviceService.getEyePose(frameState.time);
            }
            _this.frameEvent.raiseEvent(frameState);
          };
          realitySession.on['ar.reality.message'] = function(message) {
            var owner = _this.desiredRealityMapInverse.get(reality) || _this.sessionService.manager;
            owner.send('ar.reality.message', message);
          };
          realitySession.connectEvent.addEventListener(function() {
            var previousRealitySession = _this._realitySession;
            var previousReality = _this.current;
            _this._realitySession = realitySession;
            _this._setCurrent(reality);
            if (previousRealitySession) {
              previousRealitySession.close();
            }
            if (realitySession.info.role !== config_1.Role.REALITY) {
              realitySession.sendError({message: "Expected a reality session"});
              realitySession.close();
              return;
            }
            if (realitySession.info.enableRealityControlPort) {
              var ownerSession = _this.desiredRealityMapInverse.get(reality) || _this.sessionService.manager;
              var channel = _this.sessionService.createMessageChannel();
              realitySession.send('ar.reality.connect');
              ownerSession.send('ar.reality.connect');
            }
          });
          realitySession.closeEvent.addEventListener(function() {
            console.log('Reality session closed: ' + JSON.stringify(reality));
            _this._setNextReality(_this.onSelectReality());
          });
          var messageChannel = this.sessionService.createMessageChannel();
          realitySession.open(messageChannel.port1, this.sessionService.configuration);
          this._executeRealitySetupHandler(reality, messageChannel.port2);
        };
        RealityService.prototype._getHandler = function(type) {
          var found = undefined;
          for (var _i = 0,
              _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            if (handler.type === type) {
              found = handler;
              break;
            }
          }
          return found;
        };
        RealityService.prototype._setCurrent = function(reality) {
          if (!this.current || this.current.id !== reality.id) {
            var previous = this.current;
            this.current = reality;
            this.changeEvent.raiseEvent({previous: previous});
            console.log('Reality changed to: ' + JSON.stringify(reality));
          }
        };
        RealityService.prototype._executeRealitySetupHandler = function(reality, port) {
          this.sessionService.ensureIsManager();
          var handler = this._getHandler(reality.type);
          if (!handler)
            throw new Error('Unable to setup unsupported reality type: ' + reality.type);
          handler.setup(reality, port);
        };
        RealityService = __decorate([aurelia_dependency_injection_1.inject(aurelia_dependency_injection_1.All.of(RealitySetupHandler), session_1.SessionService, camera_1.CameraService, device_1.DeviceService, focus_1.FocusService, viewport_1.ViewportService, timer_1.TimerService)], RealityService);
        return RealityService;
      }());
      exports_1("RealityService", RealityService);
      EmptyRealitySetupHandler = (function() {
        function EmptyRealitySetupHandler(sessionService, timer) {
          this.sessionService = sessionService;
          this.timer = timer;
          this.type = 'empty';
        }
        EmptyRealitySetupHandler.prototype.setup = function(reality, port) {
          var _this = this;
          var remoteRealitySession = this.sessionService.createSessionPort();
          var doUpdate = true;
          remoteRealitySession.connectEvent.addEventListener(function() {
            var update = function(time, frameNumber) {
              if (doUpdate) {
                var frameState = {
                  time: time,
                  frameNumber: frameNumber
                };
                remoteRealitySession.send('ar.reality.frameState', frameState);
                _this.timer.requestFrame(update);
              }
            };
            _this.timer.requestFrame(update);
          });
          remoteRealitySession.closeEvent.addEventListener(function() {
            doUpdate = false;
          });
          remoteRealitySession.open(port, {role: config_1.Role.REALITY});
        };
        EmptyRealitySetupHandler = __decorate([aurelia_dependency_injection_1.inject(session_1.SessionService, timer_1.TimerService)], EmptyRealitySetupHandler);
        return EmptyRealitySetupHandler;
      }());
      exports_1("EmptyRealitySetupHandler", EmptyRealitySetupHandler);
    }
  };
});

$__System.register("11", ["b", "10", "e", "7", "6", "8"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var aurelia_dependency_injection_1,
      config_1,
      focus_1,
      reality_1,
      session_1,
      utils_1;
  var VuforiaInitError,
      VuforiaLoadDataSetError,
      VuforiaUnloadDataSetError,
      VuforiaActivateDataSetError,
      VuforiaDeactivateDataSetError,
      VuforiaInitErrorCode,
      VuforiaErrorType,
      VuforiaServiceDelegateBase,
      VuforiaServiceDelegate,
      VuforiaRealitySetupHandler,
      VuforiaService,
      VuforiaDataSet;
  return {
    setters: [function(aurelia_dependency_injection_1_1) {
      aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
    }, function(config_1_1) {
      config_1 = config_1_1;
    }, function(focus_1_1) {
      focus_1 = focus_1_1;
    }, function(reality_1_1) {
      reality_1 = reality_1_1;
    }, function(session_1_1) {
      session_1 = session_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }],
    execute: function() {
      VuforiaInitError = (function(_super) {
        __extends(VuforiaInitError, _super);
        function VuforiaInitError(message, code) {
          _super.call(this, message);
          this.code = code;
        }
        return VuforiaInitError;
      }(Error));
      exports_1("VuforiaInitError", VuforiaInitError);
      VuforiaLoadDataSetError = (function(_super) {
        __extends(VuforiaLoadDataSetError, _super);
        function VuforiaLoadDataSetError(message) {
          _super.call(this, message);
        }
        return VuforiaLoadDataSetError;
      }(Error));
      exports_1("VuforiaLoadDataSetError", VuforiaLoadDataSetError);
      VuforiaUnloadDataSetError = (function(_super) {
        __extends(VuforiaUnloadDataSetError, _super);
        function VuforiaUnloadDataSetError(message) {
          _super.call(this, message);
        }
        return VuforiaUnloadDataSetError;
      }(Error));
      exports_1("VuforiaUnloadDataSetError", VuforiaUnloadDataSetError);
      VuforiaActivateDataSetError = (function(_super) {
        __extends(VuforiaActivateDataSetError, _super);
        function VuforiaActivateDataSetError(message) {
          _super.call(this, message);
        }
        return VuforiaActivateDataSetError;
      }(Error));
      exports_1("VuforiaActivateDataSetError", VuforiaActivateDataSetError);
      VuforiaDeactivateDataSetError = (function(_super) {
        __extends(VuforiaDeactivateDataSetError, _super);
        function VuforiaDeactivateDataSetError(message) {
          _super.call(this, message);
        }
        return VuforiaDeactivateDataSetError;
      }(Error));
      exports_1("VuforiaDeactivateDataSetError", VuforiaDeactivateDataSetError);
      (function(VuforiaInitErrorCode) {
        VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_ERROR"] = -1] = "INIT_ERROR";
        VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_DEVICE_NOT_SUPPORTED"] = -2] = "INIT_DEVICE_NOT_SUPPORTED";
        VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_NO_CAMERA_ACCESS"] = -3] = "INIT_NO_CAMERA_ACCESS";
        VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_MISSING_KEY"] = -4] = "INIT_LICENSE_ERROR_MISSING_KEY";
        VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_INVALID_KEY"] = -5] = "INIT_LICENSE_ERROR_INVALID_KEY";
        VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_NO_NETWORK_PERMANENT"] = -6] = "INIT_LICENSE_ERROR_NO_NETWORK_PERMANENT";
        VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_NO_NETWORK_TRANSIENT"] = -7] = "INIT_LICENSE_ERROR_NO_NETWORK_TRANSIENT";
        VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_CANCELED_KEY"] = -8] = "INIT_LICENSE_ERROR_CANCELED_KEY";
        VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_LICENSE_ERROR_PRODUCT_TYPE_MISMATCH"] = -9] = "INIT_LICENSE_ERROR_PRODUCT_TYPE_MISMATCH";
        VuforiaInitErrorCode[VuforiaInitErrorCode["INIT_EXTERNAL_DEVICE_NOT_DETECTED"] = -10] = "INIT_EXTERNAL_DEVICE_NOT_DETECTED";
      })(VuforiaInitErrorCode || (VuforiaInitErrorCode = {}));
      exports_1("VuforiaInitErrorCode", VuforiaInitErrorCode);
      ;
      (function(VuforiaErrorType) {
        VuforiaErrorType[VuforiaErrorType["InitError"] = "InitError"] = "InitError";
        VuforiaErrorType[VuforiaErrorType["LoadDataSetError"] = "LoadDataSetError"] = "LoadDataSetError";
        VuforiaErrorType[VuforiaErrorType["UnloadDataSetError"] = "UnloadDataSetError"] = "UnloadDataSetError";
        VuforiaErrorType[VuforiaErrorType["ActivateDataSetError"] = "ActivateDataSetError"] = "ActivateDataSetError";
        VuforiaErrorType[VuforiaErrorType["DeactivateDataSetError"] = "DeactivateDataSetError"] = "DeactivateDataSetError";
      })(VuforiaErrorType || (VuforiaErrorType = {}));
      exports_1("VuforiaErrorType", VuforiaErrorType);
      VuforiaServiceDelegateBase = (function() {
        function VuforiaServiceDelegateBase() {
          this.updateEvent = new utils_1.Event();
          this.errorEvent = new utils_1.Event();
          this.dataSetLoadEvent = new utils_1.Event();
        }
        return VuforiaServiceDelegateBase;
      }());
      exports_1("VuforiaServiceDelegateBase", VuforiaServiceDelegateBase);
      VuforiaServiceDelegate = (function(_super) {
        __extends(VuforiaServiceDelegate, _super);
        function VuforiaServiceDelegate() {
          _super.apply(this, arguments);
        }
        VuforiaServiceDelegate.prototype.isSupported = function() {
          return false;
        };
        VuforiaServiceDelegate.prototype.init = function(options) {};
        VuforiaServiceDelegate.prototype.deinit = function() {};
        VuforiaServiceDelegate.prototype.startCamera = function() {};
        VuforiaServiceDelegate.prototype.stopCamera = function() {};
        VuforiaServiceDelegate.prototype.startObjectTracker = function() {};
        VuforiaServiceDelegate.prototype.stopObjectTracker = function() {};
        VuforiaServiceDelegate.prototype.hintMaxSimultaneousImageTargets = function(max) {};
        VuforiaServiceDelegate.prototype.setVideoBackgroundConfig = function(videoConfig) {};
        VuforiaServiceDelegate.prototype.loadDataSet = function(url) {};
        VuforiaServiceDelegate.prototype.unloadDataSet = function(url) {};
        VuforiaServiceDelegate.prototype.activateDataSet = function(url) {};
        VuforiaServiceDelegate.prototype.deactivateDataSet = function(url) {};
        VuforiaServiceDelegate.prototype.getVideoMode = function() {
          return null;
        };
        ;
        return VuforiaServiceDelegate;
      }(VuforiaServiceDelegateBase));
      exports_1("VuforiaServiceDelegate", VuforiaServiceDelegate);
      VuforiaRealitySetupHandler = (function() {
        function VuforiaRealitySetupHandler(sessionService, delegate) {
          this.sessionService = sessionService;
          this.delegate = delegate;
          this.type = 'vuforia';
        }
        VuforiaRealitySetupHandler.prototype.setup = function(reality, port) {
          var remoteRealitySession = this.sessionService.createSessionPort();
          remoteRealitySession.connectEvent.addEventListener(function() {
            remoteRealitySession.send('ar.vuforia.init');
            remoteRealitySession.send('ar.vuforia.startCamera');
          });
          var remove = this.delegate.updateEvent.addEventListener(function(frameState) {
            remoteRealitySession.send('ar.reality.frameState', frameState);
          });
          remoteRealitySession.closeEvent.addEventListener(function() {
            remove();
          });
          remoteRealitySession.open(port, {role: config_1.Role.REALITY});
        };
        VuforiaRealitySetupHandler = __decorate([aurelia_dependency_injection_1.inject(session_1.SessionService, VuforiaServiceDelegate)], VuforiaRealitySetupHandler);
        return VuforiaRealitySetupHandler;
      }());
      exports_1("VuforiaRealitySetupHandler", VuforiaRealitySetupHandler);
      VuforiaService = (function() {
        function VuforiaService(sessionService, focusService, realityService, delegate) {
          var _this = this;
          this.sessionService = sessionService;
          this.focusService = focusService;
          this.realityService = realityService;
          this.delegate = delegate;
          this._commandQueue = new utils_1.CommandQueue;
          this._sessionInitOptions = new WeakMap();
          this._sessionCameraStarted = new WeakMap();
          this._sessionObjectTrackerStarted = new WeakMap();
          this._sessionMaxSimultaneousImageTargets = new WeakMap();
          this._sessionLoadedDataSets = new WeakMap();
          this._sessionActivatedDataSets = new WeakMap();
          this._controllingSession = null;
          this._isInitialized = false;
          this._dataSetMap = new Map();
          if (sessionService.isManager()) {
            sessionService.connectEvent.addEventListener(function(session) {
              var loadedDataSets = new Set();
              _this._sessionLoadedDataSets.set(session, loadedDataSets);
              var activatedDataSets = new Set();
              _this._sessionActivatedDataSets.set(session, activatedDataSets);
              session.on['ar.vuforia.isSupported'] = function() {
                return delegate.isSupported();
              };
              session.on['ar.vuforia.init'] = function(options, event) {
                if (!delegate.isSupported())
                  return;
                _this._sessionInitOptions.set(session, options);
                if (_this._controllingSession === null || session === focusService.currentSession) {
                  _this._initVuforia(session);
                }
              };
              session.on['ar.vuforia.deinit'] = function(options, event) {
                if (session === _this._controllingSession) {
                  if (_this._sessionInitOptions.has(session)) {
                    _this._commandQueue.clear();
                    _this._commandQueue.push(function() {
                      return Promise.resolve(delegate.deinit()).then(function() {
                        _this._isInitialized = false;
                      });
                    }, session);
                  }
                }
                _this._sessionInitOptions.delete(session);
              };
              session.on['ar.vuforia.startCamera'] = function(message, event) {
                if (session === _this._controllingSession) {
                  if (!_this._sessionCameraStarted.get(session))
                    _this._commandQueue.push(function() {
                      return delegate.startCamera();
                    }), session;
                }
                _this._sessionCameraStarted.set(session, true);
              };
              session.on['ar.vuforia.stopCamera'] = function(message, event) {
                if (session === _this._controllingSession) {
                  if (_this._sessionCameraStarted.get(session))
                    _this._commandQueue.push(function() {
                      return delegate.stopCamera();
                    }, session);
                }
                _this._sessionCameraStarted.set(session, false);
              };
              session.on['ar.vuforia.startObjectTracker'] = function(message, event) {
                if (session === _this._controllingSession) {
                  if (!_this._sessionObjectTrackerStarted.get(session))
                    _this._commandQueue.push(function() {
                      return delegate.startObjectTracker();
                    }), session;
                }
                _this._sessionObjectTrackerStarted.set(session, true);
              };
              session.on['ar.vuforia.stopObjectTracker'] = function(message, event) {
                if (session === _this._controllingSession) {
                  if (_this._sessionObjectTrackerStarted.get(session))
                    _this._commandQueue.push(function() {
                      return delegate.stopObjectTracker();
                    }, session);
                }
                _this._sessionObjectTrackerStarted.set(session, false);
              };
              session.on['ar.vuforia.hintMaxSimultaneousImageTargets'] = function(_a) {
                var max = _a.max;
                if (session === _this._controllingSession) {
                  _this._commandQueue.push(function() {
                    return delegate.hintMaxSimultaneousImageTargets(max);
                  }, session);
                }
                _this._sessionMaxSimultaneousImageTargets.set(session, max);
              };
              session.on['ar.vuforia.loadDataSet'] = function(_a, event) {
                var url = _a.url;
                if (session === _this._controllingSession) {
                  if (!loadedDataSets.has(url))
                    _this._commandQueue.push(function() {
                      return delegate.loadDataSet(url);
                    }, session);
                }
                loadedDataSets.add(url);
              };
              session.on['ar.vuforia.unloadDataSet'] = function(_a, event) {
                var url = _a.url;
                if (session === _this._controllingSession) {
                  if (loadedDataSets.has(url))
                    _this._commandQueue.push(function() {
                      return delegate.unloadDataSet(url);
                    }, session);
                }
                loadedDataSets.delete(url);
                activatedDataSets.delete(url);
              };
              session.on['ar.vuforia.activateDataSet'] = function(_a, event) {
                var url = _a.url;
                if (session === _this._controllingSession) {
                  if (!loadedDataSets.has(url))
                    _this._commandQueue.push(function() {
                      return delegate.loadDataSet(url);
                    }, session);
                  if (!activatedDataSets.has(url))
                    _this._commandQueue.push(function() {
                      return delegate.activateDataSet(url);
                    }, session);
                }
                loadedDataSets.add(url);
                activatedDataSets.add(url);
              };
              session.on['ar.vuforia.deactivateDataSet'] = function(_a, event) {
                var url = _a.url;
                if (session === _this._controllingSession) {
                  if (activatedDataSets.has(url))
                    _this._commandQueue.push(function() {
                      return delegate.deactivateDataSet(url);
                    }, session);
                }
                activatedDataSets.delete(url);
              };
              session.closeEvent.addEventListener(function() {
                _this._commandQueue.push(function() {
                  return delegate.stopObjectTracker();
                }, session);
                loadedDataSets.forEach(function(url) {
                  _this._commandQueue.push(function() {
                    return delegate.deactivateDataSet(url);
                  }, session);
                  _this._commandQueue.push(function() {
                    return delegate.unloadDataSet(url);
                  }, session);
                });
                _this._controllingSession = null;
              });
            });
          }
          sessionService.manager.on['ar.vuforia.errorEvent'] = function(err, event) {
            var error = null;
            switch (err.type) {
              case VuforiaErrorType.InitError:
                error = new VuforiaInitError(err.message, err.data.code);
                break;
              case VuforiaErrorType.LoadDataSetError:
                error = new VuforiaLoadDataSetError(err.message);
                break;
              case VuforiaErrorType.UnloadDataSetError:
                error = new VuforiaUnloadDataSetError(err.message);
                break;
              case VuforiaErrorType.ActivateDataSetError:
                error = new VuforiaActivateDataSetError(err.message);
                break;
              default:
                error = new Error(err.message);
                break;
            }
            sessionService.errorEvent.raiseEvent(error);
          };
          sessionService.manager.on['ar.vuforia.dataSetLoadEvent'] = function(msg, event) {
            var url = msg.url,
                trackables = msg.trackables;
            var dataSet = _this._dataSetMap.get(url);
            dataSet._resolveTrackables(trackables);
          };
          focusService.sessionFocusEvent.addEventListener(function(session) {
            if (_this._sessionInitOptions.has(session)) {
              _this._initVuforia(session);
            }
          });
          delegate.errorEvent.addEventListener(function(msg) {
            var session = _this._commandQueue.currentUserData;
            if (msg.type === VuforiaErrorType.InitError) {
              _this._sessionInitOptions.delete(session);
              _this._controllingSession = null;
              _this._isInitialized = false;
              _this._commandQueue.clear();
            }
            session.send('ar.vuforia.errorEvent', msg);
          });
          delegate.dataSetLoadEvent.addEventListener(function(msg) {
            var session = _this._commandQueue.currentUserData;
            session.send('ar.vuforia.dataSetLoadEvent', msg);
          });
        }
        ;
        VuforiaService.prototype.isSupported = function() {
          return this.sessionService.manager.request('ar.vuforia.isSupported');
        };
        VuforiaService.prototype.init = function(options) {
          this.sessionService.manager.send('ar.vuforia.init', options);
        };
        VuforiaService.prototype.deinit = function() {
          this.sessionService.manager.send('ar.vuforia.deinit');
        };
        VuforiaService.prototype.startCamera = function() {
          this.sessionService.manager.send('ar.vuforia.startCamera');
        };
        VuforiaService.prototype.stopCamera = function() {
          this.sessionService.manager.send('ar.vuforia.stopCamera');
        };
        VuforiaService.prototype.startObjectTracker = function() {
          this.sessionService.manager.send('ar.vuforia.startObjectTracker');
        };
        VuforiaService.prototype.stopObjectTracker = function() {
          this.sessionService.manager.send('ar.vuforia.stopObjectTracker');
        };
        VuforiaService.prototype.hintMaxSimultaneousImageTargets = function(max) {
          this.sessionService.manager.send('ar.vuforia.hintMaxSimultaneousImageTargets', {max: max});
        };
        VuforiaService.prototype.createDataSet = function(url) {
          url = utils_1.resolveURL(url);
          var dataSet = new VuforiaDataSet(url, this.sessionService.manager);
          this._dataSetMap.set(url, dataSet);
          return dataSet;
        };
        VuforiaService.prototype._initVuforia = function(session) {
          var _this = this;
          var queue = this._commandQueue;
          var initOptions = this._sessionInitOptions.get(session);
          var maxSimultaneousImageTargets = this._sessionMaxSimultaneousImageTargets.get(session);
          var cameraStarted = this._sessionCameraStarted.get(session);
          var objectTrackerStarted = this._sessionObjectTrackerStarted.get(session);
          var loadedDataSets = this._sessionLoadedDataSets.get(session);
          var activatedDataSets = this._sessionActivatedDataSets.get(session);
          var delegate = this.delegate;
          if (this._isInitialized) {
            queue.clear();
            queue.push(function() {
              return delegate.deinit().then(function() {
                _this._isInitialized = false;
              });
            }, this._controllingSession);
          }
          this._controllingSession = session;
          queue.push(function() {
            _this._isInitialized = true;
            return delegate.init(initOptions || {});
          }, session);
          if (cameraStarted)
            queue.push(function() {
              return delegate.startCamera();
            }, session);
          if (objectTrackerStarted)
            queue.push(function() {
              return delegate.startObjectTracker();
            }, session);
          queue.push(function() {
            return delegate.hintMaxSimultaneousImageTargets(maxSimultaneousImageTargets || 1);
          }, session);
          loadedDataSets.forEach(function(url) {
            queue.push(function() {
              return delegate.loadDataSet(url);
            }, session);
          });
          activatedDataSets.forEach(function(url) {
            queue.push(function() {
              return delegate.activateDataSet(url);
            }, session);
          });
        };
        VuforiaService = __decorate([aurelia_dependency_injection_1.inject(session_1.SessionService, focus_1.FocusService, reality_1.RealityService, VuforiaServiceDelegate)], VuforiaService);
        return VuforiaService;
      }());
      exports_1("VuforiaService", VuforiaService);
      VuforiaDataSet = (function() {
        function VuforiaDataSet(url, manager) {
          var _this = this;
          this.url = url;
          this.manager = manager;
          this._loaded = false;
          this._activated = false;
          this._trackablesPromise = new Promise(function(resolve, reject) {
            _this._resolveTrackables = resolve;
          });
        }
        Object.defineProperty(VuforiaDataSet.prototype, "loaded", {
          get: function() {
            return this._loaded;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(VuforiaDataSet.prototype, "activated", {
          get: function() {
            return this._activated;
          },
          enumerable: true,
          configurable: true
        });
        VuforiaDataSet.prototype.load = function() {
          this._loaded = true;
          this.manager.send('ar.vuforia.loadDataSet', {url: this.url});
        };
        VuforiaDataSet.prototype.unload = function() {
          this._loaded = false;
          this._activated = false;
          this.manager.send('ar.vuforia.unloadDataSet', {url: this.url});
        };
        VuforiaDataSet.prototype.activate = function() {
          this._loaded = true;
          this._activated = true;
          this.manager.send('ar.vuforia.activateDataSet', {url: this.url});
        };
        VuforiaDataSet.prototype.deactivate = function() {
          this._activated = false;
          this.manager.send('ar.vuforia.deactivateDataSet', {url: this.url});
        };
        Object.defineProperty(VuforiaDataSet.prototype, "trackablesPromise", {
          get: function() {
            return this._trackablesPromise;
          },
          enumerable: true,
          configurable: true
        });
        return VuforiaDataSet;
      }());
      exports_1("VuforiaDataSet", VuforiaDataSet);
    }
  };
});

(function() {
var define = $__System.amdDefine;
define("12", ["exports", "3"], function(exports, _aureliaPal) {
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
define("b", ["exports", "12", "3"], function(exports, _aureliaMetadata, _aureliaPal) {
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
$__System.register("10", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Role;
  return {
    setters: [],
    execute: function() {
      (function(Role) {
        Role[Role["APPLICATION"] = "Application"] = "APPLICATION";
        Role[Role["REALITY"] = "Reality"] = "REALITY";
        Role[Role["MANAGER"] = "Manager"] = "MANAGER";
      })(Role || (Role = {}));
      exports_1("Role", Role);
    }
  };
});

$__System.register("6", ["5", "b", "10", "8"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var cesium_imports_1,
      aurelia_dependency_injection_1,
      config_1,
      utils_1;
  var SessionPort,
      SessionPortFactory,
      ConnectService,
      SessionService,
      LoopbackConnectService,
      DOMConnectService,
      DebugConnectService,
      WKWebViewConnectService;
  return {
    setters: [function(cesium_imports_1_1) {
      cesium_imports_1 = cesium_imports_1_1;
    }, function(aurelia_dependency_injection_1_1) {
      aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
    }, function(config_1_1) {
      config_1 = config_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }],
    execute: function() {
      SessionPort = (function() {
        function SessionPort() {
          var _this = this;
          this._connectEvent = new utils_1.Event();
          this.closeEvent = new utils_1.Event();
          this.errorEvent = new utils_1.Event();
          this.on = {};
          this._isOpened = false;
          this._isConnected = false;
          this._isClosed = false;
          this.on[SessionPort.OPEN] = function(info) {
            _this.info = info;
            _this.connectEvent.raiseEvent(null);
            _this._isConnected = true;
          };
          this.on[SessionPort.CLOSE] = function(message) {
            _this.close();
          };
          this.on[SessionPort.ERROR] = function(error) {
            _this.errorEvent.raiseEvent(new Error(error.message));
          };
          this.errorEvent.addEventListener(function(error) {
            if (_this.errorEvent.numberOfListeners === 1)
              console.error(error);
          });
        }
        Object.defineProperty(SessionPort.prototype, "connectEvent", {
          get: function() {
            if (this._isConnected)
              console.warn("Probable developer error. \n                The connectEvent only fires once and the \n                session is already connected.");
            return this._connectEvent;
          },
          enumerable: true,
          configurable: true
        });
        ;
        SessionPort.prototype.open = function(messagePort, options) {
          var _this = this;
          this.messagePort = messagePort;
          if (this._isOpened)
            throw new Error('Session.open: Session can only be opened once');
          if (this._isClosed)
            throw new Error('Session.open: Session has already been closed');
          this._isOpened = true;
          this.send(SessionPort.OPEN, options);
          this.messagePort.onmessage = function(evt) {
            if (_this._isClosed)
              return;
            var id = evt.data[0];
            var topic = evt.data[1];
            var message = evt.data[2];
            var expectsResponse = evt.data[3];
            var handler = _this.on[topic];
            if (handler && !expectsResponse) {
              handler(message, evt);
            } else if (handler) {
              Promise.resolve(handler(message, evt)).then(function(response) {
                if (_this._isClosed)
                  return;
                _this.send(topic + ':resolve:' + id, response);
              }).catch(function(error) {
                if (_this._isClosed)
                  return;
                var errorMessage;
                if (typeof error === 'string')
                  errorMessage = error;
                else if (typeof error.message === 'string')
                  errorMessage = error.message;
                _this.send(topic + ':reject:' + id, {errorMessage: errorMessage});
              });
            } else {
              var error = {message: 'Unable to handle message ' + topic};
              _this.send(SessionPort.ERROR, error);
              throw new Error('No handlers are available for topic ' + topic);
            }
          };
        };
        SessionPort.prototype.send = function(topic, message) {
          if (!this._isOpened)
            throw new Error('Session.send: Session must be open to send messages');
          if (this._isClosed)
            return false;
          var id = cesium_imports_1.createGuid();
          this.messagePort.postMessage([id, topic, message]);
          return true;
        };
        SessionPort.prototype.sendError = function(errorMessage) {
          return this.send(SessionPort.ERROR, errorMessage);
        };
        SessionPort.prototype.request = function(topic, message) {
          var _this = this;
          if (!this._isOpened || this._isClosed)
            return Promise.reject(new Error('Session.request: Session must be open to make requests'));
          var id = cesium_imports_1.createGuid();
          var resolveTopic = topic + ':resolve:' + id;
          var rejectTopic = topic + ':reject:' + id;
          this.messagePort.postMessage([id, topic, message, true]);
          return new Promise(function(resolve, reject) {
            _this.on[resolveTopic] = function(message) {
              delete _this.on[resolveTopic];
              delete _this.on[rejectTopic];
              resolve(message);
            };
            _this.on[rejectTopic] = function(message) {
              delete _this.on[resolveTopic];
              delete _this.on[rejectTopic];
              reject(message);
            };
          });
        };
        SessionPort.prototype.close = function() {
          if (this._isClosed)
            return;
          if (this._isOpened) {
            this.send(SessionPort.CLOSE);
          }
          this._isClosed = true;
          if (this.messagePort && this.messagePort.close)
            this.messagePort.close();
          this.closeEvent.raiseEvent(null);
        };
        SessionPort.OPEN = 'ar.session.open';
        SessionPort.CLOSE = 'ar.session.close';
        SessionPort.ERROR = 'ar.session.error';
        return SessionPort;
      }());
      exports_1("SessionPort", SessionPort);
      SessionPortFactory = (function() {
        function SessionPortFactory() {}
        SessionPortFactory.prototype.create = function() {
          return new SessionPort();
        };
        return SessionPortFactory;
      }());
      exports_1("SessionPortFactory", SessionPortFactory);
      ConnectService = (function() {
        function ConnectService() {}
        return ConnectService;
      }());
      exports_1("ConnectService", ConnectService);
      SessionService = (function() {
        function SessionService(configuration, connectService, sessionPortFactory, messageChannelFactory) {
          var _this = this;
          this.configuration = configuration;
          this.connectService = connectService;
          this.sessionPortFactory = sessionPortFactory;
          this.messageChannelFactory = messageChannelFactory;
          this.manager = this.createSessionPort();
          this.errorEvent = new utils_1.Event();
          this._connectEvent = new utils_1.Event();
          this._managedSessions = [];
          this.errorEvent.addEventListener(function(error) {
            if (_this.errorEvent.numberOfListeners === 1)
              console.error(error);
          });
          this.manager.errorEvent.addEventListener(function(error) {
            _this.errorEvent.raiseEvent(error);
          });
          Object.freeze(this);
        }
        Object.defineProperty(SessionService.prototype, "connectEvent", {
          get: function() {
            this.ensureIsManager();
            return this._connectEvent;
          },
          enumerable: true,
          configurable: true
        });
        ;
        Object.defineProperty(SessionService.prototype, "managedSessions", {
          get: function() {
            this.ensureIsManager();
            return this._managedSessions;
          },
          enumerable: true,
          configurable: true
        });
        SessionService.prototype.connect = function() {
          this.connectService.connect(this);
        };
        SessionService.prototype.addManagedSessionPort = function() {
          var _this = this;
          this.ensureIsManager();
          var session = this.sessionPortFactory.create();
          session.errorEvent.addEventListener(function(error) {
            _this.errorEvent.raiseEvent(error);
          });
          session.connectEvent.addEventListener(function() {
            _this.managedSessions.push(session);
            _this.connectEvent.raiseEvent(session);
          });
          session.closeEvent.addEventListener(function() {
            var index = _this.managedSessions.indexOf(session);
            if (index > -1)
              _this.managedSessions.splice(index);
          });
          return session;
        };
        SessionService.prototype.createSessionPort = function() {
          return this.sessionPortFactory.create();
        };
        SessionService.prototype.createMessageChannel = function() {
          return this.messageChannelFactory.create();
        };
        SessionService.prototype.isManager = function() {
          return this.configuration.role === config_1.Role.MANAGER;
        };
        SessionService.prototype.isApplication = function() {
          return this.configuration.role === config_1.Role.APPLICATION;
        };
        SessionService.prototype.isReality = function() {
          return this.configuration.role === config_1.Role.REALITY;
        };
        SessionService.prototype.ensureIsManager = function() {
          if (!this.isManager)
            throw new Error('An manager-only API was accessed in a non-manager session.');
        };
        SessionService = __decorate([aurelia_dependency_injection_1.inject('config', ConnectService, SessionPortFactory, utils_1.MessageChannelFactory)], SessionService);
        return SessionService;
      }());
      exports_1("SessionService", SessionService);
      LoopbackConnectService = (function(_super) {
        __extends(LoopbackConnectService, _super);
        function LoopbackConnectService() {
          _super.apply(this, arguments);
        }
        LoopbackConnectService.prototype.connect = function(sessionService) {
          var messageChannel = sessionService.createMessageChannel();
          var messagePort = messageChannel.port1;
          messageChannel.port2.onmessage = function(evt) {
            messageChannel.port2.postMessage(evt.data);
          };
          sessionService.manager.connectEvent.addEventListener(function() {
            sessionService.connectEvent.raiseEvent(sessionService.manager);
          });
          sessionService.manager.open(messagePort, sessionService.configuration);
        };
        return LoopbackConnectService;
      }(ConnectService));
      exports_1("LoopbackConnectService", LoopbackConnectService);
      DOMConnectService = (function(_super) {
        __extends(DOMConnectService, _super);
        function DOMConnectService() {
          _super.apply(this, arguments);
        }
        DOMConnectService.isAvailable = function() {
          return typeof window !== 'undefined' && typeof window.parent !== 'undefined';
        };
        DOMConnectService.prototype.connect = function(sessionService) {
          var messageChannel = sessionService.createMessageChannel();
          var postMessagePortToParent = function() {
            return window.parent.postMessage({type: 'ARGON_SESSION'}, '*', [messageChannel.port1]);
          };
          if (document.readyState === 'complete')
            postMessagePortToParent();
          else
            document.addEventListener('load', postMessagePortToParent);
          sessionService.manager.open(messageChannel.port2, sessionService.configuration);
        };
        return DOMConnectService;
      }(ConnectService));
      exports_1("DOMConnectService", DOMConnectService);
      DebugConnectService = (function(_super) {
        __extends(DebugConnectService, _super);
        function DebugConnectService() {
          _super.apply(this, arguments);
        }
        DebugConnectService.isAvailable = function() {
          return typeof window !== 'undefined' && !!window['__ARGON_DEBUG_PORT__'];
        };
        DebugConnectService.prototype.connect = function(_a) {
          var manager = _a.manager,
              configuration = _a.configuration;
          manager.open(window['__ARGON_DEBUG_PORT__'], configuration);
        };
        return DebugConnectService;
      }(ConnectService));
      exports_1("DebugConnectService", DebugConnectService);
      WKWebViewConnectService = (function(_super) {
        __extends(WKWebViewConnectService, _super);
        function WKWebViewConnectService() {
          _super.apply(this, arguments);
        }
        WKWebViewConnectService.isAvailable = function() {
          return typeof window !== 'undefined' && window['webkit'] && window['webkit'].messageHandlers;
        };
        WKWebViewConnectService.prototype.connect = function(sessionService) {
          var messageChannel = sessionService.createMessageChannel();
          messageChannel.port2.onmessage = function(event) {
            webkit.messageHandlers.argon.postMessage(JSON.stringify(event.data));
          };
          window['__ARGON_PORT__'] = messageChannel.port2;
          sessionService.manager.open(messageChannel.port1, sessionService.configuration);
          window.addEventListener("beforeunload", function() {
            sessionService.manager.close();
          });
        };
        return WKWebViewConnectService;
      }(ConnectService));
      exports_1("WKWebViewConnectService", WKWebViewConnectService);
    }
  };
});

$__System.register("a", ["b", "6", "8"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var aurelia_dependency_injection_1,
      session_1,
      utils_1;
  var ViewportService;
  return {
    setters: [function(aurelia_dependency_injection_1_1) {
      aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
    }, function(session_1_1) {
      session_1 = session_1_1;
    }, function(utils_1_1) {
      utils_1 = utils_1_1;
    }],
    execute: function() {
      ViewportService = (function() {
        function ViewportService(sessionService) {
          var _this = this;
          this.sessionService = sessionService;
          this.changeEvent = new utils_1.Event();
          this.desiredViewportMap = new WeakMap();
          if (typeof document !== 'undefined') {
            var viewportMetaTag = document.querySelector('meta[name=viewport]');
            if (!viewportMetaTag)
              viewportMetaTag = document.createElement('meta');
            viewportMetaTag.name = 'viewport';
            viewportMetaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
            document.head.appendChild(viewportMetaTag);
            var argonView_1 = document.querySelector('#argon');
            if (!argonView_1)
              argonView_1 = document.createElement('div');
            argonView_1.id = 'argon';
            document.documentElement.appendChild(argonView_1);
            this.element = argonView_1;
            if (document.body)
              document.body.appendChild(argonView_1);
            else {
              document.addEventListener('DOMContentLoaded', function() {
                document.body.appendChild(argonView_1);
              });
            }
            var style = document.createElement("style");
            style.type = 'text/css';
            document.head.appendChild(style);
            var sheet = style.sheet;
            sheet.insertRule("\n                #argon {\n                    position: fixed;\n                    transform: translateZ(0px);\n                    z-index: -9999;\n                    left: 0px;\n                    bottom: 0px;\n                    width: 100%;\n                    height: 100%;\n                    margin: 0;\n                    border: 0;\n                    padding: 0;\n                }\n            ", 0);
            sheet.insertRule("\n                #argon > * {\n                    position: absolute;\n                    transform: translateZ(0px);\n                    left: 0px;\n                    bottom: 0px;\n                    width: inherit;\n                    height: inherit;\n                }\n            ", 1);
            this.changeEvent.addEventListener(function() {
              _this.element.style.left = _this.current.x + 'px';
              _this.element.style.bottom = _this.current.y + 'px';
              _this.element.style.width = _this.current.width + 'px';
              _this.element.style.height = _this.current.height + 'px';
            });
          }
          if (this.sessionService.isManager()) {
            this.sessionService.connectEvent.addEventListener(function(session) {
              session.on['ar.viewport.desired'] = function(viewport) {
                _this.desiredViewportMap.set(session, viewport);
              };
            });
          }
        }
        ViewportService.prototype.getSuggested = function() {
          if (typeof document !== 'undefined') {
            return {
              x: 0,
              y: 0,
              width: document.documentElement.clientWidth,
              height: document.documentElement.clientHeight
            };
          }
          return {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        };
        ViewportService.prototype.setDesired = function(viewport) {
          this.desired = viewport;
          this.sessionService.manager.send('ar.viewport.desired', viewport);
        };
        ViewportService.prototype._setViewport = function(viewport) {
          var previous = this.current;
          if (!previous || previous.x !== viewport.x || previous.y !== viewport.y || previous.width !== viewport.width || previous.height !== viewport.height) {
            this.current = viewport;
            this.changeEvent.raiseEvent({previous: previous});
          }
        };
        ViewportService = __decorate([aurelia_dependency_injection_1.inject(session_1.SessionService)], ViewportService);
        return ViewportService;
      }());
      exports_1("ViewportService", ViewportService);
    }
  };
});

(function() {
var define = $__System.amdDefine;
define("13", ["14", "15", "16", "17"], function(defined, defineProperties, DeveloperError, Event) {
  "use strict";
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
define("18", ["19"], function(freezeObject) {
  "use strict";
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
define("1a", ["14"], function(defined) {
  "use strict";
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
define("1b", ["18", "1c", "1d", "14", "16", "17", "1a", "1e"], function(ClockRange, ClockStep, defaultValue, defined, DeveloperError, Event, getTimestamp, JulianDate) {
  "use strict";
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
define("1c", ["19"], function(freezeObject) {
  "use strict";
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
define("1f", ["20", "14", "15", "16", "21", "22", "23"], function(createGuid, defined, defineProperties, DeveloperError, CesiumMath, Entity, EntityCollection) {
  "use strict";
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
  function CompositeEntityCollection(collections) {
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
define("24", ["14", "15", "16"], function(defined, defineProperties, DeveloperError) {
  "use strict";
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
define("20", [], function() {
  "use strict";
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
define("25", ["26", "1d", "14", "15", "16", "17", "27", "28"], function(Cartesian3, defaultValue, defined, defineProperties, DeveloperError, Event, ReferenceFrame, PositionProperty) {
  "use strict";
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
define("29", ["1d", "14", "15", "16", "17"], function(defaultValue, defined, defineProperties, DeveloperError, Event) {
  "use strict";
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
define("2a", ["1d", "14", "29"], function(defaultValue, defined, ConstantProperty) {
  "use strict";
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
define("2b", ["2a"], function(createPropertyDescriptor) {
  "use strict";
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
define("22", ["26", "20", "1d", "14", "15", "16", "17", "2c", "2d", "2e", "2f", "@empty", "@empty", "25", "@empty", "2a", "2b", "@empty", "@empty", "@empty", "@empty", "@empty", "@empty", "@empty", "@empty", "@empty", "@empty", "30", "@empty", "@empty"], function(Cartesian3, createGuid, defaultValue, defined, defineProperties, DeveloperError, Event, Matrix3, Matrix4, Quaternion, Transforms, BillboardGraphics, BoxGraphics, ConstantPositionProperty, CorridorGraphics, createPropertyDescriptor, createRawPropertyDescriptor, CylinderGraphics, EllipseGraphics, EllipsoidGraphics, LabelGraphics, ModelGraphics, PathGraphics, PointGraphics, PolygonGraphics, PolylineGraphics, PolylineVolumeGraphics, Property, RectangleGraphics, WallGraphics) {
  "use strict";
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
        return this._show && (!defined(this._parent) || this._parent.isShowing);
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
define("23", ["24", "20", "14", "15", "16", "17", "31", "1e", "32", "33", "22"], function(AssociativeArray, createGuid, defined, defineProperties, DeveloperError, Event, Iso8601, JulianDate, RuntimeError, TimeInterval, Entity) {
  "use strict";
  var entityOptionsScratch = {id: undefined};
  function fireChangedEvent(collection) {
    if (collection._suspendCount === 0) {
      var added = collection._addedEntities;
      var removed = collection._removedEntities;
      var changed = collection._changedEntities;
      if (changed.length !== 0 || added.length !== 0 || removed.length !== 0) {
        collection._collectionChanged.raiseEvent(collection, added.values, removed.values, changed.values);
        added.removeAll();
        removed.removeAll();
        changed.removeAll();
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
define("34", ["26", "35", "1d", "14", "15", "16", "36"], function(Cartesian3, Cartographic, defaultValue, defined, defineProperties, DeveloperError, Ellipsoid) {
  "use strict";
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
define("37", ["1d", "14", "16", "21"], function(defaultValue, defined, DeveloperError, CesiumMath) {
  "use strict";
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
define("38", ["14", "15", "16", "2c", "2e", "27", "2f"], function(defined, defineProperties, DeveloperError, Matrix3, Quaternion, ReferenceFrame, Transforms) {
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
    while (defined(frame) && frame !== null) {
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
  var scratchMatrix3 = new Matrix3();
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
    if (inputFrame === null || outputFrame === null) {
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
define("39", ["19"], function(freezeObject) {
  "use strict";
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
define("3a", ["26", "14", "16", "19"], function(Cartesian3, defined, DeveloperError, freezeObject) {
  "use strict";
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
define("3b", ["26", "1d", "14", "16", "39", "3a"], function(Cartesian3, defaultValue, defined, DeveloperError, Intersect, Plane) {
  "use strict";
  function CullingVolume(planes) {
    this.planes = defaultValue(planes, []);
  }
  var scratchPlane = new Plane(new Cartesian3(), 0.0);
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
define("3c", ["3d", "26", "3e", "1d", "14", "15", "16", "2d", "3b"], function(Cartesian2, Cartesian3, Cartesian4, defaultValue, defined, defineProperties, DeveloperError, Matrix4, CullingVolume) {
  "use strict";
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
define("3f", ["14", "15", "16", "3c"], function(defined, defineProperties, DeveloperError, PerspectiveOffCenterFrustum) {
  "use strict";
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
  }
  function update(frustum) {
    if (!defined(frustum.fov) || !defined(frustum.aspectRatio) || !defined(frustum.near) || !defined(frustum.far)) {
      throw new DeveloperError('fov, aspectRatio, near, or far parameters are not set.');
    }
    var f = frustum._offCenterFrustum;
    if (frustum.fov !== frustum._fov || frustum.aspectRatio !== frustum._aspectRatio || frustum.near !== frustum._near || frustum.far !== frustum._far) {
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
      f.top = frustum.near * Math.tan(0.5 * frustum._fovy);
      f.bottom = -f.top;
      f.right = frustum.aspectRatio * f.top;
      f.left = -f.right;
      f.near = frustum.near;
      f.far = frustum.far;
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
define("40", ["14", "15", "16", "17", "30"], function(defined, defineProperties, DeveloperError, Event, Property) {
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
define("41", ["14", "15", "16", "17", "32", "30"], function(defined, defineProperties, DeveloperError, Event, RuntimeError, Property) {
  "use strict";
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
define("27", ["19"], function(freezeObject) {
  "use strict";
  var ReferenceFrame = {
    FIXED: 0,
    INERTIAL: 1
  };
  return freezeObject(ReferenceFrame);
});

})();
(function() {
var define = $__System.amdDefine;
define("28", ["26", "14", "15", "16", "2c", "2d", "2e", "27", "2f"], function(Cartesian3, defined, defineProperties, DeveloperError, Matrix3, Matrix4, Quaternion, ReferenceFrame, Transforms) {
  "use strict";
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
    while (defined(frame) && frame !== null) {
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
    if (inputFrame === null || outputFrame === null) {
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
define("33", ["1d", "14", "15", "16", "19", "1e"], function(defaultValue, defined, defineProperties, DeveloperError, freezeObject, JulianDate) {
  "use strict";
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
define("31", ["19", "1e", "33"], function(freezeObject, JulianDate, TimeInterval) {
  "use strict";
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
define("30", ["1d", "14", "15", "16", "31"], function(defaultValue, defined, defineProperties, DeveloperError, Iso8601) {
  "use strict";
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
define("42", ["26", "1d", "14", "15", "16", "17", "27", "28", "30", "43"], function(Cartesian3, defaultValue, defined, defineProperties, DeveloperError, Event, ReferenceFrame, PositionProperty, Property, SampledProperty) {
  "use strict";
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
define("17", ["14", "15", "16"], function(defined, defineProperties, DeveloperError) {
  "use strict";
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
define("44", ["19"], function(freezeObject) {
  "use strict";
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
define("45", ["14", "16"], function(defined, DeveloperError) {
  "use strict";
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
define("43", ["46", "1d", "14", "15", "16", "17", "44", "1e", "45"], function(binarySearch, defaultValue, defined, defineProperties, DeveloperError, Event, ExtrapolationType, JulianDate, LinearApproximation) {
  "use strict";
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
define("3d", ["1d", "14", "16", "19", "21"], function(defaultValue, defined, DeveloperError, freezeObject, CesiumMath) {
  "use strict";
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
define("47", ["48", "46", "1d", "14", "49", "19", "1e", "4a", "4b", "32", "4c", "4d"], function(when, binarySearch, defaultValue, defined, EarthOrientationParametersSample, freezeObject, JulianDate, LeapSecond, loadJson, RuntimeError, TimeConstants, TimeStandard) {
  "use strict";
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
define("49", [], function() {
  "use strict";
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
define("35", ["26", "1d", "14", "16", "19", "21", "4e"], function(Cartesian3, defaultValue, defined, DeveloperError, freezeObject, CesiumMath, scaleToGeodeticSurface) {
  "use strict";
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
define("4e", ["26", "14", "16", "21"], function(Cartesian3, defined, DeveloperError, CesiumMath) {
  "use strict";
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
define("36", ["26", "35", "1d", "14", "15", "16", "19", "21", "4e"], function(Cartesian3, Cartographic, defaultValue, defined, defineProperties, DeveloperError, freezeObject, CesiumMath, scaleToGeodeticSurface) {
  "use strict";
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
define("4f", [], function() {
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
define("50", ["4f", "14", "16", "require"], function(Uri, defined, DeveloperError, require) {
  "use strict";
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
    baseUrl = new Uri(baseUrlString).resolve(new Uri(document.location.href));
    return baseUrl;
  }
  function buildModuleUrlFromRequireToUrl(moduleID) {
    return require.toUrl('../' + moduleID);
  }
  function buildModuleUrlFromBaseUrl(moduleID) {
    return new Uri(moduleID).resolve(getCesiumBaseUrl()).toString();
  }
  var implementation;
  var a;
  function buildModuleUrl(moduleID) {
    if (!defined(implementation)) {
      if (defined(require.toUrl)) {
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
define("51", ["1d"], function(defaultValue) {
  "use strict";
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
  define("48", [], function() {
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
define("52", [], function() {
  "use strict";
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
define("53", ["14", "52"], function(defined, parseResponseHeaders) {
  "use strict";
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
define("54", ["48", "1d", "14", "16", "53", "32"], function(when, defaultValue, defined, DeveloperError, RequestErrorEvent, RuntimeError) {
  "use strict";
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
define("55", ["54"], function(loadWithXhr) {
  "use strict";
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
define("4b", ["51", "14", "16", "55"], function(clone, defined, DeveloperError, loadText) {
  "use strict";
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
define("56", ["48", "50", "1d", "14", "57", "1e", "4b", "4d"], function(when, buildModuleUrl, defaultValue, defined, Iau2006XysSample, JulianDate, loadJson, TimeStandard) {
  "use strict";
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
define("57", [], function() {
  "use strict";
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
define("58", [], function() {
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
define("46", ["14", "16"], function(defined, DeveloperError) {
  "use strict";
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
define("59", [], function() {
  "use strict";
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
define("5a", ["16"], function(DeveloperError) {
  "use strict";
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
define("4a", [], function() {
  "use strict";
  function LeapSecond(date, offset) {
    this.julianDate = date;
    this.offset = offset;
  }
  return LeapSecond;
});

})();
(function() {
var define = $__System.amdDefine;
define("4d", ["19"], function(freezeObject) {
  "use strict";
  var TimeStandard = {
    UTC: 0,
    TAI: 1
  };
  return freezeObject(TimeStandard);
});

})();
(function() {
var define = $__System.amdDefine;
define("1e", ["58", "46", "1d", "14", "16", "59", "5a", "4a", "4c", "4d"], function(sprintf, binarySearch, defaultValue, defined, DeveloperError, GregorianDate, isLeapYear, LeapSecond, TimeConstants, TimeStandard) {
  "use strict";
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
define("3e", ["1d", "14", "16", "19", "21"], function(defaultValue, defined, DeveloperError, freezeObject, CesiumMath) {
  "use strict";
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
define("32", ["14"], function(defined) {
  "use strict";
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
define("2d", ["26", "3e", "1d", "14", "16", "19", "21", "2c", "32"], function(Cartesian3, Cartesian4, defaultValue, defined, DeveloperError, freezeObject, CesiumMath, Matrix3, RuntimeError) {
  "use strict";
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
  var fromCameraS = new Cartesian3();
  var fromCameraU = new Cartesian3();
  Matrix4.fromCamera = function(camera, result) {
    if (!defined(camera)) {
      throw new DeveloperError('camera is required.');
    }
    var eye = camera.eye;
    var target = camera.target;
    var up = camera.up;
    if (!defined(eye)) {
      throw new DeveloperError('camera.eye is required.');
    }
    if (!defined(target)) {
      throw new DeveloperError('camera.target is required.');
    }
    if (!defined(up)) {
      throw new DeveloperError('camera.up is required.');
    }
    Cartesian3.normalize(Cartesian3.subtract(target, eye, fromCameraF), fromCameraF);
    Cartesian3.normalize(Cartesian3.cross(fromCameraF, up, fromCameraS), fromCameraS);
    Cartesian3.normalize(Cartesian3.cross(fromCameraS, fromCameraF, fromCameraU), fromCameraU);
    var sX = fromCameraS.x;
    var sY = fromCameraS.y;
    var sZ = fromCameraS.z;
    var fX = fromCameraF.x;
    var fY = fromCameraF.y;
    var fZ = fromCameraF.z;
    var uX = fromCameraU.x;
    var uY = fromCameraU.y;
    var uZ = fromCameraU.z;
    var eyeX = eye.x;
    var eyeY = eye.y;
    var eyeZ = eye.z;
    var t0 = sX * -eyeX + sY * -eyeY + sZ * -eyeZ;
    var t1 = uX * -eyeX + uY * -eyeY + uZ * -eyeZ;
    var t2 = fX * eyeX + fY * eyeY + fZ * eyeZ;
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
define("15", ["14"], function(defined) {
  "use strict";
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
define("5b", ["14", "15"], function(defined, defineProperties) {
  "use strict";
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
      if (defined(document[name])) {
        _names.fullscreenEnabled = name;
      } else {
        name = prefix + 'FullScreenEnabled';
        if (defined(document[name])) {
          _names.fullscreenEnabled = name;
        }
      }
      name = prefix + 'FullscreenElement';
      if (defined(document[name])) {
        _names.fullscreenElement = name;
      } else {
        name = prefix + 'FullScreenElement';
        if (defined(document[name])) {
          _names.fullscreenElement = name;
        }
      }
      name = prefix + 'fullscreenchange';
      if (defined(document['on' + name])) {
        if (prefix === 'ms') {
          name = 'MSFullscreenChange';
        }
        _names.fullscreenchange = name;
      }
      name = prefix + 'fullscreenerror';
      if (defined(document['on' + name])) {
        if (prefix === 'ms') {
          name = 'MSFullscreenError';
        }
        _names.fullscreenerror = name;
      }
    }
    return _supportsFullscreen;
  };
  Fullscreen.requestFullscreen = function(element) {
    if (!Fullscreen.supportsFullscreen()) {
      return;
    }
    element[_names.requestFullscreen]();
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
define("5c", ["1d", "14", "5b"], function(defaultValue, defined, Fullscreen) {
  "use strict";
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
    supportsPointerEvents: supportsPointerEvents
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
define("26", ["1d", "14", "16", "19", "21"], function(defaultValue, defined, DeveloperError, freezeObject, CesiumMath) {
  "use strict";
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
define("5d", [], function() {
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
define("1d", ["19"], function(freezeObject) {
  "use strict";
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
define("16", ["14"], function(defined) {
  "use strict";
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
define("21", ["5d", "1d", "14", "16"], function(MersenneTwister, defaultValue, defined, DeveloperError) {
  "use strict";
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
  CesiumMath.fog = function(distanceToCamera, density) {
    var scalar = distanceToCamera * density;
    return 1.0 - Math.exp(-(scalar * scalar));
  };
  return CesiumMath;
});

})();
(function() {
var define = $__System.amdDefine;
define("2c", ["26", "1d", "14", "16", "19", "21"], function(Cartesian3, defaultValue, defined, DeveloperError, freezeObject, CesiumMath) {
  "use strict";
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
define("2e", ["26", "1d", "14", "16", "5c", "19", "21", "2c"], function(Cartesian3, defaultValue, defined, DeveloperError, FeatureDetection, freezeObject, CesiumMath, Matrix3) {
  "use strict";
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
define("14", [], function() {
  "use strict";
  function defined(value) {
    return value !== undefined;
  }
  return defined;
});

})();
(function() {
var define = $__System.amdDefine;
define("19", ["14"], function(defined) {
  "use strict";
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
define("4c", ["19"], function(freezeObject) {
  "use strict";
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
define("2f", ["48", "3d", "26", "3e", "1d", "14", "16", "47", "49", "36", "56", "57", "1e", "21", "2c", "2d", "2e", "4c"], function(when, Cartesian2, Cartesian3, Cartesian4, defaultValue, defined, DeveloperError, EarthOrientationParameters, EarthOrientationParametersSample, Ellipsoid, Iau2006XysData, Iau2006XysSample, JulianDate, CesiumMath, Matrix3, Matrix4, Quaternion, TimeConstants) {
  "use strict";
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
  return Transforms;
});

})();
$__System.register("5e", ["5"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var cesium_imports_ts_1;
  var __slice,
      after;
  function removeBeforeDate(property, time) {
    var times = property._times;
    var index = ~cesium_imports_ts_1.binarySearch(times, time, cesium_imports_ts_1.JulianDate.compare);
    if (index > 0) {
      times.splice(0, index);
      property._values.splice(0, index * property._innerType.packedLength);
      property._updateTableLength = true;
      property._definitionChanged.raiseEvent(property);
    }
  }
  function removeOldSamples(property, maxNumSamples) {
    if (maxNumSamples === undefined)
      maxNumSamples = 10;
    var removeCount = property._times.length - maxNumSamples;
    if (removeCount > 0) {
      property._times.splice(0, removeCount);
      property._values.splice(0, removeCount * property._innerType.packedLength);
      property._updateTableLength = true;
    }
  }
  return {
    setters: [function(cesium_imports_ts_1_1) {
      cesium_imports_ts_1 = cesium_imports_ts_1_1;
    }],
    execute: function() {
      cesium_imports_ts_1.Matrix3['prototype'].length = 9;
      cesium_imports_ts_1.Matrix4['prototype'].length = 16;
      __slice = Array.prototype.slice;
      after = function(fn, after) {
        return function() {
          var result = fn.apply(this, arguments);
          after.call(this, result);
          return result;
        };
      };
      cesium_imports_ts_1.SampledProperty.prototype.removeSamplesBeforeDate = function(time) {
        removeBeforeDate(this, time);
      };
      cesium_imports_ts_1.SampledPositionProperty.prototype.removeSamplesBeforeDate = function(time) {
        removeBeforeDate(this._property, time);
      };
      cesium_imports_ts_1.SampledProperty.prototype.addSample = after(cesium_imports_ts_1.SampledProperty.prototype.addSample, function() {
        removeOldSamples(this, this.maxNumSamples);
      });
      cesium_imports_ts_1.SampledProperty.prototype.addSamples = after(cesium_imports_ts_1.SampledProperty.prototype.addSamples, function() {
        removeOldSamples(this, this.maxNumSamples);
      });
      cesium_imports_ts_1.SampledProperty.prototype.addSamplesPackedArray = after(cesium_imports_ts_1.SampledProperty.prototype.addSamplesPackedArray, function() {
        removeOldSamples(this, this.maxNumSamples);
      });
      cesium_imports_ts_1.SampledPositionProperty.prototype.addSample = after(cesium_imports_ts_1.SampledPositionProperty.prototype.addSample, function() {
        removeOldSamples(this._property, this.maxNumSamples);
      });
      cesium_imports_ts_1.SampledPositionProperty.prototype.addSamples = after(cesium_imports_ts_1.SampledPositionProperty.prototype.addSamples, function() {
        removeOldSamples(this._property, this.maxNumSamples);
      });
      cesium_imports_ts_1.SampledPositionProperty.prototype.addSamplesPackedArray = after(cesium_imports_ts_1.SampledPositionProperty.prototype.addSamplesPackedArray, function() {
        removeOldSamples(this._property, this.maxNumSamples);
      });
    }
  };
});

$__System.register("5", ["46", "13", "3d", "26", "3e", "1b", "1c", "1f", "25", "29", "20", "1d", "14", "16", "36", "22", "23", "17", "44", "34", "37", "1e", "21", "2c", "2d", "38", "3f", "28", "30", "2e", "40", "27", "41", "42", "43", "2f", "5e"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [function(binarySearch_1_1) {
      exports_1({"binarySearch": binarySearch_1_1["default"]});
    }, function(CallbackProperty_1_1) {
      exports_1({"CallbackProperty": CallbackProperty_1_1["default"]});
    }, function(Cartesian2_1_1) {
      exports_1({"Cartesian2": Cartesian2_1_1["default"]});
    }, function(Cartesian3_1_1) {
      exports_1({"Cartesian3": Cartesian3_1_1["default"]});
    }, function(Cartesian4_1_1) {
      exports_1({"Cartesian4": Cartesian4_1_1["default"]});
    }, function(Clock_1_1) {
      exports_1({"Clock": Clock_1_1["default"]});
    }, function(ClockStep_1_1) {
      exports_1({"ClockStep": ClockStep_1_1["default"]});
    }, function(CompositeEntityCollection_1_1) {
      exports_1({"CompositeEntityCollection": CompositeEntityCollection_1_1["default"]});
    }, function(ConstantPositionProperty_1_1) {
      exports_1({"ConstantPositionProperty": ConstantPositionProperty_1_1["default"]});
    }, function(ConstantProperty_1_1) {
      exports_1({"ConstantProperty": ConstantProperty_1_1["default"]});
    }, function(createGuid_1_1) {
      exports_1({"createGuid": createGuid_1_1["default"]});
    }, function(defaultValue_1_1) {
      exports_1({"defaultValue": defaultValue_1_1["default"]});
    }, function(defined_1_1) {
      exports_1({"defined": defined_1_1["default"]});
    }, function(DeveloperError_1_1) {
      exports_1({"DeveloperError": DeveloperError_1_1["default"]});
    }, function(Ellipsoid_1_1) {
      exports_1({"Ellipsoid": Ellipsoid_1_1["default"]});
    }, function(Entity_1_1) {
      exports_1({"Entity": Entity_1_1["default"]});
    }, function(EntityCollection_1_1) {
      exports_1({"EntityCollection": EntityCollection_1_1["default"]});
    }, function(Event_1_1) {
      exports_1({"Event": Event_1_1["default"]});
    }, function(ExtrapolationType_1_1) {
      exports_1({"ExtrapolationType": ExtrapolationType_1_1["default"]});
    }, function(GeographicProjection_1_1) {
      exports_1({"GeographicProjection": GeographicProjection_1_1["default"]});
    }, function(HermitePolynomialApproximation_1_1) {
      exports_1({"HermitePolynomialApproximation": HermitePolynomialApproximation_1_1["default"]});
    }, function(JulianDate_1_1) {
      exports_1({"JulianDate": JulianDate_1_1["default"]});
    }, function(Math_1_1) {
      exports_1({"CesiumMath": Math_1_1["default"]});
    }, function(Matrix3_1_1) {
      exports_1({"Matrix3": Matrix3_1_1["default"]});
    }, function(Matrix4_1_1) {
      exports_1({"Matrix4": Matrix4_1_1["default"]});
    }, function(OrientationProperty_1_1) {
      exports_1({"OrientationProperty": OrientationProperty_1_1["default"]});
    }, function(PerspectiveFrustum_1_1) {
      exports_1({"PerspectiveFrustum": PerspectiveFrustum_1_1["default"]});
    }, function(PositionProperty_1_1) {
      exports_1({"PositionProperty": PositionProperty_1_1["default"]});
    }, function(Property_1_1) {
      exports_1({"Property": Property_1_1["default"]});
    }, function(Quaternion_1_1) {
      exports_1({"Quaternion": Quaternion_1_1["default"]});
    }, function(ReferenceEntity_1_1) {
      exports_1({"ReferenceEntity": ReferenceEntity_1_1["default"]});
    }, function(ReferenceFrame_1_1) {
      exports_1({"ReferenceFrame": ReferenceFrame_1_1["default"]});
    }, function(ReferenceProperty_1_1) {
      exports_1({"ReferenceProperty": ReferenceProperty_1_1["default"]});
    }, function(SampledPositionProperty_1_1) {
      exports_1({"SampledPositionProperty": SampledPositionProperty_1_1["default"]});
    }, function(SampledProperty_1_1) {
      exports_1({"SampledProperty": SampledProperty_1_1["default"]});
    }, function(Transforms_1_1) {
      exports_1({"Transforms": Transforms_1_1["default"]});
    }, function(_1) {}],
    execute: function() {}
  };
});

$__System.register("8", ["17", "5"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Event_1,
      cesium_imports_1;
  var Event,
      CommandQueue,
      scratchCartesianPositionFIXED,
      scratchMatrix4,
      scratchMatrix3,
      urlParser,
      MessageChannelLike,
      MessageChannelFactory;
  function calculatePose(entity, time) {
    var entityPosition = entity.position;
    var referenceFrame = entityPosition.referenceFrame;
    var referenceFrameID = typeof referenceFrame === 'number' ? referenceFrame : referenceFrame.id;
    return {
      referenceFrame: referenceFrameID,
      position: entity.position.getValueInReferenceFrame(time, referenceFrame, {}),
      orientation: entity.orientation.getValue(time, {})
    };
  }
  exports_1("calculatePose", calculatePose);
  function getAncestorReferenceFrames(frame) {
    var frames = [];
    while (frame !== undefined && frame !== null) {
      frames.unshift(frame);
      frame = frame.position && frame.position.referenceFrame;
    }
    return frames;
  }
  exports_1("getAncestorReferenceFrames", getAncestorReferenceFrames);
  function getRootReferenceFrame(frame) {
    return getAncestorReferenceFrames(frame)[0];
  }
  exports_1("getRootReferenceFrame", getRootReferenceFrame);
  function getEntityPositionInReferenceFrame(entity, time, referenceFrame, result) {
    return entity.position && entity.position.getValueInReferenceFrame(time, referenceFrame, result);
  }
  exports_1("getEntityPositionInReferenceFrame", getEntityPositionInReferenceFrame);
  function getEntityOrientationInReferenceFrame(entity, time, referenceFrame, result) {
    var entityFrame = entity.position && entity.position.referenceFrame;
    if (entityFrame === undefined)
      return undefined;
    var orientation = entity.orientation && entity.orientation.getValue(time, result);
    if (!orientation) {
      var entityPositionFIXED = getEntityPositionInReferenceFrame(entity, time, cesium_imports_1.ReferenceFrame.FIXED, scratchCartesianPositionFIXED);
      if (!entityPositionFIXED)
        return cesium_imports_1.Quaternion.clone(cesium_imports_1.Quaternion.IDENTITY, result);
      if (cesium_imports_1.Cartesian3.ZERO.equals(entityPositionFIXED))
        throw new Error('invalid cartographic position');
      var transform = cesium_imports_1.Transforms.eastNorthUpToFixedFrame(entityPositionFIXED, cesium_imports_1.Ellipsoid.WGS84, scratchMatrix4);
      var rotation = cesium_imports_1.Matrix4.getRotation(transform, scratchMatrix3);
      var fixedOrientation = cesium_imports_1.Quaternion.fromRotationMatrix(rotation, result);
      return cesium_imports_1.OrientationProperty.convertToReferenceFrame(time, fixedOrientation, cesium_imports_1.ReferenceFrame.FIXED, referenceFrame, result);
    }
    return cesium_imports_1.OrientationProperty.convertToReferenceFrame(time, orientation, entityFrame, referenceFrame, result);
  }
  exports_1("getEntityOrientationInReferenceFrame", getEntityOrientationInReferenceFrame);
  function resolveURL(inURL) {
    if (!urlParser)
      throw new Error("resolveURL requires DOM api");
    if (inURL === undefined)
      throw new Error('Expected inURL');
    urlParser.href = null;
    urlParser.href = inURL;
    return urlParser.href;
  }
  exports_1("resolveURL", resolveURL);
  function parseURL(inURL) {
    if (!urlParser)
      throw new Error("parseURL requires DOM api");
    if (inURL === undefined)
      throw new Error('Expected inURL');
    urlParser.href = null;
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
  return {
    setters: [function(Event_1_1) {
      Event_1 = Event_1_1;
    }, function(cesium_imports_1_1) {
      cesium_imports_1 = cesium_imports_1_1;
    }],
    execute: function() {
      Event = (function() {
        function Event() {
          this._event = new Event_1.default();
        }
        Object.defineProperty(Event.prototype, "numberOfListeners", {
          get: function() {
            return this._event.numberOfListeners;
          },
          enumerable: true,
          configurable: true
        });
        Event.prototype.addEventListener = function(listener) {
          return this._event.addEventListener(listener);
        };
        Event.prototype.removeEventListener = function(listener) {
          return this._event.removeEventListener(listener);
        };
        Event.prototype.raiseEvent = function(data) {
          this._event.raiseEvent(data);
        };
        return Event;
      }());
      exports_1("Event", Event);
      CommandQueue = (function() {
        function CommandQueue() {
          var _this = this;
          this._queue = [];
          this._currentCommandPending = null;
          this.errorEvent = new Event();
          this.errorEvent.addEventListener(function(error) {
            if (_this.errorEvent.numberOfListeners === 1)
              console.error(error);
          });
        }
        CommandQueue.prototype.push = function(command, userData) {
          this._queue.push({
            command: command,
            userData: userData
          });
          if (this._queue.length === 1 && this._currentCommandPending === null) {
            Promise.resolve().then(this._executeNextCommand.bind(this));
          }
        };
        CommandQueue.prototype.clear = function() {
          this._queue = [];
        };
        Object.defineProperty(CommandQueue.prototype, "currentUserData", {
          get: function() {
            return this._currentUserData;
          },
          enumerable: true,
          configurable: true
        });
        CommandQueue.prototype._executeNextCommand = function() {
          var _this = this;
          var item = this._queue.shift();
          if (!item) {
            this._currentUserData = null;
            this._currentCommandPending = null;
            return;
          }
          var command = item.command,
              userData = item.userData;
          this._currentUserData = userData;
          this._currentCommandPending = new Promise(function(resolve, reject) {
            return resolve(command());
          }).then(this._executeNextCommand.bind(this)).catch(function(error) {
            _this.errorEvent.raiseEvent(error);
            _this._executeNextCommand();
          });
        };
        return CommandQueue;
      }());
      exports_1("CommandQueue", CommandQueue);
      scratchCartesianPositionFIXED = new cesium_imports_1.Cartesian3;
      scratchMatrix4 = new cesium_imports_1.Matrix4;
      scratchMatrix3 = new cesium_imports_1.Matrix3;
      urlParser = typeof document !== 'undefined' ? document.createElement("a") : undefined;
      MessageChannelLike = (function() {
        function MessageChannelLike() {
          var messageChannel = this;
          var _portsOpen = true;
          var _port1ready;
          var _port2ready;
          var _port1onmessage;
          _port1ready = new Promise(function(resolve, reject) {
            messageChannel.port1 = {
              set onmessage(func) {
                _port1onmessage = func;
                resolve();
              },
              get onmessage() {
                return _port1onmessage;
              },
              postMessage: function(data) {
                _port2ready.then(function() {
                  if (_portsOpen)
                    messageChannel.port2.onmessage({data: data});
                });
              },
              close: function() {
                _portsOpen = false;
              }
            };
          });
          var _port2onmessage;
          _port2ready = new Promise(function(resolve, reject) {
            messageChannel.port2 = {
              set onmessage(func) {
                _port2onmessage = func;
                resolve();
              },
              get onmessage() {
                return _port2onmessage;
              },
              postMessage: function(data) {
                _port1ready.then(function() {
                  if (_portsOpen)
                    messageChannel.port1.onmessage({data: data});
                });
              },
              close: function() {
                _portsOpen = false;
              }
            };
          });
        }
        return MessageChannelLike;
      }());
      exports_1("MessageChannelLike", MessageChannelLike);
      MessageChannelFactory = (function() {
        function MessageChannelFactory() {}
        MessageChannelFactory.prototype.create = function() {
          if (typeof MessageChannel !== 'undefined')
            return new MessageChannel();
          else
            return new MessageChannelLike();
        };
        return MessageChannelFactory;
      }());
      exports_1("MessageChannelFactory", MessageChannelFactory);
    }
  };
});

$__System.register("1", ["2", "b", "5", "6", "9", "10", "4", "f", "e", "c", "7", "d", "11", "a", "8"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var aurelia_dependency_injection_1,
      Cesium,
      session_1,
      camera_1,
      config_1,
      context_2,
      device_1,
      focus_1,
      mode_1,
      reality_1,
      timer_1,
      vuforia_1,
      viewport_1;
  var ArgonSystem;
  function init(options) {
    if (options === void 0) {
      options = {};
    }
    var role;
    if (typeof window === 'undefined') {
      role = config_1.Role.MANAGER;
    } else if (navigator.userAgent.indexOf('Argon') > 0 || window.top !== window) {
      role = config_1.Role.APPLICATION;
    } else {
      role = config_1.Role.MANAGER;
    }
    var config = Object.assign({
      role: role,
      enableIncomingUpdateEvents: role === config_1.Role.APPLICATION
    }, options.config);
    return new ArgonSystem(config, options.container);
  }
  exports_1("init", init);
  function initReality(options) {
    if (options === void 0) {
      options = {};
    }
    var config = Object.assign({role: config_1.Role.REALITY}, {enableRealityControlPort: true}, options.config);
    return new ArgonSystem(config, options.container);
  }
  exports_1("initReality", initReality);
  var exportedNames_1 = {
    'ArgonSystem': true,
    'init': true,
    'initReality': true,
    'Container': true,
    'Cesium': true
  };
  function exportStar_1(m) {
    var exports = {};
    for (var n in m) {
      if (n !== "default" && !exportedNames_1.hasOwnProperty(n))
        exports[n] = m[n];
    }
    exports_1(exports);
  }
  return {
    setters: [function(_1) {}, function(aurelia_dependency_injection_1_1) {
      aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
    }, function(Cesium_1) {
      Cesium = Cesium_1;
    }, function(session_1_1) {
      session_1 = session_1_1;
      exportStar_1(session_1_1);
    }, function(camera_1_1) {
      camera_1 = camera_1_1;
      exportStar_1(camera_1_1);
    }, function(config_1_1) {
      config_1 = config_1_1;
      exportStar_1(config_1_1);
    }, function(context_2_1) {
      context_2 = context_2_1;
      exportStar_1(context_2_1);
    }, function(device_1_1) {
      device_1 = device_1_1;
      exportStar_1(device_1_1);
    }, function(focus_1_1) {
      focus_1 = focus_1_1;
      exportStar_1(focus_1_1);
    }, function(mode_1_1) {
      mode_1 = mode_1_1;
      exportStar_1(mode_1_1);
    }, function(reality_1_1) {
      reality_1 = reality_1_1;
      exportStar_1(reality_1_1);
    }, function(timer_1_1) {
      timer_1 = timer_1_1;
      exportStar_1(timer_1_1);
    }, function(vuforia_1_1) {
      vuforia_1 = vuforia_1_1;
      exportStar_1(vuforia_1_1);
    }, function(viewport_1_1) {
      viewport_1 = viewport_1_1;
      exportStar_1(viewport_1_1);
    }, function(utils_1_1) {
      exportStar_1(utils_1_1);
    }],
    execute: function() {
      exports_1("Container", aurelia_dependency_injection_1.Container);
      exports_1("Cesium", Cesium);
      ArgonSystem = (function() {
        function ArgonSystem(config, container) {
          if (container === void 0) {
            container = new aurelia_dependency_injection_1.Container();
          }
          this.container = container;
          ArgonSystem.instance = this;
          if (!config.defaultReality)
            config.defaultReality = {type: 'empty'};
          container.registerInstance('config', config);
          container.registerInstance(config_1.Role, config.role);
          container.registerInstance(ArgonSystem, this);
          container.registerSingleton(reality_1.RealitySetupHandler, reality_1.EmptyRealitySetupHandler);
          container.registerSingleton(reality_1.RealitySetupHandler, vuforia_1.VuforiaRealitySetupHandler);
          if (config.role === config_1.Role.MANAGER) {
            container.registerSingleton(session_1.ConnectService, session_1.LoopbackConnectService);
          } else if (session_1.WKWebViewConnectService.isAvailable()) {
            container.registerSingleton(session_1.ConnectService, session_1.WKWebViewConnectService);
          } else if (session_1.DebugConnectService.isAvailable()) {
            container.registerSingleton(session_1.ConnectService, session_1.DebugConnectService);
          } else if (session_1.DebugConnectService.isAvailable()) {
            container.registerSingleton(session_1.ConnectService, session_1.DOMConnectService);
          } else {
            container.registerSingleton(session_1.ConnectService, session_1.LoopbackConnectService);
          }
          for (var _i = 0,
              _a = Object.keys(ArgonSystem.prototype); _i < _a.length; _i++) {
            var key = _a[_i];
            this[key];
          }
          this.session.connect();
        }
        Object.defineProperty(ArgonSystem.prototype, "camera", {
          get: function() {
            return this.container.get(camera_1.CameraService);
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(ArgonSystem.prototype, "context", {
          get: function() {
            return this.container.get(context_2.ContextService);
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(ArgonSystem.prototype, "device", {
          get: function() {
            return this.container.get(device_1.DeviceService);
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(ArgonSystem.prototype, "focus", {
          get: function() {
            return this.container.get(focus_1.FocusService);
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(ArgonSystem.prototype, "interactionMode", {
          get: function() {
            return this.container.get(mode_1.InteractionModeService);
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(ArgonSystem.prototype, "reality", {
          get: function() {
            return this.container.get(reality_1.RealityService);
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(ArgonSystem.prototype, "session", {
          get: function() {
            return this.container.get(session_1.SessionService);
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(ArgonSystem.prototype, "timer", {
          get: function() {
            return this.container.get(timer_1.TimerService);
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(ArgonSystem.prototype, "viewport", {
          get: function() {
            return this.container.get(viewport_1.ViewportService);
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(ArgonSystem.prototype, "vuforia", {
          get: function() {
            return this.container.get(vuforia_1.VuforiaService);
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(ArgonSystem.prototype, "updateEvent", {
          get: function() {
            return this.context.updateEvent;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(ArgonSystem.prototype, "renderEvent", {
          get: function() {
            return this.context.renderEvent;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(ArgonSystem.prototype, "focusEvent", {
          get: function() {
            return this.focus.focusEvent;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(ArgonSystem.prototype, "blurEvent", {
          get: function() {
            return this.focus.blurEvent;
          },
          enumerable: true,
          configurable: true
        });
        return ArgonSystem;
      }());
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
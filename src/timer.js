System.register(['./cesium/cesium-imports'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var cesium_imports_1;
    var _clock, _scratchTime, TimerService, lastTime, rAF;
    function requestAnimationFramePolyfill(callback) {
        var currTime = Date.now();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    }
    return {
        setters:[
            function (cesium_imports_1_1) {
                cesium_imports_1 = cesium_imports_1_1;
            }],
        execute: function() {
            _clock = new cesium_imports_1.Clock();
            _scratchTime = new cesium_imports_1.JulianDate(0, 0);
            /**
             * Provides timer service
             */
            TimerService = (function () {
                function TimerService() {
                }
                /**
                 * Request that the callback function be called for the next frame.
                 * @param callback function
                 */
                TimerService.prototype.requestFrame = function (callback) {
                    var _this = this;
                    rAF(function () {
                        _this._tick();
                        callback(_clock.currentTime);
                    });
                };
                TimerService.prototype.getSystemTime = function (result) {
                    this._tick();
                    return cesium_imports_1.JulianDate.clone(_clock.currentTime, result);
                };
                // Enforce monotonically increasing time, and deal with 
                // clock drift by either slowing down or speeding up,
                // while never going backwards
                TimerService.prototype._tick = function () {
                    var secondsBeforeTick = _clock.currentTime.secondsOfDay;
                    _clock.tick();
                    var secondsAfterTick = _clock.currentTime.secondsOfDay;
                    var now = cesium_imports_1.JulianDate.now(_scratchTime);
                    var secondsDrift = cesium_imports_1.JulianDate.secondsDifference(_clock.currentTime, now);
                    if (secondsDrift > 0.033) {
                        var halfTimeStep = (secondsAfterTick - secondsBeforeTick) / 2;
                        _clock.currentTime.secondsOfDay -= halfTimeStep;
                    }
                    else if (secondsDrift < 0.5) {
                        cesium_imports_1.JulianDate.clone(now, _clock.currentTime);
                    }
                };
                return TimerService;
            }());
            exports_1("TimerService", TimerService);
            lastTime = 0;
            rAF = typeof requestAnimationFrame !== 'undefined' ?
                requestAnimationFrame : requestAnimationFramePolyfill;
        }
    }
});

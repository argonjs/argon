if (typeof document == 'undefined') {
    const w = typeof global !== 'undefined' ? global : window;
    // global.window = w;
    w['WebVRConfig'] = {
        DEFER_INITIALIZATION: typeof navigator == 'undefined'
    };
}
import CardboardUI from 'googlevr/webvr-polyfill/src/cardboard-ui';
console.log(CardboardUI);
// fix cardboard ui to listen for touch or mouse events.
// see https://github.com/googlevr/webvr-polyfill/issues/174
var kButtonWidthDp = 28;
var kTouchSlopFactor = 1.5;
CardboardUI.prototype.listen = function (optionsCallback, backCallback) {
    var canvas = this.gl.canvas;
    this.listener = function (event) {
        var midline = canvas.clientWidth / 2;
        var buttonSize = kButtonWidthDp * kTouchSlopFactor;
        // Check to see if the user clicked on (or around) the gear icon
        var e = event instanceof TouchEvent ? event.changedTouches[0] : event;
        if (e.clientX > midline - buttonSize &&
            e.clientX < midline + buttonSize &&
            e.clientY > canvas.clientHeight - buttonSize) {
            optionsCallback(event);
        }
        else if (e.clientX < buttonSize && e.clientY < buttonSize) {
            backCallback(event);
        }
    };
    canvas.addEventListener('click', this.listener, false);
    canvas.addEventListener('touchstart', this.listener, false); // for some reason, using `touchend` here breaks touch events in parent DOM elements, whereas touchstart works fine.... seems like a bug in WebKit
};
import 'googlevr/webvr-polyfill/src/main';

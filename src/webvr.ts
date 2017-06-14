import CardboardUI from 'googlevr/webvr-polyfill/src/cardboard-ui';
import 'googlevr/webvr-polyfill/src/main';

// fix cardboard ui to listen for touch or mouse events.
// see https://github.com/googlevr/webvr-polyfill/issues/174
var kButtonWidthDp = 28;
var kTouchSlopFactor = 1.5;
CardboardUI.prototype.listen = function(optionsCallback, backCallback) {
  var canvas = this.gl.canvas;
  var hasTouchEventClass = typeof TouchEvent !== 'undefined';
  this.listener = function(event:MouseEvent|TouchEvent) {
    var midline = canvas.clientWidth / 2;
    var buttonSize = kButtonWidthDp * kTouchSlopFactor;
    var e:MouseEvent|Touch = hasTouchEventClass && event instanceof TouchEvent ? 
      event.changedTouches[0] : 
      <MouseEvent>event;
    // Check to see if the user clicked on (or around) the gear icon
    if (e.clientX > midline - buttonSize &&
        e.clientX < midline + buttonSize &&
        e.clientY > canvas.clientHeight - buttonSize) {
      event.preventDefault();
      event.stopImmediatePropagation();
      optionsCallback(event);
    }
    // Check to see if the user clicked on (or around) the back icon
    else if (e.clientX < buttonSize && e.clientY < buttonSize) {
      event.preventDefault();
      event.stopImmediatePropagation();
      backCallback(event);
    }
  };
  canvas.addEventListener('click', this.listener, false);
  canvas.addEventListener('touchstart', this.listener, false); // for some reason, using `touchend` here breaks touch events in parent DOM elements, whereas touchstart works fine.... seems like a bug in WebKit
};
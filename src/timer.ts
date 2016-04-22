import {
    JulianDate
} from './cesium/cesium-imports'

/**
 * Provides timer service mainly to EmptyRealitySetupHandler class.
 * Updates time and frameNumber of animation frames.
 *
 * @example An example where requestFrame method is called
 * ```  
 * var app = Argon.init();
 * const update = (time: JulianDate, frameNumber: number) => {
 *      app.viewport.element.innerHTML = (new Date()).toString();
 *      this.timer.requestFrame(update);
 * }
 * this.timer.requestFrame(update);
 * ```
 */
export class TimerService {

    private navigationStartDate;

    private frameNumbers = new WeakMap<Function, number>();

    /**
     * Request that the callback function be called for the next frame.
     * 
     * @param callback function
     */
    public requestFrame(callback: (time: JulianDate, frameNumber: number) => void) {
        if (typeof requestAnimationFrame !== 'undefined' && typeof performance !== 'undefined') {
            this.navigationStartDate = this.navigationStartDate || JulianDate.fromDate(new Date(performance.timing.navigationStart))
            requestAnimationFrame((time) => {
                const frameTime = JulianDate.addSeconds(this.navigationStartDate, time / 1000, new JulianDate(0, 0))
                callback(frameTime, this.getNextFrameNumber(callback));
            })
        } else {
            requestAnimationFramePoly((time: number) => {
                console.log('raf fired ' + time);
                const frameTime = JulianDate.fromDate(new Date(time));
                callback(frameTime, this.getNextFrameNumber(callback));
            })
        }
    }

    private getNextFrameNumber(callback: Function) {
        var frameNumber = this.frameNumbers.get(callback) || 0;
        this.frameNumbers.set(callback, frameNumber + 1);
        return frameNumber;
    }
}

var lastTime = 0;
function requestAnimationFramePoly(callback) {
    var currTime = Date.now();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
    lastTime = currTime + timeToCall;
    return id;
}

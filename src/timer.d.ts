/// <reference types="cesium" />
import { JulianDate } from './cesium/cesium-imports';
/**
 * Provides timer service
 */
export declare class TimerService {
    /**
     * Request that the callback function be called for the next frame.
     * @param callback function
     */
    requestFrame(callback: (time: JulianDate) => void): void;
    getSystemTime(result?: JulianDate): JulianDate;
    private _tick();
}

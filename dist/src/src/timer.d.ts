/// <reference types="cesium" />
import { JulianDate } from './cesium/cesium-imports';
/**
 * Provides timer service
 */
export declare class TimerService {
    private navigationStartDate;
    private frameNumbers;
    /**
     * Request that the callback function be called for the next frame.
     *
     * @param callback function
     */
    requestFrame(callback: (time: JulianDate, frameNumber: number) => void): void;
    private getNextFrameNumber(callback);
}

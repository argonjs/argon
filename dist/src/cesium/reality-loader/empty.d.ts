import { RealityView } from '../common';
import { SessionService, SessionPort } from '../session';
import { DeviceService } from '../device';
import { TimerService } from '../timer';
import { RealityLoader } from '../reality';
export declare class EmptyRealityLoader extends RealityLoader {
    private sessionService;
    private deviceService;
    private timer;
    type: string;
    constructor(sessionService: SessionService, deviceService: DeviceService, timer: TimerService);
    load(reality: RealityView, callback: (realitySession: SessionPort) => void): void;
}

import { RealityViewer } from '../common';
import { SessionService, SessionPort } from '../session';
import { DeviceService } from '../device';
import { TimerService } from '../timer';
import { RealityLoader } from '../reality';
import { ViewService } from '../view';
export declare class EmptyRealityLoader extends RealityLoader {
    private sessionService;
    private deviceService;
    private viewService;
    private timer;
    type: string;
    constructor(sessionService: SessionService, deviceService: DeviceService, viewService: ViewService, timer: TimerService);
    private _enablePinchZoom();
    private _gesturestartListener();
    private _gesturechnageListener();
    private _gestureendListener();
    load(reality: RealityViewer, callback: (realitySession: SessionPort) => void): void;
}

import { RealityViewer } from '../common';
import { SessionService, SessionPort } from '../session';
import { DeviceService } from '../device';
import { RealityLoader } from '../reality';
import { ViewService } from '../view';
export declare class EmptyRealityLoader extends RealityLoader {
    private sessionService;
    private deviceService;
    private viewService;
    type: string;
    constructor(sessionService: SessionService, deviceService: DeviceService, viewService: ViewService);
    load(reality: RealityViewer, callback: (realitySession: SessionPort) => void): void;
}

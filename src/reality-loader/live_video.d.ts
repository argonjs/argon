import { RealityViewer } from '../common';
import { SessionService, SessionPort } from '../session';
import { RealityLoader } from '../reality';
import { ViewService } from '../view';
import { VuforiaServiceDelegate } from '../vuforia';
export declare class LiveVideoRealityLoader extends RealityLoader {
    private sessionService;
    private viewService;
    private vuforiaDelegate;
    type: string;
    constructor(sessionService: SessionService, viewService: ViewService, vuforiaDelegate: VuforiaServiceDelegate);
    load(reality: RealityViewer, callback: (realitySession: SessionPort) => void): void;
}

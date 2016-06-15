import { RealityView } from '../common';
import { SessionService, SessionPort } from '../session';
import { RealityLoader } from '../reality';
import { VuforiaServiceDelegate } from '../vuforia';
export declare class LiveVideoRealityLoader implements RealityLoader {
    private sessionService;
    private vuforiaDelegate;
    type: string;
    constructor(sessionService: SessionService, vuforiaDelegate: VuforiaServiceDelegate);
    load(reality: RealityView): SessionPort;
}

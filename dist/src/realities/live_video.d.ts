import { RealityView } from '../common';
import { SessionService, SessionPort } from '../session';
import { RealityLoader } from '../reality';
import { VuforiaServiceDelegate } from '../vuforia';
export declare class LiveVideoRealityLoader implements RealityLoader {
    private sessionService;
    private delegate;
    type: string;
    constructor(sessionService: SessionService, delegate: VuforiaServiceDelegate);
    load(reality: RealityView): SessionPort;
}

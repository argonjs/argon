import { SessionService, SessionPort } from '../session';
import { RealityLoader, RealityView } from '../reality';
import { VuforiaServiceDelegate } from '../vuforia';
export declare class LiveVideoRealityLoader extends RealityLoader {
    private sessionService;
    private vuforiaDelegate;
    type: string;
    constructor(sessionService: SessionService, vuforiaDelegate: VuforiaServiceDelegate);
    load(reality: RealityView, callback: (realitySession: SessionPort) => void): void;
}

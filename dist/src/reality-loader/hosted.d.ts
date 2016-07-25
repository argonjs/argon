import { SessionService, SessionPort } from '../session';
import { RealityLoader, RealityView } from '../reality';
import { ViewService } from '../view';
export declare class HostedRealityLoader extends RealityLoader {
    private sessionService;
    private viewService;
    type: string;
    iframeElement: HTMLIFrameElement;
    constructor(sessionService: SessionService, viewService: ViewService);
    load(reality: RealityView, callback: (realitySession: SessionPort) => void): void;
    private _handleMessage(ev);
}

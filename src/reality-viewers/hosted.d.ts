import { SessionService } from '../session';
import { ViewService } from '../view';
import { RealityViewer } from './base';
export declare class HostedRealityViewer extends RealityViewer {
    private sessionService;
    private viewService;
    uri: string;
    type: string;
    iframeElement: HTMLIFrameElement;
    constructor(sessionService: SessionService, viewService: ViewService, uri: string);
    destroy(): void;
    load(): void;
}

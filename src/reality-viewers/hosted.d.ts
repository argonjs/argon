import { SessionService } from '../session';
import { ViewportService } from '../viewport';
import { RealityViewer } from './base';
export declare class HostedRealityViewer extends RealityViewer {
    private sessionService;
    private viewportService;
    uri: string;
    type: string;
    iframeElement: HTMLIFrameElement;
    constructor(sessionService: SessionService, viewportService: ViewportService, uri: string);
    destroy(): void;
    load(): void;
}

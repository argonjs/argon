import { SessionService, SessionPort } from '../session';
import { ViewService } from '../view';
import { ViewportService } from '../viewport';
import { ContextService } from '../context';
import { RealityViewer } from './base';
export declare class LiveRealityViewer extends RealityViewer {
    private sessionService;
    private viewportService;
    private viewService;
    private contextService;
    uri: string;
    videoElement: HTMLVideoElement;
    private canvas;
    private context;
    private videoFov;
    private settingsIframe;
    constructor(sessionService: SessionService, viewportService: ViewportService, viewService: ViewService, contextService: ContextService, uri: string);
    destroy(): void;
    protected setupInternalSession(session: SessionPort): void;
    load(): void;
    static isAvailable(): boolean;
    getVideoFrame(x: number, y: number, width: number, height: number): ImageData;
}

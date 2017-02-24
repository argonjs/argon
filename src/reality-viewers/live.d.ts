import { SessionService, SessionPort } from '../session';
import { ViewService } from '../view';
import { DeviceService } from '../device';
import { RealityViewer } from './base';
export declare class LiveRealityViewer extends RealityViewer {
    private sessionService;
    private viewService;
    private deviceService;
    uri: string;
    videoElement: HTMLVideoElement;
    private canvas;
    private context;
    private videoFov;
    private settingsIframe;
    constructor(sessionService: SessionService, viewService: ViewService, deviceService: DeviceService, uri: string);
    destroy(): void;
    protected setupInternalSession(internalSession: SessionPort): void;
    load(): void;
    static isAvailable(): boolean;
    getVideoFrame(x: number, y: number, width: number, height: number): ImageData;
}

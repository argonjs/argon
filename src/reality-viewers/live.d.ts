import { SessionService } from '../session';
import { DeviceService } from '../device';
import { ViewService } from '../view';
import { VuforiaServiceDelegate } from '../vuforia';
import { RealityViewer } from './base';
export declare class LiveRealityViewer extends RealityViewer {
    private sessionService;
    private vuforiaDelegate;
    private viewService;
    private deviceService;
    uri: string;
    videoElement: HTMLVideoElement;
    private canvas;
    private context;
    private videoFov;
    private settingsIframe;
    constructor(sessionService: SessionService, vuforiaDelegate: VuforiaServiceDelegate, viewService: ViewService, deviceService: DeviceService, uri: string);
    destroy(): void;
    setPresenting(foo: boolean): void;
    load(): void;
    static isAvailable(): boolean;
    getVideoFrame(x: number, y: number, width: number, height: number): ImageData;
}

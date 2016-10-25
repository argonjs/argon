import { RealityViewer } from '../common';
import { SessionService, SessionPort } from '../session';
import { DeviceService } from '../device';
import { RealityLoader } from '../reality';
import { ViewService } from '../view';
import { VuforiaServiceDelegate } from '../vuforia';
export declare class LiveVideoRealityLoader extends RealityLoader {
    private sessionService;
    private vuforiaDelegate;
    private viewService;
    private deviceService;
    type: string;
    videoElement: HTMLVideoElement;
    private canvas;
    private context;
    private videoFov;
    private fovSlider;
    constructor(sessionService: SessionService, vuforiaDelegate: VuforiaServiceDelegate, viewService: ViewService, deviceService: DeviceService);
    load(reality: RealityViewer, callback: (realitySession: SessionPort) => void): void;
    static isAvailable(): boolean;
    getVideoFrame(x: number, y: number, width: number, height: number): ImageData;
}

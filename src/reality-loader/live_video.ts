import { inject } from 'aurelia-dependency-injection'
import { JulianDate } from '../cesium/cesium-imports'
import { Role, RealityViewer, ViewState } from '../common'
import { SessionService, SessionPort } from '../session'
import { DeviceService } from '../device'
import { RealityLoader } from '../reality'
import { ViewService } from '../view'
import { VuforiaServiceDelegate } from '../vuforia'
import * as utils from '../utils'

@inject(SessionService, VuforiaServiceDelegate, ViewService, DeviceService)
export class LiveVideoRealityLoader extends RealityLoader {
    public type = 'live-video';

    public videoElement: HTMLVideoElement;

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private videoFov: number;
    private fovSlider: HTMLInputElement;

    constructor(
        private sessionService: SessionService,
        private vuforiaDelegate: VuforiaServiceDelegate,
        private viewService: ViewService,
        private deviceService: DeviceService) {
        super();

        if (typeof document !== 'undefined') {
            this.fovSlider = document.createElement('input');
            this.fovSlider.type = 'range';
            this.fovSlider.min = '0';
            this.fovSlider.max = '179';
            this.fovSlider.value = '90';
            this.fovSlider.step = '1';
            this.fovSlider.style.position = 'absolute;';
            this.fovSlider.addEventListener('change', (event) => {
                this.videoFov = Number.parseInt(this.fovSlider.value) * Math.PI / 180;
            });
            this.videoFov = Number.parseInt(this.fovSlider.value) * Math.PI / 180;

            this.viewService.containingElementPromise.then((container) => {
                container.insertBefore(this.fovSlider, container.firstChild);
            });

            this.videoElement = document.createElement('video');
            this.videoElement.style.width = '100%';
            this.videoElement.style.height = 'height:100%';
            this.videoElement.controls = false;
            this.videoElement.autoplay = true;

            this.viewService.containingElementPromise.then((container) => {
                container.insertBefore(this.videoElement, container.firstChild);
            });

            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d')!;
        }
    }

    public load(reality: RealityViewer, callback: (realitySession: SessionPort) => void): void {
        const realitySession = this.sessionService.addManagedSessionPort(reality.uri);
        const remoteRealitySession = this.sessionService.createSessionPort();

        remoteRealitySession.on['ar.context.update'] = () => { };

        remoteRealitySession.connectEvent.addEventListener(() => {
            if (this.videoElement) {
                const videoElement = this.videoElement!;
                const mediaDevices = navigator.mediaDevices;
                const getUserMedia = (mediaDevices.getUserMedia || mediaDevices['mozGetUserMedia'] ||
                    mediaDevices['msGetUserMedia'] || mediaDevices['webkitGetUserMedia']).bind(mediaDevices);
                
                getUserMedia({ audio: false, video: true }).then((videoStream: MediaStream) => {
                    videoElement.src = window.URL.createObjectURL(videoStream);
                }).catch((error: DOMException) => {
                    remoteRealitySession.errorEvent.raiseEvent(error);  
                });

                const deviceService = this.deviceService;
                let lastFrameTime = -1;
                let update = (time: JulianDate) => {
                    if (realitySession.isConnected) 
                        this.deviceService.requestFrame(update);

                    if (videoElement.currentTime != lastFrameTime) {
                        lastFrameTime = videoElement.currentTime;

                        // const videoWidth = videoElement.videoWidth;
                        // const videoHeight = videoElement.videoHeight;

                        const viewState: ViewState = {
                            time,
                            pose: utils.getSerializedEntityPose(deviceService.eye, time),
                            geolocationAccuracy: deviceService.geolocationAccuracy,
                            altitudeAccuracy: deviceService.altitudeAccuracy,
                            compassAccuracy: deviceService.compassAccuracy,
                            viewport: deviceService.viewport,
                            subviews: deviceService.subviews
                        };
                        
                        remoteRealitySession.send('ar.reality.viewState', viewState);
                    }
                };

                this.deviceService.requestFrame(update);
            }

            this.vuforiaDelegate.videoEnabled = true;
            this.vuforiaDelegate.trackingEnabled = true;

            const remove = this.vuforiaDelegate.stateUpdateEvent.addEventListener((viewState) => {
                remoteRealitySession.send('ar.reality.viewState', viewState);
            });

            remoteRealitySession.closeEvent.addEventListener(() => {
                remove();
                this.vuforiaDelegate.videoEnabled = false;
                this.vuforiaDelegate.trackingEnabled = false;
            });
        });

        callback(realitySession);
        // Only connect after the caller is able to attach connectEvent handlers
        const messageChannel = this.sessionService.createSynchronousMessageChannel();
        realitySession.open(messageChannel.port1, this.sessionService.configuration);
        remoteRealitySession.open(messageChannel.port2, { role: Role.REALITY_VIEWER });
    }

    public static isAvailable(): boolean {
        if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
            const mediaDevices = navigator.mediaDevices;
            return !!(mediaDevices.getUserMedia || mediaDevices['mozGetUserMedia'] || mediaDevices['msGetUserMedia'] || mediaDevices['webkitGetUserMedia']);
        } else {
            return false;
        }
    }

    public getVideoFrame(x: number, y: number, width: number, height: number): ImageData {
        this.canvas.width = this.videoElement.videoWidth;
        this.canvas.height = this.videoElement.videoHeight;
        this.context.drawImage(this.videoElement, 0, 0, this.canvas.width, this.canvas.height);
        return this.context.getImageData(x, y, width, height);
    }
}

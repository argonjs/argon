import { inject } from 'aurelia-dependency-injection'
import { Role, RealityViewer } from '../common'
import { SessionService, SessionPort } from '../session'
import { DeviceService } from '../device'
import { TimerService } from '../timer'
import { RealityLoader } from '../reality'
import { VuforiaServiceDelegate } from '../vuforia'
import { ViewService } from '../view'
import { getSerializedEntityPose } from '../utils'

@inject(SessionService, VuforiaServiceDelegate, ViewService, DeviceService, TimerService)
export class LiveVideoRealityLoader extends RealityLoader {
    public type = 'live-video';

    private videoElement: HTMLVideoElement;
    private lastFrameTime: number;
    private canvas: HTMLCanvasElement;
    private context: RenderingContext;

    private videoFov: number;
    
    private settingsIframe: HTMLIFrameElement;

    constructor(
            private sessionService: SessionService,
            private vuforiaDelegate: VuforiaServiceDelegate,
            private viewService: ViewService,
            private deviceService: DeviceService,
            private timer: TimerService) {
        super();

        this.lastFrameTime = 0;

        if (typeof document !== 'undefined') {
            this.settingsIframe = document.createElement('iframe');
            this.settingsIframe.width = '0';
            this.settingsIframe.height = '0';
            this.settingsIframe.src = 'https://argonjs.io/tools.argonjs.io/';

            viewService.containingElementPromise.then((container) => {
                container.insertBefore(this.settingsIframe, container.firstChild);
            });

            this.videoFov = Math.PI / 2;

            this.videoElement = document.createElement('video');
            this.videoElement.style = 'width:100%; height:100%;';
            this.videoElement.controls = false;
            this.videoElement.autoplay = true;

            viewService.containingElementPromise.then((container) => {
                container.insertBefore(this.videoElement, container.firstChild);
            });

            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
        }
    }

    public load(reality: RealityViewer, callback: (realitySession: SessionPort) => void): void {
        const realitySession = this.sessionService.addManagedSessionPort(reality.uri);
        const remoteRealitySession = this.sessionService.createSessionPort();

        remoteRealitySession.on['ar.context.update'] = () => { };

        remoteRealitySession.connectEvent.addEventListener(() => {
            const remove = this.vuforiaDelegate.stateUpdateEvent.addEventListener((viewState) => {
                remoteRealitySession.send('ar.reality.viewState', viewState);
            });

            this.vuforiaDelegate.videoEnabled = true;
            this.vuforiaDelegate.trackingEnabled = true;

            remoteRealitySession.closeEvent.addEventListener(() => {
                remove();
                this.vuforiaDelegate.videoEnabled = false;
                this.vuforiaDelegate.trackingEnabled = false;
            });
        });

        if (typeof document !== 'undefined' && typeof navigator !== 'undefined') {
            window.addEventListener('message', (event) => {
                const origin = event.origin || event.originalEvent.origin;

                if (origin === 'http://argonjs.io') {
                    this.videoFov = event.data;
                }
            });

            const mediaDevices = navigator.mediaDevices;

            const getUserMedia = (mediaDevices.getUserMedia || mediaDevices.mozGetUserMedia ||
                mediaDevices.msGetUserMedia || mediaDevices.webkitGetUserMedia).bind(mediaDevices);

            const videoPromise = getUserMedia({ audio: false, video: true });

            videoPromise.then((videoStream: MediaStream) => {
                this.videoElement.src = window.URL.createObjectURL(videoStream);
            });

            videoPromise.catch((error: DOMException) => {
                remoteRealitySession.errorEvent.raiseEvent(error);  
            });

            let firstFrame = true;

            const update = (time: JulianDate, index: number) => {
                if (firstFrame || this.videoElement.currentTime != this.lastFrameTime) {
                    firstFrame = false;
                    this.lastFrameTime = this.videoElement.currentTime;
                    this.deviceService.update();
                    const frameState: SerializedPartialFrameState = {
                        time,
                        index,
                        eye: {
                            pose: getSerializedEntityPose(this.deviceService.displayEntity, time),
                            fov: this.videoFov
                        }
                    };
                    remoteRealitySession.send('ar.reality.frameState', frameState);
                }

                this.timer.requestFrame(update);
            };

            this.timer.requestFrame(update);
        }

        callback(realitySession);
        // Only connect after the caller is able to attach connectEvent handlers
        const messageChannel = this.sessionService.createSynchronousMessageChannel();
        realitySession.open(messageChannel.port1, this.sessionService.configuration);
        remoteRealitySession.open(messageChannel.port2, { role: Role.REALITY_VIEWER });
    }

    public static isAvailable(): bool {
        if (typeof navigator !== 'undefined') {
            const mediaDevices = navigator.mediaDevices;
            return !!(mediaDevices.getUserMedia || mediaDevices.mozGetUserMedia || mediaDevices.msGetUserMedia || mediaDevices.webkitGetUserMedia);
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

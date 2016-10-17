import { inject } from 'aurelia-dependency-injection'
import { Role, RealityView } from '../common'
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
    private fovSlider: HTMLInputElement;

    constructor(
            private sessionService: SessionService,
            private vuforiaDelegate: VuforiaServiceDelegate,
            private viewService: ViewService,
            private deviceService: DeviceService,
            private timer: TimerService) {
        super();

        this.lastFrameTime = 0;

        if (typeof document !== 'undefined') {
            if (document.cookie.length > 0) {
                const regex = /argon_fov=([0-9]+)/;
                const match = regex.exec(document.cookie);

                if (match) {
                    //match[1] will be the first capture, which is the value of the field of view as a string
                    this.videoFov = Number(match[1]) * Math.PI / 180;
                }
            }

            if (!this.videoFov) {
                this.fovSlider = document.createElement('input');
                this.fovSlider.type = 'range';
                this.fovSlider.min = '0';
                this.fovSlider.max = '180';
                this.fovSlider.value = '90';
                this.fovSlider.step = '1';
                this.fovSlider.style = 'position:absolute;';
                this.fovSlider.addEventListener('change', (event) => {
                    this.videoFov = event.target.value * Math.PI / 180;
                });

                document.body.appendChild(this.fovSlider);

                this.videoFov = this.fovSlider.value * Math.PI / 180;

                window.addEventListener('beforeunload', (event) => {
                    document.cookie = "argon_fov=" + this.fovSlider.value.toString();
                });
            }

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

    public load(reality: RealityView, callback: (realitySession: SessionPort) => void): void {
        const realitySession = this.sessionService.addManagedSessionPort(reality.uri);
        const remoteRealitySession = this.sessionService.createSessionPort();

        remoteRealitySession.on['ar.context.update'] = () => { };

        remoteRealitySession.connectEvent.addEventListener(() => {
            const remove = this.vuforiaDelegate.stateUpdateEvent.addEventListener((frameState) => {
                remoteRealitySession.send('ar.reality.frameState', frameState);
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
        remoteRealitySession.open(messageChannel.port2, { role: Role.REALITY_VIEW });
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

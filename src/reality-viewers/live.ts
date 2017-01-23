import { inject } from 'aurelia-dependency-injection'
import { JulianDate } from '../cesium/cesium-imports'
import { Role, ViewState } from '../common'
import { SessionService } from '../session'
import { DeviceService } from '../device'
import { ViewService } from '../view'
import { VuforiaServiceDelegate } from '../vuforia'
import * as utils from '../utils'
import { RealityViewer } from './base'

@inject(SessionService, VuforiaServiceDelegate, ViewService, DeviceService)
export class LiveRealityViewer extends RealityViewer {

    public videoElement: HTMLVideoElement;

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private videoFov: number;
    
    private settingsIframe: HTMLIFrameElement;

    constructor(
        private sessionService: SessionService,
        private vuforiaDelegate: VuforiaServiceDelegate,
        private viewService: ViewService,
        private deviceService: DeviceService,
        public uri:string) {
        super(sessionService, uri);

        if (typeof document !== 'undefined') {
            this.settingsIframe = document.createElement('iframe');
            this.settingsIframe.width = '0';
            this.settingsIframe.height = '0';
            this.settingsIframe.src = 'https://argonjs.io/tools.argonjs.io/';
            this.settingsIframe.style.display = 'none';

            this.videoFov = Math.PI / 2;

            this.videoElement = document.createElement('video');
            this.videoElement.style.width = '100%';
            this.videoElement.style.height = 'height:100%';
            this.videoElement.controls = false;
            this.videoElement.autoplay = true;
            this.videoElement.style.display = 'none';

            const viewElement = this.viewService.element;
            viewElement.insertBefore(this.settingsIframe, viewElement.firstChild);
            viewElement.insertBefore(this.videoElement, viewElement.firstChild);

            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d')!;
        }
    }

    public destroy() {
        this.settingsIframe.remove();
        this.videoElement.remove();
        this.canvas.remove();
    }

    public setPresenting(foo:boolean) {
        this.videoElement.style.display = foo ? 'initial' : 'none';
    }

    public load(): void {
        super.load();
        const realitySession = this.session;
        const remoteRealitySession = this.sessionService.createSessionPort(this.uri);

        remoteRealitySession.on['ar.device.state'] = () => { };
        remoteRealitySession.on['ar.view.uievent'] = () => { };
        remoteRealitySession.on['ar.context.update'] = () => { };
        remoteRealitySession.on['ar.reality.connect'] = () => { };

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
                    else return;

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

        if (typeof document !== 'undefined' && typeof navigator !== 'undefined') {
            window.addEventListener('message', (event) => {
                const origin = event.origin;
                if (origin === 'http://argonjs.io') {
                    this.videoFov = event.data; // TODO: this is not flexible. Should be passing an object with message type and data
                }
            });

            const mediaDevices = navigator.mediaDevices;
            const getUserMedia = (mediaDevices.getUserMedia || mediaDevices['mozGetUserMedia'] ||
                mediaDevices['msGetUserMedia'] || mediaDevices['webkitGetUserMedia']).bind(mediaDevices);

            getUserMedia({ audio: false, video: true }).then((videoStream: MediaStream) => {
                this.videoElement.src = window.URL.createObjectURL(videoStream);
            }).catch((error: DOMException) => {
                remoteRealitySession.errorEvent.raiseEvent(error);  
            });
        }
        
        
        // Only connect after the caller is able to attach connectEvent handlers
        Promise.resolve().then(()=>{
            const messageChannel = this.sessionService.createSynchronousMessageChannel();
            realitySession.open(messageChannel.port1, this.sessionService.configuration);
            remoteRealitySession.open(messageChannel.port2, { role: Role.REALITY_VIEWER, title: 'Local' });
        })
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

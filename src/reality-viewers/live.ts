import { inject } from 'aurelia-dependency-injection'
import { Role } from '../common'
import { SessionService, SessionPort } from '../session'
import { ViewService } from '../view'
import { ContextService } from '../context'
import { DeviceService } from '../device'
import { RealityViewer } from './base'

@inject(SessionService, ViewService, ContextService, DeviceService)
export class LiveRealityViewer extends RealityViewer {

    public videoElement: HTMLVideoElement;

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private videoFov: number;
    
    private settingsIframe: HTMLIFrameElement;

    constructor(
        private sessionService: SessionService,
        private viewService: ViewService,
        private contextService: ContextService,
        private deviceService: DeviceService,
        public uri:string) {
        super(uri);

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
            this.videoElement.style.zIndex = "-100";

            const viewElement = this.viewService.element;
            viewElement.insertBefore(this.settingsIframe, viewElement.firstChild);
            viewElement.insertBefore(this.videoElement, viewElement.firstChild);

            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d')!;

            window.addEventListener('message', (event) => {
                const origin = event.origin;
                if (origin === 'http://argonjs.io') {
                    this.videoFov = event.data; // TODO: this is not flexible. Should be passing an object with message type and data
                }
            });
        }

        this.presentChangeEvent.addEventListener(()=>{
            if (typeof document !== 'undefined') {
                this.videoElement.style.display = this.isPresenting ? 'initial' : 'none';
            }
        })
    }

    public destroy() {
        super.destroy();
        if (typeof document !== 'undefined') {
            this.settingsIframe.remove();
            this.videoElement.remove();
            this.canvas.remove();
        }
    }

    protected setupInternalSession(internalSession:SessionPort) {

        internalSession.connectEvent.addEventListener(() => {

            if (this.videoElement) {
                const videoElement = this.videoElement!;
                const mediaDevices = navigator.mediaDevices;
                const getUserMedia = (mediaDevices.getUserMedia || mediaDevices['mozGetUserMedia'] ||
                    mediaDevices['msGetUserMedia'] || mediaDevices['webkitGetUserMedia']).bind(mediaDevices);
                
                getUserMedia({ audio: false, video: true }).then((videoStream: MediaStream) => {
                    const stopVideoStream = () => {
                        for (const t of videoStream.getTracks()) {
                            t.stop();
                        }
                    }
                    if (internalSession.isConnected) {
                        videoElement.src = window.URL.createObjectURL(videoStream);
                        internalSession.closeEvent.addEventListener(stopVideoStream)
                    } else {
                        stopVideoStream();
                    }
                }).catch((error: DOMException) => {
                    internalSession.errorEvent.raiseEvent(error);  
                });

                // const viewService = this.viewService;
                let lastFrameTime = -1;

                const remove1 = this.deviceService.suggestedGeolocationSubscriptionChangeEvent.addEventListener(()=>{
                    
                    if (this.deviceService.suggestedGeolocationSubscription) {
                        this.deviceService.subscribeGeolocation(this.deviceService.suggestedGeolocationSubscription, internalSession);
                    } else {
                        this.deviceService.unsubscribeGeolocation();
                    }

                });

                const remove2 =this.deviceService.frameStateEvent.addEventListener((frameState)=>{

                    if (videoElement.currentTime != lastFrameTime) {
                        lastFrameTime = videoElement.currentTime;

                        // const videoWidth = videoElement.videoWidth;
                        // const videoHeight = videoElement.videoHeight;

                        const contextFrameState = this.contextService.createFrameState(
                            frameState.time,
                            frameState.viewport,
                            frameState.subviews
                        );
                        
                        internalSession.send('ar.reality.frameState', contextFrameState);
                    }

                });

                internalSession.closeEvent.addEventListener(()=>{
                    remove1();
                    remove2();
                })
            }
        });
    }

    public load(): void {
        const session = this.sessionService.addManagedSessionPort(this.uri);
        session.connectEvent.addEventListener(()=>{
            this.connectEvent.raiseEvent(session);
        });

        const internalSession = this.sessionService.createSessionPort(this.uri);
        internalSession.suppressErrorOnUnknownTopic = true;
        this.setupInternalSession(internalSession);
        
        // Only connect after the caller is able to attach connectEvent handlers
        Promise.resolve().then(()=>{
            if (this.sessionService.manager.isClosed) return;
            const messageChannel = this.sessionService.createSynchronousMessageChannel();
            session.open(messageChannel.port1, this.sessionService.configuration);
            internalSession.open(messageChannel.port2, { role: Role.REALITY_VIEWER, title: 'Live', uri: this.uri, version: this.sessionService.configuration.version });
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

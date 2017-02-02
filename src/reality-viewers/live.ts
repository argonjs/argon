import { inject } from 'aurelia-dependency-injection'
import { JulianDate } from '../cesium/cesium-imports'
import { Role } from '../common'
import { SessionService, SessionPort } from '../session'
import { ViewService } from '../view'
import { ViewportService } from '../viewport'
import { ContextService } from '../context'
import { RealityViewer } from './base'

@inject(SessionService, ViewportService, ViewService, ContextService)
export class LiveRealityViewer extends RealityViewer {

    public videoElement: HTMLVideoElement;

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private videoFov: number;
    
    private settingsIframe: HTMLIFrameElement;

    constructor(
        private sessionService: SessionService,
        private viewportService: ViewportService,
        private viewService: ViewService,
        private contextService: ContextService,
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

            const viewElement = this.viewportService.element;
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

    protected setupInternalSession(session:SessionPort) {
        session.on['ar.device.state'] = () => { };
        session.on['ar.visibility.state'] = () => { };
        session.on['ar.focus.state'] = () => { };
        session.on['ar.viewport.presentationMode'] = () => { };
        session.on['ar.viewport.uievent'] = () => { };
        session.on['ar.view.suggestedViewState'] = () => { };
        session.on['ar.context.update'] = () => { };
        session.on['ar.reality.connect'] = () => { };

        session.connectEvent.addEventListener(() => {
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
                    if (session.isConnected) {
                        videoElement.src = window.URL.createObjectURL(videoStream);
                        session.closeEvent.addEventListener(stopVideoStream)
                    } else {
                        stopVideoStream();
                    }
                }).catch((error: DOMException) => {
                    session.errorEvent.raiseEvent(error);  
                });

                const viewService = this.viewService;
                let lastFrameTime = -1;

                let update = (time: JulianDate) => {
                    if (session.isConnected) 
                        viewService.requestAnimationFrame(update);
                    else return;

                    const suggestedViewState = viewService.suggestedViewState;
                    if (!suggestedViewState) return;

                    if (videoElement.currentTime != lastFrameTime) {
                        lastFrameTime = videoElement.currentTime;

                        // const videoWidth = videoElement.videoWidth;
                        // const videoHeight = videoElement.videoHeight;

                        const frameState = this.contextService.createFrameState(
                            time,
                            suggestedViewState.viewport,
                            suggestedViewState.subviews,
                            viewService.eye
                        );
                        
                        session.send('ar.reality.frameState', frameState);
                    }
                };

                viewService.requestAnimationFrame(update);
            }
        });
    }

    public load(): void {
        const session = this.sessionService.addManagedSessionPort(this.uri);
        session.connectEvent.addEventListener(()=>{
            this.connectEvent.raiseEvent(session);
        });

        const internalSession = this.sessionService.createSessionPort(this.uri);
        this.setupInternalSession(internalSession);
        
        // Only connect after the caller is able to attach connectEvent handlers
        Promise.resolve().then(()=>{
            const messageChannel = this.sessionService.createSynchronousMessageChannel();
            session.open(messageChannel.port1, this.sessionService.configuration);
            internalSession.open(messageChannel.port2, { role: Role.REALITY_VIEWER, title: 'Live' });
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

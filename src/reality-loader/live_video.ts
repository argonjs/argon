import { inject } from 'aurelia-dependency-injection'
import { Role, RealityView } from '../common'
import { SessionService, SessionPort } from '../session'
import { RealityLoader } from '../reality'
import { VuforiaServiceDelegate } from '../vuforia'
import { ViewService } from '../view'

@inject(SessionService, VuforiaServiceDelegate, ViewService)
export class LiveVideoRealityLoader extends RealityLoader {
    public type = 'live-video';

    private videoElement: HTMLVideoElement;

    constructor(
            private sessionService: SessionService,
            private vuforiaDelegate: VuforiaServiceDelegate,
            private viewService: ViewService) {
        super();

        if (typeof document !== 'undefined') {
            this.videoElement = document.createElement('video');
            this.videoElement.style = 'width:100%; height:100%;';
            this.videoElement.controls = false;
            this.videoElement.autoplay = true;

            viewService.containingElementPromise.then((container) => {
                container.insertBefore(this.videoElement, container.firstChild);
            })
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
        })

        if (typeof document !== 'undefined') {
            const mediaDevices = navigator.mediaDevices;

            const getUserMedia = (mediaDevices.getUserMedia || mediaDevices.mozGetUserMedia ||
                mediaDevices.msGetUserMedia || mediaDevices.webkitGetUserMedia).bind(mediaDevices);

            const videoPromise = getUserMedia({ audio: false, video: true });

            videoPromise.then((videoStream: MediaStream) => {
                this.videoElement.src = window.URL.createObjectURL(videoStream);
            });

            videoPromise.catch((error: DOMException) => {
                remoteRealitySession.errorEvent.raiseEvent(error);
            })
        }

        callback(realitySession);
        // Only connect after the caller is able to attach connectEvent handlers
        const messageChannel = this.sessionService.createSynchronousMessageChannel();
        realitySession.open(messageChannel.port1, this.sessionService.configuration);
        remoteRealitySession.open(messageChannel.port2, { role: Role.REALITY_VIEW });
    }

    public static isAvailable(): bool {
        const mediaDevices = navigator.mediaDevices;
        return !!(mediaDevices.getUserMedia || mediaDevices.mozGetUserMedia || mediaDevices.msGetUserMedia || mediaDevices.webkitGetUserMedia);
    }
}

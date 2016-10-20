import { inject } from 'aurelia-dependency-injection'
import { Role, RealityViewer } from '../common'
import { SessionService, SessionPort } from '../session'
import { RealityLoader } from '../reality'
import { ViewService } from '../view'
import { VuforiaServiceDelegate } from '../vuforia'
import * as utils from '../utils'

@inject(SessionService, ViewService, VuforiaServiceDelegate)
export class LiveVideoRealityLoader extends RealityLoader {
    public type = 'live-video';

    constructor(
        private sessionService: SessionService,
        private viewService: ViewService,
        private vuforiaDelegate: VuforiaServiceDelegate) {
        super();
    }

    public load(reality: RealityViewer, callback: (realitySession: SessionPort) => void): void {
        const realitySession = this.sessionService.addManagedSessionPort(reality.uri);
        const remoteRealitySession = this.sessionService.createSessionPort();

        remoteRealitySession.on['ar.context.update'] = () => { };

        remoteRealitySession.connectEvent.addEventListener(() => {
            if (this.viewService.element) {
                const remove = utils.addZoomHandler(this.viewService.element, (zoomData) => {
                    
                });
                remoteRealitySession.closeEvent.addEventListener(remove);
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
        })

        callback(realitySession);
        // Only connect after the caller is able to attach connectEvent handlers
        const messageChannel = this.sessionService.createSynchronousMessageChannel();
        realitySession.open(messageChannel.port1, this.sessionService.configuration);
        remoteRealitySession.open(messageChannel.port2, { role: Role.REALITY_VIEWER });
    }
}

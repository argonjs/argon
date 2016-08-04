import { inject } from 'aurelia-dependency-injection'
import { Role, RealityView } from '../common'
import { SessionService, SessionPort } from '../session'
import { RealityLoader } from '../reality'
import { VuforiaServiceDelegate } from '../vuforia'

@inject(SessionService, VuforiaServiceDelegate)
export class LiveVideoRealityLoader extends RealityLoader {
    public type = 'live-video';

    constructor(
        private sessionService: SessionService,
        private vuforiaDelegate: VuforiaServiceDelegate) {
        super();
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

        callback(realitySession);
        // Only connect after the caller is able to attach connectEvent handlers
        const messageChannel = this.sessionService.createSynchronousMessageChannel();
        realitySession.open(messageChannel.port1, this.sessionService.configuration);
        remoteRealitySession.open(messageChannel.port2, { role: Role.REALITY_VIEW });
    }
}


import { inject } from 'aurelia-dependency-injection'
import { JulianDate } from '../cesium/cesium-imports'
import { Role, ViewState, RealityViewer } from '../common'
import { SessionService, SessionPort } from '../session'
import { DeviceService } from '../device'
import { TimerService } from '../timer'
import { RealityLoader } from '../reality'
import { getSerializedEntityPose } from '../utils'

@inject(SessionService, DeviceService, TimerService)
export class EmptyRealityLoader extends RealityLoader {

    public type = 'empty';

    constructor(
        private sessionService: SessionService,
        private deviceService: DeviceService,
        private timer: TimerService) {
        super();
    }

    public load(reality: RealityViewer, callback: (realitySession: SessionPort) => void): void {
        const realitySession = this.sessionService.addManagedSessionPort(reality.uri);
        const remoteRealitySession = this.sessionService.createSessionPort();
        let doUpdate = true;
        remoteRealitySession.on['ar.context.update'] = () => { };
        remoteRealitySession.connectEvent.addEventListener(() => {
            let update = (time: JulianDate, index: number) => {
                if (doUpdate) {
                    this.deviceService.update({orientation:true});
                    const deviceState = this.deviceService.state;                    
                    const time = <JulianDate>deviceState.time;
                    const pose = getSerializedEntityPose(this.deviceService.displayEntity, time);
                    const viewport = deviceState.viewport;
                    const subviews = deviceState.subviews;
                    if (pose) {
                        const viewState: ViewState = {
                            time,
                            pose,
                            viewport,
                            subviews
                        };
                        remoteRealitySession.send('ar.reality.viewState', viewState);
                    }
                    this.timer.requestFrame(update);
                }
            }
            this.timer.requestFrame(update);
        })
        remoteRealitySession.closeEvent.addEventListener(() => {
            doUpdate = false;
        });

        callback(realitySession);
        // Only connect after the caller is able to attach connectEvent handlers
        const messageChannel = this.sessionService.createSynchronousMessageChannel();
        realitySession.open(messageChannel.port1, this.sessionService.configuration);
        remoteRealitySession.open(messageChannel.port2, { role: Role.REALITY_VIEWER });
    }
}

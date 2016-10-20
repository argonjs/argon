
import { inject } from 'aurelia-dependency-injection'
import { JulianDate } from '../cesium/cesium-imports'
import { Role, ViewState, RealityViewer } from '../common'
import { SessionService, SessionPort } from '../session'
import { DeviceService } from '../device'
import { TimerService } from '../timer'
import { RealityLoader } from '../reality'
import { getSerializedEntityPose } from '../utils'
import { ViewService } from '../view'

@inject(SessionService, DeviceService, ViewService, TimerService)
export class EmptyRealityLoader extends RealityLoader {

    public type = 'empty';

    constructor(
        private sessionService: SessionService,
        private deviceService: DeviceService,
        private viewService: ViewService,
        private timer: TimerService) {
        super();

        this.viewService.containingElementPromise.then((el) => {
                let fov: number = -1;

                if (typeof PointerEvent !== 'undefined') {

                    const evCache = new Array();
                    let startDistSquared = -1;
                    let zoom = 1;

                    const remove_event = (ev) => {
                        // Remove this event from the target's cache
                        for (var i = 0; i < evCache.length; i++) {
                            if (evCache[i].pointerId == ev.pointerId) {
                                evCache.splice(i, 1);
                                break;
                            }
                        }
                    }

                    const pointerdown_handler = (ev) => {
                        // The pointerdown event signals the start of a touch interaction.
                        // This event is cached to support 2-finger gestures
                        evCache.push(ev);
                    }

                    const pointermove_handler = (ev) => {
                        // This function implements a 2-pointer pinch/zoom gesture. 

                        // Find this event in the cache and update its record with this event
                        for (var i = 0; i < evCache.length; i++) {
                            if (ev.pointerId == evCache[i].pointerId) {
                                evCache[i] = ev;
                                break;
                            }
                        }

                        const state = this.contextService.serializedFrameState;
                        if (!state) return;

                        // If two pointers are down, check for pinch gestures
                        if (evCache.length == 2) {
                            // Calculate the distance between the two pointers
                            const curDiffX = Math.abs(evCache[0].clientX - evCache[1].clientX);
                            const curDiffY = Math.abs(evCache[0].clientY - evCache[1].clientY);
                            const currDistSquared = curDiffX * curDiffX + curDiffY * curDiffY;

                            if (startDistSquared == -1) {
                                // start pinch
                                startDistSquared = currDistSquared;
                                fov = state.view.subviews[0].frustum.fov;
                                zoom = 1;
                                this.deviceService.zoom({ zoom, fov, state: ZoomState.START });
                            } else {
                                // change pinch
                                zoom = currDistSquared / startDistSquared;
                                this.deviceService.zoom({ zoom, fov, state: ZoomState.CHANGE });
                            }
                        } else {
                            // end pinch                            
                            this.deviceService.zoom({ zoom, fov, state: ZoomState.END });
                            startDistSquared = -1;
                        }
                    }

                    const pointerup_handler = (ev) => {
                        // Remove this pointer from the cache
                        remove_event(ev);

                        // If the number of pointers down is less than two then reset diff tracker
                        if (evCache.length < 2) startDistSquared = -1;
                    }

                    el.onpointerdown = pointerdown_handler;
                    el.onpointermove = pointermove_handler;

                    // Use same handler for pointer{up,cancel,out,leave} events since
                    // the semantics for these events - in this app - are the same.
                    el.onpointerup = pointerup_handler;
                    el.onpointercancel = pointerup_handler;
                    el.onpointerout = pointerup_handler;
                    el.onpointerleave = pointerup_handler;

                } else {
                    el.addEventListener('gesturestart', (ev: any) => {
                        const state = this.contextService.serializedFrameState;
                        if (state && state.view.subviews[0]) {
                            fov = state.view.subviews[0].frustum.fov;
                            this.deviceService.zoom({ zoom: ev.scale, fov, state: ZoomState.START });
                        }
                        ev.preventDefault();
                    })
                    el.addEventListener('gesturechange', (ev: any) => {
                        this.deviceService.zoom({ zoom: ev.scale, fov, state: ZoomState.CHANGE });
                    })
                    el.addEventListener('gestureend', (ev: any) => {
                        this.deviceService.zoom({ zoom: ev.scale, fov, state: ZoomState.END });
                    })
                }
            })
    }

    private _enablePinchZoom() {
        this.viewService.element
    }

    private _gesturestartListener() {

    }

    private _gesturechnageListener() {

    }

    private _gestureendListener() {

    }

    public load(reality: RealityViewer, callback: (realitySession: SessionPort) => void): void {
        const realitySession = this.sessionService.addManagedSessionPort(reality.uri);
        const remoteRealitySession = this.sessionService.createSessionPort();
        let doUpdate = true;
        removeRealitySession.on['ar.view.uievent'] = () => { };
        remoteRealitySession.on['ar.context.update'] = () => { };
        remoteRealitySession.connectEvent.addEventListener(() => {
            let update = (time: JulianDate) => {
                if (doUpdate) {
                    this.deviceService.update({orientation:true});
                    const deviceState = this.deviceService.state;
                    const pose = getSerializedEntityPose(this.deviceService.displayEntity, time);
                    const viewport = deviceState.viewport;
                    const subviews = deviceState.subviews;
                    const locationAccuracy = deviceState.locationAccuracy;
                    const locationAltitudeAccuracy = deviceState.locationAltitudeAccuracy;
                    if (pose) {
                        const viewState: ViewState = {
                            time,
                            pose,
                            viewport,
                            subviews,
                            locationAccuracy,
                            locationAltitudeAccuracy
                        };
                        remoteRealitySession.send('ar.reality.viewState', viewState);
                    }
                    this.timer.requestFrame(update);
                }
            }
            this.timer.requestFrame(update);
        })

        this._enablePinchZoom();
        remoteRealitySession.closeEvent.addEventListener(() => {
            doUpdate = false;
            this._disablePinchZoom();
        });

        callback(realitySession);
        // Only connect after the caller is able to attach connectEvent handlers
        const messageChannel = this.sessionService.createSynchronousMessageChannel();
        realitySession.open(messageChannel.port1, this.sessionService.configuration);
        remoteRealitySession.open(messageChannel.port2, { role: Role.REALITY_VIEWER });
    }
}

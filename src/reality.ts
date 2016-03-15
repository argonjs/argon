import {inject, All} from 'aurelia-dependency-injection'
import {defined, JulianDate, ReferenceFrame, createGuid} from './cesium/cesium-imports'
import {TimerService} from './timer'
import {Role} from './config'
import {FocusService} from './focus'
import {SessionPort, SessionService} from './session'
import {CameraService, Camera} from './camera'
import {DeviceService} from './device'
import {MessagePortLike, Event, calculatePose} from './utils'
import {ViewportService, Viewport} from './viewport'

/**
* Represents a Reality
*/
export interface Reality {
    type: string;
    id?: string;
    [option: string]: any
}

/**
 * Describes the position, orientation, and referenceFrame of an entity.
 */
export interface EntityPose {
    position?: { x: number, y: number, z: number },
    orientation?: { x: number, y: number, z: number, w: number },
    referenceFrame: ReferenceFrame | string,
}

/**
 * A map of entity ids and their associated poses.
 */
export interface EntityPoseMap {
    EYE?: EntityPose,
    [id: string]: EntityPose
}

/**
 * Describes the minimal frame state that is provided by a reality.
 */
export interface MinimalFrameState {
    frameNumber: number,
    time: JulianDate,
    entities?: EntityPoseMap
    camera?: Camera,
    viewport?: Viewport,
}

/**
 * Describes the complete frame state which is emitted by the RealityService.
 */
export interface FrameState extends MinimalFrameState {
    reality: Reality,
    entities: EntityPoseMap
    camera: Camera,
    viewport: Viewport
}


export abstract class RealitySetupHandler {

    abstract type: string;

    abstract setup(reality: Reality, port: MessagePortLike): void;

}

/**
* Manages reality 
*/
@inject(All.of(RealitySetupHandler),
    SessionService,
    CameraService,
    DeviceService,
    FocusService,
    ViewportService,
    TimerService)
export class RealityService {

    /**
     * The current reality.
     */
    public current: Reality = null;

    /**
     * The desired reality.
     */
    public desired: Reality = null;

    /**
     * An event that is raised when a reality control port is opened.
     */
    public readonly connectEvent = new Event<SessionPort>();

    /**
     * An event that is raised when the current reality is changed.
     */
    public readonly changeEvent = new Event<{ previous: Reality }>();

    /**
     * An event that is raised when the current reality emits the next frame state.
     * This event contains pose updates for the entities that are managed by 
     * the current reality.
     */
    public readonly frameEvent = new Event<FrameState>();

    /**
     * Manager-only. A map from a managed session to the desired reality
     */
    public readonly desiredRealityMap = new WeakMap<SessionPort, Reality>();

    /**
     * Manager-only. A map from a desired reality to the session which requested it
     */
    public readonly desiredRealityMapInverse = new WeakMap<Reality, SessionPort>();

    // Manager-only. The port which connects the manager to the current reality
    private _realitySession: SessionPort;

    constructor(
        public handlers: RealitySetupHandler[],
        private sessionService: SessionService,
        private cameraService: CameraService,
        private deviceService: DeviceService,
        private focusService: FocusService,
        private viewportService: ViewportService) {

        if (sessionService.isManager()) {
            sessionService.connectEvent.addEventListener((session) => {
                session.closeEvent.addEventListener(() => {
                    if (this._realitySession === session) {
                        this._realitySession = null;
                    }
                });

                session.on['ar.reality.desired'] = (message, event) => {
                    const {reality} = message;
                    console.log('Session set desired reality: ' + JSON.stringify(reality));
                    if (reality) {
                        if (this.isSupported(reality.type)) {
                            this.desiredRealityMap.set(session, reality);
                            this.desiredRealityMapInverse.set(reality, session);
                        } else {
                            session.sendError({ message: 'reality type "' + reality.type + '" is not suppored on this platform' });
                        }
                    } else {
                        this.desiredRealityMap.delete(session);
                    }
                    this._setNextReality(this.onSelectReality());
                }

                session.on['ar.reality.message'] = (message) => {
                    if (this.desiredRealityMapInverse.get(this.current) === session) {
                        this._realitySession.send('ar.reality.message', message);
                    }
                }
            });

            sessionService.manager.connectEvent.addEventListener(() => {
                setTimeout(() => {
                    if (!this.desired) this._setNextReality(this.onSelectReality())
                })
            });
        }

        sessionService.manager.on['ar.reality.connect'] = () => {
            const messageChannel = this.sessionService.createMessageChannel();
            const realityControlSession = this.sessionService.createSessionPort();

            messageChannel.port1.onmessage = (msg: MessageEvent) => {
                this.sessionService.manager.send('ar.reality.message', msg.data);
            }

            this.sessionService.manager.on['ar.reality.message'] = (message) => {
                messageChannel.port1.postMessage(message);
            }

            realityControlSession.connectEvent.addEventListener(() => {
                this.connectEvent.raiseEvent(realityControlSession);
            })

            this.sessionService.manager.closeEvent.addEventListener(() => {
                realityControlSession.close();
            });

            realityControlSession.open(messageChannel.port2, this.sessionService.configuration);
        }
    }

    /**
    * Manager-only. Check if a type of reality is supported. 
    * @param type reality type
    * @return true if a handler exists and false otherwise
    */
    public isSupported(type: string): boolean {
        this.sessionService.ensureIsManager();
        return !!this._getHandler(type)
    }

    /**
     * Set the desired reality. 
     */
    public setDesired(reality: { type: string }) {
        if (reality && !reality['id']) reality['id'] = createGuid();
        this.desired = reality;
        this.sessionService.manager.send('ar.reality.desired', { reality });
    }

    /**
    * Manager-only. Selects the best reality based on the realites
    * requested by all managed sessions. Can be overriden for customized selection. 
    *
    * @returns The reality chosen for this context. May be undefined if no
    * realities have been requested.
    */
    public onSelectReality(): Reality {

        this.sessionService.ensureIsManager();

        let selectedReality = this.desiredRealityMap.get(this.sessionService.manager);

        if (!selectedReality) {
            selectedReality = this.desiredRealityMap.get(this.focusService.currentSession);
        }

        if (!selectedReality) {
            // TODO: sort and select based on some kind of ranking system
            for (const session of this.sessionService.managedSessions) {
                const desiredReality = this.desiredRealityMap.get(session);
                if (desiredReality && this.isSupported(desiredReality.type)) {
                    selectedReality = desiredReality;
                    break;
                }
            }
        }

        return selectedReality;
    }

    private _setNextReality(reality: Reality) {
        console.log('Setting reality: ' + JSON.stringify(reality))
        if (this.current && reality && this.current.id === reality.id) return;
        if (this.current && !reality) return;
        if (!this.current && !reality) {
            reality = this.sessionService.configuration.defaultReality;
            if (!reality) return;
            reality.id = 'default';
        }

        const realitySession = this.sessionService.addManagedSessionPort();

        realitySession.on['ar.reality.frameState'] = (state: MinimalFrameState) => {

            const frameState: FrameState = {
                reality,
                frameNumber: state.frameNumber,
                time: state.time,
                viewport: state.viewport || this.viewportService.getSuggested(),
                camera: state.camera || this.cameraService.getSuggested(),
                entities: state.entities || {}
            };

            if (!defined(frameState.entities['DEVICE'])) {
                frameState.entities['DEVICE'] = this.deviceService.getPose(frameState.time);
            }

            if (!defined(frameState.entities['EYE'])) {
                frameState.entities['EYE'] = this.deviceService.getEyePose(frameState.time);
            }

            this.frameEvent.raiseEvent(frameState);
        }

        realitySession.on['ar.reality.message'] = (message) => {
            const owner = this.desiredRealityMapInverse.get(reality) || this.sessionService.manager;
            owner.send('ar.reality.message', message);
        }

        realitySession.connectEvent.addEventListener(() => {
            const previousRealitySession = this._realitySession;
            const previousReality = this.current;

            this._realitySession = realitySession;
            this._setCurrent(reality)

            if (previousRealitySession) {
                previousRealitySession.close();
            }

            if (realitySession.info.role !== Role.REALITY) {
                realitySession.sendError({ message: "Expected a reality session" });
                realitySession.close();
                return;
            }

            if (realitySession.info.enableRealityControlPort) {
                const ownerSession = this.desiredRealityMapInverse.get(reality) || this.sessionService.manager;
                const channel = this.sessionService.createMessageChannel();
                realitySession.send('ar.reality.connect');
                ownerSession.send('ar.reality.connect');
            }
        })

        realitySession.closeEvent.addEventListener(() => {
            console.log('Reality session closed: ' + JSON.stringify(reality));
            this._setNextReality(this.onSelectReality());
        });

        const messageChannel = this.sessionService.createMessageChannel();
        realitySession.open(messageChannel.port1, this.sessionService.configuration);
        this._executeRealitySetupHandler(reality, messageChannel.port2);
    }

    private _getHandler(type: string) {
        let found: RealitySetupHandler = undefined;
        for (const handler of this.handlers) {
            if (handler.type === type) {
                found = handler;
                break;
            }
        }
        return found;
    }

    private _setCurrent(reality: Reality) {
        if (!this.current || this.current.id !== reality.id) {
            const previous = this.current;
            this.current = reality;
            this.changeEvent.raiseEvent({ previous });
            console.log('Reality changed to: ' + JSON.stringify(reality));
        }
    }

    private _executeRealitySetupHandler(reality: Reality, port: MessagePortLike) {
        this.sessionService.ensureIsManager();
        const handler = this._getHandler(reality.type);
        if (!handler) throw new Error('Unable to setup unsupported reality type: ' + reality.type);
        handler.setup(reality, port);
    }

}

@inject(SessionService, TimerService)
export class EmptyRealitySetupHandler implements RealitySetupHandler {

    public type = 'empty';

    constructor(private sessionService: SessionService, private timer: TimerService) { }

    public setup(reality: Reality, port: MessagePortLike) {
        const remoteRealitySession = this.sessionService.createSessionPort();
        let doUpdate = true;
        remoteRealitySession.connectEvent.addEventListener(() => {
            const update = (time: JulianDate, frameNumber: number) => {
                if (doUpdate) {
                    const frameState: MinimalFrameState = {
                        time,
                        frameNumber
                    }
                    remoteRealitySession.send('ar.reality.frameState', frameState);
                    this.timer.requestFrame(update);
                }
            }
            this.timer.requestFrame(update);
        })
        remoteRealitySession.closeEvent.addEventListener(() => {
            doUpdate = false;
        });
        remoteRealitySession.open(port, { role: Role.REALITY });
    }
}

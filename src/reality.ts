import {inject, All} from 'aurelia-dependency-injection'
import {defined, Matrix4, JulianDate, ReferenceFrame, createGuid} from './cesium/cesium-imports'
import {TimerService} from './timer'
import {Role} from './config'
import {FocusService} from './focus'
import {SessionPort, SessionService} from './session'
import {DeviceService} from './device'
import {MessagePortLike, Event, calculatePose} from './utils'

/**
* Represents a view of Reality
*/
export interface RealityView {
    type: string;
    id?: string;
    [option: string]: any
}

/**
 * A which describes the position, orientation, and referenceFrame of an entity.
 */
export interface SerializedEntityPose {
    position?: { x: number, y: number, z: number },
    orientation?: { x: number, y: number, z: number, w: number },
    referenceFrame: ReferenceFrame | string,
}

/**
 * A JSON map of entity ids and their associated poses.
 */
export interface SerializedEntityPoseMap {
    [id: string]: SerializedEntityPose
}

/**
 * Viewport is expressed using a right-handed coordinate system with the origin
 * at the bottom left corner.
 */
export interface Viewport {
    x: number,
    y: number,
    width: number,
    height: number
}

export enum SubviewType {
    /*
     * Identities a subview for a handheld display.
     */
    SINGULAR = "Singular" as any,

    /*
     * Identifies a subview for the left eye (when the user is wearing an HMD or Viewer)
     */
    LEFTEYE = "LeftEye" as any,

    /*
     * Identifies a subview for the right eye (when the user is wearing an HMD or Viewer)
     */
    RIGHTEYE = "RightEye" as any,

    /*
     * Identifies a subview for a custom view configuration
     */
    OTHER = "Other" as any,
}

/**
 * The serialized rendering parameters for a particular subview
 */
export interface SerializedSubview {
    type: SubviewType,
    projectionMatrix: number[],
    // TODO: use viewVolume instead of projectionMatrix as described here // http://www.codeproject.com/Articles/42848/A-New-Perspective-on-Viewing
    pose?: SerializedEntityPose, // if undefined, the primary pose should be assumed
    viewport?: Viewport // if undefined, the primary viewport should be assumed
}

/**
 * The serialized view parameters describe how the application should render each frame
 */
export interface SerializedViewParameters {
    /**
     * The primary viewport to render into. In a DOM environment, the bottom left corner of the document element 
     * (document.documentElement) should be considered the origin. 
     */
    viewport: Viewport,

    /**
     * The primary pose for this view. 
     */
    pose: SerializedEntityPose

    /**
     * The list of subviews to render.
     */
    subviews: SerializedSubview[]
}

/**
 * Describes the serialized frame state.
 */
export interface SerializedFrameState {
    frameNumber: number,
    time: JulianDate,
    view: SerializedViewParameters,
    entities?: SerializedEntityPoseMap
}

/**
 * Describes the complete frame state which is emitted by the RealityService.
 */
export interface FrameState extends SerializedFrameState {
    reality: RealityView,
    entities: SerializedEntityPoseMap
}


export abstract class RealitySetupHandler {

    abstract type: string;

    abstract setup(reality: RealityView, port: MessagePortLike): void;

}

/**
* Manages reality 
*/
@inject(SessionService, FocusService)
export class RealityService {

    /**
     * An event that is raised when a reality control port is opened.
     */
    public connectEvent = new Event<SessionPort>();

    /**
     * An event that is raised when the current reality is changed.
     */
    public changeEvent = new Event<{ previous: RealityView, current: RealityView }>();

    /**
     * An event that is raised when the current reality emits the next frame state.
     * This event contains pose updates for the entities that are managed by 
     * the current reality.
     */
    public frameEvent = new Event<FrameState>();

    /**
     * Manager-only. A map from a managed session to the desired reality
     */
    public desiredRealityMap = new WeakMap<SessionPort, RealityView>();

    /**
     * Manager-only. A map from a desired reality to the session which requested it
     */
    public desiredRealityMapInverse = new WeakMap<RealityView, SessionPort>();

    // Manager-only. The port which connects the manager to the current reality
    private _realitySession: SessionPort;

    // The default reality
    private _default: RealityView = null;

    // The current reality
    private _current: RealityView = null;

    // The desired reality
    private _desired: RealityView = null;

    // RealitySetupHandlers
    private _handlers: RealitySetupHandler[] = [];

    constructor(
        private sessionService: SessionService,
        private focusService: FocusService) {

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
                    if (this.desiredRealityMapInverse.get(this._current) === session) {
                        this._realitySession.send('ar.reality.message', message);
                    }
                }
            });

            sessionService.manager.connectEvent.addEventListener(() => {
                setTimeout(() => {
                    if (!this._desired) this._setNextReality(this.onSelectReality())
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
     * Manager-only. Register a reality setup handler
     */
    public registerHandler(handler: RealitySetupHandler) {
        this.sessionService.ensureIsManager();
        this._handlers.push(handler);
    }

    /**
     * Get the current reality view
     */
    public getCurrent(): RealityView {
        return this._current;
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
        this._desired = reality;
        this.sessionService.manager.send('ar.reality.desired', { reality });
    }

    /** 
     * Get the desired reality
     */
    public getDesired(): RealityView {
        return this._desired;
    }

    /**
     * Set the default reality. Manager-only. 
     */
    public setDefault(reality: RealityView) {
        this.sessionService.ensureIsManager();
        this._default = reality;
        this._default.id = 'default';
    }

    /**
    * Manager-only. Selects the best reality based on the realites
    * requested by all managed sessions. Can be overriden for customized selection. 
    *
    * @returns The reality chosen for this context. May be undefined if no
    * realities have been requested.
    */
    public onSelectReality(): RealityView {

        this.sessionService.ensureIsManager();

        let selectedReality = this.desiredRealityMap.get(this.sessionService.manager);

        if (!selectedReality) {
            selectedReality = this.desiredRealityMap.get(this.focusService.getSession());
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

    private _setNextReality(reality: RealityView) {
        console.log('Setting reality: ' + JSON.stringify(reality))
        if (this._current && reality && this._current.id === reality.id) return;
        if (this._current && !reality) return;
        if (!this._current && !reality) {
            reality = this._default;
            if (!reality) return;
        }

        const realitySession = this.sessionService.addManagedSessionPort();

        realitySession.on['ar.reality.frameState'] = (state: SerializedFrameState) => {

            const frameState: FrameState = {
                reality,
                frameNumber: state.frameNumber,
                time: state.time,
                view: state.view,
                entities: state.entities || {}
            };

            this.frameEvent.raiseEvent(frameState);
        }

        realitySession.on['ar.reality.message'] = (message) => {
            const owner = this.desiredRealityMapInverse.get(reality) || this.sessionService.manager;
            owner.send('ar.reality.message', message);
        }

        realitySession.on['ar.reality.needsVideoBackground'] = (message) => {

        }

        realitySession.connectEvent.addEventListener(() => {
            const previousRealitySession = this._realitySession;
            const previousReality = this._current;

            this._realitySession = realitySession;
            this._setCurrent(reality)

            if (previousRealitySession) {
                previousRealitySession.close();
            }

            if (realitySession.info.role !== Role.REALITY_VIEW) {
                realitySession.sendError({ message: "Expected a reality session" });
                realitySession.close();
                return;
            }

            if (realitySession.info.realityViewSupportsControlPort) {
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
        for (const handler of this._handlers) {
            if (handler.type === type) {
                found = handler;
                break;
            }
        }
        return found;
    }

    private _setCurrent(reality: RealityView) {
        if (!this._current || this._current.id !== reality.id) {
            const previous = this._current;
            this._current = reality;
            this.changeEvent.raiseEvent({ previous, current: reality });
            console.log('Reality changed to: ' + JSON.stringify(reality));
        }
    }

    private _executeRealitySetupHandler(reality: RealityView, port: MessagePortLike) {
        this.sessionService.ensureIsManager();
        const handler = this._getHandler(reality.type);
        if (!handler) throw new Error('Unable to setup unsupported reality type: ' + reality.type);
        handler.setup(reality, port);
    }

}

@inject(SessionService, DeviceService, TimerService)
export class EmptyRealitySetupHandler implements RealitySetupHandler {

    public type = 'empty';

    constructor(
        private sessionService: SessionService,
        private deviceService: DeviceService,
        private timer: TimerService) {
    }

    public setup(reality: RealityView, port: MessagePortLike) {
        const remoteRealitySession = this.sessionService.createSessionPort();
        let doUpdate = true;
        remoteRealitySession.connectEvent.addEventListener(() => {
            const update = (time: JulianDate, frameNumber: number) => {
                if (doUpdate) {
                    this.deviceService.update();
                    const w = document.documentElement.clientWidth;
                    const h = document.documentElement.clientHeight;
                    const frameState: SerializedFrameState = {
                        time,
                        frameNumber,
                        view: {
                            viewport: {
                                x: 0,
                                y: 0,
                                width: w,
                                height: h
                            },
                            pose: calculatePose(this.deviceService.interfaceEntity, time),
                            subviews: [
                                {
                                    type: SubviewType.SINGULAR,
                                    projectionMatrix: Matrix4.computePerspectiveFieldOfView(
                                        Math.PI / 3, w / h, 0.2, 10000000000, <any>[]
                                    )
                                }
                            ]
                        }
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
        remoteRealitySession.open(port, { role: Role.REALITY_VIEW });
    }
}

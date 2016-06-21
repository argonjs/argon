import {inject, All} from 'aurelia-dependency-injection'
import {createGuid, defined, Entity, Cartesian3, Quaternion, CesiumMath, Matrix4, JulianDate, ReferenceFrame } from './cesium/cesium-imports'
import {TimerService} from './timer'
import {Role, SubviewType, SerializedFrameState, RealityView, SerializedEntityPoseMap} from './common'
import {FocusService} from './focus'
import {SessionPort, SessionService} from './session'
import {DeviceService} from './device'
import {MessagePortLike, Event, getSerializedEntityPose} from './utils'

/**
 * Abstract class for a reality setup handler
 */
export abstract class RealityLoader {
    abstract type: string;
    abstract load(reality: RealityView): Promise<SessionPort> | SessionPort;
}

/**
* A service which manages the reality view
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
    public frameEvent = new Event<SerializedFrameState>();

    /**
     * Manager-only. A map from a managed session to the desired reality
     */
    public desiredRealityMap = new WeakMap<SessionPort, RealityView>();

    /**
     * Manager-only. A map from a desired reality to the session which requested it
     */
    public desiredRealityMapInverse = new WeakMap<RealityView, SessionPort>();

    /**
     * Manager-only. An event that is raised when a session changes it's desired reality. 
     */
    public sessionDesiredRealityChangeEvent = new Event<{ session: SessionPort, previous: RealityView, current: RealityView }>();

    // Manager-only. The port which connects the manager to the current reality
    private _realitySession: SessionPort;

    // Manager-only. Represents a pending reality session object.
    private _realitySessionPromise: Promise<SessionPort>

    // The default reality
    private _default: RealityView = null;

    // The current reality
    private _current: RealityView = null;

    // The desired reality
    private _desired: RealityView = null;

    // RealitySetupHandlers
    private _loaders: RealityLoader[] = [];

    constructor(
        private sessionService: SessionService,
        private focusService: FocusService) {

        if (sessionService.isManager) {
            sessionService.manager.connectEvent.addEventListener(() => {
                setTimeout(() => {
                    if (!this._desired) this._setNextReality(this.onSelectReality())
                })
            });
        } else if (sessionService.isRealityView) {
            this.frameEvent.addEventListener((frameState) => {
                if (this.sessionService.manager.isConnected) {
                    this.sessionService.manager.send('ar.reality.frameState', frameState);
                }
            })
        }

        sessionService.connectEvent.addEventListener((session) => {
            if (session.info.role !== Role.REALITY_VIEW) {
                session.on['ar.reality.desired'] = (message, event) => {
                    const {reality} = message;
                    const previous = this.desiredRealityMap.get(session);
                    console.log('Session set desired reality: ' + JSON.stringify(reality));
                    if (reality) {
                        if (this.isSupported(reality.type)) {
                            this.desiredRealityMap.set(session, reality);
                            this.desiredRealityMapInverse.set(reality, session);
                        } else {
                            session.sendError({ message: 'Reality of type "' + reality.type + '" is not available on this platform' });
                            return;
                        }
                    } else {
                        this.desiredRealityMap.delete(session);
                    }
                    this._setNextReality(this.onSelectReality());
                    this.sessionDesiredRealityChangeEvent.raiseEvent({ session, previous, current: reality });
                }
            }
        });

        sessionService.manager.on['ar.reality.connect'] = ({id}: { id: string }) => {
            const realityControlSession = this.sessionService.createSessionPort();
            const messageChannel = this.sessionService.createSynchronousMessageChannel();

            const ROUTE_MESSAGE_KEY = 'ar.reality.message.route.' + id;
            const SEND_MESSAGE_KEY = 'ar.reality.message.send.' + id;
            const CLOSE_SESSION_KEY = 'ar.reality.close.' + id;

            messageChannel.port1.onmessage = (msg: MessageEvent) => {
                this.sessionService.manager.send(ROUTE_MESSAGE_KEY, msg.data);
            }

            this.sessionService.manager.on[SEND_MESSAGE_KEY] = (message) => {
                messageChannel.port1.postMessage(message);
            }

            this.sessionService.manager.on[CLOSE_SESSION_KEY] = (message) => {
                realityControlSession.close();
            }

            realityControlSession.connectEvent.addEventListener(() => {
                this.connectEvent.raiseEvent(realityControlSession);
            })

            this.sessionService.manager.closeEvent.addEventListener(() => {
                realityControlSession.close();
                delete this.sessionService.manager.on[SEND_MESSAGE_KEY];
                delete this.sessionService.manager.on[CLOSE_SESSION_KEY];
            });

            realityControlSession.open(messageChannel.port2, this.sessionService.configuration);
        }
    }

    /**
     * Manager-only. Register a reality loader
     */
    public registerLoader(handler: RealityLoader) {
        this.sessionService.ensureIsManager();
        this._loaders.push(handler);
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
        return !!this._getLoader(type)
    }

    /**
     * Set the desired reality. 
     */
    public setDesired(reality: RealityView) {
        this.sessionService.ensureNotReality();
        this._desired = reality;
        if (this.sessionService.isManager) {
            this._setNextReality(reality);
        } else {
            this.sessionService.manager.send('ar.reality.desired', { reality });
        }
    }

    /** 
     * Get the desired reality
     */
    public getDesired(): RealityView {
        return this._desired;
    }

    /**
     * Set the optional reference frames for this app
     */
    public setOptionalReferenceFrames(referenceFrames: (ReferenceFrame | string)[]) {

    }

    /**
     * Set the optional reference frames for this app
     */
    public setRequiredReferenceFrames(referenceFrames: (ReferenceFrame | string)[]) {

    }

    /**
     * Set the default reality. Manager-only. 
     */
    public setDefault(reality: RealityView) {
        this.sessionService.ensureIsManager();
        this._default = reality;
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
        if (this._current && reality && this._current === reality) return;
        if (this._current && !reality && this._realitySession) return;
        if (!this._current && !reality) {
            reality = this._default;
            if (!reality) return;
        }

        if (!this.isSupported(reality.type)) {
            this.sessionService.errorEvent.raiseEvent(new Error('Reality of type "' + reality.type + '" is not available on this platform'))
            return;
        }

        const realitySessionPromise = Promise.resolve<SessionPort>(this._executeRealityLoader(reality));

        this._realitySessionPromise = realitySessionPromise;
        this._realitySessionPromise.then((realitySession) => {

            if (this._realitySessionPromise !== realitySessionPromise) return;

            if (!realitySession.isConnected) throw new Error('Expected a connected session');

            if (realitySession.info.role !== Role.REALITY_VIEW) {
                realitySession.sendError({ message: "Expected a reality session" });
                realitySession.close();
                throw new Error('The application "' + realitySession.info.name + '" does not support being loaded as a reality');
            }

            const previousRealitySession = this._realitySession;
            const previousReality = this._current;

            if (previousRealitySession) {
                previousRealitySession.close();
            }

            realitySession.on['ar.reality.frameState'] = (state: SerializedFrameState) => {
                this.frameEvent.raiseEvent(state);
            }

            this._realitySession = realitySession;
            this._setCurrent(reality);

            if (realitySession.info['reality.supportsControlPort']) {
                const ownerSession = this.desiredRealityMapInverse.get(reality) || this.sessionService.manager;

                const id = createGuid();
                const ROUTE_MESSAGE_KEY = 'ar.reality.message.route.' + id;
                const SEND_MESSAGE_KEY = 'ar.reality.message.send.' + id;
                const CLOSE_SESSION_KEY = 'ar.reality.close.' + id;

                realitySession.on[ROUTE_MESSAGE_KEY] = (message) => {
                    ownerSession.send(SEND_MESSAGE_KEY, message);
                }

                ownerSession.on[ROUTE_MESSAGE_KEY] = (message) => {
                    realitySession.send(SEND_MESSAGE_KEY, message);
                }

                realitySession.send('ar.reality.connect', { id });
                ownerSession.send('ar.reality.connect', { id });

                realitySession.closeEvent.addEventListener(() => {
                    ownerSession.send(CLOSE_SESSION_KEY);
                    this._realitySession = undefined;
                    console.log('Reality session closed: ' + JSON.stringify(reality));
                    this._setNextReality(this.onSelectReality());
                });

                ownerSession.closeEvent.addEventListener(() => {
                    realitySession.send(CLOSE_SESSION_KEY);
                    realitySession.close();
                })
            }
        }).catch((error) => {
            this.sessionService.errorEvent.raiseEvent(error);
        })
    }

    private _getLoader(type: string) {
        let found: RealityLoader = undefined;
        for (const loader of this._loaders) {
            if (loader.type === type) {
                found = loader;
                break;
            }
        }
        return found;
    }

    private _setCurrent(reality: RealityView) {
        if (!this._current || this._current !== reality) {
            const previous = this._current;
            this._current = reality;
            this.changeEvent.raiseEvent({ previous, current: reality });
            console.log('Reality changed to: ' + JSON.stringify(reality));
        }
    }

    private _executeRealityLoader(reality: RealityView) {
        this.sessionService.ensureIsManager();
        const loader = this._getLoader(reality.type);
        if (!loader) throw new Error('Unable to setup unsupported reality type: ' + reality.type);
        return loader.load(reality);
    }

}

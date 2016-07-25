import {inject, All} from 'aurelia-dependency-injection'
import {
    createGuid,
    defined,
    Cartesian3,
    CesiumMath,
    Entity,
    JulianDate,
    Matrix4,
    PerspectiveFrustum,
    Quaternion,
    ReferenceFrame
} from './cesium/cesium-imports'
import {TimerService} from './timer'
import {
    Role,
    SerializedPartialFrameState,
    SerializedFrameState,
    SerializedViewParameters,
    SerializedEyeParameters,
    SubviewType
} from './common'
import {FocusService} from './focus'
import {SessionPort, SessionService} from './session'
import {DeviceService} from './device'
import {MessagePortLike, Event, getSerializedEntityPose} from './utils'

/**
* Represents a view of Reality
*/
export class RealityView {
    static EMPTY = new RealityView('empty', 'Empty', {
        providedReferenceFrames: ['FIXED']
    });

    public providedReferenceFrames?: Array<string>;

    [option: string]: any;

    constructor(
        public type: string,
        public name: string,
        options?: {
            providedReferenceFrames?: Array<string>
            [option: string]: any
        }) {
        if (options) {
            for (var k in options) {
                this[k] = options[k];
            }
        }
    }
}

/**
 * Abstract class for a reality setup handler
 */
export abstract class RealityLoader {
    abstract type: string;
    abstract load(reality: RealityView, callback: (realitySession: SessionPort) => void);
}

export enum RealityZoomState {
    OTHER,
    START,
    CHANGE,
    END
}

export interface RealityZoomData {
    zoom: number,
    fov: number,
    naturalFov: number,
    state: RealityZoomState
}

/**
* A service which manages the reality view. 
* For an app developer, the RealityService instance can be used to 
* set preferences which can affect how the manager selects a reality view.
*/
@inject(SessionService, FocusService)
export class RealityService {

    /**
     * A collection of known reality views from which the reality service can select.
     */
    public realities = new Array<RealityView>();

    /**
     * An event that is raised when a reality control port is opened.
     */
    public connectEvent = new Event<SessionPort>();

    /**
     * Manager-only. An event that is raised when the current reality is changed.
     */
    private _changeEvent = new Event<{ previous?: RealityView, current: RealityView }>();
    get changeEvent() {
        this.sessionService.ensureIsManager();
        return this._changeEvent;
    }

    /**
     * Manager-only. An event that is raised when the current reality emits the next frame state.
     * This event contains pose updates for the entities that are managed by 
     * the current reality.
     */
    private _frameEvent = new Event<SerializedFrameState>();
    get frameEvent() {
        this.sessionService.ensureIsManager();
        return this._frameEvent;
    }

    /**
     * Manager-only. A map from a managed session to the desired reality
     */
    public desiredRealityMap = new WeakMap<SessionPort, RealityView>();

    /**
     * Manager-only. A map from a desired reality to the session which requested it
     */
    public desiredRealityMapInverse = new WeakMap<RealityView | undefined, SessionPort>();

    /**
     * Manager-only. An event that is raised when a session changes it's desired reality. 
     */
    public sessionDesiredRealityChangeEvent = new Event<{ session: SessionPort, previous: RealityView, current: RealityView }>();

    // Manager-only. The port which connects the manager to the current reality
    private _realitySession?: SessionPort;

    // The default reality
    private _default: RealityView;

    // The current reality
    private _current?: RealityView;

    // The desired reality
    private _desired?: RealityView;

    // RealitySetupHandlers
    private _loaders: RealityLoader[] = [];

    private _defaultFov = Math.PI / 2;
    private _desiredFov: number | undefined;

    private _frustum = new PerspectiveFrustum;

    constructor(
        private sessionService: SessionService,
        private focusService: FocusService) {

        if (sessionService.isManager) {
            sessionService.manager.connectEvent.addEventListener(() => {
                setTimeout(() => {
                    if (!this._current) this._setNextReality(this.onSelectReality())
                })
            });
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

        sessionService.manager.on['ar.reality.zoom'] = (data: RealityZoomData) => {
            this.zoom(data);
        }
    }

    /**     
     * Set the default reality.
     */
    public setDefault(reality: RealityView) {
        this._default = reality;
    }

    /**
     * Manager-only. Register a reality loader
     */
    public registerLoader(handler: RealityLoader) {
        this.sessionService.ensureIsManager();
        this._loaders.push(handler);
    }

    /**
     * Manager-only. Get the current reality view. 
     * @deprecated. Use app.context.getCurrentReality()
     */
    public getCurrent(): RealityView | undefined {
        this.sessionService.ensureIsManager();
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
     * Reality-only. Publish the next frame state. 
     */
    public publishFrame(state: SerializedPartialFrameState) {
        this.sessionService.ensureIsReality();
        if (this.sessionService.manager.isConnected) {
            this.sessionService.manager.send('ar.reality.frameState', state);
        }
    }

    /**
     * Set the desired reality. 
     */
    public setDesired(reality: RealityView | undefined) {
        this.sessionService.ensureNotReality();
        this._desired = reality;
        if (this.sessionService.isManager) {
            this._setNextReality(reality, true);
        } else {
            this.sessionService.manager.send('ar.reality.desired', { reality });
        }
    }

    /** 
     * Get the desired reality
     */
    public getDesired(): RealityView | undefined {
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
     * Set a desired fov in radians.
     */
    public setDesiredFov(fov: number | undefined) {
        this._desiredFov = fov;
        this.zoom({ fov: fov || this._defaultFov, zoom: 1, state: RealityZoomState.OTHER })
    }

    /**
     * Get the desired fov in radians
     */
    public getDesiredFov(): number | undefined {
        return this._desiredFov;
    }

    /**
     * Set the default fov in radians, and adjust the desired fov to match the 
     * previous desired / default ratio. 
     */
    public setDefaultFov(fov: number) {
        if (defined(this._desiredFov)) {
            const ratio = this._desiredFov / this._defaultFov;
            this.setDesiredFov(fov * ratio);
        }
        this._defaultFov = fov;
    }

    /**
     * Get the default fov in radians
     */
    public getDefaultFov() {
        return this._defaultFov;
    }

    /**
     * Returns a maximum viewport
     */
    public getMaximumViewport() {
        if (typeof document !== 'undefined' && document.documentElement) {
            return {
                x: 0,
                y: 0,
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
        throw new Error("Not implemeneted for the current platform");
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
            const focusSession = this.focusService.getSession();
            if (focusSession && focusSession.isConnected) {
                selectedReality = this.desiredRealityMap.get(focusSession);
            }
        }

        if (!selectedReality) {
            // TODO: sort and select based on some kind of ranking system
            for (const session of this.sessionService.managedSessions) {
                if (!session.isConnected) continue;
                const desiredReality = this.desiredRealityMap.get(session);
                if (desiredReality && this.isSupported(desiredReality.type)) {
                    selectedReality = desiredReality;
                    break;
                }
            }
        }

        return selectedReality;
    }

    private _scratchFrustum = new PerspectiveFrustum();
    private _scratchArray = new Array<number>();

    public onGenerateViewFromEyeParameters(eye: SerializedEyeParameters): SerializedViewParameters {
        const fov = eye.fov || this._desiredFov || this._defaultFov;
        const viewport = eye.viewport || this.getMaximumViewport();
        const aspectRatio = eye.aspect || viewport.width / viewport.height;
        this._scratchFrustum.fov = fov;
        this._scratchFrustum.aspectRatio = aspectRatio;
        this._scratchFrustum.near = 0.01;
        this._scratchFrustum.far = 10000000;
        return {
            viewport,
            pose: eye.pose,
            subviews: [
                {
                    type: SubviewType.SINGULAR,
                    frustum: {
                        fov,
                        aspectRatio
                    },
                    // TODO: remove this later  
                    projectionMatrix: Matrix4.toArray(this._scratchFrustum.projectionMatrix, this._scratchArray)
                }
            ]
        }
    }

    public zoom(data: { zoom: number, fov: number, naturalFov?: number, state: RealityZoomState }) {
        data.naturalFov = data.naturalFov || this._defaultFov;
        if (this._realitySession && this._realitySession.info['reality.handlesZoom']) {
            this._realitySession.send('ar.reality.zoom', data);
        } else {
            const fov = this._desiredFov = this.onZoom(<RealityZoomData>data);
            if (this.sessionService.isRealityView) {
                this.sessionService.manager.send('ar.reality.desiredFov', { fov });
            }
        }
    }

    protected onZoom(data: RealityZoomData): number {
        let newFov = 2 * Math.atan(Math.tan(data.fov * 0.5) / data.zoom);
        newFov = Math.max(
            10 * CesiumMath.RADIANS_PER_DEGREE,
            Math.min(newFov, 160 * CesiumMath.RADIANS_PER_DEGREE)
        );
        if (data.state === RealityZoomState.END &&
            Math.abs(newFov - data.naturalFov) < 0.05 /* +-6deg */) {
            newFov = data.naturalFov;
        }
        return newFov;
    }

    private _loadID = -1;

    private _setNextReality(reality?: RealityView, force = false) {
        if (this._current && reality && this._current === reality && !force) return;
        if (this._current && !reality && this._realitySession) return;

        if (!this._current && !defined(reality)) {
            reality = this._default;
        }

        if (defined(reality)) {

            if (!this.isSupported(reality.type)) {
                this.sessionService.errorEvent.raiseEvent(new Error('Reality of type "' + reality.type + '" is not available on this platform'))
                return;
            }

            const loadID = ++this._loadID;

            this._executeRealityLoader(reality, (realitySession) => {
                if (realitySession.isConnected) throw new Error('Expected an unconnected session');
                if (loadID !== this._loadID) {
                    realitySession.close();
                    return;
                }

                const previousRealitySession = this._realitySession;
                const previousReality = this._current;

                this._realitySession = realitySession;
                this._setCurrent(<RealityView>reality);

                realitySession.on['ar.reality.frameState'] = (serializedState: SerializedPartialFrameState) => {
                    const state = <SerializedFrameState>serializedState;
                    if (!defined(serializedState.view)) {
                        if (!defined(serializedState.eye))
                            throw new Error("Unable to construct view configuration: missing eye parameters");
                        state.view = this.onGenerateViewFromEyeParameters(serializedState.eye);
                        state.eye = undefined;
                        state.entities = serializedState.entities || {};
                    }
                    state.reality = <RealityView>this.getCurrent();
                    this.frameEvent.raiseEvent(state);
                }

                realitySession.on['ar.reality.desiredFov'] = (state: { fov: number }) => {
                    this._desiredFov = state.fov;
                }

                realitySession.closeEvent.addEventListener(() => {
                    console.log('Reality session closed: ' + JSON.stringify(reality));
                    // select a new reality if the current reality has closed without 
                    // another reality having been requested
                    if (this._loadID === loadID) {
                        this._realitySession = undefined;
                        this._current = undefined;
                        this._setNextReality(this.onSelectReality());
                    }
                })

                realitySession.connectEvent.addEventListener(() => {

                    if (realitySession.info.role !== Role.REALITY_VIEW) {
                        realitySession.sendError({ message: "Expected a reality session" });
                        realitySession.close();
                        throw new Error('The application "' + realitySession.info.name + '" does not support being loaded as a reality');
                    }

                    if (previousRealitySession) {
                        previousRealitySession.close();
                    }

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
                        });

                        ownerSession.closeEvent.addEventListener(() => {
                            realitySession.send(CLOSE_SESSION_KEY);
                            realitySession.close();
                        })
                    }
                });
            });
        }
    }

    private _getLoader(type: string) {
        let found: RealityLoader | undefined;
        for (const loader of this._loaders) {
            if (loader.type === type) {
                found = loader;
                break;
            }
        }
        return found;
    }

    private _setCurrent(reality: RealityView) {
        if (this._current === undefined || this._current !== reality) {
            const previous = this._current;
            this._current = reality;
            this.changeEvent.raiseEvent({ previous, current: reality });
            console.log('Reality changed to: ' + JSON.stringify(reality));
        }
    }

    private _executeRealityLoader(reality: RealityView, callback: (realitySession: SessionPort) => void) {
        this.sessionService.ensureIsManager();
        const loader = this._getLoader(reality.type);
        if (!loader) throw new Error('Unable to setup unsupported reality type: ' + reality.type);
        loader.load(reality, callback);
    }

}

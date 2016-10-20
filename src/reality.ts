import { inject } from 'aurelia-dependency-injection'
import {
    createGuid,
    defined,
    Matrix4,
    PerspectiveFrustum,
    ReferenceFrame,
    JulianDate
} from './cesium/cesium-imports'
import {
    Role,
    RealityViewer,
    DeprecatedPartialFrameState,
    FrameState,
    ViewState,
    DeprecatedEyeParameters,
    SubviewType
} from './common'
import { FocusService } from './focus'
import { SessionPort, SessionService } from './session'
import { Event } from './utils'

import {ArgonSystem} from './argon'

/**
 * Abstract class for a reality setup handler
 */
export abstract class RealityLoader {
    abstract type: string;
    abstract load(reality: RealityViewer, callback: (realitySession: SessionPort) => void);
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
    public realities = new Array<RealityViewer>();

    /**
     * An event that is raised when a reality control port is opened.
     */
    public connectEvent = new Event<SessionPort>();

    /**
     * Manager-only. An event that is raised when the current reality is changed.
     */
    private _changeEvent = new Event<{ previous?: RealityViewer, current: RealityViewer }>();
    get changeEvent() {
        this.sessionService.ensureIsRealityManager();
        return this._changeEvent;
    }

    /**
     * Manager/Viewer-only. An event that is raised when the current reality emits the next view state.
     */
    private _viewStateEvent = new Event<ViewState>();
    get viewStateEvent() {
        this.sessionService.ensureNotRealityAugmenter();
        return this._viewStateEvent;
    }

    /**
     * Deprecated. Use viewStateEvent. 
     */
    // Remove after v1.2
    private _frameEvent = new Event<FrameState>();
    get frameEvent() {
        this.sessionService.ensureNotRealityAugmenter();
        return this._frameEvent;
    }

    /**
     * Manager-only. A map from a managed session to the desired reality
     */
    public desiredRealityMap = new WeakMap<SessionPort, RealityViewer>();

    /**
     * Manager-only. A map from a desired reality to the session which requested it
     */
    public desiredRealityMapInverse = new WeakMap<RealityViewer | undefined, SessionPort>();

    /**
     * Manager-only. An event that is raised when a session changes it's desired reality. 
     */
    public sessionDesiredRealityChangeEvent = new Event<{ session: SessionPort, previous: RealityViewer|undefined, current: RealityViewer|undefined }>();

    // Manager-only. The port which connects the manager to the current reality
    private _session?: SessionPort;
    get session() {
        return this._session;
    }

    // The default reality
    private _default: RealityViewer;

    // The current reality
    private _current?: RealityViewer;

    // The desired reality
    private _desired?: RealityViewer;

    // RealitySetupHandlers
    private _loaders: RealityLoader[] = [];

    constructor(
        private sessionService: SessionService,
        private focusService: FocusService) {

        if (sessionService.isRealityManager) {
            sessionService.manager.connectEvent.addEventListener(() => {
                setTimeout(() => {
                    if (this._loadID === -1)
                        this._setNextReality(this.onSelectReality())
                })
            });
        }

        sessionService.connectEvent.addEventListener((session) => {
            if (!Role.isRealityViewer(session.info.role)) {
                session.on['ar.reality.desired'] = (message:{reality:RealityViewer}) => {
                    const {reality} = message;
                    const previous = this.desiredRealityMap.get(session);
                    console.log('Session set desired reality: ' + JSON.stringify(reality));
                    if (reality) {
                        if (reality['type']) { // For backwards compatability. Remove in future version. 
                            const type = reality['type'] as string;
                            reality.uri = reality.uri || 'reality:' + type;
                            if (type === 'hosted') reality.uri = reality['url'];
                            if (!reality.title && reality['name']) reality.title = reality['name']; 
                        }
                        if (this.isSupported(reality)) {
                            this.desiredRealityMap.set(session, reality);
                            this.desiredRealityMapInverse.set(reality, session);
                        } else {
                            session.sendError({ message: 'Reality of type "' + reality.uri + '" is not available on this platform' });
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

            this.sessionService.manager.on[CLOSE_SESSION_KEY] = () => {
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
     * Set the default reality.
     */
    public setDefault(reality: RealityViewer) {
        this._default = reality;
    }

    /**
     * Manager-only. Register a reality loader
     */
    public registerLoader(handler: RealityLoader) {
        this.sessionService.ensureIsRealityManager();
        this._loaders.push(handler);
    }

    /**
     * Manager-only. Get the current reality view. 
     * @deprecated. Use app.context.getCurrentReality()
     */
    public getCurrent(): RealityViewer | undefined {
        this.sessionService.ensureNotRealityAugmenter();
        return this._current;
    }

    /**
    * Manager-only. Check if a type of reality is supported. 
    * @param type reality type
    * @return true if a handler exists and false otherwise
    */
    public isSupported(reality: RealityViewer): boolean {
        this.sessionService.ensureIsRealityManager();
        return !!this._getLoader(reality)
    }

    /**
     * Deprecated. Use pubishViewState. 
     * @deprecated 
     */
    public publishFrame(state: DeprecatedPartialFrameState) {
        console.warn('publishFrame is deprecated. Use publishViewState()');
        this.sessionService.ensureIsRealityViewer();
        if (this.sessionService.manager.isConnected) {
            this.sessionService.manager.send('ar.reality.frameState', state);
        }
    }

    /**
     * RealityViewer-only. Publish the next view state.
     */
    public publishViewState(view: ViewState) {
        this.sessionService.ensureIsRealityViewer();
        if (this.sessionService.manager.isConnected) {
            this.sessionService.manager.send('ar.reality.viewState', view);
            if (view.pose) this.viewStateEvent.raiseEvent(view);
        }
    }

    /**
     * Set the desired reality. 
     */
    public setDesired(reality: RealityViewer | undefined) {
        this.sessionService.ensureNotRealityViewer();
        this._desired = reality;
        if (this.sessionService.isRealityManager) {
            this._setNextReality(reality, true);
        } else {
            this.sessionService.manager.send('ar.reality.desired', { reality });
        }
    }

    /** 
     * Get the desired reality
     */
    public getDesired(): RealityViewer | undefined {
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
    * Manager-only. Selects the best reality based on the realites
    * requested by all managed sessions. Can be overriden for customized selection. 
    *
    * @returns The reality chosen for this context. May be undefined if no
    * realities have been requested.
    */
    public onSelectReality(): RealityViewer|undefined {

        this.sessionService.ensureIsRealityManager();

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
                if (desiredReality && this.isSupported(desiredReality)) {
                    selectedReality = desiredReality;
                    break;
                }
            }
        }

        return selectedReality;
    }

    private _scratchFrustum = new PerspectiveFrustum();
    private _scratchArray = new Array<number>();

    /**
     * Deprecated. Remove after v1.2
     * @private
     */
    public onGenerateViewFromEyeParameters(eye: DeprecatedEyeParameters, t:JulianDate): ViewState|undefined {
        const fov = eye.fov || (ArgonSystem.instance!).device.state.defaultFov;
        const viewport = eye.viewport || (ArgonSystem.instance!).device.state.viewport;
        const aspectRatio = eye.aspect || viewport.width / viewport.height;
        this._scratchFrustum.fov = fov;
        this._scratchFrustum.aspectRatio = aspectRatio;
        this._scratchFrustum.near = 0.01;
        this._scratchFrustum.far = 10000000;
        return eye.pose ? {
            time:t,
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
            ],
            locationAccuracy: undefined,
            locationAltitudeAccuracy: undefined
        } : undefined;
    }

    private _loadID = -1;

    private _setNextReality(reality?: RealityViewer, force = false) {
        if (this._current && reality && this._current === reality && !force) return;
        if (this._current && !reality && this._session) return;

        if (!this._current && !defined(reality)) {
            reality = this._default;
        }

        if (defined(reality)) {

            if (!this.isSupported(reality)) {
                this.sessionService.errorEvent.raiseEvent(new Error('Reality of type "' + reality.uri + '" is not available on this platform'))
                return;
            }

            const loadID = ++this._loadID;

            this._executeRealityLoader(reality, (realitySession) => {
                if (realitySession.isConnected) throw new Error('Expected an unconnected session');
                if (loadID !== this._loadID) {
                    realitySession.close();
                    return;
                }

                const previousRealitySession = this._session;

                this._session = realitySession;
                this._setCurrent(<RealityViewer>reality);

                realitySession.on['ar.reality.viewState'] = (viewState: ViewState) => {
                    if (viewState.pose) {
                        this.viewStateEvent.raiseEvent(viewState);
                    }
                }

                // Deprecated. Remove after v1.2
                realitySession.on['ar.reality.frameState'] = (serializedState: DeprecatedPartialFrameState) => {
                    const state = <FrameState>serializedState;
                    if (!defined(serializedState.view)) {
                        if (!defined(serializedState.eye))
                            throw new Error("Unable to construct view configuration: missing eye parameters");
                        const view = this.onGenerateViewFromEyeParameters(serializedState.eye, <JulianDate>state.time);
                        if (!view || !view.pose) return;
                        this.viewStateEvent.raiseEvent(view);
                    } else {
                        if (state.view && state.view.pose) {
                            this.viewStateEvent.raiseEvent(state.view);
                        }
                    }
                }

                realitySession.closeEvent.addEventListener(() => {
                    console.log('Reality session closed: ' + JSON.stringify(reality));
                    // select a new reality if the current reality has closed without 
                    // another reality having been requested
                    if (this._loadID === loadID) {
                        this._session = undefined;
                        this._current = undefined;
                        this._setNextReality(this.onSelectReality());
                    }
                })

                realitySession.connectEvent.addEventListener(() => {

                    if (!Role.isRealityViewer(realitySession.info.role)) {
                        realitySession.sendError({ message: "Expected a reality viewer" });
                        realitySession.close();
                        throw new Error('The application "' + realitySession.uri + '" does not support being loaded as a reality viewer');
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

    private _getLoader(reality: RealityViewer) {
        let found: RealityLoader | undefined;
        for (const loader of this._loaders) {
            if (loader.type === RealityViewer.getType(reality)) {
                found = loader;
                break;
            }
        }
        return found;
    }

    private _setCurrent(reality: RealityViewer) {
        if (this._current === undefined || this._current !== reality) {
            const previous = this._current;
            this._current = reality;
            this.changeEvent.raiseEvent({ previous, current: reality });
            console.log('Reality changed to: ' + JSON.stringify(reality));
        }
    }

    private _executeRealityLoader(reality: RealityViewer, callback: (realitySession: SessionPort) => void) {
        this.sessionService.ensureIsRealityManager();
        const loader = this._getLoader(reality);
        if (!loader) throw new Error('Unable to setup unsupported reality type: ' + reality.uri);
        loader.load(reality, callback);
    }

}

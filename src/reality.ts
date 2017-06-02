import { autoinject, inject, Factory } from 'aurelia-dependency-injection'
import {
    createGuid,
    PerspectiveFrustum,
    Matrix4,
    Cartographic
} from './cesium/cesium-imports'
import {
    Role,
    ContextFrameState,
    CanvasViewport,
    Viewport,
    SerializedSubviewList
} from './common'
import { SessionPort, SessionService } from './session'
import { Event, deprecated, decomposePerspectiveProjectionMatrix } from './utils'
import { ContextService } from './context'
import { FocusServiceProvider } from './focus'
import { VisibilityServiceProvider } from './visibility'

import { RealityViewer } from './reality-viewers/base'
import { EmptyRealityViewer } from './reality-viewers/empty'
import { LiveRealityViewer } from './reality-viewers/live'
import { HostedRealityViewer } from './reality-viewers/hosted'

import {ViewServiceProvider} from './view'
import {DeviceService} from './device'

@inject(Factory.of(EmptyRealityViewer), Factory.of(LiveRealityViewer), Factory.of(HostedRealityViewer))
export abstract class RealityViewerFactory {
    constructor(
        private _createEmptyReality, 
        private _createLiveReality, 
        private _createHostedReality) {
    }

    createRealityViewer(uri:string) : RealityViewer {
        switch (RealityViewer.getType(uri)) {
            case RealityViewer.EMPTY: 
                return this._createEmptyReality(uri);
            case RealityViewer.LIVE:
                return this._createLiveReality(uri);
            case 'hosted':
                return this._createHostedReality(uri);
            default:
                throw new Error('Unsupported Reality Viewer: ' + uri)
        }
    }
}

/**
* A service which makes requests to manage the reality viewer.
*/
@autoinject()
export class RealityService {

    /**
     * An event that provides a session for sending / receiving 
     * commands to / from a reality. 
     * 
     * The session passed via this event can represent either endpoint of
     * a connection between RealityViewer <--> RealityAugmenter/RealityManager.
     * 
     * If running in a RealityAugmenter, the session
     * represents a connection to a RealityViewer.
     * 
     * If running in a RealityViewer, the session
     * represents a connection to a RealityAugmenter.
     */
    public get connectEvent() { return this._connectEvent };
    private _connectEvent = new Event<SessionPort>();

    /**
     * A collection of connected sessions. 
     * 
     * If running in a RealityAugmenter, this collection
     * represents connections to any loaded RealityViewers.
     * 
     * If running in a RealityViewer, this collection
     * represents connections to any RealityAugmenters.
     */
    public get sessions() { return this._sessions };
    private _sessions:SessionPort[] = [];

    /**
     * An event that is raised when the presenting reality viewer is changed.
     */
    public get changeEvent() {
        return this._changeEvent;
    }
    private _changeEvent = new Event<{ previous?: string, current: string }>();

    /**
     * The URI for the currently presenting Reality Viewer. 
     */
    public get current(): string | undefined {
        return this._current;
    }
    private _current?: string;

    /**
     * The default Reality Viewer.
     */
    public default = RealityViewer.EMPTY;

    // private _scratchFrustum = new PerspectiveFrustum();

    constructor(
        private sessionService: SessionService,
        private contextService: ContextService
    ) {

        sessionService.manager.on['ar.reality.connect'] = ({id}: { id: string }) => {
            const realityControlSession = this.sessionService.createSessionPort(id);
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
                this.sessions.push(realityControlSession);
                this.connectEvent.raiseEvent(realityControlSession);
                realityControlSession.closeEvent.addEventListener(()=>{
                    const idx = this.sessions.indexOf(realityControlSession);
                    this.sessions.splice(idx,1);
                });
            })

            this.sessionService.manager.closeEvent.addEventListener(() => {
                realityControlSession.close();
                delete this.sessionService.manager.on[SEND_MESSAGE_KEY];
                delete this.sessionService.manager.on[CLOSE_SESSION_KEY];
            });

            realityControlSession.open(messageChannel.port2, this.sessionService.configuration);
        };
        
        // let i = 0;

        this.contextService.updateEvent.addEventListener(()=>{
            const frameState = this.contextService.serializedFrameState;
            if (sessionService.isRealityViewer && sessionService.manager.isConnected) {
                // backwards compatability
                if (sessionService.manager.isConnected && sessionService.manager.version[0] === 0) {
                    const eye = frameState['eye'] = frameState['eye'] || {};
                    eye.pose = frameState.entities['ar.user'];
                    eye.viewport = Viewport.clone(frameState.subviews[0].viewport, eye.viewport);
                    delete frameState.entities['ar.user'];
                    // throttle for 30fps
                    // i++ % 2 === 0 && 
                    sessionService.manager.send('ar.reality.frameState', frameState);
                    frameState.entities['ar.user'] = eye.pose;
                } else {
                    sessionService.manager.send('ar.reality.frameState', frameState);
                }   
            }
            
            const current = frameState.reality!;
            const previous = this._current;
            if (previous !== current) {
                this._current = current;
                this.changeEvent.raiseEvent({ previous, current });
            }
        });
    }

    /**
     * Install the specified reality viewer
     */
    public install(uri: string) : Promise<void> {
        return this.sessionService.manager.whenConnected().then(()=>{
            if (this.sessionService.manager.version[0] >= 1 !== true)
                return Promise.reject(new Error('Not supported'))
            return this.sessionService.manager.request('ar.reality.install', {uri});
        });
    }
    
    /**
     * Uninstall the specified reality viewer
     */
    public uninstall(uri: string): Promise<void> {
        return this.sessionService.manager.whenConnected().then(()=>{
            if (this.sessionService.manager.version[0] >= 1 !== true)
                return Promise.reject(new Error('Not supported'))
            return this.sessionService.manager.request('ar.reality.uninstall', {uri});
        });
    }

    /**
     * Request a reality viewer to be presented. 
     * - Pass a url to request a (custum) hosted reality viewer
     * - [[RealityViewer.DEFAULT]] to request the system default reality viewer
     * - [[RealityViewer.LIVE]] to request a live reality viewer 
     * - [[RealityViewer.EMPTY]] to request an empty reality viewer
     */
    public request(uri:string): Promise<void> {
        return this.sessionService.manager.whenConnected().then(()=>{
            if (this.sessionService.manager.version[0] >= 1 !== true)
                return this.sessionService.manager.request('ar.reality.desired', {reality:{uri}});
            return this.sessionService.manager.request('ar.reality.request', {uri});
        });
    }

    /**
     * Deprecated. Use [[RealityService#request]]
     * @deprecated
     */
    @deprecated('request')
    public setDesired(reality: {uri:string} | undefined) {
        this.request(reality ? reality.uri : RealityViewer.DEFAULT);
    }


    /**
     * Ask a reality to move the stage to the given geolocation
     */
    public setStageGeolocation(realitySession:SessionPort, geolocation:Cartographic) : Promise<void> {
        if (!realitySession.supportsProtocol('ar.configureStage')) 
            return Promise.reject('Protocol `ar.configureStage` is not supported'); 
        return realitySession.request('ar.configureStage.setStageGeolocation', {geolocation});
    }

    /**
     * Ask a reality to move the stage to the given geolocation
     */
    public resetStageGeolocation(realitySession:SessionPort) : Promise<void> {
        if (!realitySession.supportsProtocol('ar.configureStage')) 
            return Promise.reject('Protocol `ar.configureStage` is not supported'); 
        return realitySession.request('ar.configureStage.resetStageGeolocation');
    }

}

@autoinject
export class RealityServiceProvider {

    /**
     * An event that is raised when a reality viewer is installed.
     */
    public installedEvent = new Event<{ viewer:RealityViewer }>();

    /**
     * An event that is raised when a reality viewer is uninstalled.
     */
    public uninstalledEvent = new Event<{ viewer:RealityViewer }>();

    public get presentingRealityViewer() { return this._presentingRealityViewer }
    private _presentingRealityViewer:RealityViewer|undefined;

    private _viewerByURI = new Map<string, RealityViewer>();
    private _installersByURI = new Map<string, Set<SessionPort>>();

    constructor(
        private sessionService:SessionService,
        private realityService:RealityService,
        private contextService:ContextService,
        private deviceService:DeviceService,
        private viewServiceProvider:ViewServiceProvider,
        private visibilityServiceProvider:VisibilityServiceProvider,
        private focusServiceProvider: FocusServiceProvider,
        private realityViewerFactory:RealityViewerFactory,
    ) {
        sessionService.ensureIsRealityManager();
        
        sessionService.manager.connectEvent.addEventListener(() => {
            setTimeout(() => {
                if (!this._presentingRealityViewer && this.realityService.default)
                    this._handleRequest(this.sessionService.manager, {
                        uri:this.realityService.default
                    });
            });
        });

        sessionService.manager.closeEvent.addEventListener(()=>{
            this._viewerByURI.forEach((v)=>{
                v.destroy();
            });
        });

        sessionService.connectEvent.addEventListener((session) => {
            if (!Role.isRealityViewer(session.info.role)) {
                session.on['ar.reality.install'] = ({uri}:{uri:string}) => {
                    return this._handleInstall(session, uri);
                };
                session.on['ar.reality.uninstall'] = ({uri}:{uri:string}) => {
                    return this._handleUninstall(session, uri);
                };
                session.on['ar.reality.request'] = (message:{uri:string}) => {
                    return this._handleRequest(session, message);
                };
                // For backwards compatability. 
                session.on['ar.reality.desired'] = (message:{reality:{uri:string}}) => {
                    const {reality} = message;
                    if (reality) {
                        if (reality['type']) {
                            const type = reality['type'] as string;
                            reality.uri = reality.uri || 'reality:' + type;
                            if (type === 'hosted') reality.uri = reality['url'];
                        }
                    }
                    this._handleRequest(session, {uri:reality.uri});
                }
            }
        });
        
        this.viewServiceProvider.forwardedUIEvent.addEventListener((uievent)=>{
            const session = this._presentingRealityViewer && this._presentingRealityViewer.session;
            if (session) this.viewServiceProvider.sendUIEventToSession(uievent, session);
        });
    }

    private _scratchFrustum = new PerspectiveFrustum;

    private _handleInstall(session:SessionPort, uri:string) {
        let installers = this._installersByURI.get(uri);

        if (installers) {
            installers.add(session);
        } else {
            const viewer = this.realityViewerFactory.createRealityViewer(uri);
            this._viewerByURI.set(uri, viewer);

            installers = new Set<SessionPort>();
            installers.add(session);
            this._installersByURI.set(uri, installers);

            viewer.connectEvent.addEventListener((viewerSession)=>{

                if (this.sessionService.manager.isClosed) return;

                if (!Role.isRealityViewer(viewerSession.info.role)) {
                    viewerSession.sendError({ message: "Expected a reality viewer" });
                    viewerSession.close();
                    throw new Error('The application "' + viewerSession.uri + '" does not support being loaded as a reality viewer');
                }

                viewerSession.on['ar.reality.frameState'] = (frame: ContextFrameState) => {
                    if (this._presentingRealityViewer === viewer) {
                        if (viewerSession.version[0] === 0) { // backwards compatability
                            const deviceState = this.deviceService.frameState;
                            if (!deviceState) return;
                            frame.viewport = CanvasViewport.clone(deviceState.viewport, frame.viewport)!;
                            frame.subviews = SerializedSubviewList.clone(deviceState.subviews, frame.subviews)!;
                            const eye = frame['eye'];
                            const eyePose = eye.pose;
                            const eyeFov = eye.fov;
                            frame.entities = frame.entities || {};
                            frame.entities['ar.user'] = eyePose;
                            for (const s of frame.subviews) {
                                const f:PerspectiveFrustum = decomposePerspectiveProjectionMatrix(s.projectionMatrix, s['frustum'] || {});
                                f.fov = eyeFov;
                                this._scratchFrustum.clone(f);
                                s.projectionMatrix = Matrix4.clone(this._scratchFrustum.projectionMatrix, s.projectionMatrix);
                            }
                        }
                        frame.reality = viewer.uri;
                        this.contextService.submitFrameState(frame);
                    }
                }

                if (viewerSession.info['supportsCustomProtocols']) {
                    this._connectViewerWithSession(viewerSession, this.sessionService.manager);
                    
                    for (session of this.sessionService.managedSessions) {
                        this._connectViewerWithSession(viewerSession, session);
                    }

                    const remove = this.sessionService.connectEvent.addEventListener((session)=>{
                        this._connectViewerWithSession(viewerSession, session);
                    })
                    
                    viewerSession.closeEvent.addEventListener(()=>remove());
                }

                const removePresentChangeListener = viewer.presentChangeEvent.addEventListener(()=>{
                    this.visibilityServiceProvider.set(viewerSession, viewer.isPresenting)
                });

                this.visibilityServiceProvider.set(viewerSession, viewer.isPresenting);

                viewerSession.closeEvent.addEventListener(() => {
                    removePresentChangeListener();
                    this.contextService.entities.removeById(viewerSession.uri);
                    console.log('Reality session closed: ' + uri);
                });
            });

            viewer.load();
            this.installedEvent.raiseEvent({viewer});
        }
    }

    private _connectViewerWithSession(viewerSession:SessionPort, session:SessionPort) {
        if (Role.isRealityViewer(session.info.role)) return;

        const id = createGuid();
        const ROUTE_MESSAGE_KEY = 'ar.reality.message.route.' + id;
        const SEND_MESSAGE_KEY = 'ar.reality.message.send.' + id;
        const CLOSE_SESSION_KEY = 'ar.reality.close.' + id;

        viewerSession.on[ROUTE_MESSAGE_KEY] = (message) => {
            session.send(SEND_MESSAGE_KEY, message);
        }

        session.on[ROUTE_MESSAGE_KEY] = (message) => {
            viewerSession.send(SEND_MESSAGE_KEY, message);
        }

        viewerSession.send('ar.reality.connect', { id });
        session.send('ar.reality.connect', { id });

        viewerSession.closeEvent.addEventListener(() => {
            session.send(CLOSE_SESSION_KEY);
        });

        session.closeEvent.addEventListener(() => {
            viewerSession.send(CLOSE_SESSION_KEY);
        })
    }

    protected _handleUninstall(session: SessionPort, uri:string) {
        const installers = this._installersByURI.get(uri);
        if (installers) {
            if (installers.size === 0) {
                const viewer = this._viewerByURI.get(uri)!;
                this._viewerByURI.delete(uri);
                viewer.destroy();
                this.uninstalledEvent.raiseEvent({viewer});
            }
        }
        return Promise.reject(new Error("Unable to uninstall a reality viewer which is not installed"));
    }

    protected _handleRequest(session: SessionPort, options:{uri:string}) : Promise<void> {
        if (this.focusServiceProvider.session === session || session === this.sessionService.manager) {
            
            let uri = options && options.uri || RealityViewer.DEFAULT;

            switch (uri) {
                case RealityViewer.DEFAULT: 
                    uri = this.realityService.default;
            }
            
            this._handleInstall(session, uri);
            this._setPresentingRealityViewer(this._viewerByURI.get(uri)!);

            return Promise.resolve();
        }

        throw new Error('Request Denied');
    }

    private _setPresentingRealityViewer(viewer: RealityViewer) {
        if (!viewer) throw new Error('Invalid State. Expected a RealityViewer instance');
        if (this._presentingRealityViewer === viewer) return;
    
        this._viewerByURI.forEach((v)=>{
            v.setPresenting(v === viewer);
        });

        this._presentingRealityViewer = viewer;
        console.log('Presenting reality viewer changed to: ' + viewer.uri);
    }

    public getViewerByURI(uri: string) {
        return this._viewerByURI.get(uri);
    }

    public removeInstaller(installerSession: SessionPort) {
        this._viewerByURI.forEach((viewer, realityUri, map)=>{
            const installers = this._installersByURI.get(realityUri);
            if (installers && installers.has(installerSession)) {
                installers.delete(installerSession);
                if (installers.size === 0 && viewer.session) {
                    this._handleUninstall(viewer.session, realityUri);
                    this._installersByURI.delete(realityUri);
                }
            }
        });
    }
}
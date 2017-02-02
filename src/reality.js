var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, inject, Factory } from 'aurelia-dependency-injection';
import { createGuid } from './cesium/cesium-imports';
import { Role } from './common';
import { SessionService } from './session';
import { Event, deprecated } from './utils';
import { ContextService } from './context';
import { FocusServiceProvider } from './focus';
import { VisibilityServiceProvider } from './visibility';
import { ViewportServiceProvider } from './viewport';
import { RealityViewer } from './reality-viewers/base';
import { EmptyRealityViewer } from './reality-viewers/empty';
import { LiveRealityViewer } from './reality-viewers/live';
import { HostedRealityViewer } from './reality-viewers/hosted';
let RealityViewerFactory = class RealityViewerFactory {
    constructor(_createEmptyReality, _createLiveReality, _createHostedReality) {
        this._createEmptyReality = _createEmptyReality;
        this._createLiveReality = _createLiveReality;
        this._createHostedReality = _createHostedReality;
    }
    createRealityViewer(uri) {
        switch (RealityViewer.getType(uri)) {
            case RealityViewer.EMPTY:
                return this._createEmptyReality(uri);
            case RealityViewer.LIVE:
                return this._createLiveReality(uri);
            case 'hosted':
                return this._createHostedReality(uri);
            default:
                throw new Error('Unsupported Reality Viewer: ' + uri);
        }
    }
};
RealityViewerFactory = __decorate([
    inject(Factory.of(EmptyRealityViewer), Factory.of(LiveRealityViewer), Factory.of(HostedRealityViewer)),
    __metadata("design:paramtypes", [Object, Object, Object])
], RealityViewerFactory);
export { RealityViewerFactory };
/**
* A service which makes requests to manage the reality viewer.
*/
let RealityService = class RealityService {
    constructor(sessionService, contextService) {
        this.sessionService = sessionService;
        this.contextService = contextService;
        this._connectEvent = new Event();
        this._changeEvent = new Event();
        /**
         * The default Reality Viewer.
         */
        this.default = RealityViewer.EMPTY;
        sessionService.manager.on['ar.reality.connect'] = ({ id }) => {
            const realityControlSession = this.sessionService.createSessionPort(id);
            const messageChannel = this.sessionService.createSynchronousMessageChannel();
            const ROUTE_MESSAGE_KEY = 'ar.reality.message.route.' + id;
            const SEND_MESSAGE_KEY = 'ar.reality.message.send.' + id;
            const CLOSE_SESSION_KEY = 'ar.reality.close.' + id;
            messageChannel.port1.onmessage = (msg) => {
                this.sessionService.manager.send(ROUTE_MESSAGE_KEY, msg.data);
            };
            this.sessionService.manager.on[SEND_MESSAGE_KEY] = (message) => {
                messageChannel.port1.postMessage(message);
            };
            this.sessionService.manager.on[CLOSE_SESSION_KEY] = () => {
                realityControlSession.close();
            };
            realityControlSession.connectEvent.addEventListener(() => {
                this.connectEvent.raiseEvent(realityControlSession);
            });
            this.sessionService.manager.closeEvent.addEventListener(() => {
                realityControlSession.close();
                delete this.sessionService.manager.on[SEND_MESSAGE_KEY];
                delete this.sessionService.manager.on[CLOSE_SESSION_KEY];
            });
            realityControlSession.open(messageChannel.port2, this.sessionService.configuration);
        };
        this.contextService.frameStateEvent.addEventListener((frameState) => {
            if (sessionService.isRealityViewer && sessionService.manager.isConnected)
                sessionService.manager.send('ar.reality.frameState', frameState);
            const current = frameState.reality;
            const previous = this._current;
            if (previous !== current) {
                this.changeEvent.raiseEvent({ previous, current });
            }
        });
    }
    /**
     * An event that is raised when a reality viewer provides a session
     * for sending and receiving application commands.
     */
    get connectEvent() { return this._connectEvent; }
    ;
    /**
     * An event that is raised when the presenting reality viewer is changed.
     */
    get changeEvent() {
        return this._changeEvent;
    }
    /**
     * The URI for the currently presenting Reality Viewer.
     */
    get current() {
        return this._current;
    }
    /**
     * RealityViewer-only. Publish the next view state.
     */
    // public publishViewState(viewState: ViewState) {
    //     this.sessionService.ensureIsRealityViewer();
    //     if (this.sessionService.isRealityViewer) {
    //         if (this.sessionService.manager.isConnected)
    //             this.sessionService.manager.send('ar.reality.viewState', viewState);
    //         viewState.reality = 'self';
    //     }
    //     this.contextService.pushNextFrameState(viewState);
    // }
    /**
     * Install the specified reality viewer
     */
    install(uri) {
        return this.sessionService.manager.request('ar.reality.install', { uri });
    }
    /**
     * Uninstall the specified reality viewer
     */
    uninstall(uri) {
        return this.sessionService.manager.request('ar.reality.uninstall', { uri });
    }
    /**
     * Request a reality viewer to be presented.
     * - Pass a url to request a (custum) hosted reality viewer
     * - [[RealityViewer.DEFAULT]] to request the system default reality viewer
     * - [[RealityViewer.LIVE]] to request a live reality viewer
     * - [[RealityViewer.EMPTY]] to request an empty reality viewer
     */
    request(uri) {
        return this.sessionService.manager.request('ar.reality.request', { uri });
    }
    /**
     * Deprecated. Use [[RealityService#request]]
     * @deprecated
     */
    setDesired(reality) {
        this.request(reality ? reality.uri : RealityViewer.DEFAULT);
    }
};
__decorate([
    deprecated('request'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RealityService.prototype, "setDesired", null);
RealityService = __decorate([
    autoinject(),
    __metadata("design:paramtypes", [SessionService,
        ContextService])
], RealityService);
export { RealityService };
let RealityServiceProvider = class RealityServiceProvider {
    constructor(sessionService, realityService, contextService, viewportServiceProvider, visibilityServiceProvider, focusServiceProvider, realityViewerFactory) {
        this.sessionService = sessionService;
        this.realityService = realityService;
        this.contextService = contextService;
        this.viewportServiceProvider = viewportServiceProvider;
        this.visibilityServiceProvider = visibilityServiceProvider;
        this.focusServiceProvider = focusServiceProvider;
        this.realityViewerFactory = realityViewerFactory;
        /**
         * An event that is raised when a reality viewer is installed.
         */
        this.installedEvent = new Event();
        /**
         * An event that is raised when a reality viewer is uninstalled.
         */
        this.uninstalledEvent = new Event();
        this._viewerByURI = new Map();
        this._installersByURI = new Map();
        sessionService.ensureIsRealityManager();
        sessionService.manager.connectEvent.addEventListener(() => {
            setTimeout(() => {
                if (!this._presentingRealityViewer && this.realityService.default)
                    this._handleRequest(this.sessionService.manager, {
                        uri: this.realityService.default
                    });
            });
        });
        sessionService.manager.closeEvent.addEventListener(() => {
            this._viewerByURI.forEach((v) => {
                v.destroy();
            });
        });
        sessionService.connectEvent.addEventListener((session) => {
            if (!Role.isRealityViewer(session.info.role)) {
                session.on['ar.reality.install'] = ({ uri }) => {
                    return this._handleInstall(session, uri);
                };
                session.on['ar.reality.uninstall'] = ({ uri }) => {
                    return this._handleUninstall(session, uri);
                };
                session.on['ar.reality.request'] = (message) => {
                    return this._handleRequest(session, message);
                };
                // For backwards compatability. 
                session.on['ar.reality.desired'] = (message) => {
                    const { reality } = message;
                    if (reality) {
                        if (reality['type']) {
                            const type = reality['type'];
                            reality.uri = reality.uri || 'reality:' + type;
                            if (type === 'hosted')
                                reality.uri = reality['url'];
                        }
                    }
                    this._handleRequest(session, { uri: reality.uri });
                };
            }
        });
        this.viewportServiceProvider.forwardedUIEvent.addEventListener((uievent) => {
            const session = this._presentingRealityViewer && this._presentingRealityViewer.session;
            if (session)
                viewportServiceProvider.sendUIEventToSession(uievent, session);
        });
    }
    get presentingRealityViewer() { return this._presentingRealityViewer; }
    _handleInstall(session, uri) {
        let installers = this._installersByURI.get(uri);
        if (installers) {
            installers.add(session);
        }
        else {
            const viewer = this.realityViewerFactory.createRealityViewer(uri);
            this._viewerByURI.set(uri, viewer);
            installers = new Set();
            installers.add(session);
            this._installersByURI.set(uri, installers);
            viewer.connectEvent.addEventListener((viewerSession) => {
                if (!Role.isRealityViewer(viewerSession.info.role)) {
                    viewerSession.sendError({ message: "Expected a reality viewer" });
                    viewerSession.close();
                    throw new Error('The application "' + viewerSession.uri + '" does not support being loaded as a reality viewer');
                }
                viewerSession.on['ar.reality.frameState'] = (frame) => {
                    if (this._presentingRealityViewer === viewer) {
                        frame.reality = viewer.uri;
                        this.contextService.submitFrameState(frame);
                    }
                };
                if (viewerSession.info['supportsCustomProtocols']) {
                    this._connectViewerWithSession(viewerSession, this.sessionService.manager);
                    for (session of this.sessionService.managedSessions) {
                        this._connectViewerWithSession(viewerSession, session);
                    }
                    const remove = this.sessionService.connectEvent.addEventListener((session) => {
                        this._connectViewerWithSession(viewerSession, session);
                    });
                    viewerSession.closeEvent.addEventListener(() => remove());
                }
                const removePresentChangeListener = viewer.presentChangeEvent.addEventListener(() => {
                    this.visibilityServiceProvider.set(viewerSession, viewer.isPresenting);
                });
                this.visibilityServiceProvider.set(viewerSession, viewer.isPresenting);
                viewerSession.closeEvent.addEventListener(() => {
                    removePresentChangeListener();
                    this.contextService.entities.removeById(viewerSession.uri);
                    console.log('Reality session closed: ' + uri);
                });
            });
            viewer.load();
            this.installedEvent.raiseEvent({ viewer });
        }
    }
    _connectViewerWithSession(viewerSession, session) {
        if (Role.isRealityViewer(session.info.role))
            return;
        const id = createGuid();
        const ROUTE_MESSAGE_KEY = 'ar.reality.message.route.' + id;
        const SEND_MESSAGE_KEY = 'ar.reality.message.send.' + id;
        const CLOSE_SESSION_KEY = 'ar.reality.close.' + id;
        viewerSession.on[ROUTE_MESSAGE_KEY] = (message) => {
            session.send(SEND_MESSAGE_KEY, message);
        };
        session.on[ROUTE_MESSAGE_KEY] = (message) => {
            viewerSession.send(SEND_MESSAGE_KEY, message);
        };
        viewerSession.send('ar.reality.connect', { id });
        session.send('ar.reality.connect', { id });
        viewerSession.closeEvent.addEventListener(() => {
            session.send(CLOSE_SESSION_KEY);
        });
        session.closeEvent.addEventListener(() => {
            viewerSession.send(CLOSE_SESSION_KEY);
            viewerSession.close();
        });
    }
    _handleUninstall(session, uri) {
        const installers = this._installersByURI.get(uri);
        if (installers) {
            if (installers.size === 0) {
                const viewer = this._viewerByURI.get(uri);
                this._viewerByURI.delete(uri);
                viewer.destroy();
                this.uninstalledEvent.raiseEvent({ viewer });
            }
        }
        return Promise.reject(new Error("Unable to uninstall a reality viewer which is not installed"));
    }
    _handleRequest(session, options) {
        if (this.focusServiceProvider.session === session || session === this.sessionService.manager) {
            let uri = options && options.uri || RealityViewer.DEFAULT;
            switch (uri) {
                case RealityViewer.DEFAULT:
                    uri = this.realityService.default;
            }
            let viewer = this._viewerByURI.get(uri);
            if (!viewer) {
                this._handleInstall(session, uri);
            }
            this._setPresentingRealityViewer(this._viewerByURI.get(uri));
            return Promise.resolve();
        }
        throw new Error('Request Denied');
    }
    _setPresentingRealityViewer(viewer) {
        if (!viewer)
            throw new Error('Invalid State. Expected a RealityViewer instance');
        if (this._presentingRealityViewer === viewer)
            return;
        this._viewerByURI.forEach((v) => {
            v.setPresenting(v === viewer);
        });
        this._presentingRealityViewer = viewer;
        console.log('Presenting reality viewer changed to: ' + viewer.uri);
    }
    getViewerByURI(uri) {
        return this._viewerByURI.get(uri);
    }
};
RealityServiceProvider = __decorate([
    autoinject,
    __metadata("design:paramtypes", [SessionService,
        RealityService,
        ContextService,
        ViewportServiceProvider,
        VisibilityServiceProvider,
        FocusServiceProvider,
        RealityViewerFactory])
], RealityServiceProvider);
export { RealityServiceProvider };

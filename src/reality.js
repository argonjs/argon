var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject, Factory } from 'aurelia-dependency-injection';
import { createGuid, ReferenceFrame } from './cesium/cesium-imports';
import { Role } from './common';
import { SessionService } from './session';
import { Event } from './utils';
import { ContextService, PoseStatus } from './context';
import { FocusService } from './focus';
import { ViewService } from './view';
import { DeviceService } from './device';
import { RealityViewer } from './reality-viewers/base';
import { EmptyRealityViewer } from './reality-viewers/empty';
import { LiveRealityViewer } from './reality-viewers/live';
import { HostedRealityViewer } from './reality-viewers/hosted';
export let RealityViewerFactory = class RealityViewerFactory {
    constructor(_createEmptyReality, _createLiveReality, _createHostedReality) {
        this._createEmptyReality = _createEmptyReality;
        this._createLiveReality = _createLiveReality;
        this._createHostedReality = _createHostedReality;
    }
    createRealityViewer(uri) {
        switch (RealityViewer.getType(uri)) {
            case RealityViewer.EMPTY:
                var realityViewer = this._createEmptyReality();
                realityViewer.uri = uri;
                return realityViewer;
            case RealityViewer.LIVE:
                var realityViewer = this._createLiveReality();
                realityViewer.uri = uri;
                return realityViewer;
            case 'hosted':
                var realityViewer = this._createHostedReality();
                realityViewer.uri = uri;
                return realityViewer;
            default:
                throw new Error('Unsupported Reality Viewer URI: ' + uri);
        }
    }
};
RealityViewerFactory = __decorate([
    inject(Factory.of(EmptyRealityViewer), Factory.of(LiveRealityViewer), Factory.of(HostedRealityViewer))
], RealityViewerFactory);
/**
* A service which manages the reality view.
* For an app developer, the RealityService instance can be used to
* set preferences which can affect how the manager selects a reality view.
*/
export let RealityService = class RealityService {
    constructor(sessionService, contextService, focusService, viewService, deviceService, realityViewerFactor) {
        this.sessionService = sessionService;
        this.contextService = contextService;
        this.focusService = focusService;
        this.viewService = viewService;
        this.deviceService = deviceService;
        this.realityViewerFactor = realityViewerFactor;
        this._viewStateEvent = new Event();
        this._connectEvent = new Event();
        this._changeEvent = new Event();
        this._installedEvent = new Event();
        this._uninstalledEvent = new Event();
        this._geoposeSubscribers = new Set();
        this._viewerByURI = new Map();
        this._installersByURI = new Map();
        this._viewStateEvent.addEventListener((viewState) => {
            if (this.sessionService.isRealityViewer) {
                if (this.sessionService.manager.isConnected)
                    this.sessionService.manager.send('ar.reality.viewState', viewState);
                viewState.reality = 'self';
            }
            this.deviceService.processViewState(viewState);
            this.contextService.processViewState(viewState);
        });
        if (sessionService.isRealityManager) {
            sessionService.manager.connectEvent.addEventListener(() => {
                setTimeout(() => {
                    if (!this._current && this.default)
                        this._request(this.sessionService.manager);
                });
            });
            this.viewService.forwardedUIEvent.addEventListener((uievent) => {
                const viewer = this._viewerByURI.get(this.current);
                if (viewer)
                    viewService.sendUIEventToSession(uievent, viewer.session);
            });
        }
        else {
            this.contextService.frameStateEvent.addEventListener((frameState) => {
                this._setPresentingReality(frameState.view.reality);
            });
        }
        sessionService.connectEvent.addEventListener((session) => {
            if (!Role.isRealityViewer(session.info.role)) {
                session.on['ar.reality.install'] = ({ uri }) => {
                    return this._install(session, uri);
                };
                session.on['ar.reality.uninstall'] = ({ uri }) => {
                    return this._uninstall(session, uri);
                };
                session.on['ar.reality.request'] = ({ options }) => {
                    return this._request(session, options);
                };
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
                    this._request(session, reality);
                };
            }
            session.closeEvent.addEventListener(() => {
                this._geoposeSubscribers.delete(session);
                this._checkGeoposeNeeded();
            });
        });
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
    }
    /**
     * Manager/Viewer-only. An event that is raised when the current reality emits the next view state.
     */
    get viewStateEvent() {
        this.sessionService.ensureNotRealityAugmenter();
        return this._viewStateEvent;
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
     * Manager-only. An event that is raised when a reality viewer is installed.
     */
    get installedEvent() {
        this.sessionService.ensureIsRealityManager();
        return this._installedEvent;
    }
    /**
     * Manager-only. An event that is raised when a reality viewer is uninstalled.
     */
    get uninstalledEvent() {
        this.sessionService.ensureIsRealityManager();
        return this._uninstalledEvent;
    }
    get geoposeNeeded() { return this._geoposeNeeded; }
    /**
     * Deprecated. Use pubishViewState.
     * @deprecated
     */
    publishFrame(state) {
        throw new Error('publishFrame is deprecated. Use publishViewState()');
    }
    /**
     * RealityViewer-only. Publish the next view state.
     */
    publishViewState(view) {
        this.sessionService.ensureIsRealityViewer();
        this._viewStateEvent.raiseEvent(view);
    }
    /**
     * Install the specified reality viewer
     */
    install(uri) {
        this.sessionService.ensureNotRealityViewer();
        return this.sessionService.manager.request('ar.reality.install', { uri });
    }
    _install(session, uri) {
        let installers = this._installersByURI.get(uri);
        this._installersByURI.set(uri, installers);
        if (installers) {
            installers.add(session);
        }
        else {
            const viewer = this.realityViewerFactor.createRealityViewer(uri);
            this._viewerByURI.set(uri, viewer);
            installers = new Set();
            installers.add(session);
            this._installersByURI.set(uri, installers);
            viewer.load();
            const viewerSession = viewer.session;
            if (viewerSession.isConnected)
                throw new Error('Expected an unconnected session');
            viewerSession.on['ar.reality.viewState'] = (view) => {
                this.contextService.updateEntityFromSerializedPose(viewerSession.uri, view.pose);
                if (this._current === uri) {
                    view.reality = uri;
                    this._viewStateEvent.raiseEvent(view);
                }
            };
            // Deprecated. Remove after v1.2
            viewerSession.on['ar.reality.frameState'] = (serializedState) => {
            };
            viewerSession.closeEvent.addEventListener(() => {
                this.contextService.entities.removeById(viewerSession.uri);
                console.log('Reality session closed: ' + uri);
            });
            viewerSession.connectEvent.addEventListener(() => {
                if (!viewerSession.uri)
                    throw new Error('RealityViewer session must have a uri');
                if (!Role.isRealityViewer(viewerSession.info.role)) {
                    viewerSession.sendError({ message: "Expected a reality viewer" });
                    viewerSession.close();
                    throw new Error('The application "' + viewerSession.uri + '" does not support being loaded as a reality viewer');
                }
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
            });
            this._viewerByURI.set(uri, viewer);
            this._installedEvent.raiseEvent({ uri });
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
    /**
     * Uninstall the specified reality viewer
     */
    uninstall(uri) {
        this.sessionService.ensureNotRealityViewer();
        return this.sessionService.manager.request('ar.reality.uninstall', { uri });
    }
    _uninstall(session, uri) {
        const installers = this._installersByURI.get(uri);
        if (installers) {
            if (installers.size === 0) {
                const viewer = this._viewerByURI.get(uri);
                this._viewerByURI.delete(uri);
                viewer.session.close();
                viewer.destroy();
                this._uninstalledEvent.raiseEvent({ uri });
            }
        }
        return Promise.reject(new Error("Unable to uninstall a reality viewer which is not installed"));
    }
    /**
     * Request that the provided reality viewer be presented. Pass `undefined` to
     * hint that the manager should select the best available viewer.
     */
    request(options) {
        this.sessionService.ensureNotRealityViewer();
        return this.sessionService.manager.request('ar.reality.request', { options });
    }
    _request(session, options) {
        if (options && options.geopose) {
            this._geoposeSubscribers.add(session);
            this._checkGeoposeNeeded();
        }
        else {
            this._geoposeSubscribers.delete(session);
            this._checkGeoposeNeeded();
        }
        if (this.focusService.session === session || session === this.sessionService.manager) {
            if (!options)
                options = { uri: this.default };
            if (options && options.uri) {
                let viewer = this._viewerByURI.get(options.uri);
                if (!viewer) {
                    this._install(session, options.uri);
                }
                this._setPresentingReality(options.uri);
                return;
            }
            else if (options && options.geopose) {
                const geoposeSessionChecks = [];
                for (const viewer of this._viewerByURI.values()) {
                    geoposeSessionChecks.push(this._checkViewerSessionForGeoposeSupport(viewer.session));
                }
                return Promise.all(geoposeSessionChecks).then(results => {
                    const geoposeSessions = results.filter(session => session !== undefined);
                    if (geoposeSessions.length > 0) {
                        return geoposeSessions[0];
                    }
                    throw new Error('No installed viewers have geopose support');
                });
            }
        }
        throw new Error('Request Denied');
    }
    _checkViewerSessionForGeoposeSupport(viewerSession) {
        const uri = viewerSession.uri;
        if (RealityViewer.getType(uri) === 'hosted') {
            const viewerEye = this.contextService.entities.getById(uri);
            if (!viewerEye)
                return Promise.resolve(undefined);
            const viewerPose = this.contextService.getEntityPose(viewerEye, ReferenceFrame.FIXED);
            if (viewerPose.poseStatus & PoseStatus.KNOWN)
                return Promise.resolve(viewerSession);
            return Promise.resolve(undefined);
        }
        return this.deviceService.hasGeoposeCapability().then((has) => {
            return has ? viewerSession : undefined;
        });
    }
    _checkGeoposeNeeded() {
        if (!this._geoposeNeeded && this._geoposeSubscribers.size > 0) {
            this._geoposeNeeded = true;
            this.deviceService.startGeolocationUpdates();
            this.deviceService.startOrientationUpdates();
        }
        else if (this._geoposeNeeded && this._geoposeSubscribers.size === 0) {
            this._geoposeNeeded = false;
            this.deviceService.stopGeolocationUpdates();
            this.deviceService.stopOrientationUpdates();
        }
    }
    /**
     * @private
     */
    setDesired(reality) {
        this.sessionService.ensureNotRealityViewer();
        console.warn('RealityService#setDesired is deprecated. Use RealityService#request');
        this.request(reality);
    }
    _setPresentingReality(uri) {
        if (!(this._current && this._current === uri)) {
            this._viewerByURI.forEach((v) => {
                v.setPresenting(v.uri === uri);
            });
            const previous = this._current;
            this._current = uri;
            this.changeEvent.raiseEvent({ previous, current: uri });
            if (this.sessionService.isRealityManager)
                console.log('Reality changed to: ' + uri);
        }
    }
    getViewerByURI(uri) {
        return this._viewerByURI.get(uri);
    }
};
RealityService = __decorate([
    inject(SessionService, ContextService, FocusService, ViewService, DeviceService, RealityViewerFactory)
], RealityService);

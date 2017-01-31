var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, inject, Optional } from 'aurelia-dependency-injection';
import { Viewport } from './common';
import { SessionService } from './session';
import { ContextService } from './context';
import { Event, resolveElement, isIOS, createEventForwarder, createEventSynthesizer } from './utils';
import { FocusService, FocusServiceProvider } from './focus';
import { VisibilityServiceProvider } from './visibility';
export const ParentElement = '#argon';
/**
 * Manages the view state
 */
let ViewportService = class ViewportService {
    constructor(sessionService, contextService, focusService, parentElementOrSelector) {
        this.sessionService = sessionService;
        this.contextService = contextService;
        this.focusService = focusService;
        /**
         * UI events that occur within this view. To handle an event (and prevent it from
         * being forwarded to another layer) call event.stopImmediatePropagation().
         */
        this.uiEvent = new Event();
        /**
         * An event that is raised when the viewport has changed
         */
        this.changeEvent = new Event();
        /**
         * An event that is raised when the presentation mode has changed
         */
        this.presentationModeChangeEvent = new Event();
        this._presentationMode = 1 /* IMMERSIVE */;
        /**
         * Automatically watch and publish the viewport during PresentationMode.EMBEDDED
         */
        this.autoPublishEmbeddedViewport = true;
        if (typeof document !== 'undefined' && document.createElement) {
            this.rootElement = document.createElement('div');
            this.rootElement.classList.add('argon-view');
            const viewportElement = this.element = document.createElement('div');
            viewportElement.classList.add('argon-viewport');
            this.rootElement.appendChild(viewportElement);
            // prevent pinch-zoom of the page in ios 10.
            if (isIOS) {
                viewportElement.addEventListener('touchmove', (event) => {
                    if (event.touches.length > 1)
                        event.preventDefault();
                }, true);
            }
            const insertRootIntoParentElement = (parentElement) => {
                if (this.sessionService.manager.isClosed)
                    return;
                parentElement.insertBefore(this.rootElement, parentElement.firstChild);
                this.sessionService.manager.closeEvent.addEventListener(() => {
                    this.rootElement.remove();
                });
            };
            // first check for the specificied element synchronously, then
            // if synchronous check fails, wait for document to load, then insert
            if (parentElementOrSelector && parentElementOrSelector instanceof HTMLElement) {
                insertRootIntoParentElement(parentElementOrSelector);
            }
            else if (parentElementOrSelector === `#argon`) {
                // first check synchronously
                let parentElement = document.querySelector(`#argon`);
                if (parentElement) {
                    insertRootIntoParentElement(parentElement);
                }
                else {
                    resolveArgonElement().then(insertRootIntoParentElement);
                }
            }
            else if (parentElementOrSelector) {
                // first check synchronously
                let parentElement = document.querySelector(`${parentElementOrSelector}`);
                if (parentElement) {
                    insertRootIntoParentElement(parentElement);
                }
                else {
                    resolveElement(parentElementOrSelector).then(insertRootIntoParentElement);
                }
            }
            this.focusService.focusEvent.addEventListener(() => {
                viewportElement.classList.remove('argon-no-focus');
                viewportElement.classList.add('argon-focus');
            });
            this.focusService.blurEvent.addEventListener(() => {
                viewportElement.classList.remove('argon-focus');
                viewportElement.classList.add('argon-no-focus');
            });
            this.sessionService.manager.on['ar.viewport.uievent'] = createEventSynthesizer();
            if (!this.sessionService.isRealityViewer) {
                createEventForwarder(this, (uievent) => {
                    this.sessionService.manager.send('ar.viewport.forwardUIEvent', uievent);
                });
                this._watchEmbeddedViewport();
            }
        }
        sessionService.manager.on['ar.viewport.presentationMode'] =
            ({ mode }) => {
                this._presentationMode = mode;
                this.onUpdatePresentationMode(mode);
                this.changeEvent.raiseEvent(undefined);
            };
        this.contextService.frameStateEvent.addEventListener((state) => {
            this._updateViewport(state.viewport);
        });
    }
    /**
     * The current presentation mode
     */
    get presentationMode() { return this._presentationMode; }
    /**
     * Get the current viewport
     */
    get current() {
        return this.contextService.serializedFrameState.viewport;
    }
    /**
     * Request a presentation mode
     * - [[PresentationMode.EMBEDDED]] : present AR view within the document
     * - [[PresentationMode.IMMERSIVE]] : present only AR content
     */
    requestPresentationMode(mode) {
        this.sessionService.manager.request('ar.viewport.requestPresentationMode', { mode });
    }
    onUpdatePresentationMode(mode) {
        switch (mode) {
            case 0 /* EMBEDDED */:
                this.element.classList.remove('argon-immersive');
                break;
            case 1 /* IMMERSIVE */:
                this.element.classList.add('argon-immersive');
                break;
        }
    }
    /**
     * Publish the viewport being used in [[PresentationMode.EMBEDDED]]
     * so that other apps can use the same viewport
     */
    publishEmbeddedViewport(viewport) {
        if (this.sessionService.manager.isConnected)
            this.sessionService.manager.send('ar.viewport.embeddedViewport', { viewport });
    }
    // Updates the element, if necessary, and raise a view change event
    _updateViewport(viewport) {
        const viewportJSON = JSON.stringify(viewport);
        // const previousViewport = this._currentViewport;
        this._currentViewport = Viewport.clone(viewport, this._currentViewport);
        if (!this._currentViewportJSON || this._currentViewportJSON !== viewportJSON) {
            this._currentViewportJSON = viewportJSON;
            if (this.element && !this.sessionService.isRealityManager) {
                requestAnimationFrame(() => {
                    this.element.style.position = 'fixed';
                    this.element.style.left = viewport.x + 'px';
                    this.element.style.bottom = viewport.y + 'px';
                    this.element.style.width = viewport.width + 'px';
                    this.element.style.height = viewport.height + 'px';
                });
            }
            this.changeEvent.raiseEvent(undefined);
        }
    }
    sendUIEventToSession(uievent, session) {
        if (session && session.isConnected)
            session.send('ar.viewport.uievent', uievent);
    }
    _watchEmbeddedViewport() {
        const publish = () => {
            if (this.element && this.autoPublishEmbeddedViewport) {
                const rect = this.element.getBoundingClientRect();
                this.publishEmbeddedViewport({
                    x: rect.left,
                    y: document.documentElement.clientHeight - rect.bottom,
                    width: rect.width,
                    height: rect.height
                });
            }
        };
        setInterval(() => {
            if (!this.focusService.hasFocus)
                publish();
        }, 500);
        this.contextService.frameStateEvent.addEventListener(() => {
            if (this.focusService.hasFocus)
                publish();
        });
    }
};
ViewportService = __decorate([
    inject(SessionService, ContextService, FocusService, Optional.of(ParentElement)),
    __metadata("design:paramtypes", [SessionService,
        ContextService,
        FocusService, Object])
], ViewportService);
export { ViewportService };
let ViewportServiceProvider = class ViewportServiceProvider {
    constructor(sessionService, viewportService, focusServiceProvider, visibilityServiceProvider) {
        this.sessionService = sessionService;
        this.viewportService = viewportService;
        this.focusServiceProvider = focusServiceProvider;
        /**
         * The embedded viewports for each managed session.
         */
        this.embeddedViewports = new WeakMap();
        /**
         * A UI event being forwarded from a managed session
         */
        this.forwardedUIEvent = new Event();
        sessionService.ensureIsRealityManager();
        sessionService.connectEvent.addEventListener((session) => {
            // forward ui events to the visible reality viewer
            session.on['ar.viewport.forwardUIEvent'] = (uievent) => {
                this.forwardedUIEvent.raiseEvent(uievent);
            };
            session.on['ar.viewport.requestPresentationMode'] = ({ mode }) => {
                return this._handleRequestPresentationMode(session, mode);
            };
            session.on['ar.viewport.embeddedViewport'] = (viewport) => {
                this.embeddedViewports.set(session, viewport);
            };
        });
    }
    sendUIEventToSession(uievent, session) {
        session.send('ar.viewport.uievent', uievent);
    }
    _handleRequestPresentationMode(session, mode) {
        this._ensurePersmission(session);
        if (this.viewportService.presentationMode !== mode) {
            for (session of this.sessionService.managedSessions) {
                session.send('ar.viewport.presentationMode', { mode });
            }
        }
    }
    _ensurePersmission(session) {
        if (session !== this.sessionService.manager && session !== this.focusServiceProvider.session)
            throw new Error('Application must have focus');
    }
};
ViewportServiceProvider = __decorate([
    autoinject(),
    __metadata("design:paramtypes", [SessionService,
        ViewportService,
        FocusServiceProvider,
        VisibilityServiceProvider])
], ViewportServiceProvider);
export { ViewportServiceProvider };
// setup our DOM environment
if (typeof document !== 'undefined' && document.createElement) {
    let viewportMetaTag = document.querySelector('meta[name=viewport]');
    if (!viewportMetaTag)
        viewportMetaTag = document.createElement('meta');
    viewportMetaTag.name = 'viewport';
    viewportMetaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
    document.head.appendChild(viewportMetaTag);
    let argonMetaTag = document.querySelector('meta[name=argon]');
    if (!argonMetaTag)
        argonMetaTag = document.createElement('meta');
    argonMetaTag.name = 'argon';
    document.head.appendChild(argonMetaTag);
    let argonElementPromise;
    var resolveArgonElement = () => {
        if (argonElementPromise)
            return argonElementPromise;
        return argonElementPromise = resolveElement('#argon').catch(() => {
            const argonElement = document.createElement('div');
            argonElement.id = 'argon';
            document.body.appendChild(argonElement);
            return argonElement;
        });
    };
    const style = document.createElement("style");
    style.type = 'text/css';
    document.head.insertBefore(style, document.head.firstChild);
    const sheet = style.sheet;
    sheet.insertRule(`
        #argon {
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            bottom: 0;
            margin: 0;
            border: 0;
            padding: 0;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-view > * {
            position: absolute;
            overflow: hidden;
            width: 100%;
            height: 100%;
            pointer-events: none;
            -webkit-tap-highlight-color: transparent;
            -webkit-user-select: none;
            user-select: none;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-view > * > * {
            pointer-events: auto;
            -webkit-tap-highlight-color: initial;
            -webkit-user-select: initial;
            user-select: initial;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-viewport {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: auto;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-viewport > * {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-viewport > * > * {
            pointer-events: auto;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-immersive, .argon-immersive ~ * {
            position: fixed !important;
            width: 100% !important;
            height: 100% !important;
            left: 0;
            bottom: 0;
            margin: 0;
            border: 0;
            padding: 0;
        }
    `, sheet.cssRules.length);
    sheet.insertRule(`
        .argon-interactive {
            pointer-events: auto;
        }
    `, sheet.cssRules.length);
}

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from 'aurelia-dependency-injection';
import { Role } from '../common';
import { SessionService } from '../session';
import { ViewService } from '../view';
import { ViewportService } from '../viewport';
import { ContextService } from '../context';
import { RealityViewer } from './base';
let LiveRealityViewer = class LiveRealityViewer extends RealityViewer {
    constructor(sessionService, viewportService, viewService, contextService, uri) {
        super(uri);
        this.sessionService = sessionService;
        this.viewportService = viewportService;
        this.viewService = viewService;
        this.contextService = contextService;
        this.uri = uri;
        if (typeof document !== 'undefined') {
            this.settingsIframe = document.createElement('iframe');
            this.settingsIframe.width = '0';
            this.settingsIframe.height = '0';
            this.settingsIframe.src = 'https://argonjs.io/tools.argonjs.io/';
            this.settingsIframe.style.display = 'none';
            this.videoFov = Math.PI / 2;
            this.videoElement = document.createElement('video');
            this.videoElement.style.width = '100%';
            this.videoElement.style.height = 'height:100%';
            this.videoElement.controls = false;
            this.videoElement.autoplay = true;
            this.videoElement.style.display = 'none';
            const viewElement = this.viewportService.element;
            viewElement.insertBefore(this.settingsIframe, viewElement.firstChild);
            viewElement.insertBefore(this.videoElement, viewElement.firstChild);
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
            window.addEventListener('message', (event) => {
                const origin = event.origin;
                if (origin === 'http://argonjs.io') {
                    this.videoFov = event.data; // TODO: this is not flexible. Should be passing an object with message type and data
                }
            });
        }
        this.presentChangeEvent.addEventListener(() => {
            if (typeof document !== 'undefined') {
                this.videoElement.style.display = this.isPresenting ? 'initial' : 'none';
            }
        });
    }
    destroy() {
        super.destroy();
        if (typeof document !== 'undefined') {
            this.settingsIframe.remove();
            this.videoElement.remove();
            this.canvas.remove();
        }
    }
    setupInternalSession(session) {
        session.on['ar.device.state'] = () => { };
        session.on['ar.visibility.state'] = () => { };
        session.on['ar.focus.state'] = () => { };
        session.on['ar.viewport.presentationMode'] = () => { };
        session.on['ar.viewport.uievent'] = () => { };
        session.on['ar.view.suggestedViewState'] = () => { };
        session.on['ar.context.update'] = () => { };
        session.on['ar.reality.connect'] = () => { };
        session.connectEvent.addEventListener(() => {
            if (this.videoElement) {
                const videoElement = this.videoElement;
                const mediaDevices = navigator.mediaDevices;
                const getUserMedia = (mediaDevices.getUserMedia || mediaDevices['mozGetUserMedia'] ||
                    mediaDevices['msGetUserMedia'] || mediaDevices['webkitGetUserMedia']).bind(mediaDevices);
                getUserMedia({ audio: false, video: true }).then((videoStream) => {
                    const stopVideoStream = () => {
                        for (const t of videoStream.getTracks()) {
                            t.stop();
                        }
                    };
                    if (session.isConnected) {
                        videoElement.src = window.URL.createObjectURL(videoStream);
                        session.closeEvent.addEventListener(stopVideoStream);
                    }
                    else {
                        stopVideoStream();
                    }
                }).catch((error) => {
                    session.errorEvent.raiseEvent(error);
                });
                const viewService = this.viewService;
                let lastFrameTime = -1;
                let update = (time) => {
                    if (session.isConnected)
                        viewService.requestAnimationFrame(update);
                    else
                        return;
                    const suggestedViewState = viewService.suggestedViewState;
                    if (!suggestedViewState)
                        return;
                    if (videoElement.currentTime != lastFrameTime) {
                        lastFrameTime = videoElement.currentTime;
                        // const videoWidth = videoElement.videoWidth;
                        // const videoHeight = videoElement.videoHeight;
                        const frameState = this.contextService.createFrameState(time, suggestedViewState.viewport, suggestedViewState.subviews, viewService.eye);
                        session.send('ar.reality.frameState', frameState);
                    }
                };
                viewService.requestAnimationFrame(update);
            }
        });
    }
    load() {
        const session = this.sessionService.addManagedSessionPort(this.uri);
        session.connectEvent.addEventListener(() => {
            this.connectEvent.raiseEvent(session);
        });
        const internalSession = this.sessionService.createSessionPort(this.uri);
        this.setupInternalSession(internalSession);
        // Only connect after the caller is able to attach connectEvent handlers
        Promise.resolve().then(() => {
            const messageChannel = this.sessionService.createSynchronousMessageChannel();
            session.open(messageChannel.port1, this.sessionService.configuration);
            internalSession.open(messageChannel.port2, { role: Role.REALITY_VIEWER, title: 'Live' });
        });
    }
    static isAvailable() {
        if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
            const mediaDevices = navigator.mediaDevices;
            return !!(mediaDevices.getUserMedia || mediaDevices['mozGetUserMedia'] || mediaDevices['msGetUserMedia'] || mediaDevices['webkitGetUserMedia']);
        }
        else {
            return false;
        }
    }
    getVideoFrame(x, y, width, height) {
        this.canvas.width = this.videoElement.videoWidth;
        this.canvas.height = this.videoElement.videoHeight;
        this.context.drawImage(this.videoElement, 0, 0, this.canvas.width, this.canvas.height);
        return this.context.getImageData(x, y, width, height);
    }
};
LiveRealityViewer = __decorate([
    inject(SessionService, ViewportService, ViewService, ContextService),
    __metadata("design:paramtypes", [SessionService,
        ViewportService,
        ViewService,
        ContextService, String])
], LiveRealityViewer);
export { LiveRealityViewer };

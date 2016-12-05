var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { Role } from '../common';
import { SessionService } from '../session';
import { DeviceService } from '../device';
import { ViewService } from '../view';
import { VuforiaServiceDelegate } from '../vuforia';
import * as utils from '../utils';
import { RealityViewer } from './base';
export let LiveRealityViewer = class LiveRealityViewer extends RealityViewer {
    constructor(sessionService, vuforiaDelegate, viewService, deviceService, uri) {
        super(sessionService, uri);
        this.sessionService = sessionService;
        this.vuforiaDelegate = vuforiaDelegate;
        this.viewService = viewService;
        this.deviceService = deviceService;
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
            const viewElement = this.viewService.element;
            viewElement.insertBefore(this.settingsIframe, viewElement.firstChild);
            viewElement.insertBefore(this.videoElement, viewElement.firstChild);
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
        }
    }
    destroy() {
        this.settingsIframe.remove();
        this.videoElement.remove();
        this.canvas.remove();
    }
    setPresenting(foo) {
        this.videoElement.style.display = foo ? 'initial' : 'none';
    }
    load() {
        super.load();
        const realitySession = this.session;
        const remoteRealitySession = this.sessionService.createSessionPort(this.uri);
        remoteRealitySession.on['ar.device.state'] = () => { };
        remoteRealitySession.on['ar.view.uievent'] = () => { };
        remoteRealitySession.on['ar.context.update'] = () => { };
        remoteRealitySession.on['ar.reality.connect'] = () => { };
        remoteRealitySession.connectEvent.addEventListener(() => {
            if (this.videoElement) {
                const videoElement = this.videoElement;
                const mediaDevices = navigator.mediaDevices;
                const getUserMedia = (mediaDevices.getUserMedia || mediaDevices['mozGetUserMedia'] ||
                    mediaDevices['msGetUserMedia'] || mediaDevices['webkitGetUserMedia']).bind(mediaDevices);
                getUserMedia({ audio: false, video: true }).then((videoStream) => {
                    videoElement.src = window.URL.createObjectURL(videoStream);
                }).catch((error) => {
                    remoteRealitySession.errorEvent.raiseEvent(error);
                });
                const deviceService = this.deviceService;
                let lastFrameTime = -1;
                let update = (time) => {
                    if (realitySession.isConnected)
                        this.deviceService.requestFrame(update);
                    else
                        return;
                    if (videoElement.currentTime != lastFrameTime) {
                        lastFrameTime = videoElement.currentTime;
                        // const videoWidth = videoElement.videoWidth;
                        // const videoHeight = videoElement.videoHeight;
                        const viewState = {
                            time,
                            pose: utils.getSerializedEntityPose(deviceService.eye, time),
                            geolocationAccuracy: deviceService.geolocationAccuracy,
                            altitudeAccuracy: deviceService.altitudeAccuracy,
                            compassAccuracy: deviceService.compassAccuracy,
                            viewport: deviceService.viewport,
                            subviews: deviceService.subviews
                        };
                        remoteRealitySession.send('ar.reality.viewState', viewState);
                    }
                };
                this.deviceService.requestFrame(update);
            }
            this.vuforiaDelegate.videoEnabled = true;
            this.vuforiaDelegate.trackingEnabled = true;
            const remove = this.vuforiaDelegate.stateUpdateEvent.addEventListener((viewState) => {
                remoteRealitySession.send('ar.reality.viewState', viewState);
            });
            remoteRealitySession.closeEvent.addEventListener(() => {
                remove();
                this.vuforiaDelegate.videoEnabled = false;
                this.vuforiaDelegate.trackingEnabled = false;
            });
        });
        if (typeof document !== 'undefined' && typeof navigator !== 'undefined') {
            window.addEventListener('message', (event) => {
                const origin = event.origin;
                if (origin === 'http://argonjs.io') {
                    this.videoFov = event.data; // TODO: this is not flexible. Should be passing an object with message type and data
                }
            });
            const mediaDevices = navigator.mediaDevices;
            const getUserMedia = (mediaDevices.getUserMedia || mediaDevices['mozGetUserMedia'] ||
                mediaDevices['msGetUserMedia'] || mediaDevices['webkitGetUserMedia']).bind(mediaDevices);
            getUserMedia({ audio: false, video: true }).then((videoStream) => {
                this.videoElement.src = window.URL.createObjectURL(videoStream);
            }).catch((error) => {
                remoteRealitySession.errorEvent.raiseEvent(error);
            });
        }
        // Only connect after the caller is able to attach connectEvent handlers
        Promise.resolve().then(() => {
            const messageChannel = this.sessionService.createSynchronousMessageChannel();
            realitySession.open(messageChannel.port1, this.sessionService.configuration);
            remoteRealitySession.open(messageChannel.port2, { role: Role.REALITY_VIEWER, title: 'Local' });
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
    inject(SessionService, VuforiaServiceDelegate, ViewService, DeviceService)
], LiveRealityViewer);

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { SessionService } from '../session';
/**
 * Abstract class for a RealityViewer
 */
export let RealityViewer = class RealityViewer {
    constructor(_sessionService, uri) {
        this._sessionService = _sessionService;
        this.uri = uri;
    }
    load() {
        if (this.session)
            this.session.close();
        this.session = this._sessionService.addManagedSessionPort(this.uri);
    }
    ;
    static getType(uri) {
        if (uri === undefined)
            return undefined;
        if (uri.split(':')[0] === 'reality') {
            return uri;
        }
        return 'hosted';
    }
};
RealityViewer.EMPTY = 'reality:empty';
RealityViewer.LIVE = 'reality:live';
RealityViewer = __decorate([
    inject(SessionService)
], RealityViewer);

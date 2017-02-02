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
import { SessionService } from './session';
import { Event } from './utils';
/**
 * Access visibility state
 */
let VisibilityService = class VisibilityService {
    constructor(sessionService) {
        /**
         * An event that is raised when the app becomes visible
         */
        this.showEvent = new Event();
        /**
         * An event that is raised when the app becomes hidden
         */
        this.hideEvent = new Event();
        this._isVisible = false;
        sessionService.manager.on['ar.visibility.state'] = ({ state }) => {
            if (this._isVisible !== state) {
                this._isVisible = state;
                if (state)
                    this.showEvent.raiseEvent(undefined);
                else
                    this.hideEvent.raiseEvent(undefined);
            }
        };
    }
    /**
     * True if this app has focus
     */
    get isVisible() { return this._isVisible; }
};
VisibilityService = __decorate([
    inject(SessionService),
    __metadata("design:paramtypes", [SessionService])
], VisibilityService);
export { VisibilityService };
/**
 * Manage visibility state
 */
let VisibilityServiceProvider = class VisibilityServiceProvider {
    constructor(sessionService) {
        this.visibleSessions = new Set();
        this.sessionChangeEvent = new Event();
        sessionService.ensureIsRealityManager();
        this.sessionChangeEvent.addEventListener((session) => {
            session.send('ar.visibility.state', { state: this.visibleSessions.has(session) });
        });
        sessionService.manager.connectEvent.addEventListener(() => {
            this.set(sessionService.manager, true);
        });
    }
    set(session, visibility) {
        if (visibility) {
            if (!this.visibleSessions.has(session)) {
                this.visibleSessions.add(session);
                this.sessionChangeEvent.raiseEvent(session);
            }
        }
        else {
            if (this.visibleSessions.has(session)) {
                this.visibleSessions.delete(session);
                this.sessionChangeEvent.raiseEvent(session);
            }
        }
    }
};
VisibilityServiceProvider = __decorate([
    inject(SessionService, VisibilityService),
    __metadata("design:paramtypes", [SessionService])
], VisibilityServiceProvider);
export { VisibilityServiceProvider };

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
 * Access focus state
 */
let FocusService = class FocusService {
    constructor(sessionService) {
        /**
         * An event that is raised when this app has gained focus
         */
        this.focusEvent = new Event();
        /**
         * An event that is raised when this app has lost focus
         */
        this.blurEvent = new Event();
        this._hasFocus = false;
        sessionService.manager.on['ar.focus.state'] = ({ state }) => {
            if (this._hasFocus !== state) {
                this._hasFocus = state;
                if (state) {
                    this.focusEvent.raiseEvent(undefined);
                }
                else {
                    this.blurEvent.raiseEvent(undefined);
                }
            }
        };
    }
    /**
     * True if this app has focus
     */
    get hasFocus() { return this._hasFocus; }
};
FocusService = __decorate([
    inject(SessionService),
    __metadata("design:paramtypes", [SessionService])
], FocusService);
export { FocusService };
/**
 * Manage focus state
 */
let FocusServiceProvider = class FocusServiceProvider {
    constructor(sessionService) {
        this.sessionService = sessionService;
        this.sessionFocusEvent = new Event();
        sessionService.ensureIsRealityManager();
        sessionService.manager.connectEvent.addEventListener(() => {
            setTimeout(() => {
                if (!this._session && this.sessionService.manager.isConnected)
                    this.session = this.sessionService.manager;
            });
        });
    }
    get session() { return this._session; }
    ;
    set session(session) {
        if (session && !session.isConnected)
            throw new Error('Only a connected session can be granted focus');
        const previousFocussedSession = this._session;
        if (previousFocussedSession !== session) {
            if (previousFocussedSession)
                previousFocussedSession.send('ar.focus.state', { state: false });
            if (session)
                session.send('ar.focus.state', { state: true });
            this._session = session;
            this.sessionFocusEvent.raiseEvent({
                previous: previousFocussedSession,
                current: session
            });
        }
    }
};
FocusServiceProvider = __decorate([
    inject(SessionService, FocusService),
    __metadata("design:paramtypes", [SessionService])
], FocusServiceProvider);
export { FocusServiceProvider };

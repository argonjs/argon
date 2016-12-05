var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { SessionService } from './session';
import { Event } from './utils';
/**
 * Manages focus state
 */
export let FocusService = class FocusService {
    constructor(sessionService) {
        this.sessionService = sessionService;
        /**
         * An event that is raised when this app has gained focus
         */
        this.focusEvent = new Event();
        /**
         * An event that is raised when this app has lost focus
         */
        this.blurEvent = new Event();
        this._hasFocus = false;
        this._sessionFocusEvent = new Event();
        sessionService.manager.on['ar.focus.state'] = (message) => {
            this._setFocus(message.state);
        };
        if (sessionService.isRealityManager) {
            sessionService.manager.connectEvent.addEventListener(() => {
                setTimeout(() => {
                    if (!this._session && this.sessionService.manager.isConnected)
                        this.session = this.sessionService.manager;
                });
            });
        }
    }
    /**
     * True if this app has focus
     */
    get hasFocus() { return this._hasFocus; }
    /**
     * Manager-only. An event that is raised when a managed session has acquired focus.
     */
    get sessionFocusEvent() {
        this.sessionService.ensureIsRealityManager();
        return this._sessionFocusEvent;
    }
    /**
     * Manager-only. The managed session which currently has focus.
     */
    get session() {
        this.sessionService.ensureIsRealityManager();
        return this._session;
    }
    /**
     *  Manager-only. Grant focus to a managed session.
     */
    set session(session) {
        this.sessionService.ensureIsRealityManager();
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
    whenSessionHasFocus(session) {
        this.sessionService.ensureIsRealityManager();
        return new Promise((resolve) => {
            let remove = this.sessionFocusEvent.addEventListener(({ current }) => {
                if (current === session) {
                    remove();
                    resolve();
                }
            });
        });
    }
    _setFocus(state) {
        if (this._hasFocus !== state) {
            this._hasFocus = state;
            if (state) {
                this.focusEvent.raiseEvent(undefined);
            }
            else {
                this.blurEvent.raiseEvent(undefined);
            }
        }
    }
};
FocusService = __decorate([
    inject(SessionService)
], FocusService);

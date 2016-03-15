import {inject} from 'aurelia-dependency-injection';
import {SessionService, SessionPort} from './session';
import {Event} from './utils';

/**
 * Manages focus state
 */
@inject(SessionService)
export class FocusService {

    /**
     * An event that is raised when this session has gained focus
     */
    public focusEvent = new Event<void>();

    /**
     * An event that is raised when this session has lost focus
     */
    public blurEvent = new Event<void>();

    /**
     * True if this session has focus
     */
    public get hasFocus() { return this._hasFocus }
    private _hasFocus = false;

    /**
     * Manager-only. An event that is raised when a managed session has acquired focus. 
     */
    public get sessionFocusEvent() {
        this.sessionService.ensureIsManager();
        return this._sessionFocusEvent;
    }
    private _sessionFocusEvent = new Event<SessionPort>();

    /**
     * Manager-only. The managed session which currently has focus. 
     */
    public get currentSession() {
        this.sessionService.ensureIsManager();
        return this._session
    }

    private _session: SessionPort;

    constructor(private sessionService: SessionService) {
        sessionService.manager.on['ar.focus.state'] = (state: boolean) => {
            this._setFocus(state);
        }

        if (sessionService.isManager()) {
            setTimeout(() => {
                this._setFocus(true);
            })
        }
    }

    /**
     *  Manager-only. Grant focus to a managed session.
     */
    public setSession(session: SessionPort) {
        this.sessionService.ensureIsManager();
        const previousFocussedSession = this._session;
        if (previousFocussedSession !== session) {
            if (previousFocussedSession)
                previousFocussedSession.send('ar.focus.state', false);
            session.send('ar.focus.state', true);
            this._session = session;
            this.sessionFocusEvent.raiseEvent(session);
        }
    }

    private _setFocus(state) {
        if (this._hasFocus !== state) {
            this._hasFocus = state;
            if (state) {
                this.focusEvent.raiseEvent(undefined);
            } else {
                this.blurEvent.raiseEvent(undefined);
            }
        }
    }

}

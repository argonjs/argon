import { inject } from 'aurelia-dependency-injection';
import { SessionService, SessionPort } from './session';
import { Event } from './utils';

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
    private _sessionFocusEvent = new Event<{ previous?: SessionPort, current?: SessionPort }>();

    private _session?: SessionPort;

    constructor(private sessionService: SessionService) {
        sessionService.manager.on['ar.focus.state'] = (message: { state: boolean }) => {
            this._setFocus(message.state);
        }

        if (sessionService.isManager) {
            sessionService.manager.connectEvent.addEventListener(() => {
                setTimeout(() => {
                    if (!this._session)
                        this.setSession(this.sessionService.manager);
                })
            })
        }
    }

    /**
     * Manager-only. The managed session which currently has focus. 
     */
    public getSession() {
        this.sessionService.ensureIsManager();
        return this._session;
    }

    /**
     *  Manager-only. Grant focus to a managed session.
     */
    public setSession(session?: SessionPort) {
        this.sessionService.ensureIsManager();
        if (session && !session.isConnected)
            throw new Error('Only a connected session can be granted focus')
        const previousFocussedSession = this._session;
        if (previousFocussedSession !== session) {
            if (previousFocussedSession)
                previousFocussedSession.send('ar.focus.state', { state: false });
            if (session) session.send('ar.focus.state', { state: true });
            this._session = session;
            this.sessionFocusEvent.raiseEvent({
                previous: previousFocussedSession,
                current: session
            });
        }
    }

    public whenSessionHasFocus(session: SessionPort) {
        this.sessionService.ensureIsManager();
        return new Promise((resolve) => {
            let remove = this.sessionFocusEvent.addEventListener(({current}) => {
                if (current === session) {
                    remove();
                    resolve();
                }
            });
        });
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

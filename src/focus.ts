import { inject } from 'aurelia-dependency-injection';
import { SessionService, SessionPort } from './session';
import { Event } from './utils';

/**
 * Access focus state
 */
@inject(SessionService)
export class FocusService {

    /**
     * An event that is raised when this app has gained focus
     */
    public focusEvent = new Event<void>();

    /**
     * An event that is raised when this app has lost focus
     */
    public blurEvent = new Event<void>();

    /**
     * True if this app has focus
     */
    public get hasFocus() { return this._hasFocus }
    private _hasFocus = false;

    constructor(sessionService: SessionService) {
        sessionService.manager.on['ar.focus.state'] = ({state}: { state: boolean }) => {
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
}


/**
 * Manage focus state
 */
@inject(SessionService, FocusService)
export class FocusServiceProvider {

    public sessionFocusEvent = new Event<{ previous?: SessionPort, current?: SessionPort }>();

    constructor(private sessionService:SessionService) {
        sessionService.ensureIsRealityManager();
        sessionService.manager.connectEvent.addEventListener(() => {
            setTimeout(() => {
                if (!this._session && this.sessionService.manager.isConnected)
                    this.session = this.sessionService.manager;
            })
        });
    }

    private _session?:SessionPort;

    public get session() { return this._session };
    public set session(session: SessionPort|undefined) {
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
}
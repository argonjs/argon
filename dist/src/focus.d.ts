import { SessionService, SessionPort } from './session';
import { Event } from './utils';
/**
 * Manages focus state
 */
export declare class FocusService {
    private sessionService;
    /**
     * An event that is raised when this session has gained focus
     */
    focusEvent: Event<void>;
    /**
     * An event that is raised when this session has lost focus
     */
    blurEvent: Event<void>;
    /**
     * True if this session has focus
     */
    readonly hasFocus: boolean;
    private _hasFocus;
    /**
     * Manager-only. An event that is raised when a managed session has acquired focus.
     */
    readonly sessionFocusEvent: Event<SessionPort>;
    private _sessionFocusEvent;
    /**
     * Manager-only. The managed session which currently has focus.
     */
    readonly currentSession: SessionPort;
    private _session;
    constructor(sessionService: SessionService);
    /**
     *  Manager-only. Grant focus to a managed session.
     */
    setSession(session: SessionPort): void;
    private _setFocus(state);
}

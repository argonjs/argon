import { SessionService, SessionPort } from './session';
import { Event } from './utils';
/**
 * Manages focus state
 */
export declare class FocusService {
    private sessionService;
    /**
     * An event that is raised when this app has gained focus
     */
    focusEvent: Event<void>;
    /**
     * An event that is raised when this app has lost focus
     */
    blurEvent: Event<void>;
    /**
     * True if this app has focus
     */
    readonly hasFocus: boolean;
    private _hasFocus;
    /**
     * Manager-only. An event that is raised when a managed session has acquired focus.
     */
    readonly sessionFocusEvent: Event<{
        previous?: SessionPort | undefined;
        current?: SessionPort | undefined;
    }>;
    private _sessionFocusEvent;
    private _session?;
    constructor(sessionService: SessionService);
    /**
     * Manager-only. The managed session which currently has focus.
     */
    /**
     *  Manager-only. Grant focus to a managed session.
     */
    session: SessionPort | undefined;
    whenSessionHasFocus(session: SessionPort): Promise<{}>;
    private _setFocus(state);
}

import { SessionService, SessionPort } from './session';
import { Event } from './utils';
/**
 * Access focus state
 */
export declare class FocusService {
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
    constructor(sessionService: SessionService);
}
/**
 * Manage focus state
 */
export declare class FocusServiceProvider {
    private sessionService;
    sessionFocusEvent: Event<{
        previous?: SessionPort | undefined;
        current?: SessionPort | undefined;
    }>;
    constructor(sessionService: SessionService);
    private _session?;
    session: SessionPort | undefined;
}

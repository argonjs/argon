import { SessionService, SessionPort } from './session';
import { Event } from './utils';
/**
 * Access visibility state
 */
export declare class VisibilityService {
    /**
     * An event that is raised when the app becomes visible
     */
    showEvent: Event<void>;
    /**
     * An event that is raised when the app becomes hidden
     */
    hideEvent: Event<void>;
    /**
     * True if this app has focus
     */
    readonly isVisible: boolean;
    private _isVisible;
    constructor(sessionService: SessionService);
}
/**
 * Manage visibility state
 */
export declare class VisibilityServiceProvider {
    visibleSessions: Set<SessionPort>;
    sessionChangeEvent: Event<SessionPort>;
    constructor(sessionService: SessionService);
    set(session: SessionPort, visibility: boolean): void;
}

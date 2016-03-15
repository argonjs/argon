import { SessionService, SessionPort } from './session';
import { Event } from './utils';
export interface Viewport {
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 * Manages the viewport
 */
export declare class ViewportService {
    private sessionService;
    /**
     * An event that is raised when the current viewport state has changed
     */
    readonly changeEvent: Event<{
        previous: Viewport;
    }>;
    current: Viewport;
    desired: Viewport;
    desiredViewportMap: WeakMap<SessionPort, Viewport>;
    element: HTMLDivElement;
    constructor(sessionService: SessionService);
    /**
     * Returns the suggested viewport. By default, returns the width and height of the
     * document.documentElement (if DOM is available), otherwise, returns {width:0, height:0}
     */
    getSuggested(): Viewport;
    /**
     * Set the desired viewport
     */
    setDesired(viewport: Viewport): void;
    /**
     * Set the current viewport. Called internally.
     */
    _setViewport(viewport: Viewport): void;
}

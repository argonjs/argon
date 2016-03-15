import { SessionService, SessionPort } from './session';
import { Event } from './utils';
/**
 * Describes the mode of interaction for the user interface.
 */
export declare enum InteractionMode {
    /**
     * A 2D user interface is considered the primary mode of interaction.
     * A 3D user interace components may still be presented as a secondary mode of interaction.
     */
    Flat,
    /**
     * A 3D user interface is considered the primary mode of interaction.
     */
    Immersive,
}
/**
 * Manages the interaction mode state
 */
export declare class InteractionModeService {
    private sessionService;
    /**
     * An event that is raised when the interaction mode has changed
     */
    changeEvent: Event<{
        previous: InteractionMode;
    }>;
    /**
     * The current interaction mode.
     */
    current: InteractionMode;
    /**
     * The desired interaction mode.
     */
    desired: any;
    /**
     * Manager-only. A map from a managed session to the desired interaction mode.
     */
    desiredInteractionModeMap: WeakMap<SessionPort, InteractionMode>;
    constructor(sessionService: SessionService);
    setDesired(mode: InteractionMode): void;
    /**
     * Manager-only. Set the interaction mode
     */
    set(mode: InteractionMode): void;
    private _setMode(mode);
}

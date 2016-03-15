
import {inject} from 'aurelia-dependency-injection';
import {SessionService, SessionPort} from './session';
import {Event} from './utils';

/**
 * Describes the mode of interaction for the user interface.
 */
export enum InteractionMode {

    /**
     * A 2D user interface is considered the primary mode of interaction.
     * A 3D user interace components may still be presented as a secondary mode of interaction. 
     */
    Flat = "Flat" as any,

    /**
     * A 3D user interface is considered the primary mode of interaction.
     */
    Immersive = "Immersive" as any
}

/**
 * Manages the interaction mode state
 */
@inject(SessionService)
export class InteractionModeService {

    /**
     * An event that is raised when the interaction mode has changed
     */
    public readonly changeEvent = new Event<{ previous: InteractionMode }>();

    /**
     * The current interaction mode.
     */
    public current = InteractionMode.Immersive;

    /**
     * The desired interaction mode.
     */
    public desired = null;

    /**
     * Manager-only. A map from a managed session to the desired interaction mode.
     */
    public desiredInteractionModeMap = new WeakMap<SessionPort, InteractionMode>();

    constructor(private sessionService: SessionService) {
        if (sessionService.isManager()) {
            sessionService.connectEvent.addEventListener((session) => {
                session.on['ar.interactionMode.desired'] = (mode: InteractionMode) => {
                    this.desiredInteractionModeMap.set(session, mode);
                }
            })

            this.changeEvent.addEventListener(() => {
                for (const session of sessionService.managedSessions) {
                    session.send('ar.interactionMode.current', this.current);
                }
            });
        }

        sessionService.manager.on['ar.interactionMode.current'] = (mode) => {
            this._setMode(mode);
        }

    }

    public setDesired(mode: InteractionMode) {
        this.desired = mode;
        this.sessionService.manager.send('ar.interactionMode.desired', mode);
    }

    /**
     * Manager-only. Set the interaction mode
     */
    public set(mode: InteractionMode) {
        this.sessionService.ensureIsManager();
        this._setMode(mode);
    }

    private _setMode(mode: InteractionMode) {
        const previous = this.current;
        this.current = mode;
        if (previous !== mode) {
            this.changeEvent.raiseEvent({ previous });
        }
    }

}

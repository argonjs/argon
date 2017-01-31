import { inject } from 'aurelia-dependency-injection';
import { SessionService, SessionPort } from './session';
import { Event } from './utils';

/**
 * Access visibility state
 */
@inject(SessionService)
export class VisibilityService {

    /**
     * An event that is raised when the app becomes visible
     */
    public showEvent = new Event<void>();

    /**
     * An event that is raised when the app becomes hidden
     */
    public hideEvent = new Event<void>();

    /**
     * True if this app has focus
     */
    public get isVisible() { return this._isVisible }
    private _isVisible = false;

    constructor(sessionService: SessionService) {
        sessionService.manager.on['ar.visibility.state'] = ({state}: { state: boolean }) => {
            if (this._isVisible !== state) {
                this._isVisible = state;
                if (state) this.showEvent.raiseEvent(undefined);
                else this.hideEvent.raiseEvent(undefined)
            }
        }
    }

}


/**
 * Manage visibility state
 */
@inject(SessionService, VisibilityService)
export class VisibilityServiceProvider {
    
    public visibleSessions = new Set<SessionPort>();
    public sessionChangeEvent = new Event<SessionPort>();

    constructor(sessionService: SessionService) {
        sessionService.ensureIsRealityManager();
        
        this.sessionChangeEvent.addEventListener((session)=>{
            session.send('ar.visibility.state', {state: this.visibleSessions.has(session)});
        });

        sessionService.manager.connectEvent.addEventListener(()=>{
            this.set(sessionService.manager, true);
        });
    }

    set(session:SessionPort, visibility:boolean) {
        if (visibility) {
            if (!this.visibleSessions.has(session)) {
                this.visibleSessions.add(session);
                this.sessionChangeEvent.raiseEvent(session);
            }
        } else {
            if (this.visibleSessions.has(session)) {
                this.visibleSessions.delete(session);
                this.sessionChangeEvent.raiseEvent(session);
            }
        }
    }

}
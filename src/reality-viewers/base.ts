import { inject } from 'aurelia-dependency-injection'
import {SessionService, SessionPort} from '../session'

/**
 * Abstract class for a RealityViewer
 */
@inject(SessionService)
export abstract class RealityViewer {
    public session:SessionPort;

    constructor(private _sessionService:SessionService, public uri:string) {}

    abstract destroy();
    abstract setPresenting(flag:boolean);

    load() {
        if (this.session) this.session.close();
        this.session = this._sessionService.addManagedSessionPort(this.uri);
    };
    
    static EMPTY = 'reality:empty';
    static LIVE = 'reality:live';
    
    static getType(uri?: string) {
        if (uri === undefined) return undefined;
        if (uri.split(':')[0] === 'reality') {
            return uri;
        }
        return 'hosted';
    }
}
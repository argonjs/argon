import {ReferenceFrame} from '../cesium/cesium-imports'
import {SessionPort} from '../session'
import {Event} from '../utils'

/**
 * Abstract class for a RealityViewer
 */
export abstract class RealityViewer {

    public providedReferenceFrames:Array<ReferenceFrame|string> = [];

    public connectEvent = new Event<SessionPort>();
    public presentChangeEvent = new Event<void>();

    private _isPresenting = false;
    public get isPresenting() {
        return this._isPresenting;
    }

    private _session?:SessionPort;
    public get session() {
        return this._session;
    }

    constructor(
        public uri:string
    ){
        this.connectEvent.addEventListener((session)=>{
            if (this._session) this._session.close();
            this._session = session;
            session.closeEvent.addEventListener(()=>{
                if (this._session === session) this._session = undefined;
            });
        });
    }

    public destroy() {
        if (this.session) {
            this.session.close();
        }
    };

    public setPresenting(flag:boolean) {
        if (this._isPresenting !== flag) {
            this._isPresenting = flag;
            this.presentChangeEvent.raiseEvent(undefined);
        }
    }

    public abstract load();
    
    static DEFAULT = 'reality:default';
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
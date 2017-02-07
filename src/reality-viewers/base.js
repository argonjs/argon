import { Event } from '../utils';
/**
 * Abstract class for a RealityViewer
 */
export class RealityViewer {
    constructor(uri) {
        this.uri = uri;
        this.providedReferenceFrames = [];
        this.connectEvent = new Event();
        this.presentChangeEvent = new Event();
        this._isPresenting = false;
        this.connectEvent.addEventListener((session) => {
            if (this._session)
                this._session.close();
            this._session = session;
            session.closeEvent.addEventListener(() => {
                if (this._session === session)
                    this._session = undefined;
            });
        });
    }
    get isPresenting() {
        return this._isPresenting;
    }
    get session() {
        return this._session;
    }
    destroy() {
        if (this.session) {
            this.session.close();
        }
    }
    ;
    setPresenting(flag) {
        if (this._isPresenting !== flag) {
            this._isPresenting = flag;
            this.presentChangeEvent.raiseEvent(undefined);
        }
    }
    static getType(uri) {
        if (uri === undefined)
            return undefined;
        if (uri.split(':')[0] === 'reality') {
            return uri;
        }
        return 'hosted';
    }
}
RealityViewer.DEFAULT = 'reality:default';
RealityViewer.EMPTY = 'reality:empty';
RealityViewer.LIVE = 'reality:live';

import { SessionService, SessionPort } from '../session';
/**
 * Abstract class for a RealityViewer
 */
export declare abstract class RealityViewer {
    private _sessionService;
    uri: string;
    session: SessionPort;
    constructor(_sessionService: SessionService, uri: string);
    abstract destroy(): any;
    abstract setPresenting(flag: boolean): any;
    load(): void;
    static EMPTY: string;
    static LIVE: string;
    static getType(uri?: string): string | undefined;
}

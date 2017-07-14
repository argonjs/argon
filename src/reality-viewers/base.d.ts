/// <reference types="cesium" />
import { ReferenceFrame } from '../cesium/cesium-imports';
import { SessionPort } from '../session';
import { Event } from '../utils';
/**
 * Abstract class for a RealityViewer
 */
export declare abstract class RealityViewer {
    uri: string;
    providedReferenceFrames: Array<ReferenceFrame | string>;
    connectEvent: Event<SessionPort>;
    presentChangeEvent: Event<void>;
    private _isPresenting;
    readonly isPresenting: boolean;
    private _session?;
    readonly session: SessionPort | undefined;
    _sharedCanvas: boolean;
    readonly isSharedCanvas: boolean;
    constructor(uri: string);
    destroy(): void;
    setPresenting(flag: boolean): void;
    abstract load(): any;
    static DEFAULT: string;
    static EMPTY: string;
    static LIVE: string;
    static WEBRTC: string;
    static TANGO: string;
    static getType(uri?: string): string | undefined;
}

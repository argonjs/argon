import { EntityPose } from './context.ts';
import { Entity, JulianDate, Quaternion, Cartesian3, ReferenceFrame } from './cesium/cesium-imports.ts';
export declare type RemoveCallback = () => void;
export declare class Event<T> {
    private _event;
    readonly numberOfListeners: number;
    addEventListener(listener: (data: T) => void): RemoveCallback;
    removeEventListener(listener: (data: T) => void): boolean;
    raiseEvent(data: T): void;
}
export declare function calculatePose(entity: Entity, time: JulianDate): EntityPose;
export declare class CommandQueue {
    private _queue;
    private _currentUserData;
    private _currentCommandPending;
    errorEvent: Event<Error>;
    constructor();
    push(command: () => any | Thenable<any>, userData?: any): void;
    clear(): void;
    readonly currentUserData: any;
    private _executeNextCommand();
}
export declare function getAncestorReferenceFrames(frame: Entity): (Entity | ReferenceFrame)[];
export declare function getRootReferenceFrame(frame: Entity): Entity | ReferenceFrame;
export declare function getEntityPositionInReferenceFrame(entity: Entity, time: JulianDate, referenceFrame: ReferenceFrame | Entity, result: Cartesian3): Cartesian3;
export declare function getEntityOrientationInReferenceFrame(entity: Entity, time: JulianDate, referenceFrame: ReferenceFrame | Entity, result: Quaternion): Quaternion;
export declare function resolveURL(inURL: string): string;
export declare function parseURL(inURL: string): {
    href: string;
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
    host: string;
};

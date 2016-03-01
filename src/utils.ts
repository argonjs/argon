import {resolver, Container} from 'aurelia-dependency-injection';
import {EntityPose} from './context.ts'
import CesiumEvent from 'Cesium/Source/Core/Event';
import * as Cesium from 'Cesium';
import {
    Ellipsoid,
    OrientationProperty,
    Quaternion,
    Cartesian3,
    ReferenceFrame,
    Transforms,
    Matrix3,
    Matrix4
} from './cesium/cesium-imports.ts'

export type RemoveCallback = () => void;

export class Event<T> {

    private _event = new CesiumEvent();

    get numberOfListeners() {
        return this._event.numberOfListeners;
    }

    addEventListener(listener: (data: T) => void): RemoveCallback {
        return this._event.addEventListener(listener);
    }

    removeEventListener(listener: (data: T) => void): boolean {
        return this._event.removeEventListener(listener);
    }

    raiseEvent(data: T): void {
        this._event.raiseEvent(data);
    }

}

export function calculatePose(entity: Cesium.Entity, time: Cesium.JulianDate): EntityPose {
    const entityPosition = entity.position;
    const referenceFrame = entityPosition.referenceFrame;
    const referenceFrameID = typeof referenceFrame === 'number' ? referenceFrame : referenceFrame.id;
    return {
        referenceFrame: referenceFrameID,
        position: entity.position.getValueInReferenceFrame(time, referenceFrame, <Cesium.Cartesian3>{}),
        orientation: entity.orientation.getValue(time, <Cesium.Quaternion>{})
    }
}

export class CommandQueue {
    private _queue: Array<{ command: Function, userData: any }> = [];
    private _currentUserData: any;
    private _currentCommandPending: PromiseLike<any> = null;

    public errorEvent = new Event<Error>();

    constructor() {
        this.errorEvent.addEventListener((error) => {
            if (this.errorEvent.numberOfListeners === 1) console.error(error);
        })
    }

    public push(command: () => any | Thenable<any>, userData?: any) {
        this._queue.push({ command, userData });
        if (this._queue.length === 1 && this._currentCommandPending === null) {
            Promise.resolve().then(this._executeNextCommand.bind(this));
        }
    }

    public clear() {
        this._queue = [];
    }

    public get currentUserData(): any {
        return this._currentUserData;
    }

    private _executeNextCommand() {
        const item = this._queue.shift();
        if (!item) {
            this._currentUserData = null;
            this._currentCommandPending = null;
            return;
        }
        const {command, userData} = item;
        this._currentUserData = userData;
        this._currentCommandPending = new Promise((resolve, reject) => resolve(command()))
            .then(this._executeNextCommand.bind(this))
            .catch((error) => {
                this.errorEvent.raiseEvent(error);
                this._executeNextCommand();
            });
    }
}


export function getAncestorReferenceFrames(frame: Cesium.Entity) {
    var frames: Array<Cesium.Entity | Cesium.ReferenceFrame> = []
    while (frame !== undefined && frame !== null) {
        frames.unshift(frame)
        frame = frame.position && <Cesium.Entity>frame.position.referenceFrame
    }
    return frames
}

export function getRootReferenceFrame(frame: Cesium.Entity) {
    return getAncestorReferenceFrames(frame)[0]
}

const scratchCartesianPositionFIXED = new Cartesian3
const scratchMatrix4 = new Matrix4
const scratchMatrix3 = new Matrix3

export function getEntityPositionInReferenceFrame(
    entity: Cesium.Entity,
    time: Cesium.JulianDate,
    referenceFrame: Cesium.ReferenceFrame | Cesium.Entity,
    result: Cesium.Cartesian3): Cesium.Cartesian3 {
    return entity.position && entity.position.getValueInReferenceFrame(time, referenceFrame, result)
}

export function getEntityOrientationInReferenceFrame(
    entity: Cesium.Entity,
    time: Cesium.JulianDate,
    referenceFrame: Cesium.ReferenceFrame | Cesium.Entity,
    result: Cesium.Quaternion): Cesium.Quaternion {
    const entityFrame = entity.position && entity.position.referenceFrame
    if (entityFrame === undefined) return undefined
    let orientation: Cesium.Quaternion = entity.orientation && entity.orientation.getValue(time, result)
    if (!orientation) {
        // if not orientation is available, calculate an orientation based on position
        const entityPositionFIXED = getEntityPositionInReferenceFrame(entity, time, ReferenceFrame.FIXED, scratchCartesianPositionFIXED)
        if (!entityPositionFIXED) return Quaternion.clone(Quaternion.IDENTITY, result)
        if (Cartesian3.ZERO.equals(entityPositionFIXED)) throw new Error('invalid cartographic position')
        const transform = Transforms.eastNorthUpToFixedFrame(entityPositionFIXED, Ellipsoid.WGS84, scratchMatrix4);
        const rotation = Matrix4.getRotation(transform, scratchMatrix3);
        const fixedOrientation = Quaternion.fromRotationMatrix(rotation, result);
        return OrientationProperty.convertToReferenceFrame(time, fixedOrientation, ReferenceFrame.FIXED, referenceFrame, result)
    }
    return OrientationProperty.convertToReferenceFrame(time, orientation, entityFrame, referenceFrame, result)
}


const urlParser = typeof document !== 'undefined' ? document.createElement("a") : undefined

export function resolveURL(inURL: string): string {
    if (!urlParser) throw new Error("resolveURL requires DOM api");
    if (inURL === undefined) throw new Error('Expected inURL')
    urlParser.href = null
    urlParser.href = inURL
    return urlParser.href
}

export function parseURL(inURL: string) {
    if (!urlParser) throw new Error("parseURL requires DOM api");
    if (inURL === undefined) throw new Error('Expected inURL')
    urlParser.href = null
    urlParser.href = inURL
    return {
        href: urlParser.href,
        protocol: urlParser.protocol,
        hostname: urlParser.hostname,
        port: urlParser.port,
        pathname: urlParser.pathname,
        search: urlParser.search,
        hash: urlParser.hash,
        host: urlParser.host
    }
}

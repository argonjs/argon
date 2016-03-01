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

/**
 * To remove the Callback function.
 */
export type RemoveCallback = () => void;

/**
 * A generic utility class for managing subscribers for a particular event.
 */
export class Event<T> {

    private _event = new CesiumEvent();
    /**
     * Get the number of listeners currently subscribed to the event.
     * @return Number of listeners currently subscribed to the event.
     */
    get numberOfListeners() {
        return this._event.numberOfListeners;
    }

    /**
      * Add an event listener.
      * @param The function to be executed when the event is raised.
      */
    addEventListener(listener: (data: T) => void): RemoveCallback {
        return this._event.addEventListener(listener);
    }

    /**
     * Remove an event listener.
     * @param The function to be unregistered.
     * @return True if the listener was removed; 
     * false if the listener and scope are not registered with the event.
     */
    removeEventListener(listener: (data: T) => void): boolean {
        return this._event.removeEventListener(listener);
    }

    /**
     * Raises the event by calling each registered listener with all supplied arguments.
     * @param This method takes any number of parameters and passes them through to the listener functions.
     */
    raiseEvent(data: T): void {
        this._event.raiseEvent(data);
    }

}

/**
 * Create an EntityPose of the Cesium Entity based on Cesium Julian Date.
 * @param entity The entity to get position. 
 * @param time The time for which to retrieve the value.
 * @return An EntityPose object with orientation, position and referenceFrame.
 */
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
    
    /**
     * An error event.
     */
    public errorEvent = new Event<Error>();
    /**
     * If errorEvent has 1 listener, outputs the error message to the web console.
     */
    constructor() {
        this.errorEvent.addEventListener((error) => {
            if (this.errorEvent.numberOfListeners === 1) console.error(error);
        })
    }
    /**
     * Push the command and the data needed to run the command to the command queue.
     * @param command Any command ready to be pushed into the command queue.
     * @param userData Any data needed to run the command.
     */
    public push(command: () => any | Thenable<any>, userData?: any) {
        this._queue.push({ command, userData });
        if (this._queue.length === 1 && this._currentCommandPending === null) {
            Promise.resolve().then(this._executeNextCommand.bind(this));
        }
    }
    /**
     * Clear commandQueue.
     */
    public clear() {
        this._queue = [];
    }
    /**
     * Get current user data.
     * @return Current userData.
     */
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

/**
 * Get array of ancestor reference frames of a Cesium Entity.
 * @param frame A Cesium Entity to get ancestor reference frames.
 * @param frames An array of reference frames of the Cesium Entity.
 */
export function getAncestorReferenceFrames(frame: Cesium.Entity) {
    var frames: Array<Cesium.Entity | Cesium.ReferenceFrame> = []
    while (frame !== undefined && frame !== null) {
        frames.unshift(frame)
        frame = frame.position && <Cesium.Entity>frame.position.referenceFrame
    }
    return frames
}
/**
 * Get root reference frame of the Cesium Entity.
 * @param frames An array of reference frames of the Cesium Entity.
 * @return the first frame from ancestor reference frames array.
 */
export function getRootReferenceFrame(frame: Cesium.Entity) {
    return getAncestorReferenceFrames(frame)[0]
}

const scratchCartesianPositionFIXED = new Cartesian3
const scratchMatrix4 = new Matrix4
const scratchMatrix3 = new Matrix3
/**
 * Gets the value of the Position property at the provided time and in the provided reference frame.
 * @param entity The entity to get position. 
 * @param time The time for which to retrieve the value.
 * @param referenceFrame The desired referenceFrame of the result.
 * @param result The object to store the value into.
 * @return The modified result parameter.
 */
export function getEntityPositionInReferenceFrame(
    entity: Cesium.Entity,
    time: Cesium.JulianDate,
    referenceFrame: Cesium.ReferenceFrame | Cesium.Entity,
    result: Cesium.Cartesian3): Cesium.Cartesian3 {
    return entity.position && entity.position.getValueInReferenceFrame(time, referenceFrame, result)
}
/**
 * Get the value of the Orientation property at the provided time and in the provided reference frame.
 * @param entity The entity to get position. 
 * @param time The time for which to retrieve the value.
 * @param referenceFrame The desired referenceFrame of the result.
 * @param result The object to store the value into.
 * @return The modified result parameter.
 */
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
/**
 * If urlParser does not have a value, throw error message "resolveURL requires DOM api".
 * If inURL is undefined, throw error message "expected inURL".
 * Otherwise, assign value of inURL to urlParser.href.
 * @param inURL A URL needed to be resolved.
 * @returns A URL ready to be parsed.
 */
export function resolveURL(inURL: string): string {
    if (!urlParser) throw new Error("resolveURL requires DOM api");
    if (inURL === undefined) throw new Error('Expected inURL')
    urlParser.href = null
    urlParser.href = inURL
    return urlParser.href
}
/**
 * Parse URL to an object describing details of the URL with href, protocol, 
 * hostname, port, pathname, search, hash, host.
 * @param inURL A URL needed to be parsed.
 * @return An object showing parsed URL with href, protocol, 
 * hostname, port, pathname, search, hash, host.
 */
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

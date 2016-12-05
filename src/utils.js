import CesiumEvent from 'cesium/Source/Core/Event';
import { defined, PerspectiveOffCenterFrustum, ConstantPositionProperty, OrientationProperty, ConstantProperty, Quaternion, Cartesian3, Matrix4 } from './cesium/cesium-imports';
/**
 * Provides the ability raise and subscribe to an event.
 */
export class Event {
    constructor() {
        this._event = new CesiumEvent();
    }
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
      * @return A convenience function which removes this event listener when called
      */
    addEventListener(listener) {
        return this._event.addEventListener(listener);
    }
    /**
     * Remove an event listener.
     * @param The function to be unregistered.
     * @return True if the listener was removed;
     * false if the listener and scope are not registered with the event.
     */
    removeEventListener(listener) {
        return this._event.removeEventListener(listener);
    }
    /**
     * Raises the event by calling each registered listener with all supplied arguments.
     * @param This method takes any number of parameters and passes them through to the listener functions.
     */
    raiseEvent(data) {
        this._event.raiseEvent(data);
    }
}
/**
* TODO.
*/
export class CommandQueue {
    /**
     * If errorEvent has 1 listener, outputs the error message to the web console.
     */
    constructor() {
        this._queue = [];
        this._paused = true;
        /**
         * An error event.
         */
        this.errorEvent = new Event();
        this.errorEvent.addEventListener((error) => {
            if (this.errorEvent.numberOfListeners === 1)
                console.error(error);
        });
    }
    /**
     * Push a command to the command queue.
     * @param command Any command ready to be pushed into the command queue.
     */
    push(command, execute) {
        const result = new Promise((resolve, reject) => {
            this._queue.push({
                command,
                reject,
                execute: () => {
                    // console.log('CommandQueue: Executing command ' + command.toString());
                    const result = Promise.resolve().then(command);
                    // result.then(() => { console.log('CommandQueue: DONE ' + command.toString()) });
                    resolve(result);
                    return result;
                }
            });
        });
        if (execute)
            this.execute();
        return result;
    }
    /**
     * Execute the command queue
     */
    execute() {
        this._paused = false;
        Promise.resolve().then(() => {
            if (this._queue.length > 0 && !this._currentCommandPending) {
                this._executeNextCommand();
            }
        });
    }
    /**
     * Puase the command queue (currently executing commands will still complete)
     */
    pause() {
        this._paused = true;
    }
    /**
     * Clear commandQueue.
     */
    clear() {
        this._queue.forEach((item) => {
            item.reject("Unable to execute.");
        });
        this._queue = [];
    }
    _executeNextCommand() {
        this._currentCommand = undefined;
        this._currentCommandPending = undefined;
        if (this._paused)
            return;
        const item = this._queue.shift();
        if (!item)
            return;
        this._currentCommand = item.command;
        this._currentCommandPending = item.execute()
            .then(this._executeNextCommand.bind(this))
            .catch((e) => {
            this.errorEvent.raiseEvent(e);
            this._executeNextCommand();
        });
    }
}
/**
 * Get array of ancestor reference frames of a Cesium Entity.
 * @param frame A Cesium Entity to get ancestor reference frames.
 * @param frames An array of reference frames of the Cesium Entity.
 */
export function getAncestorReferenceFrames(frame) {
    const frames = [];
    let f = frame;
    do {
        let position = f.position;
        f = position && position.referenceFrame;
        if (defined(f))
            frames.unshift(f);
    } while (defined(f));
    return frames;
}
/**
 * Gets the value of the Position property at the provided time and in the provided reference frame.
 * @param entity The entity to get position.
 * @param time The time for which to retrieve the value.
 * @param referenceFrame The desired referenceFrame of the result.
 * @param result The object to store the value into.
 * @return The modified result parameter.
 */
export function getEntityPositionInReferenceFrame(entity, time, referenceFrame, result) {
    return entity.position && entity.position.getValueInReferenceFrame(time, referenceFrame, result);
}
/**
 * Alias of getEntityPositionInReferenceFrame
 */
export const getEntityPosition = getEntityPositionInReferenceFrame;
/**
 * Get the value of the Orientation property at the provided time and in the provided reference frame.
 * @param entity The entity to get position.
 * @param time The time for which to retrieve the value.
 * @param referenceFrame The desired referenceFrame of the result.
 * @param result The object to store the value into.
 * @return The modified result parameter.
 */
export function getEntityOrientationInReferenceFrame(entity, time, referenceFrame, result) {
    const entityFrame = entity.position && entity.position.referenceFrame;
    if (!defined(entityFrame))
        return undefined;
    let orientation = entity.orientation && entity.orientation.getValue(time, result);
    if (!defined(orientation))
        return undefined;
    return OrientationProperty.convertToReferenceFrame(time, orientation, entityFrame, referenceFrame, result);
}
/**
 * Alias of getEntityOrientationInReferenceFrame
 */
export const getEntityOrientation = getEntityOrientationInReferenceFrame;
// const scratchCartesianPositionFIXED = new Cartesian3
// const scratchMatrix4 = new Matrix4
// const scratchMatrix3 = new Matrix3
//  {
//         // if no orientation is available, calculate an orientation based on position
//         const entityPositionFIXED = getEntityPositionInReferenceFrame(entity, time, ReferenceFrame.FIXED, scratchCartesianPositionFIXED)
//         if (!entityPositionFIXED) return Quaternion.clone(Quaternion.IDENTITY, result)
//         if (Cartesian3.ZERO.equals(entityPositionFIXED)) throw new Error('invalid cartographic position')
//         const transform = Transforms.eastNorthUpToFixedFrame(entityPositionFIXED, Ellipsoid.WGS84, scratchMatrix4);
//         const rotation = Matrix4.getRotation(transform, scratchMatrix3);
//         const fixedOrientation = Quaternion.fromRotationMatrix(rotation, result);
//         return OrientationProperty.convertToReferenceFrame(time, fixedOrientation, ReferenceFrame.FIXED, referenceFrame, result)
//     }
/**
 * Create a SerializedEntityPose from a source entity.
 * @param entity The entity which the serialized pose represents.
 * @param time The time which to retrieve the pose.
 * @param referenceFrame The reference frame to use for generating the pose.
 * If a target reference frame is not provided, the entity pose will be
 * serialized according to the furthest ancestor frame that resolves to a valid pose.
 * @return An EntityPose object with orientation, position and referenceFrame.
 */
export function getSerializedEntityPose(entity, time, frame) {
    let frames = undefined;
    if (!defined(frame)) {
        frames = getAncestorReferenceFrames(entity);
        frame = frames[0];
    }
    if (!defined(frame))
        return;
    const p = getEntityPositionInReferenceFrame(entity, time, frame, {});
    if (!p && !frames)
        return undefined;
    const o = getEntityOrientationInReferenceFrame(entity, time, frame, {});
    if (!o && !frames)
        return undefined;
    if (p && o) {
        return {
            p,
            o,
            r: typeof frame === 'number' ? frame : frame.id
        };
    }
    else if (frames) {
        for (let i = 1; i < frames.length; i++) {
            frame = frames[i];
            if (!defined(frame))
                return undefined;
            const result = getSerializedEntityPose(entity, time, frame);
            if (result)
                return result;
        }
    }
    return undefined;
}
const urlParser = typeof document !== 'undefined' ? document.createElement("a") : undefined;
/**
 * If urlParser does not have a value, throw error message "resolveURL requires DOM api".
 * If inURL is undefined, throw error message "expected inURL".
 * Otherwise, assign value of inURL to urlParser.href.
 * @param inURL A URL needed to be resolved.
 * @returns A URL ready to be parsed.
 */
export function resolveURL(inURL) {
    if (!urlParser)
        throw new Error("resolveURL requires DOM api");
    if (inURL === undefined)
        throw new Error('Expected inURL');
    urlParser.href = '';
    urlParser.href = inURL;
    return urlParser.href;
}
/**
 * Parse URL to an object describing details of the URL with href, protocol,
 * hostname, port, pathname, search, hash, host.
 * @param inURL A URL needed to be parsed.
 * @return An object showing parsed URL with href, protocol,
 * hostname, port, pathname, search, hash, host.
 */
export function parseURL(inURL) {
    if (!urlParser)
        throw new Error("parseURL requires DOM api");
    if (inURL === undefined)
        throw new Error('Expected inURL');
    urlParser.href = '';
    urlParser.href = inURL;
    return {
        href: urlParser.href,
        protocol: urlParser.protocol,
        hostname: urlParser.hostname,
        port: urlParser.port,
        pathname: urlParser.pathname,
        search: urlParser.search,
        hash: urlParser.hash,
        host: urlParser.host
    };
}
export function resolveElement(elementOrSelector) {
    if (elementOrSelector instanceof HTMLElement) {
        return Promise.resolve(elementOrSelector);
    }
    else {
        return new Promise((resolve, reject) => {
            const resolveElement = () => {
                let e = document.querySelector(`${elementOrSelector}`);
                if (!e)
                    reject(new Error(`Unable to resolve element id ${elementOrSelector}`));
                else
                    resolve(e);
            };
            if (document.readyState == 'loading') {
                document.addEventListener('DOMContentLoaded', resolveElement);
            }
            else {
                resolveElement();
            }
        });
    }
}
/**
 * Returns a viewport that reflects the size of the current window
 */
export function getWindowViewport() {
    if (typeof document !== 'undefined' && document.documentElement) {
        return {
            x: 0,
            y: 0,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        };
    }
    throw new Error("Not implemeneted for the current platform");
}
/**
 * A MessageChannel pollyfill.
 */
export class MessageChannelLike {
    /**
     * Create a MessageChannelLike instance.
     */
    constructor() {
        const messageChannel = this;
        let _portsOpen = true;
        let _port1ready;
        let _port2ready;
        let _port1onmessage;
        _port1ready = new Promise((resolve) => {
            messageChannel.port1 = {
                set onmessage(func) {
                    _port1onmessage = func;
                    resolve();
                },
                get onmessage() {
                    return _port1onmessage;
                },
                postMessage(data) {
                    if (_portsOpen) {
                        _port2ready.then(() => {
                            if (messageChannel.port2.onmessage)
                                messageChannel.port2.onmessage({ data });
                        });
                    }
                },
                close() {
                    _portsOpen = false;
                }
            };
        });
        let _port2onmessage;
        _port2ready = new Promise((resolve) => {
            messageChannel.port2 = {
                set onmessage(func) {
                    _port2onmessage = func;
                    resolve();
                },
                get onmessage() {
                    return _port2onmessage;
                },
                postMessage(data) {
                    if (_portsOpen) {
                        _port1ready.then(() => {
                            if (messageChannel.port1.onmessage)
                                messageChannel.port1.onmessage({ data });
                        });
                    }
                },
                close() {
                    _portsOpen = false;
                }
            };
        });
    }
}
/**
 * A synchronous MessageChannel.
 */
export class SynchronousMessageChannel {
    /**
     * Create a MessageChannelLike instance.
     */
    constructor() {
        const messageChannel = this;
        let pendingMessages1 = [];
        let onmessage1 = function (message) {
            pendingMessages1.push(message);
        };
        messageChannel.port1 = {
            get onmessage() { return onmessage1; },
            set onmessage(func) {
                onmessage1 = func;
                pendingMessages1.forEach((data) => func(data));
                pendingMessages1 = [];
            },
            postMessage(data) {
                if (messageChannel.port2.onmessage)
                    messageChannel.port2.onmessage({ data });
            },
            close() {
                messageChannel.port1.onmessage = undefined;
                messageChannel.port2.onmessage = undefined;
            }
        };
        let pendingMessages2 = [];
        let onmessage2 = function (message) {
            pendingMessages2.push(message);
        };
        messageChannel.port2 = {
            get onmessage() { return onmessage2; },
            set onmessage(func) {
                onmessage2 = func;
                pendingMessages2.forEach((data) => func(data));
                pendingMessages2 = [];
            },
            postMessage(data) {
                if (messageChannel.port1.onmessage)
                    messageChannel.port1.onmessage({ data });
            },
            close() {
                messageChannel.port1.onmessage = undefined;
                messageChannel.port2.onmessage = undefined;
            }
        };
    }
}
/**
 * A factory which creates MessageChannel or MessageChannelLike instances, depending on
 * wheter or not MessageChannel is avaialble in the execution context.
 */
export class MessageChannelFactory {
    /**
     * Create a MessageChannel (or MessageChannelLike) instance.
     */
    create() {
        if (typeof MessageChannel !== 'undefined')
            return new MessageChannel();
        else
            return new MessageChannelLike();
    }
    /**
     * Create a SynchronousMessageChannel instance.
     */
    createSynchronous() {
        return new SynchronousMessageChannel();
    }
}
export function decomposePerspectiveOffCenterProjectionMatrix(mat, result) {
    const m11 = mat[Matrix4.COLUMN0ROW0];
    // const m12 = mat[Matrix4.COLUMN0ROW1];
    const m22 = mat[Matrix4.COLUMN1ROW1];
    const m31 = mat[Matrix4.COLUMN2ROW0];
    const m32 = mat[Matrix4.COLUMN2ROW1];
    const m33 = mat[Matrix4.COLUMN2ROW2];
    const m43 = mat[Matrix4.COLUMN3ROW2];
    const near = result.near = m43 / (m33 - 1);
    result.far = m43 / (m33 + 1);
    result.bottom = near * (m32 - 1) / m22;
    result.top = near * (m32 + 1) / m22;
    result.left = near * (m31 - 1) / m11;
    result.right = near * (m31 + 1) / m11;
    return result;
}
const scratchPerspectiveOffCenterFrustum = new PerspectiveOffCenterFrustum;
export function decomposePerspectiveProjectionMatrix(mat, result) {
    const f = decomposePerspectiveOffCenterProjectionMatrix(mat, scratchPerspectiveOffCenterFrustum);
    const xOffset = (f.left + f.right) / 2;
    const yOffset = (f.top + f.bottom) / 2;
    const near = f.near;
    const far = f.far;
    // const left = f.left - xOffset;
    const right = f.right - xOffset;
    const top = f.top - yOffset;
    // const bottom = f.bottom - yOffset;
    const aspectRatio = right / top;
    const fovy = 2 * Math.atan(top / near);
    let fov;
    if (aspectRatio < 1) {
        fov = fovy;
    }
    else {
        fov = Math.atan(Math.tan(fovy * 0.5) * aspectRatio) * 2.0;
    }
    result.near = near;
    result.far = far;
    result.fov = fov;
    result.aspectRatio = aspectRatio;
    result.xOffset = xOffset;
    result.yOffset = yOffset;
    return result;
}
var scratchCartesian = new Cartesian3;
var scratchOrientation = new Quaternion;
/**
 * Convert an Entity's position and orientation properties to a new reference frame.
 * The properties must be constant properties.
 * @param entity The entity to convert.
 * @param time The time which to retrieve the pose up the reference chain.
 * @param referenceFrame The reference frame to convert the position and oriention to.
 * @return a boolean indicating success or failure.  Will be false if either property is
 * not constant, or if either property cannot be converted to the new frame.
 */
export function convertEntityReferenceFrame(entity, time, frame) {
    if (!entity.position || !(entity.position instanceof ConstantPositionProperty) ||
        !entity.orientation || !(entity.orientation instanceof ConstantProperty)) {
        return false;
    }
    if (!getEntityPositionInReferenceFrame(entity, time, frame, scratchCartesian)) {
        return false;
    }
    if (!getEntityOrientationInReferenceFrame(entity, time, frame, scratchOrientation)) {
        return false;
    }
    entity.position.setValue(scratchCartesian, frame);
    entity.orientation.setValue(scratchOrientation);
    return true;
}
export const isIOS = typeof navigator !== 'undefined' && typeof window !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
export function openInArgonApp() {
    if (isIOS) {
        // var now = Date.now();
        // setTimeout(function () {
        //     if (Date.now() - now > 1000) return;
        //     window.location.href = "https://itunes.apple.com/us/app/argon4/id1089308600";
        // }, 25);
        const protocol = window.location.protocol;
        window.location.protocol = protocol === 'https:' ? 'argon4s' : 'argon4';
    }
}
var lastTime = 0;
export const requestAnimationFrame = (window && window.requestAnimationFrame) ?
    window.requestAnimationFrame.bind(window) : (callback) => {
    var currTime = performance.now();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
};

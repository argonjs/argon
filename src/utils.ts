import { SerializedEntityState } from './common'
import {
    defined,
    Entity,
    JulianDate,
    PerspectiveFrustum,
    PerspectiveOffCenterFrustum,
    PositionProperty,
    ConstantPositionProperty,
    OrientationProperty,
    ConstantProperty,
    Quaternion,
    Cartesian3,
    ReferenceFrame,
    Matrix4,
    Transforms,
    Cartographic,
    sampleTerrain
} from './cesium/cesium-imports'

import {
    MapzenTerrariumTerrainProvider
} from './cesium/MapzenTerrariumTerrainProvider'

export * from './utils/command-queue';
export * from './utils/event';
export * from './utils/message-channel';
export {default as getEventSynthesizier} from './utils/ui-event-synthesizer';
export {default as createEventForwarder} from './utils/ui-event-forwarder';

const reNative = /\{\s*\[native code\]\s*\}/;
export function isNativeFunction(f:Function) {
    return typeof f === 'function' && reNative.test(Function.prototype.toString.call(f))
}

export const hasNativeWebVRImplementation = typeof navigator !== 'undefined' && 
    isNativeFunction(navigator.getVRDisplays) && 
    !Object.getOwnPropertyDescriptor(navigator, "getVRDisplays");

export const suggestedWebGLContextAntialiasAttribute = hasNativeWebVRImplementation;

export function stringIdentifierFromReferenceFrame(referenceFrame: string | ReferenceFrame | Entity): string {
    const rf = referenceFrame as Entity;
    return defined(rf.id) ? rf.id : '' + rf;
}


export function jsonEquals(left?:{}, right?:{}) {
    return JSON.stringify(left) === JSON.stringify(right);
}

/**
 * Computes a 4x4 transformation matrix from a reference frame with an east-up-south axes centered at the provided origin to the provided ellipsoid's fixed reference frame. The local axes are defined as:
 * The x axis points in the local east direction.
 * The y axis points in the points in the direction of the ellipsoid surface normal which passes through the position..
 * The z axis points in the local south direction.
 */
export const eastUpSouthToFixedFrame = Transforms.localFrameToFixedFrameGenerator('east','up');

/**
 * Get array of ancestor reference frames of a Cesium Entity, ordered from 
 * farthest ancestor to the passed frame, excluding the passed frame.
 * @param frame A Cesium Entity to get ancestor reference frames.
 * @param frames An array of reference frames of the Cesium Entity.
 */
export function getAncestorReferenceFrames(frame: Entity, result=[]) {
    const frames: Array<Entity | ReferenceFrame> = result;
    frames.length = 0;
    let f: Entity | ReferenceFrame | undefined = frame;
    do {
        let position: PositionProperty | undefined = (f as Entity).position;
        f = position && position.referenceFrame;
        if (defined(f)) frames.unshift(f);
    } while (defined(f)) 
    return frames
}


var scratchAncestorCartesian = new Cartesian3;
var scratchAncestorQuaternion = new Quaternion;
/**
 * Get array of ancestor reference frames of a Cesium Entity, ordered from 
 * farthest ancestor which has a valid pose to the passed frame, excluding the passed frame.
 * @param frame A Cesium Entity to get ancestor reference frames.
 * @param frames An array of reference frames of the Cesium Entity.
 */
export function getReachableAncestorReferenceFrames(frame: Entity, time:JulianDate, result=[]) {
    const frames: Array<Entity | ReferenceFrame> = result;
    frames.length = 0;
    let f: Entity | ReferenceFrame | undefined = frame;
    let isValid = false;
    do {
        const position: PositionProperty | undefined = (f as Entity).position;
        const orientation = f && (f as Entity).orientation;

        f = position && position.referenceFrame;
        const hasParentFrame = defined(f);

        const pValue = hasParentFrame && position && position.getValueInReferenceFrame(time, f!, scratchAncestorCartesian);
        const oValue = hasParentFrame && pValue && orientation && orientation.getValue(time, scratchAncestorQuaternion);
        isValid = pValue && oValue;
        if (isValid) frames.unshift(f!);
    } while (isValid) 
    return frames
}

/**
 * Gets the value of the Position property at the provided time and in the provided reference frame.
 * @param entity The entity to get position. 
 * @param time The time for which to retrieve the value.
 * @param referenceFrame The desired referenceFrame of the result.
 * @param result The object to store the value into.
 * @return The modified result parameter.
 */
export function getEntityPositionInReferenceFrame(
    entity: Entity,
    time: JulianDate,
    referenceFrame: Entity | ReferenceFrame,
    result: Cartesian3): Cartesian3 | undefined {
    return entity.position && entity.position.getValueInReferenceFrame(time, referenceFrame, result)
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
export function getEntityOrientationInReferenceFrame(
    entity: Entity,
    time: JulianDate,
    referenceFrame: ReferenceFrame | Entity,
    result: Quaternion): Quaternion | undefined {
    const entityFrame = entity.position && entity.position.referenceFrame
    if (!defined(entityFrame)) return undefined
    let orientation: Quaternion = entity.orientation && entity.orientation.getValue(time, result)
    if (!defined(orientation)) return undefined;
    return OrientationProperty.convertToReferenceFrame(time, orientation, entityFrame, referenceFrame, result)
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

const _scratchFramesArray = [];
const _entityStateCache:{[key:string]:SerializedEntityState} = {};

/**
 * Create a SerializedEntityPose from a source entity. 
 * @param entity The entity which the serialized pose represents. 
 * @param time The time which to retrieve the pose.
 * @param referenceFrame The reference frame to use for generating the pose. 
 * If a target reference frame is not provided, the entity pose will be 
 * serialized according to the furthest ancestor frame that resolves to a valid pose.
 * @return An EntityPose object with orientation, position and referenceFrame.
 */
export function getSerializedEntityState(entity: Entity, time: JulianDate, frame?: ReferenceFrame | Entity): SerializedEntityState | null {
    let frames:(ReferenceFrame|Entity|undefined)[]|undefined = undefined;
    
    if (!defined(frame)) {
        frames = getReachableAncestorReferenceFrames(entity, time, _scratchFramesArray);
        frame = frames[0];
    }

    if (!defined(frame)) return null;
    if (entity === frame) return null;

    const key = entity.id + '@' + ((frame as Entity).id ? (frame as Entity).id : frame);
    let result = _entityStateCache[key];
    if (!result) result = <SerializedEntityState> {}, _entityStateCache[key] = result;

    const p = getEntityPositionInReferenceFrame(entity, time, frame, result.p || {} as Cartesian3);
    if (!p) return null;
    const o = getEntityOrientationInReferenceFrame(entity, time, frame, result.o || {} as Quaternion);
    if (!o) return null;

    if (p && o) {
        result.p = p;
        result.o = o;
        result.r = typeof frame === 'number' ? frame : frame.id,
        result.meta = entity['meta'];
        return result;
    }
    
    return null;
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
    urlParser.href = '';
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
    urlParser.href = ''
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

export function resolveElement(elementOrSelector:string|HTMLElement) {
    if (elementOrSelector instanceof HTMLElement) {
        return Promise.resolve(elementOrSelector);
    } else {
        return new Promise((resolve, reject)=>{
            const resolveElement = () => {
                let e = <HTMLDivElement>document.querySelector(`${elementOrSelector}`);
                if (!e) reject(new Error(`Unable to resolve element id ${elementOrSelector}`))
                else resolve(e);
            }
            if (document.readyState == 'loading') {
                document.addEventListener('DOMContentLoaded', resolveElement);
            } else {
                resolveElement();
            }
        })
    }
}

export function decomposePerspectiveOffCenterProjectionMatrix(mat: Matrix4, result: PerspectiveOffCenterFrustum) {
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

export function decomposePerspectiveProjectionMatrix(mat: Matrix4, result: PerspectiveFrustum) {
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
    } else {
        fov = Math.atan(Math.tan(fovy * 0.5) * aspectRatio) * 2.0
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
export function convertEntityReferenceFrame(entity:Entity, time:JulianDate, frame:ReferenceFrame|Entity) {
    if (!entity.position || !(entity.position instanceof ConstantPositionProperty) ||
        !entity.orientation || !(entity.orientation instanceof ConstantProperty)) {
            return false;
    }
    if (!getEntityPositionInReferenceFrame(
        entity,
        time,
        frame,
        scratchCartesian)) {
            return false;
    }
    if (!getEntityOrientationInReferenceFrame(
        entity,
        time,
        frame,
        scratchOrientation)) {
            return false;        
    }
    entity.position.setValue(scratchCartesian, frame);
    entity.orientation.setValue(scratchOrientation);
    return true;
}

export const isIOS = typeof navigator !== 'undefined' &&  typeof window !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];

export const isAndroid = typeof navigator !== 'undefined' &&  typeof window !== 'undefined' &&
    /Android/.test(navigator.userAgent) && !window['MSStream'];

export function installArgonApp() {
    if (isIOS) {
        window.location.href = "https://itunes.apple.com/us/app/argon4/id1089308600?mt=8";
    } else if (isAndroid) {
        window.location.href = "http://play.google.com/store/apps/details?id=edu.gatech.argon4"
    }
}

export function openInArgonApp() {
    if (isIOS) {
        window.location.href = `argon4://open?url=${encodeURIComponent(window.location.href)}`;
    } else if (isAndroid) {
        window.location.href = `intent:/#Intent;scheme=argon4;package=edu.gatech.argon4;S.url=${encodeURIComponent(window.location.href)};end`;
    }
}


// requestAnimationFrame / cancelAnimationFrame polyfills

var lastTime = 0; 

const rAF = 
    (typeof window !== 'undefined' && window.requestAnimationFrame) ?
    window.requestAnimationFrame.bind(window) : (callback) => {
    var currTime = performance.now();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = <number><any>setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
    lastTime = currTime + timeToCall;
    return id;
}

const cAF = 
    (typeof window !== 'undefined') ? 
    window.cancelAnimationFrame.bind(window) : clearTimeout;

export {
    rAF as requestAnimationFrame,
    cAF as cancelAnimationFrame
};



export function deprecated(alternative?: string) : MethodDecorator {
    let didPrintWarning = false;

    const decorator = (target, name:string, descriptor:PropertyDescriptor) => {
        const original = descriptor.get || descriptor.value;
        const originalType = typeof descriptor.value === 'function' ? 'function' : 'property';

        let message = `The "${name}" ${originalType} is deprecated. `;

        if (alternative) {
            const alternativeType = typeof target[alternative] === 'function' ? 'function' : 'property'
            message += `Please use the "${alternative}" ${alternativeType} instead.`
        }
        
        const wrapped = function() {
            if (!didPrintWarning) {
                console.warn(message);
                didPrintWarning = true;
            }
            return original!.apply(this, arguments);
        };

        if (descriptor.value) descriptor.value = wrapped
        else descriptor.get = wrapped;

        return descriptor;
    };

    return decorator;
}

export const defaultTerrainProvider = new MapzenTerrariumTerrainProvider({
    url : 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/',
    requestWaterMask : true,
    requestVertexNormals : true
});


export function updateHeightFromTerrain(cartographic : Cartographic) : Promise<Cartographic> {
    return Promise.resolve(sampleTerrain(defaultTerrainProvider, 15, [cartographic]).then<Cartographic>(_valueAtFirstIndex));
}

function _valueAtFirstIndex(array:Cartographic[]) {
    return array[0];
}
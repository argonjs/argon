import { Matrix4, JulianDate, Cartesian3, Cartographic, Quaternion, CesiumMath } from './cesium/cesium-imports'

/**
 * Default distance from a user's eyes to the floor
 */
export const AVERAGE_EYE_HEIGHT = 1.6;

/**
 * Default near plane
 */
export const DEFAULT_NEAR_PLANE = 0.01;

/**
 * Default far plane
 */
export const DEFAULT_FAR_PLANE = 10000;

/**
 * Describes the role of an [[ArgonSystem]]
 */
export enum Role {

    /**
     * A system with this role is responsible for augmenting an arbitrary view of reality,
     * generally by overlaying computer generated graphics. A reality augmentor may also, 
     * if appropriate, be elevated to the role of a [[REALITY_MANAGER]]. 
     */
    REALITY_AUGMENTER = "RealityAugmenter" as any,

    /**
     * A system with this role is responsible for (at minimum) describing (and providing, 
     * if necessary) a visual representation of the world and the 3D eye pose of the viewer.
     */
    REALITY_VIEWER = "RealityViewer" as any,

    /**
     * A system with this role is responsible for mediating access to sensors/trackers 
     * and pose data for known entities in the world, selecting/configuring/loading 
     * [[REALITY_VIEWER]]s, and providing the mechanism by which any given [[REALITY_AUGMENTER]]
     * can augment any given [[REALITY_VIEWER]]. 
     */
    REALITY_MANAGER = "RealityManager" as any,

    /**
     * Deprecated. Use [[REALITY_AUGMENTER]]. 
     * @private
     */
    APPLICATION = "Application" as any,

    /**
     * Deprecated. Use [[REALITY_MANAGER]]. 
     * @private
     */
    MANAGER = "Manager" as any,

    /**
     * Deprecated. Use [[REALITY_VIEWER]]
     * @private
     */
    REALITY_VIEW = "RealityView" as any,
}

export namespace Role {
    export function isRealityViewer(r?:Role) {
        return r === Role.REALITY_VIEWER || r === Role.REALITY_VIEW;
    }
    export function isRealityAugmenter(r?:Role) {
        return r === Role.REALITY_AUGMENTER || r === Role.APPLICATION;
    }
    export function isRealityManager(r?:Role) {
        return r === Role.REALITY_MANAGER || r === Role.MANAGER;
    }
}

/**
 * Configuration options for an [[ArgonSystem]] 
 */
export abstract class Configuration {
    version?: number[];
    uri?: string;
    title?: string;
    role?: Role;
    protocols?: string[];
    userData?: any;
    // other options / hints
    defaultUI?: {
        disable?: boolean
    };
    'supportsCustomProtocols'?: boolean;
}

export class Viewport {
    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;

    static clone(viewport?:Viewport, result:Viewport=new Viewport) {
        if (!viewport) return undefined;
        result.x = viewport.x;
        result.y = viewport.y;
        result.width = viewport.width;
        result.height = viewport.height;
        return result;
    }

    static equals(viewportA?:Viewport, viewportB?:Viewport) {
        return viewportA && viewportB && 
        CesiumMath.equalsEpsilon(viewportA.x, viewportB.x, CesiumMath.EPSILON7) &&
        CesiumMath.equalsEpsilon(viewportA.y, viewportB.y, CesiumMath.EPSILON7) &&
        CesiumMath.equalsEpsilon(viewportA.width, viewportB.width, CesiumMath.EPSILON7) &&
        CesiumMath.equalsEpsilon(viewportA.height, viewportB.height, CesiumMath.EPSILON7);
    }
}

/**
 * Viewport values are expressed using a right-handed coordinate system with the origin
 * at the bottom left corner.
 */
export class CanvasViewport extends Viewport {
    pixelRatio: number = 1;
    renderWidthScaleFactor: number = 1;
    renderHeightScaleFactor: number = 1;

    static clone(viewport?:CanvasViewport, result:CanvasViewport=<any>new CanvasViewport) {
        if (!viewport) return undefined;
        Viewport.clone(viewport, result);
        result.renderWidthScaleFactor = viewport.renderWidthScaleFactor;
        result.renderHeightScaleFactor = viewport.renderHeightScaleFactor;
        return result;
    }

    static equals(viewportA?:CanvasViewport, viewportB?:CanvasViewport) {
        return viewportA && viewportB && Viewport.equals(viewportA, viewportB) &&
        CesiumMath.equalsEpsilon(viewportA.renderWidthScaleFactor, viewportB.renderWidthScaleFactor, CesiumMath.EPSILON7) &&
        CesiumMath.equalsEpsilon(viewportA.renderHeightScaleFactor, viewportB.renderHeightScaleFactor, CesiumMath.EPSILON7);
    }
}

/**
 * Identifies a subview in a [[SerializedSubview]]
 */
export enum SubviewType {
    /*
     * Identities a subview for a handheld display.
     */
    SINGULAR = "Singular" as any,

    /*
     * Identifies a subview for the left eye (when the user is wearing an HMD or Viewer)
     */
    LEFTEYE = "LeftEye" as any,

    /*
     * Identifies a subview for the right eye (when the user is wearing an HMD or Viewer)
     */
    RIGHTEYE = "RightEye" as any,

    /*
     * Identifies a subview for a custom view configuration
     */
    OTHER = "Other" as any,
}

/**
 * A serialized notation for the position, orientation, and referenceFrame of an entity.
 */
export interface SerializedEntityState {
    p: Cartesian3, // position
    o: Quaternion, // orientation
    r: number | string, // reference frame
    meta?: any // meta data
}

export namespace SerializedEntityState {
    export function clone(state?:SerializedEntityState, result?:SerializedEntityState|null) {
        if (!state) return null;
        result = result || <SerializedEntityState><any>{};
        result.p = Cartesian3.clone(state.p, result.p);
        result.o = Quaternion.clone(state.o, result.o);
        result.r = state.r;
        result.meta = state.meta;
        return result;
    }
}

/**
 * A map of entity ids and their associated poses.
 */
export interface SerializedEntityStateMap {
    [id: string]: SerializedEntityState | null
}

/**
 * The serialized rendering parameters for a particular subview
 */
export interface SerializedSubview {
    type: SubviewType,
    /**
     * The projection matrix for this subview
     */
    projectionMatrix: Matrix4,
    /**
     * The viewport for this subview (relative to the primary viewport)
     */
    viewport: Viewport
    /**
     * The pose for this subview (relative to the primary pose)
     */
    // pose: SerializedEntityState|null|undefined, // if undefined, identity is assumed
}


/**
 * The serialized rendering parameters for a particular subview
 */
export interface ReadonlySerializedSubview {
    readonly type: SubviewType,
    /**
     * The projection matrix for this subview
     */
    readonly projectionMatrix: Readonly<Matrix4>,
    /**
     * The viewport for this subview (relative to the primary viewport)
     */
    readonly viewport: Readonly<CanvasViewport>
    // /**
    //  * The pose for this subview (relative to the primary pose)
    //  */
    // readonly pose?: Readonly<SerializedEntityState>, // if undefined, identity is assumed
}

export namespace SerializedSubview {
    export function clone(subview:SerializedSubview, result?:SerializedSubview) {
        result = result || <SerializedSubview>{};
        result.type = subview.type;
        result.projectionMatrix = Matrix4.clone(subview.projectionMatrix, result.projectionMatrix);
        result.viewport = Viewport.clone(subview.viewport, result.viewport)!;
        // result.pose = subview.pose ? SerializedEntityState.clone(subview.pose, result.pose) : undefined;
        return result;
    }
    export function equals(left?:SerializedSubview, right?:SerializedSubview) {
        return left && right && 
            left.type === right.type &&
            Viewport.equals(left.viewport, right.viewport) && 
            Matrix4.equals(left.projectionMatrix, right.projectionMatrix);
    }
}

export interface SerializedDeviceState {
    currentFov: number;
    eyeCartographicPosition: Cartographic|undefined;
    eyeHorizontalAccuracy: number|undefined;
    eyeVerticalAccuracy: number|undefined;
    viewport: CanvasViewport;
    subviews: SerializedSubview[];
    strictSubviews: boolean;
    isPresentingHMD: boolean;
}

// export interface PhysicalViewState {
//     time: JulianDate,
//     stagePose: SerializedEntityPose|undefined,
//     stageHorizontalAccuracy: number|undefined,
//     stageVerticalAccuracy: number|undefined,
//     eyePose: SerializedEntityPose|undefined,
//     eyeCompassAccuracy: number|undefined,
//     subviews: SerializedSubviewList,
//     strict:boolean;
// }

// export interface ViewState {
//     /**
//      * The viewing pose.
//      */
//     pose: SerializedEntityState|undefined,

//     /**
//      * The viewport to render into. In a DOM environment, 
//      * the bottom left corner of the document element (document.documentElement) 
//      * is the origin. 
//      */
//     viewport: Viewport,

//     /**
//      * The list of subviews to render.
//      */
//     subviews:SerializedSubviewList,

//     /**
//      * The current field of view (of each subview)
//      */
//     fovs: number[]
// }

export class SerializedSubviewList extends Array<SerializedSubview> {
    constructor() {
        super();
    }
    static clone(subviews?:SerializedSubviewList, result?:SerializedSubviewList) {
        if (!subviews) return undefined;
        result = result || new SerializedSubviewList;
        result.length = subviews.length;
        for (let i=0; i < subviews.length; i++) {
            const s = subviews[i];
            result![i] = SerializedSubview.clone(s, result![i]);
        }
        return result;
    }
}


// export namespace ViewState {
//     export function clone(viewState:ViewState, result?:ViewState) {
//         result = result || <ViewState>{};
//         result.time = JulianDate.clone(viewState.time, result.time);
//         result.stagePose = viewState.stagePose ? SerializedEntityState.clone(viewState.stagePose, result.stagePose) : undefined;
//         result.pose = viewState.pose ? SerializedEntityState.clone(viewState.pose, result.pose) : undefined;
//         result.viewport = Viewport.clone(viewState.viewport, result.viewport);
//         result.subviews = result.subviews || [];
//         result.fovs = result.fovs || [];
//         viewState.subviews.forEach((s, i)=>{
//             result!.subviews[i] = SerializedSubview.clone(s, result!.subviews[i]);
//         });
//         viewState.fovs.forEach((f, i)=>{
//             result!.fovs[i] = f
//         });
//         return result;
//     }
// }

/**
 * Describes the pose of a reality view and how it is able to render
 */
export interface DeprecatedEyeParameters {
    viewport?: CanvasViewport; // default: maximum
    pose?: SerializedEntityState;
    stereoMultiplier?: number; // default: 1
    fov?: number; // default: defer to manager
    aspect?: number; // default: matches viewport 
}

/**
 * Deprecated. See [[ViewSpec]]
 * Describes the partial frame state reported by reality viewers before v1.1
 * @deprecated
 */
export interface DeprecatedPartialFrameState {
    index: number,
    time: { dayNumber: number, secondsOfDay: number }, // JulianDate,
    view?: any,
    eye?: DeprecatedEyeParameters,
    entities?: SerializedEntityStateMap
}

/**
 * Describes a complete frame state which is sent to child sessions
 */
export interface ContextFrameState {
    time: JulianDate,
    viewport: CanvasViewport,
    subviews: SerializedSubviewList,
    reality?: string,
    index?: number,
    entities: SerializedEntityStateMap,
    sendTime?: JulianDate, // the time this state was sent
}

export interface GeolocationOptions {
    enableHighAccuracy?: boolean;
}
import { Matrix4, JulianDate, Cartesian3, Cartographic, Quaternion, CesiumMath } from './cesium/cesium-imports'

/**
 * Describes the role of an [[ArgonSystem]]
 */
enum Role {

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

namespace Role {
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

export { Role }

/**
 * Configuration options for an [[ArgonSystem]] 
 */
export interface Configuration {
    version?: number,
    uri?: string,
    title?: string,
    role?: Role;
    protocols?: string[];
    userData?: any;
    // other options / hints
    defaultUI?: {
        disable?: boolean
    };
    'needsGeopose'?: boolean;
    'supportsCustomProtocols'?: boolean;
}

/**
 * Viewport values are expressed using a right-handed coordinate system with the origin
 * at the bottom left corner.
 */
export interface Viewport {
    x: number,
    y: number,
    width: number,
    height: number
}

export namespace Viewport {
    export function clone(viewport?:Viewport, result:Viewport=<any>{}) {
        if (!viewport) return undefined;
        result.x = viewport.x;
        result.y = viewport.y;
        result.width = viewport.width;
        result.height = viewport.height;
        return result;
    }

    export function equals(viewportA?:Viewport, viewportB?:Viewport) {
        return viewportA && viewportB && 
        CesiumMath.equalsEpsilon(viewportA.x, viewportB.x, CesiumMath.EPSILON7) &&
        CesiumMath.equalsEpsilon(viewportA.y, viewportB.y, CesiumMath.EPSILON7) &&
        CesiumMath.equalsEpsilon(viewportA.width, viewportB.width, CesiumMath.EPSILON7) &&
        CesiumMath.equalsEpsilon(viewportA.height, viewportB.height, CesiumMath.EPSILON7);
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
export interface SerializedEntityPose {
    p: Cartesian3, // position
    o: Quaternion, // orientation
    r: number | string, // reference frame
}

/**
 * A map of entity ids and their associated poses.
 */
export interface SerializedEntityPoseMap {
    [id: string]: SerializedEntityPose | undefined
}

export interface SerializedFrustum {
    xOffset?: number,
    yOffset?: number,
    fov: number,
    aspectRatio?: number
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
    pose?: SerializedEntityPose, // if undefined, identity is assumed
}

/**
 * The device state informs a [[REALITY_VIEWER]] about the current physical
 * configuration of the system, so that it may present a view that is compatible. 
 * The [[REALITY_VIEWER]] should consider the viewport and frustum values to be 
 * suggestions, unless their respective `strict` properties are true. The various 
 * poses and related accuracies represent the physical configuration of the system
 * at the (current) specified time. The [[REALITY_VIEWER]] may reuse the `time` 
 * and `pose` when presenting a view, though this is not mandatory 
 * (or necessarily expected).
 */
export interface DeviceState {
    cartographicPosition?: Cartographic;
    geolocationAccuracy: number|undefined;
    altitudeAccuracy: number|undefined;
    viewport: Viewport;
    subviews: SerializedSubview[];
    strict?: boolean;
}

/**
 * The view state is provided by a [[REALITY_VIEWER]], and describes how a 
 * [[REALITY_AUGMENTER]] should render the current frame.
 */
export interface ViewState {
    /**
     * The absolute time when this view state was created
     */
    time: JulianDate,

    /**
     * The viewing pose. May or may not match the 
     * real-world (physical) viewing pose.
     */
    pose: SerializedEntityPose|undefined,

    /** 
     * The radius (in meters) of latitudinal and longitudinal uncertainty,
     * in relation to the FIXED reference frame. Value is greater 
     * than 0 or undefined. 
     */
    geolocationAccuracy: number|undefined,

    /**
     * The accuracy of the altitude in meters. Value is greater 
     * than 0 or undefined. 
     */
    altitudeAccuracy: number|undefined,

    /**
     * The accuracy of the compass in degrees. Value is greater 
     * than 0 or undefined. 
     */
    compassAccuracy: number|undefined,

    /**
     * The source reality viewer. 
     */
    reality?: string,

    /**
     * The primary viewport to render into. In a DOM environment, 
     * the bottom left corner of the document element (document.documentElement) 
     * should be considered the origin. 
     */
    viewport: Viewport,

    /**
     * The list of subviews to render.
     */
    subviews: SerializedSubview[]
}

/**
 * Describes the pose of a reality view and how it is able to render
 */
export interface DeprecatedEyeParameters {
    viewport?: Viewport; // default: maximum
    pose?: SerializedEntityPose;
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
    view?: ViewState,
    eye?: DeprecatedEyeParameters,
    entities?: SerializedEntityPoseMap
}

/**
 * Describes a complete frame state which is sent to child sessions
 */
export interface FrameState {
    view: ViewState,
    index?: number,
    entities?: SerializedEntityPoseMap,
    sendTime?: { dayNumber: number, secondsOfDay: number }, // the time this state was sent
}
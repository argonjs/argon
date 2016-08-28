import { Matrix4 } from './cesium/cesium-imports'

/**
 * Configuration options for an [[ArgonSystem]] 
 */
export interface Configuration {
    role?: Role;
    protocols?: string[];
    userData?: any;
    // other options / manager hints
    'app.disablePinchZoom'?: boolean;
    'reality.supportsControlPort'?: boolean;
    'reality.handlesZoom'?: boolean;
    'reality.providedReferenceFrames'?: (number | string)[];
}

/**
 * Describes the role of an [[ArgonSystem]]
 */
export enum Role {

    /**
     * A system with this role is responsible for augmenting an arbitrary view of reality,
     * generally by overlaying computer generated graphics. A reality augmentor may also, 
     * if appropriate, be elevated to the role of a [[REALITY_MANAGER]]. 
     */
    REALITY_AUGMENTOR = "RealityAugmentor" as any,

    /**
     * A system with this role is responsible for (at minimum) describing (and providing, 
     * if necessary) a visual representation of the world and the 3D eye pose of the viewer.
     */
    REALITY_VIEW = "RealityView" as any,

    /**
     * A system with this role is responsible for mediating access to sensors/trackers 
     * and pose data for known entities in the world, selecting/configuring/loading 
     * [[REALITY_VIEW]]s, and providing the mechanism by which any given [[REALITY_AUGMENTOR]]
     * can augment any given [[REALITY_VIEW]]. The reality manager may also, when appropriate, 
     * take on the role of [[REALITY_AUGMENTOR]].
     */
    REALITY_MANAGER = "RealityManager" as any,

    /**
     * Deprecated. Use [[REALITY_AUGMENTOR]]. 
     * @private
     */
    APPLICATION = "Application" as any,

    /**
     * Deprecated. Use [[REALITY_MANAGER]]. 
     * @private
     */
    MANAGER = "Manager" as any
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
    p: { x: number, y: number, z: number } | number, // position, if 0, means Cartesian3.ZERO
    o: { x: number, y: number, z: number, w: number } | number, // orientation, if 0, means Quaternion.IDENTITY
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
     * @deprecated
     */
    projectionMatrix?: ArrayLike<number> | Matrix4,
    /**
     * The viewing frustum for this subview
     */
    frustum: SerializedFrustum,
    pose?: SerializedEntityPose, // if undefined, the primary pose should be assumed
    viewport?: Viewport // if undefined, the primary viewport should be assumed
}

/**
 * The serialized view parameters describe how the application should render each frame
 */
export interface SerializedViewParameters {
    /**
     * The primary viewport to render into. In a DOM environment, the bottom left corner of the document element 
     * (document.documentElement) should be considered the origin. 
     */
    viewport: Viewport,

    /**
     * The primary pose for this view. 
     */
    pose?: SerializedEntityPose

    /**
     * The list of subviews to render.
     */
    subviews: SerializedSubview[]
}

/**
 * Describes the pose of a reality view and how it is able to render
 */
export interface SerializedEyeParameters {
    viewport?: Viewport; // default: maximum
    pose?: SerializedEntityPose;
    stereoMultiplier?: number; // default: 1
    fov?: number; // default: defer to manager
    aspect?: number; // default: matches viewport 
}

/**
 * Describes the serialized frame state.
 */
export interface SerializedPartialFrameState {
    index: number,
    time: { dayNumber: number, secondsOfDay: number }, // JulianDate,
    view?: SerializedViewParameters,
    eye?: SerializedEyeParameters,
    entities?: SerializedEntityPoseMap
}

/**
 * Describes a complete frame state which is sent to child sessions
 */
export interface SerializedFrameState extends SerializedPartialFrameState {
    reality: RealityView,
    entities: SerializedEntityPoseMap,
    eye?: undefined,
    view: SerializedViewParameters,
    sendTime?: { dayNumber: number, secondsOfDay: number }, // the time this state was sent
}


/**
* Represents a view of Reality
*/
export class RealityView {
    static EMPTY: RealityView = {
        uri: 'reality:empty',
        title: 'Reality',
        providedReferenceFrames: ['FIXED']
    }

    public uri: string;
    public title?: string;
    public providedReferenceFrames?: Array<string>;

    static getType(reality: RealityView) {
        const uri = reality.uri;
        const parts = uri.split(':');
        if (parts[0] === 'reality') {
            return parts[1];
        }
        return 'hosted';
    }
}
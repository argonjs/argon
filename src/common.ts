import {Matrix4} from './cesium/cesium-imports'

/**
 * Describes the session configuration
 */
export interface Configuration {
    name?: string;
    role?: Role;
    userData?: any;
    // app options
    appProvidesCustomView?: boolean;
    // reality view options
    realityViewSupportsControlPort?: boolean;
    realityViewSupportsCustomViewport?: boolean;
    realityViewSupportsCustomSubviews?: boolean;
    realityViewReferenceFrames?: (number | string)[];
    // manager options
    managerPublicKey?: string | Promise<string>;
    managerPrivateKey?: string | Promise<string>;
}

/*
 * Describes the role of a session
 */
export enum Role {

    /*
     * An application can augment a reality view.
     */
    APPLICATION = "Application" as any,

    /*
     * A reality view is a representation of reality.
     */
    REALITY_VIEW = "RealityView" as any,

    /*
     * The manager mediates access to sensors / trackers 
     * and keeps track of known entities in the world.
     */
    MANAGER = "Manager" as any
}

/**
* Represents a view of Reality
*/
export interface RealityView {
    type: string;
    name: string;
    [option: string]: any
}

/**
 * Viewport is expressed using a right-handed coordinate system with the origin
 * at the bottom left corner.
 */
export interface Viewport {
    x: number,
    y: number,
    width: number,
    height: number
}

/**
 * Identifies a subview in a view configuration
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
    p?: { x: number, y: number, z: number } | number, // position, if 0, means Cartesian3.ZERO
    o?: { x: number, y: number, z: number, w: number } | number, // orientation, if 0, means Quaternion.IDENTITY
    r: number | string, // reference frame
}

/**
 * A map of entity ids and their associated poses.
 */
export interface SerializedEntityPoseMap {
    [id: string]: SerializedEntityPose
}

/**
 * The serialized rendering parameters for a particular subview
 */
export interface SerializedSubview {
    type: SubviewType,
    projectionMatrix: ArrayLike<number> | Matrix4,
    // TODO: use viewVolume instead of projectionMatrix as described here // http://www.codeproject.com/Articles/42848/A-New-Perspective-on-Viewing
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
    pose: SerializedEntityPose

    /**
     * The list of subviews to render.
     */
    subviews: SerializedSubview[]
}

/**
 * Describes the serialized frame state.
 */
export interface SerializedFrameState {
    index: number,
    time: { dayNumber: number, secondsOfDay: number }, // JulianDate
    view: SerializedViewParameters,
    entities?: SerializedEntityPoseMap
}

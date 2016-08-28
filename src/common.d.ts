/// <reference types="cesium" />
import { Matrix4 } from './cesium/cesium-imports';
/**
 * Configuration options for an [[ArgonSystem]]
 */
export interface Configuration {
    role?: Role;
    protocols?: string[];
    userData?: any;
    'app.disablePinchZoom'?: boolean;
    'reality.supportsControlPort'?: boolean;
    'reality.handlesZoom'?: boolean;
    'reality.providedReferenceFrames'?: (number | string)[];
}
/**
 * Describes the role of an [[ArgonSystem]]
 */
export declare enum Role {
    /**
     * A system with this role is responsible for augmenting an arbitrary view of reality,
     * generally by overlaying computer generated graphics. A reality augmentor may also,
     * if appropriate, be elevated to the role of a [[REALITY_MANAGER]].
     */
    REALITY_AUGMENTOR,
    /**
     * A system with this role is responsible for (at minimum) describing (and providing,
     * if necessary) a visual representation of the world and the 3D eye pose of the viewer.
     */
    REALITY_VIEW,
    /**
     * A system with this role is responsible for mediating access to sensors/trackers
     * and pose data for known entities in the world, selecting/configuring/loading
     * [[REALITY_VIEW]]s, and providing the mechanism by which any given [[REALITY_AUGMENTOR]]
     * can augment any given [[REALITY_VIEW]]. The reality manager may also, when appropriate,
     * take on the role of [[REALITY_AUGMENTOR]].
     */
    REALITY_MANAGER,
    /**
     * Deprecated. Use [[REALITY_AUGMENTOR]].
     * @private
     */
    APPLICATION,
    /**
     * Deprecated. Use [[REALITY_MANAGER]].
     * @private
     */
    MANAGER,
}
/**
 * Viewport values are expressed using a right-handed coordinate system with the origin
 * at the bottom left corner.
 */
export interface Viewport {
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 * Identifies a subview in a [[SerializedSubview]]
 */
export declare enum SubviewType {
    SINGULAR,
    LEFTEYE,
    RIGHTEYE,
    OTHER,
}
/**
 * A serialized notation for the position, orientation, and referenceFrame of an entity.
 */
export interface SerializedEntityPose {
    p: {
        x: number;
        y: number;
        z: number;
    } | number;
    o: {
        x: number;
        y: number;
        z: number;
        w: number;
    } | number;
    r: number | string;
}
/**
 * A map of entity ids and their associated poses.
 */
export interface SerializedEntityPoseMap {
    [id: string]: SerializedEntityPose | undefined;
}
export interface SerializedFrustum {
    xOffset?: number;
    yOffset?: number;
    fov: number;
    aspectRatio?: number;
}
/**
 * The serialized rendering parameters for a particular subview
 */
export interface SerializedSubview {
    type: SubviewType;
    /**
     * @deprecated
     */
    projectionMatrix?: ArrayLike<number> | Matrix4;
    /**
     * The viewing frustum for this subview
     */
    frustum: SerializedFrustum;
    pose?: SerializedEntityPose;
    viewport?: Viewport;
}
/**
 * The serialized view parameters describe how the application should render each frame
 */
export interface SerializedViewParameters {
    /**
     * The primary viewport to render into. In a DOM environment, the bottom left corner of the document element
     * (document.documentElement) should be considered the origin.
     */
    viewport: Viewport;
    /**
     * The primary pose for this view.
     */
    pose?: SerializedEntityPose;
    /**
     * The list of subviews to render.
     */
    subviews: SerializedSubview[];
}
/**
 * Describes the pose of a reality view and how it is able to render
 */
export interface SerializedEyeParameters {
    viewport?: Viewport;
    pose?: SerializedEntityPose;
    stereoMultiplier?: number;
    fov?: number;
    aspect?: number;
}
/**
 * Describes the serialized frame state.
 */
export interface SerializedPartialFrameState {
    index: number;
    time: {
        dayNumber: number;
        secondsOfDay: number;
    };
    view?: SerializedViewParameters;
    eye?: SerializedEyeParameters;
    entities?: SerializedEntityPoseMap;
}
/**
 * Describes a complete frame state which is sent to child sessions
 */
export interface SerializedFrameState extends SerializedPartialFrameState {
    reality: RealityView;
    entities: SerializedEntityPoseMap;
    eye?: undefined;
    view: SerializedViewParameters;
    sendTime?: {
        dayNumber: number;
        secondsOfDay: number;
    };
}
/**
* Represents a view of Reality
*/
export declare class RealityView {
    static EMPTY: RealityView;
    uri: string;
    title?: string;
    providedReferenceFrames?: Array<string>;
    static getType(reality: RealityView): string;
}

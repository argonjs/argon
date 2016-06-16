import { Matrix4 } from './cesium/cesium-imports';
/**
 * Describes the session configuration
 */
export interface Configuration {
    name?: string;
    role?: Role;
    userData?: any;
    protocols?: string[];
    'reality.supportsControlPort'?: boolean;
    'reality.supportsCustomViewport'?: boolean;
    'reality.supportsCustomSubviews'?: boolean;
    'reality.providedReferenceFrames'?: (number | string)[];
}
export declare enum Role {
    APPLICATION,
    REALITY_VIEW,
    MANAGER,
}
/**
* Represents a view of Reality
*/
export interface RealityView {
    type: string;
    name: string;
    [option: string]: any;
}
/**
 * Viewport is expressed using a right-handed coordinate system with the origin
 * at the bottom left corner.
 */
export interface Viewport {
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 * Identifies a subview in a view configuration
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
    p?: {
        x: number;
        y: number;
        z: number;
    } | number;
    o?: {
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
    [id: string]: SerializedEntityPose;
}
/**
 * The serialized rendering parameters for a particular subview
 */
export interface SerializedSubview {
    type: SubviewType;
    projectionMatrix: ArrayLike<number> | Matrix4;
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
    pose: SerializedEntityPose;
    /**
     * The list of subviews to render.
     */
    subviews: SerializedSubview[];
}
/**
 * Describes the serialized frame state.
 */
export interface SerializedFrameState {
    index: number;
    time: {
        dayNumber: number;
        secondsOfDay: number;
    };
    view: SerializedViewParameters;
    entities?: SerializedEntityPoseMap;
}

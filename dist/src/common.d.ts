import { Matrix4 } from './cesium/cesium-imports';
/**
 * Describes the session configuration
 */
export interface Configuration {
    name?: string;
    role?: Role;
    userData?: any;
    protocols?: string[];
    'app.disablePinchZoom'?: boolean;
    'reality.supportsControlPort'?: boolean;
    'reality.handlesZoom'?: boolean;
    'reality.providedReferenceFrames'?: (number | string)[];
}
export declare enum Role {
    APPLICATION,
    REALITY_VIEW,
    MANAGER,
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
    reality: {
        type: string;
        name: string;
        [option: string]: any;
    };
    entities: SerializedEntityPoseMap;
    eye?: undefined;
    view: SerializedViewParameters;
    sendTime?: {
        dayNumber: number;
        secondsOfDay: number;
    };
}

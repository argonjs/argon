/// <reference types="cesium" />
import { Matrix4, JulianDate, Cartesian3, Cartographic, Quaternion } from './cesium/cesium-imports';
/**
 * Describes the role of an [[ArgonSystem]]
 */
declare enum Role {
    /**
     * A system with this role is responsible for augmenting an arbitrary view of reality,
     * generally by overlaying computer generated graphics. A reality augmentor may also,
     * if appropriate, be elevated to the role of a [[REALITY_MANAGER]].
     */
    REALITY_AUGMENTER,
    /**
     * A system with this role is responsible for (at minimum) describing (and providing,
     * if necessary) a visual representation of the world and the 3D eye pose of the viewer.
     */
    REALITY_VIEWER,
    /**
     * A system with this role is responsible for mediating access to sensors/trackers
     * and pose data for known entities in the world, selecting/configuring/loading
     * [[REALITY_VIEWER]]s, and providing the mechanism by which any given [[REALITY_AUGMENTER]]
     * can augment any given [[REALITY_VIEWER]].
     */
    REALITY_MANAGER,
    /**
     * Deprecated. Use [[REALITY_AUGMENTER]].
     * @private
     */
    APPLICATION,
    /**
     * Deprecated. Use [[REALITY_MANAGER]].
     * @private
     */
    MANAGER,
    /**
     * Deprecated. Use [[REALITY_VIEWER]]
     * @private
     */
    REALITY_VIEW,
}
declare namespace Role {
    function isRealityViewer(r?: Role): boolean;
    function isRealityAugmenter(r?: Role): boolean;
    function isRealityManager(r?: Role): boolean;
}
export { Role };
/**
 * Configuration options for an [[ArgonSystem]]
 */
export interface Configuration {
    version?: number;
    uri?: string;
    title?: string;
    role?: Role;
    protocols?: string[];
    userData?: any;
    defaultUI?: {
        disable?: boolean;
    };
    'needsGeopose'?: boolean;
    'supportsCustomProtocols'?: boolean;
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
export declare namespace Viewport {
    function clone(viewport?: Viewport, result?: Viewport): Viewport | undefined;
    function equals(viewportA?: Viewport, viewportB?: Viewport): boolean | undefined;
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
    p: Cartesian3;
    o: Quaternion;
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
     * The projection matrix for this subview
     */
    projectionMatrix: Matrix4;
    /**
     * The viewport for this subview (relative to the primary viewport)
     */
    viewport: Viewport;
    /**
     * The pose for this subview (relative to the primary pose)
     */
    pose?: SerializedEntityPose;
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
    geolocationAccuracy: number | undefined;
    altitudeAccuracy: number | undefined;
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
    time: JulianDate;
    /**
     * The viewing pose. May or may not match the
     * real-world (physical) viewing pose.
     */
    pose: SerializedEntityPose | undefined;
    /**
     * The radius (in meters) of latitudinal and longitudinal uncertainty,
     * in relation to the FIXED reference frame. Value is greater
     * than 0 or undefined.
     */
    geolocationAccuracy: number | undefined;
    /**
     * The accuracy of the altitude in meters. Value is greater
     * than 0 or undefined.
     */
    altitudeAccuracy: number | undefined;
    /**
     * The accuracy of the compass in degrees. Value is greater
     * than 0 or undefined.
     */
    compassAccuracy: number | undefined;
    /**
     * The source reality viewer.
     */
    reality?: string;
    /**
     * The primary viewport to render into. In a DOM environment,
     * the bottom left corner of the document element (document.documentElement)
     * should be considered the origin.
     */
    viewport: Viewport;
    /**
     * The list of subviews to render.
     */
    subviews: SerializedSubview[];
}
/**
 * Describes the pose of a reality view and how it is able to render
 */
export interface DeprecatedEyeParameters {
    viewport?: Viewport;
    pose?: SerializedEntityPose;
    stereoMultiplier?: number;
    fov?: number;
    aspect?: number;
}
/**
 * Deprecated. See [[ViewSpec]]
 * Describes the partial frame state reported by reality viewers before v1.1
 * @deprecated
 */
export interface DeprecatedPartialFrameState {
    index: number;
    time: {
        dayNumber: number;
        secondsOfDay: number;
    };
    view?: ViewState;
    eye?: DeprecatedEyeParameters;
    entities?: SerializedEntityPoseMap;
}
/**
 * Describes a complete frame state which is sent to child sessions
 */
export interface FrameState {
    view: ViewState;
    index?: number;
    entities?: SerializedEntityPoseMap;
    sendTime?: {
        dayNumber: number;
        secondsOfDay: number;
    };
}

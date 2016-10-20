/// <reference types="cesium" />
import { Matrix4, JulianDate, Cartesian3, Quaternion } from './cesium/cesium-imports';
/**
 * Configuration options for an [[ArgonSystem]]
 */
export interface Configuration {
    role?: Role;
    protocols?: string[];
    userData?: any;
    defaultUI?: {
        disable?: boolean;
    };
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
export declare namespace Role {
    function isRealityViewer(r?: Role): boolean;
    function isRealityAugmenter(r?: Role): boolean;
    function isRealityManager(r?: Role): boolean;
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
export declare namespace SerializedSubview {
    function clone(subview: SerializedSubview, result?: SerializedSubview): SerializedSubview;
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
    /**
     * The (absolute) time for the latest device pose.
     */
    time: JulianDate;
    locationPose?: SerializedEntityPose;
    displayPose?: SerializedEntityPose;
    locationAccuracy: number | undefined;
    locationAltitudeAccuracy: number | undefined;
    viewport: Viewport;
    subviews: SerializedSubview[];
    strictViewport?: boolean;
    strictSubviewViewports?: boolean;
    strictSubviewFrustums?: boolean;
    strictSubviewPoses?: boolean;
}
export declare namespace DeviceState {
    function clone(state: DeviceState, result?: DeviceState): DeviceState;
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
     * The primary pose for the view (the pose of the viewer). This pose does
     * not necessarily reflect the real-world (physical) pose of the viewer,
     * though it may.
     */
    pose: SerializedEntityPose | undefined;
    /**
     * The radius (in meters) of latitudinal and longitudinal uncertainty,
     * in relation to the FIXED reference frame.
     */
    locationAccuracy: number | undefined;
    /**
     * The accuracy of the altitude in meters.
     */
    locationAltitudeAccuracy: number | undefined;
    /**
     * The primary viewport to render into. In a DOM environment, the bottom left corner of the document element
     * (document.documentElement) should be considered the origin.
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
    index: number;
    time: {
        dayNumber: number;
        secondsOfDay: number;
    };
    reality?: RealityViewer;
    entities: SerializedEntityPoseMap;
    view: ViewState;
    sendTime?: {
        dayNumber: number;
        secondsOfDay: number;
    };
}
/**
* Represents a view of Reality
*/
export declare class RealityViewer {
    static EMPTY: RealityViewer;
    uri: string;
    title?: string;
    providedReferenceFrames?: Array<string>;
    static getType(reality?: RealityViewer): string | undefined;
}

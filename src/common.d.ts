/// <reference types="cesium" />
import { Matrix4, JulianDate, Cartesian3, Cartographic, Quaternion } from './cesium/cesium-imports';
export declare const AVERAGE_HUMAN_HEIGHT = 1.77;
export declare const EYE_ENTITY_ID = "ar.eye";
export declare const PHYSICAL_EYE_ENTITY_ID = "ar.physical-eye";
export declare const STAGE_ENTITY_ID = "ar.stage";
export declare const PHYSICAL_STAGE_ENTITY_ID = "ar.physical-stage";
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
export declare abstract class Configuration {
    version?: number[];
    uri?: string;
    title?: string;
    role?: Role;
    protocols?: string[];
    userData?: any;
    defaultUI?: {
        disable?: boolean;
    };
    'supportsCustomProtocols'?: boolean;
}
/**
 * Viewport values are expressed using a right-handed coordinate system with the origin
 * at the bottom left corner.
 */
export declare class Viewport {
    x: number;
    y: number;
    width: number;
    height: number;
    static clone(viewport: Viewport, result?: Viewport): Viewport;
    static equals(viewportA?: Viewport, viewportB?: Viewport): boolean | undefined;
}
export declare class NormalizedViewport {
    x: number;
    y: number;
    width: number;
    height: number;
    static clone(viewport: NormalizedViewport, result?: NormalizedViewport): NormalizedViewport;
    static equals(viewportA?: NormalizedViewport, viewportB?: NormalizedViewport): boolean | undefined;
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
export interface SerializedEntityState {
    p: Cartesian3;
    o: Quaternion;
    r: number | string;
    meta?: any;
}
export declare namespace SerializedEntityState {
    function clone(state?: SerializedEntityState, result?: SerializedEntityState): SerializedEntityState | undefined;
}
/**
 * A map of entity ids and their associated poses.
 */
export interface SerializedEntityStateMap {
    [id: string]: SerializedEntityState | undefined;
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
    viewport: NormalizedViewport;
    /**
     * The pose for this subview (relative to the primary pose)
     */
    pose?: SerializedEntityState;
}
/**
 * The serialized rendering parameters for a particular subview
 */
export interface ReadonlySerializedSubview {
    readonly type: SubviewType;
    /**
     * The projection matrix for this subview
     */
    readonly projectionMatrix: Readonly<Matrix4>;
    /**
     * The viewport for this subview (relative to the primary viewport)
     */
    readonly viewport: Readonly<Viewport>;
    /**
     * The pose for this subview (relative to the primary pose)
     */
    readonly pose?: Readonly<SerializedEntityState>;
}
export declare namespace SerializedSubview {
    function clone(subview: SerializedSubview, result?: SerializedSubview): SerializedSubview;
}
export interface SerializedDeviceState {
    currentFov: number;
    eyeCartographicPosition: Cartographic | undefined;
    eyeHorizontalAccuracy: number | undefined;
    eyeVerticalAccuracy: number | undefined;
    viewport: Viewport;
    subviews: SerializedSubview[];
    strictSubviews: boolean;
    isPresentingHMD: boolean;
}
export declare class SerializedSubviewList extends Array<SerializedSubview> {
    constructor();
    static clone(subviews: SerializedSubviewList, result?: SerializedSubviewList): SerializedSubviewList;
}
/**
 * Describes the pose of a reality view and how it is able to render
 */
export interface DeprecatedEyeParameters {
    viewport?: Viewport;
    pose?: SerializedEntityState;
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
    view?: any;
    eye?: DeprecatedEyeParameters;
    entities?: SerializedEntityStateMap;
}
/**
 * Describes a complete frame state which is sent to child sessions
 */
export interface FrameState {
    time: JulianDate;
    viewport: Viewport;
    subviews: SerializedSubviewList;
    reality?: string;
    index?: number;
    entities: SerializedEntityStateMap;
    sendTime?: {
        dayNumber: number;
        secondsOfDay: number;
    };
}

import { Matrix4, Cartesian3, Quaternion, CesiumMath } from './cesium/cesium-imports';
export const AVERAGE_HUMAN_HEIGHT = 1.77;
export const EYE_ENTITY_ID = 'ar.eye';
export const PHYSICAL_EYE_ENTITY_ID = 'ar.physical-eye';
export const STAGE_ENTITY_ID = 'ar.stage';
export const PHYSICAL_STAGE_ENTITY_ID = 'ar.physical-stage';
/**
 * Describes the role of an [[ArgonSystem]]
 */
var Role;
(function (Role) {
    /**
     * A system with this role is responsible for augmenting an arbitrary view of reality,
     * generally by overlaying computer generated graphics. A reality augmentor may also,
     * if appropriate, be elevated to the role of a [[REALITY_MANAGER]].
     */
    Role[Role["REALITY_AUGMENTER"] = "RealityAugmenter"] = "REALITY_AUGMENTER";
    /**
     * A system with this role is responsible for (at minimum) describing (and providing,
     * if necessary) a visual representation of the world and the 3D eye pose of the viewer.
     */
    Role[Role["REALITY_VIEWER"] = "RealityViewer"] = "REALITY_VIEWER";
    /**
     * A system with this role is responsible for mediating access to sensors/trackers
     * and pose data for known entities in the world, selecting/configuring/loading
     * [[REALITY_VIEWER]]s, and providing the mechanism by which any given [[REALITY_AUGMENTER]]
     * can augment any given [[REALITY_VIEWER]].
     */
    Role[Role["REALITY_MANAGER"] = "RealityManager"] = "REALITY_MANAGER";
    /**
     * Deprecated. Use [[REALITY_AUGMENTER]].
     * @private
     */
    Role[Role["APPLICATION"] = "Application"] = "APPLICATION";
    /**
     * Deprecated. Use [[REALITY_MANAGER]].
     * @private
     */
    Role[Role["MANAGER"] = "Manager"] = "MANAGER";
    /**
     * Deprecated. Use [[REALITY_VIEWER]]
     * @private
     */
    Role[Role["REALITY_VIEW"] = "RealityView"] = "REALITY_VIEW";
})(Role || (Role = {}));
(function (Role) {
    function isRealityViewer(r) {
        return r === Role.REALITY_VIEWER || r === Role.REALITY_VIEW;
    }
    Role.isRealityViewer = isRealityViewer;
    function isRealityAugmenter(r) {
        return r === Role.REALITY_AUGMENTER || r === Role.APPLICATION;
    }
    Role.isRealityAugmenter = isRealityAugmenter;
    function isRealityManager(r) {
        return r === Role.REALITY_MANAGER || r === Role.MANAGER;
    }
    Role.isRealityManager = isRealityManager;
})(Role || (Role = {}));
export { Role };
/**
 * Configuration options for an [[ArgonSystem]]
 */
export class Configuration {
}
/**
 * Viewport values are expressed using a right-handed coordinate system with the origin
 * at the bottom left corner.
 */
export class Viewport {
    static clone(viewport, result = {}) {
        result.x = viewport.x;
        result.y = viewport.y;
        result.width = viewport.width;
        result.height = viewport.height;
        return result;
    }
    static equals(viewportA, viewportB) {
        return viewportA && viewportB &&
            CesiumMath.equalsEpsilon(viewportA.x, viewportB.x, CesiumMath.EPSILON7) &&
            CesiumMath.equalsEpsilon(viewportA.y, viewportB.y, CesiumMath.EPSILON7) &&
            CesiumMath.equalsEpsilon(viewportA.width, viewportB.width, CesiumMath.EPSILON7) &&
            CesiumMath.equalsEpsilon(viewportA.height, viewportB.height, CesiumMath.EPSILON7);
    }
}
export class NormalizedViewport {
    static clone(viewport, result = {}) {
        result.x = viewport.x;
        result.y = viewport.y;
        result.width = viewport.width;
        result.height = viewport.height;
        return result;
    }
    static equals(viewportA, viewportB) {
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
export var SubviewType;
(function (SubviewType) {
    /*
     * Identities a subview for a handheld display.
     */
    SubviewType[SubviewType["SINGULAR"] = "Singular"] = "SINGULAR";
    /*
     * Identifies a subview for the left eye (when the user is wearing an HMD or Viewer)
     */
    SubviewType[SubviewType["LEFTEYE"] = "LeftEye"] = "LEFTEYE";
    /*
     * Identifies a subview for the right eye (when the user is wearing an HMD or Viewer)
     */
    SubviewType[SubviewType["RIGHTEYE"] = "RightEye"] = "RIGHTEYE";
    /*
     * Identifies a subview for a custom view configuration
     */
    SubviewType[SubviewType["OTHER"] = "Other"] = "OTHER";
})(SubviewType || (SubviewType = {}));
export var SerializedEntityState;
(function (SerializedEntityState) {
    function clone(state, result) {
        if (!state)
            return undefined;
        result = result || {};
        result.p = Cartesian3.clone(state.p, result.p);
        result.o = Quaternion.clone(state.o, result.o);
        result.r = state.r;
        result.meta = state.meta;
        return result;
    }
    SerializedEntityState.clone = clone;
})(SerializedEntityState || (SerializedEntityState = {}));
export var SerializedSubview;
(function (SerializedSubview) {
    function clone(subview, result) {
        result = result || {};
        result.type = subview.type;
        result.projectionMatrix = Matrix4.clone(subview.projectionMatrix, result.projectionMatrix);
        result.viewport = NormalizedViewport.clone(subview.viewport, result.viewport);
        result.pose = subview.pose ? SerializedEntityState.clone(subview.pose, result.pose) : undefined;
        return result;
    }
    SerializedSubview.clone = clone;
})(SerializedSubview || (SerializedSubview = {}));
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
export class SerializedSubviewList extends Array {
    constructor() {
        super();
    }
    static clone(subviews, result) {
        result = result || new SerializedSubviewList;
        result.length = subviews.length;
        for (let i = 0; i < subviews.length; i++) {
            const s = subviews[i];
            result[i] = SerializedSubview.clone(s, result[i]);
        }
        return result;
    }
}

import { CesiumMath } from './cesium/cesium-imports';
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
var Role;
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
export var Viewport;
(function (Viewport) {
    function clone(viewport, result = {}) {
        if (!viewport)
            return undefined;
        result.x = viewport.x;
        result.y = viewport.y;
        result.width = viewport.width;
        result.height = viewport.height;
        return result;
    }
    Viewport.clone = clone;
    function equals(viewportA, viewportB) {
        return viewportA && viewportB &&
            CesiumMath.equalsEpsilon(viewportA.x, viewportB.x, CesiumMath.EPSILON7) &&
            CesiumMath.equalsEpsilon(viewportA.y, viewportB.y, CesiumMath.EPSILON7) &&
            CesiumMath.equalsEpsilon(viewportA.width, viewportB.width, CesiumMath.EPSILON7) &&
            CesiumMath.equalsEpsilon(viewportA.height, viewportB.height, CesiumMath.EPSILON7);
    }
    Viewport.equals = equals;
})(Viewport || (Viewport = {}));
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

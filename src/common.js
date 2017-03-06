System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Role, SubviewType, RealityView;
    return {
        setters: [],
        execute: function () {
            /**
             * Describes the role of an [[ArgonSystem]]
             */
            (function (Role) {
                /**
                 * A system with this role is responsible for augmenting an arbitrary view of reality,
                 * generally by overlaying computer generated graphics. A reality augmentor may also,
                 * if appropriate, be elevated to the role of a [[REALITY_MANAGER]].
                 */
                Role[Role["REALITY_AUGMENTOR"] = "RealityAugmentor"] = "REALITY_AUGMENTOR";
                /**
                 * A system with this role is responsible for (at minimum) describing (and providing,
                 * if necessary) a visual representation of the world and the 3D eye pose of the viewer.
                 */
                Role[Role["REALITY_VIEW"] = "RealityView"] = "REALITY_VIEW";
                /**
                 * A system with this role is responsible for mediating access to sensors/trackers
                 * and pose data for known entities in the world, selecting/configuring/loading
                 * [[REALITY_VIEW]]s, and providing the mechanism by which any given [[REALITY_AUGMENTOR]]
                 * can augment any given [[REALITY_VIEW]]. The reality manager may also, when appropriate,
                 * take on the role of [[REALITY_AUGMENTOR]].
                 */
                Role[Role["REALITY_MANAGER"] = "RealityManager"] = "REALITY_MANAGER";
                /**
                 * Deprecated. Use [[REALITY_AUGMENTOR]].
                 * @private
                 */
                Role[Role["APPLICATION"] = "Application"] = "APPLICATION";
                /**
                 * Deprecated. Use [[REALITY_MANAGER]].
                 * @private
                 */
                Role[Role["MANAGER"] = "Manager"] = "MANAGER";
            })(Role || (Role = {}));
            exports_1("Role", Role);
            /**
             * Identifies a subview in a [[SerializedSubview]]
             */
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
            exports_1("SubviewType", SubviewType);
            /**
            * Represents a view of Reality
            */
            RealityView = (function () {
                function RealityView() {
                }
                RealityView.getType = function (reality) {
                    var uri = reality.uri;
                    var parts = uri.split(':');
                    if (parts[0] === 'reality') {
                        return parts[1];
                    }
                    return 'hosted';
                };
                return RealityView;
            }());
            RealityView.EMPTY = {
                uri: 'reality:empty',
                title: 'Reality',
                providedReferenceFrames: ['FIXED']
            };
            exports_1("RealityView", RealityView);
        }
    };
});

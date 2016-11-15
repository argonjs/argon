System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Role, SubviewType, RealityViewer;
    return {
        setters:[],
        execute: function() {
            /**
             * Describes the role of an [[ArgonSystem]]
             */
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
            exports_1("Role", Role);
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
            })(Role = Role || (Role = {}));
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
            RealityViewer = (function () {
                function RealityViewer() {
                }
                RealityViewer.getType = function (reality) {
                    if (reality === undefined)
                        return undefined;
                    var uri = reality.uri;
                    var parts = uri.split(':');
                    if (parts[0] === 'reality') {
                        return parts[1];
                    }
                    return 'hosted';
                };
                RealityViewer.EMPTY = {
                    uri: 'reality:empty',
                    title: 'Empty Reality',
                    providedReferenceFrames: ['FIXED']
                };
                return RealityViewer;
            }());
            exports_1("RealityViewer", RealityViewer);
        }
    }
});

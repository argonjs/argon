System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Role, SubviewType;
    return {
        setters:[],
        execute: function() {
            /*
             * Describes the role of a session
             */
            (function (Role) {
                /*
                 * An application can augment a reality view.
                 */
                Role[Role["APPLICATION"] = "Application"] = "APPLICATION";
                /*
                 * A reality view is a representation of reality.
                 */
                Role[Role["REALITY_VIEW"] = "RealityView"] = "REALITY_VIEW";
                /*
                 * The manager mediates access to sensors / trackers
                 * and keeps track of known entities in the world.
                 */
                Role[Role["MANAGER"] = "Manager"] = "MANAGER";
            })(Role || (Role = {}));
            exports_1("Role", Role);
            /**
             * Identifies a subview in a view configuration
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
        }
    }
});

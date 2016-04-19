System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Role;
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
        }
    }
});

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
                 * An application recieves state update events from a manager.
                 */
                Role[Role["APPLICATION"] = "Application"] = "APPLICATION";
                /*
                 * A reality provides state update events to a manager.
                 */
                Role[Role["REALITY"] = "Reality"] = "REALITY";
                /*
                 * A manager recieves state update events from a reality and
                 * sends state update events to applications.
                 */
                Role[Role["MANAGER"] = "Manager"] = "MANAGER";
            })(Role || (Role = {}));
            exports_1("Role", Role);
        }
    }
});

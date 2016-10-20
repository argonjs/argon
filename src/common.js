System.register(['./cesium/cesium-imports'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var cesium_imports_1;
    var Role, Viewport, SubviewType, SerializedSubview, DeviceState, RealityViewer;
    return {
        setters:[
            function (cesium_imports_1_1) {
                cesium_imports_1 = cesium_imports_1_1;
            }],
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
            (function (Viewport) {
                function clone(viewport, result) {
                    if (result === void 0) { result = {}; }
                    if (!viewport)
                        return undefined;
                    result.x = viewport.x;
                    result.y = viewport.y;
                    result.width = viewport.width;
                    result.height = viewport.height;
                    return result;
                }
                Viewport.clone = clone;
            })(Viewport = Viewport || (Viewport = {}));
            exports_1("Viewport", Viewport);
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
            (function (SerializedSubview) {
                function clone(subview, result) {
                    if (result === void 0) { result = {}; }
                    result.type = subview.type;
                    result.frustum = result.frustum || {};
                    result.frustum.xOffset = subview.frustum.xOffset;
                    result.frustum.yOffset = subview.frustum.yOffset;
                    result.frustum.fov = subview.frustum.fov;
                    result.frustum.aspectRatio = subview.frustum.aspectRatio;
                    result.pose = subview.pose;
                    result.viewport = Viewport.clone(subview.viewport, result.viewport);
                    return result;
                }
                SerializedSubview.clone = clone;
            })(SerializedSubview = SerializedSubview || (SerializedSubview = {}));
            exports_1("SerializedSubview", SerializedSubview);
            (function (DeviceState) {
                function clone(state, result) {
                    if (result === void 0) { result = {}; }
                    result.time = cesium_imports_1.JulianDate.clone(state.time, result.time);
                    result.locationPose = state.locationPose;
                    result.displayPose = state.displayPose;
                    result.locationAccuracy = state.locationAccuracy;
                    result.locationAltitudeAccuracy = state.locationAltitudeAccuracy;
                    result.viewport = Viewport.clone(state.viewport, result.viewport);
                    result.subviews = state.subviews || [];
                    result.subviews.length = state.subviews.length;
                    state.subviews.forEach(function (subview, i) {
                        result.subviews[i] = SerializedSubview.clone(subview, result.subviews[i]);
                    });
                    result.strictViewport = state.strictViewport;
                    result.strictSubviewViewports = state.strictSubviewViewports;
                    result.strictSubviewFrustums = state.strictSubviewFrustums;
                    result.strictSubviewPoses = state.strictSubviewPoses;
                    return result;
                }
                DeviceState.clone = clone;
            })(DeviceState = DeviceState || (DeviceState = {}));
            exports_1("DeviceState", DeviceState);
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

System.register(['./cesium/cesium-imports.ts', './utils.ts'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var cesium_imports_ts_1, utils_ts_1;
    var DeviceService;
    return {
        setters:[
            function (cesium_imports_ts_1_1) {
                cesium_imports_ts_1 = cesium_imports_ts_1_1;
            },
            function (utils_ts_1_1) {
                utils_ts_1 = utils_ts_1_1;
            }],
        execute: function() {
            /**
            * Provides services for the current device.
            */
            DeviceService = (function () {
                /**
                * Initialize the DeviceService
                */
                function DeviceService() {
                    this.device = new cesium_imports_ts_1.Entity({ id: 'DEVICE', name: 'device' });
                    this.eye = new cesium_imports_ts_1.Entity({ id: 'EYE', name: 'eye' });
                    /**
                     * Returns a default reality for this device. (By default, this is the 'empty' reality)
                     */
                    this.defaultReality = { type: 'empty' };
                    var sampledDevicePosition = new cesium_imports_ts_1.SampledPositionProperty();
                    sampledDevicePosition.forwardExtrapolationType = cesium_imports_ts_1.ExtrapolationType.HOLD;
                    var sampledDeviceOrientation = new cesium_imports_ts_1.SampledProperty(cesium_imports_ts_1.Quaternion);
                    sampledDeviceOrientation.forwardExtrapolationType = cesium_imports_ts_1.ExtrapolationType.HOLD;
                    this.device.position = sampledDevicePosition;
                    this.device.orientation = sampledDeviceOrientation;
                    var eyePosition = new cesium_imports_ts_1.ConstantPositionProperty(cesium_imports_ts_1.Cartesian3.ZERO, this.device);
                    var eyeOrientation = new cesium_imports_ts_1.ConstantProperty(cesium_imports_ts_1.Quaternion.IDENTITY);
                    this.eye.position = eyePosition;
                    this.eye.orientation = eyeOrientation;
                }
                /**
                * Return the pose of this device
                * @param time time of desired pose
                * @return The pose of this device
                */
                DeviceService.prototype.getDevicePose = function (time) {
                    return utils_ts_1.calculatePose(this.device, time);
                };
                /**
                * Return the pose of this device's eye
                * @param time time of desired pose
                * @return the pose of this device's eye
                */
                DeviceService.prototype.getEyePose = function (time) {
                    if (typeof window !== 'undefined') {
                        var interfaceRotation = -window.orientation || 0;
                        var eyeOrientation = this.eye.orientation;
                        eyeOrientation.setValue(cesium_imports_ts_1.Quaternion.fromAxisAngle(cesium_imports_ts_1.Cartesian3.UNIT_Z, interfaceRotation));
                    }
                    return utils_ts_1.calculatePose(this.eye, time);
                };
                /**
                * Returns the camera state. The default camera state is of type perspective
                * with a vertical field of view of 60 degrees.
                * @return camera
                */
                DeviceService.prototype.getCameraState = function () {
                    return {
                        type: "perspective",
                        fovY: cesium_imports_ts_1.CesiumMath.toRadians(60)
                    };
                };
                /**
                 * Returns the view size. By default, returns the width and height of the
                 * document.documentElement (if DOM is available), otherwise, returns {width:0, height:0}
                 */
                DeviceService.prototype.getViewSize = function () {
                    if (typeof document !== 'undefined') {
                        return {
                            width: document.documentElement.clientWidth,
                            height: document.documentElement.clientHeight
                        };
                    }
                    return { width: 0, height: 0 };
                };
                return DeviceService;
            }());
            exports_1("DeviceService", DeviceService);
        }
    }
});

System.register(['./cesium/cesium-imports', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var cesium_imports_1, utils_1;
    var DeviceService;
    return {
        setters:[
            function (cesium_imports_1_1) {
                cesium_imports_1 = cesium_imports_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            /**
            * Provides pose state for the device.
            */
            DeviceService = (function () {
                /**
                * Initialize the DeviceService
                */
                function DeviceService() {
                    this.entity = new cesium_imports_1.Entity({ id: 'DEVICE', name: 'device' });
                    this.eyeEntity = new cesium_imports_1.Entity({ id: 'EYE', name: 'eye' });
                    var sampledDevicePosition = new cesium_imports_1.SampledPositionProperty();
                    sampledDevicePosition.forwardExtrapolationType = cesium_imports_1.ExtrapolationType.HOLD;
                    var sampledDeviceOrientation = new cesium_imports_1.SampledProperty(cesium_imports_1.Quaternion);
                    sampledDeviceOrientation.forwardExtrapolationType = cesium_imports_1.ExtrapolationType.HOLD;
                    this.entity.position = sampledDevicePosition;
                    this.entity.orientation = sampledDeviceOrientation;
                    var eyePosition = new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, this.entity);
                    var eyeOrientation = new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY);
                    this.eyeEntity.position = eyePosition;
                    this.eyeEntity.orientation = eyeOrientation;
                }
                /**
                * Return the pose of this device
                * @param time time of
                desired pose
                * @return The pose of this device
                */
                DeviceService.prototype.getPose = function (time) {
                    return utils_1.calculatePose(this.entity, time);
                };
                /**
                * Return the pose of this device's eye
                * @param time time of desired pose
                * @return the pose of this device's eye
                */
                DeviceService.prototype.getEyePose = function (time) {
                    if (typeof window !== 'undefined') {
                        var interfaceRotation = -window.orientation || 0;
                        var eyeOrientation = this.eyeEntity.orientation;
                        eyeOrientation.setValue(cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_Z, interfaceRotation));
                    }
                    return utils_1.calculatePose(this.eyeEntity, time);
                };
                return DeviceService;
            }());
            exports_1("DeviceService", DeviceService);
        }
    }
});

System.register(['./cesium/cesium-imports'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var cesium_imports_1;
    var DeviceService;
    return {
        setters:[
            function (cesium_imports_1_1) {
                cesium_imports_1 = cesium_imports_1_1;
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
                    this.entity = new cesium_imports_1.Entity({ id: 'ar.device', name: 'device' });
                    this.interfaceEntity = new cesium_imports_1.Entity({ id: 'ar.device.interface', name: 'device_interface' });
                    var sampledDevicePosition = new cesium_imports_1.SampledPositionProperty(null);
                    sampledDevicePosition.forwardExtrapolationType = cesium_imports_1.ExtrapolationType.HOLD;
                    sampledDevicePosition.backwardExtrapolationType = cesium_imports_1.ExtrapolationType.HOLD;
                    var sampledDeviceOrientation = new cesium_imports_1.SampledProperty(cesium_imports_1.Quaternion);
                    sampledDeviceOrientation.forwardExtrapolationType = cesium_imports_1.ExtrapolationType.HOLD;
                    sampledDeviceOrientation.backwardExtrapolationType = cesium_imports_1.ExtrapolationType.HOLD;
                    this.entity.position = sampledDevicePosition;
                    this.entity.orientation = sampledDeviceOrientation;
                    var interfacePosition = new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, this.entity);
                    var interfaceOrientation = new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY);
                    this.interfaceEntity.position = interfacePosition;
                    this.interfaceEntity.orientation = interfaceOrientation;
                }
                /**
                * Update the pose with latest sensor data
                */
                DeviceService.prototype.update = function () {
                    // TODO: use web-based geolocation and geoorientation apis if available
                    if (typeof window !== 'undefined') {
                        var interfaceRotation = -window.orientation || 0;
                        var interfaceOrientation = this.interfaceEntity.orientation;
                        interfaceOrientation.setValue(cesium_imports_1.Quaternion.fromAxisAngle(cesium_imports_1.Cartesian3.UNIT_Z, interfaceRotation));
                    }
                };
                return DeviceService;
            }());
            exports_1("DeviceService", DeviceService);
        }
    }
});

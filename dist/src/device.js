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
                    this.entity.position = new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, null);
                    this.entity.orientation = new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY);
                    this.interfaceEntity.position = new cesium_imports_1.ConstantPositionProperty(cesium_imports_1.Cartesian3.ZERO, this.entity);
                    this.interfaceEntity.orientation = new cesium_imports_1.ConstantProperty(cesium_imports_1.Quaternion.IDENTITY);
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

System.register(['Cesium/Source/Core/binarySearch', 'Cesium/Source/DataSources/CallbackProperty', 'Cesium/Source/Core/Cartesian2', 'Cesium/Source/Core/Cartesian3', 'Cesium/Source/Core/Cartesian4', 'Cesium/Source/Core/Clock', 'Cesium/Source/Core/ClockStep', 'Cesium/Source/DataSources/CompositeEntityCollection', 'Cesium/Source/DataSources/ConstantPositionProperty', 'Cesium/Source/DataSources/ConstantProperty', 'Cesium/Source/Core/createGuid', 'Cesium/Source/Core/defaultValue', 'Cesium/Source/Core/defined', 'Cesium/Source/Core/DeveloperError', 'Cesium/Source/Core/Ellipsoid', 'Cesium/Source/DataSources/Entity', 'Cesium/Source/DataSources/EntityCollection', 'Cesium/Source/Core/Event', 'Cesium/Source/Core/ExtrapolationType', 'Cesium/Source/Core/GeographicProjection', 'Cesium/Source/Core/HermitePolynomialApproximation', 'Cesium/Source/Core/JulianDate', 'Cesium/Source/Core/Math', 'Cesium/Source/Core/Matrix3', 'Cesium/Source/Core/Matrix4', 'Cesium/Source/DataSources/OrientationProperty', 'Cesium/Source/Scene/PerspectiveFrustum', 'Cesium/Source/Scene/PerspectiveOffCenterFrustum', 'Cesium/Source/DataSources/PositionProperty', 'Cesium/Source/DataSources/Property', 'Cesium/Source/Core/Quaternion', 'Cesium/Source/DataSources/ReferenceEntity', 'Cesium/Source/Core/ReferenceFrame', 'Cesium/Source/DataSources/ReferenceProperty', 'Cesium/Source/DataSources/SampledPositionProperty', 'Cesium/Source/DataSources/SampledProperty', 'Cesium/Source/Core/Transforms', 'Cesium/Source/Core/Simon1994PlanetaryPositions', 'Cesium/Source/Core/PolylinePipeline', './cesium-extensions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[
            function (binarySearch_1_1) {
                exports_1({
                    "binarySearch": binarySearch_1_1["default"]
                });
            },
            function (CallbackProperty_1_1) {
                exports_1({
                    "CallbackProperty": CallbackProperty_1_1["default"]
                });
            },
            function (Cartesian2_1_1) {
                exports_1({
                    "Cartesian2": Cartesian2_1_1["default"]
                });
            },
            function (Cartesian3_1_1) {
                exports_1({
                    "Cartesian3": Cartesian3_1_1["default"]
                });
            },
            function (Cartesian4_1_1) {
                exports_1({
                    "Cartesian4": Cartesian4_1_1["default"]
                });
            },
            function (Clock_1_1) {
                exports_1({
                    "Clock": Clock_1_1["default"]
                });
            },
            function (ClockStep_1_1) {
                exports_1({
                    "ClockStep": ClockStep_1_1["default"]
                });
            },
            function (CompositeEntityCollection_1_1) {
                exports_1({
                    "CompositeEntityCollection": CompositeEntityCollection_1_1["default"]
                });
            },
            function (ConstantPositionProperty_1_1) {
                exports_1({
                    "ConstantPositionProperty": ConstantPositionProperty_1_1["default"]
                });
            },
            function (ConstantProperty_1_1) {
                exports_1({
                    "ConstantProperty": ConstantProperty_1_1["default"]
                });
            },
            function (createGuid_1_1) {
                exports_1({
                    "createGuid": createGuid_1_1["default"]
                });
            },
            function (defaultValue_1_1) {
                exports_1({
                    "defaultValue": defaultValue_1_1["default"]
                });
            },
            function (defined_1_1) {
                exports_1({
                    "defined": defined_1_1["default"]
                });
            },
            function (DeveloperError_1_1) {
                exports_1({
                    "DeveloperError": DeveloperError_1_1["default"]
                });
            },
            function (Ellipsoid_1_1) {
                exports_1({
                    "Ellipsoid": Ellipsoid_1_1["default"]
                });
            },
            function (Entity_1_1) {
                exports_1({
                    "Entity": Entity_1_1["default"]
                });
            },
            function (EntityCollection_1_1) {
                exports_1({
                    "EntityCollection": EntityCollection_1_1["default"]
                });
            },
            function (Event_1_1) {
                exports_1({
                    "Event": Event_1_1["default"]
                });
            },
            function (ExtrapolationType_1_1) {
                exports_1({
                    "ExtrapolationType": ExtrapolationType_1_1["default"]
                });
            },
            function (GeographicProjection_1_1) {
                exports_1({
                    "GeographicProjection": GeographicProjection_1_1["default"]
                });
            },
            function (HermitePolynomialApproximation_1_1) {
                exports_1({
                    "HermitePolynomialApproximation": HermitePolynomialApproximation_1_1["default"]
                });
            },
            function (JulianDate_1_1) {
                exports_1({
                    "JulianDate": JulianDate_1_1["default"]
                });
            },
            function (Math_1_1) {
                exports_1({
                    "CesiumMath": Math_1_1["default"]
                });
            },
            function (Matrix3_1_1) {
                exports_1({
                    "Matrix3": Matrix3_1_1["default"]
                });
            },
            function (Matrix4_1_1) {
                exports_1({
                    "Matrix4": Matrix4_1_1["default"]
                });
            },
            function (OrientationProperty_1_1) {
                exports_1({
                    "OrientationProperty": OrientationProperty_1_1["default"]
                });
            },
            function (PerspectiveFrustum_1_1) {
                exports_1({
                    "PerspectiveFrustum": PerspectiveFrustum_1_1["default"]
                });
            },
            function (PerspectiveOffCenterFrustum_1_1) {
                exports_1({
                    "PerspectiveOffCenterFrustum": PerspectiveOffCenterFrustum_1_1["default"]
                });
            },
            function (PositionProperty_1_1) {
                exports_1({
                    "PositionProperty": PositionProperty_1_1["default"]
                });
            },
            function (Property_1_1) {
                exports_1({
                    "Property": Property_1_1["default"]
                });
            },
            function (Quaternion_1_1) {
                exports_1({
                    "Quaternion": Quaternion_1_1["default"]
                });
            },
            function (ReferenceEntity_1_1) {
                exports_1({
                    "ReferenceEntity": ReferenceEntity_1_1["default"]
                });
            },
            function (ReferenceFrame_1_1) {
                exports_1({
                    "ReferenceFrame": ReferenceFrame_1_1["default"]
                });
            },
            function (ReferenceProperty_1_1) {
                exports_1({
                    "ReferenceProperty": ReferenceProperty_1_1["default"]
                });
            },
            function (SampledPositionProperty_1_1) {
                exports_1({
                    "SampledPositionProperty": SampledPositionProperty_1_1["default"]
                });
            },
            function (SampledProperty_1_1) {
                exports_1({
                    "SampledProperty": SampledProperty_1_1["default"]
                });
            },
            function (Transforms_1_1) {
                exports_1({
                    "Transforms": Transforms_1_1["default"]
                });
            },
            function (Simon1994PlanetaryPositions_1_1) {
                exports_1({
                    "Simon1994PlanetaryPositions": Simon1994PlanetaryPositions_1_1["default"]
                });
            },
            function (PolylinePipeline_1_1) {
                exports_1({
                    "PolylinePipeline": PolylinePipeline_1_1["default"]
                });
            },
            function (_1) {}],
        execute: function() {
        }
    }
});
//# sourceMappingURL=cesium-imports.js.map
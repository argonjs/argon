System.register(['../../src/argon'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Argon;
    var app, scene, camera, user, userLocation, renderer, geometry, mat, posXSphere, negXSphere, posYSphere, negYSphere, posZSphere, negZSphere, axisHelper, perspectiveProjection;
    function update(time, index) {
        app.device.update({ orientation: true });
        var pose = Argon.getSerializedEntityPose(app.device.displayEntity, time);
        app.reality.publishViewState({
            time: time,
            pose: pose,
            viewport: app.device.state.viewport,
            subviews: app.device.state.subviews,
            geolocationAccuracy: undefined,
            geolocationAltitudeAccuracy: undefined
        });
        app.timer.requestFrame(update);
    }
    return {
        setters:[
            function (Argon_1) {
                Argon = Argon_1;
            }],
        execute: function() {
            window['Argon'] = Argon;
            exports_1("app", app = Argon.initReality());
            exports_1("scene", scene = new THREE.Scene());
            exports_1("camera", camera = new THREE.PerspectiveCamera());
            exports_1("user", user = new THREE.Object3D());
            exports_1("userLocation", userLocation = new THREE.Object3D);
            scene.add(camera);
            scene.add(user);
            scene.add(userLocation);
            renderer = new THREE.WebGLRenderer({
                alpha: true,
                logarithmicDepthBuffer: true
            });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            app.view.element.appendChild(renderer.domElement);
            // app.context.setDefaultReferenceFrame(app.context.localOriginEastUpSouth);
            app.context.setDefaultReferenceFrame(app.context.localOriginEastNorthUp);
            geometry = new THREE.SphereGeometry(30, 32, 32);
            mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            exports_1("posXSphere", posXSphere = new THREE.Mesh(geometry, mat));
            posXSphere.position.x = 200;
            userLocation.add(posXSphere);
            mat = new THREE.MeshBasicMaterial({ color: 0xffaaaa });
            exports_1("negXSphere", negXSphere = new THREE.Mesh(geometry, mat));
            negXSphere.position.x = -200;
            userLocation.add(negXSphere);
            mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            exports_1("posYSphere", posYSphere = new THREE.Mesh(geometry, mat));
            posYSphere.position.y = 200;
            userLocation.add(posYSphere);
            mat = new THREE.MeshBasicMaterial({ color: 0xaaffaa });
            exports_1("negYSphere", negYSphere = new THREE.Mesh(geometry, mat));
            negYSphere.position.y = -200;
            userLocation.add(negYSphere);
            mat = new THREE.MeshBasicMaterial({ color: 0x0000ff });
            exports_1("posZSphere", posZSphere = new THREE.Mesh(geometry, mat));
            posZSphere.position.z = 200;
            userLocation.add(posZSphere);
            mat = new THREE.MeshBasicMaterial({ color: 0xaaaaff });
            exports_1("negZSphere", negZSphere = new THREE.Mesh(geometry, mat));
            negZSphere.position.z = -200;
            userLocation.add(negZSphere);
            axisHelper = new THREE.AxisHelper(10);
            userLocation.add(axisHelper);
            axisHelper.position.z = 50;
            axisHelper = new THREE.AxisHelper(10);
            userLocation.add(axisHelper);
            axisHelper.position.y = -50;
            perspectiveProjection = new Argon.Cesium.PerspectiveFrustum();
            perspectiveProjection.fov = Math.PI / 2;
            app.timer.requestFrame(update);
            app.updateEvent.addEventListener(function () {
                var userPose = app.context.getEntityPose(app.context.user);
                if (userPose.poseStatus & Argon.PoseStatus.KNOWN) {
                    user.position.copy(userPose.position);
                    user.quaternion.copy(userPose.orientation);
                    userLocation.position.copy(userPose.position);
                }
            });
            app.renderEvent.addEventListener(function () {
                var viewport = app.view.getViewport();
                renderer.setSize(viewport.width, viewport.height);
                for (var _i = 0, _a = app.view.getSubviews(); _i < _a.length; _i++) {
                    var subview = _a[_i];
                    camera.position.copy(subview.pose.position);
                    camera.quaternion.copy(subview.pose.orientation);
                    camera.projectionMatrix.fromArray(subview.projectionMatrix);
                    var _b = subview.viewport, x = _b.x, y = _b.y, width = _b.width, height = _b.height;
                    renderer.setViewport(x, y, width, height);
                    renderer.setScissor(x, y, width, height);
                    renderer.setScissorTest(true);
                    renderer.render(scene, camera);
                }
            });
        }
    }
});

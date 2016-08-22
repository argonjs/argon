System.register(['../src/argon'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Argon;
    var app, scene, camera, user, userLocation, renderer, geometry, mat, posXSphere, negXSphere, posYSphere, negYSphere, posZSphere, negZSphere, axisHelper;
    return {
        setters:[
            function (Argon_1) {
                Argon = Argon_1;
            }],
        execute: function() {
            window['Argon'] = Argon;
            exports_1("app", app = Argon.init());
            // app.reality.setDesired({
            //     title: 'My Custom Reality',
            //     uri: Argon.resolveURL('custom_reality.html')
            // })
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
            // var textShapes = THREE.FontUtils.generateShapes( "PosZ", options );
            // var text = new THREE.ShapeGeometry( textShapes );
            // var textMesh = new THREE.Mesh( text, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) ;
            // scene.add(textMesh);
            app.vuforia.init({
                encryptedLicenseData: "-----BEGIN PGP MESSAGE-----\nVersion: OpenPGP.js v2.3.2\nComment: http://openpgpjs.org\n\n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\n0ccTFA==\n=AUSQ\n-----END PGP MESSAGE-----\n"
            }).then(function (api) {
                api.objectTracker.createDataSet('dataset/StonesAndChips.xml').then(function (dataSet) {
                    dataSet.load().then(function () {
                        var trackables = dataSet.getTrackables();
                        var stonesEntity = app.context.subscribeToEntityById(trackables['stones'].id);
                        var stonesObject = new THREE.Object3D;
                        scene.add(stonesObject);
                        var boxGeometry = new THREE.BoxGeometry(50, 50, 50);
                        var material = new THREE.MeshNormalMaterial();
                        material.side = THREE.DoubleSide;
                        var box = new THREE.Mesh(boxGeometry, material);
                        box.position.z = 25;
                        box.position.y = 50;
                        var axisHelper = new THREE.AxisHelper(10);
                        box.add(axisHelper);
                        console.log('Subscribes to stones trackable with id ' + trackables['stones'].id);
                        app.context.updateEvent.addEventListener(function () {
                            var stonesPose = app.context.getEntityPose(stonesEntity);
                            if (stonesPose.poseStatus & Argon.PoseStatus.KNOWN) {
                                stonesObject.position.copy(stonesPose.position);
                                stonesObject.quaternion.copy(stonesPose.orientation);
                            }
                            if (stonesPose.poseStatus & Argon.PoseStatus.FOUND) {
                                stonesObject.add(box);
                            }
                            else if (stonesPose.poseStatus & Argon.PoseStatus.LOST) {
                                stonesObject.remove(box);
                            }
                        });
                    });
                    api.objectTracker.activateDataSet(dataSet);
                });
            });
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
// // creating 6 divs to indicate the x y z positioning
// const divXpos = document.createElement('div')
// const divXneg = document.createElement('div')
// const divYpos = document.createElement('div')
// const divYneg = document.createElement('div')
// const divZpos = document.createElement('div')
// const divZneg = document.createElement('div')
// // programatically create a stylesheet for our direction divs
// // and add it to the document
// const style = document.createElement("style");
// style.type = 'text/css';
// document.head.appendChild(style);
// const sheet = <CSSStyleSheet>style.sheet;
// sheet.insertRule(`
//     .direction {
//         opacity: 0.5;
//         width: 100px;
//         height: 100px;
//         border-radius: 50%;
//         line-height: 100px;
//         fontSize: 20px;
//         text-align: center;
//     }
// `, 0);
// // Put content in each one  (should do this as a couple of functions)
// // for X
// divXpos.className = 'direction'
// divXpos.style.backgroundColor = "red"
// divXpos.innerText = "Pos X = East"
// divXneg.className = 'direction'
// divXneg.style.backgroundColor = "red"
// divXneg.innerText = "Neg X = West"
// // for Y
// divYpos.className = 'direction'
// divYpos.style.backgroundColor = "blue"
// divYpos.innerText = "Pos Y = Up"
// divYneg.className = 'direction'
// divYneg.style.backgroundColor = "blue"
// divYneg.innerText = "Neg Y = Down"
// //for Z
// divZpos.className = 'direction'
// divZpos.style.backgroundColor = "green"
// divZpos.innerText = "Pos Z = South"
// divZneg.className = 'direction'
// divZneg.style.backgroundColor = "green"
// divZneg.innerText = "Neg Z = North"
// // create 6 CSS3DObjects in the scene graph
// const cssObjectXpos = new THREE.CSS3DObject(divXpos)
// const cssObjectXneg = new THREE.CSS3DObject(divXneg)
// const cssObjectYpos = new THREE.CSS3DObject(divYpos)
// const cssObjectYneg = new THREE.CSS3DObject(divYneg)
// const cssObjectZpos = new THREE.CSS3DObject(divZpos)
// const cssObjectZneg = new THREE.CSS3DObject(divZneg)
// // the width and height is used to align things.
// cssObjectXpos.position.x = 200.0
// cssObjectXpos.rotation.y = - Math.PI / 2
// cssObjectXneg.position.x = -200.0
// cssObjectXneg.rotation.y = Math.PI / 2
// // for Y
// cssObjectYpos.position.y = 200.0
// cssObjectYpos.rotation.x = Math.PI / 2
// cssObjectYneg.position.y = - 200.0
// cssObjectYneg.rotation.x = - Math.PI / 2
// // for Z
// cssObjectZpos.position.z = 200.0
// cssObjectZpos.rotation.y = Math.PI
// cssObjectZneg.position.z = -200.0
// //no rotation need for this one
// userLocation.add(cssObjectXpos)
// userLocation.add(cssObjectXneg)
// userLocation.add(cssObjectYpos)
// userLocation.add(cssObjectYneg)
// userLocation.add(cssObjectZpos)
// userLocation.add(cssObjectZneg)

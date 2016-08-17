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
                encryptedLicenseData: "-----BEGIN PGP MESSAGE-----\nVersion: OpenPGP.js v2.3.2\nComment: http://openpgpjs.org\n\nwcFMA1AUQCNdm8lhAQ/8DgunMAyO2CdJGDaWqz+XhS+TNIl9i1g4kDxY8jpV\nWH0cw8R9f2G8z/bj+6KviOBEUnV/7XORp4CnwxsVrbQyGZAJwTn+MzNZjFkl\ncg963F/LiUqfMwL4A3GIAZfAK8H8QYOUm9NUEYKNR5KSbBR/Q2GmgQy0bFSU\n2UTfdq4upQMHYWSA7Bhb4+TNziZC1RNY5s0UGoMpYCrpuqRrI0PzY+Y+Upm/\n62p2QdCwdO6VwtZrYrU6geoiry0a773WgCwXGgoJcm7cwn4ZBzVLTvq2iUc6\nZsQloVX5+w3aIovbqSY8iAv/LUTZRaxj4fsrXENUbus9hXr5QsILMDviKNws\nAQQDCuxKxZn4P/Kr5cSuj5CInYcR1+43jLdYOSrdvx5R6akcPMoOH0Jf4O0y\nG2O7tuHmD/eUYIO4cJqMzPsopl4+lEVheOCNg6XvfEMpgGKj7x2b8Ah5NYqZ\nR7dfKypwuk4KAScN9Sv0AL7gBGEHMgH2tey6jK/FN4LhoYWGpSiYYF8ESefj\ny8dR+OEon0689U9Qx0SFpIf3N8sv65PcgvEG0q88U3MP0ILVrblJi/1nPjH3\nwdHC5gOFHQ7znGc8b8ULK5LWJglFSZSAEuyQKf/VzeLrMCYmf5VojMoHkCF0\nt/JLV90N3D9Xq4VTJb+LwZSefOd3cM2JioaX84oIkV/SwUgBlFdPT1pl2QCd\nHiH3xFzI5Aqo1ou9+hSia7i/Wy+0tcrQGSN/EVgLUnaOAhtS+nGvLIEaQ7CK\nstNgWcgs3RV6l0j08OIBAePUAq4VA/eXNdhf+Kr0kTQHBWNJynOTSfMPOd40\ncX6j08oymiXCoo14M9KbcGYzW/SviBcyYRjpFCJoyEA21peh9T+1r5/ysAS9\nTqZesOtTqzyq3Cl1/RD9mWhbyNA+uy7UtiADB2n3TfRhotHexCw6mc+ViuDy\nJqas6reSRrzlbsdgW0QWt7NsCKXR/PFWjDLcFxU1Si+UCzrQmj6KKVem9J+j\njCooRgZdNhBkk1YI1YN6Rk1CS57vYyJzguGRLtd5oNGiyWHWKcFycGWtS4hQ\nzOctD+6v+9jVekg2CZpK3l8CZV8VfKQweEJqHL8Rz0oVxbE4cXUbkoqdZITc\ngThpqJ3BFdCek921yT8M/qKjvJNvfHKkjVNfR94Id+rpW05fvjyAQIgQ+eaI\nS2cxPSB2C/Fke2goHc9yOQsOeouXI1U0xI4IWT9h8yaxsZ4DUzkOdITBACKQ\ntxkkd41URb2UQZnnU/UEbkOBblj3/m7XDb7tq5tQG+vhiFzBa/R70E23Xfun\n8hgeolsw+e7qQKzylZtMi1AFu+FLg2+NCTTru3Pjw2M0tKl0Q+VcsqyXE+3G\nNPXVCPzd/pPn6J0Mx/6l\n=RBAV\n-----END PGP MESSAGE-----\n" }).then(function (api) {
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

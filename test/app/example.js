// import * as Argon from '@argonjs/argon'
// import * as Argon from '../dist/src/argon'
import * as Argon from '../../src/argon';
window['Argon'] = Argon;
export var app = Argon.init();
export var scene = new THREE.Scene();
export var camera = new THREE.PerspectiveCamera();
export var user = new THREE.Object3D();
export var userLocation = new THREE.Object3D;
scene.add(camera);
scene.add(user);
scene.add(userLocation);
var renderer = new THREE.WebGLRenderer({
    alpha: true,
    logarithmicDepthBuffer: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
app.view.element.appendChild(renderer.domElement);
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';
// app.context.setDefaultReferenceFrame(app.context.localOriginEastUpSouth);
app.context.setDefaultReferenceFrame(app.context.localOriginEastNorthUp);
var geometry = new THREE.SphereGeometry(30, 32, 32);
var mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
export var posXSphere = new THREE.Mesh(geometry, mat);
posXSphere.position.x = 200;
userLocation.add(posXSphere);
mat = new THREE.MeshBasicMaterial({ color: 0xffaaaa });
export var negXSphere = new THREE.Mesh(geometry, mat);
negXSphere.position.x = -200;
userLocation.add(negXSphere);
mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
export var posYSphere = new THREE.Mesh(geometry, mat);
posYSphere.position.y = 200;
userLocation.add(posYSphere);
mat = new THREE.MeshBasicMaterial({ color: 0xaaffaa });
export var negYSphere = new THREE.Mesh(geometry, mat);
negYSphere.position.y = -200;
userLocation.add(negYSphere);
mat = new THREE.MeshBasicMaterial({ color: 0x0000ff });
export var posZSphere = new THREE.Mesh(geometry, mat);
posZSphere.position.z = 200;
userLocation.add(posZSphere);
mat = new THREE.MeshBasicMaterial({ color: 0xaaaaff });
export var negZSphere = new THREE.Mesh(geometry, mat);
negZSphere.position.z = -200;
userLocation.add(negZSphere);
var axisHelper = new THREE.AxisHelper(10);
userLocation.add(axisHelper);
axisHelper.position.z = 50;
var axisHelper = new THREE.AxisHelper(10);
userLocation.add(axisHelper);
axisHelper.position.y = -50;
// var textShapes = THREE.FontUtils.generateShapes( "PosZ", options );
// var text = new THREE.ShapeGeometry( textShapes );
// var textMesh = new THREE.Mesh( text, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) ;
// scene.add(textMesh);
app.vuforia.init({
    encryptedLicenseData: "-----BEGIN PGP MESSAGE-----\nComment: GPGTools - https://gpgtools.org\n\nhQIMA1AUQCNdm8lhAQ/+Kam6naTGpo6C2EkYOWTKVmeLa6lD4epaRrH3ZnhOHm5z\ndpFmTehxe+A/J/7/68EvEGDPfuV4cqHTXNuvlAvY1K625/i8EfNrx+nPL0umap5E\nWaYRnLNF6MlC1Pu8aLY8c8vd/ZA9h2Zk8P4t0C/uOayJBZk0BhKRlOgCJbjOd7/X\nEMPOD3XtFUP8T13Kpqb/A8cyIRTOowm8yaj4PajUCAlOWSYKYRcXM5yg/5t7XTdi\n3iURgidFbWowbnqyFmOKxAxqRBoXPGYEDmK8IgOgYmR7C5pVAmWDK8ZcsTn2YC0T\nJhYUSQvRA2CszK9UMEoOh2rqE8RHZY4MuVPm1QNC1j4yP1FSDZvfcJdOTbTeBCci\n6ATCARma+roA3xtbzPVWhjc8DGtlRIJqj0+cRjK8RMzIMbBPGlTZihgt7W0sifa/\nm38zAlE4Be5Omg+kJ76kyXph+SIj0gqBl5rG34O4n4KgCBooipjWnAfzwKJknBiX\n74ex99LZf/VfijCjDKkUpiyrHHOkWHFDeolWTZVmj3D6HBqUaCMGp3ObQ0AGA+tt\n/BuRohIHk1zvST66FzBoFx2+fctZm7c+VItAoyW/+IVuulFCsoQdE59fF81MaMan\nRw1MNC6d1uemIZI/xp+ilxbpeloypyrWa6ZLzlScOv7//C5bowZgjmxCfbY7SYHS\n6QFyUllcKIYGoVOMX30ZrdaQMU8177nnMik8Ivr5zkgu9FsKkwi0MH4XTP4Jp8zk\neR4f+bzZmxitTLYoaJFnkmxdzyHTsIXgOOtndTh18+uSgvEz+oewrvawQCTXJKXw\nBwYk7wAvMlFywMM/B+H4kvBOThqG7je2S3UitW1walSwq+P8p/v2UzIxy+yGTzlz\n0eKmfbx2b2+6r76hDVRt0XiAuVKXq8Erndx20VkRZj3MBOgus3XmvbCgORn0w5F/\n2sg6kkNDrAI7aUq83EFMuDr3A6ABbt3C6cEPEB1sLhsqhnLTvkHTr6J7Br+wI+2f\nelT3x15oPUAjnDQR7kC77cmZ8U5o/R2nYOlPzDSyX34cV3z176hqssQa3l/ebh+4\nuuMHiecut/s2FVACrizVtEI+Z9I73iURwD9DrdRuJKYMdKoYDqoM43VdIZfNc3Ec\nj7SKC/LSpOJL8YQlLoKLtdAjCYrYhDgycAKKpTw9Kv6wbSQ3qxOEUMrxK2I30NaA\n9tuzf15WZ+TathGTIL7VqLKS4UPK57zvrdqneB6Xlj4CABMIL3ZmgGuJPr8WSJSu\nxMTXBowqC4eNuwUGtQtsy+7xYkxOLs/NVn2nNNb6NlEaZX0QUhqgW+t5j3d4SRry\nkDYZIbq+RqPwaZhg0hXpT5Fwz97y4Z5NyjAu44kiYAK2Du0Vyi1e0PMtW2ja4ZH0\n=d+oG\n-----END PGP MESSAGE-----"
}).then(function (api) {
    api.objectTracker.createDataSetFromURL('dataset/StonesAndChips.xml').then(function (id) {
        api.objectTracker.loadDataSet(id).then(function (trackables) {
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
                if (stonesPose.status & Argon.PoseStatus.KNOWN) {
                    stonesObject.position.copy(stonesPose.position);
                    stonesObject.quaternion.copy(stonesPose.orientation);
                }
                if (stonesPose.status & Argon.PoseStatus.FOUND) {
                    stonesObject.add(box);
                }
                else if (stonesPose.status & Argon.PoseStatus.LOST) {
                    stonesObject.remove(box);
                }
            });
        });
        api.objectTracker.activateDataSet(id);
    });
});
app.updateEvent.addEventListener(function () {
    var userPose = app.context.getEntityPose(app.context.user);
    if (userPose.status & Argon.PoseStatus.KNOWN) {
        user.position.copy(userPose.position);
        user.quaternion.copy(userPose.orientation);
        userLocation.position.copy(userPose.position);
    }
});
app.renderEvent.addEventListener(function () {
    // css renderer, if used:
    // const viewport = app.view.viewport;
    // cssRenderer.setSize(viewport.width, viewport.height);
    renderer.setSize(app.view.renderWidth, app.view.renderHeight, false);
    for (var _i = 0, _a = app.view.subviews; _i < _a.length; _i++) {
        var subview = _a[_i];
        camera.position.copy(subview.pose.position);
        camera.quaternion.copy(subview.pose.orientation);
        camera.projectionMatrix.fromArray(subview.frustum.projectionMatrix);
        var _b = subview.renderViewport, x = _b.x, y = _b.y, width = _b.width, height = _b.height;
        renderer.setViewport(x, y, width, height);
        renderer.setScissor(x, y, width, height);
        renderer.setScissorTest(true);
        renderer.render(scene, camera);
        // let {x,y,width,height} = subview.viewport;
        // cssRenderer.setViewport(x,y,width,height, subview.index)
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

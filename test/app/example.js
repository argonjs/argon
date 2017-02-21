// import * as Argon from '@argonjs/argon'
// import * as Argon from '../dist/src/argon'
import * as Argon from '../../src/argon';
window['Argon'] = Argon;
export const app = Argon.init();
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera();
export const user = new THREE.Object3D();
export const userLocation = new THREE.Object3D;
scene.add(camera);
scene.add(user);
scene.add(userLocation);
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    logarithmicDepthBuffer: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
app.viewport.element.appendChild(renderer.domElement);
// app.context.setDefaultReferenceFrame(app.context.localOriginEastUpSouth);
app.context.setDefaultReferenceFrame(app.context.localOriginEastNorthUp);
const geometry = new THREE.SphereGeometry(30, 32, 32);
let mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
export const posXSphere = new THREE.Mesh(geometry, mat);
posXSphere.position.x = 200;
userLocation.add(posXSphere);
mat = new THREE.MeshBasicMaterial({ color: 0xffaaaa });
export const negXSphere = new THREE.Mesh(geometry, mat);
negXSphere.position.x = -200;
userLocation.add(negXSphere);
mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
export const posYSphere = new THREE.Mesh(geometry, mat);
posYSphere.position.y = 200;
userLocation.add(posYSphere);
mat = new THREE.MeshBasicMaterial({ color: 0xaaffaa });
export const negYSphere = new THREE.Mesh(geometry, mat);
negYSphere.position.y = -200;
userLocation.add(negYSphere);
mat = new THREE.MeshBasicMaterial({ color: 0x0000ff });
export const posZSphere = new THREE.Mesh(geometry, mat);
posZSphere.position.z = 200;
userLocation.add(posZSphere);
mat = new THREE.MeshBasicMaterial({ color: 0xaaaaff });
export const negZSphere = new THREE.Mesh(geometry, mat);
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
    encryptedLicenseData: `-----BEGIN PGP MESSAGE-----
Comment: GPGTools - https://gpgtools.org

hQIMA1AUQCNdm8lhAQ/+Kam6naTGpo6C2EkYOWTKVmeLa6lD4epaRrH3ZnhOHm5z
dpFmTehxe+A/J/7/68EvEGDPfuV4cqHTXNuvlAvY1K625/i8EfNrx+nPL0umap5E
WaYRnLNF6MlC1Pu8aLY8c8vd/ZA9h2Zk8P4t0C/uOayJBZk0BhKRlOgCJbjOd7/X
EMPOD3XtFUP8T13Kpqb/A8cyIRTOowm8yaj4PajUCAlOWSYKYRcXM5yg/5t7XTdi
3iURgidFbWowbnqyFmOKxAxqRBoXPGYEDmK8IgOgYmR7C5pVAmWDK8ZcsTn2YC0T
JhYUSQvRA2CszK9UMEoOh2rqE8RHZY4MuVPm1QNC1j4yP1FSDZvfcJdOTbTeBCci
6ATCARma+roA3xtbzPVWhjc8DGtlRIJqj0+cRjK8RMzIMbBPGlTZihgt7W0sifa/
m38zAlE4Be5Omg+kJ76kyXph+SIj0gqBl5rG34O4n4KgCBooipjWnAfzwKJknBiX
74ex99LZf/VfijCjDKkUpiyrHHOkWHFDeolWTZVmj3D6HBqUaCMGp3ObQ0AGA+tt
/BuRohIHk1zvST66FzBoFx2+fctZm7c+VItAoyW/+IVuulFCsoQdE59fF81MaMan
Rw1MNC6d1uemIZI/xp+ilxbpeloypyrWa6ZLzlScOv7//C5bowZgjmxCfbY7SYHS
6QFyUllcKIYGoVOMX30ZrdaQMU8177nnMik8Ivr5zkgu9FsKkwi0MH4XTP4Jp8zk
eR4f+bzZmxitTLYoaJFnkmxdzyHTsIXgOOtndTh18+uSgvEz+oewrvawQCTXJKXw
BwYk7wAvMlFywMM/B+H4kvBOThqG7je2S3UitW1walSwq+P8p/v2UzIxy+yGTzlz
0eKmfbx2b2+6r76hDVRt0XiAuVKXq8Erndx20VkRZj3MBOgus3XmvbCgORn0w5F/
2sg6kkNDrAI7aUq83EFMuDr3A6ABbt3C6cEPEB1sLhsqhnLTvkHTr6J7Br+wI+2f
elT3x15oPUAjnDQR7kC77cmZ8U5o/R2nYOlPzDSyX34cV3z176hqssQa3l/ebh+4
uuMHiecut/s2FVACrizVtEI+Z9I73iURwD9DrdRuJKYMdKoYDqoM43VdIZfNc3Ec
j7SKC/LSpOJL8YQlLoKLtdAjCYrYhDgycAKKpTw9Kv6wbSQ3qxOEUMrxK2I30NaA
9tuzf15WZ+TathGTIL7VqLKS4UPK57zvrdqneB6Xlj4CABMIL3ZmgGuJPr8WSJSu
xMTXBowqC4eNuwUGtQtsy+7xYkxOLs/NVn2nNNb6NlEaZX0QUhqgW+t5j3d4SRry
kDYZIbq+RqPwaZhg0hXpT5Fwz97y4Z5NyjAu44kiYAK2Du0Vyi1e0PMtW2ja4ZH0
=d+oG
-----END PGP MESSAGE-----`
}).then((api) => {
    api.objectTracker.createDataSetFromURI('dataset/StonesAndChips.xml').then((id) => {
        api.objectTracker.loadDataSet(id).then((trackables) => {
            const stonesEntity = app.context.subscribeToEntityById(trackables['stones'].id);
            const stonesObject = new THREE.Object3D;
            scene.add(stonesObject);
            var boxGeometry = new THREE.BoxGeometry(50, 50, 50);
            var material = new THREE.MeshNormalMaterial();
            material.side = THREE.DoubleSide;
            const box = new THREE.Mesh(boxGeometry, material);
            box.position.z = 25;
            box.position.y = 50;
            var axisHelper = new THREE.AxisHelper(10);
            box.add(axisHelper);
            console.log('Subscribes to stones trackable with id ' + trackables['stones'].id);
            app.context.updateEvent.addEventListener(() => {
                const stonesPose = app.context.getEntityPose(stonesEntity);
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
app.updateEvent.addEventListener(() => {
    const userPose = app.context.getEntityPose(app.context.user);
    if (userPose.status & Argon.PoseStatus.KNOWN) {
        user.position.copy(userPose.position);
        user.quaternion.copy(userPose.orientation);
        userLocation.position.copy(userPose.position);
    }
});
app.renderEvent.addEventListener(() => {
    const viewport = app.viewport.current;
    renderer.setSize(viewport.width, viewport.height);
    for (let subview of app.view.getSubviews()) {
        camera.position.copy(subview.pose.position);
        camera.quaternion.copy(subview.pose.orientation);
        camera.projectionMatrix.fromArray(subview.frustum.projectionMatrix);
        let { x, y, width, height } = subview.viewport;
        renderer.setViewport(x, y, width, height);
        renderer.setScissor(x, y, width, height);
        renderer.setScissorTest(true);
        renderer.render(scene, camera);
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

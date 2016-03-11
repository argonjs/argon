import * as Argon from 'argon'

declare const THREE: any;

const app = Argon.init();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();

const cssRenderer = new THREE.CSS3DRenderer();
const webglRenderer = new THREE.WebGLRenderer({ alpha: true, logarithmicDepthBuffer: true });

app.view.element.appendChild(cssRenderer.domElement);
app.view.element.appendChild(webglRenderer.domElement);

app.context.setOrigin(app.context.localOriginEastUpSouth);

app.vuforia.init();
app.vuforia.startCamera();
app.vuforia.startObjectTracker();

const dataset = app.vuforia.createDataSet('dataset/StonesAndChips.xml');

dataset.trackablesPromise.then((trackables) => {

    const stonesEntity = app.context.subscribeToEntityById(trackables['stones'].id)
    const stonesObject = new THREE.Object3D;
    scene.add(stonesObject);

    const box = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), new THREE.MeshNormalMaterial())
    box.position.z = 25

    app.context.updateEvent.addEventListener((frameState) => {
        const stonesState = app.context.getCurrentEntityState(stonesEntity);

        if (stonesState.poseStatus & Argon.PoseStatus.KNOWN) {
            stonesObject.position.copy(stonesState.position);
            stonesObject.quaternion.copy(stonesState.orientation);
        }

        if (stonesState.poseStatus & Argon.PoseStatus.FOUND) {
            stonesObject.add(box);
        } else if (stonesState.poseStatus & Argon.PoseStatus.LOST) {
            stonesObject.remove(box);
        }
    })

})

dataset.activate();

app.context.updateEvent.addEventListener((frameState) => {
    camera.fov = Argon.Cesium.CesiumMath.toDegrees(app.context.frustum.fovy);
    camera.aspect = app.context.frustum.aspectRatio;
    camera.projectionMatrix.fromArray(app.context.frustum.infiniteProjectionMatrix)

    const eyeState = app.context.getCurrentEntityState(app.context.eye);

    if (eyeState.poseStatus & Argon.PoseStatus.KNOWN) {
        camera.position.copy(eyeState.position);
        camera.quaternion.copy(eyeState.orientation);
        eyeOrigin.position.copy(eyeState.position);
    }
})

app.context.renderEvent.addEventListener((frameState) => {
    const {width, height} = frameState.size;
    cssRenderer.setSize(width, height);
    webglRenderer.setSize(width, height);
    cssRenderer.render(scene, camera);
    webglRenderer.render(scene, camera);
})

const eyeOrigin = new THREE.Object3D;
scene.add(eyeOrigin);

// creating 6 divs to indicate the x y z positioning
const divXpos = document.createElement('div')
const divXneg = document.createElement('div')
const divYpos = document.createElement('div')
const divYneg = document.createElement('div')
const divZpos = document.createElement('div')
const divZneg = document.createElement('div')

// programatically create a stylesheet for our direction divs
// and add it to the document
const style = document.createElement("style");
style.type = 'text/css';
document.head.appendChild(style);
const sheet = <CSSStyleSheet>style.sheet;
sheet.insertRule(`
    .direction {
        opacity: 0.5;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        line-height: 100px;
        fontSize: 20px;
        text-align: center;
    }
`, 0);

// Put content in each one  (should do this as a couple of functions)
// for X
divXpos.className = 'direction'
divXpos.style.backgroundColor = "red"
divXpos.innerText = "Pos X = East"

divXneg.className = 'direction'
divXneg.style.backgroundColor = "red"
divXneg.innerText = "Neg X = West"

// for Y
divYpos.className = 'direction'
divYpos.style.backgroundColor = "blue"
divYpos.innerText = "Pos Y = Up"

divYneg.className = 'direction'
divYneg.style.backgroundColor = "blue"
divYneg.innerText = "Neg Y = Down"

//for Z
divZpos.className = 'direction'
divZpos.style.backgroundColor = "green"
divZpos.innerText = "Pos Z = South"

divZneg.className = 'direction'
divZneg.style.backgroundColor = "green"
divZneg.innerText = "Neg Z = North"

// create 6 CSS3DObjects in the scene graph
const cssObjectXpos = new THREE.CSS3DObject(divXpos)
const cssObjectXneg = new THREE.CSS3DObject(divXneg)
const cssObjectYpos = new THREE.CSS3DObject(divYpos)
const cssObjectYneg = new THREE.CSS3DObject(divYneg)
const cssObjectZpos = new THREE.CSS3DObject(divZpos)
const cssObjectZneg = new THREE.CSS3DObject(divZneg)

// the width and height is used to align things.
cssObjectXpos.position.x = 200.0
cssObjectXpos.rotation.y = - Math.PI / 2

cssObjectXneg.position.x = -200.0
cssObjectXneg.rotation.y = Math.PI / 2

// for Y
cssObjectYpos.position.y = 200.0
cssObjectYpos.rotation.x = Math.PI / 2

cssObjectYneg.position.y = - 200.0
cssObjectYneg.rotation.x = - Math.PI / 2

// for Z
cssObjectZpos.position.z = 200.0
cssObjectZpos.rotation.y = Math.PI

cssObjectZneg.position.z = -200.0
//no rotation need for this one

eyeOrigin.add(cssObjectXpos)
eyeOrigin.add(cssObjectXneg)
eyeOrigin.add(cssObjectYpos)
eyeOrigin.add(cssObjectYneg)
eyeOrigin.add(cssObjectZpos)
eyeOrigin.add(cssObjectZneg)

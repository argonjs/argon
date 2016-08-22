// import * as Argon from 'argon'
// import * as Argon from '../dist/src/argon'
import * as Argon from '../src/argon'

declare const THREE: any;

window['Argon'] = Argon;

export const app = Argon.init();

// app.reality.setDesired({
//     title: 'My Custom Reality',
//     uri: Argon.resolveURL('custom_reality.html')
// })

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
app.view.element.appendChild(renderer.domElement);

// app.context.setDefaultReferenceFrame(app.context.localOriginEastUpSouth);
app.context.setDefaultReferenceFrame(app.context.localOriginEastNorthUp);

const geometry = new THREE.SphereGeometry( 30, 32, 32 );

let mat = new THREE.MeshBasicMaterial( {color: 0xff0000} );

export const posXSphere = new THREE.Mesh( geometry, mat );
posXSphere.position.x = 200;
userLocation.add( posXSphere );

mat = new THREE.MeshBasicMaterial( {color: 0xffaaaa} );

export const negXSphere = new THREE.Mesh( geometry, mat );
negXSphere.position.x = -200;
userLocation.add( negXSphere );

mat = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

export const posYSphere = new THREE.Mesh( geometry, mat );
posYSphere.position.y = 200;
userLocation.add( posYSphere );

mat = new THREE.MeshBasicMaterial( {color: 0xaaffaa} );

export const negYSphere = new THREE.Mesh( geometry, mat );
negYSphere.position.y = -200;
userLocation.add( negYSphere );

mat = new THREE.MeshBasicMaterial( {color: 0x0000ff} );

export const posZSphere = new THREE.Mesh( geometry, mat );
posZSphere.position.z = 200;
userLocation.add( posZSphere );

mat = new THREE.MeshBasicMaterial( {color: 0xaaaaff} );

export const negZSphere = new THREE.Mesh( geometry, mat );
negZSphere.position.z = -200;
userLocation.add( negZSphere );

            
var axisHelper = new THREE.AxisHelper( 10 );
userLocation.add( axisHelper );
axisHelper.position.z = 50;

var axisHelper = new THREE.AxisHelper( 10 );
userLocation.add( axisHelper );
axisHelper.position.y = -50;

// var textShapes = THREE.FontUtils.generateShapes( "PosZ", options );
// var text = new THREE.ShapeGeometry( textShapes );
// var textMesh = new THREE.Mesh( text, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) ;
// scene.add(textMesh);

app.vuforia.init({
    encryptedLicenseData: `-----BEGIN PGP MESSAGE-----
Version: OpenPGP.js v2.3.2
Comment: http://openpgpjs.org

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
0ccTFA==
=AUSQ
-----END PGP MESSAGE-----
`
}).then((api)=>{
    api.objectTracker.createDataSet('dataset/StonesAndChips.xml').then( (dataSet)=>{

        dataSet.load().then(()=>{
            const trackables = dataSet.getTrackables();
            
            const stonesEntity = app.context.subscribeToEntityById(trackables['stones'].id)
            const stonesObject = new THREE.Object3D;
            scene.add(stonesObject);
                        
            var boxGeometry = new THREE.BoxGeometry(50, 50, 50);
            var material = new THREE.MeshNormalMaterial()
            material.side = THREE.DoubleSide;
            const box = new THREE.Mesh(boxGeometry, material);
            box.position.z = 25;
            box.position.y = 50;
                        
            var axisHelper = new THREE.AxisHelper( 10 );
            box.add( axisHelper );
            
            console.log('Subscribes to stones trackable with id ' + trackables['stones'].id);

            app.context.updateEvent.addEventListener(() => {
                const stonesPose = app.context.getEntityPose(stonesEntity);

                if (stonesPose.poseStatus & Argon.PoseStatus.KNOWN) {
                    stonesObject.position.copy(stonesPose.position);
                    stonesObject.quaternion.copy(stonesPose.orientation);
                }
                
                if (stonesPose.poseStatus & Argon.PoseStatus.FOUND) {
                    stonesObject.add(box);
                } else if (stonesPose.poseStatus & Argon.PoseStatus.LOST) {
                    stonesObject.remove(box);
                }
            })
        });
        
        api.objectTracker.activateDataSet(dataSet);
    });
})

app.updateEvent.addEventListener(() => {
    const userPose = app.context.getEntityPose(app.context.user);

    if (userPose.poseStatus & Argon.PoseStatus.KNOWN) {
        user.position.copy(userPose.position);
        user.quaternion.copy(userPose.orientation);
        userLocation.position.copy(userPose.position);
    }
})
    
app.renderEvent.addEventListener(() => {
    const viewport = app.view.getViewport();
    renderer.setSize(viewport.width, viewport.height);
    
    for (let subview of app.view.getSubviews()) {
        camera.position.copy(subview.pose.position);
        camera.quaternion.copy(subview.pose.orientation);
        camera.projectionMatrix.fromArray(subview.projectionMatrix);
        let {x,y,width,height} = subview.viewport;
        renderer.setViewport(x,y,width,height);
        renderer.setScissor(x,y,width,height);
        renderer.setScissorTest(true);
        renderer.render(scene, camera);
    }
})

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

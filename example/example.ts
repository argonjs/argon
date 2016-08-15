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

wcFMA47tt+RhMWHyARAAjCQMsEFdWg+udo7+Q5ae435LS+dMAJq8oPwvMlFn
cqEZu0M1JqjFMdxn383WjN7oXB0sG30pF9ErzEIJ+fp/BGURp8l3L8qp5e+a
0MeRolFavpH9iyUZY3oGd56JkwOfgoF4lDyiO0tpsueYxAUPuHONY0YqGGyZ
xRv/Q711OaZcjg6XuIx0Ook1Dux2B/+yBTABSANwdxBAfWcg8cBoK2ZylXzR
v3pqRtivV+bnuw+BnPAx4Kp0t1yfPWRdzo1qSnOPjaNTwv7G65y4zGD5jaf6
Sb6o/kEJafoRLvp2wXVyM46fcDXQzElho6WSEfhXQdcGSfIhl15cXyi8u9+J
9P6IhLA5tF+OZ5trqN1P6lwcennMeO28eXV3CgD3QGuhCDMmw2YdGnQFHmPK
9erW840Az/PYdY0RgTuxHfl4gS/41+XL72pFYqjXaxJEDfhwT/NnCNmqUGLG
x/OjDFVlpkhPBzT+iz9Caw4+iicc6AiRhMXun9kYMcI8IkYfELvi6+C5aSXA
zRqPHVAGg/stf6jHm+wVMfIblb3nR62Ji7Kl0X3NVxXJxPVl+0eZS57G/Sk4
9y92GI8xzNese3w15LpaNSnYSiqAFHlScEj4a3r/xna/T1BBSddffMVYhuGS
Kvdee5vPMYoG8EXXuJLf8Yf9l5k3GiiAeAu8ZYWaVtjSwUMBrUSnLQWpMVhf
RbYgvjxhWm9RPMkNJXsqzUeP3jTXO5mUarHoTIpQSaWzGdFu0OYagvl4dI1S
cwkaE1MvygX3QBsr075APV+ZzQgOl0ulkH8kgQJz897MGthIfZkNf6h9zynt
A1wY6+appAAQRgl7HUAEEqLq0GWCrnz4U7kh6Bci/JRVy0XgoO/vSzmZkIXg
msPMMHhT2dznjuC9eF5iTcrCBuBxgXBvA9aYIHDdqeV/ooCVe2hwytRQGc0R
OT8Nh1EU3oDZ+3z67bcUQ6q+fF/JMle1l0lE9rt+BSZ0SFMOz/VtqV/AX9fj
wmZb0fyIHnwxoQflpzz1L2ybS3H2Bory8/eZ8bOLTDui/6KfZJsyxJwRFFCp
geqXHxg9lNd23j/LFbAMGWvZK1DCp+9xJ9lbySN126+6U6frnSAxA5k7zMb0
UHjcBDft3lvlKQaCKw2iku5iCFiafXbNngbOkikc5xyy2hjxoqbMqrb+ftRo
CpeVreuyq4Z6h0hLKJ03BR4vOn5OKuBbbTwBnE5OKmzh0ueC1QFK/nud0yef
lIE1scmi5Q0Q+iVobgQk+KLD/Cw15SQoNcwN5w9RYRbptPePNKLkS1AzyeOg
aGQjq0ARmfm+o2KNLNAafSwASnpbwP+xR+Y/EjY9YO3ZbIfr46mFmyzbdozA
dXDH5w12UOKvzA==
=YVL+
-----END PGP MESSAGE-----
`}).then((api)=>{
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

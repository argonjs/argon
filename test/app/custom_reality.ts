// import * as Argon from 'argon'
import * as Argon from '../../src/argon'

declare const THREE: any;

window['Argon'] = Argon;

export const app = Argon.initRealityViewer();

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

// app.context.defaultReferenceFrame = app.context.localOriginEastUpSouth;
app.context.defaultReferenceFrame = app.context.localOriginEastNorthUp;

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

var perspectiveProjection = new Argon.Cesium.PerspectiveFrustum();
perspectiveProjection.fov = Math.PI / 2;

function update(time:Argon.Cesium.JulianDate) {
    app.view.requestAnimationFrame(update);

    const suggestedViewState = app.view.suggestedViewState;
    if (!suggestedViewState) return;

    const frameState = app.context.createFrameState(
        time,
        suggestedViewState.viewport,
        suggestedViewState.subviews,
        app.view.eye
    );

    app.context.submitFrameState(frameState);
}
app.view.requestAnimationFrame(update)

app.updateEvent.addEventListener(() => {
    const userPose = app.context.getEntityPose(app.context.user);

    if (userPose.poseStatus & Argon.PoseStatus.KNOWN) {
        user.position.copy(userPose.position);
        user.quaternion.copy(userPose.orientation);
        userLocation.position.copy(userPose.position);
    }
})
    
app.renderEvent.addEventListener(() => {
    const viewport = app.viewport.current;
    renderer.setSize(viewport.width, viewport.height);
    
    for (let subview of app.view.getSubviews()) {
        camera.position.copy(subview.pose.position);
        camera.quaternion.copy(subview.pose.orientation);
        camera.projectionMatrix.fromArray(subview.frustum.projectionMatrix);
        let {x,y,width,height} = subview.viewport;
        renderer.setViewport(x,y,width,height);
        renderer.setScissor(x,y,width,height);
        renderer.setScissorTest(true);
        renderer.render(scene, camera);
    }
})
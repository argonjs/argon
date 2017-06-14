// import * as Argon from 'argon'
import * as Argon from '../../src/argon';
window['Argon'] = Argon;
export var app = Argon.initRealityViewer();
export var scene = new THREE.Scene();
export var camera = new THREE.PerspectiveCamera();
export var user = new THREE.Object3D();
export var userLocation = new THREE.Object3D;
scene.add(camera);
scene.add(user);
scene.add(userLocation);
var renderer = new THREE.WebGLRenderer({
    alpha: true,
    logarithmicDepthBuffer: true,
    antialias: Argon.suggestedWebGLContextAntialiasAttribute
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
app.view.element.appendChild(renderer.domElement);
// app.context.defaultReferenceFrame = app.context.localOriginEastUpSouth;
app.context.defaultReferenceFrame = app.context.localOriginEastNorthUp;
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
var perspectiveProjection = new Argon.Cesium.PerspectiveFrustum();
perspectiveProjection.fov = Math.PI / 2;
var processFrameState = function (suggestedFrameState) {
    var frameState = app.device.createContextFrameState(suggestedFrameState.time, suggestedFrameState.viewport, suggestedFrameState.subviews, app.context.user);
    app.context.submitFrameState(frameState);
};
app.device.frameStateEvent.addEventListener(processFrameState);
app.updateEvent.addEventListener(function () {
    var userPose = app.context.getEntityPose(app.context.user);
    if (userPose.status & Argon.PoseStatus.KNOWN) {
        user.position.copy(userPose.position);
        user.quaternion.copy(userPose.orientation);
        userLocation.position.copy(userPose.position);
    }
});
app.renderEvent.addEventListener(function () {
    var viewport = app.view.viewport;
    renderer.setSize(viewport.width, viewport.height);
    renderer.setPixelRatio(app.suggestedPixelRatio);
    for (var _i = 0, _a = app.view.subviews; _i < _a.length; _i++) {
        var subview = _a[_i];
        camera.position.copy(subview.pose.position);
        camera.quaternion.copy(subview.pose.orientation);
        camera.projectionMatrix.fromArray(subview.frustum.projectionMatrix);
        var _b = subview.viewport, x = _b.x, y = _b.y, width = _b.width, height = _b.height;
        renderer.setViewport(x, y, width, height);
        renderer.setScissor(x, y, width, height);
        renderer.setScissorTest(true);
        renderer.render(scene, camera);
    }
});

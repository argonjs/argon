
import { inject } from 'aurelia-dependency-injection'
import { 
    CameraEventAggregator,
    CameraEventType,
    ConstantPositionProperty,
    ConstantProperty,
    ReferenceFrame,
    Cartographic,
    Cartesian2,
    Cartesian3,
    Quaternion,
    Matrix3,
    Matrix4,
    Transforms,
    PerspectiveFrustum,
    CesiumMath
} from '../cesium/cesium-imports'
import { Role, SerializedSubviewList, CanvasViewport } from '../common'
import { SessionService } from '../session'
import { decomposePerspectiveProjectionMatrix, getEntityPositionInReferenceFrame, getEntityOrientationInReferenceFrame } from '../utils'
import { ContextService } from '../context'
import { DeviceService } from '../device'
import { ViewService } from '../view'
import { PoseStatus } from '../entity'
import { RealityViewer } from './base'

declare var ARController;
declare var THREE;

interface Movement {
    startPosition:Cartesian2; 
    endPosition:Cartesian2;
}

interface PinchMovement {
    distance: Movement;
    angleAndHeight: Movement;
}

/**
 * Note: To use this reality, an app must do the following:
 *   - Load three.js
 *   - Have a canvas element
 *   - Do not clear the canvas (e.g. set renderer.autoClear=false in three.js)
 *   - Rebind your GL state before rendering (e.g. renderer.resetGLState() in three.js)
 *   - Currently depends on the following relative files:
 *      - ../resources/artoolkit/camera_para.dat
 *      - ../resources/artoolkit/patt.hiro
 *      - ../resources/artoolkit/patt.kanji
 */

@inject(SessionService, ContextService, ViewService, DeviceService)
export class WebRTCRealityViewer extends RealityViewer {

    public type = 'webrtc';

    private _arScene;
    private _arController;
    private _renderer;

    private _aggregator:CameraEventAggregator|undefined;
    private _moveFlags = {
        moveForward : false,
        moveBackward : false,
        moveUp : false,
        moveDown : false,
        moveLeft : false,
        moveRight : false
    }

    constructor(
        private sessionService: SessionService,
        private contextService: ContextService,
        private viewService: ViewService,
        private deviceService: DeviceService,
        public uri:string) {
        super(uri);

        function getFlagForKeyCode(keyCode) {
            switch (keyCode) {
            case 'W'.charCodeAt(0):
                return 'moveForward';
            case 'S'.charCodeAt(0):
                return 'moveBackward';
            case 'E'.charCodeAt(0):
                return 'moveUp';
            case 'R'.charCodeAt(0):
                return 'moveDown';
            case 'D'.charCodeAt(0):
                return 'moveRight';
            case 'A'.charCodeAt(0):
                return 'moveLeft';
            default:
                return undefined;
            }
        }
        
        const keydownListener = (e) => {
            var flagName = getFlagForKeyCode(e.keyCode);
            if (typeof flagName !== 'undefined') {
                this._moveFlags[flagName] = true;
            }
        }

        const keyupListener = (e) => {
            var flagName = getFlagForKeyCode(e.keyCode);
            if (typeof flagName !== 'undefined') {
                this._moveFlags[flagName] = false;
            }
        }

        if (typeof document !== 'undefined') {
            this.presentChangeEvent.addEventListener(()=>{
                if (this.isPresenting) {
                    if (!this._aggregator && this.viewService.element) {
                        this.viewService.element['disableRootEvents'] = true; 
                        this._aggregator = new CameraEventAggregator(<any>this.viewService.element);
                        document.addEventListener('keydown', keydownListener, false);
                        document && document.addEventListener('keyup', keyupListener, false);
                    }
                } else {
                    this._aggregator && this._aggregator.destroy();
                    this._aggregator = undefined;
                    document && document.removeEventListener('keydown', keydownListener);
                    document && document.removeEventListener('keyup', keyupListener);
                    for (const k in this._moveFlags) {
                        this._moveFlags[k] = false;
                    }
                }
            });

            this.viewService.viewportChangeEvent.addEventListener((viewport:CanvasViewport)=>{
                this.updateViewport(viewport);
            });

            this.initARToolKit();
        }
    }

    private _scratchMatrix3 = new Matrix3;
    private _scratchMatrix4 = new Matrix4;

    public load(): void {
        const session = this.sessionService.addManagedSessionPort(this.uri);
        session.connectEvent.addEventListener(()=>{
            this.connectEvent.raiseEvent(session);
        });

        const internalSession = this.sessionService.createSessionPort(this.uri);
        internalSession.suppressErrorOnUnknownTopic = true;

        let customStagePosition:Cartesian3|undefined;
        let customStageOrientation:Quaternion|undefined;

        internalSession.on['argon.configureStage.setStageGeolocation'] = ({geolocation}:{geolocation:Cartographic}) => {
            customStagePosition = Cartesian3.fromRadians(geolocation.longitude, geolocation.latitude, geolocation.height, undefined, customStagePosition);


//            const transformMatrix = eastUpSouthToFixedFrame(customStagePosition, undefined, this._scratchMatrix4);
            const transformMatrix = Transforms.eastNorthUpToFixedFrame(customStagePosition, undefined, this._scratchMatrix4);
            const rotationMatrix = Matrix4.getRotation(transformMatrix, this._scratchMatrix3);
            customStageOrientation = Quaternion.fromRotationMatrix(rotationMatrix, customStageOrientation);
        }

        internalSession.on['argon.configureStage.resetStageGeolocation'] = () => {
            customStagePosition = undefined;
            customStageOrientation = undefined;
        }

        internalSession.connectEvent.addEventListener(() => {

            const scratchQuaternion = new Quaternion;
            const scratchQuaternionDragYaw = new Quaternion;
            // const pitchQuat = new Quaternion;
            const positionScratchCartesian = new Cartesian3;
            const movementScratchCartesian = new Cartesian3;
            const orientationMatrix = new Matrix3;
            const up = new Cartesian3(0,0,1);
            const right = new Cartesian3(1,0,0);
            const forward = new Cartesian3(0,-1,0);
            const scratchFrustum = new PerspectiveFrustum();

            const deviceStage = this.deviceService.stage;
            const deviceUser = this.deviceService.user;

            const NEGATIVE_UNIT_Z = new Cartesian3(0,0,-1);
            // const X_90ROT = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, CesiumMath.PI_OVER_TWO);

            const subviews:SerializedSubviewList = [];

            const deviceUserPose = this.contextService.createEntityPose(deviceUser, deviceStage);


            const checkSuggestedGeolocationSubscription = () => {
                if (this.deviceService.suggestedGeolocationSubscription) {
                    this.deviceService.subscribeGeolocation(this.deviceService.suggestedGeolocationSubscription, internalSession);
                } else {
                    this.deviceService.unsubscribeGeolocation();
                }
            }

            checkSuggestedGeolocationSubscription();
            
            const remove1 = this.deviceService.suggestedGeolocationSubscriptionChangeEvent.addEventListener(checkSuggestedGeolocationSubscription);

            const remove2 = this.deviceService.frameStateEvent.addEventListener((frameState) => {
                if (internalSession.isClosed) return;
                
                const aggregator = this._aggregator;
                const flags = this._moveFlags;

                if (!this.isPresenting) {
                    aggregator && aggregator.reset();
                    return;
                }

                SerializedSubviewList.clone(frameState.subviews, subviews);
                
                // provide fov controls
                if (!this.deviceService.strict) {                    
                    decomposePerspectiveProjectionMatrix(subviews[0].projectionMatrix, scratchFrustum);
                    scratchFrustum.fov = this.viewService.subviews[0] && this.viewService.subviews[0].frustum.fov || CesiumMath.PI_OVER_THREE;

                    if (aggregator && aggregator.isMoving(CameraEventType.WHEEL)) {
                        const wheelMovement = aggregator.getMovement(CameraEventType.WHEEL);
                        const diff = wheelMovement.endPosition.y;
                        scratchFrustum.fov = Math.min(Math.max(scratchFrustum.fov - diff * 0.02, Math.PI/8), Math.PI-Math.PI/8);
                    }

                    if (aggregator && aggregator.isMoving(CameraEventType.PINCH)) {
                        const pinchMovement:PinchMovement = aggregator.getMovement(CameraEventType.PINCH);
                        const diff = pinchMovement.distance.endPosition.y - pinchMovement.distance.startPosition.y;
                        scratchFrustum.fov = Math.min(Math.max(scratchFrustum.fov - diff * 0.02, Math.PI/8), Math.PI-Math.PI/8);
                    }
                    
                    subviews.forEach((s)=>{                    
                        const aspect = s.viewport.width / s.viewport.height;
                        scratchFrustum.aspectRatio = isFinite(aspect) ? aspect : 1;
                        Matrix4.clone(scratchFrustum.projectionMatrix, s.projectionMatrix);
                    });
                }

                const time = frameState.time;

                deviceUserPose.update(time);

                const overrideUser = !(deviceUserPose.status & PoseStatus.KNOWN);
                
                // provide controls if the device does not have a physical pose
                if (overrideUser) {
                    
                    const contextUser = this.contextService.user;
                    const contextStage = this.contextService.stage;

                    const position = 
                        getEntityPositionInReferenceFrame(contextUser, time, contextStage, positionScratchCartesian) || 
                        Cartesian3.fromElements(0, this.deviceService.suggestedUserHeight, 0, positionScratchCartesian);

                    let orientation = getEntityOrientationInReferenceFrame(contextUser, time, contextStage, scratchQuaternion) ||
                        Quaternion.clone(Quaternion.IDENTITY, scratchQuaternion);
                    
                    if (aggregator && aggregator.isMoving(CameraEventType.LEFT_DRAG)) {
                        const dragMovement = aggregator.getMovement(CameraEventType.LEFT_DRAG);

                        if (orientation) {
                            // const dragPitch = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, frustum.fov * (dragMovement.endPosition.y - dragMovement.startPosition.y) / app.view.getViewport().height, scratchQuaternionDragPitch);
                            const dragYaw = Quaternion.fromAxisAngle(Cartesian3.UNIT_Y, scratchFrustum.fov * (dragMovement.endPosition.x - dragMovement.startPosition.x) / frameState.viewport.width, scratchQuaternionDragYaw);
                            // const drag = Quaternion.multiply(dragPitch, dragYaw, dragYaw);

                            orientation = Quaternion.multiply(orientation, dragYaw, dragYaw);
                            (<any>contextUser.orientation).setValue(orientation);
                        }
                    }

                    Matrix3.fromQuaternion(orientation, orientationMatrix);
                    Matrix3.multiplyByVector(orientationMatrix, Cartesian3.UNIT_Y, up);
                    Matrix3.multiplyByVector(orientationMatrix, Cartesian3.UNIT_X, right);
                    Matrix3.multiplyByVector(orientationMatrix, NEGATIVE_UNIT_Z, forward);
                    
                    var moveRate = 0.02;
                    if (flags.moveForward) {
                        Cartesian3.multiplyByScalar(forward, moveRate, movementScratchCartesian);
                        Cartesian3.add(position, movementScratchCartesian, position);
                    }
                    if (flags.moveBackward) {
                        Cartesian3.multiplyByScalar(forward, -moveRate, movementScratchCartesian);
                        Cartesian3.add(position, movementScratchCartesian, position);
                    }
                    if (flags.moveUp) {
                        Cartesian3.multiplyByScalar(up, moveRate, movementScratchCartesian);
                        Cartesian3.add(position, movementScratchCartesian, position);
                    }
                    if (flags.moveDown) {
                        Cartesian3.multiplyByScalar(up, -moveRate, movementScratchCartesian);
                        Cartesian3.add(position, movementScratchCartesian, position);
                    }
                    if (flags.moveLeft) {
                        Cartesian3.multiplyByScalar(right, -moveRate, movementScratchCartesian);
                        Cartesian3.add(position, movementScratchCartesian, position);
                    }
                    if (flags.moveRight) {
                        Cartesian3.multiplyByScalar(right, moveRate, movementScratchCartesian);
                        Cartesian3.add(position, movementScratchCartesian, position);
                    }

                    (contextUser.position as ConstantPositionProperty).setValue(position, contextStage);
                    (contextUser.orientation as ConstantProperty).setValue(orientation);
                }

                const overrideStage = customStagePosition && customStageOrientation ? true : false;

                if (overrideStage) {
                    const contextStage = this.contextService.stage;
                    (contextStage.position as ConstantPositionProperty).setValue(customStagePosition, ReferenceFrame.FIXED);
                    (contextStage.orientation as ConstantProperty).setValue(customStageOrientation);
                }

                if (this._arScene) {
                    this._arScene.process();
                    this._arScene.renderOn(this._renderer);
                }

                const contextFrameState = this.contextService.createFrameState(
                    time,
                    frameState.viewport,
                    subviews,
                    {
                        overrideUser,
                        overrideStage
                    }
                );

                internalSession.send('ar.reality.frameState', contextFrameState);

                aggregator && aggregator.reset();
            });

            internalSession.closeEvent.addEventListener(()=>{
                remove1();
                remove2();
            });

        });

        // Only connect after the caller is able to attach connectEvent handlers
        Promise.resolve().then(()=>{
            if (this.sessionService.manager.isClosed) return;
            const messageChannel = this.sessionService.createSynchronousMessageChannel();
            session.open(messageChannel.port1, this.sessionService.configuration);
            internalSession.open(messageChannel.port2, { 
                role: Role.REALITY_VIEWER, 
                uri: this.uri,
                title: 'WebRTC',
                version: this.sessionService.configuration.version,
                supportsCustomProtocols: true,
                protocols: ['argon.configureStage@v1']
            });
        });
    }


    protected initARToolKit() {
        // for now we're dynamically loading these scripts
        var script = document.createElement('script');
        script.src = 'https://rawgit.com/blairmacintyre/jsartoolkit5/master/build/artoolkit.min.js';
        script.onload = () => {
            console.log("*** artoolkit.min.js loaded ***");
            var script2 = document.createElement('script');
            script2.src = 'https://rawgit.com/blairmacintyre/jsartoolkit5/master/js/artoolkit.api.js';
            script2.onload = () => {
                console.log("*** artoolkit.api.js loaded ***");
                integrateCustomARToolKit();
                this.initARController();
            }
            document.head.appendChild(script2);
        }
        document.head.appendChild(script);
    }

    protected initARController() {
        ARController.getUserMediaThreeScene({width: 240, height: 240, cameraParam: 45 * Math.PI / 180,
            onSuccess: (arScene, arController, arCamera) => {
                console.log("*** getUserMediaThreeScene success ***");

                this._arScene = arScene;
                this._arController = arController;
                this.updateViewport(<any>this.viewService.viewport);

                document.body.className = arController.orientation;
                
                var argonCanvas;
                for (const layer of this.viewService.layers) {
                    if (layer.source instanceof HTMLCanvasElement) {
                        argonCanvas = layer.source;
                    }
                }

                if (argonCanvas) {
                    // found an existing canvas, use it
                    console.log("Found argon canvas, video background is sharing its context");
                    this._renderer = new THREE.WebGLRenderer({canvas: argonCanvas, antialias: false});

                } else {
                    // no canvas, create a new one
                    console.log("No argon canvas, creating one for video background");
                    var renderer = new THREE.WebGLRenderer({antialias: false});

                    // Note: This code will need to be updated, we want the canvas to fill the screen
                    if (arController.orientation === 'portrait') {
                        var w = (window.innerWidth / arController.videoHeight) * arController.videoWidth;
                        var h = window.innerWidth;
                        renderer.setSize(w, h);
                        renderer.domElement.style.paddingBottom = (w-h) + 'px';
                    } else {
                        if (/Android|mobile|iPad|iPhone/i.test(navigator.userAgent)) {
                            renderer.setSize(window.innerWidth, (window.innerWidth / arController.videoWidth) * arController.videoHeight);
                        } else {
                            renderer.setSize(arController.videoWidth, arController.videoHeight);
                            document.body.className += ' desktop';
                        }
                    }

                    document.body.insertBefore(renderer.domElement, document.body.firstChild);
                    this._renderer = renderer;
                }

                // objects for debugging
                var sphere = new THREE.Mesh(
                    new THREE.SphereGeometry(0.5, 8, 8),
                    new THREE.MeshNormalMaterial()
                );
                sphere.material.shading = THREE.FlatShading;
                sphere.position.z = 0.5;

                var torus = new THREE.Mesh(
                    new THREE.TorusGeometry(0.3, 0.2, 8, 8),
                    new THREE.MeshNormalMaterial()
                );
                torus.material.shading = THREE.FlatShading;
                torus.position.z = 0.5;
                torus.rotation.x = Math.PI/2;

                // we may want to hardcode these two markers for the first pass
                arController.loadMarker('../resources/artoolkit/patt.hiro', function(markerId) {
                    var markerRoot = arController.createThreeMarker(markerId);
                    markerRoot.add(sphere);
                    arScene.scene.add(markerRoot);
                }, function(error) {
                    console.log(error.name + ": " + error.message);
                });

                arController.loadMarker('../resources/artoolkit/patt.kanji', function(markerId) {
                    var markerRoot = arController.createThreeMarker(markerId);
                    markerRoot.add(torus);
                    arScene.scene.add(markerRoot);
                }, function(error) {
                    console.log(error.name + ": " + error.message);
                });
            }});
    }

    protected updateViewport(viewport:CanvasViewport) {
        if (!this._arController) return;
        console.log("updateViewport size: " + viewport.width + ", " + viewport.height);
        console.log("camera image size: " + this._arController.image.videoWidth + ", " + this._arController.image.videoHeight);
        let canvasAspect = viewport.width / viewport.height;
        let cameraAspect = this._arController.image.videoWidth / this._arController.image.videoHeight;
        console.log("canvasAspect: " + canvasAspect);
        console.log("cameraAspect: " + cameraAspect);
        // Scale the video plane to aspect fill the screen
        if (canvasAspect > cameraAspect) {
            // canvas is wider than camera image
            console.log("canvas is wider than camera image");
            this._arScene.videoPlane.scale.x = 1;
            this._arScene.videoPlane.scale.y = canvasAspect/cameraAspect;
        } else {
            // camera image is wider than canvas
            console.log("camera image is wider than canvas");
            this._arScene.videoPlane.scale.x = cameraAspect/canvasAspect;
            this._arScene.videoPlane.scale.y = 1;
        }
        // Note: We still need to fix tracking to work with this new "camera viewport"
        this.updateProjection(viewport);
    }

    protected updateProjection(viewport:CanvasViewport) {
        const scratchFrustum = new PerspectiveFrustum();
        var projMatrix = Matrix4.fromArray(this._arController.getCameraMatrix());

        console.log("ARToolKit projection:")
        console.log(Matrix4.toArray(projMatrix)); // toString method gives a transposed matrix! this is a safer way to print

        // this is required for Cesium to accept this matrix
        projMatrix[4] *= -1; // x
        projMatrix[5] *= -1; // y
        projMatrix[6] *= -1; // z
        projMatrix[7] *= -1; // w

        projMatrix[8] *= -1;  // x
        projMatrix[9] *= -1;  // y
        projMatrix[10] *= -1; // z
        projMatrix[11] *= -1; // w

        console.log("Cesium-ready projection:");
        console.log(Matrix4.toArray(projMatrix));

        try {
            console.log("BEFORE:");
            decomposePerspectiveProjectionMatrix(projMatrix, scratchFrustum);
            console.log("projMatrix aspect: " + scratchFrustum.aspectRatio);
            console.log("projMatrix fov: " + scratchFrustum.fov);
            console.log("projMatrix near: " + scratchFrustum.near);
            console.log("projMatrix far: " + scratchFrustum.far);
            console.log("projMatrix fovy: " + scratchFrustum.fovy);
        } catch(e) {
            console.log("*** error: " + e);
        }

        // TDOD: adjust the fov in case the camera image is not square

        var viewportAspect = viewport.width / viewport.height;
        scratchFrustum.aspectRatio = viewportAspect;

        projMatrix = scratchFrustum.projectionMatrix;

        try {
            console.log("AFTER:");
            decomposePerspectiveProjectionMatrix(projMatrix, scratchFrustum);
            console.log("projMatrix aspect: " + scratchFrustum.aspectRatio);
            console.log("projMatrix fov: " + scratchFrustum.fov);
            console.log("projMatrix near: " + scratchFrustum.near);
            console.log("projMatrix far: " + scratchFrustum.far);
            console.log("projMatrix fovy: " + scratchFrustum.fovy);
        } catch(e) {
            console.log("*** error: " + e);
        }

        // undo what we did earlier
        // Note: to make this work with argon we won't want to undo these changes
        // BUT, we'll have to figure out how to modify the target poses to work with this new projection
        projMatrix[4] *= -1; // x
        projMatrix[5] *= -1; // y
        projMatrix[6] *= -1; // z
        projMatrix[7] *= -1; // w

        projMatrix[8] *= -1;  // x
        projMatrix[9] *= -1;  // y
        projMatrix[10] *= -1; // z
        projMatrix[11] *= -1; // w

        // threejs fromArray creates a column-major matrix
        console.log("Original Camera Matrix:");
        console.log(this._arController.getCameraMatrix());
        this._arScene.camera.projectionMatrix.fromArray(projMatrix);
        console.log("Final Projection Matrix:");
        console.log(this._arScene.camera.projectionMatrix);
    }
}

var integrateCustomARToolKit = function() {

    /**
     *  Override the artoolkit.api.js getUserMedia function (it is out of date)
     *  This is taken from AR.js (THREEx.ArToolkitSource.prototype._initSourceWebcam)
     * */
    ARController.getUserMedia = function(configuration) {

		var onSuccess = configuration.onSuccess;
		var onError = configuration.onError || function(err) { console.error("ARController.getUserMedia", err); };

        // TODO make it static
        navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        var domElement = document.createElement('video');
        domElement.style.width = configuration.width+'px'
        domElement.style.height = configuration.height+'px'


        if (navigator.getUserMedia === undefined ){
            alert("WebRTC issue! navigator.getUserMedia not present in your browser");		
        }
        if (navigator.mediaDevices === undefined || navigator.mediaDevices.enumerateDevices === undefined ){
            alert("WebRTC issue! navigator.mediaDevices.enumerateDevices not present in your browser");		
        }

        navigator.mediaDevices.enumerateDevices().then(function(devices) {
            // define getUserMedia() constraints
            var constraints = {
                audio: false,
                video: {
                    mandatory: {
                        maxWidth: configuration.width,
                        maxHeight: configuration.height
                        }
                }
            }

            devices.forEach(function(device) {
                if( device.kind !== 'videoinput' )	return

                // TODO super unclear how to get the backward facing camera...

                // Note: this code grabs the last camera in the list (not guaranteed to be the back-facing one, but it seems to work)

                //if( constraints.video.optional !== undefined )	return
                constraints.video.optional = [{sourceId: device.deviceId}]
            });

            // OLD API
                    // it it finds the videoSource 'environment', modify constraints.video
                    // for (var i = 0; i != sourceInfos.length; ++i) {
                    //         var sourceInfo = sourceInfos[i];
                    //         if(sourceInfo.kind == "video" && sourceInfo.facing == "environment") {
                    //                 constraints.video.optional = [{sourceId: sourceInfo.id}]
                    //         }
                    // }

            navigator.getUserMedia(constraints, function success(stream) {
                // console.log('success', stream);
                domElement.src = window.URL.createObjectURL(stream);
                // to start the video, when it is possible to start it only on userevent. like in android
                document.body.addEventListener('click', function(){
                    domElement.play();
                })
                // domElement.play();
            
                //wait until the video stream is ready
                var interval = setInterval(function() {
                    if (!domElement.videoWidth)	return;
                    console.log("video element: " + domElement.videoWidth + ", " + domElement.videoHeight);
                    //onReady()
                    onSuccess(domElement);
                    clearInterval(interval)
                }, 1000/50);
            }, function(error) {
                console.log("Can't access user media", error);
                alert("Can't access user media :()");
                onError("Can't access user media", error);
            });
        }).catch(function(err) {
            console.log(err.name + ": " + err.message);
            onError(err.name + ": " + err.message);
        });

        return domElement
    }


    /**
     * The rest of these functions are taken directly from artoolkit.three.js
     * This is a quick way to play with the code, but we should move it when finished
     * Changes:
     *   - matrix.elements.set -> matrix.fromArray (to be compatible with newer versions of THREE)
     *   - Added renderer.resetGLState() to the beginning of the render pass
     *   - Changed the orthographic camera to have a unit sized viewport
     *   - Changed video plane to a unit size plane
     * 
     *  Note: We should remove the logic for converting markers to threejs objects
     */

    /**
        Helper for setting up a Three.js AR scene using the device camera as input.
        Pass in the maximum dimensions of the video you want to process and onSuccess and onError callbacks.

        On a successful initialization, the onSuccess callback is called with an ThreeARScene object.
        The ThreeARScene object contains two THREE.js scenes (one for the video image and other for the 3D scene)
        and a couple of helper functions for doing video frame processing and AR rendering.

        Here's the structure of the ThreeARScene object:
        {
            scene: THREE.Scene, // The 3D scene. Put your AR objects here.
            camera: THREE.Camera, // The 3D scene camera.

            arController: ARController,

            video: HTMLVideoElement, // The userMedia video element.

            videoScene: THREE.Scene, // The userMedia video image scene. Shows the video feed.
            videoCamera: THREE.Camera, // Camera for the userMedia video scene.

            process: function(), // Process the current video frame and update the markers in the scene.
            renderOn: function( THREE.WebGLRenderer ) // Render the AR scene and video background on the given Three.js renderer.
        }

        You should use the arScene.video.videoWidth and arScene.video.videoHeight to set the width and height of your renderer.

        In your frame loop, use arScene.process() and arScene.renderOn(renderer) to do frame processing and 3D rendering, respectively.

        @param {number} width - The maximum width of the userMedia video to request.
        @param {number} height - The maximum height of the userMedia video to request.
        @param {function} onSuccess - Called on successful initialization with an ThreeARScene object.
        @param {function} onError - Called if the initialization fails with the error encountered.
    */
    ARController.getUserMediaThreeScene = function(configuration) {
        var obj = {};
        for (var i in configuration) {
            obj[i] = configuration[i];
        }
        var onSuccess = configuration.onSuccess;

        obj.onSuccess = function(arController, arCameraParam) {
            arController.setProjectionNearPlane(0.01); // this does nothing...
            arController.setProjectionFarPlane(100000); // this does nothing...
            var scenes = arController.createThreeScene();
            onSuccess(scenes, arController, arCameraParam);
        };

        var video = this.getUserMediaARController(obj); // this is in artoolkit.api.js
        return video;
    };

    /**
        Creates a Three.js scene for use with this ARController.

        Returns a ThreeARScene object that contains two THREE.js scenes (one for the video image and other for the 3D scene)
        and a couple of helper functions for doing video frame processing and AR rendering.

        Here's the structure of the ThreeARScene object:
        {
            scene: THREE.Scene, // The 3D scene. Put your AR objects here.
            camera: THREE.Camera, // The 3D scene camera.

            arController: ARController,

            video: HTMLVideoElement, // The userMedia video element.

            videoScene: THREE.Scene, // The userMedia video image scene. Shows the video feed.
            videoCamera: THREE.Camera, // Camera for the userMedia video scene.

            process: function(), // Process the current video frame and update the markers in the scene.
            renderOn: function( THREE.WebGLRenderer ) // Render the AR scene and video background on the given Three.js renderer.
        }

        You should use the arScene.video.videoWidth and arScene.video.videoHeight to set the width and height of your renderer.

        In your frame loop, use arScene.process() and arScene.renderOn(renderer) to do frame processing and 3D rendering, respectively.

        @param video Video image to use as scene background. Defaults to this.image
    */
    ARController.prototype.createThreeScene = function(video) {
        video = video || this.image; // we're using this.image (set in ARController.getUserMediaARController)

        this.setupThree();

        // To display the video, first create a texture from it.
        var videoTex = new THREE.Texture(video);

        videoTex.minFilter = THREE.LinearFilter;
        videoTex.flipY = false;

        // Then create a plane textured with the video.
        var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1, 1),
            new THREE.MeshBasicMaterial({map: videoTex, side: THREE.DoubleSide})
        );

        // The video plane shouldn't care about the z-buffer.
        plane.material.depthTest = false;
        plane.material.depthWrite = false;

        // Create a camera and a scene for the video plane and
        // add the camera and the video plane to the scene.
        var videoCamera = new THREE.OrthographicCamera(-0.5, 0.5, -0.5, 0.5, -0.5, 0.5);
        var videoScene = new THREE.Scene();
        videoScene.add(plane);
        videoScene.add(videoCamera);

        if (this.orientation === 'portrait') {
            plane.rotation.z = Math.PI/2;
        }

        var scene = new THREE.Scene();
        var camera = new THREE.Camera();
        camera.matrixAutoUpdate = false;
        camera.projectionMatrix.fromArray(this.getCameraMatrix());

        scene.add(camera);


        var self = this;

        return {
            scene: scene,
            videoScene: videoScene,
            camera: camera,
            videoCamera: videoCamera,

            arController: this,

            video: video,
            videoPlane: plane,

            process: function() {
                for (var i in self.threePatternMarkers) {
                    self.threePatternMarkers[i].visible = false;
                }
                for (var i in self.threeBarcodeMarkers) {
                    self.threeBarcodeMarkers[i].visible = false;
                }
                for (var i in self.threeMultiMarkers) {
                    self.threeMultiMarkers[i].visible = false;
                    for (var j=0; j<self.threeMultiMarkers[i].markers.length; j++) {
                        if (self.threeMultiMarkers[i].markers[j]) {
                            self.threeMultiMarkers[i].markers[j].visible = false;
                        }
                    }
                }
                self.process(video);
            },

            renderOn: function(renderer) {
                renderer.resetGLState();
                videoTex.needsUpdate = true;

                var ac = renderer.autoClear;
                renderer.autoClear = false;
                renderer.clear();
                renderer.render(this.videoScene, this.videoCamera);
                renderer.render(this.scene, this.camera);
                renderer.autoClear = ac;
            }
        };
    };


    /**
        Creates a Three.js marker Object3D for the given marker UID.
        The marker Object3D tracks the marker pattern when it's detected in the video.

        Use this after a successful artoolkit.loadMarker call:

        arController.loadMarker('/bin/Data/patt.hiro', function(markerUID) {
            var markerRoot = arController.createThreeMarker(markerUID);
            markerRoot.add(myFancyHiroModel);
            arScene.scene.add(markerRoot);
        });

        @param {number} markerUID The UID of the marker to track.
        @param {number} markerWidth The width of the marker, defaults to 1.
        @return {THREE.Object3D} Three.Object3D that tracks the given marker.
    */
    ARController.prototype.createThreeMarker = function(markerUID, markerWidth) {
        this.setupThree();
        var obj = new THREE.Object3D();
        obj.markerTracker = this.trackPatternMarkerId(markerUID, markerWidth);
        obj.matrixAutoUpdate = false;
        this.threePatternMarkers[markerUID] = obj;
        return obj;
    };

    /**
        Creates a Three.js marker Object3D for the given multimarker UID.
        The marker Object3D tracks the multimarker when it's detected in the video.

        Use this after a successful arController.loadMarker call:

        arController.loadMultiMarker('/bin/Data/multi-barcode-4x3.dat', function(markerUID) {
            var markerRoot = arController.createThreeMultiMarker(markerUID);
            markerRoot.add(myFancyMultiMarkerModel);
            arScene.scene.add(markerRoot);
        });

        @param {number} markerUID The UID of the marker to track.
        @return {THREE.Object3D} Three.Object3D that tracks the given marker.
    */
    ARController.prototype.createThreeMultiMarker = function(markerUID) {
        this.setupThree();
        var obj = new THREE.Object3D();
        obj.matrixAutoUpdate = false;
        obj.markers = [];
        this.threeMultiMarkers[markerUID] = obj;
        return obj;
    };

    /**
        Creates a Three.js marker Object3D for the given barcode marker UID.
        The marker Object3D tracks the marker pattern when it's detected in the video.

        var markerRoot20 = arController.createThreeBarcodeMarker(20);
        markerRoot20.add(myFancyNumber20Model);
        arScene.scene.add(markerRoot20);

        var markerRoot5 = arController.createThreeBarcodeMarker(5);
        markerRoot5.add(myFancyNumber5Model);
        arScene.scene.add(markerRoot5);

        @param {number} markerUID The UID of the barcode marker to track.
        @param {number} markerWidth The width of the marker, defaults to 1.
        @return {THREE.Object3D} Three.Object3D that tracks the given marker.
    */
    ARController.prototype.createThreeBarcodeMarker = function(markerUID, markerWidth) {
        this.setupThree();
        var obj = new THREE.Object3D();
        obj.markerTracker = this.trackBarcodeMarkerId(markerUID, markerWidth);
        obj.matrixAutoUpdate = false;
        this.threeBarcodeMarkers[markerUID] = obj;
        return obj;
    };

    ARController.prototype.setupThree = function() {
        if (this.THREE_JS_ENABLED) {
            return;
        }
        this.THREE_JS_ENABLED = true;

        /*
            Listen to getMarker events to keep track of Three.js markers.
        */
        this.addEventListener('getMarker', function(ev) {
            var marker = ev.data.marker;
            var obj;
            if (ev.data.type === artoolkit.PATTERN_MARKER) {
                obj = this.threePatternMarkers[ev.data.marker.idPatt];

            } else if (ev.data.type === artoolkit.BARCODE_MARKER) {
                obj = this.threeBarcodeMarkers[ev.data.marker.idMatrix];

            }
            if (obj) {
                var pose = ev.data.matrix;

                // I think we need to modify the pose to work with the Cesium-ready projection
                // But this naive approach does not work
                /*
                pose[4] *= -1; // x
                pose[5] *= -1; // y
                pose[6] *= -1; // z
                pose[7] *= -1; // w

                pose[8] *= -1;  // x
                pose[9] *= -1;  // y
                pose[10] *= -1; // z
                pose[11] *= -1; // w
                */

                obj.matrix.fromArray(pose);
                obj.visible = true;
            }
        });

        /*
            Listen to getMultiMarker events to keep track of Three.js multimarkers.
        */
        this.addEventListener('getMultiMarker', function(ev) {
            var obj = this.threeMultiMarkers[ev.data.multiMarkerId];
            if (obj) {
                obj.matrix.fromArray(ev.data.matrix);
                obj.visible = true;
            }
        });

        /*
            Listen to getMultiMarkerSub events to keep track of Three.js multimarker submarkers.
        */
        this.addEventListener('getMultiMarkerSub', function(ev) {
            var marker = ev.data.multiMarkerId;
            var subMarkerID = ev.data.markerIndex;
            var subMarker = ev.data.marker;
            var obj = this.threeMultiMarkers[marker];
            if (obj && obj.markers && obj.markers[subMarkerID]) {
                var sub = obj.markers[subMarkerID];
                sub.matrix.fromArray(ev.data.matrix);
                sub.visible = (subMarker.visible >= 0);
            }
        });

        /**
            Index of Three.js pattern markers, maps markerID -> THREE.Object3D.
        */
        this.threePatternMarkers = {};

        /**
            Index of Three.js barcode markers, maps markerID -> THREE.Object3D.
        */
        this.threeBarcodeMarkers = {};

        /**
            Index of Three.js multimarkers, maps markerID -> THREE.Object3D.
        */
        this.threeMultiMarkers = {};
    };
};

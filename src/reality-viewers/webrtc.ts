
import { inject, Container } from 'aurelia-dependency-injection'
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
    PerspectiveFrustum,
    CesiumMath,
    Entity
} from '../cesium/cesium-imports'
import { Configuration, Role, SerializedSubviewList, CanvasViewport, DEFAULT_NEAR_PLANE, DEFAULT_FAR_PLANE } from '../common'
import { SessionService, ConnectService, SessionConnectService, Message } from '../session'
import { 
    eastUpSouthToFixedFrame, 
    decomposePerspectiveProjectionMatrix, 
    getEntityPositionInReferenceFrame, 
    getEntityOrientationInReferenceFrame 
} from '../utils'
import { EntityService } from '../entity'
import { ContextService } from '../context'
import { DeviceService } from '../device'
import { ViewService } from '../view'
import { PoseStatus } from '../entity'
import { RealityViewer } from './base'
import { RealityService } from '../reality'
import { VisibilityService } from '../visibility'

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
 * Note: To use this reality, an app must load three.js
 * 
 * To share a canvas, an app must do the following:
 *   - Have a canvas element
 *   - Call Argon.init with sharedCanvas=true
 *   - Register the canvas element via setLayers
 *   - Do not clear the canvas (e.g. set renderer.autoClear=false in three.js)
 *   - Rebind GL state before rendering (e.g. renderer.resetGLState() in three.js)
 */

@inject(SessionService, ViewService, ContextService, Container)
export class WebRTCRealityViewer extends RealityViewer {

    public type = 'webrtc';

    private _arScene;
    private _arController;
    private _renderer;
    private _sharedCanvasFinal = false;

    private _scratchCartesian = new Cartesian3();
    private _scratchQuaternion = new Quaternion();

    private _artoolkitTrackerEntity = new Entity({
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.contextService.user),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    });

    private _artoolkitProjection:Matrix4|undefined;

    private _markerEntities = new Map<string,Entity>();

    private _resolveReady:Function;
    private _rejectReady:Function;
    private _artoolkitReady:Promise<void>;

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
        private viewService: ViewService,
        private contextService: ContextService,
        private container: Container,
        public uri:string) {
        super(uri);

        this._artoolkitReady = new Promise<void>((resolve, reject) => {
            this._resolveReady = resolve;
            this._rejectReady = reject;
        });

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
                    this.viewService.element.style.backgroundColor = 'white';
                    if (!this._aggregator && this.viewService.element) {
                        this.viewService.element['disableRootEvents'] = true; 
                        this._aggregator = new CameraEventAggregator(<any>this.viewService.element);
                        document.addEventListener('keydown', keydownListener, false);
                        document && document.addEventListener('keyup', keyupListener, false);
                    }
                } else {
                    delete this.viewService.element.style.backgroundColor;
                    this._aggregator && this._aggregator.destroy();
                    this._aggregator = undefined;
                    document && document.removeEventListener('keydown', keydownListener);
                    document && document.removeEventListener('keyup', keyupListener);
                    for (const k in this._moveFlags) {
                        this._moveFlags[k] = false;
                    }
                }
            });
        }

        this.viewService.viewportChangeEvent.addEventListener((viewport:CanvasViewport)=>{
            this.updateViewport(viewport);
        });

        // for now, initialize artoolkit here
        // eventually we want to decouple video setup from artoolkit setup
        // and only initialize the video here
        this.initARToolKit().then(()=>{
            this._resolveReady();
        }, (error) => {
            this._rejectReady(error);
        });
    }

    private _scratchMatrix3 = new Matrix3;
    private _scratchMatrix4 = new Matrix4;

    public load(): void {
        // Create a child container so that we can conveniently setup all the services
        // that would exist in a normal hosted reality viewer 
        const child = this.container.createChild();

        // Create the session instance that will be used by the manager to talk to the reality 
        const session = this.sessionService.addManagedSessionPort(this.uri);
        session.connectEvent.addEventListener(()=>{
            this.connectEvent.raiseEvent(session); // let the manager know the session is ready
        });

        // use a SessionConnectService to create a connection via the session instance we created
        child.registerInstance(ConnectService, 
            new SessionConnectService(session, this.sessionService.configuration)
        );

        // setup the configuration for our webrtc reality
        child.registerInstance(Configuration, { 
            role: Role.REALITY_VIEWER, 
            uri: this.uri,
            title: 'WebRTC',
            version: this.sessionService.configuration.version,
            supportsCustomProtocols: true,
            protocols: ['ar.configureStage@v1', 'ar.jsartoolkit'],
            sharedCanvas: true
        });

        // Create the basic services that we need to use. 
        // Note: we won't create a child ViewService here,
        // as we are already managing the DOM with the
        // ViewService that exists in the root container. 
        child.autoRegisterAll([SessionService, EntityService, VisibilityService, ContextService, DeviceService, RealityService]);
        const childContextService = child.get(ContextService) as ContextService;
        const childDeviceService = child.get(DeviceService) as DeviceService;
        const childSessionService = child.get(SessionService) as SessionService;
        const childRealityService = child.get(RealityService) as RealityService;
        const childViewService = child.get(ViewService) as ViewService;

        // the child device service should *not* submit frames to the vrdisplay. 
        childDeviceService.autoSubmitFrame = false;
        
        let customStagePosition:Cartesian3|undefined;
        let customStageOrientation:Quaternion|undefined;

        // Create protocol handlers for `ar.configureStage` protocol
        childRealityService.connectEvent.addEventListener((session)=>{

            session.on['ar.configureStage.setStageGeolocation'] = ({geolocation}:{geolocation:Cartographic}) => {
                customStagePosition = Cartesian3.fromRadians(geolocation.longitude, geolocation.latitude, geolocation.height, undefined, customStagePosition);
                const transformMatrix = eastUpSouthToFixedFrame(customStagePosition, undefined, this._scratchMatrix4);
                const rotationMatrix = Matrix4.getRotation(transformMatrix, this._scratchMatrix3);
                customStageOrientation = Quaternion.fromRotationMatrix(rotationMatrix, customStageOrientation);
            }

            session.on['ar.configureStage.resetStageGeolocation'] = () => {
                customStagePosition = undefined;
                customStageOrientation = undefined;
            }

            session.on['ar.jsartoolkit.init'] = () => {
                console.log("*** ar.jsartoolkit.init ***");
                return new Promise<void>((resolve, reject)=>{
                    //this.initARToolKit().then(()=>{  // use this once video and artoolkit are decoupled
                    this._artoolkitReady.then(()=>{

                        /**
                         * _artoolkitTrackerEntity matches the user position but does not rotate as the device rotates
                         * it also rotates the artoolkit content to match our preferred coordinate system,
                         * where +X is right, +Y is down, and +Z is in the camera direction
                         */
                        const x180 = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, CesiumMath.PI);
                        (this._artoolkitTrackerEntity.orientation as ConstantProperty).setValue(x180);

                        // this is only called when markers are visible
                        this._arController.addEventListener('getMarker', (ev) => {
                            const marker = ev.data.marker;
                            const id = this._getIdForMarker(marker.id);
                            const entity:Entity|undefined = this.contextService.entities.getById(id);

                            if (entity) {
                                const pose = ev.data.matrix;
                                const position = Matrix4.getTranslation(pose, this._scratchCartesian);
                                const rotationMatrix = Matrix4.getRotation(pose, this._scratchMatrix3);
                                const orientation = Quaternion.fromRotationMatrix(rotationMatrix, this._scratchQuaternion);

                                if (entity.position instanceof ConstantPositionProperty) {
                                    entity.position.setValue(position, this._artoolkitTrackerEntity);
                                } else {
                                    entity.position = new ConstantPositionProperty(position, this._artoolkitTrackerEntity);
                                }

                                if (entity.orientation instanceof ConstantProperty) {
                                    entity.orientation.setValue(orientation);
                                } else {
                                    entity.orientation = new ConstantProperty(orientation);
                                }
                            }
                        });
                        
                        resolve();
                    }, (error) => {
                        console.log(error);
                        reject(error);
                    });
                });
            }

            session.on['ar.jsartoolkit.addMarker'] = (msg) => {
                console.log("*** ar.jsartoolkit.addMarker ***");
                console.log("*** url: " + msg.url);
                const promise = new Promise<Message>((resolve, reject)=>{
                    this._arController.loadMarker(msg.url, (markerId) => {
                        // TODO: handle size of markers
                        var id = this._getIdForMarker(markerId);
                        var entity = new Entity({id});
                        this.contextService.entities.add(entity);
                        this._markerEntities.set(id, entity);
                        resolve({id: id});
                    }, (error) => {
                        console.log(error);
                        reject(error);
                    });
                });
                return promise;
            }

            // TODO: add support for barcode markers and multimarkers

        });

        // Setup everything after connected to the manager. The manager only connects once.
        childSessionService.manager.connectEvent.addEventListener(()=>{

            // since we aren't create a child view service and viewport service, 
            // suppress any errors from not handling these messages
            childSessionService.manager.suppressErrorOnUnknownTopic = true;
            
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

            const deviceStage = childDeviceService.stage;
            const deviceUser = childDeviceService.user;

            const NEGATIVE_UNIT_Z = new Cartesian3(0,0,-1);
            // const X_90ROT = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, CesiumMath.PI_OVER_TWO);

            const subviews:SerializedSubviewList = [];

            const deviceUserPose = childContextService.createEntityPose(deviceUser, deviceStage);


            const checkSuggestedGeolocationSubscription = () => {
                if (childDeviceService.suggestedGeolocationSubscription) {
                    childDeviceService.subscribeGeolocation(childDeviceService.suggestedGeolocationSubscription);
                } else {
                    childDeviceService.unsubscribeGeolocation();
                }
            }

            checkSuggestedGeolocationSubscription();
            
            const remove1 = childDeviceService.suggestedGeolocationSubscriptionChangeEvent.addEventListener(checkSuggestedGeolocationSubscription);

            const remove2 = childDeviceService.frameStateEvent.addEventListener((frameState) => {
                if (childSessionService.manager.isClosed) return;
                
                const aggregator = this._aggregator;
                const flags = this._moveFlags;

                if (!this.isPresenting) {
                    aggregator && aggregator.reset();
                    return;
                }

                SerializedSubviewList.clone(frameState.subviews, subviews);
                
                // provide fov controls
                if (!childDeviceService.strict) {                    
                    decomposePerspectiveProjectionMatrix(subviews[0].projectionMatrix, scratchFrustum);
                    scratchFrustum.fov = childViewService.subviews[0] && childViewService.subviews[0].frustum.fov || CesiumMath.PI_OVER_THREE;

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
                        // TODO: remove logic above, but note that _artoolkitProjection is not immediately ready
                        if (this._artoolkitProjection) Matrix4.clone(this._artoolkitProjection, s.projectionMatrix);
                    });
                }

                const time = frameState.time;

                deviceUserPose.update(time);

                const overrideUser = !(deviceUserPose.status & PoseStatus.KNOWN);
                
                // provide controls if the device does not have a physical pose
                if (overrideUser) {
                    
                    const contextUser = childContextService.user;
                    const contextStage = childContextService.stage;

                    const position = 
                        getEntityPositionInReferenceFrame(contextUser, time, contextStage, positionScratchCartesian) || 
                        Cartesian3.fromElements(0, childDeviceService.suggestedUserHeight, 0, positionScratchCartesian);

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
                    const contextStage = childContextService.stage;
                    (contextStage.position as ConstantPositionProperty).setValue(customStagePosition, ReferenceFrame.FIXED);
                    (contextStage.orientation as ConstantProperty).setValue(customStageOrientation);
                }

                if (this._arScene) {
                    this._resetMarkers();
                    this._arScene.process();
                    this._arScene.renderOn(this._renderer);
                }

                const contextFrameState = childContextService.createFrameState(
                    time,
                    frameState.viewport,
                    subviews,
                    {
                        overrideUser,
                        overrideStage
                    }
                );
                childContextService.submitFrameState(contextFrameState);

                aggregator && aggregator.reset();
            });

            childSessionService.manager.closeEvent.addEventListener(()=>{
                remove1();
                remove2();
            });

        })


        childSessionService.connect();
    }


    private _getIdForMarker(markerUID): string {
        return "jsartoolkit_marker_" + markerUID;
    }

    private _resetMarkers() {
        // jsartoolkit does not currently have a marker lost event
        // for now, clear poses each frame before processing
        this._markerEntities.forEach((entity, id, map) => {
            entity.position = undefined;
            entity.orientation = undefined;
        });
    }

    protected initARToolKit():Promise<void> {
        return new Promise<void>((resolve, reject) => {
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
                    this.initARController().then(()=>{
                        resolve();
                    }, (error) => {
                        reject(error);
                    });
                }
                document.head.appendChild(script2);
            }
            document.head.appendChild(script);
        });
    }

    protected initARController():Promise<void> {
        return new Promise<void>((resolve, reject) => {
            ARController.getUserMediaThreeScene({width: 240, height: 240, cameraParam: 45 * Math.PI / 180,
                onSuccess: (arScene, arController, arCamera) => {
                    console.log("*** getUserMediaThreeScene success ***");

                    this._arScene = arScene;
                    this._arController = arController;
                    this.updateViewport(<any>this.viewService.viewport);

                    document.body.className = arController.orientation;
                    
                    var argonCanvas;
                    if (this.viewService.layers) {
                        for (const layer of this.viewService.layers) {
                            if (layer.source instanceof HTMLCanvasElement) {
                                argonCanvas = layer.source;
                            }
                        }
                    }

                    if (this.isSharedCanvas && !argonCanvas) {
                        console.log("sharedCanvas is true but no canvas registered with setLayers");
                        //this._sharedCanvas = false; // currently the RealityServiceProvider overwrites this each frame
                    }

                    if (this.isSharedCanvas && argonCanvas) {
                        // found an existing canvas, use it
                        console.log("Found argon canvas, video background is sharing its context");
                        this._renderer = new THREE.WebGLRenderer({canvas: argonCanvas, antialias: false});
                        this._sharedCanvasFinal = true;

                    } else {
                        // no canvas, create a new one
                        console.log("No argon shared canvas, creating one for video background");
                        var renderer = new THREE.WebGLRenderer({antialias: false});
                        renderer.setSize(this.viewService.renderWidth, this.viewService.renderHeight, true);
                        this.viewService.element.insertBefore(renderer.domElement, this.viewService.element.firstChild);
                        renderer.domElement.style.zIndex = '0';
                        this._renderer = renderer;
                        this._sharedCanvasFinal = false;
                    }

                    resolve();
                },
                onError: (error) => {
                    reject(error);
                }
            });
        });
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
        // Resize the canvas if we own it
        if (!this._sharedCanvasFinal && this._renderer) {
            this._renderer.setSize(this.viewService.renderWidth, this.viewService.renderHeight, true);
        }
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
        scratchFrustum.near = DEFAULT_NEAR_PLANE;
        scratchFrustum.far = DEFAULT_FAR_PLANE;

        projMatrix = scratchFrustum.projectionMatrix;

        this._artoolkitProjection = Matrix4.clone(projMatrix);

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
        navigator.getUserMedia  = navigator.getUserMedia || (<any>navigator).webkitGetUserMedia || (<any>navigator).mozGetUserMedia || (<any>navigator).msGetUserMedia;

        var domElement = document.createElement('video');
        domElement.style.width = configuration.width+'px'
        domElement.style.height = configuration.height+'px'


        if (navigator.getUserMedia === undefined ){
            onError('browser does not support navigator.getUserMedia');
            return;
        }
        if (navigator.mediaDevices === undefined || navigator.mediaDevices.enumerateDevices === undefined ){
            onError('browser does not support navigator.mediaDevices.enumerateDevices');
            return;
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
                (<any>constraints.video).optional = [{sourceId: device.deviceId}]
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

        (<any>obj).onSuccess = function(arController, arCameraParam) {
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
                self.process(video);
            },

            renderOn: function(renderer) {
                if (!renderer) return;
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
};

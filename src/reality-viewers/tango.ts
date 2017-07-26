import { inject, Container } from 'aurelia-dependency-injection'
import { 
    // CameraEventAggregator,
    // CameraEventType,
    ConstantPositionProperty,
    ConstantProperty,
    ReferenceFrame,
    Cartographic,
    // Cartesian2,
    Cartesian3,
    Quaternion,
    Matrix3,
    Matrix4,
    // PerspectiveFrustum
    // CesiumMath
    // Entity
} from '../cesium/cesium-imports'
import { Configuration, Role, SerializedSubviewList, CanvasViewport, AVERAGE_EYE_HEIGHT /*DEFAULT_NEAR_PLANE, DEFAULT_FAR_PLANE*/ } from '../common'
import { SessionService, ConnectService, SessionConnectService, /*Message*/ } from '../session'
import { 
    eastUpSouthToFixedFrame,
    // decomposePerspectiveProjectionMatrix, 
    // getEntityPositionInReferenceFrame,
    // getEntityOrientationInReferenceFrame 
} from '../utils'
import { EntityService } from '../entity'
import { ContextService } from '../context'
import { DeviceService } from '../device'
import { ViewService } from '../view'
// import { PoseStatus } from '../entity'
import { RealityViewer } from './base'
import { RealityService } from '../reality'
import { VisibilityService } from '../visibility'

declare var THREE;

@inject(SessionService, ViewService, Container, DeviceService)
export class TangoRealityViewer extends RealityViewer {

    public type = 'tango';
    public userTracking: 'none'|'3DOF'|'6DOF' = '6DOF';

    private _scene;
    private _cameraOrtho;
    private _cameraMesh;
    private _cameraPersp;
    private _cameraScene;
    // private _vrControls;
    private _pointCloud;
    private _points;
    private _pointsToSkip = 0;

    private _frameData = new VRFrameData();
    private _renderPointCloud = true;
    private _usePointCloudForOcclusion = true;
    private _initFinished = false;

    // private _lastKnownPosition = new Cartesian3();
    // private _lastKnownOrientation = new Quaternion();
    // private _lastKnownDeviceOrientation = new Quaternion();
    // private _arScene;
    // private _arController;
    private _renderer;
    private _sharedCanvasFinal = false;
    private _vrDisplay : VRDisplay | undefined = undefined;

    private _lastGeoHorizontalAccuracy: number = -99;

    private _tangoOriginLost = true;
    private _tangoOriginLostPreviousFrame;

    // private _scratchQuaternion = new Quaternion();

    // private _artoolkitTrackerEntity = new Entity({
    //     position: new ConstantPositionProperty(Cartesian3.ZERO, this.contextService.user),
    //     orientation: new ConstantProperty(Quaternion.IDENTITY)
    // });

    // private _artoolkitProjection:Matrix4|undefined;

    // private _markerEntities = new Map<string,Entity>();

    // private _resolveReady:Function;
    // private _rejectReady:Function;
    // private _artoolkitReady:Promise<void>;

    // private _aggregator:CameraEventAggregator|undefined;
    // private _moveFlags = {
    //     moveForward : false,
    //     moveBackward : false,
    //     moveUp : false,
    //     moveDown : false,
    //     moveLeft : false,
    //     moveRight : false
    // }

    constructor(
        private sessionService: SessionService,
        private viewService: ViewService,
        // private contextService: ContextService,
        private container: Container,
        private deviceService: DeviceService,
        public uri:string,
        public vrDisplay) {
        super(uri);

        // this._artoolkitReady = new Promise<void>((resolve, reject) => {
        //     this._resolveReady = resolve;
        //     this._rejectReady = reject;
        // });
        
        this.viewService.viewportChangeEvent.addEventListener((viewport:CanvasViewport)=>{
            this.updateViewport(viewport);
        });
        // for now, initialize artoolkit here
        // eventually we want to decouple video setup from artoolkit setup
        // and only initialize the video here
        // this.initARToolKit().then(()=>{
        //     this._resolveReady();
        // }, (error) => {
        //     this._rejectReady(error);
        // });
    }

    private _scratchMatrix3 = new Matrix3;
    private _scratchMatrix4 = new Matrix4;
    private _scratchCartesian = new Cartesian3;

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

        // setup the configuration for our tango reality
        child.registerInstance(Configuration, { 
            role: Role.REALITY_VIEWER, 
            uri: this.uri,
            title: 'Tango',
            version: this.sessionService.configuration.version,
            supportsCustomProtocols: true,
            protocols: ['ar.configureStage@v1', 'ar.tango'],
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
        // const childViewService = child.get(ViewService) as ViewService;

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

            session.on['ar.tango.togglePointCloud'] = () => {
                this._renderPointCloud = !this._renderPointCloud;
                if (this._renderPointCloud) this._scene.add(this._points); else this._scene.remove(this._points);
                return Promise.resolve({result: this._renderPointCloud});
            }

            session.on['ar.tango.getPickingPointAndPlaneInPointCloud'] = ({x, y}) => {
                if (this._vrDisplay) {
                    // console.log("Get p&p on"+x +"," + y)
                    let pointAndPlane = (<any>this._vrDisplay).getPickingPointAndPlaneInPointCloud(x, y);
                    if (pointAndPlane) {
                        return Promise.resolve({point: pointAndPlane.point, plane: pointAndPlane.plane});
                    } else {
                        return Promise.reject(new Error("Tango reality could not find a point and plane"));
                    }
                } else {
                    return Promise.reject(new Error("vrDisplay not configured yet"));
                }
            }

            session.on['ar.tango.toggleOcclusion'] = () => {
                this._usePointCloudForOcclusion = !this._usePointCloudForOcclusion;
                // if (this._usePointCloudForOcclusion) this._scene.add(this._points); else this._scene.remove(this._points);
                return Promise.resolve({result: this._usePointCloudForOcclusion});
            }

        });

        // Setup everything after connected to the manager. The manager only connects once.
        childSessionService.manager.connectEvent.addEventListener(()=>{

            // since we aren't create a child view service and viewport service, 
            // suppress any errors from not handling these messages
            childSessionService.manager.suppressErrorOnUnknownTopic = true;
            
            // const scratchQuaternion = new Quaternion;
            // const scratchQuaternionDragYaw = new Quaternion;
            // const pitchQuat = new Quaternion;
            const positionScratchCartesian = new Cartesian3;
            // const movementScratchCartesian = new Cartesian3;
            // const orientationMatrix = new Matrix3;
            // const up = new Cartesian3(0,0,1);
            // const right = new Cartesian3(1,0,0);
            // const forward = new Cartesian3(0,-1,0);
            // const scratchFrustum = new PerspectiveFrustum();
            // const _scratchFrameData = new VRFrameData();

            // const deviceStage = childDeviceService.stage;
            // const deviceUser = childDeviceService.user;

            // const NEGATIVE_UNIT_Z = new Cartesian3(0,0,-1);
            // const X_90ROT = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, CesiumMath.PI_OVER_TWO);

            const subviews:SerializedSubviewList = [];

            // const deviceUserPose = childContextService.createEntityPose(deviceUser, deviceStage);


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
                
                // const aggregator = this._aggregator;

                SerializedSubviewList.clone(frameState.subviews, subviews);

                const time = frameState.time;

                // deviceUserPose.update(time);
                
                // override user pos to tango pos
                const overrideUser = true; //!(deviceUserPose.status & PoseStatus.KNOWN);
                // originally provide controls if the device does not have a physical pose

                    
                const contextUser = childContextService.user;
                const contextStage = childContextService.stage;

                var userPosition: Cartesian3;

                // OverrideUser
                // const position = 
                //     getEntityPositionInReferenceFrame(contextUser, time, contextStage, positionScratchCartesian) || 
                //     Cartesian3.fromElements(0, childDeviceService.suggestedUserHeight, 0, positionScratchCartesian);
                (<VRDisplay>this._vrDisplay).getFrameData(this._frameData);
                const tangoPos = this._frameData.pose.position;
                userPosition = new Cartesian3(tangoPos[0], tangoPos[1], tangoPos[2]);

                // Check if tango tracking is lost
                this._tangoOriginLostPreviousFrame = this._tangoOriginLost;
                this._tangoOriginLost = userPosition.equals(Cartesian3.ZERO);

                let orientation;
                // If tango tracking is lost, use the device orientation only
                if (this._tangoOriginLost) {
                    // userPosition = this._lastKnownPosition.clone();
                    userPosition = Cartesian3.ZERO;
                    if (this.deviceService.user.orientation) 
                        orientation = this.deviceService.user.orientation.getValue(time);
                    // let d1 = Quaternion.conjugate(this._lastKnownDeviceOrientation, scratchQuaternion);
                    // let x = Quaternion.multiply(this._lastKnownOrientation, d1, scratchQuaternion);
                    // orientation = Quaternion.multiply(orientation, x, scratchQuaternion);
                } else {
                    // this._lastKnownPosition = userPosition.clone();
                    const tangoRot = this._frameData.pose.orientation;
                    orientation = new Quaternion(tangoRot[0], tangoRot[1], tangoRot[2], tangoRot[3]);
                    // this._lastKnownOrientation = orientation.clone();
                    // if (this.deviceService.user.orientation)
                        // this._lastKnownDeviceOrientation = this.deviceService.user.orientation.getValue(time);
                    // console.log(orientation);console.log(this._lastKnownDeviceOrientation)
                }

                // Matrix3.fromQuaternion(orientation, orientationMatrix);
                // Matrix3.multiplyByVector(orientationMatrix, Cartesian3.UNIT_Y, up);
                // Matrix3.multiplyByVector(orientationMatrix, Cartesian3.UNIT_X, right);
                // Matrix3.multiplyByVector(orientationMatrix, NEGATIVE_UNIT_Z, forward);

                (contextUser.position as ConstantPositionProperty).setValue(userPosition, contextStage);
                (contextUser.orientation as ConstantProperty).setValue(orientation);

                // console.log(userPosition + " // " + orientation);
                // Update stage geopose when GPS accuracy improves or Tango origin is repositioned
                const gpsAccuracyHasImproved = this._lastGeoHorizontalAccuracy < (this.deviceService.geoHorizontalAccuracy || 0);
                const tangoOriginRepositioned = this._tangoOriginLostPreviousFrame && !this._tangoOriginLost;
                const geopositionStage = gpsAccuracyHasImproved || tangoOriginRepositioned;
                const overrideStage = true;

                if (geopositionStage) {
                    if (tangoOriginRepositioned) {
                        console.log("Tango origin was reset. Updating stage geopose.")
                        this._tangoOriginLost = false;
                    }
                    else {
                        console.log("Updating stage geopose. Current horizontal accuracy is " + this.deviceService.geoHorizontalAccuracy)
                        this._lastGeoHorizontalAccuracy = this.deviceService.geoHorizontalAccuracy || 0;
                    }

                    // TODO: orient stage to align with north
                    const deviceStage = this.deviceService.stage;
                    // customStagePosition = getEntityPositionInReferenceFrame(childDeviceService.user, time, childDeviceService.stage, this._scratchCartesian) || positionScratchCartesian;
                    customStagePosition = deviceStage.position && deviceStage.position.getValue(time) || positionScratchCartesian;
                    customStagePosition = Cartesian3.subtract(customStagePosition, userPosition, this._scratchCartesian);
                    let transformMatrix = eastUpSouthToFixedFrame(customStagePosition, undefined, this._scratchMatrix4);
                    let rotationMatrix = Matrix4.getRotation(transformMatrix, this._scratchMatrix3);
                    customStageOrientation = Quaternion.fromRotationMatrix(rotationMatrix);
                    (contextStage.position as ConstantPositionProperty).setValue(customStagePosition, ReferenceFrame.FIXED);
                    (contextStage.orientation as ConstantProperty).setValue(customStageOrientation);
                }

                if (this._initFinished && this._vrDisplay) {
                    (THREE as any).WebAR.updateCameraMeshOrientation(this._vrDisplay, this._cameraMesh);
                    
                    //update cameraPersp
                    let pose = this._frameData.pose;
                    
                    if ( pose.orientation ) {
                        this._cameraPersp.quaternion.fromArray( pose.orientation );
                    }

                    if ( pose.position ) {
                        this._cameraPersp.position.fromArray( pose.position );
                    } else {
                        this._cameraPersp.position.set( 0, 0, 0 );
                    }
                    
                    // if (this._vrDisplay) console.log(this._vrDisplay.getPose().position)
                    this._pointCloud.update(this._renderPointCloud, this._pointsToSkip, this._usePointCloudForOcclusion);
                    // this._renderer.resetGLState();

                    // var ac = this._renderer.autoClear;
                    this._renderer.autoClear = false;
                    this._renderer.clear();
                    this._renderer.render(this._cameraScene, this._cameraOrtho);
                    this._renderer.clearDepth();

                    this._renderer.context.colorMask( false, false, false, false );
                    if (this._renderPointCloud) {
                        this._renderer.render(this._scene, this._cameraPersp);
                    }
                    this._renderer.context.colorMask( true, true, true, true );

                    // this._renderer.autoClear = ac;

                }

                const contextFrameState = childContextService.createFrameState(
                    time,
                    frameState.viewport,
                    subviews,
                    {
                        overrideUser,  
                        overrideStage,
                        floorOffset: -AVERAGE_EYE_HEIGHT/2,
                        userTracking: this.userTracking
                    }
                );
                childContextService.submitFrameState(contextFrameState);

                // aggregator && aggregator.reset();
            });

            childSessionService.manager.closeEvent.addEventListener(()=>{
                remove1();
                remove2();
            });

        })

        // Check if the browser supports Tango    
        let remove = childDeviceService.getVRDisplayFinishedEvent.addEventListener(() => {
            let vrDisplays:VRDisplay[] = childDeviceService.vrDisplays;
            if (vrDisplays && vrDisplays.length > 0) {
                for (var i = 0; !this._vrDisplay && i < vrDisplays.length; i++) {
                    this._vrDisplay = vrDisplays[i];
                    if (this._vrDisplay.displayName !== "Tango VR Device") {
                        this._vrDisplay = undefined;
                    }
                }
            }
            if (!this._vrDisplay) {
                console.error("This browser does not support Tango.");
                return;
            } else {
                remove();
                this.initTango();
            }
        });

        childSessionService.connect();

    }

    protected initTango() {
        this.loadScripts().then(()=> {
            this.initCameraAndPointcloud();
            this.initViewportAndCanvas();
            // alert("scripts loaded");
            this._initFinished = true;
        });
    }

    protected loadScripts():Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // for now we're dynamically loading these scripts
            var script = document.createElement('script');
            script.src = 'https://bionictk.github.io/website/resources/three.js';
            script.onload = () => {
                console.log("*** custom three.js loaded ***");
                var script2 = document.createElement('script');
                script2.src = 'https://bionictk.github.io/website/resources/THREE.WebAR.js';
                script2.onload = () => {
                    console.log("*** THREE.WebAR.js loaded ***");
                    
                    resolve();
                }
                document.head.appendChild(script2);
            }
            document.head.appendChild(script);
        });
    }

    protected initCameraAndPointcloud() {
        this._scene = new THREE.Scene();
        this._cameraScene = new THREE.Scene();
        // Use an orthographic camera to render the video quad
        this._cameraOrtho = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1000 );
        // Use the THREE.WebAR helper function to create a quad mesh for the
        // camera with the right geometry and material.
        this._cameraMesh = (THREE as any).WebAR.createVRSeeThroughCameraMesh(this._vrDisplay);
        this._cameraScene.add(this._cameraMesh);

        this._cameraPersp = (THREE as any).WebAR.createVRSeeThroughCamera(this._vrDisplay, 0.1, 100);

        let pointsMaterial = new THREE.PointsMaterial(
            { size: 0.01, vertexColors: THREE.VertexColors });
        // pointsMaterial.depthWrite = false;
        this._pointCloud = new (THREE as any).WebAR.VRPointCloud(this._vrDisplay, true);
        this._points = new THREE.Points(this._pointCloud.getBufferGeometry(),
            pointsMaterial);
        // Points are changing all the time so calculating the frustum culling
        // volume is not very convenient.
        this._points.frustumCulled = false;
        // this._points.renderDepth = 0;
        this._scene.add(this._points);

        // this._vrControls = new THREE.VRControls(this._cameraPersp);
        // Correctly handle window resize events
        // window.addEventListener( 'resize', onWindowResize, false );
        // THREE.WebAR.resizeVRSeeThroughCamera(vrDisplay, cameraOrtho);
    }
    
    protected initViewportAndCanvas() {
       this.updateViewport(<any>this.viewService.viewport);

        // document.body.className = arController.orientation;
        
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
            this._renderer = new THREE.WebGLRenderer({canvas: argonCanvas, antialias: false, alpha: true, logarithmicDepthBuffer: true});
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
    }

    protected updateViewport(viewport:CanvasViewport) {
        if (!this._sharedCanvasFinal && this._renderer) {
            (THREE as any).WebAR.resizeVRSeeThroughCamera(this._vrDisplay, this._cameraPersp);
            this._renderer.setSize(this.viewService.renderWidth, this.viewService.renderHeight, true);
        }
    }

}

declare class VRFrameData {
    timestamp:number;

    leftProjectionMatrix:Float32Array;
    leftViewMatrix:Float32Array;

    rightProjectionMatrix:Float32Array;
    rightViewMatrix:Float32Array;

    pose:VRPose;
}
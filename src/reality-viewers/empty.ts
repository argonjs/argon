
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
    CesiumMath
} from '../cesium/cesium-imports'
import { Configuration, Role, SerializedSubviewList } from '../common'
import { SessionService, ConnectService, SessionConnectService } from '../session'
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

interface Movement {
    startPosition:Cartesian2; 
    endPosition:Cartesian2;
}

interface PinchMovement {
    distance: Movement;
    angleAndHeight: Movement;
}

@inject(SessionService, ViewService, Container)
export class EmptyRealityViewer extends RealityViewer {

    public type = 'empty';

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
        private container: Container,
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

        // setup the configuration for our empty reality
        child.registerInstance(Configuration, { 
            role: Role.REALITY_VIEWER, 
            uri: this.uri,
            title: 'Empty',
            version: this.sessionService.configuration.version,
            supportsCustomProtocols: true,
            protocols: ['ar.configureStage@v1']
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
}

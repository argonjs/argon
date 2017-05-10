
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
import { Role, SerializedSubviewList } from '../common'
import { SessionService } from '../session'
import { decomposePerspectiveProjectionMatrix, getEntityPositionInReferenceFrame, getEntityOrientationInReferenceFrame } from '../utils'
import { ContextService, PoseStatus } from '../context'
import { DeviceService } from '../device'
import { ViewService } from '../view'
import { RealityViewer } from './base'

interface Movement {
    startPosition:Cartesian2; 
    endPosition:Cartesian2;
}

interface PinchMovement {
    distance: Movement;
    angleAndHeight: Movement;
}

@inject(SessionService, ContextService, ViewService, DeviceService)
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
            const X_90ROT = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, CesiumMath.PI_OVER_TWO);

            const subviews:SerializedSubviewList = [];

            const deviceUserPose = this.contextService.createEntityPose(deviceUser, deviceStage);

            let subscribedGeolocation = false;

            const remove = this.deviceService.frameStateEvent.addEventListener((frameState) => {
                if (internalSession.isClosed) return;
                
                const aggregator = this._aggregator;
                const flags = this._moveFlags;

                if (!this.isPresenting) {
                    aggregator && aggregator.reset();
                    return;
                }

                if (this.deviceService.geolocationDesired) {
                    if (!subscribedGeolocation) {
                        subscribedGeolocation = true;
                        this.deviceService.subscribeGeolocation(this.deviceService.geolocationOptions, internalSession);
                    }
                } else {
                    if (subscribedGeolocation) {
                        subscribedGeolocation = false;
                        this.deviceService.unsubscribeGeolocation(internalSession);
                    }
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
                        Cartesian3.clone(Cartesian3.ZERO, positionScratchCartesian);

                    let orientation = getEntityOrientationInReferenceFrame(contextUser, time, contextStage, scratchQuaternion) ||
                        Quaternion.clone(X_90ROT, scratchQuaternion);
                    
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

                const contextFrameState = this.deviceService.createContextFrameState(
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
                remove();
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
                title: 'Empty',
                version: this.sessionService.configuration.version,
                protocols: ['argon.configureStage@v1']
            });
        });
    }
}

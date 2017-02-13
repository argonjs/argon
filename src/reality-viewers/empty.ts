
import { inject } from 'aurelia-dependency-injection'
import { 
    CameraEventAggregator,
    CameraEventType,
    ConstantPositionProperty,
    ConstantProperty,
    Cartesian2,
    Cartesian3,
    Entity,
    Quaternion,
    Matrix3,
    Matrix4,
    PerspectiveFrustum,
    CesiumMath
} from '../cesium/cesium-imports'
import { Role, SerializedSubviewList } from '../common'
import { SessionService } from '../session'
import { getEntityOrientation, decomposePerspectiveProjectionMatrix, getEntityOrientationInReferenceFrame } from '../utils'
import { ContextService, PoseStatus } from '../context'
import { LocationService } from '../location'
import { ViewService } from '../view'
import { ViewportService } from '../viewport'
import { RealityViewer } from './base'

interface Movement {
    startPosition:Cartesian2; 
    endPosition:Cartesian2;
}

interface PinchMovement {
    distance: Movement;
    angleAndHeight: Movement;
}

@inject(SessionService, ContextService, LocationService, ViewService, ViewportService)
export class EmptyRealityViewer extends RealityViewer {

    public type = 'empty';

    constructor(
        private sessionService: SessionService,
        private contextService: ContextService,
        private locationService: LocationService,
        private viewService: ViewService,
        private viewportService: ViewportService,
        public uri:string) {
        super(uri);
    }

    public load(): void {
        const session = this.sessionService.addManagedSessionPort(this.uri);
        session.connectEvent.addEventListener(()=>{
            this.connectEvent.raiseEvent(session);
        });

        const internalSession = this.sessionService.createSessionPort(this.uri);
        internalSession.on['ar.device.state'] = () => { };
        internalSession.on['ar.visibility.state'] = () => { };
        internalSession.on['ar.focus.state'] = () => { };
        internalSession.on['ar.viewport.uievent'] = () => { };
        internalSession.on['ar.viewport.mode'] = () => { };
        internalSession.on['ar.view.suggestedViewState'] = () => { };
        internalSession.on['ar.context.update'] = () => { };
        internalSession.on['ar.reality.connect'] = () => { };

        internalSession.connectEvent.addEventListener(() => {

            const aggregator = new CameraEventAggregator(<any>this.viewportService.element);

            var flags = {
                moveForward : false,
                moveBackward : false,
                moveUp : false,
                moveDown : false,
                moveLeft : false,
                moveRight : false
            };

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
            
            const keydownListener = function(e) {
                var flagName = getFlagForKeyCode(e.keyCode);
                if (typeof flagName !== 'undefined') {
                    flags[flagName] = true;
                }
            }

            const keyupListener = function(e) {
                var flagName = getFlagForKeyCode(e.keyCode);
                if (typeof flagName !== 'undefined') {
                    flags[flagName] = false;
                }
            }

            document.addEventListener('keydown', keydownListener, false);
            document.addEventListener('keyup', keyupListener, false);

            internalSession.closeEvent.addEventListener(()=>{
                aggregator.destroy();
                document.removeEventListener('keydown', keydownListener);
                document.removeEventListener('keyup', keyupListener);
            });


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

            const physicalStage = this.locationService.physicalStage;
            const physicalEye = this.viewService.physicalEye;

            const AVERAGE_HUMAN_HEIGHT = 1.77;
            const NEGATIVE_UNIT_Z = new Cartesian3(0,0,-1);
            const X_90ROT = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, CesiumMath.PI_OVER_TWO);

            const virtualEyePositionProperty = new ConstantPositionProperty(
                new Cartesian3(0, 0, AVERAGE_HUMAN_HEIGHT), 
                physicalStage
            );
            const virtualEyeOrientationProperty = new ConstantProperty(X_90ROT);

            const virtualEye = new Entity({
                position: virtualEyePositionProperty,
                orientation: virtualEyeOrientationProperty
            });

            const viewService = this.viewService;

            const subviews:SerializedSubviewList = [];

            const physicalEyeRelativeToStagePose = this.contextService.createEntityPose(physicalEye, physicalStage);

            let remove = viewService.suggestedViewStateEvent.addEventListener((suggestedViewState)=>{
                
                if (internalSession.isClosed) return remove();

                if (!this.isPresenting) {
                    aggregator.reset();
                    return;
                }

                SerializedSubviewList.clone(suggestedViewState.subviews, subviews);
                
                // provide fov controls
                if (!suggestedViewState.strict) {                    
                    decomposePerspectiveProjectionMatrix(subviews[0].projectionMatrix, scratchFrustum);
                    scratchFrustum.fov = viewService.subviews[0].frustum.fov;

                    if (aggregator.isMoving(CameraEventType.WHEEL)) {
                        const wheelMovement = aggregator.getMovement(CameraEventType.WHEEL);
                        const diff = wheelMovement.endPosition.y;
                        scratchFrustum.fov = Math.min(Math.max(scratchFrustum.fov - diff * 0.02, Math.PI/8), Math.PI-Math.PI/8);
                    }

                    if (aggregator.isMoving(CameraEventType.PINCH)) {
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

                const time = suggestedViewState.time;

                let orientation = getEntityOrientation(physicalEye, time, physicalStage, scratchQuaternion);

                physicalEyeRelativeToStagePose.update(time);
                
                // provide controls if the device does not have a physical pose
                if (!(physicalEyeRelativeToStagePose.status & PoseStatus.KNOWN)) {
                    
                    orientation = getEntityOrientationInReferenceFrame(virtualEye, time, physicalStage, scratchQuaternion)!;
                    
                    if (aggregator.isMoving(CameraEventType.LEFT_DRAG)) {
                        const dragMovement = aggregator.getMovement(CameraEventType.LEFT_DRAG);

                        if (orientation) {
                            // const dragPitch = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, frustum.fov * (dragMovement.endPosition.y - dragMovement.startPosition.y) / app.view.getViewport().height, scratchQuaternionDragPitch);
                            const dragYaw = Quaternion.fromAxisAngle(Cartesian3.UNIT_Y, scratchFrustum.fov * (dragMovement.endPosition.x - dragMovement.startPosition.x) / suggestedViewState.viewport.width, scratchQuaternionDragYaw);
                            // const drag = Quaternion.multiply(dragPitch, dragYaw, dragYaw);

                            orientation = Quaternion.multiply(orientation, dragYaw, dragYaw);
                            (<any>virtualEye.orientation).setValue(orientation);
                        }
                    }

                    Matrix3.fromQuaternion(orientation, orientationMatrix);
                    Matrix3.multiplyByVector(orientationMatrix, Cartesian3.UNIT_Y, up);
                    Matrix3.multiplyByVector(orientationMatrix, Cartesian3.UNIT_X, right);
                    Matrix3.multiplyByVector(orientationMatrix, NEGATIVE_UNIT_Z, forward);

                    const position = virtualEyePositionProperty.getValueInReferenceFrame(time, physicalStage, positionScratchCartesian);
                    
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

                    virtualEyePositionProperty.setValue(position, physicalStage);

                } else if (physicalEyeRelativeToStagePose.status & PoseStatus.FOUND) {

                    virtualEyePositionProperty.setValue(Cartesian3.ZERO, physicalEye);
                    virtualEyeOrientationProperty.setValue(Quaternion.IDENTITY)
                    
                }

                aggregator.reset();

                const frameState = this.contextService.createFrameState(
                    time,
                    suggestedViewState.viewport,
                    subviews,
                    virtualEye
                );

                internalSession.send('ar.reality.frameState', frameState);
            });
        });

        // Only connect after the caller is able to attach connectEvent handlers
        Promise.resolve().then(()=>{
            const messageChannel = this.sessionService.createSynchronousMessageChannel();
            session.open(messageChannel.port1, this.sessionService.configuration);
            internalSession.open(messageChannel.port2, { role: Role.REALITY_VIEWER, uri: this.uri, title: 'Empty' });
        });
    }
}

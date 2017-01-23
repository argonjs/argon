
import { inject } from 'aurelia-dependency-injection'
import { 
    JulianDate, 
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
import { Role, ViewState } from '../common'
import { SessionService } from '../session'
import { DeviceService } from '../device'
import { getSerializedEntityPose, decomposePerspectiveProjectionMatrix, getEntityOrientationInReferenceFrame } from '../utils'
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

@inject(SessionService, DeviceService, ViewService)
export class EmptyRealityViewer extends RealityViewer {

    public type = 'empty';

    constructor(
        private sessionService: SessionService,
        private deviceService: DeviceService,
        private viewService: ViewService,
        public uri:string) {
        super(sessionService, uri);
    }

    public destroy() {
        
    }

    private _isPresenting = false;

    public setPresenting(foo: boolean) : void {
        this._isPresenting = foo;
    }

    public load(): void {
        super.load();
        const realitySession = this.session;
        const remoteRealitySession = this.sessionService.createSessionPort(this.uri);

        remoteRealitySession.on['ar.device.state'] = () => { };
        remoteRealitySession.on['ar.view.uievent'] = () => { };
        remoteRealitySession.on['ar.context.update'] = () => { };
        remoteRealitySession.on['ar.reality.connect'] = () => { };

        remoteRealitySession.connectEvent.addEventListener(() => {

            const aggregator = new CameraEventAggregator(<any>this.viewService.element);

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
                case 'R'.charCodeAt(0):
                    return 'moveUp';
                case 'F'.charCodeAt(0):
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

            remoteRealitySession.closeEvent.addEventListener(()=>{
                aggregator.destroy();
                document.removeEventListener('keydown', keydownListener);
                document.removeEventListener('keyup', keyupListener);
            });

            const scratchQuaternionDragYaw = new Quaternion;
            // const pitchQuat = new Quaternion;
            const positionScratchCartesian = new Cartesian3;
            const movementScratchCartesian = new Cartesian3;
            const eyeOrientation = new Quaternion;
            const orientationMatrix = new Matrix3;
            const up = new Cartesian3(0,0,1);
            const right = new Cartesian3(1,0,0);
            const forward = new Cartesian3(0,-1,0);
            const frustum = new PerspectiveFrustum();

            const AVERAGE_HUMAN_HEIGHT = 1.77;
            const NEGATIVE_UNIT_Y = new Cartesian3(0,-1,0);
            const X_90ROT = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, CesiumMath.PI_OVER_TWO);

            const virtualEyePositionProperty = new ConstantPositionProperty(
                new Cartesian3(0, 0, AVERAGE_HUMAN_HEIGHT), 
                this.deviceService.stage
            );
            const virtualEyeOrientationProperty = new ConstantProperty(X_90ROT);
            Matrix3.fromQuaternion(eyeOrientation, orientationMatrix);

            const virtualEye = new Entity({
                position: virtualEyePositionProperty,
                orientation: virtualEyeOrientationProperty
            });

            const deviceService = this.deviceService;

            let update = (time: JulianDate) => {
                if (remoteRealitySession.isConnected) deviceService.requestFrame(update);
                else return;

                if (!this._isPresenting) {
                    aggregator.reset();
                    return;
                }

                if (frustum.fov === undefined || deviceService.strict) {
                    decomposePerspectiveProjectionMatrix(deviceService.subviews[0].projectionMatrix, frustum);
                }
                
                if (!deviceService.strict) {
                    if (aggregator.isMoving(CameraEventType.WHEEL)) {
                        const wheelMovement = aggregator.getMovement(CameraEventType.WHEEL);
                        const diff = wheelMovement.endPosition.y;
                        frustum.fov = Math.min(Math.max(frustum.fov - diff * 0.02, Math.PI/8), Math.PI-Math.PI/8);
                    }
                    if (aggregator.isMoving(CameraEventType.PINCH)) {
                        const pinchMovement:PinchMovement = aggregator.getMovement(CameraEventType.PINCH);
                        const diff = pinchMovement.distance.endPosition.y - pinchMovement.distance.startPosition.y;
                        frustum.fov = Math.min(Math.max(frustum.fov - diff * 0.02, Math.PI/8), Math.PI-Math.PI/8);
                    }
                    const aspect = deviceService.subviews[0].viewport.width / deviceService.subviews[0].viewport.height;
                    frustum.aspectRatio = isNaN(aspect) ? 1 : aspect;
                    deviceService.subviews.forEach((s)=>{
                        Matrix4.clone(frustum.projectionMatrix, s.projectionMatrix);
                    });
                }

                let pose = getSerializedEntityPose(this.deviceService.eye, time);
                
                // provide controls if the device does not have a pose
                if (!pose && !deviceService.strict) {
                    
                    if (aggregator.isMoving(CameraEventType.LEFT_DRAG)) {
                        const dragMovement = aggregator.getMovement(CameraEventType.LEFT_DRAG);
                        const currentOrientation = getEntityOrientationInReferenceFrame(virtualEye, time, deviceService.stage, eyeOrientation);

                        if (currentOrientation) {
                            // const dragPitch = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, frustum.fov * (dragMovement.endPosition.y - dragMovement.startPosition.y) / app.view.getViewport().height, scratchQuaternionDragPitch);
                            const dragYaw = Quaternion.fromAxisAngle(Cartesian3.UNIT_Y, frustum.fov * (dragMovement.endPosition.x - dragMovement.startPosition.x) / this.viewService.viewport.width, scratchQuaternionDragYaw);
                            // const drag = Quaternion.multiply(dragPitch, dragYaw, dragYaw);

                            const newOrientation = Quaternion.multiply(currentOrientation, dragYaw, dragYaw);
                            (<any>virtualEye.orientation).setValue(newOrientation);

                            Matrix3.fromQuaternion(newOrientation, orientationMatrix);
                            Matrix3.multiplyByVector(orientationMatrix, Cartesian3.UNIT_Z, up);
                            Matrix3.multiplyByVector(orientationMatrix, Cartesian3.UNIT_X, right);
                            Matrix3.multiplyByVector(orientationMatrix, NEGATIVE_UNIT_Y, forward);
                        }
                    }

                    const position = virtualEyePositionProperty.getValueInReferenceFrame(time,  this.deviceService.stage, positionScratchCartesian);
                    
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

                    virtualEyePositionProperty.setValue(position, this.deviceService.stage);

                    pose = getSerializedEntityPose(virtualEye, time);
                }

                aggregator.reset();

                const viewState: ViewState = {
                    time,
                    pose,
                    geolocationAccuracy: deviceService.geolocationAccuracy,
                    altitudeAccuracy: deviceService.altitudeAccuracy,
                    compassAccuracy: deviceService.compassAccuracy,
                    viewport: deviceService.viewport,
                    subviews: deviceService.subviews
                };
                remoteRealitySession.send('ar.reality.viewState', viewState);
            }

            deviceService.requestFrame(update);
        })

        // Only connect after the caller is able to attach connectEvent handlers
        Promise.resolve().then(()=>{
            const messageChannel = this.sessionService.createSynchronousMessageChannel();
            realitySession.open(messageChannel.port1, this.sessionService.configuration);
            remoteRealitySession.open(messageChannel.port2, { role: Role.REALITY_VIEWER, uri: this.uri, title: 'Empty' });
        });
    }
}

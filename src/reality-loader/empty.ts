
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
    CesiumMath
} from '../cesium/cesium-imports'
import { Role, ViewState, RealityViewer } from '../common'
import { SessionService, SessionPort } from '../session'
import { DeviceService } from '../device'
import { RealityLoader } from '../reality'
import { getSerializedEntityPose } from '../utils'
import { ViewService } from '../view'

interface Movement {
    startPosition:Cartesian2; 
    endPosition:Cartesian2;
}

// interface PinchMovement {
//     distance: Movement;
//     angleAndHeight: Movement
// }

@inject(SessionService, DeviceService, ViewService)
export class EmptyRealityLoader extends RealityLoader {

    public type = 'empty';

    constructor(
        private sessionService: SessionService,
        private deviceService: DeviceService,
        private viewService: ViewService) {
        super();

    }

    public load(reality: RealityViewer, callback: (realitySession: SessionPort) => void): void {
        const realitySession = this.sessionService.addManagedSessionPort(reality.uri);
        const remoteRealitySession = this.sessionService.createSessionPort();

        remoteRealitySession.on['ar.device.state'] = () => { };
        remoteRealitySession.on['ar.view.uievent'] = () => { };
        remoteRealitySession.on['ar.context.update'] = () => { };

        remoteRealitySession.connectEvent.addEventListener(() => {
            const element = this.viewService.element;

            const aggregator = new CameraEventAggregator(<any>element);

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

            let yaw = 0;
            let pitch = 0;
            // const yawQuat = new Quaternion;
            // const pitchQuat = new Quaternion;
            const positionScratchCartesian = new Cartesian3;
            const movementScratchCartesian = new Cartesian3;
            const eyeOrientation = new Quaternion;
            const orientationMatrix = new Matrix3;
            const up = new Cartesian3;
            const right = new Cartesian3;
            const forward = new Cartesian3;

            const AVERAGE_HUMAN_HEIGHT = 1.77;
            const NEGATIVE_UNIT_Z = new Cartesian3(0,0,-1);
            const X_90ROT = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, CesiumMath.PI_OVER_TWO);

            const cameraPositionProperty = new ConstantPositionProperty(
                new Cartesian3(0, 0, AVERAGE_HUMAN_HEIGHT), 
                this.deviceService.stage
            );
            const cameraOrientationProperty = new ConstantProperty(X_90ROT);
            Matrix3.fromQuaternion(eyeOrientation, orientationMatrix);
            Matrix3.multiplyByVector(orientationMatrix, Cartesian3.UNIT_Y, up);
            Matrix3.multiplyByVector(orientationMatrix, Cartesian3.UNIT_X, right);
            Matrix3.multiplyByVector(orientationMatrix, NEGATIVE_UNIT_Z, forward);

            const cameraEntity = new Entity({
                position: cameraPositionProperty,
                orientation: cameraOrientationProperty
            });

            const deviceService = this.deviceService;

            let update = (time: JulianDate) => {
                if (remoteRealitySession.isConnected) deviceService.requestFrame(update);

                let pose = getSerializedEntityPose(this.deviceService.eye, time);
                
                // provide controls if the device does not have a pose
                if (!pose) {
                    
                    if (aggregator.isMoving(CameraEventType.LEFT_DRAG)) {
                        var width = element.clientWidth;
                        var height = element.clientHeight;
                        // Coordinate (0.0, 0.0) will be where the mouse was clicked.
                        
                        const movement:Movement = aggregator.getMovement(CameraEventType.LEFT_DRAG);
                        var movementX = (movement.endPosition.x - movement.startPosition.x) / width;
                        var movementY = -(movement.endPosition.y - movement.startPosition.y) / height;
                        var lookFactor = 0.05;
                        
                        yaw -= movementX * lookFactor;
                        pitch -= movementY * lookFactor; 
                        pitch = Math.max( - CesiumMath.PI_OVER_TWO, Math.min( CesiumMath.PI_OVER_TWO, pitch ) );

                        Quaternion.fromHeadingPitchRoll(yaw, pitch, 0, eyeOrientation);
                        Matrix3.fromQuaternion(eyeOrientation, orientationMatrix);
                        Matrix3.multiplyByVector(orientationMatrix, Cartesian3.UNIT_Y, up);
                        Matrix3.multiplyByVector(orientationMatrix, Cartesian3.UNIT_X, right);
                        Matrix3.multiplyByVector(orientationMatrix, NEGATIVE_UNIT_Z, forward);

                        cameraOrientationProperty.setValue(eyeOrientation);
                    }

                    const position = cameraPositionProperty.getValue(time, positionScratchCartesian);
                    
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

                    pose = getSerializedEntityPose(cameraEntity, time);
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

        callback(realitySession);
        // Only connect after the caller is able to attach connectEvent handlers
        const messageChannel = this.sessionService.createSynchronousMessageChannel();
        realitySession.open(messageChannel.port1, this.sessionService.configuration);
        remoteRealitySession.open(messageChannel.port2, { role: Role.REALITY_VIEWER });
    }
}

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from 'aurelia-dependency-injection';
import { CameraEventAggregator, CameraEventType, ConstantPositionProperty, ConstantProperty, Cartesian3, Entity, Quaternion, Matrix3, Matrix4, PerspectiveFrustum, CesiumMath } from '../cesium/cesium-imports';
import { Role, SerializedSubviewList, PHYSICAL_STAGE_ENTITY_ID } from '../common';
import { SessionService } from '../session';
import { getEntityOrientation, decomposePerspectiveProjectionMatrix, getEntityOrientationInReferenceFrame } from '../utils';
import { ContextService } from '../context';
import { ViewService } from '../view';
import { ViewportService } from '../viewport';
import { RealityViewer } from './base';
let EmptyRealityViewer = class EmptyRealityViewer extends RealityViewer {
    constructor(sessionService, contextService, viewService, viewportService, uri) {
        super(uri);
        this.sessionService = sessionService;
        this.contextService = contextService;
        this.viewService = viewService;
        this.viewportService = viewportService;
        this.uri = uri;
        this.type = 'empty';
    }
    load() {
        const session = this.sessionService.addManagedSessionPort(this.uri);
        session.connectEvent.addEventListener(() => {
            this.connectEvent.raiseEvent(session);
        });
        const internalSession = this.sessionService.createSessionPort(this.uri);
        internalSession.on['ar.device.state'] = () => { };
        internalSession.on['ar.visibility.state'] = () => { };
        internalSession.on['ar.focus.state'] = () => { };
        internalSession.on['ar.viewport.uievent'] = () => { };
        internalSession.on['ar.viewport.presentationMode'] = () => { };
        internalSession.on['ar.view.suggestedViewState'] = () => { };
        internalSession.on['ar.context.update'] = () => { };
        internalSession.on['ar.reality.connect'] = () => { };
        internalSession.connectEvent.addEventListener(() => {
            const aggregator = new CameraEventAggregator(this.viewportService.element);
            var flags = {
                moveForward: false,
                moveBackward: false,
                moveUp: false,
                moveDown: false,
                moveLeft: false,
                moveRight: false
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
            const keydownListener = function (e) {
                var flagName = getFlagForKeyCode(e.keyCode);
                if (typeof flagName !== 'undefined') {
                    flags[flagName] = true;
                }
            };
            const keyupListener = function (e) {
                var flagName = getFlagForKeyCode(e.keyCode);
                if (typeof flagName !== 'undefined') {
                    flags[flagName] = false;
                }
            };
            document.addEventListener('keydown', keydownListener, false);
            document.addEventListener('keyup', keyupListener, false);
            internalSession.closeEvent.addEventListener(() => {
                aggregator.destroy();
                document.removeEventListener('keydown', keydownListener);
                document.removeEventListener('keyup', keyupListener);
            });
            const scratchQuaternion = new Quaternion;
            const scratchQuaternionDragYaw = new Quaternion;
            // const pitchQuat = new Quaternion;
            const positionScratchCartesian = new Cartesian3;
            const movementScratchCartesian = new Cartesian3;
            const eyeOrientation = new Quaternion;
            const orientationMatrix = new Matrix3;
            const up = new Cartesian3(0, 0, 1);
            const right = new Cartesian3(1, 0, 0);
            const forward = new Cartesian3(0, -1, 0);
            const scratchFrustum = new PerspectiveFrustum();
            const AVERAGE_HUMAN_HEIGHT = 1.77;
            const NEGATIVE_UNIT_Y = new Cartesian3(0, -1, 0);
            const X_90ROT = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, CesiumMath.PI_OVER_TWO);
            const virtualEyePositionProperty = new ConstantPositionProperty(new Cartesian3(0, 0, AVERAGE_HUMAN_HEIGHT), this.contextService.entities.getById(PHYSICAL_STAGE_ENTITY_ID));
            const virtualEyeOrientationProperty = new ConstantProperty(X_90ROT);
            Matrix3.fromQuaternion(eyeOrientation, orientationMatrix);
            const virtualEye = new Entity({
                position: virtualEyePositionProperty,
                orientation: virtualEyeOrientationProperty
            });
            const viewService = this.viewService;
            const subviews = [];
            let update = (time) => {
                if (internalSession.isConnected)
                    viewService.requestAnimationFrame(update);
                else
                    return;
                if (!this.isPresenting) {
                    aggregator.reset();
                    return;
                }
                const suggestedViewState = this.viewService.suggestedViewState;
                if (!suggestedViewState)
                    return;
                SerializedSubviewList.clone(suggestedViewState.subviews, subviews);
                // provide fov controls
                if (!suggestedViewState.strict) {
                    decomposePerspectiveProjectionMatrix(subviews[0].projectionMatrix, scratchFrustum);
                    scratchFrustum.fov = viewService.subviews[0].frustum.fov;
                    if (aggregator.isMoving(CameraEventType.WHEEL)) {
                        const wheelMovement = aggregator.getMovement(CameraEventType.WHEEL);
                        const diff = wheelMovement.endPosition.y;
                        scratchFrustum.fov = Math.min(Math.max(scratchFrustum.fov - diff * 0.02, Math.PI / 8), Math.PI - Math.PI / 8);
                    }
                    if (aggregator.isMoving(CameraEventType.PINCH)) {
                        const pinchMovement = aggregator.getMovement(CameraEventType.PINCH);
                        const diff = pinchMovement.distance.endPosition.y - pinchMovement.distance.startPosition.y;
                        scratchFrustum.fov = Math.min(Math.max(scratchFrustum.fov - diff * 0.02, Math.PI / 8), Math.PI - Math.PI / 8);
                    }
                    subviews.forEach((s) => {
                        const aspect = s.viewport.width / s.viewport.height;
                        scratchFrustum.aspectRatio = isFinite(aspect) ? aspect : 1;
                        Matrix4.clone(scratchFrustum.projectionMatrix, s.projectionMatrix);
                    });
                }
                const physicalStage = this.contextService.entities.getById(PHYSICAL_STAGE_ENTITY_ID);
                const orientation = getEntityOrientation(this.viewService.physicalEye, time, physicalStage, scratchQuaternion);
                // provide controls if the device does not have a pose
                if (!orientation && !suggestedViewState.strict) {
                    if (aggregator.isMoving(CameraEventType.LEFT_DRAG)) {
                        const dragMovement = aggregator.getMovement(CameraEventType.LEFT_DRAG);
                        const currentOrientation = getEntityOrientationInReferenceFrame(virtualEye, time, physicalStage, eyeOrientation);
                        if (currentOrientation) {
                            // const dragPitch = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, frustum.fov * (dragMovement.endPosition.y - dragMovement.startPosition.y) / app.view.getViewport().height, scratchQuaternionDragPitch);
                            const dragYaw = Quaternion.fromAxisAngle(Cartesian3.UNIT_Y, scratchFrustum.fov * (dragMovement.endPosition.x - dragMovement.startPosition.x) / suggestedViewState.viewport.width, scratchQuaternionDragYaw);
                            // const drag = Quaternion.multiply(dragPitch, dragYaw, dragYaw);
                            const newOrientation = Quaternion.multiply(currentOrientation, dragYaw, dragYaw);
                            virtualEye.orientation.setValue(newOrientation);
                            Matrix3.fromQuaternion(newOrientation, orientationMatrix);
                            Matrix3.multiplyByVector(orientationMatrix, Cartesian3.UNIT_Z, up);
                            Matrix3.multiplyByVector(orientationMatrix, Cartesian3.UNIT_X, right);
                            Matrix3.multiplyByVector(orientationMatrix, NEGATIVE_UNIT_Y, forward);
                        }
                    }
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
                }
                else {
                    virtualEyeOrientationProperty.setValue(orientation);
                }
                aggregator.reset();
                const frameState = this.contextService.createFrameState(time, suggestedViewState.viewport, subviews, virtualEye);
                internalSession.send('ar.reality.frameState', frameState);
            };
            viewService.requestAnimationFrame(update);
        });
        // Only connect after the caller is able to attach connectEvent handlers
        Promise.resolve().then(() => {
            const messageChannel = this.sessionService.createSynchronousMessageChannel();
            session.open(messageChannel.port1, this.sessionService.configuration);
            internalSession.open(messageChannel.port2, { role: Role.REALITY_VIEWER, uri: this.uri, title: 'Empty' });
        });
    }
};
EmptyRealityViewer = __decorate([
    inject(SessionService, ContextService, ViewService, ViewportService),
    __metadata("design:paramtypes", [SessionService,
        ContextService,
        ViewService,
        ViewportService, String])
], EmptyRealityViewer);
export { EmptyRealityViewer };

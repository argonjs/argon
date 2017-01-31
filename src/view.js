var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject } from 'aurelia-dependency-injection';
import { ConstantPositionProperty, ConstantProperty, Clock, Entity, Matrix3, Matrix4, PerspectiveFrustum, Cartesian3, Quaternion, JulianDate, CesiumMath, 
// ReferenceFrame,
// Transforms,
defined } from './cesium/cesium-imports';
import { SessionService } from './session';
import { ViewportService } from './viewport';
import { LocationService } from './location';
import { Role, SubviewType, AVERAGE_HUMAN_HEIGHT, STAGE_ENTITY_ID, PHYSICAL_STAGE_ENTITY_ID, EYE_ENTITY_ID, PHYSICAL_EYE_ENTITY_ID } from './common';
import { ContextService, ContextServiceProvider } from './context';
import { deprecated, 
// getAncestorReferenceFrames,
// getEntityPositionInReferenceFrame,
decomposePerspectiveProjectionMatrix } from './utils';
/**
 * The rendering paramters for a particular subview
 */
export class Subview {
}
const scratchCartesian = new Cartesian3;
// const scratchCartesian2 = new Cartesian3;
const scratchQuaternion = new Quaternion;
const scratchQuaternion2 = new Quaternion;
const scratchMatrix3 = new Matrix3;
const scratchMatrix4 = new Matrix4;
const scratchFrustum = new PerspectiveFrustum();
;
const IDENTITY_SUBVIEW_POSE = { p: Cartesian3.ZERO, o: Quaternion.IDENTITY, r: EYE_ENTITY_ID };
let currentVRDisplay;
let ViewService = class ViewService {
    constructor(sessionService, contextService, viewportService) {
        this.sessionService = sessionService;
        this.contextService = contextService;
        this.viewportService = viewportService;
        this._subviews = [];
        this._frustums = [];
        /**
         * An entity representing the pose of the viewer.
         */
        this.eye = this.contextService.entities.add(new Entity({
            id: EYE_ENTITY_ID,
            name: 'Eye',
            position: new ConstantPositionProperty(undefined, undefined),
            orientation: new ConstantProperty(Quaternion.IDENTITY)
        }));
        /**
         * An entity representing the physical pose of the viewer.
         */
        this.physicalEye = this.contextService.entities.add(new Entity({
            id: PHYSICAL_EYE_ENTITY_ID,
            name: 'Physical Eye',
            position: new ConstantPositionProperty(undefined, undefined),
            orientation: new ConstantProperty(Quaternion.IDENTITY)
        }));
        this.sessionService.manager.on['ar.view.suggestedViewState'] = (viewState) => {
            this.suggestedViewState = viewState;
        };
        this.contextService.frameStateEvent.addEventListener((state) => {
            this._processFrameState(state);
        });
        this._processFrameState(this.contextService.serializedFrameState);
    }
    _processFrameState(state) {
        const serializedSubviewList = state.subviews;
        const subviews = this._subviews;
        subviews.length = serializedSubviewList.length;
        let index = 0;
        for (const serializedSubview of serializedSubviewList) {
            const id = 'ar.view_' + index;
            const subviewPose = serializedSubview.pose || IDENTITY_SUBVIEW_POSE;
            this.contextService.updateEntityFromSerializedPose(id, subviewPose);
            const subviewEntity = this.contextService.entities.getById(id);
            const subview = subviews[index] = subviews[index] || {};
            subview.index = index;
            subview.type = serializedSubview.type;
            subview.pose = this.contextService.getEntityPose(subviewEntity);
            subview.viewport = subview.viewport || {};
            subview.viewport.x = serializedSubview.viewport.x;
            subview.viewport.y = serializedSubview.viewport.y;
            subview.viewport.width = serializedSubview.viewport.width;
            subview.viewport.height = serializedSubview.viewport.height;
            subview.frustum = this._frustums[index] =
                this._frustums[index] || new PerspectiveFrustum();
            decomposePerspectiveProjectionMatrix(serializedSubview.projectionMatrix, subview.frustum);
            subview['projectionMatrix'] = subview.frustum.projectionMatrix;
            index++;
        }
        // if the manager has not given us a physical eye pose, update from device orientation
        if (!state.entities || !state.entities[this.physicalEye.id]) {
            updatePhysicalEyePoseFromDeviceOrientation(this.contextService);
        }
    }
    get eyeHeadingAccuracy() {
        return this.eye['meta'].headingAccuracy;
    }
    get element() {
        return this.viewportService.element;
    }
    get viewport() {
        return this.viewportService.current;
    }
    get subviews() {
        return this._subviews;
    }
    getSubviews() {
        return this._subviews;
    }
    getSubviewEntity(index) {
        const subviewEntity = this.contextService.entities.getOrCreateEntity('ar.view_' + index);
        if (!subviewEntity.position) {
            subviewEntity.position = new ConstantPositionProperty();
        }
        if (!subviewEntity.orientation) {
            subviewEntity.orientation = new ConstantProperty();
        }
        return subviewEntity;
    }
    /**
     * Request an animation frame callback.
     */
    requestAnimationFrame(callback) {
        const onFrame = () => {
            tick();
            if (this.suggestedViewState) {
                callback(clock.currentTime);
            }
            else
                this.requestAnimationFrame(callback);
        };
        if (currentVRDisplay) {
            return currentVRDisplay.requestAnimationFrame(onFrame);
        }
        else {
            return requestAnimationFrame(onFrame);
        }
    }
};
__decorate([
    deprecated('app.viewport.element'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewService.prototype, "element", null);
__decorate([
    deprecated('app.viewport.current'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewService.prototype, "viewport", null);
ViewService = __decorate([
    autoinject,
    __metadata("design:paramtypes", [SessionService,
        ContextService,
        ViewportService])
], ViewService);
export { ViewService };
let ViewServiceProvider = class ViewServiceProvider {
    constructor(sessionService, contextService, contextServiceProvider, viewService, viewportService, locationService) {
        this.sessionService = sessionService;
        this.contextService = contextService;
        this.contextServiceProvider = contextServiceProvider;
        this.viewService = viewService;
        this.viewportService = viewportService;
        this.locationService = locationService;
        this.autoSubmitFrame = true;
        this.contextServiceProvider.publishingReferenceFrameMap.set(this.viewService.eye.id, STAGE_ENTITY_ID);
        this.contextServiceProvider.publishingReferenceFrameMap.set(this.viewService.physicalEye.id, PHYSICAL_STAGE_ENTITY_ID);
        const onAnimationFrame = () => {
            if (!this.sessionService.manager.isClosed)
                this.viewService.requestAnimationFrame(onAnimationFrame);
            this.update();
        };
        this.viewService.requestAnimationFrame(onAnimationFrame);
        this.contextService.postRenderEvent.addEventListener(() => {
            if (this.autoSubmitFrame && currentVRDisplay && currentVRDisplay.isPresenting) {
                currentVRDisplay.submitFrame();
            }
        });
        const handleVRDisplayPresentChange = (e) => {
            const vrDisplay = e.display || e.detail.vrdisplay || e.detail.display;
            if (vrDisplay) {
                const layers = vrDisplay.getLayers();
                let isThisView = currentVRDisplay === vrDisplay;
                for (const layer of layers) {
                    if (layer.source && this.viewportService.element.contains(layer.source)) {
                        isThisView = true;
                        break;
                    }
                }
                if (isThisView) {
                    if (vrDisplay.isPresenting) {
                        currentVRDisplay = vrDisplay;
                        if (vrDisplay.displayName.match(/Cardboard/g)) {
                            vrDisplay.getLayers()[0].source.classList.add('argon-interactive');
                            this.viewportService.requestPresentationMode(1 /* IMMERSIVE */);
                        }
                    }
                    else {
                        currentVRDisplay = undefined;
                        if (vrDisplay.displayName.match(/Cardboard/g)) {
                            vrDisplay.getLayers()[0].source.classList.remove('argon-interactive');
                        }
                    }
                }
            }
            this.viewportService.presentationModeChangeEvent.addEventListener(() => {
                if (this.viewportService.presentationMode === 0 /* EMBEDDED */)
                    this.exitPresentHMD();
            });
        };
        window.addEventListener('vrdisplaypresentchange', handleVRDisplayPresentChange);
        this.update();
    }
    update() {
        // update view state and physical eye entities
        this.onUpdate();
        // publish the view state and the physical eye entities.
        this.contextServiceProvider.publishEntityState(this.viewService.physicalEye);
        this.sessionService.managedSessions.forEach((s) => {
            if (Role.isRealityViewer(s.info.role))
                s.send('ar.view.suggestedViewState', this.viewService.suggestedViewState);
        });
    }
    onUpdate() {
        if (currentVRDisplay) {
            this._updateViewFromWebVR(currentVRDisplay);
        }
        this._updateViewSingular();
    }
    get isPresentingHMD() {
        return !!(currentVRDisplay && currentVRDisplay.isPresenting);
    }
    requestPresentHMD() {
        if (typeof navigator !== 'undefined' &&
            navigator.getVRDisplays) {
            const requestPresent = (vrDisplay) => {
                currentVRDisplay = vrDisplay;
                const element = this.viewportService.element;
                const layers = [];
                layers[0] = { source: element.querySelector('canvas') || element.lastElementChild };
                return vrDisplay.requestPresent(layers).catch((e) => {
                    currentVRDisplay = undefined;
                    throw e;
                });
            };
            if (navigator.activeVRDisplays && navigator.activeVRDisplays.length) {
                return requestPresent(navigator.activeVRDisplays[0]);
            }
            else {
                return navigator.getVRDisplays()
                    .then(displays => displays[0])
                    .then(requestPresent);
            }
        }
        throw new Error('No HMD available');
    }
    exitPresentHMD() {
        if (currentVRDisplay) {
            const vrDisplay = currentVRDisplay;
            currentVRDisplay = undefined;
            return vrDisplay.exitPresent();
        }
        return Promise.resolve();
    }
    _updateViewSingular() {
        const suggestedViewState = this.viewService.suggestedViewState =
            this.viewService.suggestedViewState || {};
        const viewport = suggestedViewState.viewport = suggestedViewState.viewport || {};
        viewport.x = 0;
        viewport.y = 0;
        viewport.width = this.viewportService.element.clientWidth;
        viewport.height = this.viewportService.element.clientHeight;
        const subviews = suggestedViewState.subviews = suggestedViewState.subviews || [];
        subviews.length = 1;
        const subview = subviews[0] = subviews[0] || {};
        subview.type = SubviewType.SINGULAR;
        subview.viewport = subview.viewport || {};
        subview.viewport.x = 0;
        subview.viewport.y = 0;
        subview.viewport.width = viewport.width;
        subview.viewport.height = viewport.height;
        const aspect = viewport.width / viewport.height;
        scratchFrustum.near = 0.01;
        scratchFrustum.far = 500000000;
        scratchFrustum.fov = Math.PI / 3;
        scratchFrustum.aspectRatio = isNaN(aspect) ? 1 : aspect;
        subview.projectionMatrix = Matrix4.clone(scratchFrustum.projectionMatrix, subview.projectionMatrix);
        updatePhysicalEyePoseFromDeviceOrientation(this.contextService);
    }
    _updateViewFromWebVR(vrDisplay) {
        const suggestedViewState = this.viewService.suggestedViewState =
            this.viewService.suggestedViewState || {};
        const viewport = suggestedViewState.viewport = suggestedViewState.viewport || {};
        viewport.x = 0;
        viewport.y = 0;
        viewport.width = this.viewportService.element.clientWidth;
        viewport.height = this.viewportService.element.clientHeight;
        const vrFrameData = this._vrFrameData =
            this._vrFrameData || new VRFrameData();
        if (!vrDisplay['getFrameData'](vrFrameData))
            return this.viewService.suggestedViewState;
        const layers = vrDisplay.getLayers();
        const leftBounds = layers[0].leftBounds;
        const rightBounds = layers[0].rightBounds;
        const subviews = suggestedViewState.subviews = suggestedViewState.subviews || [];
        const leftSubview = subviews[0] = subviews[0] || {};
        const rightSubview = subviews[1] = subviews[1] || {};
        leftSubview.type = SubviewType.LEFTEYE;
        rightSubview.type = SubviewType.RIGHTEYE;
        const leftViewport = leftSubview.viewport = leftSubview.viewport || {};
        leftViewport.x = leftBounds[0] * viewport.width;
        leftViewport.y = leftBounds[1] * viewport.height;
        leftViewport.width = leftBounds[2] * viewport.width;
        leftViewport.height = leftBounds[3] * viewport.height;
        const rightViewport = rightSubview.viewport = rightSubview.viewport || {};
        rightViewport.x = rightBounds[0] * viewport.width;
        rightViewport.y = rightBounds[1] * viewport.height;
        rightViewport.width = rightBounds[2] * viewport.width;
        rightViewport.height = rightBounds[3] * viewport.height;
        leftSubview.projectionMatrix = Matrix4.clone(vrFrameData.leftProjectionMatrix, leftSubview.projectionMatrix);
        rightSubview.projectionMatrix = Matrix4.clone(vrFrameData.rightProjectionMatrix, rightSubview.projectionMatrix);
        const inverseStandingMatrix = Matrix4.IDENTITY.clone(scratchMatrix4);
        if (vrDisplay.stageParameters) {
            Matrix4.inverseTransformation(vrDisplay.stageParameters.sittingToStandingTransform, inverseStandingMatrix);
        }
        const inverseStandingRotationMatrix = Matrix4.getRotation(inverseStandingMatrix, scratchMatrix3);
        const inverseStandingOrientation = Quaternion.fromRotationMatrix(inverseStandingRotationMatrix, scratchQuaternion);
        const leftStandingViewMatrix = Matrix4.multiplyTransformation(vrFrameData.leftViewMatrix, inverseStandingMatrix, scratchMatrix4);
        const rightStandingViewMatrix = Matrix4.multiplyTransformation(vrFrameData.rightViewMatrix, inverseStandingMatrix, scratchMatrix4);
        const sittingEyePosition = Cartesian3.unpack(vrFrameData.pose.position, 0, scratchCartesian);
        const stageEyePosition = Matrix4.multiplyByPoint(inverseStandingMatrix, sittingEyePosition, scratchCartesian);
        const sittingEyeOrientation = Quaternion.unpack(vrFrameData.pose.orientation, 0, scratchQuaternion2);
        const stageEyeOrientation = Quaternion.multiply(inverseStandingOrientation, sittingEyeOrientation, scratchQuaternion);
        const eye = this.viewService.physicalEye;
        const stage = this.locationService.physicalStage;
        if (!vrDisplay.displayName.match(/polyfill/g)) {
            eye.position.setValue(stageEyePosition, stage);
            eye.orientation.setValue(stageEyeOrientation);
        }
        else {
            // The polyfill does not support reporting an absolute orientation (yet), 
            // so fall back to our own pose calculation if we are using the polyfill device
            updatePhysicalEyePoseFromDeviceOrientation(this.contextService);
        }
        const leftEye = this.viewService.getSubviewEntity(0);
        const stageLeftEyePosition = Matrix4.getTranslation(leftStandingViewMatrix, scratchCartesian);
        leftEye.position.setValue(stageLeftEyePosition, stage);
        const rightEye = this.viewService.getSubviewEntity(1);
        const stageRightEyePosition = Matrix4.getTranslation(rightStandingViewMatrix, scratchCartesian);
        rightEye.position.setValue(stageRightEyePosition, stage);
    }
};
ViewServiceProvider = __decorate([
    autoinject,
    __metadata("design:paramtypes", [SessionService,
        ContextService,
        ContextServiceProvider,
        ViewService,
        ViewportService,
        LocationService])
], ViewServiceProvider);
export { ViewServiceProvider };
let deviceOrientationListener;
let deviceOrientation;
let deviceOrientationHeadingAccuracy;
function updatePhysicalEyePoseFromDeviceOrientation(contextService) {
    const eye = contextService.entities.getById(PHYSICAL_EYE_ENTITY_ID);
    const stage = contextService.entities.getById(PHYSICAL_STAGE_ENTITY_ID);
    if (eye) {
        ensureOrientationUpdates();
        if (!deviceOrientation)
            return;
        const screenOrientationDegrees = (screen['orientation'] && screen['orientation'].angle) || window.orientation || 0;
        const displayOrientation = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, -screenOrientationDegrees * CesiumMath.RADIANS_PER_DEGREE, scratchQuaternion2);
        eye.position.setValue(Cartesian3.fromElements(0, 0, AVERAGE_HUMAN_HEIGHT, scratchCartesian), stage);
        eye.orientation.setValue(Quaternion.multiply(deviceOrientation, displayOrientation, scratchQuaternion));
    }
}
function ensureOrientationUpdates() {
    if (typeof window == 'undefined' || !window.addEventListener)
        throw new Error('Orientation updates not supported');
    if (defined(deviceOrientationListener))
        return;
    let headingDrift = 0;
    let alphaOffset = undefined;
    deviceOrientationListener = (e) => {
        let alphaDegrees = e.alpha;
        let webkitCompassHeading = e['webkitCompassHeading'];
        const webkitCompassAccuracy = +e['webkitCompassAccuracy'];
        if (!defined(alphaDegrees)) {
            return;
        }
        if (e.absolute) {
            alphaOffset = 0;
        }
        // when the phone is almost updside down, webkit flips the compass heading 
        // (not documented anywhere, annoyingly)
        // if (e.beta >= 130 || e.beta <= -130) webkitCompassHeading = undefined;
        deviceOrientationHeadingAccuracy = webkitCompassAccuracy > 0 ? webkitCompassAccuracy : undefined;
        if ((!defined(alphaOffset) || Math.abs(headingDrift) > 5) &&
            defined(webkitCompassHeading) &&
            webkitCompassAccuracy >= 0 &&
            webkitCompassAccuracy < 50 &&
            webkitCompassHeading >= 0) {
            if (!defined(alphaOffset)) {
                alphaOffset = -webkitCompassHeading;
            }
            else {
                alphaOffset -= headingDrift;
            }
        }
        if (!defined(alphaOffset))
            return;
        const alpha = CesiumMath.RADIANS_PER_DEGREE * (e.alpha + alphaOffset || -webkitCompassHeading || 0);
        const beta = CesiumMath.RADIANS_PER_DEGREE * e.beta;
        const gamma = CesiumMath.RADIANS_PER_DEGREE * e.gamma;
        const alphaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, alpha, scratchQuaternion);
        const betaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, beta, scratchQuaternion2);
        const alphaBetaQuat = Quaternion.multiply(alphaQuat, betaQuat, scratchQuaternion);
        const gammaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Y, gamma, scratchQuaternion2);
        const alphaBetaGammaQuat = Quaternion.multiply(alphaBetaQuat, gammaQuat, scratchQuaternion);
        deviceOrientation = Quaternion.clone(alphaBetaGammaQuat, deviceOrientation);
        // TODO: fix heading drift calculation (heading should match webkitCompassHeading)
        // if (defined(webkitCompassHeading)) {
        //     const q = alphaBetaGammaQuat//utils.getEntityOrientationInReferenceFrame(this.interfaceEntity, JulianDate.now(), this.locationEntity, this._scratchQuaternion1);
        //     var heading = -Math.atan2(2*(q.w*q.z + q.x*q.y), 1 - 2*(q.y*q.y + q.z*q.z));
        //     if (heading < 0) heading += 2*Math.PI;
        //     const {swing,twist} = swingTwistDecomposition(alphaBetaGammaQuat, Cartesian3.UNIT_Z);
        //     const twistAngle = 2 * Math.acos(twist.w);
        //     console.log(twist.w + ' ' + twistAngle * CesiumMath.DEGREES_PER_RADIAN + '\n' + webkitCompassHeading);
        //     // this._headingDrift = webkitCompassHeading - heading * CesiumMath.DEGREES_PER_RADIAN;
        // }
    };
    if ('ondeviceorientationabsolute' in window) {
        window.addEventListener('deviceorientationabsolute', deviceOrientationListener);
    }
    else if ('ondeviceorientation' in window) {
        window.addEventListener('deviceorientation', deviceOrientationListener);
    }
}
const clock = new Clock();
const scratchTime = new JulianDate(0, 0);
// Enforce monotonically increasing time, and deal with 
// clock drift by either slowing down or speeding up,
// while never going backwards
function tick() {
    const secondsBeforeTick = clock.currentTime.secondsOfDay;
    clock.tick();
    const secondsAfterTick = clock.currentTime.secondsOfDay;
    const now = JulianDate.now(scratchTime);
    const secondsDrift = JulianDate.secondsDifference(clock.currentTime, now);
    if (secondsDrift > 0.033) {
        const halfTimeStep = (secondsAfterTick - secondsBeforeTick) / 2;
        clock.currentTime.secondsOfDay -= halfTimeStep;
    }
    else if (secondsDrift < 0.5) {
        JulianDate.clone(now, clock.currentTime);
    }
}

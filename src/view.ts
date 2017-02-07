import { autoinject, Container } from 'aurelia-dependency-injection'
import { 
    ConstantPositionProperty,
    ConstantProperty,
    Clock,
    Entity, 
    Matrix3,
    Matrix4, 
    PerspectiveFrustum, 
    Cartesian3, 
    Quaternion,
    JulianDate,
    CesiumMath,
    // ReferenceFrame,
    // Transforms,
    defined
} from './cesium/cesium-imports'
import { SessionService } from './session'
import { ViewportService, PresentationMode } from './viewport'
import { 
    LocationService
} from './location'
import { 
    Role, 
    FrameState,
    Viewport, 
    SubviewType, 
    SerializedSubviewList, 
    AVERAGE_HUMAN_HEIGHT,
    STAGE_ENTITY_ID, 
    PHYSICAL_STAGE_ENTITY_ID,
    EYE_ENTITY_ID,
    PHYSICAL_EYE_ENTITY_ID
} from './common'
import { EntityPose, ContextService, ContextServiceProvider } from './context'
import {
    deprecated,
    // getAncestorReferenceFrames,
    // getEntityPositionInReferenceFrame,
    decomposePerspectiveProjectionMatrix
} from './utils'

/**
 * The rendering paramters for a particular subview
 */
export class Subview {
    index: number;
    type: SubviewType;
    frustum: PerspectiveFrustum;
    pose: EntityPose;
    viewport: Viewport;
}

const scratchCartesian = new Cartesian3;
// const scratchCartesian2 = new Cartesian3;
const scratchQuaternion = new Quaternion;
const scratchQuaternion2 = new Quaternion;
const scratchMatrix3 = new Matrix3;
const scratchMatrix4 = new Matrix4;
const scratchFrustum = new PerspectiveFrustum();

export interface ViewState {
    viewport: Viewport,
    subviews: SerializedSubviewList, 
    strict: boolean
};

const IDENTITY_SUBVIEW_POSE = {p:Cartesian3.ZERO, o:Quaternion.IDENTITY, r:EYE_ENTITY_ID};

let currentVRDisplay:any;

@autoinject
export class ViewService {

    private _subviews: Subview[] = [];
    private _frustums: PerspectiveFrustum[] = [];

    constructor(
        private sessionService: SessionService,
        private contextService: ContextService,
        private viewportService: ViewportService,
        container: Container
    ) {
        this.sessionService.manager.on['ar.view.suggestedViewState'] = (viewState:ViewState) => {
            this.suggestedViewState = viewState;
        };

        this.contextService.frameStateEvent.addEventListener((state) => {
            this._processFrameState(state);
        });
        this._processFrameState(this.contextService.serializedFrameState);

        // backwards-compatability hack: if using an older manager version,
        // we have to provide the suggestedViewState ourselves
        this.sessionService.manager.connectEvent.addEventListener(()=>{
            if (this.sessionService.manager.version[0] === 0) {
                container.get(ViewServiceProvider);
            }
        })
    }

    private _processFrameState(state:FrameState) {
        // if the manager has not given us a physical eye pose, update from device orientation
        if (!state.entities || !state.entities[this.physicalEye.id]) {
            updatePhysicalEyePoseFromDeviceOrientation(this.contextService);
        }

        const serializedSubviewList = state.subviews;
        const subviews: Subview[] = this._subviews;
        subviews.length = serializedSubviewList.length;

        let index = 0;
        for (const serializedSubview of serializedSubviewList) {
            const id = 'ar.view_' + index;
            const subviewPose = serializedSubview.pose || IDENTITY_SUBVIEW_POSE;
            this.contextService.updateEntityFromSerializedPose(id, subviewPose);
            const subviewEntity = this.contextService.entities.getById(id)!;
            const subview = subviews[index] = subviews[index] || <Subview>{};
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
            subview['projectionMatrix'] = <Matrix4>subview.frustum.projectionMatrix;
            index++;
        }
    }
     
    /**
     * An entity representing the pose of the viewer. 
     */
    public eye: Entity = this.contextService.entities.add(new Entity({
        id: EYE_ENTITY_ID,
        name: 'Eye',
        position: new ConstantPositionProperty(undefined, undefined),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    }));

    public get eyeHeadingAccuracy() : number|undefined {
        return this.eye['meta'].headingAccuracy;
    }    
    
    /**
     * An entity representing the physical pose of the viewer. 
     */
    public physicalEye: Entity = this.contextService.entities.add(new Entity({
        id: PHYSICAL_EYE_ENTITY_ID,
        name: 'Physical Eye',
        position: new ConstantPositionProperty(undefined, undefined),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    }));

    public suggestedViewState? : ViewState;

    public get element() {
        return this.viewportService.element;
    }

    @deprecated('app.viewport.current')
    public getViewport() {
        return this.viewportService.current;
    }

    public get subviews() {
        return this._subviews;
    }

    public getSubviews(): Subview[] {
        return this._subviews;
    }

    public getSubviewEntity(index:number) {
        const subviewEntity = this.contextService.entities.getOrCreateEntity('ar.view_'+index);
        if (!subviewEntity.position) {
            subviewEntity.position = new ConstantPositionProperty();
        }
        if (!subviewEntity.orientation) {
            subviewEntity.orientation = new ConstantProperty();
        }
        return subviewEntity;
    }

    /**
     * Request an animation frame cal\\\\\\\\\\\\\]]]]]]]]]]]\\\\lback.
     */
    public requestAnimationFrame(callback:(now:JulianDate)=>void) {
        const onFrame = () => {
            tick();
            if (this.suggestedViewState) {
                callback(clock.currentTime);
            } else this.requestAnimationFrame(callback);
        }
        if (currentVRDisplay) {
            return (currentVRDisplay as VRDisplay).requestAnimationFrame(onFrame);
        } else {
            return requestAnimationFrame(onFrame);
        }
    }
}

@autoinject
export class ViewServiceProvider {

    public autoSubmitFrame = true;

    constructor(
        private sessionService: SessionService,
        private contextService: ContextService,
        private contextServiceProvider: ContextServiceProvider,
        private viewService: ViewService,
        private viewportService:ViewportService,
        private locationService:LocationService
    ) {
            
        this.contextServiceProvider.publishingReferenceFrameMap.set(this.viewService.eye.id, STAGE_ENTITY_ID);
        this.contextServiceProvider.publishingReferenceFrameMap.set(this.viewService.physicalEye.id, PHYSICAL_STAGE_ENTITY_ID);

        const onAnimationFrame = () => {
            if (!this.sessionService.manager.isClosed) 
                this.viewService.requestAnimationFrame(onAnimationFrame);
            this.update();
        }
        this.viewService.requestAnimationFrame(onAnimationFrame);

        this.contextService.postRenderEvent.addEventListener(()=>{
            if (this.autoSubmitFrame && currentVRDisplay && currentVRDisplay.isPresenting) {
                currentVRDisplay.submitFrame();
            }
        });

        let currentCanvas:HTMLElement|undefined;
        let previousPresentationMode:PresentationMode;

        const handleVRDisplayPresentChange = (e) => {
            const vrDisplay:VRDisplay|undefined = e.display || e.detail.vrdisplay || e.detail.display;
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
                            currentCanvas = vrDisplay.getLayers()[0].source;
                            if (currentCanvas) currentCanvas.classList.add('argon-interactive');
                            previousPresentationMode = this.viewportService.presentationMode;
                            this.viewportService.requestPresentationMode(PresentationMode.IMMERSIVE);
                        }
                    } else {
                        currentVRDisplay = undefined;
                        if (currentCanvas && vrDisplay.displayName.match(/Cardboard/g)) {
                            currentCanvas.classList.remove('argon-interactive');
                            currentCanvas = undefined;
                            this.viewportService.requestPresentationMode(previousPresentationMode);
                        }
                    }
                }
            }

            this.viewportService.presentationModeChangeEvent.addEventListener((mode)=>{
                if (mode === PresentationMode.PAGE) 
                    this.exitPresentHMD();
            });
        }
        window.addEventListener('vrdisplaypresentchange', handleVRDisplayPresentChange);

        this.update();
    }

    public update() {
        // update view state and physical eye entities
        this.onUpdate();

        // publish the view state and the physical eye entities.
        this.contextServiceProvider.publishEntityState(this.viewService.physicalEye);
        this.sessionService.managedSessions.forEach((s)=>{
            if (Role.isRealityViewer(s.info.role))
                s.send('ar.view.suggestedViewState', this.viewService.suggestedViewState);
        });
    }

    protected onUpdate() {
        if (currentVRDisplay) {
           this._updateViewFromWebVR(currentVRDisplay);
        } else {
            this._updateViewSingular();
        }
    }

    public get isPresentingHMD() {
        return !!(currentVRDisplay && (currentVRDisplay as VRDisplay).isPresenting);
    }

    public requestPresentHMD() : Promise<void> {
        if (typeof navigator !== 'undefined' &&
            navigator.getVRDisplays) {
            const requestPresent = (vrDisplay:VRDisplay) => {
                currentVRDisplay = vrDisplay;
                const element = this.viewportService.element;
                const layers:VRLayer[] = [];
                layers[0] = {source:element.querySelector('canvas') || <HTMLCanvasElement>element.lastElementChild};
                return vrDisplay.requestPresent(layers).catch((e)=>{
                    currentVRDisplay = undefined;
                    throw e;
                });
            }
            if (navigator.activeVRDisplays && navigator.activeVRDisplays.length) {
                return requestPresent(navigator.activeVRDisplays[0]);
            } else {
                return navigator.getVRDisplays()
                    .then(displays => displays[0])
                    .then(requestPresent);
            }
        }
        throw new Error('No HMD available');
    }

    public exitPresentHMD() : Promise<void> {
        if (currentVRDisplay) {
            const vrDisplay:VRDisplay = currentVRDisplay;
            currentVRDisplay = undefined;
            return vrDisplay.exitPresent();
        }
        return Promise.resolve();
    }

    private _updateViewSingular() {
        const suggestedViewState = this.viewService.suggestedViewState = 
            this.viewService.suggestedViewState || <ViewState>{};
        const viewport = suggestedViewState.viewport = suggestedViewState.viewport || <Viewport>{};
        viewport.x = 0;
        viewport.y = 0;
        viewport.width = this.viewportService.rootElement.clientWidth;
        viewport.height = this.viewportService.rootElement.clientHeight;

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
        scratchFrustum.aspectRatio = isFinite(aspect) && aspect !== 0 ? aspect : 1;
        subview.projectionMatrix = Matrix4.clone(scratchFrustum.projectionMatrix, subview.projectionMatrix);

        updatePhysicalEyePoseFromDeviceOrientation(this.contextService);
    }

    private _vrFrameData?:any;

    private _updateViewFromWebVR(vrDisplay : VRDisplay) {

        const suggestedViewState = this.viewService.suggestedViewState = 
            this.viewService.suggestedViewState || <ViewState>{};

        const viewport = suggestedViewState.viewport = suggestedViewState.viewport || <Viewport>{};
        viewport.x = 0;
        viewport.y = 0;
        viewport.width = this.viewportService.rootElement.clientWidth;
        viewport.height = this.viewportService.rootElement.clientHeight;

        const vrFrameData : VRFrameData = this._vrFrameData = 
            this._vrFrameData || new VRFrameData();
        if (!vrDisplay['getFrameData'](vrFrameData)) 
            return this.viewService.suggestedViewState;

        const layers = vrDisplay.getLayers();
        const leftBounds = layers[0].leftBounds!;
        const rightBounds = layers[0].rightBounds!;
        
        const subviews = suggestedViewState.subviews = suggestedViewState.subviews || [];

        const leftSubview = subviews[0] = subviews[0] || {};
        const rightSubview = subviews[1] = subviews[1] || {};
        leftSubview.type = SubviewType.LEFTEYE;
        rightSubview.type = SubviewType.RIGHTEYE;
        const leftViewport = leftSubview.viewport = leftSubview.viewport || <Viewport>{};
        leftViewport.x = leftBounds[0] * viewport.width;
        leftViewport.y = leftBounds[1] * viewport.height;
        leftViewport.width = leftBounds[2] * viewport.width;
        leftViewport.height = leftBounds[3] * viewport.height;
        const rightViewport = rightSubview.viewport = rightSubview.viewport || <Viewport>{};
        rightViewport.x = rightBounds[0] * viewport.width;
        rightViewport.y = rightBounds[1] * viewport.height;
        rightViewport.width = rightBounds[2] * viewport.width;
        rightViewport.height = rightBounds[3] * viewport.height;

        leftSubview.projectionMatrix = Matrix4.clone(
            <any>vrFrameData.leftProjectionMatrix, 
            leftSubview.projectionMatrix
        );
        rightSubview.projectionMatrix = Matrix4.clone(
            <any>vrFrameData.rightProjectionMatrix, 
            rightSubview.projectionMatrix
        );

        const inverseStandingMatrix = Matrix4.IDENTITY.clone(scratchMatrix4);
        if (vrDisplay.stageParameters) {
            Matrix4.inverseTransformation(
                <any>vrDisplay.stageParameters.sittingToStandingTransform, 
                inverseStandingMatrix
            );
        }

        const inverseStandingRotationMatrix = Matrix4.getRotation(inverseStandingMatrix, scratchMatrix3);
        const inverseStandingOrientation = Quaternion.fromRotationMatrix(inverseStandingRotationMatrix, scratchQuaternion)

        const leftStandingViewMatrix = Matrix4.multiplyTransformation(
            <any>vrFrameData.leftViewMatrix, 
            inverseStandingMatrix, 
            scratchMatrix4
        );

        const rightStandingViewMatrix = Matrix4.multiplyTransformation(
            <any>vrFrameData.rightViewMatrix, 
            inverseStandingMatrix, 
            scratchMatrix4
        );
        const eye = this.viewService.physicalEye;
        const stage = this.locationService.physicalStage;

        if (!vrDisplay.displayName.match(/polyfill/g)) {
            const sittingEyePosition : Cartesian3|undefined = vrFrameData.pose.position ? 
                Cartesian3.unpack(<any>vrFrameData.pose.position, 0, scratchCartesian) : undefined;
            const stageEyePosition : Cartesian3|undefined = sittingEyePosition ? 
                Matrix4.multiplyByPoint(inverseStandingMatrix, sittingEyePosition, scratchCartesian) : undefined;
            const sittingEyeOrientation : Quaternion|undefined = vrFrameData.pose.orientation ? 
                Quaternion.unpack(<any>vrFrameData.pose.orientation, 0, scratchQuaternion2) : undefined;
            const stageEyeOrientation = sittingEyeOrientation ? 
                Quaternion.multiply(inverseStandingOrientation, sittingEyeOrientation, scratchQuaternion) : undefined;

            (eye.position as ConstantPositionProperty).setValue(stageEyePosition, stage);
            (eye.orientation as ConstantProperty).setValue(stageEyeOrientation);
        } else {
            // The polyfill does not support reporting an absolute orientation (yet), 
            // so fall back to our own pose calculation if we are using the polyfill device
            updatePhysicalEyePoseFromDeviceOrientation(this.contextService);
        }

        const leftEye = this.viewService.getSubviewEntity(0);
        const stageLeftEyePosition = Matrix4.getTranslation(leftStandingViewMatrix, scratchCartesian);
        (leftEye.position as ConstantPositionProperty).setValue(stageLeftEyePosition, stage);

        const rightEye = this.viewService.getSubviewEntity(1);
        const stageRightEyePosition = Matrix4.getTranslation(rightStandingViewMatrix, scratchCartesian);
        (rightEye.position as ConstantPositionProperty).setValue(stageRightEyePosition, stage);
    }
}

let deviceOrientationListener;

let deviceOrientation:Quaternion|undefined;
let deviceOrientationHeadingAccuracy:number|undefined;

function updatePhysicalEyePoseFromDeviceOrientation(contextService:ContextService) {
    const physicalEye = contextService.entities.getById(PHYSICAL_EYE_ENTITY_ID);
    const physicalStage = contextService.entities.getById(PHYSICAL_STAGE_ENTITY_ID);

    if (physicalEye) {
        ensureOrientationUpdates();

        if (!deviceOrientation) {
            (physicalEye.position as ConstantPositionProperty).setValue(
                undefined,
                undefined
            );

            (physicalEye.orientation as ConstantProperty).setValue(
                undefined
            );

            physicalEye['meta'] = undefined;

            return;
        }

        const screenOrientationDegrees = (screen['orientation'] && screen['orientation'].angle) || window.orientation || 0;

        const displayOrientation = 
            Quaternion.fromAxisAngle(
                Cartesian3.UNIT_Z, 
                - screenOrientationDegrees * CesiumMath.RADIANS_PER_DEGREE, 
                scratchQuaternion2
            );
        
        (physicalEye.position as ConstantPositionProperty).setValue(
            Cartesian3.fromElements(0,0,AVERAGE_HUMAN_HEIGHT, scratchCartesian), 
            physicalStage
        );

        (physicalEye.orientation as ConstantProperty).setValue(
            Quaternion.multiply(
                deviceOrientation, 
                displayOrientation, 
                scratchQuaternion
            )
        );

        physicalEye['meta'] = physicalEye['meta'] || {};
        physicalEye['meta'].headingAccuracy = deviceOrientationHeadingAccuracy;
        
    }
}

function ensureOrientationUpdates(this:void) : void {
    if (typeof window == 'undefined' || !window.addEventListener) 
        throw new Error('Orientation updates not supported');

    if (defined(deviceOrientationListener)) return;

    let headingDrift = 0;
    let alphaOffset:number|undefined = undefined;

    deviceOrientationListener = (e: DeviceOrientationEvent) => {

        let alphaDegrees = e.alpha;
        let webkitCompassHeading: number = e['webkitCompassHeading'];
        const webkitCompassAccuracy: number = +e['webkitCompassAccuracy'];

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
            // webkitCompassAccuracy < 50 &&
            webkitCompassHeading >= 0) {
            if (!defined(alphaOffset)) {
                alphaOffset = -webkitCompassHeading;
            } else {
                alphaOffset -= headingDrift;
            }
        }

        if (!defined(alphaOffset)) return;

        const alpha = CesiumMath.RADIANS_PER_DEGREE * (e.alpha + alphaOffset || -webkitCompassHeading || 0);
        const beta = CesiumMath.RADIANS_PER_DEGREE * e.beta;
        const gamma = CesiumMath.RADIANS_PER_DEGREE * e.gamma;

        const alphaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, alpha, scratchQuaternion);
        const betaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, beta, scratchQuaternion2);
        const alphaBetaQuat = Quaternion.multiply(alphaQuat, betaQuat, scratchQuaternion);
        const gammaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Y, gamma, scratchQuaternion2);
        const alphaBetaGammaQuat = Quaternion.multiply(alphaBetaQuat, gammaQuat, scratchQuaternion);

        deviceOrientation = Quaternion.clone(alphaBetaGammaQuat, deviceOrientation);
        deviceOrientationHeadingAccuracy = webkitCompassAccuracy;

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
    }

    if ('ondeviceorientationabsolute' in window) {
        window.addEventListener('deviceorientationabsolute', deviceOrientationListener)
    } else if ('ondeviceorientation' in window) {
        window.addEventListener('deviceorientation', deviceOrientationListener)
    }
}


const clock = new Clock();
const scratchTime = new JulianDate(0,0);

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
    } else if (secondsDrift < 0.5) {
        JulianDate.clone(now, clock.currentTime);
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
import { inject } from 'aurelia-dependency-injection'
import {
    Entity,
    ExtrapolationType,
    ReferenceFrame,
    SampledPositionProperty,
    ConstantPositionProperty,
    ConstantProperty,
    Cartesian3,
    Quaternion,
    CesiumMath,
    JulianDate,
    Transforms,
    defined
} from './cesium/cesium-imports'

import MobileDetect from 'mobile-detect'

import { DeviceState, Viewport, SubviewType, SerializedEntityPose, Role } from './common'
import { SessionService, SessionPort } from './session'

import { getSerializedEntityPose } from './utils'

import { RealityService } from './reality'

export enum ZoomState {
    OTHER,
    START,
    CHANGE,
    END
}

export interface ZoomData {
    zoom: number,
    fov: number,
    state: ZoomState
}

/**
* Provides device state. 
*/
@inject(SessionService, RealityService)
export class DeviceService {

    /**
    * Initialize the DeviceService
    */
    constructor(private sessionService: SessionService, private realityService: RealityService) {
        if (typeof navigator !== 'undefined') {
            this._mobileDetect = new MobileDetect(navigator.userAgent);
        }

        this.sessionService.manager.on['ar.device.state'] = (deviceState:DeviceState) => {
            if (this.sessionService.isRealityManager) return;
            this._state = deviceState;
            // TODO: need a better way to update entities from arbitrary SerializedEntityPose. May have to 
            // add functionality to ContextService
            this._updateEntity(deviceState.geolocationPose, this.geolocationEntity, ReferenceFrame.FIXED);
            // only update orientation if we aren't already fetching it on our own
            if (!this._deviceorientationListener) {
                this._updateEntity(deviceState.orientationPose, this.orientationEntity, this.geolocationEntity);
            }
            this._updateEntity(deviceState.devicePose, this.deviceEntity, this.orientationEntity);
            this._updateEntity(deviceState.displayPose, this.displayEntity, this.deviceEntity);
        }

        sessionService.manager.on['ar.reality.zoom'] = // backwards compatability with pre-v1.1 manager
        sessionService.manager.on['ar.device.zoom'] = (data: ZoomData) => {
            this.zoom(data);
        };

        const checkSubscribers = ()=>{
            if (this.locationSubscribers.size > 0) this.startLocationUpdates()
            else this.stopLocationUpdates();
            if (this.orientationSubscribers.size > 0) this.startOrientationUpdates()
            else this.stopOrientationUpdates();
            this.updateDeviceState();
        }

        this.sessionService.connectEvent.addEventListener((session)=>{
            session.on['ar.device.subscribe'] = (o:DeviceStateSubscriptionOptions)=>{
                this.subscribers.add(session);

                if (o.location) this.locationSubscribers.add(session);
                else this.locationSubscribers.delete(session);

                if (o.orientation) this.orientationSubscribers.add(session);
                else this.orientationSubscribers.delete(session);

                const id = setTimeout(()=>{
                    this.subscribers.delete(session);
                    this.locationSubscribers.delete(session);
                    this.orientationSubscribers.delete(session);
                    checkSubscribers();
                },o.timeout);

                const previousId = this._subscriberTimeoutIds.get(session);
                if (previousId !== undefined) clearTimeout(previousId);
                this._subscriberTimeoutIds.set(session, id);

                checkSubscribers();
            }

            session.on['ar.reality.desiredFov'] = // pre-v1.1 backwards compatability
            session.on['ar.device.desiredFov'] = ({fov}:{fov:number}) => {
                this.onDesiredFov(fov);
                this.updateDeviceState();
            }

            // temporary hack until there is a better way for apps to say they need geopose
            if (Role.isRealityAugmenter(session.info.role)) {
                this.locationSubscribers.add(session);
                this.orientationSubscribers.add(session);
            } 
            
            this.updateDeviceState();
        })

        if (this.sessionService.isRealityManager) {
            this.startOrientationUpdates();
            setTimeout(()=>{
                checkSubscribers();
            }, 10000);
            
            if (typeof window !== 'undefined' && window.addEventListener) {

                const updateInterfaceOrientation = () => {
                    const interfaceOrientationProperty = <ConstantProperty>this.displayEntity.orientation;
                    let interfaceOrientation = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, (-window.orientation || 0) * CesiumMath.RADIANS_PER_DEGREE, this._scratchQuaternion1);
                    if (this._mobileDetect && !this._mobileDetect.mobile()) {
                        // for laptops, rotate device orientation by 90° around +X so that it 
                        // corresponds to an upright display rather than the integrated keyboard
                        interfaceOrientation = Quaternion.multiply(this._x90Rot, interfaceOrientation, interfaceOrientation);
                    }
                    interfaceOrientationProperty.setValue(interfaceOrientation);
                }

                window.addEventListener('resize', ()=>{
                    this.state.viewport = this.getMaximumViewport();
                    updateInterfaceOrientation();
                });

                window.addEventListener('orientationchange', ()=> {
                    updateInterfaceOrientation();
                });

            }
        }

        if (this.sessionService.isRealityViewer) {
            this.sessionService.manager.connectEvent.addEventListener(()=>{
                // when the manager connects, get orientation updates from it instead. 
                this.stopOrientationUpdates();
            });
        }
    }

    /**
    * Request device state updates. 
    */
    public update(o?:DeviceStateSubscriptionOptions) {
        this.updateDeviceState();
        if (this.sessionService.isRealityViewer && o && o.orientation) {
            this.startOrientationUpdates();
        }
        if (this._subscriptionTimeoutId || !this.sessionService.manager.isConnected) return;
        o = o || {};
        o.timeout = o.timeout || 3000;
        this._subscriptionTimeoutId = setTimeout(() => {
            this._subscriptionTimeoutId = undefined;
            this.sessionService.manager.send('ar.device.subscribe', o);
        }, o.timeout * 0.75);
    }
    
    /**
     * Update the device state, and send to subscribers. 
     */
    public updateDeviceState() {
        const deviceState = this._state;

        const time = JulianDate.now(<JulianDate>deviceState.time);

        deviceState.geolocationPose = getSerializedEntityPose(
            this.geolocationEntity,
            time,
            ReferenceFrame.FIXED,
        );

        deviceState.orientationPose = getSerializedEntityPose(
            this.orientationEntity,
            time,
            this.geolocationEntity
        );

        deviceState.devicePose = getSerializedEntityPose(
            this.deviceEntity,
            time,
            this.deviceEntity.position && this.deviceEntity.position.referenceFrame
        );

        deviceState.displayPose = getSerializedEntityPose(
            this.displayEntity,
            time,
            this.displayEntity.position && this.displayEntity.position.referenceFrame
        );

        this.subscribers.forEach((options, session)=>{
            session.send('ar.device.state', deviceState);
        });
    }

    /**
     * Set a desired fov in radians.
     */
    public setDesiredFov(fov: number | undefined) {
        this.zoom({ fov: fov || this.state.defaultFov, zoom: 1, state: ZoomState.OTHER })
    }

    /**
     * Set the default fov in radians, and adjust the desired fov to match the 
     * previous desired / default ratio. 
     */
    public setDefaultFov(fov: number) {
        const currentFov = this.state.subviews[0].frustum.fov;
        const ratio = currentFov / this.state.defaultFov;
        this.setDesiredFov(fov * ratio);
        this.state.defaultFov = fov;
    }
    
    /**
     * Get the current device state
     */
    public get state() : DeviceState {
        return this._state;
    }

    /**
     * An ENU coordinate frame centered at the gps location reported by the device. 
     * The reference frame of this frame is the FIXED (ECEF) reference frame.
     */
    public geolocationEntity = new Entity({ id: 'ar.device.geolocation', name: 'Device Geolocation' });

    /**
     * A frame which represents the orientation of the device. If the orientation of the 
     * device is known absolutely, then the reference frame of this frame is the ENU 
     * coordinate frame, [[geolocationEntity]]. Otherwise, the reference frame of this 
     * frame is arbitrary.
     */
    public orientationEntity = new Entity({ id: 'ar.device.orientation', name: 'Device Orientation' });
    
    /**
     * A frame which represents the device. If the geopose is known, the reference frame 
     * for this frame is the [[orientationEntity]]. Otherwise, the reference frame is arbitrary. 
     */
    public deviceEntity = new Entity({ id: 'ar.device', name: 'Device' });
    
    /**
     * A frame which represents the display for the current device.
     * The reference frame for this frame is always the [[deviceEntity]]. 
     */
    public displayEntity = new Entity({
        id: 'ar.device.display',
        name: 'Device Display',
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.deviceEntity),
        orientation: new ConstantProperty(Quaternion.IDENTITY)
    });

    /**
     * The sessions that are subscribed to device state
     */
    protected subscribers = new Set<SessionPort>();

    /**
     * The sessions that are subscribed to the device location
     */
    protected locationSubscribers = new Set<SessionPort>();

    /**
     * The sessions that are subscribed to the device location
     */
    protected orientationSubscribers = new Set<SessionPort>();

    private _subscriberTimeoutIds = new WeakMap<SessionPort, number>();

    private _state:DeviceState = {
        time: JulianDate.now(),
        viewport: this.getMaximumViewport(),
        defaultFov: Math.PI / 2,
        subviews: [{
            type: SubviewType.SINGULAR,
            frustum: {
                fov: Math.PI / 2,
            }
        }],
        geolocationAccuracy: undefined,
        geolocationAltitudeAccuracy: undefined
    };

    private _scratchCartesian = new Cartesian3;
    private _scratchQuaternion1 = new Quaternion;
    private _scratchQuaternion2 = new Quaternion;
    private _x90Rot = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, CesiumMath.PI_OVER_TWO);
    private _geolocationWatchId;
    private _deviceorientationListener;

    private _mobileDetect?: MobileDetect;

    private _alphaOffset?: number;
    private _headingDrift = 0;

    private _subscriptionTimeoutId?: number;

    private _updateEntity(pose:SerializedEntityPose|undefined, entity:Entity, referenceFrame:Entity|ReferenceFrame) {
        if (pose) {
            const positionValue = pose.p === 0 ? Cartesian3.ZERO : <Cartesian3>pose.p;
            const orientationValue = pose.o === 0 ? Quaternion.IDENTITY : <Quaternion>pose.o;
            
            let positionProperty = <ConstantPositionProperty>entity.position;
            if (positionProperty instanceof ConstantPositionProperty) {
                positionProperty.setValue(positionValue);
            } else {
                entity.position = new ConstantPositionProperty(positionValue, referenceFrame);
            }

            let orientationProperty = <ConstantProperty>entity.orientation;
            if (orientationProperty instanceof ConstantProperty) {
                orientationProperty.setValue(orientationValue);
            } else {
                entity.orientation = new ConstantProperty(orientationValue);
            }
        } else {
            entity.position = undefined;
            entity.orientation = undefined;
        }
    }

    protected startLocationUpdates() {
        // defer to the reality manager to get geolocation updates from the device 
        if (!this.sessionService.isRealityManager || typeof navigator == 'undefined') return;

        if (!defined(this._geolocationWatchId)) {
            this._geolocationWatchId = navigator.geolocation.watchPosition((pos) => {
                if (this.geolocationEntity.position instanceof SampledPositionProperty === false) {
                    const sampledPostionProperty = new SampledPositionProperty(ReferenceFrame.FIXED);
                    sampledPostionProperty.forwardExtrapolationType = ExtrapolationType.HOLD;
                    sampledPostionProperty.backwardExtrapolationType = ExtrapolationType.HOLD;
                    sampledPostionProperty.maxNumSamples = 10;
                    this.geolocationEntity.position = sampledPostionProperty;
                }
                const positionTime = JulianDate.fromDate(new Date(pos.timestamp));
                const positionECEF = Cartesian3.fromDegrees(pos.coords.longitude, pos.coords.latitude, pos.coords.altitude || 0, undefined, this._scratchCartesian);
                (this.geolocationEntity.position as SampledPositionProperty).addSample(positionTime, positionECEF);

                if (this.geolocationEntity.orientation instanceof ConstantProperty === false) {
                    this.geolocationEntity.orientation = new ConstantProperty();
                }
                const enuOrientation = Transforms.headingPitchRollQuaternion(positionECEF, 0, 0, 0, undefined, this._scratchQuaternion1);
                (this.geolocationEntity.orientation as ConstantProperty).setValue(enuOrientation);


                this._state.geolocationAccuracy = pos.coords.accuracy;
                this._state.geolocationAltitudeAccuracy = pos.coords.altitudeAccuracy || undefined;
                this.updateDeviceState();
            }, (error) => {
                console.error(error)
            }, {
                    enableHighAccuracy: true
                });
        }

    }

    protected startOrientationUpdates() {
        if (typeof navigator == 'undefined') return;

        if (!defined(this._deviceorientationListener)) {
            this._deviceorientationListener = (e: DeviceOrientationEvent) => {

                let alphaDegrees = e.alpha;

                if (!defined(alphaDegrees)) {
                    return;
                }

                if (e.absolute) {
                    this._alphaOffset = 0;
                }

                let webkitCompassHeading: number = e['webkitCompassHeading'];
                const webkitCompassAccuracy: number = +e['webkitCompassAccuracy'];

                // when the phone is almost updside down, webkit flips the compass heading 
                // (not documented anywhere, annoyingly)
                // if (e.beta >= 130 || e.beta <= -130) webkitCompassHeading = undefined;

                if ((!defined(this._alphaOffset) || Math.abs(this._headingDrift) > 5) &&
                    defined(webkitCompassHeading) &&
                    webkitCompassAccuracy >= 0 &&
                    webkitCompassAccuracy < 50 &&
                    webkitCompassHeading >= 0) {
                    if (!defined(this._alphaOffset)) {
                        this._alphaOffset = -webkitCompassHeading;
                    } else {
                        this._alphaOffset -= this._headingDrift;
                    }
                }

                const alphaOffset = this._alphaOffset || -webkitCompassHeading || 0;

                // TODO: deal with various browser quirks :\
                // https://mobiforge.com/design-development/html5-mobile-web-device-orientation-events
                const alpha = CesiumMath.RADIANS_PER_DEGREE * (e.alpha + alphaOffset);
                const beta = CesiumMath.RADIANS_PER_DEGREE * e.beta;
                const gamma = CesiumMath.RADIANS_PER_DEGREE * e.gamma;

                const alphaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, alpha, this._scratchQuaternion1);
                const betaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, beta, this._scratchQuaternion2);
                const alphaBetaQuat = Quaternion.multiply(alphaQuat, betaQuat, this._scratchQuaternion1);
                const gammaQuat = Quaternion.fromAxisAngle(Cartesian3.UNIT_Y, gamma, this._scratchQuaternion2);
                const alphaBetaGammaQuat = Quaternion.multiply(alphaBetaQuat, gammaQuat, alphaBetaQuat);

                // update orientationEntity
                if (this.orientationEntity.position instanceof ConstantPositionProperty == false) {
                    this.orientationEntity.position = new ConstantPositionProperty(Cartesian3.ZERO, this.geolocationEntity);
                }
                if (this.orientationEntity.orientation instanceof ConstantProperty == false) {
                    this.orientationEntity.orientation = new ConstantProperty();
                }
                (this.orientationEntity.orientation as ConstantProperty).setValue(alphaBetaGammaQuat);

                // make sure the device entity has a defined pose relative to the device orientation entity
                if (this.deviceEntity.position instanceof ConstantPositionProperty == false) {
                    this.deviceEntity.position = new ConstantPositionProperty(Cartesian3.ZERO, this.orientationEntity);
                }
                if (this.deviceEntity.orientation instanceof ConstantProperty == false) {
                    this.deviceEntity.orientation = new ConstantProperty(Quaternion.IDENTITY);
                }

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

                this.updateDeviceState();
            }
            window.addEventListener('deviceorientation', this._deviceorientationListener)
        }
    }

    protected stopLocationUpdates() {
        if (typeof navigator === 'undefined') return; 
        if (defined(this._geolocationWatchId)) {
            navigator.geolocation.clearWatch(this._geolocationWatchId);
            this._geolocationWatchId = undefined;
        }
    }

    protected stopOrientationUpdates() {
        if (typeof navigator === 'undefined') return; 
        if (defined(this._deviceorientationListener)) {
            window.removeEventListener('deviceorientation', this._deviceorientationListener);
            this._deviceorientationListener = undefined;
            this._alphaOffset = undefined;
        }
    }

    /**
     * Returns the maximum allowed viewport
     */
    public getMaximumViewport() : Viewport {
        if (typeof document !== 'undefined' && document.documentElement) {
            return {
                x: 0,
                y: 0,
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
        throw new Error("Not implemeneted for the current platform");
    }

    /**
     * Attempt to zoom
     */
    public zoom(data: { zoom: number, fov: number, state: ZoomState }) {
        if (this.realityService.session && this.realityService.session.info['reality.handlesZoom']) {
            this.realityService.session.send('ar.device.zoom', data);
            this.realityService.session.send('ar.reality.zoom', data); // backwards compatability, remove at v1.2
        } else {
            const fov = this.onZoom(<ZoomData>data);
            if (this.sessionService.isRealityViewer || this.sessionService.isRealityManager) {
                this.sessionService.manager.send('ar.device.desiredFov', { fov });
            }
        }
    }

    /**
     * Handle zoom. Overridable for custom behavior.
     * Only called within a [[REALITY_VIEWER]]. 
     */
    public onZoom(data: ZoomData): number {
        let newFov = 2 * Math.atan(Math.tan(data.fov * 0.5) / data.zoom);

        newFov = Math.max(
            10 * CesiumMath.RADIANS_PER_DEGREE,
            Math.min(newFov, 160 * CesiumMath.RADIANS_PER_DEGREE)
        );

        // snap to default
        if (data.state === ZoomState.END &&
            Math.abs(newFov - this.state.defaultFov) < 0.05 /* +-6deg */) {
            newFov = this.state.defaultFov;
        }

        return newFov;
    }

    /**
     * Handle desired fov. Overridable for custom behavior.
     * Only called within a [[REALITY_MANAGER]]
     */
    protected onDesiredFov(fov) {
        this.state.subviews.forEach((s)=>{
            s.frustum.fov = fov;
        })
    }
    
}

export interface DeviceStateSubscriptionOptions {
    location?:boolean,
    orientation?:boolean,
    timeout?:number
}
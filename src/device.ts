import { inject } from 'aurelia-dependency-injection'
import {
    Entity,
    ReferenceFrame,
    ConstantPositionProperty,
    ConstantProperty,
    Cartesian3,
    Cartographic,
    Clock,
    Quaternion,
    CesiumMath,
    JulianDate,
    Transforms,
    defined
} from './cesium/cesium-imports'

import MobileDetect from 'mobile-detect'

import { DeviceState, Viewport, SubviewType, Role } from './common'

import { ContextService } from './context'

import { SessionService, SessionPort } from './session'

import { getSerializedEntityPose, getEntityPositionInReferenceFrame, requestAnimationFrame } from './utils'

const scratchCartesian = new Cartesian3;
const scratchQuaternion = new Quaternion;
const x90Rot = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, CesiumMath.PI_OVER_TWO);

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

if (typeof navigator !== 'undefined') {
    var mobileDetect = new MobileDetect(navigator.userAgent);
}

declare global {
    class VRFrameData {
        timestamp:number;

        leftProjectionMatrix:Float32Array;
        leftViewMatrix:Float32Array;

        rightProjectionMatrix:Float32Array;
        rightViewMatrix:Float32Array;

        pose:VRPose;
    }

    interface VRDisplay {
        getFrameData(frameData:VRFrameData) : boolean;
    }
}

/**
* Provides device state. 
*/
@inject(SessionService, ContextService)
export class DeviceService {

    /**
     * The current vrDisplay, if there is one. 
     */
    public vrDisplay?:VRDisplay;
    
    /**
     * The current device state
     */
    public get state() : DeviceState {
        return this._exposedState;
    }

    /**
     * An ENU coordinate frame centered at the device location. 
     * The reference frame of this frame is the FIXED (ECEF) reference frame.
     */
    public locationEntity = this.contextService.entities.add(new Entity({
        id: 'ar.device.location',
        name: 'Device Location',
        position: new ConstantPositionProperty(undefined, ReferenceFrame.FIXED),
        orientation: new ConstantProperty(undefined)
    }));
    
    /**
     * A frame which represents the display being used.
     * The reference frame of this frame is the [[orientationEntity]]. 
     */
    public displayEntity = this.contextService.entities.add(new Entity({
        id: 'ar.device.display',
        name: 'Device Display',
        position: new ConstantPositionProperty(undefined, this.locationEntity),
        orientation: new ConstantProperty(undefined)
    }));

    /**
     * The current cartographic position
     */
    public get location() {
        return this._location;
    }

    /** 
     * The radius (in meters) of latitudinal and longitudinal uncertainty,
     * in relation to the FIXED reference frame. 
     */
    public get locationAccuracy() {
        return this.state.locationAccuracy;
    }

    /**
     * The accuracy of the altitude in meters. 
     */
    public get locationAltitudeAccuracy() {
        return this.state.locationAccuracy;
    }

    /**
     * The sessions that are subscribed to the device state
     */
    protected subscribers = new Set<SessionPort>();

    /**
     * The sessions that are subscribed to the device location
     */
    protected locationSubscribers = new Set<SessionPort>();

    /**
     * The sessions that are subscribed to the device location
     */
    protected poseSubscribers = new Set<SessionPort>();

    /**
    * Initialize the DeviceService
    */
    constructor(
        private sessionService: SessionService,
        private contextService: ContextService) {

        this.sessionService.manager.on['ar.device.state'] = (deviceState:DeviceState) => {
            if (this.sessionService.isRealityManager) return;
            
            this._state = deviceState;

            contextService.updateEntityFromSerializedPose(this.locationEntity.id, deviceState.locationPose);
            // only update orientation from manager if we aren't already fetching it locally
            if (!this.vrDisplay) {
                contextService.updateEntityFromSerializedPose(this.displayEntity.id, deviceState.displayPose);
            }

            const fixedPosition = getEntityPositionInReferenceFrame(this.displayEntity, <JulianDate>deviceState.time, ReferenceFrame.FIXED, scratchCartesian);
            if (fixedPosition) {
                this._location = Cartographic.fromCartesian(fixedPosition, undefined, this._location);
            } else {
                this._location = undefined;
            }
        }

        const checkSubscribers = ()=>{
            if (this.locationSubscribers.size > 0) this.updateLocation()
            else this.stopLocationUpdates();
            if (this.poseSubscribers.size > 0) this.updatePose()
            else this.stopPoseUpdates();
            this.publishDeviceState();
        }

        this.sessionService.connectEvent.addEventListener((session)=>{
            session.on['ar.device.subscribe'] = (o:DeviceStateSubscriptionOptions)=>{
                this.subscribers.add(session);

                if (o.location) this.locationSubscribers.add(session);
                else this.locationSubscribers.delete(session);

                if (o.pose) this.poseSubscribers.add(session);
                else this.poseSubscribers.delete(session);

                const id = setTimeout(()=>{
                    this.subscribers.delete(session);
                    this.locationSubscribers.delete(session);
                    this.poseSubscribers.delete(session);
                    checkSubscribers();
                },o.timeout);

                const previousId = this._subscriberTimeoutIds.get(session);
                if (previousId !== undefined) clearTimeout(previousId);
                this._subscriberTimeoutIds.set(session, id);

                checkSubscribers();
            }

            // TODO: add a way for apps to say they whether or not they need location
            if (Role.isRealityAugmenter(session.info.role)) {
                this.locationSubscribers.add(session);
                this.poseSubscribers.add(session);
            } 
            
            this.publishDeviceState();
        })

        if (this.sessionService.isRealityManager) {
            this.updatePose();

            setTimeout(()=>{
                checkSubscribers();
            }, 10000);
            
            if (typeof window !== 'undefined' && window.addEventListener) {

                const updateInterfaceOrientation = () => {
                    const interfaceOrientationProperty = <ConstantProperty>this.displayEntity.orientation;
                    let interfaceOrientation = Quaternion.fromAxisAngle(Cartesian3.UNIT_Z, (-window.orientation || 0) * CesiumMath.RADIANS_PER_DEGREE, scratchQuaternion);
                    if (mobileDetect && !mobileDetect.mobile()) {
                        // for laptops, rotate device orientation by 90° around +X so that it 
                        // corresponds to an upright display rather than the integrated keyboard
                        interfaceOrientation = Quaternion.multiply(x90Rot, interfaceOrientation, interfaceOrientation);
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
    }

    private _state:DeviceState = {
        time: JulianDate.now(),
        viewport: this.getMaximumViewport(),
        subviews: [{
            type: SubviewType.SINGULAR,
            frustum: {
                fov: Math.PI / 2,
            }
        }],
        locationAccuracy: undefined,
        locationAltitudeAccuracy: undefined
    };
    private _exposedState:DeviceState = DeviceState.clone(this._state);
    private _location?:Cartographic;
    private _subscriberTimeoutIds = new WeakMap<SessionPort, number>();
    private _subscriptionTimeoutId?: number;

    /**
    * Request device state updates. 
    */
    public update(o?:DeviceStateSubscriptionOptions) {
        this.subscribeToUpdatesIfTimeoutExpired(o);
        this.updatePoseLocallyIfNecessary(o);
        this.publishDeviceState();
        DeviceState.clone(this._state, this._exposedState);
    }

    /**
     * Request that the callback function be called for the next frame.
     * @param callback function
     */
    public requestFrame(callback:(now:JulianDate)=>any) {
        const onFrame = () => {
            tick();
            callback(clock.currentTime);
        }
        if (this.vrDisplay) {
            return this.vrDisplay.requestAnimationFrame(onFrame);
        } else {
            return requestAnimationFrame(onFrame);
        }
    }

    /**
     * Get the current system time
     */
    public getSystemTime(result?:JulianDate) {
        tick();
        return JulianDate.clone(clock.currentTime, result);
    }
    
    /**
     * Send device state to subscribers. 
     */
    public publishDeviceState() {
        const deviceState = this._state;
        const time = deviceState.time;

        deviceState.displayPose = getSerializedEntityPose(
            this.displayEntity,
            time,
            this.locationEntity
        );

        if (this.sessionService.isRealityManager) {

            deviceState.viewport = this.getMaximumViewport();

            deviceState.locationPose = getSerializedEntityPose(
                this.locationEntity,
                time,
                ReferenceFrame.FIXED,
            );

            this.subscribers.forEach((options, session)=>{
                session.send('ar.device.state', deviceState);
            });

        }
    }

    private updatePoseLocallyIfNecessary(o?:DeviceStateSubscriptionOptions) {
        if (o && o.pose) {
            this.updatePose();
        }
    }

    private subscribeToUpdatesIfTimeoutExpired(o?:DeviceStateSubscriptionOptions) {
        if (this._subscriptionTimeoutId || !this.sessionService.manager.isConnected) 
            return;
        o = o || {};
        o.timeout = o.timeout || 3000;
        this._subscriptionTimeoutId = setTimeout(() => {
            this._subscriptionTimeoutId = undefined;
            this.sessionService.manager.send('ar.device.subscribe', o);
        }, o.timeout * 0.75);
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
    // public zoom(data: ZoomData) {
    //     if (this.realityService.session && this.realityService.session.info['reality.handlesZoom']) {
    //         this.realityService.session.send('ar.device.zoom', data);
    //         this.realityService.session.send('ar.reality.zoom', data); // backwards compatability, remove at v1.2
    //     } else {
    //         const fov = this.onZoom(<ZoomData>data);
    //         if (this.sessionService.isRealityViewer || this.sessionService.isRealityManager) {
    //             this.sessionService.manager.send('ar.device.desiredFov', { fov });
    //         }
    //     }
    // }

    /**
     * Handle zoom. Overridable for custom behavior.
     */
    // public onZoom(data: ZoomData): number {
        
    //     this.state.subviews[0].frustum.fov

    //     let newFov = 2 * Math.atan(Math.tan(data.fov * 0.5) / data.zoom);

    //     newFov = Math.max(
    //         10 * CesiumMath.RADIANS_PER_DEGREE,
    //         Math.min(newFov, 160 * CesiumMath.RADIANS_PER_DEGREE)
    //     );

    //     // snap to default
    //     if (data.state === ZoomState.END &&
    //         Math.abs(newFov - this.state.defaultFov) < 0.05 /* +-6deg */) {
    //         newFov = this.state.defaultFov;
    //     }

    //     return newFov;
    // }

    /**
     * Set a desired fov in radians.
     */
    // public setDesiredFov(fov: number | undefined) {
    //     this.zoom({ fov: fov || this.state.defaultFov, zoom: 1, state: ZoomState.OTHER })
    // }

    /**
     * Set the default fov in radians, and adjust the desired fov to match the 
     * previous desired / default ratio. 
     */
    // public setDefaultFov(fov: number) {
    //     const currentFov = this.state.subviews[0].frustum.fov;
    //     const ratio = currentFov / this.state.defaultFov;
    //     this.setDesiredFov(fov * ratio);
    //     this.state.defaultFov = fov;
    // }

    private _geolocationWatchId;
    private _vrFrameData:VRFrameData;

    protected updateLocation() {
        // defer to the reality manager to get geolocation updates from the device 
        if (!this.sessionService.isRealityManager || typeof navigator == 'undefined') return;

        if (!defined(this._geolocationWatchId)) {
            this._geolocationWatchId = navigator.geolocation.watchPosition((pos) => {
                const positionECEF = Cartesian3.fromDegrees(pos.coords.longitude, pos.coords.latitude, pos.coords.altitude || 0, undefined, scratchCartesian);
                const enuOrientation = Transforms.headingPitchRollQuaternion(positionECEF, 0, 0, 0, undefined, scratchQuaternion);
                
                if (this.locationEntity.position instanceof ConstantPositionProperty) {
                    this.locationEntity.position.setValue(enuOrientation);
                } else {
                    this.locationEntity.orientation = new ConstantProperty(enuOrientation);
                }

                if (this.locationEntity.orientation instanceof ConstantProperty) {
                    this.locationEntity.orientation.setValue(enuOrientation);
                } else {
                    this.locationEntity.orientation = new ConstantProperty(enuOrientation);
                }

                this._state.locationAccuracy = (pos.coords.accuracy > 0) ? pos.coords.accuracy : undefined;
                this._state.locationAltitudeAccuracy = pos.coords.altitudeAccuracy || undefined;
                this.getSystemTime(this._state.time);
                this.publishDeviceState();
            }, (error) => {
                console.error(error)
            }, {
                    enableHighAccuracy: true
                });
        }

    }

    protected updatePose() {
        if (typeof navigator == 'undefined') return;

        if (!this._vrFrameData && navigator && navigator.getVRDisplays) {
            this._vrFrameData = new VRFrameData();
            navigator.getVRDisplays().then((displays)=>{
                if (displays.length) {
                    this.vrDisplay = displays[0];
                }
            })
        }

        if (!this.vrDisplay) return;

        const vrDisplay = this.vrDisplay;
        const vrFrameData = this._vrFrameData

        if (vrDisplay.getFrameData(vrFrameData)) {
            const positionValue = Cartesian3.unpack(<number[]><any>vrFrameData.pose.position, 0, scratchCartesian);            
            const orientationValue = Quaternion.unpack(<number[]><any>vrFrameData.pose.orientation, 0, scratchQuaternion);
            (<ConstantPositionProperty>this.displayEntity.position!).setValue(positionValue);
            (<ConstantProperty>this.displayEntity.orientation!).setValue(orientationValue);
            this.getSystemTime(this._state.time);
            this.publishDeviceState();
        };
    }

    protected stopLocationUpdates() {
        if (typeof navigator === 'undefined') return; 
        if (defined(this._geolocationWatchId)) {
            navigator.geolocation.clearWatch(this._geolocationWatchId);
            this._geolocationWatchId = undefined;
        }
    }

    protected stopPoseUpdates() {
        // no-op
    }
    
}

export interface DeviceStateSubscriptionOptions {
    location?:boolean,
    pose?:boolean,
    timeout?:number
}
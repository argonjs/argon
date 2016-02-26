import * as Cesium from 'Cesium' // typescript workaround (only use for type resolution!)
import {
    Entity, 
    EntityCollection,
    ConstantPositionProperty,
    ConstantProperty,
    PerspectiveFrustum,
    SampledPositionProperty,
    SampledProperty,
    Transforms,
    Cartesian3,
    Quaternion,
    JulianDate,
    ReferenceFrame,
    createGuid,
    defined
} from './cesium/cesium-imports.ts'
import {inject, transient, All} from 'aurelia-dependency-injection'
import {Role, Session, SessionFactory, MessageChannelFactory, ConnectService, MessagePortLike} from './session.ts'
import {Event, calculatePose, getRootReferenceFrame, getEntityPositionInReferenceFrame, getEntityOrientationInReferenceFrame} from './utils.ts'
import {TimerService} from './timer.ts'
import {DeviceService} from './device.ts'
import {Reality, RealitySetupService} from './reality.ts'

/**
 * Base interface for camera states.
 */
export interface CameraState {

    /**
     * The type of camera state this is. Can be inspected to determine a more
     * specific interface this can be cast to.
     */
    type:string,

    /**
     * Any additional properties that are a part of this camera state.
     */
    [option:string]:any
}

/**
 * Represents a camera state with information on field of view and offset.
 */
export interface PerspectiveCameraState extends CameraState {
    //type:'perspective',   Commented out for the moment because typedoc does not recognize this as valid typescript.
	fovY?:number,
	fovX?:number,
    xOffset?:number,
    yOffset?:number
}

/**
 * Holds information on the location and orientation of an entity relative to
 * some reference frame.
 */
export interface EntityPose {
	referenceFrame:string|Cesium.ReferenceFrame,
	position?:{x:number,y:number,z:number},
	orientation?:{x:number,y:number,z:number,w:number}
}

/**
 * Maps from entity ids to their associated poses. Optionally contains a
 * basepoint entity.
 */
export interface EntityPoseMap {
    EYE?:EntityPose,
    [id:string]:EntityPose
}

/**
 * Various data and metadata pertaining to a frame.
 */
export interface FrameState {
    frameNumber: number,
    time: Cesium.JulianDate,
    reality?: Reality,
    camera?: CameraState,
    size?: {width:number,height:number}
	entities?: EntityPoseMap
}

/**
 * How a web page is being displayed.
 */
export enum PresentationMode {

    /**
     * A web page displayed in the normal manner.
     */
    Page = "Page" as any,

    /**
     * A web page with interactive argon components.
     */
    Immersive = "Immersive" as any
}

/**
 * A plugin that can execute arbitrary code while and after a context is setup.
 */
export abstract class ContextPlugin {

    /**
     * The context to which this plugin is attached.
     */
    public context:Context = undefined;

    /**
     * Called when the context is first created, but before it is finished
     * being setup.
     */
    public abstract onContextInit();

    /**
     * Called once the context has finished being setup.
     */
    public abstract onContextReady();
}

const scratchDate = new JulianDate(0,0);
const scratchCartesian3 = new Cartesian3(0,0);
const scratchQuaternion = new Quaternion(0,0);
const scratchOriginCartesian3 = new Cartesian3(0,0);

/**
 * TODO
 */
@inject(RealitySetupService, DeviceService, SessionFactory, MessageChannelFactory, Role, All.of(ContextPlugin), ConnectService)
export class Context {
    
    /**
     * TODO
     */
    constructor(public realityService:RealitySetupService,
                public deviceService:DeviceService,
                public sessionFactory:SessionFactory,
                public messageChannelFactory:MessageChannelFactory,
                public role:Role,
                public plugins:ContextPlugin[],
                parentSessionConnectService:ConnectService) {
        
        this.entities.add(this.device);
        this.entities.add(this.eye);
        
        // until https://github.com/aurelia/dependency-injection/issues/71 is fixed
        if (!Array.isArray(plugins)) this.plugins = plugins = <any>[plugins];
        
        for (const plugin of plugins) { plugin.context = this; plugin.onContextInit(); }
                    
        this._parentSession = this.addSession();
        parentSessionConnectService.connect(this.parentSession);
        
        this.parentSession.on['ar.context.update'] = (frameState:FrameState) => {
            this._update(frameState);
        }
        this.parentSession.on['ar.context.realityControlSession'] = (message) => {
            const messageChannel = this.messageChannelFactory.create();
            const realityControlSession = this.sessionFactory.create();
            
            messageChannel.port1.onmessage = (msg:MessageEvent) => {
                this.parentSession.send('ar.context.realityControlMessage', msg.data);
            }
            
            this.parentSession.on['ar.context.realityControlMessage'] = (message) => {
                messageChannel.port1.postMessage(message);
            }
            
            realityControlSession.openEvent.addEventListener(() => {
                this.realityConnectEvent.raiseEvent(realityControlSession);
            })
            
            this.parentSession.closeEvent.addEventListener(()=> {
                realityControlSession.close();
            });
            
            realityControlSession.open(messageChannel.port2, {role});
        }
        this.parentSession.on['ar.context.focus'] = () => {
            this._hasFocus = true;
            this.focusEvent.raiseEvent(undefined);
        }
        this.parentSession.on['ar.context.blur'] = () => {
            this._hasFocus = false;
            this.blurEvent.raiseEvent(undefined);
        }
        
        this.parentSession.errorEvent.addEventListener((error)=> {
            this.errorEvent.raiseEvent(error);
        })
        
        this.errorEvent.addEventListener((error)=> {
			if (this.errorEvent.numberOfListeners === 1) console.error(error);
        })
        
        for (const plugin of plugins) { plugin.onContextReady(); }
        
        this.parentSession.openPromise.then(()=>{
            if (!this.desiredReality) this.desiredReality = null;
        })
        
        this.parentSession.focus();
    }
    
    /**
     * Returns a registered plugin of a specific class, if one exists.
     *
     * @param PluginType - The class of plugin to search for.
     * @returns If a plugin created by the class `PluginType` has been
     * registered, that plugin. If no such plugin has been registered,
     * undefined.
     */
    public getPlugin<T extends ContextPlugin>(PluginType:{ new(...args: any[]): T }) : T {
        let plugin:T;
        for (const p of this.plugins) {
            if (p instanceof PluginType) {
                plugin = p;
                break;
            }
        }
        return plugin;
    }
    
    /**
     * The reality associated with this context.
     */
    public get reality() : Reality {
        return this.__reality;
    }
    private __reality:Reality = undefined;
    private set _reality(value:Reality) { 
        if (!this.__reality || this.__reality.id !== value.id) {
            this.__reality = value;
            this.realityChangeEvent.raiseEvent(undefined);
        }
    }
    
    /**
     * The parent session associated with this context.
     */
    public get parentSession():Session {return this._parentSession}
    private _parentSession:Session;
    
    /**
     * The set of entities that are a part of this context.
     */
    public get entities() { return this._entities };
    private _entities = new EntityCollection();
    
    /**
     * The current frame.
     */
    public get frame() { return this._frame };
    private _frame:FrameState = undefined;
    
    /**
     * An event that can be subscribed to in order to get callbacks whenever an
     * error occurs.
     *
     * The callback receives the error that occurred.
     */
    public get errorEvent() { return this._errorEvent }
    private _errorEvent = new Event<Error>();
    
    /**
     * An event that can be subscribed to in order to get callbacks every
     * frame.
     *
     * The callback receives the current frame's state.
     */
    public get updateEvent() { return this._updateEvent };
    private _updateEvent = new Event<FrameState>();
    
    /**
     * An event that can be subscribed to in order to get callbacks ever 
     * frame. The render event fires after the update event.
     */
    private _renderEvent = new Event<FrameState>();
    public get renderEvent() { return this._renderEvent };
    
    /**
     * An event that can be subscribed to in order to get callbacks whenever
     * the local origin system changes.
     */
    public get localOriginChangeEvent() { return this._localOriginChangeEvent };
    private _localOriginChangeEvent = new Event<void>();
    
    /**
     * An event that can be subscribed to in order to get callbacks whenever
     * this context is focused on.
     */
    public get focusEvent() { return this._focusEvent };
    private _focusEvent = new Event<void>();
    
    /**
     * An event that can be subscribed to in order to get callbacks whenever
     * this context is no longer being focused on.
     */
    public get blurEvent() { return this._blurEvent };
    private _blurEvent = new Event<void>();
    
    /**
     * Whether this context is currently being focused on.
     */
    public get hasFocus() { return this._hasFocus };
    private _hasFocus = false;
    
    // manager properties
    
    /**
     * The set of all sessions associated with this context.
     */
    public get sessions() { return this._sessions };
    private _sessions = <Session[]>[];
    
    /**
     * The currently focused session, or null if one is not focused.
     */
    public get focussedSession():Session { return this._focussedSession; }
    private _focussedSession:Session = null;
    
    /**
     * An event that can be subscribed to in order to get callbacks whenever
     * this context's reality is changed.
     */
    public get realityChangeEvent() { return this._realityChangeEvent }; 
    private _realityChangeEvent = new Event<void>();
    
    /**
     * An event that can be subscribed to in order to get callbacks whenever a
     * new reality control session is opened.
     *
     * The callback receives the newly opened reality control session.
     */
    public get realityConnectEvent() { return this._realityConnectEvent }; 
    private _realityConnectEvent = new Event<Session>();
    
    /**
     * An event that can be subscribed to in order to get callbacks whenever a
     * session is focused upon.
     *
     * The callback receives the newly focused session.
     */
    public get sessionFocusEvent() { return this._sessionFocusEvent };
    private _sessionFocusEvent = new Event<Session>();
    
    /**
     * An event that can be subscribed to in order to get callbacks whenever a
     * new session is created by this context.
     *
     * The callback receives the newly created session.
     */
    public get sessionCreateEvent() { return this._sessionCreateEvent }; 
    private _sessionCreateEvent = new Event<Session>();
    
    private _sessionToDesiredRealityMap = new WeakMap<Session, Reality>();
    private _desiredRealityToOwnerSessionMap = new WeakMap<Reality, Session>();
    private _sessionToDesiredPresentationModeMap = new WeakMap<Session, PresentationMode>();
    private _sessionToSubscribedEntities = new WeakMap<Session, string[]>();
    
    private _update(state:FrameState) {
        
        if (!defined(state.entities)) state.entities = {}; 
        
        if (!defined(state.entities['DEVICE'])) {
            state.entities['DEVICE'] = this.deviceService.getDevicePose(state.time);
        }
        
        if (!defined(state.entities['EYE'])) {
            state.entities['EYE'] = this.deviceService.getEyePose(state.time);
        }
        
        if (!defined(state.camera)) state.camera = this.deviceService.getCameraState()
        if (!defined(state.size)) state.size = this.deviceService.getViewSize();
        
        for (const id in state.entities) {
            this._updateEntity(id, state);
        }
        
        this._updateOrigin(state);
        
        if (state.camera.type === 'perspective') {
            const camera = <PerspectiveCameraState>state.camera;
            if (!camera.fovX && !camera.fovY) {
                console.error('Camera state is invalid: both fovX and fovY are missing.')
                return;
            }
            const aspect = this.frustum.aspectRatio = camera.fovX && camera.fovY ?
                Math.tan(camera.fovX*0.5) / Math.tan(camera.fovY*0.5) : 
                state.size.width / state.size.height;
            if (aspect > 1) {
                if (!camera.fovX) camera.fovX = 2 * Math.atan( Math.tan( camera.fovY * 0.5 ) * aspect );
                this.frustum.fov = camera.fovX; 
            } else {
                if (!camera.fovY) camera.fovY = 2 * Math.atan( Math.tan( camera.fovX * 0.5) / aspect );
                this.frustum.fov = camera.fovY; 
            }
            this.frustum['xOffset'] = camera.xOffset;
            this.frustum['yOffset'] = camera.yOffset;
        }
        
        const entityStateCache:EntityPoseMap = {};
        
        if (this.role === Role.Manager) {
            for (const session of this.sessions) {
                if (session.info.enableIncomingUpdateEvents)
                    this._sendUpdateForSesion(state, session, entityStateCache);
            }
        }
        
        this._reality = state.reality;
        this._frame = state;
        this.updateEvent.raiseEvent(state);
        this.renderEvent.raiseEvent(state);
    }
    
    private _updateEntity(id:string, state:FrameState) {
        const entityState = state.entities[id];
        
        let referenceFrame = (typeof entityState.referenceFrame === 'number') ?
            <Cesium.ReferenceFrame>entityState.referenceFrame : 
            this.entities.getById(entityState.referenceFrame);
        if (!defined(referenceFrame)) {
            referenceFrame = this._updateEntity(<string>entityState.referenceFrame, state);
        }
        
        const entity = this.entities.getOrCreateEntity(id);
        
        if (entity.position instanceof ConstantPositionProperty === false ||
            entity.orientation instanceof ConstantProperty === false) {
            entity.position = new ConstantPositionProperty(<Cesium.Cartesian3>entityState.position,referenceFrame);
            entity.orientation = new ConstantProperty(entityState.orientation);
        }
        
        const entityPosition = <Cesium.ConstantPositionProperty>entity.position;
        const entityOrientation = <Cesium.ConstantProperty>entity.orientation;
        entityPosition.setValue(<Cesium.Cartesian3>entityState.position, referenceFrame)
        entityOrientation.setValue(entityState.orientation);
            
        return entity;
    }
        
    private _updateOrigin(state:FrameState) {
        const eyeRootFrame = getRootReferenceFrame(this.eye);
        const eyePosition = this.eye.position.getValueInReferenceFrame(state.time, eyeRootFrame, scratchCartesian3);
        
        const eyeENUPositionProperty = <Cesium.ConstantPositionProperty>this.eyeOriginEastNorthUp.position;
        eyeENUPositionProperty.setValue(eyePosition, eyeRootFrame);
        
        const localENUFrame = this.localOriginEastNorthUp.position.referenceFrame
        const localENUPosition = this.localOriginEastNorthUp.position.getValueInReferenceFrame(state.time, localENUFrame, scratchOriginCartesian3)
        if (!localENUPosition || localENUFrame !== eyeRootFrame || 
            Cartesian3.magnitudeSquared(Cartesian3.subtract(eyePosition, localENUPosition, scratchOriginCartesian3)) > 25000000) {
            const localENUPositionProperty = <Cesium.ConstantPositionProperty>this.localOriginEastNorthUp.position;
            const localENUOrientationProperty = <Cesium.ConstantProperty>this.localOriginEastNorthUp.orientation;
            localENUPositionProperty.setValue(eyePosition, eyeRootFrame);
            const enuOrientation = getEntityOrientationInReferenceFrame(this.localOriginEastNorthUp, state.time, eyeRootFrame, scratchQuaternion);
            localENUOrientationProperty.setValue(enuOrientation);
            this.localOriginChangeEvent.raiseEvent(undefined);
        }
    }
    
    private _sendUpdateForSesion(parentState:FrameState, session:Session, entityStateCache:EntityPoseMap) {
        const sessionEntities:EntityPoseMap = {}
            
        for (var id in parentState.entities) {
            sessionEntities[id] = parentState.entities[id];
        }
        
        for (var id in this._sessionToSubscribedEntities.get(session)) {
            if (!defined(entityStateCache[id])) {
                const entity = this.entities.getById(id);
                entityStateCache[id] = calculatePose(entity, parentState.time);
            }
            sessionEntities[id] = entityStateCache[id];
        }
        
        const sessionState:FrameState = {
            time: parentState.time,
            frameNumber: parentState.frameNumber,
            reality: parentState.reality,
            camera: parentState.camera,
            size: parentState.size,
            entities: sessionEntities
        };
        
        session.send('ar.context.update', sessionState);  
    }
        
    /**
     * The presentation mode this context is currently in.
     */
    public set desiredPresentationMode(presentationMode:PresentationMode) {
        this._desiredPresentationMode = presentationMode;
        this.parentSession.send('ar.context.desiredPresentationMode', {presentationMode});
    }
    
    public get desiredPresentationMode() : PresentationMode {
        return this._desiredPresentationMode;
    }
    
    private _desiredPresentationMode:PresentationMode;
        
    /**
     * Gets the presentation mode associated with a particular session.
     *
     * @param session - The session whose presentation mode is to be looked up.
     * @returns The presentation mode associated with the session.
     */
    public getDesiredPresentationModeForSession(session:Session) : PresentationMode {
        return this._sessionToDesiredPresentationModeMap.get(session);
    }
        
    /**
     * The reality desired by this context.
     */
    public set desiredReality(reality:{type:string}) {
        if (reality && !reality['id']) reality['id'] = createGuid();
        this._desiredReality = reality;
        this.parentSession.send('ar.context.desiredReality', {reality});
    }
    
    public get desiredReality() : {type:string} {
        return this._desiredReality;
    }
    
    private _desiredReality:Reality = null;

    /**
     * Gets the reality that was requested by a particular session.
     *
     * @param session - The session whose requested reality is to be looked up.
     * @returns The reality requested by the session, or undefined if no
     * reality has been requested by the session.
     */
    public getDesiredRealityForSession(session:Session) : Reality {
        return this._sessionToDesiredRealityMap.get(session);
    }
    
    private _realitySession:Session;
    
    private _setReality(reality:Reality) {
        if (this.reality && reality && this.reality.id === reality.id) return;
        if (this.reality && !reality) return;
        if (!this.reality && !reality) {
            reality = this.deviceService.defaultReality;
            reality.id = 'default';
        }
        
        const realitySession = this.addSession();
        
        realitySession.on['ar.context.update'] = (state:FrameState) => {
            state.reality = reality;
            this._update(state);
        }
        
        realitySession.on['ar.context.realityControlMessage'] = (message) => {
            const owner = this._desiredRealityToOwnerSessionMap.get(reality) || this.parentSession;
            owner.send('ar.context.realityControlMessage', message);
        }
            
        realitySession.openEvent.addEventListener(() => {
            const previousRealitySession = this._realitySession;
            const previousReality = this.reality;
            
            this._realitySession = realitySession;
            this._reality = reality;
            console.log("Reality session set: " + JSON.stringify(reality));
            
            if (previousRealitySession) {
                previousRealitySession.close();
            }
            
            if (realitySession.info.role !== Role.Reality) {
                realitySession.sendError({message:"Expected a session with role === Role.Reality"});
                realitySession.close();
                return;
            }
            
            if (realitySession.info.enableRealityControlPort) {
                const owner = this._desiredRealityToOwnerSessionMap.get(reality) || this.parentSession;
                const channel = this.messageChannelFactory.create();
                
                realitySession.send('ar.context.realityControlSession');
                owner.send('ar.context.realityControlSession');
            }
        })
        
        realitySession.closeEvent.addEventListener(() => {
           console.log("Reality session closed: " + JSON.stringify(reality));
           this._setReality(this.onSelectReality());
        });
        
        const messageChannel = this.messageChannelFactory.create();
        realitySession.open(messageChannel.port1, {role:this.role});
        
        this.realityService.setupReality(reality, messageChannel.port2);
    }
    
    /**
     * Indicates to this context that the given session wishes to be focused
     * upon.
     */
    public onSessionDesiresFocus(session:Session) : void {
        // noop
    }
    
    /**
     * Determines the best reality for this context based on the realites
     * requested by all attached sessions.
     *
     * @returns The reality chosen for this context. May be undefined if no
     * realities have been requested.
     */
    public onSelectReality() : Reality {
        
        console.log("Selecting a reality...");
        
        // TODO: sort and select based on some kind of ranking system
        let selectedReality = this.getDesiredRealityForSession(this.focussedSession);
        if (!selectedReality) {
            for (const session of this.sessions) {
                const desiredReality = this.getDesiredRealityForSession(session);
                if (desiredReality && this.realityService.supportsReality(desiredReality)) {
                    selectedReality = desiredReality;
                    break;
                }
            }
        }
        
        console.log('Selected reality: ' + JSON.stringify(selectedReality));
        
        return selectedReality;
    }
    
    /**
     * Creates a new session that responds to the following messages:
     *
     *  * `ar.context.desiredReality` - Sets the reality the session wants
     *    active.
     *    * Parameters:
     *      * reality: Reality - The reality the session wants. May be
     *        undefined to indicate that no particular reality is desired.
     *
     *  * `ar.context.subscribe` - Subscribes the session to updates from an
     *    entity in this context.
     *    * Parameters:
     *      * id: string - The id of an entity the session wishes to recieve
     *        updates on.
     *
     *  * `ar.context.focus` - Indicates to this context that the session wants
     *    to be focused on.
     */
    public addSession() : Session {
        const session = this.sessionFactory.create();
        this._sessions.push(session);
        
        session.on['ar.context.desiredReality'] = (message, event) => {
            const {reality} = message;
            console.log("Session set desired reality: " + JSON.stringify(reality));
            if (reality) {
                this._sessionToDesiredRealityMap.set(session, reality);
                this._desiredRealityToOwnerSessionMap.set(reality, session);
                if (!this.realityService.handlers.get(reality.type)) {
                    session.sendError({message:reality.type + " reality is not suppored on this platform"});
                }
            } else {
                this._sessionToDesiredRealityMap.delete(session);
            }
            this._setReality(this.onSelectReality());
        }
            
        session.on['ar.context.subscribe'] = ({id}) => {
            const subscriptions = this._sessionToSubscribedEntities.get(session) || [];
            if (subscriptions.indexOf(id) === -1) subscriptions.push(id); 
        }
        
        session.on['ar.context.focus'] = () => {
            this.onSessionDesiresFocus(session);
        }
        
        session.focusEvent.addEventListener(() => {
            const previousFocussedSession = this._focussedSession;
            if (previousFocussedSession !== session) {
                if (previousFocussedSession) 
                    previousFocussedSession.send('ar.context.blur');
                session.send('ar.context.focus');
                this._focussedSession = session;
                this.sessionFocusEvent.raiseEvent(session);
            }
        })
        
        session.closeEvent.addEventListener(() => {
            const index = this._sessions.indexOf(session);
            if (index > -1) {
                this._sessions.splice(index);
            }
            if (this._realitySession === session) {
                this._realitySession = null;
            }
        });
        
        this.sessionCreateEvent.raiseEvent(session);
        
        return session;
    }
    
    /**
     * Adds an entity to this session's set of tracked entities.
     *
     * @param id - The unique identifier of an entity.
     * @returns The entity that was subscribed to.
     */
    public subscribeToEntity(id:string) : Cesium.Entity {
        if (this.role !== Role.Manager) {
            this.parentSession.send('ar.context.subscribe', {id})
        }
        return this.entities.getOrCreateEntity(id);
    }
    
    /**
     * Gets the pose for an entity relative to a reference frame.
     *
     * @param entity - The entity whose pose is to be gotten.
     * @param referenceFrame - The reference frame that the pose is relative
     * to. Optional, if not specified defaults to the fixed position reference
     * frame.
     * @returns If the position and orientation exist for the given entity, an
     * object with the fields `position` and `orientation`, both of type
     * `Cesium.Cartesian3`. Otherwise undefined.
     */
    public getEntityPose(entity:Cesium.Entity, referenceFrame:Cesium.ReferenceFrame|Cesium.Entity=ReferenceFrame.FIXED) {
        const time = this.frame.time;
        const position = getEntityPositionInReferenceFrame(
            entity,
            time,
            referenceFrame,
            scratchCartesian3
        );
        const orientation = getEntityOrientationInReferenceFrame(
            entity, 
            time, 
            referenceFrame, 
            scratchQuaternion
        );
        return position && orientation ? {position, orientation} : undefined
    }
    
    /**
     * The eye frustum.
     */
    public frustum:Cesium.PerspectiveFrustum = new PerspectiveFrustum;
    
    /**
     * An entity representing the device running Argon.
     */
    public device:Cesium.Entity = new Entity({
        id: 'DEVICE',
        name: 'device',
        position: new ConstantPositionProperty(),
        orientation: new ConstantProperty()
    });
    
    /**
     * An entity representing the 'eye' through which Argon sees (usually a
     * camera). The scene is always rendered from this viewport.
     */
    public eye:Cesium.Entity = new Entity({
        id: 'EYE',
        name: 'eye',
        position: new ConstantPositionProperty(),
        orientation: new ConstantProperty()
    });

    /**
     * An origin positioned at the eye, aligned with the local East-North-Up
     * coordinate system.
     */
    public eyeOriginEastNorthUp:Cesium.Entity = new Entity({
        name: 'eyeOrigin',
        position: new ConstantPositionProperty(),
        orientation: new ConstantProperty()
    });

    /**
     * An origin positioned near the eye which doesn't change very often,
     * aligned with the East-North-Up coordinate system.
     */
    public localOriginEastNorthUp:Cesium.Entity = new Entity({
        name: 'origin',
        position: new ConstantPositionProperty(),
        orientation: new ConstantProperty()
    });

    /**
     * An origin positioned near the eye which doesn't change very often,
     * aligned with the East-Up-South coordinate system. This useful for
     * converting to the Y-Up convention used in some libraries, such as
     * three.js.
     */
    public localOriginEastUpSouth:Cesium.Entity = new Entity({
        name: 'originEastUpSouth',
        position: new ConstantPositionProperty(Cartesian3.ZERO, this.localOriginEastNorthUp),
        orientation: new ConstantProperty(Quaternion.fromAxisAngle(Cartesian3.UNIT_X, Math.PI/2))
    });
}

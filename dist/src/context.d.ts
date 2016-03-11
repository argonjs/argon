import { Entity, EntityCollection, PerspectiveFrustum, Cartesian3, Quaternion, JulianDate, ReferenceFrame } from './cesium/cesium-imports.ts';
import { Role, Session, SessionFactory, MessageChannelFactory, ConnectService } from './session.ts';
import { Event } from './utils.ts';
import { DeviceService } from './device.ts';
import { Reality, RealityService } from './reality.ts';
/**
 * Base interface for camera states.
 */
export interface CameraState {
    /**
     * The type of camera state this is. Can be inspected to determine a more
     * specific interface this can be cast to.
     */
    type: string;
    /**
     * Any additional properties that are a part of this camera state.
     */
    [option: string]: any;
}
/**
 * Represents a camera state with information on field of view and offset.
 */
export interface PerspectiveCameraState extends CameraState {
    fovY?: number;
    fovX?: number;
    xOffset?: number;
    yOffset?: number;
}
/**
 * Describes the state of an entity at a particular time relative to a particular reference frame
 */
export interface EntityState {
    position: Cartesian3;
    orientation: Quaternion;
    time: JulianDate;
    poseStatus: PoseStatus;
}
export declare enum PoseStatus {
    FOUND = 1,
    LOST = 2,
    KNOWN = 4,
    UNKNOWN = 8,
}
/**
 * Describes the position, orientation, and referenceFrame of an entity.
 */
export interface EntityPose {
    position?: {
        x: number;
        y: number;
        z: number;
    };
    orientation?: {
        x: number;
        y: number;
        z: number;
        w: number;
    };
    referenceFrame: ReferenceFrame | string;
}
/**
 * A map of entity ids and their associated poses.
 */
export interface EntityPoseMap {
    EYE?: EntityPose;
    [id: string]: EntityPose;
}
/**
 * Various data and metadata pertaining to a frame.
 */
export interface FrameState {
    frameNumber: number;
    time: JulianDate;
    reality?: Reality;
    camera?: CameraState;
    size?: {
        width: number;
        height: number;
    };
    entities?: EntityPoseMap;
}
/**
 * How a web page is being displayed.
 */
export declare enum PresentationMode {
    /**
     * A web page displayed in the normal manner.
     */
    Page,
    /**
     * A web page with interactive argon components.
     */
    Immersive,
}
/**
 * TODO
 */
export declare class Context {
    private realityService;
    private deviceService;
    private sessionFactory;
    private messageChannelFactory;
    private role;
    private parentSessionConnectService;
    /**
     * TODO
     */
    constructor(realityService: RealityService, deviceService: DeviceService, sessionFactory: SessionFactory, messageChannelFactory: MessageChannelFactory, role: Role, parentSessionConnectService: ConnectService);
    /**
     * Called internally by the ArgonSystem instance.
     */
    init(): void;
    /**
     * The reality associated with this context.
     */
    readonly reality: Reality;
    private __reality;
    private _reality;
    /**
     * The parent session associated with this context.
     */
    readonly parentSession: Session;
    private _parentSession;
    /**
     * The set of entities that are a part of this context.
     */
    readonly entities: EntityCollection;
    private _entities;
    /**
     * The current frame.
     */
    readonly frame: FrameState;
    private _frame;
    /**
     * An event that is raised when a error occurs.
     *
     * The callback receives the error that occurred.
     */
    readonly errorEvent: Event<Error>;
    private _errorEvent;
    /**
     * An event that can be subscribed to in order to get callbacks every
     * frame.
     *
     * The callback receives the current frame's state.
     */
    readonly updateEvent: Event<FrameState>;
    private _updateEvent;
    /**
     * An event that can be subscribed to in order to get callbacks ever
     * frame. The render event fires after the update event.
     */
    private _renderEvent;
    readonly renderEvent: Event<FrameState>;
    /**
     * An event that can be subscribed to in order to get callbacks whenever
     * the local origin system changes.
     */
    readonly localOriginChangeEvent: Event<void>;
    private _localOriginChangeEvent;
    /**
     * An event that can be subscribed to in order to get callbacks whenever
     * this context is focused on.
     */
    readonly focusEvent: Event<void>;
    private _focusEvent;
    /**
     * An event that can be subscribed to in order to get callbacks whenever
     * this context is no longer being focused on.
     */
    readonly blurEvent: Event<void>;
    private _blurEvent;
    /**
     * Whether this context is currently being focused on.
     */
    readonly hasFocus: boolean;
    private _hasFocus;
    /**
     * The set of all sessions associated with this context.
     */
    readonly sessions: Session[];
    private _sessions;
    /**
     * The currently focused session, or null if one is not focused.
     */
    readonly focussedSession: Session;
    private _focussedSession;
    /**
     * An event that is raised when the parent session is opened (when this.init is called),
     * and when any child session is opened (if this context has a manager role).
     * This event is never raised when a reality control session is opened.
     *
     * The callback receives the newly opened session.
     */
    readonly sessionConnectEvent: Event<Session>;
    private _sessionCreateEvent;
    /**
     * An event that is raised when a reality control session is opened.
     *
     * The callback receives the newly opened reality control session.
     */
    readonly realityConnectEvent: Event<Session>;
    private _realityConnectEvent;
    /**
     * An event that is raised when this context's reality is changed.
     */
    readonly realityChangeEvent: Event<void>;
    private _realityChangeEvent;
    /**
     * An event that is raised when a session is focused upon.
     *
     * The callback receives the newly focused session.
     */
    readonly sessionFocusEvent: Event<Session>;
    private _sessionFocusEvent;
    private _sessionToDesiredRealityMap;
    private _desiredRealityToOwnerSessionMap;
    private _sessionToDesiredPresentationModeMap;
    private _sessionToSubscribedEntities;
    private _updatingEntities;
    private _knownEntities;
    private _update(state);
    private _updateEntity(id, state);
    private _updateOrigin(state);
    private _sendUpdateForSesion(parentState, session, entityPoseCache);
    /**
     * Set the desired presentation mode.
     */
    setDesiredPresentationMode(presentationMode: PresentationMode): void;
    readonly desiredPresentationMode: PresentationMode;
    private _desiredPresentationMode;
    /**
     * Gets the presentation mode associated with a particular session.
     *
     * @param session - The session whose presentation mode is to be looked up.
     * @returns The presentation mode associated with the session.
     */
    getDesiredPresentationModeForSession(session: Session): PresentationMode;
    /**
     * Set the desired reality.
     */
    setDesiredReality(reality: {
        type: string;
    }): void;
    readonly desiredReality: {
        type: string;
    };
    private _desiredReality;
    /**
     * Gets the reality that was requested by a particular session.
     *
     * @param session - The session whose requested reality is to be looked up.
     * @returns The reality requested by the session, or undefined if no
     * reality has been requested by the session.
     */
    getDesiredRealityForSession(session: Session): Reality;
    private _realitySession;
    private _setReality(reality);
    /**
     * Indicates to this context that the given session wishes to be focused
     * upon.
     */
    onSessionDesiresFocus(session: Session): void;
    /**
     * Determines the best reality for this context based on the realites
     * requested by all attached sessions.
     *
     * @returns The reality chosen for this context. May be undefined if no
     * realities have been requested.
     */
    onSelectReality(): Reality;
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
    addSession(): Session;
    /**
     * Adds an entity to this session's set of tracked entities.
     *
     * @param id - The unique identifier of an entity.
     * @returns The entity that was subscribed to.
     */
    subscribeToEntityById(id: string): Entity;
    /**
     * Gets the state of an entity at the current context time relative to a reference frame.
     *
     * @param entity - The entity whose state is to be queried.
     * @param referenceFrame - The relative reference frame. Defaults to `this.origin`.
     * @returns If the position and orientation exist for the given entity, an
     * object with the fields `position` and `orientation`, both of type
     * `Cartesian3`. Otherwise undefined.
     */
    getCurrentEntityState(entity: Entity, referenceFrame?: ReferenceFrame | Entity): EntityState;
    private entityStateMap;
    private _stringFromReferenceFrame(referenceFrame);
    /**
     * The eye frustum.
     */
    frustum: PerspectiveFrustum;
    /**
     * An entity representing the device running Argon.
     */
    device: Entity;
    /**
     * An entity representing the 'eye' through which Argon sees (usually a
     * camera). The scene is always rendered from this viewport.
     */
    eye: Entity;
    /**
     * An origin positioned at the eye, aligned with the local East-North-Up
     * coordinate system.
     */
    eyeOriginEastNorthUp: Entity;
    /**
     * An origin positioned near the eye which doesn't change very often,
     * aligned with the East-North-Up coordinate system.
     */
    localOriginEastNorthUp: Entity;
    /**
     * An origin positioned near the eye which doesn't change very often,
     * aligned with the East-Up-South coordinate system. This useful for
     * converting to the Y-Up convention used in some libraries, such as
     * three.js.
     */
    localOriginEastUpSouth: Entity;
    /**
     * The origin to use when calling `getEntityState`. By default,
     * this is `this.localOriginEastNorthUp`.
     */
    readonly origin: Entity;
    private _origin;
    setOrigin(origin: Entity): void;
}

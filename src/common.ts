import { Matrix4, JulianDate, Cartesian3, Quaternion } from './cesium/cesium-imports'

/**
 * Configuration options for an [[ArgonSystem]] 
 */
export interface Configuration {
    role?: Role;
    protocols?: string[];
    userData?: any;
    // other options / hints
    defaultUI?: {
        disable?: boolean
    };
    'app.disablePinchZoom'?: boolean;
    'reality.supportsControlPort'?: boolean;
    'reality.handlesZoom'?: boolean;
    'reality.providedReferenceFrames'?: (number | string)[];
}

/**
 * Describes the role of an [[ArgonSystem]]
 */
export enum Role {

    /**
     * A system with this role is responsible for augmenting an arbitrary view of reality,
     * generally by overlaying computer generated graphics. A reality augmentor may also, 
     * if appropriate, be elevated to the role of a [[REALITY_MANAGER]]. 
     */
    REALITY_AUGMENTER = "RealityAugmenter" as any,

    /**
     * A system with this role is responsible for (at minimum) describing (and providing, 
     * if necessary) a visual representation of the world and the 3D eye pose of the viewer.
     */
    REALITY_VIEWER = "RealityViewer" as any,

    /**
     * A system with this role is responsible for mediating access to sensors/trackers 
     * and pose data for known entities in the world, selecting/configuring/loading 
     * [[REALITY_VIEWER]]s, and providing the mechanism by which any given [[REALITY_AUGMENTER]]
     * can augment any given [[REALITY_VIEWER]]. 
     */
    REALITY_MANAGER = "RealityManager" as any,

    /**
     * Deprecated. Use [[REALITY_AUGMENTER]]. 
     * @private
     */
    APPLICATION = "Application" as any,

    /**
     * Deprecated. Use [[REALITY_MANAGER]]. 
     * @private
     */
    MANAGER = "Manager" as any,

    /**
     * Deprecated. Use [[REALITY_VIEWER]]
     * @private
     */
    REALITY_VIEW = "RealityView" as any,
}

export namespace Role {
    export function isRealityViewer(r?:Role) {
        return r === Role.REALITY_VIEWER || r === Role.REALITY_VIEW;
    }
    export function isRealityAugmenter(r?:Role) {
        return r === Role.REALITY_AUGMENTER || r === Role.APPLICATION;
    }
    export function isRealityManager(r?:Role) {
        return r === Role.REALITY_MANAGER || r === Role.MANAGER;
    }
}

/**
 * Viewport values are expressed using a right-handed coordinate system with the origin
 * at the bottom left corner.
 */
export interface Viewport {
    x: number,
    y: number,
    width: number,
    height: number
}

export namespace Viewport {
    export function clone(viewport?:Viewport, result:Viewport=<any>{}) {
        if (!viewport) return undefined;
        result.x = viewport.x;
        result.y = viewport.y;
        result.width = viewport.width;
        result.height = viewport.height;
        return result;
    }
}

/**
 * Identifies a subview in a [[SerializedSubview]]
 */
export enum SubviewType {
    /*
     * Identities a subview for a handheld display.
     */
    SINGULAR = "Singular" as any,

    /*
     * Identifies a subview for the left eye (when the user is wearing an HMD or Viewer)
     */
    LEFTEYE = "LeftEye" as any,

    /*
     * Identifies a subview for the right eye (when the user is wearing an HMD or Viewer)
     */
    RIGHTEYE = "RightEye" as any,

    /*
     * Identifies a subview for a custom view configuration
     */
    OTHER = "Other" as any,
}

/**
 * A serialized notation for the position, orientation, and referenceFrame of an entity.
 */
export interface SerializedEntityPose {
    p: Cartesian3, // position
    o: Quaternion, // orientation
    r: number | string, // reference frame
}

/**
 * A map of entity ids and their associated poses.
 */
export interface SerializedEntityPoseMap {
    [id: string]: SerializedEntityPose | undefined
}

export interface SerializedFrustum {
    xOffset?: number,
    yOffset?: number,
    fov: number,
    aspectRatio?: number
}

/**
 * The serialized rendering parameters for a particular subview
 */
export interface SerializedSubview {
    type: SubviewType,
    /**
     * @deprecated
     */
    projectionMatrix?: ArrayLike<number> | Matrix4,
    /**
     * The viewing frustum for this subview
     */
    frustum: SerializedFrustum,
    pose?: SerializedEntityPose, // if undefined, the primary pose is used
    viewport?: Viewport // if undefined, the primary viewport size is used with no x or y offset
}

export namespace SerializedSubview {
    export function clone(subview:SerializedSubview, result:SerializedSubview=<any>{}) {
        result.type = subview.type;
        result.frustum = result.frustum || <any>{};
        result.frustum.xOffset = subview.frustum.xOffset;
        result.frustum.yOffset = subview.frustum.yOffset;
        result.frustum.fov = subview.frustum.fov;
        result.frustum.aspectRatio = subview.frustum.aspectRatio;
        result.pose = subview.pose;
        result.viewport = Viewport.clone(subview.viewport, result.viewport);
        return result;
    }
}

/**
 * The device state informs a [[REALITY_VIEWER]] about the current physical
 * configuration of the system, so that it may present a view that is compatible. 
 * The [[REALITY_VIEWER]] should consider the viewport and frustum values to be 
 * suggestions, unless their respective `strict` properties are true. The various 
 * poses and related accuracies represent the physical configuration of the system
 * at the (current) specified time. The [[REALITY_VIEWER]] may reuse the `time` 
 * and `pose` when presenting a view, though this is not mandatory 
 * (or necessarily expected).
 */
export interface DeviceState {
    /**
     * The (absolute) time for the latest device pose.
     */
    time: JulianDate;
    locationPose?: SerializedEntityPose;
    displayPose?: SerializedEntityPose;
    locationAccuracy: number|undefined;
    locationAltitudeAccuracy: number|undefined;
    viewport: Viewport;
    subviews: SerializedSubview[];
    strictViewport?: boolean;
    strictSubviewViewports?: boolean;
    strictSubviewFrustums?: boolean
    strictSubviewPoses?: boolean
}

export namespace DeviceState {
    export function clone(state:DeviceState, result:DeviceState=<any>{}) {
        result.time = JulianDate.clone(<any>state.time, <any>result.time);
        result.locationPose = state.locationPose;
        result.displayPose = state.displayPose;
        result.locationAccuracy = state.locationAccuracy;
        result.locationAltitudeAccuracy = state.locationAltitudeAccuracy;
        result.viewport = Viewport.clone(state.viewport, result.viewport)!;
        result.subviews = state.subviews || [];
        result.subviews.length = state.subviews.length;
        state.subviews.forEach((subview, i)=>{
            result.subviews[i] = SerializedSubview.clone(subview, result.subviews[i]);
        })
        result.strictViewport = state.strictViewport;
        result.strictSubviewViewports = state.strictSubviewViewports;
        result.strictSubviewFrustums = state.strictSubviewFrustums;
        result.strictSubviewPoses = state.strictSubviewPoses;
        return result;
    } 
}

/**
 * The view state is provided by a [[REALITY_VIEWER]], and describes how a 
 * [[REALITY_AUGMENTER]] should render the current frame.
 */
export interface ViewState {
    /**
     * The absolute time when this view state was created
     */
    time: JulianDate,

    /**
     * The primary pose for the view (the pose of the viewer). This pose does 
     * not necessarily reflect the real-world (physical) pose of the viewer,
     * though it may.
     */
    pose: SerializedEntityPose|undefined,

    /** 
     * The radius (in meters) of latitudinal and longitudinal uncertainty,
     * in relation to the FIXED reference frame. 
     */
    locationAccuracy: number|undefined,

    /**
     * The accuracy of the altitude in meters. 
     */
    locationAltitudeAccuracy: number|undefined,

    /**
     * The primary viewport to render into. In a DOM environment, the bottom left corner of the document element 
     * (document.documentElement) should be considered the origin. 
     */
    viewport: Viewport,

    /**
     * The list of subviews to render.
     */
    subviews: SerializedSubview[]
}

/**
 * Describes the pose of a reality view and how it is able to render
 */
export interface DeprecatedEyeParameters {
    viewport?: Viewport; // default: maximum
    pose?: SerializedEntityPose;
    stereoMultiplier?: number; // default: 1
    fov?: number; // default: defer to manager
    aspect?: number; // default: matches viewport 
}

/**
 * Deprecated. See [[ViewSpec]]
 * Describes the partial frame state reported by reality viewers before v1.1
 * @deprecated
 */
export interface DeprecatedPartialFrameState {
    index: number,
    time: { dayNumber: number, secondsOfDay: number }, // JulianDate,
    view?: ViewState,
    eye?: DeprecatedEyeParameters,
    entities?: SerializedEntityPoseMap
}

/**
 * Describes a complete frame state which is sent to child sessions
 */
export interface FrameState {
    index: number,
    time: { dayNumber: number, secondsOfDay: number } // deprecated at v1.1 (time now in view.time)
    reality?: RealityViewer,
    entities: SerializedEntityPoseMap,
    view: ViewState,
    sendTime?: { dayNumber: number, secondsOfDay: number }, // the time this state was sent
}


/**
* Represents a view of Reality
*/
export class RealityViewer {
    static EMPTY: RealityViewer = {
        uri: 'reality:empty',
        title: 'Empty Reality',
        providedReferenceFrames: ['FIXED']
    }

    public uri: string;
    public title?: string;
    public providedReferenceFrames?: Array<string>;

    static getType(reality?: RealityViewer) {
        if (reality === undefined) return undefined;
        const uri = reality.uri;
        const parts = uri.split(':');
        if (parts[0] === 'reality') {
            return parts[1];
        }
        return 'hosted';
    }
}
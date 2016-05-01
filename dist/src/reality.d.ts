import { TimerService } from './timer';
import { SerializedFrameState, RealityView } from './common';
import { FocusService } from './focus';
import { SessionPort, SessionService } from './session';
import { DeviceService } from './device';
import { MessagePortLike, Event } from './utils';
/**
 * Abstract class for a reality setup handler
 */
export declare abstract class RealitySetupHandler {
    abstract type: string;
    abstract setup(reality: RealityView, port: MessagePortLike): void;
}
/**
* A service which manages the reality view
*/
export declare class RealityService {
    private sessionService;
    private focusService;
    /**
     * An event that is raised when a reality control port is opened.
     */
    connectEvent: Event<SessionPort>;
    /**
     * An event that is raised when the current reality is changed.
     */
    changeEvent: Event<{
        previous: RealityView;
        current: RealityView;
    }>;
    /**
     * An event that is raised when the current reality emits the next frame state.
     * This event contains pose updates for the entities that are managed by
     * the current reality.
     */
    frameEvent: Event<SerializedFrameState>;
    /**
     * Manager-only. A map from a managed session to the desired reality
     */
    desiredRealityMap: WeakMap<SessionPort, RealityView>;
    /**
     * Manager-only. A map from a desired reality to the session which requested it
     */
    desiredRealityMapInverse: WeakMap<RealityView, SessionPort>;
    private _realitySession;
    private _default;
    private _current;
    private _desired;
    private _handlers;
    constructor(sessionService: SessionService, focusService: FocusService);
    /**
     * Manager-only. Register a reality setup handler
     */
    registerHandler(handler: RealitySetupHandler): void;
    /**
     * Get the current reality view
     */
    getCurrent(): RealityView;
    /**
    * Manager-only. Check if a type of reality is supported.
    * @param type reality type
    * @return true if a handler exists and false otherwise
    */
    isSupported(type: string): boolean;
    /**
     * Set the desired reality.
     */
    setDesired(reality: {
        type: string;
    }): void;
    /**
     * Get the desired reality
     */
    getDesired(): RealityView;
    /**
     * Set the default reality. Manager-only.
     */
    setDefault(reality: RealityView): void;
    /**
    * Manager-only. Selects the best reality based on the realites
    * requested by all managed sessions. Can be overriden for customized selection.
    *
    * @returns The reality chosen for this context. May be undefined if no
    * realities have been requested.
    */
    onSelectReality(): RealityView;
    private _setNextReality(reality);
    private _getHandler(type);
    private _setCurrent(reality);
    private _executeRealitySetupHandler(reality, port);
}
export declare class EmptyRealitySetupHandler implements RealitySetupHandler {
    private sessionService;
    private deviceService;
    private timer;
    type: string;
    constructor(sessionService: SessionService, deviceService: DeviceService, timer: TimerService);
    setup(reality: RealityView, port: MessagePortLike): void;
}

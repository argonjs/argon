import { TimerService } from './timer.ts';
import { SessionFactory, MessageChannelFactory, MessagePortLike } from './session.ts';
/**
* Describes a Reality
*/
export interface Reality {
    type: string;
    id?: string;
    [option: string]: any;
}
/**
* Assists in setting up a reality and stores the mappings from realities to their handler functions
*/
export declare class RealityService {
    timer: TimerService;
    messageChannelFactory: MessageChannelFactory;
    sessionFactory: SessionFactory;
    /**
     * A map of reality types and their respective setup functions.
     * In order to support a new type of reality, the setup function must be added to this map.
     */
    handlers: Map<string, (reality: Reality, port: MessagePortLike) => void>;
    /**
    * Assigns a timer, messageChannelFactory, and sessionFactory to this reality setup service. Sets up an empty reality
    */
    constructor(timer: TimerService, messageChannelFactory: MessageChannelFactory, sessionFactory: SessionFactory);
    /**
     * Setup a reality (a handler for the provided reality type must
     * exist or an error will be thrown)
     * @param reality the reality to setup
     * @param port the port to pass to the setup function
     */
    setup(reality: Reality, port: MessagePortLike): void;
    /**
    * Check if a type of reality is supported by this ArgonSystem.
    * @param type reality type
    * @return true if a handler exists and false otherwise
    */
    isSupported(type: string): boolean;
    private setupEmptyReality(reality, port);
}

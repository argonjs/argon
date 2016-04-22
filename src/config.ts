

/**
 * Describes the session configuration
 */
export interface Configuration {
    role?: Role;
    userData?: any;
    // app options
    appProvidesCustomView?: boolean;
    // reality view options
    realityViewSupportsControlPort?: boolean;
    realityViewSupportsCustomView?: boolean;
}


/*
 * Describes the role of a session
 */
export enum Role {

    /*
     * An application can augment a reality view.
     */
    APPLICATION = "Application" as any,

    /*
     * A reality view is a representation of reality.
     */
    REALITY_VIEW = "RealityView" as any,

    /*
     * The manager mediates access to sensors / trackers 
     * and keeps track of known entities in the world.
     */
    MANAGER = "Manager" as any
}

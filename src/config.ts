

/**
 * Describes the session configuration
 */
export interface Configuration {
    role: Role;
    userData?: any;
    enableRealityControlPort?: boolean;
    enableIncomingUpdateEvents?: boolean;
    defaultReality?: { type: string, [option: string]: any };
}


/*
 * Describes the role of a session
 */
export enum Role {

    /*
     * An application recieves state update events from a manager.
     */
    APPLICATION = "Application" as any,

    /*
     * A reality provides state update events to a manager.
     */
    REALITY = "Reality" as any,

    /*
     * A manager recieves state update events from a reality and
     * sends state update events to applications.
     */
    MANAGER = "Manager" as any
}

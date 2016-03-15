/**
 * Describes the session configuration
 */
export interface Configuration {
    role: Role;
    userData?: any;
    enableRealityControlPort?: boolean;
    enableIncomingUpdateEvents?: boolean;
    defaultReality?: {
        type: string;
        [option: string]: any;
    };
}
export declare enum Role {
    APPLICATION,
    REALITY,
    MANAGER,
}

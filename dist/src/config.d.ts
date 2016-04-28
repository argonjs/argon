/**
 * Describes the session configuration
 */
export interface Configuration {
    name?: string;
    role?: Role;
    userData?: any;
    appProvidesCustomView?: boolean;
    realityViewSupportsControlPort?: boolean;
    realityViewSupportsCustomView?: boolean;
}
export declare enum Role {
    APPLICATION,
    REALITY_VIEW,
    MANAGER,
}

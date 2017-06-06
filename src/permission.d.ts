import { SessionService, SessionPort } from './session';
export declare type PermissionType = 'geolocation' | 'camera' | 'world-structure';
export declare class Permission {
    readonly type: PermissionType;
    readonly state: PermissionState;
    constructor(type: PermissionType, state?: PermissionState);
}
export declare enum PermissionState {
    NOT_REQUIRED,
    PROMPT,
    GRANTED,
    DENIED,
}
/**
 * Access permission states
 */
export declare class PermissionService {
    protected sessionService: SessionService;
    constructor(sessionService: SessionService);
    /**
     * Query current state of permission
     *
     * @returns A Promise that resolves to the current state of the permission
     */
    query(type: PermissionType, session?: SessionPort): Promise<PermissionState>;
    /**
     * Revoke permissions
     *
     * @returns A promise that resolves to the state of requested permission after revoking.
     * Should be PermissionState.Denied on success.
     */
    revoke(type: PermissionType): Promise<PermissionState>;
}
/**
 * Manage permissions
 */
export declare class PermissionServiceProvider {
    private sessionService;
    constructor(sessionService: SessionService);
    /**
     * Browsers should override this and ask the users via their own UI.
     * The permissions should be stored locally based on the host name and id(=type).
     * @param session Used to acquire hostname from the uri.
     * @param id Can be used as a type of permission. Also can be random id's on Vuforia requests.
     * @returns A resolved promise if subscription is permitted.
     * @returns A rejected promise if subscription is not permitted.
     */
    handlePermissionRequest(session: SessionPort, id: string, options: any): Promise<void>;
    /**
     * Browsers should override this to check their locally stored permissions.
     * @param type
     * @returns The current state of the permission
     */
    getPermissionState(session: SessionPort, type: PermissionType): PermissionState;
}

import { autoinject } from 'aurelia-dependency-injection';
import { SessionService, SessionPort } from './session';

export type PermissionType = 
    'geolocation'          //Geolocation
    | 'camera'          //Camera
    | 'world-structure';      //3D Structural mesh

export class Permission {
    readonly type: PermissionType;
    readonly state: PermissionState;

    constructor(type: PermissionType, state?: PermissionState) {
        this.type = type;
        this.state = state || PermissionState.NOT_REQUIRED;
    }
}

export enum PermissionState {
    NOT_REQUIRED = 'not_required' as any,   //Default state. Permission is not being used.
    PROMPT = 'prompt' as any,         //Permission should be asked for from the user.
    GRANTED = 'granted' as any,       //Permission has been granted.
    DENIED = 'denied' as any,        //Permission has been denied.
}

/**
 * Access permission states
 */
@autoinject()
export class PermissionService {
    constructor(protected sessionService: SessionService) {

    }

    /**
     * Query current state of permission
     * 
     * @returns A Promise that resolves to the current state of the permission
     */
    // public query() : Promise<Permission[]>;
    public query(type: PermissionType, session = this.sessionService.manager) : Promise<PermissionState> {
        // let permissionMaps: Permission[] = [];
        return session.request('ar.permission.query', {type}).then(({state}:{state: PermissionState}) => {
            return state || PermissionState.NOT_REQUIRED;
        });
    }

    /**
     * Revoke permissions
     * 
     * @returns A promise that resolves to the state of requested permission after revoking.
     * Should be PermissionState.Denied on success.
     */
    public revoke(type: PermissionType) : Promise<PermissionState> {
        const session = this.sessionService.manager;
        return session.request('ar.permission.revoke', {type}).then(({state}:{state: PermissionState}) => {
            return state;
        });
    }

}

/**
 * Manage permissions
 */
@autoinject()
export class PermissionServiceProvider {

    constructor(private sessionService:SessionService) {
        this.sessionService.ensureIsRealityManager();
        this.sessionService.connectEvent.addEventListener((session: SessionPort) => {

            session.on['ar.permission.query'] = ({type}: {type: PermissionType}) => {
                return Promise.resolve({state: this.getPermissionState(session, type)});
            }

            /**
             * Browswer should override this if they want to allow revoking permissions.
             * @param type
             * @returns A promise that resolves to the state of the permission after revoking
             */
            session.on['ar.permission.revoke'] = ({type}: {type: PermissionType}) => {
                return Promise.reject(new Error("Revoking permission is not supported on this browser."));
            }
        });
    }

    /**
     * Browsers should override this and ask the users via their own UI.
     * The permissions should be stored locally based on the host name and id(=type).
     * @param session Used to acquire hostname from the uri.
     * @param id Can be used as a type of permission. Also can be random id's on Vuforia requests.
     * @returns A resolved promise if subscription is permitted.
     * @returns A rejected promise if subscription is not permitted.
     */
    public handlePermissionRequest(session: SessionPort, id: string, options: any) {
        return Promise.resolve();
    }

    /**
     * Browsers should override this to check their locally stored permissions.
     * @param type
     * @returns The current state of the permission
     */
    public getPermissionState(session: SessionPort, type: PermissionType){
        return PermissionState.GRANTED;
    }
}
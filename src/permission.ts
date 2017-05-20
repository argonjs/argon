import { autoinject } from 'aurelia-dependency-injection';
import { SessionService, SessionPort } from './session';

export type PermissionType = 
    'ar.stage'          //Geolocation
    | 'ar.camera'       //Camera
    | 'ar.3dmesh';      //3D Structural mesh

export const PermissionNames = {
        'ar.stage': 'LOCATION',
        'ar.camera': 'CAMERA',
        'ar.3dmesh': 'STUCTURAL MESH'
    };

const PermissionDescriptions = {
        'ar.stage': 'You are about to grant this website your location!', 
        'ar.camera': 'You are about to let this website see through your camera!',
        'ar.3dmesh': 'You are about to let this website understand the structure of your surroundings!'
    };
/**
 * 
 */
export class Permission {
    readonly type: PermissionType;
    readonly state: PermissionState;

    constructor(type: PermissionType, state?: PermissionState) {
        this.type = type;
        this.state = state || PermissionState.NOT_REQUIRED;
    }

    get name() {
        return PermissionNames[this.type];
    }

    get description() {
        return PermissionDescriptions[this.type];
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

            /**
             * Browsers should override this to check their locally stored permissions.
             * @param type
             * @returns The current state of the permission
             */
            session.on['ar.permission.query'] = ({type}: {type: PermissionType}) => {
                return Promise.resolve({state: PermissionState.GRANTED});
            }

            /**
             * Browswer should override this if they want to allow revoking permissions.
             * @param type
             * @returns The state of the permission after revoking
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
    public handlePermissionRequest(session: SessionPort, id: string) {
        return Promise.resolve();
    }
}
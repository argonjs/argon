import { autoinject } from 'aurelia-dependency-injection';
import { SessionService, SessionPort } from './session';

export type PermissionType = 
    'ar.stage'          //geolocation
    | 'ar.camera'       //camera
    | 'ar.3dmesh';      //3D Structural mesh

/**
 * 
 */
export class Permission {
    readonly type: PermissionType;
    readonly state: PermissionState;

    private Names = {
        'ar.stage': 'LOCATION',
        'ar.camera': 'CAMERA',
        'ar.3dmesh': 'STUCTURAL MESH'
    };

    private Descriptions = {
        'ar.stage': 'You are about to grant this website your location!', 
        'ar.camera': 'You are about to let this website see through your camera!',
        'ar.3dmesh': 'You are about to let this website understand the structure of your surroundings!'
    };

    constructor(type: PermissionType, state?: PermissionState) {
        this.type = type;
        this.state = state || PermissionState.NOT_REQUIRED;
    }

    get name() {
        return this.Names[this.type];
    }

    get description() {
        return this.Descriptions[this.type];
    }
}

export enum PermissionState {
    NOT_REQUIRED = 0, //not being used by app
    PROMPT = 1, //show the user a prompt to decide whether to succeed 
    GRANTED = 77,    //succeed without prompting the user     
    DENIED = 44,     //fail without prompting the user
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
     * @returns A PermissionState
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
     * @returns revoked state (should be PermissionState.Denied on success)
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
export abstract class PermissionServiceProvider {

    constructor(private sessionService:SessionService) {
        this.sessionService.ensureIsRealityManager();
        this.sessionService.connectEvent.addEventListener((session: SessionPort) => {
            session.on['ar.permission.query'] = ({type}: {type: PermissionType}) => {
                return Promise.resolve({state: PermissionState.GRANTED});
            }

            session.on['ar.permission.revoke'] = ({type}: {type: PermissionType}) => {
                return Promise.resolve({state: PermissionState.DENIED});
            }
        });
    }

    /**
     * Should return a resolved promise if subscription is permitted, 
     * or a rejected promise if subscription is not permitted.
     */
    public handlePermissionRequest(session: SessionPort, id: string) {
        return Promise.resolve();
    }
}
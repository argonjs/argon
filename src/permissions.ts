//import { SessionPort } from './session'
export const PermissionTypes = ['ar.stage', 'ar.camera', 'ar.3dmesh'];
export interface PermissionRequest {
    type: string,
    uri: string | undefined,
    force?: boolean
}

// import { inject } from 'aurelia-dependency-injection';
// import { SessionService, SessionPort } from './session';
//import { Event } from './utils';

export const PermissionTypes = ['ar.stage', 'ar.camera', 'ar.3dmesh'];
export interface PermissionRequest {
    type: string,
    uri: string | undefined
}

// /**
//  * Access permission state
//  */
// @inject(SessionService)
// export class PermissionService {
//     constructor(sessionService: SessionService) {
//     }
// }


// /**
//  * Manage permissions
//  */
// @inject(SessionService, PermissionService)
// export class PermissionServiceProvider {

//     //public permissionChangeEvent = new Event<void>();
// sessionService.connectEvent.addEventListener((session) => {
//             session.on['ar.context.unsubscribe'] = ({id}:{id:string}) => {
//                 if (!subscriptions[id]) return;

//                 const subscribers = this.subscribersByEntityId.get(id);
//                 subscribers && subscribers.delete(session);
//                 delete subscriptions[id];
//                 this.subscribersChangeEvent.raiseEvent({id, subscribers});
//             }

//             session.on['ar.context.setGeolocationOptions'] = ({options}) => {
//                 this._handleSetGeolocationOptions(session, options)
//             }

//             session.closeEvent.addEventListener(()=>{
//                 this.entitySubscriptionsBySubscriber.delete(session);
//                 for (const id in subscriptions) {
//                     const subscribers = this.subscribersByEntityId.get(id);
//                     subscribers && subscribers.delete(session);
//                     this.subscribersChangeEvent.raiseEvent({id, subscribers});
//                 }
//             })
//         });

//         this.contextService.updateEvent.addEventListener(()=>{
//             this._publishUpdates();
//         });
//     constructor(private sessionService:SessionService) {
//         sessionService.ensureIsRealityManager();
//         sessionService.manager.connectEvent.addEventListener((session) => {
//             session.on['ar.permission.state'] = ({})
//         });
      
//     }
// }
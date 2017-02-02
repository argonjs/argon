var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from 'aurelia-dependency-injection';
import { createGuid } from '../cesium/cesium-imports';
import { SessionService } from '../session';
import { ViewportService } from '../viewport';
import { RealityViewer } from './base';
let HostedRealityViewer = class HostedRealityViewer extends RealityViewer {
    constructor(sessionService, viewportService, uri) {
        super(uri);
        this.sessionService = sessionService;
        this.viewportService = viewportService;
        this.uri = uri;
        this.type = 'hosted';
        if (typeof document !== 'undefined' && document.createElement) {
            const iframeElement = this.iframeElement = document.createElement('iframe');
            iframeElement.name = createGuid();
            iframeElement.style.border = '0';
            iframeElement.width = '100%';
            iframeElement.height = '100%';
            iframeElement.style.position = 'absolute';
            iframeElement.style.display = 'none';
            const viewElement = this.viewportService.element;
            viewElement.insertBefore(iframeElement, viewElement.firstChild);
            this.presentChangeEvent.addEventListener(() => {
                this.iframeElement.style.display = this.isPresenting ? 'initial' : 'none';
            });
        }
    }
    destroy() {
        super.destroy();
        if (this.iframeElement) {
            this.iframeElement.remove();
        }
    }
    load() {
        if (typeof document !== 'undefined' && document.createElement) {
            const session = this.sessionService.addManagedSessionPort(this.uri);
            session.connectEvent.addEventListener(() => {
                this.connectEvent.raiseEvent(session);
            });
            let handleConnectMessage = (ev) => {
                if (ev.data.type !== 'ARGON_SESSION')
                    return;
                const name = ev.data.name;
                const messagePort = ev.ports && ev.ports[0];
                if (!messagePort)
                    throw new Error('Received an ARGON_SESSION message without a MessagePort object');
                if (name !== this.iframeElement.name)
                    return;
                window.removeEventListener('message', handleConnectMessage);
                session.open(messagePort, this.sessionService.configuration);
            };
            window.addEventListener('message', handleConnectMessage);
            this.iframeElement.src = '';
            this.iframeElement.src = this.uri;
        }
    }
};
HostedRealityViewer = __decorate([
    inject(SessionService, ViewportService),
    __metadata("design:paramtypes", [SessionService,
        ViewportService, String])
], HostedRealityViewer);
export { HostedRealityViewer };
// @singleton()
// @inject(SessionFactory)
// export class DOMSessionListenerService {
// 	public sessionEvent = new Event<Session>();
// 	constructor(sessionFactory:SessionFactory) {
// 		window.addEventListener('message', ev => {
// 			if (ev.data.type != 'ARGON_SESSION') return;
// 			const messagePort:MessagePortLike = ev.ports && ev.ports[0];
// 			if (!messagePort) 
// 				throw new Error('Received an ARGON_SESSION message without a MessagePort object');
// 			// get the event.source iframe
// 			let i = 0;
// 			let frame:HTMLIFrameElement = null;
// 			while (i < window.frames.length && frame != null) {
// 				if (window.frames[i] == ev.source)
// 					frame = document.getElementsByTagName( 'iframe' )[i];
// 			}			
// 			const session = sessionFactory.create();
// 			session.frame = frame;
// 			if (frame) frame.addEventListener('load', function close() {
// 				frame.removeEventListener('load', close);
// 				console.log('IFrameSessionHandler: frame load detected, closing current session.', frame, session)
// 				session.close()
// 			});
// 			this.sessionEvent.raiseEvent(session);
// 		});
// 	}
// }

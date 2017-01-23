
import { inject } from 'aurelia-dependency-injection'
import { createGuid } from '../cesium/cesium-imports'
import { SessionService } from '../session'
import { ViewService } from '../view'
import { RealityViewer } from './base'

@inject(SessionService, ViewService)
export class HostedRealityViewer extends RealityViewer {

    public type = 'hosted';

    public iframeElement:HTMLIFrameElement;

    constructor(
        private sessionService: SessionService,
        private viewService: ViewService,
        public uri:string) {
        super(sessionService, uri);

        if (typeof document !== 'undefined' && document.createElement) {
            const iframeElement = this.iframeElement = document.createElement('iframe');
            iframeElement.name = createGuid();
            iframeElement.style.border = '0';
            iframeElement.width = '100%';
            iframeElement.height = '100%';
            iframeElement.style.position = 'absolute';
            iframeElement.style.display = 'none';
            const viewElement = this.viewService.element;
            viewElement.insertBefore(iframeElement!, viewElement.firstChild);
        }
    }

    public destroy() {
        if (this.iframeElement) {
            this.iframeElement.remove();
        }
    }

    public setPresenting(foo:boolean) {
        this.iframeElement.style.display = foo ? 'initial' : 'none';
    }

    public load(): void {
        super.load();
        
        this.iframeElement.src = '';
        this.iframeElement.src = this.uri;

        let handleConnectMessage = (ev:MessageEvent) => {
            if (ev.data.type !== 'ARGON_SESSION') return;
            const name = ev.data.name;
            const messagePort: MessagePort = ev.ports && ev.ports[0];

            if (!messagePort)
                throw new Error('Received an ARGON_SESSION message without a MessagePort object');
            
            if (name !== this.iframeElement.name) return;

            window.removeEventListener('message', handleConnectMessage);

            this.session.open(messagePort, this.sessionService.configuration);
        };
        window.addEventListener('message', handleConnectMessage);
    }
}

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

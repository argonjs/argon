import {inject} from 'aurelia-dependency-injection';
import {SessionService, SessionPort} from './session';
import {Event} from './utils';

export interface Viewport {
    x: number,
    y: number,
    width: number,
    height: number
}

/**
 * Manages the viewport
 */
@inject(SessionService)
export class ViewportService {

    /**
     * An event that is raised when the current viewport state has changed
     */
    public readonly changeEvent = new Event<{ previous: Viewport }>();

    public current: Viewport;

    public desired: Viewport;

    public desiredViewportMap = new WeakMap<SessionPort, Viewport>();

    public element: HTMLDivElement;


    constructor(private sessionService: SessionService) {

        if (typeof document !== 'undefined') {
            let viewportMetaTag = <HTMLMetaElement>document.querySelector('meta[name=viewport]');
            if (!viewportMetaTag) viewportMetaTag = document.createElement('meta');
            viewportMetaTag.name = 'viewport'
            viewportMetaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
            document.head.appendChild(viewportMetaTag);

            let argonView = <HTMLDivElement>document.querySelector('#argon');
            if (!argonView) argonView = document.createElement('div');
            argonView.id = 'argon';
            document.documentElement.appendChild(argonView);
            this.element = argonView;

            if (document.body) document.body.appendChild(argonView)
            else {
                document.addEventListener('DOMContentLoaded', () => {
                    document.body.appendChild(argonView);
                })
            }

            var style = document.createElement("style");
            style.type = 'text/css';
            document.head.appendChild(style);
            const sheet = <CSSStyleSheet>style.sheet;
            sheet.insertRule(`
                #argon {
                    position: fixed;
                    transform: translateZ(0px);
                    z-index: -9999;
                    left: 0px;
                    bottom: 0px;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    border: 0;
                    padding: 0;
                }
            `, 0);
            sheet.insertRule(`
                #argon > * {
                    position: absolute;
                    transform: translateZ(0px);
                    left: 0px;
                    bottom: 0px;
                    width: inherit;
                    height: inherit;
                }
            `, 1);

            this.changeEvent.addEventListener(() => {
                this.element.style.left = this.current.x + 'px';
                this.element.style.bottom = this.current.y + 'px';
                this.element.style.width = this.current.width + 'px';
                this.element.style.height = this.current.height + 'px';
            })
        }

        if (this.sessionService.isManager()) {
            this.sessionService.connectEvent.addEventListener((session) => {
                session.on['ar.viewport.desired'] = (viewport) => {
                    this.desiredViewportMap.set(session, viewport);
                }
            })
        }
    }

    /**
     * Returns the suggested viewport. By default, returns the width and height of the 
     * document.documentElement (if DOM is available), otherwise, returns {width:0, height:0}
     */
    public getSuggested(): Viewport {
        if (typeof document !== 'undefined') {
            return {
                x: 0,
                y: 0,
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
        return { x: 0, y: 0, width: 0, height: 0 }
    }

    /**
     * Set the desired viewport
     */
    public setDesired(viewport: Viewport) {
        this.desired = viewport;
        this.sessionService.manager.send('ar.viewport.desired', viewport)
    }

    /**
     * Set the current viewport. Called internally.
     */
    public _setViewport(viewport: Viewport) {
        const previous = this.current;
        if (!previous ||
            previous.x !== viewport.x ||
            previous.y !== viewport.y ||
            previous.width !== viewport.width ||
            previous.height !== viewport.height
        ) {
            this.current = viewport;
            this.changeEvent.raiseEvent({ previous })
        }
    }
}

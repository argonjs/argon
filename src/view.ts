import {inject} from 'aurelia-dependency-injection'
import {Entity, Matrix4} from './cesium/cesium-imports'
import {Viewport, SubviewType, SerializedEntityPose, SerializedViewParameters} from './common'
import {SessionService, SessionPort} from './session'
import {EntityPose, ContextService} from './context'
import {Event} from './utils'
import {FocusService} from './focus'

/**
 * The rendering paramters for a particular subview
 */
export interface Subview {
    type: SubviewType,
    projectionMatrix: Array<number>,
    pose: EntityPose,
    viewport: Viewport
}

/**
 * Manages the view state
 */
@inject(SessionService, ContextService, FocusService)
export class ViewService {

    /**
     * An event that is raised when the root viewport has changed
     */
    public viewportChangeEvent = new Event<{ previous: Viewport }>();

    /**
     * An event that is raised when ownership of the view has been acquired by this application
     */
    public acquireEvent = new Event<void>();

    /** 
     * An event that is raised when ownership of the view has been released from this application
    */
    public releaseEvent = new Event<void>();

    /**
     * An HTMLDivElement which matches the root viewport. This is 
     * provide for convenience to attach other elements to (such as
     * a webGL canvas element). Attached elements will automatically 
     * inherit the same size and position as this element (via CSS). 
     */
    public element: HTMLDivElement;

    private _current: SerializedViewParameters;
    private _currentViewportJSON: string;

    public desiredViewportMap = new WeakMap<SessionPort, Viewport>();
    public desiredProjectionMatrixMap = new WeakMap<SessionPort, Matrix4>();

    constructor(
        private sessionService: SessionService,
        private contextService: ContextService,
        private focusService: FocusService) {

        if (typeof document !== 'undefined') {
            let viewportMetaTag = <HTMLMetaElement>document.querySelector('meta[name=viewport]');
            if (!viewportMetaTag) viewportMetaTag = document.createElement('meta');
            viewportMetaTag.name = 'viewport'
            viewportMetaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
            document.head.appendChild(viewportMetaTag);

            let argonContainer = <HTMLDivElement>document.querySelector('#argon');
            if (!argonContainer) argonContainer = document.createElement('div');
            argonContainer.id = 'argon';
            argonContainer.classList.add('argon-view');

            const element = document.createElement('div');
            element.style.width = '100%';
            element.style.height = '100%';
            element.classList.add('argon-view');
            this.element = element;
            argonContainer.insertBefore(this.element, argonContainer.firstChild);

            if (document.body) document.body.appendChild(argonContainer)
            else {
                document.documentElement.appendChild(argonContainer);
                document.addEventListener('DOMContentLoaded', () => {
                    document.body.appendChild(argonContainer);
                })
            }

            var style = document.createElement("style");
            style.type = 'text/css';
            document.head.insertBefore(style, document.head.firstChild);
            const sheet = <CSSStyleSheet>style.sheet;
            sheet.insertRule(`
                #argon {
                    position: fixed;
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
                .argon-view > * {
                    position: absolute;
                    pointer-events: none;
                }
            `, 1);

            this.focusService.focusEvent.addEventListener(() => {
                argonContainer.classList.remove('argon-no-focus');
                argonContainer.classList.add('argon-focus');
            })

            this.focusService.blurEvent.addEventListener(() => {
                argonContainer.classList.remove('argon-focus');
                argonContainer.classList.add('argon-no-focus');
            })
        }

        if (this.sessionService.isManager) {
            this.sessionService.connectEvent.addEventListener((session) => {
                session.on['ar.viewport.desired'] = (viewport: Viewport) => {
                    this.desiredViewportMap.set(session, viewport);
                }
            })
        }

        this.contextService.renderEvent.addEventListener(() => {
            this._setViewParameters(this.contextService.state.view);
        })
    }

    public getSubviews(referenceFrame?: Entity): Subview[] {
        let subviews: Subview[] = [];
        this._current.subviews.forEach((subview, index) => {
            const viewEntity = this.contextService.entities.getById('ar.view_' + index);
            subviews[index] = {
                type: subview.type,
                pose: this.contextService.getEntityPose(viewEntity, referenceFrame),
                projectionMatrix: <Array<number>>subview.projectionMatrix,
                viewport: subview.viewport || this._current.viewport
            }
        })
        return subviews;
    }

    public getViewport() {
        return this._current.viewport;
    }

    /**
     * Set the desired root viewport
     */
    public setDesiredViewport(viewport: Viewport) {
        this.sessionService.manager.send('ar.view.desiredViewport', viewport)
    }

    /**
     * Request control over the view. 
     * The manager is likely to reject this request if this application is not in focus. 
     * When running on an HMD, this request will always fail. If the current reality view
     * does not support custom views, this request will fail. The manager may revoke
     * ownership at any time (even without this application calling releaseOwnership)
     */
    public requestOwnership() {

    }

    /**
     * Release control over the view. 
     */
    public releaseOwnership() {

    }

    /**
     * Returns true if this application has control over the view.  
     */
    public isOwner() {

    }

    /**
     * Returns a maximum viewport
     */
    public getMaximumViewport() {
        if (window && document && document.documentElement) {
            return {
                x: 0,
                y: 0,
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        } else {
            return undefined;
        }
    }

    private _setViewParameters(view: SerializedViewParameters) {
        const viewportJSON = JSON.stringify(view.viewport);
        const previousViewport = this._current && this._current.viewport;
        this._current = view;

        if (!this._currentViewportJSON || this._currentViewportJSON !== viewportJSON) {
            this._currentViewportJSON = viewportJSON;

            if (this.element) {
                const viewport = view.viewport;
                this.element.style.left = viewport.x + 'px';
                this.element.style.bottom = viewport.y + 'px';
                this.element.style.width = (viewport.width / document.documentElement.clientWidth) * 100 + '%';
                this.element.style.height = (viewport.height / document.documentElement.clientHeight) * 100 + '%';
            }

            this.viewportChangeEvent.raiseEvent({ previous: previousViewport })
        }
    }
}

import {inject} from 'aurelia-dependency-injection'
import {defined, Entity, Matrix4, PerspectiveFrustum} from './cesium/cesium-imports'
import {Viewport, SubviewType, SerializedFrameState, SerializedEntityPose, SerializedViewParameters} from './common'
import {SessionService, SessionPort} from './session'
import {EntityPose, ContextService} from './context'
import {Event} from './utils'
import {FocusService} from './focus'

/**
 * The rendering paramters for a particular subview
 */
export interface Subview {
    index: number,
    type: SubviewType,
    projectionMatrix: Array<number>,
    pose: EntityPose,
    viewport: Viewport
}

/**
 * Manages the view state
 */
@inject(SessionService, FocusService, ContextService)
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

    public desiredViewportMap = new WeakMap<SessionPort, Viewport>();

    private _current: SerializedViewParameters;
    private _currentViewportJSON: string;

    private _subviewEntities: Entity[] = [];

    constructor(
        private sessionService: SessionService,
        private focusService: FocusService,
        private contextService: ContextService) {

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
            });

            this.contextService.prepareEvent.addEventListener(({serializedState, state}) => {
                if (!defined(state.view)) {
                    if (!defined(serializedState.eye))
                        throw new Error("Unable to construct view configuration: missing eye parameters");
                    state.view = this.generateViewFromFrameStateEye(serializedState);
                }
            })
        }

        this.contextService.renderEvent.addEventListener(() => {
            const state = this.contextService.state;
            const subviewEntities = this._subviewEntities;
            subviewEntities.length = 0;
            state.view.subviews.forEach((subview, index) => {
                const id = 'ar.view_' + index;
                state.entities[id] = subview.pose || state.view.pose;
                this.contextService.updateEntityFromFrameState(id, state);
                delete state.entities[id];
                subviewEntities[index] = this.contextService.entities.getById(id);
            });
            this.update();
        })
    }

    public getSubviews(referenceFrame?: Entity): Subview[] {
        this.update();
        let subviews: Subview[] = [];
        this._current.subviews.forEach((subview, index) => {
            const subviewEntity = this._subviewEntities[index];
            subviews[index] = {
                index: index,
                type: subview.type,
                pose: this.contextService.getEntityPose(subviewEntity, referenceFrame),
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
        }
        throw new Error("Not implemeneted for the current platform");
    }

    private _scratchFrustum = new PerspectiveFrustum();
    protected generateViewFromFrameStateEye(state: SerializedFrameState): SerializedViewParameters {
        const eye = state.eye;
        if (!eye) throw new Error("Expected a frame state with an eye configuration");
        const viewport = this.getMaximumViewport();
        this._scratchFrustum.fov = eye.fov || Math.PI / 3;
        this._scratchFrustum.aspectRatio = viewport.width / viewport.height;
        this._scratchFrustum.near = 0.01;
        return {
            viewport,
            pose: eye.pose,
            subviews: [
                {
                    type: SubviewType.SINGULAR,
                    projectionMatrix: this._scratchFrustum.infiniteProjectionMatrix
                }
            ]
        }
    }

    public update() {
        const view = this.contextService.state.view;
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

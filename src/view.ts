import {inject} from 'aurelia-dependency-injection';
import {Context, FrameState} from './context.ts'

/**
 * Provides service for using Argon in a web page
 */
@inject(Context)
export class ViewService {

    public element: HTMLDivElement;

    /*
     * Initializes element in web browser to house argon
     * Updates width and height of element
     */
    constructor(private context: Context) {
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
        }

        if (typeof document !== 'undefined') {
            let previousWidth, previousHeight;
            this.context.updateEvent.addEventListener((frameState) => {
                const width = frameState.size.width;
                const height = frameState.size.height;
                if (previousWidth !== width || previousHeight !== height) {
                    this.element.style.width = frameState.size.width + 'px';
                    this.element.style.height = frameState.size.height + 'px';
                }
                previousWidth = width;
                previousHeight = height;
            })
        }
    }

}

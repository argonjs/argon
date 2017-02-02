import { autoinject } from 'aurelia-dependency-injection'
import { ViewServiceProvider } from './view'
import { ViewportService, PresentationMode } from './viewport'
import { SessionService } from './session'
import { RealityService, RealityServiceProvider } from './reality'
import * as utils from './utils'

const openIcon = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='768' height='768'%3E%3Cpath fill='white' d='M448.5 96H672v223.5h-64.5v-114L294 519l-45-45 313.5-313.5h-114V96zm159 511.5V384H672v223.5c0 34.5-30 64.5-64.5 64.5h-447c-36 0-64.5-30-64.5-64.5v-447C96 126 124.5 96 160.5 96H384v64.5H160.5v447h447z'/%3E%3C/svg%3E")`;

const eyeIcon = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512'%3E%3Cpath fill='white' d='M256 96C144.34 96 47.56 161.02 0 256c47.56 94.98 144.34 160 256 160 111.656 0 208.438-65.02 256-160-47.558-94.98-144.344-160-256-160zm126.225 84.852c30.08 19.187 55.57 44.887 74.717 75.148-19.146 30.26-44.637 55.96-74.718 75.148C344.427 355.258 300.78 368 256 368s-88.43-12.743-126.226-36.852c-30.08-19.186-55.57-44.886-74.716-75.148 19.146-30.262 44.637-55.962 74.717-75.148 1.96-1.25 3.938-2.46 5.93-3.65C130.725 190.866 128 205.612 128 221c0 70.69 57.308 128 128 128s128-57.31 128-128c0-15.387-2.726-30.134-7.704-43.8 1.99 1.19 3.97 2.402 5.93 3.652zM256 208c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48z'/%3E%3C/svg%3E")`;

const vrIcon = `url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20245.82%20141.73%22%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill%3A%23fff%3Bfill-rule%3Aevenodd%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Ctitle%3Emask%3C%2Ftitle%3E%3Cpath%20class%3D%22a%22%20d%3D%22M175.56%2C111.37c-22.52%2C0-40.77-18.84-40.77-42.07S153%2C27.24%2C175.56%2C27.24s40.77%2C18.84%2C40.77%2C42.07S198.08%2C111.37%2C175.56%2C111.37ZM26.84%2C69.31c0-23.23%2C18.25-42.07%2C40.77-42.07s40.77%2C18.84%2C40.77%2C42.07-18.26%2C42.07-40.77%2C42.07S26.84%2C92.54%2C26.84%2C69.31ZM27.27%2C0C11.54%2C0%2C0%2C12.34%2C0%2C28.58V110.9c0%2C16.24%2C11.54%2C30.83%2C27.27%2C30.83H99.57c2.17%2C0%2C4.19-1.83%2C5.4-3.7L116.47%2C118a8%2C8%2C0%2C0%2C1%2C12.52-.18l11.51%2C20.34c1.2%2C1.86%2C3.22%2C3.61%2C5.39%2C3.61h72.29c15.74%2C0%2C27.63-14.6%2C27.63-30.83V28.58C245.82%2C12.34%2C233.93%2C0%2C218.19%2C0H27.27Z%22%2F%3E%3C%2Fsvg%3E)`;

const fullscreenIcon = `url('data:image/svg+xml;utf8,<svg width="512" height="512" version="1.1" viewBox="-3 -3 17 17" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="white" id="Core" transform="translate(-215.000000, -257.000000)"><g id="fullscreen" transform="translate(215.000000, 257.000000)"><path d="M2,9 L0,9 L0,14 L5,14 L5,12 L2,12 L2,9 L2,9 Z M0,5 L2,5 L2,2 L5,2 L5,0 L0,0 L0,5 L0,5 Z M12,12 L9,12 L9,14 L14,14 L14,9 L12,9 L12,12 L12,12 Z M9,0 L9,2 L12,2 L12,5 L14,5 L14,0 L9,0 L9,0 Z" id="Shape"/></g></g></g></svg>')`;

const argonAppIcon = `url(data:image/jpeg;base64,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)`

/**
 * Provides a default UI
 */
@autoinject()
export class DefaultUIService {

    private element?:HTMLDivElement;
    private realityViewerSelectorElement:HTMLDivElement;
    private realityViewerListElement:HTMLDivElement;
    private menuBackgroundElement:HTMLDivElement;
    
    private realityViewerItemElements = new Map<string, HTMLDivElement>();
    
    private menuItems:Array<HTMLDivElement|null|undefined> = [];
    private menuOpen = false;

    private openInArgonMenuItem:HTMLDivElement;
    private hmdMenuItem:HTMLDivElement;
    private realityMenuItem:HTMLDivElement;
    private maximizeMenuItem:HTMLDivElement;

    constructor(
        private sessionService:SessionService,
        private viewportService: ViewportService,
        private realityService:RealityService,
        private realityServiceProvider:RealityServiceProvider,
        private viewServiceProvider:ViewServiceProvider) {
        const config = this.sessionService.configuration.defaultUI || {};
        
        if (document && !config.disable) {
            const style = document.createElement("style");
            style.type = 'text/css';
            document.head.insertBefore(style, document.head.firstChild);
            const sheet = <CSSStyleSheet>style.sheet;
            sheet.insertRule(`
                .argon-ui {
                    -webkit-tap-highlight-color: transparent;
                    -webkit-user-select: none;
                }
            `, sheet.cssRules.length);
            sheet.insertRule(`
                .argon-ui-button {
                    background-image: ${argonAppIcon};
                    width: 144px;
                    height: 144px;
                }
            `, sheet.cssRules.length);
            sheet.insertRule(`
                .argon-ui-blur {
                    background-color: rgba(238, 178, 17, 0.7);
                    -webkit-backdrop-filter: blur(5px);
                }
            `, sheet.cssRules.length);
            sheet.insertRule(`
                .argon-ui-box {
                    webkit-user-select: none;
                    ms-user-select: none;
                    user-select: none;
                }
            `, sheet.cssRules.length);
            sheet.insertRule(`
                .argon-ui-list-item {
                    align-items: center;
                    background: white;
                    border-top: 1px solid lightgrey;
                    display: flex;
                    height: 20px;
                    justify-content: space-between;
                    padding: 20px;
                    width: 100%;
                    cursor: pointer;
                    font-family: 'Sans-serif';
                    font-size: 12px;
                    color: #5F5F5F;
                    box-sizing: border-box;
                }
            `, sheet.cssRules.length);
            sheet.insertRule(`
                .argon-ui-list-item:hover {
                    background: rgb(240,240,240);
                }
            `, sheet.cssRules.length);

            this.element = document.createElement('div');
            this.element.className = 'argon-ui';
            this.element.style.position = 'absolute';
            this.element.style.bottom = '0';
            this.element.style.right = '0';
            this.element.style['userSelect'] = 'none';
            this.element.style.webkitUserSelect = 'none';
            this.element.style.zIndex = '10';
            this.viewportService.rootElement.appendChild(this.element!);
            this.sessionService.manager.closeEvent.addEventListener(()=>{
                this.element!.remove();
            })
            
            const realityViewerOverlayElement = document.createElement('div');
            realityViewerOverlayElement.className = 'argon-overlay';
            realityViewerOverlayElement.style.width = '100%';
            realityViewerOverlayElement.style.height = '100%';
            realityViewerOverlayElement.style.display = 'flex';
            realityViewerOverlayElement.style.alignItems = 'center';
            
            realityViewerOverlayElement.addEventListener('click', (e)=> {
                if (e.target === realityViewerOverlayElement) {
                    realityViewerOverlayElement.remove();
                    e.stopPropagation();
                }
            });

            // realityViewerOverlayElement.addEventListener('touchend', (e)=> {
            //     if (e.target === realityViewerOverlayElement) {
            //         e.preventDefault();
            //         e.stopPropagation();
            //         realityViewerOverlayElement.remove();
            //     }
            // });

            this.realityViewerSelectorElement = document.createElement('div');
            this.realityViewerSelectorElement.classList.add('argon-ui-box');
            this.realityViewerSelectorElement.classList.add('argon-ui-blur');
            this.realityViewerSelectorElement.style.maxWidth = '300px';
            this.realityViewerSelectorElement.style.maxHeight = '70%';
            this.realityViewerSelectorElement.style.width = '70%';
            this.realityViewerSelectorElement.style.margin = 'auto';
            this.realityViewerSelectorElement.style.padding = '20px';
            this.realityViewerSelectorElement.style.boxShadow = 'rgb(102,102,102) 0 5px 20px';
            realityViewerOverlayElement.appendChild(this.realityViewerSelectorElement);
            
            
            const realitySelectorPrompt = document.createElement('h2');
            realitySelectorPrompt.innerText = 'Select a Reality';
            realitySelectorPrompt.style.fontFamily = 'Sans-Serif';
            realitySelectorPrompt.style.color = 'white';
            realitySelectorPrompt.style.marginTop = '0';
            realitySelectorPrompt.style.flex = '0 1 auto';
            this.realityViewerSelectorElement.appendChild(realitySelectorPrompt);

            this.realityViewerListElement = document.createElement('div');
            this.realityViewerListElement.style.flex = '1 1 auto';
            this.realityViewerListElement.style.maxHeight = '250px';
            this.realityViewerListElement.style.overflowY = 'auto';
            this.realityViewerSelectorElement.appendChild(this.realityViewerListElement);


            this.realityServiceProvider.installedEvent.addEventListener(({viewer}) => {
                const uri = viewer.uri;
                const e = document.createElement('div');
                e.innerText = uri;
                viewer.connectEvent.addEventListener((session)=>{
                    e.innerText = session.info.title || uri;
                });
                e.className = 'argon-ui-list-item';
                this.realityViewerItemElements.set(uri, e);
                this.realityViewerListElement.appendChild(e);
                e.addEventListener('click', () => {
                    this.realityService.request(uri);
                    realityViewerOverlayElement.remove();
                });
            });

            this.realityServiceProvider.uninstalledEvent.addEventListener(({viewer}) => {
                const uri = viewer.uri;
                const e = this.realityViewerItemElements.get(uri)!;
                this.realityViewerItemElements.delete(uri);
                e.remove();
            });

            this.menuBackgroundElement = document.createElement('div');
            this.menuBackgroundElement.className = 'argon-ui-blur';
            this.menuBackgroundElement.style.position = 'absolute';
            this.menuBackgroundElement.style.bottom = '-150px';
            this.menuBackgroundElement.style.right = '-150px';
            this.menuBackgroundElement.style.width = '300px';
            this.menuBackgroundElement.style.height = '300px';
            this.menuBackgroundElement.style.transform = 'scale(0.1)'
            this.menuBackgroundElement.style.transition = 'transform 0.3s, opacity 0.3s';
            this.menuBackgroundElement.style.borderRadius = '150px';
            this.menuBackgroundElement.style.zIndex = '-2';
            this.element.appendChild(this.menuBackgroundElement);
            
            const menuButton = document.createElement('div');
            this.element.appendChild(menuButton);
            menuButton.className = 'argon-ui-button';
            menuButton.style.position = 'absolute';
            menuButton.style.bottom = '0';
            menuButton.style.right = '0';
            menuButton.style.transform = 'scale(0.36)';
            menuButton.style.transformOrigin = '110% 110%';
            menuButton.style.borderRadius = '72px';
            menuButton.style.cursor = 'pointer';
            menuButton.style.pointerEvents = 'auto';
            menuButton.style.zIndex = '-1';

            this.openInArgonMenuItem = this._createMenuItem(openIcon, 'Open in Argon', ()=>{
                this.menuOpen = false;
                this.updateMenu();
                utils.openInArgonApp();
            });

            this.hmdMenuItem = this._createMenuItem(vrIcon, 'Toggle HMD', ()=>{
                this.menuOpen = false;
                this.updateMenu();
                if (this.viewServiceProvider.isPresentingHMD) {
                    this.viewServiceProvider.exitPresentHMD();
                } else {
                    if (utils.isIOS) {
                        this.viewportService.requestPresentationMode(PresentationMode.IMMERSIVE).then(()=>{
                            return this.viewServiceProvider.requestPresentHMD();
                        })
                    } else {
                        this.viewServiceProvider.requestPresentHMD();
                    }
                }
            });

            this.realityMenuItem = this._createMenuItem(eyeIcon, 'Select Reality Viewer...', ()=>{
                this.menuOpen = false;
                this.updateMenu();
                realityViewerOverlayElement.style.backgroundColor = 'rgba(0,0,0,0.3)';
                this.element!.appendChild(realityViewerOverlayElement);
            });

            this.maximizeMenuItem = this._createMenuItem(fullscreenIcon, 'Toggle Immersive View', ()=>{
                this.menuOpen = false;
                this.updateMenu();
                if (this.viewportService.presentationMode === PresentationMode.IMMERSIVE) {
                    this.viewportService.requestPresentationMode(PresentationMode.PAGE);
                } else {
                    this.viewportService.requestPresentationMode(PresentationMode.IMMERSIVE);
                }
            });

            this.onSelect(menuButton, this.toggleMenu.bind(this));

            this.updateMenu();

            this.viewportService.changeEvent.addEventListener(()=>{
                this.updateMenu();
            });
        }
    }

    private _createMenuItem(icon:string, hint:string, onSelect?:()=>any) {
        const menuItem = document.createElement('div');
        menuItem.style.position = 'absolute';
        menuItem.style.bottom = '-20px';
        menuItem.style.right = '-20px';
        menuItem.style.textAlign = 'left';
        menuItem.style.width = '40px';
        menuItem.style.height = '40px';
        menuItem.style.fontFamily = 'Arial Black';
        menuItem.style.color = 'black';
        menuItem.style.cursor = 'default';
        menuItem.style.textShadow = '-1px -1px 0px #545454, 1px -1px 0px #545454, -1px 1px 0px #545454, 1px 1px 0px #545454';
        menuItem.style.transition = 'transform 0.3s ease 0.1s, opacity 0.3s ease 0.1s';
        menuItem.style.opacity = '0';
        menuItem.style.pointerEvents = 'none';
        menuItem.style.transformOrigin = '50% 50%';
        menuItem.style.backgroundImage = icon;
        menuItem.style.backgroundSize = '100% 100%'
        menuItem.style.backgroundRepeat = 'no-repeat';
        menuItem.style.zIndex = '2';
        menuItem.style.cursor = 'pointer';
        this.element!.appendChild(menuItem);
        menuItem.title = hint;
        if (onSelect) this.onSelect(menuItem, onSelect);
        menuItem.addEventListener('mouseenter', ()=>{
            menuItem.style.color = '#eeb211'
        })
        menuItem.addEventListener('mouseleave', ()=> {
            menuItem.style.color = 'white'
        })
        return menuItem;
    }

    private onSelect(element:HTMLDivElement, cb:()=>void) {
        element.addEventListener('touchend', (ev)=>{
            ev.preventDefault();
            ev.stopPropagation();
            cb();
        });
        element.addEventListener('click', (ev)=>{
            ev.stopPropagation();
            cb();
        });
    }

    private toggleMenu() {
        if (this.menuOpen) {
            this.menuOpen = false;
        } else {
            this.menuOpen = true;
        }
        this.updateMenu();
    }

    public updateMenu() {
        if (this.viewServiceProvider.isPresentingHMD) {
            this.element!.style.display = 'none';
        } else {
            this.element!.style.display = 'block';
        }

        this.menuItems = [];
        this.menuItems.push(null);
        if (utils.isIOS) this.menuItems.push(this.openInArgonMenuItem);

        const parentElement = this.viewportService.rootElement.parentElement;
        const parentWidth = parentElement ? parentElement.clientWidth : 0;
        const parentHeight = parentElement ? parentElement.clientHeight : 0;

        if (!(window.innerWidth === parentWidth &&                
            window.innerHeight === parentHeight))
            this.menuItems.push(this.maximizeMenuItem);
        if (utils.isIOS || navigator['vrEnabled'])
            this.menuItems.push(this.hmdMenuItem);
        if (this.realityViewerItemElements.size > 0)
            this.menuItems.push(this.realityMenuItem);
        this.menuItems.push(null);

        if (!this.menuOpen) {
            this.menuItems.forEach((e, i)=>{
                if (!e) return;
                e.style.transform = 'scale(0.2)';
                e.style.opacity = '0';
                e.style.pointerEvents = 'none';
            });
            this.menuBackgroundElement.style.transform = 'scale(0.1)'
        } else {
            const length = this.menuItems.length;
            this.menuItems.forEach((e, i)=>{
                if (!e) return;
                const angle = i/(length-1) * (Math.PI / 2 + Math.PI / 8) - Math.PI / 16;
                const d = 100;
                const x = d * Math.cos(angle);
                const y = d * Math.sin(angle);
                e.style.transform = `translateX(${-x}px) translateY(${-y}px) scale(0.8)`;
                e.style.opacity = '1';
                e.style.pointerEvents = 'auto';
            });
            this.menuBackgroundElement.style.transform = 'scale(1)';
        }
    }
}
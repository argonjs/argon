import { ViewService } from './view';
import { SessionService } from './session';
import { RealityService } from './reality';
/**
 * Provides a default UI
 */
export declare class DefaultUIService {
    private sessionService;
    private viewService;
    private realityService;
    private element?;
    private realityViewerSelectorElement;
    private realityViewerListElement;
    private menuBackgroundElement;
    private realityViewerItemElements;
    private menuItems;
    private menuOpen;
    private openInArgonMenuItem;
    private hmdMenuItem;
    private realityMenuItem;
    private maximizeMenuItem;
    constructor(sessionService: SessionService, viewService: ViewService, realityService: RealityService);
    private _createMenuItem(icon, hint, onSelect?);
    private onSelect(element, cb);
    private toggleMenu();
    updateMenu(): void;
}

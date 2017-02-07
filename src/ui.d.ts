import { ViewServiceProvider } from './view';
import { ViewportService } from './viewport';
import { SessionService } from './session';
import { RealityService, RealityServiceProvider } from './reality';
/**
 * Provides a default UI
 */
export declare class DefaultUIService {
    private sessionService;
    private viewportService;
    private realityService;
    private realityServiceProvider;
    private viewServiceProvider;
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
    constructor(sessionService: SessionService, viewportService: ViewportService, realityService: RealityService, realityServiceProvider: RealityServiceProvider, viewServiceProvider: ViewServiceProvider);
    private _createMenuItem(icon, hint, onSelect?);
    private onSelect(element, cb);
    private toggleMenu();
    updateMenu(): void;
}

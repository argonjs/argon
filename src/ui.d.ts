import { DeviceService } from './device';
import { SessionService } from './session';
import { ViewService } from './view';
import { RealityService, RealityServiceProvider } from './reality';
/**
 * Provides a default UI
 */
export declare class DefaultUIService {
    private sessionService;
    private viewService;
    private realityService;
    private realityServiceProvider;
    private deviceService;
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
    constructor(sessionService: SessionService, viewService: ViewService, realityService: RealityService, realityServiceProvider: RealityServiceProvider, deviceService: DeviceService);
    private _createMenuItem(icon, hint, onSelect?);
    private onSelect(element, cb);
    private toggleMenu();
    private _hideMenuItem(e);
    updateMenu(): void;
}

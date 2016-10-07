import { ViewService } from './view';
import { SessionService } from './session';
/**
 * Provides a default UI
 */
export declare class DefaultUIService {
    private element?;
    private background;
    private menuItems;
    private menuOpen;
    constructor(view: ViewService, session: SessionService);
    private addMenuItem(icon?, hint?, onSelect?);
    private onSelect(element, cb);
    private toggleMenu();
}

import { SessionService } from '../session';
import { ContextService } from '../context';
import { LocationService } from '../location';
import { ViewService } from '../view';
import { ViewportService } from '../viewport';
import { RealityViewer } from './base';
export declare class EmptyRealityViewer extends RealityViewer {
    private sessionService;
    private contextService;
    private locationService;
    private viewService;
    private viewportService;
    uri: string;
    type: string;
    constructor(sessionService: SessionService, contextService: ContextService, locationService: LocationService, viewService: ViewService, viewportService: ViewportService, uri: string);
    load(): void;
}

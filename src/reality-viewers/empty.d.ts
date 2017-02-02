import { SessionService } from '../session';
import { ContextService } from '../context';
import { ViewService } from '../view';
import { ViewportService } from '../viewport';
import { RealityViewer } from './base';
export declare class EmptyRealityViewer extends RealityViewer {
    private sessionService;
    private contextService;
    private viewService;
    private viewportService;
    uri: string;
    type: string;
    constructor(sessionService: SessionService, contextService: ContextService, viewService: ViewService, viewportService: ViewportService, uri: string);
    load(): void;
}

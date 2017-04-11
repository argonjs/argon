import { SessionService } from '../session';
import { ContextService } from '../context';
import { DeviceService } from '../device';
import { ViewService } from '../view';
import { RealityViewer } from './base';
export declare class EmptyRealityViewer extends RealityViewer {
    private sessionService;
    private contextService;
    private viewService;
    private deviceService;
    uri: string;
    type: string;
    private _aggregator;
    private _moveFlags;
    constructor(sessionService: SessionService, contextService: ContextService, viewService: ViewService, deviceService: DeviceService, uri: string);
    load(): void;
}

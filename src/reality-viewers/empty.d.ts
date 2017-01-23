import { SessionService } from '../session';
import { DeviceService } from '../device';
import { ViewService } from '../view';
import { RealityViewer } from './base';
export declare class EmptyRealityViewer extends RealityViewer {
    private sessionService;
    private deviceService;
    private viewService;
    uri: string;
    type: string;
    constructor(sessionService: SessionService, deviceService: DeviceService, viewService: ViewService, uri: string);
    destroy(): void;
    private _isPresenting;
    setPresenting(foo: boolean): void;
    load(): void;
}

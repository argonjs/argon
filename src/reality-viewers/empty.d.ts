import { Container } from 'aurelia-dependency-injection';
import { SessionService } from '../session';
import { DeviceService } from '../device';
import { ViewService } from '../view';
import { RealityViewer } from './base';
export declare class EmptyRealityViewer extends RealityViewer {
    private sessionService;
    private viewService;
    private container;
    private deviceService;
    uri: string;
    type: string;
    userTracking: 'none' | '3DOF' | '6DOF';
    private _aggregator;
    private _moveFlags;
    constructor(sessionService: SessionService, viewService: ViewService, container: Container, deviceService: DeviceService, uri: string);
    private _scratchMatrix3;
    private _scratchMatrix4;
    load(): void;
}

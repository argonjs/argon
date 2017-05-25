import { Container } from 'aurelia-dependency-injection';
import { SessionService } from '../session';
import { ViewService } from '../view';
import { RealityViewer } from './base';
export declare class EmptyRealityViewer extends RealityViewer {
    private sessionService;
    private viewService;
    private container;
    uri: string;
    type: string;
    private _aggregator;
    private _moveFlags;
    constructor(sessionService: SessionService, viewService: ViewService, container: Container, uri: string);
    private _scratchMatrix3;
    private _scratchMatrix4;
    load(): void;
}

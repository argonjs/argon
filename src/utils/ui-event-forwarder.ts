import { FeatureDetection } from '../cesium/cesium-imports'
import { ViewportService } from '../viewport'

const cloneTouch = (touch:Touch, boundingRect:ClientRect) => {
    return {
        identifier: touch.identifier,
        clientX: touch.clientX - boundingRect.left,
        clientY: touch.clientY - boundingRect.top,
        screenX: touch.screenX,
        screenY: touch.screenY
    };
}

const cloneTouches = (touches:TouchList, boundingRect:ClientRect) => {
    if (!touches) return undefined;
    const touchList:any = [];
    for (var i = 0; i < touches.length; i++) {
        const touch = touches.item(i)!;
        touchList[i] = cloneTouch(touch, boundingRect);
    }
    return touchList;
}

export default function createEventForwarder(this:void, viewportService:ViewportService, callback:(uievent:UIEvent)=>void) {

    let forwardEvent = false;

    const eventData = {
        event:UIEvent = <any>undefined,
        forwardEvent: () => { forwardEvent = true }
    }

    const uievent = <any>{};
    
    const handleEvent = (e:MouseEvent&WheelEvent&TouchEvent&PointerEvent)=>{
        const target = e.target instanceof HTMLElement ? e.target : undefined;
        const width = target && target.clientWidth;
        const height = target && target.clientHeight;

        // if the target element is the view element or an element of similar size,
        // attempt to forward the event (webvr-polyfill makes the canvas 10px larger
        // in each dimension due to an issue with the iOS safari browser, which is why
        // forward the event for any target that matches the viewport size up to 15px 
        // larger in either dimension)
        if (e.target === viewportService.element ||
            (Math.abs(width - viewportService.element.clientWidth) < 15 &&
            Math.abs(height - viewportService.element.clientHeight) < 15)) {

            const boundingRect = viewportService.element.getBoundingClientRect();

            if (viewportService.uiEvent.numberOfListeners > 0) {
                forwardEvent = false;
                eventData.event = e;
                viewportService.uiEvent.raiseEvent(eventData);
                    // allow the containing element to receive the current event 
                    // for local reality viewers
                if (!forwardEvent) {
                    e.stopImmediatePropagation();
                    return;
                }
            }

            e.preventDefault();

            const touches = cloneTouches(e.touches, boundingRect);
            const changedTouches = cloneTouches(e.changedTouches, boundingRect);
            const targetTouches = cloneTouches(e.targetTouches, boundingRect);

            // Event / UI Event
            uievent.timeStamp = e.timeStamp;
            uievent.type = e.type;
            uievent.bubbles = e.bubbles;
            uievent.cancelable = e.cancelable;
            uievent.which = e.which; 
            uievent.detail = e.detail;

            // Mouse Event
            uievent.altKey = e.altKey;
            uievent.ctrlKey = e.ctrlKey;
            uievent.metaKey = e.metaKey;
            uievent.button = e.button;
            uievent.buttons = e.buttons;
            uievent.clientX = e.clientX - boundingRect.left;
            uievent.clientY = e.clientY - boundingRect.top;
            uievent.screenX = e.screenX;
            uievent.screenY = e.screenY;
            uievent.movementX = e.movementX;
            uievent.movementY = e.movementY;

            // Wheel Event
            uievent.deltaX = e.deltaX;
            uievent.deltaY = e.deltaY;
            uievent.deltaZ = e.deltaZ;
            uievent.deltaMode = e.deltaMode;
            uievent.wheelDelta = e.wheelDelta;
            uievent.wheelDeltaX = e.wheelDeltaX;
            uievent.wheelDeltaY = e.wheelDeltaY;

            // Touch Event
            uievent.touches = touches;
            uievent.changedTouches = changedTouches;
            uievent.targetTouches = targetTouches;
            
            // Pointer Events
            uievent.pointerId = e.pointerId;
            uievent.width = e.width;
            uievent.height = e.height;
            uievent.pressure = e.pressure;
            uievent.tiltX = e.tiltX;
            uievent.tiltY = e.tiltY;
            uievent.isPrimary = e.isPrimary;

            callback(uievent);
        } else {
            e.stopImmediatePropagation();
        }
    };

    const forwardedEvent = [
        'wheel'
        ,'click'
        ,'dblclick'
        ,'contextmenu'
    ];

    if (FeatureDetection.supportsPointerEvents()) {
        forwardedEvent.push(
            'pointerenter'
            ,'pointerleave'
            ,'pointerdown'
            ,'pointermove'
            ,'pointerup'
            ,'pointercancel'
        );
    } else {
        forwardedEvent.push(
            'mouseenter'
            ,'mouseleave'
            ,'mousedown'
            ,'mousemove'
            ,'mouseup'
            ,'touchstart'
            ,'touchend'
            ,'touchmove'
            ,'touchcancel'
        );
    }

    forwardedEvent.forEach((type)=>{
        viewportService.element.addEventListener(type, handleEvent, false);
    });
}
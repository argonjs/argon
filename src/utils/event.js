import CesiumEvent from 'cesium/Source/Core/Event';
/**
 * Provides the ability raise and subscribe to an event.
 */
export class Event {
    constructor() {
        this._event = new CesiumEvent();
    }
    /**
     * Get the number of listeners currently subscribed to the event.
     * @return Number of listeners currently subscribed to the event.
     */
    get numberOfListeners() {
        return this._event.numberOfListeners;
    }
    /**
      * Add an event listener.
      * @param The function to be executed when the event is raised.
      * @return A convenience function which removes this event listener when called
      */
    addEventListener(listener) {
        return this._event.addEventListener(listener);
    }
    /**
     * Remove an event listener.
     * @param The function to be unregistered.
     * @return True if the listener was removed;
     * false if the listener and scope are not registered with the event.
     */
    removeEventListener(listener) {
        return this._event.removeEventListener(listener);
    }
    /**
     * Raises the event by calling each registered listener with all supplied arguments.
     * @param This method takes any number of parameters and passes them through to the listener functions.
     */
    raiseEvent(data) {
        this._event.raiseEvent(data);
    }
}

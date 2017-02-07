import CesiumEvent from 'cesium/Source/Core/Event';

/**
 * A callback for removing the event listener.
 */
export type RemoveCallback = () => void;

/**
 * Provides the ability raise and subscribe to an event.
 */
export class Event<T> {

    private _event = new CesiumEvent();
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
    addEventListener(listener: (data: T) => void): RemoveCallback {
        return this._event.addEventListener(listener);
    }

    /**
     * Remove an event listener.
     * @param The function to be unregistered.
     * @return True if the listener was removed; 
     * false if the listener and scope are not registered with the event.
     */
    removeEventListener(listener: (data: T) => void): boolean {
        return this._event.removeEventListener(listener);
    }

    /**
     * Raises the event by calling each registered listener with all supplied arguments.
     * @param This method takes any number of parameters and passes them through to the listener functions.
     */
    raiseEvent(data: T): void {
        this._event.raiseEvent(data);
    }

}
/**
 * A callback for removing the event listener.
 */
export declare type RemoveCallback = () => void;
/**
 * Provides the ability raise and subscribe to an event.
 */
export declare class Event<T> {
    private _event;
    /**
     * Get the number of listeners currently subscribed to the event.
     * @return Number of listeners currently subscribed to the event.
     */
    readonly numberOfListeners: number;
    /**
      * Add an event listener.
      * @param The function to be executed when the event is raised.
      * @return A convenience function which removes this event listener when called
      */
    addEventListener: (listener: (data: T) => void, scope?: any) => RemoveCallback;
    /**
      * Add an event listener that is removed after the next event is raised.
      * @param The function to be executed when the event is raised.
      * @return A convenience function which removes this event listener when called
      */
    onNext(listener: (data: T) => void, scope?: any): void;
    /**
     * Remove an event listener.
     * @param The function to be unregistered.
     * @return True if the listener was removed;
     * false if the listener and scope are not registered with the event.
     */
    removeEventListener: (listener: (data: T) => void) => boolean;
    /**
     * Raises the event by calling each registered listener with all supplied arguments.
     * @param This method takes any number of parameters and passes them through to the listener functions.
     */
    raiseEvent: (data: T) => void;
    /**
     * Alias for addEventListener;
     */
    on: (listener: (data: T) => void, scope?: any) => RemoveCallback;
    /**
     * Alias for removeEventListener;
     */
    off: (listener: (data: T) => void) => boolean;
}

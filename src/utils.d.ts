/// <reference types="cesium" />
import { SerializedEntityPose } from './common';
import { Entity, JulianDate, PerspectiveFrustum, PerspectiveOffCenterFrustum, Quaternion, Cartesian3, ReferenceFrame, Matrix4 } from './cesium/cesium-imports';
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
    addEventListener(listener: (data: T) => void): RemoveCallback;
    /**
     * Remove an event listener.
     * @param The function to be unregistered.
     * @return True if the listener was removed;
     * false if the listener and scope are not registered with the event.
     */
    removeEventListener(listener: (data: T) => void): boolean;
    /**
     * Raises the event by calling each registered listener with all supplied arguments.
     * @param This method takes any number of parameters and passes them through to the listener functions.
     */
    raiseEvent(data: T): void;
}
/**
* TODO.
*/
export declare class CommandQueue {
    private _queue;
    private _currentCommand;
    private _currentCommandPending;
    private _paused;
    /**
     * An error event.
     */
    errorEvent: Event<Error>;
    /**
     * If errorEvent has 1 listener, outputs the error message to the web console.
     */
    constructor();
    /**
     * Push a command to the command queue.
     * @param command Any command ready to be pushed into the command queue.
     */
    push<TResult>(command: () => TResult, execute?: boolean): Promise<TResult>;
    /**
     * Execute the command queue
     */
    execute(): void;
    /**
     * Puase the command queue (currently executing commands will still complete)
     */
    pause(): void;
    /**
     * Clear commandQueue.
     */
    clear(): void;
    private _executeNextCommand();
}
/**
 * Get array of ancestor reference frames of a Cesium Entity.
 * @param frame A Cesium Entity to get ancestor reference frames.
 * @param frames An array of reference frames of the Cesium Entity.
 */
export declare function getAncestorReferenceFrames(frame: Entity): (Entity | ReferenceFrame)[];
/**
 * Get root reference frame of the Cesium Entity.
 * @param frames An array of reference frames of the Cesium Entity.
 * @return the first frame from ancestor reference frames array.
 */
export declare function getRootReferenceFrame(frame: Entity): Entity | ReferenceFrame;
/**
 * Gets the value of the Position property at the provided time and in the provided reference frame.
 * @param entity The entity to get position.
 * @param time The time for which to retrieve the value.
 * @param referenceFrame The desired referenceFrame of the result.
 * @param result The object to store the value into.
 * @return The modified result parameter.
 */
export declare function getEntityPositionInReferenceFrame(entity: Entity, time: JulianDate, referenceFrame: Entity | ReferenceFrame, result: Cartesian3): Cartesian3 | undefined;
/**
 * Alias of getEntityPositionInReferenceFrame
 */
export declare const getEntityPosition: typeof getEntityPositionInReferenceFrame;
/**
 * Get the value of the Orientation property at the provided time and in the provided reference frame.
 * @param entity The entity to get position.
 * @param time The time for which to retrieve the value.
 * @param referenceFrame The desired referenceFrame of the result.
 * @param result The object to store the value into.
 * @return The modified result parameter.
 */
export declare function getEntityOrientationInReferenceFrame(entity: Entity, time: JulianDate, referenceFrame: ReferenceFrame | Entity, result: Quaternion): Quaternion | undefined;
/**
 * Alias of getEntityOrientationInReferenceFrame
 */
export declare const getEntityOrientation: typeof getEntityOrientationInReferenceFrame;
/**
 * Create a SerializedEntityPose from a source entity.
 * @param entity The entity which the serialized pose represents.
 * @param time The time which to retrieve the pose.
 * @param referenceFrame The reference frame to use for generating the pose.
 *  By default, uses the root reference frame of the entity.
 * @return An EntityPose object with orientation, position and referenceFrame.
 */
export declare function getSerializedEntityPose(entity: Entity, time: JulianDate, referenceFrame?: ReferenceFrame | Entity): SerializedEntityPose | undefined;
/**
 * If urlParser does not have a value, throw error message "resolveURL requires DOM api".
 * If inURL is undefined, throw error message "expected inURL".
 * Otherwise, assign value of inURL to urlParser.href.
 * @param inURL A URL needed to be resolved.
 * @returns A URL ready to be parsed.
 */
export declare function resolveURL(inURL: string): string;
/**
 * Parse URL to an object describing details of the URL with href, protocol,
 * hostname, port, pathname, search, hash, host.
 * @param inURL A URL needed to be parsed.
 * @return An object showing parsed URL with href, protocol,
 * hostname, port, pathname, search, hash, host.
 */
export declare function parseURL(inURL: string): {
    href: string;
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
    host: string;
};
/**
 * A minimal MessageEvent interface.
 */
export declare class MessageEventLike {
    constructor(data: any);
    data: any;
}
/**
 * A minimal MessagePort interface.
 */
export interface MessagePortLike {
    /**
      * A callback for handling incoming messages.
      */
    onmessage?: (ev: MessageEventLike) => any;
    /**
     * Send a message through this message port.
     * @param message The message needed to be posted.
     */
    postMessage(message?: any): void;
    /**
     * Close this message port.
     */
    close?: () => void;
}
/**
 * A MessageChannel pollyfill.
 */
export declare class MessageChannelLike {
    /**
     * The first port.
     */
    port1: MessagePortLike;
    /**
     * The second port.
     */
    port2: MessagePortLike;
    /**
     * Create a MessageChannelLike instance.
     */
    constructor();
}
/**
 * A synchronous MessageChannel.
 */
export declare class SynchronousMessageChannel {
    /**
     * The first port.
     */
    port1: MessagePortLike;
    /**
     * The second port.
     */
    port2: MessagePortLike;
    /**
     * Create a MessageChannelLike instance.
     */
    constructor();
}
/**
 * A factory which creates MessageChannel or MessageChannelLike instances, depending on
 * wheter or not MessageChannel is avaialble in the execution context.
 */
export declare class MessageChannelFactory {
    /**
     * Create a MessageChannel (or MessageChannelLike) instance.
     */
    create(): MessageChannelLike;
    /**
     * Create a SynchronousMessageChannel instance.
     */
    createSynchronous(): SynchronousMessageChannel;
}
export declare function decomposePerspectiveOffCenterProjectionMatrix(mat: Matrix4, result: PerspectiveOffCenterFrustum): PerspectiveOffCenterFrustum;
export declare function decomposePerspectiveProjectionMatrix(mat: Matrix4, result: PerspectiveFrustum): PerspectiveFrustum;
/**
 * Convert an Entity's position and orientation properties to a new reference frame.
 * The properties must be constant properties.
 * @param entity The entity to convert.
 * @param time The time which to retrieve the pose up the reference chain.
 * @param referenceFrame The reference frame to convert the position and oriention to.
 * @return a boolean indicating success or failure.  Will be false if either property is
 * not constant, or if either property cannot be converted to the new frame.
 */
export declare function convertEntityReferenceFrame(entity: Entity, time: JulianDate, frame: ReferenceFrame | Entity): boolean;

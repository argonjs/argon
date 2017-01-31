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
    postMessage(message: any): void;
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


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
export class MessageChannelLike {

    /**
     * The first port.
     */
    public port1: MessagePortLike;

    /**
     * The second port.
     */
    public port2: MessagePortLike;

    /**
     * Create a MessageChannelLike instance. 
     */
    constructor() {
        const messageChannel = this;
        let _portsOpen = true;

        let _port1ready: Promise<{}>;
        let _port2ready: Promise<{}>;

        let _port1onmessage: (messageEvent: MessageEventLike) => void;
        _port1ready = new Promise((resolve) => {
            messageChannel.port1 = {
                set onmessage(func) {
                    _port1onmessage = func;
                    resolve();
                },
                get onmessage() {
                    return _port1onmessage;
                },
                postMessage(data: any) {
                    if (_portsOpen) {
                        _port2ready.then(() => {
                            if (messageChannel.port2.onmessage)
                                messageChannel.port2.onmessage({ data });
                        })
                    }
                },
                close() {
                    _portsOpen = false;
                }
            }
        });

        let _port2onmessage: (messageEvent: MessageEventLike) => void;
        _port2ready = new Promise((resolve) => {
            messageChannel.port2 = <MessagePortLike>{
                set onmessage(func) {
                    _port2onmessage = func;
                    resolve();
                },
                get onmessage() {
                    return _port2onmessage;
                },
                postMessage(data: any) {
                    if (_portsOpen) {
                        _port1ready.then(() => {
                            if (messageChannel.port1.onmessage)
                                messageChannel.port1.onmessage({ data });
                        })
                    }
                },
                close() {
                    _portsOpen = false;
                }
            }
        });

    }
}


/**
 * A synchronous MessageChannel. 
 */
export class SynchronousMessageChannel {

    /**
     * The first port.
     */
    public port1: MessagePortLike;

    /**
     * The second port.
     */
    public port2: MessagePortLike;

    /**
     * Create a MessageChannelLike instance. 
     */
    constructor() {
        const messageChannel = this;

        let pendingMessages1: any[] = []
        let onmessage1 = function(message) {
            pendingMessages1.push(message);
        }
        messageChannel.port1 = {
            get onmessage() { return onmessage1 },
            set onmessage(func) {
                onmessage1 = func;
                pendingMessages1.forEach((data) => func(data))
                pendingMessages1 = [];
            },
            postMessage(data: any) {
                if (messageChannel.port2.onmessage)
                    messageChannel.port2.onmessage({ data });
            },
            close() {
                messageChannel.port1.onmessage = undefined;
                messageChannel.port2.onmessage = undefined;
            }
        }

        let pendingMessages2: any[] = []
        let onmessage2 = function(message) {
            pendingMessages2.push(message);
        }
        messageChannel.port2 = <MessagePortLike>{
            get onmessage() { return onmessage2 },
            set onmessage(func) {
                onmessage2 = func;
                pendingMessages2.forEach((data) => func(data))
                pendingMessages2 = [];
            },
            postMessage(data: any) {
                if (messageChannel.port1.onmessage)
                    messageChannel.port1.onmessage({ data });
            },
            close() {
                messageChannel.port1.onmessage = undefined;
                messageChannel.port2.onmessage = undefined;
            }
        }
    }
}

/**
 * A factory which creates MessageChannel or MessageChannelLike instances, depending on
 * wheter or not MessageChannel is avaialble in the execution context. 
 */
export class MessageChannelFactory {

    /**
     * Create a MessageChannel (or MessageChannelLike) instance.
     */
    public create(): MessageChannelLike {
        if (typeof MessageChannel !== 'undefined') return new MessageChannel()
        else return new MessageChannelLike();
    }

    /**
     * Create a SynchronousMessageChannel instance.
     */
    public createSynchronous(): SynchronousMessageChannel {
        return new SynchronousMessageChannel()
    }
}
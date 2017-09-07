
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

        let pendingMessagesToPort2: any[] = []
        let onmessage1 = undefined;

        const port1Event:{data:any} = {data:null};
        let port1Closed = false;

        var tryPendingMessagesToPort2 = () => {
            for (var i=0; i < pendingMessagesToPort2.length; i++) {
                messageChannel.port2.onmessage!(pendingMessagesToPort2[i]);
            }
            pendingMessagesToPort2.length = 0;
        }

        var tryPendingMessagesToPort1 = () => {
            for (var i=0; i < pendingMessagesToPort1.length; i++) {
                messageChannel.port1.onmessage!(pendingMessagesToPort1[i]);
            }
            pendingMessagesToPort1.length = 0;
        }

        messageChannel.port1 = {
            get onmessage() { return onmessage1 },
            set onmessage(func) {
                onmessage1 = func;
                tryPendingMessagesToPort1();
            },
            postMessage(data: any) {
                if (messageChannel.port2.onmessage) {
                    port1Event.data = data;                    
                    // port1Event.data = typeof data === 'string' ? data : JSON.stringify(data);
                    // console.log(JSON.stringify(port1Event.data));
                    messageChannel.port2.onmessage(port1Event);
                } else if (!port1Closed) {
                    pendingMessagesToPort2.push({data:data});
                }
            },
            close() {
                port1Closed = true;
                messageChannel.port1.onmessage = undefined;
            }
        }

        let pendingMessagesToPort1: any[] = []
        let onmessage2 = undefined;
        
        const port2Event:{data:any} = {data:null};
        let port2Closed = false;

        messageChannel.port2 = <MessagePortLike>{
            get onmessage() { return onmessage2 },
            set onmessage(func) {
                onmessage2 = func;
                tryPendingMessagesToPort2();
            },
            postMessage(data: any) {
                if (messageChannel.port1.onmessage) {
                    // port2Event.data = typeof data === 'string' ? data : JSON.stringify(data);
                    port2Event.data = data;
                    // console.log(JSON.stringify(data));
                    messageChannel.port1.onmessage(port2Event);
                } else if (!port2Closed) {
                    pendingMessagesToPort1.push({data:data});
                }
            },
            close() {
                port2Closed = true;
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
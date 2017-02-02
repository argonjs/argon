/**
 * A MessageChannel pollyfill.
 */
export class MessageChannelLike {
    /**
     * Create a MessageChannelLike instance.
     */
    constructor() {
        const messageChannel = this;
        let _portsOpen = true;
        let _port1ready;
        let _port2ready;
        let _port1onmessage;
        _port1ready = new Promise((resolve) => {
            messageChannel.port1 = {
                set onmessage(func) {
                    _port1onmessage = func;
                    resolve();
                },
                get onmessage() {
                    return _port1onmessage;
                },
                postMessage(data) {
                    if (_portsOpen) {
                        _port2ready.then(() => {
                            if (messageChannel.port2.onmessage)
                                messageChannel.port2.onmessage({ data });
                        });
                    }
                },
                close() {
                    _portsOpen = false;
                }
            };
        });
        let _port2onmessage;
        _port2ready = new Promise((resolve) => {
            messageChannel.port2 = {
                set onmessage(func) {
                    _port2onmessage = func;
                    resolve();
                },
                get onmessage() {
                    return _port2onmessage;
                },
                postMessage(data) {
                    if (_portsOpen) {
                        _port1ready.then(() => {
                            if (messageChannel.port1.onmessage)
                                messageChannel.port1.onmessage({ data });
                        });
                    }
                },
                close() {
                    _portsOpen = false;
                }
            };
        });
    }
}
/**
 * A synchronous MessageChannel.
 */
export class SynchronousMessageChannel {
    /**
     * Create a MessageChannelLike instance.
     */
    constructor() {
        const messageChannel = this;
        let pendingMessages1 = [];
        let onmessage1 = function (message) {
            pendingMessages1.push(message);
        };
        messageChannel.port1 = {
            get onmessage() { return onmessage1; },
            set onmessage(func) {
                onmessage1 = func;
                pendingMessages1.forEach((data) => func(data));
                pendingMessages1 = [];
            },
            postMessage(data) {
                if (messageChannel.port2.onmessage)
                    messageChannel.port2.onmessage({ data });
            },
            close() {
                messageChannel.port1.onmessage = undefined;
                messageChannel.port2.onmessage = undefined;
            }
        };
        let pendingMessages2 = [];
        let onmessage2 = function (message) {
            pendingMessages2.push(message);
        };
        messageChannel.port2 = {
            get onmessage() { return onmessage2; },
            set onmessage(func) {
                onmessage2 = func;
                pendingMessages2.forEach((data) => func(data));
                pendingMessages2 = [];
            },
            postMessage(data) {
                if (messageChannel.port1.onmessage)
                    messageChannel.port1.onmessage({ data });
            },
            close() {
                messageChannel.port1.onmessage = undefined;
                messageChannel.port2.onmessage = undefined;
            }
        };
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
    create() {
        if (typeof MessageChannel !== 'undefined')
            return new MessageChannel();
        else
            return new MessageChannelLike();
    }
    /**
     * Create a SynchronousMessageChannel instance.
     */
    createSynchronous() {
        return new SynchronousMessageChannel();
    }
}

System.register(['Cesium/Source/Core/Event', './cesium/cesium-imports'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Event_1, cesium_imports_1;
    var Event, CommandQueue, scratchCartesianPositionFIXED, scratchMatrix4, scratchMatrix3, urlParser, MessageChannelLike, MessageChannelFactory;
    /**
     * Create an EntityPose of the Cesium Entity based on Cesium Julian Date.
     * @param entity The entity to get position.
     * @param time The time for which to retrieve the value.
     * @return An EntityPose object with orientation, position and referenceFrame.
     */
    function calculatePose(entity, time) {
        var entityPosition = entity.position;
        var referenceFrame = entityPosition.referenceFrame;
        var referenceFrameID = typeof referenceFrame === 'number' ? referenceFrame : referenceFrame.id;
        return {
            referenceFrame: referenceFrameID,
            position: entity.position.getValueInReferenceFrame(time, referenceFrame, {}),
            orientation: entity.orientation.getValue(time, {})
        };
    }
    exports_1("calculatePose", calculatePose);
    /**
     * Get array of ancestor reference frames of a Cesium Entity.
     * @param frame A Cesium Entity to get ancestor reference frames.
     * @param frames An array of reference frames of the Cesium Entity.
     */
    function getAncestorReferenceFrames(frame) {
        var frames = [];
        while (frame !== undefined && frame !== null) {
            frames.unshift(frame);
            frame = frame.position && frame.position.referenceFrame;
        }
        return frames;
    }
    exports_1("getAncestorReferenceFrames", getAncestorReferenceFrames);
    /**
     * Get root reference frame of the Cesium Entity.
     * @param frames An array of reference frames of the Cesium Entity.
     * @return the first frame from ancestor reference frames array.
     */
    function getRootReferenceFrame(frame) {
        return getAncestorReferenceFrames(frame)[0];
    }
    exports_1("getRootReferenceFrame", getRootReferenceFrame);
    /**
     * Gets the value of the Position property at the provided time and in the provided reference frame.
     * @param entity The entity to get position.
     * @param time The time for which to retrieve the value.
     * @param referenceFrame The desired referenceFrame of the result.
     * @param result The object to store the value into.
     * @return The modified result parameter.
     */
    function getEntityPositionInReferenceFrame(entity, time, referenceFrame, result) {
        return entity.position && entity.position.getValueInReferenceFrame(time, referenceFrame, result);
    }
    exports_1("getEntityPositionInReferenceFrame", getEntityPositionInReferenceFrame);
    /**
     * Get the value of the Orientation property at the provided time and in the provided reference frame.
     * @param entity The entity to get position.
     * @param time The time for which to retrieve the value.
     * @param referenceFrame The desired referenceFrame of the result.
     * @param result The object to store the value into.
     * @return The modified result parameter.
     */
    function getEntityOrientationInReferenceFrame(entity, time, referenceFrame, result) {
        var entityFrame = entity.position && entity.position.referenceFrame;
        if (entityFrame === undefined)
            return undefined;
        var orientation = entity.orientation && entity.orientation.getValue(time, result);
        if (!orientation) {
            // if not orientation is available, calculate an orientation based on position
            var entityPositionFIXED = getEntityPositionInReferenceFrame(entity, time, cesium_imports_1.ReferenceFrame.FIXED, scratchCartesianPositionFIXED);
            if (!entityPositionFIXED)
                return cesium_imports_1.Quaternion.clone(cesium_imports_1.Quaternion.IDENTITY, result);
            if (cesium_imports_1.Cartesian3.ZERO.equals(entityPositionFIXED))
                throw new Error('invalid cartographic position');
            var transform = cesium_imports_1.Transforms.eastNorthUpToFixedFrame(entityPositionFIXED, cesium_imports_1.Ellipsoid.WGS84, scratchMatrix4);
            var rotation = cesium_imports_1.Matrix4.getRotation(transform, scratchMatrix3);
            var fixedOrientation = cesium_imports_1.Quaternion.fromRotationMatrix(rotation, result);
            return cesium_imports_1.OrientationProperty.convertToReferenceFrame(time, fixedOrientation, cesium_imports_1.ReferenceFrame.FIXED, referenceFrame, result);
        }
        return cesium_imports_1.OrientationProperty.convertToReferenceFrame(time, orientation, entityFrame, referenceFrame, result);
    }
    exports_1("getEntityOrientationInReferenceFrame", getEntityOrientationInReferenceFrame);
    /**
     * If urlParser does not have a value, throw error message "resolveURL requires DOM api".
     * If inURL is undefined, throw error message "expected inURL".
     * Otherwise, assign value of inURL to urlParser.href.
     * @param inURL A URL needed to be resolved.
     * @returns A URL ready to be parsed.
     */
    function resolveURL(inURL) {
        if (!urlParser)
            throw new Error("resolveURL requires DOM api");
        if (inURL === undefined)
            throw new Error('Expected inURL');
        urlParser.href = null;
        urlParser.href = inURL;
        return urlParser.href;
    }
    exports_1("resolveURL", resolveURL);
    /**
     * Parse URL to an object describing details of the URL with href, protocol,
     * hostname, port, pathname, search, hash, host.
     * @param inURL A URL needed to be parsed.
     * @return An object showing parsed URL with href, protocol,
     * hostname, port, pathname, search, hash, host.
     */
    function parseURL(inURL) {
        if (!urlParser)
            throw new Error("parseURL requires DOM api");
        if (inURL === undefined)
            throw new Error('Expected inURL');
        urlParser.href = null;
        urlParser.href = inURL;
        return {
            href: urlParser.href,
            protocol: urlParser.protocol,
            hostname: urlParser.hostname,
            port: urlParser.port,
            pathname: urlParser.pathname,
            search: urlParser.search,
            hash: urlParser.hash,
            host: urlParser.host
        };
    }
    exports_1("parseURL", parseURL);
    return {
        setters:[
            function (Event_1_1) {
                Event_1 = Event_1_1;
            },
            function (cesium_imports_1_1) {
                cesium_imports_1 = cesium_imports_1_1;
            }],
        execute: function() {
            /**
             * Provides the ability raise and subscribe to an event.
             */
            Event = (function () {
                function Event() {
                    this._event = new Event_1.default();
                }
                Object.defineProperty(Event.prototype, "numberOfListeners", {
                    /**
                     * Get the number of listeners currently subscribed to the event.
                     * @return Number of listeners currently subscribed to the event.
                     */
                    get: function () {
                        return this._event.numberOfListeners;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                  * Add an event listener.
                  * @param The function to be executed when the event is raised.
                  * @return A convenience function which removes this event listener when called
                  */
                Event.prototype.addEventListener = function (listener) {
                    return this._event.addEventListener(listener);
                };
                /**
                 * Remove an event listener.
                 * @param The function to be unregistered.
                 * @return True if the listener was removed;
                 * false if the listener and scope are not registered with the event.
                 */
                Event.prototype.removeEventListener = function (listener) {
                    return this._event.removeEventListener(listener);
                };
                /**
                 * Raises the event by calling each registered listener with all supplied arguments.
                 * @param This method takes any number of parameters and passes them through to the listener functions.
                 */
                Event.prototype.raiseEvent = function (data) {
                    this._event.raiseEvent(data);
                };
                return Event;
            }());
            exports_1("Event", Event);
            /**
            * TODO.
            */
            CommandQueue = (function () {
                /**
                 * If errorEvent has 1 listener, outputs the error message to the web console.
                 */
                function CommandQueue() {
                    var _this = this;
                    this._queue = [];
                    this._currentCommandPending = null;
                    /**
                     * An error event.
                     */
                    this.errorEvent = new Event();
                    this.errorEvent.addEventListener(function (error) {
                        if (_this.errorEvent.numberOfListeners === 1)
                            console.error(error);
                    });
                }
                /**
                 * Push the command and the data needed to run the command to the command queue.
                 * @param command Any command ready to be pushed into the command queue.
                 * @param userData Any data needed to run the command.
                 */
                CommandQueue.prototype.push = function (command, userData) {
                    this._queue.push({ command: command, userData: userData });
                    if (this._queue.length === 1 && this._currentCommandPending === null) {
                        Promise.resolve().then(this._executeNextCommand.bind(this));
                    }
                };
                /**
                 * Clear commandQueue.
                 */
                CommandQueue.prototype.clear = function () {
                    this._queue = [];
                };
                Object.defineProperty(CommandQueue.prototype, "currentUserData", {
                    /**
                     * Get current user data.
                     * @return Current userData.
                     */
                    get: function () {
                        return this._currentUserData;
                    },
                    enumerable: true,
                    configurable: true
                });
                CommandQueue.prototype._executeNextCommand = function () {
                    var _this = this;
                    var item = this._queue.shift();
                    if (!item) {
                        this._currentUserData = null;
                        this._currentCommandPending = null;
                        return;
                    }
                    var command = item.command, userData = item.userData;
                    this._currentUserData = userData;
                    this._currentCommandPending = new Promise(function (resolve, reject) { return resolve(command()); })
                        .then(this._executeNextCommand.bind(this))
                        .catch(function (error) {
                        _this.errorEvent.raiseEvent(error);
                        _this._executeNextCommand();
                    });
                };
                return CommandQueue;
            }());
            exports_1("CommandQueue", CommandQueue);
            scratchCartesianPositionFIXED = new cesium_imports_1.Cartesian3;
            scratchMatrix4 = new cesium_imports_1.Matrix4;
            scratchMatrix3 = new cesium_imports_1.Matrix3;
            urlParser = typeof document !== 'undefined' ? document.createElement("a") : undefined;
            /**
             * A MessageChannel pollyfill.
             */
            MessageChannelLike = (function () {
                /**
                 * Create a MessageChannelLike instance.
                 */
                function MessageChannelLike() {
                    var messageChannel = this;
                    var _portsOpen = true;
                    var _port1ready;
                    var _port2ready;
                    var _port1onmessage;
                    _port1ready = new Promise(function (resolve, reject) {
                        messageChannel.port1 = {
                            set onmessage(func) {
                                _port1onmessage = func;
                                resolve();
                            },
                            get onmessage() {
                                return _port1onmessage;
                            },
                            postMessage: function (data) {
                                _port2ready.then(function () {
                                    if (_portsOpen)
                                        messageChannel.port2.onmessage({ data: data });
                                });
                            },
                            close: function () {
                                _portsOpen = false;
                            }
                        };
                    });
                    var _port2onmessage;
                    _port2ready = new Promise(function (resolve, reject) {
                        messageChannel.port2 = {
                            set onmessage(func) {
                                _port2onmessage = func;
                                resolve();
                            },
                            get onmessage() {
                                return _port2onmessage;
                            },
                            postMessage: function (data) {
                                _port1ready.then(function () {
                                    if (_portsOpen)
                                        messageChannel.port1.onmessage({ data: data });
                                });
                            },
                            close: function () {
                                _portsOpen = false;
                            }
                        };
                    });
                }
                return MessageChannelLike;
            }());
            exports_1("MessageChannelLike", MessageChannelLike);
            /**
             * A factory which creates MessageChannel or MessageChannelLike instances, depending on
             * wheter or not MessageChannel is avaialble in the execution context.
             */
            MessageChannelFactory = (function () {
                function MessageChannelFactory() {
                }
                /**
                 * Create a MessageChannel (or MessageChannelLike) instance.
                 */
                MessageChannelFactory.prototype.create = function () {
                    if (typeof MessageChannel !== 'undefined')
                        return new MessageChannel();
                    else
                        return new MessageChannelLike();
                };
                return MessageChannelFactory;
            }());
            exports_1("MessageChannelFactory", MessageChannelFactory);
        }
    }
});

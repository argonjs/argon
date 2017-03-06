System.register(["cesium/Source/Core/Event", "./cesium/cesium-imports"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Get array of ancestor reference frames of a Cesium Entity.
     * @param frame A Cesium Entity to get ancestor reference frames.
     * @param frames An array of reference frames of the Cesium Entity.
     */
    function getAncestorReferenceFrames(frame) {
        var frames = [];
        var f = frame;
        while (cesium_imports_1.defined(f)) {
            frames.unshift(f);
            var position = f.position;
            f = position && position.referenceFrame;
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
        if (!cesium_imports_1.defined(entityFrame))
            return undefined;
        var orientation = entity.orientation && entity.orientation.getValue(time, result);
        if (!cesium_imports_1.defined(orientation))
            return undefined;
        return cesium_imports_1.OrientationProperty.convertToReferenceFrame(time, orientation, entityFrame, referenceFrame, result);
    }
    exports_1("getEntityOrientationInReferenceFrame", getEntityOrientationInReferenceFrame);
    // const scratchCartesianPositionFIXED = new Cartesian3
    // const scratchMatrix4 = new Matrix4
    // const scratchMatrix3 = new Matrix3
    //  {
    //         // if no orientation is available, calculate an orientation based on position
    //         const entityPositionFIXED = getEntityPositionInReferenceFrame(entity, time, ReferenceFrame.FIXED, scratchCartesianPositionFIXED)
    //         if (!entityPositionFIXED) return Quaternion.clone(Quaternion.IDENTITY, result)
    //         if (Cartesian3.ZERO.equals(entityPositionFIXED)) throw new Error('invalid cartographic position')
    //         const transform = Transforms.eastNorthUpToFixedFrame(entityPositionFIXED, Ellipsoid.WGS84, scratchMatrix4);
    //         const rotation = Matrix4.getRotation(transform, scratchMatrix3);
    //         const fixedOrientation = Quaternion.fromRotationMatrix(rotation, result);
    //         return OrientationProperty.convertToReferenceFrame(time, fixedOrientation, ReferenceFrame.FIXED, referenceFrame, result)
    //     }
    /**
     * Create a SerializedEntityPose from a source entity.
     * @param entity The entity which the serialized pose represents.
     * @param time The time which to retrieve the pose.
     * @param referenceFrame The reference frame to use for generating the pose.
     *  By default, uses the root reference frame of the entity.
     * @return An EntityPose object with orientation, position and referenceFrame.
     */
    function getSerializedEntityPose(entity, time, referenceFrame) {
        var frame = referenceFrame ? referenceFrame : getRootReferenceFrame(entity);
        var p = getEntityPositionInReferenceFrame(entity, time, frame, {});
        if (!p)
            return undefined;
        var o = getEntityOrientationInReferenceFrame(entity, time, frame, {});
        if (!o)
            return undefined;
        return {
            p: cesium_imports_1.Cartesian3.ZERO.equalsEpsilon(p, cesium_imports_1.CesiumMath.EPSILON16) ? 0 : p,
            o: cesium_imports_1.Quaternion.IDENTITY.equalsEpsilon(o, cesium_imports_1.CesiumMath.EPSILON16) ? 0 : o,
            r: typeof frame === 'number' ? frame : frame.id
        };
    }
    exports_1("getSerializedEntityPose", getSerializedEntityPose);
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
        urlParser.href = '';
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
        urlParser.href = '';
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
    function decomposePerspectiveOffCenterProjectionMatrix(mat, result) {
        var m11 = mat[cesium_imports_1.Matrix4.COLUMN0ROW0];
        // const m12 = mat[Matrix4.COLUMN0ROW1];
        var m22 = mat[cesium_imports_1.Matrix4.COLUMN1ROW1];
        var m31 = mat[cesium_imports_1.Matrix4.COLUMN2ROW0];
        var m32 = mat[cesium_imports_1.Matrix4.COLUMN2ROW1];
        var m33 = mat[cesium_imports_1.Matrix4.COLUMN2ROW2];
        var m43 = mat[cesium_imports_1.Matrix4.COLUMN3ROW2];
        var near = result.near = m43 / (m33 - 1);
        result.far = m43 / (m33 + 1);
        result.bottom = near * (m32 - 1) / m22;
        result.top = near * (m32 + 1) / m22;
        result.left = near * (m31 - 1) / m11;
        result.right = near * (m31 + 1) / m11;
        return result;
    }
    exports_1("decomposePerspectiveOffCenterProjectionMatrix", decomposePerspectiveOffCenterProjectionMatrix);
    function decomposePerspectiveProjectionMatrix(mat, result) {
        var f = decomposePerspectiveOffCenterProjectionMatrix(mat, scratchPerspectiveOffCenterFrustum);
        var xOffset = (f.left + f.right) / 2;
        var yOffset = (f.top + f.bottom) / 2;
        var near = f.near;
        var far = f.far;
        // const left = f.left - xOffset;
        var right = f.right - xOffset;
        var top = f.top - yOffset;
        // const bottom = f.bottom - yOffset;
        var aspectRatio = right / top;
        var fovy = 2 * Math.atan(top / near);
        var fov;
        if (aspectRatio < 1) {
            fov = fovy;
        }
        else {
            fov = Math.atan(Math.tan(fovy * 0.5) * aspectRatio) * 2.0;
        }
        result.near = near;
        result.far = far;
        result.fov = fov;
        result.aspectRatio = aspectRatio;
        result.xOffset = xOffset;
        result.yOffset = yOffset;
        return result;
    }
    exports_1("decomposePerspectiveProjectionMatrix", decomposePerspectiveProjectionMatrix);
    /**
     * Convert an Entity's position and orientation properties to a new reference frame.
     * The properties must be constant properties.
     * @param entity The entity to convert.
     * @param time The time which to retrieve the pose up the reference chain.
     * @param referenceFrame The reference frame to convert the position and oriention to.
     * @return a boolean indicating success or failure.  Will be false if either property is
     * not constant, or if either property cannot be converted to the new frame.
     */
    function convertEntityReferenceFrame(entity, time, frame) {
        if (!entity.position || !(entity.position instanceof cesium_imports_1.ConstantPositionProperty) ||
            !entity.orientation || !(entity.orientation instanceof cesium_imports_1.ConstantProperty)) {
            return false;
        }
        if (!getEntityPositionInReferenceFrame(entity, time, frame, scratchCartesian)) {
            return false;
        }
        if (!getEntityOrientationInReferenceFrame(entity, time, frame, scratchOrientation)) {
            return false;
        }
        entity.position.setValue(scratchCartesian, frame);
        entity.orientation.setValue(scratchOrientation);
        return true;
    }
    exports_1("convertEntityReferenceFrame", convertEntityReferenceFrame);
    var Event_1, cesium_imports_1, Event, CommandQueue, getEntityPosition, getEntityOrientation, urlParser, MessageChannelLike, SynchronousMessageChannel, MessageChannelFactory, scratchPerspectiveOffCenterFrustum, scratchCartesian, scratchOrientation;
    return {
        setters: [
            function (Event_1_1) {
                Event_1 = Event_1_1;
            },
            function (cesium_imports_1_1) {
                cesium_imports_1 = cesium_imports_1_1;
            }
        ],
        execute: function () {
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
                    this._paused = true;
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
                 * Push a command to the command queue.
                 * @param command Any command ready to be pushed into the command queue.
                 */
                CommandQueue.prototype.push = function (command, execute) {
                    var _this = this;
                    var result = new Promise(function (resolve, reject) {
                        _this._queue.push({
                            command: command,
                            reject: reject,
                            execute: function () {
                                // console.log('CommandQueue: Executing command ' + command.toString());
                                var result = Promise.resolve().then(command);
                                // result.then(() => { console.log('CommandQueue: DONE ' + command.toString()) });
                                resolve(result);
                                return result;
                            }
                        });
                    });
                    if (execute)
                        this.execute();
                    return result;
                };
                /**
                 * Execute the command queue
                 */
                CommandQueue.prototype.execute = function () {
                    var _this = this;
                    this._paused = false;
                    Promise.resolve().then(function () {
                        if (_this._queue.length > 0 && !_this._currentCommandPending) {
                            _this._executeNextCommand();
                        }
                    });
                };
                /**
                 * Puase the command queue (currently executing commands will still complete)
                 */
                CommandQueue.prototype.pause = function () {
                    this._paused = true;
                };
                /**
                 * Clear commandQueue.
                 */
                CommandQueue.prototype.clear = function () {
                    this._queue.forEach(function (item) {
                        item.reject("Unable to execute.");
                    });
                    this._queue = [];
                };
                CommandQueue.prototype._executeNextCommand = function () {
                    var _this = this;
                    this._currentCommand = undefined;
                    this._currentCommandPending = undefined;
                    if (this._paused)
                        return;
                    var item = this._queue.shift();
                    if (!item)
                        return;
                    this._currentCommand = item.command;
                    this._currentCommandPending = item.execute()
                        .then(this._executeNextCommand.bind(this))
                        .catch(function (e) {
                        _this.errorEvent.raiseEvent(e);
                        _this._executeNextCommand();
                    });
                };
                return CommandQueue;
            }());
            exports_1("CommandQueue", CommandQueue);
            /**
             * Alias of getEntityPositionInReferenceFrame
             */
            exports_1("getEntityPosition", getEntityPosition = getEntityPositionInReferenceFrame);
            /**
             * Alias of getEntityOrientationInReferenceFrame
             */
            exports_1("getEntityOrientation", getEntityOrientation = getEntityOrientationInReferenceFrame);
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
                    _port1ready = new Promise(function (resolve) {
                        messageChannel.port1 = {
                            set onmessage(func) {
                                _port1onmessage = func;
                                resolve();
                            },
                            get onmessage() {
                                return _port1onmessage;
                            },
                            postMessage: function (data) {
                                if (_portsOpen) {
                                    _port2ready.then(function () {
                                        if (messageChannel.port2.onmessage)
                                            messageChannel.port2.onmessage({ data: data });
                                    });
                                }
                            },
                            close: function () {
                                _portsOpen = false;
                            }
                        };
                    });
                    var _port2onmessage;
                    _port2ready = new Promise(function (resolve) {
                        messageChannel.port2 = {
                            set onmessage(func) {
                                _port2onmessage = func;
                                resolve();
                            },
                            get onmessage() {
                                return _port2onmessage;
                            },
                            postMessage: function (data) {
                                if (_portsOpen) {
                                    _port1ready.then(function () {
                                        if (messageChannel.port1.onmessage)
                                            messageChannel.port1.onmessage({ data: data });
                                    });
                                }
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
             * A synchronous MessageChannel.
             */
            SynchronousMessageChannel = (function () {
                /**
                 * Create a MessageChannelLike instance.
                 */
                function SynchronousMessageChannel() {
                    var messageChannel = this;
                    var pendingMessages1 = [];
                    var onmessage1 = function (message) {
                        pendingMessages1.push(message);
                    };
                    messageChannel.port1 = {
                        get onmessage() { return onmessage1; },
                        set onmessage(func) {
                            onmessage1 = func;
                            pendingMessages1.forEach(function (data) { return func(data); });
                            pendingMessages1 = [];
                        },
                        postMessage: function (data) {
                            if (messageChannel.port2.onmessage)
                                messageChannel.port2.onmessage({ data: data });
                        },
                        close: function () {
                            messageChannel.port1.onmessage = undefined;
                            messageChannel.port2.onmessage = undefined;
                        }
                    };
                    var pendingMessages2 = [];
                    var onmessage2 = function (message) {
                        pendingMessages2.push(message);
                    };
                    messageChannel.port2 = {
                        get onmessage() { return onmessage2; },
                        set onmessage(func) {
                            onmessage2 = func;
                            pendingMessages2.forEach(function (data) { return func(data); });
                            pendingMessages2 = [];
                        },
                        postMessage: function (data) {
                            if (messageChannel.port1.onmessage)
                                messageChannel.port1.onmessage({ data: data });
                        },
                        close: function () {
                            messageChannel.port1.onmessage = undefined;
                            messageChannel.port2.onmessage = undefined;
                        }
                    };
                }
                return SynchronousMessageChannel;
            }());
            exports_1("SynchronousMessageChannel", SynchronousMessageChannel);
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
                /**
                 * Create a SynchronousMessageChannel instance.
                 */
                MessageChannelFactory.prototype.createSynchronous = function () {
                    return new SynchronousMessageChannel();
                };
                return MessageChannelFactory;
            }());
            exports_1("MessageChannelFactory", MessageChannelFactory);
            scratchPerspectiveOffCenterFrustum = new cesium_imports_1.PerspectiveOffCenterFrustum;
            scratchCartesian = new cesium_imports_1.Cartesian3;
            scratchOrientation = new cesium_imports_1.Quaternion;
        }
    };
});

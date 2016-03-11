System.register(['Cesium/Source/Core/Event', './cesium/cesium-imports.ts'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Event_1, cesium_imports_ts_1;
    var Event, CommandQueue, scratchCartesianPositionFIXED, scratchMatrix4, scratchMatrix3, urlParser;
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
    function getAncestorReferenceFrames(frame) {
        var frames = [];
        while (frame !== undefined && frame !== null) {
            frames.unshift(frame);
            frame = frame.position && frame.position.referenceFrame;
        }
        return frames;
    }
    exports_1("getAncestorReferenceFrames", getAncestorReferenceFrames);
    function getRootReferenceFrame(frame) {
        return getAncestorReferenceFrames(frame)[0];
    }
    exports_1("getRootReferenceFrame", getRootReferenceFrame);
    function getEntityPositionInReferenceFrame(entity, time, referenceFrame, result) {
        return entity.position && entity.position.getValueInReferenceFrame(time, referenceFrame, result);
    }
    exports_1("getEntityPositionInReferenceFrame", getEntityPositionInReferenceFrame);
    function getEntityOrientationInReferenceFrame(entity, time, referenceFrame, result) {
        var entityFrame = entity.position && entity.position.referenceFrame;
        if (entityFrame === undefined)
            return undefined;
        var orientation = entity.orientation && entity.orientation.getValue(time, result);
        if (!orientation) {
            // if not orientation is available, calculate an orientation based on position
            var entityPositionFIXED = getEntityPositionInReferenceFrame(entity, time, cesium_imports_ts_1.ReferenceFrame.FIXED, scratchCartesianPositionFIXED);
            if (!entityPositionFIXED)
                return cesium_imports_ts_1.Quaternion.clone(cesium_imports_ts_1.Quaternion.IDENTITY, result);
            if (cesium_imports_ts_1.Cartesian3.ZERO.equals(entityPositionFIXED))
                throw new Error('invalid cartographic position');
            var transform = cesium_imports_ts_1.Transforms.eastNorthUpToFixedFrame(entityPositionFIXED, cesium_imports_ts_1.Ellipsoid.WGS84, scratchMatrix4);
            var rotation = cesium_imports_ts_1.Matrix4.getRotation(transform, scratchMatrix3);
            var fixedOrientation = cesium_imports_ts_1.Quaternion.fromRotationMatrix(rotation, result);
            return cesium_imports_ts_1.OrientationProperty.convertToReferenceFrame(time, fixedOrientation, cesium_imports_ts_1.ReferenceFrame.FIXED, referenceFrame, result);
        }
        return cesium_imports_ts_1.OrientationProperty.convertToReferenceFrame(time, orientation, entityFrame, referenceFrame, result);
    }
    exports_1("getEntityOrientationInReferenceFrame", getEntityOrientationInReferenceFrame);
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
            function (cesium_imports_ts_1_1) {
                cesium_imports_ts_1 = cesium_imports_ts_1_1;
            }],
        execute: function() {
            Event = (function () {
                function Event() {
                    this._event = new Event_1.default();
                }
                Object.defineProperty(Event.prototype, "numberOfListeners", {
                    get: function () {
                        return this._event.numberOfListeners;
                    },
                    enumerable: true,
                    configurable: true
                });
                Event.prototype.addEventListener = function (listener) {
                    return this._event.addEventListener(listener);
                };
                Event.prototype.removeEventListener = function (listener) {
                    return this._event.removeEventListener(listener);
                };
                Event.prototype.raiseEvent = function (data) {
                    this._event.raiseEvent(data);
                };
                return Event;
            }());
            exports_1("Event", Event);
            CommandQueue = (function () {
                function CommandQueue() {
                    var _this = this;
                    this._queue = [];
                    this._currentCommandPending = null;
                    this.errorEvent = new Event();
                    this.errorEvent.addEventListener(function (error) {
                        if (_this.errorEvent.numberOfListeners === 1)
                            console.error(error);
                    });
                }
                CommandQueue.prototype.push = function (command, userData) {
                    this._queue.push({ command: command, userData: userData });
                    if (this._queue.length === 1 && this._currentCommandPending === null) {
                        Promise.resolve().then(this._executeNextCommand.bind(this));
                    }
                };
                CommandQueue.prototype.clear = function () {
                    this._queue = [];
                };
                Object.defineProperty(CommandQueue.prototype, "currentUserData", {
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
            scratchCartesianPositionFIXED = new cesium_imports_ts_1.Cartesian3;
            scratchMatrix4 = new cesium_imports_ts_1.Matrix4;
            scratchMatrix3 = new cesium_imports_ts_1.Matrix3;
            urlParser = typeof document !== 'undefined' ? document.createElement("a") : undefined;
        }
    }
});

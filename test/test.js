/// <reference types="mocha"/>
import * as chai from 'chai';
// To test the source:
import * as Argon from '../src/argon';
// To test the build:
// import * as Argon from '@argonjs/argon'
if (typeof window !== 'undefined')
    window['Argon'] = Argon;
var expect = chai.expect;
if (typeof global !== 'undefined' && typeof performance === 'undefined') {
    global['performance'] = Date;
    global['MessageChannel'] = Argon.MessageChannelLike;
}
afterEach(function () {
    if (Argon.ArgonSystem.instance)
        Argon.ArgonSystem.instance.destroy();
});
describe('Argon', function () {
    describe('#init', function () {
        it('should create an ArgonSystem w/ default options', function () {
            var app = Argon.init();
            expect(app).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(app.context).to.exist;
            expect(app.vuforia).to.exist;
        });
    });
    describe('new ArgonSystem()', function () {
        it('should create an ArgonSystem with Role=Role.MANAGER', function () {
            var manager = Argon.init(null, { role: Argon.Role.REALITY_MANAGER });
            expect(manager).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(manager.session.configuration.role).to.equal(Argon.Role.REALITY_MANAGER);
        });
        it('should create an ArgonSystem with Role=Role.REALITY_AUGMENTER', function () {
            var app = Argon.init(null, { role: Argon.Role.REALITY_AUGMENTER });
            expect(app).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(app.session.configuration.role).to.equal(Argon.Role.REALITY_AUGMENTER);
        });
        it('should create an ArgonSystem with Role=Role.REALITY_VIEW', function () {
            var app = Argon.init(null, { role: Argon.Role.REALITY_VIEWER });
            expect(app).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(app.session.configuration.role).to.equal(Argon.Role.REALITY_VIEWER);
        });
        it('should raise a focus event when Role=Role.MANAGER', function (done) {
            var manager = Argon.init(null, { role: Argon.Role.REALITY_MANAGER });
            expect(manager).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(manager.session.configuration.role).to.equal(Argon.Role.REALITY_MANAGER);
            manager.focusEvent.addEventListener(function () {
                expect(manager.focus.hasFocus).to.be.true;
                done();
            });
        });
    });
    describe('app.context.subscribeGeolocation', function () {
        it('should set suggestedGeolocationSubscription options in DeviceService', function (done) {
            var manager = Argon.init(null, { role: Argon.Role.REALITY_MANAGER });
            manager.device.suggestedGeolocationSubscriptionChangeEvent.addEventListener(function () {
                expect(manager.device.suggestedGeolocationSubscription).to.exist;
                expect(manager.device.suggestedGeolocationSubscription.enableHighAccuracy).to.be.true;
                done();
            });
            expect(manager.device.suggestedGeolocationSubscription).to.not.exist;
            manager.context.subscribeGeolocation({ enableHighAccuracy: true });
        });
    });
    describe('app.context.unsubscribeGeolocation', function () {
        it('should unset suggestedGeolocationSubscription options in DeviceService', function (done) {
            var manager = Argon.init(null, { role: Argon.Role.REALITY_MANAGER });
            var remove = manager.device.suggestedGeolocationSubscriptionChangeEvent.addEventListener(function () {
                expect(manager.device.suggestedGeolocationSubscription).to.exist;
                expect(manager.device.suggestedGeolocationSubscription.enableHighAccuracy).to.be.true;
                remove();
                manager.device.suggestedGeolocationSubscriptionChangeEvent.addEventListener(function () {
                    expect(manager.device.suggestedGeolocationSubscription).to.not.exist;
                    done();
                });
                manager.context.unsubscribeGeolocation();
            });
            expect(manager.device.suggestedGeolocationSubscription).to.not.exist;
            manager.context.subscribeGeolocation({ enableHighAccuracy: true });
        });
    });
    describe('app.device.subscribeGeolocation', function () {
        it('should attempt to start geolocation updates', function (done) {
            var app = new Argon.ArgonContainerManager({ role: Argon.Role.REALITY_MANAGER }).app;
            var device = app.container.get(Argon.Device);
            device.startGeolocationUpdates = function (options) {
                expect(options && options.enableHighAccuracy).to.be.true;
                done();
            };
            app.device.subscribeGeolocation({ enableHighAccuracy: true });
        });
    });
    describe('app.device.unsubscribeGeolocation', function () {
        it('should attempt to stop geolocation updates', function (done) {
            var app = new Argon.ArgonContainerManager({ role: Argon.Role.REALITY_MANAGER }).app;
            var device = app.container.get(Argon.Device);
            device.startGeolocationUpdates = function (options) {
                expect(options && options.enableHighAccuracy).to.be.true;
                device.stopGeolocationUpdates = function () {
                    done();
                    device.stopGeolocationUpdates = function () { };
                };
                app.device.unsubscribeGeolocation();
            };
            app.device.subscribeGeolocation({ enableHighAccuracy: true });
        });
    });
});
describe('EntityService', function () {
    describe('new EntityService()', function () {
        it('should create an EntityService instance', function () {
            var sessionService = new Argon.SessionService({ role: Argon.Role.REALITY_MANAGER }, new Argon.LoopbackConnectService, new Argon.SessionPortFactory, new Argon.MessageChannelFactory);
            var entityService = new Argon.EntityService(sessionService);
            expect(entityService).to.be.instanceOf(Argon.EntityService);
            expect(entityService.collection).to.be.instanceOf(Argon.Cesium.EntityCollection);
        });
    });
    describe('subscribe', function () {
        it('should return resolved promise after success', function () {
            var sessionService = new Argon.SessionService({ role: Argon.Role.REALITY_MANAGER }, new Argon.LoopbackConnectService, new Argon.SessionPortFactory, new Argon.MessageChannelFactory);
            var entityService = new Argon.EntityService(sessionService);
            var permissionServiceProvider = new Argon.PermissionServiceProvider(sessionService);
            new Argon.EntityServiceProvider(sessionService, entityService, permissionServiceProvider);
            sessionService.connect();
            var testId = Argon.Cesium.createGuid();
            return entityService.subscribe(testId);
        });
        it('should emit subscribedEvent after success', function (done) {
            var sessionService = new Argon.SessionService({ role: Argon.Role.REALITY_MANAGER }, new Argon.LoopbackConnectService, new Argon.SessionPortFactory, new Argon.MessageChannelFactory);
            // const permissionService = new Argon.PermissionService(sessionService);
            var permissionServiceProvider = new Argon.PermissionServiceProvider(sessionService);
            var entityService = new Argon.EntityService(sessionService);
            var entityServiceProvider = new Argon.EntityServiceProvider(sessionService, entityService, permissionServiceProvider);
            var testId = Argon.Cesium.createGuid();
            entityService.subscribedEvent.addEventListener(function (_a) {
                var id = _a.id, options = _a.options;
                expect(id).to.equal(testId);
                expect(options && options['hello']).to.equal('world');
                var subscribers = entityServiceProvider.subscribersByEntity.get(testId);
                expect(subscribers).to.exist && expect(subscribers.has(sessionService.manager));
                done();
            });
            sessionService.connect();
            entityService.subscribe(testId, { hello: 'world' });
        });
        it('should emit sessionSubscribedEvent on provider after success', function (done) {
            var sessionService = new Argon.SessionService({ role: Argon.Role.REALITY_MANAGER }, new Argon.LoopbackConnectService, new Argon.SessionPortFactory, new Argon.MessageChannelFactory);
            var permissionServiceProvider = new Argon.PermissionServiceProvider(sessionService);
            var entityService = new Argon.EntityService(sessionService);
            var entityServiceProvider = new Argon.EntityServiceProvider(sessionService, entityService, permissionServiceProvider);
            var testId = Argon.Cesium.createGuid();
            entityServiceProvider.sessionSubscribedEvent.addEventListener(function (_a) {
                var id = _a.id, session = _a.session, options = _a.options;
                expect(id).to.equal(testId);
                expect(session).to.equal(sessionService.manager);
                expect(options).to.exist && expect(options['something']).to.equal('here');
                var subscribers = entityServiceProvider.subscribersByEntity.get(testId);
                expect(subscribers).to.exist && expect(subscribers.has(sessionService.manager));
                var subscriptions = entityServiceProvider.subscriptionsBySubscriber.get(sessionService.manager);
                expect(subscriptions).to.exist && expect(Argon.jsonEquals(subscriptions[id], options));
                done();
            });
            sessionService.connect();
            entityService.subscribe(testId, { something: 'here' });
        });
        it('should return a rejected promise after rejection', function (done) {
            var sessionService = new Argon.SessionService({ role: Argon.Role.REALITY_MANAGER }, new Argon.LoopbackConnectService, new Argon.SessionPortFactory, new Argon.MessageChannelFactory);
            var permissionServiceProvider = new Argon.PermissionServiceProvider(sessionService);
            var entityService = new Argon.EntityService(sessionService);
            new Argon.EntityServiceProvider(sessionService, entityService, permissionServiceProvider);
            var testId = Argon.Cesium.createGuid();
            permissionServiceProvider.handlePermissionRequest = function (session, id) {
                expect(session).to.equal(sessionService.manager);
                expect(id).to.equal(testId);
                return Promise.reject('fail');
            };
            entityService.subscribedEvent.addEventListener(function () {
                done(new Error('unexpected subscribed event'));
            });
            entityService.unsubscribedEvent.addEventListener(function () {
                done(new Error('unexpected unsubscribed event'));
            });
            sessionService.connect();
            entityService.subscribe(testId, { something: 'here' }).catch(function (e) {
                expect(e.message).to.equal('fail');
                done();
            });
        });
    });
    describe('unsubscribe', function () {
        it('should emit unsubscribedEvent', function (done) {
            var sessionService = new Argon.SessionService({ role: Argon.Role.REALITY_MANAGER }, new Argon.LoopbackConnectService, new Argon.SessionPortFactory, new Argon.MessageChannelFactory);
            var permissionServiceProvider = new Argon.PermissionServiceProvider(sessionService);
            var entityService = new Argon.EntityService(sessionService);
            var entityServiceProvider = new Argon.EntityServiceProvider(sessionService, entityService, permissionServiceProvider);
            var testId = Argon.Cesium.createGuid();
            entityService.subscribedEvent.addEventListener(function (_a) {
                var id = _a.id, options = _a.options;
                expect(id).to.equal(testId);
                expect(options).to.exist && expect(options && options['something']).to.equal('here');
                entityService.unsubscribe(testId);
            });
            entityService.unsubscribedEvent.addEventListener(function (_a) {
                var id = _a.id;
                expect(id).to.equal(testId);
                done();
            });
            sessionService.connect();
            entityServiceProvider.sessionUnsubscribedEvent;
            entityService.subscribe(testId, { something: 'here' });
        });
        it('should emit sessionUnsubscribedEvent on provider', function (done) {
            var sessionService = new Argon.SessionService({ role: Argon.Role.REALITY_MANAGER }, new Argon.LoopbackConnectService, new Argon.SessionPortFactory, new Argon.MessageChannelFactory);
            var permissionServiceProvider = new Argon.PermissionServiceProvider(sessionService);
            var entityService = new Argon.EntityService(sessionService);
            var entityServiceProvider = new Argon.EntityServiceProvider(sessionService, entityService, permissionServiceProvider);
            var testId = Argon.Cesium.createGuid();
            entityServiceProvider.sessionSubscribedEvent.addEventListener(function (_a) {
                var id = _a.id, session = _a.session, options = _a.options;
                expect(id).to.equal(testId);
                expect(session).to.equal(sessionService.manager);
                expect(options).to.exist && expect(options['something']).to.equal('here');
                entityService.unsubscribe(testId);
            });
            entityServiceProvider.sessionUnsubscribedEvent.addEventListener(function (_a) {
                var id = _a.id, session = _a.session;
                expect(id).to.equal(testId);
                expect(session).to.equal(sessionService.manager);
                done();
            });
            sessionService.connect();
            entityServiceProvider.sessionUnsubscribedEvent;
            entityService.subscribe(testId, { something: 'here' });
        });
    });
});
describe('RealityService', function () {
    var sessionService;
    afterEach(function () {
        if (sessionService)
            sessionService.manager.close();
    });
    describe('new RealityService()', function () {
        it('the default reality should be used when no reality has been requested', function (done) {
            var app = new Argon.ArgonContainerManager({ role: Argon.Role.REALITY_MANAGER }).app;
            sessionService = app.session;
            app.reality.default = Argon.RealityViewer.EMPTY;
            var removeListener = app.context.updateEvent.addEventListener(function () {
                var frameState = app.context.serializedFrameState;
                expect(app.reality.current === Argon.RealityViewer.EMPTY);
                expect(frameState.reality === Argon.RealityViewer.EMPTY);
                expect(frameState.time).to.haveOwnProperty('dayNumber');
                expect(frameState.time).to.haveOwnProperty('secondsOfDay');
                removeListener();
                done();
            });
        });
    });
    describe('#request', function () {
        it('should raise an error for unsupported realities', function (done) {
            var container = new Argon.ArgonContainerManager({ role: Argon.Role.REALITY_MANAGER }).container;
            var realityService = container.get(Argon.RealityService);
            sessionService = container.get(Argon.SessionService);
            container.get(Argon.ArgonSystemProvider);
            sessionService.connect();
            realityService.request('reality:unsupported').catch(function (error) {
                expect(error).to.be.instanceof(Error);
                done();
            });
        });
    });
});
describe('MessageChannelLike', function () {
    describe('new MessageChannelLike()', function () {
        it('should create an object that behaves like the MessageChannel API', function () {
            var messageChannel = new Argon.MessageChannelLike();
            var port1 = messageChannel.port1;
            var port2 = messageChannel.port2;
            var p1 = new Promise(function (resolve, reject) {
                port1.onmessage = function (ev) {
                    expect(ev.data.c).to.equal('d');
                    resolve();
                };
            });
            var p2 = new Promise(function (resolve, reject) {
                port2.onmessage = function (ev) {
                    expect(ev.data.a).to.equal('b');
                    resolve();
                };
            });
            port1.postMessage({ a: 'b' });
            port2.postMessage({ c: 'd' });
            return Promise.all([p1, p2]);
        });
    });
});
describe('SessionPort', function () {
    describe('new SessionPort()', function () {
        it('should create a SessionPort object', function () {
            var session = new Argon.SessionPort();
            expect(session).to.be.instanceof(Argon.SessionPort);
        });
    });
    describe('#open', function () {
        it('should connect two sessions', function (done) {
            var session = new Argon.SessionPort();
            var remoteSession = new Argon.SessionPort();
            var messageChannel = new MessageChannel;
            var connectCount = 0;
            session.connectEvent.addEventListener(function () {
                expect(session.info.role).to.equal(Argon.Role.REALITY_MANAGER);
                expect(session.info.userData.test).to.equal('def');
                checkDone();
            });
            remoteSession.connectEvent.addEventListener(function () {
                expect(remoteSession.info.role).to.equal(Argon.Role.REALITY_AUGMENTER);
                expect(remoteSession.info.userData.test).to.equal('abc');
                checkDone();
            });
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER, userData: { test: 'abc' } });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_MANAGER, userData: { test: 'def' } });
            function checkDone() {
                connectCount++;
                if (connectCount == 2)
                    done();
            }
        });
        it('should connect two sessions (polyfill)', function (done) {
            var session = new Argon.SessionPort();
            var remoteSession = new Argon.SessionPort();
            var messageChannel = new Argon.MessageChannelLike;
            var connectCount = 0;
            session.connectEvent.addEventListener(function () {
                expect(session.info.role).to.equal(Argon.Role.REALITY_MANAGER);
                expect(session.info.userData.test).to.equal('def');
                checkDone();
            });
            remoteSession.connectEvent.addEventListener(function () {
                expect(remoteSession.info.role).to.equal(Argon.Role.REALITY_AUGMENTER);
                expect(remoteSession.info.userData.test).to.equal('abc');
                checkDone();
            });
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER, userData: { test: 'abc' } });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_MANAGER, userData: { test: 'def' } });
            function checkDone() {
                connectCount++;
                if (connectCount == 2)
                    done();
            }
        });
        it('should connect two sessions (synchronous)', function (done) {
            var session = new Argon.SessionPort();
            var remoteSession = new Argon.SessionPort();
            var messageChannel = new Argon.SynchronousMessageChannel;
            var connectCount = 0;
            session.connectEvent.addEventListener(function () {
                expect(session.info.role).to.equal(Argon.Role.REALITY_MANAGER);
                expect(session.info.userData.test).to.equal('def');
                checkDone();
            });
            remoteSession.connectEvent.addEventListener(function () {
                expect(remoteSession.info.role).to.equal(Argon.Role.REALITY_AUGMENTER);
                expect(remoteSession.info.userData.test).to.equal('abc');
                checkDone();
            });
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER, userData: { test: 'abc' } });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_MANAGER, userData: { test: 'def' } });
            function checkDone() {
                connectCount++;
                if (connectCount == 2)
                    done();
            }
        });
    });
    describe('#close', function () {
        it('should emit close events to both sessions', function (done) {
            var session = new Argon.SessionPort();
            var remoteSession = new Argon.SessionPort();
            var messageChannel = new MessageChannel;
            var connectCount = 0;
            session.closeEvent.addEventListener(function () {
                checkDone();
            });
            remoteSession.closeEvent.addEventListener(function () {
                checkDone();
            });
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_MANAGER });
            session.close();
            function checkDone() {
                connectCount++;
                if (connectCount == 2)
                    done();
            }
        });
        it('should emit close events to both sessions (polyfill)', function (done) {
            var session = new Argon.SessionPort();
            var remoteSession = new Argon.SessionPort();
            var messageChannel = new Argon.MessageChannelLike;
            var connectCount = 0;
            session.closeEvent.addEventListener(function () {
                checkDone();
            });
            remoteSession.closeEvent.addEventListener(function () {
                checkDone();
            });
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_MANAGER });
            session.close();
            function checkDone() {
                connectCount++;
                if (connectCount == 2)
                    done();
            }
        });
        it('should emit close events to both sessions (synchronous)', function (done) {
            var session = new Argon.SessionPort();
            var remoteSession = new Argon.SessionPort();
            var messageChannel = new Argon.SynchronousMessageChannel;
            var connectCount = 0;
            session.closeEvent.addEventListener(function () {
                checkDone();
            });
            remoteSession.closeEvent.addEventListener(function () {
                checkDone();
            });
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_MANAGER });
            session.close();
            function checkDone() {
                connectCount++;
                if (connectCount == 2)
                    done();
            }
        });
    });
    describe('#send', function () {
        it('should send messages between two sessions', function (done) {
            var session = new Argon.SessionPort();
            var remoteSession = new Argon.SessionPort();
            var messageChannel = new MessageChannel();
            session.on['test.message'] = function (message, event) {
                expect(message.hi).to.equal(42);
                done();
            };
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.send('test.message', { hi: 42 });
        });
        it('should send messages between two sessions (polyfill)', function (done) {
            var session = new Argon.SessionPort();
            var remoteSession = new Argon.SessionPort();
            var messageChannel = new Argon.MessageChannelLike();
            session.on['test.message'] = function (message, event) {
                expect(message.hi).to.equal(42);
                done();
            };
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.send('test.message', { hi: 42 });
        });
        it('should send messages between two sessions (synchronous)', function (done) {
            var session = new Argon.SessionPort();
            var remoteSession = new Argon.SessionPort();
            var messageChannel = new Argon.MessageChannelLike();
            session.on['test.message'] = function (message, event) {
                expect(message.hi).to.equal(42);
                done();
            };
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.send('test.message', { hi: 42 });
        });
    });
});
describe('CommandQueue', function () {
    describe('new CommandQueue()', function () {
        it('should create a CommandQueue object', function () {
            var queue = new Argon.CommandQueue();
            expect(queue).to.be.instanceof(Argon.CommandQueue);
        });
    });
    describe('#push', function () {
        it('should push and execute commands in serial', function () {
            var queue = new Argon.CommandQueue();
            var x = 1;
            queue.push(function () { return ++x; });
            queue.push(function () { return expect(x).to.equal(2); });
            queue.push(function () {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        x = 10;
                        resolve();
                    }, 10);
                });
            });
            queue.push(function () {
                expect(x).to.equal(10);
                x++;
            });
            return queue.push(function () {
                expect(x).to.equal(11);
            }, true);
        });
    });
    describe('#clear', function () {
        it('should clear pending commands', function (done) {
            var queue = new Argon.CommandQueue();
            var x = 1;
            queue.push(function () { return ++x; });
            queue.push(function () { return expect(x).to.equal(2); });
            queue.push(function () {
                queue.clear();
                queue.push(function () {
                    expect(x).to.equal(102);
                    done();
                });
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        x += 100;
                        resolve();
                    }, 15);
                });
            });
            queue.push(function () { return x = 15; }).catch(function () { });
            queue.execute();
        });
    });
    describe('#errorEvent', function () {
        it('should emit thrown errors', function (done) {
            var queue = new Argon.CommandQueue();
            queue.push(function () {
                throw new Error('A');
            }).catch(function () { });
            queue.errorEvent.addEventListener(function (error) {
                expect(error.message).to.equal('A');
                done();
            });
            queue.execute();
        });
        it('should emit promise rejections', function (done) {
            var queue = new Argon.CommandQueue();
            queue.push(function () {
                return Promise.reject(new Error('B'));
            }).catch(function () { });
            queue.errorEvent.addEventListener(function (error) {
                expect(error.message).to.equal('B');
                done();
            });
            queue.execute();
        });
    });
});
describe('Context', function () {
    function createSystem() {
        return Argon.init(null, { role: Argon.Role.REALITY_MANAGER });
    }
    afterEach(function () {
        if (Argon.ArgonSystem.instance)
            Argon.ArgonSystem.instance.destroy();
    });
    describe('new Context()', function () {
        it('should create a Context object', function () {
            var context = createSystem().context;
            expect(context).to.be.instanceof(Argon.ContextService);
        });
        it('should emit update events with default reality', function (done) {
            var _a = createSystem(), context = _a.context, reality = _a.reality;
            expect(reality.default).to.equal(Argon.RealityViewer.EMPTY);
            var removeListener = context.updateEvent.addEventListener(function () {
                // expect(Argon.RealityViewer.getType(context.serializedFrameState!.reality)).to.equal('empty');
                removeListener();
                done();
            });
        });
    });
    describe('#getEntityPose', function () {
        it('poseStatus should not have KNOWN bit set when pose is undefined', function (done) {
            var context = createSystem().context;
            var entity = new Argon.Cesium.Entity;
            var removeListener = context.updateEvent.addEventListener(function () {
                var state = context.getEntityPose(entity);
                expect(state.status & Argon.PoseStatus.KNOWN).to.equal(0);
                removeListener();
                done();
            });
        });
        it('poseStatus should have PoseStatus.FOUND & PoseStatus.KNOWN when pose is found', function (done) {
            var context = createSystem().context;
            var entity = new Argon.Cesium.Entity({
                position: new Argon.Cesium.ConstantPositionProperty(Argon.Cesium.Cartesian3.ZERO, context.getDefaultReferenceFrame()),
                orientation: new Argon.Cesium.ConstantProperty(Argon.Cesium.Quaternion.IDENTITY)
            });
            var removeListener = context.updateEvent.addEventListener(function () {
                var state = context.getEntityPose(entity);
                expect(state.status & Argon.PoseStatus.FOUND).to.be.ok;
                expect(state.status & Argon.PoseStatus.KNOWN).to.be.ok;
                removeListener();
                done();
            });
        });
        it('poseStatus should have PoseStatus.LOST when pose is lost', function (done) {
            var context = createSystem().context;
            var entity = new Argon.Cesium.Entity({
                position: new Argon.Cesium.ConstantPositionProperty(Argon.Cesium.Cartesian3.ZERO, context.getDefaultReferenceFrame()),
                orientation: new Argon.Cesium.ConstantProperty(Argon.Cesium.Quaternion.IDENTITY)
            });
            var found = false;
            var removeListener = context.updateEvent.addEventListener(function () {
                var state = context.getEntityPose(entity);
                if (!found) {
                    expect(state.status & Argon.PoseStatus.FOUND).to.be.ok;
                    expect(state.status & Argon.PoseStatus.KNOWN).to.be.ok;
                    expect(state.status & Argon.PoseStatus.LOST).to.not.be.ok;
                    entity.position.setValue(undefined);
                    found = true;
                }
                else {
                    expect(state.status & Argon.PoseStatus.LOST).to.be.ok;
                    expect(state.status & Argon.PoseStatus.FOUND).to.not.be.ok;
                    expect(state.status & Argon.PoseStatus.KNOWN).to.not.be.ok;
                    removeListener();
                    done();
                }
            });
        });
    });
});
describe('VuforiaService', function () {
    describe('#isAvailable', function () {
        it('should resolve ar.vuforia.isAvailable request', function () {
            var sessionService = new Argon.SessionService({ role: Argon.Role.REALITY_MANAGER }, new Argon.LoopbackConnectService, new Argon.SessionPortFactory, new Argon.MessageChannelFactory);
            var vuforiaService = new Argon.VuforiaService(sessionService);
            sessionService.connectEvent.addEventListener(function (session) {
                session.on['ar.vuforia.isAvailable'] = function () {
                    return Promise.resolve({ available: true });
                };
            });
            sessionService.connect();
            return vuforiaService.isAvailable().then(function (available) {
                expect(available).to.be.true;
            });
        });
    });
    describe('#init', function () {
        it('should resolve with Argon.VuforiaAPI instance upon success', function () {
            var sessionService = new Argon.SessionService({ role: Argon.Role.REALITY_MANAGER }, new Argon.LoopbackConnectService, new Argon.SessionPortFactory, new Argon.MessageChannelFactory);
            var vuforiaService = new Argon.VuforiaService(sessionService);
            sessionService.connectEvent.addEventListener(function (session) {
                session.on['ar.vuforia.init'] = function (options) {
                    expect(options.encryptedLicenseData).to.equal('test');
                    return Promise.resolve();
                };
            });
            sessionService.connect();
            return vuforiaService.init({ encryptedLicenseData: 'test' }).then(function (api) {
                expect(api).to.be.instanceof(Argon.VuforiaAPI);
            });
        });
    });
});
describe('Utils', function () {
    describe('decomposePerspectiveOffCenterProjectionMatrix', function () {
        it('should correctly decompose a perspective off center projection matrix', function () {
            var frustum = new Argon.Cesium.PerspectiveOffCenterFrustum;
            frustum.left = -1;
            frustum.right = 2;
            frustum.top = -3;
            frustum.bottom = 4;
            frustum.near = 5;
            frustum.far = 6;
            var result = Argon.decomposePerspectiveOffCenterProjectionMatrix(frustum.projectionMatrix, new Argon.Cesium.PerspectiveOffCenterFrustum);
            var CesiumMath = Argon.Cesium.CesiumMath;
            expect(CesiumMath.equalsEpsilon(frustum.left, result.left, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.right, result.right, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.top, result.top, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.bottom, result.bottom, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.near, result.near, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.far, result.far, CesiumMath.EPSILON10)).to.be.true;
        });
    });
    describe('decomposePerspectiveProjectionMatrix', function () {
        it('should correctly decompose a perspective projection matrix', function () {
            var frustum = new Argon.Cesium.PerspectiveFrustum;
            frustum.fov = Math.PI / 2;
            frustum.near = 0.01;
            frustum.far = 10000;
            frustum.aspectRatio = 0.75;
            frustum.xOffset = 42;
            frustum.yOffset = 15;
            var result = Argon.decomposePerspectiveProjectionMatrix(frustum.projectionMatrix, new Argon.Cesium.PerspectiveFrustum);
            var CesiumMath = Argon.Cesium.CesiumMath;
            expect(CesiumMath.equalsEpsilon(frustum.fov, result.fov, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.fovy, result.fovy, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.aspectRatio, result.aspectRatio, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.near, result.near, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.far, result.far, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.xOffset, result.xOffset, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.yOffset, result.yOffset, CesiumMath.EPSILON10)).to.be.true;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOEJBQThCO0FBQzlCLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFBO0FBRTVCLHNCQUFzQjtBQUN0QixPQUFPLEtBQUssS0FBSyxNQUFNLGNBQWMsQ0FBQTtBQUNyQyxxQkFBcUI7QUFDckIsMENBQTBDO0FBRTFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQztJQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUM7QUFFM0QsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUUzQixFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksT0FBTyxXQUFXLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN0RSxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzdCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztBQUN4RCxDQUFDO0FBRUQsU0FBUyxDQUFDO0lBQ04sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDM0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDN0MsQ0FBQyxDQUFDLENBQUE7QUFFRixRQUFRLENBQUMsT0FBTyxFQUFFO0lBRWQsUUFBUSxDQUFDLE9BQU8sRUFBRTtRQUNkLEVBQUUsQ0FBQyxpREFBaUQsRUFBRTtZQUNsRCxJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDekIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFD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QUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3ZHLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUE7QUFFTixDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwibW9jaGFcIi8+XG5pbXBvcnQgKiBhcyBjaGFpIGZyb20gJ2NoYWknXG5cbi8vIFRvIHRlc3QgdGhlIHNvdXJjZTpcbmltcG9ydCAqIGFzIEFyZ29uIGZyb20gJy4uL3NyYy9hcmdvbidcbi8vIFRvIHRlc3QgdGhlIGJ1aWxkOlxuLy8gaW1wb3J0ICogYXMgQXJnb24gZnJvbSAnQGFyZ29uanMvYXJnb24nXG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgd2luZG93WydBcmdvbiddID0gQXJnb247XG5cbmNvbnN0IGV4cGVjdCA9IGNoYWkuZXhwZWN0O1xuXG5pZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHBlcmZvcm1hbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgIGdsb2JhbFsncGVyZm9ybWFuY2UnXSA9IERhdGU7XG4gICAgZ2xvYmFsWydNZXNzYWdlQ2hhbm5lbCddID0gQXJnb24uTWVzc2FnZUNoYW5uZWxMaWtlO1xufVxuXG5hZnRlckVhY2goKCkgPT4ge1xuICAgIGlmIChBcmdvbi5BcmdvblN5c3RlbS5pbnN0YW5jZSlcbiAgICAgICAgQXJnb24uQXJnb25TeXN0ZW0uaW5zdGFuY2UuZGVzdHJveSgpO1xufSlcblxuZGVzY3JpYmUoJ0FyZ29uJywgKCkgPT4ge1xuXG4gICAgZGVzY3JpYmUoJyNpbml0JywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSBhbiBBcmdvblN5c3RlbSB3LyBkZWZhdWx0IG9wdGlvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhcHAgPSBBcmdvbi5pbml0KCk7XG4gICAgICAgICAgICBleHBlY3QoYXBwKS50by5iZS5hbi5pbnN0YW5jZU9mKEFyZ29uLkFyZ29uU3lzdGVtKTtcbiAgICAgICAgICAgIGV4cGVjdChhcHAuY29udGV4dCkudG8uZXhpc3Q7XG4gICAgICAgICAgICBleHBlY3QoYXBwLnZ1Zm9yaWEpLnRvLmV4aXN0O1xuICAgICAgICB9KTtcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ25ldyBBcmdvblN5c3RlbSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSBhbiBBcmdvblN5c3RlbSB3aXRoIFJvbGU9Um9sZS5NQU5BR0VSJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWFuYWdlciA9IEFyZ29uLmluaXQobnVsbCwgeyByb2xlOiBBcmdvbi5Sb2xlLlJFQUxJVFlfTUFOQUdFUiB9KTtcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VyKS50by5iZS5hbi5pbnN0YW5jZU9mKEFyZ29uLkFyZ29uU3lzdGVtKTtcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VyLnNlc3Npb24uY29uZmlndXJhdGlvbi5yb2xlKS50by5lcXVhbChBcmdvbi5Sb2xlLlJFQUxJVFlfTUFOQUdFUik7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSBhbiBBcmdvblN5c3RlbSB3aXRoIFJvbGU9Um9sZS5SRUFMSVRZX0FVR01FTlRFUicsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFwcCA9IEFyZ29uLmluaXQobnVsbCwgeyByb2xlOiBBcmdvbi5Sb2xlLlJFQUxJVFlfQVVHTUVOVEVSIH0pO1xuICAgICAgICAgICAgZXhwZWN0KGFwcCkudG8uYmUuYW4uaW5zdGFuY2VPZihBcmdvbi5BcmdvblN5c3RlbSk7XG4gICAgICAgICAgICBleHBlY3QoYXBwLnNlc3Npb24uY29uZmlndXJhdGlvbi5yb2xlKS50by5lcXVhbChBcmdvbi5Sb2xlLlJFQUxJVFlfQVVHTUVOVEVSKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIGFuIEFyZ29uU3lzdGVtIHdpdGggUm9sZT1Sb2xlLlJFQUxJVFlfVklFVycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFwcCA9IEFyZ29uLmluaXQobnVsbCwgeyByb2xlOiBBcmdvbi5Sb2xlLlJFQUxJVFlfVklFV0VSIH0pO1xuICAgICAgICAgICAgZXhwZWN0KGFwcCkudG8uYmUuYW4uaW5zdGFuY2VPZihBcmdvbi5BcmdvblN5c3RlbSk7XG4gICAgICAgICAgICBleHBlY3QoYXBwLnNlc3Npb24uY29uZmlndXJhdGlvbi5yb2xlKS50by5lcXVhbChBcmdvbi5Sb2xlLlJFQUxJVFlfVklFV0VSKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmFpc2UgYSBmb2N1cyBldmVudCB3aGVuIFJvbGU9Um9sZS5NQU5BR0VSJywgKGRvbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hbmFnZXIgPSBBcmdvbi5pbml0KG51bGwsIHsgcm9sZTogQXJnb24uUm9sZS5SRUFMSVRZX01BTkFHRVIgfSk7XG4gICAgICAgICAgICBleHBlY3QobWFuYWdlcikudG8uYmUuYW4uaW5zdGFuY2VPZihBcmdvbi5BcmdvblN5c3RlbSk7XG4gICAgICAgICAgICBleHBlY3QobWFuYWdlci5zZXNzaW9uLmNvbmZpZ3VyYXRpb24ucm9sZSkudG8uZXF1YWwoQXJnb24uUm9sZS5SRUFMSVRZX01BTkFHRVIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBtYW5hZ2VyLmZvY3VzRXZlbnQuYWRkRXZlbnRMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG1hbmFnZXIuZm9jdXMuaGFzRm9jdXMpLnRvLmJlLnRydWU7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnYXBwLmNvbnRleHQuc3Vic2NyaWJlR2VvbG9jYXRpb24nLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgc2V0IHN1Z2dlc3RlZEdlb2xvY2F0aW9uU3Vic2NyaXB0aW9uIG9wdGlvbnMgaW4gRGV2aWNlU2VydmljZScsIChkb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYW5hZ2VyID0gQXJnb24uaW5pdChudWxsLCB7IHJvbGU6IEFyZ29uLlJvbGUuUkVBTElUWV9NQU5BR0VSIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBtYW5hZ2VyLmRldmljZS5zdWdnZXN0ZWRHZW9sb2NhdGlvblN1YnNjcmlwdGlvbkNoYW5nZUV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoKCk9PntcbiAgICAgICAgICAgICAgICBleHBlY3QobWFuYWdlci5kZXZpY2Uuc3VnZ2VzdGVkR2VvbG9jYXRpb25TdWJzY3JpcHRpb24pLnRvLmV4aXN0O1xuICAgICAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VyLmRldmljZS5zdWdnZXN0ZWRHZW9sb2NhdGlvblN1YnNjcmlwdGlvbiEuZW5hYmxlSGlnaEFjY3VyYWN5KS50by5iZS50cnVlO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBleHBlY3QobWFuYWdlci5kZXZpY2Uuc3VnZ2VzdGVkR2VvbG9jYXRpb25TdWJzY3JpcHRpb24pLnRvLm5vdC5leGlzdDtcbiAgICAgICAgICAgIG1hbmFnZXIuY29udGV4dC5zdWJzY3JpYmVHZW9sb2NhdGlvbih7ZW5hYmxlSGlnaEFjY3VyYWN5OnRydWV9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYXBwLmNvbnRleHQudW5zdWJzY3JpYmVHZW9sb2NhdGlvbicsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCB1bnNldCBzdWdnZXN0ZWRHZW9sb2NhdGlvblN1YnNjcmlwdGlvbiBvcHRpb25zIGluIERldmljZVNlcnZpY2UnLCAoZG9uZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWFuYWdlciA9IEFyZ29uLmluaXQobnVsbCwgeyByb2xlOiBBcmdvbi5Sb2xlLlJFQUxJVFlfTUFOQUdFUiB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gbWFuYWdlci5kZXZpY2Uuc3VnZ2VzdGVkR2VvbG9jYXRpb25TdWJzY3JpcHRpb25DaGFuZ2VFdmVudC5hZGRFdmVudExpc3RlbmVyKCgpPT57XG4gICAgICAgICAgICAgICAgZXhwZWN0KG1hbmFnZXIuZGV2aWNlLnN1Z2dlc3RlZEdlb2xvY2F0aW9uU3Vic2NyaXB0aW9uKS50by5leGlzdDtcbiAgICAgICAgICAgICAgICBleHBlY3QobWFuYWdlci5kZXZpY2Uuc3VnZ2VzdGVkR2VvbG9jYXRpb25TdWJzY3JpcHRpb24hLmVuYWJsZUhpZ2hBY2N1cmFjeSkudG8uYmUudHJ1ZTtcbiAgICAgICAgICAgICAgICByZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgIG1hbmFnZXIuZGV2aWNlLnN1Z2dlc3RlZEdlb2xvY2F0aW9uU3Vic2NyaXB0aW9uQ2hhbmdlRXZlbnQuYWRkRXZlbnRMaXN0ZW5lcigoKT0+e1xuICAgICAgICAgICAgICAgICAgICBleHBlY3QobWFuYWdlci5kZXZpY2Uuc3VnZ2VzdGVkR2VvbG9jYXRpb25TdWJzY3JpcHRpb24pLnRvLm5vdC5leGlzdDtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG1hbmFnZXIuY29udGV4dC51bnN1YnNjcmliZUdlb2xvY2F0aW9uKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZXIuZGV2aWNlLnN1Z2dlc3RlZEdlb2xvY2F0aW9uU3Vic2NyaXB0aW9uKS50by5ub3QuZXhpc3Q7XG4gICAgICAgICAgICBtYW5hZ2VyLmNvbnRleHQuc3Vic2NyaWJlR2VvbG9jYXRpb24oe2VuYWJsZUhpZ2hBY2N1cmFjeTp0cnVlfSk7XG4gICAgICAgIH0pO1xuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnYXBwLmRldmljZS5zdWJzY3JpYmVHZW9sb2NhdGlvbicsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBhdHRlbXB0IHRvIHN0YXJ0IGdlb2xvY2F0aW9uIHVwZGF0ZXMnLCAoZG9uZSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBhcHAgPSBuZXcgQXJnb24uQXJnb25Db250YWluZXJNYW5hZ2VyKHtyb2xlOiBBcmdvbi5Sb2xlLlJFQUxJVFlfTUFOQUdFUn0pLmFwcDtcbiAgICAgICAgICAgIGNvbnN0IGRldmljZTpBcmdvbi5EZXZpY2UgPSBhcHAuY29udGFpbmVyLmdldChBcmdvbi5EZXZpY2UpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBkZXZpY2Uuc3RhcnRHZW9sb2NhdGlvblVwZGF0ZXMgPSAob3B0aW9ucykgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChvcHRpb25zICYmIG9wdGlvbnMuZW5hYmxlSGlnaEFjY3VyYWN5KS50by5iZS50cnVlO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXBwLmRldmljZS5zdWJzY3JpYmVHZW9sb2NhdGlvbih7ZW5hYmxlSGlnaEFjY3VyYWN5OnRydWV9KVxuICAgICAgICB9KTtcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ2FwcC5kZXZpY2UudW5zdWJzY3JpYmVHZW9sb2NhdGlvbicsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBhdHRlbXB0IHRvIHN0b3AgZ2VvbG9jYXRpb24gdXBkYXRlcycsIChkb25lKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGFwcCA9IG5ldyBBcmdvbi5BcmdvbkNvbnRhaW5lck1hbmFnZXIoe3JvbGU6IEFyZ29uLlJvbGUuUkVBTElUWV9NQU5BR0VSfSkuYXBwO1xuICAgICAgICAgICAgY29uc3QgZGV2aWNlOkFyZ29uLkRldmljZSA9IGFwcC5jb250YWluZXIuZ2V0KEFyZ29uLkRldmljZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGRldmljZS5zdGFydEdlb2xvY2F0aW9uVXBkYXRlcyA9IChvcHRpb25zKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG9wdGlvbnMgJiYgb3B0aW9ucy5lbmFibGVIaWdoQWNjdXJhY3kpLnRvLmJlLnRydWU7XG4gICAgXG4gICAgICAgICAgICAgICAgZGV2aWNlLnN0b3BHZW9sb2NhdGlvblVwZGF0ZXMgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgZGV2aWNlLnN0b3BHZW9sb2NhdGlvblVwZGF0ZXMgPSAoKSA9PiB7fTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhcHAuZGV2aWNlLnVuc3Vic2NyaWJlR2VvbG9jYXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXBwLmRldmljZS5zdWJzY3JpYmVHZW9sb2NhdGlvbih7ZW5hYmxlSGlnaEFjY3VyYWN5OnRydWV9KTtcbiAgICAgICAgfSk7XG4gICAgfSlcblxufSk7XG5cbmRlc2NyaWJlKCdFbnRpdHlTZXJ2aWNlJywgKCkgPT4ge1xuXG4gICAgZGVzY3JpYmUoJ25ldyBFbnRpdHlTZXJ2aWNlKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIGFuIEVudGl0eVNlcnZpY2UgaW5zdGFuY2UnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uU2VydmljZSA9IG5ldyBBcmdvbi5TZXNzaW9uU2VydmljZShcbiAgICAgICAgICAgICAgICB7IHJvbGU6QXJnb24uUm9sZS5SRUFMSVRZX01BTkFHRVIgfSwgXG4gICAgICAgICAgICAgICAgbmV3IEFyZ29uLkxvb3BiYWNrQ29ubmVjdFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgbmV3IEFyZ29uLlNlc3Npb25Qb3J0RmFjdG9yeSxcbiAgICAgICAgICAgICAgICBuZXcgQXJnb24uTWVzc2FnZUNoYW5uZWxGYWN0b3J5XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgZW50aXR5U2VydmljZSA9IG5ldyBBcmdvbi5FbnRpdHlTZXJ2aWNlKHNlc3Npb25TZXJ2aWNlKTtcbiAgICAgICAgICAgIGV4cGVjdChlbnRpdHlTZXJ2aWNlKS50by5iZS5pbnN0YW5jZU9mKEFyZ29uLkVudGl0eVNlcnZpY2UpO1xuICAgICAgICAgICAgZXhwZWN0KGVudGl0eVNlcnZpY2UuY29sbGVjdGlvbikudG8uYmUuaW5zdGFuY2VPZihBcmdvbi5DZXNpdW0uRW50aXR5Q29sbGVjdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnc3Vic2NyaWJlJywgKCkgPT4ge1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHJlc29sdmVkIHByb21pc2UgYWZ0ZXIgc3VjY2VzcycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb25TZXJ2aWNlID0gbmV3IEFyZ29uLlNlc3Npb25TZXJ2aWNlKFxuICAgICAgICAgICAgICAgIHsgcm9sZTpBcmdvbi5Sb2xlLlJFQUxJVFlfTUFOQUdFUiB9LCBcbiAgICAgICAgICAgICAgICBuZXcgQXJnb24uTG9vcGJhY2tDb25uZWN0U2VydmljZSxcbiAgICAgICAgICAgICAgICBuZXcgQXJnb24uU2Vzc2lvblBvcnRGYWN0b3J5LFxuICAgICAgICAgICAgICAgIG5ldyBBcmdvbi5NZXNzYWdlQ2hhbm5lbEZhY3RvcnlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IGVudGl0eVNlcnZpY2UgPSBuZXcgQXJnb24uRW50aXR5U2VydmljZShzZXNzaW9uU2VydmljZSk7XG4gICAgICAgICAgICBjb25zdCBwZXJtaXNzaW9uU2VydmljZVByb3ZpZGVyID0gbmV3IEFyZ29uLlBlcm1pc3Npb25TZXJ2aWNlUHJvdmlkZXIoc2Vzc2lvblNlcnZpY2UpO1xuICAgICAgICAgICAgbmV3IEFyZ29uLkVudGl0eVNlcnZpY2VQcm92aWRlcihzZXNzaW9uU2VydmljZSwgZW50aXR5U2VydmljZSwgcGVybWlzc2lvblNlcnZpY2VQcm92aWRlcik7XG5cbiAgICAgICAgICAgIHNlc3Npb25TZXJ2aWNlLmNvbm5lY3QoKTtcbiAgICAgICAgICAgIGNvbnN0IHRlc3RJZCA9IEFyZ29uLkNlc2l1bS5jcmVhdGVHdWlkKCk7XG4gICAgICAgICAgICByZXR1cm4gZW50aXR5U2VydmljZS5zdWJzY3JpYmUodGVzdElkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBlbWl0IHN1YnNjcmliZWRFdmVudCBhZnRlciBzdWNjZXNzJywgKGRvbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb25TZXJ2aWNlID0gbmV3IEFyZ29uLlNlc3Npb25TZXJ2aWNlKFxuICAgICAgICAgICAgICAgIHsgcm9sZTpBcmdvbi5Sb2xlLlJFQUxJVFlfTUFOQUdFUiB9LCBcbiAgICAgICAgICAgICAgICBuZXcgQXJnb24uTG9vcGJhY2tDb25uZWN0U2VydmljZSxcbiAgICAgICAgICAgICAgICBuZXcgQXJnb24uU2Vzc2lvblBvcnRGYWN0b3J5LFxuICAgICAgICAgICAgICAgIG5ldyBBcmdvbi5NZXNzYWdlQ2hhbm5lbEZhY3RvcnlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAvLyBjb25zdCBwZXJtaXNzaW9uU2VydmljZSA9IG5ldyBBcmdvbi5QZXJtaXNzaW9uU2VydmljZShzZXNzaW9uU2VydmljZSk7XG4gICAgICAgICAgICBjb25zdCBwZXJtaXNzaW9uU2VydmljZVByb3ZpZGVyID0gbmV3IEFyZ29uLlBlcm1pc3Npb25TZXJ2aWNlUHJvdmlkZXIoc2Vzc2lvblNlcnZpY2UpO1xuICAgICAgICAgICAgY29uc3QgZW50aXR5U2VydmljZSA9IG5ldyBBcmdvbi5FbnRpdHlTZXJ2aWNlKHNlc3Npb25TZXJ2aWNlKTtcbiAgICAgICAgICAgIGNvbnN0IGVudGl0eVNlcnZpY2VQcm92aWRlciA9IG5ldyBBcmdvbi5FbnRpdHlTZXJ2aWNlUHJvdmlkZXIoc2Vzc2lvblNlcnZpY2UsIGVudGl0eVNlcnZpY2UsIHBlcm1pc3Npb25TZXJ2aWNlUHJvdmlkZXIpO1xuXG5cbiAgICAgICAgICAgIGNvbnN0IHRlc3RJZCA9IEFyZ29uLkNlc2l1bS5jcmVhdGVHdWlkKCk7XG4gICAgICAgICAgICBlbnRpdHlTZXJ2aWNlLnN1YnNjcmliZWRFdmVudC5hZGRFdmVudExpc3RlbmVyKCh7aWQsIG9wdGlvbnN9KT0+e1xuICAgICAgICAgICAgICAgIGV4cGVjdChpZCkudG8uZXF1YWwodGVzdElkKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qob3B0aW9ucyAmJiBvcHRpb25zWydoZWxsbyddKS50by5lcXVhbCgnd29ybGQnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJzY3JpYmVycyA9IGVudGl0eVNlcnZpY2VQcm92aWRlci5zdWJzY3JpYmVyc0J5RW50aXR5LmdldCh0ZXN0SWQpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzdWJzY3JpYmVycykudG8uZXhpc3QgJiYgZXhwZWN0KHN1YnNjcmliZXJzIS5oYXMoc2Vzc2lvblNlcnZpY2UubWFuYWdlcikpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZXNzaW9uU2VydmljZS5jb25uZWN0KCk7XG4gICAgICAgICAgICBlbnRpdHlTZXJ2aWNlLnN1YnNjcmliZSh0ZXN0SWQsIHtoZWxsbzond29ybGQnfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaXQoJ3Nob3VsZCBlbWl0IHNlc3Npb25TdWJzY3JpYmVkRXZlbnQgb24gcHJvdmlkZXIgYWZ0ZXIgc3VjY2VzcycsIChkb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uU2VydmljZSA9IG5ldyBBcmdvbi5TZXNzaW9uU2VydmljZShcbiAgICAgICAgICAgICAgICB7IHJvbGU6QXJnb24uUm9sZS5SRUFMSVRZX01BTkFHRVIgfSwgXG4gICAgICAgICAgICAgICAgbmV3IEFyZ29uLkxvb3BiYWNrQ29ubmVjdFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgbmV3IEFyZ29uLlNlc3Npb25Qb3J0RmFjdG9yeSxcbiAgICAgICAgICAgICAgICBuZXcgQXJnb24uTWVzc2FnZUNoYW5uZWxGYWN0b3J5XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgcGVybWlzc2lvblNlcnZpY2VQcm92aWRlciA9IG5ldyBBcmdvbi5QZXJtaXNzaW9uU2VydmljZVByb3ZpZGVyKHNlc3Npb25TZXJ2aWNlKTtcbiAgICAgICAgICAgIGNvbnN0IGVudGl0eVNlcnZpY2UgPSBuZXcgQXJnb24uRW50aXR5U2VydmljZShzZXNzaW9uU2VydmljZSk7XG4gICAgICAgICAgICBjb25zdCBlbnRpdHlTZXJ2aWNlUHJvdmlkZXIgPSBuZXcgQXJnb24uRW50aXR5U2VydmljZVByb3ZpZGVyKHNlc3Npb25TZXJ2aWNlLCBlbnRpdHlTZXJ2aWNlLCBwZXJtaXNzaW9uU2VydmljZVByb3ZpZGVyKTtcblxuICAgICAgICAgICAgY29uc3QgdGVzdElkID0gQXJnb24uQ2VzaXVtLmNyZWF0ZUd1aWQoKTtcbiAgICAgICAgICAgIGVudGl0eVNlcnZpY2VQcm92aWRlci5zZXNzaW9uU3Vic2NyaWJlZEV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoKHtpZCwgc2Vzc2lvbiwgb3B0aW9uc30pPT57XG4gICAgICAgICAgICAgICAgZXhwZWN0KGlkKS50by5lcXVhbCh0ZXN0SWQpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzZXNzaW9uKS50by5lcXVhbChzZXNzaW9uU2VydmljZS5tYW5hZ2VyKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qob3B0aW9ucykudG8uZXhpc3QgJiYgZXhwZWN0KG9wdGlvbnNbJ3NvbWV0aGluZyddKS50by5lcXVhbCgnaGVyZScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnNjcmliZXJzID0gZW50aXR5U2VydmljZVByb3ZpZGVyLnN1YnNjcmliZXJzQnlFbnRpdHkuZ2V0KHRlc3RJZCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHN1YnNjcmliZXJzKS50by5leGlzdCAmJiBleHBlY3Qoc3Vic2NyaWJlcnMhLmhhcyhzZXNzaW9uU2VydmljZS5tYW5hZ2VyKSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9ucyA9IGVudGl0eVNlcnZpY2VQcm92aWRlci5zdWJzY3JpcHRpb25zQnlTdWJzY3JpYmVyLmdldChzZXNzaW9uU2VydmljZS5tYW5hZ2VyKSE7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHN1YnNjcmlwdGlvbnMpLnRvLmV4aXN0ICYmIGV4cGVjdChBcmdvbi5qc29uRXF1YWxzKHN1YnNjcmlwdGlvbnNbaWRdLG9wdGlvbnMpKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2Vzc2lvblNlcnZpY2UuY29ubmVjdCgpO1xuICAgICAgICAgICAgZW50aXR5U2VydmljZS5zdWJzY3JpYmUodGVzdElkLCB7c29tZXRoaW5nOidoZXJlJ30pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhIHJlamVjdGVkIHByb21pc2UgYWZ0ZXIgcmVqZWN0aW9uJywgKGRvbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb25TZXJ2aWNlID0gbmV3IEFyZ29uLlNlc3Npb25TZXJ2aWNlKFxuICAgICAgICAgICAgICAgIHsgcm9sZTpBcmdvbi5Sb2xlLlJFQUxJVFlfTUFOQUdFUiB9LCBcbiAgICAgICAgICAgICAgICBuZXcgQXJnb24uTG9vcGJhY2tDb25uZWN0U2VydmljZSxcbiAgICAgICAgICAgICAgICBuZXcgQXJnb24uU2Vzc2lvblBvcnRGYWN0b3J5LFxuICAgICAgICAgICAgICAgIG5ldyBBcmdvbi5NZXNzYWdlQ2hhbm5lbEZhY3RvcnlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBwZXJtaXNzaW9uU2VydmljZVByb3ZpZGVyID0gbmV3IEFyZ29uLlBlcm1pc3Npb25TZXJ2aWNlUHJvdmlkZXIoc2Vzc2lvblNlcnZpY2UpO1xuICAgICAgICAgICAgY29uc3QgZW50aXR5U2VydmljZSA9IG5ldyBBcmdvbi5FbnRpdHlTZXJ2aWNlKHNlc3Npb25TZXJ2aWNlKTtcbiAgICAgICAgICAgIG5ldyBBcmdvbi5FbnRpdHlTZXJ2aWNlUHJvdmlkZXIoc2Vzc2lvblNlcnZpY2UsIGVudGl0eVNlcnZpY2UsIHBlcm1pc3Npb25TZXJ2aWNlUHJvdmlkZXIpO1xuXG4gICAgICAgICAgICBjb25zdCB0ZXN0SWQgPSBBcmdvbi5DZXNpdW0uY3JlYXRlR3VpZCgpO1xuICAgICAgICAgICAgcGVybWlzc2lvblNlcnZpY2VQcm92aWRlci5oYW5kbGVQZXJtaXNzaW9uUmVxdWVzdCA9IChzZXNzaW9uLCBpZCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChzZXNzaW9uKS50by5lcXVhbChzZXNzaW9uU2VydmljZS5tYW5hZ2VyKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoaWQpLnRvLmVxdWFsKHRlc3RJZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdmYWlsJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZW50aXR5U2VydmljZS5zdWJzY3JpYmVkRXZlbnQuYWRkRXZlbnRMaXN0ZW5lcigoKT0+e1xuICAgICAgICAgICAgICAgIGRvbmUobmV3IEVycm9yKCd1bmV4cGVjdGVkIHN1YnNjcmliZWQgZXZlbnQnKSk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBlbnRpdHlTZXJ2aWNlLnVuc3Vic2NyaWJlZEV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoKCk9PntcbiAgICAgICAgICAgICAgICBkb25lKG5ldyBFcnJvcigndW5leHBlY3RlZCB1bnN1YnNjcmliZWQgZXZlbnQnKSk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBzZXNzaW9uU2VydmljZS5jb25uZWN0KCk7XG4gICAgICAgICAgICBlbnRpdHlTZXJ2aWNlLnN1YnNjcmliZSh0ZXN0SWQsIHtzb21ldGhpbmc6J2hlcmUnfSkuY2F0Y2goKGU6RXJyb3IpPT57XG4gICAgICAgICAgICAgICAgZXhwZWN0KGUubWVzc2FnZSkudG8uZXF1YWwoJ2ZhaWwnKTtcbiAgICAgICAgICAgICAgICBkb25lKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KVxuXG5cbiAgICBkZXNjcmliZSgndW5zdWJzY3JpYmUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgZW1pdCB1bnN1YnNjcmliZWRFdmVudCcsIChkb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uU2VydmljZSA9IG5ldyBBcmdvbi5TZXNzaW9uU2VydmljZShcbiAgICAgICAgICAgICAgICB7IHJvbGU6QXJnb24uUm9sZS5SRUFMSVRZX01BTkFHRVIgfSwgXG4gICAgICAgICAgICAgICAgbmV3IEFyZ29uLkxvb3BiYWNrQ29ubmVjdFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgbmV3IEFyZ29uLlNlc3Npb25Qb3J0RmFjdG9yeSxcbiAgICAgICAgICAgICAgICBuZXcgQXJnb24uTWVzc2FnZUNoYW5uZWxGYWN0b3J5XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgcGVybWlzc2lvblNlcnZpY2VQcm92aWRlciA9IG5ldyBBcmdvbi5QZXJtaXNzaW9uU2VydmljZVByb3ZpZGVyKHNlc3Npb25TZXJ2aWNlKTtcbiAgICAgICAgICAgIGNvbnN0IGVudGl0eVNlcnZpY2UgPSBuZXcgQXJnb24uRW50aXR5U2VydmljZShzZXNzaW9uU2VydmljZSk7XG4gICAgICAgICAgICBjb25zdCBlbnRpdHlTZXJ2aWNlUHJvdmlkZXIgPSBuZXcgQXJnb24uRW50aXR5U2VydmljZVByb3ZpZGVyKHNlc3Npb25TZXJ2aWNlLCBlbnRpdHlTZXJ2aWNlLCBwZXJtaXNzaW9uU2VydmljZVByb3ZpZGVyKTtcblxuXG4gICAgICAgICAgICBjb25zdCB0ZXN0SWQgPSBBcmdvbi5DZXNpdW0uY3JlYXRlR3VpZCgpO1xuICAgICAgICAgICAgZW50aXR5U2VydmljZS5zdWJzY3JpYmVkRXZlbnQuYWRkRXZlbnRMaXN0ZW5lcigoe2lkLCBvcHRpb25zfSk9PntcbiAgICAgICAgICAgICAgICBleHBlY3QoaWQpLnRvLmVxdWFsKHRlc3RJZCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG9wdGlvbnMpLnRvLmV4aXN0ICYmIGV4cGVjdChvcHRpb25zICYmIG9wdGlvbnNbJ3NvbWV0aGluZyddKS50by5lcXVhbCgnaGVyZScpO1xuICAgICAgICAgICAgICAgIGVudGl0eVNlcnZpY2UudW5zdWJzY3JpYmUodGVzdElkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBlbnRpdHlTZXJ2aWNlLnVuc3Vic2NyaWJlZEV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoKHtpZH0pPT57XG4gICAgICAgICAgICAgICAgZXhwZWN0KGlkKS50by5lcXVhbCh0ZXN0SWQpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZXNzaW9uU2VydmljZS5jb25uZWN0KCk7XG4gICAgICAgICAgICBlbnRpdHlTZXJ2aWNlUHJvdmlkZXIuc2Vzc2lvblVuc3Vic2NyaWJlZEV2ZW50XG4gICAgICAgICAgICBlbnRpdHlTZXJ2aWNlLnN1YnNjcmliZSh0ZXN0SWQsIHtzb21ldGhpbmc6J2hlcmUnfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgZW1pdCBzZXNzaW9uVW5zdWJzY3JpYmVkRXZlbnQgb24gcHJvdmlkZXInLCAoZG9uZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvblNlcnZpY2UgPSBuZXcgQXJnb24uU2Vzc2lvblNlcnZpY2UoXG4gICAgICAgICAgICAgICAgeyByb2xlOkFyZ29uLlJvbGUuUkVBTElUWV9NQU5BR0VSIH0sIFxuICAgICAgICAgICAgICAgIG5ldyBBcmdvbi5Mb29wYmFja0Nvbm5lY3RTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIG5ldyBBcmdvbi5TZXNzaW9uUG9ydEZhY3RvcnksXG4gICAgICAgICAgICAgICAgbmV3IEFyZ29uLk1lc3NhZ2VDaGFubmVsRmFjdG9yeVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IHBlcm1pc3Npb25TZXJ2aWNlUHJvdmlkZXIgPSBuZXcgQXJnb24uUGVybWlzc2lvblNlcnZpY2VQcm92aWRlcihzZXNzaW9uU2VydmljZSk7XG4gICAgICAgICAgICBjb25zdCBlbnRpdHlTZXJ2aWNlID0gbmV3IEFyZ29uLkVudGl0eVNlcnZpY2Uoc2Vzc2lvblNlcnZpY2UpO1xuICAgICAgICAgICAgY29uc3QgZW50aXR5U2VydmljZVByb3ZpZGVyID0gbmV3IEFyZ29uLkVudGl0eVNlcnZpY2VQcm92aWRlcihzZXNzaW9uU2VydmljZSwgZW50aXR5U2VydmljZSwgcGVybWlzc2lvblNlcnZpY2VQcm92aWRlcik7XG5cblxuICAgICAgICAgICAgY29uc3QgdGVzdElkID0gQXJnb24uQ2VzaXVtLmNyZWF0ZUd1aWQoKTtcbiAgICAgICAgICAgIGVudGl0eVNlcnZpY2VQcm92aWRlci5zZXNzaW9uU3Vic2NyaWJlZEV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoKHtpZCwgc2Vzc2lvbiwgb3B0aW9uc30pPT57XG4gICAgICAgICAgICAgICAgZXhwZWN0KGlkKS50by5lcXVhbCh0ZXN0SWQpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzZXNzaW9uKS50by5lcXVhbChzZXNzaW9uU2VydmljZS5tYW5hZ2VyKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qob3B0aW9ucykudG8uZXhpc3QgJiYgZXhwZWN0KG9wdGlvbnNbJ3NvbWV0aGluZyddKS50by5lcXVhbCgnaGVyZScpO1xuICAgICAgICAgICAgICAgIGVudGl0eVNlcnZpY2UudW5zdWJzY3JpYmUodGVzdElkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBlbnRpdHlTZXJ2aWNlUHJvdmlkZXIuc2Vzc2lvblVuc3Vic2NyaWJlZEV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoKHtpZCwgc2Vzc2lvbn0pPT57XG4gICAgICAgICAgICAgICAgZXhwZWN0KGlkKS50by5lcXVhbCh0ZXN0SWQpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzZXNzaW9uKS50by5lcXVhbChzZXNzaW9uU2VydmljZS5tYW5hZ2VyKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2Vzc2lvblNlcnZpY2UuY29ubmVjdCgpO1xuICAgICAgICAgICAgZW50aXR5U2VydmljZVByb3ZpZGVyLnNlc3Npb25VbnN1YnNjcmliZWRFdmVudFxuICAgICAgICAgICAgZW50aXR5U2VydmljZS5zdWJzY3JpYmUodGVzdElkLCB7c29tZXRoaW5nOidoZXJlJ30pO1xuICAgICAgICB9KTtcbiAgICB9KVxuXG59KTtcblxuZGVzY3JpYmUoJ1JlYWxpdHlTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBzZXNzaW9uU2VydmljZTpBcmdvbi5TZXNzaW9uU2VydmljZTtcblxuICAgIGFmdGVyRWFjaCgoKT0+e1xuICAgICAgICBpZiAoc2Vzc2lvblNlcnZpY2UpIHNlc3Npb25TZXJ2aWNlLm1hbmFnZXIuY2xvc2UoKTtcbiAgICB9KVxuICAgIFxuICAgIGRlc2NyaWJlKCduZXcgUmVhbGl0eVNlcnZpY2UoKScsICgpID0+IHtcblxuICAgICAgICBpdCgndGhlIGRlZmF1bHQgcmVhbGl0eSBzaG91bGQgYmUgdXNlZCB3aGVuIG5vIHJlYWxpdHkgaGFzIGJlZW4gcmVxdWVzdGVkJywgKGRvbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFwcCA9IG5ldyBBcmdvbi5BcmdvbkNvbnRhaW5lck1hbmFnZXIoe3JvbGU6IEFyZ29uLlJvbGUuUkVBTElUWV9NQU5BR0VSfSkuYXBwO1xuICAgICAgICAgICAgc2Vzc2lvblNlcnZpY2UgPSBhcHAuc2Vzc2lvbjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYXBwLnJlYWxpdHkuZGVmYXVsdCA9IEFyZ29uLlJlYWxpdHlWaWV3ZXIuRU1QVFk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCByZW1vdmVMaXN0ZW5lciA9IGFwcC5jb250ZXh0LnVwZGF0ZUV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZyYW1lU3RhdGUgPSBhcHAuY29udGV4dC5zZXJpYWxpemVkRnJhbWVTdGF0ZTtcbiAgICAgICAgICAgICAgICBleHBlY3QoYXBwLnJlYWxpdHkuY3VycmVudCA9PT0gQXJnb24uUmVhbGl0eVZpZXdlci5FTVBUWSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGZyYW1lU3RhdGUucmVhbGl0eSA9PT0gQXJnb24uUmVhbGl0eVZpZXdlci5FTVBUWSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGZyYW1lU3RhdGUudGltZSkudG8uaGF2ZU93blByb3BlcnR5KCdkYXlOdW1iZXInKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZnJhbWVTdGF0ZS50aW1lKS50by5oYXZlT3duUHJvcGVydHkoJ3NlY29uZHNPZkRheScpO1xuICAgICAgICAgICAgICAgIHJlbW92ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJyNyZXF1ZXN0JywgKCkgPT4ge1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmFpc2UgYW4gZXJyb3IgZm9yIHVuc3VwcG9ydGVkIHJlYWxpdGllcycsIChkb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBuZXcgQXJnb24uQXJnb25Db250YWluZXJNYW5hZ2VyKHtyb2xlOiBBcmdvbi5Sb2xlLlJFQUxJVFlfTUFOQUdFUn0pLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIGNvbnN0IHJlYWxpdHlTZXJ2aWNlOkFyZ29uLlJlYWxpdHlTZXJ2aWNlID0gY29udGFpbmVyLmdldChBcmdvbi5SZWFsaXR5U2VydmljZSk7XG4gICAgICAgICAgICBzZXNzaW9uU2VydmljZSA9IGNvbnRhaW5lci5nZXQoQXJnb24uU2Vzc2lvblNlcnZpY2UpO1xuICAgICAgICAgICAgY29udGFpbmVyLmdldChBcmdvbi5BcmdvblN5c3RlbVByb3ZpZGVyKTtcblxuICAgICAgICAgICAgc2Vzc2lvblNlcnZpY2UuY29ubmVjdCgpO1xuICAgICAgICAgICAgcmVhbGl0eVNlcnZpY2UucmVxdWVzdCgncmVhbGl0eTp1bnN1cHBvcnRlZCcpLmNhdGNoKChlcnJvcik9PntcbiAgICAgICAgICAgICAgICBleHBlY3QoZXJyb3IpLnRvLmJlLmluc3RhbmNlb2YoRXJyb3IpO1xuICAgICAgICAgICAgICAgIGRvbmUoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSk7XG5cblxuZGVzY3JpYmUoJ01lc3NhZ2VDaGFubmVsTGlrZScsICgpID0+IHtcblxuICAgIGRlc2NyaWJlKCduZXcgTWVzc2FnZUNoYW5uZWxMaWtlKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgY3JlYXRlIGFuIG9iamVjdCB0aGF0IGJlaGF2ZXMgbGlrZSB0aGUgTWVzc2FnZUNoYW5uZWwgQVBJJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZUNoYW5uZWwgPSBuZXcgQXJnb24uTWVzc2FnZUNoYW5uZWxMaWtlKCk7XG4gICAgICAgICAgICBjb25zdCBwb3J0MSA9IG1lc3NhZ2VDaGFubmVsLnBvcnQxO1xuICAgICAgICAgICAgY29uc3QgcG9ydDIgPSBtZXNzYWdlQ2hhbm5lbC5wb3J0MjtcblxuICAgICAgICAgICAgY29uc3QgcDEgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgcG9ydDEub25tZXNzYWdlID0gKGV2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChldi5kYXRhLmMpLnRvLmVxdWFsKCdkJylcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGNvbnN0IHAyID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHBvcnQyLm9ubWVzc2FnZSA9IChldikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBleHBlY3QoZXYuZGF0YS5hKS50by5lcXVhbCgnYicpXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBwb3J0MS5wb3N0TWVzc2FnZSh7IGE6ICdiJyB9KTtcbiAgICAgICAgICAgIHBvcnQyLnBvc3RNZXNzYWdlKHsgYzogJ2QnIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3AxLCBwMl0pO1xuICAgICAgICB9KTtcbiAgICB9KVxuXG59KTtcblxuZGVzY3JpYmUoJ1Nlc3Npb25Qb3J0JywgKCkgPT4ge1xuXG4gICAgZGVzY3JpYmUoJ25ldyBTZXNzaW9uUG9ydCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSBhIFNlc3Npb25Qb3J0IG9iamVjdCcsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb24gPSBuZXcgQXJnb24uU2Vzc2lvblBvcnQoKTtcbiAgICAgICAgICAgIGV4cGVjdChzZXNzaW9uKS50by5iZS5pbnN0YW5jZW9mKEFyZ29uLlNlc3Npb25Qb3J0KTtcbiAgICAgICAgfSk7XG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCcjb3BlbicsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjb25uZWN0IHR3byBzZXNzaW9ucycsIChkb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gbmV3IEFyZ29uLlNlc3Npb25Qb3J0KCk7XG4gICAgICAgICAgICBjb25zdCByZW1vdGVTZXNzaW9uID0gbmV3IEFyZ29uLlNlc3Npb25Qb3J0KCk7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlQ2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbDtcbiAgICAgICAgICAgIGxldCBjb25uZWN0Q291bnQgPSAwO1xuICAgICAgICAgICAgc2Vzc2lvbi5jb25uZWN0RXZlbnQuYWRkRXZlbnRMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlc3Npb24uaW5mby5yb2xlKS50by5lcXVhbChBcmdvbi5Sb2xlLlJFQUxJVFlfTUFOQUdFUik7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlc3Npb24uaW5mby51c2VyRGF0YS50ZXN0KS50by5lcXVhbCgnZGVmJyk7XG4gICAgICAgICAgICAgICAgY2hlY2tEb25lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVtb3RlU2Vzc2lvbi5jb25uZWN0RXZlbnQuYWRkRXZlbnRMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlbW90ZVNlc3Npb24uaW5mby5yb2xlKS50by5lcXVhbChBcmdvbi5Sb2xlLlJFQUxJVFlfQVVHTUVOVEVSKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVtb3RlU2Vzc2lvbi5pbmZvLnVzZXJEYXRhLnRlc3QpLnRvLmVxdWFsKCdhYmMnKTtcbiAgICAgICAgICAgICAgICBjaGVja0RvbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzZXNzaW9uLm9wZW4obWVzc2FnZUNoYW5uZWwucG9ydDEsIHsgcm9sZTogQXJnb24uUm9sZS5SRUFMSVRZX0FVR01FTlRFUiwgdXNlckRhdGE6IHsgdGVzdDogJ2FiYycgfSB9KTtcbiAgICAgICAgICAgIHJlbW90ZVNlc3Npb24ub3BlbihtZXNzYWdlQ2hhbm5lbC5wb3J0MiwgeyByb2xlOiBBcmdvbi5Sb2xlLlJFQUxJVFlfTUFOQUdFUiwgdXNlckRhdGE6IHsgdGVzdDogJ2RlZicgfSB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tEb25lKCkge1xuICAgICAgICAgICAgICAgIGNvbm5lY3RDb3VudCsrO1xuICAgICAgICAgICAgICAgIGlmIChjb25uZWN0Q291bnQgPT0gMikgZG9uZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGl0KCdzaG91bGQgY29ubmVjdCB0d28gc2Vzc2lvbnMgKHBvbHlmaWxsKScsIChkb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gbmV3IEFyZ29uLlNlc3Npb25Qb3J0KCk7XG4gICAgICAgICAgICBjb25zdCByZW1vdGVTZXNzaW9uID0gbmV3IEFyZ29uLlNlc3Npb25Qb3J0KCk7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlQ2hhbm5lbCA9IG5ldyBBcmdvbi5NZXNzYWdlQ2hhbm5lbExpa2U7XG4gICAgICAgICAgICBsZXQgY29ubmVjdENvdW50ID0gMDtcbiAgICAgICAgICAgIHNlc3Npb24uY29ubmVjdEV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChzZXNzaW9uLmluZm8ucm9sZSkudG8uZXF1YWwoQXJnb24uUm9sZS5SRUFMSVRZX01BTkFHRVIpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzZXNzaW9uLmluZm8udXNlckRhdGEudGVzdCkudG8uZXF1YWwoJ2RlZicpO1xuICAgICAgICAgICAgICAgIGNoZWNrRG9uZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlbW90ZVNlc3Npb24uY29ubmVjdEV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZW1vdGVTZXNzaW9uLmluZm8ucm9sZSkudG8uZXF1YWwoQXJnb24uUm9sZS5SRUFMSVRZX0FVR01FTlRFUik7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlbW90ZVNlc3Npb24uaW5mby51c2VyRGF0YS50ZXN0KS50by5lcXVhbCgnYWJjJyk7XG4gICAgICAgICAgICAgICAgY2hlY2tEb25lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgc2Vzc2lvbi5vcGVuKG1lc3NhZ2VDaGFubmVsLnBvcnQxLCB7IHJvbGU6IEFyZ29uLlJvbGUuUkVBTElUWV9BVUdNRU5URVIsIHVzZXJEYXRhOiB7IHRlc3Q6ICdhYmMnIH0gfSk7XG4gICAgICAgICAgICByZW1vdGVTZXNzaW9uLm9wZW4obWVzc2FnZUNoYW5uZWwucG9ydDIsIHsgcm9sZTogQXJnb24uUm9sZS5SRUFMSVRZX01BTkFHRVIsIHVzZXJEYXRhOiB7IHRlc3Q6ICdkZWYnIH0gfSk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrRG9uZSgpIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0Q291bnQrKztcbiAgICAgICAgICAgICAgICBpZiAoY29ubmVjdENvdW50ID09IDIpIGRvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpdCgnc2hvdWxkIGNvbm5lY3QgdHdvIHNlc3Npb25zIChzeW5jaHJvbm91cyknLCAoZG9uZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IG5ldyBBcmdvbi5TZXNzaW9uUG9ydCgpO1xuICAgICAgICAgICAgY29uc3QgcmVtb3RlU2Vzc2lvbiA9IG5ldyBBcmdvbi5TZXNzaW9uUG9ydCgpO1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZUNoYW5uZWwgPSBuZXcgQXJnb24uU3luY2hyb25vdXNNZXNzYWdlQ2hhbm5lbDtcbiAgICAgICAgICAgIGxldCBjb25uZWN0Q291bnQgPSAwO1xuICAgICAgICAgICAgc2Vzc2lvbi5jb25uZWN0RXZlbnQuYWRkRXZlbnRMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlc3Npb24uaW5mby5yb2xlKS50by5lcXVhbChBcmdvbi5Sb2xlLlJFQUxJVFlfTUFOQUdFUik7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlc3Npb24uaW5mby51c2VyRGF0YS50ZXN0KS50by5lcXVhbCgnZGVmJyk7XG4gICAgICAgICAgICAgICAgY2hlY2tEb25lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVtb3RlU2Vzc2lvbi5jb25uZWN0RXZlbnQuYWRkRXZlbnRMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlbW90ZVNlc3Npb24uaW5mby5yb2xlKS50by5lcXVhbChBcmdvbi5Sb2xlLlJFQUxJVFlfQVVHTUVOVEVSKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVtb3RlU2Vzc2lvbi5pbmZvLnVzZXJEYXRhLnRlc3QpLnRvLmVxdWFsKCdhYmMnKTtcbiAgICAgICAgICAgICAgICBjaGVja0RvbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzZXNzaW9uLm9wZW4obWVzc2FnZUNoYW5uZWwucG9ydDEsIHsgcm9sZTogQXJnb24uUm9sZS5SRUFMSVRZX0FVR01FTlRFUiwgdXNlckRhdGE6IHsgdGVzdDogJ2FiYycgfSB9KTtcbiAgICAgICAgICAgIHJlbW90ZVNlc3Npb24ub3BlbihtZXNzYWdlQ2hhbm5lbC5wb3J0MiwgeyByb2xlOiBBcmdvbi5Sb2xlLlJFQUxJVFlfTUFOQUdFUiwgdXNlckRhdGE6IHsgdGVzdDogJ2RlZicgfSB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tEb25lKCkge1xuICAgICAgICAgICAgICAgIGNvbm5lY3RDb3VudCsrO1xuICAgICAgICAgICAgICAgIGlmIChjb25uZWN0Q291bnQgPT0gMikgZG9uZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAgICAgXG4gICAgZGVzY3JpYmUoJyNjbG9zZScsICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGl0KCdzaG91bGQgZW1pdCBjbG9zZSBldmVudHMgdG8gYm90aCBzZXNzaW9ucycsIChkb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gbmV3IEFyZ29uLlNlc3Npb25Qb3J0KCk7XG4gICAgICAgICAgICBjb25zdCByZW1vdGVTZXNzaW9uID0gbmV3IEFyZ29uLlNlc3Npb25Qb3J0KCk7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlQ2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbDtcbiAgICAgICAgICAgIGxldCBjb25uZWN0Q291bnQgPSAwO1xuICAgICAgICAgICAgc2Vzc2lvbi5jbG9zZUV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNoZWNrRG9uZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlbW90ZVNlc3Npb24uY2xvc2VFdmVudC5hZGRFdmVudExpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjaGVja0RvbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzZXNzaW9uLm9wZW4obWVzc2FnZUNoYW5uZWwucG9ydDEsIHsgcm9sZTogQXJnb24uUm9sZS5SRUFMSVRZX0FVR01FTlRFUiB9KTtcbiAgICAgICAgICAgIHJlbW90ZVNlc3Npb24ub3BlbihtZXNzYWdlQ2hhbm5lbC5wb3J0MiwgeyByb2xlOiBBcmdvbi5Sb2xlLlJFQUxJVFlfTUFOQUdFUiB9KTtcbiAgICAgICAgICAgIHNlc3Npb24uY2xvc2UoKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrRG9uZSgpIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0Q291bnQrKztcbiAgICAgICAgICAgICAgICBpZiAoY29ubmVjdENvdW50ID09IDIpIGRvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpdCgnc2hvdWxkIGVtaXQgY2xvc2UgZXZlbnRzIHRvIGJvdGggc2Vzc2lvbnMgKHBvbHlmaWxsKScsIChkb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gbmV3IEFyZ29uLlNlc3Npb25Qb3J0KCk7XG4gICAgICAgICAgICBjb25zdCByZW1vdGVTZXNzaW9uID0gbmV3IEFyZ29uLlNlc3Npb25Qb3J0KCk7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlQ2hhbm5lbCA9IG5ldyBBcmdvbi5NZXNzYWdlQ2hhbm5lbExpa2U7XG4gICAgICAgICAgICBsZXQgY29ubmVjdENvdW50ID0gMDtcbiAgICAgICAgICAgIHNlc3Npb24uY2xvc2VFdmVudC5hZGRFdmVudExpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjaGVja0RvbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZW1vdGVTZXNzaW9uLmNsb3NlRXZlbnQuYWRkRXZlbnRMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2hlY2tEb25lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgc2Vzc2lvbi5vcGVuKG1lc3NhZ2VDaGFubmVsLnBvcnQxLCB7IHJvbGU6IEFyZ29uLlJvbGUuUkVBTElUWV9BVUdNRU5URVIgfSk7XG4gICAgICAgICAgICByZW1vdGVTZXNzaW9uLm9wZW4obWVzc2FnZUNoYW5uZWwucG9ydDIsIHsgcm9sZTogQXJnb24uUm9sZS5SRUFMSVRZX01BTkFHRVIgfSk7XG4gICAgICAgICAgICBzZXNzaW9uLmNsb3NlKCk7XG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja0RvbmUoKSB7XG4gICAgICAgICAgICAgICAgY29ubmVjdENvdW50Kys7XG4gICAgICAgICAgICAgICAgaWYgKGNvbm5lY3RDb3VudCA9PSAyKSBkb25lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaXQoJ3Nob3VsZCBlbWl0IGNsb3NlIGV2ZW50cyB0byBib3RoIHNlc3Npb25zIChzeW5jaHJvbm91cyknLCAoZG9uZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IG5ldyBBcmdvbi5TZXNzaW9uUG9ydCgpO1xuICAgICAgICAgICAgY29uc3QgcmVtb3RlU2Vzc2lvbiA9IG5ldyBBcmdvbi5TZXNzaW9uUG9ydCgpO1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZUNoYW5uZWwgPSBuZXcgQXJnb24uU3luY2hyb25vdXNNZXNzYWdlQ2hhbm5lbDtcbiAgICAgICAgICAgIGxldCBjb25uZWN0Q291bnQgPSAwO1xuICAgICAgICAgICAgc2Vzc2lvbi5jbG9zZUV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNoZWNrRG9uZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlbW90ZVNlc3Npb24uY2xvc2VFdmVudC5hZGRFdmVudExpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjaGVja0RvbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzZXNzaW9uLm9wZW4obWVzc2FnZUNoYW5uZWwucG9ydDEsIHsgcm9sZTogQXJnb24uUm9sZS5SRUFMSVRZX0FVR01FTlRFUiB9KTtcbiAgICAgICAgICAgIHJlbW90ZVNlc3Npb24ub3BlbihtZXNzYWdlQ2hhbm5lbC5wb3J0MiwgeyByb2xlOiBBcmdvbi5Sb2xlLlJFQUxJVFlfTUFOQUdFUiB9KTtcbiAgICAgICAgICAgIHNlc3Npb24uY2xvc2UoKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrRG9uZSgpIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0Q291bnQrKztcbiAgICAgICAgICAgICAgICBpZiAoY29ubmVjdENvdW50ID09IDIpIGRvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cblxuICAgIGRlc2NyaWJlKCcjc2VuZCcsICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGl0KCdzaG91bGQgc2VuZCBtZXNzYWdlcyBiZXR3ZWVuIHR3byBzZXNzaW9ucycsIChkb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gbmV3IEFyZ29uLlNlc3Npb25Qb3J0KCk7XG4gICAgICAgICAgICBjb25zdCByZW1vdGVTZXNzaW9uID0gbmV3IEFyZ29uLlNlc3Npb25Qb3J0KCk7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlQ2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICAgICAgc2Vzc2lvbi5vblsndGVzdC5tZXNzYWdlJ10gPSAobWVzc2FnZTp7aGk6bnVtYmVyfSwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBleHBlY3QobWVzc2FnZS5oaSkudG8uZXF1YWwoNDIpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlc3Npb24ub3BlbihtZXNzYWdlQ2hhbm5lbC5wb3J0MSwgeyByb2xlOiBBcmdvbi5Sb2xlLlJFQUxJVFlfQVVHTUVOVEVSIH0pO1xuICAgICAgICAgICAgcmVtb3RlU2Vzc2lvbi5vcGVuKG1lc3NhZ2VDaGFubmVsLnBvcnQyLCB7IHJvbGU6IEFyZ29uLlJvbGUuUkVBTElUWV9BVUdNRU5URVIgfSk7XG4gICAgICAgICAgICByZW1vdGVTZXNzaW9uLnNlbmQoJ3Rlc3QubWVzc2FnZScsIHsgaGk6IDQyIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNlbmQgbWVzc2FnZXMgYmV0d2VlbiB0d28gc2Vzc2lvbnMgKHBvbHlmaWxsKScsIChkb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gbmV3IEFyZ29uLlNlc3Npb25Qb3J0KCk7XG4gICAgICAgICAgICBjb25zdCByZW1vdGVTZXNzaW9uID0gbmV3IEFyZ29uLlNlc3Npb25Qb3J0KCk7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlQ2hhbm5lbCA9IG5ldyBBcmdvbi5NZXNzYWdlQ2hhbm5lbExpa2UoKTtcbiAgICAgICAgICAgIHNlc3Npb24ub25bJ3Rlc3QubWVzc2FnZSddID0gKG1lc3NhZ2U6e2hpOm51bWJlcn0sIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG1lc3NhZ2UuaGkpLnRvLmVxdWFsKDQyKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXNzaW9uLm9wZW4obWVzc2FnZUNoYW5uZWwucG9ydDEsIHsgcm9sZTogQXJnb24uUm9sZS5SRUFMSVRZX0FVR01FTlRFUiB9KTtcbiAgICAgICAgICAgIHJlbW90ZVNlc3Npb24ub3BlbihtZXNzYWdlQ2hhbm5lbC5wb3J0MiwgeyByb2xlOiBBcmdvbi5Sb2xlLlJFQUxJVFlfQVVHTUVOVEVSIH0pO1xuICAgICAgICAgICAgcmVtb3RlU2Vzc2lvbi5zZW5kKCd0ZXN0Lm1lc3NhZ2UnLCB7IGhpOiA0MiB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzZW5kIG1lc3NhZ2VzIGJldHdlZW4gdHdvIHNlc3Npb25zIChzeW5jaHJvbm91cyknLCAoZG9uZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IG5ldyBBcmdvbi5TZXNzaW9uUG9ydCgpO1xuICAgICAgICAgICAgY29uc3QgcmVtb3RlU2Vzc2lvbiA9IG5ldyBBcmdvbi5TZXNzaW9uUG9ydCgpO1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZUNoYW5uZWwgPSBuZXcgQXJnb24uTWVzc2FnZUNoYW5uZWxMaWtlKCk7XG4gICAgICAgICAgICBzZXNzaW9uLm9uWyd0ZXN0Lm1lc3NhZ2UnXSA9IChtZXNzYWdlOntoaTpudW1iZXJ9LCBldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChtZXNzYWdlLmhpKS50by5lcXVhbCg0Mik7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2Vzc2lvbi5vcGVuKG1lc3NhZ2VDaGFubmVsLnBvcnQxLCB7IHJvbGU6IEFyZ29uLlJvbGUuUkVBTElUWV9BVUdNRU5URVIgfSk7XG4gICAgICAgICAgICByZW1vdGVTZXNzaW9uLm9wZW4obWVzc2FnZUNoYW5uZWwucG9ydDIsIHsgcm9sZTogQXJnb24uUm9sZS5SRUFMSVRZX0FVR01FTlRFUiB9KTtcbiAgICAgICAgICAgIHJlbW90ZVNlc3Npb24uc2VuZCgndGVzdC5tZXNzYWdlJywgeyBoaTogNDIgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pXG5cbn0pO1xuXG5kZXNjcmliZSgnQ29tbWFuZFF1ZXVlJywgKCkgPT4ge1xuXG4gICAgZGVzY3JpYmUoJ25ldyBDb21tYW5kUXVldWUoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjcmVhdGUgYSBDb21tYW5kUXVldWUgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcXVldWUgPSBuZXcgQXJnb24uQ29tbWFuZFF1ZXVlKCk7XG4gICAgICAgICAgICBleHBlY3QocXVldWUpLnRvLmJlLmluc3RhbmNlb2YoQXJnb24uQ29tbWFuZFF1ZXVlKTtcbiAgICAgICAgfSk7XG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCcjcHVzaCcsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBwdXNoIGFuZCBleGVjdXRlIGNvbW1hbmRzIGluIHNlcmlhbCcsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXVlID0gbmV3IEFyZ29uLkNvbW1hbmRRdWV1ZSgpO1xuICAgICAgICAgICAgbGV0IHggPSAxO1xuICAgICAgICAgICAgcXVldWUucHVzaCgoKSA9PiArK3gpXG4gICAgICAgICAgICBxdWV1ZS5wdXNoKCgpID0+IGV4cGVjdCh4KS50by5lcXVhbCgyKSlcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IDEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcXVldWUucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHgpLnRvLmVxdWFsKDEwKVxuICAgICAgICAgICAgICAgIHgrKztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXVlLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdCh4KS50by5lcXVhbCgxMSk7XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCcjY2xlYXInLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgY2xlYXIgcGVuZGluZyBjb21tYW5kcycsIChkb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBxdWV1ZSA9IG5ldyBBcmdvbi5Db21tYW5kUXVldWUoKTtcbiAgICAgICAgICAgIGxldCB4ID0gMTtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goKCkgPT4gKyt4KVxuICAgICAgICAgICAgcXVldWUucHVzaCgoKSA9PiBleHBlY3QoeCkudG8uZXF1YWwoMikpXG4gICAgICAgICAgICBxdWV1ZS5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBleHBlY3QoeCkudG8uZXF1YWwoMTAyKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4ICs9IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgICAgICAgICB9LCAxNSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcXVldWUucHVzaCgoKSA9PiB4ID0gMTUpLmNhdGNoKCgpPT57fSk7XG4gICAgICAgICAgICBxdWV1ZS5leGVjdXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pXG5cblxuICAgIGRlc2NyaWJlKCcjZXJyb3JFdmVudCcsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBlbWl0IHRocm93biBlcnJvcnMnLCAoZG9uZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcXVldWUgPSBuZXcgQXJnb24uQ29tbWFuZFF1ZXVlKCk7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EnKVxuICAgICAgICAgICAgfSkuY2F0Y2goKCk9Pnt9KTtcbiAgICAgICAgICAgIHF1ZXVlLmVycm9yRXZlbnQuYWRkRXZlbnRMaXN0ZW5lcigoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGVycm9yLm1lc3NhZ2UpLnRvLmVxdWFsKCdBJyk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBxdWV1ZS5leGVjdXRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGVtaXQgcHJvbWlzZSByZWplY3Rpb25zJywgKGRvbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXVlID0gbmV3IEFyZ29uLkNvbW1hbmRRdWV1ZSgpO1xuICAgICAgICAgICAgcXVldWUucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignQicpKVxuICAgICAgICAgICAgfSkuY2F0Y2goKCk9Pnt9KTtcbiAgICAgICAgICAgIHF1ZXVlLmVycm9yRXZlbnQuYWRkRXZlbnRMaXN0ZW5lcigoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGVycm9yLm1lc3NhZ2UpLnRvLmVxdWFsKCdCJyk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBxdWV1ZS5leGVjdXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pXG5cbn0pO1xuXG5kZXNjcmliZSgnQ29udGV4dCcsICgpID0+IHtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVN5c3RlbSgpIHtcbiAgICAgICAgcmV0dXJuIEFyZ29uLmluaXQobnVsbCwge3JvbGU6IEFyZ29uLlJvbGUuUkVBTElUWV9NQU5BR0VSfSk7XG4gICAgfVxuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgaWYgKEFyZ29uLkFyZ29uU3lzdGVtLmluc3RhbmNlKVxuICAgICAgICAgICAgQXJnb24uQXJnb25TeXN0ZW0uaW5zdGFuY2UuZGVzdHJveSgpO1xuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnbmV3IENvbnRleHQoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjcmVhdGUgYSBDb250ZXh0IG9iamVjdCcsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHtjb250ZXh0fSA9IGNyZWF0ZVN5c3RlbSgpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbnRleHQpLnRvLmJlLmluc3RhbmNlb2YoQXJnb24uQ29udGV4dFNlcnZpY2UpO1xuICAgICAgICB9KVxuICAgICAgICBpdCgnc2hvdWxkIGVtaXQgdXBkYXRlIGV2ZW50cyB3aXRoIGRlZmF1bHQgcmVhbGl0eScsIChkb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7Y29udGV4dCwgcmVhbGl0eX0gPSBjcmVhdGVTeXN0ZW0oKTtcbiAgICAgICAgICAgIGV4cGVjdChyZWFsaXR5LmRlZmF1bHQpLnRvLmVxdWFsKEFyZ29uLlJlYWxpdHlWaWV3ZXIuRU1QVFkpO1xuICAgICAgICAgICAgbGV0IHJlbW92ZUxpc3RlbmVyID0gY29udGV4dC51cGRhdGVFdmVudC5hZGRFdmVudExpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBleHBlY3QoQXJnb24uUmVhbGl0eVZpZXdlci5nZXRUeXBlKGNvbnRleHQuc2VyaWFsaXplZEZyYW1lU3RhdGUhLnJlYWxpdHkpKS50by5lcXVhbCgnZW1wdHknKTtcbiAgICAgICAgICAgICAgICByZW1vdmVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCcjZ2V0RW50aXR5UG9zZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Bvc2VTdGF0dXMgc2hvdWxkIG5vdCBoYXZlIEtOT1dOIGJpdCBzZXQgd2hlbiBwb3NlIGlzIHVuZGVmaW5lZCcsIChkb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7Y29udGV4dH0gPSBjcmVhdGVTeXN0ZW0oKTtcbiAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IG5ldyBBcmdvbi5DZXNpdW0uRW50aXR5O1xuICAgICAgICAgICAgbGV0IHJlbW92ZUxpc3RlbmVyID0gY29udGV4dC51cGRhdGVFdmVudC5hZGRFdmVudExpc3RlbmVyKCgpPT57XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBjb250ZXh0LmdldEVudGl0eVBvc2UoZW50aXR5KTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3RhdGUuc3RhdHVzICYgQXJnb24uUG9zZVN0YXR1cy5LTk9XTikudG8uZXF1YWwoMCk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBpdCgncG9zZVN0YXR1cyBzaG91bGQgaGF2ZSBQb3NlU3RhdHVzLkZPVU5EICYgUG9zZVN0YXR1cy5LTk9XTiB3aGVuIHBvc2UgaXMgZm91bmQnLCAoZG9uZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qge2NvbnRleHR9ID0gY3JlYXRlU3lzdGVtKCk7XG4gICAgICAgICAgICBjb25zdCBlbnRpdHkgPSBuZXcgQXJnb24uQ2VzaXVtLkVudGl0eSh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IG5ldyBBcmdvbi5DZXNpdW0uQ29uc3RhbnRQb3NpdGlvblByb3BlcnR5KEFyZ29uLkNlc2l1bS5DYXJ0ZXNpYW4zLlpFUk8sIGNvbnRleHQuZ2V0RGVmYXVsdFJlZmVyZW5jZUZyYW1lKCkpLFxuICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uOiBuZXcgQXJnb24uQ2VzaXVtLkNvbnN0YW50UHJvcGVydHkoQXJnb24uQ2VzaXVtLlF1YXRlcm5pb24uSURFTlRJVFkpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCByZW1vdmVMaXN0ZW5lciA9IGNvbnRleHQudXBkYXRlRXZlbnQuYWRkRXZlbnRMaXN0ZW5lcigoKT0+e1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gY29udGV4dC5nZXRFbnRpdHlQb3NlKGVudGl0eSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHN0YXRlLnN0YXR1cyAmIEFyZ29uLlBvc2VTdGF0dXMuRk9VTkQpLnRvLmJlLm9rO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5zdGF0dXMgJiBBcmdvbi5Qb3NlU3RhdHVzLktOT1dOKS50by5iZS5vaztcbiAgICAgICAgICAgICAgICByZW1vdmVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGl0KCdwb3NlU3RhdHVzIHNob3VsZCBoYXZlIFBvc2VTdGF0dXMuTE9TVCB3aGVuIHBvc2UgaXMgbG9zdCcsIChkb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7Y29udGV4dH0gPSBjcmVhdGVTeXN0ZW0oKTtcbiAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IG5ldyBBcmdvbi5DZXNpdW0uRW50aXR5KHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogbmV3IEFyZ29uLkNlc2l1bS5Db25zdGFudFBvc2l0aW9uUHJvcGVydHkoQXJnb24uQ2VzaXVtLkNhcnRlc2lhbjMuWkVSTywgY29udGV4dC5nZXREZWZhdWx0UmVmZXJlbmNlRnJhbWUoKSksXG4gICAgICAgICAgICAgICAgb3JpZW50YXRpb246IG5ldyBBcmdvbi5DZXNpdW0uQ29uc3RhbnRQcm9wZXJ0eShBcmdvbi5DZXNpdW0uUXVhdGVybmlvbi5JREVOVElUWSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgcmVtb3ZlTGlzdGVuZXIgPSBjb250ZXh0LnVwZGF0ZUV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoKCk9PntcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGNvbnRleHQuZ2V0RW50aXR5UG9zZShlbnRpdHkpO1xuICAgICAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHN0YXRlLnN0YXR1cyAmIEFyZ29uLlBvc2VTdGF0dXMuRk9VTkQpLnRvLmJlLm9rO1xuICAgICAgICAgICAgICAgICAgICBleHBlY3Qoc3RhdGUuc3RhdHVzICYgQXJnb24uUG9zZVN0YXR1cy5LTk9XTikudG8uYmUub2s7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5zdGF0dXMgJiBBcmdvbi5Qb3NlU3RhdHVzLkxPU1QpLnRvLm5vdC5iZS5vaztcbiAgICAgICAgICAgICAgICAgICAgKDxBcmdvbi5DZXNpdW0uQ29uc3RhbnRQb3NpdGlvblByb3BlcnR5PmVudGl0eS5wb3NpdGlvbikuc2V0VmFsdWUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5zdGF0dXMgJiBBcmdvbi5Qb3NlU3RhdHVzLkxPU1QpLnRvLmJlLm9rO1xuICAgICAgICAgICAgICAgICAgICBleHBlY3Qoc3RhdGUuc3RhdHVzICYgQXJnb24uUG9zZVN0YXR1cy5GT1VORCkudG8ubm90LmJlLm9rO1xuICAgICAgICAgICAgICAgICAgICBleHBlY3Qoc3RhdGUuc3RhdHVzICYgQXJnb24uUG9zZVN0YXR1cy5LTk9XTikudG8ubm90LmJlLm9rO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG59KVxuXG5kZXNjcmliZSgnVnVmb3JpYVNlcnZpY2UnLCAoKSA9PiB7XG5cbiAgICBkZXNjcmliZSgnI2lzQXZhaWxhYmxlJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHJlc29sdmUgYXIudnVmb3JpYS5pc0F2YWlsYWJsZSByZXF1ZXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvblNlcnZpY2UgPSBuZXcgQXJnb24uU2Vzc2lvblNlcnZpY2UoXG4gICAgICAgICAgICAgICAgeyByb2xlOkFyZ29uLlJvbGUuUkVBTElUWV9NQU5BR0VSIH0sIFxuICAgICAgICAgICAgICAgIG5ldyBBcmdvbi5Mb29wYmFja0Nvbm5lY3RTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIG5ldyBBcmdvbi5TZXNzaW9uUG9ydEZhY3RvcnksXG4gICAgICAgICAgICAgICAgbmV3IEFyZ29uLk1lc3NhZ2VDaGFubmVsRmFjdG9yeVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IHZ1Zm9yaWFTZXJ2aWNlID0gbmV3IEFyZ29uLlZ1Zm9yaWFTZXJ2aWNlKHNlc3Npb25TZXJ2aWNlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2Vzc2lvblNlcnZpY2UuY29ubmVjdEV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoKHNlc3Npb24pPT57XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5vblsnYXIudnVmb3JpYS5pc0F2YWlsYWJsZSddID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHthdmFpbGFibGU6dHJ1ZX0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlc3Npb25TZXJ2aWNlLmNvbm5lY3QoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHZ1Zm9yaWFTZXJ2aWNlLmlzQXZhaWxhYmxlKCkudGhlbigoYXZhaWxhYmxlKT0+e1xuICAgICAgICAgICAgICAgIGV4cGVjdChhdmFpbGFibGUpLnRvLmJlLnRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCcjaW5pdCcsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXNvbHZlIHdpdGggQXJnb24uVnVmb3JpYUFQSSBpbnN0YW5jZSB1cG9uIHN1Y2Nlc3MnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uU2VydmljZSA9IG5ldyBBcmdvbi5TZXNzaW9uU2VydmljZShcbiAgICAgICAgICAgICAgICB7IHJvbGU6QXJnb24uUm9sZS5SRUFMSVRZX01BTkFHRVIgfSwgXG4gICAgICAgICAgICAgICAgbmV3IEFyZ29uLkxvb3BiYWNrQ29ubmVjdFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgbmV3IEFyZ29uLlNlc3Npb25Qb3J0RmFjdG9yeSxcbiAgICAgICAgICAgICAgICBuZXcgQXJnb24uTWVzc2FnZUNoYW5uZWxGYWN0b3J5XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgdnVmb3JpYVNlcnZpY2UgPSBuZXcgQXJnb24uVnVmb3JpYVNlcnZpY2Uoc2Vzc2lvblNlcnZpY2UpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzZXNzaW9uU2VydmljZS5jb25uZWN0RXZlbnQuYWRkRXZlbnRMaXN0ZW5lcigoc2Vzc2lvbik9PntcbiAgICAgICAgICAgICAgICBzZXNzaW9uLm9uWydhci52dWZvcmlhLmluaXQnXSA9IChvcHRpb25zOntlbmNyeXB0ZWRMaWNlbnNlRGF0YTpzdHJpbmd9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChvcHRpb25zLmVuY3J5cHRlZExpY2Vuc2VEYXRhKS50by5lcXVhbCgndGVzdCcpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2Vzc2lvblNlcnZpY2UuY29ubmVjdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdnVmb3JpYVNlcnZpY2UuaW5pdCh7IGVuY3J5cHRlZExpY2Vuc2VEYXRhOiAndGVzdCcgfSkudGhlbigoYXBpKT0+e1xuICAgICAgICAgICAgICAgIGV4cGVjdChhcGkpLnRvLmJlLmluc3RhbmNlb2YoQXJnb24uVnVmb3JpYUFQSSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSlcbn0pXG5cbmRlc2NyaWJlKCdVdGlscycsICgpID0+IHtcblxuICAgIGRlc2NyaWJlKCdkZWNvbXBvc2VQZXJzcGVjdGl2ZU9mZkNlbnRlclByb2plY3Rpb25NYXRyaXgnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgY29ycmVjdGx5IGRlY29tcG9zZSBhIHBlcnNwZWN0aXZlIG9mZiBjZW50ZXIgcHJvamVjdGlvbiBtYXRyaXgnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcnVzdHVtID0gbmV3IEFyZ29uLkNlc2l1bS5QZXJzcGVjdGl2ZU9mZkNlbnRlckZydXN0dW07XG4gICAgICAgICAgICBmcnVzdHVtLmxlZnQgPSAtMTtcbiAgICAgICAgICAgIGZydXN0dW0ucmlnaHQgPSAyO1xuICAgICAgICAgICAgZnJ1c3R1bS50b3AgPSAtMztcbiAgICAgICAgICAgIGZydXN0dW0uYm90dG9tID0gNDtcbiAgICAgICAgICAgIGZydXN0dW0ubmVhciA9IDU7XG4gICAgICAgICAgICBmcnVzdHVtLmZhciA9IDY7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBBcmdvbi5kZWNvbXBvc2VQZXJzcGVjdGl2ZU9mZkNlbnRlclByb2plY3Rpb25NYXRyaXgoXG4gICAgICAgICAgICAgICAgZnJ1c3R1bS5wcm9qZWN0aW9uTWF0cml4LCBcbiAgICAgICAgICAgICAgICBuZXcgQXJnb24uQ2VzaXVtLlBlcnNwZWN0aXZlT2ZmQ2VudGVyRnJ1c3R1bVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IENlc2l1bU1hdGggPSBBcmdvbi5DZXNpdW0uQ2VzaXVtTWF0aDtcbiAgICAgICAgICAgIGV4cGVjdChDZXNpdW1NYXRoLmVxdWFsc0Vwc2lsb24oZnJ1c3R1bS5sZWZ0LCByZXN1bHQubGVmdCwgQ2VzaXVtTWF0aC5FUFNJTE9OMTApKS50by5iZS50cnVlO1xuICAgICAgICAgICAgZXhwZWN0KENlc2l1bU1hdGguZXF1YWxzRXBzaWxvbihmcnVzdHVtLnJpZ2h0LCByZXN1bHQucmlnaHQsIENlc2l1bU1hdGguRVBTSUxPTjEwKSkudG8uYmUudHJ1ZTtcbiAgICAgICAgICAgIGV4cGVjdChDZXNpdW1NYXRoLmVxdWFsc0Vwc2lsb24oZnJ1c3R1bS50b3AsIHJlc3VsdC50b3AsIENlc2l1bU1hdGguRVBTSUxPTjEwKSkudG8uYmUudHJ1ZTtcbiAgICAgICAgICAgIGV4cGVjdChDZXNpdW1NYXRoLmVxdWFsc0Vwc2lsb24oZnJ1c3R1bS5ib3R0b20sIHJlc3VsdC5ib3R0b20sIENlc2l1bU1hdGguRVBTSUxPTjEwKSkudG8uYmUudHJ1ZTtcbiAgICAgICAgICAgIGV4cGVjdChDZXNpdW1NYXRoLmVxdWFsc0Vwc2lsb24oZnJ1c3R1bS5uZWFyLCByZXN1bHQubmVhciwgQ2VzaXVtTWF0aC5FUFNJTE9OMTApKS50by5iZS50cnVlO1xuICAgICAgICAgICAgZXhwZWN0KENlc2l1bU1hdGguZXF1YWxzRXBzaWxvbihmcnVzdHVtLmZhciwgcmVzdWx0LmZhciwgQ2VzaXVtTWF0aC5FUFNJTE9OMTApKS50by5iZS50cnVlO1xuICAgICAgICB9KTtcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ2RlY29tcG9zZVBlcnNwZWN0aXZlUHJvamVjdGlvbk1hdHJpeCcsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgZGVjb21wb3NlIGEgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBtYXRyaXgnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcnVzdHVtID0gbmV3IEFyZ29uLkNlc2l1bS5QZXJzcGVjdGl2ZUZydXN0dW07XG4gICAgICAgICAgICBmcnVzdHVtLmZvdiA9IE1hdGguUEkgLyAyO1xuICAgICAgICAgICAgZnJ1c3R1bS5uZWFyID0gMC4wMTtcbiAgICAgICAgICAgIGZydXN0dW0uZmFyID0gMTAwMDA7XG4gICAgICAgICAgICBmcnVzdHVtLmFzcGVjdFJhdGlvID0gMC43NTtcbiAgICAgICAgICAgIGZydXN0dW0ueE9mZnNldCA9IDQyO1xuICAgICAgICAgICAgZnJ1c3R1bS55T2Zmc2V0ID0gMTU7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBBcmdvbi5kZWNvbXBvc2VQZXJzcGVjdGl2ZVByb2plY3Rpb25NYXRyaXgoXG4gICAgICAgICAgICAgICAgZnJ1c3R1bS5wcm9qZWN0aW9uTWF0cml4LCBcbiAgICAgICAgICAgICAgICBuZXcgQXJnb24uQ2VzaXVtLlBlcnNwZWN0aXZlRnJ1c3R1bVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IENlc2l1bU1hdGggPSBBcmdvbi5DZXNpdW0uQ2VzaXVtTWF0aDtcbiAgICAgICAgICAgIGV4cGVjdChDZXNpdW1NYXRoLmVxdWFsc0Vwc2lsb24oZnJ1c3R1bS5mb3YsIHJlc3VsdC5mb3YsIENlc2l1bU1hdGguRVBTSUxPTjEwKSkudG8uYmUudHJ1ZTtcbiAgICAgICAgICAgIGV4cGVjdChDZXNpdW1NYXRoLmVxdWFsc0Vwc2lsb24oZnJ1c3R1bS5mb3Z5LCByZXN1bHQuZm92eSwgQ2VzaXVtTWF0aC5FUFNJTE9OMTApKS50by5iZS50cnVlO1xuICAgICAgICAgICAgZXhwZWN0KENlc2l1bU1hdGguZXF1YWxzRXBzaWxvbihmcnVzdHVtLmFzcGVjdFJhdGlvLCByZXN1bHQuYXNwZWN0UmF0aW8sIENlc2l1bU1hdGguRVBTSUxPTjEwKSkudG8uYmUudHJ1ZTtcbiAgICAgICAgICAgIGV4cGVjdChDZXNpdW1NYXRoLmVxdWFsc0Vwc2lsb24oZnJ1c3R1bS5uZWFyLCByZXN1bHQubmVhciwgQ2VzaXVtTWF0aC5FUFNJTE9OMTApKS50by5iZS50cnVlO1xuICAgICAgICAgICAgZXhwZWN0KENlc2l1bU1hdGguZXF1YWxzRXBzaWxvbihmcnVzdHVtLmZhciwgcmVzdWx0LmZhciwgQ2VzaXVtTWF0aC5FUFNJTE9OMTApKS50by5iZS50cnVlO1xuICAgICAgICAgICAgZXhwZWN0KENlc2l1bU1hdGguZXF1YWxzRXBzaWxvbihmcnVzdHVtLnhPZmZzZXQsIHJlc3VsdC54T2Zmc2V0LCBDZXNpdW1NYXRoLkVQU0lMT04xMCkpLnRvLmJlLnRydWU7XG4gICAgICAgICAgICBleHBlY3QoQ2VzaXVtTWF0aC5lcXVhbHNFcHNpbG9uKGZydXN0dW0ueU9mZnNldCwgcmVzdWx0LnlPZmZzZXQsIENlc2l1bU1hdGguRVBTSUxPTjEwKSkudG8uYmUudHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfSlcblxufSkiXX0=
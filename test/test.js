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
        it('should set suggestedGeolocationSubscription options in DeviceService', function () {
            var manager = Argon.init(null, { role: Argon.Role.REALITY_MANAGER });
            manager.device.suggestedGeolocationSubscriptionChangeEvent.addEventListener(function () {
                expect(manager.device.suggestedGeolocationSubscription).to.exist;
                expect(manager.device.suggestedGeolocationSubscription.enableHighAccuracy).to.be.true;
            });
            expect(manager.device.suggestedGeolocationSubscription).to.not.exist;
            manager.context.subscribeGeolocation({ enableHighAccuracy: true });
        });
    });
    describe('app.context.unsubscribeGeolocation', function () {
        it('should unset suggestedGeolocationSubscription options in DeviceService', function () {
            var manager = Argon.init(null, { role: Argon.Role.REALITY_MANAGER });
            var remove = manager.device.suggestedGeolocationSubscriptionChangeEvent.addEventListener(function () {
                expect(manager.device.suggestedGeolocationSubscription).to.exist;
                expect(manager.device.suggestedGeolocationSubscription.enableHighAccuracy).to.be.true;
                remove();
                manager.context.unsubscribeGeolocation();
                manager.device.suggestedGeolocationSubscriptionChangeEvent.addEventListener(function () {
                    expect(manager.device.suggestedGeolocationSubscription).to.not.exist;
                });
            });
            expect(manager.device.suggestedGeolocationSubscription).to.not.exist;
            manager.context.subscribeGeolocation({ enableHighAccuracy: true });
        });
    });
    describe('app.device.subscribeGeolocation', function () {
        it('should attempt to start geolocation updates', function (done) {
            var manager = Argon.init(null, { role: Argon.Role.REALITY_MANAGER });
            manager.provider.device.onStartGeolocationUpdates = function (options) {
                expect(options && options.enableHighAccuracy).to.be.true;
                done();
            };
            manager.device.subscribeGeolocation({ enableHighAccuracy: true });
        });
    });
    describe('app.device.unsubscribeGeolocation', function () {
        it('should attempt to stop geolocation updates', function (done) {
            var manager = Argon.init(null, { role: Argon.Role.REALITY_MANAGER });
            manager.provider.device.onStartGeolocationUpdates = function (options) {
                expect(options && options.enableHighAccuracy).to.be.true;
            };
            manager.provider.device.onStopGeolocationUpdates = function () {
                done();
                manager.provider.device.onStopGeolocationUpdates = function () { };
            };
            manager.device.subscribeGeolocation({ enableHighAccuracy: true });
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
                expect(subscriptions).to.exist && expect(Argon.jsonEquals(subscriptions.get(id), options));
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
            var container = new Argon.DI.Container();
            container.registerInstance(Argon.Configuration, { role: Argon.Role.REALITY_MANAGER });
            container.registerSingleton(Argon.ConnectService, Argon.LoopbackConnectService);
            var realityService = container.get(Argon.RealityService);
            var contextService = container.get(Argon.ContextService);
            sessionService = container.get(Argon.SessionService);
            container.get(Argon.ArgonSystemProvider);
            realityService.default = Argon.RealityViewer.EMPTY;
            var removeListener = contextService.updateEvent.addEventListener(function () {
                var frameState = contextService.serializedFrameState;
                expect(realityService.current === Argon.RealityViewer.EMPTY);
                expect(frameState.reality === Argon.RealityViewer.EMPTY);
                expect(frameState.time).to.haveOwnProperty('dayNumber');
                expect(frameState.time).to.haveOwnProperty('secondsOfDay');
                removeListener();
                done();
            });
            sessionService.connect();
        });
    });
    describe('#request', function () {
        it('should raise an error for unsupported realities', function (done) {
            var container = new Argon.DI.Container();
            container.registerInstance(Argon.Configuration, { role: Argon.Role.REALITY_MANAGER });
            container.registerSingleton(Argon.ConnectService, Argon.LoopbackConnectService);
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

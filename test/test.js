System.register(['chai', '../src/argon'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var chai, Argon;
    var expect;
    return {
        setters:[
            function (chai_1) {
                chai = chai_1;
            },
            function (Argon_1) {
                Argon = Argon_1;
            }],
        execute: function() {
            expect = chai.expect;
            describe('Argon', function () {
                afterEach(function () {
                    Argon.ArgonSystem.instance = undefined;
                });
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
                        var manager = new Argon.ArgonSystem({ role: Argon.Role.MANAGER });
                        expect(manager).to.be.an.instanceOf(Argon.ArgonSystem);
                        expect(manager.session.configuration.role).to.equal(Argon.Role.MANAGER);
                    });
                    it('should create an ArgonSystem with Role=Role.APPLICATION', function () {
                        var app = new Argon.ArgonSystem({ role: Argon.Role.APPLICATION });
                        expect(app).to.be.an.instanceOf(Argon.ArgonSystem);
                        expect(app.session.configuration.role).to.equal(Argon.Role.APPLICATION);
                    });
                    it('should create an ArgonSystem with Role=Role.REALITY_VIEW', function () {
                        var app = new Argon.ArgonSystem({ role: Argon.Role.REALITY_VIEW });
                        expect(app).to.be.an.instanceOf(Argon.ArgonSystem);
                        expect(app.session.configuration.role).to.equal(Argon.Role.REALITY_VIEW);
                    });
                    it('should raise a focus event when Role=Role.MANAGER', function (done) {
                        var manager = new Argon.ArgonSystem({ role: Argon.Role.MANAGER });
                        expect(manager).to.be.an.instanceOf(Argon.ArgonSystem);
                        expect(manager.session.configuration.role).to.equal(Argon.Role.MANAGER);
                        manager.focusEvent.addEventListener(function () {
                            expect(manager.focus.hasFocus).to.be.true;
                            done();
                        });
                    });
                });
            });
            describe('TimerService', function () {
                describe('#requestFrame', function () {
                    it('should execute callback for animation frame', function (done) {
                        var timer = new Argon.TimerService();
                        var stopAtFrame = 1;
                        timer.requestFrame(function update(time, frameNumber) {
                            expect(time).to.be.instanceof(Argon.Cesium.JulianDate);
                            expect(time.dayNumber).to.be.equal(Argon.Cesium.JulianDate.now().dayNumber);
                            expect(frameNumber).to.be.a('number');
                            if (frameNumber === stopAtFrame)
                                done();
                            else
                                timer.requestFrame(update);
                        });
                    });
                });
            });
            describe('RealityService', function () {
                describe('new RealityService()', function () {
                    it('the default reality should be used when no desired reality is set', function (done) {
                        var container = new Argon.DI.Container();
                        container.registerInstance('config', { role: Argon.Role.MANAGER });
                        container.registerSingleton(Argon.ConnectService, Argon.LoopbackConnectService);
                        var realityService = container.get(Argon.RealityService);
                        var sessionService = container.get(Argon.SessionService);
                        realityService.registerLoader(container.get(Argon.EmptyRealityLoader));
                        realityService.setDefault({ uri: 'reality:empty', title: 'My Custom Reality' });
                        var removeListener = realityService.frameEvent.addEventListener(function (state) {
                            expect(Argon.RealityView.getType(state.reality) === 'empty');
                            expect(state.time).to.haveOwnProperty('dayNumber');
                            expect(state.time).to.haveOwnProperty('secondsOfDay');
                            expect(realityService.getDesired()).to.be.undefined;
                            removeListener();
                            done();
                        });
                        sessionService.connect();
                    });
                });
                describe('#setDesired', function () {
                    it('should support setting a custom reality', function (done) {
                        var type = 'custom_type';
                        var CustomRealitySetupHandler = (function () {
                            function CustomRealitySetupHandler() {
                                this.type = type;
                            }
                            CustomRealitySetupHandler.prototype.load = function (reality, callback) {
                                var realitySession = sessionService.addManagedSessionPort('reality:' + type);
                                var remoteRealitySession = sessionService.createSessionPort();
                                var messageChannel = sessionService.createMessageChannel();
                                callback(realitySession);
                                remoteRealitySession.open(messageChannel.port1, { role: Argon.Role.REALITY_VIEW });
                                realitySession.open(messageChannel.port2, sessionService.configuration);
                            };
                            return CustomRealitySetupHandler;
                        }());
                        var container = new Argon.DI.Container();
                        container.registerInstance('config', { role: Argon.Role.MANAGER });
                        container.registerSingleton(Argon.ConnectService, Argon.LoopbackConnectService);
                        var realityService = container.get(Argon.RealityService);
                        var sessionService = container.get(Argon.SessionService);
                        realityService.registerLoader(container.get(CustomRealitySetupHandler));
                        var removeListener = realityService.changeEvent.addEventListener(function () {
                            expect(Argon.RealityView.getType(realityService.getCurrent())).to.equal(type);
                            removeListener();
                            done();
                        });
                        sessionService.connect();
                        realityService.setDesired({ uri: 'reality:custom_type', title: 'My Custom Reality' });
                    });
                    it('should raise an error for unsupported realities', function (done) {
                        var container = new Argon.DI.Container();
                        container.registerInstance('config', { role: Argon.Role.MANAGER });
                        container.registerSingleton(Argon.ConnectService, Argon.LoopbackConnectService);
                        var realityService = container.get(Argon.RealityService);
                        var sessionService = container.get(Argon.SessionService);
                        sessionService.errorEvent.addEventListener(function (error) {
                            expect(error).to.be.instanceof(Error);
                            done();
                        });
                        sessionService.connect();
                        realityService.setDesired({ uri: 'reality:unsupported' });
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
                            expect(session.info.role).to.equal(Argon.Role.MANAGER);
                            expect(session.info.userData.test).to.equal('def');
                            checkDone();
                        });
                        remoteSession.connectEvent.addEventListener(function () {
                            expect(remoteSession.info.role).to.equal(Argon.Role.APPLICATION);
                            expect(remoteSession.info.userData.test).to.equal('abc');
                            checkDone();
                        });
                        session.open(messageChannel.port1, { role: Argon.Role.APPLICATION, userData: { test: 'abc' } });
                        remoteSession.open(messageChannel.port2, { role: Argon.Role.MANAGER, userData: { test: 'def' } });
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
                            expect(session.info.role).to.equal(Argon.Role.MANAGER);
                            expect(session.info.userData.test).to.equal('def');
                            checkDone();
                        });
                        remoteSession.connectEvent.addEventListener(function () {
                            expect(remoteSession.info.role).to.equal(Argon.Role.APPLICATION);
                            expect(remoteSession.info.userData.test).to.equal('abc');
                            checkDone();
                        });
                        session.open(messageChannel.port1, { role: Argon.Role.APPLICATION, userData: { test: 'abc' } });
                        remoteSession.open(messageChannel.port2, { role: Argon.Role.MANAGER, userData: { test: 'def' } });
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
                            expect(session.info.role).to.equal(Argon.Role.MANAGER);
                            expect(session.info.userData.test).to.equal('def');
                            checkDone();
                        });
                        remoteSession.connectEvent.addEventListener(function () {
                            expect(remoteSession.info.role).to.equal(Argon.Role.APPLICATION);
                            expect(remoteSession.info.userData.test).to.equal('abc');
                            checkDone();
                        });
                        session.open(messageChannel.port1, { role: Argon.Role.APPLICATION, userData: { test: 'abc' } });
                        remoteSession.open(messageChannel.port2, { role: Argon.Role.MANAGER, userData: { test: 'def' } });
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
                        session.open(messageChannel.port1, { role: Argon.Role.APPLICATION });
                        remoteSession.open(messageChannel.port2, { role: Argon.Role.MANAGER });
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
                        session.open(messageChannel.port1, { role: Argon.Role.APPLICATION });
                        remoteSession.open(messageChannel.port2, { role: Argon.Role.MANAGER });
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
                        session.open(messageChannel.port1, { role: Argon.Role.APPLICATION });
                        remoteSession.open(messageChannel.port2, { role: Argon.Role.MANAGER });
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
                        session.open(messageChannel.port1, { role: Argon.Role.APPLICATION });
                        remoteSession.open(messageChannel.port2, { role: Argon.Role.APPLICATION });
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
                        session.open(messageChannel.port1, { role: Argon.Role.APPLICATION });
                        remoteSession.open(messageChannel.port2, { role: Argon.Role.APPLICATION });
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
                        session.open(messageChannel.port1, { role: Argon.Role.APPLICATION });
                        remoteSession.open(messageChannel.port2, { role: Argon.Role.APPLICATION });
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
                        queue.push(function () { return x = 10; }).catch(function () { });
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
                    return Argon.init({ configuration: { role: Argon.Role.MANAGER } });
                }
                describe('new Context()', function () {
                    it('should create a Context object', function () {
                        var context = createSystem().context;
                        expect(context).to.be.instanceof(Argon.ContextService);
                    });
                    it('should emit update events with default reality', function (done) {
                        var context = createSystem().context;
                        var removeListener = context.updateEvent.addEventListener(function () {
                            expect(Argon.RealityView.getType(context.serializedFrameState.reality)).to.equal('empty');
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
                            expect(state.poseStatus & Argon.PoseStatus.KNOWN).to.equal(0);
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
                            expect(state.poseStatus & Argon.PoseStatus.FOUND).to.be.ok;
                            expect(state.poseStatus & Argon.PoseStatus.KNOWN).to.be.ok;
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
                                expect(state.poseStatus & Argon.PoseStatus.FOUND).to.be.ok;
                                expect(state.poseStatus & Argon.PoseStatus.KNOWN).to.be.ok;
                                expect(state.poseStatus & Argon.PoseStatus.LOST).to.not.be.ok;
                                entity.position.setValue(undefined);
                                found = true;
                            }
                            else {
                                expect(state.poseStatus & Argon.PoseStatus.LOST).to.be.ok;
                                expect(state.poseStatus & Argon.PoseStatus.FOUND).to.not.be.ok;
                                expect(state.poseStatus & Argon.PoseStatus.KNOWN).to.not.be.ok;
                                removeListener();
                                done();
                            }
                        });
                    });
                });
            });
            describe('VuforiaService', function () {
                var MockVuforiaServiceDelegateBase = (function (_super) {
                    __extends(MockVuforiaServiceDelegateBase, _super);
                    function MockVuforiaServiceDelegateBase() {
                        _super.apply(this, arguments);
                    }
                    MockVuforiaServiceDelegateBase.prototype.isAvailable = function () {
                        return true;
                    };
                    return MockVuforiaServiceDelegateBase;
                }(Argon.VuforiaServiceDelegate));
                function createManagerWithVuforiaDelegate(DelegateClass) {
                    var container = new Argon.DI.Container();
                    container.registerSingleton(Argon.VuforiaServiceDelegate, DelegateClass);
                    var manager = Argon.init({ configuration: {
                            role: Argon.Role.MANAGER
                        }, container: container });
                    return manager;
                }
                describe('new VuforiaService()', function () {
                    it('should create a VuforiaService object', function () {
                        var vuforia = createManagerWithVuforiaDelegate(Argon.VuforiaServiceDelegate).vuforia;
                        expect(vuforia).to.be.instanceof(Argon.VuforiaService);
                    });
                    it('should add a live-video reality handler to the reality service', function () {
                        var reality = createManagerWithVuforiaDelegate(Argon.VuforiaServiceDelegate).reality;
                        expect(reality.isSupported({ uri: 'reality:live-video' })).to.be.true;
                    });
                    it('should load the live-video reality when it is the default', function (done) {
                        var reality = createManagerWithVuforiaDelegate(Argon.VuforiaServiceDelegate).reality;
                        reality.setDefault({ uri: 'reality:live-video' });
                        reality.changeEvent.addEventListener(function (_a) {
                            var current = _a.current;
                            expect(current.uri).to.equal('reality:live-video');
                            expect(current === reality.getCurrent()).to.be.true;
                            done();
                        });
                    });
                    // it('should emit update events via context when vuforia reality is active', (done) => {
                    //     const {vuforia, reality, context} = createManagerWithVuforiaReality(Argon.VuforiaServiceDelegate);;
                    //     context.updateEvent.addEventListener((frameState) => {
                    //         expect(frameState.reality.type).to.equal('vuforia');
                    //         expect(frameState.frameNumber).to.equal(42);
                    //         done()
                    //     });
                    //     reality.changeEvent.addEventListener(() => {
                    //         expect(reality.getCurrent().type).to.equal('vuforia');
                    //         const delegate:Argon.VuforiaServiceDelegate = vuforia['delegate'];
                    //         delegate.stateUpdateEvent.raiseEvent({
                    //             frameNumber: 42,
                    //             time: Argon.Cesium.JulianDate.now()
                    //         })
                    //     })
                    // })
                    it('should call init on the delegate when init is called', function () {
                        var myInitOptions = { licenseKey: 'key' };
                        var MockVuforiaServiceDelegate = (function (_super) {
                            __extends(MockVuforiaServiceDelegate, _super);
                            function MockVuforiaServiceDelegate() {
                                _super.apply(this, arguments);
                            }
                            MockVuforiaServiceDelegate.prototype.init = function (options) {
                                expect(options.licenseKey).to.equal(myInitOptions.licenseKey);
                                return Promise.resolve(Argon.VuforiaInitResult.SUCCESS);
                            };
                            return MockVuforiaServiceDelegate;
                        }(MockVuforiaServiceDelegateBase));
                        var vuforia = createManagerWithVuforiaDelegate(MockVuforiaServiceDelegate).vuforia;
                        return vuforia.init(myInitOptions);
                    });
                });
                describe('#isAvailable', function () {
                    it('should call isAvailable on the VuforiaServiceDelegate', function (done) {
                        var vuforia = createManagerWithVuforiaDelegate(MockVuforiaServiceDelegateBase).vuforia;
                        vuforia.isAvailable().then(function (result) {
                            expect(result).to.equal(true);
                            done();
                        });
                    });
                });
                describe('#init', function () {
                    it('should call init on the VuforiaServiceDelegate', function (done) {
                        var MockVuforiaServiceDelegate = (function (_super) {
                            __extends(MockVuforiaServiceDelegate, _super);
                            function MockVuforiaServiceDelegate() {
                                _super.apply(this, arguments);
                            }
                            MockVuforiaServiceDelegate.prototype.init = function (options) {
                                expect(options.licenseKey).to.equal('test');
                                done();
                                return Promise.resolve(Argon.VuforiaInitResult.SUCCESS);
                            };
                            return MockVuforiaServiceDelegate;
                        }(MockVuforiaServiceDelegateBase));
                        var vuforia = createManagerWithVuforiaDelegate(MockVuforiaServiceDelegate).vuforia;
                        return vuforia.init({ licenseKey: 'test' }).then(function (api) {
                            expect(api).to.be.instanceof(Argon.VuforiaAPI);
                        });
                    });
                });
                // describe('#startCamera', () => {
                //     it('should call startCamera on the VuforiaServiceDelegate', (done) => {
                //         class MockVuforiaServiceDelegate extends MockVuforiaServiceDelegateBase {
                //             startCamera() {
                //                 done()
                //             }
                //         }
                //         const {vuforia} = createManagerWithVuforiaReality(MockVuforiaServiceDelegate);
                //         vuforia.startCamera()
                //         vuforia.init()
                //     });
                // })
                // describe('#stopCamera', () => {
                //     it('should call stopCamera on the VuforiaServiceDelegate', (done) => {
                //         class MockVuforiaServiceDelegate extends MockVuforiaServiceDelegateBase {
                //             stopCamera() {
                //                 done()
                //             }
                //         }
                //         const {vuforia} = createManagerWithVuforiaReality(MockVuforiaServiceDelegate);
                //         vuforia.init()
                //         vuforia.startCamera()
                //         vuforia.stopCamera()
                //     });
                // })
                // describe('#createDataSet', () => {
                //     it('should create a VuforiaDataSet object', (done) => {
                //         let progress = 0;
                //         class MockVuforiaServiceDelegate extends MockVuforiaServiceDelegateBase {
                //             loadDataSet(url) {
                //                 expect(url).to.equal(myDataSetURL);
                //                 expect(progress).to.equal(0);
                //                 progress++;
                //             }
                //             activateDataSet(url) {
                //                 expect(url).to.equal(myDataSetURL);
                //                 expect(progress).to.equal(1);
                //                 progress++;
                //             }
                //             deactivateDataSet(url) {
                //                 expect(url).to.equal(myDataSetURL);
                //                 expect(progress).to.equal(2);
                //                 progress++;
                //             }
                //             unloadDataSet(url) {
                //                 expect(url).to.equal(myDataSetURL);
                //                 expect(progress).to.equal(3);
                //                 done();
                //             }
                //         }
                //         const myDataSetURL = Argon.resolveURL("dataset_url");
                //         const {vuforia} = createManagerWithVuforiaReality(MockVuforiaServiceDelegate);
                //         const dataSet = vuforia.createDataSet(myDataSetURL);
                //         vuforia.init()
                //         dataSet.load();
                //         dataSet.activate();
                //         dataSet.deactivate();
                //         dataSet.unload();
                //     });
                // })
                // describe('VuforiaDataSet', () => {
                //     describe('#trackablesPromise', () => {
                //         it('should return trackables promise with trackables info', () => {
                //             class MockVuforiaServiceDelegate extends MockVuforiaServiceDelegateBase {
                //                 loadDataSet(url) {
                //                     expect(url).to.equal(myDataSetURL);
                //                     this.dataSetLoadEvent.raiseEvent({
                //                         url,
                //                         trackables: {
                //                             trackableID1: {
                //                                 id: 'trackableID1',
                //                                 name: 'target'
                //                             }
                //                         }
                //                     });
                //                 }
                //             }
                //             const myDataSetURL = Argon.resolveURL("dataset_url");
                //             const {vuforia} = createManagerWithVuforiaReality(MockVuforiaServiceDelegate);
                //             const dataSet = vuforia.createDataSet(myDataSetURL);
                //             vuforia.init()
                //             dataSet.load();
                //             return dataSet.trackablesPromise.then((trackables) => {
                //                 expect(trackables['trackableID1'].id).to.equal('trackableID1');
                //             })
                //         })
                //     })
                // })
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
        }
    }
});

import chai from 'chai'
import * as Argon from '../src/argon.ts'

import {MessageChannelFactory, SessionFactory, MessageChannelLike, Session} from '../src/session.ts'
import {TimerService} from '../src/timer.ts'
import {RealityService} from '../src/reality.ts'
import {DeviceService} from '../src/device.ts'
import {FrameState} from '../src/context.ts'
import {CommandQueue} from '../src/utils.ts'
import {VuforiaService, VuforiaServiceDelegate} from '../src/vuforia.ts'

const expect = chai.expect;

describe('Argon', () => {

    afterEach(() => {
        Argon.ArgonSystem.instance = null;
    })

    describe('#init', () => {
        it('should create an ArgonSystem w/ default options', () => {
            const app = Argon.init();
            expect(app).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(app.context).to.exist;
            expect(app.vuforia).to.exist;
            expect(app.context.entities.getById('DEVICE')).to.be.ok;
        });
    })

    describe('new ArgonSystem()', () => {
        it('should create an ArgonSystem with Role=Role.MANAGER', () => {
            const manager = new Argon.ArgonSystem({ role: Argon.Role.MANAGER });
            expect(manager).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(manager.configuration.role).to.equal(Argon.Role.MANAGER);
        });
        it('should create an ArgonSystem with Role=Role.APPLICATION', () => {
            const app = new Argon.ArgonSystem({ role: Argon.Role.APPLICATION });
            expect(app).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(app.configuration.role).to.equal(Argon.Role.APPLICATION);
        });
        it('should create an ArgonSystem with Role=Role.REALITY', () => {
            const app = new Argon.ArgonSystem({ role: Argon.Role.REALITY });
            expect(app).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(app.configuration.role).to.equal(Argon.Role.REALITY);
        });
        it('should raise a focus event when Role=Role.MANAGER', (done) => {
            const manager = new Argon.ArgonSystem({ role: Argon.Role.MANAGER });
            expect(manager).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(manager.configuration.role).to.equal(Argon.Role.MANAGER);

            function expectFocus() {
                expect(manager.context.hasFocus).to.be.true;
                done();
            }

            manager.context.focusEvent.addEventListener(expectFocus)
        });
    })

});

describe('TimerService', () => {

    describe('#requestFrame', () => {
        it('should execute callback for animation frame', (done) => {
            var timer = new TimerService();
            var stopAtFrame = 1;
            timer.requestFrame(function update(time, frameNumber) {
                expect(time).to.be.instanceof(Argon.Cesium.JulianDate);
                expect(time.dayNumber).to.be.equal(Argon.Cesium.JulianDate.now().dayNumber);
                expect(frameNumber).to.be.a('number');
                if (frameNumber === stopAtFrame) done();
                else timer.requestFrame(update);
            })
        });
    })

});


describe('RealitySetupService', () => {

    describe('#setupReality', () => {

        it('should setup a empty reality session which emits update events', (done) => {
            const setup = new RealityService(new TimerService, new MessageChannelFactory, new SessionFactory);
            const realitySession = setup.sessionFactory.create();
            const messageChannel = setup.messageChannelFactory.create();
            realitySession.open(messageChannel.port1, { role: Argon.Role.MANAGER })
            setup.setup({ type: "empty" }, messageChannel.port2);
            realitySession.on['ar.context.update'] = function(state: FrameState) {
                expect(state.time).to.haveOwnProperty('dayNumber');
                expect(state.time).to.haveOwnProperty('secondsOfDay');
                expect(state.frameNumber).to.be.a('number');
                realitySession.close();
                done();
            }
        });

        it('should support setting up a custom reality', (done) => {
            const setup = new RealityService(new TimerService, new MessageChannelFactory, new SessionFactory);
            const reality = { type: 'custom_type' };

            setup.handlers.set('custom_type', function(reality, port) {
                const remoteRealitySession = setup.sessionFactory.create();
                remoteRealitySession.open(port, { role: Argon.Role.REALITY });
            });

            const realitySession = setup.sessionFactory.create()

            realitySession.openEvent.addEventListener(() => {
                done();
            });

            const messageChannel = setup.messageChannelFactory.create();
            realitySession.open(messageChannel.port1, { role: Argon.Role.APPLICATION })
            setup.setup(reality, messageChannel.port2);
        });

        it('should throw an error for unsupported realities', () => {
            const setup = new RealityService(new TimerService, new MessageChannelFactory, new SessionFactory);
            const realitySession = setup.sessionFactory.create();

            const messageChannel = setup.messageChannelFactory.create();
            realitySession.open(messageChannel.port1, { role: Argon.Role.APPLICATION })

            expect(function() {
                setup.setup({ type: 'unsupported' }, messageChannel.port2);
            }).to.throw();
        });

    });

});


describe('MessageChannelLike', () => {

    describe('new MessageChannelLike()', () => {
        it('should create an object that behaves like the MessageChannel API', () => {
            const messageChannel = new MessageChannelLike();
            const port1 = messageChannel.port1;
            const port2 = messageChannel.port2;
            var testPort = {};

            const p1 = new Promise((resolve, reject) => {
                port1.onmessage = (ev) => {
                    expect(ev.data.c).to.equal('d')
                    resolve();
                }
            })

            const p2 = new Promise((resolve, reject) => {
                port2.onmessage = (ev) => {
                    expect(ev.data.a).to.equal('b')
                    resolve();
                }
            })

            port1.postMessage({ a: 'b' });
            port2.postMessage({ c: 'd' });

            return Promise.all([p1, p2]);
        });
    })

});

describe('Session', () => {

    describe('new Session()', () => {
        it('should create a Session object', () => {
            const session = new Session();
            expect(session).to.be.instanceof(Session);
        });
    })

    describe('#open', () => {
        it('should open a messagechannel between two sessions', (done) => {
            const session = new Session();
            const remoteSession = new Session();
            const messageChannel = new MessageChannel;
            let openCount = 0;
            session.openEvent.addEventListener(() => {
                expect(session.info.role).to.equal(Argon.Role.MANAGER);
                expect(session.info.userData.test).to.equal('def');
                checkDone();
            })
            remoteSession.openEvent.addEventListener(() => {
                expect(remoteSession.info.role).to.equal(Argon.Role.APPLICATION);
                expect(remoteSession.info.userData.test).to.equal('abc');
                checkDone();
            })
            session.open(messageChannel.port1, { role: Argon.Role.APPLICATION, userData: { test: 'abc' } });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.MANAGER, userData: { test: 'def' } });

            function checkDone() {
                { }
                openCount++;
                if (openCount == 2) done();
            }
        });
    });


    describe('#send', () => {
        it('should send messages between two sessions', (done) => {
            const session = new Session();
            const remoteSession = new Session();
            const messageChannel = new MessageChannel;
            let openCount = 0;
            session.on['test.message'] = (message, event) => {
                expect(message.hi).to.equal(42);
                done();
            }
            session.open(messageChannel.port1, { role: Argon.Role.APPLICATION });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.APPLICATION });
            remoteSession.send('test.message', { hi: 42 });
        });

        it('should send messages between two sessions (test 2)', (done) => {
            const session = new Session();
            const remoteSession = new Session();
            const messageChannel = new MessageChannelLike;
            let openCount = 0;
            session.on['test.message'] = (message, event) => {
                expect(message.hi).to.equal(42);
                done();
            }
            session.open(messageChannel.port1, { role: Argon.Role.APPLICATION });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.APPLICATION });
            remoteSession.send('test.message', { hi: 42 });
        });
    })

});

describe('CommandQueue', () => {

    describe('new CommandQueue()', () => {
        it('should create a CommandQueue object', () => {
            const queue = new CommandQueue();
            expect(queue).to.be.instanceof(CommandQueue);
        });
    })

    describe('#push', () => {
        it('should push and execute commands in serial', (done) => {
            const queue = new CommandQueue();
            let x = 1;
            queue.push(() => ++x)
            queue.push(() => expect(x).to.equal(2))
            queue.push(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        x = 10;
                        resolve();
                    }, 10);
                })
            });
            queue.push(() => {
                expect(x).to.equal(10)
                x++;
            });
            queue.push(() => {
                expect(x).to.equal(11);
                done();
            });
        });
    })

    describe('#clear', () => {
        it('should clear pending commands', (done) => {
            const queue = new CommandQueue();
            let x = 1;
            queue.push(() => ++x)
            queue.push(() => expect(x).to.equal(2))
            queue.push(() => {
                queue.clear();
                queue.push(() => {
                    expect(x).to.equal(100);
                    done();
                })
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        x = 100;
                        resolve()
                    }, 15)
                });
            });
            queue.push(() => x = 10);
        });
    })


    describe('#errorEvent', () => {
        it('should emit thrown errors', (done) => {
            const queue = new CommandQueue();
            queue.push(() => {
                throw new Error('X')
            });
            queue.errorEvent.addEventListener((error: Error) => {
                expect(error.message).to.equal('X');
                done();
            });
        });
        it('should emit promise rejections', (done) => {
            const queue = new CommandQueue();
            queue.push(() => {
                return Promise.reject(new Error('X'))
            });
            queue.errorEvent.addEventListener((error: Error) => {
                expect(error.message).to.equal('X');
                done();
            });
        });
    })

});

describe('Context', () => {

    function createContext() {
        const messageChannelFactory = new MessageChannelFactory;
        const sessionFactory = new SessionFactory;
        const deviceService = new DeviceService;
        const realityService = new RealityService(new TimerService, messageChannelFactory, sessionFactory);
        const context = new Argon.Context(
            realityService,
            deviceService,
            sessionFactory,
            messageChannelFactory,
            Argon.Role.MANAGER,
            new Argon.LoopbackConnectService({ role: Argon.Role.APPLICATION }, messageChannelFactory)
        );
        context.init();
        return { context, realityService };
    }

    describe('new Context()', () => {
        it('should create a Context object', () => {
            const {context} = createContext();
            expect(context).to.be.instanceof(Argon.Context);
        })
        it('should emit update events with default reality', (done) => {
            const {context} = createContext();
            const removeListener = context.updateEvent.addEventListener((frameState) => {
                expect(frameState.reality.type).to.equal('empty');
                removeListener();
                done();
            })
        })
    })

    describe('#desiredReality', () => {
        it('should be null by default', () => {
            const {context} = createContext();
            expect(context.desiredReality).to.be.null;
        })

        it('should support setting a desired reality', (done) => {
            const {context, realityService} = createContext();
            const frameTime = Argon.Cesium.JulianDate.now();
            realityService.handlers.set('reality_type', function(reality, port) {
                const remoteSession = realityService.sessionFactory.create();
                remoteSession.open(port, { role: Argon.Role.REALITY });
                const frame = <FrameState>{
                    frameNumber: 10,
                    time: frameTime
                }
                remoteSession.send('ar.context.update', frame);
            });
            const removeListener = context.updateEvent.addEventListener((frameState) => {
                expect(frameState.reality.type).to.equal('reality_type');
                expect(frameState.frameNumber).to.equal(10);
                expect(frameTime.equals(frameState.time)).to.equal(true);
                expect(frameState.camera.type).to.be.ok;
                expect(frameState.entities.EYE).to.be.ok;
                removeListener();
                done()
            });
            context.setDesiredReality({ type: 'reality_type' });
            expect(context.desiredReality['type']).to.equal('reality_type');
        })
    })

})

describe('VuforiaService', () => {

    class VuforiaDeviceService extends DeviceService {
        defaultReality = { type: 'vuforia' };
    }

    class MockVuforiaServiceDelegateBase extends VuforiaServiceDelegate {
        isSupported() {
            return true
        }
    }

    function createContextWithVuforiaDefaultReality(delegate: VuforiaServiceDelegate) {
        const messageChannelFactory = new MessageChannelFactory;
        const sessionFactory = new SessionFactory;
        const deviceService = new VuforiaDeviceService;
        const realityService = new RealityService(new TimerService, messageChannelFactory, sessionFactory);
        const context = new Argon.Context(
            realityService,
            deviceService,
            sessionFactory,
            messageChannelFactory,
            Argon.Role.MANAGER,
            new Argon.LoopbackConnectService({ role: Argon.Role.APPLICATION }, messageChannelFactory)
        );
        const vuforia = new VuforiaService(context, realityService, delegate);
        context.init();
        return { vuforia, context, realityService };
    }

    describe('new VuforiaService()', () => {
        it('should create a VuforiaService object', () => {
            const {vuforia, context} = createContextWithVuforiaDefaultReality(new VuforiaServiceDelegate);
            expect(vuforia).to.be.instanceof(VuforiaService);
        });
        it('should add a vuforia reality handler to the reality service', () => {
            const {vuforia, context, realityService} = createContextWithVuforiaDefaultReality(new VuforiaServiceDelegate);
            const vuforiaSetupFunction = realityService.handlers.get('vuforia');
            expect(vuforiaSetupFunction).to.not.be.undefined;
        })
        it('should load the vuforia reality when the vuforia reality is the default', (done) => {
            const {vuforia, context} = createContextWithVuforiaDefaultReality(new VuforiaServiceDelegate);
            context.realityChangeEvent.addEventListener(() => {
                expect(context.reality.type).to.equal('vuforia');
                done();
            })
        })
        it('should emit update events on context when vuforia reality is active', (done) => {
            const delegate = new VuforiaServiceDelegate;
            const {vuforia, context} = createContextWithVuforiaDefaultReality(delegate);
            context.updateEvent.addEventListener((frameState) => {
                expect(frameState.reality.type).to.equal('vuforia');
                expect(frameState.frameNumber).to.equal(42);
                done()
            });
            context.realityChangeEvent.addEventListener(() => {
                expect(context.reality.type).to.equal('vuforia');
                delegate.updateEvent.raiseEvent({
                    frameNumber: 42,
                    time: Argon.Cesium.JulianDate.now()
                })
            })
        })
        it('should call init on the delegate when vuforia reality is active', (done) => {
            class MockVuforiaServiceDelegate extends MockVuforiaServiceDelegateBase {
                init(options: Argon.VuforiaInitOptions) {
                    expect(options.licenseKey).to.not.be.ok;
                    done()
                }
            }
            createContextWithVuforiaDefaultReality(new MockVuforiaServiceDelegate);
        })
        it('should call startCamera on the delegate when vuforia reality is active', (done) => {
            class MockVuforiaServiceDelegate extends MockVuforiaServiceDelegateBase {
                startCamera() {
                    done()
                }
            }
            createContextWithVuforiaDefaultReality(new MockVuforiaServiceDelegate);
        })
    })

    describe('#isSupported', () => {
        it('should call isSupported on the VuforiaServiceDelegate', (done) => {
            const {vuforia} = createContextWithVuforiaDefaultReality(new MockVuforiaServiceDelegateBase);
            vuforia.isSupported().then((result) => {
                expect(result).to.equal(true);
                done()
            })
        });
    })

    describe('#init', () => {
        it('should call init on the VuforiaServiceDelegate', (done) => {
            class MockVuforiaServiceDelegate extends MockVuforiaServiceDelegateBase {
                init(options: Argon.VuforiaInitOptions) {
                    expect(options.licenseKey).to.equal('test');
                    done()
                }
            }
            const {vuforia} = createContextWithVuforiaDefaultReality(new MockVuforiaServiceDelegate);
            vuforia.init({ licenseKey: 'test' })
        });
    })

    describe('#deinit', () => {
        it('should call deinit on the VuforiaServiceDelegate', (done) => {
            class MockVuforiaServiceDelegate extends MockVuforiaServiceDelegateBase {
                deinit() {
                    done()
                }
            }
            const {vuforia} = createContextWithVuforiaDefaultReality(new MockVuforiaServiceDelegate);
            vuforia.init(); // init first, otherwise deinit is not called
            vuforia.deinit();
        });
    })

    describe('#startCamera', () => {
        it('should call startCamera on the VuforiaServiceDelegate', (done) => {
            class MockVuforiaServiceDelegate extends MockVuforiaServiceDelegateBase {
                startCamera() {
                    done()
                }
            }
            const {vuforia} = createContextWithVuforiaDefaultReality(new MockVuforiaServiceDelegate);
            vuforia.startCamera()
            vuforia.init()
        });
    })

    describe('#stopCamera', () => {
        it('should call stopCamera on the VuforiaServiceDelegate', (done) => {
            class MockVuforiaServiceDelegate extends MockVuforiaServiceDelegateBase {
                stopCamera() {
                    done()
                }
            }
            const {vuforia} = createContextWithVuforiaDefaultReality(new MockVuforiaServiceDelegate);
            vuforia.init()
            vuforia.startCamera()
            vuforia.stopCamera()
        });
    })

    describe('#createDataSet', () => {
        it('should create a VuforiaDataSet object', (done) => {
            let progress = 0;
            class MockVuforiaServiceDelegate extends MockVuforiaServiceDelegateBase {
                loadDataSet(url) {
                    expect(url).to.equal(myDataSetURL);
                    expect(progress).to.equal(0);
                    progress++;
                }
                activateDataSet(url) {
                    expect(url).to.equal(myDataSetURL);
                    expect(progress).to.equal(1);
                    progress++;
                }
                deactivateDataSet(url) {
                    expect(url).to.equal(myDataSetURL);
                    expect(progress).to.equal(2);
                    progress++;
                }
                unloadDataSet(url) {
                    expect(url).to.equal(myDataSetURL);
                    expect(progress).to.equal(3);
                    done();
                }
            }
            const myDataSetURL = Argon.resolveURL("dataset_url");
            const {vuforia} = createContextWithVuforiaDefaultReality(new MockVuforiaServiceDelegate);
            const dataSet = vuforia.createDataSet(myDataSetURL);
            vuforia.init()
            dataSet.load();
            dataSet.activate();
            dataSet.deactivate();
            dataSet.unload();
        });
    })

    describe('VuforiaDataSet', () => {
        describe('#trackablesPromise', () => {
            it('should return trackables promise with trackables info', () => {
                class MockVuforiaServiceDelegate extends MockVuforiaServiceDelegateBase {
                    loadDataSet(url) {
                        expect(url).to.equal(myDataSetURL);
                        this.dataSetLoadEvent.raiseEvent({
                            url,
                            trackables: {
                                trackableID1: {
                                    id: 'trackableID1',
                                    name: 'target'
                                }
                            }
                        });
                    }
                }
                const myDataSetURL = Argon.resolveURL("dataset_url");
                const {vuforia} = createContextWithVuforiaDefaultReality(new MockVuforiaServiceDelegate);
                const dataSet = vuforia.createDataSet(myDataSetURL);
                vuforia.init()
                dataSet.load();
                return dataSet.trackablesPromise.then((trackables) => {
                    expect(trackables['trackableID1'].id).to.equal('trackableID1');
                })
            })
        })
    })


})

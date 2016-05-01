/// <reference path="../typings/browser.d.ts"/>
import * as chai from 'chai'
import * as Argon from '../src/argon'

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
        });
    })

    describe('new ArgonSystem()', () => {
        it('should create an ArgonSystem with Role=Role.MANAGER', () => {
            const manager = new Argon.ArgonSystem({ role: Argon.Role.MANAGER });
            expect(manager).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(manager.session.configuration.role).to.equal(Argon.Role.MANAGER);
        });
        it('should create an ArgonSystem with Role=Role.APPLICATION', () => {
            const app = new Argon.ArgonSystem({ role: Argon.Role.APPLICATION });
            expect(app).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(app.session.configuration.role).to.equal(Argon.Role.APPLICATION);
        });
        it('should create an ArgonSystem with Role=Role.REALITY_VIEW', () => {
            const app = new Argon.ArgonSystem({ role: Argon.Role.REALITY_VIEW });
            expect(app).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(app.session.configuration.role).to.equal(Argon.Role.REALITY_VIEW);
        });
        it('should raise a focus event when Role=Role.MANAGER', (done) => {
            const manager = new Argon.ArgonSystem({ role: Argon.Role.MANAGER });
            expect(manager).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(manager.session.configuration.role).to.equal(Argon.Role.MANAGER);
            
            manager.focusEvent.addEventListener(() => {
                expect(manager.focus.hasFocus).to.be.true;
                done();
            });
        });
    })

});

describe('TimerService', () => {

    describe('#requestFrame', () => {
        it('should execute callback for animation frame', (done) => {
            var timer = new Argon.TimerService();
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


describe('RealityService', () => {
    
    
    describe('new RealityService()', () => {

        it('the default reality should be used when no desired reality is set', (done) => {
            const container = new Argon.DI.Container();
            container.registerInstance('config', {role: Argon.Role.MANAGER});
            container.registerSingleton(Argon.ConnectService, Argon.LoopbackConnectService);
            const realityService:Argon.RealityService = container.get(Argon.RealityService);
            const sessionService:Argon.SessionService = container.get(Argon.SessionService);
            
            realityService.registerHandler(container.get(Argon.EmptyRealitySetupHandler));
            realityService.setDefault({type:'empty'})
            
            const removeListener = realityService.frameEvent.addEventListener((state) => {
                expect(realityService.getCurrent().type === 'empty')
                expect(state.time).to.haveOwnProperty('dayNumber');
                expect(state.time).to.haveOwnProperty('secondsOfDay');
                expect(realityService.getDesired()).to.be.null;
                removeListener();
                done();
            })
            
            sessionService.connect();
        });
        
    })

    describe('#setDesired', () => {

        it('should support setting a custom reality', (done) => {
            
            class CustomRealitySetupHandler implements Argon.RealitySetupHandler {
                public type = 'custom_type';
                
                public setup(reality : Argon.RealityView, port : Argon.MessagePortLike) {
                    const remoteRealitySession = sessionService.createSessionPort();
                    remoteRealitySession.open(port, { role: Argon.Role.REALITY_VIEW });
                }
            }
            
            const container = new Argon.DI.Container();
            container.registerInstance('config', {role: Argon.Role.MANAGER});
            container.registerSingleton(Argon.ConnectService, Argon.LoopbackConnectService);
            const realityService:Argon.RealityService = container.get(Argon.RealityService);
            const sessionService:Argon.SessionService = container.get(Argon.SessionService);
            
            realityService.registerHandler(container.get(CustomRealitySetupHandler));

            const removeListener = realityService.changeEvent.addEventListener(() => {
                expect(realityService.getCurrent().type).to.equal('custom_type');
                removeListener();
                done();
            });
            
            sessionService.connect();
            realityService.setDesired({type: 'custom_type'});
        });

        it('should raise an error for unsupported realities', (done) => {
            const container = new Argon.DI.Container();
            container.registerInstance('config', {role: Argon.Role.MANAGER});
            container.registerSingleton(Argon.ConnectService, Argon.LoopbackConnectService);
            const realityService:Argon.RealityService = container.get(Argon.RealityService);
            const sessionService:Argon.SessionService = container.get(Argon.SessionService);
            
            sessionService.errorEvent.addEventListener((error)=>{
                expect(error).to.be.instanceof(Error);
                done()
            })
            
            sessionService.connect();
            realityService.setDesired({ type: 'unsupported' });
        });

    });

});


describe('MessageChannelLike', () => {

    describe('new MessageChannelLike()', () => {
        it('should create an object that behaves like the MessageChannel API', () => {
            const messageChannel = new Argon.MessageChannelLike();
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

describe('SessionPort', () => {

    describe('new SessionPort()', () => {
        it('should create a SessionPort object', () => {
            const session = new Argon.SessionPort();
            expect(session).to.be.instanceof(Argon.SessionPort);
        });
    })

    describe('#open', () => {
        it('should open a messagechannel between two sessions', (done) => {
            const session = new Argon.SessionPort();
            const remoteSession = new Argon.SessionPort();
            const messageChannel = new MessageChannel;
            let connectCount = 0;
            session.connectEvent.addEventListener(() => {
                expect(session.info.role).to.equal(Argon.Role.MANAGER);
                expect(session.info.userData.test).to.equal('def');
                checkDone();
            })
            remoteSession.connectEvent.addEventListener(() => {
                expect(remoteSession.info.role).to.equal(Argon.Role.APPLICATION);
                expect(remoteSession.info.userData.test).to.equal('abc');
                checkDone();
            })
            session.open(messageChannel.port1, { role: Argon.Role.APPLICATION, userData: { test: 'abc' } });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.MANAGER, userData: { test: 'def' } });

            function checkDone() {
                connectCount++;
                if (connectCount == 2) done();
            }
        });
    });


    describe('#send', () => {
        it('should send messages between two sessions', (done) => {
            const session = new Argon.SessionPort();
            const remoteSession = new Argon.SessionPort();
            const messageChannel = new MessageChannel();
            let openCount = 0;
            session.on['test.message'] = (message:{hi:number}, event) => {
                expect(message.hi).to.equal(42);
                done();
            }
            session.open(messageChannel.port1, { role: Argon.Role.APPLICATION });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.APPLICATION });
            remoteSession.send('test.message', { hi: 42 });
        });

        it('should send messages between two sessions (test 2)', (done) => {
            const session = new Argon.SessionPort();
            const remoteSession = new Argon.SessionPort();
            const messageChannel = new Argon.MessageChannelLike();
            let openCount = 0;
            session.on['test.message'] = (message:{hi:number}, event) => {
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
            const queue = new Argon.CommandQueue();
            expect(queue).to.be.instanceof(Argon.CommandQueue);
        });
    })

    describe('#push', () => {
        it('should push and execute commands in serial', () => {
            const queue = new Argon.CommandQueue();
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
            return queue.push(() => {
                expect(x).to.equal(11);
            }, true);
        });
    })

    describe('#clear', () => {
        it('should clear pending commands', (done) => {
            const queue = new Argon.CommandQueue();
            let x = 1;
            queue.push(() => ++x)
            queue.push(() => expect(x).to.equal(2))
            queue.push(() => {
                queue.clear();
                queue.push(() => {
                    expect(x).to.equal(102);
                    done();
                })
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        x += 100;
                        resolve()
                    }, 15)
                });
            });
            queue.push(() => x = 10).catch(()=>{});
            queue.execute();
        });
    })


    describe('#errorEvent', () => {
        it('should emit thrown errors', (done) => {
            const queue = new Argon.CommandQueue();
            queue.push(() => {
                throw new Error('A')
            }).catch(()=>{});
            queue.errorEvent.addEventListener((error: Error) => {
                expect(error.message).to.equal('A');
                done();
            });
            queue.execute();
        });
        it('should emit promise rejections', (done) => {
            const queue = new Argon.CommandQueue();
            queue.push(() => {
                return Promise.reject(new Error('B'))
            }).catch(()=>{});
            queue.errorEvent.addEventListener((error: Error) => {
                expect(error.message).to.equal('B');
                done();
            });
            queue.execute();
        });
    })

});

describe('Context', () => {

    function createSystem() {
        return Argon.init({config: {role: Argon.Role.MANAGER}});
    }

    describe('new Context()', () => {
        it('should create a Context object', () => {
            const {context} = createSystem();
            expect(context).to.be.instanceof(Argon.ContextService);
        })
        it('should emit update events with default reality', (done) => {
            const {context} = createSystem();
            const removeListener = context.updateEvent.addEventListener(() => {
                expect(context.state.reality.type).to.equal('empty');
                removeListener();
                done();
            })
        })
    })

    describe('#getEntityPose', () => {
        it('poseStatus should not have KNOWN bit set when pose is undefined', (done) => {
            const {context} = createSystem();
            const entity = new Argon.Cesium.Entity;
            const removeListener = context.updateEvent.addEventListener(()=>{
                const state = context.getEntityPose(entity);
                expect(state.poseStatus & Argon.PoseStatus.KNOWN).to.equal(0);
                removeListener();
                done();
            })
        })
        it('poseStatus should have PoseStatus.FOUND & PoseStatus.KNOWN when pose is found', (done) => {
            const {context} = createSystem();
            const entity = new Argon.Cesium.Entity({
                position: new Argon.Cesium.ConstantPositionProperty(Argon.Cesium.Cartesian3.ZERO, context.getDefaultReferenceFrame()),
                orientation: new Argon.Cesium.ConstantProperty(Argon.Cesium.Quaternion.IDENTITY)
            });
            const removeListener = context.updateEvent.addEventListener(()=>{
                const state = context.getEntityPose(entity);
                expect(state.poseStatus & Argon.PoseStatus.FOUND).to.be.ok;
                expect(state.poseStatus & Argon.PoseStatus.KNOWN).to.be.ok;
                removeListener();
                done();
            })
        })
        it('poseStatus should have PoseStatus.LOST when pose is lost', (done) => {
            const {context} = createSystem();
            const entity = new Argon.Cesium.Entity({
                position: new Argon.Cesium.ConstantPositionProperty(Argon.Cesium.Cartesian3.ZERO, context.getDefaultReferenceFrame()),
                orientation: new Argon.Cesium.ConstantProperty(Argon.Cesium.Quaternion.IDENTITY)
            });
            let found = false;
            const removeListener = context.updateEvent.addEventListener(()=>{
                const state = context.getEntityPose(entity);
                if (!found) {
                    expect(state.poseStatus & Argon.PoseStatus.FOUND).to.be.ok;
                    expect(state.poseStatus & Argon.PoseStatus.KNOWN).to.be.ok;
                    expect(state.poseStatus & Argon.PoseStatus.LOST).to.not.be.ok;
                    (<Argon.Cesium.ConstantPositionProperty>entity.position).setValue(undefined);
                    found = true;
                } else {
                    expect(state.poseStatus & Argon.PoseStatus.LOST).to.be.ok;
                    expect(state.poseStatus & Argon.PoseStatus.FOUND).to.not.be.ok;
                    expect(state.poseStatus & Argon.PoseStatus.KNOWN).to.not.be.ok;
                    removeListener();
                    done();
                }
            })
        })
    })

})

describe('VuforiaService', () => {

    class MockVuforiaServiceDelegateBase extends Argon.VuforiaServiceDelegate {
        isAvailable() {
            return true
        }
    }

    function createManagerWithVuforiaDelegate(DelegateClass: typeof Argon.VuforiaServiceDelegate) {
        const container = new Argon.DI.Container();
        container.registerSingleton(Argon.VuforiaServiceDelegate, DelegateClass)
        const manager = Argon.init({config:{
            role:Argon.Role.MANAGER
        }, container});
        return manager;
    }

    describe('new VuforiaService()', () => {
        it('should create a VuforiaService object', () => {
            const {vuforia} = createManagerWithVuforiaDelegate(Argon.VuforiaServiceDelegate);
            expect(vuforia).to.be.instanceof(Argon.VuforiaService);
        });
        it('should add a vuforia reality handler to the reality service', () => {
            const {reality} = createManagerWithVuforiaDelegate(Argon.VuforiaServiceDelegate);
            expect(reality.isSupported('vuforia')).to.be.true;
        })
        it('should load the vuforia reality when the vuforia reality is the default', (done) => {
            const {vuforia, reality} = createManagerWithVuforiaDelegate(Argon.VuforiaServiceDelegate);
            reality.setDefault({type:'vuforia'})
            reality.changeEvent.addEventListener(() => {
                expect(reality.getCurrent().type).to.equal('vuforia');
                done();
            })
        })
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
        it('should call init on the delegate when init is called', () => {
            const myInitOptions = {licenseKey:'key'}
            class MockVuforiaServiceDelegate extends MockVuforiaServiceDelegateBase {
                init(options: Argon.VuforiaInitOptions) {
                    expect(options.licenseKey).to.equal(myInitOptions.licenseKey);
                    return Promise.resolve(Argon.VuforiaInitResult.SUCCESS);
                }
            }
            const {vuforia} = createManagerWithVuforiaDelegate(MockVuforiaServiceDelegate);
            return vuforia.init(myInitOptions);
        })
    })

    describe('#isAvailable', () => {
        it('should call isAvailable on the VuforiaServiceDelegate', (done) => {
            const {vuforia} = createManagerWithVuforiaDelegate(MockVuforiaServiceDelegateBase);
            vuforia.isAvailable().then((result) => {
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
                    return Promise.resolve(Argon.VuforiaInitResult.SUCCESS);
                }
            }
            const {vuforia} = createManagerWithVuforiaDelegate(MockVuforiaServiceDelegate);
            return vuforia.init({ licenseKey: 'test' }).then((api)=>{
                expect(api).to.be.instanceof(Argon.VuforiaAPI);
            })
        });
    })

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


})

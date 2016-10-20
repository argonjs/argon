/// <reference types="mocha"/>
import * as chai from 'chai'
import * as Argon from '../src/argon'

const expect = chai.expect;

describe('Argon', () => {

    afterEach(() => {
        Argon.ArgonSystem.instance = undefined;
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
            const manager = new Argon.ArgonSystem({ role: Argon.Role.REALITY_MANAGER });
            expect(manager).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(manager.session.configuration.role).to.equal(Argon.Role.REALITY_MANAGER);
        });
        it('should create an ArgonSystem with Role=Role.APPLICATION', () => {
            const app = new Argon.ArgonSystem({ role: Argon.Role.REALITY_AUGMENTER });
            expect(app).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(app.session.configuration.role).to.equal(Argon.Role.REALITY_AUGMENTER);
        });
        it('should create an ArgonSystem with Role=Role.REALITY_VIEW', () => {
            const app = new Argon.ArgonSystem({ role: Argon.Role.REALITY_VIEWER });
            expect(app).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(app.session.configuration.role).to.equal(Argon.Role.REALITY_VIEWER);
        });
        it('should raise a focus event when Role=Role.MANAGER', (done) => {
            const manager = new Argon.ArgonSystem({ role: Argon.Role.REALITY_MANAGER });
            expect(manager).to.be.an.instanceOf(Argon.ArgonSystem);
            expect(manager.session.configuration.role).to.equal(Argon.Role.REALITY_MANAGER);
            
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
            timer.requestFrame(function update(time) {
                expect(time).to.be.instanceof(Argon.Cesium.JulianDate);
                expect(time.dayNumber).to.be.equal(Argon.Cesium.JulianDate.now().dayNumber);
                done();
            })
        });
    })

});


describe('RealityService', () => {
    
    
    describe('new RealityService()', () => {

        it('the default reality should be used when no desired reality is set', (done) => {
            const container = new Argon.DI.Container();
            container.registerInstance('config', {role: Argon.Role.REALITY_MANAGER});
            container.registerSingleton(Argon.ConnectService, Argon.LoopbackConnectService);
            const realityService:Argon.RealityService = container.get(Argon.RealityService);
            const sessionService:Argon.SessionService = container.get(Argon.SessionService);
            
            realityService.registerLoader(container.get(Argon.EmptyRealityLoader));
            realityService.setDefault({uri:'reality:empty', title:'My Custom Reality'})
            
            let removeListener = realityService.viewStateEvent.addEventListener((state) => {
                expect(Argon.RealityViewer.getType(realityService.getCurrent()) === 'empty')
                expect(state.time).to.haveOwnProperty('dayNumber');
                expect(state.time).to.haveOwnProperty('secondsOfDay');
                expect(realityService.getDesired()).to.be.undefined;
                removeListener();
                done();
            })
            
            sessionService.connect();
        });
        
    })

    describe('#setDesired', () => {

        it('should support setting a custom reality', (done) => {

            const type = 'custom_type';
            
            class CustomRealitySetupHandler implements Argon.RealityLoader {
                public type = type;
                
                public load(reality : Argon.RealityViewer, callback:(realitySession:Argon.SessionPort)=>void) : void {
                    const realitySession = sessionService.addManagedSessionPort('reality:' + type);
                    const remoteRealitySession = sessionService.createSessionPort();
                    const messageChannel = sessionService.createMessageChannel();
                    callback(realitySession);
                    remoteRealitySession.open(messageChannel.port1, { role: Argon.Role.REALITY_VIEWER });
                    realitySession.open(messageChannel.port2, sessionService.configuration);
                }
            }
            
            const container = new Argon.DI.Container();
            container.registerInstance('config', {role: Argon.Role.REALITY_MANAGER});
            container.registerSingleton(Argon.ConnectService, Argon.LoopbackConnectService);
            const realityService:Argon.RealityService = container.get(Argon.RealityService);
            const sessionService:Argon.SessionService = container.get(Argon.SessionService);
            
            realityService.registerLoader(container.get(CustomRealitySetupHandler));

            let removeListener = realityService.changeEvent.addEventListener(() => {
                expect(Argon.RealityViewer.getType(realityService.getCurrent()!)).to.equal(type);
                removeListener();
                done();
            });
            
            sessionService.connect();
            realityService.setDesired({uri: 'reality:custom_type', title:'My Custom Reality'});
        });

        it('should raise an error for unsupported realities', (done) => {
            const container = new Argon.DI.Container();
            container.registerInstance('config', {role: Argon.Role.REALITY_MANAGER});
            container.registerSingleton(Argon.ConnectService, Argon.LoopbackConnectService);
            const realityService:Argon.RealityService = container.get(Argon.RealityService);
            const sessionService:Argon.SessionService = container.get(Argon.SessionService);

            sessionService.errorEvent.addEventListener((error)=>{
                expect(error).to.be.instanceof(Error);
                done()
            })
            
            sessionService.connect();
            realityService.setDesired({ uri: 'reality:unsupported' });
        });

    });

});


describe('MessageChannelLike', () => {

    describe('new MessageChannelLike()', () => {
        it('should create an object that behaves like the MessageChannel API', () => {
            const messageChannel = new Argon.MessageChannelLike();
            const port1 = messageChannel.port1;
            const port2 = messageChannel.port2;

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
        it('should connect two sessions', (done) => {
            const session = new Argon.SessionPort();
            const remoteSession = new Argon.SessionPort();
            const messageChannel = new MessageChannel;
            let connectCount = 0;
            session.connectEvent.addEventListener(() => {
                expect(session.info.role).to.equal(Argon.Role.REALITY_MANAGER);
                expect(session.info.userData.test).to.equal('def');
                checkDone();
            })
            remoteSession.connectEvent.addEventListener(() => {
                expect(remoteSession.info.role).to.equal(Argon.Role.REALITY_AUGMENTER);
                expect(remoteSession.info.userData.test).to.equal('abc');
                checkDone();
            })
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER, userData: { test: 'abc' } });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_MANAGER, userData: { test: 'def' } });

            function checkDone() {
                connectCount++;
                if (connectCount == 2) done();
            }
        });
        
        it('should connect two sessions (polyfill)', (done) => {
            const session = new Argon.SessionPort();
            const remoteSession = new Argon.SessionPort();
            const messageChannel = new Argon.MessageChannelLike;
            let connectCount = 0;
            session.connectEvent.addEventListener(() => {
                expect(session.info.role).to.equal(Argon.Role.REALITY_MANAGER);
                expect(session.info.userData.test).to.equal('def');
                checkDone();
            })
            remoteSession.connectEvent.addEventListener(() => {
                expect(remoteSession.info.role).to.equal(Argon.Role.REALITY_AUGMENTER);
                expect(remoteSession.info.userData.test).to.equal('abc');
                checkDone();
            })
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER, userData: { test: 'abc' } });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_MANAGER, userData: { test: 'def' } });

            function checkDone() {
                connectCount++;
                if (connectCount == 2) done();
            }
        });
        
        it('should connect two sessions (synchronous)', (done) => {
            const session = new Argon.SessionPort();
            const remoteSession = new Argon.SessionPort();
            const messageChannel = new Argon.SynchronousMessageChannel;
            let connectCount = 0;
            session.connectEvent.addEventListener(() => {
                expect(session.info.role).to.equal(Argon.Role.REALITY_MANAGER);
                expect(session.info.userData.test).to.equal('def');
                checkDone();
            })
            remoteSession.connectEvent.addEventListener(() => {
                expect(remoteSession.info.role).to.equal(Argon.Role.REALITY_AUGMENTER);
                expect(remoteSession.info.userData.test).to.equal('abc');
                checkDone();
            })
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER, userData: { test: 'abc' } });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_MANAGER, userData: { test: 'def' } });

            function checkDone() {
                connectCount++;
                if (connectCount == 2) done();
            }
        });
    });
        
    describe('#close', () => {
        
        it('should emit close events to both sessions', (done) => {
            const session = new Argon.SessionPort();
            const remoteSession = new Argon.SessionPort();
            const messageChannel = new MessageChannel;
            let connectCount = 0;
            session.closeEvent.addEventListener(() => {
                checkDone();
            })
            remoteSession.closeEvent.addEventListener(() => {
                checkDone();
            })
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_MANAGER });
            session.close();
            function checkDone() {
                connectCount++;
                if (connectCount == 2) done();
            }
        });
        
        it('should emit close events to both sessions (polyfill)', (done) => {
            const session = new Argon.SessionPort();
            const remoteSession = new Argon.SessionPort();
            const messageChannel = new Argon.MessageChannelLike;
            let connectCount = 0;
            session.closeEvent.addEventListener(() => {
                checkDone();
            })
            remoteSession.closeEvent.addEventListener(() => {
                checkDone();
            })
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_MANAGER });
            session.close();
            function checkDone() {
                connectCount++;
                if (connectCount == 2) done();
            }
        });
        
        it('should emit close events to both sessions (synchronous)', (done) => {
            const session = new Argon.SessionPort();
            const remoteSession = new Argon.SessionPort();
            const messageChannel = new Argon.SynchronousMessageChannel;
            let connectCount = 0;
            session.closeEvent.addEventListener(() => {
                checkDone();
            })
            remoteSession.closeEvent.addEventListener(() => {
                checkDone();
            })
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_MANAGER });
            session.close();
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
            session.on['test.message'] = (message:{hi:number}, event) => {
                expect(message.hi).to.equal(42);
                done();
            }
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.send('test.message', { hi: 42 });
        });

        it('should send messages between two sessions (polyfill)', (done) => {
            const session = new Argon.SessionPort();
            const remoteSession = new Argon.SessionPort();
            const messageChannel = new Argon.MessageChannelLike();
            session.on['test.message'] = (message:{hi:number}, event) => {
                expect(message.hi).to.equal(42);
                done();
            }
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.send('test.message', { hi: 42 });
        });

        it('should send messages between two sessions (synchronous)', (done) => {
            const session = new Argon.SessionPort();
            const remoteSession = new Argon.SessionPort();
            const messageChannel = new Argon.MessageChannelLike();
            session.on['test.message'] = (message:{hi:number}, event) => {
                expect(message.hi).to.equal(42);
                done();
            }
            session.open(messageChannel.port1, { role: Argon.Role.REALITY_AUGMENTER });
            remoteSession.open(messageChannel.port2, { role: Argon.Role.REALITY_AUGMENTER });
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
        return Argon.init({configuration: {role: Argon.Role.REALITY_MANAGER}});
    }

    describe('new Context()', () => {
        it('should create a Context object', () => {
            const {context} = createSystem();
            expect(context).to.be.instanceof(Argon.ContextService);
        })
        it('should emit update events with default reality', (done) => {
            const {context} = createSystem();
            let removeListener = context.updateEvent.addEventListener(() => {
                expect(Argon.RealityViewer.getType(context.serializedFrameState!.reality)).to.equal('empty');
                removeListener();
                done();
            })
        })
    })

    describe('#getEntityPose', () => {
        it('poseStatus should not have KNOWN bit set when pose is undefined', (done) => {
            const {context} = createSystem();
            const entity = new Argon.Cesium.Entity;
            let removeListener = context.updateEvent.addEventListener(()=>{
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
            let removeListener = context.updateEvent.addEventListener(()=>{
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
            let removeListener = context.updateEvent.addEventListener(()=>{
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
        const manager = Argon.init({configuration:{
            role:Argon.Role.REALITY_MANAGER
        }, container});
        return manager;
    }

    describe('new VuforiaService()', () => {
        it('should create a VuforiaService object', () => {
            const {vuforia} = createManagerWithVuforiaDelegate(Argon.VuforiaServiceDelegate);
            expect(vuforia).to.be.instanceof(Argon.VuforiaService);
        });
        it('should add a live-video reality handler to the reality service', () => {
            const {reality} = createManagerWithVuforiaDelegate(Argon.VuforiaServiceDelegate);
            expect(reality.isSupported({uri:'reality:live-video'})).to.be.true;
        })
        it('should load the live-video reality when it is the default', (done) => {
            const {reality} = createManagerWithVuforiaDelegate(Argon.VuforiaServiceDelegate);
            reality.setDefault({uri:'reality:live-video'})
            reality.changeEvent.addEventListener(({current}) => {
                expect(current.uri).to.equal('reality:live-video');
                expect(current === reality.getCurrent()).to.be.true;
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
                init(options: Argon.VuforiaServiceDelegateInitOptions) {
                    done()
                    return Promise.resolve(Argon.VuforiaInitResult.SUCCESS);
                }
            }
            const {vuforia} = createManagerWithVuforiaDelegate(MockVuforiaServiceDelegate);
            return vuforia.init({ encryptedLicenseData: 'test' }).then((api)=>{
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

describe('Utils', () => {

    describe('decomposePerspectiveOffCenterProjectionMatrix', () => {
        it('should correctly decompose a perspective off center projection matrix', () => {
            const frustum = new Argon.Cesium.PerspectiveOffCenterFrustum;
            frustum.left = -1;
            frustum.right = 2;
            frustum.top = -3;
            frustum.bottom = 4;
            frustum.near = 5;
            frustum.far = 6;
            const result = Argon.decomposePerspectiveOffCenterProjectionMatrix(
                frustum.projectionMatrix, 
                new Argon.Cesium.PerspectiveOffCenterFrustum
            );
            const CesiumMath = Argon.Cesium.CesiumMath;
            expect(CesiumMath.equalsEpsilon(frustum.left, result.left, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.right, result.right, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.top, result.top, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.bottom, result.bottom, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.near, result.near, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.far, result.far, CesiumMath.EPSILON10)).to.be.true;
        });
    })

    describe('decomposePerspectiveProjectionMatrix', () => {
        it('should correctly decompose a perspective projection matrix', () => {
            const frustum = new Argon.Cesium.PerspectiveFrustum;
            frustum.fov = Math.PI / 2;
            frustum.near = 0.01;
            frustum.far = 10000;
            frustum.aspectRatio = 0.75;
            frustum.xOffset = 42;
            frustum.yOffset = 15;
            const result = Argon.decomposePerspectiveProjectionMatrix(
                frustum.projectionMatrix, 
                new Argon.Cesium.PerspectiveFrustum
            );
            const CesiumMath = Argon.Cesium.CesiumMath;
            expect(CesiumMath.equalsEpsilon(frustum.fov, result.fov, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.fovy, result.fovy, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.aspectRatio, result.aspectRatio, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.near, result.near, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.far, result.far, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.xOffset, result.xOffset, CesiumMath.EPSILON10)).to.be.true;
            expect(CesiumMath.equalsEpsilon(frustum.yOffset, result.yOffset, CesiumMath.EPSILON10)).to.be.true;
        });
    })

})
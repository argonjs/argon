import Mocha from 'mocha';

var runner = new Mocha({
  ui: 'bdd',
  // this line is what will allow this runner to work in both the browser and Node
  reporter: typeof window != 'undefined' ? 'html' : 'spec'
});

// set up the global variables
runner['suite'].emit('pre-require', typeof window != 'undefined' ? window : global, 'global-mocha-context', runner);

SystemJS.import('./test/test.ts!').then(function(tests) {
  return new Promise((resolve, reject) => {
    runner.run((failures) => {
      if (failures)
        reject(failures);
      else
        resolve();
    });
  });
}).catch(console.error.bind(console));
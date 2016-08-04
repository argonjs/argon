# argon.js

An open-standards augmented reality platform for the web

*This software was created as part of a research project at the Augmented Environments Lab at Georgia Tech.  To support our research, we request that if you make use of this software, you let us know how you used it by sending mail to Blair MacIntyre (blair@cc.gatech.edu).*

### Quick Build Guide

* Clone argon

```sh
git clone https://github.com/argonjs/argon.git
```

* Make sure you have Node.js/npm installed (There are many guides for this online)

* Install `jspm` and (optionally) `typescript` globally so they can be run from the command line.
Depending on how `node` is setup on your system, you may have to use `sudo`.

```sh
npm install -g typescript@next jspm
```

* Go to the directory where you have argon.js downloaded and install dependencies using npm and jspm

```sh
npm install
jspm install
```

* To execute the typescript compiler, run: 
 
```sh
tsc
```

* To test Argon, execute: 
 
```sh
npm run test
```

* To run the typescript compiler and create a build, execute:  

```sh
npm run build
```

### Potential Problems

On Debian based systems, node.js has a name conflict with another module and as a result npm will not work properly. To fix this, run the following:

```sh
sudo apt-get install nodejs-legacy
```

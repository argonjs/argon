# argon

An open-standards augmented reality platform for the web


### Quick Build Guide

* Clone argon

```sh
git clone https://github.gatech.edu/ael/argon.git
```

* Make sure you have Node.js/npm installed (There are many guides for this online)

* Install `typescript`, `tsd` and `jspm` globally so they can be run from the command line.
This will usually require you to be root, and that *usually* means using `sudo`.

```sh
sudo npm install -g typescript@next tsd jspm
```

* Go to the directory where you have argon.js downloaded and install dependencies using npm, jspm, and tsd

```sh
npm install
jspm install
tsd install
```

* To execute the typescript compiler, run: 
 
```sh
tsc
```

* To test Argon, execute: 
 
```sh
npm run test
```

* To create a bundle, execute:  

```sh
npm run bundle
```

### Potential Problems

On Debian based systems, node.js has a name conflict with another module and as a result npm will not work properly. To fix this, run the following:

```sh
sudo apt-get install nodejs-legacy
```

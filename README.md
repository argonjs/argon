# argon.js

An open-standards augmented reality platform for the web

*This software was created as part of a research project at the Augmented Environments Lab at Georgia Tech.  To support our research, we request that if you make use of this software, you let us know how you used it by sending mail to Blair MacIntyre (blair@cc.gatech.edu).*

### Quick Build Guide

* Clone argon

```sh
git clone https://github.com/argonjs/argon.git
```

* Make sure you have Node.js/npm installed (There are many guides for this online)

* Install `typescript`, `typings` and `jspm` globally so they can be run from the command line.
This will usually require you to be root, and that *usually* means using `sudo`.

```sh
sudo npm install -g typescript@next typings jspm
```

* Go to the directory where you have argon.js downloaded and install dependencies using npm, jspm, and typings

```sh
npm install
jspm install
typings install
```

* To execute the typescript compiler, run: 
 
```sh
tsc
```

* To test Argon, execute: 
 
```sh
npm run test
```

* To create a build, execute:  

```sh
npm run build
```

### Generating the Documentation

To generate a local copy of the documentation, execute:

```sh
npm run typedoc
```

The documentation will be placed in the `docs` folder, and can be viewed by accessing the `docs/index.html` page with your browser.

If you wish to publish the documentation to the `gh-pages` branch on your github account you can run the following:

```sh
npm run gh-pages
```

### Potential Problems

On Debian based systems, node.js has a name conflict with another module and as a result npm will not work properly. To fix this, run the following:

```sh
sudo apt-get install nodejs-legacy
```

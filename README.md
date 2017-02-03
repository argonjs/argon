# argon.js

An open-standards augmented reality platform for the web

*This software was created as part of a research project at the 
Augmented Environments Lab at Georgia Tech.  To support our research, 
we request that if you make use of this software, you let us know 
how you used it by sending mail to Blair MacIntyre (blair@cc.gatech.edu).*

## Support

* [Documentation](http://docs.argonjs.io/)
* [API Reference](http://argonjs.io/argon/)

## Quick Start

To install the argon.js library manually, include one of the following scripts in your project:

* argon.min.js   [\[latest\]](https://cdn.rawgit.com/argonjs/argon/v1.1.2/dist/argon.min.js) [\[dev\]](https://rawgit.com/argonjs/argon/develop/dist/argon.min.js) - includes WebVR polyfill
* argon.js       [\[latest\]](https://cdn.rawgit.com/argonjs/argon/v1.1.2/dist/argon.js) [\[dev\]](https://rawgit.com/argonjs/argon/develop/dist/argon.js) - includes WebVR polyfill 
* argon.core.js  [\[latest\]](https://cdn.rawgit.com/argonjs/argon/v1.1.2/dist/argon.core.js) [\[dev\]](https://rawgit.com/argonjs/argon/develop/dist/argon.core.js)

> Note: These are UMD builds, meaning they should be compatible with standard module formats (commonjs, AMD, global). The [dev] link may point to an unstable build, and should only be used if you want the latest in-progress version from the develop branch. 

To install with npm:

```sh
npm install @argonjs/argon@^1.0
```

To install with jspm:

```sh
jspm install npm:@argonjs/argon@^1.0
```

### Usage

In your es6 modules, `import` the package `"@argonjs/argon"`:

```js
import * as Argon from '@argonjs/argon'
```

If you aren't using es6 modules, `require` the package `"@argonjs/argon"`:

```js
var Argon = require('@argonjs/argon');
```

If you aren't using modules at all, no worries! The *argon.js* library will
create a global `Argon` variable that exposes the same API. 

## Typescript

If you are using Typescript 2.0 and would like to leverage 
*argon.js* typings (you should!), simply install *argon.js* using `npm` 
as described above (even if you are not using modules in your 
project). However, if you aren't using modules, just be sure
to include a triple-slash reference so that the typescript 
compiler knows you are using *argon.js* globally:

```ts
/// <reference types="@argonjs/argon" />
```

Finally, make sure your `tsconfig.json` contains the following 
compiler options:

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "lib": [
            "dom",
            "es2015"
        ]
    }
}
```

After that, you can enjoy rich editing support for
*argon.js* in any editor that supports Typescript! We recommend 
[Visual Studio Code](https://code.visualstudio.com).

## Build Guide

* Clone argon

```sh
git clone https://github.com/argonjs/argon.git
```

* Make sure you have node.js/npm installed (There are many guides for this online)
* Install jspm globally:

```sh
npm install jspm -g
```

* Go to the directory where you have argon.js downloaded and install dependencies

```sh
npm install
jspm install
```

* To run the typescript compiler and create a build, execute:  

```sh
npm run build
```

* To test Argon, execute: 
 
```sh
npm run test
```

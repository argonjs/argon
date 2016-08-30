# argon.js

An open-standards augmented reality platform for the web

*This software was created as part of a research project at the 
Augmented Environments Lab at Georgia Tech.  To support our research, 
we request that if you make use of this software, you let us know 
how you used it by sending mail to Blair MacIntyre (blair@cc.gatech.edu).*

## API

There are essentially 3 types of systems that are defined by the *argon.js* framework:

* **[[REALITY_AUGMENTOR]]** - a system that is responsible for *augmenting* a view of reality. 
* **[[REALITY_VIEW]]** - a system that is responsible for *presenting* a view of reality
* **[[REALITY_MANAGER]]** - a system that is responsible for *blending* a particular **Reality View** with
one or more **Reality Augmentors**

Traditionally, Augmented Reality (AR) apps have had to take on all three of these roles 
at once. However, by separating these concerns out, each role can be easily swapped out 
with another implmentation, allowing for a much more flexible and adaptive AR application 
ecosystem. 

The *argon.js* framework also anticipates a future in which AR-enabled browsers 
(functioning as a **Reality Manager**) may give users control over the way they interact 
with AR content, and let the user (not the applications) control how they are displayed
by allowing the user to change their view of reality. For example, a user may want to
switch from live video, to remote video, to a virtual flyover of their—all while an AR
application is running. Similarly, in these future browsers, users may want to run 
multiple AR applications simultaneously, and different application requirements may 
cause the browser to use different views of reality for the different applications. 
We are exploring these ideas within the [Argon](http://argonjs.io/argon-app/) browser 
(which already allows multiple apps to run and be visible at the same time, for example), 
and these use-cases have informed the design of *argon.js*.

### The structure of an AR-enabled app

In general, we simply call [[init]] to initailize our app:

```js
var app = Argon.init();
```

> <sub> ***Note:*** By default, this will initialize your app with a role appropriate for 
the environment in which it is executing. If your app is running within a 
**Reality Manager** such as the [Argon Browser](http://argonjs.io/argon-app/), 
then it will be initialized with the role of a **Reality Augmentor**. If your app 
is running in a standalone manner, then it will be elevated to the role of a 
**Reality Manager**. In general, this detail does not affect the way you write your app, 
as *argon.js* includes default implementations of the responsbilities of a 
**Reality Manager**. However, if your app detects that it is running as a 
**Reality Manager**, it may assume more control over the entire experience.</sub>

The object returned by [[init]] is an instance of [[ArgonSystem]]. By convention, we 
store this instance in a variable called `app`. Various services are made available 
via this instance. For example, your app will need to continually respond to changes 
in the world in order to update it's augmentations. [[ArgonSystem.updateEvent]] 
let's you setup a callback for that purpose:

```ts
app.updateEvent.addEventListener(function (){
    // update our augmentations
})
```

In *argon.js*, all objects are represented in geospatial coordinates, using [cesium.js 
Entities](https://cesiumjs.org/Cesium/Build/Documentation/Entity.html) (a subset 
of Cesium's API is availabe in the `Argon.Cesium` namespace). [[ArgonSystem.context]] 
exposes a [[ContextService]] instance whose purpose is to keep track of entities that 
you can augment, or subscribe to new entities so that your app can be made aware of 
them. Via the [[ContextService.getEntityPose]] method, you can convert an Entity from 
geospatial coordinates into your local scenegraph coordinates. 

In your `update` event handler, you can, for example, query the current 
pose of an Entity by calling [[ContextService.getEntityPose]] and 
passing the desired entity instance.

Finally, we can listen to the render event in order to render
our augmentations in a timely manner:

```ts
app.renderEvent.addEventListener(function (){
    // render our augmentations
})
```

*argon.js* is itself entirely decoupled from any particular rendering library, 
but does aim to provide a level of abstraction that makes it easy to integrate
with the library of your choice. 

Check out the [tutorials](http://docs.argonjs.io/tutorials/) for more 
concrete examples of *argon.js* AR-enabled apps. 

### The structure of a Reality View

TODO

### The structure of a Reality Manager

TODO
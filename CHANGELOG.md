# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.2.0-2"></a>
# [1.2.0-2](https://github.com/argonjs/argon/compare/v1.2.0-1...v1.2.0-2) (2017-04-23)


### Bug Fixes

* **ViewService:**  default scale factors to 1 when not provided ([a8a9c0b](https://github.com/argonjs/argon/commit/a8a9c0b))



<a name="1.2.0-1"></a>
# [1.2.0-1](https://github.com/argonjs/argon/compare/v1.2.0-0...v1.2.0-1) (2017-04-21)


### Bug Fixes

* **VisibilityService:** raise hideEvent when manager closes ([ed44fb0](https://github.com/argonjs/argon/commit/ed44fb0))



<a name="1.2.0-0"></a>
# [1.2.0-0](https://github.com/argonjs/argon/compare/v1.1.14-0...v1.2.0-0) (2017-04-21)


### Bug Fixes

* **device:** Make call to vrDisplay.requestPresent syncrhonously ([aff58c8](https://github.com/argonjs/argon/commit/aff58c8))
* **DeviceService:** move viewport calculation into onUpdateFrameState ([0b97309](https://github.com/argonjs/argon/commit/0b97309))
* **ui:** only hide menu when presenting in mobile safari ([ee61cdf](https://github.com/argonjs/argon/commit/ee61cdf))
* **VuforiaService:** resolve url in createDataSetFromURL ([3560a97](https://github.com/argonjs/argon/commit/3560a97))


### Features

* **ViewService:** Added renderWidth, renderHeight and renderViewport (for subviews) ([86c9b57](https://github.com/argonjs/argon/commit/86c9b57))


### Performance Improvements

* **ContextService:** avoid unnecessary allocation ([0f20041](https://github.com/argonjs/argon/commit/0f20041))
* **DeviceService:** start/stop updates based on visibility state ([d2f2194](https://github.com/argonjs/argon/commit/d2f2194))
* **event:** Reference the underlying functions directly ([b3d7b09](https://github.com/argonjs/argon/commit/b3d7b09))



<a name="1.1.14-0"></a>
## [1.1.14-0](https://github.com/argonjs/argon/compare/v1.1.13...v1.1.14-0) (2017-04-19)


### Bug Fixes

* **DeviceService:** Fixed _updateForWebVR logic ([68e156b](https://github.com/argonjs/argon/commit/68e156b))
* **DeviceService:** Fixed user orientation & subview projection matrices for webvr ([42ff5f4](https://github.com/argonjs/argon/commit/42ff5f4))
* **DeviceServiceProvider:** Removed unnecessary WebVR logic from onUpdateDeviceState ([bb8aa70](https://github.com/argonjs/argon/commit/bb8aa70))


# 1.1.0

* Deprecated
    * The function `subscribeToEntityById` from `ContextService` will be removed in 1.2.0. 
    Use the `subscribe` function instead, which returns a `Promise<Entity>` if a subscription is successful. 
    * The function `setDesired` from `RealityService` will be removed in 1.2.0. 
    * The functions `setDefaultReferenceFrame` and `getDefaultReferenceFrame` from `ContextService` will be removed in 1.2.0. Use the
    `defaultReferenceFrame` property directly. 
    * The function `getTime` from `ContextService` will be removed in 1.3.0. Use the `time` property intead. 
    * The property `systemTime` from `ContextService` will be removed in 1.3.0. Use the `timestamp` property instead. 
    * The property `user` from `ContextService` will be removed in 1.3.0. Use the `eye` property `ViewService` instead. 
    * The function `getViewport` from `ViewService` is deprecated. Use the `current` property from `ViewportService` instead. 

* Breaking Changes
    * None (intended) 

* Added support for embedded viewports
    * Added `parentElement` parameter to `init` function, which can be any DOM element. 
    If undefined, will check for `#argon` DOM element, or create it if not found.
* Added support for forwarding UI events to reality viewers
    * Restructured DOM elements. 
    * Added `uiEvent` to `ViewportService`. Register to this event to selectively
    forward UI events. Otherwise, all UI events that bubble to the `ViewportService.element` and target 
    it or one of it's immediate children, will be forwarded automatically. 
* Added support for installing, uninstalling, and requesting Reality Viewers
    * Added `install`, `uninstall`, and `request` functions to `RealityService`
* Added `subscribe` and `unsubscribe` functions to `ContextService`
* Added `LocationService`, with `stage` and `physicalStage` entities
    * Use `subscribeGeopose` to subscribe to geolocation updates on 
    the `stage` or `physicalStage` entities
* Added `ViewportService`
    * Added `requestPresentationMode`, `PresentationMode.PAGE` and `PresentationMode.IMMERSIVE`
    * Moved `ViewService#element` into `ViewportService#element`
    * Added `rootElement`
* Added `eye` and `physicalEye` entites to `ViewService`
* Added `suggestedViewState` to `ViewService` (for use by RealityViewers, mainly)

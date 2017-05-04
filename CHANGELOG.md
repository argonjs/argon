# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.2.0-16"></a>
# [1.2.0-16](https://github.com/argonjs/argon/compare/v1.2.0-15...v1.2.0-16) (2017-05-04)


### Bug Fixes

* **device:** Fix geolocationDesired / geolocationOptions values in manager ([6b8ba66](https://github.com/argonjs/argon/commit/6b8ba66))



<a name="1.2.0-15"></a>
# [1.2.0-15](https://github.com/argonjs/argon/compare/v1.2.0-14...v1.2.0-15) (2017-05-02)


### Bug Fixes

* **DeviceService:** Disable `strict` when using webvr polyfill ([d87fc0f](https://github.com/argonjs/argon/commit/d87fc0f))
* **DeviceService:** enforce strict mode ([5a7cfa0](https://github.com/argonjs/argon/commit/5a7cfa0))
* **DeviceService:** Prevent the manager from publishing stable state to itself ([8931d18](https://github.com/argonjs/argon/commit/8931d18))
* **DeviceServiceProvider:** Publish stable state when needed ([099085a](https://github.com/argonjs/argon/commit/099085a))


### Features

* **RealityService:** Added `setStageGeolocation` and `resetStageGeolocation` ([455b24b](https://github.com/argonjs/argon/commit/455b24b))
* **SessionPort:** Added `id` property ([457b86f](https://github.com/argonjs/argon/commit/457b86f))



<a name="1.2.0-14"></a>
# [1.2.0-14](https://github.com/argonjs/argon/compare/v1.2.0-13...v1.2.0-14) (2017-05-01)


### Features

* **EmptyRealityViewer:** Added `argon.configureStage` protocol ([b78f559](https://github.com/argonjs/argon/commit/b78f559))



<a name="1.2.0-13"></a>
# [1.2.0-13](https://github.com/argonjs/argon/compare/v1.2.0-12...v1.2.0-13) (2017-05-01)


### Bug Fixes

* **DeviceService:** Fixed units for geolocation updates ([dab091f](https://github.com/argonjs/argon/commit/dab091f))



<a name="1.2.0-12"></a>
# [1.2.0-12](https://github.com/argonjs/argon/compare/v1.2.0-11...v1.2.0-12) (2017-05-01)


### Bug Fixes

* **ui-event-synthesizer:** Adapt to browser quirks ([ea4a64e](https://github.com/argonjs/argon/commit/ea4a64e))


### Features

* Added terrain provider for altitude sampling ([56915fa](https://github.com/argonjs/argon/commit/56915fa))



<a name="1.2.0-11"></a>
# [1.2.0-11](https://github.com/argonjs/argon/compare/v1.2.0-10...v1.2.0-11) (2017-04-29)



<a name="1.2.0-10"></a>
# [1.2.0-10](https://github.com/argonjs/argon/compare/v1.2.0-9...v1.2.0-10) (2017-04-29)


### Bug Fixes

* **DeviceService:** Fix configureStage ([0ec8edc](https://github.com/argonjs/argon/commit/0ec8edc))



<a name="1.2.0-9"></a>
# [1.2.0-9](https://github.com/argonjs/argon/compare/v1.2.0-8...v1.2.0-9) (2017-04-29)


### Bug Fixes

* **DeviceService:** Fix call to headingPitchRollQuaternion ([888fc7d](https://github.com/argonjs/argon/commit/888fc7d))



<a name="1.2.0-8"></a>
# [1.2.0-8](https://github.com/argonjs/argon/compare/v1.2.0-7...v1.2.0-8) (2017-04-29)


### Features

* **ContextServrice:** Added 'createGeoEntity’ ([00c5f3f](https://github.com/argonjs/argon/commit/00c5f3f))



<a name="1.2.0-7"></a>
# [1.2.0-7](https://github.com/argonjs/argon/compare/v1.2.0-6...v1.2.0-7) (2017-04-28)


### Bug Fixes

* **VisibilityService:** For backwards compatibility, ensure that visibility is true when running in an old manager ([2a0dfd6](https://github.com/argonjs/argon/commit/2a0dfd6))



<a name="1.2.0-6"></a>
# [1.2.0-6](https://github.com/argonjs/argon/compare/v1.2.0-5...v1.2.0-6) (2017-04-27)


### Bug Fixes

* **DeviceService:** Enable non-strict frame state for webvr polyfill ([6deb1d4](https://github.com/argonjs/argon/commit/6deb1d4))
* **DeviceService:** Fixed isPresentingHMD state thrashing ([3c5763f](https://github.com/argonjs/argon/commit/3c5763f))
* **DeviceService:** Keep track of isPresentingHMD in stable state rather than frame state ([84661e8](https://github.com/argonjs/argon/commit/84661e8))
* **ViewService:** Workaround for webvr polyfill behavior when using multiple layers ([7044f57](https://github.com/argonjs/argon/commit/7044f57))



<a name="1.2.0-5"></a>
# [1.2.0-5](https://github.com/argonjs/argon/compare/v1.2.0-4...v1.2.0-5) (2017-04-27)


### Bug Fixes

* **ViewService:** apply zIndex to layer styles ([4f61ed5](https://github.com/argonjs/argon/commit/4f61ed5))
* **ViewService:** Fix layer styles in _updateViewport ([336b5ed](https://github.com/argonjs/argon/commit/336b5ed))
* **ViewService:** move zIndex layer updates into _updateViewport ([bc842b2](https://github.com/argonjs/argon/commit/bc842b2))
* **VIewService:** Always set layer styles in _updateViewport ([af853c0](https://github.com/argonjs/argon/commit/af853c0))



<a name="1.2.0-4"></a>
# [1.2.0-4](https://github.com/argonjs/argon/compare/v1.2.0-3...v1.2.0-4) (2017-04-27)


### Bug Fixes

* **DeviceService:** ensure that DeviceServiceProvider is aware of changes to presenting state ([189c630](https://github.com/argonjs/argon/commit/189c630))
* **DeviceService:** Ensure that requestPresent is called in reality layers when webvr polypill is used ([87a4b81](https://github.com/argonjs/argon/commit/87a4b81))
* **VuforiaService:** Fix backwards compatibility ([771b114](https://github.com/argonjs/argon/commit/771b114)), closes [#63](https://github.com/argonjs/argon/issues/63)


### Features

* **ViewService:** Added `setLayers` for managing layer elements ([52ead40](https://github.com/argonjs/argon/commit/52ead40))



<a name="1.2.0-3"></a>
# [1.2.0-3](https://github.com/argonjs/argon/compare/v1.2.0-2...v1.2.0-3) (2017-04-23)


### Bug Fixes

* Ensure DeviceService & ViewService process frame states in the correct order ([5fee115](https://github.com/argonjs/argon/commit/5fee115))



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

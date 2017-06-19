# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.3.7-0"></a>
## [1.3.7-0](https://github.com/argonjs/argon/compare/v1.3.6...v1.3.7-0) (2017-06-19)



<a name="1.3.6"></a>
## [1.3.6](https://github.com/argonjs/argon/compare/v1.3.5...v1.3.6) (2017-06-19)



<a name="1.3.5"></a>
## [1.3.5](https://github.com/argonjs/argon/compare/v1.3.4...v1.3.5) (2017-06-09)


### Bug Fixes

* **view:** removed duplicate layer styling code ([90bb6f8](https://github.com/argonjs/argon/commit/90bb6f8))



<a name="1.3.4"></a>
## [1.3.4](https://github.com/argonjs/argon/compare/v1.3.3...v1.3.4) (2017-06-09)


### Bug Fixes

* **dom:** changed layer z-indexes to start at 0 ([12b508e](https://github.com/argonjs/argon/commit/12b508e))



<a name="1.3.3"></a>
## [1.3.3](https://github.com/argonjs/argon/compare/v1.3.2...v1.3.3) (2017-06-09)


### Bug Fixes

* **dom:** use default positioning in embedded mode ([812600c](https://github.com/argonjs/argon/commit/812600c))



<a name="1.3.2"></a>
## [1.3.2](https://github.com/argonjs/argon/compare/v1.3.2-1...v1.3.2) (2017-06-09)



<a name="1.3.2-1"></a>
## [1.3.2-1](https://github.com/argonjs/argon/compare/v1.3.2-0...v1.3.2-1) (2017-06-09)


### Bug Fixes

* **dom:** fixed dom styles for immersive / embedded modes ([36b7864](https://github.com/argonjs/argon/commit/36b7864))



<a name="1.3.2-0"></a>
## [1.3.2-0](https://github.com/argonjs/argon/compare/v1.3.1...v1.3.2-0) (2017-06-07)



<a name="1.3.1"></a>
## [1.3.1](https://github.com/argonjs/argon/compare/v1.3.0...v1.3.1) (2017-06-06)


### Bug Fixes

* **utils:** Fix test for native webvr implementation ([d71e819](https://github.com/argonjs/argon/commit/d71e819))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/argonjs/argon/compare/v1.3.0-1...v1.3.0) (2017-06-06)


### Bug Fixes

* **ArgonSystem:** fix regression in passing container element to Argon.init ([a36611a](https://github.com/argonjs/argon/commit/a36611a))
* **view:** fixed subview.pose value ([12b884d](https://github.com/argonjs/argon/commit/12b884d))
* **view:** fixed ViewService subview poses ([b418e74](https://github.com/argonjs/argon/commit/b418e74))

### Features

* **utils:** added “suggestedWebGLContextAntialiasAttribute” ([6f94577](https://github.com/argonjs/argon/commit/6f94577))
* added `suggestedPixelRatio` to `ArgonSystem` ([47e3049](https://github.com/argonjs/argon/commit/47e3049))


<a name="1.2.1"></a>
## [1.2.1](https://github.com/argonjs/argon/compare/v1.2.0...v1.2.1) (2017-05-30)


### Bug Fixes

* Fixed argon.min.js build ([0e459d2](https://github.com/argonjs/argon/commit/0e459d2))


<a name="1.2.0"></a>
# [1.2.0](https://github.com/argonjs/argon/compare/v1.1.14...v1.2.0) (2017-05-29)


### Features
* **RealityService:** Added `setStageGeolocation` and `resetStageGeolocation` ([455b24b](https://github.com/argonjs/argon/commit/455b24b))
* **RealityService:** Added `sessions` property to `RealityService` ([bfb21e2](https://github.com/argonjs/argon/commit/bfb21e2))
* **utils** Added `stringIdentifierFromReferenceFrame` and `jsonEquals` to utils ([bdb24d4](https://github.com/argonjs/argon/commit/bdb24d4))
* **SessionPort:** Added `id` property ([457b86f](https://github.com/argonjs/argon/commit/457b86f))
* **EmptyRealityViewer:** Added `argon.configureStage` protocol ([b78f559](https://github.com/argonjs/argon/commit/b78f559))
* Added terrain provider for altitude sampling ([56915fa](https://github.com/argonjs/argon/commit/56915fa))
* **ContextServrice:** Added 'createGeoEntity’ ([00c5f3f](https://github.com/argonjs/argon/commit/00c5f3f))
* **ViewService:** Added `setLayers` for managing layer elements ([52ead40](https://github.com/argonjs/argon/commit/52ead40))
* **ViewService:** Added renderWidth, renderHeight and renderViewport (for subviews) ([86c9b57](https://github.com/argonjs/argon/commit/86c9b57))


### Bug Fixes

* **DeviceService:** Catch errors in frameStateEvent ([cdd3fc7](https://github.com/argonjs/argon/commit/cdd3fc7))
* **DeviceService:** Fix geolocationDesired / geolocationOptions values in manager ([6b8ba66](https://github.com/argonjs/argon/commit/6b8ba66))
* **DeviceService:** Disable `strict` when using webvr polyfill ([d87fc0f](https://github.com/argonjs/argon/commit/d87fc0f))
* **DeviceService:** enforce strict mode ([5a7cfa0](https://github.com/argonjs/argon/commit/5a7cfa0))
* **DeviceService:** Prevent the manager from publishing stable state to itself ([8931d18](https://github.com/argonjs/argon/commit/8931d18))
* **DeviceServiceProvider:** Publish stable state when needed ([099085a](https://github.com/argonjs/argon/commit/099085a))
* **DeviceService:** Fixed units for geolocation updates ([dab091f](https://github.com/argonjs/argon/commit/dab091f))
* **ui-event-synthesizer:** Adapt to browser quirks ([ea4a64e](https://github.com/argonjs/argon/commit/ea4a64e))
* **DeviceService:** Fix call to headingPitchRollQuaternion ([888fc7d](https://github.com/argonjs/argon/commit/888fc7d))
* **VisibilityService:** For backwards compatibility, ensure that visibility is true when running in an old manager ([2a0dfd6](https://github.com/argonjs/argon/commit/2a0dfd6))
* **DeviceService:** Enable non-strict frame state for webvr polyfill ([6deb1d4](https://github.com/argonjs/argon/commit/6deb1d4))
* **DeviceService:** Fixed isPresentingHMD state thrashing ([3c5763f](https://github.com/argonjs/argon/commit/3c5763f))
* **DeviceService:** Keep track of isPresentingHMD in stable state rather than frame state ([84661e8](https://github.com/argonjs/argon/commit/84661e8))
* **ViewService:** Workaround for webvr polyfill behavior when using multiple layers ([7044f57](https://github.com/argonjs/argon/commit/7044f57))
* **ViewService:** apply zIndex to layer styles ([4f61ed5](https://github.com/argonjs/argon/commit/4f61ed5))
* **ViewService:** Fix layer styles in _updateViewport ([336b5ed](https://github.com/argonjs/argon/commit/336b5ed))
* **ViewService:** move zIndex layer updates into _updateViewport ([bc842b2](https://github.com/argonjs/argon/commit/bc842b2))
* **VIewService:** Always set layer styles in _updateViewport ([af853c0](https://github.com/argonjs/argon/commit/af853c0))
* **DeviceService:** ensure that DeviceServiceProvider is aware of changes to presenting state ([189c630](https://github.com/argonjs/argon/commit/189c630))
* **DeviceService:** Ensure that requestPresent is called in reality layers when webvr polypill is used ([87a4b81](https://github.com/argonjs/argon/commit/87a4b81))
* **VuforiaService:** Fix backwards compatibility ([771b114](https://github.com/argonjs/argon/commit/771b114)), closes [#63](https://github.com/argonjs/argon/issues/63)
* **ViewService:**  default scale factors to 1 when not provided ([a8a9c0b](https://github.com/argonjs/argon/commit/a8a9c0b))
* **VisibilityService:** raise hideEvent when manager closes ([ed44fb0](https://github.com/argonjs/argon/commit/ed44fb0))
* **device:** Make call to vrDisplay.requestPresent synchronously ([aff58c8](https://github.com/argonjs/argon/commit/aff58c8))
* **ui:** only hide menu when presenting in mobile safari ([ee61cdf](https://github.com/argonjs/argon/commit/ee61cdf))
* **VuforiaService:** resolve url in createDataSetFromURL ([3560a97](https://github.com/argonjs/argon/commit/3560a97))

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

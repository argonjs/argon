# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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

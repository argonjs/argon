Change Log
==========

### 1.1.0

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

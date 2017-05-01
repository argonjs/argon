// Add functionality for keeping a moving window of samples per SampledProperty,
// so that the data doesn't accumulate indefinitely

import { 
    SampledProperty, 
    SampledPositionProperty, 
    binarySearch, 
    JulianDate
} from './cesium-imports'

declare module 'cesium' {
    interface SampledProperty {
        maxNumSamples: number;
    }
    interface SampledPositionProperty {
        maxNumSamples: number;
    }
}

var after = function <T extends Function>(fn: T, after: Function): T {
    return <T><any>function() {
        var result = fn.apply(this, arguments)
        after.call(this, result)
        return result
    }
}

function removeBeforeDate(property: any, time: JulianDate) {
    var times = property._times
    var index = ~binarySearch(times, time, JulianDate.compare)
    if (index > 0) {
        times.splice(0, index)
        property._values.splice(0, index * property._innerType.packedLength)
        property._updateTableLength = true
        property._definitionChanged.raiseEvent(property)
    }
}

SampledProperty.prototype.removeSamplesBeforeDate = function(time) {
    removeBeforeDate(this, time)
}

SampledPositionProperty.prototype.removeSamplesBeforeDate = function(time) {
    removeBeforeDate(this._property, time)
}

function removeOldSamples(property: any, maxNumSamples: number) {
    if (maxNumSamples === undefined) return;
    var removeCount = property._times.length - maxNumSamples
    if (removeCount > 0) {
        property._times.splice(0, removeCount)
        property._values.splice(0, removeCount * property._innerType.packedLength)
        property._updateTableLength = true
    }
}

SampledProperty.prototype.addSample = after(
    SampledProperty.prototype.addSample,
    function() {
        removeOldSamples(this, this.maxNumSamples)
    }
)

SampledProperty.prototype.addSamples = after(
    SampledProperty.prototype.addSamples,
    function() {
        removeOldSamples(this, this.maxNumSamples)
    }
)

SampledProperty.prototype.addSamplesPackedArray = after(
    SampledProperty.prototype.addSamplesPackedArray,
    function() {
        removeOldSamples(this, this.maxNumSamples)
    }
)

SampledPositionProperty.prototype.addSample = after(
    SampledPositionProperty.prototype.addSample,
    function() {
        removeOldSamples(this._property, this.maxNumSamples)
    }
)

SampledPositionProperty.prototype.addSamples = after(
    SampledPositionProperty.prototype.addSamples,
    function() {
        removeOldSamples(this._property, this.maxNumSamples)
    }
)

SampledPositionProperty.prototype.addSamplesPackedArray = after(
    SampledPositionProperty.prototype.addSamplesPackedArray,
    function() {
        removeOldSamples(this._property, this.maxNumSamples)
    }
)
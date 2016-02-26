// Copyright 2015 Georgia Tech Research Corporation
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// This software was created as part of a research project at the
// Augmented Environments Lab at Georgia Tech.  To support our research, we
// request that if you make use of this software, you let us know how
// you used it by sending mail to Blair MacIntyre (blair@cc.gatech.edu).
//

// Add functionality for keeping a moving window of samples per SampledProperty,
// so that the data doesn't accumulate indefinitely
import * as Cesium from 'Cesium'
import {SampledProperty, SampledPositionProperty, binarySearch, JulianDate, Matrix3, Matrix4} from './cesium-imports.ts'

Matrix3['prototype'].length = 9;
Matrix4['prototype'].length = 16;

var __slice = Array.prototype.slice

var after = function (fn:Function, after:Function) {
  return function () {
    var result = fn.apply(this, arguments)
    after.call(this, result)
    return result
  }
}

function removeBeforeDate(property:any, time:Cesium.JulianDate) {
  var times = property._times
  var index = ~binarySearch(times, time, JulianDate.compare)
  if(index > 0){
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

function removeOldSamples(property:any, maxNumSamples:number) {
  if (maxNumSamples === undefined) maxNumSamples = 10
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

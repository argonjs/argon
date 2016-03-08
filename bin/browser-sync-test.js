#!/usr/bin/env node

var bs = require('browser-sync').create();
var fs = require('fs');
var path = require('path');
var remap = require('remap-istanbul/lib/remap');
var writeReport = require('remap-istanbul/lib/writeReport');

bs.init({
    server: {
        directory: true
    },
    startPath: '../index.html',
    files: '../src/**'
}, function() {
    bs.sockets.on('connection', function(client) {
        client.on('argon:coverage', function(data) {
            var coverage = data.coverage;
            var sourceMaps = data.sourceMaps;
            var sourceJs = data.sourceJs;

            var collector = remap(coverage, {
                readFile: function(fileName) {
                    if (sourceJs[fileName]) {
                        return new Buffer(sourceJs[fileName]);
                    } else {
                        throw new Error('No such js file "' + fileName + '".');
                    }
                },
                readJSON: function(fileName) {
                    if (sourceMaps[fileName]) {
                        return sourceMaps[fileName];
                    } else {
                        throw new Error('No such source map "' + fileName + '".');
                    }
                }
            });

            writeReport(collector, 'html', path.join(__dirname, '../coverage')).then(function() {
                console.log('Wrote new coverage report to "' + path.join(__dirname, '../coverage/index.html') + '".');
            });
        });
    });
});

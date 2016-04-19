#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var ghpages = require('gh-pages');

// Create the '.nojekyll' file. This informs github that files beginning with
// an underscore should be interpreted as plain webpages rather than jekyll ones.
fs.closeSync(fs.openSync(path.join(__dirname, '../docs/.nojekyll'), 'w'));

// Publish all files in the docs folder to the gh-pages branch.
ghpages.publish(path.join(__dirname, '../docs'), {
    dotfiles: true,
    message: 'Documentation as of ' + new Date().toDateString(),
}, function(err) {
    if (err) {
        console.error(err);
    }
});

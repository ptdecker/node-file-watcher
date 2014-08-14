#!/usr/bin/nodejs --harmony
/*
 * Exemplifies watching a file for changes then spawning a separate
 * process to execute a shell function and process its subsequent
 * output stream.
 *
 * c.f. "Node.js The Right Way", by Jim R. Wilson
 */

"use strict";

const
    fs = require('fs'),
    spawn = require('child_process').spawn,
    filename = process.argv[2];

if (!filename) {
    throw Error("A file to watch must be specified!");
}

fs.watch(filename, function() {

    let ls = spawn('ls', ['-lh', filename]),
        output = '';

    ls.stdout.on('data', function(chunk) {
        output += chunk.toString();
    });

    ls.on('close', function() {
        let parts = output.split(/\s+/);
        console.dir([parts[0], parts[4], parts[8]]);
    });

});

console.log("Now watching 'target.txt' for changes...");

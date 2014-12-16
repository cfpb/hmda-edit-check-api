'use strict';


module.exports = function mocha_istanbul(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    return {
        coverage: {
            src: 'test', // the folder name for the tests
            options: {
                recursive: true,
                //quiet: true,
                excludes: [
                    'lib/database.js',
                    'lib/options.js'
                ],
                mochaOptions: [
                    '--reporter', 'spec-xunit-file'
                ]
            }
        }
    };

};
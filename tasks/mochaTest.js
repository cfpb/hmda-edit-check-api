'use strict';

module.exports = function mochaTest(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-mocha-test');

    return {
        test: {
            options:  {
                reporter: 'spec-xunit-file',
                timeout: 15000
            },
            src: ['test/**/*.js']
        }
    };

};

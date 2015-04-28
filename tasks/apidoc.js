'use strict';

module.exports = function clean(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-apidoc');

    // Options
    return {
        myapp: {
            src: './controllers',
            dest: './docs'
        }
    };
};

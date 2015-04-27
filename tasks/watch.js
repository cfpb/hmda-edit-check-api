'use strict';

module.exports = function watch(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-watch');

    return {
        js: {
            files: [
                'index.js',
                'lib/*.js',
                'models/*.js',
                'services/**/*.js',
                'controllers/**/*.js'
            ],
            tasks: ['develop'],
            options: {
                spawn: false
            }
        }
    };

};

'use strict';


module.exports = function develop(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-develop');

    return {
        server: {
            file: 'index.js'
        }
    };

};
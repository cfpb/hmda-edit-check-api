'use strict';

module.exports = function clean(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Options
    return {
        tmp: 'tmp',
        build: '.build/templates',
        options: {
//               force: true
        },
        node_modules:['node_modules/*', '!node_modules/grunt*'],
        coverage:['coverage/*'],
        docs: ['docs/*']
    };
};

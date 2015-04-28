'use strict';

module.exports = function clean(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-apidoc');

    // Options
    return {
        // apidoc: {
        myapp: {
            src: './controllers',
            dest: './docs'
        }
        // }
    };
//     return {
//         tmp: 'tmp',
//         build: '.build/templates',
//         options: {
// //               force: true
//         },
//         node_modules:['node_modules/*', '!node_modules/grunt*'],
//         coverage:['coverage/*']
//     };
};

'use strict';


module.exports = function jscs(grunt) {
    grunt.loadNpmTasks('grunt-jscs');

    // Options
    return {
        options: {
            config: '.jscsrc',
            reporter: require('jscs-stylish').path
        },
        all: {
            src: [
                'engine.js',
                'lib/{,*/}*.js',
                'test/{,*/}*Spec.js'
            ]
        },
        test: {
            src: [
                'test/{,*/}*Spec.js'
            ]
        }
    };
};

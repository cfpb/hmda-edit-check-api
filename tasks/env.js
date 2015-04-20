'use strict';


module.exports = function env(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-env');

    return {
        options: {
        },
        sandbox: {
            PORT: '8000',
            NODE_ENV: 'sandbox',
            XUNIT_FILE: 'coverage/TESTS-all.xml'
        },
        test: {
            PORT: '1337',
            NODE_ENV: 'test',
            XUNIT_FILE: 'coverage/TESTS-all.xml'
        }
    };

};
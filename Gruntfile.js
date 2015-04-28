'use strict';


module.exports = function (grunt) {

    // Load the project's grunt tasks from a directory
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });

    // handle coverage event by sending data to coveralls
    grunt.event.on('coverage', function(lcov, done){
        require('coveralls').handleInput(lcov, function(err){
            if (err) {
                return done(err);
            }
            done();
        });
    });

    /*
     * Register group tasks
     */

    //npm install
    grunt.registerTask('npm_install', 'install dependencies', function() {
        var exec = require('child_process').exec;
        var cb = this.async();
        exec('npm install', {cwd: './'}, function(err, stdout) {
            console.log(stdout);
            cb();
        });
    });

    grunt.registerTask('open_coverage', 'open coverage report in default browser', function() {
        var exec = require('child_process').exec;
        var cb = this.async();
        exec('open coverage/lcov-report/index.html', {cwd: './'}, function(err, stdout) {
            console.log(stdout);
            cb();
        });
    });

    grunt.registerTask('clean_all', ['clean:node_modules', 'clean:coverage', 'clean:docs', 'npm_install']);
    grunt.registerTask('test', ['env:test', 'clean:coverage', 'jscs:all', 'jshint', 'mocha_istanbul']);
    grunt.registerTask('coverage', ['test', 'open_coverage']);
    grunt.registerTask('generate-docs', ['clean:docs', 'apidoc']);
    grunt.registerTask('dist', ['compress:hmda-edit-check-api']);
    grunt.registerTask('serve', ['env:sandbox', 'jshint','develop','watch']);
    grunt.registerTask('codedeploy', ['compress:codedeploy']);
};

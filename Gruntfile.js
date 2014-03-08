'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: true
            },
            files: ['*.js', 'examples/*.js']
        },

        jslint: {
            server: {
                src: ['*.js', 'examples/*.js'],
                directives: {
                    node: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint:files', 'jslint']);
};
// vim: ts=4 sw=4 sts=4 et:

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'wwwroot/css/styles.css': 'wwwroot/css/sass/styles.scss'
                }
            }
        },
        watch: {
            files: ['wwwroot/css/sass/**/*.scss', 'wwwroot/js/templates/**/*.tpl.html'],
            tasks: ['sass', 'html2js']
        },
        html2js: {
            main: {
                src: ['wwwroot/js/**/*.tpl.html'],
                dest: 'wwwroot/js/modules/templates.js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};
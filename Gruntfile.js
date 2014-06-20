module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        express:{
            serverreload:true
        },
        watch: {


            files: ['public/scripts/app/home/HomeView.html'],
            tasks:'reload'

        },
        reload: {
            port: 35729,
            liveReload: {},
            proxy: {
                host: "localhost",
                port: 8080
            }
        },
        connect: {
            options: {
                port: 9090,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true

                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch' );
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-reload');
    grunt.loadNpmTasks('grunt-express');


    // Default task(s).
    grunt.registerTask('express-server', ['express','express-keepalive']);

};
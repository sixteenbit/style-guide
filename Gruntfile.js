/*
 * Generated on 2014-05-28
 * generator-assemble v0.4.11
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded',
          loadPath: [
            'bower_components/bourbon/dist'
          ]
        },
        files: {
          '<%= config.dist %>/assets/css/app.css': '<%= config.src %>/scss/assets/app.scss'
        }
      }
    },

    // Check to make sure we didn't miss any prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 9']
      },
      dist: {
        src: '<%= config.dist %>/assets/css/style.css',
        dest: '<%= config.dist %>/assets/css/style.css'
      }
    },

    // CSS minification + Add banner for WordPress
    cssmin: {
      add_banner: {
        options: {
          banner: '/*\n'+
                      'Style Guide\n'+
                      'https://github.com/mrdink/style-guide\n'+
                      'Author: Justin Peacock\n'+
                      'Author URI: http://byjust.in\n'+
                      'Version: 1.0.0\n'+
                  '*/\n'
        },
        files: {
          '<%= config.dist %>/assets/css/style.css': ['<%= config.dist %>/assets/css/style.css']
        }
      },
      prettify: {
        files: {
          '<%= config.dist %>/assets/css/prettify.css': ['bower_components/google-code-prettify/src/prettify.css']
        }
      },
    },

    // Minify all scripts
    uglify: {
      min: {
        files: {
          "<%= config.dist %>/assets/js/ui.min.js": ["<%= config.src %>/assets/js/ui.js"],
          "<%= config.dist %>/assets/js/prettify.min.js": ["bower_components/google-code-prettify/src/prettify.js"]
        }
      }
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      compass: {
        files: ['<%= config.src %>/assets/scss/**/*'],
        tasks: ['stylesheets']
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');

  // register task
  grunt.registerTask('stylesheets', [
    'sass',
    'autoprefixer',
    'cssmin'
  ]);

  grunt.registerTask('server', [
    'clean',
    'stylesheets',
    'uglify',
    'assemble',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'stylesheets',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};

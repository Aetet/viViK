/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    publicDir:  '.',
    assetDir:   'assets',
    less:       'less',
    cssDir:     'css',
    jsDir:      'js',
    bowerDir:   '<%= jsDir %>/bower_components',
    buildDir:   'build',
    testDir:    'test',
    srcDir:     'src',
    version: '<%= grunt.template.today("yyyymmddhhMM") %>',
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    requirejs: {
      compile: {
        options: {
          pragmasOnSave: {
              excludeJade: true
          },
          baseUrl: "path/to/base",
          mainConfigFile: "path/to/config.js",
          out: "path/to/optimized.js"
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ["<%= srcDir %>/<%= assetDir %>/<%= less %>"]
        },
        files: {
          "<%= buildDir %>/<%= assetDir %>/<%= cssDir %>/**/*.css": "<%= srcDir %>/<%= assetDir %>/<%= lessDir %>/**/*.less"
        }
      },
      production: {
        options: {
          paths: ["<%= srcDir %>/<%= assetDir %>/<%= less %>"],
          yuicompress: true
        },
        files: {
          "<%= buildDir %>/<%= assetDir %>/<%= cssDir %>/**/*.css": "<%= srcDir %>/<%= assetDir %>/<%= lessDir %>/**/*.less"
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      build: {
        src: ['<%= srcDir %>/<%= jsDir %>/**/*'],
        dest: '<%= buildDir %>/<%= jsDir %>/<%= version %><%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      build: {
        src: ['<%= srcDir %>/<%= jsDir %>/**/*'],
        dest: '<%= buildDir %>/<%= jsDir %>/<%= version %><%= pkg.name %>.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task.

  grunt.registerTask('default', ['jshint', 'concat' ]);

};

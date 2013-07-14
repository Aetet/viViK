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
    buildDir:   'build',
    testDir:    'test',
    srcDir:     'src',
    bowerDir:   '<%= jsDir %>/vendor',
    version: '<%= grunt.template.today("yyyymmddhhMM") %>',
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    
    // Task configuration.
    requirejs: {
      dev: {
        options: {
          pragmasOnSave: {
              excludeJade: true,
              compileDebug: true
          },

          baseUrl: '<%= srcDir %>/<%= jsDir %>/app',
          mainConfigFile: '<%= srcDir %>/<%= jsDir %>/app/require.config.js',
          name: 'main',
          optimize: 'uglify2',
          out: '<%= buildDir %>/<%= jsDir %>/core<%= version %><%= pkg.name %>.js',
          sourceMapIn: '<%= buildDir %>/<%= jsDir %>/core<%= version %><%= pkg.name %>.map',
          generateSourceMaps: true,
          useSourceUrl: true,
          preserveLicenseComments: false
        }
      },
      'css.dev': {
          options: {
              cssIn: '<%= buildDir %>/<%= assetsDir %>/<%= cssDir %>/build/styles.<%= version %>.css',
              optimizeCss: 'standard.keepLines.keepComments',
              out: '<%= buildDir %>/<%= assetsDir %>/<%= cssDir %>/styles.<%= version %>.dev.css'
          }
      }

    },

    less: {
      dev: {
        options: {
          paths: ["<%= srcDir %>/<%= assetDir %>/<%= less %>"]
        },
        files: {
          "<%= buildDir %>/<%= assetsDir %>/<%= cssDir %>/build/styles.<%= version %>.css": "<%= srcDir %>/<%= assetDir %>/<%= lessDir %>/**/*.less"
        }
      },
      prod: {
        options: {
          paths: ["<%= srcDir %>/<%= assetDir %>/<%= less %>"],
          yuicompress: true
        },
        files: {
          "<%= buildDir %>/<%= assetDir %>/<%= cssDir %>/**/*.css": "<%= srcDir %>/<%= assetDir %>/<%= lessDir %>/**/*.less"
        }
      }
    },
   
    clean: {
        resources: {
            options: {
                force: true
            },
            src: [
                '<%= buildDir %>/<%= bowerDir %>',
                '<%= buildDir %>/<%= assetsDir %>/img'
            ]
        },
        scripts: {
            options: {
                force: true
            },
            src: [
                '<%= buildDir %>/<%= jsDir %>',
                '<%= buildDir %>/<%= assetsDir %>/<%= cssDir %>',
                '<%= buildDir %>/index.html'
            ]
        },
        temp: {
          options: {
            force: true
          },
          src: [
            '<%= buildDir %>/<%= assetsDir %>/<%= cssDir %>/build'
          ]
        }

    },

    concat: {
      dev: {
        options: {
          banner: '<%= banner %>',
          stripBanners: true
        },
        build: {
          src: ['<%= srcDir %>/<%= jsDir %>/**/*'],
          dest: '<%= buildDir %>/<%= jsDir %>/<%= version %><%= pkg.name %>.js'
        }
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
    copy: {
      resources: {
        files: [
          {
            expand: true,
            cwd: '<%= assetsDir %>',
            src: 'img/**',
            dest: '<%= buildDir %>'
          }
        ]
      },

      scripts: {
        files: [
          {
            expand: true,
            cwd: '<%= srcDir %>',
            src: ['js/**/*'],
            dest: '<%= buildDir  %>'
          }
        ]
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
        dev: {
            files: ['Gruntfile.js', '<%= srcDir %>/**/*.js', '<%= srcDir %>/**/*.jade', '<%= srcDir %>/<%= assetsDir %>/less/*.less'],
            tasks: ['clean:scripts', 'styles:dev', 'requirejs:dev']
        }
    },
  });
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task.
    grunt.registerTask('styles:dev', ['copy:resources', 'less:dev', 'concat:dev', 'requirejs:css.dev', 'clean:temp']);
    grunt.registerTask('dev', ['clean', 'styles:dev', 'requirejs:dev']);
    grunt.registerTask('watcher:dev', ['dev', 'watch:dev']);
  grunt.registerTask('default', ['watcher:dev']);

};

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    publicDir:  '.',
    assetDir:   'assets',
    appDir:     'app',
    lessDir:    'less',
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
          cssIn: '<%= buildDir %>/<%= assetDir %>/<%= cssDir %>/build/styles.<%= version %>.css',
          optimizeCss: 'standard.keepLines.keepComments',
          out: '<%= buildDir %>/<%= assetDir %>/<%= cssDir %>/styles.<%= version %>.dev.css'
        }
      }
    },

    less: {
      dev: {
        options: {
          paths: ['<%= srcDir %>/<%= assetDir %>/<%= lessDir %>']
        },
        files: {
          '<%= buildDir %>/<%= assetDir %>/<%= cssDir %>/build/styles.<%= version %>.css': '<%= srcDir %>/<%= assetDir %>/<%= lessDir %>/**/*.less'
        }
      },
      prod: {
        options: {
          paths: ['<%= srcDir %>/<%= assetDir %>/<%= lessDir %>'],
          yuicompress: true
        },
        files: {
          '<%= buildDir %>/<%= assetDir %>/<%= cssDir %>/**/*.css': '<%= srcDir %>/<%= assetDir %>/<%= lessDir %>/**/*.less'
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
          '<%= buildDir %>/<%= assetDir %>/img'
        ]
      },
      scripts: {
        options: {
          force: true
        },
        src: [
          '<%= buildDir %>/<%= jsDir %>',
          '<%= buildDir %>/<%= assetDir %>/<%= cssDir %>',
          'index.html'
        ]
      },
      temp: {
        options: {
          force: true
        },
        src: [
          '<%= buildDir %>/<%= assetDir %>/<%= cssDir %>/build'
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
        files: [{
          expand: true,
          cwd: '<%=srcDir%>/<%= assetDir %>',
          src: 'img/**',
          dest: '<%= buildDir %>'
        }]
      },

      scripts: {
        files: [{
          expand: true,
          cwd: '<%= srcDir %>',
          src: ['js/**/*'],
          dest: '<%= buildDir  %>'
        }]
      }
    },

    preprocess: {
      dev: {
        files: {
          'index.html': '<%= srcDir %>/index.html'
        },
        options: {
          context: {
            VERSION: '<%= version %>',
          }
        }
      }
    },
    
    jshint: {
      all: ['<%= srcDir %>/<%= jsDir %>/<%= appDir %>/**/*.js'],
      options: {
        camelcase: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        nonew: true,
        quotmark: true,
        sub: true,
        maxparams: 4,
        boss: true,
        eqnull: true,
        browser: true,
        laxcomma: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },

    notify: {
      build: {
        options: {
          title: 'Grunt: <%= pkg.name %>.<%= version %>',  // optional
          message: 'Build complete', //required
          subtitle: '' // optional, kinda a lot for a message
        }
      }
    },
    watch: {
      dev: {
        files: ['Gruntfile.js', '<%= srcDir %>/**/*.js', '<%= srcDir %>/**/*.jade', '<%= srcDir %>/<%= assetDir %>/<%= lessDir %>/*.less'],
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
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-notify');

  // Default task.
  grunt.registerTask('styles:dev', ['copy:resources', 'less:dev', 'concat:dev', 'preprocess:dev', 'requirejs:css.dev', 'clean:temp']);
  grunt.registerTask('dev', ['clean', 'styles:dev', 'requirejs:dev', 'notify:build']);
  grunt.registerTask('watcher:dev', ['dev', 'watch:dev']);
  grunt.registerTask('default', ['watcher:dev']);

};

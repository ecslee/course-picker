'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'bin/www'
      }
    },
    prod: {
        server: {
            port: '3000',
            base: '.'
        }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server: {
        files: [
          'bin/www',
          'app.js',
          'routes/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      js: {
        files: ['public/js/*.js'],
        options: {
          livereload: reloadPort
        }
      },
      css: {
        files: [
          'public/css/*.css'
        ],
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: ['views/*.ejs'],
        options: {
          livereload: reloadPort
        }
      }
    }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          } else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', function () {
      process.env.NODE_ENV = 'development';
      grunt.task.run(['develop', 'watch']);
  });
    
  grunt.registerTask('prod', 'Run node app', function () {
      process.env.NODE_ENV = 'production';
      grunt.config('watch.options.livereload', false);
      var fileTypes = ['js', 'css', 'views'];
      for (var i = 0; i < fileTypes.length; i++) {
          grunt.config('watch.' + fileTypes[i] + '.options.livereload', false);
      }
      grunt.config('watch.server.tasks', []);
      
      grunt.log.writeln('Starting node app - course picker');
      require('./app.js').listen(grunt.config('prod.server.port'));
      grunt.task.run('watch');
  });
};

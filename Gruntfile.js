/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
	manifest: grunt.file.readJSON('manifest.json'),
    banner: '/*! <%= manifest.name %> - v<%= manifest.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= manifest.homepage_url ? "* " + manifest.homepage_url + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= manifest.author %>; \n' +
      ' Licensed under MIT */\n',
    // Task configuration.
	
	typescriptFiles: [
				'build/userscript.js',
			],
	
    concat: {
		options: 
		{
			/*banner: '<%= banner %>',
			stripBanners: true*/
		},
		UserScript: 
		{
			src: '<%= typescriptFiles %>',
			dest: 'build/package.js' //<%= pkg.name %>
			
		},
		Package: 
		{
			src: [
				'lib/header.js',
				'lib/jquery-1.10.2.js',
				'lib/jquery-ui.min.js',
				'lib/jquery-colorpicker.min.js',
				'build/package.min.js',
				'lib/footer.js'
		
			], //<%= pkg.name %>
			dest: 'ffnetlist.user.js' //<%= pkg.name %>
		}
  
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src:  'build/package.js', //'<%= concat.dist.dest %>',
        dest: 'build/package.min.js'
      }
    },
	command : {
        run_bat: 
		{
            type : 'bat',
            cmd  : 'buildCRX.bat'
        }
    },
	//FFNetChromeExtentionBuilder.exe
	/*
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
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: '<%= typescriptFiles %>' //['build/*.js', 'test/** /*.js']
      }
    },
	*/
	tslint: {
		options: {
		  configuration: grunt.file.readJSON("tslint.json")
		},
		files: {
		  src: ['FFNetParser/*.ts']
		}
	},
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },
	typescript: {
      base: {
        src: ['FFNetParser/*.ts'],
        dest: 'build',
        options: {
          module: 'amd', //or commonjs
          target: 'es5', //or es3
          basePath: 'FFNetParser',
          sourceMap: true,
          declaration: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-contrib-commands');

  // Default task.
  grunt.registerTask('default', ['tslint', 'typescript', 'concat:UserScript', 'uglify', 'concat:Package', 'command']); //, 'qunit', 'jshint'

};

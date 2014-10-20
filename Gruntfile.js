/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        manifest: grunt.file.readJSON('manifest.json'),
        banner: '// -- Start Script -- \n' +
          '/*! <%= manifest.name %> - v<%= manifest.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          ' * Commit-Hash: <%= gitinfo.local.branch.current.SHA %>\n' +
          //'//# sourceMappingURL=ffnetlist.js.map\n' +
          '<%= manifest.homepage_url ? " * " + manifest.homepage_url + "\\n" : "" %>' +
          ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= manifest.author %> \n' +
          ' * Licensed under MIT \n */\n',
        // Task configuration.

        typescriptFiles:
        [
            'build/userscript.js',
            'build/ParagraphMenu.js',
            'build/ExtentionBaseClass.js',
            'build/GUIHandler.js',
            'build/LiveChatHandler.js',
            'build/UpgradeHandler.js'
        ],
        filesToPack:
        [
            'ffnetlist.js.map',
            'ffnetlist.user.js',
            'LICENSE.txt',
            'manifest.json',
            'jquery-1.10.2.min.map',
            'style.css',
            'logoMain.png'
        ],

        concat: {
            options:
            {
                /*banner: '<%= banner %>',
                stripBanners: true*/
            },
            userscript:
            {
                src: '<%= typescriptFiles %>',
                dest: 'build/package.js' //<%= pkg.name %>

            },
            pack:
            {
                src: [
                    'build/header.js',
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
                src: 'build/package.js', //'<%= concat.dist.dest %>',
                dest: 'build/package.min.js'
            }
        },
        tslint: {
            options: {
                configuration: grunt.file.readJSON("tslint.json")
            },
            files: {
                src: ['FFNetParser/*.ts']
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
        },
        replace:
        {
            header:
            {
                options:
                {
                    patterns: [
                      {
                          match: 'VERSION',
                          replacement: '<%= manifest.version %>'
                      }
                    ]
                },
                files: [
                  { expand: true, flatten: true, src: ['lib/header.js'], dest: 'build/' }
                ]
            },
            userscript:
            {
                options:
                {
                    patterns: [
                      {
                          match: 'VERSION',
                          replacement: '<%= manifest.version %>'
                      },
                      {
                          match: 'BRANCH',
                          replacement: '<%= gitinfo.local.branch.current.name %>'
                      }
                    ]
                },
                files: [
                  { expand: true, flatten: true, src: '<%= typescriptFiles %>', dest: 'build/' }
                ]
            }
        },
        gitinfo: {
            // Fills a local Array with Git-specific data
            // https://github.com/damkraw/grunt-gitinfo
            options: {}
        },
        copy:
        {
            map:
            {
                src: 'build/userscript.js.map',
                dest: 'ffnetlist.js.map'
            },
            style:
            {
                src: 'build/style.css',
                dest: 'style.css'
            },
            crx:
            {
                src: '<%= filesToPack %>',
                dest: 'Chrome'
            }
        },
        less: {
            production:
            {
                options:
                {
                    //paths: ["less"]
                },
                files:
                {
                    "build/style.css": "style.less"
                }
            }
        },
        compress:
        {
            main: {
                options: {
                    archive: 'publish.zip'
                },
                files: [
                  { src: '<%= filesToPack %>', dest: '.', filter: 'isFile' }
                ]
            }
        },
        exec:
        {
            buildCrx:
            {
                command: 'buildcrx.bat',
                stdout: true,
                stderr: false
            }
        },
        clean:
        {
            build:
            {
                src: ["build", "publish.zip", "Chrome.crx", "style.css"]
            },
            chrome:
            {
                src: "Chrome"
            }
        },
        qunit:
        {
            options:
            {
                timeout: 5000
            },
            all: ['test/*.html']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-gitinfo');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    // Default task.
    grunt.registerTask('default',
      [
          'clean:build',
          'tslint',
          'typescript',
          'replace:header',
          'gitinfo',
          'replace:userscript',
          'concat:userscript',
          'uglify',
          'concat:pack',
          'less',
          'copy:style'
      ]);

    grunt.registerTask('style',
      [
         'less',
         'copy:style'
      ]);


    grunt.registerTask('package',
	[
		'default',
		'qunit', // Start the Unit Tests
		//'exec',
		//'clean:chrome',
		'compress'
	]);

};

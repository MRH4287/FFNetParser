/*global module:false*/
module.exports = function (grunt)
{

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
            'logoMain.png',
            'logoDev.png'
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
            },
            big:
            {
                src: [
                    'build/header.js',
                    'lib/jquery-1.10.2.js',
                    'lib/jquery-ui.min.js',
                    'lib/jquery-colorpicker.min.js',
                    'build/package.js',
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
                    sourceMap: false,
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
            },
            manifestBackup:
            {
                src: 'manifest.json',
                dest: 'manifestBase.json'
            }, manifestRestore:
            {
                src: 'manifestBase.json',
                dest: 'manifest.json'
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
            update:
            {
                command: 'git pull origin <%= gitinfo.local.branch.current.name %>',
                stdout: true,
                stderr: true
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
            },
            manifestBase:
            {
                src: ["manifestBase.json"]
            }
        },
        qunit:
        {
            options:
            {
                timeout: 5000
            },
            all: ['test/*.html']
        },
        update_json:
        {
            options:
            {
                indent: '\t'
            },
            manifestDev:
            {
                src: 'manifestDev.json',
                dest: 'manifest.json',
                fields: [
                    'key',
                    'icons'
                ]
            }
        },
        language:
            {
                files: {
                    src: ['FFNetParser/*.ts']
                }
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
    grunt.loadNpmTasks('grunt-update-json');

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

    grunt.registerTask('big',
     [
         'clean:build',
         'tslint',
         'typescript',
         'replace:header',
         'gitinfo',
         'replace:userscript',
         'concat:userscript',
         'concat:big',
         'less',
         'copy:style'
     ]);

    grunt.registerTask('style',
      [
         'less',
         'copy:style'
      ]);


    grunt.registerTask('packageDefault',
     [
         'default',
         'qunit',
         'compress'
     ]);

    grunt.registerTask('packageDev',
    [
        'big',
        'qunit',
        'copy:manifestBackup',
        'update_json:manifestDev',
        'compress',
        'copy:manifestRestore',
        'clean:manifestBase',
        'language'
    ]);

    grunt.registerTask('devSwitch', function ()
    {
        var branch = grunt.config.get("gitinfo").local.branch.current.name;
        console.log("Current Branch: %s", branch);

        if (branch !== "dev")
        {
            grunt.task.run(['packageDefault']);
        }
        else
        {
            grunt.task.run(['packageDev']);
        }
    });

    grunt.registerTask('package',
        [
            'gitinfo',
            'devSwitch'
        ]);

    // AutoUpdate 
    grunt.registerTask('update',
        [
            'gitinfo',
            'exec:update',
            'big'
        ]);



    // Language Implementation


    grunt.registerMultiTask('language', 'Handles Language Definitions', function ()
    {
        var options = this.options({
            output: "build/langage.json",
            verbose: true
        });

        var text = {};


        this.files.forEach(function (file)
        {
            file.src.filter(function (filepath)
            {
                if (!grunt.file.exists(filepath))
                {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                }
                else
                {
                    if (options.verbose)
                    {
                        grunt.log.writeln("Check for Language Files: " + filepath);
                    }
                    var content = grunt.file.read(filepath);
                    var lines = content.split('\n');



                    for (var lineNumber in lines)
                    {
                        var line = Number(lineNumber) + 1;

                        var reg = /_\(["']([^)]+)["']\)/mgi;
                        var matches = lines[lineNumber].match(reg);

                        for (var key in matches)
                        {
                            var el = matches[key].trim();

                            var reg = /_\(["']([^)]+)["']\)/mgi;
                            var groups = reg.exec(el);
                            var langKey = groups[1];

                            if (options.verbose)
                            {
                                grunt.log.writeln("Found Language Key: '" + langKey + "' in File: '" + filepath + ":" + line + "'");
                            }

                            if (typeof (text[langKey]) === "undefined")
                            {
                                text[langKey] = [];
                            }
                            text[langKey].push(filepath + "#L" + line);

                        }
                    }

                    return true;
                }
            });

        });

        // Write results to file:
        grunt.log.writeln("Write Language File to: '" + options.output + "'");

        var json = JSON.stringify(text, null, 4);
        grunt.file.write(options.output, json);

    });



};

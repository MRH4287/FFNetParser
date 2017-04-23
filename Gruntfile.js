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
            'build/Core/Types.js',
            'build/Const/Events.js',
            'build/Core/ExtentionBaseClass.js',

            
            'build/Core/ApiController.js',
            'build/Core/EventHandler.js',  
            'build/Addons/ParagraphMenu.js',
            'build/Addons/GUIHandler.js',   
            'build/Addons/LiveChatHandler.js',
            'build/Addons/FFNetHandler.js',
            'build/Addons/AO3Handler.js',
            'build/Addons/UpgradeHandler.js',
            'build/Addons/UserHandler.js',
            'build/Addons/GithubAPI.js', 
            'build/Addons/ChromeSyncAddon.js',
            'build/Addons/AutoUpdateAddon.js',
            'build/Addons/PocketAddon.js',
            'build/Addons/EndlessModeHandler.js',
            'build/Addons/HighlighterHandler.js',
            'build/Addons/DebugHandler.js',
            
            'build/userscript.js',
            'build/Core/Start.js'

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
            'logoDev.png',
            'FFNetParser/GameEngine/run.js',
            'FFNetParser/GameEngine/package.min.js',
            'FFNetParser/GameEngine/astar.js'
        ],

        FFNetaddons: [
            "GithubAPI",
            "GUIHandler",
            "LiveChatHandler",
            "ParagraphMenu",
            "UpgradeHandler",
            "UserHandler",
            "ChromeSyncAddon",
            "AutoUpdateAddon",
            "PocketAddon",
            "HighlighterHandler",
            "EndlessModeHandler",
            "FFNetHandler",
            "DebugHandler"
        ],

        AOOOaddons: [
            "GUIHandler",
            "AO3Handler",
            "DebugHandler"
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
                    'lib/bootstrap-colorpicker.min.js',
                    'lib/bootstrap.min.js',
                    'lib/jquery.signalR-2.2.0.min.js',
                    'FFNetParser/Interface/HubsConfig.js',
                    'build/package.min.js',
                    'lib/footer.js',
                    'build/addons.js'

                ], //<%= pkg.name %>
                dest: 'ffnetlist.user.js' //<%= pkg.name %>
            },
            big:
            {
                src: [
                    'build/header.js',
                    'lib/jquery-1.10.2.js',
                    'lib/jquery-ui.min.js',
                    'lib/bootstrap-colorpicker.min.js',
                    'lib/bootstrap.min.js',
                    'lib/jquery.signalR-2.2.0.min.js',
                    'FFNetParser/Interface/HubsConfig.js',
                    'build/package.js',
                    'lib/footer.js',
                    'build/addons.js'

                ], //<%= pkg.name %>
                dest: 'ffnetlist.user.js' //<%= pkg.name %>
            },
            packAo:
            {
                src: [
                    'build/headerAO3.js',
                    'lib/jquery-1.10.2.js',
                    'lib/jquery-ui.min.js',
                    'lib/bootstrap-colorpicker.min.js',
                    'lib/bootstrap.min.js',
                    'lib/jquery.signalR-2.2.0.min.js',
                    'FFNetParser/Interface/HubsConfig.js',
                    'build/package.min.js',
                    'lib/footer.js',
                    'build/addons.js'

                ], //<%= pkg.name %>
                dest: 'ffnetlist.ao3.user.js' //<%= pkg.name %>
            },
            bigAo:
            {
                src: [
                    'build/header.js',
                    'lib/jquery-1.10.2.js',
                    'lib/jquery-ui.min.js',
                    'lib/bootstrap-colorpicker.min.js',
                    'lib/bootstrap.min.js',
                    'lib/jquery.signalR-2.2.0.min.js',
                    'FFNetParser/Interface/HubsConfig.js',
                    'build/package.js',
                    'lib/footer.js',
                    'build/addons.js'

                ], //<%= pkg.name %>
                dest: 'ffnetlist.ao3.user.js' //<%= pkg.name %>
            },
            standalone:
            {
                src: [
                    'lib/jquery-1.10.2.js',
                    'lib/jquery-ui.min.js',
                    'lib/bootstrap-colorpicker.min.js',
                    'build/standalone/main.js',
                    'build/standalone/Standalone.js',
                    'build/standalone/ProgressIndicator.js'
                ],
                dest: 'build/standalone/Standalone.pack.js'
            }

        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: 'build/package.js', //'<%= concat.dist.dest %>',
                dest: 'build/package.min.js'
            },
            standalone:
            {
                src: 'build/standalone/Standalone.pack.js',
                dest: 'build/standalone/Standalone.pack.min.js'

            }
        },
        tslint: {
            options: {
                configuration: grunt.file.readJSON("tslint.json")
            },
            files: {
                src: ['FFNetParser/**/*.ts', '!FFNetParser/**/*.d.ts']
            }
        },
        typescript: {
            base: {
                src: ['FFNetParser/**/*.ts'],
                dest: 'build',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
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
                            replacement: '<%= version %>'
                        }
                    ]
                },
                files: [
                    { expand: true, flatten: true, src: ['lib/header.js'], dest: 'build/' }
                ]
            },
            headerAO3:
            {
                options:
                {
                    patterns: [
                        {
                            match: 'VERSION',
                            replacement: '<%= version %>'
                        }
                    ]
                },
                files: [
                    { expand: true, flatten: true, src: ['lib/headerAO3.js'], dest: 'build/' }
                ]
            },
            userscript:
            {
                options:
                {
                    patterns: [
                        {
                            match: 'VERSION',
                            replacement: '<%= version %>'
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
            standalone:
            {
                src: 'FFNetParser/standalone/*.html',
                dest: 'build/standalone/',
                flatten: true,
                expand: true,
                filter: 'isFile'
            },
            standaloneCode:
            {
                src: 'build/package.js',
                dest: 'build/standalone/main.js'
            }, standaloneStyle:
            {
                src: 'build/style.css',
                dest: 'build/standalone/style.css'
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
                    "build/style.css": "style.less",
                    "build/standalone/ffnetStyle.css": "ffnetStyle.less"
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
                timeout: 30000
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
            },
            manifestVersion:
            {
                src: 'manifest.json',
                dest: 'manifest.json',
                fields:
                {
                    'version': function (src)
                    {
                        return grunt.config.get("version")
                    }
                }
            }
        },
        language:
        {
            files: {
                src: ['FFNetParser/*.ts']
            }
        },
        addons:
        {
            ffnet: {
                options: {
                    addons: '<%= FFNetaddons %>'
                }
            },
            aooo: {
                options: {
                    addons: '<%= AOOOaddons %>'
                } 
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

    grunt.registerTask('compile',
        [
            'clean:build',
            'tslint',
            'typescript'
        ]);

    // Default task.
    grunt.registerTask('default',
        [
            'gitinfo',
            'versionUpdate',
            'compile',
            'replace:header',
            'replace:userscript',
            'addons:ffnet',
            'concat:userscript',
            'uglify:dist',
            'concat:pack',
            'less',
            'copy:style'
        ]);

    grunt.registerTask('big',
        [
            'gitinfo',
            'versionUpdate',
            'compile',
            'replace:header',
            'replace:userscript',
            'addons:ffnet',
            'concat:userscript',
            'concat:big',
            'less',
            'copy:style'
        ]);

    grunt.registerTask('ao',
        [
            'gitinfo',
            'versionUpdate',
            'compile',
            'replace:headerAO3',
            'replace:userscript',
            'addons:aooo',
            'concat:userscript',
            'uglify:dist',
            'concat:packAo',
            'less',
            'copy:style'
        ]);

    grunt.registerTask('aoBig',
        [
            'gitinfo',
            'versionUpdate',
            'compile',
            'replace:headerAO3',
            'replace:userscript',
            'addons:aooo',
            'concat:userscript',
            'concat:bigAo',
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
            'update_json:manifestVersion',
            'compress',
            'copy:manifestRestore',
            'clean:manifestBase',
            'language'
        ]);

    grunt.registerTask('standalone',
        [
            'gitinfo',
            'versionUpdate',
            'copy:standalone',
            'copy:standaloneCode',
            'copy:standaloneStyle',
            'concat:standalone',
            'uglify:standalone'
        ]);


    grunt.registerTask('jenkinsDev',
        [
            'big',
            'qunit',
            'copy:manifestBackup',
            'update_json:manifestDev',
            'update_json:manifestVersion',
            'compress',
            'copy:manifestRestore',
            'clean:manifestBase',
            'language',
            'standalone'

        ]);

    grunt.registerTask('jenkins',
        [
            'packageDefault',
            'standalone'

        ]);

    grunt.registerTask('versionUpdate', function ()
    {
        var manifest = grunt.config.get("manifest");
        console.log("Current Version: " + manifest.version);

        var version = manifest.version;
        var branch = grunt.config.get("gitinfo").local.branch.current.name;

        if (branch === "dev")
        {
            var time = new Date();
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            var day = time.getDate();
            var hour = time.getHours();
            var minutes = time.getMinutes();

            console.log("year:", year);
            console.log("month:", month);
            console.log("day:", day);
            console.log("hour:", hour);
            console.log("minutes:", minutes);

            var versionSuffix = year * 10
                + month * 1000
                + day * 100
                + hour * 10
                + minutes;
            version = version + "." + versionSuffix;

            console.log("Set Dev-Version to: ", version);
        }

        grunt.config("version", version);
    });

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
            'versionUpdate',
            'devSwitch'
        ]);

    // AutoUpdate 
    grunt.registerTask('update',
        [
            'gitinfo',
            'exec:update',
            'big'
        ]);


    // Add Addons
    grunt.registerMultiTask('addons', 'Adds Addon-Initializers', function ()
    {
        var options = this.options({
            output: "build/addons.js",
            addons: ["GUIHandler"]
        });
        var text = "";
        
        options.addons.push("Start");

        for (var i in options.addons)
        {
            text += "new " + options.addons[i] + "(parser); ";
        }


        grunt.file.write(options.output, text);

    });


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

                            reg = /_\(["']([^)]+)["']\)/mgi;
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

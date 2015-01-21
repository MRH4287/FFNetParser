/// <reference path="userscript.ts" />

class GUIHandler extends ExtentionBaseClass
{
    public constructor(parser: StoryParser)
    {
        super(parser);
    }

    /**
     * The Container for the GUI
     */
    private guiContainer: JQuery = null;

    /** 
     * The number of new Entries created 
     */
    private addCount = 0;

    /**
     * Registered GUIs
     */
    private guiData: { [index: string]: GUIData } = {};

    /**
     * Registered Categories
     */
    private categories: { [index: string]: GUICategory } = {};


    public registerGUI(name: string, collection: any, elements: GUIElement[], sticky: boolean = false, customSave?: (data: GUIData) => void): GUIData
    {
        this.log("Register GUI- Name: " + name + " Elements: ", elements);

        if (typeof (this.guiData[name]) !== "undefined")
        {
            this.log("Warning: overwriting GUI Data for: ", name);
            delete this.guiData[name];
        }

        var element: GUIData = {
            collection: collection,
            name: name,
            guiData: elements,
            instances: {},
            customSaveFunction: customSave,
            sticky: sticky
        };

        this.guiData[name] = element;

        return element;
    }

    public registerCategory(data: GUICategory)
    {
        if (typeof (this.categories[data.name]) !== "undefined")
        {
            this.log("Warning: overwriting category Data for: ", data.name);
            delete this.categories[data.name];
        }

        this.categories[data.name] = data;
    }

    public renderGUI(element: GUIData, target: JQuery)
    {
        if (typeof (element) === "undefined")
        {
            throw new Error("The Property 'element' isn't allowed to be undefined!");
        }

        this.createElements(target, element.guiData, element.instances);
    }

    public renderGUIElement(name: string, target: JQuery)
    {
        if (typeof (this.guiData[name]) === "undefined")
        {
            this.log("No GUI with found with the name: ", name);
            return;
        }

        var data = this.guiData[name];

        this.renderGUI(data, target);
    }


    private saveData(data: GUIData)
    {
        var self = this;

        if (typeof (data.customSaveFunction) === "undefined")
        {

            $.each(data.guiData, function (_, element: GUIElement)
            {
                if (element.debugOnly && !self.DEBUG)
                {
                    return;
                }

                // Check if Element exists:
                if (typeof (data.instances[element.name]) === "undefined")
                {
                    self.log("Can't find GUI Instance for element '" + element.name + "'! Won't save Data!");
                    return;
                }

                var value = null;

                if (typeof (element.result) === "undefined")
                {
                    self.log("Warning: Element don't have Result Callback set!", element);
                    return;
                }

                value = element.result(data.instances[element.name]);

                if (value === null)
                {
                    // Do not set Config Value for this Element ...

                    return;
                }

                var collection = data.collection;

                if (typeof (collection) === "function")
                {
                    collection = collection();
                }

                if (typeof (collection) !== "object")
                {
                    this.log(element);
                    throw new Error("The parameter 'collection' has to be of type 'object'! Given: " + typeof (collection));
                }

                collection[element.name] = value;

                if (!data.sticky)
                {
                    delete self.guiData[data.name];
                }
            });
        }
        else
        {
            data.customSaveFunction(data);

            if (!data.sticky)
            {
                delete self.guiData[data.name];
            }
        }
    }

    public saveDataElement(name: string)
    {
        if (typeof (this.guiData[name]) === "undefined")
        {
            this.log("No GUI with found with the name: ", name);
            return;
        }

        var data = this.guiData[name];
        this.saveData(data);
    }

    public saveAll()
    {
        var self = this;
        $.each(this.guiData, function (name: string, element: GUIData)
        {
            self.log("Save Data: " + element.name);

            self.saveData(element);
        });



    }


    public initGUI()
    {
        this.guiData = {};
        this.categories = {};

        var self = this;

        var sortFunctions: {
            name: string;
            id: string;
        }[] = [];

        $.each(this.parser.sortMap, (index, element: SortFunctionDefinition) =>
        {
            sortFunctions.push({
                id: index,
                name: element.Name
            });

        });

        var storyData = this.registerGUI("config-story", this.config,
            [
                {
                    name: 'sortFunction',
                    type: GUIElementType.Combobox,
                    label: self._('Sort Elements by'),
                    value: function ()
                    {
                        return self.config.sortFunction;
                    },
                    values: sortFunctions,
                    customOptions: function (element: JQuery)
                    {
                        element.change(function ()
                        {
                            var value = element.val();
                            if (self.parser.sortMap[value] !== undefined)
                            {
                                self.parser.sortStories(self.parser.sortMap[value].Function);
                            }

                        });

                    }
                },
                {
                    name: "story_search_depth",
                    type: GUIElementType.Input,
                    label: self._("Max Search depth"),
                    value: function () { return self.config.story_search_depth; },
                    attributes:
                    {
                        'size': '50'
                    }
                },
                {
                    name: 'mark_M_storys',
                    type: GUIElementType.Checkbox,
                    value: function () { return self.config.mark_M_storys; },
                    label: self._('Mark "M" rated Stories')
                },
                {
                    name: 'hide_non_english_storys',
                    type: GUIElementType.Checkbox,
                    value: function () { return self.config.hide_non_english_storys; },
                    label: self._('Hide non English Stories')
                },
                {
                    name: 'allow_copy',
                    type: GUIElementType.Checkbox,
                    value: function () { return self.config.allow_copy; },
                    label: self._('Allow the selection of Text')
                },
                {
                    name: "endless_enable",
                    type: GUIElementType.Checkbox,
                    value: function ()
                    {
                        return self.config.endless_enable;
                    },
                    label: self._("Enable EndlessMode")
                },
                {
                    name: "endless_forceClickAfter",
                    type: GUIElementType.Input,
                    value: function ()
                    {
                        return self.config.endless_forceClickAfter;
                    },
                    label: self._("Number of Chapters/Pages after which the user is forced to manually go to the next one")
                }

            ]
            );

        this.registerCategory(
            {
                name: "story",
                title: self._("Story Settings"),
                elements: storyData
            });

        var layoutData = this.registerGUI("config-layout", this.config,
            [
                {
                    name: 'hide_images',
                    type: GUIElementType.Checkbox,
                    value: function () { return self.config.hide_images; },
                    label: self._('Hide Story Images')
                },
                {
                    name: 'hide_lazy_images',
                    type: GUIElementType.Checkbox,
                    value: function () { return self.config.hide_lazy_images; },
                    label: '<abbr title="' + self._('Hide Images that are loaded after the first run. Mostly Story Images, not User Images') + '">' + self._("Hide lazy images") + '</abbr>'
                },
                {
                    name: 'disable_image_hover',
                    type: GUIElementType.Checkbox,
                    value: function () { return self.config.disable_image_hover; },
                    label: self._('Disable Image Hover Effect')
                },
                {
                    name: 'content_width',
                    type: GUIElementType.Input,
                    value: function () { return self.config.content_width; },
                    label: self._('Content Width'),
                    attributes:
                    {
                        size: 50
                    }
                },
                {
                    name: 'color_normal',
                    type: GUIElementType.Color,
                    value: function () { return self.config.color_normal; },
                    label: self._('Normal Background-Color'),
                    attributes:
                    {
                        size: 50,
                        placeholder: self._("Click to change Color")
                    },
                    customOptions: function (element) 
                    {
                        /*
                        element.colorpicker({
                            colorFormat: "#HEX"
                        }).after('<small style="margin-left:10px">Click field to change color</small>');
                        */
                    }
                },
                {
                    name: 'color_mouse_over',
                    type: GUIElementType.Color,
                    value: function () { return self.config.color_mouse_over; },
                    label: self._('MouseOver Background-Color'),
                    attributes:
                    {
                        size: 50,
                        placeholder: self._("Click to change Color")
                    },
                    customOptions: function (element) 
                    {
                        /*
                        element.colorpicker({
                            colorFormat: "#HEX"
                        }).after('<small style="margin-left:10px">Click field to change color</small>');
                        */
                    }
                },
                {
                    name: 'color_odd_color',
                    type: GUIElementType.Color,
                    value: function () { return self.config.color_odd_color; },
                    label: self._('Odd Background-Color'),
                    attributes:
                    {
                        size: 50,
                        placeholder: self._("Click to change Color")
                    },
                    customOptions: function (element) 
                    {
                        /*
                        element.colorpicker({
                            colorFormat: "#HEX"
                        }).after('<small style="margin-left:10px">Click field to change color</small>');
                        */
                    }
                },
                {
                    name: 'readingHelp_enabled',
                    type: GUIElementType.Checkbox,
                    value: function () { return self.config.readingHelp_enabled; },
                    label: self._('Enable the Reading Help')
                },
                {
                    name: 'readingHelp_backgroundColor',
                    type: GUIElementType.Color,
                    value: function () { return self.config.readingHelp_backgroundColor; },
                    label: self._('Reading Help Background Color'),
                    attributes:
                    {
                        size: 50,
                        placeholder: self._("Click to change Color")
                    },
                    customOptions: function (element)
                    {
                        /*
                        element.colorpicker({
                            colorFormat: "#HEX"
                        }).after('<small style="margin-left:10px">Click field to change color</small>');
                        */
                    }
                },
                {
                    name: 'readingHelp_color',
                    type: GUIElementType.Color,
                    value: function () { return self.config.readingHelp_color; },
                    label: self._('Reading Help Text Color'),
                    attributes:
                    {
                        size: 50,
                        placeholder: self._("Click to change Color")
                    },
                    customOptions: function (element)
                    {
                        /*
                        element.colorpicker({
                            colorFormat: "#HEX"
                        }).after('<small style="margin-left:10px">Click field to change color</small>');
                        */
                    }
                },
                {
                    name: 'enable_chapter_review_ratio',
                    type: GUIElementType.Checkbox,
                    value: function () { return self.config.enable_chapter_review_ratio; },
                    label: self._('Enable the Chapter/Review Ratio Info')
                },
                {
                    name: 'enable_read_chapter_info',
                    type: GUIElementType.Checkbox,
                    value: function () { return self.config.enable_read_chapter_info; },
                    label: self._('Enable Read-Chapter-Info')
                },
                {
                    name: 'reading_info_ChapterMarker',
                    type: GUIElementType.Input,
                    value: function () { return self.config.reading_info_ChapterMarker; },
                    label: self._('Read Chapter - Chapter Name Template'),
                    customOptions: function (el: JQuery)
                    {
                        el.after("<br/><small>" + self._("The Text '{Name}' is replaced by the Chapter Name") + "</small>");
                    }
                },
                {
                    name: '',
                    type: GUIElementType.Custom,
                    value: function ()
                    {
                        return '';
                    },
                    label: '',

                    customOptions: function (el)
                    {
                        if (chrome === undefined)
                        {
                            el.parent().parent().remove();
                        }
                        var res = Math.random();

                        if (self.DEBUG)
                        {
                            console.log(res);
                        }

                        if (!self.DEBUG && res < 0.8)
                        {
                            el.parent().parent().remove();
                        }
                    },
                    customElement: function ()
                    {
                        return $('<button><img src="https://www.mrh-development.de/FanFictionUserScript/SSLProxy/?url=graphics/animations/pichu/stand-down/stand-down.png"/></button>')
                            .click(function ()
                            {
                                self.gui_hide();

                                $('<script></script>').attr("src", chrome.extension.getURL('FFNetParser/GameEngine/package.min.js')).appendTo($("head"));
                                $('<script></script>').attr("src", chrome.extension.getURL('FFNetParser/GameEngine/astar.js')).appendTo($("head"));

                                window.setTimeout(function ()
                                {
                                    $('<script></script>').attr("src", chrome.extension.getURL('FFNetParser/GameEngine/run.js')).appendTo($("head"));
                                }, 500);

                                if (self.config.token !== "MRH")
                                {
                                    var data = {
                                        Token: self.config.token,
                                        Type: "EasterEgg",
                                        Title: "EasterEgg",
                                        Message: "EasterEgg found!",
                                        Version: self.VERSION,
                                        Branch: self.BRANCH
                                    };

                                    self.parser.apiRequest({ command: "postFeedback", data: JSON.stringify(data) }, function () { });
                                }
                            })
                            .attr('title', "Hello!");
                    }
                }
            ]);


        this.registerCategory(
            {
                name: "layout",
                title: self._("Layout Settings"),
                elements: layoutData
            });

        var apiData = this.registerGUI("config-api", this.config,
            [
                {
                    name: '',
                    type: GUIElementType.Text,
                    label: "--------",
                    value: function () { return ' ---- <a href="http://www.getpocket.com">Pocket</a> ' + self._('Settings') + ' ----'; }
                },
                {
                    name: 'pocket_user',
                    type: GUIElementType.Input,
                    label: self._('Username'),
                    value: function () { return self.config.pocket_user; },
                    attributes:
                    {
                        size: 50
                    }
                },
                {
                    name: 'pocket_password',
                    type: GUIElementType.Input,
                    label: self._('Password'),
                    value: function () { return self.config.pocket_password; },
                    attributes:
                    {
                        size: 50,
                        type: 'password'
                    }
                },
                {
                    name: '',
                    type: GUIElementType.Text,
                    label: "--------",
                    value: function () { return ' ---- ' + self._('API Settings') + ' ----'; }
                },
                {
                    name: 'api_url',
                    type: GUIElementType.Custom,
                    label: self._('Server Back-end Address'),
                    value: function () { return ''; },
                    debugOnly: true,
                    result: function (element)
                    {
                        return element.find('.dataContainer').first().val();
                    },
                    customElement: function ()
                    {
                        return $('<span></span>').
                            append(
                            $('<input type="text" class="dataContainer ffnetparser_InputField" id="fflist-api_url" />')
                                .attr('size', '50')
                                .val(self.config.api_url)
                            ).append(
                            $("<button>Default</button>").click(function ()
                            {
                                $('#fflist-api_url').val("https://www.mrh-development.de/FanFictionUserScript");
                            })
                            ).append(
                            $("<button>Local</button>").click(function ()
                            {
                                $('#fflist-api_url').val("http://localhost:49990/FanFictionUserScript");
                            })
                            );
                    }
                },
                {
                    name: 'api_webSocketServerAddress',
                    type: GUIElementType.Custom,
                    label: 'Live-Chat Back-end Address',
                    value: function () { return ''; },
                    debugOnly: true,
                    result: function (element)
                    {
                        return element.find('.dataContainer').first().val();
                    },
                    customElement: function ()
                    {
                        return $('<span></span>').
                            append(
                            $('<input type="text" class="dataContainer ffnetparser_InputField" id="fflist-api_webSocketServerAddress" />')
                                .attr('size', '50')
                                .val(self.config.api_webSocketServerAddress)
                            ).append(
                            $("<button>Default</button>").click(function ()
                            {
                                $('#fflist-api_webSocketServerAddress').val("wss://www.mrh-development.de:8182");
                            })
                            ).append(
                            $("<button>Local</button>").click(function ()
                            {
                                $('#fflist-api_webSocketServerAddress').val("ws://127.0.0.1:8182");
                            })
                            );
                    }
                },
                {
                    name: 'api_github_url',
                    type: GUIElementType.Custom,
                    label: 'Github API-URL',
                    value: function () { return ''; },
                    debugOnly: true,
                    result: function (element)
                    {
                        return element.find('.dataContainer').first().val();
                    },
                    customElement: function ()
                    {
                        return $('<span></span>').
                            append(
                            $('<input type="text" class="dataContainer ffnetparser_InputField" id="fflist-api_github_url" />')
                                .attr('size', '50')
                                .val(self.config.api_github_url)
                            ).append(
                            $("<button>Default</button>").click(function ()
                            {
                                $('#fflist-api_github_url').val("https://www.mrh-development.de/api/ffgithub");
                            })
                            ).append(
                            $("<button>Local</button>").click(function ()
                            {
                                $('#fflist-api_github_url').val("https://localhost:44300/api/ffgithub");
                            })
                            );
                    }
                },
                {
                    name: 'api_github_requestStart_url',
                    type: GUIElementType.Custom,
                    label: 'Github Request URL',
                    value: function () { return ''; },
                    debugOnly: true,
                    result: function (element)
                    {
                        return element.find('.dataContainer').first().val();
                    },
                    customElement: function ()
                    {
                        return $('<span></span>').
                            append(
                            $('<input type="text" class="dataContainer ffnetparser_InputField" id="fflist-api_github_requestStart_url" />')
                                .attr('size', '50')
                                .val(self.config.api_github_requestStart_url)
                            ).append(
                            $("<button>Default</button>").click(function ()
                            {
                                $('#fflist-api_github_requestStart_url').val("https://www.mrh-development.de/FFNetGithub/RedirectToAccessSite/");
                            })
                            ).append(
                            $("<button>Local</button>").click(function ()
                            {
                                $('#fflist-api_github_requestStart_url').val("https://localhost:44300/FFNetGithub/RedirectToAccessSite/");
                            })
                            );
                    }
                },
                {
                    name: 'api_checkForUpdates',
                    type: GUIElementType.Checkbox,
                    label: self._('Check for Updates'),
                    value: function () { return self.config.api_checkForUpdates; },
                    customOptions: function (checkbox)
                    {
                        checkbox.change(function ()
                        {
                            if (!$("#fflist-api_checkForUpdates").is(":checked"))
                            {
                                $("#fflist-api_autoIncludeNewVersion").attr("disabled", "disabled");
                            }
                            else
                            {
                                $("#fflist-api_autoIncludeNewVersion").removeAttr("disabled");
                            }

                        });
                    }
                },
                {
                    name: 'api_autoIncludeNewVersion',
                    type: GUIElementType.Checkbox,
                    label: self._('Auto Update'),
                    value: function () { return self.config.api_autoIncludeNewVersion; },
                    customOptions: function (element)
                    {
                        // Only Check if the Script is not loaded over Chrome!
                        if (typeof (chrome) !== "undefined")
                        {
                            element.removeProp("checked").prop("disabled", "disabled").attr("title", self._("The Update-Feature is disabled in the Chrome Version. " +
                                "Chrome updates the Script for you! If you have problems, please send me a Message."));
                        }
                    }
                },
                {
                    name: 'token',
                    type: GUIElementType.Input,
                    label: '<abbr title="' + self._('Used for identification on the Web-Service [e.g. Synchronization]') + '">' + self._('Token') + '</abbr> ',
                    value: function () { return self.config.token; },
                    attributes:
                    {
                        size: 50,
                        pattern: "[0-9a-zA-Z]+"
                    }
                }

            ]);

        this.registerCategory(
            {
                name: "api",
                title: self._("API Settings"),
                elements: apiData
            });

        var availableLanguages: { name: string; id: string; }[] = [];
        if (this.parser.availableLanguges !== null)
        {
            $.each(this.parser.availableLanguges, function (__, lang: LanguageData)
            {
                availableLanguages.push({
                    id: lang.LanguageCode,
                    name: lang.Name
                });

            });

        }
        else
        {
            availableLanguages.push({
                id: "en",
                name: "Data not availble!"
            });
        }



        var advancedData = this.registerGUI("config-advanced", this.config,
            [
                {
                    name: 'language',
                    type: GUIElementType.Combobox,
                    label: self._('Language'),
                    value: function () { return self.config.language; },
                    values: availableLanguages,
                    customOptions: function (element: JQuery)
                    {
                        element.change(function ()
                        {
                            var selected = element.val();

                            if (selected !== self.config.language)
                            {
                                self.parser.api_getLanguage(selected, undefined, true, true);
                            }

                        });
                    }
                },
                {
                    name: 'disable_highlighter',
                    type: GUIElementType.Checkbox,
                    label: '<abbr title="' + self._('Disable the Story Highlighter Feature.') + '">' + self._('Disable Highlighter') + '</abbr>',
                    value: function () { return self.config.disable_highlighter; }
                },
                {
                    name: 'disable_cache',
                    type: GUIElementType.Checkbox,
                    label: '<abbr title="' + self._('Disable the Caching function used for the in Story search.') + '">' + self._('Disable Cache') + '</abbr>',
                    value: function () { return self.config.disable_cache; }
                },
                {
                    name: 'disable_parahraphMenu',
                    type: GUIElementType.Checkbox,
                    label: '<abbr title="' + self._('Disable the Paragraph Menu.') + '">' + self._('Disable Paragraph Menu') + '</abbr>',
                    value: function () { return self.config.disable_parahraphMenu; }
                },
                {
                    name: 'disable_sync',
                    type: GUIElementType.Checkbox,
                    label: self._('Disable Synchronization Feature'),
                    value: function () { return self.config.disable_sync; }
                },
                {
                    name: 'disable_default_coloring',
                    type: GUIElementType.Checkbox,
                    label: '<abbr title="' + self._('This disables the color change in the Story-List. Do not affect Filter / Highlighter') + '">' + self._('Disable the default Coloration') + '</abbr>',
                    value: function () { return self.config.disable_default_coloring; }
                },
                {
                    name: 'disable_inStory_parsing',
                    type: GUIElementType.Checkbox,
                    label: self._('Disable the parsing of Stories'),
                    value: function () { return self.config.disable_inStory_parsing; }
                },
                {
                    name: 'disable_resort_after_filter_match',
                    type: GUIElementType.Checkbox,
                    label: self._('Disable the resorting of Elements after a Filter match'),
                    value: function () { return self.config.disable_resort_after_filter_match; }

                },
                {
                    name: 'chrome_sync',
                    type: GUIElementType.Checkbox,
                    label: self._('Use Chrome to Synchronize Data'),
                    value: function () { return self.config.chrome_sync; },
                    customOptions: function (el)
                    {
                        if (typeof (chrome) === undefined)
                        {
                            el.prop("disabled", true).attr("title", self._("Only available in Chrome"));
                        }
                        else
                        {
                            el.change(function ()
                            {
                                if (el.is(":checked"))
                                {
                                    if (confirm(self._("If you enable Sync, your local storage will be overwritten by Cloud Storage. " +
                                        "If there is none, your config is uploaded instead. Are you sure?")))
                                    {
                                        var wait = $("<span>&nbsp; " + self._('Please wait ...') + "</span>");
                                        el.after(wait);


                                        // Load Config from the Chrome Server:
                                        chrome.storage.sync.get(function (result: Config)
                                        {
                                            wait.remove();

                                            self.log("Got Data from Chrome Server: ", result);

                                            $.each(self.parser.config, function (name, oldValue)
                                            {
                                                if (result[name] !== undefined)
                                                {
                                                    self.log("Key: '" + name + "'", oldValue, result[name]);

                                                    self.parser.config[name] = result[name];
                                                }
                                            });

                                            self.parser.save_config();
                                        });


                                    }
                                    else
                                    {
                                        el.prop("checked", false);
                                    }


                                }


                            });



                        }

                    }
                }

            ]);


        this.registerCategory(
            {
                name: "advanced",
                title: self._("Advanced Settings"),
                elements: advancedData
            });

    }




    /**
    * Creates a block of Elements in the Container Element and saves the Elements with its IDs in the saveTo Variable
    * @param parent The Elements will be added to this Container
    * @param elements The List of Element-Options
    * @param the Collection to save the Input-Data to
    */
    private createElements(parent: JQuery, elements: GUIElement[], saveTo: any)
    {
        var self = this;

        $.each(elements, function (_, data: GUIElement)
        {
            if (typeof (saveTo[data.name]) !== "undefined")
            {
                delete saveTo[data.name];
            }


            var element: JQuery = null;

            if ((data.debugOnly === true) && !self.parser.DEBUG)
            {
                return;
            }

            var id = "fflist-element-" + Math.floor(Math.random() * 1000000);

            switch (data.type)
            {
                case GUIElementType.Input:

                    element = $('<input type="text" id="' + id + '"/>');
                    element.val(data.value());

                    if (typeof (data.result) === "undefined")
                    {
                        data.result = function (e)
                        {
                            return element.val();
                        };
                    }

                    break;
                case GUIElementType.Checkbox:

                    element = $('<input type="checkbox" id="' + id + '"/>');
                    if (data.value() === true)
                    {
                        element.attr('checked', 'checked');
                    }

                    if (typeof (data.result) === "undefined")
                    {
                        data.result = function (e)
                        {
                            return element.is(":checked");
                        };
                    }

                    break;
                case GUIElementType.Button:

                    element = $('<input type="button" class="btn"  id="' + id + '"/>');
                    element.val(data.value());

                    if (typeof (data.callback) !== "undefined")
                    {
                        element.click(data.callback);
                    }

                    if (typeof (data.result) === "undefined")
                    {
                        data.result = function (e)
                        {
                            return null;
                        };
                    }

                    break;
                case GUIElementType.Combobox:

                    element = $('<select id="' + id + '"/>');

                    if (typeof (data.values) !== "undefined")
                    {
                        $.each(data.values, function (_, option)
                        {
                            var el = $("<option/>").attr("value", option.id).text(option.name).appendTo(element);
                            if (option.id === data.value())
                            {
                                el.prop("selected", true);
                            }
                        });
                    }

                    if (typeof (data.result) === "undefined")
                    {
                        data.result = function (e)
                        {
                            return element.val();
                        };
                    }

                    break;
                case GUIElementType.Text:

                    element = $('<p></p>').html(data.value());

                    if (typeof (data.result) === "undefined")
                    {
                        data.result = function (e)
                        {
                            return null;
                        };
                    }

                    break;

                case GUIElementType.Color:

                    element = $('<input type="text" id="' + id + '"/>')
                        .val(data.value());

                    // Because i want to append something, i need to do that after the element was appended to the List
                    // In order to do that, i need to wrap the CustomOptions Function
                    var co = data.customOptions;
                    data.customOptions = function (el)
                    {
                        var colorPreview = $('<div></div>')
                            .css("width", "15px")
                            .css("height", "15px")
                            .css("border", "1px solid black")
                            .css("display", "inline-block")
                            .css("background-color", data.value());

                        el.change((e) =>
                        {
                            colorPreview.css("background-color", String(data.result(element)));
                        })
                            .after('&nbsp;<small style="margin-left:10px">' + self._("Click field to change color") + '</small>')
                            .after(
                            colorPreview
                            );

                        if (typeof (co) === "function")
                        {
                            co(el);
                        }

                    };

                    element.colorpicker({
                        colorFormat: "#HEX"
                    });

                    if (typeof (data.result) === "undefined")
                    {
                        data.result = function (e)
                        {
                            return element.val();
                        };
                    }

                    break;

                case GUIElementType.Custom:

                    if (typeof (data.customElement) !== "undefined")
                    {
                        element = data.customElement(data);

                        if (typeof (data.result) === "undefined")
                        {
                            self.log("Warning: Custom Element do not have Result set! ", data);
                        }

                    }
                    else
                    {
                        element = $('<p style="color: red; text-size: 15px">' + self._('Missing Custom Element!') + '</p>');
                    }

                    break;
            }

            if (typeof (data.attributes) !== "undefined")
            {
                $.each(data.attributes, function (key, value)
                {
                    element.attr(key, value);
                });
            }

            if (typeof (data.css) !== "undefined")
            {
                $.each(data.css, function (key, value)
                {
                    element.css(key, value);
                });
            }

            if (data.debugOnly)
            {
                data.label = "[" + data.label + "]";
            }


            parent.append(
                $('<tr></tr>').append(
                    $('<td width="30%" style="height: 30px"></td>').append(
                        $('<label></label>')
                            .html(data.label)
                            .css('font-weight', 'bold')
                            .attr("for", element.attr('id'))
                        )
                        .css('border-right', '1px solid gray')
                    ).append(
                    $('<td class="ffnetparser_InputField"></td>').append(
                        element
                        )
                    )
                );

            if (typeof (data.customOptions) !== "undefined")
            {
                data.customOptions(element);
            }

            saveTo[data.name] = element;
            //self.settingsElements[data.name] = element;

        });

    }


    /*
    *   Creates the GUI used for the Menus
    */
    private gui_create()
    {
        this.log("Creating GUI ");

        var container = $('<div title="Fanfiction Story Parser"></div>')
            .hide();

        $("body").append(container);

        this.guiContainer = container;

        this.log("GUI Created");

    }

    // ---- GUI Helpers 

    // Buttons

    private getSaveButtonContainer()
    {
        var saveButtonContainer = $('<div class="fflist-buttonContainer"></div>');

        $('<input class="btn btn-danger" type="button" value="' + this._("Save") + '"></input>')
        /*.button({
            icons: {
                primary: "ui-icon-check"
            }
        })
        */
            .addClass("ffnetSaveButton").appendTo(saveButtonContainer);

        return saveButtonContainer;
    }

    // Button Logic:
    private buttonLogic = function ()
    {
        var target = $(this).attr("data-target");

        $(".ffnet_Config_Button_Container").fadeOut(400, function ()
        {
            $("." + target).fadeIn();
        });

    };

    private backLogic = function ()
    {
        $(".ffnet_Config_Category:visible").fadeOut(400, function ()
        {
            $(".ffnet_Config_Button_Container").fadeIn();
        });
    };

    // Render SubLogic:

    private getButton = function (name, target, container)
    {
        return $("<div></div>").addClass("ffnet_Config_Button").text(name)
            .attr("data-target", target).click(this.buttonLogic).appendTo(container);
    };

    private getCategory(name, id, container)
    {
        var cat = $("<div></div>").addClass("ffnet_Config_Category").addClass(id).appendTo(container);
        var headline = $("<div></div>").addClass("headline").appendTo(cat);
        var backField = $("<div></div>").addClass("back").appendTo(headline);
        var backButton = $('<button class="btn">' + this._('Back') + '</back>').click(this.backLogic).appendTo(backField);
        var textField = $("<div></div>").appendTo(headline).text(name);

        var table = $('<table width="100%" cellpadding="5"></table>').appendTo(cat);


        var result =
            {
                category: cat,
                headline: headline,
                table: table
            };

        return result;
    }

    // ----------

    /**
     *   Renders GUI for the Config-Menu
     */
    private gui_update()
    {
        var self = this;

        this.log("Update GUI");
        this.guiContainer.html('');

        // Reset Position:
        //_guiContainer.css("position", "absolute");

        this.addCount = 0;

        // Displays current Version:
        this.guiContainer.attr("title", "Fanfiction Story Parser - Version: " + this.VERSION + " - Branch: " + this.BRANCH);


        // render Settings Container:
        var settingsContainer = $("<div></div>")
            .addClass("ffnet_settingsContainer")

            .appendTo(this.guiContainer);

        this.log("Container rendered");



        // ----------- GUI -------------------------

        var spacer = $('<tr></tr>').append
            (
            $('<td width="30%" style="height:10px"></td>')
                .css('border-right', '1px solid gray')
            ).append(
            $('<td></td>')
            );


        var buttonContainer = $('<div class="ffnet_Config_Button_Container"></div>').appendTo(settingsContainer);
        var saveButtonContainer = this.getSaveButtonContainer();

        $.each(this.categories, function (name, element: GUICategory)
        {
            self.getButton(element.title, "ffnetConfig-" + element.name, buttonContainer);
        });

        // --------------------------------------------------------------------------------------------------------------------------

        $.each(this.categories, function (name, element: GUICategory)
        {
            self.log("Render Category: ", element);

            var cat = self.getCategory(element.title, "ffnetConfig-" + element.name, settingsContainer);
            element.instance = cat.category;
            var table = cat.table;

            self.renderGUI(element.elements, table);

            cat.category.append(saveButtonContainer.clone());

        });


        // --------------------------------------------------------------------------------------------------------------------------

        this.log("GUI - Add Markers: ", this.config.marker);

        var container = $("<div></div>").appendTo(this.guiContainer);


        var count = 0;

        $.each(this.config.marker, function (name, marker)
        {
            self.gui_add_form(name, marker, container);

            count++;
        });


        if (count === 0)
        {
            // No marker found. Add Notification:

            var infoContainer = $('<div class="ffnet-InfoContainer"></div>').appendTo(container);
            infoContainer.append('<p>' + self._('There are currently no Filter defined.') + '</p>');
            infoContainer.append($('<button class="btn btn-primary">' + self._('Create Filter') + '</button>').click(function ()
            {
                $("#ffnet-addNewFilter").trigger("click");
            })).append('<span>&nbsp;</span>')
                .append($('<button class="btn btn-default">' + self._('Import') + '</button>').click(function ()
                {
                    $("#ffnet-ImportButton").trigger("click");
                })).append('<span>&nbsp;</span>')
                .append($('<button class="btn btn-default">' + self._('Need Help?') + '</button>').click(function ()
                {
                    var win = window.open("https://github.com/MRH4287/FFNetParser/wiki/Filter", '_blank');
                    win.focus();
                }));



        }


        this.log("GUI - Markers added");

        // --------------------------------------------------------------------------------------------------------------------------

        var filterButtonContainer = saveButtonContainer.clone();
        filterButtonContainer.appendTo(this.guiContainer);

        $('<input class="btn brn-default" id="ffnet-addNewFilter" type="button" value="' + self._('Add new Filter') + '"></input>')
        /*.button({
            icons: {
                primary: "ui-icon-plusthick"
            }
        }) */
            .click(function ()
            {
                $(".ffnet-InfoContainer").fadeOut();

                self.gui_add_form('New-Form ' + (self.addCount++),
                    {
                        name: null,
                        display: true,
                        keywords: [

                        ],
                        ignore: [

                        ],
                        color: '#FFFFFF',
                        mouseOver: '#FFFFFF',
                        background: null,
                        search_story: false,
                        keep_searching: false,
                        mark_chapter: false,
                        print_story: false,
                        mention_in_headline: true,
                        text_color: '#686868',
                        revision: -1,
                        priority: 1,
                        customPriority: null,
                        ignoreColor: false,
                        image: null,
                        note: null,
                        highlight_color: null
                    }, container
                    , true // Display Big
                    );

            }).appendTo(filterButtonContainer);


        $('<input class="btn btn-default" id="ffnet-ImportButton" type="button" value="' + self._('Import Filter') + '"></input>')
        /*
        .button({
            icons: {
                primary: "ui-icon-plusthick"
            }
        })
        */
            .click(function (event)
            {
                event.preventDefault();


                // Create Dialog:
                var dialog = $('<div></div>').attr("title", self._("Import Filter"))
                    .append(
                    $('<textarea rows="5" cols="20" class="FilterInput"></textarea>')
                    )
                    .append(
                    $('<button class="btn">' + self._('Save') + '</button>')
                        .button()
                        .click(function (e)
                        {
                            e.preventDefault();

                            var text = dialog.find(".FilterInput").val();

                            try
                            {
                                var newMarker: MarkerConfig = JSON.parse(text);

                                self.gui_add_form(newMarker.name, newMarker, container, true);

                            }
                            catch (error)
                            {
                                console.error("Can't Parse JSON: " + error);
                            }

                            dialog.dialog("close");
                        })
                    ).appendTo($("body"));

                dialog.dialog({
                    close: function (event, ui) 
                    {
                        dialog.remove();
                    }
                });


            }).appendTo(filterButtonContainer);



        // Save Logic
        $(".ffnetSaveButton").click(function ()
        {
            self.log("Save Config");

            self.saveAll();

            /*
           

            self.config.story_search_depth = Number(self.settingsElements['story_search_depth'].val());
            self.config.mark_M_storys = self.settingsElements['mark_M_storys'].is(':checked');
            self.config.hide_non_english_storys = self.settingsElements['hide_non_english_storys'].is(':checked');
            self.config.hide_images = self.settingsElements['hide_images'].is(':checked');
            self.config.hide_lazy_images = self.settingsElements['hide_lazy_images'].is(':checked');
            self.config.disable_image_hover = self.settingsElements['disable_image_hover'].is(':checked');
            self.config.allow_copy = self.settingsElements['allow_copy'].is(':checked');
            self.config.disable_highlighter = self.settingsElements['disable_highlighter'].is(':checked');
            self.config.disable_cache = self.settingsElements['disable_cache'].is(':checked');
            self.config.disable_parahraphMenu = self.settingsElements['disable_parahraphMenu'].is(':checked');
            self.config.disable_sync = self.settingsElements['disable_sync'].is(':checked');
            self.config.content_width = self.settingsElements['content_width'].val();
            self.config.color_normal = self.settingsElements['color_normal'].val();
            self.config.color_odd_color = self.settingsElements['color_odd_color'].val();
            self.config.color_mouse_over = self.settingsElements['color_mouse_over'].val();
            self.config.readingHelp_enabled = self.settingsElements['readingHelp_enabled'].is(':checked');
            self.config.readingHelp_color = self.settingsElements['readingHelp_color'].val();
            self.config.readingHelp_backgroundColor = self.settingsElements['readingHelp_backgroundColor'].val();
            self.config.pocket_user = self.settingsElements['pocket_user'].val();
            self.config.pocket_password = self.settingsElements['pocket_password'].val();
            self.config.api_checkForUpdates = self.settingsElements['api_checkForUpdates'].is(':checked');
            self.config.api_autoIncludeNewVersion = self.settingsElements['api_autoIncludeNewVersion'].is(':checked');
            self.config.token = self.settingsElements['token'].val();

            if (self.DEBUG)
            {
                self.config.api_url = self.settingsElements['api_url'].find('.dataContainer').first().val();
            }

            */

            if (self.parser.save_config())
            {

                self.log("Config Saved Successfully");
            }
            else
            {
                alert("Warning: An error occured while saving your Config. Your changes may not be saved! Please check the Console for more Information.");
            }


            self.gui_hide();
        });




        this.log("GUI Update Complete");
    }

    /**
     *   Add a form for filter input
     *   @param name Name of the Input field
     *   @param marker Marker Config
     *   @param mainContainer Container for addition
     *   @param displayBig Don't minimize Element after adding
     */
    private gui_add_form(name: string, marker: MarkerConfig, mainContainer: JQuery, displayBig: boolean = false)
    {
        this.log("GUI Add Form: ", name);

        var radius = 10;

        var height = '35';

        if (displayBig)
        {
            height = 'auto'; //580;
        }

        var container = $('<div class="fflist-filterField"></div>')
            .css('height', height + 'px')


            .appendTo(mainContainer)
            .hide();

        if (!displayBig)
        {
            container.css("cursor", "pointer")
                .attr('title', "Click to Edit")

                .click(function ()
                {
                    container.css('height', 'auto');
                    container.css("cursor", "auto");
                    container.removeAttr("title")
                        .unbind();

                });

        }

        var replace = new RegExp("[ /.\-]", "g");
        var UID = name.replace(replace, "");


        var table = $('<table width="100%" cellpadding="5"></table>').appendTo(container);

        var self = this;

        this.registerGUI(name, function () { return self.config.marker[name]; },
            [
                {
                    name: 'name',
                    type: GUIElementType.Input,
                    label: self._('Name'),
                    value: function ()
                    {
                        return name;
                    },
                    attributes:
                    {
                        size: 50
                    }
                },
                {
                    name: 'display',
                    type: GUIElementType.Checkbox,
                    label: self._('Display Found Entries'),
                    value: function ()
                    {
                        return marker.display;
                    }
                },
                {
                    name: 'keywords',
                    type: GUIElementType.Input,
                    label: self._('Keywords'),
                    value: function ()
                    {
                        return marker.keywords.join(', ');
                    },
                    result: function (element)
                    {
                        return element.val().split(", ");
                    },
                    attributes:
                    {
                        size: 50
                    },
                    customOptions: function (input)
                    {
                        input.parent().append(
                            '<br><span style="font-size: small;">' + self._('Separated by ", "') + '</span>'
                            );
                    }
                },
                {
                    name: 'ignore',
                    type: GUIElementType.Input,
                    label: self._('Ignore when'),
                    value: function ()
                    {
                        return marker.ignore.join(', ');
                    },
                    result: function (element)
                    {
                        return element.val().split(", ");
                    },
                    attributes:
                    {
                        size: 50
                    },
                    customOptions: function (input)
                    {
                        input.parent().append(
                            '<br><span style="font-size: small;">' + self._('Separated by ", "') + '</span>'
                            );
                    }
                },
                {
                    name: 'priority',
                    type: GUIElementType.Custom,
                    label: self._("Priority"),
                    customElement: function (data: GUIElement): JQuery
                    {

                        var container = $('<div class="form-horizontal"></div>');

                        var elementContainer: JQuery;
                        var label: JQuery;
                        var element: JQuery;


                        for (var i = 1; i <= 5; i++)
                        {
                            label = $('<label class="radio-inline lineHeight"></label>').appendTo(container);

                            element = $('<input type="radio"></input>')
                                .attr("name", "ffnet-" + UID + "-priority")
                                .attr("id", "ffnet-" + UID + "-priority-" + i)
                                .attr("value", i)
                                .appendTo(label);

                            label.append(i);

                            if (data.value() === i)
                            {
                                element.prop("checked", true);
                            }

                        }

                        // Custom:

                        label = $('<label class="radio-inline lineHeight"></label>').appendTo(container);

                        element = $('<input type="radio"></input>')
                            .attr("name", "ffnet-" + UID + "-priority")
                            .attr("id", "ffnet-" + UID + "-priority-Custom")
                            .attr("value", -1)
                            .appendTo(label);

                        label.append(self._("Custom"));

                        if (data.value() === -1)
                        {
                            element.prop("checked", true);
                        }

                        container.find("input").change(function (e)
                        {
                            var currentSelected = $(this).parent().find("input").filter(":checked");
                            if (currentSelected.length === 0)
                            {
                                console.warn("There should be something selected ... :/");
                            }
                            else
                            {
                                if (Number(currentSelected.val()) === -1)
                                {
                                    $("#ffnet-" + UID + "-customPriorityCotainer").slideDown();
                                }
                                else
                                {
                                    $("#ffnet-" + UID + "-customPriorityCotainer").slideUp();
                                }
                            }

                        });


                        return container;

                    },
                    result: function (el)
                    {
                        // Not used!

                        return null;
                    },
                    value: function ()
                    {
                        return marker.priority;
                    }


                },
                {
                    name: "customPriority",
                    type: GUIElementType.Custom,
                    label: self._("Custom Priority"),
                    customElement: function (data: GUIElement): JQuery
                    {

                        var defaultValues: ModififcationPriority = {
                            background: 1,
                            color: 1,
                            highlight_color: 1,
                            mouseOver: 1,
                            text_color: 1
                        };

                        var value: ModififcationPriority = data.value();
                        if ((value === undefined) || (value === null))
                        {
                            value = defaultValues;
                        }
                        else
                        {
                            $.each(value, function (name, element)
                            {
                                if ((element === undefined) || (element === null))
                                {
                                    value[name] = defaultValues[name];
                                }
                            });
                        }


                        var mainContainer = $('<div></div>')
                            .attr("id", "ffnet-" + UID + "-customPriorityCotainer");

                        if (marker.priority !== -1)
                        {
                            mainContainer.hide();
                        }

                        var options = {
                            color: self._("Color"),
                            mouseOver: self._("Mouse Over Color"),
                            text_color: self._("Info Text Color"),
                            highlight_color: self._("Highlight Color"),
                            background: self._("Background Image")
                        };


                        $.each(options, function (name, description)
                        {
                            $('<div class="lineHeight" style="margin-top:5px"></div>')
                                .text(description + ": ")
                                .appendTo(mainContainer);

                            var container = $('<div class="form-horizontal"></div>').appendTo(mainContainer);

                            var elementContainer: JQuery;
                            var label: JQuery;
                            var element: JQuery;



                            for (var i = 0; i <= 5; i++)
                            {
                                label = $('<label class="radio-inline lineHeight"></label>').appendTo(container);

                                element = $('<input type="radio"></input>')
                                    .attr("name", "ffnet-" + UID + "-customPrioritry-" + name)
                                    .attr("id", "ffnet-" + UID + "-customPrioritry-" + name + i)
                                    .attr("data-priorityName", name)
                                    .attr("value", i)
                                    .appendTo(label);

                                label.append((i !== 0) ? i : self._("Disable"));

                                if (value[name] === i)
                                {
                                    element.prop("checked", true);
                                }

                            }
                        });

                        return mainContainer;
                    },
                    result: function (el)
                    {
                        // Not used!
                    },
                    value: function ()
                    {
                        return marker.customPriority;
                    }

                },
                {
                    name: 'ignoreColor',
                    type: GUIElementType.Checkbox,
                    label: self._('Ignore Color Settings'),
                    value: function ()
                    {
                        return marker.ignoreColor;
                    },
                    customOptions: function (checkbox)
                    {


                        var check = function ()
                        {
                            if (checkbox.is(":checked"))
                            {
                                $('#fflist-' + UID + '-color')
                                    .add('#fflist-' + UID + '-mouseOver')
                                    .add('#fflist-' + UID + '-text_color')
                                    .attr("disabled", "disabled");
                            }
                            else
                            {
                                $('#fflist-' + UID + '-color')
                                    .add('#fflist-' + UID + '-mouseOver')
                                    .add('#fflist-' + UID + '-text_color')
                                    .removeAttr("disabled");
                            }
                        };

                        checkbox.change(function ()
                        {
                            check();
                        });

                        window.setTimeout(check, 10);
                    }
                },
                {
                    name: 'color',
                    type: GUIElementType.Color,
                    value: function ()
                    {
                        return marker.color;
                    },
                    label: self._('Color'),
                    attributes:
                    {
                        id: 'fflist-' + UID + '-color',
                        placeholder: self._("Click to change Color")
                    }
                },
                {
                    name: 'mouseOver',
                    type: GUIElementType.Color,
                    value: function ()
                    {
                        return marker.mouseOver;
                    },
                    label: self._('Mouse Over Color'),
                    attributes:
                    {
                        id: 'fflist-' + UID + '-mouseOver',
                        placeholder: self._("Click to change Color")
                    }
                },
                {
                    name: 'text_color',
                    type: GUIElementType.Color,
                    value: function ()
                    {
                        return marker.text_color;
                    },
                    label: self._('Info Text Color'),
                    attributes:
                    {
                        id: 'fflist-' + UID + '-text_color',
                        placeholder: self._("Click to change Color")
                    }
                },
                {
                    name: 'highlight_color',
                    type: GUIElementType.Color,
                    value: function ()
                    {
                        return marker.highlight_color;
                    },
                    label: self._('Highlight Color'),
                    attributes:
                    {
                        id: 'fflist-' + UID + '-highlight_color',
                        placeholder: self._("Click to change Color")
                    },
                    debugOnly: true
                },
                {
                    name: 'background',
                    type: GUIElementType.Input,
                    value: function ()
                    {
                        return marker.background;
                    },
                    label: self._('Background Image')
                },
                {
                    name: 'search_story',
                    type: GUIElementType.Checkbox,
                    value: function ()
                    {
                        return marker.search_story;
                    },
                    label: self._('Search in Stories')
                },
                {
                    name: 'mark_chapter',
                    type: GUIElementType.Checkbox,
                    value: function ()
                    {
                        return marker.mark_chapter;
                    },
                    label: self._('Mark Chapter')
                },
                {
                    name: 'print_story',
                    type: GUIElementType.Checkbox,
                    value: function ()
                    {
                        return marker.print_story;
                    },
                    label: self._('List Stories')
                },
                {
                    name: 'keep_searching',
                    type: GUIElementType.Checkbox,
                    value: function ()
                    {
                        return marker.keep_searching;
                    },
                    label: self._('Keep Searching')
                },
                {
                    name: 'mention_in_headline',
                    type: GUIElementType.Checkbox,
                    value: function ()
                    {
                        return marker.mention_in_headline;
                    },
                    label: self._('Mention in Headline')
                },
                {
                    name: 'image',
                    type: GUIElementType.Input,
                    value: function ()
                    {
                        return marker.image;
                    },
                    label: self._('Info Image'),
                    customOptions: (el) =>
                    {
                        var container = $("<div></div>");
                        el.after(container);

                        var image = $("<img></img>")
                            .css("width", "30px")
                            .css("height", "30px")
                            .css("margin-left", "5px")
                            .css("border", "1px solid black")
                            .css("display", "inline-block")
                            .addClass("clickable");

                        image.clone()
                            .attr("src", self.parser.getUrl("none.gif"))
                            .appendTo(container)
                            .attr("title", self._("Clear Selection"))
                            .click(function ()
                            {
                                el.val("");
                            });

                        for (var i = 1; i <= 6; i++)
                        {
                            image.clone()
                                .attr("src", self.parser.getUrl(i + ".gif"))
                                .appendTo(container)
                                .attr("title", self._("Click to select this Image"))
                                .click(function ()
                                {
                                    el.val($(this).attr("src"));
                                });
                        }

                    }
                },
                {
                    name: 'note',
                    type: GUIElementType.Input,
                    value: function ()
                    {
                        return marker.note;
                    },
                    label: self._('Note'),
                    debugOnly: true
                },
                {
                    name: '',
                    type: GUIElementType.Button,
                    value: function ()
                    {
                        return self._('Remove');
                    },
                    label: '',
                    callback: function ()
                    {
                        self.guiData[name].instances['name'].val('');

                        container.fadeOut(function ()
                        {
                            container.remove();
                        });

                    }
                },
                {
                    name: '',
                    type: GUIElementType.Custom,
                    value: function ()
                    {
                        return '';
                    },
                    result: function ()
                    {
                        return null;
                    },
                    label: '',
                    customElement: function ()
                    {
                        var elementContainer = $("<div></div>");
                        $('<div style="display:inline-block; width: 80%"></div>').appendTo(elementContainer).append(

                            $('<img src="' + self.parser.getUrl('glyphicons_369_collapse_top.png') + '" alt="' + self._('Minimize') + '"></img>').click(function ()
                            {

                                container
                                    .unbind()
                                    .css("cursor", "pointer")
                                    .css("height", "35px")
                                    .attr('title', "Click to Edit");

                                setTimeout(function ()
                                {
                                    container.click(function ()
                                    {
                                        container.css('height', 'auto');
                                        container.css("cursor", "auto");
                                        container.removeAttr("title");

                                    });

                                }, 100);
                            }).css("cursor", "pointer")
                            );

                        $('<div style="display:inline-block; width: 10%"></div>').appendTo(elementContainer).append(
                            $('<button class="btn btn-default">' + self._('Export') + '</button>')
                            //.button()
                                .click(function (event)
                                {
                                    event.preventDefault();

                                    // Create Dialog:
                                    var dialog = $('<div></div>').attr("title", self._("Export Data for Element: ") + marker.name)
                                        .append(
                                        $("<pre></pre>").text(JSON.stringify(marker))
                                        ).appendTo($("body"));

                                    dialog.dialog({
                                        close: function (event, ui) 
                                        {
                                            dialog.remove();
                                        }
                                    });
                                })
                            );

                        return elementContainer;
                    }
                }
            ], false, function (data)
            {
                if (typeof (self.config.marker[data.name]) !== "undefined")
                {
                    delete self.config.marker[data.name];
                }

                var name = data.instances['name'].val();
                if (name === "")
                {
                    return;
                }

                // Priority:
                var priority: number = 1;
                var selectedPriority = data.instances['priority'].find(":checked");

                priority = Number(selectedPriority.val());

                // CustomPriority

                var customPriority: ModififcationPriority =
                    {
                        color: null,
                        background: null,
                        highlight_color: null,
                        mouseOver: null,
                        text_color: null

                    };

                var el = data.instances['customPriority'];

                $.each(customPriority, function (name, _)
                {
                    var elements = el.find('[data-priorityName="' + name + '"]');
                    if (elements.length === 0)
                    {
                        console.warn("Can't find Elements for Priority:", name, el);
                    }
                    else
                    {
                        customPriority[name] = Number(elements.filter(":checked").val());
                    }

                    if (customPriority[name] === null || customPriority[name] === undefined || customPriority[name] === NaN || customPriority[name] < 0)
                    {
                        customPriority[name] = 1;
                    }


                });

                // ....

                var config =
                    {
                        name: name,
                        color: data.instances['color'].val(),
                        ignore: data.instances['ignore'].val().split(', '),
                        keywords: data.instances['keywords'].val().split(', '),
                        mark_chapter: data.instances['mark_chapter'].is(':checked'),
                        mention_in_headline: data.instances['mention_in_headline'].is(':checked'),
                        display: data.instances['display'].is(':checked'),
                        mouseOver: data.instances['mouseOver'].val(),
                        print_story: data.instances['print_story'].is(':checked'),
                        search_story: data.instances['search_story'].is(':checked'),
                        keep_searching: data.instances['keep_searching'].is(':checked'),
                        ignoreColor: data.instances['ignoreColor'].is(':checked'),
                        background: data.instances['background'].val(),
                        text_color: data.instances['text_color'].val(),
                        image: (data.instances['image'] !== undefined) ? data.instances['image'].val() : null,
                        note: (data.instances['note'] !== undefined) ? data.instances['note'].val() : null,
                        priority: priority,
                        customPriority: customPriority,
                        highlight_color: (data.instances['highlight_color'] !== undefined) ? data.instances['highlight_color'].val() : null,
                        revision: ((typeof (self.config.marker[name]) === "undefined") || (typeof (self.config.marker[name].revision) === "undefined")) ? 0 : self.config.marker[name].revision + 1
                    };

                if (config.text_color === "")
                {
                    config.text_color = "#686868";
                }

                if (self.DEBUG)
                {
                    console.log("Filter '" + name + "' saved: ", config);
                }

                self.config.marker[name] = config;

            });

        this.renderGUIElement(name, table);


        container.fadeIn();

        this.log("Form added");
    }

    /**
     *   Hides the GUI
     */
    private gui_hide()
    {
        this.guiContainer.dialog("close");
        this.guiContainer.remove();
        this.guiContainer = null;

        //_guiContainer.fadeOut();
    }

    /**
     *   Displays the GUI
     */
    private gui_show(closeCallback: () => void = null)
    {
        var self = this;

        if (closeCallback === null)
        {
            closeCallback = function ()
            {
                if (confirm(self._("All unsaved changes will be deleted!")))
                {
                    $(this).dialog("close");
                }
            };
        }


        var buttons = {

            "Synchronization": function ()
            {
                if (confirm(self._("All unsaved changes will be deleted!")))
                {
                    self.gui_hide();

                    self.syncGUI();
                }
            },

            "Config Import / Export": function ()
            {
                if (confirm(self._("All unsaved changes will be deleted!")))
                {
                    self.openSaveConfig();
                }
            },

            "Menu": function ()
            {
                // Reopen:
                if (confirm(self._("All unsaved changes will be deleted!")))
                {
                    self.gui_hide();

                    self.gui();

                }

            },

            "Reset Config": function ()
            {
                if (confirm(self._('Are you sure to overwrite the Config? This will overwrite all your changes!')))
                {
                    $(this).dialog("close");

                    self.guiData = {};
                    self.categories = {};
                    self.addCount = 0;

                    self.initGUI();

                    self.parser.defaultConfig();
                }

            },

            Close: closeCallback
        };

        if (this.config.disable_sync)
        {
            delete buttons["Synchronization"];
        }

        this.guiContainer.dialog({
            resizable: true,
            modal: true,
            height: 900,
            width: 664,
            buttons: buttons
        });


        // _guiContainer.fadeIn();
    }

    /**
     *   Creates and displays the GUI
     */
    public gui()
    {
        this.initGUI();

        if (this.guiContainer == null)
        {
            this.gui_create();
        }

        this.gui_update();
        this.gui_show();

    }

    /**
     *   Open "Save Config" Sub-menu
     */
    public openSaveConfig()
    {
        if (this.guiContainer == null)
        {
            this.gui_create();
        }

        var self = this;

        if (this.guiContainer.is(':visible'))
        {
            // Currently Visible, reopen
            this.gui_hide();

            this.openSaveConfig();

        } else
        {
            this.guiContainer.html('');

            /*
            $('<div style="width:100%; text-align:right; margin-bottom: 5px"></div>').append(
                $('<input class="btn" type="button" value="Close"></input>').click(function ()
                {
                    if (confirm("All unsaved changes will be deleted!"))
                    {
                        _gui_hide();
                    }

                })
            ).appendTo(_guiContainer);
            */

            var accordion = $("<div></div>").appendTo(this.guiContainer);

            // -------- Manual Import -------------

            accordion.append("<h3>" + this._("Manual Import") + "</h3>");

            var manualContainer = $("<div></div>").appendTo(accordion);

            manualContainer.append('<label for="ffnet-config-display">Your current Config:</label><br/>');

            var old = $('<textarea id="ffnet-config-display" style="width:90%; height: 100px;"></textarea>')
                .val(this.parser.getConfig())
                .appendTo(manualContainer);


            manualContainer.append('<br/><label for="ffnet-config-set">Import Config:</label><br/>');

            var neu = $('<textarea id="ffnet-config-set" style="width:90%; height: 100px;"></textarea>')
                .appendTo(manualContainer);

            manualContainer.append(
                $('<input class="btn" type="button" value="' + self._('Set') + '" />')
                    .click(function ()
                    {
                        self.parser.setConfig(neu.val());
                        self.gui_hide();
                        self.parser.readAll();
                    })
                );


            // ----------- Github API -------------

            accordion.append("<h3>" + this._("Github Gist") + "</h3>");

            var githubContainer = $("<div></div>").appendTo(accordion);


            var gistInfo: GistData[] = null;
            var gistSelect = $('<select style="margin-top:5px; margin-bottom:10px"></select>').prop("disabled", true);
            var selectedGist: GistData = null;

            var authButton = $('<button class="btn btn-primary">Start</button>')
                .click(() =>
                {
                    this.parser.githubAPi.Auth(() =>
                    {
                        authButton.text("Success!");
                        authButton.prop("disabled", true);

                        this.parser.githubAPi.GetGists((data) =>
                        {
                            gistInfo = data;

                            $.each(gistInfo, (i, el: GistData) =>
                            {
                                var option = $("<option></option>")
                                    .attr("value", el.id)
                                    .text(el.description + " @" + el.owner);

                                gistSelect.append(option);
                            });

                            gistChangeCallback();
                            gistSelect.prop("disabled", false);
                            createGistButton.prop("disabled", false);
                            updateOrImportFromGistButton.prop("disabled", false);

                        });
                    });
                });

            var infoDescription = $("<td></td>");
            var infoFiles = $("<td></td>");
            var infoId = $("<td></td>");
            var infoOwner = $("<td></td>");
            var infoPublic = $("<td></td>");
            var infoUrl = $("<td></td>");
            var infoValid = $("<td></td>");

            var importButton = $('<button class="btn btn-success">' + this._("Import") + '</button>').prop("disabled", true);
            var updateButton = $('<button class="btn btn-warn">' + this._("Update") + '</button>').prop("disabled", true);
            var createButton = $('<button class="btn btn-success">' + this._("Create") + '</button>').prop("disabled", true);

            var gistDataContainer = $("<div></div>")
                .append(
                $('<table width="100%" cellpadding="5"></table>').append(
                    $('<tbody style="font-size:small"></tbody>')
                        .append($("<tr></tr>")
                            .append("<th>" + this._('ID') + "</th>")
                            .append(infoId)
                        ).append($("<tr></tr>")
                            .append("<th>" + this._('Description') + "</th>")
                            .append(infoDescription)
                        ).append($("<tr></tr>")
                            .append("<th>" + this._('Owner') + "</th>")
                            .append(infoOwner)
                        ).append($("<tr></tr>")
                            .append("<th>" + this._('Public') + "</th>")
                            .append(infoPublic)
                        ).append($("<tr></tr>")
                            .append("<th>" + this._('Files') + "</th>")
                            .append(infoFiles)
                        ).append($("<tr></tr>")
                            .append("<th>" + this._('Url') + "</th>")
                            .append(infoUrl)
                        ).append($("<tr></tr>")
                            .append("<th>" + this._('Valid') + "</th>")
                            .append(infoValid)
                        )
                    )
                );

            var gistChangeCallback = () =>
            {
                var currentID = gistSelect.val();

                var info: GistData = null;

                $.each(gistInfo, (i, el: GistData) =>
                {
                    if (el.id.toString() === currentID)
                    {
                        info = el;
                        return;
                    }
                });

                if (info === null)
                {
                    console.log("Github GUI - Invalid Data!");
                    return false;
                }

                selectedGist = info;

                infoDescription.text(info.description);
                infoFiles.text(info.files.join(", "));
                infoId.text(info.id);
                infoOwner.text(info.owner);
                infoPublic.text(info.public ? this._("Yes") : this._("No"));
                infoUrl.html('<a href="https://gist.github.com/' + info.owner + '/' + info.id + '">' + info.url + '</a>');
                infoValid.text(info.valid ? this._("Yes") : this._("No") + " - " + this._("No file called 'config.json' found!"))
                    .css("font-weight", info.valid ? "" : "bold");

                importButton.prop("disabled", !info.valid);
                updateButton.prop("disabled", !info.valid);
            };

            gistSelect.change((e) =>
            {
                e.preventDefault();

                gistChangeCallback();
            });






            // ----------- Create New Gist --------------


            var newGistContainer: JQuery[] = [];

            var descriptionInput = $('<input id="githubGistDescription" type="text" value="Fanfiction Story Parser Config"/>');
            var isPublicInput = $('<input id="githubGistPublic" type="checkbox">');

            newGistContainer.push(
                $("<tr></tr>")
                    .append("<th>3. Insert Information</th>")
                    .append(($("<td></td>").append(
                        '<label for="githubGistDescription">' + this._('Description') + ': </label>'
                        ).append(descriptionInput)
                        .append(
                        '<label for="githubGistDescription">' + this._('Public') + ': </label>'
                        ).append(isPublicInput)
                    ))
                );

            newGistContainer.push(
                $("<tr></tr>")
                    .append("<th>4. Send</th>")
                    .append(($("<td></td>").append(
                        $('<button class="btn btn-primary">' + this._('Create Gist') + '</button>').
                            click((e) =>
                            {
                                e.preventDefault();

                                if (confirm("Do you want to save your Config to Github?"))
                                {
                                    this.parser.githubAPi.CreateNewConfigGist(descriptionInput.val(), isPublicInput.is(":checked"), (data: GistData) =>
                                    {
                                        if (confirm("Config Uploaded. Do you want to look at it on Github?"))
                                        {
                                            window.open("https://gist.github.com/" + data.owner + "/" + data.id);
                                        }
                                    });
                                }

                            })

                        )
                    ))
                );




            // ------------  Import / Update ------------



            var importUpdateContainer: JQuery[] = [];

            importUpdateContainer.push(
                $("<tr></tr>")
                    .append("<th>3. Select Gist</th>")
                    .append(($("<td></td>").append(gistSelect))
                    )
                );

            importUpdateContainer.push(
                $("<tr></tr>")
                    .append("<th></th>")
                    .append($("<td></td>").append(gistDataContainer))
                );

            importUpdateContainer.push(
                $("<tr></tr>")
                    .append("<th>4. Select Option</th>")
                    .append(
                    $("<td></td>")
                        .append(importButton)
                        .append(updateButton)
                    )
                );


            importButton.click((e) =>
            {
                e.preventDefault();

                if (selectedGist !== undefined && selectedGist !== null)
                {
                    if (confirm("Do you realy want to overwrite your local config with the one from Github? Everything will be lost!"))
                    {
                        this.parser.githubAPi.GetConfig(selectedGist.id, (externalConfig: string) =>
                        {
                            var newConfig = JSON.parse(externalConfig);

                            this.log("New Config: ", newConfig);

                            this.parser.config = newConfig;
                            this.parser.save_config(true);

                            alert("Config loaded!");
                        });
                    }
                }
                else
                {
                    alert("Select a Gist from the List first!");
                }

            });


            updateButton.click((e) =>
            {
                e.preventDefault();

                if (selectedGist !== undefined && selectedGist !== null)
                {
                    if (confirm("Do you want to save your Config to Github?"))
                    {
                        this.parser.githubAPi.UpdateConfigGist(selectedGist.id, (data: GistData) =>
                        {
                            if (confirm("Config Uploaded. Do you want to look at it on Github?"))
                            {
                                window.open("https://gist.github.com/" + data.owner + "/" + data.id);
                            }
                        });
                    }
                }
                else
                {
                    alert("Select a Gist from the List first!");
                }

            });


            //--------------------------------------------------

            var createGistButton = $('<button class="btn">' + this._('Create new Gist') + '</button>').click((e) =>
            {
                e.preventDefault();

                $.each(newGistContainer, (i, el: JQuery) =>
                {
                    el.show();
                });

                $.each(importUpdateContainer, (i, el: JQuery) =>
                {
                    el.hide();
                });
            }).prop("disabled", true);

            var updateOrImportFromGistButton = $('<button class="btn">' + this._('Update or Import from Gist') + '</button>').click((e) =>
            {
                e.preventDefault();

                $.each(newGistContainer, (i, el: JQuery) =>
                {
                    el.hide();
                });

                $.each(importUpdateContainer, (i, el: JQuery) =>
                {
                    el.show();
                });
            }).prop("disabled", true);

            var tbody = $("<tbody></tbody>")
                .append(
                $("<tr></tr>")
                    .append("<th>1. Authenticate</th>")
                    .append($("<td></td>").append(authButton))
                ).append(
                $("<tr></tr>")
                    .append("<th>2. Choose Option</th>")
                    .append($("<td></td>")
                        .append(
                        createGistButton
                        ).append(
                        updateOrImportFromGistButton
                        )
                    )
                );

            $.each(newGistContainer, (i, el: JQuery) =>
            {
                el.hide();

                tbody.append(el);
            });

            $.each(importUpdateContainer, (i, el: JQuery) =>
            {
                el.hide();

                tbody.append(el);
            });


            $('<table width="100%" cellpadding="5" cellspacing="5"></table>').appendTo(githubContainer)
                .append(
                tbody
                );








            // --- Call the Accordion Script ---
            accordion.accordion({
                heightStyle: "content"
            });

            this.gui_show();
        }

    }

    /**
     *   Open or closes the GUI for the Story Config
     *   @param storyInfo Infos about the story
     *   @param managePresets Should the option to edit Presets be displayed
     */
    public toggleStoryConfig(storyInfo: StoryInfo, managePresets: boolean = false)
    {
        var self = this;

        if (this.guiContainer == null)
        {
            if (this.DEBUG)
            {
                console.log("Generate GUI Container");
            }

            this.gui_create();
        }

        if (this.guiContainer.is(':visible'))
        {
            if (this.DEBUG)
            {
                console.log("Hide GUI Container");
            }

            this.gui_hide();

        } else
        {
            if (typeof (storyInfo) === "undefined")
            {
                if (this.DEBUG)
                {
                    console.warn("toggleStoryConfig: No Parameter given!");
                }

                return;
            }

            if (this.DEBUG)
            {
                console.log("Starting Content Generation");
            }

            this.guiContainer.html('');


            var saveButton = $('<button class="saveButton btn btn-warning">' + self._('Save') + '</button>');

            // Manage Presets:

            var presetElementContainer = $("<div></div>");
            var presetContainer = $('<div></div>').append(presetElementContainer);


            var customElementContainer = $('<div></div>');
            var customContainer = $('<div></div>').append(customElementContainer);

            if (!managePresets)
            {
                presetContainer.hide();
            }
            else
            {
                customContainer.hide();
            }

            $('<div class="ffnet-HighlighterHeadline">' + self._('Manage Presets') + '</div>')
                .click((e) =>
                {
                    e.preventDefault();

                    if (presetContainer.is(":visible"))
                    {
                        presetContainer.slideUp();
                        customContainer.slideDown();
                    }
                    else
                    {
                        presetContainer.slideDown();
                        customContainer.slideUp();
                    }
                })
                .appendTo(this.guiContainer);

            $.each(this.config.highlighterPrefabs, (name, el) =>
            {
                this.gui_add_highlighterForm(name, el, presetElementContainer, false, false);

            });

            presetContainer.append(
                $('<div style="margin-top: 10px; text-align:center"></div>')
                    .append($('<button class="btn btn-primary">' + self._('Add new Preset') + '</button>').
                        click((e) =>
                        {
                            e.preventDefault();

                            var name = "NewHighlighter-" + (this.addCount++);

                            this.gui_add_highlighterForm(name,
                                {
                                    background: null,
                                    color: null,
                                    display: true,
                                    highlight_color: null,
                                    ignoreColor: true,
                                    image: null,
                                    mark_chapter: false,
                                    mouseOver: null,
                                    priority: 1,
                                    customPriority: null,
                                    name: name,
                                    note: null,
                                    text_color: null

                                },
                                presetElementContainer, false, true);


                        })
                    ).append(saveButton.clone())
                );

            this.guiContainer.append(presetContainer);

            $('<div class="ffnet-HighlighterHeadline">' + self._('Custom Config') + '</div>')
                .click((e) =>
                {
                    e.preventDefault();

                    if (!customContainer.is(":visible"))
                    {
                        presetContainer.slideUp();
                        customContainer.slideDown();
                    }
                    else
                    {
                        presetContainer.slideDown();
                        customContainer.slideUp();
                    }
                })
                .appendTo(this.guiContainer);

            this.guiContainer.append(customContainer);



            customContainer.append(
                $('<div style="margin-top: 10px; text-align:center"></div>').append(
                    saveButton.clone())
                );

            var usedData: ModificationBase;
            if (this.config.highlighter[storyInfo.url] === undefined || this.config.highlighter[storyInfo.url].custom === null)
            {
                usedData = {
                    background: null,
                    color: null,
                    display: true,
                    highlight_color: null,
                    ignoreColor: true,
                    image: null,
                    mark_chapter: false,
                    priority: 1,
                    customPriority: null,
                    mouseOver: null,
                    name: storyInfo.url,
                    note: null,
                    text_color: null
                };

            }
            else
            {
                usedData = this.config.highlighter[storyInfo.url].custom;
            }


            this.gui_add_highlighterForm(storyInfo.url, usedData, customElementContainer, true, true);

            if (managePresets)
            {
                customContainer.append("<p><strong>" + self._("In order to active the Custom Options, you have to click on the Button 'Custom' in the Drop-down List") + "</strong></p>");
            }

            $(".saveButton").click((e) =>
            {
                e.preventDefault();

                this.saveAll();
                this.parser.save_config();

                this.guiContainer.css("position", "absolute");
                this.gui_hide();
                this.parser.readAll();
                this.parser.enableInStoryHighlighter();

            });

            /*
            this.guiContainer.append("<p>This Menu allows you to set story specific options for:</p>");
            this.guiContainer.append(storyInfo.name);
            this.guiContainer.append("<hr />");
            this.guiContainer.append("<p>Highlighter Options:</p>");

            this.guiContainer.append($('<label for="ffnet-story-highlighter-hide">Hide Story</label>').css("display", "inline-block"));
            var hide = $('<input type="checkbox" id="ffnet-story-highlighter-hide">')
                .css("display", "inline-block").css("margin-left", "15px")
                .appendTo(this.guiContainer);

            if ((this.config['highlighter'][storyInfo.url] !== undefined) && (this.config['highlighter'][storyInfo.url].hide))
            {
                hide.attr('checked', 'checked');
            }

            this.guiContainer.append("<hr />");

            this.guiContainer.append('<label for="ffnet-story-highlighter">Highlighter Path: (leave empty to clear)</label><br/>');
            var highlighter = $('<input id="ffnet-story-highlighter" type="text"></input>')
                .appendTo(this.guiContainer)
                .css("width", "500px");

            this.guiContainer.append("<p></p>");

            var imageContainer = $("<div></div>")
                .css("border", "1px solid black")
                .css("padding", "2px")
                .appendTo(this.guiContainer);

            var image = $("<img></img>")
                .css("width", "30px")
                .css("height", "30px")
                .css("margin-left", "5px")
                .css("border", "1px solid black")
                .css("display", "inline-block");

            image.clone()
                .attr("src", self.parser.getUrl("none.gif"))
                .appendTo(imageContainer)
                .click(function ()
                {
                    highlighter.val("");
                });

            for (var i = 1; i <= 6; i++)
            {
                image.clone()
                    .attr("src", self.parser.getUrl(i + ".gif"))
                    .appendTo(imageContainer)
                    .click(function ()
                    {
                        highlighter.val($(this).attr("src"));
                    });
            }


            if (this.config['highlighter'][storyInfo.url] !== undefined)
            {
                highlighter.val(this.config['highlighter'][storyInfo.url].image);
            }

            this.guiContainer.append("<p></p>");



            this.guiContainer.append(
                $('<input class="btn" type="button" value="Set" />')
                    .click(function ()
                    {
                        var newVal = highlighter.val();
                        var hidden = hide.is(":checked");

                        if ((newVal === "") && (!hidden))
                        {
                            self.config['highlighter'][storyInfo.url] = undefined;
                        }
                        else
                        {
                            self.config['highlighter'][storyInfo.url] = {
                                image: newVal,
                                hide: hidden
                            };
                        }

                        self.parser.save_config();

                        self.guiContainer.css("position", "absolute");
                        self.gui_hide();
                        self.parser.readAll();
                        self.parser.enableInStoryHighlighter();
                    })
                );

    */

            this.log("Display Content");


            this.gui_show();
        }

    }

    /**
     *   Shows the Highlighter Prefab Config
     *   @param storyInfo Infos about the story
     */

    public showStoryPrefabList(storyInfo: StoryInfo)
    {
        var self = this;

        var lastID = Number($(".ffnet-HighlighterContainer").attr("data-elementident"));
        var currentID = Number(storyInfo.element.attr("data-elementident"));

        $(".ffnet-HighlighterContainer").remove();

        if (lastID === currentID)
        {
            return;
        }


        var container = $('<div class="ffnet-HighlighterContainer"></div>').appendTo($("body"));
        container.position({ of: storyInfo.element.find(".context-menu"), my: "right top", at: "right bottom", collision: "flip flip" })
            .attr("data-elementident", currentID);


        var listContainer = $('<div class="ffNet-HighlighterListContainer"></div>').appendTo(container);


        // Add Element:

        var selectElement = (name: string) =>
        {
            $(".ffnet-HighlighterContainer").remove();

            if (this.config.highlighter[storyInfo.url] === undefined)
            {
                this.config.highlighter[storyInfo.url] =
                {
                    custom: null,
                    hide: null,
                    image: null,
                    prefab: null
                };
            }

            this.config.highlighter[storyInfo.url].prefab = name;

            this.parser.save_config();
            this.parser.read(storyInfo.element.parent());
            this.parser.enableInStoryHighlighter();

        };

        $.each(this.config.highlighterPrefabs, (name: string, data: ModificationBase) =>
        {
            var element = $('<div class="ffnet-HighlighterListElement"></div>')
                .append(
                $('<div class="color"></div>')
                    .css("background-color", data.highlight_color)
                )
                .append(
                $('<div class="name" ></div >')
                    .text(name)
                )
                .click((e) =>
                {
                    e.preventDefault();
                    selectElement(name);
                })
                .appendTo(listContainer);

            if (this.config.highlighter[storyInfo.url] !== undefined && this.config.highlighter[storyInfo.url].prefab === name)
            {
                element.addClass("selected");
            }


        });

        var color = "gray";

        if (this.config.highlighter[storyInfo.url] !== undefined &&
            this.config.highlighter[storyInfo.url].custom !== undefined &&
            this.config.highlighter[storyInfo.url].custom !== null)
        {
            color = this.config.highlighter[storyInfo.url].custom.highlight_color;
        }

        var customElement = $('<div class="ffnet-HighlighterListElement"></div>').append(
            $('<div class="color">')
                .css("background-color", color)
            )
            .append($('</div><div class="name">Custom</div>')
            ).click(function (ev)
            {
                ev.preventDefault();
                $(".ffnet-HighlighterContainer").remove();

                if (self.config.highlighter[storyInfo.url] !== undefined)
                {
                    self.config.highlighter[storyInfo.url].prefab = "";
                }

                self.toggleStoryConfig(storyInfo, false);
            }).appendTo(listContainer);

        if (this.config.highlighter[storyInfo.url] !== undefined &&
            (this.config.highlighter[storyInfo.url].prefab === undefined || this.config.highlighter[storyInfo.url].prefab === null ||
            this.config.highlighter[storyInfo.url].prefab === "" || this.config.highlighter[storyInfo.url].prefab === " ") &&
            this.config.highlighter[storyInfo.url].custom !== undefined && this.config.highlighter[storyInfo.url].custom !== null)
        {
            customElement.addClass("selected");
        }


        $('<div class="ffnet-HighlighterListElement"></div>').append(
            $('<div class="color">X</div>')
                .css("background-color", "red")
                .css("text-align", "center")
            )
            .append($('<div class="name" style="top:0px">Reset</div>')
            ).click(function (ev)
            {
                ev.preventDefault();
                $(".ffnet-HighlighterContainer").remove();

                if (self.config.highlighter[storyInfo.url] !== undefined)
                {
                    if (confirm(self._("Do you really want to remove this Highlighter?")))
                    {
                        delete self.config.highlighter[storyInfo.url];

                        self.parser.save_config();
                        self.parser.read(storyInfo.element.parent());
                        self.parser.enableInStoryHighlighter();
                    }
                }
                else
                {
                    alert(self._("There is nothing to reset. To close the box, just click on the Edit Icon again"));
                }

            }).appendTo(listContainer);



        listContainer.append("<hr />")
            .append($('<div class="ffnet-HighlighterListElement" style="padding-top: 5px; text-align:center">' + self._('Customize Settings') + '</div>')
                .click(function (ev)
                {
                    ev.preventDefault();
                    $(".ffnet-HighlighterContainer").remove();

                    self.toggleStoryConfig(storyInfo, true);
                })
            );


    }



    /**
     *   Add a form for Highlighter input
     *   @param name Name of the Input field
     *   @param config Highlighter Config
     *   @param mainContainer Container for addition
     *   @param Custom Add Element for the Custom Element
     *   @param displayBig Don't minimize Element after adding
     */
    private gui_add_highlighterForm(name: string, config: ModificationBase, mainContainer: JQuery, custom: boolean, displayBig: boolean = false)
    {
        var self = this;

        this.log("Highlighter Add Form: ", name);

        var radius = 10;

        var height = '35';

        if (displayBig)
        {
            height = 'auto'; //580;
        }

        var replace = new RegExp("[ /.\-]", "g");
        var UID = name.replace(replace, "");

        var container = $('<div class="fflist-filterField"></div>')
            .css('height', height + 'px')


            .appendTo(mainContainer)
            .hide();

        if (!displayBig)
        {
            container.css("cursor", "pointer")
                .attr('title', self._("Click to Edit"))

                .click(function ()
                {
                    container.css('height', 'auto');
                    container.css("cursor", "auto");
                    container.removeAttr("title")
                        .unbind();

                });

        }


        var table = $('<table width="100%" cellpadding="5"></table>').appendTo(container);

        this.registerGUI(name, () =>
        {
            if (!custom)
            {
                if (this.config.highlighterPrefabs[name] === undefined)
                {
                    return {};
                }
                else
                {

                    return this.config.highlighterPrefabs[name];
                }
            }
            else
            {
                if (this.config.highlighter[name].custom === undefined)
                {
                    return {};
                }
                else
                {
                    return this.config.highlighter[name].custom;
                }
            }

        },
            [
                {
                    name: 'name',
                    type: GUIElementType.Input,
                    label: self._("Name"),
                    value: function ()
                    {
                        return name;
                    },
                    attributes:
                    {
                        size: 50
                    },
                    customOptions: (el) =>
                    {
                        if (custom)
                        {
                            el.prop("disabled", true)
                                .attr("title", self._("This field can't be changed"));
                        }
                    }
                },
                {
                    name: 'display',
                    type: GUIElementType.Checkbox,
                    label: self._('Display Found Entries'),
                    value: function ()
                    {
                        return config.display;
                    }
                },
                {
                    name: 'priority',
                    type: GUIElementType.Custom,
                    label: self._("Priority"),
                    customElement: function (data: GUIElement): JQuery
                    {

                        var container = $('<div class="form-horizontal"></div>');

                        var elementContainer: JQuery;
                        var label: JQuery;
                        var element: JQuery;


                        for (var i = 1; i <= 5; i++)
                        {
                            label = $('<label class="radio-inline lineHeight"></label>').appendTo(container);

                            element = $('<input type="radio"></input>')
                                .attr("name", "ffnet-" + UID + "-priority")
                                .attr("id", "ffnet-" + UID + "-priority-" + i)
                                .attr("value", i)
                                .appendTo(label);

                            label.append(i);

                            if (data.value() === i)
                            {
                                element.prop("checked", true);
                            }

                        }

                        // Custom:

                        label = $('<label class="radio-inline lineHeight"></label>').appendTo(container);

                        element = $('<input type="radio"></input>')
                            .attr("name", "ffnet-" + UID + "-priority")
                            .attr("id", "ffnet-" + UID + "-priority-Custom")
                            .attr("value", -1)
                            .appendTo(label);

                        label.append(self._("Custom"));

                        if (data.value() === -1)
                        {
                            element.prop("checked", true);
                        }

                        container.find("input").change(function (e)
                        {
                            var currentSelected = $(this).parent().find("input").filter(":checked");
                            if (currentSelected.length === 0)
                            {
                                console.warn("There should be something selected ... :/");
                            }
                            else
                            {
                                if (Number(currentSelected.val()) === -1)
                                {
                                    $("#ffnet-" + UID + "-customPriorityCotainer").slideDown();
                                }
                                else
                                {
                                    $("#ffnet-" + UID + "-customPriorityCotainer").slideUp();
                                }
                            }

                        });


                        return container;

                    },
                    result: function (el)
                    {
                        // Not used!

                        return null;
                    },
                    value: function ()
                    {
                        return config.priority;
                    }


                },
                {
                    name: "customPriority",
                    type: GUIElementType.Custom,
                    label: self._("Custom Priority"),
                    customElement: function (data: GUIElement): JQuery
                    {

                        var defaultValues: ModififcationPriority = {
                            background: 1,
                            color: 1,
                            highlight_color: 1,
                            mouseOver: 1,
                            text_color: 1
                        };

                        var value: ModififcationPriority = data.value();
                        if ((value === undefined) || (value === null))
                        {
                            value = defaultValues;
                        }
                        else
                        {
                            $.each(value, function (name, element)
                            {
                                if ((element === undefined) || (element === null))
                                {
                                    value[name] = defaultValues[name];
                                }
                            });
                        }


                        var mainContainer = $('<div></div>')
                            .attr("id", "ffnet-" + UID + "-customPriorityCotainer");

                        if (config.priority !== -1)
                        {
                            mainContainer.hide();
                        }

                        var options = {
                            color: self._("Color"),
                            mouseOver: self._("Mouse Over Color"),
                            text_color: self._("Info Text Color"),
                            highlight_color: self._("Highlight Color"),
                            background: self._("Background Image")
                        };


                        $.each(options, function (name, description)
                        {
                            $('<div class="lineHeight" style="margin-top:5px"></div>')
                                .text(description + ": ")
                                .appendTo(mainContainer);

                            var container = $('<div class="form-horizontal"></div>').appendTo(mainContainer);

                            var elementContainer: JQuery;
                            var label: JQuery;
                            var element: JQuery;



                            for (var i = 0; i <= 5; i++)
                            {
                                label = $('<label class="radio-inline lineHeight"></label>').appendTo(container);

                                element = $('<input type="radio"></input>')
                                    .attr("name", "ffnet-" + UID + "-customPrioritry-" + name)
                                    .attr("id", "ffnet-" + UID + "-customPrioritry-" + name + i)
                                    .attr("data-priorityName", name)
                                    .attr("value", i)
                                    .appendTo(label);

                                label.append((i !== 0) ? i : self._("Disable"));

                                if (value[name] === i)
                                {
                                    element.prop("checked", true);
                                }

                            }
                        });

                        return mainContainer;
                    },
                    result: function (el)
                    {
                        // Not used!
                    },
                    value: function ()
                    {
                        return config.customPriority;
                    }

                },
                {
                    name: 'ignoreColor',
                    type: GUIElementType.Checkbox,
                    label: self._('Ignore Color Settings'),
                    value: function ()
                    {
                        return config.ignoreColor;
                    },
                    customOptions: function (checkbox)
                    {
                        var check = function ()
                        {
                            if (checkbox.is(":checked"))
                            {
                                $('#fflist-' + UID + '-color')
                                    .add('#fflist-' + UID + '-mouseOver')
                                    .add('#fflist-' + UID + '-text_color')
                                    .attr("disabled", "disabled");
                            }
                            else
                            {
                                $('#fflist-' + UID + '-color')
                                    .add('#fflist-' + UID + '-mouseOver')
                                    .add('#fflist-' + UID + '-text_color')
                                    .removeAttr("disabled");
                            }
                        };

                        checkbox.change(function ()
                        {
                            check();
                        });

                        window.setTimeout(check, 10);
                    }
                },
                {
                    name: 'color',
                    type: GUIElementType.Color,
                    value: function ()
                    {
                        return config.color;
                    },
                    label: self._('Color'),
                    attributes:
                    {
                        id: 'fflist-' + UID + '-color',
                        placeholder: self._("Click to change Color")
                    }
                },
                {
                    name: 'mouseOver',
                    type: GUIElementType.Color,
                    value: function ()
                    {
                        return config.mouseOver;
                    },
                    label: self._('Mouse Over Color'),
                    attributes:
                    {
                        id: 'fflist-' + UID + '-mouseOver',
                        placeholder: self._("Click to change Color")
                    }
                },
                {
                    name: 'text_color',
                    type: GUIElementType.Color,
                    value: function ()
                    {
                        return config.text_color;
                    },
                    label: self._('Info Text Color'),
                    attributes:
                    {
                        id: 'fflist-' + UID + '-text_color',
                        placeholder: self._("Click to change Color")
                    }
                },
                {
                    name: 'highlight_color',
                    type: GUIElementType.Color,
                    value: function ()
                    {
                        return config.highlight_color;
                    },
                    label: self._('Highlight Color'),
                    attributes:
                    {
                        id: 'fflist-' + UID + '-highlight_color',
                        placeholder: self._("Click to change Color")
                    }
                },
                {
                    name: 'background',
                    type: GUIElementType.Input,
                    value: function ()
                    {
                        return config.background;
                    },
                    label: self._('Background Image')
                },
                {
                    name: 'mark_chapter',
                    type: GUIElementType.Checkbox,
                    value: function ()
                    {
                        return config.mark_chapter;
                    },
                    label: self._('Mark Chapter')
                },
                {
                    name: 'image',
                    type: GUIElementType.Input,
                    value: function ()
                    {
                        return config.image;
                    },
                    label: self._('Info Image'),
                    customOptions: (el) =>
                    {
                        var container = $("<div></div>");
                        el.after(container);

                        var image = $("<img></img>")
                            .css("width", "30px")
                            .css("height", "30px")
                            .css("margin-left", "5px")
                            .css("border", "1px solid black")
                            .css("display", "inline-block")
                            .addClass("clickable");

                        image.clone()
                            .attr("src", self.parser.getUrl("none.gif"))
                            .appendTo(container)
                            .click(function ()
                            {
                                el.val("");
                            });

                        for (var i = 1; i <= 6; i++)
                        {
                            image.clone()
                                .attr("src", self.parser.getUrl(i + ".gif"))
                                .appendTo(container)
                                .click(function ()
                                {
                                    el.val($(this).attr("src"));
                                });
                        }

                    }
                },
                {
                    name: 'note',
                    type: GUIElementType.Input,
                    value: function ()
                    {
                        return config.note;
                    },
                    label: self._('Note'),
                    debugOnly: true
                },
                {
                    name: '',
                    type: GUIElementType.Button,
                    value: function ()
                    {
                        return self._('Remove');
                    },
                    label: '',
                    callback: function ()
                    {
                        self.guiData[name].instances['name'].val('');

                        container.fadeOut(function ()
                        {
                            container.remove();
                        });

                    },
                    customOptions: (el) =>
                    {
                        if (custom)
                        {
                            el.remove();
                        }

                    }
                },
                {
                    name: '',
                    type: GUIElementType.Custom,
                    value: function ()
                    {
                        return '';
                    },
                    result: function ()
                    {
                        return null;
                    },
                    label: '',
                    customElement: function ()
                    {
                        var elementContainer = $("<div></div>");
                        $('<div style="display:inline-block; width: 50%"></div>').appendTo(elementContainer).append(

                            $('<img src="' + self.parser.getUrl('glyphicons_369_collapse_top.png') + '" alt="' + self._('Minimize') + '"></img>').click(function ()
                            {

                                container
                                    .unbind()
                                    .css("cursor", "pointer")
                                    .css("height", "35px")
                                    .attr('title', self._("Click to Edit"));

                                setTimeout(function ()
                                {
                                    container.click(function ()
                                    {
                                        container.css('height', 'auto');
                                        container.css("cursor", "auto");
                                        container.removeAttr("title");

                                    });

                                }, 100);
                            }).css("cursor", "pointer")
                            );

                        $('<div style="display:inline-block; width: 40%"></div>').appendTo(elementContainer).append(
                            $('<button class="btn btn-default">' + self._('Export') + '</button>')
                            //.button()
                                .click(function (event)
                                {
                                    event.preventDefault();

                                    // Create Dialog:
                                    var dialog = $('<div></div>').attr("title", self._("Export Data for Element: ") + config.name)
                                        .append(
                                        $("<pre></pre>").text(JSON.stringify(config))
                                        ).appendTo($("body"));

                                    dialog.dialog({
                                        close: function (event, ui) 
                                        {
                                            dialog.remove();
                                        }
                                    });
                                })
                            );

                        return elementContainer;
                    }
                }
            ], false, (data) =>
            {

                if (!custom && typeof (this.config.highlighterPrefabs[data.name]) !== "undefined")
                {
                    delete this.config.highlighterPrefabs[data.name];
                }

                var name = data.instances['name'].val();
                if (name === "")
                {
                    return;
                }

                // Priority:
                var priority: number = 1;
                var selectedPriority = data.instances['priority'].find(":checked");

                priority = Number(selectedPriority.val());

                // CustomPriority

                var customPriority: ModififcationPriority =
                    {
                        color: null,
                        background: null,
                        highlight_color: null,
                        mouseOver: null,
                        text_color: null

                    };

                var el = data.instances['customPriority'];

                $.each(customPriority, function (name, _)
                {
                    var elements = el.find('[data-priorityName="' + name + '"]');
                    if (elements.length === 0)
                    {
                        console.warn("Can't find Elements for Priority:", name, el);
                    }
                    else
                    {
                        customPriority[name] = Number(elements.filter(":checked").val());
                    }

                    if (customPriority[name] === null || customPriority[name] === undefined || customPriority[name] === NaN || customPriority[name] < 0)
                    {
                        customPriority[name] = 1;
                    }


                });

                // ...

                var config: ModificationBase =
                    {
                        name: name,
                        color: data.instances['color'].val(),
                        mark_chapter: data.instances['mark_chapter'].is(':checked'),
                        display: data.instances['display'].is(':checked'),
                        mouseOver: data.instances['mouseOver'].val(),
                        ignoreColor: data.instances['ignoreColor'].is(':checked'),
                        background: data.instances['background'].val(),
                        text_color: data.instances['text_color'].val(),
                        image: data.instances['image'].val(),
                        note: (data.instances['note'] !== undefined) ? data.instances['note'].val() : null,
                        priority: priority,
                        customPriority: customPriority,
                        highlight_color: data.instances['highlight_color'].val()
                    };

                if (config.text_color === "")
                {
                    config.text_color = "#686868";
                }

                if (this.DEBUG)
                {
                    console.log("Filter '" + name + "' saved: ", config);
                }

                if (!custom)
                {

                    this.config.highlighterPrefabs[name] = config;
                }
                else
                {
                    if (this.config.highlighter[name] === undefined)
                    {
                        this.config.highlighter[name] = {
                            custom: null,
                            hide: null,
                            image: null,
                            prefab: null
                        };
                    }

                    this.config.highlighter[name].custom = config;
                }

            });

        this.renderGUIElement(name, table);


        container.fadeIn();

        this.log("Form added");
    }


    /**
     *   Open or closes the GUI for the Live Chat
     */
    public toggleLiveChat()
    {

        var self = this;

        if (this.guiContainer == null)
        {
            if (this.DEBUG)
            {
                console.log("Generate GUI Container");
            }

            this.gui_create();
        }

        if (this.guiContainer.is(':visible'))
        {
            if (this.DEBUG)
            {
                console.log("Hide GUI Container");
            }

            this.gui_hide();

        } else
        {
            if (!this.parser.chat.Available)
            {
                alert(self._("This Feature is not enabled in your Browser. Needed: WebSocket"));
                return;
            }


            if (this.DEBUG)
            {
                console.log("Starting Content Generation");
            }

            this.guiContainer.html('');

            var userList = $('<span>' + self._('Online') + ': (?)</span>')
                .addClass('ChatUserInfo');

            this.guiContainer.append($('<h2 style="text-align:center: magin-bottom: 10px">' + self._('Live Chat Feature:') + '</h2>').append(userList));


            var chatContainer = $("<div></div>").appendTo(this.guiContainer).hide();

            var connectBox = $("<div></div>").appendTo(this.guiContainer);
            connectBox.append("<p>" + self._("This Feature allows you to connect to the Live-Chat.") + "<p>")
                .append("<p>" + self._("If you need help or just want to talk, you are welcome!") + "</p>")
                .append("<p>" + self._("I can't be online all the time. I am living in Europe, so please have this in mind") + "</p>")
                .append("<hr /><p>" + self._("The Connection is made using an Encrypted Connection to my Server.") + "</p>")
                .append('<p><abbr title="irc.esper.net#FanfictionStoryParser">' + self._('Every Message is sent to my IRC-Channel') + '</abbr></p>')
                .append(
                $('<div style="text-align:center"></div>').append(
                    $('<button class="btn btn-primary">' + self._('Connect') + '</button>')
                        .click(function (e)
                        {
                            e.preventDefault();
                            connectBox.fadeOut(0.5, function ()
                            {
                                self.parser.chat.connect();

                                chatContainer.fadeIn(0.5);
                            });

                        })
                    )
                );


            var addMessageElement = function (sender, message, time)
            {
                var newMeessage = $('<div class="ChatMessage"></div>')
                    .append($('<div class="Sender"></div>').text(sender))
                    .append($('<div class="Message"></div>').text(message))
                    .append($('<div class="Time"></div>').text(time));

                container.append(newMeessage);

                container[0].scrollTop = container[0].scrollHeight;

            };


            var container = $('<div class="ChatMessageContainer"></div>').appendTo(chatContainer);
            var input = $('<input type="text" />');

            var send = function ()
            {
                var text = input.val();
                input.val("");

                addMessageElement(self.config.token, text, (new Date()).toLocaleTimeString());
                self.parser.chat.sendChatMessage(text);

            };

            chatContainer.append(container);
            chatContainer.append(
                $('<div class="ChatInputContainer"></div>')
                    .append(input)
                    .append(
                    $('<button class="btn btn-primary">' + self._('Send') + '</button>').click(function (e)
                    {
                        send();
                    })
                    )
                )
                .append('<hr/><p style="text-align:center">' + self._('Advanced Features:') + '</p>')
                .append(
                $('<button class="btn btn-warning">' + self._('Send Config-Data') + '</button>')
                    .click(function (e)
                    {
                        e.preventDefault();

                        if (confirm(self._("This Option allows you to send your Config-Data to the Server. This helps me to help you :3  Do you REALY want to send this?")))
                        {
                            self.parser.chat.sendConfigData();
                        }
                    })
                );

            input.keydown(function (e)
            {
                if (e.keyCode === 13)
                {
                    send();
                }
            });

            this.parser.chat.onError = function (message)
            {
                addMessageElement("System", message, (new Date().toLocaleTimeString()));

            };



            //addMessageElement("System", "Connected to Server", (new Date()).toLocaleTimeString());

            this.parser.chat.setMessageCallback(function (data: WebSocketMessage)
            {
                if (data.Type === "Chat")
                {
                    addMessageElement(data.Sender, data.Data, (new Date(Number(data.Time)).toLocaleTimeString()));
                }

            });


            //addMessageElement("Test", "Das ist ein Test einer längeren Nachticht ... 123 BLUB", "NOW");


            this.log("Display Content");


            this.gui_show(function ()
            {

                self.parser.chat.disconnect();

            });
        }


    }


    /**
     *   Open or closes the GUI for the Synchronize Feature
     */
    private syncGUI()
    {
        var self = this;


        var progressBar = $('<div></div>').progressbar({
            value: 0
        });

        var element = $('<div title="Fanfiction Story Parser"></div>')
            .append(
            $('<p></p>')
                .append($('<span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>'))
                .append(
                "<b>" + self._('Synchronization') + "</b><br/>" + self._('This System synchronizes the local Filter Settings with the Web Service.') + "<br />" +
                self._('"This data can be retrieved from every Machine, that has the same Token.') + "<br />" +
                "<b>" + self._('If you use this, you agree, that the data transfered is saved on the web service!') + "</b><br />" +
                "<b>" + self._('Use at own risk! Make backups if possible.') + "</b><br />" +
                '<br /><b>' + self._("Your Token: ") + self.config.token + '</b><br/><b>' + self._("Progress:") + '</b><br />'

                ).append(progressBar)
            ).appendTo($("body"));

        element.dialog({
            resizable: true,
            height: 500,
            modal: true,
            buttons:
            {
                "Start": function ()
                {
                    var progress = function (value)
                    {
                        if (value === -1)
                        {
                            value = false;
                        }

                        progressBar.progressbar("option", {
                            value: value
                        });

                        if (value === 100)
                        {
                            element.dialog("close");

                            var message = $('<div title="Fanfiction Story Parser"></div>')
                                .append(
                                $('<p></p>')
                                    .append($('<span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>'))
                                    .append(
                                    "<b>" + self._('Synchronization') + '</b><br/>' + self._('Sync Complete!') + "<br /><br />"
                                    ).append(progressBar)
                                ).appendTo($("body"));

                            message.dialog({
                                modal: true
                            });

                        }

                    };

                    self.parser.api_syncFilter(progress);
                },
                Cancel: function ()
                {
                    $(this).dialog("close");
                }
            }
        });


    }

    /**
     *   Open or closes the GUI for the Messaging GUI
     */
    public messagesGUI()
    {
        // Mark Messages as read:
        var localMessages = this.dataConfig['messages'];

        var messages = $("<div></div>");

        if (localMessages !== undefined)
        {
            this.parser.api_MarkMessages();

            $.each(localMessages, function (k, el)
            {
                messages.append(
                    $("<b></b>")
                        .text(el.Title)
                    )
                    .append(
                    $("<p></p>")
                        .html(el.Content)
                    )
                    .append("<hr />");
            });
        }



        var element = $('<div title="Fanfiction Story Parser"></div>')
            .append(
            $('<p></p>')
                .append($('<span class="" style="float: left; margin: 0 7px 20px 0;"></span>'))
                .append(
                "<b>" + this._('Messages:') + "</b><br/><br />"
                )
                .append(messages)
            ).appendTo($("body"));

        element.dialog({
            resizable: true,
            height: 500,
            modal: true,
            buttons:
            {
                Close: function ()
                {
                    $(this).dialog("close");
                }
            }
        });
    }

    /**
     *   Open or closes the GUI for the Feedback Function
     */
    public feedbackGUI()
    {
        var self = this;
        var types = [self._("Bug"), self._("Feature Request"), self._("Question"), self._("Other")];

        var inputType = $("<select></select>");
        $.each(types, function (_, type)
        {
            $("<option></option>").text(type)
                .appendTo(inputType);
        });

        var inputTitle = $('<input type="text" required />');
        var inputMessage = $('<textarea style="width:90%; height: 100px;" required></textarea>');


        var element = $('<div title="Fanfiction Story Parser"></div>')
            .append(
            $('<p></p>')
                .append($('<span class="" style="float: left; margin: 0 7px 20px 0;"></span>'))
                .append(
                "<b>Feedback:</b><br /><br />"
                )
                .append("<b>Type:</b><br />")
                .append(inputType)

                .append("<br /><b>Title:</b><br />")
                .append(inputTitle)

                .append("<br /><b>Message:</b><br />")
                .append(inputMessage)
                .append("<small>Please write English OR German!</small>")

            ).appendTo($("body"));

        element.dialog({
            resizable: true,
            height: 500,
            modal: true,
            buttons:
            {
                Send: function ()
                {
                    var data = {
                        Token: self.config.token,
                        Type: inputType.val(),
                        Title: inputTitle.val(),
                        Message: inputMessage.val(),
                        Version: self.VERSION,
                        Branch: self.BRANCH
                    };


                    self.parser.apiRequest({ command: "postFeedback", data: JSON.stringify(data) }, function () { });

                    alert("Message sent ...");

                    $(this).dialog("close");
                },

                Close: function ()
                {
                    $(this).dialog("close");
                }
            }
        });
    }


} 

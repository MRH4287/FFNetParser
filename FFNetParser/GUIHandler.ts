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
     * The Input Elements that are used in the config GUI 
    */
    //private settingsElements: { [index: string]: JQuery } = {};

    /** 
     * The Elements that are displayed on the GUI 
     */
    //private guiElements: { [index: string]: { [index: string]: JQuery } } = {};

    /** 
     * The number of new Entries created 
     */
    private addCount = 0;


    /**
     * Registered GUIs
     */
    private guiData: { [index: string]: GUIData } = {};


    public registerGUI(name: string, collection: any, elements: GUIElement[])
    {
        if (typeof (this.guiData[name]) !== "undefined")
        {
            this.log("Warning: overwriting GUI Data for: ", name);
            delete this.guiData[name];
        }

        var element: GUIData = {
            collection: collection,
            name: name,
            guiData: elements,
            instances: {}
        };

        this.guiData[name] = element;
    }


    public renderGUITo(name: string, target: JQuery)
    {
        if (typeof (this.guiData[name]) === "undefined")
        {
            this.log("No GUI with found with the name: ", name);
            return;
        }

        var data = this.guiData[name];

        this.createElements(target, data.guiData, data.instances);
    }

    private saveData(data: GUIData)
    {
        var self = this;

        $.each(data.guiData, function (_, element: GUIElement)
        {
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

            data.collection[element.name] = value;
        });
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
                    element.val(data.value);

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
                    if (data.value === true)
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
                    element.val(data.value);

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
                            $("<option/>").text(option).appendTo(element);
                        });
                    }

                    if (typeof (data.result) === "undefined")
                    {
                        data.result = function (e)
                        {
                            element.val();
                        };
                    }

                    break;
                case GUIElementType.Text:

                    element = $('<p></p>').html(data.value);

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
                        .val(data.value)
                        .colorpicker({
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
                        element = $('<p style="color: red; text-size: 15px">Missing Custom Element!</p>');
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


        // Buttons

        var saveButtonContainer = $('<div class="fflist-buttonContainer"></div>');

        $('<input class="btn" type="button" value="Save"></input>')
            .button({
                icons: {
                    primary: "ui-icon-check"
                }
            }).addClass("ffnetSaveButton").appendTo(saveButtonContainer);



        // Button Logic:
        var buttonLogic = function ()
        {
            var target = $(this).attr("data-target");

            $(".ffnet_Config_Button_Container").fadeOut(400, function ()
            {
                $("." + target).fadeIn();
            });

        };

        var backLogic = function ()
        {
            $(".ffnet_Config_Category:visible").fadeOut(400, function ()
            {
                $(".ffnet_Config_Button_Container").fadeIn();
            });
        };

        // Render SubLogic:

        var getButton = function (name, target, container)
        {
            return $("<div></div>").addClass("ffnet_Config_Button").text(name)
                .attr("data-target", target).click(buttonLogic).appendTo(container);
        };

        var getCategory = function (name, id, container)
        {
            var cat = $("<div></div>").addClass("ffnet_Config_Category").addClass(id).appendTo(container);
            var headline = $("<div></div>").addClass("headline").appendTo(cat);
            var backField = $("<div></div>").addClass("back").appendTo(headline);
            var backButton = $('<button class="btn">Back</back>').click(backLogic).appendTo(backField);
            var textField = $("<div></div>").appendTo(headline).text(name);

            var table = $('<table width="100%"></table>').appendTo(cat);


            var result =
                {
                    category: cat,
                    headline: headline,
                    table: table
                };

            return result;
        };

        // ----------- GUI -------------------------

        var spacer = $('<tr></tr>').append
            (
            $('<td width="30%" style="height:10px"></td>')
                .css('border-right', '1px solid gray')
            ).append(
            $('<td></td>')
            );


        var buttonContainer = $('<div class="ffnet_Config_Button_Container"></div>').appendTo(settingsContainer);

        getButton("Story Settings", "ffnetConfig-Settings", buttonContainer);
        getButton("Layout Settings", "ffnetConfig-Layout", buttonContainer);
        getButton("API Settings", "ffnetConfig-API", buttonContainer);
        getButton("Advanced", "ffnetConfig-Andvanced", buttonContainer);

        // --------------------------------------------------------------------------------------------------------------------------
        var cat = getCategory("Story Settings", "ffnetConfig-Settings", settingsContainer);
        var table = cat.table;

        this.registerGUI("config-story", this.config,
            [
                {
                    name: "story_search_depth",
                    type: GUIElementType.Input,
                    label: "Max Search depth: ",
                    value: this.config.story_search_depth,
                    attributes:
                    {
                        'size': '50'
                    }
                },
                {
                    name: 'mark_M_storys',
                    type: GUIElementType.Checkbox,
                    value: this.config.mark_M_storys,
                    label: 'Mark "M" rated Storys: '
                },
                {
                    name: 'hide_non_english_storys',
                    type: GUIElementType.Checkbox,
                    value: this.config.hide_non_english_storys,
                    label: 'Hide non English Storys: '
                },
                {
                    name: 'allow_copy',
                    type: GUIElementType.Checkbox,
                    value: this.config.allow_copy,
                    label: 'Allow the selection of Text: '
                }

            ]);

        this.renderGUITo("config", table);


        cat.category.append(saveButtonContainer.clone());

        // --------------------------------------------------------------------------------------------------------------------------
        cat = getCategory("Layout Settings", "ffnetConfig-Layout", settingsContainer);
        table = cat.table;


        this.registerGUI("config-layout", this.config,
            [
                {
                    name: 'hide_images',
                    type: GUIElementType.Checkbox,
                    value: this.config.hide_images,
                    label: 'Hide Story Images: '
                },
                {
                    name: 'hide_lazy_images',
                    type: GUIElementType.Checkbox,
                    value: this.config.hide_lazy_images,
                    label: 'Hide <abbr title="Images that are loaded after the first run. Mostly Story Images, not User Images">lazy</abbr> images: '
                },
                {
                    name: 'disable_image_hover',
                    type: GUIElementType.Checkbox,
                    value: this.config.disable_image_hover,
                    label: 'Disable Image Hover Effect: '
                },
                {
                    name: 'content_width',
                    type: GUIElementType.Input,
                    value: this.config.content_width,
                    label: 'Content Width: ',
                    attributes:
                    {
                        size: 50
                    }
                },
                {
                    name: 'color_normal',
                    type: GUIElementType.Input,
                    value: this.config.color_normal,
                    label: 'Normal Background-Color: ',
                    attributes:
                    {
                        size: 50
                    },
                    customOptions: function (element) 
                    {
                        element.colorpicker({
                            colorFormat: "#HEX"
                        });
                    }
                },
                {
                    name: 'color_mouse_over',
                    type: GUIElementType.Input,
                    value: this.config.color_mouse_over,
                    label: 'MouseOver Background-Color: ',
                    attributes:
                    {
                        size: 50
                    },
                    customOptions: function (element) 
                    {
                        element.colorpicker({
                            colorFormat: "#HEX"
                        });
                    }
                },
                {
                    name: 'color_odd_color',
                    type: GUIElementType.Input,
                    value: this.config.color_odd_color,
                    label: 'Odd Background-Color: ',
                    attributes:
                    {
                        size: 50
                    },
                    customOptions: function (element) 
                    {
                        element.colorpicker({
                            colorFormat: "#HEX"
                        });
                    }
                },
                {
                    name: 'readingHelp_enabled',
                    type: GUIElementType.Checkbox,
                    value: this.config.readingHelp_enabled,
                    label: 'Enable the Reading Help: '
                },
                {
                    name: 'readingHelp_backgroundColor',
                    type: GUIElementType.Input,
                    value: this.config.readingHelp_backgroundColor,
                    label: 'Reading Help Background Color: ',
                    attributes:
                    {
                        size: 50
                    },
                    customOptions: function (element)
                    {
                        element.colorpicker({
                            colorFormat: "#HEX"
                        });
                    }
                },
                {
                    name: 'readingHelp_color',
                    type: GUIElementType.Input,
                    value: this.config.readingHelp_color,
                    label: 'Reading Help Text Color: ',
                    attributes:
                    {
                        size: 50
                    },
                    customOptions: function (element)
                    {
                        element.colorpicker({
                            colorFormat: "#HEX"
                        });
                    }
                }



            ]);

        this.renderGUITo("config-layout", table);


        cat.category.append(saveButtonContainer.clone());

        // --------------------------------------------------------------------------------------------------------------------------
        cat = getCategory("API Settings", "ffnetConfig-API", settingsContainer);
        table = cat.table;


        this.registerGUI("config-api", this.config,
            [
                {
                    name: '',
                    type: GUIElementType.Text,
                    label: "--------",
                    value: ' ---- <a href="http://www.getpocket.com">Pocket</a> Settings ----'
                },
                {
                    name: 'pocket_user',
                    type: GUIElementType.Input,
                    label: 'Username: ',
                    value: this.config.pocket_user,
                    attributes:
                    {
                        size: 50
                    }
                },
                {
                    name: 'pocket_password',
                    type: GUIElementType.Input,
                    label: 'Password: ',
                    value: this.config.pocket_password,
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
                    value: ' ---- API Settings ----'
                },
                {
                    name: 'api_url',
                    type: GUIElementType.Custom,
                    label: 'Server Backend Address: ',
                    value: '',
                    debugOnly: true,
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
                    name: 'api_checkForUpdates',
                    type: GUIElementType.Checkbox,
                    label: 'Check for Updates: ',
                    value: this.config.api_checkForUpdates,
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
                    label: 'Auto Update: ',
                    value: this.config.api_autoIncludeNewVersion,
                },
                {
                    name: 'token',
                    type: GUIElementType.Input,
                    label: '<abbr title="Used for identification on the Web-Service (e.g. Synchronization)">Token</abbr>: ',
                    value: this.config.token,
                    attributes:
                    {
                        size: 50,
                        pattern: "[0-9a-zA-Z]+"
                    }
                }

            ]);

        this.renderGUITo("config-layout", table);


        cat.category.append(saveButtonContainer.clone());

        // --------------------------------------------------------------------------------------------------------------------------
        cat = getCategory("Advanced", "ffnetConfig-Andvanced", settingsContainer);
        table = cat.table;

        this.registerGUI("config-advanced", this.config,
            [
                {
                    name: 'disable_highlighter',
                    type: GUIElementType.Checkbox,
                    label: '<abbr title="Disable the Story Highlighter Feature.">Disable Highlighter</abbr>: ',
                    value: this.config.disable_highlighter
                },
                {
                    name: 'disable_cache',
                    type: GUIElementType.Checkbox,
                    label: '<abbr title="Disable the Caching function used for the in Story search.">Disable Cache</abbr>: ',
                    value: this.config.disable_cache
                },
                {
                    name: 'disable_parahraphMenu',
                    type: GUIElementType.Checkbox,
                    label: '<abbr title="Disable the Paragraph Menu.">Disable Paragraph Menu</abbr>: ',
                    value: this.config.disable_parahraphMenu
                },
                {
                    name: 'disable_sync',
                    type: GUIElementType.Checkbox,
                    label: 'Disable Synchronization Feature: ',
                    value: this.config.disable_sync
                }

            ]);

        this.renderGUITo("config-advanced", table);

        cat.category.append(saveButtonContainer.clone());

        // --------------------------------------------------------------------------------------------------------------------------

        this.log("GUI - Add Markers: ", this.config.marker);

        var container = $("<div></div>").appendTo(this.guiContainer);


        $.each(this.config.marker, function (name, marker)
        {
            self.gui_add_form(name, marker, container);
        });

        this.log("GUI - Markers added");

        var filterButtonContainer = saveButtonContainer.clone();
        filterButtonContainer.appendTo(this.guiContainer);

        $('<input class="btn" type="button" value="Add Field"></input>')
            .button({
                icons: {
                    primary: "ui-icon-plusthick"
                }
            })
            .click(function ()
            {
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
                        mark_chapter: false,
                        print_story: false,
                        mention_in_headline: true,
                        text_color: '#686868',
                        revision: -1,
                        ignoreColor: false
                    }, container
                    , true // Display Big
                    );

            }).appendTo(filterButtonContainer);


        $('<input class="btn" type="button" value="Import Filter"></input>')
            .button({
                icons: {
                    primary: "ui-icon-plusthick"
                }
            })
            .click(function (event)
            {
                event.preventDefault();


                // Create Dialog:
                var dialog = $('<div></div>').attr("title", "Import Filter")
                    .append(
                    $('<textarea rows="5" cols="20" class="FilterInput"></textarea>')
                    )
                    .append(
                    $('<button class="btn">Save</button>')
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
            var newConfig: { [index: string]: MarkerConfig } = {};

            self.log("Save Config");

            self.saveAll();

            /*
            $.each(self.guiElements, function (k, data)
            {
                if (typeof (data) === "undefined")
                {
                    return;
                }

                var name = data.name.val();
                if (name === "")
                {
                    return;
                }

                var config =
                    {
                        name: name,
                        color: data.color.val(),
                        ignore: data.ignore.val().split(', '),
                        keywords: data.keywords.val().split(', '),
                        mark_chapter: data.mark_chapter.is(':checked'),
                        mention_in_headline: data.mention_in_headline.is(':checked'),
                        display: data.display.is(':checked'),
                        mouseOver: data.mouseOver.val(),
                        print_story: data.print_story.is(':checked'),
                        search_story: data.search_story.is(':checked'),
                        ignoreColor: data.ignoreColor.is(':checked'),
                        background: (self.DEBUG ? data.background.val() : ((name in self.config.marker && self.config.marker[name].background != null) ? (self.config.marker[name].background) : null)),
                        text_color: data.text_color.val(),
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


                //console.log(name, config);
                newConfig[name] = config;

            });

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

            self.config.marker = newConfig;

            self.parser.save_config();

            self.log("Config Saved Successfully");



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


        var table = $('<table width="100%"></table>').appendTo(container);


        var self = this;


        this.registerGUI(name, self.config.marker,
            [
                {
                    name: 'name',
                    type: GUIElementType.Input,
                    label: "Name: ",
                    value: name,
                    attributes:
                    {
                        size: 50
                    }
                },
                {
                    name: 'display',
                    type: GUIElementType.Checkbox,
                    label: 'Display Found Entries: ',
                    value: marker.display
                },
                {
                    name: 'keywords',
                    type: GUIElementType.Input,
                    label: 'Keywords: ',
                    value: marker.keywords.join(', '),
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
                            '<br><span style="font-size: small;">Seperated with ", "</span>'
                            );
                    }
                },
                {
                    name: 'ignore',
                    type: GUIElementType.Input,
                    label: 'Ignore when: ',
                    value: marker.ignore.join(', '),
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
                            '<br><span style="font-size: small;">Seperated with ", "</span>'
                            );
                    }
                },
                {
                    name: 'ignoreColor',
                    type: GUIElementType.Checkbox,
                    label: 'Ignore Color Settings:',
                    value: marker.ignoreColor,
                    customOptions: function (checkbox)
                    {
                        var check = function ()
                        {
                            if (checkbox.is(":checked"))
                            {
                                $('#fflist-' + name + '-color')
                                    .add('#fflist-' + name + '-mouseOver')
                                    .add('#fflist-' + name + '-text_color')
                                    .attr("disabled", "disabled");
                            }
                            else
                            {
                                $('#fflist-' + name + '-color')
                                    .add('#fflist-' + name + '-mouseOver')
                                    .add('#fflist-' + name + '-text_color')
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
                    value: marker.color,
                    label: 'Color: ',
                    attributes:
                    {
                        id: 'fflist-' + name + '-color'
                    }
                },
                {
                    name: 'mouseOver',
                    type: GUIElementType.Color,
                    value: marker.mouseOver,
                    label: 'Mouse Over Color: ',
                    attributes:
                    {
                        id: 'fflist-' + name + '-mouseOver'
                    }
                },
                {
                    name: 'text_color',
                    type: GUIElementType.Color,
                    value: marker.text_color,
                    label: 'Info Text Color: ',
                    attributes:
                    {
                        id: 'fflist-' + name + '-text_color'
                    }
                },
                {
                    name: 'background',
                    type: GUIElementType.Input,
                    value: marker.background,
                    label: 'Background Image (Path): '
                },
                {
                    name: 'search_story',
                    type: GUIElementType.Checkbox,
                    value: marker.search_story,
                    label: 'Search in Storys: '
                },
                {
                    name: 'mark_chapter',
                    type: GUIElementType.Checkbox,
                    value: marker.mark_chapter,
                    label: 'Mark Chaper: '
                },
                {
                    name: 'print_story',
                    type: GUIElementType.Checkbox,
                    value: marker.print_story,
                    label: 'List Storys: '
                },
                {
                    name: 'mention_in_headline',
                    type: GUIElementType.Checkbox,
                    value: marker.mention_in_headline,
                    label: 'Mention in Headline: '
                },
                {
                    name: '',
                    type: GUIElementType.Button,
                    value: 'Remove',
                    label: '',
                    callback: function ()
                    {
                        delete self.guiData[name];

                        container.fadeOut(function ()
                        {
                            container.remove();
                        });

                    }
                },
                {
                    name: '',
                    type: GUIElementType.Custom,
                    value: '',
                    label: '',
                    customElement: function ()
                    {
                        var elementContainer = $("<div></div>");
                        $('<div style="display:inline-block; width: 80%"></div>').appendTo(elementContainer).append(

                            $('<img src="' + self.parser.getUrl('glyphicons_369_collapse_top.png') + '" alt="Minimize"></img>').click(function ()
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
                            $('<button class="btn">Export</button>')
                                .button()
                                .click(function (event)
                                {
                                    event.preventDefault();

                                    // Create Dialog:
                                    var dialog = $('<div></div>').attr("title", "Export Data for Element " + marker.name)
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
            ]);

        this.renderGUITo(name, table);


        container.fadeIn();

        this.log("Form added");
    }

    /**
     *   Hides the GUI
     */
    private gui_hide()
    {
        this.guiContainer.dialog("close");
        //_guiContainer.fadeOut();
    }

    /**
     *   Displays the GUI
     */
    private gui_show()
    {
        var self = this;
        var buttons = {

            "Synchronization": function ()
            {
                if (confirm("All unsaved changes will be deleted!"))
                {
                    self.gui_hide();

                    self.syncGUI();
                }
            },

            "Config Import / Export": function ()
            {
                if (confirm("All unsaved changes will be deleted!"))
                {
                    self.openSaveConfig();
                }
            },

            "Menu": function ()
            {
                // Reopen:
                if (confirm("All unsaved changes will be deleted!"))
                {
                    self.gui_hide();

                    self.gui();

                }

            },

            "Reset Config": function ()
            {
                if (confirm('Are you shure to overwrite the Config? This will overwrite all your changes!'))
                {
                    $(this).dialog("close");

                    self.parser.defaultConfig();
                }

            },

            Close: function ()
            {
                if (confirm("All unsaved changes will be deleted!"))
                {
                    $(this).dialog("close");
                }
            }
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
    private gui()
    {
        if (this.guiContainer == null)
        {
            this.gui_create();
        }

        this.gui_update();
        this.gui_show();

    }

    /**
     *   Open "Save Config" Submenu
     */
    private openSaveConfig()
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

            this.guiContainer.append('<label for="ffnet-config-display">Your current Config:</label><br/>');

            var old = $('<textarea id="ffnet-config-display" style="width:90%; height: 100px;"></textarea>')
                .val(this.parser.getConfig())
                .appendTo(this.guiContainer);


            this.guiContainer.append('<br/><label for="ffnet-config-set">Import Config:</label><br/>');

            var neu = $('<textarea id="ffnet-config-set" style="width:90%; height: 100px;"></textarea>')
                .appendTo(this.guiContainer);

            this.guiContainer.append(
                $('<input class="btn" type="button" value="Set" />')
                    .click(function ()
                    {
                        self.parser.setConfig(neu.val());
                        self.gui_hide();
                        self.parser.read();
                    })
                );

            this.gui_show();
        }

    }

    /**
     *   Open or closes the GUI for the Story Config
     *   @param storyInfo Infos about the story
     */
    private toggleStoryConfig(storyInfo: StoryInfo)
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
                    console.warn("_toggleStoryConfig: No Parameter given!");
                }

                return;
            }

            if (this.DEBUG)
            {
                console.log("Starting Content Generation");
            }

            this.guiContainer.html('');


            // Set Position:
            //_guiContainer.css("position", "fixed");

            /*
            $('<div style="width:100%; text-align:right; margin-bottom: 5px"></div>').append(
                $('<input class="btn" type="button" value="Close"></input>').click(function ()
                {
                    if (confirm("All unsaved changes will be deleted!"))
                    {
                        _guiContainer.css("position", "absolute");
                        _gui_hide();
                    }

                })
            ).appendTo(_guiContainer);
            */

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
                        self.parser.read();
                        self.parser.enableInStoryHighlighter();
                    })
                );


            if (this.DEBUG)
            {
                console.log("Display Content");
            }

            this.gui_show();
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
                "<b>Synchronization</b><br/>This System synchronizes the local Filter Settings with the Web Service.<br />" +
                "This data can be retrieved from every Machine, that has the same Token.<br />" +
                "<b>If you use this, you agree, that the data transfered is saved on the web service!</b><br />" +
                "<b>Use at own risk! Make backups if possible.</b><br />" +
                "<br /><b>Your Token: " + self.config.token + "</b><br/><b>Progress:</b><br />"

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
                                    "<b>Synchronization</b><br/>Sync Complete! <br /><br />"
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
    private messagesGUI()
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
                "<b>Messages:</b><br/><br />"
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
    private feedbackGUI()
    {
        var self = this;
        var types = ["Bug", "Feature Request", "Question", "Other"];

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

/// <reference path="jquery.d.ts" /> 
/// <reference path="jquery.colorpicker.d.ts" /> 
/// <reference path="jqueryui.d.ts" /> 

class StoryParser
{
    private DEBUG: boolean = false;
    private IGNORE_NEW_VERSION: boolean = false;

    public VERSION = "@@VERSION"; // 5.0.0
    public BRANCH = "@@BRANCH"; // dev

    private LOAD_INTERNAL: boolean = false;

    // Default-Config:
    private config = {

        // Story:
        story_search_depth: 2,                  // The Max depth for a recursive search
        mark_M_storys: true,                    // Mark every Story Rated as M
        hide_non_english_storys: true,          // Hide all Storys, that are not in english
        allow_copy: false,

        // Layout:
        color_normal: "#FFFFFF",
        color_mouse_over: "#EEF0F4",
        color_odd_color: "#dfdfdf",
        hide_images: false,
        hide_lazy_images: false,
        disable_image_hover: false,
        content_width: "90%",

        // API:
        pocket_user: null,
        pocket_password: null,
        api_url: "http://www.mrh-development.de/FanFictionUserScript",
        api_lookupKey: "ffnet-api-interface",
        api_timeout: 3000,
        api_retries: 2,
        api_checkForUpdates: true,
        api_autoIncludeNewVersion: true,

        // advanced Features:
        disable_cache: false,
        disable_highlighter: false,
        disable_sync: true,


        // Do not change below this line:
        storage_key: "ffnet-storycache",
        config_key: "ffnet-config",
        dataStorage_key: "ffnet-dataStore",

        highlighter: {},
        marker: {},
        token: undefined,
        markerBackup: {}
    };

    private baseConfig = this.config;

    // ----------------------

    private element: JQuery = null;
    private hidden = 0;
    private hidden_elements: { [index: string]: string } = {};

    private eList = {};

    private found = [];
    private storyCache: { [index: string]: string } = {};


    // Config that is only available in this session
    private dataConfig = {};

    // Use the Cross-Origin-Resource-Sharing Feature
    private useCORS = false;

    // Is the current Page the page of a specific user
    private inUsersPage = false;

    private gui_container: JQuery = null;


    /**
    *   Resets Config to the default setting
    */
    private defaultConfig()
    {
        if (this.config["token"] === undefined)
        {
            // Generates Random Token
            this.config["token"] = Math.random().toString().split(".")[1];
            this.save_config();
        }

        var token = this.config.token;

        this.config = this.baseConfig;

        this.save_config();

    }

    /**
    *   Initializes System
    */
    constructor()
    {
        var self = this;

        var isNested = this.IGNORE_NEW_VERSION;

        if (typeof (sessionStorage["ffnet-mutex"]) !== "undefined")
        {
            if (this.DEBUG)
            {
                console.log("Found Mutex!");
            }

            isNested = true;

            if (typeof (localStorage["ffnet-Script-VersionID"]) !== "undefined")
            {
                var newVersionID = Number(localStorage["ffnet-Script-VersionID"]);
                var currentID = this.getVersionId(this.VERSION);

                this.log("Current Version ID: ", currentID);
                this.log("Cached Version ID: ", newVersionID);

                if (newVersionID > currentID)
                {
                    this.log("New Version in Storage found ...");
                }
                else
                {
                    try
                    {
                        this.log("The cached Version is older or the same as the current -> delete");
                        delete (localStorage["ffnet-Script-VersionID"]);
                        delete (localStorage["ffnet-Script"]);
                    }
                    catch (e)
                    {
                        console.error("Couldn't delete cached Version", e);
                    }

                }

            }

        }

        if (!isNested)
        {
            // Check for new Version
            var data = this.loadFromMemory(localStorage, "ffnet-Script");
            if (data.script !== undefined)
            {
                if (this.DEBUG)
                {
                    console.info("Found External Script! Loading ....");
                }

                sessionStorage["ffnet-mutex"] = true;



                window.setTimeout(function ()
                {
                    delete sessionStorage["ffnet-mutex"];

                    if (self.DEBUG)
                    {
                        console.log("Delete Mutex Var");
                    }

                }, 1000);

                try
                {
                    /*! jshint ignore:start */
                    eval(data.script);
                    /*! jshint ignore:end */
                }
                catch (e)
                {
                    console.error("Invalid Local Script! Deleting");
                    delete localStorage["ffnet-Script"];
                }

                this.LOAD_INTERNAL = true;

                // Abort
                return;
            }
        }
        else
        {
            try
            {
                // Load Version Infos into the Local Storage:
                localStorage["ffnet-Script-VersionID"] = this.getVersionId(this.VERSION);
            }
            catch (e)
            {
                console.error("Can't save Version id: ", e);
            }

        }

        try
        {
            // Checks if sessionStorage entry is valid:
            this.storyCache = this.loadFromMemory(sessionStorage, this.config.storage_key);
            this.dataConfig = this.loadFromMemory(sessionStorage, this.config.dataStorage_key);

        } catch (ex)
        {
            console.warn(ex);
        }

        var defaultConfig = this.config;

        try
        {
            this.config = this.loadFromMemory(localStorage, this.config.config_key);

        } catch (ex)
        {
            console.warn(ex);
        }


        // Check for Config Values:

        if ((this.config["pocket_user"] === undefined) || (this.config["pocket_user"] === ""))
        {
            this.config["pocket_user"] = null;
        }

        if ((this.config["pocket_password"] === undefined) || (this.config["pocket_password"] === ""))
        {
            this.config["pocket_password"] = null;
        }

        if (this.config["token"] === undefined)
        {
            // Generates Random Token
            this.config["token"] = Math.random().toString().split(".")[1];
            this.save_config();
        }

        if (this.config["api_autoIncludeNewVersion"] === undefined)
        {

            // Creates Warning for new Feature:

            var text = "<b>Please Read!</b><br />";
            text += "In one of the previous version, a new feature has been implemented. Whith this Feature activated, you don't have to manually install new Versions. ";
            text += "Newer Versions will be saved in your Local Storage and then executed. Because of that, the Version Number displayed in your UserScript Manager ";
            text += "can be wrong. To Display the Version Number, check your Menu.";
            text += "Do you want to activate this Feature?";

            var dialog = $('<div title="Fanfiction Story Parser"><p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>' + text + '</p></div>')
                .appendTo($("body"));

            window.setTimeout(function ()
            {
                dialog.dialog({
                    resizable: true,
                    modal: true,
                    buttons:
                    {
                        "Enable Feature": function ()
                        {
                            $(this).dialog("close");

                            self.config['api_autoIncludeNewVersion'] = true;
                            self.save_config();

                        },
                        Cancel: function ()
                        {
                            $(this).dialog("close");

                            self.config['api_autoIncludeNewVersion'] = false;
                            self.save_config();
                        }
                    }
                });
            }, 1000);
        }


        // Load all the config Values that are listed in the _config Array at startup
        $.each(defaultConfig, function (name, defaultValue)
        {
            if (self.config[name] === undefined)
            {
                self.config[name] = defaultValue;
            }
        });

        // Replace https in BackendURL to http
        this.config.api_url = this.config.api_url.replace("https", "http");

        // Check for CORS:
        this.useCORS = 'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest();

        if (this.DEBUG)
        {
            console.info("Loading User Script...");
        }

        this.api_checkVersion();

        if (this.DEBUG)
        {
            console.log("Update Check done.");
            console.log("Pre GUI Update");
        }

        // Add jQueryUI to the Page:        
        var block = $('<link  rel="stylesheet" type="text/css"></link>').attr("href", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/ui-lightness/jquery-ui.css");
        $("head").append(block);

        if ($.ui === undefined)
        {
            console.error("Can't include jQuery UI!");
        }

        // Add jQuery Color Picker to the Page:     
        block = $('<link  rel="stylesheet" type="text/css"></link>').attr("href", "http://private.mrh-development.de/ff/jquery.colorpicker.css");
        $("head").append(block);

        /*
        block = $('<link  rel="stylesheet" type="text/css"></link>').attr("href", "http://www.mrh-development.de/FanFictionUserScript/Css?branch=" + _BRANCH);
        $("head").append(block);
        */

        // Use this because of the new HTTPS Restrictions ...
        this.api_getStyles();

        // Check if the current Page is a User Specific Page:
        var locationRegEx = new RegExp("\/u\/[0-9]+\/");
        this.inUsersPage = locationRegEx.test(location.href);



        // Check for DEBUG-Mode
        if ((this.config['debug'] !== undefined) || (this.BRANCH === "dev"))
        {
            this.DEBUG = true;
        }


        if (this.DEBUG)
        {
            console.log("Pre GUI Update done.");
            console.log("Starts GUI Update");
        }

        this.updateGUI();

        if (this.DEBUG)
        {
            console.log("GUI Update done.");
        }


    }

    /**
    *   Adds GUI Elements like Menu Link
    */
    private updateGUI()
    {
        // Updates Content_width
        $('#content_wrapper').css('width', this.config['content_width']);

        var table = $(".zui").find("td").first();

        var self = this;

        if (table.length > 0)
        {
            if (this.DEBUG)
            {
                console.log("Adds User Interface");
            }

            // Add User Interface
            table.append(
                $('<a></a>').addClass('menu-link').html('Reparse Stories').attr('href', '#').click(function (e)
                {
                    self.readList($('.z-list'));
                    e.preventDefault();

                }).attr('title', 'Parse the Stories again')
                ).append(
                $('<a></a>').addClass('menu-link').html('Menu').attr('href', '#').click(function (e)
                {
                    self.gui();
                    e.preventDefault();

                }).attr('title', 'Open Config Menu')
                );

        }

        // Add Messages Menu:
        this.log("Add Messages Menu");

        var menulinks = $(".menulink").first();


        if (menulinks.length > 0)
        {
            var imageContainer = $("<div></div>")
                .css("display", "inline-block")
                .css("margin-left", "10px")
                .css("height", "100%")
                .addClass("ffnetMessageContainer")
                .addClass("clickable")
                .attr("title", "Advanced Messaging Features. Sorry, this is not a PM Button :-(")
                .appendTo(menulinks);


            imageContainer.append(

                $("<img></img>")
                    .attr("src", "http://private.mrh-development.de/ff/message-white.png")
                    .css("width", "20px")
                    .css("margin-bottom", "4px")
                );


            var radius = 15;
            var height = 120;
            var width = 260;


            var messageContainer = $("<div></div>")
                .addClass("ffnet_messageContainer")
                .appendTo("body");




            var innerContainer = $("<div></div>")
                .addClass("innerContainer")
                .appendTo(messageContainer);

            imageContainer.click(function ()
            {
                if (messageContainer.is(":hidden"))
                {
                    //Set Position of Element:
                    var pos = imageContainer.position();

                    messageContainer
                        .css("top", (pos.top + 20) + "px")
                        .css("left", (pos.left - 100) + "px")
                        .show();

                }
                else
                {
                    messageContainer.hide();
                }

            });

            innerContainer.append(
                $("<div>Message Menu (Script)</div>")
                    .css("font-weight", "bold")
                    .css("margin-bottom", "10px")
                );

            var count = 0;

            if (this.dataConfig['messages'] !== undefined)
            {
                count = this.dataConfig['messages'].length;
            }


            innerContainer.append(
                $('<div><span class="ffnet-messageCount">' + count + "</span> Message(s)</div>")
                    .addClass("menuItem")
                    .click(function ()
                    {
                        messageContainer.hide();

                        self.messagesGUI();

                    })
                );

            innerContainer.append(
                $("<div>Give Feedback</div>")
                    .addClass("menuItem")
                    .click(function ()
                    {
                        messageContainer.hide();

                        self.feedbackGUI();
                    })
                );



        }
        else
        {
            if (this.DEBUG)
            {
                console.warn("Can't find Element .menulink ", menulinks);

            }
        }


        if (this.DEBUG)
        {
            /*
            $('.zui').last().append(
                $('<a></a>').addClass('menu-link').html('Test - Feature').attr('href', '#').click(function(e)
                {
                    _loadNextPage();

                }).attr('title', 'Test Feature')
            );
            */
        }

        // Add GUI for "Only Mode":
        var container = $("#filters > form > .modal-body");

        if (container.length > 0)
        {
            if (this.DEBUG)
            {
                console.log('Add GUI for "Only Mode"');
            }

            var input = $("<select></select>")
                .attr("title", "Display Only Elements that match a specific Filter")
                .change(function ()
                {
                    var selected = input.children().filter(":selected").attr('value');
                    if (self.DEBUG)
                    {
                        console.info("Display Only - Element Selected: ", selected);
                    }

                    if (selected !== "off")
                    {
                        self.dataConfig["displayOnly"] = selected;
                    }
                    else
                    {
                        self.dataConfig["displayOnly"] = undefined;
                    }

                    self.save_dataStore();
                    self.readList($('.z-list'));

                }).addClass("filter_select");

            var noneEntry = $('<option value="off">Display: Everything</option>').appendTo(input);

            if (this.dataConfig["displayOnly"] === undefined)
            {
                noneEntry.attr("selected", "selected");
            }


            $.each(this.config.marker, function (title, info)
            {
                var entry = $('<option></option>').attr('value', title).html(title).appendTo(input);

                if ((self.dataConfig["displayOnly"] !== undefined) && (title === self.dataConfig["displayOnly"]))
                {
                    entry.attr("selected", "selected");
                }

            });


            container.find("select").not(".filter_select_negative ").last().after(input);

            input.before("&nbsp;");
        }

        // Key Control for Page:

        $("body").keydown(function (event)
        {
            var container = $("#content_wrapper_inner").find("center").last();
            var current = container.find("b").first();
            var url = null;

            if ($(event.target).is("body"))
            {
                var element: JQuery;
                // right
                if (event.keyCode === 39)
                {
                    element = current.next("a");
                    if (element.length !== 0)
                    {
                        url = element.attr("href");
                    }

                    if (url == null)
                    {
                        element = $("body").find('button:contains(Next)').first();
                        if (element.length !== 0)
                        {
                            url = self.getUrlFromButton(element);
                        }
                    }

                }
                // left
                else if (event.keyCode === 37)
                {
                    element = current.prev("a");
                    if (element.length !== 0)
                    {
                        url = element.attr("href");
                    }

                    if (url == null)
                    {
                        element = $("body").find('button:contains(Prev)').first();
                        if (element.length !== 0)
                        {
                            url = self.getUrlFromButton(element);
                        }
                    }

                }

                if (self.DEBUG)
                {
                    console.log("Changes to Page: ", url);
                }


                if (url != null)
                {
                    location.href = url;
                }
            }

        });


        // Endless Mode --- DEBUG-Mode
        if (self.DEBUG)
        {
            // This is unfinished and should not be used ....
            /*
            if ($(".z-list").length > 0)
            {

                $(".z-list").first().before(
                    $("<a></a>").html("LoadPrevPage")
                    .attr("href", "#")
                    .click(function (e)
                    {
                        _loadPrevPage();

                        //e.preventDefault();
                    })
                );

                $(".z-list").last().after(
                    $("<a></a>").html("LoadNextPage")
                    .attr("href", "#")
                    .click(function (e)
                    {
                        _loadNextPage();

                        //e.preventDefault();
                    })
                );
            }
            */
        }

    }

    /**
    *   Start parsing story List
    *   @param __element Base Element to start parsing
    */
    public readList(element)
    {
        if (this.LOAD_INTERNAL)
        {
            return;
        }

        if (this.inUsersPage)
        {
            this.element = element.filter("#st_inside > .z-list");
        }
        else
        {
            this.element = element;
        }

        this.read();
    }


    /**
    *   Parses the elements in the specified Container
    *   @remark Use readList for initial parsing
    */
    private read()
    {

        var odd = false;

        // Clear old Session:
        this.found = [];
        this.eList = {};
        this.hidden = 0;
        this.hidden_elements = {};
        $('.parser-msg').remove();
        $('[data-color]').removeAttr("data-color");

        var self = this;
        this.element.each(function (k, e)
        {
            var element = $(e);

            // Reset Hide:
            element.show();

            var textEl = element.find('div').last();
            var text = element.text().toLowerCase();
            var color = self.config.color_normal;
            var colorMo = self.config.color_mouse_over;
            var link = element.find('a').first().attr('href');

            var storyName = self.getStoryName(link);

            var requestQueue = [];

            if (self.config.hide_non_english_storys && (text.indexOf('english') === -1))
            {
                if (self.DEBUG)
                {
                    console.log("Hide Element because of 'hide_non_english_storys'", link);
                }

                self.hidden_elements[link] = "hide_non_english_storys";

                element.hide();
                self.hidden += 1;
                return;
            }

            if (odd)
            {
                color = self.config.color_odd_color;
                odd = false;
            } else
            {
                odd = true;
            }

            var marker_found = false;

            $.each(self.config.marker, function (headline, config)
            {

                var ignore = false;
                $.each(config.ignore, function (i, marker)
                {
                    try
                    {
                        var reg = new RegExp(marker, "i");

                        if ((marker !== "") && reg.test(text))
                        {
                            // Ignore this Element
                            ignore = true;
                            return;
                        }
                    } catch (e)
                    {
                        console.warn(e);
                    }
                });

                if (ignore)
                {
                    return;
                }

                var found = false;

                $.each(config.keywords, function (i, marker)
                {
                    var reg = new RegExp(marker, "i");

                    if (!found)
                    {
                        if (reg.test(text))
                        {
                            found = true;
                        }
                    }
                });

                if (found)
                {
                    if (!config.ignoreColor)
                    {
                        marker_found = true;
                    }
                    else if (self.DEBUG)
                    {
                        console.log("Ignore Color for ", headline);
                    }

                    var info = {
                        'name': storyName,
                        'url': link,
                        'chapter': 0
                    };

                    self.elementCallback(self, config, element, textEl, headline, info);


                    self.found.push(storyName);

                } else if (config.search_story)
                {
                    var parseData = {
                        url: link,
                        keywords: config.keywords,
                        headline: headline,
                        config: config,
                        element: element,
                        textEl: textEl,
                        info: info,
                        storyName: storyName
                    };

                    requestQueue.push(parseData);

                } else if (self.found.indexOf(storyName) === -1)
                {

                    /*if (_DEBUG)
                    {
                        console.log("[_read-1] Change Color of Line: ",element); 
                    }*/

                    //_updateColor(element, color, colorMo, true);
                }

                if (self.config.mark_M_storys)
                {
                    textEl.html(textEl.html().replace('Rated: M', '<b>Rated: M</b>'));
                }
            });

            if (self.config['hide_images'])
            {
                element.find('img').hide();
            }

            // Highlighter:

            if (!self.config.disable_highlighter)
            {
                // Build Context Menu for Storys:
                var contextMenu = $("<div></div>")
                    .css("width", "20px")
                    .css("height", "20px")
                    .css("float", "right")
                    .addClass("parser-msg")
                    .addClass("context-menu")
                    .append(
                    $("<img></img>")
                        .attr("src", "http://private.mrh-development.de/ff/edit.gif")
                        .css("width", "100%")
                        .css("height", "100%")
                    );

                // Open GUI
                contextMenu.click(function ()
                {
                    if (self.DEBUG)
                    {
                        console.log("Context Menu for ", element, " clicked");
                    }

                    self.toggleStoryConfig({
                        url: link,
                        element: element,
                        name: storyName
                    });

                });

                element.find("div").first().before(contextMenu);


                // Highlighter found:
                if (self.config['highlighter'][link] !== undefined)
                {
                    if (self.DEBUG)
                    {
                        console.info("Highlight Element Found: ", element);
                    }

                    // Update old Format
                    if (typeof (self.config['highlighter'][link]) !== "object")
                    {
                        if (self.DEBUG)
                        {
                            console.log("Updated old Highlighter Object");
                        }

                        self.config['highlighter'][link] = { image: self.config['highlighter'][link], hide: false };
                    }

                    if (self.config['highlighter'][link].hide)
                    {
                        if (self.DEBUG)
                        {
                            console.log("Hide Entry because of Story Config: ", link);
                        }
                        self.hidden_elements[link] = "storyConfig";

                        element.attr("data-hiddenBy", "storyConfig");

                        element.hide();
                        self.hidden++;
                    }


                    var img = $("<img></img>").attr("src", self.config['highlighter'][link].image)
                        .css("width", "20px")
                        .css("height", "20px")
                        .css("margin-left", "15px")
                        .addClass("parser-msg");

                    element.find("a").last().after(img);

                }
            }

            if (!marker_found)
            {
                /*if (_DEBUG)
                {
                    console.log("[_read] Change Color of Line: ",element); 
                }*/

                if (self.dataConfig["displayOnly"] !== undefined)
                {
                    if (self.DEBUG)
                    {
                        console.log("Hide Entry because of Display-Only Mode: ", element);
                    }

                    self.hidden_elements[link] = "Display-Only Mode";


                    element.hide();
                    self.hidden += 1;
                }
                else
                {
                    self.updateColor(element, color, colorMo, true);
                }


            }

            self.doParse(requestQueue);


        });

        if (this.DEBUG)
        {
            console.info("Current Highlighter Settings: ", this.config['highlighter']);
        }

        this.updateList();

        // Timed Events:
        setTimeout(function ()
        {
            // Color corrections            
            self.element.filter("[data-color]").each(function (k, e)
            {
                var el = $(e);
                var color = el.attr("data-color");

                el.css("background-color", color);

            });

            // Disable Image Hover Effect:
            if (self.config.disable_image_hover)
            {
                $("head").append(
                    $("<style></style")
                        .text(".z-list_hover { height: auto !important }")
                        .addClass("parser-msg")
                    );

                $(".cimage").each(function (k, e)
                {
                    var el = $(e);
                    var width = el.width();
                    var height = el.height();

                    el.css("width", width + "px")
                        .css("height", height + "px");

                });
            }

            if (self.config.hide_lazy_images)
            {
                $(".lazy").remove();
            }

            if (self.config.allow_copy)
            {
                self.log("Allow Selection of Text");
                $(".nocopy").removeClass("nocopy").parent().attr("style", "padding: 0px 0.5em;");
            }



        }, 1000);


        setTimeout(function ()
        {
            // Get Messages from Server:  
            if (typeof (self.dataConfig['messages']) === "undefined")
            {
                self.apiGetMessages(function (messages)
                {
                    if ((messages.Messages !== undefined) && (messages.Messages.length > 0))
                    {
                        // New Messages:
                        self.dataConfig['messages'] = messages.Messages;

                        // Update Icon:
                        $(".ffnetMessageContainer img").attr("src", "http://private.mrh-development.de/ff/message_new-white.png");

                        $('.ffnet-messageCount').text(messages.Messages.length);

                        self.save_dataStore();
                    }
                });

            }
            else
            {
                // Update Icon:
                $(".ffnetMessageContainer img").attr("src", "http://private.mrh-development.de/ff/message_new-white.png");
                $('.ffnet-messageCount').text(self.dataConfig['messages'].length);
            }

        }, 5000);


    }

    /**
    *   Gets the name of a story from a Link
    *   @param link Link to story
    *   @result Name of Story
    */
    private getStoryName(link): string
    {
        var storyName_reg = /\/s\/[0-9]+\/[0-9]+\/(.+)/;
        var result = storyName_reg.exec(link);

        if ((result != null) && (result.length > 1))
        {
            return result[1];
        } else
        {
            storyName_reg = /\/[^\/]+\/(.+)/;
            result = storyName_reg.exec(link);
            if ((result != null) && (result.length > 1))
            {
                return result[1];
            } else
            {
                return "None";
            }
        }
    }

    /**
    *   Starts Recursive Parsing of stories
    *   @param queue List of Stories to parse
    *   @param i What element in the queue should be parsed
    *   @remark Don't specify the second Argument for initial parsing
    */
    private doParse(queue, i = 0)
    {
        if (this.DEBUG)
        {
            console.info('Execute Queue on ' + i + ': ', queue);
        }

        if (i >= queue.length)
        {
            return;
        }

        var data = queue[i];

        var url: string;

        // Check for ScriptInsert Page:
        if (data.url.indexOf("?url=") === -1)
        {
            url = 'https://www.fanfiction.net' + data.url;
        }
        else
        {
            url = data.url;
        }

        var keywords = data.keywords;

        if (keywords === undefined)
        {
            console.warn('No Keywords!');
        }

        var self = this;

        var executeNext = function ()
        {
            self.doParse(queue, i + 1);
        };

        var callback = function (info)
        {
            var el = queue[i];

            if (self.DEBUG)
            {
                console.info('execute Callback Function ' + el.headline + ' for ', info);
            }

            self.elementCallback(self, el.config, el.element, el.textEl, el.headline, info);

            self.found.push(el.storyName);

            executeNext();
        };

        self.parse(url, keywords, callback, 0, executeNext);

    }

    /**
    *   Recursive Parsing function
    *   @param url URL to Story
    *   @param keyword  Keywords for parsing
    *   @param callback Callback in case of a found entry
    *   @param i Recursive Depth
    *   @param executeNext Callback for executing next element in the queue
    */
    private parse(url, keywords, callback, i, executeNext)
    {

        if (i >= this.config.story_search_depth)
        {
            executeNext();
            return;
        }

        //console.log('Open: ',url);

        var self = this;

        var ajax_callback = function (text: string)
        {
            if (!(url in self.storyCache) && !self.config.disable_cache)
            {
                if (self.DEBUG)
                {
                    console.log('Story ' + url + ' Not in Cache -> save');
                }

                self.storyCache[url] = text;

                try
                {
                    sessionStorage[self.config.storage_key] = JSON.stringify(self.storyCache);
                } catch (ex)
                {
                    self.log("Can't save Story Cache: ", ex);

                    try
                    {
                        sessionStorage[self.config.storage_key] = '';

                    } catch (e)
                    {
                        console.warn(e);
                    }
                }

            }

            var body = $(text);

            var sentence = null;

            if ((sentence = self.parseSite(body, keywords)) != null)
            {
                var storyName = self.getStoryName(url);
                callback({
                    'name': storyName,
                    'url': url,
                    'chapter': (i + 1),
                    'sentence': sentence
                });

            } else
            {
                //console.log('find next el');
                var next = body.find('button:contains(Next)').first();
                //console.log('next: ', next);

                if (next.length !== 0)
                {
                    var data = url = self.getUrlFromButton(next);

                    //console.log('data:', data);

                    if (data != null)
                    {
                        self.parse(data, keywords, callback, i + 1, executeNext);
                    }
                }
                //console.log('Content not found in: ', url);

            }

        };

        if (url in this.storyCache)
        {
            if (this.DEBUG)
            {
                console.log('Story ' + url + ' in Cache -> use Cache');
            }


            ajax_callback(this.storyCache[url]);
        } else
        {
            if (this.DEBUG)
            {
                console.log('Story ' + url + ' not in Cache -> request');
            }

            $.ajax({
                url: url,
                success: ajax_callback
            });
        }

        //console.log('reponse revieved');


    }


    /**
    *   Parses a story page for recursive search.
    *   @see _parse
    *   @param body Body Element of the loaded page
    *   @param keywords What Keywords to look for
    *   @result Matching Sentence or null
    */
    private parseSite(body, keywords)
    {
        var storyEl = body.find('.storytext');

        //console.log('search in ', storyEl);

        var self = this;

        if (storyEl.length === 1)
        {
            var storyText = storyEl.html().toLowerCase();

            var result = null;

            $.each(keywords, function (k, word)
            {
                if (!result)
                {
                    try
                    {
                        var wordReg = new RegExp(word, "i");
                        if (wordReg.test(storyText))
                        {

                            var append = "([a-zA-Z0-9, :-_\*]+)?";
                            var regEx = "[^|\.]?" + append + word + append + "[\.|$]?";
                            self.log("Use RegExp for InStory Search: ", regEx);

                            var reg = new RegExp(regEx, "i");
                            var data = reg.exec(storyText);

                            var sentence = "";
                            for (var i = 1; i < data.length; i++)
                            {
                                if (data[i] !== undefined)
                                {
                                    sentence += data[i];
                                }
                            }

                            self.log("Found Sentence: ", sentence);


                            result = sentence;

                            return;
                        }
                    } catch (e)
                    {
                        console.warn(e);
                    }
                }
            });
            return result;
        }

        return null;

    }

    /**
    *   Callback triggered, if an element was found
    *   @param self The current Instance
    *   @param config Element Config, as specified by the user
    *   @param element The instance of the HTML-Entity containing the match
    *   @param textEl The HTML-Instance containing the Text
    *   @param headline  The Headline of the Found story
    *   @param info The Info to the found element
    */
    private elementCallback(self: StoryParser, config, element, textEl, headline, info)
    {
        var found_where = info.chapter;

        if (!(headline in self.eList))
        {
            self.eList[headline] = [];
        }
        self.eList[headline].push(info);

        if (self.DEBUG)
        {
            console.info("Element Callback for ", headline, info);
        }

        if ((self.dataConfig["displayOnly"] !== undefined) && (self.dataConfig["displayOnly"] === headline))
        {
            if (self.DEBUG)
            {
                console.info("Display Only Mode: Match found for", element);
            }

            window.setTimeout(function ()
            {
                element.show();
            }, 100);

            self.hidden -= 1;
        }
        else if (self.dataConfig["displayOnly"] !== undefined)
        {
            // Hide this Element because the Only Mode do not match

            if (self.DEBUG)
            {
                console.log("Hide Element because of 'displayOnly' ", info);
            }

            self.hidden_elements[info.url] = "displayOnly";

            element.hide();
            self.hidden += 1;
        }


        if (!config.display)
        {
            if (self.DEBUG)
            {
                console.log("Hide Element because of Filter '" + headline + "'", info);
            }

            self.hidden_elements[info.url] = "Filter '" + headline + "'";

            element.hide();
            element.addClass('hidden');
            self.updateListColor();
            self.hidden += 1;
        } else
        {
            if (config.background != null)
            {
                element.css('background-image', 'url(' + config.background + ')')
                    .css('background-repeat', 'no-repeat')
                    .css('background-position', 'right');
            }

            if (config.mark_chapter)
            {
                element.find('a').first().after(
                    $("<span class=\"parser-msg\"> <b>[" + headline + "-" + found_where + "]</b></span>")
                        .attr("title", info.sentence)
                    );
            }

            if (!config.ignoreColor && config.text_color != null)
            {
                textEl.css('color', config.text_color);
            }

            var color: string;
            var colorMo: string;

            $.each(config.keywords, function (key, keyword)
            {
                var el = element.find('div').first();
                var reg = new RegExp(keyword, "i");
                var text = el.html();

                var erg = reg.exec(text);
                var front = '';
                var replace = '';
                var behind = '';

                var color = config.color;
                var colorMo = config.mouseOver;


                if (erg != null)
                {
                    if (erg.length === 1)
                    {
                        replace = keyword;
                    } else if (erg.length === 2)
                    {
                        front = erg[1];
                    } else if (erg.length === 3)
                    {
                        front = erg[1];
                        replace = erg[2];
                    } else
                    {
                        front = erg[1];
                        replace = erg[2];
                        behind = erg[3];
                    }

                    replace = front + '<span class="ffnet-story-highlighter" style="color:black; font-weight:bold">' + replace + '</span>' + behind;

                    text = text.replace(new RegExp(keyword, "i"), replace);
                }

                el.html(text);

            });

            if (!config.ignoreColor)
            {
                /*if (_DEBUG)
                {
                    console.log("[ElementCallback] Change Color of Line: ",element); 
                }*/

                self.updateColor(element, color, colorMo);
            }

        }

        self.updateList();
    }

    /**
    *   Updates the List of found elements
    */
    private updateList()
    {
        // Wrap Content:
        this.createPageWrapper();


        var text = "";

        if (this.DEBUG)
        {
            console.log("Headline-List = ", this.eList);
        }

        var headlineContainer = $("<div></div>");

        var self = this;

        $.each(this.eList, function (headline, elements)
        {
            if (self.config.marker[headline].print_story)
            {
                headlineContainer.append("<u>" + headline + ": </u>");

                var eUl = $("<ul></ul>");

                $.each(elements, function (i, value)
                {
                    eUl.append(
                        $("<li></li>").append(
                            $("<a></a>").attr('href', value.url).html(value.name)
                            ).append(" - " + value.chapter)
                            .attr("title", value.sentence)
                        );
                });

                headlineContainer.append(eUl);
            }

            if (self.config.marker[headline].mention_in_headline)
            {
                text += "<b>" + headline + ":</b> " + self.eList[headline].length + " ";
            }

        });

        $('#mrhOutput').remove();

        var hiddenByStoryConfig = $('div[data-hiddenBy="storyConfig"]');

        if (hiddenByStoryConfig.length > 0)
        {
            text += "<i>Hidden by StoryConfig</i>: " + hiddenByStoryConfig.length + " ";
        }

        var list = $('<div id=\'mrhOutput\'></div>')
            .html(text + ' <i>All hidden elements:</i> ').append(
            $("<u></u>").text(self.hidden).click(
                function (e)
                {
                    // Build Dialog
                    var dialog = $('<div title="Hidden Elements"></div>');
                    var table = $("<table></table>").appendTo(dialog);

                    $.each(self.hidden_elements, function (key, value)
                    {
                        table.append(
                            $("<tr></tr>").append(
                                $("<th></th>").append(
                                    $("<a></a>").text(self.getStoryName(key))
                                        .attr("href", key)
                                    )
                                )
                                .append
                                (
                                $('<td style="padding-left: 15px"></td>').text(value)
                                )
                            );

                    });


                    // Show Dialog:
                    dialog.dialog(
                        {
                            width: 668
                        });

                    e.preventDefault();
                }

                )
                .attr("title", "Show the reasons for hiding")
                .addClass("clickable")
            )
            .css('margin-bottom', '10px')
            .append(headlineContainer);

        if (hiddenByStoryConfig.length > 0)
        {
            list.append($('<a href="#">Show Elements hidden by Story Config</a>').click(function (e)
            {
                hiddenByStoryConfig.slideDown();
                e.preventDefault();
            }));
        }

        $(".ffNetPageWrapper").first().before(list);
    }

    /**
    *   Updates the colors of the elements in the story list
    */
    private updateListColor()
    {
        var odd = false;
        var self = this;

        this.element.not('.hidden').each(function (k, e)
        {
            var el = $(e);
            var link = el.find('a').first().attr('href');
            var storyName = self.getStoryName(link);
            var color = self.config.color_normal;
            var colorMo = self.config.color_mouse_over;

            if (el.is('.hidden'))
            {
                return;
            }

            if (odd)
            {
                color = self.config.color_odd_color;
                odd = false;
            } else
            {
                odd = true;
            }

            if (!el.is('[data-color]'))
            {
                self.updateColor(el, color, colorMo, true);
            }

            /*
            if (_found.indexOf(storyName) == -1)
            {
                //
                
                /*if (_DEBUG)
                {
                    console.log("[UpdateList] Change Color of Line: ",el); 
                }* /
                
            }
            */
        });


    }

    /**
    *   Updates the Color of a specifiy Element in the list
    *   @param element HTML-Instance of found element
    *   @param color The Color to set the Element to
    *   @param colorMo The color used for the Mouse Over effect
    *   @param notSetAttr Don't set the HTML-Attribute
    */
    private updateColor(element, color, colorMo, notSetAttr?)
    {
        element.css('background-color', color);

        if (notSetAttr === undefined)
        {
            element.attr("data-color", color);
            element.attr("data-mouseOverColor", colorMo);
        }

        element.unbind("mouseenter").unbind("mouseleave");

        element.mouseenter(function ()
        {
            $(this).css('background-color', colorMo);
        }).mouseleave(function ()
            {
                $(this).css('background-color', color);
            });
    }


    /**
    *   Enables the In Story Highlighter (Story View)
    */
    public enableInStoryHighlighter()
    {
        if (this.LOAD_INTERNAL)
        {
            return;
        }

        if (this.DEBUG)
        {
            console.log("Enable In Story Highlighter");
        }

        var body = $("body");
        var field = body.find('#gui_table1i').first().find("b").first();

        var contextMenu = $("<div></div>")
            .css("width", "20px")
            .css("height", "20px")
            .css("float", "right")
            .addClass("parser-msg")
            .append(
            $("<img></img>")
                .attr("src", "http://private.mrh-development.de/ff/edit.gif")
                .css("width", "100%")
                .css("height", "100%")
            );

        var self = this;

        // Open GUI
        contextMenu.click(function ()
        {

            self.toggleStoryConfig({
                url: document.location.pathname,
                //element: element,
                name: field.text()
            });

        });

        field.after(contextMenu);

        // Highlighter found:
        if (this.config['highlighter'][document.location.pathname] !== undefined)
        {
            if (this.DEBUG)
            {
                console.info("Highlight Element Found");
            }

            // Update old Format
            if (typeof (this.config['highlighter'][document.location.pathname]) !== "object")
            {
                if (this.DEBUG)
                {
                    console.log("Updated old Highlighter Object");
                }

                this.config['highlighter'][document.location.pathname] = { image: this.config['highlighter'][document.location.pathname], hide: false };
            }

            var img = $("<img></img>").attr("src", this.config['highlighter'][document.location.pathname].image)
                .css("width", "20px")
                .css("height", "20px")
                .css("margin-left", "15px")
                .addClass("parser-msg");

            field.after(img);

        }



    }

    /**
    *   Enables the Pocket Save Feature (Story View)
    */
    public enablePocketSave()
    {
        if (this.LOAD_INTERNAL)
        {
            return;
        }

        var user = this.config['pocket_user'];
        var password = this.config['pocket_password'];

        var body = $("body");

        if ((user == null) || (password == null))
        {
            console.log("Disables Pocket Save Function");
            return;
        }

        var field = body.find("#profile_top").find("b");


        var options = {
            'all': "From this chapter to the End",
            '1': "One Chapter",
            '2': "Two Chapters",
            '5': "Five Chapters",
            '10': "Ten Chapters"
        };

        var select = $("<select></select>")
            .css("margin-left", "20px")
            .change(function ()
            {
                $("#ffnet-pocket-save-button").removeAttr("disabled")
                    .html("Save To Pocket");

            });

        $.each(options, function (key, value)
        {
            select.append(
                $("<option></option>")
                    .text(value)
                    .attr("value", key)
                );

        });

        var self = this;

        field.after(
            $('<button class="btn">Save To Pocket</button>')
                .click(function ()
                {
                    var option = select.children().filter(":selected").first().attr("value");

                    self.log("Selected Option: ", option);


                    self.parsePocket(document.location.pathname, field.text() + ": ", option);

                }).css("margin-left", "10px")
                .attr("id", "ffnet-pocket-save-button")
            );



        field.after(select);

    }

    /**
    *   Recursive Function for Pocket Saving
    *   @param url Url of first story
    *   @param prefix Prefix used for the story
    *   @param length The max length for the recusion
    *   @param currentDepth The current depth of the recusion
    *   @remark Leave the Arguments length and currentDepth away, to achive default behavior
    */
    private parsePocket(url, prefix, length, currentDepth = 1)
    {
        if (prefix === undefined)
        {
            prefix = "";
        }

        if ((length === undefined) || (length === "all"))
        {
            length = 100;
        }


        var user = this.config['pocket_user'];
        var password = this.config['pocket_password'];


        if ((user == null) || (password == null))
        {
            return;
        }

        $("#ffnet-pocket-save-button").attr("disabled", "disabled").html("Working ...");

        var self = this;

        var ajax_callback = function (text)
        {
            var body = $(text);

            //var title = prefix + $(body.find('#chap_select')).first().children().filter('[selected="selected"]').html();

            var title = body.find("title").first().text();

            $("body").append(
                $("<img>").attr("src", 'https://readitlaterlist.com/v2/add?username=' + user + '&password=' + password + '&apikey=emIpiQ7cA6fR4u6dr7ga2aXC11dcD58a&url=https://www.fanfiction.net' + url + '&title=' + title)
                );

            console.log(url + ' - ' + title + ' - Done');

            var next = body.find('button:contains(Next)').first();


            if ((next.length !== 0) && (currentDepth + 1 <= length))
            {
                var data = url = self.getUrlFromButton(next);

                if (data != null)
                {
                    setTimeout(function ()
                    {
                        self.parsePocket(data, prefix, length, currentDepth + 1);
                    }, 500);
                }

            } else
            {
                $("#ffnet-pocket-save-button").attr("disabled", "disabled")
                    .html("Save done!");
            }

        };

        $.ajax({
            url: url,
            success: ajax_callback
        });

    }

    // ------- Endless Mode ------

    private currentPage = null;

    private getPageContent(base, prev, callback)
    {
        var url = null;
        if (prev)
        {
            url = this.getPrevPage(base);
        }
        else
        {
            url = this.getNextPage(base);
        }


        if (this.DEBUG)
        {
            console.log("Requesting next page: ", url);
        }

        var self = this;

        $.get(url, function (content)
        {

            var data = $(content);

            var elements = data.find(".z-list");

            if (self.DEBUG)
            {
                console.log("Elements Found: ", elements);
            }

            callback(elements, data);

        });


    }

    private createWrapper(page)
    {
        return $("<div></div>").addClass("ffNetPageWrapper")
            .attr("data-page", page);
    }

    private createPageWrapper()
    {
        // Wrap the current Page into a PageWrapper
        var currentPage = this.getCurrentPage($("body"));

        if (this.DEBUG)
        {
            console.log("Current Page: ", currentPage);
        }

        var wrapper = $(".ffNetPageWrapper");
        if (wrapper.length === 0)
        {
            wrapper = this.createWrapper(currentPage);
        }

        var notWrapped = $('.z-list[data-wrapped!="wrapped"]');

        if (this.inUsersPage)
        {
            notWrapped = notWrapped.filter("#st_inside > .z-list");
        }

        if (notWrapped.length !== 0)
        {
            if (this.DEBUG)
            {
                console.log("Not Wrapped Elements found");
            }


            notWrapped.last().after(wrapper);

            notWrapped.detach().appendTo(wrapper)
                .attr("data-wrapped", "wrapped")
                .attr("data-page", currentPage);
        }
    }


    private loadPage(loadPrev = false)
    {
        var base = null;

        if (this.currentPage == null)
        {
            base = $("#myform");
        }
        else
        {
            base = this.currentPage.find("#myform").first();
        }



        // Wrapper moved to _createPageWrapper
        var self = this;

        this.getPageContent(base, loadPrev, function (elements, data)
        {
            // Add elements to DOM:
            if (elements.length > 0)
            {
                var last = $(".ffNetPageWrapper").last();

                var page = self.getCurrentPage(data);
                var wrapper = self.createWrapper(page);

                last.after(wrapper);

                self.element = elements;

                elements.appendTo(wrapper);

                window.setTimeout(function ()
                {
                    self.readList(wrapper.children());

                }, 200);

                $("#myform").find("center").html(data.find("#myform").find("center").last().html());

                // Hide last Page: 
                last.slideUp();


                self.currentPage = data;
            }

        });
    }

    private getCurrentPage(content)
    {
        return content.find("center > b").first().text();
    }


    private loadNextPage()
    {
        this.loadPage(false);
    }

    private loadPrevPage()
    {
        this.loadPage(true);
    }

    private getNextPage(base)
    {
        var container = base.find("center").last();

        var current = container.find("b").first();
        var next = current.next("a");

        if (next.length > 0)
        {
            return next.attr("href");
        }

        return null;
    }

    private getPrevPage(base)
    {
        var container = base.find("center").last();

        var current = container.find("b").first();
        var prev = current.prev("a");

        if (prev.length > 0)
        {
            return prev.attr("href");
        }

        return null;
    }



    // --------- GUI -------------

    private settings_elements = {};
    private gui_elements = {};
    private add_count = 0;

    /*
    *   Creates the GUI used for the Menus
    */
    private gui_create()
    {
        this.log("Creating GUI ");

        var width = 600;
        var win_width = window.outerWidth;

        var container = $('<div title="Fanfiction Story Parser"></div>')
        //.addClass("ffnet_guiContainer")
        //.css('left', ((win_width - width) / 2) + "px")
            .hide();

        //TODO: Check what this was for ...
        //container.html($('#content').hide().html());

        $("body").append(container);

        this.gui_container = container;

        this.log("GUI Created");

    }

    /**
    *   Renders GUI for the Config-Menu
    */
    private gui_update()
    {
        this.log("Update GUI");

        this.gui_elements = {};
        this.settings_elements = {};
        this.gui_container.html('');

        // Reset Position:
        //_gui_container.css("position", "absolute");

        this.add_count = 0;

        // Displays current Version:
        this.gui_container.attr("title", "Fanfiction Story Parser - Version: " + this.VERSION + " - Branch: " + this.BRANCH);


        // render Settings Container:
        var s_container = $("<div></div>")
            .addClass("ffnet_settingsContainer")

            .appendTo(this.gui_container);

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
        var __buttonLogic = function ()
        {
            var target = $(this).attr("data-target");

            $(".ffnet_Config_Button_Container").fadeOut(400, function ()
            {
                $("." + target).fadeIn();
            });

        };

        var __backLogic = function ()
        {
            $(".ffnet_Config_Category:visible").fadeOut(400, function ()
            {
                $(".ffnet_Config_Button_Container").fadeIn();
            });
        };

        // Render SubLogic:

        var __getButton = function (name, target, container)
        {
            return $("<div></div>").addClass("ffnet_Config_Button").text(name)
                .attr("data-target", target).click(__buttonLogic).appendTo(container);
        };

        var __getCategory = function (name, id, container)
        {
            var cat = $("<div></div>").addClass("ffnet_Config_Category").addClass(id).appendTo(container);
            var headline = $("<div></div>").addClass("headline").appendTo(cat);
            var backField = $("<div></div>").addClass("back").appendTo(headline);
            var backButton = $('<button class="btn">Back</back>').click(__backLogic).appendTo(backField);
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


        var buttonContainer = $('<div class="ffnet_Config_Button_Container"></div>').appendTo(s_container);

        __getButton("Story Settings", "ffnetConfig-Settings", buttonContainer);
        __getButton("Layout Settings", "ffnetConfig-Layout", buttonContainer);
        __getButton("API Settings", "ffnetConfig-API", buttonContainer);
        __getButton("Advanced", "ffnetConfig-Andvanced", buttonContainer);

        // --------------------------------------------------------------------------------------------------------------------------
        var cat = __getCategory("Story Settings", "ffnetConfig-Settings", s_container);
        var table = cat.table;

        // story_search_depth
        this.log("GUI - story_search_depth");

        var input: JQuery = $('<input type="text" id="fflist-story_search_depth">')
            .attr('value', this.config.story_search_depth)
            .attr('size', '50');

        this.settings_elements['story_search_depth'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-story_search_depth">Max Search depth: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                    )
                )
            );

        // spacer:
        table.append(spacer.clone());

        // mark_M_storys:
        this.log("GUI - mark_M_storys");

        var checkbox = $('<input type="checkbox" id="fflist-mark_M_storys">');
        if (this.config.mark_M_storys)
        {
            checkbox.attr('checked', 'checked');
        }

        this.settings_elements['mark_M_storys'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-mark_M_storys">Mark "M" rated Storys: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );


        // spacer:
        table.append(spacer.clone());


        // hide_non_english_storys:
        this.log("GUI - hide_non_english_storys");

        checkbox = $('<input type="checkbox" id="fflist-hide_non_english_storys">');
        if (this.config.hide_non_english_storys)
        {
            checkbox.attr('checked', 'checked');
        }

        this.settings_elements['hide_non_english_storys'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-hide_non_english_storys">Hide non English Storys: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );

        // spacer:
        table.append(spacer.clone());

        // allow_copy
        this.log("GUI - allow_copy");

        checkbox = $('<input type="checkbox" id="fflist-allow_copy">');
        if (this.config.allow_copy)
        {
            checkbox.attr('checked', 'checked');
        }

        this.settings_elements['allow_copy'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-allow_copy">Allow the selection of Text: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );

        cat.category.append(saveButtonContainer.clone());

        // --------------------------------------------------------------------------------------------------------------------------
        cat = __getCategory("Layout Settings", "ffnetConfig-Layout", s_container);
        table = cat.table;


        // hide_images:
        this.log("GUI - hide_images");

        checkbox = $('<input type="checkbox" id="fflist-hide_images">');
        if (this.config.hide_images)
        {
            checkbox.attr('checked', 'checked');
        }

        this.settings_elements['hide_images'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-hide_images">Hide Story Images: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );

        // spacer:
        table.append(spacer.clone());

        // hide_lazy_images:
        this.log("GUI - hide_lazy_images");

        checkbox = $('<input type="checkbox" id="fflist-hide_lazy_images">');
        if (this.config.hide_lazy_images)
        {
            checkbox.attr('checked', 'checked');
        }

        this.settings_elements['hide_lazy_images'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-hide_lazy_images">Hide <abbr title="Images that are loaded after the first run. Mostly Story Images, not User Images">lazy</abbr> images: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );


        // spacer:
        table.append(spacer.clone());

        // disable_image_hover:
        this.log("GUI - disable_image_hover");

        checkbox = $('<input type="checkbox" id="fflist-disable_image_hover">');
        if (this.config.disable_image_hover)
        {
            checkbox.attr('checked', 'checked');
        }

        this.settings_elements['disable_image_hover'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-disable_image_hover">Disable Image Hover Effect: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );


        // spacer:
        table.append(spacer.clone());


        // content_width
        this.log("GUI - content_width");

        input = $('<input type="text" id="fflist-content_width">')
            .attr('value', this.config.content_width)
            .attr('size', '50');

        this.settings_elements['content_width'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-content_width">Content Width: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                    )
                )
            );

        // spacer:
        table.append(spacer.clone());


        // color_normal
        this.log("GUI - color_normal");

        input = $('<input type="text" id="fflist-color_normal">')
            .attr('value', this.config.color_normal)
            .attr('size', '50')
            .colorpicker({
                colorFormat: "#HEX"
            });

        this.settings_elements['color_normal'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-color_normal">Normal Background-Color: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                    )
                )
            );

        // spacer:
        table.append(spacer.clone());

        // spacer:
        table.append(spacer.clone());

        // color_mouse_over
        this.log("GUI - color_mouse_over");

        input = $('<input type="text" id="fflist-color_mouse_over">')
            .attr('value', this.config.color_mouse_over)
            .attr('size', '50')
            .colorpicker({
                colorFormat: "#HEX"
            });

        this.settings_elements['color_mouse_over'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-color_mouse_over">MouseOver Background-Color: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                    )
                )
            );

        // spacer:
        table.append(spacer.clone());

        // color_odd_color
        this.log("GUI - color_odd_color");

        input = $('<input type="text" id="fflist-color_odd_color">')
            .attr('value', this.config.color_odd_color)
            .attr('size', '50')
            .colorpicker({
                colorFormat: "#HEX"
            });

        this.settings_elements['color_odd_color'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-color_odd_color">Odd Background-Color: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                    )
                )
            );


        cat.category.append(saveButtonContainer.clone());

        // --------------------------------------------------------------------------------------------------------------------------
        cat = __getCategory("API Settings", "ffnetConfig-API", s_container);
        table = cat.table;


        // Pocket ---
        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append("--------")
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    " ---- <a href=\"http://www.getpocket.com\">Pocket</a> Settings ----"
                    )
                )
            );

        // spacer:
        table.append(spacer.clone());

        // pocket_user
        this.log("GUI - pocket_user");

        input = $('<input type="text" id="fflist-pocket_user">')
            .attr('value', this.config.pocket_user)
            .attr('size', '50');

        this.settings_elements['pocket_user'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-pocket_user">Username: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                    )
                )
            );


        // spacer:
        table.append(spacer.clone());

        // pocket_password
        this.log("GUI - pocket_password");

        input = $('<input type="password" id="fflist-pocket_password">')
            .attr('value', this.config.pocket_password)
            .attr('size', '50');

        this.settings_elements['pocket_password'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-pocket_password">Password: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                    )
                )
            );


        // spacer:
        table.append(spacer.clone());

        // API ---
        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append("--------")
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    " ---- API Settings ----"
                    )
                )
            );

        // spacer:
        table.append(spacer.clone());

        if (this.DEBUG)
        {

            // api_url
            this.log("GUI - api_url");

            input = $('<input type="text" id="fflist-api_url">')
                .attr('value', this.config.api_url);

            this.settings_elements['api_url'] = input;

            table.append(
                $('<tr></tr>').append(
                    $('<td width="30%"></td>').append(
                        $('<label for="fflist-api_url">Server Backend Address: </label>')
                            .css('font-weight', 'bold')
                        )
                        .css('border-right', '1px solid gray')
                    ).append(
                    $('<td class="ffnetparser_InputField"></td>').append(
                        input
                        ).append(
                        $("<button>Default</button>").click(function ()
                        {
                            $('#fflist-api_url').val("http://www.mrh-development.de/FanFictionUserScript");
                        })
                        ).append(
                        $("<button>Local</button>").click(function ()
                        {
                            $('#fflist-api_url').val("http://localhost:49990/FanFictionUserScript");
                        })
                        )
                    )
                );

            // spacer:
            table.append(spacer.clone());
        }

        // api_checkForUpdates
        this.log("GUI - api_checkForUpdates");

        checkbox = $('<input type="checkbox" id="fflist-api_checkForUpdates">');
        if (this.config.api_checkForUpdates)
        {
            checkbox.attr('checked', 'checked');
        }
        else
        {
            $("#api_autoIncludeNewVersion").attr("disabled", "disabled");
        }


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

        this.settings_elements['api_checkForUpdates'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-api_checkForUpdates">Check for Updates: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );


        // spacer:
        table.append(spacer.clone());

        // api_autoIncludeNewVersion
        this.log("GUI - api_autoIncludeNewVersion");

        checkbox = $('<input type="checkbox" id="fflist-api_autoIncludeNewVersion">');
        if (this.config.api_autoIncludeNewVersion)
        {
            checkbox.attr('checked', 'checked');
        }

        this.settings_elements['api_autoIncludeNewVersion'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-api_autoIncludeNewVersion">Auto Update: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );


        // spacer:
        table.append(spacer.clone());

        // token
        this.log("GUI - token");

        input = $('<input type="text" id="fflist-token">')
            .attr('value', this.config.token)
            .attr('size', '50')
            .attr("pattern", "[0-9a-zA-Z]+");

        this.settings_elements['token'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-token"><abbr title="Used for identification on the Web-Service (e.g. Synchronization)">Token</abbr>: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                    )
                )
            );


        cat.category.append(saveButtonContainer.clone());

        // --------------------------------------------------------------------------------------------------------------------------
        cat = __getCategory("Advanced", "ffnetConfig-Andvanced", s_container);
        table = cat.table;


        // disable_highlighter
        this.log("GUI - disable_highlighter");

        checkbox = $('<input type="checkbox" id="fflist-disable_highlighter">');
        if (this.config.disable_highlighter)
        {
            checkbox.attr('checked', 'checked');
        }

        this.settings_elements['disable_highlighter'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-disable_highlighter"><abbr title="Disable the Story Highlighter Feature.">Disable Highlighter</abbr>: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );


        // spacer:
        table.append(spacer.clone());


        // disable_cache
        this.log("GUI - disable_cache");

        checkbox = $('<input type="checkbox" id="fflist-disable_cache">');
        if (this.config.disable_cache)
        {
            checkbox.attr('checked', 'checked');
        }

        this.settings_elements['disable_cache'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-disable_cache"><abbr title="Disable the Caching function used for the in Story search.">Disable Cache</abbr>: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );


        // spacer:
        table.append(spacer.clone());


        // disable_sync
        this.log("GUI - disable_sync");

        checkbox = $('<input type="checkbox" id="fflist-disable_sync">');
        if (this.config.disable_sync)
        {
            checkbox.attr('checked', 'checked');
        }

        this.settings_elements['disable_sync'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-disable_sync">Disable Synchronization Feature: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );


        cat.category.append(saveButtonContainer.clone());

        // --------------------------------------------------------------------------------------------------------------------------

        this.log("GUI - Add Markers: ", this.config.marker);

        var container = $("<div></div>").appendTo(this.gui_container);

        var self = this;

        $.each(this.config.marker, function (name, marker)
        {
            self.gui_add_form(name, marker, container);
        });

        this.log("GUI - Markers added");

        if (this.DEBUG)
        {
            console.log("Config elements: ", this.gui_elements);
        }


        var filterButtonContainer = saveButtonContainer.clone();
        filterButtonContainer.appendTo(this.gui_container);

        $('<input class="btn" type="button" value="Add Field"></input>')
            .button({
                icons: {
                    primary: "ui-icon-plusthick"
                }
            })
            .click(function ()
            {
                self.gui_add_form('New-Form ' + (self.add_count++),
                    {
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
                        revision: -1
                    }, container
                    , true // Display Big
                    );

            }).appendTo(filterButtonContainer);


        // Save Logic
        $(".ffnetSaveButton").click(function ()
        {
            var new_config = {};

            self.log("Save Config");
            self.log("Parsing Config elements: ", self.gui_elements);


            $.each(self.gui_elements, function (k, data)
            {
                if (data === undefined)
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
                        background: (name in self.config.marker && self.config.marker[name].background != null) ? (self.config.marker[name].background) : null,
                        text_color: data.text_color.val(),
                        revision: ((self.config.marker[name] === undefined) || (self.config.marker[name].revision === undefined)) ? 0 : self.config.marker[name].revision + 1
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
                new_config[name] = config;

            });

            self.config.story_search_depth = Number(self.settings_elements['story_search_depth'].val());
            self.config.mark_M_storys = self.settings_elements['mark_M_storys'].is(':checked');
            self.config.hide_non_english_storys = self.settings_elements['hide_non_english_storys'].is(':checked');
            self.config.hide_images = self.settings_elements['hide_images'].is(':checked');
            self.config.hide_lazy_images = self.settings_elements['hide_lazy_images'].is(':checked');
            self.config.disable_image_hover = self.settings_elements['disable_image_hover'].is(':checked');
            self.config.allow_copy = self.settings_elements['allow_copy'].is(':checked');
            self.config.disable_highlighter = self.settings_elements['disable_highlighter'].is(':checked');
            self.config.disable_cache = self.settings_elements['disable_cache'].is(':checked');
            self.config.disable_sync = self.settings_elements['disable_sync'].is(':checked');
            self.config.content_width = self.settings_elements['content_width'].val();
            self.config.color_normal = self.settings_elements['color_normal'].val();
            self.config.color_odd_color = self.settings_elements['color_odd_color'].val();
            self.config.color_mouse_over = self.settings_elements['color_mouse_over'].val();
            self.config.pocket_user = self.settings_elements['pocket_user'].val();
            self.config.pocket_password = self.settings_elements['pocket_password'].val();
            self.config.api_checkForUpdates = self.settings_elements['api_checkForUpdates'].is(':checked');
            self.config.api_autoIncludeNewVersion = self.settings_elements['api_autoIncludeNewVersion'].is(':checked');
            self.config.token = self.settings_elements['token'].val();

            if (self.DEBUG)
            {
                self.config.api_url = self.settings_elements['api_url'].val();
            }


            self.config.marker = new_config;

            self.save_config();

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
    private gui_add_form(name, marker, mainContainer, displayBig = false)
    {
        this.log("GUI Add Form: ", name);

        this.gui_elements[name] = {};

        var radius = 10;

        var height = 35;

        if (displayBig)
        {
            height = 580;
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
                    /*
                    // Get the element, for the scrolling
                    parent = container.offsetParent();
                    var offset = container.offset().top - 10;

                    _log("Current ScrollTop: ", parent.scrollTop());
                    parent.scrollTop(parent.scrollTop() + offset);
                    _log("Scroll Offset: ", offset);
                    */

                    container.css('height', '580px');
                    container.css("cursor", "auto");
                    container.removeAttr("title")
                        .unbind();

                });

        }


        var table = $('<table width="100%"></table>').appendTo(container);

        var spacer = $('<tr></tr>').append
            (
            $('<td width="30%" style="height:10px"></td>')
                .css('border-right', '1px solid gray')
            ).append(
            $('<td></td>')
            );

        // Name
        var input = $('<input type="text" id="fflist-' + name + '-name">')
            .attr('value', name)
            .attr('size', '50');

        this.gui_elements[name]['name'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-' + name + '-name">Name: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                    )
                )
            );

        // spacer:
        table.append(spacer.clone());



        // Display:
        var checkbox = $('<input type="checkbox" id="fflist-' + name + '-display">');
        if (marker.display)
        {
            checkbox.attr('checked', 'checked');
        }

        this.gui_elements[name]['display'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-' + name + '-display">Display Found Entries: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );

        // spacer:
        table.append(spacer.clone());

        // Keywords:
        input = $('<input type="text" id="fflist-' + name + '-keywords">')
            .attr('value', marker.keywords.join(', '))
            .attr('size', '50');

        this.gui_elements[name]['keywords'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-' + name + '-keywords">Keywords: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                    ).append(
                    '<br><span style="font-size: small;">Seperated with ", "</span>'
                    )

                )
            );


        // spacer:
        table.append(spacer.clone());

        // Ignore:
        input = $('<input type="text" id="fflist-' + name + '-ignore">')
            .attr('value', marker.ignore.join(', '))
            .attr('size', '50');

        this.gui_elements[name]['ignore'] = input;

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-' + name + '-ignore">Ignore when: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                    ).append(
                    '<br><span style="font-size: small;">Seperated with ", "</span>'
                    )

                )
            );

        // spacer:
        table.append(spacer.clone());

        // Ignore Color:
        checkbox = $('<input type="checkbox" id="fflist-' + name + '-ignoreColor">');
        if (marker.ignoreColor)
        {
            checkbox.attr('checked', 'checked');
        }

        checkbox.change(function ()
        {
            if ($('#fflist-' + name + '-ignoreColor').is(":checked"))
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


        });

        this.gui_elements[name]['ignoreColor'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-' + name + '-ignoreColor">Ignore Color Settings: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );



        // spacer:
        table.append(spacer.clone());

        // Color:
        input = $('<input type="text" id="fflist-' + name + '-color">')
            .attr('value', marker.color)
            .attr('size', '50')
            .colorpicker({
                colorFormat: "#HEX"
            });

        this.gui_elements[name]['color'] = input;

        if (marker.ignoreColor)
        {
            input.attr('disabled', 'disabled');
        }

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-' + name + '-color">Color: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                    )

                )
            );

        // spacer:
        table.append(spacer.clone());

        // MouseOver:
        input = $('<input type="text" id="fflist-' + name + '-mouseOver">')
            .attr('value', marker.mouseOver)
            .attr('size', '50')
            .colorpicker({
                colorFormat: "#HEX"
            });

        this.gui_elements[name]['mouseOver'] = input;

        if (marker.ignoreColor)
        {
            input.attr('disabled', 'disabled');
        }

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-' + name + '-mouseOver">Mouse Over Color: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                    )

                )
            );

        // spacer:
        table.append(spacer.clone());

        //  text_color:
        input = $('<input type="text" id="fflist-' + name + '-text_color">')
            .attr('value', marker.text_color)
            .attr('size', '50')
            .colorpicker({
                colorFormat: "#HEX"
            });

        this.gui_elements[name]['text_color'] = input;

        if (marker.ignoreColor)
        {
            input.attr('disabled', 'disabled');
        }

        table.append(
            $('<tr></tr>').append(
                $('<td width="30%"></td>').append(
                    $('<label for="fflist-' + name + '-text_color">Info Text Color: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    input
                    )

                )
            );

        // spacer:
        table.append(spacer.clone());

        // search_story:
        checkbox = $('<input type="checkbox" id="fflist-' + name + '-search_story">');
        if (marker.search_story)
        {
            checkbox.attr('checked', 'checked');
        }

        this.gui_elements[name]['search_story'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-' + name + '-search_story">Search in Storys: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );


        // spacer:
        table.append(spacer.clone());

        // mark_chapter:
        checkbox = $('<input type="checkbox" id="fflist-' + name + '-mark_chapter">');
        if (marker.mark_chapter)
        {
            checkbox.attr('checked', 'checked');
        }

        this.gui_elements[name]['mark_chapter'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-' + name + '-mark_chapter">Mark Chaper: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );


        // spacer:
        table.append(spacer.clone());

        // print_story:
        checkbox = $('<input type="checkbox" id="fflist-' + name + '-print_story">');
        if (marker.print_story)
        {
            checkbox.attr('checked', 'checked');
        }

        this.gui_elements[name]['print_story'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-' + name + '-print_story">List Storys: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );

        // spacer:
        table.append(spacer.clone());

        // mention_in_headline:
        checkbox = $('<input type="checkbox" id="fflist-' + name + '-mention_in_headline">');
        if (marker.mention_in_headline)
        {
            checkbox.attr('checked', 'checked');
        }

        this.gui_elements[name]['mention_in_headline'] = checkbox;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>').append(
                    $('<label for="fflist-' + name + '-mention_in_headline">Mention in Headline: </label>')
                        .css('font-weight', 'bold')
                    )
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td class="ffnetparser_InputField"></td>').append(
                    checkbox
                    )
                )
            );

        // spacer:
        table.append(spacer.clone());

        var self = this;

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>')
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td></td>').append(
                    $('<input class="btn" type="button" value="Remove">').click(function ()
                    {
                        self.gui_elements[name] = undefined;

                        container.fadeOut(function ()
                        {
                            container.remove();
                        });

                    })
                    )
                )
            );


        //Spacer:
        table.append(spacer.clone());

        table.append(
            $('<tr></tr>').append(
                $('<td width="10%"></td>')
                    .css('border-right', '1px solid gray')
                ).append(
                $('<td></td>').append(
                    $('<img src="http://private.mrh-development.de/ff/glyphicons_369_collapse_top.png" alt="Minimize"></img>').click(function ()
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
                                container.css('height', '550px');
                                container.css("cursor", "auto");
                                container.removeAttr("title");

                            });

                        }, 100);
                    })
                        .css("cursor", "pointer")
                    )
                )
            );





        container.fadeIn();

        this.log("Form added");
    }

    /**
    *   Hides the GUI
    */
    private gui_hide()
    {
        this.gui_container.dialog("close");
        //_gui_container.fadeOut();
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

                    self.defaultConfig();
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

        this.gui_container.dialog({
            resizable: true,
            modal: true,
            height: 900,
            width: 664,
            buttons: buttons
        });


        // _gui_container.fadeIn();
    }

    /**
    *   Creates and displays the GUI
    */
    private gui()
    {
        if (this.gui_container == null)
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
        if (this.gui_container == null)
        {
            this.gui_create();
        }

        var self = this;

        if (this.gui_container.is(':visible'))
        {
            // Currently Visible, reopen
            this.gui_hide();

            this.openSaveConfig();

        } else
        {
            this.gui_container.html('');

            /*
            $('<div style="width:100%; text-align:right; margin-bottom: 5px"></div>').append(
                $('<input class="btn" type="button" value="Close"></input>').click(function ()
                {
                    if (confirm("All unsaved changes will be deleted!"))
                    {
                        _gui_hide();
                    }

                })
            ).appendTo(_gui_container);
            */

            this.gui_container.append('<label for="ffnet-config-display">Your current Config:</label><br/>');

            var old = $('<textarea id="ffnet-config-display" style="width:90%; height: 100px;"></textarea>')
                .val(this.getConfig())
                .appendTo(this.gui_container);


            this.gui_container.append('<br/><label for="ffnet-config-set">Import Config:</label><br/>');

            var neu = $('<textarea id="ffnet-config-set" style="width:90%; height: 100px;"></textarea>')
                .appendTo(this.gui_container);

            this.gui_container.append(
                $('<input class="btn" type="button" value="Set" />')
                    .click(function ()
                    {
                        self.setConfig(neu.val());
                        self.gui_hide();
                        self.read();
                    })
                );

            this.gui_show();
        }

    }

    /**
    *   Open or closes the GUI for the Story Config
    *   @param storyInfo Infos about the story
    */
    private toggleStoryConfig(storyInfo)
    {
        var self = this;

        if (this.gui_container == null)
        {
            if (this.DEBUG)
            {
                console.log("Generate GUI Container");
            }

            this.gui_create();
        }

        if (this.gui_container.is(':visible'))
        {
            if (this.DEBUG)
            {
                console.log("Hide GUI Container");
            }

            this.gui_hide();

        } else
        {
            if (storyInfo === undefined)
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

            this.gui_container.html('');


            // Set Position:
            //_gui_container.css("position", "fixed");

            /*
            $('<div style="width:100%; text-align:right; margin-bottom: 5px"></div>').append(
                $('<input class="btn" type="button" value="Close"></input>').click(function ()
                {
                    if (confirm("All unsaved changes will be deleted!"))
                    {
                        _gui_container.css("position", "absolute");
                        _gui_hide();
                    }

                })
            ).appendTo(_gui_container);
            */

            this.gui_container.append("<p>This Menu allows you to set story specific options for:</p>");
            this.gui_container.append(storyInfo.name);
            this.gui_container.append("<hr />");
            this.gui_container.append("<p>Highlighter Options:</p>");

            this.gui_container.append($('<label for="ffnet-story-highlighter-hide">Hide Story</label>').css("display", "inline-block"));
            var hide = $('<input type="checkbox" id="ffnet-story-highlighter-hide">')
                .css("display", "inline-block").css("margin-left", "15px")
                .appendTo(this.gui_container);

            if ((this.config['highlighter'][storyInfo.url] !== undefined) && (this.config['highlighter'][storyInfo.url].hide))
            {
                hide.attr('checked', 'checked');
            }

            this.gui_container.append("<hr />");

            this.gui_container.append('<label for="ffnet-story-highlighter">Highlighter Path: (leave empty to clear)</label><br/>');
            var highlighter = $('<input id="ffnet-story-highlighter" type="text"></input>')
                .appendTo(this.gui_container)
                .css("width", "500px");

            this.gui_container.append("<p></p>");

            var image_container = $("<div></div>")
                .css("border", "1px solid black")
                .css("padding", "2px")
                .appendTo(this.gui_container);

            var image = $("<img></img>")
                .css("width", "30px")
                .css("height", "30px")
                .css("margin-left", "5px")
                .css("border", "1px solid black")
                .css("display", "inline-block");

            image.clone()
                .attr("src", "http://private.mrh-development.de/ff/none.gif")
                .appendTo(image_container)
                .click(function ()
                {
                    highlighter.val("");
                });

            for (var i = 1; i <= 6; i++)
            {
                image.clone()
                    .attr("src", "http://private.mrh-development.de/ff/" + i + ".gif")
                    .appendTo(image_container)
                    .click(function ()
                    {
                        highlighter.val($(this).attr("src"));
                    });
            }


            if (this.config['highlighter'][storyInfo.url] !== undefined)
            {
                highlighter.val(this.config['highlighter'][storyInfo.url].image);
            }

            this.gui_container.append("<p></p>");



            this.gui_container.append(
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

                        self.save_config();

                        self.gui_container.css("position", "absolute");
                        self.gui_hide();
                        self.read();
                        self.enableInStoryHighlighter();
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

                    self.api_syncFilter(progress);
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
            this.apiMarkMessages();

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

        var input_type = $("<select></select>");
        $.each(types, function (_, type)
        {
            $("<option></option>").text(type)
                .appendTo(input_type);
        });

        var input_title = $('<input type="text" required />');
        var input_message = $('<textarea style="width:90%; height: 100px;" required></textarea>');


        var element = $('<div title="Fanfiction Story Parser"></div>')
            .append(
            $('<p></p>')
                .append($('<span class="" style="float: left; margin: 0 7px 20px 0;"></span>'))
                .append(
                "<b>Feedback:</b><br /><br />"
                )
                .append("<b>Type:</b><br />")
                .append(input_type)

                .append("<br /><b>Title:</b><br />")
                .append(input_title)

                .append("<br /><b>Message:</b><br />")
                .append(input_message)

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
                        Type: input_type.val(),
                        Title: input_title.val(),
                        Message: input_message.val(),
                        Version: self.VERSION,
                        Branch: self.BRANCH
                    };


                    self.apiRequest({ command: "postFeedback", data: JSON.stringify(data) }, function () { });

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


    // ----- API-Interface ------

    /**
    *   Generic API-Request
    *   @param data Request Options
    *   @param callback Function executed after result was found
    */
    private apiRequest(data, callback)
    {
        var url = this.config.api_url;
        var apiLookupKey = this.config.api_lookupKey;
        var timeout = this.config.api_timeout;
        var retrys = this.config.api_retries;

        var self = this;

        if (this.useCORS)
        {
            data.CORS = true;

            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                contentType: "application/json",
                dataType: 'json',
                crossDomain: true,
                data: data,
                cache: false
            })
                .done(function (result)
                {
                    self.log("Got Result from Server: ", result);

                    var data = result.Data[0].Value;

                    callback(data);

                })
                .fail(function (state)
                {
                    console.error("[FFNet-Parser] Error while fetching Result from Server: ", state);
                });

        }
        else
        {
            var messageID = Math.random().toString().split(".")[1];
            data.adress = apiLookupKey + messageID;

            $.ajax({
                type: 'GET',
                url: url,
                async: false,
                contentType: "application/json",
                dataType: 'jsonp',
                data: data,
                cache: false
            });



            var tries = 0;

            var checkFunction = function ()
            {
                if (self.DEBUG)
                {
                    console.log("API_Request - CheckFor Result");
                }

                if (tries >= retrys)
                {
                    if (self.DEBUG)
                    {
                        console.log("API_Request - To many tries, abort for ", data);
                    }

                    return;
                }

                if ((sessionStorage[apiLookupKey + messageID] !== undefined) &&
                    (sessionStorage[apiLookupKey + messageID] !== "null") &&
                    sessionStorage[apiLookupKey + messageID] !== "undefined" &&
                    sessionStorage[apiLookupKey + messageID] !== null &&
                    sessionStorage[apiLookupKey + messageID] !== "")
                {
                    if (self.DEBUG)
                    {
                        //console.log("API_Request - Result found, exec callback - ", sessionStorage[apiLookupKey]);
                    }

                    var result = sessionStorage[apiLookupKey + messageID];

                    // Clear last Result
                    delete sessionStorage[apiLookupKey + messageID];

                    callback(result);

                } else
                {
                    if (self.DEBUG)
                    {
                        console.log("API_Request - No Result found, Retry");
                    }
                    tries++;
                    window.setTimeout(checkFunction, timeout);
                }
            };

            window.setTimeout(checkFunction, timeout);
        }
    }

    /**
    *   Checks the current Version
    */
    private api_checkVersion()
    {
        if ((this.config.api_checkForUpdates))
        {
            var statisticData =
                {
                    Version: this.VERSION,
                    Token: this.config.token,
                    Nested: (sessionStorage["ffnet-mutex"] !== undefined) ? true : false,
                    Branch: this.BRANCH,
                    Page: window.location.href
                };

            if (this.DEBUG)
            {
                console.info("Check for Updates ...");
                console.log("Sending Statistic Data: ", statisticData);
            }

            var requestData = JSON.stringify(statisticData);

            var self = this;

            this.apiRequest({ command: "getVersion", data: requestData }, function (res)
            {
                if (self.DEBUG)
                {
                    console.log("Version Received: ", res);
                }

                var version = JSON.parse(res);

                if (self.DEBUG)
                {
                    console.log("Version Info Recieved: ", version);
                    console.log("Current Version: ", self.VERSION);
                }

                var versionID = self.getVersionId(self.VERSION);
                var removeVersionID = self.getVersionId(version.version);

                if (removeVersionID > versionID)
                {
                    if (!self.config.api_autoIncludeNewVersion)
                    {
                        $(".menulinks").append(" [Notice: There is a newer Version of the Fanfiction.net Story Parser (" + version.version + ")]");
                    }
                    else
                    {
                        self.api_updateScript();
                    }
                }
                else
                {
                    self.log("No new Version found ...");
                }

            });

        }
    }

    /**
    *   Loads the CSS-Styles from the Server
    */
    private api_getStyles()
    {
        var self = this;
        var insertStyles = function (style)
        {
            self.log("Insert Styles ...");

            var cssElement = $('<style id="ffnetParser-CSS" type="text/css"></style>').html(style);

            $("head").append(cssElement);

        };

        if (this.dataConfig["styles"] === undefined)
        {
            this.log("Load Styles from Remote Server ...");

            this.apiRequest({ command: "getStyles", data: this.BRANCH }, function (styles)
            {
                self.dataConfig["styles"] = styles;

                insertStyles(styles);
            });
        }
        else
        {
            insertStyles(this.dataConfig["styles"]);
        }

    }

    /**
    *   Updates the current script to the newest Version
    */
    private api_updateScript()
    {
        if (this.config.api_autoIncludeNewVersion)
        {
            if (this.DEBUG)
            {
                console.log("Loading new Version from Server");
            }

            var self = this;
            this.apiRequest({ command: "getCurrent", data: this.BRANCH }, function (res)
            {
                //console.log("Script: ", res);

                self.saveToMemory(localStorage, "ffnet-Script", { script: res });

                if (self.DEBUG)
                {
                    console.log("New Version Recieved");
                }

            });
        }
    }

    /**
    *   Synchronize - Send Marker Config
    *   @param data Marker Config
    *   @param callback Executed after transfer
    */
    private api_sendMarker(data, callback)
    {
        this.apiRequest({ command: "sendFilter", data: JSON.stringify(data) }, function (result)
        {

            if (typeof (callback) === "function")
            {
                callback(JSON.parse(result));
            }

        });


    }

    /**
    *   Synchronize - Send all markers
    *   @param keys List of all Markers
    *   @param onFinish Callback after the transfer
    *   @param progress Callback after every step
    */
    private api_sendMarkers(keys, onFinish, progress)
    {
        this.log("Send Markers to Server: ", keys);

        var index = 0;

        var self = this;

        var next = function ()
        {
            if (index > keys.length - 1)
            {
                self.log("Upload Finished");
                self.save_config();

                if (typeof (onFinish) === "function")
                {
                    onFinish();
                }

                return;
            }

            progress(index + 1);


            var el = self.config.marker[keys[index]];



            var data = {
                Name: el.name,
                User: self.config.token,
                Display: el.display,
                Keywords: el.keywords.join(", "),
                Ignore: el.ignore.join(", "),
                IgnoreColor: el.ignoreColor,
                Color: el.color,
                MouseOver: el.mouseOver,
                SearchStory: el.search_story,
                MarkChapter: el.mark_chapter,
                PrintStory: el.print_story,
                MentionInHeadline: el.mention_in_headline,
                Background: el.background,
                TextColor: el.text_color,
                Revision: el.revision
            };

            self.log("Upload Element: ", data);

            self.api_sendMarker(data, function (response)
            {
                self.log("Error: ", response.Error);
                self.log("New Revision", response.Revision);

                if (!response.Error)
                {
                    // Save Revision into internal Data-Structure
                    if (keys[index] === undefined)
                    {
                        self.log("Error keys[", index, "] is undefined");
                        self.log("keys : ", keys);
                    }
                    else if (self.config.marker[keys[index]] === undefined)
                    {
                        self.log("Error _config.marker[", keys[index], "] is undefined");
                        self.log("_config.marker : ", self.config.marker);
                    }
                    else
                    {
                        self.config.marker[keys[index]].revision = response.Revision;
                    }
                }
                else
                {
                    console.error("Error while uploading Filter to server: ", response.Message);
                }

                next();
            });


            index++;
        };

        next();
    }

    /**
    *   Synchronize - Get the Versions of the marker on the remote Server
    *   @param callback Callback Function
    */
    private api_getRevisions(callback)
    {
        var self = this;
        this.apiRequest({ command: "getNewestRevisions", data: this.config.token }, function (result)
        {

            if (typeof (callback) === "function")
            {
                callback(JSON.parse(result));
            }

        });


    }

    /**
    *   Synchronize - Checks if all marker are up to date
    *   @param callback Callback after success
    */
    private api_getNeedUpdate(callback)
    {
        this.log("API - Checking for Filter Changes");

        var upload = [];
        var download = [];
        var checked = [];

        var self = this;

        // Get the current saved Revisions:
        this.api_getRevisions(function (revisions)
        {
            self.log("Got Server Revisions: ", revisions);

            $.each(revisions.Revisions, function (key, el)
            {
                var marker = self.config.marker[el.Key];

                checked.push(el.Key);

                self.log("Check Element: ", el);

                if (marker !== undefined)
                {
                    self.log("Local Marker Found - Version: ", marker.revision);

                    // Marker exists -> check Revision
                    if (marker.revision === undefined)
                    {
                        marker.revision = 0;
                    }

                    var revision = Number(el.Value);


                    if (marker.revision > revision)
                    {
                        self.log("Our Marker is newer -> Upload");
                        upload.push(marker.name);
                    }
                    else if (marker.revision < revision)
                    {
                        self.log("Our Marker is older -> Download");
                        download.push(marker.name);
                    }
                    else
                    {
                        self.log("Marker Up to date");
                    }

                }
                else
                {
                    self.log("We don't have this Marker -> Download");
                    download.push(el.Key);
                }

            });

            // Check for Filter, that are not on the Server
            $.each(self.config.marker, function (key, el)
            {
                if (checked.indexOf(key) === -1)
                {
                    self.log("Filter ", el.name, " not on the Server -> upload");

                    upload.push(el.name);
                }

            });



            callback({ upload: upload, download: download });
        });

    }

    /**
    *   Synchronize - Get a specific marker from the remote Server
    *   @param marker Name of the Marker
    *   @param callback Callback after success
    *   @param progress Callback after every step
    */
    private api_getMarker(marker, callback, progress)
    {
        this.log("Get Marker from Server: ", marker);

        if (marker.length === 0)
        {
            callback({
                Error: false,
                Marker: [],
                Revision: 0
            });

            return;
        }

        var data =
            {
                User: this.config.token,
                Marker: marker
            };

        this.apiRequest({ command: "getFilter", data: JSON.stringify(data) }, function (result)
        {

            if (typeof (callback) === "function")
            {
                callback(JSON.parse(result));
            }

        });


    }

    /**
    *   Synchronize - Starts the synchronization
    *   @param progress_callback Callback with progress information
    */
    private api_syncFilter(progress_callback)
    {
        progress_callback(false);

        var self = this;

        this.api_getNeedUpdate(function (elements)
        {
            var numberOfElements = elements.upload.length + elements.download.length + 1;

            var progress = function (index)
            {
                progress_callback((index / numberOfElements) * 100);
            };

            // Upload Markers:
            self.api_sendMarkers(elements.upload, function ()
            {
                progress = function ()
                {
                    progress_callback(((numberOfElements - 1) / numberOfElements) * 100);
                };

                self.api_getMarker(elements.download, function (result)
                {
                    if (!result.Error)
                    {

                        self.log("Create Backup of Filters ... just in case ;)");
                        self.config.markerBackup = self.config.marker;

                        self.log("Apply Filters to local Config: ", result);

                        $.each(result.Marker, function (k, el)
                        {
                            self.log("Apply changes to ", el.name);

                            var data = {
                                name: el.Name,
                                display: el.Display,
                                keywords: el.Keywords.split(", "),
                                ignore: el.Ignore.split(", "),
                                ignoreColor: el.IgnoreColor,
                                color: el.Color,
                                mouseOver: el.MouseOver,
                                search_story: el.SearchStroy,
                                mark_chapter: el.MarkChapter,
                                print_story: el.PrintStory,
                                mention_in_headline: el.MentionInHeadline,
                                background: el.Background,
                                text_color: el.TextColor,
                                revision: el.Revision
                            };

                            self.config.marker[el.Name] = data;


                        });

                        self.save_config();

                        self.log("Sync Finished");
                        progress_callback(100);

                    }
                    else
                    {
                        console.error("Can't retrieve Filters from Server: ", result.Message);
                    }

                }, progress);

            }, progress);

        });

    }

    /**
    *   Get all new Messages from the Server
    *   @param callback Callback after success
    */
    private apiGetMessages(callback)
    {
        this.apiRequest({ command: "getMessages", data: this.config.token }, function (result)
        {
            var response = JSON.parse(result);

            callback(response);

        });

    }

    /**
    *   Tell the remote Server, that all new messages have been read
    */
    private apiMarkMessages()
    {
        delete this.dataConfig['messages'];
        this.save_dataStore();

        $(".ffnetMessageContainer img").attr("src", "http://private.mrh-development.de/ff/message-white.png");
        $(".ffnet-messageCount").text("0");


        this.apiRequest({ command: "readMessages", data: this.config.token }, function (result)
        {
        });

    }

    /**
    *   Gets the Version Ident Number
    *   @param name Name of the Version
    *   @result Version Ident Number
    */
    private getVersionId(name)
    {
        var parts = name.split(".");
        var version = 0;

        for (var i = 0; i < parts.length; i++)
        {
            version += Number(parts[i]) * Math.pow(100, (parts.length - i - 1));
        }

        return version;
    }


    /**
    *   Activates Debug Options
    */
    public debugOptions()
    {
        if (this.DEBUG)
        {

            /*
            var table = $(".zui").find("td").first();

            if (table.length > 0)
            {


                // Add User Interface
                table.append(
                    $('<a></a>').addClass('menu-link').html('Debug').attr('href', '#').click(function (e)
                    {

                        _messagesGUI();

                    }).attr('title', 'DEBUG Options')
                );

            }
            */
            //alert("Currently not used")

        }
    }





    // --------------------------

    /**
    *   Save Config
    */
    private save_config()
    {
        try
        {
            localStorage[this.config.config_key] = JSON.stringify(this.config);

        } catch (e)
        {


            console.warn(e);
            console.log("Current Config: ", this.config);
        }

    }

    /**
    *   Save to the session storage
    */
    private save_dataStore()
    {
        this.saveToMemory(sessionStorage, this.config.dataStorage_key, this.dataConfig);

        if (this.DEBUG)
        {
            console.info("Save to Memory: ", this.dataConfig);
        }
    }

    /**
    *   Loads Config from Memory
    */
    public getConfig()
    {
        return JSON.stringify(this.config);
    }



    /**
    *   Overwrites the config with a new one
    *   @param newConfig New Config
    */
    public setConfig(newConfig)
    {
        if (confirm('Are you shure to overwrite the Config? This will overwrite all your changes!'))
        {
            var data = JSON.parse(newConfig);
            this.config = data;

            this.save_config();
        }
    }



    /**
    *   Returns the List of found Story Elements
    *   @returns List of found Elements
    */
    public getList()
    {
        return this.eList;
    }

    // -------- Multiuse Functions ---------

    /**
    *   Load a JSON-Text from Memory
    *   @param memory Memory to load from
    *   @param key Key of element
    *   @result desearialized Object
    */
    private loadFromMemory(memory, key)
    {
        if ((memory[key] !== "undefined") &&
            (memory[key] !== "null") &&
            memory[key] !== undefined &&
            memory[key] != null &&
            memory[key] !== "")
        {
            return JSON.parse(memory[key]);
        }

        return {};
    }

    /**
    *   Save an object to an JSON File
    *   @param memory Memory to save to
    *   @param key Key of Element
    *   @param object Object File
    */
    private saveToMemory(memory, key, object)
    {
        try
        {
            memory[key] = JSON.stringify(object);

        } catch (e)
        {
            console.warn(e);
        }

    }

    /**
    *   Gets the URL from a Button
    *   @param button Button Instance
    */
    private getUrlFromButton(button)
    {
        var script = button.attr('onclick');
        var script_reg = /self\.location=\'([^']+)\'/;
        var data = script_reg.exec(script);

        if ((data != null) && (data.length > 1))
        {
            return data[1];
        }
        else
        {
            return null;
        }
    }

    /**
    *   Log to the Debug-Console
    *   @param a Parameter A
    *   @param b Parameter B
    *   @param c Paramater C
    */
    private log(a, b?, c?)
    {
        if (this.DEBUG)
        {
            if (b === undefined)
            {
                console.log(a);
            }
            else if (c === undefined)
            {
                console.log(a, b);
            }
            else
            {
                console.log(a, b, c);
            }
        }
    }

    /**
    *   Creates an Info Message
    *   @param a Parameter A
    *   @param b Parameter B
    *   @param c Parameter C
    */
    private info(a, b?, c?)
    {
        if (this.DEBUG)
        {
            if (b === undefined)
            {
                console.info(a);
            }
            else if (c === undefined)
            {
                console.info(a, b);
            }
            else
            {
                console.info(a, b, c);
            }
        }
    }


    // -------------------------------------------

    //__init();

}

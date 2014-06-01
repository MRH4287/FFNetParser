/// <reference path="jquery.d.ts" /> 
/// <reference path="jquery.colorpicker.d.ts" /> 
/// <reference path="jqueryui.d.ts" /> 

/// <reference path="Types.ts" /> 
class StoryParser
{
    /** 
     * The DEBUG Option.
     * Can be enabled with a Config option or when a dev Version is used.
     */
    private DEBUG: boolean = false;

    /**
     * Do not use a stored Version from the Auto Updater.
     */
    private IGNORE_NEW_VERSION: boolean = false;

    /**
     * The current Version.
     * Is replaced by Grunt.
     */
    public VERSION = "@@VERSION";

    /**
     * The current Git Branch.
     * IS replaced by Grunt.
     */
    public BRANCH = "@@BRANCH"; // dev

    /**
     * A stored version of the Script is used
     */
    private LOAD_INTERNAL: boolean = false;


    /**
     * The Config of the Script
     */
    public config: Config = {

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
        api_url: "https://www.mrh-development.de/FanFictionUserScript",
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

    /**
     * Used for the reset of the config
     */
    private baseConfig = this.config;

    // ----------------------

    /**
     * The list of elements that are modified
     */
    private element: JQuery = null;
    /**
     * The number of hidden Elements
     */
    private hidden = 0;

    /**
     * The hidden elements and the reason for hiding.
     * Index: Link, Value: reason
     */
    private hiddenElements: { [index: string]: string } = {};

    /**
     * List of found Elements
     * Key: Headline, Value: List of Links
     */
    private eList: { [index: string]: StoryInfo[] } = {};

    /**
     * Cache for in story search
     */
    private storyCache: { [index: string]: string } = {};


    /** 
     * Config that is only available in this session 
     */
    private dataConfig = {};

    /**
     * Use the Cross-Origin-Resource-Sharing Feature
     */
    private useCORS = false;

    /**
     * Use the HTTPS Connection
     */
    private useHTTPS = true;

    /**
     * Is the current Page the page of a specific user
     */
    private inUsersPage = false;

    /**
     * The Container for the GUI
     */
    private guiContainer: JQuery = null;


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



        //TODO: Remove this later :)
        if (this.config.api_url.toLocaleLowerCase() === "http://www.mrh-development.de/FanFictionUserScript".toLocaleLowerCase())
        {
            this.config.api_url = "https://www.mrh-development.de/FanFictionUserScript";
            this.save_config();
        }
        // Check if we use HTTPS
        this.useHTTPS = this.config.api_url.toLowerCase().indexOf("https") !== -1;





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

        if (typeof ($.ui) === "undefined")
        {
            console.error("Can't include jQuery UI!");
        }

        // Add jQuery Color Picker to the Page:     
        block = $('<link  rel="stylesheet" type="text/css"></link>').attr("href", this.getUrl("jquery.colorpicker.css"));
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
                ).append(
                $('<a></a>').addClass('menu-link').html('Filter Collection')
                    .attr('href', 'http://filter.mrh-development.de')
                    .attr("target", "_blank")
                    .attr('title', 'Open The Filter Collection')
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
                .css("border-radius", "5px")
                .addClass("ffnetMessageContainer")
                .addClass("clickable")
                .attr("title", "Advanced Messaging Features. Sorry, this is not a PM Button :-(")
                .appendTo(menulinks);


            imageContainer.append(

                $("<img></img>")
                    .attr("src", self.getUrl("message-white.png"))
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

                if (url !== null)
                {
                    if (self.DEBUG)
                    {
                        console.log("Changes to Page: ", url);
                    }

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
     *   @param element Base Element to start parsing
     */
    public readList(element: JQuery)
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
        this.eList = {};
        this.hidden = 0;
        this.hiddenElements = {};
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

            var requestQueue: RequestQueueData[] = [];

            if (self.config.hide_non_english_storys && (text.indexOf('english') === -1))
            {
                if (self.DEBUG)
                {
                    console.log("Hide Element because of 'hide_non_english_storys'", link);
                }

                self.hiddenElements[link] = "hide_non_english_storys";

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

            var markerFound = false;

            $.each(self.config.marker, function (headline: string, config: MarkerConfig)
            {

                var ignore = false;
                $.each(config.ignore, function (i: number, marker: string)
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

                $.each(config.keywords, function (i: number, marker: string)
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
                        markerFound = true;
                    }
                    else if (self.DEBUG)
                    {
                        console.log("Ignore Color for ", headline);
                    }

                    var info: StoryInfo = {
                        name: storyName,
                        url: link,
                        chapter: 0
                    };

                    self.elementCallback(self, config, element, textEl, headline, info);

                } else if (config.search_story)
                {
                    var parseData: RequestQueueData = {
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
                        .attr("src", self.getUrl("edit.gif"))
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
                        // element: element,
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
                        self.hiddenElements[link] = "storyConfig";

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

            if (!markerFound)
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

                    self.hiddenElements[link] = "Display-Only Mode";


                    element.hide();
                    self.hidden += 1;
                }
                else
                {
                    self.updateColor(element, color, colorMo, true);
                }


            }

            // Add Anchor:
            element.find("a").first().attr("name", storyName);

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
                var colorMo = el.attr("data-mouseOverColor");

                el.css("background-color", color);

                el.unbind("mouseenter").unbind("mouseleave");

                el.mouseenter(function ()
                {
                    $(this).css('background-color', colorMo);
                }).mouseleave(function ()
                    {
                        $(this).css('background-color', color);
                    });


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
                self.api_GetMessages(function (messages)
                {
                    if ((messages.Messages !== undefined) && (messages.Messages.length > 0))
                    {
                        // New Messages:
                        self.dataConfig['messages'] = messages.Messages;

                        // Update Icon:
                        $(".ffnetMessageContainer img").attr("src", self.getUrl("message_new-white.png"));
                        $(".ffnetMessageContainer").css("background-color", "red");

                        $('.ffnet-messageCount').text(messages.Messages.length);

                        self.save_dataStore();
                    }
                });

            }
            else
            {
                // Update Icon:
                $(".ffnetMessageContainer img").attr("src", self.getUrl("message_new-white.png"));
                $('.ffnet-messageCount').text(self.dataConfig['messages'].length);
            }

        }, 5000);


    }

    /**
     *   Gets the name of a story from a Link
     *   @param link Link to story
     *   @result Name of Story
     */
    private getStoryName(link: string): string
    {
        var storyNameReg = /\/s\/[0-9]+\/[0-9]+\/(.+)/;
        var result = storyNameReg.exec(link);

        if ((result != null) && (result.length > 1))
        {
            return result[1];
        } else
        {
            storyNameReg = /\/[^\/]+\/(.+)/;
            result = storyNameReg.exec(link);
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
    private doParse(queue: RequestQueueData[], i = 0)
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

        if (typeof (keywords) === "undefined")
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
    private parse(url: string, keywords: string[], callback: (StoryInfo) => void, i: number, executeNext: () => void)
    {

        if (i >= this.config.story_search_depth)
        {
            executeNext();
            return;
        }

        //console.log('Open: ',url);

        var self = this;

        var ajaxCallback = function (text: string)
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


            ajaxCallback(this.storyCache[url]);
        } else
        {
            if (this.DEBUG)
            {
                console.log('Story ' + url + ' not in Cache -> request');
            }

            $.ajax({
                url: url,
                success: ajaxCallback
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
    private parseSite(body: JQuery, keywords: string[]): string
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
    private elementCallback(self: StoryParser, config: MarkerConfig, element: JQuery, textEl: JQuery, headline: string, info: StoryInfo)
    {
        var foundWhere = info.chapter;

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

            self.hiddenElements[info.url] = "displayOnly";

            element.hide();
            self.hidden += 1;
        }


        if (!config.display)
        {
            if (self.DEBUG)
            {
                console.log("Hide Element because of Filter '" + headline + "'", info);
            }

            self.hiddenElements[info.url] = "Filter '" + headline + "'";

            element.hide();
            element.addClass('hidden');
            self.updateListColor();
            self.hidden += 1;
        } else
        {
            if ((config.background !== null) && (config.background !== ""))
            {
                element.css('background-image', 'url(' + config.background + ')')
                    .css('background-repeat', 'no-repeat')
                    .css('background-position', 'right');
            }

            if (config.mark_chapter)
            {
                element.find('a').first().after(
                    $("<span class=\"parser-msg\"> <b>[" + headline + "-" + foundWhere + "]</b></span>")
                        .attr("title", info.sentence)
                    );
            }

            if (!config.ignoreColor && config.text_color != null)
            {
                textEl.css('color', config.text_color);
            }

            var color: string = config.color;
            var colorMo: string = config.mouseOver;

            $.each(config.keywords, function (key, keyword)
            {
                var el = element.find('div').first();
                var reg = new RegExp(keyword, "i");
                var text = el.html();

                var erg = reg.exec(text);
                var front = '';
                var replace = '';
                var behind = '';

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
                if (self.DEBUG)
                {
                    console.log("[ElementCallback] Change Color of Line: ", element);
                }

                self.updateColor(element, color, colorMo, false);
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
                            $("<span></span>").append(
                                $("<a></a>").attr('href', value.url).html(value.name)
                                ).append(" - " + value.chapter)
                                .attr("title", value.sentence)
                            ).append(
                            $(" <a>#</a>").attr("href", "#" + value.name)
                            )
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

                    $.each(self.hiddenElements, function (key, value)
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
    private updateColor(element: JQuery, color: string, colorMo: string, notSetAttr: boolean)
    {
        //console.log("Update Color called! " + color + ", " + colorMo + ", " + notSetAttr);

        element.css('background-color', color);

        if (notSetAttr === false)
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
                .attr("src", this.getUrl("edit.gif"))
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
    private parsePocket(url: string, prefix: string, length: any, currentDepth: number = 1)
    {
        if (typeof (prefix) === "undefined")
        {
            prefix = "";
        }

        if ((typeof (length) === "undefined") || (length === "all"))
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

        var ajaxCallback = function (text)
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
            success: ajaxCallback
        });

    }

    // ------- Endless Mode ------

    /** The current displayed Page */
    private currentPage: JQuery = null;

    private getPageContent(base: JQuery, prev: boolean, callback: (elements: JQuery, data: JQuery) => void)
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

    private createWrapper(page: string)
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

    private getCurrentPage(content: JQuery)
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

    private getNextPage(base: JQuery): string
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

    private getPrevPage(base: JQuery): string
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

    /** The Input Elements that are used in the config GUI */
    private settingsElements: { [index: string]: JQuery } = {};
    /** The Elements that are displayed on the GUI */
    private guiElements: { [index: string]: { [index: string]: JQuery } } = {};
    /** The number of new Entries created */
    private addCount = 0;


    /**
    * Creates a block of Elements in the Container Element and saves the Elements with its IDs in the saveTo Variable
    * @param parent The Elements will be added to this Container
    * @param elements The List of Element-Options
    * @param the Collection to save the Input-Data to
    */
    private gui_createElements(parent: JQuery, elements: GUIElement[], saveTo: any)
    {
        var self = this;

        $.each(elements, function (_, data: GUIElement)
        {
            var element: JQuery = null;

            if ((data.debugOnly === true) && !self.DEBUG)
            {
                return;
            }

            var id = "fflist-element-" + Math.floor(Math.random() * 1000000);

            switch (data.type)
            {
                case GUIElementType.Input:

                    element = $('<input type="text" id="' + id + '"/>');
                    element.val(data.value);

                    break;
                case GUIElementType.Checkbox:

                    element = $('<input type="checkbox" id="' + id + '"/>');
                    if (data.value === true)
                    {
                        element.attr('checked', 'checked');
                    }

                    break;
                case GUIElementType.Button:

                    element = $('<input type="button" class="btn"  id="' + id + '"/>');
                    element.val(data.value);

                    if (typeof (data.callback) !== "undefined")
                    {
                        element.click(data.callback);
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
                    break;
                case GUIElementType.Text:

                    element = $('<p></p>').html(data.value);

                    break;

                case GUIElementType.Custom:

                    if (typeof (data.customElement) !== "undefined")
                    {
                        element = data.customElement(data);
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

        this.guiElements = {};
        this.settingsElements = {};
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



        this.gui_createElements(table,
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

            ], this.settingsElements);



        cat.category.append(saveButtonContainer.clone());

        // --------------------------------------------------------------------------------------------------------------------------
        cat = getCategory("Layout Settings", "ffnetConfig-Layout", settingsContainer);
        table = cat.table;


        this.gui_createElements(table,
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
                }



            ], this.settingsElements);


        cat.category.append(saveButtonContainer.clone());

        // --------------------------------------------------------------------------------------------------------------------------
        cat = getCategory("API Settings", "ffnetConfig-API", settingsContainer);
        table = cat.table;


        this.gui_createElements(table,
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

            ], this.settingsElements);




        cat.category.append(saveButtonContainer.clone());

        // --------------------------------------------------------------------------------------------------------------------------
        cat = getCategory("Advanced", "ffnetConfig-Andvanced", settingsContainer);
        table = cat.table;


        this.gui_createElements(table,
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
                    name: 'disable_sync',
                    type: GUIElementType.Checkbox,
                    label: 'Disable Synchronization Feature: ',
                    value: this.config.disable_sync
                }

            ], this.settingsElements);

        cat.category.append(saveButtonContainer.clone());

        // --------------------------------------------------------------------------------------------------------------------------

        this.log("GUI - Add Markers: ", this.config.marker);

        var container = $("<div></div>").appendTo(this.guiContainer);


        $.each(this.config.marker, function (name, marker)
        {
            self.gui_add_form(name, marker, container);
        });

        this.log("GUI - Markers added");

        if (this.DEBUG)
        {
            console.log("Config elements: ", this.guiElements);
        }


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
                                var newMarker : MarkerConfig = JSON.parse(text);

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
            self.log("Parsing Config elements: ", self.guiElements);


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
            self.config.disable_sync = self.settingsElements['disable_sync'].is(':checked');
            self.config.content_width = self.settingsElements['content_width'].val();
            self.config.color_normal = self.settingsElements['color_normal'].val();
            self.config.color_odd_color = self.settingsElements['color_odd_color'].val();
            self.config.color_mouse_over = self.settingsElements['color_mouse_over'].val();
            self.config.pocket_user = self.settingsElements['pocket_user'].val();
            self.config.pocket_password = self.settingsElements['pocket_password'].val();
            self.config.api_checkForUpdates = self.settingsElements['api_checkForUpdates'].is(':checked');
            self.config.api_autoIncludeNewVersion = self.settingsElements['api_autoIncludeNewVersion'].is(':checked');
            self.config.token = self.settingsElements['token'].val();

            if (self.DEBUG)
            {
                self.config.api_url = self.settingsElements['api_url'].find('.dataContainer').first().val();
            }


            self.config.marker = newConfig;

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
    private gui_add_form(name: string, marker: MarkerConfig, mainContainer: JQuery, displayBig: boolean = false)
    {
        this.log("GUI Add Form: ", name);

        this.guiElements[name] = {};

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
                    /*
                    // Get the element, for the scrolling
                    parent = container.offsetParent();
                    var offset = container.offset().top - 10;

                    _log("Current ScrollTop: ", parent.scrollTop());
                    parent.scrollTop(parent.scrollTop() + offset);
                    _log("Scroll Offset: ", offset);
                    */

                    container.css('height', 'auto');
                    container.css("cursor", "auto");
                    container.removeAttr("title")
                        .unbind();

                });

        }


        var table = $('<table width="100%"></table>').appendTo(container);


        var self = this;

        this.gui_createElements(table,
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
                    type: GUIElementType.Input,
                    value: marker.color,
                    label: 'Color: ',
                    customOptions: function (element) 
                    {
                        element.colorpicker({
                            colorFormat: "#HEX"
                        });
                    },
                    attributes:
                    {
                        id: 'fflist-' + name + '-color'
                    }
                },
                {
                    name: 'mouseOver',
                    type: GUIElementType.Input,
                    value: marker.mouseOver,
                    label: 'Mouse Over Color: ',
                    customOptions: function (element) 
                    {
                        element.colorpicker({
                            colorFormat: "#HEX"
                        });
                    },
                    attributes:
                    {
                        id: 'fflist-' + name + '-mouseOver'
                    }
                },
                {
                    name: 'text_color',
                    type: GUIElementType.Input,
                    value: marker.text_color,
                    label: 'Info Text Color: ',
                    customOptions: function (element) 
                    {
                        element.colorpicker({
                            colorFormat: "#HEX"
                        });
                    },
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
                        self.guiElements[name] = undefined;

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

                            $('<img src="' + self.getUrl('glyphicons_369_collapse_top.png') + '" alt="Minimize"></img>').click(function ()
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
            ], this.guiElements[name]);


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
                .val(this.getConfig())
                .appendTo(this.guiContainer);


            this.guiContainer.append('<br/><label for="ffnet-config-set">Import Config:</label><br/>');

            var neu = $('<textarea id="ffnet-config-set" style="width:90%; height: 100px;"></textarea>')
                .appendTo(this.guiContainer);

            this.guiContainer.append(
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
                .attr("src", self.getUrl("none.gif"))
                .appendTo(imageContainer)
                .click(function ()
                {
                    highlighter.val("");
                });

            for (var i = 1; i <= 6; i++)
            {
                image.clone()
                    .attr("src", self.getUrl(i + ".gif"))
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

                        self.save_config();

                        self.guiContainer.css("position", "absolute");
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
            this.api_MarkMessages();

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
    private apiRequest(data: any, callback: (result: string) => void)
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
    private api_sendMarker(data: any, callback?: (result: any) => void)
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
    private api_sendMarkers(keys: string[], onFinish: () => void, progress: (progress: number) => void)
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
    private api_getRevisions(callback: (result: any) => void)
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
    private api_getNeedUpdate(callback: (result: { upload: string[]; download: string[] }) => void)
    {
        this.log("API - Checking for Filter Changes");

        var upload: string[] = [];
        var download: string[] = [];
        var checked: string[] = [];

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
                    if (typeof (marker.revision) === "undefined")
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
     *   @param marker Names of the Marker
     *   @param callback Callback after success
     *   @param progress Callback after every step
     */
    private api_getMarker(marker: string[], callback: (result: { Error: boolean; Marker: any[]; Revision: number }) => void)
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
    private api_syncFilter(progress_callback: (progress: number) => void)
    {
        progress_callback(-1);

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
                        console.error("Can't retrieve Filters from Server");
                    }

                });

            }, progress);

        });

    }

    /**
     *   Get all new Messages from the Server
     *   @param callback Callback after success
     */
    private api_GetMessages(callback: (result: any) => void)
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
    private api_MarkMessages()
    {
        delete this.dataConfig['messages'];
        this.save_dataStore();

        $(".ffnetMessageContainer img").attr("src", this.getUrl("message-white.png"));
        $(".ffnetMessageContainer").css("background-color", "");
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
    private getVersionId(name: string): number
    {
        var parts = name.split(".");
        var version = 0;

        for (var i = 0; i < parts.length; i++)
        {
            version += Number(parts[i]) * Math.pow(100, (parts.length - i - 1));
        }

        return version;
    }

    private getUrl(path: string): string
    {
        if (this.useHTTPS)
        {
            return "https://www.mrh-development.de/FanFictionUserScript/SSLProxy/?url=" + path;
        }
        else
        {
            return "http://private.mrh-development.de/ff/" + path;
        }

    }


    /**
     *   Activates Debug Options
     */
    public debugOptions()
    {
        if (this.DEBUG)
        {


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
    public setConfig(newConfig: any)
    {
        if (confirm('Are you shure to overwrite the Config? This will overwrite all your changes!'))
        {
            var data = JSON.parse(newConfig);
            this.config = data;

            this.save_config();
        }
    }


    // -------- Multiuse Functions ---------

    /**
     *   Load a JSON-Text from Memory
     *   @param memory Memory to load from
     *   @param key Key of element
     *   @result desearialized Object
     */
    private loadFromMemory(memory: any, key: string): any
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
    private saveToMemory(memory: any, key: string, object: any)
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
    private getUrlFromButton(button: JQuery): string
    {
        var script = button.attr('onclick');
        var scriptReg = /self\.location=\'([^']+)\'/;
        var data = scriptReg.exec(script);

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
    private log(a: any, b?: any, c?: any)
    {
        if (this.DEBUG)
        {
            if (typeof (b) === "undefined")
            {
                console.log(a);
            }
            else if (typeof (c) === "undefined")
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
    private info(a: any, b?: any, c?: any)
    {
        if (this.DEBUG)
        {
            if (typeof (b) === "undefined")
            {
                console.info(a);
            }
            else if (typeof (c) === "undefined")
            {
                console.info(a, b);
            }
            else
            {
                console.info(a, b, c);
            }
        }
    }

}

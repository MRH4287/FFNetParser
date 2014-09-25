/// <reference path="jquery.d.ts" /> 
/// <reference path="jquery.colorpicker.d.ts" /> 
/// <reference path="jqueryui.d.ts" /> 
/// <reference path="chrome.d.ts" /> 

/// <reference path="Types.ts" /> 
/// <reference path="ParagraphMenu.ts" /> 
/// <reference path="GUIHandler.ts" />
/// <reference path="LiveChatHandler.ts" /> 
/// <reference path="ExtentionBaseClass.ts" /> 
class StoryParser
{
    /** 
     * The DEBUG Option.
     * Can be enabled with a Config option or when a dev Version is used.
     */
    public DEBUG: boolean = false;

    /**
     * Do not use a stored Version from the Auto Updater.
     */
    public IGNORE_NEW_VERSION: boolean = false;

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
    public LOAD_INTERNAL: boolean = false;

    /**
     * Module used for the GUI
     */
    public GUI: GUIHandler = new GUIHandler(this);

    /**
     * Handler for the IRC-Live Chat
     */
    public chat: LiveChatHandler = new LiveChatHandler(this);

    /**
     * The Paragraph Menu of the current Page
     */
    public paragramMenu: ParagraphMenu = null;


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
        enable_chapter_review_ratio: false,

        // Reading Help:
        readingHelp_enabled: false,
        readingHelp_backgroundColor: null,
        readingHelp_color: null,

        // Endless Mode:
        endless_enable: false,            // Is the Endless Mode Enabled
        endless_forceClickAfter: 5,    // Show a "Next Page" button after X pages

        // API:
        pocket_user: null,
        pocket_password: null,
        api_url: "https://www.mrh-development.de/FanFictionUserScript",
        api_lookupKey: "ffnet-api-interface",
        api_timeout: 3000,
        api_retries: 2,
        api_checkForUpdates: true,
        api_autoIncludeNewVersion: true,
        api_webSocketServerAddress: "wss://www.mrh-development.de:8182",

        // advanced Features:
        disable_cache: false,
        disable_highlighter: false,
        disable_parahraphMenu: false,
        disable_sync: true,


        // Do not change below this line:
        storage_key: "ffnet-storycache",
        config_key: "ffnet-config",
        dataStorage_key: "ffnet-dataStore",

        highlighter: {},
        marker: {},
        token: undefined,
        markerBackup: {},
        storyReminder: {}
    };

    /**
     * Used for the reset of the config
     */
    private baseConfig = this.config;

    // ----------------------

    /**
     * The number of hidden Elements
     */
    private hidden: { [index: number]: number } = {};

    /**
     * The hidden elements and the reason for hiding.
     * Index: Link, Value: reason
     */
    private hiddenElements: { [index: number]: { [index: string]: string } } = {};

    /**
     * List of found Elements
     * Key: Headline, Value: List of Links
     */
    private eList: { [inex: number]: { [index: string]: StoryInfo[] } } = {};

    /**
     *  The List of PageWrapper for every page
     */
    private wrapperList: { [index: number]: JQuery } = {};

    /**
     * Cache for in story search
     */
    private storyCache: { [index: string]: string } = {};


    /** 
     * Config that is only available in this session 
     */
    public dataConfig = {};

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
    public defaultConfig()
    {
        if (this.config["token"] === undefined)
        {
            // Generates Random Token
            this.config["token"] = Math.random().toString().split(".")[1];
            this.save_config();
        }

        var token = this.config.token;

        this.config = this.baseConfig;

        this.config.token = token;

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
            // Only Check if the Script is not loaded over Chrome!
            if (typeof (chrome) === "undefined")
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
            else
            {
                self.config['api_autoIncludeNewVersion'] = false;
                self.save_config();
            }
        }



        // Load all the config Values that are listed in the _config Array at startup
        $.each(defaultConfig, function (name, defaultValue)
        {
            if (self.config[name] === undefined)
            {
                self.config[name] = defaultValue;
            }
        });




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

        // Check if the current Context is a Chrome Extention, if yes it is loaded over this system:
        if (typeof (chrome) === "undefined")
        {
            // Use this because of the new HTTPS Restrictions ...
            this.api_getStyles();
        }

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


        window.setTimeout(function ()
        {
            // Check if a Paragraph is given in the current request:
            var reg = new RegExp(".+#paragraph=([0-9]+)");
            if (reg.test(location.href))
            {
                var match = reg.exec(location.href);
                self.goToParagraphID(Number(match[1]));
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
                    self.readAll();
                    e.preventDefault();

                }).attr('title', 'Parse the Stories again')
                ).append(
                $('<a></a>').addClass('menu-link').html('Menu').attr('href', '#').click(function (e)
                {
                    self.GUI.gui();
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

                        self.GUI.messagesGUI();

                    })
                );

            innerContainer.append(
                $("<div>Give Feedback</div>")
                    .addClass("menuItem")
                    .click(function ()
                    {
                        messageContainer.hide();

                        self.GUI.feedbackGUI();
                    })
                );

            var liveChatContainer = $("<div>Live Chat</div>")
                .addClass("menuItem")
                .click(function ()
                {

                    messageContainer.hide();

                    self.GUI.toggleLiveChat();

                });

            if (!this.chat.Available)
            {
                liveChatContainer.unbind("click").attr("title", "This Feature is not available in your Browser. Sorry!");
            }

            innerContainer.append(liveChatContainer);



            // Message Menu End

            // Story Reminder:

            if (!this.config.disable_parahraphMenu)
            {

                var sRImageContainer = $("<div></div>")
                    .css("display", "inline-block")
                    .css("margin-left", "10px")
                    .css("height", "100%")
                    .css("border-radius", "5px")
                    .addClass("ffnetStoryReminderContainer")
                    .addClass("clickable")
                    .attr("title", "Saved Story Reminder")
                    .appendTo(menulinks);

                sRImageContainer.append(

                    $("<img></img>")
                        .attr("src", self.getUrl("notes.png"))
                        .css("width", "12px")
                        .css("margin-bottom", "4px")
                    );


                sRImageContainer.click(function (event)
                {
                    event.preventDefault();

                    var table = $('<table class="table table-hover table-responsive table-border"></table>');
                    table.append("<tr><th>ID</th><th>Name</th><th>Chapter</th><th>Time</th><th>Visited</th><th>Options</th></tr>");

                    $.each(self.config.storyReminder, function (_, el: StoryReminderData)
                    {
                        $("<tr></tr>")
                            .append(
                            $("<td></td>").text(el.storyID)
                            ).append(
                            $("<td></td>").text(el.name)
                            ).append(
                            $("<td></td>").text(el.chapter)
                            ).append(
                            $("<td></td>").text((new Date(el.time)).toLocaleString())
                            ).append(
                            $("<td></td>").text((el.visited) ? "Yes" : "No")
                            ).append(
                            $("<td></td>").append(
                                $('<a href="#">Delete</a>').click(function (e)
                                {
                                    e.preventDefault();
                                    if (confirm("Do you realy want to delete that element?"))
                                    {
                                        delete self.config.storyReminder[_];
                                        self.save_config();
                                        dialog.dialog('close');
                                    }

                                })
                                )
                            ).addClass("clickable")
                            .click(function (e)
                            {
                                e.preventDefault();

                                self.config.storyReminder[_].visited = true;
                                self.save_config();

                                location.href = el.url;
                            }).appendTo(table);
                    });


                    // Create Dialog:
                    var dialog = $('<div></div>').attr("title", "Saved Story Reminder")
                        .append(
                        table
                        ).appendTo($("body"));

                    dialog.dialog({
                        close: function (event, ui)
                        {
                            dialog.remove();
                        }
                    });


                });



            }

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
                    self.readAll();

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
     *  Initial Read
     */
    public readList()
    {
        if (this.LOAD_INTERNAL)
        {
            return;
        }

        // Wrap Content:
        var wrapper = this.createPageWrapper();

        // Only run, if not a Story List
        if (wrapper !== null)
        {
            this.read(wrapper);
        }
    }

    /**
     * Parse the Content of all PageWrapper
     */
    public readAll()
    {
        var self = this;

        this.log("Parse all PageWrapper");

        $.each(this.wrapperList, function (page: number, wrapper: JQuery)
        {
            self.log("Parse Page: ", page);

            self.read(wrapper);
        });

    }


    /**
     *   Parses the elements in the specified Container
     *   @param container The PageWrapper for the Elements
     */
    public read(container: JQuery)
    {
        if (this.LOAD_INTERNAL)
        {
            return;
        }

        var page = Number(container.attr("data-page"));

        this.log("Read List for Page: ", page);

        var elements = container.find(".z-list");


        var odd = false;

        // Clear old Session:
        this.eList[page] = {};
        this.hidden[page] = 0;
        this.hiddenElements[page] = {};
        container.find('.parser-msg').remove();
        container.find('[data-color]').removeAttr("data-color");

        var self = this;
        elements.each(function (k, e)
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

                self.hiddenElements[page][link] = "hide_non_english_storys";

                element.hide();
                self.hidden[page] += 1;
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

                    self.elementCallback(self, config, element, textEl, headline, info, page);

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

                    self.GUI.toggleStoryConfig({
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
                        self.hidden[page]++;
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

                    self.hiddenElements[page][link] = "Display-Only Mode";


                    element.hide();
                    self.hidden[page] += 1;
                }
                else
                {
                    self.updateColor(element, color, colorMo, true);
                }


            }

            // Add Anchor:
            element.find("a").first().attr("name", storyName);

            // Chapter Review Ratio
            self.manageChapterReviewRatio(element);

            self.doParse(requestQueue, page);


        });

        if (this.DEBUG)
        {
            console.info("Current Highlighter Settings: ", this.config['highlighter']);
        }

        this.updateList(page);

        // Timed Events:
        setTimeout(function ()
        {
            // Color corrections            
            elements.filter("[data-color]").each(function (k, e)
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
                if ($(".disableImageHoverClass").length === 0)
                {

                    $("head").append(
                        $('<style class="disableImageHoverClass"></style')
                            .text(".z-list_hover { height: auto !important }")
                            .addClass("parser-msg")
                        );

                }

                elements.find(".cimage").each(function (k, e)
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
                elements.find(".lazy").remove();
            }

            if (self.config.allow_copy)
            {
                self.log("Allow Selection of Text");
                $(".nocopy").removeClass("nocopy").parent().attr("style", "padding: 0px 0.5em;");
            }



        }, 1000);
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
     *   @param page The Page of the Search
     *   @param i What element in the queue should be parsed
     *   @remark Don't specify the second Argument for initial parsing
     */
    private doParse(queue: RequestQueueData[], page: number, i = 0)
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
            var domainRegex = new RegExp("https?://[^/]+");
            var domain = domainRegex.exec(location.href)[0];

            url = domain + data.url;
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
            self.doParse(queue, page, i + 1);
        };

        var callback = function (info)
        {
            var el = queue[i];

            if (self.DEBUG)
            {
                console.info('execute Callback Function ' + el.headline + ' for ', info);
            }

            self.elementCallback(self, el.config, el.element, el.textEl, el.headline, info, page);

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
     *   @param page The Page of this Event
     */
    private elementCallback(self: StoryParser, config: MarkerConfig, element: JQuery, textEl: JQuery, headline: string, info: StoryInfo, page: number)
    {
        var foundWhere = info.chapter;

        if (!(headline in self.eList))
        {
            self.eList[page][headline] = [];
        }
        self.eList[page][headline].push(info);

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

            self.hidden[page] -= 1;
        }
        else if (self.dataConfig["displayOnly"] !== undefined)
        {
            // Hide this Element because the Only Mode do not match

            if (self.DEBUG)
            {
                console.log("Hide Element because of 'displayOnly' ", info);
            }

            self.hiddenElements[page][info.url] = "displayOnly";

            element.hide();
            self.hidden[page] += 1;
        }


        if (!config.display)
        {
            if (self.DEBUG)
            {
                console.log("Hide Element because of Filter '" + headline + "'", info);
            }

            self.hiddenElements[page][info.url] = "Filter '" + headline + "'";

            element.hide();
            element.addClass('hidden');
            self.updateListColor();
            self.hidden[page] += 1;
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

        self.updateList(page);
    }

    /**
     *   Updates the List of found elements
     */
    private updateList(page: number)
    {
        var wrapper = this.wrapperList[page];

        if (typeof (wrapper) === "undefined")
        {
            this.log("UpdateList - Page Wrapper for Page " + page + " is undefined! Abort. ", this.wrapperList);
            return;
        }


        this.log("Update List for Page: ", page);

        var text = "";

        if (this.DEBUG)
        {
            console.log("Headline-List = ", this.eList[page]);
        }

        var headlineContainer = $("<div></div>");

        var self = this;

        $.each(this.eList[page], function (headline, elements)
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
                text += "<b>" + headline + ":</b> " + self.eList[page][headline].length + " ";
            }

        });

        wrapper.find('#mrhOutput').remove();

        var hiddenByStoryConfig = wrapper.find('div[data-hiddenBy="storyConfig"]');

        if (hiddenByStoryConfig.length > 0)
        {
            text += "<i>Hidden by StoryConfig</i>: " + hiddenByStoryConfig.length + " ";
        }

        var list = $('<div id=\'mrhOutput\'></div>')
            .html('<div><b>Page: ' + page + '</b></div>' + text + ' <i>All hidden elements:</i> ').append(
            $("<u></u>").text(self.hidden[page]).click(
                function (e)
                {
                    // Build Dialog
                    var dialog = $('<div title="Hidden Elements"></div>');
                    var table = $("<table></table>").appendTo(dialog);

                    $.each(self.hiddenElements[page], function (key, value)
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

        wrapper.prepend(list);
    }

    /**
     *   Updates the colors of the elements in the story list
     */
    private updateListColor()
    {
        var odd = false;
        var self = this;

        $(".z-list").not('.hidden').each(function (k, e)
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

            self.GUI.toggleStoryConfig({
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
    *   Go to a specific Paragraph on the page
    *   @param id Paragraph Number
    */
    private goToParagraphID(id)
    {
        $($("p")[id]).before('<a name="goto" id="gotoMarker"></a>');
        location.href = '#goto';
        $("#gotoMarker").remove();
    }


    /**
     * Enable the Reading Aid Function
     * @param container The Container to enable the Reading Aid for
     */
    public enableReadingAid(container: JQuery = null)
    {
        if (container === null)
        {
            container = $("body");
        }

        if (this.LOAD_INTERNAL)
        {
            return;
        }

        var reg = new RegExp(".+/s/[0-9]+/.+");
        if (!reg.test(location.href))
        {
            return;
        }

        if (this.config.readingHelp_enabled === true)
        {
            var data = "";

            if ((this.config.readingHelp_backgroundColor !== null) && (this.config.readingHelp_backgroundColor !== ""))
            {
                data = "background-color: " + this.config.readingHelp_backgroundColor + ";";
            }
            if ((this.config.readingHelp_color !== null) && (this.config.readingHelp_color !== ""))
            {
                data += " color: " + this.config.readingHelp_color + ";";
            }

            if ($(".readingAidStyle").length === 0)
            {
                // Build Style Object
                var style = $('<style class="readingAidStyle" type="text/css"></style>')
                    .html(".readingAidMarker { " + data + " }")
                    .appendTo($("head"));
            }


            container.find("p").mouseenter(function ()
            {
                $(this).addClass("readingAidMarker");
            }).mouseleave(function ()
                {
                    $(this).removeClass("readingAidMarker");
                });


        }

        if (!this.config.disable_parahraphMenu)
        {
            if (this.paragramMenu === null)
            {
                // Load the Paragraph Menu
                this.paragramMenu = new ParagraphMenu(this);
            }
            else
            {
                this.paragramMenu.addHandler(container);
            }
        }
    }




    /**
     * Adds the Chapter/Review Ration Information
     * @param element z-list Instance
     */
    private manageChapterReviewRatio(element: JQuery): void
    {
        if (this.config.enable_chapter_review_ratio)
        {
            var reg = new RegExp(".+Chapters: ?([0-9]+).*Reviews: ?([0-9]+).*");

            var parent = element.find(".z-padtop2").first();
            if (reg.test(parent.text()))
            {
                var result = reg.exec(parent.text());

                var chapter = Number(result[1]);
                var reviews = Number(result[2]);

                /*
                var ggt = function ggt(m: number, n: number): number
                {
                    if (n === 0)
                    {
                        return m;
                    }
                    else
                    {
                        return ggt(n, m % n);
                    }
                };

                var devisor = ggt(chapter, reviews);

                $('<span class="parser-msg"></span>')
                    .text(" - Chapter/Review Ratio: " + (chapter / devisor) + "/" + (reviews / devisor))
                    .appendTo(parent);
                */

                var num = reviews / chapter;
                var fixed = (Math.round(num * 100) / 100).toFixed(2);

                $('<span class="parser-msg"></span>')
                    .text(" - Chapter/Review Ratio: 1/" + (fixed))
                    .appendTo(parent);

            }
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

            var domainRegex = new RegExp("https?://[^/]+");
            var domain = domainRegex.exec(location.href)[0];

            $("body").append(
                $("<img>").attr("src", 'https://readitlaterlist.com/v2/add?username=' + user + '&password=' + password + '&apikey=emIpiQ7cA6fR4u6dr7ga2aXC11dcD58a&url=' + domain + url + '&title=' + title)
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

    private endlessRequestPending = false;

    private endlessRequestsDone = 0;

    /**
     * Enabled the EndlessMode 
     */
    public enableEndlessMode()
    {
        var self = this;

        if (!this.config.endless_enable)
        {
            return;
        }

        var isStory = ($(".z-list").length === 0);

        var offset = 500;

        if (typeof (window["scrollY"]) === "undefined")
        {
            console.warn("[FFNetParser] EndlessMode disabled. Reason: No Support for Scroll-Events");
            return;
        }


        window.onscroll = function (ev)
        {


            if ((window.innerHeight + <number>window['scrollY']) >= $(document).height() - offset)
            {
                var lastPageContainer: JQuery = null;
                if (isStory)
                {
                    lastPageContainer = $(".storytext").last();
                }
                else
                {
                    lastPageContainer = $(".ffNetPageWrapper").last();
                }

                if (lastPageContainer === null || lastPageContainer.length === 0)
                {
                    console.log("Error: Can't find Page Container!");
                    return;
                }

                var lastPage = Number(lastPageContainer.attr("data-page"));
                if (lastPage === Number.NaN)
                {
                    console.log("Error parsing Page Number!");
                    return;
                }

                self.appendPageContent(lastPage + 1);
            }
        };



    }


    private getPageContent(url: string, callback: (page: JQuery) => void)
    {
        if (this.DEBUG)
        {
            console.log("Requesting next page: ", url);
        }

        var self = this;

        $.get(url, function (content)
        {
            var data = $(content);

            callback(data);
        });


    }

    public getCurrentPage(): number
    {
        var pageNumber = $("center > b").first();

        if (pageNumber.length !== 0)
        {
            return Number(pageNumber.text());
        }
        else
        {
            // We are in a Story ....
            pageNumber = $("#chap_select").children().filter("[selected]");

            return Number(pageNumber.attr("value"));
        }
    }

    private createWrapper(page: number): JQuery
    {
        var wrapper = $("<div></div>").addClass("ffNetPageWrapper")
            .attr("data-page", page);

        this.wrapperList[page] = wrapper;

        return wrapper;
    }

    private createPageWrapper(): JQuery
    {
        // Wrap the current Page into a PageWrapper
        var currentPage = this.getCurrentPage();

        if (this.DEBUG)
        {
            console.log("Current Page: ", currentPage);
        }

        if ($(".z-list").length !== 0)
        {

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
                    .attr("data-wrapped", "wrapped");
            }

            return wrapper;
        }
        else
        {
            // Story
            $("#storytext").attr("data-page", currentPage);

            return null;
        }
    }

    public getLinkToPageNumber(page: number): string
    {
        var domainRegex = new RegExp("https?://[^/]+");
        var domain = domainRegex.exec(location.href)[0];


        // Regex used to get the Pagenumber
        var regex = new RegExp("([?|&]p)=[0-9]+");
        var container = $("center").first().find("a").first();

        if (container.length > 0)
        {
            var href = container.attr("href");

            return domain + href.replace(regex, "$1=" + page);
        }
        else
        {
            var next = $('button:contains(Next)').first();

            var url = this.getUrlFromButton(next);

            regex = new RegExp("s/([0-9]+)/[0-9]+/");

            return domain + url.replace(regex, "s/$1/" + page + "/");
        }
    }

    private loadElementsFromPage(page: number, callback: (data: JQuery) => void)
    {
        var self = this;

        var url = this.getLinkToPageNumber(page);

        this.getPageContent(url, function (res)
        {
            var elements = res.find(".z-list");
            var wrapper = self.createWrapper(page);

            wrapper.append(elements);

            callback(wrapper);

        });
    }

    private loadChapterFromPage(page: number, callback: (page: JQuery) => void)
    {
        var self = this;
        var url = this.getLinkToPageNumber(page);

        this.getPageContent(url, function (res)
        {
            var story = res.find(".storytext").first();

            story.removeAttr("id").attr("data-page", page);

            callback(story);
        });
    }

    public appendPageContent(page: number)
    {
        var self = this;

        if (this.endlessRequestPending)
        {
            return;
        }

        this.endlessRequestPending = true;

        var isStroy = ($(".z-list").length === 0);

        this.log("Appending Page Content. Page: " + page + " - IsStory: ", isStroy);

        var loadingElement = $("<div><center><b>Loading ...</b></center></div>");;



        this.endlessRequestsDone++;
        var overLimit = this.endlessRequestsDone > this.config.endless_forceClickAfter;

        if (!overLimit)
        {

            if (isStroy)
            {
                var lastPage = $(".storytext").last();

                this.log("LastPage: ", lastPage);

                lastPage.after(loadingElement);

                this.log("Loading Element added ....");

                this.loadChapterFromPage(page, function (chapter)
                {
                    self.log("Server Answer Received", chapter);


                    loadingElement.remove();

                    // Add Page Name:
                    chapter.prepend("<hr /><center><b>Page: " + page + "</b></center><hr />");


                    chapter.hide();

                    lastPage.after(chapter);

                    if (self.config.allow_copy)
                    {
                        self.log("Allow Selection of Text");
                        $(".nocopy").removeClass("nocopy").parent().attr("style", "padding: 0px 0.5em;");
                    }

                    self.enableReadingAid(chapter);

                    // Copy Classes and styles from main Container:
                    chapter.attr("class", $("#storytext").attr("class"))
                        .attr("style", $("#storytext").attr("style"));

                    chapter.slideDown();

                    window.setTimeout(function ()
                    {
                        self.endlessRequestPending = false;
                    }, 1000);
                });

            }
            else
            {
                var lastWrapper = $(".ffNetPageWrapper").last();

                this.log("LastWrapper: ", lastWrapper);

                lastWrapper.after(loadingElement);

                this.log("Loading Element added ....");

                this.loadElementsFromPage(page, function (wrapper)
                {
                    self.log("Server Answer Received", wrapper);


                    loadingElement.remove();

                    // Set new elements as wrapped
                    wrapper.find(".z-list").attr("data-wrapped", "wrapped");

                    wrapper.hide();


                    lastWrapper.after(wrapper);

                    self.read(wrapper);

                    wrapper.slideDown();

                    window.setTimeout(function ()
                    {
                        self.endlessRequestPending = false;
                    }, 1000);
                });
            }
        }
        else
        {
            // Add a Load New Page Button:
            var button = $('<button class="btn">Load Next Page</button>')
                .click(function (e)
                {
                    e.preventDefault();

                    location.href = self.getLinkToPageNumber(page);
                });


            if (isStroy)
            {
                $(".storytext").last()
                    .append("<br /><hr />")
                    .append($("<center></center").append(button));
            }
            else
            {
                $(".ffNetPageWrapper").last()
                    .append("<br /><hr />")
                    .append($("<center></center").append(button));
            }
        }

    }


    /*
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
    */


    // ----- API-Interface ------

    /**
     *   Generic API-Request
     *   @param data Request Options
     *   @param callback Function executed after result was found
     */
    public apiRequest(data: any, callback: (result: string) => void)
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
    public api_checkVersion()
    {
        if ((this.config.api_checkForUpdates))
        {
            var statisticData =
                {
                    Version: this.VERSION,
                    Token: this.config.token,
                    Nested: (sessionStorage["ffnet-mutex"] !== undefined) ? true : false,
                    Branch: this.BRANCH,
                    Page: window.location.href,
                    Chrome: (typeof (chrome) !== "undefined")
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
    public api_getStyles()
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
    public api_updateScript()
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
    public api_sendMarker(data: any, callback?: (result: any) => void)
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
    public api_sendMarkers(keys: string[], onFinish: () => void, progress: (progress: number) => void)
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
    public api_getRevisions(callback: (result: any) => void)
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
    public api_getNeedUpdate(callback: (result: { upload: string[]; download: string[] }) => void)
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
    public api_getMarker(marker: string[], callback: (result: { Error: boolean; Marker: any[]; Revision: number }) => void)
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
    public api_syncFilter(progress_callback: (progress: number) => void)
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
    public api_GetMessages(callback: (result: any) => void)
    {
        var data = {
            Token: this.config.token,
            Version: this.VERSION
        };

        this.apiRequest({ command: "getMessages", data: JSON.stringify(data) }, function (result)
        {
            var response = JSON.parse(result);

            callback(response);

        });

    }

    /**
     *   Tell the remote Server, that all new messages have been read
     */
    public api_MarkMessages()
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
    public getVersionId(name: string): number
    {
        var parts = name.split(".");
        var version = 0;

        for (var i = 0; i < parts.length; i++)
        {
            version += Number(parts[i]) * Math.pow(100, (parts.length - i - 1));
        }

        return version;
    }

    public getUrl(path: string): string
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
    public save_config()
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
    public log(a: any, b?: any, c?: any)
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
    public info(a: any, b?: any, c?: any)
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

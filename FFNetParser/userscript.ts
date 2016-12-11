/// <reference path="_reference.ts" /> 

/*// <reference path="GameEngine/Interfaces/GameHandler.d.ts" /> */


class StoryParser
{
    /** 
     * The DEBUG Option.
     * Can be enabled with a Config option or when a dev Version is used.
     */
    public DEBUG: boolean = false;

    /**
     * Print all Events to the console.
     */
    public VERBOSE: boolean = false;

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
     *  The Event-Handler used for processing
     */
    public EventHandler: EventHandler = new EventHandler(this);

    /**
     * Module used for the GUI
     */
    public Gui: GUIHandler = new GUIHandler(this);

    /**
     * Handler for the IRC-Live Chat
     */
    public Chat: LiveChatHandler = new LiveChatHandler(this);

    /**
     * Handler for Upgrades to the Config Values 
     */
    public Upgrade: UpgradeHandler = new UpgradeHandler(this);

    /**
     * The Paragraph Menu of the current Page
     */
    public ParagramMenu: ParagraphMenu = null;

    /**
     *  The API used for connecting to Github
     */
    public GithubAPi: GithubAPI = new GithubAPI(this);

    /**
     * The System used to handle Usernames
     */
    public UserHandler: UserHandler = new UserHandler(this);

    /**
     * The Controller used to handle API-Requests
     */
    public Api: ApiController = new ApiController(this);


    /**
     * The Config of the Script
     */
    public Config: Config = {

        // Story:
        story_search_depth: 2,                  // The Max depth for a recursive search
        mark_M_storys: true,                    // Mark every Story Rated as M
        hide_non_english_storys: true,          // Hide all Storys, that are not in english
        allow_copy: false,
        language: 'en',
        sortFunction: 'default',

        // Layout:
        color_normal: "#FFFFFF",
        color_mouse_over: "#EEF0F4",
        color_odd_color: "#dfdfdf",
        hide_images: false,
        hide_lazy_images: false,
        disable_image_hover: false,
        content_width: "90%",
        enable_chapter_review_ratio: false,
        enable_read_chapter_info: false,
        reading_info_ChapterMarker: '[R] {Name}',

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
        api_github_url: "https://www.mrh-development.de/api/ffgithub",
        api_github_requestStart_url: "https://www.mrh-development.de/FFNetGithub/RedirectToAccessSite/",

        // advanced Features:
        advanced_view: false,
        disable_cache: false,
        disable_highlighter: false,
        disable_parahraphMenu: false,
        disable_sync: true,
        disable_default_coloring: false,
        disable_inStory_parsing: false,
        disable_resort_after_filter_match: false,
        disable_width_change: false,
        disable_highlighter_list: false,
        chrome_sync: false,
        highlighter_use_storyID: false,

        // Do not change below this line:
        storage_key: "ffnet-storycache",
        config_key: "ffnet-config",
        dataStorage_key: "ffnet-dataStore",

        highlighter: {},
        highlighterPrefabs: {},
        marker: {},
        token: undefined,
        markerBackup: {},
        storyReminder: {},



        upgradeTags: {}
    };

    /**
     * Used for the reset of the config
     */
    public BaseConfig = $.extend({}, this.Config);

    // ----------------------

    /**
     * The number of hidden Elements
     */
    private _hidden: { [index: number]: number } = {};

    /**
     * The hidden elements and the reason for hiding.
     * Index: Link, Value: reason
     */
    private _hiddenElements: { [index: number]: { [index: string]: string } } = {};

    /**
     * List of found Elements
     * Key: Headline, Value: List of Links
     */
    public FoundElemementList: { [index: number]: { [index: string]: StoryInfo[] } } = {};

    /**
     *  The List of PageWrapper for every page
     */
    private _wrapperList: { [index: number]: JQuery } = {};

    /**
     * Cache for in story search
     */
    private _storyCache: { [index: string]: string } = {};


    /** 
     * Config that is only available in this session 
     */
    public DataConfig = {};


    /**
     * Is the current Page the page of a specific user
     */
    private _inUsersPage = false;

    /**
     * The Container for the GUI
     */
    private _guiContainer: JQuery = null;


    /**
     * The List of pendig requests
     * Index: ElementID - data-ElementIdent Attribute
     */
    private _requestsPending: { [index: number]: number } = {};

    /**
     * The Last used for an Element in the List 
     */
    private _lastElementID: number = 0;

    /**
     *  The currently selected Language
     */
    public CurrentLanguage: { [index: string]: string } = null;

    /**
     * The List of Available Language Elements
     **/
    public AvailableLanguges: LanguageData[] = null;


    /**
     *  The name mapping for the Sort Function
     **/
    public SortMap: { [index: string]: SortFunctionDefinition } =
    {
        "default":
        {
            Function: this.SortElementIdent,
            Name: this._('Default Sorting')
        },
        "defaultDESC":
        {
            Function: this.SortElementIdentDESC,
            Name: this._('Default Sorting [Inverted]')
        },
        "suggestion":
        {
            Function: this.SortSuggestionLevel,
            Name: this._('Suggested [Lowest Up]')
        },
        "suggestionDESC":
        {
            Function: this.SortSuggestionLevelDESC,
            Name: this._('Suggested [Highest Up]')
        },
        "chapters":
        {
            Function: this.SortChapterCount,
            Name: this._('Chapter Count [Lowest Up]')
        },
        "chaptersDESC":
        {
            Function: this.SortChapterCountDESC,
            Name: this._("Chapter Count [Highest Up]")
        },
        "words":
        {
            Function: this.SortWordsCount,
            Name: this._("Word Count [Lowest Up]")
        },
        "wordsDESC":
        {
            Function: this.SortWordsCountDESC,
            Name: this._("Word Count [Highest Up]")
        },
        "followers":
        {
            Function: this.SortFollows,
            Name: this._("Followers [Lowest Up]")
        },
        "followersDESC":
        {
            Function: this.SortFollowsDESC,
            Name: this._("Followers [Highest Up]")
        },
        "favs":
        {
            Function: this.SortFavs,
            Name: this._("Favs [Lowest Up]")
        },
        "favsDESC":
        {
            Function: this.SortFavsDESC,
            Name: this._("Favs [Highest Up]")
        },
        "publishTime":
        {
            Function: this.SortPublishTime,
            Name: this._("Publish Time [Oldest Up]")
        },
        "publishTimeDESC":
        {
            Function: this.SortPublishTimeDESC,
            Name: this._("Publish Time [Newest Up]")
        },
        "updateTime":
        {
            Function: this.SortUpdateTime,
            Name: this._("Update Time [Oldest Up]")
        },
        "updateTimeDESC":
        {
            Function: this.SortUpdateTimeDESC,
            Name: this._("Update Time [Newest Up]")
        },
        "reviews":
        {
            Function: this.SortReviews,
            Name: this._("Review Count [Lowest Up]")
        },
        "reviewsDESC":
        {
            Function: this.SortReviewsDESC,
            Name: this._("Review Count [Highest Up]")
        },
        "chapterReviewRatio":
        {
            Function: this.SortChapterReviewRatio,
            Name: this._('Chapter/Review Ratio')
        },
        "chapterReviewRatingDESC":
        {
            Function: this.SortChapterReviewRatioDESC,
            Name: this._('Chapter/Review Ratio [Descending]')
        }
    };



    /**
     *   Resets Config to the default setting
     */
    public DefaultConfig()
    {
        if (typeof (this.Config["token"]) === "undefined")
        {
            // Generates Random Token
            this.Config["token"] = Math.random().toString().split(".")[1];
            this.SaveConfig(false);
        }

        var token = this.Config.token;

        this.Config = this.BaseConfig;

        this.Config.token = token;

        this.SaveConfig();

    }

    /**
     *   Initializes System
     */
    constructor()
    {
        this.EventHandler.CallEvent("preInit", this, null);

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
                var currentID = this.GetVersionId(this.VERSION);

                this.Log("Current Version ID: ", currentID);
                this.Log("Cached Version ID: ", newVersionID);

                if (newVersionID > currentID)
                {
                    this.Log("New Version in Storage found ...");
                }
                else
                {
                    try
                    {
                        this.Log("The cached Version is older or the same as the current -> delete");
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
            var data = this.LoadFromMemory(localStorage, "ffnet-Script");

            if (typeof (data.script) !== "undefined")
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
                localStorage["ffnet-Script-VersionID"] = this.GetVersionId(this.VERSION);
            }
            catch (e)
            {
                console.error("Can't save Version id: ", e);
            }

        }

        try
        {
            // Checks if sessionStorage entry is valid:
            this._storyCache = this.LoadFromMemory(sessionStorage, this.Config.storage_key);
            this.EventHandler.CallEvent("onStoryCacheLoad", this, this._storyCache);

            this.DataConfig = this.LoadFromMemory(sessionStorage, this.Config.dataStorage_key);
            this.EventHandler.CallEvent("onDataConfigLoad", this, this.DataConfig);

        } catch (ex)
        {
            console.warn(ex);
        }

        var defaultConfig = this.Config;

        try
        {
            this.Config = this.LoadFromMemory(localStorage, this.Config.config_key);
            this.EventHandler.CallEvent("onConfigLoad", this, this.Config);

        } catch (ex)
        {
            console.warn(ex);
        }

        // Check for DEBUG-Mode
        if ((typeof (this.Config['debug']) !== "undefined") || (this.BRANCH === "dev"))
        {
            this.DEBUG = true;
        }


        // Check for Config Values:

        if ((typeof (this.Config["pocket_user"]) === "undefined") || (this.Config["pocket_user"] === ""))
        {
            this.Config["pocket_user"] = null;
        }

        if ((typeof (this.Config["pocket_password"]) === "undefined") || (this.Config["pocket_password"] === ""))
        {
            this.Config["pocket_password"] = null;
        }

        if (typeof (this.Config["token"]) === "undefined")
        {
            // Generates Random Token
            this.Config["token"] = Math.random().toString().split(".")[1];
            this.SaveConfig();
        }


        if (typeof (this.Config["api_autoIncludeNewVersion"]) === "undefined")
        {
            // Only Check if the Script is not loaded over Chrome!
            if ((typeof (chrome) === "undefined") || (typeof (chrome.runtime) === "undefined"))
            {

                // Creates Warning for new Feature:

                var text = "<div><b>Please Read!</b><br />";
                text += "In one of the previous version, a new feature has been implemented. With this Feature activated, you don't have to manually install new Versions. ";
                text += "Newer Versions will be saved in your Local Storage and then executed. Because of that, the Version Number displayed in your UserScript Manager ";
                text += "can be wrong. To Display the Version Number, check your Menu.";
                text += "Do you want to activate this Feature?</div>";

                var buttons = [];
                var modal: JQuery;

                buttons.push($('<button class="btn btn-primary">Enable Feature</button>').click(() =>
                {
                    modal.modal('hide');

                    self.Config['api_autoIncludeNewVersion'] = true;
                    self.SaveConfig();

                }));

                buttons.push($('<button class="btn btn-default">Keep Disabled</button>').click(() =>
                {
                    modal.modal('hide');

                    self.Config['api_autoIncludeNewVersion'] = false;
                    self.SaveConfig();

                }));

                modal = GUIHandler.CreateBootstrapModal($(text), "Fanfiction Story Parser", buttons);


                window.setTimeout(function ()
                {
                    GUIHandler.ShowModal(modal);

                }, 1000);
            }
            else
            {
                self.Config['api_autoIncludeNewVersion'] = false;
                self.SaveConfig();
            }
        }


        // Google Storage Sync:
        if ((typeof (chrome) !== "undefined") && (typeof (chrome.runtime) !== "undefined") && (this.Config.chrome_sync))
        {
            window.setTimeout(function ()
            {
                self.EventHandler.CallEvent("onChromeSync", self, null);
                console.info("Load Config from Chrome Server");

                // Load Config from the Chrome Server:
                chrome.storage.sync.get(function (result: Config)
                {
                    self.Log("Got Data from Chrome Server: ", result);

                    self.EventHandler.CallEvent("onChromeSyncDataReceived", self, result);

                    $.each(self.Config, function (name, oldValue)
                    {
                        if (typeof (result[name]) !== "undefined")
                        {
                            self.Log("Key: '" + name + "'", oldValue, result[name]);

                            self.Config[name] = result[name];
                        }
                    });
                });

            }, 2000);

            chrome.storage.onChanged.addListener(function (changes, namespace)
            {
                if (namespace !== "sync")
                {
                    return;
                }

                self.EventHandler.CallEvent("onChromeSyncChange", self, [changes, namespace]);

                $.each(changes, function (key, storageChange)
                {

                    //var storageChange = changes[key];
                    console.log('Storage key "%s" changed. ' +
                        'Old value was "%s", new value is "%s".',
                        key,
                        storageChange.oldValue,
                        storageChange.newValue);

                    if (self.Config[key] === storageChange.oldValue)
                    {
                        self.Config[key] = storageChange.newValue;
                    }
                    else if (self.Config[key] !== storageChange.newValue)
                    {
                        // Use local Value for UpgradeTags
                        if (key !== "upgradeTags")
                        {

                            console.warn("Conflict with Cloud Storage! Use data from Cloud Storage.");
                            try
                            {
                                //localStorage[self.config.storage_key + "_Conflict" + Date.now()] = JSON.stringify(self.config);

                            } catch (e)
                            {

                            }

                            self.Config[key] = storageChange.newValue;

                        }
                        else
                        {
                            var val = <{ [index: string]: UpgradeTag }>storageChange.newValue;
                            $.each(val, function (key, val)
                            {
                                if (!(key in self.Config.upgradeTags))
                                {
                                    self.Config.upgradeTags[key] = val;
                                }
                            });
                        }

                    }
                });
            });
        }


        // Load all the config Values that are listed in the _config Array at startup
        $.each(defaultConfig, function (name, defaultValue)
        {
            if (typeof (self.Config[name]) === "undefined")
            {
                self.Config[name] = defaultValue;
            }
        });


        // Check Upgrade Tags:
        this.Upgrade.HandleTags();



        if (this.DEBUG)
        {
            console.info("Loading User Script...");
        }

        this.Api.CheckVersion();

        if (this.DEBUG)
        {
            console.log("Update Check done.");
            console.log("Pre GUI Update");
        }


        this.Api.Initialize();

        // Language:
        this.Api.GetLanguageList(function (res)
        {
            self.AvailableLanguges = res;
        });

        if (this.Config.language !== 'en')
        {
            // Get the new Language from the Server:
            this.Api.GetLanguage(this.Config.language, undefined, true, true);
        }

        // Add jQueryUI to the Page:        
        /*var block = $('<link  rel="stylesheet" type="text/css"></link>').attr("href", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/ui-lightness/jquery-ui.css");
        $("head").append(block);

        if (typeof ($.ui) === "undefined")
        {
            console.error("Can't include jQuery UI!");
        }*/

        // Add jQuery Color Picker to the Page:     
        var block = $('<link  rel="stylesheet" type="text/css"></link>').attr("href", this.Api.GetUrl("bootstrap-colorpicker.min.css"));
        $("head").append(block);

        /*
        block = $('<link  rel="stylesheet" type="text/css"></link>').attr("href", "http://www.mrh-development.de/FanFictionUserScript/Css?branch=" + _BRANCH);
        $("head").append(block);
        */

        // Check if the current Context is a Chrome Extention, if yes it is loaded over this system:
        if ((typeof (chrome) === "undefined") || (typeof (chrome.runtime) === "undefined"))
        {
            // Use this because of the new HTTPS Restrictions ...
            this.Api.GetStyles();
        }


        // Check if the current Page is a User Specific Page:
        var locationRegEx = new RegExp("\/u\/[0-9]+\/");
        this._inUsersPage = locationRegEx.test(location.href);


        if (this.DEBUG)
        {
            console.log("Pre GUI Update done.");
            console.log("Starts GUI Update");
        }

        this.UpdateGUI();

        if (this.DEBUG)
        {
            console.log("GUI Update done.");
        }


        window.setTimeout(function ()
        {
            self.EventHandler.CallEvent("preParapgraphCheck", self, null);

            // Check if a Paragraph is given in the current request:
            var reg = new RegExp(".+#paragraph=([0-9]+)");
            if (reg.test(location.href))
            {
                var match = reg.exec(location.href);
                self.GoToParagraphID(Number(match[1]));
            }
        }, 1000);

        setTimeout(function ()
        {
            self.EventHandler.CallEvent("preMessageCheck", self, null);

            // Get Messages from Server:  
            if (typeof (self.DataConfig['messages']) === "undefined")
            {
                self.Api.GetMessages(function (messages)
                {
                    self.EventHandler.CallEvent("onMessageGot", self, messages);

                    if ((typeof (messages.Messages) !== "undefined") && (messages.Messages.length > 0))
                    {
                        // New Messages:
                        self.DataConfig['messages'] = messages.Messages;

                        // Update Icon:
                        //$(".ffnetMessageContainer img").attr("src", self.getUrl("message_new-white.png"));
                        //$(".ffnetMessageContainer").css("background-color", "red");
                        $(".ffnetMessageContainer").find(".badge").remove();
                        $(".ffnetMessageContainer").append($('<div class="badge ffnet-messageCount"></div>'));

                        $('.ffnet-messageCount').text(messages.Messages.length);

                        self.SaveDataStore();
                    }
                });

            }
            else
            {
                // Update Icon:
                //$(".ffnetMessageContainer img").attr("src", self.getUrl("message_new-white.png"));
                $(".ffnetMessageContainer").find(".badge").remove();
                $(".ffnetMessageContainer").append($('<div class="badge ffnet-messageCount"></div>'));

                $('.ffnet-messageCount').text(self.DataConfig['messages'].length);
            }

        }, 5000);

        this.EventHandler.CallEvent("postInit", this, null);
    }

    /**
     *   Adds GUI Elements like Menu Link
     */
    private UpdateGUI()
    {
        this.EventHandler.CallEvent("preGUIUpdate", this, null);

        if (!this.Config.disable_width_change)
        {
            // Updates Content_width
            $('#content_wrapper').css('width', this.Config['content_width']);
        }

        var table = $(".zui").find("td").first();

        var self = this;

        if (table.length > 0)
        {
            if (this.DEBUG)
            {
                console.log("Adds User Interface");
            }

            this.EventHandler.CallEvent("preGUIMenuAppend", this, table);

            // Add User Interface
            table.append(
                $('<a></a>').addClass('menu-link').html(self._('Rerun Filter')).attr('href', '#').click(function (e)
                {
                    self.ReadAll();
                    e.preventDefault();

                }).attr('title', self._('Parse the Stories again'))
            ).append(
                $('<a></a>').addClass('menu-link').html(self._('Menu')).attr('href', '#').click(function (e)
                {
                    self.Gui.Gui();
                    e.preventDefault();

                }).attr('title', 'Open Config Menu')
                ).append(
                $('<a></a>').addClass('menu-link').html(self._('Filter Collection'))
                    .attr('href', 'http://filter.mrh-development.de')
                    .attr("target", "_blank")
                    .attr('title', self._('Open The Filter Collection'))
                );

            this.EventHandler.CallEvent("postGUIMenuAppend", this, table);

        }

        // Add Messages Menu:
        this.Log("Add Messages Menu");

        var menulinks = $(".menulink").first();


        if (menulinks.length > 0)
        {
            this.EventHandler.CallEvent("preGUIMessageMenuAppend", this, menulinks);

            var imageContainer = $("<div></div>")
                .css("display", "inline-block")
                .css("margin-left", "10px")
                .css("height", "100%")
                .css("border-radius", "5px")
                .addClass("ffnetMessageContainer")
                .addClass("ffnetParserContext")
                .addClass("clickable")
                .attr("title", self._("Advanced Messaging Features. Sorry, this is not a PM Button :-("))
                .appendTo(menulinks);


            imageContainer.append(

                $("<img></img>")
                    .attr("src", self.Api.GetUrl("message-white.png"))
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

                    self.Api.GetLiveChatInfo(function (res)
                    {
                        if (res.DevInRoom)
                        {
                            $(".liveChatButton").addClass("online")
                                .attr("title", self._('The Dev is currently online.'));
                        }
                        else
                        {
                            $(".liveChatButton").removeClass("online").removeAttr("title");
                        }
                    });


                }
                else
                {
                    messageContainer.hide();
                }

            });

            innerContainer.append(
                $("<div>" + self._('Message Menu (Script)') + "</div>")
                    .css("font-weight", "bold")
                    .css("margin-bottom", "10px")
            );

            var count = 0;

            if (typeof (this.DataConfig['messages']) !== "undefined")
            {
                count = this.DataConfig['messages'].length;
            }


            innerContainer.append(
                $('<div><span class="ffnet-messageCount">' + count + "</span> " + self._('Message(s)') + "</div>")
                    .addClass("menuItem")
                    .click(function ()
                    {
                        messageContainer.hide();

                        self.Gui.MessagesGUI();

                    })
            );

            innerContainer.append(
                $("<div>" + self._('Give Feedback') + "</div>")
                    .addClass("menuItem")
                    .click(function ()
                    {
                        messageContainer.hide();

                        self.Gui.FeedbackGUI();
                    })
            );

            var liveChatContainer = $("<div>" + self._('Live Chat') + "</div>")
                .addClass("menuItem liveChatButton")
                .click(function ()
                {

                    messageContainer.hide();

                    self.Gui.ToggleLiveChat();

                });

            if (!this.Chat.Available)
            {
                liveChatContainer.unbind("click").attr("title", self._("This Feature is not available in your Browser. Sorry!"));
            }

            innerContainer.append(liveChatContainer);

            innerContainer.append(
                $("<div>" + self._('Wiki') + "</div>")
                    .addClass("menuItem")
                    .click(function ()
                    {
                        messageContainer.hide();
                        window.open("https://github.com/MRH4287/FFNetParser/wiki");
                    })
            );
            //

            this.EventHandler.CallEvent("postGUIMessageMenuAppend", this, menulinks);

            // Message Menu End

            // Story Reminder:

            if (!this.Config.disable_parahraphMenu)
            {
                this.EventHandler.CallEvent("preGUIStoryReminderAppend", this, menulinks);

                var sRImageContainer = $("<div></div>")
                    .css("display", "inline-block")
                    .css("margin-left", "10px")
                    .css("height", "100%")
                    .css("border-radius", "5px")
                    .addClass("ffnetStoryReminderContainer")
                    .addClass("clickable")
                    .attr("title", self._("Saved Story Reminder"))
                    .appendTo(menulinks);

                sRImageContainer.append(

                    $("<img></img>")
                        .attr("src", self.Api.GetUrl("notes.png"))
                        .css("width", "12px")
                        .css("margin-bottom", "4px")
                );


                sRImageContainer.click(function (event)
                {
                    event.preventDefault();


                    var table = $('<table class="table table-hover table-responsive table-border"></table>');
                    table.append("<tr><th>" + self._('ID') + '</th><th>' + self._('Name') + '</th><th>' + self._('Chapter') +
                        '</th><th>' + self._('Time') + '</th><th>' + self._('Visited') + '</th><th>' + self._('Options') + "</th></tr>");

                    var modal = GUIHandler.CreateBootstrapModal(table, self._("Saved Story Reminder"));

                    $.each(self.Config.storyReminder, function (_, el: StoryReminderData)
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
                            $("<td></td>").text((el.visited) ? self._("Yes") : self._("No"))
                            ).append(
                            $("<td></td>").append(
                                $('<a href="#">' + self._('Delete') + '</a>').click(function (e)
                                {
                                    e.preventDefault();
                                    if (confirm(self._("Do you really want to delete that element?")))
                                    {
                                        delete self.Config.storyReminder[_];
                                        self.SaveConfig();
                                        modal.modal('hide');
                                    }

                                })
                            )
                            ).addClass("clickable")
                            .click(function (e)
                            {
                                e.preventDefault();

                                self.Config.storyReminder[_].visited = true;
                                self.SaveConfig();

                                location.href = el.url;
                            }).appendTo(table);
                    });


                    GUIHandler.ShowModal(modal);
                });

                this.EventHandler.CallEvent("postGUIStoryReminderAppend", this, menulinks);

            }

            if (!self.Config.disable_highlighter && !self.Config.disable_highlighter_list)
            {
                var hLImageContainer = $("<div></div>")
                    .css("display", "inline-block")
                    .css("margin-left", "10px")
                    .css("height", "100%")
                    .css("border-radius", "5px")
                    .addClass("ffnetHighlighterListContainer")
                    .addClass("clickable")
                    .attr("title", self._("Highlighter List"))
                    .appendTo(menulinks);

                hLImageContainer.append(

                    $("<img></img>")
                        .attr("src", self.Api.GetUrl("highlighter.png"))
                        .css("width", "12px")
                        .css("margin-bottom", "4px")
                );


                hLImageContainer.click(function (event)
                {
                    event.preventDefault();

                    // Collect Data:
                    var groups: { [index: string]: string[] } = {};

                    $.each(self.Config.highlighter, function (key: string, data: HighlighterConfig)
                    {
                        var prefab = "Custom Highlighter";
                        if (data.prefab !== null)
                        {
                            prefab = data.prefab;
                        }

                        if (groups[prefab] === undefined)
                        {
                            groups[prefab] = [];
                        }

                        groups[prefab].push(key);
                    });

                    var contentContainer = $('<div id="ffnet_highlighterGroup" class="panel-group" role="tablist" aria-multiselectable="true"></div>');

                    var modal = GUIHandler.CreateBootstrapModal(contentContainer, self._("Highlighter List"));

                    $.each(groups, function (name: string, elements: string[])
                    {
                        var panelBody = $('<div class="panel-body"></div>');

                        var list = $("<ul></ul>").appendTo(panelBody);

                        var image = null;
                        if (self.Config.highlighterPrefabs[name] !== undefined)
                        {
                            var highlighterPrefab = self.Config.highlighterPrefabs[name];
                            if (highlighterPrefab.image !== undefined && highlighterPrefab.image !== null)
                            {
                                image = $("<img></img>").attr("src", highlighterPrefab.image)
                                    .css("max-height", "16px").css("max-width", "16px")
                                    .css("margin-right", "10px");
                            }
                        }


                        var prefabName = name.replace(' ', '_')
                            .replace('\'', '')
                            .replace('"', '')
                            .replace('.', '_')
                            .replace(',', '_');

                        var panel = $('<div class="panel panel-default"></div>');
                        panel.append(
                            $('<div class="panel-heading" role="tab"></div').attr("id", "heading" + prefabName).append(
                                $('<h4 class="panel-title"></h4').append(
                                    $('<a role="button" class="collapsed" data-toggle="collapse" data-parent="#ffnet_highlighterGroup" aria-expanded="false"></a>')
                                        .attr("aria-controls", "collapse" + prefabName)
                                        .attr("href", "#collapse" + prefabName)
                                        .append(image).append(
                                        $("<span></span>").text(name)
                                        )

                                )
                            )
                        ).append(
                            $('<div class="panel-collapse collapse" role="tabpanel"></div>')
                                .attr("id", "collapse" + prefabName)
                                .attr("aria-labelledby", "heading" + prefabName)
                                .append(panelBody)
                            );

                        $.each(elements, function (_, value: string)
                        {
                            var link = self.Config.highlighter_use_storyID ? "/s/" + value : value;
                            var aElement = $('<a></a>').attr("href", link).text(value);
                            var spanElement = $('<span></span>');
                            list.append(
                                $('<li></li>').append(
                                    aElement
                                ).append(
                                    spanElement
                                    )
                            );

                            self.GetPageContent(link, function (body)
                            {
                                var title = body.find("#profile_top > .xcontrast_txt").first().text();
                                var lastUpdate = body.find("#profile_top > .xcontrast_txt").last().find("[data-xutime]").first().text();

                                spanElement.text(" (Last Updated: " + lastUpdate + ")");
                                aElement.text(title);
                            });
                        });

                        contentContainer.append(panel);
                    });

                    contentContainer.collapse();

                    GUIHandler.ShowModal(modal);
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


        // Add GUI for "Only Mode":
        var container = $("#filters > form > .modal-body");

        if (container.length > 0)
        {
            this.EventHandler.CallEvent("preGUIOnlyModeAppend", this, container);

            if (this.DEBUG)
            {
                console.log('Add GUI for "Only Mode"');
            }

            var input = $("<select></select>")
                .attr("title", self._("Display Only Elements that match a specific Filter"))
                .change(function ()
                {
                    var selected = input.children().filter(":selected").attr('value');
                    if (self.DEBUG)
                    {
                        console.info("Display Only - Element Selected: ", selected);
                    }

                    if (selected !== "off")
                    {
                        self.DataConfig["displayOnly"] = selected;
                    }
                    else
                    {
                        self.DataConfig["displayOnly"] = undefined;
                    }

                    self.SaveDataStore();
                    self.ReadAll();

                }).addClass("filter_select");

            var noneEntry = $('<option value="off">' + self._('Display: Everything') + '</option>').appendTo(input);

            if (typeof (this.DataConfig["displayOnly"]) === "undefined")
            {
                noneEntry.attr("selected", "selected");
            }


            $.each(this.Config.marker, function (title, info)
            {
                var entry = $('<option></option>').attr('value', title).html(title).appendTo(input);

                if ((typeof (self.DataConfig["displayOnly"]) !== "undefined") && (title === self.DataConfig["displayOnly"]))
                {
                    entry.attr("selected", "selected");
                }

            });


            container.find("select").not(".filter_select_negative ").last().after(input);

            input.before("&nbsp;");

            this.EventHandler.CallEvent("postGUIOnlyModeAppend", this, container);
        }

        // Key Control for Page:

        $("body").keydown(function (event)
        {
            self.EventHandler.CallEvent("onKeyDown", self, event);

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
                            url = self.GetUrlFromButton(element);
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
                            url = self.GetUrlFromButton(element);
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

        this.EventHandler.CallEvent("postGUIUpdate", this, null);

    }

    /**
     *  Initial Read
     */
    public ReadList()
    {
        var self = this;

        if (this.LOAD_INTERNAL)
        {
            return;
        }

        this.EventHandler.CallEvent("preReadList", this, null);

        // Wrap Content:
        var wrapper = this.CreatePageWrapper();

        // Only run, if not a Story List
        if (wrapper !== null)
        {
            this.Read(wrapper);
        }
        else
        {
            // If Story List, then exec Alow Copy Check

            window.setTimeout(function ()
            {
                if (self.Config.allow_copy)
                {
                    self.Log("Allow Selection of Text");
                    $(".nocopy").removeClass("nocopy").parent().attr("style", "padding: 0px 0.5em;");
                }
            }, 1000);

            this.ReadStory();

            this.ManageReadChaptersInfo();

        }

        this.EventHandler.CallEvent("postReadList", this, null);

    }

    /**
     * Parse the Content of all PageWrapper
     */
    public ReadAll()
    {
        var self = this;

        this.Log("Parse all PageWrapper");

        // Reset Handled Stories:
        $.each(self._requestsPending, function (elementID, data)
        {
            self.Log("Remove pending Request for ElementID", elementID);

            delete self._requestsPending[elementID];
        });

        $.each(this._wrapperList, function (page: number, wrapper: JQuery)
        {
            self.Log("Parse Page: ", page);

            self.Read(wrapper);
        });

    }


    /**
     *   Parses the elements in the specified Container
     *   @param container The PageWrapper for the Elements
     */
    public Read(container: JQuery)
    {
        if (this.LOAD_INTERNAL)
        {
            return;
        }

        this.EventHandler.CallEvent("preRead", this, container);

        var page = Number(container.attr("data-page"));

        this.Log("Read List for Page: ", page);

        var elements = container.find(".z-list");


        var odd = false;

        // Clear old Session:
        this.FoundElemementList[page] = {};
        this._hidden[page] = 0;
        this._hiddenElements[page] = {};
        container.find('.parser-msg').remove();
        container.find('[data-color]').removeAttr("data-color");

        var self = this;
        elements.each(function (k, e)
        {
            var element = $(e);

            self.EventHandler.CallEvent("preElementParse", self, element);

            // Reset Hide:
            element.show();

            var textEl = element.find('div').last();
            var text = element.text().toLowerCase();
            var color = self.Config.color_normal;
            var colorMo = self.Config.color_mouse_over;
            var link = element.find('a').first().attr('href');

            var storyInfo = self.GetStoryInfo(link);
            var storyName = storyInfo.Name;

            var requestQueue: RequestQueueData[] = [];

            // Set ItemID used for the Pendig Requests List:
            if (!element.is("[data-ElementIdent]"))
            {
                element.attr("data-ElementIdent", self._lastElementID++);
            }

            // Set StoryID:
            if (!element.is("[data-StoryID]"))
            {
                element.attr("data-StoryID", storyInfo.ID);
            }

            // Remove Suggestion Level:
            element.attr("data-suggestionLevel", "0");

            if (self.Config.hide_non_english_storys && (text.indexOf('english') === -1))
            {
                if (self.DEBUG)
                {
                    console.log("Hide Element because of 'hide_non_english_storys'", link);
                }

                self._hiddenElements[page][link] = "hide_non_english_storys";

                element.hide();
                self._hidden[page] += 1;
                return;
            }

            if (odd)
            {
                color = self.Config.color_odd_color;
                odd = false;
            } else
            {
                odd = true;
            }

            var markerFound = false;

            $.each(self.Config.marker, function (headline: string, config: MarkerConfig)
            {
                if (config.enabled === false)
                {
                    return;
                }

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
                        id: storyInfo.ID,
                        chapter: 0
                    };

                    self.ElementCallback(self, config, element, textEl, headline, info, page);

                }

                if ((!found && config.search_story) || config.keep_searching)
                {
                    var parseData: RequestQueueData = {
                        url: link,
                        headline: headline,
                        config: config,
                        element: element,
                        textEl: textEl,
                        info: info,
                        storyName: storyName
                    };

                    requestQueue.push(parseData);

                }

                if (self.Config.mark_M_storys)
                {
                    textEl.html(textEl.html().replace('Rated: M', '<b>Rated: M</b>'));
                }

            });

            if (self.Config['hide_images'])
            {
                element.find('img').not(".parser-msg").hide();
            }

            // Highlighter:

            if (!self.Config.disable_highlighter)
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
                        .attr("src", self.Api.GetUrl("edit.gif"))
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


                    self.Gui.ShowStoryPrefabList({
                        url: link,
                        element: element,
                        name: storyName,
                        id: storyInfo.ID
                    });


                });

                element.find("div").first().before(contextMenu);

                var highlighterKey = self.Config.highlighter_use_storyID ? storyInfo.ID : link;
                // Highlighter found:
                if (typeof (self.Config['highlighter'][highlighterKey]) !== "undefined")
                {
                    self.HighlighterCallback(self, self.Config.highlighter[highlighterKey], element, link, page);
                }
            }

            if (!markerFound)
            {
                /*if (_DEBUG)
                {
                    console.log("[_read] Change Color of Line: ",element); 
                }*/

                if (typeof (self.DataConfig["displayOnly"]) !== "undefined")
                {
                    if (self.DEBUG)
                    {
                        console.log("Hide Entry because of Display-Only Mode: ", element);
                    }

                    self._hiddenElements[page][link] = "Display-Only Mode";


                    element.fadeOut();
                    self._hidden[page] += 1;
                }
                else
                {
                    if (!self.Config.disable_default_coloring)
                    {
                        self.UpdateColor(element, color, -1, colorMo, -1);
                    }
                }


            }

            // Add Anchor:
            element.find("a").first().attr("name", storyName);

            // Chapter Review Ratio
            self.ManageChapterReviewRatio(element);


            self.DoParse(requestQueue, page);

            self.EventHandler.CallEvent("postElementParse", self, element);
        });

        self.ManageReadChaptersInfo();

        // Sort Elements:
        if (typeof (this.Config.sortFunction) !== "undefined" && this.Config.sortFunction !== 'default')
        {
            if (typeof (this.SortMap[this.Config.sortFunction]) !== "undefined")
            {
                var sortfunction = this.SortMap[this.Config.sortFunction];
                this.SortStories(sortfunction.Function, container);
            }
            else
            {
                console.warn("Unknown SortFunction: ", this.Config.sortFunction);
                this.Config.sortFunction = 'default';
                this.SaveConfig(false);
            }
        }

        if (this.DEBUG)
        {
            console.info("Current Highlighter Settings: ", this.Config['highlighter']);
        }

        this.UpdateList(page);

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
            if (self.Config.disable_image_hover)
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

            if (self.Config.hide_lazy_images)
            {
                elements.find(".lazy").remove();
            }

        }, 1000);

        this.EventHandler.CallEvent("postRead", this, container);
    }



    /**
     *   Gets the Information of a story from a Link
     *   @param link Link to story
     *   @result Name of Story
     */
    public GetStoryInfo(link: string): { Chapter: string; Name: string; ID: string }
    {
        var data: { Chapter: string; Name: string; ID: string } = { Chapter: null, ID: null, Name: null };

        var storyNameReg = /\/s\/([0-9]+)\/?([0-9]*)\/?(.*)/;
        var result = storyNameReg.exec(link);

        if ((result != null) && (result.length > 1))
        {
            data.ID = result[1];
            data.Chapter = result[2];
            data.Name = result[3];

            return data;
        } else
        {
            storyNameReg = /\/[^\/]+\/(.+)/;
            result = storyNameReg.exec(link);
            if ((result != null) && (result.length > 1))
            {
                data.Name = result[1];
            }

            return data;
        }
    }

    /**
     *   Starts Recursive Parsing of stories
     *   @param queue List of Stories to parse
     *   @param initiated The Time when the search was started
     *   @param page The Page of the Search
     *   @param i What element in the queue should be parsed
     *   @remark Don't specify the second Argument for initial parsing
     */
    private DoParse(queue: RequestQueueData[], page: number, initiated: number = -1, i = 0)
    {
        if (queue.length === 0)
        {

            this.Log("Empty Request Queue. Abort");

            return;
        }

        if (i >= queue.length)
        {
            if (typeof (queue[0]) !== "undefined")
            {
                // The Queue is finished. Close all Requests.
                var firstID = Number(queue[0].element.attr("data-ElementIdent"));
                delete this._requestsPending[firstID];
            }

            this.Log("Queue finished.", firstID);

            return;
        }

        var data = queue[i];

        var url: string;

        if (typeof (data) === "undefined")
        {
            this.Log("Data not defined. Abort - ", page, initiated);
            return;
        }

        var elementID = Number(data.element.attr("data-ElementIdent"));

        if (this.DEBUG)
        {
            console.info('Execute Queue for ' + elementID + ', i: ' + i + ', page: ' + page + ', initated: ' + initiated, data, queue);
        }

        // Check if there is a pending Request:
        if (elementID in this._requestsPending)
        {
            // Check if it is the same Request as the current one:
            if (this._requestsPending[elementID] !== initiated)
            {
                this.Info("Stopping InStorySearch Request. Not the last triggered Request: ", elementID, initiated);
                return;
            }
        }
        else
        {
            if (i === 0)
            {
                // ElementID not in pending Requests:
                initiated = Date.now();
                this.Log("Add pending Request: ", elementID, initiated);
                this._requestsPending[elementID] = initiated;
            }
            else
            {
                this.Info("Stopping InStorySearch Request. ElementID not in pending Requests: ", elementID, initiated);
                return;
            }
        }

        url = data.url;

        // Check for ScriptInsert Page:
        if (document.location.href.indexOf("file://") === -1)
        {
            var domainRegex = new RegExp("https?://[^/]+");
            var result = domainRegex.exec(location.href);
            if (result !== undefined && result !== null)
            {
                var domain = result[0];
                url = domain + data.url;
            }
        }
        else
        {
            this.Log("Detected File-URL. Abort Sory Request");
            return;
        }


        var self = this;

        var executeNext = function ()
        {
            self.DoParse(queue, page, initiated, i + 1);
        };


        var callback = function (info)
        {
            var el = queue[i];

            if (self.DEBUG)
            {
                console.info('execute Callback Function ' + el.headline + ' for ', info);
            }

            self.ElementCallback(self, el.config, el.element, el.textEl, el.headline, info, page);

            executeNext();
        };

        self.Parse(url, data.config, callback, 0, executeNext, elementID, initiated);

    }

    /**
     *   Recursive Parsing function
     *   @param url URL to Story
     *   @param markerConfig The Config for the correspondig Marker
     *   @param callback Callback in case of a found entry
     *   @param i Recursive Depth
     *   @param executeNext Callback for executing next element in the queue
     *   @param elementID The ID of the main Element
     *   @param initiated The Time this Request was initiated
     */
    private Parse(url: string, markerConfig: MarkerConfig, callback: (storyInfo) => void, i: number, executeNext: () => void, elementID: number, initiated: number)
    {

        if (i >= this.Config.story_search_depth)
        {
            executeNext();
            return;
        }

        //console.log('Open: ',url);

        var self = this;

        var ajaxCallback = function (text: string)
        {
            if (!(url in self._storyCache) && !self.Config.disable_cache)
            {
                if (self.DEBUG)
                {
                    console.log('Story ' + url + ' Not in Cache -> save');
                }

                self._storyCache[url] = text;

                try
                {
                    sessionStorage[self.Config.storage_key] = JSON.stringify(self._storyCache);
                }
                catch (ex)
                {
                    self.Log("Can't save Story Cache: ", ex);

                    try
                    {
                        sessionStorage[self.Config.storage_key] = '';

                    } catch (e)
                    {
                        console.warn(e);
                    }
                }

            }

            /*
            // Check if the pending Request match:
            if (!(elementID in self.requestsPending) || (self.requestsPending[elementID] !== initiated))
            {
                self.log("Stop Chapter Search. Request ID not in pending: ", elementID, self.requestsPending);
                executeNext();
                return;
            }
            */

            var body = $(text);

            var sentence = null;

            if ((sentence = self.ParseSite(body, markerConfig.keywords, markerConfig.ignore)) != null)
            {
                var storyInfo = self.GetStoryInfo(url);
                var storyName = storyInfo.Name;

                callback({
                    'name': storyName,
                    'url': url,
                    'chapter': (i + 1),
                    'sentence': (self.DEBUG ? ("[" + initiated + "] ") : "") + sentence
                });

            }

            if (sentence == null || markerConfig.keep_searching)
            {
                //console.log('find next el');
                var next = body.find('button:contains(Next)').first();
                //console.log('next: ', next);

                if (next.length !== 0)
                {
                    var data = url = self.GetUrlFromButton(next);

                    //console.log('data:', data);

                    if (data != null)
                    {
                        self.Parse(data, markerConfig, callback, i + 1, executeNext, elementID, initiated);
                    }
                    else
                    {
                        executeNext();
                        return;
                    }
                }
                //console.log('Content not found in: ', url);

            }
            else
            {
                executeNext();
                return;
            }

        };

        if (url in this._storyCache)
        {
            if (this.DEBUG)
            {
                console.log('Story ' + url + ' in Cache -> use Cache');
            }


            ajaxCallback(this._storyCache[url]);
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
     *   @param ignore Ignore Keywords
     *   @result Matching Sentence or null
     */
    private ParseSite(body: JQuery, keywords: string[], ignore: string[]): string
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
                if (result === null)
                {
                    try
                    {
                        var wordReg = new RegExp(word, "i");
                        if (wordReg.test(storyText))
                        {

                            var append = "([a-zA-Z0-9, :-_\*]+)?";
                            var regEx = "[^|\.]?" + append + word + append + "[\.|$]?";
                            self.Log("Use RegExp for InStory Search: ", regEx);

                            var reg = new RegExp(regEx, "i");
                            var data = reg.exec(storyText);

                            var sentence = "";
                            for (var i = 1; i < data.length; i++)
                            {
                                if (typeof (data[i]) !== "undefined")
                                {
                                    sentence += data[i];
                                }
                            }

                            self.Log("Found Sentence: ", sentence);


                            result = sentence;

                            return;
                        }
                    } catch (e)
                    {
                        console.warn(e);
                    }
                }
            });

            if (result !== null)
            {
                $.each(ignore, function (k, word)
                {
                    if ((result === null) || (word === "") || (word === " "))
                    {
                        return;
                    }

                    try
                    {
                        var wordReg = new RegExp(word, "i");
                        if (wordReg.test(storyText))
                        {
                            self.Log("Found Ignore Statemant: ", word);

                            result = null;
                            return;
                        }
                    } catch (e)
                    {
                        console.warn(e);
                    }

                });
            }



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
    private ElementCallback(self: StoryParser, config: MarkerConfig, element: JQuery, textEl: JQuery, headline: string, info: StoryInfo, page: number)
    {
        this.EventHandler.CallEvent("preElementCallback", this, [config, element, textEl, headline, info, page]);

        var isStory = $(".storytext").length > 0;
        var isStoryText = element.is(".storytext");

        var foundWhere = info.chapter;

        if (!(page in self.FoundElemementList))
        {
            self.FoundElemementList[page] = {};
        }

        if (!(headline in self.FoundElemementList[page]))
        {
            self.FoundElemementList[page][headline] = [];
        }

        self.FoundElemementList[page][headline].push(info);

        if (self.DEBUG)
        {
            this.Info("Element Callback for ", headline, info);
            this.Log("Found at page: ", page);
            this.Log("IsStory: " + isStory + " - IsStoryText: " + isStoryText);
        }

        if (!isStory)
        {
            if ((typeof (self.DataConfig["displayOnly"]) !== "undefined") && (self.DataConfig["displayOnly"] === headline))
            {
                if (self.DEBUG)
                {
                    console.info("Display Only Mode: Match found for", element);
                }

                window.setTimeout(function ()
                {
                    element.fadeIn();
                    self.UpdateListColor();

                }, 100);

                self._hidden[page] -= 1;
            }
            else if (typeof (self.DataConfig["displayOnly"]) !== "undefined")
            {
                // Hide this Element because the Only Mode do not match

                if (self.DEBUG)
                {
                    console.log("Hide Element because of 'displayOnly' ", info);
                }

                self._hiddenElements[page][info.url] = "displayOnly";


                element.fadeOut();
                self._hidden[page] += 1;

                self.UpdateListColor();
            }
        }

        if (!isStory && !config.display)
        {
            if (self.DEBUG)
            {
                console.log("Hide Element because of Filter '" + headline + "'", info);
            }

            self._hiddenElements[page][info.url] = "Filter '" + headline + "'";

            element.hide();
            self.UpdateListColor();
            self._hidden[page] += 1;
        } else
        {
            var priority: ModififcationPriority;
            if (config.priority !== -1)
            {
                priority = {
                    background: config.priority,
                    color: config.priority,
                    highlight_color: config.priority,
                    mouseOver: config.priority,
                    text_color: config.priority
                };
            }
            else
            {
                if ((typeof (config.customPriority) !== "undefined") && (config.customPriority !== null))
                {
                    priority = config.customPriority;
                }
                else
                {
                    console.warn("Custom Priority set for Element. But Config is not defined!", config);

                    priority = {
                        background: 1,
                        color: 1,
                        highlight_color: 1,
                        mouseOver: 1,
                        text_color: 1
                    };
                }
            }

            // Suggestion Level
            if (!isStory)
            {
                // Get the old SuggestionLevel:
                var suggestionLevel = 1;
                $.each(priority, (name, data) =>
                {
                    if (data !== -1)
                    {
                        suggestionLevel *= data;
                    }
                });

                // Add Bonus if the Chapter of the found entry is earlier:
                suggestionLevel += (this.Config.story_search_depth - info.chapter);

                if (element.is("[data-suggestionLevel]"))
                {
                    suggestionLevel = Number(element.attr("data-suggestionLevel")) + suggestionLevel;
                }

                element.attr("data-suggestionLevel", suggestionLevel);
            }


            if (!isStoryText && (config.background !== null) && (config.background !== ""))
            {
                this.UpdateAttributeWithPriority(element, "background", priority.background, function ()
                {
                    element.css('background-image', 'url(' + config.background + ')')
                        .css('background-repeat', 'no-repeat')
                        .css('background-position', 'right');
                });
            }

            if (!isStoryText && (typeof (config.image) !== "undefined") && (config.image !== null) && (config.image !== "") && (config.image !== " "))
            {
                self.Log("Adds Filter-Image to Element: ", element, config);

                var img = $("<img></img>").attr("src", config.image)
                    .css("width", "20px")
                    .css("height", "20px")
                    .css("margin-left", "15px")
                    .addClass("parser-msg");

                if (!isStory)
                {
                    element.find("a").last().after(img);
                }
                else
                {
                    var appendTo = element.children().filter("a").last();
                    self.Log("Add Image to Story ...", appendTo, img);

                    appendTo.after(img);
                }
            }

            if (config.mark_chapter)
            {
                var markerAppend = $("<span class=\"parser-msg\"> <b>[" + headline + "-" + foundWhere + "]</b></span>")
                    .attr("title", info.sentence);

                if (!isStory)
                {
                    element.find('a').first().after(markerAppend);
                }
                else if (!isStoryText)
                {
                    element.children().filter('a').last().after(markerAppend);
                }
                else
                {
                    element.prepend(markerAppend);
                }

            }

            if (!isStoryText && !config.ignoreColor && config.text_color != null)
            {
                this.UpdateAttributeWithPriority(textEl, "color", priority.text_color, config.text_color);
            }

            var linkCheckReg = new RegExp("<a [^>]*\"[^\">]+$", "i");

            var color: string = config.color;
            var colorMo: string = config.mouseOver;

            $.each(config.keywords, function (key, keyword)
            {
                var el = (!isStory) ? element.find('div').first() : element.children().filter("div").last();
                if (el.length === 0)
                {
                    return;
                }
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

                    if (linkCheckReg.test(front))
                    {
                        // We are within a Link .. continue
                        return;
                    }

                    replace = front + '<span class="ffnet-story-highlighter" style="color:black; font-weight:bold">' + replace + '</span>' + behind;

                    text = text.replace(new RegExp(keyword, "i"), replace);

                }

                el.html(text);

            });

            if (!isStoryText && !config.ignoreColor)
            {
                if (self.DEBUG)
                {
                    console.log("[ElementCallback] Change Color of Line: ", element);
                }

                self.UpdateColor(element, color, priority.color, colorMo, priority.mouseOver);
            }


            // Sorting
            if (!this.Config.disable_resort_after_filter_match && !isStory && typeof (this.Config.sortFunction) !== "undefined" && this.Config.sortFunction !== 'default')
            {
                if (typeof (this.SortMap[this.Config.sortFunction]) !== "undefined")
                {
                    var sortfunction = this.SortMap[this.Config.sortFunction];
                    this.SortStories(sortfunction.Function, element.parent());
                }
                else
                {
                    console.warn("Unknown SortFunction: ", this.Config.sortFunction);
                    this.Config.sortFunction = 'default';
                    this.SaveConfig(false);
                }

            }

        }

        self.UpdateList(page);

        this.EventHandler.CallEvent("postElementCallback", this, [config, element, textEl, headline, info, page]);
    }


    /**
     * Callback triggered, if an highlighter was found
     * @param self The current Instance
     * @param config Highlighter Config
     * @param element The Element containing the match
     * @param link The link that was matched
     * @param page The Pafe of this Event
     */
    private HighlighterCallback(self: StoryParser, config: HighlighterConfig, element: JQuery, link: string, page: number)
    {

        if (self.DEBUG)
        {
            console.info("Highlight Element Found: ", element);
        }

        this.EventHandler.CallEvent("preHighlighterCallback", this, [config, element, link, page]);

        // Collect Data:
        var mod: ModificationBase;

        if ((typeof (config.prefab) !== "undefined") && (config.prefab !== null) && (config.prefab !== "") && (config.prefab !== " "))
        {
            if (typeof (self.Config.highlighterPrefabs[config.prefab]) !== "undefined")
            {
                mod = self.Config.highlighterPrefabs[config.prefab];
            }
            else
            {
                console.warn("Found Highlighter for Story '%s' but the refferenced Prefab '%s' was not found!", link, config.prefab);
                return;
            }
        }
        else if ((typeof (config.custom) !== "undefined") && (config.custom !== null))
        {
            mod = config.custom;
            mod.name = "Custom Highlighter";
        }
        else
        {
            // This shouldn't be neccessary, because of the Upgrade Handler
            // But if that fails, we have a extra safety rope :3

            mod = {
                name: "Legacy-Custom",
                background: null,
                color: null,
                display: !config.hide,
                ignoreColor: null,
                image: config.image,
                mark_chapter: null,
                mouseOver: null,
                text_color: null,
                priority: 1,
                note: null,
                customPriority: null,
                highlight_color: null
            };
        }



        if (!mod.display)
        {
            if (self.DEBUG)
            {
                console.log("Hide Entry because of Story Config: ", link, mod);
            }
            self._hiddenElements[link] = "storyConfig";

            element.attr("data-hiddenBy", "storyConfig");

            element.hide();
            self._hidden[page]++;
        }
        else
        {
            var priority: ModififcationPriority;
            if (mod.priority !== -1)
            {
                priority = {
                    background: mod.priority,
                    color: mod.priority,
                    highlight_color: mod.priority,
                    mouseOver: mod.priority,
                    text_color: mod.priority
                };
            }
            else
            {
                if ((typeof (mod.customPriority) !== "undefined") && (mod.customPriority !== null))
                {
                    priority = mod.customPriority;
                }
                else
                {
                    console.warn("Custom Priority set for Element. But Config is not defined!", config);

                    priority = {
                        background: 1,
                        color: 1,
                        highlight_color: 1,
                        mouseOver: 1,
                        text_color: 1
                    };
                }
            }

            // Suggestion Level

            // Get the old SuggestionLevel:
            var suggestionLevel = 1;
            $.each(priority, (name, data) =>
            {
                if (data !== -1)
                {
                    suggestionLevel *= data;
                }
            });

            if (element.is("[data-suggestionLevel]"))
            {
                suggestionLevel = Number(element.attr("data-suggestionLevel")) + suggestionLevel;
            }

            element.attr("data-suggestionLevel", suggestionLevel);



            if ((typeof (mod.image) !== "undefined") && (mod.image !== null) && (mod.image !== "") && (mod.image !== " "))
            {
                var img = $("<img></img>").attr("src", mod.image)
                    .css("width", "20px")
                    .css("height", "20px")
                    .css("margin-left", "15px")
                    .addClass("parser-msg");

                element.find("a").last().after(img);
            }

            if ((mod.background !== null) && (mod.background !== ""))
            {
                this.UpdateAttributeWithPriority(element, "background", priority.background, function ()
                {

                    element.css('background-image', 'url(' + mod.background + ')')
                        .css('background-repeat', 'no-repeat')
                        .css('background-position', 'right');
                });
            }

            if (mod.mark_chapter)
            {
                element.find('a').first().after(
                    $("<span class=\"parser-msg\"> <b>{" + mod.name + "}</b></span>")
                        .attr("title", mod.note)
                );
            }

            if (!mod.ignoreColor && mod.text_color !== null)
            {
                var textEl = element.find(".z-padtop2");
                this.UpdateAttributeWithPriority(textEl, "color", priority.text_color, mod.text_color);
            }

            var color: string = mod.color;
            var colorMo: string = mod.mouseOver;


            if (!mod.ignoreColor)
            {
                if (self.DEBUG)
                {
                    console.log("[HighlighterCallback] Change Color of Line: ", element);
                }

                self.UpdateColor(element, color, priority.color, colorMo, priority.mouseOver);
            }


            // Sorting
            if (typeof (this.Config.sortFunction) !== "undefined" && this.Config.sortFunction !== 'default')
            {
                if (typeof (this.SortMap[this.Config.sortFunction]) !== "undefined")
                {
                    var sortfunction = this.SortMap[this.Config.sortFunction];
                    this.SortStories(sortfunction.Function);
                }
                else
                {
                    console.warn("Unknown SortFunction: ", this.Config.sortFunction);
                    this.Config.sortFunction = 'default';
                    this.SaveConfig(false);
                }
            }


            self.UpdateList(page);
        }

        this.EventHandler.CallEvent("postHighlighterCallback", this, [config, element, link, page]);

    }


    /**
     *   Updates the List of found elements
     *   @param page The Page to Update
     */
    private UpdateList(page: number)
    {
        var wrapper = this._wrapperList[page];

        this.EventHandler.CallEvent("preUpdateList", this, [page, wrapper]);

        if (typeof (wrapper) === "undefined")
        {
            this.Log("UpdateList - Page Wrapper for Page " + page + " is undefined! Abort. ", this._wrapperList);
            return;
        }


        this.Log("Update List for Page: ", page);

        var text = "";

        if (this.DEBUG)
        {
            console.log("Headline-List = ", this.FoundElemementList[page]);
        }

        var headlineContainer = $("<div></div>");

        var self = this;

        $.each(this.FoundElemementList[page], function (headline, elements)
        {
            if (self.Config.marker[headline].print_story)
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

            if (self.Config.marker[headline].mention_in_headline)
            {
                text += "<b>" + headline + ":</b> " + self.FoundElemementList[page][headline].length + " ";
            }

        });

        wrapper.find('#mrhOutput').remove();

        var hiddenByStoryConfig = wrapper.find('div[data-hiddenBy="storyConfig"]');

        if (hiddenByStoryConfig.length > 0)
        {
            text += "<i>Hidden by StoryConfig</i>: " + hiddenByStoryConfig.length + " ";
        }

        var list = $('<div id=\'mrhOutput\'></div>')
            .html('<div><b>' + self._('Page') + ': ' + page + '</b></div>' + text + ' <i>' + self._('All hidden elements:') + '</i> ').append(
            $("<u></u>").text(self._hidden[page]).click(
                function (e)
                {
                    var table = $("<table></table>");
                    var modal = GUIHandler.CreateBootstrapModal(table, self._('Hidden Elements'));


                    $.each(self._hiddenElements[page], function (key, value)
                    {
                        table.append(
                            $("<tr></tr>").append(
                                $("<th></th>").append(
                                    $("<a></a>").text(self.GetStoryInfo(key).Name)
                                        .attr("href", key)
                                )
                            )
                                .append
                                (
                                $('<td style="padding-left: 15px"></td>').text(value)
                                )
                        );

                    });


                    GUIHandler.ShowModal(modal);

                    e.preventDefault();
                }

            )
                .attr("title", self._("Show the reasons for hiding"))
                .addClass("clickable")
            )
            .css('margin-bottom', '10px')
            .append(headlineContainer);

        if (hiddenByStoryConfig.length > 0)
        {
            list.append($('<a href="#">' + self._('Show Elements hidden by Story Config') + '</a>').click(function (e)
            {
                hiddenByStoryConfig.css("border", "2px solid black").slideDown();

                self.UpdateListColor();
                e.preventDefault();
            }));
        }

        wrapper.prepend(list);

        this.EventHandler.CallEvent("postUpdateList", this, [page, wrapper]);
    }

    /**
     *   Updates the colors of the elements in the story list
     */
    private UpdateListColor()
    {
        var odd = false;
        var self = this;

        $(".z-list").filter(':visible').each(function (k, e)
        {
            var el = $(e);
            var link = el.find('a').first().attr('href');
            var storyInfo = self.GetStoryInfo(link);
            var storyName = storyInfo.Name;
            var color = self.Config.color_normal;
            var colorMo = self.Config.color_mouse_over;

            if (odd)
            {
                color = self.Config.color_odd_color;
                odd = false;
            } else
            {
                odd = true;
            }


            if (!self.Config.disable_default_coloring)
            {
                self.UpdateColor(el, color, -1, colorMo, -1);
            }

        });


    }

    /**
     *   Updates the Color of a specifiy Element in the list
     *   @param element HTML-Instance of found element
     *   @param color The Color to set the Element to
     *   @param colorPriority The Priority of the Color
     *   @param colorMo The color used for the Mouse Over effect
     *   @param colorMoPriority The priority of the Mouse Over Color 
     */
    private UpdateColor(element: JQuery, color: string, colorPriority: number, colorMo: string, colorMoPriority: number)
    {
        //console.log("Update Color called! " + color + ", " + colorMo + ", " + notSetAttr);

        this.UpdateAttributeWithPriority(element, 'color', colorPriority, function ()
        {
            element.css("background-color", color);
            element.attr("data-color", color);
        });


        this.UpdateAttributeWithPriority(element, 'mouseovercolor', colorMoPriority, function ()
        {
            element.unbind("mouseenter").unbind("mouseleave");

            element.mouseenter(function ()
            {
                $(this).css('background-color', colorMo);
            }).mouseleave(function ()
            {
                $(this).css('background-color', color);
            });


            element.attr("data-mouseOverColor", colorMo);
        });

    }

    /**
     * Updates a property if the Priority if higher or equals to the current Priority
     * @param element The Target Element for the Manipulation
     * @param attribute The name of the Attrbute. If value is not a function, this is the name of the CSS Property
     * @param newPriority The Priority of the new Value
     * @param value The new value OR a callback Function with the result
     */
    private UpdateAttributeWithPriority(element: JQuery, attribute: string, newPriority: number, value: any)
    {
        var regEx = new RegExp("[ \-\_\.]", "g");
        var attributeName = "data-priority-" + attribute.replace(regEx, "");

        var current = element.attr(attributeName);
        var currentPriority: number = -100000;

        // 0 means disabled!
        if (newPriority === 0)
        {
            return;
        }

        if (typeof (current) !== "undefined")
        {
            currentPriority = Number(current);
        }

        if (currentPriority === NaN || isNaN(currentPriority))
        {
            currentPriority = -100000;
        }

        if (newPriority >= currentPriority)
        {
            if (typeof (value) === "function")
            {
                value(element);
            }
            else
            {
                element.css(attribute, value);
            }

            element.attr(attributeName, newPriority);
        }
    }

    /**
     *  Reads the content of the Story itself
     **/
    public ReadStory()
    {
        if (this.Config.disable_inStory_parsing)
        {
            return;
        }

        var storyElements = $(".storytext");
        if (storyElements.length < 1)
        {
            // We are not in a Story ...
            return;
        }

        this.EventHandler.CallEvent("preReadStory", this, storyElements);

        var self = this;

        var handleElement = function (element: JQuery)
        {
            // Remove old Elements
            element.find('.parser-msg').remove();

            element.attr("data-parsed", "true");

            var text = element.html();

            $.each(self.Config.marker, function (headline: string, config: MarkerConfig)
            {
                if (config.enabled === false)
                {
                    return;
                }

                var ignore = false;
                $.each(config.ignore, function (i: number, marker: string)
                {
                    try
                    {
                        var reg = new RegExp(marker, "i");

                        if ((marker !== "") && reg.test(text))
                        {
                            self.Log("Ignore Story because of Ignore Filter: ", marker, config);

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
                    var reg = new RegExp(".+/s/([0-9]+)/(?:([0-9]+)/?)?(?:([^#]+)/?)?");

                    var result = reg.exec(location.href);

                    var chapter = Number(element.attr("data-page"));
                    if (isNaN(chapter))
                    {
                        chapter = 0;
                    }

                    var info: StoryInfo = {
                        url: self.GetLinkToPageNumber(chapter),
                        chapter: chapter,
                        name: (result !== null && result.length > 3) ? result[3] : "Unknown",
                        element: element,
                        id: (result !== null && result.length > 1) ? result[1] : "Unknown",
                        sentence: null
                    };

                    window.setTimeout(function ()
                    {
                        self.ElementCallback(self, config, element, element.children().filter("span").last(), headline, info, chapter);

                    }, 500);

                }

            });
        };

        handleElement($("#profile_top"));

        $.each(storyElements.not('[data-parsed]'), function (index, element: JQuery)
        {
            element = $(element);

            handleElement(element);
        });

        this.EventHandler.CallEvent("postReadStory", this, storyElements);
    }


    /**
    *   Enables the In Story Highlighter (Story View)
    */
    public EnableInStoryHighlighter()
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
        var field = body.find('#profile_top').first().find("b").first();

        if (field.length === 0)
        {
            return;
        }

        body.find(".parser-msg").remove();

        var contextMenu = $("<div></div>")
            .css("width", "20px")
            .css("height", "20px")
            .css("float", "right")
            .addClass("parser-msg")
            .addClass("context-menu")
            .append(
            $("<img></img>")
                .attr("src", this.Api.GetUrl("edit.gif"))
                .css("width", "100%")
                .css("height", "100%")
            );

        var info = this.GetStoryInfo(document.location.href);
        body.find('#profile_top').attr("data-elementident", info.ID);

        var self = this;

        // Open GUI
        contextMenu.click(function ()
        {
            self.Gui.ShowStoryPrefabList({
                url: document.location.pathname,
                element: body.find('#profile_top'),
                name: field.text(),
                id: info.ID
            });

        });

        field.after(contextMenu);

        var highlighterKey = self.Config.highlighter_use_storyID ? info.ID : document.location.pathname;
        // Highlighter found:
        if (typeof (this.Config['highlighter'][highlighterKey]) !== "undefined")
        {
            if (this.DEBUG)
            {
                console.info("Highlight Element Found");
            }

            var config = this.Config['highlighter'][highlighterKey];


            // Collect Data:
            var mod: ModificationBase;

            if ((typeof (config.prefab) !== "undefined") && (config.prefab !== null) && (config.prefab !== "") && (config.prefab !== " "))
            {
                if (typeof (self.Config.highlighterPrefabs[config.prefab]) !== "undefined")
                {
                    mod = self.Config.highlighterPrefabs[config.prefab];
                }
                else
                {
                    console.warn("Found Highlighter for Story '%s' but the refferenced Prefab '%s' was not found!", document.location.pathname, config.prefab);
                    return;
                }
            }
            else if ((typeof (config.custom) !== "undefined") && (config.custom !== null))
            {
                mod = config.custom;
                mod.name = "Custom Highlighter";
            }
            else
            {
                // This shouldn't be neccessary, because of the Upgrade Handler
                // But if that fails, we have a extra safety rope :3

                mod = {
                    name: "Legacy-Custom",
                    background: null,
                    color: null,
                    display: !config.hide,
                    ignoreColor: null,
                    image: config.image,
                    mark_chapter: null,
                    mouseOver: null,
                    text_color: null,
                    priority: 1,
                    note: null,
                    customPriority: null,
                    highlight_color: null
                };
            }

            var priority: ModififcationPriority;
            if (mod.priority !== -1)
            {
                priority = {
                    background: mod.priority,
                    color: mod.priority,
                    highlight_color: mod.priority,
                    mouseOver: mod.priority,
                    text_color: mod.priority
                };
            }
            else
            {
                if ((typeof (mod.customPriority) !== "undefined") && (mod.customPriority !== null))
                {
                    priority = mod.customPriority;
                }
                else
                {
                    console.warn("Custom Priority set for Element. But Config is not defined!", config);

                    priority = {
                        background: 1,
                        color: 1,
                        highlight_color: 1,
                        mouseOver: 1,
                        text_color: 1
                    };
                }
            }


            if ((typeof (mod.image) !== "undefined") && (mod.image !== null) && (mod.image !== "") && (mod.image !== " "))
            {
                var img = $("<img></img>").attr("src", mod.image)
                    .css("width", "20px")
                    .css("height", "20px")
                    .css("margin-left", "15px")
                    .addClass("highlight-msg")
                    .addClass("parser-msg");

                field.after(img);
            }

            if ((mod.background !== null) && (mod.background !== ""))
            {
                this.UpdateAttributeWithPriority(body.find('#profile_top'), "background", priority.background, function ()
                {

                    body.find('#profile_top').css('background-image', 'url(' + mod.background + ')')
                        .css('background-repeat', 'no-repeat')
                        .css('background-position', 'right');
                });
            }

            if (mod.mark_chapter)
            {
                body.find('#profile_top').find('.icon-mail-1').first().after(
                    $("<span class=\"parser-msg\"> <b>{" + mod.name + "}</b></span>")
                        .attr("title", mod.note)
                );
            }


            if (!mod.ignoreColor && mod.text_color !== null)
            {
                var textEl = body.find('#profile_top').children().filter("span").last();
                this.UpdateAttributeWithPriority(textEl, "color", priority.text_color, mod.text_color);
            }

            var color: string = mod.color;
            var colorMo: string = mod.mouseOver;


            if (!mod.ignoreColor)
            {
                if (self.DEBUG)
                {
                    console.log("[HighlighterCallback] Change Color of Line: ", body.find('#profile_top'));
                }

                self.UpdateColor(body.find('#profile_top'), color, priority.color, colorMo, priority.mouseOver);
            }

        }



    }

    /**
    *   Go to a specific Paragraph on the page
    *   @param id Paragraph Number
    */
    private GoToParagraphID(id)
    {
        $($("p")[id]).before('<a name="goto" id="gotoMarker"></a>');
        location.href = '#goto';
        $("#gotoMarker").remove();
    }


    /**
     * Enable the Reading Aid Function
     * @param container The Container to enable the Reading Aid for
     */
    public EnableReadingAid(container: JQuery = null)
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

        if (this.Config.readingHelp_enabled === true)
        {
            var data = "";

            if ((this.Config.readingHelp_backgroundColor !== null) && (this.Config.readingHelp_backgroundColor !== ""))
            {
                data = "background-color: " + this.Config.readingHelp_backgroundColor + ";";
            }
            if ((this.Config.readingHelp_color !== null) && (this.Config.readingHelp_color !== ""))
            {
                data += " color: " + this.Config.readingHelp_color + ";";
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

        if (!this.Config.disable_parahraphMenu)
        {
            if (this.ParagramMenu === null)
            {
                // Load the Paragraph Menu
                this.ParagramMenu = new ParagraphMenu(this);
            }
            else
            {
                this.ParagramMenu.AddHandler(container);
            }
        }
    }




    /**
     * Adds the Chapter/Review Ration Information
     * @param element z-list Instance
     */
    private ManageChapterReviewRatio(element: JQuery): void
    {
        element.attr("data-chapterReviewRatio", 0);

        if (this.Config.enable_chapter_review_ratio)
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

                element.attr("data-chapterReviewRatio", fixed);

            }
        }
    }


    /**
     *  Manages the Read Chapter Info Feature
     */
    private ManageReadChaptersInfo(overwrite: boolean = false)
    {
        if (!overwrite && this.Config.enable_read_chapter_info === false)
        {
            return;
        }

        var isStory = ($(".z-list").length === 0);

        var elements = undefined;
        var ids: string[] = [];

        if (!isStory)
        {
            elements = $(".z-list[data-storyid]");


            var idELMap: { [index: string]: JQuery } = {};

            elements.each(function (i, el)
            {
                var element = $(el);
                var id = element.attr("data-StoryId");

                ids.push(id);
                idELMap[id] = element;
            });
        }
        else
        {
            var info = this.GetStoryInfo(document.location.href);

            if (info.ID !== null)
            {
                ids.push(info.ID);
            }
            else
            {
                return;
            }
        }

        var self = this;

        this.Api.GetReadChapters(ids, function (result, lastChapters)
        {
            $.each(result, function (id: string, chapters: number[])
            {
                if (!isStory)
                {
                    if (typeof (idELMap[id]) !== "undefined")
                    {
                        var element = idELMap[id];
                        var textContainer = element.find(".z-padtop2").last();

                        element.find(".ffnetReadChapterInfo").remove();

                        var insert = $('<span class="ffnetReadChapterInfo"></span>')
                            .html("<b>" + chapters.length + "</b>/")
                            .attr("title", "Chapters: " + chapters.join(", ") + " - Last Chapter opened: " + lastChapters[id]);

                        var text = textContainer.html();

                        textContainer.html(text.replace("Chapters: ", "Chapters: " + insert[0].outerHTML));

                        self.Log("Chapter Read for Story: " + id, chapters);
                    }
                }
                else
                {
                    var chapterSelects = $('select[id="chap_select"]');
                    chapterSelects.children().each(function (i, el)
                    {
                        var element = $(el);

                        if (chapters.indexOf(Number(element.attr("value"))) !== -1)
                        {
                            element.text(self.Config.reading_info_ChapterMarker.replace("{Name}", element.text()));
                        }

                    });

                    var infoContainer = $("#profile_top").find(".xgray");

                    infoContainer.html(infoContainer.html().replace("- Words", "- Last Read Chapter: " + lastChapters[id] + " - Words"));
                }
            });
        });

    }



    /**
    *   Enables the Pocket Save Feature (Story View)
    */
    public EnablePocketSave()
    {
        var self = this;

        if (this.LOAD_INTERNAL)
        {
            return;
        }

        var user = this.Config['pocket_user'];
        var password = this.Config['pocket_password'];

        var body = $("body");

        if ((user == null) || (password == null))
        {
            console.log("Disables Pocket Save Function");
            return;
        }

        var field = body.find("#profile_top").find("b");


        var options = {
            'all': this._("From this chapter to the End"),
            '1': this._("One Chapter"),
            '2': this._("Two Chapters"),
            '5': this._("Five Chapters"),
            '10': this._("Ten Chapters")
        };

        var select = $("<select></select>")
            .css("margin-left", "20px")
            .change(function ()
            {
                $("#ffnet-pocket-save-button").removeAttr("disabled")
                    .html(self._("Save To Pocket"));

            });

        $.each(options, function (key, value)
        {
            select.append(
                $("<option></option>")
                    .text(value)
                    .attr("value", key)
            );

        });



        field.after(
            $('<button class="btn">' + this._('Save To Pocket') + '</button>')
                .click(function ()
                {
                    var option = select.children().filter(":selected").first().attr("value");

                    self.Log("Selected Option: ", option);


                    self.ParsePocket(document.location.pathname, field.text() + ": ", option);

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
    private ParsePocket(url: string, prefix: string, length: any, currentDepth: number = 1)
    {
        if (typeof (prefix) === "undefined")
        {
            prefix = "";
        }

        if ((typeof (length) === "undefined") || (length === "all"))
        {
            length = 100;
        }


        var user = this.Config['pocket_user'];
        var password = this.Config['pocket_password'];


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
                var data = url = self.GetUrlFromButton(next);

                if (data != null)
                {
                    setTimeout(function ()
                    {
                        self.ParsePocket(data, prefix, length, currentDepth + 1);
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

    private _endlessRequestPending = false;

    private _endlessRequestsDone = 0;

    /**
     * Enabled the EndlessMode 
     */
    public EnableEndlessMode()
    {
        var self = this;

        if (!this.Config.endless_enable)
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
                if (isNaN(lastPage))
                {
                    console.log("Error parsing Page Number!");
                    return;
                }

                self.AppendPageContent(lastPage + 1);
            }
        };



    }


    /**
     * Loads the Content of a Page  and returns the Data as JQuery Object
     * @param url The Request URI
     * @param callback The callback Function
     */
    public GetPageContent(url: string, callback: (page: JQuery) => void)
    {
        if (this.DEBUG)
        {
            console.log("Requesting page: ", url);
        }

        var self = this;

        $.get(url, function (content)
        {
            var data = $(content);

            callback(data);
        });


    }

    public GetCurrentPage(): number
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

            var page = Number(pageNumber.attr("value"));

            return (isNaN(page) ? 1 : page);
        }
    }

    private CreateWrapper(page: number): JQuery
    {
        var wrapper = $("<div></div>").addClass("ffNetPageWrapper")
            .attr("data-page", page);

        this._wrapperList[page] = wrapper;

        return wrapper;
    }

    private CreatePageWrapper(elements: JQuery = null, currentPage: number = null): JQuery
    {
        // Wrap the current Page into a PageWrapper

        if (typeof (currentPage) === "undefined" || currentPage === null)
        {
            currentPage = this.GetCurrentPage();
        }

        var ignoreUserPage = false;

        if (this.DEBUG)
        {
            console.log("Current Page: ", currentPage);
        }

        if (elements === null || typeof (elements) === "undefined")
        {
            elements = $(".z-list");
        }
        else
        {
            this.Log("Explicit Data specified for Page Wrapper");
            ignoreUserPage = true;
        }

        if (elements.length !== 0)
        {

            var wrapper = $(".ffNetPageWrapper");
            if (wrapper.length === 0)
            {
                wrapper = this.CreateWrapper(currentPage);
            }

            var notWrapped = elements.filter('[data-wrapped!="wrapped"]');

            if (!ignoreUserPage && this._inUsersPage)
            {
                notWrapped = notWrapped.filter(".mystories");

                // Create wrapper for Favs:
                this.Log("Create Page Wrapper for Favs");

                var favWrapper = this.CreatePageWrapper(elements.filter('.favstories'), 2);

                this.Read(favWrapper);
            }

            if (notWrapped.length !== 0)
            {
                if (this.DEBUG)
                {
                    console.log("Not Wrapped Elements found:", notWrapped);
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

    public GetLinkToPageNumber(page: number): string
    {
        var domainRegex = new RegExp("https?://[^/]+");
        var domainData = domainRegex.exec(location.href);
        if (domainData === null || domainData.length === 0)
        {
            console.warn("Can't get the current Location. Reason: Domain unknown. Possible Explaination: Loaded locally");
            return document.location.href;
        }

        var domain = domainData[0];

        // Regex used to get the Pagenumber
        var regex = new RegExp("([?|&]p)=[0-9]+");
        var container = $("center").first().find("a").first();

        if (container.length > 0)
        {
            var href = container.attr("href");

            return domain + href.replace(regex, "$1=" + page);
        }
        else if ($('button:contains(Next)').length > 0)
        {
            var next = $('button:contains(Next)').first();

            var url = this.GetUrlFromButton(next);

            regex = new RegExp("s/([0-9]+)/[0-9]+/");

            return domain + url.replace(regex, "s/$1/" + page + "/");
        }
        else
        {
            // Try to parse the current Location:
            regex = new RegExp("s/([0-9]+)/([0-9]+)/");
            var result = regex.exec(document.location.href);

            if (result.length === 3)
            {
                return document.location.href.replace(regex, "s/$1/" + page + "/");
            }
            else
            {
                console.warn("Can't get Link to Chapter! If this happens often, please report!");
                return document.location.href;
            }

        }
    }

    private LoadElementsFromPage(page: number, callback: (data: JQuery) => void)
    {
        var self = this;

        var url = this.GetLinkToPageNumber(page);

        this.GetPageContent(url, function (res)
        {
            var elements = res.find(".z-list");
            var wrapper = self.CreateWrapper(page);

            wrapper.append(elements);

            callback(wrapper);

        });
    }

    private LoadChapterFromPage(page: number, callback: (page: JQuery) => void)
    {
        var self = this;
        var url = this.GetLinkToPageNumber(page);

        this.GetPageContent(url, function (res)
        {
            var story = res.find(".storytext").first();

            story.removeAttr("id").attr("data-page", page);

            callback(story);
        });
    }

    public AppendPageContent(page: number)
    {
        var self = this;

        if (this._endlessRequestPending)
        {
            return;
        }

        this._endlessRequestPending = true;

        var isStroy = ($(".z-list").length === 0);

        this.Log("Appending Page Content. Page: " + page + " - IsStory: ", isStroy);

        var loadingElement = $("<div><center><b>Loading ...</b></center></div>");;



        this._endlessRequestsDone++;
        var overLimit = this._endlessRequestsDone > this.Config.endless_forceClickAfter;

        if (!overLimit)
        {

            if (isStroy)
            {
                var lastPage = $(".storytext").last();

                this.Log("LastPage: ", lastPage);

                lastPage.after(loadingElement);

                this.Log("Loading Element added ....");

                this.LoadChapterFromPage(page, function (chapter)
                {
                    self.Log("Server Answer Received", chapter);


                    loadingElement.remove();

                    // Add Page Name:
                    chapter.prepend("<hr /><center><b>Page: " + page + "</b></center><hr />");


                    chapter.hide();

                    lastPage.after(chapter);

                    if (self.Config.allow_copy)
                    {
                        self.Log("Allow Selection of Text");
                        $(".nocopy").removeClass("nocopy").parent().attr("style", "padding: 0px 0.5em;");
                    }

                    self.EnableReadingAid(chapter);

                    // Copy Classes and styles from main Container:
                    chapter.attr("class", $("#storytext").attr("class"))
                        .attr("style", $("#storytext").attr("style"));

                    chapter.slideDown();

                    self.ReadStory();

                    window.setTimeout(function ()
                    {
                        self._endlessRequestPending = false;
                    }, 1000);
                });

            }
            else
            {
                var lastWrapper = $(".ffNetPageWrapper").last();

                this.Log("LastWrapper: ", lastWrapper);

                lastWrapper.after(loadingElement);

                this.Log("Loading Element added ....");

                this.LoadElementsFromPage(page, function (wrapper)
                {
                    self.Log("Server Answer Received", wrapper);


                    loadingElement.remove();

                    // Set new elements as wrapped
                    wrapper.find(".z-list").attr("data-wrapped", "wrapped");

                    wrapper.hide();


                    lastWrapper.after(wrapper);

                    self.Read(wrapper);

                    wrapper.slideDown();

                    self.UpdateListColor();

                    window.setTimeout(function ()
                    {
                        self._endlessRequestPending = false;
                    }, 1000);
                });
            }
        }
        else
        {
            // Add a Load New Page Button:
            var button = $('<button class="btn"></button>')
                .text(this._('Load Next Page'))
                .click(function (e)
                {
                    e.preventDefault();

                    location.href = self.GetLinkToPageNumber(page);
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


    // ---- Sort Function -------

    public SortStories(sortFunction: (list: JQuery[]) => JQuery[], container?: JQuery)
    {
        this.Log("Sort Stories", sortFunction, container);

        if (typeof (sortFunction) === "undefined")
        {
            console.log("No Sort Function defined. Abort");
            return;
        }

        var self = this;

        var handleElement = function (elementContainer: JQuery)
        {
            var elements = elementContainer.children().filter(".z-list").detach();
            var list: JQuery[] = [];
            $.each(elements, (i, el) =>
            {
                list.push(el);
            });

            var newList = sortFunction(list);

            $.each(newList, (i, element) =>
            {
                elementContainer.append(element);

            });

            self.UpdateListColor();

        };

        if (typeof (container) === "undefined")
        {
            var pages = $(".ffNetPageWrapper");

            $.each(pages, (index, page: JQuery) =>
            {
                page = $(page);

                handleElement(page);
            });
        }
        else
        {
            handleElement(container);
        }
    }

    public SortElementIdent(list: JQuery[]): JQuery[]
    {
        list.sort((a: JQuery, b: JQuery) =>
        {
            return Number($(a).attr("data-elementident")) - Number($(b).attr("data-elementident"));
        });

        return list;
    }

    public SortElementIdentDESC(list: JQuery[]): JQuery[]
    {
        list.sort((a: JQuery, b: JQuery) =>
        {
            return Number($(b).attr("data-elementident")) - Number($(a).attr("data-elementident"));
        });

        return list;
    }

    public SortSuggestionLevel(list: JQuery[]): JQuery[]
    {
        list.sort((a: JQuery, b: JQuery) =>
        {
            return Number($(a).attr("data-suggestionLevel")) - Number($(b).attr("data-suggestionLevel"));
        });

        return list;
    }


    public SortSuggestionLevelDESC(list: JQuery[]): JQuery[]
    {
        list.sort((a: JQuery, b: JQuery) =>
        {
            return Number($(b).attr("data-suggestionLevel")) - Number($(a).attr("data-suggestionLevel"));
        });

        return list;
    }


    public SortChapterReviewRatio(list: JQuery[]): JQuery[]
    {
        list.sort((a: JQuery, b: JQuery) =>
        {
            return Number($(a).attr("data-chapterReviewRatio")) - Number($(b).attr("data-chapterReviewRatio"));
        });

        return list;
    }

    public SortChapterReviewRatioDESC(list: JQuery[]): JQuery[]
    {
        list.sort((a: JQuery, b: JQuery) =>
        {
            return Number($(b).attr("data-chapterReviewRatio")) - Number($(a).attr("data-chapterReviewRatio"));
        });

        return list;
    }

    public SortChapterCount(list: JQuery[]): JQuery[]
    {
        var regex = new RegExp("Chapters: ([0-9,.]+)", "i");

        list.sort((a: JQuery, b: JQuery) =>
        {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is("[data-chapterCount]"))
            {
                numA = Number(a.attr("data-chapterCount"));
            }
            else
            {
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));

                a.attr("data-chapterCount", numA);
            }

            if (b.is("[data-chapterCount]"))
            {
                numB = Number(b.attr("data-chapterCount"));
            }
            else
            {
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));

                b.attr("data-chapterCount", numB);
            }

            return numA - numB;
        });

        return list;
    }


    public SortChapterCountDESC(list: JQuery[]): JQuery[]
    {
        var regex = new RegExp("Chapters: ([0-9,.]+)", "i");

        list.sort((a: JQuery, b: JQuery) =>
        {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is("[data-chapterCount]"))
            {
                numA = Number(a.attr("data-chapterCount"));
            }
            else
            {
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));

                a.attr("data-chapterCount", numA);
            }

            if (b.is("[data-chapterCount]"))
            {
                numB = Number(b.attr("data-chapterCount"));
            }
            else
            {
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));

                b.attr("data-chapterCount", numB);
            }

            return numB - numA;
        });

        return list;
    }

    public SortWordsCount(list: JQuery[]): JQuery[]
    {
        var regex = new RegExp("Words: ([0-9,.]+)", "i");

        list.sort((a: JQuery, b: JQuery) =>
        {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is("[data-wordCount]"))
            {
                numA = Number(a.attr("data-wordCount"));
            }
            else
            {
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));

                a.attr("data-wordCount", numA);
            }

            if (b.is("[data-wordCount]"))
            {
                numB = Number(b.attr("data-wordCount"));
            }
            else
            {
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));

                b.attr("data-wordCount", numB);
            }

            return numA - numB;
        });

        return list;
    }


    public SortWordsCountDESC(list: JQuery[]): JQuery[]
    {
        var regex = new RegExp("Words: ([0-9,.]+)", "i");

        list.sort((a: JQuery, b: JQuery) =>
        {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is("[data-wordCount]"))
            {
                numA = Number(a.attr("data-wordCount"));
            }
            else
            {
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));

                a.attr("data-wordCount", numA);
            }

            if (b.is("[data-wordCount]"))
            {
                numB = Number(b.attr("data-wordCount"));
            }
            else
            {
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));

                b.attr("data-wordCount", numB);
            }


            return numB - numA;
        });

        return list;
    }

    public SortFollows(list: JQuery[]): JQuery[]
    {
        var regex = new RegExp("Follows: ([0-9,.]+)", "i");

        list.sort((a: JQuery, b: JQuery) =>
        {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is("[data-follows]"))
            {
                numA = Number(a.attr("data-follows"));
            }
            else
            {
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));

                a.attr("data-follows", numA);
            }

            if (b.is("[data-follows]"))
            {
                numB = Number(b.attr("data-follows"));
            }
            else
            {
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));

                b.attr("data-follows", numB);
            }

            return numA - numB;
        });

        return list;
    }


    public SortFollowsDESC(list: JQuery[]): JQuery[]
    {
        var regex = new RegExp("Follows: ([0-9,.]+)", "i");

        list.sort((a: JQuery, b: JQuery) =>
        {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is("[data-follows]"))
            {
                numA = Number(a.attr("data-follows"));
            }
            else
            {
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));

                a.attr("data-follows", numA);
            }

            if (b.is("[data-follows]"))
            {
                numB = Number(b.attr("data-follows"));
            }
            else
            {
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));

                b.attr("data-follows", numB);
            }

            return numB - numA;
        });

        return list;
    }

    public SortFavs(list: JQuery[]): JQuery[]
    {
        var regex = new RegExp("Favs: ([0-9,.]+)", "i");

        list.sort((a: JQuery, b: JQuery) =>
        {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is("[data-favs]"))
            {
                numA = Number(a.attr("data-favs"));
            }
            else
            {
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));

                a.attr("data-favs", numA);
            }

            if (b.is("[data-favs]"))
            {
                numB = Number(b.attr("data-favs"));
            }
            else
            {
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));

                b.attr("data-favs", numB);
            }

            return numA - numB;
        });

        return list;
    }


    public SortFavsDESC(list: JQuery[]): JQuery[]
    {
        var regex = new RegExp("Favs: ([0-9,.]+)", "i");

        list.sort((a: JQuery, b: JQuery) =>
        {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is("[data-favs]"))
            {
                numA = Number(a.attr("data-favs"));
            }
            else
            {
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));

                a.attr("data-favs", numA);
            }

            if (b.is("[data-favs]"))
            {
                numB = Number(b.attr("data-favs"));
            }
            else
            {
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));

                b.attr("data-favs", numB);
            }

            return numB - numA;
        });

        return list;
    }


    public SortReviews(list: JQuery[]): JQuery[]
    {
        var regex = new RegExp("Reviews: ([0-9,.]+)", "i");

        list.sort((a: JQuery, b: JQuery) =>
        {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is("[data-reviews]"))
            {
                numA = Number(a.attr("data-reviews"));
            }
            else
            {
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));

                a.attr("data-reviews", numA);
            }

            if (b.is("[data-reviews]"))
            {
                numB = Number(b.attr("data-reviews"));
            }
            else
            {
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));

                b.attr("data-reviews", numB);
            }

            return numA - numB;
        });

        return list;
    }


    public SortReviewsDESC(list: JQuery[]): JQuery[]
    {
        var regex = new RegExp("Reviews: ([0-9,.]+)", "i");

        list.sort((a: JQuery, b: JQuery) =>
        {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is("[data-reviews]"))
            {
                numA = Number(a.attr("data-reviews"));
            }
            else
            {
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));

                a.attr("data-reviews", numA);
            }

            if (b.is("[data-reviews]"))
            {
                numB = Number(b.attr("data-reviews"));
            }
            else
            {
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));

                b.attr("data-reviews", numB);
            }


            return numB - numA;
        });

        return list;
    }


    public SortPublishTime(list: JQuery[]): JQuery[]
    {

        list.sort((a: JQuery, b: JQuery) =>
        {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is("[data-publishTime]"))
            {
                numA = Number(a.attr("data-publishTime"));
            }
            else
            {
                var dataA = a.find('span[data-xutime]');
                numA = (dataA.length === 1) ? Number(dataA.first().attr('data-xutime')) : Number(dataA.last().attr('data-xutime'));

                a.attr("data-publishTime", numA);
            }

            if (b.is("[data-publishTime]"))
            {
                numB = Number(b.attr("data-publishTime"));
            }
            else
            {
                var dataB = a.find('span[data-xutime]');
                numB = (dataB.length === 1) ? Number(dataB.first().attr('data-xutime')) : Number(dataB.last().attr('data-xutime'));

                b.attr("data-publishTime", numB);
            }

            return numA - numB;
        });

        return list;
    }

    public SortPublishTimeDESC(list: JQuery[]): JQuery[]
    {

        list.sort((a: JQuery, b: JQuery) =>
        {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is("[data-publishTime]"))
            {
                numA = Number(a.attr("data-publishTime"));
            }
            else
            {
                var dataA = a.find('span[data-xutime]');
                numA = (dataA.length === 1) ? Number(dataA.first().attr('data-xutime')) : Number(dataA.last().attr('data-xutime'));

                a.attr("data-publishTime", numA);
            }

            if (b.is("[data-publishTime]"))
            {
                numB = Number(b.attr("data-publishTime"));
            }
            else
            {
                var dataB = a.find('span[data-xutime]');
                numB = (dataB.length === 1) ? Number(dataB.first().attr('data-xutime')) : Number(dataB.last().attr('data-xutime'));

                b.attr("data-publishTime", numB);
            }

            return numB - numA;
        });

        return list;
    }

    public SortUpdateTime(list: JQuery[]): JQuery[]
    {

        list.sort((a: JQuery, b: JQuery) =>
        {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is("[data-updateTime]"))
            {
                numA = Number(a.attr("data-updateTime"));
            }
            else
            {
                var dataA = a.find('span[data-xutime]');
                numA = (dataA.length === 1) ? 9999999999 : Number(dataA.first().attr('data-xutime'));

                a.attr("data-updateTime", numA);
            }

            if (b.is("[data-updateTime]"))
            {
                numB = Number(b.attr("data-updateTime"));
            }
            else
            {
                var dataB = a.find('span[data-xutime]');
                numB = (dataB.length === 1) ? 9999999999 : Number(dataB.first().attr('data-xutime'));

                b.attr("data-updateTime", numB);
            }

            return numA - numB;
        });

        return list;
    }

    public SortUpdateTimeDESC(list: JQuery[]): JQuery[]
    {

        list.sort((a: JQuery, b: JQuery) =>
        {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is("[data-updateTime]"))
            {
                numA = Number(a.attr("data-updateTime"));
            }
            else
            {
                var dataA = a.find('span[data-xutime]');
                numA = (dataA.length === 1) ? 9999999999 : Number(dataA.first().attr('data-xutime'));

                a.attr("data-updateTime", numA);
            }

            if (b.is("[data-updateTime]"))
            {
                numB = Number(b.attr("data-updateTime"));
            }
            else
            {
                var dataB = a.find('span[data-xutime]');
                numB = (dataB.length === 1) ? 9999999999 : Number(dataB.first().attr('data-xutime'));

                b.attr("data-updateTime", numB);
            }

            return numB - numA;
        });

        return list;
    }


    // ----- API-Interface ------






    /**
     *   Activates Debug Options
     */
    public DebugOptions()
    {
        if (this.DEBUG)
        {


        }
    }





    // --------------------------

    /**
     *   Save Config
     */
    public SaveConfig(saveToCloud = true): boolean
    {
        try
        {
            if (typeof (this.Config.config_key) === "undefined")
            {
                console.warn("Config Key is Undefined!");
                return false;
            }

            localStorage[this.Config.config_key] = JSON.stringify(this.Config);

            // Save to Chrome Sync API:
            if ((typeof (chrome) !== "undefined") && (typeof (chrome.runtime) !== "undefined") && (this.Config.chrome_sync === true) && saveToCloud)
            {
                chrome.storage.sync.set(this.Config, function ()
                {
                    console.info("Config saved to Cloud!");
                });
            }

            return true;

        } catch (e)
        {
            console.warn(e);
            console.log("Current Config: ", this.Config);

            return false;
        }

    }

    /**
     *   Save to the session storage
     */
    public SaveDataStore()
    {
        this.SaveToMemory(sessionStorage, this.Config.dataStorage_key, this.DataConfig);

        if (this.DEBUG)
        {
            console.info("Save to Memory: ", this.DataConfig);
        }
    }

    /**
     *   Loads Config from Memory
     */
    public GetConfig()
    {
        return JSON.stringify(this.Config);
    }



    /**
     *   Overwrites the config with a new one
     *   @param newConfig New Config
     */
    public SetConfig(newConfig: any)
    {
        if (confirm('Are you shure to overwrite the Config? This will overwrite all your changes!'))
        {
            var data = JSON.parse(newConfig);
            this.Config = data;

            this.SaveConfig();
        }
    }


    // -------- Multiuse Functions ---------

    /**
     *   Load a JSON-Text from Memory
     *   @param memory Memory to load from
     *   @param key Key of element
     *   @result desearialized Object
     */
    public LoadFromMemory(memory: any, key: string): any
    {
        if ((memory[key] !== "undefined") &&
            (memory[key] !== "null") &&
            typeof (memory[key]) !== "undefined" &&
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
    public SaveToMemory(memory: any, key: string, object: any)
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
    private GetUrlFromButton(button: JQuery): string
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
    public Log(a: any, b?: any, c?: any)
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
    public Info(a: any, b?: any, c?: any)
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

    /**
     * Executa a function with all Debug Messages
     * @param data Funcion to execute
     */
    public ExecVerbose(data: () => void)
    {
        this.VERBOSE = true;
        data();
        this.VERBOSE = false;
    }

    /**
     * Activate full Debug Messages for a certain time
     * @param time Duration of full Debug Log
     */
    public ActivateVerbose(time: number = 500)
    {
        this.VERBOSE = true;

        var self = this;
        window.setTimeout(function ()
        {
            self.VERBOSE = false;
        }, time);

    }


    /**
     *   Gets the Version Ident Number
     *   @param name Name of the Version
     *   @result Version Ident Number
     */
    public GetVersionId(name: string): number
    {
        var parts = name.split(".");
        var version = 0;

        for (var i = 0; i < parts.length; i++)
        {
            version += Number(parts[i]) * Math.pow(100, (parts.length - i - 1));
        }

        return version;
    }

    // ---------- Localization

    /**
     *   Returns the Language Value for a specific Key
     *   @param key The Key to search for
     *   @result Value in selected Language 
     */
    public _(key: string): string
    {
        if (typeof (this.CurrentLanguage) !== "undefined"
            && this.CurrentLanguage !== null
            && typeof (this.CurrentLanguage[key]) !== "undefined"
            && this.CurrentLanguage[key] !== "")
        {
            return this.CurrentLanguage[key];
        }


        return key;

    }

}

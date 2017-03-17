/// <reference path="_reference.ts" /> 
var StoryParser = (function () {
    function StoryParser() {
        /**
         * The DEBUG Option.
         * Can be enabled with a Config option or when a dev Version is used.
         */
        this.DEBUG = true;
        /**
         * Print all Events to the console.
         */
        this.VERBOSE = true;
        /**
         * Do not use a stored Version from the Auto Updater.
         */
        this.IGNORE_NEW_VERSION = false;
        /**
         * The current Version.
         * Is replaced by Grunt.
         */
        this.VERSION = "@@VERSION";
        /**
         * The current Git Branch.
         * IS replaced by Grunt.
         */
        this.BRANCH = "@@BRANCH"; // dev
        /**
         * A stored version of the Script is used
         */
        this.LOAD_INTERNAL = false;
        /**
         *  The Event-Handler used for processing
         */
        this.EventHandler = new EventHandler(this);
        /**
         * The Controller used to handle API-Requests
         */
        this.Api = new ApiController(this);
        /**
         * The Config of the Script
         */
        this.Config = {
            // Story:
            story_search_depth: 2,
            mark_M_storys: true,
            hide_non_english_storys: true,
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
            endless_enable: false,
            endless_forceClickAfter: 5,
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
        this.BaseConfig = $.extend({}, this.Config);
        /**
         *  The Selector of the Main-Elements (example: self.MainElementSelector)
         */
        this.MainElementSelector = undefined;
        // ----------------------
        /**
         * The number of hidden Elements
         */
        this._hidden = {};
        /**
         * The hidden elements and the reason for hiding.
         * Index: Link, Value: reason
         */
        this._hiddenElements = {};
        /**
         * List of found Elements
         * Key: Headline, Value: List of Links
         */
        this.FoundElemementList = {};
        /**
         *  The List of PageWrapper for every page
         */
        this._wrapperList = {};
        /**
         * Cache for in story search
         */
        this._storyCache = {};
        /**
         * Config that is only available in this session
         */
        this.DataConfig = {};
        /**
         * The Container for the GUI
         */
        this._guiContainer = null;
        /**
         * The List of pendig requests
         * Index: ElementID - data-ElementIdent Attribute
         */
        this._requestsPending = {};
        /**
         * The Last used for an Element in the List
         */
        this._lastElementID = 0;
        /**
         *  The currently selected Language
         */
        this.CurrentLanguage = null;
        /**
         * The List of Available Language Elements
         **/
        this.AvailableLanguges = null;
        /**
         *  The name mapping for the Sort Function
         **/
        this.SortMap = {
            "default": {
                Function: this.SortElementIdent,
                Name: this._('Default Sorting')
            },
            "defaultDESC": {
                Function: this.SortElementIdentDESC,
                Name: this._('Default Sorting [Inverted]')
            },
            "suggestion": {
                Function: this.SortSuggestionLevel,
                Name: this._('Suggested [Lowest Up]')
            },
            "suggestionDESC": {
                Function: this.SortSuggestionLevelDESC,
                Name: this._('Suggested [Highest Up]')
            },
            "chapters": {
                Function: this.SortChapterCount,
                Name: this._('Chapter Count [Lowest Up]')
            },
            "chaptersDESC": {
                Function: this.SortChapterCountDESC,
                Name: this._("Chapter Count [Highest Up]")
            },
            "words": {
                Function: this.SortWordsCount,
                Name: this._("Word Count [Lowest Up]")
            },
            "wordsDESC": {
                Function: this.SortWordsCountDESC,
                Name: this._("Word Count [Highest Up]")
            },
            "followers": {
                Function: this.SortFollows,
                Name: this._("Followers [Lowest Up]")
            },
            "followersDESC": {
                Function: this.SortFollowsDESC,
                Name: this._("Followers [Highest Up]")
            },
            "favs": {
                Function: this.SortFavs,
                Name: this._("Favs [Lowest Up]")
            },
            "favsDESC": {
                Function: this.SortFavsDESC,
                Name: this._("Favs [Highest Up]")
            },
            "publishTime": {
                Function: this.SortPublishTime,
                Name: this._("Publish Time [Oldest Up]")
            },
            "publishTimeDESC": {
                Function: this.SortPublishTimeDESC,
                Name: this._("Publish Time [Newest Up]")
            },
            "updateTime": {
                Function: this.SortUpdateTime,
                Name: this._("Update Time [Oldest Up]")
            },
            "updateTimeDESC": {
                Function: this.SortUpdateTimeDESC,
                Name: this._("Update Time [Newest Up]")
            },
            "reviews": {
                Function: this.SortReviews,
                Name: this._("Review Count [Lowest Up]")
            },
            "reviewsDESC": {
                Function: this.SortReviewsDESC,
                Name: this._("Review Count [Highest Up]")
            },
            "chapterReviewRatio": {
                Function: this.SortChapterReviewRatio,
                Name: this._('Chapter/Review Ratio')
            },
            "chapterReviewRatingDESC": {
                Function: this.SortChapterReviewRatioDESC,
                Name: this._('Chapter/Review Ratio [Descending]')
            }
        };
    }
    /**
     *   Resets Config to the default setting
     */
    StoryParser.prototype.DefaultConfig = function () {
        if (typeof (this.Config["token"]) === "undefined") {
            // Generates Random Token
            this.Config["token"] = Math.random().toString().split(".")[1];
            this.SaveConfig(false);
        }
        var token = this.Config.token;
        this.Config = this.BaseConfig;
        this.Config.token = token;
        this.SaveConfig();
    };
    /**
     *   Initializes System
     */
    StoryParser.prototype.Initialize = function () {
        this.EventHandler.CallEvent(Events.PreInit, this, null);
        this.MainElementSelector = this.EventHandler.RequestResponse(Events.RequestMainElementSelector, this, undefined);
        if (this.MainElementSelector === undefined) {
            console.error("Can't get MainElementSelector! Please check installation!");
            return;
        }
        var self = this;
        var isNested = this.IGNORE_NEW_VERSION;
        if (typeof (sessionStorage["ffnet-mutex"]) !== "undefined") {
            if (this.DEBUG) {
                console.log("Found Mutex!");
            }
            isNested = true;
            if (typeof (localStorage["ffnet-Script-VersionID"]) !== "undefined") {
                var newVersionID = Number(localStorage["ffnet-Script-VersionID"]);
                var currentID = this.GetVersionId(this.VERSION);
                this.Log("Current Version ID: ", currentID);
                this.Log("Cached Version ID: ", newVersionID);
                if (newVersionID > currentID) {
                    this.Log("New Version in Storage found ...");
                }
                else {
                    try {
                        this.Log("The cached Version is older or the same as the current -> delete");
                        delete (localStorage["ffnet-Script-VersionID"]);
                        delete (localStorage["ffnet-Script"]);
                    }
                    catch (e) {
                        console.error("Couldn't delete cached Version", e);
                    }
                }
            }
        }
        if (!isNested) {
            // Check for new Version
            var data = this.LoadFromMemory(localStorage, "ffnet-Script");
            if (typeof (data.script) !== "undefined") {
                if (this.DEBUG) {
                    console.info("Found External Script! Loading ....");
                }
                sessionStorage["ffnet-mutex"] = true;
                window.setTimeout(function () {
                    delete sessionStorage["ffnet-mutex"];
                    if (self.DEBUG) {
                        console.log("Delete Mutex Var");
                    }
                }, 1000);
                try {
                    /*! jshint ignore:start */
                    eval(data.script);
                }
                catch (e) {
                    console.error("Invalid Local Script! Deleting");
                    delete localStorage["ffnet-Script"];
                }
                this.LOAD_INTERNAL = true;
                // Abort
                return;
            }
        }
        else {
            try {
                // Load Version Infos into the Local Storage:
                localStorage["ffnet-Script-VersionID"] = this.GetVersionId(this.VERSION);
            }
            catch (e) {
                console.error("Can't save Version id: ", e);
            }
        }
        try {
            // Checks if sessionStorage entry is valid:
            this._storyCache = this.LoadFromMemory(sessionStorage, this.Config.storage_key);
            this.EventHandler.CallEvent(Events.OnStoryCacheLoad, this, this._storyCache);
            this.DataConfig = this.LoadFromMemory(sessionStorage, this.Config.dataStorage_key);
            this.EventHandler.CallEvent(Events.OnDataConfigLoad, this, this.DataConfig);
        }
        catch (ex) {
            console.warn(ex);
        }
        var defaultConfig = this.Config;
        try {
            this.Config = this.LoadFromMemory(localStorage, this.Config.config_key);
            this.EventHandler.CallEvent(Events.OnConfigLoad, this, this.Config);
        }
        catch (ex) {
            console.warn(ex);
        }
        // Check for DEBUG-Mode
        if ((typeof (this.Config['debug']) !== "undefined") || (this.BRANCH === "dev")) {
            this.DEBUG = true;
        }
        // Check for Config Values:
        if (typeof (this.Config["token"]) === "undefined") {
            // Generates Random Token
            this.Config["token"] = Math.random().toString().split(".")[1];
            this.SaveConfig();
        }
        // Load all the config Values that are listed in the _config Array at startup
        $.each(defaultConfig, function (name, defaultValue) {
            if (typeof (self.Config[name]) === "undefined") {
                self.Config[name] = defaultValue;
            }
        });
        /* Register Events that can be used in the Addons: */
        self.RegisterEvents();
        if (this.DEBUG) {
            console.info("Loading User Script...");
        }
        this.EventHandler.CallEvent(Events.OnLoad, this, null);
        this.Api.CheckVersion();
        if (this.DEBUG) {
            console.log("Update Check done.");
            console.log("Pre GUI Update");
        }
        this.Api.Initialize();
        // Language:
        this.Api.GetLanguageList(function (res) {
            self.AvailableLanguges = res;
        });
        if (this.Config.language !== 'en') {
            // Get the new Language from the Server:
            this.Api.GetLanguage(this.Config.language, undefined, true, true);
        }
        // Add jQuery Color Picker to the Page:     
        var block = $('<link  rel="stylesheet" type="text/css"></link>').attr("href", this.Api.GetUrl("bootstrap-colorpicker.min.css"));
        $("head").append(block);
        // Check if the current Context is a Chrome Extention, if yes it is loaded over this system:
        if ((typeof (chrome) === "undefined") || (typeof (chrome.runtime) === "undefined")) {
            // Use this because of the new HTTPS Restrictions ...
            this.Api.GetStyles();
        }
        if (this.DEBUG) {
            console.log("Pre GUI Update done.");
            console.log("Starts GUI Update");
        }
        if (this.DEBUG) {
            console.log("GUI Update done.");
        }
        window.setTimeout(function () {
            self.EventHandler.CallEvent(Events.PreParagraphCheck, self, null);
            // Check if a Paragraph is given in the current request:
            var reg = new RegExp(".+#paragraph=([0-9]+)");
            if (reg.test(location.href)) {
                var match = reg.exec(location.href);
                self.GoToParagraphID(Number(match[1]));
            }
        }, 1000);
        setTimeout(function () {
            self.EventHandler.CallEvent(Events.PreMessageCheck, self, null);
            // Get Messages from Server:  
            if (typeof (self.DataConfig['messages']) === "undefined") {
                self.Api.GetMessages(function (messages) {
                    self.EventHandler.CallEvent(Events.OnMessageGot, self, messages);
                    if ((typeof (messages.Messages) !== "undefined") && (messages.Messages.length > 0)) {
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
            else {
                // Update Icon:
                //$(".ffnetMessageContainer img").attr("src", self.getUrl("message_new-white.png"));
                $(".ffnetMessageContainer").find(".badge").remove();
                $(".ffnetMessageContainer").append($('<div class="badge ffnet-messageCount"></div>'));
                $('.ffnet-messageCount').text(self.DataConfig['messages'].length);
            }
        }, 5000);
        this.EventHandler.CallEvent(Events.PostInit, this, null);
        this.EventHandler.CallEvent(Events.OnPageUpdate, this, {});
    };
    /**
     *  Initial Read
     */
    StoryParser.prototype.ReadList = function () {
        var self = this;
        this.EventHandler.CallEvent(Events.PreReadList, this, null);
        // Wrap Content:
        var wrapper = this.CreatePageWrapper();
        // Only run, if not a Story List
        if (wrapper !== null) {
            this.Read(wrapper);
        }
        else {
            // If Story List, then exec Alow Copy Check
            window.setTimeout(function () {
                if (self.Config.allow_copy) {
                    self.Log("Allow Selection of Text");
                    $(".nocopy").removeClass("nocopy").parent().attr("style", "padding: 0px 0.5em;");
                }
            }, 1000);
            this.ReadStory();
            this.ManageReadChaptersInfo();
        }
        this.EventHandler.CallEvent(Events.PostReadList, this, null);
    };
    /**
     * Parse the Content of all PageWrapper
     */
    StoryParser.prototype.ReadAll = function () {
        var self = this;
        this.Log("Parse all PageWrapper");
        // Reset Handled Stories:
        $.each(self._requestsPending, function (elementID, data) {
            self.Log("Remove pending Request for ElementID", elementID);
            delete self._requestsPending[elementID];
        });
        $.each(this._wrapperList, function (page, wrapper) {
            self.Log("Parse Page: ", page);
            self.Read(wrapper);
        });
    };
    /**
     * Registers the used Events
     */
    StoryParser.prototype.RegisterEvents = function () {
        var _this = this;
        var self = this;
        this.EventHandler.AddEventListener(Events.ActionForceSaveConfig, function (sender, args) {
            if (args !== undefined && args !== null) {
                self.SaveConfig(Boolean(args));
            }
            self.SaveConfig();
        });
        this.EventHandler.AddEventListener(Events.ActionForceSaveDataStore, function (sender, args) {
            self.SaveDataStore();
        });
        this.EventHandler.AddEventListener(Events.OnPageUpdate, function () {
            // ReadList:
            _this.ReadList();
        });
        this.EventHandler.AddEventListener(Events.ActionForceReadAll, function () {
            self.ReadAll();
        });
        this.EventHandler.AddEventListener(Events.ActionHideElement, function (sender, args) {
            if (self.DEBUG) {
                console.log("Hide Entry because of Story Config: ", args.Url);
            }
            self._hiddenElements[args.Url] = args.Reason;
            args.Element.attr("data-hiddenBy", args.Reason);
            args.Element.hide();
            self._hidden[args.CurrentPage]++;
        });
        this.EventHandler.AddEventListener(Events.ElementChanged, function (sender, args) {
            // Sorting
            if (typeof (_this.Config.sortFunction) !== "undefined" && _this.Config.sortFunction !== 'default') {
                if (typeof (_this.SortMap[_this.Config.sortFunction]) !== "undefined") {
                    var sortfunction = _this.SortMap[_this.Config.sortFunction];
                    _this.SortStories(sortfunction.Function);
                }
                else {
                    console.warn("Unknown SortFunction: ", _this.Config.sortFunction);
                    _this.Config.sortFunction = 'default';
                    _this.SaveConfig(false);
                }
            }
            self.UpdateList(args.CurrentPage);
        });
        this.EventHandler.AddEventListener(Events.ActionUpdateElementColor, function (sender, args) {
            _this.UpdateColor(args);
        });
    };
    /**
     *   Parses the elements in the specified Container
     *   @param container The PageWrapper for the Elements
     */
    StoryParser.prototype.Read = function (container) {
        var self = this;
        if (this.LOAD_INTERNAL) {
            return;
        }
        this.EventHandler.CallEvent(Events.PreRead, this, container);
        var page = Number(container.attr("data-page"));
        this.Log("Read List for Page: ", page);
        var elements = container.find(self.MainElementSelector);
        var odd = false;
        // Clear old Session:
        this.FoundElemementList[page] = {};
        this._hidden[page] = 0;
        this._hiddenElements[page] = {};
        container.find('.parser-msg').remove();
        container.find('[data-color]').removeAttr("data-color");
        elements.each(function (k, e) {
            var element = $(e);
            self.EventHandler.CallEvent(Events.PreElementParse, self, element);
            // Reset Hide:
            element.show();
            var textEl = element.find('div').last();
            var text = element.text().toLowerCase();
            var color = self.Config.color_normal;
            var colorMo = self.Config.color_mouse_over;
            var link = element.find('a').first().attr('href');
            var getStoryInfoData = {
                Link: link
            };
            var storyInfo = self.EventHandler.RequestResponse(Events.RequestGetStoryInfo, self, getStoryInfoData);
            var storyName = storyInfo.Name;
            var requestQueue = [];
            // Set ItemID used for the Pendig Requests List:
            if (!element.is("[data-ElementIdent]")) {
                element.attr("data-ElementIdent", self._lastElementID++);
            }
            // Set StoryID:
            if (!element.is("[data-StoryID]")) {
                element.attr("data-StoryID", storyInfo.ID);
            }
            // Remove Suggestion Level:
            element.attr("data-suggestionLevel", "0");
            if (self.Config.hide_non_english_storys && (text.indexOf('english') === -1)) {
                if (self.DEBUG) {
                    console.log("Hide Element because of 'hide_non_english_storys'", link);
                }
                self._hiddenElements[page][link] = "hide_non_english_storys";
                element.hide();
                self._hidden[page] += 1;
                return;
            }
            if (odd) {
                color = self.Config.color_odd_color;
                odd = false;
            }
            else {
                odd = true;
            }
            var markerFound = false;
            $.each(self.Config.marker, function (headline, config) {
                if (config.enabled === false) {
                    return;
                }
                var ignore = false;
                $.each(config.ignore, function (i, marker) {
                    try {
                        var reg = new RegExp(marker, "i");
                        if ((marker !== "") && reg.test(text)) {
                            // Ignore this Element
                            ignore = true;
                            return;
                        }
                    }
                    catch (e) {
                        console.warn(e);
                    }
                });
                if (ignore) {
                    return;
                }
                var found = false;
                $.each(config.keywords, function (i, marker) {
                    var reg = new RegExp(marker, "i");
                    if (!found) {
                        if (reg.test(text)) {
                            found = true;
                        }
                    }
                });
                if (found) {
                    if (!config.ignoreColor) {
                        markerFound = true;
                    }
                    else if (self.DEBUG) {
                        console.log("Ignore Color for ", headline);
                    }
                    var info = {
                        name: storyName,
                        url: link,
                        id: storyInfo.ID,
                        chapter: 0
                    };
                    self.ElementCallback(self, config, element, textEl, headline, info, page);
                }
                if ((!found && config.search_story) || config.keep_searching) {
                    var parseData = {
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
                if (self.Config.mark_M_storys) {
                    //TODO:Change
                    textEl.html(textEl.html().replace('Rated: M', '<b>Rated: M</b>'));
                }
            });
            if (self.Config['hide_images']) {
                element.find('img').not(".parser-msg").hide();
            }
            if (!markerFound) {
                /*if (_DEBUG)
                {
                    console.log("[_read] Change Color of Line: ",element);
                }*/
                if (typeof (self.DataConfig["displayOnly"]) !== "undefined") {
                    if (self.DEBUG) {
                        console.log("Hide Entry because of Display-Only Mode: ", element);
                    }
                    self._hiddenElements[page][link] = "Display-Only Mode";
                    element.fadeOut();
                    self._hidden[page] += 1;
                }
                else {
                    if (!self.Config.disable_default_coloring) {
                        var updateColorData = {
                            Element: element,
                            Color: color,
                            MouseOverColor: colorMo,
                            ColorPriority: -1,
                            MouseOverPriority: -1
                        };
                        self.EventHandler.CallEvent(Events.ActionUpdateElementColor, self, updateColorData);
                    }
                }
            }
            // Add Anchor:
            element.find("a").first().attr("name", storyName);
            // Chapter Review Ratio
            self.ManageChapterReviewRatio(element);
            self.DoParse(requestQueue, page);
            var data = {
                Url: link,
                Element: element,
                Name: storyName,
                ID: storyInfo.ID,
                Chapter: storyInfo.Chapter,
                CurrentPage: page
            };
            self.EventHandler.CallEvent(Events.PostElementParse, self, data);
        });
        self.ManageReadChaptersInfo();
        // Sort Elements:
        if (typeof (this.Config.sortFunction) !== "undefined" && this.Config.sortFunction !== 'default') {
            if (typeof (this.SortMap[this.Config.sortFunction]) !== "undefined") {
                var sortfunction = this.SortMap[this.Config.sortFunction];
                this.SortStories(sortfunction.Function, container);
            }
            else {
                console.warn("Unknown SortFunction: ", this.Config.sortFunction);
                this.Config.sortFunction = 'default';
                this.SaveConfig(false);
            }
        }
        this.UpdateList(page);
        // Timed Events:
        setTimeout(function () {
            // Color corrections            
            elements.filter("[data-color]").each(function (k, e) {
                var el = $(e);
                var color = el.attr("data-color");
                var colorMo = el.attr("data-mouseOverColor");
                el.css("background-color", color);
                el.unbind("mouseenter").unbind("mouseleave");
                el.mouseenter(function () {
                    $(this).css('background-color', colorMo);
                }).mouseleave(function () {
                    $(this).css('background-color', color);
                });
            });
            //TODO: Change
            // Disable Image Hover Effect:
            if (self.Config.disable_image_hover) {
                if ($(".disableImageHoverClass").length === 0) {
                    $("head").append($('<style class="disableImageHoverClass"></style')
                        .text(".z-list_hover { height: auto !important }")
                        .addClass("parser-msg"));
                }
                elements.find(".cimage").each(function (k, e) {
                    var el = $(e);
                    var width = el.width();
                    var height = el.height();
                    el.css("width", width + "px")
                        .css("height", height + "px");
                });
            }
            if (self.Config.hide_lazy_images) {
                elements.find(".lazy").remove();
            }
        }, 1000);
        this.EventHandler.CallEvent(Events.PostRead, this, container);
    };
    /**
     *   Starts Recursive Parsing of stories
     *   @param queue List of Stories to parse
     *   @param initiated The Time when the search was started
     *   @param page The Page of the Search
     *   @param i What element in the queue should be parsed
     *   @remark Don't specify the second Argument for initial parsing
     */
    StoryParser.prototype.DoParse = function (queue, page, initiated, i) {
        if (initiated === void 0) { initiated = -1; }
        if (i === void 0) { i = 0; }
        if (queue.length === 0) {
            this.Log("Empty Request Queue. Abort");
            return;
        }
        if (i >= queue.length) {
            if (typeof (queue[0]) !== "undefined") {
                // The Queue is finished. Close all Requests.
                var firstID = Number(queue[0].element.attr("data-ElementIdent"));
                delete this._requestsPending[firstID];
            }
            this.Log("Queue finished.", firstID);
            return;
        }
        var data = queue[i];
        var url;
        if (typeof (data) === "undefined") {
            this.Log("Data not defined. Abort - ", page, initiated);
            return;
        }
        var elementID = Number(data.element.attr("data-ElementIdent"));
        if (this.DEBUG) {
            console.info('Execute Queue for ' + elementID + ', i: ' + i + ', page: ' + page + ', initated: ' + initiated, data, queue);
        }
        // Check if there is a pending Request:
        if (elementID in this._requestsPending) {
            // Check if it is the same Request as the current one:
            if (this._requestsPending[elementID] !== initiated) {
                this.Info("Stopping InStorySearch Request. Not the last triggered Request: ", elementID, initiated);
                return;
            }
        }
        else {
            if (i === 0) {
                // ElementID not in pending Requests:
                initiated = Date.now();
                this.Log("Add pending Request: ", elementID, initiated);
                this._requestsPending[elementID] = initiated;
            }
            else {
                this.Info("Stopping InStorySearch Request. ElementID not in pending Requests: ", elementID, initiated);
                return;
            }
        }
        url = data.url;
        // Check for ScriptInsert Page:
        if (document.location.href.indexOf("file://") === -1) {
            var domainRegex = new RegExp("https?://[^/]+");
            var result = domainRegex.exec(location.href);
            if (result !== undefined && result !== null) {
                var domain = result[0];
                url = domain + data.url;
            }
        }
        else {
            this.Log("Detected File-URL. Abort Sory Request");
            return;
        }
        var self = this;
        var executeNext = function () {
            self.DoParse(queue, page, initiated, i + 1);
        };
        var callback = function (info) {
            var el = queue[i];
            if (self.DEBUG) {
                console.info('execute Callback Function ' + el.headline + ' for ', info);
            }
            self.ElementCallback(self, el.config, el.element, el.textEl, el.headline, info, page);
            executeNext();
        };
        self.Parse(url, data.config, callback, 0, executeNext, elementID, initiated);
    };
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
    StoryParser.prototype.Parse = function (url, markerConfig, callback, i, executeNext, elementID, initiated) {
        if (i >= this.Config.story_search_depth) {
            executeNext();
            return;
        }
        //console.log('Open: ',url);
        var self = this;
        var ajaxCallback = function (text) {
            if (!(url in self._storyCache) && !self.Config.disable_cache) {
                if (self.DEBUG) {
                    console.log('Story ' + url + ' Not in Cache -> save');
                }
                self._storyCache[url] = text;
                try {
                    sessionStorage[self.Config.storage_key] = JSON.stringify(self._storyCache);
                }
                catch (ex) {
                    self.Log("Can't save Story Cache: ", ex);
                    try {
                        sessionStorage[self.Config.storage_key] = '';
                    }
                    catch (e) {
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
            if ((sentence = self.ParseSite(body, markerConfig.keywords, markerConfig.ignore)) != null) {
                var storyInfoData = {
                    Link: url
                };
                var storyInfo = self.EventHandler.RequestResponse(Events.RequestGetStoryInfo, self, storyInfoData);
                var storyName = storyInfo.Name;
                callback({
                    id: storyInfo.ID,
                    name: storyName,
                    url: url,
                    chapter: (i + 1),
                    sentence: (self.DEBUG ? ("[" + initiated + "] ") : "") + sentence
                });
            }
            if (sentence == null || markerConfig.keep_searching) {
                var eventData = {
                    Body: body,
                    Url: url,
                    CurrentChapter: i + 1,
                    StoryName: storyName
                };
                var requestResponse = self.EventHandler.RequestResponse(Events.RequestGetLinkToNextChapter, self, eventData);
                if (requestResponse === undefined) {
                    executeNext();
                    return;
                }
                self.Parse(requestResponse, markerConfig, callback, i + 1, executeNext, elementID, initiated);
            }
            else {
                executeNext();
                return;
            }
        };
        if (url in this._storyCache) {
            if (this.DEBUG) {
                console.log('Story ' + url + ' in Cache -> use Cache');
            }
            ajaxCallback(this._storyCache[url]);
        }
        else {
            if (this.DEBUG) {
                console.log('Story ' + url + ' not in Cache -> request');
            }
            $.ajax({
                url: url,
                success: ajaxCallback
            });
        }
        //console.log('reponse revieved');
    };
    /**
     *   Parses a story page for recursive search.
     *   @see _parse
     *   @param body Body Element of the loaded page
     *   @param keywords What Keywords to look for
     *   @param ignore Ignore Keywords
     *   @result Matching Sentence or null
     */
    StoryParser.prototype.ParseSite = function (body, keywords, ignore) {
        //TODO: Remove
        var storyEl = body.find('.storytext');
        //console.log('search in ', storyEl);
        var self = this;
        if (storyEl.length === 1) {
            var storyText = storyEl.html().toLowerCase();
            var result = null;
            $.each(keywords, function (k, word) {
                if (result === null) {
                    try {
                        var wordReg = new RegExp(word, "i");
                        if (wordReg.test(storyText)) {
                            var append = "([a-zA-Z0-9, :-_\*]+)?";
                            var regEx = "[^|\.]?" + append + word + append + "[\.|$]?";
                            self.Log("Use RegExp for InStory Search: ", regEx);
                            var reg = new RegExp(regEx, "i");
                            var data = reg.exec(storyText);
                            var sentence = "";
                            for (var i = 1; i < data.length; i++) {
                                if (typeof (data[i]) !== "undefined") {
                                    sentence += data[i];
                                }
                            }
                            self.Log("Found Sentence: ", sentence);
                            result = sentence;
                            return;
                        }
                    }
                    catch (e) {
                        console.warn(e);
                    }
                }
            });
            if (result !== null) {
                $.each(ignore, function (k, word) {
                    if ((result === null) || (word === "") || (word === " ")) {
                        return;
                    }
                    try {
                        var wordReg = new RegExp(word, "i");
                        if (wordReg.test(storyText)) {
                            self.Log("Found Ignore Statemant: ", word);
                            result = null;
                            return;
                        }
                    }
                    catch (e) {
                        console.warn(e);
                    }
                });
            }
            return result;
        }
        return null;
    };
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
    StoryParser.prototype.ElementCallback = function (self, config, element, textEl, headline, info, page) {
        this.EventHandler.CallEvent(Events.PreElementCallback, this, [config, element, textEl, headline, info, page]);
        //TODO: Remove
        var isStory = $(".storytext").length > 0;
        var isStoryText = element.is(".storytext");
        var foundWhere = info.chapter;
        if (!(page in self.FoundElemementList)) {
            self.FoundElemementList[page] = {};
        }
        if (!(headline in self.FoundElemementList[page])) {
            self.FoundElemementList[page][headline] = [];
        }
        self.FoundElemementList[page][headline].push(info);
        if (self.DEBUG) {
            this.Info("Element Callback for ", headline, info);
            this.Log("Found at page: ", page);
            this.Log("IsStory: " + isStory + " - IsStoryText: " + isStoryText);
        }
        if (!isStory) {
            if ((typeof (self.DataConfig["displayOnly"]) !== "undefined") && (self.DataConfig["displayOnly"] === headline)) {
                if (self.DEBUG) {
                    console.info("Display Only Mode: Match found for", element);
                }
                window.setTimeout(function () {
                    element.fadeIn();
                    self.EventHandler.CallEvent(Events.ActionUpdateListColor, self, undefined);
                }, 100);
                self._hidden[page] -= 1;
            }
            else if (typeof (self.DataConfig["displayOnly"]) !== "undefined") {
                // Hide this Element because the Only Mode do not match
                if (self.DEBUG) {
                    console.log("Hide Element because of 'displayOnly' ", info);
                }
                self._hiddenElements[page][info.url] = "displayOnly";
                element.fadeOut();
                self._hidden[page] += 1;
                self.EventHandler.CallEvent(Events.ActionUpdateListColor, self, undefined);
            }
        }
        if (!isStory && !config.display) {
            if (self.DEBUG) {
                console.log("Hide Element because of Filter '" + headline + "'", info);
            }
            self._hiddenElements[page][info.url] = "Filter '" + headline + "'";
            element.hide();
            self.EventHandler.CallEvent(Events.ActionUpdateListColor, self, undefined);
            self._hidden[page] += 1;
        }
        else {
            var priority;
            if (config.priority !== -1) {
                priority = {
                    background: config.priority,
                    color: config.priority,
                    highlight_color: config.priority,
                    mouseOver: config.priority,
                    text_color: config.priority
                };
            }
            else {
                if ((typeof (config.customPriority) !== "undefined") && (config.customPriority !== null)) {
                    priority = config.customPriority;
                }
                else {
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
            if (!isStory) {
                // Get the old SuggestionLevel:
                var suggestionLevel = 1;
                $.each(priority, function (name, data) {
                    if (data !== -1) {
                        suggestionLevel *= data;
                    }
                });
                // Add Bonus if the Chapter of the found entry is earlier:
                suggestionLevel += (this.Config.story_search_depth - info.chapter);
                if (element.is("[data-suggestionLevel]")) {
                    suggestionLevel = Number(element.attr("data-suggestionLevel")) + suggestionLevel;
                }
                element.attr("data-suggestionLevel", suggestionLevel);
            }
            if (!isStoryText && (config.background !== null) && (config.background !== "")) {
                this.UpdateAttributeWithPriority(element, "background", priority.background, function () {
                    element.css('background-image', 'url(' + config.background + ')')
                        .css('background-repeat', 'no-repeat')
                        .css('background-position', 'right');
                });
            }
            if (!isStoryText && (typeof (config.image) !== "undefined") && (config.image !== null) && (config.image !== "") && (config.image !== " ")) {
                self.Log("Adds Filter-Image to Element: ", element, config);
                var img = $("<img></img>").attr("src", config.image)
                    .css("width", "20px")
                    .css("height", "20px")
                    .css("margin-left", "15px")
                    .addClass("parser-msg");
                if (!isStory) {
                    element.find("a").last().after(img);
                }
                else {
                    var appendTo = element.children().filter("a").last();
                    self.Log("Add Image to Story ...", appendTo, img);
                    appendTo.after(img);
                }
            }
            if (config.mark_chapter) {
                var markerAppend = $("<span class=\"parser-msg\"> <b>[" + headline + "-" + foundWhere + "]</b></span>")
                    .attr("title", info.sentence);
                if (!isStory) {
                    element.find('a').first().after(markerAppend);
                }
                else if (!isStoryText) {
                    element.children().filter('a').last().after(markerAppend);
                }
                else {
                    element.prepend(markerAppend);
                }
            }
            if (!isStoryText && !config.ignoreColor && config.text_color != null) {
                this.UpdateAttributeWithPriority(textEl, "color", priority.text_color, config.text_color);
            }
            var linkCheckReg = new RegExp("<a [^>]*\"[^\">]+$", "i");
            var color = config.color;
            var colorMo = config.mouseOver;
            $.each(config.keywords, function (key, keyword) {
                var el = (!isStory) ? element.find('div').first() : element.children().filter("div").last();
                if (el.length === 0) {
                    return;
                }
                var reg = new RegExp(keyword, "i");
                var text = el.html();
                var erg = reg.exec(text);
                var front = '';
                var replace = '';
                var behind = '';
                if (erg != null) {
                    if (erg.length === 1) {
                        replace = keyword;
                    }
                    else if (erg.length === 2) {
                        front = erg[1];
                    }
                    else if (erg.length === 3) {
                        front = erg[1];
                        replace = erg[2];
                    }
                    else {
                        front = erg[1];
                        replace = erg[2];
                        behind = erg[3];
                    }
                    if (linkCheckReg.test(front)) {
                        // We are within a Link .. continue
                        return;
                    }
                    replace = front + '<span class="ffnet-story-highlighter" style="color:black; font-weight:bold">' + replace + '</span>' + behind;
                    text = text.replace(new RegExp(keyword, "i"), replace);
                }
                el.html(text);
            });
            if (!isStoryText && !config.ignoreColor) {
                if (self.DEBUG) {
                    console.log("[ElementCallback] Change Color of Line: ", element);
                }
                var updateColorData = {
                    Element: element,
                    Color: color,
                    ColorPriority: priority.color,
                    MouseOverColor: colorMo,
                    MouseOverPriority: priority.mouseOver
                };
                self.EventHandler.CallEvent(Events.ActionUpdateElementColor, self, updateColorData);
            }
            var data = {
                Element: element,
                Chapter: info.chapter.toString(),
                CurrentPage: page,
                ID: info.id,
                Name: info.name,
                Url: info.url
            };
            self.EventHandler.CallEvent(Events.ElementChanged, self, data);
        }
        this.EventHandler.CallEvent(Events.PostElementCallback, this, [config, element, textEl, headline, info, page]);
    };
    /**
     *   Updates the List of found elements
     *   @param page The Page to Update
     */
    StoryParser.prototype.UpdateList = function (page) {
        var wrapper = this._wrapperList[page];
        this.EventHandler.CallEvent(Events.PreUpdateList, this, [page, wrapper]);
        if (typeof (wrapper) === "undefined") {
            this.Log("UpdateList - Page Wrapper for Page " + page + " is undefined! Abort. ", this._wrapperList);
            return;
        }
        this.Log("Update List for Page: ", page);
        var text = "";
        if (this.DEBUG) {
            console.log("Headline-List = ", this.FoundElemementList[page]);
        }
        var headlineContainer = $("<div></div>");
        var self = this;
        $.each(this.FoundElemementList[page], function (headline, elements) {
            if (self.Config.marker[headline].print_story) {
                headlineContainer.append("<u>" + headline + ": </u>");
                var eUl = $("<ul></ul>");
                $.each(elements, function (i, value) {
                    eUl.append($("<li></li>").append($("<span></span>").append($("<a></a>").attr('href', value.url).html(value.name)).append(" - " + value.chapter)
                        .attr("title", value.sentence)).append($(" <a>#</a>").attr("href", "#" + value.name)));
                });
                headlineContainer.append(eUl);
            }
            if (self.Config.marker[headline].mention_in_headline) {
                text += "<b>" + headline + ":</b> " + self.FoundElemementList[page][headline].length + " ";
            }
        });
        wrapper.find('#mrhOutput').remove();
        var hiddenByStoryConfig = wrapper.find('div[data-hiddenBy="storyConfig"]');
        if (hiddenByStoryConfig.length > 0) {
            text += "<i>Hidden by StoryConfig</i>: " + hiddenByStoryConfig.length + " ";
        }
        var list = $('<div id=\'mrhOutput\'></div>')
            .html('<div><b>' + self._('Page') + ': ' + page + '</b></div>' + text + ' <i>' + self._('All hidden elements:') + '</i> ').append($("<u></u>").text(self._hidden[page]).click(function (e) {
            var table = $("<table></table>");
            var modal = GUIHandler.CreateBootstrapModal(table, self._('Hidden Elements'));
            $.each(self._hiddenElements[page], function (key, value) {
                var requestData = {
                    Link: key
                };
                var storyInfo = self.EventHandler.RequestResponse(Events.RequestGetStoryInfo, self, requestData);
                table.append($("<tr></tr>").append($("<th></th>").append($("<a></a>").text(storyInfo.Name)
                    .attr("href", key)))
                    .append($('<td style="padding-left: 15px"></td>').text(value)));
            });
            GUIHandler.ShowModal(modal);
            e.preventDefault();
        })
            .attr("title", self._("Show the reasons for hiding"))
            .addClass("clickable"))
            .css('margin-bottom', '10px')
            .append(headlineContainer);
        if (hiddenByStoryConfig.length > 0) {
            list.append($('<a href="#">' + self._('Show Elements hidden by Story Config') + '</a>').click(function (e) {
                hiddenByStoryConfig.css("border", "2px solid black").slideDown();
                self.EventHandler.CallEvent(Events.ActionUpdateListColor, self, undefined);
                e.preventDefault();
            }));
        }
        wrapper.prepend(list);
        this.EventHandler.CallEvent(Events.PostUpdateList, this, [page, wrapper]);
    };
    /**
     *  Updates the Color of a specifiy Element in the list
     * @param data Data
     */
    StoryParser.prototype.UpdateColor = function (data) {
        //console.log("Update Color called! " + color + ", " + colorMo + ", " + notSetAttr);
        var element = data.Element;
        var color = data.Color;
        var colorPriority = data.ColorPriority;
        var colorMo = data.MouseOverColor;
        var colorMoPriority = data.MouseOverPriority;
        this.UpdateAttributeWithPriority(element, 'color', colorPriority, function () {
            element.css("background-color", color);
            element.attr("data-color", color);
        });
        this.UpdateAttributeWithPriority(element, 'mouseovercolor', colorMoPriority, function () {
            element.unbind("mouseenter").unbind("mouseleave");
            element.mouseenter(function () {
                $(this).css('background-color', colorMo);
            }).mouseleave(function () {
                $(this).css('background-color', color);
            });
            element.attr("data-mouseOverColor", colorMo);
        });
    };
    /**
     * Updates a property if the Priority if higher or equals to the current Priority
     * @param element The Target Element for the Manipulation
     * @param attribute The name of the Attrbute. If value is not a function, this is the name of the CSS Property
     * @param newPriority The Priority of the new Value
     * @param value The new value OR a callback Function with the result
     */
    StoryParser.prototype.UpdateAttributeWithPriority = function (element, attribute, newPriority, value) {
        var regEx = new RegExp("[ \-\_\.]", "g");
        var attributeName = "data-priority-" + attribute.replace(regEx, "");
        var current = element.attr(attributeName);
        var currentPriority = -100000;
        // 0 means disabled!
        if (newPriority === 0) {
            return;
        }
        if (typeof (current) !== "undefined") {
            currentPriority = Number(current);
        }
        if (currentPriority === NaN || isNaN(currentPriority)) {
            currentPriority = -100000;
        }
        if (newPriority >= currentPriority) {
            if (typeof (value) === "function") {
                value(element);
            }
            else {
                element.css(attribute, value);
            }
            element.attr(attributeName, newPriority);
        }
    };
    /**
     *  Reads the content of the Story itself
     **/
    StoryParser.prototype.ReadStory = function () {
        if (this.Config.disable_inStory_parsing) {
            return;
        }
        //TODO: Remove
        var storyElements = $(".storytext");
        if (storyElements.length < 1) {
            // We are not in a Story ...
            return;
        }
        this.EventHandler.CallEvent(Events.PreReadStory, this, storyElements);
        var self = this;
        var handleElement = function (element) {
            // Remove old Elements
            element.find('.parser-msg').remove();
            element.attr("data-parsed", "true");
            var text = element.html();
            $.each(self.Config.marker, function (headline, config) {
                if (config.enabled === false) {
                    return;
                }
                var ignore = false;
                $.each(config.ignore, function (i, marker) {
                    try {
                        var reg = new RegExp(marker, "i");
                        if ((marker !== "") && reg.test(text)) {
                            self.Log("Ignore Story because of Ignore Filter: ", marker, config);
                            // Ignore this Element
                            ignore = true;
                            return;
                        }
                    }
                    catch (e) {
                        console.warn(e);
                    }
                });
                if (ignore) {
                    return;
                }
                var found = false;
                $.each(config.keywords, function (i, marker) {
                    var reg = new RegExp(marker, "i");
                    if (!found) {
                        if (reg.test(text)) {
                            found = true;
                        }
                    }
                });
                if (found) {
                    var storyInfoRequest = {
                        Link: document.location.href
                    };
                    var storyInfo = self.EventHandler.RequestResponse(Events.RequestGetStoryInfo, self, storyInfoRequest);
                    var chapter = Number(element.attr("data-page"));
                    if (isNaN(chapter)) {
                        chapter = 0;
                    }
                    var linkRequest = {
                        Page: chapter
                    };
                    var url = self.EventHandler.RequestResponse(Events.RequestGetLinkToPageNumber, self, linkRequest);
                    var info = {
                        url: url,
                        chapter: chapter,
                        name: storyInfo.Name,
                        element: element,
                        id: storyInfo.ID,
                        sentence: null
                    };
                    window.setTimeout(function () {
                        self.ElementCallback(self, config, element, element.children().filter("span").last(), headline, info, chapter);
                    }, 500);
                }
            });
        };
        //TODO: Remove
        handleElement($("#profile_top"));
        $.each(storyElements.not('[data-parsed]'), function (index, element) {
            element = $(element);
            handleElement(element);
        });
        this.EventHandler.CallEvent(Events.PostReadStory, this, storyElements);
    };
    /**
    *   Go to a specific Paragraph on the page
    *   @param id Paragraph Number
    */
    StoryParser.prototype.GoToParagraphID = function (id) {
        $($("p")[id]).before('<a name="goto" id="gotoMarker"></a>');
        location.href = '#goto';
        $("#gotoMarker").remove();
    };
    //TODO: Remove
    /**
     * Enable the Reading Aid Function
     * @param container The Container to enable the Reading Aid for
     */
    StoryParser.prototype.EnableReadingAid = function (container) {
        if (container === void 0) { container = null; }
        //EVENT: OnPageUpdate
        if (container === null) {
            container = $("body");
        }
        if (this.LOAD_INTERNAL) {
            return;
        }
        var reg = new RegExp(".+/s/[0-9]+/.+");
        if (!reg.test(location.href)) {
            return;
        }
        if (this.Config.readingHelp_enabled === true) {
            var data = "";
            if ((this.Config.readingHelp_backgroundColor !== null) && (this.Config.readingHelp_backgroundColor !== "")) {
                data = "background-color: " + this.Config.readingHelp_backgroundColor + ";";
            }
            if ((this.Config.readingHelp_color !== null) && (this.Config.readingHelp_color !== "")) {
                data += " color: " + this.Config.readingHelp_color + ";";
            }
            if ($(".readingAidStyle").length === 0) {
                // Build Style Object
                var style = $('<style class="readingAidStyle" type="text/css"></style>')
                    .html(".readingAidMarker { " + data + " }")
                    .appendTo($("head"));
            }
            container.find("p").mouseenter(function () {
                $(this).addClass("readingAidMarker");
            }).mouseleave(function () {
                $(this).removeClass("readingAidMarker");
            });
        }
    };
    /**
     * Adds the Chapter/Review Ration Information
     * @param element z-list Instance
     */
    StoryParser.prototype.ManageChapterReviewRatio = function (element) {
        element.attr("data-chapterReviewRatio", 0);
        if (this.Config.enable_chapter_review_ratio) {
            var reg = new RegExp(".+Chapters: ?([0-9]+).*Reviews: ?([0-9]+).*");
            //TODO: Remove
            var parent = element.find(".z-padtop2").first();
            if (reg.test(parent.text())) {
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
    };
    /**
     *  Manages the Read Chapter Info Feature
     */
    StoryParser.prototype.ManageReadChaptersInfo = function (overwrite) {
        if (overwrite === void 0) { overwrite = false; }
        if (!overwrite && this.Config.enable_read_chapter_info === false) {
            return;
        }
        var isStory = ($(self.MainElementSelector).length === 0);
        var elements = undefined;
        var ids = [];
        if (!isStory) {
            //TODO: REMOVE
            elements = $(".z-list[data-storyid]");
            var idELMap = {};
            elements.each(function (i, el) {
                var element = $(el);
                var id = element.attr("data-StoryId");
                ids.push(id);
                idELMap[id] = element;
            });
        }
        else {
            var infoRequest = {
                Link: document.location.href
            };
            var info = self.EventHandler.RequestResponse(Events.RequestGetStoryInfo, self, infoRequest);
            if (info.ID !== null) {
                ids.push(info.ID);
            }
            else {
                return;
            }
        }
        var self = this;
        this.Api.GetReadChapters(ids, function (result, lastChapters) {
            $.each(result, function (id, chapters) {
                if (!isStory) {
                    if (typeof (idELMap[id]) !== "undefined") {
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
                else {
                    //TODO: Remove
                    var chapterSelects = $('select[id="chap_select"]');
                    chapterSelects.children().each(function (i, el) {
                        var element = $(el);
                        if (chapters.indexOf(Number(element.attr("value"))) !== -1) {
                            element.text(self.Config.reading_info_ChapterMarker.replace("{Name}", element.text()));
                        }
                    });
                    //TODO: REMOVE
                    var infoContainer = $("#profile_top").find(".xgray");
                    infoContainer.html(infoContainer.html().replace("- Words", "- Last Read Chapter: " + lastChapters[id] + " - Words"));
                }
            });
        });
    };
    // ------- Endless Mode ------
    /**
     * Loads the Content of a Page  and returns the Data as JQuery Object
     * @param url The Request URI
     * @param callback The callback Function
     */
    StoryParser.prototype.GetPageContent = function (url, callback) {
        if (this.DEBUG) {
            console.log("Requesting page: ", url);
        }
        var self = this;
        $.get(url, function (content) {
            var data = $(content);
            callback(data);
        });
    };
    /**
     * Create a new Page-Wrapper
     * @param elements The Elements to wrap
     * @param currentPage The current Page-Number
     */
    StoryParser.prototype.CreatePageWrapper = function (elements, currentPage) {
        // Wrap the current Page into a PageWrapper
        if (elements === void 0) { elements = null; }
        if (currentPage === void 0) { currentPage = null; }
        if (typeof (currentPage) === "undefined" || currentPage === null) {
            currentPage = this.EventHandler.RequestResponse(Events.RequestGetCurrentPage, this, undefined);
        }
        var ignoreUserPage = false;
        if (this.DEBUG) {
            console.log("Current Page: ", currentPage);
        }
        if (elements === null || typeof (elements) === "undefined") {
            elements = $(this.MainElementSelector);
        }
        else {
            this.Log("Explicit Data specified for Page Wrapper");
            ignoreUserPage = true;
        }
        if (elements.length !== 0) {
            var wrapper = $(".ffNetPageWrapper[data-page=\"" + currentPage + "\"]");
            if (wrapper.length === 0) {
                wrapper = this.CreateWrapper(currentPage);
            }
            var notWrapped = elements.filter('[data-wrapped!="wrapped"]');
            var argument = {
                Elements: notWrapped,
                IgnoreUserPage: ignoreUserPage
            };
            if (this.EventHandler.CallEvent(Events.OnPageWrapperCreating, this, argument)) {
                notWrapped = argument.Elements;
            }
            if (notWrapped.length !== 0) {
                if (this.DEBUG) {
                    console.log("Not Wrapped Elements found:", notWrapped);
                }
                notWrapped.last().after(wrapper);
                notWrapped.detach().appendTo(wrapper)
                    .attr("data-wrapped", "wrapped");
            }
            return wrapper;
        }
        else {
            // Story
            $("#storytext").attr("data-page", currentPage);
            return null;
        }
    };
    StoryParser.prototype.CreateWrapper = function (page) {
        var wrapper = $("<div></div>").addClass("ffNetPageWrapper")
            .attr("data-page", page);
        this._wrapperList[page] = wrapper;
        return wrapper;
    };
    // ---- Sort Function -------
    StoryParser.prototype.SortStories = function (sortFunction, container) {
        this.Log("Sort Stories", sortFunction, container);
        if (typeof (sortFunction) === "undefined") {
            console.log("No Sort Function defined. Abort");
            return;
        }
        var self = this;
        var handleElement = function (elementContainer) {
            var elements = elementContainer.children().filter(self.MainElementSelector).detach();
            var list = [];
            $.each(elements, function (i, el) {
                list.push(el);
            });
            var newList = sortFunction(list);
            $.each(newList, function (i, element) {
                elementContainer.append(element);
            });
            self.EventHandler.CallEvent(Events.ActionUpdateListColor, self, undefined);
        };
        if (typeof (container) === "undefined") {
            var pages = $(".ffNetPageWrapper");
            $.each(pages, function (index, page) {
                page = $(page);
                handleElement(page);
            });
        }
        else {
            handleElement(container);
        }
    };
    StoryParser.prototype.SortElementIdent = function (list) {
        list.sort(function (a, b) {
            return Number($(a).attr("data-elementident")) - Number($(b).attr("data-elementident"));
        });
        return list;
    };
    StoryParser.prototype.SortElementIdentDESC = function (list) {
        list.sort(function (a, b) {
            return Number($(b).attr("data-elementident")) - Number($(a).attr("data-elementident"));
        });
        return list;
    };
    StoryParser.prototype.SortSuggestionLevel = function (list) {
        list.sort(function (a, b) {
            return Number($(a).attr("data-suggestionLevel")) - Number($(b).attr("data-suggestionLevel"));
        });
        return list;
    };
    StoryParser.prototype.SortSuggestionLevelDESC = function (list) {
        list.sort(function (a, b) {
            return Number($(b).attr("data-suggestionLevel")) - Number($(a).attr("data-suggestionLevel"));
        });
        return list;
    };
    StoryParser.prototype.SortChapterReviewRatio = function (list) {
        list.sort(function (a, b) {
            return Number($(a).attr("data-chapterReviewRatio")) - Number($(b).attr("data-chapterReviewRatio"));
        });
        return list;
    };
    StoryParser.prototype.SortChapterReviewRatioDESC = function (list) {
        list.sort(function (a, b) {
            return Number($(b).attr("data-chapterReviewRatio")) - Number($(a).attr("data-chapterReviewRatio"));
        });
        return list;
    };
    StoryParser.prototype.SortChapterCount = function (list) {
        var regex = new RegExp("Chapters: ([0-9,.]+)", "i");
        list.sort(function (a, b) {
            a = $(a);
            b = $(b);
            var numA;
            var numB;
            if (a.is("[data-chapterCount]")) {
                numA = Number(a.attr("data-chapterCount"));
            }
            else {
                //TODO: REMOVE
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));
                a.attr("data-chapterCount", numA);
            }
            if (b.is("[data-chapterCount]")) {
                numB = Number(b.attr("data-chapterCount"));
            }
            else {
                //TODO: REMOVE
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));
                b.attr("data-chapterCount", numB);
            }
            return numA - numB;
        });
        return list;
    };
    StoryParser.prototype.SortChapterCountDESC = function (list) {
        var regex = new RegExp("Chapters: ([0-9,.]+)", "i");
        list.sort(function (a, b) {
            a = $(a);
            b = $(b);
            var numA;
            var numB;
            if (a.is("[data-chapterCount]")) {
                numA = Number(a.attr("data-chapterCount"));
            }
            else {
                //TODO: REMOVE
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));
                a.attr("data-chapterCount", numA);
            }
            if (b.is("[data-chapterCount]")) {
                numB = Number(b.attr("data-chapterCount"));
            }
            else {
                //TODO: REMOVE
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));
                b.attr("data-chapterCount", numB);
            }
            return numB - numA;
        });
        return list;
    };
    StoryParser.prototype.SortWordsCount = function (list) {
        var regex = new RegExp("Words: ([0-9,.]+)", "i");
        list.sort(function (a, b) {
            a = $(a);
            b = $(b);
            var numA;
            var numB;
            if (a.is("[data-wordCount]")) {
                numA = Number(a.attr("data-wordCount"));
            }
            else {
                //TODO: REMOVE
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));
                a.attr("data-wordCount", numA);
            }
            if (b.is("[data-wordCount]")) {
                numB = Number(b.attr("data-wordCount"));
            }
            else {
                //TODO: REMOVE
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));
                b.attr("data-wordCount", numB);
            }
            return numA - numB;
        });
        return list;
    };
    StoryParser.prototype.SortWordsCountDESC = function (list) {
        var regex = new RegExp("Words: ([0-9,.]+)", "i");
        list.sort(function (a, b) {
            a = $(a);
            b = $(b);
            var numA;
            var numB;
            if (a.is("[data-wordCount]")) {
                numA = Number(a.attr("data-wordCount"));
            }
            else {
                //TODO: REMOVE
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));
                a.attr("data-wordCount", numA);
            }
            if (b.is("[data-wordCount]")) {
                numB = Number(b.attr("data-wordCount"));
            }
            else {
                //TODO: REMOVE
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));
                b.attr("data-wordCount", numB);
            }
            return numB - numA;
        });
        return list;
    };
    StoryParser.prototype.SortFollows = function (list) {
        var regex = new RegExp("Follows: ([0-9,.]+)", "i");
        list.sort(function (a, b) {
            a = $(a);
            b = $(b);
            var numA;
            var numB;
            if (a.is("[data-follows]")) {
                numA = Number(a.attr("data-follows"));
            }
            else {
                //TODO: REMOVE
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));
                a.attr("data-follows", numA);
            }
            if (b.is("[data-follows]")) {
                numB = Number(b.attr("data-follows"));
            }
            else {
                //TODO: REMOVE
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));
                b.attr("data-follows", numB);
            }
            return numA - numB;
        });
        return list;
    };
    StoryParser.prototype.SortFollowsDESC = function (list) {
        var regex = new RegExp("Follows: ([0-9,.]+)", "i");
        list.sort(function (a, b) {
            a = $(a);
            b = $(b);
            var numA;
            var numB;
            if (a.is("[data-follows]")) {
                numA = Number(a.attr("data-follows"));
            }
            else {
                //TODO: REMOVE
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));
                a.attr("data-follows", numA);
            }
            if (b.is("[data-follows]")) {
                numB = Number(b.attr("data-follows"));
            }
            else {
                //TODO: REMOVE
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));
                b.attr("data-follows", numB);
            }
            return numB - numA;
        });
        return list;
    };
    StoryParser.prototype.SortFavs = function (list) {
        var regex = new RegExp("Favs: ([0-9,.]+)", "i");
        list.sort(function (a, b) {
            a = $(a);
            b = $(b);
            var numA;
            var numB;
            if (a.is("[data-favs]")) {
                numA = Number(a.attr("data-favs"));
            }
            else {
                //TODO: REMOVE
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));
                a.attr("data-favs", numA);
            }
            if (b.is("[data-favs]")) {
                numB = Number(b.attr("data-favs"));
            }
            else {
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));
                b.attr("data-favs", numB);
            }
            return numA - numB;
        });
        return list;
    };
    StoryParser.prototype.SortFavsDESC = function (list) {
        var regex = new RegExp("Favs: ([0-9,.]+)", "i");
        list.sort(function (a, b) {
            a = $(a);
            b = $(b);
            var numA;
            var numB;
            if (a.is("[data-favs]")) {
                numA = Number(a.attr("data-favs"));
            }
            else {
                //TODO: REMOVE
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));
                a.attr("data-favs", numA);
            }
            if (b.is("[data-favs]")) {
                numB = Number(b.attr("data-favs"));
            }
            else {
                //TODO: REMOVE
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));
                b.attr("data-favs", numB);
            }
            return numB - numA;
        });
        return list;
    };
    StoryParser.prototype.SortReviews = function (list) {
        var regex = new RegExp("Reviews: ([0-9,.]+)", "i");
        list.sort(function (a, b) {
            a = $(a);
            b = $(b);
            var numA;
            var numB;
            if (a.is("[data-reviews]")) {
                numA = Number(a.attr("data-reviews"));
            }
            else {
                //TODO: REMOVE
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));
                a.attr("data-reviews", numA);
            }
            if (b.is("[data-reviews]")) {
                numB = Number(b.attr("data-reviews"));
            }
            else {
                //TODO: REMOVE
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));
                b.attr("data-reviews", numB);
            }
            return numA - numB;
        });
        return list;
    };
    StoryParser.prototype.SortReviewsDESC = function (list) {
        var regex = new RegExp("Reviews: ([0-9,.]+)", "i");
        list.sort(function (a, b) {
            a = $(a);
            b = $(b);
            var numA;
            var numB;
            if (a.is("[data-reviews]")) {
                numA = Number(a.attr("data-reviews"));
            }
            else {
                //TODO: REMOVE
                var dataA = regex.exec(a.find(".z-indent").html());
                numA = (dataA === null) ? 0 : Number(dataA[1].replace(".", "").replace(",", ""));
                a.attr("data-reviews", numA);
            }
            if (b.is("[data-reviews]")) {
                numB = Number(b.attr("data-reviews"));
            }
            else {
                //TODO: REMOVE
                var dataB = regex.exec(b.find(".z-indent").html());
                numB = (dataB === null) ? 0 : Number(dataB[1].replace(".", "").replace(",", ""));
                b.attr("data-reviews", numB);
            }
            return numB - numA;
        });
        return list;
    };
    StoryParser.prototype.SortPublishTime = function (list) {
        list.sort(function (a, b) {
            a = $(a);
            b = $(b);
            var numA;
            var numB;
            if (a.is("[data-publishTime]")) {
                numA = Number(a.attr("data-publishTime"));
            }
            else {
                var dataA = a.find('span[data-xutime]');
                numA = (dataA.length === 1) ? Number(dataA.first().attr('data-xutime')) : Number(dataA.last().attr('data-xutime'));
                a.attr("data-publishTime", numA);
            }
            if (b.is("[data-publishTime]")) {
                numB = Number(b.attr("data-publishTime"));
            }
            else {
                var dataB = a.find('span[data-xutime]');
                numB = (dataB.length === 1) ? Number(dataB.first().attr('data-xutime')) : Number(dataB.last().attr('data-xutime'));
                b.attr("data-publishTime", numB);
            }
            return numA - numB;
        });
        return list;
    };
    StoryParser.prototype.SortPublishTimeDESC = function (list) {
        list.sort(function (a, b) {
            a = $(a);
            b = $(b);
            var numA;
            var numB;
            if (a.is("[data-publishTime]")) {
                numA = Number(a.attr("data-publishTime"));
            }
            else {
                var dataA = a.find('span[data-xutime]');
                numA = (dataA.length === 1) ? Number(dataA.first().attr('data-xutime')) : Number(dataA.last().attr('data-xutime'));
                a.attr("data-publishTime", numA);
            }
            if (b.is("[data-publishTime]")) {
                numB = Number(b.attr("data-publishTime"));
            }
            else {
                var dataB = a.find('span[data-xutime]');
                numB = (dataB.length === 1) ? Number(dataB.first().attr('data-xutime')) : Number(dataB.last().attr('data-xutime'));
                b.attr("data-publishTime", numB);
            }
            return numB - numA;
        });
        return list;
    };
    StoryParser.prototype.SortUpdateTime = function (list) {
        list.sort(function (a, b) {
            a = $(a);
            b = $(b);
            var numA;
            var numB;
            if (a.is("[data-updateTime]")) {
                numA = Number(a.attr("data-updateTime"));
            }
            else {
                var dataA = a.find('span[data-xutime]');
                numA = (dataA.length === 1) ? 9999999999 : Number(dataA.first().attr('data-xutime'));
                a.attr("data-updateTime", numA);
            }
            if (b.is("[data-updateTime]")) {
                numB = Number(b.attr("data-updateTime"));
            }
            else {
                var dataB = a.find('span[data-xutime]');
                numB = (dataB.length === 1) ? 9999999999 : Number(dataB.first().attr('data-xutime'));
                b.attr("data-updateTime", numB);
            }
            return numA - numB;
        });
        return list;
    };
    StoryParser.prototype.SortUpdateTimeDESC = function (list) {
        list.sort(function (a, b) {
            a = $(a);
            b = $(b);
            var numA;
            var numB;
            if (a.is("[data-updateTime]")) {
                numA = Number(a.attr("data-updateTime"));
            }
            else {
                var dataA = a.find('span[data-xutime]');
                numA = (dataA.length === 1) ? 9999999999 : Number(dataA.first().attr('data-xutime'));
                a.attr("data-updateTime", numA);
            }
            if (b.is("[data-updateTime]")) {
                numB = Number(b.attr("data-updateTime"));
            }
            else {
                var dataB = a.find('span[data-xutime]');
                numB = (dataB.length === 1) ? 9999999999 : Number(dataB.first().attr('data-xutime'));
                b.attr("data-updateTime", numB);
            }
            return numB - numA;
        });
        return list;
    };
    /**
     *   Save Config
     */
    StoryParser.prototype.SaveConfig = function (saveToCloud) {
        if (saveToCloud === void 0) { saveToCloud = true; }
        try {
            if (typeof (this.Config.config_key) === "undefined") {
                console.warn("Config Key is Undefined!");
                return false;
            }
            localStorage[this.Config.config_key] = JSON.stringify(this.Config);
            // Save to Chrome Sync API:
            if ((typeof (chrome) !== "undefined") && (typeof (chrome.runtime) !== "undefined") && (this.Config.chrome_sync === true) && saveToCloud) {
                chrome.storage.sync.set(this.Config, function () {
                    console.info("Config saved to Cloud!");
                });
            }
            return true;
        }
        catch (e) {
            console.warn(e);
            console.log("Current Config: ", this.Config);
            return false;
        }
    };
    /**
     *   Save to the session storage
     */
    StoryParser.prototype.SaveDataStore = function () {
        this.SaveToMemory(sessionStorage, this.Config.dataStorage_key, this.DataConfig);
        if (this.DEBUG) {
            console.info("Save to Memory: ", this.DataConfig);
        }
    };
    /**
     *   Loads Config from Memory
     */
    StoryParser.prototype.GetConfig = function () {
        return JSON.stringify(this.Config);
    };
    /**
     *   Overwrites the config with a new one
     *   @param newConfig New Config
     */
    StoryParser.prototype.SetConfig = function (newConfig) {
        if (confirm('Are you shure to overwrite the Config? This will overwrite all your changes!')) {
            var data = JSON.parse(newConfig);
            this.Config = data;
            this.SaveConfig();
        }
    };
    // -------- Multiuse Functions ---------
    /**
     *   Load a JSON-Text from Memory
     *   @param memory Memory to load from
     *   @param key Key of element
     *   @result desearialized Object
     */
    StoryParser.prototype.LoadFromMemory = function (memory, key) {
        if ((memory[key] !== "undefined") &&
            (memory[key] !== "null") &&
            typeof (memory[key]) !== "undefined" &&
            memory[key] != null &&
            memory[key] !== "") {
            return JSON.parse(memory[key]);
        }
        return {};
    };
    /**
     *   Save an object to an JSON File
     *   @param memory Memory to save to
     *   @param key Key of Element
     *   @param object Object File
     */
    StoryParser.prototype.SaveToMemory = function (memory, key, object) {
        try {
            memory[key] = JSON.stringify(object);
        }
        catch (e) {
            console.warn(e);
        }
    };
    /**
     *   Log to the Debug-Console
     *   @param a Parameter A
     *   @param b Parameter B
     *   @param c Paramater C
     */
    StoryParser.prototype.Log = function (a, b, c) {
        if (this.DEBUG) {
            if (typeof (b) === "undefined") {
                console.log(a);
            }
            else if (typeof (c) === "undefined") {
                console.log(a, b);
            }
            else {
                console.log(a, b, c);
            }
        }
    };
    /**
     *   Creates an Info Message
     *   @param a Parameter A
     *   @param b Parameter B
     *   @param c Parameter C
     */
    StoryParser.prototype.Info = function (a, b, c) {
        if (this.DEBUG) {
            if (typeof (b) === "undefined") {
                console.info(a);
            }
            else if (typeof (c) === "undefined") {
                console.info(a, b);
            }
            else {
                console.info(a, b, c);
            }
        }
    };
    /**
     * Executa a function with all Debug Messages
     * @param data Funcion to execute
     */
    StoryParser.prototype.ExecVerbose = function (data) {
        this.VERBOSE = true;
        data();
        this.VERBOSE = false;
    };
    /**
     * Activate full Debug Messages for a certain time
     * @param time Duration of full Debug Log
     */
    StoryParser.prototype.ActivateVerbose = function (time) {
        if (time === void 0) { time = 500; }
        this.VERBOSE = true;
        var self = this;
        window.setTimeout(function () {
            self.VERBOSE = false;
        }, time);
    };
    /**
     *   Gets the Version Ident Number
     *   @param name Name of the Version
     *   @result Version Ident Number
     */
    StoryParser.prototype.GetVersionId = function (name) {
        var parts = name.split(".");
        var version = 0;
        for (var i = 0; i < parts.length; i++) {
            version += Number(parts[i]) * Math.pow(100, (parts.length - i - 1));
        }
        return version;
    };
    // ---------- Localization
    /**
     *   Returns the Language Value for a specific Key
     *   @param key The Key to search for
     *   @result Value in selected Language
     */
    StoryParser.prototype._ = function (key) {
        if (typeof (this.CurrentLanguage) !== "undefined"
            && this.CurrentLanguage !== null
            && typeof (this.CurrentLanguage[key]) !== "undefined"
            && this.CurrentLanguage[key] !== "") {
            return this.CurrentLanguage[key];
        }
        return key;
    };
    return StoryParser;
}());
//# sourceMappingURL=userscript.js.map
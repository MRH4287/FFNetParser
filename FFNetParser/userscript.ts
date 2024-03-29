/// <reference path="_reference.ts" />

/*// <reference path="GameEngine/Interfaces/GameHandler.d.ts" /> */

class StoryParser {
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
    public VERSION = '@@VERSION';

    /**
     * The current Git Branch.
     * IS replaced by Grunt.
     */
    public BRANCH = '@@BRANCH'; // dev

    /**
     * A stored version of the Script is used
     */
    public LOAD_INTERNAL: boolean = false;

    /**
     *  The Event-Handler used for processing
     */
    public eventHandler: EventHandler = new EventHandler(this);

    /**
     * Module used for the GUI
     */
    public GUI: GUIHandler = new GUIHandler(this);

    /**
     * Handler for Upgrades to the Config Values
     */
    public upgrade: UpgradeHandler = new UpgradeHandler(this);

    /**
     * The Paragraph Menu of the current Page
     */
    public paragramMenu: ParagraphMenu = null;

    /**
     *  The API used for connecting to Github
     */
    public githubAPi: GithubAPI = new GithubAPI(this);

    /**
     * The System used to handle Usernames
     */
    public userHandler: UserHandler = new UserHandler(this);

    /**
     * The Config of the Script
     */
    public config: Config = {
        // Story:
        story_search_depth: 2, // The Max depth for a recursive search
        mark_M_storys: true, // Mark every Story Rated as M
        hide_non_english_storys: true, // Hide all Storys, that are not in english
        allow_copy: false,
        language: 'en',
        sortFunction: 'default',

        // Layout:
        color_normal: '#FFFFFF',
        color_mouse_over: '#EEF0F4',
        color_odd_color: '#dfdfdf',
        hide_images: false,
        hide_lazy_images: false,
        disable_image_hover: false,
        content_width: '90%',
        enable_chapter_review_ratio: false,
        enable_read_chapter_info: false,
        reading_info_ChapterMarker: '[R] {Name}',
        print_story_hidden: false,

        // Reading Help:
        readingHelp_enabled: false,
        readingHelp_backgroundColor: null,
        readingHelp_color: null,

        // Endless Mode:
        endless_enable: false, // Is the Endless Mode Enabled
        endless_forceClickAfter: 5, // Show a "Next Page" button after X pages

        // API:
        api_enabled: false,
        pocket_user: null,
        pocket_password: null,
        api_url: 'https://www.mrh-development.de/FanFictionUserScript',
        api_lookupKey: 'ffnet-api-interface',
        api_timeout: 3000,
        api_retries: 2,
        api_checkForUpdates: true,
        api_autoIncludeNewVersion: true,
        api_webSocketServerAddress: 'wss://www.mrh-development.de:8182',
        api_github_url: 'https://www.mrh-development.de/api/ffgithub',
        api_github_requestStart_url:
            'https://www.mrh-development.de/FFNetGithub/RedirectToAccessSite/',

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
        storage_key: 'ffnet-storycache',
        config_key: 'ffnet-config',
        dataStorage_key: 'ffnet-dataStore',

        highlighter: {},
        highlighterPrefabs: {},
        marker: {},
        token: undefined,
        markerBackup: {},
        storyReminder: {},

        upgradeTags: {},
    };

    /**
     * Used for the reset of the config
     */
    private baseConfig = $.extend({}, this.config);

    // ----------------------

    /**
     * The number of hidden Elements
     */
    private hidden: { [index: number]: number } = {};

    /**
     * The hidden elements and the reason for hiding.
     * Index: Link, Value: reason
     */
    private hiddenElements: { [index: number]: { [index: string]: string } } =
        {};

    /**
     * List of found Elements
     * Key: Headline, Value: List of Links
     */
    public eList: { [index: number]: { [index: string]: StoryInfo[] } } = {};

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
    public useCORS = false;

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
     * The List of pendig requests
     * Index: ElementID - data-ElementIdent Attribute
     */
    private requestsPending: { [index: number]: number } = {};

    /**
     * The Last used for an Element in the List
     */
    private lastElementID: number = 0;

    /**
     *  The currently selected Language
     */
    public currentLanguage: { [index: string]: string } = null;

    /**
     * The List of Available Language Elements
     **/
    public availableLanguges: LanguageData[] = null;

    /**
     *  The name mapping for the Sort Function
     **/
    public sortMap: { [index: string]: SortFunctionDefinition } = {
        default: {
            Function: this.sort_elementIdent,
            Name: this._('Default Sorting'),
        },
        defaultDESC: {
            Function: this.sort_elementIdent_DESC,
            Name: this._('Default Sorting [Inverted]'),
        },
        suggestion: {
            Function: this.sort_suggestionLevel,
            Name: this._('Suggested [Lowest Up]'),
        },
        suggestionDESC: {
            Function: this.sort_suggestionLevel_DESC,
            Name: this._('Suggested [Highest Up]'),
        },
        chapters: {
            Function: this.sort_chapterCount,
            Name: this._('Chapter Count [Lowest Up]'),
        },
        chaptersDESC: {
            Function: this.sort_chapterCount_DESC,
            Name: this._('Chapter Count [Highest Up]'),
        },
        words: {
            Function: this.sort_wordsCount,
            Name: this._('Word Count [Lowest Up]'),
        },
        wordsDESC: {
            Function: this.sort_wordsCount_DESC,
            Name: this._('Word Count [Highest Up]'),
        },
        followers: {
            Function: this.sort_Follows,
            Name: this._('Followers [Lowest Up]'),
        },
        followersDESC: {
            Function: this.sort_Follows_DESC,
            Name: this._('Followers [Highest Up]'),
        },
        favs: {
            Function: this.sort_Favs,
            Name: this._('Favs [Lowest Up]'),
        },
        favsDESC: {
            Function: this.sort_Favs_DESC,
            Name: this._('Favs [Highest Up]'),
        },
        publishTime: {
            Function: this.sort_publishTime,
            Name: this._('Publish Time [Oldest Up]'),
        },
        publishTimeDESC: {
            Function: this.sort_publishTime_DESC,
            Name: this._('Publish Time [Newest Up]'),
        },
        updateTime: {
            Function: this.sort_updateTime,
            Name: this._('Update Time [Oldest Up]'),
        },
        updateTimeDESC: {
            Function: this.sort_updateTime_DESC,
            Name: this._('Update Time [Newest Up]'),
        },
        reviews: {
            Function: this.sort_reviews,
            Name: this._('Review Count [Lowest Up]'),
        },
        reviewsDESC: {
            Function: this.sort_reviews_DESC,
            Name: this._('Review Count [Highest Up]'),
        },
        chapterReviewRatio: {
            Function: this.sort_chapterReviewRatio,
            Name: this._('Chapter/Review Ratio'),
        },
        chapterReviewRatingDESC: {
            Function: this.sort_chapterReviewRatio_DESC,
            Name: this._('Chapter/Review Ratio [Descending]'),
        },
    };

    /**
     *   Resets Config to the default setting
     */
    public defaultConfig() {
        if (typeof this.config['token'] === 'undefined') {
            // Generates Random Token
            this.config['token'] = Math.random().toString().split('.')[1];
            this.save_config(false);
        }

        var token = this.config.token;

        this.config = this.baseConfig;

        this.config.token = token;

        this.save_config();
    }

    /**
     *   Initializes System
     */
    constructor() {
        this.eventHandler.callEvent('preInit', this, null);

        var self = this;

        var isNested = this.IGNORE_NEW_VERSION;

        if (typeof sessionStorage['ffnet-mutex'] !== 'undefined') {
            if (this.DEBUG) {
                console.log('Found Mutex!');
            }

            isNested = true;

            if (typeof localStorage['ffnet-Script-VersionID'] !== 'undefined') {
                var newVersionID = Number(
                    localStorage['ffnet-Script-VersionID']
                );
                var currentID = this.getVersionId(this.VERSION);

                this.log('Current Version ID: ', currentID);
                this.log('Cached Version ID: ', newVersionID);

                if (newVersionID > currentID) {
                    this.log('New Version in Storage found ...');
                } else {
                    try {
                        this.log(
                            'The cached Version is older or the same as the current -> delete'
                        );
                        delete localStorage['ffnet-Script-VersionID'];
                        delete localStorage['ffnet-Script'];
                    } catch (e) {
                        console.error("Couldn't delete cached Version", e);
                    }
                }
            }
        }

        if (!isNested) {
            // Check for new Version
            var data = this.loadFromMemory(localStorage, 'ffnet-Script');

            if (typeof data.script !== 'undefined') {
                if (this.DEBUG) {
                    console.info('Found External Script! Loading ....');
                }

                sessionStorage['ffnet-mutex'] = true;

                window.setTimeout(function () {
                    delete sessionStorage['ffnet-mutex'];

                    if (self.DEBUG) {
                        console.log('Delete Mutex Var');
                    }
                }, 1000);

                try {
                    /*! jshint ignore:start */
                    eval(data.script);
                    /*! jshint ignore:end */
                } catch (e) {
                    console.error('Invalid Local Script! Deleting');
                    delete localStorage['ffnet-Script'];
                }

                this.LOAD_INTERNAL = true;

                // Abort
                return;
            }
        } else {
            try {
                // Load Version Infos into the Local Storage:
                localStorage['ffnet-Script-VersionID'] = this.getVersionId(
                    this.VERSION
                );
            } catch (e) {
                console.error("Can't save Version id: ", e);
            }
        }

        try {
            // Checks if sessionStorage entry is valid:
            this.storyCache = this.loadFromMemory(
                sessionStorage,
                this.config.storage_key
            );
            this.eventHandler.callEvent(
                'onStoryCacheLoad',
                this,
                this.storyCache
            );

            this.dataConfig = this.loadFromMemory(
                sessionStorage,
                this.config.dataStorage_key
            );
            this.eventHandler.callEvent(
                'onDataConfigLoad',
                this,
                this.dataConfig
            );
        } catch (ex) {
            console.warn(ex);
        }

        var defaultConfig = this.config;

        try {
            this.config = this.loadFromMemory(
                localStorage,
                this.config.config_key
            );
            this.eventHandler.callEvent('onConfigLoad', this, this.config);
        } catch (ex) {
            console.warn(ex);
        }

        // Check for DEBUG-Mode
        if (
            typeof this.config['debug'] !== 'undefined' ||
            this.BRANCH === 'dev'
        ) {
            this.DEBUG = true;
        }

        // Check for Config Values:

        if (
            typeof this.config['pocket_user'] === 'undefined' ||
            this.config['pocket_user'] === ''
        ) {
            this.config['pocket_user'] = null;
        }

        if (
            typeof this.config['pocket_password'] === 'undefined' ||
            this.config['pocket_password'] === ''
        ) {
            this.config['pocket_password'] = null;
        }

        if (typeof this.config['token'] === 'undefined') {
            // Generates Random Token
            this.config['token'] = Math.random().toString().split('.')[1];
            this.save_config();
        }

        if (typeof this.config['api_autoIncludeNewVersion'] === 'undefined') {
            // Only Check if the Script is not loaded over Chrome!
            if (
                typeof chrome === 'undefined' ||
                typeof chrome.runtime === 'undefined'
            ) {
                // Creates Warning for new Feature:

                var text = '<div><b>Please Read!</b><br />';
                text +=
                    "In one of the previous version, a new feature has been implemented. With this Feature activated, you don't have to manually install new Versions. ";
                text +=
                    'Newer Versions will be saved in your Local Storage and then executed. Because of that, the Version Number displayed in your UserScript Manager ';
                text +=
                    'can be wrong. To Display the Version Number, check your Menu.';
                text += 'Do you want to activate this Feature?</div>';

                var buttons = [];
                var modal: JQuery;

                buttons.push(
                    $(
                        '<button class="btn btn-primary">Enable Feature</button>'
                    ).click(() => {
                        modal.modal('hide');

                        self.config['api_autoIncludeNewVersion'] = true;
                        self.save_config();
                    })
                );

                buttons.push(
                    $(
                        '<button class="btn btn-default">Keep Disabled</button>'
                    ).click(() => {
                        modal.modal('hide');

                        self.config['api_autoIncludeNewVersion'] = false;
                        self.save_config();
                    })
                );

                modal = GUIHandler.createBootstrapModal(
                    $(text),
                    'Fanfiction Story Parser',
                    buttons
                );

                window.setTimeout(function () {
                    GUIHandler.showModal(modal);
                }, 1000);
            } else {
                self.config['api_autoIncludeNewVersion'] = false;
                self.save_config();
            }
        }

        // Google Storage Sync:
        if (
            typeof chrome !== 'undefined' &&
            typeof chrome.runtime !== 'undefined' &&
            this.config.chrome_sync
        ) {
            window.setTimeout(function () {
                self.eventHandler.callEvent('onChromeSync', self, null);
                console.info('Load Config from Chrome Server');

                // Load Config from the Chrome Server:
                chrome.storage.sync.get((result: any) => {
                    self.log('Got Data from Chrome Server: ', result);

                    self.eventHandler.callEvent(
                        'onChromeSyncDataReceived',
                        self,
                        result
                    );

                    $.each(self.config, function (name, oldValue) {
                        if (typeof result[name] !== 'undefined') {
                            self.log(
                                "Key: '" + name + "'",
                                oldValue,
                                result[name]
                            );

                            self.config[name] = result[name];
                        }
                    });
                });
            }, 2000);

            chrome.storage.onChanged.addListener(function (changes, namespace) {
                if (namespace !== 'sync') {
                    return;
                }

                self.eventHandler.callEvent('onChromeSyncChange', self, [
                    changes,
                    namespace,
                ]);

                $.each(changes, function (key, storageChange) {
                    //var storageChange = changes[key];
                    console.log(
                        'Storage key "%s" changed. ' +
                            'Old value was "%s", new value is "%s".',
                        key,
                        storageChange.oldValue,
                        storageChange.newValue
                    );

                    if (self.config[key] === storageChange.oldValue) {
                        self.config[key] = storageChange.newValue;
                    } else if (self.config[key] !== storageChange.newValue) {
                        // Use local Value for UpgradeTags
                        if (key !== 'upgradeTags') {
                            console.warn(
                                'Conflict with Cloud Storage! Use data from Cloud Storage.'
                            );
                            try {
                                //localStorage[self.config.storage_key + "_Conflict" + Date.now()] = JSON.stringify(self.config);
                            } catch (e) {}

                            self.config[key] = storageChange.newValue;
                        } else {
                            var val = <{ [index: string]: UpgradeTag }>(
                                storageChange.newValue
                            );
                            $.each(val, function (key, val) {
                                if (!(key in self.config.upgradeTags)) {
                                    self.config.upgradeTags[key] = val;
                                }
                            });
                        }
                    }
                });
            });
        }

        // Load all the config Values that are listed in the _config Array at startup
        $.each(defaultConfig, function (name, defaultValue) {
            if (typeof self.config[name] === 'undefined') {
                self.config[name] = defaultValue;
            }
        });

        // Check Upgrade Tags:
        this.upgrade.handleTags();

        // Check if we use HTTPS
        this.useHTTPS =
            this.config.api_url.toLowerCase().indexOf('https') !== -1;

        // Check for CORS:
        this.useCORS =
            'XMLHttpRequest' in window &&
            'withCredentials' in new XMLHttpRequest();

        if (this.DEBUG) {
            console.info('Loading User Script...');
        }

        if (this.DEBUG) {
            console.log('Update Check done.');
            console.log('Pre GUI Update');
        }

        // Add jQuery Color Picker to the Page:
        var block = $('<link  rel="stylesheet" type="text/css"></link>').attr(
            'href',
            this.getUrl('bootstrap-colorpicker.min.css')
        );
        $('head').append(block);

        // Check if the current Page is a User Specific Page:
        var locationRegEx = new RegExp('/u/[0-9]+/');
        this.inUsersPage = locationRegEx.test(location.href);

        if (this.DEBUG) {
            console.log('Pre GUI Update done.');
            console.log('Starts GUI Update');
        }

        this.updateGUI();

        if (this.DEBUG) {
            console.log('GUI Update done.');
        }

        window.setTimeout(function () {
            self.eventHandler.callEvent('preParapgraphCheck', self, null);

            // Check if a Paragraph is given in the current request:
            var reg = new RegExp('.+#paragraph=([0-9]+)');
            if (reg.test(location.href)) {
                var match = reg.exec(location.href);
                self.goToParagraphID(Number(match[1]));
            }
        }, 1000);

        //setTimeout(function ()
        //{
        //    self.eventHandler.callEvent("preMessageCheck", self, null);

        //    // Get Messages from Server:
        //    if (typeof (self.dataConfig['messages']) === "undefined")
        //    {
        //        self.api_GetMessages(function (messages)
        //        {
        //            self.eventHandler.callEvent("onMessageGot", self, messages);

        //            if ((typeof (messages.Messages) !== "undefined") && (messages.Messages.length > 0))
        //            {
        //                // New Messages:
        //                self.dataConfig['messages'] = messages.Messages;

        //                // Update Icon:
        //                //$(".ffnetMessageContainer img").attr("src", self.getUrl("message_new-white.png"));
        //                //$(".ffnetMessageContainer").css("background-color", "red");
        //                $(".ffnetMessageContainer").find(".badge").remove();
        //                $(".ffnetMessageContainer").append($('<div class="badge ffnet-messageCount"></div>'));

        //                $('.ffnet-messageCount').text(messages.Messages.length);

        //                self.save_dataStore();
        //            }
        //        });

        //    }
        //    else
        //    {
        //        // Update Icon:
        //        //$(".ffnetMessageContainer img").attr("src", self.getUrl("message_new-white.png"));
        //        $(".ffnetMessageContainer").find(".badge").remove();
        //        $(".ffnetMessageContainer").append($('<div class="badge ffnet-messageCount"></div>'));

        //        $('.ffnet-messageCount').text(self.dataConfig['messages'].length);
        //    }

        //}, 5000);

        this.eventHandler.callEvent('postInit', this, null);
    }

    /**
     *   Adds GUI Elements like Menu Link
     */
    private updateGUI() {
        this.eventHandler.callEvent('preGUIUpdate', this, null);

        if (!this.config.disable_width_change) {
            // Updates Content_width
            $('#content_wrapper').css('width', this.config['content_width']);
        }

        var table = $('.zui').find('td').first();

        var self = this;

        if (table.length > 0) {
            if (this.DEBUG) {
                console.log('Adds User Interface');
            }

            this.eventHandler.callEvent('preGUIMenuAppend', this, table);

            // Add User Interface
            table
                .append(
                    $('<a></a>')
                        .addClass('menu-link')
                        .html(self._('Rerun Filter'))
                        .attr('href', '#')
                        .click(function (e) {
                            self.readAll();
                            e.preventDefault();
                        })
                        .attr('title', self._('Parse the Stories again'))
                )
                .append(
                    $('<a></a>')
                        .addClass('menu-link')
                        .html(self._('Menu'))
                        .attr('href', '#')
                        .click(function (e) {
                            self.GUI.gui();
                            e.preventDefault();
                        })
                        .attr('title', 'Open Config Menu')
                );

            this.eventHandler.callEvent('postGUIMenuAppend', this, table);
        }
        var menulinks = $('.menulink').first();

        if (menulinks.length > 0) {
            this.eventHandler.callEvent(
                'preGUIMessageMenuAppend',
                this,
                menulinks
            );

            var imageContainer = $('<div></div>')
                .css('display', 'inline-block')
                .css('margin-left', '10px')
                .css('height', '100%')
                .css('border-radius', '5px')
                .addClass('ffnetMessageContainer')
                .addClass('ffnetParserContext')
                .addClass('clickable')
                .attr(
                    'title',
                    self._(
                        'Advanced Messaging Features. Sorry, this is not a PM Button :-('
                    )
                )
                .appendTo(menulinks);

            imageContainer.append(
                $('<img></img>')
                    .attr('src', self.getUrl('message-white.png'))
                    .css('width', '20px')
                    .css('margin-bottom', '4px')
            );

            var radius = 15;
            var height = 120;
            var width = 260;

            var messageContainer = $('<div></div>')
                .addClass('ffnet_messageContainer')
                .appendTo('body');

            var innerContainer = $('<div></div>')
                .addClass('innerContainer')
                .appendTo(messageContainer);

            imageContainer.click(function () {
                if (messageContainer.is(':hidden')) {
                    //Set Position of Element:
                    var pos = imageContainer.position();

                    messageContainer
                        .css('top', pos.top + 20 + 'px')
                        .css('left', pos.left - 100 + 'px')
                        .show();

                    //self.api_getLiveChatInfo(function (res)
                    //{
                    //    if (res.DevInRoom)
                    //    {
                    //        $(".liveChatButton").addClass("online")
                    //            .attr("title", self._('The Dev is currently online.'));
                    //    }
                    //    else
                    //    {
                    //        $(".liveChatButton").removeClass("online").removeAttr("title");
                    //    }
                    //});
                } else {
                    messageContainer.hide();
                }
            });

            innerContainer.append(
                $('<div>' + self._('Message Menu (Script)') + '</div>')
                    .css('font-weight', 'bold')
                    .css('margin-bottom', '10px')
            );

            var count = 0;

            if (typeof this.dataConfig['messages'] !== 'undefined') {
                count = this.dataConfig['messages'].length;
            }

            //innerContainer.append(
            //    $('<div><span class="ffnet-messageCount">' + count + "</span> " + self._('Message(s)') + "</div>")
            //        .addClass("menuItem")
            //        .click(function ()
            //        {
            //            messageContainer.hide();

            //            self.GUI.messagesGUI();

            //        })
            //);

            innerContainer.append(
                $('<div>' + self._('Give Feedback') + '</div>')
                    .addClass('menuItem')
                    .click(function () {
                        messageContainer.hide();

                        //self.GUI.feedbackGUI();
                        alert(
                            'Please send me an email to dev' +
                                '@mrh-development.de'
                        );
                    })
            );

            //var liveChatContainer = $("<div>" + self._('Live Chat') + "</div>")
            //    .addClass("menuItem liveChatButton")
            //    .click(function ()
            //    {

            //        messageContainer.hide();

            //        self.GUI.toggleLiveChat();

            //    });

            //if (!this.chat.Available)
            //{
            //    liveChatContainer.unbind("click").attr("title", self._("This Feature is not available in your Browser. Sorry!"));
            //}

            //innerContainer.append(liveChatContainer);

            innerContainer.append(
                $('<div>' + self._('Discord') + '</div>')
                    .addClass('menuItem')
                    .click(function () {
                        messageContainer.hide();
                        window.open('https://discord.gg/bwwqCH3');
                    })
            );

            innerContainer.append(
                $('<div>' + self._('Wiki') + '</div>')
                    .addClass('menuItem')
                    .click(function () {
                        messageContainer.hide();
                        window.open(
                            'https://github.com/MRH4287/FFNetParser/wiki'
                        );
                    })
            );
            //

            this.eventHandler.callEvent(
                'postGUIMessageMenuAppend',
                this,
                menulinks
            );

            // Message Menu End

            // Story Reminder:

            if (!this.config.disable_parahraphMenu) {
                this.eventHandler.callEvent(
                    'preGUIStoryReminderAppend',
                    this,
                    menulinks
                );

                var sRImageContainer = $('<div></div>')
                    .css('display', 'inline-block')
                    .css('margin-left', '10px')
                    .css('height', '100%')
                    .css('border-radius', '5px')
                    .addClass('ffnetStoryReminderContainer')
                    .addClass('clickable')
                    .attr('title', self._('Saved Story Reminder'))
                    .appendTo(menulinks);

                sRImageContainer.append(
                    $('<img></img>')
                        .attr('src', self.getUrl('notes.png'))
                        .css('width', '12px')
                        .css('margin-bottom', '4px')
                );

                sRImageContainer.click(function (event) {
                    event.preventDefault();

                    var table = $(
                        '<table class="table table-hover table-responsive table-border"></table>'
                    );
                    table.append(
                        '<tr><th>' +
                            self._('ID') +
                            '</th><th>' +
                            self._('Name') +
                            '</th><th>' +
                            self._('Chapter') +
                            '</th><th>' +
                            self._('Time') +
                            '</th><th>' +
                            self._('Visited') +
                            '</th><th>' +
                            self._('Options') +
                            '</th></tr>'
                    );

                    var modal = GUIHandler.createBootstrapModal(
                        table,
                        self._('Saved Story Reminder')
                    );

                    $.each(
                        self.config.storyReminder,
                        function (_, el: StoryReminderData) {
                            $('<tr></tr>')
                                .append($('<td></td>').text(el.storyID))
                                .append($('<td></td>').text(el.name))
                                .append($('<td></td>').text(el.chapter))
                                .append(
                                    $('<td></td>').text(
                                        new Date(el.time).toLocaleString()
                                    )
                                )
                                .append(
                                    $('<td></td>').text(
                                        el.visited
                                            ? self._('Yes')
                                            : self._('No')
                                    )
                                )
                                .append(
                                    $('<td></td>').append(
                                        $(
                                            '<a href="#">' +
                                                self._('Delete') +
                                                '</a>'
                                        ).click(function (e) {
                                            e.preventDefault();
                                            if (
                                                confirm(
                                                    self._(
                                                        'Do you really want to delete that element?'
                                                    )
                                                )
                                            ) {
                                                delete self.config
                                                    .storyReminder[_];
                                                self.save_config();
                                                modal.modal('hide');
                                            }
                                        })
                                    )
                                )
                                .addClass('clickable')
                                .click(function (e) {
                                    e.preventDefault();

                                    self.config.storyReminder[_].visited = true;
                                    self.save_config();

                                    location.href = el.url;
                                })
                                .appendTo(table);
                        }
                    );

                    GUIHandler.showModal(modal);
                });

                this.eventHandler.callEvent(
                    'postGUIStoryReminderAppend',
                    this,
                    menulinks
                );
            }

            if (
                !self.config.disable_highlighter &&
                !self.config.disable_highlighter_list
            ) {
                var hLImageContainer = $('<div></div>')
                    .css('display', 'inline-block')
                    .css('margin-left', '10px')
                    .css('height', '100%')
                    .css('border-radius', '5px')
                    .addClass('ffnetHighlighterListContainer')
                    .addClass('clickable')
                    .attr('title', self._('Highlighter List'))
                    .appendTo(menulinks);

                hLImageContainer.append(
                    $('<img></img>')
                        .attr('src', self.getUrl('highlighter.png'))
                        .css('width', '12px')
                        .css('margin-bottom', '4px')
                );

                hLImageContainer.click(function (event) {
                    event.preventDefault();

                    // Collect Data:
                    var groups: { [index: string]: string[] } = {};

                    $.each(
                        self.config.highlighter,
                        function (key: string, data: HighlighterConfig) {
                            var prefab = 'Custom Highlighter';
                            if (data.prefab !== null) {
                                prefab = data.prefab;
                            }

                            if (groups[prefab] === undefined) {
                                groups[prefab] = [];
                            }

                            groups[prefab].push(key);
                        }
                    );

                    var contentContainer = $(
                        '<div id="ffnet_highlighterGroup" class="panel-group" role="tablist" aria-multiselectable="true"></div>'
                    );

                    var modal = GUIHandler.createBootstrapModal(
                        contentContainer,
                        self._('Highlighter List')
                    );

                    $.each(groups, function (name: string, elements: string[]) {
                        var panelBody = $('<div class="panel-body"></div>');

                        var list = $('<ul></ul>').appendTo(panelBody);

                        var image = null;
                        if (
                            self.config.highlighterPrefabs[name] !== undefined
                        ) {
                            var highlighterPrefab =
                                self.config.highlighterPrefabs[name];
                            if (
                                highlighterPrefab.image !== undefined &&
                                highlighterPrefab.image !== null
                            ) {
                                image = $('<img></img>')
                                    .attr('src', highlighterPrefab.image)
                                    .css('max-height', '16px')
                                    .css('max-width', '16px')
                                    .css('margin-right', '10px');
                            }
                        }

                        var prefabName = name
                            .replace(' ', '_')
                            .replace("'", '')
                            .replace('"', '')
                            .replace('.', '_')
                            .replace(',', '_');

                        var panel = $(
                            '<div class="panel panel-default"></div>'
                        );
                        panel
                            .append(
                                $('<div class="panel-heading" role="tab"></div')
                                    .attr('id', 'heading' + prefabName)
                                    .append(
                                        $(
                                            '<h4 class="panel-title"></h4'
                                        ).append(
                                            $(
                                                '<a role="button" class="collapsed" data-toggle="collapse" data-parent="#ffnet_highlighterGroup" aria-expanded="false"></a>'
                                            )
                                                .attr(
                                                    'aria-controls',
                                                    'collapse' + prefabName
                                                )
                                                .attr(
                                                    'href',
                                                    '#collapse' + prefabName
                                                )
                                                .append(image)
                                                .append(
                                                    $('<span></span>').text(
                                                        name
                                                    )
                                                )
                                        )
                                    )
                            )
                            .append(
                                $(
                                    '<div class="panel-collapse collapse" role="tabpanel"></div>'
                                )
                                    .attr('id', 'collapse' + prefabName)
                                    .attr(
                                        'aria-labelledby',
                                        'heading' + prefabName
                                    )
                                    .append(panelBody)
                            );

                        $.each(elements, function (_, value: string) {
                            var link = self.config.highlighter_use_storyID
                                ? '/s/' + value
                                : value;
                            var aElement = $('<a></a>')
                                .attr('href', link)
                                .text(value);
                            var spanElement = $('<span></span>');
                            list.append(
                                $('<li></li>')
                                    .append(aElement)
                                    .append(spanElement)
                            );

                            self.getPageContent(link, function (body) {
                                var title = body
                                    .find('#profile_top > .xcontrast_txt')
                                    .first()
                                    .text();
                                var lastUpdate = body
                                    .find('#profile_top > .xcontrast_txt')
                                    .last()
                                    .find('[data-xutime]')
                                    .first()
                                    .text();

                                spanElement.text(
                                    ' (Last Updated: ' + lastUpdate + ')'
                                );
                                aElement.text(title);
                            });
                        });

                        contentContainer.append(panel);
                    });

                    contentContainer.collapse();

                    GUIHandler.showModal(modal);
                });
            }
        } else {
            if (this.DEBUG) {
                console.warn("Can't find Element .menulink ", menulinks);
            }
        }

        // Add GUI for "Only Mode":
        var container = $('#filters > form > .modal-body');

        if (container.length > 0) {
            this.eventHandler.callEvent(
                'preGUIOnlyModeAppend',
                this,
                container
            );

            if (this.DEBUG) {
                console.log('Add GUI for "Only Mode"');
            }

            var input = $('<select></select>')
                .attr(
                    'title',
                    self._('Display Only Elements that match a specific Filter')
                )
                .change(function () {
                    var selected = input
                        .children()
                        .filter(':selected')
                        .attr('value');
                    if (self.DEBUG) {
                        console.info(
                            'Display Only - Element Selected: ',
                            selected
                        );
                    }

                    if (selected !== 'off') {
                        self.dataConfig['displayOnly'] = selected;
                    } else {
                        self.dataConfig['displayOnly'] = undefined;
                    }

                    self.save_dataStore();
                    self.readAll();
                })
                .addClass('filter_select');

            var noneEntry = $(
                '<option value="off">' +
                    self._('Display: Everything') +
                    '</option>'
            ).appendTo(input);

            if (typeof this.dataConfig['displayOnly'] === 'undefined') {
                noneEntry.attr('selected', 'selected');
            }

            $.each(this.config.marker, function (title, info) {
                var entry = $('<option></option>')
                    .attr('value', title)
                    .html(title)
                    .appendTo(input);

                if (
                    typeof self.dataConfig['displayOnly'] !== 'undefined' &&
                    title === self.dataConfig['displayOnly']
                ) {
                    entry.attr('selected', 'selected');
                }
            });

            container
                .find('select')
                .not('.filter_select_negative ')
                .last()
                .after(input);

            input.before('&nbsp;');

            this.eventHandler.callEvent(
                'postGUIOnlyModeAppend',
                this,
                container
            );
        }

        // Key Control for Page:

        $('body').keydown(function (event) {
            self.eventHandler.callEvent('onKeyDown', self, event);

            var container = $('#content_wrapper_inner').find('center').last();
            var current = container.find('b').first();
            var url = null;

            if ($(event.target).is('body')) {
                var element: JQuery;
                // right
                if (event.keyCode === 39) {
                    element = current.next('a');
                    if (element.length !== 0) {
                        url = element.attr('href');
                    }

                    if (url == null) {
                        element = $('body')
                            .find('button:contains(Next)')
                            .first();
                        if (element.length !== 0) {
                            url = self.getUrlFromButton(element);
                        }
                    }
                }
                // left
                else if (event.keyCode === 37) {
                    element = current.prev('a');
                    if (element.length !== 0) {
                        url = element.attr('href');
                    }

                    if (url == null) {
                        element = $('body')
                            .find('button:contains(Prev)')
                            .first();
                        if (element.length !== 0) {
                            url = self.getUrlFromButton(element);
                        }
                    }
                }

                if (url !== null) {
                    if (self.DEBUG) {
                        console.log('Changes to Page: ', url);
                    }

                    location.href = url;
                }
            }
        });

        this.eventHandler.callEvent('postGUIUpdate', this, null);
    }

    /**
     *  Initial Read
     */
    public readList() {
        var self = this;

        if (this.LOAD_INTERNAL) {
            return;
        }

        this.eventHandler.callEvent('preReadList', this, null);

        // Wrap Content:
        var wrapper = this.createPageWrapper();

        // Only run, if not a Story List
        if (wrapper !== null) {
            this.read(wrapper);
        } else {
            // If Story List, then exec Alow Copy Check

            window.setTimeout(function () {
                if (self.config.allow_copy) {
                    self.log('Allow Selection of Text');
                    $('.nocopy')
                        .removeClass('nocopy')
                        .parent()
                        .attr('style', 'padding: 0px 0.5em;');
                }
            }, 1000);

            this.readStory();

            this.manageReadChaptersInfo();
        }

        this.eventHandler.callEvent('postReadList', this, null);
    }

    /**
     * Parse the Content of all PageWrapper
     */
    public readAll() {
        var self = this;

        this.log('Parse all PageWrapper');

        // Reset Handled Stories:
        $.each(self.requestsPending, function (elementID, data) {
            self.log('Remove pending Request for ElementID', elementID);

            delete self.requestsPending[elementID];
        });

        $.each(this.wrapperList, function (page: number, wrapper: JQuery) {
            self.log('Parse Page: ', page);

            self.read(wrapper);
        });
    }

    /**
     *   Parses the elements in the specified Container
     *   @param container The PageWrapper for the Elements
     */
    public read(container: JQuery) {
        if (this.LOAD_INTERNAL) {
            return;
        }

        this.eventHandler.callEvent('preRead', this, container);

        var page = Number(container.attr('data-page'));

        this.log('Read List for Page: ', page);

        var elements = container.find('.z-list');

        var odd = false;

        // Clear old Session:
        this.eList[page] = {};
        this.hidden[page] = 0;
        this.hiddenElements[page] = {};
        container.find('.parser-msg').remove();
        container.find('[data-color]').removeAttr('data-color');

        var self = this;
        elements.each(function (k, e) {
            var element = $(e);

            self.eventHandler.callEvent('preElementParse', self, element);

            // Reset Hide:
            element.show();

            var textEl = element.find('div').last();
            var text = element.text().toLowerCase();
            var color = self.config.color_normal;
            var colorMo = self.config.color_mouse_over;
            var link = element.find('a').first().attr('href');

            var storyInfo = self.getStoryInfo(link);
            var storyName = storyInfo.Name;

            var requestQueue: RequestQueueData[] = [];

            // Set ItemID used for the Pendig Requests List:
            if (!element.is('[data-ElementIdent]')) {
                element.attr('data-ElementIdent', self.lastElementID++);
            }

            // Set StoryID:
            if (!element.is('[data-StoryID]')) {
                element.attr('data-StoryID', storyInfo.ID);
            }

            // Remove Suggestion Level:
            element.attr('data-suggestionLevel', '0');

            if (
                self.config.hide_non_english_storys &&
                text.indexOf('english') === -1
            ) {
                if (self.DEBUG) {
                    console.log(
                        "Hide Element because of 'hide_non_english_storys'",
                        link
                    );
                }

                self.hiddenElements[page][link] = 'hide_non_english_storys';

                element.hide();
                self.hidden[page] += 1;
                return;
            }

            if (odd) {
                color = self.config.color_odd_color;
                odd = false;
            } else {
                odd = true;
            }

            var markerFound = false;

            $.each(
                self.config.marker,
                function (headline: string, config: MarkerConfig) {
                    var ignore = false;
                    $.each(config.ignore, function (i: number, marker: string) {
                        try {
                            var reg = new RegExp(marker, 'i');

                            if (marker !== '' && reg.test(text)) {
                                // Ignore this Element
                                ignore = true;
                                return;
                            }
                        } catch (e) {
                            console.warn(e);
                        }
                    });

                    if (ignore) {
                        return;
                    }

                    var found = false;

                    $.each(
                        config.keywords,
                        function (i: number, marker: string) {
                            var reg = new RegExp(marker, 'i');

                            if (!found) {
                                if (reg.test(text)) {
                                    found = true;
                                }
                            }
                        }
                    );

                    if (found) {
                        if (!config.ignoreColor) {
                            markerFound = true;
                        } else if (self.DEBUG) {
                            console.log('Ignore Color for ', headline);
                        }

                        var info: StoryInfo = {
                            name: storyName,
                            url: link,
                            id: storyInfo.ID,
                            chapter: 0,
                        };

                        self.elementCallback(
                            self,
                            config,
                            element,
                            textEl,
                            headline,
                            info,
                            page
                        );
                    }

                    if (
                        (!found && config.search_story) ||
                        config.keep_searching
                    ) {
                        var parseData: RequestQueueData = {
                            url: link,
                            headline: headline,
                            config: config,
                            element: element,
                            textEl: textEl,
                            info: info,
                            storyName: storyName,
                        };

                        requestQueue.push(parseData);
                    }

                    if (self.config.mark_M_storys) {
                        textEl.html(
                            textEl.html().replace('Rated: M', '<b>Rated: M</b>')
                        );
                    }
                }
            );

            if (self.config['hide_images']) {
                element.find('img').not('.parser-msg').hide();
            }

            // Highlighter:

            if (!self.config.disable_highlighter) {
                // Build Context Menu for Storys:
                var contextMenu = $('<div></div>')
                    .css('width', '20px')
                    .css('height', '20px')
                    .css('float', 'right')
                    .addClass('parser-msg')
                    .addClass('context-menu')
                    .append(
                        $('<img></img>')
                            .attr('src', self.getUrl('edit.gif'))
                            .css('width', '100%')
                            .css('height', '100%')
                    );

                // Open GUI
                contextMenu.click(function () {
                    if (self.DEBUG) {
                        console.log('Context Menu for ', element, ' clicked');
                    }

                    self.GUI.showStoryPrefabList({
                        url: link,
                        element: element,
                        name: storyName,
                        id: storyInfo.ID,
                    });
                });

                element.find('div').first().before(contextMenu);

                var highlighterKey = self.config.highlighter_use_storyID
                    ? storyInfo.ID
                    : link;
                // Highlighter found:
                if (
                    typeof self.config['highlighter'][highlighterKey] !==
                    'undefined'
                ) {
                    self.highlighterCallback(
                        self,
                        self.config.highlighter[highlighterKey],
                        element,
                        link,
                        page
                    );
                }
            }

            if (!markerFound) {
                /*if (_DEBUG)
                {
                    console.log("[_read] Change Color of Line: ",element); 
                }*/

                if (typeof self.dataConfig['displayOnly'] !== 'undefined') {
                    if (self.DEBUG) {
                        console.log(
                            'Hide Entry because of Display-Only Mode: ',
                            element
                        );
                    }

                    self.hiddenElements[page][link] = 'Display-Only Mode';

                    element.fadeOut();
                    self.hidden[page] += 1;
                } else {
                    if (!self.config.disable_default_coloring) {
                        self.updateColor(element, color, -1, colorMo, -1);
                    }
                }
            }

            // Add Anchor:
            element.find('a').first().attr('name', storyName);

            // Chapter Review Ratio
            self.manageChapterReviewRatio(element);

            self.doParse(requestQueue, page);

            self.eventHandler.callEvent('postElementParse', self, element);
        });

        self.manageReadChaptersInfo();

        // Sort Elements:
        if (
            typeof this.config.sortFunction !== 'undefined' &&
            this.config.sortFunction !== 'default'
        ) {
            if (typeof this.sortMap[this.config.sortFunction] !== 'undefined') {
                var sortfunction = this.sortMap[this.config.sortFunction];
                this.sortStories(sortfunction.Function, container);
            } else {
                console.warn(
                    'Unknown SortFunction: ',
                    this.config.sortFunction
                );
                this.config.sortFunction = 'default';
                this.save_config(false);
            }
        }

        if (this.DEBUG) {
            console.info(
                'Current Highlighter Settings: ',
                this.config['highlighter']
            );
        }

        this.updateList(page);

        // Timed Events:
        setTimeout(function () {
            // Color corrections
            elements.filter('[data-color]').each(function (k, e) {
                var el = $(e);
                var color = el.attr('data-color');
                var colorMo = el.attr('data-mouseOverColor');

                el.css('background-color', color);

                el.unbind('mouseenter').unbind('mouseleave');

                el.mouseenter(function () {
                    $(this).css('background-color', colorMo);
                }).mouseleave(function () {
                    $(this).css('background-color', color);
                });
            });

            // Disable Image Hover Effect:
            if (self.config.disable_image_hover) {
                if ($('.disableImageHoverClass').length === 0) {
                    $('head').append(
                        $('<style class="disableImageHoverClass"></style')
                            .text('.z-list_hover { height: auto !important }')
                            .addClass('parser-msg')
                    );
                }

                elements.find('.cimage').each(function (k, e) {
                    var el = $(e);
                    var width = el.width();
                    var height = el.height();

                    el.css('width', width + 'px').css('height', height + 'px');
                });
            }

            if (self.config.hide_lazy_images) {
                elements.find('.lazy').remove();
            }
        }, 1000);

        this.eventHandler.callEvent('postRead', this, container);
    }

    /**
     *   Gets the Information of a story from a Link
     *   @param link Link to story
     *   @result Name of Story
     */
    public getStoryInfo(link: string): {
        Chapter: string;
        Name: string;
        ID: string;
    } {
        var data: { Chapter: string; Name: string; ID: string } = {
            Chapter: null,
            ID: null,
            Name: null,
        };

        var storyNameReg = /\/s\/([0-9]+)\/?([0-9]*)\/?(.*)/;
        var result = storyNameReg.exec(link);

        if (result != null && result.length > 1) {
            data.ID = result[1];
            data.Chapter = result[2];
            data.Name = result[3];

            return data;
        } else {
            storyNameReg = /\/[^\/]+\/(.+)/;
            result = storyNameReg.exec(link);
            if (result != null && result.length > 1) {
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
    private doParse(
        queue: RequestQueueData[],
        page: number,
        initiated: number = -1,
        i = 0
    ) {
        if (queue.length === 0) {
            this.log('Empty Request Queue. Abort');

            return;
        }

        if (i >= queue.length) {
            if (typeof queue[0] !== 'undefined') {
                // The Queue is finished. Close all Requests.
                var firstID = Number(
                    queue[0].element.attr('data-ElementIdent')
                );
                delete this.requestsPending[firstID];
            }

            this.log('Queue finished.', firstID);

            return;
        }

        var data = queue[i];

        var url: string;

        if (typeof data === 'undefined') {
            this.log('Data not defined. Abort - ', page, initiated);
            return;
        }

        var elementID = Number(data.element.attr('data-ElementIdent'));

        if (this.DEBUG) {
            console.info(
                'Execute Queue for ' +
                    elementID +
                    ', i: ' +
                    i +
                    ', page: ' +
                    page +
                    ', initated: ' +
                    initiated,
                data,
                queue
            );
        }

        // Check if there is a pending Request:
        if (elementID in this.requestsPending) {
            // Check if it is the same Request as the current one:
            if (this.requestsPending[elementID] !== initiated) {
                this.info(
                    'Stopping InStorySearch Request. Not the last triggered Request: ',
                    elementID,
                    initiated
                );
                return;
            }
        } else {
            if (i === 0) {
                // ElementID not in pending Requests:
                initiated = Date.now();
                this.log('Add pending Request: ', elementID, initiated);
                this.requestsPending[elementID] = initiated;
            } else {
                this.info(
                    'Stopping InStorySearch Request. ElementID not in pending Requests: ',
                    elementID,
                    initiated
                );
                return;
            }
        }

        url = data.url;

        // Check for ScriptInsert Page:
        if (document.location.href.indexOf('file://') === -1) {
            var domainRegex = new RegExp('https?://[^/]+');
            var result = domainRegex.exec(location.href);
            if (result !== undefined && result !== null) {
                var domain = result[0];
                url = domain + data.url;
            }
        } else {
            this.log('Detected File-URL. Abort Sory Request');
            return;
        }

        var self = this;

        var executeNext = function () {
            self.doParse(queue, page, initiated, i + 1);
        };

        var callback = function (info) {
            var el = queue[i];

            if (self.DEBUG) {
                console.info(
                    'execute Callback Function ' + el.headline + ' for ',
                    info
                );
            }

            self.elementCallback(
                self,
                el.config,
                el.element,
                el.textEl,
                el.headline,
                info,
                page
            );

            executeNext();
        };

        self.parse(
            url,
            data.config,
            callback,
            0,
            executeNext,
            elementID,
            initiated
        );
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
    private parse(
        url: string,
        markerConfig: MarkerConfig,
        callback: (storyInfo) => void,
        i: number,
        executeNext: () => void,
        elementID: number,
        initiated: number
    ) {
        if (i >= this.config.story_search_depth) {
            executeNext();
            return;
        }

        //console.log('Open: ',url);

        var self = this;

        var ajaxCallback = function (text: string) {
            if (!(url in self.storyCache) && !self.config.disable_cache) {
                if (self.DEBUG) {
                    console.log('Story ' + url + ' Not in Cache -> save');
                }

                self.storyCache[url] = text;

                try {
                    sessionStorage[self.config.storage_key] = JSON.stringify(
                        self.storyCache
                    );
                } catch (ex) {
                    self.log("Can't save Story Cache: ", ex);

                    try {
                        sessionStorage[self.config.storage_key] = '';
                    } catch (e) {
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

            if (
                (sentence = self.parseSite(
                    body,
                    markerConfig.keywords,
                    markerConfig.ignore
                )) != null
            ) {
                var storyInfo = self.getStoryInfo(url);
                var storyName = storyInfo.Name;

                callback({
                    name: storyName,
                    url: url,
                    chapter: i + 1,
                    sentence:
                        (self.DEBUG ? '[' + initiated + '] ' : '') + sentence,
                });
            }

            if (sentence == null || markerConfig.keep_searching) {
                //console.log('find next el');
                var next = body.find('button:contains(Next)').first();
                //console.log('next: ', next);

                if (next.length !== 0) {
                    var data = (url = self.getUrlFromButton(next));

                    //console.log('data:', data);

                    if (data != null) {
                        self.parse(
                            data,
                            markerConfig,
                            callback,
                            i + 1,
                            executeNext,
                            elementID,
                            initiated
                        );
                    } else {
                        executeNext();
                        return;
                    }
                }
                //console.log('Content not found in: ', url);
            } else {
                executeNext();
                return;
            }
        };

        if (url in this.storyCache) {
            if (this.DEBUG) {
                console.log('Story ' + url + ' in Cache -> use Cache');
            }

            ajaxCallback(this.storyCache[url]);
        } else {
            if (this.DEBUG) {
                console.log('Story ' + url + ' not in Cache -> request');
            }

            $.ajax({
                url: url,
                success: ajaxCallback,
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
    private parseSite(
        body: JQuery,
        keywords: string[],
        ignore: string[]
    ): string {
        var storyEl = body.find('.storytext');

        //console.log('search in ', storyEl);

        var self = this;

        if (storyEl.length === 1) {
            var storyText = storyEl.html().toLowerCase();

            var result = null;

            $.each(keywords, function (k, word) {
                if (result === null) {
                    try {
                        var wordReg = new RegExp(word, 'i');
                        if (wordReg.test(storyText)) {
                            var append = '([a-zA-Z0-9, :-_*]+)?';
                            var regEx =
                                '[^|.]?' + append + word + append + '[.|$]?';
                            self.log('Use RegExp for InStory Search: ', regEx);

                            var reg = new RegExp(regEx, 'i');
                            var data = reg.exec(storyText);

                            var sentence = '';
                            for (var i = 1; i < data.length; i++) {
                                if (typeof data[i] !== 'undefined') {
                                    sentence += data[i];
                                }
                            }

                            self.log('Found Sentence: ', sentence);

                            result = sentence;

                            return;
                        }
                    } catch (e) {
                        console.warn(e);
                    }
                }
            });

            if (result !== null) {
                $.each(ignore, function (k, word) {
                    if (result === null || word === '' || word === ' ') {
                        return;
                    }

                    try {
                        var wordReg = new RegExp(word, 'i');
                        if (wordReg.test(storyText)) {
                            self.log('Found Ignore Statemant: ', word);

                            result = null;
                            return;
                        }
                    } catch (e) {
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
    private elementCallback(
        self: StoryParser,
        config: MarkerConfig,
        element: JQuery,
        textEl: JQuery,
        headline: string,
        info: StoryInfo,
        page: number
    ) {
        this.eventHandler.callEvent('preElementCallback', this, [
            config,
            element,
            textEl,
            headline,
            info,
            page,
        ]);

        var isStory = $('.storytext').length > 0;
        var isStoryText = element.is('.storytext');

        var foundWhere = info.chapter;

        if (!(page in self.eList)) {
            self.eList[page] = {};
        }

        if (!(headline in self.eList[page])) {
            self.eList[page][headline] = [];
        }

        self.eList[page][headline].push(info);

        if (self.DEBUG) {
            this.info('Element Callback for ', headline, info);
            this.log('Found at page: ', page);
            this.log('IsStory: ' + isStory + ' - IsStoryText: ' + isStoryText);
        }

        if (!isStory) {
            if (
                typeof self.dataConfig['displayOnly'] !== 'undefined' &&
                self.dataConfig['displayOnly'] === headline
            ) {
                if (self.DEBUG) {
                    console.info('Display Only Mode: Match found for', element);
                }

                window.setTimeout(function () {
                    element.fadeIn();
                    self.updateListColor();
                }, 100);

                self.hidden[page] -= 1;
            } else if (typeof self.dataConfig['displayOnly'] !== 'undefined') {
                // Hide this Element because the Only Mode do not match

                if (self.DEBUG) {
                    console.log("Hide Element because of 'displayOnly' ", info);
                }

                self.hiddenElements[page][info.url] = 'displayOnly';

                element.fadeOut();
                self.hidden[page] += 1;

                self.updateListColor();
            }
        }

        if (!isStory && !config.display) {
            if (self.DEBUG) {
                console.log(
                    "Hide Element because of Filter '" + headline + "'",
                    info
                );
            }

            self.hiddenElements[page][info.url] = "Filter '" + headline + "'";

            element.hide();
            self.updateListColor();
            self.hidden[page] += 1;
        } else {
            var priority: ModififcationPriority;
            if (config.priority !== -1) {
                priority = {
                    background: config.priority,
                    color: config.priority,
                    highlight_color: config.priority,
                    mouseOver: config.priority,
                    text_color: config.priority,
                };
            } else {
                if (
                    typeof config.customPriority !== 'undefined' &&
                    config.customPriority !== null
                ) {
                    priority = config.customPriority;
                } else {
                    console.warn(
                        'Custom Priority set for Element. But Config is not defined!',
                        config
                    );

                    priority = {
                        background: 1,
                        color: 1,
                        highlight_color: 1,
                        mouseOver: 1,
                        text_color: 1,
                    };
                }
            }

            // Suggestion Level
            if (!isStory) {
                // Get the old SuggestionLevel:
                var suggestionLevel = 1;
                $.each(priority, (name, data) => {
                    if (data !== -1) {
                        suggestionLevel *= data;
                    }
                });

                // Add Bonus if the Chapter of the found entry is earlier:
                suggestionLevel +=
                    this.config.story_search_depth - info.chapter;

                if (element.is('[data-suggestionLevel]')) {
                    suggestionLevel =
                        Number(element.attr('data-suggestionLevel')) +
                        suggestionLevel;
                }

                element.attr('data-suggestionLevel', suggestionLevel);
            }

            if (
                !isStoryText &&
                config.background !== null &&
                config.background !== ''
            ) {
                this.updateAttributeWithPriority(
                    element,
                    'background',
                    priority.background,
                    function () {
                        element
                            .css(
                                'background-image',
                                'url(' + config.background + ')'
                            )
                            .css('background-repeat', 'no-repeat')
                            .css('background-position', 'right');
                    }
                );
            }

            if (
                !isStoryText &&
                typeof config.image !== 'undefined' &&
                config.image !== null &&
                config.image !== '' &&
                config.image !== ' '
            ) {
                self.log('Adds Filter-Image to Element: ', element, config);

                var img = $('<img></img>')
                    .attr('src', config.image)
                    .css('width', '20px')
                    .css('height', '20px')
                    .css('margin-left', '15px')
                    .addClass('parser-msg');

                if (!isStory) {
                    element.find('a').last().after(img);
                } else {
                    var appendTo = element.children().filter('a').last();
                    self.log('Add Image to Story ...', appendTo, img);

                    appendTo.after(img);
                }
            }

            if (config.mark_chapter) {
                var markerAppend = $(
                    '<span class="parser-msg"> <b>[' +
                        headline +
                        '-' +
                        foundWhere +
                        ']</b></span>'
                ).attr('title', info.sentence);

                if (!isStory) {
                    element.find('a').first().after(markerAppend);
                } else if (!isStoryText) {
                    element.children().filter('a').last().after(markerAppend);
                } else {
                    element.prepend(markerAppend);
                }
            }

            if (
                !isStoryText &&
                !config.ignoreColor &&
                config.text_color != null
            ) {
                this.updateAttributeWithPriority(
                    textEl,
                    'color',
                    priority.text_color,
                    config.text_color
                );
            }

            var linkCheckReg = new RegExp('<a [^>]*"[^">]+$', 'i');

            var color: string = config.color;
            var colorMo: string = config.mouseOver;

            $.each(config.keywords, function (key, keyword) {
                var el = !isStory
                    ? element.find('div').first()
                    : element.children().filter('div').last();
                if (el.length === 0) {
                    return;
                }
                var reg = new RegExp(keyword, 'i');
                var text = el.html();

                var erg = reg.exec(text);
                var front = '';
                var replace = '';
                var behind = '';

                if (erg != null) {
                    if (erg.length === 1) {
                        replace = keyword;
                    } else if (erg.length === 2) {
                        front = erg[1];
                    } else if (erg.length === 3) {
                        front = erg[1];
                        replace = erg[2];
                    } else {
                        front = erg[1];
                        replace = erg[2];
                        behind = erg[3];
                    }

                    if (linkCheckReg.test(front)) {
                        // We are within a Link .. continue
                        return;
                    }

                    replace =
                        front +
                        '<span class="ffnet-story-highlighter" style="color:black; font-weight:bold">' +
                        replace +
                        '</span>' +
                        behind;

                    text = text.replace(new RegExp(keyword, 'i'), replace);
                }

                el.html(text);
            });

            if (!isStoryText && !config.ignoreColor) {
                if (self.DEBUG) {
                    console.log(
                        '[ElementCallback] Change Color of Line: ',
                        element
                    );
                }

                self.updateColor(
                    element,
                    color,
                    priority.color,
                    colorMo,
                    priority.mouseOver
                );
            }

            // Sorting
            if (
                !this.config.disable_resort_after_filter_match &&
                !isStory &&
                typeof this.config.sortFunction !== 'undefined' &&
                this.config.sortFunction !== 'default'
            ) {
                if (
                    typeof this.sortMap[this.config.sortFunction] !==
                    'undefined'
                ) {
                    var sortfunction = this.sortMap[this.config.sortFunction];
                    this.sortStories(sortfunction.Function, element.parent());
                } else {
                    console.warn(
                        'Unknown SortFunction: ',
                        this.config.sortFunction
                    );
                    this.config.sortFunction = 'default';
                    this.save_config(false);
                }
            }
        }

        self.updateList(page);

        this.eventHandler.callEvent('postElementCallback', this, [
            config,
            element,
            textEl,
            headline,
            info,
            page,
        ]);
    }

    private highlighterCallback(
        self: StoryParser,
        config: HighlighterConfig,
        element: JQuery,
        link: string,
        page: number
    ) {
        if (self.DEBUG) {
            console.info('Highlight Element Found: ', element);
        }

        this.eventHandler.callEvent('preHighlighterCallback', this, [
            config,
            element,
            link,
            page,
        ]);

        // Collect Data:
        var mod: ModificationBase;

        if (
            typeof config.prefab !== 'undefined' &&
            config.prefab !== null &&
            config.prefab !== '' &&
            config.prefab !== ' '
        ) {
            if (
                typeof self.config.highlighterPrefabs[config.prefab] !==
                'undefined'
            ) {
                mod = self.config.highlighterPrefabs[config.prefab];
            } else {
                console.warn(
                    "Found Highlighter for Story '%s' but the refferenced Prefab '%s' was not found!",
                    link,
                    config.prefab
                );
                return;
            }
        } else if (
            typeof config.custom !== 'undefined' &&
            config.custom !== null
        ) {
            mod = config.custom;
            mod.name = 'Custom Highlighter';
        } else {
            // This shouldn't be neccessary, because of the Upgrade Handler
            // But if that fails, we have a extra safety rope :3

            mod = {
                name: 'Legacy-Custom',
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
                highlight_color: null,
            };
        }

        if (!mod.display) {
            if (self.DEBUG) {
                console.log('Hide Entry because of Story Config: ', link, mod);
            }
            self.hiddenElements[link] = 'storyConfig';

            element.attr('data-hiddenBy', 'storyConfig');

            element.hide();
            self.hidden[page]++;
        } else {
            var priority: ModififcationPriority;
            if (mod.priority !== -1) {
                priority = {
                    background: mod.priority,
                    color: mod.priority,
                    highlight_color: mod.priority,
                    mouseOver: mod.priority,
                    text_color: mod.priority,
                };
            } else {
                if (
                    typeof mod.customPriority !== 'undefined' &&
                    mod.customPriority !== null
                ) {
                    priority = mod.customPriority;
                } else {
                    console.warn(
                        'Custom Priority set for Element. But Config is not defined!',
                        config
                    );

                    priority = {
                        background: 1,
                        color: 1,
                        highlight_color: 1,
                        mouseOver: 1,
                        text_color: 1,
                    };
                }
            }

            // Suggestion Level

            // Get the old SuggestionLevel:
            var suggestionLevel = 1;
            $.each(priority, (name, data) => {
                if (data !== -1) {
                    suggestionLevel *= data;
                }
            });

            if (element.is('[data-suggestionLevel]')) {
                suggestionLevel =
                    Number(element.attr('data-suggestionLevel')) +
                    suggestionLevel;
            }

            element.attr('data-suggestionLevel', suggestionLevel);

            if (
                typeof mod.image !== 'undefined' &&
                mod.image !== null &&
                mod.image !== '' &&
                mod.image !== ' '
            ) {
                var img = $('<img></img>')
                    .attr('src', mod.image)
                    .css('width', '20px')
                    .css('height', '20px')
                    .css('margin-left', '15px')
                    .addClass('parser-msg');

                element.find('a').last().after(img);
            }

            if (mod.background !== null && mod.background !== '') {
                this.updateAttributeWithPriority(
                    element,
                    'background',
                    priority.background,
                    function () {
                        element
                            .css(
                                'background-image',
                                'url(' + mod.background + ')'
                            )
                            .css('background-repeat', 'no-repeat')
                            .css('background-position', 'right');
                    }
                );
            }

            if (mod.mark_chapter) {
                element
                    .find('a')
                    .first()
                    .after(
                        $(
                            '<span class="parser-msg"> <b>{' +
                                mod.name +
                                '}</b></span>'
                        ).attr('title', mod.note)
                    );
            }

            if (!mod.ignoreColor && mod.text_color !== null) {
                var textEl = element.find('.z-padtop2');
                this.updateAttributeWithPriority(
                    textEl,
                    'color',
                    priority.text_color,
                    mod.text_color
                );
            }

            var color: string = mod.color;
            var colorMo: string = mod.mouseOver;

            if (!mod.ignoreColor) {
                if (self.DEBUG) {
                    console.log(
                        '[HighlighterCallback] Change Color of Line: ',
                        element
                    );
                }

                self.updateColor(
                    element,
                    color,
                    priority.color,
                    colorMo,
                    priority.mouseOver
                );
            }

            // Sorting
            if (
                typeof this.config.sortFunction !== 'undefined' &&
                this.config.sortFunction !== 'default'
            ) {
                if (
                    typeof this.sortMap[this.config.sortFunction] !==
                    'undefined'
                ) {
                    var sortfunction = this.sortMap[this.config.sortFunction];
                    this.sortStories(sortfunction.Function);
                } else {
                    console.warn(
                        'Unknown SortFunction: ',
                        this.config.sortFunction
                    );
                    this.config.sortFunction = 'default';
                    this.save_config(false);
                }
            }

            self.updateList(page);
        }

        this.eventHandler.callEvent('postHighlighterCallback', this, [
            config,
            element,
            link,
            page,
        ]);
    }

    /**
     *   Updates the List of found elements
     */
    private updateList(page: number) {
        var wrapper = this.wrapperList[page];

        this.eventHandler.callEvent('preUpdateList', this, [page, wrapper]);

        if (typeof wrapper === 'undefined') {
            this.log(
                'UpdateList - Page Wrapper for Page ' +
                    page +
                    ' is undefined! Abort. ',
                this.wrapperList
            );
            return;
        }

        this.log('Update List for Page: ', page);

        var text = '';

        if (this.DEBUG) {
            console.log('Headline-List = ', this.eList[page]);
        }

        var headlineContainer = $('<div></div>');

        var self = this;

        $.each(this.eList[page], function (headline, elements) {
            if (self.config.marker[headline].print_story) {
                const headlineEl = $(`<u>${headline} (${elements.length}):</u>`);
                headlineEl.addClass('clickable');
                headlineContainer.append(headlineEl);

                var eUl = $('<ul></ul>');

                $.each(elements, function (i, value) {
                    eUl.append(
                        $('<li></li>')
                            .append(
                                $('<span></span>')
                                    .append(
                                        $('<a></a>')
                                            .attr('href', value.url)
                                            .html(value.name)
                                    )
                                    .append(' - ' + value.chapter)
                                    .attr('title', value.sentence)
                            )
                            .append(
                                $(' <a>#</a>').attr('href', '#' + value.name)
                            )
                    );
                });

                headlineContainer.append(eUl);
                headlineEl.click(() => {
                    if (eUl.is(':visible')) {
                        eUl.hide();
                    } else {
                        eUl.show();
                    }
                });

                if (!!self.config.print_story_hidden) {
                    eUl.hide();
                }
            }

            if (self.config.marker[headline].mention_in_headline) {
                text +=
                    '<b>' +
                    headline +
                    ':</b> ' +
                    self.eList[page][headline].length +
                    ' ';
            }
        });

        wrapper.find('#mrhOutput').remove();

        var hiddenByStoryConfig = wrapper.find(
            'div[data-hiddenBy="storyConfig"]'
        );

        if (hiddenByStoryConfig.length > 0) {
            text +=
                '<i>Hidden by StoryConfig</i>: ' +
                hiddenByStoryConfig.length +
                ' ';
        }

        var list = $("<div id='mrhOutput'></div>")
            .html(
                '<div><b>' +
                    self._('Page') +
                    ': ' +
                    page +
                    '</b></div>' +
                    text +
                    ' <i>' +
                    self._('All hidden elements:') +
                    '</i> '
            )
            .append(
                $('<u></u>')
                    .text(self.hidden[page])
                    .click(function (e) {
                        var table = $('<table></table>');
                        var modal = GUIHandler.createBootstrapModal(
                            table,
                            self._('Hidden Elements')
                        );

                        $.each(
                            self.hiddenElements[page],
                            function (key, value) {
                                table.append(
                                    $('<tr></tr>')
                                        .append(
                                            $('<th></th>').append(
                                                $('<a></a>')
                                                    .text(
                                                        self.getStoryInfo(key)
                                                            .Name
                                                    )
                                                    .attr('href', key)
                                            )
                                        )
                                        .append(
                                            $(
                                                '<td style="padding-left: 15px"></td>'
                                            ).text(value)
                                        )
                                );
                            }
                        );

                        GUIHandler.showModal(modal);

                        e.preventDefault();
                    })
                    .attr('title', self._('Show the reasons for hiding'))
                    .addClass('clickable')
            )
            .css('margin-bottom', '10px')
            .append(headlineContainer);

        if (hiddenByStoryConfig.length > 0) {
            list.append(
                $(
                    '<a href="#">' +
                        self._('Show Elements hidden by Story Config') +
                        '</a>'
                ).click(function (e) {
                    hiddenByStoryConfig
                        .css('border', '2px solid black')
                        .slideDown();

                    self.updateListColor();
                    e.preventDefault();
                })
            );
        }

        wrapper.prepend(list);

        this.eventHandler.callEvent('postUpdateList', this, [page, wrapper]);
    }

    /**
     *   Updates the colors of the elements in the story list
     */
    private updateListColor() {
        var odd = false;
        var self = this;

        $('.z-list')
            .filter(':visible')
            .each(function (k, e) {
                var el = $(e);
                var link = el.find('a').first().attr('href');
                var storyInfo = self.getStoryInfo(link);
                var storyName = storyInfo.Name;
                var color = self.config.color_normal;
                var colorMo = self.config.color_mouse_over;

                if (odd) {
                    color = self.config.color_odd_color;
                    odd = false;
                } else {
                    odd = true;
                }

                if (!self.config.disable_default_coloring) {
                    self.updateColor(el, color, -1, colorMo, -1);
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
    private updateColor(
        element: JQuery,
        color: string,
        colorPriority: number,
        colorMo: string,
        colorMoPriority: number
    ) {
        //console.log("Update Color called! " + color + ", " + colorMo + ", " + notSetAttr);

        this.updateAttributeWithPriority(
            element,
            'color',
            colorPriority,
            function () {
                element.css('background-color', color);
                element.attr('data-color', color);
            }
        );

        this.updateAttributeWithPriority(
            element,
            'mouseovercolor',
            colorMoPriority,
            function () {
                element.unbind('mouseenter').unbind('mouseleave');

                element
                    .mouseenter(function () {
                        $(this).css('background-color', colorMo);
                    })
                    .mouseleave(function () {
                        $(this).css('background-color', color);
                    });

                element.attr('data-mouseOverColor', colorMo);
            }
        );
    }

    /**
     * Updates a property if the Priority if higher or equals to the current Priority
     * @param element The Target Element for the Manipulation
     * @param attribute The name of the Attrbute. If value is not a function, this is the name of the CSS Property
     * @param newPriority The Priority of the new Value
     * @param value The new value OR a callback Function with the result
     */
    private updateAttributeWithPriority(
        element: JQuery,
        attribute: string,
        newPriority: number,
        value: any
    ) {
        var regEx = new RegExp('[ -_.]', 'g');
        var attributeName = 'data-priority-' + attribute.replace(regEx, '');

        var current = element.attr(attributeName);
        var currentPriority: number = -100000;

        // 0 means disabled!
        if (newPriority === 0) {
            return;
        }

        if (typeof current !== 'undefined') {
            currentPriority = Number(current);
        }

        if (currentPriority === NaN || isNaN(currentPriority)) {
            currentPriority = -100000;
        }

        if (newPriority >= currentPriority) {
            if (typeof value === 'function') {
                value(element);
            } else {
                element.css(attribute, value);
            }

            element.attr(attributeName, newPriority);
        }
    }

    /**
     *  Reads the content of the Story itself
     **/
    public readStory() {
        if (this.config.disable_inStory_parsing) {
            return;
        }

        var storyElements = $('.storytext');
        if (storyElements.length < 1) {
            // We are not in a Story ...
            return;
        }

        this.eventHandler.callEvent('preReadStory', this, storyElements);

        var self = this;

        var handleElement = function (element: JQuery) {
            // Remove old Elements
            element.find('.parser-msg').remove();

            element.attr('data-parsed', 'true');

            var text = element.html();

            $.each(
                self.config.marker,
                function (headline: string, config: MarkerConfig) {
                    var ignore = false;
                    $.each(config.ignore, function (i: number, marker: string) {
                        try {
                            var reg = new RegExp(marker, 'i');

                            if (marker !== '' && reg.test(text)) {
                                self.log(
                                    'Ignore Story because of Ignore Filter: ',
                                    marker,
                                    config
                                );

                                // Ignore this Element
                                ignore = true;
                                return;
                            }
                        } catch (e) {
                            console.warn(e);
                        }
                    });

                    if (ignore) {
                        return;
                    }

                    var found = false;

                    $.each(
                        config.keywords,
                        function (i: number, marker: string) {
                            var reg = new RegExp(marker, 'i');

                            if (!found) {
                                if (reg.test(text)) {
                                    found = true;
                                }
                            }
                        }
                    );

                    if (found) {
                        var reg = new RegExp(
                            '.+/s/([0-9]+)/(?:([0-9]+)/?)?(?:([^#]+)/?)?'
                        );

                        var result = reg.exec(location.href);

                        var chapter = Number(element.attr('data-page'));
                        if (isNaN(chapter)) {
                            chapter = 0;
                        }

                        var info: StoryInfo = {
                            url: self.getLinkToPageNumber(chapter),
                            chapter: chapter,
                            name:
                                result !== null && result.length > 3
                                    ? result[3]
                                    : 'Unknown',
                            element: element,
                            id:
                                result !== null && result.length > 1
                                    ? result[1]
                                    : 'Unknown',
                            sentence: null,
                        };

                        window.setTimeout(function () {
                            self.elementCallback(
                                self,
                                config,
                                element,
                                element.children().filter('span').last(),
                                headline,
                                info,
                                chapter
                            );
                        }, 500);
                    }
                }
            );
        };

        handleElement($('#profile_top'));

        $.each(
            storyElements.not('[data-parsed]'),
            function (index, element: JQuery) {
                element = $(element);

                handleElement(element);
            }
        );

        this.eventHandler.callEvent('postReadStory', this, storyElements);
    }

    /**
     *   Enables the In Story Highlighter (Story View)
     */
    public enableInStoryHighlighter() {
        if (this.LOAD_INTERNAL) {
            return;
        }

        if (this.DEBUG) {
            console.log('Enable In Story Highlighter');
        }

        var body = $('body');
        var field = body.find('#profile_top').first().find('b').first();

        if (field.length === 0) {
            return;
        }

        body.find('.parser-msg').remove();

        var contextMenu = $('<div></div>')
            .css('width', '20px')
            .css('height', '20px')
            .css('float', 'right')
            .addClass('parser-msg')
            .addClass('context-menu')
            .append(
                $('<img></img>')
                    .attr('src', this.getUrl('edit.gif'))
                    .css('width', '100%')
                    .css('height', '100%')
            );

        var info = this.getStoryInfo(document.location.href);
        body.find('#profile_top').attr('data-elementident', info.ID);

        var self = this;

        // Open GUI
        contextMenu.click(function () {
            self.GUI.showStoryPrefabList({
                url: document.location.pathname,
                element: body.find('#profile_top'),
                name: field.text(),
                id: info.ID,
            });
        });

        field.after(contextMenu);

        var highlighterKey = self.config.highlighter_use_storyID
            ? info.ID
            : document.location.pathname;
        // Highlighter found:
        if (typeof this.config['highlighter'][highlighterKey] !== 'undefined') {
            if (this.DEBUG) {
                console.info('Highlight Element Found');
            }

            var config = this.config['highlighter'][highlighterKey];

            // Collect Data:
            var mod: ModificationBase;

            if (
                typeof config.prefab !== 'undefined' &&
                config.prefab !== null &&
                config.prefab !== '' &&
                config.prefab !== ' '
            ) {
                if (
                    typeof self.config.highlighterPrefabs[config.prefab] !==
                    'undefined'
                ) {
                    mod = self.config.highlighterPrefabs[config.prefab];
                } else {
                    console.warn(
                        "Found Highlighter for Story '%s' but the refferenced Prefab '%s' was not found!",
                        document.location.pathname,
                        config.prefab
                    );
                    return;
                }
            } else if (
                typeof config.custom !== 'undefined' &&
                config.custom !== null
            ) {
                mod = config.custom;
                mod.name = 'Custom Highlighter';
            } else {
                // This shouldn't be neccessary, because of the Upgrade Handler
                // But if that fails, we have a extra safety rope :3

                mod = {
                    name: 'Legacy-Custom',
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
                    highlight_color: null,
                };
            }

            var priority: ModififcationPriority;
            if (mod.priority !== -1) {
                priority = {
                    background: mod.priority,
                    color: mod.priority,
                    highlight_color: mod.priority,
                    mouseOver: mod.priority,
                    text_color: mod.priority,
                };
            } else {
                if (
                    typeof mod.customPriority !== 'undefined' &&
                    mod.customPriority !== null
                ) {
                    priority = mod.customPriority;
                } else {
                    console.warn(
                        'Custom Priority set for Element. But Config is not defined!',
                        config
                    );

                    priority = {
                        background: 1,
                        color: 1,
                        highlight_color: 1,
                        mouseOver: 1,
                        text_color: 1,
                    };
                }
            }

            if (
                typeof mod.image !== 'undefined' &&
                mod.image !== null &&
                mod.image !== '' &&
                mod.image !== ' '
            ) {
                var img = $('<img></img>')
                    .attr('src', mod.image)
                    .css('width', '20px')
                    .css('height', '20px')
                    .css('margin-left', '15px')
                    .addClass('highlight-msg')
                    .addClass('parser-msg');

                field.after(img);
            }

            if (mod.background !== null && mod.background !== '') {
                this.updateAttributeWithPriority(
                    body.find('#profile_top'),
                    'background',
                    priority.background,
                    function () {
                        body.find('#profile_top')
                            .css(
                                'background-image',
                                'url(' + mod.background + ')'
                            )
                            .css('background-repeat', 'no-repeat')
                            .css('background-position', 'right');
                    }
                );
            }

            if (mod.mark_chapter) {
                body.find('#profile_top')
                    .find('.icon-mail-1')
                    .first()
                    .after(
                        $(
                            '<span class="parser-msg"> <b>{' +
                                mod.name +
                                '}</b></span>'
                        ).attr('title', mod.note)
                    );
            }

            if (!mod.ignoreColor && mod.text_color !== null) {
                var textEl = body
                    .find('#profile_top')
                    .children()
                    .filter('span')
                    .last();
                this.updateAttributeWithPriority(
                    textEl,
                    'color',
                    priority.text_color,
                    mod.text_color
                );
            }

            var color: string = mod.color;
            var colorMo: string = mod.mouseOver;

            if (!mod.ignoreColor) {
                if (self.DEBUG) {
                    console.log(
                        '[HighlighterCallback] Change Color of Line: ',
                        body.find('#profile_top')
                    );
                }

                self.updateColor(
                    body.find('#profile_top'),
                    color,
                    priority.color,
                    colorMo,
                    priority.mouseOver
                );
            }
        }
    }

    /**
     *   Go to a specific Paragraph on the page
     *   @param id Paragraph Number
     */
    private goToParagraphID(id) {
        $($('p')[id]).before('<a name="goto" id="gotoMarker"></a>');
        location.href = '#goto';
        $('#gotoMarker').remove();
    }

    /**
     * Enable the Reading Aid Function
     * @param container The Container to enable the Reading Aid for
     */
    public enableReadingAid(container: JQuery = null) {
        if (container === null) {
            container = $('body');
        }

        if (this.LOAD_INTERNAL) {
            return;
        }

        var reg = new RegExp('.+/s/[0-9]+/.+');
        if (!reg.test(location.href)) {
            return;
        }

        if (this.config.readingHelp_enabled === true) {
            var data = '';

            if (
                this.config.readingHelp_backgroundColor !== null &&
                this.config.readingHelp_backgroundColor !== ''
            ) {
                data =
                    'background-color: ' +
                    this.config.readingHelp_backgroundColor +
                    ';';
            }
            if (
                this.config.readingHelp_color !== null &&
                this.config.readingHelp_color !== ''
            ) {
                data += ' color: ' + this.config.readingHelp_color + ';';
            }

            if ($('.readingAidStyle').length === 0) {
                // Build Style Object
                var style = $(
                    '<style class="readingAidStyle" type="text/css"></style>'
                )
                    .html('.readingAidMarker { ' + data + ' }')
                    .appendTo($('head'));
            }

            container
                .find('p')
                .mouseenter(function () {
                    $(this).addClass('readingAidMarker');
                })
                .mouseleave(function () {
                    $(this).removeClass('readingAidMarker');
                });
        }

        if (!this.config.disable_parahraphMenu) {
            if (this.paragramMenu === null) {
                // Load the Paragraph Menu
                this.paragramMenu = new ParagraphMenu(this);
            } else {
                this.paragramMenu.addHandler(container);
            }
        }
    }

    /**
     * Adds the Chapter/Review Ration Information
     * @param element z-list Instance
     */
    private manageChapterReviewRatio(element: JQuery): void {
        element.attr('data-chapterReviewRatio', 0);

        if (this.config.enable_chapter_review_ratio) {
            var reg = new RegExp('.+Chapters: ?([0-9]+).*Reviews: ?([0-9]+).*');

            var parent = element.find('.z-padtop2').first();
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
                    .text(' - Chapter/Review Ratio: 1/' + fixed)
                    .appendTo(parent);

                element.attr('data-chapterReviewRatio', fixed);
            }
        }
    }

    /**
     *  Manages the Read Chapter Info Feature
     *  Unfinished Test Function
     */
    private manageReadChaptersInfo(overwrite: boolean = false) {
        if (!overwrite && this.config.enable_read_chapter_info === false) {
            return;
        }

        var isStory = $('.z-list').length === 0;

        var elements = undefined;
        var ids: string[] = [];

        if (!isStory) {
            elements = $('.z-list[data-storyid]');

            var idELMap: { [index: string]: JQuery } = {};

            elements.each(function (i, el) {
                var element = $(el);
                var id = element.attr('data-StoryId');

                ids.push(id);
                idELMap[id] = element;
            });
        } else {
            var info = this.getStoryInfo(document.location.href);

            if (info.ID !== null) {
                ids.push(info.ID);
            } else {
                return;
            }
        }

        var self = this;

        this.api_getReadChapters(ids, function (result, lastChapters) {
            $.each(result, function (id: string, chapters: number[]) {
                if (!isStory) {
                    if (typeof idELMap[id] !== 'undefined') {
                        var element = idELMap[id];
                        var textContainer = element.find('.z-padtop2').last();

                        element.find('.ffnetReadChapterInfo').remove();

                        var insert = $(
                            '<span class="ffnetReadChapterInfo"></span>'
                        )
                            .html('<b>' + chapters.length + '</b>/')
                            .attr(
                                'title',
                                'Chapters: ' +
                                    chapters.join(', ') +
                                    ' - Last Chapter opened: ' +
                                    lastChapters[id]
                            );

                        var text = textContainer.html();

                        textContainer.html(
                            text.replace(
                                'Chapters: ',
                                'Chapters: ' + insert[0].outerHTML
                            )
                        );

                        self.log('Chapter Read for Story: ' + id, chapters);
                    }
                } else {
                    var chapterSelects = $('select[id="chap_select"]');
                    chapterSelects.children().each(function (i, el) {
                        var element = $(el);

                        if (
                            chapters.indexOf(Number(element.attr('value'))) !==
                            -1
                        ) {
                            element.text(
                                self.config.reading_info_ChapterMarker.replace(
                                    '{Name}',
                                    element.text()
                                )
                            );
                        }
                    });

                    var infoContainer = $('#profile_top').find('.xgray');

                    infoContainer.html(
                        infoContainer
                            .html()
                            .replace(
                                '- Words',
                                '- Last Read Chapter: ' +
                                    lastChapters[id] +
                                    ' - Words'
                            )
                    );
                }
            });
        });
    }

    /**
     *   Enables the Pocket Save Feature (Story View)
     */
    public enablePocketSave() {
        var self = this;

        if (this.LOAD_INTERNAL) {
            return;
        }

        var user = this.config['pocket_user'];
        var password = this.config['pocket_password'];

        var body = $('body');

        if (user == null || password == null) {
            console.log('Disables Pocket Save Function');
            return;
        }

        var field = body.find('#profile_top').find('b');

        var options = {
            all: this._('From this chapter to the End'),
            '1': this._('One Chapter'),
            '2': this._('Two Chapters'),
            '5': this._('Five Chapters'),
            '10': this._('Ten Chapters'),
        };

        var select = $('<select></select>')
            .css('margin-left', '20px')
            .change(function () {
                $('#ffnet-pocket-save-button')
                    .removeAttr('disabled')
                    .html(self._('Save To Pocket'));
            });

        $.each(options, function (key, value) {
            select.append(
                $('<option></option>').text(value).attr('value', key)
            );
        });

        field.after(
            $('<button class="btn">' + this._('Save To Pocket') + '</button>')
                .click(function () {
                    var option = select
                        .children()
                        .filter(':selected')
                        .first()
                        .attr('value');

                    self.log('Selected Option: ', option);

                    self.parsePocket(
                        document.location.pathname,
                        field.text() + ': ',
                        option
                    );
                })
                .css('margin-left', '10px')
                .attr('id', 'ffnet-pocket-save-button')
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
    private parsePocket(
        url: string,
        prefix: string,
        length: any,
        currentDepth: number = 1
    ) {
        if (typeof prefix === 'undefined') {
            prefix = '';
        }

        if (typeof length === 'undefined' || length === 'all') {
            length = 100;
        }

        var user = this.config['pocket_user'];
        var password = this.config['pocket_password'];

        if (user == null || password == null) {
            return;
        }

        $('#ffnet-pocket-save-button')
            .attr('disabled', 'disabled')
            .html('Working ...');

        var self = this;

        var ajaxCallback = function (text) {
            var body = $(text);

            //var title = prefix + $(body.find('#chap_select')).first().children().filter('[selected="selected"]').html();

            var title = body.find('title').first().text();

            var domainRegex = new RegExp('https?://[^/]+');
            var domain = domainRegex.exec(location.href)[0];

            $('body').append(
                $('<img>').attr(
                    'src',
                    'https://readitlaterlist.com/v2/add?username=' +
                        user +
                        '&password=' +
                        password +
                        '&apikey=emIpiQ7cA6fR4u6dr7ga2aXC11dcD58a&url=' +
                        domain +
                        url +
                        '&title=' +
                        title
                )
            );

            console.log(url + ' - ' + title + ' - Done');

            var next = body.find('button:contains(Next)').first();

            if (next.length !== 0 && currentDepth + 1 <= length) {
                var data = (url = self.getUrlFromButton(next));

                if (data != null) {
                    setTimeout(function () {
                        self.parsePocket(
                            data,
                            prefix,
                            length,
                            currentDepth + 1
                        );
                    }, 500);
                }
            } else {
                $('#ffnet-pocket-save-button')
                    .attr('disabled', 'disabled')
                    .html('Save done!');
            }
        };

        $.ajax({
            url: url,
            success: ajaxCallback,
        });
    }

    // ------- Endless Mode ------

    private endlessRequestPending = false;

    private endlessRequestsDone = 0;

    /**
     * Enabled the EndlessMode
     */
    public enableEndlessMode() {
        var self = this;

        if (!this.config.endless_enable) {
            return;
        }

        var isStory = $('.z-list').length === 0;

        var offset = 500;

        if (typeof window['scrollY'] === 'undefined') {
            console.warn(
                '[FFNetParser] EndlessMode disabled. Reason: No Support for Scroll-Events'
            );
            return;
        }

        window.onscroll = function (ev) {
            if (
                window.innerHeight + <number>window['scrollY'] >=
                $(document).height() - offset
            ) {
                var lastPageContainer: JQuery = null;
                if (isStory) {
                    lastPageContainer = $('.storytext').last();
                } else {
                    lastPageContainer = $('.ffNetPageWrapper').last();
                }

                if (
                    lastPageContainer === null ||
                    lastPageContainer.length === 0
                ) {
                    console.log("Error: Can't find Page Container!");
                    return;
                }

                var lastPage = Number(lastPageContainer.attr('data-page'));
                if (isNaN(lastPage)) {
                    console.log('Error parsing Page Number!');
                    return;
                }

                self.appendPageContent(lastPage + 1);
            }
        };
    }

    /**
     * Loads the Content of a Page  and returns the Data as JQuery Object
     * @param url The Request URI
     * @param callback The callback Function
     */
    public getPageContent(url: string, callback: (page: JQuery) => void) {
        if (this.DEBUG) {
            console.log('Requesting page: ', url);
        }

        var self = this;

        $.get(url, function (content) {
            var data = $(content);

            callback(data);
        });
    }

    public getCurrentPage(): number {
        var pageNumber = $('center > b').first();

        if (pageNumber.length !== 0) {
            return Number(pageNumber.text());
        } else {
            // We are in a Story ....
            pageNumber = $('#chap_select').children().filter('[selected]');

            var page = Number(pageNumber.attr('value'));

            return isNaN(page) ? 1 : page;
        }
    }

    private createWrapper(page: number): JQuery {
        var wrapper = $('<div></div>')
            .addClass('ffNetPageWrapper')
            .attr('data-page', page);

        this.wrapperList[page] = wrapper;

        return wrapper;
    }

    private createPageWrapper(
        elements: JQuery = null,
        currentPage: number = null
    ): JQuery {
        // Wrap the current Page into a PageWrapper

        if (typeof currentPage === 'undefined' || currentPage === null) {
            currentPage = this.getCurrentPage();
        }

        var ignoreUserPage = false;

        if (this.DEBUG) {
            console.log('Current Page: ', currentPage);
        }

        if (elements === null || typeof elements === 'undefined') {
            elements = $('.z-list');
        } else {
            this.log('Explicit Data specified for Page Wrapper');
            ignoreUserPage = true;
        }

        if (elements.length !== 0) {
            var wrapper = $('.ffNetPageWrapper');
            if (wrapper.length === 0) {
                wrapper = this.createWrapper(currentPage);
            }

            var notWrapped = elements.filter('[data-wrapped!="wrapped"]');

            if (!ignoreUserPage && this.inUsersPage) {
                notWrapped = notWrapped.filter('.mystories');

                // Create wrapper for Favs:
                this.log('Create Page Wrapper for Favs');

                var favWrapper = this.createPageWrapper(
                    elements.filter('.favstories'),
                    2
                );

                this.read(favWrapper);
            }

            if (notWrapped.length !== 0) {
                if (this.DEBUG) {
                    console.log('Not Wrapped Elements found:', notWrapped);
                }

                notWrapped.last().after(wrapper);

                notWrapped
                    .detach()
                    .appendTo(wrapper)
                    .attr('data-wrapped', 'wrapped');
            }

            return wrapper;
        } else {
            // Story
            $('#storytext').attr('data-page', currentPage);

            return null;
        }
    }

    public getLinkToPageNumber(page: number): string {
        var domainRegex = new RegExp('https?://[^/]+');
        var domainData = domainRegex.exec(location.href);
        if (domainData === null || domainData.length === 0) {
            console.warn(
                "Can't get the current Location. Reason: Domain unknown. Possible Explaination: Loaded locally"
            );
            return document.location.href;
        }

        var domain = domainData[0];

        // Regex used to get the Pagenumber
        var regex = new RegExp('([?|&]p)=[0-9]+');
        var container = $('center').first().find('a').first();

        if (container.length > 0) {
            var href = container.attr('href');

            return domain + href.replace(regex, '$1=' + page);
        } else if ($('button:contains(Next)').length > 0) {
            var next = $('button:contains(Next)').first();

            var url = this.getUrlFromButton(next);

            regex = new RegExp('s/([0-9]+)/[0-9]+/');

            return domain + url.replace(regex, 's/$1/' + page + '/');
        } else {
            // Try to parse the current Location:
            regex = new RegExp('s/([0-9]+)/([0-9]+)/');
            var result = regex.exec(document.location.href);

            if (result.length === 3) {
                return document.location.href.replace(
                    regex,
                    's/$1/' + page + '/'
                );
            } else {
                console.warn(
                    "Can't get Link to Chapter! If this happens often, please report!"
                );
                return document.location.href;
            }
        }
    }

    private loadElementsFromPage(
        page: number,
        callback: (data: JQuery) => void
    ) {
        var self = this;

        var url = this.getLinkToPageNumber(page);

        this.getPageContent(url, function (res) {
            var elements = res.find('.z-list');
            var wrapper = self.createWrapper(page);

            wrapper.append(elements);

            callback(wrapper);
        });
    }

    private loadChapterFromPage(
        page: number,
        callback: (page: JQuery) => void
    ) {
        var self = this;
        var url = this.getLinkToPageNumber(page);

        this.getPageContent(url, function (res) {
            var story = res.find('.storytext').first();

            story.removeAttr('id').attr('data-page', page);

            callback(story);
        });
    }

    public appendPageContent(page: number) {
        var self = this;

        if (this.endlessRequestPending) {
            return;
        }

        this.endlessRequestPending = true;

        var isStroy = $('.z-list').length === 0;

        this.log(
            'Appending Page Content. Page: ' + page + ' - IsStory: ',
            isStroy
        );

        var loadingElement = $(
            '<div><center><b>Loading ...</b></center></div>'
        );

        this.endlessRequestsDone++;
        var overLimit =
            this.endlessRequestsDone > this.config.endless_forceClickAfter;

        if (!overLimit) {
            if (isStroy) {
                var lastPage = $('.storytext').last();

                this.log('LastPage: ', lastPage);

                lastPage.after(loadingElement);

                this.log('Loading Element added ....');

                this.loadChapterFromPage(page, function (chapter) {
                    self.log('Server Answer Received', chapter);

                    loadingElement.remove();

                    // Add Page Name:
                    chapter.prepend(
                        '<hr /><center><b>Page: ' + page + '</b></center><hr />'
                    );

                    chapter.hide();

                    lastPage.after(chapter);

                    if (self.config.allow_copy) {
                        self.log('Allow Selection of Text');
                        $('.nocopy')
                            .removeClass('nocopy')
                            .parent()
                            .attr('style', 'padding: 0px 0.5em;');
                    }

                    self.enableReadingAid(chapter);

                    // Copy Classes and styles from main Container:
                    chapter
                        .attr('class', $('#storytext').attr('class'))
                        .attr('style', $('#storytext').attr('style'));

                    chapter.slideDown();

                    self.readStory();

                    window.setTimeout(function () {
                        self.endlessRequestPending = false;
                    }, 1000);
                });
            } else {
                var lastWrapper = $('.ffNetPageWrapper').last();

                this.log('LastWrapper: ', lastWrapper);

                lastWrapper.after(loadingElement);

                this.log('Loading Element added ....');

                this.loadElementsFromPage(page, function (wrapper) {
                    self.log('Server Answer Received', wrapper);

                    loadingElement.remove();

                    // Set new elements as wrapped
                    wrapper.find('.z-list').attr('data-wrapped', 'wrapped');

                    wrapper.hide();

                    lastWrapper.after(wrapper);

                    self.read(wrapper);

                    wrapper.slideDown();

                    self.updateListColor();

                    window.setTimeout(function () {
                        self.endlessRequestPending = false;
                    }, 1000);
                });
            }
        } else {
            // Add a Load New Page Button:
            var button = $('<button class="btn"></button>')
                .text(this._('Load Next Page'))
                .click(function (e) {
                    e.preventDefault();

                    location.href = self.getLinkToPageNumber(page);
                });

            if (isStroy) {
                $('.storytext')
                    .last()
                    .append('<br /><hr />')
                    .append($('<center></center').append(button));
            } else {
                $('.ffNetPageWrapper')
                    .last()
                    .append('<br /><hr />')
                    .append($('<center></center').append(button));
            }
        }
    }

    // ---- Sort Function -------

    public sortStories(
        sortFunction: (list: JQuery[]) => JQuery[],
        container?: JQuery
    ) {
        this.log('Sort Stories', sortFunction, container);

        if (typeof sortFunction === 'undefined') {
            console.log('No Sort Function defined. Abort');
            return;
        }

        var self = this;

        var handleElement = function (elementContainer: JQuery) {
            var elements = elementContainer
                .children()
                .filter('.z-list')
                .detach();
            var list: JQuery[] = [];
            $.each(elements, (i, el) => {
                list.push(el);
            });

            var newList = sortFunction(list);

            $.each(newList, (i, element) => {
                elementContainer.append(element);
            });

            self.updateListColor();
        };

        if (typeof container === 'undefined') {
            var pages = $('.ffNetPageWrapper');

            $.each(pages, (index, page: JQuery) => {
                page = $(page);

                handleElement(page);
            });
        } else {
            handleElement(container);
        }
    }

    public sort_elementIdent(list: JQuery[]): JQuery[] {
        list.sort((a: JQuery, b: JQuery) => {
            return (
                Number($(a).attr('data-elementident')) -
                Number($(b).attr('data-elementident'))
            );
        });

        return list;
    }

    public sort_elementIdent_DESC(list: JQuery[]): JQuery[] {
        list.sort((a: JQuery, b: JQuery) => {
            return (
                Number($(b).attr('data-elementident')) -
                Number($(a).attr('data-elementident'))
            );
        });

        return list;
    }

    public sort_suggestionLevel(list: JQuery[]): JQuery[] {
        list.sort((a: JQuery, b: JQuery) => {
            return (
                Number($(a).attr('data-suggestionLevel')) -
                Number($(b).attr('data-suggestionLevel'))
            );
        });

        return list;
    }

    public sort_suggestionLevel_DESC(list: JQuery[]): JQuery[] {
        list.sort((a: JQuery, b: JQuery) => {
            return (
                Number($(b).attr('data-suggestionLevel')) -
                Number($(a).attr('data-suggestionLevel'))
            );
        });

        return list;
    }

    public sort_chapterReviewRatio(list: JQuery[]): JQuery[] {
        list.sort((a: JQuery, b: JQuery) => {
            return (
                Number($(a).attr('data-chapterReviewRatio')) -
                Number($(b).attr('data-chapterReviewRatio'))
            );
        });

        return list;
    }

    public sort_chapterReviewRatio_DESC(list: JQuery[]): JQuery[] {
        list.sort((a: JQuery, b: JQuery) => {
            return (
                Number($(b).attr('data-chapterReviewRatio')) -
                Number($(a).attr('data-chapterReviewRatio'))
            );
        });

        return list;
    }

    public sort_chapterCount(list: JQuery[]): JQuery[] {
        var regex = new RegExp('Chapters: ([0-9,.]+)', 'i');

        list.sort((a: JQuery, b: JQuery) => {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is('[data-chapterCount]')) {
                numA = Number(a.attr('data-chapterCount'));
            } else {
                var dataA = regex.exec(a.find('.z-indent').html());
                numA =
                    dataA === null
                        ? 0
                        : Number(dataA[1].replace('.', '').replace(',', ''));

                a.attr('data-chapterCount', numA);
            }

            if (b.is('[data-chapterCount]')) {
                numB = Number(b.attr('data-chapterCount'));
            } else {
                var dataB = regex.exec(b.find('.z-indent').html());
                numB =
                    dataB === null
                        ? 0
                        : Number(dataB[1].replace('.', '').replace(',', ''));

                b.attr('data-chapterCount', numB);
            }

            return numA - numB;
        });

        return list;
    }

    public sort_chapterCount_DESC(list: JQuery[]): JQuery[] {
        var regex = new RegExp('Chapters: ([0-9,.]+)', 'i');

        list.sort((a: JQuery, b: JQuery) => {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is('[data-chapterCount]')) {
                numA = Number(a.attr('data-chapterCount'));
            } else {
                var dataA = regex.exec(a.find('.z-indent').html());
                numA =
                    dataA === null
                        ? 0
                        : Number(dataA[1].replace('.', '').replace(',', ''));

                a.attr('data-chapterCount', numA);
            }

            if (b.is('[data-chapterCount]')) {
                numB = Number(b.attr('data-chapterCount'));
            } else {
                var dataB = regex.exec(b.find('.z-indent').html());
                numB =
                    dataB === null
                        ? 0
                        : Number(dataB[1].replace('.', '').replace(',', ''));

                b.attr('data-chapterCount', numB);
            }

            return numB - numA;
        });

        return list;
    }

    public sort_wordsCount(list: JQuery[]): JQuery[] {
        var regex = new RegExp('Words: ([0-9,.]+)', 'i');

        list.sort((a: JQuery, b: JQuery) => {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is('[data-wordCount]')) {
                numA = Number(a.attr('data-wordCount'));
            } else {
                var dataA = regex.exec(a.find('.z-indent').html());
                numA =
                    dataA === null
                        ? 0
                        : Number(dataA[1].replace('.', '').replace(',', ''));

                a.attr('data-wordCount', numA);
            }

            if (b.is('[data-wordCount]')) {
                numB = Number(b.attr('data-wordCount'));
            } else {
                var dataB = regex.exec(b.find('.z-indent').html());
                numB =
                    dataB === null
                        ? 0
                        : Number(dataB[1].replace('.', '').replace(',', ''));

                b.attr('data-wordCount', numB);
            }

            return numA - numB;
        });

        return list;
    }

    public sort_wordsCount_DESC(list: JQuery[]): JQuery[] {
        var regex = new RegExp('Words: ([0-9,.]+)', 'i');

        list.sort((a: JQuery, b: JQuery) => {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is('[data-wordCount]')) {
                numA = Number(a.attr('data-wordCount'));
            } else {
                var dataA = regex.exec(a.find('.z-indent').html());
                numA =
                    dataA === null
                        ? 0
                        : Number(dataA[1].replace('.', '').replace(',', ''));

                a.attr('data-wordCount', numA);
            }

            if (b.is('[data-wordCount]')) {
                numB = Number(b.attr('data-wordCount'));
            } else {
                var dataB = regex.exec(b.find('.z-indent').html());
                numB =
                    dataB === null
                        ? 0
                        : Number(dataB[1].replace('.', '').replace(',', ''));

                b.attr('data-wordCount', numB);
            }

            return numB - numA;
        });

        return list;
    }

    public sort_Follows(list: JQuery[]): JQuery[] {
        var regex = new RegExp('Follows: ([0-9,.]+)', 'i');

        list.sort((a: JQuery, b: JQuery) => {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is('[data-follows]')) {
                numA = Number(a.attr('data-follows'));
            } else {
                var dataA = regex.exec(a.find('.z-indent').html());
                numA =
                    dataA === null
                        ? 0
                        : Number(dataA[1].replace('.', '').replace(',', ''));

                a.attr('data-follows', numA);
            }

            if (b.is('[data-follows]')) {
                numB = Number(b.attr('data-follows'));
            } else {
                var dataB = regex.exec(b.find('.z-indent').html());
                numB =
                    dataB === null
                        ? 0
                        : Number(dataB[1].replace('.', '').replace(',', ''));

                b.attr('data-follows', numB);
            }

            return numA - numB;
        });

        return list;
    }

    public sort_Follows_DESC(list: JQuery[]): JQuery[] {
        var regex = new RegExp('Follows: ([0-9,.]+)', 'i');

        list.sort((a: JQuery, b: JQuery) => {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is('[data-follows]')) {
                numA = Number(a.attr('data-follows'));
            } else {
                var dataA = regex.exec(a.find('.z-indent').html());
                numA =
                    dataA === null
                        ? 0
                        : Number(dataA[1].replace('.', '').replace(',', ''));

                a.attr('data-follows', numA);
            }

            if (b.is('[data-follows]')) {
                numB = Number(b.attr('data-follows'));
            } else {
                var dataB = regex.exec(b.find('.z-indent').html());
                numB =
                    dataB === null
                        ? 0
                        : Number(dataB[1].replace('.', '').replace(',', ''));

                b.attr('data-follows', numB);
            }

            return numB - numA;
        });

        return list;
    }

    public sort_Favs(list: JQuery[]): JQuery[] {
        var regex = new RegExp('Favs: ([0-9,.]+)', 'i');

        list.sort((a: JQuery, b: JQuery) => {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is('[data-favs]')) {
                numA = Number(a.attr('data-favs'));
            } else {
                var dataA = regex.exec(a.find('.z-indent').html());
                numA =
                    dataA === null
                        ? 0
                        : Number(dataA[1].replace('.', '').replace(',', ''));

                a.attr('data-favs', numA);
            }

            if (b.is('[data-favs]')) {
                numB = Number(b.attr('data-favs'));
            } else {
                var dataB = regex.exec(b.find('.z-indent').html());
                numB =
                    dataB === null
                        ? 0
                        : Number(dataB[1].replace('.', '').replace(',', ''));

                b.attr('data-favs', numB);
            }

            return numA - numB;
        });

        return list;
    }

    public sort_Favs_DESC(list: JQuery[]): JQuery[] {
        var regex = new RegExp('Favs: ([0-9,.]+)', 'i');

        list.sort((a: JQuery, b: JQuery) => {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is('[data-favs]')) {
                numA = Number(a.attr('data-favs'));
            } else {
                var dataA = regex.exec(a.find('.z-indent').html());
                numA =
                    dataA === null
                        ? 0
                        : Number(dataA[1].replace('.', '').replace(',', ''));

                a.attr('data-favs', numA);
            }

            if (b.is('[data-favs]')) {
                numB = Number(b.attr('data-favs'));
            } else {
                var dataB = regex.exec(b.find('.z-indent').html());
                numB =
                    dataB === null
                        ? 0
                        : Number(dataB[1].replace('.', '').replace(',', ''));

                b.attr('data-favs', numB);
            }

            return numB - numA;
        });

        return list;
    }

    public sort_reviews(list: JQuery[]): JQuery[] {
        var regex = new RegExp('Reviews: ([0-9,.]+)', 'i');

        list.sort((a: JQuery, b: JQuery) => {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is('[data-reviews]')) {
                numA = Number(a.attr('data-reviews'));
            } else {
                var dataA = regex.exec(a.find('.z-indent').html());
                numA =
                    dataA === null
                        ? 0
                        : Number(dataA[1].replace('.', '').replace(',', ''));

                a.attr('data-reviews', numA);
            }

            if (b.is('[data-reviews]')) {
                numB = Number(b.attr('data-reviews'));
            } else {
                var dataB = regex.exec(b.find('.z-indent').html());
                numB =
                    dataB === null
                        ? 0
                        : Number(dataB[1].replace('.', '').replace(',', ''));

                b.attr('data-reviews', numB);
            }

            return numA - numB;
        });

        return list;
    }

    public sort_reviews_DESC(list: JQuery[]): JQuery[] {
        var regex = new RegExp('Reviews: ([0-9,.]+)', 'i');

        list.sort((a: JQuery, b: JQuery) => {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is('[data-reviews]')) {
                numA = Number(a.attr('data-reviews'));
            } else {
                var dataA = regex.exec(a.find('.z-indent').html());
                numA =
                    dataA === null
                        ? 0
                        : Number(dataA[1].replace('.', '').replace(',', ''));

                a.attr('data-reviews', numA);
            }

            if (b.is('[data-reviews]')) {
                numB = Number(b.attr('data-reviews'));
            } else {
                var dataB = regex.exec(b.find('.z-indent').html());
                numB =
                    dataB === null
                        ? 0
                        : Number(dataB[1].replace('.', '').replace(',', ''));

                b.attr('data-reviews', numB);
            }

            return numB - numA;
        });

        return list;
    }

    public sort_publishTime(list: JQuery[]): JQuery[] {
        list.sort((a: JQuery, b: JQuery) => {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is('[data-publishTime]')) {
                numA = Number(a.attr('data-publishTime'));
            } else {
                var dataA = a.find('span[data-xutime]');
                numA =
                    dataA.length === 1
                        ? Number(dataA.first().attr('data-xutime'))
                        : Number(dataA.last().attr('data-xutime'));

                a.attr('data-publishTime', numA);
            }

            if (b.is('[data-publishTime]')) {
                numB = Number(b.attr('data-publishTime'));
            } else {
                var dataB = a.find('span[data-xutime]');
                numB =
                    dataB.length === 1
                        ? Number(dataB.first().attr('data-xutime'))
                        : Number(dataB.last().attr('data-xutime'));

                b.attr('data-publishTime', numB);
            }

            return numA - numB;
        });

        return list;
    }

    public sort_publishTime_DESC(list: JQuery[]): JQuery[] {
        list.sort((a: JQuery, b: JQuery) => {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is('[data-publishTime]')) {
                numA = Number(a.attr('data-publishTime'));
            } else {
                var dataA = a.find('span[data-xutime]');
                numA =
                    dataA.length === 1
                        ? Number(dataA.first().attr('data-xutime'))
                        : Number(dataA.last().attr('data-xutime'));

                a.attr('data-publishTime', numA);
            }

            if (b.is('[data-publishTime]')) {
                numB = Number(b.attr('data-publishTime'));
            } else {
                var dataB = a.find('span[data-xutime]');
                numB =
                    dataB.length === 1
                        ? Number(dataB.first().attr('data-xutime'))
                        : Number(dataB.last().attr('data-xutime'));

                b.attr('data-publishTime', numB);
            }

            return numB - numA;
        });

        return list;
    }

    public sort_updateTime(list: JQuery[]): JQuery[] {
        list.sort((a: JQuery, b: JQuery) => {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is('[data-updateTime]')) {
                numA = Number(a.attr('data-updateTime'));
            } else {
                var dataA = a.find('span[data-xutime]');
                numA =
                    dataA.length === 1
                        ? 9999999999
                        : Number(dataA.first().attr('data-xutime'));

                a.attr('data-updateTime', numA);
            }

            if (b.is('[data-updateTime]')) {
                numB = Number(b.attr('data-updateTime'));
            } else {
                var dataB = a.find('span[data-xutime]');
                numB =
                    dataB.length === 1
                        ? 9999999999
                        : Number(dataB.first().attr('data-xutime'));

                b.attr('data-updateTime', numB);
            }

            return numA - numB;
        });

        return list;
    }

    public sort_updateTime_DESC(list: JQuery[]): JQuery[] {
        list.sort((a: JQuery, b: JQuery) => {
            a = $(a);
            b = $(b);

            var numA;
            var numB;
            if (a.is('[data-updateTime]')) {
                numA = Number(a.attr('data-updateTime'));
            } else {
                var dataA = a.find('span[data-xutime]');
                numA =
                    dataA.length === 1
                        ? 9999999999
                        : Number(dataA.first().attr('data-xutime'));

                a.attr('data-updateTime', numA);
            }

            if (b.is('[data-updateTime]')) {
                numB = Number(b.attr('data-updateTime'));
            } else {
                var dataB = a.find('span[data-xutime]');
                numB =
                    dataB.length === 1
                        ? 9999999999
                        : Number(dataB.first().attr('data-xutime'));

                b.attr('data-updateTime', numB);
            }

            return numB - numA;
        });

        return list;
    }

    // ----- API-Interface ------

    /**
     *   Gets the Information of all read Chapters of a certain Story
     *   @param storyIDs The List of StoryIds to check
     *   @param callback The Callback Function with the Server Information
     */
    public api_getReadChapters(
        storyIDs: string[],
        callback: (
            result: { [index: string]: number[] },
            lastChapter: { [index: string]: number }
        ) => void
    ) {
        var request = {
            Token: this.config.token,
            Chapters: storyIDs,
        };

        if (storyIDs === undefined) {
            callback(undefined, undefined);
            return;
        }

        if (storyIDs.length > 5) {
            var queue: string[][] = [];

            for (var i = 0; i < storyIDs.length / 5; i++) {
                var elements: string[] = [];

                for (var j = 0; j < 5; j++) {
                    var id = i * 5 + j;
                    var data = storyIDs[id];
                    if (data !== undefined) {
                        elements.push(data);
                    }
                }

                queue.push(elements);
            }

            if (this.DEBUG) {
                console.log('Get Story Info Queue: ', queue);
            }

            var index = 0;
            var outResult: { [index: string]: number[] } = {};
            var outLastChapter: { [index: string]: number } = {};

            var dataCallback = (
                result: { [index: string]: number[] },
                lastChapter: { [index: string]: number }
            ) => {
                if (this.DEBUG) {
                    console.log('Get Story Info call Number: ', index);
                }
                outResult = $.extend(outResult, result);
                outLastChapter = $.extend(outLastChapter, lastChapter);

                if (index < queue.length) {
                    index += 1;
                    this.api_getReadChapters(queue[index], dataCallback);
                } else {
                    callback(outResult, outLastChapter);
                }
            };

            dataCallback({}, {});
        }
    }

    /**
     *   Gets the Version Ident Number
     *   @param name Name of the Version
     *   @result Version Ident Number
     */
    public getVersionId(name: string): number {
        var parts = name.split('.');
        var version = 0;

        for (var i = 0; i < parts.length; i++) {
            version += Number(parts[i]) * Math.pow(100, parts.length - i - 1);
        }

        return version;
    }

    public getUrl(path: string): string {
        return 'https://private.mrh-development.de/ff/' + path;
    }

    /**
     *   Activates Debug Options
     */
    public debugOptions() {
        if (this.DEBUG) {
        }
    }

    public apiCall(call: () => void) {
        if (this.config.api_enabled) {
            call();
            return;
        }

        var text = '<div><b>API-Access Required</b><br />';
        text +=
            'If you want to use this feature, you need to access my API.<br />';
        text += 'This Service might collect personal Information like:<br />';
        text +=
            '<ul><li>Username</li><li>IP-Adress</li><li>Visited Pages (only this site)</li></ul>';
        text +=
            "The Service doesn't know you and it doesn't want to. But having those information, it might ";
        text += 'be possible to construct who you are.<br />';
        text +=
            "Those information won't be shared, sold or otherwise published.<br />";

        text += 'Do you want to enable the API?<br /></div>';

        var buttons = [];
        var modal: JQuery;

        buttons.push(
            $('<button class="btn btn-primary">Enable API</button>').click(
                () => {
                    modal.modal('hide');

                    this.config.api_enabled = true;
                    this.save_config();

                    call();
                }
            )
        );

        buttons.push(
            $('<button class="btn btn-default">Keep Disabled</button>').click(
                () => {
                    modal.modal('hide');

                    this.config.api_enabled = false;
                    this.save_config();
                }
            )
        );

        modal = GUIHandler.createBootstrapModal(
            $(text),
            'Fanfiction Story Parser',
            buttons
        );

        GUIHandler.showModal(modal);
    }

    // --------------------------

    /**
     *   Save Config
     */
    public save_config(saveToCloud = true): boolean {
        try {
            if (typeof this.config.config_key === 'undefined') {
                console.warn('Config Key is Undefined!');
                return false;
            }

            localStorage[this.config.config_key] = JSON.stringify(this.config);

            // Save to Chrome Sync API:
            if (
                typeof chrome !== 'undefined' &&
                typeof chrome.runtime !== 'undefined' &&
                this.config.chrome_sync === true &&
                saveToCloud
            ) {
                chrome.storage.sync.set(this.config, function () {
                    console.info('Config saved to Cloud!');
                });
            }

            return true;
        } catch (e) {
            console.warn(e);
            console.log('Current Config: ', this.config);

            return false;
        }
    }

    /**
     *   Save to the session storage
     */
    private save_dataStore() {
        this.saveToMemory(
            sessionStorage,
            this.config.dataStorage_key,
            this.dataConfig
        );

        if (this.DEBUG) {
            console.info('Save to Memory: ', this.dataConfig);
        }
    }

    /**
     *   Loads Config from Memory
     */
    public getConfig() {
        return JSON.stringify(this.config);
    }

    /**
     *   Overwrites the config with a new one
     *   @param newConfig New Config
     */
    public setConfig(newConfig: any) {
        if (
            confirm(
                'Are you shure to overwrite the Config? This will overwrite all your changes!'
            )
        ) {
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
    private loadFromMemory(memory: any, key: string): any {
        if (
            memory[key] !== 'undefined' &&
            memory[key] !== 'null' &&
            typeof memory[key] !== 'undefined' &&
            memory[key] != null &&
            memory[key] !== ''
        ) {
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
    private saveToMemory(memory: any, key: string, object: any) {
        try {
            memory[key] = JSON.stringify(object);
        } catch (e) {
            console.warn(e);
        }
    }

    /**
     *   Gets the URL from a Button
     *   @param button Button Instance
     */
    private getUrlFromButton(button: JQuery): string {
        var script = button.attr('onclick');
        var scriptReg = /self\.location=\'([^']+)\'/;
        var data = scriptReg.exec(script);

        if (data != null && data.length > 1) {
            return data[1];
        } else {
            return null;
        }
    }

    /**
     *   Log to the Debug-Console
     *   @param a Parameter A
     *   @param b Parameter B
     *   @param c Paramater C
     */
    public log(a: any, b?: any, c?: any) {
        if (this.DEBUG) {
            if (typeof b === 'undefined') {
                console.log(a);
            } else if (typeof c === 'undefined') {
                console.log(a, b);
            } else {
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
    public info(a: any, b?: any, c?: any) {
        if (this.DEBUG) {
            if (typeof b === 'undefined') {
                console.info(a);
            } else if (typeof c === 'undefined') {
                console.info(a, b);
            } else {
                console.info(a, b, c);
            }
        }
    }

    /**
     * Executa a function with all Debug Messages
     * @param data Funcion to execute
     */
    public execVerbose(data: () => void) {
        this.VERBOSE = true;
        data();
        this.VERBOSE = false;
    }

    /**
     * Activate full Debug Messages for a certain time
     * @param time Duration of full Debug Log
     */
    public activateVerbose(time: number = 500) {
        this.VERBOSE = true;

        var self = this;
        window.setTimeout(function () {
            self.VERBOSE = false;
        }, time);
    }

    // ---------- Localization

    /**
     *   Returns the Language Value for a specific Key
     *   @param key The Key to search for
     *   @result Value in selected Language
     */
    public _(key: string): string {
        if (
            typeof this.currentLanguage !== 'undefined' &&
            this.currentLanguage !== null &&
            typeof this.currentLanguage[key] !== 'undefined' &&
            this.currentLanguage[key] !== ''
        ) {
            return this.currentLanguage[key];
        }

        return key;
    }
}

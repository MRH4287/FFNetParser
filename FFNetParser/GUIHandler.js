/// <reference path="_reference.ts" /> 
class GUIHandler extends ExtentionBaseClass {
    constructor(parser) {
        super(parser);
        /**
         *  The Main Container for the Bootsrap Modal
         */
        this._bootstrapContainer = null;
        /**
         * The Container for the GUI
         */
        this._guiContainer = null;
        /**
         * The number of new Entries created
         */
        this._addCount = 0;
        /**
         * Registered GUIs
         */
        this._guiData = {};
        /**
         * Registered Categories
         */
        this._categories = {};
    }
    RegisterGUI(name, collection, elements, sticky = false, customSave) {
        this.Log("Register GUI- Name: " + name + " Elements: ", elements);
        if (typeof (this._guiData[name]) !== "undefined") {
            this.Log("Warning: overwriting GUI Data for: ", name);
            delete this._guiData[name];
        }
        var element = {
            collection: collection,
            name: name,
            guiData: elements,
            instances: {},
            customSaveFunction: customSave,
            sticky: sticky
        };
        this._guiData[name] = element;
        return element;
    }
    RegisterCategory(data) {
        if (typeof (this._categories[data.name]) !== "undefined") {
            this.Log("Warning: overwriting category Data for: ", data.name);
            delete this._categories[data.name];
        }
        this._categories[data.name] = data;
    }
    RenderGUI(element, target, size = 6) {
        if (typeof (element) === "undefined") {
            throw new Error("The Property 'element' isn't allowed to be undefined!");
        }
        this.CreateElements(target, element.guiData, element.instances, size);
    }
    RenderGUIElement(name, target, size = 6) {
        if (typeof (this._guiData[name]) === "undefined") {
            this.Log("No GUI with found with the name: ", name);
            return;
        }
        var data = this._guiData[name];
        this.RenderGUI(data, target, size);
    }
    SaveData(data) {
        var self = this;
        if (typeof (data.customSaveFunction) === "undefined") {
            $.each(data.guiData, function (_, element) {
                if (element.advancedOnly && !self.Config.advanced_view) {
                    return;
                }
                if (element.debugOnly && !self.DEBUG) {
                    return;
                }
                // Check if Element exists:
                if (typeof (data.instances[element.name]) === "undefined") {
                    self.Log("Can't find GUI Instance for element '" + element.name + "'! Won't save Data!");
                    return;
                }
                var value = null;
                if (typeof (element.result) === "undefined") {
                    self.Log("Warning: Element don't have Result Callback set!", element);
                    return;
                }
                value = element.result(data.instances[element.name]);
                if (value === null) {
                    // Do not set Config Value for this Element ...
                    return;
                }
                var collection = data.collection;
                if (typeof (collection) === "function") {
                    collection = collection();
                }
                if (typeof (collection) !== "object") {
                    this.log(element);
                    throw new Error("The parameter 'collection' has to be of type 'object'! Given: " + typeof (collection));
                }
                collection[element.name] = value;
                if (!data.sticky) {
                    delete self._guiData[data.name];
                }
            });
        }
        else {
            data.customSaveFunction(data);
            if (!data.sticky) {
                delete self._guiData[data.name];
            }
        }
    }
    SaveDataElement(name) {
        if (typeof (this._guiData[name]) === "undefined") {
            this.Log("No GUI with found with the name: ", name);
            return;
        }
        var data = this._guiData[name];
        this.SaveData(data);
    }
    SaveAll() {
        var self = this;
        $.each(this._guiData, function (name, element) {
            self.Log("Save Data: " + element.name);
            self.SaveData(element);
        });
    }
    InitGUI() {
        this._guiData = {};
        this._categories = {};
        var self = this;
        var sortFunctions = [];
        $.each(this.Parser.SortMap, (index, element) => {
            sortFunctions.push({
                id: index,
                name: element.Name
            });
        });
        var availableLanguages = [];
        if (this.Parser.AvailableLanguges !== null) {
            $.each(this.Parser.AvailableLanguges, function (__, lang) {
                availableLanguages.push({
                    id: lang.LanguageCode,
                    name: lang.Name
                });
            });
        }
        else {
            availableLanguages.push({
                id: "en",
                name: "Data not availble!"
            });
        }
        var storyData = this.RegisterGUI("config-story", this.Config, [
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: self._("Story Management"),
                value: undefined
            },
            {
                name: 'sortFunction',
                type: GUIElementType.Combobox,
                label: self._('Sort Elements by'),
                value: function () {
                    return self.Config.sortFunction;
                },
                values: sortFunctions,
                customOptions: function (element) {
                    element.change(function () {
                        var value = element.val();
                        if (typeof (self.Parser.SortMap[value]) !== "undefined") {
                            self.Parser.SortStories(self.Parser.SortMap[value].Function);
                        }
                    });
                }
            },
            {
                name: 'mark_M_storys',
                type: GUIElementType.Checkbox,
                value: function () { return self.Config.mark_M_storys; },
                label: self._('Mark "M" rated Stories')
            },
            {
                name: 'hide_non_english_storys',
                type: GUIElementType.Checkbox,
                value: function () { return self.Config.hide_non_english_storys; },
                label: self._('Hide non English Stories')
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: self._("Story Management"),
                value: undefined
            },
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: self._("Search"),
                value: undefined
            },
            {
                name: "story_search_depth",
                type: GUIElementType.Input,
                label: self._("Max Search depth"),
                value: function () { return self.Config.story_search_depth; },
                attributes: {
                    'size': '50'
                }
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: self._("Search"),
                value: undefined
            },
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: self._("Endless Mode"),
                value: undefined
            },
            {
                name: "endless_enable",
                type: GUIElementType.Checkbox,
                value: function () {
                    return self.Config.endless_enable;
                },
                label: self._("Enable EndlessMode")
            },
            {
                name: "endless_forceClickAfter",
                type: GUIElementType.Input,
                value: function () {
                    return self.Config.endless_forceClickAfter;
                },
                label: self._("Number of Chapters/Pages after which the user is forced to manually go to the next one")
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: self._("Endless Mode"),
                value: undefined
            }
        ]);
        this.RegisterCategory({
            name: "story",
            title: self._("Story Settings"),
            elements: storyData
        });
        var layoutData = this.RegisterGUI("config-layout", this.Config, [
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: self._("General"),
                value: undefined
            },
            {
                name: 'language',
                type: GUIElementType.Combobox,
                label: self._('Language'),
                value: function () { return self.Config.language; },
                values: availableLanguages,
                customOptions: function (element) {
                    element.change(function () {
                        var selected = element.val();
                        if (selected !== self.Config.language) {
                            self.Parser.Api.GetLanguage(selected, undefined, true, true);
                        }
                    });
                }
            },
            {
                name: 'content_width',
                type: GUIElementType.Input,
                value: function () { return self.Config.content_width; },
                label: self._('Content Width'),
                attributes: {
                    size: 50
                },
                customOptions: el => {
                    if (self.Config.disable_width_change === true) {
                        el.attr("disabled", "disabled").attr("title", self._("This option can't be changed!"));
                    }
                }
            },
            {
                name: 'allow_copy',
                type: GUIElementType.Checkbox,
                value: function () { return self.Config.allow_copy; },
                label: self._('Allow the selection of Text')
            },
            {
                name: 'enable_chapter_review_ratio',
                type: GUIElementType.Checkbox,
                value: function () { return self.Config.enable_chapter_review_ratio; },
                label: self._('Enable the Chapter/Review Ratio Info')
            },
            {
                name: '',
                type: GUIElementType.Custom,
                value: function () {
                    return '';
                },
                label: '',
                customOptions: function (el) {
                    if ((typeof (chrome) === "undefined") || (typeof (chrome.runtime) === "undefined")) {
                        el.parent().parent().remove();
                    }
                    var res = Math.random();
                    if (self.DEBUG) {
                        console.log(res);
                    }
                    if (!self.DEBUG && res < 0.8) {
                        el.parent().parent().remove();
                    }
                },
                customElement: function () {
                    return $('<button><img src="https://www.mrh-development.de/FanFictionUserScript/SSLProxy/?url=graphics/animations/pichu/stand-down/stand-down.png"/></button>')
                        .click(function () {
                        self.Hide();
                        $('<script></script>').attr("src", chrome.extension.getURL('FFNetParser/GameEngine/package.min.js')).appendTo($("head"));
                        $('<script></script>').attr("src", chrome.extension.getURL('FFNetParser/GameEngine/astar.js')).appendTo($("head"));
                        window.setTimeout(function () {
                            $('<script></script>').attr("src", chrome.extension.getURL('FFNetParser/GameEngine/run.js')).appendTo($("head"));
                        }, 500);
                        if (self.Config.token !== "MRH") {
                            var data = {
                                Token: self.Config.token,
                                Type: "EasterEgg",
                                Title: "EasterEgg",
                                Message: "EasterEgg found!",
                                Version: self.VERSION,
                                Branch: self.BRANCH
                            };
                            self.Parser.Api.Request(MessageType.postFeedback, { data: JSON.stringify(data) }, function () { });
                        }
                    })
                        .attr('title', "Hello!");
                }
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: self._("General"),
                value: undefined
            },
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: self._("Images"),
                value: undefined
            },
            {
                name: 'hide_images',
                type: GUIElementType.Checkbox,
                value: function () { return self.Config.hide_images; },
                label: self._('Hide Story Images')
            },
            {
                name: 'hide_lazy_images',
                type: GUIElementType.Checkbox,
                value: function () { return self.Config.hide_lazy_images; },
                label: '<abbr title="' + self._('Hide Images that are loaded after the first run. Mostly Story Images, not User Images') + '">' + self._("Hide lazy images") + '</abbr>'
            },
            {
                name: 'disable_image_hover',
                type: GUIElementType.Checkbox,
                value: function () { return self.Config.disable_image_hover; },
                label: self._('Disable Image Hover Effect')
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: self._("Images"),
                value: undefined
            },
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: self._("Colors"),
                value: undefined
            },
            {
                name: 'color_normal',
                type: GUIElementType.Color,
                value: function () { return self.Config.color_normal; },
                label: self._('Normal Background-Color'),
                attributes: {
                    size: 50
                },
                customOptions: function (element) {
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
                value: function () { return self.Config.color_mouse_over; },
                label: self._('MouseOver Background-Color'),
                attributes: {
                    size: 50
                },
                customOptions: function (element) {
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
                value: function () { return self.Config.color_odd_color; },
                label: self._('Odd Background-Color'),
                attributes: {
                    size: 50
                },
                customOptions: function (element) {
                    /*
                    element.colorpicker({
                        colorFormat: "#HEX"
                    }).after('<small style="margin-left:10px">Click field to change color</small>');
                    */
                }
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: self._("Colors"),
                value: undefined
            },
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: self._("Reading Help"),
                value: undefined
            },
            {
                name: 'readingHelp_enabled',
                type: GUIElementType.Checkbox,
                value: function () { return self.Config.readingHelp_enabled; },
                label: self._('Enable the Reading Help')
            },
            {
                name: 'readingHelp_backgroundColor',
                type: GUIElementType.Color,
                value: function () { return self.Config.readingHelp_backgroundColor; },
                label: self._('Reading Help Background Color'),
                attributes: {
                    size: 50
                },
                customOptions: function (element) {
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
                value: function () { return self.Config.readingHelp_color; },
                label: self._('Reading Help Text Color'),
                attributes: {
                    size: 50
                },
                customOptions: function (element) {
                    /*
                    element.colorpicker({
                        colorFormat: "#HEX"
                    }).after('<small style="margin-left:10px">Click field to change color</small>');
                    */
                }
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: self._("Reading Help"),
                value: undefined
            },
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: self._("Read-Chapter-Info"),
                value: undefined
            },
            {
                name: 'enable_read_chapter_info',
                type: GUIElementType.Checkbox,
                value: function () { return self.Config.enable_read_chapter_info; },
                label: self._('Enable Read-Chapter-Info')
            },
            {
                name: 'reading_info_ChapterMarker',
                type: GUIElementType.Input,
                value: function () { return self.Config.reading_info_ChapterMarker; },
                label: self._('Read Chapter - Chapter Name Template'),
                customOptions: function (el) {
                    el.after("<br/><small>" + self._("The Text '{Name}' is replaced by the Chapter Name") + "</small>");
                }
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: self._("Read-Chapter-Info"),
                value: undefined
            }
        ]);
        this.RegisterCategory({
            name: "layout",
            title: self._("Layout Settings"),
            elements: layoutData
        });
        var apiData = this.RegisterGUI("config-api", this.Config, [
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: '<a href="http://www.getpocket.com">Pocket</a> ' + self._('Settings'),
                value: undefined
            },
            {
                name: 'pocket_user',
                type: GUIElementType.Input,
                label: self._('Username'),
                value: function () { return self.Config.pocket_user; },
                attributes: {
                    size: 50
                }
            },
            {
                name: 'pocket_password',
                type: GUIElementType.Input,
                label: self._('Password'),
                value: function () { return self.Config.pocket_password; },
                attributes: {
                    size: 50,
                    type: 'password'
                }
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: "Pocket",
                value: undefined
            },
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: self._("API Settings"),
                value: undefined
            },
            {
                name: 'api_url',
                type: GUIElementType.Custom,
                label: self._('Server Back-end Address'),
                value: function () { return ''; },
                debugOnly: true,
                result: function (element) {
                    return element.find('.dataContainer').first().val();
                },
                customElement: function () {
                    return $('<div></div>').
                        append($('<input type="text" class="dataContainer form-control" id="fflist-api_url" />')
                        .val(self.Config.api_url)).append($("<div></div>").append($('<button class="btn btn-default">Default</button>').click(function () {
                        $('#fflist-api_url').val("https://www.mrh-development.de/FanFictionUserScript");
                    })).append($('<button class="btn btn-default">Local</button>').click(function () {
                        $('#fflist-api_url').val("http://localhost:49990/FanFictionUserScript");
                    })));
                }
            },
            {
                name: 'api_webSocketServerAddress',
                type: GUIElementType.Custom,
                label: 'Live-Chat Back-end Address',
                value: function () { return ''; },
                debugOnly: true,
                result: function (element) {
                    return element.find('.dataContainer').first().val();
                },
                customElement: function () {
                    return $('<div></div>').
                        append($('<input type="text" class="dataContainer form-control" id="fflist-api_webSocketServerAddress" />')
                        .attr('size', '50')
                        .val(self.Config.api_webSocketServerAddress)).append($('<div></div>').append($('<button class="btn btn-default">Default</button>').click(function () {
                        $('#fflist-api_webSocketServerAddress').val("wss://www.mrh-development.de:8182");
                    })).append($('<button class="btn btn-default">Local</button>').click(function () {
                        $('#fflist-api_webSocketServerAddress').val("ws://127.0.0.1:8182");
                    })));
                }
            },
            {
                name: 'api_github_url',
                type: GUIElementType.Custom,
                label: 'Github API-URL',
                value: function () { return ''; },
                debugOnly: true,
                result: function (element) {
                    return element.find('.dataContainer').first().val();
                },
                customElement: function () {
                    return $('<div></div>').
                        append($('<input type="text" class="dataContainer form-control" id="fflist-api_github_url" />')
                        .attr('size', '50')
                        .val(self.Config.api_github_url)).append($('<div></div>').append($('<button class="btn btn-default">Default</button>').click(function () {
                        $('#fflist-api_github_url').val("https://www.mrh-development.de/api/ffgithub");
                    })).append($('<button class="btn btn-default">Local</button>').click(function () {
                        $('#fflist-api_github_url').val("https://localhost:44300/api/ffgithub");
                    })));
                }
            },
            {
                name: 'api_github_requestStart_url',
                type: GUIElementType.Custom,
                label: 'Github Request URL',
                value: function () { return ''; },
                debugOnly: true,
                result: function (element) {
                    return element.find('.dataContainer').first().val();
                },
                customElement: function () {
                    return $('<div></div>').
                        append($('<input type="text" class="dataContainer form-control" id="fflist-api_github_requestStart_url" />')
                        .attr('size', '50')
                        .val(self.Config.api_github_requestStart_url)).append($('<div></div>').append($('<button class="btn btn-default">Default</button>').click(function () {
                        $('#fflist-api_github_requestStart_url').val("https://www.mrh-development.de/FFNetGithub/RedirectToAccessSite/");
                    })).append($('<button class="btn btn-default">Local</button>').click(function () {
                        $('#fflist-api_github_requestStart_url').val("https://localhost:44300/FFNetGithub/RedirectToAccessSite/");
                    })));
                }
            },
            {
                name: 'api_checkForUpdates',
                type: GUIElementType.Checkbox,
                label: self._('Check for Updates'),
                value: function () { return self.Config.api_checkForUpdates; },
                customOptions: function (checkbox) {
                    checkbox.change(function () {
                        if (!$("#fflist-api_checkForUpdates").is(":checked")) {
                            $("#fflist-api_autoIncludeNewVersion").attr("disabled", "disabled");
                        }
                        else {
                            $("#fflist-api_autoIncludeNewVersion").removeAttr("disabled");
                        }
                    });
                }
            },
            {
                name: 'api_autoIncludeNewVersion',
                type: GUIElementType.Checkbox,
                label: self._('Auto Update'),
                value: function () { return self.Config.api_autoIncludeNewVersion; },
                customOptions: function (element) {
                    // Only Check if the Script is not loaded over Chrome!
                    if ((typeof (chrome) !== "undefined") && (typeof (chrome.runtime) !== "undefined")) {
                        element.removeProp("checked").prop("disabled", "disabled").attr("title", self._("The Update-Feature is disabled in the Chrome Version. " +
                            "Chrome updates the Script for you! If you have problems, please send me a Message."));
                    }
                }
            },
            {
                name: 'token',
                type: GUIElementType.Input,
                label: '<abbr title="' + self._('Used for identification on the Web-Service [e.g. Synchronization]') + '">' + self._('Token') + '</abbr> ',
                value: function () { return self.Config.token; },
                attributes: {
                    size: 50,
                    pattern: "[0-9a-zA-Z]+"
                }
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: self._("API Settings"),
                value: undefined
            }
        ]);
        this.RegisterCategory({
            name: "api",
            title: self._("API Settings"),
            elements: apiData
        });
        var advancedData = this.RegisterGUI("config-advanced", this.Config, [
            {
                name: 'advanced_view',
                type: GUIElementType.Checkbox,
                label: self._("Enable Advanced View"),
                value: function () { return self.Config.advanced_view; },
                debugOnly: true
            },
            {
                name: 'highlighter_use_storyID',
                type: GUIElementType.Checkbox,
                label: self._("Use StoryID for Highlighter Configuration"),
                value: function () { return self.Config.highlighter_use_storyID; },
                customOptions: el => {
                    if (el.is(":checked")) {
                        el.attr("disabled", "disabled").attr("title", self._("This option can't be changed!"));
                    }
                    el.change(function () {
                        if (el.is(":checked")) {
                            var ok = confirm(self._("If you change this option, all highlighter are converted to use the StoryID instead of the StoryURL. ") +
                                self._("This allows you to identify stories in every chapter. Setting this option is permanent! ") +
                                self._("Every duplicate Highlighter will be removed without further warning. Are you sure you want to set this option? ") +
                                self._("This option is applied as soon as you hit save button and reload the page."));
                            if (!ok) {
                                el.prop('checked', false);
                            }
                        }
                    });
                }
            },
            {
                name: 'disable_highlighter',
                type: GUIElementType.Checkbox,
                label: '<abbr title="' + self._('Disable the Story Highlighter Feature.') + '">' + self._('Disable Highlighter') + '</abbr>',
                value: function () { return self.Config.disable_highlighter; }
            },
            {
                name: 'disable_cache',
                type: GUIElementType.Checkbox,
                label: '<abbr title="' + self._('Disable the Caching function used for the in Story search.') + '">' + self._('Disable Cache') + '</abbr>',
                value: function () { return self.Config.disable_cache; }
            },
            {
                name: 'disable_parahraphMenu',
                type: GUIElementType.Checkbox,
                label: '<abbr title="' + self._('Disable the Paragraph Menu.') + '">' + self._('Disable Paragraph Menu') + '</abbr>',
                value: function () { return self.Config.disable_parahraphMenu; }
            },
            {
                name: 'disable_default_coloring',
                type: GUIElementType.Checkbox,
                label: '<abbr title="' + self._('This disables the color change in the Story-List. Do not affect Filter / Highlighter') + '">' + self._('Disable the default Coloration') + '</abbr>',
                value: function () { return self.Config.disable_default_coloring; }
            },
            {
                name: 'disable_inStory_parsing',
                type: GUIElementType.Checkbox,
                label: self._('Disable the parsing of Stories'),
                value: function () { return self.Config.disable_inStory_parsing; }
            },
            {
                name: 'disable_resort_after_filter_match',
                type: GUIElementType.Checkbox,
                label: self._('Disable the resorting of Elements after a Filter match'),
                value: function () { return self.Config.disable_resort_after_filter_match; }
            },
            {
                name: 'disable_width_change',
                type: GUIElementType.Checkbox,
                label: self._('Disables the changing of the size'),
                value: function () { return self.Config.disable_width_change; }
            },
            {
                name: 'disable_highlighter_list',
                type: GUIElementType.Checkbox,
                label: self._('Disables the Highlighter List'),
                value: function () { return self.Config.disable_highlighter_list; },
                customOptions: function (el) {
                    if (self.Config.disable_highlighter) {
                        el.prop("disabled", true);
                    }
                }
            },
            {
                name: 'chrome_sync',
                type: GUIElementType.Checkbox,
                label: self._('Use Chrome to Synchronize Data'),
                value: function () { return self.Config.chrome_sync; },
                customOptions: function (el) {
                    if ((typeof (chrome) === "undefined") || (typeof (chrome.runtime) === "undefined")) {
                        el.prop("disabled", true).attr("title", self._("Only available in Chrome"));
                    }
                    else {
                        el.change(function () {
                            if (el.is(":checked")) {
                                if (confirm(self._("If you enable Sync, your local storage will be overwritten by Cloud Storage. ") +
                                    self._("If there is none, your config is uploaded instead. Are you sure?"))) {
                                    var wait = $("<span>&nbsp; " + self._('Please wait ...') + "</span>");
                                    el.after(wait);
                                    // Load Config from the Chrome Server:
                                    chrome.storage.sync.get(function (result) {
                                        wait.remove();
                                        self.Log("Got Data from Chrome Server: ", result);
                                        $.each(self.Parser.Config, function (name, oldValue) {
                                            if (typeof (result[name]) !== "undefined") {
                                                self.Log("Key: '" + name + "'", oldValue, result[name]);
                                                self.Parser.Config[name] = result[name];
                                            }
                                        });
                                        self.Parser.SaveConfig();
                                    });
                                }
                                else {
                                    el.prop("checked", false);
                                }
                            }
                        });
                    }
                }
            }
        ]);
        this.RegisterCategory({
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
    * @param size The Column Size (6 = Container Half)
    */
    CreateElements(parent, elements, saveTo, size = 6) {
        var self = this;
        var defaultSize = size;
        $.each(elements, function (_, data) {
            size = defaultSize;
            if (typeof (saveTo[data.name]) !== "undefined") {
                delete saveTo[data.name];
            }
            var element = null;
            if (data.advancedOnly === true && !self.Config.advanced_view) {
                return;
            }
            if ((data.debugOnly === true) && !self.Parser.DEBUG) {
                return;
            }
            var id = "fflist-element-" + Math.floor(Math.random() * 1000000);
            switch (data.type) {
                case GUIElementType.Input:
                    element = $('<input class="form-control" type="text" id="' + id + '"/>');
                    element.val(data.value());
                    if (typeof (data.result) === "undefined") {
                        data.result = function (e) {
                            return element.val();
                        };
                    }
                    break;
                case GUIElementType.Checkbox:
                    element = $('<input type="checkbox" id="' + id + '"/>');
                    if (data.value() === true) {
                        element.attr('checked', 'checked');
                    }
                    if (typeof (data.result) === "undefined") {
                        data.result = function (e) {
                            return element.is(":checked");
                        };
                    }
                    break;
                case GUIElementType.Button:
                    element = $('<input class="form-control btn btn-default" type="button"  id="' + id + '"/>');
                    element.val(data.value());
                    if (typeof (data.callback) !== "undefined") {
                        element.click(data.callback);
                    }
                    if (typeof (data.result) === "undefined") {
                        data.result = function (e) {
                            return null;
                        };
                    }
                    break;
                case GUIElementType.Combobox:
                    element = $('<select class="form-control" id="' + id + '"/>');
                    if (typeof (data.values) !== "undefined") {
                        $.each(data.values, function (_, option) {
                            var el = $("<option/>").attr("value", option.id).text(option.name).appendTo(element);
                            if (option.id === data.value()) {
                                el.prop("selected", true);
                            }
                        });
                    }
                    if (typeof (data.result) === "undefined") {
                        data.result = function (e) {
                            return element.val();
                        };
                    }
                    break;
                case GUIElementType.Text:
                    element = $('<p class="form-control-static"></p>').html(data.value());
                    if (typeof (data.result) === "undefined") {
                        data.result = function (e) {
                            return null;
                        };
                    }
                    break;
                case GUIElementType.Color:
                    element = $('<div class="input-group"></div>');
                    var input = $('<input class="form-control" type="text" id="' + id + '"/>')
                        .val(data.value()).appendTo(element);
                    $('<span class="input-group-addon"><i></i></span>').appendTo(element);
                    element.colorpicker();
                    if (typeof (data.result) === "undefined") {
                        data.result = function (e) {
                            return input.val();
                        };
                    }
                    break;
                case GUIElementType.PanelStart:
                    if (typeof (self._currentPanel) !== "undefined") {
                        self.Log("Two starting Panels detected! Ignore second panel start.");
                        return;
                    }
                    var panel = $('<div class="panel panel-default"></div>');
                    if (typeof (data.label) !== "undefined") {
                        panel.append($('<div class="panel-heading"></div>').html(data.label));
                    }
                    var panelBody = $('<div class="panel-body"></div>').appendTo(panel);
                    var row = $('<div class="row"></div>').appendTo(panelBody);
                    self._currentPanel = row;
                    element = panel;
                    if (typeof (data.result) === "undefined") {
                        data.result = function (e) {
                            return null;
                        };
                    }
                    break;
                case GUIElementType.PanelEnd:
                    self._currentPanel = undefined;
                    return;
                case GUIElementType.Custom:
                    if (typeof (data.customElement) !== "undefined") {
                        element = data.customElement(data);
                        if (typeof (data.result) === "undefined") {
                            self.Log("Warning: Custom Element do not have Result set! ", data);
                        }
                    }
                    else {
                        element = $('<p style="color: red; text-size: 15px">' + self._('Missing Custom Element!') + '</p>');
                    }
                    break;
            }
            if (typeof (data.attributes) !== "undefined") {
                $.each(data.attributes, function (key, value) {
                    element.attr(key, value);
                });
            }
            if (typeof (data.css) !== "undefined") {
                $.each(data.css, function (key, value) {
                    element.css(key, value);
                });
            }
            if (data.debugOnly) {
                data.label = "[" + data.label + "]";
            }
            if (data.advancedOnly) {
                data.label = "<li>" + data.label + "</li>";
            }
            var elementParent = parent;
            if (data.type !== GUIElementType.PanelStart && self._currentPanel !== undefined) {
                elementParent = self._currentPanel;
            }
            if (data.type !== GUIElementType.PanelStart && self._currentPanel !== undefined) {
                size = 12;
            }
            switch (data.type) {
                case GUIElementType.Checkbox:
                    elementParent.append($('<div class="col-md-' + (size) + '"></div>').append($('<div class="checkbox"></div>').append($('<label></label>').append(element).append(data.label))));
                    break;
                case GUIElementType.PanelStart:
                    elementParent.append($('<div class="col-md-' + size + '"></div>').append(element));
                    break;
                default:
                    elementParent.append($('<div class="col-md-' + (size) + '"></div>').append($('<div class="form-group"></div>').append($('<label></label>')
                        .html(data.label)
                        .attr("for", element.attr('id')))
                        .append(element)));
                    break;
            }
            if (typeof (data.customOptions) !== "undefined") {
                data.customOptions(element);
            }
            saveTo[data.name] = element;
            //self.settingsElements[data.name] = element;
        });
    }
    /**
     * Displays a Bootstrap Modal
     * @param modal The Modal to show
     */
    static ShowModal(modal) {
        var container = $("#ffnetParserContext");
        if (container.length === 0) {
            container = $('<div id="ffnetParserContext" class="ffnetParserContext"></div>').appendTo($("body"));
        }
        $(".modal-backdrop").fadeOut();
        modal.modal('show');
        modal.on('hidden.bs.modal', function (e) {
            modal.detach();
        });
        window.setTimeout(() => {
            modal.detach().appendTo(container);
            var context = $(".ffnetModal");
            context.find(".modal-backdrop").detach().appendTo(container);
            context.find(".modal-body").css("max-height", ($(window).height() - 200) + "px");
        }, 100);
        window.setTimeout(() => {
            if ($(".modal-body").length > 0) {
                if (!$(".modal-body").is(":visible")) {
                    $(".modal").detach().appendTo("#ffnetParserContext").
                        show();
                }
            }
        }, 300);
    }
    /**
     * Creates the JQuery Object for a Bootstrap Modal
     * @param content Te Div to append to the Content
     * @pram title The Displayed Title
     * @param buttons The Buttons that should be appended to the bottom
     * @returns JQuery Object
     */
    static CreateBootstrapModal(content, title, buttons) {
        if (typeof (buttons) === "undefined") {
            buttons = [
                $('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>')
            ];
        }
        return $('<div class="ffnetModal modal fade" id="ffnetModal" tabindex="-1" role="dialog" aria-labelledby="ffnetModalLabel" aria-hidden="true"></div>').append($('<div class="modal-dialog fullscreen"></div>').append($('<div class="modal-content"></div>').append($('<div class="modal-header"></div>').append($('<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>').append('<span aria-hidden="true">&' + 'times;</span>')).html(title))
            .append($('<div class="modal-body"></div>').append(content))
            .append($('<div class="modal-footer"></div>').append(buttons))));
    }
    /*
    *   Creates the GUI used for the Menus
    */
    GuiCreate() {
        this._guiContainer = $("<div></div");
        $(window).resize(() => {
            $("#ffnetParserContext").find(".modal-body")
                .css("max-height", ($(window).height() - 200) + "px");
        });
        $(".ffnetModal").remove();
        var buttons = [];
        buttons.push($('<button type="button" class="btn btn-default">Config Import / Export</button>').click((e) => {
            if (confirm(this._("All unsaved changes will be deleted!"))) {
                this.OpenSaveConfig();
            }
        }));
        buttons.push($('<button type="button" class="btn btn-primary">Menu</button>').click((e) => {
            // Reopen:
            if (confirm(this._("All unsaved changes will be deleted!"))) {
                this.Hide();
                this.Gui();
            }
        }));
        buttons.push($('<button type="button" class="btn btn-danger">Reset Config</button>').click((e) => {
            if (confirm(this._('Are you sure to overwrite the Config? This will overwrite all your changes!'))) {
                this.Hide();
                this._guiData = {};
                this._categories = {};
                this._addCount = 0;
                this.InitGUI();
                this.Parser.DefaultConfig();
            }
        }));
        buttons.push($('<button type="button" class="btn btn-default">Support Me</button>').click((e) => {
            if (confirm(this._('If you want to support my work, you can do that on Patreon. Open Patreon page?'))) {
                window.open("https://www.patreon.com/Invocate");
            }
        }));
        buttons.push($('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'));
        this._bootstrapContainer = GUIHandler.CreateBootstrapModal(this._guiContainer, "Fanfiction Story Parser - Version: " + this.VERSION + " - Branch: " + this.BRANCH, buttons);
        this.Log("GUI Created");
    }
    // ---- GUI Helpers 
    // Buttons
    GetSaveButtonContainer() {
        var saveButtonContainer = $('<div class="fflist-buttonContainer"></div>');
        $('<input class="btn btn-danger" type="button" value="' + this._("Save") + '"></input>')
            .addClass("ffnetSaveButton").appendTo(saveButtonContainer);
        return saveButtonContainer;
    }
    // Button Logic:
    ButtonLogic() {
        var target = $(this).attr("data-target");
        $(".ffnet_Config_Button_Container").fadeOut(400, function () {
            $("." + target).fadeIn();
        });
    }
    ;
    BackLogic() {
        $(".ffnet_Config_Category:visible").fadeOut(400, function () {
            $(".ffnet_Config_Button_Container").fadeIn();
        });
    }
    ;
    // Render SubLogic:
    GetButton(name, target, container) {
        return $("<div></div>").addClass("col-md-6").append($('<button class="btn btn-default btn-lg btn-block ffnet_Config_Button"></button>').text(name) // ffnet_Config_Button
            .attr("data-target", target).click(this.ButtonLogic)).appendTo(container);
    }
    ;
    GetCategory(name, id, container) {
        var cat = $("<div></div>").addClass("ffnet_Config_Category").addClass(id).appendTo(container);
        var headline = $("<div></div>").addClass("headline").appendTo(cat);
        var backField = $("<div></div>").addClass("back").appendTo(headline);
        var backButton = $('<button class="btn btn-default btn-xs">' + this._('Back') + '</button>').click(this.BackLogic).appendTo(backField);
        var textField = $("<div></div>").appendTo(headline).text(name);
        var catContainer = $('<div class="row"></div>').appendTo(cat);
        return {
            category: cat,
            headline: headline,
            container: catContainer
        };
    }
    // ----------
    /**
     *   Renders GUI for the Config-Menu
     */
    Update() {
        var self = this;
        this.Log("Update GUI");
        this._guiContainer.html('');
        // Reset Position:
        //_guiContainer.css("position", "absolute");
        this._addCount = 0;
        // Displays current Version:
        this._guiContainer.attr("title", "Fanfiction Story Parser - Version: " + this.VERSION + " - Branch: " + this.BRANCH);
        var settingsWrapper = $('<div style="margin:10px"></div>').appendTo(this._guiContainer);
        // render Settings Container:
        var settingsContainer = $('<div class="row"></div>')
            .addClass("ffnet_settingsContainer")
            .appendTo(settingsWrapper);
        this.Log("Container rendered");
        // ----------- GUI -------------------------
        var spacer = $('<tr></tr>').append($('<td width="30%" style="height:10px"></td>')
            .css('border-right', '1px solid gray')).append($('<td></td>'));
        var buttonContainer = $('<div class="row ffnet_Config_Button_Container"></div>').appendTo(settingsContainer);
        var saveButtonContainer = this.GetSaveButtonContainer();
        $.each(this._categories, function (name, element) {
            self.GetButton(element.title, "ffnetConfig-" + element.name, buttonContainer);
        });
        // --------------------------------------------------------------------------------------------------------------------------
        $.each(this._categories, function (name, element) {
            self.Log("Render Category: ", element);
            var cat = self.GetCategory(element.title, "ffnetConfig-" + element.name, settingsContainer);
            element.instance = cat.category;
            self.RenderGUI(element.elements, cat.container, 6);
            cat.category.append(saveButtonContainer.clone());
        });
        // --------------------------------------------------------------------------------------------------------------------------
        this.Log("GUI - Add Markers: ", this.Config.marker);
        var storyConfigWrapper = $('<div style="margin:10px"></div>').appendTo(this._guiContainer);
        var container = $('<div class="row"></div>').appendTo(storyConfigWrapper);
        var count = 0;
        $.each(this.Config.marker, function (name, marker) {
            self.AddForm(name, marker, container);
            count++;
        });
        if (count === 0) {
            // No marker found. Add Notification:
            var infoContainer = $('<div class="ffnet-InfoContainer"></div>').appendTo(container);
            infoContainer.append('<p>' + self._('There are currently no Filter defined.') + '</p>');
            infoContainer.append($('<button class="btn btn-primary">' + self._('Create Filter') + '</button>').click(function () {
                $("#ffnet-addNewFilter").trigger("click");
            })).append('<span>&nbsp;</span>')
                .append($('<button class="btn btn-default">' + self._('Import') + '</button>').click(function () {
                $("#ffnet-ImportButton").trigger("click");
            })).append('<span>&nbsp;</span>')
                .append($('<button class="btn btn-default">' + self._('Need Help?') + '</button>').click(function () {
                var win = window.open("https://github.com/MRH4287/FFNetParser/wiki/Filter", '_blank');
                win.focus();
            }));
        }
        this.Log("GUI - Markers added");
        // --------------------------------------------------------------------------------------------------------------------------
        var filterButtonContainer = saveButtonContainer.clone();
        filterButtonContainer.appendTo(this._guiContainer);
        $('<input class="btn brn-default" id="ffnet-addNewFilter" type="button" value="' + self._('Add new Filter') + '"></input>')
            .click(function () {
            $(".ffnet-InfoContainer").fadeOut();
            self.AddForm('New-Form ' + (self._addCount++), {
                name: null,
                display: true,
                keywords: [],
                ignore: [],
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
            }, container, true // Display Big
            );
        }).appendTo(filterButtonContainer);
        $('<input class="btn btn-default" id="ffnet-ImportButton" type="button" value="' + self._('Import Filter') + '"></input>')
            .click(function (event) {
            event.preventDefault();
            // Create Dialog:
            var modal;
            var dialog = $('<div></div>')
                .append($('<textarea rows="5" cols="20" class="FilterInput"></textarea>'))
                .append($('<button class="btn">' + self._('Save') + '</button>')
                .button()
                .click(function (e) {
                e.preventDefault();
                var text = dialog.find(".FilterInput").val();
                try {
                    var newMarker = JSON.parse(text);
                    self.AddForm(newMarker.name, newMarker, container, true);
                }
                catch (error) {
                    console.error("Can't Parse JSON: " + error);
                }
                modal.modal("hide");
            })).appendTo($("body"));
            modal = GUIHandler.CreateBootstrapModal(dialog, self._("Import Filter"));
            GUIHandler.ShowModal(modal);
        }).appendTo(filterButtonContainer);
        // Save Logic
        window.setTimeout(() => {
            $(".ffnetSaveButton").click(function () {
                self.Log("Save Config");
                self.SaveAll();
                if (self.Parser.SaveConfig()) {
                    self.Log("Config Saved Successfully");
                }
                else {
                    alert("Warning: An error occured while saving your Config. Your changes may not be saved! Please check the Console for more Information.");
                }
                self.Hide();
            });
        }, 500);
        this.Log("GUI Update Complete");
    }
    /**
     *   Add a form for filter input
     *   @param name Name of the Input field
     *   @param marker Marker Config
     *   @param mainContainer Container for addition
     *   @param displayBig Don't minimize Element after adding
     */
    AddForm(name, marker, mainContainer, displayBig = false) {
        this.Log("GUI Add Form: ", name);
        var radius = 10;
        var height = '50';
        if (displayBig) {
            height = 'auto'; //580;
        }
        if (!mainContainer.is("[id]")) {
            mainContainer.attr("id", "ffnetGUIMainContainer");
        }
        var mainContainerID = mainContainer.attr("id");
        var wrapper = $('<div class="col-md-6"></div>').appendTo(mainContainer);
        var container = $('<div class="fflist-filterField"></div>')
            .css('height', height + 'px').appendTo(wrapper).hide();
        if (!displayBig) {
            container.css("cursor", "pointer")
                .attr('title', "Click to Edit")
                .click(function (e) {
                if ($(e.target).is(".ignoreClick")) {
                    return;
                }
                container.css('height', 'auto');
                container.css("cursor", "auto");
                container.removeAttr("title")
                    .unbind();
                container.find('input[type="radio"]').show();
            }).find('input[type="radio"]').hide();
        }
        var replace = new RegExp("[ /.\-]", "g");
        var UID = name.replace(replace, "");
        var foundCount = 0;
        $.each(this.Parser.FoundElemementList, (page, data) => {
            if (data[name] !== undefined) {
                foundCount += data[name].length;
            }
        });
        var quickInfo = this._("Name") + ": " + marker.name + " - " +
            this._('Enabled') + ": " + (marker.enabled === false ? this._("No") : this._("Yes")) + " - " +
            this._("Display Entries") + ": " + (marker.display ? this._("Yes") : this._("No")) + " - " +
            this._("Priority") + ": " + marker.priority + " - " +
            this._("Number of founds on all visible pages") + ": " + foundCount;
        var guiContainer = $('<div class="row"></div>').appendTo(container);
        var self = this;
        this.RegisterGUI(name, function () { return self.Config.marker[name]; }, [
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: name,
                value: undefined,
                customOptions: function (el) {
                    el.find(".panel-heading").append($('<a tabindex="0"  class="ignoreClick pull-right btn btn-default" role="button" data-toggle="popover" title="Quick Info" data-trigger="focus" data-placement="top" style="margin-top:-8px">Info</a>')
                        .attr("data-container", "#" + mainContainerID)
                        .popover({
                        content: quickInfo
                    }));
                }
            },
            {
                name: 'name',
                type: GUIElementType.Input,
                label: self._('Name'),
                value: function () {
                    return name;
                },
                attributes: {
                    size: 50
                }
            },
            {
                name: 'enabled',
                type: GUIElementType.Checkbox,
                label: self._('Enabled'),
                value: function () {
                    if (marker.enabled === undefined) {
                        return true;
                    }
                    return marker.enabled;
                }
            },
            {
                name: 'display',
                type: GUIElementType.Checkbox,
                label: self._('Display Found Entries'),
                value: function () {
                    return marker.display;
                }
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: name,
                value: undefined
            },
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: self._("Search"),
                value: undefined
            },
            {
                name: 'keywords',
                type: GUIElementType.Input,
                label: self._('Keywords'),
                value: function () {
                    return marker.keywords.join(', ');
                },
                result: function (element) {
                    return element.val().split(", ");
                },
                attributes: {
                    size: 50
                },
                customOptions: function (input) {
                    input.parent().append('<br><span style="font-size: small;">' + self._('Separated by ", "') + '</span>');
                }
            },
            {
                name: 'ignore',
                type: GUIElementType.Input,
                label: self._('Ignore when'),
                value: function () {
                    return marker.ignore.join(', ');
                },
                result: function (element) {
                    return element.val().split(", ");
                },
                attributes: {
                    size: 50
                },
                customOptions: function (input) {
                    input.parent().append('<br><span style="font-size: small;">' + self._('Separated by ", "') + '</span>');
                }
            },
            {
                name: 'search_story',
                type: GUIElementType.Checkbox,
                value: function () {
                    return marker.search_story;
                },
                label: self._('Search in Stories')
            },
            {
                name: 'keep_searching',
                type: GUIElementType.Checkbox,
                value: function () {
                    return marker.keep_searching;
                },
                label: self._('Keep Searching')
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: self._("Search"),
                value: undefined
            },
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: self._("Priority"),
                value: undefined
            },
            {
                name: 'priority',
                type: GUIElementType.Custom,
                label: self._("Priority"),
                customElement: function (data) {
                    var container = $('<div></div>');
                    var elementContainer;
                    var label;
                    var element;
                    for (var i = 1; i <= 5; i++) {
                        label = $('<label class="radio-inline"></label>').appendTo(container);
                        element = $('<input type="radio"></input>')
                            .attr("name", "ffnet-" + UID + "-priority")
                            .attr("id", "ffnet-" + UID + "-priority-" + i)
                            .attr("value", i)
                            .appendTo(label);
                        label.append(i);
                        if (data.value() === i) {
                            element.prop("checked", true);
                        }
                    }
                    // Custom:
                    label = $('<label class="radio-inline"></label>').appendTo(container);
                    element = $('<input type="radio"></input>')
                        .attr("name", "ffnet-" + UID + "-priority")
                        .attr("id", "ffnet-" + UID + "-priority-Custom")
                        .attr("value", -1)
                        .appendTo(label);
                    label.append(self._("Custom"));
                    if (data.value() === -1) {
                        element.prop("checked", true);
                    }
                    container.find("input").change(function (e) {
                        var currentSelected = $(this).parent().find("input").filter(":checked");
                        if (currentSelected.length === 0) {
                            console.warn("There should be something selected ... :/");
                        }
                        else {
                            if (Number(currentSelected.val()) === -1) {
                                $("#ffnet-" + UID + "-customPriorityCotainer").show();
                            }
                            else {
                                $("#ffnet-" + UID + "-customPriorityCotainer").hide();
                            }
                        }
                    });
                    return container;
                },
                result: function (el) {
                    // Not used!
                    return null;
                },
                value: function () {
                    return marker.priority;
                }
            },
            {
                name: "customPriority",
                type: GUIElementType.Custom,
                label: self._("Custom Priority"),
                customElement: function (data) {
                    var defaultValues = {
                        background: 1,
                        color: 1,
                        highlight_color: 1,
                        mouseOver: 1,
                        text_color: 1
                    };
                    var value = data.value();
                    if ((typeof (value) === "undefined") || (value === null)) {
                        value = defaultValues;
                    }
                    else {
                        $.each(value, function (name, element) {
                            if ((typeof (element) === "undefined") || (element === null)) {
                                value[name] = defaultValues[name];
                            }
                        });
                    }
                    var mainContainer = $('<div></div>')
                        .attr("id", "ffnet-" + UID + "-customPriorityCotainer");
                    if (marker.priority !== -1) {
                        mainContainer.hide();
                    }
                    var options = {
                        color: self._("Color"),
                        mouseOver: self._("Mouse Over Color"),
                        text_color: self._("Info Text Color"),
                        highlight_color: self._("Highlight Color"),
                        background: self._("Background Image")
                    };
                    $.each(options, function (name, description) {
                        $('<div style="margin-top:5px"></div>')
                            .text(description + ": ")
                            .appendTo(mainContainer);
                        var container = $('<div ></div>').appendTo(mainContainer);
                        var elementContainer;
                        var label;
                        var element;
                        for (var i = 0; i <= 5; i++) {
                            label = $('<label class="radio-inline"></label>').appendTo(container);
                            element = $('<input type="radio"></input>')
                                .attr("name", "ffnet-" + UID + "-customPrioritry-" + name)
                                .attr("id", "ffnet-" + UID + "-customPrioritry-" + name + i)
                                .attr("data-priorityName", name)
                                .attr("value", i)
                                .appendTo(label);
                            label.append((i !== 0) ? i : self._("Disable"));
                            if (value[name] === i) {
                                element.prop("checked", true);
                            }
                        }
                    });
                    return mainContainer;
                },
                result: function (el) {
                    // Not used!
                },
                value: function () {
                    return marker.customPriority;
                }
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: self._("Priority"),
                value: undefined
            },
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: self._("Color"),
                value: undefined
            },
            {
                name: 'ignoreColor',
                type: GUIElementType.Checkbox,
                label: self._('Ignore Color Settings'),
                value: function () {
                    return marker.ignoreColor;
                },
                customOptions: function (checkbox) {
                    var check = function () {
                        if (checkbox.is(":checked")) {
                            $('#fflist-' + UID + '-color')
                                .add('#fflist-' + UID + '-mouseOver')
                                .add('#fflist-' + UID + '-text_color')
                                .attr("disabled", "disabled");
                        }
                        else {
                            $('#fflist-' + UID + '-color')
                                .add('#fflist-' + UID + '-mouseOver')
                                .add('#fflist-' + UID + '-text_color')
                                .removeAttr("disabled");
                        }
                    };
                    checkbox.change(function () {
                        check();
                    });
                    window.setTimeout(check, 10);
                }
            },
            {
                name: 'color',
                type: GUIElementType.Color,
                value: function () {
                    return marker.color;
                },
                label: self._('Color'),
                attributes: {
                    id: 'fflist-' + UID + '-color'
                }
            },
            {
                name: 'mouseOver',
                type: GUIElementType.Color,
                value: function () {
                    return marker.mouseOver;
                },
                label: self._('Mouse Over Color'),
                attributes: {
                    id: 'fflist-' + UID + '-mouseOver'
                }
            },
            {
                name: 'text_color',
                type: GUIElementType.Color,
                value: function () {
                    return marker.text_color;
                },
                label: self._('Info Text Color'),
                attributes: {
                    id: 'fflist-' + UID + '-text_color'
                }
            },
            {
                name: 'highlight_color',
                type: GUIElementType.Color,
                value: function () {
                    return marker.highlight_color;
                },
                label: self._('Highlight Color'),
                attributes: {
                    id: 'fflist-' + UID + '-highlight_color'
                },
                debugOnly: true
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: self._("Color"),
                value: undefined
            },
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: self._("Layout"),
                value: undefined
            },
            {
                name: 'background',
                type: GUIElementType.Input,
                value: function () {
                    return marker.background;
                },
                label: self._('Background Image')
            },
            {
                name: 'mark_chapter',
                type: GUIElementType.Checkbox,
                value: function () {
                    return marker.mark_chapter;
                },
                label: self._('Mark Chapter')
            },
            {
                name: 'print_story',
                type: GUIElementType.Checkbox,
                value: function () {
                    return marker.print_story;
                },
                label: self._('List Stories')
            },
            {
                name: 'mention_in_headline',
                type: GUIElementType.Checkbox,
                value: function () {
                    return marker.mention_in_headline;
                },
                label: self._('Mention in Headline')
            },
            {
                name: 'image',
                type: GUIElementType.Input,
                value: function () {
                    return marker.image;
                },
                label: self._('Info Image'),
                customOptions: (el) => {
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
                        .attr("src", self.Parser.Api.GetUrl("none.gif"))
                        .appendTo(container)
                        .attr("title", self._("Clear Selection"))
                        .click(function () {
                        el.val("");
                    });
                    for (var i = 1; i <= 6; i++) {
                        image.clone()
                            .attr("src", self.Parser.Api.GetUrl(i + ".gif"))
                            .appendTo(container)
                            .attr("title", self._("Click to select this Image"))
                            .click(function () {
                            el.val($(this).attr("src"));
                        });
                    }
                }
            },
            {
                name: 'note',
                type: GUIElementType.Input,
                value: function () {
                    return marker.note;
                },
                label: self._('Note'),
                debugOnly: true
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: self._("Layout"),
                value: undefined
            },
            {
                name: '',
                type: GUIElementType.Button,
                value: function () {
                    return self._('Remove');
                },
                label: '',
                customOptions: function (el) {
                    el.removeClass("btn-default").addClass("btn-danger");
                },
                callback: function () {
                    self._guiData[name].instances['name'].val('');
                    container.fadeOut(function () {
                        container.remove();
                    });
                }
            },
            {
                name: '',
                type: GUIElementType.Custom,
                value: function () {
                    return '';
                },
                result: function () {
                    return null;
                },
                label: '',
                customElement: function () {
                    var elementContainer = $('<div class="row"></div>');
                    $('<div class="col-md-4"></div>').appendTo(elementContainer).append($('<img style="margin-bottom: 10px" src="' + self.Parser.Api.GetUrl('glyphicons_369_collapse_top.png') + '" alt="' + self._('Minimize') + '"></img>').click(function () {
                        container
                            .unbind()
                            .css("cursor", "pointer")
                            .css("height", "50px")
                            .attr('title', "Click to Edit");
                        container.find('input[type="radio"]').hide();
                        setTimeout(function () {
                            container.click(function (e) {
                                if ($(e.target).is(".ignoreClick")) {
                                    return;
                                }
                                container.css('height', 'auto');
                                container.css("cursor", "auto");
                                container.removeAttr("title");
                                container.find('input[type="radio"]').show();
                            });
                        }, 100);
                    }).css("cursor", "pointer"));
                    $('<div class="col-md-4 col-md-offset-4"></div>').appendTo(elementContainer).append($('<button class="btn btn-default">' + self._('Export') + '</button>')
                        .click(function (event) {
                        event.preventDefault();
                        // Create Dialog:
                        var modal = GUIHandler.CreateBootstrapModal($("<pre></pre>").text(JSON.stringify(marker)), self._("Export Data for Element: ") + marker.name);
                        GUIHandler.ShowModal(modal);
                    }));
                    return elementContainer;
                }
            }
        ], false, function (data) {
            if (typeof (self.Config.marker[data.name]) !== "undefined") {
                delete self.Config.marker[data.name];
            }
            var name = data.instances['name'].val();
            if (name === "") {
                return;
            }
            // Priority:
            var priority = 1;
            var selectedPriority = data.instances['priority'].find(":checked");
            priority = Number(selectedPriority.val());
            // CustomPriority
            var customPriority = {
                color: null,
                background: null,
                highlight_color: null,
                mouseOver: null,
                text_color: null
            };
            var el = data.instances['customPriority'];
            $.each(customPriority, function (name, _) {
                var elements = el.find('[data-priorityName="' + name + '"]');
                if (elements.length === 0) {
                    console.warn("Can't find Elements for Priority:", name, el);
                }
                else {
                    customPriority[name] = Number(elements.filter(":checked").val());
                }
                if (customPriority[name] === null || typeof (customPriority[name]) === "undefined" || customPriority[name] === NaN || customPriority[name] < 0) {
                    customPriority[name] = 1;
                }
            });
            // ....
            var config = {
                name: name,
                enabled: data.instances['enabled'].is(':checked'),
                color: data.instances['color'].find('input').val(),
                ignore: data.instances['ignore'].val().split(', '),
                keywords: data.instances['keywords'].val().split(', '),
                mark_chapter: data.instances['mark_chapter'].is(':checked'),
                mention_in_headline: data.instances['mention_in_headline'].is(':checked'),
                display: data.instances['display'].is(':checked'),
                mouseOver: data.instances['mouseOver'].find('input').val(),
                print_story: data.instances['print_story'].is(':checked'),
                search_story: data.instances['search_story'].is(':checked'),
                keep_searching: data.instances['keep_searching'].is(':checked'),
                ignoreColor: data.instances['ignoreColor'].is(':checked'),
                background: data.instances['background'].val(),
                text_color: data.instances['text_color'].find('input').val(),
                image: (typeof (data.instances['image']) !== "undefined") ? data.instances['image'].val() : null,
                note: (typeof (data.instances['note']) !== "undefined") ? data.instances['note'].val() : null,
                priority: priority,
                customPriority: customPriority,
                highlight_color: (typeof (data.instances['highlight_color']) !== "undefined") ? data.instances['highlight_color'].find('input').val() : null,
                revision: ((typeof (self.Config.marker[name]) === "undefined") || (typeof (self.Config.marker[name].revision) === "undefined")) ? 0 : self.Config.marker[name].revision + 1
            };
            if (config.text_color === "") {
                config.text_color = "#686868";
            }
            if (self.DEBUG) {
                console.log("Filter '" + name + "' saved: ", config);
            }
            self.Config.marker[name] = config;
        });
        this.RenderGUIElement(name, guiContainer, 12);
        container.slideDown();
        this.Log("Form added");
    }
    /**
     *   Hides the GUI
     */
    Hide() {
        $(".modal-backdrop").remove();
        $(this._bootstrapContainer).modal('hide');
        this._bootstrapContainer.remove();
        this._bootstrapContainer = null;
        this._guiContainer = null;
    }
    /**
     *   Displays the GUI
     */
    Show(closeCallback = null) {
        if (closeCallback !== null) {
            this._bootstrapContainer.on('hide.bs.modal', function (e) {
                closeCallback();
            });
        }
        GUIHandler.ShowModal(this._bootstrapContainer);
    }
    /**
     *   Creates and displays the GUI
     */
    Gui() {
        this.InitGUI();
        if (this._guiContainer == null || this._bootstrapContainer) {
            this.GuiCreate();
        }
        this.Update();
        this.Show();
    }
    /**
     *   Open "Save Config" Sub-menu
     */
    OpenSaveConfig() {
        if (this._guiContainer == null) {
            this.GuiCreate();
        }
        var self = this;
        if (this._guiContainer.is(':visible')) {
            // Currently Visible, reopen
            this.Hide();
            this.OpenSaveConfig();
        }
        else {
            this._guiContainer.html('');
            var panelMain = $('<div id="importPanel" class="panel-group" role="rablist" aria-multiselectable="true"></div>').appendTo(this._guiContainer);
            // -------- Manual Import -------------
            var panel = $('<div class="panel panel-default"></div>').appendTo(panelMain);
            panel.append($('<div class="panel-heading" role="tab" ></div>').append($('<h4 class="panel-title"></h4>').append($('<a data-toggle="collapse" data-parent="#importPanel" href="#manualInport" aria-expanded="true" aria-controls="collapseOne"></a>').text(this._("Manual Import")))));
            var panelContainer = $('<div id="manualInport" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne"></div>').appendTo(panel);
            var manualContainer = $('<div class="panel-body"></div>').appendTo(panelContainer);
            manualContainer.append('<label for="ffnet-config-display">Your current Config:</label><br/>');
            var old = $('<textarea id="ffnet-config-display" style="width:90%; height: 100px;"></textarea>')
                .val(this.Parser.GetConfig())
                .appendTo(manualContainer);
            manualContainer.append('<br/><label for="ffnet-config-set">Import Config:</label><br/>');
            var neu = $('<textarea id="ffnet-config-set" style="width:90%; height: 100px;"></textarea>')
                .appendTo(manualContainer);
            manualContainer.append($('<input class="btn" type="button" value="' + self._('Set') + '" />')
                .click(function () {
                self.Parser.SetConfig(neu.val());
                self.Hide();
                self.Parser.ReadAll();
            }));
            // ----------- Github API -------------
            panel = $('<div class="panel panel-default"></div>').appendTo(panelMain);
            panel.append($('<div class="panel-heading" role="tab" ></div>').append($('<h4 class="panel-title"></h4>').append($('<a data-toggle="collapse" data-parent="#importPanel" href="#githubInport" aria-expanded="true" aria-controls="collapseOne"></a>').text(this._("Github Gist")))));
            panelContainer = $('<div id="githubInport" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne"></div>').appendTo(panel);
            var githubContainer = $('<div class="panel-body"></div>').appendTo(panelContainer);
            var gistInfo = null;
            var gistSelect = $('<select style="margin-top:5px; margin-bottom:10px"></select>').prop("disabled", true);
            var selectedGist = null;
            var authButton = $('<button class="btn btn-primary">Start</button>')
                .click(() => {
                this.Parser.GithubAPi.Auth(() => {
                    authButton.text("Success!");
                    authButton.prop("disabled", true);
                    this.Parser.GithubAPi.GetGists((data) => {
                        gistInfo = data;
                        $.each(gistInfo, (i, el) => {
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
                .append($('<table width="100%" cellpadding="5"></table>').append($('<tbody style="font-size:small"></tbody>')
                .append($("<tr></tr>")
                .append("<th>" + this._('ID') + "</th>")
                .append(infoId)).append($("<tr></tr>")
                .append("<th>" + this._('Description') + "</th>")
                .append(infoDescription)).append($("<tr></tr>")
                .append("<th>" + this._('Owner') + "</th>")
                .append(infoOwner)).append($("<tr></tr>")
                .append("<th>" + this._('Public') + "</th>")
                .append(infoPublic)).append($("<tr></tr>")
                .append("<th>" + this._('Files') + "</th>")
                .append(infoFiles)).append($("<tr></tr>")
                .append("<th>" + this._('Url') + "</th>")
                .append(infoUrl)).append($("<tr></tr>")
                .append("<th>" + this._('Valid') + "</th>")
                .append(infoValid))));
            var gistChangeCallback = () => {
                var currentID = gistSelect.val();
                var info = null;
                $.each(gistInfo, (i, el) => {
                    if (el.id.toString() === currentID) {
                        info = el;
                        return;
                    }
                });
                if (info === null) {
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
            gistSelect.change((e) => {
                e.preventDefault();
                gistChangeCallback();
            });
            // ----------- Create New Gist --------------
            var newGistContainer = [];
            var descriptionInput = $('<input id="githubGistDescription" type="text" value="Fanfiction Story Parser Config"/>');
            var isPublicInput = $('<input id="githubGistPublic" type="checkbox">');
            newGistContainer.push($("<tr></tr>")
                .append("<th>3. Insert Information</th>")
                .append(($("<td></td>").append('<label for="githubGistDescription">' + this._('Description') + ': </label>').append(descriptionInput)
                .append('<label for="githubGistDescription">' + this._('Public') + ': </label>').append(isPublicInput))));
            newGistContainer.push($("<tr></tr>")
                .append("<th>4. Send</th>")
                .append(($("<td></td>").append($('<button class="btn btn-primary">' + this._('Create Gist') + '</button>').
                click((e) => {
                e.preventDefault();
                if (confirm("Do you want to save your Config to Github?")) {
                    this.Parser.GithubAPi.CreateNewConfigGist(descriptionInput.val(), isPublicInput.is(":checked"), (data) => {
                        if (confirm("Config Uploaded. Do you want to look at it on Github?")) {
                            window.open("https://gist.github.com/" + data.owner + "/" + data.id);
                        }
                    });
                }
            })))));
            // ------------  Import / Update ------------
            var importUpdateContainer = [];
            importUpdateContainer.push($("<tr></tr>")
                .append("<th>3. Select Gist</th>")
                .append(($("<td></td>").append(gistSelect))));
            importUpdateContainer.push($("<tr></tr>")
                .append("<th></th>")
                .append($("<td></td>").append(gistDataContainer)));
            importUpdateContainer.push($("<tr></tr>")
                .append("<th>4. Select Option</th>")
                .append($("<td></td>")
                .append(importButton)
                .append(updateButton)));
            importButton.click((e) => {
                e.preventDefault();
                if (typeof (selectedGist) !== "undefined" && selectedGist !== null) {
                    if (confirm("Do you realy want to overwrite your local config with the one from Github? Everything will be lost!")) {
                        this.Parser.GithubAPi.GetConfig(selectedGist.id, (externalConfig) => {
                            var newConfig = JSON.parse(externalConfig);
                            this.Log("New Config: ", newConfig);
                            this.Parser.Config = newConfig;
                            this.Parser.SaveConfig(true);
                            alert("Config loaded!");
                        });
                    }
                }
                else {
                    alert("Select a Gist from the List first!");
                }
            });
            updateButton.click((e) => {
                e.preventDefault();
                if (typeof (selectedGist) !== "undefined" && selectedGist !== null) {
                    if (confirm("Do you want to save your Config to Github?")) {
                        this.Parser.GithubAPi.UpdateConfigGist(selectedGist.id, (data) => {
                            if (confirm("Config Uploaded. Do you want to look at it on Github?")) {
                                window.open("https://gist.github.com/" + data.owner + "/" + data.id);
                            }
                        });
                    }
                }
                else {
                    alert("Select a Gist from the List first!");
                }
            });
            //--------------------------------------------------
            var createGistButton = $('<button class="btn">' + this._('Create new Gist') + '</button>').click((e) => {
                e.preventDefault();
                $.each(newGistContainer, (i, el) => {
                    el.show();
                });
                $.each(importUpdateContainer, (i, el) => {
                    el.hide();
                });
            }).prop("disabled", true);
            var updateOrImportFromGistButton = $('<button class="btn">' + this._('Update or Import from Gist') + '</button>').click((e) => {
                e.preventDefault();
                $.each(newGistContainer, (i, el) => {
                    el.hide();
                });
                $.each(importUpdateContainer, (i, el) => {
                    el.show();
                });
            }).prop("disabled", true);
            var tbody = $("<tbody></tbody>")
                .append($("<tr></tr>")
                .append("<th>1. Authenticate</th>")
                .append($("<td></td>").append(authButton))).append($("<tr></tr>")
                .append("<th>2. Choose Option</th>")
                .append($("<td></td>")
                .append(createGistButton).append(updateOrImportFromGistButton)));
            $.each(newGistContainer, (i, el) => {
                el.hide();
                tbody.append(el);
            });
            $.each(importUpdateContainer, (i, el) => {
                el.hide();
                tbody.append(el);
            });
            $('<table width="100%" cellpadding="5" cellspacing="5"></table>').appendTo(githubContainer)
                .append(tbody);
            // --- Call the Accordion Script ---
            panelMain.collapse();
            this.Show();
        }
    }
    /**
     *   Open or closes the GUI for the Story Config
     *   @param storyInfo Infos about the story
     *   @param managePresets Should the option to edit Presets be displayed
     */
    ToggleStoryConfig(storyInfo, managePresets = false) {
        var self = this;
        if (this._guiContainer == null) {
            if (this.DEBUG) {
                console.log("Generate GUI Container");
            }
            this.GuiCreate();
        }
        if (this._guiContainer.is(':visible')) {
            if (this.DEBUG) {
                console.log("Hide GUI Container");
            }
            this.Hide();
        }
        else {
            if (typeof (storyInfo) === "undefined") {
                if (this.DEBUG) {
                    console.warn("toggleStoryConfig: No Parameter given!");
                }
                return;
            }
            if (this.DEBUG) {
                console.log("Starting Content Generation");
            }
            this._guiContainer.html('');
            var saveButton = $('<button class="saveButton btn btn-warning">' + self._('Save') + '</button>');
            // Manage Presets:
            var presetElementContainer = $("<div></div>");
            var presetContainer = $('<div></div>').append(presetElementContainer);
            var customElementContainer = $('<div></div>');
            var customContainer = $('<div></div>').append(customElementContainer);
            if (!managePresets) {
                presetContainer.hide();
            }
            else {
                customContainer.hide();
            }
            $('<div class="ffnet-HighlighterHeadline">' + self._('Manage Presets') + '</div>')
                .click((e) => {
                e.preventDefault();
                if (presetContainer.is(":visible")) {
                    presetContainer.slideUp();
                    customContainer.slideDown();
                }
                else {
                    presetContainer.slideDown();
                    customContainer.slideUp();
                }
            })
                .appendTo(this._guiContainer);
            $.each(this.Config.highlighterPrefabs, (name, el) => {
                this.AddHighlighterForm(name, el, presetElementContainer, false, false);
            });
            presetContainer.append($('<div style="margin-top: 10px; text-align:center"></div>')
                .append($('<button class="btn btn-primary">' + self._('Add new Preset') + '</button>').
                click((e) => {
                e.preventDefault();
                var name = "NewHighlighter-" + (this._addCount++);
                this.AddHighlighterForm(name, {
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
                }, presetElementContainer, false, true);
            })).append(saveButton.clone()));
            this._guiContainer.append(presetContainer);
            $('<div class="ffnet-HighlighterHeadline">' + self._('Custom Config') + '</div>')
                .click((e) => {
                e.preventDefault();
                if (!customContainer.is(":visible")) {
                    presetContainer.slideUp();
                    customContainer.slideDown();
                }
                else {
                    presetContainer.slideDown();
                    customContainer.slideUp();
                }
            })
                .appendTo(this._guiContainer);
            this._guiContainer.append(customContainer);
            customContainer.append($('<div style="margin-top: 10px; text-align:center"></div>').append(saveButton.clone()));
            var highlighterKey = this.Config.highlighter_use_storyID ? storyInfo.id : storyInfo.url;
            var usedData;
            if (typeof (this.Config.highlighter[highlighterKey]) === "undefined" || this.Config.highlighter[highlighterKey].custom === null) {
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
            else {
                usedData = this.Config.highlighter[highlighterKey].custom;
            }
            this.AddHighlighterForm(highlighterKey, usedData, customElementContainer, true, true);
            if (managePresets) {
                customContainer.append("<p><strong>" + self._("In order to active the Custom Options, you have to click on the Button 'Custom' in the Drop-down List") + "</strong></p>");
            }
            this.Log("Display Content");
            this.Show();
            window.setTimeout(() => {
                $(".saveButton").click((e) => {
                    e.preventDefault();
                    this.SaveAll();
                    this.Parser.SaveConfig();
                    this._guiContainer.css("position", "absolute");
                    this.Hide();
                    this.Parser.ReadAll();
                    this.Parser.EnableInStoryHighlighter();
                });
            }, 500);
        }
    }
    /**
     *   Shows the Highlighter Prefab Config
     *   @param storyInfo Infos about the story
     */
    ShowStoryPrefabList(storyInfo) {
        var self = this;
        var lastID = Number($(".ffnet-HighlighterContainer").attr("data-elementident"));
        var currentID = Number(storyInfo.element.attr("data-elementident"));
        $(".ffnet-HighlighterContainer").remove();
        if (lastID === currentID) {
            return;
        }
        var container = $('<div class="ffnet-HighlighterContainer"></div>').appendTo($("body"));
        container.position({ of: storyInfo.element.find(".context-menu"), my: "right top", at: "right bottom", collision: "flip flip" })
            .attr("data-elementident", currentID);
        var listContainer = $('<div class="ffNet-HighlighterListContainer"></div>').appendTo(container);
        // Add Element:
        var highlighterKey = self.Config.highlighter_use_storyID ? storyInfo.id : storyInfo.url;
        var selectElement = (name) => {
            $(".ffnet-HighlighterContainer").remove();
            if (typeof (this.Config.highlighter[highlighterKey]) === "undefined") {
                this.Config.highlighter[highlighterKey] =
                    {
                        custom: null,
                        hide: null,
                        image: null,
                        prefab: null
                    };
            }
            this.Config.highlighter[highlighterKey].prefab = name;
            this.Parser.SaveConfig();
            this.Parser.Read(storyInfo.element.parent());
            this.Parser.EnableInStoryHighlighter();
        };
        $.each(this.Config.highlighterPrefabs, (name, data) => {
            var element = $('<div class="ffnet-HighlighterListElement"></div>')
                .append($('<div class="color"></div>')
                .css("background-color", data.highlight_color))
                .append($('<div class="name" ></div >')
                .text(name))
                .click((e) => {
                e.preventDefault();
                selectElement(name);
            })
                .appendTo(listContainer);
            if (typeof (this.Config.highlighter[highlighterKey]) !== "undefined" && this.Config.highlighter[highlighterKey].prefab === name) {
                element.addClass("selected");
            }
        });
        var color = "gray";
        if (typeof (this.Config.highlighter[highlighterKey]) !== "undefined" &&
            typeof (this.Config.highlighter[highlighterKey].custom) !== "undefined" &&
            this.Config.highlighter[highlighterKey].custom !== null) {
            color = this.Config.highlighter[highlighterKey].custom.highlight_color;
        }
        var customElement = $('<div class="ffnet-HighlighterListElement"></div>').append($('<div class="color">')
            .css("background-color", color))
            .append($('</div><div class="name">Custom</div>')).click(function (ev) {
            ev.preventDefault();
            $(".ffnet-HighlighterContainer").remove();
            if (typeof (self.Config.highlighter[highlighterKey]) !== "undefined") {
                self.Config.highlighter[highlighterKey].prefab = "";
            }
            self.ToggleStoryConfig(storyInfo, false);
        }).appendTo(listContainer);
        if (typeof (this.Config.highlighter[highlighterKey]) !== "undefined" &&
            (typeof (this.Config.highlighter[highlighterKey].prefab) === "undefined" || this.Config.highlighter[highlighterKey].prefab === null ||
                this.Config.highlighter[highlighterKey].prefab === "" || this.Config.highlighter[highlighterKey].prefab === " ") &&
            typeof (this.Config.highlighter[highlighterKey].custom) !== "undefined" && this.Config.highlighter[highlighterKey].custom !== null) {
            customElement.addClass("selected");
        }
        $('<div class="ffnet-HighlighterListElement"></div>').append($('<div class="color">X</div>')
            .css("background-color", "red")
            .css("text-align", "center"))
            .append($('<div class="name" style="top:0px">Reset</div>')).click(function (ev) {
            ev.preventDefault();
            $(".ffnet-HighlighterContainer").remove();
            if (typeof (self.Config.highlighter[highlighterKey]) !== "undefined") {
                if (confirm(self._("Do you really want to remove this Highlighter?"))) {
                    delete self.Config.highlighter[highlighterKey];
                    self.Parser.SaveConfig();
                    self.Parser.Read(storyInfo.element.parent());
                    self.Parser.EnableInStoryHighlighter();
                }
            }
            else {
                alert(self._("There is nothing to reset. To close the box, just click on the Edit Icon again"));
            }
        }).appendTo(listContainer);
        listContainer.append("<hr />")
            .append($('<div class="ffnet-HighlighterListElement" style="padding-top: 5px; text-align:center">' + self._('Customize Settings') + '</div>')
            .click(function (ev) {
            ev.preventDefault();
            $(".ffnet-HighlighterContainer").remove();
            self.ToggleStoryConfig(storyInfo, true);
        }));
    }
    /**
     *   Add a form for Highlighter input
     *   @param name Name of the Input field
     *   @param config Highlighter Config
     *   @param mainContainer Container for addition
     *   @param Custom Add Element for the Custom Element
     *   @param displayBig Don't minimize Element after adding
     */
    AddHighlighterForm(name, config, mainContainer, custom, displayBig = false) {
        var self = this;
        this.Log("Highlighter Add Form: ", name);
        var radius = 10;
        var height = '50';
        if (displayBig) {
            height = 'auto'; //580;
        }
        var replace = new RegExp("[ /.\-]", "g");
        var UID = name.replace(replace, "");
        var container = $('<div class="fflist-filterField"></div>')
            .css('height', height + 'px')
            .appendTo(mainContainer)
            .hide();
        if (!displayBig) {
            container.css("cursor", "pointer")
                .attr('title', self._("Click to Edit"))
                .click(function () {
                container.css('height', 'auto');
                container.css("cursor", "auto");
                container.removeAttr("title")
                    .unbind();
            });
        }
        var highlightContainer = $('<div></div>').appendTo(container);
        this.RegisterGUI(name, () => {
            if (!custom) {
                if (typeof (this.Config.highlighterPrefabs[name]) === "undefined") {
                    return {};
                }
                else {
                    return this.Config.highlighterPrefabs[name];
                }
            }
            else {
                if (typeof (this.Config.highlighter[name].custom) === "undefined") {
                    return {};
                }
                else {
                    return this.Config.highlighter[name].custom;
                }
            }
        }, [
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: name,
                value: undefined
            },
            {
                name: 'name',
                type: GUIElementType.Input,
                label: self._("Name"),
                value: function () {
                    return name;
                },
                attributes: {
                    size: 50
                },
                customOptions: (el) => {
                    if (custom) {
                        el.prop("disabled", true)
                            .attr("title", self._("This field can't be changed"));
                    }
                }
            },
            {
                name: 'display',
                type: GUIElementType.Checkbox,
                label: self._('Display Found Entries'),
                value: function () {
                    return config.display;
                }
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: name,
                value: undefined
            },
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: self._("Priority"),
                value: undefined
            },
            {
                name: 'priority',
                type: GUIElementType.Custom,
                label: self._("Priority"),
                customElement: function (data) {
                    var container = $('<div class="form-horizontal"></div>');
                    var elementContainer;
                    var label;
                    var element;
                    for (var i = 1; i <= 5; i++) {
                        label = $('<label class="radio-inline"></label>').appendTo(container);
                        element = $('<input type="radio"></input>')
                            .attr("name", "ffnet-" + UID + "-priority")
                            .attr("id", "ffnet-" + UID + "-priority-" + i)
                            .attr("value", i)
                            .appendTo(label);
                        label.append(i);
                        if (data.value() === i) {
                            element.prop("checked", true);
                        }
                    }
                    // Custom:
                    label = $('<label class="radio-inline"></label>').appendTo(container);
                    element = $('<input type="radio"></input>')
                        .attr("name", "ffnet-" + UID + "-priority")
                        .attr("id", "ffnet-" + UID + "-priority-Custom")
                        .attr("value", -1)
                        .appendTo(label);
                    label.append(self._("Custom"));
                    if (data.value() === -1) {
                        element.prop("checked", true);
                    }
                    container.find("input").change(function (e) {
                        var currentSelected = $(this).parent().find("input").filter(":checked");
                        if (currentSelected.length === 0) {
                            console.warn("There should be something selected ... :/");
                        }
                        else {
                            if (Number(currentSelected.val()) === -1) {
                                $("#ffnet-" + UID + "-customPriorityCotainer").slideDown();
                            }
                            else {
                                $("#ffnet-" + UID + "-customPriorityCotainer").slideUp();
                            }
                        }
                    });
                    return container;
                },
                result: function (el) {
                    // Not used!
                    return null;
                },
                value: function () {
                    return config.priority;
                }
            },
            {
                name: "customPriority",
                type: GUIElementType.Custom,
                label: self._("Custom Priority"),
                customElement: function (data) {
                    var defaultValues = {
                        background: 1,
                        color: 1,
                        highlight_color: 1,
                        mouseOver: 1,
                        text_color: 1
                    };
                    var value = data.value();
                    if ((typeof (value) === "undefined") || (value === null)) {
                        value = defaultValues;
                    }
                    else {
                        $.each(value, function (name, element) {
                            if ((typeof (element) === "undefined") || (element === null)) {
                                value[name] = defaultValues[name];
                            }
                        });
                    }
                    var mainContainer = $('<div></div>')
                        .attr("id", "ffnet-" + UID + "-customPriorityCotainer");
                    if (config.priority !== -1) {
                        mainContainer.hide();
                    }
                    var options = {
                        color: self._("Color"),
                        mouseOver: self._("Mouse Over Color"),
                        text_color: self._("Info Text Color"),
                        highlight_color: self._("Highlight Color"),
                        background: self._("Background Image")
                    };
                    $.each(options, function (name, description) {
                        $('<div style="margin-top:5px"></div>')
                            .text(description + ": ")
                            .appendTo(mainContainer);
                        var container = $('<div ></div>').appendTo(mainContainer);
                        var elementContainer;
                        var label;
                        var element;
                        for (var i = 0; i <= 5; i++) {
                            label = $('<label class="radio-inline"></label>').appendTo(container);
                            element = $('<input type="radio"></input>')
                                .attr("name", "ffnet-" + UID + "-customPrioritry-" + name)
                                .attr("id", "ffnet-" + UID + "-customPrioritry-" + name + i)
                                .attr("data-priorityName", name)
                                .attr("value", i)
                                .appendTo(label);
                            label.append((i !== 0) ? i : self._("Disable"));
                            if (value[name] === i) {
                                element.prop("checked", true);
                            }
                        }
                    });
                    return mainContainer;
                },
                result: function (el) {
                    // Not used!
                },
                value: function () {
                    return config.customPriority;
                }
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: self._("Priority"),
                value: undefined
            },
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: self._("Color"),
                value: undefined
            },
            {
                name: 'ignoreColor',
                type: GUIElementType.Checkbox,
                label: self._('Ignore Color Settings'),
                value: function () {
                    return config.ignoreColor;
                },
                customOptions: function (checkbox) {
                    var check = function () {
                        if (checkbox.is(":checked")) {
                            $('#fflist-' + UID + '-color')
                                .add('#fflist-' + UID + '-mouseOver')
                                .add('#fflist-' + UID + '-text_color')
                                .attr("disabled", "disabled");
                        }
                        else {
                            $('#fflist-' + UID + '-color')
                                .add('#fflist-' + UID + '-mouseOver')
                                .add('#fflist-' + UID + '-text_color')
                                .removeAttr("disabled");
                        }
                    };
                    checkbox.change(function () {
                        check();
                    });
                    window.setTimeout(check, 10);
                }
            },
            {
                name: 'color',
                type: GUIElementType.Color,
                value: function () {
                    return config.color;
                },
                label: self._('Color'),
                attributes: {
                    id: 'fflist-' + UID + '-color'
                }
            },
            {
                name: 'mouseOver',
                type: GUIElementType.Color,
                value: function () {
                    return config.mouseOver;
                },
                label: self._('Mouse Over Color'),
                attributes: {
                    id: 'fflist-' + UID + '-mouseOver'
                }
            },
            {
                name: 'text_color',
                type: GUIElementType.Color,
                value: function () {
                    return config.text_color;
                },
                label: self._('Info Text Color'),
                attributes: {
                    id: 'fflist-' + UID + '-text_color'
                }
            },
            {
                name: 'highlight_color',
                type: GUIElementType.Color,
                value: function () {
                    return config.highlight_color;
                },
                label: self._('Highlight Color'),
                attributes: {
                    id: 'fflist-' + UID + '-highlight_color'
                }
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: self._("Color"),
                value: undefined
            },
            {
                name: "",
                type: GUIElementType.PanelStart,
                label: self._("Layout"),
                value: undefined
            },
            {
                name: 'background',
                type: GUIElementType.Input,
                value: function () {
                    return config.background;
                },
                label: self._('Background Image')
            },
            {
                name: 'mark_chapter',
                type: GUIElementType.Checkbox,
                value: function () {
                    return config.mark_chapter;
                },
                label: self._('Mark Chapter')
            },
            {
                name: 'image',
                type: GUIElementType.Input,
                value: function () {
                    return config.image;
                },
                label: self._('Info Image'),
                customOptions: (el) => {
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
                        .attr("src", self.Parser.Api.GetUrl("none.gif"))
                        .appendTo(container)
                        .click(function () {
                        el.val("");
                    });
                    for (var i = 1; i <= 6; i++) {
                        image.clone()
                            .attr("src", self.Parser.Api.GetUrl(i + ".gif"))
                            .appendTo(container)
                            .click(function () {
                            el.val($(this).attr("src"));
                        });
                    }
                }
            },
            {
                name: 'note',
                type: GUIElementType.Input,
                value: function () {
                    return config.note;
                },
                label: self._('Note'),
                debugOnly: true
            },
            {
                name: "",
                type: GUIElementType.PanelEnd,
                label: self._("Layout"),
                value: undefined
            },
            {
                name: '',
                type: GUIElementType.Button,
                value: function () {
                    return self._('Remove');
                },
                label: '',
                callback: function () {
                    self._guiData[name].instances['name'].val('');
                    container.fadeOut(function () {
                        container.remove();
                    });
                },
                customOptions: (el) => {
                    if (custom) {
                        el.remove();
                    }
                    else {
                        el.removeClass("btn-default").addClass("btn-danger");
                    }
                }
            },
            {
                name: '',
                type: GUIElementType.Custom,
                value: function () {
                    return '';
                },
                result: function () {
                    return null;
                },
                label: '',
                customElement: function () {
                    var elementContainer = $("<div></div>");
                    $('<div style="display:inline-block; width: 50%"></div>').appendTo(elementContainer).append($('<img src="' + self.Parser.Api.GetUrl('glyphicons_369_collapse_top.png') + '" alt="' + self._('Minimize') + '"></img>').click(function () {
                        container
                            .unbind()
                            .css("cursor", "pointer")
                            .css("height", "50px")
                            .attr('title', self._("Click to Edit"));
                        setTimeout(function () {
                            container.click(function () {
                                container.css('height', 'auto');
                                container.css("cursor", "auto");
                                container.removeAttr("title");
                            });
                        }, 100);
                    }).css("cursor", "pointer"));
                    $('<div style="display:inline-block; width: 40%"></div>').appendTo(elementContainer).append($('<button class="btn btn-default">' + self._('Export') + '</button>')
                        .click(function (event) {
                        event.preventDefault();
                        var modal = GUIHandler.CreateBootstrapModal($("<pre></pre>").text(JSON.stringify(config)), self._("Export Data for Element: ") + config.name);
                        GUIHandler.ShowModal(modal);
                    }));
                    return elementContainer;
                }
            }
        ], false, (data) => {
            if (!custom && typeof (this.Config.highlighterPrefabs[data.name]) !== "undefined") {
                delete this.Config.highlighterPrefabs[data.name];
            }
            var name = data.instances['name'].val();
            if (name === "") {
                return;
            }
            // Priority:
            var priority = 1;
            var selectedPriority = data.instances['priority'].find(":checked");
            priority = Number(selectedPriority.val());
            // CustomPriority
            var customPriority = {
                color: null,
                background: null,
                highlight_color: null,
                mouseOver: null,
                text_color: null
            };
            var el = data.instances['customPriority'];
            $.each(customPriority, function (name, _) {
                var elements = el.find('[data-priorityName="' + name + '"]');
                if (elements.length === 0) {
                    console.warn("Can't find Elements for Priority:", name, el);
                }
                else {
                    customPriority[name] = Number(elements.filter(":checked").val());
                }
                if (customPriority[name] === null || typeof (customPriority[name]) === "undefined" || customPriority[name] === NaN || customPriority[name] < 0) {
                    customPriority[name] = 1;
                }
            });
            // ...
            var config = {
                name: name,
                color: data.instances['color'].find('input').val(),
                mark_chapter: data.instances['mark_chapter'].is(':checked'),
                display: data.instances['display'].is(':checked'),
                mouseOver: data.instances['mouseOver'].find('input').val(),
                ignoreColor: data.instances['ignoreColor'].is(':checked'),
                background: data.instances['background'].val(),
                text_color: data.instances['text_color'].find('input').val(),
                image: data.instances['image'].val(),
                note: (typeof (data.instances['note']) !== "undefined") ? data.instances['note'].val() : null,
                priority: priority,
                customPriority: customPriority,
                highlight_color: data.instances['highlight_color'].find('input').val()
            };
            if (config.text_color === "") {
                config.text_color = "#686868";
            }
            if (this.DEBUG) {
                console.log("Filter '" + name + "' saved: ", config);
            }
            if (!custom) {
                this.Config.highlighterPrefabs[name] = config;
            }
            else {
                if (typeof (this.Config.highlighter[name]) === "undefined") {
                    this.Config.highlighter[name] = {
                        custom: null,
                        hide: null,
                        image: null,
                        prefab: null
                    };
                }
                this.Config.highlighter[name].custom = config;
            }
        });
        this.RenderGUIElement(name, highlightContainer, 12);
        container.fadeIn();
        this.Log("Form added");
    }
    /**
     *   Open or closes the GUI for the Live Chat
     */
    ToggleLiveChat() {
        var self = this;
        if (this._guiContainer == null) {
            if (this.DEBUG) {
                console.log("Generate GUI Container");
            }
            this.GuiCreate();
        }
        if (this._guiContainer.is(':visible')) {
            if (this.DEBUG) {
                console.log("Hide GUI Container");
            }
            this.Hide();
        }
        else {
            if (!this.Parser.Chat.Available) {
                alert(self._("This Feature is not enabled in your Browser. Needed: WebSocket"));
                return;
            }
            if (this.DEBUG) {
                console.log("Starting Content Generation");
            }
            this._guiContainer.html('');
            var userList = $('<span>' + self._('Online') + ': (?)</span>')
                .addClass('ChatUserInfo');
            this._guiContainer.append($('<h2 style="text-align:center: magin-bottom: 10px">' + self._('Live Chat Feature:') + '</h2>').append(userList));
            var chatContainer = $("<div></div>").appendTo(this._guiContainer).hide();
            var connectBox = $("<div></div>").appendTo(this._guiContainer);
            connectBox.append("<p>" + self._("This Feature allows you to connect to the Live-Chat.") + "<p>")
                .append("<p>" + self._("If you need help or just want to talk, you are welcome!") + "</p>")
                .append("<p>" + self._("I can't be online all the time. I am living in Europe, so please have this in mind") + "</p>")
                .append("<hr /><p>" + self._("The Connection is made using an Encrypted Connection to my Server.") + "</p>")
                .append('<p><abbr title="irc.esper.net#FanfictionStoryParser">' + self._('Every Message is sent to my IRC-Channel') + '</abbr></p>')
                .append($('<div style="text-align:center"></div>').append($('<button class="btn btn-primary">' + self._('Connect') + '</button>')
                .click(function (e) {
                e.preventDefault();
                connectBox.fadeOut(0.5, function () {
                    self.Parser.Chat.Connect();
                    chatContainer.fadeIn(0.5);
                });
            })));
            var addMessageElement = function (sender, message, time) {
                var newMeessage = $('<div class="ChatMessage"></div>')
                    .append($('<div class="Sender"></div>').text(sender))
                    .append($('<div class="Message"></div>').text(message))
                    .append($('<div class="Time"></div>').text(time));
                container.append(newMeessage);
                container[0].scrollTop = container[0].scrollHeight;
            };
            var container = $('<div class="ChatMessageContainer"></div>').appendTo(chatContainer);
            var input = $('<input type="text" />');
            var send = function () {
                var text = input.val();
                input.val("");
                //addMessageElement(self.config.token, text, (new Date()).toLocaleTimeString());
                self.Parser.Chat.SendChatMessage(text);
            };
            chatContainer.append(container);
            chatContainer.append($('<div class="ChatInputContainer"></div>')
                .append(input)
                .append($('<button class="btn btn-primary">' + self._('Send') + '</button>').click(function (e) {
                send();
            })))
                .append('<hr/><p style="text-align:center">' + self._('Advanced Features:') + '</p>')
                .append($('<button class="btn btn-warning">' + self._('Send Config-Data') + '</button>')
                .click(function (e) {
                e.preventDefault();
                if (confirm(self._("This Option allows you to send your Config-Data to the Server. This helps me to help you :3  Do you REALY want to send this?"))) {
                    self.Parser.Chat.SendConfigData();
                }
            }));
            input.keydown(function (e) {
                if (e.keyCode === 13) {
                    send();
                }
            });
            this.Parser.Chat._onError = function (message) {
                addMessageElement("System", message, (new Date().toLocaleTimeString()));
            };
            //addMessageElement("System", "Connected to Server", (new Date()).toLocaleTimeString());
            this.Parser.Chat.SetMessageCallback(function (data) {
                if (data.Type === "Chat") {
                    addMessageElement(data.Sender, data.Data, (new Date(Number(data.Time)).toLocaleTimeString()));
                }
            });
            //addMessageElement("Test", "Das ist ein Test einer längeren Nachticht ... 123 BLUB", "NOW");
            this.Log("Display Content");
            this.Show(function () {
                self.Parser.Chat.Disconnect();
            });
        }
    }
    /**
     *   Open or closes the GUI for the Messaging GUI
     */
    MessagesGUI() {
        // Mark Messages as read:
        var localMessages = this.DataConfig['messages'];
        var messages = $("<div></div>");
        if (typeof (localMessages) !== "undefined") {
            this.Parser.Api.MarkMessages();
            $.each(localMessages, function (k, el) {
                messages.append($("<b></b>")
                    .text(el.Title))
                    .append($("<p></p>")
                    .html(el.Content))
                    .append("<hr />");
            });
        }
        var modal = GUIHandler.CreateBootstrapModal(messages, this._('Messages:'));
        GUIHandler.ShowModal(modal);
    }
    /**
     *   Open or closes the GUI for the Feedback Function
     */
    FeedbackGUI() {
        var self = this;
        var types = [self._("Bug"), self._("Feature Request"), self._("Question"), self._("Other")];
        var inputType = $('<select id="feedbackType" class="form-control"></select>');
        $.each(types, function (_, type) {
            $("<option></option>").text(type)
                .appendTo(inputType);
        });
        var inputTitle = $('<input id="feedbackTitle" type="text" class="form-control" required />');
        var inputMessage = $('<textarea id="feedbackMessage" rows="5" class="form-control" required></textarea>'); // style="width:90%; height: 100px;"
        var element = $('<div></div>')
            .append($("<h2></h2>").text(self._('Feedback')))
            .append($('<div class="form-group"></div>')
            .append($('<label for="feedbackType"></label').text(self._('Type')))
            .append(inputType))
            .append($('<div class="form-group"></div>')
            .append($('<label for="feedbackTitle"></label').text(self._('Title')))
            .append(inputTitle))
            .append($('<div class="form-group"></div>')
            .append($('<label for="feedbackMessage"></label').text(self._('Message')))
            .append(inputMessage)
            .append($('<p></p>').text(self._('Please write English OR German!'))));
        var buttons = [];
        buttons.push($('<button class="btn btn-primary"></button>').text(self._("Send"))
            .click(() => {
            var data = {
                Token: self.Config.token,
                Type: inputType.val(),
                Title: inputTitle.val(),
                Message: inputMessage.val(),
                Version: self.VERSION,
                Branch: self.BRANCH
            };
            self.Parser.Api.Request(MessageType.postFeedback, { data: JSON.stringify(data) }, function () { });
            alert("Message sent ...");
            modal.modal("hide");
        }));
        buttons.push($('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'));
        var modal = GUIHandler.CreateBootstrapModal(element, self._("Feedback"), buttons);
        GUIHandler.ShowModal(modal);
    }
}

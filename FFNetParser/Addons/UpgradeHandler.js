/// <reference path="../_reference.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UpgradeHandler = (function (_super) {
    __extends(UpgradeHandler, _super);
    function UpgradeHandler(parser) {
        var _this = _super.call(this, parser) || this;
        _this._registeredTags = {};
        _this.InitTags();
        var self = _this;
        _this.EventHandler.AddEventListener(Events.OnLoad, function () {
            self.HandleTags();
        });
        return _this;
    }
    UpgradeHandler.prototype.InitTags = function () {
        if (this.DEBUG) {
            this.Log("Upgrade Handler Initiate");
        }
        var self = this;
        // Update 5.2.4 - Adds Keep Searching to the Filter Config
        this.RegisterTag("filter_keep_searching", function () {
            $.each(self.Config.marker, function (name, data) {
                if (typeof (data.keep_searching) === "undefined") {
                    self.Config.marker[name].keep_searching = false;
                }
            });
            self.Parser.SaveConfig();
            return true;
        });
        // Update 5.2.9 - Adds Images to Filter && Implementation of new Highlighter System
        this.RegisterTag("filter_Image_highlighter_5.2.9", function () {
            $.each(self.Config.marker, function (name, data) {
                if (typeof (data.image) === "undefined") {
                    self.Config.marker[name].image = null;
                }
            });
            $.each(self.Config.highlighter, function (link, element) {
                if (typeof (element) !== "object") {
                    if (self.DEBUG) {
                        console.log("Updated old Highlighter Object");
                    }
                    self.Config.highlighter[link] =
                        {
                            image: String(element),
                            hide: false
                        };
                }
                if ((typeof (self.Config.highlighter[link].custom) === "undefined") && (typeof (self.Config.highlighter[link].prefab) === "undefined")) {
                    self.Config.highlighter[link].custom = {
                        background: null,
                        color: null,
                        display: !self.Config.highlighter[link].hide,
                        ignoreColor: null,
                        image: self.Config.highlighter[link].image,
                        mark_chapter: null,
                        mouseOver: null,
                        name: "Legacy-Custom",
                        priority: 1,
                        customPriority: null,
                        note: null,
                        text_color: null,
                        highlight_color: null
                    };
                    self.Config.highlighter[link].hide = null,
                        self.Config.highlighter[link].image = null;
                }
            });
            self.Parser.SaveConfig();
            return true;
        });
        this.RegisterTag("highlighter_defaultValues", function () {
            var highlighterDefault = {
                "Hide": {
                    "background": "",
                    "color": "",
                    "customPriority": {
                        "background": 1,
                        "color": 1,
                        "highlight_color": 1,
                        "mouseOver": 1,
                        "text_color": 1
                    },
                    "display": false,
                    "highlight_color": "#ff0000",
                    "ignoreColor": true,
                    "image": "",
                    "mark_chapter": false,
                    "mouseOver": "",
                    "name": "Hide",
                    "note": "",
                    "text_color": "#686868"
                },
                "Bad": {
                    "background": "",
                    "color": "",
                    "customPriority": {
                        "background": 1,
                        "color": 1,
                        "highlight_color": 1,
                        "mouseOver": 1,
                        "text_color": 1
                    },
                    "display": true,
                    "highlight_color": "#ff8500",
                    "ignoreColor": true,
                    "image": "https://www.mrh-development.de/FanFictionUserScript/SSLProxy/?url=6.gif",
                    "mark_chapter": true,
                    "mouseOver": "",
                    "name": "Bad",
                    "note": "",
                    "priority": 1,
                    "text_color": "#686868"
                },
                "Good": {
                    "background": "",
                    "color": "",
                    "customPriority": {
                        "background": 1,
                        "color": 1,
                        "highlight_color": 1,
                        "mouseOver": 1,
                        "text_color": 1
                    },
                    "display": true,
                    "highlight_color": "#43ff00",
                    "ignoreColor": true,
                    "image": "https://www.mrh-development.de/FanFictionUserScript/SSLProxy/?url=5.gif",
                    "mark_chapter": true,
                    "mouseOver": "",
                    "name": "Good",
                    "note": "",
                    "priority": 1,
                    "text_color": "#686868"
                }
            };
            $.each(highlighterDefault, function (name, element) {
                if (typeof (self.Config.highlighterPrefabs[name]) === "undefined") {
                    self.Config.highlighterPrefabs[name] = element;
                }
            });
            self.Parser.SaveConfig(true);
            return true;
        });
        this.RegisterTag("highlighter_storyID", function () {
            if (!self.Parser.Config.highlighter_use_storyID) {
                return false;
            }
            var newData = {};
            $.each(self.Parser.Config.highlighter, function (key, value) {
                var infoRequest = {
                    Link: key
                };
                var info = self.EventHandler.RequestResponse(Events.RequestGetStoryInfo, self, infoRequest);
                if (info.ID in newData) {
                    return;
                }
                newData[info.ID] = value;
            });
            self.Parser.Config.highlighter = newData;
            self.Parser.SaveConfig(true);
            return true;
        });
    };
    UpgradeHandler.prototype.HandleTags = function () {
        if (typeof (this.Config.upgradeTags) === "undefined") {
            this.Log("Upgrade Handler: Initializing Upgrade Tags Variable");
            this.Parser.SaveConfig(false);
            this.Config.upgradeTags = {};
        }
        var self = this;
        $.each(this._registeredTags, function (name, data) {
            if (self.DEBUG) {
                console.log("Upgrade Handler: Checking Tag - ", name);
            }
            if (typeof (self.Config.upgradeTags[name]) === "undefined" && typeof (data.ifNotExist) !== "undefined") {
                if (self.DEBUG) {
                    console.log("Upgrade Handler: Executing IfNotExist Handler for Tag: ", name);
                }
                if (!data.ifNotExist(self)) {
                    return;
                }
            }
            else if (typeof (self.Config.upgradeTags[name]) !== "undefined" && typeof (data.ifExist) !== "undefined") {
                if (self.DEBUG) {
                    console.log("Upgrade Handler: Executing IfExist Handler for Tag: ", name);
                }
                if (!data.ifExist(self)) {
                    return;
                }
            }
            self.Config.upgradeTags[name] = {
                lastRun: Date.now()
            };
            self.Parser.SaveConfig(false);
        });
    };
    UpgradeHandler.prototype.RegisterTag = function (name, ifNotExist, ifExist) {
        if (typeof (this._registeredTags[name]) !== "undefined") {
            this.Log("Upgrade Handler: Tag with name '" + name + "' is already registered!", this._registeredTags);
            return;
        }
        if ((typeof (ifNotExist) === "undefined") && (typeof (ifExist) === "undefined")) {
            this.Log("Upgrade Handler: At least one of the callback Functions has to be set!", name);
            return;
        }
        this._registeredTags[name] = {
            ifNotExist: ifNotExist,
            ifExist: ifExist
        };
    };
    UpgradeHandler.prototype.RemoveTag = function (name) {
        if (typeof (this.Config.upgradeTags[name]) !== "undefined") {
            delete this.Config.upgradeTags[name];
            this.Parser.SaveConfig();
        }
        else {
            this.Log("Upgrade Tag do not Exist!");
        }
    };
    return UpgradeHandler;
}(ExtentionBaseClass));
//# sourceMappingURL=UpgradeHandler.js.map
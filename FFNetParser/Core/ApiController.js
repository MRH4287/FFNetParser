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
var ApiController = (function (_super) {
    __extends(ApiController, _super);
    function ApiController(parser) {
        var _this = _super.call(this, parser) || this;
        // Dictionary with structure: Hub -> Methode -> MessageID -> Callback
        _this._requestData = {};
        _this._initialized = false;
        _this._requestQueue = [];
        return _this;
    }
    ApiController.prototype.Initialize = function () {
        this.ConnectToServer();
        try {
            var self = this;
            var org = window.onerror;
            window.onerror = function (msg, url, line, col, error) {
                try {
                    self.SendException(msg, url, String(line), String(col), JSON.stringify(error));
                }
                catch (ex) {
                }
                if (org !== undefined) {
                    org(msg, url, line, col, error);
                }
            };
        }
        catch (ex) {
        }
    };
    /* Socket.Io */
    ApiController.prototype.ConnectToServer = function () {
        var _this = this;
        this.socket = io(this.Config.api_url);
        this.socket.on("apiCall", function (controller, functionName, data) {
            _this.Response(controller, functionName, data);
        });
        this.socket.on("start", function () {
            _this._initialized = true;
            console.info("Socket.IO-Connection established!");
            if (_this._requestQueue.length > 0) {
                $.each(_this._requestQueue, function (_, callback) {
                    callback();
                });
                _this._requestQueue = [];
            }
        });
    };
    ApiController.prototype.Request = function (controller, methode, args, response, timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = 5000; }
        var doRequest = function () {
            // Get free MessageID:
            if (_this._requestData[controller] === undefined) {
                _this._requestData[controller] = {};
            }
            if (!_this.socket.connected) {
                console.error("No open connection!");
            }
            // Make the first character lowerCase
            methode = methode.charAt(0).toLowerCase() + methode.slice(1);
            if (_this._requestData[controller][methode] === undefined) {
                _this._requestData[controller][methode] = {};
            }
            var id = "";
            do {
                id = "req_" + Math.floor(Math.random() * 1000);
            } while (_this._requestData[controller][methode][id] !== undefined);
            // Register Callback:
            _this._requestData[controller][methode][id] = response;
            if (args === undefined) {
                args = [];
            }
            args.push(id);
            _this.socket.emit("apiCall", controller, methode, args);
            var self = _this;
            // Wait ...
            window.setTimeout(function () {
                if (self._requestData[controller][id] !== undefined) {
                    console.warn("API-Request Timeout!", controller, id);
                    self._requestData[controller][methode][id](null);
                    delete self._requestData[controller][methode][id];
                }
            }, timeout);
        };
        if (this._initialized) {
            doRequest();
        }
        else {
            this._requestQueue.push(doRequest);
        }
    };
    ApiController.prototype.Response = function (controller, methode, data) {
        // Make the first character lowerCase
        methode = methode.charAt(0).toLowerCase() + methode.slice(1);
        if (data === undefined || data === null) {
            console.warn("Invalid API-Reponse", controller, methode);
            return;
        }
        if (data.Status === "Error") {
            console.warn("API Error:", controller, methode, data);
            return;
        }
        if (this._requestData[controller] === undefined) {
            console.warn("Got API-Response, but no pending Request for Hub", controller, data);
            return;
        }
        if (this._requestData[controller][methode] === undefined) {
            console.warn("Got API-Response, but no pending Request for Methode", controller, methode, data);
            return;
        }
        var messageID = data.MessageID;
        if (this._requestData[controller][methode][messageID] === undefined) {
            console.warn("Got API-Response, but no pending Request for MessageId", controller, methode, messageID, data);
            return;
        }
        console.log("Got API-Message: ", data);
        try {
            this._requestData[controller][methode][messageID](data.Response);
        }
        finally {
            delete this._requestData[controller][methode][messageID];
        }
    };
    /* /SignalR */
    /**
     * Report an Exception
     * @param message The Error-Message
     * @param url The Location of the Error
     * @param line The Line of the Error
     * @param column The Column of the Error
     * @param error The Error-Object
     */
    ApiController.prototype.SendException = function (message, url, line, column, error) {
        var sysInfo = this.GetSystemInformation();
        try {
            this.Request("StatusHub", "ReportException", [message, url, line, column, error, sysInfo], function (r) { });
        }
        catch (ex) {
        }
    };
    /**
     * Sends Status Information
     * @param page The current Page
     */
    ApiController.prototype.SendStatus = function (page) {
        if (page === void 0) { page = undefined; }
        if (!this.Config.api_checkForUpdates && !this.Config.enable_read_chapter_info) {
            return;
        }
        try {
            var info = {
                Version: this.VERSION,
                Token: this.Config.token,
                Nested: (typeof (sessionStorage["ffnet-mutex"]) !== "undefined") ? true : false,
                Branch: this.BRANCH,
                Page: page || window.location.href,
                Browser: window.navigator.userAgent,
                Language: this.Config.language
            };
            this.Request("StatusHub", "Notify", [info], function (r) { });
        }
        catch (ex) {
            this.SendException("Can't send Status", "APIController", "", "", ex);
            if (this.DEBUG) {
                console.log("Can't send status Information ...", ex);
            }
        }
    };
    /**
     * Collect SystemInformation
     */
    ApiController.prototype.GetSystemInformation = function () {
        var sysInfo = {
            Browser: window.navigator.userAgent,
            Version: this.VERSION,
            Branch: this.BRANCH,
            Nested: this.Parser.LOAD_INTERNAL,
            SessionStorage: sessionStorage,
            LocalStorage: localStorage,
            Parser: self,
            Url: document.location
        };
        return sysInfo;
    };
    /**
    *   Checks the current Version
    */
    ApiController.prototype.CheckVersion = function () {
        if (this.Config.api_checkForUpdates && (typeof (chrome) === "undefined" || typeof (chrome.runtime) === "undefined")) {
            var self = this;
            this.Request("VersionHub", "GetVersion", [], function (version) {
                if (self.DEBUG) {
                    console.log("Version Info Recieved: ", version);
                    console.log("Current Version: ", self.VERSION);
                }
                if (self.Parser.IsRemoteVersionHigher(self.VERSION, version.version)) {
                    if (!self.Config.api_autoIncludeNewVersion) {
                        $(".menulink").append(" [Notice: There is a newer Version of the Fanfiction.net Story Parser (" + version.version + ")]");
                    }
                    else {
                        self.UpdateScript();
                    }
                }
                else {
                    self.Log("No new Version found ...");
                }
            });
        }
    };
    /**
     *   Loads the CSS-Styles from the Server
     */
    ApiController.prototype.GetStyles = function () {
        var self = this;
        var insertStyles = function (style) {
            self.Log("Insert Styles ...");
            var cssElement = $('<style id="ffnetParser-CSS" type="text/css"></style>').html(style);
            $("head").append(cssElement);
        };
        if (typeof (this.DataConfig["styles"]) === "undefined") {
            this.Log("Load Styles from Remote Server ...");
            //this.Request(MessageType.getStyles, { data: this.BRANCH }, function (styles)
            this.Request("System", "GetStyles", [], function (styles) {
                self.DataConfig["styles"] = styles;
                insertStyles(styles);
            });
        }
        else {
            insertStyles(this.DataConfig["styles"]);
        }
    };
    ApiController.prototype.GetLiveChatInfo = function (callback) {
        if (this.DEBUG) {
            console.log("Requesting Live-Chat Info ....");
        }
        var self = this;
        //this.Request(MessageType.liveChatInfo,
        //    {
        //        data: this.BRANCH
        //    },
        //    function (res)
        this.Request("ChatHub", "LiveChatInfo", [], function (data) {
            if (self.DEBUG) {
                self.Log("Got Live-Chat Info Response from Server: ", data);
            }
            try {
                if (typeof (callback) !== "undefined") {
                    callback(data);
                }
                else {
                    console.log(data);
                }
            }
            catch (e) {
                console.warn("Error in Function: 'api_getLiveChatInfo': ", e);
            }
        });
    };
    /**
     *  Loads the List of available Languages from the Server
     *  @param callback The Callback with the Result
     */
    ApiController.prototype.GetLanguageList = function (callback) {
        if (this.DEBUG) {
            console.log("Requesting Language List from Server");
        }
        var self = this;
        //this.Request(MessageType.getLanguageList, { data: this.BRANCH }, function (res)
        this.Request("LanguageHub", "GetLanguageList", [], function (result) {
            self.Log("Got Language List:", result);
            if (typeof (callback) !== "undefined") {
                callback(result);
            }
        });
    };
    /**
     *  Requests a specific Language from the Server
     *  @param languageCode The Language Code of the wanted Language
     *  @param callback The callback with the results
     *  @param apply Should the current Language be changed?
     *  @param save Should the Language saved to the Config?
     */
    ApiController.prototype.GetLanguage = function (languageCode, callback, apply, save) {
        if (apply === void 0) { apply = false; }
        if (save === void 0) { save = true; }
        if (this.DEBUG) {
            console.info("Language Check for: ", languageCode);
        }
        if (languageCode === this.Config.language) {
            if (typeof (this.DataConfig["language"]) !== "undefined") {
                this.Log("Get Language from Cache ...");
                this.Parser.CurrentLanguage = this.DataConfig["language"];
                return;
            }
            else {
                this.Log("No local Language Data. Requesting from Server ...", this.DataConfig);
            }
        }
        if (languageCode === 'en') {
            if (typeof (this.DataConfig["language"]) !== "undefined") {
                delete this.DataConfig["language"];
            }
            this.Parser.CurrentLanguage = null;
            this.Parser.SaveConfig(false);
            return;
        }
        if (this.DEBUG) {
            console.log("Requesting Language from Server", languageCode);
        }
        var self = this;
        //this.Request(MessageType.getLanguage, { data: languageCode }, function (res)
        this.Request("LanguageHub", "GetLanguage", [languageCode], function (result) {
            self.Log("Got Language: ", result);
            if (typeof (callback) !== "undefined") {
                callback(result);
            }
            if (apply === true) {
                var data = {};
                $.each(result.Values, function (_, el) {
                    data[el.Key] = el.Value;
                });
                self.Parser.CurrentLanguage = data;
            }
            if (save === true) {
                self.DataConfig["language"] = data;
                self.Log("Save Language-Data to Cache");
                self.Parser.SaveDataStore();
            }
            else if (typeof (self.DataConfig["language"]) !== "undefined") {
                delete self.DataConfig["language"];
                self.Parser.SaveDataStore();
            }
        });
    };
    /**
     *   Updates the current script to the newest Version
     */
    ApiController.prototype.UpdateScript = function () {
        if (this.Config.api_autoIncludeNewVersion) {
            if (this.DEBUG) {
                console.log("Loading new Version from Server");
            }
            var self = this;
            //this.Request(MessageType.getCurrent, { data: this.BRANCH }, function (res)
            this.Request("VersionHub", "GetCurrent", [this.BRANCH], function (res) {
                //console.log("Script: ", res);
                self.Parser.SaveToMemory(localStorage, "ffnet-Script", { script: res });
                if (self.DEBUG) {
                    console.log("New Version Recieved");
                }
            });
        }
    };
    /**
     *   Get all new Messages from the Server
     *   @param callback Callback after success
     */
    ApiController.prototype.GetMessages = function (callback) {
        //var data = {
        //    Token: this.Config.token,
        //    Version: this.VERSION
        //};
        //this.Request(MessageType.getMessages, { data: JSON.stringify(data) }, function (result)
        this.Request("MessageHub", "GetMessages", [this.Config.token], function (response) {
            callback(response);
        });
    };
    /**
     *   Tell the remote Server, that all new messages have been read
     */
    ApiController.prototype.MarkMessages = function (ids) {
        delete this.DataConfig['messages'];
        this.Parser.SaveDataStore();
        //$(".ffnetMessageContainer img").attr("src", this.getUrl("message-white.png"));
        //$(".ffnetMessageContainer").css("background-color", "");
        $(".ffnetMessageContainer").find(".badge").remove();
        $(".ffnet-messageCount").text("0");
        //this.Request(MessageType.readMessages, { data: this.Config.token }, function (result)
        this.Request("MessageHub", "SetAsRead", [this.Config.token, ids], function (res) { });
    };
    /**
    *   Gets the Information of all read Chapters of a certain Story
    *   @param storyIDs The List of StoryIds to check
    *   @param callback The Callback Function with the Server Information
    */
    ApiController.prototype.GetReadChapters = function (storyIDs, callback) {
        var _this = this;
        var request = {
            Token: this.Config.token,
            Chapters: storyIDs
        };
        if (storyIDs === undefined) {
            callback(undefined, undefined);
            return;
        }
        if (storyIDs.length > 5) {
            var queue = [];
            for (var i = 0; i < storyIDs.length / 5; i++) {
                var elements = [];
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
                console.log("Get Story Info Queue: ", queue);
            }
            var index = 0;
            var outResult = {};
            var outLastChapter = {};
            var dataCallback = function (result, lastChapter) {
                if (_this.DEBUG) {
                    console.log("Get Story Info call Number: ", index);
                }
                outResult = $.extend(outResult, result);
                outLastChapter = $.extend(outLastChapter, lastChapter);
                if (index < queue.length) {
                    index += 1;
                    _this.GetReadChapters(queue[index], dataCallback);
                }
                else {
                    callback(outResult, outLastChapter);
                }
            };
            dataCallback({}, {});
            return;
        }
        //this.Request(MessageType.getStoryInfo,
        //    {
        //        data: JSON.stringify(request)
        //    },
        this.Request("StoryHub", "GetStoryInfo", [this.Config.token, storyIDs], function (data) {
            var result = {};
            var lastChapter = {};
            $.each(data.Data, function (i, line) {
                result[line.Key] = line.Value;
            });
            $.each(data.LastChapter, function (i, line) {
                lastChapter[line.Key] = line.Value;
            });
            callback(result, lastChapter);
        });
    };
    ApiController.prototype.GetUrl = function (path) {
        return "https://www.mrh-development.de/static/ff/" + path;
    };
    return ApiController;
}(ExtentionBaseClass));
//# sourceMappingURL=ApiController.js.map
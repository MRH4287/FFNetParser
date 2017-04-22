/// <reference path="../_reference.ts" /> 

class ApiController extends ExtentionBaseClass
{
    // Dictionary with structure: Hub -> Methode -> MessageID -> Callback
    private _requestData: {
        [index: string]: {
            [index: string]: { [index: string]: (response: any) => void }
        }
    } = {};

    private _initialized: boolean = false;

    private _requestQueue: (() => void)[] = [];


    public constructor(parser: StoryParser)
    {
        super(parser);
    }

    public Initialize()
    {
        this.ConnectToServer();

        try
        {
            var self = this;
            var org = window.onerror;
            window.onerror = function (msg, url, line, col, error)
            {
                try
                {
                    self.SendException(msg, url, String(line), String(col), JSON.stringify(error));
                }
                catch (ex)
                {
                }

                if (org !== undefined)
                {
                    org(msg, url, line, col, error);
                }
            };
        }
        catch (ex)
        {
        }
    }

    /* SignalR */

    private ConnectToServer()
    {
        $.connection.hub.url = this.Config.api_url;

        this.RegisterHubResponseHandler();

        $.connection.hub.error(function (error)
        {
            console.log('SignalR error: ' + error)
        });

        $.connection.hub.start().done(() =>
        {
            this._initialized = true;
            console.info("SinglR-Connection established!");

            if (this._requestQueue.length > 0)
            {
                $.each(this._requestQueue, (_, callback) =>
                {
                    callback();
                });

                this._requestQueue = [];
            }

        });

    }

    private RegisterHubResponseHandler()
    {
        var self = this;
        $.each($.connection, function (hubName, hub)
        {
            if (hub.server === undefined)
            {
                return;
            }

            $.each(hub.server, function (name: string, impl)
            {
                name = name.charAt(0).toUpperCase() + name.slice(1);

                hub.client[name] = (data) =>
                {
                    self.Response(hubName, name, data);
                };

                if (self.DEBUG)
                {
                    console.log("Register SignalR-Methode:", hubName, name);
                }
            });
        });


        //// PingHub
        //$.connection["pingHub"].client.Pong = (data) =>
        //{
        //    this.Response("pingHub", "Pong", data);
        //};


    }

    public Request(hub: string, methode: string, args: any[], response: (response: any) => void, timeout: number = 5000)
    {
        var doRequest: () => void = () =>
        {
            // Make the first character lowerCase
            hub = hub.charAt(0).toLowerCase() + hub.slice(1);

            if (hub.substring(hub.length - 3) !== "Hub")
            {
                console.warn("Hub name does not end with 'Hub'", hub);
            }

            // Get free MessageID:
            if (this._requestData[hub] === undefined)
            {
                this._requestData[hub] = {};
            }

            // Make the first character lowerCase
            methode = methode.charAt(0).toLowerCase() + methode.slice(1);

            if (this._requestData[hub][methode] == undefined)
            {
                this._requestData[hub][methode] = {};
            }

            var id = "";
            do
            {
                id = "req_" + Math.floor(Math.random() * 1000);
            } while (this._requestData[hub][methode][id] !== undefined)

            // Check if the methode is available:
            var hubInfo = $.connection[hub];
            if (hubInfo === undefined)
            {
                throw "Hub '" + hub + "' Not found!";
            }

            var methodeInfo = hubInfo.server[methode]
            if (methodeInfo === undefined)
            {
                throw "Methode '" + methode + "' not found on Hub '" + hub + "'!";
            }

            // Register Callback:
            this._requestData[hub][methode][id] = response;

            if (args === undefined)
            {
                args = [];
            }

            args.push(id);

            // Make API-Call:
            methodeInfo.apply(this, args);

            var self = this;
            // Wait ...
            window.setTimeout(function ()
            {
                if (self._requestData[hub][id] !== undefined)
                {
                    console.warn("API-Request Timeout!", hub, id);
                    self._requestData[hub][methode][id](null);
                    delete self._requestData[hub][methode][id];
                }
            }, timeout);
        };

        if (this._initialized)
        {
            doRequest();
        }
        else
        {
            this._requestQueue.push(doRequest);
        }
    }


    private Response(hub: string, methode: string, data: ApiResponse)
    {
        // Make the first character lowerCase
        hub = hub.charAt(0).toLowerCase() + hub.slice(1);

        // Make the first character lowerCase
        methode = methode.charAt(0).toLowerCase() + methode.slice(1);

        if (data === undefined || data === null)
        {
            console.warn("Invalid API-Reponse", hub, methode);
            return;
        }

        if (data.Status === "Error")
        {
            console.warn("API Error:", hub, methode, data);
            return;
        }

        if (this._requestData[hub] === undefined)
        {
            console.warn("Got API-Response, but no pending Request for Hub", hub, data);
            return;
        }

        if (this._requestData[hub][methode] === undefined)
        {
            console.warn("Got API-Response, but no pending Request for Methode", hub, methode, data);
            return;
        }

        var messageID = data.MessageID;
        if (this._requestData[hub][methode][messageID] === undefined)
        {
            console.warn("Got API-Response, but no pending Request for MessageId", hub, methode, messageID, data);
            return;
        }

        console.log("Got API-Message: ", data);

        try
        {
            this._requestData[hub][methode][messageID](data.Response);
        }
        finally
        {
            delete this._requestData[hub][methode][messageID];
        }
    }

    /* /SignalR */

    /**
     * Report an Exception
     * @param message The Error-Message
     * @param url The Location of the Error
     * @param line The Line of the Error
     * @param column The Column of the Error
     * @param error The Error-Object
     */
    public SendException(message: string, url: string, line: string, column: string, error: string)
    {
        var sysInfo = this.GetSystemInformation();

        try
        {
            this.Request("StatusHub", "ReportException", [message, url, line, column, error, sysInfo], (r) => { });
        }
        catch (ex)
        {
        }
    }

    /**
     * Sends Status Information
     * @param page The current Page
     */
    public SendStatus(page: string = undefined)
    {
        if (!this.Config.api_checkForUpdates && !this.Config.enable_read_chapter_info)
        {
            return
        }

        try
        {
            var info =
                {
                    Version: this.VERSION,
                    Token: this.Config.token,
                    Nested: (typeof (sessionStorage["ffnet-mutex"]) !== "undefined") ? true : false,
                    Branch: this.BRANCH,
                    Page: page || window.location.href,
                    Browser: window.navigator.userAgent,
                    Language: this.Config.language
                };

            this.Request("StatusHub", "Notify", [info], (r) => { });

        }
        catch (ex)
        {
            this.SendException("Can't send Status", "APIController", "", "", ex);

            if (this.DEBUG)
            {
                console.log("Can't send status Information ...", ex);
            }
        }
    }


    /**
     * Collect SystemInformation
     */
    public GetSystemInformation()
    {
        var sysInfo = {
            Browser: window.navigator.userAgent,
            Version: this.VERSION,
            Branch: this.BRANCH,
            Nested: this.Parser.LOAD_INTERNAL,
            SessionStorage: sessionStorage,
            LocalStorage: localStorage,
            Parser: self,
            Url: document.location
        }

        return sysInfo;
    }

    /**
    *   Checks the current Version
    */
    public CheckVersion()
    {
        if (this.Config.api_checkForUpdates && (typeof (chrome) === "undefined" || typeof (chrome.runtime) === "undefined"))
        {
            var self = this;
            this.Request("VersionHub", "GetVersion", [], (version) =>
            {
                if (self.DEBUG)
                {
                    console.log("Version Info Recieved: ", version);
                    console.log("Current Version: ", self.VERSION);
                }

                var versionID = self.Parser.GetVersionId(self.VERSION);
                var removeVersionID = self.Parser.GetVersionId(version.version);

                if (removeVersionID > versionID)
                {
                    if (!self.Config.api_autoIncludeNewVersion)
                    {
                        $(".menulink").append(" [Notice: There is a newer Version of the Fanfiction.net Story Parser (" + version.version + ")]");
                    }
                    else
                    {
                        self.UpdateScript();
                    }
                }
                else
                {
                    self.Log("No new Version found ...");
                }

            });

        }
    }

    /**
     *   Loads the CSS-Styles from the Server
     */
    public GetStyles()
    {
        var self = this;
        var insertStyles = function (style)
        {
            self.Log("Insert Styles ...");

            var cssElement = $('<style id="ffnetParser-CSS" type="text/css"></style>').html(style);

            $("head").append(cssElement);

        };

        if (typeof (this.DataConfig["styles"]) === "undefined")
        {
            this.Log("Load Styles from Remote Server ...");

            //this.Request(MessageType.getStyles, { data: this.BRANCH }, function (styles)
            this.Request("System", "GetStyles", [], (styles) => 
            {
                self.DataConfig["styles"] = styles;

                insertStyles(styles);
            });
        }
        else
        {
            insertStyles(this.DataConfig["styles"]);
        }

    }

    public GetLiveChatInfo(callback?: (response: { Users: string[]; WebUsers: string[]; DevInRoom: boolean; }) => void)
    {
        if (this.DEBUG)
        {
            console.log("Requesting Live-Chat Info ....");
        }

        var self = this;

        //this.Request(MessageType.liveChatInfo,
        //    {
        //        data: this.BRANCH
        //    },
        //    function (res)
        this.Request("ChatHub", "LiveChatInfo", [], (data: { Users: string[]; WebUsers: string[]; DevInRoom: boolean; }) =>
        {
            if (self.DEBUG)
            {
                self.Log("Got Live-Chat Info Response from Server: ", data);
            }

            try
            {
                if (typeof (callback) !== "undefined")
                {
                    callback(data);
                }
                else
                {
                    console.log(data);
                }

            } catch (e)
            {
                console.warn("Error in Function: 'api_getLiveChatInfo': ", e);
            }

        });
    }

    /**
     *  Loads the List of available Languages from the Server
     *  @param callback The Callback with the Result
     */
    public GetLanguageList(callback?: (response: LanguageData[]) => void)
    {
        if (this.DEBUG)
        {
            console.log("Requesting Language List from Server");
        }

        var self = this;
        //this.Request(MessageType.getLanguageList, { data: this.BRANCH }, function (res)
        this.Request("LanguageHub", "GetLanguageList", [], (result: LanguageData[]) =>
        {
            self.Log("Got Language List:", result);

            if (typeof (callback) !== "undefined")
            {
                callback(result);
            }

        });
    }

    /**
     *  Requests a specific Language from the Server
     *  @param languageCode The Language Code of the wanted Language
     *  @param callback The callback with the results
     *  @param apply Should the current Language be changed?
     *  @param save Should the Language saved to the Config?
     */
    public GetLanguage(languageCode: string, callback?: (response: LanguageData) => void, apply: boolean = false, save: boolean = true)
    {
        if (this.DEBUG)
        {
            console.info("Language Check for: ", languageCode);
        }

        if (languageCode === this.Config.language)
        {
            if (typeof (this.DataConfig["language"]) !== "undefined")
            {
                this.Log("Get Language from Cache ...");

                this.Parser.CurrentLanguage = this.DataConfig["language"];
                return;
            }
            else
            {
                this.Log("No local Language Data. Requesting from Server ...", this.DataConfig);
            }

        }

        if (languageCode === 'en')
        {
            if (typeof (this.DataConfig["language"]) !== "undefined")
            {
                delete this.DataConfig["language"];
            }

            this.Parser.CurrentLanguage = null;

            this.Parser.SaveConfig(false);
            return;
        }

        if (this.DEBUG)
        {
            console.log("Requesting Language from Server", languageCode);
        }

        var self = this;
        //this.Request(MessageType.getLanguage, { data: languageCode }, function (res)
        this.Request("LanguageHub", "GetLanguage", [languageCode], (result: LanguageData) =>
        {
            self.Log("Got Language: ", result);

            if (typeof (callback) !== "undefined")
            {
                callback(result);
            }


            if (apply === true)
            {
                var data: { [index: string]: string } = {};

                $.each(result.Values, function (_, el: { Key: string; Value: string; })
                {
                    data[el.Key] = el.Value;
                });

                self.Parser.CurrentLanguage = data;
            }

            if (save === true)
            {
                self.DataConfig["language"] = data;

                self.Log("Save Language-Data to Cache");

                self.Parser.SaveDataStore();
            }
            else if (typeof (self.DataConfig["language"]) !== "undefined")
            {
                delete self.DataConfig["language"];

                self.Parser.SaveDataStore();
            }


        });
    }


    /**
     *   Updates the current script to the newest Version
     */
    public UpdateScript()
    {
        if (this.Config.api_autoIncludeNewVersion)
        {
            if (this.DEBUG)
            {
                console.log("Loading new Version from Server");
            }

            var self = this;
            //this.Request(MessageType.getCurrent, { data: this.BRANCH }, function (res)
            this.Request("VersionHub", "GetCurrent", [this.BRANCH], (res) =>
            {
                //console.log("Script: ", res);

                self.Parser.SaveToMemory(localStorage, "ffnet-Script", { script: res });

                if (self.DEBUG)
                {
                    console.log("New Version Recieved");
                }

            });
        }
    }

    /**
     *   Get all new Messages from the Server
     *   @param callback Callback after success
     */
    public GetMessages(callback: (result: any) => void)
    {
        //var data = {
        //    Token: this.Config.token,
        //    Version: this.VERSION
        //};

        //this.Request(MessageType.getMessages, { data: JSON.stringify(data) }, function (result)
        this.Request("MessageHub", "GetMessages", [this.Config.token], (response) =>
        {

            callback(response);

        });

    }

    /**
     *   Tell the remote Server, that all new messages have been read
     */
    public MarkMessages()
    {
        delete this.DataConfig['messages'];
        this.Parser.SaveDataStore();

        //$(".ffnetMessageContainer img").attr("src", this.getUrl("message-white.png"));
        //$(".ffnetMessageContainer").css("background-color", "");
        $(".ffnetMessageContainer").find(".badge").remove();
        $(".ffnet-messageCount").text("0");


        //this.Request(MessageType.readMessages, { data: this.Config.token }, function (result)
        this.Request("MessageHub", "SetAsRead", [this.Config.token], (res) => { });

    }

    /**
    *   Gets the Information of all read Chapters of a certain Story
    *   @param storyIDs The List of StoryIds to check
    *   @param callback The Callback Function with the Server Information
    */
    public GetReadChapters(storyIDs: string[], callback: (result: { [index: string]: number[] }, lastChapter: { [index: string]: number }) => void)
    {
        var request =
            {
                Token: this.Config.token,
                Chapters: storyIDs
            };

        if (storyIDs === undefined)
        {
            callback(undefined, undefined);
            return;
        }

        if (storyIDs.length > 5)
        {
            var queue: string[][] = [];

            for (var i = 0; i < storyIDs.length / 5; i++)
            {
                var elements: string[] = [];

                for (var j = 0; j < 5; j++)
                {
                    var id = i * 5 + j;
                    var data = storyIDs[id];
                    if (data !== undefined)
                    {
                        elements.push(data);
                    }
                }

                queue.push(elements);
            }

            if (this.DEBUG)
            {
                console.log("Get Story Info Queue: ", queue);
            }

            var index = 0;
            var outResult: { [index: string]: number[] } = {};
            var outLastChapter: { [index: string]: number } = {};

            var dataCallback = (result: { [index: string]: number[] }, lastChapter: { [index: string]: number }) =>
            {
                if (this.DEBUG)
                {
                    console.log("Get Story Info call Number: ", index);
                }
                outResult = $.extend(outResult, result);
                outLastChapter = $.extend(outLastChapter, lastChapter);

                if (index < queue.length)
                {
                    index += 1;
                    this.GetReadChapters(queue[index], dataCallback);
                }
                else
                {
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
        this.Request("StoryHub", "GetStoryInfo", [this.Config.token, storyIDs],
            function (data: {
                Data: { Key: string; Value: number[] }[];
                LastChapter: {
                    Key: string; Value: string;
                }
            })
            {
                var result: { [index: string]: number[] } = {};
                var lastChapter: { [index: string]: number } = {};

                $.each(data.Data, function (i, line)
                {
                    result[line.Key] = line.Value;
                });

                $.each(data.LastChapter, function (i, line)
                {
                    lastChapter[line.Key] = line.Value;
                });

                callback(result, lastChapter);
            });


    }

    public GetUrl(path: string): string
    {
        return "https://www.mrh-development.de/static/ff/" + path;
    }


}

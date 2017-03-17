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

    private _requestQueue : (() => void )[] = [];

    //private _useCors: boolean = true;

    //private _useHTTPS: boolean = true;


    public constructor(parser: StoryParser)
    {
        super(parser);
    }

    public Initialize()
    {
        //// Check if we use HTTPS
        //this._useHTTPS = this.Config.api_url.toLowerCase().indexOf("https") !== -1;

        //// Check for CORS:
        //this._useCors = 'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest();

        this.ConnectToServer();
    }

    /**
     *   Generic API-Request
     *   @param data Request Options
     *   @param callback Function executed after result was found
     */
    //public Request(command: MessageType, data: any, callback: (result: string) => void)
    //{
    //    var url = this.Config.api_url;
    //    var apiLookupKey = this.Config.api_lookupKey;
    //    var timeout = this.Config.api_timeout;
    //    var retries = this.Config.api_retries;

    //    data.command = MessageType[command];

    //    this.EventHandler.CallEvent(Events.PreApiRequest, this, data);

    //    if (this._useCors)
    //    {
    //        this.CorsRequest(url, data, callback);
    //    }
    //    else
    //    {
    //        console.warn("Your Browser doesn't support CORS. You are using the deprecated API-Feature. This feature will be removed in later releases");

    //        this.JsonPRequest(url, data, apiLookupKey, timeout, retries, callback);
    //    }
    //}

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

                hub.client[name] = (json) =>
                {
                    self.Response(hubName, name, JSON.parse(json));
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

        try
        {
            this._requestData[hub][methode][messageID](data.Reponse);
        }
        finally
        {
            delete this._requestData[hub][methode][messageID];
        }
    }

    /* /SignalR */

    private CorsRequest(url: string, data: any, callback: (result: string) => void)
    {
        var self = this;

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
                self.Log("Got Result from Server: ", result);

                var data = result.Data[0].Value;

                self.EventHandler.CallEvent(Events.OnApiResult, this, data);

                callback(data);

            })
            .fail(function (state)
            {
                console.error("[FFNet-Parser] Error while fetching Result from Server: ", state);
            });

    }

    private JsonPRequest(url: string, data: any, apiLookupKey: string, timeout: Number, retries: Number, callback: (result: string) => void)
    {
        var self = this;

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

            if (tries >= retries)
            {
                if (self.DEBUG)
                {
                    console.log("API_Request - To many tries, abort for ", data);
                }

                return;
            }

            if ((typeof (sessionStorage[apiLookupKey + messageID]) !== "undefined") &&
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

                this.eventHandler.callEvent("onAPIResult", this, result);

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




    /**
    *   Checks the current Version
    */
    public CheckVersion()
    {
        if ((this.Config.api_checkForUpdates || this.Config.enable_read_chapter_info))
        {
            var statisticData =
                {
                    Version: this.VERSION,
                    Token: this.Config.token,
                    Nested: (typeof (sessionStorage["ffnet-mutex"]) !== "undefined") ? true : false,
                    Branch: this.BRANCH,
                    Page: window.location.href,
                    Chrome: (typeof (chrome) !== "undefined") && (typeof (chrome.runtime) !== "undefined"),
                    Language: this.Config.language
                };

            if (this.DEBUG && this.Config.api_checkForUpdates)
            {
                console.info("Check for Updates ...");
                console.log("Sending Statistic Data: ", statisticData);
            }

            var requestData = JSON.stringify(statisticData);

            var self = this;

            //this.Request(MessageType.getVersion, { data: requestData }, function (res)
            this.Request("VersionHub", "GetVersion", [requestData], (res) =>
            {
                if (!self.Config.api_checkForUpdates)
                {
                    // This is needed.
                    // If the Update System is deactivated, but the Read Chapter Info Function is activated.
                    // In that case, the Update Info is ignored.

                    return;
                }

                if ((typeof (chrome) !== "undefined") && (typeof (chrome.runtime) !== "undefined"))
                {
                    self.Log("Ignore Update Info on Chrome Devices");

                    return;
                }

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
        this.Request("ChatHub", "LiveChatInfo", [], (res) =>
        {
            if (self.DEBUG)
            {
                self.Log("Got Live-Chat Info Response from Server: ", res);
            }

            try
            {
                var data = <{ Users: string[]; WebUsers: string[]; DevInRoom: boolean; }>JSON.parse(res);

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
        this.Request("LanguageHub", "GetLanguageList", [], (res) =>
        {
            var result = <LanguageData[]>JSON.parse(res);

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
        this.Request("LanguageHub", "GetLanguage", [languageCode], (res) =>
        {
            var result = <LanguageData>JSON.parse(res);

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
        this.Request("MessageHub", "GetMessages", [this.Config.token], (result) =>
        {
            var response = JSON.parse(result);

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
            function (res)
            {
                var data = <{
                    Data: { Key: string; Value: number[] }[];
                    LastChapter: {
                        Key: string; Value: string;
                    }
                }>JSON.parse(res);
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

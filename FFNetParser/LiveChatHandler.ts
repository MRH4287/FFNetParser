class LiveChatHandler extends ExtentionBaseClass
{
    public constructor(parser: StoryParser)
    {
        super(parser);
    }

    private socket: WebSocket = null;

    private connected: boolean = false;

    private nicks: string[] = [
        "Mew",
        "Pichufan",
        "Invocate"
    ];

    private messageCallback: (data: WebSocketMessage) => void = function (e) { };

    public onError: (message: string) => void;

    public connect()
    {
        var self = this;

        var address = this.config.api_webSocketServerAddress;

        // Test-Value
        //
        //var address = "ws://127.0.0.1:8182";

        this.socket = new WebSocket(address);
        this.socket.onopen = function (e)
        {
            self.connected = true;

            self.sendJoinedMessage();

            if (typeof (self.messageCallback) !== "undefined")
            {
                var message: WebSocketMessage = {
                    Data: self._("Connected to Server"),
                    Sender: "System",
                    Time: Date.now().toString(),
                    Type: "Chat"
                };


                self.messageCallback(message);

                self.updateUserList();
            }

        };

        this.socket.onmessage = function (data)
        {
            self.onMessage(data, self);
        };
        this.socket.onerror = function (ev)
        {
            self.parser.log("Error with the Socket Connection!", ev);

            if (typeof (self.onError) !== "undefined")
            {
                self.onError(self._("Error with the Socket Connection! Please reload the page and try again!"));
            } 

        };

    }

    public updateUserList()
    {
        if (this.connected && ($('.ChatUserInfo').length > 0))
        {
            var self = this;
            this.parser.api_getLiveChatInfo(function (res)
            {
                var count = res.Users.length + res.WebUsers.length;

                var users: string[] = [];

                $.each(res.Users, function (i, userName)
                {
                    users.push(userName);
                });

                $.each(res.WebUsers, function (i, userName)
                {
                    users.push('[Web] ' + userName);
                });

                $('.ChatUserInfo').text(self._('Online') + ': (' + count + ')')
                    .attr("title", users.join(', '));

                window.setTimeout(function ()
                {
                    self.updateUserList();
                }, 5000);
            });



        }

    }

    public disconnect()
    {
        this.socket.close();
    }

    public get Available()
    {
        return ("WebSocket" in window);
    }


    private sendJoinedMessage()
    {
        var data: WebSocketMessage =
            {
                Data: "",
                Sender: this.config.token,
                Time: Date.now().toString(),
                Type: "Joined"
            };
        this.send(data);
    }

    private send(data: WebSocketMessage)
    {
        if (this.socket.readyState === WebSocket.OPEN)
        {
            this.socket.send(JSON.stringify(data));
        }
        else
        {
            this.connected = false;
        }
    }

    private onMessage(data: any, self: LiveChatHandler)
    {
        try
        {
            var message = <WebSocketMessage>JSON.parse(data.data);

            self.log(message);

            if (typeof (self.messageCallback) !== "undefined")
            {
                if (this.nicks.indexOf(message.Sender) !== -1)
                {
                    message.Sender = message.Sender + " [Dev]";
                }

                self.messageCallback(message);
            }
            else
            {
                self.parser.log(self.messageCallback);
                self.parser.log("Message Callback is undefined ....");

            }



        }
        catch (ex)
        {
            if (typeof (self.parser.log) !== "undefined")
            {
                self.parser.log("Error while parsing Message: ", ex);
            }
            else
            {
                console.error("Error while parsing Message: ", ex);
            }
        }
    }

    public sendChatMessage(message: string)
    {
        var data: WebSocketMessage =
            {
                Data: message,
                Sender: this.config.token,
                Time: Date.now().toString(),
                Type: "Chat"
            };

        this.send(data);
    }

    public sendConfigData()
    {
        var data: WebSocketMessage =
            {
                Data: JSON.stringify(this.config),
                Sender: this.config.token,
                Time: Date.now().toString(),
                Type: "Config"
            };

        this.send(data);

        var message: WebSocketMessage = {
            Data: this._("Config-Data sent to Server"),
            Sender: "System",
            Type: "Chat",
            Time: Date.now().toString()
        };

        this.messageCallback(message);

    }


    public setMessageCallback(data: (e: WebSocketMessage) => void)
    {
        this.messageCallback = data;
    }

}

/// <reference path="_reference.ts" /> 
class LiveChatHandler extends ExtentionBaseClass {
    constructor(parser) {
        super(parser);
        this._socket = null;
        this._connected = false;
        this._nicks = [
            "Mew",
            "Pichufan",
            "Invocate"
        ];
        this._messageCallback = function (e) { };
    }
    Connect() {
        var self = this;
        var address = this.Config.api_webSocketServerAddress;
        this._socket = new WebSocket(address);
        this._socket.onopen = function (e) {
            self._connected = true;
            self.SendJoinedMessage();
            if (typeof (self._messageCallback) !== "undefined") {
                var message = {
                    Data: self._("Connected to Server"),
                    Sender: "System",
                    Time: Date.now().toString(),
                    Type: "Chat",
                    Version: self.VERSION
                };
                self._messageCallback(message);
                self.UpdateUserList();
            }
        };
        this._socket.onmessage = function (data) {
            self.OnMessage(data, self);
        };
        this._socket.onerror = function (ev) {
            self.Parser.Log("Error with the Socket Connection!", ev);
            if (typeof (self._onError) !== "undefined") {
                self._onError(self._("Error with the Socket Connection! Please reload the page and try again!"));
            }
        };
    }
    UpdateUserList() {
        if (this._connected && ($('.ChatUserInfo').length > 0)) {
            var self = this;
            this.Parser.Api.GetLiveChatInfo(function (res) {
                var count = res.Users.length + res.WebUsers.length;
                var users = [];
                $.each(res.Users, function (i, userName) {
                    users.push(userName);
                });
                $.each(res.WebUsers, function (i, userName) {
                    users.push('[Web] ' + userName);
                });
                $('.ChatUserInfo').text(self._('Online') + ': (' + count + ')')
                    .attr("title", users.join(', '));
                window.setTimeout(function () {
                    self.UpdateUserList();
                }, 10000);
            });
        }
    }
    Disconnect() {
        if (this._socket !== null && this._socket !== undefined) {
            this._socket.close();
        }
    }
    get Available() {
        return ("WebSocket" in window);
    }
    SendJoinedMessage() {
        var data = {
            Data: "",
            Sender: this.Config.token,
            Time: Date.now().toString(),
            Type: "Joined",
            Version: this.VERSION
        };
        this.Send(data);
    }
    Send(data) {
        if (this._socket.readyState === WebSocket.OPEN) {
            this._socket.send(JSON.stringify(data));
        }
        else {
            this._connected = false;
        }
    }
    OnMessage(data, self) {
        try {
            var message = JSON.parse(data.data);
            self.Log(message);
            if (typeof (self._messageCallback) !== "undefined") {
                if (this._nicks.indexOf(message.Sender) !== -1) {
                    message.Sender = message.Sender + " [Dev]";
                }
                self._messageCallback(message);
            }
            else {
                self.Parser.Log(self._messageCallback);
                self.Parser.Log("Message Callback is undefined ....");
            }
        }
        catch (ex) {
            if (typeof (self.Parser.Log) !== "undefined") {
                self.Parser.Log("Error while parsing Message: ", ex);
            }
            else {
                console.error("Error while parsing Message: ", ex);
            }
        }
    }
    SendChatMessage(message) {
        var data = {
            Data: message,
            Sender: this.Config.token,
            Time: Date.now().toString(),
            Type: "Chat",
            Version: this.VERSION
        };
        this.Send(data);
    }
    SendConfigData() {
        var data = {
            Data: JSON.stringify(this.Config),
            Sender: this.Config.token,
            Time: Date.now().toString(),
            Type: "Config",
            Version: this.VERSION
        };
        this.Send(data);
        var message = {
            Data: this._("Config-Data sent to Server"),
            Sender: "System",
            Type: "Chat",
            Time: Date.now().toString(),
            Version: this.VERSION
        };
        this._messageCallback(message);
    }
    SetMessageCallback(data) {
        this._messageCallback = data;
    }
}

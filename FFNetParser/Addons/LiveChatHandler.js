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
var LiveChatHandler = (function (_super) {
    __extends(LiveChatHandler, _super);
    function LiveChatHandler(parser) {
        var _this = _super.call(this, parser) || this;
        _this._socket = null;
        _this._connected = false;
        _this._nicks = [
            "Mew",
            "Pichufan",
            "Invocate"
        ];
        _this._messageCallback = function (e) { };
        _this.EventHandler.AddRequestEventListener(Events.RequestLiveChatAvailable, function (s, i) { return _this.Available; });
        return _this;
    }
    LiveChatHandler.prototype.Connect = function () {
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
    };
    LiveChatHandler.prototype.UpdateUserList = function () {
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
    };
    LiveChatHandler.prototype.Disconnect = function () {
        if (this._socket !== null && this._socket !== undefined) {
            this._socket.close();
        }
    };
    Object.defineProperty(LiveChatHandler.prototype, "Available", {
        get: function () {
            return ("WebSocket" in window);
        },
        enumerable: true,
        configurable: true
    });
    LiveChatHandler.prototype.SendJoinedMessage = function () {
        var data = {
            Data: "",
            Sender: this.Config.token,
            Time: Date.now().toString(),
            Type: "Joined",
            Version: this.VERSION
        };
        this.Send(data);
    };
    LiveChatHandler.prototype.Send = function (data) {
        if (this._socket.readyState === WebSocket.OPEN) {
            this._socket.send(JSON.stringify(data));
        }
        else {
            this._connected = false;
        }
    };
    LiveChatHandler.prototype.OnMessage = function (data, self) {
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
    };
    LiveChatHandler.prototype.SendChatMessage = function (message) {
        var data = {
            Data: message,
            Sender: this.Config.token,
            Time: Date.now().toString(),
            Type: "Chat",
            Version: this.VERSION
        };
        this.Send(data);
    };
    LiveChatHandler.prototype.SendConfigData = function () {
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
    };
    LiveChatHandler.prototype.SetMessageCallback = function (data) {
        this._messageCallback = data;
    };
    return LiveChatHandler;
}(ExtentionBaseClass));
//# sourceMappingURL=LiveChatHandler.js.map
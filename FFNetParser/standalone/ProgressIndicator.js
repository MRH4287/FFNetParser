/// <reference path="standalone.ts" /> 
/**
 * Used to indicate the Progress of a Request
 */
var ProgressIndicator = (function () {
    function ProgressIndicator(config) {
        this._lastMessage = "Init";
        this._visible = false;
        this._config = {
            container: "#progress"
        };
        this._eventMessageMap = {};
        this._config = $.extend(this._config, config);
        this.InitEventMessageMap();
        this.InitGUI();
    }
    ProgressIndicator.prototype.InitEventMessageMap = function () {
        this._eventMessageMap["onConfigLoad"] = "Config Loaded";
        this._eventMessageMap["preGUIUpdate"] = "Begin GUI-Update";
        this._eventMessageMap["postGUIUpdate"] = "GUI-Update Done";
        this._eventMessageMap["preReadList"] = "Begin Parsing of Page";
        this._eventMessageMap["postReadList"] = "Page parsed successfully";
        this._eventMessageMap["preRead"] = "Parsing Story-List";
        this._eventMessageMap["postRead"] = "Story-List parsed successfully";
        this._eventMessageMap["standaloneInit"] = "System Start";
        this._eventMessageMap["standaloneClearPage"] = "Page cleared";
        this._eventMessageMap["standalonePreUpdatePage"] = "Prepare Page Update";
        this._eventMessageMap["standalonePostUpdatePage"] = "Page Update done";
        this._eventMessageMap["standaloneRunScript"] = "Base-Script loaded";
        this._eventMessageMap["standalonePreRequest"] = "Starting Web-Request";
        this._eventMessageMap["standaloneOnRequestDone"] = "Web-Request Done";
        this._eventMessageMap["standaloneOnRequestFail"] = "Web-Request Failed";
        this._eventMessageMap["standalonePreRequestCategories"] = "Requesting Categories";
        this._eventMessageMap["standalonePostCategoriesRequest"] = "Got Categories";
        this._eventMessageMap["standaloneCategoriesParsed"] = "Categories parsed successfully";
        this._eventMessageMap["standalonePreRequestElements"] = "Requesting Elements";
        this._eventMessageMap["standalonePostRequestElements"] = "Got Elements";
        this._eventMessageMap["standaloneElementsParsed"] = "Elements parsed successfully";
    };
    ProgressIndicator.prototype.SetEventHandler = function (eventHandler) {
        this._eventHandler = eventHandler;
        this.RegisterEvents();
    };
    ProgressIndicator.prototype.RegisterEvents = function () {
        var _this = this;
        $.each(this._eventMessageMap, function (key, value) {
            _this._eventHandler.AddEventListener(key, function (sender, args) {
                _this.HandleEvent(sender, key, args);
            });
        });
    };
    ProgressIndicator.prototype.HandleEvent = function (sender, event, args) {
        var message = this._eventMessageMap[event];
        this._lastMessage = message;
        console.log("Progress: " + message);
        $(this._config.container).find(".messageContainer").text(message);
    };
    ProgressIndicator.prototype.Show = function () {
        $(this._config.container).show();
        this._visible = true;
    };
    ProgressIndicator.prototype.Hide = function () {
        $(this._config.container).hide();
        this._visible = false;
    };
    ProgressIndicator.prototype.InitGUI = function () {
        var _this = this;
        var container = $('<div class="row"></div>');
        container.append('<div class="col-md-12"><h2>Loading ...</h2></div>');
        container.append('<div class="col-md-12">Status: <b class="messageContainer">' + this._lastMessage + '</b></div>');
        $(document).ready(function () {
            $(_this._config.container).append(container)
                .find(".messageContainer").text(_this._lastMessage);
            if (!_this._visible) {
                $(_this._config.container).hide();
            }
        });
    };
    return ProgressIndicator;
}());
//# sourceMappingURL=ProgressIndicator.js.map
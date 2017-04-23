/// <reference path="standalone.ts" /> 

/**
 * Used to indicate the Progress of a Request
 */
class ProgressIndicator
{
    private _eventHandler: EventHandler;
    private _lastMessage = "Init";
    private _visible = false;

    private _config =
    {
        container: "#progress"
    };

    private _eventMessageMap: { [index: string]: string } = {};

    constructor(config?)
    {
        this._config = $.extend(this._config, config);

        this.InitEventMessageMap();
        this.InitGUI();      
    }

    private InitEventMessageMap()
    {
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

    }

    public SetEventHandler(eventHandler: EventHandler)
    {
        this._eventHandler = eventHandler;
        this.RegisterEvents();
    }

    private RegisterEvents()
    {
        $.each(this._eventMessageMap, (key, value) =>
        {
            this._eventHandler.AddEventListener(key, (sender, args) =>
            {
                this.HandleEvent(sender, key, args);
            });
        });
    }

    private HandleEvent(sender: any, event: string, args: any)
    {
        var message = this._eventMessageMap[event];
        this._lastMessage = message;

        console.log("Progress: " + message);
        $(this._config.container).find(".messageContainer").text(message);
    }


    public Show()
    {
        $(this._config.container).show();
        this._visible = true;
    }

    public Hide()
    {
        $(this._config.container).hide();
        this._visible = false;
    }

    private InitGUI()
    {
        var container = $('<div class="row"></div>');
        container.append('<div class="col-md-12"><h2>Loading ...</h2></div>');
        container.append('<div class="col-md-12">Status: <b class="messageContainer">'+ this._lastMessage + '</b></div>');

        $(document).ready(() =>
        {
            $(this._config.container).append(container)
                .find(".messageContainer").text(this._lastMessage);

            if (!this._visible)
            {             
                $(this._config.container).hide();
            }
        });
    }

}

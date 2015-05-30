/// <reference path="standalone.ts" /> 

/**
 * Used to indicate the Progress of a Request
 */
class ProgressIndicator
{
    private eventHandler: EventHandler;
    private lastMessage = "Init";
    private visible = false;

    private config =
    {
        container: "#progress"
    };

    private eventMessageMap: { [index: string]: string } = {};

    constructor(config?)
    {
        this.config = $.extend(this.config, config);

        this.initEventMessageMap();
        this.initGUI();      
    }

    private initEventMessageMap()
    {
        this.eventMessageMap["onConfigLoad"] = "Config Loaded";
        this.eventMessageMap["preGUIUpdate"] = "Begin GUI-Update";
        this.eventMessageMap["postGUIUpdate"] = "GUI-Update Done";
        this.eventMessageMap["preReadList"] = "Begin Parsing of Page";
        this.eventMessageMap["postReadList"] = "Page parsed successfully";
        this.eventMessageMap["preRead"] = "Parsing Story-List";
        this.eventMessageMap["postRead"] = "Story-List parsed successfully";

        this.eventMessageMap["standaloneInit"] = "System Start";
        this.eventMessageMap["standaloneClearPage"] = "Page cleared";
        this.eventMessageMap["standalonePreUpdatePage"] = "Prepare Page Update";
        this.eventMessageMap["standalonePostUpdatePage"] = "Page Update done";
        this.eventMessageMap["standaloneRunScript"] = "Base-Script loaded";
        this.eventMessageMap["standalonePreRequest"] = "Starting Web-Request";
        this.eventMessageMap["standaloneOnRequestDone"] = "Web-Request Done";
        this.eventMessageMap["standaloneOnRequestFail"] = "Web-Request Failed";
        this.eventMessageMap["standalonePreRequestCategories"] = "Requesting Categories";
        this.eventMessageMap["standalonePostCategoriesRequest"] = "Got Categories";
        this.eventMessageMap["standaloneCategoriesParsed"] = "Categories parsed successfully";
        this.eventMessageMap["standalonePreRequestElements"] = "Requesting Elements";
        this.eventMessageMap["standalonePostRequestElements"] = "Got Elements";
        this.eventMessageMap["standaloneElementsParsed"] = "Elements parsed successfully";

    }

    public setEventHandler(eventHandler: EventHandler)
    {
        this.eventHandler = eventHandler;
        this.registerEvents();
    }

    private registerEvents()
    {
        $.each(this.eventMessageMap, (key, value) =>
        {
            this.eventHandler.addEventListener(key, (sender, args) =>
            {
                this.handleEvent(sender, key, args);
            });
        });
    }

    private handleEvent(sender: any, event: string, args: any)
    {
        var message = this.eventMessageMap[event];
        this.lastMessage = message;

        console.log("Progress: " + message);
        $(this.config.container).find(".messageContainer").text(message);
    }


    public show()
    {
        $(this.config.container).show();
        this.visible = true;
    }

    public hide()
    {
        $(this.config.container).hide();
        this.visible = false;
    }

    private initGUI()
    {
        var container = $('<div class="row"></div>');
        container.append('<div class="col-md-12"><h2>Loading ...</h2></div>');
        container.append('<div class="col-md-12">Status: <b class="messageContainer">'+ this.lastMessage + '</b></div>');

        $(document).ready(() =>
        {
            $(this.config.container).append(container)
                .find(".messageContainer").text(this.lastMessage);

            if (!this.visible)
            {             
                $(this.config.container).hide();
            }
        });
    }

}
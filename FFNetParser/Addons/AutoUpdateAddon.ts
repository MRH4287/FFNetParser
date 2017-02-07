/// <reference path="../_reference.ts" />

class AutoUpdateAddon extends ExtentionBaseClass
{
    public constructor(parser: StoryParser)
    {
        super(parser);

        var self = this;

        this.EventHandler.AddEventListener(Events.OnLoad, (sender, args) =>
        {
            if (typeof (this.Config["api_autoIncludeNewVersion"]) === "undefined")
            {
                // Only Check if the Script is not loaded over Chrome!
                if ((typeof (chrome) === "undefined") || (typeof (chrome.runtime) === "undefined"))
                {

                    // Creates Warning for new Feature:

                    var text = "<div><b>Please Read!</b><br />";
                    text += "In one of the previous version, a new feature has been implemented. With this Feature activated, you don't have to manually install new Versions. ";
                    text += "Newer Versions will be saved in your Local Storage and then executed. Because of that, the Version Number displayed in your UserScript Manager ";
                    text += "can be wrong. To Display the Version Number, check your Menu.";
                    text += "Do you want to activate this Feature?</div>";

                    var buttons: JQuery[] = [];
                    var modal: JQuery;

                    buttons.push($('<button class="btn btn-primary">Enable Feature</button>').click(() =>
                    {
                        modal.modal('hide');

                        self.Config['api_autoIncludeNewVersion'] = true;
                        self.EventHandler.CallEvent(Events.ActionForceSaveConfig, self, undefined);

                    }));

                    buttons.push($('<button class="btn btn-default">Keep Disabled</button>').click(() =>
                    {
                        modal.modal('hide');

                        self.Config['api_autoIncludeNewVersion'] = false;
                        self.EventHandler.CallEvent(Events.ActionForceSaveConfig, self, undefined);
                    }));

                    modal = GUIHandler.CreateBootstrapModal($(text), "Fanfiction Story Parser", buttons);


                    window.setTimeout(function ()
                    {
                        GUIHandler.ShowModal(modal);

                    }, 1000);
                }
                else
                {
                    self.Config['api_autoIncludeNewVersion'] = false;
                    self.EventHandler.CallEvent(Events.ActionForceSaveConfig, self, undefined);
                }
            }
        });
    }
}



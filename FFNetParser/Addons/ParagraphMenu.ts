/// <reference path="../_reference.ts" />

/**
 * The Class for the Story Remainer Menu
 */
class ParagraphMenu
    extends ExtentionBaseClass
{
    private _menu: JQuery = null;
    private _button: JQuery = null;
    private _menuElement: JQuery = null;

    private _baseElement: JQuery = null;

    constructor(parser: StoryParser)
    {
        super(parser);

        var self = this;

        this.EventHandler.AddEventListener(Events.OnLoad, (s, a) =>
        {
            if (!this.Config.disable_parahraphMenu)
            {
                parser.Log("Paragraph Menu loading ...");

                var self = this;
                $("window").resize(function ()
                {
                    if (self._baseElement !== null)
                    {
                        self.SetPosition(self._baseElement);
                    }

                });

                // Add Logic to the Paragraph Elements on the Page:
                this.AddHandler($("body"));
            }
        });

        this.EventHandler.AddEventListener(Events.PostInit, (s, a) =>
        {
            window.setTimeout(function ()
            {
                self.EventHandler.CallEvent(Events.PreParagraphCheck, self, null);

                // Check if a Paragraph is given in the current request:
                var reg = new RegExp(".+#paragraph=([0-9]+)");
                if (reg.test(location.href))
                {
                    var match = reg.exec(location.href);
                    self.GoToParagraphID(Number(match[1]));
                }
            }, 1000);
        });

    }

    /**
     * Adds EventHandler to the Paragraph Elements of the Page
     * @param container The element, that contains the Paragraphs
     */
    public AddHandler(container: JQuery)
    {
        var self = this;
        var i = 0;

        container.find("p").each(function ()
        {
            var el = $(this);
            el.mouseover(function ()
            {
                self.SetPosition($(this));
            });

            el.attr("data-paragraphNumber", i++);
        });
    }


    private BuildMenu()
    {
        var self = this;

        this._menu = $('<div class="paragraphMenu"></div>').appendTo($("body"));
        this._button = $('<div class="button">' + self._('Menu') + ' ▼</div>').appendTo(this._menu);
        this._menuElement = $("<ul></ul>").appendTo(this._menu);

        $("<li>" + self._('Save Position') + "</li>").appendTo(this._menuElement).click(function ()
        {
            self._menuElement.fadeOut();

            self.SaveStoryPosition();
        });

        $("<li>" + self._('Get Link to this Position') + "</li>").appendTo(this._menuElement)
            .click(function (event)
            {
                event.preventDefault();
                self._menuElement.fadeOut();

                var paragraphNumber = Number(self._baseElement.attr("data-paragraphNumber"));

                var infoRequest: RequestGetStoryInfoEventArgs = {
                    Link: location.href
                };
                var data = self.EventHandler.RequestResponse<StoryInfo>(Events.RequestGetStoryInfo, self, infoRequest);

                var page = data.Chapter;
                var getLinkRequest: RequestGetLinkToPageNumberEventArgs = {
                    Page: Number(page)
                };
                var url = self.EventHandler.RequestResponse<string>(Events.RequestGetLinkToPageNumber, self, getLinkRequest);


                var modal = GUIHandler.CreateBootstrapModal($("<pre></pre>").text(url + "#paragraph=" + paragraphNumber), self._("Link for this Position"));
                GUIHandler.ShowModal(modal);

            });


        // Add Click Logic Here :3
        this._button.click(function ()
        {
            self._menuElement.fadeIn();
        });

        this._menu.mouseleave(function ()
        {
            self._menuElement.fadeOut();
        });

        this._menu.mouseenter(function ()
        {
            self._button.addClass("active");
        }).mouseleave(function ()
        {
            self._button.removeClass("active");
        });

        this.Log("Paragraph Menu Container built");
    }

    private SaveStoryPosition()
    {
        var paragraphNumber = Number(this._baseElement.attr("data-paragraphNumber"));

        var infoRequest: RequestGetStoryInfoEventArgs = {
            Link: document.location.href
        };
        var data = this.EventHandler.RequestResponse<StoryInfo>(Events.RequestGetStoryInfo, this, infoRequest);


        var page = data.Chapter;
        var getLinkRequest: RequestGetLinkToPageNumberEventArgs = {
            Page: Number(page)
        };
        var url = this.EventHandler.RequestResponse<string>(Events.RequestGetLinkToPageNumber, self, getLinkRequest);


        var storyID = data.ID;

        if (typeof (this.Config.storyReminder[storyID]) !== "undefined")
        {
            if (!confirm(this._('There is already a reminder for this StoryID. Overwrite?')))
            {
                return;
            }
        }

        var element: StoryReminderData = {
            storyID: data.ID,
            chapter: Number(data.Chapter),
            name: data.Name,
            paragraphID: paragraphNumber,
            time: Date.now(),
            visited: false,
            url: url + "#paragraph=" + paragraphNumber
        };

        this.Config.storyReminder[data.ID] = element;
        this.EventHandler.CallEvent(Events.ActionForceSaveConfig, this, undefined);

        this.Log("Position Saved!");
    }

    public SetPosition(base: JQuery)
    {
        this._baseElement = base;

        if (this._menu === null)
        {
            this.BuildMenu();
        }

        var basePosition = base.position();
        var width = this._button.width();
        var height = this._button.height();

        var top = (basePosition.top - height);
        var left = (basePosition.left + base.width() - width);

        //this.parser.log("Set Position of Menu to: Top: " + top + " Left: " + left);

        this._menu.css("top", top + "px").css("left", left + "px");

    }
}

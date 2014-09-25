/**
 * The Class for the Story Remainer Menu
 */
class ParagraphMenu
{
    private parser: StoryParser = null;

    private menu: JQuery = null;
    private button: JQuery = null;
    private menuElement: JQuery = null;

    private baseElement: JQuery = null;

    constructor(parser: StoryParser)
    {
        this.parser = parser;

        parser.log("Paragraph Menu loading ...");

        var self = this;
        $("window").resize(function ()
        {
            if (self.baseElement !== null)
            {
                self.setPosition(self.baseElement);
            }

        });

        // Add Logic to the Paragraph Elements on the Page:
        this.addHandler($("body"));

    }

    /**
     * Adds EventHandler to the Paragraph Elements of the Page
     * @param container The element, that contains the Paragraphs
     */
    public addHandler(container: JQuery)
    {
        var self = this;
        var i = 0;

        container.find("p").each(function ()
        {
            var el = $(this);
            el.mouseover(function ()
            {
                self.setPosition($(this));
            });

            el.attr("data-paragraphNumber", i++);
        });
    }


    private buildMenu()
    {
        var self = this;

        this.menu = $('<div class="paragraphMenu"></div>').appendTo($("body"));
        this.button = $('<div class="button">Menu ▼</div>').appendTo(this.menu);
        this.menuElement = $("<ul></ul>").appendTo(this.menu);

        $("<li>Save Position</li>").appendTo(this.menuElement).click(function ()
        {
            self.menuElement.fadeOut();

            self.saveStoryPosition();
        });

        $("<li>Get Link to this Position</li>").appendTo(this.menuElement)
            .click(function (event)
            {
                event.preventDefault();
                self.menuElement.fadeOut();

                var paragraphNumber = Number(self.baseElement.attr("data-paragraphNumber"));

                var data = self.getStoryData();
  
                var page = data.Chapter;
                var url = self.parser.getLinkToPageNumber(page);


                // Create Dialog:
                var dialog = $('<div></div>').attr("title", "Link for this Position")
                    .append(
                    $("<pre></pre>").text(url + "#paragraph=" + paragraphNumber)
                    ).appendTo($("body"));

                dialog.dialog({
                    close: function (event, ui) 
                    {
                        dialog.remove();
                    }
                });
            });


        // Add Click Logic Here :3
        this.button.click(function ()
        {
            self.menuElement.fadeIn();
        });

        this.menu.mouseleave(function ()
        {
            self.menuElement.fadeOut();
        });

        this.menu.mouseenter(function ()
        {
            self.button.addClass("active");
        }).mouseleave(function ()
            {
                self.button.removeClass("active");
            });

        this.parser.log("Paragraph Menu Container built");
    }

    private saveStoryPosition()
    {
        var paragraphNumber = Number(this.baseElement.attr("data-paragraphNumber"));

        var data = this.getStoryData();

        /*var urlReg = new RegExp("([^#]+)(?:#.+)?");
        var url = urlReg.exec(location.href)[1];*/

        var page = data.Chapter;
        var url = this.parser.getLinkToPageNumber(page);

        var storyID = data.ID;

        if (typeof (this.parser.config.storyReminder[storyID]) !== "undefined")
        {
            if (!confirm("There is already a reminder for this StoryID. Overwrite?"))
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

        this.parser.config.storyReminder[data.ID] = element;
        this.parser.save_config();

        this.parser.log("Position Saved!");
    }


    private getStoryData()
    {
        var reg = new RegExp(".+/s/([0-9]+)/(?:([0-9]+)/?)?(?:([^#]+)/?)?");

        var result = reg.exec(location.href);

        var chapter = Number(this.baseElement.parent().attr("data-page"));

        return {
            "ID": result[1],
            "Chapter": chapter,
            "Name": result[3]
        };
    }

    public setPosition(base: JQuery)
    {
        this.baseElement = base;

        if (this.menu === null)
        {
            this.buildMenu();
        }

        var basePosition = base.position();
        var width = this.button.width();
        var height = this.button.height();

        var top = (basePosition.top - height);
        var left = (basePosition.left + base.width() - width);

        //this.parser.log("Set Position of Menu to: Top: " + top + " Left: " + left);

        this.menu.css("top", top + "px").css("left", left + "px");

    }
}

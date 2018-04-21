/// <reference path="_reference.ts" /> 
/**
 * The Class for the Story Remainer Menu
 */
class ParagraphMenu {
    constructor(parser) {
        this._parser = null;
        this._menu = null;
        this._button = null;
        this._menuElement = null;
        this._baseElement = null;
        this._parser = parser;
        parser.Log("Paragraph Menu loading ...");
        var self = this;
        $("window").resize(function () {
            if (self._baseElement !== null) {
                self.SetPosition(self._baseElement);
            }
        });
        // Add Logic to the Paragraph Elements on the Page:
        this.AddHandler($("body"));
    }
    /**
     * Adds EventHandler to the Paragraph Elements of the Page
     * @param container The element, that contains the Paragraphs
     */
    AddHandler(container) {
        var self = this;
        var i = 0;
        container.find("p").each(function () {
            var el = $(this);
            el.mouseover(function () {
                self.SetPosition($(this));
            });
            el.attr("data-paragraphNumber", i++);
        });
    }
    BuildMenu() {
        var self = this;
        this._menu = $('<div class="paragraphMenu"></div>').appendTo($("body"));
        this._button = $('<div class="button">' + self._parser._('Menu') + ' ▼</div>').appendTo(this._menu);
        this._menuElement = $("<ul></ul>").appendTo(this._menu);
        $("<li>" + self._parser._('Save Position') + "</li>").appendTo(this._menuElement).click(function () {
            self._menuElement.fadeOut();
            self.SaveStoryPosition();
        });
        $("<li>" + self._parser._('Get Link to this Position') + "</li>").appendTo(this._menuElement)
            .click(function (event) {
            event.preventDefault();
            self._menuElement.fadeOut();
            var paragraphNumber = Number(self._baseElement.attr("data-paragraphNumber"));
            var data = self.GetStoryData();
            var page = data.Chapter;
            var url = self._parser.GetLinkToPageNumber(page);
            var modal = GUIHandler.CreateBootstrapModal($("<pre></pre>").text(url + "#paragraph=" + paragraphNumber), self._parser._("Link for this Position"));
            GUIHandler.ShowModal(modal);
        });
        // Add Click Logic Here :3
        this._button.click(function () {
            self._menuElement.fadeIn();
        });
        this._menu.mouseleave(function () {
            self._menuElement.fadeOut();
        });
        this._menu.mouseenter(function () {
            self._button.addClass("active");
        }).mouseleave(function () {
            self._button.removeClass("active");
        });
        this._parser.Log("Paragraph Menu Container built");
    }
    SaveStoryPosition() {
        var paragraphNumber = Number(this._baseElement.attr("data-paragraphNumber"));
        var data = this.GetStoryData();
        /*var urlReg = new RegExp("([^#]+)(?:#.+)?");
        var url = urlReg.exec(location.href)[1];*/
        var page = data.Chapter;
        var url = this._parser.GetLinkToPageNumber(page);
        var storyID = data.ID;
        if (typeof (this._parser.Config.storyReminder[storyID]) !== "undefined") {
            if (!confirm(this._parser._('There is already a reminder for this StoryID. Overwrite?'))) {
                return;
            }
        }
        var element = {
            storyID: data.ID,
            chapter: Number(data.Chapter),
            name: data.Name,
            paragraphID: paragraphNumber,
            time: Date.now(),
            visited: false,
            url: url + "#paragraph=" + paragraphNumber
        };
        this._parser.Config.storyReminder[data.ID] = element;
        this._parser.SaveConfig();
        this._parser.Log("Position Saved!");
    }
    GetStoryData() {
        var reg = new RegExp(".+/s/([0-9]+)/(?:([0-9]+)/?)?(?:([^#]+)/?)?");
        var result = reg.exec(location.href);
        var chapter = Number(this._baseElement.parent().attr("data-page"));
        return {
            "ID": result[1],
            "Chapter": chapter,
            "Name": result[3]
        };
    }
    SetPosition(base) {
        this._baseElement = base;
        if (this._menu === null) {
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

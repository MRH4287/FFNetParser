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
/**
 * The Class for the Story Remainer Menu
 */
var ParagraphMenu = (function (_super) {
    __extends(ParagraphMenu, _super);
    function ParagraphMenu(parser) {
        var _this = _super.call(this, parser) || this;
        _this._menu = null;
        _this._button = null;
        _this._menuElement = null;
        _this._baseElement = null;
        var self = _this;
        _this.EventHandler.AddEventListener(Events.OnLoad, function (s, a) {
            if (!_this.Config.disable_parahraphMenu) {
                parser.Log("Paragraph Menu loading ...");
                var self = _this;
                $("window").resize(function () {
                    if (self._baseElement !== null) {
                        self.SetPosition(self._baseElement);
                    }
                });
                // Add Logic to the Paragraph Elements on the Page:
                _this.AddHandler($("body"));
            }
        });
        _this.EventHandler.AddEventListener(Events.PostInit, function (s, a) {
            window.setTimeout(function () {
                self.EventHandler.CallEvent(Events.PreParagraphCheck, self, null);
                // Check if a Paragraph is given in the current request:
                var reg = new RegExp(".+#paragraph=([0-9]+)");
                if (reg.test(location.href)) {
                    var match = reg.exec(location.href);
                    self.GoToParagraphID(Number(match[1]));
                }
            }, 1000);
        });
        return _this;
    }
    /**
     * Adds EventHandler to the Paragraph Elements of the Page
     * @param container The element, that contains the Paragraphs
     */
    ParagraphMenu.prototype.AddHandler = function (container) {
        var self = this;
        var i = 0;
        container.find("p").each(function () {
            var el = $(this);
            el.mouseover(function () {
                self.SetPosition($(this));
            });
            el.attr("data-paragraphNumber", i++);
        });
    };
    ParagraphMenu.prototype.BuildMenu = function () {
        var self = this;
        this._menu = $('<div class="paragraphMenu"></div>').appendTo($("body"));
        this._button = $('<div class="button">' + self._('Menu') + ' ▼</div>').appendTo(this._menu);
        this._menuElement = $("<ul></ul>").appendTo(this._menu);
        $("<li>" + self._('Save Position') + "</li>").appendTo(this._menuElement).click(function () {
            self._menuElement.fadeOut();
            self.SaveStoryPosition();
        });
        $("<li>" + self._('Get Link to this Position') + "</li>").appendTo(this._menuElement)
            .click(function (event) {
            event.preventDefault();
            self._menuElement.fadeOut();
            var paragraphNumber = Number(self._baseElement.attr("data-paragraphNumber"));
            var infoRequest = {
                Link: location.href
            };
            var data = self.EventHandler.RequestResponse(Events.RequestGetStoryInfo, self, infoRequest);
            var page = data.Chapter;
            var getLinkRequest = {
                Page: Number(page)
            };
            var url = self.EventHandler.RequestResponse(Events.RequestGetLinkToPageNumber, self, getLinkRequest);
            var modal = GUIHandler.CreateBootstrapModal($("<pre></pre>").text(url + "#paragraph=" + paragraphNumber), self._("Link for this Position"));
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
        this.Log("Paragraph Menu Container built");
    };
    ParagraphMenu.prototype.SaveStoryPosition = function () {
        var paragraphNumber = Number(this._baseElement.attr("data-paragraphNumber"));
        var infoRequest = {
            Link: document.location.href
        };
        var data = this.EventHandler.RequestResponse(Events.RequestGetStoryInfo, this, infoRequest);
        var page = data.Chapter;
        var getLinkRequest = {
            Page: Number(page)
        };
        var url = this.EventHandler.RequestResponse(Events.RequestGetLinkToPageNumber, self, getLinkRequest);
        var storyID = data.ID;
        if (typeof (this.Config.storyReminder[storyID]) !== "undefined") {
            if (!confirm(this._('There is already a reminder for this StoryID. Overwrite?'))) {
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
        this.Config.storyReminder[data.ID] = element;
        this.EventHandler.CallEvent(Events.ActionForceSaveConfig, this, undefined);
        this.Log("Position Saved!");
    };
    ParagraphMenu.prototype.SetPosition = function (base) {
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
    };
    /**
    *   Go to a specific Paragraph on the page
    *   @param id Paragraph Number
    */
    ParagraphMenu.prototype.GoToParagraphID = function (id) {
        $($("p")[id]).before('<a name="goto" id="gotoMarker"></a>');
        location.href = '#goto';
        $("#gotoMarker").remove();
    };
    return ParagraphMenu;
}(ExtentionBaseClass));
//# sourceMappingURL=ParagraphMenu.js.map
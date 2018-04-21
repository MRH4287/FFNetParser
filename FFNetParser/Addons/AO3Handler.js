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
var AO3Handler = (function (_super) {
    __extends(AO3Handler, _super);
    function AO3Handler(parser) {
        var _this = _super.call(this, parser) || this;
        /**
         * Is the current Page the page of a specific user
         */
        _this._inUsersPage = false;
        var self = _this;
        // This is important :3
        _this.EventHandler.AddRequestEventListener(Events.RequestMainElementSelector, function () { return '[role="article"]'; });
        _this.EventHandler.AddEventListener(Events.OnLoad, function (s, a) {
            self.UpdateGUI();
            //// Check if the current Page is a User Specific Page:
            //var locationRegEx = new RegExp("\/u\/[0-9]+\/");
            //self._inUsersPage = locationRegEx.test(location.href);
        });
        _this.EventHandler.AddRequestEventListener(Events.RequestGetLinkToNextChapter, function (sender, data) {
            //var next = data.Body.find('button:contains(Next)').first();
            //if (next.length !== 0)
            //{
            //    var url = self.GetUrlFromButton(next);
            //    return url;
            //}
            //return null;
            return "/";
        });
        _this.EventHandler.AddRequestEventListener(Events.RequestGetLinkToPageNumber, function (sender, args) {
            //return self.GetLinkToPageNumber(args.Page);
            return "/";
        });
        _this.EventHandler.AddRequestEventListener(Events.RequestGetStoryInfo, function (s, data) {
            //return FFNetHandler.GetStoryInfo(data.Link);
            var info = {
                Chapter: "0",
                ID: "0",
                Name: ""
            };
            return info;
        });
        _this.EventHandler.AddEventListener(Events.ActionUpdateListColor, function (s, e) {
            //this.UpdateListColor(s, e);
        });
        _this.EventHandler.AddRequestEventListener(Events.RequestGetCurrentPage, function (s, input) {
            //return this.GetCurrentPage();
            return "";
        });
        _this.EventHandler.AddEventListener(Events.OnPageWrapperCreating, function (s, args) {
            //if (!args.IgnoreUserPage && this._inUsersPage)
            //{
            //    args.Elements = args.Elements.filter(".mystories");
            //    // Create wrapper for Favs:
            //    this.Log("Create Page Wrapper for Favs");
            //    var favWrapper = this.Parser.CreatePageWrapper(args.Elements.filter('.favstories'), 2);
            //    this.Parser.Read(favWrapper);
            //}
        });
        return _this;
    }
    /**
*   Adds GUI Elements like Menu Link
*/
    AO3Handler.prototype.UpdateGUI = function () {
        this.EventHandler.CallEvent(Events.PreGuiUpdate, this, null);
        var table = $('#header>[role="navigation"]').first();
        var self = this;
        if (table.length > 0) {
            if (this.DEBUG) {
                console.log("Adds User Interface");
            }
            this.EventHandler.CallEvent(Events.PreGuiMenuAppend, this, table);
            // Add User Interface
            table.append($("<li></li>").append($('<a></a>').html(self._('Rerun Filter')).attr('href', '#').click(function (e) {
                self.EventHandler.CallEvent(Events.ActionForceReadAll, self, null);
                e.preventDefault();
            }).attr('title', self._('Parse the Stories again')))).append($("<li></li>").append($('<a></a>').html(self._('Menu')).attr('href', '#').click(function (e) {
                self.EventHandler.CallEvent(Events.ActionGuiShowMenu, self, null);
                e.preventDefault();
            }).attr('title', 'Open Config Menu'))).append($("<li></li>").append($('<a></a>').html(self._('Filter Collection'))
                .attr('href', 'http://filter.mrh-development.de')
                .attr("target", "_blank")
                .attr('title', self._('Open The Filter Collection'))));
            this.EventHandler.CallEvent(Events.PostGuiMenuAppend, this, table);
        }
        // Add GUI for "Only Mode":
        var container = $(".filters");
        if (container.length > 0) {
            this.EventHandler.CallEvent(Events.PreGUIOnlyModeAppend, this, container);
            if (this.DEBUG) {
                console.log('Add GUI for "Only Mode"');
            }
            var input = $("<select></select>")
                .attr("title", self._("Display Only Elements that match a specific Filter"))
                .change(function () {
                var selected = input.children().filter(":selected").attr('value');
                if (self.DEBUG) {
                    console.info("Display Only - Element Selected: ", selected);
                }
                if (selected !== "off") {
                    self.DataConfig["displayOnly"] = selected;
                }
                else {
                    self.DataConfig["displayOnly"] = undefined;
                }
                self.EventHandler.CallEvent(Events.ActionForceSaveDataStore, self, undefined);
                self.EventHandler.CallEvent(Events.ActionForceReadAll, self, undefined);
            }).addClass("filter_select");
            var noneEntry = $('<option value="off">' + self._('Display: Everything') + '</option>').appendTo(input);
            if (typeof (this.DataConfig["displayOnly"]) === "undefined") {
                noneEntry.attr("selected", "selected");
            }
            $.each(this.Config.marker, function (title, info) {
                var entry = $('<option></option>').attr('value', title).html(title).appendTo(input);
                if ((typeof (self.DataConfig["displayOnly"]) !== "undefined") && (title === self.DataConfig["displayOnly"])) {
                    entry.attr("selected", "selected");
                }
            });
            var filterContainer = $("<dd></dd>").append(input);
            var headline = $("<dt>Display Only Mode:</dt>");
            container.find('dt.autocomplete').first().before(headline).before(filterContainer);
            this.EventHandler.CallEvent(Events.PostGUIOnlyModeAppend, this, container);
        }
        this.EventHandler.CallEvent(Events.PostGuiUpdate, this, null);
    };
    return AO3Handler;
}(ExtentionBaseClass));
//# sourceMappingURL=AO3Handler.js.map
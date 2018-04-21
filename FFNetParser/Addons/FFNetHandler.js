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
var FFNetHandler = (function (_super) {
    __extends(FFNetHandler, _super);
    function FFNetHandler(parser) {
        var _this = _super.call(this, parser) || this;
        /**
         * Is the current Page the page of a specific user
         */
        _this._inUsersPage = false;
        var self = _this;
        // This is important :3
        _this.EventHandler.AddRequestEventListener(Events.RequestMainElementSelector, function () { return ".z-list"; });
        _this.EventHandler.AddEventListener(Events.OnLoad, function (s, a) {
            self.UpdateGUI();
            // Check if the current Page is a User Specific Page:
            var locationRegEx = new RegExp("\/u\/[0-9]+\/");
            self._inUsersPage = locationRegEx.test(location.href);
        });
        _this.EventHandler.AddRequestEventListener(Events.RequestGetLinkToNextChapter, function (sender, data) {
            var next = data.Body.find('button:contains(Next)').first();
            if (next.length !== 0) {
                var url = self.GetUrlFromButton(next);
                return url;
            }
            return null;
        });
        _this.EventHandler.AddRequestEventListener(Events.RequestGetLinkToPageNumber, function (sender, args) {
            return self.GetLinkToPageNumber(args.Page);
        });
        _this.EventHandler.AddRequestEventListener(Events.RequestGetStoryInfo, function (s, data) {
            return FFNetHandler.GetStoryInfo(data.Link);
        });
        _this.EventHandler.AddEventListener(Events.ActionUpdateListColor, function (s, e) {
            _this.UpdateListColor(s, e);
        });
        _this.EventHandler.AddRequestEventListener(Events.RequestGetCurrentPage, function (s, input) {
            return _this.GetCurrentPage();
        });
        _this.EventHandler.AddEventListener(Events.OnPageWrapperCreating, function (s, args) {
            if (!args.IgnoreUserPage && _this._inUsersPage) {
                args.Elements = args.Elements.filter(".mystories");
                // Create wrapper for Favs:
                _this.Log("Create Page Wrapper for Favs");
                var favWrapper = _this.Parser.CreatePageWrapper(args.Elements.filter('.favstories'), 2);
                _this.Parser.Read(favWrapper);
            }
        });
        return _this;
    }
    /**
    *   Adds GUI Elements like Menu Link
    */
    FFNetHandler.prototype.UpdateGUI = function () {
        this.EventHandler.CallEvent(Events.PreGuiUpdate, this, null);
        if (!this.Config.disable_width_change) {
            // Updates Content_width
            $('#content_wrapper').css('width', this.Config['content_width']);
        }
        var table = $(".zui").find("td").first();
        var self = this;
        if (table.length > 0) {
            if (this.DEBUG) {
                console.log("Adds User Interface");
            }
            this.EventHandler.CallEvent(Events.PreGuiMenuAppend, this, table);
            // Add User Interface
            table.append($('<a></a>').addClass('menu-link').html(self._('Rerun Filter')).attr('href', '#').click(function (e) {
                self.EventHandler.CallEvent(Events.ActionForceReadAll, self, null);
                e.preventDefault();
            }).attr('title', self._('Parse the Stories again'))).append($('<a></a>').addClass('menu-link').html(self._('Menu')).attr('href', '#').click(function (e) {
                self.EventHandler.CallEvent(Events.ActionGuiShowMenu, self, null);
                e.preventDefault();
            }).attr('title', 'Open Config Menu')).append($('<a></a>').addClass('menu-link').html(self._('Filter Collection'))
                .attr('href', 'http://filter.mrh-development.de')
                .attr("target", "_blank")
                .attr('title', self._('Open The Filter Collection')));
            this.EventHandler.CallEvent(Events.PostGuiMenuAppend, this, table);
        }
        // Add Messages Menu:
        this.Log("Add Messages Menu");
        var menulinks = $(".menulink").first();
        if (menulinks.length > 0) {
            this.EventHandler.CallEvent(Events.PreGUIMessageMenuAppend, this, menulinks);
            var imageContainer = $("<div></div>")
                .css("display", "inline-block")
                .css("margin-left", "10px")
                .css("height", "100%")
                .css("border-radius", "5px")
                .addClass("ffnetMessageContainer")
                .addClass("ffnetParserContext")
                .addClass("clickable")
                .attr("title", self._("Advanced Messaging Features. Sorry, this is not a PM Button :-("))
                .appendTo(menulinks);
            imageContainer.append($("<img></img>")
                .attr("src", self.Api.GetUrl("message-white.png"))
                .css("width", "20px")
                .css("margin-bottom", "4px"));
            var radius = 15;
            var height = 120;
            var width = 260;
            var messageContainer = $("<div></div>")
                .addClass("ffnet_messageContainer")
                .appendTo("body");
            var innerContainer = $("<div></div>")
                .addClass("innerContainer")
                .appendTo(messageContainer);
            imageContainer.click(function () {
                if (messageContainer.is(":hidden")) {
                    //Set Position of Element:
                    var pos = imageContainer.position();
                    messageContainer
                        .css("top", (pos.top + 20) + "px")
                        .css("left", (pos.left - 100) + "px")
                        .show();
                    self.Api.GetLiveChatInfo(function (res) {
                        if (res.DevInRoom) {
                            $(".liveChatButton").addClass("online")
                                .attr("title", self._('The Dev is currently online.'));
                        }
                        else {
                            $(".liveChatButton").removeClass("online").removeAttr("title");
                        }
                    });
                }
                else {
                    messageContainer.hide();
                }
            });
            innerContainer.append($("<div>" + self._('Message Menu (Script)') + "</div>")
                .css("font-weight", "bold")
                .css("margin-bottom", "10px"));
            var count = 0;
            if (typeof (this.DataConfig['messages']) !== "undefined") {
                count = this.DataConfig['messages'].length;
            }
            innerContainer.append($('<div><span class="ffnet-messageCount">' + count + "</span> " + self._('Message(s)') + "</div>")
                .addClass("menuItem")
                .click(function () {
                messageContainer.hide();
                self.EventHandler.CallEvent(Events.ActionGuiShowMessageMenu, self, null);
            }));
            innerContainer.append($("<div>" + self._('Give Feedback') + "</div>")
                .addClass("menuItem")
                .click(function () {
                messageContainer.hide();
                self.EventHandler.CallEvent(Events.ActionGuiShowFeedbackMenu, self, null);
            }));
            var liveChatContainer = $("<div>" + self._('Live Chat') + "</div>")
                .addClass("menuItem liveChatButton");
            var available = self.EventHandler.RequestResponse(Events.RequestLiveChatAvailable, self, undefined);
            if (available) {
                liveChatContainer.click(function () {
                    messageContainer.hide();
                    self.EventHandler.CallEvent(Events.ActionGuiToggleLiveChat, self, null);
                });
            }
            else {
                liveChatContainer.attr("title", self._("This Feature is not available in your Browser. Sorry!"));
            }
            innerContainer.append(liveChatContainer);
            innerContainer.append($("<div>" + self._('Wiki') + "</div>")
                .addClass("menuItem")
                .click(function () {
                messageContainer.hide();
                window.open("https://github.com/MRH4287/FFNetParser/wiki");
            }));
            //
            this.EventHandler.CallEvent(Events.PostGUIMessageMenuAppend, this, menulinks);
            // Message Menu End
            // Story Reminder:
            if (!this.Config.disable_parahraphMenu) {
                this.EventHandler.CallEvent(Events.PreGUIStoryReminderAppend, this, menulinks);
                var sRImageContainer = $("<div></div>")
                    .css("display", "inline-block")
                    .css("margin-left", "10px")
                    .css("height", "100%")
                    .css("border-radius", "5px")
                    .addClass("ffnetStoryReminderContainer")
                    .addClass("clickable")
                    .attr("title", self._("Saved Story Reminder"))
                    .appendTo(menulinks);
                sRImageContainer.append($("<img></img>")
                    .attr("src", self.Api.GetUrl("notes.png"))
                    .css("width", "12px")
                    .css("margin-bottom", "4px"));
                sRImageContainer.click(function (event) {
                    event.preventDefault();
                    var table = $('<table class="table table-hover table-responsive table-border"></table>');
                    table.append("<tr><th>" + self._('ID') + '</th><th>' + self._('Name') + '</th><th>' + self._('Chapter') +
                        '</th><th>' + self._('Time') + '</th><th>' + self._('Visited') + '</th><th>' + self._('Options') + "</th></tr>");
                    var modal = GUIHandler.CreateBootstrapModal(table, self._("Saved Story Reminder"));
                    $.each(self.Config.storyReminder, function (key, el) {
                        $("<tr></tr>")
                            .append($("<td></td>").text(el.storyID)).append($("<td></td>").text(el.name)).append($("<td></td>").text(el.chapter)).append($("<td></td>").text((new Date(el.time)).toLocaleString())).append($("<td></td>").text((el.visited) ? self._("Yes") : self._("No"))).append($("<td></td>").append($('<a href="#">' + self._('Delete') + '</a>').click(function (e) {
                            e.preventDefault();
                            if (confirm(self._("Do you really want to delete that element?"))) {
                                delete self.Config.storyReminder[key];
                                self.EventHandler.CallEvent(Events.ActionForceSaveConfig, self, undefined);
                                modal.modal('hide');
                            }
                        }))).addClass("clickable")
                            .click(function (e) {
                            e.preventDefault();
                            self.Config.storyReminder[key].visited = true;
                            self.EventHandler.CallEvent(Events.ActionForceSaveConfig, self, undefined);
                            location.href = el.url;
                        }).appendTo(table);
                    });
                    GUIHandler.ShowModal(modal);
                });
                this.EventHandler.CallEvent(Events.PostGUIStoryReminderAppend, this, menulinks);
            }
            if (!self.Config.disable_highlighter && !self.Config.disable_highlighter_list) {
                var hLImageContainer = $("<div></div>")
                    .css("display", "inline-block")
                    .css("margin-left", "10px")
                    .css("height", "100%")
                    .css("border-radius", "5px")
                    .addClass("ffnetHighlighterListContainer")
                    .addClass("clickable")
                    .attr("title", self._("Highlighter List"))
                    .appendTo(menulinks);
                hLImageContainer.append($("<img></img>")
                    .attr("src", self.Api.GetUrl("highlighter.png"))
                    .css("width", "12px")
                    .css("margin-bottom", "4px"));
                hLImageContainer.click(function (event) {
                    event.preventDefault();
                    // Collect Data:
                    var groups = {};
                    $.each(self.Config.highlighter, function (key, data) {
                        var prefab = "Custom Highlighter";
                        if (data.prefab !== null) {
                            prefab = data.prefab;
                        }
                        if (groups[prefab] === undefined) {
                            groups[prefab] = [];
                        }
                        groups[prefab].push(key);
                    });
                    var contentContainer = $('<div id="ffnet_highlighterGroup" class="panel-group" role="tablist" aria-multiselectable="true"></div>');
                    var modal = GUIHandler.CreateBootstrapModal(contentContainer, self._("Highlighter List"));
                    $.each(groups, function (name, elements) {
                        var panelBody = $('<div class="panel-body"></div>');
                        var list = $("<ul></ul>").appendTo(panelBody);
                        var image = null;
                        if (self.Config.highlighterPrefabs[name] !== undefined) {
                            var highlighterPrefab = self.Config.highlighterPrefabs[name];
                            if (highlighterPrefab.image !== undefined && highlighterPrefab.image !== null) {
                                image = $("<img></img>").attr("src", highlighterPrefab.image)
                                    .css("max-height", "16px").css("max-width", "16px")
                                    .css("margin-right", "10px");
                            }
                        }
                        var prefabName = name.replace(' ', '_')
                            .replace('\'', '')
                            .replace('"', '')
                            .replace('.', '_')
                            .replace(',', '_');
                        var panel = $('<div class="panel panel-default"></div>');
                        panel.append($('<div class="panel-heading" role="tab"></div').attr("id", "heading" + prefabName).append($('<h4 class="panel-title"></h4').append($('<a role="button" class="collapsed" data-toggle="collapse" data-parent="#ffnet_highlighterGroup" aria-expanded="false"></a>')
                            .attr("aria-controls", "collapse" + prefabName)
                            .attr("href", "#collapse" + prefabName)
                            .append(image).append($("<span></span>").text(name))))).append($('<div class="panel-collapse collapse" role="tabpanel"></div>')
                            .attr("id", "collapse" + prefabName)
                            .attr("aria-labelledby", "heading" + prefabName)
                            .append(panelBody));
                        $.each(elements, function (_, value) {
                            var link = self.Config.highlighter_use_storyID ? "/s/" + value : value;
                            var aElement = $('<a></a>').attr("href", link).text(value);
                            var spanElement = $('<span></span>');
                            list.append($('<li></li>').append(aElement).append(spanElement));
                            self.Parser.GetPageContent(link, function (body) {
                                var title = body.find("#profile_top > .xcontrast_txt").first().text();
                                var lastUpdate = body.find("#profile_top > .xcontrast_txt").last().find("[data-xutime]").first().text();
                                spanElement.text(" (Last Updated: " + lastUpdate + ")");
                                aElement.text(title);
                            });
                        });
                        contentContainer.append(panel);
                    });
                    contentContainer.collapse();
                    GUIHandler.ShowModal(modal);
                });
            }
        }
        else {
            if (this.DEBUG) {
                console.warn("Can't find Element .menulink ", menulinks);
            }
        }
        // Add GUI for "Only Mode":
        var container = $("#filters > form > .modal-body");
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
            container.find("select").not(".filter_select_negative ").last().after(input);
            input.before("&nbsp;");
            this.EventHandler.CallEvent(Events.PostGUIOnlyModeAppend, this, container);
        }
        // Key Control for Page:
        $("body").keydown(function (event) {
            self.EventHandler.CallEvent(Events.OnKeyDown, self, event);
            var container = $("#content_wrapper_inner").find("center").last();
            var current = container.find("b").first();
            var url = null;
            if ($(event.target).is("body")) {
                var element;
                // right
                if (event.keyCode === 39) {
                    element = current.next("a");
                    if (element.length !== 0) {
                        url = element.attr("href");
                    }
                    if (url == null) {
                        element = $("body").find('button:contains(Next)').first();
                        if (element.length !== 0) {
                            url = self.GetUrlFromButton(element);
                        }
                    }
                }
                else if (event.keyCode === 37) {
                    element = current.prev("a");
                    if (element.length !== 0) {
                        url = element.attr("href");
                    }
                    if (url == null) {
                        element = $("body").find('button:contains(Prev)').first();
                        if (element.length !== 0) {
                            url = self.GetUrlFromButton(element);
                        }
                    }
                }
                if (url !== null) {
                    if (self.DEBUG) {
                        console.log("Changes to Page: ", url);
                    }
                    location.href = url;
                }
            }
        });
        this.EventHandler.CallEvent(Events.PostGuiUpdate, this, null);
    };
    /**
     *   Gets the Information of a story from a Link
     *   @param link Link to story
     */
    FFNetHandler.GetStoryInfo = function (link) {
        var data = { Chapter: null, ID: null, Name: null };
        var storyNameReg = /\/s\/([0-9]+)\/?([0-9]*)\/?(.*)/;
        var result = storyNameReg.exec(link);
        if ((result != null) && (result.length > 1)) {
            data.ID = result[1];
            data.Chapter = result[2];
            data.Name = result[3];
            return data;
        }
        else {
            storyNameReg = /\/[^\/]+\/(.+)/;
            result = storyNameReg.exec(link);
            if ((result != null) && (result.length > 1)) {
                data.Name = result[1];
            }
            return data;
        }
    };
    /**
     *   Gets the URL from a Button
     *   @param button Button Instance
     */
    FFNetHandler.prototype.GetUrlFromButton = function (button) {
        var script = button.attr('onclick');
        var scriptReg = /self\.location=\'([^']+)\'/;
        var data = scriptReg.exec(script);
        if ((data != null) && (data.length > 1)) {
            return data[1];
        }
        else {
            return null;
        }
    };
    /**
    *   Updates the colors of the elements in the story list
    */
    FFNetHandler.prototype.UpdateListColor = function (sender, args) {
        var odd = false;
        var self = this;
        $(self.MainElementSelector).filter(':visible').each(function (k, e) {
            var el = $(e);
            var link = el.find('a').first().attr('href');
            var storyInfo = FFNetHandler.GetStoryInfo(link);
            var storyName = storyInfo.Name;
            var color = self.Config.color_normal;
            var colorMo = self.Config.color_mouse_over;
            if (odd) {
                color = self.Config.color_odd_color;
                odd = false;
            }
            else {
                odd = true;
            }
            if (!self.Config.disable_default_coloring) {
                var data = {
                    Element: el,
                    Color: color,
                    ColorPriority: -1,
                    MouseOverColor: colorMo,
                    MouseOverPriority: -1
                };
                self.EventHandler.CallEvent(Events.ActionUpdateElementColor, self, data);
            }
        });
    };
    FFNetHandler.prototype.GetLinkToPageNumber = function (page) {
        var domainRegex = new RegExp("https?://[^/]+");
        var domainData = domainRegex.exec(location.href);
        if (domainData === null || domainData.length === 0) {
            console.warn("Can't get the current Location. Reason: Domain unknown. Possible Explaination: Loaded locally");
            return document.location.href;
        }
        var domain = domainData[0];
        // Regex used to get the Pagenumber
        var regex = new RegExp("([?|&]p)=[0-9]+");
        var container = $("center").first().find("a").first();
        if (container.length > 0) {
            var href = container.attr("href");
            return domain + href.replace(regex, "$1=" + page);
        }
        else if ($('button:contains(Next)').length > 0) {
            var next = $('button:contains(Next)').first();
            var url = this.GetUrlFromButton(next);
            regex = new RegExp("s/([0-9]+)/[0-9]+/");
            return domain + url.replace(regex, "s/$1/" + page + "/");
        }
        else {
            // Try to parse the current Location:
            regex = new RegExp("s/([0-9]+)/([0-9]+)/");
            var result = regex.exec(document.location.href);
            if (result.length === 3) {
                return document.location.href.replace(regex, "s/$1/" + page + "/");
            }
            else {
                console.warn("Can't get Link to Chapter! If this happens often, please report!");
                return document.location.href;
            }
        }
    };
    FFNetHandler.prototype.GetCurrentPage = function () {
        var pageNumber = $("center > b").first();
        if (pageNumber.length !== 0) {
            return Number(pageNumber.text());
        }
        else {
            // We are in a Story ....
            pageNumber = $("#chap_select").children().filter("[selected]");
            var page = Number(pageNumber.attr("value"));
            return (isNaN(page) ? 1 : page);
        }
    };
    return FFNetHandler;
}(ExtentionBaseClass));
//# sourceMappingURL=FFNetHandler.js.map
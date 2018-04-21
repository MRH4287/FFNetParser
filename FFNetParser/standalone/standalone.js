/// <reference path="../userscript.ts" /> 
/// <reference path="progressIndicator.ts" /> 
/**
 * Class used for the Standalone Mode
 */
var Standalone = (function () {
    function Standalone() {
        this.DEBUG = true;
        //private BasePath = "http://localhost:49990/FanFictionUserScript/FFNetProxy/?url="; 
        //private BasePath = "https://www.fanfiction.net/";
        this._basePath = "http://localhost:8080/";
        this._lastHash = "";
        this._ignoreHashChange = false;
        this._filterModal = undefined;
        this._categoryBaseURL = undefined;
        this.MainElementSelector = ".x-list";
        /**
         * List of Objects saved for later
         */
        this._copy = {};
        var self = this;
        this._progress = new ProgressIndicator();
        $(document).ready(function () {
            self.saveElement("menulink");
            self.saveElement("StandaloneMainContaniner");
        });
    }
    /**
     * Calls a specific event
     * @param event The name of the event
     * @param sender The Sender of the event
     * @param arguments The Argument of this Event
     */
    Standalone.prototype.CallEvent = function (event, sender, args) {
        if (this._eventHandler !== undefined) {
            this._eventHandler.CallEvent(event, sender, args);
        }
    };
    /**
     * Save a specific Element
     * @param className The Classname of the Element that should be saved
     */
    Standalone.prototype.saveElement = function (className) {
        this._copy[className] = $("." + className).clone();
    };
    /**
     * Restore an element to the state it was, when it was saved
     * @param className The Classname of the element that should be restored
     */
    Standalone.prototype.RestoreElement = function (className) {
        var self = this;
        if (typeof (self._copy[className]) === "undefined") {
            return;
        }
        $("." + className).html(self._copy[className].html());
    };
    /**
     * Restore The GUI to the way it was
     */
    Standalone.prototype.Clear = function () {
        this.CallEvent("standaloneClearPage", this, null);
        this.RestoreElement("StandaloneMainContaniner");
    };
    /**
     * Starts the Standalone Mode
     * @param url The URL that should be loaded if no hash is present
     * @param firstRun Was the script loaded the first time
     */
    Standalone.prototype.Init = function (url, firstRun) {
        var _this = this;
        if (url === void 0) { url = "/game/pokemon"; }
        if (firstRun === void 0) { firstRun = true; }
        if (this._eventHandler === undefined) {
            this._eventHandler = new EventHandler(null);
            this._progress.SetEventHandler(this._eventHandler);
        }
        if (firstRun) {
            this._categoryBaseURL = url;
        }
        this._ignoreHashChange = true;
        this._progress.Show();
        this.CallEvent("standaloneInit", this, url);
        console.log("Current Hash: " + document.location.hash);
        if (firstRun && document.location.hash !== "") {
            url = document.location.hash.substr(1);
            console.log("Get URL from Hash: " + url);
        }
        console.info("Loading URL: ", url);
        var self = this;
        this.Clear();
        this.UpdatePage(url, function () {
            _this.CallEvent("standalonePreUpdatePage", self, url);
            document.location.hash = "#" + url;
            _this._lastHash = document.location.hash;
            $(".navi").find("a").each(function (k, el) {
                var element = $(el);
                if (element.attr("href")[0] === "/") {
                    element.attr("data-href", element.attr("href"));
                    element.attr("href", self._basePath + element.attr("href"));
                    element.click(function (e) {
                        e.preventDefault();
                        _this.Init(element.attr("data-href"), false);
                    });
                }
            });
            $(self.MainElementSelector).find("a").each(function (k, el) {
                var element = $(el);
                if (element.attr("href")[0] === "/") {
                    element.click(function (e) {
                        e.preventDefault();
                        document.location.href = "https://www.fanfiction.net/" + element.attr("href");
                    });
                    //var link = 
                    //element.attr("href", link);
                }
            });
            if (firstRun) {
                _this.RunScript();
                _this.StartHashTimer();
            }
            _this._parser.ReadList();
            _this._ignoreHashChange = false;
            _this.CallEvent("standalonePostUpdatePage", _this, url);
            _this._progress.Hide();
        });
    };
    Standalone.prototype.StartHashTimer = function () {
        var _this = this;
        this.CallEvent("standaloneOnHashTimerCreate", this, null);
        this._eventHandler.AddTimedTrigger("standaloneHashTimer", "standaloneOnHashTimerTick", 1000, this, null);
        this._eventHandler.AddEventListener("standaloneOnHashTimerTick", function (s, e) {
            if (!_this._ignoreHashChange && document.location.hash !== _this._lastHash) {
                _this._lastHash = document.location.hash;
                // Hash Changed
                console.log("The Hash Changed to: " + _this._lastHash);
                if (_this._lastHash[0] === "#") {
                    _this.Init(_this._lastHash.substr(1), false);
                }
            }
        });
    };
    /**
     * Updates the page with contents from the given URL
     * @param url The URL to load
     * @param callback Is triggered when the Asynchron process is done
     */
    Standalone.prototype.UpdatePage = function (url, callback) {
        $("#filterButtonContainer").hide();
        this.GetPageElements(this._basePath + url, function (res) {
            $(".FFNetContentContainer").html($("<div></div>").append(res.Content).html());
            $(".navi").html($("<div></div>").append(res.Navigation).html());
            callback();
        });
    };
    /**
     * Gets the Elements of a Page
     * @param url The for the Request
     * @param callback The Callback with the Elements
     */
    Standalone.prototype.GetPageElements = function (url, callback) {
        var _this = this;
        this.GetPageContent(url, function (res) {
            var result = {
                Content: res.find(_this.MainElementSelector),
                Navigation: res.find("center").first()
            };
            _this.HandleFilterModal(res);
            callback(result);
        });
    };
    Standalone.prototype.HandleFilterModal = function (modal) {
        var _this = this;
        var modalBody = modal.find(".modal-body");
        // remove all Javascript Elements:
        var elements = modalBody.children();
        this.RemoveScripts(elements);
        // wrap Dropdowns in Rows:
        // var container = $('<div class="row"></div>').appendTo(modalBody);
        var selects = elements.filter("select");
        selects.each(function (_, el) {
            var element = $(el);
            var container = $('<div class="form-group"></div>').append($('<label></label>'));
            element.after(container).detach();
            element.addClass("form-control").appendTo(container);
        });
        var buttons = [];
        buttons.push($('<button type="button" class="btn btn-primary" data-dismiss="modal">Apply</button>')
            .click(function () {
            _this.ApplyFilter();
        }));
        buttons.push($('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'));
        this._filterModal = GUIHandler.CreateBootstrapModal(modalBody, "Filter", buttons);
        $("#filterButtonContainer").show();
    };
    Standalone.prototype.ApplyFilter = function () {
        var path = '';
        path += this.ZeroAppend($('select[name=sortid]').val(), '&srt=');
        path += this.ZeroAppend($('select[name=genreid1]').val(), '&g1=');
        path += this.ZeroAppend($('select[name=genreid2]').val(), '&g2=');
        path += this.ZeroAppend($('select[name=_genreid1]').val(), '&_g1=');
        path += this.ZeroAppend($('select[name=languageid]').val(), '&lan=');
        path += this.ZeroAppend($('select[name=censorid]').val(), '&r=');
        path += this.ZeroAppend($('select[name=length]').val(), '&len=');
        path += this.ZeroAppend($('select[name=timerange]').val(), '&t=');
        path += this.ZeroAppend($('select[name=statusid]').val(), '&s=');
        path += this.ZeroAppend($('select[name=characterid1]').val(), '&c1=');
        path += this.ZeroAppend($('select[name=characterid2]').val(), '&c2=');
        path += this.ZeroAppend($('select[name=characterid3]').val(), '&c3=');
        path += this.ZeroAppend($('select[name=characterid4]').val(), '&c4=');
        path += this.ZeroAppend($('select[name=_characterid1]').val(), '&_c1=');
        path += this.ZeroAppend($('select[name=_characterid2]').val(), '&_c2=');
        path += this.ZeroAppend($('select[name=verseid1]').val(), '&v1=');
        path += this.ZeroAppend($('select[name=_verseid1]').val(), '&_v1=');
        if ($('input[name=pm]').is(':checked')) {
            path += this.ZeroAppend($('input[name=pm]').val(), '&pm=');
        }
        if ($('input[name=_pm]').is(':checked')) {
            path += this.ZeroAppend($('input[name=_pm]').val(), '&_pm=');
        }
        console.log("Filter Path: ", path);
        this.Init(this._categoryBaseURL + '/?' + path, false);
    };
    /**
     * Copied from FF-Net
     */
    Standalone.prototype.ZeroAppend = function (compare, prepend) {
        if (compare !== undefined && compare > 0) {
            return prepend + compare;
        }
        else {
            return '';
        }
    };
    Standalone.prototype.RemoveScripts = function (elements) {
        elements.remove("script").removeAttr("onchange").removeAttr("onclick");
        var elementsWithChilds = elements.has("*");
        if (elementsWithChilds.length > 0) {
            this.RemoveScripts(elementsWithChilds.children());
        }
    };
    Standalone.prototype.ShowFilterModal = function () {
        if (this._filterModal !== undefined) {
            GUIHandler.ShowModal(this._filterModal);
        }
    };
    /**
     * Stats the Userscript
     */
    Standalone.prototype.RunScript = function () {
        //TODO: FIX ME
        //this._parser = new StoryParser();
        //this._eventHandler = this._parser.EventHandler;
        //this._progress.SetEventHandler(this._eventHandler);
        //// Fix Chrome Sync Bug:
        //this._parser.Config.chrome_sync = false;
        //this.CallEvent("standaloneRunScript", this, null);
        ////this.parser.readList();
        //this._parser.EnablePocketSave();
        //this._parser.EnableInStoryHighlighter();
        //this._parser.EnableReadingAid();
        //this._parser.EnableEndlessMode();
        //this._parser.Api.Initialize();
        //this._parser.Api.GetStyles();
        //this.InsertStyle();
        //this._parser.DebugOptions();
    };
    /**
     * Insert the Style needed for the Page
     */
    Standalone.prototype.InsertStyle = function () {
        var _this = this;
        this.GetRawPageContent("ffnetStyle.css", function (s) {
            _this.CallEvent("standaloneOnStyleInsert", _this, s);
            $('<style type="text/css"></style>')
                .text(s)
                .appendTo($("head"));
        });
    };
    /**
       * Loads the Content of a Page  and returns the Data as JQuery Object
       * @param url The Request URI
       * @param callback The callback Function
       */
    Standalone.prototype.GetPageContent = function (url, callback) {
        this.GetRawPageContent(url, function (s) {
            callback($(s));
        });
    };
    /**
     * Loads the Content of a Page  and returns the Data as string
     * @param url The Request URI
     * @param callback The callback Function
     */
    Standalone.prototype.GetRawPageContent = function (url, callback) {
        if (this.DEBUG) {
            console.log("Requesting page: ", url);
        }
        this.CallEvent("standalonePreRequest", this, url);
        var self = this;
        $.get(url, function (content) {
            self.CallEvent("standaloneOnRequestDone", this, { url: url, content: content });
            callback(content);
        }).fail(function (event) {
            self.CallEvent("standaloneOnRequestFail", this, { url: url, event: event });
        });
    };
    // ***************** Categories Page ************
    /**
     * Loads the Categories from the Server
     * @param callback Callback with Result
     */
    Standalone.prototype.GetCategories = function (callback) {
        this.CallEvent("standalonePreRequestCategories", this, null);
        var self = this;
        this.GetPageContent(this._basePath, function (el) {
            var result = {};
            var cats = el.find(".tcat");
            cats.each(function (_, elem) {
                var cat = $(elem);
                var title = cat.find("b").last().text();
                result[title] = [];
                var childs = cat.next().find("td");
                childs.each(function (_, elem) {
                    var child = $(elem);
                    var link = child.find("a");
                    result[title].push({
                        name: link.text(),
                        url: link.attr("href")
                    });
                });
            });
            self.CallEvent("standalonePostCategoriesRequest", self, el);
            callback(result);
        });
    };
    /**
     * Creates the content for the Categories Page
     */
    Standalone.prototype.ManageCategories = function () {
        var self = this;
        this._eventHandler = new EventHandler(null);
        this._progress.SetEventHandler(this._eventHandler);
        this._progress.Show();
        this.GetCategories(function (result) {
            console.log(result);
            $(".categoriesContainer").html("");
            $.each(result, function (name, elements) {
                var rowContainer = $('<div clas="row"></div>').appendTo('.categoriesContainer');
                $('<div class="col-md-12" style="background-color: #f5f5f5"><h2>' + name + '</h2></div>').appendTo(rowContainer);
                $.each(elements, function (_, element) {
                    var container = $('<div class="col-md-6"></div>').appendTo(rowContainer);
                    container.append($('<button class="btn btn-default btn-lg btn-block"></button>').text(element.name) //  style="width:100%"
                        .click(function (e) {
                        e.preventDefault();
                        document.location.href = "elements.html?cat=" + element.url;
                    }));
                });
            });
            self.CallEvent("standaloneCategoriesParsed", self, result);
            self._progress.Hide();
        });
    };
    // ************ Elements *************
    /**
     * Loads the Elements (StoryBase) from the Server
     * @param url The URL to load from
     * @param callback Is triggered when the async Request is done
     */
    Standalone.prototype.GetElements = function (url, callback) {
        var self = this;
        this.CallEvent("standalonePreRequestElements", self, url);
        this.GetPageContent(this._basePath + url, function (res) {
            var result = [];
            var elements = res.find("#list_output").find("div");
            elements.each(function (_, el) {
                var element = $(el);
                result.push({
                    name: element.find("a").text(),
                    url: element.find("a").attr('href'),
                    count: element.find('span').text()
                });
            });
            self.CallEvent("standalonePostRequestElements", self, res);
            callback(res.find("#content_wrapper_inner").find("td").first().text().trim(), result);
        });
    };
    Standalone.prototype.ManageElements = function () {
        this._eventHandler = new EventHandler(null);
        this._progress.SetEventHandler(this._eventHandler);
        this._progress.Show();
        var url = this.GetSearchString("cat");
        console.log("cat: ", url);
        if (url !== undefined) {
            var self = this;
            this.GetElements(url, function (name, elements) {
                $(".elementsContainer").html('');
                var body = $('<tbody></tbody>');
                $('<table class="table" style="width:90%"><thead><tr><th>Name</th><th>Stories</th></tr></thead></table>').append(body).appendTo(".elementsContainer");
                $.each(elements, function (_, element) {
                    var tr = $('<tr></tr').appendTo(body);
                    tr.append($('<td></td>').append($('<button class="btn btn-default btn-lg btn-block" ></button>').click(// style="width:100%"
                    function (e) {
                        e.preventDefault();
                        if (element.url.indexOf("crossovers") !== -1) {
                            document.location.href = "elements.html?cat=" + element.url;
                        }
                        else {
                            document.location.href = "start.html#" + element.url;
                        }
                    }).text(element.name))).append($('<td></td>').text(element.count));
                });
                self.CallEvent("standaloneElementsParsed", self, [name, elements]);
                self._progress.Hide();
            });
        }
        else {
            $(".elementsContainer").html('<h1>Please don\'t open this Page directly! Redirecting ...');
            window.setTimeout(function () {
                document.location.href = "categories.html";
            }, 1000);
        }
    };
    Standalone.prototype.GetSearchString = function (key) {
        var regEx = new RegExp(key + '=' + '(.+)', "i");
        var groups = regEx.exec(document.location.search);
        return (groups !== null) ? groups[1] : undefined;
    };
    return Standalone;
}());
//# sourceMappingURL=standalone.js.map
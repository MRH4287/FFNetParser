/// <reference path="../userscript.ts" /> 
/// <reference path="progressIndicator.ts" /> 


/**
 * Class used for the Standalone Mode
 */
class Standalone
{
    private DEBUG = true;

    //private BasePath = "http://localhost:49990/FanFictionUserScript/FFNetProxy/?url="; 
    //private BasePath = "https://www.fanfiction.net/";
    private _basePath = "http://localhost:8080/";
    private _parser: StoryParser;
    private _progress: ProgressIndicator;

    private _lastHash: string = "";
    private _ignoreHashChange: boolean = false;
    private _filterModal: JQuery = undefined;
    private _categoryBaseURL: string = undefined;

    /**
     * The current Instance of the EventHandler
     */
    private _eventHandler: EventHandler;

    /**
     * Calls a specific event
     * @param event The name of the event
     * @param sender The Sender of the event
     * @param arguments The Argument of this Event
     */
    private CallEvent(event: string, sender: any, args: any)
    {
        if (this._eventHandler !== undefined)
        {
            this._eventHandler.CallEvent(event, sender, args);
        }
    }

    /**
     * List of Objects saved for later
     */
    private _copy: { [index: string]: JQuery } = {};

    constructor()
    {
        var self = this;
        this._progress = new ProgressIndicator();


        $(document).ready(function ()
        {
            self.saveElement("menulink");
            self.saveElement("StandaloneMainContaniner");
        });

    }


    /**
     * Save a specific Element
     * @param className The Classname of the Element that should be saved
     */
    private saveElement(className: string)
    {
        this._copy[className] = $("." + className).clone();
    }

    /**
     * Restore an element to the state it was, when it was saved
     * @param className The Classname of the element that should be restored
     */
    private RestoreElement(className: string)
    {
        var self = this;

        if (typeof (self._copy[className]) === "undefined")
        {
            return;
        }

        $("." + className).html(self._copy[className].html());
    }

    /**
     * Restore The GUI to the way it was
     */
    public Clear()
    {
        this.CallEvent("standaloneClearPage", this, null);

        this.RestoreElement("StandaloneMainContaniner");
    }

    /**
     * Starts the Standalone Mode
     * @param url The URL that should be loaded if no hash is present
     * @param firstRun Was the script loaded the first time
     */
    public Init(url: string = "/game/pokemon", firstRun = true)
    {
        if (this._eventHandler === undefined)
        {
            this._eventHandler = new EventHandler(null);
            this._progress.SetEventHandler(this._eventHandler);
        }

        if (firstRun)
        {
            this._categoryBaseURL = url;
        }

        this._ignoreHashChange = true;
        this._progress.Show();

        this.CallEvent("standaloneInit", this, url);

        console.log("Current Hash: " + document.location.hash);

        if (firstRun && document.location.hash !== "")
        {
            url = document.location.hash.substr(1);

            console.log("Get URL from Hash: " + url);
        }

        console.info("Loading URL: ", url);

        var self = this;

        this.Clear();
        this.UpdatePage(url,() =>
        {
            this.CallEvent("standalonePreUpdatePage", self, url);

            document.location.hash = "#" + url;
            this._lastHash = document.location.hash;


            $(".navi").find("a").each((k, el) =>
            {
                var element = $(el);

                if (element.attr("href")[0] == "/")
                {
                    element.attr("data-href", element.attr("href"));
                    element.attr("href", self._basePath + element.attr("href"));

                    element.click((e) =>
                    {
                        e.preventDefault();

                        this.Init(element.attr("data-href"), false);

                    });

                }

            });

            $(".z-list").find("a").each(function (k, el)
            {
                var element = $(el);

                if (element.attr("href")[0] == "/")
                {
                    element.click((e) =>
                    {
                        e.preventDefault();

                        document.location.href = "https://www.fanfiction.net/" + element.attr("href");
                    });

                    //var link = 
                    //element.attr("href", link);
                }

            });

            if (firstRun)
            {
                this.RunScript();
                this.StartHashTimer();
            }

            this._parser.ReadList();

            this._ignoreHashChange = false;

            this.CallEvent("standalonePostUpdatePage", this, url);
            this._progress.Hide();
        });


    }

    private StartHashTimer()
    {
        this.CallEvent("standaloneOnHashTimerCreate", this, null);

        this._eventHandler.AddTimedTrigger("standaloneHashTimer", "standaloneOnHashTimerTick", 1000, this, null);
        this._eventHandler.AddEventListener("standaloneOnHashTimerTick",(s, e) =>
        {
            if (!this._ignoreHashChange && document.location.hash !== this._lastHash)
            {
                this._lastHash = document.location.hash;

                // Hash Changed
                console.log("The Hash Changed to: " + this._lastHash);

                if (this._lastHash[0] === "#")
                {
                    this.Init(this._lastHash.substr(1), false);
                }
            }

        });


    }


    /**
     * Updates the page with contents from the given URL
     * @param url The URL to load
     * @param callback Is triggered when the Asynchron process is done
     */
    public UpdatePage(url: string, callback: () => void)
    {
        $("#filterButtonContainer").hide();

        this.GetPageElements(this._basePath + url, function (res)
        {
            $(".FFNetContentContainer").html($("<div></div>").append(res.Content).html());
            $(".navi").html($("<div></div>").append(res.Navigation).html());

            callback();
        });
    }


    /**
     * Gets the Elements of a Page
     * @param url The for the Request
     * @param callback The Callback with the Elements
     */
    public GetPageElements(url: string, callback: (result: { Content: JQuery; Navigation: JQuery }) => void) 
    {

        this.GetPageContent(url,(res) =>
        {
            var result = {
                Content: res.find(".z-list"),
                Navigation: res.find("center").first()
            };

            this.HandleFilterModal(res);

            callback(result);
        });
    }

    private HandleFilterModal(modal: JQuery)
    {
        var modalBody = modal.find(".modal-body");
        // remove all Javascript Elements:

        var elements = modalBody.children();
        this.RemoveScripts(elements);

        // wrap Dropdowns in Rows:
       
        // var container = $('<div class="row"></div>').appendTo(modalBody);
        var selects = elements.filter("select");
        selects.each(function (_, el)
        {
            var element = $(el);

            var container = $('<div class="form-group"></div>').append(
                $('<label></label>')
                );

            element.after(container).detach();
            element.addClass("form-control").appendTo(container);

        });

        var buttons: JQuery[] = [];

        buttons.push(
            $('<button type="button" class="btn btn-primary" data-dismiss="modal">Apply</button>')
                .click(() =>
                {
                this.ApplyFilter();
                })
            );

        buttons.push($('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'));



        this._filterModal = GUIHandler.CreateBootstrapModal(modalBody, "Filter", buttons);
        $("#filterButtonContainer").show();
    }

    public ApplyFilter()
    {
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

        if ($('input[name=pm]').is(':checked'))
        {
            path += this.ZeroAppend($('input[name=pm]').val(), '&pm=');
        }
        if ($('input[name=_pm]').is(':checked'))
        {
            path += this.ZeroAppend($('input[name=_pm]').val(), '&_pm=');
        }

        console.log("Filter Path: ", path);
        this.Init(this._categoryBaseURL + '/?' + path, false);
    }

    /**
     * Copied from FF-Net
     */
    private ZeroAppend(compare, prepend: string): string
    {
        if (compare != undefined && compare > 0)
        {
            return prepend + compare;
        }
        else return '';
    }


    private RemoveScripts(elements: JQuery)
    {
        elements.remove("script").removeAttr("onchange").removeAttr("onclick");

        var elementsWithChilds = elements.has("*");
        if (elementsWithChilds.length > 0)
        {
            this.RemoveScripts(elementsWithChilds.children());
        }
    }

    public ShowFilterModal()
    {
        if (this._filterModal !== undefined)
        {
            GUIHandler.ShowModal(this._filterModal);
        }
    }


    /**
     * Stats the Userscript
     */
    public RunScript()
    {
        this._parser = new StoryParser();
        this._eventHandler = this._parser.EventHandler;
        this._progress.SetEventHandler(this._eventHandler);

        // Fix Chrome Sync Bug:
        this._parser.Config.chrome_sync = false;

        this.CallEvent("standaloneRunScript", this, null);

        //this.parser.readList();
        this._parser.EnablePocketSave();
        this._parser.EnableInStoryHighlighter();
        this._parser.EnableReadingAid();
        this._parser.EnableEndlessMode();

        this._parser.Api.Initialize();

        this._parser.Api.GetStyles();
        this.InsertStyle();

        this._parser.DebugOptions();
    }

    /**
     * Insert the Style needed for the Page
     */
    public InsertStyle()
    {
        this.GetRawPageContent("ffnetStyle.css",(s) =>
        {
            this.CallEvent("standaloneOnStyleInsert", this, s);

            $('<style type="text/css"></style>')
                .text(s)
                .appendTo($("head"));

        });

    }

    /**
       * Loads the Content of a Page  and returns the Data as JQuery Object
       * @param url The Request URI
       * @param callback The callback Function
       */
    public GetPageContent(url: string, callback: (page: JQuery) => void)
    {
        this.GetRawPageContent(url,(s) =>
        {
            callback($(s));
        });
    }

    /**
     * Loads the Content of a Page  and returns the Data as string
     * @param url The Request URI
     * @param callback The callback Function
     */
    public GetRawPageContent(url: string, callback: (page: string) => void)
    {
        if (this.DEBUG)
        {
            console.log("Requesting page: ", url);
        }

        this.CallEvent("standalonePreRequest", this, url);

        var self = this;

        $.get(url, function (content)
        {
            self.CallEvent("standaloneOnRequestDone", this, { url: url, content: content });

            callback(content);
        }).fail(function (event)
        {
            self.CallEvent("standaloneOnRequestFail", this, { url: url, event: event });
        });
    }

    // ***************** Categories Page ************

    /**
     * Loads the Categories from the Server
     * @param callback Callback with Result
     */
    public GetCategories(callback: (data: { [index: string]: { name: string; url: string }[] }) => void)
    {
        this.CallEvent("standalonePreRequestCategories", this, null);

        var self = this;

        this.GetPageContent(this._basePath, function (el)
        {
            var result: { [index: string]: { name: string; url: string }[] } = {};
            var cats = el.find(".tcat");

            cats.each(function (_, elem)
            {
                var cat = $(elem);
                var title = cat.find("b").last().text();

                result[title] = [];

                var childs = cat.next().find("td");
                childs.each(function (_, elem)
                {
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
    }

    /**
     * Creates the content for the Categories Page
     */
    public ManageCategories()
    {
        var self = this;

        this._eventHandler = new EventHandler(null);
        this._progress.SetEventHandler(this._eventHandler);

        this._progress.Show();

        this.GetCategories((result) =>
        {
            console.log(result);

            $(".categoriesContainer").html("");

            $.each(result, function (name: string, elements: { name: string; url: string }[])
            {
                var rowContainer = $('<div clas="row"></div>').appendTo('.categoriesContainer');

                $('<div class="col-md-12" style="background-color: #f5f5f5"><h2>' + name + '</h2></div>').appendTo(rowContainer);

                $.each(elements, function (_, element: { name: string; url: string })
                {
                    var container = $('<div class="col-md-6"></div>').appendTo(rowContainer);
                    container.append(
                        $('<button class="btn btn-default btn-lg btn-block"></button>').text(element.name) //  style="width:100%"
                            .click(function (e)
                        {
                            e.preventDefault();

                            document.location.href = "elements.html?cat=" + element.url;
                        })
                        );


                });
            });

            self.CallEvent("standaloneCategoriesParsed", self, result);
            self._progress.Hide();
        });
    }

    // ************ Elements *************

    /**
     * Loads the Elements (StoryBase) from the Server
     * @param url The URL to load from
     * @param callback Is triggered when the async Request is done
     */
    public GetElements(url: string, callback: (name: string, data: { name: string; url: string; count: string; }[]) => void)
    {
        var self = this;

        this.CallEvent("standalonePreRequestElements", self, url);

        this.GetPageContent(this._basePath + url, function (res)
        {
            var result: { name: string; url: string; count: string; }[] = [];
            var elements = res.find("#list_output").find("div");

            elements.each(function (_, el)
            {
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
    }

    public ManageElements()
    {
        this._eventHandler = new EventHandler(null);
        this._progress.SetEventHandler(this._eventHandler);

        this._progress.Show();

        var url = this.GetSearchString("cat");

        console.log("cat: ", url);

        if (url !== undefined)
        {
            var self = this;

            this.GetElements(url, function (name, elements)
            {
                $(".elementsContainer").html('');

                var body = $('<tbody></tbody>');

                $('<table class="table" style="width:90%"><thead><tr><th>Name</th><th>Stories</th></tr></thead></table>').append(body).appendTo(".elementsContainer");

                $.each(elements, function (_, element: { name: string; url: string; count: string; })
                {
                    var tr = $('<tr></tr').appendTo(body);

                    tr.append($('<td></td>').append(
                        $('<button class="btn btn-default btn-lg btn-block" ></button>').click( // style="width:100%"
                            function (e)
                            {
                                e.preventDefault();

                                if (element.url.indexOf("crossovers") !== -1)
                                {
                                    document.location.href = "elements.html?cat=" + element.url;
                                }
                                else
                                {
                                    document.location.href = "start.html#" + element.url;
                                }



                            }).text(element.name)
                        )
                        ).append($('<td></td>').text(element.count));

                });

                self.CallEvent("standaloneElementsParsed", self, [name, elements]);
                self._progress.Hide();
            });

        } else
        {
            $(".elementsContainer").html('<h1>Please don\'t open this Page directly! Redirecting ...');

            window.setTimeout(function ()
            {
                document.location.href = "categories.html";

            }, 1000);
        }


    }

    public GetSearchString(key: string): string
    {
        var regEx = new RegExp(key + '=' + '(.+)', "i");
        var groups = regEx.exec(document.location.search);


        return (groups !== null) ? groups[1] : undefined;
    }


}

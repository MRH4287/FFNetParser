/// <reference path="../userscript.ts" /> 

/**
 * Class used for the Standalone Mode
 */
class Standalone
{
    private DEBUG = true;

    //private BasePath = "http://localhost:49990/FanFictionUserScript/FFNetProxy/?url="; 
    //private BasePath = "https://www.fanfiction.net/";
    private BasePath = "http://localhost:8080/";
    private parser: StoryParser;

    private lastHash: string = "";
    private ignoreHashChange: boolean = false;

    private copy: { [index: string]: JQuery } = {};

    constructor()
    {
        var self = this;

        $(document).ready(function ()
        {
            self.saveElement("menulink");
            self.saveElement("StandaloneMainContaniner");
        });

    }

    private saveElement(className: string)
    {
        this.copy[className] = $("." + className).clone();
    }

    private restoreElement(className: string)
    {
        var self = this;

        if (typeof (self.copy[className]) === "undefined")
        {
            return;
        }

        $("." + className).html(self.copy[className].html());
    }

    public clear()
    {
        //this.restoreElement("menulink");
        this.restoreElement("StandaloneMainContaniner");

    }

    /**
     * Starts the Standalone Mode
     */
    public init(url: string = "/game/pokemon", firstRun = true)
    {
        this.ignoreHashChange = true;

        console.log("Current Hash: " + document.location.hash);

        if (firstRun && document.location.hash !== "")
        {
            url = document.location.hash.substr(1);

            console.log("Get URL from Hash: " + url);
        }

        console.info("Loading URL: ", url);

        var self = this;

        this.clear();
        this.updatePage(url, () =>
        {
            document.location.hash = "#" + url;
            this.lastHash = document.location.hash;


            $(".navi").find("a").each((k, el) =>
            {
                var element = $(el);

                if (element.attr("href")[0] == "/")
                {
                    element.attr("data-href", element.attr("href"));
                    element.attr("href", self.BasePath + element.attr("href"));

                    element.click((e) =>
                    {
                        e.preventDefault();

                        this.init(element.attr("data-href"), false);

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
                this.runScript();
                this.startHashTimer();
            }

            this.parser.readList();

            this.ignoreHashChange = false;
        });


    }

    private startHashTimer()
    {
        window.setInterval(() =>
        {
            if (!this.ignoreHashChange && document.location.hash !== this.lastHash)
            {
                this.lastHash = document.location.hash;

                // Hash Changed
                console.log("The Hash Changed to: " + this.lastHash);

                if (this.lastHash[0] === "#")
                {
                    this.init(this.lastHash.substr(1), false);
                }
            }

        }, 1000);


    }



    public updatePage(url: string, callback: () => void)
    {
        this.getPageElements(this.BasePath + url, function (res)
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
    public getPageElements(url: string, callback: (result: { Content: JQuery; Navigation: JQuery }) => void) 
    {

        this.getPageContent(url, (res) =>
        {
            var result = {
                Content: res.find(".z-list"),
                Navigation: res.find("center").first()
            };

            callback(result);
        });
    }


    /**
     * Stats the Userscript
     */
    public runScript()
    {
        this.parser = new StoryParser();

        // Fix Chrome Sync Bug:
        this.parser.config.chrome_sync = false;


        //this.parser.readList();
        this.parser.enablePocketSave();
        this.parser.enableInStoryHighlighter();
        this.parser.enableReadingAid();
        this.parser.enableEndlessMode();

        this.parser.api_getStyles();
        this.insertStyle();

        this.parser.GUI.BOOTSTRAP = true;

        this.parser.debugOptions();
    }

    public insertStyle()
    {
        this.getRawPageContent("ffnetStyle.css", (s) =>
        {
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
    public getPageContent(url: string, callback: (page: JQuery) => void)
    {
        this.getRawPageContent(url, (s) =>
        {
            callback($(s));
        });
    }

    /**
     * Loads the Content of a Page  and returns the Data as string
     * @param url The Request URI
     * @param callback The callback Function
     */
    public getRawPageContent(url: string, callback: (page: string) => void)
    {
        if (this.DEBUG)
        {
            console.log("Requesting page: ", url);
        }

        var self = this;

        $.get(url, function (content)
        {
            callback(content);
        });
    }

    // ***************** Categories Page ************

    /**
     * Loads the Categories from the Server
     * @param callback Callback with Result
     */
    public getCategories(callback: (data: { [index: string]: { name: string; url: string }[] }) => void)
    {
        var self = this;

        this.getPageContent(this.BasePath, function (el)
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

            callback(result);

        });
    }

    /**
     * Creates the content for the Categories Page
     */
    public manageCategories()
    {
        var self = this;

        this.getCategories(function (result)
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
                        $('<button class="btn btn-default" style="width:100%"></button>').text(element.name)
                            .click(function (e)
                            {
                                e.preventDefault();

                                document.location.href = "elements.html?cat=" + element.url;
                            })
                        );


                });
            });


        });
    }

    // ************ Elements *************

    public getElements(url: string, callback: (name: string, data: { name: string; url: string; count: string; }[] ) => void)
    {
        var self = this;
        this.getPageContent(this.BasePath + url, function (res)
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

            callback(res.find("#content_wrapper_inner").find("td").first().text().trim(), result);
        });
    }

    public manageElements()
    {
        var url = this.getSearchString("cat");

        console.log("cat: ", url);

        if (url !== undefined)
        {
            var self = this;

            this.getElements(url, function (name, elements)
            {
                $(".elementsContainer").html('');

                var body = $('<tbody></tbody>');

                $('<table class="table" style="width:90%"><thead><tr><th>Name</th><th>Stories</th></tr></thead></table>').append(body).appendTo(".elementsContainer");

                $.each(elements, function (_, element: { name: string; url: string; count: string; })
                {
                    var tr = $('<tr></tr').appendTo(body);

                    tr.append($('<td></td>').append(
                        $('<button class="btn btn-default" style="width:100%"></button>').click(
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

    public getSearchString(key: string): string
    {
        var regEx = new RegExp(key + '=' + '(.+)', "i");
        var groups = regEx.exec(document.location.search);


        return (groups !== null) ?  groups[1] : undefined;
    }


}

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

        if (self.copy[className] === undefined)
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


            $(".navi").find("a").each ((k, el) =>
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
                    var link = "https://www.fanfiction.net/" + element.attr("href");
                    element.attr("href", link);
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

        //this.parser.readList();
        this.parser.enablePocketSave();
        this.parser.enableInStoryHighlighter();
        this.parser.enableReadingAid();
        this.parser.enableEndlessMode();

        this.parser.api_getStyles();

        this.parser.debugOptions();
    }

    /**
       * Loads the Content of a Page  and returns the Data as JQuery Object
       * @param url The Request URI
       * @param callback The callback Function
       */
    public getPageContent(url: string, callback: (page: JQuery) => void)
    {
        if (this.DEBUG)
        {
            console.log("Requesting next page: ", url);
        }

        var self = this;

        $.get(url, function (content)
        {
            var data = $(content);

            callback(data);
        });


    }

}

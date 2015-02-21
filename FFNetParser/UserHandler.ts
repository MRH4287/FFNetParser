/// <reference path="userscript.ts" />

class UserHandler extends ExtentionBaseClass
{
    private rainbowColors = [
        [255, 0, 0], //Red
        [255, 62, 0],
        [255, 106, 0], // Orange
        //[255, 171, 0],
        //[250, 237, 0], // Yellow
        //[80, 205, 0],
        [0, 255, 0], // Green
        [0, 144, 230],
        [0, 0, 255], // Blue
        [67, 0, 218],
        [75, 0, 130], // Indigo
        [41, 0, 68],
        [125, 0, 255] // Violet
    ];

    private specialUsers: Number[] =
    [
        4319809, // aguscha333
        2918285 // Tanon
    ];

    private userRegEx = new RegExp("\/u\/([0-9]+)\/(.+)");

    public constructor(parser: StoryParser)
    {
        super(parser);

        this.parser.eventHandler.addEventListener("postElementParse", (sender, element) =>
        {
            var links = element.find("a");
            var found = false;
            $.each(links, (_, el) =>
            {
                el = $(el);

                if (typeof (el) === "undefined" || found)
                {
                    return;
                }

                var href = el.attr("href");
                if (this.userRegEx.test(href))
                {
                    var res = this.userRegEx.exec(href);

                    if (res[1] !== undefined)
                    {
                        try
                        {
                            var userNumber = Number(res[1]);

                            if (this.specialUsers.indexOf(userNumber) !== -1)
                            {
                                this.doRainbow(el, "- Special Supporter of the Fanfiction Story-Parser");
                            }

                        }
                        catch (Exception)
                        {
                        }

                    }

                    found = true;
                    return;

                }

            });
        });
    }

    public doRainbow(element: JQuery, title: string = null, prependUsername: boolean = true)
    {

        var text = element.text();

        var length = text.length;
        var elementCount = Math.ceil(length / this.rainbowColors.length);

        var container = $("<div></div>");

        for (var i = 0; i < text.length; i++)
        {
            var currentColor = Math.floor(i / elementCount);
            var color = this.rainbowColors[currentColor % this.rainbowColors.length];

            container.append(
                $("<span></span>")
                    .text(text[i])
                    .css("color", "rgb(" + color[0] + ", " + color[1] + ", " + color[2])
                );

        }

        if (title !== null)
        {
            if (prependUsername)
            {
                title = element.text() + " " + title;
            }
        }
        else
        {
            if (prependUsername)
            {
                title = element.text();
            }

        }

        element.attr("title", title);



        element.html(container[0].innerHTML);



    }


}

/// <reference path="userscript.ts" />

class UserHandler extends ExtentionBaseClass
{
    // TODO: Event System ....

    private rainbowColors = [
        [255, 0, 0], //Red
        [255, 62, 0],
        [255, 106, 0], // Orange
        [255, 171, 0],
        [250, 237, 0], // Yellow
        [80, 205, 0],
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

    public constructor(parser: StoryParser)
    {
        super(parser);
    }

    public doRainbow(element: JQuery)
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

        element.html(container[0].innerHTML);

    }


}

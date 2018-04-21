/// <reference path="_reference.ts" /> 
class UserHandler extends ExtentionBaseClass {
    constructor(parser) {
        super(parser);
        this._rainbowColors = [
            [255, 0, 0],
            [255, 62, 0],
            [255, 106, 0],
            [0, 255, 0],
            [0, 144, 230],
            [0, 0, 255],
            [67, 0, 218],
            [75, 0, 130],
            [41, 0, 68],
            [125, 0, 255] // Violet
        ];
        this._specialUsers = [
            4319809,
            2918285 // Tanon
        ];
        this._userRegEx = new RegExp("\/u\/([0-9]+)\/(.+)");
        this.Parser.EventHandler.AddEventListener(Events.PostElementParse, (sender, element) => {
            var links = element.find("a");
            var found = false;
            $.each(links, (_, el) => {
                el = $(el);
                if (typeof (el) === "undefined" || found) {
                    return;
                }
                var href = el.attr("href");
                if (this._userRegEx.test(href)) {
                    var res = this._userRegEx.exec(href);
                    if (res[1] !== undefined) {
                        try {
                            var userNumber = Number(res[1]);
                            if (this._specialUsers.indexOf(userNumber) !== -1) {
                                this.DoRainbow(el, "- Special Supporter of the Fanfiction Story-Parser");
                            }
                        }
                        catch (exception) {
                        }
                    }
                    found = true;
                    return;
                }
            });
        });
    }
    DoRainbow(element, title = null, prependUsername = true) {
        var text = element.text();
        var length = text.length;
        var elementCount = Math.ceil(length / this._rainbowColors.length);
        var container = $("<div></div>");
        for (var i = 0; i < text.length; i++) {
            var currentColor = Math.floor(i / elementCount);
            var color = this._rainbowColors[currentColor % this._rainbowColors.length];
            container.append($("<span></span>")
                .text(text[i])
                .css("color", "rgb(" + color[0] + ", " + color[1] + ", " + color[2]));
        }
        if (title !== null) {
            if (prependUsername) {
                title = element.text() + " " + title;
            }
        }
        else {
            if (prependUsername) {
                title = element.text();
            }
        }
        element.attr("title", title);
        element.html(container[0].innerHTML);
    }
}

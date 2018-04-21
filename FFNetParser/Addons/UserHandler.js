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
var UserHandler = (function (_super) {
    __extends(UserHandler, _super);
    function UserHandler(parser) {
        var _this = _super.call(this, parser) || this;
        _this._rainbowColors = [
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
        _this._specialUsers = [
            4319809,
            2918285 // Tanon
        ];
        _this._userRegEx = new RegExp("\/u\/([0-9]+)\/(.+)");
        _this.Parser.EventHandler.AddEventListener(Events.PostElementParse, function (sender, data) {
            var element = data.Element;
            var links = element.find("a");
            var found = false;
            $.each(links, function (_, el) {
                el = $(el);
                if (typeof (el) === "undefined" || found) {
                    return;
                }
                var href = el.attr("href");
                if (_this._userRegEx.test(href)) {
                    var res = _this._userRegEx.exec(href);
                    if (res[1] !== undefined) {
                        try {
                            var userNumber = Number(res[1]);
                            if (_this._specialUsers.indexOf(userNumber) !== -1) {
                                _this.DoRainbow(el, "- Special Supporter of the Fanfiction Story-Parser");
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
        return _this;
    }
    UserHandler.prototype.DoRainbow = function (element, title, prependUsername) {
        if (title === void 0) { title = null; }
        if (prependUsername === void 0) { prependUsername = true; }
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
    };
    return UserHandler;
}(ExtentionBaseClass));
//# sourceMappingURL=UserHandler.js.map
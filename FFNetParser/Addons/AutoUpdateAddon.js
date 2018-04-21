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
var AutoUpdateAddon = (function (_super) {
    __extends(AutoUpdateAddon, _super);
    function AutoUpdateAddon(parser) {
        var _this = _super.call(this, parser) || this;
        var self = _this;
        _this.EventHandler.AddEventListener(Events.OnLoad, function (sender, args) {
            if (typeof (_this.Config["api_autoIncludeNewVersion"]) === "undefined") {
                // Only Check if the Script is not loaded over Chrome!
                if ((typeof (chrome) === "undefined") || (typeof (chrome.runtime) === "undefined")) {
                    // Creates Warning for new Feature:
                    var text = "<div><b>Please Read!</b><br />";
                    text += "In one of the previous version, a new feature has been implemented. With this Feature activated, you don't have to manually install new Versions. ";
                    text += "Newer Versions will be saved in your Local Storage and then executed. Because of that, the Version Number displayed in your UserScript Manager ";
                    text += "can be wrong. To Display the Version Number, check your Menu.";
                    text += "Do you want to activate this Feature?</div>";
                    var buttons = [];
                    var modal;
                    buttons.push($('<button class="btn btn-primary">Enable Feature</button>').click(function () {
                        modal.modal('hide');
                        self.Config['api_autoIncludeNewVersion'] = true;
                        self.EventHandler.CallEvent(Events.ActionForceSaveConfig, self, undefined);
                    }));
                    buttons.push($('<button class="btn btn-default">Keep Disabled</button>').click(function () {
                        modal.modal('hide');
                        self.Config['api_autoIncludeNewVersion'] = false;
                        self.EventHandler.CallEvent(Events.ActionForceSaveConfig, self, undefined);
                    }));
                    modal = GUIHandler.CreateBootstrapModal($(text), "Fanfiction Story Parser", buttons);
                    window.setTimeout(function () {
                        GUIHandler.ShowModal(modal);
                    }, 1000);
                }
                else {
                    self.Config['api_autoIncludeNewVersion'] = false;
                    self.EventHandler.CallEvent(Events.ActionForceSaveConfig, self, undefined);
                }
            }
        });
        return _this;
    }
    return AutoUpdateAddon;
}(ExtentionBaseClass));
//# sourceMappingURL=AutoUpdateAddon.js.map
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
var ChromeSyncAddon = (function (_super) {
    __extends(ChromeSyncAddon, _super);
    function ChromeSyncAddon(parser) {
        var _this = _super.call(this, parser) || this;
        var self = _this;
        _this.EventHandler.AddEventListener(Events.OnLoad, function (sender, args) {
            // Google Storage Sync:
            if ((typeof (chrome) !== "undefined") && (typeof (chrome.runtime) !== "undefined") && (_this.Config.chrome_sync)) {
                window.setTimeout(function () {
                    self.EventHandler.CallEvent(Events.OnChromeSync, self, null);
                    console.info("Load Config from Chrome Server");
                    // Load Config from the Chrome Server:
                    chrome.storage.sync.get(function (result) {
                        self.Log("Got Data from Chrome Server: ", result);
                        self.EventHandler.CallEvent(Events.OnChromeSyncDataReceived, self, result);
                        $.each(self.Config, function (name, oldValue) {
                            if (typeof (result[name]) !== "undefined") {
                                self.Log("Key: '" + name + "'", oldValue, result[name]);
                                self.Config[name] = result[name];
                            }
                        });
                    });
                }, 2000);
                chrome.storage.onChanged.addListener(function (changes, namespace) {
                    if (namespace !== "sync") {
                        return;
                    }
                    self.EventHandler.CallEvent(Events.OnChromeSyncChange, self, [changes, namespace]);
                    $.each(changes, function (key, storageChange) {
                        //var storageChange = changes[key];
                        console.log('Storage key "%s" changed. ' +
                            'Old value was "%s", new value is "%s".', key, storageChange.oldValue, storageChange.newValue);
                        if (self.Config[key] === storageChange.oldValue) {
                            self.Config[key] = storageChange.newValue;
                        }
                        else if (self.Config[key] !== storageChange.newValue) {
                            // Use local Value for UpgradeTags
                            if (key !== "upgradeTags") {
                                console.warn("Conflict with Cloud Storage! Use data from Cloud Storage.");
                                try {
                                    //localStorage[self.config.storage_key + "_Conflict" + Date.now()] = JSON.stringify(self.config);
                                }
                                catch (e) {
                                }
                                self.Config[key] = storageChange.newValue;
                            }
                            else {
                                var val = storageChange.newValue;
                                $.each(val, function (key, val) {
                                    if (!(key in self.Config.upgradeTags)) {
                                        self.Config.upgradeTags[key] = val;
                                    }
                                });
                            }
                        }
                    });
                });
            }
        });
        return _this;
    }
    return ChromeSyncAddon;
}(ExtentionBaseClass));
//# sourceMappingURL=ChromeSyncAddon.js.map
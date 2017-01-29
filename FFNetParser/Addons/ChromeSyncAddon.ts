/// <reference path="../_reference.ts" />

class ChromeSyncAddon extends ExtentionBaseClass
{
    public constructor(parser: StoryParser)
    {
        super(parser);

        var self = this;

        this.EventHandler.AddEventListener(Events.OnLoad, (sender, args) =>
        {
            // Google Storage Sync:
            if ((typeof (chrome) !== "undefined") && (typeof (chrome.runtime) !== "undefined") && (this.Config.chrome_sync))
            {
                window.setTimeout(function ()
                {
                    self.EventHandler.CallEvent(Events.OnChromeSync, self, null);
                    console.info("Load Config from Chrome Server");

                    // Load Config from the Chrome Server:
                    chrome.storage.sync.get(function (result: Config)
                    {
                        self.Log("Got Data from Chrome Server: ", result);

                        self.EventHandler.CallEvent(Events.OnChromeSyncDataReceived, self, result);

                        $.each(self.Config, function (name, oldValue)
                        {
                            if (typeof (result[name]) !== "undefined")
                            {
                                self.Log("Key: '" + name + "'", oldValue, result[name]);

                                self.Config[name] = result[name];
                            }
                        });
                    });

                }, 2000);

                chrome.storage.onChanged.addListener(function (changes, namespace)
                {
                    if (namespace !== "sync")
                    {
                        return;
                    }

                    self.EventHandler.CallEvent(Events.OnChromeSyncChange, self, [changes, namespace]);

                    $.each(changes, function (key, storageChange)
                    {

                        //var storageChange = changes[key];
                        console.log('Storage key "%s" changed. ' +
                            'Old value was "%s", new value is "%s".',
                            key,
                            storageChange.oldValue,
                            storageChange.newValue);

                        if (self.Config[key] === storageChange.oldValue)
                        {
                            self.Config[key] = storageChange.newValue;
                        }
                        else if (self.Config[key] !== storageChange.newValue)
                        {
                            // Use local Value for UpgradeTags
                            if (key !== "upgradeTags")
                            {

                                console.warn("Conflict with Cloud Storage! Use data from Cloud Storage.");
                                try
                                {
                                    //localStorage[self.config.storage_key + "_Conflict" + Date.now()] = JSON.stringify(self.config);

                                } catch (e)
                                {

                                }

                                self.Config[key] = storageChange.newValue;

                            }
                            else
                            {
                                var val = <{ [index: string]: UpgradeTag }>storageChange.newValue;
                                $.each(val, function (key, val)
                                {
                                    if (!(key in self.Config.upgradeTags))
                                    {
                                        self.Config.upgradeTags[key] = val;
                                    }
                                });
                            }

                        }
                    });
                });
            }

        });

    }

}
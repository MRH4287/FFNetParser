/// <reference path="_reference.ts" /> 

class UpgradeHandler extends ExtentionBaseClass
{
    private registeredTags: { [index: string]: { ifNotExist?: (self: UpgradeHandler) => void; ifExist?: (self: UpgradeHandler) => void } } = {};

    public constructor(parser: StoryParser)
    {
        super(parser);

        this.initTags();
    }

    public initTags()
    {
        if (this.DEBUG)
        {
            this.log("Upgrade Handler Initiate");
        }
        var self = this;

        // Update 5.4.9 - API
        this.registerTag("filter_keep_searching", function ()
        {
            self.config.api_enabled = false;

            self.parser.save_config();

            return true;
        });

        // Update 5.2.4 - Adds Keep Searching to the Filter Config
        this.registerTag("filter_keep_searching", function ()
        {
            $.each(self.config.marker, function (name: string, data: MarkerConfig)
            {
                if (typeof (data.keep_searching) === "undefined")
                {
                    self.config.marker[name].keep_searching = false;
                }
            });

            self.parser.save_config();

            return true;
        });


        // Update 5.2.9 - Adds Images to Filter && Implementation of new Highlighter System
        this.registerTag("filter_Image_highlighter_5.2.9", function ()
        {

            $.each(self.config.marker, function (name: string, data: MarkerConfig)
            {
                if (typeof (data.image) === "undefined")
                {
                    self.config.marker[name].image = null;
                }
            });


            $.each(self.config.highlighter, function (link, element)
            {
                if (typeof (element) !== "object")
                {
                    if (self.DEBUG)
                    {
                        console.log("Updated old Highlighter Object");
                    }

                    self.config.highlighter[link] =
                        {
                            image: String(element),
                            hide: false
                        };
                }

                if ((typeof (self.config.highlighter[link].custom) === "undefined") && (typeof (self.config.highlighter[link].prefab) === "undefined"))
                {
                    self.config.highlighter[link].custom = {
                        background: null,
                        color: null,
                        display: !self.config.highlighter[link].hide,
                        ignoreColor: null,
                        image: self.config.highlighter[link].image,
                        mark_chapter: null,
                        mouseOver: null,
                        name: "Legacy-Custom",
                        priority: 1,
                        customPriority: null,
                        note: null,
                        text_color: null,
                        highlight_color: null
                    };

                    self.config.highlighter[link].hide = null,
                        self.config.highlighter[link].image = null;
                }



            });

            self.parser.save_config();

            return true;
        });

        this.registerTag("highlighter_defaultValues", function ()
        {

            var highlighterDefault =
                {
                    "Hide":
                    {
                        "background": "",
                        "color": "",
                        "customPriority":
                        {
                            "background": 1,
                            "color": 1,
                            "highlight_color": 1,
                            "mouseOver": 1,
                            "text_color": 1
                        },
                        "display": false,
                        "highlight_color": "#ff0000",
                        "ignoreColor": true,
                        "image": "",
                        "mark_chapter": false,
                        "mouseOver": "",
                        "name": "Hide",
                        "note": "",
                        "text_color": "#686868"
                    },
                    "Bad":
                    {
                        "background": "",
                        "color": "",
                        "customPriority":
                        {
                            "background": 1,
                            "color": 1,
                            "highlight_color": 1,
                            "mouseOver": 1,
                            "text_color": 1
                        },
                        "display": true,
                        "highlight_color": "#ff8500",
                        "ignoreColor": true,
                        "image": "https://private.mrh-development.de/ff/6.gif",
                        "mark_chapter": true,
                        "mouseOver": "",
                        "name": "Bad",
                        "note": "",
                        "priority": 1,
                        "text_color": "#686868"
                    },
                    "Good":
                    {
                        "background": "",
                        "color": "",
                        "customPriority":
                        {
                            "background": 1,
                            "color": 1,
                            "highlight_color": 1,
                            "mouseOver": 1,
                            "text_color": 1
                        },
                        "display": true,
                        "highlight_color": "#43ff00",
                        "ignoreColor": true,
                        "image": "https://private.mrh-development.de/ff/5.gif",
                        "mark_chapter": true,
                        "mouseOver": "",
                        "name": "Good",
                        "note": "",
                        "priority": 1,
                        "text_color": "#686868"
                    }
                };

            $.each(highlighterDefault, function (name, element)
            {
                if (typeof (self.config.highlighterPrefabs[name]) === "undefined")
                {
                    self.config.highlighterPrefabs[name] = element;
                }
            });

            self.parser.save_config(true);

            return true;
        });

        this.registerTag("highlighter_storyID", function ()
        {
            if (!self.parser.config.highlighter_use_storyID)
            {
                return false;
            }

            var newData: { [index: string]: HighlighterConfig } = {};
            $.each(self.parser.config.highlighter, function (key, value)
            {
                var info = self.parser.getStoryInfo(key);
                if (info.ID in newData)
                {
                    return;
                }

                newData[info.ID] = value;
            });

            self.parser.config.highlighter = newData;

            self.parser.save_config(true);

            return true;
        });
    }



    public handleTags()
    {
        if (typeof (this.config.upgradeTags) === "undefined")
        {
            this.log("Upgrade Handler: Initializing Upgrade Tags Variable");
            this.parser.save_config(false);

            this.config.upgradeTags = {};
        }
        var self = this;


        $.each(this.registeredTags, function (name: string, data: { ifNotExist?: (self: UpgradeHandler) => boolean; ifExist?: (self: UpgradeHandler) => boolean })
        {
            if (self.DEBUG)
            {
                console.log("Upgrade Handler: Checking Tag - ", name);
            }

            if (typeof (self.config.upgradeTags[name]) === "undefined" && typeof (data.ifNotExist) !== "undefined")
            {
                if (self.DEBUG)
                {
                    console.log("Upgrade Handler: Executing IfNotExist Handler for Tag: ", name);
                }

                if (!data.ifNotExist(self))
                {
                    return;
                }
            }
            else if (typeof (self.config.upgradeTags[name]) !== "undefined" && typeof (data.ifExist) !== "undefined")
            {
                if (self.DEBUG)
                {
                    console.log("Upgrade Handler: Executing IfExist Handler for Tag: ", name);
                }

                if (!data.ifExist(self))
                {
                    return;
                }
            }


            self.config.upgradeTags[name] = {
                lastRun: Date.now()
            };

            self.parser.save_config(false);
        });

    }


    private registerTag(name: string, ifNotExist?: (self: UpgradeHandler) => void, ifExist?: (self: UpgradeHandler) => void)
    {
        if (typeof (this.registeredTags[name]) !== "undefined")
        {
            this.log("Upgrade Handler: Tag with name '" + name + "' is already registered!", this.registeredTags);
            return;
        }

        if ((typeof (ifNotExist) === "undefined") && (typeof (ifExist) === "undefined"))
        {
            this.log("Upgrade Handler: At least one of the callback Functions has to be set!", name);
            return;
        }

        this.registeredTags[name] = {
            ifNotExist: ifNotExist,
            ifExist: ifExist
        };
    }

    public removeTag(name: string)
    {
        if (typeof (this.config.upgradeTags[name]) !== "undefined")
        {
            delete this.config.upgradeTags[name];
            this.parser.save_config();
        }
        else
        {
            this.log("Upgrade Tag do not Exist!");
        }

    }


}

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



        // Update 5.2.4 - Adds Keep Searching to the Filter Config
        this.registerTag("filter_keep_searching", function ()
        {
            $.each(self.config.marker, function (name: string, data: MarkerConfig)
            {
                if (data.keep_searching === undefined)
                {
                    self.config.marker[name].keep_searching = false;
                }
            });

            self.parser.save_config();
        });


        // Update 5.2.9 - Adds Images to Filter && Implementation of new Highlighter System
        this.registerTag("filter_Image_highlighter_5.2.9", function ()
        {

            $.each(self.config.marker, function (name: string, data: MarkerConfig)
            {
                if (data.image === undefined)
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

                if ((self.config.highlighter[link].custom === undefined) && (self.config.highlighter[link].prefab === undefined))
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
        });


    }



    public handleTags()
    {
        if (this.config.upgradeTags === undefined)
        {
            this.log("Upgrade Handler: Initializing Upgrade Tags Variable");
            this.parser.save_config(false);

            this.config.upgradeTags = {};
        }
        var self = this;


        $.each(this.registeredTags, function (name: string, data: { ifNotExist?: (self: UpgradeHandler) => void; ifExist?: (self: UpgradeHandler) => void })
        {
            if (self.config.upgradeTags[name] === undefined && data.ifNotExist !== undefined)
            {
                self.log("Upgrade Handler: Executing IfNotExist Handler for Tag: ", name);

                data.ifNotExist(self);
            }
            else if (self.config.upgradeTags[name] !== undefined && data.ifExist !== undefined)
            {
                self.log("Upgrade Handler: Executing IfExist Handler for Tag: ", name);

                data.ifExist(self);
            }


            self.config.upgradeTags[name] = {
                lastRun: Date.now()
            };

            self.parser.save_config(false);
        });

    }


    private registerTag(name: string, ifNotExist?: (self: UpgradeHandler) => void, ifExist?: (self: UpgradeHandler) => void)
    {
        if (this.registeredTags[name] !== undefined)
        {
            this.log("Upgrade Handler: Tag with name '" + name + "' is already registered!", this.registeredTags);
            return;
        }

        if ((ifNotExist === undefined) && (ifExist === undefined))
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
        if (this.config.upgradeTags[name] !== undefined)
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

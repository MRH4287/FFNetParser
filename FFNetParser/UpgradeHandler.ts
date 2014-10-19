﻿class UpgradeHandler extends ExtentionBaseClass
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


    }



    public handleTags()
    {
        if (this.config.upgradeTags === undefined)
        {
            this.log("Upgrade Handler: Initializing Upgrade Tags Variable");
            this.parser.save_config();

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

            self.parser.save_config();
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
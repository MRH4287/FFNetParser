/// <reference path="../_reference.ts" />

class HighlighterHandler extends ExtentionBaseClass
{
    public constructor(parser: StoryParser)
    {
        super(parser);

        var self = this;

        if (!this.Config.disable_highlighter)
        {
            self.EventHandler.AddEventListener(Events.PostElementParse, (s, data: ElementParseEventArgs) =>
            {
                self.UpdateElement(data);
            });

            self.EventHandler.AddEventListener(Events.OnLoad, () =>
            {
                self.EnableInStoryHighlighter();
            });           
        }
    }


    private UpdateElement(data: ElementParseEventArgs)
    {
        var self = this;
        var element = data.Element;

        // Build Context Menu for Storys:
        var contextMenu = $("<div></div>")
            .css("width", "20px")
            .css("height", "20px")
            .css("float", "right")
            .addClass("parser-msg")
            .addClass("context-menu")
            .append(
            $("<img></img>")
                .attr("src", self.Api.GetUrl("edit.gif"))
                .css("width", "100%")
                .css("height", "100%")
            );

        // Open GUI
        contextMenu.click(function ()
        {
            if (self.DEBUG)
            {
                console.log("Context Menu for ", element, " clicked");
            }

            self.EventHandler.CallEvent(Events.GuiShowStoryPrefabList, self, data);

        });

        element.find("div").first().before(contextMenu);

        var highlighterKey = self.Config.highlighter_use_storyID ? data.ID : data.Url;
        // Highlighter found:
        if (typeof (self.Config['highlighter'][highlighterKey]) !== "undefined")
        {
            self.HighlighterCallback(self.Config.highlighter[highlighterKey], data);
        }
    }


    /**
     * Callback triggered, if an highlighter was found
     * @param self The current Instance
     * @param config Highlighter Config
     * @param element The Element containing the match
     * @param link The link that was matched
     * @param page The Pafe of this Event
     */
    private HighlighterCallback(config: HighlighterConfig, data: ElementParseEventArgs)
    {
        var self = this;
        var element = data.Element;

        if (self.DEBUG)
        {
            console.info("Highlight Element Found: ", data.Element);
        }

        this.EventHandler.CallEvent(Events.PreHighlighterCallback, this, [config, data.Element, data.Url, data.Chapter]);

        // Collect Data:
        var mod: ModificationBase;

        if ((typeof (config.prefab) !== "undefined") && (config.prefab !== null) && (config.prefab !== "") && (config.prefab !== " "))
        {
            if (typeof (self.Config.highlighterPrefabs[config.prefab]) !== "undefined")
            {
                mod = self.Config.highlighterPrefabs[config.prefab];
            }
            else
            {
                console.warn("Found Highlighter for Story '%s' but the refferenced Prefab '%s' was not found!", data.Url, config.prefab);
                return;
            }
        }
        else if ((typeof (config.custom) !== "undefined") && (config.custom !== null))
        {
            mod = config.custom;
            mod.name = "Custom Highlighter";
        }
        else
        {
            // This shouldn't be neccessary, because of the Upgrade Handler
            // But if that fails, we have a extra safety rope :3

            mod = {
                name: "Legacy-Custom",
                background: null,
                color: null,
                display: !config.hide,
                ignoreColor: null,
                image: config.image,
                mark_chapter: null,
                mouseOver: null,
                text_color: null,
                priority: 1,
                note: null,
                customPriority: null,
                highlight_color: null
            };
        }



        if (!mod.display)
        {
            var hideData: HideElementEventArgs =
                {
                    CurrentPage: data.CurrentPage,
                    Element: data.Element,
                    Reason: "Highlighter",
                    Url: data.Url
                };
            self.EventHandler.CallEvent(Events.HideElement, self, hideData);
        }
        else
        {
            var priority: ModififcationPriority;
            if (mod.priority !== -1)
            {
                priority = {
                    background: mod.priority,
                    color: mod.priority,
                    highlight_color: mod.priority,
                    mouseOver: mod.priority,
                    text_color: mod.priority
                };
            }
            else
            {
                if ((typeof (mod.customPriority) !== "undefined") && (mod.customPriority !== null))
                {
                    priority = mod.customPriority;
                }
                else
                {
                    console.warn("Custom Priority set for Element. But Config is not defined!", config);

                    priority = {
                        background: 1,
                        color: 1,
                        highlight_color: 1,
                        mouseOver: 1,
                        text_color: 1
                    };
                }
            }

            // Suggestion Level

            // Get the old SuggestionLevel:
            var suggestionLevel = 1;
            $.each(priority, (name, data) =>
            {
                if (data !== -1)
                {
                    suggestionLevel *= data;
                }
            });

            if (element.is("[data-suggestionLevel]"))
            {
                suggestionLevel = Number(element.attr("data-suggestionLevel")) + suggestionLevel;
            }

            element.attr("data-suggestionLevel", suggestionLevel);



            if ((typeof (mod.image) !== "undefined") && (mod.image !== null) && (mod.image !== "") && (mod.image !== " "))
            {
                var img = $("<img></img>").attr("src", mod.image)
                    .css("width", "20px")
                    .css("height", "20px")
                    .css("margin-left", "15px")
                    .addClass("parser-msg");

                element.find("a").last().after(img);
            }

            if ((mod.background !== null) && (mod.background !== ""))
            {
                this.UpdateAttributeWithPriority(element, "background", priority.background, function ()
                {

                    element.css('background-image', 'url(' + mod.background + ')')
                        .css('background-repeat', 'no-repeat')
                        .css('background-position', 'right');
                });
            }

            if (mod.mark_chapter)
            {
                element.find('a').first().after(
                    $("<span class=\"parser-msg\"> <b>{" + mod.name + "}</b></span>")
                        .attr("title", mod.note)
                );
            }

            if (!mod.ignoreColor && mod.text_color !== null)
            {
                var textEl = element.find(".z-padtop2");
                this.UpdateAttributeWithPriority(textEl, "color", priority.text_color, mod.text_color);
            }

            var color: string = mod.color;
            var colorMo: string = mod.mouseOver;


            if (!mod.ignoreColor)
            {
                if (self.DEBUG)
                {
                    console.log("[HighlighterCallback] Change Color of Line: ", element);
                }

                var updateColorData: UpdateElementColorEventArgs =
                    {
                        Element: element,
                        Color: color,
                        ColorPriority: priority.color,
                        MouseOverColor: colorMo,
                        MouseOverPriority: priority.mouseOver
                    };
                self.EventHandler.CallEvent(Events.UpdateElementColor, self, updateColorData);

            }

            var changedData: ElementChangedEventArgs = data;
            this.EventHandler.CallEvent(Events.ElementChanged, this, changedData);


        }

        this.EventHandler.CallEvent(Events.PostHighlighterCallback, this, [config, element, data.Url, data.CurrentPage]);

    }


    /**
   *   Enables the In Story Highlighter (Story View)
   */
    public EnableInStoryHighlighter()
    {
        if (this.DEBUG)
        {
            console.log("Enable In Story Highlighter");
        }

        var body = $("body");
        var field = body.find('#profile_top').first().find("b").first();

        if (field.length === 0)
        {
            return;
        }

        body.find(".parser-msg").remove();

        var contextMenu = $("<div></div>")
            .css("width", "20px")
            .css("height", "20px")
            .css("float", "right")
            .addClass("parser-msg")
            .addClass("context-menu")
            .append(
            $("<img></img>")
                .attr("src", this.Api.GetUrl("edit.gif"))
                .css("width", "100%")
                .css("height", "100%")
            );

        var storyInfoRequest: RequestGetStoryInfoEventArgs = {
            Link: document.location.href
        };
        var info = self.EventHandler.RequestResponse<StoryInfo>(Events.RequestGetStoryInfo, self, storyInfoRequest);
        body.find('#profile_top').attr("data-elementident", info.ID);

        var self = this;

        // Open GUI
        contextMenu.click(function ()
        {
            var data: GuiShowStoryPrefabListEventArgs = {
                Url: document.location.pathname,
                Element: body.find('#profile_top'),
                Name: field.text(),
                ID: info.ID,
                Chapter: info.Chapter,
                CurrentPage: 0
            };
            self.EventHandler.CallEvent(Events.GuiShowStoryPrefabList, self, data);
        });

        field.after(contextMenu);

        var highlighterKey = self.Config.highlighter_use_storyID ? info.ID : document.location.pathname;
        // Highlighter found:
        if (typeof (this.Config['highlighter'][highlighterKey]) !== "undefined")
        {
            if (this.DEBUG)
            {
                console.info("Highlight Element Found");
            }

            var config = this.Config['highlighter'][highlighterKey];


            // Collect Data:
            var mod: ModificationBase;

            if ((typeof (config.prefab) !== "undefined") && (config.prefab !== null) && (config.prefab !== "") && (config.prefab !== " "))
            {
                if (typeof (self.Config.highlighterPrefabs[config.prefab]) !== "undefined")
                {
                    mod = self.Config.highlighterPrefabs[config.prefab];
                }
                else
                {
                    console.warn("Found Highlighter for Story '%s' but the refferenced Prefab '%s' was not found!", document.location.pathname, config.prefab);
                    return;
                }
            }
            else if ((typeof (config.custom) !== "undefined") && (config.custom !== null))
            {
                mod = config.custom;
                mod.name = "Custom Highlighter";
            }
            else
            {
                // This shouldn't be neccessary, because of the Upgrade Handler
                // But if that fails, we have a extra safety rope :3

                mod = {
                    name: "Legacy-Custom",
                    background: null,
                    color: null,
                    display: !config.hide,
                    ignoreColor: null,
                    image: config.image,
                    mark_chapter: null,
                    mouseOver: null,
                    text_color: null,
                    priority: 1,
                    note: null,
                    customPriority: null,
                    highlight_color: null
                };
            }

            var priority: ModififcationPriority;
            if (mod.priority !== -1)
            {
                priority = {
                    background: mod.priority,
                    color: mod.priority,
                    highlight_color: mod.priority,
                    mouseOver: mod.priority,
                    text_color: mod.priority
                };
            }
            else
            {
                if ((typeof (mod.customPriority) !== "undefined") && (mod.customPriority !== null))
                {
                    priority = mod.customPriority;
                }
                else
                {
                    console.warn("Custom Priority set for Element. But Config is not defined!", config);

                    priority = {
                        background: 1,
                        color: 1,
                        highlight_color: 1,
                        mouseOver: 1,
                        text_color: 1
                    };
                }
            }


            if ((typeof (mod.image) !== "undefined") && (mod.image !== null) && (mod.image !== "") && (mod.image !== " "))
            {
                var img = $("<img></img>").attr("src", mod.image)
                    .css("width", "20px")
                    .css("height", "20px")
                    .css("margin-left", "15px")
                    .addClass("highlight-msg")
                    .addClass("parser-msg");

                field.after(img);
            }

            if ((mod.background !== null) && (mod.background !== ""))
            {
                this.UpdateAttributeWithPriority(body.find('#profile_top'), "background", priority.background, function ()
                {

                    body.find('#profile_top').css('background-image', 'url(' + mod.background + ')')
                        .css('background-repeat', 'no-repeat')
                        .css('background-position', 'right');
                });
            }

            if (mod.mark_chapter)
            {
                body.find('#profile_top').find('.icon-mail-1').first().after(
                    $("<span class=\"parser-msg\"> <b>{" + mod.name + "}</b></span>")
                        .attr("title", mod.note)
                );
            }


            if (!mod.ignoreColor && mod.text_color !== null)
            {
                var textEl = body.find('#profile_top').children().filter("span").last();
                this.UpdateAttributeWithPriority(textEl, "color", priority.text_color, mod.text_color);
            }

            var color: string = mod.color;
            var colorMo: string = mod.mouseOver;


            if (!mod.ignoreColor)
            {
                if (self.DEBUG)
                {
                    console.log("[HighlighterCallback] Change Color of Line: ", body.find('#profile_top'));
                }

                var updateColorData: UpdateElementColorEventArgs = {
                    Element: body.find('#profile_top'),
                    Color: color,
                    ColorPriority: priority.color,
                    MouseOverColor: colorMo,
                    MouseOverPriority: priority.mouseOver
                };
                self.EventHandler.CallEvent(Events.UpdateElementColor, self, updateColorData);
            }

        }



    }



}
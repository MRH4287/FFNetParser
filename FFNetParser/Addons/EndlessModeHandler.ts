/// <reference path="../_reference.ts" />

class EndlessModeHandler extends ExtentionBaseClass
{

    public constructor(parser: StoryParser)
    {
        super(parser);
    }

    private _endlessRequestPending = false;

    private _endlessRequestsDone = 0;

    /**
     * Enabled the EndlessMode 
     */
    public EnableEndlessMode()
    {
        var self = this;

        if (!this.Config.endless_enable)
        {
            return;
        }

        var isStory = ($(self.MainElementSelector).length === 0);

        var offset = 500;

        if (typeof (window["scrollY"]) === "undefined")
        {
            console.warn("[FFNetParser] EndlessMode disabled. Reason: No Support for Scroll-Events");
            return;
        }


        window.onscroll = function (ev)
        {

            if ((window.innerHeight + <number>window['scrollY']) >= $(document).height() - offset)
            {
                var lastPageContainer: JQuery = null;
                if (isStory)
                {
                    lastPageContainer = $(".storytext").last();
                }
                else
                {
                    lastPageContainer = $(".ffNetPageWrapper").last();
                }

                if (lastPageContainer === null || lastPageContainer.length === 0)
                {
                   // No page container found .. can happen
                    return;
                }

                var lastPage = Number(lastPageContainer.attr("data-page"));
                if (isNaN(lastPage))
                {
                    console.log("Error parsing Page Number!");
                    return;
                }

                self.AppendPageContent(lastPage + 1);
            }
        };
    }


    public AppendPageContent(page: number)
    {
        var self = this;

        if (this._endlessRequestPending)
        {
            return;
        }

        this._endlessRequestPending = true;

        var isStroy = ($(self.MainElementSelector).length === 0);

        this.Log("Appending Page Content. Page: " + page + " - IsStory: ", isStroy);

        var loadingElement = $("<div><center><b>Loading ...</b></center></div>");;



        this._endlessRequestsDone++;
        var overLimit = this._endlessRequestsDone > this.Config.endless_forceClickAfter;

        if (!overLimit)
        {

            if (isStroy)
            {
                var lastPage = $(".storytext").last();

                this.Log("LastPage: ", lastPage);

                lastPage.after(loadingElement);

                this.Log("Loading Element added ....");

                this.LoadChapterFromPage(page, function (chapter)
                {
                    self.Log("Server Answer Received", chapter);


                    loadingElement.remove();

                    // Add Page Name:
                    chapter.prepend("<hr /><center><b>Page: " + page + "</b></center><hr />");


                    chapter.hide();

                    lastPage.after(chapter);

                    // TODO: Remove
                    if (self.Config.allow_copy)
                    {
                        self.Log("Allow Selection of Text");
                        $(".nocopy").removeClass("nocopy").parent().attr("style", "padding: 0px 0.5em;");
                    }

                    // Copy Classes and styles from main Container:
                    chapter.attr("class", $("#storytext").attr("class"))
                        .attr("style", $("#storytext").attr("style"));

                    chapter.slideDown();

                    var eventData: OnPageUpdateEventArgs = {
                        Container: chapter
                    };
                    self.EventHandler.CallEvent(Events.OnPageUpdate, self, eventData);

                    //self.EnableReadingAid(chapter);

                    window.setTimeout(function ()
                    {
                        self._endlessRequestPending = false;
                    }, 1000);
                });

            }
            else
            {
                var lastWrapper = $(".ffNetPageWrapper").last();

                this.Log("LastWrapper: ", lastWrapper);

                lastWrapper.after(loadingElement);

                this.Log("Loading Element added ....");

                this.LoadElementsFromPage(page, function (wrapper)
                {
                    self.Log("Server Answer Received", wrapper);


                    loadingElement.remove();

                    // Set new elements as wrapped
                    wrapper.find(self.MainElementSelector).attr("data-wrapped", "wrapped");

                    wrapper.hide();

                    lastWrapper.after(wrapper);

                    self.Parser.Read(wrapper);

                    wrapper.slideDown();

                    self.EventHandler.CallEvent(Events.ActionUpdateListColor, self, undefined);

                    window.setTimeout(function ()
                    {
                        self._endlessRequestPending = false;
                    }, 1000);
                });
            }
        }
        else
        {
            // Add a Load New Page Button:
            var button = $('<button class="btn"></button>')
                .text(this._('Load Next Page'))
                .click(function (e)
                {
                    e.preventDefault();

                    var request: RequestGetLinkToPageNumberEventArgs = {
                        Page: page
                    };
                    location.href = self.EventHandler.RequestResponse<string>(Events.RequestGetLinkToPageNumber, self, request);
                });


            if (isStroy)
            {
                $(".storytext").last()
                    .append("<br /><hr />")
                    .append($("<center></center").append(button));
            }
            else
            {
                $(".ffNetPageWrapper").last()
                    .append("<br /><hr />")
                    .append($("<center></center").append(button));
            }
        }

    }

    private LoadElementsFromPage(page: number, callback: (data: JQuery) => void)
    {
        var self = this;

        var requestData: RequestGetLinkToPageNumberEventArgs = {
            Page: page
        };
        var url = self.EventHandler.RequestResponse<string>(Events.RequestGetLinkToPageNumber, self, requestData);

        this.Parser.GetPageContent(url, function (res)
        {
            var elements = res.find(self.MainElementSelector);
            var wrapper = self.Parser.CreateWrapper(page);

            wrapper.append(elements);

            callback(wrapper);

        });
    }

    private LoadChapterFromPage(page: number, callback: (page: JQuery) => void)
    {
        var self = this;
        var requestData: RequestGetLinkToPageNumberEventArgs = {
            Page: page
        };
        var url = self.EventHandler.RequestResponse<string>(Events.RequestGetLinkToPageNumber, self, requestData);

        this.Parser.GetPageContent(url, function (res)
        {
            var story = res.find(".storytext").first();

            story.removeAttr("id").attr("data-page", page);

            callback(story);
        });
    }


}

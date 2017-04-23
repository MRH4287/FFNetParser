/// <reference path="../_reference.ts" />

class PocketAddon extends ExtentionBaseClass
{
    private _registeredTags: { [index: string]: { ifNotExist?: (self: UpgradeHandler) => void; ifExist?: (self: UpgradeHandler) => void } } = {};

    public constructor(parser: StoryParser)
    {
        super(parser);

        var self = this;

        this.EventHandler.AddEventListener(Events.OnLoad, () =>
        {
            self.Init();
        });
    }

    public Init()
    {
        if ((typeof (this.Config["pocket_user"]) === "undefined") || (this.Config["pocket_user"] === ""))
        {
            this.Config["pocket_user"] = null;
        }

        if ((typeof (this.Config["pocket_password"]) === "undefined") || (this.Config["pocket_password"] === ""))
        {
            this.Config["pocket_password"] = null;
        }

        this.EnablePocketSave();
    }

    /**
    *   Enables the Pocket Save Feature (Story View)
    */
    public EnablePocketSave()
    {
        var self = this;

        var user = this.Config['pocket_user'];
        var password = this.Config['pocket_password'];

        var body = $("body");

        if ((user == null) || (password == null))
        {
            console.log("Disables Pocket Save Function");
            return;
        }

        var field = body.find("#profile_top").find("b");


        var options = {
            'all': this._("From this chapter to the End"),
            '1': this._("One Chapter"),
            '2': this._("Two Chapters"),
            '5': this._("Five Chapters"),
            '10': this._("Ten Chapters")
        };

        var select = $("<select></select>")
            .css("margin-left", "20px")
            .change(function ()
            {
                $("#ffnet-pocket-save-button").removeAttr("disabled")
                    .html(self._("Save To Pocket"));

            });

        $.each(options, function (key, value)
        {
            select.append(
                $("<option></option>")
                    .text(value)
                    .attr("value", key)
            );

        });

        field.after(
            $('<button class="btn">' + this._('Save To Pocket') + '</button>')
                .click(function ()
                {
                    var option = select.children().filter(":selected").first().attr("value");

                    self.Log("Selected Option: ", option);


                    self.ParsePocket(document.location.pathname, field.text() + ": ", option);

                }).css("margin-left", "10px")
                .attr("id", "ffnet-pocket-save-button")
        );



        field.after(select);

    }

    /**
    *   Recursive Function for Pocket Saving
    *   @param url Url of first story
    *   @param prefix Prefix used for the story
    *   @param length The max length for the recusion
    *   @param currentDepth The current depth of the recusion
    *   @remark Leave the Arguments length and currentDepth away, to achive default behavior
    */
    private ParsePocket(url: string, prefix: string, length: any, currentDepth: number = 1)
    {
        if (typeof (prefix) === "undefined")
        {
            prefix = "";
        }

        if ((typeof (length) === "undefined") || (length === "all"))
        {
            length = 100;
        }


        var user = this.Config['pocket_user'];
        var password = this.Config['pocket_password'];


        if ((user == null) || (password == null))
        {
            return;
        }

        $("#ffnet-pocket-save-button").attr("disabled", "disabled").html("Working ...");

        var self = this;

        var ajaxCallback = function (text)
        {
            var body = $(text);

            //var title = prefix + $(body.find('#chap_select')).first().children().filter('[selected="selected"]').html();

            var title = body.find("title").first().text();

            var domainRegex = new RegExp("https?://[^/]+");
            var domain = domainRegex.exec(location.href)[0];

            $("body").append(
                $("<img>").attr("src", 'https://readitlaterlist.com/v2/add?username=' + user + '&password=' + password + '&apikey=emIpiQ7cA6fR4u6dr7ga2aXC11dcD58a&url=' + domain + url + '&title=' + title)
            );

            console.log(url + ' - ' + title + ' - Done');

            var requestData: RequestGetLinkToNextChapterEventArgs = {
                Body: body,
                CurrentChapter: currentDepth,
                StoryName: title,
                Url: url
            };
            var requestResponse = self.EventHandler.RequestResponse<string>(Events.RequestGetLinkToNextChapter, self, requestData);

            if (requestResponse != null)
            {
                setTimeout(function ()
                {
                    self.ParsePocket(requestResponse, prefix, length, currentDepth + 1);
                }, 500);

            } else
            {
                $("#ffnet-pocket-save-button").attr("disabled", "disabled")
                    .html("Save done!");
            }
        };

        $.ajax({
            url: url,
            success: ajaxCallback
        });

    }

}

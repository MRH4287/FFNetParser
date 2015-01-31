/// <reference path="userscript.ts" />

class GithubAPI extends ExtentionBaseClass
{
    private code: string;
    private attempt: number  = 0;
    private MAX_ATTEMPTS = 30;

    get Authenticated()
    {
        return typeof(this.code) !== "undefined" && this.code !== null;
    }

    public constructor(parser: StoryParser)
    {
        super(parser);
    }


    public Auth(callback? : () => void)
    {
        if (!this.parser.useCORS)
        {
            console.error("CORS has to be active for this Feature to work!");

            return;
        }

        window.open(this.parser.config.api_github_requestStart_url + "?token=" + this.config.token);

        this.attempt = 0;

        this.beginCheck(() =>
        {
            this.log("Successfully Authenticated!");
            if (typeof(callback) !== "undefined")
            {
                callback();
            }
        });

    }

    public GetGists(callback: (data: GistData[]) => void)
    {
        if (typeof(this.code) === "undefined" || this.code === null)
        {
            console.error("Github API - Not Authenticated!");
            return;
        }
        else
        {
            this.api_call("Gists",
                {
                    token: this.config.token,
                    code: this.code
                },
                (data: GistData[]) =>
                {
                    callback(data);
                });
        }
    }

    public GetConfig(id: string, callback : (data: string) => void )
    {
        if (typeof(this.code) === "undefined" || this.code === null)
        {
            console.error("Github API - Not Authenticated!");
            return;
        }

        this.api_call("Config",
            {
                token: this.config.token,
                code: this.code,
                id: id
            },
            (data: string) =>
            {
                callback(data);
            });
    }

    public CreateNewConfigGist(description: string, isPublic: boolean, callback: (data: GistData) => void )
    {
        if (typeof(this.code) === "undefined" || this.code === null)
        {
            console.error("Github API - Not Authenticated!");
            return;
        }

        this.api_call("Gist",
            JSON.stringify({
                token: this.config.token,
                code: this.code,
                description: description,
                isPublic: isPublic,
                content: JSON.stringify(this.config, null, "\t")
            }), function (data: GistData)
            {
                callback(data);
            },
            "POST");
    }

    public UpdateConfigGist(id: string, callback: (data: GistData) => void)
    {
        if (typeof(this.code) === "undefined" || this.code === null)
        {
            console.error("Github API - Not Authenticated!");
            return;
        }

        this.api_call("Gist",
            JSON.stringify({
                token: this.config.token,
                code: this.code,
                id: id,
                content: JSON.stringify(this.config, null, "\t")
            }), function (data: GistData)
            {
                callback(data);
            },
            "PATCH");
    }


    private beginCheck(callback: () => void)
    {
        var self = this;

        this.api_call("Status", { token: self.config.token }, (data) =>
        {
            if (data !== null && data !== "null")
            {
                this.code = data;

                this.log("Got Code from Server. Attempts: ", this.attempt);

                callback();
                return;
            }
            else
            {
                if (this.attempt > this.MAX_ATTEMPTS)
                {
                    console.error("Github API - Max Attempt Count reached! Abort!");
                    return;
                }
                else
                {
                    this.attempt = this.attempt + 1;

                    window.setTimeout(() =>
                    {
                        self.beginCheck(callback);
                    }, 1000);

                }
            }

        });


    }


    private api_call(address: string, data: {}, callback: (data: any) => void, method: string = "GET")
    {
        var url = this.parser.config.api_github_url + "/" + address;

        var self = this;

        $.ajax({
            type: method,
            url: url,
            async: true,
            contentType: "application/json",
            dataType: 'json',
            crossDomain: true,
            data: data,
            cache: false
        })
            .done(function (result)
            {
                self.log("Github API - Got Result from Server: ", result);

                callback(result);

            })
            .fail(function (state)
            {
                console.error("Github API - Error while fetching Result from Server: ", state);
            });
    }
}

/// <reference path="../_reference.ts" /> 

/**
 * Class used for Comunication with Github
 */
class GithubAPI extends ExtentionBaseClass
{
    private _code: string;
    private _attempt: number  = 0;
    private MAX_ATTEMPTS = 30;

    /**
     * Is the User Authenticated
     */
    get Authenticated()
    {
        return typeof(this._code) !== "undefined" && this._code !== null;
    }

   
    public constructor(parser: StoryParser)
    {
        super(parser);
    }



    public Auth(callback? : () => void)
    {
        if (!this.Parser.Api.UseCors)
        {
            console.error("CORS has to be active for this Feature to work!");

            return;
        }

        window.open(this.Parser.Config.api_github_requestStart_url + "?token=" + this.Config.token);

        this._attempt = 0;

        this.BeginCheck(() =>
        {
            this.Log("Successfully Authenticated!");
            if (typeof(callback) !== "undefined")
            {
                callback();
            }
        });

    }

    public GetGists(callback: (data: GistData[]) => void)
    {
        if (typeof(this._code) === "undefined" || this._code === null)
        {
            console.error("Github API - Not Authenticated!");
            return;
        }
        else
        {
            this.ApiCall("Gists",
                {
                    token: this.Config.token,
                    code: this._code
                },
                (data: GistData[]) =>
                {
                    callback(data);
                });
        }
    }

    public GetConfig(id: string, callback : (data: string) => void )
    {
        if (typeof(this._code) === "undefined" || this._code === null)
        {
            console.error("Github API - Not Authenticated!");
            return;
        }

        this.ApiCall("Config",
            {
                token: this.Config.token,
                code: this._code,
                id: id
            },
            (data: string) =>
            {
                callback(data);
            });
    }

    public CreateNewConfigGist(description: string, isPublic: boolean, callback: (data: GistData) => void )
    {
        if (typeof(this._code) === "undefined" || this._code === null)
        {
            console.error("Github API - Not Authenticated!");
            return;
        }

        this.ApiCall("Gist",
            JSON.stringify({
                token: this.Config.token,
                code: this._code,
                description: description,
                isPublic: isPublic,
                content: JSON.stringify(this.Config, null, "\t")
            }), function (data: GistData)
            {
                callback(data);
            },
            "POST");
    }

    public UpdateConfigGist(id: string, callback: (data: GistData) => void)
    {
        if (typeof(this._code) === "undefined" || this._code === null)
        {
            console.error("Github API - Not Authenticated!");
            return;
        }

        this.ApiCall("Gist",
            JSON.stringify({
                token: this.Config.token,
                code: this._code,
                id: id,
                content: JSON.stringify(this.Config, null, "\t")
            }), function (data: GistData)
            {
                callback(data);
            },
            "PATCH");
    }


    private BeginCheck(callback: () => void)
    {
        var self = this;

        this.ApiCall("Status", { token: self.Config.token }, (data) =>
        {
            if (data !== null && data !== "null")
            {
                this._code = data;

                this.Log("Got Code from Server. Attempts: ", this._attempt);

                callback();
                return;
            }
            else
            {
                if (this._attempt > this.MAX_ATTEMPTS)
                {
                    console.error("Github API - Max Attempt Count reached! Abort!");
                    return;
                }
                else
                {
                    this._attempt = this._attempt + 1;

                    window.setTimeout(() =>
                    {
                        self.BeginCheck(callback);
                    }, 1000);

                }
            }

        });


    }


    private ApiCall(address: string, data: {}, callback: (data: any) => void, method: string = "GET")
    {
        var url = this.Parser.Config.api_github_url + "/" + address;

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
                self.Log("Github API - Got Result from Server: ", result);

                callback(result);

            })
            .fail(function (state)
            {
                console.error("Github API - Error while fetching Result from Server: ", state);
            });
    }
}

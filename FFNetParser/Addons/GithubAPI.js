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
/**
 * Class used for Comunication with Github
 */
var GithubAPI = (function (_super) {
    __extends(GithubAPI, _super);
    function GithubAPI(parser) {
        var _this = _super.call(this, parser) || this;
        _this._attempt = 0;
        _this.MAX_ATTEMPTS = 30;
        return _this;
    }
    Object.defineProperty(GithubAPI.prototype, "Authenticated", {
        /**
         * Is the User Authenticated
         */
        get: function () {
            return typeof (this._code) !== "undefined" && this._code !== null;
        },
        enumerable: true,
        configurable: true
    });
    GithubAPI.prototype.Auth = function (callback) {
        //if (!this.Parser.Api.UseCors)
        //{
        //    console.error("CORS has to be active for this Feature to work!");
        var _this = this;
        //    return;
        //}
        window.open(this.Parser.Config.api_github_requestStart_url + "?token=" + this.Config.token);
        this._attempt = 0;
        this.BeginCheck(function () {
            _this.Log("Successfully Authenticated!");
            if (typeof (callback) !== "undefined") {
                callback();
            }
        });
    };
    GithubAPI.prototype.GetGists = function (callback) {
        if (typeof (this._code) === "undefined" || this._code === null) {
            console.error("Github API - Not Authenticated!");
            return;
        }
        else {
            this.ApiCall("Gists", {
                token: this.Config.token,
                code: this._code
            }, function (data) {
                callback(data);
            });
        }
    };
    GithubAPI.prototype.GetConfig = function (id, callback) {
        if (typeof (this._code) === "undefined" || this._code === null) {
            console.error("Github API - Not Authenticated!");
            return;
        }
        this.ApiCall("Config", {
            token: this.Config.token,
            code: this._code,
            id: id
        }, function (data) {
            callback(data);
        });
    };
    GithubAPI.prototype.CreateNewConfigGist = function (description, isPublic, callback) {
        if (typeof (this._code) === "undefined" || this._code === null) {
            console.error("Github API - Not Authenticated!");
            return;
        }
        this.ApiCall("Gist", JSON.stringify({
            token: this.Config.token,
            code: this._code,
            description: description,
            isPublic: isPublic,
            content: JSON.stringify(this.Config, null, "\t")
        }), function (data) {
            callback(data);
        }, "POST");
    };
    GithubAPI.prototype.UpdateConfigGist = function (id, callback) {
        if (typeof (this._code) === "undefined" || this._code === null) {
            console.error("Github API - Not Authenticated!");
            return;
        }
        this.ApiCall("Gist", JSON.stringify({
            token: this.Config.token,
            code: this._code,
            id: id,
            content: JSON.stringify(this.Config, null, "\t")
        }), function (data) {
            callback(data);
        }, "PATCH");
    };
    GithubAPI.prototype.BeginCheck = function (callback) {
        var _this = this;
        var self = this;
        this.ApiCall("Status", { token: self.Config.token }, function (data) {
            if (data !== null && data !== "null") {
                _this._code = data;
                _this.Log("Got Code from Server. Attempts: ", _this._attempt);
                callback();
                return;
            }
            else {
                if (_this._attempt > _this.MAX_ATTEMPTS) {
                    console.error("Github API - Max Attempt Count reached! Abort!");
                    return;
                }
                else {
                    _this._attempt = _this._attempt + 1;
                    window.setTimeout(function () {
                        self.BeginCheck(callback);
                    }, 1000);
                }
            }
        });
    };
    GithubAPI.prototype.ApiCall = function (address, data, callback, method) {
        if (method === void 0) { method = "GET"; }
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
            .done(function (result) {
            self.Log("Github API - Got Result from Server: ", result);
            callback(result);
        })
            .fail(function (state) {
            console.error("Github API - Error while fetching Result from Server: ", state);
        });
    };
    return GithubAPI;
}(ExtentionBaseClass));
//# sourceMappingURL=GithubAPI.js.map
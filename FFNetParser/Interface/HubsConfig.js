/*!
 * ASP.NET SignalR JavaScript Library v2.2.1
 * http://signalr.net/
 *
 * Copyright (c) .NET Foundation. All rights reserved.
 * Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
 *
 */

(function ($, window, undefined)
{
    /// <param name="$" type="jQuery" />
    "use strict";

    if (typeof ($.signalR) !== "function")
    {
        throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
    }

    var signalR = $.signalR;

    function makeProxyCallback(hub, callback)
    {
        return function ()
        {
            // Call the client hub method
            callback.apply(hub, $.makeArray(arguments));
        };
    }

    function registerHubProxies(instance, shouldSubscribe)
    {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance)
        {
            if (instance.hasOwnProperty(key))
            {
                hub = instance[key];

                if (!(hub.hubName))
                {
                    // Not a client hub
                    continue;
                }

                if (shouldSubscribe)
                {
                    // We want to subscribe to the hub events
                    subscriptionMethod = hub.on;
                } else
                {
                    // We want to unsubscribe from the hub events
                    subscriptionMethod = hub.off;
                }

                // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                for (memberKey in hub.client)
                {
                    if (hub.client.hasOwnProperty(memberKey))
                    {
                        memberValue = hub.client[memberKey];

                        if (!$.isFunction(memberValue))
                        {
                            // Not a client hub function
                            continue;
                        }

                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                    }
                }
            }
        }
    }

    $.hubConnection.prototype.createHubProxies = function ()
    {
        var proxies = {};
        this.starting(function ()
        {
            // Register the hub proxies as subscribed
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, true);

            this._registerSubscribedHubs();
        }).disconnected(function ()
        {
            // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, false);
        });

        proxies['chatHub'] = this.createHubProxy('chatHub');
        proxies['chatHub'].client = {};
        proxies['chatHub'].server = {
            liveChatInfo: function (messageId)
            {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["LiveChatInfo"], $.makeArray(arguments)));
            }
        };

        proxies['githubHub'] = this.createHubProxy('githubHub');
        proxies['githubHub'].client = {};
        proxies['githubHub'].server = {
        };

        proxies['languageHub'] = this.createHubProxy('languageHub');
        proxies['languageHub'].client = {};
        proxies['languageHub'].server = {
            getLanguage: function (languageName, messageID)
            {
                return proxies['languageHub'].invoke.apply(proxies['languageHub'], $.merge(["GetLanguage"], $.makeArray(arguments)));
            },

            getLanguageList: function (messageId)
            {
                return proxies['languageHub'].invoke.apply(proxies['languageHub'], $.merge(["GetLanguageList"], $.makeArray(arguments)));
            }
        };

        proxies['messageHub'] = this.createHubProxy('messageHub');
        proxies['messageHub'].client = {};
        proxies['messageHub'].server = {
            getMessages: function (token, messageID)
            {
                return proxies['messageHub'].invoke.apply(proxies['messageHub'], $.merge(["GetMessages"], $.makeArray(arguments)));
            },

            postFeedback: function (token, title, message, type, sysInfo, messageID)
            {
                return proxies['messageHub'].invoke.apply(proxies['messageHub'], $.merge(["PostFeedback"], $.makeArray(arguments)));
            },

            setAsRead: function (token, ids, messageID)
            {
                return proxies['messageHub'].invoke.apply(proxies['messageHub'], $.merge(["SetAsRead"], $.makeArray(arguments)));
            }
        };

        proxies['pingHub'] = this.createHubProxy('pingHub');
        proxies['pingHub'].client = {};
        proxies['pingHub'].server = {
            ping: function (token, messageID)
            {
                return proxies['pingHub'].invoke.apply(proxies['pingHub'], $.merge(["Ping"], $.makeArray(arguments)));
            }
        };

        proxies['statusHub'] = this.createHubProxy('statusHub');
        proxies['statusHub'].client = {};
        proxies['statusHub'].server = {
            reportException: function (message, url, line, column, error, messageId)
            {
                return proxies['statusHub'].invoke.apply(proxies['statusHub'], $.merge(["ReportException"], $.makeArray(arguments)));
            }
        };

        proxies['storyHub'] = this.createHubProxy('storyHub');
        proxies['storyHub'].client = {};
        proxies['storyHub'].server = {
            getStoryInfo: function (token, storyIds, messageId)
            {
                return proxies['storyHub'].invoke.apply(proxies['storyHub'], $.merge(["GetStoryInfo"], $.makeArray(arguments)));
            }
        };

        proxies['systemHub'] = this.createHubProxy('systemHub');
        proxies['systemHub'].client = {};
        proxies['systemHub'].server = {
            getStyles: function (messageId)
            {
                return proxies['systemHub'].invoke.apply(proxies['systemHub'], $.merge(["GetStyles"], $.makeArray(arguments)));
            }
        };

        proxies['versionHub'] = this.createHubProxy('versionHub');
        proxies['versionHub'].client = {};
        proxies['versionHub'].server = {
            getCurrent: function (branch, messageID)
            {
                return proxies['versionHub'].invoke.apply(proxies['versionHub'], $.merge(["GetCurrent"], $.makeArray(arguments)));
            },

            getVersion: function (data, messageID)
            {
                return proxies['versionHub'].invoke.apply(proxies['versionHub'], $.merge(["GetVersion"], $.makeArray(arguments)));
            }
        };

        return proxies;
    };

    signalR.hub = $.hubConnection("/signalr", { useDefaultPath: false });
    $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));
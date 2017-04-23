/// <reference path="../_reference.ts" />

class DebugHandler extends ExtentionBaseClass
{
    public constructor(parser: StoryParser)
    {
        super(parser);

        this.EventHandler.AddEventListener(Events.PreInit, () =>
        {
            if (this.DEBUG)
            {
                console.info("Application Insight initializing...");
                this.StartAppInsight();
            }
        });
    }

    private StartAppInsight()
    {
        var appInsights = window["appInsights"] || function (config)
        {
            function i(config)
            {
                t[config] = function ()
                {
                    var i = arguments;
                    t.queue.push(function ()
                    {
                        t[config].apply(t, i);
                    });
                };
            }
            var t: any =
                {
                    config: config,
                },
                u = document,
                e : any = window,
                o = "script",
                s = "AuthenticatedUserContext",
                h = "start",
                c = "stop",
                l = "Track",
                a = l + "Event",
                v = l + "Page",
                y: any = u.createElement(o),
                r,
                f;
            y.src = config["url"] || "https://az416426.vo.msecnd.net/scripts/a/ai.0.js";
            u.getElementsByTagName(o)[0].parentNode.appendChild(y);
            try
            {
                t.cookie = u.cookie;
            }
            catch (p) { }
            for (t.queue = [], t.version = "1.0", r = ["Event", "Exception", "Metric", "PageView", "Trace", "Dependency"]; r.length;)
            {
                i("track" + r.pop());
            }

            return i("set" + s),
                i("clear" + s),
                i(h + a),
                i(c + a),
                i(h + v),
                i(c + v),
                i("flush"),
                config["disableExceptionTracking"] ||
                (
                    r = "onerror",
                    i("_" + r),
                    f = e[r],
                    e[r] = function (config, i, u, e, o)
                    {
                        var s = f && f(config, i, u, e, o);
                        return s !== !0 && t["_" + r](config, i, u, e, o), s;
                    }
                ),
                t;
        }({
            instrumentationKey: "b9a227b5-be29-432a-9000-a1520b26b13f"
        });

        window["appInsights"] = appInsights;
        appInsights.trackPageView();
    }

}

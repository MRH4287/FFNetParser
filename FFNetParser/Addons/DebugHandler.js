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
var DebugHandler = (function (_super) {
    __extends(DebugHandler, _super);
    function DebugHandler(parser) {
        var _this = _super.call(this, parser) || this;
        _this.EventHandler.AddEventListener(Events.PreInit, function () {
            if (_this.DEBUG) {
                console.info("Application Insight initializing...");
                _this.StartAppInsight();
            }
        });
        return _this;
    }
    DebugHandler.prototype.StartAppInsight = function () {
        var appInsights = window["appInsights"] || function (config) {
            function i(config) {
                t[config] = function () {
                    var i = arguments;
                    t.queue.push(function () {
                        t[config].apply(t, i);
                    });
                };
            }
            var t = {
                config: config,
            }, u = document, e = window, o = "script", s = "AuthenticatedUserContext", h = "start", c = "stop", l = "Track", a = l + "Event", v = l + "Page", y = u.createElement(o), r, f;
            y.src = config["url"] || "https://az416426.vo.msecnd.net/scripts/a/ai.0.js";
            u.getElementsByTagName(o)[0].parentNode.appendChild(y);
            try {
                t.cookie = u.cookie;
            }
            catch (p) { }
            for (t.queue = [], t.version = "1.0", r = ["Event", "Exception", "Metric", "PageView", "Trace", "Dependency"]; r.length;) {
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
                    (r = "onerror",
                        i("_" + r),
                        f = e[r],
                        e[r] = function (config, i, u, e, o) {
                            var s = f && f(config, i, u, e, o);
                            return s !== !0 && t["_" + r](config, i, u, e, o), s;
                        }),
                t;
        }({
            instrumentationKey: "b9a227b5-be29-432a-9000-a1520b26b13f"
        });
        window["appInsights"] = appInsights;
        appInsights.trackPageView();
    };
    return DebugHandler;
}(ExtentionBaseClass));
//# sourceMappingURL=DebugHandler.js.map
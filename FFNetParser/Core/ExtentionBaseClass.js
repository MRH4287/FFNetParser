/// <reference path="../_reference.ts" />
var ExtentionBaseClass = (function () {
    function ExtentionBaseClass(parser) {
        this.Parser = parser;
    }
    Object.defineProperty(ExtentionBaseClass.prototype, "DEBUG", {
        /**
         * The DEBUG Option.
         * Can be enabled with a Config option or when a dev Version is used.
         */
        get: function () {
            return this.Parser.DEBUG;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExtentionBaseClass.prototype, "IGNORE_NEW_VERSION", {
        /**
         * Do not use a stored Version from the Auto Updater.
         */
        get: function () {
            return this.Parser.IGNORE_NEW_VERSION;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExtentionBaseClass.prototype, "VERSION", {
        /**
         * The current Version.
         * Is replaced by Grunt.
         */
        get: function () {
            return this.Parser.VERSION;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExtentionBaseClass.prototype, "BRANCH", {
        /**
         * The current Git Branch.
         * IS replaced by Grunt.
         */
        get: function () {
            return this.Parser.BRANCH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExtentionBaseClass.prototype, "Config", {
        /**
         * The Config of the Script
         */
        get: function () {
            return this.Parser.Config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExtentionBaseClass.prototype, "EventHandler", {
        get: function () {
            return this.Parser.EventHandler;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExtentionBaseClass.prototype, "Api", {
        get: function () {
            return this.Parser.Api;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExtentionBaseClass.prototype, "MainElementSelector", {
        get: function () {
            return this.Parser.MainElementSelector;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExtentionBaseClass.prototype, "DataConfig", {
        /**
         * Config that is only available in this session
         */
        get: function () {
            return this.Parser.DataConfig;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates a property if the Priority if higher or equals to the current Priority
     * @param element The Target Element for the Manipulation
     * @param attribute The name of the Attrbute. If value is not a function, this is the name of the CSS Property
     * @param newPriority The Priority of the new Value
     * @param value The new value OR a callback Function with the result
     */
    ExtentionBaseClass.prototype.UpdateAttributeWithPriority = function (element, attribute, newPriority, value) {
        this.Parser.UpdateAttributeWithPriority(element, attribute, newPriority, value);
    };
    /**
     *   Log to the Debug-Console
     *   @param a Parameter A
     *   @param b Parameter B
     *   @param c Paramater C
     */
    ExtentionBaseClass.prototype.Log = function (a, b, c) {
        this.Parser.Log(a, b, c);
    };
    /**
     *   Creates an Info Message
     *   @param a Parameter A
     *   @param b Parameter B
     *   @param c Parameter C
     */
    ExtentionBaseClass.prototype.Info = function (a, b, c) {
        this.Parser.Info(a, b, c);
    };
    /**
     *   Returns the Language Value for a specific Key
     *   @param key The Key to search for
     *   @result Value in selected Language
     */
    ExtentionBaseClass.prototype._ = function (key) {
        return this.Parser._(key);
    };
    return ExtentionBaseClass;
}());
//# sourceMappingURL=ExtentionBaseClass.js.map
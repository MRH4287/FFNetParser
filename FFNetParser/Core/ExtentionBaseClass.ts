﻿/// <reference path="../_reference.ts" />

abstract class ExtentionBaseClass
{
    public Parser: StoryParser;

    public constructor(parser: StoryParser)
    {
        this.Parser = parser;
    }

    /** 
     * The DEBUG Option.
     * Can be enabled with a Config option or when a dev Version is used.
     */
    get DEBUG()
    {
        return this.Parser.DEBUG;
    }

    /**
     * Do not use a stored Version from the Auto Updater.
     */
    get IGNORE_NEW_VERSION()
    {
        return this.Parser.IGNORE_NEW_VERSION;
    }

    /**
     * The current Version.
     * Is replaced by Grunt.
     */
    get VERSION()
    {
        return this.Parser.VERSION;
    }

    /**
     * The current Git Branch.
     * IS replaced by Grunt.
     */
    get BRANCH()
    {
        return this.Parser.BRANCH;
    }

    /**
     * The Config of the Script
     */
    get Config()
    {
        return this.Parser.Config;
    }

    get EventHandler()
    {
        return this.Parser.EventHandler;
    }

    get Api()
    {
        return this.Parser.Api;
    }

    get MainElementSelector()
    {
        return this.Parser.MainElementSelector;
    }

    /** 
     * Config that is only available in this session 
     */
    get DataConfig()
    {
        return this.Parser.DataConfig;
    }


    /**
     * Updates a property if the Priority if higher or equals to the current Priority
     * @param element The Target Element for the Manipulation
     * @param attribute The name of the Attrbute. If value is not a function, this is the name of the CSS Property
     * @param newPriority The Priority of the new Value
     * @param value The new value OR a callback Function with the result
     */
    public UpdateAttributeWithPriority(element: JQuery, attribute: string, newPriority: number, value: any)
    {
        this.Parser.UpdateAttributeWithPriority(element, attribute, newPriority, value);
    }

    /**
     *   Log to the Debug-Console
     *   @param a Parameter A
     *   @param b Parameter B
     *   @param c Paramater C
     */
    public Log(a: any, b?: any, c?: any)
    {
        this.Parser.Log(a, b, c);
    }

    /**
     *   Creates an Info Message
     *   @param a Parameter A
     *   @param b Parameter B
     *   @param c Parameter C
     */
    public Info(a: any, b?: any, c?: any)
    {
        this.Parser.Info(a, b, c);
    }


    /**
     *   Returns the Language Value for a specific Key
     *   @param key The Key to search for
     *   @result Value in selected Language 
     */
    public _(key: string): string
    {
        return this.Parser._(key);
    }


}

/// <reference path="_reference.ts" /> 

class ExtentionBaseClass
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
     * A stored version of the Script is used
     */
    get LOAD_INTERNAL()
    {
        return this.Parser.LOAD_INTERNAL;
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

    /** 
     * Config that is only available in this session 
     */
    get DataConfig()
    {
        return this.Parser.DataConfig;
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

/// <reference path="_reference.ts" />

class ExtentionBaseClass {
    public parser: StoryParser;

    public constructor(parser: StoryParser) {
        this.parser = parser;
    }

    /**
     * The DEBUG Option.
     * Can be enabled with a Config option or when a dev Version is used.
     */
    get DEBUG() {
        return this.parser.DEBUG;
    }

    /**
     * Do not use a stored Version from the Auto Updater.
     */
    get IGNORE_NEW_VERSION() {
        return this.parser.IGNORE_NEW_VERSION;
    }

    /**
     * The current Version.
     * Is replaced by Grunt.
     */
    get VERSION() {
        return this.parser.VERSION;
    }

    /**
     * The current Git Branch.
     * IS replaced by Grunt.
     */
    get BRANCH() {
        return this.parser.BRANCH;
    }

    /**
     * A stored version of the Script is used
     */
    get LOAD_INTERNAL() {
        return this.parser.LOAD_INTERNAL;
    }

    /**
     * The Config of the Script
     */
    get config() {
        return this.parser.config;
    }

    /**
     * Config that is only available in this session
     */
    get dataConfig() {
        return this.parser.dataConfig;
    }

    /**
     *   Log to the Debug-Console
     *   @param a Parameter A
     *   @param b Parameter B
     *   @param c Paramater C
     */
    public log(a: any, b?: any, c?: any) {
        this.parser.log(a, b, c);
    }

    /**
     *   Creates an Info Message
     *   @param a Parameter A
     *   @param b Parameter B
     *   @param c Parameter C
     */
    public info(a: any, b?: any, c?: any) {
        this.parser.info(a, b, c);
    }

    /**
     *   Returns the Language Value for a specific Key
     *   @param key The Key to search for
     *   @result Value in selected Language
     */
    public _(key: string): string {
        return this.parser._(key);
    }
}

/// <reference path="userscript.ts" />

/**
 * Component used for handling Events
 */
class EventHandler
{
    private events: { [id: string]: EventData } = {};
    private calledEvents: string[] = [];

    private main: StoryParser = null;

    private timedEvents: {
        [id: string]: {
            run: boolean;
            callback: (sender: any, args: any) => void;
        }
    } = {};

    /** 
     * Initializes a new Instance
     * @param main StoryParser instance
     */
    constructor(main: StoryParser)
    {
        this.main = main;
    }

    /**
     * Adds an Listener for a specific Event
     * @param event The name of the Event
     * @param callback The callback Function for this Handler
     */
    public addEventListener(event: string, callback: (sender: any, args: any) => void)
    {
        if (this.events === undefined)
        {
            this.events = {};
        }

        if (this.events[event] === undefined)
        {
            this.events[event] = {
                callbacks: []
            };
        }

        this.events[event].callbacks.push(callback);
    }

    /**
     * Calls a specific event
     * @param event The name of the event
     * @param sender The Sender of the event
     * @param args The Argument of this Event
     */
    public callEvent(event: string, sender: any, args: any)
    {
        this.addEventToList(event);

        var unheared = ((this.events === undefined) || (this.events[event] === undefined));

        if (this.main !== undefined && this.main !== null && this.main.VERBOSE)
        {
            console.log("Event Called: " + event + " - ", { name: event, sender: sender, args: args, heared: !unheared });
        }


        if (unheared)
        {
            //console.warn("EventHandler - No Event called '" + event + "' found!");

            return false;
        }

        for (var i = 0; i < this.events[event].callbacks.length; i++)
        {
            this.events[event].callbacks[i](sender, args);
        }
    }

    /**
     * Returns a list of all called Events
     */
    public getEvents(): string[]
    {
        return Object.keys(this.events).concat(this.calledEvents);
    }

    /**
     * Check if a specific Event was called allready
     * @param index The name of the Event
     */
    public containesKey(index: string): boolean
    {
        return (this.getEvents().indexOf(index) !== -1);
    }


    /**
     * Adds a generic Timer
     * @param name The name of the Timer
     * @param callback Callback funtion for this timer
     * @param intervall The Intervall of this Event
     * @param sender The sender of the Event
     * @param arguments The Argument for this Event
     */
    public addTimer(name: string, callback: (sender: any, args: any) => void, intervall: number, sender?: any, args?: any)
    {
        if (this.timedEvents[name] !== undefined)
        {
            this.stopTimer(name);
        }


        this.timedEvents[name] = {
            run: true,
            callback: callback
        };

        var self = this;
        var triggerEvent = function ()
        {
            try
            {

                var data = self.timedEvents[name];

                if ((data !== undefined) && (data.run))
                {
                    data.callback(sender, args);

                    self.callEvent("TaskCreated", self, "Timer - " + name);

                    window.setTimeout(triggerEvent, intervall);
                }
                else
                {
                    delete self.timedEvents[name];
                }

            }
            catch (ex)
            {
                console.warn("Exception while executing timed Trigger '" + name + "': ", ex);
                delete self.timedEvents[name];
            }

            self.callEvent("TaskDisposed", self, "Timer - " + name);
        };

        self.callEvent("TaskCreated", self, "Timer - " + name);
        window.setTimeout(triggerEvent, intervall);
    }


    /**
     * Adds a timed Event
     * @param name The name of the Timer
     * @param triggerEvent The name of the Event
     * @param intervall The intervall of the event
     * @param sender the Sender of the Event
     * @param arguments The Argument for this Event
     */
    public addTimedTrigger(name: string, triggerEvent: string, intervall: number, sender?: any, args?: any)
    {
        var self = this;
        var callback = function (sender, args)
        {
            self.callEvent(triggerEvent, sender, args);
        };

        this.addTimer(name, callback, intervall, sender, args);
    }

    /**
     * Stops a specific Timer
     * @param name Name of the Timer
     */
    public stopTimer(name: string)
    {
        if (this.timedEvents[name] !== undefined)
        {
            this.timedEvents[name].run = false;
        }
    }

    private addEventToList(name: string)
    {
        if (this.calledEvents.indexOf(name) === -1)
        {
            this.calledEvents.push(name);
        }

    }

}

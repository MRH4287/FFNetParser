/// <reference path="../_reference.ts" />

/**
 * Component used for handling Events
 */
class EventHandler
{
    private _events: { [id: string]: EventData } = {};
    private _calledEvents: string[] = [];

    private _main: StoryParser = null;

    private _timedEvents: {
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
        this._main = main;
    }

    /**
     * Adds an Listener for a specific Event
     * @param event The name of the Event
     * @param callback The callback Function for this Handler
     */
    public AddEventListener(event: string, callback: (sender: any, args: any) => void)
    {
        if (this._events === undefined)
        {
            this._events = {};
        }

        if (this._events[event] === undefined)
        {
            this._events[event] = {
                callbacks: []
            };
        }

        this._events[event].callbacks.push(callback);
    }

    /**
     * Adds an EvemtListener for Requests
     * @param event The Request to listen to
     * @param callback The callback that collects the data
     */
    public AddRequestEventListener(event: string, callback: (sender: any, input: any) => any)
    {
        this.AddEventListener(event, (s, args: { response: any, input: any }) =>
        {
            args.response = callback(s, args.input);
        });
    }

    /**
     * Calls a specific event
     * @param event The name of the event
     * @param sender The Sender of the event
     * @param args The Argument of this Event
     */
    public CallEvent(event: string, sender: any, args: any)
    {
        this.AddEventToList(event);

        var unheared = ((this._events === undefined) || (this._events[event] === undefined));

        if (this._main !== undefined && this._main !== null && this._main.VERBOSE)
        {
            console.log("Event Called: " + event + " - ", { name: event, sender: sender, args: args, heared: !unheared });
        }


        if (unheared)
        {
            //console.warn("EventHandler - No Event called '" + event + "' found!");

            return false;
        }

        for (var i = 0; i < this._events[event].callbacks.length; i++)
        {
            this._events[event].callbacks[i](sender, args);
        }
    }

    /**
     * Calls the event with the given name and requests an Answer
     * @param event The Event that should be called
     * @param sender The Sender of this Event
     * @param input The Data that is sent
     */
    public RequestResponse<T>(event: string, sender: any, input: any): T
    {
        var data: { response: T, input: any } = {
            response: undefined,
            input: input
        };
        this.CallEvent(event, sender, data);
        return data.response;
    }


    /**
     * Returns a list of all called Events
     */
    public GetEvents(): string[]
    {
        return Object.keys(this._events).concat(this._calledEvents);
    }

    /**
     * Check if a specific Event was called allready
     * @param index The name of the Event
     */
    public ContainsKey(index: string): boolean
    {
        return (this.GetEvents().indexOf(index) !== -1);
    }


    /**
     * Adds a generic Timer
     * @param name The name of the Timer
     * @param callback Callback funtion for this timer
     * @param intervall The Intervall of this Event
     * @param sender The sender of the Event
     * @param arguments The Argument for this Event
     */
    public AddTimer(name: string, callback: (sender: any, args: any) => void, intervall: number, sender?: any, args?: any)
    {
        if (this._timedEvents[name] !== undefined)
        {
            this.StopTimer(name);
        }


        this._timedEvents[name] = {
            run: true,
            callback: callback
        };

        var self = this;
        var triggerEvent = function ()
        {
            try
            {

                var data = self._timedEvents[name];

                if ((data !== undefined) && (data.run))
                {
                    data.callback(sender, args);

                    self.CallEvent(Events.TaskCreated, self, "Timer - " + name);

                    window.setTimeout(triggerEvent, intervall);
                }
                else
                {
                    delete self._timedEvents[name];
                }

            }
            catch (ex)
            {
                console.warn("Exception while executing timed Trigger '" + name + "': ", ex);
                delete self._timedEvents[name];
            }

            self.CallEvent(Events.TaskDisposed, self, "Timer - " + name);
        };

        self.CallEvent(Events.TaskCreated, self, "Timer - " + name);
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
    public AddTimedTrigger(name: string, triggerEvent: string, intervall: number, sender?: any, args?: any)
    {
        var self = this;
        var callback = function (sender, args)
        {
            self.CallEvent(triggerEvent, sender, args);
        };

        this.AddTimer(name, callback, intervall, sender, args);
    }

    /**
     * Stops a specific Timer
     * @param name Name of the Timer
     */
    public StopTimer(name: string)
    {
        if (this._timedEvents[name] !== undefined)
        {
            this._timedEvents[name].run = false;
        }
    }

    private AddEventToList(name: string)
    {
        if (this._calledEvents.indexOf(name) === -1)
        {
            this._calledEvents.push(name);
        }

    }

}

/// <reference path="../_reference.ts" />
/**
 * Component used for handling Events
 */
var EventHandler = (function () {
    /**
     * Initializes a new Instance
     * @param main StoryParser instance
     */
    function EventHandler(main) {
        this._events = {};
        this._calledEvents = [];
        this._main = null;
        this._timedEvents = {};
        this._main = main;
    }
    /**
     * Adds an Listener for a specific Event
     * @param event The name of the Event
     * @param callback The callback Function for this Handler
     */
    EventHandler.prototype.AddEventListener = function (event, callback) {
        if (this._events === undefined) {
            this._events = {};
        }
        if (this._events[event] === undefined) {
            this._events[event] = {
                callbacks: []
            };
        }
        this._events[event].callbacks.push(callback);
    };
    /**
     * Adds an EventListener for Requests
     * @param event The Request to listen to
     * @param callback The callback that collects the data
     */
    EventHandler.prototype.AddRequestEventListener = function (event, callback) {
        this.AddEventListener(event, function (s, args) {
            args.response = callback(s, args.input);
        });
    };
    /**
     * Calls a specific event
     * @param event The name of the event
     * @param sender The Sender of the event
     * @param args The Argument of this Event
     */
    EventHandler.prototype.CallEvent = function (event, sender, args) {
        this.AddEventToList(event);
        var unheared = ((this._events === undefined) || (this._events[event] === undefined));
        if (this._main !== undefined && this._main !== null && this._main.VERBOSE) {
            console.log("Event Called: " + event + " - ", { name: event, sender: sender, args: args, heared: !unheared });
        }
        if (this._main.VERBOSE) {
            console.log("Current Events: ", this._events);
        }
        if (unheared) {
            if (this._main.VERBOSE) {
                console.warn("EventHandler - No Event called '" + event + "' found!");
            }
            return false;
        }
        for (var i = 0; i < this._events[event].callbacks.length; i++) {
            try {
                this._events[event].callbacks[i](sender, args);
            }
            catch (ex) {
                console.error("Can't execute Event-Callback", event, ex);
            }
        }
        return true;
    };
    /**
     * Calls the event with the given name and requests an Answer
     * @param event The Event that should be called
     * @param sender The Sender of this Event
     * @param input The Data that is sent
     */
    EventHandler.prototype.RequestResponse = function (event, sender, input) {
        var data = {
            response: undefined,
            input: input
        };
        if (!this.CallEvent(event, sender, data)) {
            console.error("No source for Event '" + event + "' found!");
        }
        return data.response;
    };
    /**
     * Returns a list of all called Events
     */
    EventHandler.prototype.GetEvents = function () {
        return Object.keys(this._events).concat(this._calledEvents);
    };
    /**
     * Check if a specific Event was called allready
     * @param index The name of the Event
     */
    EventHandler.prototype.ContainsKey = function (index) {
        return (this.GetEvents().indexOf(index) !== -1);
    };
    /**
     * Adds a generic Timer
     * @param name The name of the Timer
     * @param callback Callback funtion for this timer
     * @param intervall The Intervall of this Event
     * @param sender The sender of the Event
     * @param arguments The Argument for this Event
     */
    EventHandler.prototype.AddTimer = function (name, callback, intervall, sender, args) {
        if (this._timedEvents[name] !== undefined) {
            this.StopTimer(name);
        }
        this._timedEvents[name] = {
            run: true,
            callback: callback
        };
        var self = this;
        var triggerEvent = function () {
            try {
                var data = self._timedEvents[name];
                if ((data !== undefined) && (data.run)) {
                    data.callback(sender, args);
                    self.CallEvent(Events.TaskCreated, self, "Timer - " + name);
                    window.setTimeout(triggerEvent, intervall);
                }
                else {
                    delete self._timedEvents[name];
                }
            }
            catch (ex) {
                console.warn("Exception while executing timed Trigger '" + name + "': ", ex);
                delete self._timedEvents[name];
            }
            self.CallEvent(Events.TaskDisposed, self, "Timer - " + name);
        };
        self.CallEvent(Events.TaskCreated, self, "Timer - " + name);
        window.setTimeout(triggerEvent, intervall);
    };
    /**
     * Adds a timed Event
     * @param name The name of the Timer
     * @param triggerEvent The name of the Event
     * @param intervall The intervall of the event
     * @param sender the Sender of the Event
     * @param arguments The Argument for this Event
     */
    EventHandler.prototype.AddTimedTrigger = function (name, triggerEvent, intervall, sender, args) {
        var self = this;
        var callback = function (sender, args) {
            self.CallEvent(triggerEvent, sender, args);
        };
        this.AddTimer(name, callback, intervall, sender, args);
    };
    /**
     * Stops a specific Timer
     * @param name Name of the Timer
     */
    EventHandler.prototype.StopTimer = function (name) {
        if (this._timedEvents[name] !== undefined) {
            this._timedEvents[name].run = false;
        }
    };
    EventHandler.prototype.AddEventToList = function (name) {
        if (this._calledEvents.indexOf(name) === -1) {
            this._calledEvents.push(name);
        }
    };
    return EventHandler;
}());
//# sourceMappingURL=EventHandler.js.map
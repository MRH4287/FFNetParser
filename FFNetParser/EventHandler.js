/// <reference path="_reference.ts" /> 
/**
 * Component used for handling Events
 */
class EventHandler {
    /**
     * Initializes a new Instance
     * @param main StoryParser instance
     */
    constructor(main) {
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
    AddEventListener(event, callback) {
        if (this._events === undefined) {
            this._events = {};
        }
        if (this._events[event] === undefined) {
            this._events[event] = {
                callbacks: []
            };
        }
        this._events[event].callbacks.push(callback);
    }
    /**
     * Calls a specific event
     * @param event The name of the event
     * @param sender The Sender of the event
     * @param args The Argument of this Event
     */
    CallEvent(event, sender, args) {
        this.AddEventToList(event);
        var unheared = ((this._events === undefined) || (this._events[event] === undefined));
        if (this._main !== undefined && this._main !== null && this._main.VERBOSE) {
            console.log("Event Called: " + event + " - ", { name: event, sender: sender, args: args, heared: !unheared });
        }
        if (unheared) {
            //console.warn("EventHandler - No Event called '" + event + "' found!");
            return false;
        }
        for (var i = 0; i < this._events[event].callbacks.length; i++) {
            this._events[event].callbacks[i](sender, args);
        }
    }
    /**
     * Returns a list of all called Events
     */
    GetEvents() {
        return Object.keys(this._events).concat(this._calledEvents);
    }
    /**
     * Check if a specific Event was called allready
     * @param index The name of the Event
     */
    ContainsKey(index) {
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
    AddTimer(name, callback, intervall, sender, args) {
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
    }
    /**
     * Adds a timed Event
     * @param name The name of the Timer
     * @param triggerEvent The name of the Event
     * @param intervall The intervall of the event
     * @param sender the Sender of the Event
     * @param arguments The Argument for this Event
     */
    AddTimedTrigger(name, triggerEvent, intervall, sender, args) {
        var self = this;
        var callback = function (sender, args) {
            self.CallEvent(triggerEvent, sender, args);
        };
        this.AddTimer(name, callback, intervall, sender, args);
    }
    /**
     * Stops a specific Timer
     * @param name Name of the Timer
     */
    StopTimer(name) {
        if (this._timedEvents[name] !== undefined) {
            this._timedEvents[name].run = false;
        }
    }
    AddEventToList(name) {
        if (this._calledEvents.indexOf(name) === -1) {
            this._calledEvents.push(name);
        }
    }
}

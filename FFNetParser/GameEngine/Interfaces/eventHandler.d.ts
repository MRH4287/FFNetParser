/// <reference path="animationHandler.d.ts" />
/// <reference path="GameHandler.d.ts" />
/// <reference path="interfaces.d.ts" />
declare class EventHandler {
    private events;
    private calledEvents;
    private gameHandler;
    private timedEvents;
    constructor(gameHandler: GameHandler);
    public addEventListener(event: string, callback: (sender: any, arguments: any) => void): void;
    public callEvent(event: string, sender: any, arguments: any): boolean;
    public getEvents(): string[];
    public containesKey(index: string): boolean;
    public addTimer(name: string, callback: (sender: any, arguments: any) => void, intervall: number, sender?: any, arguments?: any): void;
    public addTimedTrigger(name: string, triggerEvent: string, intervall: number, sender?: any, arguments?: any): void;
    public stopTimer(name: string): void;
    private addEventToList(name);
}

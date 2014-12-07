/// <reference path="GameHandler.d.ts" />
declare class Profiler {
    private gameHandler;
    public taskList: {
        [index: string]: number;
    };
    constructor(gameHandler: GameHandler);
}

/// <reference path="GameHandler.d.ts" />
declare class JavaScriptHandler {
    private gameHandler;
    private basePath;
    private mapPathReg;
    constructor(gameHandler: GameHandler);
    public getScriptFile(path: string, appendBasePath?: boolean): any;
    public includeIfExist(path: string, appendBasePath?: boolean): void;
    public include(path: string, appendBasePath?: boolean): void;
    private run(script);
    public playSound(path: string): void;
    public playerPosition : Coordinate;
}

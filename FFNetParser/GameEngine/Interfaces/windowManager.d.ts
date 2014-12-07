/// <reference path="GameHandler.d.ts" />
declare class WindowManager {
    private gameHandler;
    private offsetDiff;
    private targetPos;
    private currentPos;
    constructor(gameHandler: GameHandler);
    private onPlayerPositionUpdate(self, sender, postion);
    private updateWindowPosition();
    public setSize(width: number, height: number): void;
}

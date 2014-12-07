/// <reference path="astar.d.ts" />
declare class PathHandler {
    private gameHandler;
    constructor(gameHandler: GameHandler);
    private debugElements;
    private STOP;
    public stopAllMovements(): void;
    public getRouteRaw(startPos: Coordinate, endPos: Coordinate): GridNode[];
    public getRoute(startPos: Coordinate, endPos: Coordinate, drawRoute?: boolean): Coordinate[];
    public drawRoute(start: Coordinate, route: Coordinate[]): void;
    public clearRoute(): void;
    public movePlayer(end: Coordinate, drawRoute?: boolean, onFinish?: () => void): void;
    public moveNPC(name: string, end: Coordinate, drawRoute?: boolean, onFinish?: () => void): void;
    private getDirectionFromOffset(start, end);
}

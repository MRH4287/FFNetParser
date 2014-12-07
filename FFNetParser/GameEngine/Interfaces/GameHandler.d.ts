/// <reference path="eventHandler.d.ts" />
/// <reference path="interfaces.d.ts" />
/// <reference path="astar.d.ts" />
/// <reference path="animationHandler.d.ts" />
/// <reference path="playerManager.d.ts" />
/// <reference path="Renderer.d.ts" />
/// <reference path="windowManager.d.ts" />
/// <reference path="scriptHandler.d.ts" />
/// <reference path="NPCHandler.d.ts" />
/// <reference path="MultiplayerHandler.d.ts" />
/// <reference path="Profiler.d.ts" />
/// <reference path="pathHandler.d.ts" />
declare class GameHandler {
    public config: {
        debug: boolean;
        width: number;
        height: number;
        tileSize: number;
        elementsPath: string;
        npcDataPath: string;
        mapPath: string;
        showBlocking: boolean;
        verbose: boolean;
        initStaticAnimations: boolean;
        playStaticAnimations: boolean;
        hideOwnUsername: boolean;
        playerModel: string;
        basePath: string;
    };
    public map: Tile[][];
    public elements: {
        [id: string]: ElementDefinition;
    };
    public eventHandler: EventHandler;
    public renderer: Renderer;
    public bottomAnimationHandler: AnimationHandler;
    public middleAnimationHandler: AnimationHandler;
    public topAnimationHandler: AnimationHandler;
    public playerAnimationHandler: AnimationHandler;
    public playerManager: PlayerManager;
    public windowManager: WindowManager;
    public npcManager: NPCHandler;
    public pathHandler: PathHandler;
    public npcDefinitions: {
        [id: string]: NPCInformation;
    };
    public spriteContainer: {
        [id: string]: HTMLElement;
    };
    public animations: {
        [id: string]: InternalAnimationContainer;
    };
    private tileIDIndex;
    private tileFlagIndex;
    private elementsFlagIndex;
    constructor(config: any);
    public init(): void;
    private initAnimationContainer();
    private createAnimationHandler(level, layer, staticName?);
    public setRenderer(renderer: Renderer): void;
    public setEventHandler(eventHandler: EventHandler): void;
    private initAnimations();
    public loadAnimation(path: string): void;
    private preloadImage(name, path);
    private loadImage(path, callback);
    public loadConfig(): void;
    public changeLevel(path: string): void;
    public loadMap(reset?: boolean): void;
    private updateTile(tile, x, y);
    public getTileAtPos(x: number, y: number): Tile;
    public isCoordPassable(x: number, y: number): boolean;
    public getMapPassableData(): boolean[][];
    public getMapPassableData2(): number[][];
    public getElementByID(ID: string): ElementDefinition;
    public getElementsByFlagName(Flag: string): ElementDefinition[];
    public getTileByID(ID: string): Tile;
    public getTilesByFlagName(Flag: string): Tile[];
    public execVerbose(data: () => void): void;
    public activateVerbose(time?: number): void;
    public getFile(url: string, callback?: (any: any) => void, dataType?: string): any;
    public log(message?: any, ...optionalParams: any[]): void;
    public info(message?: any, ...optionalParams: any[]): void;
    public warn(message?: any, ...optionalParams: any[]): void;
    public error(message?: any, ...optionalParams: any[]): void;
}

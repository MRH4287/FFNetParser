/// <reference path="eventHandler.d.ts" />
/// <reference path="interfaces.d.ts" />
/// <reference path="animationHandler.d.ts" />
declare class PlayerManager {
    private playerAnimation;
    private gameHandler;
    private position;
    private targetPosition;
    private playerSpeed;
    private updatesPerSecond;
    private playerElementName;
    private playerState;
    private moveDirection;
    private lastAction;
    private displaySpeechBubbleTo;
    public keys: {
        up: number;
        left: number;
        right: number;
        down: number;
        action: number;
    };
    private keysDown;
    constructor(gameHandler: GameHandler, animationHandler: AnimationHandler, playerModel?: string);
    public initMove(direction: WalkDirection, initialCall?: boolean, callback?: () => any, resetAnimation?: boolean): void;
    private moveFinishedCallback(resetAnimation?);
    private positionUpdateStep(self, direction, offsetPerUpdate, intervall, callback?);
    public init(playerModel?: string): void;
    public movePlayerToSpawn(): void;
    public resetPlayerModel(): void;
    public getPosition(): Coordinate;
    private keyDown(key);
    private initPlayer(self, playerModel?);
    public setPlayerModel(model: string, position?: Coordinate): void;
    private playerAction();
    private playAnimation(name);
    public renderSpeechBubble(message: string, timeout?: number): void;
    private removeSpeechBubble();
}

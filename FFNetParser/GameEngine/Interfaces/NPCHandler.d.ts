/// <reference path="GameHandler.d.ts" />
declare class NPCHandler {
    private gameHandler;
    private animation;
    private npcList;
    private updatesPerSecond;
    constructor(gameHandler: GameHandler, animationHandler: AnimationHandler);
    public clear(): void;
    public addNPC(
        name: string,
        position: Coordinate,
        animationContainer: string,
        defaultAnimation: string,
        speed?: number
    ): void;
    public getNPC(name: string): NPCData;
    public removeNPC(name: string): void;
    public setAnimation(name: string, animationName: string): void;
    public renderSpeechBubble(
        name: string,
        message: string,
        timeout?: number
    ): void;
    private removeSpeechBubble(name);
    public setPosition(
        name: string,
        position: Coordinate,
        rerender?: boolean
    ): void;
    public NPCMotionStop(name: string): void;
    public advInitMove(
        name: string,
        position: Coordinate,
        direction: WalkDirection,
        speed: number,
        callback?: () => any,
        ignoreChecks?: boolean
    ): void;
    public initMove(
        name: string,
        direction: WalkDirection,
        callback?: () => any,
        ignoreChecks?: boolean
    ): void;
    private moveFinishedCallback(npc);
    private positionUpdateStep(
        npc,
        direction,
        offsetPerUpdate,
        intervall,
        callback?
    );
}

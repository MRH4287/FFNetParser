/// <reference path="eventHandler.d.ts" />
/// <reference path="GameHandler.d.ts" />
/// <reference path="interfaces.d.ts" />
declare class AnimationHandler {
    private canvas;
    private ctx;
    private eventHandler;
    private renderer;
    private gameHandler;
    private width;
    private height;
    private layer;
    public playableAnimations: {
        [id: string]: PlayableAnimation;
    };
    private animationGroups;
    private useAnimationGroups;
    private staticName;
    private genericDrawActions;
    constructor(gameHandler: GameHandler, layer: number, staticName?: string);
    public setLayer(layer: RendererLayer): void;
    public clear(): void;
    public setPosition(
        elementName: string,
        x: number,
        y: number,
        rerender?: boolean
    ): void;
    private tileUpdate(tile);
    public addAnimation(
        ElementID: string,
        containerName: string,
        startAnimation: string,
        x: number,
        y: number
    ): PlayableAnimation;
    public drawColorRect(
        name: string,
        x: number,
        y: number,
        width: number,
        height: number,
        red: number,
        green: number,
        blue: number,
        opacity?: number,
        rerender?: boolean
    ): void;
    public writeText(
        name: string,
        text: string,
        x: number,
        y: number,
        font?: string,
        textBaseline?: string,
        textAlign?: string,
        fillStyle?: string,
        maxWidth?: number,
        rerender?: boolean
    ): void;
    public drawRect(
        name: string,
        x: number,
        y: number,
        width: number,
        height: number,
        fillStyle?: string,
        rerender?: boolean
    ): void;
    public removeGenericDraw(name: string): void;
    private getNewAnimationInstance(input);
    public playAnimation(
        elementID: string,
        animation: string,
        group?: string
    ): void;
    public stopAnimation(elementID: string): void;
    private animationStep(group, animation);
    private getPosition(x, y);
    private renderAnimations(self);
    private renderAninmation(container, animation, x, y);
    private drawImage(
        name,
        offsetX,
        offsetY,
        width?,
        height?,
        canvasOffsetX?,
        canvasOffsetY?,
        canvasImageWidth?,
        canvasImageHeight?
    );
    public test(): void;
}

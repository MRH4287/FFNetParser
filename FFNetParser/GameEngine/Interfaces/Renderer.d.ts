﻿/// <reference path="GameHandler.d.ts" />
declare class Renderer {
    private canvas;
    private ctx;
    private bufferCanvas;
    private bufferCtx;
    private fps;
    private now;
    private lastUpdate;
    private fpsFilter;
    private minTimeBetweenFrames;
    private lastCheck;
    private layer;
    private width;
    private height;
    private staticWidth;
    private staticHeight;
    private staticRendered;
    private elements;
    private map;
    private offset;
    private eventHandler;
    private gameHandler;
    constructor(canvas: any, gameHandler: any);
    private beginDrawing();
    public getFPS(): number;
    private initLayer();
    public setConfig(elements: any): void;
    public initMap(sizeX: any, sizeY: any): void;
    public setMap(map: any, reset: any): void;
    private updateTile(tile);
    private renderMap(callback);
    private renderDynamic();
    private render();
    public setOffset(offset: Coordinate): void;
    public getBottomAnimationLayer(): RendererLayer;
    public getMiddleAnimationLayer(): RendererLayer;
    public getTopAnimationLayer(): RendererLayer;
    public getPlayerLayer(): RendererLayer;
    public getTileSize(): number;
    public getMapSize(): Coordinate;
    private clear(ctx);
    public clearRenderContext(ctx: any): void;
    private addTile(tile, x, y, readyCallback);
    private addImage(ctx, tile, x, y, width, height, imageOnLoad);
    private getFile(url, callback, dataType);
}
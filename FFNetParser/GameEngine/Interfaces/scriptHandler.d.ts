/// <reference path="GameHandler.d.ts" />
declare enum ElementTypes {
    Unknown = 0,
    OnEvent = 1,
    SetVariable = 2,
    If = 3,
    Command = 4,
    Event = 5,
    Sound = 6,
    Variable = 7,
    Increment = 8,
    Decrement = 9,
    Add = 10,
    Sub = 11,
    Mult = 12,
    Div = 13,
    Gt = 14,
    Lt = 15,
    Eq = 16,
    Neq = 17,
    GtE = 18,
    LtE = 19,
    And = 20,
    Nand = 21,
    Or = 22,
    Nor = 23,
    Not = 24,
    Tile = 25,
}
declare class ScriptHandler {
    private gameHandler;
    private typeShortcuts;
    constructor(gameHandler: GameHandler);
    private eventHandler;
    private variables;
    private loadScript(path);
    public parseScript(scriptRoot: any): void;
    private parseScriptNode(scriptNode);
    private handleOnEvent(node);
    private handleSetVariable(node);
    private commandCalled(argument);
    private handleIf(node);
    private parseValue(value);
    private getVariable(name);
    private checkParam(element, argument);
}

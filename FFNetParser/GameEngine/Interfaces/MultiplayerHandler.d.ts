/// <reference path="GameHandler.d.ts" />
declare enum MessageType {
    PlayerJoined = 0,
    PlayerDisconnected = 1,
    ConnectionRequest = 2,
    ConnectionResponse = 3,
    PlayerBeginMove = 4,
    PlayerPositionChanged = 5,
    PlayerAnimationChanged = 6,
    PlayerStopMove = 7,
    PlayerKicked = 8,
    ChatMessage = 9,
}
declare class MultiplayerHandler {
    private gameHandler;
    private serverAdress;
    private socket;
    private id;
    private username;
    private usernameTable;
    constructor(gameHandler: GameHandler, serverAdress: string, username: string);
    public init(): void;
    public connect(): void;
    public sendChatMessage(message: string): void;
    private renderPlayerLabel(name, position);
    private removePlayerLabel(name);
    private send(data, ignoreCheck?);
}

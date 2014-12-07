interface RendererLayer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}
interface ElementDefinition {
    ID: string;
    Name: string;
    Passable: boolean;
    Level?: number;
    Speed?: number;
    Flags?: string[];
    ImageURI: string;
    Events?: {
        key: string;
        value: string;
    }[];
    Dynamic?: boolean;
    AnimationDefinition?: string;
    AnimationContainer?: string;
    DefaultAnimation?: string;
}
interface Tile {
    ID?: string;
    BottomElementID?: string;
    MiddleElementID?: string;
    TopElementID?: string;
    Flags?: string[];
    Passable?: boolean;
    Speed?: number;
    Events?: {
        key: string;
        value: string;
    }[];
    BottomElement: ElementDefinition;
    MiddleElement: ElementDefinition;
    TopElement: ElementDefinition;
    Animation: PlayableAnimation;
    X: number;
    Y: number;
    XCoord: number;
    YCoord: number;
}
interface PlayableAnimation {
    ID: string;
    AnimationContainer: InternalAnimationContainer;
    Animation: Animation;
    X: number;
    Y: number;
    AnimationGroup: string;
}
interface Animation {
    ID: string;
    ImageCount: number;
    StartX: number;
    StartY: number;
    ImageHeight: number;
    ImageWidth: number;
    DisplayHeight: number;
    DisplayWidth: number;
    OffsetX: number;
    OffsetY: number;
    DisplayOffsetX: number;
    DisplayOffsetY: number;
    Speed: number;
    ReverseOnEnd: boolean;
    IsReverse: boolean;
    Loop: boolean;
    AnimationState: number;
    AnimationGroup: string;
}
interface AnimationContainer {
    ID: string;
    ImageURI: string;
    Animations: Animation[];
}
interface InternalAnimationContainer {
    ID: string;
    ImageURI: string;
    Animations: {
        [id: string]: Animation;
    };
}
interface NPCInformation {
    ID: string;
    Name: string;
    AnimationContainer: string;
    DefaultAnimation: string;
    Speed: number;
    Script?: string;
}
interface EventData {
    callbacks: {
        (sender: any, arguments: any): void;
    }[];
}
declare enum PlayerState {
    Standing = 0,
    Walking = 1,
}
declare enum WalkDirection {
    Up = 0,
    Down = 1,
    Left = 2,
    Right = 3,
    None = 4,
}
interface NPCData {
    ID: string;
    Position: Coordinate;
    Target: Coordinate;
    GUID: string;
    Speed: number;
    State: PlayerState;
    Direction: WalkDirection;
    DisplaySpeechBubbleTo: number;
}
declare class CoordinateHelper {
    static Add(a: Coordinate, b: Coordinate): Coordinate;
    static AddX(a: Coordinate, x: number): Coordinate;
    static AddY(a: Coordinate, y: number): Coordinate;
    static Subtract(a: Coordinate, b: Coordinate): Coordinate;
    static Length(a: Coordinate): number;
    static Normalize(a: Coordinate): Coordinate;
    static Multiply(a: Coordinate, b: number): Coordinate;
}
interface Coordinate {
    X: number;
    Y: number;
}

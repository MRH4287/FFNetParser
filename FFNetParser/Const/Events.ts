class Events
{
    /* System Calls */

    public static PreInit = "preInit";
    public static PostInit = "postInit";

    public static OnLoad = "onLoad";

    public static PreGuiUpdate = "preGuiUpdate";
    public static PostGuiUpdate = "postGuiUpdate";

    public static PreReadList = "preReadList";
    public static PostReadList = "postReadList";

    public static PreRead = "preRead";
    public static PostRead = "postRead";

    public static PreReadStory = "preReadStory";
    public static PostReadStory = "postReadStory";

    public static PreElementParse = "preElementParse";
    public static PostElementParse = "postElementParse";
    public static ElementChanged = "elementChanged";

    public static PreElementCallback = "preElementCallback";
    public static PostElementCallback = "postElementCallback";

    public static PreHighlighterCallback = "preHighlighterCallback";
    public static PostHighlighterCallback = "postHighlighterCallback";

    public static OnKeyDown = "onKeyDown";
    public static OnStoryCacheLoad = "onStoryCacheLoad";
    public static OnDataConfigLoad = "onDataConfigLoad";
    public static OnConfigLoad = "onConfigLoad";

    /* API */

    public static PreApiRequest = "preApiRequest";
    public static OnApiResult = "onAPIResult";

    /* Actions */

    public static ForceSaveConfig = "forceSaveConfig";
    public static ForceSaveDataStore = "forceSaveDataStore";
    public static ForceReadAll = "forceReadAll";
    public static HideElement = "hideElement";
    public static UpdateElementColor = "updateElementColor";
    public static UpdateListColor = "updateListColor";

    public static GuiShowMenu = "guiShowGui";
    public static GuiShowMessageMenu = "guiShowMessageMenu";
    public static GuiShowFeedbackMenu = "guiShowFeedbackMenu";
    public static GuiToggleLiveChat = "guiToggleLiveChat";
    public static GuiShowStoryPrefabList = "guiShowStoryPrefabList";


    /* Requests */

    public static RequestLiveChatAvailable = "requestLiveChatAvailable";
    public static RequestGetLinkToNextChapter = "requestGetLinkToNextChapter";
    public static RequestGetStoryInfo = "requestGetStoryInfo";
    public static RequestGetLinkToPageNumber = "requestGetLinkToPageNumber";


    /* Trace */

    public static TaskCreated = "TaskCreated";
    public static TaskDisposed = "TaskDisposed";

    /* Extensions */

    public static PreUpdateList = "preUpdateList";
    public static PostUpdateList = "postUpdateList";

    public static PreGuiMenuAppend = "preGUIMenuAppend";
    public static PostGuiMenuAppend = "postGUIMenuAppend";

    public static PreGUIMessageMenuAppend = "preGUIMessageMenuAppend";
    public static PostGUIMessageMenuAppend = "postGUIMessageMenuAppend";

    public static PreGUIStoryReminderAppend = "preGUIStoryReminderAppend";
    public static PostGUIStoryReminderAppend = "postGUIStoryReminderAppend";

    public static PreGUIOnlyModeAppend = "preGUIOnlyModeAppend";
    public static PostGUIOnlyModeAppend = "postGUIOnlyModeAppend";

    public static PreMessageCheck = "preMessageCheck";
    public static OnMessageGot = "onMessageGot";

    public static PreParagraphCheck = "preParapgraphCheck";

    public static OnChromeSync = "onChromeSync";
    public static OnChromeSyncDataReceived = "onChromeSyncDataReceived";
    public static OnChromeSyncChange = "onChromeSyncChange";



}


/* Event Args */
interface RequestGetLinkToNextChapterEventArgs
{
    Body: JQuery;
    Url: string;
    CurrentChapter: number;
    StoryName: string;
}

interface RequestGetLinkToPageNumberEventArgs
{
    Page: number
};

interface RequestGetStoryInfoEventArgs
{
    Link: string;
}

interface ElementParseEventArgs
    extends ElementEventArgs
{
}

interface HideElementEventArgs
{
    Url: string;
    Element: JQuery;
    CurrentPage: number;
    Reason: string;
}

interface ElementEventArgs
    extends StoryInfo
{
    Url: string;
    Element: JQuery;
    CurrentPage: number;
}

interface ElementChangedEventArgs
    extends ElementEventArgs
{ }

interface GuiShowStoryPrefabListEventArgs
    extends ElementEventArgs
{ }



interface UpdateElementColorEventArgs
{
    Element: JQuery;
    Color: string;
    MouseOverColor: string;
    ColorPriority: number;
    MouseOverPriority: number;
}
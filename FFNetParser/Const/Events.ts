class Events
{
    /*************************** System Calls  ***********************/

    /**
     * Called before the system initialized
     */
    public static PreInit = "preInit";
    /**
     * Called after all Inits are done
     */
    public static PostInit = "postInit";

    /**
     * The Init-Function for all Addons
     */
    public static OnLoad = "onLoad";
    /**
     * This Event is called every time the Content of the page updates
     * e.g. Initial Start, New Content loaded over Endless Mode, ...
     */
    public static OnPageUpdate = "onPageUpdate";

    /**
     * Called before the GUI is updated
     */ 
    public static PreGuiUpdate = "preGuiUpdate";
    /**
     * Called after the GUI was updates
     */
    public static PostGuiUpdate = "postGuiUpdate";

    /**
     * Called before the UpdateList Function is called
     */
    public static PreUpdateList = "preUpdateList";
    /**
     * Called after the UpdateList Function is called
     */
    public static PostUpdateList = "postUpdateList";

    /**
     * Called before the ReadList Function executes
     */
    public static PreReadList = "preReadList";
    /**
     * Called after the ReadList Function executes
     */
    public static PostReadList = "postReadList";

    /**
     * Called before the Read Function executes
     */
    public static PreRead = "preRead";
    /**
     * Called after the Read Function executes
     */
    public static PostRead = "postRead";

    /**
     * Called before the ReadStory Function executes
     */
    public static PreReadStory = "preReadStory";
    /**
     * Called after the ReadStory Function executes
     */
    public static PostReadStory = "postReadStory";

    /**
     * Called before the ElementParse Function is called
     */
    public static PreElementParse = "preElementParse";
    /**
     * Called after the ElementParse Function is called
     */
    public static PostElementParse = "postElementParse";
    /**
     * Called when an Property of an List-Element was changed
     */
    public static ElementChanged = "elementChanged";

    /**
     * Called before the ElementCallback is executed
     */
    public static PreElementCallback = "preElementCallback";
    /**
     * Called after the ElementCallback is executed
     */
    public static PostElementCallback = "postElementCallback";

    /**
     * Called before the HighglighterCallback is executed
     */
    public static PreHighlighterCallback = "preHighlighterCallback";
    /**
     * Called after the HighlighterCallback is executed
     */
    public static PostHighlighterCallback = "postHighlighterCallback";

    /**
     * Called when a Key was pressed
     */
    public static OnKeyDown = "onKeyDown";
    /**
     * Called when the StoryCache loads
     */
    public static OnStoryCacheLoad = "onStoryCacheLoad";
    /**
     * Called when the DataConfig loads
     */
    public static OnDataConfigLoad = "onDataConfigLoad";
    /**
     * Called when the Config loads
     */
    public static OnConfigLoad = "onConfigLoad";

    /*************************** API  ***********************/

    /**
     * Called before an API-Request is made
     */
    public static PreApiRequest = "preApiRequest";
    /**
     * Called when an API-Result was received
     */
    public static OnApiResult = "onAPIResult";

   /*************************** Actions  ***********************/

    /**
     * Save the Config
     */
    public static ActionForceSaveConfig = "actionForceSaveConfig";
    /**
     * Save the Data-Store
     */
    public static ActionForceSaveDataStore = "actionForceSaveDataStore";
    /**
     * Read All open pages
     */
    public static ActionForceReadAll = "actionForceReadAll";
    /**
     * Hide specific Element
     */
    public static ActionHideElement = "actionHideElement";
    /**
     * Update the color of an Element
     */
    public static ActionUpdateElementColor = "actionUpdateElementColor";
    /**
     * Update all colors of the Story-List
     */
    public static ActionUpdateListColor = "actionUpdateListColor";

    /**
     * Gui - Show the Menu
     */
    public static ActionGuiShowMenu = "actionGuiShowGui";
    /**
     * Gui - Show the Message-Menu
     */
    public static ActionGuiShowMessageMenu = "actionGuiShowMessageMenu";
    /**
     * Gui - Show the Feedback Menu
     */
    public static ActionGuiShowFeedbackMenu = "actionGuiShowFeedbackMenu";
    /**
     * Gui - Show the Live-Chat
     */
    public static ActionGuiToggleLiveChat = "actionGuiToggleLiveChat";
    /**
     * Gui - Show the StoryPrefabList
     */
    public static ActionGuiShowStoryPrefabList = "actionGuiShowStoryPrefabList";



   /*************************** Requests  ***********************/

    /**
     * REQUIRED - Requests the Main-Element selector
     * Example: .z-list
     */
    public static RequestMainElementSelector = "requestMainElementSelector";
    /**
     * Requests the availability of the Live-Chat
     */
    public static RequestLiveChatAvailable = "requestLiveChatAvailable";
    /**
     * Requests the Link to the next Chapter
     */
    public static RequestGetLinkToNextChapter = "requestGetLinkToNextChapter";
    /**
     * Requests the {StoryInfo} of an Story
     */
    public static RequestGetStoryInfo = "requestGetStoryInfo";
    /**
     * Requests the Link to a specific Page of the current Story
     */
    public static RequestGetLinkToPageNumber = "requestGetLinkToPageNumber";
    /**
     * Requests the current Page-Number
     */
    public static RequestGetCurrentPage = "requestGetCurrentPage";


    /*************************** Trace  ***********************/

    /**
     * Trace - A Task was created
     */
    public static TaskCreated = "TaskCreated";
    /**
     * Trace - A Task was disposed
     */
    public static TaskDisposed = "TaskDisposed";

    /*************************** Extensions  ***********************/


    /**
     * Called before the GUI is updated with the Menu
     */
    public static PreGuiMenuAppend = "preGUIMenuAppend";
    /**
     * Called after the GUI is updated with the Menu
     */
    public static PostGuiMenuAppend = "postGUIMenuAppend";

    /**
     * Called before the Message-Menu is appended to the Page
     */
    public static PreGUIMessageMenuAppend = "preGUIMessageMenuAppend";
    /**
     * Called after the Message-Menu is appended to the Page
     */
    public static PostGUIMessageMenuAppend = "postGUIMessageMenuAppend";

    /**
     * Called before the StoryReminder is appended to the Page
     */
    public static PreGUIStoryReminderAppend = "preGUIStoryReminderAppend";
    /**
     * Called after the StoryReminder is appended to the Page
     */
    public static PostGUIStoryReminderAppend = "postGUIStoryReminderAppend";

    /**
     * Called before the OnlyMode is appended to the Page
     */
    public static PreGUIOnlyModeAppend = "preGUIOnlyModeAppend";
    /**
     * Called after the OnlyMode appended to the Page
     */
    public static PostGUIOnlyModeAppend = "postGUIOnlyModeAppend";

    /**
     * Called before the Messages are checked
     */
    public static PreMessageCheck = "preMessageCheck";
    /**
     * Called when a new Message was received from the Server
     */
    public static OnMessageGot = "onMessageGot";

    /**
     * Called before the #goto Feature of the Story is executed
     */ 
    public static PreParagraphCheck = "preParapgraphCheck";

    /**
     * Called when the Chrome-Sync runs
     */
    public static OnChromeSync = "onChromeSync";
    /**
     * Called when the Chrome-Sync received Data
     */
    public static OnChromeSyncDataReceived = "onChromeSyncDataReceived";
    /**
     * Called when Data was changed via the Chrome Sync
     */
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

interface OnPageUpdateEventArgs {
    Container?: JQuery
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
var Events = (function () {
    function Events() {
    }
    return Events;
}());
/*************************** System Calls  ***********************/
/**
 * Called before the system initialized
 */
Events.PreInit = "preInit";
/**
 * Called after all Inits are done
 */
Events.PostInit = "postInit";
/**
 * The Init-Function for all Addons
 */
Events.OnLoad = "onLoad";
/**
 * This Event is called every time the Content of the page updates
 * e.g. Initial Start, New Content loaded over Endless Mode, ...
 */
Events.OnPageUpdate = "onPageUpdate";
/**
 * Called before the GUI is updated
 */
Events.PreGuiUpdate = "preGuiUpdate";
/**
 * Called after the GUI was updates
 */
Events.PostGuiUpdate = "postGuiUpdate";
/**
 * Called before the UpdateList Function is called
 */
Events.PreUpdateList = "preUpdateList";
/**
 * Called after the UpdateList Function is called
 */
Events.PostUpdateList = "postUpdateList";
/**
 * Called before the ReadList Function executes
 */
Events.PreReadList = "preReadList";
/**
 * Called after the ReadList Function executes
 */
Events.PostReadList = "postReadList";
/**
 * Called before the Read Function executes
 */
Events.PreRead = "preRead";
/**
 * Called after the Read Function executes
 */
Events.PostRead = "postRead";
/**
 * Called before the ReadStory Function executes
 */
Events.PreReadStory = "preReadStory";
/**
 * Called after the ReadStory Function executes
 */
Events.PostReadStory = "postReadStory";
/**
 * Called before the ElementParse Function is called
 */
Events.PreElementParse = "preElementParse";
/**
 * Called after the ElementParse Function is called
 */
Events.PostElementParse = "postElementParse";
/**
 * Called when an Property of an List-Element was changed
 */
Events.ElementChanged = "elementChanged";
/**
 * Called before the ElementCallback is executed
 */
Events.PreElementCallback = "preElementCallback";
/**
 * Called after the ElementCallback is executed
 */
Events.PostElementCallback = "postElementCallback";
/**
 * Called before the HighglighterCallback is executed
 */
Events.PreHighlighterCallback = "preHighlighterCallback";
/**
 * Called after the HighlighterCallback is executed
 */
Events.PostHighlighterCallback = "postHighlighterCallback";
/**
 * Called when a Key was pressed
 */
Events.OnKeyDown = "onKeyDown";
/**
 * Called when the StoryCache loads
 */
Events.OnStoryCacheLoad = "onStoryCacheLoad";
/**
 * Called when the DataConfig loads
 */
Events.OnDataConfigLoad = "onDataConfigLoad";
/**
 * Called when the Config loads
 */
Events.OnConfigLoad = "onConfigLoad";
/**
 * Called when a new Page-Wrapper is generated.
 * Argument: {
 *  Elements: {JQuery} Elements that are going to be wrapped
 *  IgnoreUserPage: {boolean} Should a User-Page be ignored
 *  CurrentPage: {number} Current Page
 * }
 */
Events.OnPageWrapperCreating = "onPageWrapperCreating";
/**
 *
 */
Events.OnStoryPageWrapperCreating = "onStoryPageWrapperCreating";
/*************************** API  ***********************/
/**
 * Called before an API-Request is made
 */
Events.PreApiRequest = "preApiRequest";
/**
 * Called when an API-Result was received
 */
Events.OnApiResult = "onAPIResult";
/*************************** Actions  ***********************/
/**
 * Save the Config
 */
Events.ActionForceSaveConfig = "actionForceSaveConfig";
/**
 * Save the Data-Store
 */
Events.ActionForceSaveDataStore = "actionForceSaveDataStore";
/**
 * Read All open pages
 */
Events.ActionForceReadAll = "actionForceReadAll";
/**
 * Hide specific Element
 */
Events.ActionHideElement = "actionHideElement";
/**
 * Update the color of an Element
 */
Events.ActionUpdateElementColor = "actionUpdateElementColor";
/**
 * Update all colors of the Story-List
 */
Events.ActionUpdateListColor = "actionUpdateListColor";
/**
 * Gui - Show the Menu
 */
Events.ActionGuiShowMenu = "actionGuiShowGui";
/**
 * Gui - Show the Message-Menu
 */
Events.ActionGuiShowMessageMenu = "actionGuiShowMessageMenu";
/**
 * Gui - Show the Feedback Menu
 */
Events.ActionGuiShowFeedbackMenu = "actionGuiShowFeedbackMenu";
/**
 * Gui - Show the Live-Chat
 */
Events.ActionGuiToggleLiveChat = "actionGuiToggleLiveChat";
/**
 * Gui - Show the StoryPrefabList
 */
Events.ActionGuiShowStoryPrefabList = "actionGuiShowStoryPrefabList";
/*************************** Requests  ***********************/
/**
 * REQUIRED - Requests the Main-Element selector
 * Example: .z-list
 */
Events.RequestMainElementSelector = "requestMainElementSelector";
/**
 * Requests the availability of the Live-Chat
 */
Events.RequestLiveChatAvailable = "requestLiveChatAvailable";
/**
 * Requests the Link to the next Chapter
 */
Events.RequestGetLinkToNextChapter = "requestGetLinkToNextChapter";
/**
 * Requests the {StoryInfo} of an Story
 */
Events.RequestGetStoryInfo = "requestGetStoryInfo";
/**
 * Requests the Link to a specific Page of the current Story
 */
Events.RequestGetLinkToPageNumber = "requestGetLinkToPageNumber";
/**
 * Requests the current Page-Number
 */
Events.RequestGetCurrentPage = "requestGetCurrentPage";
/*************************** Trace  ***********************/
/**
 * Trace - A Task was created
 */
Events.TaskCreated = "TaskCreated";
/**
 * Trace - A Task was disposed
 */
Events.TaskDisposed = "TaskDisposed";
/*************************** Extensions  ***********************/
/**
 * Called before the GUI is updated with the Menu
 */
Events.PreGuiMenuAppend = "preGUIMenuAppend";
/**
 * Called after the GUI is updated with the Menu
 */
Events.PostGuiMenuAppend = "postGUIMenuAppend";
/**
 * Called before the Message-Menu is appended to the Page
 */
Events.PreGUIMessageMenuAppend = "preGUIMessageMenuAppend";
/**
 * Called after the Message-Menu is appended to the Page
 */
Events.PostGUIMessageMenuAppend = "postGUIMessageMenuAppend";
/**
 * Called before the StoryReminder is appended to the Page
 */
Events.PreGUIStoryReminderAppend = "preGUIStoryReminderAppend";
/**
 * Called after the StoryReminder is appended to the Page
 */
Events.PostGUIStoryReminderAppend = "postGUIStoryReminderAppend";
/**
 * Called before the OnlyMode is appended to the Page
 */
Events.PreGUIOnlyModeAppend = "preGUIOnlyModeAppend";
/**
 * Called after the OnlyMode appended to the Page
 */
Events.PostGUIOnlyModeAppend = "postGUIOnlyModeAppend";
/**
 * Called before the Messages are checked
 */
Events.PreMessageCheck = "preMessageCheck";
/**
 * Called when a new Message was received from the Server
 */
Events.OnMessageGot = "onMessageGot";
/**
 * Called before the #goto Feature of the Story is executed
 */
Events.PreParagraphCheck = "preParapgraphCheck";
/**
 * Called when the Chrome-Sync runs
 */
Events.OnChromeSync = "onChromeSync";
/**
 * Called when the Chrome-Sync received Data
 */
Events.OnChromeSyncDataReceived = "onChromeSyncDataReceived";
/**
 * Called when Data was changed via the Chrome Sync
 */
Events.OnChromeSyncChange = "onChromeSyncChange";
;
//# sourceMappingURL=Events.js.map
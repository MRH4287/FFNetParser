/// <reference path="../_reference.ts" />
// -----  GUI Elements --------
var GUIElementType;
(function (GUIElementType) {
    GUIElementType[GUIElementType["Input"] = 0] = "Input";
    GUIElementType[GUIElementType["Button"] = 1] = "Button";
    GUIElementType[GUIElementType["Checkbox"] = 2] = "Checkbox";
    GUIElementType[GUIElementType["Combobox"] = 3] = "Combobox";
    GUIElementType[GUIElementType["Text"] = 4] = "Text";
    GUIElementType[GUIElementType["Color"] = 5] = "Color";
    GUIElementType[GUIElementType["PanelStart"] = 6] = "PanelStart";
    GUIElementType[GUIElementType["PanelEnd"] = 7] = "PanelEnd";
    GUIElementType[GUIElementType["Custom"] = 8] = "Custom";
})(GUIElementType || (GUIElementType = {}));
// ------- API Functions -------
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Invalid"] = 0] = "Invalid";
    MessageType[MessageType["getVersion"] = 1] = "getVersion";
    MessageType[MessageType["echo"] = 2] = "echo";
    MessageType[MessageType["test"] = 3] = "test";
    MessageType[MessageType["getCurrent"] = 4] = "getCurrent";
    MessageType[MessageType["getStyles"] = 5] = "getStyles";
    MessageType[MessageType["getMessages"] = 6] = "getMessages";
    MessageType[MessageType["readMessages"] = 7] = "readMessages";
    MessageType[MessageType["postFeedback"] = 8] = "postFeedback";
    MessageType[MessageType["getLanguageList"] = 9] = "getLanguageList";
    MessageType[MessageType["getLanguage"] = 10] = "getLanguage";
    MessageType[MessageType["liveChatInfo"] = 11] = "liveChatInfo";
    MessageType[MessageType["getStoryInfo"] = 12] = "getStoryInfo";
})(MessageType || (MessageType = {}));
//# sourceMappingURL=Types.js.map
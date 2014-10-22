interface StoryInfo
{
    name: string;
    url: string;
    chapter?: number;
    sentence?: string;
    // Used in Highlighter Config
    element?: JQuery;
}

interface MarkerConfig
{
    name: string;
    color: string;
    ignore: string[];
    keywords: string[];
    mark_chapter: boolean;
    mention_in_headline: boolean;
    display: boolean;
    mouseOver: string;
    print_story: boolean;
    search_story: boolean;
    keep_searching: boolean;
    ignoreColor: boolean;
    background: string;
    text_color: string;
    revision?: number;
}


interface RequestQueueData
{
    url: string;
    headline: string;
    config: MarkerConfig;
    element: JQuery;
    textEl: JQuery;
    info: StoryInfo;
    storyName: string;

}

interface Config
{
    story_search_depth: number;
    /* Yeah those names are wrong, but i don't want to make a rewrite Function Method to fix that ... */
    mark_M_storys: boolean;
    hide_non_english_storys: boolean;
    allow_copy: boolean;


    // Layout:
    color_normal: string;
    color_mouse_over: string;
    color_odd_color: string;
    hide_images: boolean;
    hide_lazy_images: boolean;
    disable_image_hover: boolean;
    content_width: string;
    enable_chapter_review_ratio: boolean;

    // Reading Aid:
    readingHelp_enabled: boolean;
    readingHelp_backgroundColor: string;
    readingHelp_color: string;

    // Endless Mode:
    endless_enable: boolean;            // Is the Endless Mode Enabled
    endless_forceClickAfter: number;    // Show a "Next Page" button after X pages

    // API:
    pocket_user: string;
    pocket_password: string;
    api_url: string;
    api_lookupKey: string;
    api_timeout: number;
    api_retries: number;
    api_checkForUpdates: boolean;
    api_autoIncludeNewVersion: boolean;
    api_webSocketServerAddress: string;

    // advanced Features:
    disable_cache: boolean;
    disable_highlighter: boolean;
    disable_parahraphMenu: boolean;
    disable_sync: boolean;
    chrome_sync: boolean;

    storage_key: string;
    config_key: string;
    dataStorage_key: string;

    highlighter: { [index: string]: HighlighterConfig };
    highlighterPrefabs: { [index: string]: MarkerConfig };
    marker: { [index: string]: MarkerConfig };
    token: string;
    markerBackup: { [index: string]: MarkerConfig };
    storyReminder: { [index: string]: StoryReminderData };

    upgradeTags: { [index: string]: UpgradeTag };

}

interface StoryReminderData
{
    name: string;
    storyID: string;
    chapter: number;
    paragraphID: number;
    visited: boolean;
    time: number;
    url: string;
}

interface HighlighterConfig
{
    image: string;
    hide: boolean;
    prefab?: string;
    note?: string;
    custom?: MarkerConfig;
}


enum GUIElementType
{
    Input, Button, Checkbox, Combobox, Text, Color, Custom
}

interface GUIElement
{
    name: string;
    type: GUIElementType;
    label: string;
    value: () => any;
    css?: {};
    attributes?: {};
    callback?: (e: JQueryEventObject) => void;
    values?: string[];
    customOptions?: (element: JQuery) => void;
    customElement?: (data: GUIElement) => JQuery;
    result?: (element: JQuery) => any;
    debugOnly?: boolean;
}

interface GUIData
{
    name: string;
    collection: any;
    guiData: GUIElement[];
    instances: { [index: string]: JQuery };
    customSaveFunction?: (data: GUIData) => void;
    sticky: boolean;
}

interface GUICategory
{
    name: string;
    title: string;
    instance?: JQuery;
    elements: GUIData;
}

interface WebSocketMessage
{
    Type: string;
    Data: string;
    Sender: string;
    Time: string;
}

interface UpgradeTag
{
    lastRun: number
}

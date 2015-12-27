/// <reference path="_reference.ts" /> 

// ---- Config -----

interface Config
{
    story_search_depth: number;
    /* Yeah those names are wrong, but i don't want to make a rewrite Function Method to fix that ... */
    mark_M_storys: boolean;
    hide_non_english_storys: boolean;
    allow_copy: boolean;
    language: string;
    sortFunction: string;


    // Layout:
    color_normal: string;
    color_mouse_over: string;
    color_odd_color: string;
    hide_images: boolean;
    hide_lazy_images: boolean;
    disable_image_hover: boolean;
    content_width: string;
    enable_chapter_review_ratio: boolean;
    enable_read_chapter_info: boolean;
    reading_info_ChapterMarker: string;

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
    api_github_url: string;
    api_github_requestStart_url: string;

    // advanced Features:
    disable_cache: boolean;
    disable_highlighter: boolean;
    disable_parahraphMenu: boolean;
    disable_sync: boolean;
    disable_default_coloring: boolean;
    disable_inStory_parsing: boolean;
    disable_resort_after_filter_match: boolean;
    chrome_sync: boolean;
    advanced_view: boolean;
    highlighter_use_storyID: boolean;

    storage_key: string;
    config_key: string;
    dataStorage_key: string;

    highlighter: { [index: string]: HighlighterConfig };
    highlighterPrefabs: { [index: string]: ModificationBase };
    marker: { [index: string]: MarkerConfig };
    token: string;
    markerBackup: { [index: string]: MarkerConfig };
    storyReminder: { [index: string]: StoryReminderData };

    upgradeTags: { [index: string]: UpgradeTag };

}


interface MarkerConfig extends ModificationBase
{
    ignore: string[];
    keywords: string[];
    mention_in_headline: boolean;
    print_story: boolean;
    search_story: boolean;
    keep_searching: boolean;
    revision?: number;
}

interface ModificationBase
{
    name: string;
    display: boolean;
    color: string;
    mark_chapter: boolean;
    mouseOver: string;
    ignoreColor: boolean;
    background: string;
    text_color: string;
    image: string;
    note?: string;
    highlight_color: string;
    priority: number;
    customPriority: ModififcationPriority;
}

interface ModififcationPriority
{
    color: number;
    mouseOver: number;
    text_color: number;
    highlight_color: number;
    background: number;
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
    custom?: ModificationBase;
}

interface UpgradeTag
{
    lastRun: number;
}

interface FollowUserData
{
    ID: number;
    Name: string;

    /**
     *  The Timestamp of the Follow
     */
    Followed: number;

    FollowStories: boolean;
    FollowFavs: boolean;

}

// ----- Request Handling -----

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

interface StoryInfo
{
    name: string;
    url: string;
    id: string;
    chapter?: number;
    sentence?: string;
    // Used in Highlighter Config
    element?: JQuery;
}

interface EventData
{
    callbacks:
    {
        (sender: any, arguments: any): void;
    }[];
}


// -----  GUI Elements --------

enum GUIElementType
{
    Input, Button, Checkbox, Combobox, Text, Color, PanelStart, PanelEnd, Custom
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
    values?: {
        name: string;
        id: string;
    }[];
    customOptions?: (element: JQuery) => void;
    customElement?: (data: GUIElement) => JQuery;
    result?: (element: JQuery) => any;
    debugOnly?: boolean;
    advancedOnly?: boolean;
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

// ------- API Functions -------

interface WebSocketMessage
{
    Type: string;
    Data: string;
    Sender: string;
    Time: string;
    Version: string;
}

interface LanguageData
{
    LanguageCode: string;
    Name: string;
    LastModified?: number;
    LastModifiedBy?: string;
    Values?: { Key: string; Value: string; }[];
}

interface SortFunctionDefinition
{
    Name: string;
    Function: (element: JQuery[]) => JQuery[];
}

interface GistData
{
    id: string;
    url: string;
    description: string;
    "public": boolean;
    valid: boolean;
    owner: string;
    files: string[];

}


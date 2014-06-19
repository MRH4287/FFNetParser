interface StoryInfo
{
    name: string;
    url: string;
    chapter?: number;
    sentence?: string;

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
    ignoreColor: boolean;
    background: string;
    text_color: string;
    revision?: number;
}


interface RequestQueueData
{
    url: string;
    keywords: string[];
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

    // Reading Aid:
    readingHelp_enabled: boolean;
    readingHelp_backgroundColor: string;
    readingHelp_color: string;

    // API:
    pocket_user: string;
    pocket_password: string;
    api_url: string;
    api_lookupKey: string;
    api_timeout: number;
    api_retries: number;
    api_checkForUpdates: boolean;
    api_autoIncludeNewVersion: boolean;

    // advanced Features:
    disable_cache: boolean;
    disable_highlighter: boolean;
    disable_sync: boolean;

    storage_key: string;
    config_key: string;
    dataStorage_key: string;

    highlighter: any;
    marker: { [index: string]: MarkerConfig };
    token: string;
    markerBackup: { [index: string]: MarkerConfig };
}


enum GUIElementType
{
    Input, Button, Checkbox, Combobox, Text, Custom
}

interface GUIElement
{
    name: string;
    type: GUIElementType;
    label: string;
    value: any;
    css?: {};
    attributes?: {};
    callback?: (e: JQueryEventObject) => void;
    values?: string[];
    customOptions?: (element: JQuery) => void;
    customElement?: (data: GUIElement) => JQuery;
    debugOnly?: boolean;
}

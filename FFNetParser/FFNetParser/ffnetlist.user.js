/// <reference path="main.ts" />
var storyParser = (function () {
    function storyParser() {
        this.DEBUG = true;
        this.IGNORE_NEW_VERSION = true;
        this.LOAD_INTERNAL = false;
        // Default-Config:
        this.config = {
            // Story:
            story_search_depth: 2,
            mark_M_storys: true,
            hide_non_english_storys: true,
            allow_copy: false,
            // Layout:
            color_normal: '#FFFFFF',
            color_mouse_over: '#EEF0F4',
            color_odd_color: '#dfdfdf',
            hide_images: false,
            hide_lazy_images: false,
            disable_image_hover: false,
            content_width: "90%",
            // API:
            pocket_user: null,
            pocket_password: null,
            api_url: 'http://www.mrh-development.de/FanFictionUserScript',
            api_lookupKey: 'ffnet-api-interface',
            api_timeout: 3000,
            api_retries: 2,
            api_checkForUpdates: true,
            // advanced Features:
            disable_cache: false,
            disable_highlighter: false,
            disable_sync: true,
            // Do not change below this line:
            storage_key: 'ffnet-storycache',
            config_key: 'ffnet-config',
            dataStorage_key: 'ffnet-dataStore',
            highlighter: {},
            marker: {}
        };
    }
    return storyParser;
})();

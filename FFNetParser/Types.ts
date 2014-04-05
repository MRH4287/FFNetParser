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


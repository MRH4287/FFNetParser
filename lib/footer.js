var parser = new StoryParser($('.z-list'));
parser.ReadList();
parser.EnablePocketSave($('#content_wrapper_inner'));
parser.EnableInStoryHighlighter($('#content_wrapper_inner'));
parser.EnableReadingAid();
parser.EnableEndlessMode();

parser.DebugOptions();
var parser = new StoryParser($('.z-list'));
parser.readList();
parser.enablePocketSave($('#content_wrapper_inner'));
parser.enableInStoryHighlighter($('#content_wrapper_inner'));
parser.enableReadingAid();
parser.enableEndlessMode();

parser.debugOptions();
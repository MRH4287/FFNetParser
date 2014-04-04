var parser = new StoryParser($('.z-list'));
parser.readList($('.z-list'));
parser.enablePocketSave($('#content_wrapper_inner'));
parser.enableInStoryHighlighter($('#content_wrapper_inner'));

parser.debugOptions();
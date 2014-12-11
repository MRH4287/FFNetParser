QUnit.config.autostart = false;

window.setTimeout(function ()
{
    QUnit.start();

}, 1000);

test('dependencied', function ()
{
    // expect(1);
    notEqual(jQuery, undefined, "JQuery has to be defined");
    notEqual($, undefined, "$ has to be defined");
    notEqual($.ui, undefined, "$.ui has to be defined");
    notEqual($.colorpicker, undefined, "$.colorpicker has to be defined");
});

test('Config defined', function ()
{
    notEqual(typeof (localStorage['ffnet-config']), "undefined", "The Config has to be defined");
});


test('Top-Header GUI', function ()
{
    var header = $("#top");
    var messageMenuLink = header.find(".ffnetMessageContainer");

    equal(messageMenuLink.length, 1, "There has to be one Message Menu Element");
    equal(messageMenuLink.find('img').length, 1, "There has to be an Image in the Container");
});


test('Story Add Highlighter Edit', function ()
{
    var element = $("#profile_top").first();

    var container = element.find(".context-menu");

    ok(container.length, 1, "There has to be an Edit Button for the Highlighter");
    equal(container.find("img").length, 1, "The Container has to contain the Edit Image");
});


test('Filter', function (assert)
{

    var container = $("#profile_top");
    equal(container.length, 1, "There is a Story-Info Container");

    var tag = container.find("span.parser-msg");
    equal(tag.length, 1, "There is a Filter Tag in the Container");
    equal(tag.text(), " [Test-Data-0]", "The Value of the Filer-Tag is correct")

    var element = container.find('.ffnet-story-highlighter');
    equal(element.length, 1, "There is a marked word in the Container");
    equal(element.text(), "Lorem", "The Word 'Lorem' is marked");


});


test('InStoryFilterOptions', function (assert)
{
    var container = $(".storytext");
    equal(container.length, 1, "There is a Story-Text Container");

    var tag = container.find("span.parser-msg");
    equal(tag.length, 1, "There is a Filter Tag in the Container");
    equal(tag.text(), " [Test-Data-1]", "The Value of the Filer-Tag is correct")


});

test('Pocket Feature', function ()
{
    var container = $("#profile_top").first();

    var select = container.find("select").first();
    equal(select.length, 1, "There should be one Select-Element in the Container");
    equal(select.children().length, 5, "The Select should have 5 Child Elements");

    var button = container.find("#ffnet-pocket-save-button");
    equal(button.length, 1, "There should be a 'Save To Pocket' Button");


});


test('basic test', function ()
{
    //expect(1);
    ok(true, 'this had better work.');
});


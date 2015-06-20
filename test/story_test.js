/// <reference path="libs/qunit.js" /> 

QUnit.config.reorder = false;

QUnit.test("UnitInit", function (assert)
{
    var done = assert.async();

    assert.notEqual(parser, undefined, "The parser has to be defined");

    window.setTimeout(function ()
    {
        // Wait a second to let the script complete all async Tasks

        done();
    }, 1000);

});


QUnit.test('Config defined', function (assert)
{
    assert.notEqual(typeof (localStorage['ffnet-config']), "undefined", "The Config has to be defined");
});


QUnit.test('Story Add Highlighter Edit', function (assert)
{
    var element = $("#profile_top").first();

    var container = element.find(".context-menu");

    assert.equal(container.length, 1, "There has to be an Edit Button for the Highlighter");
    assert.equal(container.find("img").length, 1, "The Container has to contain the Edit Image");
});


QUnit.test('Filter', function (assert)
{

    var container = $("#profile_top");
    equal(container.length, 1, "There is a Story-Info Container");

    var tag = container.find("span.parser-msg");
    assert.equal(tag.length, 1, "There is a Filter Tag in the Container");
    assert.equal(tag.text(), " [Test-Data-0]", "The Value of the Filer-Tag is correct")

    var element = container.find('.ffnet-story-highlighter');
    assert.equal(element.length, 1, "There is a marked word in the Container");
    assert.equal(element.text(), "Lorem", "The Word 'Lorem' is marked");


});


QUnit.test('InStoryFilterOptions', function (assert)
{
    var container = $(".storytext");
    assert.equal(container.length, 1, "There is a Story-Text Container");

    var tag = container.find("span.parser-msg");
    assert.equal(tag.length, 1, "There is a Filter Tag in the Container");
    assert.equal(tag.text(), " [Test-Data-1]", "The Value of the Filer-Tag is correct")


});

QUnit.test('Pocket Feature', function (assert)
{
    var container = $("#profile_top").first();

    var select = container.find("select").first();
    assert.equal(select.length, 1, "There should be one Select-Element in the Container");
    assert.equal(select.children().length, 5, "The Select should have 5 Child Elements");

    var button = container.find("#ffnet-pocket-save-button");
    assert.equal(button.length, 1, "There should be a 'Save To Pocket' Button");
});


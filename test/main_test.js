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


QUnit.test('Top-Header GUI', function (assert)
{
    var header = $("#top");
    var messageMenuLink = header.find(".ffnetMessageContainer");

    assert.equal(messageMenuLink.length, 1, "There has to be one Message Menu Element");
    assert.equal(messageMenuLink.find('img').length, 1, "There has to be an Image in the Container");
});

QUnit.test('Main-Header GUI', function (assert)
{
    var container = $("#zmenu > .zui > table > tbody > tr > td").first();

    var elements = container.find(".menu-link");
    assert.equal(elements.length, 2, "There have to be two Elements in the Main Header");

});

QUnit.test('Story-Headline', function (assert)
{
    var container = $("#mrhOutput");

    assert.equal(container.length, 1, "The Headline Container has to be there.");

    var expect = '<div><b>Page: 1</b></div><b>Test-Data:</b> 1 <b>Test-Data2:</b> 1  <i>All hidden elements:</i> <u title=\"Show the reasons for hiding\" class=\"clickable\">1</u><div><u>Test-Data: </u><ul><li><span><a href=\"#\"></a> - 0</span><a href=\"#null\">#</a></li></ul></div>';
    assert.equal(container.html(), expect, "The Content of the Headline Container has to match");

});


QUnit.test('Story-Hiding', function (assert)
{
    var secondElement = $($(".z-list")[1]);

    assert.equal(secondElement.is(":visible"), false, "The Second Element has to be Invisible");
});

QUnit.test('Story-Color', function (assert)
{
    var element = $(".z-list").first();

    assert.equal(element.attr("data-color"), "#ff0000", "The Data-Color Attribute has to be set");
    assert.equal(element.attr("data-mouseovercolor"), "#00ff00", "The Data-Mouseovercolor Attribute has to be set");

    var styles = element.attr("style");

    assert.ok(styles.indexOf("background-color: rgb(255, 0, 0)") != -1, "The Color of the Element has to be set");


});

QUnit.test('Story Mark Keywords', function (assert)
{
    var element = $(".z-list").first().find('.ffnet-story-highlighter');

    assert.equal(element.length, 1, "There is a marked word in the story");
    assert.equal(element.text(), "good", "The Word 'good' is marked");

});

QUnit.test('ChapterReviewRatio', function (assert)
{
    var element = $(".z-list").first().find(".z-padtop2");

    assert.equal(element.length, 1, "There is a Element with the Class 'z-padtop2'");

    var children = element.children().filter(".parser-msg");

    assert.ok(children.length > 0, "There needs to be at least one Element of Type 'parser-msg'");
    assert.equal(children.last().text(), " - Chapter/Review Ratio: 1/0.25", "The Ratio needs to match the expected Value");


});

QUnit.test('Story Add Highlighter Edit', function (assert)
{
    var element = $(".z-list").first();

    var container = element.find(".context-menu");

    assert.equal(container.length, 1, "There has to be an Edit Button for the Highlighter");
    assert.equal(container.find("img").length, 1, "The Container has to contain the Edit Image");
});

QUnit.test('Story-ImageRemoval', function (assert)
{
    var element = $(".z-list").first();

    var done = assert.async();

    window.setTimeout(function ()
    {
        assert.equal(element.find(".cimage").length, 0, "There is no CImage Element");
        assert.equal(element.find(".lazy").length, 0, "There is no Lazy Element");
        assert.equal(element.find("img").length, 1, "There is only one Image");

        done();
    }, 1000);



});



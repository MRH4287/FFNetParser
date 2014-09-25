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

test('Main-Header GUI', function ()
{
    var container = $("#zmenu > .zui > table > tbody > tr > td").first();

    var elements = container.find(".menu-link");
    equal(elements.length, 3, "There have to be three Elements in the Main Header");

});

test('Story-Headline', function ()
{
    var container = $("#mrhOutput");

    equal(container.length, 1, "The Headline Container has to be there.");

    var expect = '<div><b>Page: 1</b></div><b>Test-Data:</b> 1 <b>Test-Data2:</b> 1  <i>All hidden elements:</i> <u title=\"Show the reasons for hiding\" class=\"clickable\">1</u><div><u>Test-Data: </u><ul><li><span><a href=\"#\">None</a> - 0</span><a href=\"#None\">#</a></li></ul></div>';
    equal(container.html(), expect, "The Content of the Headline Container has to match");

});


test('Story-Hiding', function ()
{
    var secondElement = $($(".z-list")[1]);

    equal(secondElement.is(":visible"), false, "The Second Element has to be Invisible");
});

test('Story-Color', function()
{
    var element = $(".z-list").first();

    equal(element.attr("data-color"), "#ff0000", "The Data-Color Attribute has to be set");
    equal(element.attr("data-mouseovercolor"), "#00ff00", "The Data-Mouseovercolor Attribute has to be set");

    var styles = element.attr("style");

    ok(styles.indexOf("background-color: rgb(255, 0, 0)") != -1, "The Color of the Element has to be set");


});

test('Story Mark Keywords', function ()
{
    var element = $(".z-list").first().find('.ffnet-story-highlighter');

    equal(element.length, 1, "There is a marked word in the story");
    equal(element.text(), "good", "The Word 'good' is marked");

});

test('Story Add Highlighter Edit', function ()
{
    var element = $(".z-list").first();

    var container = element.find(".context-menu");

    equal(container.length, 1, "There has to be an Edit Button for the Highlighter");
    equal(container.find("img").length, 1, "The Container has to contain the Edit Image");
});

// Can't Test because of timing issues
/*
test('Story-ImageRemoval', function ()
{
    var element = $(".z-list").first();

    equal(element.find(".cimage").length, 0, "There is no CImage Element");
    equal(element.find(".lazy").length, 0, "There is no Lazy Element");
    equal(element.find("img").length, 1, "There is only one Image");

});

*/


test('basic test', function ()
{
  //expect(1);
  ok(true, 'this had better work.');
});


/*
test('can access the DOM', function() {
  expect(1);
  var fixture = document.getElementById('qunit-fixture');
  equal(fixture.innerText, 'this had better work.', 'should be able to access the DOM.');
});
*/
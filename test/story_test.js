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

    var container = element.find(".highlight-msg");

    equal(container.length, 1, "There has to be an Edit Button for the Highlighter");
    equal(container.find("img").length, 1, "The Container has to contain the Edit Image");
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


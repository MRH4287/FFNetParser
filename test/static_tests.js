/// <reference path="libs/qunit.js" /> 
/// <reference path="../ffnetlist.user.js" /> 

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

QUnit.test('Dependencied', function (assert)
{
    // expect(1);
    assert.notEqual(jQuery, undefined, "JQuery has to be defined");
    assert.notEqual($, undefined, "$ has to be defined");
    assert.notEqual($.ui, undefined, "$.ui has to be defined");
    assert.notEqual($.colorpicker, undefined, "$.colorpicker has to be defined");
});

QUnit.module("Config")

QUnit.test("Config", function (assert)
{
    assert.notEqual(parser.config, undefined, "The config has to be defined");


});

QUnit.test("Config-Reset", function (assert)
{
    var currentToken = parser.config.token;

    parser.defaultConfig();

    assert.equal(currentToken, parser.config.token, "The Token should be the same after Reset");
    assert.deepEqual(parser.config, parser.baseConfig, "The new Config should match the default Config");
});

QUnit.test("loadFromMemory / saveToMemory", function (assert)
{
    var structure = {};
    var data = { Name: "Test", Value: { A: true, B: 23.233, C: [1, 2, 3] } };

    parser.saveToMemory(structure, "data", data);

    var result = parser.loadFromMemory(structure, "data");

    assert.deepEqual(result, data, "The Output should match the Input");

});

QUnit.module("Helper Functions")

QUnit.test("getStoryInfo", function (assert)
{
    var link = "https://www.fanfiction.net/s/12345678/10/The-Name-Of-The-Story";
    var compare = {
        Chapter: "10",
        Name: "The-Name-Of-The-Story",
        ID: "12345678"
    };

    assert.deepEqual(parser.getStoryInfo(link), compare, "The result data should match the reference Data");


});

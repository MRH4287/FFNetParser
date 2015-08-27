﻿var container = $('<div></div>')
.css("width", "100%")
.css("height", "100px")
.css("position", "fixed")
.css("bottom", "0")
.css("text-align", "right")
.attr('title', "Thank you for using my Script! Have a nice day! - © 2014 Pokémon. © 1995–2014 Nintendo/Creatures Inc./GAME FREAK inc. Pokémon, Pokémon character names, Nintendo 3DS, Nintendo DS, Wii, and Wiiware are trademarks of Nintendo.")
.appendTo($("body"))

var canvas = $('<canvas></canvas>')
.appendTo(container);

var gameHandler = new GameHandler({
    verbose: false,
    initStaticAnimations: true,
    mapPath: "data/FFNetMap.json",
    width: $("body").width(),
    height: 100,
    playerModel: "pichu",
    basePath: "https://www.mrh-development.de/FanFictionUserScript/SSLProxy/?url="
});
var eventHandler = new EventHandler(gameHandler);
var renderer = new Renderer(canvas[0], gameHandler);
//renderer.setOffset = function () { };
gameHandler.setRenderer(renderer);

gameHandler.init();


var text =
[
    "Have a nice day!",
    "Thank you for using my Script!",
    "If you need Help, send me a Message!"
];

var index = 0;


function speechBubble()
{
    gameHandler.playerManager.renderSpeechBubble(text[index], 2)

    index = (index + 1) % text.length;

    window.setTimeout("speechBubble", 5000);
}

window.setTimeout(function ()
{
    renderer.offset.X = 0;
    renderer.offset.Y = 3.6 * 25;
    gameHandler.playerManager.playAnimation("sleep")

    container.click(function ()
    {
        canvas.remove();
        container.remove();
        eventHandler.callEvent = function () { }
    });

	window.setInterval(function()
	{
		speechBubble();
	}, 5000);
    


}, 1000);







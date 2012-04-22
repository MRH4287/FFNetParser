
# Fanfiction.net Story Parser - UserScript

## Description:

This UserScript allowes to parse and mark storys in the list.


## Installlation:

To use this script, you need to install a UserScript-Plugin.
If you use Chrome, you allready got one.

For further instructions please check the Notes of your Plugin.
In the most cases you just have to open the Script in your Browser.

## First Run

When you use this script for the first time, click on the `#` on the right side of the Fanfiction.net Website.
This installs the default configuration.

## Configuration

This Script saves and loads data from your `localStorage` and your `sessionStorage`.
To configure this script, click on `Config Editor` in the Fanfiction.net GUI.

### Options

The Main-Configuration of this script should be self-explaining.

To add a new Highlight Option, click on `Add Field` on the bottom.
The Options are following:

* Name

    The Name, that is displayed for this Marker

* Display Found Entrys

    If Unchecked, all found entrys will be hidden

* Keywords

    The List of collon seperated Keywords for this Marker.
    **The Keyword will be parsed as RegularExpression!**

    _Example: `([^a-z]|^)(Keyword)([^a-z]|$)`_

* Ignore when

    If any of this Keywords matches, the marker won't be triggered
    **The Keyword will be parsed as RegularExpression!**

* Color

    The Background-Color of this Entry

* Mouse Over Color

    The Mouse-Over Color of this Entry

* Search in Storys

    This Option allowes you to search these Keywords within the storys.
    The Storys will be requested with AJAX and then matched.

    **This Option could lead to huge Memory and Processor usage!!**

* Mark Chapter

    Adds a little Tag with the name of the matching Marker to the name of the Story within the list

* List Storys

    Create a List of Chapters on top of the page.

* Mention in Headline

    List Marker in the Headline on top of the page


### Import / Export

To Import or Export your Config, click on the `?` in the top of the Fanfiction.net Page.

## Disclaimer

This script uses the jQuery Library.
It shouldn't harm your computer or yourself ( ;-) ), but if they do, you can't blame me.

If this script is against any law, please tell me.
FanFiction.net disallowes the usement of this kind of script, so use it at your own risk,


## License

MIT-License
# Fanfiction.net Story Parser - UserScript

## Description:

This UserScript allows to parse and mark stories in the list.


## Feature-List:
* GUI - Customization (change colors, site width, hide story images, disable image hover effect)
* Build filter to search for specific keywords.
  You can use those filter to:
   * Hide specific stories
   * Change Background / Hover Color
   * Mark Chapters (Add a Tag to the name of the Story)
   * List Stories (Add a list of matching stories on the top of the story list)
   * Mention in Headline (Add a notification to the headline, how many elements of one filter has been found) 
* Search with filters within the story (You can define the max depth for search)
* Add Config Options for specific Stories (set Marker or Hide Story)
* [Pocket](http://getpocket.com) Feature:
  Save an entire story to your Pocket (formally Read It Later) Account
* Color Picker for easy Color selection
* Switch pages with the cursor Keys
* Display only mode (Select a filter, only matching stories will be displayed)
* Auto Updater
* Synchronization 
  
If you want a feature that isn't listed above, please write an Issue-Report.      


## Installation:

To use this script, you need to install a UserScript-Plugin.
If you use Chrome, you already got one.

For further instructions please check the Notes of your Plugin.
In the most cases you just have to open the Script in your Browser.

In Chrome you have to drag & drop the .user.js file into your extenions page.

## First Run

> When you use this script for the first time, click on `Reset Config` on the right side of the Fanfiction.net Website.
> This installs the default configuration.

The `Reset Config` overwrites the current config with an empty one.

You no longer have to press `Reset Config` if you start your script the first time.

## Configuration

This Script saves and loads data from your `localStorage` and your `sessionStorage`.
To configure this script, click on `Config Editor` in the Fanfiction.net GUI.

__[Example Config](https://gist.github.com/4690800)__

### Options

The Main-Configuration of this script should be self-explaining.

To add a new Highlight Option, click on `Add Field` on the bottom.
The Options are following:

* Name

    The Name that is displayed for this Marker

* Display Found Entries

    If Unchecked, all found entries will be hidden

* Keywords

    The List of colon separated Keywords for this Marker.
    **The Keyword will be parsed as RegularExpression!**

    _Example: `([^a-z]|^)(Keyword)([^a-z]|$)`_

* Ignore when

    If any of these Keywords matches, the marker won't be triggered
    **The Keyword will be parsed as RegularExpression!**

* Ignore Color Settings

    Ignores the Color Settings. The color won't be changed through this filter.
	
* Color

    The Background-Color of this Entry

* Mouse Over Color

    The Mouse-Over Color of this Entry

* Search in Stories

    This Option allows you to search these Keywords within the stories.
    The Stories will be requested with AJAX and then matched.

    **This Option could lead to huge Memory and Processor usage!!**

* Mark Chapter

    Adds a little Tag with the name of the matching Marker to the name of the Story within the list

* List Stories

    Create a List of Chapters on top of the page.

* Mention in Headline

    List Marker in the Headline on top of the page

	
### Pocket 

Pocket is a free Web service to save your Stories for later.

If a Username and Password is given, the script enables a "Save to Pocket" Option for Stories.

The Story will be saved beginning on the current chapter to the current last chapter.


**The Username and Password are being saved in plaintext! This can be a security risk.**  


### Import / Export

To Import or Export your Config, click on the `Config Import / Export` in the top of the Fanfiction.net Page.


### Synchronization 

This allows the user to upload their filter settings to the web service.

The Data is Synchronized between the clients. To identify a specific user, a user specific token is used, that is generated at first run.

_Warning: The Data is transferred unencrypted!_ 

__I would change that if i could, but HTTPS do not work so well with my API Calls__



## Disclaimer

This script uses jQuery, jQuery UI and the ColorPicker Addon from Martijn W. van der Lee.
It shouldn't harm your computer or yourself ( ;-) ), but if they do, you can't blame me.

If this script is against any law, please tell me.
FanFiction.net disallows the use of this kind of script, so use it at your own risk.


## License

MIT-License

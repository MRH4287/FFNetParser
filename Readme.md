# Fanfiction.net Story Parser - UserScript

## Description:

This UserScript allows to parse and mark stories in the list.

**Note: This Userscript *should* work with www.fictionpress.com, but i only concentrate on fanfiction.net.
If there is an problem with fictionpress.com, please report that to me.**


*You can find a compiled Version of the Script [Here](http://server.mrh-development.de:8080/job/Fanfiction%20User%20Script/lastSuccessfulBuild/artifact/ffnetlist.user.js)*

**Warning: The Version above can be broken! Choose a different Version [Here](http://server.mrh-development.de:8080/job/Fanfiction%20User%20Script/) if necessary.**


## Need Help?

Go to the [Wiki](https://github.com/MRH4287/FFNetParser/wiki) for more Information!



## Feature-List:
* GUI - Customization (change colors, site width, hide story images, disable image hover effect)
* Build filter to search for specific keywords.
  You can use those filter to:
   * Hide specific stories
   * Change Background / Hover / Info Text Color
   * Mark Chapters (Add a Tag to the name of the Story)
   * List Stories (Add a list of matching stories on the top of the story list)
   * Mention in Headline (Add a notification to the headline, how many elements of one filter has been found) 
* Search with filters within the story (You can define the max depth for search)
* Add Config Options for specific Stories (set Marker or Hide Story)
* [Pocket](http://getpocket.com) Feature:
  Save an entire story to your Pocket (formally Read It Later) Account
* Color Picker for easy Color selection
* Switch pages with the cursor Keys
* Allow text selection
* Display only mode (Select a filter, only matching stories will be displayed)
* Auto Updater
* Synchronization 
* Messaging System / Feedback Button
  
If you want a feature that isn't listed above, please write an Issue-Report.      



## How to Build this

This Script uses Grunt as Buildtool.

Install Node.js on your machine and run the command `npm install` in the project directory.

After that, just run `grunt` to run the build process.


## Disclaimer

This script uses jQuery, jQuery UI and the ColorPicker Addon from Martijn W. van der Lee.
It shouldn't harm your computer or yourself ( ;-) ), but if they do, you can't blame me.

If this script is against any law, please tell me.
FanFiction.net disallows the use of this kind of script, so use it at your own risk.


## License

MIT-License

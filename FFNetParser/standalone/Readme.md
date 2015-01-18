## Standalone

__This is still in development!__

This System is a Standalone Version of the Script.
It is ment for mobile devices, but isn't finished.


Currently it only works with a Server and Client running on two Systems.


## Why a Server and a Client?

 
 I am using something called AJAX to get all the Chapters from the Fanfiction.net page.
 The Problem is, that i am normally not allowed to do that.

 The problem is the the so called Same-Origin-Policy.

 My Script is not allowed to request Data from fanfiction.net if it's not explicitly allowed.


 The reason for the Server is the following:

 The Server is able to request Data from fanfiction.net and can relay that data to my Script.


 ## How to use this?


 Compile the Userscript with the command `grunt standalone`.
 
 That creates a folder called `standalone` in the `build` Directory.
 This Folder containes everythig you need to run the standalone Script.

 Run the Server via `node Server.js`.
 
 This should start the Proxy-Server on Port 8080.

 Run the `start.html` to use the local Version.


 ## How to run this on a Tablet or Phone?


 Currently there is no easy way to run this on a Phone or Tablet.

 In order to use it, you would need a local Computer that has the Server running.
 
 The default settings for the Proxy-Server is at `localhost`. You have to change that to the IP of the Computer in your Network.

 You can change it in the `Standalone.js`.


 ## Why isn't it working?

 * Is the IP correct?
 * Is the Firewall blocking the Port?
 * Is another Application running, that uses Port 8080? (Skype does that for example ...)


 If you still have questions, send me a message.

 
 ## Important

 This is still in development. It may not work at all.

 This System is not on my priority List, so don't expect fast updates.
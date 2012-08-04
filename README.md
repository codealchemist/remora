Remora
======

A multi instance remote control for your beloved Grooveshark music!

This first version of Remora gives you basic remote control over Grooveshark's HTML5 site.
Current features:
* Play
* Pause
* Rewind
* Previous
* Next

## How it works?
Remora provides javascript code you can use to create a special bookmark.
While listening to your favorite music in the Grooveshark site (http://grooveshark.com) click this special bookmark.
It will inject Remora in Grooveshark's page, like a remora fish attaches to a shark ;)

Remora will take care of crossdomain communication between Grooveshark instances and the Remora remote control page.
Commands fired thru the remote control page will be broadcasted almost instantly to all Grooveshark instances.

Remora uses Meteor as a javascript server side component, but don't worry, it will easily run in any normal computer.
The Meteor instance is the central communication point between any Remoras attached to any number of Grooveshark instances.
The remote control instance is separate from Meteor right now, so you can serve it with Apache or any other web server.
It's based on Twitter's Bootstrap (http://twitter.github.com/bootstrap).

You should also check http://meteor.com, which is a fascinating tool!

TIP:
You can check your browsers javascript console to see what's going on.

## So... What can I do with Remora?
The most practical use case right now will be having Grooveshark open in a computer attached to your main audio device at home and controlling it from a remote host.

You can also open multiple instances of Grooveshark in your house or office and control all of them at once from the same UI.

Multiple users can be using Grooveshark with Remora attached to it at one place and if you need a moment of silence for some reason you can pause all music everywhere with just one click.

You can start playing the same songs in all of the rooms of your house if you have very responsive clients and the luck of a good sync! :p

We might think about sync in the future.

## Install
* Download or clone this repo

	`git clone git@github.com:codealchemist/remora.git`

* Change the default Remora remote domain name in the files:

	`public/js/inject.js`

	`public/js/remora.site.js`

	`public/js/lib/remora.lib.js`

	`meteor/remora.meteor.js`

This should point to the URL where you are running Remora.
You can use local network names or IPs to run inside a LAN.
In a future release I plan to centralize config.

* Open Remora's index.php in a web browser and drag and drop the bookmarklet into the bookmarks bar.
* Install Meteor

	`curl install.meteor.com | /bin/sh`
* Run Remora's Meteor instance

	`cd remora/meteor`

	`meteor`
* Open http://grooveshark.com
* Click your Remora bookmark (you should see an alert with the text "Remora attached!")
* Open Remora's remote control page
* Start playing!

## Ideas?
Yeah, we have more fun ideas for Remora, this is a first release to show that its concept actually works.

And it will be interesting if you want to share yours here.

We'll surely read them!




You'll need to work a bit to start playing, but once you made it you get a nice reward.
;)

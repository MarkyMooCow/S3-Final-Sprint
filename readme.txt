Creators: Mark Hunter, Riley John, Heather Bartlett
Project Name: S3-FinalSprint
Description: This project takes a PGAdmin Database and a MongoDB database to make a combined video game database!
(Disclaimer: There are and will be dupes. Also the search queries are super strict, you'll have to search EXACTLY the name of the game. Capital and lowercase don't matter though, we managed make that not matter)

Anyways, lets talk about setup.
-----
PGAdmin
Alright, the PGAdmin server is ran locally, so you'll have to run the GameStock.sql on your own.
Boot up your personal PGAdmin and run that code in the query terminal for the database you want it in.

After that, we'll have to change the | db.js | around to fit a role on your PC.
Create a role by right clicking on Login/Group roles and selecting Create > Login/Group Role.
I suggest giving it pretty much all the permissions you can.

After that, just configure the db.js to fit the parameters of what you entered for your role.
As you may of noticed, my personal user is Morgan. But that probs ain't working on your console.
-----
MongoDB
It just works.

No seriously, that's all there is to it. The only way it won't work is if the database is taken down somehow.
Or you have no internet.
That's possible too.
-----
The App Itself
Final stretch, lets go!

I'll need you to run two commands in your terminal.

npm init
npm i bcrypt ejs express express-flash express-session method-override mongodb passport passport-local pg
npm i --save-dev env

One is slightly longer then the others.
-----
After that, you should be golden! Just run | node server.js | in the terminal!
Now granted the compiled code is a bit...Spaghetti. But I'll leave comments throughout to somewhat explain what happens.

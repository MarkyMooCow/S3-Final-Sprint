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

After that, just configure the | db.js | to fit the parameters of what you entered for your role.
As you may of noticed, my personal user is Morgan with my password being Jeralt, but feel free to use whatever login credientials you want.
-----
MongoDB
As long as the MongoDB Server is up (This is ran by Riley John) and you are connected to the internet, you can leave this be. 
The only thing you'll really have to do is install something later for the app itself in the step below.
-----
The App Itself
Alright, final stretch. I'll need you to run three commands in your terminal.

npm init
npm i bcrypt ejs express express-flash express-session method-override mongodb passport passport-local pg
npm i --save-dev env
-----
After that, you should be golden! Just run | node server.js | in the terminal!

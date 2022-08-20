if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Holy mother of modules.
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const dal = require("./db");
const { MongoClient } = require("mongodb");
const initializePassport = require('./passport-config')

// Get all the PGAdmin Info.
function getInfo() {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT game_title, developer, main_character, description, console FROM public.gamestock;`;
    dal.query(sql, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        info = result.rows
      }
    });
  });
};

getInfo()

// ------- 
// Get all the MongoDB Info.

const url =
  "mongodb+srv://MarkyMooCow:Apple@cluster0.z3kzemt.mongodb.net/@TheDBgrinder?retryWrites=true&w=majority";

const client = new MongoClient(url);

async function mongofunc() {
  await client.connect();
  const games = await client.db("TheDBgrinder").collection("Video").find();
  const gameresults = await games.toArray();
  info2 = gameresults;
}

async function main() {
    const uri =
      "mongodb+srv://MarkyMooCow:Apple@cluster0.z3kzemt.mongodb.net/@TheDBgrinder?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
  
      await listDatabases(client);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  
  main().catch(console.error);
  
  async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();
  
    console.log("Databases:");
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
  }

mongofunc()

// -------

// Intializing our passport.
// This is thanks to the passport.config.js!
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

// Yep, we store our users here. We don't have a database for them.
// They aren't special enough.
const users = []

// -------

// HOO BOY TIME TO EXPLAIN THIS.

// These are our app features. Mainly thanks to express!
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(express.urlencoded( {extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
// Some more passport set up.
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// To the index page! Uh, if you properly login of course!
app.get('/', checkAuthenticated, (req, res) => {
res.render('index.ejs', { name: req.user.name }) // I'm used to display the users name!
})

// This sends us to the PGAdmin Database.
app.get('/dataPG', checkAuthenticated, (req, res) => {
    res.render('dataPG.ejs', { name: req.user.name })
})

// This sends us to the MongoDB Database.
app.get('/dataDB', checkAuthenticated, (req, res) => {
    res.render('dataDB.ejs', { name: req.user.name })
})

// This is the search page for the PGAdmin Database.
app.post('/searchPG', checkAuthenticated, (req, res) => {
    // console.log(req.body.search)
    res.render('searchPG.ejs', { input: req.body.search }) // I'm grabbed from the search bar and get used to search by name!
})

// This is the search page for the MongoDB Database.
app.post('/searchDB', checkAuthenticated, (req, res) => {
    // console.log(req.body.search)
    res.render('searchDB.ejs', { input: req.body.search })
})

// This is the login page. You actually get redirected if you try and reach the routes above.
app.get('/login', checkNotAuthenticated,  (req, res) => {
    res.render('login.ejs')
})

// Think of this as our login gate.
app.post('/login', passport.authenticate('local', {
    successRedirect: '/', // If the email and password match, onward you go!
    failureRedirect: '/login', // If they don't, well, as Bonesaw in Spider-Man said, "YOU'RE GOING NOWHERE!"
    failureFlash: true // And this basically will flash a message based on your error.
}))

// This is our register page in case you don't have an account!
// Due to how this program works...Yeah you'll have to go here.
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

// Once you got all the info it, it'll check to see if it's legit.
app.post('/register', checkNotAuthenticated, async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login') // If you filled in all the information properly, you'll return to login with a new account!
    } catch {
        res.redirect('/register') // If you didn't, "YOU'RE GOING NOWHERE!"
    }
    // console.log(users)
})

// This is our logout function. Also a gate in a way. A gate to leave.
app.delete('/logout', function (req, res, next) {
    req.logOut(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/login');
    });
  });

// These functions are used to keep users where they belong!
// This one keeps the logged in where they belong.
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

// This one keeps the logged out where they belong.
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

// And it ends with this! Where our server is hosted!
let port = 1000
app.listen(port)
console.log(`Program is now up on localhost:${port}`)
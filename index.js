const express = require("express");
const app = express();

const PORT = process.env.PORT || 1000

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`SERVER IS OPEN ON ${PORT} OK?!`)
})

app.set('view engine', 'ejs');

const mainRouter = require('./routes/main');

app.use('/', mainRouter)
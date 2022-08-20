// Hey look it's our PGAdmin login!...Thingy!
// As you read in the readme.txt, you'll have to change this area up to fit your own PGAdmin Database role.
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'Morgan',
    host: 'localhost',
    database: 'GameGo',
    password: 'Jeralt',
    port: 5432
})

module.exports = pool;
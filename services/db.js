const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'Morgan',
    host: 'localhost',
    database: 'DVDRental',
    password: 'Jeralt',
    port: 5432
})

module.exports = pool;
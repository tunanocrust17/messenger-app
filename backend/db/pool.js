const {Pool} = require('pg');

module.exports = new Pool ({
    user: process.env.DBUSER,
    host: 'localhost',
    database: 'messenger_app',
    password: process.env.DBWORDS,
    port: 5432
})
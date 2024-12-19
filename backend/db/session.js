const session = require('express-session');
const pool = require('./pool');
const PGSession = require('connect-pg-simple')(session)

const sessionStore = new PGSession({
    pool: pool,
    tableName: 'session'
});

const sessionInfo = {
    store: sessionStore,
    secret: "process.env.SESSIONSECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
    }
}

module.exports = {sessionInfo};
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../db/pool');
const {passwordUtils} = require('../lib/passwordUtils');

const verifyCallback = async (username, password, done) => {
    try {
        const {rows} = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = rows[0];
        console.log(user);

        if(!user) {
            return done(null, false, {message: 'Incorrect username'})
        }

        const isValid = passwordUtils.validatePassword(password, user.password);
        console.log(isValid);
        if(!isValid) {
            //passwords do not match
            return done(null, false, {message: 'Incorrect password'});
        }

        return done(null, user);
    } catch(error) {
        return done(error)
    }
}

const strategy = new LocalStrategy(verifyCallback);

passport.use('local', strategy);

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser( async (id, done) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1' ,[id]);
        const user = rows[0];

        done(null, user);
    } catch(error) {
        done(error)
    }
});
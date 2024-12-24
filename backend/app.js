const express = require('express');
const path = require('node:path');
const session = require('express-session');
const passport = require('passport');
const {sessionInfo} = require('./db/session')
const dotenv = require('dotenv');
const {isAuth, isAdmin} = require('./middleware/authMiddleware')

/**
 * -------------- Router Imports --------------
 */
const {indexRouter} = require('./routes/indexRouter')
const {signupRouter} = require('./routes/signupRouter')
const {loginRouter} = require('./routes/loginRouter')
const {logoutRouter} = require('./routes/logoutRouter');
const {groupsRouter} = require('./routes/groupsRouter');
const {chatsRouter} = require('./routes/chatsRouter')


/**
 * -------------- GENERAL SETUP ----------------
 */

const app = express();

require('./auth/passport');

dotenv.config({path: path.resolve(__dirname, '../.env')});

app.set('views', path.join(__dirname, '../frontend', 'views'));
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '../frontend', 'public')));



/**
 * -------------- SESSION SETUP ----------------
 */

app.use(session(sessionInfo))

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.session())
app.use((req, res, next) => {
    console.log(req.session)
    next()
})

/**
 * -------------- Routes ----------------
 */
app.use('/', indexRouter)
app.use('/register', signupRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/groups', groupsRouter)
app.use('/chats', chatsRouter)


app.get('/protected', isAuth, isAdmin, (req, res) => {
    res.send('welcome to the protected route');
});

// Helper Function for Formatting Dates
app.locals.formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};


/**
 * -------------- Server Initialization ----------------
 */

const port = process.env.PORT
app.listen(port, () => {
    console.log(`App running on port ${port}!`)
})
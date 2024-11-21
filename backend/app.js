const express = require('express');
const path = require('node:path');
const session = require('express-session');
const passport = require('passport');

/**
 * -------------- Router Imports --------------
 */
const {indexRouter} = require('./routes/indexRouter')


/**
 * -------------- GENERAL SETUP ----------------
 */

const app = express();

/**
 * -------------- Routes ----------------
 */
app.use('/', indexRouter)


/**
 * -------------- Server Initialization ----------------
 */

const port = 3000
app.listen(port, () => {
    console.log(`App running on port ${port}!`)
})
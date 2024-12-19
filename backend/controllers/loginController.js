const queries = require('../db/queries');
const {passwordUtils} = require('../lib/passwordUtils');
const pool = require('../db/pool');

class loginController {
    static getLogin (req, res) {
        res.render('login')
    }
}

module.exports = {
    loginController
}
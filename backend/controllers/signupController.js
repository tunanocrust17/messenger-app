const queries = require('../db/queries');
const {passwordUtils} = require('../lib/passwordUtils')
const passport = require('passport')
const pool = require('../db/pool')


class signupController {
    static async getSignup (req, res) {
        res.render('signup')
    }

    static async createUser (req, res) {
        const {fName, lName, username, password} = req.body;

        const hashedPW = await passwordUtils.genPassword(password);


        try {
            console.log(password)
            console.log(hashedPW)
            await queries.createUser(fName, lName, username, hashedPW);
            console.log('successfully created user');

            const {rows} = await pool.query('SELECT * FROM users WHERE username = $1',[username]);
            const newUser = rows[0]

            if(!newUser){
                console.error('User creation successful, but user retrieval failed');
                return res.status(500).send('Error retrieving user after creation');
            }

            req.login(newUser, (error)=>{
                if(error){
                    console.error('Error logging in user after signup:', error);
                    return res.status(500).send('Error logging in user');
                }
                return res.redirect('/');
            })

        } catch(error) {
            console.error('Error creating user ', error)
        }
    }
}

module.exports = {
    signupController
}
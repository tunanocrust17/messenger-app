const {Router} = require('express');
const loginRouter = Router();
const {loginController} = require('../controllers/loginController');
const passport = require('passport');

loginRouter.get('/', (req, res) => {
    loginController.getLogin(req, res)
})

loginRouter.post('/', 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
)

module.exports = {
    loginRouter
}


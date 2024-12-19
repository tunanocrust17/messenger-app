const {Router} = require('express');
const signupRouter = Router()
const {signupController} = require('../controllers/signupController')

signupRouter.get('/', (req, res) => {
    signupController.getSignup(req, res)
})

signupRouter.post('/', async (req, res) => {
    signupController.createUser(req, res)
})

module.exports = {
    signupRouter
}
const {Router} = require('express');
const { chatsController } = require('../controllers/chatsController');
const chatsRouter = Router();
const {isAuth} = require('../middleware/authMiddleware')

chatsRouter.get('/:id', isAuth, (req, res) => {
    chatsController.getGroup(req, res)
})

module.exports = {
    chatsRouter
}
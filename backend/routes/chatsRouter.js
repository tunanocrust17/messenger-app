const {Router} = require('express');
const { chatsController } = require('../controllers/chatsController');
const chatsRouter = Router();
const {isAuth} = require('../middleware/authMiddleware')

chatsRouter.get('/:id', isAuth, (req, res) => {
    chatsController.getGroup(req, res)
})

chatsRouter.post('/:id/join', isAuth, (req, res) => {
  chatsController.joinGroup(req, res)
})

chatsRouter.post('/:id/postMessage', isAuth, (req, res) => {
  chatsController.postMessage(req, res)
})

module.exports = {
    chatsRouter
}
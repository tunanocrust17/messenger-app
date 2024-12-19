const {groupsController} = require('../controllers/groupsController');
const {Router} = require('express');
const groupsRouter = Router();
const {isAuth} = require('../middleware/authMiddleware')

groupsRouter.get('/', isAuth, (req, res) => {
    groupsController.getGroupsPage(req, res)
})

module.exports = {
    groupsRouter
}
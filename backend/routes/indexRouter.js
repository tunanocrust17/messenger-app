const {Router} = require('express');
const indexRouter = Router();

indexRouter.get('/', (req, res) => {
    res.send('still working')
})

module.exports = {
    indexRouter
}
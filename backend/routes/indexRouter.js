const {Router} = require('express');
const indexRouter = Router();

indexRouter.get('/', (req, res) => {
    if(req.session.looks){
        req.session.looks++
    } else {
        req.session.looks = 1;
    }

    console.log(req.user)
    console.log(req.session)

    res.render('index', { 
        user: req.user,
        views: req.session.looks
    })
})

module.exports = {
    indexRouter
}
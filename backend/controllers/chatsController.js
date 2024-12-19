const queries = require('../db/queries');

class chatsController {
    static async getGroup (req, res) {

        try {
            const groupID = req.params.id;
            const userID = req.user.id
            console.log(userID)

            const group = await queries.getGroup(groupID);
            const isMember = await queries.isMember(groupID, userID)
            console.log(isMember)

            res.render('chats', {
                group: group,
                user: req.user,
                isMember: isMember
            })           
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = {
    chatsController
}
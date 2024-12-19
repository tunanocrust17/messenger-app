const queries = require('../db/queries');

class groupsController {
    static async getGroupsPage (req, res) {
        try {
            const userID = req.user.id
            const groups = await queries.getUniqueGroups(userID)
            const usersGroups = await queries.getUsersGroups(userID)
            console.log(groups)
            res.render('groups', {
                groups: groups,
                usersGroups: usersGroups
            })
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = {
    groupsController
}
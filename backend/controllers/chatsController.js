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

    static async joinGroup (req, res) {
        try {

            const userAnswer = req.body.answer.toString()
            const groupId = req.params.id
            const groupAnswer = await queries.getGroupAnswer(groupId)
            
            if(userAnswer === groupAnswer.group_answer){
                const userID = req.user.id
                await queries.addUserToGroup(groupId, userID)

                res.status(200).json({success: true})

            } else {
                res.status(400).json({success: false, message: "Incorrect answer"})
            }
        } catch(err) {
            console.log(err)
            res.status(500).json({success: false, message: "Internal server error"})
        }
    }
}

module.exports = {
    chatsController
}
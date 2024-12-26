const queries = require('../db/queries');

class chatsController {
    static async getGroup (req, res) {

        try {
            const groupID = req.params.id;
            const userID = req.user.id

            const group = await queries.getGroup(groupID);
            const isMember = await queries.isMember(groupID, userID)
            const isAdmin = await queries.isAdmin(groupID, userID)
            const messages = await queries.getGroupsMessages(groupID)

            res.render('chats', {
                group: group,
                user: req.user,
                isMember: isMember,
                isAdmin: isAdmin,
                messages: messages
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

    static async postMessage (req, res) {
        try {
            const userMessage = req.body.userMessage.toString()
            console.log(userMessage)
            const groupID = req.params.id
            const userID = req.user.id

            await queries.postMessage(groupID, userID, userMessage)

            res.status(200).json({success:true})
        } catch (err) {
            console.log(err)
            res.status(500).json({success: false, message: 'Failed to post message'})
        }
    }
}

module.exports = {
    chatsController
}
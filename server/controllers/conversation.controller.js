const Conversation = require("../models/Conversation.js")

module.exports = {

    newConversation: async (req, res) => {

        const { userID, friendID } = req.body

        await Conversation.create({ members: [userID, friendID] }).then(newConversation => {

            res.status(201).json(newConversation)

        }).catch(err => console.error(err.message))


    },

    getConversation: async (req, res) => {

        const { conversationID } = req.params

        //check if conversation exists in db, if yes return it, otherwise create a new one and send it afterwards 
        await Conversation.findById(conversationID).lean().then(conversation => {

            res.json(conversation)

        }).catch(err => console.error(err.message))
    },

}
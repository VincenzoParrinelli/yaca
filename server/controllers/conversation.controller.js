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

        await Conversation.findById(conversationID).select({ "messages": 1 }).lean().then(conversation => {

            res.json(conversation)

        }).catch(err => console.error(err.message))
    },

    sendMessage: async (req, res) => {

        const { newMessage, conversationID } = req.body

        await Conversation.findByIdAndUpdate(

            conversationID,
            { $push: { messages: newMessage } },
            { new: true }

        ).lean().then(() => {

            //const newMessage = conversationData.messages[conversationData.messages.length - 1]

            res.status(201).json(newMessage)

        }).catch(err => new Error(err.message))
    }

}
const Conversation = require("../models/Conversation.js")

module.exports = {

    newConversation: async (req, res) => {

        const { userID, friendID, groupID } = req.body

        await Conversation.create(groupID ? { groupID } : { members: [userID, friendID] }).then(newConversation => {

            res.status(201).json(newConversation)

        }).catch(err => console.error(err.message))

    },

    getConversation: async (req, res) => {

        const { conversationID } = req.params

        await Conversation.findById(conversationID).lean().then(conversation => {

            res.json(conversation)

        }).catch(err => console.error(err.message))
    },

    sendMessage: async (req, res) => {

        const { message, currentUserID, friendSocketID, conversationID } = req.body

        console.log(req.body)

        await Conversation.findByIdAndUpdate(

            conversationID,
            { $push: { messages: { senderID: currentUserID, text: message } } },
            { new: true }

        ).lean().then(conversationData => {

            const newMessage = conversationData.messages[conversationData.messages.length - 1]

            res.status(201).json(newMessage)

        }).catch(err => new Error(err.message))
    }

}
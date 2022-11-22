const Conversation = require("../../models/Conversation.js")

module.exports = conversation => {

    conversation.on("send-message", async payload => {

        const { currentUserID, friendSocketID, friendID, message } = payload

        await Conversation.findOneAndUpdate(

            { members: { $all: [currentUserID, friendID] } },
            { $push: { messages: { senderID: currentUserID, text: message } } },
            { new: true }

        ).lean().then(conversation => {

            const newMessage = conversation.messages[conversation.messages.length - 1]

            const payload = {
                conversationID: conversation._id,
                newMessage
            }

            conversation.to(friendSocketID).emit("get-message", payload)

        }).catch(err => new Error(err.message))

    })
}
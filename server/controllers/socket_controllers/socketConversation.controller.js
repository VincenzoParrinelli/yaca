const Conversation = require("../../models/Conversation.js")

module.exports = conversation => {
    
    conversation.on("send-message", async payload => {

        const { conversationID, currentUserID, selectedUserSocketID, message } = payload

        await Conversation.findByIdAndUpdate(

            conversationID,
            { $push: { messages: { senderID: currentUserID, text: message } } },
            { new: true }

        ).then(conversation => {

            const newMessage = conversation.messages[conversation.messages.length - 1]

            const payload = {
                conversationID: conversation._id,
                newMessage
            }

            conversation.to(selectedUserSocketID).emit("get-message", payload)

        }).catch(err => new Error(err.message))

    })
}
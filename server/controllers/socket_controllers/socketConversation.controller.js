const Conversation = require("../../models/Conversation.js")

module.exports = conversation => {

    conversation.on("send-new-conversation", async payload => {

        const { newConversation, receiverSocketID } = payload

        conversation.to(receiverSocketID).emit("get-new-conversation", newConversation)
    })

    conversation.on("send-message", async payload => {

        const newMessage = payload.newMessage
        const { friendSocketID, conversationID, groupID } = payload

        const response = { conversationID, newMessage }

        friendSocketID && conversation.to(friendSocketID).emit("get-message", response)
        groupID && conversation.to(groupID).emit("get-message", response)

        // await Conversation.findByIdAndUpdate(

        //     conversationID,
        //     { $push: { messages: { senderID: currentUserID, text: message } } },
        //     { new: true }

        // ).lean().then(conversationData => {

        //     const newMessage = conversationData.messages[conversationData.messages.length - 1]

        //     const payload = {
        //         conversationID: conversationData._id,
        //         newMessage
        //     }

        //     !conversationData.groupID && conversation.to(friendSocketID).emit("get-message", payload)
        //     conversationData.groupID && conversation.to(conversationID).emit("get-message", payload)

        // }).catch(err => new Error(err.message))

    })
}
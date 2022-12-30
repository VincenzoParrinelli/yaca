module.exports = conversation => {

    conversation.on("send-new-conversation", payload => {

        const { newConversation, receiverSocketID } = payload

        conversation.to(receiverSocketID).emit("get-new-conversation", newConversation)
    })

    conversation.on("send-message", payload => {

        const { newMessage, receiverSocketID, conversationID } = payload

        conversation.to(receiverSocketID).emit("get-message", { newMessage, conversationID })

    })
}
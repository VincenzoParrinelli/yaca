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

    })
}
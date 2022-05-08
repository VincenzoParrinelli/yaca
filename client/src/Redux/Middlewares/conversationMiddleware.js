import { getConversation } from "../conversationSlice"

const conversationMiddleware = store => next => action => {

    next(action)

    if (action.type === "conversation/setSelectedUser") {

        const { friendList } = store.getState().user.data
        const { conversations } = store.getState().conversation
        const { user, conversation } = store.getState()

        friendList.forEach((friend, i) => {

            if (conversation.selectedUserIndex === i) {

                const currentID = user.data._id
                const friendID = friend._id

                const payload = {
                    currentID,
                    friendID
                }

                //check if a conversation has already been fetched by using friendID as check value
                const conversationExists = conversations.some(conv => conv.secondUserID === friendID)

                if (!conversationExists) store.dispatch(getConversation(payload))
            }

        })

    }

}

export default conversationMiddleware
import { getConversation } from "../conversationSlice"

const conversationMiddleware = store => next => action => {

    next(action)

    if (action.type === "conversation/setSelectedFriendID") {

        const { selectedFriendID, conversationList } = store.getState().conversation
        const { user } = store.getState()

        const currentID = user.data._id
        const friendID = selectedFriendID

        const payload = {
            currentID,
            friendID
        }

        //check if a conversation has already been fetched using the isFullyFetched flag

        const conversationExists = conversationList.some(conv => conv.isFullyFetched)

        if (!conversationExists) store.dispatch(getConversation(payload))

        //if the conversation has the selected friend in his members array return the conv id 
        //and dispatch it into redux state

        if (conversationExists) {

            conversationList.map(conv => {

                if (!conv.members.includes(friendID)) return

                store.dispatch({
                    type: "conversation/setSelectedConv",
                    payload: conv._id
                })

            })

        }

    }
}

export default conversationMiddleware
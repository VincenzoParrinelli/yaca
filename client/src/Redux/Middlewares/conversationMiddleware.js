import { getConversation } from "../conversationSlice"

const conversationMiddleware = store => next => action => {

    next(action)

    if (action.type === "conversation/setSelectedUser") {

        const { friendList } = store.getState().user.data
        const { selectedUserIndex, conversationsData } = store.getState().conversation
        const { user, conversation } = store.getState()

        friendList.map((friend, i) => {

            if (selectedUserIndex === i) {

                const currentID = user.data._id
                const friendID = friend._id

                const payload = {
                    currentID,
                    friendID
                }

                //check if a conversation has already been fetched by using friendID as check value

                const conversationExists = conversationsData.some(conv => conv.members.includes(friendID))

                if (!conversationExists) store.dispatch(getConversation(payload))

                //if the conversation has the selected friend in his members array return the conv id 
                //and dispatch it into redux state

                if (conversationExists) {

                    let conversationID

                    conversationsData.map(conv => {

                        if (conv.members.includes(friendID)) conversationID = conv._id
                              
                    })

                    store.dispatch({
                        type: "conversation/setSelectedConv",
                        payload: conversationID
                    })

                }
            }
        })
    }
}

export default conversationMiddleware
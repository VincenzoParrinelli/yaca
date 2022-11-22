import { newConversation, getConversation } from "../conversationSlice"

const conversationMiddleware = store => next => action => {

    next(action)

    if (action.type === "conversation/setSelectedConvMainData") {

        const { _id: userID, friendID } = action.payload
        const { conversationList } = store.getState().conversation

        const payload = { userID, friendID }

        const selectedConv = conversationList.find(conv => conv.members.includes(userID) && conv.members.includes(friendID))
        
        //create new conversation or fetch existing one
        if (!selectedConv) return store.dispatch(newConversation(payload))

        if (!selectedConv?.isFullyFetched) store.dispatch(getConversation(payload))

    }

}

export default conversationMiddleware
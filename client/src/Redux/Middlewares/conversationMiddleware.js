import { newConversation, getConversation } from "../conversationSlice"

const conversationMiddleware = store => next => action => {

    next(action)

    // if (action.type === "conversation/setSelectedConvMainData") {

    //     const { _id: userID, friendID, selectedConv, groupID } = action.payload

    //     // Define payload for either direct conversation or group conversation
    //     const payload = groupID ? { userID, groupID } : { userID, friendID }

    //     // create new conversation or fetch existing one
    //     if (!selectedConv) return store.dispatch(newConversation(payload))

    //     if (!selectedConv?.isFullyFetched) store.dispatch(getConversation(selectedConv._id))

    // }

}

export default conversationMiddleware
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

const initialState = {
    conversationList: [],

    newMessageFromSocket: null
}


export const newConversation = createAsyncThunk(
    "conversation/newConversation",

    async payload => await axios.post(`${serverUrl}conversation/new-conversation`,

        payload,
        { withCredentials: true }

    ).then(res => res.data)
)

export const getConversation = createAsyncThunk(
    "conversation/getConversation",

    async conversationID => await axios.get(`${serverUrl}conversation/get-conversation/${conversationID}`,

        { withCredentials: true }

    ).then(res => {

        return res.data
    }).catch(err => { throw Error(err) })
)

export const sendMessage = createAsyncThunk(
    "conversation/sendMessage",

    async payload => await axios.post(`${serverUrl}conversation/send-message`,

        payload,
        { withCredentials: true }

    ).then(res => res.data)
)

export const conversationSlice = createSlice({
    name: "conversation",

    initialState,

    reducers: {

        //get only last messages on login, so we can display them after user has logged in
        getLastMessages: (state, action) => {
            state.conversationList = action.payload
        },

        //handle this in middleware
        setSelectedConvMainData: () => { },

        getNewConversationFromSocket: (state, action) => {
            state.conversationList.push(action.payload)
        },

        //get message from socket event
        getMessage: (state, action) => {

            const { conversationID, newMessage } = action.payload

            state.conversationList.forEach(conv => {
                if (conv._id !== conversationID) return

                conv.messages.push(newMessage)
            })

            state.newMessageFromSocket = newMessage
        },

        //update chat from client 
        updateChat: (state, action) => {

            const { conversationList } = state
            const { message, _id, conversationID } = action.payload

            conversationList.forEach(conv => {
                if (conv._id !== conversationID) return

                const currentDate = Date()

                conv.messages.push({ text: message, senderID: _id, createdAt: currentDate })
            })

        }
    },

    extraReducers: {

        [newConversation.fulfilled]: (state, action) => {

            action.payload.isFullyFetched = true

            state.conversationList.push(action.payload)
        },

        [getConversation.fulfilled]: (state, action) => {

            // Assign isFullyFetched flag to true to full conversation

            action.payload.isFullyFetched = true

            // Find the conversation to update and then assign to it the fully fetched one with all the messages 

            const convToUpdate = state.conversationList.find(conv => conv._id === action.payload._id)

            Object.assign(convToUpdate, action.payload)

        }
    }
})

export const {
    updateChat,
    setSelectedConvMainData,

} = conversationSlice.actions

export default conversationSlice.reducer
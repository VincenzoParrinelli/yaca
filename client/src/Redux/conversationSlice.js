import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

const initialState = {

    selectedUserIndex: null,

    conversationsData: [],

    selectedConversationID: null

}

export const getConversation = createAsyncThunk(
    "conversation/getConversation",

    async data => await axios.get(`${serverUrl}conversation/get-conversation/${data.currentID}/${data.friendID}`,

        { withCredentials: true }
    ).then(res => {

        return res.data
    }).catch(err => { throw Error(err) })
)

export const conversationSlice = createSlice({
    name: "conversation",

    initialState,

    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUserIndex = action.payload
        },

        setSelectedConv: (state, action) => {
            state.selectedConversationID = action.payload
        },

        //get message from socket event
        getMessage: (state, action) => {

            const { conversationID, newMessage } = action.payload

            state.conversationsData.map(conv => {
                if (conv._id !== conversationID) return

                conv.messages.push(newMessage)
            })
        },

        //update chat from client 
        updateChat: (state, action) => {

            const { selectedConversationID, conversationsData } = state

            conversationsData.map(conv => {
                if (conv._id !== selectedConversationID) return

                const currentDate = Date()

                conv.messages.push({text: action.payload, createdAt: currentDate})
            })

        }
    },

    extraReducers: {

        [getConversation.fulfilled]: (state, action) => {
            state.conversationsData.push(action.payload)

            state.selectedConversationID = action.payload._id
        }
    }
})

export const {
    setSelectedUser,
    updateChat

} = conversationSlice.actions

export default conversationSlice.reducer
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

const initialState = {

    selectedFriendID: "",

    conversationList: [],

    selectedConversationID: null

}

export const getConversation = createAsyncThunk(
    "conversation/getConversation",

    async payload => await axios.get(`${serverUrl}conversation/get-conversation/${payload.currentID}/${payload.friendID}`,

        { withCredentials: true }

    ).then(res => {

        return res.data
    }).catch(err => { throw Error(err) })
)

export const conversationSlice = createSlice({
    name: "conversation",

    initialState,

    reducers: {

        getLastMessage: (state, action) => {
            state.conversationList = action.payload
        },

        setSelectedFriendID: (state, action) => {
            state.selectedFriendID = action.payload
        },

        setSelectedConv: (state, action) => {
            state.selectedConversationID = action.payload
        },

        resetSelectedConv: state => {
            state.selectedFriendID = ""
            state.selectedConversationID = ""
        },

        //get message from socket event
        getMessage: (state, action) => {

            const { conversationID, newMessage } = action.payload

            state.conversationList.map(conv => {
                if (conv._id !== conversationID) return

                conv.messages.push(newMessage)
            })
        },

        //update chat from client 
        updateChat: (state, action) => {

            const { selectedConversationID, conversationList: conversationsData } = state

            conversationsData.map(conv => {
                if (conv._id !== selectedConversationID) return

                const currentDate = Date()

                conv.messages.push({ text: action.payload, createdAt: currentDate })
            })

        }
    },

    extraReducers: {

        [getConversation.fulfilled]: (state, action) => {
            state.conversationList.push(action.payload)

            state.selectedConversationID = action.payload._id
        }
    }
})

export const {
    setSelectedFriendID,
    updateChat

} = conversationSlice.actions

export default conversationSlice.reducer
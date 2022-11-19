import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

const initialState = {
    conversationList: [],

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

    async payload => await axios.get(`${serverUrl}conversation/get-conversation/${payload.userID}/${payload.friendID}`,

        { withCredentials: true }

    ).then(res => {

        return res.data
    }).catch(err => { throw Error(err) })
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

        resetSelectedConvMainData: state => {
            state.isSelectedConvFullyFetched = false
        },

        //get message from socket event
        getMessage: (state, action) => {

            const { conversationID, newMessage } = action.payload

            state.conversationList.forEach(conv => {
                if (conv._id !== conversationID) return

                conv.messages.push(newMessage)
            })
        },

        //update chat from client 
        updateChat: (state, action) => {

            const { selectedConversationID, conversationList } = state

            conversationList.forEach(conv => {
                if (conv._id !== selectedConversationID) return

                const currentDate = Date()

                conv.messages.push({ text: action.payload, createdAt: currentDate })
            })

        }
    },

    extraReducers: {

        [newConversation.fulfilled]: (state, action) => {

            action.payload.isFullyFetched = true

            state.conversationList.push(action.payload)
        },

        [getConversation.fulfilled]: (state, action) => {

            //search for selected conversation overwrite it and set isFullyFetched flag to true
            state.conversationList.forEach((conv, i) => {

                if (conv._id !== action.payload._id) return

                conv = action.payload

                conv.isFullyFetched = true

                state.conversationList[i] = conv
            })

        }
    }
})

export const {
    updateChat,
    setSelectedConvMainData,
    resetSelectedConvMainData
} = conversationSlice.actions

export default conversationSlice.reducer
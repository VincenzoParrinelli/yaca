import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

const initialState = {

    conversations: [],

    selectedUser: null

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
            state.selectedUser = action.payload
        },
    },

    extraReducers: {

        [getConversation.fulfilled]: (state, action) => {
            state.conversations.push(action.payload)
        }
    }
})

export const {
    setSelectedUser
} = conversationSlice.actions

export default conversationSlice.reducer
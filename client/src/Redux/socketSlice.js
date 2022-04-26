import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

const initialState = {
    
    openSocket: false,

    message: "",

    errors: {
        authorized: true
    },

    searchedUsers: [],
}

export const searchUsers = createAsyncThunk(
    "socket/searchUsers",

    async data => await axios.post(`${serverUrl}user/search-users`,
   
        {data},
        { withCredentials: true }

    ).then(res => {
        return res.data
    }).catch(err => { throw Error(err) })
)

export const socketsSlice = createSlice({
    name: "socket",

    initialState,

    reducers: {

        connection: (state, action) => {
            state.openSocket = true
        },

        error: (state, action) => {
            state.errors.authorized = false
        },

        reset: (state) => {
            state.errors = initialState.errors
            state.openSocket = false
        },

        sendFriendRequest: (state) => {

        },

        refuseFriendRequest: (state, action) => {

        }

    },

    extraReducers: {
        [searchUsers.fulfilled]: (state, action) => {
            state.searchedUsers = action.payload
        }
    }

})

export const {
    connection,
    reset,
    sendFriendRequest,
    refuseFriendRequest
} = socketsSlice.actions

export default socketsSlice.reducer

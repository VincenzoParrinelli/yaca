import { createSlice } from "@reduxjs/toolkit"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

const initialState = {
    
    openSocket: false,

    message: "",

    errors: {
        authorized: true
    },

    searchedUsers: [],
}

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

        searchUsers: () => {
           
        },

        getSearchedUsers: (state, action) => {
            state.searchedUsers = action.payload
        },

        sendFriendRequest: (state) => {

        },

        acceptFriendRequest: () => {

        },

        refuseFriendRequest: (state, action) => {

        }

    },

})

export const {
    connection,
    reset,
    searchUsers,
    sendFriendRequest,
    acceptFriendRequest,
    refuseFriendRequest
} = socketsSlice.actions

export default socketsSlice.reducer

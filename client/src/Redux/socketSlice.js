import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    openSocket: false,

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

        searchUsers: () => { },

        getSearchedUsers: (state, action) => {
            state.searchedUsers = action.payload
        },

        sendFriendRequest: () => { },

        acceptFriendRequest: () => { },

        refuseFriendRequest: () => { },

        //check socketMiddleware.js for message handling
        sendMessage: state => {
            state.message = ""
        }

    },

})

export const {
    connection,
    reset,
    searchUsers,
    sendFriendRequest,
    acceptFriendRequest,
    refuseFriendRequest,
    sendMessage,

} = socketsSlice.actions

export default socketsSlice.reducer

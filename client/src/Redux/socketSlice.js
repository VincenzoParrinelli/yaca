import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    openSocket: false,

    errors: {
        authorized: true
    },
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

        sendFriendRequest: () => { },

        acceptFriendRequest: () => { },

        refuseFriendRequest: () => { },

        //check socketMiddleware.js for message handling
       // sendMessage: () => { }

    },

})

export const {
    connection,
    reset,
    sendFriendRequest,
    acceptFriendRequest,
    refuseFriendRequest,

} = socketsSlice.actions

export default socketsSlice.reducer

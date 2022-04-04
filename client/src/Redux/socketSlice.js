import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    
    openSocket: false,

    message: "",

    errors: {
        authorized: true
    },

    searchedUsers: []
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

        searchUsers: (state, action) => {
           
        }
    },

})

export const {
    connection,
    reset,
    searchUsers
} = socketsSlice.actions

export default socketsSlice.reducer

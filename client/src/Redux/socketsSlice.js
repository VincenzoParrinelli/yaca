import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"
import { io } from "socket.io-client"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

//initializing socket variable and options
var socket
var options = {
    withCredentials: true
}


const initialState = {
    message: "",

    errors: {
        unAuthorized: false
    },

    searchedUsers: []
}

export const connection = createAsyncThunk(
    "sockets/connection",

    () => {
        var errorFlag

        socket = io(serverUrl, options)
        socket.on("connect", () => {
            console.log(socket.id)
        })

        socket.on("connect_error", err => {
            if(err) errorFlag = true
        })

        return errorFlag
    }
)

export const socketsSlice = createSlice({
    name: "sockets",

    initialState,

    reducers: {
        reset: (state) => {
            state.errors = initialState.errors
        },

        searchUsers: (state, action) => {
            socket.emit("get-searched-users", action.payload)
        }
    },

    extraReducers: {
        [connection.fulfilled]: (state, action) => {
          console.log(action)
            if(action.payload) {
                state.errors.unAuthorized = true
            }
        },
    }
})

export const {
    reset,
    searchUsers
} = socketsSlice.actions

export default socketsSlice.reducer

import { createSlice } from "@reduxjs/toolkit"
import { io } from "socket.io-client"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

//initializing socket variable and options
var socket
var options = {
    withCredentials: true
}


const initialState = {
    username: "",
    message: "",

    searchedUsers: []
}

export const socketsSlice = createSlice({
    name: "sockets",

    initialState,

    reducers: {
        connection: state => {
            socket = io(serverUrl, options)
            socket.on("connect", () => {
                console.log(socket.id)
            })

            socket.on("connect_error", err => {
                
                if(err.message === "401") {
                   
                }
            })
        },

        searchUsers: (state, action) => {
            socket.emit("get-searched-users", action.payload)
        }
    }
})

export const {
    connection,
    searchUsers
} = socketsSlice.actions

export default socketsSlice.reducer

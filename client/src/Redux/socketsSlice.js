import { createSlice } from "@reduxjs/toolkit"
import { io } from "socket.io-client"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL 
const socket = io(serverUrl)

const initialState = {

}

export const socketsSlice = createSlice({
    name: "sockets",

    initialState,

    reducers: {
        connection: state => {
            socket.on("connection", () => {
               
            })
        },
    }
})

export const {
    connection
} = socketsSlice.actions

export default socketsSlice.reducer
